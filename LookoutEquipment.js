
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

		var awsService = new AWS.LookoutEquipment( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.LookoutEquipment(msg.AWSConfig) : awsService;

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

		
		service.CreateDataset=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatasetName",params,undefined,false); 
			copyArg(n,"DatasetSchema",params,undefined,true); 
			copyArg(n,"ClientToken",params,undefined,false); 
			
			copyArg(msg,"DatasetName",params,undefined,false); 
			copyArg(msg,"DatasetSchema",params,undefined,true); 
			copyArg(msg,"ServerSideKmsKeyId",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createDataset(params,cb);
		}

		
		service.CreateInferenceScheduler=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ModelName",params,undefined,false); 
			copyArg(n,"InferenceSchedulerName",params,undefined,false); 
			copyArg(n,"DataUploadFrequency",params,undefined,false); 
			copyArg(n,"DataInputConfiguration",params,undefined,true); 
			copyArg(n,"DataOutputConfiguration",params,undefined,true); 
			copyArg(n,"RoleArn",params,undefined,false); 
			copyArg(n,"ClientToken",params,undefined,false); 
			
			copyArg(msg,"ModelName",params,undefined,false); 
			copyArg(msg,"InferenceSchedulerName",params,undefined,false); 
			copyArg(msg,"DataDelayOffsetInMinutes",params,undefined,false); 
			copyArg(msg,"DataUploadFrequency",params,undefined,false); 
			copyArg(msg,"DataInputConfiguration",params,undefined,true); 
			copyArg(msg,"DataOutputConfiguration",params,undefined,true); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"ServerSideKmsKeyId",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createInferenceScheduler(params,cb);
		}

		
		service.CreateModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ModelName",params,undefined,false); 
			copyArg(n,"DatasetName",params,undefined,false); 
			copyArg(n,"ClientToken",params,undefined,false); 
			
			copyArg(msg,"ModelName",params,undefined,false); 
			copyArg(msg,"DatasetName",params,undefined,false); 
			copyArg(msg,"DatasetSchema",params,undefined,true); 
			copyArg(msg,"LabelsInputConfiguration",params,undefined,true); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"TrainingDataStartTime",params,undefined,false); 
			copyArg(msg,"TrainingDataEndTime",params,undefined,false); 
			copyArg(msg,"EvaluationDataStartTime",params,undefined,false); 
			copyArg(msg,"EvaluationDataEndTime",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"DataPreProcessingConfiguration",params,undefined,true); 
			copyArg(msg,"ServerSideKmsKeyId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createModel(params,cb);
		}

		
		service.DeleteDataset=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatasetName",params,undefined,false); 
			
			copyArg(msg,"DatasetName",params,undefined,false); 
			

			svc.deleteDataset(params,cb);
		}

		
		service.DeleteInferenceScheduler=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InferenceSchedulerName",params,undefined,false); 
			
			copyArg(msg,"InferenceSchedulerName",params,undefined,false); 
			

			svc.deleteInferenceScheduler(params,cb);
		}

		
		service.DeleteModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ModelName",params,undefined,false); 
			
			copyArg(msg,"ModelName",params,undefined,false); 
			

			svc.deleteModel(params,cb);
		}

		
		service.DescribeDataIngestionJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobId",params,undefined,false); 
			
			copyArg(msg,"JobId",params,undefined,false); 
			

			svc.describeDataIngestionJob(params,cb);
		}

		
		service.DescribeDataset=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatasetName",params,undefined,false); 
			
			copyArg(msg,"DatasetName",params,undefined,false); 
			

			svc.describeDataset(params,cb);
		}

		
		service.DescribeInferenceScheduler=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InferenceSchedulerName",params,undefined,false); 
			
			copyArg(msg,"InferenceSchedulerName",params,undefined,false); 
			

			svc.describeInferenceScheduler(params,cb);
		}

		
		service.DescribeModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ModelName",params,undefined,false); 
			
			copyArg(msg,"ModelName",params,undefined,false); 
			

			svc.describeModel(params,cb);
		}

		
		service.ListDataIngestionJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DatasetName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			

			svc.listDataIngestionJobs(params,cb);
		}

		
		service.ListDatasets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"DatasetNameBeginsWith",params,undefined,false); 
			

			svc.listDatasets(params,cb);
		}

		
		service.ListInferenceExecutions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InferenceSchedulerName",params,undefined,false); 
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"InferenceSchedulerName",params,undefined,false); 
			copyArg(msg,"DataStartTimeAfter",params,undefined,false); 
			copyArg(msg,"DataEndTimeBefore",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			

			svc.listInferenceExecutions(params,cb);
		}

		
		service.ListInferenceSchedulers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"InferenceSchedulerNameBeginsWith",params,undefined,false); 
			copyArg(msg,"ModelName",params,undefined,false); 
			

			svc.listInferenceSchedulers(params,cb);
		}

		
		service.ListModels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			copyArg(msg,"ModelNameBeginsWith",params,undefined,false); 
			copyArg(msg,"DatasetNameBeginsWith",params,undefined,false); 
			

			svc.listModels(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.StartDataIngestionJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatasetName",params,undefined,false); 
			copyArg(n,"IngestionInputConfiguration",params,undefined,true); 
			copyArg(n,"RoleArn",params,undefined,false); 
			copyArg(n,"ClientToken",params,undefined,false); 
			
			copyArg(msg,"DatasetName",params,undefined,false); 
			copyArg(msg,"IngestionInputConfiguration",params,undefined,true); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.startDataIngestionJob(params,cb);
		}

		
		service.StartInferenceScheduler=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InferenceSchedulerName",params,undefined,false); 
			
			copyArg(msg,"InferenceSchedulerName",params,undefined,false); 
			

			svc.startInferenceScheduler(params,cb);
		}

		
		service.StopInferenceScheduler=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InferenceSchedulerName",params,undefined,false); 
			
			copyArg(msg,"InferenceSchedulerName",params,undefined,false); 
			

			svc.stopInferenceScheduler(params,cb);
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

		
		service.UpdateInferenceScheduler=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InferenceSchedulerName",params,undefined,false); 
			
			copyArg(msg,"InferenceSchedulerName",params,undefined,false); 
			copyArg(msg,"DataDelayOffsetInMinutes",params,undefined,false); 
			copyArg(msg,"DataUploadFrequency",params,undefined,false); 
			copyArg(msg,"DataInputConfiguration",params,undefined,true); 
			copyArg(msg,"DataOutputConfiguration",params,undefined,true); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			

			svc.updateInferenceScheduler(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS LookoutEquipment", AmazonAPINode);

};
