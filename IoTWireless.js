
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

		var awsService = new AWS.IoTWireless( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.IoTWireless(msg.AWSConfig) : awsService;

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

		
		service.AssociateAwsAccountWithPartnerAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Sidewalk",params,undefined,true); 
			
			copyArg(msg,"Sidewalk",params,undefined,true); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.associateAwsAccountWithPartnerAccount(params,cb);
		}

		
		service.AssociateWirelessDeviceWithThing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"ThingArn",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"ThingArn",params,undefined,false); 
			

			svc.associateWirelessDeviceWithThing(params,cb);
		}

		
		service.AssociateWirelessGatewayWithCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"IotCertificateId",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IotCertificateId",params,undefined,false); 
			

			svc.associateWirelessGatewayWithCertificate(params,cb);
		}

		
		service.AssociateWirelessGatewayWithThing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"ThingArn",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"ThingArn",params,undefined,false); 
			

			svc.associateWirelessGatewayWithThing(params,cb);
		}

		
		service.CreateDestination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"ExpressionType",params,undefined,false); 
			copyArg(n,"Expression",params,undefined,false); 
			copyArg(n,"RoleArn",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ExpressionType",params,undefined,false); 
			copyArg(msg,"Expression",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.createDestination(params,cb);
		}

		
		service.CreateDeviceProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"LoRaWAN",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.createDeviceProfile(params,cb);
		}

		
		service.CreateServiceProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"LoRaWAN",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.createServiceProfile(params,cb);
		}

		
		service.CreateWirelessDevice=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Type",params,undefined,false); 
			copyArg(n,"DestinationName",params,undefined,false); 
			
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DestinationName",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"LoRaWAN",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createWirelessDevice(params,cb);
		}

		
		service.CreateWirelessGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LoRaWAN",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"LoRaWAN",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.createWirelessGateway(params,cb);
		}

		
		service.CreateWirelessGatewayTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"WirelessGatewayTaskDefinitionId",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"WirelessGatewayTaskDefinitionId",params,undefined,false); 
			

			svc.createWirelessGatewayTask(params,cb);
		}

		
		service.CreateWirelessGatewayTaskDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoCreateTasks",params,undefined,false); 
			
			copyArg(msg,"AutoCreateTasks",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Update",params,undefined,true); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createWirelessGatewayTaskDefinition(params,cb);
		}

		
		service.DeleteDestination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteDestination(params,cb);
		}

		
		service.DeleteDeviceProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.deleteDeviceProfile(params,cb);
		}

		
		service.DeleteServiceProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.deleteServiceProfile(params,cb);
		}

		
		service.DeleteWirelessDevice=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.deleteWirelessDevice(params,cb);
		}

		
		service.DeleteWirelessGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.deleteWirelessGateway(params,cb);
		}

		
		service.DeleteWirelessGatewayTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.deleteWirelessGatewayTask(params,cb);
		}

		
		service.DeleteWirelessGatewayTaskDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.deleteWirelessGatewayTaskDefinition(params,cb);
		}

		
		service.DisassociateAwsAccountFromPartnerAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PartnerAccountId",params,undefined,false); 
			copyArg(n,"PartnerType",params,undefined,false); 
			
			copyArg(msg,"PartnerAccountId",params,undefined,false); 
			copyArg(msg,"PartnerType",params,undefined,false); 
			

			svc.disassociateAwsAccountFromPartnerAccount(params,cb);
		}

		
		service.DisassociateWirelessDeviceFromThing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.disassociateWirelessDeviceFromThing(params,cb);
		}

		
		service.DisassociateWirelessGatewayFromCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.disassociateWirelessGatewayFromCertificate(params,cb);
		}

		
		service.DisassociateWirelessGatewayFromThing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.disassociateWirelessGatewayFromThing(params,cb);
		}

		
		service.GetDestination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.getDestination(params,cb);
		}

		
		service.GetDeviceProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getDeviceProfile(params,cb);
		}

		
		service.GetLogLevelsByResourceTypes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getLogLevelsByResourceTypes(params,cb);
		}

		
		service.GetPartnerAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PartnerAccountId",params,undefined,false); 
			copyArg(n,"PartnerType",params,undefined,false); 
			
			copyArg(msg,"PartnerAccountId",params,undefined,false); 
			copyArg(msg,"PartnerType",params,undefined,false); 
			

			svc.getPartnerAccount(params,cb);
		}

		
		service.GetResourceLogLevel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceIdentifier",params,undefined,false); 
			copyArg(n,"ResourceType",params,undefined,false); 
			
			copyArg(msg,"ResourceIdentifier",params,undefined,false); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			

			svc.getResourceLogLevel(params,cb);
		}

		
		service.GetServiceEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ServiceType",params,undefined,false); 
			

			svc.getServiceEndpoint(params,cb);
		}

		
		service.GetServiceProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getServiceProfile(params,cb);
		}

		
		service.GetWirelessDevice=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Identifier",params,undefined,false); 
			copyArg(n,"IdentifierType",params,undefined,false); 
			
			copyArg(msg,"Identifier",params,undefined,false); 
			copyArg(msg,"IdentifierType",params,undefined,false); 
			

			svc.getWirelessDevice(params,cb);
		}

		
		service.GetWirelessDeviceStatistics=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WirelessDeviceId",params,undefined,false); 
			
			copyArg(msg,"WirelessDeviceId",params,undefined,false); 
			

			svc.getWirelessDeviceStatistics(params,cb);
		}

		
		service.GetWirelessGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Identifier",params,undefined,false); 
			copyArg(n,"IdentifierType",params,undefined,false); 
			
			copyArg(msg,"Identifier",params,undefined,false); 
			copyArg(msg,"IdentifierType",params,undefined,false); 
			

			svc.getWirelessGateway(params,cb);
		}

		
		service.GetWirelessGatewayCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getWirelessGatewayCertificate(params,cb);
		}

		
		service.GetWirelessGatewayFirmwareInformation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getWirelessGatewayFirmwareInformation(params,cb);
		}

		
		service.GetWirelessGatewayStatistics=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WirelessGatewayId",params,undefined,false); 
			
			copyArg(msg,"WirelessGatewayId",params,undefined,false); 
			

			svc.getWirelessGatewayStatistics(params,cb);
		}

		
		service.GetWirelessGatewayTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getWirelessGatewayTask(params,cb);
		}

		
		service.GetWirelessGatewayTaskDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getWirelessGatewayTaskDefinition(params,cb);
		}

		
		service.ListDestinations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listDestinations(params,cb);
		}

		
		service.ListDeviceProfiles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listDeviceProfiles(params,cb);
		}

		
		service.ListPartnerAccounts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listPartnerAccounts(params,cb);
		}

		
		service.ListServiceProfiles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listServiceProfiles(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListWirelessDevices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"DestinationName",params,undefined,false); 
			copyArg(msg,"DeviceProfileId",params,undefined,false); 
			copyArg(msg,"ServiceProfileId",params,undefined,false); 
			copyArg(msg,"WirelessDeviceType",params,undefined,false); 
			

			svc.listWirelessDevices(params,cb);
		}

		
		service.ListWirelessGatewayTaskDefinitions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"TaskDefinitionType",params,undefined,false); 
			

			svc.listWirelessGatewayTaskDefinitions(params,cb);
		}

		
		service.ListWirelessGateways=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listWirelessGateways(params,cb);
		}

		
		service.PutResourceLogLevel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceIdentifier",params,undefined,false); 
			copyArg(n,"ResourceType",params,undefined,false); 
			copyArg(n,"LogLevel",params,undefined,false); 
			
			copyArg(msg,"ResourceIdentifier",params,undefined,false); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			copyArg(msg,"LogLevel",params,undefined,false); 
			

			svc.putResourceLogLevel(params,cb);
		}

		
		service.ResetAllResourceLogLevels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.resetAllResourceLogLevels(params,cb);
		}

		
		service.ResetResourceLogLevel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceIdentifier",params,undefined,false); 
			copyArg(n,"ResourceType",params,undefined,false); 
			
			copyArg(msg,"ResourceIdentifier",params,undefined,false); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			

			svc.resetResourceLogLevel(params,cb);
		}

		
		service.SendDataToWirelessDevice=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"TransmitMode",params,undefined,false); 
			copyArg(n,"PayloadData",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"TransmitMode",params,undefined,false); 
			copyArg(msg,"PayloadData",params,undefined,false); 
			copyArg(msg,"WirelessMetadata",params,undefined,false); 
			

			svc.sendDataToWirelessDevice(params,cb);
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

		
		service.TestWirelessDevice=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.testWirelessDevice(params,cb);
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

		
		service.UpdateDestination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ExpressionType",params,undefined,false); 
			copyArg(msg,"Expression",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			

			svc.updateDestination(params,cb);
		}

		
		service.UpdateLogLevelsByResourceTypes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DefaultLogLevel",params,undefined,false); 
			copyArg(msg,"WirelessDeviceLogOptions",params,undefined,true); 
			copyArg(msg,"WirelessGatewayLogOptions",params,undefined,true); 
			

			svc.updateLogLevelsByResourceTypes(params,cb);
		}

		
		service.UpdatePartnerAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Sidewalk",params,undefined,false); 
			copyArg(n,"PartnerAccountId",params,undefined,false); 
			copyArg(n,"PartnerType",params,undefined,false); 
			
			copyArg(msg,"Sidewalk",params,undefined,false); 
			copyArg(msg,"PartnerAccountId",params,undefined,false); 
			copyArg(msg,"PartnerType",params,undefined,false); 
			

			svc.updatePartnerAccount(params,cb);
		}

		
		service.UpdateWirelessDevice=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"DestinationName",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"LoRaWAN",params,undefined,false); 
			

			svc.updateWirelessDevice(params,cb);
		}

		
		service.UpdateWirelessGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"JoinEuiFilters",params,undefined,true); 
			copyArg(msg,"NetIdFilters",params,undefined,true); 
			

			svc.updateWirelessGateway(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS IoTWireless", AmazonAPINode);

};
