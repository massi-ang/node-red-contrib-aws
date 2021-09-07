
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

		var awsService = new AWS.Batch( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Batch(msg.AWSConfig) : awsService;

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

		
		service.CancelJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"reason",params,undefined,false); 
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"reason",params,undefined,false); 
			
			copyArgs(msg,"jobId",params,undefined,false); 
			copyArgs(msg,"reason",params,undefined,false); 
			

			svc.cancelJob(params,cb);
		}

		
		service.CreateComputeEnvironment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"computeEnvironmentName",params,undefined,false); 
			copyArgs(n,"_type",params,"type",false); 
			
			copyArgs(n,"computeEnvironmentName",params,undefined,false); 
			copyArgs(n,"type",params,undefined,false); 
			copyArgs(n,"state",params,undefined,false); 
			copyArgs(n,"computeResources",params,undefined,true); 
			copyArgs(n,"serviceRole",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"computeEnvironmentName",params,undefined,false); 
			copyArgs(msg,"type",params,undefined,false); 
			copyArgs(msg,"state",params,undefined,false); 
			copyArgs(msg,"computeResources",params,undefined,true); 
			copyArgs(msg,"serviceRole",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createComputeEnvironment(params,cb);
		}

		
		service.CreateJobQueue=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobQueueName",params,undefined,false); 
			copyArgs(n,"priority",params,undefined,false); 
			copyArgs(n,"computeEnvironmentOrder",params,undefined,true); 
			
			copyArgs(n,"jobQueueName",params,undefined,false); 
			copyArgs(n,"state",params,undefined,false); 
			copyArgs(n,"priority",params,undefined,false); 
			copyArgs(n,"computeEnvironmentOrder",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"jobQueueName",params,undefined,false); 
			copyArgs(msg,"state",params,undefined,false); 
			copyArgs(msg,"priority",params,undefined,false); 
			copyArgs(msg,"computeEnvironmentOrder",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createJobQueue(params,cb);
		}

		
		service.DeleteComputeEnvironment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"computeEnvironment",params,undefined,false); 
			
			copyArgs(n,"computeEnvironment",params,undefined,false); 
			
			copyArgs(msg,"computeEnvironment",params,undefined,false); 
			

			svc.deleteComputeEnvironment(params,cb);
		}

		
		service.DeleteJobQueue=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobQueue",params,undefined,false); 
			
			copyArgs(n,"jobQueue",params,undefined,false); 
			
			copyArgs(msg,"jobQueue",params,undefined,false); 
			

			svc.deleteJobQueue(params,cb);
		}

		
		service.DeregisterJobDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobDefinition",params,undefined,false); 
			
			copyArgs(n,"jobDefinition",params,undefined,false); 
			
			copyArgs(msg,"jobDefinition",params,undefined,false); 
			

			svc.deregisterJobDefinition(params,cb);
		}

		
		service.DescribeComputeEnvironments=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"computeEnvironments",params,undefined,true); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"computeEnvironments",params,undefined,true); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.describeComputeEnvironments(params,cb);
		}

		
		service.DescribeJobDefinitions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"jobDefinitions",params,undefined,true); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"jobDefinitionName",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"jobDefinitions",params,undefined,true); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"jobDefinitionName",params,undefined,false); 
			copyArgs(msg,"status",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.describeJobDefinitions(params,cb);
		}

		
		service.DescribeJobQueues=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"jobQueues",params,undefined,true); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"jobQueues",params,undefined,true); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.describeJobQueues(params,cb);
		}

		
		service.DescribeJobs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobs",params,undefined,true); 
			
			copyArgs(n,"jobs",params,undefined,true); 
			
			copyArgs(msg,"jobs",params,undefined,true); 
			

			svc.describeJobs(params,cb);
		}

		
		service.ListJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"jobQueue",params,undefined,false); 
			copyArgs(n,"arrayJobId",params,undefined,false); 
			copyArgs(n,"multiNodeJobId",params,undefined,false); 
			copyArgs(n,"jobStatus",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"filters",params,undefined,false); 
			
			copyArgs(msg,"jobQueue",params,undefined,false); 
			copyArgs(msg,"arrayJobId",params,undefined,false); 
			copyArgs(msg,"multiNodeJobId",params,undefined,false); 
			copyArgs(msg,"jobStatus",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"filters",params,undefined,false); 
			

			svc.listJobs(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.RegisterJobDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobDefinitionName",params,undefined,false); 
			copyArgs(n,"_type",params,"type",false); 
			
			copyArgs(n,"jobDefinitionName",params,undefined,false); 
			copyArgs(n,"type",params,undefined,false); 
			copyArgs(n,"parameters",params,undefined,true); 
			copyArgs(n,"containerProperties",params,undefined,true); 
			copyArgs(n,"nodeProperties",params,undefined,true); 
			copyArgs(n,"retryStrategy",params,undefined,true); 
			copyArgs(n,"propagateTags",params,undefined,false); 
			copyArgs(n,"timeout",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"platformCapabilities",params,undefined,true); 
			
			copyArgs(msg,"jobDefinitionName",params,undefined,false); 
			copyArgs(msg,"type",params,undefined,false); 
			copyArgs(msg,"parameters",params,undefined,true); 
			copyArgs(msg,"containerProperties",params,undefined,true); 
			copyArgs(msg,"nodeProperties",params,undefined,true); 
			copyArgs(msg,"retryStrategy",params,undefined,true); 
			copyArgs(msg,"propagateTags",params,undefined,false); 
			copyArgs(msg,"timeout",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"platformCapabilities",params,undefined,true); 
			

			svc.registerJobDefinition(params,cb);
		}

		
		service.SubmitJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobName",params,undefined,false); 
			copyArgs(n,"jobQueue",params,undefined,false); 
			copyArgs(n,"jobDefinition",params,undefined,false); 
			
			copyArgs(n,"jobName",params,undefined,false); 
			copyArgs(n,"jobQueue",params,undefined,false); 
			copyArgs(n,"arrayProperties",params,undefined,false); 
			copyArgs(n,"dependsOn",params,undefined,true); 
			copyArgs(n,"jobDefinition",params,undefined,false); 
			copyArgs(n,"parameters",params,undefined,true); 
			copyArgs(n,"containerOverrides",params,undefined,true); 
			copyArgs(n,"nodeOverrides",params,undefined,false); 
			copyArgs(n,"retryStrategy",params,undefined,true); 
			copyArgs(n,"propagateTags",params,undefined,false); 
			copyArgs(n,"timeout",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"jobName",params,undefined,false); 
			copyArgs(msg,"jobQueue",params,undefined,false); 
			copyArgs(msg,"arrayProperties",params,undefined,false); 
			copyArgs(msg,"dependsOn",params,undefined,true); 
			copyArgs(msg,"jobDefinition",params,undefined,false); 
			copyArgs(msg,"parameters",params,undefined,true); 
			copyArgs(msg,"containerOverrides",params,undefined,true); 
			copyArgs(msg,"nodeOverrides",params,undefined,false); 
			copyArgs(msg,"retryStrategy",params,undefined,true); 
			copyArgs(msg,"propagateTags",params,undefined,false); 
			copyArgs(msg,"timeout",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.submitJob(params,cb);
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

		
		service.TerminateJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"reason",params,undefined,false); 
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"reason",params,undefined,false); 
			
			copyArgs(msg,"jobId",params,undefined,false); 
			copyArgs(msg,"reason",params,undefined,false); 
			

			svc.terminateJob(params,cb);
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

		
		service.UpdateComputeEnvironment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"computeEnvironment",params,undefined,false); 
			
			copyArgs(n,"computeEnvironment",params,undefined,false); 
			copyArgs(n,"state",params,undefined,false); 
			copyArgs(n,"computeResources",params,undefined,false); 
			copyArgs(n,"serviceRole",params,undefined,false); 
			
			copyArgs(msg,"computeEnvironment",params,undefined,false); 
			copyArgs(msg,"state",params,undefined,false); 
			copyArgs(msg,"computeResources",params,undefined,false); 
			copyArgs(msg,"serviceRole",params,undefined,false); 
			

			svc.updateComputeEnvironment(params,cb);
		}

		
		service.UpdateJobQueue=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobQueue",params,undefined,false); 
			
			copyArgs(n,"jobQueue",params,undefined,false); 
			copyArgs(n,"state",params,undefined,false); 
			copyArgs(n,"priority",params,undefined,false); 
			copyArgs(n,"computeEnvironmentOrder",params,undefined,true); 
			
			copyArgs(msg,"jobQueue",params,undefined,false); 
			copyArgs(msg,"state",params,undefined,false); 
			copyArgs(msg,"priority",params,undefined,false); 
			copyArgs(msg,"computeEnvironmentOrder",params,undefined,true); 
			

			svc.updateJobQueue(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Batch", AmazonAPINode);

};
