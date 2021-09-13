
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

		var awsService = new AWS.EFS( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.EFS(msg.AWSConfig) : awsService;

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
			
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"FileSystemId",params,undefined,false); 
			
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"FileSystemId",params,undefined,false); 
			copyArgs(n,"PosixUser",params,undefined,true); 
			copyArgs(n,"RootDirectory",params,undefined,true); 
			
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"FileSystemId",params,undefined,false); 
			copyArgs(msg,"PosixUser",params,undefined,true); 
			copyArgs(msg,"RootDirectory",params,undefined,true); 
			

			svc.createAccessPoint(params,cb);
		}
			service.CreateFileSystem=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CreationToken",params,undefined,false); 
			
			copyArgs(n,"CreationToken",params,undefined,false); 
			copyArgs(n,"PerformanceMode",params,undefined,false); 
			copyArgs(Boolean(n),"Encrypted",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"ThroughputMode",params,undefined,false); 
			copyArgs(n,"ProvisionedThroughputInMibps",params,undefined,false); 
			copyArgs(n,"AvailabilityZoneName",params,undefined,false); 
			copyArgs(Boolean(n),"Backup",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"CreationToken",params,undefined,false); 
			copyArgs(msg,"PerformanceMode",params,undefined,false); 
			copyArgs(msg,"Encrypted",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"ThroughputMode",params,undefined,false); 
			copyArgs(msg,"ProvisionedThroughputInMibps",params,undefined,false); 
			copyArgs(msg,"AvailabilityZoneName",params,undefined,false); 
			copyArgs(msg,"Backup",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createFileSystem(params,cb);
		}
			service.CreateMountTarget=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			copyArgs(n,"SubnetId",params,undefined,false); 
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			copyArgs(n,"SubnetId",params,undefined,false); 
			copyArgs(n,"IpAddress",params,undefined,false); 
			copyArgs(n,"SecurityGroups",params,undefined,true); 
			
			copyArgs(msg,"FileSystemId",params,undefined,false); 
			copyArgs(msg,"SubnetId",params,undefined,false); 
			copyArgs(msg,"IpAddress",params,undefined,false); 
			copyArgs(msg,"SecurityGroups",params,undefined,true); 
			

			svc.createMountTarget(params,cb);
		}
			service.CreateTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"FileSystemId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createTags(params,cb);
		}
			service.DeleteAccessPoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccessPointId",params,undefined,false); 
			
			copyArgs(n,"AccessPointId",params,undefined,false); 
			
			copyArgs(msg,"AccessPointId",params,undefined,false); 
			

			svc.deleteAccessPoint(params,cb);
		}
			service.DeleteFileSystem=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			
			copyArgs(msg,"FileSystemId",params,undefined,false); 
			

			svc.deleteFileSystem(params,cb);
		}
			service.DeleteFileSystemPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			
			copyArgs(msg,"FileSystemId",params,undefined,false); 
			

			svc.deleteFileSystemPolicy(params,cb);
		}
			service.DeleteMountTarget=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MountTargetId",params,undefined,false); 
			
			copyArgs(n,"MountTargetId",params,undefined,false); 
			
			copyArgs(msg,"MountTargetId",params,undefined,false); 
			

			svc.deleteMountTarget(params,cb);
		}
			service.DeleteTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(msg,"FileSystemId",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			

			svc.deleteTags(params,cb);
		}
			service.DescribeAccessPoints=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"AccessPointId",params,undefined,false); 
			copyArgs(n,"FileSystemId",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"AccessPointId",params,undefined,false); 
			copyArgs(msg,"FileSystemId",params,undefined,false); 
			

			svc.describeAccessPoints(params,cb);
		}
			service.DescribeAccountPreferences=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeAccountPreferences(params,cb);
		}
			service.DescribeBackupPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			
			copyArgs(msg,"FileSystemId",params,undefined,false); 
			

			svc.describeBackupPolicy(params,cb);
		}
			service.DescribeFileSystemPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			
			copyArgs(msg,"FileSystemId",params,undefined,false); 
			

			svc.describeFileSystemPolicy(params,cb);
		}
			service.DescribeFileSystems=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxItems",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"CreationToken",params,undefined,false); 
			copyArgs(n,"FileSystemId",params,undefined,false); 
			
			copyArgs(msg,"MaxItems",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"CreationToken",params,undefined,false); 
			copyArgs(msg,"FileSystemId",params,undefined,false); 
			

			svc.describeFileSystems(params,cb);
		}
			service.DescribeLifecycleConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			
			copyArgs(msg,"FileSystemId",params,undefined,false); 
			

			svc.describeLifecycleConfiguration(params,cb);
		}
			service.DescribeMountTargetSecurityGroups=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MountTargetId",params,undefined,false); 
			
			copyArgs(n,"MountTargetId",params,undefined,false); 
			
			copyArgs(msg,"MountTargetId",params,undefined,false); 
			

			svc.describeMountTargetSecurityGroups(params,cb);
		}
			service.DescribeMountTargets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxItems",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"FileSystemId",params,undefined,false); 
			copyArgs(n,"MountTargetId",params,undefined,false); 
			copyArgs(n,"AccessPointId",params,undefined,false); 
			
			copyArgs(msg,"MaxItems",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"FileSystemId",params,undefined,false); 
			copyArgs(msg,"MountTargetId",params,undefined,false); 
			copyArgs(msg,"AccessPointId",params,undefined,false); 
			

			svc.describeMountTargets(params,cb);
		}
			service.DescribeTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			
			copyArgs(Number(n),"MaxItems",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"FileSystemId",params,undefined,false); 
			
			copyArgs(msg,"MaxItems",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"FileSystemId",params,undefined,false); 
			

			svc.describeTags(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.ModifyMountTargetSecurityGroups=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MountTargetId",params,undefined,false); 
			
			copyArgs(n,"MountTargetId",params,undefined,false); 
			copyArgs(n,"SecurityGroups",params,undefined,true); 
			
			copyArgs(msg,"MountTargetId",params,undefined,false); 
			copyArgs(msg,"SecurityGroups",params,undefined,true); 
			

			svc.modifyMountTargetSecurityGroups(params,cb);
		}
			service.PutAccountPreferences=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceIdType",params,undefined,false); 
			
			copyArgs(n,"ResourceIdType",params,undefined,false); 
			
			copyArgs(msg,"ResourceIdType",params,undefined,false); 
			

			svc.putAccountPreferences(params,cb);
		}
			service.PutBackupPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			copyArgs(n,"BackupPolicy",params,undefined,true); 
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			copyArgs(n,"BackupPolicy",params,undefined,true); 
			
			copyArgs(msg,"FileSystemId",params,undefined,false); 
			copyArgs(msg,"BackupPolicy",params,undefined,true); 
			

			svc.putBackupPolicy(params,cb);
		}
			service.PutFileSystemPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			copyArgs(Boolean(n),"BypassPolicyLockoutSafetyCheck",params,undefined,false); 
			
			copyArgs(msg,"FileSystemId",params,undefined,false); 
			copyArgs(msg,"Policy",params,undefined,false); 
			copyArgs(msg,"BypassPolicyLockoutSafetyCheck",params,undefined,false); 
			

			svc.putFileSystemPolicy(params,cb);
		}
			service.PutLifecycleConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			copyArgs(n,"LifecyclePolicies",params,undefined,true); 
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			copyArgs(n,"LifecyclePolicies",params,undefined,true); 
			
			copyArgs(msg,"FileSystemId",params,undefined,false); 
			copyArgs(msg,"LifecyclePolicies",params,undefined,true); 
			

			svc.putLifecycleConfiguration(params,cb);
		}
			service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
			service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			

			svc.untagResource(params,cb);
		}
			service.UpdateFileSystem=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			
			copyArgs(n,"FileSystemId",params,undefined,false); 
			copyArgs(n,"ThroughputMode",params,undefined,false); 
			copyArgs(n,"ProvisionedThroughputInMibps",params,undefined,false); 
			
			copyArgs(msg,"FileSystemId",params,undefined,false); 
			copyArgs(msg,"ThroughputMode",params,undefined,false); 
			copyArgs(msg,"ProvisionedThroughputInMibps",params,undefined,false); 
			

			svc.updateFileSystem(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS EFS", AmazonAPINode);

};
