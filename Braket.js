
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

		var awsService = new AWS.Braket( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Braket(msg.AWSConfig) : awsService;

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

		
		service.CancelQuantumTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"clientToken",params,undefined,false); 
			copyArg(n,"quantumTaskArn",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"quantumTaskArn",params,undefined,false); 
			

			svc.cancelQuantumTask(params,cb);
		}

		
		service.CreateQuantumTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"action",params,undefined,false); 
			copyArg(n,"clientToken",params,undefined,false); 
			copyArg(n,"deviceArn",params,undefined,false); 
			copyArg(n,"outputS3Bucket",params,undefined,false); 
			copyArg(n,"outputS3KeyPrefix",params,undefined,false); 
			copyArg(n,"shots",params,undefined,false); 
			
			copyArg(msg,"action",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"deviceArn",params,undefined,false); 
			copyArg(msg,"deviceParameters",params,undefined,false); 
			copyArg(msg,"outputS3Bucket",params,undefined,false); 
			copyArg(msg,"outputS3KeyPrefix",params,undefined,false); 
			copyArg(msg,"shots",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createQuantumTask(params,cb);
		}

		
		service.GetDevice=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"deviceArn",params,undefined,false); 
			
			copyArg(msg,"deviceArn",params,undefined,false); 
			

			svc.getDevice(params,cb);
		}

		
		service.GetQuantumTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"quantumTaskArn",params,undefined,false); 
			
			copyArg(msg,"quantumTaskArn",params,undefined,false); 
			

			svc.getQuantumTask(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.SearchDevices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"filters",params,undefined,false); 
			
			copyArg(msg,"filters",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.searchDevices(params,cb);
		}

		
		service.SearchQuantumTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"filters",params,undefined,false); 
			
			copyArg(msg,"filters",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.searchQuantumTasks(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"tags",params,undefined,true); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"tagKeys",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Braket", AmazonAPINode);

};
