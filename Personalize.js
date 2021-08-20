
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

		var awsService = new AWS.Personalize( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Personalize(msg.AWSConfig) : awsService;

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

		
		service.CreateBatchInferenceJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobName",params,undefined,false); 
			copyArg(n,"solutionVersionArn",params,undefined,false); 
			copyArg(n,"jobInput",params,undefined,true); 
			copyArg(n,"jobOutput",params,undefined,true); 
			copyArg(n,"roleArn",params,undefined,false); 
			
			copyArg(msg,"jobName",params,undefined,false); 
			copyArg(msg,"solutionVersionArn",params,undefined,false); 
			copyArg(msg,"filterArn",params,undefined,false); 
			copyArg(msg,"numResults",params,undefined,false); 
			copyArg(msg,"jobInput",params,undefined,true); 
			copyArg(msg,"jobOutput",params,undefined,true); 
			copyArg(msg,"roleArn",params,undefined,false); 
			copyArg(msg,"batchInferenceJobConfig",params,undefined,true); 
			

			svc.createBatchInferenceJob(params,cb);
		}

		
		service.CreateCampaign=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"solutionVersionArn",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"solutionVersionArn",params,undefined,false); 
			copyArg(msg,"minProvisionedTPS",params,undefined,false); 
			copyArg(msg,"campaignConfig",params,undefined,true); 
			

			svc.createCampaign(params,cb);
		}

		
		service.CreateDataset=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"schemaArn",params,undefined,false); 
			copyArg(n,"datasetGroupArn",params,undefined,false); 
			copyArg(n,"datasetType",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"schemaArn",params,undefined,false); 
			copyArg(msg,"datasetGroupArn",params,undefined,false); 
			copyArg(msg,"datasetType",params,undefined,false); 
			

			svc.createDataset(params,cb);
		}

		
		service.CreateDatasetExportJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobName",params,undefined,false); 
			copyArg(n,"datasetArn",params,undefined,false); 
			copyArg(n,"roleArn",params,undefined,false); 
			copyArg(n,"jobOutput",params,undefined,true); 
			
			copyArg(msg,"jobName",params,undefined,false); 
			copyArg(msg,"datasetArn",params,undefined,false); 
			copyArg(msg,"ingestionMode",params,undefined,false); 
			copyArg(msg,"roleArn",params,undefined,false); 
			copyArg(msg,"jobOutput",params,undefined,true); 
			

			svc.createDatasetExportJob(params,cb);
		}

		
		service.CreateDatasetGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"roleArn",params,undefined,false); 
			copyArg(msg,"kmsKeyArn",params,undefined,false); 
			

			svc.createDatasetGroup(params,cb);
		}

		
		service.CreateDatasetImportJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobName",params,undefined,false); 
			copyArg(n,"datasetArn",params,undefined,false); 
			copyArg(n,"dataSource",params,undefined,true); 
			copyArg(n,"roleArn",params,undefined,false); 
			
			copyArg(msg,"jobName",params,undefined,false); 
			copyArg(msg,"datasetArn",params,undefined,false); 
			copyArg(msg,"dataSource",params,undefined,true); 
			copyArg(msg,"roleArn",params,undefined,false); 
			

			svc.createDatasetImportJob(params,cb);
		}

		
		service.CreateEventTracker=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"datasetGroupArn",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"datasetGroupArn",params,undefined,false); 
			

			svc.createEventTracker(params,cb);
		}

		
		service.CreateFilter=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"datasetGroupArn",params,undefined,false); 
			copyArg(n,"filterExpression",params,undefined,true); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"datasetGroupArn",params,undefined,false); 
			copyArg(msg,"filterExpression",params,undefined,true); 
			

			svc.createFilter(params,cb);
		}

		
		service.CreateSchema=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"schema",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"schema",params,undefined,false); 
			

			svc.createSchema(params,cb);
		}

		
		service.CreateSolution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"datasetGroupArn",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"performHPO",params,undefined,false); 
			copyArg(msg,"performAutoML",params,undefined,false); 
			copyArg(msg,"recipeArn",params,undefined,false); 
			copyArg(msg,"datasetGroupArn",params,undefined,false); 
			copyArg(msg,"eventType",params,undefined,false); 
			copyArg(msg,"solutionConfig",params,undefined,true); 
			

			svc.createSolution(params,cb);
		}

		
		service.CreateSolutionVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"solutionArn",params,undefined,false); 
			
			copyArg(msg,"solutionArn",params,undefined,false); 
			copyArg(msg,"trainingMode",params,undefined,false); 
			

			svc.createSolutionVersion(params,cb);
		}

		
		service.DeleteCampaign=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"campaignArn",params,undefined,false); 
			
			copyArg(msg,"campaignArn",params,undefined,false); 
			

			svc.deleteCampaign(params,cb);
		}

		
		service.DeleteDataset=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"datasetArn",params,undefined,false); 
			
			copyArg(msg,"datasetArn",params,undefined,false); 
			

			svc.deleteDataset(params,cb);
		}

		
		service.DeleteDatasetGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"datasetGroupArn",params,undefined,false); 
			
			copyArg(msg,"datasetGroupArn",params,undefined,false); 
			

			svc.deleteDatasetGroup(params,cb);
		}

		
		service.DeleteEventTracker=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"eventTrackerArn",params,undefined,false); 
			
			copyArg(msg,"eventTrackerArn",params,undefined,false); 
			

			svc.deleteEventTracker(params,cb);
		}

		
		service.DeleteFilter=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"filterArn",params,undefined,false); 
			
			copyArg(msg,"filterArn",params,undefined,false); 
			

			svc.deleteFilter(params,cb);
		}

		
		service.DeleteSchema=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"schemaArn",params,undefined,false); 
			
			copyArg(msg,"schemaArn",params,undefined,false); 
			

			svc.deleteSchema(params,cb);
		}

		
		service.DeleteSolution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"solutionArn",params,undefined,false); 
			
			copyArg(msg,"solutionArn",params,undefined,false); 
			

			svc.deleteSolution(params,cb);
		}

		
		service.DescribeAlgorithm=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"algorithmArn",params,undefined,false); 
			
			copyArg(msg,"algorithmArn",params,undefined,false); 
			

			svc.describeAlgorithm(params,cb);
		}

		
		service.DescribeBatchInferenceJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"batchInferenceJobArn",params,undefined,false); 
			
			copyArg(msg,"batchInferenceJobArn",params,undefined,false); 
			

			svc.describeBatchInferenceJob(params,cb);
		}

		
		service.DescribeCampaign=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"campaignArn",params,undefined,false); 
			
			copyArg(msg,"campaignArn",params,undefined,false); 
			

			svc.describeCampaign(params,cb);
		}

		
		service.DescribeDataset=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"datasetArn",params,undefined,false); 
			
			copyArg(msg,"datasetArn",params,undefined,false); 
			

			svc.describeDataset(params,cb);
		}

		
		service.DescribeDatasetExportJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"datasetExportJobArn",params,undefined,false); 
			
			copyArg(msg,"datasetExportJobArn",params,undefined,false); 
			

			svc.describeDatasetExportJob(params,cb);
		}

		
		service.DescribeDatasetGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"datasetGroupArn",params,undefined,false); 
			
			copyArg(msg,"datasetGroupArn",params,undefined,false); 
			

			svc.describeDatasetGroup(params,cb);
		}

		
		service.DescribeDatasetImportJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"datasetImportJobArn",params,undefined,false); 
			
			copyArg(msg,"datasetImportJobArn",params,undefined,false); 
			

			svc.describeDatasetImportJob(params,cb);
		}

		
		service.DescribeEventTracker=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"eventTrackerArn",params,undefined,false); 
			
			copyArg(msg,"eventTrackerArn",params,undefined,false); 
			

			svc.describeEventTracker(params,cb);
		}

		
		service.DescribeFeatureTransformation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"featureTransformationArn",params,undefined,false); 
			
			copyArg(msg,"featureTransformationArn",params,undefined,false); 
			

			svc.describeFeatureTransformation(params,cb);
		}

		
		service.DescribeFilter=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"filterArn",params,undefined,false); 
			
			copyArg(msg,"filterArn",params,undefined,false); 
			

			svc.describeFilter(params,cb);
		}

		
		service.DescribeRecipe=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"recipeArn",params,undefined,false); 
			
			copyArg(msg,"recipeArn",params,undefined,false); 
			

			svc.describeRecipe(params,cb);
		}

		
		service.DescribeSchema=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"schemaArn",params,undefined,false); 
			
			copyArg(msg,"schemaArn",params,undefined,false); 
			

			svc.describeSchema(params,cb);
		}

		
		service.DescribeSolution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"solutionArn",params,undefined,false); 
			
			copyArg(msg,"solutionArn",params,undefined,false); 
			

			svc.describeSolution(params,cb);
		}

		
		service.DescribeSolutionVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"solutionVersionArn",params,undefined,false); 
			
			copyArg(msg,"solutionVersionArn",params,undefined,false); 
			

			svc.describeSolutionVersion(params,cb);
		}

		
		service.GetSolutionMetrics=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"solutionVersionArn",params,undefined,false); 
			
			copyArg(msg,"solutionVersionArn",params,undefined,false); 
			

			svc.getSolutionMetrics(params,cb);
		}

		
		service.ListBatchInferenceJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"solutionVersionArn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listBatchInferenceJobs(params,cb);
		}

		
		service.ListCampaigns=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"solutionArn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listCampaigns(params,cb);
		}

		
		service.ListDatasetExportJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"datasetArn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listDatasetExportJobs(params,cb);
		}

		
		service.ListDatasetGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listDatasetGroups(params,cb);
		}

		
		service.ListDatasetImportJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"datasetArn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listDatasetImportJobs(params,cb);
		}

		
		service.ListDatasets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"datasetGroupArn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listDatasets(params,cb);
		}

		
		service.ListEventTrackers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"datasetGroupArn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listEventTrackers(params,cb);
		}

		
		service.ListFilters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"datasetGroupArn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listFilters(params,cb);
		}

		
		service.ListRecipes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"recipeProvider",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listRecipes(params,cb);
		}

		
		service.ListSchemas=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listSchemas(params,cb);
		}

		
		service.ListSolutionVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"solutionArn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listSolutionVersions(params,cb);
		}

		
		service.ListSolutions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"datasetGroupArn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listSolutions(params,cb);
		}

		
		service.StopSolutionVersionCreation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"solutionVersionArn",params,undefined,false); 
			
			copyArg(msg,"solutionVersionArn",params,undefined,false); 
			

			svc.stopSolutionVersionCreation(params,cb);
		}

		
		service.UpdateCampaign=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"campaignArn",params,undefined,false); 
			
			copyArg(msg,"campaignArn",params,undefined,false); 
			copyArg(msg,"solutionVersionArn",params,undefined,false); 
			copyArg(msg,"minProvisionedTPS",params,undefined,false); 
			copyArg(msg,"campaignConfig",params,undefined,true); 
			

			svc.updateCampaign(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Personalize", AmazonAPINode);

};
