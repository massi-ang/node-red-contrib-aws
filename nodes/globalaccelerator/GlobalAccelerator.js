
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

		var awsService = new AWS.GlobalAccelerator( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.GlobalAccelerator(msg.AWSConfig) : awsService;

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
		
		service.AddCustomRoutingEndpoints=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointConfigurations",params,undefined,false); 
			copyArgs(n,"EndpointGroupArn",params,undefined,false); 
			
			copyArgs(n,"EndpointConfigurations",params,undefined,false); 
			copyArgs(n,"EndpointGroupArn",params,undefined,false); 
			
			copyArgs(msg,"EndpointConfigurations",params,undefined,false); 
			copyArgs(msg,"EndpointGroupArn",params,undefined,false); 
			

			svc.addCustomRoutingEndpoints(params,cb);
		}
		
		service.AdvertiseByoipCidr=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Cidr",params,undefined,false); 
			
			copyArgs(n,"Cidr",params,undefined,false); 
			
			copyArgs(msg,"Cidr",params,undefined,false); 
			

			svc.advertiseByoipCidr(params,cb);
		}
		
		service.AllowCustomRoutingTraffic=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointGroupArn",params,undefined,false); 
			copyArgs(n,"EndpointId",params,undefined,false); 
			
			copyArgs(n,"EndpointGroupArn",params,undefined,false); 
			copyArgs(n,"EndpointId",params,undefined,false); 
			copyArgs(n,"DestinationAddresses",params,undefined,true); 
			copyArgs(n,"DestinationPorts",params,undefined,true); 
			copyArgs(Boolean(n),"AllowAllTrafficToEndpoint",params,undefined,false); 
			
			copyArgs(msg,"EndpointGroupArn",params,undefined,false); 
			copyArgs(msg,"EndpointId",params,undefined,false); 
			copyArgs(msg,"DestinationAddresses",params,undefined,true); 
			copyArgs(msg,"DestinationPorts",params,undefined,true); 
			copyArgs(msg,"AllowAllTrafficToEndpoint",params,undefined,false); 
			

			svc.allowCustomRoutingTraffic(params,cb);
		}
		
		service.CreateAccelerator=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"IpAddressType",params,undefined,false); 
			copyArgs(n,"IpAddresses",params,undefined,true); 
			copyArgs(Boolean(n),"Enabled",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"IpAddressType",params,undefined,false); 
			copyArgs(msg,"IpAddresses",params,undefined,true); 
			copyArgs(msg,"Enabled",params,undefined,false); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createAccelerator(params,cb);
		}
		
		service.CreateCustomRoutingAccelerator=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"IpAddressType",params,undefined,false); 
			copyArgs(n,"IpAddresses",params,undefined,true); 
			copyArgs(Boolean(n),"Enabled",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"IpAddressType",params,undefined,false); 
			copyArgs(msg,"IpAddresses",params,undefined,true); 
			copyArgs(msg,"Enabled",params,undefined,false); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createCustomRoutingAccelerator(params,cb);
		}
		
		service.CreateCustomRoutingEndpointGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ListenerArn",params,undefined,false); 
			copyArgs(n,"EndpointGroupRegion",params,undefined,false); 
			copyArgs(n,"DestinationConfigurations",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(n,"ListenerArn",params,undefined,false); 
			copyArgs(n,"EndpointGroupRegion",params,undefined,false); 
			copyArgs(n,"DestinationConfigurations",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(msg,"ListenerArn",params,undefined,false); 
			copyArgs(msg,"EndpointGroupRegion",params,undefined,false); 
			copyArgs(msg,"DestinationConfigurations",params,undefined,false); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.createCustomRoutingEndpointGroup(params,cb);
		}
		
		service.CreateCustomRoutingListener=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			copyArgs(n,"PortRanges",params,undefined,true); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			copyArgs(n,"PortRanges",params,undefined,true); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(msg,"AcceleratorArn",params,undefined,false); 
			copyArgs(msg,"PortRanges",params,undefined,true); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.createCustomRoutingListener(params,cb);
		}
		
		service.CreateEndpointGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ListenerArn",params,undefined,false); 
			copyArgs(n,"EndpointGroupRegion",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(n,"ListenerArn",params,undefined,false); 
			copyArgs(n,"EndpointGroupRegion",params,undefined,false); 
			copyArgs(n,"EndpointConfigurations",params,undefined,true); 
			copyArgs(n,"TrafficDialPercentage",params,undefined,false); 
			copyArgs(Number(n),"HealthCheckPort",params,undefined,false); 
			copyArgs(n,"HealthCheckProtocol",params,undefined,false); 
			copyArgs(n,"HealthCheckPath",params,undefined,false); 
			copyArgs(Number(n),"HealthCheckIntervalSeconds",params,undefined,false); 
			copyArgs(Number(n),"ThresholdCount",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			copyArgs(n,"PortOverrides",params,undefined,true); 
			
			copyArgs(msg,"ListenerArn",params,undefined,false); 
			copyArgs(msg,"EndpointGroupRegion",params,undefined,false); 
			copyArgs(msg,"EndpointConfigurations",params,undefined,true); 
			copyArgs(msg,"TrafficDialPercentage",params,undefined,false); 
			copyArgs(msg,"HealthCheckPort",params,undefined,false); 
			copyArgs(msg,"HealthCheckProtocol",params,undefined,false); 
			copyArgs(msg,"HealthCheckPath",params,undefined,false); 
			copyArgs(msg,"HealthCheckIntervalSeconds",params,undefined,false); 
			copyArgs(msg,"ThresholdCount",params,undefined,false); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			copyArgs(msg,"PortOverrides",params,undefined,true); 
			

			svc.createEndpointGroup(params,cb);
		}
		
		service.CreateListener=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			copyArgs(n,"PortRanges",params,undefined,true); 
			copyArgs(n,"Protocol",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			copyArgs(n,"PortRanges",params,undefined,true); 
			copyArgs(n,"Protocol",params,undefined,false); 
			copyArgs(n,"ClientAffinity",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(msg,"AcceleratorArn",params,undefined,false); 
			copyArgs(msg,"PortRanges",params,undefined,true); 
			copyArgs(msg,"Protocol",params,undefined,false); 
			copyArgs(msg,"ClientAffinity",params,undefined,false); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.createListener(params,cb);
		}
		
		service.DeleteAccelerator=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			
			copyArgs(msg,"AcceleratorArn",params,undefined,false); 
			

			svc.deleteAccelerator(params,cb);
		}
		
		service.DeleteCustomRoutingAccelerator=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			
			copyArgs(msg,"AcceleratorArn",params,undefined,false); 
			

			svc.deleteCustomRoutingAccelerator(params,cb);
		}
		
		service.DeleteCustomRoutingEndpointGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointGroupArn",params,undefined,false); 
			
			copyArgs(n,"EndpointGroupArn",params,undefined,false); 
			
			copyArgs(msg,"EndpointGroupArn",params,undefined,false); 
			

			svc.deleteCustomRoutingEndpointGroup(params,cb);
		}
		
		service.DeleteCustomRoutingListener=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ListenerArn",params,undefined,false); 
			
			copyArgs(n,"ListenerArn",params,undefined,false); 
			
			copyArgs(msg,"ListenerArn",params,undefined,false); 
			

			svc.deleteCustomRoutingListener(params,cb);
		}
		
		service.DeleteEndpointGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointGroupArn",params,undefined,false); 
			
			copyArgs(n,"EndpointGroupArn",params,undefined,false); 
			
			copyArgs(msg,"EndpointGroupArn",params,undefined,false); 
			

			svc.deleteEndpointGroup(params,cb);
		}
		
		service.DeleteListener=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ListenerArn",params,undefined,false); 
			
			copyArgs(n,"ListenerArn",params,undefined,false); 
			
			copyArgs(msg,"ListenerArn",params,undefined,false); 
			

			svc.deleteListener(params,cb);
		}
		
		service.DenyCustomRoutingTraffic=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointGroupArn",params,undefined,false); 
			copyArgs(n,"EndpointId",params,undefined,false); 
			
			copyArgs(n,"EndpointGroupArn",params,undefined,false); 
			copyArgs(n,"EndpointId",params,undefined,false); 
			copyArgs(n,"DestinationAddresses",params,undefined,true); 
			copyArgs(n,"DestinationPorts",params,undefined,true); 
			copyArgs(Boolean(n),"DenyAllTrafficToEndpoint",params,undefined,false); 
			
			copyArgs(msg,"EndpointGroupArn",params,undefined,false); 
			copyArgs(msg,"EndpointId",params,undefined,false); 
			copyArgs(msg,"DestinationAddresses",params,undefined,true); 
			copyArgs(msg,"DestinationPorts",params,undefined,true); 
			copyArgs(msg,"DenyAllTrafficToEndpoint",params,undefined,false); 
			

			svc.denyCustomRoutingTraffic(params,cb);
		}
		
		service.DeprovisionByoipCidr=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Cidr",params,undefined,false); 
			
			copyArgs(n,"Cidr",params,undefined,false); 
			
			copyArgs(msg,"Cidr",params,undefined,false); 
			

			svc.deprovisionByoipCidr(params,cb);
		}
		
		service.DescribeAccelerator=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			
			copyArgs(msg,"AcceleratorArn",params,undefined,false); 
			

			svc.describeAccelerator(params,cb);
		}
		
		service.DescribeAcceleratorAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			
			copyArgs(msg,"AcceleratorArn",params,undefined,false); 
			

			svc.describeAcceleratorAttributes(params,cb);
		}
		
		service.DescribeCustomRoutingAccelerator=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			
			copyArgs(msg,"AcceleratorArn",params,undefined,false); 
			

			svc.describeCustomRoutingAccelerator(params,cb);
		}
		
		service.DescribeCustomRoutingAcceleratorAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			
			copyArgs(msg,"AcceleratorArn",params,undefined,false); 
			

			svc.describeCustomRoutingAcceleratorAttributes(params,cb);
		}
		
		service.DescribeCustomRoutingEndpointGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointGroupArn",params,undefined,false); 
			
			copyArgs(n,"EndpointGroupArn",params,undefined,false); 
			
			copyArgs(msg,"EndpointGroupArn",params,undefined,false); 
			

			svc.describeCustomRoutingEndpointGroup(params,cb);
		}
		
		service.DescribeCustomRoutingListener=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ListenerArn",params,undefined,false); 
			
			copyArgs(n,"ListenerArn",params,undefined,false); 
			
			copyArgs(msg,"ListenerArn",params,undefined,false); 
			

			svc.describeCustomRoutingListener(params,cb);
		}
		
		service.DescribeEndpointGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointGroupArn",params,undefined,false); 
			
			copyArgs(n,"EndpointGroupArn",params,undefined,false); 
			
			copyArgs(msg,"EndpointGroupArn",params,undefined,false); 
			

			svc.describeEndpointGroup(params,cb);
		}
		
		service.DescribeListener=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ListenerArn",params,undefined,false); 
			
			copyArgs(n,"ListenerArn",params,undefined,false); 
			
			copyArgs(msg,"ListenerArn",params,undefined,false); 
			

			svc.describeListener(params,cb);
		}
		
		service.ListAccelerators=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listAccelerators(params,cb);
		}
		
		service.ListByoipCidrs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listByoipCidrs(params,cb);
		}
		
		service.ListCustomRoutingAccelerators=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listCustomRoutingAccelerators(params,cb);
		}
		
		service.ListCustomRoutingEndpointGroups=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ListenerArn",params,undefined,false); 
			
			copyArgs(n,"ListenerArn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ListenerArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listCustomRoutingEndpointGroups(params,cb);
		}
		
		service.ListCustomRoutingListeners=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AcceleratorArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listCustomRoutingListeners(params,cb);
		}
		
		service.ListCustomRoutingPortMappings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			copyArgs(n,"EndpointGroupArn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AcceleratorArn",params,undefined,false); 
			copyArgs(msg,"EndpointGroupArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listCustomRoutingPortMappings(params,cb);
		}
		
		service.ListCustomRoutingPortMappingsByDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointId",params,undefined,false); 
			copyArgs(n,"DestinationAddress",params,undefined,false); 
			
			copyArgs(n,"EndpointId",params,undefined,false); 
			copyArgs(n,"DestinationAddress",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"EndpointId",params,undefined,false); 
			copyArgs(msg,"DestinationAddress",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listCustomRoutingPortMappingsByDestination(params,cb);
		}
		
		service.ListEndpointGroups=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ListenerArn",params,undefined,false); 
			
			copyArgs(n,"ListenerArn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ListenerArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listEndpointGroups(params,cb);
		}
		
		service.ListListeners=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AcceleratorArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listListeners(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.ProvisionByoipCidr=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Cidr",params,undefined,false); 
			copyArgs(n,"CidrAuthorizationContext",params,undefined,false); 
			
			copyArgs(n,"Cidr",params,undefined,false); 
			copyArgs(n,"CidrAuthorizationContext",params,undefined,false); 
			
			copyArgs(msg,"Cidr",params,undefined,false); 
			copyArgs(msg,"CidrAuthorizationContext",params,undefined,false); 
			

			svc.provisionByoipCidr(params,cb);
		}
		
		service.RemoveCustomRoutingEndpoints=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointIds",params,undefined,false); 
			copyArgs(n,"EndpointGroupArn",params,undefined,false); 
			
			copyArgs(n,"EndpointIds",params,undefined,false); 
			copyArgs(n,"EndpointGroupArn",params,undefined,false); 
			
			copyArgs(msg,"EndpointIds",params,undefined,false); 
			copyArgs(msg,"EndpointGroupArn",params,undefined,false); 
			

			svc.removeCustomRoutingEndpoints(params,cb);
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
		
		service.UpdateAccelerator=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"IpAddressType",params,undefined,false); 
			copyArgs(Boolean(n),"Enabled",params,undefined,false); 
			
			copyArgs(msg,"AcceleratorArn",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"IpAddressType",params,undefined,false); 
			copyArgs(msg,"Enabled",params,undefined,false); 
			

			svc.updateAccelerator(params,cb);
		}
		
		service.UpdateAcceleratorAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			copyArgs(Boolean(n),"FlowLogsEnabled",params,undefined,false); 
			copyArgs(n,"FlowLogsS3Bucket",params,undefined,false); 
			copyArgs(n,"FlowLogsS3Prefix",params,undefined,false); 
			
			copyArgs(msg,"AcceleratorArn",params,undefined,false); 
			copyArgs(msg,"FlowLogsEnabled",params,undefined,false); 
			copyArgs(msg,"FlowLogsS3Bucket",params,undefined,false); 
			copyArgs(msg,"FlowLogsS3Prefix",params,undefined,false); 
			

			svc.updateAcceleratorAttributes(params,cb);
		}
		
		service.UpdateCustomRoutingAccelerator=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"IpAddressType",params,undefined,false); 
			copyArgs(Boolean(n),"Enabled",params,undefined,false); 
			
			copyArgs(msg,"AcceleratorArn",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"IpAddressType",params,undefined,false); 
			copyArgs(msg,"Enabled",params,undefined,false); 
			

			svc.updateCustomRoutingAccelerator(params,cb);
		}
		
		service.UpdateCustomRoutingAcceleratorAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			
			copyArgs(n,"AcceleratorArn",params,undefined,false); 
			copyArgs(Boolean(n),"FlowLogsEnabled",params,undefined,false); 
			copyArgs(n,"FlowLogsS3Bucket",params,undefined,false); 
			copyArgs(n,"FlowLogsS3Prefix",params,undefined,false); 
			
			copyArgs(msg,"AcceleratorArn",params,undefined,false); 
			copyArgs(msg,"FlowLogsEnabled",params,undefined,false); 
			copyArgs(msg,"FlowLogsS3Bucket",params,undefined,false); 
			copyArgs(msg,"FlowLogsS3Prefix",params,undefined,false); 
			

			svc.updateCustomRoutingAcceleratorAttributes(params,cb);
		}
		
		service.UpdateCustomRoutingListener=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ListenerArn",params,undefined,false); 
			copyArgs(n,"PortRanges",params,undefined,true); 
			
			copyArgs(n,"ListenerArn",params,undefined,false); 
			copyArgs(n,"PortRanges",params,undefined,true); 
			
			copyArgs(msg,"ListenerArn",params,undefined,false); 
			copyArgs(msg,"PortRanges",params,undefined,true); 
			

			svc.updateCustomRoutingListener(params,cb);
		}
		
		service.UpdateEndpointGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointGroupArn",params,undefined,false); 
			
			copyArgs(n,"EndpointGroupArn",params,undefined,false); 
			copyArgs(n,"EndpointConfigurations",params,undefined,true); 
			copyArgs(n,"TrafficDialPercentage",params,undefined,false); 
			copyArgs(Number(n),"HealthCheckPort",params,undefined,false); 
			copyArgs(n,"HealthCheckProtocol",params,undefined,false); 
			copyArgs(n,"HealthCheckPath",params,undefined,false); 
			copyArgs(Number(n),"HealthCheckIntervalSeconds",params,undefined,false); 
			copyArgs(Number(n),"ThresholdCount",params,undefined,false); 
			copyArgs(n,"PortOverrides",params,undefined,true); 
			
			copyArgs(msg,"EndpointGroupArn",params,undefined,false); 
			copyArgs(msg,"EndpointConfigurations",params,undefined,true); 
			copyArgs(msg,"TrafficDialPercentage",params,undefined,false); 
			copyArgs(msg,"HealthCheckPort",params,undefined,false); 
			copyArgs(msg,"HealthCheckProtocol",params,undefined,false); 
			copyArgs(msg,"HealthCheckPath",params,undefined,false); 
			copyArgs(msg,"HealthCheckIntervalSeconds",params,undefined,false); 
			copyArgs(msg,"ThresholdCount",params,undefined,false); 
			copyArgs(msg,"PortOverrides",params,undefined,true); 
			

			svc.updateEndpointGroup(params,cb);
		}
		
		service.UpdateListener=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ListenerArn",params,undefined,false); 
			
			copyArgs(n,"ListenerArn",params,undefined,false); 
			copyArgs(n,"PortRanges",params,undefined,true); 
			copyArgs(n,"Protocol",params,undefined,false); 
			copyArgs(n,"ClientAffinity",params,undefined,false); 
			
			copyArgs(msg,"ListenerArn",params,undefined,false); 
			copyArgs(msg,"PortRanges",params,undefined,true); 
			copyArgs(msg,"Protocol",params,undefined,false); 
			copyArgs(msg,"ClientAffinity",params,undefined,false); 
			

			svc.updateListener(params,cb);
		}
		
		service.WithdrawByoipCidr=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Cidr",params,undefined,false); 
			
			copyArgs(n,"Cidr",params,undefined,false); 
			
			copyArgs(msg,"Cidr",params,undefined,false); 
			

			svc.withdrawByoipCidr(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS GlobalAccelerator", AmazonAPINode);

};
