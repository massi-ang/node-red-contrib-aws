
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

		var awsService = new AWS.Mgn( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Mgn(msg.AWSConfig) : awsService;

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
		
			service.ChangeServerLifeCycleState=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"lifeCycle",params,undefined,false); 
			copyArgs(n,"sourceServerID",params,undefined,false); 
			
			copyArgs(n,"lifeCycle",params,undefined,false); 
			copyArgs(n,"sourceServerID",params,undefined,false); 
			
			copyArgs(msg,"lifeCycle",params,undefined,false); 
			copyArgs(msg,"sourceServerID",params,undefined,false); 
			

			svc.changeServerLifeCycleState(params,cb);
		}
			service.CreateReplicationConfigurationTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(Boolean(n),"associateDefaultSecurityGroup",params,undefined,false); 
			copyArgs(n,"bandwidthThrottling",params,undefined,false); 
			copyArgs(Boolean(n),"createPublicIP",params,undefined,false); 
			copyArgs(n,"dataPlaneRouting",params,undefined,false); 
			copyArgs(n,"defaultLargeStagingDiskType",params,undefined,false); 
			copyArgs(n,"ebsEncryption",params,undefined,false); 
			copyArgs(n,"replicationServerInstanceType",params,undefined,false); 
			copyArgs(n,"replicationServersSecurityGroupsIDs",params,undefined,true); 
			copyArgs(n,"stagingAreaSubnetId",params,undefined,false); 
			copyArgs(n,"stagingAreaTags",params,undefined,true); 
			copyArgs(Boolean(n),"useDedicatedReplicationServer",params,undefined,false); 
			
			copyArgs(Boolean(n),"associateDefaultSecurityGroup",params,undefined,false); 
			copyArgs(n,"bandwidthThrottling",params,undefined,false); 
			copyArgs(Boolean(n),"createPublicIP",params,undefined,false); 
			copyArgs(n,"dataPlaneRouting",params,undefined,false); 
			copyArgs(n,"defaultLargeStagingDiskType",params,undefined,false); 
			copyArgs(n,"ebsEncryption",params,undefined,false); 
			copyArgs(n,"ebsEncryptionKeyArn",params,undefined,false); 
			copyArgs(n,"replicationServerInstanceType",params,undefined,false); 
			copyArgs(n,"replicationServersSecurityGroupsIDs",params,undefined,true); 
			copyArgs(n,"stagingAreaSubnetId",params,undefined,false); 
			copyArgs(n,"stagingAreaTags",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(Boolean(n),"useDedicatedReplicationServer",params,undefined,false); 
			
			copyArgs(msg,"associateDefaultSecurityGroup",params,undefined,false); 
			copyArgs(msg,"bandwidthThrottling",params,undefined,false); 
			copyArgs(msg,"createPublicIP",params,undefined,false); 
			copyArgs(msg,"dataPlaneRouting",params,undefined,false); 
			copyArgs(msg,"defaultLargeStagingDiskType",params,undefined,false); 
			copyArgs(msg,"ebsEncryption",params,undefined,false); 
			copyArgs(msg,"ebsEncryptionKeyArn",params,undefined,false); 
			copyArgs(msg,"replicationServerInstanceType",params,undefined,false); 
			copyArgs(msg,"replicationServersSecurityGroupsIDs",params,undefined,true); 
			copyArgs(msg,"stagingAreaSubnetId",params,undefined,false); 
			copyArgs(msg,"stagingAreaTags",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"useDedicatedReplicationServer",params,undefined,false); 
			

			svc.createReplicationConfigurationTemplate(params,cb);
		}
			service.DeleteJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobID",params,undefined,false); 
			
			copyArgs(n,"jobID",params,undefined,false); 
			
			copyArgs(msg,"jobID",params,undefined,false); 
			

			svc.deleteJob(params,cb);
		}
			service.DeleteReplicationConfigurationTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"replicationConfigurationTemplateID",params,undefined,false); 
			
			copyArgs(n,"replicationConfigurationTemplateID",params,undefined,false); 
			
			copyArgs(msg,"replicationConfigurationTemplateID",params,undefined,false); 
			

			svc.deleteReplicationConfigurationTemplate(params,cb);
		}
			service.DeleteSourceServer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"sourceServerID",params,undefined,false); 
			
			copyArgs(n,"sourceServerID",params,undefined,false); 
			
			copyArgs(msg,"sourceServerID",params,undefined,false); 
			

			svc.deleteSourceServer(params,cb);
		}
			service.DescribeJobLogItems=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobID",params,undefined,false); 
			
			copyArgs(n,"jobID",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"jobID",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.describeJobLogItems(params,cb);
		}
			service.DescribeJobs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"filters",params,undefined,false); 
			
			copyArgs(n,"filters",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"filters",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.describeJobs(params,cb);
		}
			service.DescribeReplicationConfigurationTemplates=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"replicationConfigurationTemplateIDs",params,undefined,false); 
			
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"replicationConfigurationTemplateIDs",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"replicationConfigurationTemplateIDs",params,undefined,false); 
			

			svc.describeReplicationConfigurationTemplates(params,cb);
		}
			service.DescribeSourceServers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"filters",params,undefined,false); 
			
			copyArgs(n,"filters",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"filters",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.describeSourceServers(params,cb);
		}
			service.DisconnectFromService=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"sourceServerID",params,undefined,false); 
			
			copyArgs(n,"sourceServerID",params,undefined,false); 
			
			copyArgs(msg,"sourceServerID",params,undefined,false); 
			

			svc.disconnectFromService(params,cb);
		}
			service.FinalizeCutover=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"sourceServerID",params,undefined,false); 
			
			copyArgs(n,"sourceServerID",params,undefined,false); 
			
			copyArgs(msg,"sourceServerID",params,undefined,false); 
			

			svc.finalizeCutover(params,cb);
		}
			service.GetLaunchConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"sourceServerID",params,undefined,false); 
			
			copyArgs(n,"sourceServerID",params,undefined,false); 
			
			copyArgs(msg,"sourceServerID",params,undefined,false); 
			

			svc.getLaunchConfiguration(params,cb);
		}
			service.GetReplicationConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"sourceServerID",params,undefined,false); 
			
			copyArgs(n,"sourceServerID",params,undefined,false); 
			
			copyArgs(msg,"sourceServerID",params,undefined,false); 
			

			svc.getReplicationConfiguration(params,cb);
		}
			service.InitializeService=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.initializeService(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.MarkAsArchived=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"sourceServerID",params,undefined,false); 
			
			copyArgs(n,"sourceServerID",params,undefined,false); 
			
			copyArgs(msg,"sourceServerID",params,undefined,false); 
			

			svc.markAsArchived(params,cb);
		}
			service.RetryDataReplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"sourceServerID",params,undefined,false); 
			
			copyArgs(n,"sourceServerID",params,undefined,false); 
			
			copyArgs(msg,"sourceServerID",params,undefined,false); 
			

			svc.retryDataReplication(params,cb);
		}
			service.StartCutover=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"sourceServerIDs",params,undefined,false); 
			
			copyArgs(n,"sourceServerIDs",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"sourceServerIDs",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.startCutover(params,cb);
		}
			service.StartTest=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"sourceServerIDs",params,undefined,false); 
			
			copyArgs(n,"sourceServerIDs",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"sourceServerIDs",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.startTest(params,cb);
		}
			service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
			service.TerminateTargetInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"sourceServerIDs",params,undefined,false); 
			
			copyArgs(n,"sourceServerIDs",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"sourceServerIDs",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.terminateTargetInstances(params,cb);
		}
			service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
			service.UpdateLaunchConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"sourceServerID",params,undefined,false); 
			
			copyArgs(Boolean(n),"copyPrivateIp",params,undefined,false); 
			copyArgs(Boolean(n),"copyTags",params,undefined,false); 
			copyArgs(n,"launchDisposition",params,undefined,false); 
			copyArgs(n,"licensing",params,undefined,true); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"sourceServerID",params,undefined,false); 
			copyArgs(n,"targetInstanceTypeRightSizingMethod",params,undefined,false); 
			
			copyArgs(msg,"copyPrivateIp",params,undefined,false); 
			copyArgs(msg,"copyTags",params,undefined,false); 
			copyArgs(msg,"launchDisposition",params,undefined,false); 
			copyArgs(msg,"licensing",params,undefined,true); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"sourceServerID",params,undefined,false); 
			copyArgs(msg,"targetInstanceTypeRightSizingMethod",params,undefined,false); 
			

			svc.updateLaunchConfiguration(params,cb);
		}
			service.UpdateReplicationConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"sourceServerID",params,undefined,false); 
			
			copyArgs(Boolean(n),"associateDefaultSecurityGroup",params,undefined,false); 
			copyArgs(n,"bandwidthThrottling",params,undefined,false); 
			copyArgs(Boolean(n),"createPublicIP",params,undefined,false); 
			copyArgs(n,"dataPlaneRouting",params,undefined,false); 
			copyArgs(n,"defaultLargeStagingDiskType",params,undefined,false); 
			copyArgs(n,"ebsEncryption",params,undefined,false); 
			copyArgs(n,"ebsEncryptionKeyArn",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"replicatedDisks",params,undefined,true); 
			copyArgs(n,"replicationServerInstanceType",params,undefined,false); 
			copyArgs(n,"replicationServersSecurityGroupsIDs",params,undefined,true); 
			copyArgs(n,"sourceServerID",params,undefined,false); 
			copyArgs(n,"stagingAreaSubnetId",params,undefined,false); 
			copyArgs(n,"stagingAreaTags",params,undefined,true); 
			copyArgs(Boolean(n),"useDedicatedReplicationServer",params,undefined,false); 
			
			copyArgs(msg,"associateDefaultSecurityGroup",params,undefined,false); 
			copyArgs(msg,"bandwidthThrottling",params,undefined,false); 
			copyArgs(msg,"createPublicIP",params,undefined,false); 
			copyArgs(msg,"dataPlaneRouting",params,undefined,false); 
			copyArgs(msg,"defaultLargeStagingDiskType",params,undefined,false); 
			copyArgs(msg,"ebsEncryption",params,undefined,false); 
			copyArgs(msg,"ebsEncryptionKeyArn",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"replicatedDisks",params,undefined,true); 
			copyArgs(msg,"replicationServerInstanceType",params,undefined,false); 
			copyArgs(msg,"replicationServersSecurityGroupsIDs",params,undefined,true); 
			copyArgs(msg,"sourceServerID",params,undefined,false); 
			copyArgs(msg,"stagingAreaSubnetId",params,undefined,false); 
			copyArgs(msg,"stagingAreaTags",params,undefined,true); 
			copyArgs(msg,"useDedicatedReplicationServer",params,undefined,false); 
			

			svc.updateReplicationConfiguration(params,cb);
		}
			service.UpdateReplicationConfigurationTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"replicationConfigurationTemplateID",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(Boolean(n),"associateDefaultSecurityGroup",params,undefined,false); 
			copyArgs(n,"bandwidthThrottling",params,undefined,false); 
			copyArgs(Boolean(n),"createPublicIP",params,undefined,false); 
			copyArgs(n,"dataPlaneRouting",params,undefined,false); 
			copyArgs(n,"defaultLargeStagingDiskType",params,undefined,false); 
			copyArgs(n,"ebsEncryption",params,undefined,false); 
			copyArgs(n,"ebsEncryptionKeyArn",params,undefined,false); 
			copyArgs(n,"replicationConfigurationTemplateID",params,undefined,false); 
			copyArgs(n,"replicationServerInstanceType",params,undefined,false); 
			copyArgs(n,"replicationServersSecurityGroupsIDs",params,undefined,true); 
			copyArgs(n,"stagingAreaSubnetId",params,undefined,false); 
			copyArgs(n,"stagingAreaTags",params,undefined,true); 
			copyArgs(Boolean(n),"useDedicatedReplicationServer",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"associateDefaultSecurityGroup",params,undefined,false); 
			copyArgs(msg,"bandwidthThrottling",params,undefined,false); 
			copyArgs(msg,"createPublicIP",params,undefined,false); 
			copyArgs(msg,"dataPlaneRouting",params,undefined,false); 
			copyArgs(msg,"defaultLargeStagingDiskType",params,undefined,false); 
			copyArgs(msg,"ebsEncryption",params,undefined,false); 
			copyArgs(msg,"ebsEncryptionKeyArn",params,undefined,false); 
			copyArgs(msg,"replicationConfigurationTemplateID",params,undefined,false); 
			copyArgs(msg,"replicationServerInstanceType",params,undefined,false); 
			copyArgs(msg,"replicationServersSecurityGroupsIDs",params,undefined,true); 
			copyArgs(msg,"stagingAreaSubnetId",params,undefined,false); 
			copyArgs(msg,"stagingAreaTags",params,undefined,true); 
			copyArgs(msg,"useDedicatedReplicationServer",params,undefined,false); 
			

			svc.updateReplicationConfigurationTemplate(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS Mgn", AmazonAPINode);

};
