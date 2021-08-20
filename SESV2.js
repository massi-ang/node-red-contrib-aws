
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

		var awsService = new AWS.SESV2( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.SESV2(msg.AWSConfig) : awsService;

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

		
		service.CreateConfigurationSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			copyArg(msg,"TrackingOptions",params,undefined,true); 
			copyArg(msg,"DeliveryOptions",params,undefined,true); 
			copyArg(msg,"ReputationOptions",params,undefined,true); 
			copyArg(msg,"SendingOptions",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"SuppressionOptions",params,undefined,true); 
			

			svc.createConfigurationSet(params,cb);
		}

		
		service.CreateConfigurationSetEventDestination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationSetName",params,undefined,false); 
			copyArg(n,"EventDestinationName",params,undefined,false); 
			copyArg(n,"EventDestination",params,undefined,true); 
			
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			copyArg(msg,"EventDestinationName",params,undefined,false); 
			copyArg(msg,"EventDestination",params,undefined,true); 
			

			svc.createConfigurationSetEventDestination(params,cb);
		}

		
		service.CreateContact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContactListName",params,undefined,false); 
			copyArg(n,"EmailAddress",params,undefined,false); 
			
			copyArg(msg,"ContactListName",params,undefined,false); 
			copyArg(msg,"EmailAddress",params,undefined,false); 
			copyArg(msg,"TopicPreferences",params,undefined,true); 
			copyArg(msg,"UnsubscribeAll",params,undefined,false); 
			copyArg(msg,"AttributesData",params,undefined,false); 
			

			svc.createContact(params,cb);
		}

		
		service.CreateContactList=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContactListName",params,undefined,false); 
			
			copyArg(msg,"ContactListName",params,undefined,false); 
			copyArg(msg,"Topics",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createContactList(params,cb);
		}

		
		service.CreateCustomVerificationEmailTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TemplateName",params,undefined,false); 
			copyArg(n,"FromEmailAddress",params,undefined,false); 
			copyArg(n,"TemplateSubject",params,undefined,false); 
			copyArg(n,"TemplateContent",params,undefined,false); 
			copyArg(n,"SuccessRedirectionURL",params,undefined,false); 
			copyArg(n,"FailureRedirectionURL",params,undefined,false); 
			
			copyArg(msg,"TemplateName",params,undefined,false); 
			copyArg(msg,"FromEmailAddress",params,undefined,false); 
			copyArg(msg,"TemplateSubject",params,undefined,false); 
			copyArg(msg,"TemplateContent",params,undefined,false); 
			copyArg(msg,"SuccessRedirectionURL",params,undefined,false); 
			copyArg(msg,"FailureRedirectionURL",params,undefined,false); 
			

			svc.createCustomVerificationEmailTemplate(params,cb);
		}

		
		service.CreateDedicatedIpPool=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PoolName",params,undefined,false); 
			
			copyArg(msg,"PoolName",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createDedicatedIpPool(params,cb);
		}

		
		service.CreateDeliverabilityTestReport=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FromEmailAddress",params,undefined,false); 
			copyArg(n,"Content",params,undefined,true); 
			
			copyArg(msg,"ReportName",params,undefined,false); 
			copyArg(msg,"FromEmailAddress",params,undefined,false); 
			copyArg(msg,"Content",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createDeliverabilityTestReport(params,cb);
		}

		
		service.CreateEmailIdentity=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EmailIdentity",params,undefined,false); 
			
			copyArg(msg,"EmailIdentity",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"DkimSigningAttributes",params,undefined,true); 
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			

			svc.createEmailIdentity(params,cb);
		}

		
		service.CreateEmailIdentityPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EmailIdentity",params,undefined,false); 
			copyArg(n,"PolicyName",params,undefined,false); 
			copyArg(n,"Policy",params,undefined,false); 
			
			copyArg(msg,"EmailIdentity",params,undefined,false); 
			copyArg(msg,"PolicyName",params,undefined,false); 
			copyArg(msg,"Policy",params,undefined,false); 
			

			svc.createEmailIdentityPolicy(params,cb);
		}

		
		service.CreateEmailTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TemplateName",params,undefined,false); 
			copyArg(n,"TemplateContent",params,undefined,true); 
			
			copyArg(msg,"TemplateName",params,undefined,false); 
			copyArg(msg,"TemplateContent",params,undefined,true); 
			

			svc.createEmailTemplate(params,cb);
		}

		
		service.CreateImportJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ImportDestination",params,undefined,true); 
			copyArg(n,"ImportDataSource",params,undefined,true); 
			
			copyArg(msg,"ImportDestination",params,undefined,true); 
			copyArg(msg,"ImportDataSource",params,undefined,true); 
			

			svc.createImportJob(params,cb);
		}

		
		service.DeleteConfigurationSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			

			svc.deleteConfigurationSet(params,cb);
		}

		
		service.DeleteConfigurationSetEventDestination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationSetName",params,undefined,false); 
			copyArg(n,"EventDestinationName",params,undefined,false); 
			
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			copyArg(msg,"EventDestinationName",params,undefined,false); 
			

			svc.deleteConfigurationSetEventDestination(params,cb);
		}

		
		service.DeleteContact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContactListName",params,undefined,false); 
			copyArg(n,"EmailAddress",params,undefined,false); 
			
			copyArg(msg,"ContactListName",params,undefined,false); 
			copyArg(msg,"EmailAddress",params,undefined,false); 
			

			svc.deleteContact(params,cb);
		}

		
		service.DeleteContactList=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContactListName",params,undefined,false); 
			
			copyArg(msg,"ContactListName",params,undefined,false); 
			

			svc.deleteContactList(params,cb);
		}

		
		service.DeleteCustomVerificationEmailTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TemplateName",params,undefined,false); 
			
			copyArg(msg,"TemplateName",params,undefined,false); 
			

			svc.deleteCustomVerificationEmailTemplate(params,cb);
		}

		
		service.DeleteDedicatedIpPool=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PoolName",params,undefined,false); 
			
			copyArg(msg,"PoolName",params,undefined,false); 
			

			svc.deleteDedicatedIpPool(params,cb);
		}

		
		service.DeleteEmailIdentity=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EmailIdentity",params,undefined,false); 
			
			copyArg(msg,"EmailIdentity",params,undefined,false); 
			

			svc.deleteEmailIdentity(params,cb);
		}

		
		service.DeleteEmailIdentityPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EmailIdentity",params,undefined,false); 
			copyArg(n,"PolicyName",params,undefined,false); 
			
			copyArg(msg,"EmailIdentity",params,undefined,false); 
			copyArg(msg,"PolicyName",params,undefined,false); 
			

			svc.deleteEmailIdentityPolicy(params,cb);
		}

		
		service.DeleteEmailTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TemplateName",params,undefined,false); 
			
			copyArg(msg,"TemplateName",params,undefined,false); 
			

			svc.deleteEmailTemplate(params,cb);
		}

		
		service.DeleteSuppressedDestination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EmailAddress",params,undefined,false); 
			
			copyArg(msg,"EmailAddress",params,undefined,false); 
			

			svc.deleteSuppressedDestination(params,cb);
		}

		
		service.GetAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getAccount(params,cb);
		}

		
		service.GetBlacklistReports=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BlacklistItemNames",params,undefined,false); 
			
			copyArg(msg,"BlacklistItemNames",params,undefined,false); 
			

			svc.getBlacklistReports(params,cb);
		}

		
		service.GetConfigurationSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			

			svc.getConfigurationSet(params,cb);
		}

		
		service.GetConfigurationSetEventDestinations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			

			svc.getConfigurationSetEventDestinations(params,cb);
		}

		
		service.GetContact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContactListName",params,undefined,false); 
			copyArg(n,"EmailAddress",params,undefined,false); 
			
			copyArg(msg,"ContactListName",params,undefined,false); 
			copyArg(msg,"EmailAddress",params,undefined,false); 
			

			svc.getContact(params,cb);
		}

		
		service.GetContactList=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContactListName",params,undefined,false); 
			
			copyArg(msg,"ContactListName",params,undefined,false); 
			

			svc.getContactList(params,cb);
		}

		
		service.GetCustomVerificationEmailTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TemplateName",params,undefined,false); 
			
			copyArg(msg,"TemplateName",params,undefined,false); 
			

			svc.getCustomVerificationEmailTemplate(params,cb);
		}

		
		service.GetDedicatedIp=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Ip",params,undefined,false); 
			
			copyArg(msg,"Ip",params,undefined,false); 
			

			svc.getDedicatedIp(params,cb);
		}

		
		service.GetDedicatedIps=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"PoolName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			

			svc.getDedicatedIps(params,cb);
		}

		
		service.GetDeliverabilityDashboardOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getDeliverabilityDashboardOptions(params,cb);
		}

		
		service.GetDeliverabilityTestReport=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReportId",params,undefined,false); 
			
			copyArg(msg,"ReportId",params,undefined,false); 
			

			svc.getDeliverabilityTestReport(params,cb);
		}

		
		service.GetDomainDeliverabilityCampaign=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CampaignId",params,undefined,false); 
			
			copyArg(msg,"CampaignId",params,undefined,false); 
			

			svc.getDomainDeliverabilityCampaign(params,cb);
		}

		
		service.GetDomainStatisticsReport=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Domain",params,undefined,false); 
			copyArg(n,"StartDate",params,undefined,false); 
			copyArg(n,"EndDate",params,undefined,false); 
			
			copyArg(msg,"Domain",params,undefined,false); 
			copyArg(msg,"StartDate",params,undefined,false); 
			copyArg(msg,"EndDate",params,undefined,false); 
			

			svc.getDomainStatisticsReport(params,cb);
		}

		
		service.GetEmailIdentity=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EmailIdentity",params,undefined,false); 
			
			copyArg(msg,"EmailIdentity",params,undefined,false); 
			

			svc.getEmailIdentity(params,cb);
		}

		
		service.GetEmailIdentityPolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EmailIdentity",params,undefined,false); 
			
			copyArg(msg,"EmailIdentity",params,undefined,false); 
			

			svc.getEmailIdentityPolicies(params,cb);
		}

		
		service.GetEmailTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TemplateName",params,undefined,false); 
			
			copyArg(msg,"TemplateName",params,undefined,false); 
			

			svc.getEmailTemplate(params,cb);
		}

		
		service.GetImportJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobId",params,undefined,false); 
			
			copyArg(msg,"JobId",params,undefined,false); 
			

			svc.getImportJob(params,cb);
		}

		
		service.GetSuppressedDestination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EmailAddress",params,undefined,false); 
			
			copyArg(msg,"EmailAddress",params,undefined,false); 
			

			svc.getSuppressedDestination(params,cb);
		}

		
		service.ListConfigurationSets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			

			svc.listConfigurationSets(params,cb);
		}

		
		service.ListContactLists=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"PageSize",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listContactLists(params,cb);
		}

		
		service.ListContacts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContactListName",params,undefined,false); 
			
			copyArg(msg,"ContactListName",params,undefined,false); 
			copyArg(msg,"Filter",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listContacts(params,cb);
		}

		
		service.ListCustomVerificationEmailTemplates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			

			svc.listCustomVerificationEmailTemplates(params,cb);
		}

		
		service.ListDedicatedIpPools=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			

			svc.listDedicatedIpPools(params,cb);
		}

		
		service.ListDeliverabilityTestReports=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			

			svc.listDeliverabilityTestReports(params,cb);
		}

		
		service.ListDomainDeliverabilityCampaigns=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StartDate",params,undefined,false); 
			copyArg(n,"EndDate",params,undefined,false); 
			copyArg(n,"SubscribedDomain",params,undefined,false); 
			
			copyArg(msg,"StartDate",params,undefined,false); 
			copyArg(msg,"EndDate",params,undefined,false); 
			copyArg(msg,"SubscribedDomain",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			

			svc.listDomainDeliverabilityCampaigns(params,cb);
		}

		
		service.ListEmailIdentities=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			

			svc.listEmailIdentities(params,cb);
		}

		
		service.ListEmailTemplates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			

			svc.listEmailTemplates(params,cb);
		}

		
		service.ListImportJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ImportDestinationType",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			

			svc.listImportJobs(params,cb);
		}

		
		service.ListSuppressedDestinations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Reasons",params,undefined,true); 
			copyArg(msg,"StartDate",params,undefined,false); 
			copyArg(msg,"EndDate",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			

			svc.listSuppressedDestinations(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutAccountDedicatedIpWarmupAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AutoWarmupEnabled",params,undefined,false); 
			

			svc.putAccountDedicatedIpWarmupAttributes(params,cb);
		}

		
		service.PutAccountDetails=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MailType",params,undefined,false); 
			copyArg(n,"WebsiteURL",params,undefined,true); 
			copyArg(n,"UseCaseDescription",params,undefined,true); 
			
			copyArg(msg,"MailType",params,undefined,false); 
			copyArg(msg,"WebsiteURL",params,undefined,true); 
			copyArg(msg,"ContactLanguage",params,undefined,false); 
			copyArg(msg,"UseCaseDescription",params,undefined,true); 
			copyArg(msg,"AdditionalContactEmailAddresses",params,undefined,true); 
			copyArg(msg,"ProductionAccessEnabled",params,undefined,false); 
			

			svc.putAccountDetails(params,cb);
		}

		
		service.PutAccountSendingAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SendingEnabled",params,undefined,false); 
			

			svc.putAccountSendingAttributes(params,cb);
		}

		
		service.PutAccountSuppressionAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SuppressedReasons",params,undefined,true); 
			

			svc.putAccountSuppressionAttributes(params,cb);
		}

		
		service.PutConfigurationSetDeliveryOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			copyArg(msg,"TlsPolicy",params,undefined,false); 
			copyArg(msg,"SendingPoolName",params,undefined,false); 
			

			svc.putConfigurationSetDeliveryOptions(params,cb);
		}

		
		service.PutConfigurationSetReputationOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			copyArg(msg,"ReputationMetricsEnabled",params,undefined,false); 
			

			svc.putConfigurationSetReputationOptions(params,cb);
		}

		
		service.PutConfigurationSetSendingOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			copyArg(msg,"SendingEnabled",params,undefined,false); 
			

			svc.putConfigurationSetSendingOptions(params,cb);
		}

		
		service.PutConfigurationSetSuppressionOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			copyArg(msg,"SuppressedReasons",params,undefined,true); 
			

			svc.putConfigurationSetSuppressionOptions(params,cb);
		}

		
		service.PutConfigurationSetTrackingOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			copyArg(msg,"CustomRedirectDomain",params,undefined,false); 
			

			svc.putConfigurationSetTrackingOptions(params,cb);
		}

		
		service.PutDedicatedIpInPool=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Ip",params,undefined,false); 
			copyArg(n,"DestinationPoolName",params,undefined,false); 
			
			copyArg(msg,"Ip",params,undefined,false); 
			copyArg(msg,"DestinationPoolName",params,undefined,false); 
			

			svc.putDedicatedIpInPool(params,cb);
		}

		
		service.PutDedicatedIpWarmupAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Ip",params,undefined,false); 
			copyArg(n,"WarmupPercentage",params,undefined,false); 
			
			copyArg(msg,"Ip",params,undefined,false); 
			copyArg(msg,"WarmupPercentage",params,undefined,false); 
			

			svc.putDedicatedIpWarmupAttributes(params,cb);
		}

		
		service.PutDeliverabilityDashboardOption=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DashboardEnabled",params,undefined,false); 
			
			copyArg(msg,"DashboardEnabled",params,undefined,false); 
			copyArg(msg,"SubscribedDomains",params,undefined,true); 
			

			svc.putDeliverabilityDashboardOption(params,cb);
		}

		
		service.PutEmailIdentityConfigurationSetAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EmailIdentity",params,undefined,false); 
			
			copyArg(msg,"EmailIdentity",params,undefined,false); 
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			

			svc.putEmailIdentityConfigurationSetAttributes(params,cb);
		}

		
		service.PutEmailIdentityDkimAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EmailIdentity",params,undefined,false); 
			
			copyArg(msg,"EmailIdentity",params,undefined,false); 
			copyArg(msg,"SigningEnabled",params,undefined,false); 
			

			svc.putEmailIdentityDkimAttributes(params,cb);
		}

		
		service.PutEmailIdentityDkimSigningAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EmailIdentity",params,undefined,false); 
			copyArg(n,"SigningAttributesOrigin",params,undefined,false); 
			
			copyArg(msg,"EmailIdentity",params,undefined,false); 
			copyArg(msg,"SigningAttributesOrigin",params,undefined,false); 
			copyArg(msg,"SigningAttributes",params,undefined,true); 
			

			svc.putEmailIdentityDkimSigningAttributes(params,cb);
		}

		
		service.PutEmailIdentityFeedbackAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EmailIdentity",params,undefined,false); 
			
			copyArg(msg,"EmailIdentity",params,undefined,false); 
			copyArg(msg,"EmailForwardingEnabled",params,undefined,false); 
			

			svc.putEmailIdentityFeedbackAttributes(params,cb);
		}

		
		service.PutEmailIdentityMailFromAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EmailIdentity",params,undefined,false); 
			
			copyArg(msg,"EmailIdentity",params,undefined,false); 
			copyArg(msg,"MailFromDomain",params,undefined,false); 
			copyArg(msg,"BehaviorOnMxFailure",params,undefined,false); 
			

			svc.putEmailIdentityMailFromAttributes(params,cb);
		}

		
		service.PutSuppressedDestination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EmailAddress",params,undefined,false); 
			copyArg(n,"Reason",params,undefined,false); 
			
			copyArg(msg,"EmailAddress",params,undefined,false); 
			copyArg(msg,"Reason",params,undefined,false); 
			

			svc.putSuppressedDestination(params,cb);
		}

		
		service.SendBulkEmail=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DefaultContent",params,undefined,false); 
			copyArg(n,"BulkEmailEntries",params,undefined,false); 
			
			copyArg(msg,"FromEmailAddress",params,undefined,false); 
			copyArg(msg,"FromEmailAddressIdentityArn",params,undefined,false); 
			copyArg(msg,"ReplyToAddresses",params,undefined,true); 
			copyArg(msg,"FeedbackForwardingEmailAddress",params,undefined,false); 
			copyArg(msg,"FeedbackForwardingEmailAddressIdentityArn",params,undefined,false); 
			copyArg(msg,"DefaultEmailTags",params,undefined,true); 
			copyArg(msg,"DefaultContent",params,undefined,false); 
			copyArg(msg,"BulkEmailEntries",params,undefined,false); 
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			

			svc.sendBulkEmail(params,cb);
		}

		
		service.SendCustomVerificationEmail=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EmailAddress",params,undefined,false); 
			copyArg(n,"TemplateName",params,undefined,false); 
			
			copyArg(msg,"EmailAddress",params,undefined,false); 
			copyArg(msg,"TemplateName",params,undefined,false); 
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			

			svc.sendCustomVerificationEmail(params,cb);
		}

		
		service.SendEmail=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Content",params,undefined,true); 
			
			copyArg(msg,"FromEmailAddress",params,undefined,false); 
			copyArg(msg,"FromEmailAddressIdentityArn",params,undefined,false); 
			copyArg(msg,"Destination",params,undefined,true); 
			copyArg(msg,"ReplyToAddresses",params,undefined,true); 
			copyArg(msg,"FeedbackForwardingEmailAddress",params,undefined,false); 
			copyArg(msg,"FeedbackForwardingEmailAddressIdentityArn",params,undefined,false); 
			copyArg(msg,"Content",params,undefined,true); 
			copyArg(msg,"EmailTags",params,undefined,true); 
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			copyArg(msg,"ListManagementOptions",params,undefined,false); 
			

			svc.sendEmail(params,cb);
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

		
		service.TestRenderEmailTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TemplateName",params,undefined,false); 
			copyArg(n,"TemplateData",params,undefined,false); 
			
			copyArg(msg,"TemplateName",params,undefined,false); 
			copyArg(msg,"TemplateData",params,undefined,false); 
			

			svc.testRenderEmailTemplate(params,cb);
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

		
		service.UpdateConfigurationSetEventDestination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationSetName",params,undefined,false); 
			copyArg(n,"EventDestinationName",params,undefined,false); 
			copyArg(n,"EventDestination",params,undefined,true); 
			
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			copyArg(msg,"EventDestinationName",params,undefined,false); 
			copyArg(msg,"EventDestination",params,undefined,true); 
			

			svc.updateConfigurationSetEventDestination(params,cb);
		}

		
		service.UpdateContact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContactListName",params,undefined,false); 
			copyArg(n,"EmailAddress",params,undefined,false); 
			
			copyArg(msg,"ContactListName",params,undefined,false); 
			copyArg(msg,"EmailAddress",params,undefined,false); 
			copyArg(msg,"TopicPreferences",params,undefined,true); 
			copyArg(msg,"UnsubscribeAll",params,undefined,false); 
			copyArg(msg,"AttributesData",params,undefined,false); 
			

			svc.updateContact(params,cb);
		}

		
		service.UpdateContactList=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContactListName",params,undefined,false); 
			
			copyArg(msg,"ContactListName",params,undefined,false); 
			copyArg(msg,"Topics",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			

			svc.updateContactList(params,cb);
		}

		
		service.UpdateCustomVerificationEmailTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TemplateName",params,undefined,false); 
			copyArg(n,"FromEmailAddress",params,undefined,false); 
			copyArg(n,"TemplateSubject",params,undefined,false); 
			copyArg(n,"TemplateContent",params,undefined,false); 
			copyArg(n,"SuccessRedirectionURL",params,undefined,false); 
			copyArg(n,"FailureRedirectionURL",params,undefined,false); 
			
			copyArg(msg,"TemplateName",params,undefined,false); 
			copyArg(msg,"FromEmailAddress",params,undefined,false); 
			copyArg(msg,"TemplateSubject",params,undefined,false); 
			copyArg(msg,"TemplateContent",params,undefined,false); 
			copyArg(msg,"SuccessRedirectionURL",params,undefined,false); 
			copyArg(msg,"FailureRedirectionURL",params,undefined,false); 
			

			svc.updateCustomVerificationEmailTemplate(params,cb);
		}

		
		service.UpdateEmailIdentityPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EmailIdentity",params,undefined,false); 
			copyArg(n,"PolicyName",params,undefined,false); 
			copyArg(n,"Policy",params,undefined,false); 
			
			copyArg(msg,"EmailIdentity",params,undefined,false); 
			copyArg(msg,"PolicyName",params,undefined,false); 
			copyArg(msg,"Policy",params,undefined,false); 
			

			svc.updateEmailIdentityPolicy(params,cb);
		}

		
		service.UpdateEmailTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TemplateName",params,undefined,false); 
			copyArg(n,"TemplateContent",params,undefined,true); 
			
			copyArg(msg,"TemplateName",params,undefined,false); 
			copyArg(msg,"TemplateContent",params,undefined,true); 
			

			svc.updateEmailTemplate(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS SESV2", AmazonAPINode);

};
