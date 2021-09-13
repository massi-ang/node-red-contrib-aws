
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

		var awsService = new AWS.Glacier( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Glacier(msg.AWSConfig) : awsService;

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
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			copyArgs(n,"uploadId",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			copyArgs(n,"uploadId",params,undefined,false); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"vaultName",params,undefined,false); 
			copyArgs(msg,"uploadId",params,undefined,false); 
			

			svc.abortMultipartUpload(params,cb);
		}
			service.AbortVaultLock=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"vaultName",params,undefined,false); 
			

			svc.abortVaultLock(params,cb);
		}
			service.AddTagsToVault=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"vaultName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.addTagsToVault(params,cb);
		}
			service.CompleteMultipartUpload=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			copyArgs(n,"uploadId",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			copyArgs(n,"uploadId",params,undefined,false); 
			copyArgs(n,"archiveSize",params,undefined,false); 
			copyArgs(n,"checksum",params,undefined,false); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"vaultName",params,undefined,false); 
			copyArgs(msg,"uploadId",params,undefined,false); 
			copyArgs(msg,"archiveSize",params,undefined,false); 
			copyArgs(msg,"checksum",params,undefined,false); 
			

			svc.completeMultipartUpload(params,cb);
		}
			service.CompleteVaultLock=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			copyArgs(n,"lockId",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			copyArgs(n,"lockId",params,undefined,false); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"vaultName",params,undefined,false); 
			copyArgs(msg,"lockId",params,undefined,false); 
			

			svc.completeVaultLock(params,cb);
		}
			service.CreateVault=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"vaultName",params,undefined,false); 
			

			svc.createVault(params,cb);
		}
			service.DeleteArchive=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			copyArgs(n,"archiveId",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			copyArgs(n,"archiveId",params,undefined,false); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"vaultName",params,undefined,false); 
			copyArgs(msg,"archiveId",params,undefined,false); 
			

			svc.deleteArchive(params,cb);
		}
			service.DeleteVault=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"vaultName",params,undefined,false); 
			

			svc.deleteVault(params,cb);
		}
			service.DeleteVaultAccessPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"vaultName",params,undefined,false); 
			

			svc.deleteVaultAccessPolicy(params,cb);
		}
			service.DeleteVaultNotifications=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"vaultName",params,undefined,false); 
			

			svc.deleteVaultNotifications(params,cb);
		}
			service.DescribeJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"vaultName",params,undefined,false); 
			copyArgs(msg,"jobId",params,undefined,false); 
			

			svc.describeJob(params,cb);
		}
			service.DescribeVault=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"vaultName",params,undefined,false); 
			

			svc.describeVault(params,cb);
		}
			service.GetDataRetrievalPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			

			svc.getDataRetrievalPolicy(params,cb);
		}
			service.GetJobOutput=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"range",params,undefined,false); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"vaultName",params,undefined,false); 
			copyArgs(msg,"jobId",params,undefined,false); 
			copyArgs(msg,"range",params,undefined,false); 
			

			svc.getJobOutput(params,cb);
		}
			service.GetVaultAccessPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"vaultName",params,undefined,false); 
			

			svc.getVaultAccessPolicy(params,cb);
		}
			service.GetVaultLock=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"vaultName",params,undefined,false); 
			

			svc.getVaultLock(params,cb);
		}
			service.GetVaultNotifications=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"vaultName",params,undefined,false); 
			

			svc.getVaultNotifications(params,cb);
		}
			service.InitiateJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			copyArgs(n,"jobParameters",params,undefined,false); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"vaultName",params,undefined,false); 
			copyArgs(msg,"jobParameters",params,undefined,false); 
			

			svc.initiateJob(params,cb);
		}
			service.InitiateMultipartUpload=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			copyArgs(n,"archiveDescription",params,undefined,false); 
			copyArgs(n,"partSize",params,undefined,false); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"vaultName",params,undefined,false); 
			copyArgs(msg,"archiveDescription",params,undefined,false); 
			copyArgs(msg,"partSize",params,undefined,false); 
			

			svc.initiateMultipartUpload(params,cb);
		}
			service.InitiateVaultLock=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			copyArgs(n,"policy",params,undefined,false); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"vaultName",params,undefined,false); 
			copyArgs(msg,"policy",params,undefined,false); 
			

			svc.initiateVaultLock(params,cb);
		}
			service.ListJobs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			copyArgs(n,"limit",params,undefined,false); 
			copyArgs(n,"marker",params,undefined,false); 
			copyArgs(n,"statuscode",params,undefined,false); 
			copyArgs(n,"completed",params,undefined,false); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"vaultName",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			copyArgs(msg,"marker",params,undefined,false); 
			copyArgs(msg,"statuscode",params,undefined,false); 
			copyArgs(msg,"completed",params,undefined,false); 
			

			svc.listJobs(params,cb);
		}
			service.ListMultipartUploads=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			copyArgs(n,"marker",params,undefined,false); 
			copyArgs(n,"limit",params,undefined,false); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"vaultName",params,undefined,false); 
			copyArgs(msg,"marker",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			

			svc.listMultipartUploads(params,cb);
		}
			service.ListParts=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			copyArgs(n,"uploadId",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			copyArgs(n,"uploadId",params,undefined,false); 
			copyArgs(n,"marker",params,undefined,false); 
			copyArgs(n,"limit",params,undefined,false); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"vaultName",params,undefined,false); 
			copyArgs(msg,"uploadId",params,undefined,false); 
			copyArgs(msg,"marker",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			

			svc.listParts(params,cb);
		}
			service.ListProvisionedCapacity=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			

			svc.listProvisionedCapacity(params,cb);
		}
			service.ListTagsForVault=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"vaultName",params,undefined,false); 
			

			svc.listTagsForVault(params,cb);
		}
			service.ListVaults=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"marker",params,undefined,false); 
			copyArgs(n,"limit",params,undefined,false); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"marker",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			

			svc.listVaults(params,cb);
		}
			service.PurchaseProvisionedCapacity=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			

			svc.purchaseProvisionedCapacity(params,cb);
		}
			service.RemoveTagsFromVault=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"vaultName",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.removeTagsFromVault(params,cb);
		}
			service.SetDataRetrievalPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,true); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"Policy",params,undefined,true); 
			

			svc.setDataRetrievalPolicy(params,cb);
		}
			service.SetVaultAccessPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			copyArgs(n,"policy",params,undefined,true); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"vaultName",params,undefined,false); 
			copyArgs(msg,"policy",params,undefined,true); 
			

			svc.setVaultAccessPolicy(params,cb);
		}
			service.SetVaultNotifications=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			copyArgs(n,"vaultNotificationConfig",params,undefined,true); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"vaultName",params,undefined,false); 
			copyArgs(msg,"vaultNotificationConfig",params,undefined,true); 
			

			svc.setVaultNotifications(params,cb);
		}
			service.UploadArchive=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"vaultName",params,undefined,false); 
			copyArgs(n,"accountId",params,undefined,false); 
			
			copyArgs(n,"vaultName",params,undefined,false); 
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"archiveDescription",params,undefined,false); 
			copyArgs(n,"checksum",params,undefined,false); 
			copyArgs(n,"body",params,undefined,true); 
			
			copyArgs(msg,"vaultName",params,undefined,false); 
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"archiveDescription",params,undefined,false); 
			copyArgs(msg,"checksum",params,undefined,false); 
			copyArgs(msg,"body",params,undefined,true); 
			

			svc.uploadArchive(params,cb);
		}
			service.UploadMultipartPart=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			copyArgs(n,"uploadId",params,undefined,false); 
			
			copyArgs(n,"accountId",params,undefined,false); 
			copyArgs(n,"vaultName",params,undefined,false); 
			copyArgs(n,"uploadId",params,undefined,false); 
			copyArgs(n,"checksum",params,undefined,false); 
			copyArgs(n,"range",params,undefined,false); 
			copyArgs(n,"body",params,undefined,true); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			copyArgs(msg,"vaultName",params,undefined,false); 
			copyArgs(msg,"uploadId",params,undefined,false); 
			copyArgs(msg,"checksum",params,undefined,false); 
			copyArgs(msg,"range",params,undefined,false); 
			copyArgs(msg,"body",params,undefined,true); 
			

			svc.uploadMultipartPart(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS Glacier", AmazonAPINode);

};
