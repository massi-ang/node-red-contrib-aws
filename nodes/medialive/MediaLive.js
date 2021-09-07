
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

		var awsService = new AWS.MediaLive( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.MediaLive(msg.AWSConfig) : awsService;

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

		
		service.AcceptInputDeviceTransfer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InputDeviceId",params,undefined,false); 
			
			copyArgs(n,"InputDeviceId",params,undefined,false); 
			
			copyArgs(msg,"InputDeviceId",params,undefined,false); 
			

			svc.acceptInputDeviceTransfer(params,cb);
		}

		
		service.BatchDelete=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ChannelIds",params,undefined,true); 
			copyArgs(n,"InputIds",params,undefined,true); 
			copyArgs(n,"InputSecurityGroupIds",params,undefined,true); 
			copyArgs(n,"MultiplexIds",params,undefined,true); 
			
			copyArgs(msg,"ChannelIds",params,undefined,true); 
			copyArgs(msg,"InputIds",params,undefined,true); 
			copyArgs(msg,"InputSecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"MultiplexIds",params,undefined,true); 
			

			svc.batchDelete(params,cb);
		}

		
		service.BatchStart=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ChannelIds",params,undefined,true); 
			copyArgs(n,"MultiplexIds",params,undefined,true); 
			
			copyArgs(msg,"ChannelIds",params,undefined,true); 
			copyArgs(msg,"MultiplexIds",params,undefined,true); 
			

			svc.batchStart(params,cb);
		}

		
		service.BatchStop=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ChannelIds",params,undefined,true); 
			copyArgs(n,"MultiplexIds",params,undefined,true); 
			
			copyArgs(msg,"ChannelIds",params,undefined,true); 
			copyArgs(msg,"MultiplexIds",params,undefined,true); 
			

			svc.batchStop(params,cb);
		}

		
		service.BatchUpdateSchedule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelId",params,undefined,false); 
			
			copyArgs(n,"ChannelId",params,undefined,false); 
			copyArgs(n,"Creates",params,undefined,false); 
			copyArgs(n,"Deletes",params,undefined,false); 
			
			copyArgs(msg,"ChannelId",params,undefined,false); 
			copyArgs(msg,"Creates",params,undefined,false); 
			copyArgs(msg,"Deletes",params,undefined,false); 
			

			svc.batchUpdateSchedule(params,cb);
		}

		
		service.CancelInputDeviceTransfer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InputDeviceId",params,undefined,false); 
			
			copyArgs(n,"InputDeviceId",params,undefined,false); 
			
			copyArgs(msg,"InputDeviceId",params,undefined,false); 
			

			svc.cancelInputDeviceTransfer(params,cb);
		}

		
		service.CreateChannel=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CdiInputSpecification",params,undefined,true); 
			copyArgs(n,"ChannelClass",params,undefined,false); 
			copyArgs(n,"Destinations",params,undefined,true); 
			copyArgs(n,"EncoderSettings",params,undefined,true); 
			copyArgs(n,"InputAttachments",params,undefined,true); 
			copyArgs(n,"InputSpecification",params,undefined,true); 
			copyArgs(n,"LogLevel",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RequestId",params,undefined,false); 
			copyArgs(n,"Reserved",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"Vpc",params,undefined,false); 
			
			copyArgs(msg,"CdiInputSpecification",params,undefined,true); 
			copyArgs(msg,"ChannelClass",params,undefined,false); 
			copyArgs(msg,"Destinations",params,undefined,true); 
			copyArgs(msg,"EncoderSettings",params,undefined,true); 
			copyArgs(msg,"InputAttachments",params,undefined,true); 
			copyArgs(msg,"InputSpecification",params,undefined,true); 
			copyArgs(msg,"LogLevel",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"RequestId",params,undefined,false); 
			copyArgs(msg,"Reserved",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"Vpc",params,undefined,false); 
			

			svc.createChannel(params,cb);
		}

		
		service.CreateInput=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Destinations",params,undefined,true); 
			copyArgs(n,"InputDevices",params,undefined,true); 
			copyArgs(n,"InputSecurityGroups",params,undefined,true); 
			copyArgs(n,"MediaConnectFlows",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RequestId",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"Sources",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Vpc",params,undefined,false); 
			
			copyArgs(msg,"Destinations",params,undefined,true); 
			copyArgs(msg,"InputDevices",params,undefined,true); 
			copyArgs(msg,"InputSecurityGroups",params,undefined,true); 
			copyArgs(msg,"MediaConnectFlows",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"RequestId",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"Sources",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"Vpc",params,undefined,false); 
			

			svc.createInput(params,cb);
		}

		
		service.CreateInputSecurityGroup=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"WhitelistRules",params,undefined,true); 
			
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"WhitelistRules",params,undefined,true); 
			

			svc.createInputSecurityGroup(params,cb);
		}

		
		service.CreateMultiplex=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RequestId",params,undefined,false); 
			copyArgs(n,"MultiplexSettings",params,undefined,true); 
			copyArgs(n,"AvailabilityZones",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"AvailabilityZones",params,undefined,true); 
			copyArgs(n,"MultiplexSettings",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RequestId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"AvailabilityZones",params,undefined,true); 
			copyArgs(msg,"MultiplexSettings",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"RequestId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createMultiplex(params,cb);
		}

		
		service.CreateMultiplexProgram=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MultiplexId",params,undefined,false); 
			copyArgs(n,"RequestId",params,undefined,false); 
			copyArgs(n,"MultiplexProgramSettings",params,undefined,true); 
			copyArgs(n,"ProgramName",params,undefined,false); 
			
			copyArgs(n,"MultiplexId",params,undefined,false); 
			copyArgs(n,"MultiplexProgramSettings",params,undefined,true); 
			copyArgs(n,"ProgramName",params,undefined,false); 
			copyArgs(n,"RequestId",params,undefined,false); 
			
			copyArgs(msg,"MultiplexId",params,undefined,false); 
			copyArgs(msg,"MultiplexProgramSettings",params,undefined,true); 
			copyArgs(msg,"ProgramName",params,undefined,false); 
			copyArgs(msg,"RequestId",params,undefined,false); 
			

			svc.createMultiplexProgram(params,cb);
		}

		
		service.CreatePartnerInput=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InputId",params,undefined,false); 
			
			copyArgs(n,"InputId",params,undefined,false); 
			copyArgs(n,"RequestId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"InputId",params,undefined,false); 
			copyArgs(msg,"RequestId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createPartnerInput(params,cb);
		}

		
		service.CreateTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createTags(params,cb);
		}

		
		service.DeleteChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelId",params,undefined,false); 
			
			copyArgs(n,"ChannelId",params,undefined,false); 
			
			copyArgs(msg,"ChannelId",params,undefined,false); 
			

			svc.deleteChannel(params,cb);
		}

		
		service.DeleteInput=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InputId",params,undefined,false); 
			
			copyArgs(n,"InputId",params,undefined,false); 
			
			copyArgs(msg,"InputId",params,undefined,false); 
			

			svc.deleteInput(params,cb);
		}

		
		service.DeleteInputSecurityGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InputSecurityGroupId",params,undefined,false); 
			
			copyArgs(n,"InputSecurityGroupId",params,undefined,false); 
			
			copyArgs(msg,"InputSecurityGroupId",params,undefined,false); 
			

			svc.deleteInputSecurityGroup(params,cb);
		}

		
		service.DeleteMultiplex=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MultiplexId",params,undefined,false); 
			
			copyArgs(n,"MultiplexId",params,undefined,false); 
			
			copyArgs(msg,"MultiplexId",params,undefined,false); 
			

			svc.deleteMultiplex(params,cb);
		}

		
		service.DeleteMultiplexProgram=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MultiplexId",params,undefined,false); 
			copyArgs(n,"ProgramName",params,undefined,false); 
			
			copyArgs(n,"MultiplexId",params,undefined,false); 
			copyArgs(n,"ProgramName",params,undefined,false); 
			
			copyArgs(msg,"MultiplexId",params,undefined,false); 
			copyArgs(msg,"ProgramName",params,undefined,false); 
			

			svc.deleteMultiplexProgram(params,cb);
		}

		
		service.DeleteReservation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReservationId",params,undefined,false); 
			
			copyArgs(n,"ReservationId",params,undefined,false); 
			
			copyArgs(msg,"ReservationId",params,undefined,false); 
			

			svc.deleteReservation(params,cb);
		}

		
		service.DeleteSchedule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelId",params,undefined,false); 
			
			copyArgs(n,"ChannelId",params,undefined,false); 
			
			copyArgs(msg,"ChannelId",params,undefined,false); 
			

			svc.deleteSchedule(params,cb);
		}

		
		service.DeleteTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TagKeys",params,undefined,true); 
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			

			svc.deleteTags(params,cb);
		}

		
		service.DescribeChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelId",params,undefined,false); 
			
			copyArgs(n,"ChannelId",params,undefined,false); 
			
			copyArgs(msg,"ChannelId",params,undefined,false); 
			

			svc.describeChannel(params,cb);
		}

		
		service.DescribeInput=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InputId",params,undefined,false); 
			
			copyArgs(n,"InputId",params,undefined,false); 
			
			copyArgs(msg,"InputId",params,undefined,false); 
			

			svc.describeInput(params,cb);
		}

		
		service.DescribeInputDevice=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InputDeviceId",params,undefined,false); 
			
			copyArgs(n,"InputDeviceId",params,undefined,false); 
			
			copyArgs(msg,"InputDeviceId",params,undefined,false); 
			

			svc.describeInputDevice(params,cb);
		}

		
		service.DescribeInputDeviceThumbnail=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InputDeviceId",params,undefined,false); 
			copyArgs(n,"Accept",params,undefined,false); 
			
			copyArgs(n,"InputDeviceId",params,undefined,false); 
			copyArgs(n,"Accept",params,undefined,false); 
			
			copyArgs(msg,"InputDeviceId",params,undefined,false); 
			copyArgs(msg,"Accept",params,undefined,false); 
			

			svc.describeInputDeviceThumbnail(params,cb);
		}

		
		service.DescribeInputSecurityGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InputSecurityGroupId",params,undefined,false); 
			
			copyArgs(n,"InputSecurityGroupId",params,undefined,false); 
			
			copyArgs(msg,"InputSecurityGroupId",params,undefined,false); 
			

			svc.describeInputSecurityGroup(params,cb);
		}

		
		service.DescribeMultiplex=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MultiplexId",params,undefined,false); 
			
			copyArgs(n,"MultiplexId",params,undefined,false); 
			
			copyArgs(msg,"MultiplexId",params,undefined,false); 
			

			svc.describeMultiplex(params,cb);
		}

		
		service.DescribeMultiplexProgram=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MultiplexId",params,undefined,false); 
			copyArgs(n,"ProgramName",params,undefined,false); 
			
			copyArgs(n,"MultiplexId",params,undefined,false); 
			copyArgs(n,"ProgramName",params,undefined,false); 
			
			copyArgs(msg,"MultiplexId",params,undefined,false); 
			copyArgs(msg,"ProgramName",params,undefined,false); 
			

			svc.describeMultiplexProgram(params,cb);
		}

		
		service.DescribeOffering=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OfferingId",params,undefined,false); 
			
			copyArgs(n,"OfferingId",params,undefined,false); 
			
			copyArgs(msg,"OfferingId",params,undefined,false); 
			

			svc.describeOffering(params,cb);
		}

		
		service.DescribeReservation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReservationId",params,undefined,false); 
			
			copyArgs(n,"ReservationId",params,undefined,false); 
			
			copyArgs(msg,"ReservationId",params,undefined,false); 
			

			svc.describeReservation(params,cb);
		}

		
		service.DescribeSchedule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelId",params,undefined,false); 
			
			copyArgs(n,"ChannelId",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ChannelId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeSchedule(params,cb);
		}

		
		service.ListChannels=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listChannels(params,cb);
		}

		
		service.ListInputDeviceTransfers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransferType",params,undefined,false); 
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"TransferType",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"TransferType",params,undefined,false); 
			

			svc.listInputDeviceTransfers(params,cb);
		}

		
		service.ListInputDevices=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listInputDevices(params,cb);
		}

		
		service.ListInputSecurityGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listInputSecurityGroups(params,cb);
		}

		
		service.ListInputs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listInputs(params,cb);
		}

		
		service.ListMultiplexPrograms=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MultiplexId",params,undefined,false); 
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"MultiplexId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"MultiplexId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listMultiplexPrograms(params,cb);
		}

		
		service.ListMultiplexes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listMultiplexes(params,cb);
		}

		
		service.ListOfferings=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ChannelClass",params,undefined,false); 
			copyArgs(n,"ChannelConfiguration",params,undefined,false); 
			copyArgs(n,"Codec",params,undefined,false); 
			copyArgs(n,"Duration",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"MaximumBitrate",params,undefined,false); 
			copyArgs(n,"MaximumFramerate",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Resolution",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"SpecialFeature",params,undefined,false); 
			copyArgs(n,"VideoQuality",params,undefined,false); 
			
			copyArgs(msg,"ChannelClass",params,undefined,false); 
			copyArgs(msg,"ChannelConfiguration",params,undefined,false); 
			copyArgs(msg,"Codec",params,undefined,false); 
			copyArgs(msg,"Duration",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"MaximumBitrate",params,undefined,false); 
			copyArgs(msg,"MaximumFramerate",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Resolution",params,undefined,false); 
			copyArgs(msg,"ResourceType",params,undefined,false); 
			copyArgs(msg,"SpecialFeature",params,undefined,false); 
			copyArgs(msg,"VideoQuality",params,undefined,false); 
			

			svc.listOfferings(params,cb);
		}

		
		service.ListReservations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ChannelClass",params,undefined,false); 
			copyArgs(n,"Codec",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"MaximumBitrate",params,undefined,false); 
			copyArgs(n,"MaximumFramerate",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Resolution",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"SpecialFeature",params,undefined,false); 
			copyArgs(n,"VideoQuality",params,undefined,false); 
			
			copyArgs(msg,"ChannelClass",params,undefined,false); 
			copyArgs(msg,"Codec",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"MaximumBitrate",params,undefined,false); 
			copyArgs(msg,"MaximumFramerate",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Resolution",params,undefined,false); 
			copyArgs(msg,"ResourceType",params,undefined,false); 
			copyArgs(msg,"SpecialFeature",params,undefined,false); 
			copyArgs(msg,"VideoQuality",params,undefined,false); 
			

			svc.listReservations(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PurchaseOffering=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OfferingId",params,undefined,false); 
			copyArgs(n,"Count",params,undefined,false); 
			
			copyArgs(n,"Count",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"OfferingId",params,undefined,false); 
			copyArgs(n,"RequestId",params,undefined,false); 
			copyArgs(n,"Start",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Count",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"OfferingId",params,undefined,false); 
			copyArgs(msg,"RequestId",params,undefined,false); 
			copyArgs(msg,"Start",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.purchaseOffering(params,cb);
		}

		
		service.RejectInputDeviceTransfer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InputDeviceId",params,undefined,false); 
			
			copyArgs(n,"InputDeviceId",params,undefined,false); 
			
			copyArgs(msg,"InputDeviceId",params,undefined,false); 
			

			svc.rejectInputDeviceTransfer(params,cb);
		}

		
		service.StartChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelId",params,undefined,false); 
			
			copyArgs(n,"ChannelId",params,undefined,false); 
			
			copyArgs(msg,"ChannelId",params,undefined,false); 
			

			svc.startChannel(params,cb);
		}

		
		service.StartMultiplex=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MultiplexId",params,undefined,false); 
			
			copyArgs(n,"MultiplexId",params,undefined,false); 
			
			copyArgs(msg,"MultiplexId",params,undefined,false); 
			

			svc.startMultiplex(params,cb);
		}

		
		service.StopChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelId",params,undefined,false); 
			
			copyArgs(n,"ChannelId",params,undefined,false); 
			
			copyArgs(msg,"ChannelId",params,undefined,false); 
			

			svc.stopChannel(params,cb);
		}

		
		service.StopMultiplex=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MultiplexId",params,undefined,false); 
			
			copyArgs(n,"MultiplexId",params,undefined,false); 
			
			copyArgs(msg,"MultiplexId",params,undefined,false); 
			

			svc.stopMultiplex(params,cb);
		}

		
		service.TransferInputDevice=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InputDeviceId",params,undefined,false); 
			
			copyArgs(n,"InputDeviceId",params,undefined,false); 
			copyArgs(n,"TargetCustomerId",params,undefined,false); 
			copyArgs(n,"TargetRegion",params,undefined,false); 
			copyArgs(n,"TransferMessage",params,undefined,false); 
			
			copyArgs(msg,"InputDeviceId",params,undefined,false); 
			copyArgs(msg,"TargetCustomerId",params,undefined,false); 
			copyArgs(msg,"TargetRegion",params,undefined,false); 
			copyArgs(msg,"TransferMessage",params,undefined,false); 
			

			svc.transferInputDevice(params,cb);
		}

		
		service.UpdateChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelId",params,undefined,false); 
			
			copyArgs(n,"CdiInputSpecification",params,undefined,true); 
			copyArgs(n,"ChannelId",params,undefined,false); 
			copyArgs(n,"Destinations",params,undefined,true); 
			copyArgs(n,"EncoderSettings",params,undefined,true); 
			copyArgs(n,"InputAttachments",params,undefined,true); 
			copyArgs(n,"InputSpecification",params,undefined,true); 
			copyArgs(n,"LogLevel",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(msg,"CdiInputSpecification",params,undefined,true); 
			copyArgs(msg,"ChannelId",params,undefined,false); 
			copyArgs(msg,"Destinations",params,undefined,true); 
			copyArgs(msg,"EncoderSettings",params,undefined,true); 
			copyArgs(msg,"InputAttachments",params,undefined,true); 
			copyArgs(msg,"InputSpecification",params,undefined,true); 
			copyArgs(msg,"LogLevel",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			

			svc.updateChannel(params,cb);
		}

		
		service.UpdateChannelClass=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelId",params,undefined,false); 
			copyArgs(n,"ChannelClass",params,undefined,false); 
			
			copyArgs(n,"ChannelClass",params,undefined,false); 
			copyArgs(n,"ChannelId",params,undefined,false); 
			copyArgs(n,"Destinations",params,undefined,true); 
			
			copyArgs(msg,"ChannelClass",params,undefined,false); 
			copyArgs(msg,"ChannelId",params,undefined,false); 
			copyArgs(msg,"Destinations",params,undefined,true); 
			

			svc.updateChannelClass(params,cb);
		}

		
		service.UpdateInput=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InputId",params,undefined,false); 
			
			copyArgs(n,"Destinations",params,undefined,true); 
			copyArgs(n,"InputDevices",params,undefined,false); 
			copyArgs(n,"InputId",params,undefined,false); 
			copyArgs(n,"InputSecurityGroups",params,undefined,true); 
			copyArgs(n,"MediaConnectFlows",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"Sources",params,undefined,true); 
			
			copyArgs(msg,"Destinations",params,undefined,true); 
			copyArgs(msg,"InputDevices",params,undefined,false); 
			copyArgs(msg,"InputId",params,undefined,false); 
			copyArgs(msg,"InputSecurityGroups",params,undefined,true); 
			copyArgs(msg,"MediaConnectFlows",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"Sources",params,undefined,true); 
			

			svc.updateInput(params,cb);
		}

		
		service.UpdateInputDevice=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InputDeviceId",params,undefined,false); 
			
			copyArgs(n,"HdDeviceSettings",params,undefined,true); 
			copyArgs(n,"InputDeviceId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"UhdDeviceSettings",params,undefined,true); 
			
			copyArgs(msg,"HdDeviceSettings",params,undefined,true); 
			copyArgs(msg,"InputDeviceId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"UhdDeviceSettings",params,undefined,true); 
			

			svc.updateInputDevice(params,cb);
		}

		
		service.UpdateInputSecurityGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InputSecurityGroupId",params,undefined,false); 
			
			copyArgs(n,"InputSecurityGroupId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"WhitelistRules",params,undefined,true); 
			
			copyArgs(msg,"InputSecurityGroupId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"WhitelistRules",params,undefined,true); 
			

			svc.updateInputSecurityGroup(params,cb);
		}

		
		service.UpdateMultiplex=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MultiplexId",params,undefined,false); 
			
			copyArgs(n,"MultiplexId",params,undefined,false); 
			copyArgs(n,"MultiplexSettings",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"MultiplexId",params,undefined,false); 
			copyArgs(msg,"MultiplexSettings",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.updateMultiplex(params,cb);
		}

		
		service.UpdateMultiplexProgram=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MultiplexId",params,undefined,false); 
			copyArgs(n,"ProgramName",params,undefined,false); 
			
			copyArgs(n,"MultiplexId",params,undefined,false); 
			copyArgs(n,"MultiplexProgramSettings",params,undefined,true); 
			copyArgs(n,"ProgramName",params,undefined,false); 
			
			copyArgs(msg,"MultiplexId",params,undefined,false); 
			copyArgs(msg,"MultiplexProgramSettings",params,undefined,true); 
			copyArgs(msg,"ProgramName",params,undefined,false); 
			

			svc.updateMultiplexProgram(params,cb);
		}

		
		service.UpdateReservation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReservationId",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ReservationId",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ReservationId",params,undefined,false); 
			

			svc.updateReservation(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS MediaLive", AmazonAPINode);

};
