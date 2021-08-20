
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

		var awsService = new AWS.Budgets( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Budgets(msg.AWSConfig) : awsService;

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

		
		service.CreateBudget=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Budget",params,undefined,true); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Budget",params,undefined,true); 
			copyArg(msg,"NotificationsWithSubscribers",params,undefined,false); 
			

			svc.createBudget(params,cb);
		}

		
		service.CreateBudgetAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"BudgetName",params,undefined,false); 
			copyArg(n,"NotificationType",params,undefined,false); 
			copyArg(n,"ActionType",params,undefined,false); 
			copyArg(n,"ActionThreshold",params,undefined,true); 
			copyArg(n,"Definition",params,undefined,true); 
			copyArg(n,"ExecutionRoleArn",params,undefined,false); 
			copyArg(n,"ApprovalModel",params,undefined,false); 
			copyArg(n,"Subscribers",params,undefined,true); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"BudgetName",params,undefined,false); 
			copyArg(msg,"NotificationType",params,undefined,false); 
			copyArg(msg,"ActionType",params,undefined,false); 
			copyArg(msg,"ActionThreshold",params,undefined,true); 
			copyArg(msg,"Definition",params,undefined,true); 
			copyArg(msg,"ExecutionRoleArn",params,undefined,false); 
			copyArg(msg,"ApprovalModel",params,undefined,false); 
			copyArg(msg,"Subscribers",params,undefined,true); 
			

			svc.createBudgetAction(params,cb);
		}

		
		service.CreateNotification=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"BudgetName",params,undefined,false); 
			copyArg(n,"Notification",params,undefined,true); 
			copyArg(n,"Subscribers",params,undefined,true); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"BudgetName",params,undefined,false); 
			copyArg(msg,"Notification",params,undefined,true); 
			copyArg(msg,"Subscribers",params,undefined,true); 
			

			svc.createNotification(params,cb);
		}

		
		service.CreateSubscriber=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"BudgetName",params,undefined,false); 
			copyArg(n,"Notification",params,undefined,true); 
			copyArg(n,"Subscriber",params,undefined,true); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"BudgetName",params,undefined,false); 
			copyArg(msg,"Notification",params,undefined,true); 
			copyArg(msg,"Subscriber",params,undefined,true); 
			

			svc.createSubscriber(params,cb);
		}

		
		service.DeleteBudget=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"BudgetName",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"BudgetName",params,undefined,false); 
			

			svc.deleteBudget(params,cb);
		}

		
		service.DeleteBudgetAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"BudgetName",params,undefined,false); 
			copyArg(n,"ActionId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"BudgetName",params,undefined,false); 
			copyArg(msg,"ActionId",params,undefined,false); 
			

			svc.deleteBudgetAction(params,cb);
		}

		
		service.DeleteNotification=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"BudgetName",params,undefined,false); 
			copyArg(n,"Notification",params,undefined,true); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"BudgetName",params,undefined,false); 
			copyArg(msg,"Notification",params,undefined,true); 
			

			svc.deleteNotification(params,cb);
		}

		
		service.DeleteSubscriber=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"BudgetName",params,undefined,false); 
			copyArg(n,"Notification",params,undefined,true); 
			copyArg(n,"Subscriber",params,undefined,true); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"BudgetName",params,undefined,false); 
			copyArg(msg,"Notification",params,undefined,true); 
			copyArg(msg,"Subscriber",params,undefined,true); 
			

			svc.deleteSubscriber(params,cb);
		}

		
		service.DescribeBudget=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"BudgetName",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"BudgetName",params,undefined,false); 
			

			svc.describeBudget(params,cb);
		}

		
		service.DescribeBudgetAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"BudgetName",params,undefined,false); 
			copyArg(n,"ActionId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"BudgetName",params,undefined,false); 
			copyArg(msg,"ActionId",params,undefined,false); 
			

			svc.describeBudgetAction(params,cb);
		}

		
		service.DescribeBudgetActionHistories=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"BudgetName",params,undefined,false); 
			copyArg(n,"ActionId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"BudgetName",params,undefined,false); 
			copyArg(msg,"ActionId",params,undefined,false); 
			copyArg(msg,"TimePeriod",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeBudgetActionHistories(params,cb);
		}

		
		service.DescribeBudgetActionsForAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeBudgetActionsForAccount(params,cb);
		}

		
		service.DescribeBudgetActionsForBudget=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"BudgetName",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"BudgetName",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeBudgetActionsForBudget(params,cb);
		}

		
		service.DescribeBudgetPerformanceHistory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"BudgetName",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"BudgetName",params,undefined,false); 
			copyArg(msg,"TimePeriod",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeBudgetPerformanceHistory(params,cb);
		}

		
		service.DescribeBudgets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeBudgets(params,cb);
		}

		
		service.DescribeNotificationsForBudget=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"BudgetName",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"BudgetName",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeNotificationsForBudget(params,cb);
		}

		
		service.DescribeSubscribersForNotification=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"BudgetName",params,undefined,false); 
			copyArg(n,"Notification",params,undefined,true); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"BudgetName",params,undefined,false); 
			copyArg(msg,"Notification",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeSubscribersForNotification(params,cb);
		}

		
		service.ExecuteBudgetAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"BudgetName",params,undefined,false); 
			copyArg(n,"ActionId",params,undefined,false); 
			copyArg(n,"ExecutionType",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"BudgetName",params,undefined,false); 
			copyArg(msg,"ActionId",params,undefined,false); 
			copyArg(msg,"ExecutionType",params,undefined,false); 
			

			svc.executeBudgetAction(params,cb);
		}

		
		service.UpdateBudget=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"NewBudget",params,undefined,true); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"NewBudget",params,undefined,true); 
			

			svc.updateBudget(params,cb);
		}

		
		service.UpdateBudgetAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"BudgetName",params,undefined,false); 
			copyArg(n,"ActionId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"BudgetName",params,undefined,false); 
			copyArg(msg,"ActionId",params,undefined,false); 
			copyArg(msg,"NotificationType",params,undefined,false); 
			copyArg(msg,"ActionThreshold",params,undefined,true); 
			copyArg(msg,"Definition",params,undefined,true); 
			copyArg(msg,"ExecutionRoleArn",params,undefined,false); 
			copyArg(msg,"ApprovalModel",params,undefined,false); 
			copyArg(msg,"Subscribers",params,undefined,true); 
			

			svc.updateBudgetAction(params,cb);
		}

		
		service.UpdateNotification=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"BudgetName",params,undefined,false); 
			copyArg(n,"OldNotification",params,undefined,true); 
			copyArg(n,"NewNotification",params,undefined,true); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"BudgetName",params,undefined,false); 
			copyArg(msg,"OldNotification",params,undefined,true); 
			copyArg(msg,"NewNotification",params,undefined,true); 
			

			svc.updateNotification(params,cb);
		}

		
		service.UpdateSubscriber=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"BudgetName",params,undefined,false); 
			copyArg(n,"Notification",params,undefined,true); 
			copyArg(n,"OldSubscriber",params,undefined,true); 
			copyArg(n,"NewSubscriber",params,undefined,true); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"BudgetName",params,undefined,false); 
			copyArg(msg,"Notification",params,undefined,true); 
			copyArg(msg,"OldSubscriber",params,undefined,true); 
			copyArg(msg,"NewSubscriber",params,undefined,true); 
			

			svc.updateSubscriber(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Budgets", AmazonAPINode);

};
