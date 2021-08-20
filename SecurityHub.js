
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

		var awsService = new AWS.SecurityHub( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.SecurityHub(msg.AWSConfig) : awsService;

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

		
		service.AcceptAdministratorInvitation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AdministratorId",params,undefined,false); 
			copyArg(n,"InvitationId",params,undefined,false); 
			
			copyArg(msg,"AdministratorId",params,undefined,false); 
			copyArg(msg,"InvitationId",params,undefined,false); 
			

			svc.acceptAdministratorInvitation(params,cb);
		}

		
		service.AcceptInvitation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MasterId",params,undefined,false); 
			copyArg(n,"InvitationId",params,undefined,false); 
			
			copyArg(msg,"MasterId",params,undefined,false); 
			copyArg(msg,"InvitationId",params,undefined,false); 
			

			svc.acceptInvitation(params,cb);
		}

		
		service.BatchDisableStandards=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StandardsSubscriptionArns",params,undefined,true); 
			
			copyArg(msg,"StandardsSubscriptionArns",params,undefined,true); 
			

			svc.batchDisableStandards(params,cb);
		}

		
		service.BatchEnableStandards=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StandardsSubscriptionRequests",params,undefined,false); 
			
			copyArg(msg,"StandardsSubscriptionRequests",params,undefined,false); 
			

			svc.batchEnableStandards(params,cb);
		}

		
		service.BatchImportFindings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Findings",params,undefined,false); 
			
			copyArg(msg,"Findings",params,undefined,false); 
			

			svc.batchImportFindings(params,cb);
		}

		
		service.BatchUpdateFindings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FindingIdentifiers",params,undefined,true); 
			
			copyArg(msg,"FindingIdentifiers",params,undefined,true); 
			copyArg(msg,"Note",params,undefined,true); 
			copyArg(msg,"Severity",params,undefined,false); 
			copyArg(msg,"VerificationState",params,undefined,false); 
			copyArg(msg,"Confidence",params,undefined,false); 
			copyArg(msg,"Criticality",params,undefined,false); 
			copyArg(msg,"Types",params,undefined,true); 
			copyArg(msg,"UserDefinedFields",params,undefined,true); 
			copyArg(msg,"Workflow",params,undefined,false); 
			copyArg(msg,"RelatedFindings",params,undefined,true); 
			

			svc.batchUpdateFindings(params,cb);
		}

		
		service.CreateActionTarget=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Description",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.createActionTarget(params,cb);
		}

		
		service.CreateInsight=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Filters",params,undefined,true); 
			copyArg(n,"GroupByAttribute",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"GroupByAttribute",params,undefined,false); 
			

			svc.createInsight(params,cb);
		}

		
		service.CreateMembers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountDetails",params,undefined,false); 
			
			copyArg(msg,"AccountDetails",params,undefined,false); 
			

			svc.createMembers(params,cb);
		}

		
		service.DeclineInvitations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountIds",params,undefined,true); 
			
			copyArg(msg,"AccountIds",params,undefined,true); 
			

			svc.declineInvitations(params,cb);
		}

		
		service.DeleteActionTarget=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ActionTargetArn",params,undefined,false); 
			
			copyArg(msg,"ActionTargetArn",params,undefined,false); 
			

			svc.deleteActionTarget(params,cb);
		}

		
		service.DeleteInsight=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InsightArn",params,undefined,false); 
			
			copyArg(msg,"InsightArn",params,undefined,false); 
			

			svc.deleteInsight(params,cb);
		}

		
		service.DeleteInvitations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountIds",params,undefined,true); 
			
			copyArg(msg,"AccountIds",params,undefined,true); 
			

			svc.deleteInvitations(params,cb);
		}

		
		service.DeleteMembers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountIds",params,undefined,true); 
			
			copyArg(msg,"AccountIds",params,undefined,true); 
			

			svc.deleteMembers(params,cb);
		}

		
		service.DescribeActionTargets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ActionTargetArns",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describeActionTargets(params,cb);
		}

		
		service.DescribeHub=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"HubArn",params,undefined,false); 
			

			svc.describeHub(params,cb);
		}

		
		service.DescribeOrganizationConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeOrganizationConfiguration(params,cb);
		}

		
		service.DescribeProducts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"ProductArn",params,undefined,false); 
			

			svc.describeProducts(params,cb);
		}

		
		service.DescribeStandards=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describeStandards(params,cb);
		}

		
		service.DescribeStandardsControls=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StandardsSubscriptionArn",params,undefined,false); 
			
			copyArg(msg,"StandardsSubscriptionArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describeStandardsControls(params,cb);
		}

		
		service.DisableImportFindingsForProduct=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProductSubscriptionArn",params,undefined,false); 
			
			copyArg(msg,"ProductSubscriptionArn",params,undefined,false); 
			

			svc.disableImportFindingsForProduct(params,cb);
		}

		
		service.DisableOrganizationAdminAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AdminAccountId",params,undefined,false); 
			
			copyArg(msg,"AdminAccountId",params,undefined,false); 
			

			svc.disableOrganizationAdminAccount(params,cb);
		}

		
		service.DisableSecurityHub=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.disableSecurityHub(params,cb);
		}

		
		service.DisassociateFromAdministratorAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.disassociateFromAdministratorAccount(params,cb);
		}

		
		service.DisassociateFromMasterAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.disassociateFromMasterAccount(params,cb);
		}

		
		service.DisassociateMembers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountIds",params,undefined,true); 
			
			copyArg(msg,"AccountIds",params,undefined,true); 
			

			svc.disassociateMembers(params,cb);
		}

		
		service.EnableImportFindingsForProduct=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProductArn",params,undefined,false); 
			
			copyArg(msg,"ProductArn",params,undefined,false); 
			

			svc.enableImportFindingsForProduct(params,cb);
		}

		
		service.EnableOrganizationAdminAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AdminAccountId",params,undefined,false); 
			
			copyArg(msg,"AdminAccountId",params,undefined,false); 
			

			svc.enableOrganizationAdminAccount(params,cb);
		}

		
		service.EnableSecurityHub=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"EnableDefaultStandards",params,undefined,false); 
			

			svc.enableSecurityHub(params,cb);
		}

		
		service.GetAdministratorAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getAdministratorAccount(params,cb);
		}

		
		service.GetEnabledStandards=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"StandardsSubscriptionArns",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.getEnabledStandards(params,cb);
		}

		
		service.GetFindings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"SortCriteria",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.getFindings(params,cb);
		}

		
		service.GetInsightResults=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InsightArn",params,undefined,false); 
			
			copyArg(msg,"InsightArn",params,undefined,false); 
			

			svc.getInsightResults(params,cb);
		}

		
		service.GetInsights=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"InsightArns",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.getInsights(params,cb);
		}

		
		service.GetInvitationsCount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getInvitationsCount(params,cb);
		}

		
		service.GetMasterAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getMasterAccount(params,cb);
		}

		
		service.GetMembers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountIds",params,undefined,true); 
			
			copyArg(msg,"AccountIds",params,undefined,true); 
			

			svc.getMembers(params,cb);
		}

		
		service.InviteMembers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountIds",params,undefined,true); 
			
			copyArg(msg,"AccountIds",params,undefined,true); 
			

			svc.inviteMembers(params,cb);
		}

		
		service.ListEnabledProductsForImport=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listEnabledProductsForImport(params,cb);
		}

		
		service.ListInvitations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listInvitations(params,cb);
		}

		
		service.ListMembers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"OnlyAssociated",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listMembers(params,cb);
		}

		
		service.ListOrganizationAdminAccounts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listOrganizationAdminAccounts(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
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
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateActionTarget=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ActionTargetArn",params,undefined,false); 
			
			copyArg(msg,"ActionTargetArn",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			

			svc.updateActionTarget(params,cb);
		}

		
		service.UpdateFindings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Filters",params,undefined,true); 
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"Note",params,undefined,true); 
			copyArg(msg,"RecordState",params,undefined,false); 
			

			svc.updateFindings(params,cb);
		}

		
		service.UpdateInsight=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InsightArn",params,undefined,false); 
			
			copyArg(msg,"InsightArn",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"GroupByAttribute",params,undefined,false); 
			

			svc.updateInsight(params,cb);
		}

		
		service.UpdateOrganizationConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoEnable",params,undefined,false); 
			
			copyArg(msg,"AutoEnable",params,undefined,false); 
			

			svc.updateOrganizationConfiguration(params,cb);
		}

		
		service.UpdateSecurityHubConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AutoEnableControls",params,undefined,false); 
			

			svc.updateSecurityHubConfiguration(params,cb);
		}

		
		service.UpdateStandardsControl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StandardsControlArn",params,undefined,false); 
			
			copyArg(msg,"StandardsControlArn",params,undefined,false); 
			copyArg(msg,"ControlStatus",params,undefined,false); 
			copyArg(msg,"DisabledReason",params,undefined,false); 
			

			svc.updateStandardsControl(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS SecurityHub", AmazonAPINode);

};
