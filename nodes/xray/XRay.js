
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

		var awsService = new AWS.XRay( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.XRay(msg.AWSConfig) : awsService;

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

		
		service.BatchGetTraces=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TraceIds",params,undefined,true); 
			
			copyArgs(n,"TraceIds",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"TraceIds",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.batchGetTraces(params,cb);
		}

		
		service.CreateGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupName",params,undefined,false); 
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"FilterExpression",params,undefined,false); 
			copyArgs(n,"InsightsConfiguration",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"FilterExpression",params,undefined,false); 
			copyArgs(msg,"InsightsConfiguration",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createGroup(params,cb);
		}

		
		service.CreateSamplingRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SamplingRule",params,undefined,true); 
			
			copyArgs(n,"SamplingRule",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"SamplingRule",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createSamplingRule(params,cb);
		}

		
		service.DeleteGroup=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"GroupARN",params,undefined,false); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"GroupARN",params,undefined,false); 
			

			svc.deleteGroup(params,cb);
		}

		
		service.DeleteSamplingRule=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"RuleName",params,undefined,false); 
			copyArgs(n,"RuleARN",params,undefined,false); 
			
			copyArgs(msg,"RuleName",params,undefined,false); 
			copyArgs(msg,"RuleARN",params,undefined,false); 
			

			svc.deleteSamplingRule(params,cb);
		}

		
		service.GetEncryptionConfig=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getEncryptionConfig(params,cb);
		}

		
		service.GetGroup=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"GroupARN",params,undefined,false); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"GroupARN",params,undefined,false); 
			

			svc.getGroup(params,cb);
		}

		
		service.GetGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getGroups(params,cb);
		}

		
		service.GetInsight=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InsightId",params,undefined,false); 
			
			copyArgs(n,"InsightId",params,undefined,false); 
			
			copyArgs(msg,"InsightId",params,undefined,false); 
			

			svc.getInsight(params,cb);
		}

		
		service.GetInsightEvents=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InsightId",params,undefined,false); 
			
			copyArgs(n,"InsightId",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"InsightId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getInsightEvents(params,cb);
		}

		
		service.GetInsightImpactGraph=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InsightId",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			
			copyArgs(n,"InsightId",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"InsightId",params,undefined,false); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getInsightImpactGraph(params,cb);
		}

		
		service.GetInsightSummaries=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			
			copyArgs(n,"States",params,undefined,false); 
			copyArgs(n,"GroupARN",params,undefined,false); 
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"States",params,undefined,false); 
			copyArgs(msg,"GroupARN",params,undefined,false); 
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getInsightSummaries(params,cb);
		}

		
		service.GetSamplingRules=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getSamplingRules(params,cb);
		}

		
		service.GetSamplingStatisticSummaries=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getSamplingStatisticSummaries(params,cb);
		}

		
		service.GetSamplingTargets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SamplingStatisticsDocuments",params,undefined,false); 
			
			copyArgs(n,"SamplingStatisticsDocuments",params,undefined,false); 
			
			copyArgs(msg,"SamplingStatisticsDocuments",params,undefined,false); 
			

			svc.getSamplingTargets(params,cb);
		}

		
		service.GetServiceGraph=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"GroupARN",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"GroupARN",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getServiceGraph(params,cb);
		}

		
		service.GetTimeSeriesServiceStatistics=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"GroupARN",params,undefined,false); 
			copyArgs(n,"EntitySelectorExpression",params,undefined,false); 
			copyArgs(n,"Period",params,undefined,false); 
			copyArgs(n,"ForecastStatistics",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"GroupARN",params,undefined,false); 
			copyArgs(msg,"EntitySelectorExpression",params,undefined,false); 
			copyArgs(msg,"Period",params,undefined,false); 
			copyArgs(msg,"ForecastStatistics",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getTimeSeriesServiceStatistics(params,cb);
		}

		
		service.GetTraceGraph=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TraceIds",params,undefined,true); 
			
			copyArgs(n,"TraceIds",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"TraceIds",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getTraceGraph(params,cb);
		}

		
		service.GetTraceSummaries=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(n,"TimeRangeType",params,undefined,false); 
			copyArgs(n,"Sampling",params,undefined,false); 
			copyArgs(n,"SamplingStrategy",params,undefined,false); 
			copyArgs(n,"FilterExpression",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"TimeRangeType",params,undefined,false); 
			copyArgs(msg,"Sampling",params,undefined,false); 
			copyArgs(msg,"SamplingStrategy",params,undefined,false); 
			copyArgs(msg,"FilterExpression",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getTraceSummaries(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutEncryptionConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			

			svc.putEncryptionConfig(params,cb);
		}

		
		service.PutTelemetryRecords=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TelemetryRecords",params,undefined,false); 
			
			copyArgs(n,"TelemetryRecords",params,undefined,false); 
			copyArgs(n,"EC2InstanceId",params,undefined,false); 
			copyArgs(n,"Hostname",params,undefined,false); 
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(msg,"TelemetryRecords",params,undefined,false); 
			copyArgs(msg,"EC2InstanceId",params,undefined,false); 
			copyArgs(msg,"Hostname",params,undefined,false); 
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			

			svc.putTelemetryRecords(params,cb);
		}

		
		service.PutTraceSegments=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TraceSegmentDocuments",params,undefined,false); 
			
			copyArgs(n,"TraceSegmentDocuments",params,undefined,false); 
			
			copyArgs(msg,"TraceSegmentDocuments",params,undefined,false); 
			

			svc.putTraceSegments(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateGroup=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"GroupARN",params,undefined,false); 
			copyArgs(n,"FilterExpression",params,undefined,false); 
			copyArgs(n,"InsightsConfiguration",params,undefined,true); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"GroupARN",params,undefined,false); 
			copyArgs(msg,"FilterExpression",params,undefined,false); 
			copyArgs(msg,"InsightsConfiguration",params,undefined,true); 
			

			svc.updateGroup(params,cb);
		}

		
		service.UpdateSamplingRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SamplingRuleUpdate",params,undefined,false); 
			
			copyArgs(n,"SamplingRuleUpdate",params,undefined,false); 
			
			copyArgs(msg,"SamplingRuleUpdate",params,undefined,false); 
			

			svc.updateSamplingRule(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS XRay", AmazonAPINode);

};
