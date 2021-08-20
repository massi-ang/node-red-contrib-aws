
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

		var awsService = new AWS.MediaLive( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.MediaLive(msg.AWSConfig) : awsService;

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

		
		service.AcceptInputDeviceTransfer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InputDeviceId",params,undefined,false); 
			
			copyArg(msg,"InputDeviceId",params,undefined,false); 
			

			svc.acceptInputDeviceTransfer(params,cb);
		}

		
		service.BatchDelete=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ChannelIds",params,undefined,true); 
			copyArg(msg,"InputIds",params,undefined,true); 
			copyArg(msg,"InputSecurityGroupIds",params,undefined,true); 
			copyArg(msg,"MultiplexIds",params,undefined,true); 
			

			svc.batchDelete(params,cb);
		}

		
		service.BatchStart=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ChannelIds",params,undefined,true); 
			copyArg(msg,"MultiplexIds",params,undefined,true); 
			

			svc.batchStart(params,cb);
		}

		
		service.BatchStop=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ChannelIds",params,undefined,true); 
			copyArg(msg,"MultiplexIds",params,undefined,true); 
			

			svc.batchStop(params,cb);
		}

		
		service.BatchUpdateSchedule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelId",params,undefined,false); 
			
			copyArg(msg,"ChannelId",params,undefined,false); 
			copyArg(msg,"Creates",params,undefined,false); 
			copyArg(msg,"Deletes",params,undefined,false); 
			

			svc.batchUpdateSchedule(params,cb);
		}

		
		service.CancelInputDeviceTransfer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InputDeviceId",params,undefined,false); 
			
			copyArg(msg,"InputDeviceId",params,undefined,false); 
			

			svc.cancelInputDeviceTransfer(params,cb);
		}

		
		service.CreateChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CdiInputSpecification",params,undefined,true); 
			copyArg(msg,"ChannelClass",params,undefined,false); 
			copyArg(msg,"Destinations",params,undefined,true); 
			copyArg(msg,"EncoderSettings",params,undefined,true); 
			copyArg(msg,"InputAttachments",params,undefined,true); 
			copyArg(msg,"InputSpecification",params,undefined,true); 
			copyArg(msg,"LogLevel",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"RequestId",params,undefined,false); 
			copyArg(msg,"Reserved",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"Vpc",params,undefined,false); 
			

			svc.createChannel(params,cb);
		}

		
		service.CreateInput=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Destinations",params,undefined,true); 
			copyArg(msg,"InputDevices",params,undefined,true); 
			copyArg(msg,"InputSecurityGroups",params,undefined,true); 
			copyArg(msg,"MediaConnectFlows",params,undefined,true); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"RequestId",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"Sources",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"Vpc",params,undefined,false); 
			

			svc.createInput(params,cb);
		}

		
		service.CreateInputSecurityGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"WhitelistRules",params,undefined,true); 
			

			svc.createInputSecurityGroup(params,cb);
		}

		
		service.CreateMultiplex=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RequestId",params,undefined,false); 
			copyArg(n,"MultiplexSettings",params,undefined,true); 
			copyArg(n,"AvailabilityZones",params,undefined,true); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"AvailabilityZones",params,undefined,true); 
			copyArg(msg,"MultiplexSettings",params,undefined,true); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"RequestId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createMultiplex(params,cb);
		}

		
		service.CreateMultiplexProgram=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MultiplexId",params,undefined,false); 
			copyArg(n,"RequestId",params,undefined,false); 
			copyArg(n,"MultiplexProgramSettings",params,undefined,true); 
			copyArg(n,"ProgramName",params,undefined,false); 
			
			copyArg(msg,"MultiplexId",params,undefined,false); 
			copyArg(msg,"MultiplexProgramSettings",params,undefined,true); 
			copyArg(msg,"ProgramName",params,undefined,false); 
			copyArg(msg,"RequestId",params,undefined,false); 
			

			svc.createMultiplexProgram(params,cb);
		}

		
		service.CreatePartnerInput=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InputId",params,undefined,false); 
			
			copyArg(msg,"InputId",params,undefined,false); 
			copyArg(msg,"RequestId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createPartnerInput(params,cb);
		}

		
		service.CreateTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createTags(params,cb);
		}

		
		service.DeleteChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelId",params,undefined,false); 
			
			copyArg(msg,"ChannelId",params,undefined,false); 
			

			svc.deleteChannel(params,cb);
		}

		
		service.DeleteInput=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InputId",params,undefined,false); 
			
			copyArg(msg,"InputId",params,undefined,false); 
			

			svc.deleteInput(params,cb);
		}

		
		service.DeleteInputSecurityGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InputSecurityGroupId",params,undefined,false); 
			
			copyArg(msg,"InputSecurityGroupId",params,undefined,false); 
			

			svc.deleteInputSecurityGroup(params,cb);
		}

		
		service.DeleteMultiplex=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MultiplexId",params,undefined,false); 
			
			copyArg(msg,"MultiplexId",params,undefined,false); 
			

			svc.deleteMultiplex(params,cb);
		}

		
		service.DeleteMultiplexProgram=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MultiplexId",params,undefined,false); 
			copyArg(n,"ProgramName",params,undefined,false); 
			
			copyArg(msg,"MultiplexId",params,undefined,false); 
			copyArg(msg,"ProgramName",params,undefined,false); 
			

			svc.deleteMultiplexProgram(params,cb);
		}

		
		service.DeleteReservation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReservationId",params,undefined,false); 
			
			copyArg(msg,"ReservationId",params,undefined,false); 
			

			svc.deleteReservation(params,cb);
		}

		
		service.DeleteSchedule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelId",params,undefined,false); 
			
			copyArg(msg,"ChannelId",params,undefined,false); 
			

			svc.deleteSchedule(params,cb);
		}

		
		service.DeleteTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TagKeys",params,undefined,true); 
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			

			svc.deleteTags(params,cb);
		}

		
		service.DescribeChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelId",params,undefined,false); 
			
			copyArg(msg,"ChannelId",params,undefined,false); 
			

			svc.describeChannel(params,cb);
		}

		
		service.DescribeInput=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InputId",params,undefined,false); 
			
			copyArg(msg,"InputId",params,undefined,false); 
			

			svc.describeInput(params,cb);
		}

		
		service.DescribeInputDevice=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InputDeviceId",params,undefined,false); 
			
			copyArg(msg,"InputDeviceId",params,undefined,false); 
			

			svc.describeInputDevice(params,cb);
		}

		
		service.DescribeInputDeviceThumbnail=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InputDeviceId",params,undefined,false); 
			copyArg(n,"Accept",params,undefined,false); 
			
			copyArg(msg,"InputDeviceId",params,undefined,false); 
			copyArg(msg,"Accept",params,undefined,false); 
			

			svc.describeInputDeviceThumbnail(params,cb);
		}

		
		service.DescribeInputSecurityGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InputSecurityGroupId",params,undefined,false); 
			
			copyArg(msg,"InputSecurityGroupId",params,undefined,false); 
			

			svc.describeInputSecurityGroup(params,cb);
		}

		
		service.DescribeMultiplex=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MultiplexId",params,undefined,false); 
			
			copyArg(msg,"MultiplexId",params,undefined,false); 
			

			svc.describeMultiplex(params,cb);
		}

		
		service.DescribeMultiplexProgram=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MultiplexId",params,undefined,false); 
			copyArg(n,"ProgramName",params,undefined,false); 
			
			copyArg(msg,"MultiplexId",params,undefined,false); 
			copyArg(msg,"ProgramName",params,undefined,false); 
			

			svc.describeMultiplexProgram(params,cb);
		}

		
		service.DescribeOffering=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OfferingId",params,undefined,false); 
			
			copyArg(msg,"OfferingId",params,undefined,false); 
			

			svc.describeOffering(params,cb);
		}

		
		service.DescribeReservation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReservationId",params,undefined,false); 
			
			copyArg(msg,"ReservationId",params,undefined,false); 
			

			svc.describeReservation(params,cb);
		}

		
		service.DescribeSchedule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelId",params,undefined,false); 
			
			copyArg(msg,"ChannelId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeSchedule(params,cb);
		}

		
		service.ListChannels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listChannels(params,cb);
		}

		
		service.ListInputDeviceTransfers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TransferType",params,undefined,false); 
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"TransferType",params,undefined,false); 
			

			svc.listInputDeviceTransfers(params,cb);
		}

		
		service.ListInputDevices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listInputDevices(params,cb);
		}

		
		service.ListInputSecurityGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listInputSecurityGroups(params,cb);
		}

		
		service.ListInputs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listInputs(params,cb);
		}

		
		service.ListMultiplexPrograms=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MultiplexId",params,undefined,false); 
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"MultiplexId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listMultiplexPrograms(params,cb);
		}

		
		service.ListMultiplexes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listMultiplexes(params,cb);
		}

		
		service.ListOfferings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ChannelClass",params,undefined,false); 
			copyArg(msg,"ChannelConfiguration",params,undefined,false); 
			copyArg(msg,"Codec",params,undefined,false); 
			copyArg(msg,"Duration",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"MaximumBitrate",params,undefined,false); 
			copyArg(msg,"MaximumFramerate",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Resolution",params,undefined,false); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			copyArg(msg,"SpecialFeature",params,undefined,false); 
			copyArg(msg,"VideoQuality",params,undefined,false); 
			

			svc.listOfferings(params,cb);
		}

		
		service.ListReservations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ChannelClass",params,undefined,false); 
			copyArg(msg,"Codec",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"MaximumBitrate",params,undefined,false); 
			copyArg(msg,"MaximumFramerate",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Resolution",params,undefined,false); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			copyArg(msg,"SpecialFeature",params,undefined,false); 
			copyArg(msg,"VideoQuality",params,undefined,false); 
			

			svc.listReservations(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PurchaseOffering=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OfferingId",params,undefined,false); 
			copyArg(n,"Count",params,undefined,false); 
			
			copyArg(msg,"Count",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"OfferingId",params,undefined,false); 
			copyArg(msg,"RequestId",params,undefined,false); 
			copyArg(msg,"Start",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.purchaseOffering(params,cb);
		}

		
		service.RejectInputDeviceTransfer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InputDeviceId",params,undefined,false); 
			
			copyArg(msg,"InputDeviceId",params,undefined,false); 
			

			svc.rejectInputDeviceTransfer(params,cb);
		}

		
		service.StartChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelId",params,undefined,false); 
			
			copyArg(msg,"ChannelId",params,undefined,false); 
			

			svc.startChannel(params,cb);
		}

		
		service.StartMultiplex=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MultiplexId",params,undefined,false); 
			
			copyArg(msg,"MultiplexId",params,undefined,false); 
			

			svc.startMultiplex(params,cb);
		}

		
		service.StopChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelId",params,undefined,false); 
			
			copyArg(msg,"ChannelId",params,undefined,false); 
			

			svc.stopChannel(params,cb);
		}

		
		service.StopMultiplex=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MultiplexId",params,undefined,false); 
			
			copyArg(msg,"MultiplexId",params,undefined,false); 
			

			svc.stopMultiplex(params,cb);
		}

		
		service.TransferInputDevice=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InputDeviceId",params,undefined,false); 
			
			copyArg(msg,"InputDeviceId",params,undefined,false); 
			copyArg(msg,"TargetCustomerId",params,undefined,false); 
			copyArg(msg,"TargetRegion",params,undefined,false); 
			copyArg(msg,"TransferMessage",params,undefined,false); 
			

			svc.transferInputDevice(params,cb);
		}

		
		service.UpdateChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelId",params,undefined,false); 
			
			copyArg(msg,"CdiInputSpecification",params,undefined,true); 
			copyArg(msg,"ChannelId",params,undefined,false); 
			copyArg(msg,"Destinations",params,undefined,true); 
			copyArg(msg,"EncoderSettings",params,undefined,true); 
			copyArg(msg,"InputAttachments",params,undefined,true); 
			copyArg(msg,"InputSpecification",params,undefined,true); 
			copyArg(msg,"LogLevel",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			

			svc.updateChannel(params,cb);
		}

		
		service.UpdateChannelClass=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelId",params,undefined,false); 
			copyArg(n,"ChannelClass",params,undefined,false); 
			
			copyArg(msg,"ChannelClass",params,undefined,false); 
			copyArg(msg,"ChannelId",params,undefined,false); 
			copyArg(msg,"Destinations",params,undefined,true); 
			

			svc.updateChannelClass(params,cb);
		}

		
		service.UpdateInput=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InputId",params,undefined,false); 
			
			copyArg(msg,"Destinations",params,undefined,true); 
			copyArg(msg,"InputDevices",params,undefined,false); 
			copyArg(msg,"InputId",params,undefined,false); 
			copyArg(msg,"InputSecurityGroups",params,undefined,true); 
			copyArg(msg,"MediaConnectFlows",params,undefined,true); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"Sources",params,undefined,true); 
			

			svc.updateInput(params,cb);
		}

		
		service.UpdateInputDevice=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InputDeviceId",params,undefined,false); 
			
			copyArg(msg,"HdDeviceSettings",params,undefined,true); 
			copyArg(msg,"InputDeviceId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"UhdDeviceSettings",params,undefined,true); 
			

			svc.updateInputDevice(params,cb);
		}

		
		service.UpdateInputSecurityGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InputSecurityGroupId",params,undefined,false); 
			
			copyArg(msg,"InputSecurityGroupId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"WhitelistRules",params,undefined,true); 
			

			svc.updateInputSecurityGroup(params,cb);
		}

		
		service.UpdateMultiplex=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MultiplexId",params,undefined,false); 
			
			copyArg(msg,"MultiplexId",params,undefined,false); 
			copyArg(msg,"MultiplexSettings",params,undefined,true); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.updateMultiplex(params,cb);
		}

		
		service.UpdateMultiplexProgram=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MultiplexId",params,undefined,false); 
			copyArg(n,"ProgramName",params,undefined,false); 
			
			copyArg(msg,"MultiplexId",params,undefined,false); 
			copyArg(msg,"MultiplexProgramSettings",params,undefined,true); 
			copyArg(msg,"ProgramName",params,undefined,false); 
			

			svc.updateMultiplexProgram(params,cb);
		}

		
		service.UpdateReservation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReservationId",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ReservationId",params,undefined,false); 
			

			svc.updateReservation(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS MediaLive", AmazonAPINode);

};
