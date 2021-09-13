
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

		var awsService = new AWS.FSx( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.FSx(msg.AWSConfig) : awsService;

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
		
		service.AssociateFileSystemAliases=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			copyArgs(n,"Aliases",params,undefined,true); 
			
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"FileSystemId",params,undefined,false); 
			copyArgs(n,"Aliases",params,undefined,true); 
			
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"FileSystemId",params,undefined,false); 
			copyArgs(msg,"Aliases",params,undefined,true); 
			

			svc.associateFileSystemAliases(params,cb);
		}
		
		service.CancelDataRepositoryTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TaskId",params,undefined,false); 
			
			copyArgs(n,"TaskId",params,undefined,false); 
			
			copyArgs(msg,"TaskId",params,undefined,false); 
			

			svc.cancelDataRepositoryTask(params,cb);
		}
		
		service.CopyBackup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceBackupId",params,undefined,false); 
			
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"SourceBackupId",params,undefined,false); 
			copyArgs(n,"SourceRegion",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(Boolean(n),"CopyTags",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"SourceBackupId",params,undefined,false); 
			copyArgs(msg,"SourceRegion",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"CopyTags",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.copyBackup(params,cb);
		}
		
		service.CreateBackup=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"VolumeId",params,undefined,false); 
			
			copyArgs(msg,"FileSystemId",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"VolumeId",params,undefined,false); 
			

			svc.createBackup(params,cb);
		}
		
		service.CreateDataRepositoryTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"FileSystemId",params,undefined,false); 
			copyArgs(n,"Report",params,undefined,true); 
			
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Paths",params,undefined,true); 
			copyArgs(n,"FileSystemId",params,undefined,false); 
			copyArgs(n,"Report",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"Paths",params,undefined,true); 
			copyArgs(msg,"FileSystemId",params,undefined,false); 
			copyArgs(msg,"Report",params,undefined,true); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createDataRepositoryTask(params,cb);
		}
		
		service.CreateFileSystem=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileSystemType",params,undefined,false); 
			copyArgs(Number(n),"StorageCapacity",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"FileSystemType",params,undefined,false); 
			copyArgs(Number(n),"StorageCapacity",params,undefined,false); 
			copyArgs(n,"StorageType",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			copyArgs(n,"SecurityGroupIds",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"WindowsConfiguration",params,undefined,true); 
			copyArgs(n,"LustreConfiguration",params,undefined,true); 
			copyArgs(n,"OntapConfiguration",params,undefined,false); 
			
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"FileSystemType",params,undefined,false); 
			copyArgs(msg,"StorageCapacity",params,undefined,false); 
			copyArgs(msg,"StorageType",params,undefined,false); 
			copyArgs(msg,"SubnetIds",params,undefined,true); 
			copyArgs(msg,"SecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"WindowsConfiguration",params,undefined,true); 
			copyArgs(msg,"LustreConfiguration",params,undefined,true); 
			copyArgs(msg,"OntapConfiguration",params,undefined,false); 
			

			svc.createFileSystem(params,cb);
		}
		
		service.CreateFileSystemFromBackup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupId",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			
			copyArgs(n,"BackupId",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			copyArgs(n,"SecurityGroupIds",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"WindowsConfiguration",params,undefined,true); 
			copyArgs(n,"LustreConfiguration",params,undefined,true); 
			copyArgs(n,"StorageType",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			
			copyArgs(msg,"BackupId",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"SubnetIds",params,undefined,true); 
			copyArgs(msg,"SecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"WindowsConfiguration",params,undefined,true); 
			copyArgs(msg,"LustreConfiguration",params,undefined,true); 
			copyArgs(msg,"StorageType",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			

			svc.createFileSystemFromBackup(params,cb);
		}
		
		service.CreateStorageVirtualMachine=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"ActiveDirectoryConfiguration",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"FileSystemId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"SvmAdminPassword",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"RootVolumeSecurityStyle",params,undefined,false); 
			
			copyArgs(msg,"ActiveDirectoryConfiguration",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"FileSystemId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"SvmAdminPassword",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"RootVolumeSecurityStyle",params,undefined,false); 
			

			svc.createStorageVirtualMachine(params,cb);
		}
		
		service.CreateVolume=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VolumeType",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"VolumeType",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"OntapConfiguration",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"VolumeType",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"OntapConfiguration",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createVolume(params,cb);
		}
		
		service.CreateVolumeFromBackup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"BackupId",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"OntapConfiguration",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"BackupId",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"OntapConfiguration",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createVolumeFromBackup(params,cb);
		}
		
		service.DeleteBackup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupId",params,undefined,false); 
			
			copyArgs(n,"BackupId",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"BackupId",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.deleteBackup(params,cb);
		}
		
		service.DeleteFileSystem=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"WindowsConfiguration",params,undefined,false); 
			copyArgs(n,"LustreConfiguration",params,undefined,false); 
			
			copyArgs(msg,"FileSystemId",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"WindowsConfiguration",params,undefined,false); 
			copyArgs(msg,"LustreConfiguration",params,undefined,false); 
			

			svc.deleteFileSystem(params,cb);
		}
		
		service.DeleteStorageVirtualMachine=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StorageVirtualMachineId",params,undefined,false); 
			
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"StorageVirtualMachineId",params,undefined,false); 
			
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"StorageVirtualMachineId",params,undefined,false); 
			

			svc.deleteStorageVirtualMachine(params,cb);
		}
		
		service.DeleteVolume=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VolumeId",params,undefined,false); 
			
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"VolumeId",params,undefined,false); 
			copyArgs(n,"OntapConfiguration",params,undefined,false); 
			
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"VolumeId",params,undefined,false); 
			copyArgs(msg,"OntapConfiguration",params,undefined,false); 
			

			svc.deleteVolume(params,cb);
		}
		
		service.DescribeBackups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"BackupIds",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"BackupIds",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeBackups(params,cb);
		}
		
		service.DescribeDataRepositoryTasks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TaskIds",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"TaskIds",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeDataRepositoryTasks(params,cb);
		}
		
		service.DescribeFileSystemAliases=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"FileSystemId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"FileSystemId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeFileSystemAliases(params,cb);
		}
		
		service.DescribeFileSystems=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"FileSystemIds",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"FileSystemIds",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeFileSystems(params,cb);
		}
		
		service.DescribeStorageVirtualMachines=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"StorageVirtualMachineIds",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"StorageVirtualMachineIds",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeStorageVirtualMachines(params,cb);
		}
		
		service.DescribeVolumes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"VolumeIds",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"VolumeIds",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeVolumes(params,cb);
		}
		
		service.DisassociateFileSystemAliases=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			copyArgs(n,"Aliases",params,undefined,true); 
			
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"FileSystemId",params,undefined,false); 
			copyArgs(n,"Aliases",params,undefined,true); 
			
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"FileSystemId",params,undefined,false); 
			copyArgs(msg,"Aliases",params,undefined,true); 
			

			svc.disassociateFileSystemAliases(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
		
		service.UpdateFileSystem=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(Number(n),"StorageCapacity",params,undefined,false); 
			copyArgs(n,"WindowsConfiguration",params,undefined,false); 
			copyArgs(n,"LustreConfiguration",params,undefined,false); 
			copyArgs(n,"OntapConfiguration",params,undefined,false); 
			
			copyArgs(msg,"FileSystemId",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"StorageCapacity",params,undefined,false); 
			copyArgs(msg,"WindowsConfiguration",params,undefined,false); 
			copyArgs(msg,"LustreConfiguration",params,undefined,false); 
			copyArgs(msg,"OntapConfiguration",params,undefined,false); 
			

			svc.updateFileSystem(params,cb);
		}
		
		service.UpdateStorageVirtualMachine=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StorageVirtualMachineId",params,undefined,false); 
			
			copyArgs(n,"ActiveDirectoryConfiguration",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"StorageVirtualMachineId",params,undefined,false); 
			copyArgs(n,"SvmAdminPassword",params,undefined,true); 
			
			copyArgs(msg,"ActiveDirectoryConfiguration",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"StorageVirtualMachineId",params,undefined,false); 
			copyArgs(msg,"SvmAdminPassword",params,undefined,true); 
			

			svc.updateStorageVirtualMachine(params,cb);
		}
		
		service.UpdateVolume=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VolumeId",params,undefined,false); 
			
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"VolumeId",params,undefined,false); 
			copyArgs(n,"OntapConfiguration",params,undefined,false); 
			
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"VolumeId",params,undefined,false); 
			copyArgs(msg,"OntapConfiguration",params,undefined,false); 
			

			svc.updateVolume(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS FSx", AmazonAPINode);

};
