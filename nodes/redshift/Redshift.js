
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

		var awsService = new AWS.Redshift( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Redshift(msg.AWSConfig) : awsService;

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
		
			service.AcceptReservedNodeExchange=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReservedNodeId",params,undefined,false); 
			copyArgs(n,"TargetReservedNodeOfferingId",params,undefined,false); 
			
			copyArgs(n,"ReservedNodeId",params,undefined,false); 
			copyArgs(n,"TargetReservedNodeOfferingId",params,undefined,false); 
			
			copyArgs(msg,"ReservedNodeId",params,undefined,false); 
			copyArgs(msg,"TargetReservedNodeOfferingId",params,undefined,false); 
			

			svc.acceptReservedNodeExchange(params,cb);
		}
			service.AddPartner=function(svc,msg,cb){
			var params={};
			
			
			
			
			copyArgs(msg,"AccountId",params,undefined,true); 
			copyArgs(msg,"ClusterIdentifier",params,undefined,true); 
			copyArgs(msg,"DatabaseName",params,undefined,true); 
			copyArgs(msg,"PartnerName",params,undefined,true); 

			svc.addPartner(params,cb);
		}
			service.AssociateDataShareConsumer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DataShareArn",params,undefined,false); 
			
			copyArgs(n,"DataShareArn",params,undefined,false); 
			copyArgs(Boolean(n),"AssociateEntireAccount",params,undefined,false); 
			copyArgs(n,"ConsumerArn",params,undefined,false); 
			
			copyArgs(msg,"DataShareArn",params,undefined,false); 
			copyArgs(msg,"AssociateEntireAccount",params,undefined,false); 
			copyArgs(msg,"ConsumerArn",params,undefined,false); 
			

			svc.associateDataShareConsumer(params,cb);
		}
			service.AuthorizeClusterSecurityGroupIngress=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterSecurityGroupName",params,undefined,false); 
			
			copyArgs(n,"ClusterSecurityGroupName",params,undefined,false); 
			copyArgs(n,"CIDRIP",params,undefined,false); 
			copyArgs(n,"EC2SecurityGroupName",params,undefined,false); 
			copyArgs(n,"EC2SecurityGroupOwnerId",params,undefined,false); 
			
			copyArgs(msg,"ClusterSecurityGroupName",params,undefined,false); 
			copyArgs(msg,"CIDRIP",params,undefined,false); 
			copyArgs(msg,"EC2SecurityGroupName",params,undefined,false); 
			copyArgs(msg,"EC2SecurityGroupOwnerId",params,undefined,false); 
			

			svc.authorizeClusterSecurityGroupIngress(params,cb);
		}
			service.AuthorizeDataShare=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DataShareArn",params,undefined,false); 
			copyArgs(n,"ConsumerIdentifier",params,undefined,false); 
			
			copyArgs(n,"DataShareArn",params,undefined,false); 
			copyArgs(n,"ConsumerIdentifier",params,undefined,false); 
			
			copyArgs(msg,"DataShareArn",params,undefined,false); 
			copyArgs(msg,"ConsumerIdentifier",params,undefined,false); 
			

			svc.authorizeDataShare(params,cb);
		}
			service.AuthorizeEndpointAccess=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Account",params,undefined,false); 
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"Account",params,undefined,false); 
			copyArgs(n,"VpcIds",params,undefined,true); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"Account",params,undefined,false); 
			copyArgs(msg,"VpcIds",params,undefined,true); 
			

			svc.authorizeEndpointAccess(params,cb);
		}
			service.AuthorizeSnapshotAccess=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"AccountWithRestoreAccess",params,undefined,false); 
			
			copyArgs(n,"SnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"SnapshotClusterIdentifier",params,undefined,false); 
			copyArgs(n,"AccountWithRestoreAccess",params,undefined,false); 
			
			copyArgs(msg,"SnapshotIdentifier",params,undefined,false); 
			copyArgs(msg,"SnapshotClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"AccountWithRestoreAccess",params,undefined,false); 
			

			svc.authorizeSnapshotAccess(params,cb);
		}
			service.BatchDeleteClusterSnapshots=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Identifiers",params,undefined,false); 
			
			copyArgs(n,"Identifiers",params,undefined,false); 
			
			copyArgs(msg,"Identifiers",params,undefined,false); 
			

			svc.batchDeleteClusterSnapshots(params,cb);
		}
			service.BatchModifyClusterSnapshots=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SnapshotIdentifierList",params,undefined,true); 
			
			copyArgs(n,"SnapshotIdentifierList",params,undefined,true); 
			copyArgs(Number(n),"ManualSnapshotRetentionPeriod",params,undefined,false); 
			copyArgs(Boolean(n),"Force",params,undefined,false); 
			
			copyArgs(msg,"SnapshotIdentifierList",params,undefined,true); 
			copyArgs(msg,"ManualSnapshotRetentionPeriod",params,undefined,false); 
			copyArgs(msg,"Force",params,undefined,false); 
			

			svc.batchModifyClusterSnapshots(params,cb);
		}
			service.CancelResize=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			

			svc.cancelResize(params,cb);
		}
			service.CopyClusterSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceSnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"TargetSnapshotIdentifier",params,undefined,false); 
			
			copyArgs(n,"SourceSnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"SourceSnapshotClusterIdentifier",params,undefined,false); 
			copyArgs(n,"TargetSnapshotIdentifier",params,undefined,false); 
			copyArgs(Number(n),"ManualSnapshotRetentionPeriod",params,undefined,false); 
			
			copyArgs(msg,"SourceSnapshotIdentifier",params,undefined,false); 
			copyArgs(msg,"SourceSnapshotClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"TargetSnapshotIdentifier",params,undefined,false); 
			copyArgs(msg,"ManualSnapshotRetentionPeriod",params,undefined,false); 
			

			svc.copyClusterSnapshot(params,cb);
		}
			service.CreateAuthenticationProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AuthenticationProfileName",params,undefined,false); 
			copyArgs(n,"AuthenticationProfileContent",params,undefined,false); 
			
			copyArgs(n,"AuthenticationProfileName",params,undefined,false); 
			copyArgs(n,"AuthenticationProfileContent",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationProfileName",params,undefined,false); 
			copyArgs(msg,"AuthenticationProfileContent",params,undefined,false); 
			

			svc.createAuthenticationProfile(params,cb);
		}
			service.CreateCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"NodeType",params,undefined,false); 
			copyArgs(n,"MasterUsername",params,undefined,false); 
			copyArgs(n,"MasterUserPassword",params,undefined,false); 
			
			copyArgs(n,"DBName",params,undefined,false); 
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"ClusterType",params,undefined,false); 
			copyArgs(n,"NodeType",params,undefined,false); 
			copyArgs(n,"MasterUsername",params,undefined,false); 
			copyArgs(n,"MasterUserPassword",params,undefined,false); 
			copyArgs(n,"ClusterSecurityGroups",params,undefined,true); 
			copyArgs(n,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(n,"ClusterSubnetGroupName",params,undefined,false); 
			copyArgs(n,"AvailabilityZone",params,undefined,false); 
			copyArgs(n,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(n,"ClusterParameterGroupName",params,undefined,false); 
			copyArgs(Number(n),"AutomatedSnapshotRetentionPeriod",params,undefined,false); 
			copyArgs(Number(n),"ManualSnapshotRetentionPeriod",params,undefined,false); 
			copyArgs(Number(n),"Port",params,undefined,false); 
			copyArgs(n,"ClusterVersion",params,undefined,false); 
			copyArgs(Boolean(n),"AllowVersionUpgrade",params,undefined,false); 
			copyArgs(Number(n),"NumberOfNodes",params,undefined,false); 
			copyArgs(Boolean(n),"PubliclyAccessible",params,undefined,false); 
			copyArgs(Boolean(n),"Encrypted",params,undefined,false); 
			copyArgs(n,"HsmClientCertificateIdentifier",params,undefined,false); 
			copyArgs(n,"HsmConfigurationIdentifier",params,undefined,false); 
			copyArgs(n,"ElasticIp",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(Boolean(n),"EnhancedVpcRouting",params,undefined,false); 
			copyArgs(n,"AdditionalInfo",params,undefined,false); 
			copyArgs(n,"IamRoles",params,undefined,true); 
			copyArgs(n,"MaintenanceTrackName",params,undefined,false); 
			copyArgs(n,"SnapshotScheduleIdentifier",params,undefined,false); 
			copyArgs(Boolean(n),"AvailabilityZoneRelocation",params,undefined,false); 
			copyArgs(n,"AquaConfigurationStatus",params,undefined,false); 
			
			copyArgs(msg,"DBName",params,undefined,false); 
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"ClusterType",params,undefined,false); 
			copyArgs(msg,"NodeType",params,undefined,false); 
			copyArgs(msg,"MasterUsername",params,undefined,false); 
			copyArgs(msg,"MasterUserPassword",params,undefined,false); 
			copyArgs(msg,"ClusterSecurityGroups",params,undefined,true); 
			copyArgs(msg,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"ClusterSubnetGroupName",params,undefined,false); 
			copyArgs(msg,"AvailabilityZone",params,undefined,false); 
			copyArgs(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(msg,"ClusterParameterGroupName",params,undefined,false); 
			copyArgs(msg,"AutomatedSnapshotRetentionPeriod",params,undefined,false); 
			copyArgs(msg,"ManualSnapshotRetentionPeriod",params,undefined,false); 
			copyArgs(msg,"Port",params,undefined,false); 
			copyArgs(msg,"ClusterVersion",params,undefined,false); 
			copyArgs(msg,"AllowVersionUpgrade",params,undefined,false); 
			copyArgs(msg,"NumberOfNodes",params,undefined,false); 
			copyArgs(msg,"PubliclyAccessible",params,undefined,false); 
			copyArgs(msg,"Encrypted",params,undefined,false); 
			copyArgs(msg,"HsmClientCertificateIdentifier",params,undefined,false); 
			copyArgs(msg,"HsmConfigurationIdentifier",params,undefined,false); 
			copyArgs(msg,"ElasticIp",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"EnhancedVpcRouting",params,undefined,false); 
			copyArgs(msg,"AdditionalInfo",params,undefined,false); 
			copyArgs(msg,"IamRoles",params,undefined,true); 
			copyArgs(msg,"MaintenanceTrackName",params,undefined,false); 
			copyArgs(msg,"SnapshotScheduleIdentifier",params,undefined,false); 
			copyArgs(msg,"AvailabilityZoneRelocation",params,undefined,false); 
			copyArgs(msg,"AquaConfigurationStatus",params,undefined,false); 
			

			svc.createCluster(params,cb);
		}
			service.CreateClusterParameterGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			copyArgs(n,"ParameterGroupFamily",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			copyArgs(n,"ParameterGroupFamily",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ParameterGroupName",params,undefined,false); 
			copyArgs(msg,"ParameterGroupFamily",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createClusterParameterGroup(params,cb);
		}
			service.CreateClusterSecurityGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterSecurityGroupName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(n,"ClusterSecurityGroupName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ClusterSecurityGroupName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createClusterSecurityGroup(params,cb);
		}
			service.CreateClusterSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"SnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(Number(n),"ManualSnapshotRetentionPeriod",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"SnapshotIdentifier",params,undefined,false); 
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"ManualSnapshotRetentionPeriod",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createClusterSnapshot(params,cb);
		}
			service.CreateClusterSubnetGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterSubnetGroupName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			
			copyArgs(n,"ClusterSubnetGroupName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ClusterSubnetGroupName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"SubnetIds",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createClusterSubnetGroup(params,cb);
		}
			service.CreateEndpointAccess=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			copyArgs(n,"SubnetGroupName",params,undefined,false); 
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"ResourceOwner",params,undefined,false); 
			copyArgs(n,"EndpointName",params,undefined,false); 
			copyArgs(n,"SubnetGroupName",params,undefined,false); 
			copyArgs(n,"VpcSecurityGroupIds",params,undefined,true); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"ResourceOwner",params,undefined,false); 
			copyArgs(msg,"EndpointName",params,undefined,false); 
			copyArgs(msg,"SubnetGroupName",params,undefined,false); 
			copyArgs(msg,"VpcSecurityGroupIds",params,undefined,true); 
			

			svc.createEndpointAccess(params,cb);
		}
			service.CreateEventSubscription=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubscriptionName",params,undefined,false); 
			copyArgs(n,"SnsTopicArn",params,undefined,false); 
			
			copyArgs(n,"SubscriptionName",params,undefined,false); 
			copyArgs(n,"SnsTopicArn",params,undefined,false); 
			copyArgs(n,"SourceType",params,undefined,false); 
			copyArgs(n,"SourceIds",params,undefined,true); 
			copyArgs(n,"EventCategories",params,undefined,true); 
			copyArgs(n,"Severity",params,undefined,false); 
			copyArgs(Boolean(n),"Enabled",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"SubscriptionName",params,undefined,false); 
			copyArgs(msg,"SnsTopicArn",params,undefined,false); 
			copyArgs(msg,"SourceType",params,undefined,false); 
			copyArgs(msg,"SourceIds",params,undefined,true); 
			copyArgs(msg,"EventCategories",params,undefined,true); 
			copyArgs(msg,"Severity",params,undefined,false); 
			copyArgs(msg,"Enabled",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createEventSubscription(params,cb);
		}
			service.CreateHsmClientCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HsmClientCertificateIdentifier",params,undefined,false); 
			
			copyArgs(n,"HsmClientCertificateIdentifier",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"HsmClientCertificateIdentifier",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createHsmClientCertificate(params,cb);
		}
			service.CreateHsmConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HsmConfigurationIdentifier",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"HsmIpAddress",params,undefined,false); 
			copyArgs(n,"HsmPartitionName",params,undefined,false); 
			copyArgs(n,"HsmPartitionPassword",params,undefined,false); 
			copyArgs(n,"HsmServerPublicCertificate",params,undefined,false); 
			
			copyArgs(n,"HsmConfigurationIdentifier",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"HsmIpAddress",params,undefined,false); 
			copyArgs(n,"HsmPartitionName",params,undefined,false); 
			copyArgs(n,"HsmPartitionPassword",params,undefined,false); 
			copyArgs(n,"HsmServerPublicCertificate",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"HsmConfigurationIdentifier",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"HsmIpAddress",params,undefined,false); 
			copyArgs(msg,"HsmPartitionName",params,undefined,false); 
			copyArgs(msg,"HsmPartitionPassword",params,undefined,false); 
			copyArgs(msg,"HsmServerPublicCertificate",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createHsmConfiguration(params,cb);
		}
			service.CreateScheduledAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ScheduledActionName",params,undefined,false); 
			copyArgs(n,"TargetAction",params,undefined,true); 
			copyArgs(n,"Schedule",params,undefined,false); 
			copyArgs(n,"IamRole",params,undefined,false); 
			
			copyArgs(n,"ScheduledActionName",params,undefined,false); 
			copyArgs(n,"TargetAction",params,undefined,true); 
			copyArgs(n,"Schedule",params,undefined,false); 
			copyArgs(n,"IamRole",params,undefined,false); 
			copyArgs(n,"ScheduledActionDescription",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(Boolean(n),"Enable",params,undefined,false); 
			
			copyArgs(msg,"ScheduledActionName",params,undefined,false); 
			copyArgs(msg,"TargetAction",params,undefined,true); 
			copyArgs(msg,"Schedule",params,undefined,false); 
			copyArgs(msg,"IamRole",params,undefined,false); 
			copyArgs(msg,"ScheduledActionDescription",params,undefined,false); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"Enable",params,undefined,false); 
			

			svc.createScheduledAction(params,cb);
		}
			service.CreateSnapshotCopyGrant=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SnapshotCopyGrantName",params,undefined,false); 
			
			copyArgs(n,"SnapshotCopyGrantName",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"SnapshotCopyGrantName",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createSnapshotCopyGrant(params,cb);
		}
			service.CreateSnapshotSchedule=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ScheduleDefinitions",params,undefined,true); 
			copyArgs(n,"ScheduleIdentifier",params,undefined,false); 
			copyArgs(n,"ScheduleDescription",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(Number(n),"NextInvocations",params,undefined,false); 
			
			copyArgs(msg,"ScheduleDefinitions",params,undefined,true); 
			copyArgs(msg,"ScheduleIdentifier",params,undefined,false); 
			copyArgs(msg,"ScheduleDescription",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"NextInvocations",params,undefined,false); 
			

			svc.createSnapshotSchedule(params,cb);
		}
			service.CreateTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createTags(params,cb);
		}
			service.CreateUsageLimit=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"FeatureType",params,undefined,false); 
			copyArgs(n,"LimitType",params,undefined,false); 
			copyArgs(n,"Amount",params,undefined,false); 
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"FeatureType",params,undefined,false); 
			copyArgs(n,"LimitType",params,undefined,false); 
			copyArgs(n,"Amount",params,undefined,false); 
			copyArgs(n,"Period",params,undefined,false); 
			copyArgs(n,"BreachAction",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"FeatureType",params,undefined,false); 
			copyArgs(msg,"LimitType",params,undefined,false); 
			copyArgs(msg,"Amount",params,undefined,false); 
			copyArgs(msg,"Period",params,undefined,false); 
			copyArgs(msg,"BreachAction",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createUsageLimit(params,cb);
		}
			service.DeauthorizeDataShare=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DataShareArn",params,undefined,false); 
			copyArgs(n,"ConsumerIdentifier",params,undefined,false); 
			
			copyArgs(n,"DataShareArn",params,undefined,false); 
			copyArgs(n,"ConsumerIdentifier",params,undefined,false); 
			
			copyArgs(msg,"DataShareArn",params,undefined,false); 
			copyArgs(msg,"ConsumerIdentifier",params,undefined,false); 
			

			svc.deauthorizeDataShare(params,cb);
		}
			service.DeleteAuthenticationProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AuthenticationProfileName",params,undefined,false); 
			
			copyArgs(n,"AuthenticationProfileName",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationProfileName",params,undefined,false); 
			

			svc.deleteAuthenticationProfile(params,cb);
		}
			service.DeleteCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(Boolean(n),"SkipFinalClusterSnapshot",params,undefined,false); 
			copyArgs(n,"FinalClusterSnapshotIdentifier",params,undefined,false); 
			copyArgs(Number(n),"FinalClusterSnapshotRetentionPeriod",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"SkipFinalClusterSnapshot",params,undefined,false); 
			copyArgs(msg,"FinalClusterSnapshotIdentifier",params,undefined,false); 
			copyArgs(msg,"FinalClusterSnapshotRetentionPeriod",params,undefined,false); 
			

			svc.deleteCluster(params,cb);
		}
			service.DeleteClusterParameterGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			
			copyArgs(msg,"ParameterGroupName",params,undefined,false); 
			

			svc.deleteClusterParameterGroup(params,cb);
		}
			service.DeleteClusterSecurityGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterSecurityGroupName",params,undefined,false); 
			
			copyArgs(n,"ClusterSecurityGroupName",params,undefined,false); 
			
			copyArgs(msg,"ClusterSecurityGroupName",params,undefined,false); 
			

			svc.deleteClusterSecurityGroup(params,cb);
		}
			service.DeleteClusterSnapshot=function(svc,msg,cb){
			var params={};
			
			
			
			
			copyArgs(msg,"SnapshotIdentifier",params,undefined,true); 
			copyArgs(msg,"SnapshotClusterIdentifier",params,undefined,true); 

			svc.deleteClusterSnapshot(params,cb);
		}
			service.DeleteClusterSubnetGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterSubnetGroupName",params,undefined,false); 
			
			copyArgs(n,"ClusterSubnetGroupName",params,undefined,false); 
			
			copyArgs(msg,"ClusterSubnetGroupName",params,undefined,false); 
			

			svc.deleteClusterSubnetGroup(params,cb);
		}
			service.DeleteEndpointAccess=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			
			copyArgs(msg,"EndpointName",params,undefined,false); 
			

			svc.deleteEndpointAccess(params,cb);
		}
			service.DeleteEventSubscription=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubscriptionName",params,undefined,false); 
			
			copyArgs(n,"SubscriptionName",params,undefined,false); 
			
			copyArgs(msg,"SubscriptionName",params,undefined,false); 
			

			svc.deleteEventSubscription(params,cb);
		}
			service.DeleteHsmClientCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HsmClientCertificateIdentifier",params,undefined,false); 
			
			copyArgs(n,"HsmClientCertificateIdentifier",params,undefined,false); 
			
			copyArgs(msg,"HsmClientCertificateIdentifier",params,undefined,false); 
			

			svc.deleteHsmClientCertificate(params,cb);
		}
			service.DeleteHsmConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HsmConfigurationIdentifier",params,undefined,false); 
			
			copyArgs(n,"HsmConfigurationIdentifier",params,undefined,false); 
			
			copyArgs(msg,"HsmConfigurationIdentifier",params,undefined,false); 
			

			svc.deleteHsmConfiguration(params,cb);
		}
			service.DeletePartner=function(svc,msg,cb){
			var params={};
			
			
			
			
			copyArgs(msg,"AccountId",params,undefined,true); 
			copyArgs(msg,"ClusterIdentifier",params,undefined,true); 
			copyArgs(msg,"DatabaseName",params,undefined,true); 
			copyArgs(msg,"PartnerName",params,undefined,true); 

			svc.deletePartner(params,cb);
		}
			service.DeleteScheduledAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ScheduledActionName",params,undefined,false); 
			
			copyArgs(n,"ScheduledActionName",params,undefined,false); 
			
			copyArgs(msg,"ScheduledActionName",params,undefined,false); 
			

			svc.deleteScheduledAction(params,cb);
		}
			service.DeleteSnapshotCopyGrant=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SnapshotCopyGrantName",params,undefined,false); 
			
			copyArgs(n,"SnapshotCopyGrantName",params,undefined,false); 
			
			copyArgs(msg,"SnapshotCopyGrantName",params,undefined,false); 
			

			svc.deleteSnapshotCopyGrant(params,cb);
		}
			service.DeleteSnapshotSchedule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ScheduleIdentifier",params,undefined,false); 
			
			copyArgs(n,"ScheduleIdentifier",params,undefined,false); 
			
			copyArgs(msg,"ScheduleIdentifier",params,undefined,false); 
			

			svc.deleteSnapshotSchedule(params,cb);
		}
			service.DeleteTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceName",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(n,"ResourceName",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(msg,"ResourceName",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			

			svc.deleteTags(params,cb);
		}
			service.DeleteUsageLimit=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UsageLimitId",params,undefined,false); 
			
			copyArgs(n,"UsageLimitId",params,undefined,false); 
			
			copyArgs(msg,"UsageLimitId",params,undefined,false); 
			

			svc.deleteUsageLimit(params,cb);
		}
			service.DescribeAccountAttributes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AttributeNames",params,undefined,false); 
			
			copyArgs(msg,"AttributeNames",params,undefined,false); 
			

			svc.describeAccountAttributes(params,cb);
		}
			service.DescribeAuthenticationProfiles=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AuthenticationProfileName",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationProfileName",params,undefined,false); 
			

			svc.describeAuthenticationProfiles(params,cb);
		}
			service.DescribeClusterDbRevisions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeClusterDbRevisions(params,cb);
		}
			service.DescribeClusterParameterGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			copyArgs(n,"TagValues",params,undefined,true); 
			
			copyArgs(msg,"ParameterGroupName",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			copyArgs(msg,"TagValues",params,undefined,true); 
			

			svc.describeClusterParameterGroups(params,cb);
		}
			service.DescribeClusterParameters=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			copyArgs(n,"Source",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"ParameterGroupName",params,undefined,false); 
			copyArgs(msg,"Source",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeClusterParameters(params,cb);
		}
			service.DescribeClusterSecurityGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ClusterSecurityGroupName",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			copyArgs(n,"TagValues",params,undefined,true); 
			
			copyArgs(msg,"ClusterSecurityGroupName",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			copyArgs(msg,"TagValues",params,undefined,true); 
			

			svc.describeClusterSecurityGroups(params,cb);
		}
			service.DescribeClusterSnapshots=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"SnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"SnapshotType",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"OwnerAccount",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			copyArgs(n,"TagValues",params,undefined,true); 
			copyArgs(Boolean(n),"ClusterExists",params,undefined,false); 
			copyArgs(n,"SortingEntities",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"SnapshotIdentifier",params,undefined,false); 
			copyArgs(msg,"SnapshotType",params,undefined,false); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"OwnerAccount",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			copyArgs(msg,"TagValues",params,undefined,true); 
			copyArgs(msg,"ClusterExists",params,undefined,false); 
			copyArgs(msg,"SortingEntities",params,undefined,false); 
			

			svc.describeClusterSnapshots(params,cb);
		}
			service.DescribeClusterSubnetGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ClusterSubnetGroupName",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			copyArgs(n,"TagValues",params,undefined,true); 
			
			copyArgs(msg,"ClusterSubnetGroupName",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			copyArgs(msg,"TagValues",params,undefined,true); 
			

			svc.describeClusterSubnetGroups(params,cb);
		}
			service.DescribeClusterTracks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaintenanceTrackName",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"MaintenanceTrackName",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeClusterTracks(params,cb);
		}
			service.DescribeClusterVersions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ClusterVersion",params,undefined,false); 
			copyArgs(n,"ClusterParameterGroupFamily",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"ClusterVersion",params,undefined,false); 
			copyArgs(msg,"ClusterParameterGroupFamily",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeClusterVersions(params,cb);
		}
			service.DescribeClusters=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			copyArgs(n,"TagValues",params,undefined,true); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			copyArgs(msg,"TagValues",params,undefined,true); 
			

			svc.describeClusters(params,cb);
		}
			service.DescribeDataShares=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DataShareArn",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"DataShareArn",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeDataShares(params,cb);
		}
			service.DescribeDataSharesForConsumer=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ConsumerArn",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"ConsumerArn",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeDataSharesForConsumer(params,cb);
		}
			service.DescribeDataSharesForProducer=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ProducerArn",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"ProducerArn",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeDataSharesForProducer(params,cb);
		}
			service.DescribeDefaultClusterParameters=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ParameterGroupFamily",params,undefined,false); 
			
			copyArgs(n,"ParameterGroupFamily",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"ParameterGroupFamily",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeDefaultClusterParameters(params,cb);
		}
			service.DescribeEndpointAccess=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"ResourceOwner",params,undefined,false); 
			copyArgs(n,"EndpointName",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"ResourceOwner",params,undefined,false); 
			copyArgs(msg,"EndpointName",params,undefined,false); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeEndpointAccess(params,cb);
		}
			service.DescribeEndpointAuthorization=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"Account",params,undefined,false); 
			copyArgs(Boolean(n),"Grantee",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"Account",params,undefined,false); 
			copyArgs(msg,"Grantee",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeEndpointAuthorization(params,cb);
		}
			service.DescribeEventCategories=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SourceType",params,undefined,false); 
			
			copyArgs(msg,"SourceType",params,undefined,false); 
			

			svc.describeEventCategories(params,cb);
		}
			service.DescribeEventSubscriptions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SubscriptionName",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			copyArgs(n,"TagValues",params,undefined,true); 
			
			copyArgs(msg,"SubscriptionName",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			copyArgs(msg,"TagValues",params,undefined,true); 
			

			svc.describeEventSubscriptions(params,cb);
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
			service.DescribeHsmClientCertificates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"HsmClientCertificateIdentifier",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			copyArgs(n,"TagValues",params,undefined,true); 
			
			copyArgs(msg,"HsmClientCertificateIdentifier",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			copyArgs(msg,"TagValues",params,undefined,true); 
			

			svc.describeHsmClientCertificates(params,cb);
		}
			service.DescribeHsmConfigurations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"HsmConfigurationIdentifier",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			copyArgs(n,"TagValues",params,undefined,true); 
			
			copyArgs(msg,"HsmConfigurationIdentifier",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			copyArgs(msg,"TagValues",params,undefined,true); 
			

			svc.describeHsmConfigurations(params,cb);
		}
			service.DescribeLoggingStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			

			svc.describeLoggingStatus(params,cb);
		}
			service.DescribeNodeConfigurationOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ActionType",params,undefined,false); 
			
			copyArgs(n,"ActionType",params,undefined,false); 
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"SnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"OwnerAccount",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			
			copyArgs(msg,"ActionType",params,undefined,false); 
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"SnapshotIdentifier",params,undefined,false); 
			copyArgs(msg,"OwnerAccount",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			

			svc.describeNodeConfigurationOptions(params,cb);
		}
			service.DescribeOrderableClusterOptions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ClusterVersion",params,undefined,false); 
			copyArgs(n,"NodeType",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"ClusterVersion",params,undefined,false); 
			copyArgs(msg,"NodeType",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeOrderableClusterOptions(params,cb);
		}
			service.DescribePartners=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"PartnerName",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"PartnerName",params,undefined,false); 
			

			svc.describePartners(params,cb);
		}
			service.DescribeReservedNodeOfferings=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ReservedNodeOfferingId",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"ReservedNodeOfferingId",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeReservedNodeOfferings(params,cb);
		}
			service.DescribeReservedNodes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ReservedNodeId",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"ReservedNodeId",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeReservedNodes(params,cb);
		}
			service.DescribeResize=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			

			svc.describeResize(params,cb);
		}
			service.DescribeScheduledActions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ScheduledActionName",params,undefined,false); 
			copyArgs(n,"TargetActionType",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(Boolean(n),"Active",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			
			copyArgs(msg,"ScheduledActionName",params,undefined,false); 
			copyArgs(msg,"TargetActionType",params,undefined,false); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"Active",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			

			svc.describeScheduledActions(params,cb);
		}
			service.DescribeSnapshotCopyGrants=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SnapshotCopyGrantName",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			copyArgs(n,"TagValues",params,undefined,true); 
			
			copyArgs(msg,"SnapshotCopyGrantName",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			copyArgs(msg,"TagValues",params,undefined,true); 
			

			svc.describeSnapshotCopyGrants(params,cb);
		}
			service.DescribeSnapshotSchedules=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"ScheduleIdentifier",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			copyArgs(n,"TagValues",params,undefined,true); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"ScheduleIdentifier",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			copyArgs(msg,"TagValues",params,undefined,true); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			

			svc.describeSnapshotSchedules(params,cb);
		}
			service.DescribeStorage=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeStorage(params,cb);
		}
			service.DescribeTableRestoreStatus=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"TableRestoreRequestId",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"TableRestoreRequestId",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeTableRestoreStatus(params,cb);
		}
			service.DescribeTags=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ResourceName",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			copyArgs(n,"TagValues",params,undefined,true); 
			
			copyArgs(msg,"ResourceName",params,undefined,false); 
			copyArgs(msg,"ResourceType",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			copyArgs(msg,"TagValues",params,undefined,true); 
			

			svc.describeTags(params,cb);
		}
			service.DescribeUsageLimits=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"UsageLimitId",params,undefined,false); 
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"FeatureType",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			copyArgs(n,"TagValues",params,undefined,true); 
			
			copyArgs(msg,"UsageLimitId",params,undefined,false); 
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"FeatureType",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			copyArgs(msg,"TagValues",params,undefined,true); 
			

			svc.describeUsageLimits(params,cb);
		}
			service.DisableLogging=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			

			svc.disableLogging(params,cb);
		}
			service.DisableSnapshotCopy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			

			svc.disableSnapshotCopy(params,cb);
		}
			service.DisassociateDataShareConsumer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DataShareArn",params,undefined,false); 
			
			copyArgs(n,"DataShareArn",params,undefined,false); 
			copyArgs(Boolean(n),"DisassociateEntireAccount",params,undefined,false); 
			copyArgs(n,"ConsumerArn",params,undefined,false); 
			
			copyArgs(msg,"DataShareArn",params,undefined,false); 
			copyArgs(msg,"DisassociateEntireAccount",params,undefined,false); 
			copyArgs(msg,"ConsumerArn",params,undefined,false); 
			

			svc.disassociateDataShareConsumer(params,cb);
		}
			service.EnableLogging=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"BucketName",params,undefined,false); 
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"BucketName",params,undefined,false); 
			copyArgs(n,"S3KeyPrefix",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"BucketName",params,undefined,false); 
			copyArgs(msg,"S3KeyPrefix",params,undefined,false); 
			

			svc.enableLogging(params,cb);
		}
			service.EnableSnapshotCopy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"DestinationRegion",params,undefined,false); 
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"DestinationRegion",params,undefined,false); 
			copyArgs(Number(n),"RetentionPeriod",params,undefined,false); 
			copyArgs(n,"SnapshotCopyGrantName",params,undefined,false); 
			copyArgs(Number(n),"ManualSnapshotRetentionPeriod",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"DestinationRegion",params,undefined,false); 
			copyArgs(msg,"RetentionPeriod",params,undefined,false); 
			copyArgs(msg,"SnapshotCopyGrantName",params,undefined,false); 
			copyArgs(msg,"ManualSnapshotRetentionPeriod",params,undefined,false); 
			

			svc.enableSnapshotCopy(params,cb);
		}
			service.GetClusterCredentials=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DbUser",params,undefined,false); 
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"DbUser",params,undefined,false); 
			copyArgs(n,"DbName",params,undefined,false); 
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(Number(n),"DurationSeconds",params,undefined,false); 
			copyArgs(Boolean(n),"AutoCreate",params,undefined,false); 
			copyArgs(n,"DbGroups",params,undefined,false); 
			
			copyArgs(msg,"DbUser",params,undefined,false); 
			copyArgs(msg,"DbName",params,undefined,false); 
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"DurationSeconds",params,undefined,false); 
			copyArgs(msg,"AutoCreate",params,undefined,false); 
			copyArgs(msg,"DbGroups",params,undefined,false); 
			

			svc.getClusterCredentials(params,cb);
		}
			service.GetReservedNodeExchangeOfferings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReservedNodeId",params,undefined,false); 
			
			copyArgs(n,"ReservedNodeId",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"ReservedNodeId",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.getReservedNodeExchangeOfferings(params,cb);
		}
			service.ModifyAquaConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"AquaConfigurationStatus",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"AquaConfigurationStatus",params,undefined,false); 
			

			svc.modifyAquaConfiguration(params,cb);
		}
			service.ModifyAuthenticationProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AuthenticationProfileName",params,undefined,false); 
			copyArgs(n,"AuthenticationProfileContent",params,undefined,false); 
			
			copyArgs(n,"AuthenticationProfileName",params,undefined,false); 
			copyArgs(n,"AuthenticationProfileContent",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationProfileName",params,undefined,false); 
			copyArgs(msg,"AuthenticationProfileContent",params,undefined,false); 
			

			svc.modifyAuthenticationProfile(params,cb);
		}
			service.ModifyCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"ClusterType",params,undefined,false); 
			copyArgs(n,"NodeType",params,undefined,false); 
			copyArgs(Number(n),"NumberOfNodes",params,undefined,false); 
			copyArgs(n,"ClusterSecurityGroups",params,undefined,true); 
			copyArgs(n,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(n,"MasterUserPassword",params,undefined,false); 
			copyArgs(n,"ClusterParameterGroupName",params,undefined,false); 
			copyArgs(Number(n),"AutomatedSnapshotRetentionPeriod",params,undefined,false); 
			copyArgs(Number(n),"ManualSnapshotRetentionPeriod",params,undefined,false); 
			copyArgs(n,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(n,"ClusterVersion",params,undefined,false); 
			copyArgs(Boolean(n),"AllowVersionUpgrade",params,undefined,false); 
			copyArgs(n,"HsmClientCertificateIdentifier",params,undefined,false); 
			copyArgs(n,"HsmConfigurationIdentifier",params,undefined,false); 
			copyArgs(n,"NewClusterIdentifier",params,undefined,false); 
			copyArgs(Boolean(n),"PubliclyAccessible",params,undefined,false); 
			copyArgs(n,"ElasticIp",params,undefined,false); 
			copyArgs(Boolean(n),"EnhancedVpcRouting",params,undefined,false); 
			copyArgs(n,"MaintenanceTrackName",params,undefined,false); 
			copyArgs(Boolean(n),"Encrypted",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(Boolean(n),"AvailabilityZoneRelocation",params,undefined,false); 
			copyArgs(n,"AvailabilityZone",params,undefined,false); 
			copyArgs(Number(n),"Port",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"ClusterType",params,undefined,false); 
			copyArgs(msg,"NodeType",params,undefined,false); 
			copyArgs(msg,"NumberOfNodes",params,undefined,false); 
			copyArgs(msg,"ClusterSecurityGroups",params,undefined,true); 
			copyArgs(msg,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"MasterUserPassword",params,undefined,false); 
			copyArgs(msg,"ClusterParameterGroupName",params,undefined,false); 
			copyArgs(msg,"AutomatedSnapshotRetentionPeriod",params,undefined,false); 
			copyArgs(msg,"ManualSnapshotRetentionPeriod",params,undefined,false); 
			copyArgs(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(msg,"ClusterVersion",params,undefined,false); 
			copyArgs(msg,"AllowVersionUpgrade",params,undefined,false); 
			copyArgs(msg,"HsmClientCertificateIdentifier",params,undefined,false); 
			copyArgs(msg,"HsmConfigurationIdentifier",params,undefined,false); 
			copyArgs(msg,"NewClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"PubliclyAccessible",params,undefined,false); 
			copyArgs(msg,"ElasticIp",params,undefined,false); 
			copyArgs(msg,"EnhancedVpcRouting",params,undefined,false); 
			copyArgs(msg,"MaintenanceTrackName",params,undefined,false); 
			copyArgs(msg,"Encrypted",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"AvailabilityZoneRelocation",params,undefined,false); 
			copyArgs(msg,"AvailabilityZone",params,undefined,false); 
			copyArgs(msg,"Port",params,undefined,false); 
			

			svc.modifyCluster(params,cb);
		}
			service.ModifyClusterDbRevision=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"RevisionTarget",params,undefined,false); 
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"RevisionTarget",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"RevisionTarget",params,undefined,false); 
			

			svc.modifyClusterDbRevision(params,cb);
		}
			service.ModifyClusterIamRoles=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"AddIamRoles",params,undefined,true); 
			copyArgs(n,"RemoveIamRoles",params,undefined,true); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"AddIamRoles",params,undefined,true); 
			copyArgs(msg,"RemoveIamRoles",params,undefined,true); 
			

			svc.modifyClusterIamRoles(params,cb);
		}
			service.ModifyClusterMaintenance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(Boolean(n),"DeferMaintenance",params,undefined,false); 
			copyArgs(n,"DeferMaintenanceIdentifier",params,undefined,false); 
			copyArgs(n,"DeferMaintenanceStartTime",params,undefined,false); 
			copyArgs(n,"DeferMaintenanceEndTime",params,undefined,false); 
			copyArgs(Number(n),"DeferMaintenanceDuration",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"DeferMaintenance",params,undefined,false); 
			copyArgs(msg,"DeferMaintenanceIdentifier",params,undefined,false); 
			copyArgs(msg,"DeferMaintenanceStartTime",params,undefined,false); 
			copyArgs(msg,"DeferMaintenanceEndTime",params,undefined,false); 
			copyArgs(msg,"DeferMaintenanceDuration",params,undefined,false); 
			

			svc.modifyClusterMaintenance(params,cb);
		}
			service.ModifyClusterParameterGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			
			copyArgs(msg,"ParameterGroupName",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			

			svc.modifyClusterParameterGroup(params,cb);
		}
			service.ModifyClusterSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SnapshotIdentifier",params,undefined,false); 
			
			copyArgs(n,"SnapshotIdentifier",params,undefined,false); 
			copyArgs(Number(n),"ManualSnapshotRetentionPeriod",params,undefined,false); 
			copyArgs(Boolean(n),"Force",params,undefined,false); 
			
			copyArgs(msg,"SnapshotIdentifier",params,undefined,false); 
			copyArgs(msg,"ManualSnapshotRetentionPeriod",params,undefined,false); 
			copyArgs(msg,"Force",params,undefined,false); 
			

			svc.modifyClusterSnapshot(params,cb);
		}
			service.ModifyClusterSnapshotSchedule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"ScheduleIdentifier",params,undefined,false); 
			copyArgs(Boolean(n),"DisassociateSchedule",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"ScheduleIdentifier",params,undefined,false); 
			copyArgs(msg,"DisassociateSchedule",params,undefined,false); 
			

			svc.modifyClusterSnapshotSchedule(params,cb);
		}
			service.ModifyClusterSubnetGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterSubnetGroupName",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			
			copyArgs(n,"ClusterSubnetGroupName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			
			copyArgs(msg,"ClusterSubnetGroupName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"SubnetIds",params,undefined,true); 
			

			svc.modifyClusterSubnetGroup(params,cb);
		}
			service.ModifyEndpointAccess=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			copyArgs(n,"VpcSecurityGroupIds",params,undefined,true); 
			
			copyArgs(msg,"EndpointName",params,undefined,false); 
			copyArgs(msg,"VpcSecurityGroupIds",params,undefined,true); 
			

			svc.modifyEndpointAccess(params,cb);
		}
			service.ModifyEventSubscription=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubscriptionName",params,undefined,false); 
			
			copyArgs(n,"SubscriptionName",params,undefined,false); 
			copyArgs(n,"SnsTopicArn",params,undefined,false); 
			copyArgs(n,"SourceType",params,undefined,false); 
			copyArgs(n,"SourceIds",params,undefined,true); 
			copyArgs(n,"EventCategories",params,undefined,true); 
			copyArgs(n,"Severity",params,undefined,false); 
			copyArgs(Boolean(n),"Enabled",params,undefined,false); 
			
			copyArgs(msg,"SubscriptionName",params,undefined,false); 
			copyArgs(msg,"SnsTopicArn",params,undefined,false); 
			copyArgs(msg,"SourceType",params,undefined,false); 
			copyArgs(msg,"SourceIds",params,undefined,true); 
			copyArgs(msg,"EventCategories",params,undefined,true); 
			copyArgs(msg,"Severity",params,undefined,false); 
			copyArgs(msg,"Enabled",params,undefined,false); 
			

			svc.modifyEventSubscription(params,cb);
		}
			service.ModifyScheduledAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ScheduledActionName",params,undefined,false); 
			
			copyArgs(n,"ScheduledActionName",params,undefined,false); 
			copyArgs(n,"TargetAction",params,undefined,true); 
			copyArgs(n,"Schedule",params,undefined,false); 
			copyArgs(n,"IamRole",params,undefined,false); 
			copyArgs(n,"ScheduledActionDescription",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(Boolean(n),"Enable",params,undefined,false); 
			
			copyArgs(msg,"ScheduledActionName",params,undefined,false); 
			copyArgs(msg,"TargetAction",params,undefined,true); 
			copyArgs(msg,"Schedule",params,undefined,false); 
			copyArgs(msg,"IamRole",params,undefined,false); 
			copyArgs(msg,"ScheduledActionDescription",params,undefined,false); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"Enable",params,undefined,false); 
			

			svc.modifyScheduledAction(params,cb);
		}
			service.ModifySnapshotCopyRetentionPeriod=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(Number(n),"RetentionPeriod",params,undefined,false); 
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(Number(n),"RetentionPeriod",params,undefined,false); 
			copyArgs(Boolean(n),"Manual",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"RetentionPeriod",params,undefined,false); 
			copyArgs(msg,"Manual",params,undefined,false); 
			

			svc.modifySnapshotCopyRetentionPeriod(params,cb);
		}
			service.ModifySnapshotSchedule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ScheduleIdentifier",params,undefined,false); 
			copyArgs(n,"ScheduleDefinitions",params,undefined,true); 
			
			copyArgs(n,"ScheduleIdentifier",params,undefined,false); 
			copyArgs(n,"ScheduleDefinitions",params,undefined,true); 
			
			copyArgs(msg,"ScheduleIdentifier",params,undefined,false); 
			copyArgs(msg,"ScheduleDefinitions",params,undefined,true); 
			

			svc.modifySnapshotSchedule(params,cb);
		}
			service.ModifyUsageLimit=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UsageLimitId",params,undefined,false); 
			
			copyArgs(n,"UsageLimitId",params,undefined,false); 
			copyArgs(n,"Amount",params,undefined,false); 
			copyArgs(n,"BreachAction",params,undefined,false); 
			
			copyArgs(msg,"UsageLimitId",params,undefined,false); 
			copyArgs(msg,"Amount",params,undefined,false); 
			copyArgs(msg,"BreachAction",params,undefined,false); 
			

			svc.modifyUsageLimit(params,cb);
		}
			service.PauseCluster=function(svc,msg,cb){
			var params={};
			
			
			
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,true); 

			svc.pauseCluster(params,cb);
		}
			service.PurchaseReservedNodeOffering=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReservedNodeOfferingId",params,undefined,false); 
			
			copyArgs(n,"ReservedNodeOfferingId",params,undefined,false); 
			copyArgs(Number(n),"NodeCount",params,undefined,false); 
			
			copyArgs(msg,"ReservedNodeOfferingId",params,undefined,false); 
			copyArgs(msg,"NodeCount",params,undefined,false); 
			

			svc.purchaseReservedNodeOffering(params,cb);
		}
			service.RebootCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			

			svc.rebootCluster(params,cb);
		}
			service.RejectDataShare=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DataShareArn",params,undefined,false); 
			
			copyArgs(n,"DataShareArn",params,undefined,false); 
			
			copyArgs(msg,"DataShareArn",params,undefined,false); 
			

			svc.rejectDataShare(params,cb);
		}
			service.ResetClusterParameterGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			copyArgs(Boolean(n),"ResetAllParameters",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			
			copyArgs(msg,"ParameterGroupName",params,undefined,false); 
			copyArgs(msg,"ResetAllParameters",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			

			svc.resetClusterParameterGroup(params,cb);
		}
			service.ResizeCluster=function(svc,msg,cb){
			var params={};
			
			
			
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,true); 
			copyArgs(msg,"ClusterType",params,undefined,true); 
			copyArgs(msg,"NodeType",params,undefined,true); 
			copyArgs(msg,"NumberOfNodes",params,undefined,true); 
			copyArgs(msg,"Classic",params,undefined,true); 

			svc.resizeCluster(params,cb);
		}
			service.RestoreFromClusterSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"SnapshotIdentifier",params,undefined,false); 
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"SnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"SnapshotClusterIdentifier",params,undefined,false); 
			copyArgs(Number(n),"Port",params,undefined,false); 
			copyArgs(n,"AvailabilityZone",params,undefined,false); 
			copyArgs(Boolean(n),"AllowVersionUpgrade",params,undefined,false); 
			copyArgs(n,"ClusterSubnetGroupName",params,undefined,false); 
			copyArgs(Boolean(n),"PubliclyAccessible",params,undefined,false); 
			copyArgs(n,"OwnerAccount",params,undefined,false); 
			copyArgs(n,"HsmClientCertificateIdentifier",params,undefined,false); 
			copyArgs(n,"HsmConfigurationIdentifier",params,undefined,false); 
			copyArgs(n,"ElasticIp",params,undefined,false); 
			copyArgs(n,"ClusterParameterGroupName",params,undefined,false); 
			copyArgs(n,"ClusterSecurityGroups",params,undefined,true); 
			copyArgs(n,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(n,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(Number(n),"AutomatedSnapshotRetentionPeriod",params,undefined,false); 
			copyArgs(Number(n),"ManualSnapshotRetentionPeriod",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"NodeType",params,undefined,false); 
			copyArgs(Boolean(n),"EnhancedVpcRouting",params,undefined,false); 
			copyArgs(n,"AdditionalInfo",params,undefined,false); 
			copyArgs(n,"IamRoles",params,undefined,true); 
			copyArgs(n,"MaintenanceTrackName",params,undefined,false); 
			copyArgs(n,"SnapshotScheduleIdentifier",params,undefined,false); 
			copyArgs(Number(n),"NumberOfNodes",params,undefined,false); 
			copyArgs(Boolean(n),"AvailabilityZoneRelocation",params,undefined,false); 
			copyArgs(n,"AquaConfigurationStatus",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"SnapshotIdentifier",params,undefined,false); 
			copyArgs(msg,"SnapshotClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"Port",params,undefined,false); 
			copyArgs(msg,"AvailabilityZone",params,undefined,false); 
			copyArgs(msg,"AllowVersionUpgrade",params,undefined,false); 
			copyArgs(msg,"ClusterSubnetGroupName",params,undefined,false); 
			copyArgs(msg,"PubliclyAccessible",params,undefined,false); 
			copyArgs(msg,"OwnerAccount",params,undefined,false); 
			copyArgs(msg,"HsmClientCertificateIdentifier",params,undefined,false); 
			copyArgs(msg,"HsmConfigurationIdentifier",params,undefined,false); 
			copyArgs(msg,"ElasticIp",params,undefined,false); 
			copyArgs(msg,"ClusterParameterGroupName",params,undefined,false); 
			copyArgs(msg,"ClusterSecurityGroups",params,undefined,true); 
			copyArgs(msg,"VpcSecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(msg,"AutomatedSnapshotRetentionPeriod",params,undefined,false); 
			copyArgs(msg,"ManualSnapshotRetentionPeriod",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"NodeType",params,undefined,false); 
			copyArgs(msg,"EnhancedVpcRouting",params,undefined,false); 
			copyArgs(msg,"AdditionalInfo",params,undefined,false); 
			copyArgs(msg,"IamRoles",params,undefined,true); 
			copyArgs(msg,"MaintenanceTrackName",params,undefined,false); 
			copyArgs(msg,"SnapshotScheduleIdentifier",params,undefined,false); 
			copyArgs(msg,"NumberOfNodes",params,undefined,false); 
			copyArgs(msg,"AvailabilityZoneRelocation",params,undefined,false); 
			copyArgs(msg,"AquaConfigurationStatus",params,undefined,false); 
			

			svc.restoreFromClusterSnapshot(params,cb);
		}
			service.RestoreTableFromClusterSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"SnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"SourceDatabaseName",params,undefined,false); 
			copyArgs(n,"SourceTableName",params,undefined,false); 
			copyArgs(n,"NewTableName",params,undefined,false); 
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"SnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"SourceDatabaseName",params,undefined,false); 
			copyArgs(n,"SourceSchemaName",params,undefined,false); 
			copyArgs(n,"SourceTableName",params,undefined,false); 
			copyArgs(n,"TargetDatabaseName",params,undefined,false); 
			copyArgs(n,"TargetSchemaName",params,undefined,false); 
			copyArgs(n,"NewTableName",params,undefined,false); 
			copyArgs(Boolean(n),"EnableCaseSensitiveIdentifier",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"SnapshotIdentifier",params,undefined,false); 
			copyArgs(msg,"SourceDatabaseName",params,undefined,false); 
			copyArgs(msg,"SourceSchemaName",params,undefined,false); 
			copyArgs(msg,"SourceTableName",params,undefined,false); 
			copyArgs(msg,"TargetDatabaseName",params,undefined,false); 
			copyArgs(msg,"TargetSchemaName",params,undefined,false); 
			copyArgs(msg,"NewTableName",params,undefined,false); 
			copyArgs(msg,"EnableCaseSensitiveIdentifier",params,undefined,false); 
			

			svc.restoreTableFromClusterSnapshot(params,cb);
		}
			service.ResumeCluster=function(svc,msg,cb){
			var params={};
			
			
			
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,true); 

			svc.resumeCluster(params,cb);
		}
			service.RevokeClusterSecurityGroupIngress=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterSecurityGroupName",params,undefined,false); 
			
			copyArgs(n,"ClusterSecurityGroupName",params,undefined,false); 
			copyArgs(n,"CIDRIP",params,undefined,false); 
			copyArgs(n,"EC2SecurityGroupName",params,undefined,false); 
			copyArgs(n,"EC2SecurityGroupOwnerId",params,undefined,false); 
			
			copyArgs(msg,"ClusterSecurityGroupName",params,undefined,false); 
			copyArgs(msg,"CIDRIP",params,undefined,false); 
			copyArgs(msg,"EC2SecurityGroupName",params,undefined,false); 
			copyArgs(msg,"EC2SecurityGroupOwnerId",params,undefined,false); 
			

			svc.revokeClusterSecurityGroupIngress(params,cb);
		}
			service.RevokeEndpointAccess=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"Account",params,undefined,false); 
			copyArgs(n,"VpcIds",params,undefined,true); 
			copyArgs(Boolean(n),"Force",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"Account",params,undefined,false); 
			copyArgs(msg,"VpcIds",params,undefined,true); 
			copyArgs(msg,"Force",params,undefined,false); 
			

			svc.revokeEndpointAccess(params,cb);
		}
			service.RevokeSnapshotAccess=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"AccountWithRestoreAccess",params,undefined,false); 
			
			copyArgs(n,"SnapshotIdentifier",params,undefined,false); 
			copyArgs(n,"SnapshotClusterIdentifier",params,undefined,false); 
			copyArgs(n,"AccountWithRestoreAccess",params,undefined,false); 
			
			copyArgs(msg,"SnapshotIdentifier",params,undefined,false); 
			copyArgs(msg,"SnapshotClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"AccountWithRestoreAccess",params,undefined,false); 
			

			svc.revokeSnapshotAccess(params,cb);
		}
			service.RotateEncryptionKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			

			svc.rotateEncryptionKey(params,cb);
		}
			service.UpdatePartnerStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"PartnerName",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"PartnerName",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			copyArgs(n,"StatusMessage",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"PartnerName",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			copyArgs(msg,"StatusMessage",params,undefined,false); 
			

			svc.updatePartnerStatus(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS Redshift", AmazonAPINode);

};
