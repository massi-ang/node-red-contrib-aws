
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

		var awsService = new AWS.Mgn( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Mgn(msg.AWSConfig) : awsService;

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

		
		service.ChangeServerLifeCycleState=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"lifeCycle",params,undefined,false); 
			copyArg(n,"sourceServerID",params,undefined,false); 
			
			copyArg(msg,"lifeCycle",params,undefined,false); 
			copyArg(msg,"sourceServerID",params,undefined,false); 
			

			svc.changeServerLifeCycleState(params,cb);
		}

		
		service.CreateReplicationConfigurationTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"associateDefaultSecurityGroup",params,undefined,false); 
			copyArg(n,"bandwidthThrottling",params,undefined,false); 
			copyArg(n,"createPublicIP",params,undefined,false); 
			copyArg(n,"dataPlaneRouting",params,undefined,false); 
			copyArg(n,"defaultLargeStagingDiskType",params,undefined,false); 
			copyArg(n,"ebsEncryption",params,undefined,false); 
			copyArg(n,"replicationServerInstanceType",params,undefined,false); 
			copyArg(n,"replicationServersSecurityGroupsIDs",params,undefined,true); 
			copyArg(n,"stagingAreaSubnetId",params,undefined,false); 
			copyArg(n,"stagingAreaTags",params,undefined,true); 
			copyArg(n,"useDedicatedReplicationServer",params,undefined,false); 
			
			copyArg(msg,"associateDefaultSecurityGroup",params,undefined,false); 
			copyArg(msg,"bandwidthThrottling",params,undefined,false); 
			copyArg(msg,"createPublicIP",params,undefined,false); 
			copyArg(msg,"dataPlaneRouting",params,undefined,false); 
			copyArg(msg,"defaultLargeStagingDiskType",params,undefined,false); 
			copyArg(msg,"ebsEncryption",params,undefined,false); 
			copyArg(msg,"ebsEncryptionKeyArn",params,undefined,false); 
			copyArg(msg,"replicationServerInstanceType",params,undefined,false); 
			copyArg(msg,"replicationServersSecurityGroupsIDs",params,undefined,true); 
			copyArg(msg,"stagingAreaSubnetId",params,undefined,false); 
			copyArg(msg,"stagingAreaTags",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"useDedicatedReplicationServer",params,undefined,false); 
			

			svc.createReplicationConfigurationTemplate(params,cb);
		}

		
		service.DeleteJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobID",params,undefined,false); 
			
			copyArg(msg,"jobID",params,undefined,false); 
			

			svc.deleteJob(params,cb);
		}

		
		service.DeleteReplicationConfigurationTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"replicationConfigurationTemplateID",params,undefined,false); 
			
			copyArg(msg,"replicationConfigurationTemplateID",params,undefined,false); 
			

			svc.deleteReplicationConfigurationTemplate(params,cb);
		}

		
		service.DeleteSourceServer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"sourceServerID",params,undefined,false); 
			
			copyArg(msg,"sourceServerID",params,undefined,false); 
			

			svc.deleteSourceServer(params,cb);
		}

		
		service.DescribeJobLogItems=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobID",params,undefined,false); 
			
			copyArg(msg,"jobID",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.describeJobLogItems(params,cb);
		}

		
		service.DescribeJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"filters",params,undefined,false); 
			
			copyArg(msg,"filters",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.describeJobs(params,cb);
		}

		
		service.DescribeReplicationConfigurationTemplates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"replicationConfigurationTemplateIDs",params,undefined,false); 
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"replicationConfigurationTemplateIDs",params,undefined,false); 
			

			svc.describeReplicationConfigurationTemplates(params,cb);
		}

		
		service.DescribeSourceServers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"filters",params,undefined,false); 
			
			copyArg(msg,"filters",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.describeSourceServers(params,cb);
		}

		
		service.DisconnectFromService=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"sourceServerID",params,undefined,false); 
			
			copyArg(msg,"sourceServerID",params,undefined,false); 
			

			svc.disconnectFromService(params,cb);
		}

		
		service.FinalizeCutover=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"sourceServerID",params,undefined,false); 
			
			copyArg(msg,"sourceServerID",params,undefined,false); 
			

			svc.finalizeCutover(params,cb);
		}

		
		service.GetLaunchConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"sourceServerID",params,undefined,false); 
			
			copyArg(msg,"sourceServerID",params,undefined,false); 
			

			svc.getLaunchConfiguration(params,cb);
		}

		
		service.GetReplicationConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"sourceServerID",params,undefined,false); 
			
			copyArg(msg,"sourceServerID",params,undefined,false); 
			

			svc.getReplicationConfiguration(params,cb);
		}

		
		service.InitializeService=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.initializeService(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.MarkAsArchived=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"sourceServerID",params,undefined,false); 
			
			copyArg(msg,"sourceServerID",params,undefined,false); 
			

			svc.markAsArchived(params,cb);
		}

		
		service.RetryDataReplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"sourceServerID",params,undefined,false); 
			
			copyArg(msg,"sourceServerID",params,undefined,false); 
			

			svc.retryDataReplication(params,cb);
		}

		
		service.StartCutover=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"sourceServerIDs",params,undefined,false); 
			
			copyArg(msg,"sourceServerIDs",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.startCutover(params,cb);
		}

		
		service.StartTest=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"sourceServerIDs",params,undefined,false); 
			
			copyArg(msg,"sourceServerIDs",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.startTest(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"tags",params,undefined,true); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.TerminateTargetInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"sourceServerIDs",params,undefined,false); 
			
			copyArg(msg,"sourceServerIDs",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.terminateTargetInstances(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"tagKeys",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateLaunchConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"sourceServerID",params,undefined,false); 
			
			copyArg(msg,"copyPrivateIp",params,undefined,false); 
			copyArg(msg,"copyTags",params,undefined,false); 
			copyArg(msg,"launchDisposition",params,undefined,false); 
			copyArg(msg,"licensing",params,undefined,true); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"sourceServerID",params,undefined,false); 
			copyArg(msg,"targetInstanceTypeRightSizingMethod",params,undefined,false); 
			

			svc.updateLaunchConfiguration(params,cb);
		}

		
		service.UpdateReplicationConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"sourceServerID",params,undefined,false); 
			
			copyArg(msg,"associateDefaultSecurityGroup",params,undefined,false); 
			copyArg(msg,"bandwidthThrottling",params,undefined,false); 
			copyArg(msg,"createPublicIP",params,undefined,false); 
			copyArg(msg,"dataPlaneRouting",params,undefined,false); 
			copyArg(msg,"defaultLargeStagingDiskType",params,undefined,false); 
			copyArg(msg,"ebsEncryption",params,undefined,false); 
			copyArg(msg,"ebsEncryptionKeyArn",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"replicatedDisks",params,undefined,true); 
			copyArg(msg,"replicationServerInstanceType",params,undefined,false); 
			copyArg(msg,"replicationServersSecurityGroupsIDs",params,undefined,true); 
			copyArg(msg,"sourceServerID",params,undefined,false); 
			copyArg(msg,"stagingAreaSubnetId",params,undefined,false); 
			copyArg(msg,"stagingAreaTags",params,undefined,true); 
			copyArg(msg,"useDedicatedReplicationServer",params,undefined,false); 
			

			svc.updateReplicationConfiguration(params,cb);
		}

		
		service.UpdateReplicationConfigurationTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"replicationConfigurationTemplateID",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"associateDefaultSecurityGroup",params,undefined,false); 
			copyArg(msg,"bandwidthThrottling",params,undefined,false); 
			copyArg(msg,"createPublicIP",params,undefined,false); 
			copyArg(msg,"dataPlaneRouting",params,undefined,false); 
			copyArg(msg,"defaultLargeStagingDiskType",params,undefined,false); 
			copyArg(msg,"ebsEncryption",params,undefined,false); 
			copyArg(msg,"ebsEncryptionKeyArn",params,undefined,false); 
			copyArg(msg,"replicationConfigurationTemplateID",params,undefined,false); 
			copyArg(msg,"replicationServerInstanceType",params,undefined,false); 
			copyArg(msg,"replicationServersSecurityGroupsIDs",params,undefined,true); 
			copyArg(msg,"stagingAreaSubnetId",params,undefined,false); 
			copyArg(msg,"stagingAreaTags",params,undefined,true); 
			copyArg(msg,"useDedicatedReplicationServer",params,undefined,false); 
			

			svc.updateReplicationConfigurationTemplate(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Mgn", AmazonAPINode);

};
