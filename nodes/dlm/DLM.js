
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

		var awsService = new AWS.DLM( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.DLM(msg.AWSConfig) : awsService;

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
		
		service.CreateLifecyclePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"State",params,undefined,false); 
			copyArgs(n,"PolicyDetails",params,undefined,true); 
			
			copyArgs(n,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"State",params,undefined,false); 
			copyArgs(n,"PolicyDetails",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"State",params,undefined,false); 
			copyArgs(msg,"PolicyDetails",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createLifecyclePolicy(params,cb);
		}
		
		service.DeleteLifecyclePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicyId",params,undefined,false); 
			
			copyArgs(n,"PolicyId",params,undefined,false); 
			
			copyArgs(msg,"PolicyId",params,undefined,false); 
			

			svc.deleteLifecyclePolicy(params,cb);
		}
		
		service.GetLifecyclePolicies=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"PolicyIds",params,undefined,false); 
			copyArgs(n,"State",params,undefined,false); 
			copyArgs(n,"ResourceTypes",params,undefined,true); 
			copyArgs(n,"TargetTags",params,undefined,false); 
			copyArgs(n,"TagsToAdd",params,undefined,false); 
			
			copyArgs(msg,"PolicyIds",params,undefined,false); 
			copyArgs(msg,"State",params,undefined,false); 
			copyArgs(msg,"ResourceTypes",params,undefined,true); 
			copyArgs(msg,"TargetTags",params,undefined,false); 
			copyArgs(msg,"TagsToAdd",params,undefined,false); 
			

			svc.getLifecyclePolicies(params,cb);
		}
		
		service.GetLifecyclePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicyId",params,undefined,false); 
			
			copyArgs(n,"PolicyId",params,undefined,false); 
			
			copyArgs(msg,"PolicyId",params,undefined,false); 
			

			svc.getLifecyclePolicy(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
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
		
		service.UpdateLifecyclePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicyId",params,undefined,false); 
			
			copyArgs(n,"PolicyId",params,undefined,false); 
			copyArgs(n,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(n,"State",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"PolicyDetails",params,undefined,true); 
			
			copyArgs(msg,"PolicyId",params,undefined,false); 
			copyArgs(msg,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(msg,"State",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"PolicyDetails",params,undefined,true); 
			

			svc.updateLifecyclePolicy(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS DLM", AmazonAPINode);

};
