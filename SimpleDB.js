
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

		var awsService = new AWS.SimpleDB( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.SimpleDB(msg.AWSConfig) : awsService;

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

		
		service.BatchDeleteAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			copyArg(n,"Items",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"Items",params,undefined,false); 
			

			svc.batchDeleteAttributes(params,cb);
		}

		
		service.BatchPutAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			copyArg(n,"Items",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"Items",params,undefined,false); 
			

			svc.batchPutAttributes(params,cb);
		}

		
		service.CreateDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.createDomain(params,cb);
		}

		
		service.DeleteAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			copyArg(n,"ItemName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"ItemName",params,undefined,false); 
			copyArg(msg,"Attributes",params,undefined,true); 
			copyArg(msg,"Expected",params,undefined,true); 
			

			svc.deleteAttributes(params,cb);
		}

		
		service.DeleteDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.deleteDomain(params,cb);
		}

		
		service.DomainMetadata=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.domainMetadata(params,cb);
		}

		
		service.GetAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			copyArg(n,"ItemName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"ItemName",params,undefined,false); 
			copyArg(msg,"AttributeNames",params,undefined,false); 
			copyArg(msg,"ConsistentRead",params,undefined,false); 
			

			svc.getAttributes(params,cb);
		}

		
		service.ListDomains=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxNumberOfDomains",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listDomains(params,cb);
		}

		
		service.PutAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			copyArg(n,"ItemName",params,undefined,false); 
			copyArg(n,"Attributes",params,undefined,true); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"ItemName",params,undefined,false); 
			copyArg(msg,"Attributes",params,undefined,true); 
			copyArg(msg,"Expected",params,undefined,true); 
			

			svc.putAttributes(params,cb);
		}

		
		service.Select=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SelectExpression",params,undefined,false); 
			
			copyArg(msg,"SelectExpression",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"ConsistentRead",params,undefined,false); 
			

			svc.select(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS SimpleDB", AmazonAPINode);

};
