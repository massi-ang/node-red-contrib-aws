
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

		var awsService = new AWS.GreengrassV2( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.GreengrassV2(msg.AWSConfig) : awsService;

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
		
			service.BatchAssociateClientDeviceWithCoreDevice=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"coreDeviceThingName",params,undefined,false); 
			
			copyArgs(n,"entries",params,undefined,false); 
			copyArgs(n,"coreDeviceThingName",params,undefined,false); 
			
			copyArgs(msg,"entries",params,undefined,false); 
			copyArgs(msg,"coreDeviceThingName",params,undefined,false); 
			

			svc.batchAssociateClientDeviceWithCoreDevice(params,cb);
		}
			service.BatchDisassociateClientDeviceFromCoreDevice=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"coreDeviceThingName",params,undefined,false); 
			
			copyArgs(n,"entries",params,undefined,false); 
			copyArgs(n,"coreDeviceThingName",params,undefined,false); 
			
			copyArgs(msg,"entries",params,undefined,false); 
			copyArgs(msg,"coreDeviceThingName",params,undefined,false); 
			

			svc.batchDisassociateClientDeviceFromCoreDevice(params,cb);
		}
			service.CancelDeployment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"deploymentId",params,undefined,false); 
			
			copyArgs(n,"deploymentId",params,undefined,false); 
			
			copyArgs(msg,"deploymentId",params,undefined,false); 
			

			svc.cancelDeployment(params,cb);
		}
			service.CreateComponentVersion=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Buffer.from(n),"inlineRecipe",params,undefined,false); 
			copyArgs(n,"lambdaFunction",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"inlineRecipe",params,undefined,false); 
			copyArgs(msg,"lambdaFunction",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.createComponentVersion(params,cb);
		}
			service.CreateDeployment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"targetArn",params,undefined,false); 
			
			copyArgs(n,"targetArn",params,undefined,false); 
			copyArgs(n,"deploymentName",params,undefined,false); 
			copyArgs(n,"components",params,undefined,true); 
			copyArgs(n,"iotJobConfiguration",params,undefined,true); 
			copyArgs(n,"deploymentPolicies",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"targetArn",params,undefined,false); 
			copyArgs(msg,"deploymentName",params,undefined,false); 
			copyArgs(msg,"components",params,undefined,true); 
			copyArgs(msg,"iotJobConfiguration",params,undefined,true); 
			copyArgs(msg,"deploymentPolicies",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.createDeployment(params,cb);
		}
			service.DeleteComponent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.deleteComponent(params,cb);
		}
			service.DeleteCoreDevice=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"coreDeviceThingName",params,undefined,false); 
			
			copyArgs(n,"coreDeviceThingName",params,undefined,false); 
			
			copyArgs(msg,"coreDeviceThingName",params,undefined,false); 
			

			svc.deleteCoreDevice(params,cb);
		}
			service.DescribeComponent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.describeComponent(params,cb);
		}
			service.GetComponent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"recipeOutputFormat",params,undefined,false); 
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"recipeOutputFormat",params,undefined,false); 
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.getComponent(params,cb);
		}
			service.GetComponentVersionArtifact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"artifactName",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"artifactName",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"artifactName",params,undefined,false); 
			

			svc.getComponentVersionArtifact(params,cb);
		}
			service.GetCoreDevice=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"coreDeviceThingName",params,undefined,false); 
			
			copyArgs(n,"coreDeviceThingName",params,undefined,false); 
			
			copyArgs(msg,"coreDeviceThingName",params,undefined,false); 
			

			svc.getCoreDevice(params,cb);
		}
			service.GetDeployment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"deploymentId",params,undefined,false); 
			
			copyArgs(n,"deploymentId",params,undefined,false); 
			
			copyArgs(msg,"deploymentId",params,undefined,false); 
			

			svc.getDeployment(params,cb);
		}
			service.ListClientDevicesAssociatedWithCoreDevice=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"coreDeviceThingName",params,undefined,false); 
			
			copyArgs(n,"coreDeviceThingName",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"coreDeviceThingName",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listClientDevicesAssociatedWithCoreDevice(params,cb);
		}
			service.ListComponentVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listComponentVersions(params,cb);
		}
			service.ListComponents=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"scope",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"scope",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listComponents(params,cb);
		}
			service.ListCoreDevices=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"thingGroupArn",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"thingGroupArn",params,undefined,false); 
			copyArgs(msg,"status",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listCoreDevices(params,cb);
		}
			service.ListDeployments=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"targetArn",params,undefined,false); 
			copyArgs(n,"historyFilter",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"targetArn",params,undefined,false); 
			copyArgs(msg,"historyFilter",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listDeployments(params,cb);
		}
			service.ListEffectiveDeployments=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"coreDeviceThingName",params,undefined,false); 
			
			copyArgs(n,"coreDeviceThingName",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"coreDeviceThingName",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listEffectiveDeployments(params,cb);
		}
			service.ListInstalledComponents=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"coreDeviceThingName",params,undefined,false); 
			
			copyArgs(n,"coreDeviceThingName",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"coreDeviceThingName",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listInstalledComponents(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.ResolveComponentCandidates=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"platform",params,undefined,true); 
			copyArgs(n,"componentCandidates",params,undefined,false); 
			
			copyArgs(n,"platform",params,undefined,true); 
			copyArgs(n,"componentCandidates",params,undefined,false); 
			
			copyArgs(msg,"platform",params,undefined,true); 
			copyArgs(msg,"componentCandidates",params,undefined,false); 
			

			svc.resolveComponentCandidates(params,cb);
		}
			service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
			service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS GreengrassV2", AmazonAPINode);

};
