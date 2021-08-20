
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

		var awsService = new AWS.SWF( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.SWF(msg.AWSConfig) : awsService;

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

		
		service.CountClosedWorkflowExecutions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"startTimeFilter",params,undefined,true); 
			copyArg(msg,"closeTimeFilter",params,undefined,true); 
			copyArg(msg,"executionFilter",params,undefined,true); 
			copyArg(msg,"typeFilter",params,undefined,true); 
			copyArg(msg,"tagFilter",params,undefined,true); 
			copyArg(msg,"closeStatusFilter",params,undefined,true); 
			

			svc.countClosedWorkflowExecutions(params,cb);
		}

		
		service.CountOpenWorkflowExecutions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"startTimeFilter",params,undefined,true); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"startTimeFilter",params,undefined,true); 
			copyArg(msg,"typeFilter",params,undefined,true); 
			copyArg(msg,"tagFilter",params,undefined,true); 
			copyArg(msg,"executionFilter",params,undefined,true); 
			

			svc.countOpenWorkflowExecutions(params,cb);
		}

		
		service.CountPendingActivityTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"taskList",params,undefined,true); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"taskList",params,undefined,true); 
			

			svc.countPendingActivityTasks(params,cb);
		}

		
		service.CountPendingDecisionTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"taskList",params,undefined,true); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"taskList",params,undefined,true); 
			

			svc.countPendingDecisionTasks(params,cb);
		}

		
		service.DeprecateActivityType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"activityType",params,undefined,true); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"activityType",params,undefined,true); 
			

			svc.deprecateActivityType(params,cb);
		}

		
		service.DeprecateDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			

			svc.deprecateDomain(params,cb);
		}

		
		service.DeprecateWorkflowType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"workflowType",params,undefined,true); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"workflowType",params,undefined,true); 
			

			svc.deprecateWorkflowType(params,cb);
		}

		
		service.DescribeActivityType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"activityType",params,undefined,true); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"activityType",params,undefined,true); 
			

			svc.describeActivityType(params,cb);
		}

		
		service.DescribeDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			

			svc.describeDomain(params,cb);
		}

		
		service.DescribeWorkflowExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"execution",params,undefined,true); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"execution",params,undefined,true); 
			

			svc.describeWorkflowExecution(params,cb);
		}

		
		service.DescribeWorkflowType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"workflowType",params,undefined,true); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"workflowType",params,undefined,true); 
			

			svc.describeWorkflowType(params,cb);
		}

		
		service.GetWorkflowExecutionHistory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"execution",params,undefined,true); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"execution",params,undefined,true); 
			copyArg(msg,"nextPageToken",params,undefined,false); 
			copyArg(msg,"maximumPageSize",params,undefined,false); 
			copyArg(msg,"reverseOrder",params,undefined,false); 
			

			svc.getWorkflowExecutionHistory(params,cb);
		}

		
		service.ListActivityTypes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"registrationStatus",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"registrationStatus",params,undefined,false); 
			copyArg(msg,"nextPageToken",params,undefined,false); 
			copyArg(msg,"maximumPageSize",params,undefined,false); 
			copyArg(msg,"reverseOrder",params,undefined,false); 
			

			svc.listActivityTypes(params,cb);
		}

		
		service.ListClosedWorkflowExecutions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"startTimeFilter",params,undefined,true); 
			copyArg(msg,"closeTimeFilter",params,undefined,true); 
			copyArg(msg,"executionFilter",params,undefined,true); 
			copyArg(msg,"closeStatusFilter",params,undefined,true); 
			copyArg(msg,"typeFilter",params,undefined,true); 
			copyArg(msg,"tagFilter",params,undefined,true); 
			copyArg(msg,"nextPageToken",params,undefined,false); 
			copyArg(msg,"maximumPageSize",params,undefined,false); 
			copyArg(msg,"reverseOrder",params,undefined,false); 
			

			svc.listClosedWorkflowExecutions(params,cb);
		}

		
		service.ListDomains=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"registrationStatus",params,undefined,false); 
			
			copyArg(msg,"nextPageToken",params,undefined,false); 
			copyArg(msg,"registrationStatus",params,undefined,false); 
			copyArg(msg,"maximumPageSize",params,undefined,false); 
			copyArg(msg,"reverseOrder",params,undefined,false); 
			

			svc.listDomains(params,cb);
		}

		
		service.ListOpenWorkflowExecutions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"startTimeFilter",params,undefined,true); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"startTimeFilter",params,undefined,true); 
			copyArg(msg,"typeFilter",params,undefined,true); 
			copyArg(msg,"tagFilter",params,undefined,true); 
			copyArg(msg,"nextPageToken",params,undefined,false); 
			copyArg(msg,"maximumPageSize",params,undefined,false); 
			copyArg(msg,"reverseOrder",params,undefined,false); 
			copyArg(msg,"executionFilter",params,undefined,true); 
			

			svc.listOpenWorkflowExecutions(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListWorkflowTypes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"registrationStatus",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"registrationStatus",params,undefined,false); 
			copyArg(msg,"nextPageToken",params,undefined,false); 
			copyArg(msg,"maximumPageSize",params,undefined,false); 
			copyArg(msg,"reverseOrder",params,undefined,false); 
			

			svc.listWorkflowTypes(params,cb);
		}

		
		service.PollForActivityTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"taskList",params,undefined,true); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"taskList",params,undefined,true); 
			copyArg(msg,"identity",params,undefined,false); 
			

			svc.pollForActivityTask(params,cb);
		}

		
		service.PollForDecisionTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"taskList",params,undefined,true); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"taskList",params,undefined,true); 
			copyArg(msg,"identity",params,undefined,false); 
			copyArg(msg,"nextPageToken",params,undefined,false); 
			copyArg(msg,"maximumPageSize",params,undefined,false); 
			copyArg(msg,"reverseOrder",params,undefined,false); 
			

			svc.pollForDecisionTask(params,cb);
		}

		
		service.RecordActivityTaskHeartbeat=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"taskToken",params,undefined,false); 
			
			copyArg(msg,"taskToken",params,undefined,false); 
			copyArg(msg,"details",params,undefined,false); 
			

			svc.recordActivityTaskHeartbeat(params,cb);
		}

		
		service.RegisterActivityType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"version",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"version",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"defaultTaskStartToCloseTimeout",params,undefined,false); 
			copyArg(msg,"defaultTaskHeartbeatTimeout",params,undefined,false); 
			copyArg(msg,"defaultTaskList",params,undefined,true); 
			copyArg(msg,"defaultTaskPriority",params,undefined,false); 
			copyArg(msg,"defaultTaskScheduleToStartTimeout",params,undefined,false); 
			copyArg(msg,"defaultTaskScheduleToCloseTimeout",params,undefined,false); 
			

			svc.registerActivityType(params,cb);
		}

		
		service.RegisterDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"workflowExecutionRetentionPeriodInDays",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"workflowExecutionRetentionPeriodInDays",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.registerDomain(params,cb);
		}

		
		service.RegisterWorkflowType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"version",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"version",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"defaultTaskStartToCloseTimeout",params,undefined,false); 
			copyArg(msg,"defaultExecutionStartToCloseTimeout",params,undefined,false); 
			copyArg(msg,"defaultTaskList",params,undefined,true); 
			copyArg(msg,"defaultTaskPriority",params,undefined,false); 
			copyArg(msg,"defaultChildPolicy",params,undefined,false); 
			copyArg(msg,"defaultLambdaRole",params,undefined,false); 
			

			svc.registerWorkflowType(params,cb);
		}

		
		service.RequestCancelWorkflowExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"workflowId",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"workflowId",params,undefined,false); 
			copyArg(msg,"runId",params,undefined,false); 
			

			svc.requestCancelWorkflowExecution(params,cb);
		}

		
		service.RespondActivityTaskCanceled=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"taskToken",params,undefined,false); 
			
			copyArg(msg,"taskToken",params,undefined,false); 
			copyArg(msg,"details",params,undefined,false); 
			

			svc.respondActivityTaskCanceled(params,cb);
		}

		
		service.RespondActivityTaskCompleted=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"taskToken",params,undefined,false); 
			
			copyArg(msg,"taskToken",params,undefined,false); 
			copyArg(msg,"result",params,undefined,false); 
			

			svc.respondActivityTaskCompleted(params,cb);
		}

		
		service.RespondActivityTaskFailed=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"taskToken",params,undefined,false); 
			
			copyArg(msg,"taskToken",params,undefined,false); 
			copyArg(msg,"reason",params,undefined,false); 
			copyArg(msg,"details",params,undefined,false); 
			

			svc.respondActivityTaskFailed(params,cb);
		}

		
		service.RespondDecisionTaskCompleted=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"taskToken",params,undefined,false); 
			
			copyArg(msg,"taskToken",params,undefined,false); 
			copyArg(msg,"decisions",params,undefined,false); 
			copyArg(msg,"executionContext",params,undefined,false); 
			

			svc.respondDecisionTaskCompleted(params,cb);
		}

		
		service.SignalWorkflowExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"workflowId",params,undefined,false); 
			copyArg(n,"signalName",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"workflowId",params,undefined,false); 
			copyArg(msg,"runId",params,undefined,false); 
			copyArg(msg,"signalName",params,undefined,false); 
			copyArg(msg,"input",params,undefined,false); 
			

			svc.signalWorkflowExecution(params,cb);
		}

		
		service.StartWorkflowExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"workflowId",params,undefined,false); 
			copyArg(n,"workflowType",params,undefined,true); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"workflowId",params,undefined,false); 
			copyArg(msg,"workflowType",params,undefined,true); 
			copyArg(msg,"taskList",params,undefined,true); 
			copyArg(msg,"taskPriority",params,undefined,false); 
			copyArg(msg,"input",params,undefined,false); 
			copyArg(msg,"executionStartToCloseTimeout",params,undefined,false); 
			copyArg(msg,"tagList",params,undefined,true); 
			copyArg(msg,"taskStartToCloseTimeout",params,undefined,false); 
			copyArg(msg,"childPolicy",params,undefined,false); 
			copyArg(msg,"lambdaRole",params,undefined,false); 
			

			svc.startWorkflowExecution(params,cb);
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

		
		service.TerminateWorkflowExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"workflowId",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"workflowId",params,undefined,false); 
			copyArg(msg,"runId",params,undefined,false); 
			copyArg(msg,"reason",params,undefined,false); 
			copyArg(msg,"details",params,undefined,false); 
			copyArg(msg,"childPolicy",params,undefined,false); 
			

			svc.terminateWorkflowExecution(params,cb);
		}

		
		service.UndeprecateActivityType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"activityType",params,undefined,true); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"activityType",params,undefined,true); 
			

			svc.undeprecateActivityType(params,cb);
		}

		
		service.UndeprecateDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			

			svc.undeprecateDomain(params,cb);
		}

		
		service.UndeprecateWorkflowType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"workflowType",params,undefined,true); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"workflowType",params,undefined,true); 
			

			svc.undeprecateWorkflowType(params,cb);
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
	RED.nodes.registerType("AWS SWF", AmazonAPINode);

};
