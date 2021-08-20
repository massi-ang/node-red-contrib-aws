
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

		var awsService = new AWS.SSM( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.SSM(msg.AWSConfig) : awsService;

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
			
			copyArg(n,"ResourceType",params,undefined,false); 
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceType",params,undefined,false); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.addTagsToResource(params,cb);
		}

		
		service.AssociateOpsItemRelatedItem=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OpsItemId",params,undefined,false); 
			copyArg(n,"AssociationType",params,undefined,false); 
			copyArg(n,"ResourceType",params,undefined,false); 
			copyArg(n,"ResourceUri",params,undefined,false); 
			
			copyArg(msg,"OpsItemId",params,undefined,false); 
			copyArg(msg,"AssociationType",params,undefined,false); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			copyArg(msg,"ResourceUri",params,undefined,false); 
			

			svc.associateOpsItemRelatedItem(params,cb);
		}

		
		service.CancelCommand=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CommandId",params,undefined,false); 
			
			copyArg(msg,"CommandId",params,undefined,false); 
			copyArg(msg,"InstanceIds",params,undefined,true); 
			

			svc.cancelCommand(params,cb);
		}

		
		service.CancelMaintenanceWindowExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WindowExecutionId",params,undefined,false); 
			
			copyArg(msg,"WindowExecutionId",params,undefined,false); 
			

			svc.cancelMaintenanceWindowExecution(params,cb);
		}

		
		service.CreateActivation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IamRole",params,undefined,false); 
			
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DefaultInstanceName",params,undefined,false); 
			copyArg(msg,"IamRole",params,undefined,false); 
			copyArg(msg,"RegistrationLimit",params,undefined,false); 
			copyArg(msg,"ExpirationDate",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createActivation(params,cb);
		}

		
		service.CreateAssociation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"DocumentVersion",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,true); 
			copyArg(msg,"Targets",params,undefined,true); 
			copyArg(msg,"ScheduleExpression",params,undefined,false); 
			copyArg(msg,"OutputLocation",params,undefined,true); 
			copyArg(msg,"AssociationName",params,undefined,false); 
			copyArg(msg,"AutomationTargetParameterName",params,undefined,false); 
			copyArg(msg,"MaxErrors",params,undefined,false); 
			copyArg(msg,"MaxConcurrency",params,undefined,false); 
			copyArg(msg,"ComplianceSeverity",params,undefined,false); 
			copyArg(msg,"SyncCompliance",params,undefined,false); 
			copyArg(msg,"ApplyOnlyAtCronInterval",params,undefined,false); 
			copyArg(msg,"CalendarNames",params,undefined,true); 
			copyArg(msg,"TargetLocations",params,undefined,true); 
			

			svc.createAssociation(params,cb);
		}

		
		service.CreateAssociationBatch=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Entries",params,undefined,false); 
			
			copyArg(msg,"Entries",params,undefined,false); 
			

			svc.createAssociationBatch(params,cb);
		}

		
		service.CreateDocument=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Content",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Content",params,undefined,false); 
			copyArg(msg,"Requires",params,undefined,true); 
			copyArg(msg,"Attachments",params,undefined,true); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"DisplayName",params,undefined,false); 
			copyArg(msg,"VersionName",params,undefined,false); 
			copyArg(msg,"DocumentType",params,undefined,false); 
			copyArg(msg,"DocumentFormat",params,undefined,false); 
			copyArg(msg,"TargetType",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createDocument(params,cb);
		}

		
		service.CreateMaintenanceWindow=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Schedule",params,undefined,false); 
			copyArg(n,"Duration",params,undefined,false); 
			copyArg(n,"Cutoff",params,undefined,false); 
			copyArg(n,"AllowUnassociatedTargets",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,true); 
			copyArg(msg,"StartDate",params,undefined,false); 
			copyArg(msg,"EndDate",params,undefined,false); 
			copyArg(msg,"Schedule",params,undefined,false); 
			copyArg(msg,"ScheduleTimezone",params,undefined,false); 
			copyArg(msg,"ScheduleOffset",params,undefined,false); 
			copyArg(msg,"Duration",params,undefined,false); 
			copyArg(msg,"Cutoff",params,undefined,false); 
			copyArg(msg,"AllowUnassociatedTargets",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createMaintenanceWindow(params,cb);
		}

		
		service.CreateOpsItem=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Description",params,undefined,false); 
			copyArg(n,"Source",params,undefined,false); 
			copyArg(n,"Title",params,undefined,false); 
			
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"OpsItemType",params,undefined,false); 
			copyArg(msg,"OperationalData",params,undefined,true); 
			copyArg(msg,"Notifications",params,undefined,true); 
			copyArg(msg,"Priority",params,undefined,false); 
			copyArg(msg,"RelatedOpsItems",params,undefined,true); 
			copyArg(msg,"Source",params,undefined,false); 
			copyArg(msg,"Title",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"Category",params,undefined,false); 
			copyArg(msg,"Severity",params,undefined,false); 
			copyArg(msg,"ActualStartTime",params,undefined,false); 
			copyArg(msg,"ActualEndTime",params,undefined,false); 
			copyArg(msg,"PlannedStartTime",params,undefined,false); 
			copyArg(msg,"PlannedEndTime",params,undefined,false); 
			

			svc.createOpsItem(params,cb);
		}

		
		service.CreateOpsMetadata=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"Metadata",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createOpsMetadata(params,cb);
		}

		
		service.CreatePatchBaseline=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"OperatingSystem",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"GlobalFilters",params,undefined,true); 
			copyArg(msg,"ApprovalRules",params,undefined,true); 
			copyArg(msg,"ApprovedPatches",params,undefined,true); 
			copyArg(msg,"ApprovedPatchesComplianceLevel",params,undefined,false); 
			copyArg(msg,"ApprovedPatchesEnableNonSecurity",params,undefined,false); 
			copyArg(msg,"RejectedPatches",params,undefined,true); 
			copyArg(msg,"RejectedPatchesAction",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Sources",params,undefined,true); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createPatchBaseline(params,cb);
		}

		
		service.CreateResourceDataSync=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SyncName",params,undefined,false); 
			
			copyArg(msg,"SyncName",params,undefined,false); 
			copyArg(msg,"S3Destination",params,undefined,true); 
			copyArg(msg,"SyncType",params,undefined,false); 
			copyArg(msg,"SyncSource",params,undefined,true); 
			

			svc.createResourceDataSync(params,cb);
		}

		
		service.DeleteActivation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ActivationId",params,undefined,false); 
			
			copyArg(msg,"ActivationId",params,undefined,false); 
			

			svc.deleteActivation(params,cb);
		}

		
		service.DeleteAssociation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"AssociationId",params,undefined,false); 
			

			svc.deleteAssociation(params,cb);
		}

		
		service.DeleteDocument=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"DocumentVersion",params,undefined,false); 
			copyArg(msg,"VersionName",params,undefined,false); 
			copyArg(msg,"Force",params,undefined,false); 
			

			svc.deleteDocument(params,cb);
		}

		
		service.DeleteInventory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TypeName",params,undefined,false); 
			
			copyArg(msg,"TypeName",params,undefined,false); 
			copyArg(msg,"SchemaDeleteOption",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.deleteInventory(params,cb);
		}

		
		service.DeleteMaintenanceWindow=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WindowId",params,undefined,false); 
			
			copyArg(msg,"WindowId",params,undefined,false); 
			

			svc.deleteMaintenanceWindow(params,cb);
		}

		
		service.DeleteOpsMetadata=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OpsMetadataArn",params,undefined,false); 
			
			copyArg(msg,"OpsMetadataArn",params,undefined,false); 
			

			svc.deleteOpsMetadata(params,cb);
		}

		
		service.DeleteParameter=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteParameter(params,cb);
		}

		
		service.DeleteParameters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Names",params,undefined,true); 
			
			copyArg(msg,"Names",params,undefined,true); 
			

			svc.deleteParameters(params,cb);
		}

		
		service.DeletePatchBaseline=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BaselineId",params,undefined,false); 
			
			copyArg(msg,"BaselineId",params,undefined,false); 
			

			svc.deletePatchBaseline(params,cb);
		}

		
		service.DeleteResourceDataSync=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SyncName",params,undefined,false); 
			
			copyArg(msg,"SyncName",params,undefined,false); 
			copyArg(msg,"SyncType",params,undefined,false); 
			

			svc.deleteResourceDataSync(params,cb);
		}

		
		service.DeregisterManagedInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.deregisterManagedInstance(params,cb);
		}

		
		service.DeregisterPatchBaselineForPatchGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BaselineId",params,undefined,false); 
			copyArg(n,"PatchGroup",params,undefined,false); 
			
			copyArg(msg,"BaselineId",params,undefined,false); 
			copyArg(msg,"PatchGroup",params,undefined,false); 
			

			svc.deregisterPatchBaselineForPatchGroup(params,cb);
		}

		
		service.DeregisterTargetFromMaintenanceWindow=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WindowId",params,undefined,false); 
			copyArg(n,"WindowTargetId",params,undefined,false); 
			
			copyArg(msg,"WindowId",params,undefined,false); 
			copyArg(msg,"WindowTargetId",params,undefined,false); 
			copyArg(msg,"Safe",params,undefined,false); 
			

			svc.deregisterTargetFromMaintenanceWindow(params,cb);
		}

		
		service.DeregisterTaskFromMaintenanceWindow=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WindowId",params,undefined,false); 
			copyArg(n,"WindowTaskId",params,undefined,false); 
			
			copyArg(msg,"WindowId",params,undefined,false); 
			copyArg(msg,"WindowTaskId",params,undefined,false); 
			

			svc.deregisterTaskFromMaintenanceWindow(params,cb);
		}

		
		service.DescribeActivations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeActivations(params,cb);
		}

		
		service.DescribeAssociation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"AssociationId",params,undefined,false); 
			copyArg(msg,"AssociationVersion",params,undefined,false); 
			

			svc.describeAssociation(params,cb);
		}

		
		service.DescribeAssociationExecutionTargets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AssociationId",params,undefined,false); 
			copyArg(n,"ExecutionId",params,undefined,false); 
			
			copyArg(msg,"AssociationId",params,undefined,false); 
			copyArg(msg,"ExecutionId",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeAssociationExecutionTargets(params,cb);
		}

		
		service.DescribeAssociationExecutions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AssociationId",params,undefined,false); 
			
			copyArg(msg,"AssociationId",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeAssociationExecutions(params,cb);
		}

		
		service.DescribeAutomationExecutions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeAutomationExecutions(params,cb);
		}

		
		service.DescribeAutomationStepExecutions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutomationExecutionId",params,undefined,false); 
			
			copyArg(msg,"AutomationExecutionId",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"ReverseOrder",params,undefined,false); 
			

			svc.describeAutomationStepExecutions(params,cb);
		}

		
		service.DescribeAvailablePatches=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeAvailablePatches(params,cb);
		}

		
		service.DescribeDocument=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"DocumentVersion",params,undefined,false); 
			copyArg(msg,"VersionName",params,undefined,false); 
			

			svc.describeDocument(params,cb);
		}

		
		service.DescribeDocumentPermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"PermissionType",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"PermissionType",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeDocumentPermission(params,cb);
		}

		
		service.DescribeEffectiveInstanceAssociations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeEffectiveInstanceAssociations(params,cb);
		}

		
		service.DescribeEffectivePatchesForPatchBaseline=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BaselineId",params,undefined,false); 
			
			copyArg(msg,"BaselineId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeEffectivePatchesForPatchBaseline(params,cb);
		}

		
		service.DescribeInstanceAssociationsStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeInstanceAssociationsStatus(params,cb);
		}

		
		service.DescribeInstanceInformation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"InstanceInformationFilterList",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeInstanceInformation(params,cb);
		}

		
		service.DescribeInstancePatchStates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceIds",params,undefined,true); 
			
			copyArg(msg,"InstanceIds",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describeInstancePatchStates(params,cb);
		}

		
		service.DescribeInstancePatchStatesForPatchGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PatchGroup",params,undefined,false); 
			
			copyArg(msg,"PatchGroup",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describeInstancePatchStatesForPatchGroup(params,cb);
		}

		
		service.DescribeInstancePatches=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describeInstancePatches(params,cb);
		}

		
		service.DescribeInventoryDeletions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DeletionId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describeInventoryDeletions(params,cb);
		}

		
		service.DescribeMaintenanceWindowExecutionTaskInvocations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WindowExecutionId",params,undefined,false); 
			copyArg(n,"TaskId",params,undefined,false); 
			
			copyArg(msg,"WindowExecutionId",params,undefined,false); 
			copyArg(msg,"TaskId",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeMaintenanceWindowExecutionTaskInvocations(params,cb);
		}

		
		service.DescribeMaintenanceWindowExecutionTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WindowExecutionId",params,undefined,false); 
			
			copyArg(msg,"WindowExecutionId",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeMaintenanceWindowExecutionTasks(params,cb);
		}

		
		service.DescribeMaintenanceWindowExecutions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WindowId",params,undefined,false); 
			
			copyArg(msg,"WindowId",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeMaintenanceWindowExecutions(params,cb);
		}

		
		service.DescribeMaintenanceWindowSchedule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"WindowId",params,undefined,false); 
			copyArg(msg,"Targets",params,undefined,true); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeMaintenanceWindowSchedule(params,cb);
		}

		
		service.DescribeMaintenanceWindowTargets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WindowId",params,undefined,false); 
			
			copyArg(msg,"WindowId",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeMaintenanceWindowTargets(params,cb);
		}

		
		service.DescribeMaintenanceWindowTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WindowId",params,undefined,false); 
			
			copyArg(msg,"WindowId",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeMaintenanceWindowTasks(params,cb);
		}

		
		service.DescribeMaintenanceWindows=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeMaintenanceWindows(params,cb);
		}

		
		service.DescribeMaintenanceWindowsForTarget=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Targets",params,undefined,true); 
			copyArg(n,"ResourceType",params,undefined,false); 
			
			copyArg(msg,"Targets",params,undefined,true); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeMaintenanceWindowsForTarget(params,cb);
		}

		
		service.DescribeOpsItems=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"OpsItemFilters",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeOpsItems(params,cb);
		}

		
		service.DescribeParameters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"ParameterFilters",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeParameters(params,cb);
		}

		
		service.DescribePatchBaselines=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describePatchBaselines(params,cb);
		}

		
		service.DescribePatchGroupState=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PatchGroup",params,undefined,false); 
			
			copyArg(msg,"PatchGroup",params,undefined,false); 
			

			svc.describePatchGroupState(params,cb);
		}

		
		service.DescribePatchGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describePatchGroups(params,cb);
		}

		
		service.DescribePatchProperties=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OperatingSystem",params,undefined,false); 
			copyArg(n,"Property",params,undefined,false); 
			
			copyArg(msg,"OperatingSystem",params,undefined,false); 
			copyArg(msg,"Property",params,undefined,false); 
			copyArg(msg,"PatchSet",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describePatchProperties(params,cb);
		}

		
		service.DescribeSessions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"State",params,undefined,false); 
			
			copyArg(msg,"State",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			

			svc.describeSessions(params,cb);
		}

		
		service.DisassociateOpsItemRelatedItem=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OpsItemId",params,undefined,false); 
			copyArg(n,"AssociationId",params,undefined,false); 
			
			copyArg(msg,"OpsItemId",params,undefined,false); 
			copyArg(msg,"AssociationId",params,undefined,false); 
			

			svc.disassociateOpsItemRelatedItem(params,cb);
		}

		
		service.GetAutomationExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutomationExecutionId",params,undefined,false); 
			
			copyArg(msg,"AutomationExecutionId",params,undefined,false); 
			

			svc.getAutomationExecution(params,cb);
		}

		
		service.GetCalendarState=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CalendarNames",params,undefined,true); 
			
			copyArg(msg,"CalendarNames",params,undefined,true); 
			copyArg(msg,"AtTime",params,undefined,false); 
			

			svc.getCalendarState(params,cb);
		}

		
		service.GetCommandInvocation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CommandId",params,undefined,false); 
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"CommandId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"PluginName",params,undefined,false); 
			

			svc.getCommandInvocation(params,cb);
		}

		
		service.GetConnectionStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Target",params,undefined,false); 
			
			copyArg(msg,"Target",params,undefined,false); 
			

			svc.getConnectionStatus(params,cb);
		}

		
		service.GetDefaultPatchBaseline=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"OperatingSystem",params,undefined,false); 
			

			svc.getDefaultPatchBaseline(params,cb);
		}

		
		service.GetDeployablePatchSnapshotForInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"SnapshotId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"SnapshotId",params,undefined,false); 
			copyArg(msg,"BaselineOverride",params,undefined,false); 
			

			svc.getDeployablePatchSnapshotForInstance(params,cb);
		}

		
		service.GetDocument=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"VersionName",params,undefined,false); 
			copyArg(msg,"DocumentVersion",params,undefined,false); 
			copyArg(msg,"DocumentFormat",params,undefined,false); 
			

			svc.getDocument(params,cb);
		}

		
		service.GetInventory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"Aggregators",params,undefined,true); 
			copyArg(msg,"ResultAttributes",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.getInventory(params,cb);
		}

		
		service.GetInventorySchema=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"TypeName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"Aggregator",params,undefined,false); 
			copyArg(msg,"SubType",params,undefined,false); 
			

			svc.getInventorySchema(params,cb);
		}

		
		service.GetMaintenanceWindow=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WindowId",params,undefined,false); 
			
			copyArg(msg,"WindowId",params,undefined,false); 
			

			svc.getMaintenanceWindow(params,cb);
		}

		
		service.GetMaintenanceWindowExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WindowExecutionId",params,undefined,false); 
			
			copyArg(msg,"WindowExecutionId",params,undefined,false); 
			

			svc.getMaintenanceWindowExecution(params,cb);
		}

		
		service.GetMaintenanceWindowExecutionTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WindowExecutionId",params,undefined,false); 
			copyArg(n,"TaskId",params,undefined,false); 
			
			copyArg(msg,"WindowExecutionId",params,undefined,false); 
			copyArg(msg,"TaskId",params,undefined,false); 
			

			svc.getMaintenanceWindowExecutionTask(params,cb);
		}

		
		service.GetMaintenanceWindowExecutionTaskInvocation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WindowExecutionId",params,undefined,false); 
			copyArg(n,"TaskId",params,undefined,false); 
			copyArg(n,"InvocationId",params,undefined,false); 
			
			copyArg(msg,"WindowExecutionId",params,undefined,false); 
			copyArg(msg,"TaskId",params,undefined,false); 
			copyArg(msg,"InvocationId",params,undefined,false); 
			

			svc.getMaintenanceWindowExecutionTaskInvocation(params,cb);
		}

		
		service.GetMaintenanceWindowTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WindowId",params,undefined,false); 
			copyArg(n,"WindowTaskId",params,undefined,false); 
			
			copyArg(msg,"WindowId",params,undefined,false); 
			copyArg(msg,"WindowTaskId",params,undefined,false); 
			

			svc.getMaintenanceWindowTask(params,cb);
		}

		
		service.GetOpsItem=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OpsItemId",params,undefined,false); 
			
			copyArg(msg,"OpsItemId",params,undefined,false); 
			

			svc.getOpsItem(params,cb);
		}

		
		service.GetOpsMetadata=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OpsMetadataArn",params,undefined,false); 
			
			copyArg(msg,"OpsMetadataArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getOpsMetadata(params,cb);
		}

		
		service.GetOpsSummary=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SyncName",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"Aggregators",params,undefined,true); 
			copyArg(msg,"ResultAttributes",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.getOpsSummary(params,cb);
		}

		
		service.GetParameter=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"WithDecryption",params,undefined,false); 
			

			svc.getParameter(params,cb);
		}

		
		service.GetParameterHistory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"WithDecryption",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getParameterHistory(params,cb);
		}

		
		service.GetParameters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Names",params,undefined,true); 
			
			copyArg(msg,"Names",params,undefined,true); 
			copyArg(msg,"WithDecryption",params,undefined,false); 
			

			svc.getParameters(params,cb);
		}

		
		service.GetParametersByPath=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Path",params,undefined,false); 
			
			copyArg(msg,"Path",params,undefined,false); 
			copyArg(msg,"Recursive",params,undefined,false); 
			copyArg(msg,"ParameterFilters",params,undefined,true); 
			copyArg(msg,"WithDecryption",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getParametersByPath(params,cb);
		}

		
		service.GetPatchBaseline=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BaselineId",params,undefined,false); 
			
			copyArg(msg,"BaselineId",params,undefined,false); 
			

			svc.getPatchBaseline(params,cb);
		}

		
		service.GetPatchBaselineForPatchGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PatchGroup",params,undefined,false); 
			
			copyArg(msg,"PatchGroup",params,undefined,false); 
			copyArg(msg,"OperatingSystem",params,undefined,false); 
			

			svc.getPatchBaselineForPatchGroup(params,cb);
		}

		
		service.GetServiceSetting=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SettingId",params,undefined,false); 
			
			copyArg(msg,"SettingId",params,undefined,false); 
			

			svc.getServiceSetting(params,cb);
		}

		
		service.LabelParameterVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Labels",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ParameterVersion",params,undefined,false); 
			copyArg(msg,"Labels",params,undefined,true); 
			

			svc.labelParameterVersion(params,cb);
		}

		
		service.ListAssociationVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AssociationId",params,undefined,false); 
			
			copyArg(msg,"AssociationId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listAssociationVersions(params,cb);
		}

		
		service.ListAssociations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AssociationFilterList",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listAssociations(params,cb);
		}

		
		service.ListCommandInvocations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CommandId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"Details",params,undefined,false); 
			

			svc.listCommandInvocations(params,cb);
		}

		
		service.ListCommands=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CommandId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			

			svc.listCommands(params,cb);
		}

		
		service.ListComplianceItems=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"ResourceIds",params,undefined,false); 
			copyArg(msg,"ResourceTypes",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listComplianceItems(params,cb);
		}

		
		service.ListComplianceSummaries=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listComplianceSummaries(params,cb);
		}

		
		service.ListDocumentMetadataHistory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Metadata",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"DocumentVersion",params,undefined,false); 
			copyArg(msg,"Metadata",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listDocumentMetadataHistory(params,cb);
		}

		
		service.ListDocumentVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listDocumentVersions(params,cb);
		}

		
		service.ListDocuments=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DocumentFilterList",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listDocuments(params,cb);
		}

		
		service.ListInventoryEntries=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"TypeName",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"TypeName",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listInventoryEntries(params,cb);
		}

		
		service.ListOpsItemEvents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listOpsItemEvents(params,cb);
		}

		
		service.ListOpsItemRelatedItems=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"OpsItemId",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listOpsItemRelatedItems(params,cb);
		}

		
		service.ListOpsMetadata=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listOpsMetadata(params,cb);
		}

		
		service.ListResourceComplianceSummaries=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listResourceComplianceSummaries(params,cb);
		}

		
		service.ListResourceDataSync=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SyncType",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listResourceDataSync(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceType",params,undefined,false); 
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"ResourceType",params,undefined,false); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ModifyDocumentPermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"PermissionType",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"PermissionType",params,undefined,false); 
			copyArg(msg,"AccountIdsToAdd",params,undefined,true); 
			copyArg(msg,"AccountIdsToRemove",params,undefined,true); 
			copyArg(msg,"SharedDocumentVersion",params,undefined,false); 
			

			svc.modifyDocumentPermission(params,cb);
		}

		
		service.PutComplianceItems=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"ResourceType",params,undefined,false); 
			copyArg(n,"ComplianceType",params,undefined,false); 
			copyArg(n,"ExecutionSummary",params,undefined,true); 
			copyArg(n,"Items",params,undefined,false); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			copyArg(msg,"ComplianceType",params,undefined,false); 
			copyArg(msg,"ExecutionSummary",params,undefined,true); 
			copyArg(msg,"Items",params,undefined,false); 
			copyArg(msg,"ItemContentHash",params,undefined,false); 
			copyArg(msg,"UploadType",params,undefined,false); 
			

			svc.putComplianceItems(params,cb);
		}

		
		service.PutInventory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"Items",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"Items",params,undefined,false); 
			

			svc.putInventory(params,cb);
		}

		
		service.PutParameter=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Value",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Value",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"KeyId",params,undefined,false); 
			copyArg(msg,"Overwrite",params,undefined,false); 
			copyArg(msg,"AllowedPattern",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"Tier",params,undefined,false); 
			copyArg(msg,"Policies",params,undefined,false); 
			copyArg(msg,"DataType",params,undefined,false); 
			

			svc.putParameter(params,cb);
		}

		
		service.RegisterDefaultPatchBaseline=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BaselineId",params,undefined,false); 
			
			copyArg(msg,"BaselineId",params,undefined,false); 
			

			svc.registerDefaultPatchBaseline(params,cb);
		}

		
		service.RegisterPatchBaselineForPatchGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BaselineId",params,undefined,false); 
			copyArg(n,"PatchGroup",params,undefined,false); 
			
			copyArg(msg,"BaselineId",params,undefined,false); 
			copyArg(msg,"PatchGroup",params,undefined,false); 
			

			svc.registerPatchBaselineForPatchGroup(params,cb);
		}

		
		service.RegisterTargetWithMaintenanceWindow=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WindowId",params,undefined,false); 
			copyArg(n,"ResourceType",params,undefined,false); 
			copyArg(n,"Targets",params,undefined,true); 
			
			copyArg(msg,"WindowId",params,undefined,false); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			copyArg(msg,"Targets",params,undefined,true); 
			copyArg(msg,"OwnerInformation",params,undefined,true); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,true); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.registerTargetWithMaintenanceWindow(params,cb);
		}

		
		service.RegisterTaskWithMaintenanceWindow=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WindowId",params,undefined,false); 
			copyArg(n,"TaskArn",params,undefined,false); 
			copyArg(n,"TaskType",params,undefined,false); 
			
			copyArg(msg,"WindowId",params,undefined,false); 
			copyArg(msg,"Targets",params,undefined,true); 
			copyArg(msg,"TaskArn",params,undefined,false); 
			copyArg(msg,"ServiceRoleArn",params,undefined,false); 
			copyArg(msg,"TaskType",params,undefined,false); 
			copyArg(msg,"TaskParameters",params,undefined,true); 
			copyArg(msg,"TaskInvocationParameters",params,undefined,true); 
			copyArg(msg,"Priority",params,undefined,false); 
			copyArg(msg,"MaxConcurrency",params,undefined,false); 
			copyArg(msg,"MaxErrors",params,undefined,false); 
			copyArg(msg,"LoggingInfo",params,undefined,true); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,true); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.registerTaskWithMaintenanceWindow(params,cb);
		}

		
		service.RemoveTagsFromResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceType",params,undefined,false); 
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceType",params,undefined,false); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.removeTagsFromResource(params,cb);
		}

		
		service.ResetServiceSetting=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SettingId",params,undefined,false); 
			
			copyArg(msg,"SettingId",params,undefined,false); 
			

			svc.resetServiceSetting(params,cb);
		}

		
		service.ResumeSession=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SessionId",params,undefined,false); 
			
			copyArg(msg,"SessionId",params,undefined,false); 
			

			svc.resumeSession(params,cb);
		}

		
		service.SendAutomationSignal=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutomationExecutionId",params,undefined,false); 
			copyArg(n,"SignalType",params,undefined,false); 
			
			copyArg(msg,"AutomationExecutionId",params,undefined,false); 
			copyArg(msg,"SignalType",params,undefined,false); 
			copyArg(msg,"Payload",params,undefined,true); 
			

			svc.sendAutomationSignal(params,cb);
		}

		
		service.SendCommand=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DocumentName",params,undefined,false); 
			
			copyArg(msg,"InstanceIds",params,undefined,true); 
			copyArg(msg,"Targets",params,undefined,true); 
			copyArg(msg,"DocumentName",params,undefined,false); 
			copyArg(msg,"DocumentVersion",params,undefined,false); 
			copyArg(msg,"DocumentHash",params,undefined,false); 
			copyArg(msg,"DocumentHashType",params,undefined,false); 
			copyArg(msg,"TimeoutSeconds",params,undefined,false); 
			copyArg(msg,"Comment",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,true); 
			copyArg(msg,"OutputS3Region",params,undefined,false); 
			copyArg(msg,"OutputS3BucketName",params,undefined,false); 
			copyArg(msg,"OutputS3KeyPrefix",params,undefined,false); 
			copyArg(msg,"MaxConcurrency",params,undefined,false); 
			copyArg(msg,"MaxErrors",params,undefined,false); 
			copyArg(msg,"ServiceRoleArn",params,undefined,false); 
			copyArg(msg,"NotificationConfig",params,undefined,true); 
			copyArg(msg,"CloudWatchOutputConfig",params,undefined,true); 
			

			svc.sendCommand(params,cb);
		}

		
		service.StartAssociationsOnce=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AssociationIds",params,undefined,false); 
			
			copyArg(msg,"AssociationIds",params,undefined,false); 
			

			svc.startAssociationsOnce(params,cb);
		}

		
		service.StartAutomationExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DocumentName",params,undefined,false); 
			
			copyArg(msg,"DocumentName",params,undefined,false); 
			copyArg(msg,"DocumentVersion",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,true); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"Mode",params,undefined,false); 
			copyArg(msg,"TargetParameterName",params,undefined,false); 
			copyArg(msg,"Targets",params,undefined,true); 
			copyArg(msg,"TargetMaps",params,undefined,true); 
			copyArg(msg,"MaxConcurrency",params,undefined,false); 
			copyArg(msg,"MaxErrors",params,undefined,false); 
			copyArg(msg,"TargetLocations",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.startAutomationExecution(params,cb);
		}

		
		service.StartChangeRequestExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DocumentName",params,undefined,false); 
			copyArg(n,"Runbooks",params,undefined,true); 
			
			copyArg(msg,"ScheduledTime",params,undefined,false); 
			copyArg(msg,"DocumentName",params,undefined,false); 
			copyArg(msg,"DocumentVersion",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,true); 
			copyArg(msg,"ChangeRequestName",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"Runbooks",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"ScheduledEndTime",params,undefined,false); 
			copyArg(msg,"ChangeDetails",params,undefined,false); 
			

			svc.startChangeRequestExecution(params,cb);
		}

		
		service.StartSession=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Target",params,undefined,false); 
			
			copyArg(msg,"Target",params,undefined,false); 
			copyArg(msg,"DocumentName",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,false); 
			

			svc.startSession(params,cb);
		}

		
		service.StopAutomationExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutomationExecutionId",params,undefined,false); 
			
			copyArg(msg,"AutomationExecutionId",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			

			svc.stopAutomationExecution(params,cb);
		}

		
		service.TerminateSession=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SessionId",params,undefined,false); 
			
			copyArg(msg,"SessionId",params,undefined,false); 
			

			svc.terminateSession(params,cb);
		}

		
		service.UnlabelParameterVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"ParameterVersion",params,undefined,false); 
			copyArg(n,"Labels",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ParameterVersion",params,undefined,false); 
			copyArg(msg,"Labels",params,undefined,true); 
			

			svc.unlabelParameterVersion(params,cb);
		}

		
		service.UpdateAssociation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AssociationId",params,undefined,false); 
			
			copyArg(msg,"AssociationId",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,true); 
			copyArg(msg,"DocumentVersion",params,undefined,false); 
			copyArg(msg,"ScheduleExpression",params,undefined,false); 
			copyArg(msg,"OutputLocation",params,undefined,true); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Targets",params,undefined,true); 
			copyArg(msg,"AssociationName",params,undefined,false); 
			copyArg(msg,"AssociationVersion",params,undefined,false); 
			copyArg(msg,"AutomationTargetParameterName",params,undefined,false); 
			copyArg(msg,"MaxErrors",params,undefined,false); 
			copyArg(msg,"MaxConcurrency",params,undefined,false); 
			copyArg(msg,"ComplianceSeverity",params,undefined,false); 
			copyArg(msg,"SyncCompliance",params,undefined,false); 
			copyArg(msg,"ApplyOnlyAtCronInterval",params,undefined,false); 
			copyArg(msg,"CalendarNames",params,undefined,true); 
			copyArg(msg,"TargetLocations",params,undefined,true); 
			

			svc.updateAssociation(params,cb);
		}

		
		service.UpdateAssociationStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"AssociationStatus",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"AssociationStatus",params,undefined,true); 
			

			svc.updateAssociationStatus(params,cb);
		}

		
		service.UpdateDocument=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Content",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Content",params,undefined,false); 
			copyArg(msg,"Attachments",params,undefined,true); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"DisplayName",params,undefined,false); 
			copyArg(msg,"VersionName",params,undefined,false); 
			copyArg(msg,"DocumentVersion",params,undefined,false); 
			copyArg(msg,"DocumentFormat",params,undefined,false); 
			copyArg(msg,"TargetType",params,undefined,false); 
			

			svc.updateDocument(params,cb);
		}

		
		service.UpdateDocumentDefaultVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"DocumentVersion",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"DocumentVersion",params,undefined,false); 
			

			svc.updateDocumentDefaultVersion(params,cb);
		}

		
		service.UpdateDocumentMetadata=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"DocumentReviews",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"DocumentVersion",params,undefined,false); 
			copyArg(msg,"DocumentReviews",params,undefined,false); 
			

			svc.updateDocumentMetadata(params,cb);
		}

		
		service.UpdateMaintenanceWindow=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WindowId",params,undefined,false); 
			
			copyArg(msg,"WindowId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,true); 
			copyArg(msg,"StartDate",params,undefined,false); 
			copyArg(msg,"EndDate",params,undefined,false); 
			copyArg(msg,"Schedule",params,undefined,false); 
			copyArg(msg,"ScheduleTimezone",params,undefined,false); 
			copyArg(msg,"ScheduleOffset",params,undefined,false); 
			copyArg(msg,"Duration",params,undefined,false); 
			copyArg(msg,"Cutoff",params,undefined,false); 
			copyArg(msg,"AllowUnassociatedTargets",params,undefined,false); 
			copyArg(msg,"Enabled",params,undefined,false); 
			copyArg(msg,"Replace",params,undefined,false); 
			

			svc.updateMaintenanceWindow(params,cb);
		}

		
		service.UpdateMaintenanceWindowTarget=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WindowId",params,undefined,false); 
			copyArg(n,"WindowTargetId",params,undefined,false); 
			
			copyArg(msg,"WindowId",params,undefined,false); 
			copyArg(msg,"WindowTargetId",params,undefined,false); 
			copyArg(msg,"Targets",params,undefined,true); 
			copyArg(msg,"OwnerInformation",params,undefined,true); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,true); 
			copyArg(msg,"Replace",params,undefined,false); 
			

			svc.updateMaintenanceWindowTarget(params,cb);
		}

		
		service.UpdateMaintenanceWindowTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WindowId",params,undefined,false); 
			copyArg(n,"WindowTaskId",params,undefined,false); 
			
			copyArg(msg,"WindowId",params,undefined,false); 
			copyArg(msg,"WindowTaskId",params,undefined,false); 
			copyArg(msg,"Targets",params,undefined,true); 
			copyArg(msg,"TaskArn",params,undefined,false); 
			copyArg(msg,"ServiceRoleArn",params,undefined,false); 
			copyArg(msg,"TaskParameters",params,undefined,true); 
			copyArg(msg,"TaskInvocationParameters",params,undefined,true); 
			copyArg(msg,"Priority",params,undefined,false); 
			copyArg(msg,"MaxConcurrency",params,undefined,false); 
			copyArg(msg,"MaxErrors",params,undefined,false); 
			copyArg(msg,"LoggingInfo",params,undefined,true); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,true); 
			copyArg(msg,"Replace",params,undefined,false); 
			

			svc.updateMaintenanceWindowTask(params,cb);
		}

		
		service.UpdateManagedInstanceRole=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"IamRole",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"IamRole",params,undefined,false); 
			

			svc.updateManagedInstanceRole(params,cb);
		}

		
		service.UpdateOpsItem=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OpsItemId",params,undefined,false); 
			
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"OperationalData",params,undefined,true); 
			copyArg(msg,"OperationalDataToDelete",params,undefined,false); 
			copyArg(msg,"Notifications",params,undefined,true); 
			copyArg(msg,"Priority",params,undefined,false); 
			copyArg(msg,"RelatedOpsItems",params,undefined,true); 
			copyArg(msg,"Status",params,undefined,false); 
			copyArg(msg,"OpsItemId",params,undefined,false); 
			copyArg(msg,"Title",params,undefined,false); 
			copyArg(msg,"Category",params,undefined,false); 
			copyArg(msg,"Severity",params,undefined,false); 
			copyArg(msg,"ActualStartTime",params,undefined,false); 
			copyArg(msg,"ActualEndTime",params,undefined,false); 
			copyArg(msg,"PlannedStartTime",params,undefined,false); 
			copyArg(msg,"PlannedEndTime",params,undefined,false); 
			

			svc.updateOpsItem(params,cb);
		}

		
		service.UpdateOpsMetadata=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OpsMetadataArn",params,undefined,false); 
			
			copyArg(msg,"OpsMetadataArn",params,undefined,false); 
			copyArg(msg,"MetadataToUpdate",params,undefined,true); 
			copyArg(msg,"KeysToDelete",params,undefined,false); 
			

			svc.updateOpsMetadata(params,cb);
		}

		
		service.UpdatePatchBaseline=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BaselineId",params,undefined,false); 
			
			copyArg(msg,"BaselineId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"GlobalFilters",params,undefined,true); 
			copyArg(msg,"ApprovalRules",params,undefined,true); 
			copyArg(msg,"ApprovedPatches",params,undefined,true); 
			copyArg(msg,"ApprovedPatchesComplianceLevel",params,undefined,false); 
			copyArg(msg,"ApprovedPatchesEnableNonSecurity",params,undefined,false); 
			copyArg(msg,"RejectedPatches",params,undefined,true); 
			copyArg(msg,"RejectedPatchesAction",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Sources",params,undefined,true); 
			copyArg(msg,"Replace",params,undefined,false); 
			

			svc.updatePatchBaseline(params,cb);
		}

		
		service.UpdateResourceDataSync=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SyncName",params,undefined,false); 
			copyArg(n,"SyncType",params,undefined,false); 
			copyArg(n,"SyncSource",params,undefined,true); 
			
			copyArg(msg,"SyncName",params,undefined,false); 
			copyArg(msg,"SyncType",params,undefined,false); 
			copyArg(msg,"SyncSource",params,undefined,true); 
			

			svc.updateResourceDataSync(params,cb);
		}

		
		service.UpdateServiceSetting=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SettingId",params,undefined,false); 
			copyArg(n,"SettingValue",params,undefined,false); 
			
			copyArg(msg,"SettingId",params,undefined,false); 
			copyArg(msg,"SettingValue",params,undefined,false); 
			

			svc.updateServiceSetting(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS SSM", AmazonAPINode);

};
