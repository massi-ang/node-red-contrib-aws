
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

		var awsService = new AWS.MediaConnect( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.MediaConnect(msg.AWSConfig) : awsService;

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
		
		service.AddFlowMediaStreams=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			copyArgs(n,"MediaStreams",params,undefined,true); 
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			copyArgs(n,"MediaStreams",params,undefined,true); 
			
			copyArgs(msg,"FlowArn",params,undefined,false); 
			copyArgs(msg,"MediaStreams",params,undefined,true); 
			

			svc.addFlowMediaStreams(params,cb);
		}
		
		service.AddFlowOutputs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			copyArgs(n,"Outputs",params,undefined,true); 
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			copyArgs(n,"Outputs",params,undefined,true); 
			
			copyArgs(msg,"FlowArn",params,undefined,false); 
			copyArgs(msg,"Outputs",params,undefined,true); 
			

			svc.addFlowOutputs(params,cb);
		}
		
		service.AddFlowSources=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			copyArgs(n,"Sources",params,undefined,true); 
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			copyArgs(n,"Sources",params,undefined,true); 
			
			copyArgs(msg,"FlowArn",params,undefined,false); 
			copyArgs(msg,"Sources",params,undefined,true); 
			

			svc.addFlowSources(params,cb);
		}
		
		service.AddFlowVpcInterfaces=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			copyArgs(n,"VpcInterfaces",params,undefined,true); 
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			copyArgs(n,"VpcInterfaces",params,undefined,true); 
			
			copyArgs(msg,"FlowArn",params,undefined,false); 
			copyArgs(msg,"VpcInterfaces",params,undefined,true); 
			

			svc.addFlowVpcInterfaces(params,cb);
		}
		
		service.CreateFlow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"AvailabilityZone",params,undefined,false); 
			copyArgs(n,"Entitlements",params,undefined,true); 
			copyArgs(n,"MediaStreams",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Outputs",params,undefined,true); 
			copyArgs(n,"Source",params,undefined,true); 
			copyArgs(n,"SourceFailoverConfig",params,undefined,true); 
			copyArgs(n,"Sources",params,undefined,true); 
			copyArgs(n,"VpcInterfaces",params,undefined,true); 
			
			copyArgs(msg,"AvailabilityZone",params,undefined,false); 
			copyArgs(msg,"Entitlements",params,undefined,true); 
			copyArgs(msg,"MediaStreams",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Outputs",params,undefined,true); 
			copyArgs(msg,"Source",params,undefined,true); 
			copyArgs(msg,"SourceFailoverConfig",params,undefined,true); 
			copyArgs(msg,"Sources",params,undefined,true); 
			copyArgs(msg,"VpcInterfaces",params,undefined,true); 
			

			svc.createFlow(params,cb);
		}
		
		service.DeleteFlow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			
			copyArgs(msg,"FlowArn",params,undefined,false); 
			

			svc.deleteFlow(params,cb);
		}
		
		service.DescribeFlow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			
			copyArgs(msg,"FlowArn",params,undefined,false); 
			

			svc.describeFlow(params,cb);
		}
		
		service.DescribeOffering=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OfferingArn",params,undefined,false); 
			
			copyArgs(n,"OfferingArn",params,undefined,false); 
			
			copyArgs(msg,"OfferingArn",params,undefined,false); 
			

			svc.describeOffering(params,cb);
		}
		
		service.DescribeReservation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReservationArn",params,undefined,false); 
			
			copyArgs(n,"ReservationArn",params,undefined,false); 
			
			copyArgs(msg,"ReservationArn",params,undefined,false); 
			

			svc.describeReservation(params,cb);
		}
		
		service.GrantFlowEntitlements=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			copyArgs(n,"Entitlements",params,undefined,true); 
			
			copyArgs(n,"Entitlements",params,undefined,true); 
			copyArgs(n,"FlowArn",params,undefined,false); 
			
			copyArgs(msg,"Entitlements",params,undefined,true); 
			copyArgs(msg,"FlowArn",params,undefined,false); 
			

			svc.grantFlowEntitlements(params,cb);
		}
		
		service.ListEntitlements=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listEntitlements(params,cb);
		}
		
		service.ListFlows=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listFlows(params,cb);
		}
		
		service.ListOfferings=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listOfferings(params,cb);
		}
		
		service.ListReservations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

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
			
			copyArgs(n,"OfferingArn",params,undefined,false); 
			copyArgs(n,"Start",params,undefined,false); 
			copyArgs(n,"ReservationName",params,undefined,false); 
			
			copyArgs(n,"OfferingArn",params,undefined,false); 
			copyArgs(n,"ReservationName",params,undefined,false); 
			copyArgs(n,"Start",params,undefined,false); 
			
			copyArgs(msg,"OfferingArn",params,undefined,false); 
			copyArgs(msg,"ReservationName",params,undefined,false); 
			copyArgs(msg,"Start",params,undefined,false); 
			

			svc.purchaseOffering(params,cb);
		}
		
		service.RemoveFlowMediaStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			copyArgs(n,"MediaStreamName",params,undefined,false); 
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			copyArgs(n,"MediaStreamName",params,undefined,false); 
			
			copyArgs(msg,"FlowArn",params,undefined,false); 
			copyArgs(msg,"MediaStreamName",params,undefined,false); 
			

			svc.removeFlowMediaStream(params,cb);
		}
		
		service.RemoveFlowOutput=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			copyArgs(n,"OutputArn",params,undefined,false); 
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			copyArgs(n,"OutputArn",params,undefined,false); 
			
			copyArgs(msg,"FlowArn",params,undefined,false); 
			copyArgs(msg,"OutputArn",params,undefined,false); 
			

			svc.removeFlowOutput(params,cb);
		}
		
		service.RemoveFlowSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			copyArgs(n,"SourceArn",params,undefined,false); 
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			copyArgs(n,"SourceArn",params,undefined,false); 
			
			copyArgs(msg,"FlowArn",params,undefined,false); 
			copyArgs(msg,"SourceArn",params,undefined,false); 
			

			svc.removeFlowSource(params,cb);
		}
		
		service.RemoveFlowVpcInterface=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			copyArgs(n,"VpcInterfaceName",params,undefined,false); 
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			copyArgs(n,"VpcInterfaceName",params,undefined,false); 
			
			copyArgs(msg,"FlowArn",params,undefined,false); 
			copyArgs(msg,"VpcInterfaceName",params,undefined,false); 
			

			svc.removeFlowVpcInterface(params,cb);
		}
		
		service.RevokeFlowEntitlement=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			copyArgs(n,"EntitlementArn",params,undefined,false); 
			
			copyArgs(n,"EntitlementArn",params,undefined,false); 
			copyArgs(n,"FlowArn",params,undefined,false); 
			
			copyArgs(msg,"EntitlementArn",params,undefined,false); 
			copyArgs(msg,"FlowArn",params,undefined,false); 
			

			svc.revokeFlowEntitlement(params,cb);
		}
		
		service.StartFlow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			
			copyArgs(msg,"FlowArn",params,undefined,false); 
			

			svc.startFlow(params,cb);
		}
		
		service.StopFlow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			
			copyArgs(msg,"FlowArn",params,undefined,false); 
			

			svc.stopFlow(params,cb);
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
			
			copyArgs(n,"TagKeys",params,undefined,true); 
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			

			svc.untagResource(params,cb);
		}
		
		service.UpdateFlow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			copyArgs(n,"SourceFailoverConfig",params,undefined,false); 
			
			copyArgs(msg,"FlowArn",params,undefined,false); 
			copyArgs(msg,"SourceFailoverConfig",params,undefined,false); 
			

			svc.updateFlow(params,cb);
		}
		
		service.UpdateFlowEntitlement=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			copyArgs(n,"EntitlementArn",params,undefined,false); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Encryption",params,undefined,true); 
			copyArgs(n,"EntitlementArn",params,undefined,false); 
			copyArgs(n,"EntitlementStatus",params,undefined,false); 
			copyArgs(n,"FlowArn",params,undefined,false); 
			copyArgs(n,"Subscribers",params,undefined,true); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Encryption",params,undefined,true); 
			copyArgs(msg,"EntitlementArn",params,undefined,false); 
			copyArgs(msg,"EntitlementStatus",params,undefined,false); 
			copyArgs(msg,"FlowArn",params,undefined,false); 
			copyArgs(msg,"Subscribers",params,undefined,true); 
			

			svc.updateFlowEntitlement(params,cb);
		}
		
		service.UpdateFlowMediaStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			copyArgs(n,"MediaStreamName",params,undefined,false); 
			
			copyArgs(n,"Attributes",params,undefined,true); 
			copyArgs(Number(n),"ClockRate",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"FlowArn",params,undefined,false); 
			copyArgs(n,"MediaStreamName",params,undefined,false); 
			copyArgs(n,"MediaStreamType",params,undefined,false); 
			copyArgs(n,"VideoFormat",params,undefined,false); 
			
			copyArgs(msg,"Attributes",params,undefined,true); 
			copyArgs(msg,"ClockRate",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"FlowArn",params,undefined,false); 
			copyArgs(msg,"MediaStreamName",params,undefined,false); 
			copyArgs(msg,"MediaStreamType",params,undefined,false); 
			copyArgs(msg,"VideoFormat",params,undefined,false); 
			

			svc.updateFlowMediaStream(params,cb);
		}
		
		service.UpdateFlowOutput=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			copyArgs(n,"OutputArn",params,undefined,false); 
			
			copyArgs(n,"CidrAllowList",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Destination",params,undefined,false); 
			copyArgs(n,"Encryption",params,undefined,true); 
			copyArgs(n,"FlowArn",params,undefined,false); 
			copyArgs(Number(n),"MaxLatency",params,undefined,false); 
			copyArgs(n,"MediaStreamOutputConfigurations",params,undefined,true); 
			copyArgs(Number(n),"MinLatency",params,undefined,false); 
			copyArgs(n,"OutputArn",params,undefined,false); 
			copyArgs(Number(n),"Port",params,undefined,false); 
			copyArgs(n,"Protocol",params,undefined,false); 
			copyArgs(n,"RemoteId",params,undefined,false); 
			copyArgs(Number(n),"SmoothingLatency",params,undefined,false); 
			copyArgs(n,"StreamId",params,undefined,false); 
			copyArgs(n,"VpcInterfaceAttachment",params,undefined,true); 
			
			copyArgs(msg,"CidrAllowList",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Destination",params,undefined,false); 
			copyArgs(msg,"Encryption",params,undefined,true); 
			copyArgs(msg,"FlowArn",params,undefined,false); 
			copyArgs(msg,"MaxLatency",params,undefined,false); 
			copyArgs(msg,"MediaStreamOutputConfigurations",params,undefined,true); 
			copyArgs(msg,"MinLatency",params,undefined,false); 
			copyArgs(msg,"OutputArn",params,undefined,false); 
			copyArgs(msg,"Port",params,undefined,false); 
			copyArgs(msg,"Protocol",params,undefined,false); 
			copyArgs(msg,"RemoteId",params,undefined,false); 
			copyArgs(msg,"SmoothingLatency",params,undefined,false); 
			copyArgs(msg,"StreamId",params,undefined,false); 
			copyArgs(msg,"VpcInterfaceAttachment",params,undefined,true); 
			

			svc.updateFlowOutput(params,cb);
		}
		
		service.UpdateFlowSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FlowArn",params,undefined,false); 
			copyArgs(n,"SourceArn",params,undefined,false); 
			
			copyArgs(n,"Decryption",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"EntitlementArn",params,undefined,false); 
			copyArgs(n,"FlowArn",params,undefined,false); 
			copyArgs(Number(n),"IngestPort",params,undefined,false); 
			copyArgs(Number(n),"MaxBitrate",params,undefined,false); 
			copyArgs(Number(n),"MaxLatency",params,undefined,false); 
			copyArgs(Number(n),"MaxSyncBuffer",params,undefined,false); 
			copyArgs(n,"MediaStreamSourceConfigurations",params,undefined,true); 
			copyArgs(Number(n),"MinLatency",params,undefined,false); 
			copyArgs(n,"Protocol",params,undefined,false); 
			copyArgs(n,"SourceArn",params,undefined,false); 
			copyArgs(n,"StreamId",params,undefined,false); 
			copyArgs(n,"VpcInterfaceName",params,undefined,false); 
			copyArgs(n,"WhitelistCidr",params,undefined,false); 
			
			copyArgs(msg,"Decryption",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"EntitlementArn",params,undefined,false); 
			copyArgs(msg,"FlowArn",params,undefined,false); 
			copyArgs(msg,"IngestPort",params,undefined,false); 
			copyArgs(msg,"MaxBitrate",params,undefined,false); 
			copyArgs(msg,"MaxLatency",params,undefined,false); 
			copyArgs(msg,"MaxSyncBuffer",params,undefined,false); 
			copyArgs(msg,"MediaStreamSourceConfigurations",params,undefined,true); 
			copyArgs(msg,"MinLatency",params,undefined,false); 
			copyArgs(msg,"Protocol",params,undefined,false); 
			copyArgs(msg,"SourceArn",params,undefined,false); 
			copyArgs(msg,"StreamId",params,undefined,false); 
			copyArgs(msg,"VpcInterfaceName",params,undefined,false); 
			copyArgs(msg,"WhitelistCidr",params,undefined,false); 
			

			svc.updateFlowSource(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS MediaConnect", AmazonAPINode);

};
