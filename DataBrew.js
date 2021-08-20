
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

		var awsService = new AWS.DataBrew( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.DataBrew(msg.AWSConfig) : awsService;

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

		
		service.BatchDeleteRecipeVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"RecipeVersions",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"RecipeVersions",params,undefined,false); 
			

			svc.batchDeleteRecipeVersion(params,cb);
		}

		
		service.CreateDataset=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Input",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Format",params,undefined,false); 
			copyArg(msg,"FormatOptions",params,undefined,true); 
			copyArg(msg,"Input",params,undefined,true); 
			copyArg(msg,"PathOptions",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createDataset(params,cb);
		}

		
		service.CreateProfileJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatasetName",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"OutputLocation",params,undefined,true); 
			copyArg(n,"RoleArn",params,undefined,false); 
			
			copyArg(msg,"DatasetName",params,undefined,false); 
			copyArg(msg,"EncryptionKeyArn",params,undefined,false); 
			copyArg(msg,"EncryptionMode",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"LogSubscription",params,undefined,false); 
			copyArg(msg,"MaxCapacity",params,undefined,false); 
			copyArg(msg,"MaxRetries",params,undefined,false); 
			copyArg(msg,"OutputLocation",params,undefined,true); 
			copyArg(msg,"Configuration",params,undefined,true); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"Timeout",params,undefined,false); 
			copyArg(msg,"JobSample",params,undefined,true); 
			

			svc.createProfileJob(params,cb);
		}

		
		service.CreateProject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatasetName",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"RecipeName",params,undefined,false); 
			copyArg(n,"RoleArn",params,undefined,false); 
			
			copyArg(msg,"DatasetName",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"RecipeName",params,undefined,false); 
			copyArg(msg,"Sample",params,undefined,true); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createProject(params,cb);
		}

		
		service.CreateRecipe=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Steps",params,undefined,true); 
			
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Steps",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createRecipe(params,cb);
		}

		
		service.CreateRecipeJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"RoleArn",params,undefined,false); 
			
			copyArg(msg,"DatasetName",params,undefined,false); 
			copyArg(msg,"EncryptionKeyArn",params,undefined,false); 
			copyArg(msg,"EncryptionMode",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"LogSubscription",params,undefined,false); 
			copyArg(msg,"MaxCapacity",params,undefined,false); 
			copyArg(msg,"MaxRetries",params,undefined,false); 
			copyArg(msg,"Outputs",params,undefined,true); 
			copyArg(msg,"DataCatalogOutputs",params,undefined,true); 
			copyArg(msg,"DatabaseOutputs",params,undefined,true); 
			copyArg(msg,"ProjectName",params,undefined,false); 
			copyArg(msg,"RecipeReference",params,undefined,true); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"Timeout",params,undefined,false); 
			

			svc.createRecipeJob(params,cb);
		}

		
		service.CreateSchedule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CronExpression",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"JobNames",params,undefined,true); 
			copyArg(msg,"CronExpression",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.createSchedule(params,cb);
		}

		
		service.DeleteDataset=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteDataset(params,cb);
		}

		
		service.DeleteJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteJob(params,cb);
		}

		
		service.DeleteProject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteProject(params,cb);
		}

		
		service.DeleteRecipeVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"RecipeVersion",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"RecipeVersion",params,undefined,false); 
			

			svc.deleteRecipeVersion(params,cb);
		}

		
		service.DeleteSchedule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteSchedule(params,cb);
		}

		
		service.DescribeDataset=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.describeDataset(params,cb);
		}

		
		service.DescribeJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.describeJob(params,cb);
		}

		
		service.DescribeJobRun=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"RunId",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"RunId",params,undefined,false); 
			

			svc.describeJobRun(params,cb);
		}

		
		service.DescribeProject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.describeProject(params,cb);
		}

		
		service.DescribeRecipe=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"RecipeVersion",params,undefined,false); 
			

			svc.describeRecipe(params,cb);
		}

		
		service.DescribeSchedule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.describeSchedule(params,cb);
		}

		
		service.ListDatasets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listDatasets(params,cb);
		}

		
		service.ListJobRuns=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listJobRuns(params,cb);
		}

		
		service.ListJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DatasetName",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"ProjectName",params,undefined,false); 
			

			svc.listJobs(params,cb);
		}

		
		service.ListProjects=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listProjects(params,cb);
		}

		
		service.ListRecipeVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.listRecipeVersions(params,cb);
		}

		
		service.ListRecipes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"RecipeVersion",params,undefined,false); 
			

			svc.listRecipes(params,cb);
		}

		
		service.ListSchedules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"JobName",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listSchedules(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PublishRecipe=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.publishRecipe(params,cb);
		}

		
		service.SendProjectSessionAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Preview",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"RecipeStep",params,undefined,true); 
			copyArg(msg,"StepIndex",params,undefined,false); 
			copyArg(msg,"ClientSessionId",params,undefined,false); 
			copyArg(msg,"ViewFrame",params,undefined,false); 
			

			svc.sendProjectSessionAction(params,cb);
		}

		
		service.StartJobRun=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.startJobRun(params,cb);
		}

		
		service.StartProjectSession=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"AssumeControl",params,undefined,false); 
			

			svc.startProjectSession(params,cb);
		}

		
		service.StopJobRun=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"RunId",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"RunId",params,undefined,false); 
			

			svc.stopJobRun(params,cb);
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

		
		service.UpdateDataset=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Input",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Format",params,undefined,false); 
			copyArg(msg,"FormatOptions",params,undefined,true); 
			copyArg(msg,"Input",params,undefined,true); 
			copyArg(msg,"PathOptions",params,undefined,true); 
			

			svc.updateDataset(params,cb);
		}

		
		service.UpdateProfileJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"OutputLocation",params,undefined,true); 
			copyArg(n,"RoleArn",params,undefined,false); 
			
			copyArg(msg,"Configuration",params,undefined,true); 
			copyArg(msg,"EncryptionKeyArn",params,undefined,false); 
			copyArg(msg,"EncryptionMode",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"LogSubscription",params,undefined,false); 
			copyArg(msg,"MaxCapacity",params,undefined,false); 
			copyArg(msg,"MaxRetries",params,undefined,false); 
			copyArg(msg,"OutputLocation",params,undefined,true); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"Timeout",params,undefined,false); 
			copyArg(msg,"JobSample",params,undefined,true); 
			

			svc.updateProfileJob(params,cb);
		}

		
		service.UpdateProject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RoleArn",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Sample",params,undefined,true); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.updateProject(params,cb);
		}

		
		service.UpdateRecipe=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Steps",params,undefined,true); 
			

			svc.updateRecipe(params,cb);
		}

		
		service.UpdateRecipeJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"RoleArn",params,undefined,false); 
			
			copyArg(msg,"EncryptionKeyArn",params,undefined,false); 
			copyArg(msg,"EncryptionMode",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"LogSubscription",params,undefined,false); 
			copyArg(msg,"MaxCapacity",params,undefined,false); 
			copyArg(msg,"MaxRetries",params,undefined,false); 
			copyArg(msg,"Outputs",params,undefined,true); 
			copyArg(msg,"DataCatalogOutputs",params,undefined,true); 
			copyArg(msg,"DatabaseOutputs",params,undefined,true); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"Timeout",params,undefined,false); 
			

			svc.updateRecipeJob(params,cb);
		}

		
		service.UpdateSchedule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CronExpression",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"JobNames",params,undefined,true); 
			copyArg(msg,"CronExpression",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.updateSchedule(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS DataBrew", AmazonAPINode);

};
