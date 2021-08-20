
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

		var awsService = new AWS.S3Control( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.S3Control(msg.AWSConfig) : awsService;

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

		
		service.CreateAccessPoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"VpcConfiguration",params,undefined,true); 
			copyArg(msg,"PublicAccessBlockConfiguration",params,undefined,true); 
			

			svc.createAccessPoint(params,cb);
		}

		
		service.CreateAccessPointForObjectLambda=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Configuration",params,undefined,true); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Configuration",params,undefined,true); 
			

			svc.createAccessPointForObjectLambda(params,cb);
		}

		
		service.CreateBucket=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"ACL",params,undefined,false); 
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"CreateBucketConfiguration",params,undefined,false); 
			copyArg(msg,"GrantFullControl",params,undefined,false); 
			copyArg(msg,"GrantRead",params,undefined,false); 
			copyArg(msg,"GrantReadACP",params,undefined,false); 
			copyArg(msg,"GrantWrite",params,undefined,false); 
			copyArg(msg,"GrantWriteACP",params,undefined,false); 
			copyArg(msg,"ObjectLockEnabledForBucket",params,undefined,false); 
			copyArg(msg,"OutpostId",params,undefined,false); 
			

			svc.createBucket(params,cb);
		}

		
		service.CreateJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Operation",params,undefined,true); 
			copyArg(n,"Report",params,undefined,true); 
			copyArg(n,"ClientRequestToken",params,undefined,false); 
			copyArg(n,"Manifest",params,undefined,true); 
			copyArg(n,"Priority",params,undefined,false); 
			copyArg(n,"RoleArn",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"ConfirmationRequired",params,undefined,false); 
			copyArg(msg,"Operation",params,undefined,true); 
			copyArg(msg,"Report",params,undefined,true); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"Manifest",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Priority",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createJob(params,cb);
		}

		
		service.DeleteAccessPoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteAccessPoint(params,cb);
		}

		
		service.DeleteAccessPointForObjectLambda=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteAccessPointForObjectLambda(params,cb);
		}

		
		service.DeleteAccessPointPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteAccessPointPolicy(params,cb);
		}

		
		service.DeleteAccessPointPolicyForObjectLambda=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteAccessPointPolicyForObjectLambda(params,cb);
		}

		
		service.DeleteBucket=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Bucket",params,undefined,false); 
			

			svc.deleteBucket(params,cb);
		}

		
		service.DeleteBucketLifecycleConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Bucket",params,undefined,false); 
			

			svc.deleteBucketLifecycleConfiguration(params,cb);
		}

		
		service.DeleteBucketPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Bucket",params,undefined,false); 
			

			svc.deleteBucketPolicy(params,cb);
		}

		
		service.DeleteBucketTagging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Bucket",params,undefined,false); 
			

			svc.deleteBucketTagging(params,cb);
		}

		
		service.DeleteJobTagging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"JobId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"JobId",params,undefined,false); 
			

			svc.deleteJobTagging(params,cb);
		}

		
		service.DeletePublicAccessBlock=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			

			svc.deletePublicAccessBlock(params,cb);
		}

		
		service.DeleteStorageLensConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigId",params,undefined,false); 
			copyArg(n,"AccountId",params,undefined,false); 
			
			copyArg(msg,"ConfigId",params,undefined,false); 
			copyArg(msg,"AccountId",params,undefined,false); 
			

			svc.deleteStorageLensConfiguration(params,cb);
		}

		
		service.DeleteStorageLensConfigurationTagging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigId",params,undefined,false); 
			copyArg(n,"AccountId",params,undefined,false); 
			
			copyArg(msg,"ConfigId",params,undefined,false); 
			copyArg(msg,"AccountId",params,undefined,false); 
			

			svc.deleteStorageLensConfigurationTagging(params,cb);
		}

		
		service.DescribeJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"JobId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"JobId",params,undefined,false); 
			

			svc.describeJob(params,cb);
		}

		
		service.GetAccessPoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.getAccessPoint(params,cb);
		}

		
		service.GetAccessPointConfigurationForObjectLambda=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.getAccessPointConfigurationForObjectLambda(params,cb);
		}

		
		service.GetAccessPointForObjectLambda=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.getAccessPointForObjectLambda(params,cb);
		}

		
		service.GetAccessPointPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.getAccessPointPolicy(params,cb);
		}

		
		service.GetAccessPointPolicyForObjectLambda=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.getAccessPointPolicyForObjectLambda(params,cb);
		}

		
		service.GetAccessPointPolicyStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.getAccessPointPolicyStatus(params,cb);
		}

		
		service.GetAccessPointPolicyStatusForObjectLambda=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.getAccessPointPolicyStatusForObjectLambda(params,cb);
		}

		
		service.GetBucket=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Bucket",params,undefined,false); 
			

			svc.getBucket(params,cb);
		}

		
		service.GetBucketLifecycleConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Bucket",params,undefined,false); 
			

			svc.getBucketLifecycleConfiguration(params,cb);
		}

		
		service.GetBucketPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Bucket",params,undefined,false); 
			

			svc.getBucketPolicy(params,cb);
		}

		
		service.GetBucketTagging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Bucket",params,undefined,false); 
			

			svc.getBucketTagging(params,cb);
		}

		
		service.GetJobTagging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"JobId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"JobId",params,undefined,false); 
			

			svc.getJobTagging(params,cb);
		}

		
		service.GetPublicAccessBlock=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			

			svc.getPublicAccessBlock(params,cb);
		}

		
		service.GetStorageLensConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigId",params,undefined,false); 
			copyArg(n,"AccountId",params,undefined,false); 
			
			copyArg(msg,"ConfigId",params,undefined,false); 
			copyArg(msg,"AccountId",params,undefined,false); 
			

			svc.getStorageLensConfiguration(params,cb);
		}

		
		service.GetStorageLensConfigurationTagging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigId",params,undefined,false); 
			copyArg(n,"AccountId",params,undefined,false); 
			
			copyArg(msg,"ConfigId",params,undefined,false); 
			copyArg(msg,"AccountId",params,undefined,false); 
			

			svc.getStorageLensConfigurationTagging(params,cb);
		}

		
		service.ListAccessPoints=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listAccessPoints(params,cb);
		}

		
		service.ListAccessPointsForObjectLambda=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listAccessPointsForObjectLambda(params,cb);
		}

		
		service.ListJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"JobStatuses",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listJobs(params,cb);
		}

		
		service.ListRegionalBuckets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"OutpostId",params,undefined,false); 
			

			svc.listRegionalBuckets(params,cb);
		}

		
		service.ListStorageLensConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listStorageLensConfigurations(params,cb);
		}

		
		service.PutAccessPointConfigurationForObjectLambda=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Configuration",params,undefined,true); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Configuration",params,undefined,true); 
			

			svc.putAccessPointConfigurationForObjectLambda(params,cb);
		}

		
		service.PutAccessPointPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Policy",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Policy",params,undefined,false); 
			

			svc.putAccessPointPolicy(params,cb);
		}

		
		service.PutAccessPointPolicyForObjectLambda=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Policy",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Policy",params,undefined,false); 
			

			svc.putAccessPointPolicyForObjectLambda(params,cb);
		}

		
		service.PutBucketLifecycleConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"LifecycleConfiguration",params,undefined,false); 
			

			svc.putBucketLifecycleConfiguration(params,cb);
		}

		
		service.PutBucketPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Policy",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ConfirmRemoveSelfBucketAccess",params,undefined,false); 
			copyArg(msg,"Policy",params,undefined,false); 
			

			svc.putBucketPolicy(params,cb);
		}

		
		service.PutBucketTagging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Tagging",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Tagging",params,undefined,false); 
			

			svc.putBucketTagging(params,cb);
		}

		
		service.PutJobTagging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"JobId",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"JobId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.putJobTagging(params,cb);
		}

		
		service.PutPublicAccessBlock=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PublicAccessBlockConfiguration",params,undefined,true); 
			copyArg(n,"AccountId",params,undefined,false); 
			
			copyArg(msg,"PublicAccessBlockConfiguration",params,undefined,true); 
			copyArg(msg,"AccountId",params,undefined,false); 
			

			svc.putPublicAccessBlock(params,cb);
		}

		
		service.PutStorageLensConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigId",params,undefined,false); 
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"StorageLensConfiguration",params,undefined,true); 
			
			copyArg(msg,"ConfigId",params,undefined,false); 
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"StorageLensConfiguration",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.putStorageLensConfiguration(params,cb);
		}

		
		service.PutStorageLensConfigurationTagging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigId",params,undefined,false); 
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ConfigId",params,undefined,false); 
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.putStorageLensConfigurationTagging(params,cb);
		}

		
		service.UpdateJobPriority=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"JobId",params,undefined,false); 
			copyArg(n,"Priority",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"JobId",params,undefined,false); 
			copyArg(msg,"Priority",params,undefined,false); 
			

			svc.updateJobPriority(params,cb);
		}

		
		service.UpdateJobStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"JobId",params,undefined,false); 
			copyArg(n,"RequestedJobStatus",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"JobId",params,undefined,false); 
			copyArg(msg,"RequestedJobStatus",params,undefined,false); 
			copyArg(msg,"StatusUpdateReason",params,undefined,false); 
			

			svc.updateJobStatus(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS S3Control", AmazonAPINode);

};
