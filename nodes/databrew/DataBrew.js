
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

		var awsService = new AWS.DataBrew( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.DataBrew(msg.AWSConfig) : awsService;

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

		
		service.BatchDeleteRecipeVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RecipeVersions",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RecipeVersions",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"RecipeVersions",params,undefined,false); 
			

			svc.batchDeleteRecipeVersion(params,cb);
		}

		
		service.CreateDataset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Input",params,undefined,true); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Format",params,undefined,false); 
			copyArgs(n,"FormatOptions",params,undefined,true); 
			copyArgs(n,"Input",params,undefined,true); 
			copyArgs(n,"PathOptions",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Format",params,undefined,false); 
			copyArgs(msg,"FormatOptions",params,undefined,true); 
			copyArgs(msg,"Input",params,undefined,true); 
			copyArgs(msg,"PathOptions",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createDataset(params,cb);
		}

		
		service.CreateProfileJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatasetName",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"OutputLocation",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"DatasetName",params,undefined,false); 
			copyArgs(n,"EncryptionKeyArn",params,undefined,false); 
			copyArgs(n,"EncryptionMode",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"LogSubscription",params,undefined,false); 
			copyArgs(n,"MaxCapacity",params,undefined,false); 
			copyArgs(n,"MaxRetries",params,undefined,false); 
			copyArgs(n,"OutputLocation",params,undefined,true); 
			copyArgs(n,"Configuration",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"Timeout",params,undefined,false); 
			copyArgs(n,"JobSample",params,undefined,true); 
			
			copyArgs(msg,"DatasetName",params,undefined,false); 
			copyArgs(msg,"EncryptionKeyArn",params,undefined,false); 
			copyArgs(msg,"EncryptionMode",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"LogSubscription",params,undefined,false); 
			copyArgs(msg,"MaxCapacity",params,undefined,false); 
			copyArgs(msg,"MaxRetries",params,undefined,false); 
			copyArgs(msg,"OutputLocation",params,undefined,true); 
			copyArgs(msg,"Configuration",params,undefined,true); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"Timeout",params,undefined,false); 
			copyArgs(msg,"JobSample",params,undefined,true); 
			

			svc.createProfileJob(params,cb);
		}

		
		service.CreateProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatasetName",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RecipeName",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"DatasetName",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RecipeName",params,undefined,false); 
			copyArgs(n,"Sample",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DatasetName",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"RecipeName",params,undefined,false); 
			copyArgs(msg,"Sample",params,undefined,true); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createProject(params,cb);
		}

		
		service.CreateRecipe=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Steps",params,undefined,true); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Steps",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Steps",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createRecipe(params,cb);
		}

		
		service.CreateRecipeJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"DatasetName",params,undefined,false); 
			copyArgs(n,"EncryptionKeyArn",params,undefined,false); 
			copyArgs(n,"EncryptionMode",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"LogSubscription",params,undefined,false); 
			copyArgs(n,"MaxCapacity",params,undefined,false); 
			copyArgs(n,"MaxRetries",params,undefined,false); 
			copyArgs(n,"Outputs",params,undefined,true); 
			copyArgs(n,"DataCatalogOutputs",params,undefined,true); 
			copyArgs(n,"DatabaseOutputs",params,undefined,true); 
			copyArgs(n,"ProjectName",params,undefined,false); 
			copyArgs(n,"RecipeReference",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"Timeout",params,undefined,false); 
			
			copyArgs(msg,"DatasetName",params,undefined,false); 
			copyArgs(msg,"EncryptionKeyArn",params,undefined,false); 
			copyArgs(msg,"EncryptionMode",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"LogSubscription",params,undefined,false); 
			copyArgs(msg,"MaxCapacity",params,undefined,false); 
			copyArgs(msg,"MaxRetries",params,undefined,false); 
			copyArgs(msg,"Outputs",params,undefined,true); 
			copyArgs(msg,"DataCatalogOutputs",params,undefined,true); 
			copyArgs(msg,"DatabaseOutputs",params,undefined,true); 
			copyArgs(msg,"ProjectName",params,undefined,false); 
			copyArgs(msg,"RecipeReference",params,undefined,true); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"Timeout",params,undefined,false); 
			

			svc.createRecipeJob(params,cb);
		}

		
		service.CreateSchedule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CronExpression",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"JobNames",params,undefined,true); 
			copyArgs(n,"CronExpression",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"JobNames",params,undefined,true); 
			copyArgs(msg,"CronExpression",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.createSchedule(params,cb);
		}

		
		service.DeleteDataset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteDataset(params,cb);
		}

		
		service.DeleteJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteJob(params,cb);
		}

		
		service.DeleteProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteProject(params,cb);
		}

		
		service.DeleteRecipeVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RecipeVersion",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RecipeVersion",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"RecipeVersion",params,undefined,false); 
			

			svc.deleteRecipeVersion(params,cb);
		}

		
		service.DeleteSchedule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteSchedule(params,cb);
		}

		
		service.DescribeDataset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.describeDataset(params,cb);
		}

		
		service.DescribeJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.describeJob(params,cb);
		}

		
		service.DescribeJobRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RunId",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RunId",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"RunId",params,undefined,false); 
			

			svc.describeJobRun(params,cb);
		}

		
		service.DescribeProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.describeProject(params,cb);
		}

		
		service.DescribeRecipe=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RecipeVersion",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"RecipeVersion",params,undefined,false); 
			

			svc.describeRecipe(params,cb);
		}

		
		service.DescribeSchedule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.describeSchedule(params,cb);
		}

		
		service.ListDatasets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listDatasets(params,cb);
		}

		
		service.ListJobRuns=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listJobRuns(params,cb);
		}

		
		service.ListJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DatasetName",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"ProjectName",params,undefined,false); 
			
			copyArgs(msg,"DatasetName",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"ProjectName",params,undefined,false); 
			

			svc.listJobs(params,cb);
		}

		
		service.ListProjects=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listProjects(params,cb);
		}

		
		service.ListRecipeVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.listRecipeVersions(params,cb);
		}

		
		service.ListRecipes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"RecipeVersion",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"RecipeVersion",params,undefined,false); 
			

			svc.listRecipes(params,cb);
		}

		
		service.ListSchedules=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"JobName",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"JobName",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listSchedules(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PublishRecipe=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.publishRecipe(params,cb);
		}

		
		service.SendProjectSessionAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Preview",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RecipeStep",params,undefined,true); 
			copyArgs(n,"StepIndex",params,undefined,false); 
			copyArgs(n,"ClientSessionId",params,undefined,false); 
			copyArgs(n,"ViewFrame",params,undefined,false); 
			
			copyArgs(msg,"Preview",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"RecipeStep",params,undefined,true); 
			copyArgs(msg,"StepIndex",params,undefined,false); 
			copyArgs(msg,"ClientSessionId",params,undefined,false); 
			copyArgs(msg,"ViewFrame",params,undefined,false); 
			

			svc.sendProjectSessionAction(params,cb);
		}

		
		service.StartJobRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.startJobRun(params,cb);
		}

		
		service.StartProjectSession=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"AssumeControl",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"AssumeControl",params,undefined,false); 
			

			svc.startProjectSession(params,cb);
		}

		
		service.StopJobRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RunId",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RunId",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"RunId",params,undefined,false); 
			

			svc.stopJobRun(params,cb);
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

		
		service.UpdateDataset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Input",params,undefined,true); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Format",params,undefined,false); 
			copyArgs(n,"FormatOptions",params,undefined,true); 
			copyArgs(n,"Input",params,undefined,true); 
			copyArgs(n,"PathOptions",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Format",params,undefined,false); 
			copyArgs(msg,"FormatOptions",params,undefined,true); 
			copyArgs(msg,"Input",params,undefined,true); 
			copyArgs(msg,"PathOptions",params,undefined,true); 
			

			svc.updateDataset(params,cb);
		}

		
		service.UpdateProfileJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"OutputLocation",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"Configuration",params,undefined,true); 
			copyArgs(n,"EncryptionKeyArn",params,undefined,false); 
			copyArgs(n,"EncryptionMode",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"LogSubscription",params,undefined,false); 
			copyArgs(n,"MaxCapacity",params,undefined,false); 
			copyArgs(n,"MaxRetries",params,undefined,false); 
			copyArgs(n,"OutputLocation",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"Timeout",params,undefined,false); 
			copyArgs(n,"JobSample",params,undefined,true); 
			
			copyArgs(msg,"Configuration",params,undefined,true); 
			copyArgs(msg,"EncryptionKeyArn",params,undefined,false); 
			copyArgs(msg,"EncryptionMode",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"LogSubscription",params,undefined,false); 
			copyArgs(msg,"MaxCapacity",params,undefined,false); 
			copyArgs(msg,"MaxRetries",params,undefined,false); 
			copyArgs(msg,"OutputLocation",params,undefined,true); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"Timeout",params,undefined,false); 
			copyArgs(msg,"JobSample",params,undefined,true); 
			

			svc.updateProfileJob(params,cb);
		}

		
		service.UpdateProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Sample",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Sample",params,undefined,true); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.updateProject(params,cb);
		}

		
		service.UpdateRecipe=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Steps",params,undefined,true); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Steps",params,undefined,true); 
			

			svc.updateRecipe(params,cb);
		}

		
		service.UpdateRecipeJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"EncryptionKeyArn",params,undefined,false); 
			copyArgs(n,"EncryptionMode",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"LogSubscription",params,undefined,false); 
			copyArgs(n,"MaxCapacity",params,undefined,false); 
			copyArgs(n,"MaxRetries",params,undefined,false); 
			copyArgs(n,"Outputs",params,undefined,true); 
			copyArgs(n,"DataCatalogOutputs",params,undefined,true); 
			copyArgs(n,"DatabaseOutputs",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"Timeout",params,undefined,false); 
			
			copyArgs(msg,"EncryptionKeyArn",params,undefined,false); 
			copyArgs(msg,"EncryptionMode",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"LogSubscription",params,undefined,false); 
			copyArgs(msg,"MaxCapacity",params,undefined,false); 
			copyArgs(msg,"MaxRetries",params,undefined,false); 
			copyArgs(msg,"Outputs",params,undefined,true); 
			copyArgs(msg,"DataCatalogOutputs",params,undefined,true); 
			copyArgs(msg,"DatabaseOutputs",params,undefined,true); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"Timeout",params,undefined,false); 
			

			svc.updateRecipeJob(params,cb);
		}

		
		service.UpdateSchedule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CronExpression",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"JobNames",params,undefined,true); 
			copyArgs(n,"CronExpression",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"JobNames",params,undefined,true); 
			copyArgs(msg,"CronExpression",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.updateSchedule(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS DataBrew", AmazonAPINode);

};
