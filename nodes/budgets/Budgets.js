
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

		var awsService = new AWS.Budgets( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Budgets(msg.AWSConfig) : awsService;

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

		
		service.CreateBudget=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Budget",params,undefined,true); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Budget",params,undefined,true); 
			copyArgs(n,"NotificationsWithSubscribers",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Budget",params,undefined,true); 
			copyArgs(msg,"NotificationsWithSubscribers",params,undefined,false); 
			

			svc.createBudget(params,cb);
		}

		
		service.CreateBudgetAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"NotificationType",params,undefined,false); 
			copyArgs(n,"ActionType",params,undefined,false); 
			copyArgs(n,"ActionThreshold",params,undefined,true); 
			copyArgs(n,"Definition",params,undefined,true); 
			copyArgs(n,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(n,"ApprovalModel",params,undefined,false); 
			copyArgs(n,"Subscribers",params,undefined,true); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"NotificationType",params,undefined,false); 
			copyArgs(n,"ActionType",params,undefined,false); 
			copyArgs(n,"ActionThreshold",params,undefined,true); 
			copyArgs(n,"Definition",params,undefined,true); 
			copyArgs(n,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(n,"ApprovalModel",params,undefined,false); 
			copyArgs(n,"Subscribers",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"BudgetName",params,undefined,false); 
			copyArgs(msg,"NotificationType",params,undefined,false); 
			copyArgs(msg,"ActionType",params,undefined,false); 
			copyArgs(msg,"ActionThreshold",params,undefined,true); 
			copyArgs(msg,"Definition",params,undefined,true); 
			copyArgs(msg,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(msg,"ApprovalModel",params,undefined,false); 
			copyArgs(msg,"Subscribers",params,undefined,true); 
			

			svc.createBudgetAction(params,cb);
		}

		
		service.CreateNotification=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"Notification",params,undefined,true); 
			copyArgs(n,"Subscribers",params,undefined,true); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"Notification",params,undefined,true); 
			copyArgs(n,"Subscribers",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"BudgetName",params,undefined,false); 
			copyArgs(msg,"Notification",params,undefined,true); 
			copyArgs(msg,"Subscribers",params,undefined,true); 
			

			svc.createNotification(params,cb);
		}

		
		service.CreateSubscriber=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"Notification",params,undefined,true); 
			copyArgs(n,"Subscriber",params,undefined,true); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"Notification",params,undefined,true); 
			copyArgs(n,"Subscriber",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"BudgetName",params,undefined,false); 
			copyArgs(msg,"Notification",params,undefined,true); 
			copyArgs(msg,"Subscriber",params,undefined,true); 
			

			svc.createSubscriber(params,cb);
		}

		
		service.DeleteBudget=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"BudgetName",params,undefined,false); 
			

			svc.deleteBudget(params,cb);
		}

		
		service.DeleteBudgetAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"ActionId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"ActionId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"BudgetName",params,undefined,false); 
			copyArgs(msg,"ActionId",params,undefined,false); 
			

			svc.deleteBudgetAction(params,cb);
		}

		
		service.DeleteNotification=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"Notification",params,undefined,true); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"Notification",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"BudgetName",params,undefined,false); 
			copyArgs(msg,"Notification",params,undefined,true); 
			

			svc.deleteNotification(params,cb);
		}

		
		service.DeleteSubscriber=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"Notification",params,undefined,true); 
			copyArgs(n,"Subscriber",params,undefined,true); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"Notification",params,undefined,true); 
			copyArgs(n,"Subscriber",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"BudgetName",params,undefined,false); 
			copyArgs(msg,"Notification",params,undefined,true); 
			copyArgs(msg,"Subscriber",params,undefined,true); 
			

			svc.deleteSubscriber(params,cb);
		}

		
		service.DescribeBudget=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"BudgetName",params,undefined,false); 
			

			svc.describeBudget(params,cb);
		}

		
		service.DescribeBudgetAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"ActionId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"ActionId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"BudgetName",params,undefined,false); 
			copyArgs(msg,"ActionId",params,undefined,false); 
			

			svc.describeBudgetAction(params,cb);
		}

		
		service.DescribeBudgetActionHistories=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"ActionId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"ActionId",params,undefined,false); 
			copyArgs(n,"TimePeriod",params,undefined,true); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"BudgetName",params,undefined,false); 
			copyArgs(msg,"ActionId",params,undefined,false); 
			copyArgs(msg,"TimePeriod",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeBudgetActionHistories(params,cb);
		}

		
		service.DescribeBudgetActionsForAccount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeBudgetActionsForAccount(params,cb);
		}

		
		service.DescribeBudgetActionsForBudget=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"BudgetName",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeBudgetActionsForBudget(params,cb);
		}

		
		service.DescribeBudgetPerformanceHistory=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"TimePeriod",params,undefined,true); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"BudgetName",params,undefined,false); 
			copyArgs(msg,"TimePeriod",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeBudgetPerformanceHistory(params,cb);
		}

		
		service.DescribeBudgets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeBudgets(params,cb);
		}

		
		service.DescribeNotificationsForBudget=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"BudgetName",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeNotificationsForBudget(params,cb);
		}

		
		service.DescribeSubscribersForNotification=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"Notification",params,undefined,true); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"Notification",params,undefined,true); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"BudgetName",params,undefined,false); 
			copyArgs(msg,"Notification",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeSubscribersForNotification(params,cb);
		}

		
		service.ExecuteBudgetAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"ActionId",params,undefined,false); 
			copyArgs(n,"ExecutionType",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"ActionId",params,undefined,false); 
			copyArgs(n,"ExecutionType",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"BudgetName",params,undefined,false); 
			copyArgs(msg,"ActionId",params,undefined,false); 
			copyArgs(msg,"ExecutionType",params,undefined,false); 
			

			svc.executeBudgetAction(params,cb);
		}

		
		service.UpdateBudget=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"NewBudget",params,undefined,true); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"NewBudget",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"NewBudget",params,undefined,true); 
			

			svc.updateBudget(params,cb);
		}

		
		service.UpdateBudgetAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"ActionId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"ActionId",params,undefined,false); 
			copyArgs(n,"NotificationType",params,undefined,false); 
			copyArgs(n,"ActionThreshold",params,undefined,true); 
			copyArgs(n,"Definition",params,undefined,true); 
			copyArgs(n,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(n,"ApprovalModel",params,undefined,false); 
			copyArgs(n,"Subscribers",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"BudgetName",params,undefined,false); 
			copyArgs(msg,"ActionId",params,undefined,false); 
			copyArgs(msg,"NotificationType",params,undefined,false); 
			copyArgs(msg,"ActionThreshold",params,undefined,true); 
			copyArgs(msg,"Definition",params,undefined,true); 
			copyArgs(msg,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(msg,"ApprovalModel",params,undefined,false); 
			copyArgs(msg,"Subscribers",params,undefined,true); 
			

			svc.updateBudgetAction(params,cb);
		}

		
		service.UpdateNotification=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"OldNotification",params,undefined,true); 
			copyArgs(n,"NewNotification",params,undefined,true); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"OldNotification",params,undefined,true); 
			copyArgs(n,"NewNotification",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"BudgetName",params,undefined,false); 
			copyArgs(msg,"OldNotification",params,undefined,true); 
			copyArgs(msg,"NewNotification",params,undefined,true); 
			

			svc.updateNotification(params,cb);
		}

		
		service.UpdateSubscriber=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"Notification",params,undefined,true); 
			copyArgs(n,"OldSubscriber",params,undefined,true); 
			copyArgs(n,"NewSubscriber",params,undefined,true); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"Notification",params,undefined,true); 
			copyArgs(n,"OldSubscriber",params,undefined,true); 
			copyArgs(n,"NewSubscriber",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"BudgetName",params,undefined,false); 
			copyArgs(msg,"Notification",params,undefined,true); 
			copyArgs(msg,"OldSubscriber",params,undefined,true); 
			copyArgs(msg,"NewSubscriber",params,undefined,true); 
			

			svc.updateSubscriber(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Budgets", AmazonAPINode);

};
