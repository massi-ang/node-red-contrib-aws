
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

		var awsService = new AWS.Amplify( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Amplify(msg.AWSConfig) : awsService;

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

		
		service.CreateApp=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"repository",params,undefined,false); 
			copyArg(msg,"platform",params,undefined,false); 
			copyArg(msg,"iamServiceRoleArn",params,undefined,false); 
			copyArg(msg,"oauthToken",params,undefined,true); 
			copyArg(msg,"accessToken",params,undefined,true); 
			copyArg(msg,"environmentVariables",params,undefined,true); 
			copyArg(msg,"enableBranchAutoBuild",params,undefined,false); 
			copyArg(msg,"enableBranchAutoDeletion",params,undefined,false); 
			copyArg(msg,"enableBasicAuth",params,undefined,false); 
			copyArg(msg,"basicAuthCredentials",params,undefined,true); 
			copyArg(msg,"customRules",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"buildSpec",params,undefined,false); 
			copyArg(msg,"customHeaders",params,undefined,false); 
			copyArg(msg,"enableAutoBranchCreation",params,undefined,false); 
			copyArg(msg,"autoBranchCreationPatterns",params,undefined,true); 
			copyArg(msg,"autoBranchCreationConfig",params,undefined,true); 
			

			svc.createApp(params,cb);
		}

		
		service.CreateBackendEnvironment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"appId",params,undefined,false); 
			copyArg(n,"environmentName",params,undefined,false); 
			
			copyArg(msg,"appId",params,undefined,false); 
			copyArg(msg,"environmentName",params,undefined,false); 
			copyArg(msg,"stackName",params,undefined,false); 
			copyArg(msg,"deploymentArtifacts",params,undefined,false); 
			

			svc.createBackendEnvironment(params,cb);
		}

		
		service.CreateBranch=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"appId",params,undefined,false); 
			copyArg(n,"branchName",params,undefined,false); 
			
			copyArg(msg,"appId",params,undefined,false); 
			copyArg(msg,"branchName",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"stage",params,undefined,false); 
			copyArg(msg,"framework",params,undefined,false); 
			copyArg(msg,"enableNotification",params,undefined,false); 
			copyArg(msg,"enableAutoBuild",params,undefined,false); 
			copyArg(msg,"environmentVariables",params,undefined,true); 
			copyArg(msg,"basicAuthCredentials",params,undefined,true); 
			copyArg(msg,"enableBasicAuth",params,undefined,false); 
			copyArg(msg,"enablePerformanceMode",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"buildSpec",params,undefined,false); 
			copyArg(msg,"ttl",params,undefined,false); 
			copyArg(msg,"displayName",params,undefined,false); 
			copyArg(msg,"enablePullRequestPreview",params,undefined,false); 
			copyArg(msg,"pullRequestEnvironmentName",params,undefined,false); 
			copyArg(msg,"backendEnvironmentArn",params,undefined,false); 
			

			svc.createBranch(params,cb);
		}

		
		service.CreateDeployment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"appId",params,undefined,false); 
			copyArg(n,"branchName",params,undefined,false); 
			
			copyArg(msg,"appId",params,undefined,false); 
			copyArg(msg,"branchName",params,undefined,false); 
			copyArg(msg,"fileMap",params,undefined,false); 
			

			svc.createDeployment(params,cb);
		}

		
		service.CreateDomainAssociation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"appId",params,undefined,false); 
			copyArg(n,"domainName",params,undefined,false); 
			copyArg(n,"subDomainSettings",params,undefined,true); 
			
			copyArg(msg,"appId",params,undefined,false); 
			copyArg(msg,"domainName",params,undefined,false); 
			copyArg(msg,"enableAutoSubDomain",params,undefined,false); 
			copyArg(msg,"subDomainSettings",params,undefined,true); 
			copyArg(msg,"autoSubDomainCreationPatterns",params,undefined,true); 
			copyArg(msg,"autoSubDomainIAMRole",params,undefined,false); 
			

			svc.createDomainAssociation(params,cb);
		}

		
		service.CreateWebhook=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"appId",params,undefined,false); 
			copyArg(n,"branchName",params,undefined,false); 
			
			copyArg(msg,"appId",params,undefined,false); 
			copyArg(msg,"branchName",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			

			svc.createWebhook(params,cb);
		}

		
		service.DeleteApp=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"appId",params,undefined,false); 
			
			copyArg(msg,"appId",params,undefined,false); 
			

			svc.deleteApp(params,cb);
		}

		
		service.DeleteBackendEnvironment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"appId",params,undefined,false); 
			copyArg(n,"environmentName",params,undefined,false); 
			
			copyArg(msg,"appId",params,undefined,false); 
			copyArg(msg,"environmentName",params,undefined,false); 
			

			svc.deleteBackendEnvironment(params,cb);
		}

		
		service.DeleteBranch=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"appId",params,undefined,false); 
			copyArg(n,"branchName",params,undefined,false); 
			
			copyArg(msg,"appId",params,undefined,false); 
			copyArg(msg,"branchName",params,undefined,false); 
			

			svc.deleteBranch(params,cb);
		}

		
		service.DeleteDomainAssociation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"appId",params,undefined,false); 
			copyArg(n,"domainName",params,undefined,false); 
			
			copyArg(msg,"appId",params,undefined,false); 
			copyArg(msg,"domainName",params,undefined,false); 
			

			svc.deleteDomainAssociation(params,cb);
		}

		
		service.DeleteJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"appId",params,undefined,false); 
			copyArg(n,"branchName",params,undefined,false); 
			copyArg(n,"jobId",params,undefined,false); 
			
			copyArg(msg,"appId",params,undefined,false); 
			copyArg(msg,"branchName",params,undefined,false); 
			copyArg(msg,"jobId",params,undefined,false); 
			

			svc.deleteJob(params,cb);
		}

		
		service.DeleteWebhook=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"webhookId",params,undefined,false); 
			
			copyArg(msg,"webhookId",params,undefined,false); 
			

			svc.deleteWebhook(params,cb);
		}

		
		service.GenerateAccessLogs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domainName",params,undefined,false); 
			copyArg(n,"appId",params,undefined,false); 
			
			copyArg(msg,"startTime",params,undefined,false); 
			copyArg(msg,"endTime",params,undefined,false); 
			copyArg(msg,"domainName",params,undefined,false); 
			copyArg(msg,"appId",params,undefined,false); 
			

			svc.generateAccessLogs(params,cb);
		}

		
		service.GetApp=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"appId",params,undefined,false); 
			
			copyArg(msg,"appId",params,undefined,false); 
			

			svc.getApp(params,cb);
		}

		
		service.GetArtifactUrl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"artifactId",params,undefined,false); 
			
			copyArg(msg,"artifactId",params,undefined,false); 
			

			svc.getArtifactUrl(params,cb);
		}

		
		service.GetBackendEnvironment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"appId",params,undefined,false); 
			copyArg(n,"environmentName",params,undefined,false); 
			
			copyArg(msg,"appId",params,undefined,false); 
			copyArg(msg,"environmentName",params,undefined,false); 
			

			svc.getBackendEnvironment(params,cb);
		}

		
		service.GetBranch=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"appId",params,undefined,false); 
			copyArg(n,"branchName",params,undefined,false); 
			
			copyArg(msg,"appId",params,undefined,false); 
			copyArg(msg,"branchName",params,undefined,false); 
			

			svc.getBranch(params,cb);
		}

		
		service.GetDomainAssociation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"appId",params,undefined,false); 
			copyArg(n,"domainName",params,undefined,false); 
			
			copyArg(msg,"appId",params,undefined,false); 
			copyArg(msg,"domainName",params,undefined,false); 
			

			svc.getDomainAssociation(params,cb);
		}

		
		service.GetJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"appId",params,undefined,false); 
			copyArg(n,"branchName",params,undefined,false); 
			copyArg(n,"jobId",params,undefined,false); 
			
			copyArg(msg,"appId",params,undefined,false); 
			copyArg(msg,"branchName",params,undefined,false); 
			copyArg(msg,"jobId",params,undefined,false); 
			

			svc.getJob(params,cb);
		}

		
		service.GetWebhook=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"webhookId",params,undefined,false); 
			
			copyArg(msg,"webhookId",params,undefined,false); 
			

			svc.getWebhook(params,cb);
		}

		
		service.ListApps=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listApps(params,cb);
		}

		
		service.ListArtifacts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"appId",params,undefined,false); 
			copyArg(n,"branchName",params,undefined,false); 
			copyArg(n,"jobId",params,undefined,false); 
			
			copyArg(msg,"appId",params,undefined,false); 
			copyArg(msg,"branchName",params,undefined,false); 
			copyArg(msg,"jobId",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listArtifacts(params,cb);
		}

		
		service.ListBackendEnvironments=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"appId",params,undefined,false); 
			
			copyArg(msg,"appId",params,undefined,false); 
			copyArg(msg,"environmentName",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listBackendEnvironments(params,cb);
		}

		
		service.ListBranches=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"appId",params,undefined,false); 
			
			copyArg(msg,"appId",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listBranches(params,cb);
		}

		
		service.ListDomainAssociations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"appId",params,undefined,false); 
			
			copyArg(msg,"appId",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listDomainAssociations(params,cb);
		}

		
		service.ListJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"appId",params,undefined,false); 
			copyArg(n,"branchName",params,undefined,false); 
			
			copyArg(msg,"appId",params,undefined,false); 
			copyArg(msg,"branchName",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listJobs(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListWebhooks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"appId",params,undefined,false); 
			
			copyArg(msg,"appId",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listWebhooks(params,cb);
		}

		
		service.StartDeployment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"appId",params,undefined,false); 
			copyArg(n,"branchName",params,undefined,false); 
			
			copyArg(msg,"appId",params,undefined,false); 
			copyArg(msg,"branchName",params,undefined,false); 
			copyArg(msg,"jobId",params,undefined,false); 
			copyArg(msg,"sourceUrl",params,undefined,false); 
			

			svc.startDeployment(params,cb);
		}

		
		service.StartJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"appId",params,undefined,false); 
			copyArg(n,"branchName",params,undefined,false); 
			copyArg(n,"jobType",params,undefined,false); 
			
			copyArg(msg,"appId",params,undefined,false); 
			copyArg(msg,"branchName",params,undefined,false); 
			copyArg(msg,"jobId",params,undefined,false); 
			copyArg(msg,"jobType",params,undefined,false); 
			copyArg(msg,"jobReason",params,undefined,false); 
			copyArg(msg,"commitId",params,undefined,false); 
			copyArg(msg,"commitMessage",params,undefined,false); 
			copyArg(msg,"commitTime",params,undefined,false); 
			

			svc.startJob(params,cb);
		}

		
		service.StopJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"appId",params,undefined,false); 
			copyArg(n,"branchName",params,undefined,false); 
			copyArg(n,"jobId",params,undefined,false); 
			
			copyArg(msg,"appId",params,undefined,false); 
			copyArg(msg,"branchName",params,undefined,false); 
			copyArg(msg,"jobId",params,undefined,false); 
			

			svc.stopJob(params,cb);
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

		
		service.UpdateApp=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"appId",params,undefined,false); 
			
			copyArg(msg,"appId",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"platform",params,undefined,false); 
			copyArg(msg,"iamServiceRoleArn",params,undefined,false); 
			copyArg(msg,"environmentVariables",params,undefined,true); 
			copyArg(msg,"enableBranchAutoBuild",params,undefined,false); 
			copyArg(msg,"enableBranchAutoDeletion",params,undefined,false); 
			copyArg(msg,"enableBasicAuth",params,undefined,false); 
			copyArg(msg,"basicAuthCredentials",params,undefined,true); 
			copyArg(msg,"customRules",params,undefined,true); 
			copyArg(msg,"buildSpec",params,undefined,false); 
			copyArg(msg,"customHeaders",params,undefined,false); 
			copyArg(msg,"enableAutoBranchCreation",params,undefined,false); 
			copyArg(msg,"autoBranchCreationPatterns",params,undefined,true); 
			copyArg(msg,"autoBranchCreationConfig",params,undefined,true); 
			copyArg(msg,"repository",params,undefined,false); 
			copyArg(msg,"oauthToken",params,undefined,true); 
			copyArg(msg,"accessToken",params,undefined,true); 
			

			svc.updateApp(params,cb);
		}

		
		service.UpdateBranch=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"appId",params,undefined,false); 
			copyArg(n,"branchName",params,undefined,false); 
			
			copyArg(msg,"appId",params,undefined,false); 
			copyArg(msg,"branchName",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"framework",params,undefined,false); 
			copyArg(msg,"stage",params,undefined,false); 
			copyArg(msg,"enableNotification",params,undefined,false); 
			copyArg(msg,"enableAutoBuild",params,undefined,false); 
			copyArg(msg,"environmentVariables",params,undefined,true); 
			copyArg(msg,"basicAuthCredentials",params,undefined,true); 
			copyArg(msg,"enableBasicAuth",params,undefined,false); 
			copyArg(msg,"enablePerformanceMode",params,undefined,false); 
			copyArg(msg,"buildSpec",params,undefined,false); 
			copyArg(msg,"ttl",params,undefined,false); 
			copyArg(msg,"displayName",params,undefined,false); 
			copyArg(msg,"enablePullRequestPreview",params,undefined,false); 
			copyArg(msg,"pullRequestEnvironmentName",params,undefined,false); 
			copyArg(msg,"backendEnvironmentArn",params,undefined,false); 
			

			svc.updateBranch(params,cb);
		}

		
		service.UpdateDomainAssociation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"appId",params,undefined,false); 
			copyArg(n,"domainName",params,undefined,false); 
			copyArg(n,"subDomainSettings",params,undefined,true); 
			
			copyArg(msg,"appId",params,undefined,false); 
			copyArg(msg,"domainName",params,undefined,false); 
			copyArg(msg,"enableAutoSubDomain",params,undefined,false); 
			copyArg(msg,"subDomainSettings",params,undefined,true); 
			copyArg(msg,"autoSubDomainCreationPatterns",params,undefined,true); 
			copyArg(msg,"autoSubDomainIAMRole",params,undefined,false); 
			

			svc.updateDomainAssociation(params,cb);
		}

		
		service.UpdateWebhook=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"webhookId",params,undefined,false); 
			
			copyArg(msg,"webhookId",params,undefined,false); 
			copyArg(msg,"branchName",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			

			svc.updateWebhook(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Amplify", AmazonAPINode);

};
