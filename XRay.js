
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

		var awsService = new AWS.XRay( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.XRay(msg.AWSConfig) : awsService;

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

		
		service.BatchGetTraces=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TraceIds",params,undefined,true); 
			
			copyArg(msg,"TraceIds",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.batchGetTraces(params,cb);
		}

		
		service.CreateGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupName",params,undefined,false); 
			
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"FilterExpression",params,undefined,false); 
			copyArg(msg,"InsightsConfiguration",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createGroup(params,cb);
		}

		
		service.CreateSamplingRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SamplingRule",params,undefined,true); 
			
			copyArg(msg,"SamplingRule",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createSamplingRule(params,cb);
		}

		
		service.DeleteGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"GroupARN",params,undefined,false); 
			

			svc.deleteGroup(params,cb);
		}

		
		service.DeleteSamplingRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"RuleName",params,undefined,false); 
			copyArg(msg,"RuleARN",params,undefined,false); 
			

			svc.deleteSamplingRule(params,cb);
		}

		
		service.GetEncryptionConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getEncryptionConfig(params,cb);
		}

		
		service.GetGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"GroupARN",params,undefined,false); 
			

			svc.getGroup(params,cb);
		}

		
		service.GetGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getGroups(params,cb);
		}

		
		service.GetInsight=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InsightId",params,undefined,false); 
			
			copyArg(msg,"InsightId",params,undefined,false); 
			

			svc.getInsight(params,cb);
		}

		
		service.GetInsightEvents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InsightId",params,undefined,false); 
			
			copyArg(msg,"InsightId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getInsightEvents(params,cb);
		}

		
		service.GetInsightImpactGraph=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InsightId",params,undefined,false); 
			copyArg(n,"StartTime",params,undefined,false); 
			copyArg(n,"EndTime",params,undefined,false); 
			
			copyArg(msg,"InsightId",params,undefined,false); 
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getInsightImpactGraph(params,cb);
		}

		
		service.GetInsightSummaries=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StartTime",params,undefined,false); 
			copyArg(n,"EndTime",params,undefined,false); 
			
			copyArg(msg,"States",params,undefined,false); 
			copyArg(msg,"GroupARN",params,undefined,false); 
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getInsightSummaries(params,cb);
		}

		
		service.GetSamplingRules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getSamplingRules(params,cb);
		}

		
		service.GetSamplingStatisticSummaries=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getSamplingStatisticSummaries(params,cb);
		}

		
		service.GetSamplingTargets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SamplingStatisticsDocuments",params,undefined,false); 
			
			copyArg(msg,"SamplingStatisticsDocuments",params,undefined,false); 
			

			svc.getSamplingTargets(params,cb);
		}

		
		service.GetServiceGraph=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StartTime",params,undefined,false); 
			copyArg(n,"EndTime",params,undefined,false); 
			
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"GroupARN",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getServiceGraph(params,cb);
		}

		
		service.GetTimeSeriesServiceStatistics=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StartTime",params,undefined,false); 
			copyArg(n,"EndTime",params,undefined,false); 
			
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"GroupARN",params,undefined,false); 
			copyArg(msg,"EntitySelectorExpression",params,undefined,false); 
			copyArg(msg,"Period",params,undefined,false); 
			copyArg(msg,"ForecastStatistics",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getTimeSeriesServiceStatistics(params,cb);
		}

		
		service.GetTraceGraph=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TraceIds",params,undefined,true); 
			
			copyArg(msg,"TraceIds",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getTraceGraph(params,cb);
		}

		
		service.GetTraceSummaries=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StartTime",params,undefined,false); 
			copyArg(n,"EndTime",params,undefined,false); 
			
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"TimeRangeType",params,undefined,false); 
			copyArg(msg,"Sampling",params,undefined,false); 
			copyArg(msg,"SamplingStrategy",params,undefined,false); 
			copyArg(msg,"FilterExpression",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getTraceSummaries(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutEncryptionConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Type",params,undefined,false); 
			
			copyArg(msg,"KeyId",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			

			svc.putEncryptionConfig(params,cb);
		}

		
		service.PutTelemetryRecords=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TelemetryRecords",params,undefined,false); 
			
			copyArg(msg,"TelemetryRecords",params,undefined,false); 
			copyArg(msg,"EC2InstanceId",params,undefined,false); 
			copyArg(msg,"Hostname",params,undefined,false); 
			copyArg(msg,"ResourceARN",params,undefined,false); 
			

			svc.putTelemetryRecords(params,cb);
		}

		
		service.PutTraceSegments=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TraceSegmentDocuments",params,undefined,false); 
			
			copyArg(msg,"TraceSegmentDocuments",params,undefined,false); 
			

			svc.putTraceSegments(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"GroupARN",params,undefined,false); 
			copyArg(msg,"FilterExpression",params,undefined,false); 
			copyArg(msg,"InsightsConfiguration",params,undefined,true); 
			

			svc.updateGroup(params,cb);
		}

		
		service.UpdateSamplingRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SamplingRuleUpdate",params,undefined,false); 
			
			copyArg(msg,"SamplingRuleUpdate",params,undefined,false); 
			

			svc.updateSamplingRule(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS XRay", AmazonAPINode);

};
