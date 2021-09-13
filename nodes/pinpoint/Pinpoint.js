
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

		var awsService = new AWS.Pinpoint( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Pinpoint(msg.AWSConfig) : awsService;

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
		
		service.CreateApp=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CreateApplicationRequest",params,undefined,false); 
			
			copyArgs(n,"CreateApplicationRequest",params,undefined,false); 
			
			copyArgs(msg,"CreateApplicationRequest",params,undefined,false); 
			

			svc.createApp(params,cb);
		}
		
		service.CreateCampaign=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"WriteCampaignRequest",params,undefined,true); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"WriteCampaignRequest",params,undefined,true); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"WriteCampaignRequest",params,undefined,true); 
			

			svc.createCampaign(params,cb);
		}
		
		service.CreateEmailTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"EmailTemplateRequest",params,undefined,true); 
			
			copyArgs(n,"EmailTemplateRequest",params,undefined,true); 
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(msg,"EmailTemplateRequest",params,undefined,true); 
			copyArgs(msg,"TemplateName",params,undefined,false); 
			

			svc.createEmailTemplate(params,cb);
		}
		
		service.CreateExportJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"ExportJobRequest",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"ExportJobRequest",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"ExportJobRequest",params,undefined,false); 
			

			svc.createExportJob(params,cb);
		}
		
		service.CreateImportJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"ImportJobRequest",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"ImportJobRequest",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"ImportJobRequest",params,undefined,false); 
			

			svc.createImportJob(params,cb);
		}
		
		service.CreateJourney=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"WriteJourneyRequest",params,undefined,true); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"WriteJourneyRequest",params,undefined,true); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"WriteJourneyRequest",params,undefined,true); 
			

			svc.createJourney(params,cb);
		}
		
		service.CreatePushTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"PushNotificationTemplateRequest",params,undefined,true); 
			
			copyArgs(n,"PushNotificationTemplateRequest",params,undefined,true); 
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(msg,"PushNotificationTemplateRequest",params,undefined,true); 
			copyArgs(msg,"TemplateName",params,undefined,false); 
			

			svc.createPushTemplate(params,cb);
		}
		
		service.CreateRecommenderConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CreateRecommenderConfiguration",params,undefined,false); 
			
			copyArgs(n,"CreateRecommenderConfiguration",params,undefined,false); 
			
			copyArgs(msg,"CreateRecommenderConfiguration",params,undefined,false); 
			

			svc.createRecommenderConfiguration(params,cb);
		}
		
		service.CreateSegment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"WriteSegmentRequest",params,undefined,true); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"WriteSegmentRequest",params,undefined,true); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"WriteSegmentRequest",params,undefined,true); 
			

			svc.createSegment(params,cb);
		}
		
		service.CreateSmsTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"SMSTemplateRequest",params,undefined,true); 
			
			copyArgs(n,"SMSTemplateRequest",params,undefined,true); 
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(msg,"SMSTemplateRequest",params,undefined,true); 
			copyArgs(msg,"TemplateName",params,undefined,false); 
			

			svc.createSmsTemplate(params,cb);
		}
		
		service.CreateVoiceTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"VoiceTemplateRequest",params,undefined,true); 
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"VoiceTemplateRequest",params,undefined,true); 
			
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"VoiceTemplateRequest",params,undefined,true); 
			

			svc.createVoiceTemplate(params,cb);
		}
		
		service.DeleteAdmChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.deleteAdmChannel(params,cb);
		}
		
		service.DeleteApnsChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.deleteApnsChannel(params,cb);
		}
		
		service.DeleteApnsSandboxChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.deleteApnsSandboxChannel(params,cb);
		}
		
		service.DeleteApnsVoipChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.deleteApnsVoipChannel(params,cb);
		}
		
		service.DeleteApnsVoipSandboxChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.deleteApnsVoipSandboxChannel(params,cb);
		}
		
		service.DeleteApp=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.deleteApp(params,cb);
		}
		
		service.DeleteBaiduChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.deleteBaiduChannel(params,cb);
		}
		
		service.DeleteCampaign=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CampaignId",params,undefined,false); 
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"CampaignId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"CampaignId",params,undefined,false); 
			

			svc.deleteCampaign(params,cb);
		}
		
		service.DeleteEmailChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.deleteEmailChannel(params,cb);
		}
		
		service.DeleteEmailTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			

			svc.deleteEmailTemplate(params,cb);
		}
		
		service.DeleteEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"EndpointId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"EndpointId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"EndpointId",params,undefined,false); 
			

			svc.deleteEndpoint(params,cb);
		}
		
		service.DeleteEventStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.deleteEventStream(params,cb);
		}
		
		service.DeleteGcmChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.deleteGcmChannel(params,cb);
		}
		
		service.DeleteJourney=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JourneyId",params,undefined,false); 
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"JourneyId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"JourneyId",params,undefined,false); 
			

			svc.deleteJourney(params,cb);
		}
		
		service.DeletePushTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			

			svc.deletePushTemplate(params,cb);
		}
		
		service.DeleteRecommenderConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RecommenderId",params,undefined,false); 
			
			copyArgs(n,"RecommenderId",params,undefined,false); 
			
			copyArgs(msg,"RecommenderId",params,undefined,false); 
			

			svc.deleteRecommenderConfiguration(params,cb);
		}
		
		service.DeleteSegment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SegmentId",params,undefined,false); 
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"SegmentId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"SegmentId",params,undefined,false); 
			

			svc.deleteSegment(params,cb);
		}
		
		service.DeleteSmsChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.deleteSmsChannel(params,cb);
		}
		
		service.DeleteSmsTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			

			svc.deleteSmsTemplate(params,cb);
		}
		
		service.DeleteUserEndpoints=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"UserId",params,undefined,false); 
			

			svc.deleteUserEndpoints(params,cb);
		}
		
		service.DeleteVoiceChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.deleteVoiceChannel(params,cb);
		}
		
		service.DeleteVoiceTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			

			svc.deleteVoiceTemplate(params,cb);
		}
		
		service.GetAdmChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.getAdmChannel(params,cb);
		}
		
		service.GetApnsChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.getApnsChannel(params,cb);
		}
		
		service.GetApnsSandboxChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.getApnsSandboxChannel(params,cb);
		}
		
		service.GetApnsVoipChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.getApnsVoipChannel(params,cb);
		}
		
		service.GetApnsVoipSandboxChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.getApnsVoipSandboxChannel(params,cb);
		}
		
		service.GetApp=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.getApp(params,cb);
		}
		
		service.GetApplicationDateRangeKpi=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"KpiName",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,true); 
			copyArgs(n,"KpiName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,true); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,true); 
			copyArgs(msg,"KpiName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"StartTime",params,undefined,true); 
			

			svc.getApplicationDateRangeKpi(params,cb);
		}
		
		service.GetApplicationSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.getApplicationSettings(params,cb);
		}
		
		service.GetApps=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"PageSize",params,undefined,false); 
			copyArgs(n,"Token",params,undefined,false); 
			
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"Token",params,undefined,false); 
			

			svc.getApps(params,cb);
		}
		
		service.GetBaiduChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.getBaiduChannel(params,cb);
		}
		
		service.GetCampaign=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CampaignId",params,undefined,false); 
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"CampaignId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"CampaignId",params,undefined,false); 
			

			svc.getCampaign(params,cb);
		}
		
		service.GetCampaignActivities=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"CampaignId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"CampaignId",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			copyArgs(n,"Token",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"CampaignId",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"Token",params,undefined,false); 
			

			svc.getCampaignActivities(params,cb);
		}
		
		service.GetCampaignDateRangeKpi=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"KpiName",params,undefined,false); 
			copyArgs(n,"CampaignId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"CampaignId",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,true); 
			copyArgs(n,"KpiName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,true); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"CampaignId",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,true); 
			copyArgs(msg,"KpiName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"StartTime",params,undefined,true); 
			

			svc.getCampaignDateRangeKpi(params,cb);
		}
		
		service.GetCampaignVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Version",params,undefined,false); 
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"CampaignId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"CampaignId",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"CampaignId",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			

			svc.getCampaignVersion(params,cb);
		}
		
		service.GetCampaignVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"CampaignId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"CampaignId",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			copyArgs(n,"Token",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"CampaignId",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"Token",params,undefined,false); 
			

			svc.getCampaignVersions(params,cb);
		}
		
		service.GetCampaigns=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			copyArgs(n,"Token",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"Token",params,undefined,false); 
			

			svc.getCampaigns(params,cb);
		}
		
		service.GetChannels=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.getChannels(params,cb);
		}
		
		service.GetEmailChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.getEmailChannel(params,cb);
		}
		
		service.GetEmailTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			

			svc.getEmailTemplate(params,cb);
		}
		
		service.GetEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"EndpointId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"EndpointId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"EndpointId",params,undefined,false); 
			

			svc.getEndpoint(params,cb);
		}
		
		service.GetEventStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.getEventStream(params,cb);
		}
		
		service.GetExportJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.getExportJob(params,cb);
		}
		
		service.GetExportJobs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			copyArgs(n,"Token",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"Token",params,undefined,false); 
			

			svc.getExportJobs(params,cb);
		}
		
		service.GetGcmChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.getGcmChannel(params,cb);
		}
		
		service.GetImportJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.getImportJob(params,cb);
		}
		
		service.GetImportJobs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			copyArgs(n,"Token",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"Token",params,undefined,false); 
			

			svc.getImportJobs(params,cb);
		}
		
		service.GetJourney=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JourneyId",params,undefined,false); 
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"JourneyId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"JourneyId",params,undefined,false); 
			

			svc.getJourney(params,cb);
		}
		
		service.GetJourneyDateRangeKpi=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JourneyId",params,undefined,false); 
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"KpiName",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,true); 
			copyArgs(n,"JourneyId",params,undefined,false); 
			copyArgs(n,"KpiName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,true); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,true); 
			copyArgs(msg,"JourneyId",params,undefined,false); 
			copyArgs(msg,"KpiName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"StartTime",params,undefined,true); 
			

			svc.getJourneyDateRangeKpi(params,cb);
		}
		
		service.GetJourneyExecutionActivityMetrics=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JourneyActivityId",params,undefined,false); 
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"JourneyId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"JourneyActivityId",params,undefined,false); 
			copyArgs(n,"JourneyId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"JourneyActivityId",params,undefined,false); 
			copyArgs(msg,"JourneyId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			

			svc.getJourneyExecutionActivityMetrics(params,cb);
		}
		
		service.GetJourneyExecutionMetrics=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"JourneyId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"JourneyId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"JourneyId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			

			svc.getJourneyExecutionMetrics(params,cb);
		}
		
		service.GetPushTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			

			svc.getPushTemplate(params,cb);
		}
		
		service.GetRecommenderConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RecommenderId",params,undefined,false); 
			
			copyArgs(n,"RecommenderId",params,undefined,false); 
			
			copyArgs(msg,"RecommenderId",params,undefined,false); 
			

			svc.getRecommenderConfiguration(params,cb);
		}
		
		service.GetRecommenderConfigurations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"PageSize",params,undefined,false); 
			copyArgs(n,"Token",params,undefined,false); 
			
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"Token",params,undefined,false); 
			

			svc.getRecommenderConfigurations(params,cb);
		}
		
		service.GetSegment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SegmentId",params,undefined,false); 
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"SegmentId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"SegmentId",params,undefined,false); 
			

			svc.getSegment(params,cb);
		}
		
		service.GetSegmentExportJobs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SegmentId",params,undefined,false); 
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			copyArgs(n,"SegmentId",params,undefined,false); 
			copyArgs(n,"Token",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"SegmentId",params,undefined,false); 
			copyArgs(msg,"Token",params,undefined,false); 
			

			svc.getSegmentExportJobs(params,cb);
		}
		
		service.GetSegmentImportJobs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SegmentId",params,undefined,false); 
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			copyArgs(n,"SegmentId",params,undefined,false); 
			copyArgs(n,"Token",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"SegmentId",params,undefined,false); 
			copyArgs(msg,"Token",params,undefined,false); 
			

			svc.getSegmentImportJobs(params,cb);
		}
		
		service.GetSegmentVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SegmentId",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"SegmentId",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"SegmentId",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			

			svc.getSegmentVersion(params,cb);
		}
		
		service.GetSegmentVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SegmentId",params,undefined,false); 
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			copyArgs(n,"SegmentId",params,undefined,false); 
			copyArgs(n,"Token",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"SegmentId",params,undefined,false); 
			copyArgs(msg,"Token",params,undefined,false); 
			

			svc.getSegmentVersions(params,cb);
		}
		
		service.GetSegments=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			copyArgs(n,"Token",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"Token",params,undefined,false); 
			

			svc.getSegments(params,cb);
		}
		
		service.GetSmsChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.getSmsChannel(params,cb);
		}
		
		service.GetSmsTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			

			svc.getSmsTemplate(params,cb);
		}
		
		service.GetUserEndpoints=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"UserId",params,undefined,false); 
			

			svc.getUserEndpoints(params,cb);
		}
		
		service.GetVoiceChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.getVoiceChannel(params,cb);
		}
		
		service.GetVoiceTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			

			svc.getVoiceTemplate(params,cb);
		}
		
		service.ListJourneys=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			copyArgs(n,"Token",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"Token",params,undefined,false); 
			

			svc.listJourneys(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.ListTemplateVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"TemplateType",params,undefined,false); 
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"TemplateType",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"TemplateType",params,undefined,false); 
			

			svc.listTemplateVersions(params,cb);
		}
		
		service.ListTemplates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			copyArgs(n,"Prefix",params,undefined,false); 
			copyArgs(n,"TemplateType",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"Prefix",params,undefined,false); 
			copyArgs(msg,"TemplateType",params,undefined,false); 
			

			svc.listTemplates(params,cb);
		}
		
		service.PhoneNumberValidate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NumberValidateRequest",params,undefined,false); 
			
			copyArgs(n,"NumberValidateRequest",params,undefined,false); 
			
			copyArgs(msg,"NumberValidateRequest",params,undefined,false); 
			

			svc.phoneNumberValidate(params,cb);
		}
		
		service.PutEventStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"WriteEventStream",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"WriteEventStream",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"WriteEventStream",params,undefined,false); 
			

			svc.putEventStream(params,cb);
		}
		
		service.PutEvents=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"EventsRequest",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"EventsRequest",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"EventsRequest",params,undefined,false); 
			

			svc.putEvents(params,cb);
		}
		
		service.RemoveAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AttributeType",params,undefined,false); 
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"UpdateAttributesRequest",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"AttributeType",params,undefined,false); 
			copyArgs(n,"UpdateAttributesRequest",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"AttributeType",params,undefined,false); 
			copyArgs(msg,"UpdateAttributesRequest",params,undefined,false); 
			

			svc.removeAttributes(params,cb);
		}
		
		service.SendMessages=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"MessageRequest",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"MessageRequest",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"MessageRequest",params,undefined,false); 
			

			svc.sendMessages(params,cb);
		}
		
		service.SendUsersMessages=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"SendUsersMessageRequest",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"SendUsersMessageRequest",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"SendUsersMessageRequest",params,undefined,false); 
			

			svc.sendUsersMessages(params,cb);
		}
		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagsModel",params,undefined,true); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagsModel",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagsModel",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TagKeys",params,undefined,true); 
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			

			svc.untagResource(params,cb);
		}
		
		service.UpdateAdmChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"ADMChannelRequest",params,undefined,false); 
			
			copyArgs(n,"ADMChannelRequest",params,undefined,false); 
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ADMChannelRequest",params,undefined,false); 
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.updateAdmChannel(params,cb);
		}
		
		service.UpdateApnsChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"APNSChannelRequest",params,undefined,false); 
			
			copyArgs(n,"APNSChannelRequest",params,undefined,false); 
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"APNSChannelRequest",params,undefined,false); 
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.updateApnsChannel(params,cb);
		}
		
		service.UpdateApnsSandboxChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"APNSSandboxChannelRequest",params,undefined,false); 
			
			copyArgs(n,"APNSSandboxChannelRequest",params,undefined,false); 
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"APNSSandboxChannelRequest",params,undefined,false); 
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.updateApnsSandboxChannel(params,cb);
		}
		
		service.UpdateApnsVoipChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"APNSVoipChannelRequest",params,undefined,false); 
			
			copyArgs(n,"APNSVoipChannelRequest",params,undefined,false); 
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"APNSVoipChannelRequest",params,undefined,false); 
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.updateApnsVoipChannel(params,cb);
		}
		
		service.UpdateApnsVoipSandboxChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"APNSVoipSandboxChannelRequest",params,undefined,false); 
			
			copyArgs(n,"APNSVoipSandboxChannelRequest",params,undefined,false); 
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"APNSVoipSandboxChannelRequest",params,undefined,false); 
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.updateApnsVoipSandboxChannel(params,cb);
		}
		
		service.UpdateApplicationSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"WriteApplicationSettingsRequest",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"WriteApplicationSettingsRequest",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"WriteApplicationSettingsRequest",params,undefined,false); 
			

			svc.updateApplicationSettings(params,cb);
		}
		
		service.UpdateBaiduChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"BaiduChannelRequest",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"BaiduChannelRequest",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"BaiduChannelRequest",params,undefined,false); 
			

			svc.updateBaiduChannel(params,cb);
		}
		
		service.UpdateCampaign=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CampaignId",params,undefined,false); 
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"WriteCampaignRequest",params,undefined,true); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"CampaignId",params,undefined,false); 
			copyArgs(n,"WriteCampaignRequest",params,undefined,true); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"CampaignId",params,undefined,false); 
			copyArgs(msg,"WriteCampaignRequest",params,undefined,true); 
			

			svc.updateCampaign(params,cb);
		}
		
		service.UpdateEmailChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"EmailChannelRequest",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"EmailChannelRequest",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"EmailChannelRequest",params,undefined,false); 
			

			svc.updateEmailChannel(params,cb);
		}
		
		service.UpdateEmailTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"EmailTemplateRequest",params,undefined,true); 
			
			copyArgs(Boolean(n),"CreateNewVersion",params,undefined,false); 
			copyArgs(n,"EmailTemplateRequest",params,undefined,true); 
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			
			copyArgs(msg,"CreateNewVersion",params,undefined,false); 
			copyArgs(msg,"EmailTemplateRequest",params,undefined,true); 
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			

			svc.updateEmailTemplate(params,cb);
		}
		
		service.UpdateEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"EndpointId",params,undefined,false); 
			copyArgs(n,"EndpointRequest",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"EndpointId",params,undefined,false); 
			copyArgs(n,"EndpointRequest",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"EndpointId",params,undefined,false); 
			copyArgs(msg,"EndpointRequest",params,undefined,false); 
			

			svc.updateEndpoint(params,cb);
		}
		
		service.UpdateEndpointsBatch=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"EndpointBatchRequest",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"EndpointBatchRequest",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"EndpointBatchRequest",params,undefined,false); 
			

			svc.updateEndpointsBatch(params,cb);
		}
		
		service.UpdateGcmChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"GCMChannelRequest",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"GCMChannelRequest",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"GCMChannelRequest",params,undefined,false); 
			

			svc.updateGcmChannel(params,cb);
		}
		
		service.UpdateJourney=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JourneyId",params,undefined,false); 
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"WriteJourneyRequest",params,undefined,true); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"JourneyId",params,undefined,false); 
			copyArgs(n,"WriteJourneyRequest",params,undefined,true); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"JourneyId",params,undefined,false); 
			copyArgs(msg,"WriteJourneyRequest",params,undefined,true); 
			

			svc.updateJourney(params,cb);
		}
		
		service.UpdateJourneyState=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JourneyId",params,undefined,false); 
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"JourneyStateRequest",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"JourneyId",params,undefined,false); 
			copyArgs(n,"JourneyStateRequest",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"JourneyId",params,undefined,false); 
			copyArgs(msg,"JourneyStateRequest",params,undefined,false); 
			

			svc.updateJourneyState(params,cb);
		}
		
		service.UpdatePushTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"PushNotificationTemplateRequest",params,undefined,true); 
			
			copyArgs(Boolean(n),"CreateNewVersion",params,undefined,false); 
			copyArgs(n,"PushNotificationTemplateRequest",params,undefined,true); 
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			
			copyArgs(msg,"CreateNewVersion",params,undefined,false); 
			copyArgs(msg,"PushNotificationTemplateRequest",params,undefined,true); 
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			

			svc.updatePushTemplate(params,cb);
		}
		
		service.UpdateRecommenderConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RecommenderId",params,undefined,false); 
			copyArgs(n,"UpdateRecommenderConfiguration",params,undefined,false); 
			
			copyArgs(n,"RecommenderId",params,undefined,false); 
			copyArgs(n,"UpdateRecommenderConfiguration",params,undefined,false); 
			
			copyArgs(msg,"RecommenderId",params,undefined,false); 
			copyArgs(msg,"UpdateRecommenderConfiguration",params,undefined,false); 
			

			svc.updateRecommenderConfiguration(params,cb);
		}
		
		service.UpdateSegment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SegmentId",params,undefined,false); 
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"WriteSegmentRequest",params,undefined,true); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"SegmentId",params,undefined,false); 
			copyArgs(n,"WriteSegmentRequest",params,undefined,true); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"SegmentId",params,undefined,false); 
			copyArgs(msg,"WriteSegmentRequest",params,undefined,true); 
			

			svc.updateSegment(params,cb);
		}
		
		service.UpdateSmsChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"SMSChannelRequest",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"SMSChannelRequest",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"SMSChannelRequest",params,undefined,false); 
			

			svc.updateSmsChannel(params,cb);
		}
		
		service.UpdateSmsTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"SMSTemplateRequest",params,undefined,true); 
			
			copyArgs(Boolean(n),"CreateNewVersion",params,undefined,false); 
			copyArgs(n,"SMSTemplateRequest",params,undefined,true); 
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			
			copyArgs(msg,"CreateNewVersion",params,undefined,false); 
			copyArgs(msg,"SMSTemplateRequest",params,undefined,true); 
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			

			svc.updateSmsTemplate(params,cb);
		}
		
		service.UpdateTemplateActiveVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"TemplateType",params,undefined,false); 
			copyArgs(n,"TemplateActiveVersionRequest",params,undefined,false); 
			
			copyArgs(n,"TemplateActiveVersionRequest",params,undefined,false); 
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"TemplateType",params,undefined,false); 
			
			copyArgs(msg,"TemplateActiveVersionRequest",params,undefined,false); 
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"TemplateType",params,undefined,false); 
			

			svc.updateTemplateActiveVersion(params,cb);
		}
		
		service.UpdateVoiceChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"VoiceChannelRequest",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"VoiceChannelRequest",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"VoiceChannelRequest",params,undefined,false); 
			

			svc.updateVoiceChannel(params,cb);
		}
		
		service.UpdateVoiceTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"VoiceTemplateRequest",params,undefined,true); 
			
			copyArgs(Boolean(n),"CreateNewVersion",params,undefined,false); 
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			copyArgs(n,"VoiceTemplateRequest",params,undefined,true); 
			
			copyArgs(msg,"CreateNewVersion",params,undefined,false); 
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			copyArgs(msg,"VoiceTemplateRequest",params,undefined,true); 
			

			svc.updateVoiceTemplate(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS Pinpoint", AmazonAPINode);

};
