
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

		var awsService = new AWS.Amplify( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Amplify(msg.AWSConfig) : awsService;

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
		
		service.CreateApp=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"repository",params,undefined,false); 
			copyArgs(n,"platform",params,undefined,false); 
			copyArgs(n,"iamServiceRoleArn",params,undefined,false); 
			copyArgs(n,"oauthToken",params,undefined,true); 
			copyArgs(n,"accessToken",params,undefined,true); 
			copyArgs(n,"environmentVariables",params,undefined,true); 
			copyArgs(Boolean(n),"enableBranchAutoBuild",params,undefined,false); 
			copyArgs(Boolean(n),"enableBranchAutoDeletion",params,undefined,false); 
			copyArgs(Boolean(n),"enableBasicAuth",params,undefined,false); 
			copyArgs(n,"basicAuthCredentials",params,undefined,true); 
			copyArgs(n,"customRules",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"buildSpec",params,undefined,false); 
			copyArgs(n,"customHeaders",params,undefined,false); 
			copyArgs(Boolean(n),"enableAutoBranchCreation",params,undefined,false); 
			copyArgs(n,"autoBranchCreationPatterns",params,undefined,true); 
			copyArgs(n,"autoBranchCreationConfig",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"repository",params,undefined,false); 
			copyArgs(msg,"platform",params,undefined,false); 
			copyArgs(msg,"iamServiceRoleArn",params,undefined,false); 
			copyArgs(msg,"oauthToken",params,undefined,true); 
			copyArgs(msg,"accessToken",params,undefined,true); 
			copyArgs(msg,"environmentVariables",params,undefined,true); 
			copyArgs(msg,"enableBranchAutoBuild",params,undefined,false); 
			copyArgs(msg,"enableBranchAutoDeletion",params,undefined,false); 
			copyArgs(msg,"enableBasicAuth",params,undefined,false); 
			copyArgs(msg,"basicAuthCredentials",params,undefined,true); 
			copyArgs(msg,"customRules",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"buildSpec",params,undefined,false); 
			copyArgs(msg,"customHeaders",params,undefined,false); 
			copyArgs(msg,"enableAutoBranchCreation",params,undefined,false); 
			copyArgs(msg,"autoBranchCreationPatterns",params,undefined,true); 
			copyArgs(msg,"autoBranchCreationConfig",params,undefined,true); 
			

			svc.createApp(params,cb);
		}
		
		service.CreateBackendEnvironment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"environmentName",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"environmentName",params,undefined,false); 
			copyArgs(n,"stackName",params,undefined,false); 
			copyArgs(n,"deploymentArtifacts",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"environmentName",params,undefined,false); 
			copyArgs(msg,"stackName",params,undefined,false); 
			copyArgs(msg,"deploymentArtifacts",params,undefined,false); 
			

			svc.createBackendEnvironment(params,cb);
		}
		
		service.CreateBranch=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"stage",params,undefined,false); 
			copyArgs(n,"framework",params,undefined,false); 
			copyArgs(Boolean(n),"enableNotification",params,undefined,false); 
			copyArgs(Boolean(n),"enableAutoBuild",params,undefined,false); 
			copyArgs(n,"environmentVariables",params,undefined,true); 
			copyArgs(n,"basicAuthCredentials",params,undefined,true); 
			copyArgs(Boolean(n),"enableBasicAuth",params,undefined,false); 
			copyArgs(Boolean(n),"enablePerformanceMode",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"buildSpec",params,undefined,false); 
			copyArgs(n,"ttl",params,undefined,false); 
			copyArgs(n,"displayName",params,undefined,false); 
			copyArgs(Boolean(n),"enablePullRequestPreview",params,undefined,false); 
			copyArgs(n,"pullRequestEnvironmentName",params,undefined,false); 
			copyArgs(n,"backendEnvironmentArn",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"branchName",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"stage",params,undefined,false); 
			copyArgs(msg,"framework",params,undefined,false); 
			copyArgs(msg,"enableNotification",params,undefined,false); 
			copyArgs(msg,"enableAutoBuild",params,undefined,false); 
			copyArgs(msg,"environmentVariables",params,undefined,true); 
			copyArgs(msg,"basicAuthCredentials",params,undefined,true); 
			copyArgs(msg,"enableBasicAuth",params,undefined,false); 
			copyArgs(msg,"enablePerformanceMode",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"buildSpec",params,undefined,false); 
			copyArgs(msg,"ttl",params,undefined,false); 
			copyArgs(msg,"displayName",params,undefined,false); 
			copyArgs(msg,"enablePullRequestPreview",params,undefined,false); 
			copyArgs(msg,"pullRequestEnvironmentName",params,undefined,false); 
			copyArgs(msg,"backendEnvironmentArn",params,undefined,false); 
			

			svc.createBranch(params,cb);
		}
		
		service.CreateDeployment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			copyArgs(n,"fileMap",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"branchName",params,undefined,false); 
			copyArgs(msg,"fileMap",params,undefined,false); 
			

			svc.createDeployment(params,cb);
		}
		
		service.CreateDomainAssociation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"domainName",params,undefined,false); 
			copyArgs(n,"subDomainSettings",params,undefined,true); 
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"domainName",params,undefined,false); 
			copyArgs(Boolean(n),"enableAutoSubDomain",params,undefined,false); 
			copyArgs(n,"subDomainSettings",params,undefined,true); 
			copyArgs(n,"autoSubDomainCreationPatterns",params,undefined,true); 
			copyArgs(n,"autoSubDomainIAMRole",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"domainName",params,undefined,false); 
			copyArgs(msg,"enableAutoSubDomain",params,undefined,false); 
			copyArgs(msg,"subDomainSettings",params,undefined,true); 
			copyArgs(msg,"autoSubDomainCreationPatterns",params,undefined,true); 
			copyArgs(msg,"autoSubDomainIAMRole",params,undefined,false); 
			

			svc.createDomainAssociation(params,cb);
		}
		
		service.CreateWebhook=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"branchName",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			

			svc.createWebhook(params,cb);
		}
		
		service.DeleteApp=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			

			svc.deleteApp(params,cb);
		}
		
		service.DeleteBackendEnvironment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"environmentName",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"environmentName",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"environmentName",params,undefined,false); 
			

			svc.deleteBackendEnvironment(params,cb);
		}
		
		service.DeleteBranch=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"branchName",params,undefined,false); 
			

			svc.deleteBranch(params,cb);
		}
		
		service.DeleteDomainAssociation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"domainName",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"domainName",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"domainName",params,undefined,false); 
			

			svc.deleteDomainAssociation(params,cb);
		}
		
		service.DeleteJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"branchName",params,undefined,false); 
			copyArgs(msg,"jobId",params,undefined,false); 
			

			svc.deleteJob(params,cb);
		}
		
		service.DeleteWebhook=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"webhookId",params,undefined,false); 
			
			copyArgs(n,"webhookId",params,undefined,false); 
			
			copyArgs(msg,"webhookId",params,undefined,false); 
			

			svc.deleteWebhook(params,cb);
		}
		
		service.GenerateAccessLogs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domainName",params,undefined,false); 
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(n,"domainName",params,undefined,false); 
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(msg,"startTime",params,undefined,false); 
			copyArgs(msg,"endTime",params,undefined,false); 
			copyArgs(msg,"domainName",params,undefined,false); 
			copyArgs(msg,"appId",params,undefined,false); 
			

			svc.generateAccessLogs(params,cb);
		}
		
		service.GetApp=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			

			svc.getApp(params,cb);
		}
		
		service.GetArtifactUrl=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"artifactId",params,undefined,false); 
			
			copyArgs(n,"artifactId",params,undefined,false); 
			
			copyArgs(msg,"artifactId",params,undefined,false); 
			

			svc.getArtifactUrl(params,cb);
		}
		
		service.GetBackendEnvironment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"environmentName",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"environmentName",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"environmentName",params,undefined,false); 
			

			svc.getBackendEnvironment(params,cb);
		}
		
		service.GetBranch=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"branchName",params,undefined,false); 
			

			svc.getBranch(params,cb);
		}
		
		service.GetDomainAssociation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"domainName",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"domainName",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"domainName",params,undefined,false); 
			

			svc.getDomainAssociation(params,cb);
		}
		
		service.GetJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"branchName",params,undefined,false); 
			copyArgs(msg,"jobId",params,undefined,false); 
			

			svc.getJob(params,cb);
		}
		
		service.GetWebhook=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"webhookId",params,undefined,false); 
			
			copyArgs(n,"webhookId",params,undefined,false); 
			
			copyArgs(msg,"webhookId",params,undefined,false); 
			

			svc.getWebhook(params,cb);
		}
		
		service.ListApps=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listApps(params,cb);
		}
		
		service.ListArtifacts=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"branchName",params,undefined,false); 
			copyArgs(msg,"jobId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listArtifacts(params,cb);
		}
		
		service.ListBackendEnvironments=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"environmentName",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"environmentName",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listBackendEnvironments(params,cb);
		}
		
		service.ListBranches=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listBranches(params,cb);
		}
		
		service.ListDomainAssociations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listDomainAssociations(params,cb);
		}
		
		service.ListJobs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"branchName",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listJobs(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.ListWebhooks=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listWebhooks(params,cb);
		}
		
		service.StartDeployment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"sourceUrl",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"branchName",params,undefined,false); 
			copyArgs(msg,"jobId",params,undefined,false); 
			copyArgs(msg,"sourceUrl",params,undefined,false); 
			

			svc.startDeployment(params,cb);
		}
		
		service.StartJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			copyArgs(n,"jobType",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"jobType",params,undefined,false); 
			copyArgs(n,"jobReason",params,undefined,false); 
			copyArgs(n,"commitId",params,undefined,false); 
			copyArgs(n,"commitMessage",params,undefined,false); 
			copyArgs(n,"commitTime",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"branchName",params,undefined,false); 
			copyArgs(msg,"jobId",params,undefined,false); 
			copyArgs(msg,"jobType",params,undefined,false); 
			copyArgs(msg,"jobReason",params,undefined,false); 
			copyArgs(msg,"commitId",params,undefined,false); 
			copyArgs(msg,"commitMessage",params,undefined,false); 
			copyArgs(msg,"commitTime",params,undefined,false); 
			

			svc.startJob(params,cb);
		}
		
		service.StopJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"branchName",params,undefined,false); 
			copyArgs(msg,"jobId",params,undefined,false); 
			

			svc.stopJob(params,cb);
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
		
		service.UpdateApp=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"platform",params,undefined,false); 
			copyArgs(n,"iamServiceRoleArn",params,undefined,false); 
			copyArgs(n,"environmentVariables",params,undefined,true); 
			copyArgs(Boolean(n),"enableBranchAutoBuild",params,undefined,false); 
			copyArgs(Boolean(n),"enableBranchAutoDeletion",params,undefined,false); 
			copyArgs(Boolean(n),"enableBasicAuth",params,undefined,false); 
			copyArgs(n,"basicAuthCredentials",params,undefined,true); 
			copyArgs(n,"customRules",params,undefined,true); 
			copyArgs(n,"buildSpec",params,undefined,false); 
			copyArgs(n,"customHeaders",params,undefined,false); 
			copyArgs(Boolean(n),"enableAutoBranchCreation",params,undefined,false); 
			copyArgs(n,"autoBranchCreationPatterns",params,undefined,true); 
			copyArgs(n,"autoBranchCreationConfig",params,undefined,true); 
			copyArgs(n,"repository",params,undefined,false); 
			copyArgs(n,"oauthToken",params,undefined,true); 
			copyArgs(n,"accessToken",params,undefined,true); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"platform",params,undefined,false); 
			copyArgs(msg,"iamServiceRoleArn",params,undefined,false); 
			copyArgs(msg,"environmentVariables",params,undefined,true); 
			copyArgs(msg,"enableBranchAutoBuild",params,undefined,false); 
			copyArgs(msg,"enableBranchAutoDeletion",params,undefined,false); 
			copyArgs(msg,"enableBasicAuth",params,undefined,false); 
			copyArgs(msg,"basicAuthCredentials",params,undefined,true); 
			copyArgs(msg,"customRules",params,undefined,true); 
			copyArgs(msg,"buildSpec",params,undefined,false); 
			copyArgs(msg,"customHeaders",params,undefined,false); 
			copyArgs(msg,"enableAutoBranchCreation",params,undefined,false); 
			copyArgs(msg,"autoBranchCreationPatterns",params,undefined,true); 
			copyArgs(msg,"autoBranchCreationConfig",params,undefined,true); 
			copyArgs(msg,"repository",params,undefined,false); 
			copyArgs(msg,"oauthToken",params,undefined,true); 
			copyArgs(msg,"accessToken",params,undefined,true); 
			

			svc.updateApp(params,cb);
		}
		
		service.UpdateBranch=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"framework",params,undefined,false); 
			copyArgs(n,"stage",params,undefined,false); 
			copyArgs(Boolean(n),"enableNotification",params,undefined,false); 
			copyArgs(Boolean(n),"enableAutoBuild",params,undefined,false); 
			copyArgs(n,"environmentVariables",params,undefined,true); 
			copyArgs(n,"basicAuthCredentials",params,undefined,true); 
			copyArgs(Boolean(n),"enableBasicAuth",params,undefined,false); 
			copyArgs(Boolean(n),"enablePerformanceMode",params,undefined,false); 
			copyArgs(n,"buildSpec",params,undefined,false); 
			copyArgs(n,"ttl",params,undefined,false); 
			copyArgs(n,"displayName",params,undefined,false); 
			copyArgs(Boolean(n),"enablePullRequestPreview",params,undefined,false); 
			copyArgs(n,"pullRequestEnvironmentName",params,undefined,false); 
			copyArgs(n,"backendEnvironmentArn",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"branchName",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"framework",params,undefined,false); 
			copyArgs(msg,"stage",params,undefined,false); 
			copyArgs(msg,"enableNotification",params,undefined,false); 
			copyArgs(msg,"enableAutoBuild",params,undefined,false); 
			copyArgs(msg,"environmentVariables",params,undefined,true); 
			copyArgs(msg,"basicAuthCredentials",params,undefined,true); 
			copyArgs(msg,"enableBasicAuth",params,undefined,false); 
			copyArgs(msg,"enablePerformanceMode",params,undefined,false); 
			copyArgs(msg,"buildSpec",params,undefined,false); 
			copyArgs(msg,"ttl",params,undefined,false); 
			copyArgs(msg,"displayName",params,undefined,false); 
			copyArgs(msg,"enablePullRequestPreview",params,undefined,false); 
			copyArgs(msg,"pullRequestEnvironmentName",params,undefined,false); 
			copyArgs(msg,"backendEnvironmentArn",params,undefined,false); 
			

			svc.updateBranch(params,cb);
		}
		
		service.UpdateDomainAssociation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"domainName",params,undefined,false); 
			copyArgs(n,"subDomainSettings",params,undefined,true); 
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"domainName",params,undefined,false); 
			copyArgs(Boolean(n),"enableAutoSubDomain",params,undefined,false); 
			copyArgs(n,"subDomainSettings",params,undefined,true); 
			copyArgs(n,"autoSubDomainCreationPatterns",params,undefined,true); 
			copyArgs(n,"autoSubDomainIAMRole",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"domainName",params,undefined,false); 
			copyArgs(msg,"enableAutoSubDomain",params,undefined,false); 
			copyArgs(msg,"subDomainSettings",params,undefined,true); 
			copyArgs(msg,"autoSubDomainCreationPatterns",params,undefined,true); 
			copyArgs(msg,"autoSubDomainIAMRole",params,undefined,false); 
			

			svc.updateDomainAssociation(params,cb);
		}
		
		service.UpdateWebhook=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"webhookId",params,undefined,false); 
			
			copyArgs(n,"webhookId",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			
			copyArgs(msg,"webhookId",params,undefined,false); 
			copyArgs(msg,"branchName",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			

			svc.updateWebhook(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS Amplify", AmazonAPINode);

};
