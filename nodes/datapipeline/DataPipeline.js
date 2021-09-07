
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

		var awsService = new AWS.DataPipeline( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.DataPipeline(msg.AWSConfig) : awsService;

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

		
		service.ActivatePipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineId",params,undefined,false); 
			
			copyArgs(n,"pipelineId",params,undefined,false); 
			copyArgs(n,"parameterValues",params,undefined,true); 
			copyArgs(n,"startTimestamp",params,undefined,false); 
			
			copyArgs(msg,"pipelineId",params,undefined,false); 
			copyArgs(msg,"parameterValues",params,undefined,true); 
			copyArgs(msg,"startTimestamp",params,undefined,false); 
			

			svc.activatePipeline(params,cb);
		}

		
		service.AddTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineId",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(n,"pipelineId",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"pipelineId",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.addTags(params,cb);
		}

		
		service.CreatePipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"uniqueId",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"uniqueId",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"uniqueId",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createPipeline(params,cb);
		}

		
		service.DeactivatePipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineId",params,undefined,false); 
			
			copyArgs(n,"pipelineId",params,undefined,false); 
			copyArgs(n,"cancelActive",params,undefined,false); 
			
			copyArgs(msg,"pipelineId",params,undefined,false); 
			copyArgs(msg,"cancelActive",params,undefined,false); 
			

			svc.deactivatePipeline(params,cb);
		}

		
		service.DeletePipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineId",params,undefined,false); 
			
			copyArgs(n,"pipelineId",params,undefined,false); 
			
			copyArgs(msg,"pipelineId",params,undefined,false); 
			

			svc.deletePipeline(params,cb);
		}

		
		service.DescribeObjects=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineId",params,undefined,false); 
			copyArgs(n,"objectIds",params,undefined,true); 
			
			copyArgs(n,"pipelineId",params,undefined,false); 
			copyArgs(n,"objectIds",params,undefined,true); 
			copyArgs(n,"evaluateExpressions",params,undefined,false); 
			copyArgs(n,"marker",params,undefined,false); 
			
			copyArgs(msg,"pipelineId",params,undefined,false); 
			copyArgs(msg,"objectIds",params,undefined,true); 
			copyArgs(msg,"evaluateExpressions",params,undefined,false); 
			copyArgs(msg,"marker",params,undefined,false); 
			

			svc.describeObjects(params,cb);
		}

		
		service.DescribePipelines=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineIds",params,undefined,true); 
			
			copyArgs(n,"pipelineIds",params,undefined,true); 
			
			copyArgs(msg,"pipelineIds",params,undefined,true); 
			

			svc.describePipelines(params,cb);
		}

		
		service.EvaluateExpression=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineId",params,undefined,false); 
			copyArgs(n,"objectId",params,undefined,false); 
			copyArgs(n,"expression",params,undefined,false); 
			
			copyArgs(n,"pipelineId",params,undefined,false); 
			copyArgs(n,"objectId",params,undefined,false); 
			copyArgs(n,"expression",params,undefined,false); 
			
			copyArgs(msg,"pipelineId",params,undefined,false); 
			copyArgs(msg,"objectId",params,undefined,false); 
			copyArgs(msg,"expression",params,undefined,false); 
			

			svc.evaluateExpression(params,cb);
		}

		
		service.GetPipelineDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineId",params,undefined,false); 
			
			copyArgs(n,"pipelineId",params,undefined,false); 
			copyArgs(n,"version",params,undefined,false); 
			
			copyArgs(msg,"pipelineId",params,undefined,false); 
			copyArgs(msg,"version",params,undefined,false); 
			

			svc.getPipelineDefinition(params,cb);
		}

		
		service.ListPipelines=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"marker",params,undefined,false); 
			
			copyArgs(msg,"marker",params,undefined,false); 
			

			svc.listPipelines(params,cb);
		}

		
		service.PollForTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"workerGroup",params,undefined,false); 
			
			copyArgs(n,"workerGroup",params,undefined,false); 
			copyArgs(n,"hostname",params,undefined,false); 
			copyArgs(n,"instanceIdentity",params,undefined,false); 
			
			copyArgs(msg,"workerGroup",params,undefined,false); 
			copyArgs(msg,"hostname",params,undefined,false); 
			copyArgs(msg,"instanceIdentity",params,undefined,false); 
			

			svc.pollForTask(params,cb);
		}

		
		service.PutPipelineDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineId",params,undefined,false); 
			copyArgs(n,"pipelineObjects",params,undefined,true); 
			
			copyArgs(n,"pipelineId",params,undefined,false); 
			copyArgs(n,"pipelineObjects",params,undefined,true); 
			copyArgs(n,"parameterObjects",params,undefined,true); 
			copyArgs(n,"parameterValues",params,undefined,true); 
			
			copyArgs(msg,"pipelineId",params,undefined,false); 
			copyArgs(msg,"pipelineObjects",params,undefined,true); 
			copyArgs(msg,"parameterObjects",params,undefined,true); 
			copyArgs(msg,"parameterValues",params,undefined,true); 
			

			svc.putPipelineDefinition(params,cb);
		}

		
		service.QueryObjects=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineId",params,undefined,false); 
			copyArgs(n,"sphere",params,undefined,false); 
			
			copyArgs(n,"pipelineId",params,undefined,false); 
			copyArgs(n,"query",params,undefined,false); 
			copyArgs(n,"sphere",params,undefined,false); 
			copyArgs(n,"marker",params,undefined,false); 
			copyArgs(n,"limit",params,undefined,false); 
			
			copyArgs(msg,"pipelineId",params,undefined,false); 
			copyArgs(msg,"query",params,undefined,false); 
			copyArgs(msg,"sphere",params,undefined,false); 
			copyArgs(msg,"marker",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			

			svc.queryObjects(params,cb);
		}

		
		service.RemoveTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineId",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,true); 
			
			copyArgs(n,"pipelineId",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,true); 
			
			copyArgs(msg,"pipelineId",params,undefined,false); 
			copyArgs(msg,"tagKeys",params,undefined,true); 
			

			svc.removeTags(params,cb);
		}

		
		service.ReportTaskProgress=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"taskId",params,undefined,false); 
			
			copyArgs(n,"taskId",params,undefined,false); 
			copyArgs(n,"fields",params,undefined,true); 
			
			copyArgs(msg,"taskId",params,undefined,false); 
			copyArgs(msg,"fields",params,undefined,true); 
			

			svc.reportTaskProgress(params,cb);
		}

		
		service.ReportTaskRunnerHeartbeat=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"taskrunnerId",params,undefined,false); 
			
			copyArgs(n,"taskrunnerId",params,undefined,false); 
			copyArgs(n,"workerGroup",params,undefined,false); 
			copyArgs(n,"hostname",params,undefined,false); 
			
			copyArgs(msg,"taskrunnerId",params,undefined,false); 
			copyArgs(msg,"workerGroup",params,undefined,false); 
			copyArgs(msg,"hostname",params,undefined,false); 
			

			svc.reportTaskRunnerHeartbeat(params,cb);
		}

		
		service.SetStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineId",params,undefined,false); 
			copyArgs(n,"objectIds",params,undefined,true); 
			copyArgs(n,"status",params,undefined,false); 
			
			copyArgs(n,"pipelineId",params,undefined,false); 
			copyArgs(n,"objectIds",params,undefined,true); 
			copyArgs(n,"status",params,undefined,false); 
			
			copyArgs(msg,"pipelineId",params,undefined,false); 
			copyArgs(msg,"objectIds",params,undefined,true); 
			copyArgs(msg,"status",params,undefined,false); 
			

			svc.setStatus(params,cb);
		}

		
		service.SetTaskStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"taskId",params,undefined,false); 
			copyArgs(n,"taskStatus",params,undefined,false); 
			
			copyArgs(n,"taskId",params,undefined,false); 
			copyArgs(n,"taskStatus",params,undefined,false); 
			copyArgs(n,"errorId",params,undefined,false); 
			copyArgs(n,"errorMessage",params,undefined,false); 
			copyArgs(n,"errorStackTrace",params,undefined,false); 
			
			copyArgs(msg,"taskId",params,undefined,false); 
			copyArgs(msg,"taskStatus",params,undefined,false); 
			copyArgs(msg,"errorId",params,undefined,false); 
			copyArgs(msg,"errorMessage",params,undefined,false); 
			copyArgs(msg,"errorStackTrace",params,undefined,false); 
			

			svc.setTaskStatus(params,cb);
		}

		
		service.ValidatePipelineDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineId",params,undefined,false); 
			copyArgs(n,"pipelineObjects",params,undefined,true); 
			
			copyArgs(n,"pipelineId",params,undefined,false); 
			copyArgs(n,"pipelineObjects",params,undefined,true); 
			copyArgs(n,"parameterObjects",params,undefined,true); 
			copyArgs(n,"parameterValues",params,undefined,true); 
			
			copyArgs(msg,"pipelineId",params,undefined,false); 
			copyArgs(msg,"pipelineObjects",params,undefined,true); 
			copyArgs(msg,"parameterObjects",params,undefined,true); 
			copyArgs(msg,"parameterValues",params,undefined,true); 
			

			svc.validatePipelineDefinition(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS DataPipeline", AmazonAPINode);

};
