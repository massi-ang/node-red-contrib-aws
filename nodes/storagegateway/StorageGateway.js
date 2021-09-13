
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

		var awsService = new AWS.StorageGateway( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.StorageGateway(msg.AWSConfig) : awsService;

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
		
			service.ActivateGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ActivationKey",params,undefined,false); 
			copyArgs(n,"GatewayName",params,undefined,false); 
			copyArgs(n,"GatewayTimezone",params,undefined,false); 
			copyArgs(n,"GatewayRegion",params,undefined,false); 
			
			copyArgs(n,"ActivationKey",params,undefined,false); 
			copyArgs(n,"GatewayName",params,undefined,false); 
			copyArgs(n,"GatewayTimezone",params,undefined,false); 
			copyArgs(n,"GatewayRegion",params,undefined,false); 
			copyArgs(n,"GatewayType",params,undefined,false); 
			copyArgs(n,"TapeDriveType",params,undefined,false); 
			copyArgs(n,"MediumChangerType",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ActivationKey",params,undefined,false); 
			copyArgs(msg,"GatewayName",params,undefined,false); 
			copyArgs(msg,"GatewayTimezone",params,undefined,false); 
			copyArgs(msg,"GatewayRegion",params,undefined,false); 
			copyArgs(msg,"GatewayType",params,undefined,false); 
			copyArgs(msg,"TapeDriveType",params,undefined,false); 
			copyArgs(msg,"MediumChangerType",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.activateGateway(params,cb);
		}
			service.AddCache=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"DiskIds",params,undefined,true); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"DiskIds",params,undefined,true); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"DiskIds",params,undefined,true); 
			

			svc.addCache(params,cb);
		}
			service.AddTagsToResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.addTagsToResource(params,cb);
		}
			service.AddUploadBuffer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"DiskIds",params,undefined,true); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"DiskIds",params,undefined,true); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"DiskIds",params,undefined,true); 
			

			svc.addUploadBuffer(params,cb);
		}
			service.AddWorkingStorage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"DiskIds",params,undefined,true); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"DiskIds",params,undefined,true); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"DiskIds",params,undefined,true); 
			

			svc.addWorkingStorage(params,cb);
		}
			service.AssignTapePool=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TapeARN",params,undefined,false); 
			copyArgs(n,"PoolId",params,undefined,false); 
			
			copyArgs(n,"TapeARN",params,undefined,false); 
			copyArgs(n,"PoolId",params,undefined,false); 
			copyArgs(Boolean(n),"BypassGovernanceRetention",params,undefined,false); 
			
			copyArgs(msg,"TapeARN",params,undefined,false); 
			copyArgs(msg,"PoolId",params,undefined,false); 
			copyArgs(msg,"BypassGovernanceRetention",params,undefined,false); 
			

			svc.assignTapePool(params,cb);
		}
			service.AssociateFileSystem=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"LocationARN",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"LocationARN",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"AuditDestinationARN",params,undefined,false); 
			copyArgs(n,"CacheAttributes",params,undefined,true); 
			copyArgs(n,"EndpointNetworkConfiguration",params,undefined,true); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"Password",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"LocationARN",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"AuditDestinationARN",params,undefined,false); 
			copyArgs(msg,"CacheAttributes",params,undefined,true); 
			copyArgs(msg,"EndpointNetworkConfiguration",params,undefined,true); 
			

			svc.associateFileSystem(params,cb);
		}
			service.AttachVolume=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"VolumeARN",params,undefined,false); 
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"TargetName",params,undefined,false); 
			copyArgs(n,"VolumeARN",params,undefined,false); 
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(n,"DiskId",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"TargetName",params,undefined,false); 
			copyArgs(msg,"VolumeARN",params,undefined,false); 
			copyArgs(msg,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(msg,"DiskId",params,undefined,false); 
			

			svc.attachVolume(params,cb);
		}
			service.CancelArchival=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"TapeARN",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"TapeARN",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"TapeARN",params,undefined,false); 
			

			svc.cancelArchival(params,cb);
		}
			service.CancelRetrieval=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"TapeARN",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"TapeARN",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"TapeARN",params,undefined,false); 
			

			svc.cancelRetrieval(params,cb);
		}
			service.CreateCachediSCSIVolume=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"VolumeSizeInBytes",params,undefined,false); 
			copyArgs(n,"TargetName",params,undefined,false); 
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"VolumeSizeInBytes",params,undefined,false); 
			copyArgs(n,"SnapshotId",params,undefined,false); 
			copyArgs(n,"TargetName",params,undefined,false); 
			copyArgs(n,"SourceVolumeARN",params,undefined,false); 
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(Boolean(n),"KMSEncrypted",params,undefined,false); 
			copyArgs(n,"KMSKey",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"VolumeSizeInBytes",params,undefined,false); 
			copyArgs(msg,"SnapshotId",params,undefined,false); 
			copyArgs(msg,"TargetName",params,undefined,false); 
			copyArgs(msg,"SourceVolumeARN",params,undefined,false); 
			copyArgs(msg,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"KMSEncrypted",params,undefined,false); 
			copyArgs(msg,"KMSKey",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createCachediSCSIVolume(params,cb);
		}
			service.CreateNFSFileShare=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"Role",params,undefined,false); 
			copyArgs(n,"LocationARN",params,undefined,false); 
			
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"NFSFileShareDefaults",params,undefined,true); 
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(Boolean(n),"KMSEncrypted",params,undefined,false); 
			copyArgs(n,"KMSKey",params,undefined,false); 
			copyArgs(n,"Role",params,undefined,false); 
			copyArgs(n,"LocationARN",params,undefined,false); 
			copyArgs(n,"DefaultStorageClass",params,undefined,false); 
			copyArgs(n,"ObjectACL",params,undefined,false); 
			copyArgs(n,"ClientList",params,undefined,true); 
			copyArgs(n,"Squash",params,undefined,false); 
			copyArgs(Boolean(n),"ReadOnly",params,undefined,false); 
			copyArgs(Boolean(n),"GuessMIMETypeEnabled",params,undefined,false); 
			copyArgs(Boolean(n),"RequesterPays",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"FileShareName",params,undefined,false); 
			copyArgs(n,"CacheAttributes",params,undefined,true); 
			copyArgs(n,"NotificationPolicy",params,undefined,false); 
			copyArgs(n,"VPCEndpointDNSName",params,undefined,false); 
			copyArgs(n,"BucketRegion",params,undefined,false); 
			
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"NFSFileShareDefaults",params,undefined,true); 
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"KMSEncrypted",params,undefined,false); 
			copyArgs(msg,"KMSKey",params,undefined,false); 
			copyArgs(msg,"Role",params,undefined,false); 
			copyArgs(msg,"LocationARN",params,undefined,false); 
			copyArgs(msg,"DefaultStorageClass",params,undefined,false); 
			copyArgs(msg,"ObjectACL",params,undefined,false); 
			copyArgs(msg,"ClientList",params,undefined,true); 
			copyArgs(msg,"Squash",params,undefined,false); 
			copyArgs(msg,"ReadOnly",params,undefined,false); 
			copyArgs(msg,"GuessMIMETypeEnabled",params,undefined,false); 
			copyArgs(msg,"RequesterPays",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"FileShareName",params,undefined,false); 
			copyArgs(msg,"CacheAttributes",params,undefined,true); 
			copyArgs(msg,"NotificationPolicy",params,undefined,false); 
			copyArgs(msg,"VPCEndpointDNSName",params,undefined,false); 
			copyArgs(msg,"BucketRegion",params,undefined,false); 
			

			svc.createNFSFileShare(params,cb);
		}
			service.CreateSMBFileShare=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"Role",params,undefined,false); 
			copyArgs(n,"LocationARN",params,undefined,false); 
			
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(Boolean(n),"KMSEncrypted",params,undefined,false); 
			copyArgs(n,"KMSKey",params,undefined,false); 
			copyArgs(n,"Role",params,undefined,false); 
			copyArgs(n,"LocationARN",params,undefined,false); 
			copyArgs(n,"DefaultStorageClass",params,undefined,false); 
			copyArgs(n,"ObjectACL",params,undefined,false); 
			copyArgs(Boolean(n),"ReadOnly",params,undefined,false); 
			copyArgs(Boolean(n),"GuessMIMETypeEnabled",params,undefined,false); 
			copyArgs(Boolean(n),"RequesterPays",params,undefined,false); 
			copyArgs(Boolean(n),"SMBACLEnabled",params,undefined,false); 
			copyArgs(Boolean(n),"AccessBasedEnumeration",params,undefined,false); 
			copyArgs(n,"AdminUserList",params,undefined,true); 
			copyArgs(n,"ValidUserList",params,undefined,true); 
			copyArgs(n,"InvalidUserList",params,undefined,true); 
			copyArgs(n,"AuditDestinationARN",params,undefined,false); 
			copyArgs(n,"Authentication",params,undefined,false); 
			copyArgs(n,"CaseSensitivity",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"FileShareName",params,undefined,false); 
			copyArgs(n,"CacheAttributes",params,undefined,true); 
			copyArgs(n,"NotificationPolicy",params,undefined,false); 
			copyArgs(n,"VPCEndpointDNSName",params,undefined,false); 
			copyArgs(n,"BucketRegion",params,undefined,false); 
			copyArgs(Boolean(n),"OplocksEnabled",params,undefined,false); 
			
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"KMSEncrypted",params,undefined,false); 
			copyArgs(msg,"KMSKey",params,undefined,false); 
			copyArgs(msg,"Role",params,undefined,false); 
			copyArgs(msg,"LocationARN",params,undefined,false); 
			copyArgs(msg,"DefaultStorageClass",params,undefined,false); 
			copyArgs(msg,"ObjectACL",params,undefined,false); 
			copyArgs(msg,"ReadOnly",params,undefined,false); 
			copyArgs(msg,"GuessMIMETypeEnabled",params,undefined,false); 
			copyArgs(msg,"RequesterPays",params,undefined,false); 
			copyArgs(msg,"SMBACLEnabled",params,undefined,false); 
			copyArgs(msg,"AccessBasedEnumeration",params,undefined,false); 
			copyArgs(msg,"AdminUserList",params,undefined,true); 
			copyArgs(msg,"ValidUserList",params,undefined,true); 
			copyArgs(msg,"InvalidUserList",params,undefined,true); 
			copyArgs(msg,"AuditDestinationARN",params,undefined,false); 
			copyArgs(msg,"Authentication",params,undefined,false); 
			copyArgs(msg,"CaseSensitivity",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"FileShareName",params,undefined,false); 
			copyArgs(msg,"CacheAttributes",params,undefined,true); 
			copyArgs(msg,"NotificationPolicy",params,undefined,false); 
			copyArgs(msg,"VPCEndpointDNSName",params,undefined,false); 
			copyArgs(msg,"BucketRegion",params,undefined,false); 
			copyArgs(msg,"OplocksEnabled",params,undefined,false); 
			

			svc.createSMBFileShare(params,cb);
		}
			service.CreateSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VolumeARN",params,undefined,false); 
			copyArgs(n,"SnapshotDescription",params,undefined,false); 
			
			copyArgs(n,"VolumeARN",params,undefined,false); 
			copyArgs(n,"SnapshotDescription",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"VolumeARN",params,undefined,false); 
			copyArgs(msg,"SnapshotDescription",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createSnapshot(params,cb);
		}
			service.CreateSnapshotFromVolumeRecoveryPoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VolumeARN",params,undefined,false); 
			copyArgs(n,"SnapshotDescription",params,undefined,false); 
			
			copyArgs(n,"VolumeARN",params,undefined,false); 
			copyArgs(n,"SnapshotDescription",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"VolumeARN",params,undefined,false); 
			copyArgs(msg,"SnapshotDescription",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createSnapshotFromVolumeRecoveryPoint(params,cb);
		}
			service.CreateStorediSCSIVolume=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"DiskId",params,undefined,false); 
			copyArgs(Boolean(n),"PreserveExistingData",params,undefined,false); 
			copyArgs(n,"TargetName",params,undefined,false); 
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"DiskId",params,undefined,false); 
			copyArgs(n,"SnapshotId",params,undefined,false); 
			copyArgs(Boolean(n),"PreserveExistingData",params,undefined,false); 
			copyArgs(n,"TargetName",params,undefined,false); 
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(Boolean(n),"KMSEncrypted",params,undefined,false); 
			copyArgs(n,"KMSKey",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"DiskId",params,undefined,false); 
			copyArgs(msg,"SnapshotId",params,undefined,false); 
			copyArgs(msg,"PreserveExistingData",params,undefined,false); 
			copyArgs(msg,"TargetName",params,undefined,false); 
			copyArgs(msg,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(msg,"KMSEncrypted",params,undefined,false); 
			copyArgs(msg,"KMSKey",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createStorediSCSIVolume(params,cb);
		}
			service.CreateTapePool=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PoolName",params,undefined,false); 
			copyArgs(n,"StorageClass",params,undefined,false); 
			
			copyArgs(n,"PoolName",params,undefined,false); 
			copyArgs(n,"StorageClass",params,undefined,false); 
			copyArgs(n,"RetentionLockType",params,undefined,false); 
			copyArgs(Number(n),"RetentionLockTimeInDays",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"PoolName",params,undefined,false); 
			copyArgs(msg,"StorageClass",params,undefined,false); 
			copyArgs(msg,"RetentionLockType",params,undefined,false); 
			copyArgs(msg,"RetentionLockTimeInDays",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createTapePool(params,cb);
		}
			service.CreateTapeWithBarcode=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"TapeSizeInBytes",params,undefined,false); 
			copyArgs(n,"TapeBarcode",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"TapeSizeInBytes",params,undefined,false); 
			copyArgs(n,"TapeBarcode",params,undefined,false); 
			copyArgs(Boolean(n),"KMSEncrypted",params,undefined,false); 
			copyArgs(n,"KMSKey",params,undefined,false); 
			copyArgs(n,"PoolId",params,undefined,false); 
			copyArgs(Boolean(n),"Worm",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"TapeSizeInBytes",params,undefined,false); 
			copyArgs(msg,"TapeBarcode",params,undefined,false); 
			copyArgs(msg,"KMSEncrypted",params,undefined,false); 
			copyArgs(msg,"KMSKey",params,undefined,false); 
			copyArgs(msg,"PoolId",params,undefined,false); 
			copyArgs(msg,"Worm",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createTapeWithBarcode(params,cb);
		}
			service.CreateTapes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"TapeSizeInBytes",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(Number(n),"NumTapesToCreate",params,undefined,false); 
			copyArgs(n,"TapeBarcodePrefix",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"TapeSizeInBytes",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(Number(n),"NumTapesToCreate",params,undefined,false); 
			copyArgs(n,"TapeBarcodePrefix",params,undefined,false); 
			copyArgs(Boolean(n),"KMSEncrypted",params,undefined,false); 
			copyArgs(n,"KMSKey",params,undefined,false); 
			copyArgs(n,"PoolId",params,undefined,false); 
			copyArgs(Boolean(n),"Worm",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"TapeSizeInBytes",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"NumTapesToCreate",params,undefined,false); 
			copyArgs(msg,"TapeBarcodePrefix",params,undefined,false); 
			copyArgs(msg,"KMSEncrypted",params,undefined,false); 
			copyArgs(msg,"KMSKey",params,undefined,false); 
			copyArgs(msg,"PoolId",params,undefined,false); 
			copyArgs(msg,"Worm",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createTapes(params,cb);
		}
			service.DeleteAutomaticTapeCreationPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			

			svc.deleteAutomaticTapeCreationPolicy(params,cb);
		}
			service.DeleteBandwidthRateLimit=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"BandwidthType",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"BandwidthType",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"BandwidthType",params,undefined,false); 
			

			svc.deleteBandwidthRateLimit(params,cb);
		}
			service.DeleteChapCredentials=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TargetARN",params,undefined,false); 
			copyArgs(n,"InitiatorName",params,undefined,false); 
			
			copyArgs(n,"TargetARN",params,undefined,false); 
			copyArgs(n,"InitiatorName",params,undefined,false); 
			
			copyArgs(msg,"TargetARN",params,undefined,false); 
			copyArgs(msg,"InitiatorName",params,undefined,false); 
			

			svc.deleteChapCredentials(params,cb);
		}
			service.DeleteFileShare=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileShareARN",params,undefined,false); 
			
			copyArgs(n,"FileShareARN",params,undefined,false); 
			copyArgs(Boolean(n),"ForceDelete",params,undefined,false); 
			
			copyArgs(msg,"FileShareARN",params,undefined,false); 
			copyArgs(msg,"ForceDelete",params,undefined,false); 
			

			svc.deleteFileShare(params,cb);
		}
			service.DeleteGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			

			svc.deleteGateway(params,cb);
		}
			service.DeleteSnapshotSchedule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VolumeARN",params,undefined,false); 
			
			copyArgs(n,"VolumeARN",params,undefined,false); 
			
			copyArgs(msg,"VolumeARN",params,undefined,false); 
			

			svc.deleteSnapshotSchedule(params,cb);
		}
			service.DeleteTape=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"TapeARN",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"TapeARN",params,undefined,false); 
			copyArgs(Boolean(n),"BypassGovernanceRetention",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"TapeARN",params,undefined,false); 
			copyArgs(msg,"BypassGovernanceRetention",params,undefined,false); 
			

			svc.deleteTape(params,cb);
		}
			service.DeleteTapeArchive=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TapeARN",params,undefined,false); 
			
			copyArgs(n,"TapeARN",params,undefined,false); 
			copyArgs(Boolean(n),"BypassGovernanceRetention",params,undefined,false); 
			
			copyArgs(msg,"TapeARN",params,undefined,false); 
			copyArgs(msg,"BypassGovernanceRetention",params,undefined,false); 
			

			svc.deleteTapeArchive(params,cb);
		}
			service.DeleteTapePool=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PoolARN",params,undefined,false); 
			
			copyArgs(n,"PoolARN",params,undefined,false); 
			
			copyArgs(msg,"PoolARN",params,undefined,false); 
			

			svc.deleteTapePool(params,cb);
		}
			service.DeleteVolume=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VolumeARN",params,undefined,false); 
			
			copyArgs(n,"VolumeARN",params,undefined,false); 
			
			copyArgs(msg,"VolumeARN",params,undefined,false); 
			

			svc.deleteVolume(params,cb);
		}
			service.DescribeAvailabilityMonitorTest=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			

			svc.describeAvailabilityMonitorTest(params,cb);
		}
			service.DescribeBandwidthRateLimit=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			

			svc.describeBandwidthRateLimit(params,cb);
		}
			service.DescribeBandwidthRateLimitSchedule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			

			svc.describeBandwidthRateLimitSchedule(params,cb);
		}
			service.DescribeCache=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			

			svc.describeCache(params,cb);
		}
			service.DescribeCachediSCSIVolumes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VolumeARNs",params,undefined,true); 
			
			copyArgs(n,"VolumeARNs",params,undefined,true); 
			
			copyArgs(msg,"VolumeARNs",params,undefined,true); 
			

			svc.describeCachediSCSIVolumes(params,cb);
		}
			service.DescribeChapCredentials=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TargetARN",params,undefined,false); 
			
			copyArgs(n,"TargetARN",params,undefined,false); 
			
			copyArgs(msg,"TargetARN",params,undefined,false); 
			

			svc.describeChapCredentials(params,cb);
		}
			service.DescribeFileSystemAssociations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileSystemAssociationARNList",params,undefined,false); 
			
			copyArgs(n,"FileSystemAssociationARNList",params,undefined,false); 
			
			copyArgs(msg,"FileSystemAssociationARNList",params,undefined,false); 
			

			svc.describeFileSystemAssociations(params,cb);
		}
			service.DescribeGatewayInformation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			

			svc.describeGatewayInformation(params,cb);
		}
			service.DescribeMaintenanceStartTime=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			

			svc.describeMaintenanceStartTime(params,cb);
		}
			service.DescribeNFSFileShares=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileShareARNList",params,undefined,true); 
			
			copyArgs(n,"FileShareARNList",params,undefined,true); 
			
			copyArgs(msg,"FileShareARNList",params,undefined,true); 
			

			svc.describeNFSFileShares(params,cb);
		}
			service.DescribeSMBFileShares=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileShareARNList",params,undefined,true); 
			
			copyArgs(n,"FileShareARNList",params,undefined,true); 
			
			copyArgs(msg,"FileShareARNList",params,undefined,true); 
			

			svc.describeSMBFileShares(params,cb);
		}
			service.DescribeSMBSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			

			svc.describeSMBSettings(params,cb);
		}
			service.DescribeSnapshotSchedule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VolumeARN",params,undefined,false); 
			
			copyArgs(n,"VolumeARN",params,undefined,false); 
			
			copyArgs(msg,"VolumeARN",params,undefined,false); 
			

			svc.describeSnapshotSchedule(params,cb);
		}
			service.DescribeStorediSCSIVolumes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VolumeARNs",params,undefined,true); 
			
			copyArgs(n,"VolumeARNs",params,undefined,true); 
			
			copyArgs(msg,"VolumeARNs",params,undefined,true); 
			

			svc.describeStorediSCSIVolumes(params,cb);
		}
			service.DescribeTapeArchives=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TapeARNs",params,undefined,true); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"TapeARNs",params,undefined,true); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.describeTapeArchives(params,cb);
		}
			service.DescribeTapeRecoveryPoints=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.describeTapeRecoveryPoints(params,cb);
		}
			service.DescribeTapes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"TapeARNs",params,undefined,true); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"TapeARNs",params,undefined,true); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.describeTapes(params,cb);
		}
			service.DescribeUploadBuffer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			

			svc.describeUploadBuffer(params,cb);
		}
			service.DescribeVTLDevices=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"VTLDeviceARNs",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"VTLDeviceARNs",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.describeVTLDevices(params,cb);
		}
			service.DescribeWorkingStorage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			

			svc.describeWorkingStorage(params,cb);
		}
			service.DetachVolume=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VolumeARN",params,undefined,false); 
			
			copyArgs(n,"VolumeARN",params,undefined,false); 
			copyArgs(Boolean(n),"ForceDetach",params,undefined,false); 
			
			copyArgs(msg,"VolumeARN",params,undefined,false); 
			copyArgs(msg,"ForceDetach",params,undefined,false); 
			

			svc.detachVolume(params,cb);
		}
			service.DisableGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			

			svc.disableGateway(params,cb);
		}
			service.DisassociateFileSystem=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileSystemAssociationARN",params,undefined,false); 
			
			copyArgs(n,"FileSystemAssociationARN",params,undefined,false); 
			copyArgs(Boolean(n),"ForceDelete",params,undefined,false); 
			
			copyArgs(msg,"FileSystemAssociationARN",params,undefined,false); 
			copyArgs(msg,"ForceDelete",params,undefined,false); 
			

			svc.disassociateFileSystem(params,cb);
		}
			service.JoinDomain=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,true); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"OrganizationalUnit",params,undefined,false); 
			copyArgs(n,"DomainControllers",params,undefined,false); 
			copyArgs(Number(n),"TimeoutInSeconds",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,true); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"OrganizationalUnit",params,undefined,false); 
			copyArgs(msg,"DomainControllers",params,undefined,false); 
			copyArgs(msg,"TimeoutInSeconds",params,undefined,false); 
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"Password",params,undefined,true); 
			

			svc.joinDomain(params,cb);
		}
			service.ListAutomaticTapeCreationPolicies=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			

			svc.listAutomaticTapeCreationPolicies(params,cb);
		}
			service.ListFileShares=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.listFileShares(params,cb);
		}
			service.ListFileSystemAssociations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.listFileSystemAssociations(params,cb);
		}
			service.ListGateways=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listGateways(params,cb);
		}
			service.ListLocalDisks=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			

			svc.listLocalDisks(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.ListTapePools=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"PoolARNs",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"PoolARNs",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listTapePools(params,cb);
		}
			service.ListTapes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TapeARNs",params,undefined,true); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"TapeARNs",params,undefined,true); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listTapes(params,cb);
		}
			service.ListVolumeInitiators=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VolumeARN",params,undefined,false); 
			
			copyArgs(n,"VolumeARN",params,undefined,false); 
			
			copyArgs(msg,"VolumeARN",params,undefined,false); 
			

			svc.listVolumeInitiators(params,cb);
		}
			service.ListVolumeRecoveryPoints=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			

			svc.listVolumeRecoveryPoints(params,cb);
		}
			service.ListVolumes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listVolumes(params,cb);
		}
			service.NotifyWhenUploaded=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileShareARN",params,undefined,false); 
			
			copyArgs(n,"FileShareARN",params,undefined,false); 
			
			copyArgs(msg,"FileShareARN",params,undefined,false); 
			

			svc.notifyWhenUploaded(params,cb);
		}
			service.RefreshCache=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileShareARN",params,undefined,false); 
			
			copyArgs(n,"FileShareARN",params,undefined,false); 
			copyArgs(n,"FolderList",params,undefined,false); 
			copyArgs(Boolean(n),"Recursive",params,undefined,false); 
			
			copyArgs(msg,"FileShareARN",params,undefined,false); 
			copyArgs(msg,"FolderList",params,undefined,false); 
			copyArgs(msg,"Recursive",params,undefined,false); 
			

			svc.refreshCache(params,cb);
		}
			service.RemoveTagsFromResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.removeTagsFromResource(params,cb);
		}
			service.ResetCache=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			

			svc.resetCache(params,cb);
		}
			service.RetrieveTapeArchive=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TapeARN",params,undefined,false); 
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(n,"TapeARN",params,undefined,false); 
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(msg,"TapeARN",params,undefined,false); 
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			

			svc.retrieveTapeArchive(params,cb);
		}
			service.RetrieveTapeRecoveryPoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TapeARN",params,undefined,false); 
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(n,"TapeARN",params,undefined,false); 
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(msg,"TapeARN",params,undefined,false); 
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			

			svc.retrieveTapeRecoveryPoint(params,cb);
		}
			service.SetLocalConsolePassword=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"LocalConsolePassword",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"LocalConsolePassword",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"LocalConsolePassword",params,undefined,false); 
			

			svc.setLocalConsolePassword(params,cb);
		}
			service.SetSMBGuestPassword=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"Password",params,undefined,false); 
			

			svc.setSMBGuestPassword(params,cb);
		}
			service.ShutdownGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			

			svc.shutdownGateway(params,cb);
		}
			service.StartAvailabilityMonitorTest=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			

			svc.startAvailabilityMonitorTest(params,cb);
		}
			service.StartGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			

			svc.startGateway(params,cb);
		}
			service.UpdateAutomaticTapeCreationPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutomaticTapeCreationRules",params,undefined,true); 
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(n,"AutomaticTapeCreationRules",params,undefined,true); 
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(msg,"AutomaticTapeCreationRules",params,undefined,true); 
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			

			svc.updateAutomaticTapeCreationPolicy(params,cb);
		}
			service.UpdateBandwidthRateLimit=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"AverageUploadRateLimitInBitsPerSec",params,undefined,false); 
			copyArgs(n,"AverageDownloadRateLimitInBitsPerSec",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"AverageUploadRateLimitInBitsPerSec",params,undefined,false); 
			copyArgs(msg,"AverageDownloadRateLimitInBitsPerSec",params,undefined,false); 
			

			svc.updateBandwidthRateLimit(params,cb);
		}
			service.UpdateBandwidthRateLimitSchedule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"BandwidthRateLimitIntervals",params,undefined,true); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"BandwidthRateLimitIntervals",params,undefined,true); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"BandwidthRateLimitIntervals",params,undefined,true); 
			

			svc.updateBandwidthRateLimitSchedule(params,cb);
		}
			service.UpdateChapCredentials=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TargetARN",params,undefined,false); 
			copyArgs(n,"SecretToAuthenticateInitiator",params,undefined,true); 
			copyArgs(n,"InitiatorName",params,undefined,false); 
			
			copyArgs(n,"TargetARN",params,undefined,false); 
			copyArgs(n,"SecretToAuthenticateInitiator",params,undefined,true); 
			copyArgs(n,"InitiatorName",params,undefined,false); 
			copyArgs(n,"SecretToAuthenticateTarget",params,undefined,true); 
			
			copyArgs(msg,"TargetARN",params,undefined,false); 
			copyArgs(msg,"SecretToAuthenticateInitiator",params,undefined,true); 
			copyArgs(msg,"InitiatorName",params,undefined,false); 
			copyArgs(msg,"SecretToAuthenticateTarget",params,undefined,true); 
			

			svc.updateChapCredentials(params,cb);
		}
			service.UpdateFileSystemAssociation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileSystemAssociationARN",params,undefined,false); 
			
			copyArgs(n,"FileSystemAssociationARN",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,true); 
			copyArgs(n,"AuditDestinationARN",params,undefined,false); 
			copyArgs(n,"CacheAttributes",params,undefined,true); 
			
			copyArgs(msg,"FileSystemAssociationARN",params,undefined,false); 
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"Password",params,undefined,true); 
			copyArgs(msg,"AuditDestinationARN",params,undefined,false); 
			copyArgs(msg,"CacheAttributes",params,undefined,true); 
			

			svc.updateFileSystemAssociation(params,cb);
		}
			service.UpdateGatewayInformation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"GatewayName",params,undefined,false); 
			copyArgs(n,"GatewayTimezone",params,undefined,false); 
			copyArgs(n,"CloudWatchLogGroupARN",params,undefined,false); 
			copyArgs(n,"GatewayCapacity",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"GatewayName",params,undefined,false); 
			copyArgs(msg,"GatewayTimezone",params,undefined,false); 
			copyArgs(msg,"CloudWatchLogGroupARN",params,undefined,false); 
			copyArgs(msg,"GatewayCapacity",params,undefined,false); 
			

			svc.updateGatewayInformation(params,cb);
		}
			service.UpdateGatewaySoftwareNow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			

			svc.updateGatewaySoftwareNow(params,cb);
		}
			service.UpdateMaintenanceStartTime=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(Number(n),"HourOfDay",params,undefined,false); 
			copyArgs(Number(n),"MinuteOfHour",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(Number(n),"HourOfDay",params,undefined,false); 
			copyArgs(Number(n),"MinuteOfHour",params,undefined,false); 
			copyArgs(Number(n),"DayOfWeek",params,undefined,false); 
			copyArgs(Number(n),"DayOfMonth",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"HourOfDay",params,undefined,false); 
			copyArgs(msg,"MinuteOfHour",params,undefined,false); 
			copyArgs(msg,"DayOfWeek",params,undefined,false); 
			copyArgs(msg,"DayOfMonth",params,undefined,false); 
			

			svc.updateMaintenanceStartTime(params,cb);
		}
			service.UpdateNFSFileShare=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileShareARN",params,undefined,false); 
			
			copyArgs(n,"FileShareARN",params,undefined,false); 
			copyArgs(Boolean(n),"KMSEncrypted",params,undefined,false); 
			copyArgs(n,"KMSKey",params,undefined,false); 
			copyArgs(n,"NFSFileShareDefaults",params,undefined,true); 
			copyArgs(n,"DefaultStorageClass",params,undefined,false); 
			copyArgs(n,"ObjectACL",params,undefined,false); 
			copyArgs(n,"ClientList",params,undefined,true); 
			copyArgs(n,"Squash",params,undefined,false); 
			copyArgs(Boolean(n),"ReadOnly",params,undefined,false); 
			copyArgs(Boolean(n),"GuessMIMETypeEnabled",params,undefined,false); 
			copyArgs(Boolean(n),"RequesterPays",params,undefined,false); 
			copyArgs(n,"FileShareName",params,undefined,false); 
			copyArgs(n,"CacheAttributes",params,undefined,true); 
			copyArgs(n,"NotificationPolicy",params,undefined,false); 
			
			copyArgs(msg,"FileShareARN",params,undefined,false); 
			copyArgs(msg,"KMSEncrypted",params,undefined,false); 
			copyArgs(msg,"KMSKey",params,undefined,false); 
			copyArgs(msg,"NFSFileShareDefaults",params,undefined,true); 
			copyArgs(msg,"DefaultStorageClass",params,undefined,false); 
			copyArgs(msg,"ObjectACL",params,undefined,false); 
			copyArgs(msg,"ClientList",params,undefined,true); 
			copyArgs(msg,"Squash",params,undefined,false); 
			copyArgs(msg,"ReadOnly",params,undefined,false); 
			copyArgs(msg,"GuessMIMETypeEnabled",params,undefined,false); 
			copyArgs(msg,"RequesterPays",params,undefined,false); 
			copyArgs(msg,"FileShareName",params,undefined,false); 
			copyArgs(msg,"CacheAttributes",params,undefined,true); 
			copyArgs(msg,"NotificationPolicy",params,undefined,false); 
			

			svc.updateNFSFileShare(params,cb);
		}
			service.UpdateSMBFileShare=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileShareARN",params,undefined,false); 
			
			copyArgs(n,"FileShareARN",params,undefined,false); 
			copyArgs(Boolean(n),"KMSEncrypted",params,undefined,false); 
			copyArgs(n,"KMSKey",params,undefined,false); 
			copyArgs(n,"DefaultStorageClass",params,undefined,false); 
			copyArgs(n,"ObjectACL",params,undefined,false); 
			copyArgs(Boolean(n),"ReadOnly",params,undefined,false); 
			copyArgs(Boolean(n),"GuessMIMETypeEnabled",params,undefined,false); 
			copyArgs(Boolean(n),"RequesterPays",params,undefined,false); 
			copyArgs(Boolean(n),"SMBACLEnabled",params,undefined,false); 
			copyArgs(Boolean(n),"AccessBasedEnumeration",params,undefined,false); 
			copyArgs(n,"AdminUserList",params,undefined,true); 
			copyArgs(n,"ValidUserList",params,undefined,true); 
			copyArgs(n,"InvalidUserList",params,undefined,true); 
			copyArgs(n,"AuditDestinationARN",params,undefined,false); 
			copyArgs(n,"CaseSensitivity",params,undefined,false); 
			copyArgs(n,"FileShareName",params,undefined,false); 
			copyArgs(n,"CacheAttributes",params,undefined,true); 
			copyArgs(n,"NotificationPolicy",params,undefined,false); 
			copyArgs(Boolean(n),"OplocksEnabled",params,undefined,false); 
			
			copyArgs(msg,"FileShareARN",params,undefined,false); 
			copyArgs(msg,"KMSEncrypted",params,undefined,false); 
			copyArgs(msg,"KMSKey",params,undefined,false); 
			copyArgs(msg,"DefaultStorageClass",params,undefined,false); 
			copyArgs(msg,"ObjectACL",params,undefined,false); 
			copyArgs(msg,"ReadOnly",params,undefined,false); 
			copyArgs(msg,"GuessMIMETypeEnabled",params,undefined,false); 
			copyArgs(msg,"RequesterPays",params,undefined,false); 
			copyArgs(msg,"SMBACLEnabled",params,undefined,false); 
			copyArgs(msg,"AccessBasedEnumeration",params,undefined,false); 
			copyArgs(msg,"AdminUserList",params,undefined,true); 
			copyArgs(msg,"ValidUserList",params,undefined,true); 
			copyArgs(msg,"InvalidUserList",params,undefined,true); 
			copyArgs(msg,"AuditDestinationARN",params,undefined,false); 
			copyArgs(msg,"CaseSensitivity",params,undefined,false); 
			copyArgs(msg,"FileShareName",params,undefined,false); 
			copyArgs(msg,"CacheAttributes",params,undefined,true); 
			copyArgs(msg,"NotificationPolicy",params,undefined,false); 
			copyArgs(msg,"OplocksEnabled",params,undefined,false); 
			

			svc.updateSMBFileShare(params,cb);
		}
			service.UpdateSMBFileShareVisibility=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(Boolean(n),"FileSharesVisible",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(Boolean(n),"FileSharesVisible",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"FileSharesVisible",params,undefined,false); 
			

			svc.updateSMBFileShareVisibility(params,cb);
		}
			service.UpdateSMBSecurityStrategy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"SMBSecurityStrategy",params,undefined,false); 
			
			copyArgs(n,"GatewayARN",params,undefined,false); 
			copyArgs(n,"SMBSecurityStrategy",params,undefined,false); 
			
			copyArgs(msg,"GatewayARN",params,undefined,false); 
			copyArgs(msg,"SMBSecurityStrategy",params,undefined,false); 
			

			svc.updateSMBSecurityStrategy(params,cb);
		}
			service.UpdateSnapshotSchedule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VolumeARN",params,undefined,false); 
			copyArgs(Number(n),"StartAt",params,undefined,false); 
			copyArgs(Number(n),"RecurrenceInHours",params,undefined,false); 
			
			copyArgs(n,"VolumeARN",params,undefined,false); 
			copyArgs(Number(n),"StartAt",params,undefined,false); 
			copyArgs(Number(n),"RecurrenceInHours",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"VolumeARN",params,undefined,false); 
			copyArgs(msg,"StartAt",params,undefined,false); 
			copyArgs(msg,"RecurrenceInHours",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.updateSnapshotSchedule(params,cb);
		}
			service.UpdateVTLDeviceType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VTLDeviceARN",params,undefined,false); 
			copyArgs(n,"DeviceType",params,undefined,false); 
			
			copyArgs(n,"VTLDeviceARN",params,undefined,false); 
			copyArgs(n,"DeviceType",params,undefined,false); 
			
			copyArgs(msg,"VTLDeviceARN",params,undefined,false); 
			copyArgs(msg,"DeviceType",params,undefined,false); 
			

			svc.updateVTLDeviceType(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS StorageGateway", AmazonAPINode);

};
