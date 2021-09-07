
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

		var awsService = new AWS.CodeCommit( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.CodeCommit(msg.AWSConfig) : awsService;

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

		
		service.AssociateApprovalRuleTemplateWithRepository=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"approvalRuleTemplateName",params,undefined,false); 
			copyArgs(n,"repositoryName",params,undefined,false); 
			
			copyArgs(n,"approvalRuleTemplateName",params,undefined,false); 
			copyArgs(n,"repositoryName",params,undefined,false); 
			
			copyArgs(msg,"approvalRuleTemplateName",params,undefined,false); 
			copyArgs(msg,"repositoryName",params,undefined,false); 
			

			svc.associateApprovalRuleTemplateWithRepository(params,cb);
		}

		
		service.BatchAssociateApprovalRuleTemplateWithRepositories=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"approvalRuleTemplateName",params,undefined,false); 
			copyArgs(n,"repositoryNames",params,undefined,true); 
			
			copyArgs(n,"approvalRuleTemplateName",params,undefined,false); 
			copyArgs(n,"repositoryNames",params,undefined,true); 
			
			copyArgs(msg,"approvalRuleTemplateName",params,undefined,false); 
			copyArgs(msg,"repositoryNames",params,undefined,true); 
			

			svc.batchAssociateApprovalRuleTemplateWithRepositories(params,cb);
		}

		
		service.BatchDescribeMergeConflicts=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"destinationCommitSpecifier",params,undefined,false); 
			copyArgs(n,"sourceCommitSpecifier",params,undefined,false); 
			copyArgs(n,"mergeOption",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"destinationCommitSpecifier",params,undefined,false); 
			copyArgs(n,"sourceCommitSpecifier",params,undefined,false); 
			copyArgs(n,"mergeOption",params,undefined,false); 
			copyArgs(n,"maxMergeHunks",params,undefined,false); 
			copyArgs(n,"maxConflictFiles",params,undefined,false); 
			copyArgs(n,"filePaths",params,undefined,false); 
			copyArgs(n,"conflictDetailLevel",params,undefined,false); 
			copyArgs(n,"conflictResolutionStrategy",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"destinationCommitSpecifier",params,undefined,false); 
			copyArgs(msg,"sourceCommitSpecifier",params,undefined,false); 
			copyArgs(msg,"mergeOption",params,undefined,false); 
			copyArgs(msg,"maxMergeHunks",params,undefined,false); 
			copyArgs(msg,"maxConflictFiles",params,undefined,false); 
			copyArgs(msg,"filePaths",params,undefined,false); 
			copyArgs(msg,"conflictDetailLevel",params,undefined,false); 
			copyArgs(msg,"conflictResolutionStrategy",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.batchDescribeMergeConflicts(params,cb);
		}

		
		service.BatchDisassociateApprovalRuleTemplateFromRepositories=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"approvalRuleTemplateName",params,undefined,false); 
			copyArgs(n,"repositoryNames",params,undefined,true); 
			
			copyArgs(n,"approvalRuleTemplateName",params,undefined,false); 
			copyArgs(n,"repositoryNames",params,undefined,true); 
			
			copyArgs(msg,"approvalRuleTemplateName",params,undefined,false); 
			copyArgs(msg,"repositoryNames",params,undefined,true); 
			

			svc.batchDisassociateApprovalRuleTemplateFromRepositories(params,cb);
		}

		
		service.BatchGetCommits=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"commitIds",params,undefined,false); 
			copyArgs(n,"repositoryName",params,undefined,false); 
			
			copyArgs(n,"commitIds",params,undefined,false); 
			copyArgs(n,"repositoryName",params,undefined,false); 
			
			copyArgs(msg,"commitIds",params,undefined,false); 
			copyArgs(msg,"repositoryName",params,undefined,false); 
			

			svc.batchGetCommits(params,cb);
		}

		
		service.BatchGetRepositories=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryNames",params,undefined,true); 
			
			copyArgs(n,"repositoryNames",params,undefined,true); 
			
			copyArgs(msg,"repositoryNames",params,undefined,true); 
			

			svc.batchGetRepositories(params,cb);
		}

		
		service.CreateApprovalRuleTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"approvalRuleTemplateName",params,undefined,false); 
			copyArgs(n,"approvalRuleTemplateContent",params,undefined,false); 
			
			copyArgs(n,"approvalRuleTemplateName",params,undefined,false); 
			copyArgs(n,"approvalRuleTemplateContent",params,undefined,false); 
			copyArgs(n,"approvalRuleTemplateDescription",params,undefined,false); 
			
			copyArgs(msg,"approvalRuleTemplateName",params,undefined,false); 
			copyArgs(msg,"approvalRuleTemplateContent",params,undefined,false); 
			copyArgs(msg,"approvalRuleTemplateDescription",params,undefined,false); 
			

			svc.createApprovalRuleTemplate(params,cb);
		}

		
		service.CreateBranch=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			copyArgs(n,"commitId",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			copyArgs(n,"commitId",params,undefined,false); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"branchName",params,undefined,false); 
			copyArgs(msg,"commitId",params,undefined,false); 
			

			svc.createBranch(params,cb);
		}

		
		service.CreateCommit=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			copyArgs(n,"parentCommitId",params,undefined,false); 
			copyArgs(n,"authorName",params,undefined,false); 
			copyArgs(n,"email",params,undefined,false); 
			copyArgs(n,"commitMessage",params,undefined,false); 
			copyArgs(n,"keepEmptyFolders",params,undefined,false); 
			copyArgs(n,"putFiles",params,undefined,false); 
			copyArgs(n,"deleteFiles",params,undefined,true); 
			copyArgs(n,"setFileModes",params,undefined,true); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"branchName",params,undefined,false); 
			copyArgs(msg,"parentCommitId",params,undefined,false); 
			copyArgs(msg,"authorName",params,undefined,false); 
			copyArgs(msg,"email",params,undefined,false); 
			copyArgs(msg,"commitMessage",params,undefined,false); 
			copyArgs(msg,"keepEmptyFolders",params,undefined,false); 
			copyArgs(msg,"putFiles",params,undefined,false); 
			copyArgs(msg,"deleteFiles",params,undefined,true); 
			copyArgs(msg,"setFileModes",params,undefined,true); 
			

			svc.createCommit(params,cb);
		}

		
		service.CreatePullRequest=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"title",params,undefined,false); 
			copyArgs(n,"targets",params,undefined,false); 
			
			copyArgs(n,"title",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"targets",params,undefined,false); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"title",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"targets",params,undefined,false); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			

			svc.createPullRequest(params,cb);
		}

		
		service.CreatePullRequestApprovalRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"approvalRuleName",params,undefined,false); 
			copyArgs(n,"approvalRuleContent",params,undefined,false); 
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"approvalRuleName",params,undefined,false); 
			copyArgs(n,"approvalRuleContent",params,undefined,false); 
			
			copyArgs(msg,"pullRequestId",params,undefined,false); 
			copyArgs(msg,"approvalRuleName",params,undefined,false); 
			copyArgs(msg,"approvalRuleContent",params,undefined,false); 
			

			svc.createPullRequestApprovalRule(params,cb);
		}

		
		service.CreateRepository=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"repositoryDescription",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"repositoryDescription",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createRepository(params,cb);
		}

		
		service.CreateUnreferencedMergeCommit=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"sourceCommitSpecifier",params,undefined,false); 
			copyArgs(n,"destinationCommitSpecifier",params,undefined,false); 
			copyArgs(n,"mergeOption",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"sourceCommitSpecifier",params,undefined,false); 
			copyArgs(n,"destinationCommitSpecifier",params,undefined,false); 
			copyArgs(n,"mergeOption",params,undefined,false); 
			copyArgs(n,"conflictDetailLevel",params,undefined,false); 
			copyArgs(n,"conflictResolutionStrategy",params,undefined,false); 
			copyArgs(n,"authorName",params,undefined,false); 
			copyArgs(n,"email",params,undefined,false); 
			copyArgs(n,"commitMessage",params,undefined,false); 
			copyArgs(n,"keepEmptyFolders",params,undefined,false); 
			copyArgs(n,"conflictResolution",params,undefined,true); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"sourceCommitSpecifier",params,undefined,false); 
			copyArgs(msg,"destinationCommitSpecifier",params,undefined,false); 
			copyArgs(msg,"mergeOption",params,undefined,false); 
			copyArgs(msg,"conflictDetailLevel",params,undefined,false); 
			copyArgs(msg,"conflictResolutionStrategy",params,undefined,false); 
			copyArgs(msg,"authorName",params,undefined,false); 
			copyArgs(msg,"email",params,undefined,false); 
			copyArgs(msg,"commitMessage",params,undefined,false); 
			copyArgs(msg,"keepEmptyFolders",params,undefined,false); 
			copyArgs(msg,"conflictResolution",params,undefined,true); 
			

			svc.createUnreferencedMergeCommit(params,cb);
		}

		
		service.DeleteApprovalRuleTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"approvalRuleTemplateName",params,undefined,false); 
			
			copyArgs(n,"approvalRuleTemplateName",params,undefined,false); 
			
			copyArgs(msg,"approvalRuleTemplateName",params,undefined,false); 
			

			svc.deleteApprovalRuleTemplate(params,cb);
		}

		
		service.DeleteBranch=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"branchName",params,undefined,false); 
			

			svc.deleteBranch(params,cb);
		}

		
		service.DeleteCommentContent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"commentId",params,undefined,false); 
			
			copyArgs(n,"commentId",params,undefined,false); 
			
			copyArgs(msg,"commentId",params,undefined,false); 
			

			svc.deleteCommentContent(params,cb);
		}

		
		service.DeleteFile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			copyArgs(n,"filePath",params,undefined,false); 
			copyArgs(n,"parentCommitId",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			copyArgs(n,"filePath",params,undefined,false); 
			copyArgs(n,"parentCommitId",params,undefined,false); 
			copyArgs(n,"keepEmptyFolders",params,undefined,false); 
			copyArgs(n,"commitMessage",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"email",params,undefined,false); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"branchName",params,undefined,false); 
			copyArgs(msg,"filePath",params,undefined,false); 
			copyArgs(msg,"parentCommitId",params,undefined,false); 
			copyArgs(msg,"keepEmptyFolders",params,undefined,false); 
			copyArgs(msg,"commitMessage",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"email",params,undefined,false); 
			

			svc.deleteFile(params,cb);
		}

		
		service.DeletePullRequestApprovalRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"approvalRuleName",params,undefined,false); 
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"approvalRuleName",params,undefined,false); 
			
			copyArgs(msg,"pullRequestId",params,undefined,false); 
			copyArgs(msg,"approvalRuleName",params,undefined,false); 
			

			svc.deletePullRequestApprovalRule(params,cb);
		}

		
		service.DeleteRepository=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			

			svc.deleteRepository(params,cb);
		}

		
		service.DescribeMergeConflicts=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"destinationCommitSpecifier",params,undefined,false); 
			copyArgs(n,"sourceCommitSpecifier",params,undefined,false); 
			copyArgs(n,"mergeOption",params,undefined,false); 
			copyArgs(n,"filePath",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"destinationCommitSpecifier",params,undefined,false); 
			copyArgs(n,"sourceCommitSpecifier",params,undefined,false); 
			copyArgs(n,"mergeOption",params,undefined,false); 
			copyArgs(n,"maxMergeHunks",params,undefined,false); 
			copyArgs(n,"filePath",params,undefined,false); 
			copyArgs(n,"conflictDetailLevel",params,undefined,false); 
			copyArgs(n,"conflictResolutionStrategy",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"destinationCommitSpecifier",params,undefined,false); 
			copyArgs(msg,"sourceCommitSpecifier",params,undefined,false); 
			copyArgs(msg,"mergeOption",params,undefined,false); 
			copyArgs(msg,"maxMergeHunks",params,undefined,false); 
			copyArgs(msg,"filePath",params,undefined,false); 
			copyArgs(msg,"conflictDetailLevel",params,undefined,false); 
			copyArgs(msg,"conflictResolutionStrategy",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.describeMergeConflicts(params,cb);
		}

		
		service.DescribePullRequestEvents=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"pullRequestEventType",params,undefined,false); 
			copyArgs(n,"actorArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"pullRequestId",params,undefined,false); 
			copyArgs(msg,"pullRequestEventType",params,undefined,false); 
			copyArgs(msg,"actorArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.describePullRequestEvents(params,cb);
		}

		
		service.DisassociateApprovalRuleTemplateFromRepository=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"approvalRuleTemplateName",params,undefined,false); 
			copyArgs(n,"repositoryName",params,undefined,false); 
			
			copyArgs(n,"approvalRuleTemplateName",params,undefined,false); 
			copyArgs(n,"repositoryName",params,undefined,false); 
			
			copyArgs(msg,"approvalRuleTemplateName",params,undefined,false); 
			copyArgs(msg,"repositoryName",params,undefined,false); 
			

			svc.disassociateApprovalRuleTemplateFromRepository(params,cb);
		}

		
		service.EvaluatePullRequestApprovalRules=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"revisionId",params,undefined,false); 
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"revisionId",params,undefined,false); 
			
			copyArgs(msg,"pullRequestId",params,undefined,false); 
			copyArgs(msg,"revisionId",params,undefined,false); 
			

			svc.evaluatePullRequestApprovalRules(params,cb);
		}

		
		service.GetApprovalRuleTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"approvalRuleTemplateName",params,undefined,false); 
			
			copyArgs(n,"approvalRuleTemplateName",params,undefined,false); 
			
			copyArgs(msg,"approvalRuleTemplateName",params,undefined,false); 
			

			svc.getApprovalRuleTemplate(params,cb);
		}

		
		service.GetBlob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"blobId",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"blobId",params,undefined,false); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"blobId",params,undefined,false); 
			

			svc.getBlob(params,cb);
		}

		
		service.GetBranch=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"branchName",params,undefined,false); 
			

			svc.getBranch(params,cb);
		}

		
		service.GetComment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"commentId",params,undefined,false); 
			
			copyArgs(n,"commentId",params,undefined,false); 
			
			copyArgs(msg,"commentId",params,undefined,false); 
			

			svc.getComment(params,cb);
		}

		
		service.GetCommentReactions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"commentId",params,undefined,false); 
			
			copyArgs(n,"commentId",params,undefined,false); 
			copyArgs(n,"reactionUserArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"commentId",params,undefined,false); 
			copyArgs(msg,"reactionUserArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getCommentReactions(params,cb);
		}

		
		service.GetCommentsForComparedCommit=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"afterCommitId",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"beforeCommitId",params,undefined,false); 
			copyArgs(n,"afterCommitId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"beforeCommitId",params,undefined,false); 
			copyArgs(msg,"afterCommitId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getCommentsForComparedCommit(params,cb);
		}

		
		service.GetCommentsForPullRequest=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"beforeCommitId",params,undefined,false); 
			copyArgs(n,"afterCommitId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"pullRequestId",params,undefined,false); 
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"beforeCommitId",params,undefined,false); 
			copyArgs(msg,"afterCommitId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getCommentsForPullRequest(params,cb);
		}

		
		service.GetCommit=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"commitId",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"commitId",params,undefined,false); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"commitId",params,undefined,false); 
			

			svc.getCommit(params,cb);
		}

		
		service.GetDifferences=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"afterCommitSpecifier",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"beforeCommitSpecifier",params,undefined,false); 
			copyArgs(n,"afterCommitSpecifier",params,undefined,false); 
			copyArgs(n,"beforePath",params,undefined,false); 
			copyArgs(n,"afterPath",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"beforeCommitSpecifier",params,undefined,false); 
			copyArgs(msg,"afterCommitSpecifier",params,undefined,false); 
			copyArgs(msg,"beforePath",params,undefined,false); 
			copyArgs(msg,"afterPath",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getDifferences(params,cb);
		}

		
		service.GetFile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"filePath",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"commitSpecifier",params,undefined,false); 
			copyArgs(n,"filePath",params,undefined,false); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"commitSpecifier",params,undefined,false); 
			copyArgs(msg,"filePath",params,undefined,false); 
			

			svc.getFile(params,cb);
		}

		
		service.GetFolder=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"folderPath",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"commitSpecifier",params,undefined,false); 
			copyArgs(n,"folderPath",params,undefined,false); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"commitSpecifier",params,undefined,false); 
			copyArgs(msg,"folderPath",params,undefined,false); 
			

			svc.getFolder(params,cb);
		}

		
		service.GetMergeCommit=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"sourceCommitSpecifier",params,undefined,false); 
			copyArgs(n,"destinationCommitSpecifier",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"sourceCommitSpecifier",params,undefined,false); 
			copyArgs(n,"destinationCommitSpecifier",params,undefined,false); 
			copyArgs(n,"conflictDetailLevel",params,undefined,false); 
			copyArgs(n,"conflictResolutionStrategy",params,undefined,false); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"sourceCommitSpecifier",params,undefined,false); 
			copyArgs(msg,"destinationCommitSpecifier",params,undefined,false); 
			copyArgs(msg,"conflictDetailLevel",params,undefined,false); 
			copyArgs(msg,"conflictResolutionStrategy",params,undefined,false); 
			

			svc.getMergeCommit(params,cb);
		}

		
		service.GetMergeConflicts=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"destinationCommitSpecifier",params,undefined,false); 
			copyArgs(n,"sourceCommitSpecifier",params,undefined,false); 
			copyArgs(n,"mergeOption",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"destinationCommitSpecifier",params,undefined,false); 
			copyArgs(n,"sourceCommitSpecifier",params,undefined,false); 
			copyArgs(n,"mergeOption",params,undefined,false); 
			copyArgs(n,"conflictDetailLevel",params,undefined,false); 
			copyArgs(n,"maxConflictFiles",params,undefined,false); 
			copyArgs(n,"conflictResolutionStrategy",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"destinationCommitSpecifier",params,undefined,false); 
			copyArgs(msg,"sourceCommitSpecifier",params,undefined,false); 
			copyArgs(msg,"mergeOption",params,undefined,false); 
			copyArgs(msg,"conflictDetailLevel",params,undefined,false); 
			copyArgs(msg,"maxConflictFiles",params,undefined,false); 
			copyArgs(msg,"conflictResolutionStrategy",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.getMergeConflicts(params,cb);
		}

		
		service.GetMergeOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"sourceCommitSpecifier",params,undefined,false); 
			copyArgs(n,"destinationCommitSpecifier",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"sourceCommitSpecifier",params,undefined,false); 
			copyArgs(n,"destinationCommitSpecifier",params,undefined,false); 
			copyArgs(n,"conflictDetailLevel",params,undefined,false); 
			copyArgs(n,"conflictResolutionStrategy",params,undefined,false); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"sourceCommitSpecifier",params,undefined,false); 
			copyArgs(msg,"destinationCommitSpecifier",params,undefined,false); 
			copyArgs(msg,"conflictDetailLevel",params,undefined,false); 
			copyArgs(msg,"conflictResolutionStrategy",params,undefined,false); 
			

			svc.getMergeOptions(params,cb);
		}

		
		service.GetPullRequest=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			
			copyArgs(msg,"pullRequestId",params,undefined,false); 
			

			svc.getPullRequest(params,cb);
		}

		
		service.GetPullRequestApprovalStates=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"revisionId",params,undefined,false); 
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"revisionId",params,undefined,false); 
			
			copyArgs(msg,"pullRequestId",params,undefined,false); 
			copyArgs(msg,"revisionId",params,undefined,false); 
			

			svc.getPullRequestApprovalStates(params,cb);
		}

		
		service.GetPullRequestOverrideState=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"revisionId",params,undefined,false); 
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"revisionId",params,undefined,false); 
			
			copyArgs(msg,"pullRequestId",params,undefined,false); 
			copyArgs(msg,"revisionId",params,undefined,false); 
			

			svc.getPullRequestOverrideState(params,cb);
		}

		
		service.GetRepository=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			

			svc.getRepository(params,cb);
		}

		
		service.GetRepositoryTriggers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			

			svc.getRepositoryTriggers(params,cb);
		}

		
		service.ListApprovalRuleTemplates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listApprovalRuleTemplates(params,cb);
		}

		
		service.ListAssociatedApprovalRuleTemplatesForRepository=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listAssociatedApprovalRuleTemplatesForRepository(params,cb);
		}

		
		service.ListBranches=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listBranches(params,cb);
		}

		
		service.ListPullRequests=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"authorArn",params,undefined,false); 
			copyArgs(n,"pullRequestStatus",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"authorArn",params,undefined,false); 
			copyArgs(msg,"pullRequestStatus",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listPullRequests(params,cb);
		}

		
		service.ListRepositories=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"sortBy",params,undefined,false); 
			copyArgs(n,"order",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"sortBy",params,undefined,false); 
			copyArgs(msg,"order",params,undefined,false); 
			

			svc.listRepositories(params,cb);
		}

		
		service.ListRepositoriesForApprovalRuleTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"approvalRuleTemplateName",params,undefined,false); 
			
			copyArgs(n,"approvalRuleTemplateName",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"approvalRuleTemplateName",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listRepositoriesForApprovalRuleTemplate(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.MergeBranchesByFastForward=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"sourceCommitSpecifier",params,undefined,false); 
			copyArgs(n,"destinationCommitSpecifier",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"sourceCommitSpecifier",params,undefined,false); 
			copyArgs(n,"destinationCommitSpecifier",params,undefined,false); 
			copyArgs(n,"targetBranch",params,undefined,false); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"sourceCommitSpecifier",params,undefined,false); 
			copyArgs(msg,"destinationCommitSpecifier",params,undefined,false); 
			copyArgs(msg,"targetBranch",params,undefined,false); 
			

			svc.mergeBranchesByFastForward(params,cb);
		}

		
		service.MergeBranchesBySquash=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"sourceCommitSpecifier",params,undefined,false); 
			copyArgs(n,"destinationCommitSpecifier",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"sourceCommitSpecifier",params,undefined,false); 
			copyArgs(n,"destinationCommitSpecifier",params,undefined,false); 
			copyArgs(n,"targetBranch",params,undefined,false); 
			copyArgs(n,"conflictDetailLevel",params,undefined,false); 
			copyArgs(n,"conflictResolutionStrategy",params,undefined,false); 
			copyArgs(n,"authorName",params,undefined,false); 
			copyArgs(n,"email",params,undefined,false); 
			copyArgs(n,"commitMessage",params,undefined,false); 
			copyArgs(n,"keepEmptyFolders",params,undefined,false); 
			copyArgs(n,"conflictResolution",params,undefined,true); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"sourceCommitSpecifier",params,undefined,false); 
			copyArgs(msg,"destinationCommitSpecifier",params,undefined,false); 
			copyArgs(msg,"targetBranch",params,undefined,false); 
			copyArgs(msg,"conflictDetailLevel",params,undefined,false); 
			copyArgs(msg,"conflictResolutionStrategy",params,undefined,false); 
			copyArgs(msg,"authorName",params,undefined,false); 
			copyArgs(msg,"email",params,undefined,false); 
			copyArgs(msg,"commitMessage",params,undefined,false); 
			copyArgs(msg,"keepEmptyFolders",params,undefined,false); 
			copyArgs(msg,"conflictResolution",params,undefined,true); 
			

			svc.mergeBranchesBySquash(params,cb);
		}

		
		service.MergeBranchesByThreeWay=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"sourceCommitSpecifier",params,undefined,false); 
			copyArgs(n,"destinationCommitSpecifier",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"sourceCommitSpecifier",params,undefined,false); 
			copyArgs(n,"destinationCommitSpecifier",params,undefined,false); 
			copyArgs(n,"targetBranch",params,undefined,false); 
			copyArgs(n,"conflictDetailLevel",params,undefined,false); 
			copyArgs(n,"conflictResolutionStrategy",params,undefined,false); 
			copyArgs(n,"authorName",params,undefined,false); 
			copyArgs(n,"email",params,undefined,false); 
			copyArgs(n,"commitMessage",params,undefined,false); 
			copyArgs(n,"keepEmptyFolders",params,undefined,false); 
			copyArgs(n,"conflictResolution",params,undefined,true); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"sourceCommitSpecifier",params,undefined,false); 
			copyArgs(msg,"destinationCommitSpecifier",params,undefined,false); 
			copyArgs(msg,"targetBranch",params,undefined,false); 
			copyArgs(msg,"conflictDetailLevel",params,undefined,false); 
			copyArgs(msg,"conflictResolutionStrategy",params,undefined,false); 
			copyArgs(msg,"authorName",params,undefined,false); 
			copyArgs(msg,"email",params,undefined,false); 
			copyArgs(msg,"commitMessage",params,undefined,false); 
			copyArgs(msg,"keepEmptyFolders",params,undefined,false); 
			copyArgs(msg,"conflictResolution",params,undefined,true); 
			

			svc.mergeBranchesByThreeWay(params,cb);
		}

		
		service.MergePullRequestByFastForward=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"repositoryName",params,undefined,false); 
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"sourceCommitId",params,undefined,false); 
			
			copyArgs(msg,"pullRequestId",params,undefined,false); 
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"sourceCommitId",params,undefined,false); 
			

			svc.mergePullRequestByFastForward(params,cb);
		}

		
		service.MergePullRequestBySquash=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"repositoryName",params,undefined,false); 
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"sourceCommitId",params,undefined,false); 
			copyArgs(n,"conflictDetailLevel",params,undefined,false); 
			copyArgs(n,"conflictResolutionStrategy",params,undefined,false); 
			copyArgs(n,"commitMessage",params,undefined,false); 
			copyArgs(n,"authorName",params,undefined,false); 
			copyArgs(n,"email",params,undefined,false); 
			copyArgs(n,"keepEmptyFolders",params,undefined,false); 
			copyArgs(n,"conflictResolution",params,undefined,true); 
			
			copyArgs(msg,"pullRequestId",params,undefined,false); 
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"sourceCommitId",params,undefined,false); 
			copyArgs(msg,"conflictDetailLevel",params,undefined,false); 
			copyArgs(msg,"conflictResolutionStrategy",params,undefined,false); 
			copyArgs(msg,"commitMessage",params,undefined,false); 
			copyArgs(msg,"authorName",params,undefined,false); 
			copyArgs(msg,"email",params,undefined,false); 
			copyArgs(msg,"keepEmptyFolders",params,undefined,false); 
			copyArgs(msg,"conflictResolution",params,undefined,true); 
			

			svc.mergePullRequestBySquash(params,cb);
		}

		
		service.MergePullRequestByThreeWay=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"repositoryName",params,undefined,false); 
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"sourceCommitId",params,undefined,false); 
			copyArgs(n,"conflictDetailLevel",params,undefined,false); 
			copyArgs(n,"conflictResolutionStrategy",params,undefined,false); 
			copyArgs(n,"commitMessage",params,undefined,false); 
			copyArgs(n,"authorName",params,undefined,false); 
			copyArgs(n,"email",params,undefined,false); 
			copyArgs(n,"keepEmptyFolders",params,undefined,false); 
			copyArgs(n,"conflictResolution",params,undefined,true); 
			
			copyArgs(msg,"pullRequestId",params,undefined,false); 
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"sourceCommitId",params,undefined,false); 
			copyArgs(msg,"conflictDetailLevel",params,undefined,false); 
			copyArgs(msg,"conflictResolutionStrategy",params,undefined,false); 
			copyArgs(msg,"commitMessage",params,undefined,false); 
			copyArgs(msg,"authorName",params,undefined,false); 
			copyArgs(msg,"email",params,undefined,false); 
			copyArgs(msg,"keepEmptyFolders",params,undefined,false); 
			copyArgs(msg,"conflictResolution",params,undefined,true); 
			

			svc.mergePullRequestByThreeWay(params,cb);
		}

		
		service.OverridePullRequestApprovalRules=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"revisionId",params,undefined,false); 
			copyArgs(n,"overrideStatus",params,undefined,false); 
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"revisionId",params,undefined,false); 
			copyArgs(n,"overrideStatus",params,undefined,false); 
			
			copyArgs(msg,"pullRequestId",params,undefined,false); 
			copyArgs(msg,"revisionId",params,undefined,false); 
			copyArgs(msg,"overrideStatus",params,undefined,false); 
			

			svc.overridePullRequestApprovalRules(params,cb);
		}

		
		service.PostCommentForComparedCommit=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"afterCommitId",params,undefined,false); 
			copyArgs(n,"content",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"beforeCommitId",params,undefined,false); 
			copyArgs(n,"afterCommitId",params,undefined,false); 
			copyArgs(n,"location",params,undefined,true); 
			copyArgs(n,"content",params,undefined,false); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"beforeCommitId",params,undefined,false); 
			copyArgs(msg,"afterCommitId",params,undefined,false); 
			copyArgs(msg,"location",params,undefined,true); 
			copyArgs(msg,"content",params,undefined,false); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			

			svc.postCommentForComparedCommit(params,cb);
		}

		
		service.PostCommentForPullRequest=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"beforeCommitId",params,undefined,false); 
			copyArgs(n,"afterCommitId",params,undefined,false); 
			copyArgs(n,"content",params,undefined,false); 
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"beforeCommitId",params,undefined,false); 
			copyArgs(n,"afterCommitId",params,undefined,false); 
			copyArgs(n,"location",params,undefined,true); 
			copyArgs(n,"content",params,undefined,false); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"pullRequestId",params,undefined,false); 
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"beforeCommitId",params,undefined,false); 
			copyArgs(msg,"afterCommitId",params,undefined,false); 
			copyArgs(msg,"location",params,undefined,true); 
			copyArgs(msg,"content",params,undefined,false); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			

			svc.postCommentForPullRequest(params,cb);
		}

		
		service.PostCommentReply=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"inReplyTo",params,undefined,false); 
			copyArgs(n,"content",params,undefined,false); 
			
			copyArgs(n,"inReplyTo",params,undefined,false); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			copyArgs(n,"content",params,undefined,false); 
			
			copyArgs(msg,"inReplyTo",params,undefined,false); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			copyArgs(msg,"content",params,undefined,false); 
			

			svc.postCommentReply(params,cb);
		}

		
		service.PutCommentReaction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"commentId",params,undefined,false); 
			copyArgs(n,"reactionValue",params,undefined,false); 
			
			copyArgs(n,"commentId",params,undefined,false); 
			copyArgs(n,"reactionValue",params,undefined,false); 
			
			copyArgs(msg,"commentId",params,undefined,false); 
			copyArgs(msg,"reactionValue",params,undefined,false); 
			

			svc.putCommentReaction(params,cb);
		}

		
		service.PutFile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			copyArgs(n,"fileContent",params,undefined,false); 
			copyArgs(n,"filePath",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"branchName",params,undefined,false); 
			copyArgs(n,"fileContent",params,undefined,false); 
			copyArgs(n,"filePath",params,undefined,false); 
			copyArgs(n,"fileMode",params,undefined,false); 
			copyArgs(n,"parentCommitId",params,undefined,false); 
			copyArgs(n,"commitMessage",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"email",params,undefined,false); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"branchName",params,undefined,false); 
			copyArgs(msg,"fileContent",params,undefined,false); 
			copyArgs(msg,"filePath",params,undefined,false); 
			copyArgs(msg,"fileMode",params,undefined,false); 
			copyArgs(msg,"parentCommitId",params,undefined,false); 
			copyArgs(msg,"commitMessage",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"email",params,undefined,false); 
			

			svc.putFile(params,cb);
		}

		
		service.PutRepositoryTriggers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"triggers",params,undefined,true); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"triggers",params,undefined,true); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"triggers",params,undefined,true); 
			

			svc.putRepositoryTriggers(params,cb);
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

		
		service.TestRepositoryTriggers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"triggers",params,undefined,true); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"triggers",params,undefined,true); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"triggers",params,undefined,true); 
			

			svc.testRepositoryTriggers(params,cb);
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

		
		service.UpdateApprovalRuleTemplateContent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"approvalRuleTemplateName",params,undefined,false); 
			copyArgs(n,"newRuleContent",params,undefined,false); 
			
			copyArgs(n,"approvalRuleTemplateName",params,undefined,false); 
			copyArgs(n,"newRuleContent",params,undefined,false); 
			copyArgs(n,"existingRuleContentSha256",params,undefined,false); 
			
			copyArgs(msg,"approvalRuleTemplateName",params,undefined,false); 
			copyArgs(msg,"newRuleContent",params,undefined,false); 
			copyArgs(msg,"existingRuleContentSha256",params,undefined,false); 
			

			svc.updateApprovalRuleTemplateContent(params,cb);
		}

		
		service.UpdateApprovalRuleTemplateDescription=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"approvalRuleTemplateName",params,undefined,false); 
			copyArgs(n,"approvalRuleTemplateDescription",params,undefined,false); 
			
			copyArgs(n,"approvalRuleTemplateName",params,undefined,false); 
			copyArgs(n,"approvalRuleTemplateDescription",params,undefined,false); 
			
			copyArgs(msg,"approvalRuleTemplateName",params,undefined,false); 
			copyArgs(msg,"approvalRuleTemplateDescription",params,undefined,false); 
			

			svc.updateApprovalRuleTemplateDescription(params,cb);
		}

		
		service.UpdateApprovalRuleTemplateName=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"oldApprovalRuleTemplateName",params,undefined,false); 
			copyArgs(n,"newApprovalRuleTemplateName",params,undefined,false); 
			
			copyArgs(n,"oldApprovalRuleTemplateName",params,undefined,false); 
			copyArgs(n,"newApprovalRuleTemplateName",params,undefined,false); 
			
			copyArgs(msg,"oldApprovalRuleTemplateName",params,undefined,false); 
			copyArgs(msg,"newApprovalRuleTemplateName",params,undefined,false); 
			

			svc.updateApprovalRuleTemplateName(params,cb);
		}

		
		service.UpdateComment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"commentId",params,undefined,false); 
			copyArgs(n,"content",params,undefined,false); 
			
			copyArgs(n,"commentId",params,undefined,false); 
			copyArgs(n,"content",params,undefined,false); 
			
			copyArgs(msg,"commentId",params,undefined,false); 
			copyArgs(msg,"content",params,undefined,false); 
			

			svc.updateComment(params,cb);
		}

		
		service.UpdateDefaultBranch=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"defaultBranchName",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"defaultBranchName",params,undefined,false); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"defaultBranchName",params,undefined,false); 
			

			svc.updateDefaultBranch(params,cb);
		}

		
		service.UpdatePullRequestApprovalRuleContent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"approvalRuleName",params,undefined,false); 
			copyArgs(n,"newRuleContent",params,undefined,false); 
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"approvalRuleName",params,undefined,false); 
			copyArgs(n,"existingRuleContentSha256",params,undefined,false); 
			copyArgs(n,"newRuleContent",params,undefined,false); 
			
			copyArgs(msg,"pullRequestId",params,undefined,false); 
			copyArgs(msg,"approvalRuleName",params,undefined,false); 
			copyArgs(msg,"existingRuleContentSha256",params,undefined,false); 
			copyArgs(msg,"newRuleContent",params,undefined,false); 
			

			svc.updatePullRequestApprovalRuleContent(params,cb);
		}

		
		service.UpdatePullRequestApprovalState=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"revisionId",params,undefined,false); 
			copyArgs(n,"approvalState",params,undefined,false); 
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"revisionId",params,undefined,false); 
			copyArgs(n,"approvalState",params,undefined,false); 
			
			copyArgs(msg,"pullRequestId",params,undefined,false); 
			copyArgs(msg,"revisionId",params,undefined,false); 
			copyArgs(msg,"approvalState",params,undefined,false); 
			

			svc.updatePullRequestApprovalState(params,cb);
		}

		
		service.UpdatePullRequestDescription=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			
			copyArgs(msg,"pullRequestId",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			

			svc.updatePullRequestDescription(params,cb);
		}

		
		service.UpdatePullRequestStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"pullRequestStatus",params,undefined,false); 
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"pullRequestStatus",params,undefined,false); 
			
			copyArgs(msg,"pullRequestId",params,undefined,false); 
			copyArgs(msg,"pullRequestStatus",params,undefined,false); 
			

			svc.updatePullRequestStatus(params,cb);
		}

		
		service.UpdatePullRequestTitle=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"title",params,undefined,false); 
			
			copyArgs(n,"pullRequestId",params,undefined,false); 
			copyArgs(n,"title",params,undefined,false); 
			
			copyArgs(msg,"pullRequestId",params,undefined,false); 
			copyArgs(msg,"title",params,undefined,false); 
			

			svc.updatePullRequestTitle(params,cb);
		}

		
		service.UpdateRepositoryDescription=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			
			copyArgs(n,"repositoryName",params,undefined,false); 
			copyArgs(n,"repositoryDescription",params,undefined,false); 
			
			copyArgs(msg,"repositoryName",params,undefined,false); 
			copyArgs(msg,"repositoryDescription",params,undefined,false); 
			

			svc.updateRepositoryDescription(params,cb);
		}

		
		service.UpdateRepositoryName=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"oldName",params,undefined,false); 
			copyArgs(n,"newName",params,undefined,false); 
			
			copyArgs(n,"oldName",params,undefined,false); 
			copyArgs(n,"newName",params,undefined,false); 
			
			copyArgs(msg,"oldName",params,undefined,false); 
			copyArgs(msg,"newName",params,undefined,false); 
			

			svc.updateRepositoryName(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS CodeCommit", AmazonAPINode);

};
