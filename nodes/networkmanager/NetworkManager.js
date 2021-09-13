
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

		var awsService = new AWS.NetworkManager( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.NetworkManager(msg.AWSConfig) : awsService;

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
		
			service.AssociateCustomerGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CustomerGatewayArn",params,undefined,false); 
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"DeviceId",params,undefined,false); 
			
			copyArgs(n,"CustomerGatewayArn",params,undefined,false); 
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"DeviceId",params,undefined,false); 
			copyArgs(n,"LinkId",params,undefined,false); 
			
			copyArgs(msg,"CustomerGatewayArn",params,undefined,false); 
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"DeviceId",params,undefined,false); 
			copyArgs(msg,"LinkId",params,undefined,false); 
			

			svc.associateCustomerGateway(params,cb);
		}
			service.AssociateLink=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"DeviceId",params,undefined,false); 
			copyArgs(n,"LinkId",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"DeviceId",params,undefined,false); 
			copyArgs(n,"LinkId",params,undefined,false); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"DeviceId",params,undefined,false); 
			copyArgs(msg,"LinkId",params,undefined,false); 
			

			svc.associateLink(params,cb);
		}
			service.AssociateTransitGatewayConnectPeer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"TransitGatewayConnectPeerArn",params,undefined,false); 
			copyArgs(n,"DeviceId",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"TransitGatewayConnectPeerArn",params,undefined,false); 
			copyArgs(n,"DeviceId",params,undefined,false); 
			copyArgs(n,"LinkId",params,undefined,false); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"TransitGatewayConnectPeerArn",params,undefined,false); 
			copyArgs(msg,"DeviceId",params,undefined,false); 
			copyArgs(msg,"LinkId",params,undefined,false); 
			

			svc.associateTransitGatewayConnectPeer(params,cb);
		}
			service.CreateConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"DeviceId",params,undefined,false); 
			copyArgs(n,"ConnectedDeviceId",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"DeviceId",params,undefined,false); 
			copyArgs(n,"ConnectedDeviceId",params,undefined,false); 
			copyArgs(n,"LinkId",params,undefined,false); 
			copyArgs(n,"ConnectedLinkId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"DeviceId",params,undefined,false); 
			copyArgs(msg,"ConnectedDeviceId",params,undefined,false); 
			copyArgs(msg,"LinkId",params,undefined,false); 
			copyArgs(msg,"ConnectedLinkId",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createConnection(params,cb);
		}
			service.CreateDevice=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"AWSLocation",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Vendor",params,undefined,false); 
			copyArgs(n,"Model",params,undefined,false); 
			copyArgs(n,"SerialNumber",params,undefined,false); 
			copyArgs(n,"Location",params,undefined,true); 
			copyArgs(n,"SiteId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"AWSLocation",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"Vendor",params,undefined,false); 
			copyArgs(msg,"Model",params,undefined,false); 
			copyArgs(msg,"SerialNumber",params,undefined,false); 
			copyArgs(msg,"Location",params,undefined,true); 
			copyArgs(msg,"SiteId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createDevice(params,cb);
		}
			service.CreateGlobalNetwork=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createGlobalNetwork(params,cb);
		}
			service.CreateLink=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"Bandwidth",params,undefined,true); 
			copyArgs(n,"SiteId",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Bandwidth",params,undefined,true); 
			copyArgs(n,"Provider",params,undefined,false); 
			copyArgs(n,"SiteId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"Bandwidth",params,undefined,true); 
			copyArgs(msg,"Provider",params,undefined,false); 
			copyArgs(msg,"SiteId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createLink(params,cb);
		}
			service.CreateSite=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Location",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Location",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createSite(params,cb);
		}
			service.DeleteConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"ConnectionId",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"ConnectionId",params,undefined,false); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"ConnectionId",params,undefined,false); 
			

			svc.deleteConnection(params,cb);
		}
			service.DeleteDevice=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"DeviceId",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"DeviceId",params,undefined,false); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"DeviceId",params,undefined,false); 
			

			svc.deleteDevice(params,cb);
		}
			service.DeleteGlobalNetwork=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			

			svc.deleteGlobalNetwork(params,cb);
		}
			service.DeleteLink=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"LinkId",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"LinkId",params,undefined,false); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"LinkId",params,undefined,false); 
			

			svc.deleteLink(params,cb);
		}
			service.DeleteSite=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"SiteId",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"SiteId",params,undefined,false); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"SiteId",params,undefined,false); 
			

			svc.deleteSite(params,cb);
		}
			service.DeregisterTransitGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"TransitGatewayArn",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"TransitGatewayArn",params,undefined,false); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"TransitGatewayArn",params,undefined,false); 
			

			svc.deregisterTransitGateway(params,cb);
		}
			service.DescribeGlobalNetworks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"GlobalNetworkIds",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"GlobalNetworkIds",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeGlobalNetworks(params,cb);
		}
			service.DisassociateCustomerGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"CustomerGatewayArn",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"CustomerGatewayArn",params,undefined,false); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"CustomerGatewayArn",params,undefined,false); 
			

			svc.disassociateCustomerGateway(params,cb);
		}
			service.DisassociateLink=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"DeviceId",params,undefined,false); 
			copyArgs(n,"LinkId",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"DeviceId",params,undefined,false); 
			copyArgs(n,"LinkId",params,undefined,false); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"DeviceId",params,undefined,false); 
			copyArgs(msg,"LinkId",params,undefined,false); 
			

			svc.disassociateLink(params,cb);
		}
			service.DisassociateTransitGatewayConnectPeer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"TransitGatewayConnectPeerArn",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"TransitGatewayConnectPeerArn",params,undefined,false); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"TransitGatewayConnectPeerArn",params,undefined,false); 
			

			svc.disassociateTransitGatewayConnectPeer(params,cb);
		}
			service.GetConnections=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"ConnectionIds",params,undefined,true); 
			copyArgs(n,"DeviceId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"ConnectionIds",params,undefined,true); 
			copyArgs(msg,"DeviceId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getConnections(params,cb);
		}
			service.GetCustomerGatewayAssociations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"CustomerGatewayArns",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"CustomerGatewayArns",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getCustomerGatewayAssociations(params,cb);
		}
			service.GetDevices=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"DeviceIds",params,undefined,true); 
			copyArgs(n,"SiteId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"DeviceIds",params,undefined,true); 
			copyArgs(msg,"SiteId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getDevices(params,cb);
		}
			service.GetLinkAssociations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"DeviceId",params,undefined,false); 
			copyArgs(n,"LinkId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"DeviceId",params,undefined,false); 
			copyArgs(msg,"LinkId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getLinkAssociations(params,cb);
		}
			service.GetLinks=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"LinkIds",params,undefined,true); 
			copyArgs(n,"SiteId",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Provider",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"LinkIds",params,undefined,true); 
			copyArgs(msg,"SiteId",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"Provider",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getLinks(params,cb);
		}
			service.GetSites=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"SiteIds",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"SiteIds",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getSites(params,cb);
		}
			service.GetTransitGatewayConnectPeerAssociations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"TransitGatewayConnectPeerArns",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"TransitGatewayConnectPeerArns",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getTransitGatewayConnectPeerAssociations(params,cb);
		}
			service.GetTransitGatewayRegistrations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"TransitGatewayArns",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"TransitGatewayArns",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getTransitGatewayRegistrations(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.RegisterTransitGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"TransitGatewayArn",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"TransitGatewayArn",params,undefined,false); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"TransitGatewayArn",params,undefined,false); 
			

			svc.registerTransitGateway(params,cb);
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
			service.UpdateConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"ConnectionId",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"ConnectionId",params,undefined,false); 
			copyArgs(n,"LinkId",params,undefined,false); 
			copyArgs(n,"ConnectedLinkId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"ConnectionId",params,undefined,false); 
			copyArgs(msg,"LinkId",params,undefined,false); 
			copyArgs(msg,"ConnectedLinkId",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			

			svc.updateConnection(params,cb);
		}
			service.UpdateDevice=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"DeviceId",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"DeviceId",params,undefined,false); 
			copyArgs(n,"AWSLocation",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Vendor",params,undefined,false); 
			copyArgs(n,"Model",params,undefined,false); 
			copyArgs(n,"SerialNumber",params,undefined,false); 
			copyArgs(n,"Location",params,undefined,true); 
			copyArgs(n,"SiteId",params,undefined,false); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"DeviceId",params,undefined,false); 
			copyArgs(msg,"AWSLocation",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"Vendor",params,undefined,false); 
			copyArgs(msg,"Model",params,undefined,false); 
			copyArgs(msg,"SerialNumber",params,undefined,false); 
			copyArgs(msg,"Location",params,undefined,true); 
			copyArgs(msg,"SiteId",params,undefined,false); 
			

			svc.updateDevice(params,cb);
		}
			service.UpdateGlobalNetwork=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			

			svc.updateGlobalNetwork(params,cb);
		}
			service.UpdateLink=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"LinkId",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"LinkId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Bandwidth",params,undefined,true); 
			copyArgs(n,"Provider",params,undefined,false); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"LinkId",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"Bandwidth",params,undefined,true); 
			copyArgs(msg,"Provider",params,undefined,false); 
			

			svc.updateLink(params,cb);
		}
			service.UpdateSite=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"SiteId",params,undefined,false); 
			
			copyArgs(n,"GlobalNetworkId",params,undefined,false); 
			copyArgs(n,"SiteId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Location",params,undefined,true); 
			
			copyArgs(msg,"GlobalNetworkId",params,undefined,false); 
			copyArgs(msg,"SiteId",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Location",params,undefined,true); 
			

			svc.updateSite(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS NetworkManager", AmazonAPINode);

};
