
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

		var awsService = new AWS.CodeCommit( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.CodeCommit(msg.AWSConfig) : awsService;

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

		
		service.AssociateApprovalRuleTemplateWithRepository=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"approvalRuleTemplateName",params,undefined,false); 
			copyArg(n,"repositoryName",params,undefined,false); 
			
			copyArg(msg,"approvalRuleTemplateName",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			

			svc.associateApprovalRuleTemplateWithRepository(params,cb);
		}

		
		service.BatchAssociateApprovalRuleTemplateWithRepositories=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"approvalRuleTemplateName",params,undefined,false); 
			copyArg(n,"repositoryNames",params,undefined,true); 
			
			copyArg(msg,"approvalRuleTemplateName",params,undefined,false); 
			copyArg(msg,"repositoryNames",params,undefined,true); 
			

			svc.batchAssociateApprovalRuleTemplateWithRepositories(params,cb);
		}

		
		service.BatchDescribeMergeConflicts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"destinationCommitSpecifier",params,undefined,false); 
			copyArg(n,"sourceCommitSpecifier",params,undefined,false); 
			copyArg(n,"mergeOption",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"destinationCommitSpecifier",params,undefined,false); 
			copyArg(msg,"sourceCommitSpecifier",params,undefined,false); 
			copyArg(msg,"mergeOption",params,undefined,false); 
			copyArg(msg,"maxMergeHunks",params,undefined,false); 
			copyArg(msg,"maxConflictFiles",params,undefined,false); 
			copyArg(msg,"filePaths",params,undefined,false); 
			copyArg(msg,"conflictDetailLevel",params,undefined,false); 
			copyArg(msg,"conflictResolutionStrategy",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.batchDescribeMergeConflicts(params,cb);
		}

		
		service.BatchDisassociateApprovalRuleTemplateFromRepositories=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"approvalRuleTemplateName",params,undefined,false); 
			copyArg(n,"repositoryNames",params,undefined,true); 
			
			copyArg(msg,"approvalRuleTemplateName",params,undefined,false); 
			copyArg(msg,"repositoryNames",params,undefined,true); 
			

			svc.batchDisassociateApprovalRuleTemplateFromRepositories(params,cb);
		}

		
		service.BatchGetCommits=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"commitIds",params,undefined,false); 
			copyArg(n,"repositoryName",params,undefined,false); 
			
			copyArg(msg,"commitIds",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			

			svc.batchGetCommits(params,cb);
		}

		
		service.BatchGetRepositories=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryNames",params,undefined,true); 
			
			copyArg(msg,"repositoryNames",params,undefined,true); 
			

			svc.batchGetRepositories(params,cb);
		}

		
		service.CreateApprovalRuleTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"approvalRuleTemplateName",params,undefined,false); 
			copyArg(n,"approvalRuleTemplateContent",params,undefined,false); 
			
			copyArg(msg,"approvalRuleTemplateName",params,undefined,false); 
			copyArg(msg,"approvalRuleTemplateContent",params,undefined,false); 
			copyArg(msg,"approvalRuleTemplateDescription",params,undefined,false); 
			

			svc.createApprovalRuleTemplate(params,cb);
		}

		
		service.CreateBranch=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"branchName",params,undefined,false); 
			copyArg(n,"commitId",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"branchName",params,undefined,false); 
			copyArg(msg,"commitId",params,undefined,false); 
			

			svc.createBranch(params,cb);
		}

		
		service.CreateCommit=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"branchName",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"branchName",params,undefined,false); 
			copyArg(msg,"parentCommitId",params,undefined,false); 
			copyArg(msg,"authorName",params,undefined,false); 
			copyArg(msg,"email",params,undefined,false); 
			copyArg(msg,"commitMessage",params,undefined,false); 
			copyArg(msg,"keepEmptyFolders",params,undefined,false); 
			copyArg(msg,"putFiles",params,undefined,false); 
			copyArg(msg,"deleteFiles",params,undefined,true); 
			copyArg(msg,"setFileModes",params,undefined,true); 
			

			svc.createCommit(params,cb);
		}

		
		service.CreatePullRequest=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"title",params,undefined,false); 
			copyArg(n,"targets",params,undefined,false); 
			
			copyArg(msg,"title",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"targets",params,undefined,false); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			

			svc.createPullRequest(params,cb);
		}

		
		service.CreatePullRequestApprovalRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pullRequestId",params,undefined,false); 
			copyArg(n,"approvalRuleName",params,undefined,false); 
			copyArg(n,"approvalRuleContent",params,undefined,false); 
			
			copyArg(msg,"pullRequestId",params,undefined,false); 
			copyArg(msg,"approvalRuleName",params,undefined,false); 
			copyArg(msg,"approvalRuleContent",params,undefined,false); 
			

			svc.createPullRequestApprovalRule(params,cb);
		}

		
		service.CreateRepository=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"repositoryDescription",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createRepository(params,cb);
		}

		
		service.CreateUnreferencedMergeCommit=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"sourceCommitSpecifier",params,undefined,false); 
			copyArg(n,"destinationCommitSpecifier",params,undefined,false); 
			copyArg(n,"mergeOption",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"sourceCommitSpecifier",params,undefined,false); 
			copyArg(msg,"destinationCommitSpecifier",params,undefined,false); 
			copyArg(msg,"mergeOption",params,undefined,false); 
			copyArg(msg,"conflictDetailLevel",params,undefined,false); 
			copyArg(msg,"conflictResolutionStrategy",params,undefined,false); 
			copyArg(msg,"authorName",params,undefined,false); 
			copyArg(msg,"email",params,undefined,false); 
			copyArg(msg,"commitMessage",params,undefined,false); 
			copyArg(msg,"keepEmptyFolders",params,undefined,false); 
			copyArg(msg,"conflictResolution",params,undefined,true); 
			

			svc.createUnreferencedMergeCommit(params,cb);
		}

		
		service.DeleteApprovalRuleTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"approvalRuleTemplateName",params,undefined,false); 
			
			copyArg(msg,"approvalRuleTemplateName",params,undefined,false); 
			

			svc.deleteApprovalRuleTemplate(params,cb);
		}

		
		service.DeleteBranch=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"branchName",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"branchName",params,undefined,false); 
			

			svc.deleteBranch(params,cb);
		}

		
		service.DeleteCommentContent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"commentId",params,undefined,false); 
			
			copyArg(msg,"commentId",params,undefined,false); 
			

			svc.deleteCommentContent(params,cb);
		}

		
		service.DeleteFile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"branchName",params,undefined,false); 
			copyArg(n,"filePath",params,undefined,false); 
			copyArg(n,"parentCommitId",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"branchName",params,undefined,false); 
			copyArg(msg,"filePath",params,undefined,false); 
			copyArg(msg,"parentCommitId",params,undefined,false); 
			copyArg(msg,"keepEmptyFolders",params,undefined,false); 
			copyArg(msg,"commitMessage",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"email",params,undefined,false); 
			

			svc.deleteFile(params,cb);
		}

		
		service.DeletePullRequestApprovalRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pullRequestId",params,undefined,false); 
			copyArg(n,"approvalRuleName",params,undefined,false); 
			
			copyArg(msg,"pullRequestId",params,undefined,false); 
			copyArg(msg,"approvalRuleName",params,undefined,false); 
			

			svc.deletePullRequestApprovalRule(params,cb);
		}

		
		service.DeleteRepository=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			

			svc.deleteRepository(params,cb);
		}

		
		service.DescribeMergeConflicts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"destinationCommitSpecifier",params,undefined,false); 
			copyArg(n,"sourceCommitSpecifier",params,undefined,false); 
			copyArg(n,"mergeOption",params,undefined,false); 
			copyArg(n,"filePath",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"destinationCommitSpecifier",params,undefined,false); 
			copyArg(msg,"sourceCommitSpecifier",params,undefined,false); 
			copyArg(msg,"mergeOption",params,undefined,false); 
			copyArg(msg,"maxMergeHunks",params,undefined,false); 
			copyArg(msg,"filePath",params,undefined,false); 
			copyArg(msg,"conflictDetailLevel",params,undefined,false); 
			copyArg(msg,"conflictResolutionStrategy",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.describeMergeConflicts(params,cb);
		}

		
		service.DescribePullRequestEvents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pullRequestId",params,undefined,false); 
			
			copyArg(msg,"pullRequestId",params,undefined,false); 
			copyArg(msg,"pullRequestEventType",params,undefined,false); 
			copyArg(msg,"actorArn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.describePullRequestEvents(params,cb);
		}

		
		service.DisassociateApprovalRuleTemplateFromRepository=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"approvalRuleTemplateName",params,undefined,false); 
			copyArg(n,"repositoryName",params,undefined,false); 
			
			copyArg(msg,"approvalRuleTemplateName",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			

			svc.disassociateApprovalRuleTemplateFromRepository(params,cb);
		}

		
		service.EvaluatePullRequestApprovalRules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pullRequestId",params,undefined,false); 
			copyArg(n,"revisionId",params,undefined,false); 
			
			copyArg(msg,"pullRequestId",params,undefined,false); 
			copyArg(msg,"revisionId",params,undefined,false); 
			

			svc.evaluatePullRequestApprovalRules(params,cb);
		}

		
		service.GetApprovalRuleTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"approvalRuleTemplateName",params,undefined,false); 
			
			copyArg(msg,"approvalRuleTemplateName",params,undefined,false); 
			

			svc.getApprovalRuleTemplate(params,cb);
		}

		
		service.GetBlob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"blobId",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"blobId",params,undefined,false); 
			

			svc.getBlob(params,cb);
		}

		
		service.GetBranch=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"branchName",params,undefined,false); 
			

			svc.getBranch(params,cb);
		}

		
		service.GetComment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"commentId",params,undefined,false); 
			
			copyArg(msg,"commentId",params,undefined,false); 
			

			svc.getComment(params,cb);
		}

		
		service.GetCommentReactions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"commentId",params,undefined,false); 
			
			copyArg(msg,"commentId",params,undefined,false); 
			copyArg(msg,"reactionUserArn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.getCommentReactions(params,cb);
		}

		
		service.GetCommentsForComparedCommit=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"afterCommitId",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"beforeCommitId",params,undefined,false); 
			copyArg(msg,"afterCommitId",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.getCommentsForComparedCommit(params,cb);
		}

		
		service.GetCommentsForPullRequest=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pullRequestId",params,undefined,false); 
			
			copyArg(msg,"pullRequestId",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"beforeCommitId",params,undefined,false); 
			copyArg(msg,"afterCommitId",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.getCommentsForPullRequest(params,cb);
		}

		
		service.GetCommit=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"commitId",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"commitId",params,undefined,false); 
			

			svc.getCommit(params,cb);
		}

		
		service.GetDifferences=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"afterCommitSpecifier",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"beforeCommitSpecifier",params,undefined,false); 
			copyArg(msg,"afterCommitSpecifier",params,undefined,false); 
			copyArg(msg,"beforePath",params,undefined,false); 
			copyArg(msg,"afterPath",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getDifferences(params,cb);
		}

		
		service.GetFile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"filePath",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"commitSpecifier",params,undefined,false); 
			copyArg(msg,"filePath",params,undefined,false); 
			

			svc.getFile(params,cb);
		}

		
		service.GetFolder=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"folderPath",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"commitSpecifier",params,undefined,false); 
			copyArg(msg,"folderPath",params,undefined,false); 
			

			svc.getFolder(params,cb);
		}

		
		service.GetMergeCommit=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"sourceCommitSpecifier",params,undefined,false); 
			copyArg(n,"destinationCommitSpecifier",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"sourceCommitSpecifier",params,undefined,false); 
			copyArg(msg,"destinationCommitSpecifier",params,undefined,false); 
			copyArg(msg,"conflictDetailLevel",params,undefined,false); 
			copyArg(msg,"conflictResolutionStrategy",params,undefined,false); 
			

			svc.getMergeCommit(params,cb);
		}

		
		service.GetMergeConflicts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"destinationCommitSpecifier",params,undefined,false); 
			copyArg(n,"sourceCommitSpecifier",params,undefined,false); 
			copyArg(n,"mergeOption",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"destinationCommitSpecifier",params,undefined,false); 
			copyArg(msg,"sourceCommitSpecifier",params,undefined,false); 
			copyArg(msg,"mergeOption",params,undefined,false); 
			copyArg(msg,"conflictDetailLevel",params,undefined,false); 
			copyArg(msg,"maxConflictFiles",params,undefined,false); 
			copyArg(msg,"conflictResolutionStrategy",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.getMergeConflicts(params,cb);
		}

		
		service.GetMergeOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"sourceCommitSpecifier",params,undefined,false); 
			copyArg(n,"destinationCommitSpecifier",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"sourceCommitSpecifier",params,undefined,false); 
			copyArg(msg,"destinationCommitSpecifier",params,undefined,false); 
			copyArg(msg,"conflictDetailLevel",params,undefined,false); 
			copyArg(msg,"conflictResolutionStrategy",params,undefined,false); 
			

			svc.getMergeOptions(params,cb);
		}

		
		service.GetPullRequest=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pullRequestId",params,undefined,false); 
			
			copyArg(msg,"pullRequestId",params,undefined,false); 
			

			svc.getPullRequest(params,cb);
		}

		
		service.GetPullRequestApprovalStates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pullRequestId",params,undefined,false); 
			copyArg(n,"revisionId",params,undefined,false); 
			
			copyArg(msg,"pullRequestId",params,undefined,false); 
			copyArg(msg,"revisionId",params,undefined,false); 
			

			svc.getPullRequestApprovalStates(params,cb);
		}

		
		service.GetPullRequestOverrideState=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pullRequestId",params,undefined,false); 
			copyArg(n,"revisionId",params,undefined,false); 
			
			copyArg(msg,"pullRequestId",params,undefined,false); 
			copyArg(msg,"revisionId",params,undefined,false); 
			

			svc.getPullRequestOverrideState(params,cb);
		}

		
		service.GetRepository=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			

			svc.getRepository(params,cb);
		}

		
		service.GetRepositoryTriggers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			

			svc.getRepositoryTriggers(params,cb);
		}

		
		service.ListApprovalRuleTemplates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listApprovalRuleTemplates(params,cb);
		}

		
		service.ListAssociatedApprovalRuleTemplatesForRepository=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listAssociatedApprovalRuleTemplatesForRepository(params,cb);
		}

		
		service.ListBranches=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listBranches(params,cb);
		}

		
		service.ListPullRequests=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"authorArn",params,undefined,false); 
			copyArg(msg,"pullRequestStatus",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listPullRequests(params,cb);
		}

		
		service.ListRepositories=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"sortBy",params,undefined,false); 
			copyArg(msg,"order",params,undefined,false); 
			

			svc.listRepositories(params,cb);
		}

		
		service.ListRepositoriesForApprovalRuleTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"approvalRuleTemplateName",params,undefined,false); 
			
			copyArg(msg,"approvalRuleTemplateName",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listRepositoriesForApprovalRuleTemplate(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.MergeBranchesByFastForward=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"sourceCommitSpecifier",params,undefined,false); 
			copyArg(n,"destinationCommitSpecifier",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"sourceCommitSpecifier",params,undefined,false); 
			copyArg(msg,"destinationCommitSpecifier",params,undefined,false); 
			copyArg(msg,"targetBranch",params,undefined,false); 
			

			svc.mergeBranchesByFastForward(params,cb);
		}

		
		service.MergeBranchesBySquash=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"sourceCommitSpecifier",params,undefined,false); 
			copyArg(n,"destinationCommitSpecifier",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"sourceCommitSpecifier",params,undefined,false); 
			copyArg(msg,"destinationCommitSpecifier",params,undefined,false); 
			copyArg(msg,"targetBranch",params,undefined,false); 
			copyArg(msg,"conflictDetailLevel",params,undefined,false); 
			copyArg(msg,"conflictResolutionStrategy",params,undefined,false); 
			copyArg(msg,"authorName",params,undefined,false); 
			copyArg(msg,"email",params,undefined,false); 
			copyArg(msg,"commitMessage",params,undefined,false); 
			copyArg(msg,"keepEmptyFolders",params,undefined,false); 
			copyArg(msg,"conflictResolution",params,undefined,true); 
			

			svc.mergeBranchesBySquash(params,cb);
		}

		
		service.MergeBranchesByThreeWay=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"sourceCommitSpecifier",params,undefined,false); 
			copyArg(n,"destinationCommitSpecifier",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"sourceCommitSpecifier",params,undefined,false); 
			copyArg(msg,"destinationCommitSpecifier",params,undefined,false); 
			copyArg(msg,"targetBranch",params,undefined,false); 
			copyArg(msg,"conflictDetailLevel",params,undefined,false); 
			copyArg(msg,"conflictResolutionStrategy",params,undefined,false); 
			copyArg(msg,"authorName",params,undefined,false); 
			copyArg(msg,"email",params,undefined,false); 
			copyArg(msg,"commitMessage",params,undefined,false); 
			copyArg(msg,"keepEmptyFolders",params,undefined,false); 
			copyArg(msg,"conflictResolution",params,undefined,true); 
			

			svc.mergeBranchesByThreeWay(params,cb);
		}

		
		service.MergePullRequestByFastForward=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pullRequestId",params,undefined,false); 
			copyArg(n,"repositoryName",params,undefined,false); 
			
			copyArg(msg,"pullRequestId",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"sourceCommitId",params,undefined,false); 
			

			svc.mergePullRequestByFastForward(params,cb);
		}

		
		service.MergePullRequestBySquash=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pullRequestId",params,undefined,false); 
			copyArg(n,"repositoryName",params,undefined,false); 
			
			copyArg(msg,"pullRequestId",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"sourceCommitId",params,undefined,false); 
			copyArg(msg,"conflictDetailLevel",params,undefined,false); 
			copyArg(msg,"conflictResolutionStrategy",params,undefined,false); 
			copyArg(msg,"commitMessage",params,undefined,false); 
			copyArg(msg,"authorName",params,undefined,false); 
			copyArg(msg,"email",params,undefined,false); 
			copyArg(msg,"keepEmptyFolders",params,undefined,false); 
			copyArg(msg,"conflictResolution",params,undefined,true); 
			

			svc.mergePullRequestBySquash(params,cb);
		}

		
		service.MergePullRequestByThreeWay=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pullRequestId",params,undefined,false); 
			copyArg(n,"repositoryName",params,undefined,false); 
			
			copyArg(msg,"pullRequestId",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"sourceCommitId",params,undefined,false); 
			copyArg(msg,"conflictDetailLevel",params,undefined,false); 
			copyArg(msg,"conflictResolutionStrategy",params,undefined,false); 
			copyArg(msg,"commitMessage",params,undefined,false); 
			copyArg(msg,"authorName",params,undefined,false); 
			copyArg(msg,"email",params,undefined,false); 
			copyArg(msg,"keepEmptyFolders",params,undefined,false); 
			copyArg(msg,"conflictResolution",params,undefined,true); 
			

			svc.mergePullRequestByThreeWay(params,cb);
		}

		
		service.OverridePullRequestApprovalRules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pullRequestId",params,undefined,false); 
			copyArg(n,"revisionId",params,undefined,false); 
			copyArg(n,"overrideStatus",params,undefined,false); 
			
			copyArg(msg,"pullRequestId",params,undefined,false); 
			copyArg(msg,"revisionId",params,undefined,false); 
			copyArg(msg,"overrideStatus",params,undefined,false); 
			

			svc.overridePullRequestApprovalRules(params,cb);
		}

		
		service.PostCommentForComparedCommit=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"afterCommitId",params,undefined,false); 
			copyArg(n,"content",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"beforeCommitId",params,undefined,false); 
			copyArg(msg,"afterCommitId",params,undefined,false); 
			copyArg(msg,"location",params,undefined,true); 
			copyArg(msg,"content",params,undefined,false); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			

			svc.postCommentForComparedCommit(params,cb);
		}

		
		service.PostCommentForPullRequest=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pullRequestId",params,undefined,false); 
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"beforeCommitId",params,undefined,false); 
			copyArg(n,"afterCommitId",params,undefined,false); 
			copyArg(n,"content",params,undefined,false); 
			
			copyArg(msg,"pullRequestId",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"beforeCommitId",params,undefined,false); 
			copyArg(msg,"afterCommitId",params,undefined,false); 
			copyArg(msg,"location",params,undefined,true); 
			copyArg(msg,"content",params,undefined,false); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			

			svc.postCommentForPullRequest(params,cb);
		}

		
		service.PostCommentReply=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"inReplyTo",params,undefined,false); 
			copyArg(n,"content",params,undefined,false); 
			
			copyArg(msg,"inReplyTo",params,undefined,false); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			copyArg(msg,"content",params,undefined,false); 
			

			svc.postCommentReply(params,cb);
		}

		
		service.PutCommentReaction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"commentId",params,undefined,false); 
			copyArg(n,"reactionValue",params,undefined,false); 
			
			copyArg(msg,"commentId",params,undefined,false); 
			copyArg(msg,"reactionValue",params,undefined,false); 
			

			svc.putCommentReaction(params,cb);
		}

		
		service.PutFile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"branchName",params,undefined,false); 
			copyArg(n,"fileContent",params,undefined,false); 
			copyArg(n,"filePath",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"branchName",params,undefined,false); 
			copyArg(msg,"fileContent",params,undefined,false); 
			copyArg(msg,"filePath",params,undefined,false); 
			copyArg(msg,"fileMode",params,undefined,false); 
			copyArg(msg,"parentCommitId",params,undefined,false); 
			copyArg(msg,"commitMessage",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"email",params,undefined,false); 
			

			svc.putFile(params,cb);
		}

		
		service.PutRepositoryTriggers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"triggers",params,undefined,true); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"triggers",params,undefined,true); 
			

			svc.putRepositoryTriggers(params,cb);
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

		
		service.TestRepositoryTriggers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"triggers",params,undefined,true); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"triggers",params,undefined,true); 
			

			svc.testRepositoryTriggers(params,cb);
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

		
		service.UpdateApprovalRuleTemplateContent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"approvalRuleTemplateName",params,undefined,false); 
			copyArg(n,"newRuleContent",params,undefined,false); 
			
			copyArg(msg,"approvalRuleTemplateName",params,undefined,false); 
			copyArg(msg,"newRuleContent",params,undefined,false); 
			copyArg(msg,"existingRuleContentSha256",params,undefined,false); 
			

			svc.updateApprovalRuleTemplateContent(params,cb);
		}

		
		service.UpdateApprovalRuleTemplateDescription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"approvalRuleTemplateName",params,undefined,false); 
			copyArg(n,"approvalRuleTemplateDescription",params,undefined,false); 
			
			copyArg(msg,"approvalRuleTemplateName",params,undefined,false); 
			copyArg(msg,"approvalRuleTemplateDescription",params,undefined,false); 
			

			svc.updateApprovalRuleTemplateDescription(params,cb);
		}

		
		service.UpdateApprovalRuleTemplateName=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"oldApprovalRuleTemplateName",params,undefined,false); 
			copyArg(n,"newApprovalRuleTemplateName",params,undefined,false); 
			
			copyArg(msg,"oldApprovalRuleTemplateName",params,undefined,false); 
			copyArg(msg,"newApprovalRuleTemplateName",params,undefined,false); 
			

			svc.updateApprovalRuleTemplateName(params,cb);
		}

		
		service.UpdateComment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"commentId",params,undefined,false); 
			copyArg(n,"content",params,undefined,false); 
			
			copyArg(msg,"commentId",params,undefined,false); 
			copyArg(msg,"content",params,undefined,false); 
			

			svc.updateComment(params,cb);
		}

		
		service.UpdateDefaultBranch=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"defaultBranchName",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"defaultBranchName",params,undefined,false); 
			

			svc.updateDefaultBranch(params,cb);
		}

		
		service.UpdatePullRequestApprovalRuleContent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pullRequestId",params,undefined,false); 
			copyArg(n,"approvalRuleName",params,undefined,false); 
			copyArg(n,"newRuleContent",params,undefined,false); 
			
			copyArg(msg,"pullRequestId",params,undefined,false); 
			copyArg(msg,"approvalRuleName",params,undefined,false); 
			copyArg(msg,"existingRuleContentSha256",params,undefined,false); 
			copyArg(msg,"newRuleContent",params,undefined,false); 
			

			svc.updatePullRequestApprovalRuleContent(params,cb);
		}

		
		service.UpdatePullRequestApprovalState=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pullRequestId",params,undefined,false); 
			copyArg(n,"revisionId",params,undefined,false); 
			copyArg(n,"approvalState",params,undefined,false); 
			
			copyArg(msg,"pullRequestId",params,undefined,false); 
			copyArg(msg,"revisionId",params,undefined,false); 
			copyArg(msg,"approvalState",params,undefined,false); 
			

			svc.updatePullRequestApprovalState(params,cb);
		}

		
		service.UpdatePullRequestDescription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pullRequestId",params,undefined,false); 
			copyArg(n,"description",params,undefined,false); 
			
			copyArg(msg,"pullRequestId",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			

			svc.updatePullRequestDescription(params,cb);
		}

		
		service.UpdatePullRequestStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pullRequestId",params,undefined,false); 
			copyArg(n,"pullRequestStatus",params,undefined,false); 
			
			copyArg(msg,"pullRequestId",params,undefined,false); 
			copyArg(msg,"pullRequestStatus",params,undefined,false); 
			

			svc.updatePullRequestStatus(params,cb);
		}

		
		service.UpdatePullRequestTitle=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pullRequestId",params,undefined,false); 
			copyArg(n,"title",params,undefined,false); 
			
			copyArg(msg,"pullRequestId",params,undefined,false); 
			copyArg(msg,"title",params,undefined,false); 
			

			svc.updatePullRequestTitle(params,cb);
		}

		
		service.UpdateRepositoryDescription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"repositoryDescription",params,undefined,false); 
			

			svc.updateRepositoryDescription(params,cb);
		}

		
		service.UpdateRepositoryName=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"oldName",params,undefined,false); 
			copyArg(n,"newName",params,undefined,false); 
			
			copyArg(msg,"oldName",params,undefined,false); 
			copyArg(msg,"newName",params,undefined,false); 
			

			svc.updateRepositoryName(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS CodeCommit", AmazonAPINode);

};
