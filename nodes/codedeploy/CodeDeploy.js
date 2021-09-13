
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

		var awsService = new AWS.CodeDeploy( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.CodeDeploy(msg.AWSConfig) : awsService;

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
		
			service.AddTagsToOnPremisesInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"instanceNames",params,undefined,true); 
			
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"instanceNames",params,undefined,true); 
			
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"instanceNames",params,undefined,true); 
			

			svc.addTagsToOnPremisesInstances(params,cb);
		}
			service.BatchGetApplicationRevisions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"applicationName",params,undefined,false); 
			copyArgs(n,"revisions",params,undefined,true); 
			
			copyArgs(n,"applicationName",params,undefined,false); 
			copyArgs(n,"revisions",params,undefined,true); 
			
			copyArgs(msg,"applicationName",params,undefined,false); 
			copyArgs(msg,"revisions",params,undefined,true); 
			

			svc.batchGetApplicationRevisions(params,cb);
		}
			service.BatchGetApplications=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"applicationNames",params,undefined,true); 
			
			copyArgs(n,"applicationNames",params,undefined,true); 
			
			copyArgs(msg,"applicationNames",params,undefined,true); 
			

			svc.batchGetApplications(params,cb);
		}
			service.BatchGetDeploymentGroups=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"applicationName",params,undefined,false); 
			copyArgs(n,"deploymentGroupNames",params,undefined,true); 
			
			copyArgs(n,"applicationName",params,undefined,false); 
			copyArgs(n,"deploymentGroupNames",params,undefined,true); 
			
			copyArgs(msg,"applicationName",params,undefined,false); 
			copyArgs(msg,"deploymentGroupNames",params,undefined,true); 
			

			svc.batchGetDeploymentGroups(params,cb);
		}
			service.BatchGetDeploymentInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"deploymentId",params,undefined,false); 
			copyArgs(n,"instanceIds",params,undefined,true); 
			
			copyArgs(n,"deploymentId",params,undefined,false); 
			copyArgs(n,"instanceIds",params,undefined,true); 
			
			copyArgs(msg,"deploymentId",params,undefined,false); 
			copyArgs(msg,"instanceIds",params,undefined,true); 
			

			svc.batchGetDeploymentInstances(params,cb);
		}
			service.BatchGetDeploymentTargets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"deploymentId",params,undefined,false); 
			copyArgs(n,"targetIds",params,undefined,true); 
			
			copyArgs(msg,"deploymentId",params,undefined,false); 
			copyArgs(msg,"targetIds",params,undefined,true); 
			

			svc.batchGetDeploymentTargets(params,cb);
		}
			service.BatchGetDeployments=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"deploymentIds",params,undefined,true); 
			
			copyArgs(n,"deploymentIds",params,undefined,true); 
			
			copyArgs(msg,"deploymentIds",params,undefined,true); 
			

			svc.batchGetDeployments(params,cb);
		}
			service.BatchGetOnPremisesInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"instanceNames",params,undefined,true); 
			
			copyArgs(n,"instanceNames",params,undefined,true); 
			
			copyArgs(msg,"instanceNames",params,undefined,true); 
			

			svc.batchGetOnPremisesInstances(params,cb);
		}
			service.ContinueDeployment=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"deploymentId",params,undefined,false); 
			copyArgs(n,"deploymentWaitType",params,undefined,false); 
			
			copyArgs(msg,"deploymentId",params,undefined,false); 
			copyArgs(msg,"deploymentWaitType",params,undefined,false); 
			

			svc.continueDeployment(params,cb);
		}
			service.CreateApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"applicationName",params,undefined,false); 
			
			copyArgs(n,"applicationName",params,undefined,false); 
			copyArgs(n,"computePlatform",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"applicationName",params,undefined,false); 
			copyArgs(msg,"computePlatform",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createApplication(params,cb);
		}
			service.CreateDeployment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"applicationName",params,undefined,false); 
			
			copyArgs(n,"applicationName",params,undefined,false); 
			copyArgs(n,"deploymentGroupName",params,undefined,false); 
			copyArgs(n,"revision",params,undefined,true); 
			copyArgs(n,"deploymentConfigName",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(Boolean(n),"ignoreApplicationStopFailures",params,undefined,false); 
			copyArgs(n,"targetInstances",params,undefined,true); 
			copyArgs(n,"autoRollbackConfiguration",params,undefined,true); 
			copyArgs(Boolean(n),"updateOutdatedInstancesOnly",params,undefined,false); 
			copyArgs(n,"fileExistsBehavior",params,undefined,false); 
			
			copyArgs(msg,"applicationName",params,undefined,false); 
			copyArgs(msg,"deploymentGroupName",params,undefined,false); 
			copyArgs(msg,"revision",params,undefined,true); 
			copyArgs(msg,"deploymentConfigName",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"ignoreApplicationStopFailures",params,undefined,false); 
			copyArgs(msg,"targetInstances",params,undefined,true); 
			copyArgs(msg,"autoRollbackConfiguration",params,undefined,true); 
			copyArgs(msg,"updateOutdatedInstancesOnly",params,undefined,false); 
			copyArgs(msg,"fileExistsBehavior",params,undefined,false); 
			

			svc.createDeployment(params,cb);
		}
			service.CreateDeploymentConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"deploymentConfigName",params,undefined,false); 
			
			copyArgs(n,"deploymentConfigName",params,undefined,false); 
			copyArgs(n,"minimumHealthyHosts",params,undefined,true); 
			copyArgs(n,"trafficRoutingConfig",params,undefined,true); 
			copyArgs(n,"computePlatform",params,undefined,false); 
			
			copyArgs(msg,"deploymentConfigName",params,undefined,false); 
			copyArgs(msg,"minimumHealthyHosts",params,undefined,true); 
			copyArgs(msg,"trafficRoutingConfig",params,undefined,true); 
			copyArgs(msg,"computePlatform",params,undefined,false); 
			

			svc.createDeploymentConfig(params,cb);
		}
			service.CreateDeploymentGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"applicationName",params,undefined,false); 
			copyArgs(n,"deploymentGroupName",params,undefined,false); 
			copyArgs(n,"serviceRoleArn",params,undefined,false); 
			
			copyArgs(n,"applicationName",params,undefined,false); 
			copyArgs(n,"deploymentGroupName",params,undefined,false); 
			copyArgs(n,"deploymentConfigName",params,undefined,false); 
			copyArgs(n,"ec2TagFilters",params,undefined,true); 
			copyArgs(n,"onPremisesInstanceTagFilters",params,undefined,true); 
			copyArgs(n,"autoScalingGroups",params,undefined,true); 
			copyArgs(n,"serviceRoleArn",params,undefined,false); 
			copyArgs(n,"triggerConfigurations",params,undefined,true); 
			copyArgs(n,"alarmConfiguration",params,undefined,true); 
			copyArgs(n,"autoRollbackConfiguration",params,undefined,true); 
			copyArgs(n,"outdatedInstancesStrategy",params,undefined,false); 
			copyArgs(n,"deploymentStyle",params,undefined,true); 
			copyArgs(n,"blueGreenDeploymentConfiguration",params,undefined,true); 
			copyArgs(n,"loadBalancerInfo",params,undefined,true); 
			copyArgs(n,"ec2TagSet",params,undefined,true); 
			copyArgs(n,"ecsServices",params,undefined,true); 
			copyArgs(n,"onPremisesTagSet",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"applicationName",params,undefined,false); 
			copyArgs(msg,"deploymentGroupName",params,undefined,false); 
			copyArgs(msg,"deploymentConfigName",params,undefined,false); 
			copyArgs(msg,"ec2TagFilters",params,undefined,true); 
			copyArgs(msg,"onPremisesInstanceTagFilters",params,undefined,true); 
			copyArgs(msg,"autoScalingGroups",params,undefined,true); 
			copyArgs(msg,"serviceRoleArn",params,undefined,false); 
			copyArgs(msg,"triggerConfigurations",params,undefined,true); 
			copyArgs(msg,"alarmConfiguration",params,undefined,true); 
			copyArgs(msg,"autoRollbackConfiguration",params,undefined,true); 
			copyArgs(msg,"outdatedInstancesStrategy",params,undefined,false); 
			copyArgs(msg,"deploymentStyle",params,undefined,true); 
			copyArgs(msg,"blueGreenDeploymentConfiguration",params,undefined,true); 
			copyArgs(msg,"loadBalancerInfo",params,undefined,true); 
			copyArgs(msg,"ec2TagSet",params,undefined,true); 
			copyArgs(msg,"ecsServices",params,undefined,true); 
			copyArgs(msg,"onPremisesTagSet",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createDeploymentGroup(params,cb);
		}
			service.DeleteApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"applicationName",params,undefined,false); 
			
			copyArgs(n,"applicationName",params,undefined,false); 
			
			copyArgs(msg,"applicationName",params,undefined,false); 
			

			svc.deleteApplication(params,cb);
		}
			service.DeleteDeploymentConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"deploymentConfigName",params,undefined,false); 
			
			copyArgs(n,"deploymentConfigName",params,undefined,false); 
			
			copyArgs(msg,"deploymentConfigName",params,undefined,false); 
			

			svc.deleteDeploymentConfig(params,cb);
		}
			service.DeleteDeploymentGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"applicationName",params,undefined,false); 
			copyArgs(n,"deploymentGroupName",params,undefined,false); 
			
			copyArgs(n,"applicationName",params,undefined,false); 
			copyArgs(n,"deploymentGroupName",params,undefined,false); 
			
			copyArgs(msg,"applicationName",params,undefined,false); 
			copyArgs(msg,"deploymentGroupName",params,undefined,false); 
			

			svc.deleteDeploymentGroup(params,cb);
		}
			service.DeleteGitHubAccountToken=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"tokenName",params,undefined,false); 
			
			copyArgs(msg,"tokenName",params,undefined,false); 
			

			svc.deleteGitHubAccountToken(params,cb);
		}
			service.DeleteResourcesByExternalId=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"externalId",params,undefined,false); 
			
			copyArgs(msg,"externalId",params,undefined,false); 
			

			svc.deleteResourcesByExternalId(params,cb);
		}
			service.DeregisterOnPremisesInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(msg,"instanceName",params,undefined,false); 
			

			svc.deregisterOnPremisesInstance(params,cb);
		}
			service.GetApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"applicationName",params,undefined,false); 
			
			copyArgs(n,"applicationName",params,undefined,false); 
			
			copyArgs(msg,"applicationName",params,undefined,false); 
			

			svc.getApplication(params,cb);
		}
			service.GetApplicationRevision=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"applicationName",params,undefined,false); 
			copyArgs(n,"revision",params,undefined,true); 
			
			copyArgs(n,"applicationName",params,undefined,false); 
			copyArgs(n,"revision",params,undefined,true); 
			
			copyArgs(msg,"applicationName",params,undefined,false); 
			copyArgs(msg,"revision",params,undefined,true); 
			

			svc.getApplicationRevision(params,cb);
		}
			service.GetDeployment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"deploymentId",params,undefined,false); 
			
			copyArgs(n,"deploymentId",params,undefined,false); 
			
			copyArgs(msg,"deploymentId",params,undefined,false); 
			

			svc.getDeployment(params,cb);
		}
			service.GetDeploymentConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"deploymentConfigName",params,undefined,false); 
			
			copyArgs(n,"deploymentConfigName",params,undefined,false); 
			
			copyArgs(msg,"deploymentConfigName",params,undefined,false); 
			

			svc.getDeploymentConfig(params,cb);
		}
			service.GetDeploymentGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"applicationName",params,undefined,false); 
			copyArgs(n,"deploymentGroupName",params,undefined,false); 
			
			copyArgs(n,"applicationName",params,undefined,false); 
			copyArgs(n,"deploymentGroupName",params,undefined,false); 
			
			copyArgs(msg,"applicationName",params,undefined,false); 
			copyArgs(msg,"deploymentGroupName",params,undefined,false); 
			

			svc.getDeploymentGroup(params,cb);
		}
			service.GetDeploymentInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"deploymentId",params,undefined,false); 
			copyArgs(n,"instanceId",params,undefined,false); 
			
			copyArgs(n,"deploymentId",params,undefined,false); 
			copyArgs(n,"instanceId",params,undefined,false); 
			
			copyArgs(msg,"deploymentId",params,undefined,false); 
			copyArgs(msg,"instanceId",params,undefined,false); 
			

			svc.getDeploymentInstance(params,cb);
		}
			service.GetDeploymentTarget=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"deploymentId",params,undefined,false); 
			copyArgs(n,"targetId",params,undefined,false); 
			
			copyArgs(msg,"deploymentId",params,undefined,false); 
			copyArgs(msg,"targetId",params,undefined,false); 
			

			svc.getDeploymentTarget(params,cb);
		}
			service.GetOnPremisesInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(msg,"instanceName",params,undefined,false); 
			

			svc.getOnPremisesInstance(params,cb);
		}
			service.ListApplicationRevisions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"applicationName",params,undefined,false); 
			
			copyArgs(n,"applicationName",params,undefined,false); 
			copyArgs(n,"sortBy",params,undefined,false); 
			copyArgs(n,"sortOrder",params,undefined,false); 
			copyArgs(n,"s3Bucket",params,undefined,false); 
			copyArgs(n,"s3KeyPrefix",params,undefined,false); 
			copyArgs(n,"deployed",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"applicationName",params,undefined,false); 
			copyArgs(msg,"sortBy",params,undefined,false); 
			copyArgs(msg,"sortOrder",params,undefined,false); 
			copyArgs(msg,"s3Bucket",params,undefined,false); 
			copyArgs(msg,"s3KeyPrefix",params,undefined,false); 
			copyArgs(msg,"deployed",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listApplicationRevisions(params,cb);
		}
			service.ListApplications=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listApplications(params,cb);
		}
			service.ListDeploymentConfigs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listDeploymentConfigs(params,cb);
		}
			service.ListDeploymentGroups=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"applicationName",params,undefined,false); 
			
			copyArgs(n,"applicationName",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"applicationName",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listDeploymentGroups(params,cb);
		}
			service.ListDeploymentInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"deploymentId",params,undefined,false); 
			
			copyArgs(n,"deploymentId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"instanceStatusFilter",params,undefined,false); 
			copyArgs(n,"instanceTypeFilter",params,undefined,false); 
			
			copyArgs(msg,"deploymentId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"instanceStatusFilter",params,undefined,false); 
			copyArgs(msg,"instanceTypeFilter",params,undefined,false); 
			

			svc.listDeploymentInstances(params,cb);
		}
			service.ListDeploymentTargets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"deploymentId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"targetFilters",params,undefined,false); 
			
			copyArgs(msg,"deploymentId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"targetFilters",params,undefined,false); 
			

			svc.listDeploymentTargets(params,cb);
		}
			service.ListDeployments=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"applicationName",params,undefined,false); 
			copyArgs(n,"deploymentGroupName",params,undefined,false); 
			copyArgs(n,"externalId",params,undefined,false); 
			copyArgs(n,"includeOnlyStatuses",params,undefined,false); 
			copyArgs(n,"createTimeRange",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"applicationName",params,undefined,false); 
			copyArgs(msg,"deploymentGroupName",params,undefined,false); 
			copyArgs(msg,"externalId",params,undefined,false); 
			copyArgs(msg,"includeOnlyStatuses",params,undefined,false); 
			copyArgs(msg,"createTimeRange",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listDeployments(params,cb);
		}
			service.ListGitHubAccountTokenNames=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listGitHubAccountTokenNames(params,cb);
		}
			service.ListOnPremisesInstances=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"registrationStatus",params,undefined,false); 
			copyArgs(n,"tagFilters",params,undefined,true); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"registrationStatus",params,undefined,false); 
			copyArgs(msg,"tagFilters",params,undefined,true); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listOnPremisesInstances(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.PutLifecycleEventHookExecutionStatus=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"deploymentId",params,undefined,false); 
			copyArgs(n,"lifecycleEventHookExecutionId",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			
			copyArgs(msg,"deploymentId",params,undefined,false); 
			copyArgs(msg,"lifecycleEventHookExecutionId",params,undefined,false); 
			copyArgs(msg,"status",params,undefined,false); 
			

			svc.putLifecycleEventHookExecutionStatus(params,cb);
		}
			service.RegisterApplicationRevision=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"applicationName",params,undefined,false); 
			copyArgs(n,"revision",params,undefined,true); 
			
			copyArgs(n,"applicationName",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"revision",params,undefined,true); 
			
			copyArgs(msg,"applicationName",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"revision",params,undefined,true); 
			

			svc.registerApplicationRevision(params,cb);
		}
			service.RegisterOnPremisesInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(n,"instanceName",params,undefined,false); 
			copyArgs(n,"iamSessionArn",params,undefined,false); 
			copyArgs(n,"iamUserArn",params,undefined,false); 
			
			copyArgs(msg,"instanceName",params,undefined,false); 
			copyArgs(msg,"iamSessionArn",params,undefined,false); 
			copyArgs(msg,"iamUserArn",params,undefined,false); 
			

			svc.registerOnPremisesInstance(params,cb);
		}
			service.RemoveTagsFromOnPremisesInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"instanceNames",params,undefined,true); 
			
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"instanceNames",params,undefined,true); 
			
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"instanceNames",params,undefined,true); 
			

			svc.removeTagsFromOnPremisesInstances(params,cb);
		}
			service.SkipWaitTimeForInstanceTermination=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"deploymentId",params,undefined,false); 
			
			copyArgs(msg,"deploymentId",params,undefined,false); 
			

			svc.skipWaitTimeForInstanceTermination(params,cb);
		}
			service.StopDeployment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"deploymentId",params,undefined,false); 
			
			copyArgs(n,"deploymentId",params,undefined,false); 
			copyArgs(Boolean(n),"autoRollbackEnabled",params,undefined,false); 
			
			copyArgs(msg,"deploymentId",params,undefined,false); 
			copyArgs(msg,"autoRollbackEnabled",params,undefined,false); 
			

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
			
			
			copyArgs(n,"applicationName",params,undefined,false); 
			copyArgs(n,"newApplicationName",params,undefined,false); 
			
			copyArgs(msg,"applicationName",params,undefined,false); 
			copyArgs(msg,"newApplicationName",params,undefined,false); 
			

			svc.updateApplication(params,cb);
		}
			service.UpdateDeploymentGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"applicationName",params,undefined,false); 
			copyArgs(n,"currentDeploymentGroupName",params,undefined,false); 
			
			copyArgs(n,"applicationName",params,undefined,false); 
			copyArgs(n,"currentDeploymentGroupName",params,undefined,false); 
			copyArgs(n,"newDeploymentGroupName",params,undefined,false); 
			copyArgs(n,"deploymentConfigName",params,undefined,false); 
			copyArgs(n,"ec2TagFilters",params,undefined,true); 
			copyArgs(n,"onPremisesInstanceTagFilters",params,undefined,true); 
			copyArgs(n,"autoScalingGroups",params,undefined,true); 
			copyArgs(n,"serviceRoleArn",params,undefined,false); 
			copyArgs(n,"triggerConfigurations",params,undefined,true); 
			copyArgs(n,"alarmConfiguration",params,undefined,true); 
			copyArgs(n,"autoRollbackConfiguration",params,undefined,true); 
			copyArgs(n,"outdatedInstancesStrategy",params,undefined,false); 
			copyArgs(n,"deploymentStyle",params,undefined,true); 
			copyArgs(n,"blueGreenDeploymentConfiguration",params,undefined,true); 
			copyArgs(n,"loadBalancerInfo",params,undefined,true); 
			copyArgs(n,"ec2TagSet",params,undefined,true); 
			copyArgs(n,"ecsServices",params,undefined,true); 
			copyArgs(n,"onPremisesTagSet",params,undefined,true); 
			
			copyArgs(msg,"applicationName",params,undefined,false); 
			copyArgs(msg,"currentDeploymentGroupName",params,undefined,false); 
			copyArgs(msg,"newDeploymentGroupName",params,undefined,false); 
			copyArgs(msg,"deploymentConfigName",params,undefined,false); 
			copyArgs(msg,"ec2TagFilters",params,undefined,true); 
			copyArgs(msg,"onPremisesInstanceTagFilters",params,undefined,true); 
			copyArgs(msg,"autoScalingGroups",params,undefined,true); 
			copyArgs(msg,"serviceRoleArn",params,undefined,false); 
			copyArgs(msg,"triggerConfigurations",params,undefined,true); 
			copyArgs(msg,"alarmConfiguration",params,undefined,true); 
			copyArgs(msg,"autoRollbackConfiguration",params,undefined,true); 
			copyArgs(msg,"outdatedInstancesStrategy",params,undefined,false); 
			copyArgs(msg,"deploymentStyle",params,undefined,true); 
			copyArgs(msg,"blueGreenDeploymentConfiguration",params,undefined,true); 
			copyArgs(msg,"loadBalancerInfo",params,undefined,true); 
			copyArgs(msg,"ec2TagSet",params,undefined,true); 
			copyArgs(msg,"ecsServices",params,undefined,true); 
			copyArgs(msg,"onPremisesTagSet",params,undefined,true); 
			

			svc.updateDeploymentGroup(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS CodeDeploy", AmazonAPINode);

};
