
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

		var awsService = new AWS.CodeBuild( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.CodeBuild(msg.AWSConfig) : awsService;

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
		
		service.BatchDeleteBuilds=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ids",params,undefined,true); 
			
			copyArgs(n,"ids",params,undefined,true); 
			
			copyArgs(msg,"ids",params,undefined,true); 
			

			svc.batchDeleteBuilds(params,cb);
		}
		
		service.BatchGetBuildBatches=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ids",params,undefined,true); 
			
			copyArgs(n,"ids",params,undefined,true); 
			
			copyArgs(msg,"ids",params,undefined,true); 
			

			svc.batchGetBuildBatches(params,cb);
		}
		
		service.BatchGetBuilds=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ids",params,undefined,true); 
			
			copyArgs(n,"ids",params,undefined,true); 
			
			copyArgs(msg,"ids",params,undefined,true); 
			

			svc.batchGetBuilds(params,cb);
		}
		
		service.BatchGetProjects=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"names",params,undefined,true); 
			
			copyArgs(n,"names",params,undefined,true); 
			
			copyArgs(msg,"names",params,undefined,true); 
			

			svc.batchGetProjects(params,cb);
		}
		
		service.BatchGetReportGroups=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"reportGroupArns",params,undefined,true); 
			
			copyArgs(n,"reportGroupArns",params,undefined,true); 
			
			copyArgs(msg,"reportGroupArns",params,undefined,true); 
			

			svc.batchGetReportGroups(params,cb);
		}
		
		service.BatchGetReports=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"reportArns",params,undefined,true); 
			
			copyArgs(n,"reportArns",params,undefined,true); 
			
			copyArgs(msg,"reportArns",params,undefined,true); 
			

			svc.batchGetReports(params,cb);
		}
		
		service.CreateProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"source",params,undefined,true); 
			copyArgs(n,"artifacts",params,undefined,true); 
			copyArgs(n,"environment",params,undefined,true); 
			copyArgs(n,"serviceRole",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"source",params,undefined,true); 
			copyArgs(n,"secondarySources",params,undefined,true); 
			copyArgs(n,"sourceVersion",params,undefined,false); 
			copyArgs(n,"secondarySourceVersions",params,undefined,true); 
			copyArgs(n,"artifacts",params,undefined,true); 
			copyArgs(n,"secondaryArtifacts",params,undefined,true); 
			copyArgs(n,"cache",params,undefined,true); 
			copyArgs(n,"environment",params,undefined,true); 
			copyArgs(n,"serviceRole",params,undefined,false); 
			copyArgs(Number(n),"timeoutInMinutes",params,undefined,false); 
			copyArgs(Number(n),"queuedTimeoutInMinutes",params,undefined,false); 
			copyArgs(n,"encryptionKey",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"vpcConfig",params,undefined,true); 
			copyArgs(Boolean(n),"badgeEnabled",params,undefined,false); 
			copyArgs(n,"logsConfig",params,undefined,true); 
			copyArgs(n,"fileSystemLocations",params,undefined,true); 
			copyArgs(n,"buildBatchConfig",params,undefined,true); 
			copyArgs(Number(n),"concurrentBuildLimit",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"source",params,undefined,true); 
			copyArgs(msg,"secondarySources",params,undefined,true); 
			copyArgs(msg,"sourceVersion",params,undefined,false); 
			copyArgs(msg,"secondarySourceVersions",params,undefined,true); 
			copyArgs(msg,"artifacts",params,undefined,true); 
			copyArgs(msg,"secondaryArtifacts",params,undefined,true); 
			copyArgs(msg,"cache",params,undefined,true); 
			copyArgs(msg,"environment",params,undefined,true); 
			copyArgs(msg,"serviceRole",params,undefined,false); 
			copyArgs(msg,"timeoutInMinutes",params,undefined,false); 
			copyArgs(msg,"queuedTimeoutInMinutes",params,undefined,false); 
			copyArgs(msg,"encryptionKey",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"vpcConfig",params,undefined,true); 
			copyArgs(msg,"badgeEnabled",params,undefined,false); 
			copyArgs(msg,"logsConfig",params,undefined,true); 
			copyArgs(msg,"fileSystemLocations",params,undefined,true); 
			copyArgs(msg,"buildBatchConfig",params,undefined,true); 
			copyArgs(msg,"concurrentBuildLimit",params,undefined,false); 
			

			svc.createProject(params,cb);
		}
		
		service.CreateReportGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"_type",params,"type",false); 
			copyArgs(n,"exportConfig",params,undefined,true); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"type",params,undefined,false); 
			copyArgs(n,"exportConfig",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"type",params,undefined,false); 
			copyArgs(msg,"exportConfig",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createReportGroup(params,cb);
		}
		
		service.CreateWebhook=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectName",params,undefined,false); 
			
			copyArgs(n,"projectName",params,undefined,false); 
			copyArgs(n,"branchFilter",params,undefined,false); 
			copyArgs(n,"filterGroups",params,undefined,true); 
			copyArgs(n,"buildType",params,undefined,false); 
			
			copyArgs(msg,"projectName",params,undefined,false); 
			copyArgs(msg,"branchFilter",params,undefined,false); 
			copyArgs(msg,"filterGroups",params,undefined,true); 
			copyArgs(msg,"buildType",params,undefined,false); 
			

			svc.createWebhook(params,cb);
		}
		
		service.DeleteBuildBatch=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.deleteBuildBatch(params,cb);
		}
		
		service.DeleteProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.deleteProject(params,cb);
		}
		
		service.DeleteReport=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.deleteReport(params,cb);
		}
		
		service.DeleteReportGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(Boolean(n),"deleteReports",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"deleteReports",params,undefined,false); 
			

			svc.deleteReportGroup(params,cb);
		}
		
		service.DeleteResourcePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.deleteResourcePolicy(params,cb);
		}
		
		service.DeleteSourceCredentials=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.deleteSourceCredentials(params,cb);
		}
		
		service.DeleteWebhook=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectName",params,undefined,false); 
			
			copyArgs(n,"projectName",params,undefined,false); 
			
			copyArgs(msg,"projectName",params,undefined,false); 
			

			svc.deleteWebhook(params,cb);
		}
		
		service.DescribeCodeCoverages=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"reportArn",params,undefined,false); 
			
			copyArgs(n,"reportArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"sortOrder",params,undefined,false); 
			copyArgs(n,"sortBy",params,undefined,false); 
			copyArgs(n,"minLineCoveragePercentage",params,undefined,false); 
			copyArgs(n,"maxLineCoveragePercentage",params,undefined,false); 
			
			copyArgs(msg,"reportArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"sortOrder",params,undefined,false); 
			copyArgs(msg,"sortBy",params,undefined,false); 
			copyArgs(msg,"minLineCoveragePercentage",params,undefined,false); 
			copyArgs(msg,"maxLineCoveragePercentage",params,undefined,false); 
			

			svc.describeCodeCoverages(params,cb);
		}
		
		service.DescribeTestCases=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"reportArn",params,undefined,false); 
			
			copyArgs(n,"reportArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"filter",params,undefined,false); 
			
			copyArgs(msg,"reportArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"filter",params,undefined,false); 
			

			svc.describeTestCases(params,cb);
		}
		
		service.GetReportGroupTrend=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"reportGroupArn",params,undefined,false); 
			copyArgs(n,"trendField",params,undefined,false); 
			
			copyArgs(n,"reportGroupArn",params,undefined,false); 
			copyArgs(Number(n),"numOfReports",params,undefined,false); 
			copyArgs(n,"trendField",params,undefined,false); 
			
			copyArgs(msg,"reportGroupArn",params,undefined,false); 
			copyArgs(msg,"numOfReports",params,undefined,false); 
			copyArgs(msg,"trendField",params,undefined,false); 
			

			svc.getReportGroupTrend(params,cb);
		}
		
		service.GetResourcePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.getResourcePolicy(params,cb);
		}
		
		service.ImportSourceCredentials=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"token",params,undefined,false); 
			copyArgs(n,"serverType",params,undefined,false); 
			copyArgs(n,"authType",params,undefined,false); 
			
			copyArgs(n,"username",params,undefined,false); 
			copyArgs(n,"token",params,undefined,false); 
			copyArgs(n,"serverType",params,undefined,false); 
			copyArgs(n,"authType",params,undefined,false); 
			copyArgs(Boolean(n),"shouldOverwrite",params,undefined,false); 
			
			copyArgs(msg,"username",params,undefined,false); 
			copyArgs(msg,"token",params,undefined,false); 
			copyArgs(msg,"serverType",params,undefined,false); 
			copyArgs(msg,"authType",params,undefined,false); 
			copyArgs(msg,"shouldOverwrite",params,undefined,false); 
			

			svc.importSourceCredentials(params,cb);
		}
		
		service.InvalidateProjectCache=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectName",params,undefined,false); 
			
			copyArgs(n,"projectName",params,undefined,false); 
			
			copyArgs(msg,"projectName",params,undefined,false); 
			

			svc.invalidateProjectCache(params,cb);
		}
		
		service.ListBuildBatches=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"filter",params,undefined,true); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"sortOrder",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"filter",params,undefined,true); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"sortOrder",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listBuildBatches(params,cb);
		}
		
		service.ListBuildBatchesForProject=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"projectName",params,undefined,false); 
			copyArgs(n,"filter",params,undefined,true); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"sortOrder",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"projectName",params,undefined,false); 
			copyArgs(msg,"filter",params,undefined,true); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"sortOrder",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listBuildBatchesForProject(params,cb);
		}
		
		service.ListBuilds=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"sortOrder",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"sortOrder",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listBuilds(params,cb);
		}
		
		service.ListBuildsForProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectName",params,undefined,false); 
			
			copyArgs(n,"projectName",params,undefined,false); 
			copyArgs(n,"sortOrder",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"projectName",params,undefined,false); 
			copyArgs(msg,"sortOrder",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listBuildsForProject(params,cb);
		}
		
		service.ListCuratedEnvironmentImages=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.listCuratedEnvironmentImages(params,cb);
		}
		
		service.ListProjects=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"sortBy",params,undefined,false); 
			copyArgs(n,"sortOrder",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"sortBy",params,undefined,false); 
			copyArgs(msg,"sortOrder",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listProjects(params,cb);
		}
		
		service.ListReportGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"sortOrder",params,undefined,false); 
			copyArgs(n,"sortBy",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"sortOrder",params,undefined,false); 
			copyArgs(msg,"sortBy",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listReportGroups(params,cb);
		}
		
		service.ListReports=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"sortOrder",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"filter",params,undefined,true); 
			
			copyArgs(msg,"sortOrder",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"filter",params,undefined,true); 
			

			svc.listReports(params,cb);
		}
		
		service.ListReportsForReportGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"reportGroupArn",params,undefined,false); 
			
			copyArgs(n,"reportGroupArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"sortOrder",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"filter",params,undefined,true); 
			
			copyArgs(msg,"reportGroupArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"sortOrder",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"filter",params,undefined,true); 
			

			svc.listReportsForReportGroup(params,cb);
		}
		
		service.ListSharedProjects=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"sortBy",params,undefined,false); 
			copyArgs(n,"sortOrder",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"sortBy",params,undefined,false); 
			copyArgs(msg,"sortOrder",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listSharedProjects(params,cb);
		}
		
		service.ListSharedReportGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"sortOrder",params,undefined,false); 
			copyArgs(n,"sortBy",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"sortOrder",params,undefined,false); 
			copyArgs(msg,"sortBy",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listSharedReportGroups(params,cb);
		}
		
		service.ListSourceCredentials=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.listSourceCredentials(params,cb);
		}
		
		service.PutResourcePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"policy",params,undefined,false); 
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"policy",params,undefined,false); 
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"policy",params,undefined,false); 
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.putResourcePolicy(params,cb);
		}
		
		service.RetryBuild=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"idempotencyToken",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			copyArgs(msg,"idempotencyToken",params,undefined,false); 
			

			svc.retryBuild(params,cb);
		}
		
		service.RetryBuildBatch=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"idempotencyToken",params,undefined,false); 
			copyArgs(n,"retryType",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			copyArgs(msg,"idempotencyToken",params,undefined,false); 
			copyArgs(msg,"retryType",params,undefined,false); 
			

			svc.retryBuildBatch(params,cb);
		}
		
		service.StartBuild=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectName",params,undefined,false); 
			
			copyArgs(n,"projectName",params,undefined,false); 
			copyArgs(n,"secondarySourcesOverride",params,undefined,true); 
			copyArgs(n,"secondarySourcesVersionOverride",params,undefined,true); 
			copyArgs(n,"sourceVersion",params,undefined,false); 
			copyArgs(n,"artifactsOverride",params,undefined,true); 
			copyArgs(n,"secondaryArtifactsOverride",params,undefined,true); 
			copyArgs(n,"environmentVariablesOverride",params,undefined,true); 
			copyArgs(n,"sourceTypeOverride",params,undefined,false); 
			copyArgs(n,"sourceLocationOverride",params,undefined,false); 
			copyArgs(n,"sourceAuthOverride",params,undefined,true); 
			copyArgs(Number(n),"gitCloneDepthOverride",params,undefined,false); 
			copyArgs(n,"gitSubmodulesConfigOverride",params,undefined,true); 
			copyArgs(n,"buildspecOverride",params,undefined,false); 
			copyArgs(Boolean(n),"insecureSslOverride",params,undefined,false); 
			copyArgs(Boolean(n),"reportBuildStatusOverride",params,undefined,false); 
			copyArgs(n,"buildStatusConfigOverride",params,undefined,true); 
			copyArgs(n,"environmentTypeOverride",params,undefined,false); 
			copyArgs(n,"imageOverride",params,undefined,false); 
			copyArgs(n,"computeTypeOverride",params,undefined,false); 
			copyArgs(n,"certificateOverride",params,undefined,false); 
			copyArgs(n,"cacheOverride",params,undefined,true); 
			copyArgs(n,"serviceRoleOverride",params,undefined,false); 
			copyArgs(Boolean(n),"privilegedModeOverride",params,undefined,false); 
			copyArgs(Number(n),"timeoutInMinutesOverride",params,undefined,false); 
			copyArgs(Number(n),"queuedTimeoutInMinutesOverride",params,undefined,false); 
			copyArgs(n,"encryptionKeyOverride",params,undefined,false); 
			copyArgs(n,"idempotencyToken",params,undefined,false); 
			copyArgs(n,"logsConfigOverride",params,undefined,true); 
			copyArgs(n,"registryCredentialOverride",params,undefined,true); 
			copyArgs(n,"imagePullCredentialsTypeOverride",params,undefined,false); 
			copyArgs(Boolean(n),"debugSessionEnabled",params,undefined,false); 
			
			copyArgs(msg,"projectName",params,undefined,false); 
			copyArgs(msg,"secondarySourcesOverride",params,undefined,true); 
			copyArgs(msg,"secondarySourcesVersionOverride",params,undefined,true); 
			copyArgs(msg,"sourceVersion",params,undefined,false); 
			copyArgs(msg,"artifactsOverride",params,undefined,true); 
			copyArgs(msg,"secondaryArtifactsOverride",params,undefined,true); 
			copyArgs(msg,"environmentVariablesOverride",params,undefined,true); 
			copyArgs(msg,"sourceTypeOverride",params,undefined,false); 
			copyArgs(msg,"sourceLocationOverride",params,undefined,false); 
			copyArgs(msg,"sourceAuthOverride",params,undefined,true); 
			copyArgs(msg,"gitCloneDepthOverride",params,undefined,false); 
			copyArgs(msg,"gitSubmodulesConfigOverride",params,undefined,true); 
			copyArgs(msg,"buildspecOverride",params,undefined,false); 
			copyArgs(msg,"insecureSslOverride",params,undefined,false); 
			copyArgs(msg,"reportBuildStatusOverride",params,undefined,false); 
			copyArgs(msg,"buildStatusConfigOverride",params,undefined,true); 
			copyArgs(msg,"environmentTypeOverride",params,undefined,false); 
			copyArgs(msg,"imageOverride",params,undefined,false); 
			copyArgs(msg,"computeTypeOverride",params,undefined,false); 
			copyArgs(msg,"certificateOverride",params,undefined,false); 
			copyArgs(msg,"cacheOverride",params,undefined,true); 
			copyArgs(msg,"serviceRoleOverride",params,undefined,false); 
			copyArgs(msg,"privilegedModeOverride",params,undefined,false); 
			copyArgs(msg,"timeoutInMinutesOverride",params,undefined,false); 
			copyArgs(msg,"queuedTimeoutInMinutesOverride",params,undefined,false); 
			copyArgs(msg,"encryptionKeyOverride",params,undefined,false); 
			copyArgs(msg,"idempotencyToken",params,undefined,false); 
			copyArgs(msg,"logsConfigOverride",params,undefined,true); 
			copyArgs(msg,"registryCredentialOverride",params,undefined,true); 
			copyArgs(msg,"imagePullCredentialsTypeOverride",params,undefined,false); 
			copyArgs(msg,"debugSessionEnabled",params,undefined,false); 
			

			svc.startBuild(params,cb);
		}
		
		service.StartBuildBatch=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectName",params,undefined,false); 
			
			copyArgs(n,"projectName",params,undefined,false); 
			copyArgs(n,"secondarySourcesOverride",params,undefined,true); 
			copyArgs(n,"secondarySourcesVersionOverride",params,undefined,true); 
			copyArgs(n,"sourceVersion",params,undefined,false); 
			copyArgs(n,"artifactsOverride",params,undefined,true); 
			copyArgs(n,"secondaryArtifactsOverride",params,undefined,true); 
			copyArgs(n,"environmentVariablesOverride",params,undefined,true); 
			copyArgs(n,"sourceTypeOverride",params,undefined,false); 
			copyArgs(n,"sourceLocationOverride",params,undefined,false); 
			copyArgs(n,"sourceAuthOverride",params,undefined,true); 
			copyArgs(Number(n),"gitCloneDepthOverride",params,undefined,false); 
			copyArgs(n,"gitSubmodulesConfigOverride",params,undefined,true); 
			copyArgs(n,"buildspecOverride",params,undefined,false); 
			copyArgs(Boolean(n),"insecureSslOverride",params,undefined,false); 
			copyArgs(Boolean(n),"reportBuildBatchStatusOverride",params,undefined,false); 
			copyArgs(n,"environmentTypeOverride",params,undefined,false); 
			copyArgs(n,"imageOverride",params,undefined,false); 
			copyArgs(n,"computeTypeOverride",params,undefined,false); 
			copyArgs(n,"certificateOverride",params,undefined,false); 
			copyArgs(n,"cacheOverride",params,undefined,true); 
			copyArgs(n,"serviceRoleOverride",params,undefined,false); 
			copyArgs(Boolean(n),"privilegedModeOverride",params,undefined,false); 
			copyArgs(Number(n),"buildTimeoutInMinutesOverride",params,undefined,false); 
			copyArgs(Number(n),"queuedTimeoutInMinutesOverride",params,undefined,false); 
			copyArgs(n,"encryptionKeyOverride",params,undefined,false); 
			copyArgs(n,"idempotencyToken",params,undefined,false); 
			copyArgs(n,"logsConfigOverride",params,undefined,true); 
			copyArgs(n,"registryCredentialOverride",params,undefined,true); 
			copyArgs(n,"imagePullCredentialsTypeOverride",params,undefined,false); 
			copyArgs(n,"buildBatchConfigOverride",params,undefined,true); 
			copyArgs(Boolean(n),"debugSessionEnabled",params,undefined,false); 
			
			copyArgs(msg,"projectName",params,undefined,false); 
			copyArgs(msg,"secondarySourcesOverride",params,undefined,true); 
			copyArgs(msg,"secondarySourcesVersionOverride",params,undefined,true); 
			copyArgs(msg,"sourceVersion",params,undefined,false); 
			copyArgs(msg,"artifactsOverride",params,undefined,true); 
			copyArgs(msg,"secondaryArtifactsOverride",params,undefined,true); 
			copyArgs(msg,"environmentVariablesOverride",params,undefined,true); 
			copyArgs(msg,"sourceTypeOverride",params,undefined,false); 
			copyArgs(msg,"sourceLocationOverride",params,undefined,false); 
			copyArgs(msg,"sourceAuthOverride",params,undefined,true); 
			copyArgs(msg,"gitCloneDepthOverride",params,undefined,false); 
			copyArgs(msg,"gitSubmodulesConfigOverride",params,undefined,true); 
			copyArgs(msg,"buildspecOverride",params,undefined,false); 
			copyArgs(msg,"insecureSslOverride",params,undefined,false); 
			copyArgs(msg,"reportBuildBatchStatusOverride",params,undefined,false); 
			copyArgs(msg,"environmentTypeOverride",params,undefined,false); 
			copyArgs(msg,"imageOverride",params,undefined,false); 
			copyArgs(msg,"computeTypeOverride",params,undefined,false); 
			copyArgs(msg,"certificateOverride",params,undefined,false); 
			copyArgs(msg,"cacheOverride",params,undefined,true); 
			copyArgs(msg,"serviceRoleOverride",params,undefined,false); 
			copyArgs(msg,"privilegedModeOverride",params,undefined,false); 
			copyArgs(msg,"buildTimeoutInMinutesOverride",params,undefined,false); 
			copyArgs(msg,"queuedTimeoutInMinutesOverride",params,undefined,false); 
			copyArgs(msg,"encryptionKeyOverride",params,undefined,false); 
			copyArgs(msg,"idempotencyToken",params,undefined,false); 
			copyArgs(msg,"logsConfigOverride",params,undefined,true); 
			copyArgs(msg,"registryCredentialOverride",params,undefined,true); 
			copyArgs(msg,"imagePullCredentialsTypeOverride",params,undefined,false); 
			copyArgs(msg,"buildBatchConfigOverride",params,undefined,true); 
			copyArgs(msg,"debugSessionEnabled",params,undefined,false); 
			

			svc.startBuildBatch(params,cb);
		}
		
		service.StopBuild=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.stopBuild(params,cb);
		}
		
		service.StopBuildBatch=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.stopBuildBatch(params,cb);
		}
		
		service.UpdateProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"source",params,undefined,true); 
			copyArgs(n,"secondarySources",params,undefined,true); 
			copyArgs(n,"sourceVersion",params,undefined,false); 
			copyArgs(n,"secondarySourceVersions",params,undefined,true); 
			copyArgs(n,"artifacts",params,undefined,true); 
			copyArgs(n,"secondaryArtifacts",params,undefined,true); 
			copyArgs(n,"cache",params,undefined,true); 
			copyArgs(n,"environment",params,undefined,true); 
			copyArgs(n,"serviceRole",params,undefined,false); 
			copyArgs(Number(n),"timeoutInMinutes",params,undefined,false); 
			copyArgs(Number(n),"queuedTimeoutInMinutes",params,undefined,false); 
			copyArgs(n,"encryptionKey",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"vpcConfig",params,undefined,true); 
			copyArgs(Boolean(n),"badgeEnabled",params,undefined,false); 
			copyArgs(n,"logsConfig",params,undefined,true); 
			copyArgs(n,"fileSystemLocations",params,undefined,true); 
			copyArgs(n,"buildBatchConfig",params,undefined,true); 
			copyArgs(Number(n),"concurrentBuildLimit",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"source",params,undefined,true); 
			copyArgs(msg,"secondarySources",params,undefined,true); 
			copyArgs(msg,"sourceVersion",params,undefined,false); 
			copyArgs(msg,"secondarySourceVersions",params,undefined,true); 
			copyArgs(msg,"artifacts",params,undefined,true); 
			copyArgs(msg,"secondaryArtifacts",params,undefined,true); 
			copyArgs(msg,"cache",params,undefined,true); 
			copyArgs(msg,"environment",params,undefined,true); 
			copyArgs(msg,"serviceRole",params,undefined,false); 
			copyArgs(msg,"timeoutInMinutes",params,undefined,false); 
			copyArgs(msg,"queuedTimeoutInMinutes",params,undefined,false); 
			copyArgs(msg,"encryptionKey",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"vpcConfig",params,undefined,true); 
			copyArgs(msg,"badgeEnabled",params,undefined,false); 
			copyArgs(msg,"logsConfig",params,undefined,true); 
			copyArgs(msg,"fileSystemLocations",params,undefined,true); 
			copyArgs(msg,"buildBatchConfig",params,undefined,true); 
			copyArgs(msg,"concurrentBuildLimit",params,undefined,false); 
			

			svc.updateProject(params,cb);
		}
		
		service.UpdateProjectVisibility=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectArn",params,undefined,false); 
			copyArgs(n,"projectVisibility",params,undefined,false); 
			
			copyArgs(n,"projectArn",params,undefined,false); 
			copyArgs(n,"projectVisibility",params,undefined,false); 
			copyArgs(n,"resourceAccessRole",params,undefined,false); 
			
			copyArgs(msg,"projectArn",params,undefined,false); 
			copyArgs(msg,"projectVisibility",params,undefined,false); 
			copyArgs(msg,"resourceAccessRole",params,undefined,false); 
			

			svc.updateProjectVisibility(params,cb);
		}
		
		service.UpdateReportGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"exportConfig",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"exportConfig",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.updateReportGroup(params,cb);
		}
		
		service.UpdateWebhook=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectName",params,undefined,false); 
			
			copyArgs(n,"projectName",params,undefined,false); 
			copyArgs(n,"branchFilter",params,undefined,false); 
			copyArgs(Boolean(n),"rotateSecret",params,undefined,false); 
			copyArgs(n,"filterGroups",params,undefined,true); 
			copyArgs(n,"buildType",params,undefined,false); 
			
			copyArgs(msg,"projectName",params,undefined,false); 
			copyArgs(msg,"branchFilter",params,undefined,false); 
			copyArgs(msg,"rotateSecret",params,undefined,false); 
			copyArgs(msg,"filterGroups",params,undefined,true); 
			copyArgs(msg,"buildType",params,undefined,false); 
			

			svc.updateWebhook(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS CodeBuild", AmazonAPINode);

};
