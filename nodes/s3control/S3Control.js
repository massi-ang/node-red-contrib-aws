
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

		var awsService = new AWS.S3Control( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.S3Control(msg.AWSConfig) : awsService;

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
		
			service.CreateAccessPoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"VpcConfiguration",params,undefined,true); 
			copyArgs(n,"PublicAccessBlockConfiguration",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"VpcConfiguration",params,undefined,true); 
			copyArgs(msg,"PublicAccessBlockConfiguration",params,undefined,true); 
			

			svc.createAccessPoint(params,cb);
		}
			service.CreateAccessPointForObjectLambda=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Configuration",params,undefined,true); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Configuration",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Configuration",params,undefined,true); 
			

			svc.createAccessPointForObjectLambda(params,cb);
		}
			service.CreateBucket=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"ACL",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"CreateBucketConfiguration",params,undefined,false); 
			copyArgs(n,"GrantFullControl",params,undefined,false); 
			copyArgs(n,"GrantRead",params,undefined,false); 
			copyArgs(n,"GrantReadACP",params,undefined,false); 
			copyArgs(n,"GrantWrite",params,undefined,false); 
			copyArgs(n,"GrantWriteACP",params,undefined,false); 
			copyArgs(Boolean(n),"ObjectLockEnabledForBucket",params,undefined,false); 
			copyArgs(n,"OutpostId",params,undefined,false); 
			
			copyArgs(msg,"ACL",params,undefined,false); 
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"CreateBucketConfiguration",params,undefined,false); 
			copyArgs(msg,"GrantFullControl",params,undefined,false); 
			copyArgs(msg,"GrantRead",params,undefined,false); 
			copyArgs(msg,"GrantReadACP",params,undefined,false); 
			copyArgs(msg,"GrantWrite",params,undefined,false); 
			copyArgs(msg,"GrantWriteACP",params,undefined,false); 
			copyArgs(msg,"ObjectLockEnabledForBucket",params,undefined,false); 
			copyArgs(msg,"OutpostId",params,undefined,false); 
			

			svc.createBucket(params,cb);
		}
			service.CreateJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Operation",params,undefined,true); 
			copyArgs(n,"Report",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"Manifest",params,undefined,true); 
			copyArgs(Number(n),"Priority",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(Boolean(n),"ConfirmationRequired",params,undefined,false); 
			copyArgs(n,"Operation",params,undefined,true); 
			copyArgs(n,"Report",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"Manifest",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(Number(n),"Priority",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"ConfirmationRequired",params,undefined,false); 
			copyArgs(msg,"Operation",params,undefined,true); 
			copyArgs(msg,"Report",params,undefined,true); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"Manifest",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Priority",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createJob(params,cb);
		}
			service.CreateMultiRegionAccessPoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Details",params,undefined,true); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Details",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"Details",params,undefined,true); 
			

			svc.createMultiRegionAccessPoint(params,cb);
		}
			service.DeleteAccessPoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteAccessPoint(params,cb);
		}
			service.DeleteAccessPointForObjectLambda=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteAccessPointForObjectLambda(params,cb);
		}
			service.DeleteAccessPointPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteAccessPointPolicy(params,cb);
		}
			service.DeleteAccessPointPolicyForObjectLambda=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteAccessPointPolicyForObjectLambda(params,cb);
		}
			service.DeleteBucket=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Bucket",params,undefined,false); 
			

			svc.deleteBucket(params,cb);
		}
			service.DeleteBucketLifecycleConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Bucket",params,undefined,false); 
			

			svc.deleteBucketLifecycleConfiguration(params,cb);
		}
			service.DeleteBucketPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Bucket",params,undefined,false); 
			

			svc.deleteBucketPolicy(params,cb);
		}
			service.DeleteBucketTagging=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Bucket",params,undefined,false); 
			

			svc.deleteBucketTagging(params,cb);
		}
			service.DeleteJobTagging=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.deleteJobTagging(params,cb);
		}
			service.DeleteMultiRegionAccessPoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Details",params,undefined,true); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Details",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"Details",params,undefined,true); 
			

			svc.deleteMultiRegionAccessPoint(params,cb);
		}
			service.DeletePublicAccessBlock=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			

			svc.deletePublicAccessBlock(params,cb);
		}
			service.DeleteStorageLensConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigId",params,undefined,false); 
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"ConfigId",params,undefined,false); 
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(msg,"ConfigId",params,undefined,false); 
			copyArgs(msg,"AccountId",params,undefined,false); 
			

			svc.deleteStorageLensConfiguration(params,cb);
		}
			service.DeleteStorageLensConfigurationTagging=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigId",params,undefined,false); 
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"ConfigId",params,undefined,false); 
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(msg,"ConfigId",params,undefined,false); 
			copyArgs(msg,"AccountId",params,undefined,false); 
			

			svc.deleteStorageLensConfigurationTagging(params,cb);
		}
			service.DescribeJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.describeJob(params,cb);
		}
			service.DescribeMultiRegionAccessPointOperation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"RequestTokenARN",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"RequestTokenARN",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"RequestTokenARN",params,undefined,false); 
			

			svc.describeMultiRegionAccessPointOperation(params,cb);
		}
			service.GetAccessPoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getAccessPoint(params,cb);
		}
			service.GetAccessPointConfigurationForObjectLambda=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getAccessPointConfigurationForObjectLambda(params,cb);
		}
			service.GetAccessPointForObjectLambda=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getAccessPointForObjectLambda(params,cb);
		}
			service.GetAccessPointPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getAccessPointPolicy(params,cb);
		}
			service.GetAccessPointPolicyForObjectLambda=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getAccessPointPolicyForObjectLambda(params,cb);
		}
			service.GetAccessPointPolicyStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getAccessPointPolicyStatus(params,cb);
		}
			service.GetAccessPointPolicyStatusForObjectLambda=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getAccessPointPolicyStatusForObjectLambda(params,cb);
		}
			service.GetBucket=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Bucket",params,undefined,false); 
			

			svc.getBucket(params,cb);
		}
			service.GetBucketLifecycleConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Bucket",params,undefined,false); 
			

			svc.getBucketLifecycleConfiguration(params,cb);
		}
			service.GetBucketPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Bucket",params,undefined,false); 
			

			svc.getBucketPolicy(params,cb);
		}
			service.GetBucketTagging=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Bucket",params,undefined,false); 
			

			svc.getBucketTagging(params,cb);
		}
			service.GetJobTagging=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.getJobTagging(params,cb);
		}
			service.GetMultiRegionAccessPoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getMultiRegionAccessPoint(params,cb);
		}
			service.GetMultiRegionAccessPointPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getMultiRegionAccessPointPolicy(params,cb);
		}
			service.GetMultiRegionAccessPointPolicyStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getMultiRegionAccessPointPolicyStatus(params,cb);
		}
			service.GetPublicAccessBlock=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			

			svc.getPublicAccessBlock(params,cb);
		}
			service.GetStorageLensConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigId",params,undefined,false); 
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"ConfigId",params,undefined,false); 
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(msg,"ConfigId",params,undefined,false); 
			copyArgs(msg,"AccountId",params,undefined,false); 
			

			svc.getStorageLensConfiguration(params,cb);
		}
			service.GetStorageLensConfigurationTagging=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigId",params,undefined,false); 
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"ConfigId",params,undefined,false); 
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(msg,"ConfigId",params,undefined,false); 
			copyArgs(msg,"AccountId",params,undefined,false); 
			

			svc.getStorageLensConfigurationTagging(params,cb);
		}
			service.ListAccessPoints=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listAccessPoints(params,cb);
		}
			service.ListAccessPointsForObjectLambda=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listAccessPointsForObjectLambda(params,cb);
		}
			service.ListJobs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"JobStatuses",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"JobStatuses",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listJobs(params,cb);
		}
			service.ListMultiRegionAccessPoints=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listMultiRegionAccessPoints(params,cb);
		}
			service.ListRegionalBuckets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"OutpostId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"OutpostId",params,undefined,false); 
			

			svc.listRegionalBuckets(params,cb);
		}
			service.ListStorageLensConfigurations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listStorageLensConfigurations(params,cb);
		}
			service.PutAccessPointConfigurationForObjectLambda=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Configuration",params,undefined,true); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Configuration",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Configuration",params,undefined,true); 
			

			svc.putAccessPointConfigurationForObjectLambda(params,cb);
		}
			service.PutAccessPointPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Policy",params,undefined,false); 
			

			svc.putAccessPointPolicy(params,cb);
		}
			service.PutAccessPointPolicyForObjectLambda=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Policy",params,undefined,false); 
			

			svc.putAccessPointPolicyForObjectLambda(params,cb);
		}
			service.PutBucketLifecycleConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"LifecycleConfiguration",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"LifecycleConfiguration",params,undefined,false); 
			

			svc.putBucketLifecycleConfiguration(params,cb);
		}
			service.PutBucketPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(Boolean(n),"ConfirmRemoveSelfBucketAccess",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ConfirmRemoveSelfBucketAccess",params,undefined,false); 
			copyArgs(msg,"Policy",params,undefined,false); 
			

			svc.putBucketPolicy(params,cb);
		}
			service.PutBucketTagging=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Tagging",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Tagging",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Tagging",params,undefined,false); 
			

			svc.putBucketTagging(params,cb);
		}
			service.PutJobTagging=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"JobId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.putJobTagging(params,cb);
		}
			service.PutMultiRegionAccessPointPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Details",params,undefined,true); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Details",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"Details",params,undefined,true); 
			

			svc.putMultiRegionAccessPointPolicy(params,cb);
		}
			service.PutPublicAccessBlock=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PublicAccessBlockConfiguration",params,undefined,true); 
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"PublicAccessBlockConfiguration",params,undefined,true); 
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(msg,"PublicAccessBlockConfiguration",params,undefined,true); 
			copyArgs(msg,"AccountId",params,undefined,false); 
			

			svc.putPublicAccessBlock(params,cb);
		}
			service.PutStorageLensConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigId",params,undefined,false); 
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"StorageLensConfiguration",params,undefined,true); 
			
			copyArgs(n,"ConfigId",params,undefined,false); 
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"StorageLensConfiguration",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ConfigId",params,undefined,false); 
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"StorageLensConfiguration",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.putStorageLensConfiguration(params,cb);
		}
			service.PutStorageLensConfigurationTagging=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigId",params,undefined,false); 
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ConfigId",params,undefined,false); 
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ConfigId",params,undefined,false); 
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.putStorageLensConfigurationTagging(params,cb);
		}
			service.UpdateJobPriority=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(Number(n),"Priority",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(Number(n),"Priority",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"JobId",params,undefined,false); 
			copyArgs(msg,"Priority",params,undefined,false); 
			

			svc.updateJobPriority(params,cb);
		}
			service.UpdateJobStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(n,"RequestedJobStatus",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(n,"RequestedJobStatus",params,undefined,false); 
			copyArgs(n,"StatusUpdateReason",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"JobId",params,undefined,false); 
			copyArgs(msg,"RequestedJobStatus",params,undefined,false); 
			copyArgs(msg,"StatusUpdateReason",params,undefined,false); 
			

			svc.updateJobStatus(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS S3Control", AmazonAPINode);

};
