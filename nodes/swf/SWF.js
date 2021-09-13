
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

		var awsService = new AWS.SWF( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.SWF(msg.AWSConfig) : awsService;

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
		
		service.CountClosedWorkflowExecutions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domain",params,undefined,false); 
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"startTimeFilter",params,undefined,true); 
			copyArgs(n,"closeTimeFilter",params,undefined,true); 
			copyArgs(n,"executionFilter",params,undefined,true); 
			copyArgs(n,"typeFilter",params,undefined,true); 
			copyArgs(n,"tagFilter",params,undefined,true); 
			copyArgs(n,"closeStatusFilter",params,undefined,true); 
			
			copyArgs(msg,"domain",params,undefined,false); 
			copyArgs(msg,"startTimeFilter",params,undefined,true); 
			copyArgs(msg,"closeTimeFilter",params,undefined,true); 
			copyArgs(msg,"executionFilter",params,undefined,true); 
			copyArgs(msg,"typeFilter",params,undefined,true); 
			copyArgs(msg,"tagFilter",params,undefined,true); 
			copyArgs(msg,"closeStatusFilter",params,undefined,true); 
			

			svc.countClosedWorkflowExecutions(params,cb);
		}
		
		service.CountOpenWorkflowExecutions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"startTimeFilter",params,undefined,true); 
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"startTimeFilter",params,undefined,true); 
			copyArgs(n,"typeFilter",params,undefined,true); 
			copyArgs(n,"tagFilter",params,undefined,true); 
			copyArgs(n,"executionFilter",params,undefined,true); 
			
			copyArgs(msg,"domain",params,undefined,false); 
			copyArgs(msg,"startTimeFilter",params,undefined,true); 
			copyArgs(msg,"typeFilter",params,undefined,true); 
			copyArgs(msg,"tagFilter",params,undefined,true); 
			copyArgs(msg,"executionFilter",params,undefined,true); 
			

			svc.countOpenWorkflowExecutions(params,cb);
		}
		
		service.CountPendingActivityTasks=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"taskList",params,undefined,true); 
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"taskList",params,undefined,true); 
			
			copyArgs(msg,"domain",params,undefined,false); 
			copyArgs(msg,"taskList",params,undefined,true); 
			

			svc.countPendingActivityTasks(params,cb);
		}
		
		service.CountPendingDecisionTasks=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"taskList",params,undefined,true); 
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"taskList",params,undefined,true); 
			
			copyArgs(msg,"domain",params,undefined,false); 
			copyArgs(msg,"taskList",params,undefined,true); 
			

			svc.countPendingDecisionTasks(params,cb);
		}
		
		service.DeprecateActivityType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"activityType",params,undefined,true); 
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"activityType",params,undefined,true); 
			
			copyArgs(msg,"domain",params,undefined,false); 
			copyArgs(msg,"activityType",params,undefined,true); 
			

			svc.deprecateActivityType(params,cb);
		}
		
		service.DeprecateDomain=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.deprecateDomain(params,cb);
		}
		
		service.DeprecateWorkflowType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"workflowType",params,undefined,true); 
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"workflowType",params,undefined,true); 
			
			copyArgs(msg,"domain",params,undefined,false); 
			copyArgs(msg,"workflowType",params,undefined,true); 
			

			svc.deprecateWorkflowType(params,cb);
		}
		
		service.DescribeActivityType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"activityType",params,undefined,true); 
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"activityType",params,undefined,true); 
			
			copyArgs(msg,"domain",params,undefined,false); 
			copyArgs(msg,"activityType",params,undefined,true); 
			

			svc.describeActivityType(params,cb);
		}
		
		service.DescribeDomain=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.describeDomain(params,cb);
		}
		
		service.DescribeWorkflowExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"execution",params,undefined,true); 
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"execution",params,undefined,true); 
			
			copyArgs(msg,"domain",params,undefined,false); 
			copyArgs(msg,"execution",params,undefined,true); 
			

			svc.describeWorkflowExecution(params,cb);
		}
		
		service.DescribeWorkflowType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"workflowType",params,undefined,true); 
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"workflowType",params,undefined,true); 
			
			copyArgs(msg,"domain",params,undefined,false); 
			copyArgs(msg,"workflowType",params,undefined,true); 
			

			svc.describeWorkflowType(params,cb);
		}
		
		service.GetWorkflowExecutionHistory=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"execution",params,undefined,true); 
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"execution",params,undefined,true); 
			copyArgs(n,"nextPageToken",params,undefined,false); 
			copyArgs(Number(n),"maximumPageSize",params,undefined,false); 
			copyArgs(Boolean(n),"reverseOrder",params,undefined,false); 
			
			copyArgs(msg,"domain",params,undefined,false); 
			copyArgs(msg,"execution",params,undefined,true); 
			copyArgs(msg,"nextPageToken",params,undefined,false); 
			copyArgs(msg,"maximumPageSize",params,undefined,false); 
			copyArgs(msg,"reverseOrder",params,undefined,false); 
			

			svc.getWorkflowExecutionHistory(params,cb);
		}
		
		service.ListActivityTypes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"registrationStatus",params,undefined,false); 
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"registrationStatus",params,undefined,false); 
			copyArgs(n,"nextPageToken",params,undefined,false); 
			copyArgs(Number(n),"maximumPageSize",params,undefined,false); 
			copyArgs(Boolean(n),"reverseOrder",params,undefined,false); 
			
			copyArgs(msg,"domain",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"registrationStatus",params,undefined,false); 
			copyArgs(msg,"nextPageToken",params,undefined,false); 
			copyArgs(msg,"maximumPageSize",params,undefined,false); 
			copyArgs(msg,"reverseOrder",params,undefined,false); 
			

			svc.listActivityTypes(params,cb);
		}
		
		service.ListClosedWorkflowExecutions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domain",params,undefined,false); 
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"startTimeFilter",params,undefined,true); 
			copyArgs(n,"closeTimeFilter",params,undefined,true); 
			copyArgs(n,"executionFilter",params,undefined,true); 
			copyArgs(n,"closeStatusFilter",params,undefined,true); 
			copyArgs(n,"typeFilter",params,undefined,true); 
			copyArgs(n,"tagFilter",params,undefined,true); 
			copyArgs(n,"nextPageToken",params,undefined,false); 
			copyArgs(Number(n),"maximumPageSize",params,undefined,false); 
			copyArgs(Boolean(n),"reverseOrder",params,undefined,false); 
			
			copyArgs(msg,"domain",params,undefined,false); 
			copyArgs(msg,"startTimeFilter",params,undefined,true); 
			copyArgs(msg,"closeTimeFilter",params,undefined,true); 
			copyArgs(msg,"executionFilter",params,undefined,true); 
			copyArgs(msg,"closeStatusFilter",params,undefined,true); 
			copyArgs(msg,"typeFilter",params,undefined,true); 
			copyArgs(msg,"tagFilter",params,undefined,true); 
			copyArgs(msg,"nextPageToken",params,undefined,false); 
			copyArgs(msg,"maximumPageSize",params,undefined,false); 
			copyArgs(msg,"reverseOrder",params,undefined,false); 
			

			svc.listClosedWorkflowExecutions(params,cb);
		}
		
		service.ListDomains=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"registrationStatus",params,undefined,false); 
			
			copyArgs(n,"nextPageToken",params,undefined,false); 
			copyArgs(n,"registrationStatus",params,undefined,false); 
			copyArgs(Number(n),"maximumPageSize",params,undefined,false); 
			copyArgs(Boolean(n),"reverseOrder",params,undefined,false); 
			
			copyArgs(msg,"nextPageToken",params,undefined,false); 
			copyArgs(msg,"registrationStatus",params,undefined,false); 
			copyArgs(msg,"maximumPageSize",params,undefined,false); 
			copyArgs(msg,"reverseOrder",params,undefined,false); 
			

			svc.listDomains(params,cb);
		}
		
		service.ListOpenWorkflowExecutions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"startTimeFilter",params,undefined,true); 
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"startTimeFilter",params,undefined,true); 
			copyArgs(n,"typeFilter",params,undefined,true); 
			copyArgs(n,"tagFilter",params,undefined,true); 
			copyArgs(n,"nextPageToken",params,undefined,false); 
			copyArgs(Number(n),"maximumPageSize",params,undefined,false); 
			copyArgs(Boolean(n),"reverseOrder",params,undefined,false); 
			copyArgs(n,"executionFilter",params,undefined,true); 
			
			copyArgs(msg,"domain",params,undefined,false); 
			copyArgs(msg,"startTimeFilter",params,undefined,true); 
			copyArgs(msg,"typeFilter",params,undefined,true); 
			copyArgs(msg,"tagFilter",params,undefined,true); 
			copyArgs(msg,"nextPageToken",params,undefined,false); 
			copyArgs(msg,"maximumPageSize",params,undefined,false); 
			copyArgs(msg,"reverseOrder",params,undefined,false); 
			copyArgs(msg,"executionFilter",params,undefined,true); 
			

			svc.listOpenWorkflowExecutions(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.ListWorkflowTypes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"registrationStatus",params,undefined,false); 
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"registrationStatus",params,undefined,false); 
			copyArgs(n,"nextPageToken",params,undefined,false); 
			copyArgs(Number(n),"maximumPageSize",params,undefined,false); 
			copyArgs(Boolean(n),"reverseOrder",params,undefined,false); 
			
			copyArgs(msg,"domain",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"registrationStatus",params,undefined,false); 
			copyArgs(msg,"nextPageToken",params,undefined,false); 
			copyArgs(msg,"maximumPageSize",params,undefined,false); 
			copyArgs(msg,"reverseOrder",params,undefined,false); 
			

			svc.listWorkflowTypes(params,cb);
		}
		
		service.PollForActivityTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"taskList",params,undefined,true); 
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"taskList",params,undefined,true); 
			copyArgs(n,"identity",params,undefined,false); 
			
			copyArgs(msg,"domain",params,undefined,false); 
			copyArgs(msg,"taskList",params,undefined,true); 
			copyArgs(msg,"identity",params,undefined,false); 
			

			svc.pollForActivityTask(params,cb);
		}
		
		service.PollForDecisionTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"taskList",params,undefined,true); 
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"taskList",params,undefined,true); 
			copyArgs(n,"identity",params,undefined,false); 
			copyArgs(n,"nextPageToken",params,undefined,false); 
			copyArgs(Number(n),"maximumPageSize",params,undefined,false); 
			copyArgs(Boolean(n),"reverseOrder",params,undefined,false); 
			
			copyArgs(msg,"domain",params,undefined,false); 
			copyArgs(msg,"taskList",params,undefined,true); 
			copyArgs(msg,"identity",params,undefined,false); 
			copyArgs(msg,"nextPageToken",params,undefined,false); 
			copyArgs(msg,"maximumPageSize",params,undefined,false); 
			copyArgs(msg,"reverseOrder",params,undefined,false); 
			

			svc.pollForDecisionTask(params,cb);
		}
		
		service.RecordActivityTaskHeartbeat=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"taskToken",params,undefined,false); 
			
			copyArgs(n,"taskToken",params,undefined,false); 
			copyArgs(n,"details",params,undefined,false); 
			
			copyArgs(msg,"taskToken",params,undefined,false); 
			copyArgs(msg,"details",params,undefined,false); 
			

			svc.recordActivityTaskHeartbeat(params,cb);
		}
		
		service.RegisterActivityType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"version",params,undefined,false); 
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"version",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"defaultTaskStartToCloseTimeout",params,undefined,false); 
			copyArgs(n,"defaultTaskHeartbeatTimeout",params,undefined,false); 
			copyArgs(n,"defaultTaskList",params,undefined,true); 
			copyArgs(n,"defaultTaskPriority",params,undefined,false); 
			copyArgs(n,"defaultTaskScheduleToStartTimeout",params,undefined,false); 
			copyArgs(n,"defaultTaskScheduleToCloseTimeout",params,undefined,false); 
			
			copyArgs(msg,"domain",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"version",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"defaultTaskStartToCloseTimeout",params,undefined,false); 
			copyArgs(msg,"defaultTaskHeartbeatTimeout",params,undefined,false); 
			copyArgs(msg,"defaultTaskList",params,undefined,true); 
			copyArgs(msg,"defaultTaskPriority",params,undefined,false); 
			copyArgs(msg,"defaultTaskScheduleToStartTimeout",params,undefined,false); 
			copyArgs(msg,"defaultTaskScheduleToCloseTimeout",params,undefined,false); 
			

			svc.registerActivityType(params,cb);
		}
		
		service.RegisterDomain=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"workflowExecutionRetentionPeriodInDays",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"workflowExecutionRetentionPeriodInDays",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"workflowExecutionRetentionPeriodInDays",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.registerDomain(params,cb);
		}
		
		service.RegisterWorkflowType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"version",params,undefined,false); 
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"version",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"defaultTaskStartToCloseTimeout",params,undefined,false); 
			copyArgs(n,"defaultExecutionStartToCloseTimeout",params,undefined,false); 
			copyArgs(n,"defaultTaskList",params,undefined,true); 
			copyArgs(n,"defaultTaskPriority",params,undefined,false); 
			copyArgs(n,"defaultChildPolicy",params,undefined,false); 
			copyArgs(n,"defaultLambdaRole",params,undefined,false); 
			
			copyArgs(msg,"domain",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"version",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"defaultTaskStartToCloseTimeout",params,undefined,false); 
			copyArgs(msg,"defaultExecutionStartToCloseTimeout",params,undefined,false); 
			copyArgs(msg,"defaultTaskList",params,undefined,true); 
			copyArgs(msg,"defaultTaskPriority",params,undefined,false); 
			copyArgs(msg,"defaultChildPolicy",params,undefined,false); 
			copyArgs(msg,"defaultLambdaRole",params,undefined,false); 
			

			svc.registerWorkflowType(params,cb);
		}
		
		service.RequestCancelWorkflowExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"workflowId",params,undefined,false); 
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"workflowId",params,undefined,false); 
			copyArgs(n,"runId",params,undefined,false); 
			
			copyArgs(msg,"domain",params,undefined,false); 
			copyArgs(msg,"workflowId",params,undefined,false); 
			copyArgs(msg,"runId",params,undefined,false); 
			

			svc.requestCancelWorkflowExecution(params,cb);
		}
		
		service.RespondActivityTaskCanceled=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"taskToken",params,undefined,false); 
			
			copyArgs(n,"taskToken",params,undefined,false); 
			copyArgs(n,"details",params,undefined,false); 
			
			copyArgs(msg,"taskToken",params,undefined,false); 
			copyArgs(msg,"details",params,undefined,false); 
			

			svc.respondActivityTaskCanceled(params,cb);
		}
		
		service.RespondActivityTaskCompleted=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"taskToken",params,undefined,false); 
			
			copyArgs(n,"taskToken",params,undefined,false); 
			copyArgs(n,"result",params,undefined,false); 
			
			copyArgs(msg,"taskToken",params,undefined,false); 
			copyArgs(msg,"result",params,undefined,false); 
			

			svc.respondActivityTaskCompleted(params,cb);
		}
		
		service.RespondActivityTaskFailed=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"taskToken",params,undefined,false); 
			
			copyArgs(n,"taskToken",params,undefined,false); 
			copyArgs(n,"reason",params,undefined,false); 
			copyArgs(n,"details",params,undefined,false); 
			
			copyArgs(msg,"taskToken",params,undefined,false); 
			copyArgs(msg,"reason",params,undefined,false); 
			copyArgs(msg,"details",params,undefined,false); 
			

			svc.respondActivityTaskFailed(params,cb);
		}
		
		service.RespondDecisionTaskCompleted=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"taskToken",params,undefined,false); 
			
			copyArgs(n,"taskToken",params,undefined,false); 
			copyArgs(n,"decisions",params,undefined,false); 
			copyArgs(n,"executionContext",params,undefined,false); 
			
			copyArgs(msg,"taskToken",params,undefined,false); 
			copyArgs(msg,"decisions",params,undefined,false); 
			copyArgs(msg,"executionContext",params,undefined,false); 
			

			svc.respondDecisionTaskCompleted(params,cb);
		}
		
		service.SignalWorkflowExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"workflowId",params,undefined,false); 
			copyArgs(n,"signalName",params,undefined,false); 
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"workflowId",params,undefined,false); 
			copyArgs(n,"runId",params,undefined,false); 
			copyArgs(n,"signalName",params,undefined,false); 
			copyArgs(n,"input",params,undefined,false); 
			
			copyArgs(msg,"domain",params,undefined,false); 
			copyArgs(msg,"workflowId",params,undefined,false); 
			copyArgs(msg,"runId",params,undefined,false); 
			copyArgs(msg,"signalName",params,undefined,false); 
			copyArgs(msg,"input",params,undefined,false); 
			

			svc.signalWorkflowExecution(params,cb);
		}
		
		service.StartWorkflowExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"workflowId",params,undefined,false); 
			copyArgs(n,"workflowType",params,undefined,true); 
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"workflowId",params,undefined,false); 
			copyArgs(n,"workflowType",params,undefined,true); 
			copyArgs(n,"taskList",params,undefined,true); 
			copyArgs(n,"taskPriority",params,undefined,false); 
			copyArgs(n,"input",params,undefined,false); 
			copyArgs(n,"executionStartToCloseTimeout",params,undefined,false); 
			copyArgs(n,"tagList",params,undefined,true); 
			copyArgs(n,"taskStartToCloseTimeout",params,undefined,false); 
			copyArgs(n,"childPolicy",params,undefined,false); 
			copyArgs(n,"lambdaRole",params,undefined,false); 
			
			copyArgs(msg,"domain",params,undefined,false); 
			copyArgs(msg,"workflowId",params,undefined,false); 
			copyArgs(msg,"workflowType",params,undefined,true); 
			copyArgs(msg,"taskList",params,undefined,true); 
			copyArgs(msg,"taskPriority",params,undefined,false); 
			copyArgs(msg,"input",params,undefined,false); 
			copyArgs(msg,"executionStartToCloseTimeout",params,undefined,false); 
			copyArgs(msg,"tagList",params,undefined,true); 
			copyArgs(msg,"taskStartToCloseTimeout",params,undefined,false); 
			copyArgs(msg,"childPolicy",params,undefined,false); 
			copyArgs(msg,"lambdaRole",params,undefined,false); 
			

			svc.startWorkflowExecution(params,cb);
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
		
		service.TerminateWorkflowExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"workflowId",params,undefined,false); 
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"workflowId",params,undefined,false); 
			copyArgs(n,"runId",params,undefined,false); 
			copyArgs(n,"reason",params,undefined,false); 
			copyArgs(n,"details",params,undefined,false); 
			copyArgs(n,"childPolicy",params,undefined,false); 
			
			copyArgs(msg,"domain",params,undefined,false); 
			copyArgs(msg,"workflowId",params,undefined,false); 
			copyArgs(msg,"runId",params,undefined,false); 
			copyArgs(msg,"reason",params,undefined,false); 
			copyArgs(msg,"details",params,undefined,false); 
			copyArgs(msg,"childPolicy",params,undefined,false); 
			

			svc.terminateWorkflowExecution(params,cb);
		}
		
		service.UndeprecateActivityType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"activityType",params,undefined,true); 
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"activityType",params,undefined,true); 
			
			copyArgs(msg,"domain",params,undefined,false); 
			copyArgs(msg,"activityType",params,undefined,true); 
			

			svc.undeprecateActivityType(params,cb);
		}
		
		service.UndeprecateDomain=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.undeprecateDomain(params,cb);
		}
		
		service.UndeprecateWorkflowType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"workflowType",params,undefined,true); 
			
			copyArgs(n,"domain",params,undefined,false); 
			copyArgs(n,"workflowType",params,undefined,true); 
			
			copyArgs(msg,"domain",params,undefined,false); 
			copyArgs(msg,"workflowType",params,undefined,true); 
			

			svc.undeprecateWorkflowType(params,cb);
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
	RED.nodes.registerType("AWS SWF", AmazonAPINode);

};
