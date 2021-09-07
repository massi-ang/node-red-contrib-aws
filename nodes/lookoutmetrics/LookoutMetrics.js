
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

		var awsService = new AWS.LookoutMetrics( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.LookoutMetrics(msg.AWSConfig) : awsService;

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

		
		service.ActivateAnomalyDetector=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AnomalyDetectorArn",params,undefined,false); 
			
			copyArgs(n,"AnomalyDetectorArn",params,undefined,false); 
			
			copyArgs(msg,"AnomalyDetectorArn",params,undefined,false); 
			

			svc.activateAnomalyDetector(params,cb);
		}

		
		service.BackTestAnomalyDetector=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AnomalyDetectorArn",params,undefined,false); 
			
			copyArgs(n,"AnomalyDetectorArn",params,undefined,false); 
			
			copyArgs(msg,"AnomalyDetectorArn",params,undefined,false); 
			

			svc.backTestAnomalyDetector(params,cb);
		}

		
		service.CreateAlert=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AlertName",params,undefined,false); 
			copyArgs(n,"AlertSensitivityThreshold",params,undefined,false); 
			copyArgs(n,"AnomalyDetectorArn",params,undefined,false); 
			copyArgs(n,"Action",params,undefined,true); 
			
			copyArgs(n,"AlertName",params,undefined,false); 
			copyArgs(n,"AlertSensitivityThreshold",params,undefined,false); 
			copyArgs(n,"AlertDescription",params,undefined,false); 
			copyArgs(n,"AnomalyDetectorArn",params,undefined,false); 
			copyArgs(n,"Action",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"AlertName",params,undefined,false); 
			copyArgs(msg,"AlertSensitivityThreshold",params,undefined,false); 
			copyArgs(msg,"AlertDescription",params,undefined,false); 
			copyArgs(msg,"AnomalyDetectorArn",params,undefined,false); 
			copyArgs(msg,"Action",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createAlert(params,cb);
		}

		
		service.CreateAnomalyDetector=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AnomalyDetectorName",params,undefined,false); 
			copyArgs(n,"AnomalyDetectorConfig",params,undefined,true); 
			
			copyArgs(n,"AnomalyDetectorName",params,undefined,false); 
			copyArgs(n,"AnomalyDetectorDescription",params,undefined,false); 
			copyArgs(n,"AnomalyDetectorConfig",params,undefined,true); 
			copyArgs(n,"KmsKeyArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"AnomalyDetectorName",params,undefined,false); 
			copyArgs(msg,"AnomalyDetectorDescription",params,undefined,false); 
			copyArgs(msg,"AnomalyDetectorConfig",params,undefined,true); 
			copyArgs(msg,"KmsKeyArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createAnomalyDetector(params,cb);
		}

		
		service.CreateMetricSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AnomalyDetectorArn",params,undefined,false); 
			copyArgs(n,"MetricSetName",params,undefined,false); 
			copyArgs(n,"MetricList",params,undefined,true); 
			copyArgs(n,"MetricSource",params,undefined,true); 
			
			copyArgs(n,"AnomalyDetectorArn",params,undefined,false); 
			copyArgs(n,"MetricSetName",params,undefined,false); 
			copyArgs(n,"MetricSetDescription",params,undefined,false); 
			copyArgs(n,"MetricList",params,undefined,true); 
			copyArgs(n,"Offset",params,undefined,false); 
			copyArgs(n,"TimestampColumn",params,undefined,true); 
			copyArgs(n,"DimensionList",params,undefined,true); 
			copyArgs(n,"MetricSetFrequency",params,undefined,false); 
			copyArgs(n,"MetricSource",params,undefined,true); 
			copyArgs(n,"Timezone",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"AnomalyDetectorArn",params,undefined,false); 
			copyArgs(msg,"MetricSetName",params,undefined,false); 
			copyArgs(msg,"MetricSetDescription",params,undefined,false); 
			copyArgs(msg,"MetricList",params,undefined,true); 
			copyArgs(msg,"Offset",params,undefined,false); 
			copyArgs(msg,"TimestampColumn",params,undefined,true); 
			copyArgs(msg,"DimensionList",params,undefined,true); 
			copyArgs(msg,"MetricSetFrequency",params,undefined,false); 
			copyArgs(msg,"MetricSource",params,undefined,true); 
			copyArgs(msg,"Timezone",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createMetricSet(params,cb);
		}

		
		service.DeleteAlert=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AlertArn",params,undefined,false); 
			
			copyArgs(n,"AlertArn",params,undefined,false); 
			
			copyArgs(msg,"AlertArn",params,undefined,false); 
			

			svc.deleteAlert(params,cb);
		}

		
		service.DeleteAnomalyDetector=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AnomalyDetectorArn",params,undefined,false); 
			
			copyArgs(n,"AnomalyDetectorArn",params,undefined,false); 
			
			copyArgs(msg,"AnomalyDetectorArn",params,undefined,false); 
			

			svc.deleteAnomalyDetector(params,cb);
		}

		
		service.DescribeAlert=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AlertArn",params,undefined,false); 
			
			copyArgs(n,"AlertArn",params,undefined,false); 
			
			copyArgs(msg,"AlertArn",params,undefined,false); 
			

			svc.describeAlert(params,cb);
		}

		
		service.DescribeAnomalyDetectionExecutions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AnomalyDetectorArn",params,undefined,false); 
			
			copyArgs(n,"AnomalyDetectorArn",params,undefined,false); 
			copyArgs(n,"Timestamp",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AnomalyDetectorArn",params,undefined,false); 
			copyArgs(msg,"Timestamp",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeAnomalyDetectionExecutions(params,cb);
		}

		
		service.DescribeAnomalyDetector=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AnomalyDetectorArn",params,undefined,false); 
			
			copyArgs(n,"AnomalyDetectorArn",params,undefined,false); 
			
			copyArgs(msg,"AnomalyDetectorArn",params,undefined,false); 
			

			svc.describeAnomalyDetector(params,cb);
		}

		
		service.DescribeMetricSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MetricSetArn",params,undefined,false); 
			
			copyArgs(n,"MetricSetArn",params,undefined,false); 
			
			copyArgs(msg,"MetricSetArn",params,undefined,false); 
			

			svc.describeMetricSet(params,cb);
		}

		
		service.GetAnomalyGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AnomalyGroupId",params,undefined,false); 
			copyArgs(n,"AnomalyDetectorArn",params,undefined,false); 
			
			copyArgs(n,"AnomalyGroupId",params,undefined,false); 
			copyArgs(n,"AnomalyDetectorArn",params,undefined,false); 
			
			copyArgs(msg,"AnomalyGroupId",params,undefined,false); 
			copyArgs(msg,"AnomalyDetectorArn",params,undefined,false); 
			

			svc.getAnomalyGroup(params,cb);
		}

		
		service.GetFeedback=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AnomalyDetectorArn",params,undefined,false); 
			copyArgs(n,"AnomalyGroupTimeSeriesFeedback",params,undefined,false); 
			
			copyArgs(n,"AnomalyDetectorArn",params,undefined,false); 
			copyArgs(n,"AnomalyGroupTimeSeriesFeedback",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AnomalyDetectorArn",params,undefined,false); 
			copyArgs(msg,"AnomalyGroupTimeSeriesFeedback",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getFeedback(params,cb);
		}

		
		service.GetSampleData=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"S3SourceConfig",params,undefined,false); 
			
			copyArgs(msg,"S3SourceConfig",params,undefined,false); 
			

			svc.getSampleData(params,cb);
		}

		
		service.ListAlerts=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AnomalyDetectorArn",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"AnomalyDetectorArn",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listAlerts(params,cb);
		}

		
		service.ListAnomalyDetectors=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listAnomalyDetectors(params,cb);
		}

		
		service.ListAnomalyGroupSummaries=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AnomalyDetectorArn",params,undefined,false); 
			copyArgs(n,"SensitivityThreshold",params,undefined,false); 
			
			copyArgs(n,"AnomalyDetectorArn",params,undefined,false); 
			copyArgs(n,"SensitivityThreshold",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AnomalyDetectorArn",params,undefined,false); 
			copyArgs(msg,"SensitivityThreshold",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listAnomalyGroupSummaries(params,cb);
		}

		
		service.ListAnomalyGroupTimeSeries=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AnomalyDetectorArn",params,undefined,false); 
			copyArgs(n,"AnomalyGroupId",params,undefined,false); 
			copyArgs(n,"MetricName",params,undefined,false); 
			
			copyArgs(n,"AnomalyDetectorArn",params,undefined,false); 
			copyArgs(n,"AnomalyGroupId",params,undefined,false); 
			copyArgs(n,"MetricName",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AnomalyDetectorArn",params,undefined,false); 
			copyArgs(msg,"AnomalyGroupId",params,undefined,false); 
			copyArgs(msg,"MetricName",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listAnomalyGroupTimeSeries(params,cb);
		}

		
		service.ListMetricSets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AnomalyDetectorArn",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AnomalyDetectorArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listMetricSets(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutFeedback=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AnomalyDetectorArn",params,undefined,false); 
			copyArgs(n,"AnomalyGroupTimeSeriesFeedback",params,undefined,false); 
			
			copyArgs(n,"AnomalyDetectorArn",params,undefined,false); 
			copyArgs(n,"AnomalyGroupTimeSeriesFeedback",params,undefined,false); 
			
			copyArgs(msg,"AnomalyDetectorArn",params,undefined,false); 
			copyArgs(msg,"AnomalyGroupTimeSeriesFeedback",params,undefined,false); 
			

			svc.putFeedback(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateAnomalyDetector=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AnomalyDetectorArn",params,undefined,false); 
			
			copyArgs(n,"AnomalyDetectorArn",params,undefined,false); 
			copyArgs(n,"KmsKeyArn",params,undefined,false); 
			copyArgs(n,"AnomalyDetectorDescription",params,undefined,false); 
			copyArgs(n,"AnomalyDetectorConfig",params,undefined,true); 
			
			copyArgs(msg,"AnomalyDetectorArn",params,undefined,false); 
			copyArgs(msg,"KmsKeyArn",params,undefined,false); 
			copyArgs(msg,"AnomalyDetectorDescription",params,undefined,false); 
			copyArgs(msg,"AnomalyDetectorConfig",params,undefined,true); 
			

			svc.updateAnomalyDetector(params,cb);
		}

		
		service.UpdateMetricSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MetricSetArn",params,undefined,false); 
			
			copyArgs(n,"MetricSetArn",params,undefined,false); 
			copyArgs(n,"MetricSetDescription",params,undefined,false); 
			copyArgs(n,"MetricList",params,undefined,true); 
			copyArgs(n,"Offset",params,undefined,false); 
			copyArgs(n,"TimestampColumn",params,undefined,true); 
			copyArgs(n,"DimensionList",params,undefined,true); 
			copyArgs(n,"MetricSetFrequency",params,undefined,false); 
			copyArgs(n,"MetricSource",params,undefined,true); 
			
			copyArgs(msg,"MetricSetArn",params,undefined,false); 
			copyArgs(msg,"MetricSetDescription",params,undefined,false); 
			copyArgs(msg,"MetricList",params,undefined,true); 
			copyArgs(msg,"Offset",params,undefined,false); 
			copyArgs(msg,"TimestampColumn",params,undefined,true); 
			copyArgs(msg,"DimensionList",params,undefined,true); 
			copyArgs(msg,"MetricSetFrequency",params,undefined,false); 
			copyArgs(msg,"MetricSource",params,undefined,true); 
			

			svc.updateMetricSet(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS LookoutMetrics", AmazonAPINode);

};
