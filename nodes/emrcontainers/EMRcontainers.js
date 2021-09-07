
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

		var awsService = new AWS.EMRcontainers( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.EMRcontainers(msg.AWSConfig) : awsService;

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

		
		service.CancelJobRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"virtualClusterId",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"virtualClusterId",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			copyArgs(msg,"virtualClusterId",params,undefined,false); 
			

			svc.cancelJobRun(params,cb);
		}

		
		service.CreateManagedEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"virtualClusterId",params,undefined,false); 
			copyArgs(n,"_type",params,"type",false); 
			copyArgs(n,"releaseLabel",params,undefined,false); 
			copyArgs(n,"executionRoleArn",params,undefined,false); 
			copyArgs(n,"certificateArn",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"virtualClusterId",params,undefined,false); 
			copyArgs(n,"type",params,undefined,false); 
			copyArgs(n,"releaseLabel",params,undefined,false); 
			copyArgs(n,"executionRoleArn",params,undefined,false); 
			copyArgs(n,"certificateArn",params,undefined,false); 
			copyArgs(n,"configurationOverrides",params,undefined,true); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"virtualClusterId",params,undefined,false); 
			copyArgs(msg,"type",params,undefined,false); 
			copyArgs(msg,"releaseLabel",params,undefined,false); 
			copyArgs(msg,"executionRoleArn",params,undefined,false); 
			copyArgs(msg,"certificateArn",params,undefined,false); 
			copyArgs(msg,"configurationOverrides",params,undefined,true); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createManagedEndpoint(params,cb);
		}

		
		service.CreateVirtualCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"containerProvider",params,undefined,true); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"containerProvider",params,undefined,true); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"containerProvider",params,undefined,true); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createVirtualCluster(params,cb);
		}

		
		service.DeleteManagedEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"virtualClusterId",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"virtualClusterId",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			copyArgs(msg,"virtualClusterId",params,undefined,false); 
			

			svc.deleteManagedEndpoint(params,cb);
		}

		
		service.DeleteVirtualCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.deleteVirtualCluster(params,cb);
		}

		
		service.DescribeJobRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"virtualClusterId",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"virtualClusterId",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			copyArgs(msg,"virtualClusterId",params,undefined,false); 
			

			svc.describeJobRun(params,cb);
		}

		
		service.DescribeManagedEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"virtualClusterId",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"virtualClusterId",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			copyArgs(msg,"virtualClusterId",params,undefined,false); 
			

			svc.describeManagedEndpoint(params,cb);
		}

		
		service.DescribeVirtualCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.describeVirtualCluster(params,cb);
		}

		
		service.ListJobRuns=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"virtualClusterId",params,undefined,false); 
			
			copyArgs(n,"virtualClusterId",params,undefined,false); 
			copyArgs(n,"createdBefore",params,undefined,true); 
			copyArgs(n,"createdAfter",params,undefined,true); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"states",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"virtualClusterId",params,undefined,false); 
			copyArgs(msg,"createdBefore",params,undefined,true); 
			copyArgs(msg,"createdAfter",params,undefined,true); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"states",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listJobRuns(params,cb);
		}

		
		service.ListManagedEndpoints=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"virtualClusterId",params,undefined,false); 
			
			copyArgs(n,"virtualClusterId",params,undefined,false); 
			copyArgs(n,"createdBefore",params,undefined,true); 
			copyArgs(n,"createdAfter",params,undefined,true); 
			copyArgs(n,"types",params,undefined,false); 
			copyArgs(n,"states",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"virtualClusterId",params,undefined,false); 
			copyArgs(msg,"createdBefore",params,undefined,true); 
			copyArgs(msg,"createdAfter",params,undefined,true); 
			copyArgs(msg,"types",params,undefined,false); 
			copyArgs(msg,"states",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listManagedEndpoints(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListVirtualClusters=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"containerProviderId",params,undefined,false); 
			copyArgs(n,"containerProviderType",params,undefined,false); 
			copyArgs(n,"createdAfter",params,undefined,true); 
			copyArgs(n,"createdBefore",params,undefined,true); 
			copyArgs(n,"states",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"containerProviderId",params,undefined,false); 
			copyArgs(msg,"containerProviderType",params,undefined,false); 
			copyArgs(msg,"createdAfter",params,undefined,true); 
			copyArgs(msg,"createdBefore",params,undefined,true); 
			copyArgs(msg,"states",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listVirtualClusters(params,cb);
		}

		
		service.StartJobRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"virtualClusterId",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"executionRoleArn",params,undefined,false); 
			copyArgs(n,"releaseLabel",params,undefined,false); 
			copyArgs(n,"jobDriver",params,undefined,true); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"virtualClusterId",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"executionRoleArn",params,undefined,false); 
			copyArgs(n,"releaseLabel",params,undefined,false); 
			copyArgs(n,"jobDriver",params,undefined,true); 
			copyArgs(n,"configurationOverrides",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"virtualClusterId",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"executionRoleArn",params,undefined,false); 
			copyArgs(msg,"releaseLabel",params,undefined,false); 
			copyArgs(msg,"jobDriver",params,undefined,true); 
			copyArgs(msg,"configurationOverrides",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.startJobRun(params,cb);
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

		 

	}
	RED.nodes.registerType("AWS EMRcontainers", AmazonAPINode);

};
