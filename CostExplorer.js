
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

		var awsService = new AWS.CostExplorer( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.CostExplorer(msg.AWSConfig) : awsService;

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

		
		service.CreateAnomalyMonitor=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AnomalyMonitor",params,undefined,true); 
			
			copyArg(msg,"AnomalyMonitor",params,undefined,true); 
			

			svc.createAnomalyMonitor(params,cb);
		}

		
		service.CreateAnomalySubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AnomalySubscription",params,undefined,true); 
			
			copyArg(msg,"AnomalySubscription",params,undefined,true); 
			

			svc.createAnomalySubscription(params,cb);
		}

		
		service.CreateCostCategoryDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"RuleVersion",params,undefined,false); 
			copyArg(n,"Rules",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"RuleVersion",params,undefined,false); 
			copyArg(msg,"Rules",params,undefined,true); 
			copyArg(msg,"DefaultValue",params,undefined,false); 
			copyArg(msg,"SplitChargeRules",params,undefined,true); 
			

			svc.createCostCategoryDefinition(params,cb);
		}

		
		service.DeleteAnomalyMonitor=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MonitorArn",params,undefined,false); 
			
			copyArg(msg,"MonitorArn",params,undefined,false); 
			

			svc.deleteAnomalyMonitor(params,cb);
		}

		
		service.DeleteAnomalySubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubscriptionArn",params,undefined,false); 
			
			copyArg(msg,"SubscriptionArn",params,undefined,false); 
			

			svc.deleteAnomalySubscription(params,cb);
		}

		
		service.DeleteCostCategoryDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CostCategoryArn",params,undefined,false); 
			
			copyArg(msg,"CostCategoryArn",params,undefined,false); 
			

			svc.deleteCostCategoryDefinition(params,cb);
		}

		
		service.DescribeCostCategoryDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CostCategoryArn",params,undefined,false); 
			
			copyArg(msg,"CostCategoryArn",params,undefined,false); 
			copyArg(msg,"EffectiveOn",params,undefined,false); 
			

			svc.describeCostCategoryDefinition(params,cb);
		}

		
		service.GetAnomalies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DateInterval",params,undefined,false); 
			
			copyArg(msg,"MonitorArn",params,undefined,false); 
			copyArg(msg,"DateInterval",params,undefined,false); 
			copyArg(msg,"Feedback",params,undefined,false); 
			copyArg(msg,"TotalImpact",params,undefined,false); 
			copyArg(msg,"NextPageToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.getAnomalies(params,cb);
		}

		
		service.GetAnomalyMonitors=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MonitorArnList",params,undefined,true); 
			copyArg(msg,"NextPageToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.getAnomalyMonitors(params,cb);
		}

		
		service.GetAnomalySubscriptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SubscriptionArnList",params,undefined,true); 
			copyArg(msg,"MonitorArn",params,undefined,false); 
			copyArg(msg,"NextPageToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.getAnomalySubscriptions(params,cb);
		}

		
		service.GetCostAndUsage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TimePeriod",params,undefined,true); 
			copyArg(n,"Granularity",params,undefined,false); 
			copyArg(n,"Metrics",params,undefined,true); 
			
			copyArg(msg,"TimePeriod",params,undefined,true); 
			copyArg(msg,"Granularity",params,undefined,false); 
			copyArg(msg,"Filter",params,undefined,true); 
			copyArg(msg,"Metrics",params,undefined,true); 
			copyArg(msg,"GroupBy",params,undefined,true); 
			copyArg(msg,"NextPageToken",params,undefined,false); 
			

			svc.getCostAndUsage(params,cb);
		}

		
		service.GetCostAndUsageWithResources=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TimePeriod",params,undefined,true); 
			copyArg(n,"Granularity",params,undefined,false); 
			copyArg(n,"Filter",params,undefined,true); 
			
			copyArg(msg,"TimePeriod",params,undefined,true); 
			copyArg(msg,"Granularity",params,undefined,false); 
			copyArg(msg,"Filter",params,undefined,true); 
			copyArg(msg,"Metrics",params,undefined,true); 
			copyArg(msg,"GroupBy",params,undefined,true); 
			copyArg(msg,"NextPageToken",params,undefined,false); 
			

			svc.getCostAndUsageWithResources(params,cb);
		}

		
		service.GetCostCategories=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TimePeriod",params,undefined,true); 
			
			copyArg(msg,"SearchString",params,undefined,false); 
			copyArg(msg,"TimePeriod",params,undefined,true); 
			copyArg(msg,"CostCategoryName",params,undefined,false); 
			copyArg(msg,"Filter",params,undefined,true); 
			copyArg(msg,"SortBy",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextPageToken",params,undefined,false); 
			

			svc.getCostCategories(params,cb);
		}

		
		service.GetCostForecast=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TimePeriod",params,undefined,true); 
			copyArg(n,"Metric",params,undefined,false); 
			copyArg(n,"Granularity",params,undefined,false); 
			
			copyArg(msg,"TimePeriod",params,undefined,true); 
			copyArg(msg,"Metric",params,undefined,false); 
			copyArg(msg,"Granularity",params,undefined,false); 
			copyArg(msg,"Filter",params,undefined,true); 
			copyArg(msg,"PredictionIntervalLevel",params,undefined,false); 
			

			svc.getCostForecast(params,cb);
		}

		
		service.GetDimensionValues=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TimePeriod",params,undefined,true); 
			copyArg(n,"Dimension",params,undefined,false); 
			
			copyArg(msg,"SearchString",params,undefined,false); 
			copyArg(msg,"TimePeriod",params,undefined,true); 
			copyArg(msg,"Dimension",params,undefined,false); 
			copyArg(msg,"Context",params,undefined,false); 
			copyArg(msg,"Filter",params,undefined,true); 
			copyArg(msg,"SortBy",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextPageToken",params,undefined,false); 
			

			svc.getDimensionValues(params,cb);
		}

		
		service.GetReservationCoverage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TimePeriod",params,undefined,true); 
			
			copyArg(msg,"TimePeriod",params,undefined,true); 
			copyArg(msg,"GroupBy",params,undefined,true); 
			copyArg(msg,"Granularity",params,undefined,false); 
			copyArg(msg,"Filter",params,undefined,true); 
			copyArg(msg,"Metrics",params,undefined,true); 
			copyArg(msg,"NextPageToken",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.getReservationCoverage(params,cb);
		}

		
		service.GetReservationPurchaseRecommendation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Service",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Service",params,undefined,false); 
			copyArg(msg,"Filter",params,undefined,true); 
			copyArg(msg,"AccountScope",params,undefined,false); 
			copyArg(msg,"LookbackPeriodInDays",params,undefined,false); 
			copyArg(msg,"TermInYears",params,undefined,false); 
			copyArg(msg,"PaymentOption",params,undefined,false); 
			copyArg(msg,"ServiceSpecification",params,undefined,true); 
			copyArg(msg,"PageSize",params,undefined,false); 
			copyArg(msg,"NextPageToken",params,undefined,false); 
			

			svc.getReservationPurchaseRecommendation(params,cb);
		}

		
		service.GetReservationUtilization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TimePeriod",params,undefined,true); 
			
			copyArg(msg,"TimePeriod",params,undefined,true); 
			copyArg(msg,"GroupBy",params,undefined,true); 
			copyArg(msg,"Granularity",params,undefined,false); 
			copyArg(msg,"Filter",params,undefined,true); 
			copyArg(msg,"SortBy",params,undefined,true); 
			copyArg(msg,"NextPageToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.getReservationUtilization(params,cb);
		}

		
		service.GetRightsizingRecommendation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Service",params,undefined,false); 
			
			copyArg(msg,"Filter",params,undefined,true); 
			copyArg(msg,"Configuration",params,undefined,true); 
			copyArg(msg,"Service",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			copyArg(msg,"NextPageToken",params,undefined,false); 
			

			svc.getRightsizingRecommendation(params,cb);
		}

		
		service.GetSavingsPlansCoverage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TimePeriod",params,undefined,true); 
			
			copyArg(msg,"TimePeriod",params,undefined,true); 
			copyArg(msg,"GroupBy",params,undefined,true); 
			copyArg(msg,"Granularity",params,undefined,false); 
			copyArg(msg,"Filter",params,undefined,true); 
			copyArg(msg,"Metrics",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,true); 
			

			svc.getSavingsPlansCoverage(params,cb);
		}

		
		service.GetSavingsPlansPurchaseRecommendation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SavingsPlansType",params,undefined,false); 
			copyArg(n,"TermInYears",params,undefined,false); 
			copyArg(n,"PaymentOption",params,undefined,false); 
			copyArg(n,"LookbackPeriodInDays",params,undefined,false); 
			
			copyArg(msg,"SavingsPlansType",params,undefined,false); 
			copyArg(msg,"TermInYears",params,undefined,false); 
			copyArg(msg,"PaymentOption",params,undefined,false); 
			copyArg(msg,"AccountScope",params,undefined,false); 
			copyArg(msg,"NextPageToken",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			copyArg(msg,"LookbackPeriodInDays",params,undefined,false); 
			copyArg(msg,"Filter",params,undefined,true); 
			

			svc.getSavingsPlansPurchaseRecommendation(params,cb);
		}

		
		service.GetSavingsPlansUtilization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TimePeriod",params,undefined,true); 
			
			copyArg(msg,"TimePeriod",params,undefined,true); 
			copyArg(msg,"Granularity",params,undefined,false); 
			copyArg(msg,"Filter",params,undefined,true); 
			copyArg(msg,"SortBy",params,undefined,true); 
			

			svc.getSavingsPlansUtilization(params,cb);
		}

		
		service.GetSavingsPlansUtilizationDetails=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TimePeriod",params,undefined,true); 
			
			copyArg(msg,"TimePeriod",params,undefined,true); 
			copyArg(msg,"Filter",params,undefined,true); 
			copyArg(msg,"DataType",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,true); 
			

			svc.getSavingsPlansUtilizationDetails(params,cb);
		}

		
		service.GetTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TimePeriod",params,undefined,true); 
			
			copyArg(msg,"SearchString",params,undefined,false); 
			copyArg(msg,"TimePeriod",params,undefined,true); 
			copyArg(msg,"TagKey",params,undefined,false); 
			copyArg(msg,"Filter",params,undefined,true); 
			copyArg(msg,"SortBy",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextPageToken",params,undefined,false); 
			

			svc.getTags(params,cb);
		}

		
		service.GetUsageForecast=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TimePeriod",params,undefined,true); 
			copyArg(n,"Metric",params,undefined,false); 
			copyArg(n,"Granularity",params,undefined,false); 
			
			copyArg(msg,"TimePeriod",params,undefined,true); 
			copyArg(msg,"Metric",params,undefined,false); 
			copyArg(msg,"Granularity",params,undefined,false); 
			copyArg(msg,"Filter",params,undefined,true); 
			copyArg(msg,"PredictionIntervalLevel",params,undefined,false); 
			

			svc.getUsageForecast(params,cb);
		}

		
		service.ListCostCategoryDefinitions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"EffectiveOn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listCostCategoryDefinitions(params,cb);
		}

		
		service.ProvideAnomalyFeedback=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AnomalyId",params,undefined,false); 
			copyArg(n,"Feedback",params,undefined,false); 
			
			copyArg(msg,"AnomalyId",params,undefined,false); 
			copyArg(msg,"Feedback",params,undefined,false); 
			

			svc.provideAnomalyFeedback(params,cb);
		}

		
		service.UpdateAnomalyMonitor=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MonitorArn",params,undefined,false); 
			
			copyArg(msg,"MonitorArn",params,undefined,false); 
			copyArg(msg,"MonitorName",params,undefined,false); 
			

			svc.updateAnomalyMonitor(params,cb);
		}

		
		service.UpdateAnomalySubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubscriptionArn",params,undefined,false); 
			
			copyArg(msg,"SubscriptionArn",params,undefined,false); 
			copyArg(msg,"Threshold",params,undefined,false); 
			copyArg(msg,"Frequency",params,undefined,false); 
			copyArg(msg,"MonitorArnList",params,undefined,true); 
			copyArg(msg,"Subscribers",params,undefined,true); 
			copyArg(msg,"SubscriptionName",params,undefined,false); 
			

			svc.updateAnomalySubscription(params,cb);
		}

		
		service.UpdateCostCategoryDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CostCategoryArn",params,undefined,false); 
			copyArg(n,"RuleVersion",params,undefined,false); 
			copyArg(n,"Rules",params,undefined,true); 
			
			copyArg(msg,"CostCategoryArn",params,undefined,false); 
			copyArg(msg,"RuleVersion",params,undefined,false); 
			copyArg(msg,"Rules",params,undefined,true); 
			copyArg(msg,"DefaultValue",params,undefined,false); 
			copyArg(msg,"SplitChargeRules",params,undefined,true); 
			

			svc.updateCostCategoryDefinition(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS CostExplorer", AmazonAPINode);

};
