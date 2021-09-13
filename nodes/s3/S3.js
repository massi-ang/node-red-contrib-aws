
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

		var awsService = new AWS.S3( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.S3(msg.AWSConfig) : awsService;

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
		
			service.AbortMultipartUpload=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(n,"UploadId",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(n,"UploadId",params,undefined,false); 
			copyArgs(n,"RequestPayer",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Key",params,undefined,false); 
			copyArgs(msg,"UploadId",params,undefined,false); 
			copyArgs(msg,"RequestPayer",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.abortMultipartUpload(params,cb);
		}
			service.CompleteMultipartUpload=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(n,"UploadId",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(n,"MultipartUpload",params,undefined,false); 
			copyArgs(n,"UploadId",params,undefined,false); 
			copyArgs(n,"RequestPayer",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Key",params,undefined,false); 
			copyArgs(msg,"MultipartUpload",params,undefined,false); 
			copyArgs(msg,"UploadId",params,undefined,false); 
			copyArgs(msg,"RequestPayer",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.completeMultipartUpload(params,cb);
		}
			service.CopyObject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"CopySource",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			
			copyArgs(n,"ACL",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"CacheControl",params,undefined,false); 
			copyArgs(n,"ContentDisposition",params,undefined,false); 
			copyArgs(n,"ContentEncoding",params,undefined,false); 
			copyArgs(n,"ContentLanguage",params,undefined,false); 
			copyArgs(n,"ContentType",params,undefined,false); 
			copyArgs(n,"CopySource",params,undefined,false); 
			copyArgs(n,"CopySourceIfMatch",params,undefined,false); 
			copyArgs(n,"CopySourceIfModifiedSince",params,undefined,false); 
			copyArgs(n,"CopySourceIfNoneMatch",params,undefined,false); 
			copyArgs(n,"CopySourceIfUnmodifiedSince",params,undefined,false); 
			copyArgs(n,"Expires",params,undefined,false); 
			copyArgs(n,"GrantFullControl",params,undefined,false); 
			copyArgs(n,"GrantRead",params,undefined,false); 
			copyArgs(n,"GrantReadACP",params,undefined,false); 
			copyArgs(n,"GrantWriteACP",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(n,"Metadata",params,undefined,true); 
			copyArgs(n,"MetadataDirective",params,undefined,false); 
			copyArgs(n,"TaggingDirective",params,undefined,false); 
			copyArgs(n,"ServerSideEncryption",params,undefined,false); 
			copyArgs(n,"StorageClass",params,undefined,false); 
			copyArgs(n,"WebsiteRedirectLocation",params,undefined,false); 
			copyArgs(n,"SSECustomerAlgorithm",params,undefined,false); 
			copyArgs(n,"SSECustomerKey",params,undefined,true); 
			copyArgs(n,"SSECustomerKeyMD5",params,undefined,false); 
			copyArgs(n,"SSEKMSKeyId",params,undefined,true); 
			copyArgs(n,"SSEKMSEncryptionContext",params,undefined,true); 
			copyArgs(Boolean(n),"BucketKeyEnabled",params,undefined,false); 
			copyArgs(n,"CopySourceSSECustomerAlgorithm",params,undefined,false); 
			copyArgs(n,"CopySourceSSECustomerKey",params,undefined,true); 
			copyArgs(n,"CopySourceSSECustomerKeyMD5",params,undefined,false); 
			copyArgs(n,"RequestPayer",params,undefined,false); 
			copyArgs(n,"Tagging",params,undefined,false); 
			copyArgs(n,"ObjectLockMode",params,undefined,false); 
			copyArgs(n,"ObjectLockRetainUntilDate",params,undefined,true); 
			copyArgs(n,"ObjectLockLegalHoldStatus",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			copyArgs(n,"ExpectedSourceBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"ACL",params,undefined,false); 
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"CacheControl",params,undefined,false); 
			copyArgs(msg,"ContentDisposition",params,undefined,false); 
			copyArgs(msg,"ContentEncoding",params,undefined,false); 
			copyArgs(msg,"ContentLanguage",params,undefined,false); 
			copyArgs(msg,"ContentType",params,undefined,false); 
			copyArgs(msg,"CopySource",params,undefined,false); 
			copyArgs(msg,"CopySourceIfMatch",params,undefined,false); 
			copyArgs(msg,"CopySourceIfModifiedSince",params,undefined,false); 
			copyArgs(msg,"CopySourceIfNoneMatch",params,undefined,false); 
			copyArgs(msg,"CopySourceIfUnmodifiedSince",params,undefined,false); 
			copyArgs(msg,"Expires",params,undefined,false); 
			copyArgs(msg,"GrantFullControl",params,undefined,false); 
			copyArgs(msg,"GrantRead",params,undefined,false); 
			copyArgs(msg,"GrantReadACP",params,undefined,false); 
			copyArgs(msg,"GrantWriteACP",params,undefined,false); 
			copyArgs(msg,"Key",params,undefined,false); 
			copyArgs(msg,"Metadata",params,undefined,true); 
			copyArgs(msg,"MetadataDirective",params,undefined,false); 
			copyArgs(msg,"TaggingDirective",params,undefined,false); 
			copyArgs(msg,"ServerSideEncryption",params,undefined,false); 
			copyArgs(msg,"StorageClass",params,undefined,false); 
			copyArgs(msg,"WebsiteRedirectLocation",params,undefined,false); 
			copyArgs(msg,"SSECustomerAlgorithm",params,undefined,false); 
			copyArgs(msg,"SSECustomerKey",params,undefined,true); 
			copyArgs(msg,"SSECustomerKeyMD5",params,undefined,false); 
			copyArgs(msg,"SSEKMSKeyId",params,undefined,true); 
			copyArgs(msg,"SSEKMSEncryptionContext",params,undefined,true); 
			copyArgs(msg,"BucketKeyEnabled",params,undefined,false); 
			copyArgs(msg,"CopySourceSSECustomerAlgorithm",params,undefined,false); 
			copyArgs(msg,"CopySourceSSECustomerKey",params,undefined,true); 
			copyArgs(msg,"CopySourceSSECustomerKeyMD5",params,undefined,false); 
			copyArgs(msg,"RequestPayer",params,undefined,false); 
			copyArgs(msg,"Tagging",params,undefined,false); 
			copyArgs(msg,"ObjectLockMode",params,undefined,false); 
			copyArgs(msg,"ObjectLockRetainUntilDate",params,undefined,true); 
			copyArgs(msg,"ObjectLockLegalHoldStatus",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			copyArgs(msg,"ExpectedSourceBucketOwner",params,undefined,false); 
			

			svc.copyObject(params,cb);
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
			
			copyArgs(msg,"ACL",params,undefined,false); 
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"CreateBucketConfiguration",params,undefined,false); 
			copyArgs(msg,"GrantFullControl",params,undefined,false); 
			copyArgs(msg,"GrantRead",params,undefined,false); 
			copyArgs(msg,"GrantReadACP",params,undefined,false); 
			copyArgs(msg,"GrantWrite",params,undefined,false); 
			copyArgs(msg,"GrantWriteACP",params,undefined,false); 
			copyArgs(msg,"ObjectLockEnabledForBucket",params,undefined,false); 
			

			svc.createBucket(params,cb);
		}
			service.CreateMultipartUpload=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			
			copyArgs(n,"ACL",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"CacheControl",params,undefined,false); 
			copyArgs(n,"ContentDisposition",params,undefined,false); 
			copyArgs(n,"ContentEncoding",params,undefined,false); 
			copyArgs(n,"ContentLanguage",params,undefined,false); 
			copyArgs(n,"ContentType",params,undefined,false); 
			copyArgs(n,"Expires",params,undefined,false); 
			copyArgs(n,"GrantFullControl",params,undefined,false); 
			copyArgs(n,"GrantRead",params,undefined,false); 
			copyArgs(n,"GrantReadACP",params,undefined,false); 
			copyArgs(n,"GrantWriteACP",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(n,"Metadata",params,undefined,true); 
			copyArgs(n,"ServerSideEncryption",params,undefined,false); 
			copyArgs(n,"StorageClass",params,undefined,false); 
			copyArgs(n,"WebsiteRedirectLocation",params,undefined,false); 
			copyArgs(n,"SSECustomerAlgorithm",params,undefined,false); 
			copyArgs(n,"SSECustomerKey",params,undefined,true); 
			copyArgs(n,"SSECustomerKeyMD5",params,undefined,false); 
			copyArgs(n,"SSEKMSKeyId",params,undefined,true); 
			copyArgs(n,"SSEKMSEncryptionContext",params,undefined,true); 
			copyArgs(Boolean(n),"BucketKeyEnabled",params,undefined,false); 
			copyArgs(n,"RequestPayer",params,undefined,false); 
			copyArgs(n,"Tagging",params,undefined,false); 
			copyArgs(n,"ObjectLockMode",params,undefined,false); 
			copyArgs(n,"ObjectLockRetainUntilDate",params,undefined,true); 
			copyArgs(n,"ObjectLockLegalHoldStatus",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"ACL",params,undefined,false); 
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"CacheControl",params,undefined,false); 
			copyArgs(msg,"ContentDisposition",params,undefined,false); 
			copyArgs(msg,"ContentEncoding",params,undefined,false); 
			copyArgs(msg,"ContentLanguage",params,undefined,false); 
			copyArgs(msg,"ContentType",params,undefined,false); 
			copyArgs(msg,"Expires",params,undefined,false); 
			copyArgs(msg,"GrantFullControl",params,undefined,false); 
			copyArgs(msg,"GrantRead",params,undefined,false); 
			copyArgs(msg,"GrantReadACP",params,undefined,false); 
			copyArgs(msg,"GrantWriteACP",params,undefined,false); 
			copyArgs(msg,"Key",params,undefined,false); 
			copyArgs(msg,"Metadata",params,undefined,true); 
			copyArgs(msg,"ServerSideEncryption",params,undefined,false); 
			copyArgs(msg,"StorageClass",params,undefined,false); 
			copyArgs(msg,"WebsiteRedirectLocation",params,undefined,false); 
			copyArgs(msg,"SSECustomerAlgorithm",params,undefined,false); 
			copyArgs(msg,"SSECustomerKey",params,undefined,true); 
			copyArgs(msg,"SSECustomerKeyMD5",params,undefined,false); 
			copyArgs(msg,"SSEKMSKeyId",params,undefined,true); 
			copyArgs(msg,"SSEKMSEncryptionContext",params,undefined,true); 
			copyArgs(msg,"BucketKeyEnabled",params,undefined,false); 
			copyArgs(msg,"RequestPayer",params,undefined,false); 
			copyArgs(msg,"Tagging",params,undefined,false); 
			copyArgs(msg,"ObjectLockMode",params,undefined,false); 
			copyArgs(msg,"ObjectLockRetainUntilDate",params,undefined,true); 
			copyArgs(msg,"ObjectLockLegalHoldStatus",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.createMultipartUpload(params,cb);
		}
			service.DeleteBucket=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteBucket(params,cb);
		}
			service.DeleteBucketAnalyticsConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteBucketAnalyticsConfiguration(params,cb);
		}
			service.DeleteBucketCors=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteBucketCors(params,cb);
		}
			service.DeleteBucketEncryption=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteBucketEncryption(params,cb);
		}
			service.DeleteBucketIntelligentTieringConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.deleteBucketIntelligentTieringConfiguration(params,cb);
		}
			service.DeleteBucketInventoryConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteBucketInventoryConfiguration(params,cb);
		}
			service.DeleteBucketLifecycle=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteBucketLifecycle(params,cb);
		}
			service.DeleteBucketMetricsConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteBucketMetricsConfiguration(params,cb);
		}
			service.DeleteBucketOwnershipControls=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteBucketOwnershipControls(params,cb);
		}
			service.DeleteBucketPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteBucketPolicy(params,cb);
		}
			service.DeleteBucketReplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteBucketReplication(params,cb);
		}
			service.DeleteBucketTagging=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteBucketTagging(params,cb);
		}
			service.DeleteBucketWebsite=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteBucketWebsite(params,cb);
		}
			service.DeleteObject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(n,"MFA",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			copyArgs(n,"RequestPayer",params,undefined,false); 
			copyArgs(Boolean(n),"BypassGovernanceRetention",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Key",params,undefined,false); 
			copyArgs(msg,"MFA",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			copyArgs(msg,"RequestPayer",params,undefined,false); 
			copyArgs(msg,"BypassGovernanceRetention",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteObject(params,cb);
		}
			service.DeleteObjectTagging=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Key",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteObjectTagging(params,cb);
		}
			service.DeleteObjects=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Delete",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Delete",params,undefined,false); 
			copyArgs(n,"MFA",params,undefined,false); 
			copyArgs(n,"RequestPayer",params,undefined,false); 
			copyArgs(Boolean(n),"BypassGovernanceRetention",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Delete",params,undefined,false); 
			copyArgs(msg,"MFA",params,undefined,false); 
			copyArgs(msg,"RequestPayer",params,undefined,false); 
			copyArgs(msg,"BypassGovernanceRetention",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteObjects(params,cb);
		}
			service.DeletePublicAccessBlock=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deletePublicAccessBlock(params,cb);
		}
			service.GetBucketAccelerateConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketAccelerateConfiguration(params,cb);
		}
			service.GetBucketAcl=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketAcl(params,cb);
		}
			service.GetBucketAnalyticsConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketAnalyticsConfiguration(params,cb);
		}
			service.GetBucketCors=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketCors(params,cb);
		}
			service.GetBucketEncryption=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketEncryption(params,cb);
		}
			service.GetBucketIntelligentTieringConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getBucketIntelligentTieringConfiguration(params,cb);
		}
			service.GetBucketInventoryConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketInventoryConfiguration(params,cb);
		}
			service.GetBucketLifecycle=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketLifecycle(params,cb);
		}
			service.GetBucketLifecycleConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketLifecycleConfiguration(params,cb);
		}
			service.GetBucketLocation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketLocation(params,cb);
		}
			service.GetBucketLogging=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketLogging(params,cb);
		}
			service.GetBucketMetricsConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketMetricsConfiguration(params,cb);
		}
			service.GetBucketNotification=function(svc,msg,cb){
			var params={};
			
			
			
			
			copyArgs(msg,"Bucket",params,undefined,true); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,true); 

			svc.getBucketNotification(params,cb);
		}
			service.GetBucketNotificationConfiguration=function(svc,msg,cb){
			var params={};
			
			
			
			
			copyArgs(msg,"Bucket",params,undefined,true); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,true); 

			svc.getBucketNotificationConfiguration(params,cb);
		}
			service.GetBucketOwnershipControls=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketOwnershipControls(params,cb);
		}
			service.GetBucketPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketPolicy(params,cb);
		}
			service.GetBucketPolicyStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketPolicyStatus(params,cb);
		}
			service.GetBucketReplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketReplication(params,cb);
		}
			service.GetBucketRequestPayment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketRequestPayment(params,cb);
		}
			service.GetBucketTagging=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketTagging(params,cb);
		}
			service.GetBucketVersioning=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketVersioning(params,cb);
		}
			service.GetBucketWebsite=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketWebsite(params,cb);
		}
			service.GetObject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"IfMatch",params,undefined,false); 
			copyArgs(n,"IfModifiedSince",params,undefined,false); 
			copyArgs(n,"IfNoneMatch",params,undefined,false); 
			copyArgs(n,"IfUnmodifiedSince",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(n,"Range",params,undefined,false); 
			copyArgs(n,"ResponseCacheControl",params,undefined,false); 
			copyArgs(n,"ResponseContentDisposition",params,undefined,false); 
			copyArgs(n,"ResponseContentEncoding",params,undefined,false); 
			copyArgs(n,"ResponseContentLanguage",params,undefined,false); 
			copyArgs(n,"ResponseContentType",params,undefined,false); 
			copyArgs(n,"ResponseExpires",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			copyArgs(n,"SSECustomerAlgorithm",params,undefined,false); 
			copyArgs(n,"SSECustomerKey",params,undefined,true); 
			copyArgs(n,"SSECustomerKeyMD5",params,undefined,false); 
			copyArgs(n,"RequestPayer",params,undefined,false); 
			copyArgs(Number(n),"PartNumber",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"IfMatch",params,undefined,false); 
			copyArgs(msg,"IfModifiedSince",params,undefined,false); 
			copyArgs(msg,"IfNoneMatch",params,undefined,false); 
			copyArgs(msg,"IfUnmodifiedSince",params,undefined,false); 
			copyArgs(msg,"Key",params,undefined,false); 
			copyArgs(msg,"Range",params,undefined,false); 
			copyArgs(msg,"ResponseCacheControl",params,undefined,false); 
			copyArgs(msg,"ResponseContentDisposition",params,undefined,false); 
			copyArgs(msg,"ResponseContentEncoding",params,undefined,false); 
			copyArgs(msg,"ResponseContentLanguage",params,undefined,false); 
			copyArgs(msg,"ResponseContentType",params,undefined,false); 
			copyArgs(msg,"ResponseExpires",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			copyArgs(msg,"SSECustomerAlgorithm",params,undefined,false); 
			copyArgs(msg,"SSECustomerKey",params,undefined,true); 
			copyArgs(msg,"SSECustomerKeyMD5",params,undefined,false); 
			copyArgs(msg,"RequestPayer",params,undefined,false); 
			copyArgs(msg,"PartNumber",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getObject(params,cb);
		}
			service.GetObjectAcl=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			copyArgs(n,"RequestPayer",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Key",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			copyArgs(msg,"RequestPayer",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getObjectAcl(params,cb);
		}
			service.GetObjectLegalHold=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			copyArgs(n,"RequestPayer",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Key",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			copyArgs(msg,"RequestPayer",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getObjectLegalHold(params,cb);
		}
			service.GetObjectLockConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getObjectLockConfiguration(params,cb);
		}
			service.GetObjectRetention=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			copyArgs(n,"RequestPayer",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Key",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			copyArgs(msg,"RequestPayer",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getObjectRetention(params,cb);
		}
			service.GetObjectTagging=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			copyArgs(n,"RequestPayer",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Key",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			copyArgs(msg,"RequestPayer",params,undefined,false); 
			

			svc.getObjectTagging(params,cb);
		}
			service.GetObjectTorrent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(n,"RequestPayer",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Key",params,undefined,false); 
			copyArgs(msg,"RequestPayer",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getObjectTorrent(params,cb);
		}
			service.GetPublicAccessBlock=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getPublicAccessBlock(params,cb);
		}
			service.HeadBucket=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.headBucket(params,cb);
		}
			service.HeadObject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"IfMatch",params,undefined,false); 
			copyArgs(n,"IfModifiedSince",params,undefined,false); 
			copyArgs(n,"IfNoneMatch",params,undefined,false); 
			copyArgs(n,"IfUnmodifiedSince",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(n,"Range",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			copyArgs(n,"SSECustomerAlgorithm",params,undefined,false); 
			copyArgs(n,"SSECustomerKey",params,undefined,true); 
			copyArgs(n,"SSECustomerKeyMD5",params,undefined,false); 
			copyArgs(n,"RequestPayer",params,undefined,false); 
			copyArgs(Number(n),"PartNumber",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"IfMatch",params,undefined,false); 
			copyArgs(msg,"IfModifiedSince",params,undefined,false); 
			copyArgs(msg,"IfNoneMatch",params,undefined,false); 
			copyArgs(msg,"IfUnmodifiedSince",params,undefined,false); 
			copyArgs(msg,"Key",params,undefined,false); 
			copyArgs(msg,"Range",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			copyArgs(msg,"SSECustomerAlgorithm",params,undefined,false); 
			copyArgs(msg,"SSECustomerKey",params,undefined,true); 
			copyArgs(msg,"SSECustomerKeyMD5",params,undefined,false); 
			copyArgs(msg,"RequestPayer",params,undefined,false); 
			copyArgs(msg,"PartNumber",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.headObject(params,cb);
		}
			service.ListBucketAnalyticsConfigurations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ContinuationToken",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ContinuationToken",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.listBucketAnalyticsConfigurations(params,cb);
		}
			service.ListBucketIntelligentTieringConfigurations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ContinuationToken",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ContinuationToken",params,undefined,false); 
			

			svc.listBucketIntelligentTieringConfigurations(params,cb);
		}
			service.ListBucketInventoryConfigurations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ContinuationToken",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ContinuationToken",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.listBucketInventoryConfigurations(params,cb);
		}
			service.ListBucketMetricsConfigurations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ContinuationToken",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ContinuationToken",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.listBucketMetricsConfigurations(params,cb);
		}
			service.ListBuckets=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.listBuckets(params,cb);
		}
			service.ListMultipartUploads=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Delimiter",params,undefined,false); 
			copyArgs(n,"EncodingType",params,undefined,false); 
			copyArgs(n,"KeyMarker",params,undefined,false); 
			copyArgs(Number(n),"MaxUploads",params,undefined,false); 
			copyArgs(n,"Prefix",params,undefined,false); 
			copyArgs(n,"UploadIdMarker",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Delimiter",params,undefined,false); 
			copyArgs(msg,"EncodingType",params,undefined,false); 
			copyArgs(msg,"KeyMarker",params,undefined,false); 
			copyArgs(msg,"MaxUploads",params,undefined,false); 
			copyArgs(msg,"Prefix",params,undefined,false); 
			copyArgs(msg,"UploadIdMarker",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.listMultipartUploads(params,cb);
		}
			service.ListObjectVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Delimiter",params,undefined,false); 
			copyArgs(n,"EncodingType",params,undefined,false); 
			copyArgs(n,"KeyMarker",params,undefined,false); 
			copyArgs(Number(n),"MaxKeys",params,undefined,false); 
			copyArgs(n,"Prefix",params,undefined,false); 
			copyArgs(n,"VersionIdMarker",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Delimiter",params,undefined,false); 
			copyArgs(msg,"EncodingType",params,undefined,false); 
			copyArgs(msg,"KeyMarker",params,undefined,false); 
			copyArgs(msg,"MaxKeys",params,undefined,false); 
			copyArgs(msg,"Prefix",params,undefined,false); 
			copyArgs(msg,"VersionIdMarker",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.listObjectVersions(params,cb);
		}
			service.ListObjects=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Delimiter",params,undefined,false); 
			copyArgs(n,"EncodingType",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(Number(n),"MaxKeys",params,undefined,false); 
			copyArgs(n,"Prefix",params,undefined,false); 
			copyArgs(n,"RequestPayer",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Delimiter",params,undefined,false); 
			copyArgs(msg,"EncodingType",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxKeys",params,undefined,false); 
			copyArgs(msg,"Prefix",params,undefined,false); 
			copyArgs(msg,"RequestPayer",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.listObjects(params,cb);
		}
			service.ListObjectsV2=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Delimiter",params,undefined,false); 
			copyArgs(n,"EncodingType",params,undefined,false); 
			copyArgs(Number(n),"MaxKeys",params,undefined,false); 
			copyArgs(n,"Prefix",params,undefined,false); 
			copyArgs(n,"ContinuationToken",params,undefined,false); 
			copyArgs(Boolean(n),"FetchOwner",params,undefined,false); 
			copyArgs(n,"StartAfter",params,undefined,false); 
			copyArgs(n,"RequestPayer",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Delimiter",params,undefined,false); 
			copyArgs(msg,"EncodingType",params,undefined,false); 
			copyArgs(msg,"MaxKeys",params,undefined,false); 
			copyArgs(msg,"Prefix",params,undefined,false); 
			copyArgs(msg,"ContinuationToken",params,undefined,false); 
			copyArgs(msg,"FetchOwner",params,undefined,false); 
			copyArgs(msg,"StartAfter",params,undefined,false); 
			copyArgs(msg,"RequestPayer",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.listObjectsV2(params,cb);
		}
			service.ListParts=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(n,"UploadId",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(Number(n),"MaxParts",params,undefined,false); 
			copyArgs(Number(n),"PartNumberMarker",params,undefined,false); 
			copyArgs(n,"UploadId",params,undefined,false); 
			copyArgs(n,"RequestPayer",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Key",params,undefined,false); 
			copyArgs(msg,"MaxParts",params,undefined,false); 
			copyArgs(msg,"PartNumberMarker",params,undefined,false); 
			copyArgs(msg,"UploadId",params,undefined,false); 
			copyArgs(msg,"RequestPayer",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.listParts(params,cb);
		}
			service.PutBucketAccelerateConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"AccelerateConfiguration",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"AccelerateConfiguration",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"AccelerateConfiguration",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketAccelerateConfiguration(params,cb);
		}
			service.PutBucketAcl=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"ACL",params,undefined,false); 
			copyArgs(n,"AccessControlPolicy",params,undefined,true); 
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ContentMD5",params,undefined,false); 
			copyArgs(n,"GrantFullControl",params,undefined,false); 
			copyArgs(n,"GrantRead",params,undefined,false); 
			copyArgs(n,"GrantReadACP",params,undefined,false); 
			copyArgs(n,"GrantWrite",params,undefined,false); 
			copyArgs(n,"GrantWriteACP",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"ACL",params,undefined,false); 
			copyArgs(msg,"AccessControlPolicy",params,undefined,true); 
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ContentMD5",params,undefined,false); 
			copyArgs(msg,"GrantFullControl",params,undefined,false); 
			copyArgs(msg,"GrantRead",params,undefined,false); 
			copyArgs(msg,"GrantReadACP",params,undefined,false); 
			copyArgs(msg,"GrantWrite",params,undefined,false); 
			copyArgs(msg,"GrantWriteACP",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketAcl(params,cb);
		}
			service.PutBucketAnalyticsConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"AnalyticsConfiguration",params,undefined,true); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"AnalyticsConfiguration",params,undefined,true); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"AnalyticsConfiguration",params,undefined,true); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketAnalyticsConfiguration(params,cb);
		}
			service.PutBucketCors=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"CORSConfiguration",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"CORSConfiguration",params,undefined,false); 
			copyArgs(n,"ContentMD5",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"CORSConfiguration",params,undefined,false); 
			copyArgs(msg,"ContentMD5",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketCors(params,cb);
		}
			service.PutBucketEncryption=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ServerSideEncryptionConfiguration",params,undefined,true); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ContentMD5",params,undefined,false); 
			copyArgs(n,"ServerSideEncryptionConfiguration",params,undefined,true); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ContentMD5",params,undefined,false); 
			copyArgs(msg,"ServerSideEncryptionConfiguration",params,undefined,true); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketEncryption(params,cb);
		}
			service.PutBucketIntelligentTieringConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IntelligentTieringConfiguration",params,undefined,true); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IntelligentTieringConfiguration",params,undefined,true); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IntelligentTieringConfiguration",params,undefined,true); 
			

			svc.putBucketIntelligentTieringConfiguration(params,cb);
		}
			service.PutBucketInventoryConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"InventoryConfiguration",params,undefined,true); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"InventoryConfiguration",params,undefined,true); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"InventoryConfiguration",params,undefined,true); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketInventoryConfiguration(params,cb);
		}
			service.PutBucketLifecycle=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ContentMD5",params,undefined,false); 
			copyArgs(n,"LifecycleConfiguration",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ContentMD5",params,undefined,false); 
			copyArgs(msg,"LifecycleConfiguration",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketLifecycle(params,cb);
		}
			service.PutBucketLifecycleConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"LifecycleConfiguration",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"LifecycleConfiguration",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketLifecycleConfiguration(params,cb);
		}
			service.PutBucketLogging=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"BucketLoggingStatus",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"BucketLoggingStatus",params,undefined,false); 
			copyArgs(n,"ContentMD5",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"BucketLoggingStatus",params,undefined,false); 
			copyArgs(msg,"ContentMD5",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketLogging(params,cb);
		}
			service.PutBucketMetricsConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"MetricsConfiguration",params,undefined,true); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"MetricsConfiguration",params,undefined,true); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"MetricsConfiguration",params,undefined,true); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketMetricsConfiguration(params,cb);
		}
			service.PutBucketNotification=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"NotificationConfiguration",params,undefined,true); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ContentMD5",params,undefined,false); 
			copyArgs(n,"NotificationConfiguration",params,undefined,true); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ContentMD5",params,undefined,false); 
			copyArgs(msg,"NotificationConfiguration",params,undefined,true); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketNotification(params,cb);
		}
			service.PutBucketNotificationConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"NotificationConfiguration",params,undefined,true); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"NotificationConfiguration",params,undefined,true); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"NotificationConfiguration",params,undefined,true); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketNotificationConfiguration(params,cb);
		}
			service.PutBucketOwnershipControls=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"OwnershipControls",params,undefined,true); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ContentMD5",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			copyArgs(n,"OwnershipControls",params,undefined,true); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ContentMD5",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			copyArgs(msg,"OwnershipControls",params,undefined,true); 
			

			svc.putBucketOwnershipControls(params,cb);
		}
			service.PutBucketPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ContentMD5",params,undefined,false); 
			copyArgs(Boolean(n),"ConfirmRemoveSelfBucketAccess",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ContentMD5",params,undefined,false); 
			copyArgs(msg,"ConfirmRemoveSelfBucketAccess",params,undefined,false); 
			copyArgs(msg,"Policy",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketPolicy(params,cb);
		}
			service.PutBucketReplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ReplicationConfiguration",params,undefined,true); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ContentMD5",params,undefined,false); 
			copyArgs(n,"ReplicationConfiguration",params,undefined,true); 
			copyArgs(n,"Token",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ContentMD5",params,undefined,false); 
			copyArgs(msg,"ReplicationConfiguration",params,undefined,true); 
			copyArgs(msg,"Token",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketReplication(params,cb);
		}
			service.PutBucketRequestPayment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"RequestPaymentConfiguration",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ContentMD5",params,undefined,false); 
			copyArgs(n,"RequestPaymentConfiguration",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ContentMD5",params,undefined,false); 
			copyArgs(msg,"RequestPaymentConfiguration",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketRequestPayment(params,cb);
		}
			service.PutBucketTagging=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Tagging",params,undefined,true); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ContentMD5",params,undefined,false); 
			copyArgs(n,"Tagging",params,undefined,true); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ContentMD5",params,undefined,false); 
			copyArgs(msg,"Tagging",params,undefined,true); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketTagging(params,cb);
		}
			service.PutBucketVersioning=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"VersioningConfiguration",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ContentMD5",params,undefined,false); 
			copyArgs(n,"MFA",params,undefined,false); 
			copyArgs(n,"VersioningConfiguration",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ContentMD5",params,undefined,false); 
			copyArgs(msg,"MFA",params,undefined,false); 
			copyArgs(msg,"VersioningConfiguration",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketVersioning(params,cb);
		}
			service.PutBucketWebsite=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"WebsiteConfiguration",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ContentMD5",params,undefined,false); 
			copyArgs(n,"WebsiteConfiguration",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ContentMD5",params,undefined,false); 
			copyArgs(msg,"WebsiteConfiguration",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketWebsite(params,cb);
		}
			service.PutObject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			
			copyArgs(n,"ACL",params,undefined,false); 
			copyArgs(Buffer.from(n),"Body",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"CacheControl",params,undefined,false); 
			copyArgs(n,"ContentDisposition",params,undefined,false); 
			copyArgs(n,"ContentEncoding",params,undefined,false); 
			copyArgs(n,"ContentLanguage",params,undefined,false); 
			copyArgs(n,"ContentLength",params,undefined,false); 
			copyArgs(n,"ContentMD5",params,undefined,false); 
			copyArgs(n,"ContentType",params,undefined,false); 
			copyArgs(n,"Expires",params,undefined,false); 
			copyArgs(n,"GrantFullControl",params,undefined,false); 
			copyArgs(n,"GrantRead",params,undefined,false); 
			copyArgs(n,"GrantReadACP",params,undefined,false); 
			copyArgs(n,"GrantWriteACP",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(n,"Metadata",params,undefined,true); 
			copyArgs(n,"ServerSideEncryption",params,undefined,false); 
			copyArgs(n,"StorageClass",params,undefined,false); 
			copyArgs(n,"WebsiteRedirectLocation",params,undefined,false); 
			copyArgs(n,"SSECustomerAlgorithm",params,undefined,false); 
			copyArgs(n,"SSECustomerKey",params,undefined,true); 
			copyArgs(n,"SSECustomerKeyMD5",params,undefined,false); 
			copyArgs(n,"SSEKMSKeyId",params,undefined,true); 
			copyArgs(n,"SSEKMSEncryptionContext",params,undefined,true); 
			copyArgs(Boolean(n),"BucketKeyEnabled",params,undefined,false); 
			copyArgs(n,"RequestPayer",params,undefined,false); 
			copyArgs(n,"Tagging",params,undefined,false); 
			copyArgs(n,"ObjectLockMode",params,undefined,false); 
			copyArgs(n,"ObjectLockRetainUntilDate",params,undefined,true); 
			copyArgs(n,"ObjectLockLegalHoldStatus",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"ACL",params,undefined,false); 
			copyArgs(msg,"Body",params,undefined,false); 
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"CacheControl",params,undefined,false); 
			copyArgs(msg,"ContentDisposition",params,undefined,false); 
			copyArgs(msg,"ContentEncoding",params,undefined,false); 
			copyArgs(msg,"ContentLanguage",params,undefined,false); 
			copyArgs(msg,"ContentLength",params,undefined,false); 
			copyArgs(msg,"ContentMD5",params,undefined,false); 
			copyArgs(msg,"ContentType",params,undefined,false); 
			copyArgs(msg,"Expires",params,undefined,false); 
			copyArgs(msg,"GrantFullControl",params,undefined,false); 
			copyArgs(msg,"GrantRead",params,undefined,false); 
			copyArgs(msg,"GrantReadACP",params,undefined,false); 
			copyArgs(msg,"GrantWriteACP",params,undefined,false); 
			copyArgs(msg,"Key",params,undefined,false); 
			copyArgs(msg,"Metadata",params,undefined,true); 
			copyArgs(msg,"ServerSideEncryption",params,undefined,false); 
			copyArgs(msg,"StorageClass",params,undefined,false); 
			copyArgs(msg,"WebsiteRedirectLocation",params,undefined,false); 
			copyArgs(msg,"SSECustomerAlgorithm",params,undefined,false); 
			copyArgs(msg,"SSECustomerKey",params,undefined,true); 
			copyArgs(msg,"SSECustomerKeyMD5",params,undefined,false); 
			copyArgs(msg,"SSEKMSKeyId",params,undefined,true); 
			copyArgs(msg,"SSEKMSEncryptionContext",params,undefined,true); 
			copyArgs(msg,"BucketKeyEnabled",params,undefined,false); 
			copyArgs(msg,"RequestPayer",params,undefined,false); 
			copyArgs(msg,"Tagging",params,undefined,false); 
			copyArgs(msg,"ObjectLockMode",params,undefined,false); 
			copyArgs(msg,"ObjectLockRetainUntilDate",params,undefined,true); 
			copyArgs(msg,"ObjectLockLegalHoldStatus",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putObject(params,cb);
		}
			service.PutObjectAcl=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			
			copyArgs(n,"ACL",params,undefined,false); 
			copyArgs(n,"AccessControlPolicy",params,undefined,true); 
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ContentMD5",params,undefined,false); 
			copyArgs(n,"GrantFullControl",params,undefined,false); 
			copyArgs(n,"GrantRead",params,undefined,false); 
			copyArgs(n,"GrantReadACP",params,undefined,false); 
			copyArgs(n,"GrantWrite",params,undefined,false); 
			copyArgs(n,"GrantWriteACP",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(n,"RequestPayer",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"ACL",params,undefined,false); 
			copyArgs(msg,"AccessControlPolicy",params,undefined,true); 
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ContentMD5",params,undefined,false); 
			copyArgs(msg,"GrantFullControl",params,undefined,false); 
			copyArgs(msg,"GrantRead",params,undefined,false); 
			copyArgs(msg,"GrantReadACP",params,undefined,false); 
			copyArgs(msg,"GrantWrite",params,undefined,false); 
			copyArgs(msg,"GrantWriteACP",params,undefined,false); 
			copyArgs(msg,"Key",params,undefined,false); 
			copyArgs(msg,"RequestPayer",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putObjectAcl(params,cb);
		}
			service.PutObjectLegalHold=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(n,"LegalHold",params,undefined,true); 
			copyArgs(n,"RequestPayer",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			copyArgs(n,"ContentMD5",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Key",params,undefined,false); 
			copyArgs(msg,"LegalHold",params,undefined,true); 
			copyArgs(msg,"RequestPayer",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			copyArgs(msg,"ContentMD5",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putObjectLegalHold(params,cb);
		}
			service.PutObjectLockConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ObjectLockConfiguration",params,undefined,true); 
			copyArgs(n,"RequestPayer",params,undefined,false); 
			copyArgs(n,"Token",params,undefined,false); 
			copyArgs(n,"ContentMD5",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ObjectLockConfiguration",params,undefined,true); 
			copyArgs(msg,"RequestPayer",params,undefined,false); 
			copyArgs(msg,"Token",params,undefined,false); 
			copyArgs(msg,"ContentMD5",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putObjectLockConfiguration(params,cb);
		}
			service.PutObjectRetention=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(n,"Retention",params,undefined,true); 
			copyArgs(n,"RequestPayer",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			copyArgs(Boolean(n),"BypassGovernanceRetention",params,undefined,false); 
			copyArgs(n,"ContentMD5",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Key",params,undefined,false); 
			copyArgs(msg,"Retention",params,undefined,true); 
			copyArgs(msg,"RequestPayer",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			copyArgs(msg,"BypassGovernanceRetention",params,undefined,false); 
			copyArgs(msg,"ContentMD5",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putObjectRetention(params,cb);
		}
			service.PutObjectTagging=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(n,"Tagging",params,undefined,true); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			copyArgs(n,"ContentMD5",params,undefined,false); 
			copyArgs(n,"Tagging",params,undefined,true); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			copyArgs(n,"RequestPayer",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Key",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			copyArgs(msg,"ContentMD5",params,undefined,false); 
			copyArgs(msg,"Tagging",params,undefined,true); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			copyArgs(msg,"RequestPayer",params,undefined,false); 
			

			svc.putObjectTagging(params,cb);
		}
			service.PutPublicAccessBlock=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"PublicAccessBlockConfiguration",params,undefined,true); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ContentMD5",params,undefined,false); 
			copyArgs(n,"PublicAccessBlockConfiguration",params,undefined,true); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ContentMD5",params,undefined,false); 
			copyArgs(msg,"PublicAccessBlockConfiguration",params,undefined,true); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putPublicAccessBlock(params,cb);
		}
			service.RestoreObject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			copyArgs(n,"RestoreRequest",params,undefined,false); 
			copyArgs(n,"RequestPayer",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Key",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			copyArgs(msg,"RestoreRequest",params,undefined,false); 
			copyArgs(msg,"RequestPayer",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.restoreObject(params,cb);
		}
			service.SelectObjectContent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(n,"Expression",params,undefined,false); 
			copyArgs(n,"ExpressionType",params,undefined,false); 
			copyArgs(n,"InputSerialization",params,undefined,true); 
			copyArgs(n,"OutputSerialization",params,undefined,true); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(n,"SSECustomerAlgorithm",params,undefined,false); 
			copyArgs(n,"SSECustomerKey",params,undefined,true); 
			copyArgs(n,"SSECustomerKeyMD5",params,undefined,false); 
			copyArgs(n,"Expression",params,undefined,false); 
			copyArgs(n,"ExpressionType",params,undefined,false); 
			copyArgs(n,"RequestProgress",params,undefined,false); 
			copyArgs(n,"InputSerialization",params,undefined,true); 
			copyArgs(n,"OutputSerialization",params,undefined,true); 
			copyArgs(n,"ScanRange",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"Key",params,undefined,false); 
			copyArgs(msg,"SSECustomerAlgorithm",params,undefined,false); 
			copyArgs(msg,"SSECustomerKey",params,undefined,true); 
			copyArgs(msg,"SSECustomerKeyMD5",params,undefined,false); 
			copyArgs(msg,"Expression",params,undefined,false); 
			copyArgs(msg,"ExpressionType",params,undefined,false); 
			copyArgs(msg,"RequestProgress",params,undefined,false); 
			copyArgs(msg,"InputSerialization",params,undefined,true); 
			copyArgs(msg,"OutputSerialization",params,undefined,true); 
			copyArgs(msg,"ScanRange",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.selectObjectContent(params,cb);
		}
			service.UploadPart=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(Number(n),"PartNumber",params,undefined,false); 
			copyArgs(n,"UploadId",params,undefined,false); 
			
			copyArgs(Buffer.from(n),"Body",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ContentLength",params,undefined,false); 
			copyArgs(n,"ContentMD5",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(Number(n),"PartNumber",params,undefined,false); 
			copyArgs(n,"UploadId",params,undefined,false); 
			copyArgs(n,"SSECustomerAlgorithm",params,undefined,false); 
			copyArgs(n,"SSECustomerKey",params,undefined,true); 
			copyArgs(n,"SSECustomerKeyMD5",params,undefined,false); 
			copyArgs(n,"RequestPayer",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Body",params,undefined,false); 
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ContentLength",params,undefined,false); 
			copyArgs(msg,"ContentMD5",params,undefined,false); 
			copyArgs(msg,"Key",params,undefined,false); 
			copyArgs(msg,"PartNumber",params,undefined,false); 
			copyArgs(msg,"UploadId",params,undefined,false); 
			copyArgs(msg,"SSECustomerAlgorithm",params,undefined,false); 
			copyArgs(msg,"SSECustomerKey",params,undefined,true); 
			copyArgs(msg,"SSECustomerKeyMD5",params,undefined,false); 
			copyArgs(msg,"RequestPayer",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.uploadPart(params,cb);
		}
			service.UploadPartCopy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"CopySource",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(Number(n),"PartNumber",params,undefined,false); 
			copyArgs(n,"UploadId",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"CopySource",params,undefined,false); 
			copyArgs(n,"CopySourceIfMatch",params,undefined,false); 
			copyArgs(n,"CopySourceIfModifiedSince",params,undefined,false); 
			copyArgs(n,"CopySourceIfNoneMatch",params,undefined,false); 
			copyArgs(n,"CopySourceIfUnmodifiedSince",params,undefined,false); 
			copyArgs(n,"CopySourceRange",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(Number(n),"PartNumber",params,undefined,false); 
			copyArgs(n,"UploadId",params,undefined,false); 
			copyArgs(n,"SSECustomerAlgorithm",params,undefined,false); 
			copyArgs(n,"SSECustomerKey",params,undefined,true); 
			copyArgs(n,"SSECustomerKeyMD5",params,undefined,false); 
			copyArgs(n,"CopySourceSSECustomerAlgorithm",params,undefined,false); 
			copyArgs(n,"CopySourceSSECustomerKey",params,undefined,true); 
			copyArgs(n,"CopySourceSSECustomerKeyMD5",params,undefined,false); 
			copyArgs(n,"RequestPayer",params,undefined,false); 
			copyArgs(n,"ExpectedBucketOwner",params,undefined,false); 
			copyArgs(n,"ExpectedSourceBucketOwner",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"CopySource",params,undefined,false); 
			copyArgs(msg,"CopySourceIfMatch",params,undefined,false); 
			copyArgs(msg,"CopySourceIfModifiedSince",params,undefined,false); 
			copyArgs(msg,"CopySourceIfNoneMatch",params,undefined,false); 
			copyArgs(msg,"CopySourceIfUnmodifiedSince",params,undefined,false); 
			copyArgs(msg,"CopySourceRange",params,undefined,false); 
			copyArgs(msg,"Key",params,undefined,false); 
			copyArgs(msg,"PartNumber",params,undefined,false); 
			copyArgs(msg,"UploadId",params,undefined,false); 
			copyArgs(msg,"SSECustomerAlgorithm",params,undefined,false); 
			copyArgs(msg,"SSECustomerKey",params,undefined,true); 
			copyArgs(msg,"SSECustomerKeyMD5",params,undefined,false); 
			copyArgs(msg,"CopySourceSSECustomerAlgorithm",params,undefined,false); 
			copyArgs(msg,"CopySourceSSECustomerKey",params,undefined,true); 
			copyArgs(msg,"CopySourceSSECustomerKeyMD5",params,undefined,false); 
			copyArgs(msg,"RequestPayer",params,undefined,false); 
			copyArgs(msg,"ExpectedBucketOwner",params,undefined,false); 
			copyArgs(msg,"ExpectedSourceBucketOwner",params,undefined,false); 
			

			svc.uploadPartCopy(params,cb);
		}
			service.WriteGetObjectResponse=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RequestRoute",params,undefined,false); 
			copyArgs(n,"RequestToken",params,undefined,false); 
			
			copyArgs(n,"RequestRoute",params,undefined,false); 
			copyArgs(n,"RequestToken",params,undefined,false); 
			copyArgs(Buffer.from(n),"Body",params,undefined,false); 
			copyArgs(Number(n),"StatusCode",params,undefined,false); 
			copyArgs(n,"ErrorCode",params,undefined,false); 
			copyArgs(n,"ErrorMessage",params,undefined,false); 
			copyArgs(n,"AcceptRanges",params,undefined,false); 
			copyArgs(n,"CacheControl",params,undefined,false); 
			copyArgs(n,"ContentDisposition",params,undefined,false); 
			copyArgs(n,"ContentEncoding",params,undefined,false); 
			copyArgs(n,"ContentLanguage",params,undefined,false); 
			copyArgs(n,"ContentLength",params,undefined,false); 
			copyArgs(n,"ContentRange",params,undefined,false); 
			copyArgs(n,"ContentType",params,undefined,false); 
			copyArgs(Boolean(n),"DeleteMarker",params,undefined,false); 
			copyArgs(n,"ETag",params,undefined,false); 
			copyArgs(n,"Expires",params,undefined,false); 
			copyArgs(n,"Expiration",params,undefined,false); 
			copyArgs(n,"LastModified",params,undefined,false); 
			copyArgs(Number(n),"MissingMeta",params,undefined,false); 
			copyArgs(n,"Metadata",params,undefined,true); 
			copyArgs(n,"ObjectLockMode",params,undefined,false); 
			copyArgs(n,"ObjectLockLegalHoldStatus",params,undefined,false); 
			copyArgs(n,"ObjectLockRetainUntilDate",params,undefined,true); 
			copyArgs(Number(n),"PartsCount",params,undefined,false); 
			copyArgs(n,"ReplicationStatus",params,undefined,false); 
			copyArgs(n,"RequestCharged",params,undefined,false); 
			copyArgs(n,"Restore",params,undefined,false); 
			copyArgs(n,"ServerSideEncryption",params,undefined,false); 
			copyArgs(n,"SSECustomerAlgorithm",params,undefined,false); 
			copyArgs(n,"SSEKMSKeyId",params,undefined,true); 
			copyArgs(n,"SSECustomerKeyMD5",params,undefined,false); 
			copyArgs(n,"StorageClass",params,undefined,false); 
			copyArgs(Number(n),"TagCount",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			copyArgs(Boolean(n),"BucketKeyEnabled",params,undefined,false); 
			
			copyArgs(msg,"RequestRoute",params,undefined,false); 
			copyArgs(msg,"RequestToken",params,undefined,false); 
			copyArgs(msg,"Body",params,undefined,false); 
			copyArgs(msg,"StatusCode",params,undefined,false); 
			copyArgs(msg,"ErrorCode",params,undefined,false); 
			copyArgs(msg,"ErrorMessage",params,undefined,false); 
			copyArgs(msg,"AcceptRanges",params,undefined,false); 
			copyArgs(msg,"CacheControl",params,undefined,false); 
			copyArgs(msg,"ContentDisposition",params,undefined,false); 
			copyArgs(msg,"ContentEncoding",params,undefined,false); 
			copyArgs(msg,"ContentLanguage",params,undefined,false); 
			copyArgs(msg,"ContentLength",params,undefined,false); 
			copyArgs(msg,"ContentRange",params,undefined,false); 
			copyArgs(msg,"ContentType",params,undefined,false); 
			copyArgs(msg,"DeleteMarker",params,undefined,false); 
			copyArgs(msg,"ETag",params,undefined,false); 
			copyArgs(msg,"Expires",params,undefined,false); 
			copyArgs(msg,"Expiration",params,undefined,false); 
			copyArgs(msg,"LastModified",params,undefined,false); 
			copyArgs(msg,"MissingMeta",params,undefined,false); 
			copyArgs(msg,"Metadata",params,undefined,true); 
			copyArgs(msg,"ObjectLockMode",params,undefined,false); 
			copyArgs(msg,"ObjectLockLegalHoldStatus",params,undefined,false); 
			copyArgs(msg,"ObjectLockRetainUntilDate",params,undefined,true); 
			copyArgs(msg,"PartsCount",params,undefined,false); 
			copyArgs(msg,"ReplicationStatus",params,undefined,false); 
			copyArgs(msg,"RequestCharged",params,undefined,false); 
			copyArgs(msg,"Restore",params,undefined,false); 
			copyArgs(msg,"ServerSideEncryption",params,undefined,false); 
			copyArgs(msg,"SSECustomerAlgorithm",params,undefined,false); 
			copyArgs(msg,"SSEKMSKeyId",params,undefined,true); 
			copyArgs(msg,"SSECustomerKeyMD5",params,undefined,false); 
			copyArgs(msg,"StorageClass",params,undefined,false); 
			copyArgs(msg,"TagCount",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			copyArgs(msg,"BucketKeyEnabled",params,undefined,false); 
			

			svc.writeGetObjectResponse(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS S3", AmazonAPINode);

};
