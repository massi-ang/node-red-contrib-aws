
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

		var awsService = new AWS.MachineLearning( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.MachineLearning(msg.AWSConfig) : awsService;

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
		
			service.AddTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"ResourceType",params,undefined,false); 
			

			svc.addTags(params,cb);
		}
			service.CreateBatchPrediction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BatchPredictionId",params,undefined,false); 
			copyArgs(n,"MLModelId",params,undefined,false); 
			copyArgs(n,"BatchPredictionDataSourceId",params,undefined,false); 
			copyArgs(n,"OutputUri",params,undefined,false); 
			
			copyArgs(n,"BatchPredictionId",params,undefined,false); 
			copyArgs(n,"BatchPredictionName",params,undefined,false); 
			copyArgs(n,"MLModelId",params,undefined,false); 
			copyArgs(n,"BatchPredictionDataSourceId",params,undefined,false); 
			copyArgs(n,"OutputUri",params,undefined,false); 
			
			copyArgs(msg,"BatchPredictionId",params,undefined,false); 
			copyArgs(msg,"BatchPredictionName",params,undefined,false); 
			copyArgs(msg,"MLModelId",params,undefined,false); 
			copyArgs(msg,"BatchPredictionDataSourceId",params,undefined,false); 
			copyArgs(msg,"OutputUri",params,undefined,false); 
			

			svc.createBatchPrediction(params,cb);
		}
			service.CreateDataSourceFromRDS=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DataSourceId",params,undefined,false); 
			copyArgs(n,"RDSData",params,undefined,false); 
			copyArgs(n,"RoleARN",params,undefined,false); 
			
			copyArgs(n,"DataSourceId",params,undefined,false); 
			copyArgs(n,"DataSourceName",params,undefined,false); 
			copyArgs(n,"RDSData",params,undefined,false); 
			copyArgs(n,"RoleARN",params,undefined,false); 
			copyArgs(Boolean(n),"ComputeStatistics",params,undefined,false); 
			
			copyArgs(msg,"DataSourceId",params,undefined,false); 
			copyArgs(msg,"DataSourceName",params,undefined,false); 
			copyArgs(msg,"RDSData",params,undefined,false); 
			copyArgs(msg,"RoleARN",params,undefined,false); 
			copyArgs(msg,"ComputeStatistics",params,undefined,false); 
			

			svc.createDataSourceFromRDS(params,cb);
		}
			service.CreateDataSourceFromRedshift=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DataSourceId",params,undefined,false); 
			copyArgs(n,"DataSpec",params,undefined,false); 
			copyArgs(n,"RoleARN",params,undefined,false); 
			
			copyArgs(n,"DataSourceId",params,undefined,false); 
			copyArgs(n,"DataSourceName",params,undefined,false); 
			copyArgs(n,"DataSpec",params,undefined,false); 
			copyArgs(n,"RoleARN",params,undefined,false); 
			copyArgs(Boolean(n),"ComputeStatistics",params,undefined,false); 
			
			copyArgs(msg,"DataSourceId",params,undefined,false); 
			copyArgs(msg,"DataSourceName",params,undefined,false); 
			copyArgs(msg,"DataSpec",params,undefined,false); 
			copyArgs(msg,"RoleARN",params,undefined,false); 
			copyArgs(msg,"ComputeStatistics",params,undefined,false); 
			

			svc.createDataSourceFromRedshift(params,cb);
		}
			service.CreateDataSourceFromS3=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DataSourceId",params,undefined,false); 
			copyArgs(n,"DataSpec",params,undefined,false); 
			
			copyArgs(n,"DataSourceId",params,undefined,false); 
			copyArgs(n,"DataSourceName",params,undefined,false); 
			copyArgs(n,"DataSpec",params,undefined,false); 
			copyArgs(Boolean(n),"ComputeStatistics",params,undefined,false); 
			
			copyArgs(msg,"DataSourceId",params,undefined,false); 
			copyArgs(msg,"DataSourceName",params,undefined,false); 
			copyArgs(msg,"DataSpec",params,undefined,false); 
			copyArgs(msg,"ComputeStatistics",params,undefined,false); 
			

			svc.createDataSourceFromS3(params,cb);
		}
			service.CreateEvaluation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EvaluationId",params,undefined,false); 
			copyArgs(n,"MLModelId",params,undefined,false); 
			copyArgs(n,"EvaluationDataSourceId",params,undefined,false); 
			
			copyArgs(n,"EvaluationId",params,undefined,false); 
			copyArgs(n,"EvaluationName",params,undefined,false); 
			copyArgs(n,"MLModelId",params,undefined,false); 
			copyArgs(n,"EvaluationDataSourceId",params,undefined,false); 
			
			copyArgs(msg,"EvaluationId",params,undefined,false); 
			copyArgs(msg,"EvaluationName",params,undefined,false); 
			copyArgs(msg,"MLModelId",params,undefined,false); 
			copyArgs(msg,"EvaluationDataSourceId",params,undefined,false); 
			

			svc.createEvaluation(params,cb);
		}
			service.CreateMLModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MLModelId",params,undefined,false); 
			copyArgs(n,"MLModelType",params,undefined,false); 
			copyArgs(n,"TrainingDataSourceId",params,undefined,false); 
			
			copyArgs(n,"MLModelId",params,undefined,false); 
			copyArgs(n,"MLModelName",params,undefined,false); 
			copyArgs(n,"MLModelType",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			copyArgs(n,"TrainingDataSourceId",params,undefined,false); 
			copyArgs(n,"Recipe",params,undefined,false); 
			copyArgs(n,"RecipeUri",params,undefined,false); 
			
			copyArgs(msg,"MLModelId",params,undefined,false); 
			copyArgs(msg,"MLModelName",params,undefined,false); 
			copyArgs(msg,"MLModelType",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			copyArgs(msg,"TrainingDataSourceId",params,undefined,false); 
			copyArgs(msg,"Recipe",params,undefined,false); 
			copyArgs(msg,"RecipeUri",params,undefined,false); 
			

			svc.createMLModel(params,cb);
		}
			service.CreateRealtimeEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MLModelId",params,undefined,false); 
			
			copyArgs(n,"MLModelId",params,undefined,false); 
			
			copyArgs(msg,"MLModelId",params,undefined,false); 
			

			svc.createRealtimeEndpoint(params,cb);
		}
			service.DeleteBatchPrediction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BatchPredictionId",params,undefined,false); 
			
			copyArgs(n,"BatchPredictionId",params,undefined,false); 
			
			copyArgs(msg,"BatchPredictionId",params,undefined,false); 
			

			svc.deleteBatchPrediction(params,cb);
		}
			service.DeleteDataSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DataSourceId",params,undefined,false); 
			
			copyArgs(n,"DataSourceId",params,undefined,false); 
			
			copyArgs(msg,"DataSourceId",params,undefined,false); 
			

			svc.deleteDataSource(params,cb);
		}
			service.DeleteEvaluation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EvaluationId",params,undefined,false); 
			
			copyArgs(n,"EvaluationId",params,undefined,false); 
			
			copyArgs(msg,"EvaluationId",params,undefined,false); 
			

			svc.deleteEvaluation(params,cb);
		}
			service.DeleteMLModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MLModelId",params,undefined,false); 
			
			copyArgs(n,"MLModelId",params,undefined,false); 
			
			copyArgs(msg,"MLModelId",params,undefined,false); 
			

			svc.deleteMLModel(params,cb);
		}
			service.DeleteRealtimeEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MLModelId",params,undefined,false); 
			
			copyArgs(n,"MLModelId",params,undefined,false); 
			
			copyArgs(msg,"MLModelId",params,undefined,false); 
			

			svc.deleteRealtimeEndpoint(params,cb);
		}
			service.DeleteTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TagKeys",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			
			copyArgs(n,"TagKeys",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			
			copyArgs(msg,"TagKeys",params,undefined,false); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"ResourceType",params,undefined,false); 
			

			svc.deleteTags(params,cb);
		}
			service.DescribeBatchPredictions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"FilterVariable",params,undefined,false); 
			copyArgs(n,"EQ",params,undefined,false); 
			copyArgs(n,"GT",params,undefined,false); 
			copyArgs(n,"LT",params,undefined,false); 
			copyArgs(n,"GE",params,undefined,false); 
			copyArgs(n,"LE",params,undefined,false); 
			copyArgs(n,"NE",params,undefined,false); 
			copyArgs(n,"Prefix",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"FilterVariable",params,undefined,false); 
			copyArgs(msg,"EQ",params,undefined,false); 
			copyArgs(msg,"GT",params,undefined,false); 
			copyArgs(msg,"LT",params,undefined,false); 
			copyArgs(msg,"GE",params,undefined,false); 
			copyArgs(msg,"LE",params,undefined,false); 
			copyArgs(msg,"NE",params,undefined,false); 
			copyArgs(msg,"Prefix",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.describeBatchPredictions(params,cb);
		}
			service.DescribeDataSources=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"FilterVariable",params,undefined,false); 
			copyArgs(n,"EQ",params,undefined,false); 
			copyArgs(n,"GT",params,undefined,false); 
			copyArgs(n,"LT",params,undefined,false); 
			copyArgs(n,"GE",params,undefined,false); 
			copyArgs(n,"LE",params,undefined,false); 
			copyArgs(n,"NE",params,undefined,false); 
			copyArgs(n,"Prefix",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"FilterVariable",params,undefined,false); 
			copyArgs(msg,"EQ",params,undefined,false); 
			copyArgs(msg,"GT",params,undefined,false); 
			copyArgs(msg,"LT",params,undefined,false); 
			copyArgs(msg,"GE",params,undefined,false); 
			copyArgs(msg,"LE",params,undefined,false); 
			copyArgs(msg,"NE",params,undefined,false); 
			copyArgs(msg,"Prefix",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.describeDataSources(params,cb);
		}
			service.DescribeEvaluations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"FilterVariable",params,undefined,false); 
			copyArgs(n,"EQ",params,undefined,false); 
			copyArgs(n,"GT",params,undefined,false); 
			copyArgs(n,"LT",params,undefined,false); 
			copyArgs(n,"GE",params,undefined,false); 
			copyArgs(n,"LE",params,undefined,false); 
			copyArgs(n,"NE",params,undefined,false); 
			copyArgs(n,"Prefix",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"FilterVariable",params,undefined,false); 
			copyArgs(msg,"EQ",params,undefined,false); 
			copyArgs(msg,"GT",params,undefined,false); 
			copyArgs(msg,"LT",params,undefined,false); 
			copyArgs(msg,"GE",params,undefined,false); 
			copyArgs(msg,"LE",params,undefined,false); 
			copyArgs(msg,"NE",params,undefined,false); 
			copyArgs(msg,"Prefix",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.describeEvaluations(params,cb);
		}
			service.DescribeMLModels=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"FilterVariable",params,undefined,false); 
			copyArgs(n,"EQ",params,undefined,false); 
			copyArgs(n,"GT",params,undefined,false); 
			copyArgs(n,"LT",params,undefined,false); 
			copyArgs(n,"GE",params,undefined,false); 
			copyArgs(n,"LE",params,undefined,false); 
			copyArgs(n,"NE",params,undefined,false); 
			copyArgs(n,"Prefix",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"FilterVariable",params,undefined,false); 
			copyArgs(msg,"EQ",params,undefined,false); 
			copyArgs(msg,"GT",params,undefined,false); 
			copyArgs(msg,"LT",params,undefined,false); 
			copyArgs(msg,"GE",params,undefined,false); 
			copyArgs(msg,"LE",params,undefined,false); 
			copyArgs(msg,"NE",params,undefined,false); 
			copyArgs(msg,"Prefix",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.describeMLModels(params,cb);
		}
			service.DescribeTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"ResourceType",params,undefined,false); 
			

			svc.describeTags(params,cb);
		}
			service.GetBatchPrediction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BatchPredictionId",params,undefined,false); 
			
			copyArgs(n,"BatchPredictionId",params,undefined,false); 
			
			copyArgs(msg,"BatchPredictionId",params,undefined,false); 
			

			svc.getBatchPrediction(params,cb);
		}
			service.GetDataSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DataSourceId",params,undefined,false); 
			
			copyArgs(n,"DataSourceId",params,undefined,false); 
			copyArgs(Boolean(n),"Verbose",params,undefined,false); 
			
			copyArgs(msg,"DataSourceId",params,undefined,false); 
			copyArgs(msg,"Verbose",params,undefined,false); 
			

			svc.getDataSource(params,cb);
		}
			service.GetEvaluation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EvaluationId",params,undefined,false); 
			
			copyArgs(n,"EvaluationId",params,undefined,false); 
			
			copyArgs(msg,"EvaluationId",params,undefined,false); 
			

			svc.getEvaluation(params,cb);
		}
			service.GetMLModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MLModelId",params,undefined,false); 
			
			copyArgs(n,"MLModelId",params,undefined,false); 
			copyArgs(Boolean(n),"Verbose",params,undefined,false); 
			
			copyArgs(msg,"MLModelId",params,undefined,false); 
			copyArgs(msg,"Verbose",params,undefined,false); 
			

			svc.getMLModel(params,cb);
		}
			service.Predict=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MLModelId",params,undefined,false); 
			copyArgs(n,"Record",params,undefined,false); 
			copyArgs(n,"PredictEndpoint",params,undefined,false); 
			
			copyArgs(n,"MLModelId",params,undefined,false); 
			copyArgs(n,"Record",params,undefined,false); 
			copyArgs(n,"PredictEndpoint",params,undefined,false); 
			
			copyArgs(msg,"MLModelId",params,undefined,false); 
			copyArgs(msg,"Record",params,undefined,false); 
			copyArgs(msg,"PredictEndpoint",params,undefined,false); 
			

			svc.predict(params,cb);
		}
			service.UpdateBatchPrediction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BatchPredictionId",params,undefined,false); 
			copyArgs(n,"BatchPredictionName",params,undefined,false); 
			
			copyArgs(n,"BatchPredictionId",params,undefined,false); 
			copyArgs(n,"BatchPredictionName",params,undefined,false); 
			
			copyArgs(msg,"BatchPredictionId",params,undefined,false); 
			copyArgs(msg,"BatchPredictionName",params,undefined,false); 
			

			svc.updateBatchPrediction(params,cb);
		}
			service.UpdateDataSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DataSourceId",params,undefined,false); 
			copyArgs(n,"DataSourceName",params,undefined,false); 
			
			copyArgs(n,"DataSourceId",params,undefined,false); 
			copyArgs(n,"DataSourceName",params,undefined,false); 
			
			copyArgs(msg,"DataSourceId",params,undefined,false); 
			copyArgs(msg,"DataSourceName",params,undefined,false); 
			

			svc.updateDataSource(params,cb);
		}
			service.UpdateEvaluation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EvaluationId",params,undefined,false); 
			copyArgs(n,"EvaluationName",params,undefined,false); 
			
			copyArgs(n,"EvaluationId",params,undefined,false); 
			copyArgs(n,"EvaluationName",params,undefined,false); 
			
			copyArgs(msg,"EvaluationId",params,undefined,false); 
			copyArgs(msg,"EvaluationName",params,undefined,false); 
			

			svc.updateEvaluation(params,cb);
		}
			service.UpdateMLModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MLModelId",params,undefined,false); 
			
			copyArgs(n,"MLModelId",params,undefined,false); 
			copyArgs(n,"MLModelName",params,undefined,false); 
			copyArgs(n,"ScoreThreshold",params,undefined,false); 
			
			copyArgs(msg,"MLModelId",params,undefined,false); 
			copyArgs(msg,"MLModelName",params,undefined,false); 
			copyArgs(msg,"ScoreThreshold",params,undefined,false); 
			

			svc.updateMLModel(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS MachineLearning", AmazonAPINode);

};
