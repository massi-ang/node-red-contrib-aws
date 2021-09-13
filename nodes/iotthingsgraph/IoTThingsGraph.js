
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

		var awsService = new AWS.IoTThingsGraph( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.IoTThingsGraph(msg.AWSConfig) : awsService;

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
		
			service.AssociateEntityToThing=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"thingName",params,undefined,false); 
			copyArgs(n,"entityId",params,undefined,false); 
			
			copyArgs(n,"thingName",params,undefined,false); 
			copyArgs(n,"entityId",params,undefined,false); 
			copyArgs(n,"namespaceVersion",params,undefined,false); 
			
			copyArgs(msg,"thingName",params,undefined,false); 
			copyArgs(msg,"entityId",params,undefined,false); 
			copyArgs(msg,"namespaceVersion",params,undefined,false); 
			

			svc.associateEntityToThing(params,cb);
		}
			service.CreateFlowTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"definition",params,undefined,true); 
			
			copyArgs(n,"definition",params,undefined,true); 
			copyArgs(n,"compatibleNamespaceVersion",params,undefined,false); 
			
			copyArgs(msg,"definition",params,undefined,true); 
			copyArgs(msg,"compatibleNamespaceVersion",params,undefined,false); 
			

			svc.createFlowTemplate(params,cb);
		}
			service.CreateSystemInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"definition",params,undefined,true); 
			copyArgs(n,"target",params,undefined,false); 
			
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"definition",params,undefined,true); 
			copyArgs(n,"target",params,undefined,false); 
			copyArgs(n,"greengrassGroupName",params,undefined,false); 
			copyArgs(n,"s3BucketName",params,undefined,false); 
			copyArgs(n,"metricsConfiguration",params,undefined,true); 
			copyArgs(n,"flowActionsRoleArn",params,undefined,false); 
			
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"definition",params,undefined,true); 
			copyArgs(msg,"target",params,undefined,false); 
			copyArgs(msg,"greengrassGroupName",params,undefined,false); 
			copyArgs(msg,"s3BucketName",params,undefined,false); 
			copyArgs(msg,"metricsConfiguration",params,undefined,true); 
			copyArgs(msg,"flowActionsRoleArn",params,undefined,false); 
			

			svc.createSystemInstance(params,cb);
		}
			service.CreateSystemTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"definition",params,undefined,true); 
			
			copyArgs(n,"definition",params,undefined,true); 
			copyArgs(n,"compatibleNamespaceVersion",params,undefined,false); 
			
			copyArgs(msg,"definition",params,undefined,true); 
			copyArgs(msg,"compatibleNamespaceVersion",params,undefined,false); 
			

			svc.createSystemTemplate(params,cb);
		}
			service.DeleteFlowTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.deleteFlowTemplate(params,cb);
		}
			service.DeleteNamespace=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.deleteNamespace(params,cb);
		}
			service.DeleteSystemInstance=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.deleteSystemInstance(params,cb);
		}
			service.DeleteSystemTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.deleteSystemTemplate(params,cb);
		}
			service.DeploySystemInstance=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.deploySystemInstance(params,cb);
		}
			service.DeprecateFlowTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.deprecateFlowTemplate(params,cb);
		}
			service.DeprecateSystemTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.deprecateSystemTemplate(params,cb);
		}
			service.DescribeNamespace=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"namespaceName",params,undefined,false); 
			
			copyArgs(msg,"namespaceName",params,undefined,false); 
			

			svc.describeNamespace(params,cb);
		}
			service.DissociateEntityFromThing=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"thingName",params,undefined,false); 
			copyArgs(n,"entityType",params,undefined,false); 
			
			copyArgs(n,"thingName",params,undefined,false); 
			copyArgs(n,"entityType",params,undefined,false); 
			
			copyArgs(msg,"thingName",params,undefined,false); 
			copyArgs(msg,"entityType",params,undefined,false); 
			

			svc.dissociateEntityFromThing(params,cb);
		}
			service.GetEntities=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ids",params,undefined,false); 
			
			copyArgs(n,"ids",params,undefined,false); 
			copyArgs(n,"namespaceVersion",params,undefined,false); 
			
			copyArgs(msg,"ids",params,undefined,false); 
			copyArgs(msg,"namespaceVersion",params,undefined,false); 
			

			svc.getEntities(params,cb);
		}
			service.GetFlowTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"revisionNumber",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			copyArgs(msg,"revisionNumber",params,undefined,false); 
			

			svc.getFlowTemplate(params,cb);
		}
			service.GetFlowTemplateRevisions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getFlowTemplateRevisions(params,cb);
		}
			service.GetNamespaceDeletionStatus=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getNamespaceDeletionStatus(params,cb);
		}
			service.GetSystemInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.getSystemInstance(params,cb);
		}
			service.GetSystemTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"revisionNumber",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			copyArgs(msg,"revisionNumber",params,undefined,false); 
			

			svc.getSystemTemplate(params,cb);
		}
			service.GetSystemTemplateRevisions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getSystemTemplateRevisions(params,cb);
		}
			service.GetUploadStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"uploadId",params,undefined,false); 
			
			copyArgs(n,"uploadId",params,undefined,false); 
			
			copyArgs(msg,"uploadId",params,undefined,false); 
			

			svc.getUploadStatus(params,cb);
		}
			service.ListFlowExecutionMessages=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"flowExecutionId",params,undefined,false); 
			
			copyArgs(n,"flowExecutionId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"flowExecutionId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listFlowExecutionMessages(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.SearchEntities=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"entityTypes",params,undefined,false); 
			
			copyArgs(n,"entityTypes",params,undefined,false); 
			copyArgs(n,"filters",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"namespaceVersion",params,undefined,false); 
			
			copyArgs(msg,"entityTypes",params,undefined,false); 
			copyArgs(msg,"filters",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"namespaceVersion",params,undefined,false); 
			

			svc.searchEntities(params,cb);
		}
			service.SearchFlowExecutions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"systemInstanceId",params,undefined,false); 
			
			copyArgs(n,"systemInstanceId",params,undefined,false); 
			copyArgs(n,"flowExecutionId",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"systemInstanceId",params,undefined,false); 
			copyArgs(msg,"flowExecutionId",params,undefined,false); 
			copyArgs(msg,"startTime",params,undefined,false); 
			copyArgs(msg,"endTime",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.searchFlowExecutions(params,cb);
		}
			service.SearchFlowTemplates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"filters",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"filters",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.searchFlowTemplates(params,cb);
		}
			service.SearchSystemInstances=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"filters",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"filters",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.searchSystemInstances(params,cb);
		}
			service.SearchSystemTemplates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"filters",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"filters",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.searchSystemTemplates(params,cb);
		}
			service.SearchThings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"entityId",params,undefined,false); 
			
			copyArgs(n,"entityId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"namespaceVersion",params,undefined,false); 
			
			copyArgs(msg,"entityId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"namespaceVersion",params,undefined,false); 
			

			svc.searchThings(params,cb);
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
			service.UndeploySystemInstance=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.undeploySystemInstance(params,cb);
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
			service.UpdateFlowTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"definition",params,undefined,true); 
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"definition",params,undefined,true); 
			copyArgs(n,"compatibleNamespaceVersion",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			copyArgs(msg,"definition",params,undefined,true); 
			copyArgs(msg,"compatibleNamespaceVersion",params,undefined,false); 
			

			svc.updateFlowTemplate(params,cb);
		}
			service.UpdateSystemTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"definition",params,undefined,true); 
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"definition",params,undefined,true); 
			copyArgs(n,"compatibleNamespaceVersion",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			copyArgs(msg,"definition",params,undefined,true); 
			copyArgs(msg,"compatibleNamespaceVersion",params,undefined,false); 
			

			svc.updateSystemTemplate(params,cb);
		}
			service.UploadEntityDefinitions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"document",params,undefined,true); 
			copyArgs(Boolean(n),"syncWithPublicNamespace",params,undefined,false); 
			copyArgs(Boolean(n),"deprecateExistingEntities",params,undefined,false); 
			
			copyArgs(msg,"document",params,undefined,true); 
			copyArgs(msg,"syncWithPublicNamespace",params,undefined,false); 
			copyArgs(msg,"deprecateExistingEntities",params,undefined,false); 
			

			svc.uploadEntityDefinitions(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS IoTThingsGraph", AmazonAPINode);

};
