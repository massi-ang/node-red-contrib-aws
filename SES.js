
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

		var awsService = new AWS.SES( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.SES(msg.AWSConfig) : awsService;

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

		
		service.CloneReceiptRuleSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RuleSetName",params,undefined,false); 
			copyArg(n,"OriginalRuleSetName",params,undefined,false); 
			
			copyArg(msg,"RuleSetName",params,undefined,false); 
			copyArg(msg,"OriginalRuleSetName",params,undefined,false); 
			

			svc.cloneReceiptRuleSet(params,cb);
		}

		
		service.CreateConfigurationSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationSet",params,undefined,true); 
			
			copyArg(msg,"ConfigurationSet",params,undefined,true); 
			

			svc.createConfigurationSet(params,cb);
		}

		
		service.CreateConfigurationSetEventDestination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationSetName",params,undefined,false); 
			copyArg(n,"EventDestination",params,undefined,true); 
			
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			copyArg(msg,"EventDestination",params,undefined,true); 
			

			svc.createConfigurationSetEventDestination(params,cb);
		}

		
		service.CreateConfigurationSetTrackingOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationSetName",params,undefined,false); 
			copyArg(n,"TrackingOptions",params,undefined,true); 
			
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			copyArg(msg,"TrackingOptions",params,undefined,true); 
			

			svc.createConfigurationSetTrackingOptions(params,cb);
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

		
		service.CreateReceiptFilter=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Filter",params,undefined,true); 
			
			copyArg(msg,"Filter",params,undefined,true); 
			

			svc.createReceiptFilter(params,cb);
		}

		
		service.CreateReceiptRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RuleSetName",params,undefined,false); 
			copyArg(n,"Rule",params,undefined,true); 
			
			copyArg(msg,"RuleSetName",params,undefined,false); 
			copyArg(msg,"After",params,undefined,false); 
			copyArg(msg,"Rule",params,undefined,true); 
			

			svc.createReceiptRule(params,cb);
		}

		
		service.CreateReceiptRuleSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RuleSetName",params,undefined,false); 
			
			copyArg(msg,"RuleSetName",params,undefined,false); 
			

			svc.createReceiptRuleSet(params,cb);
		}

		
		service.CreateTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Template",params,undefined,true); 
			
			copyArg(msg,"Template",params,undefined,true); 
			

			svc.createTemplate(params,cb);
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

		
		service.DeleteConfigurationSetTrackingOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			

			svc.deleteConfigurationSetTrackingOptions(params,cb);
		}

		
		service.DeleteCustomVerificationEmailTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TemplateName",params,undefined,false); 
			
			copyArg(msg,"TemplateName",params,undefined,false); 
			

			svc.deleteCustomVerificationEmailTemplate(params,cb);
		}

		
		service.DeleteIdentity=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Identity",params,undefined,false); 
			
			copyArg(msg,"Identity",params,undefined,false); 
			

			svc.deleteIdentity(params,cb);
		}

		
		service.DeleteIdentityPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Identity",params,undefined,false); 
			copyArg(n,"PolicyName",params,undefined,false); 
			
			copyArg(msg,"Identity",params,undefined,false); 
			copyArg(msg,"PolicyName",params,undefined,false); 
			

			svc.deleteIdentityPolicy(params,cb);
		}

		
		service.DeleteReceiptFilter=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FilterName",params,undefined,false); 
			
			copyArg(msg,"FilterName",params,undefined,false); 
			

			svc.deleteReceiptFilter(params,cb);
		}

		
		service.DeleteReceiptRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RuleSetName",params,undefined,false); 
			copyArg(n,"RuleName",params,undefined,false); 
			
			copyArg(msg,"RuleSetName",params,undefined,false); 
			copyArg(msg,"RuleName",params,undefined,false); 
			

			svc.deleteReceiptRule(params,cb);
		}

		
		service.DeleteReceiptRuleSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RuleSetName",params,undefined,false); 
			
			copyArg(msg,"RuleSetName",params,undefined,false); 
			

			svc.deleteReceiptRuleSet(params,cb);
		}

		
		service.DeleteTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TemplateName",params,undefined,false); 
			
			copyArg(msg,"TemplateName",params,undefined,false); 
			

			svc.deleteTemplate(params,cb);
		}

		
		service.DeleteVerifiedEmailAddress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EmailAddress",params,undefined,false); 
			
			copyArg(msg,"EmailAddress",params,undefined,false); 
			

			svc.deleteVerifiedEmailAddress(params,cb);
		}

		
		service.DescribeActiveReceiptRuleSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeActiveReceiptRuleSet(params,cb);
		}

		
		service.DescribeConfigurationSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			copyArg(msg,"ConfigurationSetAttributeNames",params,undefined,false); 
			

			svc.describeConfigurationSet(params,cb);
		}

		
		service.DescribeReceiptRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RuleSetName",params,undefined,false); 
			copyArg(n,"RuleName",params,undefined,false); 
			
			copyArg(msg,"RuleSetName",params,undefined,false); 
			copyArg(msg,"RuleName",params,undefined,false); 
			

			svc.describeReceiptRule(params,cb);
		}

		
		service.DescribeReceiptRuleSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RuleSetName",params,undefined,false); 
			
			copyArg(msg,"RuleSetName",params,undefined,false); 
			

			svc.describeReceiptRuleSet(params,cb);
		}

		
		service.GetAccountSendingEnabled=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getAccountSendingEnabled(params,cb);
		}

		
		service.GetCustomVerificationEmailTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TemplateName",params,undefined,false); 
			
			copyArg(msg,"TemplateName",params,undefined,false); 
			

			svc.getCustomVerificationEmailTemplate(params,cb);
		}

		
		service.GetIdentityDkimAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Identities",params,undefined,true); 
			
			copyArg(msg,"Identities",params,undefined,true); 
			

			svc.getIdentityDkimAttributes(params,cb);
		}

		
		service.GetIdentityMailFromDomainAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Identities",params,undefined,true); 
			
			copyArg(msg,"Identities",params,undefined,true); 
			

			svc.getIdentityMailFromDomainAttributes(params,cb);
		}

		
		service.GetIdentityNotificationAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Identities",params,undefined,true); 
			
			copyArg(msg,"Identities",params,undefined,true); 
			

			svc.getIdentityNotificationAttributes(params,cb);
		}

		
		service.GetIdentityPolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Identity",params,undefined,false); 
			copyArg(n,"PolicyNames",params,undefined,true); 
			
			copyArg(msg,"Identity",params,undefined,false); 
			copyArg(msg,"PolicyNames",params,undefined,true); 
			

			svc.getIdentityPolicies(params,cb);
		}

		
		service.GetIdentityVerificationAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Identities",params,undefined,true); 
			
			copyArg(msg,"Identities",params,undefined,true); 
			

			svc.getIdentityVerificationAttributes(params,cb);
		}

		
		service.GetSendQuota=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getSendQuota(params,cb);
		}

		
		service.GetSendStatistics=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getSendStatistics(params,cb);
		}

		
		service.GetTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TemplateName",params,undefined,false); 
			
			copyArg(msg,"TemplateName",params,undefined,false); 
			

			svc.getTemplate(params,cb);
		}

		
		service.ListConfigurationSets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listConfigurationSets(params,cb);
		}

		
		service.ListCustomVerificationEmailTemplates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listCustomVerificationEmailTemplates(params,cb);
		}

		
		service.ListIdentities=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"IdentityType",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listIdentities(params,cb);
		}

		
		service.ListIdentityPolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Identity",params,undefined,false); 
			
			copyArg(msg,"Identity",params,undefined,false); 
			

			svc.listIdentityPolicies(params,cb);
		}

		
		service.ListReceiptFilters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.listReceiptFilters(params,cb);
		}

		
		service.ListReceiptRuleSets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listReceiptRuleSets(params,cb);
		}

		
		service.ListTemplates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listTemplates(params,cb);
		}

		
		service.ListVerifiedEmailAddresses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.listVerifiedEmailAddresses(params,cb);
		}

		
		service.PutConfigurationSetDeliveryOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			copyArg(msg,"DeliveryOptions",params,undefined,true); 
			

			svc.putConfigurationSetDeliveryOptions(params,cb);
		}

		
		service.PutIdentityPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Identity",params,undefined,false); 
			copyArg(n,"PolicyName",params,undefined,false); 
			copyArg(n,"Policy",params,undefined,false); 
			
			copyArg(msg,"Identity",params,undefined,false); 
			copyArg(msg,"PolicyName",params,undefined,false); 
			copyArg(msg,"Policy",params,undefined,false); 
			

			svc.putIdentityPolicy(params,cb);
		}

		
		service.ReorderReceiptRuleSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RuleSetName",params,undefined,false); 
			copyArg(n,"RuleNames",params,undefined,false); 
			
			copyArg(msg,"RuleSetName",params,undefined,false); 
			copyArg(msg,"RuleNames",params,undefined,false); 
			

			svc.reorderReceiptRuleSet(params,cb);
		}

		
		service.SendBounce=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OriginalMessageId",params,undefined,false); 
			copyArg(n,"BounceSender",params,undefined,false); 
			copyArg(n,"BouncedRecipientInfoList",params,undefined,false); 
			
			copyArg(msg,"OriginalMessageId",params,undefined,false); 
			copyArg(msg,"BounceSender",params,undefined,false); 
			copyArg(msg,"Explanation",params,undefined,false); 
			copyArg(msg,"MessageDsn",params,undefined,false); 
			copyArg(msg,"BouncedRecipientInfoList",params,undefined,false); 
			copyArg(msg,"BounceSenderArn",params,undefined,false); 
			

			svc.sendBounce(params,cb);
		}

		
		service.SendBulkTemplatedEmail=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Source",params,undefined,false); 
			copyArg(n,"Template",params,undefined,false); 
			copyArg(n,"Destinations",params,undefined,false); 
			
			copyArg(msg,"Source",params,undefined,false); 
			copyArg(msg,"SourceArn",params,undefined,false); 
			copyArg(msg,"ReplyToAddresses",params,undefined,true); 
			copyArg(msg,"ReturnPath",params,undefined,false); 
			copyArg(msg,"ReturnPathArn",params,undefined,false); 
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			copyArg(msg,"DefaultTags",params,undefined,true); 
			copyArg(msg,"Template",params,undefined,false); 
			copyArg(msg,"TemplateArn",params,undefined,false); 
			copyArg(msg,"DefaultTemplateData",params,undefined,false); 
			copyArg(msg,"Destinations",params,undefined,false); 
			

			svc.sendBulkTemplatedEmail(params,cb);
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
			
			copyArg(n,"Source",params,undefined,false); 
			copyArg(n,"Destination",params,undefined,true); 
			copyArg(n,"Message",params,undefined,false); 
			
			copyArg(msg,"Source",params,undefined,false); 
			copyArg(msg,"Destination",params,undefined,true); 
			copyArg(msg,"Message",params,undefined,false); 
			copyArg(msg,"ReplyToAddresses",params,undefined,true); 
			copyArg(msg,"ReturnPath",params,undefined,false); 
			copyArg(msg,"SourceArn",params,undefined,false); 
			copyArg(msg,"ReturnPathArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			

			svc.sendEmail(params,cb);
		}

		
		service.SendRawEmail=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RawMessage",params,undefined,false); 
			
			copyArg(msg,"Source",params,undefined,false); 
			copyArg(msg,"Destinations",params,undefined,true); 
			copyArg(msg,"RawMessage",params,undefined,false); 
			copyArg(msg,"FromArn",params,undefined,false); 
			copyArg(msg,"SourceArn",params,undefined,false); 
			copyArg(msg,"ReturnPathArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			

			svc.sendRawEmail(params,cb);
		}

		
		service.SendTemplatedEmail=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Source",params,undefined,false); 
			copyArg(n,"Destination",params,undefined,true); 
			copyArg(n,"Template",params,undefined,false); 
			copyArg(n,"TemplateData",params,undefined,false); 
			
			copyArg(msg,"Source",params,undefined,false); 
			copyArg(msg,"Destination",params,undefined,true); 
			copyArg(msg,"ReplyToAddresses",params,undefined,true); 
			copyArg(msg,"ReturnPath",params,undefined,false); 
			copyArg(msg,"SourceArn",params,undefined,false); 
			copyArg(msg,"ReturnPathArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			copyArg(msg,"Template",params,undefined,false); 
			copyArg(msg,"TemplateArn",params,undefined,false); 
			copyArg(msg,"TemplateData",params,undefined,false); 
			

			svc.sendTemplatedEmail(params,cb);
		}

		
		service.SetActiveReceiptRuleSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"RuleSetName",params,undefined,false); 
			

			svc.setActiveReceiptRuleSet(params,cb);
		}

		
		service.SetIdentityDkimEnabled=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Identity",params,undefined,false); 
			copyArg(n,"DkimEnabled",params,undefined,false); 
			
			copyArg(msg,"Identity",params,undefined,false); 
			copyArg(msg,"DkimEnabled",params,undefined,false); 
			

			svc.setIdentityDkimEnabled(params,cb);
		}

		
		service.SetIdentityFeedbackForwardingEnabled=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Identity",params,undefined,false); 
			copyArg(n,"ForwardingEnabled",params,undefined,false); 
			
			copyArg(msg,"Identity",params,undefined,false); 
			copyArg(msg,"ForwardingEnabled",params,undefined,false); 
			

			svc.setIdentityFeedbackForwardingEnabled(params,cb);
		}

		
		service.SetIdentityHeadersInNotificationsEnabled=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Identity",params,undefined,false); 
			copyArg(n,"NotificationType",params,undefined,false); 
			copyArg(n,"Enabled",params,undefined,false); 
			
			copyArg(msg,"Identity",params,undefined,false); 
			copyArg(msg,"NotificationType",params,undefined,false); 
			copyArg(msg,"Enabled",params,undefined,false); 
			

			svc.setIdentityHeadersInNotificationsEnabled(params,cb);
		}

		
		service.SetIdentityMailFromDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Identity",params,undefined,false); 
			
			copyArg(msg,"Identity",params,undefined,false); 
			copyArg(msg,"MailFromDomain",params,undefined,false); 
			copyArg(msg,"BehaviorOnMXFailure",params,undefined,false); 
			

			svc.setIdentityMailFromDomain(params,cb);
		}

		
		service.SetIdentityNotificationTopic=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Identity",params,undefined,false); 
			copyArg(n,"NotificationType",params,undefined,false); 
			
			copyArg(msg,"Identity",params,undefined,false); 
			copyArg(msg,"NotificationType",params,undefined,false); 
			copyArg(msg,"SnsTopic",params,undefined,false); 
			

			svc.setIdentityNotificationTopic(params,cb);
		}

		
		service.SetReceiptRulePosition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RuleSetName",params,undefined,false); 
			copyArg(n,"RuleName",params,undefined,false); 
			
			copyArg(msg,"RuleSetName",params,undefined,false); 
			copyArg(msg,"RuleName",params,undefined,false); 
			copyArg(msg,"After",params,undefined,false); 
			

			svc.setReceiptRulePosition(params,cb);
		}

		
		service.TestRenderTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TemplateName",params,undefined,false); 
			copyArg(n,"TemplateData",params,undefined,false); 
			
			copyArg(msg,"TemplateName",params,undefined,false); 
			copyArg(msg,"TemplateData",params,undefined,false); 
			

			svc.testRenderTemplate(params,cb);
		}

		
		service.UpdateAccountSendingEnabled=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Enabled",params,undefined,false); 
			

			svc.updateAccountSendingEnabled(params,cb);
		}

		
		service.UpdateConfigurationSetEventDestination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationSetName",params,undefined,false); 
			copyArg(n,"EventDestination",params,undefined,true); 
			
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			copyArg(msg,"EventDestination",params,undefined,true); 
			

			svc.updateConfigurationSetEventDestination(params,cb);
		}

		
		service.UpdateConfigurationSetReputationMetricsEnabled=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationSetName",params,undefined,false); 
			copyArg(n,"Enabled",params,undefined,false); 
			
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			copyArg(msg,"Enabled",params,undefined,false); 
			

			svc.updateConfigurationSetReputationMetricsEnabled(params,cb);
		}

		
		service.UpdateConfigurationSetSendingEnabled=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationSetName",params,undefined,false); 
			copyArg(n,"Enabled",params,undefined,false); 
			
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			copyArg(msg,"Enabled",params,undefined,false); 
			

			svc.updateConfigurationSetSendingEnabled(params,cb);
		}

		
		service.UpdateConfigurationSetTrackingOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationSetName",params,undefined,false); 
			copyArg(n,"TrackingOptions",params,undefined,true); 
			
			copyArg(msg,"ConfigurationSetName",params,undefined,false); 
			copyArg(msg,"TrackingOptions",params,undefined,true); 
			

			svc.updateConfigurationSetTrackingOptions(params,cb);
		}

		
		service.UpdateCustomVerificationEmailTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TemplateName",params,undefined,false); 
			
			copyArg(msg,"TemplateName",params,undefined,false); 
			copyArg(msg,"FromEmailAddress",params,undefined,false); 
			copyArg(msg,"TemplateSubject",params,undefined,false); 
			copyArg(msg,"TemplateContent",params,undefined,false); 
			copyArg(msg,"SuccessRedirectionURL",params,undefined,false); 
			copyArg(msg,"FailureRedirectionURL",params,undefined,false); 
			

			svc.updateCustomVerificationEmailTemplate(params,cb);
		}

		
		service.UpdateReceiptRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RuleSetName",params,undefined,false); 
			copyArg(n,"Rule",params,undefined,true); 
			
			copyArg(msg,"RuleSetName",params,undefined,false); 
			copyArg(msg,"Rule",params,undefined,true); 
			

			svc.updateReceiptRule(params,cb);
		}

		
		service.UpdateTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Template",params,undefined,true); 
			
			copyArg(msg,"Template",params,undefined,true); 
			

			svc.updateTemplate(params,cb);
		}

		
		service.VerifyDomainDkim=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Domain",params,undefined,false); 
			
			copyArg(msg,"Domain",params,undefined,false); 
			

			svc.verifyDomainDkim(params,cb);
		}

		
		service.VerifyDomainIdentity=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Domain",params,undefined,false); 
			
			copyArg(msg,"Domain",params,undefined,false); 
			

			svc.verifyDomainIdentity(params,cb);
		}

		
		service.VerifyEmailAddress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EmailAddress",params,undefined,false); 
			
			copyArg(msg,"EmailAddress",params,undefined,false); 
			

			svc.verifyEmailAddress(params,cb);
		}

		
		service.VerifyEmailIdentity=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EmailAddress",params,undefined,false); 
			
			copyArg(msg,"EmailAddress",params,undefined,false); 
			

			svc.verifyEmailIdentity(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS SES", AmazonAPINode);

};
