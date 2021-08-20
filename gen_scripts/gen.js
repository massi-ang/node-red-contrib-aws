
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
			}).forEach(reqA => { reqA.forEach(req => { reqs[req] = 1 }) });
			//console.log(JSON.stringify(reqs));
			return (Object.keys(reqs));
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

<script type="text/x-red" data-template-name="AWS ${serviceDef.metadata.serviceName}">
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
		<label for="node-input-name"><i class="fa fa-tag"></i>Name</label>
		<input type="text" id="node-input-name" placeholder="Name"></input>
	</div>
	<hr/>
	<div id="AttrHolder">
	      ${getReqs(serviceDef).map(r => `
	<div class="form-row" id='${r}Attr' class='hiddenAttrs'>
		<label for="node-input-${r}"><i class="fa fa-tag"></i>${r}</label>
		<input type="text" id="node-input-${r}" placeholder="${r}"></input>
	</div> `
		).join('')}
	</div>

 <script>
	  var nodeOps={
			${mapKeys(serviceDef.operations, op => `
				${op}:[
					${(serviceDef.operations[op].input) ? mapKeys(serviceDef.operations[op].input.required, reqIdx => `'#${serviceDef.operations[op].input.required[reqIdx]}Attr'`, ',') : ''}
					]`, ',')}
		};
		$('#node-input-operation').on('change',function(){
			$('#AttrHolder').children().addClass('hiddenAttrs').removeClass('visibleAttrs');
				if (nodeOps[this.value])
					$(nodeOps[this.value].join()).addClass('visibleAttrs').removeClass('hiddenAttrs');
		 });
 </script>

</script>

<script type="text/x-red" data-help-name="AWS ${serviceDef.metadata.serviceName}">
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
			${getReqs(serviceDef).map(req => { if (req === 'type') return '_type'; return req;}).map(req => `
				${req}: { value: ""} ,`).join('')}
			name: { value: "" }
		},
		inputs:1,
        outputs: 2,
        outputLabels: ["data","err"],
		icon: "aws.png",
		align: "right",
		label: function() {
			return this.name || "${serviceDef.metadata.serviceName} " + this.operation;
		},
		oneditprepare: function () {

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
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.${serviceDef.metadata.serviceName}(msg.AWSConfig) : awsService;

			node.sendMsg = function (err, data, msg) {
				if (err) {
				    node.status({fill:"red",shape:"ring",text:"error"});
                    node.error("failed: " + err.toString(), msg);
                    node.send([null, { err: err }]);
    				return;
				} else {
				msg.payload = data;
				node.status({});
				}
				node.send([msg,null]);
			};

			if (typeof service[node.operation] == "function"){
				node.status({fill:"blue",shape:"dot",text:node.operation});
				service[node.operation](aService,msg,function(err,data){
   				node.sendMsg(err, data, msg);
   			});
			} else {
				node.error("failed: Operation node defined - "+node.operation);
			}

		});
		var copyArg=function(src,arg,out,outArg,isObject){
			var tmpValue=src[arg];
			outArg = (typeof outArg !== 'undefined') ? outArg : arg;

			if (typeof src[arg] !== 'undefined'){
				if (isObject && typeof src[arg]=="string" && src[arg] != "") {
					tmpValue=JSON.parse(src[arg]);
				}
				out[outArg]=tmpValue;
			}
                        //AWS API takes 'Payload' not 'payload' (see Lambda)
                        if (arg=="Payload" && typeof tmpValue == 'undefined'){
                                out[arg]=src["payload"];
                        }

		}

		var service={};

		${mapKeys(serviceDef.operations, op => `
		service.${op}=function(svc,msg,cb){
			var params={};
			//copyArgs
			${(serviceDef.operations[op].input && serviceDef.operations[op].input.required) ? mapKeys(serviceDef.operations[op].input.required, input => `
			copyArg(n,"${serviceDef.operations[op].input.required[input]==='type'?'_type':serviceDef.operations[op].input.required[input]}",params,${serviceDef.operations[op].input.required[input]==='type'?'"type"':'undefined'},${typeof serviceDef.operations[op].input.members[serviceDef.operations[op].input.required[input]].shape !== "undefined"}); `) : ''}
			${(serviceDef.operations[op].input && serviceDef.operations[op].input.members) ? mapKeys(serviceDef.operations[op].input.members, input => `
			copyArg(msg,"${input}",params,undefined,${typeof serviceDef.operations[op].input.members[input].shape !== "undefined"}); `) : ''}
			${(serviceDef.operations[op].input && serviceDef.operations[op].input.shape) ? mapKeys(serviceDef.shapes[serviceDef.operations[op].input.shape].members, input => `
			copyArg(msg,"${input}",params,undefined,true); `) : ''}

			svc.${firstLetterLowercase(op)}(params,cb);
		}

		`)} 

	}
	RED.nodes.registerType("AWS ${serviceDef.metadata.serviceName}", AmazonAPINode);

};
`;

		fs.writeFileSync(`build/${serviceDef.metadata.serviceName}.html`, htmlFile);
		fs.writeFileSync(`build/${serviceDef.metadata.serviceName}.js`, jsFile);

		//console.log(`${serviceDef.metadata.serviceName} written to build dir`);
	}
};
