
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

		var awsService = new AWS.CodePipeline( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.CodePipeline(msg.AWSConfig) : awsService;

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

		
		service.AcknowledgeJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params,undefined,false); 
			copyArg(n,"nonce",params,undefined,false); 
			
			copyArg(msg,"jobId",params,undefined,false); 
			copyArg(msg,"nonce",params,undefined,false); 
			

			svc.acknowledgeJob(params,cb);
		}

		
		service.AcknowledgeThirdPartyJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params,undefined,false); 
			copyArg(n,"nonce",params,undefined,false); 
			copyArg(n,"clientToken",params,undefined,false); 
			
			copyArg(msg,"jobId",params,undefined,false); 
			copyArg(msg,"nonce",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.acknowledgeThirdPartyJob(params,cb);
		}

		
		service.CreateCustomActionType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"category",params,undefined,false); 
			copyArg(n,"provider",params,undefined,false); 
			copyArg(n,"version",params,undefined,false); 
			copyArg(n,"inputArtifactDetails",params,undefined,true); 
			copyArg(n,"outputArtifactDetails",params,undefined,true); 
			
			copyArg(msg,"category",params,undefined,false); 
			copyArg(msg,"provider",params,undefined,false); 
			copyArg(msg,"version",params,undefined,false); 
			copyArg(msg,"settings",params,undefined,true); 
			copyArg(msg,"configurationProperties",params,undefined,true); 
			copyArg(msg,"inputArtifactDetails",params,undefined,true); 
			copyArg(msg,"outputArtifactDetails",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createCustomActionType(params,cb);
		}

		
		service.CreatePipeline=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pipeline",params,undefined,true); 
			
			copyArg(msg,"pipeline",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createPipeline(params,cb);
		}

		
		service.DeleteCustomActionType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"category",params,undefined,false); 
			copyArg(n,"provider",params,undefined,false); 
			copyArg(n,"version",params,undefined,false); 
			
			copyArg(msg,"category",params,undefined,false); 
			copyArg(msg,"provider",params,undefined,false); 
			copyArg(msg,"version",params,undefined,false); 
			

			svc.deleteCustomActionType(params,cb);
		}

		
		service.DeletePipeline=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			

			svc.deletePipeline(params,cb);
		}

		
		service.DeleteWebhook=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			

			svc.deleteWebhook(params,cb);
		}

		
		service.DeregisterWebhookWithThirdParty=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"webhookName",params,undefined,false); 
			

			svc.deregisterWebhookWithThirdParty(params,cb);
		}

		
		service.DisableStageTransition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pipelineName",params,undefined,false); 
			copyArg(n,"stageName",params,undefined,false); 
			copyArg(n,"transitionType",params,undefined,false); 
			copyArg(n,"reason",params,undefined,false); 
			
			copyArg(msg,"pipelineName",params,undefined,false); 
			copyArg(msg,"stageName",params,undefined,false); 
			copyArg(msg,"transitionType",params,undefined,false); 
			copyArg(msg,"reason",params,undefined,false); 
			

			svc.disableStageTransition(params,cb);
		}

		
		service.EnableStageTransition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pipelineName",params,undefined,false); 
			copyArg(n,"stageName",params,undefined,false); 
			copyArg(n,"transitionType",params,undefined,false); 
			
			copyArg(msg,"pipelineName",params,undefined,false); 
			copyArg(msg,"stageName",params,undefined,false); 
			copyArg(msg,"transitionType",params,undefined,false); 
			

			svc.enableStageTransition(params,cb);
		}

		
		service.GetActionType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"category",params,undefined,false); 
			copyArg(n,"owner",params,undefined,false); 
			copyArg(n,"provider",params,undefined,false); 
			copyArg(n,"version",params,undefined,false); 
			
			copyArg(msg,"category",params,undefined,false); 
			copyArg(msg,"owner",params,undefined,false); 
			copyArg(msg,"provider",params,undefined,false); 
			copyArg(msg,"version",params,undefined,false); 
			

			svc.getActionType(params,cb);
		}

		
		service.GetJobDetails=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params,undefined,false); 
			
			copyArg(msg,"jobId",params,undefined,false); 
			

			svc.getJobDetails(params,cb);
		}

		
		service.GetPipeline=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"version",params,undefined,false); 
			

			svc.getPipeline(params,cb);
		}

		
		service.GetPipelineExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pipelineName",params,undefined,false); 
			copyArg(n,"pipelineExecutionId",params,undefined,false); 
			
			copyArg(msg,"pipelineName",params,undefined,false); 
			copyArg(msg,"pipelineExecutionId",params,undefined,false); 
			

			svc.getPipelineExecution(params,cb);
		}

		
		service.GetPipelineState=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			

			svc.getPipelineState(params,cb);
		}

		
		service.GetThirdPartyJobDetails=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params,undefined,false); 
			copyArg(n,"clientToken",params,undefined,false); 
			
			copyArg(msg,"jobId",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.getThirdPartyJobDetails(params,cb);
		}

		
		service.ListActionExecutions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pipelineName",params,undefined,false); 
			
			copyArg(msg,"pipelineName",params,undefined,false); 
			copyArg(msg,"filter",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listActionExecutions(params,cb);
		}

		
		service.ListActionTypes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"actionOwnerFilter",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"regionFilter",params,undefined,false); 
			

			svc.listActionTypes(params,cb);
		}

		
		service.ListPipelineExecutions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pipelineName",params,undefined,false); 
			
			copyArg(msg,"pipelineName",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listPipelineExecutions(params,cb);
		}

		
		service.ListPipelines=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listPipelines(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListWebhooks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listWebhooks(params,cb);
		}

		
		service.PollForJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"actionTypeId",params,undefined,true); 
			
			copyArg(msg,"actionTypeId",params,undefined,true); 
			copyArg(msg,"maxBatchSize",params,undefined,false); 
			copyArg(msg,"queryParam",params,undefined,false); 
			

			svc.pollForJobs(params,cb);
		}

		
		service.PollForThirdPartyJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"actionTypeId",params,undefined,true); 
			
			copyArg(msg,"actionTypeId",params,undefined,true); 
			copyArg(msg,"maxBatchSize",params,undefined,false); 
			

			svc.pollForThirdPartyJobs(params,cb);
		}

		
		service.PutActionRevision=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pipelineName",params,undefined,false); 
			copyArg(n,"stageName",params,undefined,false); 
			copyArg(n,"actionName",params,undefined,false); 
			copyArg(n,"actionRevision",params,undefined,true); 
			
			copyArg(msg,"pipelineName",params,undefined,false); 
			copyArg(msg,"stageName",params,undefined,false); 
			copyArg(msg,"actionName",params,undefined,false); 
			copyArg(msg,"actionRevision",params,undefined,true); 
			

			svc.putActionRevision(params,cb);
		}

		
		service.PutApprovalResult=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pipelineName",params,undefined,false); 
			copyArg(n,"stageName",params,undefined,false); 
			copyArg(n,"actionName",params,undefined,false); 
			copyArg(n,"result",params,undefined,false); 
			copyArg(n,"token",params,undefined,false); 
			
			copyArg(msg,"pipelineName",params,undefined,false); 
			copyArg(msg,"stageName",params,undefined,false); 
			copyArg(msg,"actionName",params,undefined,false); 
			copyArg(msg,"result",params,undefined,false); 
			copyArg(msg,"token",params,undefined,false); 
			

			svc.putApprovalResult(params,cb);
		}

		
		service.PutJobFailureResult=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params,undefined,false); 
			copyArg(n,"failureDetails",params,undefined,true); 
			
			copyArg(msg,"jobId",params,undefined,false); 
			copyArg(msg,"failureDetails",params,undefined,true); 
			

			svc.putJobFailureResult(params,cb);
		}

		
		service.PutJobSuccessResult=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params,undefined,false); 
			
			copyArg(msg,"jobId",params,undefined,false); 
			copyArg(msg,"currentRevision",params,undefined,true); 
			copyArg(msg,"continuationToken",params,undefined,false); 
			copyArg(msg,"executionDetails",params,undefined,true); 
			copyArg(msg,"outputVariables",params,undefined,true); 
			

			svc.putJobSuccessResult(params,cb);
		}

		
		service.PutThirdPartyJobFailureResult=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params,undefined,false); 
			copyArg(n,"clientToken",params,undefined,false); 
			copyArg(n,"failureDetails",params,undefined,true); 
			
			copyArg(msg,"jobId",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"failureDetails",params,undefined,true); 
			

			svc.putThirdPartyJobFailureResult(params,cb);
		}

		
		service.PutThirdPartyJobSuccessResult=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params,undefined,false); 
			copyArg(n,"clientToken",params,undefined,false); 
			
			copyArg(msg,"jobId",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"currentRevision",params,undefined,true); 
			copyArg(msg,"continuationToken",params,undefined,false); 
			copyArg(msg,"executionDetails",params,undefined,true); 
			

			svc.putThirdPartyJobSuccessResult(params,cb);
		}

		
		service.PutWebhook=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"webhook",params,undefined,true); 
			
			copyArg(msg,"webhook",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.putWebhook(params,cb);
		}

		
		service.RegisterWebhookWithThirdParty=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"webhookName",params,undefined,false); 
			

			svc.registerWebhookWithThirdParty(params,cb);
		}

		
		service.RetryStageExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pipelineName",params,undefined,false); 
			copyArg(n,"stageName",params,undefined,false); 
			copyArg(n,"pipelineExecutionId",params,undefined,false); 
			copyArg(n,"retryMode",params,undefined,false); 
			
			copyArg(msg,"pipelineName",params,undefined,false); 
			copyArg(msg,"stageName",params,undefined,false); 
			copyArg(msg,"pipelineExecutionId",params,undefined,false); 
			copyArg(msg,"retryMode",params,undefined,false); 
			

			svc.retryStageExecution(params,cb);
		}

		
		service.StartPipelineExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			

			svc.startPipelineExecution(params,cb);
		}

		
		service.StopPipelineExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pipelineName",params,undefined,false); 
			copyArg(n,"pipelineExecutionId",params,undefined,false); 
			
			copyArg(msg,"pipelineName",params,undefined,false); 
			copyArg(msg,"pipelineExecutionId",params,undefined,false); 
			copyArg(msg,"abandon",params,undefined,false); 
			copyArg(msg,"reason",params,undefined,false); 
			

			svc.stopPipelineExecution(params,cb);
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

		
		service.UpdateActionType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"actionType",params,undefined,true); 
			
			copyArg(msg,"actionType",params,undefined,true); 
			

			svc.updateActionType(params,cb);
		}

		
		service.UpdatePipeline=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pipeline",params,undefined,true); 
			
			copyArg(msg,"pipeline",params,undefined,true); 
			

			svc.updatePipeline(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS CodePipeline", AmazonAPINode);

};
