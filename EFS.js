
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

		var awsService = new AWS.EFS( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.EFS(msg.AWSConfig) : awsService;

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
			
			copyArg(n,"ClientToken",params,undefined,false); 
			copyArg(n,"FileSystemId",params,undefined,false); 
			
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"FileSystemId",params,undefined,false); 
			copyArg(msg,"PosixUser",params,undefined,true); 
			copyArg(msg,"RootDirectory",params,undefined,true); 
			

			svc.createAccessPoint(params,cb);
		}

		
		service.CreateFileSystem=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CreationToken",params,undefined,false); 
			
			copyArg(msg,"CreationToken",params,undefined,false); 
			copyArg(msg,"PerformanceMode",params,undefined,false); 
			copyArg(msg,"Encrypted",params,undefined,false); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"ThroughputMode",params,undefined,false); 
			copyArg(msg,"ProvisionedThroughputInMibps",params,undefined,false); 
			copyArg(msg,"AvailabilityZoneName",params,undefined,false); 
			copyArg(msg,"Backup",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createFileSystem(params,cb);
		}

		
		service.CreateMountTarget=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileSystemId",params,undefined,false); 
			copyArg(n,"SubnetId",params,undefined,false); 
			
			copyArg(msg,"FileSystemId",params,undefined,false); 
			copyArg(msg,"SubnetId",params,undefined,false); 
			copyArg(msg,"IpAddress",params,undefined,false); 
			copyArg(msg,"SecurityGroups",params,undefined,true); 
			

			svc.createMountTarget(params,cb);
		}

		
		service.CreateTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileSystemId",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"FileSystemId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createTags(params,cb);
		}

		
		service.DeleteAccessPoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccessPointId",params,undefined,false); 
			
			copyArg(msg,"AccessPointId",params,undefined,false); 
			

			svc.deleteAccessPoint(params,cb);
		}

		
		service.DeleteFileSystem=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileSystemId",params,undefined,false); 
			
			copyArg(msg,"FileSystemId",params,undefined,false); 
			

			svc.deleteFileSystem(params,cb);
		}

		
		service.DeleteFileSystemPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileSystemId",params,undefined,false); 
			
			copyArg(msg,"FileSystemId",params,undefined,false); 
			

			svc.deleteFileSystemPolicy(params,cb);
		}

		
		service.DeleteMountTarget=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MountTargetId",params,undefined,false); 
			
			copyArg(msg,"MountTargetId",params,undefined,false); 
			

			svc.deleteMountTarget(params,cb);
		}

		
		service.DeleteTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileSystemId",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,true); 
			
			copyArg(msg,"FileSystemId",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			

			svc.deleteTags(params,cb);
		}

		
		service.DescribeAccessPoints=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"AccessPointId",params,undefined,false); 
			copyArg(msg,"FileSystemId",params,undefined,false); 
			

			svc.describeAccessPoints(params,cb);
		}

		
		service.DescribeAccountPreferences=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describeAccountPreferences(params,cb);
		}

		
		service.DescribeBackupPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileSystemId",params,undefined,false); 
			
			copyArg(msg,"FileSystemId",params,undefined,false); 
			

			svc.describeBackupPolicy(params,cb);
		}

		
		service.DescribeFileSystemPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileSystemId",params,undefined,false); 
			
			copyArg(msg,"FileSystemId",params,undefined,false); 
			

			svc.describeFileSystemPolicy(params,cb);
		}

		
		service.DescribeFileSystems=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxItems",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"CreationToken",params,undefined,false); 
			copyArg(msg,"FileSystemId",params,undefined,false); 
			

			svc.describeFileSystems(params,cb);
		}

		
		service.DescribeLifecycleConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileSystemId",params,undefined,false); 
			
			copyArg(msg,"FileSystemId",params,undefined,false); 
			

			svc.describeLifecycleConfiguration(params,cb);
		}

		
		service.DescribeMountTargetSecurityGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MountTargetId",params,undefined,false); 
			
			copyArg(msg,"MountTargetId",params,undefined,false); 
			

			svc.describeMountTargetSecurityGroups(params,cb);
		}

		
		service.DescribeMountTargets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxItems",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"FileSystemId",params,undefined,false); 
			copyArg(msg,"MountTargetId",params,undefined,false); 
			copyArg(msg,"AccessPointId",params,undefined,false); 
			

			svc.describeMountTargets(params,cb);
		}

		
		service.DescribeTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileSystemId",params,undefined,false); 
			
			copyArg(msg,"MaxItems",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"FileSystemId",params,undefined,false); 
			

			svc.describeTags(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ModifyMountTargetSecurityGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MountTargetId",params,undefined,false); 
			
			copyArg(msg,"MountTargetId",params,undefined,false); 
			copyArg(msg,"SecurityGroups",params,undefined,true); 
			

			svc.modifyMountTargetSecurityGroups(params,cb);
		}

		
		service.PutAccountPreferences=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceIdType",params,undefined,false); 
			
			copyArg(msg,"ResourceIdType",params,undefined,false); 
			

			svc.putAccountPreferences(params,cb);
		}

		
		service.PutBackupPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileSystemId",params,undefined,false); 
			copyArg(n,"BackupPolicy",params,undefined,true); 
			
			copyArg(msg,"FileSystemId",params,undefined,false); 
			copyArg(msg,"BackupPolicy",params,undefined,true); 
			

			svc.putBackupPolicy(params,cb);
		}

		
		service.PutFileSystemPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileSystemId",params,undefined,false); 
			copyArg(n,"Policy",params,undefined,false); 
			
			copyArg(msg,"FileSystemId",params,undefined,false); 
			copyArg(msg,"Policy",params,undefined,false); 
			copyArg(msg,"BypassPolicyLockoutSafetyCheck",params,undefined,false); 
			

			svc.putFileSystemPolicy(params,cb);
		}

		
		service.PutLifecycleConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileSystemId",params,undefined,false); 
			copyArg(n,"LifecyclePolicies",params,undefined,true); 
			
			copyArg(msg,"FileSystemId",params,undefined,false); 
			copyArg(msg,"LifecyclePolicies",params,undefined,true); 
			

			svc.putLifecycleConfiguration(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,true); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateFileSystem=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileSystemId",params,undefined,false); 
			
			copyArg(msg,"FileSystemId",params,undefined,false); 
			copyArg(msg,"ThroughputMode",params,undefined,false); 
			copyArg(msg,"ProvisionedThroughputInMibps",params,undefined,false); 
			

			svc.updateFileSystem(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS EFS", AmazonAPINode);

};
