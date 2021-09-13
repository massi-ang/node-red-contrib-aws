
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

		var awsService = new AWS.CodePipeline( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.CodePipeline(msg.AWSConfig) : awsService;

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
		
		service.AcknowledgeJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"nonce",params,undefined,false); 
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"nonce",params,undefined,false); 
			
			copyArgs(msg,"jobId",params,undefined,false); 
			copyArgs(msg,"nonce",params,undefined,false); 
			

			svc.acknowledgeJob(params,cb);
		}
		
		service.AcknowledgeThirdPartyJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"nonce",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"nonce",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"jobId",params,undefined,false); 
			copyArgs(msg,"nonce",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.acknowledgeThirdPartyJob(params,cb);
		}
		
		service.CreateCustomActionType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"category",params,undefined,false); 
			copyArgs(n,"provider",params,undefined,false); 
			copyArgs(n,"version",params,undefined,false); 
			copyArgs(n,"inputArtifactDetails",params,undefined,true); 
			copyArgs(n,"outputArtifactDetails",params,undefined,true); 
			
			copyArgs(n,"category",params,undefined,false); 
			copyArgs(n,"provider",params,undefined,false); 
			copyArgs(n,"version",params,undefined,false); 
			copyArgs(n,"settings",params,undefined,true); 
			copyArgs(n,"configurationProperties",params,undefined,true); 
			copyArgs(n,"inputArtifactDetails",params,undefined,true); 
			copyArgs(n,"outputArtifactDetails",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"category",params,undefined,false); 
			copyArgs(msg,"provider",params,undefined,false); 
			copyArgs(msg,"version",params,undefined,false); 
			copyArgs(msg,"settings",params,undefined,true); 
			copyArgs(msg,"configurationProperties",params,undefined,true); 
			copyArgs(msg,"inputArtifactDetails",params,undefined,true); 
			copyArgs(msg,"outputArtifactDetails",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createCustomActionType(params,cb);
		}
		
		service.CreatePipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipeline",params,undefined,true); 
			
			copyArgs(n,"pipeline",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"pipeline",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createPipeline(params,cb);
		}
		
		service.DeleteCustomActionType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"category",params,undefined,false); 
			copyArgs(n,"provider",params,undefined,false); 
			copyArgs(n,"version",params,undefined,false); 
			
			copyArgs(n,"category",params,undefined,false); 
			copyArgs(n,"provider",params,undefined,false); 
			copyArgs(n,"version",params,undefined,false); 
			
			copyArgs(msg,"category",params,undefined,false); 
			copyArgs(msg,"provider",params,undefined,false); 
			copyArgs(msg,"version",params,undefined,false); 
			

			svc.deleteCustomActionType(params,cb);
		}
		
		service.DeletePipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.deletePipeline(params,cb);
		}
		
		service.DeleteWebhook=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.deleteWebhook(params,cb);
		}
		
		service.DeregisterWebhookWithThirdParty=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"webhookName",params,undefined,false); 
			
			copyArgs(msg,"webhookName",params,undefined,false); 
			

			svc.deregisterWebhookWithThirdParty(params,cb);
		}
		
		service.DisableStageTransition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			copyArgs(n,"stageName",params,undefined,false); 
			copyArgs(n,"transitionType",params,undefined,false); 
			copyArgs(n,"reason",params,undefined,false); 
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			copyArgs(n,"stageName",params,undefined,false); 
			copyArgs(n,"transitionType",params,undefined,false); 
			copyArgs(n,"reason",params,undefined,false); 
			
			copyArgs(msg,"pipelineName",params,undefined,false); 
			copyArgs(msg,"stageName",params,undefined,false); 
			copyArgs(msg,"transitionType",params,undefined,false); 
			copyArgs(msg,"reason",params,undefined,false); 
			

			svc.disableStageTransition(params,cb);
		}
		
		service.EnableStageTransition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			copyArgs(n,"stageName",params,undefined,false); 
			copyArgs(n,"transitionType",params,undefined,false); 
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			copyArgs(n,"stageName",params,undefined,false); 
			copyArgs(n,"transitionType",params,undefined,false); 
			
			copyArgs(msg,"pipelineName",params,undefined,false); 
			copyArgs(msg,"stageName",params,undefined,false); 
			copyArgs(msg,"transitionType",params,undefined,false); 
			

			svc.enableStageTransition(params,cb);
		}
		
		service.GetActionType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"category",params,undefined,false); 
			copyArgs(n,"owner",params,undefined,false); 
			copyArgs(n,"provider",params,undefined,false); 
			copyArgs(n,"version",params,undefined,false); 
			
			copyArgs(n,"category",params,undefined,false); 
			copyArgs(n,"owner",params,undefined,false); 
			copyArgs(n,"provider",params,undefined,false); 
			copyArgs(n,"version",params,undefined,false); 
			
			copyArgs(msg,"category",params,undefined,false); 
			copyArgs(msg,"owner",params,undefined,false); 
			copyArgs(msg,"provider",params,undefined,false); 
			copyArgs(msg,"version",params,undefined,false); 
			

			svc.getActionType(params,cb);
		}
		
		service.GetJobDetails=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(msg,"jobId",params,undefined,false); 
			

			svc.getJobDetails(params,cb);
		}
		
		service.GetPipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(Number(n),"version",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"version",params,undefined,false); 
			

			svc.getPipeline(params,cb);
		}
		
		service.GetPipelineExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			copyArgs(n,"pipelineExecutionId",params,undefined,false); 
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			copyArgs(n,"pipelineExecutionId",params,undefined,false); 
			
			copyArgs(msg,"pipelineName",params,undefined,false); 
			copyArgs(msg,"pipelineExecutionId",params,undefined,false); 
			

			svc.getPipelineExecution(params,cb);
		}
		
		service.GetPipelineState=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.getPipelineState(params,cb);
		}
		
		service.GetThirdPartyJobDetails=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"jobId",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.getThirdPartyJobDetails(params,cb);
		}
		
		service.ListActionExecutions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			copyArgs(n,"filter",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"pipelineName",params,undefined,false); 
			copyArgs(msg,"filter",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listActionExecutions(params,cb);
		}
		
		service.ListActionTypes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"actionOwnerFilter",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"regionFilter",params,undefined,false); 
			
			copyArgs(msg,"actionOwnerFilter",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"regionFilter",params,undefined,false); 
			

			svc.listActionTypes(params,cb);
		}
		
		service.ListPipelineExecutions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"pipelineName",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listPipelineExecutions(params,cb);
		}
		
		service.ListPipelines=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listPipelines(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.ListWebhooks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listWebhooks(params,cb);
		}
		
		service.PollForJobs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"actionTypeId",params,undefined,true); 
			
			copyArgs(n,"actionTypeId",params,undefined,true); 
			copyArgs(Number(n),"maxBatchSize",params,undefined,false); 
			copyArgs(n,"queryParam",params,undefined,false); 
			
			copyArgs(msg,"actionTypeId",params,undefined,true); 
			copyArgs(msg,"maxBatchSize",params,undefined,false); 
			copyArgs(msg,"queryParam",params,undefined,false); 
			

			svc.pollForJobs(params,cb);
		}
		
		service.PollForThirdPartyJobs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"actionTypeId",params,undefined,true); 
			
			copyArgs(n,"actionTypeId",params,undefined,true); 
			copyArgs(Number(n),"maxBatchSize",params,undefined,false); 
			
			copyArgs(msg,"actionTypeId",params,undefined,true); 
			copyArgs(msg,"maxBatchSize",params,undefined,false); 
			

			svc.pollForThirdPartyJobs(params,cb);
		}
		
		service.PutActionRevision=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			copyArgs(n,"stageName",params,undefined,false); 
			copyArgs(n,"actionName",params,undefined,false); 
			copyArgs(n,"actionRevision",params,undefined,true); 
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			copyArgs(n,"stageName",params,undefined,false); 
			copyArgs(n,"actionName",params,undefined,false); 
			copyArgs(n,"actionRevision",params,undefined,true); 
			
			copyArgs(msg,"pipelineName",params,undefined,false); 
			copyArgs(msg,"stageName",params,undefined,false); 
			copyArgs(msg,"actionName",params,undefined,false); 
			copyArgs(msg,"actionRevision",params,undefined,true); 
			

			svc.putActionRevision(params,cb);
		}
		
		service.PutApprovalResult=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			copyArgs(n,"stageName",params,undefined,false); 
			copyArgs(n,"actionName",params,undefined,false); 
			copyArgs(n,"result",params,undefined,false); 
			copyArgs(n,"token",params,undefined,false); 
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			copyArgs(n,"stageName",params,undefined,false); 
			copyArgs(n,"actionName",params,undefined,false); 
			copyArgs(n,"result",params,undefined,false); 
			copyArgs(n,"token",params,undefined,false); 
			
			copyArgs(msg,"pipelineName",params,undefined,false); 
			copyArgs(msg,"stageName",params,undefined,false); 
			copyArgs(msg,"actionName",params,undefined,false); 
			copyArgs(msg,"result",params,undefined,false); 
			copyArgs(msg,"token",params,undefined,false); 
			

			svc.putApprovalResult(params,cb);
		}
		
		service.PutJobFailureResult=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"failureDetails",params,undefined,true); 
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"failureDetails",params,undefined,true); 
			
			copyArgs(msg,"jobId",params,undefined,false); 
			copyArgs(msg,"failureDetails",params,undefined,true); 
			

			svc.putJobFailureResult(params,cb);
		}
		
		service.PutJobSuccessResult=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"currentRevision",params,undefined,true); 
			copyArgs(n,"continuationToken",params,undefined,false); 
			copyArgs(n,"executionDetails",params,undefined,true); 
			copyArgs(n,"outputVariables",params,undefined,true); 
			
			copyArgs(msg,"jobId",params,undefined,false); 
			copyArgs(msg,"currentRevision",params,undefined,true); 
			copyArgs(msg,"continuationToken",params,undefined,false); 
			copyArgs(msg,"executionDetails",params,undefined,true); 
			copyArgs(msg,"outputVariables",params,undefined,true); 
			

			svc.putJobSuccessResult(params,cb);
		}
		
		service.PutThirdPartyJobFailureResult=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"failureDetails",params,undefined,true); 
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"failureDetails",params,undefined,true); 
			
			copyArgs(msg,"jobId",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"failureDetails",params,undefined,true); 
			

			svc.putThirdPartyJobFailureResult(params,cb);
		}
		
		service.PutThirdPartyJobSuccessResult=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"currentRevision",params,undefined,true); 
			copyArgs(n,"continuationToken",params,undefined,false); 
			copyArgs(n,"executionDetails",params,undefined,true); 
			
			copyArgs(msg,"jobId",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"currentRevision",params,undefined,true); 
			copyArgs(msg,"continuationToken",params,undefined,false); 
			copyArgs(msg,"executionDetails",params,undefined,true); 
			

			svc.putThirdPartyJobSuccessResult(params,cb);
		}
		
		service.PutWebhook=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"webhook",params,undefined,true); 
			
			copyArgs(n,"webhook",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"webhook",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.putWebhook(params,cb);
		}
		
		service.RegisterWebhookWithThirdParty=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"webhookName",params,undefined,false); 
			
			copyArgs(msg,"webhookName",params,undefined,false); 
			

			svc.registerWebhookWithThirdParty(params,cb);
		}
		
		service.RetryStageExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			copyArgs(n,"stageName",params,undefined,false); 
			copyArgs(n,"pipelineExecutionId",params,undefined,false); 
			copyArgs(n,"retryMode",params,undefined,false); 
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			copyArgs(n,"stageName",params,undefined,false); 
			copyArgs(n,"pipelineExecutionId",params,undefined,false); 
			copyArgs(n,"retryMode",params,undefined,false); 
			
			copyArgs(msg,"pipelineName",params,undefined,false); 
			copyArgs(msg,"stageName",params,undefined,false); 
			copyArgs(msg,"pipelineExecutionId",params,undefined,false); 
			copyArgs(msg,"retryMode",params,undefined,false); 
			

			svc.retryStageExecution(params,cb);
		}
		
		service.StartPipelineExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			

			svc.startPipelineExecution(params,cb);
		}
		
		service.StopPipelineExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			copyArgs(n,"pipelineExecutionId",params,undefined,false); 
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			copyArgs(n,"pipelineExecutionId",params,undefined,false); 
			copyArgs(Boolean(n),"abandon",params,undefined,false); 
			copyArgs(n,"reason",params,undefined,false); 
			
			copyArgs(msg,"pipelineName",params,undefined,false); 
			copyArgs(msg,"pipelineExecutionId",params,undefined,false); 
			copyArgs(msg,"abandon",params,undefined,false); 
			copyArgs(msg,"reason",params,undefined,false); 
			

			svc.stopPipelineExecution(params,cb);
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
		
		service.UpdateActionType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"actionType",params,undefined,true); 
			
			copyArgs(n,"actionType",params,undefined,true); 
			
			copyArgs(msg,"actionType",params,undefined,true); 
			

			svc.updateActionType(params,cb);
		}
		
		service.UpdatePipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipeline",params,undefined,true); 
			
			copyArgs(n,"pipeline",params,undefined,true); 
			
			copyArgs(msg,"pipeline",params,undefined,true); 
			

			svc.updatePipeline(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS CodePipeline", AmazonAPINode);

};
