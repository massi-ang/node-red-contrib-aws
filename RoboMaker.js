
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

		var awsService = new AWS.RoboMaker( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.RoboMaker(msg.AWSConfig) : awsService;

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

		
		service.BatchDeleteWorlds=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"worlds",params,undefined,true); 
			
			copyArg(msg,"worlds",params,undefined,true); 
			

			svc.batchDeleteWorlds(params,cb);
		}

		
		service.BatchDescribeSimulationJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobs",params,undefined,true); 
			
			copyArg(msg,"jobs",params,undefined,true); 
			

			svc.batchDescribeSimulationJob(params,cb);
		}

		
		service.CancelDeploymentJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"job",params,undefined,false); 
			
			copyArg(msg,"job",params,undefined,false); 
			

			svc.cancelDeploymentJob(params,cb);
		}

		
		service.CancelSimulationJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"job",params,undefined,false); 
			
			copyArg(msg,"job",params,undefined,false); 
			

			svc.cancelSimulationJob(params,cb);
		}

		
		service.CancelSimulationJobBatch=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"batch",params,undefined,false); 
			
			copyArg(msg,"batch",params,undefined,false); 
			

			svc.cancelSimulationJobBatch(params,cb);
		}

		
		service.CancelWorldExportJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"job",params,undefined,false); 
			
			copyArg(msg,"job",params,undefined,false); 
			

			svc.cancelWorldExportJob(params,cb);
		}

		
		service.CancelWorldGenerationJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"job",params,undefined,false); 
			
			copyArg(msg,"job",params,undefined,false); 
			

			svc.cancelWorldGenerationJob(params,cb);
		}

		
		service.CreateDeploymentJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"clientRequestToken",params,undefined,false); 
			copyArg(n,"fleet",params,undefined,false); 
			copyArg(n,"deploymentApplicationConfigs",params,undefined,true); 
			
			copyArg(msg,"deploymentConfig",params,undefined,true); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			copyArg(msg,"fleet",params,undefined,false); 
			copyArg(msg,"deploymentApplicationConfigs",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createDeploymentJob(params,cb);
		}

		
		service.CreateFleet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createFleet(params,cb);
		}

		
		service.CreateRobot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"architecture",params,undefined,false); 
			copyArg(n,"greengrassGroupId",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"architecture",params,undefined,false); 
			copyArg(msg,"greengrassGroupId",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createRobot(params,cb);
		}

		
		service.CreateRobotApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"sources",params,undefined,true); 
			copyArg(n,"robotSoftwareSuite",params,undefined,true); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"sources",params,undefined,true); 
			copyArg(msg,"robotSoftwareSuite",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createRobotApplication(params,cb);
		}

		
		service.CreateRobotApplicationVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"application",params,undefined,false); 
			
			copyArg(msg,"application",params,undefined,false); 
			copyArg(msg,"currentRevisionId",params,undefined,false); 
			

			svc.createRobotApplicationVersion(params,cb);
		}

		
		service.CreateSimulationApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"sources",params,undefined,true); 
			copyArg(n,"simulationSoftwareSuite",params,undefined,true); 
			copyArg(n,"robotSoftwareSuite",params,undefined,true); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"sources",params,undefined,true); 
			copyArg(msg,"simulationSoftwareSuite",params,undefined,true); 
			copyArg(msg,"robotSoftwareSuite",params,undefined,true); 
			copyArg(msg,"renderingEngine",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createSimulationApplication(params,cb);
		}

		
		service.CreateSimulationApplicationVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"application",params,undefined,false); 
			
			copyArg(msg,"application",params,undefined,false); 
			copyArg(msg,"currentRevisionId",params,undefined,false); 
			

			svc.createSimulationApplicationVersion(params,cb);
		}

		
		service.CreateSimulationJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"maxJobDurationInSeconds",params,undefined,false); 
			copyArg(n,"iamRole",params,undefined,false); 
			
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			copyArg(msg,"outputLocation",params,undefined,true); 
			copyArg(msg,"loggingConfig",params,undefined,true); 
			copyArg(msg,"maxJobDurationInSeconds",params,undefined,false); 
			copyArg(msg,"iamRole",params,undefined,false); 
			copyArg(msg,"failureBehavior",params,undefined,false); 
			copyArg(msg,"robotApplications",params,undefined,true); 
			copyArg(msg,"simulationApplications",params,undefined,true); 
			copyArg(msg,"dataSources",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"vpcConfig",params,undefined,true); 
			copyArg(msg,"compute",params,undefined,true); 
			

			svc.createSimulationJob(params,cb);
		}

		
		service.CreateWorldExportJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"worlds",params,undefined,true); 
			copyArg(n,"outputLocation",params,undefined,true); 
			copyArg(n,"iamRole",params,undefined,false); 
			
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			copyArg(msg,"worlds",params,undefined,true); 
			copyArg(msg,"outputLocation",params,undefined,true); 
			copyArg(msg,"iamRole",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createWorldExportJob(params,cb);
		}

		
		service.CreateWorldGenerationJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"template",params,undefined,false); 
			copyArg(n,"worldCount",params,undefined,true); 
			
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			copyArg(msg,"template",params,undefined,false); 
			copyArg(msg,"worldCount",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"worldTags",params,undefined,true); 
			

			svc.createWorldGenerationJob(params,cb);
		}

		
		service.CreateWorldTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"templateBody",params,undefined,false); 
			copyArg(msg,"templateLocation",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createWorldTemplate(params,cb);
		}

		
		service.DeleteFleet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"fleet",params,undefined,false); 
			
			copyArg(msg,"fleet",params,undefined,false); 
			

			svc.deleteFleet(params,cb);
		}

		
		service.DeleteRobot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"robot",params,undefined,false); 
			
			copyArg(msg,"robot",params,undefined,false); 
			

			svc.deleteRobot(params,cb);
		}

		
		service.DeleteRobotApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"application",params,undefined,false); 
			
			copyArg(msg,"application",params,undefined,false); 
			copyArg(msg,"applicationVersion",params,undefined,false); 
			

			svc.deleteRobotApplication(params,cb);
		}

		
		service.DeleteSimulationApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"application",params,undefined,false); 
			
			copyArg(msg,"application",params,undefined,false); 
			copyArg(msg,"applicationVersion",params,undefined,false); 
			

			svc.deleteSimulationApplication(params,cb);
		}

		
		service.DeleteWorldTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"template",params,undefined,false); 
			
			copyArg(msg,"template",params,undefined,false); 
			

			svc.deleteWorldTemplate(params,cb);
		}

		
		service.DeregisterRobot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"fleet",params,undefined,false); 
			copyArg(n,"robot",params,undefined,false); 
			
			copyArg(msg,"fleet",params,undefined,false); 
			copyArg(msg,"robot",params,undefined,false); 
			

			svc.deregisterRobot(params,cb);
		}

		
		service.DescribeDeploymentJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"job",params,undefined,false); 
			
			copyArg(msg,"job",params,undefined,false); 
			

			svc.describeDeploymentJob(params,cb);
		}

		
		service.DescribeFleet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"fleet",params,undefined,false); 
			
			copyArg(msg,"fleet",params,undefined,false); 
			

			svc.describeFleet(params,cb);
		}

		
		service.DescribeRobot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"robot",params,undefined,false); 
			
			copyArg(msg,"robot",params,undefined,false); 
			

			svc.describeRobot(params,cb);
		}

		
		service.DescribeRobotApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"application",params,undefined,false); 
			
			copyArg(msg,"application",params,undefined,false); 
			copyArg(msg,"applicationVersion",params,undefined,false); 
			

			svc.describeRobotApplication(params,cb);
		}

		
		service.DescribeSimulationApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"application",params,undefined,false); 
			
			copyArg(msg,"application",params,undefined,false); 
			copyArg(msg,"applicationVersion",params,undefined,false); 
			

			svc.describeSimulationApplication(params,cb);
		}

		
		service.DescribeSimulationJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"job",params,undefined,false); 
			
			copyArg(msg,"job",params,undefined,false); 
			

			svc.describeSimulationJob(params,cb);
		}

		
		service.DescribeSimulationJobBatch=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"batch",params,undefined,false); 
			
			copyArg(msg,"batch",params,undefined,false); 
			

			svc.describeSimulationJobBatch(params,cb);
		}

		
		service.DescribeWorld=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"world",params,undefined,false); 
			
			copyArg(msg,"world",params,undefined,false); 
			

			svc.describeWorld(params,cb);
		}

		
		service.DescribeWorldExportJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"job",params,undefined,false); 
			
			copyArg(msg,"job",params,undefined,false); 
			

			svc.describeWorldExportJob(params,cb);
		}

		
		service.DescribeWorldGenerationJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"job",params,undefined,false); 
			
			copyArg(msg,"job",params,undefined,false); 
			

			svc.describeWorldGenerationJob(params,cb);
		}

		
		service.DescribeWorldTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"template",params,undefined,false); 
			
			copyArg(msg,"template",params,undefined,false); 
			

			svc.describeWorldTemplate(params,cb);
		}

		
		service.GetWorldTemplateBody=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"template",params,undefined,false); 
			copyArg(msg,"generationJob",params,undefined,false); 
			

			svc.getWorldTemplateBody(params,cb);
		}

		
		service.ListDeploymentJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"filters",params,undefined,true); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listDeploymentJobs(params,cb);
		}

		
		service.ListFleets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"filters",params,undefined,true); 
			

			svc.listFleets(params,cb);
		}

		
		service.ListRobotApplications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"versionQualifier",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"filters",params,undefined,true); 
			

			svc.listRobotApplications(params,cb);
		}

		
		service.ListRobots=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"filters",params,undefined,true); 
			

			svc.listRobots(params,cb);
		}

		
		service.ListSimulationApplications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"versionQualifier",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"filters",params,undefined,true); 
			

			svc.listSimulationApplications(params,cb);
		}

		
		service.ListSimulationJobBatches=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"filters",params,undefined,true); 
			

			svc.listSimulationJobBatches(params,cb);
		}

		
		service.ListSimulationJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"filters",params,undefined,true); 
			

			svc.listSimulationJobs(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListWorldExportJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"filters",params,undefined,true); 
			

			svc.listWorldExportJobs(params,cb);
		}

		
		service.ListWorldGenerationJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"filters",params,undefined,true); 
			

			svc.listWorldGenerationJobs(params,cb);
		}

		
		service.ListWorldTemplates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listWorldTemplates(params,cb);
		}

		
		service.ListWorlds=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"filters",params,undefined,true); 
			

			svc.listWorlds(params,cb);
		}

		
		service.RegisterRobot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"fleet",params,undefined,false); 
			copyArg(n,"robot",params,undefined,false); 
			
			copyArg(msg,"fleet",params,undefined,false); 
			copyArg(msg,"robot",params,undefined,false); 
			

			svc.registerRobot(params,cb);
		}

		
		service.RestartSimulationJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"job",params,undefined,false); 
			
			copyArg(msg,"job",params,undefined,false); 
			

			svc.restartSimulationJob(params,cb);
		}

		
		service.StartSimulationJobBatch=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"createSimulationJobRequests",params,undefined,true); 
			
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			copyArg(msg,"batchPolicy",params,undefined,true); 
			copyArg(msg,"createSimulationJobRequests",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.startSimulationJobBatch(params,cb);
		}

		
		service.SyncDeploymentJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"clientRequestToken",params,undefined,false); 
			copyArg(n,"fleet",params,undefined,false); 
			
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			copyArg(msg,"fleet",params,undefined,false); 
			

			svc.syncDeploymentJob(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"tags",params,undefined,true); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"tagKeys",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateRobotApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"application",params,undefined,false); 
			copyArg(n,"sources",params,undefined,true); 
			copyArg(n,"robotSoftwareSuite",params,undefined,true); 
			
			copyArg(msg,"application",params,undefined,false); 
			copyArg(msg,"sources",params,undefined,true); 
			copyArg(msg,"robotSoftwareSuite",params,undefined,true); 
			copyArg(msg,"currentRevisionId",params,undefined,false); 
			

			svc.updateRobotApplication(params,cb);
		}

		
		service.UpdateSimulationApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"application",params,undefined,false); 
			copyArg(n,"sources",params,undefined,true); 
			copyArg(n,"simulationSoftwareSuite",params,undefined,true); 
			copyArg(n,"robotSoftwareSuite",params,undefined,true); 
			
			copyArg(msg,"application",params,undefined,false); 
			copyArg(msg,"sources",params,undefined,true); 
			copyArg(msg,"simulationSoftwareSuite",params,undefined,true); 
			copyArg(msg,"robotSoftwareSuite",params,undefined,true); 
			copyArg(msg,"renderingEngine",params,undefined,true); 
			copyArg(msg,"currentRevisionId",params,undefined,false); 
			

			svc.updateSimulationApplication(params,cb);
		}

		
		service.UpdateWorldTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"template",params,undefined,false); 
			
			copyArg(msg,"template",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"templateBody",params,undefined,false); 
			copyArg(msg,"templateLocation",params,undefined,true); 
			

			svc.updateWorldTemplate(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS RoboMaker", AmazonAPINode);

};
