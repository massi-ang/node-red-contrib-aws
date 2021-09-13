
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

		var awsService = new AWS.Cloud9( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Cloud9(msg.AWSConfig) : awsService;

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
		
			service.CreateEnvironmentEC2=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"instanceType",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,true); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			copyArgs(n,"instanceType",params,undefined,false); 
			copyArgs(n,"subnetId",params,undefined,false); 
			copyArgs(n,"imageId",params,undefined,false); 
			copyArgs(Number(n),"automaticStopTimeMinutes",params,undefined,false); 
			copyArgs(n,"ownerArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"connectionType",params,undefined,false); 
			copyArgs(Boolean(n),"dryRun",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,true); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			copyArgs(msg,"instanceType",params,undefined,false); 
			copyArgs(msg,"subnetId",params,undefined,false); 
			copyArgs(msg,"imageId",params,undefined,false); 
			copyArgs(msg,"automaticStopTimeMinutes",params,undefined,false); 
			copyArgs(msg,"ownerArn",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"connectionType",params,undefined,false); 
			copyArgs(msg,"dryRun",params,undefined,false); 
			

			svc.createEnvironmentEC2(params,cb);
		}
			service.CreateEnvironmentMembership=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"environmentId",params,undefined,false); 
			copyArgs(n,"userArn",params,undefined,false); 
			copyArgs(n,"permissions",params,undefined,false); 
			
			copyArgs(n,"environmentId",params,undefined,false); 
			copyArgs(n,"userArn",params,undefined,false); 
			copyArgs(n,"permissions",params,undefined,false); 
			
			copyArgs(msg,"environmentId",params,undefined,false); 
			copyArgs(msg,"userArn",params,undefined,false); 
			copyArgs(msg,"permissions",params,undefined,false); 
			

			svc.createEnvironmentMembership(params,cb);
		}
			service.DeleteEnvironment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"environmentId",params,undefined,false); 
			
			copyArgs(n,"environmentId",params,undefined,false); 
			
			copyArgs(msg,"environmentId",params,undefined,false); 
			

			svc.deleteEnvironment(params,cb);
		}
			service.DeleteEnvironmentMembership=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"environmentId",params,undefined,false); 
			copyArgs(n,"userArn",params,undefined,false); 
			
			copyArgs(n,"environmentId",params,undefined,false); 
			copyArgs(n,"userArn",params,undefined,false); 
			
			copyArgs(msg,"environmentId",params,undefined,false); 
			copyArgs(msg,"userArn",params,undefined,false); 
			

			svc.deleteEnvironmentMembership(params,cb);
		}
			service.DescribeEnvironmentMemberships=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"userArn",params,undefined,false); 
			copyArgs(n,"environmentId",params,undefined,false); 
			copyArgs(n,"permissions",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"userArn",params,undefined,false); 
			copyArgs(msg,"environmentId",params,undefined,false); 
			copyArgs(msg,"permissions",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.describeEnvironmentMemberships(params,cb);
		}
			service.DescribeEnvironmentStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"environmentId",params,undefined,false); 
			
			copyArgs(n,"environmentId",params,undefined,false); 
			
			copyArgs(msg,"environmentId",params,undefined,false); 
			

			svc.describeEnvironmentStatus(params,cb);
		}
			service.DescribeEnvironments=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"environmentIds",params,undefined,false); 
			
			copyArgs(n,"environmentIds",params,undefined,false); 
			
			copyArgs(msg,"environmentIds",params,undefined,false); 
			

			svc.describeEnvironments(params,cb);
		}
			service.ListEnvironments=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listEnvironments(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
			service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
			service.UpdateEnvironment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"environmentId",params,undefined,false); 
			
			copyArgs(n,"environmentId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,true); 
			copyArgs(n,"managedCredentialsAction",params,undefined,false); 
			
			copyArgs(msg,"environmentId",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,true); 
			copyArgs(msg,"managedCredentialsAction",params,undefined,false); 
			

			svc.updateEnvironment(params,cb);
		}
			service.UpdateEnvironmentMembership=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"environmentId",params,undefined,false); 
			copyArgs(n,"userArn",params,undefined,false); 
			copyArgs(n,"permissions",params,undefined,false); 
			
			copyArgs(n,"environmentId",params,undefined,false); 
			copyArgs(n,"userArn",params,undefined,false); 
			copyArgs(n,"permissions",params,undefined,false); 
			
			copyArgs(msg,"environmentId",params,undefined,false); 
			copyArgs(msg,"userArn",params,undefined,false); 
			copyArgs(msg,"permissions",params,undefined,false); 
			

			svc.updateEnvironmentMembership(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS Cloud9", AmazonAPINode);

};
