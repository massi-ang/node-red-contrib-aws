
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

		var awsService = new AWS.IoTWireless( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.IoTWireless(msg.AWSConfig) : awsService;

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
		
		service.AssociateAwsAccountWithPartnerAccount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Sidewalk",params,undefined,true); 
			
			copyArgs(n,"Sidewalk",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Sidewalk",params,undefined,true); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.associateAwsAccountWithPartnerAccount(params,cb);
		}
		
		service.AssociateWirelessDeviceWithThing=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"ThingArn",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"ThingArn",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"ThingArn",params,undefined,false); 
			

			svc.associateWirelessDeviceWithThing(params,cb);
		}
		
		service.AssociateWirelessGatewayWithCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IotCertificateId",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IotCertificateId",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IotCertificateId",params,undefined,false); 
			

			svc.associateWirelessGatewayWithCertificate(params,cb);
		}
		
		service.AssociateWirelessGatewayWithThing=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"ThingArn",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"ThingArn",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"ThingArn",params,undefined,false); 
			

			svc.associateWirelessGatewayWithThing(params,cb);
		}
		
		service.CreateDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ExpressionType",params,undefined,false); 
			copyArgs(n,"Expression",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ExpressionType",params,undefined,false); 
			copyArgs(n,"Expression",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ExpressionType",params,undefined,false); 
			copyArgs(msg,"Expression",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.createDestination(params,cb);
		}
		
		service.CreateDeviceProfile=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"LoRaWAN",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"LoRaWAN",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.createDeviceProfile(params,cb);
		}
		
		service.CreateServiceProfile=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"LoRaWAN",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"LoRaWAN",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.createServiceProfile(params,cb);
		}
		
		service.CreateWirelessDevice=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"DestinationName",params,undefined,false); 
			
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"DestinationName",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"LoRaWAN",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DestinationName",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"LoRaWAN",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createWirelessDevice(params,cb);
		}
		
		service.CreateWirelessGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LoRaWAN",params,undefined,true); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"LoRaWAN",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"LoRaWAN",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.createWirelessGateway(params,cb);
		}
		
		service.CreateWirelessGatewayTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"WirelessGatewayTaskDefinitionId",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"WirelessGatewayTaskDefinitionId",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"WirelessGatewayTaskDefinitionId",params,undefined,false); 
			

			svc.createWirelessGatewayTask(params,cb);
		}
		
		service.CreateWirelessGatewayTaskDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(Boolean(n),"AutoCreateTasks",params,undefined,false); 
			
			copyArgs(Boolean(n),"AutoCreateTasks",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Update",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"AutoCreateTasks",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Update",params,undefined,true); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createWirelessGatewayTaskDefinition(params,cb);
		}
		
		service.DeleteDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteDestination(params,cb);
		}
		
		service.DeleteDeviceProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.deleteDeviceProfile(params,cb);
		}
		
		service.DeleteServiceProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.deleteServiceProfile(params,cb);
		}
		
		service.DeleteWirelessDevice=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.deleteWirelessDevice(params,cb);
		}
		
		service.DeleteWirelessGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.deleteWirelessGateway(params,cb);
		}
		
		service.DeleteWirelessGatewayTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.deleteWirelessGatewayTask(params,cb);
		}
		
		service.DeleteWirelessGatewayTaskDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.deleteWirelessGatewayTaskDefinition(params,cb);
		}
		
		service.DisassociateAwsAccountFromPartnerAccount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PartnerAccountId",params,undefined,false); 
			copyArgs(n,"PartnerType",params,undefined,false); 
			
			copyArgs(n,"PartnerAccountId",params,undefined,false); 
			copyArgs(n,"PartnerType",params,undefined,false); 
			
			copyArgs(msg,"PartnerAccountId",params,undefined,false); 
			copyArgs(msg,"PartnerType",params,undefined,false); 
			

			svc.disassociateAwsAccountFromPartnerAccount(params,cb);
		}
		
		service.DisassociateWirelessDeviceFromThing=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.disassociateWirelessDeviceFromThing(params,cb);
		}
		
		service.DisassociateWirelessGatewayFromCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.disassociateWirelessGatewayFromCertificate(params,cb);
		}
		
		service.DisassociateWirelessGatewayFromThing=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.disassociateWirelessGatewayFromThing(params,cb);
		}
		
		service.GetDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getDestination(params,cb);
		}
		
		service.GetDeviceProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getDeviceProfile(params,cb);
		}
		
		service.GetLogLevelsByResourceTypes=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getLogLevelsByResourceTypes(params,cb);
		}
		
		service.GetPartnerAccount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PartnerAccountId",params,undefined,false); 
			copyArgs(n,"PartnerType",params,undefined,false); 
			
			copyArgs(n,"PartnerAccountId",params,undefined,false); 
			copyArgs(n,"PartnerType",params,undefined,false); 
			
			copyArgs(msg,"PartnerAccountId",params,undefined,false); 
			copyArgs(msg,"PartnerType",params,undefined,false); 
			

			svc.getPartnerAccount(params,cb);
		}
		
		service.GetResourceLogLevel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceIdentifier",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			
			copyArgs(n,"ResourceIdentifier",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			
			copyArgs(msg,"ResourceIdentifier",params,undefined,false); 
			copyArgs(msg,"ResourceType",params,undefined,false); 
			

			svc.getResourceLogLevel(params,cb);
		}
		
		service.GetServiceEndpoint=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ServiceType",params,undefined,false); 
			
			copyArgs(msg,"ServiceType",params,undefined,false); 
			

			svc.getServiceEndpoint(params,cb);
		}
		
		service.GetServiceProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getServiceProfile(params,cb);
		}
		
		service.GetWirelessDevice=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Identifier",params,undefined,false); 
			copyArgs(n,"IdentifierType",params,undefined,false); 
			
			copyArgs(n,"Identifier",params,undefined,false); 
			copyArgs(n,"IdentifierType",params,undefined,false); 
			
			copyArgs(msg,"Identifier",params,undefined,false); 
			copyArgs(msg,"IdentifierType",params,undefined,false); 
			

			svc.getWirelessDevice(params,cb);
		}
		
		service.GetWirelessDeviceStatistics=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WirelessDeviceId",params,undefined,false); 
			
			copyArgs(n,"WirelessDeviceId",params,undefined,false); 
			
			copyArgs(msg,"WirelessDeviceId",params,undefined,false); 
			

			svc.getWirelessDeviceStatistics(params,cb);
		}
		
		service.GetWirelessGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Identifier",params,undefined,false); 
			copyArgs(n,"IdentifierType",params,undefined,false); 
			
			copyArgs(n,"Identifier",params,undefined,false); 
			copyArgs(n,"IdentifierType",params,undefined,false); 
			
			copyArgs(msg,"Identifier",params,undefined,false); 
			copyArgs(msg,"IdentifierType",params,undefined,false); 
			

			svc.getWirelessGateway(params,cb);
		}
		
		service.GetWirelessGatewayCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getWirelessGatewayCertificate(params,cb);
		}
		
		service.GetWirelessGatewayFirmwareInformation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getWirelessGatewayFirmwareInformation(params,cb);
		}
		
		service.GetWirelessGatewayStatistics=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WirelessGatewayId",params,undefined,false); 
			
			copyArgs(n,"WirelessGatewayId",params,undefined,false); 
			
			copyArgs(msg,"WirelessGatewayId",params,undefined,false); 
			

			svc.getWirelessGatewayStatistics(params,cb);
		}
		
		service.GetWirelessGatewayTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getWirelessGatewayTask(params,cb);
		}
		
		service.GetWirelessGatewayTaskDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getWirelessGatewayTaskDefinition(params,cb);
		}
		
		service.ListDestinations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listDestinations(params,cb);
		}
		
		service.ListDeviceProfiles=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listDeviceProfiles(params,cb);
		}
		
		service.ListPartnerAccounts=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listPartnerAccounts(params,cb);
		}
		
		service.ListServiceProfiles=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listServiceProfiles(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.ListWirelessDevices=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"DestinationName",params,undefined,false); 
			copyArgs(n,"DeviceProfileId",params,undefined,false); 
			copyArgs(n,"ServiceProfileId",params,undefined,false); 
			copyArgs(n,"WirelessDeviceType",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DestinationName",params,undefined,false); 
			copyArgs(msg,"DeviceProfileId",params,undefined,false); 
			copyArgs(msg,"ServiceProfileId",params,undefined,false); 
			copyArgs(msg,"WirelessDeviceType",params,undefined,false); 
			

			svc.listWirelessDevices(params,cb);
		}
		
		service.ListWirelessGatewayTaskDefinitions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"TaskDefinitionType",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"TaskDefinitionType",params,undefined,false); 
			

			svc.listWirelessGatewayTaskDefinitions(params,cb);
		}
		
		service.ListWirelessGateways=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listWirelessGateways(params,cb);
		}
		
		service.PutResourceLogLevel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceIdentifier",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"LogLevel",params,undefined,false); 
			
			copyArgs(n,"ResourceIdentifier",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"LogLevel",params,undefined,false); 
			
			copyArgs(msg,"ResourceIdentifier",params,undefined,false); 
			copyArgs(msg,"ResourceType",params,undefined,false); 
			copyArgs(msg,"LogLevel",params,undefined,false); 
			

			svc.putResourceLogLevel(params,cb);
		}
		
		service.ResetAllResourceLogLevels=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.resetAllResourceLogLevels(params,cb);
		}
		
		service.ResetResourceLogLevel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceIdentifier",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			
			copyArgs(n,"ResourceIdentifier",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			
			copyArgs(msg,"ResourceIdentifier",params,undefined,false); 
			copyArgs(msg,"ResourceType",params,undefined,false); 
			

			svc.resetResourceLogLevel(params,cb);
		}
		
		service.SendDataToWirelessDevice=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(Number(n),"TransmitMode",params,undefined,false); 
			copyArgs(n,"PayloadData",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(Number(n),"TransmitMode",params,undefined,false); 
			copyArgs(n,"PayloadData",params,undefined,false); 
			copyArgs(n,"WirelessMetadata",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"TransmitMode",params,undefined,false); 
			copyArgs(msg,"PayloadData",params,undefined,false); 
			copyArgs(msg,"WirelessMetadata",params,undefined,false); 
			

			svc.sendDataToWirelessDevice(params,cb);
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
		
		service.TestWirelessDevice=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.testWirelessDevice(params,cb);
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
		
		service.UpdateDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ExpressionType",params,undefined,false); 
			copyArgs(n,"Expression",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ExpressionType",params,undefined,false); 
			copyArgs(msg,"Expression",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			

			svc.updateDestination(params,cb);
		}
		
		service.UpdateLogLevelsByResourceTypes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DefaultLogLevel",params,undefined,false); 
			copyArgs(n,"WirelessDeviceLogOptions",params,undefined,true); 
			copyArgs(n,"WirelessGatewayLogOptions",params,undefined,true); 
			
			copyArgs(msg,"DefaultLogLevel",params,undefined,false); 
			copyArgs(msg,"WirelessDeviceLogOptions",params,undefined,true); 
			copyArgs(msg,"WirelessGatewayLogOptions",params,undefined,true); 
			

			svc.updateLogLevelsByResourceTypes(params,cb);
		}
		
		service.UpdatePartnerAccount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Sidewalk",params,undefined,false); 
			copyArgs(n,"PartnerAccountId",params,undefined,false); 
			copyArgs(n,"PartnerType",params,undefined,false); 
			
			copyArgs(n,"Sidewalk",params,undefined,false); 
			copyArgs(n,"PartnerAccountId",params,undefined,false); 
			copyArgs(n,"PartnerType",params,undefined,false); 
			
			copyArgs(msg,"Sidewalk",params,undefined,false); 
			copyArgs(msg,"PartnerAccountId",params,undefined,false); 
			copyArgs(msg,"PartnerType",params,undefined,false); 
			

			svc.updatePartnerAccount(params,cb);
		}
		
		service.UpdateWirelessDevice=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"DestinationName",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"LoRaWAN",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"DestinationName",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"LoRaWAN",params,undefined,false); 
			

			svc.updateWirelessDevice(params,cb);
		}
		
		service.UpdateWirelessGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"JoinEuiFilters",params,undefined,true); 
			copyArgs(n,"NetIdFilters",params,undefined,true); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"JoinEuiFilters",params,undefined,true); 
			copyArgs(msg,"NetIdFilters",params,undefined,true); 
			

			svc.updateWirelessGateway(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS IoTWireless", AmazonAPINode);

};
