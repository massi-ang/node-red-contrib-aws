
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

		var awsService = new AWS.Batch( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Batch(msg.AWSConfig) : awsService;

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

		
		service.CancelJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params,undefined,false); 
			copyArg(n,"reason",params,undefined,false); 
			
			copyArg(msg,"jobId",params,undefined,false); 
			copyArg(msg,"reason",params,undefined,false); 
			

			svc.cancelJob(params,cb);
		}

		
		service.CreateComputeEnvironment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"computeEnvironmentName",params,undefined,false); 
			copyArg(n,"_type",params,"type",false); 
			
			copyArg(msg,"computeEnvironmentName",params,undefined,false); 
			copyArg(msg,"type",params,undefined,false); 
			copyArg(msg,"state",params,undefined,false); 
			copyArg(msg,"computeResources",params,undefined,true); 
			copyArg(msg,"serviceRole",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createComputeEnvironment(params,cb);
		}

		
		service.CreateJobQueue=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobQueueName",params,undefined,false); 
			copyArg(n,"priority",params,undefined,false); 
			copyArg(n,"computeEnvironmentOrder",params,undefined,true); 
			
			copyArg(msg,"jobQueueName",params,undefined,false); 
			copyArg(msg,"state",params,undefined,false); 
			copyArg(msg,"priority",params,undefined,false); 
			copyArg(msg,"computeEnvironmentOrder",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createJobQueue(params,cb);
		}

		
		service.DeleteComputeEnvironment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"computeEnvironment",params,undefined,false); 
			
			copyArg(msg,"computeEnvironment",params,undefined,false); 
			

			svc.deleteComputeEnvironment(params,cb);
		}

		
		service.DeleteJobQueue=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobQueue",params,undefined,false); 
			
			copyArg(msg,"jobQueue",params,undefined,false); 
			

			svc.deleteJobQueue(params,cb);
		}

		
		service.DeregisterJobDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobDefinition",params,undefined,false); 
			
			copyArg(msg,"jobDefinition",params,undefined,false); 
			

			svc.deregisterJobDefinition(params,cb);
		}

		
		service.DescribeComputeEnvironments=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"computeEnvironments",params,undefined,true); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.describeComputeEnvironments(params,cb);
		}

		
		service.DescribeJobDefinitions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"jobDefinitions",params,undefined,true); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"jobDefinitionName",params,undefined,false); 
			copyArg(msg,"status",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.describeJobDefinitions(params,cb);
		}

		
		service.DescribeJobQueues=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"jobQueues",params,undefined,true); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.describeJobQueues(params,cb);
		}

		
		service.DescribeJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobs",params,undefined,true); 
			
			copyArg(msg,"jobs",params,undefined,true); 
			

			svc.describeJobs(params,cb);
		}

		
		service.ListJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"jobQueue",params,undefined,false); 
			copyArg(msg,"arrayJobId",params,undefined,false); 
			copyArg(msg,"multiNodeJobId",params,undefined,false); 
			copyArg(msg,"jobStatus",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"filters",params,undefined,false); 
			

			svc.listJobs(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.RegisterJobDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobDefinitionName",params,undefined,false); 
			copyArg(n,"_type",params,"type",false); 
			
			copyArg(msg,"jobDefinitionName",params,undefined,false); 
			copyArg(msg,"type",params,undefined,false); 
			copyArg(msg,"parameters",params,undefined,true); 
			copyArg(msg,"containerProperties",params,undefined,true); 
			copyArg(msg,"nodeProperties",params,undefined,true); 
			copyArg(msg,"retryStrategy",params,undefined,true); 
			copyArg(msg,"propagateTags",params,undefined,false); 
			copyArg(msg,"timeout",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"platformCapabilities",params,undefined,true); 
			

			svc.registerJobDefinition(params,cb);
		}

		
		service.SubmitJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobName",params,undefined,false); 
			copyArg(n,"jobQueue",params,undefined,false); 
			copyArg(n,"jobDefinition",params,undefined,false); 
			
			copyArg(msg,"jobName",params,undefined,false); 
			copyArg(msg,"jobQueue",params,undefined,false); 
			copyArg(msg,"arrayProperties",params,undefined,false); 
			copyArg(msg,"dependsOn",params,undefined,true); 
			copyArg(msg,"jobDefinition",params,undefined,false); 
			copyArg(msg,"parameters",params,undefined,true); 
			copyArg(msg,"containerOverrides",params,undefined,true); 
			copyArg(msg,"nodeOverrides",params,undefined,false); 
			copyArg(msg,"retryStrategy",params,undefined,true); 
			copyArg(msg,"propagateTags",params,undefined,false); 
			copyArg(msg,"timeout",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.submitJob(params,cb);
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

		
		service.TerminateJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params,undefined,false); 
			copyArg(n,"reason",params,undefined,false); 
			
			copyArg(msg,"jobId",params,undefined,false); 
			copyArg(msg,"reason",params,undefined,false); 
			

			svc.terminateJob(params,cb);
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

		
		service.UpdateComputeEnvironment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"computeEnvironment",params,undefined,false); 
			
			copyArg(msg,"computeEnvironment",params,undefined,false); 
			copyArg(msg,"state",params,undefined,false); 
			copyArg(msg,"computeResources",params,undefined,false); 
			copyArg(msg,"serviceRole",params,undefined,false); 
			

			svc.updateComputeEnvironment(params,cb);
		}

		
		service.UpdateJobQueue=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobQueue",params,undefined,false); 
			
			copyArg(msg,"jobQueue",params,undefined,false); 
			copyArg(msg,"state",params,undefined,false); 
			copyArg(msg,"priority",params,undefined,false); 
			copyArg(msg,"computeEnvironmentOrder",params,undefined,true); 
			

			svc.updateJobQueue(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Batch", AmazonAPINode);

};
