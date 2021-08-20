
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

		var awsService = new AWS.SSMIncidents( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.SSMIncidents(msg.AWSConfig) : awsService;

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

		
		service.CreateReplicationSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"regions",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"regions",params,undefined,false); 
			

			svc.createReplicationSet(params,cb);
		}

		
		service.CreateResponsePlan=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"incidentTemplate",params,undefined,true); 
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"actions",params,undefined,true); 
			copyArg(msg,"chatChannel",params,undefined,true); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"displayName",params,undefined,false); 
			copyArg(msg,"engagements",params,undefined,true); 
			copyArg(msg,"incidentTemplate",params,undefined,true); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createResponsePlan(params,cb);
		}

		
		service.CreateTimelineEvent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"eventData",params,undefined,false); 
			copyArg(n,"eventTime",params,undefined,false); 
			copyArg(n,"eventType",params,undefined,false); 
			copyArg(n,"incidentRecordArn",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"eventData",params,undefined,false); 
			copyArg(msg,"eventTime",params,undefined,false); 
			copyArg(msg,"eventType",params,undefined,false); 
			copyArg(msg,"incidentRecordArn",params,undefined,false); 
			

			svc.createTimelineEvent(params,cb);
		}

		
		service.DeleteIncidentRecord=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.deleteIncidentRecord(params,cb);
		}

		
		service.DeleteReplicationSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.deleteReplicationSet(params,cb);
		}

		
		service.DeleteResourcePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyId",params,undefined,false); 
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"policyId",params,undefined,false); 
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.deleteResourcePolicy(params,cb);
		}

		
		service.DeleteResponsePlan=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.deleteResponsePlan(params,cb);
		}

		
		service.DeleteTimelineEvent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"eventId",params,undefined,false); 
			copyArg(n,"incidentRecordArn",params,undefined,false); 
			
			copyArg(msg,"eventId",params,undefined,false); 
			copyArg(msg,"incidentRecordArn",params,undefined,false); 
			

			svc.deleteTimelineEvent(params,cb);
		}

		
		service.GetIncidentRecord=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.getIncidentRecord(params,cb);
		}

		
		service.GetReplicationSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.getReplicationSet(params,cb);
		}

		
		service.GetResourcePolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.getResourcePolicies(params,cb);
		}

		
		service.GetResponsePlan=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.getResponsePlan(params,cb);
		}

		
		service.GetTimelineEvent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"eventId",params,undefined,false); 
			copyArg(n,"incidentRecordArn",params,undefined,false); 
			
			copyArg(msg,"eventId",params,undefined,false); 
			copyArg(msg,"incidentRecordArn",params,undefined,false); 
			

			svc.getTimelineEvent(params,cb);
		}

		
		service.ListIncidentRecords=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"filters",params,undefined,true); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listIncidentRecords(params,cb);
		}

		
		service.ListRelatedItems=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"incidentRecordArn",params,undefined,false); 
			
			copyArg(msg,"incidentRecordArn",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listRelatedItems(params,cb);
		}

		
		service.ListReplicationSets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listReplicationSets(params,cb);
		}

		
		service.ListResponsePlans=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listResponsePlans(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListTimelineEvents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"incidentRecordArn",params,undefined,false); 
			
			copyArg(msg,"filters",params,undefined,true); 
			copyArg(msg,"incidentRecordArn",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"sortBy",params,undefined,false); 
			copyArg(msg,"sortOrder",params,undefined,false); 
			

			svc.listTimelineEvents(params,cb);
		}

		
		service.PutResourcePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policy",params,undefined,false); 
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"policy",params,undefined,false); 
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.putResourcePolicy(params,cb);
		}

		
		service.StartIncident=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"responsePlanArn",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"impact",params,undefined,false); 
			copyArg(msg,"relatedItems",params,undefined,true); 
			copyArg(msg,"responsePlanArn",params,undefined,false); 
			copyArg(msg,"title",params,undefined,false); 
			copyArg(msg,"triggerDetails",params,undefined,false); 
			

			svc.startIncident(params,cb);
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

		
		service.UpdateDeletionProtection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			copyArg(n,"deletionProtected",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"deletionProtected",params,undefined,false); 
			

			svc.updateDeletionProtection(params,cb);
		}

		
		service.UpdateIncidentRecord=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"chatChannel",params,undefined,true); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"impact",params,undefined,false); 
			copyArg(msg,"notificationTargets",params,undefined,true); 
			copyArg(msg,"status",params,undefined,false); 
			copyArg(msg,"summary",params,undefined,false); 
			copyArg(msg,"title",params,undefined,false); 
			

			svc.updateIncidentRecord(params,cb);
		}

		
		service.UpdateRelatedItems=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"incidentRecordArn",params,undefined,false); 
			copyArg(n,"relatedItemsUpdate",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"incidentRecordArn",params,undefined,false); 
			copyArg(msg,"relatedItemsUpdate",params,undefined,false); 
			

			svc.updateRelatedItems(params,cb);
		}

		
		service.UpdateReplicationSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"actions",params,undefined,false); 
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"actions",params,undefined,false); 
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.updateReplicationSet(params,cb);
		}

		
		service.UpdateResponsePlan=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"actions",params,undefined,true); 
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"chatChannel",params,undefined,true); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"displayName",params,undefined,false); 
			copyArg(msg,"engagements",params,undefined,true); 
			copyArg(msg,"incidentTemplateDedupeString",params,undefined,false); 
			copyArg(msg,"incidentTemplateImpact",params,undefined,false); 
			copyArg(msg,"incidentTemplateNotificationTargets",params,undefined,true); 
			copyArg(msg,"incidentTemplateSummary",params,undefined,false); 
			copyArg(msg,"incidentTemplateTitle",params,undefined,false); 
			

			svc.updateResponsePlan(params,cb);
		}

		
		service.UpdateTimelineEvent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"eventId",params,undefined,false); 
			copyArg(n,"incidentRecordArn",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"eventData",params,undefined,false); 
			copyArg(msg,"eventId",params,undefined,false); 
			copyArg(msg,"eventTime",params,undefined,false); 
			copyArg(msg,"eventType",params,undefined,false); 
			copyArg(msg,"incidentRecordArn",params,undefined,false); 
			

			svc.updateTimelineEvent(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS SSMIncidents", AmazonAPINode);

};
