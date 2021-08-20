
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

		var awsService = new AWS.LookoutMetrics( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.LookoutMetrics(msg.AWSConfig) : awsService;

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

		
		service.ActivateAnomalyDetector=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AnomalyDetectorArn",params,undefined,false); 
			
			copyArg(msg,"AnomalyDetectorArn",params,undefined,false); 
			

			svc.activateAnomalyDetector(params,cb);
		}

		
		service.BackTestAnomalyDetector=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AnomalyDetectorArn",params,undefined,false); 
			
			copyArg(msg,"AnomalyDetectorArn",params,undefined,false); 
			

			svc.backTestAnomalyDetector(params,cb);
		}

		
		service.CreateAlert=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AlertName",params,undefined,false); 
			copyArg(n,"AlertSensitivityThreshold",params,undefined,false); 
			copyArg(n,"AnomalyDetectorArn",params,undefined,false); 
			copyArg(n,"Action",params,undefined,true); 
			
			copyArg(msg,"AlertName",params,undefined,false); 
			copyArg(msg,"AlertSensitivityThreshold",params,undefined,false); 
			copyArg(msg,"AlertDescription",params,undefined,false); 
			copyArg(msg,"AnomalyDetectorArn",params,undefined,false); 
			copyArg(msg,"Action",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createAlert(params,cb);
		}

		
		service.CreateAnomalyDetector=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AnomalyDetectorName",params,undefined,false); 
			copyArg(n,"AnomalyDetectorConfig",params,undefined,true); 
			
			copyArg(msg,"AnomalyDetectorName",params,undefined,false); 
			copyArg(msg,"AnomalyDetectorDescription",params,undefined,false); 
			copyArg(msg,"AnomalyDetectorConfig",params,undefined,true); 
			copyArg(msg,"KmsKeyArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createAnomalyDetector(params,cb);
		}

		
		service.CreateMetricSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AnomalyDetectorArn",params,undefined,false); 
			copyArg(n,"MetricSetName",params,undefined,false); 
			copyArg(n,"MetricList",params,undefined,true); 
			copyArg(n,"MetricSource",params,undefined,true); 
			
			copyArg(msg,"AnomalyDetectorArn",params,undefined,false); 
			copyArg(msg,"MetricSetName",params,undefined,false); 
			copyArg(msg,"MetricSetDescription",params,undefined,false); 
			copyArg(msg,"MetricList",params,undefined,true); 
			copyArg(msg,"Offset",params,undefined,false); 
			copyArg(msg,"TimestampColumn",params,undefined,true); 
			copyArg(msg,"DimensionList",params,undefined,true); 
			copyArg(msg,"MetricSetFrequency",params,undefined,false); 
			copyArg(msg,"MetricSource",params,undefined,true); 
			copyArg(msg,"Timezone",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createMetricSet(params,cb);
		}

		
		service.DeleteAlert=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AlertArn",params,undefined,false); 
			
			copyArg(msg,"AlertArn",params,undefined,false); 
			

			svc.deleteAlert(params,cb);
		}

		
		service.DeleteAnomalyDetector=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AnomalyDetectorArn",params,undefined,false); 
			
			copyArg(msg,"AnomalyDetectorArn",params,undefined,false); 
			

			svc.deleteAnomalyDetector(params,cb);
		}

		
		service.DescribeAlert=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AlertArn",params,undefined,false); 
			
			copyArg(msg,"AlertArn",params,undefined,false); 
			

			svc.describeAlert(params,cb);
		}

		
		service.DescribeAnomalyDetectionExecutions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AnomalyDetectorArn",params,undefined,false); 
			
			copyArg(msg,"AnomalyDetectorArn",params,undefined,false); 
			copyArg(msg,"Timestamp",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeAnomalyDetectionExecutions(params,cb);
		}

		
		service.DescribeAnomalyDetector=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AnomalyDetectorArn",params,undefined,false); 
			
			copyArg(msg,"AnomalyDetectorArn",params,undefined,false); 
			

			svc.describeAnomalyDetector(params,cb);
		}

		
		service.DescribeMetricSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MetricSetArn",params,undefined,false); 
			
			copyArg(msg,"MetricSetArn",params,undefined,false); 
			

			svc.describeMetricSet(params,cb);
		}

		
		service.GetAnomalyGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AnomalyGroupId",params,undefined,false); 
			copyArg(n,"AnomalyDetectorArn",params,undefined,false); 
			
			copyArg(msg,"AnomalyGroupId",params,undefined,false); 
			copyArg(msg,"AnomalyDetectorArn",params,undefined,false); 
			

			svc.getAnomalyGroup(params,cb);
		}

		
		service.GetFeedback=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AnomalyDetectorArn",params,undefined,false); 
			copyArg(n,"AnomalyGroupTimeSeriesFeedback",params,undefined,false); 
			
			copyArg(msg,"AnomalyDetectorArn",params,undefined,false); 
			copyArg(msg,"AnomalyGroupTimeSeriesFeedback",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getFeedback(params,cb);
		}

		
		service.GetSampleData=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"S3SourceConfig",params,undefined,false); 
			

			svc.getSampleData(params,cb);
		}

		
		service.ListAlerts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AnomalyDetectorArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listAlerts(params,cb);
		}

		
		service.ListAnomalyDetectors=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listAnomalyDetectors(params,cb);
		}

		
		service.ListAnomalyGroupSummaries=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AnomalyDetectorArn",params,undefined,false); 
			copyArg(n,"SensitivityThreshold",params,undefined,false); 
			
			copyArg(msg,"AnomalyDetectorArn",params,undefined,false); 
			copyArg(msg,"SensitivityThreshold",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listAnomalyGroupSummaries(params,cb);
		}

		
		service.ListAnomalyGroupTimeSeries=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AnomalyDetectorArn",params,undefined,false); 
			copyArg(n,"AnomalyGroupId",params,undefined,false); 
			copyArg(n,"MetricName",params,undefined,false); 
			
			copyArg(msg,"AnomalyDetectorArn",params,undefined,false); 
			copyArg(msg,"AnomalyGroupId",params,undefined,false); 
			copyArg(msg,"MetricName",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listAnomalyGroupTimeSeries(params,cb);
		}

		
		service.ListMetricSets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AnomalyDetectorArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listMetricSets(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutFeedback=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AnomalyDetectorArn",params,undefined,false); 
			copyArg(n,"AnomalyGroupTimeSeriesFeedback",params,undefined,false); 
			
			copyArg(msg,"AnomalyDetectorArn",params,undefined,false); 
			copyArg(msg,"AnomalyGroupTimeSeriesFeedback",params,undefined,false); 
			

			svc.putFeedback(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateAnomalyDetector=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AnomalyDetectorArn",params,undefined,false); 
			
			copyArg(msg,"AnomalyDetectorArn",params,undefined,false); 
			copyArg(msg,"KmsKeyArn",params,undefined,false); 
			copyArg(msg,"AnomalyDetectorDescription",params,undefined,false); 
			copyArg(msg,"AnomalyDetectorConfig",params,undefined,true); 
			

			svc.updateAnomalyDetector(params,cb);
		}

		
		service.UpdateMetricSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MetricSetArn",params,undefined,false); 
			
			copyArg(msg,"MetricSetArn",params,undefined,false); 
			copyArg(msg,"MetricSetDescription",params,undefined,false); 
			copyArg(msg,"MetricList",params,undefined,true); 
			copyArg(msg,"Offset",params,undefined,false); 
			copyArg(msg,"TimestampColumn",params,undefined,true); 
			copyArg(msg,"DimensionList",params,undefined,true); 
			copyArg(msg,"MetricSetFrequency",params,undefined,false); 
			copyArg(msg,"MetricSource",params,undefined,true); 
			

			svc.updateMetricSet(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS LookoutMetrics", AmazonAPINode);

};
