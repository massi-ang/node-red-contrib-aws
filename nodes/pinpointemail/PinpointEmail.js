
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

		var awsService = new AWS.PinpointEmail( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.PinpointEmail(msg.AWSConfig) : awsService;

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
			
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			copyArgs(msg,"TrackingOptions",params,undefined,true); 
			copyArgs(msg,"DeliveryOptions",params,undefined,true); 
			copyArgs(msg,"ReputationOptions",params,undefined,true); 
			copyArgs(msg,"SendingOptions",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

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
			
			copyArgs(msg,"EmailIdentity",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createEmailIdentity(params,cb);
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
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			
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
			service.ListConfigurationSets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			

			svc.listConfigurationSets(params,cb);
		}
			service.ListDedicatedIpPools=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			

			svc.listDedicatedIpPools(params,cb);
		}
			service.ListDeliverabilityTestReports=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			
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
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			
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
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			

			svc.listEmailIdentities(params,cb);
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
			
			
			copyArgs(Boolean(n),"AutoWarmupEnabled",params,undefined,false); 
			
			copyArgs(msg,"AutoWarmupEnabled",params,undefined,false); 
			

			svc.putAccountDedicatedIpWarmupAttributes(params,cb);
		}
			service.PutAccountSendingAttributes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"SendingEnabled",params,undefined,false); 
			
			copyArgs(msg,"SendingEnabled",params,undefined,false); 
			

			svc.putAccountSendingAttributes(params,cb);
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
			copyArgs(Boolean(n),"ReputationMetricsEnabled",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			copyArgs(msg,"ReputationMetricsEnabled",params,undefined,false); 
			

			svc.putConfigurationSetReputationOptions(params,cb);
		}
			service.PutConfigurationSetSendingOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			copyArgs(Boolean(n),"SendingEnabled",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			copyArgs(msg,"SendingEnabled",params,undefined,false); 
			

			svc.putConfigurationSetSendingOptions(params,cb);
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
			copyArgs(Number(n),"WarmupPercentage",params,undefined,false); 
			
			copyArgs(n,"Ip",params,undefined,false); 
			copyArgs(Number(n),"WarmupPercentage",params,undefined,false); 
			
			copyArgs(msg,"Ip",params,undefined,false); 
			copyArgs(msg,"WarmupPercentage",params,undefined,false); 
			

			svc.putDedicatedIpWarmupAttributes(params,cb);
		}
			service.PutDeliverabilityDashboardOption=function(svc,msg,cb){
			var params={};
			
			copyArgs(Boolean(n),"DashboardEnabled",params,undefined,false); 
			
			copyArgs(Boolean(n),"DashboardEnabled",params,undefined,false); 
			copyArgs(n,"SubscribedDomains",params,undefined,true); 
			
			copyArgs(msg,"DashboardEnabled",params,undefined,false); 
			copyArgs(msg,"SubscribedDomains",params,undefined,true); 
			

			svc.putDeliverabilityDashboardOption(params,cb);
		}
			service.PutEmailIdentityDkimAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EmailIdentity",params,undefined,false); 
			
			copyArgs(n,"EmailIdentity",params,undefined,false); 
			copyArgs(Boolean(n),"SigningEnabled",params,undefined,false); 
			
			copyArgs(msg,"EmailIdentity",params,undefined,false); 
			copyArgs(msg,"SigningEnabled",params,undefined,false); 
			

			svc.putEmailIdentityDkimAttributes(params,cb);
		}
			service.PutEmailIdentityFeedbackAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EmailIdentity",params,undefined,false); 
			
			copyArgs(n,"EmailIdentity",params,undefined,false); 
			copyArgs(Boolean(n),"EmailForwardingEnabled",params,undefined,false); 
			
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
			service.SendEmail=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Destination",params,undefined,false); 
			copyArgs(n,"Content",params,undefined,true); 
			
			copyArgs(n,"FromEmailAddress",params,undefined,false); 
			copyArgs(n,"Destination",params,undefined,false); 
			copyArgs(n,"ReplyToAddresses",params,undefined,true); 
			copyArgs(n,"FeedbackForwardingEmailAddress",params,undefined,false); 
			copyArgs(n,"Content",params,undefined,true); 
			copyArgs(n,"EmailTags",params,undefined,false); 
			copyArgs(n,"ConfigurationSetName",params,undefined,false); 
			
			copyArgs(msg,"FromEmailAddress",params,undefined,false); 
			copyArgs(msg,"Destination",params,undefined,false); 
			copyArgs(msg,"ReplyToAddresses",params,undefined,true); 
			copyArgs(msg,"FeedbackForwardingEmailAddress",params,undefined,false); 
			copyArgs(msg,"Content",params,undefined,true); 
			copyArgs(msg,"EmailTags",params,undefined,false); 
			copyArgs(msg,"ConfigurationSetName",params,undefined,false); 
			

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
	
	}
	RED.nodes.registerType("AWS PinpointEmail", AmazonAPINode);

};
