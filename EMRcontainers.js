
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

		var awsService = new AWS.EMRcontainers( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.EMRcontainers(msg.AWSConfig) : awsService;

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

		
		service.CancelJobRun=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			copyArg(n,"virtualClusterId",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			copyArg(msg,"virtualClusterId",params,undefined,false); 
			

			svc.cancelJobRun(params,cb);
		}

		
		service.CreateManagedEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"virtualClusterId",params,undefined,false); 
			copyArg(n,"_type",params,"type",false); 
			copyArg(n,"releaseLabel",params,undefined,false); 
			copyArg(n,"executionRoleArn",params,undefined,false); 
			copyArg(n,"certificateArn",params,undefined,false); 
			copyArg(n,"clientToken",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"virtualClusterId",params,undefined,false); 
			copyArg(msg,"type",params,undefined,false); 
			copyArg(msg,"releaseLabel",params,undefined,false); 
			copyArg(msg,"executionRoleArn",params,undefined,false); 
			copyArg(msg,"certificateArn",params,undefined,false); 
			copyArg(msg,"configurationOverrides",params,undefined,true); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createManagedEndpoint(params,cb);
		}

		
		service.CreateVirtualCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"containerProvider",params,undefined,true); 
			copyArg(n,"clientToken",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"containerProvider",params,undefined,true); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createVirtualCluster(params,cb);
		}

		
		service.DeleteManagedEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			copyArg(n,"virtualClusterId",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			copyArg(msg,"virtualClusterId",params,undefined,false); 
			

			svc.deleteManagedEndpoint(params,cb);
		}

		
		service.DeleteVirtualCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			

			svc.deleteVirtualCluster(params,cb);
		}

		
		service.DescribeJobRun=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			copyArg(n,"virtualClusterId",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			copyArg(msg,"virtualClusterId",params,undefined,false); 
			

			svc.describeJobRun(params,cb);
		}

		
		service.DescribeManagedEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			copyArg(n,"virtualClusterId",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			copyArg(msg,"virtualClusterId",params,undefined,false); 
			

			svc.describeManagedEndpoint(params,cb);
		}

		
		service.DescribeVirtualCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			

			svc.describeVirtualCluster(params,cb);
		}

		
		service.ListJobRuns=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"virtualClusterId",params,undefined,false); 
			
			copyArg(msg,"virtualClusterId",params,undefined,false); 
			copyArg(msg,"createdBefore",params,undefined,true); 
			copyArg(msg,"createdAfter",params,undefined,true); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"states",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listJobRuns(params,cb);
		}

		
		service.ListManagedEndpoints=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"virtualClusterId",params,undefined,false); 
			
			copyArg(msg,"virtualClusterId",params,undefined,false); 
			copyArg(msg,"createdBefore",params,undefined,true); 
			copyArg(msg,"createdAfter",params,undefined,true); 
			copyArg(msg,"types",params,undefined,false); 
			copyArg(msg,"states",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listManagedEndpoints(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListVirtualClusters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"containerProviderId",params,undefined,false); 
			copyArg(msg,"containerProviderType",params,undefined,false); 
			copyArg(msg,"createdAfter",params,undefined,true); 
			copyArg(msg,"createdBefore",params,undefined,true); 
			copyArg(msg,"states",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listVirtualClusters(params,cb);
		}

		
		service.StartJobRun=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"virtualClusterId",params,undefined,false); 
			copyArg(n,"clientToken",params,undefined,false); 
			copyArg(n,"executionRoleArn",params,undefined,false); 
			copyArg(n,"releaseLabel",params,undefined,false); 
			copyArg(n,"jobDriver",params,undefined,true); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"virtualClusterId",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"executionRoleArn",params,undefined,false); 
			copyArg(msg,"releaseLabel",params,undefined,false); 
			copyArg(msg,"jobDriver",params,undefined,true); 
			copyArg(msg,"configurationOverrides",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.startJobRun(params,cb);
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

		 

	}
	RED.nodes.registerType("AWS EMRcontainers", AmazonAPINode);

};
