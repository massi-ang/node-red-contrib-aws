
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

		var awsService = new AWS.ECR( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.ECR(msg.AWSConfig) : awsService;

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

		
		service.BatchCheckLayerAvailability=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"layerDigests",params,undefined,false); 
			
			copyArg(msg,"registryId",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"layerDigests",params,undefined,false); 
			

			svc.batchCheckLayerAvailability(params,cb);
		}

		
		service.BatchDeleteImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"imageIds",params,undefined,true); 
			
			copyArg(msg,"registryId",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"imageIds",params,undefined,true); 
			

			svc.batchDeleteImage(params,cb);
		}

		
		service.BatchGetImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"imageIds",params,undefined,true); 
			
			copyArg(msg,"registryId",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"imageIds",params,undefined,true); 
			copyArg(msg,"acceptedMediaTypes",params,undefined,false); 
			

			svc.batchGetImage(params,cb);
		}

		
		service.CompleteLayerUpload=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"uploadId",params,undefined,false); 
			copyArg(n,"layerDigests",params,undefined,false); 
			
			copyArg(msg,"registryId",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"uploadId",params,undefined,false); 
			copyArg(msg,"layerDigests",params,undefined,false); 
			

			svc.completeLayerUpload(params,cb);
		}

		
		service.CreateRepository=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"imageTagMutability",params,undefined,false); 
			copyArg(msg,"imageScanningConfiguration",params,undefined,true); 
			copyArg(msg,"encryptionConfiguration",params,undefined,true); 
			

			svc.createRepository(params,cb);
		}

		
		service.DeleteLifecyclePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			
			copyArg(msg,"registryId",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			

			svc.deleteLifecyclePolicy(params,cb);
		}

		
		service.DeleteRegistryPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.deleteRegistryPolicy(params,cb);
		}

		
		service.DeleteRepository=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			
			copyArg(msg,"registryId",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"force",params,undefined,false); 
			

			svc.deleteRepository(params,cb);
		}

		
		service.DeleteRepositoryPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			
			copyArg(msg,"registryId",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			

			svc.deleteRepositoryPolicy(params,cb);
		}

		
		service.DescribeImageScanFindings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"imageId",params,undefined,true); 
			
			copyArg(msg,"registryId",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"imageId",params,undefined,true); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.describeImageScanFindings(params,cb);
		}

		
		service.DescribeImages=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			
			copyArg(msg,"registryId",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"imageIds",params,undefined,true); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"filter",params,undefined,false); 
			

			svc.describeImages(params,cb);
		}

		
		service.DescribeRegistry=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeRegistry(params,cb);
		}

		
		service.DescribeRepositories=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"registryId",params,undefined,false); 
			copyArg(msg,"repositoryNames",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.describeRepositories(params,cb);
		}

		
		service.GetAuthorizationToken=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"registryIds",params,undefined,false); 
			

			svc.getAuthorizationToken(params,cb);
		}

		
		service.GetDownloadUrlForLayer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"layerDigest",params,undefined,false); 
			
			copyArg(msg,"registryId",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"layerDigest",params,undefined,false); 
			

			svc.getDownloadUrlForLayer(params,cb);
		}

		
		service.GetLifecyclePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			
			copyArg(msg,"registryId",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			

			svc.getLifecyclePolicy(params,cb);
		}

		
		service.GetLifecyclePolicyPreview=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			
			copyArg(msg,"registryId",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"imageIds",params,undefined,true); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"filter",params,undefined,false); 
			

			svc.getLifecyclePolicyPreview(params,cb);
		}

		
		service.GetRegistryPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getRegistryPolicy(params,cb);
		}

		
		service.GetRepositoryPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			
			copyArg(msg,"registryId",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			

			svc.getRepositoryPolicy(params,cb);
		}

		
		service.InitiateLayerUpload=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			
			copyArg(msg,"registryId",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			

			svc.initiateLayerUpload(params,cb);
		}

		
		service.ListImages=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			
			copyArg(msg,"registryId",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"filter",params,undefined,false); 
			

			svc.listImages(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"imageManifest",params,undefined,false); 
			
			copyArg(msg,"registryId",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"imageManifest",params,undefined,false); 
			copyArg(msg,"imageManifestMediaType",params,undefined,false); 
			copyArg(msg,"imageTag",params,undefined,false); 
			copyArg(msg,"imageDigest",params,undefined,false); 
			

			svc.putImage(params,cb);
		}

		
		service.PutImageScanningConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"imageScanningConfiguration",params,undefined,true); 
			
			copyArg(msg,"registryId",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"imageScanningConfiguration",params,undefined,true); 
			

			svc.putImageScanningConfiguration(params,cb);
		}

		
		service.PutImageTagMutability=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"imageTagMutability",params,undefined,false); 
			
			copyArg(msg,"registryId",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"imageTagMutability",params,undefined,false); 
			

			svc.putImageTagMutability(params,cb);
		}

		
		service.PutLifecyclePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"lifecyclePolicyText",params,undefined,false); 
			
			copyArg(msg,"registryId",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"lifecyclePolicyText",params,undefined,false); 
			

			svc.putLifecyclePolicy(params,cb);
		}

		
		service.PutRegistryPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyText",params,undefined,false); 
			
			copyArg(msg,"policyText",params,undefined,false); 
			

			svc.putRegistryPolicy(params,cb);
		}

		
		service.PutReplicationConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"replicationConfiguration",params,undefined,true); 
			
			copyArg(msg,"replicationConfiguration",params,undefined,true); 
			

			svc.putReplicationConfiguration(params,cb);
		}

		
		service.SetRepositoryPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"policyText",params,undefined,false); 
			
			copyArg(msg,"registryId",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"policyText",params,undefined,false); 
			copyArg(msg,"force",params,undefined,false); 
			

			svc.setRepositoryPolicy(params,cb);
		}

		
		service.StartImageScan=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"imageId",params,undefined,true); 
			
			copyArg(msg,"registryId",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"imageId",params,undefined,true); 
			

			svc.startImageScan(params,cb);
		}

		
		service.StartLifecyclePolicyPreview=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			
			copyArg(msg,"registryId",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"lifecyclePolicyText",params,undefined,false); 
			

			svc.startLifecyclePolicyPreview(params,cb);
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

		
		service.UploadLayerPart=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"repositoryName",params,undefined,false); 
			copyArg(n,"uploadId",params,undefined,false); 
			copyArg(n,"partFirstByte",params,undefined,false); 
			copyArg(n,"partLastByte",params,undefined,false); 
			copyArg(n,"layerPartBlob",params,undefined,false); 
			
			copyArg(msg,"registryId",params,undefined,false); 
			copyArg(msg,"repositoryName",params,undefined,false); 
			copyArg(msg,"uploadId",params,undefined,false); 
			copyArg(msg,"partFirstByte",params,undefined,false); 
			copyArg(msg,"partLastByte",params,undefined,false); 
			copyArg(msg,"layerPartBlob",params,undefined,false); 
			

			svc.uploadLayerPart(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS ECR", AmazonAPINode);

};
