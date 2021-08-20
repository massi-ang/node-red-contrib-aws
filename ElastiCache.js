
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

		var awsService = new AWS.ElastiCache( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.ElastiCache(msg.AWSConfig) : awsService;

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

		
		service.AddTagsToResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceName",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceName",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.addTagsToResource(params,cb);
		}

		
		service.AuthorizeCacheSecurityGroupIngress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CacheSecurityGroupName",params,undefined,false); 
			copyArg(n,"EC2SecurityGroupName",params,undefined,false); 
			copyArg(n,"EC2SecurityGroupOwnerId",params,undefined,false); 
			
			copyArg(msg,"CacheSecurityGroupName",params,undefined,false); 
			copyArg(msg,"EC2SecurityGroupName",params,undefined,false); 
			copyArg(msg,"EC2SecurityGroupOwnerId",params,undefined,false); 
			

			svc.authorizeCacheSecurityGroupIngress(params,cb);
		}

		
		service.BatchApplyUpdateAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceUpdateName",params,undefined,false); 
			
			copyArg(msg,"ReplicationGroupIds",params,undefined,true); 
			copyArg(msg,"CacheClusterIds",params,undefined,true); 
			copyArg(msg,"ServiceUpdateName",params,undefined,false); 
			

			svc.batchApplyUpdateAction(params,cb);
		}

		
		service.BatchStopUpdateAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceUpdateName",params,undefined,false); 
			
			copyArg(msg,"ReplicationGroupIds",params,undefined,true); 
			copyArg(msg,"CacheClusterIds",params,undefined,true); 
			copyArg(msg,"ServiceUpdateName",params,undefined,false); 
			

			svc.batchStopUpdateAction(params,cb);
		}

		
		service.CompleteMigration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReplicationGroupId",params,undefined,false); 
			
			copyArg(msg,"ReplicationGroupId",params,undefined,false); 
			copyArg(msg,"Force",params,undefined,false); 
			

			svc.completeMigration(params,cb);
		}

		
		service.CopySnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceSnapshotName",params,undefined,false); 
			copyArg(n,"TargetSnapshotName",params,undefined,false); 
			
			copyArg(msg,"SourceSnapshotName",params,undefined,false); 
			copyArg(msg,"TargetSnapshotName",params,undefined,false); 
			copyArg(msg,"TargetBucket",params,undefined,false); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.copySnapshot(params,cb);
		}

		
		service.CreateCacheCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CacheClusterId",params,undefined,false); 
			
			copyArg(msg,"CacheClusterId",params,undefined,false); 
			copyArg(msg,"ReplicationGroupId",params,undefined,false); 
			copyArg(msg,"AZMode",params,undefined,false); 
			copyArg(msg,"PreferredAvailabilityZone",params,undefined,false); 
			copyArg(msg,"PreferredAvailabilityZones",params,undefined,true); 
			copyArg(msg,"NumCacheNodes",params,undefined,false); 
			copyArg(msg,"CacheNodeType",params,undefined,false); 
			copyArg(msg,"Engine",params,undefined,false); 
			copyArg(msg,"EngineVersion",params,undefined,false); 
			copyArg(msg,"CacheParameterGroupName",params,undefined,false); 
			copyArg(msg,"CacheSubnetGroupName",params,undefined,false); 
			copyArg(msg,"CacheSecurityGroupNames",params,undefined,true); 
			copyArg(msg,"SecurityGroupIds",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"SnapshotArns",params,undefined,true); 
			copyArg(msg,"SnapshotName",params,undefined,false); 
			copyArg(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArg(msg,"Port",params,undefined,false); 
			copyArg(msg,"NotificationTopicArn",params,undefined,false); 
			copyArg(msg,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArg(msg,"SnapshotRetentionLimit",params,undefined,false); 
			copyArg(msg,"SnapshotWindow",params,undefined,false); 
			copyArg(msg,"AuthToken",params,undefined,false); 
			copyArg(msg,"OutpostMode",params,undefined,false); 
			copyArg(msg,"PreferredOutpostArn",params,undefined,false); 
			copyArg(msg,"PreferredOutpostArns",params,undefined,true); 
			copyArg(msg,"LogDeliveryConfigurations",params,undefined,true); 
			

			svc.createCacheCluster(params,cb);
		}

		
		service.CreateCacheParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CacheParameterGroupName",params,undefined,false); 
			copyArg(n,"CacheParameterGroupFamily",params,undefined,false); 
			copyArg(n,"Description",params,undefined,false); 
			
			copyArg(msg,"CacheParameterGroupName",params,undefined,false); 
			copyArg(msg,"CacheParameterGroupFamily",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createCacheParameterGroup(params,cb);
		}

		
		service.CreateCacheSecurityGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CacheSecurityGroupName",params,undefined,false); 
			copyArg(n,"Description",params,undefined,false); 
			
			copyArg(msg,"CacheSecurityGroupName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createCacheSecurityGroup(params,cb);
		}

		
		service.CreateCacheSubnetGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CacheSubnetGroupName",params,undefined,false); 
			copyArg(n,"CacheSubnetGroupDescription",params,undefined,false); 
			copyArg(n,"SubnetIds",params,undefined,true); 
			
			copyArg(msg,"CacheSubnetGroupName",params,undefined,false); 
			copyArg(msg,"CacheSubnetGroupDescription",params,undefined,false); 
			copyArg(msg,"SubnetIds",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createCacheSubnetGroup(params,cb);
		}

		
		service.CreateGlobalReplicationGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalReplicationGroupIdSuffix",params,undefined,false); 
			copyArg(n,"PrimaryReplicationGroupId",params,undefined,false); 
			
			copyArg(msg,"GlobalReplicationGroupIdSuffix",params,undefined,false); 
			copyArg(msg,"GlobalReplicationGroupDescription",params,undefined,false); 
			copyArg(msg,"PrimaryReplicationGroupId",params,undefined,false); 
			

			svc.createGlobalReplicationGroup(params,cb);
		}

		
		service.CreateReplicationGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReplicationGroupId",params,undefined,false); 
			copyArg(n,"ReplicationGroupDescription",params,undefined,false); 
			
			copyArg(msg,"ReplicationGroupId",params,undefined,false); 
			copyArg(msg,"ReplicationGroupDescription",params,undefined,false); 
			copyArg(msg,"GlobalReplicationGroupId",params,undefined,false); 
			copyArg(msg,"PrimaryClusterId",params,undefined,false); 
			copyArg(msg,"AutomaticFailoverEnabled",params,undefined,false); 
			copyArg(msg,"MultiAZEnabled",params,undefined,false); 
			copyArg(msg,"NumCacheClusters",params,undefined,false); 
			copyArg(msg,"PreferredCacheClusterAZs",params,undefined,true); 
			copyArg(msg,"NumNodeGroups",params,undefined,false); 
			copyArg(msg,"ReplicasPerNodeGroup",params,undefined,false); 
			copyArg(msg,"NodeGroupConfiguration",params,undefined,false); 
			copyArg(msg,"CacheNodeType",params,undefined,false); 
			copyArg(msg,"Engine",params,undefined,false); 
			copyArg(msg,"EngineVersion",params,undefined,false); 
			copyArg(msg,"CacheParameterGroupName",params,undefined,false); 
			copyArg(msg,"CacheSubnetGroupName",params,undefined,false); 
			copyArg(msg,"CacheSecurityGroupNames",params,undefined,true); 
			copyArg(msg,"SecurityGroupIds",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"SnapshotArns",params,undefined,true); 
			copyArg(msg,"SnapshotName",params,undefined,false); 
			copyArg(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArg(msg,"Port",params,undefined,false); 
			copyArg(msg,"NotificationTopicArn",params,undefined,false); 
			copyArg(msg,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArg(msg,"SnapshotRetentionLimit",params,undefined,false); 
			copyArg(msg,"SnapshotWindow",params,undefined,false); 
			copyArg(msg,"AuthToken",params,undefined,false); 
			copyArg(msg,"TransitEncryptionEnabled",params,undefined,false); 
			copyArg(msg,"AtRestEncryptionEnabled",params,undefined,false); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"UserGroupIds",params,undefined,false); 
			copyArg(msg,"LogDeliveryConfigurations",params,undefined,true); 
			

			svc.createReplicationGroup(params,cb);
		}

		
		service.CreateSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SnapshotName",params,undefined,false); 
			
			copyArg(msg,"ReplicationGroupId",params,undefined,false); 
			copyArg(msg,"CacheClusterId",params,undefined,false); 
			copyArg(msg,"SnapshotName",params,undefined,false); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createSnapshot(params,cb);
		}

		
		service.CreateUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserId",params,undefined,false); 
			copyArg(n,"UserName",params,undefined,false); 
			copyArg(n,"Engine",params,undefined,false); 
			copyArg(n,"AccessString",params,undefined,false); 
			
			copyArg(msg,"UserId",params,undefined,false); 
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"Engine",params,undefined,false); 
			copyArg(msg,"Passwords",params,undefined,true); 
			copyArg(msg,"AccessString",params,undefined,false); 
			copyArg(msg,"NoPasswordRequired",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createUser(params,cb);
		}

		
		service.CreateUserGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserGroupId",params,undefined,false); 
			copyArg(n,"Engine",params,undefined,false); 
			
			copyArg(msg,"UserGroupId",params,undefined,false); 
			copyArg(msg,"Engine",params,undefined,false); 
			copyArg(msg,"UserIds",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createUserGroup(params,cb);
		}

		
		service.DecreaseNodeGroupsInGlobalReplicationGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalReplicationGroupId",params,undefined,false); 
			copyArg(n,"NodeGroupCount",params,undefined,false); 
			copyArg(n,"ApplyImmediately",params,undefined,false); 
			
			copyArg(msg,"GlobalReplicationGroupId",params,undefined,false); 
			copyArg(msg,"NodeGroupCount",params,undefined,false); 
			copyArg(msg,"GlobalNodeGroupsToRemove",params,undefined,true); 
			copyArg(msg,"GlobalNodeGroupsToRetain",params,undefined,true); 
			copyArg(msg,"ApplyImmediately",params,undefined,false); 
			

			svc.decreaseNodeGroupsInGlobalReplicationGroup(params,cb);
		}

		
		service.DecreaseReplicaCount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReplicationGroupId",params,undefined,false); 
			copyArg(n,"ApplyImmediately",params,undefined,false); 
			
			copyArg(msg,"ReplicationGroupId",params,undefined,false); 
			copyArg(msg,"NewReplicaCount",params,undefined,false); 
			copyArg(msg,"ReplicaConfiguration",params,undefined,true); 
			copyArg(msg,"ReplicasToRemove",params,undefined,false); 
			copyArg(msg,"ApplyImmediately",params,undefined,false); 
			

			svc.decreaseReplicaCount(params,cb);
		}

		
		service.DeleteCacheCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CacheClusterId",params,undefined,false); 
			
			copyArg(msg,"CacheClusterId",params,undefined,false); 
			copyArg(msg,"FinalSnapshotIdentifier",params,undefined,false); 
			

			svc.deleteCacheCluster(params,cb);
		}

		
		service.DeleteCacheParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CacheParameterGroupName",params,undefined,false); 
			
			copyArg(msg,"CacheParameterGroupName",params,undefined,false); 
			

			svc.deleteCacheParameterGroup(params,cb);
		}

		
		service.DeleteCacheSecurityGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CacheSecurityGroupName",params,undefined,false); 
			
			copyArg(msg,"CacheSecurityGroupName",params,undefined,false); 
			

			svc.deleteCacheSecurityGroup(params,cb);
		}

		
		service.DeleteCacheSubnetGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CacheSubnetGroupName",params,undefined,false); 
			
			copyArg(msg,"CacheSubnetGroupName",params,undefined,false); 
			

			svc.deleteCacheSubnetGroup(params,cb);
		}

		
		service.DeleteGlobalReplicationGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalReplicationGroupId",params,undefined,false); 
			copyArg(n,"RetainPrimaryReplicationGroup",params,undefined,false); 
			
			copyArg(msg,"GlobalReplicationGroupId",params,undefined,false); 
			copyArg(msg,"RetainPrimaryReplicationGroup",params,undefined,false); 
			

			svc.deleteGlobalReplicationGroup(params,cb);
		}

		
		service.DeleteReplicationGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReplicationGroupId",params,undefined,false); 
			
			copyArg(msg,"ReplicationGroupId",params,undefined,false); 
			copyArg(msg,"RetainPrimaryCluster",params,undefined,false); 
			copyArg(msg,"FinalSnapshotIdentifier",params,undefined,false); 
			

			svc.deleteReplicationGroup(params,cb);
		}

		
		service.DeleteSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SnapshotName",params,undefined,false); 
			
			copyArg(msg,"SnapshotName",params,undefined,false); 
			

			svc.deleteSnapshot(params,cb);
		}

		
		service.DeleteUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserId",params,undefined,false); 
			
			copyArg(msg,"UserId",params,undefined,false); 
			

			svc.deleteUser(params,cb);
		}

		
		service.DeleteUserGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserGroupId",params,undefined,false); 
			
			copyArg(msg,"UserGroupId",params,undefined,false); 
			

			svc.deleteUserGroup(params,cb);
		}

		
		service.DescribeCacheClusters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CacheClusterId",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"ShowCacheNodeInfo",params,undefined,false); 
			copyArg(msg,"ShowCacheClustersNotInReplicationGroups",params,undefined,false); 
			

			svc.describeCacheClusters(params,cb);
		}

		
		service.DescribeCacheEngineVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Engine",params,undefined,false); 
			copyArg(msg,"EngineVersion",params,undefined,false); 
			copyArg(msg,"CacheParameterGroupFamily",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"DefaultOnly",params,undefined,false); 
			

			svc.describeCacheEngineVersions(params,cb);
		}

		
		service.DescribeCacheParameterGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CacheParameterGroupName",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeCacheParameterGroups(params,cb);
		}

		
		service.DescribeCacheParameters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CacheParameterGroupName",params,undefined,false); 
			
			copyArg(msg,"CacheParameterGroupName",params,undefined,false); 
			copyArg(msg,"Source",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeCacheParameters(params,cb);
		}

		
		service.DescribeCacheSecurityGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CacheSecurityGroupName",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeCacheSecurityGroups(params,cb);
		}

		
		service.DescribeCacheSubnetGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CacheSubnetGroupName",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeCacheSubnetGroups(params,cb);
		}

		
		service.DescribeEngineDefaultParameters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CacheParameterGroupFamily",params,undefined,false); 
			
			copyArg(msg,"CacheParameterGroupFamily",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeEngineDefaultParameters(params,cb);
		}

		
		service.DescribeEvents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SourceIdentifier",params,undefined,false); 
			copyArg(msg,"SourceType",params,undefined,false); 
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"Duration",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeEvents(params,cb);
		}

		
		service.DescribeGlobalReplicationGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"GlobalReplicationGroupId",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"ShowMemberInfo",params,undefined,false); 
			

			svc.describeGlobalReplicationGroups(params,cb);
		}

		
		service.DescribeReplicationGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ReplicationGroupId",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeReplicationGroups(params,cb);
		}

		
		service.DescribeReservedCacheNodes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ReservedCacheNodeId",params,undefined,false); 
			copyArg(msg,"ReservedCacheNodesOfferingId",params,undefined,false); 
			copyArg(msg,"CacheNodeType",params,undefined,false); 
			copyArg(msg,"Duration",params,undefined,false); 
			copyArg(msg,"ProductDescription",params,undefined,false); 
			copyArg(msg,"OfferingType",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeReservedCacheNodes(params,cb);
		}

		
		service.DescribeReservedCacheNodesOfferings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ReservedCacheNodesOfferingId",params,undefined,false); 
			copyArg(msg,"CacheNodeType",params,undefined,false); 
			copyArg(msg,"Duration",params,undefined,false); 
			copyArg(msg,"ProductDescription",params,undefined,false); 
			copyArg(msg,"OfferingType",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeReservedCacheNodesOfferings(params,cb);
		}

		
		service.DescribeServiceUpdates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ServiceUpdateName",params,undefined,false); 
			copyArg(msg,"ServiceUpdateStatus",params,undefined,true); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeServiceUpdates(params,cb);
		}

		
		service.DescribeSnapshots=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ReplicationGroupId",params,undefined,false); 
			copyArg(msg,"CacheClusterId",params,undefined,false); 
			copyArg(msg,"SnapshotName",params,undefined,false); 
			copyArg(msg,"SnapshotSource",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"ShowNodeGroupConfig",params,undefined,false); 
			

			svc.describeSnapshots(params,cb);
		}

		
		service.DescribeUpdateActions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ServiceUpdateName",params,undefined,false); 
			copyArg(msg,"ReplicationGroupIds",params,undefined,true); 
			copyArg(msg,"CacheClusterIds",params,undefined,true); 
			copyArg(msg,"Engine",params,undefined,false); 
			copyArg(msg,"ServiceUpdateStatus",params,undefined,true); 
			copyArg(msg,"ServiceUpdateTimeRange",params,undefined,false); 
			copyArg(msg,"UpdateActionStatus",params,undefined,false); 
			copyArg(msg,"ShowNodeLevelUpdateStatus",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeUpdateActions(params,cb);
		}

		
		service.DescribeUserGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"UserGroupId",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeUserGroups(params,cb);
		}

		
		service.DescribeUsers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Engine",params,undefined,false); 
			copyArg(msg,"UserId",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeUsers(params,cb);
		}

		
		service.DisassociateGlobalReplicationGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalReplicationGroupId",params,undefined,false); 
			copyArg(n,"ReplicationGroupId",params,undefined,false); 
			copyArg(n,"ReplicationGroupRegion",params,undefined,false); 
			
			copyArg(msg,"GlobalReplicationGroupId",params,undefined,false); 
			copyArg(msg,"ReplicationGroupId",params,undefined,false); 
			copyArg(msg,"ReplicationGroupRegion",params,undefined,false); 
			

			svc.disassociateGlobalReplicationGroup(params,cb);
		}

		
		service.FailoverGlobalReplicationGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalReplicationGroupId",params,undefined,false); 
			copyArg(n,"PrimaryRegion",params,undefined,false); 
			copyArg(n,"PrimaryReplicationGroupId",params,undefined,false); 
			
			copyArg(msg,"GlobalReplicationGroupId",params,undefined,false); 
			copyArg(msg,"PrimaryRegion",params,undefined,false); 
			copyArg(msg,"PrimaryReplicationGroupId",params,undefined,false); 
			

			svc.failoverGlobalReplicationGroup(params,cb);
		}

		
		service.IncreaseNodeGroupsInGlobalReplicationGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalReplicationGroupId",params,undefined,false); 
			copyArg(n,"NodeGroupCount",params,undefined,false); 
			copyArg(n,"ApplyImmediately",params,undefined,false); 
			
			copyArg(msg,"GlobalReplicationGroupId",params,undefined,false); 
			copyArg(msg,"NodeGroupCount",params,undefined,false); 
			copyArg(msg,"RegionalConfigurations",params,undefined,false); 
			copyArg(msg,"ApplyImmediately",params,undefined,false); 
			

			svc.increaseNodeGroupsInGlobalReplicationGroup(params,cb);
		}

		
		service.IncreaseReplicaCount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReplicationGroupId",params,undefined,false); 
			copyArg(n,"ApplyImmediately",params,undefined,false); 
			
			copyArg(msg,"ReplicationGroupId",params,undefined,false); 
			copyArg(msg,"NewReplicaCount",params,undefined,false); 
			copyArg(msg,"ReplicaConfiguration",params,undefined,true); 
			copyArg(msg,"ApplyImmediately",params,undefined,false); 
			

			svc.increaseReplicaCount(params,cb);
		}

		
		service.ListAllowedNodeTypeModifications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CacheClusterId",params,undefined,false); 
			copyArg(msg,"ReplicationGroupId",params,undefined,false); 
			

			svc.listAllowedNodeTypeModifications(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceName",params,undefined,false); 
			
			copyArg(msg,"ResourceName",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ModifyCacheCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CacheClusterId",params,undefined,false); 
			
			copyArg(msg,"CacheClusterId",params,undefined,false); 
			copyArg(msg,"NumCacheNodes",params,undefined,false); 
			copyArg(msg,"CacheNodeIdsToRemove",params,undefined,true); 
			copyArg(msg,"AZMode",params,undefined,false); 
			copyArg(msg,"NewAvailabilityZones",params,undefined,true); 
			copyArg(msg,"CacheSecurityGroupNames",params,undefined,true); 
			copyArg(msg,"SecurityGroupIds",params,undefined,true); 
			copyArg(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArg(msg,"NotificationTopicArn",params,undefined,false); 
			copyArg(msg,"CacheParameterGroupName",params,undefined,false); 
			copyArg(msg,"NotificationTopicStatus",params,undefined,false); 
			copyArg(msg,"ApplyImmediately",params,undefined,false); 
			copyArg(msg,"EngineVersion",params,undefined,false); 
			copyArg(msg,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArg(msg,"SnapshotRetentionLimit",params,undefined,false); 
			copyArg(msg,"SnapshotWindow",params,undefined,false); 
			copyArg(msg,"CacheNodeType",params,undefined,false); 
			copyArg(msg,"AuthToken",params,undefined,false); 
			copyArg(msg,"AuthTokenUpdateStrategy",params,undefined,false); 
			copyArg(msg,"LogDeliveryConfigurations",params,undefined,true); 
			

			svc.modifyCacheCluster(params,cb);
		}

		
		service.ModifyCacheParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CacheParameterGroupName",params,undefined,false); 
			copyArg(n,"ParameterNameValues",params,undefined,true); 
			
			copyArg(msg,"CacheParameterGroupName",params,undefined,false); 
			copyArg(msg,"ParameterNameValues",params,undefined,true); 
			

			svc.modifyCacheParameterGroup(params,cb);
		}

		
		service.ModifyCacheSubnetGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CacheSubnetGroupName",params,undefined,false); 
			
			copyArg(msg,"CacheSubnetGroupName",params,undefined,false); 
			copyArg(msg,"CacheSubnetGroupDescription",params,undefined,false); 
			copyArg(msg,"SubnetIds",params,undefined,true); 
			

			svc.modifyCacheSubnetGroup(params,cb);
		}

		
		service.ModifyGlobalReplicationGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalReplicationGroupId",params,undefined,false); 
			copyArg(n,"ApplyImmediately",params,undefined,false); 
			
			copyArg(msg,"GlobalReplicationGroupId",params,undefined,false); 
			copyArg(msg,"ApplyImmediately",params,undefined,false); 
			copyArg(msg,"CacheNodeType",params,undefined,false); 
			copyArg(msg,"EngineVersion",params,undefined,false); 
			copyArg(msg,"CacheParameterGroupName",params,undefined,false); 
			copyArg(msg,"GlobalReplicationGroupDescription",params,undefined,false); 
			copyArg(msg,"AutomaticFailoverEnabled",params,undefined,false); 
			

			svc.modifyGlobalReplicationGroup(params,cb);
		}

		
		service.ModifyReplicationGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReplicationGroupId",params,undefined,false); 
			
			copyArg(msg,"ReplicationGroupId",params,undefined,false); 
			copyArg(msg,"ReplicationGroupDescription",params,undefined,false); 
			copyArg(msg,"PrimaryClusterId",params,undefined,false); 
			copyArg(msg,"SnapshottingClusterId",params,undefined,false); 
			copyArg(msg,"AutomaticFailoverEnabled",params,undefined,false); 
			copyArg(msg,"MultiAZEnabled",params,undefined,false); 
			copyArg(msg,"NodeGroupId",params,undefined,false); 
			copyArg(msg,"CacheSecurityGroupNames",params,undefined,true); 
			copyArg(msg,"SecurityGroupIds",params,undefined,true); 
			copyArg(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArg(msg,"NotificationTopicArn",params,undefined,false); 
			copyArg(msg,"CacheParameterGroupName",params,undefined,false); 
			copyArg(msg,"NotificationTopicStatus",params,undefined,false); 
			copyArg(msg,"ApplyImmediately",params,undefined,false); 
			copyArg(msg,"EngineVersion",params,undefined,false); 
			copyArg(msg,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArg(msg,"SnapshotRetentionLimit",params,undefined,false); 
			copyArg(msg,"SnapshotWindow",params,undefined,false); 
			copyArg(msg,"CacheNodeType",params,undefined,false); 
			copyArg(msg,"AuthToken",params,undefined,false); 
			copyArg(msg,"AuthTokenUpdateStrategy",params,undefined,false); 
			copyArg(msg,"UserGroupIdsToAdd",params,undefined,true); 
			copyArg(msg,"UserGroupIdsToRemove",params,undefined,true); 
			copyArg(msg,"RemoveUserGroups",params,undefined,false); 
			copyArg(msg,"LogDeliveryConfigurations",params,undefined,true); 
			

			svc.modifyReplicationGroup(params,cb);
		}

		
		service.ModifyReplicationGroupShardConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReplicationGroupId",params,undefined,false); 
			copyArg(n,"NodeGroupCount",params,undefined,false); 
			copyArg(n,"ApplyImmediately",params,undefined,false); 
			
			copyArg(msg,"ReplicationGroupId",params,undefined,false); 
			copyArg(msg,"NodeGroupCount",params,undefined,false); 
			copyArg(msg,"ApplyImmediately",params,undefined,false); 
			copyArg(msg,"ReshardingConfiguration",params,undefined,true); 
			copyArg(msg,"NodeGroupsToRemove",params,undefined,false); 
			copyArg(msg,"NodeGroupsToRetain",params,undefined,false); 
			

			svc.modifyReplicationGroupShardConfiguration(params,cb);
		}

		
		service.ModifyUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserId",params,undefined,false); 
			
			copyArg(msg,"UserId",params,undefined,false); 
			copyArg(msg,"AccessString",params,undefined,false); 
			copyArg(msg,"AppendAccessString",params,undefined,false); 
			copyArg(msg,"Passwords",params,undefined,true); 
			copyArg(msg,"NoPasswordRequired",params,undefined,false); 
			

			svc.modifyUser(params,cb);
		}

		
		service.ModifyUserGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserGroupId",params,undefined,false); 
			
			copyArg(msg,"UserGroupId",params,undefined,false); 
			copyArg(msg,"UserIdsToAdd",params,undefined,true); 
			copyArg(msg,"UserIdsToRemove",params,undefined,true); 
			

			svc.modifyUserGroup(params,cb);
		}

		
		service.PurchaseReservedCacheNodesOffering=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReservedCacheNodesOfferingId",params,undefined,false); 
			
			copyArg(msg,"ReservedCacheNodesOfferingId",params,undefined,false); 
			copyArg(msg,"ReservedCacheNodeId",params,undefined,false); 
			copyArg(msg,"CacheNodeCount",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.purchaseReservedCacheNodesOffering(params,cb);
		}

		
		service.RebalanceSlotsInGlobalReplicationGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalReplicationGroupId",params,undefined,false); 
			copyArg(n,"ApplyImmediately",params,undefined,false); 
			
			copyArg(msg,"GlobalReplicationGroupId",params,undefined,false); 
			copyArg(msg,"ApplyImmediately",params,undefined,false); 
			

			svc.rebalanceSlotsInGlobalReplicationGroup(params,cb);
		}

		
		service.RebootCacheCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CacheClusterId",params,undefined,false); 
			copyArg(n,"CacheNodeIdsToReboot",params,undefined,true); 
			
			copyArg(msg,"CacheClusterId",params,undefined,false); 
			copyArg(msg,"CacheNodeIdsToReboot",params,undefined,true); 
			

			svc.rebootCacheCluster(params,cb);
		}

		
		service.RemoveTagsFromResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceName",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceName",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.removeTagsFromResource(params,cb);
		}

		
		service.ResetCacheParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CacheParameterGroupName",params,undefined,false); 
			
			copyArg(msg,"CacheParameterGroupName",params,undefined,false); 
			copyArg(msg,"ResetAllParameters",params,undefined,false); 
			copyArg(msg,"ParameterNameValues",params,undefined,true); 
			

			svc.resetCacheParameterGroup(params,cb);
		}

		
		service.RevokeCacheSecurityGroupIngress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CacheSecurityGroupName",params,undefined,false); 
			copyArg(n,"EC2SecurityGroupName",params,undefined,false); 
			copyArg(n,"EC2SecurityGroupOwnerId",params,undefined,false); 
			
			copyArg(msg,"CacheSecurityGroupName",params,undefined,false); 
			copyArg(msg,"EC2SecurityGroupName",params,undefined,false); 
			copyArg(msg,"EC2SecurityGroupOwnerId",params,undefined,false); 
			

			svc.revokeCacheSecurityGroupIngress(params,cb);
		}

		
		service.StartMigration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReplicationGroupId",params,undefined,false); 
			copyArg(n,"CustomerNodeEndpointList",params,undefined,false); 
			
			copyArg(msg,"ReplicationGroupId",params,undefined,false); 
			copyArg(msg,"CustomerNodeEndpointList",params,undefined,false); 
			

			svc.startMigration(params,cb);
		}

		
		service.TestFailover=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReplicationGroupId",params,undefined,false); 
			copyArg(n,"NodeGroupId",params,undefined,false); 
			
			copyArg(msg,"ReplicationGroupId",params,undefined,false); 
			copyArg(msg,"NodeGroupId",params,undefined,false); 
			

			svc.testFailover(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS ElastiCache", AmazonAPINode);

};
