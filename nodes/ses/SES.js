
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

		var awsService = new AWS.SES( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.SES(msg.AWSConfig) : awsService;

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
		
			service.CloneReceiptRuleSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RuleSetName",params,undefined,false); 
			copyArgs(n,"OriginalRuleSetName",params,undefined,false); 
			
			copyArgs(n,"RuleSetName",params,undefined,false); 
			copyArgs(n,"OriginalRuleSetName",params,undefined,false); 
			
			copyArgs(msg,"RuleSetName",params,undefined,false); 
			copyArgs(msg,"OriginalRuleSetName",params,undefined,false); 
			

			svc.cloneReceiptRuleSet(params,cb);
		}
			service.CreateConfigurationSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationSet",params,undefined,true); 
			
			copyArgs(n,"ConfigurationSet",params,undefined,true); 
			
			copyArgs(msg,"ConfigurationSet",params,undefined,true); 
			

			svc.createConfigurationSet(params,cb);
		}
			service.CreateConfigurationSetEventDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(n,"EventDestination",params,undefined,true); 
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(n,"EventDestination",params,undefined,true); 
			
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			copyArgs(msg,"EventDestination",params,undefined,true); 
			

			svc.createConfigurationSetEventDestination(params,cb);
		}
			service.CreateConfigurationSetTrackingOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(n,"TrackingOptions",params,undefined,true); 
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(n,"TrackingOptions",params,undefined,true); 
			
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			copyArgs(msg,"TrackingOptions",params,undefined,true); 
			

			svc.createConfigurationSetTrackingOptions(params,cb);
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
			service.CreateReceiptFilter=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Filter",params,undefined,true); 
			
			copyArgs(n,"Filter",params,undefined,true); 
			
			copyArgs(msg,"Filter",params,undefined,true); 
			

			svc.createReceiptFilter(params,cb);
		}
			service.CreateReceiptRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RuleSetName",params,undefined,false); 
			copyArgs(n,"Rule",params,undefined,true); 
			
			copyArgs(n,"RuleSetName",params,undefined,false); 
			copyArgs(n,"After",params,undefined,false); 
			copyArgs(n,"Rule",params,undefined,true); 
			
			copyArgs(msg,"RuleSetName",params,undefined,false); 
			copyArgs(msg,"After",params,undefined,false); 
			copyArgs(msg,"Rule",params,undefined,true); 
			

			svc.createReceiptRule(params,cb);
		}
			service.CreateReceiptRuleSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RuleSetName",params,undefined,false); 
			
			copyArgs(n,"RuleSetName",params,undefined,false); 
			
			copyArgs(msg,"RuleSetName",params,undefined,false); 
			

			svc.createReceiptRuleSet(params,cb);
		}
			service.CreateTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Template",params,undefined,true); 
			
			copyArgs(n,"Template",params,undefined,true); 
			
			copyArgs(msg,"Template",params,undefined,true); 
			

			svc.createTemplate(params,cb);
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
			service.DeleteConfigurationSetTrackingOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			

			svc.deleteConfigurationSetTrackingOptions(params,cb);
		}
			service.DeleteCustomVerificationEmailTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(msg,"TemplateName",params,undefined,false); 
			

			svc.deleteCustomVerificationEmailTemplate(params,cb);
		}
			service.DeleteIdentity=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Identity",params,undefined,false); 
			
			copyArgs(n,"Identity",params,undefined,false); 
			
			copyArgs(msg,"Identity",params,undefined,false); 
			

			svc.deleteIdentity(params,cb);
		}
			service.DeleteIdentityPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Identity",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			
			copyArgs(n,"Identity",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			
			copyArgs(msg,"Identity",params,undefined,false); 
			copyArgs(msg,"PolicyName",params,undefined,false); 
			

			svc.deleteIdentityPolicy(params,cb);
		}
			service.DeleteReceiptFilter=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FilterName",params,undefined,false); 
			
			copyArgs(n,"FilterName",params,undefined,false); 
			
			copyArgs(msg,"FilterName",params,undefined,false); 
			

			svc.deleteReceiptFilter(params,cb);
		}
			service.DeleteReceiptRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RuleSetName",params,undefined,false); 
			copyArgs(n,"RuleName",params,undefined,false); 
			
			copyArgs(n,"RuleSetName",params,undefined,false); 
			copyArgs(n,"RuleName",params,undefined,false); 
			
			copyArgs(msg,"RuleSetName",params,undefined,false); 
			copyArgs(msg,"RuleName",params,undefined,false); 
			

			svc.deleteReceiptRule(params,cb);
		}
			service.DeleteReceiptRuleSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RuleSetName",params,undefined,false); 
			
			copyArgs(n,"RuleSetName",params,undefined,false); 
			
			copyArgs(msg,"RuleSetName",params,undefined,false); 
			

			svc.deleteReceiptRuleSet(params,cb);
		}
			service.DeleteTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(msg,"TemplateName",params,undefined,false); 
			

			svc.deleteTemplate(params,cb);
		}
			service.DeleteVerifiedEmailAddress=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EmailAddress",params,undefined,false); 
			
			copyArgs(n,"EmailAddress",params,undefined,false); 
			
			copyArgs(msg,"EmailAddress",params,undefined,false); 
			

			svc.deleteVerifiedEmailAddress(params,cb);
		}
			service.DescribeActiveReceiptRuleSet=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeActiveReceiptRuleSet(params,cb);
		}
			service.DescribeConfigurationSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(n,"ConfigurationSetAttributeNames",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			copyArgs(msg,"ConfigurationSetAttributeNames",params,undefined,false); 
			

			svc.describeConfigurationSet(params,cb);
		}
			service.DescribeReceiptRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RuleSetName",params,undefined,false); 
			copyArgs(n,"RuleName",params,undefined,false); 
			
			copyArgs(n,"RuleSetName",params,undefined,false); 
			copyArgs(n,"RuleName",params,undefined,false); 
			
			copyArgs(msg,"RuleSetName",params,undefined,false); 
			copyArgs(msg,"RuleName",params,undefined,false); 
			

			svc.describeReceiptRule(params,cb);
		}
			service.DescribeReceiptRuleSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RuleSetName",params,undefined,false); 
			
			copyArgs(n,"RuleSetName",params,undefined,false); 
			
			copyArgs(msg,"RuleSetName",params,undefined,false); 
			

			svc.describeReceiptRuleSet(params,cb);
		}
			service.GetAccountSendingEnabled=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getAccountSendingEnabled(params,cb);
		}
			service.GetCustomVerificationEmailTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(msg,"TemplateName",params,undefined,false); 
			

			svc.getCustomVerificationEmailTemplate(params,cb);
		}
			service.GetIdentityDkimAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Identities",params,undefined,true); 
			
			copyArgs(n,"Identities",params,undefined,true); 
			
			copyArgs(msg,"Identities",params,undefined,true); 
			

			svc.getIdentityDkimAttributes(params,cb);
		}
			service.GetIdentityMailFromDomainAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Identities",params,undefined,true); 
			
			copyArgs(n,"Identities",params,undefined,true); 
			
			copyArgs(msg,"Identities",params,undefined,true); 
			

			svc.getIdentityMailFromDomainAttributes(params,cb);
		}
			service.GetIdentityNotificationAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Identities",params,undefined,true); 
			
			copyArgs(n,"Identities",params,undefined,true); 
			
			copyArgs(msg,"Identities",params,undefined,true); 
			

			svc.getIdentityNotificationAttributes(params,cb);
		}
			service.GetIdentityPolicies=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Identity",params,undefined,false); 
			copyArgs(n,"PolicyNames",params,undefined,true); 
			
			copyArgs(n,"Identity",params,undefined,false); 
			copyArgs(n,"PolicyNames",params,undefined,true); 
			
			copyArgs(msg,"Identity",params,undefined,false); 
			copyArgs(msg,"PolicyNames",params,undefined,true); 
			

			svc.getIdentityPolicies(params,cb);
		}
			service.GetIdentityVerificationAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Identities",params,undefined,true); 
			
			copyArgs(n,"Identities",params,undefined,true); 
			
			copyArgs(msg,"Identities",params,undefined,true); 
			

			svc.getIdentityVerificationAttributes(params,cb);
		}
			service.GetSendQuota=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getSendQuota(params,cb);
		}
			service.GetSendStatistics=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getSendStatistics(params,cb);
		}
			service.GetTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(msg,"TemplateName",params,undefined,false); 
			

			svc.getTemplate(params,cb);
		}
			service.ListConfigurationSets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listConfigurationSets(params,cb);
		}
			service.ListCustomVerificationEmailTemplates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listCustomVerificationEmailTemplates(params,cb);
		}
			service.ListIdentities=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"IdentityType",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"IdentityType",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listIdentities(params,cb);
		}
			service.ListIdentityPolicies=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Identity",params,undefined,false); 
			
			copyArgs(n,"Identity",params,undefined,false); 
			
			copyArgs(msg,"Identity",params,undefined,false); 
			

			svc.listIdentityPolicies(params,cb);
		}
			service.ListReceiptFilters=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.listReceiptFilters(params,cb);
		}
			service.ListReceiptRuleSets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listReceiptRuleSets(params,cb);
		}
			service.ListTemplates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listTemplates(params,cb);
		}
			service.ListVerifiedEmailAddresses=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.listVerifiedEmailAddresses(params,cb);
		}
			service.PutConfigurationSetDeliveryOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(n,"DeliveryOptions",params,undefined,true); 
			
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			copyArgs(msg,"DeliveryOptions",params,undefined,true); 
			

			svc.putConfigurationSetDeliveryOptions(params,cb);
		}
			service.PutIdentityPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Identity",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(n,"Identity",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(msg,"Identity",params,undefined,false); 
			copyArgs(msg,"PolicyName",params,undefined,false); 
			copyArgs(msg,"Policy",params,undefined,false); 
			

			svc.putIdentityPolicy(params,cb);
		}
			service.ReorderReceiptRuleSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RuleSetName",params,undefined,false); 
			copyArgs(n,"RuleNames",params,undefined,false); 
			
			copyArgs(n,"RuleSetName",params,undefined,false); 
			copyArgs(n,"RuleNames",params,undefined,false); 
			
			copyArgs(msg,"RuleSetName",params,undefined,false); 
			copyArgs(msg,"RuleNames",params,undefined,false); 
			

			svc.reorderReceiptRuleSet(params,cb);
		}
			service.SendBounce=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OriginalMessageId",params,undefined,false); 
			copyArgs(n,"BounceSender",params,undefined,false); 
			copyArgs(n,"BouncedRecipientInfoList",params,undefined,false); 
			
			copyArgs(n,"OriginalMessageId",params,undefined,false); 
			copyArgs(n,"BounceSender",params,undefined,false); 
			copyArgs(n,"Explanation",params,undefined,false); 
			copyArgs(n,"MessageDsn",params,undefined,false); 
			copyArgs(n,"BouncedRecipientInfoList",params,undefined,false); 
			copyArgs(n,"BounceSenderArn",params,undefined,false); 
			
			copyArgs(msg,"OriginalMessageId",params,undefined,false); 
			copyArgs(msg,"BounceSender",params,undefined,false); 
			copyArgs(msg,"Explanation",params,undefined,false); 
			copyArgs(msg,"MessageDsn",params,undefined,false); 
			copyArgs(msg,"BouncedRecipientInfoList",params,undefined,false); 
			copyArgs(msg,"BounceSenderArn",params,undefined,false); 
			

			svc.sendBounce(params,cb);
		}
			service.SendBulkTemplatedEmail=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Source",params,undefined,false); 
			copyArgs(n,"Template",params,undefined,false); 
			copyArgs(n,"Destinations",params,undefined,false); 
			
			copyArgs(n,"Source",params,undefined,false); 
			copyArgs(n,"SourceArn",params,undefined,false); 
			copyArgs(n,"ReplyToAddresses",params,undefined,true); 
			copyArgs(n,"ReturnPath",params,undefined,false); 
			copyArgs(n,"ReturnPathArn",params,undefined,false); 
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(n,"DefaultTags",params,undefined,true); 
			copyArgs(n,"Template",params,undefined,false); 
			copyArgs(n,"TemplateArn",params,undefined,false); 
			copyArgs(n,"DefaultTemplateData",params,undefined,false); 
			copyArgs(n,"Destinations",params,undefined,false); 
			
			copyArgs(msg,"Source",params,undefined,false); 
			copyArgs(msg,"SourceArn",params,undefined,false); 
			copyArgs(msg,"ReplyToAddresses",params,undefined,true); 
			copyArgs(msg,"ReturnPath",params,undefined,false); 
			copyArgs(msg,"ReturnPathArn",params,undefined,false); 
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			copyArgs(msg,"DefaultTags",params,undefined,true); 
			copyArgs(msg,"Template",params,undefined,false); 
			copyArgs(msg,"TemplateArn",params,undefined,false); 
			copyArgs(msg,"DefaultTemplateData",params,undefined,false); 
			copyArgs(msg,"Destinations",params,undefined,false); 
			

			svc.sendBulkTemplatedEmail(params,cb);
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
			
			copyArgs(n,"Source",params,undefined,false); 
			copyArgs(n,"Destination",params,undefined,true); 
			copyArgs(n,"Message",params,undefined,false); 
			
			copyArgs(n,"Source",params,undefined,false); 
			copyArgs(n,"Destination",params,undefined,true); 
			copyArgs(n,"Message",params,undefined,false); 
			copyArgs(n,"ReplyToAddresses",params,undefined,true); 
			copyArgs(n,"ReturnPath",params,undefined,false); 
			copyArgs(n,"SourceArn",params,undefined,false); 
			copyArgs(n,"ReturnPathArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArgs(msg,"Source",params,undefined,false); 
			copyArgs(msg,"Destination",params,undefined,true); 
			copyArgs(msg,"Message",params,undefined,false); 
			copyArgs(msg,"ReplyToAddresses",params,undefined,true); 
			copyArgs(msg,"ReturnPath",params,undefined,false); 
			copyArgs(msg,"SourceArn",params,undefined,false); 
			copyArgs(msg,"ReturnPathArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			

			svc.sendEmail(params,cb);
		}
			service.SendRawEmail=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RawMessage",params,undefined,false); 
			
			copyArgs(n,"Source",params,undefined,false); 
			copyArgs(n,"Destinations",params,undefined,true); 
			copyArgs(n,"RawMessage",params,undefined,false); 
			copyArgs(n,"FromArn",params,undefined,false); 
			copyArgs(n,"SourceArn",params,undefined,false); 
			copyArgs(n,"ReturnPathArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArgs(msg,"Source",params,undefined,false); 
			copyArgs(msg,"Destinations",params,undefined,true); 
			copyArgs(msg,"RawMessage",params,undefined,false); 
			copyArgs(msg,"FromArn",params,undefined,false); 
			copyArgs(msg,"SourceArn",params,undefined,false); 
			copyArgs(msg,"ReturnPathArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			

			svc.sendRawEmail(params,cb);
		}
			service.SendTemplatedEmail=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Source",params,undefined,false); 
			copyArgs(n,"Destination",params,undefined,true); 
			copyArgs(n,"Template",params,undefined,false); 
			copyArgs(n,"TemplateData",params,undefined,false); 
			
			copyArgs(n,"Source",params,undefined,false); 
			copyArgs(n,"Destination",params,undefined,true); 
			copyArgs(n,"ReplyToAddresses",params,undefined,true); 
			copyArgs(n,"ReturnPath",params,undefined,false); 
			copyArgs(n,"SourceArn",params,undefined,false); 
			copyArgs(n,"ReturnPathArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(n,"Template",params,undefined,false); 
			copyArgs(n,"TemplateArn",params,undefined,false); 
			copyArgs(n,"TemplateData",params,undefined,false); 
			
			copyArgs(msg,"Source",params,undefined,false); 
			copyArgs(msg,"Destination",params,undefined,true); 
			copyArgs(msg,"ReplyToAddresses",params,undefined,true); 
			copyArgs(msg,"ReturnPath",params,undefined,false); 
			copyArgs(msg,"SourceArn",params,undefined,false); 
			copyArgs(msg,"ReturnPathArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			copyArgs(msg,"Template",params,undefined,false); 
			copyArgs(msg,"TemplateArn",params,undefined,false); 
			copyArgs(msg,"TemplateData",params,undefined,false); 
			

			svc.sendTemplatedEmail(params,cb);
		}
			service.SetActiveReceiptRuleSet=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"RuleSetName",params,undefined,false); 
			
			copyArgs(msg,"RuleSetName",params,undefined,false); 
			

			svc.setActiveReceiptRuleSet(params,cb);
		}
			service.SetIdentityDkimEnabled=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Identity",params,undefined,false); 
			copyArgs(Boolean(n),"DkimEnabled",params,undefined,false); 
			
			copyArgs(n,"Identity",params,undefined,false); 
			copyArgs(Boolean(n),"DkimEnabled",params,undefined,false); 
			
			copyArgs(msg,"Identity",params,undefined,false); 
			copyArgs(msg,"DkimEnabled",params,undefined,false); 
			

			svc.setIdentityDkimEnabled(params,cb);
		}
			service.SetIdentityFeedbackForwardingEnabled=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Identity",params,undefined,false); 
			copyArgs(Boolean(n),"ForwardingEnabled",params,undefined,false); 
			
			copyArgs(n,"Identity",params,undefined,false); 
			copyArgs(Boolean(n),"ForwardingEnabled",params,undefined,false); 
			
			copyArgs(msg,"Identity",params,undefined,false); 
			copyArgs(msg,"ForwardingEnabled",params,undefined,false); 
			

			svc.setIdentityFeedbackForwardingEnabled(params,cb);
		}
			service.SetIdentityHeadersInNotificationsEnabled=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Identity",params,undefined,false); 
			copyArgs(n,"NotificationType",params,undefined,false); 
			copyArgs(Boolean(n),"Enabled",params,undefined,false); 
			
			copyArgs(n,"Identity",params,undefined,false); 
			copyArgs(n,"NotificationType",params,undefined,false); 
			copyArgs(Boolean(n),"Enabled",params,undefined,false); 
			
			copyArgs(msg,"Identity",params,undefined,false); 
			copyArgs(msg,"NotificationType",params,undefined,false); 
			copyArgs(msg,"Enabled",params,undefined,false); 
			

			svc.setIdentityHeadersInNotificationsEnabled(params,cb);
		}
			service.SetIdentityMailFromDomain=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Identity",params,undefined,false); 
			
			copyArgs(n,"Identity",params,undefined,false); 
			copyArgs(n,"MailFromDomain",params,undefined,false); 
			copyArgs(n,"BehaviorOnMXFailure",params,undefined,false); 
			
			copyArgs(msg,"Identity",params,undefined,false); 
			copyArgs(msg,"MailFromDomain",params,undefined,false); 
			copyArgs(msg,"BehaviorOnMXFailure",params,undefined,false); 
			

			svc.setIdentityMailFromDomain(params,cb);
		}
			service.SetIdentityNotificationTopic=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Identity",params,undefined,false); 
			copyArgs(n,"NotificationType",params,undefined,false); 
			
			copyArgs(n,"Identity",params,undefined,false); 
			copyArgs(n,"NotificationType",params,undefined,false); 
			copyArgs(n,"SnsTopic",params,undefined,false); 
			
			copyArgs(msg,"Identity",params,undefined,false); 
			copyArgs(msg,"NotificationType",params,undefined,false); 
			copyArgs(msg,"SnsTopic",params,undefined,false); 
			

			svc.setIdentityNotificationTopic(params,cb);
		}
			service.SetReceiptRulePosition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RuleSetName",params,undefined,false); 
			copyArgs(n,"RuleName",params,undefined,false); 
			
			copyArgs(n,"RuleSetName",params,undefined,false); 
			copyArgs(n,"RuleName",params,undefined,false); 
			copyArgs(n,"After",params,undefined,false); 
			
			copyArgs(msg,"RuleSetName",params,undefined,false); 
			copyArgs(msg,"RuleName",params,undefined,false); 
			copyArgs(msg,"After",params,undefined,false); 
			

			svc.setReceiptRulePosition(params,cb);
		}
			service.TestRenderTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"TemplateData",params,undefined,false); 
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"TemplateData",params,undefined,false); 
			
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"TemplateData",params,undefined,false); 
			

			svc.testRenderTemplate(params,cb);
		}
			service.UpdateAccountSendingEnabled=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"Enabled",params,undefined,false); 
			
			copyArgs(msg,"Enabled",params,undefined,false); 
			

			svc.updateAccountSendingEnabled(params,cb);
		}
			service.UpdateConfigurationSetEventDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(n,"EventDestination",params,undefined,true); 
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(n,"EventDestination",params,undefined,true); 
			
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			copyArgs(msg,"EventDestination",params,undefined,true); 
			

			svc.updateConfigurationSetEventDestination(params,cb);
		}
			service.UpdateConfigurationSetReputationMetricsEnabled=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(Boolean(n),"Enabled",params,undefined,false); 
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(Boolean(n),"Enabled",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			copyArgs(msg,"Enabled",params,undefined,false); 
			

			svc.updateConfigurationSetReputationMetricsEnabled(params,cb);
		}
			service.UpdateConfigurationSetSendingEnabled=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(Boolean(n),"Enabled",params,undefined,false); 
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(Boolean(n),"Enabled",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			copyArgs(msg,"Enabled",params,undefined,false); 
			

			svc.updateConfigurationSetSendingEnabled(params,cb);
		}
			service.UpdateConfigurationSetTrackingOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(n,"TrackingOptions",params,undefined,true); 
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(n,"TrackingOptions",params,undefined,true); 
			
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			copyArgs(msg,"TrackingOptions",params,undefined,true); 
			

			svc.updateConfigurationSetTrackingOptions(params,cb);
		}
			service.UpdateCustomVerificationEmailTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			
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
			service.UpdateReceiptRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RuleSetName",params,undefined,false); 
			copyArgs(n,"Rule",params,undefined,true); 
			
			copyArgs(n,"RuleSetName",params,undefined,false); 
			copyArgs(n,"Rule",params,undefined,true); 
			
			copyArgs(msg,"RuleSetName",params,undefined,false); 
			copyArgs(msg,"Rule",params,undefined,true); 
			

			svc.updateReceiptRule(params,cb);
		}
			service.UpdateTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Template",params,undefined,true); 
			
			copyArgs(n,"Template",params,undefined,true); 
			
			copyArgs(msg,"Template",params,undefined,true); 
			

			svc.updateTemplate(params,cb);
		}
			service.VerifyDomainDkim=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Domain",params,undefined,false); 
			
			copyArgs(n,"Domain",params,undefined,false); 
			
			copyArgs(msg,"Domain",params,undefined,false); 
			

			svc.verifyDomainDkim(params,cb);
		}
			service.VerifyDomainIdentity=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Domain",params,undefined,false); 
			
			copyArgs(n,"Domain",params,undefined,false); 
			
			copyArgs(msg,"Domain",params,undefined,false); 
			

			svc.verifyDomainIdentity(params,cb);
		}
			service.VerifyEmailAddress=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EmailAddress",params,undefined,false); 
			
			copyArgs(n,"EmailAddress",params,undefined,false); 
			
			copyArgs(msg,"EmailAddress",params,undefined,false); 
			

			svc.verifyEmailAddress(params,cb);
		}
			service.VerifyEmailIdentity=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EmailAddress",params,undefined,false); 
			
			copyArgs(n,"EmailAddress",params,undefined,false); 
			
			copyArgs(msg,"EmailAddress",params,undefined,false); 
			

			svc.verifyEmailIdentity(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS SES", AmazonAPINode);

};
