
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

		var awsService = new AWS.ElastiCache( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.ElastiCache(msg.AWSConfig) : awsService;

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
		
			service.AddTagsToResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.addTagsToResource(params,cb);
		}
			service.AuthorizeCacheSecurityGroupIngress=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CacheSecurityGroupName",params,undefined,false); 
			copyArgs(n,"EC2SecurityGroupName",params,undefined,false); 
			copyArgs(n,"EC2SecurityGroupOwnerId",params,undefined,false); 
			
			copyArgs(n,"CacheSecurityGroupName",params,undefined,false); 
			copyArgs(n,"EC2SecurityGroupName",params,undefined,false); 
			copyArgs(n,"EC2SecurityGroupOwnerId",params,undefined,false); 
			
			copyArgs(msg,"CacheSecurityGroupName",params,undefined,false); 
			copyArgs(msg,"EC2SecurityGroupName",params,undefined,false); 
			copyArgs(msg,"EC2SecurityGroupOwnerId",params,undefined,false); 
			

			svc.authorizeCacheSecurityGroupIngress(params,cb);
		}
			service.BatchApplyUpdateAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServiceUpdateName",params,undefined,false); 
			
			copyArgs(n,"ReplicationGroupIds",params,undefined,true); 
			copyArgs(n,"CacheClusterIds",params,undefined,true); 
			copyArgs(n,"ServiceUpdateName",params,undefined,false); 
			
			copyArgs(msg,"ReplicationGroupIds",params,undefined,true); 
			copyArgs(msg,"CacheClusterIds",params,undefined,true); 
			copyArgs(msg,"ServiceUpdateName",params,undefined,false); 
			

			svc.batchApplyUpdateAction(params,cb);
		}
			service.BatchStopUpdateAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServiceUpdateName",params,undefined,false); 
			
			copyArgs(n,"ReplicationGroupIds",params,undefined,true); 
			copyArgs(n,"CacheClusterIds",params,undefined,true); 
			copyArgs(n,"ServiceUpdateName",params,undefined,false); 
			
			copyArgs(msg,"ReplicationGroupIds",params,undefined,true); 
			copyArgs(msg,"CacheClusterIds",params,undefined,true); 
			copyArgs(msg,"ServiceUpdateName",params,undefined,false); 
			

			svc.batchStopUpdateAction(params,cb);
		}
			service.CompleteMigration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReplicationGroupId",params,undefined,false); 
			
			copyArgs(n,"ReplicationGroupId",params,undefined,false); 
			copyArgs(Boolean(n),"Force",params,undefined,false); 
			
			copyArgs(msg,"ReplicationGroupId",params,undefined,false); 
			copyArgs(msg,"Force",params,undefined,false); 
			

			svc.completeMigration(params,cb);
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
			service.CreateCacheCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CacheClusterId",params,undefined,false); 
			
			copyArgs(n,"CacheClusterId",params,undefined,false); 
			copyArgs(n,"ReplicationGroupId",params,undefined,false); 
			copyArgs(n,"AZMode",params,undefined,false); 
			copyArgs(n,"PreferredAvailabilityZone",params,undefined,false); 
			copyArgs(n,"PreferredAvailabilityZones",params,undefined,true); 
			copyArgs(Number(n),"NumCacheNodes",params,undefined,false); 
			copyArgs(n,"CacheNodeType",params,undefined,false); 
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(n,"CacheParameterGroupName",params,undefined,false); 
			copyArgs(n,"CacheSubnetGroupName",params,undefined,false); 
			copyArgs(n,"CacheSecurityGroupNames",params,undefined,true); 
			copyArgs(n,"SecurityGroupIds",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"SnapshotArns",params,undefined,true); 
			copyArgs(n,"SnapshotName",params,undefined,false); 
			copyArgs(n,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(Number(n),"Port",params,undefined,false); 
			copyArgs(n,"NotificationTopicArn",params,undefined,false); 
			copyArgs(Boolean(n),"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArgs(Number(n),"SnapshotRetentionLimit",params,undefined,false); 
			copyArgs(n,"SnapshotWindow",params,undefined,false); 
			copyArgs(n,"AuthToken",params,undefined,false); 
			copyArgs(n,"OutpostMode",params,undefined,false); 
			copyArgs(n,"PreferredOutpostArn",params,undefined,false); 
			copyArgs(n,"PreferredOutpostArns",params,undefined,true); 
			copyArgs(n,"LogDeliveryConfigurations",params,undefined,true); 
			
			copyArgs(msg,"CacheClusterId",params,undefined,false); 
			copyArgs(msg,"ReplicationGroupId",params,undefined,false); 
			copyArgs(msg,"AZMode",params,undefined,false); 
			copyArgs(msg,"PreferredAvailabilityZone",params,undefined,false); 
			copyArgs(msg,"PreferredAvailabilityZones",params,undefined,true); 
			copyArgs(msg,"NumCacheNodes",params,undefined,false); 
			copyArgs(msg,"CacheNodeType",params,undefined,false); 
			copyArgs(msg,"Engine",params,undefined,false); 
			copyArgs(msg,"EngineVersion",params,undefined,false); 
			copyArgs(msg,"CacheParameterGroupName",params,undefined,false); 
			copyArgs(msg,"CacheSubnetGroupName",params,undefined,false); 
			copyArgs(msg,"CacheSecurityGroupNames",params,undefined,true); 
			copyArgs(msg,"SecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"SnapshotArns",params,undefined,true); 
			copyArgs(msg,"SnapshotName",params,undefined,false); 
			copyArgs(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(msg,"Port",params,undefined,false); 
			copyArgs(msg,"NotificationTopicArn",params,undefined,false); 
			copyArgs(msg,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArgs(msg,"SnapshotRetentionLimit",params,undefined,false); 
			copyArgs(msg,"SnapshotWindow",params,undefined,false); 
			copyArgs(msg,"AuthToken",params,undefined,false); 
			copyArgs(msg,"OutpostMode",params,undefined,false); 
			copyArgs(msg,"PreferredOutpostArn",params,undefined,false); 
			copyArgs(msg,"PreferredOutpostArns",params,undefined,true); 
			copyArgs(msg,"LogDeliveryConfigurations",params,undefined,true); 
			

			svc.createCacheCluster(params,cb);
		}
			service.CreateCacheParameterGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CacheParameterGroupName",params,undefined,false); 
			copyArgs(n,"CacheParameterGroupFamily",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(n,"CacheParameterGroupName",params,undefined,false); 
			copyArgs(n,"CacheParameterGroupFamily",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"CacheParameterGroupName",params,undefined,false); 
			copyArgs(msg,"CacheParameterGroupFamily",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createCacheParameterGroup(params,cb);
		}
			service.CreateCacheSecurityGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CacheSecurityGroupName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(n,"CacheSecurityGroupName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"CacheSecurityGroupName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createCacheSecurityGroup(params,cb);
		}
			service.CreateCacheSubnetGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CacheSubnetGroupName",params,undefined,false); 
			copyArgs(n,"CacheSubnetGroupDescription",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			
			copyArgs(n,"CacheSubnetGroupName",params,undefined,false); 
			copyArgs(n,"CacheSubnetGroupDescription",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"CacheSubnetGroupName",params,undefined,false); 
			copyArgs(msg,"CacheSubnetGroupDescription",params,undefined,false); 
			copyArgs(msg,"SubnetIds",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createCacheSubnetGroup(params,cb);
		}
			service.CreateGlobalReplicationGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalReplicationGroupIdSuffix",params,undefined,false); 
			copyArgs(n,"PrimaryReplicationGroupId",params,undefined,false); 
			
			copyArgs(n,"GlobalReplicationGroupIdSuffix",params,undefined,false); 
			copyArgs(n,"GlobalReplicationGroupDescription",params,undefined,false); 
			copyArgs(n,"PrimaryReplicationGroupId",params,undefined,false); 
			
			copyArgs(msg,"GlobalReplicationGroupIdSuffix",params,undefined,false); 
			copyArgs(msg,"GlobalReplicationGroupDescription",params,undefined,false); 
			copyArgs(msg,"PrimaryReplicationGroupId",params,undefined,false); 
			

			svc.createGlobalReplicationGroup(params,cb);
		}
			service.CreateReplicationGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReplicationGroupId",params,undefined,false); 
			copyArgs(n,"ReplicationGroupDescription",params,undefined,false); 
			
			copyArgs(n,"ReplicationGroupId",params,undefined,false); 
			copyArgs(n,"ReplicationGroupDescription",params,undefined,false); 
			copyArgs(n,"GlobalReplicationGroupId",params,undefined,false); 
			copyArgs(n,"PrimaryClusterId",params,undefined,false); 
			copyArgs(Boolean(n),"AutomaticFailoverEnabled",params,undefined,false); 
			copyArgs(Boolean(n),"MultiAZEnabled",params,undefined,false); 
			copyArgs(Number(n),"NumCacheClusters",params,undefined,false); 
			copyArgs(n,"PreferredCacheClusterAZs",params,undefined,true); 
			copyArgs(Number(n),"NumNodeGroups",params,undefined,false); 
			copyArgs(Number(n),"ReplicasPerNodeGroup",params,undefined,false); 
			copyArgs(n,"NodeGroupConfiguration",params,undefined,false); 
			copyArgs(n,"CacheNodeType",params,undefined,false); 
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(n,"CacheParameterGroupName",params,undefined,false); 
			copyArgs(n,"CacheSubnetGroupName",params,undefined,false); 
			copyArgs(n,"CacheSecurityGroupNames",params,undefined,true); 
			copyArgs(n,"SecurityGroupIds",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"SnapshotArns",params,undefined,true); 
			copyArgs(n,"SnapshotName",params,undefined,false); 
			copyArgs(n,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(Number(n),"Port",params,undefined,false); 
			copyArgs(n,"NotificationTopicArn",params,undefined,false); 
			copyArgs(Boolean(n),"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArgs(Number(n),"SnapshotRetentionLimit",params,undefined,false); 
			copyArgs(n,"SnapshotWindow",params,undefined,false); 
			copyArgs(n,"AuthToken",params,undefined,false); 
			copyArgs(Boolean(n),"TransitEncryptionEnabled",params,undefined,false); 
			copyArgs(Boolean(n),"AtRestEncryptionEnabled",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"UserGroupIds",params,undefined,false); 
			copyArgs(n,"LogDeliveryConfigurations",params,undefined,true); 
			
			copyArgs(msg,"ReplicationGroupId",params,undefined,false); 
			copyArgs(msg,"ReplicationGroupDescription",params,undefined,false); 
			copyArgs(msg,"GlobalReplicationGroupId",params,undefined,false); 
			copyArgs(msg,"PrimaryClusterId",params,undefined,false); 
			copyArgs(msg,"AutomaticFailoverEnabled",params,undefined,false); 
			copyArgs(msg,"MultiAZEnabled",params,undefined,false); 
			copyArgs(msg,"NumCacheClusters",params,undefined,false); 
			copyArgs(msg,"PreferredCacheClusterAZs",params,undefined,true); 
			copyArgs(msg,"NumNodeGroups",params,undefined,false); 
			copyArgs(msg,"ReplicasPerNodeGroup",params,undefined,false); 
			copyArgs(msg,"NodeGroupConfiguration",params,undefined,false); 
			copyArgs(msg,"CacheNodeType",params,undefined,false); 
			copyArgs(msg,"Engine",params,undefined,false); 
			copyArgs(msg,"EngineVersion",params,undefined,false); 
			copyArgs(msg,"CacheParameterGroupName",params,undefined,false); 
			copyArgs(msg,"CacheSubnetGroupName",params,undefined,false); 
			copyArgs(msg,"CacheSecurityGroupNames",params,undefined,true); 
			copyArgs(msg,"SecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"SnapshotArns",params,undefined,true); 
			copyArgs(msg,"SnapshotName",params,undefined,false); 
			copyArgs(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(msg,"Port",params,undefined,false); 
			copyArgs(msg,"NotificationTopicArn",params,undefined,false); 
			copyArgs(msg,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArgs(msg,"SnapshotRetentionLimit",params,undefined,false); 
			copyArgs(msg,"SnapshotWindow",params,undefined,false); 
			copyArgs(msg,"AuthToken",params,undefined,false); 
			copyArgs(msg,"TransitEncryptionEnabled",params,undefined,false); 
			copyArgs(msg,"AtRestEncryptionEnabled",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"UserGroupIds",params,undefined,false); 
			copyArgs(msg,"LogDeliveryConfigurations",params,undefined,true); 
			

			svc.createReplicationGroup(params,cb);
		}
			service.CreateSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SnapshotName",params,undefined,false); 
			
			copyArgs(n,"ReplicationGroupId",params,undefined,false); 
			copyArgs(n,"CacheClusterId",params,undefined,false); 
			copyArgs(n,"SnapshotName",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ReplicationGroupId",params,undefined,false); 
			copyArgs(msg,"CacheClusterId",params,undefined,false); 
			copyArgs(msg,"SnapshotName",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createSnapshot(params,cb);
		}
			service.CreateUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"AccessString",params,undefined,false); 
			
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"Passwords",params,undefined,true); 
			copyArgs(n,"AccessString",params,undefined,false); 
			copyArgs(Boolean(n),"NoPasswordRequired",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"UserId",params,undefined,false); 
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"Engine",params,undefined,false); 
			copyArgs(msg,"Passwords",params,undefined,true); 
			copyArgs(msg,"AccessString",params,undefined,false); 
			copyArgs(msg,"NoPasswordRequired",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createUser(params,cb);
		}
			service.CreateUserGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserGroupId",params,undefined,false); 
			copyArgs(n,"Engine",params,undefined,false); 
			
			copyArgs(n,"UserGroupId",params,undefined,false); 
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"UserIds",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"UserGroupId",params,undefined,false); 
			copyArgs(msg,"Engine",params,undefined,false); 
			copyArgs(msg,"UserIds",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createUserGroup(params,cb);
		}
			service.DecreaseNodeGroupsInGlobalReplicationGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalReplicationGroupId",params,undefined,false); 
			copyArgs(Number(n),"NodeGroupCount",params,undefined,false); 
			copyArgs(Boolean(n),"ApplyImmediately",params,undefined,false); 
			
			copyArgs(n,"GlobalReplicationGroupId",params,undefined,false); 
			copyArgs(Number(n),"NodeGroupCount",params,undefined,false); 
			copyArgs(n,"GlobalNodeGroupsToRemove",params,undefined,true); 
			copyArgs(n,"GlobalNodeGroupsToRetain",params,undefined,true); 
			copyArgs(Boolean(n),"ApplyImmediately",params,undefined,false); 
			
			copyArgs(msg,"GlobalReplicationGroupId",params,undefined,false); 
			copyArgs(msg,"NodeGroupCount",params,undefined,false); 
			copyArgs(msg,"GlobalNodeGroupsToRemove",params,undefined,true); 
			copyArgs(msg,"GlobalNodeGroupsToRetain",params,undefined,true); 
			copyArgs(msg,"ApplyImmediately",params,undefined,false); 
			

			svc.decreaseNodeGroupsInGlobalReplicationGroup(params,cb);
		}
			service.DecreaseReplicaCount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReplicationGroupId",params,undefined,false); 
			copyArgs(Boolean(n),"ApplyImmediately",params,undefined,false); 
			
			copyArgs(n,"ReplicationGroupId",params,undefined,false); 
			copyArgs(Number(n),"NewReplicaCount",params,undefined,false); 
			copyArgs(n,"ReplicaConfiguration",params,undefined,true); 
			copyArgs(n,"ReplicasToRemove",params,undefined,false); 
			copyArgs(Boolean(n),"ApplyImmediately",params,undefined,false); 
			
			copyArgs(msg,"ReplicationGroupId",params,undefined,false); 
			copyArgs(msg,"NewReplicaCount",params,undefined,false); 
			copyArgs(msg,"ReplicaConfiguration",params,undefined,true); 
			copyArgs(msg,"ReplicasToRemove",params,undefined,false); 
			copyArgs(msg,"ApplyImmediately",params,undefined,false); 
			

			svc.decreaseReplicaCount(params,cb);
		}
			service.DeleteCacheCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CacheClusterId",params,undefined,false); 
			
			copyArgs(n,"CacheClusterId",params,undefined,false); 
			copyArgs(n,"FinalSnapshotIdentifier",params,undefined,false); 
			
			copyArgs(msg,"CacheClusterId",params,undefined,false); 
			copyArgs(msg,"FinalSnapshotIdentifier",params,undefined,false); 
			

			svc.deleteCacheCluster(params,cb);
		}
			service.DeleteCacheParameterGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CacheParameterGroupName",params,undefined,false); 
			
			copyArgs(n,"CacheParameterGroupName",params,undefined,false); 
			
			copyArgs(msg,"CacheParameterGroupName",params,undefined,false); 
			

			svc.deleteCacheParameterGroup(params,cb);
		}
			service.DeleteCacheSecurityGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CacheSecurityGroupName",params,undefined,false); 
			
			copyArgs(n,"CacheSecurityGroupName",params,undefined,false); 
			
			copyArgs(msg,"CacheSecurityGroupName",params,undefined,false); 
			

			svc.deleteCacheSecurityGroup(params,cb);
		}
			service.DeleteCacheSubnetGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CacheSubnetGroupName",params,undefined,false); 
			
			copyArgs(n,"CacheSubnetGroupName",params,undefined,false); 
			
			copyArgs(msg,"CacheSubnetGroupName",params,undefined,false); 
			

			svc.deleteCacheSubnetGroup(params,cb);
		}
			service.DeleteGlobalReplicationGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalReplicationGroupId",params,undefined,false); 
			copyArgs(Boolean(n),"RetainPrimaryReplicationGroup",params,undefined,false); 
			
			copyArgs(n,"GlobalReplicationGroupId",params,undefined,false); 
			copyArgs(Boolean(n),"RetainPrimaryReplicationGroup",params,undefined,false); 
			
			copyArgs(msg,"GlobalReplicationGroupId",params,undefined,false); 
			copyArgs(msg,"RetainPrimaryReplicationGroup",params,undefined,false); 
			

			svc.deleteGlobalReplicationGroup(params,cb);
		}
			service.DeleteReplicationGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReplicationGroupId",params,undefined,false); 
			
			copyArgs(n,"ReplicationGroupId",params,undefined,false); 
			copyArgs(Boolean(n),"RetainPrimaryCluster",params,undefined,false); 
			copyArgs(n,"FinalSnapshotIdentifier",params,undefined,false); 
			
			copyArgs(msg,"ReplicationGroupId",params,undefined,false); 
			copyArgs(msg,"RetainPrimaryCluster",params,undefined,false); 
			copyArgs(msg,"FinalSnapshotIdentifier",params,undefined,false); 
			

			svc.deleteReplicationGroup(params,cb);
		}
			service.DeleteSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SnapshotName",params,undefined,false); 
			
			copyArgs(n,"SnapshotName",params,undefined,false); 
			
			copyArgs(msg,"SnapshotName",params,undefined,false); 
			

			svc.deleteSnapshot(params,cb);
		}
			service.DeleteUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(msg,"UserId",params,undefined,false); 
			

			svc.deleteUser(params,cb);
		}
			service.DeleteUserGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserGroupId",params,undefined,false); 
			
			copyArgs(n,"UserGroupId",params,undefined,false); 
			
			copyArgs(msg,"UserGroupId",params,undefined,false); 
			

			svc.deleteUserGroup(params,cb);
		}
			service.DescribeCacheClusters=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CacheClusterId",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(Boolean(n),"ShowCacheNodeInfo",params,undefined,false); 
			copyArgs(Boolean(n),"ShowCacheClustersNotInReplicationGroups",params,undefined,false); 
			
			copyArgs(msg,"CacheClusterId",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"ShowCacheNodeInfo",params,undefined,false); 
			copyArgs(msg,"ShowCacheClustersNotInReplicationGroups",params,undefined,false); 
			

			svc.describeCacheClusters(params,cb);
		}
			service.DescribeCacheEngineVersions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(n,"CacheParameterGroupFamily",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(Boolean(n),"DefaultOnly",params,undefined,false); 
			
			copyArgs(msg,"Engine",params,undefined,false); 
			copyArgs(msg,"EngineVersion",params,undefined,false); 
			copyArgs(msg,"CacheParameterGroupFamily",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"DefaultOnly",params,undefined,false); 
			

			svc.describeCacheEngineVersions(params,cb);
		}
			service.DescribeCacheParameterGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CacheParameterGroupName",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"CacheParameterGroupName",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeCacheParameterGroups(params,cb);
		}
			service.DescribeCacheParameters=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CacheParameterGroupName",params,undefined,false); 
			
			copyArgs(n,"CacheParameterGroupName",params,undefined,false); 
			copyArgs(n,"Source",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"CacheParameterGroupName",params,undefined,false); 
			copyArgs(msg,"Source",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeCacheParameters(params,cb);
		}
			service.DescribeCacheSecurityGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CacheSecurityGroupName",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"CacheSecurityGroupName",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeCacheSecurityGroups(params,cb);
		}
			service.DescribeCacheSubnetGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CacheSubnetGroupName",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"CacheSubnetGroupName",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeCacheSubnetGroups(params,cb);
		}
			service.DescribeEngineDefaultParameters=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CacheParameterGroupFamily",params,undefined,false); 
			
			copyArgs(n,"CacheParameterGroupFamily",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"CacheParameterGroupFamily",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeEngineDefaultParameters(params,cb);
		}
			service.DescribeEvents=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SourceIdentifier",params,undefined,false); 
			copyArgs(n,"SourceType",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(Number(n),"Duration",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"SourceIdentifier",params,undefined,false); 
			copyArgs(msg,"SourceType",params,undefined,false); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"Duration",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeEvents(params,cb);
		}
			service.DescribeGlobalReplicationGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"GlobalReplicationGroupId",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(Boolean(n),"ShowMemberInfo",params,undefined,false); 
			
			copyArgs(msg,"GlobalReplicationGroupId",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"ShowMemberInfo",params,undefined,false); 
			

			svc.describeGlobalReplicationGroups(params,cb);
		}
			service.DescribeReplicationGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ReplicationGroupId",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"ReplicationGroupId",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeReplicationGroups(params,cb);
		}
			service.DescribeReservedCacheNodes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ReservedCacheNodeId",params,undefined,false); 
			copyArgs(n,"ReservedCacheNodesOfferingId",params,undefined,false); 
			copyArgs(n,"CacheNodeType",params,undefined,false); 
			copyArgs(n,"Duration",params,undefined,false); 
			copyArgs(n,"ProductDescription",params,undefined,false); 
			copyArgs(n,"OfferingType",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"ReservedCacheNodeId",params,undefined,false); 
			copyArgs(msg,"ReservedCacheNodesOfferingId",params,undefined,false); 
			copyArgs(msg,"CacheNodeType",params,undefined,false); 
			copyArgs(msg,"Duration",params,undefined,false); 
			copyArgs(msg,"ProductDescription",params,undefined,false); 
			copyArgs(msg,"OfferingType",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeReservedCacheNodes(params,cb);
		}
			service.DescribeReservedCacheNodesOfferings=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ReservedCacheNodesOfferingId",params,undefined,false); 
			copyArgs(n,"CacheNodeType",params,undefined,false); 
			copyArgs(n,"Duration",params,undefined,false); 
			copyArgs(n,"ProductDescription",params,undefined,false); 
			copyArgs(n,"OfferingType",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"ReservedCacheNodesOfferingId",params,undefined,false); 
			copyArgs(msg,"CacheNodeType",params,undefined,false); 
			copyArgs(msg,"Duration",params,undefined,false); 
			copyArgs(msg,"ProductDescription",params,undefined,false); 
			copyArgs(msg,"OfferingType",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeReservedCacheNodesOfferings(params,cb);
		}
			service.DescribeServiceUpdates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ServiceUpdateName",params,undefined,false); 
			copyArgs(n,"ServiceUpdateStatus",params,undefined,true); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"ServiceUpdateName",params,undefined,false); 
			copyArgs(msg,"ServiceUpdateStatus",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeServiceUpdates(params,cb);
		}
			service.DescribeSnapshots=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ReplicationGroupId",params,undefined,false); 
			copyArgs(n,"CacheClusterId",params,undefined,false); 
			copyArgs(n,"SnapshotName",params,undefined,false); 
			copyArgs(n,"SnapshotSource",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(Boolean(n),"ShowNodeGroupConfig",params,undefined,false); 
			
			copyArgs(msg,"ReplicationGroupId",params,undefined,false); 
			copyArgs(msg,"CacheClusterId",params,undefined,false); 
			copyArgs(msg,"SnapshotName",params,undefined,false); 
			copyArgs(msg,"SnapshotSource",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"ShowNodeGroupConfig",params,undefined,false); 
			

			svc.describeSnapshots(params,cb);
		}
			service.DescribeUpdateActions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ServiceUpdateName",params,undefined,false); 
			copyArgs(n,"ReplicationGroupIds",params,undefined,true); 
			copyArgs(n,"CacheClusterIds",params,undefined,true); 
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"ServiceUpdateStatus",params,undefined,true); 
			copyArgs(n,"ServiceUpdateTimeRange",params,undefined,false); 
			copyArgs(n,"UpdateActionStatus",params,undefined,false); 
			copyArgs(Boolean(n),"ShowNodeLevelUpdateStatus",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"ServiceUpdateName",params,undefined,false); 
			copyArgs(msg,"ReplicationGroupIds",params,undefined,true); 
			copyArgs(msg,"CacheClusterIds",params,undefined,true); 
			copyArgs(msg,"Engine",params,undefined,false); 
			copyArgs(msg,"ServiceUpdateStatus",params,undefined,true); 
			copyArgs(msg,"ServiceUpdateTimeRange",params,undefined,false); 
			copyArgs(msg,"UpdateActionStatus",params,undefined,false); 
			copyArgs(msg,"ShowNodeLevelUpdateStatus",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeUpdateActions(params,cb);
		}
			service.DescribeUserGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"UserGroupId",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"UserGroupId",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeUserGroups(params,cb);
		}
			service.DescribeUsers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"Engine",params,undefined,false); 
			copyArgs(msg,"UserId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeUsers(params,cb);
		}
			service.DisassociateGlobalReplicationGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalReplicationGroupId",params,undefined,false); 
			copyArgs(n,"ReplicationGroupId",params,undefined,false); 
			copyArgs(n,"ReplicationGroupRegion",params,undefined,false); 
			
			copyArgs(n,"GlobalReplicationGroupId",params,undefined,false); 
			copyArgs(n,"ReplicationGroupId",params,undefined,false); 
			copyArgs(n,"ReplicationGroupRegion",params,undefined,false); 
			
			copyArgs(msg,"GlobalReplicationGroupId",params,undefined,false); 
			copyArgs(msg,"ReplicationGroupId",params,undefined,false); 
			copyArgs(msg,"ReplicationGroupRegion",params,undefined,false); 
			

			svc.disassociateGlobalReplicationGroup(params,cb);
		}
			service.FailoverGlobalReplicationGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalReplicationGroupId",params,undefined,false); 
			copyArgs(n,"PrimaryRegion",params,undefined,false); 
			copyArgs(n,"PrimaryReplicationGroupId",params,undefined,false); 
			
			copyArgs(n,"GlobalReplicationGroupId",params,undefined,false); 
			copyArgs(n,"PrimaryRegion",params,undefined,false); 
			copyArgs(n,"PrimaryReplicationGroupId",params,undefined,false); 
			
			copyArgs(msg,"GlobalReplicationGroupId",params,undefined,false); 
			copyArgs(msg,"PrimaryRegion",params,undefined,false); 
			copyArgs(msg,"PrimaryReplicationGroupId",params,undefined,false); 
			

			svc.failoverGlobalReplicationGroup(params,cb);
		}
			service.IncreaseNodeGroupsInGlobalReplicationGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalReplicationGroupId",params,undefined,false); 
			copyArgs(Number(n),"NodeGroupCount",params,undefined,false); 
			copyArgs(Boolean(n),"ApplyImmediately",params,undefined,false); 
			
			copyArgs(n,"GlobalReplicationGroupId",params,undefined,false); 
			copyArgs(Number(n),"NodeGroupCount",params,undefined,false); 
			copyArgs(n,"RegionalConfigurations",params,undefined,false); 
			copyArgs(Boolean(n),"ApplyImmediately",params,undefined,false); 
			
			copyArgs(msg,"GlobalReplicationGroupId",params,undefined,false); 
			copyArgs(msg,"NodeGroupCount",params,undefined,false); 
			copyArgs(msg,"RegionalConfigurations",params,undefined,false); 
			copyArgs(msg,"ApplyImmediately",params,undefined,false); 
			

			svc.increaseNodeGroupsInGlobalReplicationGroup(params,cb);
		}
			service.IncreaseReplicaCount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReplicationGroupId",params,undefined,false); 
			copyArgs(Boolean(n),"ApplyImmediately",params,undefined,false); 
			
			copyArgs(n,"ReplicationGroupId",params,undefined,false); 
			copyArgs(Number(n),"NewReplicaCount",params,undefined,false); 
			copyArgs(n,"ReplicaConfiguration",params,undefined,true); 
			copyArgs(Boolean(n),"ApplyImmediately",params,undefined,false); 
			
			copyArgs(msg,"ReplicationGroupId",params,undefined,false); 
			copyArgs(msg,"NewReplicaCount",params,undefined,false); 
			copyArgs(msg,"ReplicaConfiguration",params,undefined,true); 
			copyArgs(msg,"ApplyImmediately",params,undefined,false); 
			

			svc.increaseReplicaCount(params,cb);
		}
			service.ListAllowedNodeTypeModifications=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CacheClusterId",params,undefined,false); 
			copyArgs(n,"ReplicationGroupId",params,undefined,false); 
			
			copyArgs(msg,"CacheClusterId",params,undefined,false); 
			copyArgs(msg,"ReplicationGroupId",params,undefined,false); 
			

			svc.listAllowedNodeTypeModifications(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceName",params,undefined,false); 
			
			copyArgs(n,"ResourceName",params,undefined,false); 
			
			copyArgs(msg,"ResourceName",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.ModifyCacheCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CacheClusterId",params,undefined,false); 
			
			copyArgs(n,"CacheClusterId",params,undefined,false); 
			copyArgs(Number(n),"NumCacheNodes",params,undefined,false); 
			copyArgs(n,"CacheNodeIdsToRemove",params,undefined,true); 
			copyArgs(n,"AZMode",params,undefined,false); 
			copyArgs(n,"NewAvailabilityZones",params,undefined,true); 
			copyArgs(n,"CacheSecurityGroupNames",params,undefined,true); 
			copyArgs(n,"SecurityGroupIds",params,undefined,true); 
			copyArgs(n,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(n,"NotificationTopicArn",params,undefined,false); 
			copyArgs(n,"CacheParameterGroupName",params,undefined,false); 
			copyArgs(n,"NotificationTopicStatus",params,undefined,false); 
			copyArgs(Boolean(n),"ApplyImmediately",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(Boolean(n),"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArgs(Number(n),"SnapshotRetentionLimit",params,undefined,false); 
			copyArgs(n,"SnapshotWindow",params,undefined,false); 
			copyArgs(n,"CacheNodeType",params,undefined,false); 
			copyArgs(n,"AuthToken",params,undefined,false); 
			copyArgs(n,"AuthTokenUpdateStrategy",params,undefined,false); 
			copyArgs(n,"LogDeliveryConfigurations",params,undefined,true); 
			
			copyArgs(msg,"CacheClusterId",params,undefined,false); 
			copyArgs(msg,"NumCacheNodes",params,undefined,false); 
			copyArgs(msg,"CacheNodeIdsToRemove",params,undefined,true); 
			copyArgs(msg,"AZMode",params,undefined,false); 
			copyArgs(msg,"NewAvailabilityZones",params,undefined,true); 
			copyArgs(msg,"CacheSecurityGroupNames",params,undefined,true); 
			copyArgs(msg,"SecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(msg,"NotificationTopicArn",params,undefined,false); 
			copyArgs(msg,"CacheParameterGroupName",params,undefined,false); 
			copyArgs(msg,"NotificationTopicStatus",params,undefined,false); 
			copyArgs(msg,"ApplyImmediately",params,undefined,false); 
			copyArgs(msg,"EngineVersion",params,undefined,false); 
			copyArgs(msg,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArgs(msg,"SnapshotRetentionLimit",params,undefined,false); 
			copyArgs(msg,"SnapshotWindow",params,undefined,false); 
			copyArgs(msg,"CacheNodeType",params,undefined,false); 
			copyArgs(msg,"AuthToken",params,undefined,false); 
			copyArgs(msg,"AuthTokenUpdateStrategy",params,undefined,false); 
			copyArgs(msg,"LogDeliveryConfigurations",params,undefined,true); 
			

			svc.modifyCacheCluster(params,cb);
		}
			service.ModifyCacheParameterGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CacheParameterGroupName",params,undefined,false); 
			copyArgs(n,"ParameterNameValues",params,undefined,true); 
			
			copyArgs(n,"CacheParameterGroupName",params,undefined,false); 
			copyArgs(n,"ParameterNameValues",params,undefined,true); 
			
			copyArgs(msg,"CacheParameterGroupName",params,undefined,false); 
			copyArgs(msg,"ParameterNameValues",params,undefined,true); 
			

			svc.modifyCacheParameterGroup(params,cb);
		}
			service.ModifyCacheSubnetGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CacheSubnetGroupName",params,undefined,false); 
			
			copyArgs(n,"CacheSubnetGroupName",params,undefined,false); 
			copyArgs(n,"CacheSubnetGroupDescription",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			
			copyArgs(msg,"CacheSubnetGroupName",params,undefined,false); 
			copyArgs(msg,"CacheSubnetGroupDescription",params,undefined,false); 
			copyArgs(msg,"SubnetIds",params,undefined,true); 
			

			svc.modifyCacheSubnetGroup(params,cb);
		}
			service.ModifyGlobalReplicationGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalReplicationGroupId",params,undefined,false); 
			copyArgs(Boolean(n),"ApplyImmediately",params,undefined,false); 
			
			copyArgs(n,"GlobalReplicationGroupId",params,undefined,false); 
			copyArgs(Boolean(n),"ApplyImmediately",params,undefined,false); 
			copyArgs(n,"CacheNodeType",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(n,"CacheParameterGroupName",params,undefined,false); 
			copyArgs(n,"GlobalReplicationGroupDescription",params,undefined,false); 
			copyArgs(Boolean(n),"AutomaticFailoverEnabled",params,undefined,false); 
			
			copyArgs(msg,"GlobalReplicationGroupId",params,undefined,false); 
			copyArgs(msg,"ApplyImmediately",params,undefined,false); 
			copyArgs(msg,"CacheNodeType",params,undefined,false); 
			copyArgs(msg,"EngineVersion",params,undefined,false); 
			copyArgs(msg,"CacheParameterGroupName",params,undefined,false); 
			copyArgs(msg,"GlobalReplicationGroupDescription",params,undefined,false); 
			copyArgs(msg,"AutomaticFailoverEnabled",params,undefined,false); 
			

			svc.modifyGlobalReplicationGroup(params,cb);
		}
			service.ModifyReplicationGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReplicationGroupId",params,undefined,false); 
			
			copyArgs(n,"ReplicationGroupId",params,undefined,false); 
			copyArgs(n,"ReplicationGroupDescription",params,undefined,false); 
			copyArgs(n,"PrimaryClusterId",params,undefined,false); 
			copyArgs(n,"SnapshottingClusterId",params,undefined,false); 
			copyArgs(Boolean(n),"AutomaticFailoverEnabled",params,undefined,false); 
			copyArgs(Boolean(n),"MultiAZEnabled",params,undefined,false); 
			copyArgs(n,"NodeGroupId",params,undefined,false); 
			copyArgs(n,"CacheSecurityGroupNames",params,undefined,true); 
			copyArgs(n,"SecurityGroupIds",params,undefined,true); 
			copyArgs(n,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(n,"NotificationTopicArn",params,undefined,false); 
			copyArgs(n,"CacheParameterGroupName",params,undefined,false); 
			copyArgs(n,"NotificationTopicStatus",params,undefined,false); 
			copyArgs(Boolean(n),"ApplyImmediately",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(Boolean(n),"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArgs(Number(n),"SnapshotRetentionLimit",params,undefined,false); 
			copyArgs(n,"SnapshotWindow",params,undefined,false); 
			copyArgs(n,"CacheNodeType",params,undefined,false); 
			copyArgs(n,"AuthToken",params,undefined,false); 
			copyArgs(n,"AuthTokenUpdateStrategy",params,undefined,false); 
			copyArgs(n,"UserGroupIdsToAdd",params,undefined,true); 
			copyArgs(n,"UserGroupIdsToRemove",params,undefined,true); 
			copyArgs(Boolean(n),"RemoveUserGroups",params,undefined,false); 
			copyArgs(n,"LogDeliveryConfigurations",params,undefined,true); 
			
			copyArgs(msg,"ReplicationGroupId",params,undefined,false); 
			copyArgs(msg,"ReplicationGroupDescription",params,undefined,false); 
			copyArgs(msg,"PrimaryClusterId",params,undefined,false); 
			copyArgs(msg,"SnapshottingClusterId",params,undefined,false); 
			copyArgs(msg,"AutomaticFailoverEnabled",params,undefined,false); 
			copyArgs(msg,"MultiAZEnabled",params,undefined,false); 
			copyArgs(msg,"NodeGroupId",params,undefined,false); 
			copyArgs(msg,"CacheSecurityGroupNames",params,undefined,true); 
			copyArgs(msg,"SecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(msg,"NotificationTopicArn",params,undefined,false); 
			copyArgs(msg,"CacheParameterGroupName",params,undefined,false); 
			copyArgs(msg,"NotificationTopicStatus",params,undefined,false); 
			copyArgs(msg,"ApplyImmediately",params,undefined,false); 
			copyArgs(msg,"EngineVersion",params,undefined,false); 
			copyArgs(msg,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArgs(msg,"SnapshotRetentionLimit",params,undefined,false); 
			copyArgs(msg,"SnapshotWindow",params,undefined,false); 
			copyArgs(msg,"CacheNodeType",params,undefined,false); 
			copyArgs(msg,"AuthToken",params,undefined,false); 
			copyArgs(msg,"AuthTokenUpdateStrategy",params,undefined,false); 
			copyArgs(msg,"UserGroupIdsToAdd",params,undefined,true); 
			copyArgs(msg,"UserGroupIdsToRemove",params,undefined,true); 
			copyArgs(msg,"RemoveUserGroups",params,undefined,false); 
			copyArgs(msg,"LogDeliveryConfigurations",params,undefined,true); 
			

			svc.modifyReplicationGroup(params,cb);
		}
			service.ModifyReplicationGroupShardConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReplicationGroupId",params,undefined,false); 
			copyArgs(Number(n),"NodeGroupCount",params,undefined,false); 
			copyArgs(Boolean(n),"ApplyImmediately",params,undefined,false); 
			
			copyArgs(n,"ReplicationGroupId",params,undefined,false); 
			copyArgs(Number(n),"NodeGroupCount",params,undefined,false); 
			copyArgs(Boolean(n),"ApplyImmediately",params,undefined,false); 
			copyArgs(n,"ReshardingConfiguration",params,undefined,true); 
			copyArgs(n,"NodeGroupsToRemove",params,undefined,false); 
			copyArgs(n,"NodeGroupsToRetain",params,undefined,false); 
			
			copyArgs(msg,"ReplicationGroupId",params,undefined,false); 
			copyArgs(msg,"NodeGroupCount",params,undefined,false); 
			copyArgs(msg,"ApplyImmediately",params,undefined,false); 
			copyArgs(msg,"ReshardingConfiguration",params,undefined,true); 
			copyArgs(msg,"NodeGroupsToRemove",params,undefined,false); 
			copyArgs(msg,"NodeGroupsToRetain",params,undefined,false); 
			

			svc.modifyReplicationGroupShardConfiguration(params,cb);
		}
			service.ModifyUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"AccessString",params,undefined,false); 
			copyArgs(n,"AppendAccessString",params,undefined,false); 
			copyArgs(n,"Passwords",params,undefined,true); 
			copyArgs(Boolean(n),"NoPasswordRequired",params,undefined,false); 
			
			copyArgs(msg,"UserId",params,undefined,false); 
			copyArgs(msg,"AccessString",params,undefined,false); 
			copyArgs(msg,"AppendAccessString",params,undefined,false); 
			copyArgs(msg,"Passwords",params,undefined,true); 
			copyArgs(msg,"NoPasswordRequired",params,undefined,false); 
			

			svc.modifyUser(params,cb);
		}
			service.ModifyUserGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserGroupId",params,undefined,false); 
			
			copyArgs(n,"UserGroupId",params,undefined,false); 
			copyArgs(n,"UserIdsToAdd",params,undefined,true); 
			copyArgs(n,"UserIdsToRemove",params,undefined,true); 
			
			copyArgs(msg,"UserGroupId",params,undefined,false); 
			copyArgs(msg,"UserIdsToAdd",params,undefined,true); 
			copyArgs(msg,"UserIdsToRemove",params,undefined,true); 
			

			svc.modifyUserGroup(params,cb);
		}
			service.PurchaseReservedCacheNodesOffering=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReservedCacheNodesOfferingId",params,undefined,false); 
			
			copyArgs(n,"ReservedCacheNodesOfferingId",params,undefined,false); 
			copyArgs(n,"ReservedCacheNodeId",params,undefined,false); 
			copyArgs(Number(n),"CacheNodeCount",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ReservedCacheNodesOfferingId",params,undefined,false); 
			copyArgs(msg,"ReservedCacheNodeId",params,undefined,false); 
			copyArgs(msg,"CacheNodeCount",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.purchaseReservedCacheNodesOffering(params,cb);
		}
			service.RebalanceSlotsInGlobalReplicationGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalReplicationGroupId",params,undefined,false); 
			copyArgs(Boolean(n),"ApplyImmediately",params,undefined,false); 
			
			copyArgs(n,"GlobalReplicationGroupId",params,undefined,false); 
			copyArgs(Boolean(n),"ApplyImmediately",params,undefined,false); 
			
			copyArgs(msg,"GlobalReplicationGroupId",params,undefined,false); 
			copyArgs(msg,"ApplyImmediately",params,undefined,false); 
			

			svc.rebalanceSlotsInGlobalReplicationGroup(params,cb);
		}
			service.RebootCacheCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CacheClusterId",params,undefined,false); 
			copyArgs(n,"CacheNodeIdsToReboot",params,undefined,true); 
			
			copyArgs(n,"CacheClusterId",params,undefined,false); 
			copyArgs(n,"CacheNodeIdsToReboot",params,undefined,true); 
			
			copyArgs(msg,"CacheClusterId",params,undefined,false); 
			copyArgs(msg,"CacheNodeIdsToReboot",params,undefined,true); 
			

			svc.rebootCacheCluster(params,cb);
		}
			service.RemoveTagsFromResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceName",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceName",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceName",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.removeTagsFromResource(params,cb);
		}
			service.ResetCacheParameterGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CacheParameterGroupName",params,undefined,false); 
			
			copyArgs(n,"CacheParameterGroupName",params,undefined,false); 
			copyArgs(Boolean(n),"ResetAllParameters",params,undefined,false); 
			copyArgs(n,"ParameterNameValues",params,undefined,true); 
			
			copyArgs(msg,"CacheParameterGroupName",params,undefined,false); 
			copyArgs(msg,"ResetAllParameters",params,undefined,false); 
			copyArgs(msg,"ParameterNameValues",params,undefined,true); 
			

			svc.resetCacheParameterGroup(params,cb);
		}
			service.RevokeCacheSecurityGroupIngress=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CacheSecurityGroupName",params,undefined,false); 
			copyArgs(n,"EC2SecurityGroupName",params,undefined,false); 
			copyArgs(n,"EC2SecurityGroupOwnerId",params,undefined,false); 
			
			copyArgs(n,"CacheSecurityGroupName",params,undefined,false); 
			copyArgs(n,"EC2SecurityGroupName",params,undefined,false); 
			copyArgs(n,"EC2SecurityGroupOwnerId",params,undefined,false); 
			
			copyArgs(msg,"CacheSecurityGroupName",params,undefined,false); 
			copyArgs(msg,"EC2SecurityGroupName",params,undefined,false); 
			copyArgs(msg,"EC2SecurityGroupOwnerId",params,undefined,false); 
			

			svc.revokeCacheSecurityGroupIngress(params,cb);
		}
			service.StartMigration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReplicationGroupId",params,undefined,false); 
			copyArgs(n,"CustomerNodeEndpointList",params,undefined,false); 
			
			copyArgs(n,"ReplicationGroupId",params,undefined,false); 
			copyArgs(n,"CustomerNodeEndpointList",params,undefined,false); 
			
			copyArgs(msg,"ReplicationGroupId",params,undefined,false); 
			copyArgs(msg,"CustomerNodeEndpointList",params,undefined,false); 
			

			svc.startMigration(params,cb);
		}
			service.TestFailover=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReplicationGroupId",params,undefined,false); 
			copyArgs(n,"NodeGroupId",params,undefined,false); 
			
			copyArgs(n,"ReplicationGroupId",params,undefined,false); 
			copyArgs(n,"NodeGroupId",params,undefined,false); 
			
			copyArgs(msg,"ReplicationGroupId",params,undefined,false); 
			copyArgs(msg,"NodeGroupId",params,undefined,false); 
			

			svc.testFailover(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS ElastiCache", AmazonAPINode);

};
