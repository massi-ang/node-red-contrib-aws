
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

		var awsService = new AWS.AppConfig( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.AppConfig(msg.AWSConfig) : awsService;

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

		
		service.CreateApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createApplication(params,cb);
		}

		
		service.CreateConfigurationProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"LocationUri",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"LocationUri",params,undefined,false); 
			copyArg(msg,"RetrievalRoleArn",params,undefined,false); 
			copyArg(msg,"Validators",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createConfigurationProfile(params,cb);
		}

		
		service.CreateDeploymentStrategy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"DeploymentDurationInMinutes",params,undefined,false); 
			copyArg(n,"GrowthFactor",params,undefined,false); 
			copyArg(n,"ReplicateTo",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DeploymentDurationInMinutes",params,undefined,false); 
			copyArg(msg,"FinalBakeTimeInMinutes",params,undefined,false); 
			copyArg(msg,"GrowthFactor",params,undefined,false); 
			copyArg(msg,"GrowthType",params,undefined,false); 
			copyArg(msg,"ReplicateTo",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createDeploymentStrategy(params,cb);
		}

		
		service.CreateEnvironment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Monitors",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createEnvironment(params,cb);
		}

		
		service.CreateHostedConfigurationVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			copyArg(n,"ConfigurationProfileId",params,undefined,false); 
			copyArg(n,"Content",params,undefined,true); 
			copyArg(n,"ContentType",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"ConfigurationProfileId",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Content",params,undefined,true); 
			copyArg(msg,"ContentType",params,undefined,false); 
			copyArg(msg,"LatestVersionNumber",params,undefined,false); 
			

			svc.createHostedConfigurationVersion(params,cb);
		}

		
		service.DeleteApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			

			svc.deleteApplication(params,cb);
		}

		
		service.DeleteConfigurationProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			copyArg(n,"ConfigurationProfileId",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"ConfigurationProfileId",params,undefined,false); 
			

			svc.deleteConfigurationProfile(params,cb);
		}

		
		service.DeleteDeploymentStrategy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeploymentStrategyId",params,undefined,false); 
			
			copyArg(msg,"DeploymentStrategyId",params,undefined,false); 
			

			svc.deleteDeploymentStrategy(params,cb);
		}

		
		service.DeleteEnvironment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			copyArg(n,"EnvironmentId",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"EnvironmentId",params,undefined,false); 
			

			svc.deleteEnvironment(params,cb);
		}

		
		service.DeleteHostedConfigurationVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			copyArg(n,"ConfigurationProfileId",params,undefined,false); 
			copyArg(n,"VersionNumber",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"ConfigurationProfileId",params,undefined,false); 
			copyArg(msg,"VersionNumber",params,undefined,false); 
			

			svc.deleteHostedConfigurationVersion(params,cb);
		}

		
		service.GetApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			

			svc.getApplication(params,cb);
		}

		
		service.GetConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Application",params,undefined,false); 
			copyArg(n,"Environment",params,undefined,false); 
			copyArg(n,"Configuration",params,undefined,false); 
			copyArg(n,"ClientId",params,undefined,false); 
			
			copyArg(msg,"Application",params,undefined,false); 
			copyArg(msg,"Environment",params,undefined,false); 
			copyArg(msg,"Configuration",params,undefined,false); 
			copyArg(msg,"ClientId",params,undefined,false); 
			copyArg(msg,"ClientConfigurationVersion",params,undefined,false); 
			

			svc.getConfiguration(params,cb);
		}

		
		service.GetConfigurationProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			copyArg(n,"ConfigurationProfileId",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"ConfigurationProfileId",params,undefined,false); 
			

			svc.getConfigurationProfile(params,cb);
		}

		
		service.GetDeployment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			copyArg(n,"EnvironmentId",params,undefined,false); 
			copyArg(n,"DeploymentNumber",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"EnvironmentId",params,undefined,false); 
			copyArg(msg,"DeploymentNumber",params,undefined,false); 
			

			svc.getDeployment(params,cb);
		}

		
		service.GetDeploymentStrategy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeploymentStrategyId",params,undefined,false); 
			
			copyArg(msg,"DeploymentStrategyId",params,undefined,false); 
			

			svc.getDeploymentStrategy(params,cb);
		}

		
		service.GetEnvironment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			copyArg(n,"EnvironmentId",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"EnvironmentId",params,undefined,false); 
			

			svc.getEnvironment(params,cb);
		}

		
		service.GetHostedConfigurationVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			copyArg(n,"ConfigurationProfileId",params,undefined,false); 
			copyArg(n,"VersionNumber",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"ConfigurationProfileId",params,undefined,false); 
			copyArg(msg,"VersionNumber",params,undefined,false); 
			

			svc.getHostedConfigurationVersion(params,cb);
		}

		
		service.ListApplications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listApplications(params,cb);
		}

		
		service.ListConfigurationProfiles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listConfigurationProfiles(params,cb);
		}

		
		service.ListDeploymentStrategies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listDeploymentStrategies(params,cb);
		}

		
		service.ListDeployments=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			copyArg(n,"EnvironmentId",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"EnvironmentId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listDeployments(params,cb);
		}

		
		service.ListEnvironments=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listEnvironments(params,cb);
		}

		
		service.ListHostedConfigurationVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			copyArg(n,"ConfigurationProfileId",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"ConfigurationProfileId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listHostedConfigurationVersions(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.StartDeployment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			copyArg(n,"EnvironmentId",params,undefined,false); 
			copyArg(n,"DeploymentStrategyId",params,undefined,false); 
			copyArg(n,"ConfigurationProfileId",params,undefined,false); 
			copyArg(n,"ConfigurationVersion",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"EnvironmentId",params,undefined,false); 
			copyArg(msg,"DeploymentStrategyId",params,undefined,false); 
			copyArg(msg,"ConfigurationProfileId",params,undefined,false); 
			copyArg(msg,"ConfigurationVersion",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.startDeployment(params,cb);
		}

		
		service.StopDeployment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			copyArg(n,"EnvironmentId",params,undefined,false); 
			copyArg(n,"DeploymentNumber",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"EnvironmentId",params,undefined,false); 
			copyArg(msg,"DeploymentNumber",params,undefined,false); 
			

			svc.stopDeployment(params,cb);
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

		
		service.UpdateApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			

			svc.updateApplication(params,cb);
		}

		
		service.UpdateConfigurationProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			copyArg(n,"ConfigurationProfileId",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"ConfigurationProfileId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"RetrievalRoleArn",params,undefined,false); 
			copyArg(msg,"Validators",params,undefined,true); 
			

			svc.updateConfigurationProfile(params,cb);
		}

		
		service.UpdateDeploymentStrategy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeploymentStrategyId",params,undefined,false); 
			
			copyArg(msg,"DeploymentStrategyId",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DeploymentDurationInMinutes",params,undefined,false); 
			copyArg(msg,"FinalBakeTimeInMinutes",params,undefined,false); 
			copyArg(msg,"GrowthFactor",params,undefined,false); 
			copyArg(msg,"GrowthType",params,undefined,false); 
			

			svc.updateDeploymentStrategy(params,cb);
		}

		
		service.UpdateEnvironment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			copyArg(n,"EnvironmentId",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"EnvironmentId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Monitors",params,undefined,true); 
			

			svc.updateEnvironment(params,cb);
		}

		
		service.ValidateConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			copyArg(n,"ConfigurationProfileId",params,undefined,false); 
			copyArg(n,"ConfigurationVersion",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"ConfigurationProfileId",params,undefined,false); 
			copyArg(msg,"ConfigurationVersion",params,undefined,false); 
			

			svc.validateConfiguration(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS AppConfig", AmazonAPINode);

};
