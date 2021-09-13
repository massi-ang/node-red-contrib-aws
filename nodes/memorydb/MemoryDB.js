
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

		var awsService = new AWS.MemoryDB( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.MemoryDB(msg.AWSConfig) : awsService;

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
		
		service.BatchUpdateCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterNames",params,undefined,true); 
			
			copyArgs(n,"ClusterNames",params,undefined,true); 
			copyArgs(n,"ServiceUpdate",params,undefined,false); 
			
			copyArgs(msg,"ClusterNames",params,undefined,true); 
			copyArgs(msg,"ServiceUpdate",params,undefined,false); 
			

			svc.batchUpdateCluster(params,cb);
		}
		
		service.CopySnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceSnapshotName",params,undefined,false); 
			copyArgs(n,"TargetSnapshotName",params,undefined,false); 
			
			copyArgs(n,"SourceSnapshotName",params,undefined,false); 
			copyArgs(n,"TargetSnapshotName",params,undefined,false); 
			copyArgs(n,"TargetBucket",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"SourceSnapshotName",params,undefined,false); 
			copyArgs(msg,"TargetSnapshotName",params,undefined,false); 
			copyArgs(msg,"TargetBucket",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.copySnapshot(params,cb);
		}
		
		service.CreateACL=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ACLName",params,undefined,false); 
			
			copyArgs(n,"ACLName",params,undefined,false); 
			copyArgs(n,"UserNames",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ACLName",params,undefined,false); 
			copyArgs(msg,"UserNames",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createACL(params,cb);
		}
		
		service.CreateCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterName",params,undefined,false); 
			copyArgs(n,"NodeType",params,undefined,false); 
			copyArgs(n,"ACLName",params,undefined,false); 
			
			copyArgs(n,"ClusterName",params,undefined,false); 
			copyArgs(n,"NodeType",params,undefined,false); 
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(Number(n),"NumShards",params,undefined,false); 
			copyArgs(Number(n),"NumReplicasPerShard",params,undefined,false); 
			copyArgs(n,"SubnetGroupName",params,undefined,false); 
			copyArgs(n,"SecurityGroupIds",params,undefined,true); 
			copyArgs(n,"MaintenanceWindow",params,undefined,false); 
			copyArgs(Number(n),"Port",params,undefined,false); 
			copyArgs(n,"SnsTopicArn",params,undefined,false); 
			copyArgs(Boolean(n),"TLSEnabled",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"SnapshotArns",params,undefined,false); 
			copyArgs(n,"SnapshotName",params,undefined,false); 
			copyArgs(Number(n),"SnapshotRetentionLimit",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"SnapshotWindow",params,undefined,false); 
			copyArgs(n,"ACLName",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(Boolean(n),"AutoMinorVersionUpgrade",params,undefined,false); 
			
			copyArgs(msg,"ClusterName",params,undefined,false); 
			copyArgs(msg,"NodeType",params,undefined,false); 
			copyArgs(msg,"ParameterGroupName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"NumShards",params,undefined,false); 
			copyArgs(msg,"NumReplicasPerShard",params,undefined,false); 
			copyArgs(msg,"SubnetGroupName",params,undefined,false); 
			copyArgs(msg,"SecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"MaintenanceWindow",params,undefined,false); 
			copyArgs(msg,"Port",params,undefined,false); 
			copyArgs(msg,"SnsTopicArn",params,undefined,false); 
			copyArgs(msg,"TLSEnabled",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"SnapshotArns",params,undefined,false); 
			copyArgs(msg,"SnapshotName",params,undefined,false); 
			copyArgs(msg,"SnapshotRetentionLimit",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"SnapshotWindow",params,undefined,false); 
			copyArgs(msg,"ACLName",params,undefined,false); 
			copyArgs(msg,"EngineVersion",params,undefined,false); 
			copyArgs(msg,"AutoMinorVersionUpgrade",params,undefined,false); 
			

			svc.createCluster(params,cb);
		}
		
		service.CreateParameterGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			copyArgs(n,"Family",params,undefined,false); 
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			copyArgs(n,"Family",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ParameterGroupName",params,undefined,false); 
			copyArgs(msg,"Family",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createParameterGroup(params,cb);
		}
		
		service.CreateSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterName",params,undefined,false); 
			copyArgs(n,"SnapshotName",params,undefined,false); 
			
			copyArgs(n,"ClusterName",params,undefined,false); 
			copyArgs(n,"SnapshotName",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ClusterName",params,undefined,false); 
			copyArgs(msg,"SnapshotName",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createSnapshot(params,cb);
		}
		
		service.CreateSubnetGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubnetGroupName",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			
			copyArgs(n,"SubnetGroupName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"SubnetGroupName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"SubnetIds",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createSubnetGroup(params,cb);
		}
		
		service.CreateUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"AuthenticationMode",params,undefined,true); 
			copyArgs(n,"AccessString",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"AuthenticationMode",params,undefined,true); 
			copyArgs(n,"AccessString",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"AuthenticationMode",params,undefined,true); 
			copyArgs(msg,"AccessString",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createUser(params,cb);
		}
		
		service.DeleteACL=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ACLName",params,undefined,false); 
			
			copyArgs(n,"ACLName",params,undefined,false); 
			
			copyArgs(msg,"ACLName",params,undefined,false); 
			

			svc.deleteACL(params,cb);
		}
		
		service.DeleteCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterName",params,undefined,false); 
			
			copyArgs(n,"ClusterName",params,undefined,false); 
			copyArgs(n,"FinalSnapshotName",params,undefined,false); 
			
			copyArgs(msg,"ClusterName",params,undefined,false); 
			copyArgs(msg,"FinalSnapshotName",params,undefined,false); 
			

			svc.deleteCluster(params,cb);
		}
		
		service.DeleteParameterGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			
			copyArgs(msg,"ParameterGroupName",params,undefined,false); 
			

			svc.deleteParameterGroup(params,cb);
		}
		
		service.DeleteSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SnapshotName",params,undefined,false); 
			
			copyArgs(n,"SnapshotName",params,undefined,false); 
			
			copyArgs(msg,"SnapshotName",params,undefined,false); 
			

			svc.deleteSnapshot(params,cb);
		}
		
		service.DeleteSubnetGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubnetGroupName",params,undefined,false); 
			
			copyArgs(n,"SubnetGroupName",params,undefined,false); 
			
			copyArgs(msg,"SubnetGroupName",params,undefined,false); 
			

			svc.deleteSubnetGroup(params,cb);
		}
		
		service.DeleteUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			

			svc.deleteUser(params,cb);
		}
		
		service.DescribeACLs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ACLName",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ACLName",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeACLs(params,cb);
		}
		
		service.DescribeClusters=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ClusterName",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"ShowShardDetails",params,undefined,false); 
			
			copyArgs(msg,"ClusterName",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"ShowShardDetails",params,undefined,false); 
			

			svc.describeClusters(params,cb);
		}
		
		service.DescribeEngineVersions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(n,"ParameterGroupFamily",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DefaultOnly",params,undefined,false); 
			
			copyArgs(msg,"EngineVersion",params,undefined,false); 
			copyArgs(msg,"ParameterGroupFamily",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DefaultOnly",params,undefined,false); 
			

			svc.describeEngineVersions(params,cb);
		}
		
		service.DescribeEvents=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SourceName",params,undefined,false); 
			copyArgs(n,"SourceType",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(Number(n),"Duration",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"SourceName",params,undefined,false); 
			copyArgs(msg,"SourceType",params,undefined,false); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"Duration",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeEvents(params,cb);
		}
		
		service.DescribeParameterGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ParameterGroupName",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeParameterGroups(params,cb);
		}
		
		service.DescribeParameters=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ParameterGroupName",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeParameters(params,cb);
		}
		
		service.DescribeServiceUpdates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ServiceUpdateName",params,undefined,false); 
			copyArgs(n,"ClusterNames",params,undefined,true); 
			copyArgs(n,"Status",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ServiceUpdateName",params,undefined,false); 
			copyArgs(msg,"ClusterNames",params,undefined,true); 
			copyArgs(msg,"Status",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeServiceUpdates(params,cb);
		}
		
		service.DescribeSnapshots=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ClusterName",params,undefined,false); 
			copyArgs(n,"SnapshotName",params,undefined,false); 
			copyArgs(n,"Source",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(Boolean(n),"ShowDetail",params,undefined,false); 
			
			copyArgs(msg,"ClusterName",params,undefined,false); 
			copyArgs(msg,"SnapshotName",params,undefined,false); 
			copyArgs(msg,"Source",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"ShowDetail",params,undefined,false); 
			

			svc.describeSnapshots(params,cb);
		}
		
		service.DescribeSubnetGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SubnetGroupName",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"SubnetGroupName",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeSubnetGroups(params,cb);
		}
		
		service.DescribeUsers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeUsers(params,cb);
		}
		
		service.FailoverShard=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterName",params,undefined,false); 
			copyArgs(n,"ShardName",params,undefined,false); 
			
			copyArgs(n,"ClusterName",params,undefined,false); 
			copyArgs(n,"ShardName",params,undefined,false); 
			
			copyArgs(msg,"ClusterName",params,undefined,false); 
			copyArgs(msg,"ShardName",params,undefined,false); 
			

			svc.failoverShard(params,cb);
		}
		
		service.ListAllowedNodeTypeUpdates=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterName",params,undefined,false); 
			
			copyArgs(n,"ClusterName",params,undefined,false); 
			
			copyArgs(msg,"ClusterName",params,undefined,false); 
			

			svc.listAllowedNodeTypeUpdates(params,cb);
		}
		
		service.ListTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTags(params,cb);
		}
		
		service.ResetParameterGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			copyArgs(Boolean(n),"AllParameters",params,undefined,false); 
			copyArgs(n,"ParameterNames",params,undefined,false); 
			
			copyArgs(msg,"ParameterGroupName",params,undefined,false); 
			copyArgs(msg,"AllParameters",params,undefined,false); 
			copyArgs(msg,"ParameterNames",params,undefined,false); 
			

			svc.resetParameterGroup(params,cb);
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
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
		
		service.UpdateACL=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ACLName",params,undefined,false); 
			
			copyArgs(n,"ACLName",params,undefined,false); 
			copyArgs(n,"UserNamesToAdd",params,undefined,true); 
			copyArgs(n,"UserNamesToRemove",params,undefined,true); 
			
			copyArgs(msg,"ACLName",params,undefined,false); 
			copyArgs(msg,"UserNamesToAdd",params,undefined,true); 
			copyArgs(msg,"UserNamesToRemove",params,undefined,true); 
			

			svc.updateACL(params,cb);
		}
		
		service.UpdateCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterName",params,undefined,false); 
			
			copyArgs(n,"ClusterName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"SecurityGroupIds",params,undefined,true); 
			copyArgs(n,"MaintenanceWindow",params,undefined,false); 
			copyArgs(n,"SnsTopicArn",params,undefined,false); 
			copyArgs(n,"SnsTopicStatus",params,undefined,false); 
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			copyArgs(n,"SnapshotWindow",params,undefined,false); 
			copyArgs(Number(n),"SnapshotRetentionLimit",params,undefined,false); 
			copyArgs(n,"NodeType",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(n,"ReplicaConfiguration",params,undefined,false); 
			copyArgs(n,"ShardConfiguration",params,undefined,false); 
			copyArgs(n,"ACLName",params,undefined,false); 
			
			copyArgs(msg,"ClusterName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"SecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"MaintenanceWindow",params,undefined,false); 
			copyArgs(msg,"SnsTopicArn",params,undefined,false); 
			copyArgs(msg,"SnsTopicStatus",params,undefined,false); 
			copyArgs(msg,"ParameterGroupName",params,undefined,false); 
			copyArgs(msg,"SnapshotWindow",params,undefined,false); 
			copyArgs(msg,"SnapshotRetentionLimit",params,undefined,false); 
			copyArgs(msg,"NodeType",params,undefined,false); 
			copyArgs(msg,"EngineVersion",params,undefined,false); 
			copyArgs(msg,"ReplicaConfiguration",params,undefined,false); 
			copyArgs(msg,"ShardConfiguration",params,undefined,false); 
			copyArgs(msg,"ACLName",params,undefined,false); 
			

			svc.updateCluster(params,cb);
		}
		
		service.UpdateParameterGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			copyArgs(n,"ParameterNameValues",params,undefined,false); 
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			copyArgs(n,"ParameterNameValues",params,undefined,false); 
			
			copyArgs(msg,"ParameterGroupName",params,undefined,false); 
			copyArgs(msg,"ParameterNameValues",params,undefined,false); 
			

			svc.updateParameterGroup(params,cb);
		}
		
		service.UpdateSubnetGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubnetGroupName",params,undefined,false); 
			
			copyArgs(n,"SubnetGroupName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			
			copyArgs(msg,"SubnetGroupName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"SubnetIds",params,undefined,true); 
			

			svc.updateSubnetGroup(params,cb);
		}
		
		service.UpdateUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"AuthenticationMode",params,undefined,true); 
			copyArgs(n,"AccessString",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"AuthenticationMode",params,undefined,true); 
			copyArgs(msg,"AccessString",params,undefined,false); 
			

			svc.updateUser(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS MemoryDB", AmazonAPINode);

};
