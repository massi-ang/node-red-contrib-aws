
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

		var awsService = new AWS.DataSync( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.DataSync(msg.AWSConfig) : awsService;

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
		
		service.CancelTaskExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TaskExecutionArn",params,undefined,false); 
			
			copyArgs(n,"TaskExecutionArn",params,undefined,false); 
			
			copyArgs(msg,"TaskExecutionArn",params,undefined,false); 
			

			svc.cancelTaskExecution(params,cb);
		}
		
		service.CreateAgent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ActivationKey",params,undefined,false); 
			
			copyArgs(n,"ActivationKey",params,undefined,false); 
			copyArgs(n,"AgentName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"VpcEndpointId",params,undefined,false); 
			copyArgs(n,"SubnetArns",params,undefined,true); 
			copyArgs(n,"SecurityGroupArns",params,undefined,true); 
			
			copyArgs(msg,"ActivationKey",params,undefined,false); 
			copyArgs(msg,"AgentName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"VpcEndpointId",params,undefined,false); 
			copyArgs(msg,"SubnetArns",params,undefined,true); 
			copyArgs(msg,"SecurityGroupArns",params,undefined,true); 
			

			svc.createAgent(params,cb);
		}
		
		service.CreateLocationEfs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EfsFilesystemArn",params,undefined,false); 
			copyArgs(n,"Ec2Config",params,undefined,true); 
			
			copyArgs(n,"Subdirectory",params,undefined,false); 
			copyArgs(n,"EfsFilesystemArn",params,undefined,false); 
			copyArgs(n,"Ec2Config",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Subdirectory",params,undefined,false); 
			copyArgs(msg,"EfsFilesystemArn",params,undefined,false); 
			copyArgs(msg,"Ec2Config",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createLocationEfs(params,cb);
		}
		
		service.CreateLocationFsxWindows=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FsxFilesystemArn",params,undefined,false); 
			copyArgs(n,"SecurityGroupArns",params,undefined,true); 
			copyArgs(n,"User",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,true); 
			
			copyArgs(n,"Subdirectory",params,undefined,false); 
			copyArgs(n,"FsxFilesystemArn",params,undefined,false); 
			copyArgs(n,"SecurityGroupArns",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"User",params,undefined,false); 
			copyArgs(n,"Domain",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,true); 
			
			copyArgs(msg,"Subdirectory",params,undefined,false); 
			copyArgs(msg,"FsxFilesystemArn",params,undefined,false); 
			copyArgs(msg,"SecurityGroupArns",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"User",params,undefined,false); 
			copyArgs(msg,"Domain",params,undefined,false); 
			copyArgs(msg,"Password",params,undefined,true); 
			

			svc.createLocationFsxWindows(params,cb);
		}
		
		service.CreateLocationNfs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Subdirectory",params,undefined,false); 
			copyArgs(n,"ServerHostname",params,undefined,false); 
			copyArgs(n,"OnPremConfig",params,undefined,true); 
			
			copyArgs(n,"Subdirectory",params,undefined,false); 
			copyArgs(n,"ServerHostname",params,undefined,false); 
			copyArgs(n,"OnPremConfig",params,undefined,true); 
			copyArgs(n,"MountOptions",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Subdirectory",params,undefined,false); 
			copyArgs(msg,"ServerHostname",params,undefined,false); 
			copyArgs(msg,"OnPremConfig",params,undefined,true); 
			copyArgs(msg,"MountOptions",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createLocationNfs(params,cb);
		}
		
		service.CreateLocationObjectStorage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerHostname",params,undefined,false); 
			copyArgs(n,"BucketName",params,undefined,false); 
			copyArgs(n,"AgentArns",params,undefined,true); 
			
			copyArgs(n,"ServerHostname",params,undefined,false); 
			copyArgs(Number(n),"ServerPort",params,undefined,false); 
			copyArgs(n,"ServerProtocol",params,undefined,false); 
			copyArgs(n,"Subdirectory",params,undefined,false); 
			copyArgs(n,"BucketName",params,undefined,false); 
			copyArgs(n,"AccessKey",params,undefined,false); 
			copyArgs(n,"SecretKey",params,undefined,true); 
			copyArgs(n,"AgentArns",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ServerHostname",params,undefined,false); 
			copyArgs(msg,"ServerPort",params,undefined,false); 
			copyArgs(msg,"ServerProtocol",params,undefined,false); 
			copyArgs(msg,"Subdirectory",params,undefined,false); 
			copyArgs(msg,"BucketName",params,undefined,false); 
			copyArgs(msg,"AccessKey",params,undefined,false); 
			copyArgs(msg,"SecretKey",params,undefined,true); 
			copyArgs(msg,"AgentArns",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createLocationObjectStorage(params,cb);
		}
		
		service.CreateLocationS3=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"S3BucketArn",params,undefined,false); 
			copyArgs(n,"S3Config",params,undefined,true); 
			
			copyArgs(n,"Subdirectory",params,undefined,false); 
			copyArgs(n,"S3BucketArn",params,undefined,false); 
			copyArgs(n,"S3StorageClass",params,undefined,false); 
			copyArgs(n,"S3Config",params,undefined,true); 
			copyArgs(n,"AgentArns",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Subdirectory",params,undefined,false); 
			copyArgs(msg,"S3BucketArn",params,undefined,false); 
			copyArgs(msg,"S3StorageClass",params,undefined,false); 
			copyArgs(msg,"S3Config",params,undefined,true); 
			copyArgs(msg,"AgentArns",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createLocationS3(params,cb);
		}
		
		service.CreateLocationSmb=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Subdirectory",params,undefined,false); 
			copyArgs(n,"ServerHostname",params,undefined,false); 
			copyArgs(n,"User",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,true); 
			copyArgs(n,"AgentArns",params,undefined,true); 
			
			copyArgs(n,"Subdirectory",params,undefined,false); 
			copyArgs(n,"ServerHostname",params,undefined,false); 
			copyArgs(n,"User",params,undefined,false); 
			copyArgs(n,"Domain",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,true); 
			copyArgs(n,"AgentArns",params,undefined,true); 
			copyArgs(n,"MountOptions",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Subdirectory",params,undefined,false); 
			copyArgs(msg,"ServerHostname",params,undefined,false); 
			copyArgs(msg,"User",params,undefined,false); 
			copyArgs(msg,"Domain",params,undefined,false); 
			copyArgs(msg,"Password",params,undefined,true); 
			copyArgs(msg,"AgentArns",params,undefined,true); 
			copyArgs(msg,"MountOptions",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createLocationSmb(params,cb);
		}
		
		service.CreateTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceLocationArn",params,undefined,false); 
			copyArgs(n,"DestinationLocationArn",params,undefined,false); 
			
			copyArgs(n,"SourceLocationArn",params,undefined,false); 
			copyArgs(n,"DestinationLocationArn",params,undefined,false); 
			copyArgs(n,"CloudWatchLogGroupArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Options",params,undefined,true); 
			copyArgs(n,"Excludes",params,undefined,true); 
			copyArgs(n,"Schedule",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"Includes",params,undefined,true); 
			
			copyArgs(msg,"SourceLocationArn",params,undefined,false); 
			copyArgs(msg,"DestinationLocationArn",params,undefined,false); 
			copyArgs(msg,"CloudWatchLogGroupArn",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Options",params,undefined,true); 
			copyArgs(msg,"Excludes",params,undefined,true); 
			copyArgs(msg,"Schedule",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"Includes",params,undefined,true); 
			

			svc.createTask(params,cb);
		}
		
		service.DeleteAgent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AgentArn",params,undefined,false); 
			
			copyArgs(n,"AgentArn",params,undefined,false); 
			
			copyArgs(msg,"AgentArn",params,undefined,false); 
			

			svc.deleteAgent(params,cb);
		}
		
		service.DeleteLocation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LocationArn",params,undefined,false); 
			
			copyArgs(n,"LocationArn",params,undefined,false); 
			
			copyArgs(msg,"LocationArn",params,undefined,false); 
			

			svc.deleteLocation(params,cb);
		}
		
		service.DeleteTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TaskArn",params,undefined,false); 
			
			copyArgs(n,"TaskArn",params,undefined,false); 
			
			copyArgs(msg,"TaskArn",params,undefined,false); 
			

			svc.deleteTask(params,cb);
		}
		
		service.DescribeAgent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AgentArn",params,undefined,false); 
			
			copyArgs(n,"AgentArn",params,undefined,false); 
			
			copyArgs(msg,"AgentArn",params,undefined,false); 
			

			svc.describeAgent(params,cb);
		}
		
		service.DescribeLocationEfs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LocationArn",params,undefined,false); 
			
			copyArgs(n,"LocationArn",params,undefined,false); 
			
			copyArgs(msg,"LocationArn",params,undefined,false); 
			

			svc.describeLocationEfs(params,cb);
		}
		
		service.DescribeLocationFsxWindows=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LocationArn",params,undefined,false); 
			
			copyArgs(n,"LocationArn",params,undefined,false); 
			
			copyArgs(msg,"LocationArn",params,undefined,false); 
			

			svc.describeLocationFsxWindows(params,cb);
		}
		
		service.DescribeLocationNfs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LocationArn",params,undefined,false); 
			
			copyArgs(n,"LocationArn",params,undefined,false); 
			
			copyArgs(msg,"LocationArn",params,undefined,false); 
			

			svc.describeLocationNfs(params,cb);
		}
		
		service.DescribeLocationObjectStorage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LocationArn",params,undefined,false); 
			
			copyArgs(n,"LocationArn",params,undefined,false); 
			
			copyArgs(msg,"LocationArn",params,undefined,false); 
			

			svc.describeLocationObjectStorage(params,cb);
		}
		
		service.DescribeLocationS3=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LocationArn",params,undefined,false); 
			
			copyArgs(n,"LocationArn",params,undefined,false); 
			
			copyArgs(msg,"LocationArn",params,undefined,false); 
			

			svc.describeLocationS3(params,cb);
		}
		
		service.DescribeLocationSmb=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LocationArn",params,undefined,false); 
			
			copyArgs(n,"LocationArn",params,undefined,false); 
			
			copyArgs(msg,"LocationArn",params,undefined,false); 
			

			svc.describeLocationSmb(params,cb);
		}
		
		service.DescribeTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TaskArn",params,undefined,false); 
			
			copyArgs(n,"TaskArn",params,undefined,false); 
			
			copyArgs(msg,"TaskArn",params,undefined,false); 
			

			svc.describeTask(params,cb);
		}
		
		service.DescribeTaskExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TaskExecutionArn",params,undefined,false); 
			
			copyArgs(n,"TaskExecutionArn",params,undefined,false); 
			
			copyArgs(msg,"TaskExecutionArn",params,undefined,false); 
			

			svc.describeTaskExecution(params,cb);
		}
		
		service.ListAgents=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listAgents(params,cb);
		}
		
		service.ListLocations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			

			svc.listLocations(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.ListTaskExecutions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TaskArn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"TaskArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listTaskExecutions(params,cb);
		}
		
		service.ListTasks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			

			svc.listTasks(params,cb);
		}
		
		service.StartTaskExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TaskArn",params,undefined,false); 
			
			copyArgs(n,"TaskArn",params,undefined,false); 
			copyArgs(n,"OverrideOptions",params,undefined,true); 
			copyArgs(n,"Includes",params,undefined,true); 
			copyArgs(n,"Excludes",params,undefined,true); 
			
			copyArgs(msg,"TaskArn",params,undefined,false); 
			copyArgs(msg,"OverrideOptions",params,undefined,true); 
			copyArgs(msg,"Includes",params,undefined,true); 
			copyArgs(msg,"Excludes",params,undefined,true); 
			

			svc.startTaskExecution(params,cb);
		}
		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Keys",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Keys",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"Keys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
		
		service.UpdateAgent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AgentArn",params,undefined,false); 
			
			copyArgs(n,"AgentArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"AgentArn",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.updateAgent(params,cb);
		}
		
		service.UpdateLocationNfs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LocationArn",params,undefined,false); 
			
			copyArgs(n,"LocationArn",params,undefined,false); 
			copyArgs(n,"Subdirectory",params,undefined,false); 
			copyArgs(n,"OnPremConfig",params,undefined,true); 
			copyArgs(n,"MountOptions",params,undefined,true); 
			
			copyArgs(msg,"LocationArn",params,undefined,false); 
			copyArgs(msg,"Subdirectory",params,undefined,false); 
			copyArgs(msg,"OnPremConfig",params,undefined,true); 
			copyArgs(msg,"MountOptions",params,undefined,true); 
			

			svc.updateLocationNfs(params,cb);
		}
		
		service.UpdateLocationObjectStorage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LocationArn",params,undefined,false); 
			
			copyArgs(n,"LocationArn",params,undefined,false); 
			copyArgs(Number(n),"ServerPort",params,undefined,false); 
			copyArgs(n,"ServerProtocol",params,undefined,false); 
			copyArgs(n,"Subdirectory",params,undefined,false); 
			copyArgs(n,"AccessKey",params,undefined,false); 
			copyArgs(n,"SecretKey",params,undefined,true); 
			copyArgs(n,"AgentArns",params,undefined,true); 
			
			copyArgs(msg,"LocationArn",params,undefined,false); 
			copyArgs(msg,"ServerPort",params,undefined,false); 
			copyArgs(msg,"ServerProtocol",params,undefined,false); 
			copyArgs(msg,"Subdirectory",params,undefined,false); 
			copyArgs(msg,"AccessKey",params,undefined,false); 
			copyArgs(msg,"SecretKey",params,undefined,true); 
			copyArgs(msg,"AgentArns",params,undefined,true); 
			

			svc.updateLocationObjectStorage(params,cb);
		}
		
		service.UpdateLocationSmb=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LocationArn",params,undefined,false); 
			
			copyArgs(n,"LocationArn",params,undefined,false); 
			copyArgs(n,"Subdirectory",params,undefined,false); 
			copyArgs(n,"User",params,undefined,false); 
			copyArgs(n,"Domain",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,true); 
			copyArgs(n,"AgentArns",params,undefined,true); 
			copyArgs(n,"MountOptions",params,undefined,true); 
			
			copyArgs(msg,"LocationArn",params,undefined,false); 
			copyArgs(msg,"Subdirectory",params,undefined,false); 
			copyArgs(msg,"User",params,undefined,false); 
			copyArgs(msg,"Domain",params,undefined,false); 
			copyArgs(msg,"Password",params,undefined,true); 
			copyArgs(msg,"AgentArns",params,undefined,true); 
			copyArgs(msg,"MountOptions",params,undefined,true); 
			

			svc.updateLocationSmb(params,cb);
		}
		
		service.UpdateTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TaskArn",params,undefined,false); 
			
			copyArgs(n,"TaskArn",params,undefined,false); 
			copyArgs(n,"Options",params,undefined,true); 
			copyArgs(n,"Excludes",params,undefined,true); 
			copyArgs(n,"Schedule",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"CloudWatchLogGroupArn",params,undefined,false); 
			copyArgs(n,"Includes",params,undefined,true); 
			
			copyArgs(msg,"TaskArn",params,undefined,false); 
			copyArgs(msg,"Options",params,undefined,true); 
			copyArgs(msg,"Excludes",params,undefined,true); 
			copyArgs(msg,"Schedule",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"CloudWatchLogGroupArn",params,undefined,false); 
			copyArgs(msg,"Includes",params,undefined,true); 
			

			svc.updateTask(params,cb);
		}
		
		service.UpdateTaskExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TaskExecutionArn",params,undefined,false); 
			copyArgs(n,"Options",params,undefined,true); 
			
			copyArgs(n,"TaskExecutionArn",params,undefined,false); 
			copyArgs(n,"Options",params,undefined,true); 
			
			copyArgs(msg,"TaskExecutionArn",params,undefined,false); 
			copyArgs(msg,"Options",params,undefined,true); 
			

			svc.updateTaskExecution(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS DataSync", AmazonAPINode);

};
