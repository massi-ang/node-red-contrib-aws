
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

		var awsService = new AWS.MachineLearning( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.MachineLearning(msg.AWSConfig) : awsService;

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

		
		service.AddTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Tags",params,undefined,true); 
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"ResourceType",params,undefined,false); 
			
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			

			svc.addTags(params,cb);
		}

		
		service.CreateBatchPrediction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BatchPredictionId",params,undefined,false); 
			copyArg(n,"MLModelId",params,undefined,false); 
			copyArg(n,"BatchPredictionDataSourceId",params,undefined,false); 
			copyArg(n,"OutputUri",params,undefined,false); 
			
			copyArg(msg,"BatchPredictionId",params,undefined,false); 
			copyArg(msg,"BatchPredictionName",params,undefined,false); 
			copyArg(msg,"MLModelId",params,undefined,false); 
			copyArg(msg,"BatchPredictionDataSourceId",params,undefined,false); 
			copyArg(msg,"OutputUri",params,undefined,false); 
			

			svc.createBatchPrediction(params,cb);
		}

		
		service.CreateDataSourceFromRDS=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DataSourceId",params,undefined,false); 
			copyArg(n,"RDSData",params,undefined,false); 
			copyArg(n,"RoleARN",params,undefined,false); 
			
			copyArg(msg,"DataSourceId",params,undefined,false); 
			copyArg(msg,"DataSourceName",params,undefined,false); 
			copyArg(msg,"RDSData",params,undefined,false); 
			copyArg(msg,"RoleARN",params,undefined,false); 
			copyArg(msg,"ComputeStatistics",params,undefined,false); 
			

			svc.createDataSourceFromRDS(params,cb);
		}

		
		service.CreateDataSourceFromRedshift=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DataSourceId",params,undefined,false); 
			copyArg(n,"DataSpec",params,undefined,false); 
			copyArg(n,"RoleARN",params,undefined,false); 
			
			copyArg(msg,"DataSourceId",params,undefined,false); 
			copyArg(msg,"DataSourceName",params,undefined,false); 
			copyArg(msg,"DataSpec",params,undefined,false); 
			copyArg(msg,"RoleARN",params,undefined,false); 
			copyArg(msg,"ComputeStatistics",params,undefined,false); 
			

			svc.createDataSourceFromRedshift(params,cb);
		}

		
		service.CreateDataSourceFromS3=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DataSourceId",params,undefined,false); 
			copyArg(n,"DataSpec",params,undefined,false); 
			
			copyArg(msg,"DataSourceId",params,undefined,false); 
			copyArg(msg,"DataSourceName",params,undefined,false); 
			copyArg(msg,"DataSpec",params,undefined,false); 
			copyArg(msg,"ComputeStatistics",params,undefined,false); 
			

			svc.createDataSourceFromS3(params,cb);
		}

		
		service.CreateEvaluation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EvaluationId",params,undefined,false); 
			copyArg(n,"MLModelId",params,undefined,false); 
			copyArg(n,"EvaluationDataSourceId",params,undefined,false); 
			
			copyArg(msg,"EvaluationId",params,undefined,false); 
			copyArg(msg,"EvaluationName",params,undefined,false); 
			copyArg(msg,"MLModelId",params,undefined,false); 
			copyArg(msg,"EvaluationDataSourceId",params,undefined,false); 
			

			svc.createEvaluation(params,cb);
		}

		
		service.CreateMLModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MLModelId",params,undefined,false); 
			copyArg(n,"MLModelType",params,undefined,false); 
			copyArg(n,"TrainingDataSourceId",params,undefined,false); 
			
			copyArg(msg,"MLModelId",params,undefined,false); 
			copyArg(msg,"MLModelName",params,undefined,false); 
			copyArg(msg,"MLModelType",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,true); 
			copyArg(msg,"TrainingDataSourceId",params,undefined,false); 
			copyArg(msg,"Recipe",params,undefined,false); 
			copyArg(msg,"RecipeUri",params,undefined,false); 
			

			svc.createMLModel(params,cb);
		}

		
		service.CreateRealtimeEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MLModelId",params,undefined,false); 
			
			copyArg(msg,"MLModelId",params,undefined,false); 
			

			svc.createRealtimeEndpoint(params,cb);
		}

		
		service.DeleteBatchPrediction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BatchPredictionId",params,undefined,false); 
			
			copyArg(msg,"BatchPredictionId",params,undefined,false); 
			

			svc.deleteBatchPrediction(params,cb);
		}

		
		service.DeleteDataSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DataSourceId",params,undefined,false); 
			
			copyArg(msg,"DataSourceId",params,undefined,false); 
			

			svc.deleteDataSource(params,cb);
		}

		
		service.DeleteEvaluation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EvaluationId",params,undefined,false); 
			
			copyArg(msg,"EvaluationId",params,undefined,false); 
			

			svc.deleteEvaluation(params,cb);
		}

		
		service.DeleteMLModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MLModelId",params,undefined,false); 
			
			copyArg(msg,"MLModelId",params,undefined,false); 
			

			svc.deleteMLModel(params,cb);
		}

		
		service.DeleteRealtimeEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MLModelId",params,undefined,false); 
			
			copyArg(msg,"MLModelId",params,undefined,false); 
			

			svc.deleteRealtimeEndpoint(params,cb);
		}

		
		service.DeleteTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TagKeys",params,undefined,false); 
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"ResourceType",params,undefined,false); 
			
			copyArg(msg,"TagKeys",params,undefined,false); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			

			svc.deleteTags(params,cb);
		}

		
		service.DescribeBatchPredictions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"FilterVariable",params,undefined,false); 
			copyArg(msg,"EQ",params,undefined,false); 
			copyArg(msg,"GT",params,undefined,false); 
			copyArg(msg,"LT",params,undefined,false); 
			copyArg(msg,"GE",params,undefined,false); 
			copyArg(msg,"LE",params,undefined,false); 
			copyArg(msg,"NE",params,undefined,false); 
			copyArg(msg,"Prefix",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.describeBatchPredictions(params,cb);
		}

		
		service.DescribeDataSources=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"FilterVariable",params,undefined,false); 
			copyArg(msg,"EQ",params,undefined,false); 
			copyArg(msg,"GT",params,undefined,false); 
			copyArg(msg,"LT",params,undefined,false); 
			copyArg(msg,"GE",params,undefined,false); 
			copyArg(msg,"LE",params,undefined,false); 
			copyArg(msg,"NE",params,undefined,false); 
			copyArg(msg,"Prefix",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.describeDataSources(params,cb);
		}

		
		service.DescribeEvaluations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"FilterVariable",params,undefined,false); 
			copyArg(msg,"EQ",params,undefined,false); 
			copyArg(msg,"GT",params,undefined,false); 
			copyArg(msg,"LT",params,undefined,false); 
			copyArg(msg,"GE",params,undefined,false); 
			copyArg(msg,"LE",params,undefined,false); 
			copyArg(msg,"NE",params,undefined,false); 
			copyArg(msg,"Prefix",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.describeEvaluations(params,cb);
		}

		
		service.DescribeMLModels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"FilterVariable",params,undefined,false); 
			copyArg(msg,"EQ",params,undefined,false); 
			copyArg(msg,"GT",params,undefined,false); 
			copyArg(msg,"LT",params,undefined,false); 
			copyArg(msg,"GE",params,undefined,false); 
			copyArg(msg,"LE",params,undefined,false); 
			copyArg(msg,"NE",params,undefined,false); 
			copyArg(msg,"Prefix",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.describeMLModels(params,cb);
		}

		
		service.DescribeTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"ResourceType",params,undefined,false); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			

			svc.describeTags(params,cb);
		}

		
		service.GetBatchPrediction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BatchPredictionId",params,undefined,false); 
			
			copyArg(msg,"BatchPredictionId",params,undefined,false); 
			

			svc.getBatchPrediction(params,cb);
		}

		
		service.GetDataSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DataSourceId",params,undefined,false); 
			
			copyArg(msg,"DataSourceId",params,undefined,false); 
			copyArg(msg,"Verbose",params,undefined,false); 
			

			svc.getDataSource(params,cb);
		}

		
		service.GetEvaluation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EvaluationId",params,undefined,false); 
			
			copyArg(msg,"EvaluationId",params,undefined,false); 
			

			svc.getEvaluation(params,cb);
		}

		
		service.GetMLModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MLModelId",params,undefined,false); 
			
			copyArg(msg,"MLModelId",params,undefined,false); 
			copyArg(msg,"Verbose",params,undefined,false); 
			

			svc.getMLModel(params,cb);
		}

		
		service.Predict=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MLModelId",params,undefined,false); 
			copyArg(n,"Record",params,undefined,false); 
			copyArg(n,"PredictEndpoint",params,undefined,false); 
			
			copyArg(msg,"MLModelId",params,undefined,false); 
			copyArg(msg,"Record",params,undefined,false); 
			copyArg(msg,"PredictEndpoint",params,undefined,false); 
			

			svc.predict(params,cb);
		}

		
		service.UpdateBatchPrediction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BatchPredictionId",params,undefined,false); 
			copyArg(n,"BatchPredictionName",params,undefined,false); 
			
			copyArg(msg,"BatchPredictionId",params,undefined,false); 
			copyArg(msg,"BatchPredictionName",params,undefined,false); 
			

			svc.updateBatchPrediction(params,cb);
		}

		
		service.UpdateDataSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DataSourceId",params,undefined,false); 
			copyArg(n,"DataSourceName",params,undefined,false); 
			
			copyArg(msg,"DataSourceId",params,undefined,false); 
			copyArg(msg,"DataSourceName",params,undefined,false); 
			

			svc.updateDataSource(params,cb);
		}

		
		service.UpdateEvaluation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EvaluationId",params,undefined,false); 
			copyArg(n,"EvaluationName",params,undefined,false); 
			
			copyArg(msg,"EvaluationId",params,undefined,false); 
			copyArg(msg,"EvaluationName",params,undefined,false); 
			

			svc.updateEvaluation(params,cb);
		}

		
		service.UpdateMLModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MLModelId",params,undefined,false); 
			
			copyArg(msg,"MLModelId",params,undefined,false); 
			copyArg(msg,"MLModelName",params,undefined,false); 
			copyArg(msg,"ScoreThreshold",params,undefined,false); 
			

			svc.updateMLModel(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS MachineLearning", AmazonAPINode);

};
