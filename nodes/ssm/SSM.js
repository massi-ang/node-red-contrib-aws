
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

		var awsService = new AWS.SSM( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.SSM(msg.AWSConfig) : awsService;

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
			
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceType",params,undefined,false); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.addTagsToResource(params,cb);
		}
		
		service.AssociateOpsItemRelatedItem=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OpsItemId",params,undefined,false); 
			copyArgs(n,"AssociationType",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"ResourceUri",params,undefined,false); 
			
			copyArgs(n,"OpsItemId",params,undefined,false); 
			copyArgs(n,"AssociationType",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"ResourceUri",params,undefined,false); 
			
			copyArgs(msg,"OpsItemId",params,undefined,false); 
			copyArgs(msg,"AssociationType",params,undefined,false); 
			copyArgs(msg,"ResourceType",params,undefined,false); 
			copyArgs(msg,"ResourceUri",params,undefined,false); 
			

			svc.associateOpsItemRelatedItem(params,cb);
		}
		
		service.CancelCommand=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CommandId",params,undefined,false); 
			
			copyArgs(n,"CommandId",params,undefined,false); 
			copyArgs(n,"InstanceIds",params,undefined,true); 
			
			copyArgs(msg,"CommandId",params,undefined,false); 
			copyArgs(msg,"InstanceIds",params,undefined,true); 
			

			svc.cancelCommand(params,cb);
		}
		
		service.CancelMaintenanceWindowExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WindowExecutionId",params,undefined,false); 
			
			copyArgs(n,"WindowExecutionId",params,undefined,false); 
			
			copyArgs(msg,"WindowExecutionId",params,undefined,false); 
			

			svc.cancelMaintenanceWindowExecution(params,cb);
		}
		
		service.CreateActivation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IamRole",params,undefined,false); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"DefaultInstanceName",params,undefined,false); 
			copyArgs(n,"IamRole",params,undefined,false); 
			copyArgs(Number(n),"RegistrationLimit",params,undefined,false); 
			copyArgs(n,"ExpirationDate",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DefaultInstanceName",params,undefined,false); 
			copyArgs(msg,"IamRole",params,undefined,false); 
			copyArgs(msg,"RegistrationLimit",params,undefined,false); 
			copyArgs(msg,"ExpirationDate",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createActivation(params,cb);
		}
		
		service.CreateAssociation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"DocumentVersion",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			copyArgs(n,"Targets",params,undefined,true); 
			copyArgs(n,"ScheduleExpression",params,undefined,false); 
			copyArgs(n,"OutputLocation",params,undefined,true); 
			copyArgs(n,"AssociationName",params,undefined,false); 
			copyArgs(n,"AutomationTargetParameterName",params,undefined,false); 
			copyArgs(n,"MaxErrors",params,undefined,false); 
			copyArgs(n,"MaxConcurrency",params,undefined,false); 
			copyArgs(n,"ComplianceSeverity",params,undefined,false); 
			copyArgs(n,"SyncCompliance",params,undefined,false); 
			copyArgs(Boolean(n),"ApplyOnlyAtCronInterval",params,undefined,false); 
			copyArgs(n,"CalendarNames",params,undefined,true); 
			copyArgs(n,"TargetLocations",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"DocumentVersion",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			copyArgs(msg,"Targets",params,undefined,true); 
			copyArgs(msg,"ScheduleExpression",params,undefined,false); 
			copyArgs(msg,"OutputLocation",params,undefined,true); 
			copyArgs(msg,"AssociationName",params,undefined,false); 
			copyArgs(msg,"AutomationTargetParameterName",params,undefined,false); 
			copyArgs(msg,"MaxErrors",params,undefined,false); 
			copyArgs(msg,"MaxConcurrency",params,undefined,false); 
			copyArgs(msg,"ComplianceSeverity",params,undefined,false); 
			copyArgs(msg,"SyncCompliance",params,undefined,false); 
			copyArgs(msg,"ApplyOnlyAtCronInterval",params,undefined,false); 
			copyArgs(msg,"CalendarNames",params,undefined,true); 
			copyArgs(msg,"TargetLocations",params,undefined,true); 
			

			svc.createAssociation(params,cb);
		}
		
		service.CreateAssociationBatch=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Entries",params,undefined,false); 
			
			copyArgs(n,"Entries",params,undefined,false); 
			
			copyArgs(msg,"Entries",params,undefined,false); 
			

			svc.createAssociationBatch(params,cb);
		}
		
		service.CreateDocument=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Content",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Content",params,undefined,false); 
			copyArgs(n,"Requires",params,undefined,true); 
			copyArgs(n,"Attachments",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"DisplayName",params,undefined,false); 
			copyArgs(n,"VersionName",params,undefined,false); 
			copyArgs(n,"DocumentType",params,undefined,false); 
			copyArgs(n,"DocumentFormat",params,undefined,false); 
			copyArgs(n,"TargetType",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Content",params,undefined,false); 
			copyArgs(msg,"Requires",params,undefined,true); 
			copyArgs(msg,"Attachments",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"DisplayName",params,undefined,false); 
			copyArgs(msg,"VersionName",params,undefined,false); 
			copyArgs(msg,"DocumentType",params,undefined,false); 
			copyArgs(msg,"DocumentFormat",params,undefined,false); 
			copyArgs(msg,"TargetType",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createDocument(params,cb);
		}
		
		service.CreateMaintenanceWindow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Schedule",params,undefined,false); 
			copyArgs(Number(n),"Duration",params,undefined,false); 
			copyArgs(Number(n),"Cutoff",params,undefined,false); 
			copyArgs(Boolean(n),"AllowUnassociatedTargets",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,true); 
			copyArgs(n,"StartDate",params,undefined,false); 
			copyArgs(n,"EndDate",params,undefined,false); 
			copyArgs(n,"Schedule",params,undefined,false); 
			copyArgs(n,"ScheduleTimezone",params,undefined,false); 
			copyArgs(Number(n),"ScheduleOffset",params,undefined,false); 
			copyArgs(Number(n),"Duration",params,undefined,false); 
			copyArgs(Number(n),"Cutoff",params,undefined,false); 
			copyArgs(Boolean(n),"AllowUnassociatedTargets",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,true); 
			copyArgs(msg,"StartDate",params,undefined,false); 
			copyArgs(msg,"EndDate",params,undefined,false); 
			copyArgs(msg,"Schedule",params,undefined,false); 
			copyArgs(msg,"ScheduleTimezone",params,undefined,false); 
			copyArgs(msg,"ScheduleOffset",params,undefined,false); 
			copyArgs(msg,"Duration",params,undefined,false); 
			copyArgs(msg,"Cutoff",params,undefined,false); 
			copyArgs(msg,"AllowUnassociatedTargets",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createMaintenanceWindow(params,cb);
		}
		
		service.CreateOpsItem=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Source",params,undefined,false); 
			copyArgs(n,"Title",params,undefined,false); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"OpsItemType",params,undefined,false); 
			copyArgs(n,"OperationalData",params,undefined,true); 
			copyArgs(n,"Notifications",params,undefined,true); 
			copyArgs(Number(n),"Priority",params,undefined,false); 
			copyArgs(n,"RelatedOpsItems",params,undefined,true); 
			copyArgs(n,"Source",params,undefined,false); 
			copyArgs(n,"Title",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"Category",params,undefined,false); 
			copyArgs(n,"Severity",params,undefined,false); 
			copyArgs(n,"ActualStartTime",params,undefined,false); 
			copyArgs(n,"ActualEndTime",params,undefined,false); 
			copyArgs(n,"PlannedStartTime",params,undefined,false); 
			copyArgs(n,"PlannedEndTime",params,undefined,false); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"OpsItemType",params,undefined,false); 
			copyArgs(msg,"OperationalData",params,undefined,true); 
			copyArgs(msg,"Notifications",params,undefined,true); 
			copyArgs(msg,"Priority",params,undefined,false); 
			copyArgs(msg,"RelatedOpsItems",params,undefined,true); 
			copyArgs(msg,"Source",params,undefined,false); 
			copyArgs(msg,"Title",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"Category",params,undefined,false); 
			copyArgs(msg,"Severity",params,undefined,false); 
			copyArgs(msg,"ActualStartTime",params,undefined,false); 
			copyArgs(msg,"ActualEndTime",params,undefined,false); 
			copyArgs(msg,"PlannedStartTime",params,undefined,false); 
			copyArgs(msg,"PlannedEndTime",params,undefined,false); 
			

			svc.createOpsItem(params,cb);
		}
		
		service.CreateOpsMetadata=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"Metadata",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"Metadata",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createOpsMetadata(params,cb);
		}
		
		service.CreatePatchBaseline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"OperatingSystem",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"GlobalFilters",params,undefined,true); 
			copyArgs(n,"ApprovalRules",params,undefined,true); 
			copyArgs(n,"ApprovedPatches",params,undefined,true); 
			copyArgs(n,"ApprovedPatchesComplianceLevel",params,undefined,false); 
			copyArgs(Boolean(n),"ApprovedPatchesEnableNonSecurity",params,undefined,false); 
			copyArgs(n,"RejectedPatches",params,undefined,true); 
			copyArgs(n,"RejectedPatchesAction",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Sources",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"OperatingSystem",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"GlobalFilters",params,undefined,true); 
			copyArgs(msg,"ApprovalRules",params,undefined,true); 
			copyArgs(msg,"ApprovedPatches",params,undefined,true); 
			copyArgs(msg,"ApprovedPatchesComplianceLevel",params,undefined,false); 
			copyArgs(msg,"ApprovedPatchesEnableNonSecurity",params,undefined,false); 
			copyArgs(msg,"RejectedPatches",params,undefined,true); 
			copyArgs(msg,"RejectedPatchesAction",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Sources",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createPatchBaseline(params,cb);
		}
		
		service.CreateResourceDataSync=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SyncName",params,undefined,false); 
			
			copyArgs(n,"SyncName",params,undefined,false); 
			copyArgs(n,"S3Destination",params,undefined,true); 
			copyArgs(n,"SyncType",params,undefined,false); 
			copyArgs(n,"SyncSource",params,undefined,true); 
			
			copyArgs(msg,"SyncName",params,undefined,false); 
			copyArgs(msg,"S3Destination",params,undefined,true); 
			copyArgs(msg,"SyncType",params,undefined,false); 
			copyArgs(msg,"SyncSource",params,undefined,true); 
			

			svc.createResourceDataSync(params,cb);
		}
		
		service.DeleteActivation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ActivationId",params,undefined,false); 
			
			copyArgs(n,"ActivationId",params,undefined,false); 
			
			copyArgs(msg,"ActivationId",params,undefined,false); 
			

			svc.deleteActivation(params,cb);
		}
		
		service.DeleteAssociation=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"AssociationId",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"AssociationId",params,undefined,false); 
			

			svc.deleteAssociation(params,cb);
		}
		
		service.DeleteDocument=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"DocumentVersion",params,undefined,false); 
			copyArgs(n,"VersionName",params,undefined,false); 
			copyArgs(Boolean(n),"Force",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"DocumentVersion",params,undefined,false); 
			copyArgs(msg,"VersionName",params,undefined,false); 
			copyArgs(msg,"Force",params,undefined,false); 
			

			svc.deleteDocument(params,cb);
		}
		
		service.DeleteInventory=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TypeName",params,undefined,false); 
			
			copyArgs(n,"TypeName",params,undefined,false); 
			copyArgs(n,"SchemaDeleteOption",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"TypeName",params,undefined,false); 
			copyArgs(msg,"SchemaDeleteOption",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.deleteInventory(params,cb);
		}
		
		service.DeleteMaintenanceWindow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WindowId",params,undefined,false); 
			
			copyArgs(n,"WindowId",params,undefined,false); 
			
			copyArgs(msg,"WindowId",params,undefined,false); 
			

			svc.deleteMaintenanceWindow(params,cb);
		}
		
		service.DeleteOpsMetadata=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OpsMetadataArn",params,undefined,false); 
			
			copyArgs(n,"OpsMetadataArn",params,undefined,false); 
			
			copyArgs(msg,"OpsMetadataArn",params,undefined,false); 
			

			svc.deleteOpsMetadata(params,cb);
		}
		
		service.DeleteParameter=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteParameter(params,cb);
		}
		
		service.DeleteParameters=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Names",params,undefined,true); 
			
			copyArgs(n,"Names",params,undefined,true); 
			
			copyArgs(msg,"Names",params,undefined,true); 
			

			svc.deleteParameters(params,cb);
		}
		
		service.DeletePatchBaseline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BaselineId",params,undefined,false); 
			
			copyArgs(n,"BaselineId",params,undefined,false); 
			
			copyArgs(msg,"BaselineId",params,undefined,false); 
			

			svc.deletePatchBaseline(params,cb);
		}
		
		service.DeleteResourceDataSync=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SyncName",params,undefined,false); 
			
			copyArgs(n,"SyncName",params,undefined,false); 
			copyArgs(n,"SyncType",params,undefined,false); 
			
			copyArgs(msg,"SyncName",params,undefined,false); 
			copyArgs(msg,"SyncType",params,undefined,false); 
			

			svc.deleteResourceDataSync(params,cb);
		}
		
		service.DeregisterManagedInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.deregisterManagedInstance(params,cb);
		}
		
		service.DeregisterPatchBaselineForPatchGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BaselineId",params,undefined,false); 
			copyArgs(n,"PatchGroup",params,undefined,false); 
			
			copyArgs(n,"BaselineId",params,undefined,false); 
			copyArgs(n,"PatchGroup",params,undefined,false); 
			
			copyArgs(msg,"BaselineId",params,undefined,false); 
			copyArgs(msg,"PatchGroup",params,undefined,false); 
			

			svc.deregisterPatchBaselineForPatchGroup(params,cb);
		}
		
		service.DeregisterTargetFromMaintenanceWindow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WindowId",params,undefined,false); 
			copyArgs(n,"WindowTargetId",params,undefined,false); 
			
			copyArgs(n,"WindowId",params,undefined,false); 
			copyArgs(n,"WindowTargetId",params,undefined,false); 
			copyArgs(Boolean(n),"Safe",params,undefined,false); 
			
			copyArgs(msg,"WindowId",params,undefined,false); 
			copyArgs(msg,"WindowTargetId",params,undefined,false); 
			copyArgs(msg,"Safe",params,undefined,false); 
			

			svc.deregisterTargetFromMaintenanceWindow(params,cb);
		}
		
		service.DeregisterTaskFromMaintenanceWindow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WindowId",params,undefined,false); 
			copyArgs(n,"WindowTaskId",params,undefined,false); 
			
			copyArgs(n,"WindowId",params,undefined,false); 
			copyArgs(n,"WindowTaskId",params,undefined,false); 
			
			copyArgs(msg,"WindowId",params,undefined,false); 
			copyArgs(msg,"WindowTaskId",params,undefined,false); 
			

			svc.deregisterTaskFromMaintenanceWindow(params,cb);
		}
		
		service.DescribeActivations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeActivations(params,cb);
		}
		
		service.DescribeAssociation=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"AssociationId",params,undefined,false); 
			copyArgs(n,"AssociationVersion",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"AssociationId",params,undefined,false); 
			copyArgs(msg,"AssociationVersion",params,undefined,false); 
			

			svc.describeAssociation(params,cb);
		}
		
		service.DescribeAssociationExecutionTargets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AssociationId",params,undefined,false); 
			copyArgs(n,"ExecutionId",params,undefined,false); 
			
			copyArgs(n,"AssociationId",params,undefined,false); 
			copyArgs(n,"ExecutionId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AssociationId",params,undefined,false); 
			copyArgs(msg,"ExecutionId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeAssociationExecutionTargets(params,cb);
		}
		
		service.DescribeAssociationExecutions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AssociationId",params,undefined,false); 
			
			copyArgs(n,"AssociationId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AssociationId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeAssociationExecutions(params,cb);
		}
		
		service.DescribeAutomationExecutions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeAutomationExecutions(params,cb);
		}
		
		service.DescribeAutomationStepExecutions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutomationExecutionId",params,undefined,false); 
			
			copyArgs(n,"AutomationExecutionId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(Boolean(n),"ReverseOrder",params,undefined,false); 
			
			copyArgs(msg,"AutomationExecutionId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"ReverseOrder",params,undefined,false); 
			

			svc.describeAutomationStepExecutions(params,cb);
		}
		
		service.DescribeAvailablePatches=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeAvailablePatches(params,cb);
		}
		
		service.DescribeDocument=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"DocumentVersion",params,undefined,false); 
			copyArgs(n,"VersionName",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"DocumentVersion",params,undefined,false); 
			copyArgs(msg,"VersionName",params,undefined,false); 
			

			svc.describeDocument(params,cb);
		}
		
		service.DescribeDocumentPermission=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"PermissionType",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"PermissionType",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"PermissionType",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeDocumentPermission(params,cb);
		}
		
		service.DescribeEffectiveInstanceAssociations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeEffectiveInstanceAssociations(params,cb);
		}
		
		service.DescribeEffectivePatchesForPatchBaseline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BaselineId",params,undefined,false); 
			
			copyArgs(n,"BaselineId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"BaselineId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeEffectivePatchesForPatchBaseline(params,cb);
		}
		
		service.DescribeInstanceAssociationsStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeInstanceAssociationsStatus(params,cb);
		}
		
		service.DescribeInstanceInformation=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"InstanceInformationFilterList",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"InstanceInformationFilterList",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeInstanceInformation(params,cb);
		}
		
		service.DescribeInstancePatchStates=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceIds",params,undefined,true); 
			
			copyArgs(n,"InstanceIds",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"InstanceIds",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeInstancePatchStates(params,cb);
		}
		
		service.DescribeInstancePatchStatesForPatchGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PatchGroup",params,undefined,false); 
			
			copyArgs(n,"PatchGroup",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"PatchGroup",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeInstancePatchStatesForPatchGroup(params,cb);
		}
		
		service.DescribeInstancePatches=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeInstancePatches(params,cb);
		}
		
		service.DescribeInventoryDeletions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DeletionId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"DeletionId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeInventoryDeletions(params,cb);
		}
		
		service.DescribeMaintenanceWindowExecutionTaskInvocations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WindowExecutionId",params,undefined,false); 
			copyArgs(n,"TaskId",params,undefined,false); 
			
			copyArgs(n,"WindowExecutionId",params,undefined,false); 
			copyArgs(n,"TaskId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"WindowExecutionId",params,undefined,false); 
			copyArgs(msg,"TaskId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeMaintenanceWindowExecutionTaskInvocations(params,cb);
		}
		
		service.DescribeMaintenanceWindowExecutionTasks=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WindowExecutionId",params,undefined,false); 
			
			copyArgs(n,"WindowExecutionId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"WindowExecutionId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeMaintenanceWindowExecutionTasks(params,cb);
		}
		
		service.DescribeMaintenanceWindowExecutions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WindowId",params,undefined,false); 
			
			copyArgs(n,"WindowId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"WindowId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeMaintenanceWindowExecutions(params,cb);
		}
		
		service.DescribeMaintenanceWindowSchedule=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"WindowId",params,undefined,false); 
			copyArgs(n,"Targets",params,undefined,true); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"WindowId",params,undefined,false); 
			copyArgs(msg,"Targets",params,undefined,true); 
			copyArgs(msg,"ResourceType",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeMaintenanceWindowSchedule(params,cb);
		}
		
		service.DescribeMaintenanceWindowTargets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WindowId",params,undefined,false); 
			
			copyArgs(n,"WindowId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"WindowId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeMaintenanceWindowTargets(params,cb);
		}
		
		service.DescribeMaintenanceWindowTasks=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WindowId",params,undefined,false); 
			
			copyArgs(n,"WindowId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"WindowId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeMaintenanceWindowTasks(params,cb);
		}
		
		service.DescribeMaintenanceWindows=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeMaintenanceWindows(params,cb);
		}
		
		service.DescribeMaintenanceWindowsForTarget=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Targets",params,undefined,true); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			
			copyArgs(n,"Targets",params,undefined,true); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Targets",params,undefined,true); 
			copyArgs(msg,"ResourceType",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeMaintenanceWindowsForTarget(params,cb);
		}
		
		service.DescribeOpsItems=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"OpsItemFilters",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"OpsItemFilters",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeOpsItems(params,cb);
		}
		
		service.DescribeParameters=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(n,"ParameterFilters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"ParameterFilters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeParameters(params,cb);
		}
		
		service.DescribePatchBaselines=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describePatchBaselines(params,cb);
		}
		
		service.DescribePatchGroupState=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PatchGroup",params,undefined,false); 
			
			copyArgs(n,"PatchGroup",params,undefined,false); 
			
			copyArgs(msg,"PatchGroup",params,undefined,false); 
			

			svc.describePatchGroupState(params,cb);
		}
		
		service.DescribePatchGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describePatchGroups(params,cb);
		}
		
		service.DescribePatchProperties=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OperatingSystem",params,undefined,false); 
			copyArgs(n,"Property",params,undefined,false); 
			
			copyArgs(n,"OperatingSystem",params,undefined,false); 
			copyArgs(n,"Property",params,undefined,false); 
			copyArgs(n,"PatchSet",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"OperatingSystem",params,undefined,false); 
			copyArgs(msg,"Property",params,undefined,false); 
			copyArgs(msg,"PatchSet",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describePatchProperties(params,cb);
		}
		
		service.DescribeSessions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"State",params,undefined,false); 
			
			copyArgs(n,"State",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			
			copyArgs(msg,"State",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			

			svc.describeSessions(params,cb);
		}
		
		service.DisassociateOpsItemRelatedItem=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OpsItemId",params,undefined,false); 
			copyArgs(n,"AssociationId",params,undefined,false); 
			
			copyArgs(n,"OpsItemId",params,undefined,false); 
			copyArgs(n,"AssociationId",params,undefined,false); 
			
			copyArgs(msg,"OpsItemId",params,undefined,false); 
			copyArgs(msg,"AssociationId",params,undefined,false); 
			

			svc.disassociateOpsItemRelatedItem(params,cb);
		}
		
		service.GetAutomationExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutomationExecutionId",params,undefined,false); 
			
			copyArgs(n,"AutomationExecutionId",params,undefined,false); 
			
			copyArgs(msg,"AutomationExecutionId",params,undefined,false); 
			

			svc.getAutomationExecution(params,cb);
		}
		
		service.GetCalendarState=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CalendarNames",params,undefined,true); 
			
			copyArgs(n,"CalendarNames",params,undefined,true); 
			copyArgs(n,"AtTime",params,undefined,false); 
			
			copyArgs(msg,"CalendarNames",params,undefined,true); 
			copyArgs(msg,"AtTime",params,undefined,false); 
			

			svc.getCalendarState(params,cb);
		}
		
		service.GetCommandInvocation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CommandId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"CommandId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"PluginName",params,undefined,false); 
			
			copyArgs(msg,"CommandId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"PluginName",params,undefined,false); 
			

			svc.getCommandInvocation(params,cb);
		}
		
		service.GetConnectionStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Target",params,undefined,false); 
			
			copyArgs(n,"Target",params,undefined,false); 
			
			copyArgs(msg,"Target",params,undefined,false); 
			

			svc.getConnectionStatus(params,cb);
		}
		
		service.GetDefaultPatchBaseline=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"OperatingSystem",params,undefined,false); 
			
			copyArgs(msg,"OperatingSystem",params,undefined,false); 
			

			svc.getDefaultPatchBaseline(params,cb);
		}
		
		service.GetDeployablePatchSnapshotForInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"SnapshotId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"SnapshotId",params,undefined,false); 
			copyArgs(n,"BaselineOverride",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"SnapshotId",params,undefined,false); 
			copyArgs(msg,"BaselineOverride",params,undefined,false); 
			

			svc.getDeployablePatchSnapshotForInstance(params,cb);
		}
		
		service.GetDocument=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"VersionName",params,undefined,false); 
			copyArgs(n,"DocumentVersion",params,undefined,false); 
			copyArgs(n,"DocumentFormat",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"VersionName",params,undefined,false); 
			copyArgs(msg,"DocumentVersion",params,undefined,false); 
			copyArgs(msg,"DocumentFormat",params,undefined,false); 
			

			svc.getDocument(params,cb);
		}
		
		service.GetInventory=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"Aggregators",params,undefined,true); 
			copyArgs(n,"ResultAttributes",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"Aggregators",params,undefined,true); 
			copyArgs(msg,"ResultAttributes",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.getInventory(params,cb);
		}
		
		service.GetInventorySchema=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TypeName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(Boolean(n),"Aggregator",params,undefined,false); 
			copyArgs(Boolean(n),"SubType",params,undefined,false); 
			
			copyArgs(msg,"TypeName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"Aggregator",params,undefined,false); 
			copyArgs(msg,"SubType",params,undefined,false); 
			

			svc.getInventorySchema(params,cb);
		}
		
		service.GetMaintenanceWindow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WindowId",params,undefined,false); 
			
			copyArgs(n,"WindowId",params,undefined,false); 
			
			copyArgs(msg,"WindowId",params,undefined,false); 
			

			svc.getMaintenanceWindow(params,cb);
		}
		
		service.GetMaintenanceWindowExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WindowExecutionId",params,undefined,false); 
			
			copyArgs(n,"WindowExecutionId",params,undefined,false); 
			
			copyArgs(msg,"WindowExecutionId",params,undefined,false); 
			

			svc.getMaintenanceWindowExecution(params,cb);
		}
		
		service.GetMaintenanceWindowExecutionTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WindowExecutionId",params,undefined,false); 
			copyArgs(n,"TaskId",params,undefined,false); 
			
			copyArgs(n,"WindowExecutionId",params,undefined,false); 
			copyArgs(n,"TaskId",params,undefined,false); 
			
			copyArgs(msg,"WindowExecutionId",params,undefined,false); 
			copyArgs(msg,"TaskId",params,undefined,false); 
			

			svc.getMaintenanceWindowExecutionTask(params,cb);
		}
		
		service.GetMaintenanceWindowExecutionTaskInvocation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WindowExecutionId",params,undefined,false); 
			copyArgs(n,"TaskId",params,undefined,false); 
			copyArgs(n,"InvocationId",params,undefined,false); 
			
			copyArgs(n,"WindowExecutionId",params,undefined,false); 
			copyArgs(n,"TaskId",params,undefined,false); 
			copyArgs(n,"InvocationId",params,undefined,false); 
			
			copyArgs(msg,"WindowExecutionId",params,undefined,false); 
			copyArgs(msg,"TaskId",params,undefined,false); 
			copyArgs(msg,"InvocationId",params,undefined,false); 
			

			svc.getMaintenanceWindowExecutionTaskInvocation(params,cb);
		}
		
		service.GetMaintenanceWindowTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WindowId",params,undefined,false); 
			copyArgs(n,"WindowTaskId",params,undefined,false); 
			
			copyArgs(n,"WindowId",params,undefined,false); 
			copyArgs(n,"WindowTaskId",params,undefined,false); 
			
			copyArgs(msg,"WindowId",params,undefined,false); 
			copyArgs(msg,"WindowTaskId",params,undefined,false); 
			

			svc.getMaintenanceWindowTask(params,cb);
		}
		
		service.GetOpsItem=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OpsItemId",params,undefined,false); 
			
			copyArgs(n,"OpsItemId",params,undefined,false); 
			
			copyArgs(msg,"OpsItemId",params,undefined,false); 
			

			svc.getOpsItem(params,cb);
		}
		
		service.GetOpsMetadata=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OpsMetadataArn",params,undefined,false); 
			
			copyArgs(n,"OpsMetadataArn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"OpsMetadataArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getOpsMetadata(params,cb);
		}
		
		service.GetOpsSummary=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SyncName",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"Aggregators",params,undefined,true); 
			copyArgs(n,"ResultAttributes",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"SyncName",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"Aggregators",params,undefined,true); 
			copyArgs(msg,"ResultAttributes",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.getOpsSummary(params,cb);
		}
		
		service.GetParameter=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(Boolean(n),"WithDecryption",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"WithDecryption",params,undefined,false); 
			

			svc.getParameter(params,cb);
		}
		
		service.GetParameterHistory=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(Boolean(n),"WithDecryption",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"WithDecryption",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getParameterHistory(params,cb);
		}
		
		service.GetParameters=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Names",params,undefined,true); 
			
			copyArgs(n,"Names",params,undefined,true); 
			copyArgs(Boolean(n),"WithDecryption",params,undefined,false); 
			
			copyArgs(msg,"Names",params,undefined,true); 
			copyArgs(msg,"WithDecryption",params,undefined,false); 
			

			svc.getParameters(params,cb);
		}
		
		service.GetParametersByPath=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Path",params,undefined,false); 
			
			copyArgs(n,"Path",params,undefined,false); 
			copyArgs(Boolean(n),"Recursive",params,undefined,false); 
			copyArgs(n,"ParameterFilters",params,undefined,true); 
			copyArgs(Boolean(n),"WithDecryption",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Path",params,undefined,false); 
			copyArgs(msg,"Recursive",params,undefined,false); 
			copyArgs(msg,"ParameterFilters",params,undefined,true); 
			copyArgs(msg,"WithDecryption",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getParametersByPath(params,cb);
		}
		
		service.GetPatchBaseline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BaselineId",params,undefined,false); 
			
			copyArgs(n,"BaselineId",params,undefined,false); 
			
			copyArgs(msg,"BaselineId",params,undefined,false); 
			

			svc.getPatchBaseline(params,cb);
		}
		
		service.GetPatchBaselineForPatchGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PatchGroup",params,undefined,false); 
			
			copyArgs(n,"PatchGroup",params,undefined,false); 
			copyArgs(n,"OperatingSystem",params,undefined,false); 
			
			copyArgs(msg,"PatchGroup",params,undefined,false); 
			copyArgs(msg,"OperatingSystem",params,undefined,false); 
			

			svc.getPatchBaselineForPatchGroup(params,cb);
		}
		
		service.GetServiceSetting=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SettingId",params,undefined,false); 
			
			copyArgs(n,"SettingId",params,undefined,false); 
			
			copyArgs(msg,"SettingId",params,undefined,false); 
			

			svc.getServiceSetting(params,cb);
		}
		
		service.LabelParameterVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Labels",params,undefined,true); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ParameterVersion",params,undefined,false); 
			copyArgs(n,"Labels",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ParameterVersion",params,undefined,false); 
			copyArgs(msg,"Labels",params,undefined,true); 
			

			svc.labelParameterVersion(params,cb);
		}
		
		service.ListAssociationVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AssociationId",params,undefined,false); 
			
			copyArgs(n,"AssociationId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AssociationId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listAssociationVersions(params,cb);
		}
		
		service.ListAssociations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AssociationFilterList",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AssociationFilterList",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listAssociations(params,cb);
		}
		
		service.ListCommandInvocations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CommandId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Boolean(n),"Details",params,undefined,false); 
			
			copyArgs(msg,"CommandId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"Details",params,undefined,false); 
			

			svc.listCommandInvocations(params,cb);
		}
		
		service.ListCommands=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CommandId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			
			copyArgs(msg,"CommandId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			

			svc.listCommands(params,cb);
		}
		
		service.ListComplianceItems=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"ResourceIds",params,undefined,false); 
			copyArgs(n,"ResourceTypes",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"ResourceIds",params,undefined,false); 
			copyArgs(msg,"ResourceTypes",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listComplianceItems(params,cb);
		}
		
		service.ListComplianceSummaries=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listComplianceSummaries(params,cb);
		}
		
		service.ListDocumentMetadataHistory=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Metadata",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"DocumentVersion",params,undefined,false); 
			copyArgs(n,"Metadata",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"DocumentVersion",params,undefined,false); 
			copyArgs(msg,"Metadata",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listDocumentMetadataHistory(params,cb);
		}
		
		service.ListDocumentVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listDocumentVersions(params,cb);
		}
		
		service.ListDocuments=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DocumentFilterList",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DocumentFilterList",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listDocuments(params,cb);
		}
		
		service.ListInventoryEntries=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"TypeName",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"TypeName",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"TypeName",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listInventoryEntries(params,cb);
		}
		
		service.ListOpsItemEvents=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listOpsItemEvents(params,cb);
		}
		
		service.ListOpsItemRelatedItems=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"OpsItemId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"OpsItemId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listOpsItemRelatedItems(params,cb);
		}
		
		service.ListOpsMetadata=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listOpsMetadata(params,cb);
		}
		
		service.ListResourceComplianceSummaries=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listResourceComplianceSummaries(params,cb);
		}
		
		service.ListResourceDataSync=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SyncType",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"SyncType",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listResourceDataSync(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(msg,"ResourceType",params,undefined,false); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.ModifyDocumentPermission=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"PermissionType",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"PermissionType",params,undefined,false); 
			copyArgs(n,"AccountIdsToAdd",params,undefined,true); 
			copyArgs(n,"AccountIdsToRemove",params,undefined,true); 
			copyArgs(n,"SharedDocumentVersion",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"PermissionType",params,undefined,false); 
			copyArgs(msg,"AccountIdsToAdd",params,undefined,true); 
			copyArgs(msg,"AccountIdsToRemove",params,undefined,true); 
			copyArgs(msg,"SharedDocumentVersion",params,undefined,false); 
			

			svc.modifyDocumentPermission(params,cb);
		}
		
		service.PutComplianceItems=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"ComplianceType",params,undefined,false); 
			copyArgs(n,"ExecutionSummary",params,undefined,true); 
			copyArgs(n,"Items",params,undefined,false); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"ComplianceType",params,undefined,false); 
			copyArgs(n,"ExecutionSummary",params,undefined,true); 
			copyArgs(n,"Items",params,undefined,false); 
			copyArgs(n,"ItemContentHash",params,undefined,false); 
			copyArgs(n,"UploadType",params,undefined,false); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"ResourceType",params,undefined,false); 
			copyArgs(msg,"ComplianceType",params,undefined,false); 
			copyArgs(msg,"ExecutionSummary",params,undefined,true); 
			copyArgs(msg,"Items",params,undefined,false); 
			copyArgs(msg,"ItemContentHash",params,undefined,false); 
			copyArgs(msg,"UploadType",params,undefined,false); 
			

			svc.putComplianceItems(params,cb);
		}
		
		service.PutInventory=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Items",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Items",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"Items",params,undefined,false); 
			

			svc.putInventory(params,cb);
		}
		
		service.PutParameter=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Value",params,undefined,true); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Value",params,undefined,true); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(Boolean(n),"Overwrite",params,undefined,false); 
			copyArgs(n,"AllowedPattern",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"Tier",params,undefined,false); 
			copyArgs(n,"Policies",params,undefined,false); 
			copyArgs(n,"DataType",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Value",params,undefined,true); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"Overwrite",params,undefined,false); 
			copyArgs(msg,"AllowedPattern",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"Tier",params,undefined,false); 
			copyArgs(msg,"Policies",params,undefined,false); 
			copyArgs(msg,"DataType",params,undefined,false); 
			

			svc.putParameter(params,cb);
		}
		
		service.RegisterDefaultPatchBaseline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BaselineId",params,undefined,false); 
			
			copyArgs(n,"BaselineId",params,undefined,false); 
			
			copyArgs(msg,"BaselineId",params,undefined,false); 
			

			svc.registerDefaultPatchBaseline(params,cb);
		}
		
		service.RegisterPatchBaselineForPatchGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BaselineId",params,undefined,false); 
			copyArgs(n,"PatchGroup",params,undefined,false); 
			
			copyArgs(n,"BaselineId",params,undefined,false); 
			copyArgs(n,"PatchGroup",params,undefined,false); 
			
			copyArgs(msg,"BaselineId",params,undefined,false); 
			copyArgs(msg,"PatchGroup",params,undefined,false); 
			

			svc.registerPatchBaselineForPatchGroup(params,cb);
		}
		
		service.RegisterTargetWithMaintenanceWindow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WindowId",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"Targets",params,undefined,true); 
			
			copyArgs(n,"WindowId",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"Targets",params,undefined,true); 
			copyArgs(n,"OwnerInformation",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"WindowId",params,undefined,false); 
			copyArgs(msg,"ResourceType",params,undefined,false); 
			copyArgs(msg,"Targets",params,undefined,true); 
			copyArgs(msg,"OwnerInformation",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.registerTargetWithMaintenanceWindow(params,cb);
		}
		
		service.RegisterTaskWithMaintenanceWindow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WindowId",params,undefined,false); 
			copyArgs(n,"TaskArn",params,undefined,false); 
			copyArgs(n,"TaskType",params,undefined,false); 
			
			copyArgs(n,"WindowId",params,undefined,false); 
			copyArgs(n,"Targets",params,undefined,true); 
			copyArgs(n,"TaskArn",params,undefined,false); 
			copyArgs(n,"ServiceRoleArn",params,undefined,false); 
			copyArgs(n,"TaskType",params,undefined,false); 
			copyArgs(n,"TaskParameters",params,undefined,true); 
			copyArgs(n,"TaskInvocationParameters",params,undefined,true); 
			copyArgs(Number(n),"Priority",params,undefined,false); 
			copyArgs(n,"MaxConcurrency",params,undefined,false); 
			copyArgs(n,"MaxErrors",params,undefined,false); 
			copyArgs(n,"LoggingInfo",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"WindowId",params,undefined,false); 
			copyArgs(msg,"Targets",params,undefined,true); 
			copyArgs(msg,"TaskArn",params,undefined,false); 
			copyArgs(msg,"ServiceRoleArn",params,undefined,false); 
			copyArgs(msg,"TaskType",params,undefined,false); 
			copyArgs(msg,"TaskParameters",params,undefined,true); 
			copyArgs(msg,"TaskInvocationParameters",params,undefined,true); 
			copyArgs(msg,"Priority",params,undefined,false); 
			copyArgs(msg,"MaxConcurrency",params,undefined,false); 
			copyArgs(msg,"MaxErrors",params,undefined,false); 
			copyArgs(msg,"LoggingInfo",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.registerTaskWithMaintenanceWindow(params,cb);
		}
		
		service.RemoveTagsFromResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceType",params,undefined,false); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.removeTagsFromResource(params,cb);
		}
		
		service.ResetServiceSetting=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SettingId",params,undefined,false); 
			
			copyArgs(n,"SettingId",params,undefined,false); 
			
			copyArgs(msg,"SettingId",params,undefined,false); 
			

			svc.resetServiceSetting(params,cb);
		}
		
		service.ResumeSession=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SessionId",params,undefined,false); 
			
			copyArgs(n,"SessionId",params,undefined,false); 
			
			copyArgs(msg,"SessionId",params,undefined,false); 
			

			svc.resumeSession(params,cb);
		}
		
		service.SendAutomationSignal=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutomationExecutionId",params,undefined,false); 
			copyArgs(n,"SignalType",params,undefined,false); 
			
			copyArgs(n,"AutomationExecutionId",params,undefined,false); 
			copyArgs(n,"SignalType",params,undefined,false); 
			copyArgs(n,"Payload",params,undefined,true); 
			
			copyArgs(msg,"AutomationExecutionId",params,undefined,false); 
			copyArgs(msg,"SignalType",params,undefined,false); 
			copyArgs(msg,"Payload",params,undefined,true); 
			

			svc.sendAutomationSignal(params,cb);
		}
		
		service.SendCommand=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DocumentName",params,undefined,false); 
			
			copyArgs(n,"InstanceIds",params,undefined,true); 
			copyArgs(n,"Targets",params,undefined,true); 
			copyArgs(n,"DocumentName",params,undefined,false); 
			copyArgs(n,"DocumentVersion",params,undefined,false); 
			copyArgs(n,"DocumentHash",params,undefined,false); 
			copyArgs(n,"DocumentHashType",params,undefined,false); 
			copyArgs(Number(n),"TimeoutSeconds",params,undefined,false); 
			copyArgs(n,"Comment",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			copyArgs(n,"OutputS3Region",params,undefined,false); 
			copyArgs(n,"OutputS3BucketName",params,undefined,false); 
			copyArgs(n,"OutputS3KeyPrefix",params,undefined,false); 
			copyArgs(n,"MaxConcurrency",params,undefined,false); 
			copyArgs(n,"MaxErrors",params,undefined,false); 
			copyArgs(n,"ServiceRoleArn",params,undefined,false); 
			copyArgs(n,"NotificationConfig",params,undefined,true); 
			copyArgs(n,"CloudWatchOutputConfig",params,undefined,true); 
			
			copyArgs(msg,"InstanceIds",params,undefined,true); 
			copyArgs(msg,"Targets",params,undefined,true); 
			copyArgs(msg,"DocumentName",params,undefined,false); 
			copyArgs(msg,"DocumentVersion",params,undefined,false); 
			copyArgs(msg,"DocumentHash",params,undefined,false); 
			copyArgs(msg,"DocumentHashType",params,undefined,false); 
			copyArgs(msg,"TimeoutSeconds",params,undefined,false); 
			copyArgs(msg,"Comment",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			copyArgs(msg,"OutputS3Region",params,undefined,false); 
			copyArgs(msg,"OutputS3BucketName",params,undefined,false); 
			copyArgs(msg,"OutputS3KeyPrefix",params,undefined,false); 
			copyArgs(msg,"MaxConcurrency",params,undefined,false); 
			copyArgs(msg,"MaxErrors",params,undefined,false); 
			copyArgs(msg,"ServiceRoleArn",params,undefined,false); 
			copyArgs(msg,"NotificationConfig",params,undefined,true); 
			copyArgs(msg,"CloudWatchOutputConfig",params,undefined,true); 
			

			svc.sendCommand(params,cb);
		}
		
		service.StartAssociationsOnce=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AssociationIds",params,undefined,false); 
			
			copyArgs(n,"AssociationIds",params,undefined,false); 
			
			copyArgs(msg,"AssociationIds",params,undefined,false); 
			

			svc.startAssociationsOnce(params,cb);
		}
		
		service.StartAutomationExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DocumentName",params,undefined,false); 
			
			copyArgs(n,"DocumentName",params,undefined,false); 
			copyArgs(n,"DocumentVersion",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Mode",params,undefined,false); 
			copyArgs(n,"TargetParameterName",params,undefined,false); 
			copyArgs(n,"Targets",params,undefined,true); 
			copyArgs(n,"TargetMaps",params,undefined,true); 
			copyArgs(n,"MaxConcurrency",params,undefined,false); 
			copyArgs(n,"MaxErrors",params,undefined,false); 
			copyArgs(n,"TargetLocations",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DocumentName",params,undefined,false); 
			copyArgs(msg,"DocumentVersion",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"Mode",params,undefined,false); 
			copyArgs(msg,"TargetParameterName",params,undefined,false); 
			copyArgs(msg,"Targets",params,undefined,true); 
			copyArgs(msg,"TargetMaps",params,undefined,true); 
			copyArgs(msg,"MaxConcurrency",params,undefined,false); 
			copyArgs(msg,"MaxErrors",params,undefined,false); 
			copyArgs(msg,"TargetLocations",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.startAutomationExecution(params,cb);
		}
		
		service.StartChangeRequestExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DocumentName",params,undefined,false); 
			copyArgs(n,"Runbooks",params,undefined,true); 
			
			copyArgs(n,"ScheduledTime",params,undefined,false); 
			copyArgs(n,"DocumentName",params,undefined,false); 
			copyArgs(n,"DocumentVersion",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			copyArgs(n,"ChangeRequestName",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Runbooks",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"ScheduledEndTime",params,undefined,false); 
			copyArgs(n,"ChangeDetails",params,undefined,false); 
			
			copyArgs(msg,"ScheduledTime",params,undefined,false); 
			copyArgs(msg,"DocumentName",params,undefined,false); 
			copyArgs(msg,"DocumentVersion",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			copyArgs(msg,"ChangeRequestName",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"Runbooks",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"ScheduledEndTime",params,undefined,false); 
			copyArgs(msg,"ChangeDetails",params,undefined,false); 
			

			svc.startChangeRequestExecution(params,cb);
		}
		
		service.StartSession=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Target",params,undefined,false); 
			
			copyArgs(n,"Target",params,undefined,false); 
			copyArgs(n,"DocumentName",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,false); 
			
			copyArgs(msg,"Target",params,undefined,false); 
			copyArgs(msg,"DocumentName",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,false); 
			

			svc.startSession(params,cb);
		}
		
		service.StopAutomationExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutomationExecutionId",params,undefined,false); 
			
			copyArgs(n,"AutomationExecutionId",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(msg,"AutomationExecutionId",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			

			svc.stopAutomationExecution(params,cb);
		}
		
		service.TerminateSession=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SessionId",params,undefined,false); 
			
			copyArgs(n,"SessionId",params,undefined,false); 
			
			copyArgs(msg,"SessionId",params,undefined,false); 
			

			svc.terminateSession(params,cb);
		}
		
		service.UnlabelParameterVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ParameterVersion",params,undefined,false); 
			copyArgs(n,"Labels",params,undefined,true); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ParameterVersion",params,undefined,false); 
			copyArgs(n,"Labels",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ParameterVersion",params,undefined,false); 
			copyArgs(msg,"Labels",params,undefined,true); 
			

			svc.unlabelParameterVersion(params,cb);
		}
		
		service.UpdateAssociation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AssociationId",params,undefined,false); 
			
			copyArgs(n,"AssociationId",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			copyArgs(n,"DocumentVersion",params,undefined,false); 
			copyArgs(n,"ScheduleExpression",params,undefined,false); 
			copyArgs(n,"OutputLocation",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Targets",params,undefined,true); 
			copyArgs(n,"AssociationName",params,undefined,false); 
			copyArgs(n,"AssociationVersion",params,undefined,false); 
			copyArgs(n,"AutomationTargetParameterName",params,undefined,false); 
			copyArgs(n,"MaxErrors",params,undefined,false); 
			copyArgs(n,"MaxConcurrency",params,undefined,false); 
			copyArgs(n,"ComplianceSeverity",params,undefined,false); 
			copyArgs(n,"SyncCompliance",params,undefined,false); 
			copyArgs(Boolean(n),"ApplyOnlyAtCronInterval",params,undefined,false); 
			copyArgs(n,"CalendarNames",params,undefined,true); 
			copyArgs(n,"TargetLocations",params,undefined,true); 
			
			copyArgs(msg,"AssociationId",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			copyArgs(msg,"DocumentVersion",params,undefined,false); 
			copyArgs(msg,"ScheduleExpression",params,undefined,false); 
			copyArgs(msg,"OutputLocation",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Targets",params,undefined,true); 
			copyArgs(msg,"AssociationName",params,undefined,false); 
			copyArgs(msg,"AssociationVersion",params,undefined,false); 
			copyArgs(msg,"AutomationTargetParameterName",params,undefined,false); 
			copyArgs(msg,"MaxErrors",params,undefined,false); 
			copyArgs(msg,"MaxConcurrency",params,undefined,false); 
			copyArgs(msg,"ComplianceSeverity",params,undefined,false); 
			copyArgs(msg,"SyncCompliance",params,undefined,false); 
			copyArgs(msg,"ApplyOnlyAtCronInterval",params,undefined,false); 
			copyArgs(msg,"CalendarNames",params,undefined,true); 
			copyArgs(msg,"TargetLocations",params,undefined,true); 
			

			svc.updateAssociation(params,cb);
		}
		
		service.UpdateAssociationStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"AssociationStatus",params,undefined,true); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"AssociationStatus",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"AssociationStatus",params,undefined,true); 
			

			svc.updateAssociationStatus(params,cb);
		}
		
		service.UpdateDocument=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Content",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Content",params,undefined,false); 
			copyArgs(n,"Attachments",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"DisplayName",params,undefined,false); 
			copyArgs(n,"VersionName",params,undefined,false); 
			copyArgs(n,"DocumentVersion",params,undefined,false); 
			copyArgs(n,"DocumentFormat",params,undefined,false); 
			copyArgs(n,"TargetType",params,undefined,false); 
			
			copyArgs(msg,"Content",params,undefined,false); 
			copyArgs(msg,"Attachments",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"DisplayName",params,undefined,false); 
			copyArgs(msg,"VersionName",params,undefined,false); 
			copyArgs(msg,"DocumentVersion",params,undefined,false); 
			copyArgs(msg,"DocumentFormat",params,undefined,false); 
			copyArgs(msg,"TargetType",params,undefined,false); 
			

			svc.updateDocument(params,cb);
		}
		
		service.UpdateDocumentDefaultVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"DocumentVersion",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"DocumentVersion",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"DocumentVersion",params,undefined,false); 
			

			svc.updateDocumentDefaultVersion(params,cb);
		}
		
		service.UpdateDocumentMetadata=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"DocumentReviews",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"DocumentVersion",params,undefined,false); 
			copyArgs(n,"DocumentReviews",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"DocumentVersion",params,undefined,false); 
			copyArgs(msg,"DocumentReviews",params,undefined,false); 
			

			svc.updateDocumentMetadata(params,cb);
		}
		
		service.UpdateMaintenanceWindow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WindowId",params,undefined,false); 
			
			copyArgs(n,"WindowId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,true); 
			copyArgs(n,"StartDate",params,undefined,false); 
			copyArgs(n,"EndDate",params,undefined,false); 
			copyArgs(n,"Schedule",params,undefined,false); 
			copyArgs(n,"ScheduleTimezone",params,undefined,false); 
			copyArgs(Number(n),"ScheduleOffset",params,undefined,false); 
			copyArgs(Number(n),"Duration",params,undefined,false); 
			copyArgs(Number(n),"Cutoff",params,undefined,false); 
			copyArgs(Boolean(n),"AllowUnassociatedTargets",params,undefined,false); 
			copyArgs(Boolean(n),"Enabled",params,undefined,false); 
			copyArgs(Boolean(n),"Replace",params,undefined,false); 
			
			copyArgs(msg,"WindowId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,true); 
			copyArgs(msg,"StartDate",params,undefined,false); 
			copyArgs(msg,"EndDate",params,undefined,false); 
			copyArgs(msg,"Schedule",params,undefined,false); 
			copyArgs(msg,"ScheduleTimezone",params,undefined,false); 
			copyArgs(msg,"ScheduleOffset",params,undefined,false); 
			copyArgs(msg,"Duration",params,undefined,false); 
			copyArgs(msg,"Cutoff",params,undefined,false); 
			copyArgs(msg,"AllowUnassociatedTargets",params,undefined,false); 
			copyArgs(msg,"Enabled",params,undefined,false); 
			copyArgs(msg,"Replace",params,undefined,false); 
			

			svc.updateMaintenanceWindow(params,cb);
		}
		
		service.UpdateMaintenanceWindowTarget=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WindowId",params,undefined,false); 
			copyArgs(n,"WindowTargetId",params,undefined,false); 
			
			copyArgs(n,"WindowId",params,undefined,false); 
			copyArgs(n,"WindowTargetId",params,undefined,false); 
			copyArgs(n,"Targets",params,undefined,true); 
			copyArgs(n,"OwnerInformation",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,true); 
			copyArgs(Boolean(n),"Replace",params,undefined,false); 
			
			copyArgs(msg,"WindowId",params,undefined,false); 
			copyArgs(msg,"WindowTargetId",params,undefined,false); 
			copyArgs(msg,"Targets",params,undefined,true); 
			copyArgs(msg,"OwnerInformation",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,true); 
			copyArgs(msg,"Replace",params,undefined,false); 
			

			svc.updateMaintenanceWindowTarget(params,cb);
		}
		
		service.UpdateMaintenanceWindowTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WindowId",params,undefined,false); 
			copyArgs(n,"WindowTaskId",params,undefined,false); 
			
			copyArgs(n,"WindowId",params,undefined,false); 
			copyArgs(n,"WindowTaskId",params,undefined,false); 
			copyArgs(n,"Targets",params,undefined,true); 
			copyArgs(n,"TaskArn",params,undefined,false); 
			copyArgs(n,"ServiceRoleArn",params,undefined,false); 
			copyArgs(n,"TaskParameters",params,undefined,true); 
			copyArgs(n,"TaskInvocationParameters",params,undefined,true); 
			copyArgs(Number(n),"Priority",params,undefined,false); 
			copyArgs(n,"MaxConcurrency",params,undefined,false); 
			copyArgs(n,"MaxErrors",params,undefined,false); 
			copyArgs(n,"LoggingInfo",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,true); 
			copyArgs(Boolean(n),"Replace",params,undefined,false); 
			
			copyArgs(msg,"WindowId",params,undefined,false); 
			copyArgs(msg,"WindowTaskId",params,undefined,false); 
			copyArgs(msg,"Targets",params,undefined,true); 
			copyArgs(msg,"TaskArn",params,undefined,false); 
			copyArgs(msg,"ServiceRoleArn",params,undefined,false); 
			copyArgs(msg,"TaskParameters",params,undefined,true); 
			copyArgs(msg,"TaskInvocationParameters",params,undefined,true); 
			copyArgs(msg,"Priority",params,undefined,false); 
			copyArgs(msg,"MaxConcurrency",params,undefined,false); 
			copyArgs(msg,"MaxErrors",params,undefined,false); 
			copyArgs(msg,"LoggingInfo",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,true); 
			copyArgs(msg,"Replace",params,undefined,false); 
			

			svc.updateMaintenanceWindowTask(params,cb);
		}
		
		service.UpdateManagedInstanceRole=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"IamRole",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"IamRole",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"IamRole",params,undefined,false); 
			

			svc.updateManagedInstanceRole(params,cb);
		}
		
		service.UpdateOpsItem=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OpsItemId",params,undefined,false); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"OperationalData",params,undefined,true); 
			copyArgs(n,"OperationalDataToDelete",params,undefined,false); 
			copyArgs(n,"Notifications",params,undefined,true); 
			copyArgs(Number(n),"Priority",params,undefined,false); 
			copyArgs(n,"RelatedOpsItems",params,undefined,true); 
			copyArgs(n,"Status",params,undefined,false); 
			copyArgs(n,"OpsItemId",params,undefined,false); 
			copyArgs(n,"Title",params,undefined,false); 
			copyArgs(n,"Category",params,undefined,false); 
			copyArgs(n,"Severity",params,undefined,false); 
			copyArgs(n,"ActualStartTime",params,undefined,false); 
			copyArgs(n,"ActualEndTime",params,undefined,false); 
			copyArgs(n,"PlannedStartTime",params,undefined,false); 
			copyArgs(n,"PlannedEndTime",params,undefined,false); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"OperationalData",params,undefined,true); 
			copyArgs(msg,"OperationalDataToDelete",params,undefined,false); 
			copyArgs(msg,"Notifications",params,undefined,true); 
			copyArgs(msg,"Priority",params,undefined,false); 
			copyArgs(msg,"RelatedOpsItems",params,undefined,true); 
			copyArgs(msg,"Status",params,undefined,false); 
			copyArgs(msg,"OpsItemId",params,undefined,false); 
			copyArgs(msg,"Title",params,undefined,false); 
			copyArgs(msg,"Category",params,undefined,false); 
			copyArgs(msg,"Severity",params,undefined,false); 
			copyArgs(msg,"ActualStartTime",params,undefined,false); 
			copyArgs(msg,"ActualEndTime",params,undefined,false); 
			copyArgs(msg,"PlannedStartTime",params,undefined,false); 
			copyArgs(msg,"PlannedEndTime",params,undefined,false); 
			

			svc.updateOpsItem(params,cb);
		}
		
		service.UpdateOpsMetadata=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OpsMetadataArn",params,undefined,false); 
			
			copyArgs(n,"OpsMetadataArn",params,undefined,false); 
			copyArgs(n,"MetadataToUpdate",params,undefined,true); 
			copyArgs(n,"KeysToDelete",params,undefined,false); 
			
			copyArgs(msg,"OpsMetadataArn",params,undefined,false); 
			copyArgs(msg,"MetadataToUpdate",params,undefined,true); 
			copyArgs(msg,"KeysToDelete",params,undefined,false); 
			

			svc.updateOpsMetadata(params,cb);
		}
		
		service.UpdatePatchBaseline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BaselineId",params,undefined,false); 
			
			copyArgs(n,"BaselineId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"GlobalFilters",params,undefined,true); 
			copyArgs(n,"ApprovalRules",params,undefined,true); 
			copyArgs(n,"ApprovedPatches",params,undefined,true); 
			copyArgs(n,"ApprovedPatchesComplianceLevel",params,undefined,false); 
			copyArgs(Boolean(n),"ApprovedPatchesEnableNonSecurity",params,undefined,false); 
			copyArgs(n,"RejectedPatches",params,undefined,true); 
			copyArgs(n,"RejectedPatchesAction",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Sources",params,undefined,true); 
			copyArgs(Boolean(n),"Replace",params,undefined,false); 
			
			copyArgs(msg,"BaselineId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"GlobalFilters",params,undefined,true); 
			copyArgs(msg,"ApprovalRules",params,undefined,true); 
			copyArgs(msg,"ApprovedPatches",params,undefined,true); 
			copyArgs(msg,"ApprovedPatchesComplianceLevel",params,undefined,false); 
			copyArgs(msg,"ApprovedPatchesEnableNonSecurity",params,undefined,false); 
			copyArgs(msg,"RejectedPatches",params,undefined,true); 
			copyArgs(msg,"RejectedPatchesAction",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Sources",params,undefined,true); 
			copyArgs(msg,"Replace",params,undefined,false); 
			

			svc.updatePatchBaseline(params,cb);
		}
		
		service.UpdateResourceDataSync=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SyncName",params,undefined,false); 
			copyArgs(n,"SyncType",params,undefined,false); 
			copyArgs(n,"SyncSource",params,undefined,true); 
			
			copyArgs(n,"SyncName",params,undefined,false); 
			copyArgs(n,"SyncType",params,undefined,false); 
			copyArgs(n,"SyncSource",params,undefined,true); 
			
			copyArgs(msg,"SyncName",params,undefined,false); 
			copyArgs(msg,"SyncType",params,undefined,false); 
			copyArgs(msg,"SyncSource",params,undefined,true); 
			

			svc.updateResourceDataSync(params,cb);
		}
		
		service.UpdateServiceSetting=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SettingId",params,undefined,false); 
			copyArgs(n,"SettingValue",params,undefined,false); 
			
			copyArgs(n,"SettingId",params,undefined,false); 
			copyArgs(n,"SettingValue",params,undefined,false); 
			
			copyArgs(msg,"SettingId",params,undefined,false); 
			copyArgs(msg,"SettingValue",params,undefined,false); 
			

			svc.updateServiceSetting(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS SSM", AmazonAPINode);

};
