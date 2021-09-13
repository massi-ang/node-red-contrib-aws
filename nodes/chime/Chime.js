
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

		var awsService = new AWS.Chime( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Chime(msg.AWSConfig) : awsService;

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
		
		service.AssociatePhoneNumberWithUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"E164PhoneNumber",params,undefined,true); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"E164PhoneNumber",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"UserId",params,undefined,false); 
			copyArgs(msg,"E164PhoneNumber",params,undefined,true); 
			

			svc.associatePhoneNumberWithUser(params,cb);
		}
		
		service.AssociatePhoneNumbersWithVoiceConnector=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			copyArgs(n,"E164PhoneNumbers",params,undefined,true); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			copyArgs(n,"E164PhoneNumbers",params,undefined,true); 
			copyArgs(Boolean(n),"ForceAssociate",params,undefined,false); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			copyArgs(msg,"E164PhoneNumbers",params,undefined,true); 
			copyArgs(msg,"ForceAssociate",params,undefined,false); 
			

			svc.associatePhoneNumbersWithVoiceConnector(params,cb);
		}
		
		service.AssociatePhoneNumbersWithVoiceConnectorGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorGroupId",params,undefined,false); 
			copyArgs(n,"E164PhoneNumbers",params,undefined,true); 
			
			copyArgs(n,"VoiceConnectorGroupId",params,undefined,false); 
			copyArgs(n,"E164PhoneNumbers",params,undefined,true); 
			copyArgs(Boolean(n),"ForceAssociate",params,undefined,false); 
			
			copyArgs(msg,"VoiceConnectorGroupId",params,undefined,false); 
			copyArgs(msg,"E164PhoneNumbers",params,undefined,true); 
			copyArgs(msg,"ForceAssociate",params,undefined,false); 
			

			svc.associatePhoneNumbersWithVoiceConnectorGroup(params,cb);
		}
		
		service.AssociateSigninDelegateGroupsWithAccount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"SigninDelegateGroups",params,undefined,true); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"SigninDelegateGroups",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"SigninDelegateGroups",params,undefined,true); 
			

			svc.associateSigninDelegateGroupsWithAccount(params,cb);
		}
		
		service.BatchCreateAttendee=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			copyArgs(n,"Attendees",params,undefined,false); 
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			copyArgs(n,"Attendees",params,undefined,false); 
			
			copyArgs(msg,"MeetingId",params,undefined,false); 
			copyArgs(msg,"Attendees",params,undefined,false); 
			

			svc.batchCreateAttendee(params,cb);
		}
		
		service.BatchCreateChannelMembership=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"MemberArns",params,undefined,false); 
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"MemberArns",params,undefined,false); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"ChannelArn",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"MemberArns",params,undefined,false); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.batchCreateChannelMembership(params,cb);
		}
		
		service.BatchCreateRoomMembership=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"RoomId",params,undefined,false); 
			copyArgs(n,"MembershipItemList",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"RoomId",params,undefined,false); 
			copyArgs(n,"MembershipItemList",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"RoomId",params,undefined,false); 
			copyArgs(msg,"MembershipItemList",params,undefined,false); 
			

			svc.batchCreateRoomMembership(params,cb);
		}
		
		service.BatchDeletePhoneNumber=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PhoneNumberIds",params,undefined,true); 
			
			copyArgs(n,"PhoneNumberIds",params,undefined,true); 
			
			copyArgs(msg,"PhoneNumberIds",params,undefined,true); 
			

			svc.batchDeletePhoneNumber(params,cb);
		}
		
		service.BatchSuspendUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"UserIdList",params,undefined,true); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"UserIdList",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"UserIdList",params,undefined,true); 
			

			svc.batchSuspendUser(params,cb);
		}
		
		service.BatchUnsuspendUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"UserIdList",params,undefined,true); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"UserIdList",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"UserIdList",params,undefined,true); 
			

			svc.batchUnsuspendUser(params,cb);
		}
		
		service.BatchUpdatePhoneNumber=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UpdatePhoneNumberRequestItems",params,undefined,false); 
			
			copyArgs(n,"UpdatePhoneNumberRequestItems",params,undefined,false); 
			
			copyArgs(msg,"UpdatePhoneNumberRequestItems",params,undefined,false); 
			

			svc.batchUpdatePhoneNumber(params,cb);
		}
		
		service.BatchUpdateUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"UpdateUserRequestItems",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"UpdateUserRequestItems",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"UpdateUserRequestItems",params,undefined,false); 
			

			svc.batchUpdateUser(params,cb);
		}
		
		service.CreateAccount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.createAccount(params,cb);
		}
		
		service.CreateAppInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,true); 
			
			copyArgs(n,"Name",params,undefined,true); 
			copyArgs(n,"Metadata",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,true); 
			copyArgs(msg,"Metadata",params,undefined,true); 
			copyArgs(msg,"ClientRequestToken",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createAppInstance(params,cb);
		}
		
		service.CreateAppInstanceAdmin=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppInstanceAdminArn",params,undefined,false); 
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			
			copyArgs(n,"AppInstanceAdminArn",params,undefined,false); 
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			
			copyArgs(msg,"AppInstanceAdminArn",params,undefined,false); 
			copyArgs(msg,"AppInstanceArn",params,undefined,false); 
			

			svc.createAppInstanceAdmin(params,cb);
		}
		
		service.CreateAppInstanceUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			copyArgs(n,"AppInstanceUserId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,true); 
			
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			copyArgs(n,"AppInstanceUserId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,true); 
			copyArgs(n,"Metadata",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"AppInstanceArn",params,undefined,false); 
			copyArgs(msg,"AppInstanceUserId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,true); 
			copyArgs(msg,"Metadata",params,undefined,true); 
			copyArgs(msg,"ClientRequestToken",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createAppInstanceUser(params,cb);
		}
		
		service.CreateAttendee=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			copyArgs(n,"ExternalUserId",params,undefined,true); 
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			copyArgs(n,"ExternalUserId",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"MeetingId",params,undefined,false); 
			copyArgs(msg,"ExternalUserId",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createAttendee(params,cb);
		}
		
		service.CreateBot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DisplayName",params,undefined,true); 
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"DisplayName",params,undefined,true); 
			copyArgs(n,"Domain",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"DisplayName",params,undefined,true); 
			copyArgs(msg,"Domain",params,undefined,false); 
			

			svc.createBot(params,cb);
		}
		
		service.CreateChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,true); 
			
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,true); 
			copyArgs(n,"Mode",params,undefined,false); 
			copyArgs(n,"Privacy",params,undefined,false); 
			copyArgs(n,"Metadata",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"AppInstanceArn",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,true); 
			copyArgs(msg,"Mode",params,undefined,false); 
			copyArgs(msg,"Privacy",params,undefined,false); 
			copyArgs(msg,"Metadata",params,undefined,true); 
			copyArgs(msg,"ClientRequestToken",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.createChannel(params,cb);
		}
		
		service.CreateChannelBan=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"MemberArn",params,undefined,false); 
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"MemberArn",params,undefined,false); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"ChannelArn",params,undefined,false); 
			copyArgs(msg,"MemberArn",params,undefined,false); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.createChannelBan(params,cb);
		}
		
		service.CreateChannelMembership=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"MemberArn",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"MemberArn",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"ChannelArn",params,undefined,false); 
			copyArgs(msg,"MemberArn",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.createChannelMembership(params,cb);
		}
		
		service.CreateChannelModerator=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"ChannelModeratorArn",params,undefined,false); 
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"ChannelModeratorArn",params,undefined,false); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"ChannelArn",params,undefined,false); 
			copyArgs(msg,"ChannelModeratorArn",params,undefined,false); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.createChannelModerator(params,cb);
		}
		
		service.CreateMediaCapturePipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceType",params,undefined,false); 
			copyArgs(n,"SourceArn",params,undefined,true); 
			copyArgs(n,"SinkType",params,undefined,false); 
			copyArgs(n,"SinkArn",params,undefined,true); 
			
			copyArgs(n,"SourceType",params,undefined,false); 
			copyArgs(n,"SourceArn",params,undefined,true); 
			copyArgs(n,"SinkType",params,undefined,false); 
			copyArgs(n,"SinkArn",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,true); 
			
			copyArgs(msg,"SourceType",params,undefined,false); 
			copyArgs(msg,"SourceArn",params,undefined,true); 
			copyArgs(msg,"SinkType",params,undefined,false); 
			copyArgs(msg,"SinkArn",params,undefined,true); 
			copyArgs(msg,"ClientRequestToken",params,undefined,true); 
			

			svc.createMediaCapturePipeline(params,cb);
		}
		
		service.CreateMeeting=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientRequestToken",params,undefined,true); 
			
			copyArgs(n,"ClientRequestToken",params,undefined,true); 
			copyArgs(n,"ExternalMeetingId",params,undefined,true); 
			copyArgs(n,"MeetingHostId",params,undefined,true); 
			copyArgs(n,"MediaRegion",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"NotificationsConfiguration",params,undefined,true); 
			
			copyArgs(msg,"ClientRequestToken",params,undefined,true); 
			copyArgs(msg,"ExternalMeetingId",params,undefined,true); 
			copyArgs(msg,"MeetingHostId",params,undefined,true); 
			copyArgs(msg,"MediaRegion",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"NotificationsConfiguration",params,undefined,true); 
			

			svc.createMeeting(params,cb);
		}
		
		service.CreateMeetingDialOut=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			copyArgs(n,"FromPhoneNumber",params,undefined,true); 
			copyArgs(n,"ToPhoneNumber",params,undefined,true); 
			copyArgs(n,"JoinToken",params,undefined,true); 
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			copyArgs(n,"FromPhoneNumber",params,undefined,true); 
			copyArgs(n,"ToPhoneNumber",params,undefined,true); 
			copyArgs(n,"JoinToken",params,undefined,true); 
			
			copyArgs(msg,"MeetingId",params,undefined,false); 
			copyArgs(msg,"FromPhoneNumber",params,undefined,true); 
			copyArgs(msg,"ToPhoneNumber",params,undefined,true); 
			copyArgs(msg,"JoinToken",params,undefined,true); 
			

			svc.createMeetingDialOut(params,cb);
		}
		
		service.CreateMeetingWithAttendees=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientRequestToken",params,undefined,true); 
			
			copyArgs(n,"ClientRequestToken",params,undefined,true); 
			copyArgs(n,"ExternalMeetingId",params,undefined,true); 
			copyArgs(n,"MeetingHostId",params,undefined,true); 
			copyArgs(n,"MediaRegion",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"NotificationsConfiguration",params,undefined,true); 
			copyArgs(n,"Attendees",params,undefined,false); 
			
			copyArgs(msg,"ClientRequestToken",params,undefined,true); 
			copyArgs(msg,"ExternalMeetingId",params,undefined,true); 
			copyArgs(msg,"MeetingHostId",params,undefined,true); 
			copyArgs(msg,"MediaRegion",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"NotificationsConfiguration",params,undefined,true); 
			copyArgs(msg,"Attendees",params,undefined,false); 
			

			svc.createMeetingWithAttendees(params,cb);
		}
		
		service.CreatePhoneNumberOrder=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProductType",params,undefined,false); 
			copyArgs(n,"E164PhoneNumbers",params,undefined,true); 
			
			copyArgs(n,"ProductType",params,undefined,false); 
			copyArgs(n,"E164PhoneNumbers",params,undefined,true); 
			
			copyArgs(msg,"ProductType",params,undefined,false); 
			copyArgs(msg,"E164PhoneNumbers",params,undefined,true); 
			

			svc.createPhoneNumberOrder(params,cb);
		}
		
		service.CreateProxySession=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ParticipantPhoneNumbers",params,undefined,false); 
			copyArgs(n,"Capabilities",params,undefined,true); 
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			copyArgs(n,"ParticipantPhoneNumbers",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(Number(n),"ExpiryMinutes",params,undefined,false); 
			copyArgs(n,"Capabilities",params,undefined,true); 
			copyArgs(n,"NumberSelectionBehavior",params,undefined,false); 
			copyArgs(n,"GeoMatchLevel",params,undefined,false); 
			copyArgs(n,"GeoMatchParams",params,undefined,true); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			copyArgs(msg,"ParticipantPhoneNumbers",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ExpiryMinutes",params,undefined,false); 
			copyArgs(msg,"Capabilities",params,undefined,true); 
			copyArgs(msg,"NumberSelectionBehavior",params,undefined,false); 
			copyArgs(msg,"GeoMatchLevel",params,undefined,false); 
			copyArgs(msg,"GeoMatchParams",params,undefined,true); 
			

			svc.createProxySession(params,cb);
		}
		
		service.CreateRoom=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,true); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,true); 
			copyArgs(msg,"ClientRequestToken",params,undefined,true); 
			

			svc.createRoom(params,cb);
		}
		
		service.CreateRoomMembership=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"RoomId",params,undefined,false); 
			copyArgs(n,"MemberId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"RoomId",params,undefined,false); 
			copyArgs(n,"MemberId",params,undefined,false); 
			copyArgs(n,"Role",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"RoomId",params,undefined,false); 
			copyArgs(msg,"MemberId",params,undefined,false); 
			copyArgs(msg,"Role",params,undefined,false); 
			

			svc.createRoomMembership(params,cb);
		}
		
		service.CreateSipMediaApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsRegion",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Endpoints",params,undefined,true); 
			
			copyArgs(n,"AwsRegion",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Endpoints",params,undefined,true); 
			
			copyArgs(msg,"AwsRegion",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Endpoints",params,undefined,true); 
			

			svc.createSipMediaApplication(params,cb);
		}
		
		service.CreateSipMediaApplicationCall=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FromPhoneNumber",params,undefined,true); 
			copyArgs(n,"ToPhoneNumber",params,undefined,true); 
			copyArgs(n,"SipMediaApplicationId",params,undefined,false); 
			
			copyArgs(n,"FromPhoneNumber",params,undefined,true); 
			copyArgs(n,"ToPhoneNumber",params,undefined,true); 
			copyArgs(n,"SipMediaApplicationId",params,undefined,false); 
			
			copyArgs(msg,"FromPhoneNumber",params,undefined,true); 
			copyArgs(msg,"ToPhoneNumber",params,undefined,true); 
			copyArgs(msg,"SipMediaApplicationId",params,undefined,false); 
			

			svc.createSipMediaApplicationCall(params,cb);
		}
		
		service.CreateSipRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"TriggerType",params,undefined,false); 
			copyArgs(n,"TriggerValue",params,undefined,false); 
			copyArgs(n,"TargetApplications",params,undefined,true); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"TriggerType",params,undefined,false); 
			copyArgs(n,"TriggerValue",params,undefined,false); 
			copyArgs(Boolean(n),"Disabled",params,undefined,false); 
			copyArgs(n,"TargetApplications",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"TriggerType",params,undefined,false); 
			copyArgs(msg,"TriggerValue",params,undefined,false); 
			copyArgs(msg,"Disabled",params,undefined,false); 
			copyArgs(msg,"TargetApplications",params,undefined,true); 
			

			svc.createSipRule(params,cb);
		}
		
		service.CreateUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Username",params,undefined,false); 
			copyArgs(n,"Email",params,undefined,true); 
			copyArgs(n,"UserType",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Username",params,undefined,false); 
			copyArgs(msg,"Email",params,undefined,true); 
			copyArgs(msg,"UserType",params,undefined,false); 
			

			svc.createUser(params,cb);
		}
		
		service.CreateVoiceConnector=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(Boolean(n),"RequireEncryption",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"AwsRegion",params,undefined,false); 
			copyArgs(Boolean(n),"RequireEncryption",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"AwsRegion",params,undefined,false); 
			copyArgs(msg,"RequireEncryption",params,undefined,false); 
			

			svc.createVoiceConnector(params,cb);
		}
		
		service.CreateVoiceConnectorGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"VoiceConnectorItems",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"VoiceConnectorItems",params,undefined,true); 
			

			svc.createVoiceConnectorGroup(params,cb);
		}
		
		service.DeleteAccount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			

			svc.deleteAccount(params,cb);
		}
		
		service.DeleteAppInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			
			copyArgs(msg,"AppInstanceArn",params,undefined,false); 
			

			svc.deleteAppInstance(params,cb);
		}
		
		service.DeleteAppInstanceAdmin=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppInstanceAdminArn",params,undefined,false); 
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			
			copyArgs(n,"AppInstanceAdminArn",params,undefined,false); 
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			
			copyArgs(msg,"AppInstanceAdminArn",params,undefined,false); 
			copyArgs(msg,"AppInstanceArn",params,undefined,false); 
			

			svc.deleteAppInstanceAdmin(params,cb);
		}
		
		service.DeleteAppInstanceStreamingConfigurations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			
			copyArgs(msg,"AppInstanceArn",params,undefined,false); 
			

			svc.deleteAppInstanceStreamingConfigurations(params,cb);
		}
		
		service.DeleteAppInstanceUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppInstanceUserArn",params,undefined,false); 
			
			copyArgs(n,"AppInstanceUserArn",params,undefined,false); 
			
			copyArgs(msg,"AppInstanceUserArn",params,undefined,false); 
			

			svc.deleteAppInstanceUser(params,cb);
		}
		
		service.DeleteAttendee=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			copyArgs(n,"AttendeeId",params,undefined,false); 
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			copyArgs(n,"AttendeeId",params,undefined,false); 
			
			copyArgs(msg,"MeetingId",params,undefined,false); 
			copyArgs(msg,"AttendeeId",params,undefined,false); 
			

			svc.deleteAttendee(params,cb);
		}
		
		service.DeleteChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"ChannelArn",params,undefined,false); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.deleteChannel(params,cb);
		}
		
		service.DeleteChannelBan=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"MemberArn",params,undefined,false); 
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"MemberArn",params,undefined,false); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"ChannelArn",params,undefined,false); 
			copyArgs(msg,"MemberArn",params,undefined,false); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.deleteChannelBan(params,cb);
		}
		
		service.DeleteChannelMembership=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"MemberArn",params,undefined,false); 
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"MemberArn",params,undefined,false); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"ChannelArn",params,undefined,false); 
			copyArgs(msg,"MemberArn",params,undefined,false); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.deleteChannelMembership(params,cb);
		}
		
		service.DeleteChannelMessage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"MessageId",params,undefined,false); 
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"MessageId",params,undefined,false); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"ChannelArn",params,undefined,false); 
			copyArgs(msg,"MessageId",params,undefined,false); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.deleteChannelMessage(params,cb);
		}
		
		service.DeleteChannelModerator=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"ChannelModeratorArn",params,undefined,false); 
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"ChannelModeratorArn",params,undefined,false); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"ChannelArn",params,undefined,false); 
			copyArgs(msg,"ChannelModeratorArn",params,undefined,false); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.deleteChannelModerator(params,cb);
		}
		
		service.DeleteEventsConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BotId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BotId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"BotId",params,undefined,false); 
			

			svc.deleteEventsConfiguration(params,cb);
		}
		
		service.DeleteMediaCapturePipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MediaPipelineId",params,undefined,false); 
			
			copyArgs(n,"MediaPipelineId",params,undefined,false); 
			
			copyArgs(msg,"MediaPipelineId",params,undefined,false); 
			

			svc.deleteMediaCapturePipeline(params,cb);
		}
		
		service.DeleteMeeting=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			
			copyArgs(msg,"MeetingId",params,undefined,false); 
			

			svc.deleteMeeting(params,cb);
		}
		
		service.DeletePhoneNumber=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PhoneNumberId",params,undefined,false); 
			
			copyArgs(n,"PhoneNumberId",params,undefined,false); 
			
			copyArgs(msg,"PhoneNumberId",params,undefined,false); 
			

			svc.deletePhoneNumber(params,cb);
		}
		
		service.DeleteProxySession=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			copyArgs(n,"ProxySessionId",params,undefined,false); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			copyArgs(n,"ProxySessionId",params,undefined,false); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			copyArgs(msg,"ProxySessionId",params,undefined,false); 
			

			svc.deleteProxySession(params,cb);
		}
		
		service.DeleteRoom=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"RoomId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"RoomId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"RoomId",params,undefined,false); 
			

			svc.deleteRoom(params,cb);
		}
		
		service.DeleteRoomMembership=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"RoomId",params,undefined,false); 
			copyArgs(n,"MemberId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"RoomId",params,undefined,false); 
			copyArgs(n,"MemberId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"RoomId",params,undefined,false); 
			copyArgs(msg,"MemberId",params,undefined,false); 
			

			svc.deleteRoomMembership(params,cb);
		}
		
		service.DeleteSipMediaApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SipMediaApplicationId",params,undefined,false); 
			
			copyArgs(n,"SipMediaApplicationId",params,undefined,false); 
			
			copyArgs(msg,"SipMediaApplicationId",params,undefined,false); 
			

			svc.deleteSipMediaApplication(params,cb);
		}
		
		service.DeleteSipRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SipRuleId",params,undefined,false); 
			
			copyArgs(n,"SipRuleId",params,undefined,false); 
			
			copyArgs(msg,"SipRuleId",params,undefined,false); 
			

			svc.deleteSipRule(params,cb);
		}
		
		service.DeleteVoiceConnector=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.deleteVoiceConnector(params,cb);
		}
		
		service.DeleteVoiceConnectorEmergencyCallingConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.deleteVoiceConnectorEmergencyCallingConfiguration(params,cb);
		}
		
		service.DeleteVoiceConnectorGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorGroupId",params,undefined,false); 
			
			copyArgs(n,"VoiceConnectorGroupId",params,undefined,false); 
			
			copyArgs(msg,"VoiceConnectorGroupId",params,undefined,false); 
			

			svc.deleteVoiceConnectorGroup(params,cb);
		}
		
		service.DeleteVoiceConnectorOrigination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.deleteVoiceConnectorOrigination(params,cb);
		}
		
		service.DeleteVoiceConnectorProxy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.deleteVoiceConnectorProxy(params,cb);
		}
		
		service.DeleteVoiceConnectorStreamingConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.deleteVoiceConnectorStreamingConfiguration(params,cb);
		}
		
		service.DeleteVoiceConnectorTermination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.deleteVoiceConnectorTermination(params,cb);
		}
		
		service.DeleteVoiceConnectorTerminationCredentials=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Usernames",params,undefined,true); 
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			copyArgs(n,"Usernames",params,undefined,true); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			copyArgs(msg,"Usernames",params,undefined,true); 
			

			svc.deleteVoiceConnectorTerminationCredentials(params,cb);
		}
		
		service.DescribeAppInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			
			copyArgs(msg,"AppInstanceArn",params,undefined,false); 
			

			svc.describeAppInstance(params,cb);
		}
		
		service.DescribeAppInstanceAdmin=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppInstanceAdminArn",params,undefined,false); 
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			
			copyArgs(n,"AppInstanceAdminArn",params,undefined,false); 
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			
			copyArgs(msg,"AppInstanceAdminArn",params,undefined,false); 
			copyArgs(msg,"AppInstanceArn",params,undefined,false); 
			

			svc.describeAppInstanceAdmin(params,cb);
		}
		
		service.DescribeAppInstanceUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppInstanceUserArn",params,undefined,false); 
			
			copyArgs(n,"AppInstanceUserArn",params,undefined,false); 
			
			copyArgs(msg,"AppInstanceUserArn",params,undefined,false); 
			

			svc.describeAppInstanceUser(params,cb);
		}
		
		service.DescribeChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"ChannelArn",params,undefined,false); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.describeChannel(params,cb);
		}
		
		service.DescribeChannelBan=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"MemberArn",params,undefined,false); 
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"MemberArn",params,undefined,false); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"ChannelArn",params,undefined,false); 
			copyArgs(msg,"MemberArn",params,undefined,false); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.describeChannelBan(params,cb);
		}
		
		service.DescribeChannelMembership=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"MemberArn",params,undefined,false); 
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"MemberArn",params,undefined,false); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"ChannelArn",params,undefined,false); 
			copyArgs(msg,"MemberArn",params,undefined,false); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.describeChannelMembership(params,cb);
		}
		
		service.DescribeChannelMembershipForAppInstanceUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"AppInstanceUserArn",params,undefined,false); 
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"AppInstanceUserArn",params,undefined,false); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"ChannelArn",params,undefined,false); 
			copyArgs(msg,"AppInstanceUserArn",params,undefined,false); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.describeChannelMembershipForAppInstanceUser(params,cb);
		}
		
		service.DescribeChannelModeratedByAppInstanceUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"AppInstanceUserArn",params,undefined,false); 
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"AppInstanceUserArn",params,undefined,false); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"ChannelArn",params,undefined,false); 
			copyArgs(msg,"AppInstanceUserArn",params,undefined,false); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.describeChannelModeratedByAppInstanceUser(params,cb);
		}
		
		service.DescribeChannelModerator=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"ChannelModeratorArn",params,undefined,false); 
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"ChannelModeratorArn",params,undefined,false); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"ChannelArn",params,undefined,false); 
			copyArgs(msg,"ChannelModeratorArn",params,undefined,false); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.describeChannelModerator(params,cb);
		}
		
		service.DisassociatePhoneNumberFromUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"UserId",params,undefined,false); 
			

			svc.disassociatePhoneNumberFromUser(params,cb);
		}
		
		service.DisassociatePhoneNumbersFromVoiceConnector=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			copyArgs(n,"E164PhoneNumbers",params,undefined,true); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			copyArgs(n,"E164PhoneNumbers",params,undefined,true); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			copyArgs(msg,"E164PhoneNumbers",params,undefined,true); 
			

			svc.disassociatePhoneNumbersFromVoiceConnector(params,cb);
		}
		
		service.DisassociatePhoneNumbersFromVoiceConnectorGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorGroupId",params,undefined,false); 
			copyArgs(n,"E164PhoneNumbers",params,undefined,true); 
			
			copyArgs(n,"VoiceConnectorGroupId",params,undefined,false); 
			copyArgs(n,"E164PhoneNumbers",params,undefined,true); 
			
			copyArgs(msg,"VoiceConnectorGroupId",params,undefined,false); 
			copyArgs(msg,"E164PhoneNumbers",params,undefined,true); 
			

			svc.disassociatePhoneNumbersFromVoiceConnectorGroup(params,cb);
		}
		
		service.DisassociateSigninDelegateGroupsFromAccount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"GroupNames",params,undefined,true); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"GroupNames",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"GroupNames",params,undefined,true); 
			

			svc.disassociateSigninDelegateGroupsFromAccount(params,cb);
		}
		
		service.GetAccount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			

			svc.getAccount(params,cb);
		}
		
		service.GetAccountSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			

			svc.getAccountSettings(params,cb);
		}
		
		service.GetAppInstanceRetentionSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			
			copyArgs(msg,"AppInstanceArn",params,undefined,false); 
			

			svc.getAppInstanceRetentionSettings(params,cb);
		}
		
		service.GetAppInstanceStreamingConfigurations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			
			copyArgs(msg,"AppInstanceArn",params,undefined,false); 
			

			svc.getAppInstanceStreamingConfigurations(params,cb);
		}
		
		service.GetAttendee=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			copyArgs(n,"AttendeeId",params,undefined,false); 
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			copyArgs(n,"AttendeeId",params,undefined,false); 
			
			copyArgs(msg,"MeetingId",params,undefined,false); 
			copyArgs(msg,"AttendeeId",params,undefined,false); 
			

			svc.getAttendee(params,cb);
		}
		
		service.GetBot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BotId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BotId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"BotId",params,undefined,false); 
			

			svc.getBot(params,cb);
		}
		
		service.GetChannelMessage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"MessageId",params,undefined,false); 
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"MessageId",params,undefined,false); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"ChannelArn",params,undefined,false); 
			copyArgs(msg,"MessageId",params,undefined,false); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.getChannelMessage(params,cb);
		}
		
		service.GetEventsConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BotId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BotId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"BotId",params,undefined,false); 
			

			svc.getEventsConfiguration(params,cb);
		}
		
		service.GetGlobalSettings=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getGlobalSettings(params,cb);
		}
		
		service.GetMediaCapturePipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MediaPipelineId",params,undefined,false); 
			
			copyArgs(n,"MediaPipelineId",params,undefined,false); 
			
			copyArgs(msg,"MediaPipelineId",params,undefined,false); 
			

			svc.getMediaCapturePipeline(params,cb);
		}
		
		service.GetMeeting=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			
			copyArgs(msg,"MeetingId",params,undefined,false); 
			

			svc.getMeeting(params,cb);
		}
		
		service.GetMessagingSessionEndpoint=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getMessagingSessionEndpoint(params,cb);
		}
		
		service.GetPhoneNumber=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PhoneNumberId",params,undefined,false); 
			
			copyArgs(n,"PhoneNumberId",params,undefined,false); 
			
			copyArgs(msg,"PhoneNumberId",params,undefined,false); 
			

			svc.getPhoneNumber(params,cb);
		}
		
		service.GetPhoneNumberOrder=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PhoneNumberOrderId",params,undefined,false); 
			
			copyArgs(n,"PhoneNumberOrderId",params,undefined,false); 
			
			copyArgs(msg,"PhoneNumberOrderId",params,undefined,false); 
			

			svc.getPhoneNumberOrder(params,cb);
		}
		
		service.GetPhoneNumberSettings=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getPhoneNumberSettings(params,cb);
		}
		
		service.GetProxySession=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			copyArgs(n,"ProxySessionId",params,undefined,false); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			copyArgs(n,"ProxySessionId",params,undefined,false); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			copyArgs(msg,"ProxySessionId",params,undefined,false); 
			

			svc.getProxySession(params,cb);
		}
		
		service.GetRetentionSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			

			svc.getRetentionSettings(params,cb);
		}
		
		service.GetRoom=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"RoomId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"RoomId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"RoomId",params,undefined,false); 
			

			svc.getRoom(params,cb);
		}
		
		service.GetSipMediaApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SipMediaApplicationId",params,undefined,false); 
			
			copyArgs(n,"SipMediaApplicationId",params,undefined,false); 
			
			copyArgs(msg,"SipMediaApplicationId",params,undefined,false); 
			

			svc.getSipMediaApplication(params,cb);
		}
		
		service.GetSipMediaApplicationLoggingConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SipMediaApplicationId",params,undefined,false); 
			
			copyArgs(n,"SipMediaApplicationId",params,undefined,false); 
			
			copyArgs(msg,"SipMediaApplicationId",params,undefined,false); 
			

			svc.getSipMediaApplicationLoggingConfiguration(params,cb);
		}
		
		service.GetSipRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SipRuleId",params,undefined,false); 
			
			copyArgs(n,"SipRuleId",params,undefined,false); 
			
			copyArgs(msg,"SipRuleId",params,undefined,false); 
			

			svc.getSipRule(params,cb);
		}
		
		service.GetUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"UserId",params,undefined,false); 
			

			svc.getUser(params,cb);
		}
		
		service.GetUserSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"UserId",params,undefined,false); 
			

			svc.getUserSettings(params,cb);
		}
		
		service.GetVoiceConnector=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.getVoiceConnector(params,cb);
		}
		
		service.GetVoiceConnectorEmergencyCallingConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.getVoiceConnectorEmergencyCallingConfiguration(params,cb);
		}
		
		service.GetVoiceConnectorGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorGroupId",params,undefined,false); 
			
			copyArgs(n,"VoiceConnectorGroupId",params,undefined,false); 
			
			copyArgs(msg,"VoiceConnectorGroupId",params,undefined,false); 
			

			svc.getVoiceConnectorGroup(params,cb);
		}
		
		service.GetVoiceConnectorLoggingConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.getVoiceConnectorLoggingConfiguration(params,cb);
		}
		
		service.GetVoiceConnectorOrigination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.getVoiceConnectorOrigination(params,cb);
		}
		
		service.GetVoiceConnectorProxy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.getVoiceConnectorProxy(params,cb);
		}
		
		service.GetVoiceConnectorStreamingConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.getVoiceConnectorStreamingConfiguration(params,cb);
		}
		
		service.GetVoiceConnectorTermination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.getVoiceConnectorTermination(params,cb);
		}
		
		service.GetVoiceConnectorTerminationHealth=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.getVoiceConnectorTerminationHealth(params,cb);
		}
		
		service.InviteUsers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"UserEmailList",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"UserEmailList",params,undefined,false); 
			copyArgs(n,"UserType",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"UserEmailList",params,undefined,false); 
			copyArgs(msg,"UserType",params,undefined,false); 
			

			svc.inviteUsers(params,cb);
		}
		
		service.ListAccounts=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"UserEmail",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"UserEmail",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listAccounts(params,cb);
		}
		
		service.ListAppInstanceAdmins=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,true); 
			
			copyArgs(msg,"AppInstanceArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,true); 
			

			svc.listAppInstanceAdmins(params,cb);
		}
		
		service.ListAppInstanceUsers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,true); 
			
			copyArgs(msg,"AppInstanceArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,true); 
			

			svc.listAppInstanceUsers(params,cb);
		}
		
		service.ListAppInstances=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,true); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,true); 
			

			svc.listAppInstances(params,cb);
		}
		
		service.ListAttendeeTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			copyArgs(n,"AttendeeId",params,undefined,false); 
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			copyArgs(n,"AttendeeId",params,undefined,false); 
			
			copyArgs(msg,"MeetingId",params,undefined,false); 
			copyArgs(msg,"AttendeeId",params,undefined,false); 
			

			svc.listAttendeeTags(params,cb);
		}
		
		service.ListAttendees=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"MeetingId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listAttendees(params,cb);
		}
		
		service.ListBots=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listBots(params,cb);
		}
		
		service.ListChannelBans=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,true); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"ChannelArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,true); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.listChannelBans(params,cb);
		}
		
		service.ListChannelMemberships=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,true); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"ChannelArn",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,true); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.listChannelMemberships(params,cb);
		}
		
		service.ListChannelMembershipsForAppInstanceUser=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AppInstanceUserArn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,true); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"AppInstanceUserArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,true); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.listChannelMembershipsForAppInstanceUser(params,cb);
		}
		
		service.ListChannelMessages=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NotBefore",params,undefined,false); 
			copyArgs(n,"NotAfter",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,true); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"ChannelArn",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NotBefore",params,undefined,false); 
			copyArgs(msg,"NotAfter",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,true); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.listChannelMessages(params,cb);
		}
		
		service.ListChannelModerators=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,true); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"ChannelArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,true); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.listChannelModerators(params,cb);
		}
		
		service.ListChannels=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			copyArgs(n,"Privacy",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,true); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"AppInstanceArn",params,undefined,false); 
			copyArgs(msg,"Privacy",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,true); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.listChannels(params,cb);
		}
		
		service.ListChannelsModeratedByAppInstanceUser=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AppInstanceUserArn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,true); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"AppInstanceUserArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,true); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.listChannelsModeratedByAppInstanceUser(params,cb);
		}
		
		service.ListMediaCapturePipelines=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listMediaCapturePipelines(params,cb);
		}
		
		service.ListMeetingTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			
			copyArgs(msg,"MeetingId",params,undefined,false); 
			

			svc.listMeetingTags(params,cb);
		}
		
		service.ListMeetings=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listMeetings(params,cb);
		}
		
		service.ListPhoneNumberOrders=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listPhoneNumberOrders(params,cb);
		}
		
		service.ListPhoneNumbers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Status",params,undefined,false); 
			copyArgs(n,"ProductType",params,undefined,false); 
			copyArgs(n,"FilterName",params,undefined,false); 
			copyArgs(n,"FilterValue",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Status",params,undefined,false); 
			copyArgs(msg,"ProductType",params,undefined,false); 
			copyArgs(msg,"FilterName",params,undefined,false); 
			copyArgs(msg,"FilterValue",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listPhoneNumbers(params,cb);
		}
		
		service.ListProxySessions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listProxySessions(params,cb);
		}
		
		service.ListRoomMemberships=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"RoomId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"RoomId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"RoomId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listRoomMemberships(params,cb);
		}
		
		service.ListRooms=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"MemberId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"MemberId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listRooms(params,cb);
		}
		
		service.ListSipMediaApplications=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listSipMediaApplications(params,cb);
		}
		
		service.ListSipRules=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SipMediaApplicationId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"SipMediaApplicationId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listSipRules(params,cb);
		}
		
		service.ListSupportedPhoneNumberCountries=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProductType",params,undefined,false); 
			
			copyArgs(n,"ProductType",params,undefined,false); 
			
			copyArgs(msg,"ProductType",params,undefined,false); 
			

			svc.listSupportedPhoneNumberCountries(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,true); 
			
			copyArgs(n,"ResourceARN",params,undefined,true); 
			
			copyArgs(msg,"ResourceARN",params,undefined,true); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.ListUsers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"UserEmail",params,undefined,true); 
			copyArgs(n,"UserType",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"UserEmail",params,undefined,true); 
			copyArgs(msg,"UserType",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listUsers(params,cb);
		}
		
		service.ListVoiceConnectorGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listVoiceConnectorGroups(params,cb);
		}
		
		service.ListVoiceConnectorTerminationCredentials=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.listVoiceConnectorTerminationCredentials(params,cb);
		}
		
		service.ListVoiceConnectors=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listVoiceConnectors(params,cb);
		}
		
		service.LogoutUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"UserId",params,undefined,false); 
			

			svc.logoutUser(params,cb);
		}
		
		service.PutAppInstanceRetentionSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			copyArgs(n,"AppInstanceRetentionSettings",params,undefined,true); 
			
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			copyArgs(n,"AppInstanceRetentionSettings",params,undefined,true); 
			
			copyArgs(msg,"AppInstanceArn",params,undefined,false); 
			copyArgs(msg,"AppInstanceRetentionSettings",params,undefined,true); 
			

			svc.putAppInstanceRetentionSettings(params,cb);
		}
		
		service.PutAppInstanceStreamingConfigurations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			copyArgs(n,"AppInstanceStreamingConfigurations",params,undefined,true); 
			
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			copyArgs(n,"AppInstanceStreamingConfigurations",params,undefined,true); 
			
			copyArgs(msg,"AppInstanceArn",params,undefined,false); 
			copyArgs(msg,"AppInstanceStreamingConfigurations",params,undefined,true); 
			

			svc.putAppInstanceStreamingConfigurations(params,cb);
		}
		
		service.PutEventsConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BotId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BotId",params,undefined,false); 
			copyArgs(n,"OutboundEventsHTTPSEndpoint",params,undefined,true); 
			copyArgs(n,"LambdaFunctionArn",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"BotId",params,undefined,false); 
			copyArgs(msg,"OutboundEventsHTTPSEndpoint",params,undefined,true); 
			copyArgs(msg,"LambdaFunctionArn",params,undefined,true); 
			

			svc.putEventsConfiguration(params,cb);
		}
		
		service.PutRetentionSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"RetentionSettings",params,undefined,true); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"RetentionSettings",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"RetentionSettings",params,undefined,true); 
			

			svc.putRetentionSettings(params,cb);
		}
		
		service.PutSipMediaApplicationLoggingConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SipMediaApplicationId",params,undefined,false); 
			
			copyArgs(n,"SipMediaApplicationId",params,undefined,false); 
			copyArgs(n,"SipMediaApplicationLoggingConfiguration",params,undefined,true); 
			
			copyArgs(msg,"SipMediaApplicationId",params,undefined,false); 
			copyArgs(msg,"SipMediaApplicationLoggingConfiguration",params,undefined,true); 
			

			svc.putSipMediaApplicationLoggingConfiguration(params,cb);
		}
		
		service.PutVoiceConnectorEmergencyCallingConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			copyArgs(n,"EmergencyCallingConfiguration",params,undefined,true); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			copyArgs(n,"EmergencyCallingConfiguration",params,undefined,true); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			copyArgs(msg,"EmergencyCallingConfiguration",params,undefined,true); 
			

			svc.putVoiceConnectorEmergencyCallingConfiguration(params,cb);
		}
		
		service.PutVoiceConnectorLoggingConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			copyArgs(n,"LoggingConfiguration",params,undefined,true); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			copyArgs(n,"LoggingConfiguration",params,undefined,true); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			copyArgs(msg,"LoggingConfiguration",params,undefined,true); 
			

			svc.putVoiceConnectorLoggingConfiguration(params,cb);
		}
		
		service.PutVoiceConnectorOrigination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			copyArgs(n,"Origination",params,undefined,true); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			copyArgs(n,"Origination",params,undefined,true); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			copyArgs(msg,"Origination",params,undefined,true); 
			

			svc.putVoiceConnectorOrigination(params,cb);
		}
		
		service.PutVoiceConnectorProxy=function(svc,msg,cb){
			var params={};
			
			copyArgs(Number(n),"DefaultSessionExpiryMinutes",params,undefined,false); 
			copyArgs(n,"PhoneNumberPoolCountries",params,undefined,false); 
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			copyArgs(Number(n),"DefaultSessionExpiryMinutes",params,undefined,false); 
			copyArgs(n,"PhoneNumberPoolCountries",params,undefined,false); 
			copyArgs(n,"FallBackPhoneNumber",params,undefined,true); 
			copyArgs(Boolean(n),"Disabled",params,undefined,false); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			copyArgs(msg,"DefaultSessionExpiryMinutes",params,undefined,false); 
			copyArgs(msg,"PhoneNumberPoolCountries",params,undefined,false); 
			copyArgs(msg,"FallBackPhoneNumber",params,undefined,true); 
			copyArgs(msg,"Disabled",params,undefined,false); 
			

			svc.putVoiceConnectorProxy(params,cb);
		}
		
		service.PutVoiceConnectorStreamingConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			copyArgs(n,"StreamingConfiguration",params,undefined,true); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			copyArgs(n,"StreamingConfiguration",params,undefined,true); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			copyArgs(msg,"StreamingConfiguration",params,undefined,true); 
			

			svc.putVoiceConnectorStreamingConfiguration(params,cb);
		}
		
		service.PutVoiceConnectorTermination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			copyArgs(n,"Termination",params,undefined,true); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			copyArgs(n,"Termination",params,undefined,true); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			copyArgs(msg,"Termination",params,undefined,true); 
			

			svc.putVoiceConnectorTermination(params,cb);
		}
		
		service.PutVoiceConnectorTerminationCredentials=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			copyArgs(n,"Credentials",params,undefined,false); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			copyArgs(msg,"Credentials",params,undefined,false); 
			

			svc.putVoiceConnectorTerminationCredentials(params,cb);
		}
		
		service.RedactChannelMessage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"MessageId",params,undefined,false); 
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"MessageId",params,undefined,false); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"ChannelArn",params,undefined,false); 
			copyArgs(msg,"MessageId",params,undefined,false); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.redactChannelMessage(params,cb);
		}
		
		service.RedactConversationMessage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"ConversationId",params,undefined,false); 
			copyArgs(n,"MessageId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"ConversationId",params,undefined,false); 
			copyArgs(n,"MessageId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"ConversationId",params,undefined,false); 
			copyArgs(msg,"MessageId",params,undefined,false); 
			

			svc.redactConversationMessage(params,cb);
		}
		
		service.RedactRoomMessage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"RoomId",params,undefined,false); 
			copyArgs(n,"MessageId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"RoomId",params,undefined,false); 
			copyArgs(n,"MessageId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"RoomId",params,undefined,false); 
			copyArgs(msg,"MessageId",params,undefined,false); 
			

			svc.redactRoomMessage(params,cb);
		}
		
		service.RegenerateSecurityToken=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BotId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BotId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"BotId",params,undefined,false); 
			

			svc.regenerateSecurityToken(params,cb);
		}
		
		service.ResetPersonalPIN=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"UserId",params,undefined,false); 
			

			svc.resetPersonalPIN(params,cb);
		}
		
		service.RestorePhoneNumber=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PhoneNumberId",params,undefined,false); 
			
			copyArgs(n,"PhoneNumberId",params,undefined,false); 
			
			copyArgs(msg,"PhoneNumberId",params,undefined,false); 
			

			svc.restorePhoneNumber(params,cb);
		}
		
		service.SearchAvailablePhoneNumbers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AreaCode",params,undefined,false); 
			copyArgs(n,"City",params,undefined,false); 
			copyArgs(n,"Country",params,undefined,false); 
			copyArgs(n,"State",params,undefined,false); 
			copyArgs(n,"TollFreePrefix",params,undefined,false); 
			copyArgs(n,"PhoneNumberType",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AreaCode",params,undefined,false); 
			copyArgs(msg,"City",params,undefined,false); 
			copyArgs(msg,"Country",params,undefined,false); 
			copyArgs(msg,"State",params,undefined,false); 
			copyArgs(msg,"TollFreePrefix",params,undefined,false); 
			copyArgs(msg,"PhoneNumberType",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.searchAvailablePhoneNumbers(params,cb);
		}
		
		service.SendChannelMessage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"Content",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Persistence",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,true); 
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"Content",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Persistence",params,undefined,false); 
			copyArgs(n,"Metadata",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,true); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"ChannelArn",params,undefined,false); 
			copyArgs(msg,"Content",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"Persistence",params,undefined,false); 
			copyArgs(msg,"Metadata",params,undefined,true); 
			copyArgs(msg,"ClientRequestToken",params,undefined,true); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.sendChannelMessage(params,cb);
		}
		
		service.StartMeetingTranscription=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			copyArgs(n,"TranscriptionConfiguration",params,undefined,false); 
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			copyArgs(n,"TranscriptionConfiguration",params,undefined,false); 
			
			copyArgs(msg,"MeetingId",params,undefined,false); 
			copyArgs(msg,"TranscriptionConfiguration",params,undefined,false); 
			

			svc.startMeetingTranscription(params,cb);
		}
		
		service.StopMeetingTranscription=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			
			copyArgs(msg,"MeetingId",params,undefined,false); 
			

			svc.stopMeetingTranscription(params,cb);
		}
		
		service.TagAttendee=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			copyArgs(n,"AttendeeId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			copyArgs(n,"AttendeeId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"MeetingId",params,undefined,false); 
			copyArgs(msg,"AttendeeId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagAttendee(params,cb);
		}
		
		service.TagMeeting=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"MeetingId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagMeeting(params,cb);
		}
		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceARN",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceARN",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
		
		service.UntagAttendee=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			copyArgs(n,"AttendeeId",params,undefined,false); 
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			copyArgs(n,"AttendeeId",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"MeetingId",params,undefined,false); 
			copyArgs(msg,"AttendeeId",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagAttendee(params,cb);
		}
		
		service.UntagMeeting=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"MeetingId",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"MeetingId",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagMeeting(params,cb);
		}
		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,true); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,true); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,true); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
		
		service.UpdateAccount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"DefaultLicense",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"DefaultLicense",params,undefined,false); 
			

			svc.updateAccount(params,cb);
		}
		
		service.UpdateAccountSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"AccountSettings",params,undefined,true); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"AccountSettings",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"AccountSettings",params,undefined,true); 
			

			svc.updateAccountSettings(params,cb);
		}
		
		service.UpdateAppInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,true); 
			
			copyArgs(n,"AppInstanceArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,true); 
			copyArgs(n,"Metadata",params,undefined,true); 
			
			copyArgs(msg,"AppInstanceArn",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,true); 
			copyArgs(msg,"Metadata",params,undefined,true); 
			

			svc.updateAppInstance(params,cb);
		}
		
		service.UpdateAppInstanceUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppInstanceUserArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,true); 
			
			copyArgs(n,"AppInstanceUserArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,true); 
			copyArgs(n,"Metadata",params,undefined,true); 
			
			copyArgs(msg,"AppInstanceUserArn",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,true); 
			copyArgs(msg,"Metadata",params,undefined,true); 
			

			svc.updateAppInstanceUser(params,cb);
		}
		
		service.UpdateBot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BotId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"BotId",params,undefined,false); 
			copyArgs(Boolean(n),"Disabled",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"BotId",params,undefined,false); 
			copyArgs(msg,"Disabled",params,undefined,false); 
			

			svc.updateBot(params,cb);
		}
		
		service.UpdateChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,true); 
			copyArgs(n,"Mode",params,undefined,false); 
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,true); 
			copyArgs(n,"Mode",params,undefined,false); 
			copyArgs(n,"Metadata",params,undefined,true); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"ChannelArn",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,true); 
			copyArgs(msg,"Mode",params,undefined,false); 
			copyArgs(msg,"Metadata",params,undefined,true); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.updateChannel(params,cb);
		}
		
		service.UpdateChannelMessage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"MessageId",params,undefined,false); 
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"MessageId",params,undefined,false); 
			copyArgs(n,"Content",params,undefined,true); 
			copyArgs(n,"Metadata",params,undefined,true); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"ChannelArn",params,undefined,false); 
			copyArgs(msg,"MessageId",params,undefined,false); 
			copyArgs(msg,"Content",params,undefined,true); 
			copyArgs(msg,"Metadata",params,undefined,true); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.updateChannelMessage(params,cb);
		}
		
		service.UpdateChannelReadMarker=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			
			copyArgs(n,"ChannelArn",params,undefined,false); 
			copyArgs(n,"ChimeBearer",params,undefined,false); 
			
			copyArgs(msg,"ChannelArn",params,undefined,false); 
			copyArgs(msg,"ChimeBearer",params,undefined,false); 
			

			svc.updateChannelReadMarker(params,cb);
		}
		
		service.UpdateGlobalSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BusinessCalling",params,undefined,true); 
			copyArgs(n,"VoiceConnector",params,undefined,true); 
			
			copyArgs(n,"BusinessCalling",params,undefined,true); 
			copyArgs(n,"VoiceConnector",params,undefined,true); 
			
			copyArgs(msg,"BusinessCalling",params,undefined,true); 
			copyArgs(msg,"VoiceConnector",params,undefined,true); 
			

			svc.updateGlobalSettings(params,cb);
		}
		
		service.UpdatePhoneNumber=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PhoneNumberId",params,undefined,false); 
			
			copyArgs(n,"PhoneNumberId",params,undefined,false); 
			copyArgs(n,"ProductType",params,undefined,false); 
			copyArgs(n,"CallingName",params,undefined,true); 
			
			copyArgs(msg,"PhoneNumberId",params,undefined,false); 
			copyArgs(msg,"ProductType",params,undefined,false); 
			copyArgs(msg,"CallingName",params,undefined,true); 
			

			svc.updatePhoneNumber(params,cb);
		}
		
		service.UpdatePhoneNumberSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CallingName",params,undefined,true); 
			
			copyArgs(n,"CallingName",params,undefined,true); 
			
			copyArgs(msg,"CallingName",params,undefined,true); 
			

			svc.updatePhoneNumberSettings(params,cb);
		}
		
		service.UpdateProxySession=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Capabilities",params,undefined,true); 
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			copyArgs(n,"ProxySessionId",params,undefined,false); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			copyArgs(n,"ProxySessionId",params,undefined,false); 
			copyArgs(n,"Capabilities",params,undefined,true); 
			copyArgs(Number(n),"ExpiryMinutes",params,undefined,false); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			copyArgs(msg,"ProxySessionId",params,undefined,false); 
			copyArgs(msg,"Capabilities",params,undefined,true); 
			copyArgs(msg,"ExpiryMinutes",params,undefined,false); 
			

			svc.updateProxySession(params,cb);
		}
		
		service.UpdateRoom=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"RoomId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"RoomId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"RoomId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,true); 
			

			svc.updateRoom(params,cb);
		}
		
		service.UpdateRoomMembership=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"RoomId",params,undefined,false); 
			copyArgs(n,"MemberId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"RoomId",params,undefined,false); 
			copyArgs(n,"MemberId",params,undefined,false); 
			copyArgs(n,"Role",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"RoomId",params,undefined,false); 
			copyArgs(msg,"MemberId",params,undefined,false); 
			copyArgs(msg,"Role",params,undefined,false); 
			

			svc.updateRoomMembership(params,cb);
		}
		
		service.UpdateSipMediaApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SipMediaApplicationId",params,undefined,false); 
			
			copyArgs(n,"SipMediaApplicationId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Endpoints",params,undefined,true); 
			
			copyArgs(msg,"SipMediaApplicationId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Endpoints",params,undefined,true); 
			

			svc.updateSipMediaApplication(params,cb);
		}
		
		service.UpdateSipMediaApplicationCall=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SipMediaApplicationId",params,undefined,false); 
			copyArgs(n,"TransactionId",params,undefined,false); 
			copyArgs(n,"Arguments",params,undefined,false); 
			
			copyArgs(n,"SipMediaApplicationId",params,undefined,false); 
			copyArgs(n,"TransactionId",params,undefined,false); 
			copyArgs(n,"Arguments",params,undefined,false); 
			
			copyArgs(msg,"SipMediaApplicationId",params,undefined,false); 
			copyArgs(msg,"TransactionId",params,undefined,false); 
			copyArgs(msg,"Arguments",params,undefined,false); 
			

			svc.updateSipMediaApplicationCall(params,cb);
		}
		
		service.UpdateSipRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SipRuleId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"SipRuleId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(Boolean(n),"Disabled",params,undefined,false); 
			copyArgs(n,"TargetApplications",params,undefined,true); 
			
			copyArgs(msg,"SipRuleId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Disabled",params,undefined,false); 
			copyArgs(msg,"TargetApplications",params,undefined,true); 
			

			svc.updateSipRule(params,cb);
		}
		
		service.UpdateUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"LicenseType",params,undefined,false); 
			copyArgs(n,"UserType",params,undefined,false); 
			copyArgs(n,"AlexaForBusinessMetadata",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"UserId",params,undefined,false); 
			copyArgs(msg,"LicenseType",params,undefined,false); 
			copyArgs(msg,"UserType",params,undefined,false); 
			copyArgs(msg,"AlexaForBusinessMetadata",params,undefined,true); 
			

			svc.updateUser(params,cb);
		}
		
		service.UpdateUserSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"UserSettings",params,undefined,true); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"UserSettings",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"UserId",params,undefined,false); 
			copyArgs(msg,"UserSettings",params,undefined,true); 
			

			svc.updateUserSettings(params,cb);
		}
		
		service.UpdateVoiceConnector=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(Boolean(n),"RequireEncryption",params,undefined,false); 
			
			copyArgs(n,"VoiceConnectorId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(Boolean(n),"RequireEncryption",params,undefined,false); 
			
			copyArgs(msg,"VoiceConnectorId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"RequireEncryption",params,undefined,false); 
			

			svc.updateVoiceConnector(params,cb);
		}
		
		service.UpdateVoiceConnectorGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VoiceConnectorGroupId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"VoiceConnectorItems",params,undefined,true); 
			
			copyArgs(n,"VoiceConnectorGroupId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"VoiceConnectorItems",params,undefined,true); 
			
			copyArgs(msg,"VoiceConnectorGroupId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"VoiceConnectorItems",params,undefined,true); 
			

			svc.updateVoiceConnectorGroup(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS Chime", AmazonAPINode);

};
