
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

		var awsService = new AWS.Personalize( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Personalize(msg.AWSConfig) : awsService;

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
		
			service.CreateBatchInferenceJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobName",params,undefined,false); 
			copyArgs(n,"solutionVersionArn",params,undefined,false); 
			copyArgs(n,"jobInput",params,undefined,true); 
			copyArgs(n,"jobOutput",params,undefined,true); 
			copyArgs(n,"roleArn",params,undefined,false); 
			
			copyArgs(n,"jobName",params,undefined,false); 
			copyArgs(n,"solutionVersionArn",params,undefined,false); 
			copyArgs(n,"filterArn",params,undefined,false); 
			copyArgs(Number(n),"numResults",params,undefined,false); 
			copyArgs(n,"jobInput",params,undefined,true); 
			copyArgs(n,"jobOutput",params,undefined,true); 
			copyArgs(n,"roleArn",params,undefined,false); 
			copyArgs(n,"batchInferenceJobConfig",params,undefined,true); 
			
			copyArgs(msg,"jobName",params,undefined,false); 
			copyArgs(msg,"solutionVersionArn",params,undefined,false); 
			copyArgs(msg,"filterArn",params,undefined,false); 
			copyArgs(msg,"numResults",params,undefined,false); 
			copyArgs(msg,"jobInput",params,undefined,true); 
			copyArgs(msg,"jobOutput",params,undefined,true); 
			copyArgs(msg,"roleArn",params,undefined,false); 
			copyArgs(msg,"batchInferenceJobConfig",params,undefined,true); 
			

			svc.createBatchInferenceJob(params,cb);
		}
			service.CreateCampaign=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"solutionVersionArn",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"solutionVersionArn",params,undefined,false); 
			copyArgs(Number(n),"minProvisionedTPS",params,undefined,false); 
			copyArgs(n,"campaignConfig",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"solutionVersionArn",params,undefined,false); 
			copyArgs(msg,"minProvisionedTPS",params,undefined,false); 
			copyArgs(msg,"campaignConfig",params,undefined,true); 
			

			svc.createCampaign(params,cb);
		}
			service.CreateDataset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"schemaArn",params,undefined,false); 
			copyArgs(n,"datasetGroupArn",params,undefined,false); 
			copyArgs(n,"datasetType",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"schemaArn",params,undefined,false); 
			copyArgs(n,"datasetGroupArn",params,undefined,false); 
			copyArgs(n,"datasetType",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"schemaArn",params,undefined,false); 
			copyArgs(msg,"datasetGroupArn",params,undefined,false); 
			copyArgs(msg,"datasetType",params,undefined,false); 
			

			svc.createDataset(params,cb);
		}
			service.CreateDatasetExportJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobName",params,undefined,false); 
			copyArgs(n,"datasetArn",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			copyArgs(n,"jobOutput",params,undefined,true); 
			
			copyArgs(n,"jobName",params,undefined,false); 
			copyArgs(n,"datasetArn",params,undefined,false); 
			copyArgs(n,"ingestionMode",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			copyArgs(n,"jobOutput",params,undefined,true); 
			
			copyArgs(msg,"jobName",params,undefined,false); 
			copyArgs(msg,"datasetArn",params,undefined,false); 
			copyArgs(msg,"ingestionMode",params,undefined,false); 
			copyArgs(msg,"roleArn",params,undefined,false); 
			copyArgs(msg,"jobOutput",params,undefined,true); 
			

			svc.createDatasetExportJob(params,cb);
		}
			service.CreateDatasetGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			copyArgs(n,"kmsKeyArn",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"roleArn",params,undefined,false); 
			copyArgs(msg,"kmsKeyArn",params,undefined,false); 
			

			svc.createDatasetGroup(params,cb);
		}
			service.CreateDatasetImportJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobName",params,undefined,false); 
			copyArgs(n,"datasetArn",params,undefined,false); 
			copyArgs(n,"dataSource",params,undefined,true); 
			copyArgs(n,"roleArn",params,undefined,false); 
			
			copyArgs(n,"jobName",params,undefined,false); 
			copyArgs(n,"datasetArn",params,undefined,false); 
			copyArgs(n,"dataSource",params,undefined,true); 
			copyArgs(n,"roleArn",params,undefined,false); 
			
			copyArgs(msg,"jobName",params,undefined,false); 
			copyArgs(msg,"datasetArn",params,undefined,false); 
			copyArgs(msg,"dataSource",params,undefined,true); 
			copyArgs(msg,"roleArn",params,undefined,false); 
			

			svc.createDatasetImportJob(params,cb);
		}
			service.CreateEventTracker=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"datasetGroupArn",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"datasetGroupArn",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"datasetGroupArn",params,undefined,false); 
			

			svc.createEventTracker(params,cb);
		}
			service.CreateFilter=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"datasetGroupArn",params,undefined,false); 
			copyArgs(n,"filterExpression",params,undefined,true); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"datasetGroupArn",params,undefined,false); 
			copyArgs(n,"filterExpression",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"datasetGroupArn",params,undefined,false); 
			copyArgs(msg,"filterExpression",params,undefined,true); 
			

			svc.createFilter(params,cb);
		}
			service.CreateSchema=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"schema",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"schema",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"schema",params,undefined,false); 
			

			svc.createSchema(params,cb);
		}
			service.CreateSolution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"datasetGroupArn",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(Boolean(n),"performHPO",params,undefined,false); 
			copyArgs(Boolean(n),"performAutoML",params,undefined,false); 
			copyArgs(n,"recipeArn",params,undefined,false); 
			copyArgs(n,"datasetGroupArn",params,undefined,false); 
			copyArgs(n,"eventType",params,undefined,false); 
			copyArgs(n,"solutionConfig",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"performHPO",params,undefined,false); 
			copyArgs(msg,"performAutoML",params,undefined,false); 
			copyArgs(msg,"recipeArn",params,undefined,false); 
			copyArgs(msg,"datasetGroupArn",params,undefined,false); 
			copyArgs(msg,"eventType",params,undefined,false); 
			copyArgs(msg,"solutionConfig",params,undefined,true); 
			

			svc.createSolution(params,cb);
		}
			service.CreateSolutionVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"solutionArn",params,undefined,false); 
			
			copyArgs(n,"solutionArn",params,undefined,false); 
			copyArgs(n,"trainingMode",params,undefined,false); 
			
			copyArgs(msg,"solutionArn",params,undefined,false); 
			copyArgs(msg,"trainingMode",params,undefined,false); 
			

			svc.createSolutionVersion(params,cb);
		}
			service.DeleteCampaign=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"campaignArn",params,undefined,false); 
			
			copyArgs(n,"campaignArn",params,undefined,false); 
			
			copyArgs(msg,"campaignArn",params,undefined,false); 
			

			svc.deleteCampaign(params,cb);
		}
			service.DeleteDataset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"datasetArn",params,undefined,false); 
			
			copyArgs(n,"datasetArn",params,undefined,false); 
			
			copyArgs(msg,"datasetArn",params,undefined,false); 
			

			svc.deleteDataset(params,cb);
		}
			service.DeleteDatasetGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"datasetGroupArn",params,undefined,false); 
			
			copyArgs(n,"datasetGroupArn",params,undefined,false); 
			
			copyArgs(msg,"datasetGroupArn",params,undefined,false); 
			

			svc.deleteDatasetGroup(params,cb);
		}
			service.DeleteEventTracker=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"eventTrackerArn",params,undefined,false); 
			
			copyArgs(n,"eventTrackerArn",params,undefined,false); 
			
			copyArgs(msg,"eventTrackerArn",params,undefined,false); 
			

			svc.deleteEventTracker(params,cb);
		}
			service.DeleteFilter=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"filterArn",params,undefined,false); 
			
			copyArgs(n,"filterArn",params,undefined,false); 
			
			copyArgs(msg,"filterArn",params,undefined,false); 
			

			svc.deleteFilter(params,cb);
		}
			service.DeleteSchema=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"schemaArn",params,undefined,false); 
			
			copyArgs(n,"schemaArn",params,undefined,false); 
			
			copyArgs(msg,"schemaArn",params,undefined,false); 
			

			svc.deleteSchema(params,cb);
		}
			service.DeleteSolution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"solutionArn",params,undefined,false); 
			
			copyArgs(n,"solutionArn",params,undefined,false); 
			
			copyArgs(msg,"solutionArn",params,undefined,false); 
			

			svc.deleteSolution(params,cb);
		}
			service.DescribeAlgorithm=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"algorithmArn",params,undefined,false); 
			
			copyArgs(n,"algorithmArn",params,undefined,false); 
			
			copyArgs(msg,"algorithmArn",params,undefined,false); 
			

			svc.describeAlgorithm(params,cb);
		}
			service.DescribeBatchInferenceJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"batchInferenceJobArn",params,undefined,false); 
			
			copyArgs(n,"batchInferenceJobArn",params,undefined,false); 
			
			copyArgs(msg,"batchInferenceJobArn",params,undefined,false); 
			

			svc.describeBatchInferenceJob(params,cb);
		}
			service.DescribeCampaign=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"campaignArn",params,undefined,false); 
			
			copyArgs(n,"campaignArn",params,undefined,false); 
			
			copyArgs(msg,"campaignArn",params,undefined,false); 
			

			svc.describeCampaign(params,cb);
		}
			service.DescribeDataset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"datasetArn",params,undefined,false); 
			
			copyArgs(n,"datasetArn",params,undefined,false); 
			
			copyArgs(msg,"datasetArn",params,undefined,false); 
			

			svc.describeDataset(params,cb);
		}
			service.DescribeDatasetExportJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"datasetExportJobArn",params,undefined,false); 
			
			copyArgs(n,"datasetExportJobArn",params,undefined,false); 
			
			copyArgs(msg,"datasetExportJobArn",params,undefined,false); 
			

			svc.describeDatasetExportJob(params,cb);
		}
			service.DescribeDatasetGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"datasetGroupArn",params,undefined,false); 
			
			copyArgs(n,"datasetGroupArn",params,undefined,false); 
			
			copyArgs(msg,"datasetGroupArn",params,undefined,false); 
			

			svc.describeDatasetGroup(params,cb);
		}
			service.DescribeDatasetImportJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"datasetImportJobArn",params,undefined,false); 
			
			copyArgs(n,"datasetImportJobArn",params,undefined,false); 
			
			copyArgs(msg,"datasetImportJobArn",params,undefined,false); 
			

			svc.describeDatasetImportJob(params,cb);
		}
			service.DescribeEventTracker=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"eventTrackerArn",params,undefined,false); 
			
			copyArgs(n,"eventTrackerArn",params,undefined,false); 
			
			copyArgs(msg,"eventTrackerArn",params,undefined,false); 
			

			svc.describeEventTracker(params,cb);
		}
			service.DescribeFeatureTransformation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"featureTransformationArn",params,undefined,false); 
			
			copyArgs(n,"featureTransformationArn",params,undefined,false); 
			
			copyArgs(msg,"featureTransformationArn",params,undefined,false); 
			

			svc.describeFeatureTransformation(params,cb);
		}
			service.DescribeFilter=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"filterArn",params,undefined,false); 
			
			copyArgs(n,"filterArn",params,undefined,false); 
			
			copyArgs(msg,"filterArn",params,undefined,false); 
			

			svc.describeFilter(params,cb);
		}
			service.DescribeRecipe=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"recipeArn",params,undefined,false); 
			
			copyArgs(n,"recipeArn",params,undefined,false); 
			
			copyArgs(msg,"recipeArn",params,undefined,false); 
			

			svc.describeRecipe(params,cb);
		}
			service.DescribeSchema=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"schemaArn",params,undefined,false); 
			
			copyArgs(n,"schemaArn",params,undefined,false); 
			
			copyArgs(msg,"schemaArn",params,undefined,false); 
			

			svc.describeSchema(params,cb);
		}
			service.DescribeSolution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"solutionArn",params,undefined,false); 
			
			copyArgs(n,"solutionArn",params,undefined,false); 
			
			copyArgs(msg,"solutionArn",params,undefined,false); 
			

			svc.describeSolution(params,cb);
		}
			service.DescribeSolutionVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"solutionVersionArn",params,undefined,false); 
			
			copyArgs(n,"solutionVersionArn",params,undefined,false); 
			
			copyArgs(msg,"solutionVersionArn",params,undefined,false); 
			

			svc.describeSolutionVersion(params,cb);
		}
			service.GetSolutionMetrics=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"solutionVersionArn",params,undefined,false); 
			
			copyArgs(n,"solutionVersionArn",params,undefined,false); 
			
			copyArgs(msg,"solutionVersionArn",params,undefined,false); 
			

			svc.getSolutionMetrics(params,cb);
		}
			service.ListBatchInferenceJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"solutionVersionArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"solutionVersionArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listBatchInferenceJobs(params,cb);
		}
			service.ListCampaigns=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"solutionArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"solutionArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listCampaigns(params,cb);
		}
			service.ListDatasetExportJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"datasetArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"datasetArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listDatasetExportJobs(params,cb);
		}
			service.ListDatasetGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listDatasetGroups(params,cb);
		}
			service.ListDatasetImportJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"datasetArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"datasetArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listDatasetImportJobs(params,cb);
		}
			service.ListDatasets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"datasetGroupArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"datasetGroupArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listDatasets(params,cb);
		}
			service.ListEventTrackers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"datasetGroupArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"datasetGroupArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listEventTrackers(params,cb);
		}
			service.ListFilters=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"datasetGroupArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"datasetGroupArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listFilters(params,cb);
		}
			service.ListRecipes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"recipeProvider",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"recipeProvider",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listRecipes(params,cb);
		}
			service.ListSchemas=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listSchemas(params,cb);
		}
			service.ListSolutionVersions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"solutionArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"solutionArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listSolutionVersions(params,cb);
		}
			service.ListSolutions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"datasetGroupArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"datasetGroupArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listSolutions(params,cb);
		}
			service.StopSolutionVersionCreation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"solutionVersionArn",params,undefined,false); 
			
			copyArgs(n,"solutionVersionArn",params,undefined,false); 
			
			copyArgs(msg,"solutionVersionArn",params,undefined,false); 
			

			svc.stopSolutionVersionCreation(params,cb);
		}
			service.UpdateCampaign=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"campaignArn",params,undefined,false); 
			
			copyArgs(n,"campaignArn",params,undefined,false); 
			copyArgs(n,"solutionVersionArn",params,undefined,false); 
			copyArgs(Number(n),"minProvisionedTPS",params,undefined,false); 
			copyArgs(n,"campaignConfig",params,undefined,true); 
			
			copyArgs(msg,"campaignArn",params,undefined,false); 
			copyArgs(msg,"solutionVersionArn",params,undefined,false); 
			copyArgs(msg,"minProvisionedTPS",params,undefined,false); 
			copyArgs(msg,"campaignConfig",params,undefined,true); 
			

			svc.updateCampaign(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS Personalize", AmazonAPINode);

};
