
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

		var awsService = new AWS.SESV2( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.SESV2(msg.AWSConfig) : awsService;

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

		
		service.CreateConfigurationSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(n,"TrackingOptions",params,undefined,true); 
			copyArgs(n,"DeliveryOptions",params,undefined,true); 
			copyArgs(n,"ReputationOptions",params,undefined,true); 
			copyArgs(n,"SendingOptions",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"SuppressionOptions",params,undefined,true); 
			
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			copyArgs(msg,"TrackingOptions",params,undefined,true); 
			copyArgs(msg,"DeliveryOptions",params,undefined,true); 
			copyArgs(msg,"ReputationOptions",params,undefined,true); 
			copyArgs(msg,"SendingOptions",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"SuppressionOptions",params,undefined,true); 
			

			svc.createConfigurationSet(params,cb);
		}

		
		service.CreateConfigurationSetEventDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(n,"EventDestinationName",params,undefined,false); 
			copyArgs(n,"EventDestination",params,undefined,true); 
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(n,"EventDestinationName",params,undefined,false); 
			copyArgs(n,"EventDestination",params,undefined,true); 
			
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			copyArgs(msg,"EventDestinationName",params,undefined,false); 
			copyArgs(msg,"EventDestination",params,undefined,true); 
			

			svc.createConfigurationSetEventDestination(params,cb);
		}

		
		service.CreateContact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContactListName",params,undefined,false); 
			copyArgs(n,"EmailAddress",params,undefined,false); 
			
			copyArgs(n,"ContactListName",params,undefined,false); 
			copyArgs(n,"EmailAddress",params,undefined,false); 
			copyArgs(n,"TopicPreferences",params,undefined,true); 
			copyArgs(n,"UnsubscribeAll",params,undefined,false); 
			copyArgs(n,"AttributesData",params,undefined,false); 
			
			copyArgs(msg,"ContactListName",params,undefined,false); 
			copyArgs(msg,"EmailAddress",params,undefined,false); 
			copyArgs(msg,"TopicPreferences",params,undefined,true); 
			copyArgs(msg,"UnsubscribeAll",params,undefined,false); 
			copyArgs(msg,"AttributesData",params,undefined,false); 
			

			svc.createContact(params,cb);
		}

		
		service.CreateContactList=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContactListName",params,undefined,false); 
			
			copyArgs(n,"ContactListName",params,undefined,false); 
			copyArgs(n,"Topics",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ContactListName",params,undefined,false); 
			copyArgs(msg,"Topics",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createContactList(params,cb);
		}

		
		service.CreateCustomVerificationEmailTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"FromEmailAddress",params,undefined,false); 
			copyArgs(n,"TemplateSubject",params,undefined,false); 
			copyArgs(n,"TemplateContent",params,undefined,false); 
			copyArgs(n,"SuccessRedirectionURL",params,undefined,false); 
			copyArgs(n,"FailureRedirectionURL",params,undefined,false); 
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"FromEmailAddress",params,undefined,false); 
			copyArgs(n,"TemplateSubject",params,undefined,false); 
			copyArgs(n,"TemplateContent",params,undefined,false); 
			copyArgs(n,"SuccessRedirectionURL",params,undefined,false); 
			copyArgs(n,"FailureRedirectionURL",params,undefined,false); 
			
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"FromEmailAddress",params,undefined,false); 
			copyArgs(msg,"TemplateSubject",params,undefined,false); 
			copyArgs(msg,"TemplateContent",params,undefined,false); 
			copyArgs(msg,"SuccessRedirectionURL",params,undefined,false); 
			copyArgs(msg,"FailureRedirectionURL",params,undefined,false); 
			

			svc.createCustomVerificationEmailTemplate(params,cb);
		}

		
		service.CreateDedicatedIpPool=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PoolName",params,undefined,false); 
			
			copyArgs(n,"PoolName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"PoolName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createDedicatedIpPool(params,cb);
		}

		
		service.CreateDeliverabilityTestReport=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FromEmailAddress",params,undefined,false); 
			copyArgs(n,"Content",params,undefined,true); 
			
			copyArgs(n,"ReportName",params,undefined,false); 
			copyArgs(n,"FromEmailAddress",params,undefined,false); 
			copyArgs(n,"Content",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ReportName",params,undefined,false); 
			copyArgs(msg,"FromEmailAddress",params,undefined,false); 
			copyArgs(msg,"Content",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createDeliverabilityTestReport(params,cb);
		}

		
		service.CreateEmailIdentity=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EmailIdentity",params,undefined,false); 
			
			copyArgs(n,"EmailIdentity",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"DkimSigningAttributes",params,undefined,true); 
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArgs(msg,"EmailIdentity",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"DkimSigningAttributes",params,undefined,true); 
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			

			svc.createEmailIdentity(params,cb);
		}

		
		service.CreateEmailIdentityPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EmailIdentity",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(n,"EmailIdentity",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(msg,"EmailIdentity",params,undefined,false); 
			copyArgs(msg,"PolicyName",params,undefined,false); 
			copyArgs(msg,"Policy",params,undefined,false); 
			

			svc.createEmailIdentityPolicy(params,cb);
		}

		
		service.CreateEmailTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"TemplateContent",params,undefined,true); 
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"TemplateContent",params,undefined,true); 
			
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"TemplateContent",params,undefined,true); 
			

			svc.createEmailTemplate(params,cb);
		}

		
		service.CreateImportJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ImportDestination",params,undefined,true); 
			copyArgs(n,"ImportDataSource",params,undefined,true); 
			
			copyArgs(n,"ImportDestination",params,undefined,true); 
			copyArgs(n,"ImportDataSource",params,undefined,true); 
			
			copyArgs(msg,"ImportDestination",params,undefined,true); 
			copyArgs(msg,"ImportDataSource",params,undefined,true); 
			

			svc.createImportJob(params,cb);
		}

		
		service.DeleteConfigurationSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			

			svc.deleteConfigurationSet(params,cb);
		}

		
		service.DeleteConfigurationSetEventDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(n,"EventDestinationName",params,undefined,false); 
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(n,"EventDestinationName",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			copyArgs(msg,"EventDestinationName",params,undefined,false); 
			

			svc.deleteConfigurationSetEventDestination(params,cb);
		}

		
		service.DeleteContact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContactListName",params,undefined,false); 
			copyArgs(n,"EmailAddress",params,undefined,false); 
			
			copyArgs(n,"ContactListName",params,undefined,false); 
			copyArgs(n,"EmailAddress",params,undefined,false); 
			
			copyArgs(msg,"ContactListName",params,undefined,false); 
			copyArgs(msg,"EmailAddress",params,undefined,false); 
			

			svc.deleteContact(params,cb);
		}

		
		service.DeleteContactList=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContactListName",params,undefined,false); 
			
			copyArgs(n,"ContactListName",params,undefined,false); 
			
			copyArgs(msg,"ContactListName",params,undefined,false); 
			

			svc.deleteContactList(params,cb);
		}

		
		service.DeleteCustomVerificationEmailTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(msg,"TemplateName",params,undefined,false); 
			

			svc.deleteCustomVerificationEmailTemplate(params,cb);
		}

		
		service.DeleteDedicatedIpPool=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PoolName",params,undefined,false); 
			
			copyArgs(n,"PoolName",params,undefined,false); 
			
			copyArgs(msg,"PoolName",params,undefined,false); 
			

			svc.deleteDedicatedIpPool(params,cb);
		}

		
		service.DeleteEmailIdentity=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EmailIdentity",params,undefined,false); 
			
			copyArgs(n,"EmailIdentity",params,undefined,false); 
			
			copyArgs(msg,"EmailIdentity",params,undefined,false); 
			

			svc.deleteEmailIdentity(params,cb);
		}

		
		service.DeleteEmailIdentityPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EmailIdentity",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			
			copyArgs(n,"EmailIdentity",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			
			copyArgs(msg,"EmailIdentity",params,undefined,false); 
			copyArgs(msg,"PolicyName",params,undefined,false); 
			

			svc.deleteEmailIdentityPolicy(params,cb);
		}

		
		service.DeleteEmailTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(msg,"TemplateName",params,undefined,false); 
			

			svc.deleteEmailTemplate(params,cb);
		}

		
		service.DeleteSuppressedDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EmailAddress",params,undefined,false); 
			
			copyArgs(n,"EmailAddress",params,undefined,false); 
			
			copyArgs(msg,"EmailAddress",params,undefined,false); 
			

			svc.deleteSuppressedDestination(params,cb);
		}

		
		service.GetAccount=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getAccount(params,cb);
		}

		
		service.GetBlacklistReports=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BlacklistItemNames",params,undefined,false); 
			
			copyArgs(n,"BlacklistItemNames",params,undefined,false); 
			
			copyArgs(msg,"BlacklistItemNames",params,undefined,false); 
			

			svc.getBlacklistReports(params,cb);
		}

		
		service.GetConfigurationSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			

			svc.getConfigurationSet(params,cb);
		}

		
		service.GetConfigurationSetEventDestinations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			

			svc.getConfigurationSetEventDestinations(params,cb);
		}

		
		service.GetContact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContactListName",params,undefined,false); 
			copyArgs(n,"EmailAddress",params,undefined,false); 
			
			copyArgs(n,"ContactListName",params,undefined,false); 
			copyArgs(n,"EmailAddress",params,undefined,false); 
			
			copyArgs(msg,"ContactListName",params,undefined,false); 
			copyArgs(msg,"EmailAddress",params,undefined,false); 
			

			svc.getContact(params,cb);
		}

		
		service.GetContactList=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContactListName",params,undefined,false); 
			
			copyArgs(n,"ContactListName",params,undefined,false); 
			
			copyArgs(msg,"ContactListName",params,undefined,false); 
			

			svc.getContactList(params,cb);
		}

		
		service.GetCustomVerificationEmailTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(msg,"TemplateName",params,undefined,false); 
			

			svc.getCustomVerificationEmailTemplate(params,cb);
		}

		
		service.GetDedicatedIp=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Ip",params,undefined,false); 
			
			copyArgs(n,"Ip",params,undefined,false); 
			
			copyArgs(msg,"Ip",params,undefined,false); 
			

			svc.getDedicatedIp(params,cb);
		}

		
		service.GetDedicatedIps=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"PoolName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			
			copyArgs(msg,"PoolName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			

			svc.getDedicatedIps(params,cb);
		}

		
		service.GetDeliverabilityDashboardOptions=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getDeliverabilityDashboardOptions(params,cb);
		}

		
		service.GetDeliverabilityTestReport=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReportId",params,undefined,false); 
			
			copyArgs(n,"ReportId",params,undefined,false); 
			
			copyArgs(msg,"ReportId",params,undefined,false); 
			

			svc.getDeliverabilityTestReport(params,cb);
		}

		
		service.GetDomainDeliverabilityCampaign=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CampaignId",params,undefined,false); 
			
			copyArgs(n,"CampaignId",params,undefined,false); 
			
			copyArgs(msg,"CampaignId",params,undefined,false); 
			

			svc.getDomainDeliverabilityCampaign(params,cb);
		}

		
		service.GetDomainStatisticsReport=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Domain",params,undefined,false); 
			copyArgs(n,"StartDate",params,undefined,false); 
			copyArgs(n,"EndDate",params,undefined,false); 
			
			copyArgs(n,"Domain",params,undefined,false); 
			copyArgs(n,"StartDate",params,undefined,false); 
			copyArgs(n,"EndDate",params,undefined,false); 
			
			copyArgs(msg,"Domain",params,undefined,false); 
			copyArgs(msg,"StartDate",params,undefined,false); 
			copyArgs(msg,"EndDate",params,undefined,false); 
			

			svc.getDomainStatisticsReport(params,cb);
		}

		
		service.GetEmailIdentity=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EmailIdentity",params,undefined,false); 
			
			copyArgs(n,"EmailIdentity",params,undefined,false); 
			
			copyArgs(msg,"EmailIdentity",params,undefined,false); 
			

			svc.getEmailIdentity(params,cb);
		}

		
		service.GetEmailIdentityPolicies=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EmailIdentity",params,undefined,false); 
			
			copyArgs(n,"EmailIdentity",params,undefined,false); 
			
			copyArgs(msg,"EmailIdentity",params,undefined,false); 
			

			svc.getEmailIdentityPolicies(params,cb);
		}

		
		service.GetEmailTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(msg,"TemplateName",params,undefined,false); 
			

			svc.getEmailTemplate(params,cb);
		}

		
		service.GetImportJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.getImportJob(params,cb);
		}

		
		service.GetSuppressedDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EmailAddress",params,undefined,false); 
			
			copyArgs(n,"EmailAddress",params,undefined,false); 
			
			copyArgs(msg,"EmailAddress",params,undefined,false); 
			

			svc.getSuppressedDestination(params,cb);
		}

		
		service.ListConfigurationSets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			

			svc.listConfigurationSets(params,cb);
		}

		
		service.ListContactLists=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"PageSize",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listContactLists(params,cb);
		}

		
		service.ListContacts=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContactListName",params,undefined,false); 
			
			copyArgs(n,"ContactListName",params,undefined,false); 
			copyArgs(n,"Filter",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ContactListName",params,undefined,false); 
			copyArgs(msg,"Filter",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listContacts(params,cb);
		}

		
		service.ListCustomVerificationEmailTemplates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			

			svc.listCustomVerificationEmailTemplates(params,cb);
		}

		
		service.ListDedicatedIpPools=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			

			svc.listDedicatedIpPools(params,cb);
		}

		
		service.ListDeliverabilityTestReports=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			

			svc.listDeliverabilityTestReports(params,cb);
		}

		
		service.ListDomainDeliverabilityCampaigns=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StartDate",params,undefined,false); 
			copyArgs(n,"EndDate",params,undefined,false); 
			copyArgs(n,"SubscribedDomain",params,undefined,false); 
			
			copyArgs(n,"StartDate",params,undefined,false); 
			copyArgs(n,"EndDate",params,undefined,false); 
			copyArgs(n,"SubscribedDomain",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			
			copyArgs(msg,"StartDate",params,undefined,false); 
			copyArgs(msg,"EndDate",params,undefined,false); 
			copyArgs(msg,"SubscribedDomain",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			

			svc.listDomainDeliverabilityCampaigns(params,cb);
		}

		
		service.ListEmailIdentities=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			

			svc.listEmailIdentities(params,cb);
		}

		
		service.ListEmailTemplates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			

			svc.listEmailTemplates(params,cb);
		}

		
		service.ListImportJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ImportDestinationType",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			
			copyArgs(msg,"ImportDestinationType",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			

			svc.listImportJobs(params,cb);
		}

		
		service.ListSuppressedDestinations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Reasons",params,undefined,true); 
			copyArgs(n,"StartDate",params,undefined,false); 
			copyArgs(n,"EndDate",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			
			copyArgs(msg,"Reasons",params,undefined,true); 
			copyArgs(msg,"StartDate",params,undefined,false); 
			copyArgs(msg,"EndDate",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			

			svc.listSuppressedDestinations(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutAccountDedicatedIpWarmupAttributes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AutoWarmupEnabled",params,undefined,false); 
			
			copyArgs(msg,"AutoWarmupEnabled",params,undefined,false); 
			

			svc.putAccountDedicatedIpWarmupAttributes(params,cb);
		}

		
		service.PutAccountDetails=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MailType",params,undefined,false); 
			copyArgs(n,"WebsiteURL",params,undefined,true); 
			copyArgs(n,"UseCaseDescription",params,undefined,true); 
			
			copyArgs(n,"MailType",params,undefined,false); 
			copyArgs(n,"WebsiteURL",params,undefined,true); 
			copyArgs(n,"ContactLanguage",params,undefined,false); 
			copyArgs(n,"UseCaseDescription",params,undefined,true); 
			copyArgs(n,"AdditionalContactEmailAddresses",params,undefined,true); 
			copyArgs(n,"ProductionAccessEnabled",params,undefined,false); 
			
			copyArgs(msg,"MailType",params,undefined,false); 
			copyArgs(msg,"WebsiteURL",params,undefined,true); 
			copyArgs(msg,"ContactLanguage",params,undefined,false); 
			copyArgs(msg,"UseCaseDescription",params,undefined,true); 
			copyArgs(msg,"AdditionalContactEmailAddresses",params,undefined,true); 
			copyArgs(msg,"ProductionAccessEnabled",params,undefined,false); 
			

			svc.putAccountDetails(params,cb);
		}

		
		service.PutAccountSendingAttributes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SendingEnabled",params,undefined,false); 
			
			copyArgs(msg,"SendingEnabled",params,undefined,false); 
			

			svc.putAccountSendingAttributes(params,cb);
		}

		
		service.PutAccountSuppressionAttributes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SuppressedReasons",params,undefined,true); 
			
			copyArgs(msg,"SuppressedReasons",params,undefined,true); 
			

			svc.putAccountSuppressionAttributes(params,cb);
		}

		
		service.PutConfigurationSetDeliveryOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(n,"TlsPolicy",params,undefined,false); 
			copyArgs(n,"SendingPoolName",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			copyArgs(msg,"TlsPolicy",params,undefined,false); 
			copyArgs(msg,"SendingPoolName",params,undefined,false); 
			

			svc.putConfigurationSetDeliveryOptions(params,cb);
		}

		
		service.PutConfigurationSetReputationOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(n,"ReputationMetricsEnabled",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			copyArgs(msg,"ReputationMetricsEnabled",params,undefined,false); 
			

			svc.putConfigurationSetReputationOptions(params,cb);
		}

		
		service.PutConfigurationSetSendingOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(n,"SendingEnabled",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			copyArgs(msg,"SendingEnabled",params,undefined,false); 
			

			svc.putConfigurationSetSendingOptions(params,cb);
		}

		
		service.PutConfigurationSetSuppressionOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(n,"SuppressedReasons",params,undefined,true); 
			
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			copyArgs(msg,"SuppressedReasons",params,undefined,true); 
			

			svc.putConfigurationSetSuppressionOptions(params,cb);
		}

		
		service.PutConfigurationSetTrackingOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(n,"CustomRedirectDomain",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			copyArgs(msg,"CustomRedirectDomain",params,undefined,false); 
			

			svc.putConfigurationSetTrackingOptions(params,cb);
		}

		
		service.PutDedicatedIpInPool=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Ip",params,undefined,false); 
			copyArgs(n,"DestinationPoolName",params,undefined,false); 
			
			copyArgs(n,"Ip",params,undefined,false); 
			copyArgs(n,"DestinationPoolName",params,undefined,false); 
			
			copyArgs(msg,"Ip",params,undefined,false); 
			copyArgs(msg,"DestinationPoolName",params,undefined,false); 
			

			svc.putDedicatedIpInPool(params,cb);
		}

		
		service.PutDedicatedIpWarmupAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Ip",params,undefined,false); 
			copyArgs(n,"WarmupPercentage",params,undefined,false); 
			
			copyArgs(n,"Ip",params,undefined,false); 
			copyArgs(n,"WarmupPercentage",params,undefined,false); 
			
			copyArgs(msg,"Ip",params,undefined,false); 
			copyArgs(msg,"WarmupPercentage",params,undefined,false); 
			

			svc.putDedicatedIpWarmupAttributes(params,cb);
		}

		
		service.PutDeliverabilityDashboardOption=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DashboardEnabled",params,undefined,false); 
			
			copyArgs(n,"DashboardEnabled",params,undefined,false); 
			copyArgs(n,"SubscribedDomains",params,undefined,true); 
			
			copyArgs(msg,"DashboardEnabled",params,undefined,false); 
			copyArgs(msg,"SubscribedDomains",params,undefined,true); 
			

			svc.putDeliverabilityDashboardOption(params,cb);
		}

		
		service.PutEmailIdentityConfigurationSetAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EmailIdentity",params,undefined,false); 
			
			copyArgs(n,"EmailIdentity",params,undefined,false); 
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArgs(msg,"EmailIdentity",params,undefined,false); 
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			

			svc.putEmailIdentityConfigurationSetAttributes(params,cb);
		}

		
		service.PutEmailIdentityDkimAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EmailIdentity",params,undefined,false); 
			
			copyArgs(n,"EmailIdentity",params,undefined,false); 
			copyArgs(n,"SigningEnabled",params,undefined,false); 
			
			copyArgs(msg,"EmailIdentity",params,undefined,false); 
			copyArgs(msg,"SigningEnabled",params,undefined,false); 
			

			svc.putEmailIdentityDkimAttributes(params,cb);
		}

		
		service.PutEmailIdentityDkimSigningAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EmailIdentity",params,undefined,false); 
			copyArgs(n,"SigningAttributesOrigin",params,undefined,false); 
			
			copyArgs(n,"EmailIdentity",params,undefined,false); 
			copyArgs(n,"SigningAttributesOrigin",params,undefined,false); 
			copyArgs(n,"SigningAttributes",params,undefined,true); 
			
			copyArgs(msg,"EmailIdentity",params,undefined,false); 
			copyArgs(msg,"SigningAttributesOrigin",params,undefined,false); 
			copyArgs(msg,"SigningAttributes",params,undefined,true); 
			

			svc.putEmailIdentityDkimSigningAttributes(params,cb);
		}

		
		service.PutEmailIdentityFeedbackAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EmailIdentity",params,undefined,false); 
			
			copyArgs(n,"EmailIdentity",params,undefined,false); 
			copyArgs(n,"EmailForwardingEnabled",params,undefined,false); 
			
			copyArgs(msg,"EmailIdentity",params,undefined,false); 
			copyArgs(msg,"EmailForwardingEnabled",params,undefined,false); 
			

			svc.putEmailIdentityFeedbackAttributes(params,cb);
		}

		
		service.PutEmailIdentityMailFromAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EmailIdentity",params,undefined,false); 
			
			copyArgs(n,"EmailIdentity",params,undefined,false); 
			copyArgs(n,"MailFromDomain",params,undefined,false); 
			copyArgs(n,"BehaviorOnMxFailure",params,undefined,false); 
			
			copyArgs(msg,"EmailIdentity",params,undefined,false); 
			copyArgs(msg,"MailFromDomain",params,undefined,false); 
			copyArgs(msg,"BehaviorOnMxFailure",params,undefined,false); 
			

			svc.putEmailIdentityMailFromAttributes(params,cb);
		}

		
		service.PutSuppressedDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EmailAddress",params,undefined,false); 
			copyArgs(n,"Reason",params,undefined,false); 
			
			copyArgs(n,"EmailAddress",params,undefined,false); 
			copyArgs(n,"Reason",params,undefined,false); 
			
			copyArgs(msg,"EmailAddress",params,undefined,false); 
			copyArgs(msg,"Reason",params,undefined,false); 
			

			svc.putSuppressedDestination(params,cb);
		}

		
		service.SendBulkEmail=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DefaultContent",params,undefined,false); 
			copyArgs(n,"BulkEmailEntries",params,undefined,false); 
			
			copyArgs(n,"FromEmailAddress",params,undefined,false); 
			copyArgs(n,"FromEmailAddressIdentityArn",params,undefined,false); 
			copyArgs(n,"ReplyToAddresses",params,undefined,true); 
			copyArgs(n,"FeedbackForwardingEmailAddress",params,undefined,false); 
			copyArgs(n,"FeedbackForwardingEmailAddressIdentityArn",params,undefined,false); 
			copyArgs(n,"DefaultEmailTags",params,undefined,true); 
			copyArgs(n,"DefaultContent",params,undefined,false); 
			copyArgs(n,"BulkEmailEntries",params,undefined,false); 
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArgs(msg,"FromEmailAddress",params,undefined,false); 
			copyArgs(msg,"FromEmailAddressIdentityArn",params,undefined,false); 
			copyArgs(msg,"ReplyToAddresses",params,undefined,true); 
			copyArgs(msg,"FeedbackForwardingEmailAddress",params,undefined,false); 
			copyArgs(msg,"FeedbackForwardingEmailAddressIdentityArn",params,undefined,false); 
			copyArgs(msg,"DefaultEmailTags",params,undefined,true); 
			copyArgs(msg,"DefaultContent",params,undefined,false); 
			copyArgs(msg,"BulkEmailEntries",params,undefined,false); 
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			

			svc.sendBulkEmail(params,cb);
		}

		
		service.SendCustomVerificationEmail=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EmailAddress",params,undefined,false); 
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(n,"EmailAddress",params,undefined,false); 
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArgs(msg,"EmailAddress",params,undefined,false); 
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			

			svc.sendCustomVerificationEmail(params,cb);
		}

		
		service.SendEmail=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Content",params,undefined,true); 
			
			copyArgs(n,"FromEmailAddress",params,undefined,false); 
			copyArgs(n,"FromEmailAddressIdentityArn",params,undefined,false); 
			copyArgs(n,"Destination",params,undefined,true); 
			copyArgs(n,"ReplyToAddresses",params,undefined,true); 
			copyArgs(n,"FeedbackForwardingEmailAddress",params,undefined,false); 
			copyArgs(n,"FeedbackForwardingEmailAddressIdentityArn",params,undefined,false); 
			copyArgs(n,"Content",params,undefined,true); 
			copyArgs(n,"EmailTags",params,undefined,true); 
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(n,"ListManagementOptions",params,undefined,false); 
			
			copyArgs(msg,"FromEmailAddress",params,undefined,false); 
			copyArgs(msg,"FromEmailAddressIdentityArn",params,undefined,false); 
			copyArgs(msg,"Destination",params,undefined,true); 
			copyArgs(msg,"ReplyToAddresses",params,undefined,true); 
			copyArgs(msg,"FeedbackForwardingEmailAddress",params,undefined,false); 
			copyArgs(msg,"FeedbackForwardingEmailAddressIdentityArn",params,undefined,false); 
			copyArgs(msg,"Content",params,undefined,true); 
			copyArgs(msg,"EmailTags",params,undefined,true); 
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			copyArgs(msg,"ListManagementOptions",params,undefined,false); 
			

			svc.sendEmail(params,cb);
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

		
		service.TestRenderEmailTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"TemplateData",params,undefined,false); 
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"TemplateData",params,undefined,false); 
			
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"TemplateData",params,undefined,false); 
			

			svc.testRenderEmailTemplate(params,cb);
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

		
		service.UpdateConfigurationSetEventDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(n,"EventDestinationName",params,undefined,false); 
			copyArgs(n,"EventDestination",params,undefined,true); 
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(n,"EventDestinationName",params,undefined,false); 
			copyArgs(n,"EventDestination",params,undefined,true); 
			
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			copyArgs(msg,"EventDestinationName",params,undefined,false); 
			copyArgs(msg,"EventDestination",params,undefined,true); 
			

			svc.updateConfigurationSetEventDestination(params,cb);
		}

		
		service.UpdateContact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContactListName",params,undefined,false); 
			copyArgs(n,"EmailAddress",params,undefined,false); 
			
			copyArgs(n,"ContactListName",params,undefined,false); 
			copyArgs(n,"EmailAddress",params,undefined,false); 
			copyArgs(n,"TopicPreferences",params,undefined,true); 
			copyArgs(n,"UnsubscribeAll",params,undefined,false); 
			copyArgs(n,"AttributesData",params,undefined,false); 
			
			copyArgs(msg,"ContactListName",params,undefined,false); 
			copyArgs(msg,"EmailAddress",params,undefined,false); 
			copyArgs(msg,"TopicPreferences",params,undefined,true); 
			copyArgs(msg,"UnsubscribeAll",params,undefined,false); 
			copyArgs(msg,"AttributesData",params,undefined,false); 
			

			svc.updateContact(params,cb);
		}

		
		service.UpdateContactList=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContactListName",params,undefined,false); 
			
			copyArgs(n,"ContactListName",params,undefined,false); 
			copyArgs(n,"Topics",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(msg,"ContactListName",params,undefined,false); 
			copyArgs(msg,"Topics",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			

			svc.updateContactList(params,cb);
		}

		
		service.UpdateCustomVerificationEmailTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"FromEmailAddress",params,undefined,false); 
			copyArgs(n,"TemplateSubject",params,undefined,false); 
			copyArgs(n,"TemplateContent",params,undefined,false); 
			copyArgs(n,"SuccessRedirectionURL",params,undefined,false); 
			copyArgs(n,"FailureRedirectionURL",params,undefined,false); 
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"FromEmailAddress",params,undefined,false); 
			copyArgs(n,"TemplateSubject",params,undefined,false); 
			copyArgs(n,"TemplateContent",params,undefined,false); 
			copyArgs(n,"SuccessRedirectionURL",params,undefined,false); 
			copyArgs(n,"FailureRedirectionURL",params,undefined,false); 
			
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"FromEmailAddress",params,undefined,false); 
			copyArgs(msg,"TemplateSubject",params,undefined,false); 
			copyArgs(msg,"TemplateContent",params,undefined,false); 
			copyArgs(msg,"SuccessRedirectionURL",params,undefined,false); 
			copyArgs(msg,"FailureRedirectionURL",params,undefined,false); 
			

			svc.updateCustomVerificationEmailTemplate(params,cb);
		}

		
		service.UpdateEmailIdentityPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EmailIdentity",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(n,"EmailIdentity",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(msg,"EmailIdentity",params,undefined,false); 
			copyArgs(msg,"PolicyName",params,undefined,false); 
			copyArgs(msg,"Policy",params,undefined,false); 
			

			svc.updateEmailIdentityPolicy(params,cb);
		}

		
		service.UpdateEmailTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"TemplateContent",params,undefined,true); 
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"TemplateContent",params,undefined,true); 
			
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"TemplateContent",params,undefined,true); 
			

			svc.updateEmailTemplate(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS SESV2", AmazonAPINode);

};
