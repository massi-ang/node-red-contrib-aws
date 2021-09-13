
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

		var awsService = new AWS.AuditManager( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.AuditManager(msg.AWSConfig) : awsService;

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
		
			service.AssociateAssessmentReportEvidenceFolder=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"evidenceFolderId",params,undefined,false); 
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"evidenceFolderId",params,undefined,false); 
			
			copyArgs(msg,"assessmentId",params,undefined,false); 
			copyArgs(msg,"evidenceFolderId",params,undefined,false); 
			

			svc.associateAssessmentReportEvidenceFolder(params,cb);
		}
			service.BatchAssociateAssessmentReportEvidence=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"evidenceFolderId",params,undefined,false); 
			copyArgs(n,"evidenceIds",params,undefined,true); 
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"evidenceFolderId",params,undefined,false); 
			copyArgs(n,"evidenceIds",params,undefined,true); 
			
			copyArgs(msg,"assessmentId",params,undefined,false); 
			copyArgs(msg,"evidenceFolderId",params,undefined,false); 
			copyArgs(msg,"evidenceIds",params,undefined,true); 
			

			svc.batchAssociateAssessmentReportEvidence(params,cb);
		}
			service.BatchCreateDelegationByAssessment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"createDelegationRequests",params,undefined,false); 
			copyArgs(n,"assessmentId",params,undefined,false); 
			
			copyArgs(n,"createDelegationRequests",params,undefined,false); 
			copyArgs(n,"assessmentId",params,undefined,false); 
			
			copyArgs(msg,"createDelegationRequests",params,undefined,false); 
			copyArgs(msg,"assessmentId",params,undefined,false); 
			

			svc.batchCreateDelegationByAssessment(params,cb);
		}
			service.BatchDeleteDelegationByAssessment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"delegationIds",params,undefined,false); 
			copyArgs(n,"assessmentId",params,undefined,false); 
			
			copyArgs(n,"delegationIds",params,undefined,false); 
			copyArgs(n,"assessmentId",params,undefined,false); 
			
			copyArgs(msg,"delegationIds",params,undefined,false); 
			copyArgs(msg,"assessmentId",params,undefined,false); 
			

			svc.batchDeleteDelegationByAssessment(params,cb);
		}
			service.BatchDisassociateAssessmentReportEvidence=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"evidenceFolderId",params,undefined,false); 
			copyArgs(n,"evidenceIds",params,undefined,true); 
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"evidenceFolderId",params,undefined,false); 
			copyArgs(n,"evidenceIds",params,undefined,true); 
			
			copyArgs(msg,"assessmentId",params,undefined,false); 
			copyArgs(msg,"evidenceFolderId",params,undefined,false); 
			copyArgs(msg,"evidenceIds",params,undefined,true); 
			

			svc.batchDisassociateAssessmentReportEvidence(params,cb);
		}
			service.BatchImportEvidenceToAssessmentControl=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"controlSetId",params,undefined,false); 
			copyArgs(n,"controlId",params,undefined,false); 
			copyArgs(n,"manualEvidence",params,undefined,false); 
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"controlSetId",params,undefined,false); 
			copyArgs(n,"controlId",params,undefined,false); 
			copyArgs(n,"manualEvidence",params,undefined,false); 
			
			copyArgs(msg,"assessmentId",params,undefined,false); 
			copyArgs(msg,"controlSetId",params,undefined,false); 
			copyArgs(msg,"controlId",params,undefined,false); 
			copyArgs(msg,"manualEvidence",params,undefined,false); 
			

			svc.batchImportEvidenceToAssessmentControl(params,cb);
		}
			service.CreateAssessment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"assessmentReportsDestination",params,undefined,true); 
			copyArgs(n,"scope",params,undefined,true); 
			copyArgs(n,"roles",params,undefined,true); 
			copyArgs(n,"frameworkId",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"assessmentReportsDestination",params,undefined,true); 
			copyArgs(n,"scope",params,undefined,true); 
			copyArgs(n,"roles",params,undefined,true); 
			copyArgs(n,"frameworkId",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"assessmentReportsDestination",params,undefined,true); 
			copyArgs(msg,"scope",params,undefined,true); 
			copyArgs(msg,"roles",params,undefined,true); 
			copyArgs(msg,"frameworkId",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createAssessment(params,cb);
		}
			service.CreateAssessmentFramework=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"controlSets",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"complianceType",params,undefined,false); 
			copyArgs(n,"controlSets",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"complianceType",params,undefined,false); 
			copyArgs(msg,"controlSets",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createAssessmentFramework(params,cb);
		}
			service.CreateAssessmentReport=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"assessmentId",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"assessmentId",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"assessmentId",params,undefined,false); 
			

			svc.createAssessmentReport(params,cb);
		}
			service.CreateControl=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"controlMappingSources",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"testingInformation",params,undefined,false); 
			copyArgs(n,"actionPlanTitle",params,undefined,false); 
			copyArgs(n,"actionPlanInstructions",params,undefined,false); 
			copyArgs(n,"controlMappingSources",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"testingInformation",params,undefined,false); 
			copyArgs(msg,"actionPlanTitle",params,undefined,false); 
			copyArgs(msg,"actionPlanInstructions",params,undefined,false); 
			copyArgs(msg,"controlMappingSources",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createControl(params,cb);
		}
			service.DeleteAssessment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			
			copyArgs(msg,"assessmentId",params,undefined,false); 
			

			svc.deleteAssessment(params,cb);
		}
			service.DeleteAssessmentFramework=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"frameworkId",params,undefined,false); 
			
			copyArgs(n,"frameworkId",params,undefined,false); 
			
			copyArgs(msg,"frameworkId",params,undefined,false); 
			

			svc.deleteAssessmentFramework(params,cb);
		}
			service.DeleteAssessmentReport=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"assessmentReportId",params,undefined,false); 
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"assessmentReportId",params,undefined,false); 
			
			copyArgs(msg,"assessmentId",params,undefined,false); 
			copyArgs(msg,"assessmentReportId",params,undefined,false); 
			

			svc.deleteAssessmentReport(params,cb);
		}
			service.DeleteControl=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"controlId",params,undefined,false); 
			
			copyArgs(n,"controlId",params,undefined,false); 
			
			copyArgs(msg,"controlId",params,undefined,false); 
			

			svc.deleteControl(params,cb);
		}
			service.DeregisterAccount=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.deregisterAccount(params,cb);
		}
			service.DeregisterOrganizationAdminAccount=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"adminAccountId",params,undefined,false); 
			
			copyArgs(msg,"adminAccountId",params,undefined,false); 
			

			svc.deregisterOrganizationAdminAccount(params,cb);
		}
			service.DisassociateAssessmentReportEvidenceFolder=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"evidenceFolderId",params,undefined,false); 
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"evidenceFolderId",params,undefined,false); 
			
			copyArgs(msg,"assessmentId",params,undefined,false); 
			copyArgs(msg,"evidenceFolderId",params,undefined,false); 
			

			svc.disassociateAssessmentReportEvidenceFolder(params,cb);
		}
			service.GetAccountStatus=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getAccountStatus(params,cb);
		}
			service.GetAssessment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			
			copyArgs(msg,"assessmentId",params,undefined,false); 
			

			svc.getAssessment(params,cb);
		}
			service.GetAssessmentFramework=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"frameworkId",params,undefined,false); 
			
			copyArgs(n,"frameworkId",params,undefined,false); 
			
			copyArgs(msg,"frameworkId",params,undefined,false); 
			

			svc.getAssessmentFramework(params,cb);
		}
			service.GetAssessmentReportUrl=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentReportId",params,undefined,false); 
			copyArgs(n,"assessmentId",params,undefined,false); 
			
			copyArgs(n,"assessmentReportId",params,undefined,false); 
			copyArgs(n,"assessmentId",params,undefined,false); 
			
			copyArgs(msg,"assessmentReportId",params,undefined,false); 
			copyArgs(msg,"assessmentId",params,undefined,false); 
			

			svc.getAssessmentReportUrl(params,cb);
		}
			service.GetChangeLogs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"controlSetId",params,undefined,false); 
			copyArgs(n,"controlId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"assessmentId",params,undefined,false); 
			copyArgs(msg,"controlSetId",params,undefined,false); 
			copyArgs(msg,"controlId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getChangeLogs(params,cb);
		}
			service.GetControl=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"controlId",params,undefined,false); 
			
			copyArgs(n,"controlId",params,undefined,false); 
			
			copyArgs(msg,"controlId",params,undefined,false); 
			

			svc.getControl(params,cb);
		}
			service.GetDelegations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getDelegations(params,cb);
		}
			service.GetEvidence=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"controlSetId",params,undefined,false); 
			copyArgs(n,"evidenceFolderId",params,undefined,false); 
			copyArgs(n,"evidenceId",params,undefined,false); 
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"controlSetId",params,undefined,false); 
			copyArgs(n,"evidenceFolderId",params,undefined,false); 
			copyArgs(n,"evidenceId",params,undefined,false); 
			
			copyArgs(msg,"assessmentId",params,undefined,false); 
			copyArgs(msg,"controlSetId",params,undefined,false); 
			copyArgs(msg,"evidenceFolderId",params,undefined,false); 
			copyArgs(msg,"evidenceId",params,undefined,false); 
			

			svc.getEvidence(params,cb);
		}
			service.GetEvidenceByEvidenceFolder=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"controlSetId",params,undefined,false); 
			copyArgs(n,"evidenceFolderId",params,undefined,false); 
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"controlSetId",params,undefined,false); 
			copyArgs(n,"evidenceFolderId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"assessmentId",params,undefined,false); 
			copyArgs(msg,"controlSetId",params,undefined,false); 
			copyArgs(msg,"evidenceFolderId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getEvidenceByEvidenceFolder(params,cb);
		}
			service.GetEvidenceFolder=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"controlSetId",params,undefined,false); 
			copyArgs(n,"evidenceFolderId",params,undefined,false); 
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"controlSetId",params,undefined,false); 
			copyArgs(n,"evidenceFolderId",params,undefined,false); 
			
			copyArgs(msg,"assessmentId",params,undefined,false); 
			copyArgs(msg,"controlSetId",params,undefined,false); 
			copyArgs(msg,"evidenceFolderId",params,undefined,false); 
			

			svc.getEvidenceFolder(params,cb);
		}
			service.GetEvidenceFoldersByAssessment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"assessmentId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getEvidenceFoldersByAssessment(params,cb);
		}
			service.GetEvidenceFoldersByAssessmentControl=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"controlSetId",params,undefined,false); 
			copyArgs(n,"controlId",params,undefined,false); 
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"controlSetId",params,undefined,false); 
			copyArgs(n,"controlId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"assessmentId",params,undefined,false); 
			copyArgs(msg,"controlSetId",params,undefined,false); 
			copyArgs(msg,"controlId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getEvidenceFoldersByAssessmentControl(params,cb);
		}
			service.GetOrganizationAdminAccount=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getOrganizationAdminAccount(params,cb);
		}
			service.GetServicesInScope=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getServicesInScope(params,cb);
		}
			service.GetSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"attribute",params,undefined,false); 
			
			copyArgs(n,"attribute",params,undefined,false); 
			
			copyArgs(msg,"attribute",params,undefined,false); 
			

			svc.getSettings(params,cb);
		}
			service.ListAssessmentFrameworks=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"frameworkType",params,undefined,false); 
			
			copyArgs(n,"frameworkType",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"frameworkType",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listAssessmentFrameworks(params,cb);
		}
			service.ListAssessmentReports=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listAssessmentReports(params,cb);
		}
			service.ListAssessments=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listAssessments(params,cb);
		}
			service.ListControls=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"controlType",params,undefined,false); 
			
			copyArgs(n,"controlType",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"controlType",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listControls(params,cb);
		}
			service.ListKeywordsForDataSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"source",params,undefined,false); 
			
			copyArgs(n,"source",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"source",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listKeywordsForDataSource(params,cb);
		}
			service.ListNotifications=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listNotifications(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.RegisterAccount=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"kmsKey",params,undefined,false); 
			copyArgs(n,"delegatedAdminAccount",params,undefined,false); 
			
			copyArgs(msg,"kmsKey",params,undefined,false); 
			copyArgs(msg,"delegatedAdminAccount",params,undefined,false); 
			

			svc.registerAccount(params,cb);
		}
			service.RegisterOrganizationAdminAccount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"adminAccountId",params,undefined,false); 
			
			copyArgs(n,"adminAccountId",params,undefined,false); 
			
			copyArgs(msg,"adminAccountId",params,undefined,false); 
			

			svc.registerOrganizationAdminAccount(params,cb);
		}
			service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
			service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
			service.UpdateAssessment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"scope",params,undefined,true); 
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"assessmentName",params,undefined,false); 
			copyArgs(n,"assessmentDescription",params,undefined,false); 
			copyArgs(n,"scope",params,undefined,true); 
			copyArgs(n,"assessmentReportsDestination",params,undefined,true); 
			copyArgs(n,"roles",params,undefined,true); 
			
			copyArgs(msg,"assessmentId",params,undefined,false); 
			copyArgs(msg,"assessmentName",params,undefined,false); 
			copyArgs(msg,"assessmentDescription",params,undefined,false); 
			copyArgs(msg,"scope",params,undefined,true); 
			copyArgs(msg,"assessmentReportsDestination",params,undefined,true); 
			copyArgs(msg,"roles",params,undefined,true); 
			

			svc.updateAssessment(params,cb);
		}
			service.UpdateAssessmentControl=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"controlSetId",params,undefined,false); 
			copyArgs(n,"controlId",params,undefined,false); 
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"controlSetId",params,undefined,false); 
			copyArgs(n,"controlId",params,undefined,false); 
			copyArgs(n,"controlStatus",params,undefined,false); 
			copyArgs(n,"commentBody",params,undefined,false); 
			
			copyArgs(msg,"assessmentId",params,undefined,false); 
			copyArgs(msg,"controlSetId",params,undefined,false); 
			copyArgs(msg,"controlId",params,undefined,false); 
			copyArgs(msg,"controlStatus",params,undefined,false); 
			copyArgs(msg,"commentBody",params,undefined,false); 
			

			svc.updateAssessmentControl(params,cb);
		}
			service.UpdateAssessmentControlSetStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"controlSetId",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			copyArgs(n,"comment",params,undefined,false); 
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"controlSetId",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			copyArgs(n,"comment",params,undefined,false); 
			
			copyArgs(msg,"assessmentId",params,undefined,false); 
			copyArgs(msg,"controlSetId",params,undefined,false); 
			copyArgs(msg,"status",params,undefined,false); 
			copyArgs(msg,"comment",params,undefined,false); 
			

			svc.updateAssessmentControlSetStatus(params,cb);
		}
			service.UpdateAssessmentFramework=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"frameworkId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"controlSets",params,undefined,false); 
			
			copyArgs(n,"frameworkId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"complianceType",params,undefined,false); 
			copyArgs(n,"controlSets",params,undefined,false); 
			
			copyArgs(msg,"frameworkId",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"complianceType",params,undefined,false); 
			copyArgs(msg,"controlSets",params,undefined,false); 
			

			svc.updateAssessmentFramework(params,cb);
		}
			service.UpdateAssessmentStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			
			copyArgs(n,"assessmentId",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			
			copyArgs(msg,"assessmentId",params,undefined,false); 
			copyArgs(msg,"status",params,undefined,false); 
			

			svc.updateAssessmentStatus(params,cb);
		}
			service.UpdateControl=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"controlId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"controlMappingSources",params,undefined,true); 
			
			copyArgs(n,"controlId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"testingInformation",params,undefined,false); 
			copyArgs(n,"actionPlanTitle",params,undefined,false); 
			copyArgs(n,"actionPlanInstructions",params,undefined,false); 
			copyArgs(n,"controlMappingSources",params,undefined,true); 
			
			copyArgs(msg,"controlId",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"testingInformation",params,undefined,false); 
			copyArgs(msg,"actionPlanTitle",params,undefined,false); 
			copyArgs(msg,"actionPlanInstructions",params,undefined,false); 
			copyArgs(msg,"controlMappingSources",params,undefined,true); 
			

			svc.updateControl(params,cb);
		}
			service.UpdateSettings=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"snsTopic",params,undefined,false); 
			copyArgs(n,"defaultAssessmentReportsDestination",params,undefined,true); 
			copyArgs(n,"defaultProcessOwners",params,undefined,true); 
			copyArgs(n,"kmsKey",params,undefined,false); 
			
			copyArgs(msg,"snsTopic",params,undefined,false); 
			copyArgs(msg,"defaultAssessmentReportsDestination",params,undefined,true); 
			copyArgs(msg,"defaultProcessOwners",params,undefined,true); 
			copyArgs(msg,"kmsKey",params,undefined,false); 
			

			svc.updateSettings(params,cb);
		}
			service.ValidateAssessmentReportIntegrity=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"s3RelativePath",params,undefined,false); 
			
			copyArgs(n,"s3RelativePath",params,undefined,false); 
			
			copyArgs(msg,"s3RelativePath",params,undefined,false); 
			

			svc.validateAssessmentReportIntegrity(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS AuditManager", AmazonAPINode);

};
