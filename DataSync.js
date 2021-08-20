
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

		var awsService = new AWS.DataSync( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.DataSync(msg.AWSConfig) : awsService;

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

		
		service.CancelTaskExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TaskExecutionArn",params,undefined,false); 
			
			copyArg(msg,"TaskExecutionArn",params,undefined,false); 
			

			svc.cancelTaskExecution(params,cb);
		}

		
		service.CreateAgent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ActivationKey",params,undefined,false); 
			
			copyArg(msg,"ActivationKey",params,undefined,false); 
			copyArg(msg,"AgentName",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"VpcEndpointId",params,undefined,false); 
			copyArg(msg,"SubnetArns",params,undefined,true); 
			copyArg(msg,"SecurityGroupArns",params,undefined,true); 
			

			svc.createAgent(params,cb);
		}

		
		service.CreateLocationEfs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EfsFilesystemArn",params,undefined,false); 
			copyArg(n,"Ec2Config",params,undefined,true); 
			
			copyArg(msg,"Subdirectory",params,undefined,false); 
			copyArg(msg,"EfsFilesystemArn",params,undefined,false); 
			copyArg(msg,"Ec2Config",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createLocationEfs(params,cb);
		}

		
		service.CreateLocationFsxWindows=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FsxFilesystemArn",params,undefined,false); 
			copyArg(n,"SecurityGroupArns",params,undefined,true); 
			copyArg(n,"User",params,undefined,false); 
			copyArg(n,"Password",params,undefined,true); 
			
			copyArg(msg,"Subdirectory",params,undefined,false); 
			copyArg(msg,"FsxFilesystemArn",params,undefined,false); 
			copyArg(msg,"SecurityGroupArns",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"User",params,undefined,false); 
			copyArg(msg,"Domain",params,undefined,false); 
			copyArg(msg,"Password",params,undefined,true); 
			

			svc.createLocationFsxWindows(params,cb);
		}

		
		service.CreateLocationNfs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Subdirectory",params,undefined,false); 
			copyArg(n,"ServerHostname",params,undefined,false); 
			copyArg(n,"OnPremConfig",params,undefined,true); 
			
			copyArg(msg,"Subdirectory",params,undefined,false); 
			copyArg(msg,"ServerHostname",params,undefined,false); 
			copyArg(msg,"OnPremConfig",params,undefined,true); 
			copyArg(msg,"MountOptions",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createLocationNfs(params,cb);
		}

		
		service.CreateLocationObjectStorage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerHostname",params,undefined,false); 
			copyArg(n,"BucketName",params,undefined,false); 
			copyArg(n,"AgentArns",params,undefined,true); 
			
			copyArg(msg,"ServerHostname",params,undefined,false); 
			copyArg(msg,"ServerPort",params,undefined,false); 
			copyArg(msg,"ServerProtocol",params,undefined,false); 
			copyArg(msg,"Subdirectory",params,undefined,false); 
			copyArg(msg,"BucketName",params,undefined,false); 
			copyArg(msg,"AccessKey",params,undefined,false); 
			copyArg(msg,"SecretKey",params,undefined,true); 
			copyArg(msg,"AgentArns",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createLocationObjectStorage(params,cb);
		}

		
		service.CreateLocationS3=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"S3BucketArn",params,undefined,false); 
			copyArg(n,"S3Config",params,undefined,true); 
			
			copyArg(msg,"Subdirectory",params,undefined,false); 
			copyArg(msg,"S3BucketArn",params,undefined,false); 
			copyArg(msg,"S3StorageClass",params,undefined,false); 
			copyArg(msg,"S3Config",params,undefined,true); 
			copyArg(msg,"AgentArns",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createLocationS3(params,cb);
		}

		
		service.CreateLocationSmb=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Subdirectory",params,undefined,false); 
			copyArg(n,"ServerHostname",params,undefined,false); 
			copyArg(n,"User",params,undefined,false); 
			copyArg(n,"Password",params,undefined,true); 
			copyArg(n,"AgentArns",params,undefined,true); 
			
			copyArg(msg,"Subdirectory",params,undefined,false); 
			copyArg(msg,"ServerHostname",params,undefined,false); 
			copyArg(msg,"User",params,undefined,false); 
			copyArg(msg,"Domain",params,undefined,false); 
			copyArg(msg,"Password",params,undefined,true); 
			copyArg(msg,"AgentArns",params,undefined,true); 
			copyArg(msg,"MountOptions",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createLocationSmb(params,cb);
		}

		
		service.CreateTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceLocationArn",params,undefined,false); 
			copyArg(n,"DestinationLocationArn",params,undefined,false); 
			
			copyArg(msg,"SourceLocationArn",params,undefined,false); 
			copyArg(msg,"DestinationLocationArn",params,undefined,false); 
			copyArg(msg,"CloudWatchLogGroupArn",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Options",params,undefined,true); 
			copyArg(msg,"Excludes",params,undefined,true); 
			copyArg(msg,"Schedule",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createTask(params,cb);
		}

		
		service.DeleteAgent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AgentArn",params,undefined,false); 
			
			copyArg(msg,"AgentArn",params,undefined,false); 
			

			svc.deleteAgent(params,cb);
		}

		
		service.DeleteLocation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LocationArn",params,undefined,false); 
			
			copyArg(msg,"LocationArn",params,undefined,false); 
			

			svc.deleteLocation(params,cb);
		}

		
		service.DeleteTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TaskArn",params,undefined,false); 
			
			copyArg(msg,"TaskArn",params,undefined,false); 
			

			svc.deleteTask(params,cb);
		}

		
		service.DescribeAgent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AgentArn",params,undefined,false); 
			
			copyArg(msg,"AgentArn",params,undefined,false); 
			

			svc.describeAgent(params,cb);
		}

		
		service.DescribeLocationEfs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LocationArn",params,undefined,false); 
			
			copyArg(msg,"LocationArn",params,undefined,false); 
			

			svc.describeLocationEfs(params,cb);
		}

		
		service.DescribeLocationFsxWindows=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LocationArn",params,undefined,false); 
			
			copyArg(msg,"LocationArn",params,undefined,false); 
			

			svc.describeLocationFsxWindows(params,cb);
		}

		
		service.DescribeLocationNfs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LocationArn",params,undefined,false); 
			
			copyArg(msg,"LocationArn",params,undefined,false); 
			

			svc.describeLocationNfs(params,cb);
		}

		
		service.DescribeLocationObjectStorage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LocationArn",params,undefined,false); 
			
			copyArg(msg,"LocationArn",params,undefined,false); 
			

			svc.describeLocationObjectStorage(params,cb);
		}

		
		service.DescribeLocationS3=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LocationArn",params,undefined,false); 
			
			copyArg(msg,"LocationArn",params,undefined,false); 
			

			svc.describeLocationS3(params,cb);
		}

		
		service.DescribeLocationSmb=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LocationArn",params,undefined,false); 
			
			copyArg(msg,"LocationArn",params,undefined,false); 
			

			svc.describeLocationSmb(params,cb);
		}

		
		service.DescribeTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TaskArn",params,undefined,false); 
			
			copyArg(msg,"TaskArn",params,undefined,false); 
			

			svc.describeTask(params,cb);
		}

		
		service.DescribeTaskExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TaskExecutionArn",params,undefined,false); 
			
			copyArg(msg,"TaskExecutionArn",params,undefined,false); 
			

			svc.describeTaskExecution(params,cb);
		}

		
		service.ListAgents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listAgents(params,cb);
		}

		
		service.ListLocations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			

			svc.listLocations(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListTaskExecutions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"TaskArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listTaskExecutions(params,cb);
		}

		
		service.ListTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			

			svc.listTasks(params,cb);
		}

		
		service.StartTaskExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TaskArn",params,undefined,false); 
			
			copyArg(msg,"TaskArn",params,undefined,false); 
			copyArg(msg,"OverrideOptions",params,undefined,true); 
			copyArg(msg,"Includes",params,undefined,true); 
			

			svc.startTaskExecution(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"Keys",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"Keys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateAgent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AgentArn",params,undefined,false); 
			
			copyArg(msg,"AgentArn",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.updateAgent(params,cb);
		}

		
		service.UpdateLocationNfs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LocationArn",params,undefined,false); 
			
			copyArg(msg,"LocationArn",params,undefined,false); 
			copyArg(msg,"Subdirectory",params,undefined,false); 
			copyArg(msg,"OnPremConfig",params,undefined,true); 
			copyArg(msg,"MountOptions",params,undefined,true); 
			

			svc.updateLocationNfs(params,cb);
		}

		
		service.UpdateLocationObjectStorage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LocationArn",params,undefined,false); 
			
			copyArg(msg,"LocationArn",params,undefined,false); 
			copyArg(msg,"ServerPort",params,undefined,false); 
			copyArg(msg,"ServerProtocol",params,undefined,false); 
			copyArg(msg,"Subdirectory",params,undefined,false); 
			copyArg(msg,"AccessKey",params,undefined,false); 
			copyArg(msg,"SecretKey",params,undefined,true); 
			copyArg(msg,"AgentArns",params,undefined,true); 
			

			svc.updateLocationObjectStorage(params,cb);
		}

		
		service.UpdateLocationSmb=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LocationArn",params,undefined,false); 
			
			copyArg(msg,"LocationArn",params,undefined,false); 
			copyArg(msg,"Subdirectory",params,undefined,false); 
			copyArg(msg,"User",params,undefined,false); 
			copyArg(msg,"Domain",params,undefined,false); 
			copyArg(msg,"Password",params,undefined,true); 
			copyArg(msg,"AgentArns",params,undefined,true); 
			copyArg(msg,"MountOptions",params,undefined,true); 
			

			svc.updateLocationSmb(params,cb);
		}

		
		service.UpdateTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TaskArn",params,undefined,false); 
			
			copyArg(msg,"TaskArn",params,undefined,false); 
			copyArg(msg,"Options",params,undefined,true); 
			copyArg(msg,"Excludes",params,undefined,true); 
			copyArg(msg,"Schedule",params,undefined,true); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"CloudWatchLogGroupArn",params,undefined,false); 
			

			svc.updateTask(params,cb);
		}

		
		service.UpdateTaskExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TaskExecutionArn",params,undefined,false); 
			copyArg(n,"Options",params,undefined,true); 
			
			copyArg(msg,"TaskExecutionArn",params,undefined,false); 
			copyArg(msg,"Options",params,undefined,true); 
			

			svc.updateTaskExecution(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS DataSync", AmazonAPINode);

};
