
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

		var awsService = new AWS.StorageGateway( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.StorageGateway(msg.AWSConfig) : awsService;

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

		
		service.ActivateGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ActivationKey",params,undefined,false); 
			copyArg(n,"GatewayName",params,undefined,false); 
			copyArg(n,"GatewayTimezone",params,undefined,false); 
			copyArg(n,"GatewayRegion",params,undefined,false); 
			
			copyArg(msg,"ActivationKey",params,undefined,false); 
			copyArg(msg,"GatewayName",params,undefined,false); 
			copyArg(msg,"GatewayTimezone",params,undefined,false); 
			copyArg(msg,"GatewayRegion",params,undefined,false); 
			copyArg(msg,"GatewayType",params,undefined,false); 
			copyArg(msg,"TapeDriveType",params,undefined,false); 
			copyArg(msg,"MediumChangerType",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.activateGateway(params,cb);
		}

		
		service.AddCache=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			copyArg(n,"DiskIds",params,undefined,true); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"DiskIds",params,undefined,true); 
			

			svc.addCache(params,cb);
		}

		
		service.AddTagsToResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.addTagsToResource(params,cb);
		}

		
		service.AddUploadBuffer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			copyArg(n,"DiskIds",params,undefined,true); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"DiskIds",params,undefined,true); 
			

			svc.addUploadBuffer(params,cb);
		}

		
		service.AddWorkingStorage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			copyArg(n,"DiskIds",params,undefined,true); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"DiskIds",params,undefined,true); 
			

			svc.addWorkingStorage(params,cb);
		}

		
		service.AssignTapePool=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TapeARN",params,undefined,false); 
			copyArg(n,"PoolId",params,undefined,false); 
			
			copyArg(msg,"TapeARN",params,undefined,false); 
			copyArg(msg,"PoolId",params,undefined,false); 
			copyArg(msg,"BypassGovernanceRetention",params,undefined,false); 
			

			svc.assignTapePool(params,cb);
		}

		
		service.AssociateFileSystem=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			copyArg(n,"Password",params,undefined,true); 
			copyArg(n,"ClientToken",params,undefined,false); 
			copyArg(n,"GatewayARN",params,undefined,false); 
			copyArg(n,"LocationARN",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"Password",params,undefined,true); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"LocationARN",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"AuditDestinationARN",params,undefined,false); 
			copyArg(msg,"CacheAttributes",params,undefined,true); 
			copyArg(msg,"EndpointNetworkConfiguration",params,undefined,true); 
			

			svc.associateFileSystem(params,cb);
		}

		
		service.AttachVolume=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			copyArg(n,"VolumeARN",params,undefined,false); 
			copyArg(n,"NetworkInterfaceId",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"TargetName",params,undefined,false); 
			copyArg(msg,"VolumeARN",params,undefined,false); 
			copyArg(msg,"NetworkInterfaceId",params,undefined,false); 
			copyArg(msg,"DiskId",params,undefined,false); 
			

			svc.attachVolume(params,cb);
		}

		
		service.CancelArchival=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			copyArg(n,"TapeARN",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"TapeARN",params,undefined,false); 
			

			svc.cancelArchival(params,cb);
		}

		
		service.CancelRetrieval=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			copyArg(n,"TapeARN",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"TapeARN",params,undefined,false); 
			

			svc.cancelRetrieval(params,cb);
		}

		
		service.CreateCachediSCSIVolume=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			copyArg(n,"VolumeSizeInBytes",params,undefined,false); 
			copyArg(n,"TargetName",params,undefined,false); 
			copyArg(n,"NetworkInterfaceId",params,undefined,false); 
			copyArg(n,"ClientToken",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"VolumeSizeInBytes",params,undefined,false); 
			copyArg(msg,"SnapshotId",params,undefined,false); 
			copyArg(msg,"TargetName",params,undefined,false); 
			copyArg(msg,"SourceVolumeARN",params,undefined,false); 
			copyArg(msg,"NetworkInterfaceId",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"KMSEncrypted",params,undefined,false); 
			copyArg(msg,"KMSKey",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createCachediSCSIVolume(params,cb);
		}

		
		service.CreateNFSFileShare=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClientToken",params,undefined,false); 
			copyArg(n,"GatewayARN",params,undefined,false); 
			copyArg(n,"Role",params,undefined,false); 
			copyArg(n,"LocationARN",params,undefined,false); 
			
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"NFSFileShareDefaults",params,undefined,true); 
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"KMSEncrypted",params,undefined,false); 
			copyArg(msg,"KMSKey",params,undefined,false); 
			copyArg(msg,"Role",params,undefined,false); 
			copyArg(msg,"LocationARN",params,undefined,false); 
			copyArg(msg,"DefaultStorageClass",params,undefined,false); 
			copyArg(msg,"ObjectACL",params,undefined,false); 
			copyArg(msg,"ClientList",params,undefined,true); 
			copyArg(msg,"Squash",params,undefined,false); 
			copyArg(msg,"ReadOnly",params,undefined,false); 
			copyArg(msg,"GuessMIMETypeEnabled",params,undefined,false); 
			copyArg(msg,"RequesterPays",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"FileShareName",params,undefined,false); 
			copyArg(msg,"CacheAttributes",params,undefined,true); 
			copyArg(msg,"NotificationPolicy",params,undefined,false); 
			copyArg(msg,"VPCEndpointDNSName",params,undefined,false); 
			copyArg(msg,"BucketRegion",params,undefined,false); 
			

			svc.createNFSFileShare(params,cb);
		}

		
		service.CreateSMBFileShare=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClientToken",params,undefined,false); 
			copyArg(n,"GatewayARN",params,undefined,false); 
			copyArg(n,"Role",params,undefined,false); 
			copyArg(n,"LocationARN",params,undefined,false); 
			
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"KMSEncrypted",params,undefined,false); 
			copyArg(msg,"KMSKey",params,undefined,false); 
			copyArg(msg,"Role",params,undefined,false); 
			copyArg(msg,"LocationARN",params,undefined,false); 
			copyArg(msg,"DefaultStorageClass",params,undefined,false); 
			copyArg(msg,"ObjectACL",params,undefined,false); 
			copyArg(msg,"ReadOnly",params,undefined,false); 
			copyArg(msg,"GuessMIMETypeEnabled",params,undefined,false); 
			copyArg(msg,"RequesterPays",params,undefined,false); 
			copyArg(msg,"SMBACLEnabled",params,undefined,false); 
			copyArg(msg,"AccessBasedEnumeration",params,undefined,false); 
			copyArg(msg,"AdminUserList",params,undefined,true); 
			copyArg(msg,"ValidUserList",params,undefined,true); 
			copyArg(msg,"InvalidUserList",params,undefined,true); 
			copyArg(msg,"AuditDestinationARN",params,undefined,false); 
			copyArg(msg,"Authentication",params,undefined,false); 
			copyArg(msg,"CaseSensitivity",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"FileShareName",params,undefined,false); 
			copyArg(msg,"CacheAttributes",params,undefined,true); 
			copyArg(msg,"NotificationPolicy",params,undefined,false); 
			copyArg(msg,"VPCEndpointDNSName",params,undefined,false); 
			copyArg(msg,"BucketRegion",params,undefined,false); 
			copyArg(msg,"OplocksEnabled",params,undefined,false); 
			

			svc.createSMBFileShare(params,cb);
		}

		
		service.CreateSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VolumeARN",params,undefined,false); 
			copyArg(n,"SnapshotDescription",params,undefined,false); 
			
			copyArg(msg,"VolumeARN",params,undefined,false); 
			copyArg(msg,"SnapshotDescription",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createSnapshot(params,cb);
		}

		
		service.CreateSnapshotFromVolumeRecoveryPoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VolumeARN",params,undefined,false); 
			copyArg(n,"SnapshotDescription",params,undefined,false); 
			
			copyArg(msg,"VolumeARN",params,undefined,false); 
			copyArg(msg,"SnapshotDescription",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createSnapshotFromVolumeRecoveryPoint(params,cb);
		}

		
		service.CreateStorediSCSIVolume=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			copyArg(n,"DiskId",params,undefined,false); 
			copyArg(n,"PreserveExistingData",params,undefined,false); 
			copyArg(n,"TargetName",params,undefined,false); 
			copyArg(n,"NetworkInterfaceId",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"DiskId",params,undefined,false); 
			copyArg(msg,"SnapshotId",params,undefined,false); 
			copyArg(msg,"PreserveExistingData",params,undefined,false); 
			copyArg(msg,"TargetName",params,undefined,false); 
			copyArg(msg,"NetworkInterfaceId",params,undefined,false); 
			copyArg(msg,"KMSEncrypted",params,undefined,false); 
			copyArg(msg,"KMSKey",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createStorediSCSIVolume(params,cb);
		}

		
		service.CreateTapePool=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PoolName",params,undefined,false); 
			copyArg(n,"StorageClass",params,undefined,false); 
			
			copyArg(msg,"PoolName",params,undefined,false); 
			copyArg(msg,"StorageClass",params,undefined,false); 
			copyArg(msg,"RetentionLockType",params,undefined,false); 
			copyArg(msg,"RetentionLockTimeInDays",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createTapePool(params,cb);
		}

		
		service.CreateTapeWithBarcode=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			copyArg(n,"TapeSizeInBytes",params,undefined,false); 
			copyArg(n,"TapeBarcode",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"TapeSizeInBytes",params,undefined,false); 
			copyArg(msg,"TapeBarcode",params,undefined,false); 
			copyArg(msg,"KMSEncrypted",params,undefined,false); 
			copyArg(msg,"KMSKey",params,undefined,false); 
			copyArg(msg,"PoolId",params,undefined,false); 
			copyArg(msg,"Worm",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createTapeWithBarcode(params,cb);
		}

		
		service.CreateTapes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			copyArg(n,"TapeSizeInBytes",params,undefined,false); 
			copyArg(n,"ClientToken",params,undefined,false); 
			copyArg(n,"NumTapesToCreate",params,undefined,false); 
			copyArg(n,"TapeBarcodePrefix",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"TapeSizeInBytes",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"NumTapesToCreate",params,undefined,false); 
			copyArg(msg,"TapeBarcodePrefix",params,undefined,false); 
			copyArg(msg,"KMSEncrypted",params,undefined,false); 
			copyArg(msg,"KMSKey",params,undefined,false); 
			copyArg(msg,"PoolId",params,undefined,false); 
			copyArg(msg,"Worm",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createTapes(params,cb);
		}

		
		service.DeleteAutomaticTapeCreationPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			

			svc.deleteAutomaticTapeCreationPolicy(params,cb);
		}

		
		service.DeleteBandwidthRateLimit=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			copyArg(n,"BandwidthType",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"BandwidthType",params,undefined,false); 
			

			svc.deleteBandwidthRateLimit(params,cb);
		}

		
		service.DeleteChapCredentials=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TargetARN",params,undefined,false); 
			copyArg(n,"InitiatorName",params,undefined,false); 
			
			copyArg(msg,"TargetARN",params,undefined,false); 
			copyArg(msg,"InitiatorName",params,undefined,false); 
			

			svc.deleteChapCredentials(params,cb);
		}

		
		service.DeleteFileShare=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileShareARN",params,undefined,false); 
			
			copyArg(msg,"FileShareARN",params,undefined,false); 
			copyArg(msg,"ForceDelete",params,undefined,false); 
			

			svc.deleteFileShare(params,cb);
		}

		
		service.DeleteGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			

			svc.deleteGateway(params,cb);
		}

		
		service.DeleteSnapshotSchedule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VolumeARN",params,undefined,false); 
			
			copyArg(msg,"VolumeARN",params,undefined,false); 
			

			svc.deleteSnapshotSchedule(params,cb);
		}

		
		service.DeleteTape=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			copyArg(n,"TapeARN",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"TapeARN",params,undefined,false); 
			copyArg(msg,"BypassGovernanceRetention",params,undefined,false); 
			

			svc.deleteTape(params,cb);
		}

		
		service.DeleteTapeArchive=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TapeARN",params,undefined,false); 
			
			copyArg(msg,"TapeARN",params,undefined,false); 
			copyArg(msg,"BypassGovernanceRetention",params,undefined,false); 
			

			svc.deleteTapeArchive(params,cb);
		}

		
		service.DeleteTapePool=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PoolARN",params,undefined,false); 
			
			copyArg(msg,"PoolARN",params,undefined,false); 
			

			svc.deleteTapePool(params,cb);
		}

		
		service.DeleteVolume=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VolumeARN",params,undefined,false); 
			
			copyArg(msg,"VolumeARN",params,undefined,false); 
			

			svc.deleteVolume(params,cb);
		}

		
		service.DescribeAvailabilityMonitorTest=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			

			svc.describeAvailabilityMonitorTest(params,cb);
		}

		
		service.DescribeBandwidthRateLimit=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			

			svc.describeBandwidthRateLimit(params,cb);
		}

		
		service.DescribeBandwidthRateLimitSchedule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			

			svc.describeBandwidthRateLimitSchedule(params,cb);
		}

		
		service.DescribeCache=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			

			svc.describeCache(params,cb);
		}

		
		service.DescribeCachediSCSIVolumes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VolumeARNs",params,undefined,true); 
			
			copyArg(msg,"VolumeARNs",params,undefined,true); 
			

			svc.describeCachediSCSIVolumes(params,cb);
		}

		
		service.DescribeChapCredentials=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TargetARN",params,undefined,false); 
			
			copyArg(msg,"TargetARN",params,undefined,false); 
			

			svc.describeChapCredentials(params,cb);
		}

		
		service.DescribeFileSystemAssociations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileSystemAssociationARNList",params,undefined,false); 
			
			copyArg(msg,"FileSystemAssociationARNList",params,undefined,false); 
			

			svc.describeFileSystemAssociations(params,cb);
		}

		
		service.DescribeGatewayInformation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			

			svc.describeGatewayInformation(params,cb);
		}

		
		service.DescribeMaintenanceStartTime=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			

			svc.describeMaintenanceStartTime(params,cb);
		}

		
		service.DescribeNFSFileShares=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileShareARNList",params,undefined,true); 
			
			copyArg(msg,"FileShareARNList",params,undefined,true); 
			

			svc.describeNFSFileShares(params,cb);
		}

		
		service.DescribeSMBFileShares=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileShareARNList",params,undefined,true); 
			
			copyArg(msg,"FileShareARNList",params,undefined,true); 
			

			svc.describeSMBFileShares(params,cb);
		}

		
		service.DescribeSMBSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			

			svc.describeSMBSettings(params,cb);
		}

		
		service.DescribeSnapshotSchedule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VolumeARN",params,undefined,false); 
			
			copyArg(msg,"VolumeARN",params,undefined,false); 
			

			svc.describeSnapshotSchedule(params,cb);
		}

		
		service.DescribeStorediSCSIVolumes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VolumeARNs",params,undefined,true); 
			
			copyArg(msg,"VolumeARNs",params,undefined,true); 
			

			svc.describeStorediSCSIVolumes(params,cb);
		}

		
		service.DescribeTapeArchives=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"TapeARNs",params,undefined,true); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.describeTapeArchives(params,cb);
		}

		
		service.DescribeTapeRecoveryPoints=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.describeTapeRecoveryPoints(params,cb);
		}

		
		service.DescribeTapes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"TapeARNs",params,undefined,true); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.describeTapes(params,cb);
		}

		
		service.DescribeUploadBuffer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			

			svc.describeUploadBuffer(params,cb);
		}

		
		service.DescribeVTLDevices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"VTLDeviceARNs",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.describeVTLDevices(params,cb);
		}

		
		service.DescribeWorkingStorage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			

			svc.describeWorkingStorage(params,cb);
		}

		
		service.DetachVolume=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VolumeARN",params,undefined,false); 
			
			copyArg(msg,"VolumeARN",params,undefined,false); 
			copyArg(msg,"ForceDetach",params,undefined,false); 
			

			svc.detachVolume(params,cb);
		}

		
		service.DisableGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			

			svc.disableGateway(params,cb);
		}

		
		service.DisassociateFileSystem=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileSystemAssociationARN",params,undefined,false); 
			
			copyArg(msg,"FileSystemAssociationARN",params,undefined,false); 
			copyArg(msg,"ForceDelete",params,undefined,false); 
			

			svc.disassociateFileSystem(params,cb);
		}

		
		service.JoinDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			copyArg(n,"DomainName",params,undefined,false); 
			copyArg(n,"UserName",params,undefined,false); 
			copyArg(n,"Password",params,undefined,true); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"OrganizationalUnit",params,undefined,false); 
			copyArg(msg,"DomainControllers",params,undefined,false); 
			copyArg(msg,"TimeoutInSeconds",params,undefined,false); 
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"Password",params,undefined,true); 
			

			svc.joinDomain(params,cb);
		}

		
		service.ListAutomaticTapeCreationPolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			

			svc.listAutomaticTapeCreationPolicies(params,cb);
		}

		
		service.ListFileShares=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.listFileShares(params,cb);
		}

		
		service.ListFileSystemAssociations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.listFileSystemAssociations(params,cb);
		}

		
		service.ListGateways=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listGateways(params,cb);
		}

		
		service.ListLocalDisks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			

			svc.listLocalDisks(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListTapePools=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"PoolARNs",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listTapePools(params,cb);
		}

		
		service.ListTapes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"TapeARNs",params,undefined,true); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listTapes(params,cb);
		}

		
		service.ListVolumeInitiators=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VolumeARN",params,undefined,false); 
			
			copyArg(msg,"VolumeARN",params,undefined,false); 
			

			svc.listVolumeInitiators(params,cb);
		}

		
		service.ListVolumeRecoveryPoints=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			

			svc.listVolumeRecoveryPoints(params,cb);
		}

		
		service.ListVolumes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listVolumes(params,cb);
		}

		
		service.NotifyWhenUploaded=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileShareARN",params,undefined,false); 
			
			copyArg(msg,"FileShareARN",params,undefined,false); 
			

			svc.notifyWhenUploaded(params,cb);
		}

		
		service.RefreshCache=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileShareARN",params,undefined,false); 
			
			copyArg(msg,"FileShareARN",params,undefined,false); 
			copyArg(msg,"FolderList",params,undefined,false); 
			copyArg(msg,"Recursive",params,undefined,false); 
			

			svc.refreshCache(params,cb);
		}

		
		service.RemoveTagsFromResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.removeTagsFromResource(params,cb);
		}

		
		service.ResetCache=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			

			svc.resetCache(params,cb);
		}

		
		service.RetrieveTapeArchive=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TapeARN",params,undefined,false); 
			copyArg(n,"GatewayARN",params,undefined,false); 
			
			copyArg(msg,"TapeARN",params,undefined,false); 
			copyArg(msg,"GatewayARN",params,undefined,false); 
			

			svc.retrieveTapeArchive(params,cb);
		}

		
		service.RetrieveTapeRecoveryPoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TapeARN",params,undefined,false); 
			copyArg(n,"GatewayARN",params,undefined,false); 
			
			copyArg(msg,"TapeARN",params,undefined,false); 
			copyArg(msg,"GatewayARN",params,undefined,false); 
			

			svc.retrieveTapeRecoveryPoint(params,cb);
		}

		
		service.SetLocalConsolePassword=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			copyArg(n,"LocalConsolePassword",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"LocalConsolePassword",params,undefined,false); 
			

			svc.setLocalConsolePassword(params,cb);
		}

		
		service.SetSMBGuestPassword=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			copyArg(n,"Password",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"Password",params,undefined,false); 
			

			svc.setSMBGuestPassword(params,cb);
		}

		
		service.ShutdownGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			

			svc.shutdownGateway(params,cb);
		}

		
		service.StartAvailabilityMonitorTest=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			

			svc.startAvailabilityMonitorTest(params,cb);
		}

		
		service.StartGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			

			svc.startGateway(params,cb);
		}

		
		service.UpdateAutomaticTapeCreationPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutomaticTapeCreationRules",params,undefined,true); 
			copyArg(n,"GatewayARN",params,undefined,false); 
			
			copyArg(msg,"AutomaticTapeCreationRules",params,undefined,true); 
			copyArg(msg,"GatewayARN",params,undefined,false); 
			

			svc.updateAutomaticTapeCreationPolicy(params,cb);
		}

		
		service.UpdateBandwidthRateLimit=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"AverageUploadRateLimitInBitsPerSec",params,undefined,false); 
			copyArg(msg,"AverageDownloadRateLimitInBitsPerSec",params,undefined,false); 
			

			svc.updateBandwidthRateLimit(params,cb);
		}

		
		service.UpdateBandwidthRateLimitSchedule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			copyArg(n,"BandwidthRateLimitIntervals",params,undefined,true); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"BandwidthRateLimitIntervals",params,undefined,true); 
			

			svc.updateBandwidthRateLimitSchedule(params,cb);
		}

		
		service.UpdateChapCredentials=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TargetARN",params,undefined,false); 
			copyArg(n,"SecretToAuthenticateInitiator",params,undefined,true); 
			copyArg(n,"InitiatorName",params,undefined,false); 
			
			copyArg(msg,"TargetARN",params,undefined,false); 
			copyArg(msg,"SecretToAuthenticateInitiator",params,undefined,true); 
			copyArg(msg,"InitiatorName",params,undefined,false); 
			copyArg(msg,"SecretToAuthenticateTarget",params,undefined,true); 
			

			svc.updateChapCredentials(params,cb);
		}

		
		service.UpdateFileSystemAssociation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileSystemAssociationARN",params,undefined,false); 
			
			copyArg(msg,"FileSystemAssociationARN",params,undefined,false); 
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"Password",params,undefined,true); 
			copyArg(msg,"AuditDestinationARN",params,undefined,false); 
			copyArg(msg,"CacheAttributes",params,undefined,true); 
			

			svc.updateFileSystemAssociation(params,cb);
		}

		
		service.UpdateGatewayInformation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"GatewayName",params,undefined,false); 
			copyArg(msg,"GatewayTimezone",params,undefined,false); 
			copyArg(msg,"CloudWatchLogGroupARN",params,undefined,false); 
			copyArg(msg,"GatewayCapacity",params,undefined,false); 
			

			svc.updateGatewayInformation(params,cb);
		}

		
		service.UpdateGatewaySoftwareNow=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			

			svc.updateGatewaySoftwareNow(params,cb);
		}

		
		service.UpdateMaintenanceStartTime=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			copyArg(n,"HourOfDay",params,undefined,false); 
			copyArg(n,"MinuteOfHour",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"HourOfDay",params,undefined,false); 
			copyArg(msg,"MinuteOfHour",params,undefined,false); 
			copyArg(msg,"DayOfWeek",params,undefined,false); 
			copyArg(msg,"DayOfMonth",params,undefined,false); 
			

			svc.updateMaintenanceStartTime(params,cb);
		}

		
		service.UpdateNFSFileShare=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileShareARN",params,undefined,false); 
			
			copyArg(msg,"FileShareARN",params,undefined,false); 
			copyArg(msg,"KMSEncrypted",params,undefined,false); 
			copyArg(msg,"KMSKey",params,undefined,false); 
			copyArg(msg,"NFSFileShareDefaults",params,undefined,true); 
			copyArg(msg,"DefaultStorageClass",params,undefined,false); 
			copyArg(msg,"ObjectACL",params,undefined,false); 
			copyArg(msg,"ClientList",params,undefined,true); 
			copyArg(msg,"Squash",params,undefined,false); 
			copyArg(msg,"ReadOnly",params,undefined,false); 
			copyArg(msg,"GuessMIMETypeEnabled",params,undefined,false); 
			copyArg(msg,"RequesterPays",params,undefined,false); 
			copyArg(msg,"FileShareName",params,undefined,false); 
			copyArg(msg,"CacheAttributes",params,undefined,true); 
			copyArg(msg,"NotificationPolicy",params,undefined,false); 
			

			svc.updateNFSFileShare(params,cb);
		}

		
		service.UpdateSMBFileShare=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileShareARN",params,undefined,false); 
			
			copyArg(msg,"FileShareARN",params,undefined,false); 
			copyArg(msg,"KMSEncrypted",params,undefined,false); 
			copyArg(msg,"KMSKey",params,undefined,false); 
			copyArg(msg,"DefaultStorageClass",params,undefined,false); 
			copyArg(msg,"ObjectACL",params,undefined,false); 
			copyArg(msg,"ReadOnly",params,undefined,false); 
			copyArg(msg,"GuessMIMETypeEnabled",params,undefined,false); 
			copyArg(msg,"RequesterPays",params,undefined,false); 
			copyArg(msg,"SMBACLEnabled",params,undefined,false); 
			copyArg(msg,"AccessBasedEnumeration",params,undefined,false); 
			copyArg(msg,"AdminUserList",params,undefined,true); 
			copyArg(msg,"ValidUserList",params,undefined,true); 
			copyArg(msg,"InvalidUserList",params,undefined,true); 
			copyArg(msg,"AuditDestinationARN",params,undefined,false); 
			copyArg(msg,"CaseSensitivity",params,undefined,false); 
			copyArg(msg,"FileShareName",params,undefined,false); 
			copyArg(msg,"CacheAttributes",params,undefined,true); 
			copyArg(msg,"NotificationPolicy",params,undefined,false); 
			copyArg(msg,"OplocksEnabled",params,undefined,false); 
			

			svc.updateSMBFileShare(params,cb);
		}

		
		service.UpdateSMBFileShareVisibility=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			copyArg(n,"FileSharesVisible",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"FileSharesVisible",params,undefined,false); 
			

			svc.updateSMBFileShareVisibility(params,cb);
		}

		
		service.UpdateSMBSecurityStrategy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayARN",params,undefined,false); 
			copyArg(n,"SMBSecurityStrategy",params,undefined,false); 
			
			copyArg(msg,"GatewayARN",params,undefined,false); 
			copyArg(msg,"SMBSecurityStrategy",params,undefined,false); 
			

			svc.updateSMBSecurityStrategy(params,cb);
		}

		
		service.UpdateSnapshotSchedule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VolumeARN",params,undefined,false); 
			copyArg(n,"StartAt",params,undefined,false); 
			copyArg(n,"RecurrenceInHours",params,undefined,false); 
			
			copyArg(msg,"VolumeARN",params,undefined,false); 
			copyArg(msg,"StartAt",params,undefined,false); 
			copyArg(msg,"RecurrenceInHours",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.updateSnapshotSchedule(params,cb);
		}

		
		service.UpdateVTLDeviceType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VTLDeviceARN",params,undefined,false); 
			copyArg(n,"DeviceType",params,undefined,false); 
			
			copyArg(msg,"VTLDeviceARN",params,undefined,false); 
			copyArg(msg,"DeviceType",params,undefined,false); 
			

			svc.updateVTLDeviceType(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS StorageGateway", AmazonAPINode);

};
