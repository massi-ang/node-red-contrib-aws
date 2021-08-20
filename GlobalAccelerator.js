
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

		var awsService = new AWS.GlobalAccelerator( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.GlobalAccelerator(msg.AWSConfig) : awsService;

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

		
		service.AddCustomRoutingEndpoints=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndpointConfigurations",params,undefined,false); 
			copyArg(n,"EndpointGroupArn",params,undefined,false); 
			
			copyArg(msg,"EndpointConfigurations",params,undefined,false); 
			copyArg(msg,"EndpointGroupArn",params,undefined,false); 
			

			svc.addCustomRoutingEndpoints(params,cb);
		}

		
		service.AdvertiseByoipCidr=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Cidr",params,undefined,false); 
			
			copyArg(msg,"Cidr",params,undefined,false); 
			

			svc.advertiseByoipCidr(params,cb);
		}

		
		service.AllowCustomRoutingTraffic=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndpointGroupArn",params,undefined,false); 
			copyArg(n,"EndpointId",params,undefined,false); 
			
			copyArg(msg,"EndpointGroupArn",params,undefined,false); 
			copyArg(msg,"EndpointId",params,undefined,false); 
			copyArg(msg,"DestinationAddresses",params,undefined,true); 
			copyArg(msg,"DestinationPorts",params,undefined,true); 
			copyArg(msg,"AllowAllTrafficToEndpoint",params,undefined,false); 
			

			svc.allowCustomRoutingTraffic(params,cb);
		}

		
		service.CreateAccelerator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"IdempotencyToken",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"IpAddressType",params,undefined,false); 
			copyArg(msg,"IpAddresses",params,undefined,true); 
			copyArg(msg,"Enabled",params,undefined,false); 
			copyArg(msg,"IdempotencyToken",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createAccelerator(params,cb);
		}

		
		service.CreateCustomRoutingAccelerator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"IdempotencyToken",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"IpAddressType",params,undefined,false); 
			copyArg(msg,"IpAddresses",params,undefined,true); 
			copyArg(msg,"Enabled",params,undefined,false); 
			copyArg(msg,"IdempotencyToken",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createCustomRoutingAccelerator(params,cb);
		}

		
		service.CreateCustomRoutingEndpointGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ListenerArn",params,undefined,false); 
			copyArg(n,"EndpointGroupRegion",params,undefined,false); 
			copyArg(n,"DestinationConfigurations",params,undefined,false); 
			copyArg(n,"IdempotencyToken",params,undefined,false); 
			
			copyArg(msg,"ListenerArn",params,undefined,false); 
			copyArg(msg,"EndpointGroupRegion",params,undefined,false); 
			copyArg(msg,"DestinationConfigurations",params,undefined,false); 
			copyArg(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.createCustomRoutingEndpointGroup(params,cb);
		}

		
		service.CreateCustomRoutingListener=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AcceleratorArn",params,undefined,false); 
			copyArg(n,"PortRanges",params,undefined,true); 
			copyArg(n,"IdempotencyToken",params,undefined,false); 
			
			copyArg(msg,"AcceleratorArn",params,undefined,false); 
			copyArg(msg,"PortRanges",params,undefined,true); 
			copyArg(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.createCustomRoutingListener(params,cb);
		}

		
		service.CreateEndpointGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ListenerArn",params,undefined,false); 
			copyArg(n,"EndpointGroupRegion",params,undefined,false); 
			copyArg(n,"IdempotencyToken",params,undefined,false); 
			
			copyArg(msg,"ListenerArn",params,undefined,false); 
			copyArg(msg,"EndpointGroupRegion",params,undefined,false); 
			copyArg(msg,"EndpointConfigurations",params,undefined,true); 
			copyArg(msg,"TrafficDialPercentage",params,undefined,false); 
			copyArg(msg,"HealthCheckPort",params,undefined,false); 
			copyArg(msg,"HealthCheckProtocol",params,undefined,false); 
			copyArg(msg,"HealthCheckPath",params,undefined,false); 
			copyArg(msg,"HealthCheckIntervalSeconds",params,undefined,false); 
			copyArg(msg,"ThresholdCount",params,undefined,false); 
			copyArg(msg,"IdempotencyToken",params,undefined,false); 
			copyArg(msg,"PortOverrides",params,undefined,true); 
			

			svc.createEndpointGroup(params,cb);
		}

		
		service.CreateListener=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AcceleratorArn",params,undefined,false); 
			copyArg(n,"PortRanges",params,undefined,true); 
			copyArg(n,"Protocol",params,undefined,false); 
			copyArg(n,"IdempotencyToken",params,undefined,false); 
			
			copyArg(msg,"AcceleratorArn",params,undefined,false); 
			copyArg(msg,"PortRanges",params,undefined,true); 
			copyArg(msg,"Protocol",params,undefined,false); 
			copyArg(msg,"ClientAffinity",params,undefined,false); 
			copyArg(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.createListener(params,cb);
		}

		
		service.DeleteAccelerator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AcceleratorArn",params,undefined,false); 
			
			copyArg(msg,"AcceleratorArn",params,undefined,false); 
			

			svc.deleteAccelerator(params,cb);
		}

		
		service.DeleteCustomRoutingAccelerator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AcceleratorArn",params,undefined,false); 
			
			copyArg(msg,"AcceleratorArn",params,undefined,false); 
			

			svc.deleteCustomRoutingAccelerator(params,cb);
		}

		
		service.DeleteCustomRoutingEndpointGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndpointGroupArn",params,undefined,false); 
			
			copyArg(msg,"EndpointGroupArn",params,undefined,false); 
			

			svc.deleteCustomRoutingEndpointGroup(params,cb);
		}

		
		service.DeleteCustomRoutingListener=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ListenerArn",params,undefined,false); 
			
			copyArg(msg,"ListenerArn",params,undefined,false); 
			

			svc.deleteCustomRoutingListener(params,cb);
		}

		
		service.DeleteEndpointGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndpointGroupArn",params,undefined,false); 
			
			copyArg(msg,"EndpointGroupArn",params,undefined,false); 
			

			svc.deleteEndpointGroup(params,cb);
		}

		
		service.DeleteListener=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ListenerArn",params,undefined,false); 
			
			copyArg(msg,"ListenerArn",params,undefined,false); 
			

			svc.deleteListener(params,cb);
		}

		
		service.DenyCustomRoutingTraffic=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndpointGroupArn",params,undefined,false); 
			copyArg(n,"EndpointId",params,undefined,false); 
			
			copyArg(msg,"EndpointGroupArn",params,undefined,false); 
			copyArg(msg,"EndpointId",params,undefined,false); 
			copyArg(msg,"DestinationAddresses",params,undefined,true); 
			copyArg(msg,"DestinationPorts",params,undefined,true); 
			copyArg(msg,"DenyAllTrafficToEndpoint",params,undefined,false); 
			

			svc.denyCustomRoutingTraffic(params,cb);
		}

		
		service.DeprovisionByoipCidr=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Cidr",params,undefined,false); 
			
			copyArg(msg,"Cidr",params,undefined,false); 
			

			svc.deprovisionByoipCidr(params,cb);
		}

		
		service.DescribeAccelerator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AcceleratorArn",params,undefined,false); 
			
			copyArg(msg,"AcceleratorArn",params,undefined,false); 
			

			svc.describeAccelerator(params,cb);
		}

		
		service.DescribeAcceleratorAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AcceleratorArn",params,undefined,false); 
			
			copyArg(msg,"AcceleratorArn",params,undefined,false); 
			

			svc.describeAcceleratorAttributes(params,cb);
		}

		
		service.DescribeCustomRoutingAccelerator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AcceleratorArn",params,undefined,false); 
			
			copyArg(msg,"AcceleratorArn",params,undefined,false); 
			

			svc.describeCustomRoutingAccelerator(params,cb);
		}

		
		service.DescribeCustomRoutingAcceleratorAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AcceleratorArn",params,undefined,false); 
			
			copyArg(msg,"AcceleratorArn",params,undefined,false); 
			

			svc.describeCustomRoutingAcceleratorAttributes(params,cb);
		}

		
		service.DescribeCustomRoutingEndpointGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndpointGroupArn",params,undefined,false); 
			
			copyArg(msg,"EndpointGroupArn",params,undefined,false); 
			

			svc.describeCustomRoutingEndpointGroup(params,cb);
		}

		
		service.DescribeCustomRoutingListener=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ListenerArn",params,undefined,false); 
			
			copyArg(msg,"ListenerArn",params,undefined,false); 
			

			svc.describeCustomRoutingListener(params,cb);
		}

		
		service.DescribeEndpointGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndpointGroupArn",params,undefined,false); 
			
			copyArg(msg,"EndpointGroupArn",params,undefined,false); 
			

			svc.describeEndpointGroup(params,cb);
		}

		
		service.DescribeListener=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ListenerArn",params,undefined,false); 
			
			copyArg(msg,"ListenerArn",params,undefined,false); 
			

			svc.describeListener(params,cb);
		}

		
		service.ListAccelerators=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listAccelerators(params,cb);
		}

		
		service.ListByoipCidrs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listByoipCidrs(params,cb);
		}

		
		service.ListCustomRoutingAccelerators=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listCustomRoutingAccelerators(params,cb);
		}

		
		service.ListCustomRoutingEndpointGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ListenerArn",params,undefined,false); 
			
			copyArg(msg,"ListenerArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listCustomRoutingEndpointGroups(params,cb);
		}

		
		service.ListCustomRoutingListeners=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AcceleratorArn",params,undefined,false); 
			
			copyArg(msg,"AcceleratorArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listCustomRoutingListeners(params,cb);
		}

		
		service.ListCustomRoutingPortMappings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AcceleratorArn",params,undefined,false); 
			
			copyArg(msg,"AcceleratorArn",params,undefined,false); 
			copyArg(msg,"EndpointGroupArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listCustomRoutingPortMappings(params,cb);
		}

		
		service.ListCustomRoutingPortMappingsByDestination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndpointId",params,undefined,false); 
			copyArg(n,"DestinationAddress",params,undefined,false); 
			
			copyArg(msg,"EndpointId",params,undefined,false); 
			copyArg(msg,"DestinationAddress",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listCustomRoutingPortMappingsByDestination(params,cb);
		}

		
		service.ListEndpointGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ListenerArn",params,undefined,false); 
			
			copyArg(msg,"ListenerArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listEndpointGroups(params,cb);
		}

		
		service.ListListeners=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AcceleratorArn",params,undefined,false); 
			
			copyArg(msg,"AcceleratorArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listListeners(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ProvisionByoipCidr=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Cidr",params,undefined,false); 
			copyArg(n,"CidrAuthorizationContext",params,undefined,false); 
			
			copyArg(msg,"Cidr",params,undefined,false); 
			copyArg(msg,"CidrAuthorizationContext",params,undefined,false); 
			

			svc.provisionByoipCidr(params,cb);
		}

		
		service.RemoveCustomRoutingEndpoints=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndpointIds",params,undefined,false); 
			copyArg(n,"EndpointGroupArn",params,undefined,false); 
			
			copyArg(msg,"EndpointIds",params,undefined,false); 
			copyArg(msg,"EndpointGroupArn",params,undefined,false); 
			

			svc.removeCustomRoutingEndpoints(params,cb);
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

		
		service.UpdateAccelerator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AcceleratorArn",params,undefined,false); 
			
			copyArg(msg,"AcceleratorArn",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"IpAddressType",params,undefined,false); 
			copyArg(msg,"Enabled",params,undefined,false); 
			

			svc.updateAccelerator(params,cb);
		}

		
		service.UpdateAcceleratorAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AcceleratorArn",params,undefined,false); 
			
			copyArg(msg,"AcceleratorArn",params,undefined,false); 
			copyArg(msg,"FlowLogsEnabled",params,undefined,false); 
			copyArg(msg,"FlowLogsS3Bucket",params,undefined,false); 
			copyArg(msg,"FlowLogsS3Prefix",params,undefined,false); 
			

			svc.updateAcceleratorAttributes(params,cb);
		}

		
		service.UpdateCustomRoutingAccelerator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AcceleratorArn",params,undefined,false); 
			
			copyArg(msg,"AcceleratorArn",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"IpAddressType",params,undefined,false); 
			copyArg(msg,"Enabled",params,undefined,false); 
			

			svc.updateCustomRoutingAccelerator(params,cb);
		}

		
		service.UpdateCustomRoutingAcceleratorAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AcceleratorArn",params,undefined,false); 
			
			copyArg(msg,"AcceleratorArn",params,undefined,false); 
			copyArg(msg,"FlowLogsEnabled",params,undefined,false); 
			copyArg(msg,"FlowLogsS3Bucket",params,undefined,false); 
			copyArg(msg,"FlowLogsS3Prefix",params,undefined,false); 
			

			svc.updateCustomRoutingAcceleratorAttributes(params,cb);
		}

		
		service.UpdateCustomRoutingListener=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ListenerArn",params,undefined,false); 
			copyArg(n,"PortRanges",params,undefined,true); 
			
			copyArg(msg,"ListenerArn",params,undefined,false); 
			copyArg(msg,"PortRanges",params,undefined,true); 
			

			svc.updateCustomRoutingListener(params,cb);
		}

		
		service.UpdateEndpointGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndpointGroupArn",params,undefined,false); 
			
			copyArg(msg,"EndpointGroupArn",params,undefined,false); 
			copyArg(msg,"EndpointConfigurations",params,undefined,true); 
			copyArg(msg,"TrafficDialPercentage",params,undefined,false); 
			copyArg(msg,"HealthCheckPort",params,undefined,false); 
			copyArg(msg,"HealthCheckProtocol",params,undefined,false); 
			copyArg(msg,"HealthCheckPath",params,undefined,false); 
			copyArg(msg,"HealthCheckIntervalSeconds",params,undefined,false); 
			copyArg(msg,"ThresholdCount",params,undefined,false); 
			copyArg(msg,"PortOverrides",params,undefined,true); 
			

			svc.updateEndpointGroup(params,cb);
		}

		
		service.UpdateListener=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ListenerArn",params,undefined,false); 
			
			copyArg(msg,"ListenerArn",params,undefined,false); 
			copyArg(msg,"PortRanges",params,undefined,true); 
			copyArg(msg,"Protocol",params,undefined,false); 
			copyArg(msg,"ClientAffinity",params,undefined,false); 
			

			svc.updateListener(params,cb);
		}

		
		service.WithdrawByoipCidr=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Cidr",params,undefined,false); 
			
			copyArg(msg,"Cidr",params,undefined,false); 
			

			svc.withdrawByoipCidr(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS GlobalAccelerator", AmazonAPINode);

};
