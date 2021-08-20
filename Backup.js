
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

		var awsService = new AWS.Backup( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Backup(msg.AWSConfig) : awsService;

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

		
		service.CreateBackupPlan=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupPlan",params,undefined,true); 
			
			copyArg(msg,"BackupPlan",params,undefined,true); 
			copyArg(msg,"BackupPlanTags",params,undefined,true); 
			copyArg(msg,"CreatorRequestId",params,undefined,false); 
			

			svc.createBackupPlan(params,cb);
		}

		
		service.CreateBackupSelection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupPlanId",params,undefined,false); 
			copyArg(n,"BackupSelection",params,undefined,true); 
			
			copyArg(msg,"BackupPlanId",params,undefined,false); 
			copyArg(msg,"BackupSelection",params,undefined,true); 
			copyArg(msg,"CreatorRequestId",params,undefined,false); 
			

			svc.createBackupSelection(params,cb);
		}

		
		service.CreateBackupVault=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupVaultName",params,undefined,false); 
			
			copyArg(msg,"BackupVaultName",params,undefined,false); 
			copyArg(msg,"BackupVaultTags",params,undefined,true); 
			copyArg(msg,"EncryptionKeyArn",params,undefined,false); 
			copyArg(msg,"CreatorRequestId",params,undefined,false); 
			

			svc.createBackupVault(params,cb);
		}

		
		service.DeleteBackupPlan=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupPlanId",params,undefined,false); 
			
			copyArg(msg,"BackupPlanId",params,undefined,false); 
			

			svc.deleteBackupPlan(params,cb);
		}

		
		service.DeleteBackupSelection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupPlanId",params,undefined,false); 
			copyArg(n,"SelectionId",params,undefined,false); 
			
			copyArg(msg,"BackupPlanId",params,undefined,false); 
			copyArg(msg,"SelectionId",params,undefined,false); 
			

			svc.deleteBackupSelection(params,cb);
		}

		
		service.DeleteBackupVault=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupVaultName",params,undefined,false); 
			
			copyArg(msg,"BackupVaultName",params,undefined,false); 
			

			svc.deleteBackupVault(params,cb);
		}

		
		service.DeleteBackupVaultAccessPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupVaultName",params,undefined,false); 
			
			copyArg(msg,"BackupVaultName",params,undefined,false); 
			

			svc.deleteBackupVaultAccessPolicy(params,cb);
		}

		
		service.DeleteBackupVaultNotifications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupVaultName",params,undefined,false); 
			
			copyArg(msg,"BackupVaultName",params,undefined,false); 
			

			svc.deleteBackupVaultNotifications(params,cb);
		}

		
		service.DeleteRecoveryPoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupVaultName",params,undefined,false); 
			copyArg(n,"RecoveryPointArn",params,undefined,false); 
			
			copyArg(msg,"BackupVaultName",params,undefined,false); 
			copyArg(msg,"RecoveryPointArn",params,undefined,false); 
			

			svc.deleteRecoveryPoint(params,cb);
		}

		
		service.DescribeBackupJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupJobId",params,undefined,false); 
			
			copyArg(msg,"BackupJobId",params,undefined,false); 
			

			svc.describeBackupJob(params,cb);
		}

		
		service.DescribeBackupVault=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupVaultName",params,undefined,false); 
			
			copyArg(msg,"BackupVaultName",params,undefined,false); 
			

			svc.describeBackupVault(params,cb);
		}

		
		service.DescribeCopyJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CopyJobId",params,undefined,false); 
			
			copyArg(msg,"CopyJobId",params,undefined,false); 
			

			svc.describeCopyJob(params,cb);
		}

		
		service.DescribeGlobalSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeGlobalSettings(params,cb);
		}

		
		service.DescribeProtectedResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.describeProtectedResource(params,cb);
		}

		
		service.DescribeRecoveryPoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupVaultName",params,undefined,false); 
			copyArg(n,"RecoveryPointArn",params,undefined,false); 
			
			copyArg(msg,"BackupVaultName",params,undefined,false); 
			copyArg(msg,"RecoveryPointArn",params,undefined,false); 
			

			svc.describeRecoveryPoint(params,cb);
		}

		
		service.DescribeRegionSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeRegionSettings(params,cb);
		}

		
		service.DescribeRestoreJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RestoreJobId",params,undefined,false); 
			
			copyArg(msg,"RestoreJobId",params,undefined,false); 
			

			svc.describeRestoreJob(params,cb);
		}

		
		service.DisassociateRecoveryPoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupVaultName",params,undefined,false); 
			copyArg(n,"RecoveryPointArn",params,undefined,false); 
			
			copyArg(msg,"BackupVaultName",params,undefined,false); 
			copyArg(msg,"RecoveryPointArn",params,undefined,false); 
			

			svc.disassociateRecoveryPoint(params,cb);
		}

		
		service.ExportBackupPlanTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupPlanId",params,undefined,false); 
			
			copyArg(msg,"BackupPlanId",params,undefined,false); 
			

			svc.exportBackupPlanTemplate(params,cb);
		}

		
		service.GetBackupPlan=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupPlanId",params,undefined,false); 
			
			copyArg(msg,"BackupPlanId",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			

			svc.getBackupPlan(params,cb);
		}

		
		service.GetBackupPlanFromJSON=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupPlanTemplateJson",params,undefined,false); 
			
			copyArg(msg,"BackupPlanTemplateJson",params,undefined,false); 
			

			svc.getBackupPlanFromJSON(params,cb);
		}

		
		service.GetBackupPlanFromTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupPlanTemplateId",params,undefined,false); 
			
			copyArg(msg,"BackupPlanTemplateId",params,undefined,false); 
			

			svc.getBackupPlanFromTemplate(params,cb);
		}

		
		service.GetBackupSelection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupPlanId",params,undefined,false); 
			copyArg(n,"SelectionId",params,undefined,false); 
			
			copyArg(msg,"BackupPlanId",params,undefined,false); 
			copyArg(msg,"SelectionId",params,undefined,false); 
			

			svc.getBackupSelection(params,cb);
		}

		
		service.GetBackupVaultAccessPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupVaultName",params,undefined,false); 
			
			copyArg(msg,"BackupVaultName",params,undefined,false); 
			

			svc.getBackupVaultAccessPolicy(params,cb);
		}

		
		service.GetBackupVaultNotifications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupVaultName",params,undefined,false); 
			
			copyArg(msg,"BackupVaultName",params,undefined,false); 
			

			svc.getBackupVaultNotifications(params,cb);
		}

		
		service.GetRecoveryPointRestoreMetadata=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupVaultName",params,undefined,false); 
			copyArg(n,"RecoveryPointArn",params,undefined,false); 
			
			copyArg(msg,"BackupVaultName",params,undefined,false); 
			copyArg(msg,"RecoveryPointArn",params,undefined,false); 
			

			svc.getRecoveryPointRestoreMetadata(params,cb);
		}

		
		service.GetSupportedResourceTypes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getSupportedResourceTypes(params,cb);
		}

		
		service.ListBackupJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"ByResourceArn",params,undefined,false); 
			copyArg(msg,"ByState",params,undefined,false); 
			copyArg(msg,"ByBackupVaultName",params,undefined,false); 
			copyArg(msg,"ByCreatedBefore",params,undefined,false); 
			copyArg(msg,"ByCreatedAfter",params,undefined,false); 
			copyArg(msg,"ByResourceType",params,undefined,false); 
			copyArg(msg,"ByAccountId",params,undefined,false); 
			

			svc.listBackupJobs(params,cb);
		}

		
		service.ListBackupPlanTemplates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listBackupPlanTemplates(params,cb);
		}

		
		service.ListBackupPlanVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupPlanId",params,undefined,false); 
			
			copyArg(msg,"BackupPlanId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listBackupPlanVersions(params,cb);
		}

		
		service.ListBackupPlans=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"IncludeDeleted",params,undefined,false); 
			

			svc.listBackupPlans(params,cb);
		}

		
		service.ListBackupSelections=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupPlanId",params,undefined,false); 
			
			copyArg(msg,"BackupPlanId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listBackupSelections(params,cb);
		}

		
		service.ListBackupVaults=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listBackupVaults(params,cb);
		}

		
		service.ListCopyJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"ByResourceArn",params,undefined,false); 
			copyArg(msg,"ByState",params,undefined,false); 
			copyArg(msg,"ByCreatedBefore",params,undefined,false); 
			copyArg(msg,"ByCreatedAfter",params,undefined,false); 
			copyArg(msg,"ByResourceType",params,undefined,false); 
			copyArg(msg,"ByDestinationVaultArn",params,undefined,false); 
			copyArg(msg,"ByAccountId",params,undefined,false); 
			

			svc.listCopyJobs(params,cb);
		}

		
		service.ListProtectedResources=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listProtectedResources(params,cb);
		}

		
		service.ListRecoveryPointsByBackupVault=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupVaultName",params,undefined,false); 
			
			copyArg(msg,"BackupVaultName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"ByResourceArn",params,undefined,false); 
			copyArg(msg,"ByResourceType",params,undefined,false); 
			copyArg(msg,"ByBackupPlanId",params,undefined,false); 
			copyArg(msg,"ByCreatedBefore",params,undefined,false); 
			copyArg(msg,"ByCreatedAfter",params,undefined,false); 
			

			svc.listRecoveryPointsByBackupVault(params,cb);
		}

		
		service.ListRecoveryPointsByResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listRecoveryPointsByResource(params,cb);
		}

		
		service.ListRestoreJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"ByAccountId",params,undefined,false); 
			copyArg(msg,"ByCreatedBefore",params,undefined,false); 
			copyArg(msg,"ByCreatedAfter",params,undefined,false); 
			copyArg(msg,"ByStatus",params,undefined,false); 
			

			svc.listRestoreJobs(params,cb);
		}

		
		service.ListTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listTags(params,cb);
		}

		
		service.PutBackupVaultAccessPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupVaultName",params,undefined,false); 
			
			copyArg(msg,"BackupVaultName",params,undefined,false); 
			copyArg(msg,"Policy",params,undefined,false); 
			

			svc.putBackupVaultAccessPolicy(params,cb);
		}

		
		service.PutBackupVaultNotifications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupVaultName",params,undefined,false); 
			copyArg(n,"SNSTopicArn",params,undefined,false); 
			copyArg(n,"BackupVaultEvents",params,undefined,true); 
			
			copyArg(msg,"BackupVaultName",params,undefined,false); 
			copyArg(msg,"SNSTopicArn",params,undefined,false); 
			copyArg(msg,"BackupVaultEvents",params,undefined,true); 
			

			svc.putBackupVaultNotifications(params,cb);
		}

		
		service.StartBackupJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupVaultName",params,undefined,false); 
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"IamRoleArn",params,undefined,false); 
			
			copyArg(msg,"BackupVaultName",params,undefined,false); 
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"IamRoleArn",params,undefined,false); 
			copyArg(msg,"IdempotencyToken",params,undefined,false); 
			copyArg(msg,"StartWindowMinutes",params,undefined,false); 
			copyArg(msg,"CompleteWindowMinutes",params,undefined,false); 
			copyArg(msg,"Lifecycle",params,undefined,true); 
			copyArg(msg,"RecoveryPointTags",params,undefined,true); 
			copyArg(msg,"BackupOptions",params,undefined,true); 
			

			svc.startBackupJob(params,cb);
		}

		
		service.StartCopyJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RecoveryPointArn",params,undefined,false); 
			copyArg(n,"SourceBackupVaultName",params,undefined,false); 
			copyArg(n,"DestinationBackupVaultArn",params,undefined,false); 
			copyArg(n,"IamRoleArn",params,undefined,false); 
			
			copyArg(msg,"RecoveryPointArn",params,undefined,false); 
			copyArg(msg,"SourceBackupVaultName",params,undefined,false); 
			copyArg(msg,"DestinationBackupVaultArn",params,undefined,false); 
			copyArg(msg,"IamRoleArn",params,undefined,false); 
			copyArg(msg,"IdempotencyToken",params,undefined,false); 
			copyArg(msg,"Lifecycle",params,undefined,true); 
			

			svc.startCopyJob(params,cb);
		}

		
		service.StartRestoreJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RecoveryPointArn",params,undefined,false); 
			copyArg(n,"Metadata",params,undefined,true); 
			copyArg(n,"IamRoleArn",params,undefined,false); 
			
			copyArg(msg,"RecoveryPointArn",params,undefined,false); 
			copyArg(msg,"Metadata",params,undefined,true); 
			copyArg(msg,"IamRoleArn",params,undefined,false); 
			copyArg(msg,"IdempotencyToken",params,undefined,false); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			

			svc.startRestoreJob(params,cb);
		}

		
		service.StopBackupJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupJobId",params,undefined,false); 
			
			copyArg(msg,"BackupJobId",params,undefined,false); 
			

			svc.stopBackupJob(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"TagKeyList",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagKeyList",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateBackupPlan=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupPlanId",params,undefined,false); 
			copyArg(n,"BackupPlan",params,undefined,true); 
			
			copyArg(msg,"BackupPlanId",params,undefined,false); 
			copyArg(msg,"BackupPlan",params,undefined,true); 
			

			svc.updateBackupPlan(params,cb);
		}

		
		service.UpdateGlobalSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"GlobalSettings",params,undefined,true); 
			

			svc.updateGlobalSettings(params,cb);
		}

		
		service.UpdateRecoveryPointLifecycle=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupVaultName",params,undefined,false); 
			copyArg(n,"RecoveryPointArn",params,undefined,false); 
			
			copyArg(msg,"BackupVaultName",params,undefined,false); 
			copyArg(msg,"RecoveryPointArn",params,undefined,false); 
			copyArg(msg,"Lifecycle",params,undefined,true); 
			

			svc.updateRecoveryPointLifecycle(params,cb);
		}

		
		service.UpdateRegionSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ResourceTypeOptInPreference",params,undefined,true); 
			

			svc.updateRegionSettings(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Backup", AmazonAPINode);

};
