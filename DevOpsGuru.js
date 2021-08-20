
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

		var awsService = new AWS.DevOpsGuru( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.DevOpsGuru(msg.AWSConfig) : awsService;

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

		
		service.AddNotificationChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Config",params,undefined,true); 
			
			copyArg(msg,"Config",params,undefined,true); 
			

			svc.addNotificationChannel(params,cb);
		}

		
		service.DescribeAccountHealth=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeAccountHealth(params,cb);
		}

		
		service.DescribeAccountOverview=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FromTime",params,undefined,false); 
			
			copyArg(msg,"FromTime",params,undefined,false); 
			copyArg(msg,"ToTime",params,undefined,false); 
			

			svc.describeAccountOverview(params,cb);
		}

		
		service.DescribeAnomaly=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.describeAnomaly(params,cb);
		}

		
		service.DescribeFeedback=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"InsightId",params,undefined,false); 
			

			svc.describeFeedback(params,cb);
		}

		
		service.DescribeInsight=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.describeInsight(params,cb);
		}

		
		service.DescribeResourceCollectionHealth=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceCollectionType",params,undefined,false); 
			
			copyArg(msg,"ResourceCollectionType",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeResourceCollectionHealth(params,cb);
		}

		
		service.DescribeServiceIntegration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeServiceIntegration(params,cb);
		}

		
		service.GetCostEstimation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getCostEstimation(params,cb);
		}

		
		service.GetResourceCollection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceCollectionType",params,undefined,false); 
			
			copyArg(msg,"ResourceCollectionType",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getResourceCollection(params,cb);
		}

		
		service.ListAnomaliesForInsight=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InsightId",params,undefined,false); 
			
			copyArg(msg,"InsightId",params,undefined,false); 
			copyArg(msg,"StartTimeRange",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listAnomaliesForInsight(params,cb);
		}

		
		service.ListEvents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Filters",params,undefined,false); 
			
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listEvents(params,cb);
		}

		
		service.ListInsights=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StatusFilter",params,undefined,false); 
			
			copyArg(msg,"StatusFilter",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listInsights(params,cb);
		}

		
		service.ListNotificationChannels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listNotificationChannels(params,cb);
		}

		
		service.ListRecommendations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InsightId",params,undefined,false); 
			
			copyArg(msg,"InsightId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Locale",params,undefined,false); 
			

			svc.listRecommendations(params,cb);
		}

		
		service.PutFeedback=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"InsightFeedback",params,undefined,true); 
			

			svc.putFeedback(params,cb);
		}

		
		service.RemoveNotificationChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.removeNotificationChannel(params,cb);
		}

		
		service.SearchInsights=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StartTimeRange",params,undefined,true); 
			copyArg(n,"Type",params,undefined,false); 
			
			copyArg(msg,"StartTimeRange",params,undefined,true); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			

			svc.searchInsights(params,cb);
		}

		
		service.StartCostEstimation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceCollection",params,undefined,true); 
			
			copyArg(msg,"ResourceCollection",params,undefined,true); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.startCostEstimation(params,cb);
		}

		
		service.UpdateResourceCollection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Action",params,undefined,false); 
			copyArg(n,"ResourceCollection",params,undefined,false); 
			
			copyArg(msg,"Action",params,undefined,false); 
			copyArg(msg,"ResourceCollection",params,undefined,false); 
			

			svc.updateResourceCollection(params,cb);
		}

		
		service.UpdateServiceIntegration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceIntegration",params,undefined,false); 
			
			copyArg(msg,"ServiceIntegration",params,undefined,false); 
			

			svc.updateServiceIntegration(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS DevOpsGuru", AmazonAPINode);

};
