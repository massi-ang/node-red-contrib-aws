
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

		var awsService = new AWS.FraudDetector( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.FraudDetector(msg.AWSConfig) : awsService;

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

		
		service.BatchCreateVariable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"variableEntries",params,undefined,false); 
			
			copyArgs(n,"variableEntries",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"variableEntries",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.batchCreateVariable(params,cb);
		}

		
		service.BatchGetVariable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"names",params,undefined,false); 
			
			copyArgs(n,"names",params,undefined,false); 
			
			copyArgs(msg,"names",params,undefined,false); 
			

			svc.batchGetVariable(params,cb);
		}

		
		service.CancelBatchPredictionJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(msg,"jobId",params,undefined,false); 
			

			svc.cancelBatchPredictionJob(params,cb);
		}

		
		service.CreateBatchPredictionJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"inputPath",params,undefined,false); 
			copyArgs(n,"outputPath",params,undefined,false); 
			copyArgs(n,"eventTypeName",params,undefined,false); 
			copyArgs(n,"detectorName",params,undefined,false); 
			copyArgs(n,"iamRoleArn",params,undefined,false); 
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"inputPath",params,undefined,false); 
			copyArgs(n,"outputPath",params,undefined,false); 
			copyArgs(n,"eventTypeName",params,undefined,false); 
			copyArgs(n,"detectorName",params,undefined,false); 
			copyArgs(n,"detectorVersion",params,undefined,false); 
			copyArgs(n,"iamRoleArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"jobId",params,undefined,false); 
			copyArgs(msg,"inputPath",params,undefined,false); 
			copyArgs(msg,"outputPath",params,undefined,false); 
			copyArgs(msg,"eventTypeName",params,undefined,false); 
			copyArgs(msg,"detectorName",params,undefined,false); 
			copyArgs(msg,"detectorVersion",params,undefined,false); 
			copyArgs(msg,"iamRoleArn",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createBatchPredictionJob(params,cb);
		}

		
		service.CreateDetectorVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"detectorId",params,undefined,false); 
			copyArgs(n,"rules",params,undefined,true); 
			
			copyArgs(n,"detectorId",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"externalModelEndpoints",params,undefined,true); 
			copyArgs(n,"rules",params,undefined,true); 
			copyArgs(n,"modelVersions",params,undefined,true); 
			copyArgs(n,"ruleExecutionMode",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"detectorId",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"externalModelEndpoints",params,undefined,true); 
			copyArgs(msg,"rules",params,undefined,true); 
			copyArgs(msg,"modelVersions",params,undefined,true); 
			copyArgs(msg,"ruleExecutionMode",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createDetectorVersion(params,cb);
		}

		
		service.CreateModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"modelId",params,undefined,false); 
			copyArgs(n,"modelType",params,undefined,false); 
			copyArgs(n,"eventTypeName",params,undefined,false); 
			
			copyArgs(n,"modelId",params,undefined,false); 
			copyArgs(n,"modelType",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"eventTypeName",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"modelId",params,undefined,false); 
			copyArgs(msg,"modelType",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"eventTypeName",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createModel(params,cb);
		}

		
		service.CreateModelVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"modelId",params,undefined,false); 
			copyArgs(n,"modelType",params,undefined,false); 
			copyArgs(n,"trainingDataSource",params,undefined,false); 
			copyArgs(n,"trainingDataSchema",params,undefined,true); 
			
			copyArgs(n,"modelId",params,undefined,false); 
			copyArgs(n,"modelType",params,undefined,false); 
			copyArgs(n,"trainingDataSource",params,undefined,false); 
			copyArgs(n,"trainingDataSchema",params,undefined,true); 
			copyArgs(n,"externalEventsDetail",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"modelId",params,undefined,false); 
			copyArgs(msg,"modelType",params,undefined,false); 
			copyArgs(msg,"trainingDataSource",params,undefined,false); 
			copyArgs(msg,"trainingDataSchema",params,undefined,true); 
			copyArgs(msg,"externalEventsDetail",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createModelVersion(params,cb);
		}

		
		service.CreateRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ruleId",params,undefined,false); 
			copyArgs(n,"detectorId",params,undefined,false); 
			copyArgs(n,"expression",params,undefined,true); 
			copyArgs(n,"language",params,undefined,false); 
			copyArgs(n,"outcomes",params,undefined,true); 
			
			copyArgs(n,"ruleId",params,undefined,false); 
			copyArgs(n,"detectorId",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"expression",params,undefined,true); 
			copyArgs(n,"language",params,undefined,false); 
			copyArgs(n,"outcomes",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"ruleId",params,undefined,false); 
			copyArgs(msg,"detectorId",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"expression",params,undefined,true); 
			copyArgs(msg,"language",params,undefined,false); 
			copyArgs(msg,"outcomes",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createRule(params,cb);
		}

		
		service.CreateVariable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"dataType",params,undefined,false); 
			copyArgs(n,"dataSource",params,undefined,false); 
			copyArgs(n,"defaultValue",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"dataType",params,undefined,false); 
			copyArgs(n,"dataSource",params,undefined,false); 
			copyArgs(n,"defaultValue",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"variableType",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"dataType",params,undefined,false); 
			copyArgs(msg,"dataSource",params,undefined,false); 
			copyArgs(msg,"defaultValue",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"variableType",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createVariable(params,cb);
		}

		
		service.DeleteBatchPredictionJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(msg,"jobId",params,undefined,false); 
			

			svc.deleteBatchPredictionJob(params,cb);
		}

		
		service.DeleteDetector=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"detectorId",params,undefined,false); 
			
			copyArgs(n,"detectorId",params,undefined,false); 
			
			copyArgs(msg,"detectorId",params,undefined,false); 
			

			svc.deleteDetector(params,cb);
		}

		
		service.DeleteDetectorVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"detectorId",params,undefined,false); 
			copyArgs(n,"detectorVersionId",params,undefined,false); 
			
			copyArgs(n,"detectorId",params,undefined,false); 
			copyArgs(n,"detectorVersionId",params,undefined,false); 
			
			copyArgs(msg,"detectorId",params,undefined,false); 
			copyArgs(msg,"detectorVersionId",params,undefined,false); 
			

			svc.deleteDetectorVersion(params,cb);
		}

		
		service.DeleteEntityType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.deleteEntityType(params,cb);
		}

		
		service.DeleteEvent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"eventId",params,undefined,false); 
			copyArgs(n,"eventTypeName",params,undefined,false); 
			
			copyArgs(n,"eventId",params,undefined,false); 
			copyArgs(n,"eventTypeName",params,undefined,false); 
			
			copyArgs(msg,"eventId",params,undefined,false); 
			copyArgs(msg,"eventTypeName",params,undefined,false); 
			

			svc.deleteEvent(params,cb);
		}

		
		service.DeleteEventType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.deleteEventType(params,cb);
		}

		
		service.DeleteExternalModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"modelEndpoint",params,undefined,false); 
			
			copyArgs(n,"modelEndpoint",params,undefined,false); 
			
			copyArgs(msg,"modelEndpoint",params,undefined,false); 
			

			svc.deleteExternalModel(params,cb);
		}

		
		service.DeleteLabel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.deleteLabel(params,cb);
		}

		
		service.DeleteModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"modelId",params,undefined,false); 
			copyArgs(n,"modelType",params,undefined,false); 
			
			copyArgs(n,"modelId",params,undefined,false); 
			copyArgs(n,"modelType",params,undefined,false); 
			
			copyArgs(msg,"modelId",params,undefined,false); 
			copyArgs(msg,"modelType",params,undefined,false); 
			

			svc.deleteModel(params,cb);
		}

		
		service.DeleteModelVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"modelId",params,undefined,false); 
			copyArgs(n,"modelType",params,undefined,false); 
			copyArgs(n,"modelVersionNumber",params,undefined,false); 
			
			copyArgs(n,"modelId",params,undefined,false); 
			copyArgs(n,"modelType",params,undefined,false); 
			copyArgs(n,"modelVersionNumber",params,undefined,false); 
			
			copyArgs(msg,"modelId",params,undefined,false); 
			copyArgs(msg,"modelType",params,undefined,false); 
			copyArgs(msg,"modelVersionNumber",params,undefined,false); 
			

			svc.deleteModelVersion(params,cb);
		}

		
		service.DeleteOutcome=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.deleteOutcome(params,cb);
		}

		
		service.DeleteRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"rule",params,undefined,true); 
			
			copyArgs(n,"rule",params,undefined,true); 
			
			copyArgs(msg,"rule",params,undefined,true); 
			

			svc.deleteRule(params,cb);
		}

		
		service.DeleteVariable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.deleteVariable(params,cb);
		}

		
		service.DescribeDetector=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"detectorId",params,undefined,false); 
			
			copyArgs(n,"detectorId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"detectorId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.describeDetector(params,cb);
		}

		
		service.DescribeModelVersions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"modelId",params,undefined,false); 
			copyArgs(n,"modelVersionNumber",params,undefined,false); 
			copyArgs(n,"modelType",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"modelId",params,undefined,false); 
			copyArgs(msg,"modelVersionNumber",params,undefined,false); 
			copyArgs(msg,"modelType",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.describeModelVersions(params,cb);
		}

		
		service.GetBatchPredictionJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"jobId",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.getBatchPredictionJobs(params,cb);
		}

		
		service.GetDetectorVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"detectorId",params,undefined,false); 
			copyArgs(n,"detectorVersionId",params,undefined,false); 
			
			copyArgs(n,"detectorId",params,undefined,false); 
			copyArgs(n,"detectorVersionId",params,undefined,false); 
			
			copyArgs(msg,"detectorId",params,undefined,false); 
			copyArgs(msg,"detectorVersionId",params,undefined,false); 
			

			svc.getDetectorVersion(params,cb);
		}

		
		service.GetDetectors=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"detectorId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"detectorId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getDetectors(params,cb);
		}

		
		service.GetEntityTypes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getEntityTypes(params,cb);
		}

		
		service.GetEventPrediction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"detectorId",params,undefined,false); 
			copyArgs(n,"eventId",params,undefined,false); 
			copyArgs(n,"eventTypeName",params,undefined,false); 
			copyArgs(n,"entities",params,undefined,false); 
			copyArgs(n,"eventTimestamp",params,undefined,false); 
			copyArgs(n,"eventVariables",params,undefined,false); 
			
			copyArgs(n,"detectorId",params,undefined,false); 
			copyArgs(n,"detectorVersionId",params,undefined,false); 
			copyArgs(n,"eventId",params,undefined,false); 
			copyArgs(n,"eventTypeName",params,undefined,false); 
			copyArgs(n,"entities",params,undefined,false); 
			copyArgs(n,"eventTimestamp",params,undefined,false); 
			copyArgs(n,"eventVariables",params,undefined,false); 
			copyArgs(n,"externalModelEndpointDataBlobs",params,undefined,false); 
			
			copyArgs(msg,"detectorId",params,undefined,false); 
			copyArgs(msg,"detectorVersionId",params,undefined,false); 
			copyArgs(msg,"eventId",params,undefined,false); 
			copyArgs(msg,"eventTypeName",params,undefined,false); 
			copyArgs(msg,"entities",params,undefined,false); 
			copyArgs(msg,"eventTimestamp",params,undefined,false); 
			copyArgs(msg,"eventVariables",params,undefined,false); 
			copyArgs(msg,"externalModelEndpointDataBlobs",params,undefined,false); 
			

			svc.getEventPrediction(params,cb);
		}

		
		service.GetEventTypes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getEventTypes(params,cb);
		}

		
		service.GetExternalModels=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"modelEndpoint",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"modelEndpoint",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getExternalModels(params,cb);
		}

		
		service.GetKMSEncryptionKey=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getKMSEncryptionKey(params,cb);
		}

		
		service.GetLabels=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getLabels(params,cb);
		}

		
		service.GetModelVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"modelId",params,undefined,false); 
			copyArgs(n,"modelType",params,undefined,false); 
			copyArgs(n,"modelVersionNumber",params,undefined,false); 
			
			copyArgs(n,"modelId",params,undefined,false); 
			copyArgs(n,"modelType",params,undefined,false); 
			copyArgs(n,"modelVersionNumber",params,undefined,false); 
			
			copyArgs(msg,"modelId",params,undefined,false); 
			copyArgs(msg,"modelType",params,undefined,false); 
			copyArgs(msg,"modelVersionNumber",params,undefined,false); 
			

			svc.getModelVersion(params,cb);
		}

		
		service.GetModels=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"modelId",params,undefined,false); 
			copyArgs(n,"modelType",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"modelId",params,undefined,false); 
			copyArgs(msg,"modelType",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getModels(params,cb);
		}

		
		service.GetOutcomes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getOutcomes(params,cb);
		}

		
		service.GetRules=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"detectorId",params,undefined,false); 
			
			copyArgs(n,"ruleId",params,undefined,false); 
			copyArgs(n,"detectorId",params,undefined,false); 
			copyArgs(n,"ruleVersion",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"ruleId",params,undefined,false); 
			copyArgs(msg,"detectorId",params,undefined,false); 
			copyArgs(msg,"ruleVersion",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getRules(params,cb);
		}

		
		service.GetVariables=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getVariables(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceARN",params,undefined,false); 
			
			copyArgs(n,"resourceARN",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"resourceARN",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutDetector=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"detectorId",params,undefined,false); 
			copyArgs(n,"eventTypeName",params,undefined,false); 
			
			copyArgs(n,"detectorId",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"eventTypeName",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"detectorId",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"eventTypeName",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.putDetector(params,cb);
		}

		
		service.PutEntityType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.putEntityType(params,cb);
		}

		
		service.PutEventType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"eventVariables",params,undefined,true); 
			copyArgs(n,"entityTypes",params,undefined,true); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"eventVariables",params,undefined,true); 
			copyArgs(n,"labels",params,undefined,true); 
			copyArgs(n,"entityTypes",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"eventVariables",params,undefined,true); 
			copyArgs(msg,"labels",params,undefined,true); 
			copyArgs(msg,"entityTypes",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.putEventType(params,cb);
		}

		
		service.PutExternalModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"modelEndpoint",params,undefined,false); 
			copyArgs(n,"modelSource",params,undefined,false); 
			copyArgs(n,"invokeModelEndpointRoleArn",params,undefined,false); 
			copyArgs(n,"inputConfiguration",params,undefined,true); 
			copyArgs(n,"outputConfiguration",params,undefined,true); 
			copyArgs(n,"modelEndpointStatus",params,undefined,false); 
			
			copyArgs(n,"modelEndpoint",params,undefined,false); 
			copyArgs(n,"modelSource",params,undefined,false); 
			copyArgs(n,"invokeModelEndpointRoleArn",params,undefined,false); 
			copyArgs(n,"inputConfiguration",params,undefined,true); 
			copyArgs(n,"outputConfiguration",params,undefined,true); 
			copyArgs(n,"modelEndpointStatus",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"modelEndpoint",params,undefined,false); 
			copyArgs(msg,"modelSource",params,undefined,false); 
			copyArgs(msg,"invokeModelEndpointRoleArn",params,undefined,false); 
			copyArgs(msg,"inputConfiguration",params,undefined,true); 
			copyArgs(msg,"outputConfiguration",params,undefined,true); 
			copyArgs(msg,"modelEndpointStatus",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.putExternalModel(params,cb);
		}

		
		service.PutKMSEncryptionKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"kmsEncryptionKeyArn",params,undefined,false); 
			
			copyArgs(n,"kmsEncryptionKeyArn",params,undefined,false); 
			
			copyArgs(msg,"kmsEncryptionKeyArn",params,undefined,false); 
			

			svc.putKMSEncryptionKey(params,cb);
		}

		
		service.PutLabel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.putLabel(params,cb);
		}

		
		service.PutOutcome=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.putOutcome(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceARN",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(n,"resourceARN",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"resourceARN",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceARN",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(n,"resourceARN",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(msg,"resourceARN",params,undefined,false); 
			copyArgs(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateDetectorVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"detectorId",params,undefined,false); 
			copyArgs(n,"detectorVersionId",params,undefined,false); 
			copyArgs(n,"externalModelEndpoints",params,undefined,true); 
			copyArgs(n,"rules",params,undefined,true); 
			
			copyArgs(n,"detectorId",params,undefined,false); 
			copyArgs(n,"detectorVersionId",params,undefined,false); 
			copyArgs(n,"externalModelEndpoints",params,undefined,true); 
			copyArgs(n,"rules",params,undefined,true); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"modelVersions",params,undefined,true); 
			copyArgs(n,"ruleExecutionMode",params,undefined,false); 
			
			copyArgs(msg,"detectorId",params,undefined,false); 
			copyArgs(msg,"detectorVersionId",params,undefined,false); 
			copyArgs(msg,"externalModelEndpoints",params,undefined,true); 
			copyArgs(msg,"rules",params,undefined,true); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"modelVersions",params,undefined,true); 
			copyArgs(msg,"ruleExecutionMode",params,undefined,false); 
			

			svc.updateDetectorVersion(params,cb);
		}

		
		service.UpdateDetectorVersionMetadata=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"detectorId",params,undefined,false); 
			copyArgs(n,"detectorVersionId",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			
			copyArgs(n,"detectorId",params,undefined,false); 
			copyArgs(n,"detectorVersionId",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			
			copyArgs(msg,"detectorId",params,undefined,false); 
			copyArgs(msg,"detectorVersionId",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			

			svc.updateDetectorVersionMetadata(params,cb);
		}

		
		service.UpdateDetectorVersionStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"detectorId",params,undefined,false); 
			copyArgs(n,"detectorVersionId",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			
			copyArgs(n,"detectorId",params,undefined,false); 
			copyArgs(n,"detectorVersionId",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			
			copyArgs(msg,"detectorId",params,undefined,false); 
			copyArgs(msg,"detectorVersionId",params,undefined,false); 
			copyArgs(msg,"status",params,undefined,false); 
			

			svc.updateDetectorVersionStatus(params,cb);
		}

		
		service.UpdateModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"modelId",params,undefined,false); 
			copyArgs(n,"modelType",params,undefined,false); 
			
			copyArgs(n,"modelId",params,undefined,false); 
			copyArgs(n,"modelType",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			
			copyArgs(msg,"modelId",params,undefined,false); 
			copyArgs(msg,"modelType",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			

			svc.updateModel(params,cb);
		}

		
		service.UpdateModelVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"modelId",params,undefined,false); 
			copyArgs(n,"modelType",params,undefined,false); 
			copyArgs(n,"majorVersionNumber",params,undefined,false); 
			
			copyArgs(n,"modelId",params,undefined,false); 
			copyArgs(n,"modelType",params,undefined,false); 
			copyArgs(n,"majorVersionNumber",params,undefined,false); 
			copyArgs(n,"externalEventsDetail",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"modelId",params,undefined,false); 
			copyArgs(msg,"modelType",params,undefined,false); 
			copyArgs(msg,"majorVersionNumber",params,undefined,false); 
			copyArgs(msg,"externalEventsDetail",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.updateModelVersion(params,cb);
		}

		
		service.UpdateModelVersionStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"modelId",params,undefined,false); 
			copyArgs(n,"modelType",params,undefined,false); 
			copyArgs(n,"modelVersionNumber",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			
			copyArgs(n,"modelId",params,undefined,false); 
			copyArgs(n,"modelType",params,undefined,false); 
			copyArgs(n,"modelVersionNumber",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			
			copyArgs(msg,"modelId",params,undefined,false); 
			copyArgs(msg,"modelType",params,undefined,false); 
			copyArgs(msg,"modelVersionNumber",params,undefined,false); 
			copyArgs(msg,"status",params,undefined,false); 
			

			svc.updateModelVersionStatus(params,cb);
		}

		
		service.UpdateRuleMetadata=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"rule",params,undefined,true); 
			copyArgs(n,"description",params,undefined,false); 
			
			copyArgs(n,"rule",params,undefined,true); 
			copyArgs(n,"description",params,undefined,false); 
			
			copyArgs(msg,"rule",params,undefined,true); 
			copyArgs(msg,"description",params,undefined,false); 
			

			svc.updateRuleMetadata(params,cb);
		}

		
		service.UpdateRuleVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"rule",params,undefined,true); 
			copyArgs(n,"expression",params,undefined,true); 
			copyArgs(n,"language",params,undefined,false); 
			copyArgs(n,"outcomes",params,undefined,true); 
			
			copyArgs(n,"rule",params,undefined,true); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"expression",params,undefined,true); 
			copyArgs(n,"language",params,undefined,false); 
			copyArgs(n,"outcomes",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"rule",params,undefined,true); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"expression",params,undefined,true); 
			copyArgs(msg,"language",params,undefined,false); 
			copyArgs(msg,"outcomes",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.updateRuleVersion(params,cb);
		}

		
		service.UpdateVariable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"defaultValue",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"variableType",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"defaultValue",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"variableType",params,undefined,false); 
			

			svc.updateVariable(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS FraudDetector", AmazonAPINode);

};
