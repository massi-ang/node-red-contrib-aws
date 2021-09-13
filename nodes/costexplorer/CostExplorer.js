
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

		var awsService = new AWS.CostExplorer( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.CostExplorer(msg.AWSConfig) : awsService;

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
		
			service.CreateAnomalyMonitor=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AnomalyMonitor",params,undefined,true); 
			
			copyArgs(n,"AnomalyMonitor",params,undefined,true); 
			
			copyArgs(msg,"AnomalyMonitor",params,undefined,true); 
			

			svc.createAnomalyMonitor(params,cb);
		}
			service.CreateAnomalySubscription=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AnomalySubscription",params,undefined,true); 
			
			copyArgs(n,"AnomalySubscription",params,undefined,true); 
			
			copyArgs(msg,"AnomalySubscription",params,undefined,true); 
			

			svc.createAnomalySubscription(params,cb);
		}
			service.CreateCostCategoryDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RuleVersion",params,undefined,false); 
			copyArgs(n,"Rules",params,undefined,true); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RuleVersion",params,undefined,false); 
			copyArgs(n,"Rules",params,undefined,true); 
			copyArgs(n,"DefaultValue",params,undefined,false); 
			copyArgs(n,"SplitChargeRules",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"RuleVersion",params,undefined,false); 
			copyArgs(msg,"Rules",params,undefined,true); 
			copyArgs(msg,"DefaultValue",params,undefined,false); 
			copyArgs(msg,"SplitChargeRules",params,undefined,true); 
			

			svc.createCostCategoryDefinition(params,cb);
		}
			service.DeleteAnomalyMonitor=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MonitorArn",params,undefined,false); 
			
			copyArgs(n,"MonitorArn",params,undefined,false); 
			
			copyArgs(msg,"MonitorArn",params,undefined,false); 
			

			svc.deleteAnomalyMonitor(params,cb);
		}
			service.DeleteAnomalySubscription=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubscriptionArn",params,undefined,false); 
			
			copyArgs(n,"SubscriptionArn",params,undefined,false); 
			
			copyArgs(msg,"SubscriptionArn",params,undefined,false); 
			

			svc.deleteAnomalySubscription(params,cb);
		}
			service.DeleteCostCategoryDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CostCategoryArn",params,undefined,false); 
			
			copyArgs(n,"CostCategoryArn",params,undefined,false); 
			
			copyArgs(msg,"CostCategoryArn",params,undefined,false); 
			

			svc.deleteCostCategoryDefinition(params,cb);
		}
			service.DescribeCostCategoryDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CostCategoryArn",params,undefined,false); 
			
			copyArgs(n,"CostCategoryArn",params,undefined,false); 
			copyArgs(n,"EffectiveOn",params,undefined,false); 
			
			copyArgs(msg,"CostCategoryArn",params,undefined,false); 
			copyArgs(msg,"EffectiveOn",params,undefined,false); 
			

			svc.describeCostCategoryDefinition(params,cb);
		}
			service.GetAnomalies=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DateInterval",params,undefined,false); 
			
			copyArgs(n,"MonitorArn",params,undefined,false); 
			copyArgs(n,"DateInterval",params,undefined,false); 
			copyArgs(n,"Feedback",params,undefined,false); 
			copyArgs(n,"TotalImpact",params,undefined,false); 
			copyArgs(n,"NextPageToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"MonitorArn",params,undefined,false); 
			copyArgs(msg,"DateInterval",params,undefined,false); 
			copyArgs(msg,"Feedback",params,undefined,false); 
			copyArgs(msg,"TotalImpact",params,undefined,false); 
			copyArgs(msg,"NextPageToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.getAnomalies(params,cb);
		}
			service.GetAnomalyMonitors=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MonitorArnList",params,undefined,true); 
			copyArgs(n,"NextPageToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"MonitorArnList",params,undefined,true); 
			copyArgs(msg,"NextPageToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.getAnomalyMonitors(params,cb);
		}
			service.GetAnomalySubscriptions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SubscriptionArnList",params,undefined,true); 
			copyArgs(n,"MonitorArn",params,undefined,false); 
			copyArgs(n,"NextPageToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"SubscriptionArnList",params,undefined,true); 
			copyArgs(msg,"MonitorArn",params,undefined,false); 
			copyArgs(msg,"NextPageToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.getAnomalySubscriptions(params,cb);
		}
			service.GetCostAndUsage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TimePeriod",params,undefined,true); 
			copyArgs(n,"Granularity",params,undefined,false); 
			copyArgs(n,"Metrics",params,undefined,true); 
			
			copyArgs(n,"TimePeriod",params,undefined,true); 
			copyArgs(n,"Granularity",params,undefined,false); 
			copyArgs(n,"Filter",params,undefined,true); 
			copyArgs(n,"Metrics",params,undefined,true); 
			copyArgs(n,"GroupBy",params,undefined,true); 
			copyArgs(n,"NextPageToken",params,undefined,false); 
			
			copyArgs(msg,"TimePeriod",params,undefined,true); 
			copyArgs(msg,"Granularity",params,undefined,false); 
			copyArgs(msg,"Filter",params,undefined,true); 
			copyArgs(msg,"Metrics",params,undefined,true); 
			copyArgs(msg,"GroupBy",params,undefined,true); 
			copyArgs(msg,"NextPageToken",params,undefined,false); 
			

			svc.getCostAndUsage(params,cb);
		}
			service.GetCostAndUsageWithResources=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TimePeriod",params,undefined,true); 
			copyArgs(n,"Granularity",params,undefined,false); 
			copyArgs(n,"Filter",params,undefined,true); 
			
			copyArgs(n,"TimePeriod",params,undefined,true); 
			copyArgs(n,"Granularity",params,undefined,false); 
			copyArgs(n,"Filter",params,undefined,true); 
			copyArgs(n,"Metrics",params,undefined,true); 
			copyArgs(n,"GroupBy",params,undefined,true); 
			copyArgs(n,"NextPageToken",params,undefined,false); 
			
			copyArgs(msg,"TimePeriod",params,undefined,true); 
			copyArgs(msg,"Granularity",params,undefined,false); 
			copyArgs(msg,"Filter",params,undefined,true); 
			copyArgs(msg,"Metrics",params,undefined,true); 
			copyArgs(msg,"GroupBy",params,undefined,true); 
			copyArgs(msg,"NextPageToken",params,undefined,false); 
			

			svc.getCostAndUsageWithResources(params,cb);
		}
			service.GetCostCategories=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TimePeriod",params,undefined,true); 
			
			copyArgs(n,"SearchString",params,undefined,false); 
			copyArgs(n,"TimePeriod",params,undefined,true); 
			copyArgs(n,"CostCategoryName",params,undefined,false); 
			copyArgs(n,"Filter",params,undefined,true); 
			copyArgs(n,"SortBy",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextPageToken",params,undefined,false); 
			
			copyArgs(msg,"SearchString",params,undefined,false); 
			copyArgs(msg,"TimePeriod",params,undefined,true); 
			copyArgs(msg,"CostCategoryName",params,undefined,false); 
			copyArgs(msg,"Filter",params,undefined,true); 
			copyArgs(msg,"SortBy",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextPageToken",params,undefined,false); 
			

			svc.getCostCategories(params,cb);
		}
			service.GetCostForecast=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TimePeriod",params,undefined,true); 
			copyArgs(n,"Metric",params,undefined,false); 
			copyArgs(n,"Granularity",params,undefined,false); 
			
			copyArgs(n,"TimePeriod",params,undefined,true); 
			copyArgs(n,"Metric",params,undefined,false); 
			copyArgs(n,"Granularity",params,undefined,false); 
			copyArgs(n,"Filter",params,undefined,true); 
			copyArgs(Number(n),"PredictionIntervalLevel",params,undefined,false); 
			
			copyArgs(msg,"TimePeriod",params,undefined,true); 
			copyArgs(msg,"Metric",params,undefined,false); 
			copyArgs(msg,"Granularity",params,undefined,false); 
			copyArgs(msg,"Filter",params,undefined,true); 
			copyArgs(msg,"PredictionIntervalLevel",params,undefined,false); 
			

			svc.getCostForecast(params,cb);
		}
			service.GetDimensionValues=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TimePeriod",params,undefined,true); 
			copyArgs(n,"Dimension",params,undefined,false); 
			
			copyArgs(n,"SearchString",params,undefined,false); 
			copyArgs(n,"TimePeriod",params,undefined,true); 
			copyArgs(n,"Dimension",params,undefined,false); 
			copyArgs(n,"Context",params,undefined,false); 
			copyArgs(n,"Filter",params,undefined,true); 
			copyArgs(n,"SortBy",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextPageToken",params,undefined,false); 
			
			copyArgs(msg,"SearchString",params,undefined,false); 
			copyArgs(msg,"TimePeriod",params,undefined,true); 
			copyArgs(msg,"Dimension",params,undefined,false); 
			copyArgs(msg,"Context",params,undefined,false); 
			copyArgs(msg,"Filter",params,undefined,true); 
			copyArgs(msg,"SortBy",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextPageToken",params,undefined,false); 
			

			svc.getDimensionValues(params,cb);
		}
			service.GetReservationCoverage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TimePeriod",params,undefined,true); 
			
			copyArgs(n,"TimePeriod",params,undefined,true); 
			copyArgs(n,"GroupBy",params,undefined,true); 
			copyArgs(n,"Granularity",params,undefined,false); 
			copyArgs(n,"Filter",params,undefined,true); 
			copyArgs(n,"Metrics",params,undefined,true); 
			copyArgs(n,"NextPageToken",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"TimePeriod",params,undefined,true); 
			copyArgs(msg,"GroupBy",params,undefined,true); 
			copyArgs(msg,"Granularity",params,undefined,false); 
			copyArgs(msg,"Filter",params,undefined,true); 
			copyArgs(msg,"Metrics",params,undefined,true); 
			copyArgs(msg,"NextPageToken",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.getReservationCoverage(params,cb);
		}
			service.GetReservationPurchaseRecommendation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Service",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Service",params,undefined,false); 
			copyArgs(n,"Filter",params,undefined,true); 
			copyArgs(n,"AccountScope",params,undefined,false); 
			copyArgs(n,"LookbackPeriodInDays",params,undefined,false); 
			copyArgs(n,"TermInYears",params,undefined,false); 
			copyArgs(n,"PaymentOption",params,undefined,false); 
			copyArgs(n,"ServiceSpecification",params,undefined,true); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			copyArgs(n,"NextPageToken",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Service",params,undefined,false); 
			copyArgs(msg,"Filter",params,undefined,true); 
			copyArgs(msg,"AccountScope",params,undefined,false); 
			copyArgs(msg,"LookbackPeriodInDays",params,undefined,false); 
			copyArgs(msg,"TermInYears",params,undefined,false); 
			copyArgs(msg,"PaymentOption",params,undefined,false); 
			copyArgs(msg,"ServiceSpecification",params,undefined,true); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"NextPageToken",params,undefined,false); 
			

			svc.getReservationPurchaseRecommendation(params,cb);
		}
			service.GetReservationUtilization=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TimePeriod",params,undefined,true); 
			
			copyArgs(n,"TimePeriod",params,undefined,true); 
			copyArgs(n,"GroupBy",params,undefined,true); 
			copyArgs(n,"Granularity",params,undefined,false); 
			copyArgs(n,"Filter",params,undefined,true); 
			copyArgs(n,"SortBy",params,undefined,true); 
			copyArgs(n,"NextPageToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"TimePeriod",params,undefined,true); 
			copyArgs(msg,"GroupBy",params,undefined,true); 
			copyArgs(msg,"Granularity",params,undefined,false); 
			copyArgs(msg,"Filter",params,undefined,true); 
			copyArgs(msg,"SortBy",params,undefined,true); 
			copyArgs(msg,"NextPageToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.getReservationUtilization(params,cb);
		}
			service.GetRightsizingRecommendation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Service",params,undefined,false); 
			
			copyArgs(n,"Filter",params,undefined,true); 
			copyArgs(n,"Configuration",params,undefined,true); 
			copyArgs(n,"Service",params,undefined,false); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			copyArgs(n,"NextPageToken",params,undefined,false); 
			
			copyArgs(msg,"Filter",params,undefined,true); 
			copyArgs(msg,"Configuration",params,undefined,true); 
			copyArgs(msg,"Service",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"NextPageToken",params,undefined,false); 
			

			svc.getRightsizingRecommendation(params,cb);
		}
			service.GetSavingsPlansCoverage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TimePeriod",params,undefined,true); 
			
			copyArgs(n,"TimePeriod",params,undefined,true); 
			copyArgs(n,"GroupBy",params,undefined,true); 
			copyArgs(n,"Granularity",params,undefined,false); 
			copyArgs(n,"Filter",params,undefined,true); 
			copyArgs(n,"Metrics",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,true); 
			
			copyArgs(msg,"TimePeriod",params,undefined,true); 
			copyArgs(msg,"GroupBy",params,undefined,true); 
			copyArgs(msg,"Granularity",params,undefined,false); 
			copyArgs(msg,"Filter",params,undefined,true); 
			copyArgs(msg,"Metrics",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,true); 
			

			svc.getSavingsPlansCoverage(params,cb);
		}
			service.GetSavingsPlansPurchaseRecommendation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SavingsPlansType",params,undefined,false); 
			copyArgs(n,"TermInYears",params,undefined,false); 
			copyArgs(n,"PaymentOption",params,undefined,false); 
			copyArgs(n,"LookbackPeriodInDays",params,undefined,false); 
			
			copyArgs(n,"SavingsPlansType",params,undefined,false); 
			copyArgs(n,"TermInYears",params,undefined,false); 
			copyArgs(n,"PaymentOption",params,undefined,false); 
			copyArgs(n,"AccountScope",params,undefined,false); 
			copyArgs(n,"NextPageToken",params,undefined,false); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			copyArgs(n,"LookbackPeriodInDays",params,undefined,false); 
			copyArgs(n,"Filter",params,undefined,true); 
			
			copyArgs(msg,"SavingsPlansType",params,undefined,false); 
			copyArgs(msg,"TermInYears",params,undefined,false); 
			copyArgs(msg,"PaymentOption",params,undefined,false); 
			copyArgs(msg,"AccountScope",params,undefined,false); 
			copyArgs(msg,"NextPageToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"LookbackPeriodInDays",params,undefined,false); 
			copyArgs(msg,"Filter",params,undefined,true); 
			

			svc.getSavingsPlansPurchaseRecommendation(params,cb);
		}
			service.GetSavingsPlansUtilization=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TimePeriod",params,undefined,true); 
			
			copyArgs(n,"TimePeriod",params,undefined,true); 
			copyArgs(n,"Granularity",params,undefined,false); 
			copyArgs(n,"Filter",params,undefined,true); 
			copyArgs(n,"SortBy",params,undefined,true); 
			
			copyArgs(msg,"TimePeriod",params,undefined,true); 
			copyArgs(msg,"Granularity",params,undefined,false); 
			copyArgs(msg,"Filter",params,undefined,true); 
			copyArgs(msg,"SortBy",params,undefined,true); 
			

			svc.getSavingsPlansUtilization(params,cb);
		}
			service.GetSavingsPlansUtilizationDetails=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TimePeriod",params,undefined,true); 
			
			copyArgs(n,"TimePeriod",params,undefined,true); 
			copyArgs(n,"Filter",params,undefined,true); 
			copyArgs(n,"DataType",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,true); 
			
			copyArgs(msg,"TimePeriod",params,undefined,true); 
			copyArgs(msg,"Filter",params,undefined,true); 
			copyArgs(msg,"DataType",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,true); 
			

			svc.getSavingsPlansUtilizationDetails(params,cb);
		}
			service.GetTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TimePeriod",params,undefined,true); 
			
			copyArgs(n,"SearchString",params,undefined,false); 
			copyArgs(n,"TimePeriod",params,undefined,true); 
			copyArgs(n,"TagKey",params,undefined,false); 
			copyArgs(n,"Filter",params,undefined,true); 
			copyArgs(n,"SortBy",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextPageToken",params,undefined,false); 
			
			copyArgs(msg,"SearchString",params,undefined,false); 
			copyArgs(msg,"TimePeriod",params,undefined,true); 
			copyArgs(msg,"TagKey",params,undefined,false); 
			copyArgs(msg,"Filter",params,undefined,true); 
			copyArgs(msg,"SortBy",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextPageToken",params,undefined,false); 
			

			svc.getTags(params,cb);
		}
			service.GetUsageForecast=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TimePeriod",params,undefined,true); 
			copyArgs(n,"Metric",params,undefined,false); 
			copyArgs(n,"Granularity",params,undefined,false); 
			
			copyArgs(n,"TimePeriod",params,undefined,true); 
			copyArgs(n,"Metric",params,undefined,false); 
			copyArgs(n,"Granularity",params,undefined,false); 
			copyArgs(n,"Filter",params,undefined,true); 
			copyArgs(Number(n),"PredictionIntervalLevel",params,undefined,false); 
			
			copyArgs(msg,"TimePeriod",params,undefined,true); 
			copyArgs(msg,"Metric",params,undefined,false); 
			copyArgs(msg,"Granularity",params,undefined,false); 
			copyArgs(msg,"Filter",params,undefined,true); 
			copyArgs(msg,"PredictionIntervalLevel",params,undefined,false); 
			

			svc.getUsageForecast(params,cb);
		}
			service.ListCostCategoryDefinitions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"EffectiveOn",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"EffectiveOn",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listCostCategoryDefinitions(params,cb);
		}
			service.ProvideAnomalyFeedback=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AnomalyId",params,undefined,false); 
			copyArgs(n,"Feedback",params,undefined,false); 
			
			copyArgs(n,"AnomalyId",params,undefined,false); 
			copyArgs(n,"Feedback",params,undefined,false); 
			
			copyArgs(msg,"AnomalyId",params,undefined,false); 
			copyArgs(msg,"Feedback",params,undefined,false); 
			

			svc.provideAnomalyFeedback(params,cb);
		}
			service.UpdateAnomalyMonitor=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MonitorArn",params,undefined,false); 
			
			copyArgs(n,"MonitorArn",params,undefined,false); 
			copyArgs(n,"MonitorName",params,undefined,false); 
			
			copyArgs(msg,"MonitorArn",params,undefined,false); 
			copyArgs(msg,"MonitorName",params,undefined,false); 
			

			svc.updateAnomalyMonitor(params,cb);
		}
			service.UpdateAnomalySubscription=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubscriptionArn",params,undefined,false); 
			
			copyArgs(n,"SubscriptionArn",params,undefined,false); 
			copyArgs(n,"Threshold",params,undefined,false); 
			copyArgs(n,"Frequency",params,undefined,false); 
			copyArgs(n,"MonitorArnList",params,undefined,true); 
			copyArgs(n,"Subscribers",params,undefined,true); 
			copyArgs(n,"SubscriptionName",params,undefined,false); 
			
			copyArgs(msg,"SubscriptionArn",params,undefined,false); 
			copyArgs(msg,"Threshold",params,undefined,false); 
			copyArgs(msg,"Frequency",params,undefined,false); 
			copyArgs(msg,"MonitorArnList",params,undefined,true); 
			copyArgs(msg,"Subscribers",params,undefined,true); 
			copyArgs(msg,"SubscriptionName",params,undefined,false); 
			

			svc.updateAnomalySubscription(params,cb);
		}
			service.UpdateCostCategoryDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CostCategoryArn",params,undefined,false); 
			copyArgs(n,"RuleVersion",params,undefined,false); 
			copyArgs(n,"Rules",params,undefined,true); 
			
			copyArgs(n,"CostCategoryArn",params,undefined,false); 
			copyArgs(n,"RuleVersion",params,undefined,false); 
			copyArgs(n,"Rules",params,undefined,true); 
			copyArgs(n,"DefaultValue",params,undefined,false); 
			copyArgs(n,"SplitChargeRules",params,undefined,true); 
			
			copyArgs(msg,"CostCategoryArn",params,undefined,false); 
			copyArgs(msg,"RuleVersion",params,undefined,false); 
			copyArgs(msg,"Rules",params,undefined,true); 
			copyArgs(msg,"DefaultValue",params,undefined,false); 
			copyArgs(msg,"SplitChargeRules",params,undefined,true); 
			

			svc.updateCostCategoryDefinition(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS CostExplorer", AmazonAPINode);

};
