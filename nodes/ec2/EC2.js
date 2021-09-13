
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

		var awsService = new AWS.EC2( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.EC2(msg.AWSConfig) : awsService;

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
		
		service.AcceptReservedInstancesExchangeQuote=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReservedInstanceIds",params,undefined,true); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ReservedInstanceIds",params,undefined,true); 
			copyArgs(n,"TargetConfigurations",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ReservedInstanceIds",params,undefined,true); 
			copyArgs(msg,"TargetConfigurations",params,undefined,true); 
			

			svc.acceptReservedInstancesExchangeQuote(params,cb);
		}
		
		service.AcceptTransitGatewayMulticastDomainAssociations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TransitGatewayMulticastDomainId",params,undefined,false); 
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayMulticastDomainId",params,undefined,false); 
			copyArgs(msg,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(msg,"SubnetIds",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.acceptTransitGatewayMulticastDomainAssociations(params,cb);
		}
		
		service.AcceptTransitGatewayPeeringAttachment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.acceptTransitGatewayPeeringAttachment(params,cb);
		}
		
		service.AcceptTransitGatewayVpcAttachment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.acceptTransitGatewayVpcAttachment(params,cb);
		}
		
		service.AcceptVpcEndpointConnections=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServiceId",params,undefined,false); 
			copyArgs(n,"VpcEndpointIds",params,undefined,true); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ServiceId",params,undefined,false); 
			copyArgs(n,"VpcEndpointIds",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ServiceId",params,undefined,false); 
			copyArgs(msg,"VpcEndpointIds",params,undefined,true); 
			

			svc.acceptVpcEndpointConnections(params,cb);
		}
		
		service.AcceptVpcPeeringConnection=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"VpcPeeringConnectionId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"VpcPeeringConnectionId",params,undefined,false); 
			

			svc.acceptVpcPeeringConnection(params,cb);
		}
		
		service.AdvertiseByoipCidr=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Cidr",params,undefined,false); 
			
			copyArgs(n,"Cidr",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"Cidr",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.advertiseByoipCidr(params,cb);
		}
		
		service.AllocateAddress=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Domain",params,undefined,false); 
			copyArgs(n,"Address",params,undefined,false); 
			copyArgs(n,"PublicIpv4Pool",params,undefined,false); 
			copyArgs(n,"NetworkBorderGroup",params,undefined,false); 
			copyArgs(n,"CustomerOwnedIpv4Pool",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			
			copyArgs(msg,"Domain",params,undefined,false); 
			copyArgs(msg,"Address",params,undefined,false); 
			copyArgs(msg,"PublicIpv4Pool",params,undefined,false); 
			copyArgs(msg,"NetworkBorderGroup",params,undefined,false); 
			copyArgs(msg,"CustomerOwnedIpv4Pool",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			

			svc.allocateAddress(params,cb);
		}
		
		service.AllocateHosts=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AvailabilityZone",params,undefined,false); 
			copyArgs(Number(n),"Quantity",params,undefined,false); 
			
			copyArgs(n,"AutoPlacement",params,undefined,false); 
			copyArgs(n,"AvailabilityZone",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"InstanceType",params,undefined,false); 
			copyArgs(n,"InstanceFamily",params,undefined,false); 
			copyArgs(Number(n),"Quantity",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(n,"HostRecovery",params,undefined,false); 
			
			copyArgs(msg,"AutoPlacement",params,undefined,false); 
			copyArgs(msg,"AvailabilityZone",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"InstanceType",params,undefined,false); 
			copyArgs(msg,"InstanceFamily",params,undefined,false); 
			copyArgs(msg,"Quantity",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"HostRecovery",params,undefined,false); 
			

			svc.allocateHosts(params,cb);
		}
		
		service.ApplySecurityGroupsToClientVpnTargetNetwork=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"SecurityGroupIds",params,undefined,true); 
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"SecurityGroupIds",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			copyArgs(msg,"SecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.applySecurityGroupsToClientVpnTargetNetwork(params,cb);
		}
		
		service.AssignIpv6Addresses=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			
			copyArgs(Number(n),"Ipv6AddressCount",params,undefined,false); 
			copyArgs(n,"Ipv6Addresses",params,undefined,true); 
			copyArgs(Number(n),"Ipv6PrefixCount",params,undefined,false); 
			copyArgs(n,"Ipv6Prefixes",params,undefined,true); 
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			
			copyArgs(msg,"Ipv6AddressCount",params,undefined,false); 
			copyArgs(msg,"Ipv6Addresses",params,undefined,true); 
			copyArgs(msg,"Ipv6PrefixCount",params,undefined,false); 
			copyArgs(msg,"Ipv6Prefixes",params,undefined,true); 
			copyArgs(msg,"NetworkInterfaceId",params,undefined,false); 
			

			svc.assignIpv6Addresses(params,cb);
		}
		
		service.AssignPrivateIpAddresses=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			
			copyArgs(Boolean(n),"AllowReassignment",params,undefined,false); 
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(n,"PrivateIpAddresses",params,undefined,true); 
			copyArgs(Number(n),"SecondaryPrivateIpAddressCount",params,undefined,false); 
			copyArgs(n,"Ipv4Prefixes",params,undefined,true); 
			copyArgs(Number(n),"Ipv4PrefixCount",params,undefined,false); 
			
			copyArgs(msg,"AllowReassignment",params,undefined,false); 
			copyArgs(msg,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(msg,"PrivateIpAddresses",params,undefined,true); 
			copyArgs(msg,"SecondaryPrivateIpAddressCount",params,undefined,false); 
			copyArgs(msg,"Ipv4Prefixes",params,undefined,true); 
			copyArgs(msg,"Ipv4PrefixCount",params,undefined,false); 
			

			svc.assignPrivateIpAddresses(params,cb);
		}
		
		service.AssociateAddress=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AllocationId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"PublicIp",params,undefined,false); 
			copyArgs(Boolean(n),"AllowReassociation",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(n,"PrivateIpAddress",params,undefined,false); 
			
			copyArgs(msg,"AllocationId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"PublicIp",params,undefined,false); 
			copyArgs(msg,"AllowReassociation",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(msg,"PrivateIpAddress",params,undefined,false); 
			

			svc.associateAddress(params,cb);
		}
		
		service.AssociateClientVpnTargetNetwork=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(n,"SubnetId",params,undefined,false); 
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(n,"SubnetId",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(msg,"SubnetId",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.associateClientVpnTargetNetwork(params,cb);
		}
		
		service.AssociateDhcpOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DhcpOptionsId",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			
			copyArgs(n,"DhcpOptionsId",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"DhcpOptionsId",params,undefined,false); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.associateDhcpOptions(params,cb);
		}
		
		service.AssociateEnclaveCertificateIamRole=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CertificateArn",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"CertificateArn",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.associateEnclaveCertificateIamRole(params,cb);
		}
		
		service.AssociateIamInstanceProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IamInstanceProfile",params,undefined,true); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"IamInstanceProfile",params,undefined,true); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"IamInstanceProfile",params,undefined,true); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.associateIamInstanceProfile(params,cb);
		}
		
		service.AssociateInstanceEventWindow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceEventWindowId",params,undefined,false); 
			copyArgs(n,"AssociationTarget",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"InstanceEventWindowId",params,undefined,false); 
			copyArgs(n,"AssociationTarget",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"InstanceEventWindowId",params,undefined,false); 
			copyArgs(msg,"AssociationTarget",params,undefined,false); 
			

			svc.associateInstanceEventWindow(params,cb);
		}
		
		service.AssociateRouteTable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RouteTableId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"RouteTableId",params,undefined,false); 
			copyArgs(n,"SubnetId",params,undefined,false); 
			copyArgs(n,"GatewayId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"RouteTableId",params,undefined,false); 
			copyArgs(msg,"SubnetId",params,undefined,false); 
			copyArgs(msg,"GatewayId",params,undefined,false); 
			

			svc.associateRouteTable(params,cb);
		}
		
		service.AssociateSubnetCidrBlock=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Ipv6CidrBlock",params,undefined,false); 
			copyArgs(n,"SubnetId",params,undefined,false); 
			
			copyArgs(n,"Ipv6CidrBlock",params,undefined,false); 
			copyArgs(n,"SubnetId",params,undefined,false); 
			
			copyArgs(msg,"Ipv6CidrBlock",params,undefined,false); 
			copyArgs(msg,"SubnetId",params,undefined,false); 
			

			svc.associateSubnetCidrBlock(params,cb);
		}
		
		service.AssociateTransitGatewayMulticastDomain=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TransitGatewayMulticastDomainId",params,undefined,false); 
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayMulticastDomainId",params,undefined,false); 
			copyArgs(msg,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(msg,"SubnetIds",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.associateTransitGatewayMulticastDomain(params,cb);
		}
		
		service.AssociateTransitGatewayRouteTable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(msg,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.associateTransitGatewayRouteTable(params,cb);
		}
		
		service.AssociateTrunkInterface=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BranchInterfaceId",params,undefined,false); 
			copyArgs(n,"TrunkInterfaceId",params,undefined,false); 
			
			copyArgs(n,"BranchInterfaceId",params,undefined,false); 
			copyArgs(n,"TrunkInterfaceId",params,undefined,false); 
			copyArgs(Number(n),"VlanId",params,undefined,false); 
			copyArgs(Number(n),"GreKey",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"BranchInterfaceId",params,undefined,false); 
			copyArgs(msg,"TrunkInterfaceId",params,undefined,false); 
			copyArgs(msg,"VlanId",params,undefined,false); 
			copyArgs(msg,"GreKey",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.associateTrunkInterface(params,cb);
		}
		
		service.AssociateVpcCidrBlock=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpcId",params,undefined,false); 
			
			copyArgs(Boolean(n),"AmazonProvidedIpv6CidrBlock",params,undefined,false); 
			copyArgs(n,"CidrBlock",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"Ipv6CidrBlockNetworkBorderGroup",params,undefined,false); 
			copyArgs(n,"Ipv6Pool",params,undefined,false); 
			copyArgs(n,"Ipv6CidrBlock",params,undefined,false); 
			
			copyArgs(msg,"AmazonProvidedIpv6CidrBlock",params,undefined,false); 
			copyArgs(msg,"CidrBlock",params,undefined,false); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			copyArgs(msg,"Ipv6CidrBlockNetworkBorderGroup",params,undefined,false); 
			copyArgs(msg,"Ipv6Pool",params,undefined,false); 
			copyArgs(msg,"Ipv6CidrBlock",params,undefined,false); 
			

			svc.associateVpcCidrBlock(params,cb);
		}
		
		service.AttachClassicLinkVpc=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Groups",params,undefined,true); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Groups",params,undefined,true); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Groups",params,undefined,true); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			

			svc.attachClassicLinkVpc(params,cb);
		}
		
		service.AttachInternetGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InternetGatewayId",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"InternetGatewayId",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"InternetGatewayId",params,undefined,false); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			

			svc.attachInternetGateway(params,cb);
		}
		
		service.AttachNetworkInterface=function(svc,msg,cb){
			var params={};
			
			copyArgs(Number(n),"DeviceIndex",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			
			copyArgs(Number(n),"DeviceIndex",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(Number(n),"NetworkCardIndex",params,undefined,false); 
			
			copyArgs(msg,"DeviceIndex",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(msg,"NetworkCardIndex",params,undefined,false); 
			

			svc.attachNetworkInterface(params,cb);
		}
		
		service.AttachVolume=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Device",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"VolumeId",params,undefined,false); 
			
			copyArgs(n,"Device",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"VolumeId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"Device",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"VolumeId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.attachVolume(params,cb);
		}
		
		service.AttachVpnGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"VpnGatewayId",params,undefined,false); 
			
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"VpnGatewayId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"VpcId",params,undefined,false); 
			copyArgs(msg,"VpnGatewayId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.attachVpnGateway(params,cb);
		}
		
		service.AuthorizeClientVpnIngress=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(n,"TargetNetworkCidr",params,undefined,false); 
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(n,"TargetNetworkCidr",params,undefined,false); 
			copyArgs(n,"AccessGroupId",params,undefined,false); 
			copyArgs(Boolean(n),"AuthorizeAllGroups",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(msg,"TargetNetworkCidr",params,undefined,false); 
			copyArgs(msg,"AccessGroupId",params,undefined,false); 
			copyArgs(msg,"AuthorizeAllGroups",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.authorizeClientVpnIngress(params,cb);
		}
		
		service.AuthorizeSecurityGroupEgress=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"IpPermissions",params,undefined,true); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(n,"CidrIp",params,undefined,false); 
			copyArgs(Number(n),"FromPort",params,undefined,false); 
			copyArgs(n,"IpProtocol",params,undefined,false); 
			copyArgs(Number(n),"ToPort",params,undefined,false); 
			copyArgs(n,"SourceSecurityGroupName",params,undefined,false); 
			copyArgs(n,"SourceSecurityGroupOwnerId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"GroupId",params,undefined,false); 
			copyArgs(msg,"IpPermissions",params,undefined,true); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"CidrIp",params,undefined,false); 
			copyArgs(msg,"FromPort",params,undefined,false); 
			copyArgs(msg,"IpProtocol",params,undefined,false); 
			copyArgs(msg,"ToPort",params,undefined,false); 
			copyArgs(msg,"SourceSecurityGroupName",params,undefined,false); 
			copyArgs(msg,"SourceSecurityGroupOwnerId",params,undefined,false); 
			

			svc.authorizeSecurityGroupEgress(params,cb);
		}
		
		service.AuthorizeSecurityGroupIngress=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CidrIp",params,undefined,false); 
			copyArgs(Number(n),"FromPort",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"IpPermissions",params,undefined,true); 
			copyArgs(n,"IpProtocol",params,undefined,false); 
			copyArgs(n,"SourceSecurityGroupName",params,undefined,false); 
			copyArgs(n,"SourceSecurityGroupOwnerId",params,undefined,false); 
			copyArgs(Number(n),"ToPort",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			
			copyArgs(msg,"CidrIp",params,undefined,false); 
			copyArgs(msg,"FromPort",params,undefined,false); 
			copyArgs(msg,"GroupId",params,undefined,false); 
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"IpPermissions",params,undefined,true); 
			copyArgs(msg,"IpProtocol",params,undefined,false); 
			copyArgs(msg,"SourceSecurityGroupName",params,undefined,false); 
			copyArgs(msg,"SourceSecurityGroupOwnerId",params,undefined,false); 
			copyArgs(msg,"ToPort",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			

			svc.authorizeSecurityGroupIngress(params,cb);
		}
		
		service.BundleInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Storage",params,undefined,true); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Storage",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"Storage",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.bundleInstance(params,cb);
		}
		
		service.CancelBundleTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BundleId",params,undefined,false); 
			
			copyArgs(n,"BundleId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"BundleId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.cancelBundleTask(params,cb);
		}
		
		service.CancelCapacityReservation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CapacityReservationId",params,undefined,false); 
			
			copyArgs(n,"CapacityReservationId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"CapacityReservationId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.cancelCapacityReservation(params,cb);
		}
		
		service.CancelConversionTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConversionTaskId",params,undefined,false); 
			
			copyArgs(n,"ConversionTaskId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ReasonMessage",params,undefined,false); 
			
			copyArgs(msg,"ConversionTaskId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ReasonMessage",params,undefined,false); 
			

			svc.cancelConversionTask(params,cb);
		}
		
		service.CancelExportTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ExportTaskId",params,undefined,false); 
			
			copyArgs(n,"ExportTaskId",params,undefined,false); 
			
			copyArgs(msg,"ExportTaskId",params,undefined,false); 
			

			svc.cancelExportTask(params,cb);
		}
		
		service.CancelImportTask=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CancelReason",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ImportTaskId",params,undefined,false); 
			
			copyArgs(msg,"CancelReason",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ImportTaskId",params,undefined,false); 
			

			svc.cancelImportTask(params,cb);
		}
		
		service.CancelReservedInstancesListing=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReservedInstancesListingId",params,undefined,false); 
			
			copyArgs(n,"ReservedInstancesListingId",params,undefined,false); 
			
			copyArgs(msg,"ReservedInstancesListingId",params,undefined,false); 
			

			svc.cancelReservedInstancesListing(params,cb);
		}
		
		service.CancelSpotFleetRequests=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SpotFleetRequestIds",params,undefined,true); 
			copyArgs(Boolean(n),"TerminateInstances",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"SpotFleetRequestIds",params,undefined,true); 
			copyArgs(Boolean(n),"TerminateInstances",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"SpotFleetRequestIds",params,undefined,true); 
			copyArgs(msg,"TerminateInstances",params,undefined,false); 
			

			svc.cancelSpotFleetRequests(params,cb);
		}
		
		service.CancelSpotInstanceRequests=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SpotInstanceRequestIds",params,undefined,true); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"SpotInstanceRequestIds",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"SpotInstanceRequestIds",params,undefined,true); 
			

			svc.cancelSpotInstanceRequests(params,cb);
		}
		
		service.ConfirmProductInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"ProductCode",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"ProductCode",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"ProductCode",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.confirmProductInstance(params,cb);
		}
		
		service.CopyFpgaImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceFpgaImageId",params,undefined,false); 
			copyArgs(n,"SourceRegion",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"SourceFpgaImageId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"SourceRegion",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"SourceFpgaImageId",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"SourceRegion",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.copyFpgaImage(params,cb);
		}
		
		service.CopyImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"SourceImageId",params,undefined,false); 
			copyArgs(n,"SourceRegion",params,undefined,false); 
			
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(Boolean(n),"Encrypted",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"SourceImageId",params,undefined,false); 
			copyArgs(n,"SourceRegion",params,undefined,false); 
			copyArgs(n,"DestinationOutpostArn",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Encrypted",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"SourceImageId",params,undefined,false); 
			copyArgs(msg,"SourceRegion",params,undefined,false); 
			copyArgs(msg,"DestinationOutpostArn",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.copyImage(params,cb);
		}
		
		service.CopySnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceRegion",params,undefined,false); 
			copyArgs(n,"SourceSnapshotId",params,undefined,false); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"DestinationOutpostArn",params,undefined,false); 
			copyArgs(n,"DestinationRegion",params,undefined,false); 
			copyArgs(Boolean(n),"Encrypted",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"PresignedUrl",params,undefined,false); 
			copyArgs(n,"SourceRegion",params,undefined,false); 
			copyArgs(n,"SourceSnapshotId",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DestinationOutpostArn",params,undefined,false); 
			copyArgs(msg,"DestinationRegion",params,undefined,false); 
			copyArgs(msg,"Encrypted",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"PresignedUrl",params,undefined,false); 
			copyArgs(msg,"SourceRegion",params,undefined,false); 
			copyArgs(msg,"SourceSnapshotId",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.copySnapshot(params,cb);
		}
		
		service.CreateCapacityReservation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceType",params,undefined,false); 
			copyArgs(n,"InstancePlatform",params,undefined,false); 
			copyArgs(Number(n),"InstanceCount",params,undefined,false); 
			
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"InstanceType",params,undefined,false); 
			copyArgs(n,"InstancePlatform",params,undefined,false); 
			copyArgs(n,"AvailabilityZone",params,undefined,false); 
			copyArgs(n,"AvailabilityZoneId",params,undefined,false); 
			copyArgs(n,"Tenancy",params,undefined,false); 
			copyArgs(Number(n),"InstanceCount",params,undefined,false); 
			copyArgs(Boolean(n),"EbsOptimized",params,undefined,false); 
			copyArgs(Boolean(n),"EphemeralStorage",params,undefined,false); 
			copyArgs(n,"EndDate",params,undefined,false); 
			copyArgs(n,"EndDateType",params,undefined,false); 
			copyArgs(n,"InstanceMatchCriteria",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"OutpostArn",params,undefined,false); 
			
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"InstanceType",params,undefined,false); 
			copyArgs(msg,"InstancePlatform",params,undefined,false); 
			copyArgs(msg,"AvailabilityZone",params,undefined,false); 
			copyArgs(msg,"AvailabilityZoneId",params,undefined,false); 
			copyArgs(msg,"Tenancy",params,undefined,false); 
			copyArgs(msg,"InstanceCount",params,undefined,false); 
			copyArgs(msg,"EbsOptimized",params,undefined,false); 
			copyArgs(msg,"EphemeralStorage",params,undefined,false); 
			copyArgs(msg,"EndDate",params,undefined,false); 
			copyArgs(msg,"EndDateType",params,undefined,false); 
			copyArgs(msg,"InstanceMatchCriteria",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"OutpostArn",params,undefined,false); 
			

			svc.createCapacityReservation(params,cb);
		}
		
		service.CreateCarrierGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpcId",params,undefined,false); 
			
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"VpcId",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.createCarrierGateway(params,cb);
		}
		
		service.CreateClientVpnEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientCidrBlock",params,undefined,false); 
			copyArgs(n,"ServerCertificateArn",params,undefined,false); 
			copyArgs(n,"AuthenticationOptions",params,undefined,false); 
			copyArgs(n,"ConnectionLogOptions",params,undefined,true); 
			
			copyArgs(n,"ClientCidrBlock",params,undefined,false); 
			copyArgs(n,"ServerCertificateArn",params,undefined,false); 
			copyArgs(n,"AuthenticationOptions",params,undefined,false); 
			copyArgs(n,"ConnectionLogOptions",params,undefined,true); 
			copyArgs(n,"DnsServers",params,undefined,true); 
			copyArgs(n,"TransportProtocol",params,undefined,false); 
			copyArgs(Number(n),"VpnPort",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(Boolean(n),"SplitTunnel",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(n,"SecurityGroupIds",params,undefined,true); 
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"SelfServicePortal",params,undefined,false); 
			copyArgs(n,"ClientConnectOptions",params,undefined,true); 
			
			copyArgs(msg,"ClientCidrBlock",params,undefined,false); 
			copyArgs(msg,"ServerCertificateArn",params,undefined,false); 
			copyArgs(msg,"AuthenticationOptions",params,undefined,false); 
			copyArgs(msg,"ConnectionLogOptions",params,undefined,true); 
			copyArgs(msg,"DnsServers",params,undefined,true); 
			copyArgs(msg,"TransportProtocol",params,undefined,false); 
			copyArgs(msg,"VpnPort",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"SplitTunnel",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"SecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			copyArgs(msg,"SelfServicePortal",params,undefined,false); 
			copyArgs(msg,"ClientConnectOptions",params,undefined,true); 
			

			svc.createClientVpnEndpoint(params,cb);
		}
		
		service.CreateClientVpnRoute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(n,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(n,"TargetVpcSubnetId",params,undefined,false); 
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(n,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(n,"TargetVpcSubnetId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(msg,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(msg,"TargetVpcSubnetId",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.createClientVpnRoute(params,cb);
		}
		
		service.CreateCustomerGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(Number(n),"BgpAsn",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(Number(n),"BgpAsn",params,undefined,false); 
			copyArgs(n,"PublicIp",params,undefined,false); 
			copyArgs(n,"CertificateArn",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(n,"DeviceName",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"BgpAsn",params,undefined,false); 
			copyArgs(msg,"PublicIp",params,undefined,false); 
			copyArgs(msg,"CertificateArn",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"DeviceName",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.createCustomerGateway(params,cb);
		}
		
		service.CreateDefaultSubnet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AvailabilityZone",params,undefined,false); 
			
			copyArgs(n,"AvailabilityZone",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"AvailabilityZone",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.createDefaultSubnet(params,cb);
		}
		
		service.CreateDefaultVpc=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.createDefaultVpc(params,cb);
		}
		
		service.CreateDhcpOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DhcpConfigurations",params,undefined,false); 
			
			copyArgs(n,"DhcpConfigurations",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"DhcpConfigurations",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.createDhcpOptions(params,cb);
		}
		
		service.CreateEgressOnlyInternetGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpcId",params,undefined,false); 
			
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			

			svc.createEgressOnlyInternetGateway(params,cb);
		}
		
		service.CreateFleet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LaunchTemplateConfigs",params,undefined,true); 
			copyArgs(n,"TargetCapacitySpecification",params,undefined,true); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"SpotOptions",params,undefined,false); 
			copyArgs(n,"OnDemandOptions",params,undefined,false); 
			copyArgs(n,"ExcessCapacityTerminationPolicy",params,undefined,false); 
			copyArgs(n,"LaunchTemplateConfigs",params,undefined,true); 
			copyArgs(n,"TargetCapacitySpecification",params,undefined,true); 
			copyArgs(Boolean(n),"TerminateInstancesWithExpiration",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"ValidFrom",params,undefined,false); 
			copyArgs(n,"ValidUntil",params,undefined,false); 
			copyArgs(Boolean(n),"ReplaceUnhealthyInstances",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(n,"Context",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"SpotOptions",params,undefined,false); 
			copyArgs(msg,"OnDemandOptions",params,undefined,false); 
			copyArgs(msg,"ExcessCapacityTerminationPolicy",params,undefined,false); 
			copyArgs(msg,"LaunchTemplateConfigs",params,undefined,true); 
			copyArgs(msg,"TargetCapacitySpecification",params,undefined,true); 
			copyArgs(msg,"TerminateInstancesWithExpiration",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"ValidFrom",params,undefined,false); 
			copyArgs(msg,"ValidUntil",params,undefined,false); 
			copyArgs(msg,"ReplaceUnhealthyInstances",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"Context",params,undefined,false); 
			

			svc.createFleet(params,cb);
		}
		
		service.CreateFlowLogs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceIds",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"TrafficType",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"DeliverLogsPermissionArn",params,undefined,false); 
			copyArgs(n,"LogGroupName",params,undefined,false); 
			copyArgs(n,"ResourceIds",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"TrafficType",params,undefined,false); 
			copyArgs(n,"LogDestinationType",params,undefined,false); 
			copyArgs(n,"LogDestination",params,undefined,false); 
			copyArgs(n,"LogFormat",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(Number(n),"MaxAggregationInterval",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"DeliverLogsPermissionArn",params,undefined,false); 
			copyArgs(msg,"LogGroupName",params,undefined,false); 
			copyArgs(msg,"ResourceIds",params,undefined,false); 
			copyArgs(msg,"ResourceType",params,undefined,false); 
			copyArgs(msg,"TrafficType",params,undefined,false); 
			copyArgs(msg,"LogDestinationType",params,undefined,false); 
			copyArgs(msg,"LogDestination",params,undefined,false); 
			copyArgs(msg,"LogFormat",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"MaxAggregationInterval",params,undefined,false); 
			

			svc.createFlowLogs(params,cb);
		}
		
		service.CreateFpgaImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InputStorageLocation",params,undefined,true); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"InputStorageLocation",params,undefined,true); 
			copyArgs(n,"LogsStorageLocation",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"InputStorageLocation",params,undefined,true); 
			copyArgs(msg,"LogsStorageLocation",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			

			svc.createFpgaImage(params,cb);
		}
		
		service.CreateImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"BlockDeviceMappings",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(Boolean(n),"NoReboot",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			
			copyArgs(msg,"BlockDeviceMappings",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"NoReboot",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			

			svc.createImage(params,cb);
		}
		
		service.CreateInstanceEventWindow=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"TimeRanges",params,undefined,true); 
			copyArgs(n,"CronExpression",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"TimeRanges",params,undefined,true); 
			copyArgs(msg,"CronExpression",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			

			svc.createInstanceEventWindow(params,cb);
		}
		
		service.CreateInstanceExportTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ExportToS3Task",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"TargetEnvironment",params,undefined,false); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"ExportToS3Task",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"TargetEnvironment",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"ExportToS3Task",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"TargetEnvironment",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			

			svc.createInstanceExportTask(params,cb);
		}
		
		service.CreateInternetGateway=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.createInternetGateway(params,cb);
		}
		
		service.CreateKeyPair=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyName",params,undefined,false); 
			
			copyArgs(n,"KeyName",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"KeyType",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			
			copyArgs(msg,"KeyName",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"KeyType",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			

			svc.createKeyPair(params,cb);
		}
		
		service.CreateLaunchTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LaunchTemplateName",params,undefined,false); 
			copyArgs(n,"LaunchTemplateData",params,undefined,true); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"LaunchTemplateName",params,undefined,false); 
			copyArgs(n,"VersionDescription",params,undefined,false); 
			copyArgs(n,"LaunchTemplateData",params,undefined,true); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"LaunchTemplateName",params,undefined,false); 
			copyArgs(msg,"VersionDescription",params,undefined,false); 
			copyArgs(msg,"LaunchTemplateData",params,undefined,true); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			

			svc.createLaunchTemplate(params,cb);
		}
		
		service.CreateLaunchTemplateVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LaunchTemplateData",params,undefined,true); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"LaunchTemplateId",params,undefined,false); 
			copyArgs(n,"LaunchTemplateName",params,undefined,false); 
			copyArgs(n,"SourceVersion",params,undefined,false); 
			copyArgs(n,"VersionDescription",params,undefined,false); 
			copyArgs(n,"LaunchTemplateData",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"LaunchTemplateId",params,undefined,false); 
			copyArgs(msg,"LaunchTemplateName",params,undefined,false); 
			copyArgs(msg,"SourceVersion",params,undefined,false); 
			copyArgs(msg,"VersionDescription",params,undefined,false); 
			copyArgs(msg,"LaunchTemplateData",params,undefined,true); 
			

			svc.createLaunchTemplateVersion(params,cb);
		}
		
		service.CreateLocalGatewayRoute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(n,"LocalGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"LocalGatewayVirtualInterfaceGroupId",params,undefined,false); 
			
			copyArgs(n,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(n,"LocalGatewayRouteTableId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"LocalGatewayVirtualInterfaceGroupId",params,undefined,false); 
			
			copyArgs(msg,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(msg,"LocalGatewayRouteTableId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"LocalGatewayVirtualInterfaceGroupId",params,undefined,false); 
			

			svc.createLocalGatewayRoute(params,cb);
		}
		
		service.CreateLocalGatewayRouteTableVpcAssociation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LocalGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			
			copyArgs(n,"LocalGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"LocalGatewayRouteTableId",params,undefined,false); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.createLocalGatewayRouteTableVpcAssociation(params,cb);
		}
		
		service.CreateManagedPrefixList=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PrefixListName",params,undefined,false); 
			copyArgs(Number(n),"MaxEntries",params,undefined,false); 
			copyArgs(n,"AddressFamily",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"PrefixListName",params,undefined,false); 
			copyArgs(n,"Entries",params,undefined,true); 
			copyArgs(Number(n),"MaxEntries",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(n,"AddressFamily",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"PrefixListName",params,undefined,false); 
			copyArgs(msg,"Entries",params,undefined,true); 
			copyArgs(msg,"MaxEntries",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"AddressFamily",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.createManagedPrefixList(params,cb);
		}
		
		service.CreateNatGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubnetId",params,undefined,false); 
			
			copyArgs(n,"AllocationId",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"SubnetId",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(n,"ConnectivityType",params,undefined,false); 
			
			copyArgs(msg,"AllocationId",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"SubnetId",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"ConnectivityType",params,undefined,false); 
			

			svc.createNatGateway(params,cb);
		}
		
		service.CreateNetworkAcl=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpcId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			

			svc.createNetworkAcl(params,cb);
		}
		
		service.CreateNetworkAclEntry=function(svc,msg,cb){
			var params={};
			
			copyArgs(Boolean(n),"Egress",params,undefined,false); 
			copyArgs(n,"NetworkAclId",params,undefined,false); 
			copyArgs(n,"Protocol",params,undefined,false); 
			copyArgs(n,"RuleAction",params,undefined,false); 
			copyArgs(Number(n),"RuleNumber",params,undefined,false); 
			
			copyArgs(n,"CidrBlock",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(Boolean(n),"Egress",params,undefined,false); 
			copyArgs(n,"IcmpTypeCode",params,undefined,true); 
			copyArgs(n,"Ipv6CidrBlock",params,undefined,false); 
			copyArgs(n,"NetworkAclId",params,undefined,false); 
			copyArgs(n,"PortRange",params,undefined,true); 
			copyArgs(n,"Protocol",params,undefined,false); 
			copyArgs(n,"RuleAction",params,undefined,false); 
			copyArgs(Number(n),"RuleNumber",params,undefined,false); 
			
			copyArgs(msg,"CidrBlock",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Egress",params,undefined,false); 
			copyArgs(msg,"IcmpTypeCode",params,undefined,true); 
			copyArgs(msg,"Ipv6CidrBlock",params,undefined,false); 
			copyArgs(msg,"NetworkAclId",params,undefined,false); 
			copyArgs(msg,"PortRange",params,undefined,true); 
			copyArgs(msg,"Protocol",params,undefined,false); 
			copyArgs(msg,"RuleAction",params,undefined,false); 
			copyArgs(msg,"RuleNumber",params,undefined,false); 
			

			svc.createNetworkAclEntry(params,cb);
		}
		
		service.CreateNetworkInsightsPath=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Source",params,undefined,false); 
			copyArgs(n,"Destination",params,undefined,false); 
			copyArgs(n,"Protocol",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(n,"SourceIp",params,undefined,false); 
			copyArgs(n,"DestinationIp",params,undefined,false); 
			copyArgs(n,"Source",params,undefined,false); 
			copyArgs(n,"Destination",params,undefined,false); 
			copyArgs(n,"Protocol",params,undefined,false); 
			copyArgs(Number(n),"DestinationPort",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"SourceIp",params,undefined,false); 
			copyArgs(msg,"DestinationIp",params,undefined,false); 
			copyArgs(msg,"Source",params,undefined,false); 
			copyArgs(msg,"Destination",params,undefined,false); 
			copyArgs(msg,"Protocol",params,undefined,false); 
			copyArgs(msg,"DestinationPort",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.createNetworkInsightsPath(params,cb);
		}
		
		service.CreateNetworkInterface=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubnetId",params,undefined,false); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Groups",params,undefined,true); 
			copyArgs(Number(n),"Ipv6AddressCount",params,undefined,false); 
			copyArgs(n,"Ipv6Addresses",params,undefined,true); 
			copyArgs(n,"PrivateIpAddress",params,undefined,false); 
			copyArgs(n,"PrivateIpAddresses",params,undefined,true); 
			copyArgs(Number(n),"SecondaryPrivateIpAddressCount",params,undefined,false); 
			copyArgs(n,"Ipv4Prefixes",params,undefined,true); 
			copyArgs(Number(n),"Ipv4PrefixCount",params,undefined,false); 
			copyArgs(n,"Ipv6Prefixes",params,undefined,true); 
			copyArgs(Number(n),"Ipv6PrefixCount",params,undefined,false); 
			copyArgs(n,"InterfaceType",params,undefined,false); 
			copyArgs(n,"SubnetId",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Groups",params,undefined,true); 
			copyArgs(msg,"Ipv6AddressCount",params,undefined,false); 
			copyArgs(msg,"Ipv6Addresses",params,undefined,true); 
			copyArgs(msg,"PrivateIpAddress",params,undefined,false); 
			copyArgs(msg,"PrivateIpAddresses",params,undefined,true); 
			copyArgs(msg,"SecondaryPrivateIpAddressCount",params,undefined,false); 
			copyArgs(msg,"Ipv4Prefixes",params,undefined,true); 
			copyArgs(msg,"Ipv4PrefixCount",params,undefined,false); 
			copyArgs(msg,"Ipv6Prefixes",params,undefined,true); 
			copyArgs(msg,"Ipv6PrefixCount",params,undefined,false); 
			copyArgs(msg,"InterfaceType",params,undefined,false); 
			copyArgs(msg,"SubnetId",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.createNetworkInterface(params,cb);
		}
		
		service.CreateNetworkInterfacePermission=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(n,"Permission",params,undefined,false); 
			
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"AwsService",params,undefined,false); 
			copyArgs(n,"Permission",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"AwsService",params,undefined,false); 
			copyArgs(msg,"Permission",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.createNetworkInterfacePermission(params,cb);
		}
		
		service.CreatePlacementGroup=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"Strategy",params,undefined,false); 
			copyArgs(Number(n),"PartitionCount",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"Strategy",params,undefined,false); 
			copyArgs(msg,"PartitionCount",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			

			svc.createPlacementGroup(params,cb);
		}
		
		service.CreateReplaceRootVolumeTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"SnapshotId",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"SnapshotId",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			

			svc.createReplaceRootVolumeTask(params,cb);
		}
		
		service.CreateReservedInstancesListing=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(Number(n),"InstanceCount",params,undefined,false); 
			copyArgs(n,"PriceSchedules",params,undefined,false); 
			copyArgs(n,"ReservedInstancesId",params,undefined,false); 
			
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(Number(n),"InstanceCount",params,undefined,false); 
			copyArgs(n,"PriceSchedules",params,undefined,false); 
			copyArgs(n,"ReservedInstancesId",params,undefined,false); 
			
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"InstanceCount",params,undefined,false); 
			copyArgs(msg,"PriceSchedules",params,undefined,false); 
			copyArgs(msg,"ReservedInstancesId",params,undefined,false); 
			

			svc.createReservedInstancesListing(params,cb);
		}
		
		service.CreateRestoreImageTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ObjectKey",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"ObjectKey",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"ObjectKey",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.createRestoreImageTask(params,cb);
		}
		
		service.CreateRoute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RouteTableId",params,undefined,false); 
			
			copyArgs(n,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(n,"DestinationIpv6CidrBlock",params,undefined,false); 
			copyArgs(n,"DestinationPrefixListId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"VpcEndpointId",params,undefined,false); 
			copyArgs(n,"EgressOnlyInternetGatewayId",params,undefined,false); 
			copyArgs(n,"GatewayId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"NatGatewayId",params,undefined,false); 
			copyArgs(n,"TransitGatewayId",params,undefined,false); 
			copyArgs(n,"LocalGatewayId",params,undefined,false); 
			copyArgs(n,"CarrierGatewayId",params,undefined,false); 
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(n,"RouteTableId",params,undefined,false); 
			copyArgs(n,"VpcPeeringConnectionId",params,undefined,false); 
			
			copyArgs(msg,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(msg,"DestinationIpv6CidrBlock",params,undefined,false); 
			copyArgs(msg,"DestinationPrefixListId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"VpcEndpointId",params,undefined,false); 
			copyArgs(msg,"EgressOnlyInternetGatewayId",params,undefined,false); 
			copyArgs(msg,"GatewayId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"NatGatewayId",params,undefined,false); 
			copyArgs(msg,"TransitGatewayId",params,undefined,false); 
			copyArgs(msg,"LocalGatewayId",params,undefined,false); 
			copyArgs(msg,"CarrierGatewayId",params,undefined,false); 
			copyArgs(msg,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(msg,"RouteTableId",params,undefined,false); 
			copyArgs(msg,"VpcPeeringConnectionId",params,undefined,false); 
			

			svc.createRoute(params,cb);
		}
		
		service.CreateRouteTable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpcId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			

			svc.createRouteTable(params,cb);
		}
		
		service.CreateSecurityGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"GroupName",params,undefined,false); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.createSecurityGroup(params,cb);
		}
		
		service.CreateSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VolumeId",params,undefined,false); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"OutpostArn",params,undefined,false); 
			copyArgs(n,"VolumeId",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"OutpostArn",params,undefined,false); 
			copyArgs(msg,"VolumeId",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.createSnapshot(params,cb);
		}
		
		service.CreateSnapshots=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceSpecification",params,undefined,false); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"InstanceSpecification",params,undefined,false); 
			copyArgs(n,"OutpostArn",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"CopyTagsFromSource",params,undefined,false); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"InstanceSpecification",params,undefined,false); 
			copyArgs(msg,"OutpostArn",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"CopyTagsFromSource",params,undefined,false); 
			

			svc.createSnapshots(params,cb);
		}
		
		service.CreateSpotDatafeedSubscription=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Prefix",params,undefined,false); 
			
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Prefix",params,undefined,false); 
			

			svc.createSpotDatafeedSubscription(params,cb);
		}
		
		service.CreateStoreImageTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ImageId",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			
			copyArgs(n,"ImageId",params,undefined,false); 
			copyArgs(n,"Bucket",params,undefined,false); 
			copyArgs(n,"S3ObjectTags",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ImageId",params,undefined,false); 
			copyArgs(msg,"Bucket",params,undefined,false); 
			copyArgs(msg,"S3ObjectTags",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.createStoreImageTask(params,cb);
		}
		
		service.CreateSubnet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"CidrBlock",params,undefined,false); 
			
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(n,"AvailabilityZone",params,undefined,false); 
			copyArgs(n,"AvailabilityZoneId",params,undefined,false); 
			copyArgs(n,"Ipv6CidrBlock",params,undefined,false); 
			copyArgs(n,"OutpostArn",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"CidrBlock",params,undefined,false); 
			
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"AvailabilityZone",params,undefined,false); 
			copyArgs(msg,"AvailabilityZoneId",params,undefined,false); 
			copyArgs(msg,"Ipv6CidrBlock",params,undefined,false); 
			copyArgs(msg,"OutpostArn",params,undefined,false); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"CidrBlock",params,undefined,false); 
			

			svc.createSubnet(params,cb);
		}
		
		service.CreateSubnetCidrReservation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubnetId",params,undefined,false); 
			copyArgs(n,"Cidr",params,undefined,false); 
			copyArgs(n,"ReservationType",params,undefined,false); 
			
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(n,"SubnetId",params,undefined,false); 
			copyArgs(n,"Cidr",params,undefined,false); 
			copyArgs(n,"ReservationType",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"SubnetId",params,undefined,false); 
			copyArgs(msg,"Cidr",params,undefined,false); 
			copyArgs(msg,"ReservationType",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.createSubnetCidrReservation(params,cb);
		}
		
		service.CreateTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Resources",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Resources",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Resources",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createTags(params,cb);
		}
		
		service.CreateTrafficMirrorFilter=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.createTrafficMirrorFilter(params,cb);
		}
		
		service.CreateTrafficMirrorFilterRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrafficMirrorFilterId",params,undefined,false); 
			copyArgs(n,"TrafficDirection",params,undefined,false); 
			copyArgs(Number(n),"RuleNumber",params,undefined,false); 
			copyArgs(n,"RuleAction",params,undefined,false); 
			copyArgs(n,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(n,"SourceCidrBlock",params,undefined,false); 
			
			copyArgs(n,"TrafficMirrorFilterId",params,undefined,false); 
			copyArgs(n,"TrafficDirection",params,undefined,false); 
			copyArgs(Number(n),"RuleNumber",params,undefined,false); 
			copyArgs(n,"RuleAction",params,undefined,false); 
			copyArgs(n,"DestinationPortRange",params,undefined,true); 
			copyArgs(n,"SourcePortRange",params,undefined,true); 
			copyArgs(Number(n),"Protocol",params,undefined,false); 
			copyArgs(n,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(n,"SourceCidrBlock",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"TrafficMirrorFilterId",params,undefined,false); 
			copyArgs(msg,"TrafficDirection",params,undefined,false); 
			copyArgs(msg,"RuleNumber",params,undefined,false); 
			copyArgs(msg,"RuleAction",params,undefined,false); 
			copyArgs(msg,"DestinationPortRange",params,undefined,true); 
			copyArgs(msg,"SourcePortRange",params,undefined,true); 
			copyArgs(msg,"Protocol",params,undefined,false); 
			copyArgs(msg,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(msg,"SourceCidrBlock",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.createTrafficMirrorFilterRule(params,cb);
		}
		
		service.CreateTrafficMirrorSession=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(n,"TrafficMirrorTargetId",params,undefined,false); 
			copyArgs(n,"TrafficMirrorFilterId",params,undefined,false); 
			copyArgs(Number(n),"SessionNumber",params,undefined,false); 
			
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(n,"TrafficMirrorTargetId",params,undefined,false); 
			copyArgs(n,"TrafficMirrorFilterId",params,undefined,false); 
			copyArgs(Number(n),"PacketLength",params,undefined,false); 
			copyArgs(Number(n),"SessionNumber",params,undefined,false); 
			copyArgs(Number(n),"VirtualNetworkId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(msg,"TrafficMirrorTargetId",params,undefined,false); 
			copyArgs(msg,"TrafficMirrorFilterId",params,undefined,false); 
			copyArgs(msg,"PacketLength",params,undefined,false); 
			copyArgs(msg,"SessionNumber",params,undefined,false); 
			copyArgs(msg,"VirtualNetworkId",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.createTrafficMirrorSession(params,cb);
		}
		
		service.CreateTrafficMirrorTarget=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(n,"NetworkLoadBalancerArn",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(msg,"NetworkLoadBalancerArn",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.createTrafficMirrorTarget(params,cb);
		}
		
		service.CreateTransitGateway=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Options",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Options",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.createTransitGateway(params,cb);
		}
		
		service.CreateTransitGatewayConnect=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransportTransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(n,"Options",params,undefined,false); 
			
			copyArgs(n,"TransportTransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(n,"Options",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransportTransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(msg,"Options",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.createTransitGatewayConnect(params,cb);
		}
		
		service.CreateTransitGatewayConnectPeer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(n,"PeerAddress",params,undefined,false); 
			copyArgs(n,"InsideCidrBlocks",params,undefined,true); 
			
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(n,"TransitGatewayAddress",params,undefined,false); 
			copyArgs(n,"PeerAddress",params,undefined,false); 
			copyArgs(n,"BgpOptions",params,undefined,false); 
			copyArgs(n,"InsideCidrBlocks",params,undefined,true); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(msg,"TransitGatewayAddress",params,undefined,false); 
			copyArgs(msg,"PeerAddress",params,undefined,false); 
			copyArgs(msg,"BgpOptions",params,undefined,false); 
			copyArgs(msg,"InsideCidrBlocks",params,undefined,true); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.createTransitGatewayConnectPeer(params,cb);
		}
		
		service.CreateTransitGatewayMulticastDomain=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayId",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayId",params,undefined,false); 
			copyArgs(n,"Options",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayId",params,undefined,false); 
			copyArgs(msg,"Options",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.createTransitGatewayMulticastDomain(params,cb);
		}
		
		service.CreateTransitGatewayPeeringAttachment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayId",params,undefined,false); 
			copyArgs(n,"PeerTransitGatewayId",params,undefined,false); 
			copyArgs(n,"PeerAccountId",params,undefined,false); 
			copyArgs(n,"PeerRegion",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayId",params,undefined,false); 
			copyArgs(n,"PeerTransitGatewayId",params,undefined,false); 
			copyArgs(n,"PeerAccountId",params,undefined,false); 
			copyArgs(n,"PeerRegion",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayId",params,undefined,false); 
			copyArgs(msg,"PeerTransitGatewayId",params,undefined,false); 
			copyArgs(msg,"PeerAccountId",params,undefined,false); 
			copyArgs(msg,"PeerRegion",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.createTransitGatewayPeeringAttachment(params,cb);
		}
		
		service.CreateTransitGatewayPrefixListReference=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"PrefixListId",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"PrefixListId",params,undefined,false); 
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(Boolean(n),"Blackhole",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(msg,"PrefixListId",params,undefined,false); 
			copyArgs(msg,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(msg,"Blackhole",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.createTransitGatewayPrefixListReference(params,cb);
		}
		
		service.CreateTransitGatewayRoute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			
			copyArgs(n,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(Boolean(n),"Blackhole",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(msg,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(msg,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(msg,"Blackhole",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.createTransitGatewayRoute(params,cb);
		}
		
		service.CreateTransitGatewayRouteTable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayId",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayId",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayId",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.createTransitGatewayRouteTable(params,cb);
		}
		
		service.CreateTransitGatewayVpcAttachment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayId",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			
			copyArgs(n,"TransitGatewayId",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			copyArgs(n,"Options",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayId",params,undefined,false); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			copyArgs(msg,"SubnetIds",params,undefined,true); 
			copyArgs(msg,"Options",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.createTransitGatewayVpcAttachment(params,cb);
		}
		
		service.CreateVolume=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AvailabilityZone",params,undefined,false); 
			
			copyArgs(n,"AvailabilityZone",params,undefined,false); 
			copyArgs(Boolean(n),"Encrypted",params,undefined,false); 
			copyArgs(Number(n),"Iops",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"OutpostArn",params,undefined,false); 
			copyArgs(Number(n),"Size",params,undefined,false); 
			copyArgs(n,"SnapshotId",params,undefined,false); 
			copyArgs(n,"VolumeType",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(Boolean(n),"MultiAttachEnabled",params,undefined,false); 
			copyArgs(Number(n),"Throughput",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"AvailabilityZone",params,undefined,false); 
			copyArgs(msg,"Encrypted",params,undefined,false); 
			copyArgs(msg,"Iops",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"OutpostArn",params,undefined,false); 
			copyArgs(msg,"Size",params,undefined,false); 
			copyArgs(msg,"SnapshotId",params,undefined,false); 
			copyArgs(msg,"VolumeType",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"MultiAttachEnabled",params,undefined,false); 
			copyArgs(msg,"Throughput",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.createVolume(params,cb);
		}
		
		service.CreateVpc=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CidrBlock",params,undefined,false); 
			
			copyArgs(Boolean(n),"AmazonProvidedIpv6CidrBlock",params,undefined,false); 
			copyArgs(n,"Ipv6Pool",params,undefined,false); 
			copyArgs(n,"Ipv6CidrBlock",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"InstanceTenancy",params,undefined,false); 
			copyArgs(n,"Ipv6CidrBlockNetworkBorderGroup",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(n,"CidrBlock",params,undefined,false); 
			
			copyArgs(msg,"AmazonProvidedIpv6CidrBlock",params,undefined,false); 
			copyArgs(msg,"Ipv6Pool",params,undefined,false); 
			copyArgs(msg,"Ipv6CidrBlock",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"InstanceTenancy",params,undefined,false); 
			copyArgs(msg,"Ipv6CidrBlockNetworkBorderGroup",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"CidrBlock",params,undefined,false); 
			

			svc.createVpc(params,cb);
		}
		
		service.CreateVpcEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"ServiceName",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"VpcEndpointType",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"ServiceName",params,undefined,false); 
			copyArgs(n,"PolicyDocument",params,undefined,false); 
			copyArgs(n,"RouteTableIds",params,undefined,true); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			copyArgs(n,"SecurityGroupIds",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(Boolean(n),"PrivateDnsEnabled",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"VpcEndpointType",params,undefined,false); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			copyArgs(msg,"ServiceName",params,undefined,false); 
			copyArgs(msg,"PolicyDocument",params,undefined,false); 
			copyArgs(msg,"RouteTableIds",params,undefined,true); 
			copyArgs(msg,"SubnetIds",params,undefined,true); 
			copyArgs(msg,"SecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"PrivateDnsEnabled",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			

			svc.createVpcEndpoint(params,cb);
		}
		
		service.CreateVpcEndpointConnectionNotification=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConnectionNotificationArn",params,undefined,false); 
			copyArgs(n,"ConnectionEvents",params,undefined,true); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ServiceId",params,undefined,false); 
			copyArgs(n,"VpcEndpointId",params,undefined,false); 
			copyArgs(n,"ConnectionNotificationArn",params,undefined,false); 
			copyArgs(n,"ConnectionEvents",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ServiceId",params,undefined,false); 
			copyArgs(msg,"VpcEndpointId",params,undefined,false); 
			copyArgs(msg,"ConnectionNotificationArn",params,undefined,false); 
			copyArgs(msg,"ConnectionEvents",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.createVpcEndpointConnectionNotification(params,cb);
		}
		
		service.CreateVpcEndpointServiceConfiguration=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(Boolean(n),"AcceptanceRequired",params,undefined,false); 
			copyArgs(n,"PrivateDnsName",params,undefined,false); 
			copyArgs(n,"NetworkLoadBalancerArns",params,undefined,true); 
			copyArgs(n,"GatewayLoadBalancerArns",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"AcceptanceRequired",params,undefined,false); 
			copyArgs(msg,"PrivateDnsName",params,undefined,false); 
			copyArgs(msg,"NetworkLoadBalancerArns",params,undefined,true); 
			copyArgs(msg,"GatewayLoadBalancerArns",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			

			svc.createVpcEndpointServiceConfiguration(params,cb);
		}
		
		service.CreateVpcPeeringConnection=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"PeerOwnerId",params,undefined,false); 
			copyArgs(n,"PeerVpcId",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"PeerRegion",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"PeerOwnerId",params,undefined,false); 
			copyArgs(msg,"PeerVpcId",params,undefined,false); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			copyArgs(msg,"PeerRegion",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			

			svc.createVpcPeeringConnection(params,cb);
		}
		
		service.CreateVpnConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CustomerGatewayId",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(n,"CustomerGatewayId",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"VpnGatewayId",params,undefined,false); 
			copyArgs(n,"TransitGatewayId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Options",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			
			copyArgs(msg,"CustomerGatewayId",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"VpnGatewayId",params,undefined,false); 
			copyArgs(msg,"TransitGatewayId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Options",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			

			svc.createVpnConnection(params,cb);
		}
		
		service.CreateVpnConnectionRoute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(n,"VpnConnectionId",params,undefined,false); 
			
			copyArgs(n,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(n,"VpnConnectionId",params,undefined,false); 
			
			copyArgs(msg,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(msg,"VpnConnectionId",params,undefined,false); 
			

			svc.createVpnConnectionRoute(params,cb);
		}
		
		service.CreateVpnGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(n,"AvailabilityZone",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(n,"AmazonSideAsn",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"AvailabilityZone",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"AmazonSideAsn",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.createVpnGateway(params,cb);
		}
		
		service.DeleteCarrierGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CarrierGatewayId",params,undefined,false); 
			
			copyArgs(n,"CarrierGatewayId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"CarrierGatewayId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteCarrierGateway(params,cb);
		}
		
		service.DeleteClientVpnEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteClientVpnEndpoint(params,cb);
		}
		
		service.DeleteClientVpnRoute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(n,"DestinationCidrBlock",params,undefined,false); 
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(n,"TargetVpcSubnetId",params,undefined,false); 
			copyArgs(n,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(msg,"TargetVpcSubnetId",params,undefined,false); 
			copyArgs(msg,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteClientVpnRoute(params,cb);
		}
		
		service.DeleteCustomerGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CustomerGatewayId",params,undefined,false); 
			
			copyArgs(n,"CustomerGatewayId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"CustomerGatewayId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteCustomerGateway(params,cb);
		}
		
		service.DeleteDhcpOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DhcpOptionsId",params,undefined,false); 
			
			copyArgs(n,"DhcpOptionsId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"DhcpOptionsId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteDhcpOptions(params,cb);
		}
		
		service.DeleteEgressOnlyInternetGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EgressOnlyInternetGatewayId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"EgressOnlyInternetGatewayId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"EgressOnlyInternetGatewayId",params,undefined,false); 
			

			svc.deleteEgressOnlyInternetGateway(params,cb);
		}
		
		service.DeleteFleets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FleetIds",params,undefined,true); 
			copyArgs(Boolean(n),"TerminateInstances",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"FleetIds",params,undefined,true); 
			copyArgs(Boolean(n),"TerminateInstances",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"FleetIds",params,undefined,true); 
			copyArgs(msg,"TerminateInstances",params,undefined,false); 
			

			svc.deleteFleets(params,cb);
		}
		
		service.DeleteFlowLogs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FlowLogIds",params,undefined,true); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"FlowLogIds",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"FlowLogIds",params,undefined,true); 
			

			svc.deleteFlowLogs(params,cb);
		}
		
		service.DeleteFpgaImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FpgaImageId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"FpgaImageId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"FpgaImageId",params,undefined,false); 
			

			svc.deleteFpgaImage(params,cb);
		}
		
		service.DeleteInstanceEventWindow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceEventWindowId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(Boolean(n),"ForceDelete",params,undefined,false); 
			copyArgs(n,"InstanceEventWindowId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ForceDelete",params,undefined,false); 
			copyArgs(msg,"InstanceEventWindowId",params,undefined,false); 
			

			svc.deleteInstanceEventWindow(params,cb);
		}
		
		service.DeleteInternetGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InternetGatewayId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"InternetGatewayId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"InternetGatewayId",params,undefined,false); 
			

			svc.deleteInternetGateway(params,cb);
		}
		
		service.DeleteKeyPair=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"KeyName",params,undefined,false); 
			copyArgs(n,"KeyPairId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"KeyName",params,undefined,false); 
			copyArgs(msg,"KeyPairId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteKeyPair(params,cb);
		}
		
		service.DeleteLaunchTemplate=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"LaunchTemplateId",params,undefined,false); 
			copyArgs(n,"LaunchTemplateName",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"LaunchTemplateId",params,undefined,false); 
			copyArgs(msg,"LaunchTemplateName",params,undefined,false); 
			

			svc.deleteLaunchTemplate(params,cb);
		}
		
		service.DeleteLaunchTemplateVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Versions",params,undefined,true); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"LaunchTemplateId",params,undefined,false); 
			copyArgs(n,"LaunchTemplateName",params,undefined,false); 
			copyArgs(n,"Versions",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"LaunchTemplateId",params,undefined,false); 
			copyArgs(msg,"LaunchTemplateName",params,undefined,false); 
			copyArgs(msg,"Versions",params,undefined,true); 
			

			svc.deleteLaunchTemplateVersions(params,cb);
		}
		
		service.DeleteLocalGatewayRoute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(n,"LocalGatewayRouteTableId",params,undefined,false); 
			
			copyArgs(n,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(n,"LocalGatewayRouteTableId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(msg,"LocalGatewayRouteTableId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteLocalGatewayRoute(params,cb);
		}
		
		service.DeleteLocalGatewayRouteTableVpcAssociation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LocalGatewayRouteTableVpcAssociationId",params,undefined,false); 
			
			copyArgs(n,"LocalGatewayRouteTableVpcAssociationId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"LocalGatewayRouteTableVpcAssociationId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteLocalGatewayRouteTableVpcAssociation(params,cb);
		}
		
		service.DeleteManagedPrefixList=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PrefixListId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"PrefixListId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"PrefixListId",params,undefined,false); 
			

			svc.deleteManagedPrefixList(params,cb);
		}
		
		service.DeleteNatGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NatGatewayId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"NatGatewayId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"NatGatewayId",params,undefined,false); 
			

			svc.deleteNatGateway(params,cb);
		}
		
		service.DeleteNetworkAcl=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NetworkAclId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"NetworkAclId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"NetworkAclId",params,undefined,false); 
			

			svc.deleteNetworkAcl(params,cb);
		}
		
		service.DeleteNetworkAclEntry=function(svc,msg,cb){
			var params={};
			
			copyArgs(Boolean(n),"Egress",params,undefined,false); 
			copyArgs(n,"NetworkAclId",params,undefined,false); 
			copyArgs(Number(n),"RuleNumber",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(Boolean(n),"Egress",params,undefined,false); 
			copyArgs(n,"NetworkAclId",params,undefined,false); 
			copyArgs(Number(n),"RuleNumber",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Egress",params,undefined,false); 
			copyArgs(msg,"NetworkAclId",params,undefined,false); 
			copyArgs(msg,"RuleNumber",params,undefined,false); 
			

			svc.deleteNetworkAclEntry(params,cb);
		}
		
		service.DeleteNetworkInsightsAnalysis=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NetworkInsightsAnalysisId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"NetworkInsightsAnalysisId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"NetworkInsightsAnalysisId",params,undefined,false); 
			

			svc.deleteNetworkInsightsAnalysis(params,cb);
		}
		
		service.DeleteNetworkInsightsPath=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NetworkInsightsPathId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"NetworkInsightsPathId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"NetworkInsightsPathId",params,undefined,false); 
			

			svc.deleteNetworkInsightsPath(params,cb);
		}
		
		service.DeleteNetworkInterface=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"NetworkInterfaceId",params,undefined,false); 
			

			svc.deleteNetworkInterface(params,cb);
		}
		
		service.DeleteNetworkInterfacePermission=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NetworkInterfacePermissionId",params,undefined,false); 
			
			copyArgs(n,"NetworkInterfacePermissionId",params,undefined,false); 
			copyArgs(Boolean(n),"Force",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"NetworkInterfacePermissionId",params,undefined,false); 
			copyArgs(msg,"Force",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteNetworkInterfacePermission(params,cb);
		}
		
		service.DeletePlacementGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupName",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"GroupName",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"GroupName",params,undefined,false); 
			

			svc.deletePlacementGroup(params,cb);
		}
		
		service.DeleteQueuedReservedInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReservedInstancesIds",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ReservedInstancesIds",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ReservedInstancesIds",params,undefined,false); 
			

			svc.deleteQueuedReservedInstances(params,cb);
		}
		
		service.DeleteRoute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RouteTableId",params,undefined,false); 
			
			copyArgs(n,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(n,"DestinationIpv6CidrBlock",params,undefined,false); 
			copyArgs(n,"DestinationPrefixListId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"RouteTableId",params,undefined,false); 
			
			copyArgs(msg,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(msg,"DestinationIpv6CidrBlock",params,undefined,false); 
			copyArgs(msg,"DestinationPrefixListId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"RouteTableId",params,undefined,false); 
			

			svc.deleteRoute(params,cb);
		}
		
		service.DeleteRouteTable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RouteTableId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"RouteTableId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"RouteTableId",params,undefined,false); 
			

			svc.deleteRouteTable(params,cb);
		}
		
		service.DeleteSecurityGroup=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"GroupId",params,undefined,false); 
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteSecurityGroup(params,cb);
		}
		
		service.DeleteSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SnapshotId",params,undefined,false); 
			
			copyArgs(n,"SnapshotId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"SnapshotId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteSnapshot(params,cb);
		}
		
		service.DeleteSpotDatafeedSubscription=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteSpotDatafeedSubscription(params,cb);
		}
		
		service.DeleteSubnet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubnetId",params,undefined,false); 
			
			copyArgs(n,"SubnetId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"SubnetId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteSubnet(params,cb);
		}
		
		service.DeleteSubnetCidrReservation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubnetCidrReservationId",params,undefined,false); 
			
			copyArgs(n,"SubnetCidrReservationId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"SubnetCidrReservationId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteSubnetCidrReservation(params,cb);
		}
		
		service.DeleteTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Resources",params,undefined,true); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Resources",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Resources",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.deleteTags(params,cb);
		}
		
		service.DeleteTrafficMirrorFilter=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrafficMirrorFilterId",params,undefined,false); 
			
			copyArgs(n,"TrafficMirrorFilterId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TrafficMirrorFilterId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteTrafficMirrorFilter(params,cb);
		}
		
		service.DeleteTrafficMirrorFilterRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrafficMirrorFilterRuleId",params,undefined,false); 
			
			copyArgs(n,"TrafficMirrorFilterRuleId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TrafficMirrorFilterRuleId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteTrafficMirrorFilterRule(params,cb);
		}
		
		service.DeleteTrafficMirrorSession=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrafficMirrorSessionId",params,undefined,false); 
			
			copyArgs(n,"TrafficMirrorSessionId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TrafficMirrorSessionId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteTrafficMirrorSession(params,cb);
		}
		
		service.DeleteTrafficMirrorTarget=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrafficMirrorTargetId",params,undefined,false); 
			
			copyArgs(n,"TrafficMirrorTargetId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TrafficMirrorTargetId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteTrafficMirrorTarget(params,cb);
		}
		
		service.DeleteTransitGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayId",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteTransitGateway(params,cb);
		}
		
		service.DeleteTransitGatewayConnect=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteTransitGatewayConnect(params,cb);
		}
		
		service.DeleteTransitGatewayConnectPeer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayConnectPeerId",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayConnectPeerId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayConnectPeerId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteTransitGatewayConnectPeer(params,cb);
		}
		
		service.DeleteTransitGatewayMulticastDomain=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayMulticastDomainId",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayMulticastDomainId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayMulticastDomainId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteTransitGatewayMulticastDomain(params,cb);
		}
		
		service.DeleteTransitGatewayPeeringAttachment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteTransitGatewayPeeringAttachment(params,cb);
		}
		
		service.DeleteTransitGatewayPrefixListReference=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"PrefixListId",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"PrefixListId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(msg,"PrefixListId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteTransitGatewayPrefixListReference(params,cb);
		}
		
		service.DeleteTransitGatewayRoute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"DestinationCidrBlock",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(msg,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteTransitGatewayRoute(params,cb);
		}
		
		service.DeleteTransitGatewayRouteTable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteTransitGatewayRouteTable(params,cb);
		}
		
		service.DeleteTransitGatewayVpcAttachment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteTransitGatewayVpcAttachment(params,cb);
		}
		
		service.DeleteVolume=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VolumeId",params,undefined,false); 
			
			copyArgs(n,"VolumeId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"VolumeId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteVolume(params,cb);
		}
		
		service.DeleteVpc=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpcId",params,undefined,false); 
			
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"VpcId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteVpc(params,cb);
		}
		
		service.DeleteVpcEndpointConnectionNotifications=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConnectionNotificationIds",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ConnectionNotificationIds",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ConnectionNotificationIds",params,undefined,false); 
			

			svc.deleteVpcEndpointConnectionNotifications(params,cb);
		}
		
		service.DeleteVpcEndpointServiceConfigurations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServiceIds",params,undefined,true); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ServiceIds",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ServiceIds",params,undefined,true); 
			

			svc.deleteVpcEndpointServiceConfigurations(params,cb);
		}
		
		service.DeleteVpcEndpoints=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpcEndpointIds",params,undefined,true); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"VpcEndpointIds",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"VpcEndpointIds",params,undefined,true); 
			

			svc.deleteVpcEndpoints(params,cb);
		}
		
		service.DeleteVpcPeeringConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpcPeeringConnectionId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"VpcPeeringConnectionId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"VpcPeeringConnectionId",params,undefined,false); 
			

			svc.deleteVpcPeeringConnection(params,cb);
		}
		
		service.DeleteVpnConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpnConnectionId",params,undefined,false); 
			
			copyArgs(n,"VpnConnectionId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"VpnConnectionId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteVpnConnection(params,cb);
		}
		
		service.DeleteVpnConnectionRoute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(n,"VpnConnectionId",params,undefined,false); 
			
			copyArgs(n,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(n,"VpnConnectionId",params,undefined,false); 
			
			copyArgs(msg,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(msg,"VpnConnectionId",params,undefined,false); 
			

			svc.deleteVpnConnectionRoute(params,cb);
		}
		
		service.DeleteVpnGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpnGatewayId",params,undefined,false); 
			
			copyArgs(n,"VpnGatewayId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"VpnGatewayId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteVpnGateway(params,cb);
		}
		
		service.DeprovisionByoipCidr=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Cidr",params,undefined,false); 
			
			copyArgs(n,"Cidr",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"Cidr",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deprovisionByoipCidr(params,cb);
		}
		
		service.DeregisterImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ImageId",params,undefined,false); 
			
			copyArgs(n,"ImageId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ImageId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deregisterImage(params,cb);
		}
		
		service.DeregisterInstanceEventNotificationAttributes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"InstanceTagAttribute",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"InstanceTagAttribute",params,undefined,false); 
			

			svc.deregisterInstanceEventNotificationAttributes(params,cb);
		}
		
		service.DeregisterTransitGatewayMulticastGroupMembers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TransitGatewayMulticastDomainId",params,undefined,false); 
			copyArgs(n,"GroupIpAddress",params,undefined,false); 
			copyArgs(n,"NetworkInterfaceIds",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayMulticastDomainId",params,undefined,false); 
			copyArgs(msg,"GroupIpAddress",params,undefined,false); 
			copyArgs(msg,"NetworkInterfaceIds",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deregisterTransitGatewayMulticastGroupMembers(params,cb);
		}
		
		service.DeregisterTransitGatewayMulticastGroupSources=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TransitGatewayMulticastDomainId",params,undefined,false); 
			copyArgs(n,"GroupIpAddress",params,undefined,false); 
			copyArgs(n,"NetworkInterfaceIds",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayMulticastDomainId",params,undefined,false); 
			copyArgs(msg,"GroupIpAddress",params,undefined,false); 
			copyArgs(msg,"NetworkInterfaceIds",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deregisterTransitGatewayMulticastGroupSources(params,cb);
		}
		
		service.DescribeAccountAttributes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AttributeNames",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"AttributeNames",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeAccountAttributes(params,cb);
		}
		
		service.DescribeAddresses=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"PublicIps",params,undefined,false); 
			copyArgs(n,"AllocationIds",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"PublicIps",params,undefined,false); 
			copyArgs(msg,"AllocationIds",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeAddresses(params,cb);
		}
		
		service.DescribeAddressesAttribute=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AllocationIds",params,undefined,false); 
			copyArgs(n,"Attribute",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"AllocationIds",params,undefined,false); 
			copyArgs(msg,"Attribute",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeAddressesAttribute(params,cb);
		}
		
		service.DescribeAggregateIdFormat=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeAggregateIdFormat(params,cb);
		}
		
		service.DescribeAvailabilityZones=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"ZoneNames",params,undefined,false); 
			copyArgs(n,"ZoneIds",params,undefined,false); 
			copyArgs(Boolean(n),"AllAvailabilityZones",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"ZoneNames",params,undefined,false); 
			copyArgs(msg,"ZoneIds",params,undefined,false); 
			copyArgs(msg,"AllAvailabilityZones",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeAvailabilityZones(params,cb);
		}
		
		service.DescribeBundleTasks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"BundleIds",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"BundleIds",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeBundleTasks(params,cb);
		}
		
		service.DescribeByoipCidrs=function(svc,msg,cb){
			var params={};
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeByoipCidrs(params,cb);
		}
		
		service.DescribeCapacityReservations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CapacityReservationIds",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"CapacityReservationIds",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeCapacityReservations(params,cb);
		}
		
		service.DescribeCarrierGateways=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CarrierGatewayIds",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"CarrierGatewayIds",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeCarrierGateways(params,cb);
		}
		
		service.DescribeClassicLinkInstances=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"InstanceIds",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"InstanceIds",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeClassicLinkInstances(params,cb);
		}
		
		service.DescribeClientVpnAuthorizationRules=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeClientVpnAuthorizationRules(params,cb);
		}
		
		service.DescribeClientVpnConnections=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeClientVpnConnections(params,cb);
		}
		
		service.DescribeClientVpnEndpoints=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ClientVpnEndpointIds",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ClientVpnEndpointIds",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeClientVpnEndpoints(params,cb);
		}
		
		service.DescribeClientVpnRoutes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeClientVpnRoutes(params,cb);
		}
		
		service.DescribeClientVpnTargetNetworks=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(n,"AssociationIds",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(msg,"AssociationIds",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeClientVpnTargetNetworks(params,cb);
		}
		
		service.DescribeCoipPools=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"PoolIds",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"PoolIds",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeCoipPools(params,cb);
		}
		
		service.DescribeConversionTasks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ConversionTaskIds",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ConversionTaskIds",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeConversionTasks(params,cb);
		}
		
		service.DescribeCustomerGateways=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CustomerGatewayIds",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"CustomerGatewayIds",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeCustomerGateways(params,cb);
		}
		
		service.DescribeDhcpOptions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DhcpOptionsIds",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"DhcpOptionsIds",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeDhcpOptions(params,cb);
		}
		
		service.DescribeEgressOnlyInternetGateways=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"EgressOnlyInternetGatewayIds",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"EgressOnlyInternetGatewayIds",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			

			svc.describeEgressOnlyInternetGateways(params,cb);
		}
		
		service.DescribeElasticGpus=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ElasticGpuIds",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ElasticGpuIds",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeElasticGpus(params,cb);
		}
		
		service.DescribeExportImageTasks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"ExportImageTaskIds",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"ExportImageTaskIds",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeExportImageTasks(params,cb);
		}
		
		service.DescribeExportTasks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ExportTaskIds",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			
			copyArgs(msg,"ExportTaskIds",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			

			svc.describeExportTasks(params,cb);
		}
		
		service.DescribeFastSnapshotRestores=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeFastSnapshotRestores(params,cb);
		}
		
		service.DescribeFleetHistory=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"EventType",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"EventType",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"FleetId",params,undefined,false); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			

			svc.describeFleetHistory(params,cb);
		}
		
		service.DescribeFleetInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FleetId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"FleetId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			

			svc.describeFleetInstances(params,cb);
		}
		
		service.DescribeFleets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"FleetIds",params,undefined,true); 
			copyArgs(n,"Filters",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"FleetIds",params,undefined,true); 
			copyArgs(msg,"Filters",params,undefined,true); 
			

			svc.describeFleets(params,cb);
		}
		
		service.DescribeFlowLogs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Filter",params,undefined,true); 
			copyArgs(n,"FlowLogIds",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Filter",params,undefined,true); 
			copyArgs(msg,"FlowLogIds",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeFlowLogs(params,cb);
		}
		
		service.DescribeFpgaImageAttribute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FpgaImageId",params,undefined,false); 
			copyArgs(n,"Attribute",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"FpgaImageId",params,undefined,false); 
			copyArgs(n,"Attribute",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"FpgaImageId",params,undefined,false); 
			copyArgs(msg,"Attribute",params,undefined,false); 
			

			svc.describeFpgaImageAttribute(params,cb);
		}
		
		service.DescribeFpgaImages=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"FpgaImageIds",params,undefined,false); 
			copyArgs(n,"Owners",params,undefined,true); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"FpgaImageIds",params,undefined,false); 
			copyArgs(msg,"Owners",params,undefined,true); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeFpgaImages(params,cb);
		}
		
		service.DescribeHostReservationOfferings=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filter",params,undefined,true); 
			copyArgs(Number(n),"MaxDuration",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(Number(n),"MinDuration",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"OfferingId",params,undefined,false); 
			
			copyArgs(msg,"Filter",params,undefined,true); 
			copyArgs(msg,"MaxDuration",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"MinDuration",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"OfferingId",params,undefined,false); 
			

			svc.describeHostReservationOfferings(params,cb);
		}
		
		service.DescribeHostReservations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filter",params,undefined,true); 
			copyArgs(n,"HostReservationIdSet",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Filter",params,undefined,true); 
			copyArgs(msg,"HostReservationIdSet",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeHostReservations(params,cb);
		}
		
		service.DescribeHosts=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filter",params,undefined,true); 
			copyArgs(n,"HostIds",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Filter",params,undefined,true); 
			copyArgs(msg,"HostIds",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeHosts(params,cb);
		}
		
		service.DescribeIamInstanceProfileAssociations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AssociationIds",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AssociationIds",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeIamInstanceProfileAssociations(params,cb);
		}
		
		service.DescribeIdFormat=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Resource",params,undefined,false); 
			
			copyArgs(msg,"Resource",params,undefined,false); 
			

			svc.describeIdFormat(params,cb);
		}
		
		service.DescribeIdentityIdFormat=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PrincipalArn",params,undefined,false); 
			
			copyArgs(n,"PrincipalArn",params,undefined,false); 
			copyArgs(n,"Resource",params,undefined,false); 
			
			copyArgs(msg,"PrincipalArn",params,undefined,false); 
			copyArgs(msg,"Resource",params,undefined,false); 
			

			svc.describeIdentityIdFormat(params,cb);
		}
		
		service.DescribeImageAttribute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Attribute",params,undefined,false); 
			copyArgs(n,"ImageId",params,undefined,false); 
			
			copyArgs(n,"Attribute",params,undefined,false); 
			copyArgs(n,"ImageId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"Attribute",params,undefined,false); 
			copyArgs(msg,"ImageId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeImageAttribute(params,cb);
		}
		
		service.DescribeImages=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ExecutableUsers",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"ImageIds",params,undefined,false); 
			copyArgs(n,"Owners",params,undefined,true); 
			copyArgs(Boolean(n),"IncludeDeprecated",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ExecutableUsers",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"ImageIds",params,undefined,false); 
			copyArgs(msg,"Owners",params,undefined,true); 
			copyArgs(msg,"IncludeDeprecated",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeImages(params,cb);
		}
		
		service.DescribeImportImageTasks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"ImportTaskIds",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"ImportTaskIds",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeImportImageTasks(params,cb);
		}
		
		service.DescribeImportSnapshotTasks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"ImportTaskIds",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"ImportTaskIds",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeImportSnapshotTasks(params,cb);
		}
		
		service.DescribeInstanceAttribute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Attribute",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"Attribute",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"Attribute",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.describeInstanceAttribute(params,cb);
		}
		
		service.DescribeInstanceCreditSpecifications=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"InstanceIds",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"InstanceIds",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeInstanceCreditSpecifications(params,cb);
		}
		
		service.DescribeInstanceEventNotificationAttributes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeInstanceEventNotificationAttributes(params,cb);
		}
		
		service.DescribeInstanceEventWindows=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"InstanceEventWindowIds",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"InstanceEventWindowIds",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeInstanceEventWindows(params,cb);
		}
		
		service.DescribeInstanceStatus=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"InstanceIds",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(Boolean(n),"IncludeAllInstances",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"InstanceIds",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"IncludeAllInstances",params,undefined,false); 
			

			svc.describeInstanceStatus(params,cb);
		}
		
		service.DescribeInstanceTypeOfferings=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"LocationType",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"LocationType",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeInstanceTypeOfferings(params,cb);
		}
		
		service.DescribeInstanceTypes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"InstanceTypes",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"InstanceTypes",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeInstanceTypes(params,cb);
		}
		
		service.DescribeInstances=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"InstanceIds",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"InstanceIds",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeInstances(params,cb);
		}
		
		service.DescribeInternetGateways=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"InternetGatewayIds",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"InternetGatewayIds",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeInternetGateways(params,cb);
		}
		
		service.DescribeIpv6Pools=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"PoolIds",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			
			copyArgs(msg,"PoolIds",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			

			svc.describeIpv6Pools(params,cb);
		}
		
		service.DescribeKeyPairs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"KeyNames",params,undefined,false); 
			copyArgs(n,"KeyPairIds",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"KeyNames",params,undefined,false); 
			copyArgs(msg,"KeyPairIds",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeKeyPairs(params,cb);
		}
		
		service.DescribeLaunchTemplateVersions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"LaunchTemplateId",params,undefined,false); 
			copyArgs(n,"LaunchTemplateName",params,undefined,false); 
			copyArgs(n,"Versions",params,undefined,true); 
			copyArgs(n,"MinVersion",params,undefined,false); 
			copyArgs(n,"MaxVersion",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"LaunchTemplateId",params,undefined,false); 
			copyArgs(msg,"LaunchTemplateName",params,undefined,false); 
			copyArgs(msg,"Versions",params,undefined,true); 
			copyArgs(msg,"MinVersion",params,undefined,false); 
			copyArgs(msg,"MaxVersion",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			

			svc.describeLaunchTemplateVersions(params,cb);
		}
		
		service.DescribeLaunchTemplates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"LaunchTemplateIds",params,undefined,false); 
			copyArgs(n,"LaunchTemplateNames",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"LaunchTemplateIds",params,undefined,false); 
			copyArgs(msg,"LaunchTemplateNames",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeLaunchTemplates(params,cb);
		}
		
		service.DescribeLocalGatewayRouteTableVirtualInterfaceGroupAssociations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"LocalGatewayRouteTableVirtualInterfaceGroupAssociationIds",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"LocalGatewayRouteTableVirtualInterfaceGroupAssociationIds",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeLocalGatewayRouteTableVirtualInterfaceGroupAssociations(params,cb);
		}
		
		service.DescribeLocalGatewayRouteTableVpcAssociations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"LocalGatewayRouteTableVpcAssociationIds",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"LocalGatewayRouteTableVpcAssociationIds",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeLocalGatewayRouteTableVpcAssociations(params,cb);
		}
		
		service.DescribeLocalGatewayRouteTables=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"LocalGatewayRouteTableIds",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"LocalGatewayRouteTableIds",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeLocalGatewayRouteTables(params,cb);
		}
		
		service.DescribeLocalGatewayVirtualInterfaceGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"LocalGatewayVirtualInterfaceGroupIds",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"LocalGatewayVirtualInterfaceGroupIds",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeLocalGatewayVirtualInterfaceGroups(params,cb);
		}
		
		service.DescribeLocalGatewayVirtualInterfaces=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"LocalGatewayVirtualInterfaceIds",params,undefined,true); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"LocalGatewayVirtualInterfaceIds",params,undefined,true); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeLocalGatewayVirtualInterfaces(params,cb);
		}
		
		service.DescribeLocalGateways=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"LocalGatewayIds",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"LocalGatewayIds",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeLocalGateways(params,cb);
		}
		
		service.DescribeManagedPrefixLists=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"PrefixListIds",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"PrefixListIds",params,undefined,true); 
			

			svc.describeManagedPrefixLists(params,cb);
		}
		
		service.DescribeMovingAddresses=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"PublicIps",params,undefined,true); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"PublicIps",params,undefined,true); 
			

			svc.describeMovingAddresses(params,cb);
		}
		
		service.DescribeNatGateways=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Filter",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NatGatewayIds",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Filter",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NatGatewayIds",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeNatGateways(params,cb);
		}
		
		service.DescribeNetworkAcls=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"NetworkAclIds",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"NetworkAclIds",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeNetworkAcls(params,cb);
		}
		
		service.DescribeNetworkInsightsAnalyses=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NetworkInsightsAnalysisIds",params,undefined,false); 
			copyArgs(n,"NetworkInsightsPathId",params,undefined,false); 
			copyArgs(n,"AnalysisStartTime",params,undefined,false); 
			copyArgs(n,"AnalysisEndTime",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"NetworkInsightsAnalysisIds",params,undefined,false); 
			copyArgs(msg,"NetworkInsightsPathId",params,undefined,false); 
			copyArgs(msg,"AnalysisStartTime",params,undefined,false); 
			copyArgs(msg,"AnalysisEndTime",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeNetworkInsightsAnalyses(params,cb);
		}
		
		service.DescribeNetworkInsightsPaths=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NetworkInsightsPathIds",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"NetworkInsightsPathIds",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeNetworkInsightsPaths(params,cb);
		}
		
		service.DescribeNetworkInterfaceAttribute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			
			copyArgs(n,"Attribute",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			
			copyArgs(msg,"Attribute",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"NetworkInterfaceId",params,undefined,false); 
			

			svc.describeNetworkInterfaceAttribute(params,cb);
		}
		
		service.DescribeNetworkInterfacePermissions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NetworkInterfacePermissionIds",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NetworkInterfacePermissionIds",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeNetworkInterfacePermissions(params,cb);
		}
		
		service.DescribeNetworkInterfaces=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"NetworkInterfaceIds",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"NetworkInterfaceIds",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeNetworkInterfaces(params,cb);
		}
		
		service.DescribePlacementGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"GroupNames",params,undefined,false); 
			copyArgs(n,"GroupIds",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"GroupNames",params,undefined,false); 
			copyArgs(msg,"GroupIds",params,undefined,false); 
			

			svc.describePlacementGroups(params,cb);
		}
		
		service.DescribePrefixLists=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"PrefixListIds",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"PrefixListIds",params,undefined,false); 
			

			svc.describePrefixLists(params,cb);
		}
		
		service.DescribePrincipalIdFormat=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Resources",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Resources",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describePrincipalIdFormat(params,cb);
		}
		
		service.DescribePublicIpv4Pools=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"PoolIds",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			
			copyArgs(msg,"PoolIds",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			

			svc.describePublicIpv4Pools(params,cb);
		}
		
		service.DescribeRegions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"RegionNames",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(Boolean(n),"AllRegions",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"RegionNames",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"AllRegions",params,undefined,false); 
			

			svc.describeRegions(params,cb);
		}
		
		service.DescribeReplaceRootVolumeTasks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ReplaceRootVolumeTaskIds",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ReplaceRootVolumeTaskIds",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeReplaceRootVolumeTasks(params,cb);
		}
		
		service.DescribeReservedInstances=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"OfferingClass",params,undefined,false); 
			copyArgs(n,"ReservedInstancesIds",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"OfferingType",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"OfferingClass",params,undefined,false); 
			copyArgs(msg,"ReservedInstancesIds",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"OfferingType",params,undefined,false); 
			

			svc.describeReservedInstances(params,cb);
		}
		
		service.DescribeReservedInstancesListings=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"ReservedInstancesId",params,undefined,false); 
			copyArgs(n,"ReservedInstancesListingId",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"ReservedInstancesId",params,undefined,false); 
			copyArgs(msg,"ReservedInstancesListingId",params,undefined,false); 
			

			svc.describeReservedInstancesListings(params,cb);
		}
		
		service.DescribeReservedInstancesModifications=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"ReservedInstancesModificationIds",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"ReservedInstancesModificationIds",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeReservedInstancesModifications(params,cb);
		}
		
		service.DescribeReservedInstancesOfferings=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AvailabilityZone",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Boolean(n),"IncludeMarketplace",params,undefined,false); 
			copyArgs(n,"InstanceType",params,undefined,false); 
			copyArgs(n,"MaxDuration",params,undefined,false); 
			copyArgs(Number(n),"MaxInstanceCount",params,undefined,false); 
			copyArgs(n,"MinDuration",params,undefined,false); 
			copyArgs(n,"OfferingClass",params,undefined,false); 
			copyArgs(n,"ProductDescription",params,undefined,false); 
			copyArgs(n,"ReservedInstancesOfferingIds",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"InstanceTenancy",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"OfferingType",params,undefined,false); 
			
			copyArgs(msg,"AvailabilityZone",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"IncludeMarketplace",params,undefined,false); 
			copyArgs(msg,"InstanceType",params,undefined,false); 
			copyArgs(msg,"MaxDuration",params,undefined,false); 
			copyArgs(msg,"MaxInstanceCount",params,undefined,false); 
			copyArgs(msg,"MinDuration",params,undefined,false); 
			copyArgs(msg,"OfferingClass",params,undefined,false); 
			copyArgs(msg,"ProductDescription",params,undefined,false); 
			copyArgs(msg,"ReservedInstancesOfferingIds",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"InstanceTenancy",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"OfferingType",params,undefined,false); 
			

			svc.describeReservedInstancesOfferings(params,cb);
		}
		
		service.DescribeRouteTables=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"RouteTableIds",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"RouteTableIds",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeRouteTables(params,cb);
		}
		
		service.DescribeScheduledInstanceAvailability=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FirstSlotStartTimeRange",params,undefined,false); 
			copyArgs(n,"Recurrence",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"FirstSlotStartTimeRange",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(Number(n),"MaxSlotDurationInHours",params,undefined,false); 
			copyArgs(Number(n),"MinSlotDurationInHours",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Recurrence",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"FirstSlotStartTimeRange",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"MaxSlotDurationInHours",params,undefined,false); 
			copyArgs(msg,"MinSlotDurationInHours",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Recurrence",params,undefined,false); 
			

			svc.describeScheduledInstanceAvailability(params,cb);
		}
		
		service.DescribeScheduledInstances=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"ScheduledInstanceIds",params,undefined,false); 
			copyArgs(n,"SlotStartTimeRange",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"ScheduledInstanceIds",params,undefined,false); 
			copyArgs(msg,"SlotStartTimeRange",params,undefined,false); 
			

			svc.describeScheduledInstances(params,cb);
		}
		
		service.DescribeSecurityGroupReferences=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"GroupId",params,undefined,false); 
			

			svc.describeSecurityGroupReferences(params,cb);
		}
		
		service.DescribeSecurityGroupRules=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"SecurityGroupRuleIds",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"SecurityGroupRuleIds",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeSecurityGroupRules(params,cb);
		}
		
		service.DescribeSecurityGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"GroupIds",params,undefined,true); 
			copyArgs(n,"GroupNames",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"GroupIds",params,undefined,true); 
			copyArgs(msg,"GroupNames",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeSecurityGroups(params,cb);
		}
		
		service.DescribeSnapshotAttribute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Attribute",params,undefined,false); 
			copyArgs(n,"SnapshotId",params,undefined,false); 
			
			copyArgs(n,"Attribute",params,undefined,false); 
			copyArgs(n,"SnapshotId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"Attribute",params,undefined,false); 
			copyArgs(msg,"SnapshotId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeSnapshotAttribute(params,cb);
		}
		
		service.DescribeSnapshots=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"OwnerIds",params,undefined,true); 
			copyArgs(n,"RestorableByUserIds",params,undefined,false); 
			copyArgs(n,"SnapshotIds",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"OwnerIds",params,undefined,true); 
			copyArgs(msg,"RestorableByUserIds",params,undefined,false); 
			copyArgs(msg,"SnapshotIds",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeSnapshots(params,cb);
		}
		
		service.DescribeSpotDatafeedSubscription=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeSpotDatafeedSubscription(params,cb);
		}
		
		service.DescribeSpotFleetInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SpotFleetRequestId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"SpotFleetRequestId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"SpotFleetRequestId",params,undefined,false); 
			

			svc.describeSpotFleetInstances(params,cb);
		}
		
		service.DescribeSpotFleetRequestHistory=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SpotFleetRequestId",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"EventType",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"SpotFleetRequestId",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"EventType",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"SpotFleetRequestId",params,undefined,false); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			

			svc.describeSpotFleetRequestHistory(params,cb);
		}
		
		service.DescribeSpotFleetRequests=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"SpotFleetRequestIds",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"SpotFleetRequestIds",params,undefined,true); 
			

			svc.describeSpotFleetRequests(params,cb);
		}
		
		service.DescribeSpotInstanceRequests=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"SpotInstanceRequestIds",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"SpotInstanceRequestIds",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeSpotInstanceRequests(params,cb);
		}
		
		service.DescribeSpotPriceHistory=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"AvailabilityZone",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(n,"InstanceTypes",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"ProductDescriptions",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"AvailabilityZone",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"InstanceTypes",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"ProductDescriptions",params,undefined,false); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			

			svc.describeSpotPriceHistory(params,cb);
		}
		
		service.DescribeStaleSecurityGroups=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpcId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			

			svc.describeStaleSecurityGroups(params,cb);
		}
		
		service.DescribeStoreImageTasks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ImageIds",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ImageIds",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeStoreImageTasks(params,cb);
		}
		
		service.DescribeSubnets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"SubnetIds",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"SubnetIds",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeSubnets(params,cb);
		}
		
		service.DescribeTags=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeTags(params,cb);
		}
		
		service.DescribeTrafficMirrorFilters=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TrafficMirrorFilterIds",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"TrafficMirrorFilterIds",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeTrafficMirrorFilters(params,cb);
		}
		
		service.DescribeTrafficMirrorSessions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TrafficMirrorSessionIds",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"TrafficMirrorSessionIds",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeTrafficMirrorSessions(params,cb);
		}
		
		service.DescribeTrafficMirrorTargets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TrafficMirrorTargetIds",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"TrafficMirrorTargetIds",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeTrafficMirrorTargets(params,cb);
		}
		
		service.DescribeTransitGatewayAttachments=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TransitGatewayAttachmentIds",params,undefined,true); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayAttachmentIds",params,undefined,true); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeTransitGatewayAttachments(params,cb);
		}
		
		service.DescribeTransitGatewayConnectPeers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TransitGatewayConnectPeerIds",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayConnectPeerIds",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeTransitGatewayConnectPeers(params,cb);
		}
		
		service.DescribeTransitGatewayConnects=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TransitGatewayAttachmentIds",params,undefined,true); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayAttachmentIds",params,undefined,true); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeTransitGatewayConnects(params,cb);
		}
		
		service.DescribeTransitGatewayMulticastDomains=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TransitGatewayMulticastDomainIds",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayMulticastDomainIds",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeTransitGatewayMulticastDomains(params,cb);
		}
		
		service.DescribeTransitGatewayPeeringAttachments=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TransitGatewayAttachmentIds",params,undefined,true); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayAttachmentIds",params,undefined,true); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeTransitGatewayPeeringAttachments(params,cb);
		}
		
		service.DescribeTransitGatewayRouteTables=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TransitGatewayRouteTableIds",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayRouteTableIds",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeTransitGatewayRouteTables(params,cb);
		}
		
		service.DescribeTransitGatewayVpcAttachments=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TransitGatewayAttachmentIds",params,undefined,true); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayAttachmentIds",params,undefined,true); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeTransitGatewayVpcAttachments(params,cb);
		}
		
		service.DescribeTransitGateways=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TransitGatewayIds",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayIds",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeTransitGateways(params,cb);
		}
		
		service.DescribeTrunkInterfaceAssociations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AssociationIds",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"AssociationIds",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeTrunkInterfaceAssociations(params,cb);
		}
		
		service.DescribeVolumeAttribute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Attribute",params,undefined,false); 
			copyArgs(n,"VolumeId",params,undefined,false); 
			
			copyArgs(n,"Attribute",params,undefined,false); 
			copyArgs(n,"VolumeId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"Attribute",params,undefined,false); 
			copyArgs(msg,"VolumeId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeVolumeAttribute(params,cb);
		}
		
		service.DescribeVolumeStatus=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"VolumeIds",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"VolumeIds",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeVolumeStatus(params,cb);
		}
		
		service.DescribeVolumes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"VolumeIds",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"VolumeIds",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeVolumes(params,cb);
		}
		
		service.DescribeVolumesModifications=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"VolumeIds",params,undefined,true); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"VolumeIds",params,undefined,true); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeVolumesModifications(params,cb);
		}
		
		service.DescribeVpcAttribute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Attribute",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			
			copyArgs(n,"Attribute",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"Attribute",params,undefined,false); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeVpcAttribute(params,cb);
		}
		
		service.DescribeVpcClassicLink=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"VpcIds",params,undefined,true); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"VpcIds",params,undefined,true); 
			

			svc.describeVpcClassicLink(params,cb);
		}
		
		service.DescribeVpcClassicLinkDnsSupport=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"VpcIds",params,undefined,true); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"VpcIds",params,undefined,true); 
			

			svc.describeVpcClassicLinkDnsSupport(params,cb);
		}
		
		service.DescribeVpcEndpointConnectionNotifications=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ConnectionNotificationId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ConnectionNotificationId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeVpcEndpointConnectionNotifications(params,cb);
		}
		
		service.DescribeVpcEndpointConnections=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeVpcEndpointConnections(params,cb);
		}
		
		service.DescribeVpcEndpointServiceConfigurations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ServiceIds",params,undefined,true); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ServiceIds",params,undefined,true); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeVpcEndpointServiceConfigurations(params,cb);
		}
		
		service.DescribeVpcEndpointServicePermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServiceId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ServiceId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ServiceId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeVpcEndpointServicePermissions(params,cb);
		}
		
		service.DescribeVpcEndpointServices=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ServiceNames",params,undefined,true); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ServiceNames",params,undefined,true); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeVpcEndpointServices(params,cb);
		}
		
		service.DescribeVpcEndpoints=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"VpcEndpointIds",params,undefined,true); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"VpcEndpointIds",params,undefined,true); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeVpcEndpoints(params,cb);
		}
		
		service.DescribeVpcPeeringConnections=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"VpcPeeringConnectionIds",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"VpcPeeringConnectionIds",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeVpcPeeringConnections(params,cb);
		}
		
		service.DescribeVpcs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"VpcIds",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"VpcIds",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeVpcs(params,cb);
		}
		
		service.DescribeVpnConnections=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"VpnConnectionIds",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"VpnConnectionIds",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeVpnConnections(params,cb);
		}
		
		service.DescribeVpnGateways=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"VpnGatewayIds",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"VpnGatewayIds",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.describeVpnGateways(params,cb);
		}
		
		service.DetachClassicLinkVpc=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			

			svc.detachClassicLinkVpc(params,cb);
		}
		
		service.DetachInternetGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InternetGatewayId",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"InternetGatewayId",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"InternetGatewayId",params,undefined,false); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			

			svc.detachInternetGateway(params,cb);
		}
		
		service.DetachNetworkInterface=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AttachmentId",params,undefined,false); 
			
			copyArgs(n,"AttachmentId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(Boolean(n),"Force",params,undefined,false); 
			
			copyArgs(msg,"AttachmentId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Force",params,undefined,false); 
			

			svc.detachNetworkInterface(params,cb);
		}
		
		service.DetachVolume=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VolumeId",params,undefined,false); 
			
			copyArgs(n,"Device",params,undefined,false); 
			copyArgs(Boolean(n),"Force",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"VolumeId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"Device",params,undefined,false); 
			copyArgs(msg,"Force",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"VolumeId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.detachVolume(params,cb);
		}
		
		service.DetachVpnGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"VpnGatewayId",params,undefined,false); 
			
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"VpnGatewayId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"VpcId",params,undefined,false); 
			copyArgs(msg,"VpnGatewayId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.detachVpnGateway(params,cb);
		}
		
		service.DisableEbsEncryptionByDefault=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.disableEbsEncryptionByDefault(params,cb);
		}
		
		service.DisableFastSnapshotRestores=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AvailabilityZones",params,undefined,true); 
			copyArgs(n,"SourceSnapshotIds",params,undefined,true); 
			
			copyArgs(n,"AvailabilityZones",params,undefined,true); 
			copyArgs(n,"SourceSnapshotIds",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"AvailabilityZones",params,undefined,true); 
			copyArgs(msg,"SourceSnapshotIds",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.disableFastSnapshotRestores(params,cb);
		}
		
		service.DisableImageDeprecation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ImageId",params,undefined,false); 
			
			copyArgs(n,"ImageId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ImageId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.disableImageDeprecation(params,cb);
		}
		
		service.DisableSerialConsoleAccess=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.disableSerialConsoleAccess(params,cb);
		}
		
		service.DisableTransitGatewayRouteTablePropagation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(msg,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.disableTransitGatewayRouteTablePropagation(params,cb);
		}
		
		service.DisableVgwRoutePropagation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayId",params,undefined,false); 
			copyArgs(n,"RouteTableId",params,undefined,false); 
			
			copyArgs(n,"GatewayId",params,undefined,false); 
			copyArgs(n,"RouteTableId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"GatewayId",params,undefined,false); 
			copyArgs(msg,"RouteTableId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.disableVgwRoutePropagation(params,cb);
		}
		
		service.DisableVpcClassicLink=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpcId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			

			svc.disableVpcClassicLink(params,cb);
		}
		
		service.DisableVpcClassicLinkDnsSupport=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"VpcId",params,undefined,false); 
			
			copyArgs(msg,"VpcId",params,undefined,false); 
			

			svc.disableVpcClassicLinkDnsSupport(params,cb);
		}
		
		service.DisassociateAddress=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AssociationId",params,undefined,false); 
			copyArgs(n,"PublicIp",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"AssociationId",params,undefined,false); 
			copyArgs(msg,"PublicIp",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.disassociateAddress(params,cb);
		}
		
		service.DisassociateClientVpnTargetNetwork=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(n,"AssociationId",params,undefined,false); 
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(n,"AssociationId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(msg,"AssociationId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.disassociateClientVpnTargetNetwork(params,cb);
		}
		
		service.DisassociateEnclaveCertificateIamRole=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CertificateArn",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"CertificateArn",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.disassociateEnclaveCertificateIamRole(params,cb);
		}
		
		service.DisassociateIamInstanceProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AssociationId",params,undefined,false); 
			
			copyArgs(n,"AssociationId",params,undefined,false); 
			
			copyArgs(msg,"AssociationId",params,undefined,false); 
			

			svc.disassociateIamInstanceProfile(params,cb);
		}
		
		service.DisassociateInstanceEventWindow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceEventWindowId",params,undefined,false); 
			copyArgs(n,"AssociationTarget",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"InstanceEventWindowId",params,undefined,false); 
			copyArgs(n,"AssociationTarget",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"InstanceEventWindowId",params,undefined,false); 
			copyArgs(msg,"AssociationTarget",params,undefined,false); 
			

			svc.disassociateInstanceEventWindow(params,cb);
		}
		
		service.DisassociateRouteTable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AssociationId",params,undefined,false); 
			
			copyArgs(n,"AssociationId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"AssociationId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.disassociateRouteTable(params,cb);
		}
		
		service.DisassociateSubnetCidrBlock=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AssociationId",params,undefined,false); 
			
			copyArgs(n,"AssociationId",params,undefined,false); 
			
			copyArgs(msg,"AssociationId",params,undefined,false); 
			

			svc.disassociateSubnetCidrBlock(params,cb);
		}
		
		service.DisassociateTransitGatewayMulticastDomain=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TransitGatewayMulticastDomainId",params,undefined,false); 
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayMulticastDomainId",params,undefined,false); 
			copyArgs(msg,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(msg,"SubnetIds",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.disassociateTransitGatewayMulticastDomain(params,cb);
		}
		
		service.DisassociateTransitGatewayRouteTable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(msg,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.disassociateTransitGatewayRouteTable(params,cb);
		}
		
		service.DisassociateTrunkInterface=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AssociationId",params,undefined,false); 
			
			copyArgs(n,"AssociationId",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"AssociationId",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.disassociateTrunkInterface(params,cb);
		}
		
		service.DisassociateVpcCidrBlock=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AssociationId",params,undefined,false); 
			
			copyArgs(n,"AssociationId",params,undefined,false); 
			
			copyArgs(msg,"AssociationId",params,undefined,false); 
			

			svc.disassociateVpcCidrBlock(params,cb);
		}
		
		service.EnableEbsEncryptionByDefault=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.enableEbsEncryptionByDefault(params,cb);
		}
		
		service.EnableFastSnapshotRestores=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AvailabilityZones",params,undefined,true); 
			copyArgs(n,"SourceSnapshotIds",params,undefined,true); 
			
			copyArgs(n,"AvailabilityZones",params,undefined,true); 
			copyArgs(n,"SourceSnapshotIds",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"AvailabilityZones",params,undefined,true); 
			copyArgs(msg,"SourceSnapshotIds",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.enableFastSnapshotRestores(params,cb);
		}
		
		service.EnableImageDeprecation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ImageId",params,undefined,false); 
			copyArgs(n,"DeprecateAt",params,undefined,false); 
			
			copyArgs(n,"ImageId",params,undefined,false); 
			copyArgs(n,"DeprecateAt",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ImageId",params,undefined,false); 
			copyArgs(msg,"DeprecateAt",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.enableImageDeprecation(params,cb);
		}
		
		service.EnableSerialConsoleAccess=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.enableSerialConsoleAccess(params,cb);
		}
		
		service.EnableTransitGatewayRouteTablePropagation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(msg,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.enableTransitGatewayRouteTablePropagation(params,cb);
		}
		
		service.EnableVgwRoutePropagation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GatewayId",params,undefined,false); 
			copyArgs(n,"RouteTableId",params,undefined,false); 
			
			copyArgs(n,"GatewayId",params,undefined,false); 
			copyArgs(n,"RouteTableId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"GatewayId",params,undefined,false); 
			copyArgs(msg,"RouteTableId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.enableVgwRoutePropagation(params,cb);
		}
		
		service.EnableVolumeIO=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VolumeId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"VolumeId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"VolumeId",params,undefined,false); 
			

			svc.enableVolumeIO(params,cb);
		}
		
		service.EnableVpcClassicLink=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpcId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			

			svc.enableVpcClassicLink(params,cb);
		}
		
		service.EnableVpcClassicLinkDnsSupport=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"VpcId",params,undefined,false); 
			
			copyArgs(msg,"VpcId",params,undefined,false); 
			

			svc.enableVpcClassicLinkDnsSupport(params,cb);
		}
		
		service.ExportClientVpnClientCertificateRevocationList=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.exportClientVpnClientCertificateRevocationList(params,cb);
		}
		
		service.ExportClientVpnClientConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.exportClientVpnClientConfiguration(params,cb);
		}
		
		service.ExportImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DiskImageFormat",params,undefined,false); 
			copyArgs(n,"ImageId",params,undefined,false); 
			copyArgs(n,"S3ExportLocation",params,undefined,false); 
			
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"DiskImageFormat",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ImageId",params,undefined,false); 
			copyArgs(n,"S3ExportLocation",params,undefined,false); 
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DiskImageFormat",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ImageId",params,undefined,false); 
			copyArgs(msg,"S3ExportLocation",params,undefined,false); 
			copyArgs(msg,"RoleName",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			

			svc.exportImage(params,cb);
		}
		
		service.ExportTransitGatewayRoutes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"S3Bucket",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"S3Bucket",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"S3Bucket",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.exportTransitGatewayRoutes(params,cb);
		}
		
		service.GetAssociatedEnclaveCertificateIamRoles=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CertificateArn",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"CertificateArn",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.getAssociatedEnclaveCertificateIamRoles(params,cb);
		}
		
		service.GetAssociatedIpv6PoolCidrs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PoolId",params,undefined,false); 
			
			copyArgs(n,"PoolId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"PoolId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.getAssociatedIpv6PoolCidrs(params,cb);
		}
		
		service.GetCapacityReservationUsage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CapacityReservationId",params,undefined,false); 
			
			copyArgs(n,"CapacityReservationId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"CapacityReservationId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.getCapacityReservationUsage(params,cb);
		}
		
		service.GetCoipPoolUsage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PoolId",params,undefined,false); 
			
			copyArgs(n,"PoolId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"PoolId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.getCoipPoolUsage(params,cb);
		}
		
		service.GetConsoleOutput=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(Boolean(n),"Latest",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Latest",params,undefined,false); 
			

			svc.getConsoleOutput(params,cb);
		}
		
		service.GetConsoleScreenshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(Boolean(n),"WakeUp",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"WakeUp",params,undefined,false); 
			

			svc.getConsoleScreenshot(params,cb);
		}
		
		service.GetDefaultCreditSpecification=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceFamily",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"InstanceFamily",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"InstanceFamily",params,undefined,false); 
			

			svc.getDefaultCreditSpecification(params,cb);
		}
		
		service.GetEbsDefaultKmsKeyId=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.getEbsDefaultKmsKeyId(params,cb);
		}
		
		service.GetEbsEncryptionByDefault=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.getEbsEncryptionByDefault(params,cb);
		}
		
		service.GetFlowLogsIntegrationTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FlowLogId",params,undefined,false); 
			copyArgs(n,"ConfigDeliveryS3DestinationArn",params,undefined,false); 
			copyArgs(n,"IntegrateServices",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"FlowLogId",params,undefined,false); 
			copyArgs(n,"ConfigDeliveryS3DestinationArn",params,undefined,false); 
			copyArgs(n,"IntegrateServices",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"FlowLogId",params,undefined,false); 
			copyArgs(msg,"ConfigDeliveryS3DestinationArn",params,undefined,false); 
			copyArgs(msg,"IntegrateServices",params,undefined,false); 
			

			svc.getFlowLogsIntegrationTemplate(params,cb);
		}
		
		service.GetGroupsForCapacityReservation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CapacityReservationId",params,undefined,false); 
			
			copyArgs(n,"CapacityReservationId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"CapacityReservationId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.getGroupsForCapacityReservation(params,cb);
		}
		
		service.GetHostReservationPurchasePreview=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HostIdSet",params,undefined,true); 
			copyArgs(n,"OfferingId",params,undefined,false); 
			
			copyArgs(n,"HostIdSet",params,undefined,true); 
			copyArgs(n,"OfferingId",params,undefined,false); 
			
			copyArgs(msg,"HostIdSet",params,undefined,true); 
			copyArgs(msg,"OfferingId",params,undefined,false); 
			

			svc.getHostReservationPurchasePreview(params,cb);
		}
		
		service.GetLaunchTemplateData=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.getLaunchTemplateData(params,cb);
		}
		
		service.GetManagedPrefixListAssociations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PrefixListId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"PrefixListId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"PrefixListId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getManagedPrefixListAssociations(params,cb);
		}
		
		service.GetManagedPrefixListEntries=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PrefixListId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"PrefixListId",params,undefined,false); 
			copyArgs(n,"TargetVersion",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"PrefixListId",params,undefined,false); 
			copyArgs(msg,"TargetVersion",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getManagedPrefixListEntries(params,cb);
		}
		
		service.GetPasswordData=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.getPasswordData(params,cb);
		}
		
		service.GetReservedInstancesExchangeQuote=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReservedInstanceIds",params,undefined,true); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ReservedInstanceIds",params,undefined,true); 
			copyArgs(n,"TargetConfigurations",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ReservedInstanceIds",params,undefined,true); 
			copyArgs(msg,"TargetConfigurations",params,undefined,true); 
			

			svc.getReservedInstancesExchangeQuote(params,cb);
		}
		
		service.GetSerialConsoleAccessStatus=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.getSerialConsoleAccessStatus(params,cb);
		}
		
		service.GetSubnetCidrReservations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubnetId",params,undefined,false); 
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"SubnetId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"SubnetId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.getSubnetCidrReservations(params,cb);
		}
		
		service.GetTransitGatewayAttachmentPropagations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.getTransitGatewayAttachmentPropagations(params,cb);
		}
		
		service.GetTransitGatewayMulticastDomainAssociations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TransitGatewayMulticastDomainId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayMulticastDomainId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.getTransitGatewayMulticastDomainAssociations(params,cb);
		}
		
		service.GetTransitGatewayPrefixListReferences=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.getTransitGatewayPrefixListReferences(params,cb);
		}
		
		service.GetTransitGatewayRouteTableAssociations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.getTransitGatewayRouteTableAssociations(params,cb);
		}
		
		service.GetTransitGatewayRouteTablePropagations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.getTransitGatewayRouteTablePropagations(params,cb);
		}
		
		service.ImportClientVpnClientCertificateRevocationList=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(n,"CertificateRevocationList",params,undefined,false); 
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(n,"CertificateRevocationList",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(msg,"CertificateRevocationList",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.importClientVpnClientCertificateRevocationList(params,cb);
		}
		
		service.ImportImage=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Architecture",params,undefined,false); 
			copyArgs(n,"ClientData",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"DiskContainers",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(Boolean(n),"Encrypted",params,undefined,false); 
			copyArgs(n,"Hypervisor",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"LicenseType",params,undefined,false); 
			copyArgs(n,"Platform",params,undefined,false); 
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"LicenseSpecifications",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(n,"UsageOperation",params,undefined,false); 
			copyArgs(n,"BootMode",params,undefined,false); 
			
			copyArgs(msg,"Architecture",params,undefined,false); 
			copyArgs(msg,"ClientData",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DiskContainers",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Encrypted",params,undefined,false); 
			copyArgs(msg,"Hypervisor",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"LicenseType",params,undefined,false); 
			copyArgs(msg,"Platform",params,undefined,false); 
			copyArgs(msg,"RoleName",params,undefined,false); 
			copyArgs(msg,"LicenseSpecifications",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"UsageOperation",params,undefined,false); 
			copyArgs(msg,"BootMode",params,undefined,false); 
			

			svc.importImage(params,cb);
		}
		
		service.ImportInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Platform",params,undefined,false); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"DiskImages",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"LaunchSpecification",params,undefined,false); 
			copyArgs(n,"Platform",params,undefined,false); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DiskImages",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"LaunchSpecification",params,undefined,false); 
			copyArgs(msg,"Platform",params,undefined,false); 
			

			svc.importInstance(params,cb);
		}
		
		service.ImportKeyPair=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyName",params,undefined,false); 
			copyArgs(n,"PublicKeyMaterial",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"KeyName",params,undefined,false); 
			copyArgs(n,"PublicKeyMaterial",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"KeyName",params,undefined,false); 
			copyArgs(msg,"PublicKeyMaterial",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			

			svc.importKeyPair(params,cb);
		}
		
		service.ImportSnapshot=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ClientData",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"DiskContainer",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(Boolean(n),"Encrypted",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			
			copyArgs(msg,"ClientData",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DiskContainer",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Encrypted",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"RoleName",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			

			svc.importSnapshot(params,cb);
		}
		
		service.ImportVolume=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AvailabilityZone",params,undefined,false); 
			copyArgs(n,"Image",params,undefined,true); 
			copyArgs(n,"Volume",params,undefined,true); 
			
			copyArgs(n,"AvailabilityZone",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Image",params,undefined,true); 
			copyArgs(n,"Volume",params,undefined,true); 
			
			copyArgs(msg,"AvailabilityZone",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Image",params,undefined,true); 
			copyArgs(msg,"Volume",params,undefined,true); 
			

			svc.importVolume(params,cb);
		}
		
		service.ModifyAddressAttribute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AllocationId",params,undefined,false); 
			
			copyArgs(n,"AllocationId",params,undefined,false); 
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"AllocationId",params,undefined,false); 
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.modifyAddressAttribute(params,cb);
		}
		
		service.ModifyAvailabilityZoneGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"OptInStatus",params,undefined,false); 
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"OptInStatus",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"OptInStatus",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.modifyAvailabilityZoneGroup(params,cb);
		}
		
		service.ModifyCapacityReservation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CapacityReservationId",params,undefined,false); 
			
			copyArgs(n,"CapacityReservationId",params,undefined,false); 
			copyArgs(Number(n),"InstanceCount",params,undefined,false); 
			copyArgs(n,"EndDate",params,undefined,false); 
			copyArgs(n,"EndDateType",params,undefined,false); 
			copyArgs(Boolean(n),"Accept",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"CapacityReservationId",params,undefined,false); 
			copyArgs(msg,"InstanceCount",params,undefined,false); 
			copyArgs(msg,"EndDate",params,undefined,false); 
			copyArgs(msg,"EndDateType",params,undefined,false); 
			copyArgs(msg,"Accept",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.modifyCapacityReservation(params,cb);
		}
		
		service.ModifyClientVpnEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(n,"ServerCertificateArn",params,undefined,false); 
			copyArgs(n,"ConnectionLogOptions",params,undefined,true); 
			copyArgs(n,"DnsServers",params,undefined,false); 
			copyArgs(Number(n),"VpnPort",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(Boolean(n),"SplitTunnel",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"SecurityGroupIds",params,undefined,true); 
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"SelfServicePortal",params,undefined,false); 
			copyArgs(n,"ClientConnectOptions",params,undefined,true); 
			
			copyArgs(msg,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(msg,"ServerCertificateArn",params,undefined,false); 
			copyArgs(msg,"ConnectionLogOptions",params,undefined,true); 
			copyArgs(msg,"DnsServers",params,undefined,false); 
			copyArgs(msg,"VpnPort",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"SplitTunnel",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"SecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			copyArgs(msg,"SelfServicePortal",params,undefined,false); 
			copyArgs(msg,"ClientConnectOptions",params,undefined,true); 
			

			svc.modifyClientVpnEndpoint(params,cb);
		}
		
		service.ModifyDefaultCreditSpecification=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceFamily",params,undefined,false); 
			copyArgs(n,"CpuCredits",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"InstanceFamily",params,undefined,false); 
			copyArgs(n,"CpuCredits",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"InstanceFamily",params,undefined,false); 
			copyArgs(msg,"CpuCredits",params,undefined,false); 
			

			svc.modifyDefaultCreditSpecification(params,cb);
		}
		
		service.ModifyEbsDefaultKmsKeyId=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.modifyEbsDefaultKmsKeyId(params,cb);
		}
		
		service.ModifyFleet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FleetId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ExcessCapacityTerminationPolicy",params,undefined,false); 
			copyArgs(n,"LaunchTemplateConfigs",params,undefined,true); 
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"TargetCapacitySpecification",params,undefined,true); 
			copyArgs(n,"Context",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ExcessCapacityTerminationPolicy",params,undefined,false); 
			copyArgs(msg,"LaunchTemplateConfigs",params,undefined,true); 
			copyArgs(msg,"FleetId",params,undefined,false); 
			copyArgs(msg,"TargetCapacitySpecification",params,undefined,true); 
			copyArgs(msg,"Context",params,undefined,false); 
			

			svc.modifyFleet(params,cb);
		}
		
		service.ModifyFpgaImageAttribute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FpgaImageId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"FpgaImageId",params,undefined,false); 
			copyArgs(n,"Attribute",params,undefined,false); 
			copyArgs(n,"OperationType",params,undefined,false); 
			copyArgs(n,"UserIds",params,undefined,true); 
			copyArgs(n,"UserGroups",params,undefined,true); 
			copyArgs(n,"ProductCodes",params,undefined,true); 
			copyArgs(n,"LoadPermission",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"FpgaImageId",params,undefined,false); 
			copyArgs(msg,"Attribute",params,undefined,false); 
			copyArgs(msg,"OperationType",params,undefined,false); 
			copyArgs(msg,"UserIds",params,undefined,true); 
			copyArgs(msg,"UserGroups",params,undefined,true); 
			copyArgs(msg,"ProductCodes",params,undefined,true); 
			copyArgs(msg,"LoadPermission",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.modifyFpgaImageAttribute(params,cb);
		}
		
		service.ModifyHosts=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HostIds",params,undefined,true); 
			
			copyArgs(n,"AutoPlacement",params,undefined,false); 
			copyArgs(n,"HostIds",params,undefined,true); 
			copyArgs(n,"HostRecovery",params,undefined,false); 
			copyArgs(n,"InstanceType",params,undefined,false); 
			copyArgs(n,"InstanceFamily",params,undefined,false); 
			
			copyArgs(msg,"AutoPlacement",params,undefined,false); 
			copyArgs(msg,"HostIds",params,undefined,true); 
			copyArgs(msg,"HostRecovery",params,undefined,false); 
			copyArgs(msg,"InstanceType",params,undefined,false); 
			copyArgs(msg,"InstanceFamily",params,undefined,false); 
			

			svc.modifyHosts(params,cb);
		}
		
		service.ModifyIdFormat=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Resource",params,undefined,false); 
			copyArgs(Boolean(n),"UseLongIds",params,undefined,false); 
			
			copyArgs(n,"Resource",params,undefined,false); 
			copyArgs(Boolean(n),"UseLongIds",params,undefined,false); 
			
			copyArgs(msg,"Resource",params,undefined,false); 
			copyArgs(msg,"UseLongIds",params,undefined,false); 
			

			svc.modifyIdFormat(params,cb);
		}
		
		service.ModifyIdentityIdFormat=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PrincipalArn",params,undefined,false); 
			copyArgs(n,"Resource",params,undefined,false); 
			copyArgs(Boolean(n),"UseLongIds",params,undefined,false); 
			
			copyArgs(n,"PrincipalArn",params,undefined,false); 
			copyArgs(n,"Resource",params,undefined,false); 
			copyArgs(Boolean(n),"UseLongIds",params,undefined,false); 
			
			copyArgs(msg,"PrincipalArn",params,undefined,false); 
			copyArgs(msg,"Resource",params,undefined,false); 
			copyArgs(msg,"UseLongIds",params,undefined,false); 
			

			svc.modifyIdentityIdFormat(params,cb);
		}
		
		service.ModifyImageAttribute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ImageId",params,undefined,false); 
			
			copyArgs(n,"Attribute",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,true); 
			copyArgs(n,"ImageId",params,undefined,false); 
			copyArgs(n,"LaunchPermission",params,undefined,false); 
			copyArgs(n,"OperationType",params,undefined,false); 
			copyArgs(n,"ProductCodes",params,undefined,true); 
			copyArgs(n,"UserGroups",params,undefined,true); 
			copyArgs(n,"UserIds",params,undefined,true); 
			copyArgs(n,"Value",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"Attribute",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,true); 
			copyArgs(msg,"ImageId",params,undefined,false); 
			copyArgs(msg,"LaunchPermission",params,undefined,false); 
			copyArgs(msg,"OperationType",params,undefined,false); 
			copyArgs(msg,"ProductCodes",params,undefined,true); 
			copyArgs(msg,"UserGroups",params,undefined,true); 
			copyArgs(msg,"UserIds",params,undefined,true); 
			copyArgs(msg,"Value",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.modifyImageAttribute(params,cb);
		}
		
		service.ModifyInstanceAttribute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"SourceDestCheck",params,undefined,true); 
			copyArgs(n,"Attribute",params,undefined,false); 
			copyArgs(n,"BlockDeviceMappings",params,undefined,false); 
			copyArgs(n,"DisableApiTermination",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"EbsOptimized",params,undefined,true); 
			copyArgs(n,"EnaSupport",params,undefined,true); 
			copyArgs(n,"Groups",params,undefined,true); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"InstanceInitiatedShutdownBehavior",params,undefined,true); 
			copyArgs(n,"InstanceType",params,undefined,true); 
			copyArgs(n,"Kernel",params,undefined,true); 
			copyArgs(n,"Ramdisk",params,undefined,true); 
			copyArgs(n,"SriovNetSupport",params,undefined,true); 
			copyArgs(n,"UserData",params,undefined,false); 
			copyArgs(n,"Value",params,undefined,false); 
			
			copyArgs(msg,"SourceDestCheck",params,undefined,true); 
			copyArgs(msg,"Attribute",params,undefined,false); 
			copyArgs(msg,"BlockDeviceMappings",params,undefined,false); 
			copyArgs(msg,"DisableApiTermination",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"EbsOptimized",params,undefined,true); 
			copyArgs(msg,"EnaSupport",params,undefined,true); 
			copyArgs(msg,"Groups",params,undefined,true); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"InstanceInitiatedShutdownBehavior",params,undefined,true); 
			copyArgs(msg,"InstanceType",params,undefined,true); 
			copyArgs(msg,"Kernel",params,undefined,true); 
			copyArgs(msg,"Ramdisk",params,undefined,true); 
			copyArgs(msg,"SriovNetSupport",params,undefined,true); 
			copyArgs(msg,"UserData",params,undefined,false); 
			copyArgs(msg,"Value",params,undefined,false); 
			

			svc.modifyInstanceAttribute(params,cb);
		}
		
		service.ModifyInstanceCapacityReservationAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"CapacityReservationSpecification",params,undefined,true); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"CapacityReservationSpecification",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"CapacityReservationSpecification",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.modifyInstanceCapacityReservationAttributes(params,cb);
		}
		
		service.ModifyInstanceCreditSpecification=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceCreditSpecifications",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"InstanceCreditSpecifications",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"InstanceCreditSpecifications",params,undefined,false); 
			

			svc.modifyInstanceCreditSpecification(params,cb);
		}
		
		service.ModifyInstanceEventStartTime=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"InstanceEventId",params,undefined,false); 
			copyArgs(n,"NotBefore",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"InstanceEventId",params,undefined,false); 
			copyArgs(n,"NotBefore",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"InstanceEventId",params,undefined,false); 
			copyArgs(msg,"NotBefore",params,undefined,false); 
			

			svc.modifyInstanceEventStartTime(params,cb);
		}
		
		service.ModifyInstanceEventWindow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceEventWindowId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"InstanceEventWindowId",params,undefined,false); 
			copyArgs(n,"TimeRanges",params,undefined,true); 
			copyArgs(n,"CronExpression",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"InstanceEventWindowId",params,undefined,false); 
			copyArgs(msg,"TimeRanges",params,undefined,true); 
			copyArgs(msg,"CronExpression",params,undefined,false); 
			

			svc.modifyInstanceEventWindow(params,cb);
		}
		
		service.ModifyInstanceMetadataOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"HttpTokens",params,undefined,false); 
			copyArgs(Number(n),"HttpPutResponseHopLimit",params,undefined,false); 
			copyArgs(n,"HttpEndpoint",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"HttpProtocolIpv6",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"HttpTokens",params,undefined,false); 
			copyArgs(msg,"HttpPutResponseHopLimit",params,undefined,false); 
			copyArgs(msg,"HttpEndpoint",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"HttpProtocolIpv6",params,undefined,false); 
			

			svc.modifyInstanceMetadataOptions(params,cb);
		}
		
		service.ModifyInstancePlacement=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"Affinity",params,undefined,false); 
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"HostId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Tenancy",params,undefined,false); 
			copyArgs(Number(n),"PartitionNumber",params,undefined,false); 
			copyArgs(n,"HostResourceGroupArn",params,undefined,false); 
			
			copyArgs(msg,"Affinity",params,undefined,false); 
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"HostId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"Tenancy",params,undefined,false); 
			copyArgs(msg,"PartitionNumber",params,undefined,false); 
			copyArgs(msg,"HostResourceGroupArn",params,undefined,false); 
			

			svc.modifyInstancePlacement(params,cb);
		}
		
		service.ModifyLaunchTemplate=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"LaunchTemplateId",params,undefined,false); 
			copyArgs(n,"LaunchTemplateName",params,undefined,false); 
			copyArgs(n,"DefaultVersion",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"LaunchTemplateId",params,undefined,false); 
			copyArgs(msg,"LaunchTemplateName",params,undefined,false); 
			copyArgs(msg,"DefaultVersion",params,undefined,false); 
			

			svc.modifyLaunchTemplate(params,cb);
		}
		
		service.ModifyManagedPrefixList=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PrefixListId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"PrefixListId",params,undefined,false); 
			copyArgs(n,"CurrentVersion",params,undefined,false); 
			copyArgs(n,"PrefixListName",params,undefined,false); 
			copyArgs(n,"AddEntries",params,undefined,true); 
			copyArgs(n,"RemoveEntries",params,undefined,false); 
			copyArgs(Number(n),"MaxEntries",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"PrefixListId",params,undefined,false); 
			copyArgs(msg,"CurrentVersion",params,undefined,false); 
			copyArgs(msg,"PrefixListName",params,undefined,false); 
			copyArgs(msg,"AddEntries",params,undefined,true); 
			copyArgs(msg,"RemoveEntries",params,undefined,false); 
			copyArgs(msg,"MaxEntries",params,undefined,false); 
			

			svc.modifyManagedPrefixList(params,cb);
		}
		
		service.ModifyNetworkInterfaceAttribute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			
			copyArgs(n,"Attachment",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"Groups",params,undefined,true); 
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(n,"SourceDestCheck",params,undefined,true); 
			
			copyArgs(msg,"Attachment",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Groups",params,undefined,true); 
			copyArgs(msg,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(msg,"SourceDestCheck",params,undefined,true); 
			

			svc.modifyNetworkInterfaceAttribute(params,cb);
		}
		
		service.ModifyReservedInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReservedInstancesIds",params,undefined,true); 
			copyArgs(n,"TargetConfigurations",params,undefined,false); 
			
			copyArgs(n,"ReservedInstancesIds",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"TargetConfigurations",params,undefined,false); 
			
			copyArgs(msg,"ReservedInstancesIds",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"TargetConfigurations",params,undefined,false); 
			

			svc.modifyReservedInstances(params,cb);
		}
		
		service.ModifySecurityGroupRules=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"SecurityGroupRules",params,undefined,false); 
			
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"SecurityGroupRules",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"GroupId",params,undefined,false); 
			copyArgs(msg,"SecurityGroupRules",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.modifySecurityGroupRules(params,cb);
		}
		
		service.ModifySnapshotAttribute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SnapshotId",params,undefined,false); 
			
			copyArgs(n,"Attribute",params,undefined,false); 
			copyArgs(n,"CreateVolumePermission",params,undefined,false); 
			copyArgs(n,"GroupNames",params,undefined,true); 
			copyArgs(n,"OperationType",params,undefined,false); 
			copyArgs(n,"SnapshotId",params,undefined,false); 
			copyArgs(n,"UserIds",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"Attribute",params,undefined,false); 
			copyArgs(msg,"CreateVolumePermission",params,undefined,false); 
			copyArgs(msg,"GroupNames",params,undefined,true); 
			copyArgs(msg,"OperationType",params,undefined,false); 
			copyArgs(msg,"SnapshotId",params,undefined,false); 
			copyArgs(msg,"UserIds",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.modifySnapshotAttribute(params,cb);
		}
		
		service.ModifySpotFleetRequest=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SpotFleetRequestId",params,undefined,false); 
			
			copyArgs(n,"ExcessCapacityTerminationPolicy",params,undefined,false); 
			copyArgs(n,"LaunchTemplateConfigs",params,undefined,true); 
			copyArgs(n,"SpotFleetRequestId",params,undefined,false); 
			copyArgs(Number(n),"TargetCapacity",params,undefined,false); 
			copyArgs(Number(n),"OnDemandTargetCapacity",params,undefined,false); 
			copyArgs(n,"Context",params,undefined,false); 
			
			copyArgs(msg,"ExcessCapacityTerminationPolicy",params,undefined,false); 
			copyArgs(msg,"LaunchTemplateConfigs",params,undefined,true); 
			copyArgs(msg,"SpotFleetRequestId",params,undefined,false); 
			copyArgs(msg,"TargetCapacity",params,undefined,false); 
			copyArgs(msg,"OnDemandTargetCapacity",params,undefined,false); 
			copyArgs(msg,"Context",params,undefined,false); 
			

			svc.modifySpotFleetRequest(params,cb);
		}
		
		service.ModifySubnetAttribute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubnetId",params,undefined,false); 
			
			copyArgs(n,"AssignIpv6AddressOnCreation",params,undefined,true); 
			copyArgs(n,"MapPublicIpOnLaunch",params,undefined,true); 
			copyArgs(n,"SubnetId",params,undefined,false); 
			copyArgs(n,"MapCustomerOwnedIpOnLaunch",params,undefined,true); 
			copyArgs(n,"CustomerOwnedIpv4Pool",params,undefined,false); 
			
			copyArgs(msg,"AssignIpv6AddressOnCreation",params,undefined,true); 
			copyArgs(msg,"MapPublicIpOnLaunch",params,undefined,true); 
			copyArgs(msg,"SubnetId",params,undefined,false); 
			copyArgs(msg,"MapCustomerOwnedIpOnLaunch",params,undefined,true); 
			copyArgs(msg,"CustomerOwnedIpv4Pool",params,undefined,false); 
			

			svc.modifySubnetAttribute(params,cb);
		}
		
		service.ModifyTrafficMirrorFilterNetworkServices=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrafficMirrorFilterId",params,undefined,false); 
			
			copyArgs(n,"TrafficMirrorFilterId",params,undefined,false); 
			copyArgs(n,"AddNetworkServices",params,undefined,true); 
			copyArgs(n,"RemoveNetworkServices",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TrafficMirrorFilterId",params,undefined,false); 
			copyArgs(msg,"AddNetworkServices",params,undefined,true); 
			copyArgs(msg,"RemoveNetworkServices",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.modifyTrafficMirrorFilterNetworkServices(params,cb);
		}
		
		service.ModifyTrafficMirrorFilterRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrafficMirrorFilterRuleId",params,undefined,false); 
			
			copyArgs(n,"TrafficMirrorFilterRuleId",params,undefined,false); 
			copyArgs(n,"TrafficDirection",params,undefined,false); 
			copyArgs(Number(n),"RuleNumber",params,undefined,false); 
			copyArgs(n,"RuleAction",params,undefined,false); 
			copyArgs(n,"DestinationPortRange",params,undefined,true); 
			copyArgs(n,"SourcePortRange",params,undefined,true); 
			copyArgs(Number(n),"Protocol",params,undefined,false); 
			copyArgs(n,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(n,"SourceCidrBlock",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"RemoveFields",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TrafficMirrorFilterRuleId",params,undefined,false); 
			copyArgs(msg,"TrafficDirection",params,undefined,false); 
			copyArgs(msg,"RuleNumber",params,undefined,false); 
			copyArgs(msg,"RuleAction",params,undefined,false); 
			copyArgs(msg,"DestinationPortRange",params,undefined,true); 
			copyArgs(msg,"SourcePortRange",params,undefined,true); 
			copyArgs(msg,"Protocol",params,undefined,false); 
			copyArgs(msg,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(msg,"SourceCidrBlock",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"RemoveFields",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.modifyTrafficMirrorFilterRule(params,cb);
		}
		
		service.ModifyTrafficMirrorSession=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrafficMirrorSessionId",params,undefined,false); 
			
			copyArgs(n,"TrafficMirrorSessionId",params,undefined,false); 
			copyArgs(n,"TrafficMirrorTargetId",params,undefined,false); 
			copyArgs(n,"TrafficMirrorFilterId",params,undefined,false); 
			copyArgs(Number(n),"PacketLength",params,undefined,false); 
			copyArgs(Number(n),"SessionNumber",params,undefined,false); 
			copyArgs(Number(n),"VirtualNetworkId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"RemoveFields",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TrafficMirrorSessionId",params,undefined,false); 
			copyArgs(msg,"TrafficMirrorTargetId",params,undefined,false); 
			copyArgs(msg,"TrafficMirrorFilterId",params,undefined,false); 
			copyArgs(msg,"PacketLength",params,undefined,false); 
			copyArgs(msg,"SessionNumber",params,undefined,false); 
			copyArgs(msg,"VirtualNetworkId",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"RemoveFields",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.modifyTrafficMirrorSession(params,cb);
		}
		
		service.ModifyTransitGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayId",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Options",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayId",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Options",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.modifyTransitGateway(params,cb);
		}
		
		service.ModifyTransitGatewayPrefixListReference=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"PrefixListId",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"PrefixListId",params,undefined,false); 
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(Boolean(n),"Blackhole",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(msg,"PrefixListId",params,undefined,false); 
			copyArgs(msg,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(msg,"Blackhole",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.modifyTransitGatewayPrefixListReference(params,cb);
		}
		
		service.ModifyTransitGatewayVpcAttachment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(n,"AddSubnetIds",params,undefined,true); 
			copyArgs(n,"RemoveSubnetIds",params,undefined,true); 
			copyArgs(n,"Options",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(msg,"AddSubnetIds",params,undefined,true); 
			copyArgs(msg,"RemoveSubnetIds",params,undefined,true); 
			copyArgs(msg,"Options",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.modifyTransitGatewayVpcAttachment(params,cb);
		}
		
		service.ModifyVolume=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VolumeId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"VolumeId",params,undefined,false); 
			copyArgs(Number(n),"Size",params,undefined,false); 
			copyArgs(n,"VolumeType",params,undefined,false); 
			copyArgs(Number(n),"Iops",params,undefined,false); 
			copyArgs(Number(n),"Throughput",params,undefined,false); 
			copyArgs(Boolean(n),"MultiAttachEnabled",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"VolumeId",params,undefined,false); 
			copyArgs(msg,"Size",params,undefined,false); 
			copyArgs(msg,"VolumeType",params,undefined,false); 
			copyArgs(msg,"Iops",params,undefined,false); 
			copyArgs(msg,"Throughput",params,undefined,false); 
			copyArgs(msg,"MultiAttachEnabled",params,undefined,false); 
			

			svc.modifyVolume(params,cb);
		}
		
		service.ModifyVolumeAttribute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VolumeId",params,undefined,false); 
			
			copyArgs(n,"AutoEnableIO",params,undefined,true); 
			copyArgs(n,"VolumeId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"AutoEnableIO",params,undefined,true); 
			copyArgs(msg,"VolumeId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.modifyVolumeAttribute(params,cb);
		}
		
		service.ModifyVpcAttribute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpcId",params,undefined,false); 
			
			copyArgs(n,"EnableDnsHostnames",params,undefined,true); 
			copyArgs(n,"EnableDnsSupport",params,undefined,true); 
			copyArgs(n,"VpcId",params,undefined,false); 
			
			copyArgs(msg,"EnableDnsHostnames",params,undefined,true); 
			copyArgs(msg,"EnableDnsSupport",params,undefined,true); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			

			svc.modifyVpcAttribute(params,cb);
		}
		
		service.ModifyVpcEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpcEndpointId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"VpcEndpointId",params,undefined,false); 
			copyArgs(Boolean(n),"ResetPolicy",params,undefined,false); 
			copyArgs(n,"PolicyDocument",params,undefined,false); 
			copyArgs(n,"AddRouteTableIds",params,undefined,true); 
			copyArgs(n,"RemoveRouteTableIds",params,undefined,true); 
			copyArgs(n,"AddSubnetIds",params,undefined,true); 
			copyArgs(n,"RemoveSubnetIds",params,undefined,true); 
			copyArgs(n,"AddSecurityGroupIds",params,undefined,true); 
			copyArgs(n,"RemoveSecurityGroupIds",params,undefined,true); 
			copyArgs(Boolean(n),"PrivateDnsEnabled",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"VpcEndpointId",params,undefined,false); 
			copyArgs(msg,"ResetPolicy",params,undefined,false); 
			copyArgs(msg,"PolicyDocument",params,undefined,false); 
			copyArgs(msg,"AddRouteTableIds",params,undefined,true); 
			copyArgs(msg,"RemoveRouteTableIds",params,undefined,true); 
			copyArgs(msg,"AddSubnetIds",params,undefined,true); 
			copyArgs(msg,"RemoveSubnetIds",params,undefined,true); 
			copyArgs(msg,"AddSecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"RemoveSecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"PrivateDnsEnabled",params,undefined,false); 
			

			svc.modifyVpcEndpoint(params,cb);
		}
		
		service.ModifyVpcEndpointConnectionNotification=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConnectionNotificationId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ConnectionNotificationId",params,undefined,false); 
			copyArgs(n,"ConnectionNotificationArn",params,undefined,false); 
			copyArgs(n,"ConnectionEvents",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ConnectionNotificationId",params,undefined,false); 
			copyArgs(msg,"ConnectionNotificationArn",params,undefined,false); 
			copyArgs(msg,"ConnectionEvents",params,undefined,true); 
			

			svc.modifyVpcEndpointConnectionNotification(params,cb);
		}
		
		service.ModifyVpcEndpointServiceConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServiceId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ServiceId",params,undefined,false); 
			copyArgs(n,"PrivateDnsName",params,undefined,false); 
			copyArgs(Boolean(n),"RemovePrivateDnsName",params,undefined,false); 
			copyArgs(Boolean(n),"AcceptanceRequired",params,undefined,false); 
			copyArgs(n,"AddNetworkLoadBalancerArns",params,undefined,true); 
			copyArgs(n,"RemoveNetworkLoadBalancerArns",params,undefined,true); 
			copyArgs(n,"AddGatewayLoadBalancerArns",params,undefined,true); 
			copyArgs(n,"RemoveGatewayLoadBalancerArns",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ServiceId",params,undefined,false); 
			copyArgs(msg,"PrivateDnsName",params,undefined,false); 
			copyArgs(msg,"RemovePrivateDnsName",params,undefined,false); 
			copyArgs(msg,"AcceptanceRequired",params,undefined,false); 
			copyArgs(msg,"AddNetworkLoadBalancerArns",params,undefined,true); 
			copyArgs(msg,"RemoveNetworkLoadBalancerArns",params,undefined,true); 
			copyArgs(msg,"AddGatewayLoadBalancerArns",params,undefined,true); 
			copyArgs(msg,"RemoveGatewayLoadBalancerArns",params,undefined,true); 
			

			svc.modifyVpcEndpointServiceConfiguration(params,cb);
		}
		
		service.ModifyVpcEndpointServicePermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServiceId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ServiceId",params,undefined,false); 
			copyArgs(n,"AddAllowedPrincipals",params,undefined,true); 
			copyArgs(n,"RemoveAllowedPrincipals",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ServiceId",params,undefined,false); 
			copyArgs(msg,"AddAllowedPrincipals",params,undefined,true); 
			copyArgs(msg,"RemoveAllowedPrincipals",params,undefined,true); 
			

			svc.modifyVpcEndpointServicePermissions(params,cb);
		}
		
		service.ModifyVpcPeeringConnectionOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpcPeeringConnectionId",params,undefined,false); 
			
			copyArgs(n,"AccepterPeeringConnectionOptions",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"RequesterPeeringConnectionOptions",params,undefined,true); 
			copyArgs(n,"VpcPeeringConnectionId",params,undefined,false); 
			
			copyArgs(msg,"AccepterPeeringConnectionOptions",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"RequesterPeeringConnectionOptions",params,undefined,true); 
			copyArgs(msg,"VpcPeeringConnectionId",params,undefined,false); 
			

			svc.modifyVpcPeeringConnectionOptions(params,cb);
		}
		
		service.ModifyVpcTenancy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"InstanceTenancy",params,undefined,false); 
			
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"InstanceTenancy",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"VpcId",params,undefined,false); 
			copyArgs(msg,"InstanceTenancy",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.modifyVpcTenancy(params,cb);
		}
		
		service.ModifyVpnConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpnConnectionId",params,undefined,false); 
			
			copyArgs(n,"VpnConnectionId",params,undefined,false); 
			copyArgs(n,"TransitGatewayId",params,undefined,false); 
			copyArgs(n,"CustomerGatewayId",params,undefined,false); 
			copyArgs(n,"VpnGatewayId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"VpnConnectionId",params,undefined,false); 
			copyArgs(msg,"TransitGatewayId",params,undefined,false); 
			copyArgs(msg,"CustomerGatewayId",params,undefined,false); 
			copyArgs(msg,"VpnGatewayId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.modifyVpnConnection(params,cb);
		}
		
		service.ModifyVpnConnectionOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpnConnectionId",params,undefined,false); 
			
			copyArgs(n,"VpnConnectionId",params,undefined,false); 
			copyArgs(n,"LocalIpv4NetworkCidr",params,undefined,false); 
			copyArgs(n,"RemoteIpv4NetworkCidr",params,undefined,false); 
			copyArgs(n,"LocalIpv6NetworkCidr",params,undefined,false); 
			copyArgs(n,"RemoteIpv6NetworkCidr",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"VpnConnectionId",params,undefined,false); 
			copyArgs(msg,"LocalIpv4NetworkCidr",params,undefined,false); 
			copyArgs(msg,"RemoteIpv4NetworkCidr",params,undefined,false); 
			copyArgs(msg,"LocalIpv6NetworkCidr",params,undefined,false); 
			copyArgs(msg,"RemoteIpv6NetworkCidr",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.modifyVpnConnectionOptions(params,cb);
		}
		
		service.ModifyVpnTunnelCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpnConnectionId",params,undefined,false); 
			copyArgs(n,"VpnTunnelOutsideIpAddress",params,undefined,false); 
			
			copyArgs(n,"VpnConnectionId",params,undefined,false); 
			copyArgs(n,"VpnTunnelOutsideIpAddress",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"VpnConnectionId",params,undefined,false); 
			copyArgs(msg,"VpnTunnelOutsideIpAddress",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.modifyVpnTunnelCertificate(params,cb);
		}
		
		service.ModifyVpnTunnelOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpnConnectionId",params,undefined,false); 
			copyArgs(n,"VpnTunnelOutsideIpAddress",params,undefined,false); 
			copyArgs(n,"TunnelOptions",params,undefined,false); 
			
			copyArgs(n,"VpnConnectionId",params,undefined,false); 
			copyArgs(n,"VpnTunnelOutsideIpAddress",params,undefined,false); 
			copyArgs(n,"TunnelOptions",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"VpnConnectionId",params,undefined,false); 
			copyArgs(msg,"VpnTunnelOutsideIpAddress",params,undefined,false); 
			copyArgs(msg,"TunnelOptions",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.modifyVpnTunnelOptions(params,cb);
		}
		
		service.MonitorInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceIds",params,undefined,true); 
			
			copyArgs(n,"InstanceIds",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"InstanceIds",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.monitorInstances(params,cb);
		}
		
		service.MoveAddressToVpc=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PublicIp",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"PublicIp",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"PublicIp",params,undefined,false); 
			

			svc.moveAddressToVpc(params,cb);
		}
		
		service.ProvisionByoipCidr=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Cidr",params,undefined,false); 
			
			copyArgs(n,"Cidr",params,undefined,false); 
			copyArgs(n,"CidrAuthorizationContext",params,undefined,false); 
			copyArgs(Boolean(n),"PubliclyAdvertisable",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"PoolTagSpecifications",params,undefined,true); 
			copyArgs(Boolean(n),"MultiRegion",params,undefined,false); 
			
			copyArgs(msg,"Cidr",params,undefined,false); 
			copyArgs(msg,"CidrAuthorizationContext",params,undefined,false); 
			copyArgs(msg,"PubliclyAdvertisable",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"PoolTagSpecifications",params,undefined,true); 
			copyArgs(msg,"MultiRegion",params,undefined,false); 
			

			svc.provisionByoipCidr(params,cb);
		}
		
		service.PurchaseHostReservation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HostIdSet",params,undefined,true); 
			copyArgs(n,"OfferingId",params,undefined,false); 
			
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"CurrencyCode",params,undefined,false); 
			copyArgs(n,"HostIdSet",params,undefined,true); 
			copyArgs(n,"LimitPrice",params,undefined,false); 
			copyArgs(n,"OfferingId",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"CurrencyCode",params,undefined,false); 
			copyArgs(msg,"HostIdSet",params,undefined,true); 
			copyArgs(msg,"LimitPrice",params,undefined,false); 
			copyArgs(msg,"OfferingId",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			

			svc.purchaseHostReservation(params,cb);
		}
		
		service.PurchaseReservedInstancesOffering=function(svc,msg,cb){
			var params={};
			
			copyArgs(Number(n),"InstanceCount",params,undefined,false); 
			copyArgs(n,"ReservedInstancesOfferingId",params,undefined,false); 
			
			copyArgs(Number(n),"InstanceCount",params,undefined,false); 
			copyArgs(n,"ReservedInstancesOfferingId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"LimitPrice",params,undefined,false); 
			copyArgs(n,"PurchaseTime",params,undefined,false); 
			
			copyArgs(msg,"InstanceCount",params,undefined,false); 
			copyArgs(msg,"ReservedInstancesOfferingId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"LimitPrice",params,undefined,false); 
			copyArgs(msg,"PurchaseTime",params,undefined,false); 
			

			svc.purchaseReservedInstancesOffering(params,cb);
		}
		
		service.PurchaseScheduledInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PurchaseRequests",params,undefined,false); 
			
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"PurchaseRequests",params,undefined,false); 
			
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"PurchaseRequests",params,undefined,false); 
			

			svc.purchaseScheduledInstances(params,cb);
		}
		
		service.RebootInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceIds",params,undefined,true); 
			
			copyArgs(n,"InstanceIds",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"InstanceIds",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.rebootInstances(params,cb);
		}
		
		service.RegisterImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"ImageLocation",params,undefined,false); 
			copyArgs(n,"Architecture",params,undefined,false); 
			copyArgs(n,"BlockDeviceMappings",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(Boolean(n),"EnaSupport",params,undefined,false); 
			copyArgs(n,"KernelId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"BillingProducts",params,undefined,false); 
			copyArgs(n,"RamdiskId",params,undefined,false); 
			copyArgs(n,"RootDeviceName",params,undefined,false); 
			copyArgs(n,"SriovNetSupport",params,undefined,false); 
			copyArgs(n,"VirtualizationType",params,undefined,false); 
			copyArgs(n,"BootMode",params,undefined,false); 
			
			copyArgs(msg,"ImageLocation",params,undefined,false); 
			copyArgs(msg,"Architecture",params,undefined,false); 
			copyArgs(msg,"BlockDeviceMappings",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"EnaSupport",params,undefined,false); 
			copyArgs(msg,"KernelId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"BillingProducts",params,undefined,false); 
			copyArgs(msg,"RamdiskId",params,undefined,false); 
			copyArgs(msg,"RootDeviceName",params,undefined,false); 
			copyArgs(msg,"SriovNetSupport",params,undefined,false); 
			copyArgs(msg,"VirtualizationType",params,undefined,false); 
			copyArgs(msg,"BootMode",params,undefined,false); 
			

			svc.registerImage(params,cb);
		}
		
		service.RegisterInstanceEventNotificationAttributes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"InstanceTagAttribute",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"InstanceTagAttribute",params,undefined,false); 
			

			svc.registerInstanceEventNotificationAttributes(params,cb);
		}
		
		service.RegisterTransitGatewayMulticastGroupMembers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TransitGatewayMulticastDomainId",params,undefined,false); 
			copyArgs(n,"GroupIpAddress",params,undefined,false); 
			copyArgs(n,"NetworkInterfaceIds",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayMulticastDomainId",params,undefined,false); 
			copyArgs(msg,"GroupIpAddress",params,undefined,false); 
			copyArgs(msg,"NetworkInterfaceIds",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.registerTransitGatewayMulticastGroupMembers(params,cb);
		}
		
		service.RegisterTransitGatewayMulticastGroupSources=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TransitGatewayMulticastDomainId",params,undefined,false); 
			copyArgs(n,"GroupIpAddress",params,undefined,false); 
			copyArgs(n,"NetworkInterfaceIds",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayMulticastDomainId",params,undefined,false); 
			copyArgs(msg,"GroupIpAddress",params,undefined,false); 
			copyArgs(msg,"NetworkInterfaceIds",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.registerTransitGatewayMulticastGroupSources(params,cb);
		}
		
		service.RejectTransitGatewayMulticastDomainAssociations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TransitGatewayMulticastDomainId",params,undefined,false); 
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayMulticastDomainId",params,undefined,false); 
			copyArgs(msg,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(msg,"SubnetIds",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.rejectTransitGatewayMulticastDomainAssociations(params,cb);
		}
		
		service.RejectTransitGatewayPeeringAttachment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.rejectTransitGatewayPeeringAttachment(params,cb);
		}
		
		service.RejectTransitGatewayVpcAttachment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.rejectTransitGatewayVpcAttachment(params,cb);
		}
		
		service.RejectVpcEndpointConnections=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServiceId",params,undefined,false); 
			copyArgs(n,"VpcEndpointIds",params,undefined,true); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ServiceId",params,undefined,false); 
			copyArgs(n,"VpcEndpointIds",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ServiceId",params,undefined,false); 
			copyArgs(msg,"VpcEndpointIds",params,undefined,true); 
			

			svc.rejectVpcEndpointConnections(params,cb);
		}
		
		service.RejectVpcPeeringConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpcPeeringConnectionId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"VpcPeeringConnectionId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"VpcPeeringConnectionId",params,undefined,false); 
			

			svc.rejectVpcPeeringConnection(params,cb);
		}
		
		service.ReleaseAddress=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AllocationId",params,undefined,false); 
			copyArgs(n,"PublicIp",params,undefined,false); 
			copyArgs(n,"NetworkBorderGroup",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"AllocationId",params,undefined,false); 
			copyArgs(msg,"PublicIp",params,undefined,false); 
			copyArgs(msg,"NetworkBorderGroup",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.releaseAddress(params,cb);
		}
		
		service.ReleaseHosts=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HostIds",params,undefined,true); 
			
			copyArgs(n,"HostIds",params,undefined,true); 
			
			copyArgs(msg,"HostIds",params,undefined,true); 
			

			svc.releaseHosts(params,cb);
		}
		
		service.ReplaceIamInstanceProfileAssociation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IamInstanceProfile",params,undefined,true); 
			copyArgs(n,"AssociationId",params,undefined,false); 
			
			copyArgs(n,"IamInstanceProfile",params,undefined,true); 
			copyArgs(n,"AssociationId",params,undefined,false); 
			
			copyArgs(msg,"IamInstanceProfile",params,undefined,true); 
			copyArgs(msg,"AssociationId",params,undefined,false); 
			

			svc.replaceIamInstanceProfileAssociation(params,cb);
		}
		
		service.ReplaceNetworkAclAssociation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AssociationId",params,undefined,false); 
			copyArgs(n,"NetworkAclId",params,undefined,false); 
			
			copyArgs(n,"AssociationId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"NetworkAclId",params,undefined,false); 
			
			copyArgs(msg,"AssociationId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"NetworkAclId",params,undefined,false); 
			

			svc.replaceNetworkAclAssociation(params,cb);
		}
		
		service.ReplaceNetworkAclEntry=function(svc,msg,cb){
			var params={};
			
			copyArgs(Boolean(n),"Egress",params,undefined,false); 
			copyArgs(n,"NetworkAclId",params,undefined,false); 
			copyArgs(n,"Protocol",params,undefined,false); 
			copyArgs(n,"RuleAction",params,undefined,false); 
			copyArgs(Number(n),"RuleNumber",params,undefined,false); 
			
			copyArgs(n,"CidrBlock",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(Boolean(n),"Egress",params,undefined,false); 
			copyArgs(n,"IcmpTypeCode",params,undefined,true); 
			copyArgs(n,"Ipv6CidrBlock",params,undefined,false); 
			copyArgs(n,"NetworkAclId",params,undefined,false); 
			copyArgs(n,"PortRange",params,undefined,true); 
			copyArgs(n,"Protocol",params,undefined,false); 
			copyArgs(n,"RuleAction",params,undefined,false); 
			copyArgs(Number(n),"RuleNumber",params,undefined,false); 
			
			copyArgs(msg,"CidrBlock",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Egress",params,undefined,false); 
			copyArgs(msg,"IcmpTypeCode",params,undefined,true); 
			copyArgs(msg,"Ipv6CidrBlock",params,undefined,false); 
			copyArgs(msg,"NetworkAclId",params,undefined,false); 
			copyArgs(msg,"PortRange",params,undefined,true); 
			copyArgs(msg,"Protocol",params,undefined,false); 
			copyArgs(msg,"RuleAction",params,undefined,false); 
			copyArgs(msg,"RuleNumber",params,undefined,false); 
			

			svc.replaceNetworkAclEntry(params,cb);
		}
		
		service.ReplaceRoute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RouteTableId",params,undefined,false); 
			
			copyArgs(n,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(n,"DestinationIpv6CidrBlock",params,undefined,false); 
			copyArgs(n,"DestinationPrefixListId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"VpcEndpointId",params,undefined,false); 
			copyArgs(n,"EgressOnlyInternetGatewayId",params,undefined,false); 
			copyArgs(n,"GatewayId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(Boolean(n),"LocalTarget",params,undefined,false); 
			copyArgs(n,"NatGatewayId",params,undefined,false); 
			copyArgs(n,"TransitGatewayId",params,undefined,false); 
			copyArgs(n,"LocalGatewayId",params,undefined,false); 
			copyArgs(n,"CarrierGatewayId",params,undefined,false); 
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(n,"RouteTableId",params,undefined,false); 
			copyArgs(n,"VpcPeeringConnectionId",params,undefined,false); 
			
			copyArgs(msg,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(msg,"DestinationIpv6CidrBlock",params,undefined,false); 
			copyArgs(msg,"DestinationPrefixListId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"VpcEndpointId",params,undefined,false); 
			copyArgs(msg,"EgressOnlyInternetGatewayId",params,undefined,false); 
			copyArgs(msg,"GatewayId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"LocalTarget",params,undefined,false); 
			copyArgs(msg,"NatGatewayId",params,undefined,false); 
			copyArgs(msg,"TransitGatewayId",params,undefined,false); 
			copyArgs(msg,"LocalGatewayId",params,undefined,false); 
			copyArgs(msg,"CarrierGatewayId",params,undefined,false); 
			copyArgs(msg,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(msg,"RouteTableId",params,undefined,false); 
			copyArgs(msg,"VpcPeeringConnectionId",params,undefined,false); 
			

			svc.replaceRoute(params,cb);
		}
		
		service.ReplaceRouteTableAssociation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AssociationId",params,undefined,false); 
			copyArgs(n,"RouteTableId",params,undefined,false); 
			
			copyArgs(n,"AssociationId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"RouteTableId",params,undefined,false); 
			
			copyArgs(msg,"AssociationId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"RouteTableId",params,undefined,false); 
			

			svc.replaceRouteTableAssociation(params,cb);
		}
		
		service.ReplaceTransitGatewayRoute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			
			copyArgs(n,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(Boolean(n),"Blackhole",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"DestinationCidrBlock",params,undefined,false); 
			copyArgs(msg,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(msg,"TransitGatewayAttachmentId",params,undefined,false); 
			copyArgs(msg,"Blackhole",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.replaceTransitGatewayRoute(params,cb);
		}
		
		service.ReportInstanceStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Instances",params,undefined,true); 
			copyArgs(n,"ReasonCodes",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(n,"Instances",params,undefined,true); 
			copyArgs(n,"ReasonCodes",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"Instances",params,undefined,true); 
			copyArgs(msg,"ReasonCodes",params,undefined,false); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			

			svc.reportInstanceStatus(params,cb);
		}
		
		service.RequestSpotFleet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SpotFleetRequestConfig",params,undefined,true); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"SpotFleetRequestConfig",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"SpotFleetRequestConfig",params,undefined,true); 
			

			svc.requestSpotFleet(params,cb);
		}
		
		service.RequestSpotInstances=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AvailabilityZoneGroup",params,undefined,false); 
			copyArgs(Number(n),"BlockDurationMinutes",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(Number(n),"InstanceCount",params,undefined,false); 
			copyArgs(n,"LaunchGroup",params,undefined,false); 
			copyArgs(n,"LaunchSpecification",params,undefined,false); 
			copyArgs(n,"SpotPrice",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"ValidFrom",params,undefined,false); 
			copyArgs(n,"ValidUntil",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(n,"InstanceInterruptionBehavior",params,undefined,false); 
			
			copyArgs(msg,"AvailabilityZoneGroup",params,undefined,false); 
			copyArgs(msg,"BlockDurationMinutes",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"InstanceCount",params,undefined,false); 
			copyArgs(msg,"LaunchGroup",params,undefined,false); 
			copyArgs(msg,"LaunchSpecification",params,undefined,false); 
			copyArgs(msg,"SpotPrice",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"ValidFrom",params,undefined,false); 
			copyArgs(msg,"ValidUntil",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"InstanceInterruptionBehavior",params,undefined,false); 
			

			svc.requestSpotInstances(params,cb);
		}
		
		service.ResetAddressAttribute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AllocationId",params,undefined,false); 
			copyArgs(n,"Attribute",params,undefined,false); 
			
			copyArgs(n,"AllocationId",params,undefined,false); 
			copyArgs(n,"Attribute",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"AllocationId",params,undefined,false); 
			copyArgs(msg,"Attribute",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.resetAddressAttribute(params,cb);
		}
		
		service.ResetEbsDefaultKmsKeyId=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.resetEbsDefaultKmsKeyId(params,cb);
		}
		
		service.ResetFpgaImageAttribute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FpgaImageId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"FpgaImageId",params,undefined,false); 
			copyArgs(n,"Attribute",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"FpgaImageId",params,undefined,false); 
			copyArgs(msg,"Attribute",params,undefined,false); 
			

			svc.resetFpgaImageAttribute(params,cb);
		}
		
		service.ResetImageAttribute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Attribute",params,undefined,false); 
			copyArgs(n,"ImageId",params,undefined,false); 
			
			copyArgs(n,"Attribute",params,undefined,false); 
			copyArgs(n,"ImageId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"Attribute",params,undefined,false); 
			copyArgs(msg,"ImageId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.resetImageAttribute(params,cb);
		}
		
		service.ResetInstanceAttribute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Attribute",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"Attribute",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"Attribute",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.resetInstanceAttribute(params,cb);
		}
		
		service.ResetNetworkInterfaceAttribute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(n,"SourceDestCheck",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(msg,"SourceDestCheck",params,undefined,false); 
			

			svc.resetNetworkInterfaceAttribute(params,cb);
		}
		
		service.ResetSnapshotAttribute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Attribute",params,undefined,false); 
			copyArgs(n,"SnapshotId",params,undefined,false); 
			
			copyArgs(n,"Attribute",params,undefined,false); 
			copyArgs(n,"SnapshotId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"Attribute",params,undefined,false); 
			copyArgs(msg,"SnapshotId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.resetSnapshotAttribute(params,cb);
		}
		
		service.RestoreAddressToClassic=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PublicIp",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"PublicIp",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"PublicIp",params,undefined,false); 
			

			svc.restoreAddressToClassic(params,cb);
		}
		
		service.RestoreManagedPrefixListVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PrefixListId",params,undefined,false); 
			copyArgs(n,"PreviousVersion",params,undefined,false); 
			copyArgs(n,"CurrentVersion",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"PrefixListId",params,undefined,false); 
			copyArgs(n,"PreviousVersion",params,undefined,false); 
			copyArgs(n,"CurrentVersion",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"PrefixListId",params,undefined,false); 
			copyArgs(msg,"PreviousVersion",params,undefined,false); 
			copyArgs(msg,"CurrentVersion",params,undefined,false); 
			

			svc.restoreManagedPrefixListVersion(params,cb);
		}
		
		service.RevokeClientVpnIngress=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(n,"TargetNetworkCidr",params,undefined,false); 
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(n,"TargetNetworkCidr",params,undefined,false); 
			copyArgs(n,"AccessGroupId",params,undefined,false); 
			copyArgs(Boolean(n),"RevokeAllGroups",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(msg,"TargetNetworkCidr",params,undefined,false); 
			copyArgs(msg,"AccessGroupId",params,undefined,false); 
			copyArgs(msg,"RevokeAllGroups",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.revokeClientVpnIngress(params,cb);
		}
		
		service.RevokeSecurityGroupEgress=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"IpPermissions",params,undefined,true); 
			copyArgs(n,"SecurityGroupRuleIds",params,undefined,true); 
			copyArgs(n,"CidrIp",params,undefined,false); 
			copyArgs(Number(n),"FromPort",params,undefined,false); 
			copyArgs(n,"IpProtocol",params,undefined,false); 
			copyArgs(Number(n),"ToPort",params,undefined,false); 
			copyArgs(n,"SourceSecurityGroupName",params,undefined,false); 
			copyArgs(n,"SourceSecurityGroupOwnerId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"GroupId",params,undefined,false); 
			copyArgs(msg,"IpPermissions",params,undefined,true); 
			copyArgs(msg,"SecurityGroupRuleIds",params,undefined,true); 
			copyArgs(msg,"CidrIp",params,undefined,false); 
			copyArgs(msg,"FromPort",params,undefined,false); 
			copyArgs(msg,"IpProtocol",params,undefined,false); 
			copyArgs(msg,"ToPort",params,undefined,false); 
			copyArgs(msg,"SourceSecurityGroupName",params,undefined,false); 
			copyArgs(msg,"SourceSecurityGroupOwnerId",params,undefined,false); 
			

			svc.revokeSecurityGroupEgress(params,cb);
		}
		
		service.RevokeSecurityGroupIngress=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CidrIp",params,undefined,false); 
			copyArgs(Number(n),"FromPort",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"IpPermissions",params,undefined,true); 
			copyArgs(n,"IpProtocol",params,undefined,false); 
			copyArgs(n,"SourceSecurityGroupName",params,undefined,false); 
			copyArgs(n,"SourceSecurityGroupOwnerId",params,undefined,false); 
			copyArgs(Number(n),"ToPort",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"SecurityGroupRuleIds",params,undefined,true); 
			
			copyArgs(msg,"CidrIp",params,undefined,false); 
			copyArgs(msg,"FromPort",params,undefined,false); 
			copyArgs(msg,"GroupId",params,undefined,false); 
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"IpPermissions",params,undefined,true); 
			copyArgs(msg,"IpProtocol",params,undefined,false); 
			copyArgs(msg,"SourceSecurityGroupName",params,undefined,false); 
			copyArgs(msg,"SourceSecurityGroupOwnerId",params,undefined,false); 
			copyArgs(msg,"ToPort",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"SecurityGroupRuleIds",params,undefined,true); 
			

			svc.revokeSecurityGroupIngress(params,cb);
		}
		
		service.RunInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(Number(n),"MaxCount",params,undefined,false); 
			copyArgs(Number(n),"MinCount",params,undefined,false); 
			
			copyArgs(n,"BlockDeviceMappings",params,undefined,true); 
			copyArgs(n,"ImageId",params,undefined,false); 
			copyArgs(n,"InstanceType",params,undefined,false); 
			copyArgs(Number(n),"Ipv6AddressCount",params,undefined,false); 
			copyArgs(n,"Ipv6Addresses",params,undefined,true); 
			copyArgs(n,"KernelId",params,undefined,false); 
			copyArgs(n,"KeyName",params,undefined,false); 
			copyArgs(Number(n),"MaxCount",params,undefined,false); 
			copyArgs(Number(n),"MinCount",params,undefined,false); 
			copyArgs(n,"Monitoring",params,undefined,true); 
			copyArgs(n,"Placement",params,undefined,true); 
			copyArgs(n,"RamdiskId",params,undefined,false); 
			copyArgs(n,"SecurityGroupIds",params,undefined,true); 
			copyArgs(n,"SecurityGroups",params,undefined,true); 
			copyArgs(n,"SubnetId",params,undefined,false); 
			copyArgs(n,"UserData",params,undefined,false); 
			copyArgs(n,"AdditionalInfo",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(Boolean(n),"DisableApiTermination",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(Boolean(n),"EbsOptimized",params,undefined,false); 
			copyArgs(n,"IamInstanceProfile",params,undefined,true); 
			copyArgs(n,"InstanceInitiatedShutdownBehavior",params,undefined,false); 
			copyArgs(n,"NetworkInterfaces",params,undefined,true); 
			copyArgs(n,"PrivateIpAddress",params,undefined,false); 
			copyArgs(n,"ElasticGpuSpecification",params,undefined,false); 
			copyArgs(n,"ElasticInferenceAccelerators",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(n,"LaunchTemplate",params,undefined,false); 
			copyArgs(n,"InstanceMarketOptions",params,undefined,false); 
			copyArgs(n,"CreditSpecification",params,undefined,true); 
			copyArgs(n,"CpuOptions",params,undefined,false); 
			copyArgs(n,"CapacityReservationSpecification",params,undefined,true); 
			copyArgs(n,"HibernationOptions",params,undefined,false); 
			copyArgs(n,"LicenseSpecifications",params,undefined,false); 
			copyArgs(n,"MetadataOptions",params,undefined,false); 
			copyArgs(n,"EnclaveOptions",params,undefined,false); 
			
			copyArgs(msg,"BlockDeviceMappings",params,undefined,true); 
			copyArgs(msg,"ImageId",params,undefined,false); 
			copyArgs(msg,"InstanceType",params,undefined,false); 
			copyArgs(msg,"Ipv6AddressCount",params,undefined,false); 
			copyArgs(msg,"Ipv6Addresses",params,undefined,true); 
			copyArgs(msg,"KernelId",params,undefined,false); 
			copyArgs(msg,"KeyName",params,undefined,false); 
			copyArgs(msg,"MaxCount",params,undefined,false); 
			copyArgs(msg,"MinCount",params,undefined,false); 
			copyArgs(msg,"Monitoring",params,undefined,true); 
			copyArgs(msg,"Placement",params,undefined,true); 
			copyArgs(msg,"RamdiskId",params,undefined,false); 
			copyArgs(msg,"SecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"SecurityGroups",params,undefined,true); 
			copyArgs(msg,"SubnetId",params,undefined,false); 
			copyArgs(msg,"UserData",params,undefined,false); 
			copyArgs(msg,"AdditionalInfo",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"DisableApiTermination",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"EbsOptimized",params,undefined,false); 
			copyArgs(msg,"IamInstanceProfile",params,undefined,true); 
			copyArgs(msg,"InstanceInitiatedShutdownBehavior",params,undefined,false); 
			copyArgs(msg,"NetworkInterfaces",params,undefined,true); 
			copyArgs(msg,"PrivateIpAddress",params,undefined,false); 
			copyArgs(msg,"ElasticGpuSpecification",params,undefined,false); 
			copyArgs(msg,"ElasticInferenceAccelerators",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"LaunchTemplate",params,undefined,false); 
			copyArgs(msg,"InstanceMarketOptions",params,undefined,false); 
			copyArgs(msg,"CreditSpecification",params,undefined,true); 
			copyArgs(msg,"CpuOptions",params,undefined,false); 
			copyArgs(msg,"CapacityReservationSpecification",params,undefined,true); 
			copyArgs(msg,"HibernationOptions",params,undefined,false); 
			copyArgs(msg,"LicenseSpecifications",params,undefined,false); 
			copyArgs(msg,"MetadataOptions",params,undefined,false); 
			copyArgs(msg,"EnclaveOptions",params,undefined,false); 
			

			svc.runInstances(params,cb);
		}
		
		service.RunScheduledInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LaunchSpecification",params,undefined,false); 
			copyArgs(n,"ScheduledInstanceId",params,undefined,false); 
			
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(Number(n),"InstanceCount",params,undefined,false); 
			copyArgs(n,"LaunchSpecification",params,undefined,false); 
			copyArgs(n,"ScheduledInstanceId",params,undefined,false); 
			
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"InstanceCount",params,undefined,false); 
			copyArgs(msg,"LaunchSpecification",params,undefined,false); 
			copyArgs(msg,"ScheduledInstanceId",params,undefined,false); 
			

			svc.runScheduledInstances(params,cb);
		}
		
		service.SearchLocalGatewayRoutes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LocalGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			
			copyArgs(n,"LocalGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"LocalGatewayRouteTableId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.searchLocalGatewayRoutes(params,cb);
		}
		
		service.SearchTransitGatewayMulticastGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TransitGatewayMulticastDomainId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayMulticastDomainId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.searchTransitGatewayMulticastGroups(params,cb);
		}
		
		service.SearchTransitGatewayRoutes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			
			copyArgs(n,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"TransitGatewayRouteTableId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.searchTransitGatewayRoutes(params,cb);
		}
		
		service.SendDiagnosticInterrupt=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.sendDiagnosticInterrupt(params,cb);
		}
		
		service.StartInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceIds",params,undefined,true); 
			
			copyArgs(n,"InstanceIds",params,undefined,true); 
			copyArgs(n,"AdditionalInfo",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"InstanceIds",params,undefined,true); 
			copyArgs(msg,"AdditionalInfo",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.startInstances(params,cb);
		}
		
		service.StartNetworkInsightsAnalysis=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NetworkInsightsPathId",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(n,"NetworkInsightsPathId",params,undefined,false); 
			copyArgs(n,"FilterInArns",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"TagSpecifications",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"NetworkInsightsPathId",params,undefined,false); 
			copyArgs(msg,"FilterInArns",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"TagSpecifications",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.startNetworkInsightsAnalysis(params,cb);
		}
		
		service.StartVpcEndpointServicePrivateDnsVerification=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServiceId",params,undefined,false); 
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"ServiceId",params,undefined,false); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"ServiceId",params,undefined,false); 
			

			svc.startVpcEndpointServicePrivateDnsVerification(params,cb);
		}
		
		service.StopInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceIds",params,undefined,true); 
			
			copyArgs(n,"InstanceIds",params,undefined,true); 
			copyArgs(Boolean(n),"Hibernate",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(Boolean(n),"Force",params,undefined,false); 
			
			copyArgs(msg,"InstanceIds",params,undefined,true); 
			copyArgs(msg,"Hibernate",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"Force",params,undefined,false); 
			

			svc.stopInstances(params,cb);
		}
		
		service.TerminateClientVpnConnections=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			
			copyArgs(n,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(n,"ConnectionId",params,undefined,false); 
			copyArgs(n,"Username",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ClientVpnEndpointId",params,undefined,false); 
			copyArgs(msg,"ConnectionId",params,undefined,false); 
			copyArgs(msg,"Username",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.terminateClientVpnConnections(params,cb);
		}
		
		service.TerminateInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceIds",params,undefined,true); 
			
			copyArgs(n,"InstanceIds",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"InstanceIds",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.terminateInstances(params,cb);
		}
		
		service.UnassignIpv6Addresses=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			
			copyArgs(n,"Ipv6Addresses",params,undefined,true); 
			copyArgs(n,"Ipv6Prefixes",params,undefined,true); 
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			
			copyArgs(msg,"Ipv6Addresses",params,undefined,true); 
			copyArgs(msg,"Ipv6Prefixes",params,undefined,true); 
			copyArgs(msg,"NetworkInterfaceId",params,undefined,false); 
			

			svc.unassignIpv6Addresses(params,cb);
		}
		
		service.UnassignPrivateIpAddresses=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			
			copyArgs(n,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(n,"PrivateIpAddresses",params,undefined,true); 
			copyArgs(n,"Ipv4Prefixes",params,undefined,true); 
			
			copyArgs(msg,"NetworkInterfaceId",params,undefined,false); 
			copyArgs(msg,"PrivateIpAddresses",params,undefined,true); 
			copyArgs(msg,"Ipv4Prefixes",params,undefined,true); 
			

			svc.unassignPrivateIpAddresses(params,cb);
		}
		
		service.UnmonitorInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceIds",params,undefined,true); 
			
			copyArgs(n,"InstanceIds",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"InstanceIds",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.unmonitorInstances(params,cb);
		}
		
		service.UpdateSecurityGroupRuleDescriptionsEgress=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"IpPermissions",params,undefined,true); 
			copyArgs(n,"SecurityGroupRuleDescriptions",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"GroupId",params,undefined,false); 
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"IpPermissions",params,undefined,true); 
			copyArgs(msg,"SecurityGroupRuleDescriptions",params,undefined,true); 
			

			svc.updateSecurityGroupRuleDescriptionsEgress(params,cb);
		}
		
		service.UpdateSecurityGroupRuleDescriptionsIngress=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"IpPermissions",params,undefined,true); 
			copyArgs(n,"SecurityGroupRuleDescriptions",params,undefined,true); 
			
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"GroupId",params,undefined,false); 
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"IpPermissions",params,undefined,true); 
			copyArgs(msg,"SecurityGroupRuleDescriptions",params,undefined,true); 
			

			svc.updateSecurityGroupRuleDescriptionsIngress(params,cb);
		}
		
		service.WithdrawByoipCidr=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Cidr",params,undefined,false); 
			
			copyArgs(n,"Cidr",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"Cidr",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.withdrawByoipCidr(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS EC2", AmazonAPINode);

};
