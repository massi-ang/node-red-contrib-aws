
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

		var awsService = new AWS.Macie2( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Macie2(msg.AWSConfig) : awsService;

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

		
		service.AcceptInvitation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"invitationId",params,undefined,false); 
			
			copyArg(msg,"administratorAccountId",params,undefined,false); 
			copyArg(msg,"invitationId",params,undefined,false); 
			copyArg(msg,"masterAccount",params,undefined,false); 
			

			svc.acceptInvitation(params,cb);
		}

		
		service.BatchGetCustomDataIdentifiers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ids",params,undefined,true); 
			

			svc.batchGetCustomDataIdentifiers(params,cb);
		}

		
		service.CreateClassificationJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"s3JobDefinition",params,undefined,true); 
			copyArg(n,"jobType",params,undefined,false); 
			copyArg(n,"clientToken",params,undefined,false); 
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"customDataIdentifierIds",params,undefined,true); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"initialRun",params,undefined,false); 
			copyArg(msg,"jobType",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"s3JobDefinition",params,undefined,true); 
			copyArg(msg,"samplingPercentage",params,undefined,false); 
			copyArg(msg,"scheduleFrequency",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createClassificationJob(params,cb);
		}

		
		service.CreateCustomDataIdentifier=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"ignoreWords",params,undefined,true); 
			copyArg(msg,"keywords",params,undefined,true); 
			copyArg(msg,"maximumMatchDistance",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"regex",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createCustomDataIdentifier(params,cb);
		}

		
		service.CreateFindingsFilter=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"action",params,undefined,false); 
			copyArg(n,"findingCriteria",params,undefined,true); 
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"action",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"findingCriteria",params,undefined,true); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"position",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createFindingsFilter(params,cb);
		}

		
		service.CreateInvitations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"accountIds",params,undefined,true); 
			
			copyArg(msg,"accountIds",params,undefined,true); 
			copyArg(msg,"disableEmailNotification",params,undefined,false); 
			copyArg(msg,"message",params,undefined,false); 
			

			svc.createInvitations(params,cb);
		}

		
		service.CreateMember=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"account",params,undefined,false); 
			
			copyArg(msg,"account",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createMember(params,cb);
		}

		
		service.CreateSampleFindings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"findingTypes",params,undefined,false); 
			

			svc.createSampleFindings(params,cb);
		}

		
		service.DeclineInvitations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"accountIds",params,undefined,true); 
			
			copyArg(msg,"accountIds",params,undefined,true); 
			

			svc.declineInvitations(params,cb);
		}

		
		service.DeleteCustomDataIdentifier=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			

			svc.deleteCustomDataIdentifier(params,cb);
		}

		
		service.DeleteFindingsFilter=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			

			svc.deleteFindingsFilter(params,cb);
		}

		
		service.DeleteInvitations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"accountIds",params,undefined,true); 
			
			copyArg(msg,"accountIds",params,undefined,true); 
			

			svc.deleteInvitations(params,cb);
		}

		
		service.DeleteMember=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			

			svc.deleteMember(params,cb);
		}

		
		service.DescribeBuckets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"criteria",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"sortCriteria",params,undefined,false); 
			

			svc.describeBuckets(params,cb);
		}

		
		service.DescribeClassificationJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params,undefined,false); 
			
			copyArg(msg,"jobId",params,undefined,false); 
			

			svc.describeClassificationJob(params,cb);
		}

		
		service.DescribeOrganizationConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeOrganizationConfiguration(params,cb);
		}

		
		service.DisableMacie=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.disableMacie(params,cb);
		}

		
		service.DisableOrganizationAdminAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"adminAccountId",params,undefined,false); 
			
			copyArg(msg,"adminAccountId",params,undefined,false); 
			

			svc.disableOrganizationAdminAccount(params,cb);
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

		
		service.DisassociateMember=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			

			svc.disassociateMember(params,cb);
		}

		
		service.EnableMacie=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"findingPublishingFrequency",params,undefined,false); 
			copyArg(msg,"status",params,undefined,false); 
			

			svc.enableMacie(params,cb);
		}

		
		service.EnableOrganizationAdminAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"adminAccountId",params,undefined,false); 
			
			copyArg(msg,"adminAccountId",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.enableOrganizationAdminAccount(params,cb);
		}

		
		service.GetAdministratorAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getAdministratorAccount(params,cb);
		}

		
		service.GetBucketStatistics=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"accountId",params,undefined,false); 
			

			svc.getBucketStatistics(params,cb);
		}

		
		service.GetClassificationExportConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getClassificationExportConfiguration(params,cb);
		}

		
		service.GetCustomDataIdentifier=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			

			svc.getCustomDataIdentifier(params,cb);
		}

		
		service.GetFindingStatistics=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"groupBy",params,undefined,false); 
			
			copyArg(msg,"findingCriteria",params,undefined,true); 
			copyArg(msg,"groupBy",params,undefined,false); 
			copyArg(msg,"size",params,undefined,false); 
			copyArg(msg,"sortCriteria",params,undefined,false); 
			

			svc.getFindingStatistics(params,cb);
		}

		
		service.GetFindings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"findingIds",params,undefined,true); 
			
			copyArg(msg,"findingIds",params,undefined,true); 
			copyArg(msg,"sortCriteria",params,undefined,true); 
			

			svc.getFindings(params,cb);
		}

		
		service.GetFindingsFilter=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			

			svc.getFindingsFilter(params,cb);
		}

		
		service.GetFindingsPublicationConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getFindingsPublicationConfiguration(params,cb);
		}

		
		service.GetInvitationsCount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getInvitationsCount(params,cb);
		}

		
		service.GetMacieSession=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getMacieSession(params,cb);
		}

		
		service.GetMasterAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getMasterAccount(params,cb);
		}

		
		service.GetMember=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			

			svc.getMember(params,cb);
		}

		
		service.GetUsageStatistics=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"filterBy",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"sortBy",params,undefined,false); 
			copyArg(msg,"timeRange",params,undefined,false); 
			

			svc.getUsageStatistics(params,cb);
		}

		
		service.GetUsageTotals=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"timeRange",params,undefined,false); 
			

			svc.getUsageTotals(params,cb);
		}

		
		service.ListClassificationJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"filterCriteria",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"sortCriteria",params,undefined,false); 
			

			svc.listClassificationJobs(params,cb);
		}

		
		service.ListCustomDataIdentifiers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listCustomDataIdentifiers(params,cb);
		}

		
		service.ListFindings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"findingCriteria",params,undefined,true); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"sortCriteria",params,undefined,true); 
			

			svc.listFindings(params,cb);
		}

		
		service.ListFindingsFilters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listFindingsFilters(params,cb);
		}

		
		service.ListInvitations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listInvitations(params,cb);
		}

		
		service.ListMembers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"onlyAssociated",params,undefined,false); 
			

			svc.listMembers(params,cb);
		}

		
		service.ListOrganizationAdminAccounts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listOrganizationAdminAccounts(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutClassificationExportConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"configuration",params,undefined,true); 
			
			copyArg(msg,"configuration",params,undefined,true); 
			

			svc.putClassificationExportConfiguration(params,cb);
		}

		
		service.PutFindingsPublicationConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"securityHubConfiguration",params,undefined,true); 
			

			svc.putFindingsPublicationConfiguration(params,cb);
		}

		
		service.SearchResources=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"bucketCriteria",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"sortCriteria",params,undefined,false); 
			

			svc.searchResources(params,cb);
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

		
		service.TestCustomDataIdentifier=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"regex",params,undefined,false); 
			copyArg(n,"sampleText",params,undefined,false); 
			
			copyArg(msg,"ignoreWords",params,undefined,true); 
			copyArg(msg,"keywords",params,undefined,true); 
			copyArg(msg,"maximumMatchDistance",params,undefined,false); 
			copyArg(msg,"regex",params,undefined,false); 
			copyArg(msg,"sampleText",params,undefined,false); 
			

			svc.testCustomDataIdentifier(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"tagKeys",params,undefined,true); 
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tagKeys",params,undefined,true); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateClassificationJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params,undefined,false); 
			copyArg(n,"jobStatus",params,undefined,false); 
			
			copyArg(msg,"jobId",params,undefined,false); 
			copyArg(msg,"jobStatus",params,undefined,false); 
			

			svc.updateClassificationJob(params,cb);
		}

		
		service.UpdateFindingsFilter=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"action",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"findingCriteria",params,undefined,true); 
			copyArg(msg,"id",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"position",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.updateFindingsFilter(params,cb);
		}

		
		service.UpdateMacieSession=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"findingPublishingFrequency",params,undefined,false); 
			copyArg(msg,"status",params,undefined,false); 
			

			svc.updateMacieSession(params,cb);
		}

		
		service.UpdateMemberSession=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			copyArg(n,"status",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			copyArg(msg,"status",params,undefined,false); 
			

			svc.updateMemberSession(params,cb);
		}

		
		service.UpdateOrganizationConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"autoEnable",params,undefined,false); 
			
			copyArg(msg,"autoEnable",params,undefined,false); 
			

			svc.updateOrganizationConfiguration(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Macie2", AmazonAPINode);

};
