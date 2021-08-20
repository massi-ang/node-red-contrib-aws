
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

		var awsService = new AWS.NetworkManager( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.NetworkManager(msg.AWSConfig) : awsService;

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

		
		service.AssociateCustomerGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CustomerGatewayArn",params,undefined,false); 
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			copyArg(n,"DeviceId",params,undefined,false); 
			
			copyArg(msg,"CustomerGatewayArn",params,undefined,false); 
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"DeviceId",params,undefined,false); 
			copyArg(msg,"LinkId",params,undefined,false); 
			

			svc.associateCustomerGateway(params,cb);
		}

		
		service.AssociateLink=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			copyArg(n,"DeviceId",params,undefined,false); 
			copyArg(n,"LinkId",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"DeviceId",params,undefined,false); 
			copyArg(msg,"LinkId",params,undefined,false); 
			

			svc.associateLink(params,cb);
		}

		
		service.AssociateTransitGatewayConnectPeer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			copyArg(n,"TransitGatewayConnectPeerArn",params,undefined,false); 
			copyArg(n,"DeviceId",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"TransitGatewayConnectPeerArn",params,undefined,false); 
			copyArg(msg,"DeviceId",params,undefined,false); 
			copyArg(msg,"LinkId",params,undefined,false); 
			

			svc.associateTransitGatewayConnectPeer(params,cb);
		}

		
		service.CreateConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			copyArg(n,"DeviceId",params,undefined,false); 
			copyArg(n,"ConnectedDeviceId",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"DeviceId",params,undefined,false); 
			copyArg(msg,"ConnectedDeviceId",params,undefined,false); 
			copyArg(msg,"LinkId",params,undefined,false); 
			copyArg(msg,"ConnectedLinkId",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createConnection(params,cb);
		}

		
		service.CreateDevice=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"AWSLocation",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"Vendor",params,undefined,false); 
			copyArg(msg,"Model",params,undefined,false); 
			copyArg(msg,"SerialNumber",params,undefined,false); 
			copyArg(msg,"Location",params,undefined,true); 
			copyArg(msg,"SiteId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createDevice(params,cb);
		}

		
		service.CreateGlobalNetwork=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createGlobalNetwork(params,cb);
		}

		
		service.CreateLink=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			copyArg(n,"Bandwidth",params,undefined,true); 
			copyArg(n,"SiteId",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"Bandwidth",params,undefined,true); 
			copyArg(msg,"Provider",params,undefined,false); 
			copyArg(msg,"SiteId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createLink(params,cb);
		}

		
		service.CreateSite=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Location",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createSite(params,cb);
		}

		
		service.DeleteConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			copyArg(n,"ConnectionId",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"ConnectionId",params,undefined,false); 
			

			svc.deleteConnection(params,cb);
		}

		
		service.DeleteDevice=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			copyArg(n,"DeviceId",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"DeviceId",params,undefined,false); 
			

			svc.deleteDevice(params,cb);
		}

		
		service.DeleteGlobalNetwork=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			

			svc.deleteGlobalNetwork(params,cb);
		}

		
		service.DeleteLink=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			copyArg(n,"LinkId",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"LinkId",params,undefined,false); 
			

			svc.deleteLink(params,cb);
		}

		
		service.DeleteSite=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			copyArg(n,"SiteId",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"SiteId",params,undefined,false); 
			

			svc.deleteSite(params,cb);
		}

		
		service.DeregisterTransitGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			copyArg(n,"TransitGatewayArn",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"TransitGatewayArn",params,undefined,false); 
			

			svc.deregisterTransitGateway(params,cb);
		}

		
		service.DescribeGlobalNetworks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"GlobalNetworkIds",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeGlobalNetworks(params,cb);
		}

		
		service.DisassociateCustomerGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			copyArg(n,"CustomerGatewayArn",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"CustomerGatewayArn",params,undefined,false); 
			

			svc.disassociateCustomerGateway(params,cb);
		}

		
		service.DisassociateLink=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			copyArg(n,"DeviceId",params,undefined,false); 
			copyArg(n,"LinkId",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"DeviceId",params,undefined,false); 
			copyArg(msg,"LinkId",params,undefined,false); 
			

			svc.disassociateLink(params,cb);
		}

		
		service.DisassociateTransitGatewayConnectPeer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			copyArg(n,"TransitGatewayConnectPeerArn",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"TransitGatewayConnectPeerArn",params,undefined,false); 
			

			svc.disassociateTransitGatewayConnectPeer(params,cb);
		}

		
		service.GetConnections=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"ConnectionIds",params,undefined,true); 
			copyArg(msg,"DeviceId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getConnections(params,cb);
		}

		
		service.GetCustomerGatewayAssociations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"CustomerGatewayArns",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getCustomerGatewayAssociations(params,cb);
		}

		
		service.GetDevices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"DeviceIds",params,undefined,true); 
			copyArg(msg,"SiteId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getDevices(params,cb);
		}

		
		service.GetLinkAssociations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"DeviceId",params,undefined,false); 
			copyArg(msg,"LinkId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getLinkAssociations(params,cb);
		}

		
		service.GetLinks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"LinkIds",params,undefined,true); 
			copyArg(msg,"SiteId",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"Provider",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getLinks(params,cb);
		}

		
		service.GetSites=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"SiteIds",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getSites(params,cb);
		}

		
		service.GetTransitGatewayConnectPeerAssociations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"TransitGatewayConnectPeerArns",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getTransitGatewayConnectPeerAssociations(params,cb);
		}

		
		service.GetTransitGatewayRegistrations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"TransitGatewayArns",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getTransitGatewayRegistrations(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.RegisterTransitGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			copyArg(n,"TransitGatewayArn",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"TransitGatewayArn",params,undefined,false); 
			

			svc.registerTransitGateway(params,cb);
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

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			copyArg(n,"ConnectionId",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"ConnectionId",params,undefined,false); 
			copyArg(msg,"LinkId",params,undefined,false); 
			copyArg(msg,"ConnectedLinkId",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			

			svc.updateConnection(params,cb);
		}

		
		service.UpdateDevice=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			copyArg(n,"DeviceId",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"DeviceId",params,undefined,false); 
			copyArg(msg,"AWSLocation",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"Vendor",params,undefined,false); 
			copyArg(msg,"Model",params,undefined,false); 
			copyArg(msg,"SerialNumber",params,undefined,false); 
			copyArg(msg,"Location",params,undefined,true); 
			copyArg(msg,"SiteId",params,undefined,false); 
			

			svc.updateDevice(params,cb);
		}

		
		service.UpdateGlobalNetwork=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			

			svc.updateGlobalNetwork(params,cb);
		}

		
		service.UpdateLink=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			copyArg(n,"LinkId",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"LinkId",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"Bandwidth",params,undefined,true); 
			copyArg(msg,"Provider",params,undefined,false); 
			

			svc.updateLink(params,cb);
		}

		
		service.UpdateSite=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalNetworkId",params,undefined,false); 
			copyArg(n,"SiteId",params,undefined,false); 
			
			copyArg(msg,"GlobalNetworkId",params,undefined,false); 
			copyArg(msg,"SiteId",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Location",params,undefined,true); 
			

			svc.updateSite(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS NetworkManager", AmazonAPINode);

};
