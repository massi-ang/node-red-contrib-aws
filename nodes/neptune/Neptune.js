
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

		var awsService = new AWS.Neptune( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Neptune(msg.AWSConfig) : awsService;

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
		
		service.AddRoleToDBCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"FeatureName",params,undefined,false); 
			
			copyArgs(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"FeatureName",params,undefined,false); 
			

			svc.addRoleToDBCluster(params,cb);
		}
		
		service.AddSourceIdentifierToSubscription=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubscriptionName",params,undefined,false); 
			copyArgs(n,"SourceIdentifier",params,undefined,false); 
			
			copyArgs(n,"SubscriptionName",params,undefined,false); 
			copyArgs(n,"SourceIdentifier",params,undefined,false); 
			
			copyArgs(msg,"SubscriptionName",params,undefined,false); 
			copyArgs(msg,"SourceIdentifier",params,undefined,false); 
			

			svc.addSourceIdentifierToSubscription(params,cb);
		}
		
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
		
		service.ApplyPendingMaintenanceAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceIdentifier",params,undefined,false); 
			copyArgs(n,"ApplyAction",params,undefined,false); 
			copyArgs(n,"OptInType",params,undefined,false); 
			
			copyArgs(n,"ResourceIdentifier",params,undefined,false); 
			copyArgs(n,"ApplyAction",params,undefined,false); 
			copyArgs(n,"OptInType",params,undefined,false); 
			
			copyArgs(msg,"ResourceIdentifier",params,undefined,false); 
			copyArgs(msg,"ApplyAction",params,undefined,false); 
			copyArgs(msg,"OptInType",params,undefined,false); 
			

			svc.applyPendingMaintenanceAction(params,cb);
		}
		
		service.CopyDBClusterParameterGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceDBClusterParameterGroupIdentifier",params,undefined,false); 
			copyArgs(n,"TargetDBClusterParameterGroupIdentifier",params,undefined,false); 
			copyArgs(n,"TargetDBClusterParameterGroupDescription",params,undefined,false); 
			
			copyArgs(n,"SourceDBClusterParameterGroupIdentifier",params,undefined,false); 
			copyArgs(n,"TargetDBClusterParameterGroupIdentifier",params,undefined,false); 
			copyArgs(n,"TargetDBClusterParameterGroupDescription",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"SourceDBClusterParameterGroupIdentifier",params,undefined,false); 
			copyArgs(msg,"TargetDBClusterParameterGroupIdentifier",params,undefined,false); 
			copyArgs(msg,"TargetDBClusterParameterGroupDescription",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.copyDBClusterParameterGroup(params,cb);
		}
		
		service.CopyDBClusterSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceDBClusterSnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"TargetDBClusterSnapshotIdentifier",params,undefined,false); 
			
			copyArgs(n,"SourceDBClusterSnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"TargetDBClusterSnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"PreSignedUrl",params,undefined,false); 
			copyArgs(Boolean(n),"CopyTags",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"SourceDBClusterSnapshotIdentifier",params,undefined,false); 
			copyArgs(msg,"TargetDBClusterSnapshotIdentifier",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"PreSignedUrl",params,undefined,false); 
			copyArgs(msg,"CopyTags",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.copyDBClusterSnapshot(params,cb);
		}
		
		service.CopyDBParameterGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceDBParameterGroupIdentifier",params,undefined,false); 
			copyArgs(n,"TargetDBParameterGroupIdentifier",params,undefined,false); 
			copyArgs(n,"TargetDBParameterGroupDescription",params,undefined,false); 
			
			copyArgs(n,"SourceDBParameterGroupIdentifier",params,undefined,false); 
			copyArgs(n,"TargetDBParameterGroupIdentifier",params,undefined,false); 
			copyArgs(n,"TargetDBParameterGroupDescription",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"SourceDBParameterGroupIdentifier",params,undefined,false); 
			copyArgs(msg,"TargetDBParameterGroupIdentifier",params,undefined,false); 
			copyArgs(msg,"TargetDBParameterGroupDescription",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.copyDBParameterGroup(params,cb);
		}
		
		service.CreateDBCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"Engine",params,undefined,false); 
			
			copyArgs(n,"AvailabilityZones",params,undefined,true); 
			copyArgs(Number(n),"BackupRetentionPeriod",params,undefined,false); 
			copyArgs(n,"CharacterSetName",params,undefined,false); 
			copyArgs(Boolean(n),"CopyTagsToSnapshot",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"DBClusterParameterGroupName",params,undefined,false); 
			copyArgs(n,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(n,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(Number(n),"Port",params,undefined,false); 
			copyArgs(n,"MasterUsername",params,undefined,false); 
			copyArgs(n,"MasterUserPassword",params,undefined,false); 
			copyArgs(n,"OptionGroupName",params,undefined,false); 
			copyArgs(n,"PreferredBackupWindow",params,undefined,false); 
			copyArgs(n,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(n,"ReplicationSourceIdentifier",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(Boolean(n),"StorageEncrypted",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"PreSignedUrl",params,undefined,false); 
			copyArgs(Boolean(n),"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArgs(n,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArgs(Boolean(n),"DeletionProtection",params,undefined,false); 
			
			copyArgs(msg,"AvailabilityZones",params,undefined,true); 
			copyArgs(msg,"BackupRetentionPeriod",params,undefined,false); 
			copyArgs(msg,"CharacterSetName",params,undefined,false); 
			copyArgs(msg,"CopyTagsToSnapshot",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"DBClusterParameterGroupName",params,undefined,false); 
			copyArgs(msg,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(msg,"Engine",params,undefined,false); 
			copyArgs(msg,"EngineVersion",params,undefined,false); 
			copyArgs(msg,"Port",params,undefined,false); 
			copyArgs(msg,"MasterUsername",params,undefined,false); 
			copyArgs(msg,"MasterUserPassword",params,undefined,false); 
			copyArgs(msg,"OptionGroupName",params,undefined,false); 
			copyArgs(msg,"PreferredBackupWindow",params,undefined,false); 
			copyArgs(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(msg,"ReplicationSourceIdentifier",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"StorageEncrypted",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"PreSignedUrl",params,undefined,false); 
			copyArgs(msg,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArgs(msg,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArgs(msg,"DeletionProtection",params,undefined,false); 
			

			svc.createDBCluster(params,cb);
		}
		
		service.CreateDBClusterEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"DBClusterEndpointIdentifier",params,undefined,false); 
			copyArgs(n,"EndpointType",params,undefined,false); 
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"DBClusterEndpointIdentifier",params,undefined,false); 
			copyArgs(n,"EndpointType",params,undefined,false); 
			copyArgs(n,"StaticMembers",params,undefined,true); 
			copyArgs(n,"ExcludedMembers",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"DBClusterEndpointIdentifier",params,undefined,false); 
			copyArgs(msg,"EndpointType",params,undefined,false); 
			copyArgs(msg,"StaticMembers",params,undefined,true); 
			copyArgs(msg,"ExcludedMembers",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createDBClusterEndpoint(params,cb);
		}
		
		service.CreateDBClusterParameterGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterParameterGroupName",params,undefined,false); 
			copyArgs(n,"DBParameterGroupFamily",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(n,"DBClusterParameterGroupName",params,undefined,false); 
			copyArgs(n,"DBParameterGroupFamily",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DBClusterParameterGroupName",params,undefined,false); 
			copyArgs(msg,"DBParameterGroupFamily",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createDBClusterParameterGroup(params,cb);
		}
		
		service.CreateDBClusterSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterSnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBClusterSnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DBClusterSnapshotIdentifier",params,undefined,false); 
			copyArgs(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createDBClusterSnapshot(params,cb);
		}
		
		service.CreateDBInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(n,"DBInstanceClass",params,undefined,false); 
			copyArgs(n,"Engine",params,undefined,false); 
			
			copyArgs(n,"DBName",params,undefined,false); 
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(Number(n),"AllocatedStorage",params,undefined,false); 
			copyArgs(n,"DBInstanceClass",params,undefined,false); 
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"MasterUsername",params,undefined,false); 
			copyArgs(n,"MasterUserPassword",params,undefined,false); 
			copyArgs(n,"DBSecurityGroups",params,undefined,true); 
			copyArgs(n,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(n,"AvailabilityZone",params,undefined,false); 
			copyArgs(n,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(n,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(n,"DBParameterGroupName",params,undefined,false); 
			copyArgs(Number(n),"BackupRetentionPeriod",params,undefined,false); 
			copyArgs(n,"PreferredBackupWindow",params,undefined,false); 
			copyArgs(Number(n),"Port",params,undefined,false); 
			copyArgs(Boolean(n),"MultiAZ",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(Boolean(n),"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArgs(n,"LicenseModel",params,undefined,false); 
			copyArgs(Number(n),"Iops",params,undefined,false); 
			copyArgs(n,"OptionGroupName",params,undefined,false); 
			copyArgs(n,"CharacterSetName",params,undefined,false); 
			copyArgs(Boolean(n),"PubliclyAccessible",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"StorageType",params,undefined,false); 
			copyArgs(n,"TdeCredentialArn",params,undefined,false); 
			copyArgs(n,"TdeCredentialPassword",params,undefined,false); 
			copyArgs(Boolean(n),"StorageEncrypted",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"Domain",params,undefined,false); 
			copyArgs(Boolean(n),"CopyTagsToSnapshot",params,undefined,false); 
			copyArgs(Number(n),"MonitoringInterval",params,undefined,false); 
			copyArgs(n,"MonitoringRoleArn",params,undefined,false); 
			copyArgs(n,"DomainIAMRoleName",params,undefined,false); 
			copyArgs(Number(n),"PromotionTier",params,undefined,false); 
			copyArgs(n,"Timezone",params,undefined,false); 
			copyArgs(Boolean(n),"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArgs(Boolean(n),"EnablePerformanceInsights",params,undefined,false); 
			copyArgs(n,"PerformanceInsightsKMSKeyId",params,undefined,false); 
			copyArgs(n,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArgs(Boolean(n),"DeletionProtection",params,undefined,false); 
			
			copyArgs(msg,"DBName",params,undefined,false); 
			copyArgs(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(msg,"AllocatedStorage",params,undefined,false); 
			copyArgs(msg,"DBInstanceClass",params,undefined,false); 
			copyArgs(msg,"Engine",params,undefined,false); 
			copyArgs(msg,"MasterUsername",params,undefined,false); 
			copyArgs(msg,"MasterUserPassword",params,undefined,false); 
			copyArgs(msg,"DBSecurityGroups",params,undefined,true); 
			copyArgs(msg,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"AvailabilityZone",params,undefined,false); 
			copyArgs(msg,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(msg,"DBParameterGroupName",params,undefined,false); 
			copyArgs(msg,"BackupRetentionPeriod",params,undefined,false); 
			copyArgs(msg,"PreferredBackupWindow",params,undefined,false); 
			copyArgs(msg,"Port",params,undefined,false); 
			copyArgs(msg,"MultiAZ",params,undefined,false); 
			copyArgs(msg,"EngineVersion",params,undefined,false); 
			copyArgs(msg,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArgs(msg,"LicenseModel",params,undefined,false); 
			copyArgs(msg,"Iops",params,undefined,false); 
			copyArgs(msg,"OptionGroupName",params,undefined,false); 
			copyArgs(msg,"CharacterSetName",params,undefined,false); 
			copyArgs(msg,"PubliclyAccessible",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"StorageType",params,undefined,false); 
			copyArgs(msg,"TdeCredentialArn",params,undefined,false); 
			copyArgs(msg,"TdeCredentialPassword",params,undefined,false); 
			copyArgs(msg,"StorageEncrypted",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"Domain",params,undefined,false); 
			copyArgs(msg,"CopyTagsToSnapshot",params,undefined,false); 
			copyArgs(msg,"MonitoringInterval",params,undefined,false); 
			copyArgs(msg,"MonitoringRoleArn",params,undefined,false); 
			copyArgs(msg,"DomainIAMRoleName",params,undefined,false); 
			copyArgs(msg,"PromotionTier",params,undefined,false); 
			copyArgs(msg,"Timezone",params,undefined,false); 
			copyArgs(msg,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArgs(msg,"EnablePerformanceInsights",params,undefined,false); 
			copyArgs(msg,"PerformanceInsightsKMSKeyId",params,undefined,false); 
			copyArgs(msg,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArgs(msg,"DeletionProtection",params,undefined,false); 
			

			svc.createDBInstance(params,cb);
		}
		
		service.CreateDBParameterGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBParameterGroupName",params,undefined,false); 
			copyArgs(n,"DBParameterGroupFamily",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(n,"DBParameterGroupName",params,undefined,false); 
			copyArgs(n,"DBParameterGroupFamily",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DBParameterGroupName",params,undefined,false); 
			copyArgs(msg,"DBParameterGroupFamily",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createDBParameterGroup(params,cb);
		}
		
		service.CreateDBSubnetGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(n,"DBSubnetGroupDescription",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			
			copyArgs(n,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(n,"DBSubnetGroupDescription",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(msg,"DBSubnetGroupDescription",params,undefined,false); 
			copyArgs(msg,"SubnetIds",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createDBSubnetGroup(params,cb);
		}
		
		service.CreateEventSubscription=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubscriptionName",params,undefined,false); 
			copyArgs(n,"SnsTopicArn",params,undefined,false); 
			
			copyArgs(n,"SubscriptionName",params,undefined,false); 
			copyArgs(n,"SnsTopicArn",params,undefined,false); 
			copyArgs(n,"SourceType",params,undefined,false); 
			copyArgs(n,"EventCategories",params,undefined,true); 
			copyArgs(n,"SourceIds",params,undefined,true); 
			copyArgs(Boolean(n),"Enabled",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"SubscriptionName",params,undefined,false); 
			copyArgs(msg,"SnsTopicArn",params,undefined,false); 
			copyArgs(msg,"SourceType",params,undefined,false); 
			copyArgs(msg,"EventCategories",params,undefined,true); 
			copyArgs(msg,"SourceIds",params,undefined,true); 
			copyArgs(msg,"Enabled",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createEventSubscription(params,cb);
		}
		
		service.DeleteDBCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(Boolean(n),"SkipFinalSnapshot",params,undefined,false); 
			copyArgs(n,"FinalDBSnapshotIdentifier",params,undefined,false); 
			
			copyArgs(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"SkipFinalSnapshot",params,undefined,false); 
			copyArgs(msg,"FinalDBSnapshotIdentifier",params,undefined,false); 
			

			svc.deleteDBCluster(params,cb);
		}
		
		service.DeleteDBClusterEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterEndpointIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBClusterEndpointIdentifier",params,undefined,false); 
			
			copyArgs(msg,"DBClusterEndpointIdentifier",params,undefined,false); 
			

			svc.deleteDBClusterEndpoint(params,cb);
		}
		
		service.DeleteDBClusterParameterGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterParameterGroupName",params,undefined,false); 
			
			copyArgs(n,"DBClusterParameterGroupName",params,undefined,false); 
			
			copyArgs(msg,"DBClusterParameterGroupName",params,undefined,false); 
			

			svc.deleteDBClusterParameterGroup(params,cb);
		}
		
		service.DeleteDBClusterSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterSnapshotIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBClusterSnapshotIdentifier",params,undefined,false); 
			
			copyArgs(msg,"DBClusterSnapshotIdentifier",params,undefined,false); 
			

			svc.deleteDBClusterSnapshot(params,cb);
		}
		
		service.DeleteDBInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(Boolean(n),"SkipFinalSnapshot",params,undefined,false); 
			copyArgs(n,"FinalDBSnapshotIdentifier",params,undefined,false); 
			
			copyArgs(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(msg,"SkipFinalSnapshot",params,undefined,false); 
			copyArgs(msg,"FinalDBSnapshotIdentifier",params,undefined,false); 
			

			svc.deleteDBInstance(params,cb);
		}
		
		service.DeleteDBParameterGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBParameterGroupName",params,undefined,false); 
			
			copyArgs(n,"DBParameterGroupName",params,undefined,false); 
			
			copyArgs(msg,"DBParameterGroupName",params,undefined,false); 
			

			svc.deleteDBParameterGroup(params,cb);
		}
		
		service.DeleteDBSubnetGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBSubnetGroupName",params,undefined,false); 
			
			copyArgs(n,"DBSubnetGroupName",params,undefined,false); 
			
			copyArgs(msg,"DBSubnetGroupName",params,undefined,false); 
			

			svc.deleteDBSubnetGroup(params,cb);
		}
		
		service.DeleteEventSubscription=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubscriptionName",params,undefined,false); 
			
			copyArgs(n,"SubscriptionName",params,undefined,false); 
			
			copyArgs(msg,"SubscriptionName",params,undefined,false); 
			

			svc.deleteEventSubscription(params,cb);
		}
		
		service.DescribeDBClusterEndpoints=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"DBClusterEndpointIdentifier",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"DBClusterEndpointIdentifier",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeDBClusterEndpoints(params,cb);
		}
		
		service.DescribeDBClusterParameterGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DBClusterParameterGroupName",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"DBClusterParameterGroupName",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeDBClusterParameterGroups(params,cb);
		}
		
		service.DescribeDBClusterParameters=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterParameterGroupName",params,undefined,false); 
			
			copyArgs(n,"DBClusterParameterGroupName",params,undefined,false); 
			copyArgs(n,"Source",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"DBClusterParameterGroupName",params,undefined,false); 
			copyArgs(msg,"Source",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeDBClusterParameters(params,cb);
		}
		
		service.DescribeDBClusterSnapshotAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterSnapshotIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBClusterSnapshotIdentifier",params,undefined,false); 
			
			copyArgs(msg,"DBClusterSnapshotIdentifier",params,undefined,false); 
			

			svc.describeDBClusterSnapshotAttributes(params,cb);
		}
		
		service.DescribeDBClusterSnapshots=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"DBClusterSnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"SnapshotType",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(Boolean(n),"IncludeShared",params,undefined,false); 
			copyArgs(Boolean(n),"IncludePublic",params,undefined,false); 
			
			copyArgs(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"DBClusterSnapshotIdentifier",params,undefined,false); 
			copyArgs(msg,"SnapshotType",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"IncludeShared",params,undefined,false); 
			copyArgs(msg,"IncludePublic",params,undefined,false); 
			

			svc.describeDBClusterSnapshots(params,cb);
		}
		
		service.DescribeDBClusters=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeDBClusters(params,cb);
		}
		
		service.DescribeDBEngineVersions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(n,"DBParameterGroupFamily",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(Boolean(n),"DefaultOnly",params,undefined,false); 
			copyArgs(Boolean(n),"ListSupportedCharacterSets",params,undefined,false); 
			copyArgs(Boolean(n),"ListSupportedTimezones",params,undefined,false); 
			
			copyArgs(msg,"Engine",params,undefined,false); 
			copyArgs(msg,"EngineVersion",params,undefined,false); 
			copyArgs(msg,"DBParameterGroupFamily",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"DefaultOnly",params,undefined,false); 
			copyArgs(msg,"ListSupportedCharacterSets",params,undefined,false); 
			copyArgs(msg,"ListSupportedTimezones",params,undefined,false); 
			

			svc.describeDBEngineVersions(params,cb);
		}
		
		service.DescribeDBInstances=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeDBInstances(params,cb);
		}
		
		service.DescribeDBParameterGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DBParameterGroupName",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"DBParameterGroupName",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeDBParameterGroups(params,cb);
		}
		
		service.DescribeDBParameters=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBParameterGroupName",params,undefined,false); 
			
			copyArgs(n,"DBParameterGroupName",params,undefined,false); 
			copyArgs(n,"Source",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"DBParameterGroupName",params,undefined,false); 
			copyArgs(msg,"Source",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeDBParameters(params,cb);
		}
		
		service.DescribeDBSubnetGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeDBSubnetGroups(params,cb);
		}
		
		service.DescribeEngineDefaultClusterParameters=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBParameterGroupFamily",params,undefined,false); 
			
			copyArgs(n,"DBParameterGroupFamily",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"DBParameterGroupFamily",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeEngineDefaultClusterParameters(params,cb);
		}
		
		service.DescribeEngineDefaultParameters=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBParameterGroupFamily",params,undefined,false); 
			
			copyArgs(n,"DBParameterGroupFamily",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"DBParameterGroupFamily",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeEngineDefaultParameters(params,cb);
		}
		
		service.DescribeEventCategories=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SourceType",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			
			copyArgs(msg,"SourceType",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			

			svc.describeEventCategories(params,cb);
		}
		
		service.DescribeEventSubscriptions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SubscriptionName",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"SubscriptionName",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeEventSubscriptions(params,cb);
		}
		
		service.DescribeEvents=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SourceIdentifier",params,undefined,false); 
			copyArgs(n,"SourceType",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(Number(n),"Duration",params,undefined,false); 
			copyArgs(n,"EventCategories",params,undefined,true); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"SourceIdentifier",params,undefined,false); 
			copyArgs(msg,"SourceType",params,undefined,false); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"Duration",params,undefined,false); 
			copyArgs(msg,"EventCategories",params,undefined,true); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeEvents(params,cb);
		}
		
		service.DescribeOrderableDBInstanceOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Engine",params,undefined,false); 
			
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(n,"DBInstanceClass",params,undefined,false); 
			copyArgs(n,"LicenseModel",params,undefined,false); 
			copyArgs(Boolean(n),"Vpc",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"Engine",params,undefined,false); 
			copyArgs(msg,"EngineVersion",params,undefined,false); 
			copyArgs(msg,"DBInstanceClass",params,undefined,false); 
			copyArgs(msg,"LicenseModel",params,undefined,false); 
			copyArgs(msg,"Vpc",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeOrderableDBInstanceOptions(params,cb);
		}
		
		service.DescribePendingMaintenanceActions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ResourceIdentifier",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			
			copyArgs(msg,"ResourceIdentifier",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			

			svc.describePendingMaintenanceActions(params,cb);
		}
		
		service.DescribeValidDBInstanceModifications=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			
			copyArgs(msg,"DBInstanceIdentifier",params,undefined,false); 
			

			svc.describeValidDBInstanceModifications(params,cb);
		}
		
		service.FailoverDBCluster=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"TargetDBInstanceIdentifier",params,undefined,false); 
			
			copyArgs(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"TargetDBInstanceIdentifier",params,undefined,false); 
			

			svc.failoverDBCluster(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceName",params,undefined,false); 
			
			copyArgs(n,"ResourceName",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			
			copyArgs(msg,"ResourceName",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.ModifyDBCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"NewDBClusterIdentifier",params,undefined,false); 
			copyArgs(Boolean(n),"ApplyImmediately",params,undefined,false); 
			copyArgs(Number(n),"BackupRetentionPeriod",params,undefined,false); 
			copyArgs(n,"DBClusterParameterGroupName",params,undefined,false); 
			copyArgs(n,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(Number(n),"Port",params,undefined,false); 
			copyArgs(n,"MasterUserPassword",params,undefined,false); 
			copyArgs(n,"OptionGroupName",params,undefined,false); 
			copyArgs(n,"PreferredBackupWindow",params,undefined,false); 
			copyArgs(n,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(Boolean(n),"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArgs(n,"CloudwatchLogsExportConfiguration",params,undefined,true); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(Boolean(n),"DeletionProtection",params,undefined,false); 
			copyArgs(Boolean(n),"CopyTagsToSnapshot",params,undefined,false); 
			
			copyArgs(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"NewDBClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"ApplyImmediately",params,undefined,false); 
			copyArgs(msg,"BackupRetentionPeriod",params,undefined,false); 
			copyArgs(msg,"DBClusterParameterGroupName",params,undefined,false); 
			copyArgs(msg,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"Port",params,undefined,false); 
			copyArgs(msg,"MasterUserPassword",params,undefined,false); 
			copyArgs(msg,"OptionGroupName",params,undefined,false); 
			copyArgs(msg,"PreferredBackupWindow",params,undefined,false); 
			copyArgs(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(msg,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArgs(msg,"CloudwatchLogsExportConfiguration",params,undefined,true); 
			copyArgs(msg,"EngineVersion",params,undefined,false); 
			copyArgs(msg,"DeletionProtection",params,undefined,false); 
			copyArgs(msg,"CopyTagsToSnapshot",params,undefined,false); 
			

			svc.modifyDBCluster(params,cb);
		}
		
		service.ModifyDBClusterEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterEndpointIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBClusterEndpointIdentifier",params,undefined,false); 
			copyArgs(n,"EndpointType",params,undefined,false); 
			copyArgs(n,"StaticMembers",params,undefined,true); 
			copyArgs(n,"ExcludedMembers",params,undefined,true); 
			
			copyArgs(msg,"DBClusterEndpointIdentifier",params,undefined,false); 
			copyArgs(msg,"EndpointType",params,undefined,false); 
			copyArgs(msg,"StaticMembers",params,undefined,true); 
			copyArgs(msg,"ExcludedMembers",params,undefined,true); 
			

			svc.modifyDBClusterEndpoint(params,cb);
		}
		
		service.ModifyDBClusterParameterGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterParameterGroupName",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			
			copyArgs(n,"DBClusterParameterGroupName",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			
			copyArgs(msg,"DBClusterParameterGroupName",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			

			svc.modifyDBClusterParameterGroup(params,cb);
		}
		
		service.ModifyDBClusterSnapshotAttribute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterSnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"AttributeName",params,undefined,false); 
			
			copyArgs(n,"DBClusterSnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"AttributeName",params,undefined,false); 
			copyArgs(n,"ValuesToAdd",params,undefined,true); 
			copyArgs(n,"ValuesToRemove",params,undefined,true); 
			
			copyArgs(msg,"DBClusterSnapshotIdentifier",params,undefined,false); 
			copyArgs(msg,"AttributeName",params,undefined,false); 
			copyArgs(msg,"ValuesToAdd",params,undefined,true); 
			copyArgs(msg,"ValuesToRemove",params,undefined,true); 
			

			svc.modifyDBClusterSnapshotAttribute(params,cb);
		}
		
		service.ModifyDBInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(Number(n),"AllocatedStorage",params,undefined,false); 
			copyArgs(n,"DBInstanceClass",params,undefined,false); 
			copyArgs(n,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(n,"DBSecurityGroups",params,undefined,true); 
			copyArgs(n,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(Boolean(n),"ApplyImmediately",params,undefined,false); 
			copyArgs(n,"MasterUserPassword",params,undefined,false); 
			copyArgs(n,"DBParameterGroupName",params,undefined,false); 
			copyArgs(Number(n),"BackupRetentionPeriod",params,undefined,false); 
			copyArgs(n,"PreferredBackupWindow",params,undefined,false); 
			copyArgs(n,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(Boolean(n),"MultiAZ",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(Boolean(n),"AllowMajorVersionUpgrade",params,undefined,false); 
			copyArgs(Boolean(n),"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArgs(n,"LicenseModel",params,undefined,false); 
			copyArgs(Number(n),"Iops",params,undefined,false); 
			copyArgs(n,"OptionGroupName",params,undefined,false); 
			copyArgs(n,"NewDBInstanceIdentifier",params,undefined,false); 
			copyArgs(n,"StorageType",params,undefined,false); 
			copyArgs(n,"TdeCredentialArn",params,undefined,false); 
			copyArgs(n,"TdeCredentialPassword",params,undefined,false); 
			copyArgs(n,"CACertificateIdentifier",params,undefined,false); 
			copyArgs(n,"Domain",params,undefined,false); 
			copyArgs(Boolean(n),"CopyTagsToSnapshot",params,undefined,false); 
			copyArgs(Number(n),"MonitoringInterval",params,undefined,false); 
			copyArgs(Number(n),"DBPortNumber",params,undefined,false); 
			copyArgs(Boolean(n),"PubliclyAccessible",params,undefined,false); 
			copyArgs(n,"MonitoringRoleArn",params,undefined,false); 
			copyArgs(n,"DomainIAMRoleName",params,undefined,false); 
			copyArgs(Number(n),"PromotionTier",params,undefined,false); 
			copyArgs(Boolean(n),"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArgs(Boolean(n),"EnablePerformanceInsights",params,undefined,false); 
			copyArgs(n,"PerformanceInsightsKMSKeyId",params,undefined,false); 
			copyArgs(n,"CloudwatchLogsExportConfiguration",params,undefined,true); 
			copyArgs(Boolean(n),"DeletionProtection",params,undefined,false); 
			
			copyArgs(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(msg,"AllocatedStorage",params,undefined,false); 
			copyArgs(msg,"DBInstanceClass",params,undefined,false); 
			copyArgs(msg,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(msg,"DBSecurityGroups",params,undefined,true); 
			copyArgs(msg,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"ApplyImmediately",params,undefined,false); 
			copyArgs(msg,"MasterUserPassword",params,undefined,false); 
			copyArgs(msg,"DBParameterGroupName",params,undefined,false); 
			copyArgs(msg,"BackupRetentionPeriod",params,undefined,false); 
			copyArgs(msg,"PreferredBackupWindow",params,undefined,false); 
			copyArgs(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(msg,"MultiAZ",params,undefined,false); 
			copyArgs(msg,"EngineVersion",params,undefined,false); 
			copyArgs(msg,"AllowMajorVersionUpgrade",params,undefined,false); 
			copyArgs(msg,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArgs(msg,"LicenseModel",params,undefined,false); 
			copyArgs(msg,"Iops",params,undefined,false); 
			copyArgs(msg,"OptionGroupName",params,undefined,false); 
			copyArgs(msg,"NewDBInstanceIdentifier",params,undefined,false); 
			copyArgs(msg,"StorageType",params,undefined,false); 
			copyArgs(msg,"TdeCredentialArn",params,undefined,false); 
			copyArgs(msg,"TdeCredentialPassword",params,undefined,false); 
			copyArgs(msg,"CACertificateIdentifier",params,undefined,false); 
			copyArgs(msg,"Domain",params,undefined,false); 
			copyArgs(msg,"CopyTagsToSnapshot",params,undefined,false); 
			copyArgs(msg,"MonitoringInterval",params,undefined,false); 
			copyArgs(msg,"DBPortNumber",params,undefined,false); 
			copyArgs(msg,"PubliclyAccessible",params,undefined,false); 
			copyArgs(msg,"MonitoringRoleArn",params,undefined,false); 
			copyArgs(msg,"DomainIAMRoleName",params,undefined,false); 
			copyArgs(msg,"PromotionTier",params,undefined,false); 
			copyArgs(msg,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArgs(msg,"EnablePerformanceInsights",params,undefined,false); 
			copyArgs(msg,"PerformanceInsightsKMSKeyId",params,undefined,false); 
			copyArgs(msg,"CloudwatchLogsExportConfiguration",params,undefined,true); 
			copyArgs(msg,"DeletionProtection",params,undefined,false); 
			

			svc.modifyDBInstance(params,cb);
		}
		
		service.ModifyDBParameterGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBParameterGroupName",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			
			copyArgs(n,"DBParameterGroupName",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			
			copyArgs(msg,"DBParameterGroupName",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			

			svc.modifyDBParameterGroup(params,cb);
		}
		
		service.ModifyDBSubnetGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			
			copyArgs(n,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(n,"DBSubnetGroupDescription",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			
			copyArgs(msg,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(msg,"DBSubnetGroupDescription",params,undefined,false); 
			copyArgs(msg,"SubnetIds",params,undefined,true); 
			

			svc.modifyDBSubnetGroup(params,cb);
		}
		
		service.ModifyEventSubscription=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubscriptionName",params,undefined,false); 
			
			copyArgs(n,"SubscriptionName",params,undefined,false); 
			copyArgs(n,"SnsTopicArn",params,undefined,false); 
			copyArgs(n,"SourceType",params,undefined,false); 
			copyArgs(n,"EventCategories",params,undefined,true); 
			copyArgs(Boolean(n),"Enabled",params,undefined,false); 
			
			copyArgs(msg,"SubscriptionName",params,undefined,false); 
			copyArgs(msg,"SnsTopicArn",params,undefined,false); 
			copyArgs(msg,"SourceType",params,undefined,false); 
			copyArgs(msg,"EventCategories",params,undefined,true); 
			copyArgs(msg,"Enabled",params,undefined,false); 
			

			svc.modifyEventSubscription(params,cb);
		}
		
		service.PromoteReadReplicaDBCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			
			copyArgs(msg,"DBClusterIdentifier",params,undefined,false); 
			

			svc.promoteReadReplicaDBCluster(params,cb);
		}
		
		service.RebootDBInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(Boolean(n),"ForceFailover",params,undefined,false); 
			
			copyArgs(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(msg,"ForceFailover",params,undefined,false); 
			

			svc.rebootDBInstance(params,cb);
		}
		
		service.RemoveRoleFromDBCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"FeatureName",params,undefined,false); 
			
			copyArgs(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"FeatureName",params,undefined,false); 
			

			svc.removeRoleFromDBCluster(params,cb);
		}
		
		service.RemoveSourceIdentifierFromSubscription=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubscriptionName",params,undefined,false); 
			copyArgs(n,"SourceIdentifier",params,undefined,false); 
			
			copyArgs(n,"SubscriptionName",params,undefined,false); 
			copyArgs(n,"SourceIdentifier",params,undefined,false); 
			
			copyArgs(msg,"SubscriptionName",params,undefined,false); 
			copyArgs(msg,"SourceIdentifier",params,undefined,false); 
			

			svc.removeSourceIdentifierFromSubscription(params,cb);
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
		
		service.ResetDBClusterParameterGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterParameterGroupName",params,undefined,false); 
			
			copyArgs(n,"DBClusterParameterGroupName",params,undefined,false); 
			copyArgs(Boolean(n),"ResetAllParameters",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			
			copyArgs(msg,"DBClusterParameterGroupName",params,undefined,false); 
			copyArgs(msg,"ResetAllParameters",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			

			svc.resetDBClusterParameterGroup(params,cb);
		}
		
		service.ResetDBParameterGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBParameterGroupName",params,undefined,false); 
			
			copyArgs(n,"DBParameterGroupName",params,undefined,false); 
			copyArgs(Boolean(n),"ResetAllParameters",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			
			copyArgs(msg,"DBParameterGroupName",params,undefined,false); 
			copyArgs(msg,"ResetAllParameters",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			

			svc.resetDBParameterGroup(params,cb);
		}
		
		service.RestoreDBClusterFromSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"SnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"Engine",params,undefined,false); 
			
			copyArgs(n,"AvailabilityZones",params,undefined,true); 
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"SnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(Number(n),"Port",params,undefined,false); 
			copyArgs(n,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"OptionGroupName",params,undefined,false); 
			copyArgs(n,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(Boolean(n),"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArgs(n,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArgs(n,"DBClusterParameterGroupName",params,undefined,false); 
			copyArgs(Boolean(n),"DeletionProtection",params,undefined,false); 
			copyArgs(Boolean(n),"CopyTagsToSnapshot",params,undefined,false); 
			
			copyArgs(msg,"AvailabilityZones",params,undefined,true); 
			copyArgs(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"SnapshotIdentifier",params,undefined,false); 
			copyArgs(msg,"Engine",params,undefined,false); 
			copyArgs(msg,"EngineVersion",params,undefined,false); 
			copyArgs(msg,"Port",params,undefined,false); 
			copyArgs(msg,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"OptionGroupName",params,undefined,false); 
			copyArgs(msg,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArgs(msg,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArgs(msg,"DBClusterParameterGroupName",params,undefined,false); 
			copyArgs(msg,"DeletionProtection",params,undefined,false); 
			copyArgs(msg,"CopyTagsToSnapshot",params,undefined,false); 
			

			svc.restoreDBClusterFromSnapshot(params,cb);
		}
		
		service.RestoreDBClusterToPointInTime=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"SourceDBClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"RestoreType",params,undefined,false); 
			copyArgs(n,"SourceDBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"RestoreToTime",params,undefined,false); 
			copyArgs(Boolean(n),"UseLatestRestorableTime",params,undefined,false); 
			copyArgs(Number(n),"Port",params,undefined,false); 
			copyArgs(n,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(n,"OptionGroupName",params,undefined,false); 
			copyArgs(n,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(Boolean(n),"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArgs(n,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArgs(n,"DBClusterParameterGroupName",params,undefined,false); 
			copyArgs(Boolean(n),"DeletionProtection",params,undefined,false); 
			
			copyArgs(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"RestoreType",params,undefined,false); 
			copyArgs(msg,"SourceDBClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"RestoreToTime",params,undefined,false); 
			copyArgs(msg,"UseLatestRestorableTime",params,undefined,false); 
			copyArgs(msg,"Port",params,undefined,false); 
			copyArgs(msg,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(msg,"OptionGroupName",params,undefined,false); 
			copyArgs(msg,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArgs(msg,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArgs(msg,"DBClusterParameterGroupName",params,undefined,false); 
			copyArgs(msg,"DeletionProtection",params,undefined,false); 
			

			svc.restoreDBClusterToPointInTime(params,cb);
		}
		
		service.StartDBCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			
			copyArgs(msg,"DBClusterIdentifier",params,undefined,false); 
			

			svc.startDBCluster(params,cb);
		}
		
		service.StopDBCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			
			copyArgs(msg,"DBClusterIdentifier",params,undefined,false); 
			

			svc.stopDBCluster(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS Neptune", AmazonAPINode);

};
