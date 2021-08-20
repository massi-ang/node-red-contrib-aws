
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

		var awsService = new AWS.CodeBuild( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.CodeBuild(msg.AWSConfig) : awsService;

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

		
		service.BatchDeleteBuilds=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ids",params,undefined,true); 
			
			copyArg(msg,"ids",params,undefined,true); 
			

			svc.batchDeleteBuilds(params,cb);
		}

		
		service.BatchGetBuildBatches=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ids",params,undefined,true); 
			
			copyArg(msg,"ids",params,undefined,true); 
			

			svc.batchGetBuildBatches(params,cb);
		}

		
		service.BatchGetBuilds=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ids",params,undefined,true); 
			
			copyArg(msg,"ids",params,undefined,true); 
			

			svc.batchGetBuilds(params,cb);
		}

		
		service.BatchGetProjects=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"names",params,undefined,true); 
			
			copyArg(msg,"names",params,undefined,true); 
			

			svc.batchGetProjects(params,cb);
		}

		
		service.BatchGetReportGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"reportGroupArns",params,undefined,true); 
			
			copyArg(msg,"reportGroupArns",params,undefined,true); 
			

			svc.batchGetReportGroups(params,cb);
		}

		
		service.BatchGetReports=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"reportArns",params,undefined,true); 
			
			copyArg(msg,"reportArns",params,undefined,true); 
			

			svc.batchGetReports(params,cb);
		}

		
		service.CreateProject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"source",params,undefined,true); 
			copyArg(n,"artifacts",params,undefined,true); 
			copyArg(n,"environment",params,undefined,true); 
			copyArg(n,"serviceRole",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"source",params,undefined,true); 
			copyArg(msg,"secondarySources",params,undefined,true); 
			copyArg(msg,"sourceVersion",params,undefined,false); 
			copyArg(msg,"secondarySourceVersions",params,undefined,true); 
			copyArg(msg,"artifacts",params,undefined,true); 
			copyArg(msg,"secondaryArtifacts",params,undefined,true); 
			copyArg(msg,"cache",params,undefined,true); 
			copyArg(msg,"environment",params,undefined,true); 
			copyArg(msg,"serviceRole",params,undefined,false); 
			copyArg(msg,"timeoutInMinutes",params,undefined,false); 
			copyArg(msg,"queuedTimeoutInMinutes",params,undefined,false); 
			copyArg(msg,"encryptionKey",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"vpcConfig",params,undefined,true); 
			copyArg(msg,"badgeEnabled",params,undefined,false); 
			copyArg(msg,"logsConfig",params,undefined,true); 
			copyArg(msg,"fileSystemLocations",params,undefined,true); 
			copyArg(msg,"buildBatchConfig",params,undefined,true); 
			copyArg(msg,"concurrentBuildLimit",params,undefined,false); 
			

			svc.createProject(params,cb);
		}

		
		service.CreateReportGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"_type",params,"type",false); 
			copyArg(n,"exportConfig",params,undefined,true); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"type",params,undefined,false); 
			copyArg(msg,"exportConfig",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createReportGroup(params,cb);
		}

		
		service.CreateWebhook=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"projectName",params,undefined,false); 
			
			copyArg(msg,"projectName",params,undefined,false); 
			copyArg(msg,"branchFilter",params,undefined,false); 
			copyArg(msg,"filterGroups",params,undefined,true); 
			copyArg(msg,"buildType",params,undefined,false); 
			

			svc.createWebhook(params,cb);
		}

		
		service.DeleteBuildBatch=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			

			svc.deleteBuildBatch(params,cb);
		}

		
		service.DeleteProject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			

			svc.deleteProject(params,cb);
		}

		
		service.DeleteReport=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.deleteReport(params,cb);
		}

		
		service.DeleteReportGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"deleteReports",params,undefined,false); 
			

			svc.deleteReportGroup(params,cb);
		}

		
		service.DeleteResourcePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.deleteResourcePolicy(params,cb);
		}

		
		service.DeleteSourceCredentials=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.deleteSourceCredentials(params,cb);
		}

		
		service.DeleteWebhook=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"projectName",params,undefined,false); 
			
			copyArg(msg,"projectName",params,undefined,false); 
			

			svc.deleteWebhook(params,cb);
		}

		
		service.DescribeCodeCoverages=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"reportArn",params,undefined,false); 
			
			copyArg(msg,"reportArn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"sortOrder",params,undefined,false); 
			copyArg(msg,"sortBy",params,undefined,false); 
			copyArg(msg,"minLineCoveragePercentage",params,undefined,false); 
			copyArg(msg,"maxLineCoveragePercentage",params,undefined,false); 
			

			svc.describeCodeCoverages(params,cb);
		}

		
		service.DescribeTestCases=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"reportArn",params,undefined,false); 
			
			copyArg(msg,"reportArn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"filter",params,undefined,false); 
			

			svc.describeTestCases(params,cb);
		}

		
		service.GetReportGroupTrend=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"reportGroupArn",params,undefined,false); 
			copyArg(n,"trendField",params,undefined,false); 
			
			copyArg(msg,"reportGroupArn",params,undefined,false); 
			copyArg(msg,"numOfReports",params,undefined,false); 
			copyArg(msg,"trendField",params,undefined,false); 
			

			svc.getReportGroupTrend(params,cb);
		}

		
		service.GetResourcePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.getResourcePolicy(params,cb);
		}

		
		service.ImportSourceCredentials=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"token",params,undefined,false); 
			copyArg(n,"serverType",params,undefined,false); 
			copyArg(n,"authType",params,undefined,false); 
			
			copyArg(msg,"username",params,undefined,false); 
			copyArg(msg,"token",params,undefined,false); 
			copyArg(msg,"serverType",params,undefined,false); 
			copyArg(msg,"authType",params,undefined,false); 
			copyArg(msg,"shouldOverwrite",params,undefined,false); 
			

			svc.importSourceCredentials(params,cb);
		}

		
		service.InvalidateProjectCache=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"projectName",params,undefined,false); 
			
			copyArg(msg,"projectName",params,undefined,false); 
			

			svc.invalidateProjectCache(params,cb);
		}

		
		service.ListBuildBatches=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"filter",params,undefined,true); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"sortOrder",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listBuildBatches(params,cb);
		}

		
		service.ListBuildBatchesForProject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"projectName",params,undefined,false); 
			copyArg(msg,"filter",params,undefined,true); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"sortOrder",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listBuildBatchesForProject(params,cb);
		}

		
		service.ListBuilds=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"sortOrder",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listBuilds(params,cb);
		}

		
		service.ListBuildsForProject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"projectName",params,undefined,false); 
			
			copyArg(msg,"projectName",params,undefined,false); 
			copyArg(msg,"sortOrder",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listBuildsForProject(params,cb);
		}

		
		service.ListCuratedEnvironmentImages=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.listCuratedEnvironmentImages(params,cb);
		}

		
		service.ListProjects=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"sortBy",params,undefined,false); 
			copyArg(msg,"sortOrder",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listProjects(params,cb);
		}

		
		service.ListReportGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"sortOrder",params,undefined,false); 
			copyArg(msg,"sortBy",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listReportGroups(params,cb);
		}

		
		service.ListReports=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"sortOrder",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"filter",params,undefined,true); 
			

			svc.listReports(params,cb);
		}

		
		service.ListReportsForReportGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"reportGroupArn",params,undefined,false); 
			
			copyArg(msg,"reportGroupArn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"sortOrder",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"filter",params,undefined,true); 
			

			svc.listReportsForReportGroup(params,cb);
		}

		
		service.ListSharedProjects=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"sortBy",params,undefined,false); 
			copyArg(msg,"sortOrder",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listSharedProjects(params,cb);
		}

		
		service.ListSharedReportGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"sortOrder",params,undefined,false); 
			copyArg(msg,"sortBy",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listSharedReportGroups(params,cb);
		}

		
		service.ListSourceCredentials=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.listSourceCredentials(params,cb);
		}

		
		service.PutResourcePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policy",params,undefined,false); 
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"policy",params,undefined,false); 
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.putResourcePolicy(params,cb);
		}

		
		service.RetryBuild=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"id",params,undefined,false); 
			copyArg(msg,"idempotencyToken",params,undefined,false); 
			

			svc.retryBuild(params,cb);
		}

		
		service.RetryBuildBatch=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"id",params,undefined,false); 
			copyArg(msg,"idempotencyToken",params,undefined,false); 
			copyArg(msg,"retryType",params,undefined,false); 
			

			svc.retryBuildBatch(params,cb);
		}

		
		service.StartBuild=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"projectName",params,undefined,false); 
			
			copyArg(msg,"projectName",params,undefined,false); 
			copyArg(msg,"secondarySourcesOverride",params,undefined,true); 
			copyArg(msg,"secondarySourcesVersionOverride",params,undefined,true); 
			copyArg(msg,"sourceVersion",params,undefined,false); 
			copyArg(msg,"artifactsOverride",params,undefined,true); 
			copyArg(msg,"secondaryArtifactsOverride",params,undefined,true); 
			copyArg(msg,"environmentVariablesOverride",params,undefined,true); 
			copyArg(msg,"sourceTypeOverride",params,undefined,false); 
			copyArg(msg,"sourceLocationOverride",params,undefined,false); 
			copyArg(msg,"sourceAuthOverride",params,undefined,true); 
			copyArg(msg,"gitCloneDepthOverride",params,undefined,false); 
			copyArg(msg,"gitSubmodulesConfigOverride",params,undefined,true); 
			copyArg(msg,"buildspecOverride",params,undefined,false); 
			copyArg(msg,"insecureSslOverride",params,undefined,false); 
			copyArg(msg,"reportBuildStatusOverride",params,undefined,false); 
			copyArg(msg,"buildStatusConfigOverride",params,undefined,true); 
			copyArg(msg,"environmentTypeOverride",params,undefined,false); 
			copyArg(msg,"imageOverride",params,undefined,false); 
			copyArg(msg,"computeTypeOverride",params,undefined,false); 
			copyArg(msg,"certificateOverride",params,undefined,false); 
			copyArg(msg,"cacheOverride",params,undefined,true); 
			copyArg(msg,"serviceRoleOverride",params,undefined,false); 
			copyArg(msg,"privilegedModeOverride",params,undefined,false); 
			copyArg(msg,"timeoutInMinutesOverride",params,undefined,false); 
			copyArg(msg,"queuedTimeoutInMinutesOverride",params,undefined,false); 
			copyArg(msg,"encryptionKeyOverride",params,undefined,false); 
			copyArg(msg,"idempotencyToken",params,undefined,false); 
			copyArg(msg,"logsConfigOverride",params,undefined,true); 
			copyArg(msg,"registryCredentialOverride",params,undefined,true); 
			copyArg(msg,"imagePullCredentialsTypeOverride",params,undefined,false); 
			copyArg(msg,"debugSessionEnabled",params,undefined,false); 
			

			svc.startBuild(params,cb);
		}

		
		service.StartBuildBatch=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"projectName",params,undefined,false); 
			
			copyArg(msg,"projectName",params,undefined,false); 
			copyArg(msg,"secondarySourcesOverride",params,undefined,true); 
			copyArg(msg,"secondarySourcesVersionOverride",params,undefined,true); 
			copyArg(msg,"sourceVersion",params,undefined,false); 
			copyArg(msg,"artifactsOverride",params,undefined,true); 
			copyArg(msg,"secondaryArtifactsOverride",params,undefined,true); 
			copyArg(msg,"environmentVariablesOverride",params,undefined,true); 
			copyArg(msg,"sourceTypeOverride",params,undefined,false); 
			copyArg(msg,"sourceLocationOverride",params,undefined,false); 
			copyArg(msg,"sourceAuthOverride",params,undefined,true); 
			copyArg(msg,"gitCloneDepthOverride",params,undefined,false); 
			copyArg(msg,"gitSubmodulesConfigOverride",params,undefined,true); 
			copyArg(msg,"buildspecOverride",params,undefined,false); 
			copyArg(msg,"insecureSslOverride",params,undefined,false); 
			copyArg(msg,"reportBuildBatchStatusOverride",params,undefined,false); 
			copyArg(msg,"environmentTypeOverride",params,undefined,false); 
			copyArg(msg,"imageOverride",params,undefined,false); 
			copyArg(msg,"computeTypeOverride",params,undefined,false); 
			copyArg(msg,"certificateOverride",params,undefined,false); 
			copyArg(msg,"cacheOverride",params,undefined,true); 
			copyArg(msg,"serviceRoleOverride",params,undefined,false); 
			copyArg(msg,"privilegedModeOverride",params,undefined,false); 
			copyArg(msg,"buildTimeoutInMinutesOverride",params,undefined,false); 
			copyArg(msg,"queuedTimeoutInMinutesOverride",params,undefined,false); 
			copyArg(msg,"encryptionKeyOverride",params,undefined,false); 
			copyArg(msg,"idempotencyToken",params,undefined,false); 
			copyArg(msg,"logsConfigOverride",params,undefined,true); 
			copyArg(msg,"registryCredentialOverride",params,undefined,true); 
			copyArg(msg,"imagePullCredentialsTypeOverride",params,undefined,false); 
			copyArg(msg,"buildBatchConfigOverride",params,undefined,true); 
			copyArg(msg,"debugSessionEnabled",params,undefined,false); 
			

			svc.startBuildBatch(params,cb);
		}

		
		service.StopBuild=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			

			svc.stopBuild(params,cb);
		}

		
		service.StopBuildBatch=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			

			svc.stopBuildBatch(params,cb);
		}

		
		service.UpdateProject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"source",params,undefined,true); 
			copyArg(msg,"secondarySources",params,undefined,true); 
			copyArg(msg,"sourceVersion",params,undefined,false); 
			copyArg(msg,"secondarySourceVersions",params,undefined,true); 
			copyArg(msg,"artifacts",params,undefined,true); 
			copyArg(msg,"secondaryArtifacts",params,undefined,true); 
			copyArg(msg,"cache",params,undefined,true); 
			copyArg(msg,"environment",params,undefined,true); 
			copyArg(msg,"serviceRole",params,undefined,false); 
			copyArg(msg,"timeoutInMinutes",params,undefined,false); 
			copyArg(msg,"queuedTimeoutInMinutes",params,undefined,false); 
			copyArg(msg,"encryptionKey",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"vpcConfig",params,undefined,true); 
			copyArg(msg,"badgeEnabled",params,undefined,false); 
			copyArg(msg,"logsConfig",params,undefined,true); 
			copyArg(msg,"fileSystemLocations",params,undefined,true); 
			copyArg(msg,"buildBatchConfig",params,undefined,true); 
			copyArg(msg,"concurrentBuildLimit",params,undefined,false); 
			

			svc.updateProject(params,cb);
		}

		
		service.UpdateProjectVisibility=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"projectArn",params,undefined,false); 
			copyArg(n,"projectVisibility",params,undefined,false); 
			
			copyArg(msg,"projectArn",params,undefined,false); 
			copyArg(msg,"projectVisibility",params,undefined,false); 
			copyArg(msg,"resourceAccessRole",params,undefined,false); 
			

			svc.updateProjectVisibility(params,cb);
		}

		
		service.UpdateReportGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"exportConfig",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.updateReportGroup(params,cb);
		}

		
		service.UpdateWebhook=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"projectName",params,undefined,false); 
			
			copyArg(msg,"projectName",params,undefined,false); 
			copyArg(msg,"branchFilter",params,undefined,false); 
			copyArg(msg,"rotateSecret",params,undefined,false); 
			copyArg(msg,"filterGroups",params,undefined,true); 
			copyArg(msg,"buildType",params,undefined,false); 
			

			svc.updateWebhook(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS CodeBuild", AmazonAPINode);

};
