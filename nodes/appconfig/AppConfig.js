
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

		var awsService = new AWS.AppConfig( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.AppConfig(msg.AWSConfig) : awsService;

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
		
		service.CreateApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createApplication(params,cb);
		}
		
		service.CreateConfigurationProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"LocationUri",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"LocationUri",params,undefined,false); 
			copyArgs(n,"RetrievalRoleArn",params,undefined,false); 
			copyArgs(n,"Validators",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"LocationUri",params,undefined,false); 
			copyArgs(msg,"RetrievalRoleArn",params,undefined,false); 
			copyArgs(msg,"Validators",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createConfigurationProfile(params,cb);
		}
		
		service.CreateDeploymentStrategy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(Number(n),"DeploymentDurationInMinutes",params,undefined,false); 
			copyArgs(n,"GrowthFactor",params,undefined,false); 
			copyArgs(n,"ReplicateTo",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(Number(n),"DeploymentDurationInMinutes",params,undefined,false); 
			copyArgs(Number(n),"FinalBakeTimeInMinutes",params,undefined,false); 
			copyArgs(n,"GrowthFactor",params,undefined,false); 
			copyArgs(n,"GrowthType",params,undefined,false); 
			copyArgs(n,"ReplicateTo",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DeploymentDurationInMinutes",params,undefined,false); 
			copyArgs(msg,"FinalBakeTimeInMinutes",params,undefined,false); 
			copyArgs(msg,"GrowthFactor",params,undefined,false); 
			copyArgs(msg,"GrowthType",params,undefined,false); 
			copyArgs(msg,"ReplicateTo",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createDeploymentStrategy(params,cb);
		}
		
		service.CreateEnvironment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Monitors",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Monitors",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createEnvironment(params,cb);
		}
		
		service.CreateHostedConfigurationVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"ConfigurationProfileId",params,undefined,false); 
			copyArgs(n,"Content",params,undefined,true); 
			copyArgs(n,"ContentType",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"ConfigurationProfileId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Content",params,undefined,true); 
			copyArgs(n,"ContentType",params,undefined,false); 
			copyArgs(Number(n),"LatestVersionNumber",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"ConfigurationProfileId",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Content",params,undefined,true); 
			copyArgs(msg,"ContentType",params,undefined,false); 
			copyArgs(msg,"LatestVersionNumber",params,undefined,false); 
			

			svc.createHostedConfigurationVersion(params,cb);
		}
		
		service.DeleteApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.deleteApplication(params,cb);
		}
		
		service.DeleteConfigurationProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"ConfigurationProfileId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"ConfigurationProfileId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"ConfigurationProfileId",params,undefined,false); 
			

			svc.deleteConfigurationProfile(params,cb);
		}
		
		service.DeleteDeploymentStrategy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeploymentStrategyId",params,undefined,false); 
			
			copyArgs(n,"DeploymentStrategyId",params,undefined,false); 
			
			copyArgs(msg,"DeploymentStrategyId",params,undefined,false); 
			

			svc.deleteDeploymentStrategy(params,cb);
		}
		
		service.DeleteEnvironment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"EnvironmentId",params,undefined,false); 
			

			svc.deleteEnvironment(params,cb);
		}
		
		service.DeleteHostedConfigurationVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"ConfigurationProfileId",params,undefined,false); 
			copyArgs(Number(n),"VersionNumber",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"ConfigurationProfileId",params,undefined,false); 
			copyArgs(Number(n),"VersionNumber",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"ConfigurationProfileId",params,undefined,false); 
			copyArgs(msg,"VersionNumber",params,undefined,false); 
			

			svc.deleteHostedConfigurationVersion(params,cb);
		}
		
		service.GetApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.getApplication(params,cb);
		}
		
		service.GetConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Application",params,undefined,false); 
			copyArgs(n,"Environment",params,undefined,false); 
			copyArgs(n,"Configuration",params,undefined,false); 
			copyArgs(n,"ClientId",params,undefined,false); 
			
			copyArgs(n,"Application",params,undefined,false); 
			copyArgs(n,"Environment",params,undefined,false); 
			copyArgs(n,"Configuration",params,undefined,false); 
			copyArgs(n,"ClientId",params,undefined,false); 
			copyArgs(n,"ClientConfigurationVersion",params,undefined,false); 
			
			copyArgs(msg,"Application",params,undefined,false); 
			copyArgs(msg,"Environment",params,undefined,false); 
			copyArgs(msg,"Configuration",params,undefined,false); 
			copyArgs(msg,"ClientId",params,undefined,false); 
			copyArgs(msg,"ClientConfigurationVersion",params,undefined,false); 
			

			svc.getConfiguration(params,cb);
		}
		
		service.GetConfigurationProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"ConfigurationProfileId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"ConfigurationProfileId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"ConfigurationProfileId",params,undefined,false); 
			

			svc.getConfigurationProfile(params,cb);
		}
		
		service.GetDeployment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			copyArgs(Number(n),"DeploymentNumber",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			copyArgs(Number(n),"DeploymentNumber",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"EnvironmentId",params,undefined,false); 
			copyArgs(msg,"DeploymentNumber",params,undefined,false); 
			

			svc.getDeployment(params,cb);
		}
		
		service.GetDeploymentStrategy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeploymentStrategyId",params,undefined,false); 
			
			copyArgs(n,"DeploymentStrategyId",params,undefined,false); 
			
			copyArgs(msg,"DeploymentStrategyId",params,undefined,false); 
			

			svc.getDeploymentStrategy(params,cb);
		}
		
		service.GetEnvironment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"EnvironmentId",params,undefined,false); 
			

			svc.getEnvironment(params,cb);
		}
		
		service.GetHostedConfigurationVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"ConfigurationProfileId",params,undefined,false); 
			copyArgs(Number(n),"VersionNumber",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"ConfigurationProfileId",params,undefined,false); 
			copyArgs(Number(n),"VersionNumber",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"ConfigurationProfileId",params,undefined,false); 
			copyArgs(msg,"VersionNumber",params,undefined,false); 
			

			svc.getHostedConfigurationVersion(params,cb);
		}
		
		service.ListApplications=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listApplications(params,cb);
		}
		
		service.ListConfigurationProfiles=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listConfigurationProfiles(params,cb);
		}
		
		service.ListDeploymentStrategies=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listDeploymentStrategies(params,cb);
		}
		
		service.ListDeployments=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"EnvironmentId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listDeployments(params,cb);
		}
		
		service.ListEnvironments=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listEnvironments(params,cb);
		}
		
		service.ListHostedConfigurationVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"ConfigurationProfileId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"ConfigurationProfileId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"ConfigurationProfileId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listHostedConfigurationVersions(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.StartDeployment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			copyArgs(n,"DeploymentStrategyId",params,undefined,false); 
			copyArgs(n,"ConfigurationProfileId",params,undefined,false); 
			copyArgs(n,"ConfigurationVersion",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			copyArgs(n,"DeploymentStrategyId",params,undefined,false); 
			copyArgs(n,"ConfigurationProfileId",params,undefined,false); 
			copyArgs(n,"ConfigurationVersion",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"EnvironmentId",params,undefined,false); 
			copyArgs(msg,"DeploymentStrategyId",params,undefined,false); 
			copyArgs(msg,"ConfigurationProfileId",params,undefined,false); 
			copyArgs(msg,"ConfigurationVersion",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.startDeployment(params,cb);
		}
		
		service.StopDeployment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			copyArgs(Number(n),"DeploymentNumber",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			copyArgs(Number(n),"DeploymentNumber",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"EnvironmentId",params,undefined,false); 
			copyArgs(msg,"DeploymentNumber",params,undefined,false); 
			

			svc.stopDeployment(params,cb);
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
		
		service.UpdateApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			

			svc.updateApplication(params,cb);
		}
		
		service.UpdateConfigurationProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"ConfigurationProfileId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"ConfigurationProfileId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"RetrievalRoleArn",params,undefined,false); 
			copyArgs(n,"Validators",params,undefined,true); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"ConfigurationProfileId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"RetrievalRoleArn",params,undefined,false); 
			copyArgs(msg,"Validators",params,undefined,true); 
			

			svc.updateConfigurationProfile(params,cb);
		}
		
		service.UpdateDeploymentStrategy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeploymentStrategyId",params,undefined,false); 
			
			copyArgs(n,"DeploymentStrategyId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(Number(n),"DeploymentDurationInMinutes",params,undefined,false); 
			copyArgs(Number(n),"FinalBakeTimeInMinutes",params,undefined,false); 
			copyArgs(n,"GrowthFactor",params,undefined,false); 
			copyArgs(n,"GrowthType",params,undefined,false); 
			
			copyArgs(msg,"DeploymentStrategyId",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DeploymentDurationInMinutes",params,undefined,false); 
			copyArgs(msg,"FinalBakeTimeInMinutes",params,undefined,false); 
			copyArgs(msg,"GrowthFactor",params,undefined,false); 
			copyArgs(msg,"GrowthType",params,undefined,false); 
			

			svc.updateDeploymentStrategy(params,cb);
		}
		
		service.UpdateEnvironment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Monitors",params,undefined,true); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"EnvironmentId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Monitors",params,undefined,true); 
			

			svc.updateEnvironment(params,cb);
		}
		
		service.ValidateConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"ConfigurationProfileId",params,undefined,false); 
			copyArgs(n,"ConfigurationVersion",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"ConfigurationProfileId",params,undefined,false); 
			copyArgs(n,"ConfigurationVersion",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"ConfigurationProfileId",params,undefined,false); 
			copyArgs(msg,"ConfigurationVersion",params,undefined,false); 
			

			svc.validateConfiguration(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS AppConfig", AmazonAPINode);

};
