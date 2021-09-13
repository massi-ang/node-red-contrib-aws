
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

		var awsService = new AWS.SSMIncidents( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.SSMIncidents(msg.AWSConfig) : awsService;

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
		
			service.CreateReplicationSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"regions",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"regions",params,undefined,false); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"regions",params,undefined,false); 
			

			svc.createReplicationSet(params,cb);
		}
			service.CreateResponsePlan=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"incidentTemplate",params,undefined,true); 
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"actions",params,undefined,true); 
			copyArgs(n,"chatChannel",params,undefined,true); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"displayName",params,undefined,false); 
			copyArgs(n,"engagements",params,undefined,true); 
			copyArgs(n,"incidentTemplate",params,undefined,true); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"actions",params,undefined,true); 
			copyArgs(msg,"chatChannel",params,undefined,true); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"displayName",params,undefined,false); 
			copyArgs(msg,"engagements",params,undefined,true); 
			copyArgs(msg,"incidentTemplate",params,undefined,true); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createResponsePlan(params,cb);
		}
			service.CreateTimelineEvent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"eventData",params,undefined,false); 
			copyArgs(n,"eventTime",params,undefined,false); 
			copyArgs(n,"eventType",params,undefined,false); 
			copyArgs(n,"incidentRecordArn",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"eventData",params,undefined,false); 
			copyArgs(n,"eventTime",params,undefined,false); 
			copyArgs(n,"eventType",params,undefined,false); 
			copyArgs(n,"incidentRecordArn",params,undefined,false); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"eventData",params,undefined,false); 
			copyArgs(msg,"eventTime",params,undefined,false); 
			copyArgs(msg,"eventType",params,undefined,false); 
			copyArgs(msg,"incidentRecordArn",params,undefined,false); 
			

			svc.createTimelineEvent(params,cb);
		}
			service.DeleteIncidentRecord=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.deleteIncidentRecord(params,cb);
		}
			service.DeleteReplicationSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.deleteReplicationSet(params,cb);
		}
			service.DeleteResourcePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"policyId",params,undefined,false); 
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"policyId",params,undefined,false); 
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"policyId",params,undefined,false); 
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.deleteResourcePolicy(params,cb);
		}
			service.DeleteResponsePlan=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.deleteResponsePlan(params,cb);
		}
			service.DeleteTimelineEvent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"eventId",params,undefined,false); 
			copyArgs(n,"incidentRecordArn",params,undefined,false); 
			
			copyArgs(n,"eventId",params,undefined,false); 
			copyArgs(n,"incidentRecordArn",params,undefined,false); 
			
			copyArgs(msg,"eventId",params,undefined,false); 
			copyArgs(msg,"incidentRecordArn",params,undefined,false); 
			

			svc.deleteTimelineEvent(params,cb);
		}
			service.GetIncidentRecord=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.getIncidentRecord(params,cb);
		}
			service.GetReplicationSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.getReplicationSet(params,cb);
		}
			service.GetResourcePolicies=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.getResourcePolicies(params,cb);
		}
			service.GetResponsePlan=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.getResponsePlan(params,cb);
		}
			service.GetTimelineEvent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"eventId",params,undefined,false); 
			copyArgs(n,"incidentRecordArn",params,undefined,false); 
			
			copyArgs(n,"eventId",params,undefined,false); 
			copyArgs(n,"incidentRecordArn",params,undefined,false); 
			
			copyArgs(msg,"eventId",params,undefined,false); 
			copyArgs(msg,"incidentRecordArn",params,undefined,false); 
			

			svc.getTimelineEvent(params,cb);
		}
			service.ListIncidentRecords=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"filters",params,undefined,true); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"filters",params,undefined,true); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listIncidentRecords(params,cb);
		}
			service.ListRelatedItems=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"incidentRecordArn",params,undefined,false); 
			
			copyArgs(n,"incidentRecordArn",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"incidentRecordArn",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listRelatedItems(params,cb);
		}
			service.ListReplicationSets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listReplicationSets(params,cb);
		}
			service.ListResponsePlans=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listResponsePlans(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.ListTimelineEvents=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"incidentRecordArn",params,undefined,false); 
			
			copyArgs(n,"filters",params,undefined,true); 
			copyArgs(n,"incidentRecordArn",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"sortBy",params,undefined,false); 
			copyArgs(n,"sortOrder",params,undefined,false); 
			
			copyArgs(msg,"filters",params,undefined,true); 
			copyArgs(msg,"incidentRecordArn",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"sortBy",params,undefined,false); 
			copyArgs(msg,"sortOrder",params,undefined,false); 
			

			svc.listTimelineEvents(params,cb);
		}
			service.PutResourcePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"policy",params,undefined,false); 
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"policy",params,undefined,false); 
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"policy",params,undefined,false); 
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.putResourcePolicy(params,cb);
		}
			service.StartIncident=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"responsePlanArn",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(Number(n),"impact",params,undefined,false); 
			copyArgs(n,"relatedItems",params,undefined,true); 
			copyArgs(n,"responsePlanArn",params,undefined,false); 
			copyArgs(n,"title",params,undefined,false); 
			copyArgs(n,"triggerDetails",params,undefined,false); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"impact",params,undefined,false); 
			copyArgs(msg,"relatedItems",params,undefined,true); 
			copyArgs(msg,"responsePlanArn",params,undefined,false); 
			copyArgs(msg,"title",params,undefined,false); 
			copyArgs(msg,"triggerDetails",params,undefined,false); 
			

			svc.startIncident(params,cb);
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
			service.UpdateDeletionProtection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(Boolean(n),"deletionProtected",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(Boolean(n),"deletionProtected",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"deletionProtected",params,undefined,false); 
			

			svc.updateDeletionProtection(params,cb);
		}
			service.UpdateIncidentRecord=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"chatChannel",params,undefined,true); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(Number(n),"impact",params,undefined,false); 
			copyArgs(n,"notificationTargets",params,undefined,true); 
			copyArgs(n,"status",params,undefined,false); 
			copyArgs(n,"summary",params,undefined,false); 
			copyArgs(n,"title",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"chatChannel",params,undefined,true); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"impact",params,undefined,false); 
			copyArgs(msg,"notificationTargets",params,undefined,true); 
			copyArgs(msg,"status",params,undefined,false); 
			copyArgs(msg,"summary",params,undefined,false); 
			copyArgs(msg,"title",params,undefined,false); 
			

			svc.updateIncidentRecord(params,cb);
		}
			service.UpdateRelatedItems=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"incidentRecordArn",params,undefined,false); 
			copyArgs(n,"relatedItemsUpdate",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"incidentRecordArn",params,undefined,false); 
			copyArgs(n,"relatedItemsUpdate",params,undefined,false); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"incidentRecordArn",params,undefined,false); 
			copyArgs(msg,"relatedItemsUpdate",params,undefined,false); 
			

			svc.updateRelatedItems(params,cb);
		}
			service.UpdateReplicationSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"actions",params,undefined,false); 
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"actions",params,undefined,false); 
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"actions",params,undefined,false); 
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.updateReplicationSet(params,cb);
		}
			service.UpdateResponsePlan=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"actions",params,undefined,true); 
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"chatChannel",params,undefined,true); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"displayName",params,undefined,false); 
			copyArgs(n,"engagements",params,undefined,true); 
			copyArgs(n,"incidentTemplateDedupeString",params,undefined,false); 
			copyArgs(Number(n),"incidentTemplateImpact",params,undefined,false); 
			copyArgs(n,"incidentTemplateNotificationTargets",params,undefined,true); 
			copyArgs(n,"incidentTemplateSummary",params,undefined,false); 
			copyArgs(n,"incidentTemplateTitle",params,undefined,false); 
			
			copyArgs(msg,"actions",params,undefined,true); 
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"chatChannel",params,undefined,true); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"displayName",params,undefined,false); 
			copyArgs(msg,"engagements",params,undefined,true); 
			copyArgs(msg,"incidentTemplateDedupeString",params,undefined,false); 
			copyArgs(msg,"incidentTemplateImpact",params,undefined,false); 
			copyArgs(msg,"incidentTemplateNotificationTargets",params,undefined,true); 
			copyArgs(msg,"incidentTemplateSummary",params,undefined,false); 
			copyArgs(msg,"incidentTemplateTitle",params,undefined,false); 
			

			svc.updateResponsePlan(params,cb);
		}
			service.UpdateTimelineEvent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"eventId",params,undefined,false); 
			copyArgs(n,"incidentRecordArn",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"eventData",params,undefined,false); 
			copyArgs(n,"eventId",params,undefined,false); 
			copyArgs(n,"eventTime",params,undefined,false); 
			copyArgs(n,"eventType",params,undefined,false); 
			copyArgs(n,"incidentRecordArn",params,undefined,false); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"eventData",params,undefined,false); 
			copyArgs(msg,"eventId",params,undefined,false); 
			copyArgs(msg,"eventTime",params,undefined,false); 
			copyArgs(msg,"eventType",params,undefined,false); 
			copyArgs(msg,"incidentRecordArn",params,undefined,false); 
			

			svc.updateTimelineEvent(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS SSMIncidents", AmazonAPINode);

};
