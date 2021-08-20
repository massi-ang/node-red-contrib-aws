
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

		var awsService = new AWS.GreengrassV2( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.GreengrassV2(msg.AWSConfig) : awsService;

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

		
		service.BatchAssociateClientDeviceWithCoreDevice=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"coreDeviceThingName",params,undefined,false); 
			
			copyArg(msg,"entries",params,undefined,false); 
			copyArg(msg,"coreDeviceThingName",params,undefined,false); 
			

			svc.batchAssociateClientDeviceWithCoreDevice(params,cb);
		}

		
		service.BatchDisassociateClientDeviceFromCoreDevice=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"coreDeviceThingName",params,undefined,false); 
			
			copyArg(msg,"entries",params,undefined,false); 
			copyArg(msg,"coreDeviceThingName",params,undefined,false); 
			

			svc.batchDisassociateClientDeviceFromCoreDevice(params,cb);
		}

		
		service.CancelDeployment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"deploymentId",params,undefined,false); 
			
			copyArg(msg,"deploymentId",params,undefined,false); 
			

			svc.cancelDeployment(params,cb);
		}

		
		service.CreateComponentVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"inlineRecipe",params,undefined,false); 
			copyArg(msg,"lambdaFunction",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.createComponentVersion(params,cb);
		}

		
		service.CreateDeployment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"targetArn",params,undefined,false); 
			
			copyArg(msg,"targetArn",params,undefined,false); 
			copyArg(msg,"deploymentName",params,undefined,false); 
			copyArg(msg,"components",params,undefined,true); 
			copyArg(msg,"iotJobConfiguration",params,undefined,true); 
			copyArg(msg,"deploymentPolicies",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.createDeployment(params,cb);
		}

		
		service.DeleteComponent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.deleteComponent(params,cb);
		}

		
		service.DeleteCoreDevice=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"coreDeviceThingName",params,undefined,false); 
			
			copyArg(msg,"coreDeviceThingName",params,undefined,false); 
			

			svc.deleteCoreDevice(params,cb);
		}

		
		service.DescribeComponent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.describeComponent(params,cb);
		}

		
		service.GetComponent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"recipeOutputFormat",params,undefined,false); 
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.getComponent(params,cb);
		}

		
		service.GetComponentVersionArtifact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			copyArg(n,"artifactName",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"artifactName",params,undefined,false); 
			

			svc.getComponentVersionArtifact(params,cb);
		}

		
		service.GetCoreDevice=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"coreDeviceThingName",params,undefined,false); 
			
			copyArg(msg,"coreDeviceThingName",params,undefined,false); 
			

			svc.getCoreDevice(params,cb);
		}

		
		service.GetDeployment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"deploymentId",params,undefined,false); 
			
			copyArg(msg,"deploymentId",params,undefined,false); 
			

			svc.getDeployment(params,cb);
		}

		
		service.ListClientDevicesAssociatedWithCoreDevice=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"coreDeviceThingName",params,undefined,false); 
			
			copyArg(msg,"coreDeviceThingName",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listClientDevicesAssociatedWithCoreDevice(params,cb);
		}

		
		service.ListComponentVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listComponentVersions(params,cb);
		}

		
		service.ListComponents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"scope",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listComponents(params,cb);
		}

		
		service.ListCoreDevices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"thingGroupArn",params,undefined,false); 
			copyArg(msg,"status",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listCoreDevices(params,cb);
		}

		
		service.ListDeployments=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"targetArn",params,undefined,false); 
			copyArg(msg,"historyFilter",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listDeployments(params,cb);
		}

		
		service.ListEffectiveDeployments=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"coreDeviceThingName",params,undefined,false); 
			
			copyArg(msg,"coreDeviceThingName",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listEffectiveDeployments(params,cb);
		}

		
		service.ListInstalledComponents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"coreDeviceThingName",params,undefined,false); 
			
			copyArg(msg,"coreDeviceThingName",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listInstalledComponents(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ResolveComponentCandidates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"platform",params,undefined,true); 
			copyArg(n,"componentCandidates",params,undefined,false); 
			
			copyArg(msg,"platform",params,undefined,true); 
			copyArg(msg,"componentCandidates",params,undefined,false); 
			

			svc.resolveComponentCandidates(params,cb);
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
	RED.nodes.registerType("AWS GreengrassV2", AmazonAPINode);

};
