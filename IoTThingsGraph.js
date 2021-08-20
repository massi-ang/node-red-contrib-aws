
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

		var awsService = new AWS.IoTThingsGraph( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.IoTThingsGraph(msg.AWSConfig) : awsService;

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

		
		service.AssociateEntityToThing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingName",params,undefined,false); 
			copyArg(n,"entityId",params,undefined,false); 
			
			copyArg(msg,"thingName",params,undefined,false); 
			copyArg(msg,"entityId",params,undefined,false); 
			copyArg(msg,"namespaceVersion",params,undefined,false); 
			

			svc.associateEntityToThing(params,cb);
		}

		
		service.CreateFlowTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"definition",params,undefined,true); 
			
			copyArg(msg,"definition",params,undefined,true); 
			copyArg(msg,"compatibleNamespaceVersion",params,undefined,false); 
			

			svc.createFlowTemplate(params,cb);
		}

		
		service.CreateSystemInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"definition",params,undefined,true); 
			copyArg(n,"target",params,undefined,false); 
			
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"definition",params,undefined,true); 
			copyArg(msg,"target",params,undefined,false); 
			copyArg(msg,"greengrassGroupName",params,undefined,false); 
			copyArg(msg,"s3BucketName",params,undefined,false); 
			copyArg(msg,"metricsConfiguration",params,undefined,true); 
			copyArg(msg,"flowActionsRoleArn",params,undefined,false); 
			

			svc.createSystemInstance(params,cb);
		}

		
		service.CreateSystemTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"definition",params,undefined,true); 
			
			copyArg(msg,"definition",params,undefined,true); 
			copyArg(msg,"compatibleNamespaceVersion",params,undefined,false); 
			

			svc.createSystemTemplate(params,cb);
		}

		
		service.DeleteFlowTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			

			svc.deleteFlowTemplate(params,cb);
		}

		
		service.DeleteNamespace=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.deleteNamespace(params,cb);
		}

		
		service.DeleteSystemInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"id",params,undefined,false); 
			

			svc.deleteSystemInstance(params,cb);
		}

		
		service.DeleteSystemTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			

			svc.deleteSystemTemplate(params,cb);
		}

		
		service.DeploySystemInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"id",params,undefined,false); 
			

			svc.deploySystemInstance(params,cb);
		}

		
		service.DeprecateFlowTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			

			svc.deprecateFlowTemplate(params,cb);
		}

		
		service.DeprecateSystemTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			

			svc.deprecateSystemTemplate(params,cb);
		}

		
		service.DescribeNamespace=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"namespaceName",params,undefined,false); 
			

			svc.describeNamespace(params,cb);
		}

		
		service.DissociateEntityFromThing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingName",params,undefined,false); 
			copyArg(n,"entityType",params,undefined,false); 
			
			copyArg(msg,"thingName",params,undefined,false); 
			copyArg(msg,"entityType",params,undefined,false); 
			

			svc.dissociateEntityFromThing(params,cb);
		}

		
		service.GetEntities=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ids",params,undefined,false); 
			
			copyArg(msg,"ids",params,undefined,false); 
			copyArg(msg,"namespaceVersion",params,undefined,false); 
			

			svc.getEntities(params,cb);
		}

		
		service.GetFlowTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			copyArg(msg,"revisionNumber",params,undefined,false); 
			

			svc.getFlowTemplate(params,cb);
		}

		
		service.GetFlowTemplateRevisions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.getFlowTemplateRevisions(params,cb);
		}

		
		service.GetNamespaceDeletionStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getNamespaceDeletionStatus(params,cb);
		}

		
		service.GetSystemInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			

			svc.getSystemInstance(params,cb);
		}

		
		service.GetSystemTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			copyArg(msg,"revisionNumber",params,undefined,false); 
			

			svc.getSystemTemplate(params,cb);
		}

		
		service.GetSystemTemplateRevisions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.getSystemTemplateRevisions(params,cb);
		}

		
		service.GetUploadStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"uploadId",params,undefined,false); 
			
			copyArg(msg,"uploadId",params,undefined,false); 
			

			svc.getUploadStatus(params,cb);
		}

		
		service.ListFlowExecutionMessages=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"flowExecutionId",params,undefined,false); 
			
			copyArg(msg,"flowExecutionId",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listFlowExecutionMessages(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.SearchEntities=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"entityTypes",params,undefined,false); 
			
			copyArg(msg,"entityTypes",params,undefined,false); 
			copyArg(msg,"filters",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"namespaceVersion",params,undefined,false); 
			

			svc.searchEntities(params,cb);
		}

		
		service.SearchFlowExecutions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"systemInstanceId",params,undefined,false); 
			
			copyArg(msg,"systemInstanceId",params,undefined,false); 
			copyArg(msg,"flowExecutionId",params,undefined,false); 
			copyArg(msg,"startTime",params,undefined,false); 
			copyArg(msg,"endTime",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.searchFlowExecutions(params,cb);
		}

		
		service.SearchFlowTemplates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"filters",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.searchFlowTemplates(params,cb);
		}

		
		service.SearchSystemInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"filters",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.searchSystemInstances(params,cb);
		}

		
		service.SearchSystemTemplates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"filters",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.searchSystemTemplates(params,cb);
		}

		
		service.SearchThings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"entityId",params,undefined,false); 
			
			copyArg(msg,"entityId",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"namespaceVersion",params,undefined,false); 
			

			svc.searchThings(params,cb);
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

		
		service.UndeploySystemInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"id",params,undefined,false); 
			

			svc.undeploySystemInstance(params,cb);
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

		
		service.UpdateFlowTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			copyArg(n,"definition",params,undefined,true); 
			
			copyArg(msg,"id",params,undefined,false); 
			copyArg(msg,"definition",params,undefined,true); 
			copyArg(msg,"compatibleNamespaceVersion",params,undefined,false); 
			

			svc.updateFlowTemplate(params,cb);
		}

		
		service.UpdateSystemTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			copyArg(n,"definition",params,undefined,true); 
			
			copyArg(msg,"id",params,undefined,false); 
			copyArg(msg,"definition",params,undefined,true); 
			copyArg(msg,"compatibleNamespaceVersion",params,undefined,false); 
			

			svc.updateSystemTemplate(params,cb);
		}

		
		service.UploadEntityDefinitions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"document",params,undefined,true); 
			copyArg(msg,"syncWithPublicNamespace",params,undefined,false); 
			copyArg(msg,"deprecateExistingEntities",params,undefined,false); 
			

			svc.uploadEntityDefinitions(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS IoTThingsGraph", AmazonAPINode);

};
