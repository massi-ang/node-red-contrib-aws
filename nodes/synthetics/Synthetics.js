
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

		var awsService = new AWS.Synthetics( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Synthetics(msg.AWSConfig) : awsService;

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

		
		service.CreateCanary=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Code",params,undefined,true); 
			copyArgs(n,"ArtifactS3Location",params,undefined,false); 
			copyArgs(n,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(n,"Schedule",params,undefined,true); 
			copyArgs(n,"RuntimeVersion",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Code",params,undefined,true); 
			copyArgs(n,"ArtifactS3Location",params,undefined,false); 
			copyArgs(n,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(n,"Schedule",params,undefined,true); 
			copyArgs(n,"RunConfig",params,undefined,true); 
			copyArgs(n,"SuccessRetentionPeriodInDays",params,undefined,false); 
			copyArgs(n,"FailureRetentionPeriodInDays",params,undefined,false); 
			copyArgs(n,"RuntimeVersion",params,undefined,false); 
			copyArgs(n,"VpcConfig",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Code",params,undefined,true); 
			copyArgs(msg,"ArtifactS3Location",params,undefined,false); 
			copyArgs(msg,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(msg,"Schedule",params,undefined,true); 
			copyArgs(msg,"RunConfig",params,undefined,true); 
			copyArgs(msg,"SuccessRetentionPeriodInDays",params,undefined,false); 
			copyArgs(msg,"FailureRetentionPeriodInDays",params,undefined,false); 
			copyArgs(msg,"RuntimeVersion",params,undefined,false); 
			copyArgs(msg,"VpcConfig",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createCanary(params,cb);
		}

		
		service.DeleteCanary=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteCanary(params,cb);
		}

		
		service.DescribeCanaries=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeCanaries(params,cb);
		}

		
		service.DescribeCanariesLastRun=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeCanariesLastRun(params,cb);
		}

		
		service.DescribeRuntimeVersions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeRuntimeVersions(params,cb);
		}

		
		service.GetCanary=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getCanary(params,cb);
		}

		
		service.GetCanaryRuns=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.getCanaryRuns(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.StartCanary=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.startCanary(params,cb);
		}

		
		service.StopCanary=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.stopCanary(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateCanary=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Code",params,undefined,true); 
			copyArgs(n,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(n,"RuntimeVersion",params,undefined,false); 
			copyArgs(n,"Schedule",params,undefined,true); 
			copyArgs(n,"RunConfig",params,undefined,true); 
			copyArgs(n,"SuccessRetentionPeriodInDays",params,undefined,false); 
			copyArgs(n,"FailureRetentionPeriodInDays",params,undefined,false); 
			copyArgs(n,"VpcConfig",params,undefined,true); 
			copyArgs(n,"VisualReference",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Code",params,undefined,true); 
			copyArgs(msg,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(msg,"RuntimeVersion",params,undefined,false); 
			copyArgs(msg,"Schedule",params,undefined,true); 
			copyArgs(msg,"RunConfig",params,undefined,true); 
			copyArgs(msg,"SuccessRetentionPeriodInDays",params,undefined,false); 
			copyArgs(msg,"FailureRetentionPeriodInDays",params,undefined,false); 
			copyArgs(msg,"VpcConfig",params,undefined,true); 
			copyArgs(msg,"VisualReference",params,undefined,false); 
			

			svc.updateCanary(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Synthetics", AmazonAPINode);

};
