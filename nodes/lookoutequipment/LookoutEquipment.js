
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

		var awsService = new AWS.LookoutEquipment( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.LookoutEquipment(msg.AWSConfig) : awsService;

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
		
		service.CreateDataset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatasetName",params,undefined,false); 
			copyArgs(n,"DatasetSchema",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(n,"DatasetName",params,undefined,false); 
			copyArgs(n,"DatasetSchema",params,undefined,true); 
			copyArgs(n,"ServerSideKmsKeyId",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DatasetName",params,undefined,false); 
			copyArgs(msg,"DatasetSchema",params,undefined,true); 
			copyArgs(msg,"ServerSideKmsKeyId",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createDataset(params,cb);
		}
		
		service.CreateInferenceScheduler=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ModelName",params,undefined,false); 
			copyArgs(n,"InferenceSchedulerName",params,undefined,false); 
			copyArgs(n,"DataUploadFrequency",params,undefined,false); 
			copyArgs(n,"DataInputConfiguration",params,undefined,true); 
			copyArgs(n,"DataOutputConfiguration",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(n,"ModelName",params,undefined,false); 
			copyArgs(n,"InferenceSchedulerName",params,undefined,false); 
			copyArgs(n,"DataDelayOffsetInMinutes",params,undefined,false); 
			copyArgs(n,"DataUploadFrequency",params,undefined,false); 
			copyArgs(n,"DataInputConfiguration",params,undefined,true); 
			copyArgs(n,"DataOutputConfiguration",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"ServerSideKmsKeyId",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ModelName",params,undefined,false); 
			copyArgs(msg,"InferenceSchedulerName",params,undefined,false); 
			copyArgs(msg,"DataDelayOffsetInMinutes",params,undefined,false); 
			copyArgs(msg,"DataUploadFrequency",params,undefined,false); 
			copyArgs(msg,"DataInputConfiguration",params,undefined,true); 
			copyArgs(msg,"DataOutputConfiguration",params,undefined,true); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"ServerSideKmsKeyId",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createInferenceScheduler(params,cb);
		}
		
		service.CreateModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ModelName",params,undefined,false); 
			copyArgs(n,"DatasetName",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(n,"ModelName",params,undefined,false); 
			copyArgs(n,"DatasetName",params,undefined,false); 
			copyArgs(n,"DatasetSchema",params,undefined,true); 
			copyArgs(n,"LabelsInputConfiguration",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"TrainingDataStartTime",params,undefined,false); 
			copyArgs(n,"TrainingDataEndTime",params,undefined,false); 
			copyArgs(n,"EvaluationDataStartTime",params,undefined,false); 
			copyArgs(n,"EvaluationDataEndTime",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"DataPreProcessingConfiguration",params,undefined,true); 
			copyArgs(n,"ServerSideKmsKeyId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ModelName",params,undefined,false); 
			copyArgs(msg,"DatasetName",params,undefined,false); 
			copyArgs(msg,"DatasetSchema",params,undefined,true); 
			copyArgs(msg,"LabelsInputConfiguration",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"TrainingDataStartTime",params,undefined,false); 
			copyArgs(msg,"TrainingDataEndTime",params,undefined,false); 
			copyArgs(msg,"EvaluationDataStartTime",params,undefined,false); 
			copyArgs(msg,"EvaluationDataEndTime",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"DataPreProcessingConfiguration",params,undefined,true); 
			copyArgs(msg,"ServerSideKmsKeyId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createModel(params,cb);
		}
		
		service.DeleteDataset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatasetName",params,undefined,false); 
			
			copyArgs(n,"DatasetName",params,undefined,false); 
			
			copyArgs(msg,"DatasetName",params,undefined,false); 
			

			svc.deleteDataset(params,cb);
		}
		
		service.DeleteInferenceScheduler=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InferenceSchedulerName",params,undefined,false); 
			
			copyArgs(n,"InferenceSchedulerName",params,undefined,false); 
			
			copyArgs(msg,"InferenceSchedulerName",params,undefined,false); 
			

			svc.deleteInferenceScheduler(params,cb);
		}
		
		service.DeleteModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ModelName",params,undefined,false); 
			
			copyArgs(n,"ModelName",params,undefined,false); 
			
			copyArgs(msg,"ModelName",params,undefined,false); 
			

			svc.deleteModel(params,cb);
		}
		
		service.DescribeDataIngestionJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.describeDataIngestionJob(params,cb);
		}
		
		service.DescribeDataset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatasetName",params,undefined,false); 
			
			copyArgs(n,"DatasetName",params,undefined,false); 
			
			copyArgs(msg,"DatasetName",params,undefined,false); 
			

			svc.describeDataset(params,cb);
		}
		
		service.DescribeInferenceScheduler=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InferenceSchedulerName",params,undefined,false); 
			
			copyArgs(n,"InferenceSchedulerName",params,undefined,false); 
			
			copyArgs(msg,"InferenceSchedulerName",params,undefined,false); 
			

			svc.describeInferenceScheduler(params,cb);
		}
		
		service.DescribeModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ModelName",params,undefined,false); 
			
			copyArgs(n,"ModelName",params,undefined,false); 
			
			copyArgs(msg,"ModelName",params,undefined,false); 
			

			svc.describeModel(params,cb);
		}
		
		service.ListDataIngestionJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DatasetName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(msg,"DatasetName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			

			svc.listDataIngestionJobs(params,cb);
		}
		
		service.ListDatasets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"DatasetNameBeginsWith",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"DatasetNameBeginsWith",params,undefined,false); 
			

			svc.listDatasets(params,cb);
		}
		
		service.ListInferenceExecutions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InferenceSchedulerName",params,undefined,false); 
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"InferenceSchedulerName",params,undefined,false); 
			copyArgs(n,"DataStartTimeAfter",params,undefined,false); 
			copyArgs(n,"DataEndTimeBefore",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"InferenceSchedulerName",params,undefined,false); 
			copyArgs(msg,"DataStartTimeAfter",params,undefined,false); 
			copyArgs(msg,"DataEndTimeBefore",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			

			svc.listInferenceExecutions(params,cb);
		}
		
		service.ListInferenceSchedulers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"InferenceSchedulerNameBeginsWith",params,undefined,false); 
			copyArgs(n,"ModelName",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"InferenceSchedulerNameBeginsWith",params,undefined,false); 
			copyArgs(msg,"ModelName",params,undefined,false); 
			

			svc.listInferenceSchedulers(params,cb);
		}
		
		service.ListModels=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			copyArgs(n,"ModelNameBeginsWith",params,undefined,false); 
			copyArgs(n,"DatasetNameBeginsWith",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			copyArgs(msg,"ModelNameBeginsWith",params,undefined,false); 
			copyArgs(msg,"DatasetNameBeginsWith",params,undefined,false); 
			

			svc.listModels(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.StartDataIngestionJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatasetName",params,undefined,false); 
			copyArgs(n,"IngestionInputConfiguration",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(n,"DatasetName",params,undefined,false); 
			copyArgs(n,"IngestionInputConfiguration",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"DatasetName",params,undefined,false); 
			copyArgs(msg,"IngestionInputConfiguration",params,undefined,true); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.startDataIngestionJob(params,cb);
		}
		
		service.StartInferenceScheduler=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InferenceSchedulerName",params,undefined,false); 
			
			copyArgs(n,"InferenceSchedulerName",params,undefined,false); 
			
			copyArgs(msg,"InferenceSchedulerName",params,undefined,false); 
			

			svc.startInferenceScheduler(params,cb);
		}
		
		service.StopInferenceScheduler=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InferenceSchedulerName",params,undefined,false); 
			
			copyArgs(n,"InferenceSchedulerName",params,undefined,false); 
			
			copyArgs(msg,"InferenceSchedulerName",params,undefined,false); 
			

			svc.stopInferenceScheduler(params,cb);
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
		
		service.UpdateInferenceScheduler=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InferenceSchedulerName",params,undefined,false); 
			
			copyArgs(n,"InferenceSchedulerName",params,undefined,false); 
			copyArgs(n,"DataDelayOffsetInMinutes",params,undefined,false); 
			copyArgs(n,"DataUploadFrequency",params,undefined,false); 
			copyArgs(n,"DataInputConfiguration",params,undefined,true); 
			copyArgs(n,"DataOutputConfiguration",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(msg,"InferenceSchedulerName",params,undefined,false); 
			copyArgs(msg,"DataDelayOffsetInMinutes",params,undefined,false); 
			copyArgs(msg,"DataUploadFrequency",params,undefined,false); 
			copyArgs(msg,"DataInputConfiguration",params,undefined,true); 
			copyArgs(msg,"DataOutputConfiguration",params,undefined,true); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			

			svc.updateInferenceScheduler(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS LookoutEquipment", AmazonAPINode);

};
