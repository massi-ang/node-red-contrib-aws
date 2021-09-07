
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

		var awsService = new AWS.MediaStore( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.MediaStore(msg.AWSConfig) : awsService;

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

		
		service.CreateContainer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ContainerName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createContainer(params,cb);
		}

		
		service.DeleteContainer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			
			copyArgs(msg,"ContainerName",params,undefined,false); 
			

			svc.deleteContainer(params,cb);
		}

		
		service.DeleteContainerPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			
			copyArgs(msg,"ContainerName",params,undefined,false); 
			

			svc.deleteContainerPolicy(params,cb);
		}

		
		service.DeleteCorsPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			
			copyArgs(msg,"ContainerName",params,undefined,false); 
			

			svc.deleteCorsPolicy(params,cb);
		}

		
		service.DeleteLifecyclePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			
			copyArgs(msg,"ContainerName",params,undefined,false); 
			

			svc.deleteLifecyclePolicy(params,cb);
		}

		
		service.DeleteMetricPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			
			copyArgs(msg,"ContainerName",params,undefined,false); 
			

			svc.deleteMetricPolicy(params,cb);
		}

		
		service.DescribeContainer=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			
			copyArgs(msg,"ContainerName",params,undefined,false); 
			

			svc.describeContainer(params,cb);
		}

		
		service.GetContainerPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			
			copyArgs(msg,"ContainerName",params,undefined,false); 
			

			svc.getContainerPolicy(params,cb);
		}

		
		service.GetCorsPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			
			copyArgs(msg,"ContainerName",params,undefined,false); 
			

			svc.getCorsPolicy(params,cb);
		}

		
		service.GetLifecyclePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			
			copyArgs(msg,"ContainerName",params,undefined,false); 
			

			svc.getLifecyclePolicy(params,cb);
		}

		
		service.GetMetricPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			
			copyArgs(msg,"ContainerName",params,undefined,false); 
			

			svc.getMetricPolicy(params,cb);
		}

		
		service.ListContainers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listContainers(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Resource",params,undefined,false); 
			
			copyArgs(n,"Resource",params,undefined,false); 
			
			copyArgs(msg,"Resource",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutContainerPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(msg,"ContainerName",params,undefined,false); 
			copyArgs(msg,"Policy",params,undefined,false); 
			

			svc.putContainerPolicy(params,cb);
		}

		
		service.PutCorsPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			copyArgs(n,"CorsPolicy",params,undefined,true); 
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			copyArgs(n,"CorsPolicy",params,undefined,true); 
			
			copyArgs(msg,"ContainerName",params,undefined,false); 
			copyArgs(msg,"CorsPolicy",params,undefined,true); 
			

			svc.putCorsPolicy(params,cb);
		}

		
		service.PutLifecyclePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			copyArgs(n,"LifecyclePolicy",params,undefined,false); 
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			copyArgs(n,"LifecyclePolicy",params,undefined,false); 
			
			copyArgs(msg,"ContainerName",params,undefined,false); 
			copyArgs(msg,"LifecyclePolicy",params,undefined,false); 
			

			svc.putLifecyclePolicy(params,cb);
		}

		
		service.PutMetricPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			copyArgs(n,"MetricPolicy",params,undefined,true); 
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			copyArgs(n,"MetricPolicy",params,undefined,true); 
			
			copyArgs(msg,"ContainerName",params,undefined,false); 
			copyArgs(msg,"MetricPolicy",params,undefined,true); 
			

			svc.putMetricPolicy(params,cb);
		}

		
		service.StartAccessLogging=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			
			copyArgs(msg,"ContainerName",params,undefined,false); 
			

			svc.startAccessLogging(params,cb);
		}

		
		service.StopAccessLogging=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			
			copyArgs(n,"ContainerName",params,undefined,false); 
			
			copyArgs(msg,"ContainerName",params,undefined,false); 
			

			svc.stopAccessLogging(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Resource",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"Resource",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Resource",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Resource",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"Resource",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"Resource",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS MediaStore", AmazonAPINode);

};
