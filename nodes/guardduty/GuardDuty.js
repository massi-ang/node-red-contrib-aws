
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

		var awsService = new AWS.GuardDuty( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.GuardDuty(msg.AWSConfig) : awsService;

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
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"MasterId",params,undefined,false); 
			copyArgs(n,"InvitationId",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"MasterId",params,undefined,false); 
			copyArgs(n,"InvitationId",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"MasterId",params,undefined,false); 
			copyArgs(msg,"InvitationId",params,undefined,false); 
			

			svc.acceptInvitation(params,cb);
		}
		
		service.ArchiveFindings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"FindingIds",params,undefined,true); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"FindingIds",params,undefined,true); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"FindingIds",params,undefined,true); 
			

			svc.archiveFindings(params,cb);
		}
		
		service.CreateDetector=function(svc,msg,cb){
			var params={};
			
			copyArgs(Boolean(n),"Enable",params,undefined,false); 
			
			copyArgs(Boolean(n),"Enable",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"FindingPublishingFrequency",params,undefined,false); 
			copyArgs(n,"DataSources",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Enable",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"FindingPublishingFrequency",params,undefined,false); 
			copyArgs(msg,"DataSources",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createDetector(params,cb);
		}
		
		service.CreateFilter=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"FindingCriteria",params,undefined,true); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Action",params,undefined,false); 
			copyArgs(Number(n),"Rank",params,undefined,false); 
			copyArgs(n,"FindingCriteria",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Action",params,undefined,false); 
			copyArgs(msg,"Rank",params,undefined,false); 
			copyArgs(msg,"FindingCriteria",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createFilter(params,cb);
		}
		
		service.CreateIPSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Format",params,undefined,false); 
			copyArgs(n,"Location",params,undefined,false); 
			copyArgs(Boolean(n),"Activate",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Format",params,undefined,false); 
			copyArgs(n,"Location",params,undefined,false); 
			copyArgs(Boolean(n),"Activate",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Format",params,undefined,false); 
			copyArgs(msg,"Location",params,undefined,false); 
			copyArgs(msg,"Activate",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createIPSet(params,cb);
		}
		
		service.CreateMembers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"AccountDetails",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"AccountDetails",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"AccountDetails",params,undefined,false); 
			

			svc.createMembers(params,cb);
		}
		
		service.CreatePublishingDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"DestinationType",params,undefined,false); 
			copyArgs(n,"DestinationProperties",params,undefined,true); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"DestinationType",params,undefined,false); 
			copyArgs(n,"DestinationProperties",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"DestinationType",params,undefined,false); 
			copyArgs(msg,"DestinationProperties",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.createPublishingDestination(params,cb);
		}
		
		service.CreateSampleFindings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"FindingTypes",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"FindingTypes",params,undefined,false); 
			

			svc.createSampleFindings(params,cb);
		}
		
		service.CreateThreatIntelSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Format",params,undefined,false); 
			copyArgs(n,"Location",params,undefined,false); 
			copyArgs(Boolean(n),"Activate",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Format",params,undefined,false); 
			copyArgs(n,"Location",params,undefined,false); 
			copyArgs(Boolean(n),"Activate",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Format",params,undefined,false); 
			copyArgs(msg,"Location",params,undefined,false); 
			copyArgs(msg,"Activate",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createThreatIntelSet(params,cb);
		}
		
		service.DeclineInvitations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountIds",params,undefined,true); 
			
			copyArgs(n,"AccountIds",params,undefined,true); 
			
			copyArgs(msg,"AccountIds",params,undefined,true); 
			

			svc.declineInvitations(params,cb);
		}
		
		service.DeleteDetector=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			

			svc.deleteDetector(params,cb);
		}
		
		service.DeleteFilter=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"FilterName",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"FilterName",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"FilterName",params,undefined,false); 
			

			svc.deleteFilter(params,cb);
		}
		
		service.DeleteIPSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"IpSetId",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"IpSetId",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"IpSetId",params,undefined,false); 
			

			svc.deleteIPSet(params,cb);
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
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"AccountIds",params,undefined,true); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"AccountIds",params,undefined,true); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"AccountIds",params,undefined,true); 
			

			svc.deleteMembers(params,cb);
		}
		
		service.DeletePublishingDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"DestinationId",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"DestinationId",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"DestinationId",params,undefined,false); 
			

			svc.deletePublishingDestination(params,cb);
		}
		
		service.DeleteThreatIntelSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"ThreatIntelSetId",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"ThreatIntelSetId",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"ThreatIntelSetId",params,undefined,false); 
			

			svc.deleteThreatIntelSet(params,cb);
		}
		
		service.DescribeOrganizationConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			

			svc.describeOrganizationConfiguration(params,cb);
		}
		
		service.DescribePublishingDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"DestinationId",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"DestinationId",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"DestinationId",params,undefined,false); 
			

			svc.describePublishingDestination(params,cb);
		}
		
		service.DisableOrganizationAdminAccount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AdminAccountId",params,undefined,false); 
			
			copyArgs(n,"AdminAccountId",params,undefined,false); 
			
			copyArgs(msg,"AdminAccountId",params,undefined,false); 
			

			svc.disableOrganizationAdminAccount(params,cb);
		}
		
		service.DisassociateFromMasterAccount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			

			svc.disassociateFromMasterAccount(params,cb);
		}
		
		service.DisassociateMembers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"AccountIds",params,undefined,true); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"AccountIds",params,undefined,true); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"AccountIds",params,undefined,true); 
			

			svc.disassociateMembers(params,cb);
		}
		
		service.EnableOrganizationAdminAccount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AdminAccountId",params,undefined,false); 
			
			copyArgs(n,"AdminAccountId",params,undefined,false); 
			
			copyArgs(msg,"AdminAccountId",params,undefined,false); 
			

			svc.enableOrganizationAdminAccount(params,cb);
		}
		
		service.GetDetector=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			

			svc.getDetector(params,cb);
		}
		
		service.GetFilter=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"FilterName",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"FilterName",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"FilterName",params,undefined,false); 
			

			svc.getFilter(params,cb);
		}
		
		service.GetFindings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"FindingIds",params,undefined,true); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"FindingIds",params,undefined,true); 
			copyArgs(n,"SortCriteria",params,undefined,true); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"FindingIds",params,undefined,true); 
			copyArgs(msg,"SortCriteria",params,undefined,true); 
			

			svc.getFindings(params,cb);
		}
		
		service.GetFindingsStatistics=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"FindingStatisticTypes",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"FindingStatisticTypes",params,undefined,false); 
			copyArgs(n,"FindingCriteria",params,undefined,true); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"FindingStatisticTypes",params,undefined,false); 
			copyArgs(msg,"FindingCriteria",params,undefined,true); 
			

			svc.getFindingsStatistics(params,cb);
		}
		
		service.GetIPSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"IpSetId",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"IpSetId",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"IpSetId",params,undefined,false); 
			

			svc.getIPSet(params,cb);
		}
		
		service.GetInvitationsCount=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getInvitationsCount(params,cb);
		}
		
		service.GetMasterAccount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			

			svc.getMasterAccount(params,cb);
		}
		
		service.GetMemberDetectors=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"AccountIds",params,undefined,true); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"AccountIds",params,undefined,true); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"AccountIds",params,undefined,true); 
			

			svc.getMemberDetectors(params,cb);
		}
		
		service.GetMembers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"AccountIds",params,undefined,true); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"AccountIds",params,undefined,true); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"AccountIds",params,undefined,true); 
			

			svc.getMembers(params,cb);
		}
		
		service.GetThreatIntelSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"ThreatIntelSetId",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"ThreatIntelSetId",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"ThreatIntelSetId",params,undefined,false); 
			

			svc.getThreatIntelSet(params,cb);
		}
		
		service.GetUsageStatistics=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"UsageStatisticType",params,undefined,false); 
			copyArgs(n,"UsageCriteria",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"UsageStatisticType",params,undefined,false); 
			copyArgs(n,"UsageCriteria",params,undefined,false); 
			copyArgs(n,"Unit",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"UsageStatisticType",params,undefined,false); 
			copyArgs(msg,"UsageCriteria",params,undefined,false); 
			copyArgs(msg,"Unit",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getUsageStatistics(params,cb);
		}
		
		service.InviteMembers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"AccountIds",params,undefined,true); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"AccountIds",params,undefined,true); 
			copyArgs(Boolean(n),"DisableEmailNotification",params,undefined,false); 
			copyArgs(n,"Message",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"AccountIds",params,undefined,true); 
			copyArgs(msg,"DisableEmailNotification",params,undefined,false); 
			copyArgs(msg,"Message",params,undefined,false); 
			

			svc.inviteMembers(params,cb);
		}
		
		service.ListDetectors=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listDetectors(params,cb);
		}
		
		service.ListFilters=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listFilters(params,cb);
		}
		
		service.ListFindings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"FindingCriteria",params,undefined,true); 
			copyArgs(n,"SortCriteria",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"FindingCriteria",params,undefined,true); 
			copyArgs(msg,"SortCriteria",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listFindings(params,cb);
		}
		
		service.ListIPSets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listIPSets(params,cb);
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
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"OnlyAssociated",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"OnlyAssociated",params,undefined,false); 
			

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
		
		service.ListPublishingDestinations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listPublishingDestinations(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.ListThreatIntelSets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listThreatIntelSets(params,cb);
		}
		
		service.StartMonitoringMembers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"AccountIds",params,undefined,true); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"AccountIds",params,undefined,true); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"AccountIds",params,undefined,true); 
			

			svc.startMonitoringMembers(params,cb);
		}
		
		service.StopMonitoringMembers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"AccountIds",params,undefined,true); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"AccountIds",params,undefined,true); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"AccountIds",params,undefined,true); 
			

			svc.stopMonitoringMembers(params,cb);
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
		
		service.UnarchiveFindings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"FindingIds",params,undefined,true); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"FindingIds",params,undefined,true); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"FindingIds",params,undefined,true); 
			

			svc.unarchiveFindings(params,cb);
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
		
		service.UpdateDetector=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(Boolean(n),"Enable",params,undefined,false); 
			copyArgs(n,"FindingPublishingFrequency",params,undefined,false); 
			copyArgs(n,"DataSources",params,undefined,true); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"Enable",params,undefined,false); 
			copyArgs(msg,"FindingPublishingFrequency",params,undefined,false); 
			copyArgs(msg,"DataSources",params,undefined,true); 
			

			svc.updateDetector(params,cb);
		}
		
		service.UpdateFilter=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"FilterName",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"FilterName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Action",params,undefined,false); 
			copyArgs(Number(n),"Rank",params,undefined,false); 
			copyArgs(n,"FindingCriteria",params,undefined,true); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"FilterName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Action",params,undefined,false); 
			copyArgs(msg,"Rank",params,undefined,false); 
			copyArgs(msg,"FindingCriteria",params,undefined,true); 
			

			svc.updateFilter(params,cb);
		}
		
		service.UpdateFindingsFeedback=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"FindingIds",params,undefined,true); 
			copyArgs(n,"Feedback",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"FindingIds",params,undefined,true); 
			copyArgs(n,"Feedback",params,undefined,false); 
			copyArgs(n,"Comments",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"FindingIds",params,undefined,true); 
			copyArgs(msg,"Feedback",params,undefined,false); 
			copyArgs(msg,"Comments",params,undefined,false); 
			

			svc.updateFindingsFeedback(params,cb);
		}
		
		service.UpdateIPSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"IpSetId",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"IpSetId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Location",params,undefined,false); 
			copyArgs(Boolean(n),"Activate",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"IpSetId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Location",params,undefined,false); 
			copyArgs(msg,"Activate",params,undefined,false); 
			

			svc.updateIPSet(params,cb);
		}
		
		service.UpdateMemberDetectors=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"AccountIds",params,undefined,true); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"AccountIds",params,undefined,true); 
			copyArgs(n,"DataSources",params,undefined,true); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"AccountIds",params,undefined,true); 
			copyArgs(msg,"DataSources",params,undefined,true); 
			

			svc.updateMemberDetectors(params,cb);
		}
		
		service.UpdateOrganizationConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(Boolean(n),"AutoEnable",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(Boolean(n),"AutoEnable",params,undefined,false); 
			copyArgs(n,"DataSources",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"AutoEnable",params,undefined,false); 
			copyArgs(msg,"DataSources",params,undefined,false); 
			

			svc.updateOrganizationConfiguration(params,cb);
		}
		
		service.UpdatePublishingDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"DestinationId",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"DestinationId",params,undefined,false); 
			copyArgs(n,"DestinationProperties",params,undefined,true); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"DestinationId",params,undefined,false); 
			copyArgs(msg,"DestinationProperties",params,undefined,true); 
			

			svc.updatePublishingDestination(params,cb);
		}
		
		service.UpdateThreatIntelSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"ThreatIntelSetId",params,undefined,false); 
			
			copyArgs(n,"DetectorId",params,undefined,false); 
			copyArgs(n,"ThreatIntelSetId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Location",params,undefined,false); 
			copyArgs(Boolean(n),"Activate",params,undefined,false); 
			
			copyArgs(msg,"DetectorId",params,undefined,false); 
			copyArgs(msg,"ThreatIntelSetId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Location",params,undefined,false); 
			copyArgs(msg,"Activate",params,undefined,false); 
			

			svc.updateThreatIntelSet(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS GuardDuty", AmazonAPINode);

};
