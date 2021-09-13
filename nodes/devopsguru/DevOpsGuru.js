
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

		var awsService = new AWS.DevOpsGuru( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.DevOpsGuru(msg.AWSConfig) : awsService;

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
		
		service.AddNotificationChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Config",params,undefined,true); 
			
			copyArgs(n,"Config",params,undefined,true); 
			
			copyArgs(msg,"Config",params,undefined,true); 
			

			svc.addNotificationChannel(params,cb);
		}
		
		service.DescribeAccountHealth=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeAccountHealth(params,cb);
		}
		
		service.DescribeAccountOverview=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FromTime",params,undefined,false); 
			
			copyArgs(n,"FromTime",params,undefined,false); 
			copyArgs(n,"ToTime",params,undefined,false); 
			
			copyArgs(msg,"FromTime",params,undefined,false); 
			copyArgs(msg,"ToTime",params,undefined,false); 
			

			svc.describeAccountOverview(params,cb);
		}
		
		service.DescribeAnomaly=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.describeAnomaly(params,cb);
		}
		
		service.DescribeFeedback=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"InsightId",params,undefined,false); 
			
			copyArgs(msg,"InsightId",params,undefined,false); 
			

			svc.describeFeedback(params,cb);
		}
		
		service.DescribeInsight=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.describeInsight(params,cb);
		}
		
		service.DescribeResourceCollectionHealth=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceCollectionType",params,undefined,false); 
			
			copyArgs(n,"ResourceCollectionType",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ResourceCollectionType",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeResourceCollectionHealth(params,cb);
		}
		
		service.DescribeServiceIntegration=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeServiceIntegration(params,cb);
		}
		
		service.GetCostEstimation=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getCostEstimation(params,cb);
		}
		
		service.GetResourceCollection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceCollectionType",params,undefined,false); 
			
			copyArgs(n,"ResourceCollectionType",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ResourceCollectionType",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getResourceCollection(params,cb);
		}
		
		service.ListAnomaliesForInsight=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InsightId",params,undefined,false); 
			
			copyArgs(n,"InsightId",params,undefined,false); 
			copyArgs(n,"StartTimeRange",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"InsightId",params,undefined,false); 
			copyArgs(msg,"StartTimeRange",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listAnomaliesForInsight(params,cb);
		}
		
		service.ListEvents=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Filters",params,undefined,false); 
			
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listEvents(params,cb);
		}
		
		service.ListInsights=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StatusFilter",params,undefined,false); 
			
			copyArgs(n,"StatusFilter",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"StatusFilter",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listInsights(params,cb);
		}
		
		service.ListNotificationChannels=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listNotificationChannels(params,cb);
		}
		
		service.ListRecommendations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InsightId",params,undefined,false); 
			
			copyArgs(n,"InsightId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Locale",params,undefined,false); 
			
			copyArgs(msg,"InsightId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Locale",params,undefined,false); 
			

			svc.listRecommendations(params,cb);
		}
		
		service.PutFeedback=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"InsightFeedback",params,undefined,true); 
			
			copyArgs(msg,"InsightFeedback",params,undefined,true); 
			

			svc.putFeedback(params,cb);
		}
		
		service.RemoveNotificationChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.removeNotificationChannel(params,cb);
		}
		
		service.SearchInsights=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StartTimeRange",params,undefined,true); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(n,"StartTimeRange",params,undefined,true); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(msg,"StartTimeRange",params,undefined,true); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			

			svc.searchInsights(params,cb);
		}
		
		service.StartCostEstimation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceCollection",params,undefined,true); 
			
			copyArgs(n,"ResourceCollection",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"ResourceCollection",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.startCostEstimation(params,cb);
		}
		
		service.UpdateResourceCollection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Action",params,undefined,false); 
			copyArgs(n,"ResourceCollection",params,undefined,false); 
			
			copyArgs(n,"Action",params,undefined,false); 
			copyArgs(n,"ResourceCollection",params,undefined,false); 
			
			copyArgs(msg,"Action",params,undefined,false); 
			copyArgs(msg,"ResourceCollection",params,undefined,false); 
			

			svc.updateResourceCollection(params,cb);
		}
		
		service.UpdateServiceIntegration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServiceIntegration",params,undefined,false); 
			
			copyArgs(n,"ServiceIntegration",params,undefined,false); 
			
			copyArgs(msg,"ServiceIntegration",params,undefined,false); 
			

			svc.updateServiceIntegration(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS DevOpsGuru", AmazonAPINode);

};
