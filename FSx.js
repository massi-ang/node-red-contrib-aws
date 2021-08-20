
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

		var awsService = new AWS.FSx( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.FSx(msg.AWSConfig) : awsService;

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

		
		service.AssociateFileSystemAliases=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileSystemId",params,undefined,false); 
			copyArg(n,"Aliases",params,undefined,true); 
			
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"FileSystemId",params,undefined,false); 
			copyArg(msg,"Aliases",params,undefined,true); 
			

			svc.associateFileSystemAliases(params,cb);
		}

		
		service.CancelDataRepositoryTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TaskId",params,undefined,false); 
			
			copyArg(msg,"TaskId",params,undefined,false); 
			

			svc.cancelDataRepositoryTask(params,cb);
		}

		
		service.CopyBackup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceBackupId",params,undefined,false); 
			
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"SourceBackupId",params,undefined,false); 
			copyArg(msg,"SourceRegion",params,undefined,false); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"CopyTags",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.copyBackup(params,cb);
		}

		
		service.CreateBackup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileSystemId",params,undefined,false); 
			
			copyArg(msg,"FileSystemId",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createBackup(params,cb);
		}

		
		service.CreateDataRepositoryTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Type",params,undefined,false); 
			copyArg(n,"FileSystemId",params,undefined,false); 
			copyArg(n,"Report",params,undefined,true); 
			
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"Paths",params,undefined,true); 
			copyArg(msg,"FileSystemId",params,undefined,false); 
			copyArg(msg,"Report",params,undefined,true); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createDataRepositoryTask(params,cb);
		}

		
		service.CreateFileSystem=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileSystemType",params,undefined,false); 
			copyArg(n,"StorageCapacity",params,undefined,false); 
			copyArg(n,"SubnetIds",params,undefined,true); 
			
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"FileSystemType",params,undefined,false); 
			copyArg(msg,"StorageCapacity",params,undefined,false); 
			copyArg(msg,"StorageType",params,undefined,false); 
			copyArg(msg,"SubnetIds",params,undefined,true); 
			copyArg(msg,"SecurityGroupIds",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"WindowsConfiguration",params,undefined,true); 
			copyArg(msg,"LustreConfiguration",params,undefined,true); 
			

			svc.createFileSystem(params,cb);
		}

		
		service.CreateFileSystemFromBackup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupId",params,undefined,false); 
			copyArg(n,"SubnetIds",params,undefined,true); 
			
			copyArg(msg,"BackupId",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"SubnetIds",params,undefined,true); 
			copyArg(msg,"SecurityGroupIds",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"WindowsConfiguration",params,undefined,true); 
			copyArg(msg,"LustreConfiguration",params,undefined,true); 
			copyArg(msg,"StorageType",params,undefined,false); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			

			svc.createFileSystemFromBackup(params,cb);
		}

		
		service.DeleteBackup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupId",params,undefined,false); 
			
			copyArg(msg,"BackupId",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.deleteBackup(params,cb);
		}

		
		service.DeleteFileSystem=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileSystemId",params,undefined,false); 
			
			copyArg(msg,"FileSystemId",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"WindowsConfiguration",params,undefined,false); 
			copyArg(msg,"LustreConfiguration",params,undefined,false); 
			

			svc.deleteFileSystem(params,cb);
		}

		
		service.DescribeBackups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"BackupIds",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeBackups(params,cb);
		}

		
		service.DescribeDataRepositoryTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"TaskIds",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeDataRepositoryTasks(params,cb);
		}

		
		service.DescribeFileSystemAliases=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileSystemId",params,undefined,false); 
			
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"FileSystemId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeFileSystemAliases(params,cb);
		}

		
		service.DescribeFileSystems=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"FileSystemIds",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeFileSystems(params,cb);
		}

		
		service.DisassociateFileSystemAliases=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileSystemId",params,undefined,false); 
			copyArg(n,"Aliases",params,undefined,true); 
			
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"FileSystemId",params,undefined,false); 
			copyArg(msg,"Aliases",params,undefined,true); 
			

			svc.disassociateFileSystemAliases(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateFileSystem=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileSystemId",params,undefined,false); 
			
			copyArg(msg,"FileSystemId",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"StorageCapacity",params,undefined,false); 
			copyArg(msg,"WindowsConfiguration",params,undefined,false); 
			copyArg(msg,"LustreConfiguration",params,undefined,false); 
			

			svc.updateFileSystem(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS FSx", AmazonAPINode);

};
