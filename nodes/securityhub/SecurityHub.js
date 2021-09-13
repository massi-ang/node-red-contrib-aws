
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

		var awsService = new AWS.SecurityHub( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.SecurityHub(msg.AWSConfig) : awsService;

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
		
			service.AcceptAdministratorInvitation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AdministratorId",params,undefined,false); 
			copyArgs(n,"InvitationId",params,undefined,false); 
			
			copyArgs(n,"AdministratorId",params,undefined,false); 
			copyArgs(n,"InvitationId",params,undefined,false); 
			
			copyArgs(msg,"AdministratorId",params,undefined,false); 
			copyArgs(msg,"InvitationId",params,undefined,false); 
			

			svc.acceptAdministratorInvitation(params,cb);
		}
			service.AcceptInvitation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MasterId",params,undefined,false); 
			copyArgs(n,"InvitationId",params,undefined,false); 
			
			copyArgs(n,"MasterId",params,undefined,false); 
			copyArgs(n,"InvitationId",params,undefined,false); 
			
			copyArgs(msg,"MasterId",params,undefined,false); 
			copyArgs(msg,"InvitationId",params,undefined,false); 
			

			svc.acceptInvitation(params,cb);
		}
			service.BatchDisableStandards=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StandardsSubscriptionArns",params,undefined,true); 
			
			copyArgs(n,"StandardsSubscriptionArns",params,undefined,true); 
			
			copyArgs(msg,"StandardsSubscriptionArns",params,undefined,true); 
			

			svc.batchDisableStandards(params,cb);
		}
			service.BatchEnableStandards=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StandardsSubscriptionRequests",params,undefined,false); 
			
			copyArgs(n,"StandardsSubscriptionRequests",params,undefined,false); 
			
			copyArgs(msg,"StandardsSubscriptionRequests",params,undefined,false); 
			

			svc.batchEnableStandards(params,cb);
		}
			service.BatchImportFindings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Findings",params,undefined,false); 
			
			copyArgs(n,"Findings",params,undefined,false); 
			
			copyArgs(msg,"Findings",params,undefined,false); 
			

			svc.batchImportFindings(params,cb);
		}
			service.BatchUpdateFindings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FindingIdentifiers",params,undefined,true); 
			
			copyArgs(n,"FindingIdentifiers",params,undefined,true); 
			copyArgs(n,"Note",params,undefined,true); 
			copyArgs(n,"Severity",params,undefined,false); 
			copyArgs(n,"VerificationState",params,undefined,false); 
			copyArgs(Number(n),"Confidence",params,undefined,false); 
			copyArgs(Number(n),"Criticality",params,undefined,false); 
			copyArgs(n,"Types",params,undefined,true); 
			copyArgs(n,"UserDefinedFields",params,undefined,true); 
			copyArgs(n,"Workflow",params,undefined,false); 
			copyArgs(n,"RelatedFindings",params,undefined,true); 
			
			copyArgs(msg,"FindingIdentifiers",params,undefined,true); 
			copyArgs(msg,"Note",params,undefined,true); 
			copyArgs(msg,"Severity",params,undefined,false); 
			copyArgs(msg,"VerificationState",params,undefined,false); 
			copyArgs(msg,"Confidence",params,undefined,false); 
			copyArgs(msg,"Criticality",params,undefined,false); 
			copyArgs(msg,"Types",params,undefined,true); 
			copyArgs(msg,"UserDefinedFields",params,undefined,true); 
			copyArgs(msg,"Workflow",params,undefined,false); 
			copyArgs(msg,"RelatedFindings",params,undefined,true); 
			

			svc.batchUpdateFindings(params,cb);
		}
			service.CreateActionTarget=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.createActionTarget(params,cb);
		}
			service.CreateInsight=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"GroupByAttribute",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"GroupByAttribute",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"GroupByAttribute",params,undefined,false); 
			

			svc.createInsight(params,cb);
		}
			service.CreateMembers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountDetails",params,undefined,false); 
			
			copyArgs(n,"AccountDetails",params,undefined,false); 
			
			copyArgs(msg,"AccountDetails",params,undefined,false); 
			

			svc.createMembers(params,cb);
		}
			service.DeclineInvitations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountIds",params,undefined,true); 
			
			copyArgs(n,"AccountIds",params,undefined,true); 
			
			copyArgs(msg,"AccountIds",params,undefined,true); 
			

			svc.declineInvitations(params,cb);
		}
			service.DeleteActionTarget=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ActionTargetArn",params,undefined,false); 
			
			copyArgs(n,"ActionTargetArn",params,undefined,false); 
			
			copyArgs(msg,"ActionTargetArn",params,undefined,false); 
			

			svc.deleteActionTarget(params,cb);
		}
			service.DeleteInsight=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InsightArn",params,undefined,false); 
			
			copyArgs(n,"InsightArn",params,undefined,false); 
			
			copyArgs(msg,"InsightArn",params,undefined,false); 
			

			svc.deleteInsight(params,cb);
		}
			service.DeleteInvitations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountIds",params,undefined,true); 
			
			copyArgs(n,"AccountIds",params,undefined,true); 
			
			copyArgs(msg,"AccountIds",params,undefined,true); 
			

			svc.deleteInvitations(params,cb);
		}
			service.DeleteMembers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountIds",params,undefined,true); 
			
			copyArgs(n,"AccountIds",params,undefined,true); 
			
			copyArgs(msg,"AccountIds",params,undefined,true); 
			

			svc.deleteMembers(params,cb);
		}
			service.DescribeActionTargets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ActionTargetArns",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ActionTargetArns",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeActionTargets(params,cb);
		}
			service.DescribeHub=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"HubArn",params,undefined,false); 
			
			copyArgs(msg,"HubArn",params,undefined,false); 
			

			svc.describeHub(params,cb);
		}
			service.DescribeOrganizationConfiguration=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeOrganizationConfiguration(params,cb);
		}
			service.DescribeProducts=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"ProductArn",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"ProductArn",params,undefined,false); 
			

			svc.describeProducts(params,cb);
		}
			service.DescribeStandards=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeStandards(params,cb);
		}
			service.DescribeStandardsControls=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StandardsSubscriptionArn",params,undefined,false); 
			
			copyArgs(n,"StandardsSubscriptionArn",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"StandardsSubscriptionArn",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeStandardsControls(params,cb);
		}
			service.DisableImportFindingsForProduct=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProductSubscriptionArn",params,undefined,false); 
			
			copyArgs(n,"ProductSubscriptionArn",params,undefined,false); 
			
			copyArgs(msg,"ProductSubscriptionArn",params,undefined,false); 
			

			svc.disableImportFindingsForProduct(params,cb);
		}
			service.DisableOrganizationAdminAccount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AdminAccountId",params,undefined,false); 
			
			copyArgs(n,"AdminAccountId",params,undefined,false); 
			
			copyArgs(msg,"AdminAccountId",params,undefined,false); 
			

			svc.disableOrganizationAdminAccount(params,cb);
		}
			service.DisableSecurityHub=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.disableSecurityHub(params,cb);
		}
			service.DisassociateFromAdministratorAccount=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.disassociateFromAdministratorAccount(params,cb);
		}
			service.DisassociateFromMasterAccount=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.disassociateFromMasterAccount(params,cb);
		}
			service.DisassociateMembers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountIds",params,undefined,true); 
			
			copyArgs(n,"AccountIds",params,undefined,true); 
			
			copyArgs(msg,"AccountIds",params,undefined,true); 
			

			svc.disassociateMembers(params,cb);
		}
			service.EnableImportFindingsForProduct=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProductArn",params,undefined,false); 
			
			copyArgs(n,"ProductArn",params,undefined,false); 
			
			copyArgs(msg,"ProductArn",params,undefined,false); 
			

			svc.enableImportFindingsForProduct(params,cb);
		}
			service.EnableOrganizationAdminAccount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AdminAccountId",params,undefined,false); 
			
			copyArgs(n,"AdminAccountId",params,undefined,false); 
			
			copyArgs(msg,"AdminAccountId",params,undefined,false); 
			

			svc.enableOrganizationAdminAccount(params,cb);
		}
			service.EnableSecurityHub=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(Boolean(n),"EnableDefaultStandards",params,undefined,false); 
			
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"EnableDefaultStandards",params,undefined,false); 
			

			svc.enableSecurityHub(params,cb);
		}
			service.GetAdministratorAccount=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getAdministratorAccount(params,cb);
		}
			service.GetEnabledStandards=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"StandardsSubscriptionArns",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"StandardsSubscriptionArns",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.getEnabledStandards(params,cb);
		}
			service.GetFindings=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"SortCriteria",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"SortCriteria",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.getFindings(params,cb);
		}
			service.GetInsightResults=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InsightArn",params,undefined,false); 
			
			copyArgs(n,"InsightArn",params,undefined,false); 
			
			copyArgs(msg,"InsightArn",params,undefined,false); 
			

			svc.getInsightResults(params,cb);
		}
			service.GetInsights=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"InsightArns",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"InsightArns",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.getInsights(params,cb);
		}
			service.GetInvitationsCount=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getInvitationsCount(params,cb);
		}
			service.GetMasterAccount=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getMasterAccount(params,cb);
		}
			service.GetMembers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountIds",params,undefined,true); 
			
			copyArgs(n,"AccountIds",params,undefined,true); 
			
			copyArgs(msg,"AccountIds",params,undefined,true); 
			

			svc.getMembers(params,cb);
		}
			service.InviteMembers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountIds",params,undefined,true); 
			
			copyArgs(n,"AccountIds",params,undefined,true); 
			
			copyArgs(msg,"AccountIds",params,undefined,true); 
			

			svc.inviteMembers(params,cb);
		}
			service.ListEnabledProductsForImport=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listEnabledProductsForImport(params,cb);
		}
			service.ListInvitations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listInvitations(params,cb);
		}
			service.ListMembers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"OnlyAssociated",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"OnlyAssociated",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listMembers(params,cb);
		}
			service.ListOrganizationAdminAccounts=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listOrganizationAdminAccounts(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
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
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
			service.UpdateActionTarget=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ActionTargetArn",params,undefined,false); 
			
			copyArgs(n,"ActionTargetArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(msg,"ActionTargetArn",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			

			svc.updateActionTarget(params,cb);
		}
			service.UpdateFindings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Filters",params,undefined,true); 
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"Note",params,undefined,true); 
			copyArgs(n,"RecordState",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"Note",params,undefined,true); 
			copyArgs(msg,"RecordState",params,undefined,false); 
			

			svc.updateFindings(params,cb);
		}
			service.UpdateInsight=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InsightArn",params,undefined,false); 
			
			copyArgs(n,"InsightArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"GroupByAttribute",params,undefined,false); 
			
			copyArgs(msg,"InsightArn",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"GroupByAttribute",params,undefined,false); 
			

			svc.updateInsight(params,cb);
		}
			service.UpdateOrganizationConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(Boolean(n),"AutoEnable",params,undefined,false); 
			
			copyArgs(Boolean(n),"AutoEnable",params,undefined,false); 
			
			copyArgs(msg,"AutoEnable",params,undefined,false); 
			

			svc.updateOrganizationConfiguration(params,cb);
		}
			service.UpdateSecurityHubConfiguration=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"AutoEnableControls",params,undefined,false); 
			
			copyArgs(msg,"AutoEnableControls",params,undefined,false); 
			

			svc.updateSecurityHubConfiguration(params,cb);
		}
			service.UpdateStandardsControl=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StandardsControlArn",params,undefined,false); 
			
			copyArgs(n,"StandardsControlArn",params,undefined,false); 
			copyArgs(n,"ControlStatus",params,undefined,false); 
			copyArgs(n,"DisabledReason",params,undefined,false); 
			
			copyArgs(msg,"StandardsControlArn",params,undefined,false); 
			copyArgs(msg,"ControlStatus",params,undefined,false); 
			copyArgs(msg,"DisabledReason",params,undefined,false); 
			

			svc.updateStandardsControl(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS SecurityHub", AmazonAPINode);

};
