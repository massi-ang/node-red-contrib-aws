
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

		var awsService = new AWS.FraudDetector( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.FraudDetector(msg.AWSConfig) : awsService;

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

		
		service.BatchCreateVariable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"variableEntries",params,undefined,false); 
			
			copyArg(msg,"variableEntries",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.batchCreateVariable(params,cb);
		}

		
		service.BatchGetVariable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"names",params,undefined,false); 
			
			copyArg(msg,"names",params,undefined,false); 
			

			svc.batchGetVariable(params,cb);
		}

		
		service.CancelBatchPredictionJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params,undefined,false); 
			
			copyArg(msg,"jobId",params,undefined,false); 
			

			svc.cancelBatchPredictionJob(params,cb);
		}

		
		service.CreateBatchPredictionJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params,undefined,false); 
			copyArg(n,"inputPath",params,undefined,false); 
			copyArg(n,"outputPath",params,undefined,false); 
			copyArg(n,"eventTypeName",params,undefined,false); 
			copyArg(n,"detectorName",params,undefined,false); 
			copyArg(n,"iamRoleArn",params,undefined,false); 
			
			copyArg(msg,"jobId",params,undefined,false); 
			copyArg(msg,"inputPath",params,undefined,false); 
			copyArg(msg,"outputPath",params,undefined,false); 
			copyArg(msg,"eventTypeName",params,undefined,false); 
			copyArg(msg,"detectorName",params,undefined,false); 
			copyArg(msg,"detectorVersion",params,undefined,false); 
			copyArg(msg,"iamRoleArn",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createBatchPredictionJob(params,cb);
		}

		
		service.CreateDetectorVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"detectorId",params,undefined,false); 
			copyArg(n,"rules",params,undefined,true); 
			
			copyArg(msg,"detectorId",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"externalModelEndpoints",params,undefined,true); 
			copyArg(msg,"rules",params,undefined,true); 
			copyArg(msg,"modelVersions",params,undefined,true); 
			copyArg(msg,"ruleExecutionMode",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createDetectorVersion(params,cb);
		}

		
		service.CreateModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"modelId",params,undefined,false); 
			copyArg(n,"modelType",params,undefined,false); 
			copyArg(n,"eventTypeName",params,undefined,false); 
			
			copyArg(msg,"modelId",params,undefined,false); 
			copyArg(msg,"modelType",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"eventTypeName",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createModel(params,cb);
		}

		
		service.CreateModelVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"modelId",params,undefined,false); 
			copyArg(n,"modelType",params,undefined,false); 
			copyArg(n,"trainingDataSource",params,undefined,false); 
			copyArg(n,"trainingDataSchema",params,undefined,true); 
			
			copyArg(msg,"modelId",params,undefined,false); 
			copyArg(msg,"modelType",params,undefined,false); 
			copyArg(msg,"trainingDataSource",params,undefined,false); 
			copyArg(msg,"trainingDataSchema",params,undefined,true); 
			copyArg(msg,"externalEventsDetail",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createModelVersion(params,cb);
		}

		
		service.CreateRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ruleId",params,undefined,false); 
			copyArg(n,"detectorId",params,undefined,false); 
			copyArg(n,"expression",params,undefined,true); 
			copyArg(n,"language",params,undefined,false); 
			copyArg(n,"outcomes",params,undefined,true); 
			
			copyArg(msg,"ruleId",params,undefined,false); 
			copyArg(msg,"detectorId",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"expression",params,undefined,true); 
			copyArg(msg,"language",params,undefined,false); 
			copyArg(msg,"outcomes",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createRule(params,cb);
		}

		
		service.CreateVariable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"dataType",params,undefined,false); 
			copyArg(n,"dataSource",params,undefined,false); 
			copyArg(n,"defaultValue",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"dataType",params,undefined,false); 
			copyArg(msg,"dataSource",params,undefined,false); 
			copyArg(msg,"defaultValue",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"variableType",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createVariable(params,cb);
		}

		
		service.DeleteBatchPredictionJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params,undefined,false); 
			
			copyArg(msg,"jobId",params,undefined,false); 
			

			svc.deleteBatchPredictionJob(params,cb);
		}

		
		service.DeleteDetector=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"detectorId",params,undefined,false); 
			
			copyArg(msg,"detectorId",params,undefined,false); 
			

			svc.deleteDetector(params,cb);
		}

		
		service.DeleteDetectorVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"detectorId",params,undefined,false); 
			copyArg(n,"detectorVersionId",params,undefined,false); 
			
			copyArg(msg,"detectorId",params,undefined,false); 
			copyArg(msg,"detectorVersionId",params,undefined,false); 
			

			svc.deleteDetectorVersion(params,cb);
		}

		
		service.DeleteEntityType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			

			svc.deleteEntityType(params,cb);
		}

		
		service.DeleteEvent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"eventId",params,undefined,false); 
			copyArg(n,"eventTypeName",params,undefined,false); 
			
			copyArg(msg,"eventId",params,undefined,false); 
			copyArg(msg,"eventTypeName",params,undefined,false); 
			

			svc.deleteEvent(params,cb);
		}

		
		service.DeleteEventType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			

			svc.deleteEventType(params,cb);
		}

		
		service.DeleteExternalModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"modelEndpoint",params,undefined,false); 
			
			copyArg(msg,"modelEndpoint",params,undefined,false); 
			

			svc.deleteExternalModel(params,cb);
		}

		
		service.DeleteLabel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			

			svc.deleteLabel(params,cb);
		}

		
		service.DeleteModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"modelId",params,undefined,false); 
			copyArg(n,"modelType",params,undefined,false); 
			
			copyArg(msg,"modelId",params,undefined,false); 
			copyArg(msg,"modelType",params,undefined,false); 
			

			svc.deleteModel(params,cb);
		}

		
		service.DeleteModelVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"modelId",params,undefined,false); 
			copyArg(n,"modelType",params,undefined,false); 
			copyArg(n,"modelVersionNumber",params,undefined,false); 
			
			copyArg(msg,"modelId",params,undefined,false); 
			copyArg(msg,"modelType",params,undefined,false); 
			copyArg(msg,"modelVersionNumber",params,undefined,false); 
			

			svc.deleteModelVersion(params,cb);
		}

		
		service.DeleteOutcome=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			

			svc.deleteOutcome(params,cb);
		}

		
		service.DeleteRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"rule",params,undefined,true); 
			
			copyArg(msg,"rule",params,undefined,true); 
			

			svc.deleteRule(params,cb);
		}

		
		service.DeleteVariable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			

			svc.deleteVariable(params,cb);
		}

		
		service.DescribeDetector=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"detectorId",params,undefined,false); 
			
			copyArg(msg,"detectorId",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.describeDetector(params,cb);
		}

		
		service.DescribeModelVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"modelId",params,undefined,false); 
			copyArg(msg,"modelVersionNumber",params,undefined,false); 
			copyArg(msg,"modelType",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.describeModelVersions(params,cb);
		}

		
		service.GetBatchPredictionJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"jobId",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.getBatchPredictionJobs(params,cb);
		}

		
		service.GetDetectorVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"detectorId",params,undefined,false); 
			copyArg(n,"detectorVersionId",params,undefined,false); 
			
			copyArg(msg,"detectorId",params,undefined,false); 
			copyArg(msg,"detectorVersionId",params,undefined,false); 
			

			svc.getDetectorVersion(params,cb);
		}

		
		service.GetDetectors=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"detectorId",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.getDetectors(params,cb);
		}

		
		service.GetEntityTypes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.getEntityTypes(params,cb);
		}

		
		service.GetEventPrediction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"detectorId",params,undefined,false); 
			copyArg(n,"eventId",params,undefined,false); 
			copyArg(n,"eventTypeName",params,undefined,false); 
			copyArg(n,"entities",params,undefined,false); 
			copyArg(n,"eventTimestamp",params,undefined,false); 
			copyArg(n,"eventVariables",params,undefined,false); 
			
			copyArg(msg,"detectorId",params,undefined,false); 
			copyArg(msg,"detectorVersionId",params,undefined,false); 
			copyArg(msg,"eventId",params,undefined,false); 
			copyArg(msg,"eventTypeName",params,undefined,false); 
			copyArg(msg,"entities",params,undefined,false); 
			copyArg(msg,"eventTimestamp",params,undefined,false); 
			copyArg(msg,"eventVariables",params,undefined,false); 
			copyArg(msg,"externalModelEndpointDataBlobs",params,undefined,false); 
			

			svc.getEventPrediction(params,cb);
		}

		
		service.GetEventTypes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.getEventTypes(params,cb);
		}

		
		service.GetExternalModels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"modelEndpoint",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.getExternalModels(params,cb);
		}

		
		service.GetKMSEncryptionKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getKMSEncryptionKey(params,cb);
		}

		
		service.GetLabels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.getLabels(params,cb);
		}

		
		service.GetModelVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"modelId",params,undefined,false); 
			copyArg(n,"modelType",params,undefined,false); 
			copyArg(n,"modelVersionNumber",params,undefined,false); 
			
			copyArg(msg,"modelId",params,undefined,false); 
			copyArg(msg,"modelType",params,undefined,false); 
			copyArg(msg,"modelVersionNumber",params,undefined,false); 
			

			svc.getModelVersion(params,cb);
		}

		
		service.GetModels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"modelId",params,undefined,false); 
			copyArg(msg,"modelType",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.getModels(params,cb);
		}

		
		service.GetOutcomes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.getOutcomes(params,cb);
		}

		
		service.GetRules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"detectorId",params,undefined,false); 
			
			copyArg(msg,"ruleId",params,undefined,false); 
			copyArg(msg,"detectorId",params,undefined,false); 
			copyArg(msg,"ruleVersion",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.getRules(params,cb);
		}

		
		service.GetVariables=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.getVariables(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceARN",params,undefined,false); 
			
			copyArg(msg,"resourceARN",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutDetector=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"detectorId",params,undefined,false); 
			copyArg(n,"eventTypeName",params,undefined,false); 
			
			copyArg(msg,"detectorId",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"eventTypeName",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.putDetector(params,cb);
		}

		
		service.PutEntityType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.putEntityType(params,cb);
		}

		
		service.PutEventType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"eventVariables",params,undefined,true); 
			copyArg(n,"entityTypes",params,undefined,true); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"eventVariables",params,undefined,true); 
			copyArg(msg,"labels",params,undefined,true); 
			copyArg(msg,"entityTypes",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.putEventType(params,cb);
		}

		
		service.PutExternalModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"modelEndpoint",params,undefined,false); 
			copyArg(n,"modelSource",params,undefined,false); 
			copyArg(n,"invokeModelEndpointRoleArn",params,undefined,false); 
			copyArg(n,"inputConfiguration",params,undefined,true); 
			copyArg(n,"outputConfiguration",params,undefined,true); 
			copyArg(n,"modelEndpointStatus",params,undefined,false); 
			
			copyArg(msg,"modelEndpoint",params,undefined,false); 
			copyArg(msg,"modelSource",params,undefined,false); 
			copyArg(msg,"invokeModelEndpointRoleArn",params,undefined,false); 
			copyArg(msg,"inputConfiguration",params,undefined,true); 
			copyArg(msg,"outputConfiguration",params,undefined,true); 
			copyArg(msg,"modelEndpointStatus",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.putExternalModel(params,cb);
		}

		
		service.PutKMSEncryptionKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"kmsEncryptionKeyArn",params,undefined,false); 
			
			copyArg(msg,"kmsEncryptionKeyArn",params,undefined,false); 
			

			svc.putKMSEncryptionKey(params,cb);
		}

		
		service.PutLabel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.putLabel(params,cb);
		}

		
		service.PutOutcome=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.putOutcome(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceARN",params,undefined,false); 
			copyArg(n,"tags",params,undefined,true); 
			
			copyArg(msg,"resourceARN",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceARN",params,undefined,false); 
			copyArg(n,"tagKeys",params,undefined,false); 
			
			copyArg(msg,"resourceARN",params,undefined,false); 
			copyArg(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateDetectorVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"detectorId",params,undefined,false); 
			copyArg(n,"detectorVersionId",params,undefined,false); 
			copyArg(n,"externalModelEndpoints",params,undefined,true); 
			copyArg(n,"rules",params,undefined,true); 
			
			copyArg(msg,"detectorId",params,undefined,false); 
			copyArg(msg,"detectorVersionId",params,undefined,false); 
			copyArg(msg,"externalModelEndpoints",params,undefined,true); 
			copyArg(msg,"rules",params,undefined,true); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"modelVersions",params,undefined,true); 
			copyArg(msg,"ruleExecutionMode",params,undefined,false); 
			

			svc.updateDetectorVersion(params,cb);
		}

		
		service.UpdateDetectorVersionMetadata=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"detectorId",params,undefined,false); 
			copyArg(n,"detectorVersionId",params,undefined,false); 
			copyArg(n,"description",params,undefined,false); 
			
			copyArg(msg,"detectorId",params,undefined,false); 
			copyArg(msg,"detectorVersionId",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			

			svc.updateDetectorVersionMetadata(params,cb);
		}

		
		service.UpdateDetectorVersionStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"detectorId",params,undefined,false); 
			copyArg(n,"detectorVersionId",params,undefined,false); 
			copyArg(n,"status",params,undefined,false); 
			
			copyArg(msg,"detectorId",params,undefined,false); 
			copyArg(msg,"detectorVersionId",params,undefined,false); 
			copyArg(msg,"status",params,undefined,false); 
			

			svc.updateDetectorVersionStatus(params,cb);
		}

		
		service.UpdateModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"modelId",params,undefined,false); 
			copyArg(n,"modelType",params,undefined,false); 
			
			copyArg(msg,"modelId",params,undefined,false); 
			copyArg(msg,"modelType",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			

			svc.updateModel(params,cb);
		}

		
		service.UpdateModelVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"modelId",params,undefined,false); 
			copyArg(n,"modelType",params,undefined,false); 
			copyArg(n,"majorVersionNumber",params,undefined,false); 
			
			copyArg(msg,"modelId",params,undefined,false); 
			copyArg(msg,"modelType",params,undefined,false); 
			copyArg(msg,"majorVersionNumber",params,undefined,false); 
			copyArg(msg,"externalEventsDetail",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.updateModelVersion(params,cb);
		}

		
		service.UpdateModelVersionStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"modelId",params,undefined,false); 
			copyArg(n,"modelType",params,undefined,false); 
			copyArg(n,"modelVersionNumber",params,undefined,false); 
			copyArg(n,"status",params,undefined,false); 
			
			copyArg(msg,"modelId",params,undefined,false); 
			copyArg(msg,"modelType",params,undefined,false); 
			copyArg(msg,"modelVersionNumber",params,undefined,false); 
			copyArg(msg,"status",params,undefined,false); 
			

			svc.updateModelVersionStatus(params,cb);
		}

		
		service.UpdateRuleMetadata=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"rule",params,undefined,true); 
			copyArg(n,"description",params,undefined,false); 
			
			copyArg(msg,"rule",params,undefined,true); 
			copyArg(msg,"description",params,undefined,false); 
			

			svc.updateRuleMetadata(params,cb);
		}

		
		service.UpdateRuleVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"rule",params,undefined,true); 
			copyArg(n,"expression",params,undefined,true); 
			copyArg(n,"language",params,undefined,false); 
			copyArg(n,"outcomes",params,undefined,true); 
			
			copyArg(msg,"rule",params,undefined,true); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"expression",params,undefined,true); 
			copyArg(msg,"language",params,undefined,false); 
			copyArg(msg,"outcomes",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.updateRuleVersion(params,cb);
		}

		
		service.UpdateVariable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"defaultValue",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"variableType",params,undefined,false); 
			

			svc.updateVariable(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS FraudDetector", AmazonAPINode);

};
