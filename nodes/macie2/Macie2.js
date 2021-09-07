
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

		var awsService = new AWS.Macie2( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Macie2(msg.AWSConfig) : awsService;

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

		
		service.AcceptInvitation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"invitationId",params,undefined,false); 
			
			copyArgs(n,"administratorAccountId",params,undefined,false); 
			copyArgs(n,"invitationId",params,undefined,false); 
			copyArgs(n,"masterAccount",params,undefined,false); 
			
			copyArgs(msg,"administratorAccountId",params,undefined,false); 
			copyArgs(msg,"invitationId",params,undefined,false); 
			copyArgs(msg,"masterAccount",params,undefined,false); 
			

			svc.acceptInvitation(params,cb);
		}

		
		service.BatchGetCustomDataIdentifiers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ids",params,undefined,true); 
			
			copyArgs(msg,"ids",params,undefined,true); 
			

			svc.batchGetCustomDataIdentifiers(params,cb);
		}

		
		service.CreateClassificationJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"s3JobDefinition",params,undefined,true); 
			copyArgs(n,"jobType",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"customDataIdentifierIds",params,undefined,true); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"initialRun",params,undefined,false); 
			copyArgs(n,"jobType",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"s3JobDefinition",params,undefined,true); 
			copyArgs(n,"samplingPercentage",params,undefined,false); 
			copyArgs(n,"scheduleFrequency",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"customDataIdentifierIds",params,undefined,true); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"initialRun",params,undefined,false); 
			copyArgs(msg,"jobType",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"s3JobDefinition",params,undefined,true); 
			copyArgs(msg,"samplingPercentage",params,undefined,false); 
			copyArgs(msg,"scheduleFrequency",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createClassificationJob(params,cb);
		}

		
		service.CreateCustomDataIdentifier=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"ignoreWords",params,undefined,true); 
			copyArgs(n,"keywords",params,undefined,true); 
			copyArgs(n,"maximumMatchDistance",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"regex",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"ignoreWords",params,undefined,true); 
			copyArgs(msg,"keywords",params,undefined,true); 
			copyArgs(msg,"maximumMatchDistance",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"regex",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createCustomDataIdentifier(params,cb);
		}

		
		service.CreateFindingsFilter=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"action",params,undefined,false); 
			copyArgs(n,"findingCriteria",params,undefined,true); 
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"action",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"findingCriteria",params,undefined,true); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"position",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"action",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"findingCriteria",params,undefined,true); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"position",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createFindingsFilter(params,cb);
		}

		
		service.CreateInvitations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountIds",params,undefined,true); 
			
			copyArgs(n,"accountIds",params,undefined,true); 
			copyArgs(n,"disableEmailNotification",params,undefined,false); 
			copyArgs(n,"message",params,undefined,false); 
			
			copyArgs(msg,"accountIds",params,undefined,true); 
			copyArgs(msg,"disableEmailNotification",params,undefined,false); 
			copyArgs(msg,"message",params,undefined,false); 
			

			svc.createInvitations(params,cb);
		}

		
		service.CreateMember=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"account",params,undefined,false); 
			
			copyArgs(n,"account",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"account",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createMember(params,cb);
		}

		
		service.CreateSampleFindings=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"findingTypes",params,undefined,false); 
			
			copyArgs(msg,"findingTypes",params,undefined,false); 
			

			svc.createSampleFindings(params,cb);
		}

		
		service.DeclineInvitations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountIds",params,undefined,true); 
			
			copyArgs(n,"accountIds",params,undefined,true); 
			
			copyArgs(msg,"accountIds",params,undefined,true); 
			

			svc.declineInvitations(params,cb);
		}

		
		service.DeleteCustomDataIdentifier=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.deleteCustomDataIdentifier(params,cb);
		}

		
		service.DeleteFindingsFilter=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.deleteFindingsFilter(params,cb);
		}

		
		service.DeleteInvitations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accountIds",params,undefined,true); 
			
			copyArgs(n,"accountIds",params,undefined,true); 
			
			copyArgs(msg,"accountIds",params,undefined,true); 
			

			svc.deleteInvitations(params,cb);
		}

		
		service.DeleteMember=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.deleteMember(params,cb);
		}

		
		service.DescribeBuckets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"criteria",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"sortCriteria",params,undefined,false); 
			
			copyArgs(msg,"criteria",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"sortCriteria",params,undefined,false); 
			

			svc.describeBuckets(params,cb);
		}

		
		service.DescribeClassificationJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(msg,"jobId",params,undefined,false); 
			

			svc.describeClassificationJob(params,cb);
		}

		
		service.DescribeOrganizationConfiguration=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeOrganizationConfiguration(params,cb);
		}

		
		service.DisableMacie=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.disableMacie(params,cb);
		}

		
		service.DisableOrganizationAdminAccount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"adminAccountId",params,undefined,false); 
			
			copyArgs(n,"adminAccountId",params,undefined,false); 
			
			copyArgs(msg,"adminAccountId",params,undefined,false); 
			

			svc.disableOrganizationAdminAccount(params,cb);
		}

		
		service.DisassociateFromAdministratorAccount=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.disassociateFromAdministratorAccount(params,cb);
		}

		
		service.DisassociateFromMasterAccount=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.disassociateFromMasterAccount(params,cb);
		}

		
		service.DisassociateMember=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.disassociateMember(params,cb);
		}

		
		service.EnableMacie=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"findingPublishingFrequency",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"findingPublishingFrequency",params,undefined,false); 
			copyArgs(msg,"status",params,undefined,false); 
			

			svc.enableMacie(params,cb);
		}

		
		service.EnableOrganizationAdminAccount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"adminAccountId",params,undefined,false); 
			
			copyArgs(n,"adminAccountId",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"adminAccountId",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.enableOrganizationAdminAccount(params,cb);
		}

		
		service.GetAdministratorAccount=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getAdministratorAccount(params,cb);
		}

		
		service.GetBucketStatistics=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"accountId",params,undefined,false); 
			
			copyArgs(msg,"accountId",params,undefined,false); 
			

			svc.getBucketStatistics(params,cb);
		}

		
		service.GetClassificationExportConfiguration=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getClassificationExportConfiguration(params,cb);
		}

		
		service.GetCustomDataIdentifier=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.getCustomDataIdentifier(params,cb);
		}

		
		service.GetFindingStatistics=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"groupBy",params,undefined,false); 
			
			copyArgs(n,"findingCriteria",params,undefined,true); 
			copyArgs(n,"groupBy",params,undefined,false); 
			copyArgs(n,"size",params,undefined,false); 
			copyArgs(n,"sortCriteria",params,undefined,false); 
			
			copyArgs(msg,"findingCriteria",params,undefined,true); 
			copyArgs(msg,"groupBy",params,undefined,false); 
			copyArgs(msg,"size",params,undefined,false); 
			copyArgs(msg,"sortCriteria",params,undefined,false); 
			

			svc.getFindingStatistics(params,cb);
		}

		
		service.GetFindings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"findingIds",params,undefined,true); 
			
			copyArgs(n,"findingIds",params,undefined,true); 
			copyArgs(n,"sortCriteria",params,undefined,true); 
			
			copyArgs(msg,"findingIds",params,undefined,true); 
			copyArgs(msg,"sortCriteria",params,undefined,true); 
			

			svc.getFindings(params,cb);
		}

		
		service.GetFindingsFilter=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.getFindingsFilter(params,cb);
		}

		
		service.GetFindingsPublicationConfiguration=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getFindingsPublicationConfiguration(params,cb);
		}

		
		service.GetInvitationsCount=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getInvitationsCount(params,cb);
		}

		
		service.GetMacieSession=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getMacieSession(params,cb);
		}

		
		service.GetMasterAccount=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getMasterAccount(params,cb);
		}

		
		service.GetMember=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.getMember(params,cb);
		}

		
		service.GetUsageStatistics=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"filterBy",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"sortBy",params,undefined,false); 
			copyArgs(n,"timeRange",params,undefined,false); 
			
			copyArgs(msg,"filterBy",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"sortBy",params,undefined,false); 
			copyArgs(msg,"timeRange",params,undefined,false); 
			

			svc.getUsageStatistics(params,cb);
		}

		
		service.GetUsageTotals=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"timeRange",params,undefined,false); 
			
			copyArgs(msg,"timeRange",params,undefined,false); 
			

			svc.getUsageTotals(params,cb);
		}

		
		service.ListClassificationJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"filterCriteria",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"sortCriteria",params,undefined,false); 
			
			copyArgs(msg,"filterCriteria",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"sortCriteria",params,undefined,false); 
			

			svc.listClassificationJobs(params,cb);
		}

		
		service.ListCustomDataIdentifiers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listCustomDataIdentifiers(params,cb);
		}

		
		service.ListFindings=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"findingCriteria",params,undefined,true); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"sortCriteria",params,undefined,true); 
			
			copyArgs(msg,"findingCriteria",params,undefined,true); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"sortCriteria",params,undefined,true); 
			

			svc.listFindings(params,cb);
		}

		
		service.ListFindingsFilters=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listFindingsFilters(params,cb);
		}

		
		service.ListInvitations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listInvitations(params,cb);
		}

		
		service.ListMembers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"onlyAssociated",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"onlyAssociated",params,undefined,false); 
			

			svc.listMembers(params,cb);
		}

		
		service.ListOrganizationAdminAccounts=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listOrganizationAdminAccounts(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutClassificationExportConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"configuration",params,undefined,true); 
			
			copyArgs(n,"configuration",params,undefined,true); 
			
			copyArgs(msg,"configuration",params,undefined,true); 
			

			svc.putClassificationExportConfiguration(params,cb);
		}

		
		service.PutFindingsPublicationConfiguration=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"securityHubConfiguration",params,undefined,true); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"securityHubConfiguration",params,undefined,true); 
			

			svc.putFindingsPublicationConfiguration(params,cb);
		}

		
		service.SearchResources=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"bucketCriteria",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"sortCriteria",params,undefined,false); 
			
			copyArgs(msg,"bucketCriteria",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"sortCriteria",params,undefined,false); 
			

			svc.searchResources(params,cb);
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

		
		service.TestCustomDataIdentifier=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"regex",params,undefined,false); 
			copyArgs(n,"sampleText",params,undefined,false); 
			
			copyArgs(n,"ignoreWords",params,undefined,true); 
			copyArgs(n,"keywords",params,undefined,true); 
			copyArgs(n,"maximumMatchDistance",params,undefined,false); 
			copyArgs(n,"regex",params,undefined,false); 
			copyArgs(n,"sampleText",params,undefined,false); 
			
			copyArgs(msg,"ignoreWords",params,undefined,true); 
			copyArgs(msg,"keywords",params,undefined,true); 
			copyArgs(msg,"maximumMatchDistance",params,undefined,false); 
			copyArgs(msg,"regex",params,undefined,false); 
			copyArgs(msg,"sampleText",params,undefined,false); 
			

			svc.testCustomDataIdentifier(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"tagKeys",params,undefined,true); 
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,true); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tagKeys",params,undefined,true); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateClassificationJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"jobStatus",params,undefined,false); 
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"jobStatus",params,undefined,false); 
			
			copyArgs(msg,"jobId",params,undefined,false); 
			copyArgs(msg,"jobStatus",params,undefined,false); 
			

			svc.updateClassificationJob(params,cb);
		}

		
		service.UpdateFindingsFilter=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"action",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"findingCriteria",params,undefined,true); 
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"position",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"action",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"findingCriteria",params,undefined,true); 
			copyArgs(msg,"id",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"position",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.updateFindingsFilter(params,cb);
		}

		
		service.UpdateMacieSession=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"findingPublishingFrequency",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			
			copyArgs(msg,"findingPublishingFrequency",params,undefined,false); 
			copyArgs(msg,"status",params,undefined,false); 
			

			svc.updateMacieSession(params,cb);
		}

		
		service.UpdateMemberSession=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			copyArgs(msg,"status",params,undefined,false); 
			

			svc.updateMemberSession(params,cb);
		}

		
		service.UpdateOrganizationConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"autoEnable",params,undefined,false); 
			
			copyArgs(n,"autoEnable",params,undefined,false); 
			
			copyArgs(msg,"autoEnable",params,undefined,false); 
			

			svc.updateOrganizationConfiguration(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Macie2", AmazonAPINode);

};
