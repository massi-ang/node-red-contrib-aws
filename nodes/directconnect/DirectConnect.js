
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

		var awsService = new AWS.DirectConnect( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.DirectConnect(msg.AWSConfig) : awsService;

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
		
		service.AcceptDirectConnectGatewayAssociationProposal=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"directConnectGatewayId",params,undefined,false); 
			copyArgs(n,"proposalId",params,undefined,false); 
			copyArgs(n,"associatedGatewayOwnerAccount",params,undefined,false); 
			
			copyArgs(n,"directConnectGatewayId",params,undefined,false); 
			copyArgs(n,"proposalId",params,undefined,false); 
			copyArgs(n,"associatedGatewayOwnerAccount",params,undefined,false); 
			copyArgs(n,"overrideAllowedPrefixesToDirectConnectGateway",params,undefined,true); 
			
			copyArgs(msg,"directConnectGatewayId",params,undefined,false); 
			copyArgs(msg,"proposalId",params,undefined,false); 
			copyArgs(msg,"associatedGatewayOwnerAccount",params,undefined,false); 
			copyArgs(msg,"overrideAllowedPrefixesToDirectConnectGateway",params,undefined,true); 
			

			svc.acceptDirectConnectGatewayAssociationProposal(params,cb);
		}
		
		service.AllocateConnectionOnInterconnect=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"bandwidth",params,undefined,false); 
			copyArgs(n,"connectionName",params,undefined,false); 
			copyArgs(n,"ownerAccount",params,undefined,false); 
			copyArgs(n,"interconnectId",params,undefined,false); 
			copyArgs(Number(n),"vlan",params,undefined,false); 
			
			copyArgs(n,"bandwidth",params,undefined,false); 
			copyArgs(n,"connectionName",params,undefined,false); 
			copyArgs(n,"ownerAccount",params,undefined,false); 
			copyArgs(n,"interconnectId",params,undefined,false); 
			copyArgs(Number(n),"vlan",params,undefined,false); 
			
			copyArgs(msg,"bandwidth",params,undefined,false); 
			copyArgs(msg,"connectionName",params,undefined,false); 
			copyArgs(msg,"ownerAccount",params,undefined,false); 
			copyArgs(msg,"interconnectId",params,undefined,false); 
			copyArgs(msg,"vlan",params,undefined,false); 
			

			svc.allocateConnectionOnInterconnect(params,cb);
		}
		
		service.AllocateHostedConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"ownerAccount",params,undefined,false); 
			copyArgs(n,"bandwidth",params,undefined,false); 
			copyArgs(n,"connectionName",params,undefined,false); 
			copyArgs(Number(n),"vlan",params,undefined,false); 
			
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"ownerAccount",params,undefined,false); 
			copyArgs(n,"bandwidth",params,undefined,false); 
			copyArgs(n,"connectionName",params,undefined,false); 
			copyArgs(Number(n),"vlan",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"connectionId",params,undefined,false); 
			copyArgs(msg,"ownerAccount",params,undefined,false); 
			copyArgs(msg,"bandwidth",params,undefined,false); 
			copyArgs(msg,"connectionName",params,undefined,false); 
			copyArgs(msg,"vlan",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.allocateHostedConnection(params,cb);
		}
		
		service.AllocatePrivateVirtualInterface=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"ownerAccount",params,undefined,false); 
			copyArgs(n,"newPrivateVirtualInterfaceAllocation",params,undefined,false); 
			
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"ownerAccount",params,undefined,false); 
			copyArgs(n,"newPrivateVirtualInterfaceAllocation",params,undefined,false); 
			
			copyArgs(msg,"connectionId",params,undefined,false); 
			copyArgs(msg,"ownerAccount",params,undefined,false); 
			copyArgs(msg,"newPrivateVirtualInterfaceAllocation",params,undefined,false); 
			

			svc.allocatePrivateVirtualInterface(params,cb);
		}
		
		service.AllocatePublicVirtualInterface=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"ownerAccount",params,undefined,false); 
			copyArgs(n,"newPublicVirtualInterfaceAllocation",params,undefined,false); 
			
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"ownerAccount",params,undefined,false); 
			copyArgs(n,"newPublicVirtualInterfaceAllocation",params,undefined,false); 
			
			copyArgs(msg,"connectionId",params,undefined,false); 
			copyArgs(msg,"ownerAccount",params,undefined,false); 
			copyArgs(msg,"newPublicVirtualInterfaceAllocation",params,undefined,false); 
			

			svc.allocatePublicVirtualInterface(params,cb);
		}
		
		service.AllocateTransitVirtualInterface=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"ownerAccount",params,undefined,false); 
			copyArgs(n,"newTransitVirtualInterfaceAllocation",params,undefined,false); 
			
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"ownerAccount",params,undefined,false); 
			copyArgs(n,"newTransitVirtualInterfaceAllocation",params,undefined,false); 
			
			copyArgs(msg,"connectionId",params,undefined,false); 
			copyArgs(msg,"ownerAccount",params,undefined,false); 
			copyArgs(msg,"newTransitVirtualInterfaceAllocation",params,undefined,false); 
			

			svc.allocateTransitVirtualInterface(params,cb);
		}
		
		service.AssociateConnectionWithLag=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"lagId",params,undefined,false); 
			
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"lagId",params,undefined,false); 
			
			copyArgs(msg,"connectionId",params,undefined,false); 
			copyArgs(msg,"lagId",params,undefined,false); 
			

			svc.associateConnectionWithLag(params,cb);
		}
		
		service.AssociateHostedConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"parentConnectionId",params,undefined,false); 
			
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"parentConnectionId",params,undefined,false); 
			
			copyArgs(msg,"connectionId",params,undefined,false); 
			copyArgs(msg,"parentConnectionId",params,undefined,false); 
			

			svc.associateHostedConnection(params,cb);
		}
		
		service.AssociateMacSecKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"connectionId",params,undefined,false); 
			
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"secretARN",params,undefined,false); 
			copyArgs(n,"ckn",params,undefined,false); 
			copyArgs(n,"cak",params,undefined,false); 
			
			copyArgs(msg,"connectionId",params,undefined,false); 
			copyArgs(msg,"secretARN",params,undefined,false); 
			copyArgs(msg,"ckn",params,undefined,false); 
			copyArgs(msg,"cak",params,undefined,false); 
			

			svc.associateMacSecKey(params,cb);
		}
		
		service.AssociateVirtualInterface=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"virtualInterfaceId",params,undefined,false); 
			copyArgs(n,"connectionId",params,undefined,false); 
			
			copyArgs(n,"virtualInterfaceId",params,undefined,false); 
			copyArgs(n,"connectionId",params,undefined,false); 
			
			copyArgs(msg,"virtualInterfaceId",params,undefined,false); 
			copyArgs(msg,"connectionId",params,undefined,false); 
			

			svc.associateVirtualInterface(params,cb);
		}
		
		service.ConfirmConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"connectionId",params,undefined,false); 
			
			copyArgs(n,"connectionId",params,undefined,false); 
			
			copyArgs(msg,"connectionId",params,undefined,false); 
			

			svc.confirmConnection(params,cb);
		}
		
		service.ConfirmPrivateVirtualInterface=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"virtualInterfaceId",params,undefined,false); 
			
			copyArgs(n,"virtualInterfaceId",params,undefined,false); 
			copyArgs(n,"virtualGatewayId",params,undefined,false); 
			copyArgs(n,"directConnectGatewayId",params,undefined,false); 
			
			copyArgs(msg,"virtualInterfaceId",params,undefined,false); 
			copyArgs(msg,"virtualGatewayId",params,undefined,false); 
			copyArgs(msg,"directConnectGatewayId",params,undefined,false); 
			

			svc.confirmPrivateVirtualInterface(params,cb);
		}
		
		service.ConfirmPublicVirtualInterface=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"virtualInterfaceId",params,undefined,false); 
			
			copyArgs(n,"virtualInterfaceId",params,undefined,false); 
			
			copyArgs(msg,"virtualInterfaceId",params,undefined,false); 
			

			svc.confirmPublicVirtualInterface(params,cb);
		}
		
		service.ConfirmTransitVirtualInterface=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"virtualInterfaceId",params,undefined,false); 
			copyArgs(n,"directConnectGatewayId",params,undefined,false); 
			
			copyArgs(n,"virtualInterfaceId",params,undefined,false); 
			copyArgs(n,"directConnectGatewayId",params,undefined,false); 
			
			copyArgs(msg,"virtualInterfaceId",params,undefined,false); 
			copyArgs(msg,"directConnectGatewayId",params,undefined,false); 
			

			svc.confirmTransitVirtualInterface(params,cb);
		}
		
		service.CreateBGPPeer=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"virtualInterfaceId",params,undefined,false); 
			copyArgs(n,"newBGPPeer",params,undefined,false); 
			
			copyArgs(msg,"virtualInterfaceId",params,undefined,false); 
			copyArgs(msg,"newBGPPeer",params,undefined,false); 
			

			svc.createBGPPeer(params,cb);
		}
		
		service.CreateConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"location",params,undefined,false); 
			copyArgs(n,"bandwidth",params,undefined,false); 
			copyArgs(n,"connectionName",params,undefined,false); 
			
			copyArgs(n,"location",params,undefined,false); 
			copyArgs(n,"bandwidth",params,undefined,false); 
			copyArgs(n,"connectionName",params,undefined,false); 
			copyArgs(n,"lagId",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"providerName",params,undefined,false); 
			copyArgs(Boolean(n),"requestMACSec",params,undefined,false); 
			
			copyArgs(msg,"location",params,undefined,false); 
			copyArgs(msg,"bandwidth",params,undefined,false); 
			copyArgs(msg,"connectionName",params,undefined,false); 
			copyArgs(msg,"lagId",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"providerName",params,undefined,false); 
			copyArgs(msg,"requestMACSec",params,undefined,false); 
			

			svc.createConnection(params,cb);
		}
		
		service.CreateDirectConnectGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"directConnectGatewayName",params,undefined,false); 
			
			copyArgs(n,"directConnectGatewayName",params,undefined,false); 
			copyArgs(n,"amazonSideAsn",params,undefined,false); 
			
			copyArgs(msg,"directConnectGatewayName",params,undefined,false); 
			copyArgs(msg,"amazonSideAsn",params,undefined,false); 
			

			svc.createDirectConnectGateway(params,cb);
		}
		
		service.CreateDirectConnectGatewayAssociation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"directConnectGatewayId",params,undefined,false); 
			
			copyArgs(n,"directConnectGatewayId",params,undefined,false); 
			copyArgs(n,"gatewayId",params,undefined,false); 
			copyArgs(n,"addAllowedPrefixesToDirectConnectGateway",params,undefined,true); 
			copyArgs(n,"virtualGatewayId",params,undefined,false); 
			
			copyArgs(msg,"directConnectGatewayId",params,undefined,false); 
			copyArgs(msg,"gatewayId",params,undefined,false); 
			copyArgs(msg,"addAllowedPrefixesToDirectConnectGateway",params,undefined,true); 
			copyArgs(msg,"virtualGatewayId",params,undefined,false); 
			

			svc.createDirectConnectGatewayAssociation(params,cb);
		}
		
		service.CreateDirectConnectGatewayAssociationProposal=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"directConnectGatewayId",params,undefined,false); 
			copyArgs(n,"directConnectGatewayOwnerAccount",params,undefined,false); 
			copyArgs(n,"gatewayId",params,undefined,false); 
			
			copyArgs(n,"directConnectGatewayId",params,undefined,false); 
			copyArgs(n,"directConnectGatewayOwnerAccount",params,undefined,false); 
			copyArgs(n,"gatewayId",params,undefined,false); 
			copyArgs(n,"addAllowedPrefixesToDirectConnectGateway",params,undefined,true); 
			copyArgs(n,"removeAllowedPrefixesToDirectConnectGateway",params,undefined,true); 
			
			copyArgs(msg,"directConnectGatewayId",params,undefined,false); 
			copyArgs(msg,"directConnectGatewayOwnerAccount",params,undefined,false); 
			copyArgs(msg,"gatewayId",params,undefined,false); 
			copyArgs(msg,"addAllowedPrefixesToDirectConnectGateway",params,undefined,true); 
			copyArgs(msg,"removeAllowedPrefixesToDirectConnectGateway",params,undefined,true); 
			

			svc.createDirectConnectGatewayAssociationProposal(params,cb);
		}
		
		service.CreateInterconnect=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"interconnectName",params,undefined,false); 
			copyArgs(n,"bandwidth",params,undefined,false); 
			copyArgs(n,"location",params,undefined,false); 
			
			copyArgs(n,"interconnectName",params,undefined,false); 
			copyArgs(n,"bandwidth",params,undefined,false); 
			copyArgs(n,"location",params,undefined,false); 
			copyArgs(n,"lagId",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"providerName",params,undefined,false); 
			
			copyArgs(msg,"interconnectName",params,undefined,false); 
			copyArgs(msg,"bandwidth",params,undefined,false); 
			copyArgs(msg,"location",params,undefined,false); 
			copyArgs(msg,"lagId",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"providerName",params,undefined,false); 
			

			svc.createInterconnect(params,cb);
		}
		
		service.CreateLag=function(svc,msg,cb){
			var params={};
			
			copyArgs(Number(n),"numberOfConnections",params,undefined,false); 
			copyArgs(n,"location",params,undefined,false); 
			copyArgs(n,"connectionsBandwidth",params,undefined,false); 
			copyArgs(n,"lagName",params,undefined,false); 
			
			copyArgs(Number(n),"numberOfConnections",params,undefined,false); 
			copyArgs(n,"location",params,undefined,false); 
			copyArgs(n,"connectionsBandwidth",params,undefined,false); 
			copyArgs(n,"lagName",params,undefined,false); 
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"childConnectionTags",params,undefined,true); 
			copyArgs(n,"providerName",params,undefined,false); 
			copyArgs(Boolean(n),"requestMACSec",params,undefined,false); 
			
			copyArgs(msg,"numberOfConnections",params,undefined,false); 
			copyArgs(msg,"location",params,undefined,false); 
			copyArgs(msg,"connectionsBandwidth",params,undefined,false); 
			copyArgs(msg,"lagName",params,undefined,false); 
			copyArgs(msg,"connectionId",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"childConnectionTags",params,undefined,true); 
			copyArgs(msg,"providerName",params,undefined,false); 
			copyArgs(msg,"requestMACSec",params,undefined,false); 
			

			svc.createLag(params,cb);
		}
		
		service.CreatePrivateVirtualInterface=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"newPrivateVirtualInterface",params,undefined,false); 
			
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"newPrivateVirtualInterface",params,undefined,false); 
			
			copyArgs(msg,"connectionId",params,undefined,false); 
			copyArgs(msg,"newPrivateVirtualInterface",params,undefined,false); 
			

			svc.createPrivateVirtualInterface(params,cb);
		}
		
		service.CreatePublicVirtualInterface=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"newPublicVirtualInterface",params,undefined,false); 
			
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"newPublicVirtualInterface",params,undefined,false); 
			
			copyArgs(msg,"connectionId",params,undefined,false); 
			copyArgs(msg,"newPublicVirtualInterface",params,undefined,false); 
			

			svc.createPublicVirtualInterface(params,cb);
		}
		
		service.CreateTransitVirtualInterface=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"newTransitVirtualInterface",params,undefined,false); 
			
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"newTransitVirtualInterface",params,undefined,false); 
			
			copyArgs(msg,"connectionId",params,undefined,false); 
			copyArgs(msg,"newTransitVirtualInterface",params,undefined,false); 
			

			svc.createTransitVirtualInterface(params,cb);
		}
		
		service.DeleteBGPPeer=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"virtualInterfaceId",params,undefined,false); 
			copyArgs(Number(n),"asn",params,undefined,false); 
			copyArgs(n,"customerAddress",params,undefined,false); 
			copyArgs(n,"bgpPeerId",params,undefined,false); 
			
			copyArgs(msg,"virtualInterfaceId",params,undefined,false); 
			copyArgs(msg,"asn",params,undefined,false); 
			copyArgs(msg,"customerAddress",params,undefined,false); 
			copyArgs(msg,"bgpPeerId",params,undefined,false); 
			

			svc.deleteBGPPeer(params,cb);
		}
		
		service.DeleteConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"connectionId",params,undefined,false); 
			
			copyArgs(n,"connectionId",params,undefined,false); 
			
			copyArgs(msg,"connectionId",params,undefined,false); 
			

			svc.deleteConnection(params,cb);
		}
		
		service.DeleteDirectConnectGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"directConnectGatewayId",params,undefined,false); 
			
			copyArgs(n,"directConnectGatewayId",params,undefined,false); 
			
			copyArgs(msg,"directConnectGatewayId",params,undefined,false); 
			

			svc.deleteDirectConnectGateway(params,cb);
		}
		
		service.DeleteDirectConnectGatewayAssociation=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"associationId",params,undefined,false); 
			copyArgs(n,"directConnectGatewayId",params,undefined,false); 
			copyArgs(n,"virtualGatewayId",params,undefined,false); 
			
			copyArgs(msg,"associationId",params,undefined,false); 
			copyArgs(msg,"directConnectGatewayId",params,undefined,false); 
			copyArgs(msg,"virtualGatewayId",params,undefined,false); 
			

			svc.deleteDirectConnectGatewayAssociation(params,cb);
		}
		
		service.DeleteDirectConnectGatewayAssociationProposal=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"proposalId",params,undefined,false); 
			
			copyArgs(n,"proposalId",params,undefined,false); 
			
			copyArgs(msg,"proposalId",params,undefined,false); 
			

			svc.deleteDirectConnectGatewayAssociationProposal(params,cb);
		}
		
		service.DeleteInterconnect=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"interconnectId",params,undefined,false); 
			
			copyArgs(n,"interconnectId",params,undefined,false); 
			
			copyArgs(msg,"interconnectId",params,undefined,false); 
			

			svc.deleteInterconnect(params,cb);
		}
		
		service.DeleteLag=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"lagId",params,undefined,false); 
			
			copyArgs(n,"lagId",params,undefined,false); 
			
			copyArgs(msg,"lagId",params,undefined,false); 
			

			svc.deleteLag(params,cb);
		}
		
		service.DeleteVirtualInterface=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"virtualInterfaceId",params,undefined,false); 
			
			copyArgs(n,"virtualInterfaceId",params,undefined,false); 
			
			copyArgs(msg,"virtualInterfaceId",params,undefined,false); 
			

			svc.deleteVirtualInterface(params,cb);
		}
		
		service.DescribeConnectionLoa=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"connectionId",params,undefined,false); 
			
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"providerName",params,undefined,false); 
			copyArgs(n,"loaContentType",params,undefined,false); 
			
			copyArgs(msg,"connectionId",params,undefined,false); 
			copyArgs(msg,"providerName",params,undefined,false); 
			copyArgs(msg,"loaContentType",params,undefined,false); 
			

			svc.describeConnectionLoa(params,cb);
		}
		
		service.DescribeConnections=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"connectionId",params,undefined,false); 
			
			copyArgs(msg,"connectionId",params,undefined,false); 
			

			svc.describeConnections(params,cb);
		}
		
		service.DescribeConnectionsOnInterconnect=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"interconnectId",params,undefined,false); 
			
			copyArgs(n,"interconnectId",params,undefined,false); 
			
			copyArgs(msg,"interconnectId",params,undefined,false); 
			

			svc.describeConnectionsOnInterconnect(params,cb);
		}
		
		service.DescribeDirectConnectGatewayAssociationProposals=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"directConnectGatewayId",params,undefined,false); 
			copyArgs(n,"proposalId",params,undefined,false); 
			copyArgs(n,"associatedGatewayId",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"directConnectGatewayId",params,undefined,false); 
			copyArgs(msg,"proposalId",params,undefined,false); 
			copyArgs(msg,"associatedGatewayId",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.describeDirectConnectGatewayAssociationProposals(params,cb);
		}
		
		service.DescribeDirectConnectGatewayAssociations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"associationId",params,undefined,false); 
			copyArgs(n,"associatedGatewayId",params,undefined,false); 
			copyArgs(n,"directConnectGatewayId",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"virtualGatewayId",params,undefined,false); 
			
			copyArgs(msg,"associationId",params,undefined,false); 
			copyArgs(msg,"associatedGatewayId",params,undefined,false); 
			copyArgs(msg,"directConnectGatewayId",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"virtualGatewayId",params,undefined,false); 
			

			svc.describeDirectConnectGatewayAssociations(params,cb);
		}
		
		service.DescribeDirectConnectGatewayAttachments=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"directConnectGatewayId",params,undefined,false); 
			copyArgs(n,"virtualInterfaceId",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"directConnectGatewayId",params,undefined,false); 
			copyArgs(msg,"virtualInterfaceId",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.describeDirectConnectGatewayAttachments(params,cb);
		}
		
		service.DescribeDirectConnectGateways=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"directConnectGatewayId",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"directConnectGatewayId",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.describeDirectConnectGateways(params,cb);
		}
		
		service.DescribeHostedConnections=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"connectionId",params,undefined,false); 
			
			copyArgs(n,"connectionId",params,undefined,false); 
			
			copyArgs(msg,"connectionId",params,undefined,false); 
			

			svc.describeHostedConnections(params,cb);
		}
		
		service.DescribeInterconnectLoa=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"interconnectId",params,undefined,false); 
			
			copyArgs(n,"interconnectId",params,undefined,false); 
			copyArgs(n,"providerName",params,undefined,false); 
			copyArgs(n,"loaContentType",params,undefined,false); 
			
			copyArgs(msg,"interconnectId",params,undefined,false); 
			copyArgs(msg,"providerName",params,undefined,false); 
			copyArgs(msg,"loaContentType",params,undefined,false); 
			

			svc.describeInterconnectLoa(params,cb);
		}
		
		service.DescribeInterconnects=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"interconnectId",params,undefined,false); 
			
			copyArgs(msg,"interconnectId",params,undefined,false); 
			

			svc.describeInterconnects(params,cb);
		}
		
		service.DescribeLags=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"lagId",params,undefined,false); 
			
			copyArgs(msg,"lagId",params,undefined,false); 
			

			svc.describeLags(params,cb);
		}
		
		service.DescribeLoa=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"connectionId",params,undefined,false); 
			
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"providerName",params,undefined,false); 
			copyArgs(n,"loaContentType",params,undefined,false); 
			
			copyArgs(msg,"connectionId",params,undefined,false); 
			copyArgs(msg,"providerName",params,undefined,false); 
			copyArgs(msg,"loaContentType",params,undefined,false); 
			

			svc.describeLoa(params,cb);
		}
		
		service.DescribeLocations=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeLocations(params,cb);
		}
		
		service.DescribeTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArns",params,undefined,false); 
			
			copyArgs(n,"resourceArns",params,undefined,false); 
			
			copyArgs(msg,"resourceArns",params,undefined,false); 
			

			svc.describeTags(params,cb);
		}
		
		service.DescribeVirtualGateways=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeVirtualGateways(params,cb);
		}
		
		service.DescribeVirtualInterfaces=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"virtualInterfaceId",params,undefined,false); 
			
			copyArgs(msg,"connectionId",params,undefined,false); 
			copyArgs(msg,"virtualInterfaceId",params,undefined,false); 
			

			svc.describeVirtualInterfaces(params,cb);
		}
		
		service.DisassociateConnectionFromLag=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"lagId",params,undefined,false); 
			
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"lagId",params,undefined,false); 
			
			copyArgs(msg,"connectionId",params,undefined,false); 
			copyArgs(msg,"lagId",params,undefined,false); 
			

			svc.disassociateConnectionFromLag(params,cb);
		}
		
		service.DisassociateMacSecKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"secretARN",params,undefined,false); 
			
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"secretARN",params,undefined,false); 
			
			copyArgs(msg,"connectionId",params,undefined,false); 
			copyArgs(msg,"secretARN",params,undefined,false); 
			

			svc.disassociateMacSecKey(params,cb);
		}
		
		service.ListVirtualInterfaceTestHistory=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"testId",params,undefined,false); 
			copyArgs(n,"virtualInterfaceId",params,undefined,false); 
			copyArgs(n,"bgpPeers",params,undefined,true); 
			copyArgs(n,"status",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"testId",params,undefined,false); 
			copyArgs(msg,"virtualInterfaceId",params,undefined,false); 
			copyArgs(msg,"bgpPeers",params,undefined,true); 
			copyArgs(msg,"status",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listVirtualInterfaceTestHistory(params,cb);
		}
		
		service.StartBgpFailoverTest=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"virtualInterfaceId",params,undefined,false); 
			
			copyArgs(n,"virtualInterfaceId",params,undefined,false); 
			copyArgs(n,"bgpPeers",params,undefined,true); 
			copyArgs(Number(n),"testDurationInMinutes",params,undefined,false); 
			
			copyArgs(msg,"virtualInterfaceId",params,undefined,false); 
			copyArgs(msg,"bgpPeers",params,undefined,true); 
			copyArgs(msg,"testDurationInMinutes",params,undefined,false); 
			

			svc.startBgpFailoverTest(params,cb);
		}
		
		service.StopBgpFailoverTest=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"virtualInterfaceId",params,undefined,false); 
			
			copyArgs(n,"virtualInterfaceId",params,undefined,false); 
			
			copyArgs(msg,"virtualInterfaceId",params,undefined,false); 
			

			svc.stopBgpFailoverTest(params,cb);
		}
		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
		
		service.UpdateConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"connectionId",params,undefined,false); 
			
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"connectionName",params,undefined,false); 
			copyArgs(n,"encryptionMode",params,undefined,false); 
			
			copyArgs(msg,"connectionId",params,undefined,false); 
			copyArgs(msg,"connectionName",params,undefined,false); 
			copyArgs(msg,"encryptionMode",params,undefined,false); 
			

			svc.updateConnection(params,cb);
		}
		
		service.UpdateDirectConnectGatewayAssociation=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"associationId",params,undefined,false); 
			copyArgs(n,"addAllowedPrefixesToDirectConnectGateway",params,undefined,true); 
			copyArgs(n,"removeAllowedPrefixesToDirectConnectGateway",params,undefined,true); 
			
			copyArgs(msg,"associationId",params,undefined,false); 
			copyArgs(msg,"addAllowedPrefixesToDirectConnectGateway",params,undefined,true); 
			copyArgs(msg,"removeAllowedPrefixesToDirectConnectGateway",params,undefined,true); 
			

			svc.updateDirectConnectGatewayAssociation(params,cb);
		}
		
		service.UpdateLag=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"lagId",params,undefined,false); 
			
			copyArgs(n,"lagId",params,undefined,false); 
			copyArgs(n,"lagName",params,undefined,false); 
			copyArgs(Number(n),"minimumLinks",params,undefined,false); 
			copyArgs(n,"encryptionMode",params,undefined,false); 
			
			copyArgs(msg,"lagId",params,undefined,false); 
			copyArgs(msg,"lagName",params,undefined,false); 
			copyArgs(msg,"minimumLinks",params,undefined,false); 
			copyArgs(msg,"encryptionMode",params,undefined,false); 
			

			svc.updateLag(params,cb);
		}
		
		service.UpdateVirtualInterfaceAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"virtualInterfaceId",params,undefined,false); 
			
			copyArgs(n,"virtualInterfaceId",params,undefined,false); 
			copyArgs(Number(n),"mtu",params,undefined,false); 
			
			copyArgs(msg,"virtualInterfaceId",params,undefined,false); 
			copyArgs(msg,"mtu",params,undefined,false); 
			

			svc.updateVirtualInterfaceAttributes(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS DirectConnect", AmazonAPINode);

};
