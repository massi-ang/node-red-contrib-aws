
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

		var awsService = new AWS.Chime( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Chime(msg.AWSConfig) : awsService;

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

		
		service.AssociatePhoneNumberWithUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"UserId",params,undefined,false); 
			copyArg(n,"E164PhoneNumber",params,undefined,true); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"UserId",params,undefined,false); 
			copyArg(msg,"E164PhoneNumber",params,undefined,true); 
			

			svc.associatePhoneNumberWithUser(params,cb);
		}

		
		service.AssociatePhoneNumbersWithVoiceConnector=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			copyArg(n,"E164PhoneNumbers",params,undefined,true); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			copyArg(msg,"E164PhoneNumbers",params,undefined,true); 
			copyArg(msg,"ForceAssociate",params,undefined,false); 
			

			svc.associatePhoneNumbersWithVoiceConnector(params,cb);
		}

		
		service.AssociatePhoneNumbersWithVoiceConnectorGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorGroupId",params,undefined,false); 
			copyArg(n,"E164PhoneNumbers",params,undefined,true); 
			
			copyArg(msg,"VoiceConnectorGroupId",params,undefined,false); 
			copyArg(msg,"E164PhoneNumbers",params,undefined,true); 
			copyArg(msg,"ForceAssociate",params,undefined,false); 
			

			svc.associatePhoneNumbersWithVoiceConnectorGroup(params,cb);
		}

		
		service.AssociateSigninDelegateGroupsWithAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"SigninDelegateGroups",params,undefined,true); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"SigninDelegateGroups",params,undefined,true); 
			

			svc.associateSigninDelegateGroupsWithAccount(params,cb);
		}

		
		service.BatchCreateAttendee=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MeetingId",params,undefined,false); 
			copyArg(n,"Attendees",params,undefined,false); 
			
			copyArg(msg,"MeetingId",params,undefined,false); 
			copyArg(msg,"Attendees",params,undefined,false); 
			

			svc.batchCreateAttendee(params,cb);
		}

		
		service.BatchCreateChannelMembership=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelArn",params,undefined,false); 
			copyArg(n,"MemberArns",params,undefined,false); 
			
			copyArg(msg,"ChannelArn",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"MemberArns",params,undefined,false); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.batchCreateChannelMembership(params,cb);
		}

		
		service.BatchCreateRoomMembership=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"RoomId",params,undefined,false); 
			copyArg(n,"MembershipItemList",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"RoomId",params,undefined,false); 
			copyArg(msg,"MembershipItemList",params,undefined,false); 
			

			svc.batchCreateRoomMembership(params,cb);
		}

		
		service.BatchDeletePhoneNumber=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PhoneNumberIds",params,undefined,true); 
			
			copyArg(msg,"PhoneNumberIds",params,undefined,true); 
			

			svc.batchDeletePhoneNumber(params,cb);
		}

		
		service.BatchSuspendUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"UserIdList",params,undefined,true); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"UserIdList",params,undefined,true); 
			

			svc.batchSuspendUser(params,cb);
		}

		
		service.BatchUnsuspendUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"UserIdList",params,undefined,true); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"UserIdList",params,undefined,true); 
			

			svc.batchUnsuspendUser(params,cb);
		}

		
		service.BatchUpdatePhoneNumber=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UpdatePhoneNumberRequestItems",params,undefined,false); 
			
			copyArg(msg,"UpdatePhoneNumberRequestItems",params,undefined,false); 
			

			svc.batchUpdatePhoneNumber(params,cb);
		}

		
		service.BatchUpdateUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"UpdateUserRequestItems",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"UpdateUserRequestItems",params,undefined,false); 
			

			svc.batchUpdateUser(params,cb);
		}

		
		service.CreateAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.createAccount(params,cb);
		}

		
		service.CreateAppInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,true); 
			copyArg(n,"ClientRequestToken",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,true); 
			copyArg(msg,"Metadata",params,undefined,true); 
			copyArg(msg,"ClientRequestToken",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createAppInstance(params,cb);
		}

		
		service.CreateAppInstanceAdmin=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AppInstanceAdminArn",params,undefined,false); 
			copyArg(n,"AppInstanceArn",params,undefined,false); 
			
			copyArg(msg,"AppInstanceAdminArn",params,undefined,false); 
			copyArg(msg,"AppInstanceArn",params,undefined,false); 
			

			svc.createAppInstanceAdmin(params,cb);
		}

		
		service.CreateAppInstanceUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AppInstanceArn",params,undefined,false); 
			copyArg(n,"AppInstanceUserId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,true); 
			copyArg(n,"ClientRequestToken",params,undefined,true); 
			
			copyArg(msg,"AppInstanceArn",params,undefined,false); 
			copyArg(msg,"AppInstanceUserId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,true); 
			copyArg(msg,"Metadata",params,undefined,true); 
			copyArg(msg,"ClientRequestToken",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createAppInstanceUser(params,cb);
		}

		
		service.CreateAttendee=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MeetingId",params,undefined,false); 
			copyArg(n,"ExternalUserId",params,undefined,true); 
			
			copyArg(msg,"MeetingId",params,undefined,false); 
			copyArg(msg,"ExternalUserId",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createAttendee(params,cb);
		}

		
		service.CreateBot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DisplayName",params,undefined,true); 
			copyArg(n,"AccountId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"DisplayName",params,undefined,true); 
			copyArg(msg,"Domain",params,undefined,false); 
			

			svc.createBot(params,cb);
		}

		
		service.CreateChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AppInstanceArn",params,undefined,false); 
			copyArg(n,"Name",params,undefined,true); 
			copyArg(n,"ClientRequestToken",params,undefined,true); 
			
			copyArg(msg,"AppInstanceArn",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,true); 
			copyArg(msg,"Mode",params,undefined,false); 
			copyArg(msg,"Privacy",params,undefined,false); 
			copyArg(msg,"Metadata",params,undefined,true); 
			copyArg(msg,"ClientRequestToken",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.createChannel(params,cb);
		}

		
		service.CreateChannelBan=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelArn",params,undefined,false); 
			copyArg(n,"MemberArn",params,undefined,false); 
			
			copyArg(msg,"ChannelArn",params,undefined,false); 
			copyArg(msg,"MemberArn",params,undefined,false); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.createChannelBan(params,cb);
		}

		
		service.CreateChannelMembership=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelArn",params,undefined,false); 
			copyArg(n,"MemberArn",params,undefined,false); 
			copyArg(n,"Type",params,undefined,false); 
			
			copyArg(msg,"ChannelArn",params,undefined,false); 
			copyArg(msg,"MemberArn",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.createChannelMembership(params,cb);
		}

		
		service.CreateChannelModerator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelArn",params,undefined,false); 
			copyArg(n,"ChannelModeratorArn",params,undefined,false); 
			
			copyArg(msg,"ChannelArn",params,undefined,false); 
			copyArg(msg,"ChannelModeratorArn",params,undefined,false); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.createChannelModerator(params,cb);
		}

		
		service.CreateMediaCapturePipeline=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceType",params,undefined,false); 
			copyArg(n,"SourceArn",params,undefined,true); 
			copyArg(n,"SinkType",params,undefined,false); 
			copyArg(n,"SinkArn",params,undefined,true); 
			
			copyArg(msg,"SourceType",params,undefined,false); 
			copyArg(msg,"SourceArn",params,undefined,true); 
			copyArg(msg,"SinkType",params,undefined,false); 
			copyArg(msg,"SinkArn",params,undefined,true); 
			copyArg(msg,"ClientRequestToken",params,undefined,true); 
			

			svc.createMediaCapturePipeline(params,cb);
		}

		
		service.CreateMeeting=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClientRequestToken",params,undefined,true); 
			
			copyArg(msg,"ClientRequestToken",params,undefined,true); 
			copyArg(msg,"ExternalMeetingId",params,undefined,true); 
			copyArg(msg,"MeetingHostId",params,undefined,true); 
			copyArg(msg,"MediaRegion",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"NotificationsConfiguration",params,undefined,true); 
			

			svc.createMeeting(params,cb);
		}

		
		service.CreateMeetingDialOut=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MeetingId",params,undefined,false); 
			copyArg(n,"FromPhoneNumber",params,undefined,true); 
			copyArg(n,"ToPhoneNumber",params,undefined,true); 
			copyArg(n,"JoinToken",params,undefined,true); 
			
			copyArg(msg,"MeetingId",params,undefined,false); 
			copyArg(msg,"FromPhoneNumber",params,undefined,true); 
			copyArg(msg,"ToPhoneNumber",params,undefined,true); 
			copyArg(msg,"JoinToken",params,undefined,true); 
			

			svc.createMeetingDialOut(params,cb);
		}

		
		service.CreateMeetingWithAttendees=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClientRequestToken",params,undefined,true); 
			
			copyArg(msg,"ClientRequestToken",params,undefined,true); 
			copyArg(msg,"ExternalMeetingId",params,undefined,true); 
			copyArg(msg,"MeetingHostId",params,undefined,true); 
			copyArg(msg,"MediaRegion",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"NotificationsConfiguration",params,undefined,true); 
			copyArg(msg,"Attendees",params,undefined,false); 
			

			svc.createMeetingWithAttendees(params,cb);
		}

		
		service.CreatePhoneNumberOrder=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProductType",params,undefined,false); 
			copyArg(n,"E164PhoneNumbers",params,undefined,true); 
			
			copyArg(msg,"ProductType",params,undefined,false); 
			copyArg(msg,"E164PhoneNumbers",params,undefined,true); 
			

			svc.createPhoneNumberOrder(params,cb);
		}

		
		service.CreateProxySession=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ParticipantPhoneNumbers",params,undefined,false); 
			copyArg(n,"Capabilities",params,undefined,true); 
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			copyArg(msg,"ParticipantPhoneNumbers",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ExpiryMinutes",params,undefined,false); 
			copyArg(msg,"Capabilities",params,undefined,true); 
			copyArg(msg,"NumberSelectionBehavior",params,undefined,false); 
			copyArg(msg,"GeoMatchLevel",params,undefined,false); 
			copyArg(msg,"GeoMatchParams",params,undefined,true); 
			

			svc.createProxySession(params,cb);
		}

		
		service.CreateRoom=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,true); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,true); 
			copyArg(msg,"ClientRequestToken",params,undefined,true); 
			

			svc.createRoom(params,cb);
		}

		
		service.CreateRoomMembership=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"RoomId",params,undefined,false); 
			copyArg(n,"MemberId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"RoomId",params,undefined,false); 
			copyArg(msg,"MemberId",params,undefined,false); 
			copyArg(msg,"Role",params,undefined,false); 
			

			svc.createRoomMembership(params,cb);
		}

		
		service.CreateSipMediaApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsRegion",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Endpoints",params,undefined,true); 
			
			copyArg(msg,"AwsRegion",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Endpoints",params,undefined,true); 
			

			svc.createSipMediaApplication(params,cb);
		}

		
		service.CreateSipMediaApplicationCall=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FromPhoneNumber",params,undefined,true); 
			copyArg(n,"ToPhoneNumber",params,undefined,true); 
			copyArg(n,"SipMediaApplicationId",params,undefined,false); 
			
			copyArg(msg,"FromPhoneNumber",params,undefined,true); 
			copyArg(msg,"ToPhoneNumber",params,undefined,true); 
			copyArg(msg,"SipMediaApplicationId",params,undefined,false); 
			

			svc.createSipMediaApplicationCall(params,cb);
		}

		
		service.CreateSipRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"TriggerType",params,undefined,false); 
			copyArg(n,"TriggerValue",params,undefined,false); 
			copyArg(n,"TargetApplications",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"TriggerType",params,undefined,false); 
			copyArg(msg,"TriggerValue",params,undefined,false); 
			copyArg(msg,"Disabled",params,undefined,false); 
			copyArg(msg,"TargetApplications",params,undefined,true); 
			

			svc.createSipRule(params,cb);
		}

		
		service.CreateUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Username",params,undefined,false); 
			copyArg(msg,"Email",params,undefined,true); 
			copyArg(msg,"UserType",params,undefined,false); 
			

			svc.createUser(params,cb);
		}

		
		service.CreateVoiceConnector=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"RequireEncryption",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"AwsRegion",params,undefined,false); 
			copyArg(msg,"RequireEncryption",params,undefined,false); 
			

			svc.createVoiceConnector(params,cb);
		}

		
		service.CreateVoiceConnectorGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"VoiceConnectorItems",params,undefined,true); 
			

			svc.createVoiceConnectorGroup(params,cb);
		}

		
		service.DeleteAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			

			svc.deleteAccount(params,cb);
		}

		
		service.DeleteAppInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AppInstanceArn",params,undefined,false); 
			
			copyArg(msg,"AppInstanceArn",params,undefined,false); 
			

			svc.deleteAppInstance(params,cb);
		}

		
		service.DeleteAppInstanceAdmin=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AppInstanceAdminArn",params,undefined,false); 
			copyArg(n,"AppInstanceArn",params,undefined,false); 
			
			copyArg(msg,"AppInstanceAdminArn",params,undefined,false); 
			copyArg(msg,"AppInstanceArn",params,undefined,false); 
			

			svc.deleteAppInstanceAdmin(params,cb);
		}

		
		service.DeleteAppInstanceStreamingConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AppInstanceArn",params,undefined,false); 
			
			copyArg(msg,"AppInstanceArn",params,undefined,false); 
			

			svc.deleteAppInstanceStreamingConfigurations(params,cb);
		}

		
		service.DeleteAppInstanceUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AppInstanceUserArn",params,undefined,false); 
			
			copyArg(msg,"AppInstanceUserArn",params,undefined,false); 
			

			svc.deleteAppInstanceUser(params,cb);
		}

		
		service.DeleteAttendee=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MeetingId",params,undefined,false); 
			copyArg(n,"AttendeeId",params,undefined,false); 
			
			copyArg(msg,"MeetingId",params,undefined,false); 
			copyArg(msg,"AttendeeId",params,undefined,false); 
			

			svc.deleteAttendee(params,cb);
		}

		
		service.DeleteChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelArn",params,undefined,false); 
			
			copyArg(msg,"ChannelArn",params,undefined,false); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.deleteChannel(params,cb);
		}

		
		service.DeleteChannelBan=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelArn",params,undefined,false); 
			copyArg(n,"MemberArn",params,undefined,false); 
			
			copyArg(msg,"ChannelArn",params,undefined,false); 
			copyArg(msg,"MemberArn",params,undefined,false); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.deleteChannelBan(params,cb);
		}

		
		service.DeleteChannelMembership=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelArn",params,undefined,false); 
			copyArg(n,"MemberArn",params,undefined,false); 
			
			copyArg(msg,"ChannelArn",params,undefined,false); 
			copyArg(msg,"MemberArn",params,undefined,false); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.deleteChannelMembership(params,cb);
		}

		
		service.DeleteChannelMessage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelArn",params,undefined,false); 
			copyArg(n,"MessageId",params,undefined,false); 
			
			copyArg(msg,"ChannelArn",params,undefined,false); 
			copyArg(msg,"MessageId",params,undefined,false); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.deleteChannelMessage(params,cb);
		}

		
		service.DeleteChannelModerator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelArn",params,undefined,false); 
			copyArg(n,"ChannelModeratorArn",params,undefined,false); 
			
			copyArg(msg,"ChannelArn",params,undefined,false); 
			copyArg(msg,"ChannelModeratorArn",params,undefined,false); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.deleteChannelModerator(params,cb);
		}

		
		service.DeleteEventsConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"BotId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"BotId",params,undefined,false); 
			

			svc.deleteEventsConfiguration(params,cb);
		}

		
		service.DeleteMediaCapturePipeline=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MediaPipelineId",params,undefined,false); 
			
			copyArg(msg,"MediaPipelineId",params,undefined,false); 
			

			svc.deleteMediaCapturePipeline(params,cb);
		}

		
		service.DeleteMeeting=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MeetingId",params,undefined,false); 
			
			copyArg(msg,"MeetingId",params,undefined,false); 
			

			svc.deleteMeeting(params,cb);
		}

		
		service.DeletePhoneNumber=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PhoneNumberId",params,undefined,false); 
			
			copyArg(msg,"PhoneNumberId",params,undefined,false); 
			

			svc.deletePhoneNumber(params,cb);
		}

		
		service.DeleteProxySession=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			copyArg(n,"ProxySessionId",params,undefined,false); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			copyArg(msg,"ProxySessionId",params,undefined,false); 
			

			svc.deleteProxySession(params,cb);
		}

		
		service.DeleteRoom=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"RoomId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"RoomId",params,undefined,false); 
			

			svc.deleteRoom(params,cb);
		}

		
		service.DeleteRoomMembership=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"RoomId",params,undefined,false); 
			copyArg(n,"MemberId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"RoomId",params,undefined,false); 
			copyArg(msg,"MemberId",params,undefined,false); 
			

			svc.deleteRoomMembership(params,cb);
		}

		
		service.DeleteSipMediaApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SipMediaApplicationId",params,undefined,false); 
			
			copyArg(msg,"SipMediaApplicationId",params,undefined,false); 
			

			svc.deleteSipMediaApplication(params,cb);
		}

		
		service.DeleteSipRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SipRuleId",params,undefined,false); 
			
			copyArg(msg,"SipRuleId",params,undefined,false); 
			

			svc.deleteSipRule(params,cb);
		}

		
		service.DeleteVoiceConnector=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.deleteVoiceConnector(params,cb);
		}

		
		service.DeleteVoiceConnectorEmergencyCallingConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.deleteVoiceConnectorEmergencyCallingConfiguration(params,cb);
		}

		
		service.DeleteVoiceConnectorGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorGroupId",params,undefined,false); 
			
			copyArg(msg,"VoiceConnectorGroupId",params,undefined,false); 
			

			svc.deleteVoiceConnectorGroup(params,cb);
		}

		
		service.DeleteVoiceConnectorOrigination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.deleteVoiceConnectorOrigination(params,cb);
		}

		
		service.DeleteVoiceConnectorProxy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.deleteVoiceConnectorProxy(params,cb);
		}

		
		service.DeleteVoiceConnectorStreamingConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.deleteVoiceConnectorStreamingConfiguration(params,cb);
		}

		
		service.DeleteVoiceConnectorTermination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.deleteVoiceConnectorTermination(params,cb);
		}

		
		service.DeleteVoiceConnectorTerminationCredentials=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Usernames",params,undefined,true); 
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			copyArg(msg,"Usernames",params,undefined,true); 
			

			svc.deleteVoiceConnectorTerminationCredentials(params,cb);
		}

		
		service.DescribeAppInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AppInstanceArn",params,undefined,false); 
			
			copyArg(msg,"AppInstanceArn",params,undefined,false); 
			

			svc.describeAppInstance(params,cb);
		}

		
		service.DescribeAppInstanceAdmin=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AppInstanceAdminArn",params,undefined,false); 
			copyArg(n,"AppInstanceArn",params,undefined,false); 
			
			copyArg(msg,"AppInstanceAdminArn",params,undefined,false); 
			copyArg(msg,"AppInstanceArn",params,undefined,false); 
			

			svc.describeAppInstanceAdmin(params,cb);
		}

		
		service.DescribeAppInstanceUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AppInstanceUserArn",params,undefined,false); 
			
			copyArg(msg,"AppInstanceUserArn",params,undefined,false); 
			

			svc.describeAppInstanceUser(params,cb);
		}

		
		service.DescribeChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelArn",params,undefined,false); 
			
			copyArg(msg,"ChannelArn",params,undefined,false); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.describeChannel(params,cb);
		}

		
		service.DescribeChannelBan=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelArn",params,undefined,false); 
			copyArg(n,"MemberArn",params,undefined,false); 
			
			copyArg(msg,"ChannelArn",params,undefined,false); 
			copyArg(msg,"MemberArn",params,undefined,false); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.describeChannelBan(params,cb);
		}

		
		service.DescribeChannelMembership=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelArn",params,undefined,false); 
			copyArg(n,"MemberArn",params,undefined,false); 
			
			copyArg(msg,"ChannelArn",params,undefined,false); 
			copyArg(msg,"MemberArn",params,undefined,false); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.describeChannelMembership(params,cb);
		}

		
		service.DescribeChannelMembershipForAppInstanceUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelArn",params,undefined,false); 
			copyArg(n,"AppInstanceUserArn",params,undefined,false); 
			
			copyArg(msg,"ChannelArn",params,undefined,false); 
			copyArg(msg,"AppInstanceUserArn",params,undefined,false); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.describeChannelMembershipForAppInstanceUser(params,cb);
		}

		
		service.DescribeChannelModeratedByAppInstanceUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelArn",params,undefined,false); 
			copyArg(n,"AppInstanceUserArn",params,undefined,false); 
			
			copyArg(msg,"ChannelArn",params,undefined,false); 
			copyArg(msg,"AppInstanceUserArn",params,undefined,false); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.describeChannelModeratedByAppInstanceUser(params,cb);
		}

		
		service.DescribeChannelModerator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelArn",params,undefined,false); 
			copyArg(n,"ChannelModeratorArn",params,undefined,false); 
			
			copyArg(msg,"ChannelArn",params,undefined,false); 
			copyArg(msg,"ChannelModeratorArn",params,undefined,false); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.describeChannelModerator(params,cb);
		}

		
		service.DisassociatePhoneNumberFromUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"UserId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"UserId",params,undefined,false); 
			

			svc.disassociatePhoneNumberFromUser(params,cb);
		}

		
		service.DisassociatePhoneNumbersFromVoiceConnector=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			copyArg(n,"E164PhoneNumbers",params,undefined,true); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			copyArg(msg,"E164PhoneNumbers",params,undefined,true); 
			

			svc.disassociatePhoneNumbersFromVoiceConnector(params,cb);
		}

		
		service.DisassociatePhoneNumbersFromVoiceConnectorGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorGroupId",params,undefined,false); 
			copyArg(n,"E164PhoneNumbers",params,undefined,true); 
			
			copyArg(msg,"VoiceConnectorGroupId",params,undefined,false); 
			copyArg(msg,"E164PhoneNumbers",params,undefined,true); 
			

			svc.disassociatePhoneNumbersFromVoiceConnectorGroup(params,cb);
		}

		
		service.DisassociateSigninDelegateGroupsFromAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"GroupNames",params,undefined,true); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"GroupNames",params,undefined,true); 
			

			svc.disassociateSigninDelegateGroupsFromAccount(params,cb);
		}

		
		service.GetAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			

			svc.getAccount(params,cb);
		}

		
		service.GetAccountSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			

			svc.getAccountSettings(params,cb);
		}

		
		service.GetAppInstanceRetentionSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AppInstanceArn",params,undefined,false); 
			
			copyArg(msg,"AppInstanceArn",params,undefined,false); 
			

			svc.getAppInstanceRetentionSettings(params,cb);
		}

		
		service.GetAppInstanceStreamingConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AppInstanceArn",params,undefined,false); 
			
			copyArg(msg,"AppInstanceArn",params,undefined,false); 
			

			svc.getAppInstanceStreamingConfigurations(params,cb);
		}

		
		service.GetAttendee=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MeetingId",params,undefined,false); 
			copyArg(n,"AttendeeId",params,undefined,false); 
			
			copyArg(msg,"MeetingId",params,undefined,false); 
			copyArg(msg,"AttendeeId",params,undefined,false); 
			

			svc.getAttendee(params,cb);
		}

		
		service.GetBot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"BotId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"BotId",params,undefined,false); 
			

			svc.getBot(params,cb);
		}

		
		service.GetChannelMessage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelArn",params,undefined,false); 
			copyArg(n,"MessageId",params,undefined,false); 
			
			copyArg(msg,"ChannelArn",params,undefined,false); 
			copyArg(msg,"MessageId",params,undefined,false); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.getChannelMessage(params,cb);
		}

		
		service.GetEventsConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"BotId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"BotId",params,undefined,false); 
			

			svc.getEventsConfiguration(params,cb);
		}

		
		service.GetGlobalSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getGlobalSettings(params,cb);
		}

		
		service.GetMediaCapturePipeline=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MediaPipelineId",params,undefined,false); 
			
			copyArg(msg,"MediaPipelineId",params,undefined,false); 
			

			svc.getMediaCapturePipeline(params,cb);
		}

		
		service.GetMeeting=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MeetingId",params,undefined,false); 
			
			copyArg(msg,"MeetingId",params,undefined,false); 
			

			svc.getMeeting(params,cb);
		}

		
		service.GetMessagingSessionEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getMessagingSessionEndpoint(params,cb);
		}

		
		service.GetPhoneNumber=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PhoneNumberId",params,undefined,false); 
			
			copyArg(msg,"PhoneNumberId",params,undefined,false); 
			

			svc.getPhoneNumber(params,cb);
		}

		
		service.GetPhoneNumberOrder=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PhoneNumberOrderId",params,undefined,false); 
			
			copyArg(msg,"PhoneNumberOrderId",params,undefined,false); 
			

			svc.getPhoneNumberOrder(params,cb);
		}

		
		service.GetPhoneNumberSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getPhoneNumberSettings(params,cb);
		}

		
		service.GetProxySession=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			copyArg(n,"ProxySessionId",params,undefined,false); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			copyArg(msg,"ProxySessionId",params,undefined,false); 
			

			svc.getProxySession(params,cb);
		}

		
		service.GetRetentionSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			

			svc.getRetentionSettings(params,cb);
		}

		
		service.GetRoom=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"RoomId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"RoomId",params,undefined,false); 
			

			svc.getRoom(params,cb);
		}

		
		service.GetSipMediaApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SipMediaApplicationId",params,undefined,false); 
			
			copyArg(msg,"SipMediaApplicationId",params,undefined,false); 
			

			svc.getSipMediaApplication(params,cb);
		}

		
		service.GetSipMediaApplicationLoggingConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SipMediaApplicationId",params,undefined,false); 
			
			copyArg(msg,"SipMediaApplicationId",params,undefined,false); 
			

			svc.getSipMediaApplicationLoggingConfiguration(params,cb);
		}

		
		service.GetSipRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SipRuleId",params,undefined,false); 
			
			copyArg(msg,"SipRuleId",params,undefined,false); 
			

			svc.getSipRule(params,cb);
		}

		
		service.GetUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"UserId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"UserId",params,undefined,false); 
			

			svc.getUser(params,cb);
		}

		
		service.GetUserSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"UserId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"UserId",params,undefined,false); 
			

			svc.getUserSettings(params,cb);
		}

		
		service.GetVoiceConnector=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.getVoiceConnector(params,cb);
		}

		
		service.GetVoiceConnectorEmergencyCallingConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.getVoiceConnectorEmergencyCallingConfiguration(params,cb);
		}

		
		service.GetVoiceConnectorGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorGroupId",params,undefined,false); 
			
			copyArg(msg,"VoiceConnectorGroupId",params,undefined,false); 
			

			svc.getVoiceConnectorGroup(params,cb);
		}

		
		service.GetVoiceConnectorLoggingConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.getVoiceConnectorLoggingConfiguration(params,cb);
		}

		
		service.GetVoiceConnectorOrigination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.getVoiceConnectorOrigination(params,cb);
		}

		
		service.GetVoiceConnectorProxy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.getVoiceConnectorProxy(params,cb);
		}

		
		service.GetVoiceConnectorStreamingConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.getVoiceConnectorStreamingConfiguration(params,cb);
		}

		
		service.GetVoiceConnectorTermination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.getVoiceConnectorTermination(params,cb);
		}

		
		service.GetVoiceConnectorTerminationHealth=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.getVoiceConnectorTerminationHealth(params,cb);
		}

		
		service.InviteUsers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"UserEmailList",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"UserEmailList",params,undefined,false); 
			copyArg(msg,"UserType",params,undefined,false); 
			

			svc.inviteUsers(params,cb);
		}

		
		service.ListAccounts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"UserEmail",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listAccounts(params,cb);
		}

		
		service.ListAppInstanceAdmins=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AppInstanceArn",params,undefined,false); 
			
			copyArg(msg,"AppInstanceArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,true); 
			

			svc.listAppInstanceAdmins(params,cb);
		}

		
		service.ListAppInstanceUsers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AppInstanceArn",params,undefined,false); 
			
			copyArg(msg,"AppInstanceArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,true); 
			

			svc.listAppInstanceUsers(params,cb);
		}

		
		service.ListAppInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,true); 
			

			svc.listAppInstances(params,cb);
		}

		
		service.ListAttendeeTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MeetingId",params,undefined,false); 
			copyArg(n,"AttendeeId",params,undefined,false); 
			
			copyArg(msg,"MeetingId",params,undefined,false); 
			copyArg(msg,"AttendeeId",params,undefined,false); 
			

			svc.listAttendeeTags(params,cb);
		}

		
		service.ListAttendees=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MeetingId",params,undefined,false); 
			
			copyArg(msg,"MeetingId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listAttendees(params,cb);
		}

		
		service.ListBots=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listBots(params,cb);
		}

		
		service.ListChannelBans=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelArn",params,undefined,false); 
			
			copyArg(msg,"ChannelArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,true); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.listChannelBans(params,cb);
		}

		
		service.ListChannelMemberships=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelArn",params,undefined,false); 
			
			copyArg(msg,"ChannelArn",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,true); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.listChannelMemberships(params,cb);
		}

		
		service.ListChannelMembershipsForAppInstanceUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AppInstanceUserArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,true); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.listChannelMembershipsForAppInstanceUser(params,cb);
		}

		
		service.ListChannelMessages=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelArn",params,undefined,false); 
			
			copyArg(msg,"ChannelArn",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NotBefore",params,undefined,false); 
			copyArg(msg,"NotAfter",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,true); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.listChannelMessages(params,cb);
		}

		
		service.ListChannelModerators=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelArn",params,undefined,false); 
			
			copyArg(msg,"ChannelArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,true); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.listChannelModerators(params,cb);
		}

		
		service.ListChannels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AppInstanceArn",params,undefined,false); 
			
			copyArg(msg,"AppInstanceArn",params,undefined,false); 
			copyArg(msg,"Privacy",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,true); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.listChannels(params,cb);
		}

		
		service.ListChannelsModeratedByAppInstanceUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AppInstanceUserArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,true); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.listChannelsModeratedByAppInstanceUser(params,cb);
		}

		
		service.ListMediaCapturePipelines=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listMediaCapturePipelines(params,cb);
		}

		
		service.ListMeetingTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MeetingId",params,undefined,false); 
			
			copyArg(msg,"MeetingId",params,undefined,false); 
			

			svc.listMeetingTags(params,cb);
		}

		
		service.ListMeetings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listMeetings(params,cb);
		}

		
		service.ListPhoneNumberOrders=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listPhoneNumberOrders(params,cb);
		}

		
		service.ListPhoneNumbers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Status",params,undefined,false); 
			copyArg(msg,"ProductType",params,undefined,false); 
			copyArg(msg,"FilterName",params,undefined,false); 
			copyArg(msg,"FilterValue",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listPhoneNumbers(params,cb);
		}

		
		service.ListProxySessions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listProxySessions(params,cb);
		}

		
		service.ListRoomMemberships=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"RoomId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"RoomId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listRoomMemberships(params,cb);
		}

		
		service.ListRooms=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"MemberId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listRooms(params,cb);
		}

		
		service.ListSipMediaApplications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listSipMediaApplications(params,cb);
		}

		
		service.ListSipRules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SipMediaApplicationId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listSipRules(params,cb);
		}

		
		service.ListSupportedPhoneNumberCountries=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProductType",params,undefined,false); 
			
			copyArg(msg,"ProductType",params,undefined,false); 
			

			svc.listSupportedPhoneNumberCountries(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,true); 
			
			copyArg(msg,"ResourceARN",params,undefined,true); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListUsers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"UserEmail",params,undefined,true); 
			copyArg(msg,"UserType",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listUsers(params,cb);
		}

		
		service.ListVoiceConnectorGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listVoiceConnectorGroups(params,cb);
		}

		
		service.ListVoiceConnectorTerminationCredentials=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			

			svc.listVoiceConnectorTerminationCredentials(params,cb);
		}

		
		service.ListVoiceConnectors=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listVoiceConnectors(params,cb);
		}

		
		service.LogoutUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"UserId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"UserId",params,undefined,false); 
			

			svc.logoutUser(params,cb);
		}

		
		service.PutAppInstanceRetentionSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AppInstanceArn",params,undefined,false); 
			copyArg(n,"AppInstanceRetentionSettings",params,undefined,true); 
			
			copyArg(msg,"AppInstanceArn",params,undefined,false); 
			copyArg(msg,"AppInstanceRetentionSettings",params,undefined,true); 
			

			svc.putAppInstanceRetentionSettings(params,cb);
		}

		
		service.PutAppInstanceStreamingConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AppInstanceArn",params,undefined,false); 
			copyArg(n,"AppInstanceStreamingConfigurations",params,undefined,true); 
			
			copyArg(msg,"AppInstanceArn",params,undefined,false); 
			copyArg(msg,"AppInstanceStreamingConfigurations",params,undefined,true); 
			

			svc.putAppInstanceStreamingConfigurations(params,cb);
		}

		
		service.PutEventsConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"BotId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"BotId",params,undefined,false); 
			copyArg(msg,"OutboundEventsHTTPSEndpoint",params,undefined,true); 
			copyArg(msg,"LambdaFunctionArn",params,undefined,true); 
			

			svc.putEventsConfiguration(params,cb);
		}

		
		service.PutRetentionSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"RetentionSettings",params,undefined,true); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"RetentionSettings",params,undefined,true); 
			

			svc.putRetentionSettings(params,cb);
		}

		
		service.PutSipMediaApplicationLoggingConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SipMediaApplicationId",params,undefined,false); 
			
			copyArg(msg,"SipMediaApplicationId",params,undefined,false); 
			copyArg(msg,"SipMediaApplicationLoggingConfiguration",params,undefined,true); 
			

			svc.putSipMediaApplicationLoggingConfiguration(params,cb);
		}

		
		service.PutVoiceConnectorEmergencyCallingConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			copyArg(n,"EmergencyCallingConfiguration",params,undefined,true); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			copyArg(msg,"EmergencyCallingConfiguration",params,undefined,true); 
			

			svc.putVoiceConnectorEmergencyCallingConfiguration(params,cb);
		}

		
		service.PutVoiceConnectorLoggingConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			copyArg(n,"LoggingConfiguration",params,undefined,true); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			copyArg(msg,"LoggingConfiguration",params,undefined,true); 
			

			svc.putVoiceConnectorLoggingConfiguration(params,cb);
		}

		
		service.PutVoiceConnectorOrigination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			copyArg(n,"Origination",params,undefined,true); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			copyArg(msg,"Origination",params,undefined,true); 
			

			svc.putVoiceConnectorOrigination(params,cb);
		}

		
		service.PutVoiceConnectorProxy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DefaultSessionExpiryMinutes",params,undefined,false); 
			copyArg(n,"PhoneNumberPoolCountries",params,undefined,false); 
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			copyArg(msg,"DefaultSessionExpiryMinutes",params,undefined,false); 
			copyArg(msg,"PhoneNumberPoolCountries",params,undefined,false); 
			copyArg(msg,"FallBackPhoneNumber",params,undefined,true); 
			copyArg(msg,"Disabled",params,undefined,false); 
			

			svc.putVoiceConnectorProxy(params,cb);
		}

		
		service.PutVoiceConnectorStreamingConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			copyArg(n,"StreamingConfiguration",params,undefined,true); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			copyArg(msg,"StreamingConfiguration",params,undefined,true); 
			

			svc.putVoiceConnectorStreamingConfiguration(params,cb);
		}

		
		service.PutVoiceConnectorTermination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			copyArg(n,"Termination",params,undefined,true); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			copyArg(msg,"Termination",params,undefined,true); 
			

			svc.putVoiceConnectorTermination(params,cb);
		}

		
		service.PutVoiceConnectorTerminationCredentials=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			copyArg(msg,"Credentials",params,undefined,false); 
			

			svc.putVoiceConnectorTerminationCredentials(params,cb);
		}

		
		service.RedactChannelMessage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelArn",params,undefined,false); 
			copyArg(n,"MessageId",params,undefined,false); 
			
			copyArg(msg,"ChannelArn",params,undefined,false); 
			copyArg(msg,"MessageId",params,undefined,false); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.redactChannelMessage(params,cb);
		}

		
		service.RedactConversationMessage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"ConversationId",params,undefined,false); 
			copyArg(n,"MessageId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"ConversationId",params,undefined,false); 
			copyArg(msg,"MessageId",params,undefined,false); 
			

			svc.redactConversationMessage(params,cb);
		}

		
		service.RedactRoomMessage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"RoomId",params,undefined,false); 
			copyArg(n,"MessageId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"RoomId",params,undefined,false); 
			copyArg(msg,"MessageId",params,undefined,false); 
			

			svc.redactRoomMessage(params,cb);
		}

		
		service.RegenerateSecurityToken=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"BotId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"BotId",params,undefined,false); 
			

			svc.regenerateSecurityToken(params,cb);
		}

		
		service.ResetPersonalPIN=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"UserId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"UserId",params,undefined,false); 
			

			svc.resetPersonalPIN(params,cb);
		}

		
		service.RestorePhoneNumber=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PhoneNumberId",params,undefined,false); 
			
			copyArg(msg,"PhoneNumberId",params,undefined,false); 
			

			svc.restorePhoneNumber(params,cb);
		}

		
		service.SearchAvailablePhoneNumbers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AreaCode",params,undefined,false); 
			copyArg(msg,"City",params,undefined,false); 
			copyArg(msg,"Country",params,undefined,false); 
			copyArg(msg,"State",params,undefined,false); 
			copyArg(msg,"TollFreePrefix",params,undefined,false); 
			copyArg(msg,"PhoneNumberType",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.searchAvailablePhoneNumbers(params,cb);
		}

		
		service.SendChannelMessage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelArn",params,undefined,false); 
			copyArg(n,"Content",params,undefined,false); 
			copyArg(n,"Type",params,undefined,false); 
			copyArg(n,"Persistence",params,undefined,false); 
			copyArg(n,"ClientRequestToken",params,undefined,true); 
			
			copyArg(msg,"ChannelArn",params,undefined,false); 
			copyArg(msg,"Content",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"Persistence",params,undefined,false); 
			copyArg(msg,"Metadata",params,undefined,true); 
			copyArg(msg,"ClientRequestToken",params,undefined,true); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.sendChannelMessage(params,cb);
		}

		
		service.StartMeetingTranscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MeetingId",params,undefined,false); 
			copyArg(n,"TranscriptionConfiguration",params,undefined,false); 
			
			copyArg(msg,"MeetingId",params,undefined,false); 
			copyArg(msg,"TranscriptionConfiguration",params,undefined,false); 
			

			svc.startMeetingTranscription(params,cb);
		}

		
		service.StopMeetingTranscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MeetingId",params,undefined,false); 
			
			copyArg(msg,"MeetingId",params,undefined,false); 
			

			svc.stopMeetingTranscription(params,cb);
		}

		
		service.TagAttendee=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MeetingId",params,undefined,false); 
			copyArg(n,"AttendeeId",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"MeetingId",params,undefined,false); 
			copyArg(msg,"AttendeeId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagAttendee(params,cb);
		}

		
		service.TagMeeting=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MeetingId",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"MeetingId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagMeeting(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,true); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceARN",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagAttendee=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MeetingId",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			copyArg(n,"AttendeeId",params,undefined,false); 
			
			copyArg(msg,"MeetingId",params,undefined,false); 
			copyArg(msg,"AttendeeId",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagAttendee(params,cb);
		}

		
		service.UntagMeeting=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MeetingId",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"MeetingId",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagMeeting(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,true); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceARN",params,undefined,true); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"DefaultLicense",params,undefined,false); 
			

			svc.updateAccount(params,cb);
		}

		
		service.UpdateAccountSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"AccountSettings",params,undefined,true); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"AccountSettings",params,undefined,true); 
			

			svc.updateAccountSettings(params,cb);
		}

		
		service.UpdateAppInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AppInstanceArn",params,undefined,false); 
			copyArg(n,"Name",params,undefined,true); 
			
			copyArg(msg,"AppInstanceArn",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,true); 
			copyArg(msg,"Metadata",params,undefined,true); 
			

			svc.updateAppInstance(params,cb);
		}

		
		service.UpdateAppInstanceUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AppInstanceUserArn",params,undefined,false); 
			copyArg(n,"Name",params,undefined,true); 
			
			copyArg(msg,"AppInstanceUserArn",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,true); 
			copyArg(msg,"Metadata",params,undefined,true); 
			

			svc.updateAppInstanceUser(params,cb);
		}

		
		service.UpdateBot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"BotId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"BotId",params,undefined,false); 
			copyArg(msg,"Disabled",params,undefined,false); 
			

			svc.updateBot(params,cb);
		}

		
		service.UpdateChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelArn",params,undefined,false); 
			copyArg(n,"Name",params,undefined,true); 
			copyArg(n,"Mode",params,undefined,false); 
			
			copyArg(msg,"ChannelArn",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,true); 
			copyArg(msg,"Mode",params,undefined,false); 
			copyArg(msg,"Metadata",params,undefined,true); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.updateChannel(params,cb);
		}

		
		service.UpdateChannelMessage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelArn",params,undefined,false); 
			copyArg(n,"MessageId",params,undefined,false); 
			
			copyArg(msg,"ChannelArn",params,undefined,false); 
			copyArg(msg,"MessageId",params,undefined,false); 
			copyArg(msg,"Content",params,undefined,true); 
			copyArg(msg,"Metadata",params,undefined,true); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.updateChannelMessage(params,cb);
		}

		
		service.UpdateChannelReadMarker=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelArn",params,undefined,false); 
			
			copyArg(msg,"ChannelArn",params,undefined,false); 
			copyArg(msg,"ChimeBearer",params,undefined,false); 
			

			svc.updateChannelReadMarker(params,cb);
		}

		
		service.UpdateGlobalSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BusinessCalling",params,undefined,true); 
			copyArg(n,"VoiceConnector",params,undefined,true); 
			
			copyArg(msg,"BusinessCalling",params,undefined,true); 
			copyArg(msg,"VoiceConnector",params,undefined,true); 
			

			svc.updateGlobalSettings(params,cb);
		}

		
		service.UpdatePhoneNumber=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PhoneNumberId",params,undefined,false); 
			
			copyArg(msg,"PhoneNumberId",params,undefined,false); 
			copyArg(msg,"ProductType",params,undefined,false); 
			copyArg(msg,"CallingName",params,undefined,true); 
			

			svc.updatePhoneNumber(params,cb);
		}

		
		service.UpdatePhoneNumberSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CallingName",params,undefined,true); 
			
			copyArg(msg,"CallingName",params,undefined,true); 
			

			svc.updatePhoneNumberSettings(params,cb);
		}

		
		service.UpdateProxySession=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Capabilities",params,undefined,true); 
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			copyArg(n,"ProxySessionId",params,undefined,false); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			copyArg(msg,"ProxySessionId",params,undefined,false); 
			copyArg(msg,"Capabilities",params,undefined,true); 
			copyArg(msg,"ExpiryMinutes",params,undefined,false); 
			

			svc.updateProxySession(params,cb);
		}

		
		service.UpdateRoom=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"RoomId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"RoomId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,true); 
			

			svc.updateRoom(params,cb);
		}

		
		service.UpdateRoomMembership=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"RoomId",params,undefined,false); 
			copyArg(n,"MemberId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"RoomId",params,undefined,false); 
			copyArg(msg,"MemberId",params,undefined,false); 
			copyArg(msg,"Role",params,undefined,false); 
			

			svc.updateRoomMembership(params,cb);
		}

		
		service.UpdateSipMediaApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SipMediaApplicationId",params,undefined,false); 
			
			copyArg(msg,"SipMediaApplicationId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Endpoints",params,undefined,true); 
			

			svc.updateSipMediaApplication(params,cb);
		}

		
		service.UpdateSipMediaApplicationCall=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SipMediaApplicationId",params,undefined,false); 
			copyArg(n,"TransactionId",params,undefined,false); 
			copyArg(n,"Arguments",params,undefined,false); 
			
			copyArg(msg,"SipMediaApplicationId",params,undefined,false); 
			copyArg(msg,"TransactionId",params,undefined,false); 
			copyArg(msg,"Arguments",params,undefined,false); 
			

			svc.updateSipMediaApplicationCall(params,cb);
		}

		
		service.UpdateSipRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SipRuleId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"SipRuleId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Disabled",params,undefined,false); 
			copyArg(msg,"TargetApplications",params,undefined,true); 
			

			svc.updateSipRule(params,cb);
		}

		
		service.UpdateUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"UserId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"UserId",params,undefined,false); 
			copyArg(msg,"LicenseType",params,undefined,false); 
			copyArg(msg,"UserType",params,undefined,false); 
			copyArg(msg,"AlexaForBusinessMetadata",params,undefined,true); 
			

			svc.updateUser(params,cb);
		}

		
		service.UpdateUserSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"UserId",params,undefined,false); 
			copyArg(n,"UserSettings",params,undefined,true); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"UserId",params,undefined,false); 
			copyArg(msg,"UserSettings",params,undefined,true); 
			

			svc.updateUserSettings(params,cb);
		}

		
		service.UpdateVoiceConnector=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"RequireEncryption",params,undefined,false); 
			
			copyArg(msg,"VoiceConnectorId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"RequireEncryption",params,undefined,false); 
			

			svc.updateVoiceConnector(params,cb);
		}

		
		service.UpdateVoiceConnectorGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VoiceConnectorGroupId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"VoiceConnectorItems",params,undefined,true); 
			
			copyArg(msg,"VoiceConnectorGroupId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"VoiceConnectorItems",params,undefined,true); 
			

			svc.updateVoiceConnectorGroup(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Chime", AmazonAPINode);

};
