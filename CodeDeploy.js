
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

		var awsService = new AWS.CodeDeploy( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.CodeDeploy(msg.AWSConfig) : awsService;

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

		
		service.AddTagsToOnPremisesInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"tags",params,undefined,true); 
			copyArg(n,"instanceNames",params,undefined,true); 
			
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"instanceNames",params,undefined,true); 
			

			svc.addTagsToOnPremisesInstances(params,cb);
		}

		
		service.BatchGetApplicationRevisions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"applicationName",params,undefined,false); 
			copyArg(n,"revisions",params,undefined,true); 
			
			copyArg(msg,"applicationName",params,undefined,false); 
			copyArg(msg,"revisions",params,undefined,true); 
			

			svc.batchGetApplicationRevisions(params,cb);
		}

		
		service.BatchGetApplications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"applicationNames",params,undefined,true); 
			
			copyArg(msg,"applicationNames",params,undefined,true); 
			

			svc.batchGetApplications(params,cb);
		}

		
		service.BatchGetDeploymentGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"applicationName",params,undefined,false); 
			copyArg(n,"deploymentGroupNames",params,undefined,true); 
			
			copyArg(msg,"applicationName",params,undefined,false); 
			copyArg(msg,"deploymentGroupNames",params,undefined,true); 
			

			svc.batchGetDeploymentGroups(params,cb);
		}

		
		service.BatchGetDeploymentInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"deploymentId",params,undefined,false); 
			copyArg(n,"instanceIds",params,undefined,true); 
			
			copyArg(msg,"deploymentId",params,undefined,false); 
			copyArg(msg,"instanceIds",params,undefined,true); 
			

			svc.batchGetDeploymentInstances(params,cb);
		}

		
		service.BatchGetDeploymentTargets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"deploymentId",params,undefined,false); 
			copyArg(msg,"targetIds",params,undefined,true); 
			

			svc.batchGetDeploymentTargets(params,cb);
		}

		
		service.BatchGetDeployments=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"deploymentIds",params,undefined,true); 
			
			copyArg(msg,"deploymentIds",params,undefined,true); 
			

			svc.batchGetDeployments(params,cb);
		}

		
		service.BatchGetOnPremisesInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"instanceNames",params,undefined,true); 
			
			copyArg(msg,"instanceNames",params,undefined,true); 
			

			svc.batchGetOnPremisesInstances(params,cb);
		}

		
		service.ContinueDeployment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"deploymentId",params,undefined,false); 
			copyArg(msg,"deploymentWaitType",params,undefined,false); 
			

			svc.continueDeployment(params,cb);
		}

		
		service.CreateApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"applicationName",params,undefined,false); 
			
			copyArg(msg,"applicationName",params,undefined,false); 
			copyArg(msg,"computePlatform",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createApplication(params,cb);
		}

		
		service.CreateDeployment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"applicationName",params,undefined,false); 
			
			copyArg(msg,"applicationName",params,undefined,false); 
			copyArg(msg,"deploymentGroupName",params,undefined,false); 
			copyArg(msg,"revision",params,undefined,true); 
			copyArg(msg,"deploymentConfigName",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"ignoreApplicationStopFailures",params,undefined,false); 
			copyArg(msg,"targetInstances",params,undefined,true); 
			copyArg(msg,"autoRollbackConfiguration",params,undefined,true); 
			copyArg(msg,"updateOutdatedInstancesOnly",params,undefined,false); 
			copyArg(msg,"fileExistsBehavior",params,undefined,false); 
			

			svc.createDeployment(params,cb);
		}

		
		service.CreateDeploymentConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"deploymentConfigName",params,undefined,false); 
			
			copyArg(msg,"deploymentConfigName",params,undefined,false); 
			copyArg(msg,"minimumHealthyHosts",params,undefined,true); 
			copyArg(msg,"trafficRoutingConfig",params,undefined,true); 
			copyArg(msg,"computePlatform",params,undefined,false); 
			

			svc.createDeploymentConfig(params,cb);
		}

		
		service.CreateDeploymentGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"applicationName",params,undefined,false); 
			copyArg(n,"deploymentGroupName",params,undefined,false); 
			copyArg(n,"serviceRoleArn",params,undefined,false); 
			
			copyArg(msg,"applicationName",params,undefined,false); 
			copyArg(msg,"deploymentGroupName",params,undefined,false); 
			copyArg(msg,"deploymentConfigName",params,undefined,false); 
			copyArg(msg,"ec2TagFilters",params,undefined,true); 
			copyArg(msg,"onPremisesInstanceTagFilters",params,undefined,true); 
			copyArg(msg,"autoScalingGroups",params,undefined,true); 
			copyArg(msg,"serviceRoleArn",params,undefined,false); 
			copyArg(msg,"triggerConfigurations",params,undefined,true); 
			copyArg(msg,"alarmConfiguration",params,undefined,true); 
			copyArg(msg,"autoRollbackConfiguration",params,undefined,true); 
			copyArg(msg,"outdatedInstancesStrategy",params,undefined,false); 
			copyArg(msg,"deploymentStyle",params,undefined,true); 
			copyArg(msg,"blueGreenDeploymentConfiguration",params,undefined,true); 
			copyArg(msg,"loadBalancerInfo",params,undefined,true); 
			copyArg(msg,"ec2TagSet",params,undefined,true); 
			copyArg(msg,"ecsServices",params,undefined,true); 
			copyArg(msg,"onPremisesTagSet",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createDeploymentGroup(params,cb);
		}

		
		service.DeleteApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"applicationName",params,undefined,false); 
			
			copyArg(msg,"applicationName",params,undefined,false); 
			

			svc.deleteApplication(params,cb);
		}

		
		service.DeleteDeploymentConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"deploymentConfigName",params,undefined,false); 
			
			copyArg(msg,"deploymentConfigName",params,undefined,false); 
			

			svc.deleteDeploymentConfig(params,cb);
		}

		
		service.DeleteDeploymentGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"applicationName",params,undefined,false); 
			copyArg(n,"deploymentGroupName",params,undefined,false); 
			
			copyArg(msg,"applicationName",params,undefined,false); 
			copyArg(msg,"deploymentGroupName",params,undefined,false); 
			

			svc.deleteDeploymentGroup(params,cb);
		}

		
		service.DeleteGitHubAccountToken=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"tokenName",params,undefined,false); 
			

			svc.deleteGitHubAccountToken(params,cb);
		}

		
		service.DeleteResourcesByExternalId=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"externalId",params,undefined,false); 
			

			svc.deleteResourcesByExternalId(params,cb);
		}

		
		service.DeregisterOnPremisesInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"instanceName",params,undefined,false); 
			
			copyArg(msg,"instanceName",params,undefined,false); 
			

			svc.deregisterOnPremisesInstance(params,cb);
		}

		
		service.GetApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"applicationName",params,undefined,false); 
			
			copyArg(msg,"applicationName",params,undefined,false); 
			

			svc.getApplication(params,cb);
		}

		
		service.GetApplicationRevision=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"applicationName",params,undefined,false); 
			copyArg(n,"revision",params,undefined,true); 
			
			copyArg(msg,"applicationName",params,undefined,false); 
			copyArg(msg,"revision",params,undefined,true); 
			

			svc.getApplicationRevision(params,cb);
		}

		
		service.GetDeployment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"deploymentId",params,undefined,false); 
			
			copyArg(msg,"deploymentId",params,undefined,false); 
			

			svc.getDeployment(params,cb);
		}

		
		service.GetDeploymentConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"deploymentConfigName",params,undefined,false); 
			
			copyArg(msg,"deploymentConfigName",params,undefined,false); 
			

			svc.getDeploymentConfig(params,cb);
		}

		
		service.GetDeploymentGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"applicationName",params,undefined,false); 
			copyArg(n,"deploymentGroupName",params,undefined,false); 
			
			copyArg(msg,"applicationName",params,undefined,false); 
			copyArg(msg,"deploymentGroupName",params,undefined,false); 
			

			svc.getDeploymentGroup(params,cb);
		}

		
		service.GetDeploymentInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"deploymentId",params,undefined,false); 
			copyArg(n,"instanceId",params,undefined,false); 
			
			copyArg(msg,"deploymentId",params,undefined,false); 
			copyArg(msg,"instanceId",params,undefined,false); 
			

			svc.getDeploymentInstance(params,cb);
		}

		
		service.GetDeploymentTarget=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"deploymentId",params,undefined,false); 
			copyArg(msg,"targetId",params,undefined,false); 
			

			svc.getDeploymentTarget(params,cb);
		}

		
		service.GetOnPremisesInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"instanceName",params,undefined,false); 
			
			copyArg(msg,"instanceName",params,undefined,false); 
			

			svc.getOnPremisesInstance(params,cb);
		}

		
		service.ListApplicationRevisions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"applicationName",params,undefined,false); 
			
			copyArg(msg,"applicationName",params,undefined,false); 
			copyArg(msg,"sortBy",params,undefined,false); 
			copyArg(msg,"sortOrder",params,undefined,false); 
			copyArg(msg,"s3Bucket",params,undefined,false); 
			copyArg(msg,"s3KeyPrefix",params,undefined,false); 
			copyArg(msg,"deployed",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listApplicationRevisions(params,cb);
		}

		
		service.ListApplications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listApplications(params,cb);
		}

		
		service.ListDeploymentConfigs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listDeploymentConfigs(params,cb);
		}

		
		service.ListDeploymentGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"applicationName",params,undefined,false); 
			
			copyArg(msg,"applicationName",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listDeploymentGroups(params,cb);
		}

		
		service.ListDeploymentInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"deploymentId",params,undefined,false); 
			
			copyArg(msg,"deploymentId",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"instanceStatusFilter",params,undefined,false); 
			copyArg(msg,"instanceTypeFilter",params,undefined,false); 
			

			svc.listDeploymentInstances(params,cb);
		}

		
		service.ListDeploymentTargets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"deploymentId",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"targetFilters",params,undefined,false); 
			

			svc.listDeploymentTargets(params,cb);
		}

		
		service.ListDeployments=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"applicationName",params,undefined,false); 
			copyArg(msg,"deploymentGroupName",params,undefined,false); 
			copyArg(msg,"externalId",params,undefined,false); 
			copyArg(msg,"includeOnlyStatuses",params,undefined,false); 
			copyArg(msg,"createTimeRange",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listDeployments(params,cb);
		}

		
		service.ListGitHubAccountTokenNames=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listGitHubAccountTokenNames(params,cb);
		}

		
		service.ListOnPremisesInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"registrationStatus",params,undefined,false); 
			copyArg(msg,"tagFilters",params,undefined,true); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listOnPremisesInstances(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutLifecycleEventHookExecutionStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"deploymentId",params,undefined,false); 
			copyArg(msg,"lifecycleEventHookExecutionId",params,undefined,false); 
			copyArg(msg,"status",params,undefined,false); 
			

			svc.putLifecycleEventHookExecutionStatus(params,cb);
		}

		
		service.RegisterApplicationRevision=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"applicationName",params,undefined,false); 
			copyArg(n,"revision",params,undefined,true); 
			
			copyArg(msg,"applicationName",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"revision",params,undefined,true); 
			

			svc.registerApplicationRevision(params,cb);
		}

		
		service.RegisterOnPremisesInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"instanceName",params,undefined,false); 
			
			copyArg(msg,"instanceName",params,undefined,false); 
			copyArg(msg,"iamSessionArn",params,undefined,false); 
			copyArg(msg,"iamUserArn",params,undefined,false); 
			

			svc.registerOnPremisesInstance(params,cb);
		}

		
		service.RemoveTagsFromOnPremisesInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"tags",params,undefined,true); 
			copyArg(n,"instanceNames",params,undefined,true); 
			
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"instanceNames",params,undefined,true); 
			

			svc.removeTagsFromOnPremisesInstances(params,cb);
		}

		
		service.SkipWaitTimeForInstanceTermination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"deploymentId",params,undefined,false); 
			

			svc.skipWaitTimeForInstanceTermination(params,cb);
		}

		
		service.StopDeployment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"deploymentId",params,undefined,false); 
			
			copyArg(msg,"deploymentId",params,undefined,false); 
			copyArg(msg,"autoRollbackEnabled",params,undefined,false); 
			

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
			
			
			copyArg(msg,"applicationName",params,undefined,false); 
			copyArg(msg,"newApplicationName",params,undefined,false); 
			

			svc.updateApplication(params,cb);
		}

		
		service.UpdateDeploymentGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"applicationName",params,undefined,false); 
			copyArg(n,"currentDeploymentGroupName",params,undefined,false); 
			
			copyArg(msg,"applicationName",params,undefined,false); 
			copyArg(msg,"currentDeploymentGroupName",params,undefined,false); 
			copyArg(msg,"newDeploymentGroupName",params,undefined,false); 
			copyArg(msg,"deploymentConfigName",params,undefined,false); 
			copyArg(msg,"ec2TagFilters",params,undefined,true); 
			copyArg(msg,"onPremisesInstanceTagFilters",params,undefined,true); 
			copyArg(msg,"autoScalingGroups",params,undefined,true); 
			copyArg(msg,"serviceRoleArn",params,undefined,false); 
			copyArg(msg,"triggerConfigurations",params,undefined,true); 
			copyArg(msg,"alarmConfiguration",params,undefined,true); 
			copyArg(msg,"autoRollbackConfiguration",params,undefined,true); 
			copyArg(msg,"outdatedInstancesStrategy",params,undefined,false); 
			copyArg(msg,"deploymentStyle",params,undefined,true); 
			copyArg(msg,"blueGreenDeploymentConfiguration",params,undefined,true); 
			copyArg(msg,"loadBalancerInfo",params,undefined,true); 
			copyArg(msg,"ec2TagSet",params,undefined,true); 
			copyArg(msg,"ecsServices",params,undefined,true); 
			copyArg(msg,"onPremisesTagSet",params,undefined,true); 
			

			svc.updateDeploymentGroup(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS CodeDeploy", AmazonAPINode);

};
