
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

		var awsService = new AWS.RDS( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.RDS(msg.AWSConfig) : awsService;

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

		
		service.AddRoleToDBInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"FeatureName",params,undefined,false); 
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"FeatureName",params,undefined,false); 
			
			copyArgs(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"FeatureName",params,undefined,false); 
			

			svc.addRoleToDBInstance(params,cb);
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

		
		service.AuthorizeDBSecurityGroupIngress=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBSecurityGroupName",params,undefined,false); 
			
			copyArgs(n,"DBSecurityGroupName",params,undefined,false); 
			copyArgs(n,"CIDRIP",params,undefined,false); 
			copyArgs(n,"EC2SecurityGroupName",params,undefined,false); 
			copyArgs(n,"EC2SecurityGroupId",params,undefined,false); 
			copyArgs(n,"EC2SecurityGroupOwnerId",params,undefined,false); 
			
			copyArgs(msg,"DBSecurityGroupName",params,undefined,false); 
			copyArgs(msg,"CIDRIP",params,undefined,false); 
			copyArgs(msg,"EC2SecurityGroupName",params,undefined,false); 
			copyArgs(msg,"EC2SecurityGroupId",params,undefined,false); 
			copyArgs(msg,"EC2SecurityGroupOwnerId",params,undefined,false); 
			

			svc.authorizeDBSecurityGroupIngress(params,cb);
		}

		
		service.BacktrackDBCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"BacktrackTo",params,undefined,false); 
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"BacktrackTo",params,undefined,false); 
			copyArgs(n,"Force",params,undefined,false); 
			copyArgs(n,"UseEarliestTimeOnPointInTimeUnavailable",params,undefined,false); 
			
			copyArgs(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"BacktrackTo",params,undefined,false); 
			copyArgs(msg,"Force",params,undefined,false); 
			copyArgs(msg,"UseEarliestTimeOnPointInTimeUnavailable",params,undefined,false); 
			

			svc.backtrackDBCluster(params,cb);
		}

		
		service.CancelExportTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ExportTaskIdentifier",params,undefined,false); 
			
			copyArgs(n,"ExportTaskIdentifier",params,undefined,false); 
			
			copyArgs(msg,"ExportTaskIdentifier",params,undefined,false); 
			

			svc.cancelExportTask(params,cb);
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
			copyArgs(n,"CopyTags",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"SourceRegion",params,undefined,false); 
			
			copyArgs(msg,"SourceDBClusterSnapshotIdentifier",params,undefined,false); 
			copyArgs(msg,"TargetDBClusterSnapshotIdentifier",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"PreSignedUrl",params,undefined,false); 
			copyArgs(msg,"CopyTags",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"SourceRegion",params,undefined,false); 
			

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

		
		service.CopyDBSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceDBSnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"TargetDBSnapshotIdentifier",params,undefined,false); 
			
			copyArgs(n,"SourceDBSnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"TargetDBSnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"CopyTags",params,undefined,false); 
			copyArgs(n,"PreSignedUrl",params,undefined,false); 
			copyArgs(n,"OptionGroupName",params,undefined,false); 
			copyArgs(n,"TargetCustomAvailabilityZone",params,undefined,false); 
			copyArgs(n,"SourceRegion",params,undefined,false); 
			
			copyArgs(msg,"SourceDBSnapshotIdentifier",params,undefined,false); 
			copyArgs(msg,"TargetDBSnapshotIdentifier",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"CopyTags",params,undefined,false); 
			copyArgs(msg,"PreSignedUrl",params,undefined,false); 
			copyArgs(msg,"OptionGroupName",params,undefined,false); 
			copyArgs(msg,"TargetCustomAvailabilityZone",params,undefined,false); 
			copyArgs(msg,"SourceRegion",params,undefined,false); 
			

			svc.copyDBSnapshot(params,cb);
		}

		
		service.CopyOptionGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceOptionGroupIdentifier",params,undefined,false); 
			copyArgs(n,"TargetOptionGroupIdentifier",params,undefined,false); 
			copyArgs(n,"TargetOptionGroupDescription",params,undefined,false); 
			
			copyArgs(n,"SourceOptionGroupIdentifier",params,undefined,false); 
			copyArgs(n,"TargetOptionGroupIdentifier",params,undefined,false); 
			copyArgs(n,"TargetOptionGroupDescription",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"SourceOptionGroupIdentifier",params,undefined,false); 
			copyArgs(msg,"TargetOptionGroupIdentifier",params,undefined,false); 
			copyArgs(msg,"TargetOptionGroupDescription",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.copyOptionGroup(params,cb);
		}

		
		service.CreateCustomAvailabilityZone=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CustomAvailabilityZoneName",params,undefined,false); 
			
			copyArgs(n,"CustomAvailabilityZoneName",params,undefined,false); 
			copyArgs(n,"ExistingVpnId",params,undefined,false); 
			copyArgs(n,"NewVpnTunnelName",params,undefined,false); 
			copyArgs(n,"VpnTunnelOriginatorIP",params,undefined,false); 
			
			copyArgs(msg,"CustomAvailabilityZoneName",params,undefined,false); 
			copyArgs(msg,"ExistingVpnId",params,undefined,false); 
			copyArgs(msg,"NewVpnTunnelName",params,undefined,false); 
			copyArgs(msg,"VpnTunnelOriginatorIP",params,undefined,false); 
			

			svc.createCustomAvailabilityZone(params,cb);
		}

		
		service.CreateDBCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"Engine",params,undefined,false); 
			
			copyArgs(n,"AvailabilityZones",params,undefined,true); 
			copyArgs(n,"BackupRetentionPeriod",params,undefined,false); 
			copyArgs(n,"CharacterSetName",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"DBClusterParameterGroupName",params,undefined,false); 
			copyArgs(n,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(n,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(n,"Port",params,undefined,false); 
			copyArgs(n,"MasterUsername",params,undefined,false); 
			copyArgs(n,"MasterUserPassword",params,undefined,false); 
			copyArgs(n,"OptionGroupName",params,undefined,false); 
			copyArgs(n,"PreferredBackupWindow",params,undefined,false); 
			copyArgs(n,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(n,"ReplicationSourceIdentifier",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"StorageEncrypted",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"PreSignedUrl",params,undefined,false); 
			copyArgs(n,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArgs(n,"BacktrackWindow",params,undefined,false); 
			copyArgs(n,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArgs(n,"EngineMode",params,undefined,false); 
			copyArgs(n,"ScalingConfiguration",params,undefined,true); 
			copyArgs(n,"DeletionProtection",params,undefined,false); 
			copyArgs(n,"GlobalClusterIdentifier",params,undefined,false); 
			copyArgs(n,"EnableHttpEndpoint",params,undefined,false); 
			copyArgs(n,"CopyTagsToSnapshot",params,undefined,false); 
			copyArgs(n,"Domain",params,undefined,false); 
			copyArgs(n,"DomainIAMRoleName",params,undefined,false); 
			copyArgs(n,"EnableGlobalWriteForwarding",params,undefined,false); 
			copyArgs(n,"SourceRegion",params,undefined,false); 
			
			copyArgs(msg,"AvailabilityZones",params,undefined,true); 
			copyArgs(msg,"BackupRetentionPeriod",params,undefined,false); 
			copyArgs(msg,"CharacterSetName",params,undefined,false); 
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
			copyArgs(msg,"BacktrackWindow",params,undefined,false); 
			copyArgs(msg,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArgs(msg,"EngineMode",params,undefined,false); 
			copyArgs(msg,"ScalingConfiguration",params,undefined,true); 
			copyArgs(msg,"DeletionProtection",params,undefined,false); 
			copyArgs(msg,"GlobalClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"EnableHttpEndpoint",params,undefined,false); 
			copyArgs(msg,"CopyTagsToSnapshot",params,undefined,false); 
			copyArgs(msg,"Domain",params,undefined,false); 
			copyArgs(msg,"DomainIAMRoleName",params,undefined,false); 
			copyArgs(msg,"EnableGlobalWriteForwarding",params,undefined,false); 
			copyArgs(msg,"SourceRegion",params,undefined,false); 
			

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
			copyArgs(n,"AllocatedStorage",params,undefined,false); 
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
			copyArgs(n,"BackupRetentionPeriod",params,undefined,false); 
			copyArgs(n,"PreferredBackupWindow",params,undefined,false); 
			copyArgs(n,"Port",params,undefined,false); 
			copyArgs(n,"MultiAZ",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(n,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArgs(n,"LicenseModel",params,undefined,false); 
			copyArgs(n,"Iops",params,undefined,false); 
			copyArgs(n,"OptionGroupName",params,undefined,false); 
			copyArgs(n,"CharacterSetName",params,undefined,false); 
			copyArgs(n,"NcharCharacterSetName",params,undefined,false); 
			copyArgs(n,"PubliclyAccessible",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"StorageType",params,undefined,false); 
			copyArgs(n,"TdeCredentialArn",params,undefined,false); 
			copyArgs(n,"TdeCredentialPassword",params,undefined,false); 
			copyArgs(n,"StorageEncrypted",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"Domain",params,undefined,false); 
			copyArgs(n,"CopyTagsToSnapshot",params,undefined,false); 
			copyArgs(n,"MonitoringInterval",params,undefined,false); 
			copyArgs(n,"MonitoringRoleArn",params,undefined,false); 
			copyArgs(n,"DomainIAMRoleName",params,undefined,false); 
			copyArgs(n,"PromotionTier",params,undefined,false); 
			copyArgs(n,"Timezone",params,undefined,false); 
			copyArgs(n,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArgs(n,"EnablePerformanceInsights",params,undefined,false); 
			copyArgs(n,"PerformanceInsightsKMSKeyId",params,undefined,false); 
			copyArgs(n,"PerformanceInsightsRetentionPeriod",params,undefined,false); 
			copyArgs(n,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArgs(n,"ProcessorFeatures",params,undefined,true); 
			copyArgs(n,"DeletionProtection",params,undefined,false); 
			copyArgs(n,"MaxAllocatedStorage",params,undefined,false); 
			copyArgs(n,"EnableCustomerOwnedIp",params,undefined,false); 
			
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
			copyArgs(msg,"NcharCharacterSetName",params,undefined,false); 
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
			copyArgs(msg,"PerformanceInsightsRetentionPeriod",params,undefined,false); 
			copyArgs(msg,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArgs(msg,"ProcessorFeatures",params,undefined,true); 
			copyArgs(msg,"DeletionProtection",params,undefined,false); 
			copyArgs(msg,"MaxAllocatedStorage",params,undefined,false); 
			copyArgs(msg,"EnableCustomerOwnedIp",params,undefined,false); 
			

			svc.createDBInstance(params,cb);
		}

		
		service.CreateDBInstanceReadReplica=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(n,"SourceDBInstanceIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(n,"SourceDBInstanceIdentifier",params,undefined,false); 
			copyArgs(n,"DBInstanceClass",params,undefined,false); 
			copyArgs(n,"AvailabilityZone",params,undefined,false); 
			copyArgs(n,"Port",params,undefined,false); 
			copyArgs(n,"MultiAZ",params,undefined,false); 
			copyArgs(n,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArgs(n,"Iops",params,undefined,false); 
			copyArgs(n,"OptionGroupName",params,undefined,false); 
			copyArgs(n,"DBParameterGroupName",params,undefined,false); 
			copyArgs(n,"PubliclyAccessible",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(n,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(n,"StorageType",params,undefined,false); 
			copyArgs(n,"CopyTagsToSnapshot",params,undefined,false); 
			copyArgs(n,"MonitoringInterval",params,undefined,false); 
			copyArgs(n,"MonitoringRoleArn",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"PreSignedUrl",params,undefined,false); 
			copyArgs(n,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArgs(n,"EnablePerformanceInsights",params,undefined,false); 
			copyArgs(n,"PerformanceInsightsKMSKeyId",params,undefined,false); 
			copyArgs(n,"PerformanceInsightsRetentionPeriod",params,undefined,false); 
			copyArgs(n,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArgs(n,"ProcessorFeatures",params,undefined,true); 
			copyArgs(n,"UseDefaultProcessorFeatures",params,undefined,false); 
			copyArgs(n,"DeletionProtection",params,undefined,false); 
			copyArgs(n,"Domain",params,undefined,false); 
			copyArgs(n,"DomainIAMRoleName",params,undefined,false); 
			copyArgs(n,"ReplicaMode",params,undefined,false); 
			copyArgs(n,"MaxAllocatedStorage",params,undefined,false); 
			copyArgs(n,"SourceRegion",params,undefined,false); 
			
			copyArgs(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(msg,"SourceDBInstanceIdentifier",params,undefined,false); 
			copyArgs(msg,"DBInstanceClass",params,undefined,false); 
			copyArgs(msg,"AvailabilityZone",params,undefined,false); 
			copyArgs(msg,"Port",params,undefined,false); 
			copyArgs(msg,"MultiAZ",params,undefined,false); 
			copyArgs(msg,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArgs(msg,"Iops",params,undefined,false); 
			copyArgs(msg,"OptionGroupName",params,undefined,false); 
			copyArgs(msg,"DBParameterGroupName",params,undefined,false); 
			copyArgs(msg,"PubliclyAccessible",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(msg,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"StorageType",params,undefined,false); 
			copyArgs(msg,"CopyTagsToSnapshot",params,undefined,false); 
			copyArgs(msg,"MonitoringInterval",params,undefined,false); 
			copyArgs(msg,"MonitoringRoleArn",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"PreSignedUrl",params,undefined,false); 
			copyArgs(msg,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArgs(msg,"EnablePerformanceInsights",params,undefined,false); 
			copyArgs(msg,"PerformanceInsightsKMSKeyId",params,undefined,false); 
			copyArgs(msg,"PerformanceInsightsRetentionPeriod",params,undefined,false); 
			copyArgs(msg,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArgs(msg,"ProcessorFeatures",params,undefined,true); 
			copyArgs(msg,"UseDefaultProcessorFeatures",params,undefined,false); 
			copyArgs(msg,"DeletionProtection",params,undefined,false); 
			copyArgs(msg,"Domain",params,undefined,false); 
			copyArgs(msg,"DomainIAMRoleName",params,undefined,false); 
			copyArgs(msg,"ReplicaMode",params,undefined,false); 
			copyArgs(msg,"MaxAllocatedStorage",params,undefined,false); 
			copyArgs(msg,"SourceRegion",params,undefined,false); 
			

			svc.createDBInstanceReadReplica(params,cb);
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

		
		service.CreateDBProxy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBProxyName",params,undefined,false); 
			copyArgs(n,"EngineFamily",params,undefined,false); 
			copyArgs(n,"Auth",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"VpcSubnetIds",params,undefined,true); 
			
			copyArgs(n,"DBProxyName",params,undefined,false); 
			copyArgs(n,"EngineFamily",params,undefined,false); 
			copyArgs(n,"Auth",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"VpcSubnetIds",params,undefined,true); 
			copyArgs(n,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(n,"RequireTLS",params,undefined,false); 
			copyArgs(n,"IdleClientTimeout",params,undefined,false); 
			copyArgs(n,"DebugLogging",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DBProxyName",params,undefined,false); 
			copyArgs(msg,"EngineFamily",params,undefined,false); 
			copyArgs(msg,"Auth",params,undefined,true); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"VpcSubnetIds",params,undefined,true); 
			copyArgs(msg,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"RequireTLS",params,undefined,false); 
			copyArgs(msg,"IdleClientTimeout",params,undefined,false); 
			copyArgs(msg,"DebugLogging",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createDBProxy(params,cb);
		}

		
		service.CreateDBProxyEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBProxyName",params,undefined,false); 
			copyArgs(n,"DBProxyEndpointName",params,undefined,false); 
			copyArgs(n,"VpcSubnetIds",params,undefined,true); 
			
			copyArgs(n,"DBProxyName",params,undefined,false); 
			copyArgs(n,"DBProxyEndpointName",params,undefined,false); 
			copyArgs(n,"VpcSubnetIds",params,undefined,true); 
			copyArgs(n,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(n,"TargetRole",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DBProxyName",params,undefined,false); 
			copyArgs(msg,"DBProxyEndpointName",params,undefined,false); 
			copyArgs(msg,"VpcSubnetIds",params,undefined,true); 
			copyArgs(msg,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"TargetRole",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createDBProxyEndpoint(params,cb);
		}

		
		service.CreateDBSecurityGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBSecurityGroupName",params,undefined,false); 
			copyArgs(n,"DBSecurityGroupDescription",params,undefined,false); 
			
			copyArgs(n,"DBSecurityGroupName",params,undefined,false); 
			copyArgs(n,"DBSecurityGroupDescription",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DBSecurityGroupName",params,undefined,false); 
			copyArgs(msg,"DBSecurityGroupDescription",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createDBSecurityGroup(params,cb);
		}

		
		service.CreateDBSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBSnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBSnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DBSnapshotIdentifier",params,undefined,false); 
			copyArgs(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createDBSnapshot(params,cb);
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
			copyArgs(n,"Enabled",params,undefined,false); 
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

		
		service.CreateGlobalCluster=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"GlobalClusterIdentifier",params,undefined,false); 
			copyArgs(n,"SourceDBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(n,"DeletionProtection",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"StorageEncrypted",params,undefined,false); 
			
			copyArgs(msg,"GlobalClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"SourceDBClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"Engine",params,undefined,false); 
			copyArgs(msg,"EngineVersion",params,undefined,false); 
			copyArgs(msg,"DeletionProtection",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"StorageEncrypted",params,undefined,false); 
			

			svc.createGlobalCluster(params,cb);
		}

		
		service.CreateOptionGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OptionGroupName",params,undefined,false); 
			copyArgs(n,"EngineName",params,undefined,false); 
			copyArgs(n,"MajorEngineVersion",params,undefined,false); 
			copyArgs(n,"OptionGroupDescription",params,undefined,false); 
			
			copyArgs(n,"OptionGroupName",params,undefined,false); 
			copyArgs(n,"EngineName",params,undefined,false); 
			copyArgs(n,"MajorEngineVersion",params,undefined,false); 
			copyArgs(n,"OptionGroupDescription",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"OptionGroupName",params,undefined,false); 
			copyArgs(msg,"EngineName",params,undefined,false); 
			copyArgs(msg,"MajorEngineVersion",params,undefined,false); 
			copyArgs(msg,"OptionGroupDescription",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createOptionGroup(params,cb);
		}

		
		service.DeleteCustomAvailabilityZone=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CustomAvailabilityZoneId",params,undefined,false); 
			
			copyArgs(n,"CustomAvailabilityZoneId",params,undefined,false); 
			
			copyArgs(msg,"CustomAvailabilityZoneId",params,undefined,false); 
			

			svc.deleteCustomAvailabilityZone(params,cb);
		}

		
		service.DeleteDBCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"SkipFinalSnapshot",params,undefined,false); 
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
			copyArgs(n,"SkipFinalSnapshot",params,undefined,false); 
			copyArgs(n,"FinalDBSnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"DeleteAutomatedBackups",params,undefined,false); 
			
			copyArgs(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(msg,"SkipFinalSnapshot",params,undefined,false); 
			copyArgs(msg,"FinalDBSnapshotIdentifier",params,undefined,false); 
			copyArgs(msg,"DeleteAutomatedBackups",params,undefined,false); 
			

			svc.deleteDBInstance(params,cb);
		}

		
		service.DeleteDBInstanceAutomatedBackup=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DbiResourceId",params,undefined,false); 
			copyArgs(n,"DBInstanceAutomatedBackupsArn",params,undefined,false); 
			
			copyArgs(msg,"DbiResourceId",params,undefined,false); 
			copyArgs(msg,"DBInstanceAutomatedBackupsArn",params,undefined,false); 
			

			svc.deleteDBInstanceAutomatedBackup(params,cb);
		}

		
		service.DeleteDBParameterGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBParameterGroupName",params,undefined,false); 
			
			copyArgs(n,"DBParameterGroupName",params,undefined,false); 
			
			copyArgs(msg,"DBParameterGroupName",params,undefined,false); 
			

			svc.deleteDBParameterGroup(params,cb);
		}

		
		service.DeleteDBProxy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBProxyName",params,undefined,false); 
			
			copyArgs(n,"DBProxyName",params,undefined,false); 
			
			copyArgs(msg,"DBProxyName",params,undefined,false); 
			

			svc.deleteDBProxy(params,cb);
		}

		
		service.DeleteDBProxyEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBProxyEndpointName",params,undefined,false); 
			
			copyArgs(n,"DBProxyEndpointName",params,undefined,false); 
			
			copyArgs(msg,"DBProxyEndpointName",params,undefined,false); 
			

			svc.deleteDBProxyEndpoint(params,cb);
		}

		
		service.DeleteDBSecurityGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBSecurityGroupName",params,undefined,false); 
			
			copyArgs(n,"DBSecurityGroupName",params,undefined,false); 
			
			copyArgs(msg,"DBSecurityGroupName",params,undefined,false); 
			

			svc.deleteDBSecurityGroup(params,cb);
		}

		
		service.DeleteDBSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBSnapshotIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBSnapshotIdentifier",params,undefined,false); 
			
			copyArgs(msg,"DBSnapshotIdentifier",params,undefined,false); 
			

			svc.deleteDBSnapshot(params,cb);
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

		
		service.DeleteGlobalCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"GlobalClusterIdentifier",params,undefined,false); 
			
			copyArgs(msg,"GlobalClusterIdentifier",params,undefined,false); 
			

			svc.deleteGlobalCluster(params,cb);
		}

		
		service.DeleteInstallationMedia=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstallationMediaId",params,undefined,false); 
			
			copyArgs(n,"InstallationMediaId",params,undefined,false); 
			
			copyArgs(msg,"InstallationMediaId",params,undefined,false); 
			

			svc.deleteInstallationMedia(params,cb);
		}

		
		service.DeleteOptionGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OptionGroupName",params,undefined,false); 
			
			copyArgs(n,"OptionGroupName",params,undefined,false); 
			
			copyArgs(msg,"OptionGroupName",params,undefined,false); 
			

			svc.deleteOptionGroup(params,cb);
		}

		
		service.DeregisterDBProxyTargets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBProxyName",params,undefined,false); 
			
			copyArgs(n,"DBProxyName",params,undefined,false); 
			copyArgs(n,"TargetGroupName",params,undefined,false); 
			copyArgs(n,"DBInstanceIdentifiers",params,undefined,true); 
			copyArgs(n,"DBClusterIdentifiers",params,undefined,true); 
			
			copyArgs(msg,"DBProxyName",params,undefined,false); 
			copyArgs(msg,"TargetGroupName",params,undefined,false); 
			copyArgs(msg,"DBInstanceIdentifiers",params,undefined,true); 
			copyArgs(msg,"DBClusterIdentifiers",params,undefined,true); 
			

			svc.deregisterDBProxyTargets(params,cb);
		}

		
		service.DescribeAccountAttributes=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeAccountAttributes(params,cb);
		}

		
		service.DescribeCertificates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CertificateIdentifier",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"CertificateIdentifier",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeCertificates(params,cb);
		}

		
		service.DescribeCustomAvailabilityZones=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CustomAvailabilityZoneId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"CustomAvailabilityZoneId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeCustomAvailabilityZones(params,cb);
		}

		
		service.DescribeDBClusterBacktracks=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"BacktrackIdentifier",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"BacktrackIdentifier",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeDBClusterBacktracks(params,cb);
		}

		
		service.DescribeDBClusterEndpoints=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"DBClusterEndpointIdentifier",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"MaxRecords",params,undefined,false); 
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
			copyArgs(n,"MaxRecords",params,undefined,false); 
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
			copyArgs(n,"MaxRecords",params,undefined,false); 
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
			copyArgs(n,"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"IncludeShared",params,undefined,false); 
			copyArgs(n,"IncludePublic",params,undefined,false); 
			
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
			copyArgs(n,"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"IncludeShared",params,undefined,false); 
			
			copyArgs(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"IncludeShared",params,undefined,false); 
			

			svc.describeDBClusters(params,cb);
		}

		
		service.DescribeDBEngineVersions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(n,"DBParameterGroupFamily",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"DefaultOnly",params,undefined,false); 
			copyArgs(n,"ListSupportedCharacterSets",params,undefined,false); 
			copyArgs(n,"ListSupportedTimezones",params,undefined,false); 
			copyArgs(n,"IncludeAll",params,undefined,false); 
			
			copyArgs(msg,"Engine",params,undefined,false); 
			copyArgs(msg,"EngineVersion",params,undefined,false); 
			copyArgs(msg,"DBParameterGroupFamily",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"DefaultOnly",params,undefined,false); 
			copyArgs(msg,"ListSupportedCharacterSets",params,undefined,false); 
			copyArgs(msg,"ListSupportedTimezones",params,undefined,false); 
			copyArgs(msg,"IncludeAll",params,undefined,false); 
			

			svc.describeDBEngineVersions(params,cb);
		}

		
		service.DescribeDBInstanceAutomatedBackups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DbiResourceId",params,undefined,false); 
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"DBInstanceAutomatedBackupsArn",params,undefined,false); 
			
			copyArgs(msg,"DbiResourceId",params,undefined,false); 
			copyArgs(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"DBInstanceAutomatedBackupsArn",params,undefined,false); 
			

			svc.describeDBInstanceAutomatedBackups(params,cb);
		}

		
		service.DescribeDBInstances=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeDBInstances(params,cb);
		}

		
		service.DescribeDBLogFiles=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(n,"FilenameContains",params,undefined,false); 
			copyArgs(n,"FileLastWritten",params,undefined,false); 
			copyArgs(n,"FileSize",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(msg,"FilenameContains",params,undefined,false); 
			copyArgs(msg,"FileLastWritten",params,undefined,false); 
			copyArgs(msg,"FileSize",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeDBLogFiles(params,cb);
		}

		
		service.DescribeDBParameterGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DBParameterGroupName",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"MaxRecords",params,undefined,false); 
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
			copyArgs(n,"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"DBParameterGroupName",params,undefined,false); 
			copyArgs(msg,"Source",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeDBParameters(params,cb);
		}

		
		service.DescribeDBProxies=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DBProxyName",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxRecords",params,undefined,false); 
			
			copyArgs(msg,"DBProxyName",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			

			svc.describeDBProxies(params,cb);
		}

		
		service.DescribeDBProxyEndpoints=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DBProxyName",params,undefined,false); 
			copyArgs(n,"DBProxyEndpointName",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxRecords",params,undefined,false); 
			
			copyArgs(msg,"DBProxyName",params,undefined,false); 
			copyArgs(msg,"DBProxyEndpointName",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			

			svc.describeDBProxyEndpoints(params,cb);
		}

		
		service.DescribeDBProxyTargetGroups=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBProxyName",params,undefined,false); 
			
			copyArgs(n,"DBProxyName",params,undefined,false); 
			copyArgs(n,"TargetGroupName",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxRecords",params,undefined,false); 
			
			copyArgs(msg,"DBProxyName",params,undefined,false); 
			copyArgs(msg,"TargetGroupName",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			

			svc.describeDBProxyTargetGroups(params,cb);
		}

		
		service.DescribeDBProxyTargets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBProxyName",params,undefined,false); 
			
			copyArgs(n,"DBProxyName",params,undefined,false); 
			copyArgs(n,"TargetGroupName",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxRecords",params,undefined,false); 
			
			copyArgs(msg,"DBProxyName",params,undefined,false); 
			copyArgs(msg,"TargetGroupName",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			

			svc.describeDBProxyTargets(params,cb);
		}

		
		service.DescribeDBSecurityGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DBSecurityGroupName",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"DBSecurityGroupName",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeDBSecurityGroups(params,cb);
		}

		
		service.DescribeDBSnapshotAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBSnapshotIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBSnapshotIdentifier",params,undefined,false); 
			
			copyArgs(msg,"DBSnapshotIdentifier",params,undefined,false); 
			

			svc.describeDBSnapshotAttributes(params,cb);
		}

		
		service.DescribeDBSnapshots=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(n,"DBSnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"SnapshotType",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"IncludeShared",params,undefined,false); 
			copyArgs(n,"IncludePublic",params,undefined,false); 
			copyArgs(n,"DbiResourceId",params,undefined,false); 
			
			copyArgs(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(msg,"DBSnapshotIdentifier",params,undefined,false); 
			copyArgs(msg,"SnapshotType",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"IncludeShared",params,undefined,false); 
			copyArgs(msg,"IncludePublic",params,undefined,false); 
			copyArgs(msg,"DbiResourceId",params,undefined,false); 
			

			svc.describeDBSnapshots(params,cb);
		}

		
		service.DescribeDBSubnetGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"MaxRecords",params,undefined,false); 
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
			copyArgs(n,"MaxRecords",params,undefined,false); 
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
			copyArgs(n,"MaxRecords",params,undefined,false); 
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
			copyArgs(n,"MaxRecords",params,undefined,false); 
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
			copyArgs(n,"Duration",params,undefined,false); 
			copyArgs(n,"EventCategories",params,undefined,true); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"MaxRecords",params,undefined,false); 
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

		
		service.DescribeExportTasks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ExportTaskIdentifier",params,undefined,false); 
			copyArgs(n,"SourceArn",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxRecords",params,undefined,false); 
			
			copyArgs(msg,"ExportTaskIdentifier",params,undefined,false); 
			copyArgs(msg,"SourceArn",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			

			svc.describeExportTasks(params,cb);
		}

		
		service.DescribeGlobalClusters=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"GlobalClusterIdentifier",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"GlobalClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeGlobalClusters(params,cb);
		}

		
		service.DescribeInstallationMedia=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"InstallationMediaId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"InstallationMediaId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeInstallationMedia(params,cb);
		}

		
		service.DescribeOptionGroupOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EngineName",params,undefined,false); 
			
			copyArgs(n,"EngineName",params,undefined,false); 
			copyArgs(n,"MajorEngineVersion",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"EngineName",params,undefined,false); 
			copyArgs(msg,"MajorEngineVersion",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeOptionGroupOptions(params,cb);
		}

		
		service.DescribeOptionGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"OptionGroupName",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxRecords",params,undefined,false); 
			copyArgs(n,"EngineName",params,undefined,false); 
			copyArgs(n,"MajorEngineVersion",params,undefined,false); 
			
			copyArgs(msg,"OptionGroupName",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"EngineName",params,undefined,false); 
			copyArgs(msg,"MajorEngineVersion",params,undefined,false); 
			

			svc.describeOptionGroups(params,cb);
		}

		
		service.DescribeOrderableDBInstanceOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Engine",params,undefined,false); 
			
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(n,"DBInstanceClass",params,undefined,false); 
			copyArgs(n,"LicenseModel",params,undefined,false); 
			copyArgs(n,"AvailabilityZoneGroup",params,undefined,false); 
			copyArgs(n,"Vpc",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"Engine",params,undefined,false); 
			copyArgs(msg,"EngineVersion",params,undefined,false); 
			copyArgs(msg,"DBInstanceClass",params,undefined,false); 
			copyArgs(msg,"LicenseModel",params,undefined,false); 
			copyArgs(msg,"AvailabilityZoneGroup",params,undefined,false); 
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
			copyArgs(n,"MaxRecords",params,undefined,false); 
			
			copyArgs(msg,"ResourceIdentifier",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			

			svc.describePendingMaintenanceActions(params,cb);
		}

		
		service.DescribeReservedDBInstances=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ReservedDBInstanceId",params,undefined,false); 
			copyArgs(n,"ReservedDBInstancesOfferingId",params,undefined,false); 
			copyArgs(n,"DBInstanceClass",params,undefined,false); 
			copyArgs(n,"Duration",params,undefined,false); 
			copyArgs(n,"ProductDescription",params,undefined,false); 
			copyArgs(n,"OfferingType",params,undefined,false); 
			copyArgs(n,"MultiAZ",params,undefined,false); 
			copyArgs(n,"LeaseId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"ReservedDBInstanceId",params,undefined,false); 
			copyArgs(msg,"ReservedDBInstancesOfferingId",params,undefined,false); 
			copyArgs(msg,"DBInstanceClass",params,undefined,false); 
			copyArgs(msg,"Duration",params,undefined,false); 
			copyArgs(msg,"ProductDescription",params,undefined,false); 
			copyArgs(msg,"OfferingType",params,undefined,false); 
			copyArgs(msg,"MultiAZ",params,undefined,false); 
			copyArgs(msg,"LeaseId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeReservedDBInstances(params,cb);
		}

		
		service.DescribeReservedDBInstancesOfferings=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ReservedDBInstancesOfferingId",params,undefined,false); 
			copyArgs(n,"DBInstanceClass",params,undefined,false); 
			copyArgs(n,"Duration",params,undefined,false); 
			copyArgs(n,"ProductDescription",params,undefined,false); 
			copyArgs(n,"OfferingType",params,undefined,false); 
			copyArgs(n,"MultiAZ",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"ReservedDBInstancesOfferingId",params,undefined,false); 
			copyArgs(msg,"DBInstanceClass",params,undefined,false); 
			copyArgs(msg,"Duration",params,undefined,false); 
			copyArgs(msg,"ProductDescription",params,undefined,false); 
			copyArgs(msg,"OfferingType",params,undefined,false); 
			copyArgs(msg,"MultiAZ",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeReservedDBInstancesOfferings(params,cb);
		}

		
		service.DescribeSourceRegions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"RegionName",params,undefined,false); 
			copyArgs(n,"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			
			copyArgs(msg,"RegionName",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			

			svc.describeSourceRegions(params,cb);
		}

		
		service.DescribeValidDBInstanceModifications=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			
			copyArgs(msg,"DBInstanceIdentifier",params,undefined,false); 
			

			svc.describeValidDBInstanceModifications(params,cb);
		}

		
		service.DownloadDBLogFilePortion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(n,"LogFileName",params,undefined,false); 
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(n,"LogFileName",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"NumberOfLines",params,undefined,false); 
			
			copyArgs(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(msg,"LogFileName",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"NumberOfLines",params,undefined,false); 
			

			svc.downloadDBLogFilePortion(params,cb);
		}

		
		service.FailoverDBCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"TargetDBInstanceIdentifier",params,undefined,false); 
			
			copyArgs(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"TargetDBInstanceIdentifier",params,undefined,false); 
			

			svc.failoverDBCluster(params,cb);
		}

		
		service.FailoverGlobalCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalClusterIdentifier",params,undefined,false); 
			copyArgs(n,"TargetDbClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"GlobalClusterIdentifier",params,undefined,false); 
			copyArgs(n,"TargetDbClusterIdentifier",params,undefined,false); 
			
			copyArgs(msg,"GlobalClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"TargetDbClusterIdentifier",params,undefined,false); 
			

			svc.failoverGlobalCluster(params,cb);
		}

		
		service.ImportInstallationMedia=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CustomAvailabilityZoneId",params,undefined,false); 
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(n,"EngineInstallationMediaPath",params,undefined,false); 
			copyArgs(n,"OSInstallationMediaPath",params,undefined,false); 
			
			copyArgs(n,"CustomAvailabilityZoneId",params,undefined,false); 
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(n,"EngineInstallationMediaPath",params,undefined,false); 
			copyArgs(n,"OSInstallationMediaPath",params,undefined,false); 
			
			copyArgs(msg,"CustomAvailabilityZoneId",params,undefined,false); 
			copyArgs(msg,"Engine",params,undefined,false); 
			copyArgs(msg,"EngineVersion",params,undefined,false); 
			copyArgs(msg,"EngineInstallationMediaPath",params,undefined,false); 
			copyArgs(msg,"OSInstallationMediaPath",params,undefined,false); 
			

			svc.importInstallationMedia(params,cb);
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

		
		service.ModifyCertificates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CertificateIdentifier",params,undefined,false); 
			copyArgs(n,"RemoveCustomerOverride",params,undefined,false); 
			
			copyArgs(msg,"CertificateIdentifier",params,undefined,false); 
			copyArgs(msg,"RemoveCustomerOverride",params,undefined,false); 
			

			svc.modifyCertificates(params,cb);
		}

		
		service.ModifyCurrentDBClusterCapacity=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"Capacity",params,undefined,false); 
			copyArgs(n,"SecondsBeforeTimeout",params,undefined,false); 
			copyArgs(n,"TimeoutAction",params,undefined,false); 
			
			copyArgs(msg,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"Capacity",params,undefined,false); 
			copyArgs(msg,"SecondsBeforeTimeout",params,undefined,false); 
			copyArgs(msg,"TimeoutAction",params,undefined,false); 
			

			svc.modifyCurrentDBClusterCapacity(params,cb);
		}

		
		service.ModifyDBCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"NewDBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"ApplyImmediately",params,undefined,false); 
			copyArgs(n,"BackupRetentionPeriod",params,undefined,false); 
			copyArgs(n,"DBClusterParameterGroupName",params,undefined,false); 
			copyArgs(n,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(n,"Port",params,undefined,false); 
			copyArgs(n,"MasterUserPassword",params,undefined,false); 
			copyArgs(n,"OptionGroupName",params,undefined,false); 
			copyArgs(n,"PreferredBackupWindow",params,undefined,false); 
			copyArgs(n,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(n,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArgs(n,"BacktrackWindow",params,undefined,false); 
			copyArgs(n,"CloudwatchLogsExportConfiguration",params,undefined,true); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(n,"AllowMajorVersionUpgrade",params,undefined,false); 
			copyArgs(n,"DBInstanceParameterGroupName",params,undefined,false); 
			copyArgs(n,"Domain",params,undefined,false); 
			copyArgs(n,"DomainIAMRoleName",params,undefined,false); 
			copyArgs(n,"ScalingConfiguration",params,undefined,true); 
			copyArgs(n,"DeletionProtection",params,undefined,false); 
			copyArgs(n,"EnableHttpEndpoint",params,undefined,false); 
			copyArgs(n,"CopyTagsToSnapshot",params,undefined,false); 
			copyArgs(n,"EnableGlobalWriteForwarding",params,undefined,false); 
			
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
			copyArgs(msg,"BacktrackWindow",params,undefined,false); 
			copyArgs(msg,"CloudwatchLogsExportConfiguration",params,undefined,true); 
			copyArgs(msg,"EngineVersion",params,undefined,false); 
			copyArgs(msg,"AllowMajorVersionUpgrade",params,undefined,false); 
			copyArgs(msg,"DBInstanceParameterGroupName",params,undefined,false); 
			copyArgs(msg,"Domain",params,undefined,false); 
			copyArgs(msg,"DomainIAMRoleName",params,undefined,false); 
			copyArgs(msg,"ScalingConfiguration",params,undefined,true); 
			copyArgs(msg,"DeletionProtection",params,undefined,false); 
			copyArgs(msg,"EnableHttpEndpoint",params,undefined,false); 
			copyArgs(msg,"CopyTagsToSnapshot",params,undefined,false); 
			copyArgs(msg,"EnableGlobalWriteForwarding",params,undefined,false); 
			

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
			copyArgs(n,"AllocatedStorage",params,undefined,false); 
			copyArgs(n,"DBInstanceClass",params,undefined,false); 
			copyArgs(n,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(n,"DBSecurityGroups",params,undefined,true); 
			copyArgs(n,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(n,"ApplyImmediately",params,undefined,false); 
			copyArgs(n,"MasterUserPassword",params,undefined,false); 
			copyArgs(n,"DBParameterGroupName",params,undefined,false); 
			copyArgs(n,"BackupRetentionPeriod",params,undefined,false); 
			copyArgs(n,"PreferredBackupWindow",params,undefined,false); 
			copyArgs(n,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(n,"MultiAZ",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(n,"AllowMajorVersionUpgrade",params,undefined,false); 
			copyArgs(n,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArgs(n,"LicenseModel",params,undefined,false); 
			copyArgs(n,"Iops",params,undefined,false); 
			copyArgs(n,"OptionGroupName",params,undefined,false); 
			copyArgs(n,"NewDBInstanceIdentifier",params,undefined,false); 
			copyArgs(n,"StorageType",params,undefined,false); 
			copyArgs(n,"TdeCredentialArn",params,undefined,false); 
			copyArgs(n,"TdeCredentialPassword",params,undefined,false); 
			copyArgs(n,"CACertificateIdentifier",params,undefined,false); 
			copyArgs(n,"Domain",params,undefined,false); 
			copyArgs(n,"CopyTagsToSnapshot",params,undefined,false); 
			copyArgs(n,"MonitoringInterval",params,undefined,false); 
			copyArgs(n,"DBPortNumber",params,undefined,false); 
			copyArgs(n,"PubliclyAccessible",params,undefined,false); 
			copyArgs(n,"MonitoringRoleArn",params,undefined,false); 
			copyArgs(n,"DomainIAMRoleName",params,undefined,false); 
			copyArgs(n,"PromotionTier",params,undefined,false); 
			copyArgs(n,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArgs(n,"EnablePerformanceInsights",params,undefined,false); 
			copyArgs(n,"PerformanceInsightsKMSKeyId",params,undefined,false); 
			copyArgs(n,"PerformanceInsightsRetentionPeriod",params,undefined,false); 
			copyArgs(n,"CloudwatchLogsExportConfiguration",params,undefined,true); 
			copyArgs(n,"ProcessorFeatures",params,undefined,true); 
			copyArgs(n,"UseDefaultProcessorFeatures",params,undefined,false); 
			copyArgs(n,"DeletionProtection",params,undefined,false); 
			copyArgs(n,"MaxAllocatedStorage",params,undefined,false); 
			copyArgs(n,"CertificateRotationRestart",params,undefined,false); 
			copyArgs(n,"ReplicaMode",params,undefined,false); 
			copyArgs(n,"EnableCustomerOwnedIp",params,undefined,false); 
			copyArgs(n,"AwsBackupRecoveryPointArn",params,undefined,false); 
			
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
			copyArgs(msg,"PerformanceInsightsRetentionPeriod",params,undefined,false); 
			copyArgs(msg,"CloudwatchLogsExportConfiguration",params,undefined,true); 
			copyArgs(msg,"ProcessorFeatures",params,undefined,true); 
			copyArgs(msg,"UseDefaultProcessorFeatures",params,undefined,false); 
			copyArgs(msg,"DeletionProtection",params,undefined,false); 
			copyArgs(msg,"MaxAllocatedStorage",params,undefined,false); 
			copyArgs(msg,"CertificateRotationRestart",params,undefined,false); 
			copyArgs(msg,"ReplicaMode",params,undefined,false); 
			copyArgs(msg,"EnableCustomerOwnedIp",params,undefined,false); 
			copyArgs(msg,"AwsBackupRecoveryPointArn",params,undefined,false); 
			

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

		
		service.ModifyDBProxy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBProxyName",params,undefined,false); 
			
			copyArgs(n,"DBProxyName",params,undefined,false); 
			copyArgs(n,"NewDBProxyName",params,undefined,false); 
			copyArgs(n,"Auth",params,undefined,true); 
			copyArgs(n,"RequireTLS",params,undefined,false); 
			copyArgs(n,"IdleClientTimeout",params,undefined,false); 
			copyArgs(n,"DebugLogging",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"SecurityGroups",params,undefined,true); 
			
			copyArgs(msg,"DBProxyName",params,undefined,false); 
			copyArgs(msg,"NewDBProxyName",params,undefined,false); 
			copyArgs(msg,"Auth",params,undefined,true); 
			copyArgs(msg,"RequireTLS",params,undefined,false); 
			copyArgs(msg,"IdleClientTimeout",params,undefined,false); 
			copyArgs(msg,"DebugLogging",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"SecurityGroups",params,undefined,true); 
			

			svc.modifyDBProxy(params,cb);
		}

		
		service.ModifyDBProxyEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBProxyEndpointName",params,undefined,false); 
			
			copyArgs(n,"DBProxyEndpointName",params,undefined,false); 
			copyArgs(n,"NewDBProxyEndpointName",params,undefined,false); 
			copyArgs(n,"VpcSecurityGroupIds",params,undefined,true); 
			
			copyArgs(msg,"DBProxyEndpointName",params,undefined,false); 
			copyArgs(msg,"NewDBProxyEndpointName",params,undefined,false); 
			copyArgs(msg,"VpcSecurityGroupIds",params,undefined,true); 
			

			svc.modifyDBProxyEndpoint(params,cb);
		}

		
		service.ModifyDBProxyTargetGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TargetGroupName",params,undefined,false); 
			copyArgs(n,"DBProxyName",params,undefined,false); 
			
			copyArgs(n,"TargetGroupName",params,undefined,false); 
			copyArgs(n,"DBProxyName",params,undefined,false); 
			copyArgs(n,"ConnectionPoolConfig",params,undefined,false); 
			copyArgs(n,"NewName",params,undefined,false); 
			
			copyArgs(msg,"TargetGroupName",params,undefined,false); 
			copyArgs(msg,"DBProxyName",params,undefined,false); 
			copyArgs(msg,"ConnectionPoolConfig",params,undefined,false); 
			copyArgs(msg,"NewName",params,undefined,false); 
			

			svc.modifyDBProxyTargetGroup(params,cb);
		}

		
		service.ModifyDBSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBSnapshotIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBSnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(n,"OptionGroupName",params,undefined,false); 
			
			copyArgs(msg,"DBSnapshotIdentifier",params,undefined,false); 
			copyArgs(msg,"EngineVersion",params,undefined,false); 
			copyArgs(msg,"OptionGroupName",params,undefined,false); 
			

			svc.modifyDBSnapshot(params,cb);
		}

		
		service.ModifyDBSnapshotAttribute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBSnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"AttributeName",params,undefined,false); 
			
			copyArgs(n,"DBSnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"AttributeName",params,undefined,false); 
			copyArgs(n,"ValuesToAdd",params,undefined,true); 
			copyArgs(n,"ValuesToRemove",params,undefined,true); 
			
			copyArgs(msg,"DBSnapshotIdentifier",params,undefined,false); 
			copyArgs(msg,"AttributeName",params,undefined,false); 
			copyArgs(msg,"ValuesToAdd",params,undefined,true); 
			copyArgs(msg,"ValuesToRemove",params,undefined,true); 
			

			svc.modifyDBSnapshotAttribute(params,cb);
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
			copyArgs(n,"Enabled",params,undefined,false); 
			
			copyArgs(msg,"SubscriptionName",params,undefined,false); 
			copyArgs(msg,"SnsTopicArn",params,undefined,false); 
			copyArgs(msg,"SourceType",params,undefined,false); 
			copyArgs(msg,"EventCategories",params,undefined,true); 
			copyArgs(msg,"Enabled",params,undefined,false); 
			

			svc.modifyEventSubscription(params,cb);
		}

		
		service.ModifyGlobalCluster=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"GlobalClusterIdentifier",params,undefined,false); 
			copyArgs(n,"NewGlobalClusterIdentifier",params,undefined,false); 
			copyArgs(n,"DeletionProtection",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(n,"AllowMajorVersionUpgrade",params,undefined,false); 
			
			copyArgs(msg,"GlobalClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"NewGlobalClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"DeletionProtection",params,undefined,false); 
			copyArgs(msg,"EngineVersion",params,undefined,false); 
			copyArgs(msg,"AllowMajorVersionUpgrade",params,undefined,false); 
			

			svc.modifyGlobalCluster(params,cb);
		}

		
		service.ModifyOptionGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OptionGroupName",params,undefined,false); 
			
			copyArgs(n,"OptionGroupName",params,undefined,false); 
			copyArgs(n,"OptionsToInclude",params,undefined,false); 
			copyArgs(n,"OptionsToRemove",params,undefined,false); 
			copyArgs(n,"ApplyImmediately",params,undefined,false); 
			
			copyArgs(msg,"OptionGroupName",params,undefined,false); 
			copyArgs(msg,"OptionsToInclude",params,undefined,false); 
			copyArgs(msg,"OptionsToRemove",params,undefined,false); 
			copyArgs(msg,"ApplyImmediately",params,undefined,false); 
			

			svc.modifyOptionGroup(params,cb);
		}

		
		service.PromoteReadReplica=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(n,"BackupRetentionPeriod",params,undefined,false); 
			copyArgs(n,"PreferredBackupWindow",params,undefined,false); 
			
			copyArgs(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(msg,"BackupRetentionPeriod",params,undefined,false); 
			copyArgs(msg,"PreferredBackupWindow",params,undefined,false); 
			

			svc.promoteReadReplica(params,cb);
		}

		
		service.PromoteReadReplicaDBCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			
			copyArgs(msg,"DBClusterIdentifier",params,undefined,false); 
			

			svc.promoteReadReplicaDBCluster(params,cb);
		}

		
		service.PurchaseReservedDBInstancesOffering=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReservedDBInstancesOfferingId",params,undefined,false); 
			
			copyArgs(n,"ReservedDBInstancesOfferingId",params,undefined,false); 
			copyArgs(n,"ReservedDBInstanceId",params,undefined,false); 
			copyArgs(n,"DBInstanceCount",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ReservedDBInstancesOfferingId",params,undefined,false); 
			copyArgs(msg,"ReservedDBInstanceId",params,undefined,false); 
			copyArgs(msg,"DBInstanceCount",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.purchaseReservedDBInstancesOffering(params,cb);
		}

		
		service.RebootDBInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(n,"ForceFailover",params,undefined,false); 
			
			copyArgs(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(msg,"ForceFailover",params,undefined,false); 
			

			svc.rebootDBInstance(params,cb);
		}

		
		service.RegisterDBProxyTargets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBProxyName",params,undefined,false); 
			
			copyArgs(n,"DBProxyName",params,undefined,false); 
			copyArgs(n,"TargetGroupName",params,undefined,false); 
			copyArgs(n,"DBInstanceIdentifiers",params,undefined,true); 
			copyArgs(n,"DBClusterIdentifiers",params,undefined,true); 
			
			copyArgs(msg,"DBProxyName",params,undefined,false); 
			copyArgs(msg,"TargetGroupName",params,undefined,false); 
			copyArgs(msg,"DBInstanceIdentifiers",params,undefined,true); 
			copyArgs(msg,"DBClusterIdentifiers",params,undefined,true); 
			

			svc.registerDBProxyTargets(params,cb);
		}

		
		service.RemoveFromGlobalCluster=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"GlobalClusterIdentifier",params,undefined,false); 
			copyArgs(n,"DbClusterIdentifier",params,undefined,false); 
			
			copyArgs(msg,"GlobalClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"DbClusterIdentifier",params,undefined,false); 
			

			svc.removeFromGlobalCluster(params,cb);
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

		
		service.RemoveRoleFromDBInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"FeatureName",params,undefined,false); 
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"FeatureName",params,undefined,false); 
			
			copyArgs(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"FeatureName",params,undefined,false); 
			

			svc.removeRoleFromDBInstance(params,cb);
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
			copyArgs(n,"ResetAllParameters",params,undefined,false); 
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
			copyArgs(n,"ResetAllParameters",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			
			copyArgs(msg,"DBParameterGroupName",params,undefined,false); 
			copyArgs(msg,"ResetAllParameters",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			

			svc.resetDBParameterGroup(params,cb);
		}

		
		service.RestoreDBClusterFromS3=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"MasterUsername",params,undefined,false); 
			copyArgs(n,"MasterUserPassword",params,undefined,false); 
			copyArgs(n,"SourceEngine",params,undefined,false); 
			copyArgs(n,"SourceEngineVersion",params,undefined,false); 
			copyArgs(n,"S3BucketName",params,undefined,false); 
			copyArgs(n,"S3IngestionRoleArn",params,undefined,false); 
			
			copyArgs(n,"AvailabilityZones",params,undefined,true); 
			copyArgs(n,"BackupRetentionPeriod",params,undefined,false); 
			copyArgs(n,"CharacterSetName",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			copyArgs(n,"DBClusterParameterGroupName",params,undefined,false); 
			copyArgs(n,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(n,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(n,"Port",params,undefined,false); 
			copyArgs(n,"MasterUsername",params,undefined,false); 
			copyArgs(n,"MasterUserPassword",params,undefined,false); 
			copyArgs(n,"OptionGroupName",params,undefined,false); 
			copyArgs(n,"PreferredBackupWindow",params,undefined,false); 
			copyArgs(n,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"StorageEncrypted",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArgs(n,"SourceEngine",params,undefined,false); 
			copyArgs(n,"SourceEngineVersion",params,undefined,false); 
			copyArgs(n,"S3BucketName",params,undefined,false); 
			copyArgs(n,"S3Prefix",params,undefined,false); 
			copyArgs(n,"S3IngestionRoleArn",params,undefined,false); 
			copyArgs(n,"BacktrackWindow",params,undefined,false); 
			copyArgs(n,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArgs(n,"DeletionProtection",params,undefined,false); 
			copyArgs(n,"CopyTagsToSnapshot",params,undefined,false); 
			copyArgs(n,"Domain",params,undefined,false); 
			copyArgs(n,"DomainIAMRoleName",params,undefined,false); 
			
			copyArgs(msg,"AvailabilityZones",params,undefined,true); 
			copyArgs(msg,"BackupRetentionPeriod",params,undefined,false); 
			copyArgs(msg,"CharacterSetName",params,undefined,false); 
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
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"StorageEncrypted",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArgs(msg,"SourceEngine",params,undefined,false); 
			copyArgs(msg,"SourceEngineVersion",params,undefined,false); 
			copyArgs(msg,"S3BucketName",params,undefined,false); 
			copyArgs(msg,"S3Prefix",params,undefined,false); 
			copyArgs(msg,"S3IngestionRoleArn",params,undefined,false); 
			copyArgs(msg,"BacktrackWindow",params,undefined,false); 
			copyArgs(msg,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArgs(msg,"DeletionProtection",params,undefined,false); 
			copyArgs(msg,"CopyTagsToSnapshot",params,undefined,false); 
			copyArgs(msg,"Domain",params,undefined,false); 
			copyArgs(msg,"DomainIAMRoleName",params,undefined,false); 
			

			svc.restoreDBClusterFromS3(params,cb);
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
			copyArgs(n,"Port",params,undefined,false); 
			copyArgs(n,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"OptionGroupName",params,undefined,false); 
			copyArgs(n,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArgs(n,"BacktrackWindow",params,undefined,false); 
			copyArgs(n,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArgs(n,"EngineMode",params,undefined,false); 
			copyArgs(n,"ScalingConfiguration",params,undefined,true); 
			copyArgs(n,"DBClusterParameterGroupName",params,undefined,false); 
			copyArgs(n,"DeletionProtection",params,undefined,false); 
			copyArgs(n,"CopyTagsToSnapshot",params,undefined,false); 
			copyArgs(n,"Domain",params,undefined,false); 
			copyArgs(n,"DomainIAMRoleName",params,undefined,false); 
			
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
			copyArgs(msg,"BacktrackWindow",params,undefined,false); 
			copyArgs(msg,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArgs(msg,"EngineMode",params,undefined,false); 
			copyArgs(msg,"ScalingConfiguration",params,undefined,true); 
			copyArgs(msg,"DBClusterParameterGroupName",params,undefined,false); 
			copyArgs(msg,"DeletionProtection",params,undefined,false); 
			copyArgs(msg,"CopyTagsToSnapshot",params,undefined,false); 
			copyArgs(msg,"Domain",params,undefined,false); 
			copyArgs(msg,"DomainIAMRoleName",params,undefined,false); 
			

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
			copyArgs(n,"UseLatestRestorableTime",params,undefined,false); 
			copyArgs(n,"Port",params,undefined,false); 
			copyArgs(n,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(n,"OptionGroupName",params,undefined,false); 
			copyArgs(n,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArgs(n,"BacktrackWindow",params,undefined,false); 
			copyArgs(n,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArgs(n,"DBClusterParameterGroupName",params,undefined,false); 
			copyArgs(n,"DeletionProtection",params,undefined,false); 
			copyArgs(n,"CopyTagsToSnapshot",params,undefined,false); 
			copyArgs(n,"Domain",params,undefined,false); 
			copyArgs(n,"DomainIAMRoleName",params,undefined,false); 
			copyArgs(n,"ScalingConfiguration",params,undefined,true); 
			copyArgs(n,"EngineMode",params,undefined,false); 
			
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
			copyArgs(msg,"BacktrackWindow",params,undefined,false); 
			copyArgs(msg,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArgs(msg,"DBClusterParameterGroupName",params,undefined,false); 
			copyArgs(msg,"DeletionProtection",params,undefined,false); 
			copyArgs(msg,"CopyTagsToSnapshot",params,undefined,false); 
			copyArgs(msg,"Domain",params,undefined,false); 
			copyArgs(msg,"DomainIAMRoleName",params,undefined,false); 
			copyArgs(msg,"ScalingConfiguration",params,undefined,true); 
			copyArgs(msg,"EngineMode",params,undefined,false); 
			

			svc.restoreDBClusterToPointInTime(params,cb);
		}

		
		service.RestoreDBInstanceFromDBSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(n,"DBSnapshotIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(n,"DBSnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"DBInstanceClass",params,undefined,false); 
			copyArgs(n,"Port",params,undefined,false); 
			copyArgs(n,"AvailabilityZone",params,undefined,false); 
			copyArgs(n,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(n,"MultiAZ",params,undefined,false); 
			copyArgs(n,"PubliclyAccessible",params,undefined,false); 
			copyArgs(n,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArgs(n,"LicenseModel",params,undefined,false); 
			copyArgs(n,"DBName",params,undefined,false); 
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"Iops",params,undefined,false); 
			copyArgs(n,"OptionGroupName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"StorageType",params,undefined,false); 
			copyArgs(n,"TdeCredentialArn",params,undefined,false); 
			copyArgs(n,"TdeCredentialPassword",params,undefined,false); 
			copyArgs(n,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(n,"Domain",params,undefined,false); 
			copyArgs(n,"CopyTagsToSnapshot",params,undefined,false); 
			copyArgs(n,"DomainIAMRoleName",params,undefined,false); 
			copyArgs(n,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArgs(n,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArgs(n,"ProcessorFeatures",params,undefined,true); 
			copyArgs(n,"UseDefaultProcessorFeatures",params,undefined,false); 
			copyArgs(n,"DBParameterGroupName",params,undefined,false); 
			copyArgs(n,"DeletionProtection",params,undefined,false); 
			copyArgs(n,"EnableCustomerOwnedIp",params,undefined,false); 
			
			copyArgs(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(msg,"DBSnapshotIdentifier",params,undefined,false); 
			copyArgs(msg,"DBInstanceClass",params,undefined,false); 
			copyArgs(msg,"Port",params,undefined,false); 
			copyArgs(msg,"AvailabilityZone",params,undefined,false); 
			copyArgs(msg,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(msg,"MultiAZ",params,undefined,false); 
			copyArgs(msg,"PubliclyAccessible",params,undefined,false); 
			copyArgs(msg,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArgs(msg,"LicenseModel",params,undefined,false); 
			copyArgs(msg,"DBName",params,undefined,false); 
			copyArgs(msg,"Engine",params,undefined,false); 
			copyArgs(msg,"Iops",params,undefined,false); 
			copyArgs(msg,"OptionGroupName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"StorageType",params,undefined,false); 
			copyArgs(msg,"TdeCredentialArn",params,undefined,false); 
			copyArgs(msg,"TdeCredentialPassword",params,undefined,false); 
			copyArgs(msg,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"Domain",params,undefined,false); 
			copyArgs(msg,"CopyTagsToSnapshot",params,undefined,false); 
			copyArgs(msg,"DomainIAMRoleName",params,undefined,false); 
			copyArgs(msg,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArgs(msg,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArgs(msg,"ProcessorFeatures",params,undefined,true); 
			copyArgs(msg,"UseDefaultProcessorFeatures",params,undefined,false); 
			copyArgs(msg,"DBParameterGroupName",params,undefined,false); 
			copyArgs(msg,"DeletionProtection",params,undefined,false); 
			copyArgs(msg,"EnableCustomerOwnedIp",params,undefined,false); 
			

			svc.restoreDBInstanceFromDBSnapshot(params,cb);
		}

		
		service.RestoreDBInstanceFromS3=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(n,"DBInstanceClass",params,undefined,false); 
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"SourceEngine",params,undefined,false); 
			copyArgs(n,"SourceEngineVersion",params,undefined,false); 
			copyArgs(n,"S3BucketName",params,undefined,false); 
			copyArgs(n,"S3IngestionRoleArn",params,undefined,false); 
			
			copyArgs(n,"DBName",params,undefined,false); 
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(n,"AllocatedStorage",params,undefined,false); 
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
			copyArgs(n,"BackupRetentionPeriod",params,undefined,false); 
			copyArgs(n,"PreferredBackupWindow",params,undefined,false); 
			copyArgs(n,"Port",params,undefined,false); 
			copyArgs(n,"MultiAZ",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(n,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArgs(n,"LicenseModel",params,undefined,false); 
			copyArgs(n,"Iops",params,undefined,false); 
			copyArgs(n,"OptionGroupName",params,undefined,false); 
			copyArgs(n,"PubliclyAccessible",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"StorageType",params,undefined,false); 
			copyArgs(n,"StorageEncrypted",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"CopyTagsToSnapshot",params,undefined,false); 
			copyArgs(n,"MonitoringInterval",params,undefined,false); 
			copyArgs(n,"MonitoringRoleArn",params,undefined,false); 
			copyArgs(n,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArgs(n,"SourceEngine",params,undefined,false); 
			copyArgs(n,"SourceEngineVersion",params,undefined,false); 
			copyArgs(n,"S3BucketName",params,undefined,false); 
			copyArgs(n,"S3Prefix",params,undefined,false); 
			copyArgs(n,"S3IngestionRoleArn",params,undefined,false); 
			copyArgs(n,"EnablePerformanceInsights",params,undefined,false); 
			copyArgs(n,"PerformanceInsightsKMSKeyId",params,undefined,false); 
			copyArgs(n,"PerformanceInsightsRetentionPeriod",params,undefined,false); 
			copyArgs(n,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArgs(n,"ProcessorFeatures",params,undefined,true); 
			copyArgs(n,"UseDefaultProcessorFeatures",params,undefined,false); 
			copyArgs(n,"DeletionProtection",params,undefined,false); 
			copyArgs(n,"MaxAllocatedStorage",params,undefined,false); 
			
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
			copyArgs(msg,"PubliclyAccessible",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"StorageType",params,undefined,false); 
			copyArgs(msg,"StorageEncrypted",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"CopyTagsToSnapshot",params,undefined,false); 
			copyArgs(msg,"MonitoringInterval",params,undefined,false); 
			copyArgs(msg,"MonitoringRoleArn",params,undefined,false); 
			copyArgs(msg,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArgs(msg,"SourceEngine",params,undefined,false); 
			copyArgs(msg,"SourceEngineVersion",params,undefined,false); 
			copyArgs(msg,"S3BucketName",params,undefined,false); 
			copyArgs(msg,"S3Prefix",params,undefined,false); 
			copyArgs(msg,"S3IngestionRoleArn",params,undefined,false); 
			copyArgs(msg,"EnablePerformanceInsights",params,undefined,false); 
			copyArgs(msg,"PerformanceInsightsKMSKeyId",params,undefined,false); 
			copyArgs(msg,"PerformanceInsightsRetentionPeriod",params,undefined,false); 
			copyArgs(msg,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArgs(msg,"ProcessorFeatures",params,undefined,true); 
			copyArgs(msg,"UseDefaultProcessorFeatures",params,undefined,false); 
			copyArgs(msg,"DeletionProtection",params,undefined,false); 
			copyArgs(msg,"MaxAllocatedStorage",params,undefined,false); 
			

			svc.restoreDBInstanceFromS3(params,cb);
		}

		
		service.RestoreDBInstanceToPointInTime=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TargetDBInstanceIdentifier",params,undefined,false); 
			
			copyArgs(n,"SourceDBInstanceIdentifier",params,undefined,false); 
			copyArgs(n,"TargetDBInstanceIdentifier",params,undefined,false); 
			copyArgs(n,"RestoreTime",params,undefined,false); 
			copyArgs(n,"UseLatestRestorableTime",params,undefined,false); 
			copyArgs(n,"DBInstanceClass",params,undefined,false); 
			copyArgs(n,"Port",params,undefined,false); 
			copyArgs(n,"AvailabilityZone",params,undefined,false); 
			copyArgs(n,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(n,"MultiAZ",params,undefined,false); 
			copyArgs(n,"PubliclyAccessible",params,undefined,false); 
			copyArgs(n,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArgs(n,"LicenseModel",params,undefined,false); 
			copyArgs(n,"DBName",params,undefined,false); 
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"Iops",params,undefined,false); 
			copyArgs(n,"OptionGroupName",params,undefined,false); 
			copyArgs(n,"CopyTagsToSnapshot",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"StorageType",params,undefined,false); 
			copyArgs(n,"TdeCredentialArn",params,undefined,false); 
			copyArgs(n,"TdeCredentialPassword",params,undefined,false); 
			copyArgs(n,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(n,"Domain",params,undefined,false); 
			copyArgs(n,"DomainIAMRoleName",params,undefined,false); 
			copyArgs(n,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArgs(n,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArgs(n,"ProcessorFeatures",params,undefined,true); 
			copyArgs(n,"UseDefaultProcessorFeatures",params,undefined,false); 
			copyArgs(n,"DBParameterGroupName",params,undefined,false); 
			copyArgs(n,"DeletionProtection",params,undefined,false); 
			copyArgs(n,"SourceDbiResourceId",params,undefined,false); 
			copyArgs(n,"MaxAllocatedStorage",params,undefined,false); 
			copyArgs(n,"SourceDBInstanceAutomatedBackupsArn",params,undefined,false); 
			copyArgs(n,"EnableCustomerOwnedIp",params,undefined,false); 
			
			copyArgs(msg,"SourceDBInstanceIdentifier",params,undefined,false); 
			copyArgs(msg,"TargetDBInstanceIdentifier",params,undefined,false); 
			copyArgs(msg,"RestoreTime",params,undefined,false); 
			copyArgs(msg,"UseLatestRestorableTime",params,undefined,false); 
			copyArgs(msg,"DBInstanceClass",params,undefined,false); 
			copyArgs(msg,"Port",params,undefined,false); 
			copyArgs(msg,"AvailabilityZone",params,undefined,false); 
			copyArgs(msg,"DBSubnetGroupName",params,undefined,false); 
			copyArgs(msg,"MultiAZ",params,undefined,false); 
			copyArgs(msg,"PubliclyAccessible",params,undefined,false); 
			copyArgs(msg,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArgs(msg,"LicenseModel",params,undefined,false); 
			copyArgs(msg,"DBName",params,undefined,false); 
			copyArgs(msg,"Engine",params,undefined,false); 
			copyArgs(msg,"Iops",params,undefined,false); 
			copyArgs(msg,"OptionGroupName",params,undefined,false); 
			copyArgs(msg,"CopyTagsToSnapshot",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"StorageType",params,undefined,false); 
			copyArgs(msg,"TdeCredentialArn",params,undefined,false); 
			copyArgs(msg,"TdeCredentialPassword",params,undefined,false); 
			copyArgs(msg,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"Domain",params,undefined,false); 
			copyArgs(msg,"DomainIAMRoleName",params,undefined,false); 
			copyArgs(msg,"EnableIAMDatabaseAuthentication",params,undefined,false); 
			copyArgs(msg,"EnableCloudwatchLogsExports",params,undefined,true); 
			copyArgs(msg,"ProcessorFeatures",params,undefined,true); 
			copyArgs(msg,"UseDefaultProcessorFeatures",params,undefined,false); 
			copyArgs(msg,"DBParameterGroupName",params,undefined,false); 
			copyArgs(msg,"DeletionProtection",params,undefined,false); 
			copyArgs(msg,"SourceDbiResourceId",params,undefined,false); 
			copyArgs(msg,"MaxAllocatedStorage",params,undefined,false); 
			copyArgs(msg,"SourceDBInstanceAutomatedBackupsArn",params,undefined,false); 
			copyArgs(msg,"EnableCustomerOwnedIp",params,undefined,false); 
			

			svc.restoreDBInstanceToPointInTime(params,cb);
		}

		
		service.RevokeDBSecurityGroupIngress=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBSecurityGroupName",params,undefined,false); 
			
			copyArgs(n,"DBSecurityGroupName",params,undefined,false); 
			copyArgs(n,"CIDRIP",params,undefined,false); 
			copyArgs(n,"EC2SecurityGroupName",params,undefined,false); 
			copyArgs(n,"EC2SecurityGroupId",params,undefined,false); 
			copyArgs(n,"EC2SecurityGroupOwnerId",params,undefined,false); 
			
			copyArgs(msg,"DBSecurityGroupName",params,undefined,false); 
			copyArgs(msg,"CIDRIP",params,undefined,false); 
			copyArgs(msg,"EC2SecurityGroupName",params,undefined,false); 
			copyArgs(msg,"EC2SecurityGroupId",params,undefined,false); 
			copyArgs(msg,"EC2SecurityGroupOwnerId",params,undefined,false); 
			

			svc.revokeDBSecurityGroupIngress(params,cb);
		}

		
		service.StartActivityStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Mode",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Mode",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"ApplyImmediately",params,undefined,false); 
			copyArgs(n,"EngineNativeAuditFieldsIncluded",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"Mode",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"ApplyImmediately",params,undefined,false); 
			copyArgs(msg,"EngineNativeAuditFieldsIncluded",params,undefined,false); 
			

			svc.startActivityStream(params,cb);
		}

		
		service.StartDBCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			
			copyArgs(msg,"DBClusterIdentifier",params,undefined,false); 
			

			svc.startDBCluster(params,cb);
		}

		
		service.StartDBInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			
			copyArgs(msg,"DBInstanceIdentifier",params,undefined,false); 
			

			svc.startDBInstance(params,cb);
		}

		
		service.StartDBInstanceAutomatedBackupsReplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceDBInstanceArn",params,undefined,false); 
			
			copyArgs(n,"SourceDBInstanceArn",params,undefined,false); 
			copyArgs(n,"BackupRetentionPeriod",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"PreSignedUrl",params,undefined,false); 
			
			copyArgs(msg,"SourceDBInstanceArn",params,undefined,false); 
			copyArgs(msg,"BackupRetentionPeriod",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"PreSignedUrl",params,undefined,false); 
			

			svc.startDBInstanceAutomatedBackupsReplication(params,cb);
		}

		
		service.StartExportTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ExportTaskIdentifier",params,undefined,false); 
			copyArgs(n,"SourceArn",params,undefined,false); 
			copyArgs(n,"S3BucketName",params,undefined,false); 
			copyArgs(n,"IamRoleArn",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			
			copyArgs(n,"ExportTaskIdentifier",params,undefined,false); 
			copyArgs(n,"SourceArn",params,undefined,false); 
			copyArgs(n,"S3BucketName",params,undefined,false); 
			copyArgs(n,"IamRoleArn",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"S3Prefix",params,undefined,false); 
			copyArgs(n,"ExportOnly",params,undefined,true); 
			
			copyArgs(msg,"ExportTaskIdentifier",params,undefined,false); 
			copyArgs(msg,"SourceArn",params,undefined,false); 
			copyArgs(msg,"S3BucketName",params,undefined,false); 
			copyArgs(msg,"IamRoleArn",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"S3Prefix",params,undefined,false); 
			copyArgs(msg,"ExportOnly",params,undefined,true); 
			

			svc.startExportTask(params,cb);
		}

		
		service.StopActivityStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"ApplyImmediately",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"ApplyImmediately",params,undefined,false); 
			

			svc.stopActivityStream(params,cb);
		}

		
		service.StopDBCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBClusterIdentifier",params,undefined,false); 
			
			copyArgs(msg,"DBClusterIdentifier",params,undefined,false); 
			

			svc.stopDBCluster(params,cb);
		}

		
		service.StopDBInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			
			copyArgs(n,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(n,"DBSnapshotIdentifier",params,undefined,false); 
			
			copyArgs(msg,"DBInstanceIdentifier",params,undefined,false); 
			copyArgs(msg,"DBSnapshotIdentifier",params,undefined,false); 
			

			svc.stopDBInstance(params,cb);
		}

		
		service.StopDBInstanceAutomatedBackupsReplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceDBInstanceArn",params,undefined,false); 
			
			copyArgs(n,"SourceDBInstanceArn",params,undefined,false); 
			
			copyArgs(msg,"SourceDBInstanceArn",params,undefined,false); 
			

			svc.stopDBInstanceAutomatedBackupsReplication(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS RDS", AmazonAPINode);

};
