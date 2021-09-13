
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

		var awsService = new AWS.Backup( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Backup(msg.AWSConfig) : awsService;

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
		
		service.CreateBackupPlan=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupPlan",params,undefined,true); 
			
			copyArgs(n,"BackupPlan",params,undefined,true); 
			copyArgs(n,"BackupPlanTags",params,undefined,true); 
			copyArgs(n,"CreatorRequestId",params,undefined,false); 
			
			copyArgs(msg,"BackupPlan",params,undefined,true); 
			copyArgs(msg,"BackupPlanTags",params,undefined,true); 
			copyArgs(msg,"CreatorRequestId",params,undefined,false); 
			

			svc.createBackupPlan(params,cb);
		}
		
		service.CreateBackupSelection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupPlanId",params,undefined,false); 
			copyArgs(n,"BackupSelection",params,undefined,true); 
			
			copyArgs(n,"BackupPlanId",params,undefined,false); 
			copyArgs(n,"BackupSelection",params,undefined,true); 
			copyArgs(n,"CreatorRequestId",params,undefined,false); 
			
			copyArgs(msg,"BackupPlanId",params,undefined,false); 
			copyArgs(msg,"BackupSelection",params,undefined,true); 
			copyArgs(msg,"CreatorRequestId",params,undefined,false); 
			

			svc.createBackupSelection(params,cb);
		}
		
		service.CreateBackupVault=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			copyArgs(n,"BackupVaultTags",params,undefined,true); 
			copyArgs(n,"EncryptionKeyArn",params,undefined,false); 
			copyArgs(n,"CreatorRequestId",params,undefined,false); 
			
			copyArgs(msg,"BackupVaultName",params,undefined,false); 
			copyArgs(msg,"BackupVaultTags",params,undefined,true); 
			copyArgs(msg,"EncryptionKeyArn",params,undefined,false); 
			copyArgs(msg,"CreatorRequestId",params,undefined,false); 
			

			svc.createBackupVault(params,cb);
		}
		
		service.CreateFramework=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FrameworkName",params,undefined,false); 
			copyArgs(n,"FrameworkControls",params,undefined,true); 
			
			copyArgs(n,"FrameworkName",params,undefined,false); 
			copyArgs(n,"FrameworkDescription",params,undefined,false); 
			copyArgs(n,"FrameworkControls",params,undefined,true); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			copyArgs(n,"FrameworkTags",params,undefined,true); 
			
			copyArgs(msg,"FrameworkName",params,undefined,false); 
			copyArgs(msg,"FrameworkDescription",params,undefined,false); 
			copyArgs(msg,"FrameworkControls",params,undefined,true); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			copyArgs(msg,"FrameworkTags",params,undefined,true); 
			

			svc.createFramework(params,cb);
		}
		
		service.CreateReportPlan=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReportPlanName",params,undefined,false); 
			copyArgs(n,"ReportDeliveryChannel",params,undefined,true); 
			copyArgs(n,"ReportSetting",params,undefined,true); 
			
			copyArgs(n,"ReportPlanName",params,undefined,false); 
			copyArgs(n,"ReportPlanDescription",params,undefined,false); 
			copyArgs(n,"ReportDeliveryChannel",params,undefined,true); 
			copyArgs(n,"ReportSetting",params,undefined,true); 
			copyArgs(n,"ReportPlanTags",params,undefined,true); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(msg,"ReportPlanName",params,undefined,false); 
			copyArgs(msg,"ReportPlanDescription",params,undefined,false); 
			copyArgs(msg,"ReportDeliveryChannel",params,undefined,true); 
			copyArgs(msg,"ReportSetting",params,undefined,true); 
			copyArgs(msg,"ReportPlanTags",params,undefined,true); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.createReportPlan(params,cb);
		}
		
		service.DeleteBackupPlan=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupPlanId",params,undefined,false); 
			
			copyArgs(n,"BackupPlanId",params,undefined,false); 
			
			copyArgs(msg,"BackupPlanId",params,undefined,false); 
			

			svc.deleteBackupPlan(params,cb);
		}
		
		service.DeleteBackupSelection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupPlanId",params,undefined,false); 
			copyArgs(n,"SelectionId",params,undefined,false); 
			
			copyArgs(n,"BackupPlanId",params,undefined,false); 
			copyArgs(n,"SelectionId",params,undefined,false); 
			
			copyArgs(msg,"BackupPlanId",params,undefined,false); 
			copyArgs(msg,"SelectionId",params,undefined,false); 
			

			svc.deleteBackupSelection(params,cb);
		}
		
		service.DeleteBackupVault=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			
			copyArgs(msg,"BackupVaultName",params,undefined,false); 
			

			svc.deleteBackupVault(params,cb);
		}
		
		service.DeleteBackupVaultAccessPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			
			copyArgs(msg,"BackupVaultName",params,undefined,false); 
			

			svc.deleteBackupVaultAccessPolicy(params,cb);
		}
		
		service.DeleteBackupVaultNotifications=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			
			copyArgs(msg,"BackupVaultName",params,undefined,false); 
			

			svc.deleteBackupVaultNotifications(params,cb);
		}
		
		service.DeleteFramework=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FrameworkName",params,undefined,false); 
			
			copyArgs(n,"FrameworkName",params,undefined,false); 
			
			copyArgs(msg,"FrameworkName",params,undefined,false); 
			

			svc.deleteFramework(params,cb);
		}
		
		service.DeleteRecoveryPoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			copyArgs(n,"RecoveryPointArn",params,undefined,false); 
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			copyArgs(n,"RecoveryPointArn",params,undefined,false); 
			
			copyArgs(msg,"BackupVaultName",params,undefined,false); 
			copyArgs(msg,"RecoveryPointArn",params,undefined,false); 
			

			svc.deleteRecoveryPoint(params,cb);
		}
		
		service.DeleteReportPlan=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReportPlanName",params,undefined,false); 
			
			copyArgs(n,"ReportPlanName",params,undefined,false); 
			
			copyArgs(msg,"ReportPlanName",params,undefined,false); 
			

			svc.deleteReportPlan(params,cb);
		}
		
		service.DescribeBackupJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupJobId",params,undefined,false); 
			
			copyArgs(n,"BackupJobId",params,undefined,false); 
			
			copyArgs(msg,"BackupJobId",params,undefined,false); 
			

			svc.describeBackupJob(params,cb);
		}
		
		service.DescribeBackupVault=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			
			copyArgs(msg,"BackupVaultName",params,undefined,false); 
			

			svc.describeBackupVault(params,cb);
		}
		
		service.DescribeCopyJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CopyJobId",params,undefined,false); 
			
			copyArgs(n,"CopyJobId",params,undefined,false); 
			
			copyArgs(msg,"CopyJobId",params,undefined,false); 
			

			svc.describeCopyJob(params,cb);
		}
		
		service.DescribeFramework=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FrameworkName",params,undefined,false); 
			
			copyArgs(n,"FrameworkName",params,undefined,false); 
			
			copyArgs(msg,"FrameworkName",params,undefined,false); 
			

			svc.describeFramework(params,cb);
		}
		
		service.DescribeGlobalSettings=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeGlobalSettings(params,cb);
		}
		
		service.DescribeProtectedResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.describeProtectedResource(params,cb);
		}
		
		service.DescribeRecoveryPoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			copyArgs(n,"RecoveryPointArn",params,undefined,false); 
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			copyArgs(n,"RecoveryPointArn",params,undefined,false); 
			
			copyArgs(msg,"BackupVaultName",params,undefined,false); 
			copyArgs(msg,"RecoveryPointArn",params,undefined,false); 
			

			svc.describeRecoveryPoint(params,cb);
		}
		
		service.DescribeRegionSettings=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeRegionSettings(params,cb);
		}
		
		service.DescribeReportJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReportJobId",params,undefined,false); 
			
			copyArgs(n,"ReportJobId",params,undefined,false); 
			
			copyArgs(msg,"ReportJobId",params,undefined,false); 
			

			svc.describeReportJob(params,cb);
		}
		
		service.DescribeReportPlan=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReportPlanName",params,undefined,false); 
			
			copyArgs(n,"ReportPlanName",params,undefined,false); 
			
			copyArgs(msg,"ReportPlanName",params,undefined,false); 
			

			svc.describeReportPlan(params,cb);
		}
		
		service.DescribeRestoreJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RestoreJobId",params,undefined,false); 
			
			copyArgs(n,"RestoreJobId",params,undefined,false); 
			
			copyArgs(msg,"RestoreJobId",params,undefined,false); 
			

			svc.describeRestoreJob(params,cb);
		}
		
		service.DisassociateRecoveryPoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			copyArgs(n,"RecoveryPointArn",params,undefined,false); 
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			copyArgs(n,"RecoveryPointArn",params,undefined,false); 
			
			copyArgs(msg,"BackupVaultName",params,undefined,false); 
			copyArgs(msg,"RecoveryPointArn",params,undefined,false); 
			

			svc.disassociateRecoveryPoint(params,cb);
		}
		
		service.ExportBackupPlanTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupPlanId",params,undefined,false); 
			
			copyArgs(n,"BackupPlanId",params,undefined,false); 
			
			copyArgs(msg,"BackupPlanId",params,undefined,false); 
			

			svc.exportBackupPlanTemplate(params,cb);
		}
		
		service.GetBackupPlan=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupPlanId",params,undefined,false); 
			
			copyArgs(n,"BackupPlanId",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			
			copyArgs(msg,"BackupPlanId",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			

			svc.getBackupPlan(params,cb);
		}
		
		service.GetBackupPlanFromJSON=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupPlanTemplateJson",params,undefined,false); 
			
			copyArgs(n,"BackupPlanTemplateJson",params,undefined,false); 
			
			copyArgs(msg,"BackupPlanTemplateJson",params,undefined,false); 
			

			svc.getBackupPlanFromJSON(params,cb);
		}
		
		service.GetBackupPlanFromTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupPlanTemplateId",params,undefined,false); 
			
			copyArgs(n,"BackupPlanTemplateId",params,undefined,false); 
			
			copyArgs(msg,"BackupPlanTemplateId",params,undefined,false); 
			

			svc.getBackupPlanFromTemplate(params,cb);
		}
		
		service.GetBackupSelection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupPlanId",params,undefined,false); 
			copyArgs(n,"SelectionId",params,undefined,false); 
			
			copyArgs(n,"BackupPlanId",params,undefined,false); 
			copyArgs(n,"SelectionId",params,undefined,false); 
			
			copyArgs(msg,"BackupPlanId",params,undefined,false); 
			copyArgs(msg,"SelectionId",params,undefined,false); 
			

			svc.getBackupSelection(params,cb);
		}
		
		service.GetBackupVaultAccessPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			
			copyArgs(msg,"BackupVaultName",params,undefined,false); 
			

			svc.getBackupVaultAccessPolicy(params,cb);
		}
		
		service.GetBackupVaultNotifications=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			
			copyArgs(msg,"BackupVaultName",params,undefined,false); 
			

			svc.getBackupVaultNotifications(params,cb);
		}
		
		service.GetRecoveryPointRestoreMetadata=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			copyArgs(n,"RecoveryPointArn",params,undefined,false); 
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			copyArgs(n,"RecoveryPointArn",params,undefined,false); 
			
			copyArgs(msg,"BackupVaultName",params,undefined,false); 
			copyArgs(msg,"RecoveryPointArn",params,undefined,false); 
			

			svc.getRecoveryPointRestoreMetadata(params,cb);
		}
		
		service.GetSupportedResourceTypes=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getSupportedResourceTypes(params,cb);
		}
		
		service.ListBackupJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"ByResourceArn",params,undefined,false); 
			copyArgs(n,"ByState",params,undefined,false); 
			copyArgs(n,"ByBackupVaultName",params,undefined,false); 
			copyArgs(n,"ByCreatedBefore",params,undefined,false); 
			copyArgs(n,"ByCreatedAfter",params,undefined,false); 
			copyArgs(n,"ByResourceType",params,undefined,false); 
			copyArgs(n,"ByAccountId",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"ByResourceArn",params,undefined,false); 
			copyArgs(msg,"ByState",params,undefined,false); 
			copyArgs(msg,"ByBackupVaultName",params,undefined,false); 
			copyArgs(msg,"ByCreatedBefore",params,undefined,false); 
			copyArgs(msg,"ByCreatedAfter",params,undefined,false); 
			copyArgs(msg,"ByResourceType",params,undefined,false); 
			copyArgs(msg,"ByAccountId",params,undefined,false); 
			

			svc.listBackupJobs(params,cb);
		}
		
		service.ListBackupPlanTemplates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listBackupPlanTemplates(params,cb);
		}
		
		service.ListBackupPlanVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupPlanId",params,undefined,false); 
			
			copyArgs(n,"BackupPlanId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"BackupPlanId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listBackupPlanVersions(params,cb);
		}
		
		service.ListBackupPlans=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(Boolean(n),"IncludeDeleted",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"IncludeDeleted",params,undefined,false); 
			

			svc.listBackupPlans(params,cb);
		}
		
		service.ListBackupSelections=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupPlanId",params,undefined,false); 
			
			copyArgs(n,"BackupPlanId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"BackupPlanId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listBackupSelections(params,cb);
		}
		
		service.ListBackupVaults=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listBackupVaults(params,cb);
		}
		
		service.ListCopyJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"ByResourceArn",params,undefined,false); 
			copyArgs(n,"ByState",params,undefined,false); 
			copyArgs(n,"ByCreatedBefore",params,undefined,false); 
			copyArgs(n,"ByCreatedAfter",params,undefined,false); 
			copyArgs(n,"ByResourceType",params,undefined,false); 
			copyArgs(n,"ByDestinationVaultArn",params,undefined,false); 
			copyArgs(n,"ByAccountId",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"ByResourceArn",params,undefined,false); 
			copyArgs(msg,"ByState",params,undefined,false); 
			copyArgs(msg,"ByCreatedBefore",params,undefined,false); 
			copyArgs(msg,"ByCreatedAfter",params,undefined,false); 
			copyArgs(msg,"ByResourceType",params,undefined,false); 
			copyArgs(msg,"ByDestinationVaultArn",params,undefined,false); 
			copyArgs(msg,"ByAccountId",params,undefined,false); 
			

			svc.listCopyJobs(params,cb);
		}
		
		service.ListFrameworks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listFrameworks(params,cb);
		}
		
		service.ListProtectedResources=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listProtectedResources(params,cb);
		}
		
		service.ListRecoveryPointsByBackupVault=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"ByResourceArn",params,undefined,false); 
			copyArgs(n,"ByResourceType",params,undefined,false); 
			copyArgs(n,"ByBackupPlanId",params,undefined,false); 
			copyArgs(n,"ByCreatedBefore",params,undefined,false); 
			copyArgs(n,"ByCreatedAfter",params,undefined,false); 
			
			copyArgs(msg,"BackupVaultName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"ByResourceArn",params,undefined,false); 
			copyArgs(msg,"ByResourceType",params,undefined,false); 
			copyArgs(msg,"ByBackupPlanId",params,undefined,false); 
			copyArgs(msg,"ByCreatedBefore",params,undefined,false); 
			copyArgs(msg,"ByCreatedAfter",params,undefined,false); 
			

			svc.listRecoveryPointsByBackupVault(params,cb);
		}
		
		service.ListRecoveryPointsByResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listRecoveryPointsByResource(params,cb);
		}
		
		service.ListReportJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ByReportPlanName",params,undefined,false); 
			copyArgs(n,"ByCreationBefore",params,undefined,false); 
			copyArgs(n,"ByCreationAfter",params,undefined,false); 
			copyArgs(n,"ByStatus",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ByReportPlanName",params,undefined,false); 
			copyArgs(msg,"ByCreationBefore",params,undefined,false); 
			copyArgs(msg,"ByCreationAfter",params,undefined,false); 
			copyArgs(msg,"ByStatus",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listReportJobs(params,cb);
		}
		
		service.ListReportPlans=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listReportPlans(params,cb);
		}
		
		service.ListRestoreJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"ByAccountId",params,undefined,false); 
			copyArgs(n,"ByCreatedBefore",params,undefined,false); 
			copyArgs(n,"ByCreatedAfter",params,undefined,false); 
			copyArgs(n,"ByStatus",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"ByAccountId",params,undefined,false); 
			copyArgs(msg,"ByCreatedBefore",params,undefined,false); 
			copyArgs(msg,"ByCreatedAfter",params,undefined,false); 
			copyArgs(msg,"ByStatus",params,undefined,false); 
			

			svc.listRestoreJobs(params,cb);
		}
		
		service.ListTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listTags(params,cb);
		}
		
		service.PutBackupVaultAccessPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(msg,"BackupVaultName",params,undefined,false); 
			copyArgs(msg,"Policy",params,undefined,false); 
			

			svc.putBackupVaultAccessPolicy(params,cb);
		}
		
		service.PutBackupVaultNotifications=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			copyArgs(n,"SNSTopicArn",params,undefined,false); 
			copyArgs(n,"BackupVaultEvents",params,undefined,true); 
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			copyArgs(n,"SNSTopicArn",params,undefined,false); 
			copyArgs(n,"BackupVaultEvents",params,undefined,true); 
			
			copyArgs(msg,"BackupVaultName",params,undefined,false); 
			copyArgs(msg,"SNSTopicArn",params,undefined,false); 
			copyArgs(msg,"BackupVaultEvents",params,undefined,true); 
			

			svc.putBackupVaultNotifications(params,cb);
		}
		
		service.StartBackupJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"IamRoleArn",params,undefined,false); 
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"IamRoleArn",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			copyArgs(n,"StartWindowMinutes",params,undefined,false); 
			copyArgs(n,"CompleteWindowMinutes",params,undefined,false); 
			copyArgs(n,"Lifecycle",params,undefined,true); 
			copyArgs(n,"RecoveryPointTags",params,undefined,true); 
			copyArgs(n,"BackupOptions",params,undefined,true); 
			
			copyArgs(msg,"BackupVaultName",params,undefined,false); 
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"IamRoleArn",params,undefined,false); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			copyArgs(msg,"StartWindowMinutes",params,undefined,false); 
			copyArgs(msg,"CompleteWindowMinutes",params,undefined,false); 
			copyArgs(msg,"Lifecycle",params,undefined,true); 
			copyArgs(msg,"RecoveryPointTags",params,undefined,true); 
			copyArgs(msg,"BackupOptions",params,undefined,true); 
			

			svc.startBackupJob(params,cb);
		}
		
		service.StartCopyJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RecoveryPointArn",params,undefined,false); 
			copyArgs(n,"SourceBackupVaultName",params,undefined,false); 
			copyArgs(n,"DestinationBackupVaultArn",params,undefined,false); 
			copyArgs(n,"IamRoleArn",params,undefined,false); 
			
			copyArgs(n,"RecoveryPointArn",params,undefined,false); 
			copyArgs(n,"SourceBackupVaultName",params,undefined,false); 
			copyArgs(n,"DestinationBackupVaultArn",params,undefined,false); 
			copyArgs(n,"IamRoleArn",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			copyArgs(n,"Lifecycle",params,undefined,true); 
			
			copyArgs(msg,"RecoveryPointArn",params,undefined,false); 
			copyArgs(msg,"SourceBackupVaultName",params,undefined,false); 
			copyArgs(msg,"DestinationBackupVaultArn",params,undefined,false); 
			copyArgs(msg,"IamRoleArn",params,undefined,false); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			copyArgs(msg,"Lifecycle",params,undefined,true); 
			

			svc.startCopyJob(params,cb);
		}
		
		service.StartReportJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReportPlanName",params,undefined,false); 
			
			copyArgs(n,"ReportPlanName",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(msg,"ReportPlanName",params,undefined,false); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.startReportJob(params,cb);
		}
		
		service.StartRestoreJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RecoveryPointArn",params,undefined,false); 
			copyArgs(n,"Metadata",params,undefined,true); 
			copyArgs(n,"IamRoleArn",params,undefined,false); 
			
			copyArgs(n,"RecoveryPointArn",params,undefined,false); 
			copyArgs(n,"Metadata",params,undefined,true); 
			copyArgs(n,"IamRoleArn",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			
			copyArgs(msg,"RecoveryPointArn",params,undefined,false); 
			copyArgs(msg,"Metadata",params,undefined,true); 
			copyArgs(msg,"IamRoleArn",params,undefined,false); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			copyArgs(msg,"ResourceType",params,undefined,false); 
			

			svc.startRestoreJob(params,cb);
		}
		
		service.StopBackupJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupJobId",params,undefined,false); 
			
			copyArgs(n,"BackupJobId",params,undefined,false); 
			
			copyArgs(msg,"BackupJobId",params,undefined,false); 
			

			svc.stopBackupJob(params,cb);
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
			copyArgs(n,"TagKeyList",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeyList",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeyList",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
		
		service.UpdateBackupPlan=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupPlanId",params,undefined,false); 
			copyArgs(n,"BackupPlan",params,undefined,true); 
			
			copyArgs(n,"BackupPlanId",params,undefined,false); 
			copyArgs(n,"BackupPlan",params,undefined,true); 
			
			copyArgs(msg,"BackupPlanId",params,undefined,false); 
			copyArgs(msg,"BackupPlan",params,undefined,true); 
			

			svc.updateBackupPlan(params,cb);
		}
		
		service.UpdateFramework=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FrameworkName",params,undefined,false); 
			
			copyArgs(n,"FrameworkName",params,undefined,false); 
			copyArgs(n,"FrameworkDescription",params,undefined,false); 
			copyArgs(n,"FrameworkControls",params,undefined,true); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(msg,"FrameworkName",params,undefined,false); 
			copyArgs(msg,"FrameworkDescription",params,undefined,false); 
			copyArgs(msg,"FrameworkControls",params,undefined,true); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.updateFramework(params,cb);
		}
		
		service.UpdateGlobalSettings=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"GlobalSettings",params,undefined,true); 
			
			copyArgs(msg,"GlobalSettings",params,undefined,true); 
			

			svc.updateGlobalSettings(params,cb);
		}
		
		service.UpdateRecoveryPointLifecycle=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			copyArgs(n,"RecoveryPointArn",params,undefined,false); 
			
			copyArgs(n,"BackupVaultName",params,undefined,false); 
			copyArgs(n,"RecoveryPointArn",params,undefined,false); 
			copyArgs(n,"Lifecycle",params,undefined,true); 
			
			copyArgs(msg,"BackupVaultName",params,undefined,false); 
			copyArgs(msg,"RecoveryPointArn",params,undefined,false); 
			copyArgs(msg,"Lifecycle",params,undefined,true); 
			

			svc.updateRecoveryPointLifecycle(params,cb);
		}
		
		service.UpdateRegionSettings=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ResourceTypeOptInPreference",params,undefined,true); 
			
			copyArgs(msg,"ResourceTypeOptInPreference",params,undefined,true); 
			

			svc.updateRegionSettings(params,cb);
		}
		
		service.UpdateReportPlan=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReportPlanName",params,undefined,false); 
			
			copyArgs(n,"ReportPlanName",params,undefined,false); 
			copyArgs(n,"ReportPlanDescription",params,undefined,false); 
			copyArgs(n,"ReportDeliveryChannel",params,undefined,true); 
			copyArgs(n,"ReportSetting",params,undefined,true); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(msg,"ReportPlanName",params,undefined,false); 
			copyArgs(msg,"ReportPlanDescription",params,undefined,false); 
			copyArgs(msg,"ReportDeliveryChannel",params,undefined,true); 
			copyArgs(msg,"ReportSetting",params,undefined,true); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.updateReportPlan(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS Backup", AmazonAPINode);

};
