
module.exports = {
	buildService: function (filename) {
		var clients = require('aws-sdk/clients/all');
		var fs = require('fs');
		//console.log(filename);
		var serviceDef = JSON.parse(fs.readFileSync(filename, 'utf8'));
		//console.log(serviceDef.metadata.serviceId);

		function firstLetterLowercase(string) {
			return string.charAt(0).toLowerCase() + string.slice(1);
		}

		function mapKeys(obj, fn, sep) {
			if (typeof sep == 'undefined') sep = '';
			if (typeof obj == 'undefined') {
				return '';
			} else {
				return Object.keys(obj).map(fn).join(sep);
			}
		}

		function getReqs(serviceDef) {
			reqs = {};
			Object.keys(serviceDef.operations).map(op => {
				if (serviceDef.operations[op].input && serviceDef.operations[op].input.required) {
					return (serviceDef.operations[op].input.required)
				} else {
					return [];
				}
			}).forEach(reqA => { reqA.forEach(req => { reqs[req] = serviceDef.operations[op].input.members[req].type || 'str'; }) });
			//console.log(JSON.stringify(reqs));
			return (Object.keys(reqs));
		}

		function getAllMembers(serviceDef) {
			reqs = {};
			Object.keys(serviceDef.operations).map(op => {
				if (serviceDef.operations[op].input && serviceDef.operations[op].input.members) {
					return (Object.keys(serviceDef.operations[op].input.members).forEach(req => { 
						reqs[req] = serviceDef.operations[op].input.members[req].type || 'str'; }))
				} else {
					return [];
				}
			})
			//console.log(JSON.stringify(reqs));
			return (Object.keys(reqs));
		}

		function getAllMembersWithTypes(serviceDef) {
			reqs = {};
			Object.keys(serviceDef.operations).map(op => {
				if (serviceDef.operations[op].input && serviceDef.operations[op].input.members) {
					return (Object.keys(serviceDef.operations[op].input.members).forEach(req => { 
						reqs[req] = serviceDef.operations[op].input.members[req].type || 'str'; }))
				} else {
					return [];
				}
			})
			//console.log(JSON.stringify(reqs));
			return (reqs);
		}

		function getAttribute(op, input) {
			switch (op[input].type) {
				case 'integer':
					return 'Number(n)';
				case 'boolean':
					return 'Boolean(n)';
				case 'blob':
					return 'Buffer.from(n)';
				case 'str':
					return 'n';
				default:
					return 'n';
			}
		}

		function genSingleOperation(operations, name) {
			const operation = operations[name];
			const operationCode =  `
			service.${name}=function(svc,msg,cb){
			var params={};
			${(operation.input && operation.input.required) ? mapKeys(operation.input.required, input => `
			copyArgs(${getAttribute(operation.input.members, operation.input.required[input])},"${operation.input.required[input]==='type'?'_type':operation.input.required[input]}",params,${operation.input.required[input]==='type'?'"type"':'undefined'},${typeof operation.input.members[operation.input.required[input]].shape !== "undefined"}); `) : ''}
			${(operation.input && operation.input.members) ? mapKeys(operation.input.members, input => `
			copyArgs(${getAttribute(operation.input.members, input)},"${input}",params,undefined,${typeof operation.input.members[input].shape !== "undefined"}); `) : ''}
			${(operation.input && operation.input.members) ? mapKeys(operation.input.members, input => `
			copyArgs(msg,"${input}",params,undefined,${typeof operation.input.members[input].shape !== "undefined"}); `) : ''}
			${(operation.input && operation.input.shape) ? mapKeys(serviceDef.shapes[operation.input.shape].members, input => `
			copyArgs(msg,"${input}",params,undefined,true); `) : ''}

			svc.${firstLetterLowercase(name)}(params,cb);
		}`
		return operationCode;
		}

		function genAllOperations(operations) {
			const allOps = mapKeys(operations, op => {
				return genSingleOperation(operations, op)
			});

			return allOps;
		}

		function generateOnEditPrepareStatements(serviceDef) {
			const typeMap = {
				"str": "str",
				"integer": "num",
				"boolean": "bool",
				"blob": "bin"
			}
			var attributes = getAllMembersWithTypes(serviceDef);

			const statements = Object.keys(attributes).map(n => {
				if (!typeMap[attributes[n]]) {
					return;
				}
				return `$("#node-input-${n}").typedInput({ default: "${typeMap[attributes[n]]}", types: ["${typeMap[attributes[n]]}"]});`
			})

			return statements;
		}

		mappings = {
			'IoT Data Plane': 'IotData'
		}

		serviceDef.metadata.serviceName = mappings[serviceDef.metadata.serviceId] || serviceDef.metadata.serviceId;
		if (!Object.keys(clients).includes(serviceDef.metadata.serviceName)) {
			// try to solve it
			var found = false;
			Object.keys(clients).forEach(n => { if (n.toLocaleLowerCase() == serviceDef.metadata.serviceName.toLowerCase().replace(' ', '')) { 
				//console.log(`Found similar service ${n}`)
				serviceDef.metadata.serviceName = n;
				found = true;
			}});
			if (!found) {
				console.error(`Invalid service name ${serviceDef.metadata.serviceName} - create manual mapping`);
				return;
			}
		}
		var htmlFile = `
<!--
  Copyright 2021 Daniel Thomas.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
-->

<script type="text/html" data-template-name="AWS ${serviceDef.metadata.serviceName}">
		<style scoped>
				.hiddenAttrs {display:none;}
				.visibleAttrs {display:block;}
		</style>
	<div class="form-row">
		<label for="node-input-aws"><i class="fa fa-user"></i> AWS</label>
		<input type="text" id="node-input-aws">
	</div>
	<div class="form-row">
		<label for="node-input-operation"><i class="fa fa-wrench"></i> Operation</label>
		<select type="text" id="node-input-operation">
		${Object.keys(serviceDef.operations).map(key => `
			<option value="${key}">${key}</option>
		`).join('')};
		</select>
	</div>
	<div class="form-row">
		<label for="node-input-name"><i class="fa fa-tag"></i> Name</label>
		<input type="text" id="node-input-name" placeholder="Name"></input>
	</div>
	<hr/>
	<div id="AttrHolder">
	      ${getAllMembers(serviceDef).map(r => `
	<div class="form-row" id='${r}Attr' class='hiddenAttrs'>
		<label for="node-input-${r}"><i class="fa fa-tag"></i> ${r}</label>
		<input type="text" id="node-input-${r}" placeholder="${r}"></input>
	</div> `
		).join('')}
	</div>

 <script>
	  var nodeOps={
			${mapKeys(serviceDef.operations, op => `
				${op}:[
					${(serviceDef.operations[op].input && serviceDef.operations[op].input.members ) ? mapKeys(serviceDef.operations[op].input.members, 
						reqIdx => {
							let attr = serviceDef.operations[op].input.members[reqIdx];
							return `'#${reqIdx}Attr'`;
						}, ',') : ''}
					]`, ',')}
		};
		$('#node-input-operation').on('change',function(){
			$('#AttrHolder').children().addClass('hiddenAttrs').removeClass('visibleAttrs');
				if (nodeOps[this.value])
					$(nodeOps[this.value].join()).addClass('visibleAttrs').removeClass('hiddenAttrs');
		 });
 </script>

</script>

<script type="text/html" data-help-name="AWS ${serviceDef.metadata.serviceName}">
<p>
AWS ${serviceDef.metadata.serviceName}
</p>
<p>
NOTE: Parameters must be specified in the message, using the case specified in the AWS API documentation (normally UpperCaseLeading)..
</p>
<h3>References</h3>
<ul>
    <li><a href="https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/${serviceDef.metadata.serviceName}.html">${serviceDef.metadata.serviceName}</a></li>
</ul>
</script>

<script type="text/javascript">
	RED.nodes.registerType('AWS ${serviceDef.metadata.serviceName}',{
		category: 'AWS',
		color:"#C0DEED",
		defaults: {
			aws: {type:"amazon config",required:true},
			operation: { value: '${Object.keys(serviceDef.operations)[0]}' },
			${getAllMembers(serviceDef).map(req => { if (req === 'type') return '_type'; return req;}).map(req => `
				${req}: { value: ""} ,`).join('')}
			name: { value: "" }
		},
		inputs:1,
        outputs: 2,
        outputLabels: ["data","err"],
		icon: "../../icons/aws.png",
		align: "right",
		label: function() {
			return this.name || "${serviceDef.metadata.serviceName} " + this.operation;
		},
		labelStyle: function() {
			return this.name?"node_label_italic":"";
		},
		oneditprepare: function() {
			${generateOnEditPrepareStatements(serviceDef).join("\n")}
		}
	});
</script>

`;


		var jsFile = `
/**
 * Copyright 2021 Daniel Thomas.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

const { copyArgs } = require('../../lib/util');

module.exports = function(RED) {
	"use strict";

	function AmazonAPINode(n) {
		RED.nodes.createNode(this,n);
		this.awsConfig = RED.nodes.getNode(n.aws);
		this.region = n.region || this.awsConfig.region;
		this.operation = n.operation;
		this.name = n.name;
		//this.region = this.awsConfig.region;
		
		this.accessKey = this.awsConfig.accessKey;
		this.secretKey = this.awsConfig.secretKey;

		var node = this;
		var AWS = require("aws-sdk");
		if (this.awsConfig.useEcsCredentials) {
			AWS.config.update({
				region: this.region
			});
			AWS.config.credentials = new AWS.ECSCredentials({
				httpOptions: { timeout: 5000 }, // 5 second timeout
				maxRetries: 10, // retry 10 times
				retryDelayOptions: { base: 200 } // see AWS.Config for information
			  });
		} else {
			AWS.config.update({
				accessKeyId: this.accessKey,
				secretAccessKey: this.secretKey,
				region: this.region
			});
 	    }
		if (!AWS) {
			node.warn("Missing AWS credentials");
			return;
		}

        if (this.awsConfig.proxyRequired){
            var proxy = require('proxy-agent');
            AWS.config.update({
                httpOptions: { agent: new proxy(this.awsConfig.proxy) }
            });
        }

		var awsService = new AWS.${serviceDef.metadata.serviceName}( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.${serviceDef.metadata.serviceName}(msg.AWSConfig) : awsService;

			node.sendMsg = function (err, data) {
				if (err) {
				    node.status({ fill: "red", shape: "ring", text: "error"});
                    send([null, { err: err }]);
					done(err);
    				return;
				} else {
					msg.payload = data;
					node.status({});
				}
				send([msg,null]);
				done();
			};

			if (typeof service[node.operation] === "function") {
				node.status({fill: "blue", shape: "dot", text: node.operation});
				service[node.operation](aService,msg,function(err,data) {
   				  node.sendMsg(err, data);
   			    });
			} else {
				done(new Error("Operation not defined - "+node.operation));
			}

		});

		var service={};
		${genAllOperations(serviceDef.operations)}
	
	}
	RED.nodes.registerType("AWS ${serviceDef.metadata.serviceName}", AmazonAPINode);

};
`;
		fs.mkdirSync(`build/${serviceDef.metadata.serviceName.toLowerCase()}`, {recursive: true});
		fs.writeFileSync(`build/${serviceDef.metadata.serviceName.toLowerCase()}/${serviceDef.metadata.serviceName}.html`, htmlFile);
		fs.writeFileSync(`build/${serviceDef.metadata.serviceName.toLowerCase()}/${serviceDef.metadata.serviceName}.js`, jsFile);
		//fs.symlinkSync(`build/${serviceDef.metadata.serviceName.toLowerCase()}/icons`, './icons', "dir");
	}
};
