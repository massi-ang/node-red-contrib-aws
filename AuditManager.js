
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

		var awsService = new AWS.AuditManager( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.AuditManager(msg.AWSConfig) : awsService;

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

		
		service.AssociateAssessmentReportEvidenceFolder=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentId",params,undefined,false); 
			copyArg(n,"evidenceFolderId",params,undefined,false); 
			
			copyArg(msg,"assessmentId",params,undefined,false); 
			copyArg(msg,"evidenceFolderId",params,undefined,false); 
			

			svc.associateAssessmentReportEvidenceFolder(params,cb);
		}

		
		service.BatchAssociateAssessmentReportEvidence=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentId",params,undefined,false); 
			copyArg(n,"evidenceFolderId",params,undefined,false); 
			copyArg(n,"evidenceIds",params,undefined,true); 
			
			copyArg(msg,"assessmentId",params,undefined,false); 
			copyArg(msg,"evidenceFolderId",params,undefined,false); 
			copyArg(msg,"evidenceIds",params,undefined,true); 
			

			svc.batchAssociateAssessmentReportEvidence(params,cb);
		}

		
		service.BatchCreateDelegationByAssessment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"createDelegationRequests",params,undefined,false); 
			copyArg(n,"assessmentId",params,undefined,false); 
			
			copyArg(msg,"createDelegationRequests",params,undefined,false); 
			copyArg(msg,"assessmentId",params,undefined,false); 
			

			svc.batchCreateDelegationByAssessment(params,cb);
		}

		
		service.BatchDeleteDelegationByAssessment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"delegationIds",params,undefined,false); 
			copyArg(n,"assessmentId",params,undefined,false); 
			
			copyArg(msg,"delegationIds",params,undefined,false); 
			copyArg(msg,"assessmentId",params,undefined,false); 
			

			svc.batchDeleteDelegationByAssessment(params,cb);
		}

		
		service.BatchDisassociateAssessmentReportEvidence=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentId",params,undefined,false); 
			copyArg(n,"evidenceFolderId",params,undefined,false); 
			copyArg(n,"evidenceIds",params,undefined,true); 
			
			copyArg(msg,"assessmentId",params,undefined,false); 
			copyArg(msg,"evidenceFolderId",params,undefined,false); 
			copyArg(msg,"evidenceIds",params,undefined,true); 
			

			svc.batchDisassociateAssessmentReportEvidence(params,cb);
		}

		
		service.BatchImportEvidenceToAssessmentControl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentId",params,undefined,false); 
			copyArg(n,"controlSetId",params,undefined,false); 
			copyArg(n,"controlId",params,undefined,false); 
			copyArg(n,"manualEvidence",params,undefined,false); 
			
			copyArg(msg,"assessmentId",params,undefined,false); 
			copyArg(msg,"controlSetId",params,undefined,false); 
			copyArg(msg,"controlId",params,undefined,false); 
			copyArg(msg,"manualEvidence",params,undefined,false); 
			

			svc.batchImportEvidenceToAssessmentControl(params,cb);
		}

		
		service.CreateAssessment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"assessmentReportsDestination",params,undefined,true); 
			copyArg(n,"scope",params,undefined,true); 
			copyArg(n,"roles",params,undefined,true); 
			copyArg(n,"frameworkId",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"assessmentReportsDestination",params,undefined,true); 
			copyArg(msg,"scope",params,undefined,true); 
			copyArg(msg,"roles",params,undefined,true); 
			copyArg(msg,"frameworkId",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createAssessment(params,cb);
		}

		
		service.CreateAssessmentFramework=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"controlSets",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"complianceType",params,undefined,false); 
			copyArg(msg,"controlSets",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createAssessmentFramework(params,cb);
		}

		
		service.CreateAssessmentReport=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"assessmentId",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"assessmentId",params,undefined,false); 
			

			svc.createAssessmentReport(params,cb);
		}

		
		service.CreateControl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"controlMappingSources",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"testingInformation",params,undefined,false); 
			copyArg(msg,"actionPlanTitle",params,undefined,false); 
			copyArg(msg,"actionPlanInstructions",params,undefined,false); 
			copyArg(msg,"controlMappingSources",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createControl(params,cb);
		}

		
		service.DeleteAssessment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentId",params,undefined,false); 
			
			copyArg(msg,"assessmentId",params,undefined,false); 
			

			svc.deleteAssessment(params,cb);
		}

		
		service.DeleteAssessmentFramework=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"frameworkId",params,undefined,false); 
			
			copyArg(msg,"frameworkId",params,undefined,false); 
			

			svc.deleteAssessmentFramework(params,cb);
		}

		
		service.DeleteAssessmentReport=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentId",params,undefined,false); 
			copyArg(n,"assessmentReportId",params,undefined,false); 
			
			copyArg(msg,"assessmentId",params,undefined,false); 
			copyArg(msg,"assessmentReportId",params,undefined,false); 
			

			svc.deleteAssessmentReport(params,cb);
		}

		
		service.DeleteControl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"controlId",params,undefined,false); 
			
			copyArg(msg,"controlId",params,undefined,false); 
			

			svc.deleteControl(params,cb);
		}

		
		service.DeregisterAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.deregisterAccount(params,cb);
		}

		
		service.DeregisterOrganizationAdminAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"adminAccountId",params,undefined,false); 
			

			svc.deregisterOrganizationAdminAccount(params,cb);
		}

		
		service.DisassociateAssessmentReportEvidenceFolder=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentId",params,undefined,false); 
			copyArg(n,"evidenceFolderId",params,undefined,false); 
			
			copyArg(msg,"assessmentId",params,undefined,false); 
			copyArg(msg,"evidenceFolderId",params,undefined,false); 
			

			svc.disassociateAssessmentReportEvidenceFolder(params,cb);
		}

		
		service.GetAccountStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getAccountStatus(params,cb);
		}

		
		service.GetAssessment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentId",params,undefined,false); 
			
			copyArg(msg,"assessmentId",params,undefined,false); 
			

			svc.getAssessment(params,cb);
		}

		
		service.GetAssessmentFramework=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"frameworkId",params,undefined,false); 
			
			copyArg(msg,"frameworkId",params,undefined,false); 
			

			svc.getAssessmentFramework(params,cb);
		}

		
		service.GetAssessmentReportUrl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentReportId",params,undefined,false); 
			copyArg(n,"assessmentId",params,undefined,false); 
			
			copyArg(msg,"assessmentReportId",params,undefined,false); 
			copyArg(msg,"assessmentId",params,undefined,false); 
			

			svc.getAssessmentReportUrl(params,cb);
		}

		
		service.GetChangeLogs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentId",params,undefined,false); 
			
			copyArg(msg,"assessmentId",params,undefined,false); 
			copyArg(msg,"controlSetId",params,undefined,false); 
			copyArg(msg,"controlId",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.getChangeLogs(params,cb);
		}

		
		service.GetControl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"controlId",params,undefined,false); 
			
			copyArg(msg,"controlId",params,undefined,false); 
			

			svc.getControl(params,cb);
		}

		
		service.GetDelegations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.getDelegations(params,cb);
		}

		
		service.GetEvidence=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentId",params,undefined,false); 
			copyArg(n,"controlSetId",params,undefined,false); 
			copyArg(n,"evidenceFolderId",params,undefined,false); 
			copyArg(n,"evidenceId",params,undefined,false); 
			
			copyArg(msg,"assessmentId",params,undefined,false); 
			copyArg(msg,"controlSetId",params,undefined,false); 
			copyArg(msg,"evidenceFolderId",params,undefined,false); 
			copyArg(msg,"evidenceId",params,undefined,false); 
			

			svc.getEvidence(params,cb);
		}

		
		service.GetEvidenceByEvidenceFolder=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentId",params,undefined,false); 
			copyArg(n,"controlSetId",params,undefined,false); 
			copyArg(n,"evidenceFolderId",params,undefined,false); 
			
			copyArg(msg,"assessmentId",params,undefined,false); 
			copyArg(msg,"controlSetId",params,undefined,false); 
			copyArg(msg,"evidenceFolderId",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.getEvidenceByEvidenceFolder(params,cb);
		}

		
		service.GetEvidenceFolder=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentId",params,undefined,false); 
			copyArg(n,"controlSetId",params,undefined,false); 
			copyArg(n,"evidenceFolderId",params,undefined,false); 
			
			copyArg(msg,"assessmentId",params,undefined,false); 
			copyArg(msg,"controlSetId",params,undefined,false); 
			copyArg(msg,"evidenceFolderId",params,undefined,false); 
			

			svc.getEvidenceFolder(params,cb);
		}

		
		service.GetEvidenceFoldersByAssessment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentId",params,undefined,false); 
			
			copyArg(msg,"assessmentId",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.getEvidenceFoldersByAssessment(params,cb);
		}

		
		service.GetEvidenceFoldersByAssessmentControl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentId",params,undefined,false); 
			copyArg(n,"controlSetId",params,undefined,false); 
			copyArg(n,"controlId",params,undefined,false); 
			
			copyArg(msg,"assessmentId",params,undefined,false); 
			copyArg(msg,"controlSetId",params,undefined,false); 
			copyArg(msg,"controlId",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.getEvidenceFoldersByAssessmentControl(params,cb);
		}

		
		service.GetOrganizationAdminAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getOrganizationAdminAccount(params,cb);
		}

		
		service.GetServicesInScope=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getServicesInScope(params,cb);
		}

		
		service.GetSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"attribute",params,undefined,false); 
			
			copyArg(msg,"attribute",params,undefined,false); 
			

			svc.getSettings(params,cb);
		}

		
		service.ListAssessmentFrameworks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"frameworkType",params,undefined,false); 
			
			copyArg(msg,"frameworkType",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listAssessmentFrameworks(params,cb);
		}

		
		service.ListAssessmentReports=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listAssessmentReports(params,cb);
		}

		
		service.ListAssessments=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listAssessments(params,cb);
		}

		
		service.ListControls=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"controlType",params,undefined,false); 
			
			copyArg(msg,"controlType",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listControls(params,cb);
		}

		
		service.ListKeywordsForDataSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"source",params,undefined,false); 
			
			copyArg(msg,"source",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listKeywordsForDataSource(params,cb);
		}

		
		service.ListNotifications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listNotifications(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.RegisterAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"kmsKey",params,undefined,false); 
			copyArg(msg,"delegatedAdminAccount",params,undefined,false); 
			

			svc.registerAccount(params,cb);
		}

		
		service.RegisterOrganizationAdminAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"adminAccountId",params,undefined,false); 
			
			copyArg(msg,"adminAccountId",params,undefined,false); 
			

			svc.registerOrganizationAdminAccount(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"tags",params,undefined,true); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"tagKeys",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateAssessment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentId",params,undefined,false); 
			copyArg(n,"scope",params,undefined,true); 
			
			copyArg(msg,"assessmentId",params,undefined,false); 
			copyArg(msg,"assessmentName",params,undefined,false); 
			copyArg(msg,"assessmentDescription",params,undefined,false); 
			copyArg(msg,"scope",params,undefined,true); 
			copyArg(msg,"assessmentReportsDestination",params,undefined,true); 
			copyArg(msg,"roles",params,undefined,true); 
			

			svc.updateAssessment(params,cb);
		}

		
		service.UpdateAssessmentControl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentId",params,undefined,false); 
			copyArg(n,"controlSetId",params,undefined,false); 
			copyArg(n,"controlId",params,undefined,false); 
			
			copyArg(msg,"assessmentId",params,undefined,false); 
			copyArg(msg,"controlSetId",params,undefined,false); 
			copyArg(msg,"controlId",params,undefined,false); 
			copyArg(msg,"controlStatus",params,undefined,false); 
			copyArg(msg,"commentBody",params,undefined,false); 
			

			svc.updateAssessmentControl(params,cb);
		}

		
		service.UpdateAssessmentControlSetStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentId",params,undefined,false); 
			copyArg(n,"controlSetId",params,undefined,false); 
			copyArg(n,"status",params,undefined,false); 
			copyArg(n,"comment",params,undefined,false); 
			
			copyArg(msg,"assessmentId",params,undefined,false); 
			copyArg(msg,"controlSetId",params,undefined,false); 
			copyArg(msg,"status",params,undefined,false); 
			copyArg(msg,"comment",params,undefined,false); 
			

			svc.updateAssessmentControlSetStatus(params,cb);
		}

		
		service.UpdateAssessmentFramework=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"frameworkId",params,undefined,false); 
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"controlSets",params,undefined,false); 
			
			copyArg(msg,"frameworkId",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"complianceType",params,undefined,false); 
			copyArg(msg,"controlSets",params,undefined,false); 
			

			svc.updateAssessmentFramework(params,cb);
		}

		
		service.UpdateAssessmentStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentId",params,undefined,false); 
			copyArg(n,"status",params,undefined,false); 
			
			copyArg(msg,"assessmentId",params,undefined,false); 
			copyArg(msg,"status",params,undefined,false); 
			

			svc.updateAssessmentStatus(params,cb);
		}

		
		service.UpdateControl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"controlId",params,undefined,false); 
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"controlMappingSources",params,undefined,true); 
			
			copyArg(msg,"controlId",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"testingInformation",params,undefined,false); 
			copyArg(msg,"actionPlanTitle",params,undefined,false); 
			copyArg(msg,"actionPlanInstructions",params,undefined,false); 
			copyArg(msg,"controlMappingSources",params,undefined,true); 
			

			svc.updateControl(params,cb);
		}

		
		service.UpdateSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"snsTopic",params,undefined,false); 
			copyArg(msg,"defaultAssessmentReportsDestination",params,undefined,true); 
			copyArg(msg,"defaultProcessOwners",params,undefined,true); 
			copyArg(msg,"kmsKey",params,undefined,false); 
			

			svc.updateSettings(params,cb);
		}

		
		service.ValidateAssessmentReportIntegrity=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"s3RelativePath",params,undefined,false); 
			
			copyArg(msg,"s3RelativePath",params,undefined,false); 
			

			svc.validateAssessmentReportIntegrity(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS AuditManager", AmazonAPINode);

};
