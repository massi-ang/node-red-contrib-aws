
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

		var awsService = new AWS.RoboMaker( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.RoboMaker(msg.AWSConfig) : awsService;

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

		
		service.BatchDeleteWorlds=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"worlds",params,undefined,true); 
			
			copyArgs(n,"worlds",params,undefined,true); 
			
			copyArgs(msg,"worlds",params,undefined,true); 
			

			svc.batchDeleteWorlds(params,cb);
		}

		
		service.BatchDescribeSimulationJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobs",params,undefined,true); 
			
			copyArgs(n,"jobs",params,undefined,true); 
			
			copyArgs(msg,"jobs",params,undefined,true); 
			

			svc.batchDescribeSimulationJob(params,cb);
		}

		
		service.CancelDeploymentJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"job",params,undefined,false); 
			
			copyArgs(n,"job",params,undefined,false); 
			
			copyArgs(msg,"job",params,undefined,false); 
			

			svc.cancelDeploymentJob(params,cb);
		}

		
		service.CancelSimulationJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"job",params,undefined,false); 
			
			copyArgs(n,"job",params,undefined,false); 
			
			copyArgs(msg,"job",params,undefined,false); 
			

			svc.cancelSimulationJob(params,cb);
		}

		
		service.CancelSimulationJobBatch=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"batch",params,undefined,false); 
			
			copyArgs(n,"batch",params,undefined,false); 
			
			copyArgs(msg,"batch",params,undefined,false); 
			

			svc.cancelSimulationJobBatch(params,cb);
		}

		
		service.CancelWorldExportJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"job",params,undefined,false); 
			
			copyArgs(n,"job",params,undefined,false); 
			
			copyArgs(msg,"job",params,undefined,false); 
			

			svc.cancelWorldExportJob(params,cb);
		}

		
		service.CancelWorldGenerationJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"job",params,undefined,false); 
			
			copyArgs(n,"job",params,undefined,false); 
			
			copyArgs(msg,"job",params,undefined,false); 
			

			svc.cancelWorldGenerationJob(params,cb);
		}

		
		service.CreateDeploymentJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			copyArgs(n,"fleet",params,undefined,false); 
			copyArgs(n,"deploymentApplicationConfigs",params,undefined,true); 
			
			copyArgs(n,"deploymentConfig",params,undefined,true); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			copyArgs(n,"fleet",params,undefined,false); 
			copyArgs(n,"deploymentApplicationConfigs",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"deploymentConfig",params,undefined,true); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			copyArgs(msg,"fleet",params,undefined,false); 
			copyArgs(msg,"deploymentApplicationConfigs",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createDeploymentJob(params,cb);
		}

		
		service.CreateFleet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createFleet(params,cb);
		}

		
		service.CreateRobot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"architecture",params,undefined,false); 
			copyArgs(n,"greengrassGroupId",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"architecture",params,undefined,false); 
			copyArgs(n,"greengrassGroupId",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"architecture",params,undefined,false); 
			copyArgs(msg,"greengrassGroupId",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createRobot(params,cb);
		}

		
		service.CreateRobotApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"sources",params,undefined,true); 
			copyArgs(n,"robotSoftwareSuite",params,undefined,true); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"sources",params,undefined,true); 
			copyArgs(n,"robotSoftwareSuite",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"sources",params,undefined,true); 
			copyArgs(msg,"robotSoftwareSuite",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createRobotApplication(params,cb);
		}

		
		service.CreateRobotApplicationVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"application",params,undefined,false); 
			
			copyArgs(n,"application",params,undefined,false); 
			copyArgs(n,"currentRevisionId",params,undefined,false); 
			
			copyArgs(msg,"application",params,undefined,false); 
			copyArgs(msg,"currentRevisionId",params,undefined,false); 
			

			svc.createRobotApplicationVersion(params,cb);
		}

		
		service.CreateSimulationApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"sources",params,undefined,true); 
			copyArgs(n,"simulationSoftwareSuite",params,undefined,true); 
			copyArgs(n,"robotSoftwareSuite",params,undefined,true); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"sources",params,undefined,true); 
			copyArgs(n,"simulationSoftwareSuite",params,undefined,true); 
			copyArgs(n,"robotSoftwareSuite",params,undefined,true); 
			copyArgs(n,"renderingEngine",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"sources",params,undefined,true); 
			copyArgs(msg,"simulationSoftwareSuite",params,undefined,true); 
			copyArgs(msg,"robotSoftwareSuite",params,undefined,true); 
			copyArgs(msg,"renderingEngine",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createSimulationApplication(params,cb);
		}

		
		service.CreateSimulationApplicationVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"application",params,undefined,false); 
			
			copyArgs(n,"application",params,undefined,false); 
			copyArgs(n,"currentRevisionId",params,undefined,false); 
			
			copyArgs(msg,"application",params,undefined,false); 
			copyArgs(msg,"currentRevisionId",params,undefined,false); 
			

			svc.createSimulationApplicationVersion(params,cb);
		}

		
		service.CreateSimulationJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"maxJobDurationInSeconds",params,undefined,false); 
			copyArgs(n,"iamRole",params,undefined,false); 
			
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			copyArgs(n,"outputLocation",params,undefined,true); 
			copyArgs(n,"loggingConfig",params,undefined,true); 
			copyArgs(n,"maxJobDurationInSeconds",params,undefined,false); 
			copyArgs(n,"iamRole",params,undefined,false); 
			copyArgs(n,"failureBehavior",params,undefined,false); 
			copyArgs(n,"robotApplications",params,undefined,true); 
			copyArgs(n,"simulationApplications",params,undefined,true); 
			copyArgs(n,"dataSources",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"vpcConfig",params,undefined,true); 
			copyArgs(n,"compute",params,undefined,true); 
			
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			copyArgs(msg,"outputLocation",params,undefined,true); 
			copyArgs(msg,"loggingConfig",params,undefined,true); 
			copyArgs(msg,"maxJobDurationInSeconds",params,undefined,false); 
			copyArgs(msg,"iamRole",params,undefined,false); 
			copyArgs(msg,"failureBehavior",params,undefined,false); 
			copyArgs(msg,"robotApplications",params,undefined,true); 
			copyArgs(msg,"simulationApplications",params,undefined,true); 
			copyArgs(msg,"dataSources",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"vpcConfig",params,undefined,true); 
			copyArgs(msg,"compute",params,undefined,true); 
			

			svc.createSimulationJob(params,cb);
		}

		
		service.CreateWorldExportJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"worlds",params,undefined,true); 
			copyArgs(n,"outputLocation",params,undefined,true); 
			copyArgs(n,"iamRole",params,undefined,false); 
			
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			copyArgs(n,"worlds",params,undefined,true); 
			copyArgs(n,"outputLocation",params,undefined,true); 
			copyArgs(n,"iamRole",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			copyArgs(msg,"worlds",params,undefined,true); 
			copyArgs(msg,"outputLocation",params,undefined,true); 
			copyArgs(msg,"iamRole",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createWorldExportJob(params,cb);
		}

		
		service.CreateWorldGenerationJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"template",params,undefined,false); 
			copyArgs(n,"worldCount",params,undefined,true); 
			
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			copyArgs(n,"template",params,undefined,false); 
			copyArgs(n,"worldCount",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"worldTags",params,undefined,true); 
			
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			copyArgs(msg,"template",params,undefined,false); 
			copyArgs(msg,"worldCount",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"worldTags",params,undefined,true); 
			

			svc.createWorldGenerationJob(params,cb);
		}

		
		service.CreateWorldTemplate=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"templateBody",params,undefined,false); 
			copyArgs(n,"templateLocation",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"templateBody",params,undefined,false); 
			copyArgs(msg,"templateLocation",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createWorldTemplate(params,cb);
		}

		
		service.DeleteFleet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"fleet",params,undefined,false); 
			
			copyArgs(n,"fleet",params,undefined,false); 
			
			copyArgs(msg,"fleet",params,undefined,false); 
			

			svc.deleteFleet(params,cb);
		}

		
		service.DeleteRobot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"robot",params,undefined,false); 
			
			copyArgs(n,"robot",params,undefined,false); 
			
			copyArgs(msg,"robot",params,undefined,false); 
			

			svc.deleteRobot(params,cb);
		}

		
		service.DeleteRobotApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"application",params,undefined,false); 
			
			copyArgs(n,"application",params,undefined,false); 
			copyArgs(n,"applicationVersion",params,undefined,false); 
			
			copyArgs(msg,"application",params,undefined,false); 
			copyArgs(msg,"applicationVersion",params,undefined,false); 
			

			svc.deleteRobotApplication(params,cb);
		}

		
		service.DeleteSimulationApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"application",params,undefined,false); 
			
			copyArgs(n,"application",params,undefined,false); 
			copyArgs(n,"applicationVersion",params,undefined,false); 
			
			copyArgs(msg,"application",params,undefined,false); 
			copyArgs(msg,"applicationVersion",params,undefined,false); 
			

			svc.deleteSimulationApplication(params,cb);
		}

		
		service.DeleteWorldTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"template",params,undefined,false); 
			
			copyArgs(n,"template",params,undefined,false); 
			
			copyArgs(msg,"template",params,undefined,false); 
			

			svc.deleteWorldTemplate(params,cb);
		}

		
		service.DeregisterRobot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"fleet",params,undefined,false); 
			copyArgs(n,"robot",params,undefined,false); 
			
			copyArgs(n,"fleet",params,undefined,false); 
			copyArgs(n,"robot",params,undefined,false); 
			
			copyArgs(msg,"fleet",params,undefined,false); 
			copyArgs(msg,"robot",params,undefined,false); 
			

			svc.deregisterRobot(params,cb);
		}

		
		service.DescribeDeploymentJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"job",params,undefined,false); 
			
			copyArgs(n,"job",params,undefined,false); 
			
			copyArgs(msg,"job",params,undefined,false); 
			

			svc.describeDeploymentJob(params,cb);
		}

		
		service.DescribeFleet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"fleet",params,undefined,false); 
			
			copyArgs(n,"fleet",params,undefined,false); 
			
			copyArgs(msg,"fleet",params,undefined,false); 
			

			svc.describeFleet(params,cb);
		}

		
		service.DescribeRobot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"robot",params,undefined,false); 
			
			copyArgs(n,"robot",params,undefined,false); 
			
			copyArgs(msg,"robot",params,undefined,false); 
			

			svc.describeRobot(params,cb);
		}

		
		service.DescribeRobotApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"application",params,undefined,false); 
			
			copyArgs(n,"application",params,undefined,false); 
			copyArgs(n,"applicationVersion",params,undefined,false); 
			
			copyArgs(msg,"application",params,undefined,false); 
			copyArgs(msg,"applicationVersion",params,undefined,false); 
			

			svc.describeRobotApplication(params,cb);
		}

		
		service.DescribeSimulationApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"application",params,undefined,false); 
			
			copyArgs(n,"application",params,undefined,false); 
			copyArgs(n,"applicationVersion",params,undefined,false); 
			
			copyArgs(msg,"application",params,undefined,false); 
			copyArgs(msg,"applicationVersion",params,undefined,false); 
			

			svc.describeSimulationApplication(params,cb);
		}

		
		service.DescribeSimulationJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"job",params,undefined,false); 
			
			copyArgs(n,"job",params,undefined,false); 
			
			copyArgs(msg,"job",params,undefined,false); 
			

			svc.describeSimulationJob(params,cb);
		}

		
		service.DescribeSimulationJobBatch=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"batch",params,undefined,false); 
			
			copyArgs(n,"batch",params,undefined,false); 
			
			copyArgs(msg,"batch",params,undefined,false); 
			

			svc.describeSimulationJobBatch(params,cb);
		}

		
		service.DescribeWorld=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"world",params,undefined,false); 
			
			copyArgs(n,"world",params,undefined,false); 
			
			copyArgs(msg,"world",params,undefined,false); 
			

			svc.describeWorld(params,cb);
		}

		
		service.DescribeWorldExportJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"job",params,undefined,false); 
			
			copyArgs(n,"job",params,undefined,false); 
			
			copyArgs(msg,"job",params,undefined,false); 
			

			svc.describeWorldExportJob(params,cb);
		}

		
		service.DescribeWorldGenerationJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"job",params,undefined,false); 
			
			copyArgs(n,"job",params,undefined,false); 
			
			copyArgs(msg,"job",params,undefined,false); 
			

			svc.describeWorldGenerationJob(params,cb);
		}

		
		service.DescribeWorldTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"template",params,undefined,false); 
			
			copyArgs(n,"template",params,undefined,false); 
			
			copyArgs(msg,"template",params,undefined,false); 
			

			svc.describeWorldTemplate(params,cb);
		}

		
		service.GetWorldTemplateBody=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"template",params,undefined,false); 
			copyArgs(n,"generationJob",params,undefined,false); 
			
			copyArgs(msg,"template",params,undefined,false); 
			copyArgs(msg,"generationJob",params,undefined,false); 
			

			svc.getWorldTemplateBody(params,cb);
		}

		
		service.ListDeploymentJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"filters",params,undefined,true); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"filters",params,undefined,true); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listDeploymentJobs(params,cb);
		}

		
		service.ListFleets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"filters",params,undefined,true); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"filters",params,undefined,true); 
			

			svc.listFleets(params,cb);
		}

		
		service.ListRobotApplications=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"versionQualifier",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"filters",params,undefined,true); 
			
			copyArgs(msg,"versionQualifier",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"filters",params,undefined,true); 
			

			svc.listRobotApplications(params,cb);
		}

		
		service.ListRobots=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"filters",params,undefined,true); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"filters",params,undefined,true); 
			

			svc.listRobots(params,cb);
		}

		
		service.ListSimulationApplications=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"versionQualifier",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"filters",params,undefined,true); 
			
			copyArgs(msg,"versionQualifier",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"filters",params,undefined,true); 
			

			svc.listSimulationApplications(params,cb);
		}

		
		service.ListSimulationJobBatches=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"filters",params,undefined,true); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"filters",params,undefined,true); 
			

			svc.listSimulationJobBatches(params,cb);
		}

		
		service.ListSimulationJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"filters",params,undefined,true); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"filters",params,undefined,true); 
			

			svc.listSimulationJobs(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListWorldExportJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"filters",params,undefined,true); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"filters",params,undefined,true); 
			

			svc.listWorldExportJobs(params,cb);
		}

		
		service.ListWorldGenerationJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"filters",params,undefined,true); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"filters",params,undefined,true); 
			

			svc.listWorldGenerationJobs(params,cb);
		}

		
		service.ListWorldTemplates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listWorldTemplates(params,cb);
		}

		
		service.ListWorlds=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"filters",params,undefined,true); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"filters",params,undefined,true); 
			

			svc.listWorlds(params,cb);
		}

		
		service.RegisterRobot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"fleet",params,undefined,false); 
			copyArgs(n,"robot",params,undefined,false); 
			
			copyArgs(n,"fleet",params,undefined,false); 
			copyArgs(n,"robot",params,undefined,false); 
			
			copyArgs(msg,"fleet",params,undefined,false); 
			copyArgs(msg,"robot",params,undefined,false); 
			

			svc.registerRobot(params,cb);
		}

		
		service.RestartSimulationJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"job",params,undefined,false); 
			
			copyArgs(n,"job",params,undefined,false); 
			
			copyArgs(msg,"job",params,undefined,false); 
			

			svc.restartSimulationJob(params,cb);
		}

		
		service.StartSimulationJobBatch=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"createSimulationJobRequests",params,undefined,true); 
			
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			copyArgs(n,"batchPolicy",params,undefined,true); 
			copyArgs(n,"createSimulationJobRequests",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			copyArgs(msg,"batchPolicy",params,undefined,true); 
			copyArgs(msg,"createSimulationJobRequests",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.startSimulationJobBatch(params,cb);
		}

		
		service.SyncDeploymentJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			copyArgs(n,"fleet",params,undefined,false); 
			
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			copyArgs(n,"fleet",params,undefined,false); 
			
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			copyArgs(msg,"fleet",params,undefined,false); 
			

			svc.syncDeploymentJob(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateRobotApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"application",params,undefined,false); 
			copyArgs(n,"sources",params,undefined,true); 
			copyArgs(n,"robotSoftwareSuite",params,undefined,true); 
			
			copyArgs(n,"application",params,undefined,false); 
			copyArgs(n,"sources",params,undefined,true); 
			copyArgs(n,"robotSoftwareSuite",params,undefined,true); 
			copyArgs(n,"currentRevisionId",params,undefined,false); 
			
			copyArgs(msg,"application",params,undefined,false); 
			copyArgs(msg,"sources",params,undefined,true); 
			copyArgs(msg,"robotSoftwareSuite",params,undefined,true); 
			copyArgs(msg,"currentRevisionId",params,undefined,false); 
			

			svc.updateRobotApplication(params,cb);
		}

		
		service.UpdateSimulationApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"application",params,undefined,false); 
			copyArgs(n,"sources",params,undefined,true); 
			copyArgs(n,"simulationSoftwareSuite",params,undefined,true); 
			copyArgs(n,"robotSoftwareSuite",params,undefined,true); 
			
			copyArgs(n,"application",params,undefined,false); 
			copyArgs(n,"sources",params,undefined,true); 
			copyArgs(n,"simulationSoftwareSuite",params,undefined,true); 
			copyArgs(n,"robotSoftwareSuite",params,undefined,true); 
			copyArgs(n,"renderingEngine",params,undefined,true); 
			copyArgs(n,"currentRevisionId",params,undefined,false); 
			
			copyArgs(msg,"application",params,undefined,false); 
			copyArgs(msg,"sources",params,undefined,true); 
			copyArgs(msg,"simulationSoftwareSuite",params,undefined,true); 
			copyArgs(msg,"robotSoftwareSuite",params,undefined,true); 
			copyArgs(msg,"renderingEngine",params,undefined,true); 
			copyArgs(msg,"currentRevisionId",params,undefined,false); 
			

			svc.updateSimulationApplication(params,cb);
		}

		
		service.UpdateWorldTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"template",params,undefined,false); 
			
			copyArgs(n,"template",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"templateBody",params,undefined,false); 
			copyArgs(n,"templateLocation",params,undefined,true); 
			
			copyArgs(msg,"template",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"templateBody",params,undefined,false); 
			copyArgs(msg,"templateLocation",params,undefined,true); 
			

			svc.updateWorldTemplate(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS RoboMaker", AmazonAPINode);

};
