
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

		var awsService = new AWS.MediaConnect( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.MediaConnect(msg.AWSConfig) : awsService;

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

		
		service.AddFlowMediaStreams=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FlowArn",params,undefined,false); 
			copyArg(n,"MediaStreams",params,undefined,true); 
			
			copyArg(msg,"FlowArn",params,undefined,false); 
			copyArg(msg,"MediaStreams",params,undefined,true); 
			

			svc.addFlowMediaStreams(params,cb);
		}

		
		service.AddFlowOutputs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FlowArn",params,undefined,false); 
			copyArg(n,"Outputs",params,undefined,true); 
			
			copyArg(msg,"FlowArn",params,undefined,false); 
			copyArg(msg,"Outputs",params,undefined,true); 
			

			svc.addFlowOutputs(params,cb);
		}

		
		service.AddFlowSources=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FlowArn",params,undefined,false); 
			copyArg(n,"Sources",params,undefined,true); 
			
			copyArg(msg,"FlowArn",params,undefined,false); 
			copyArg(msg,"Sources",params,undefined,true); 
			

			svc.addFlowSources(params,cb);
		}

		
		service.AddFlowVpcInterfaces=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FlowArn",params,undefined,false); 
			copyArg(n,"VpcInterfaces",params,undefined,true); 
			
			copyArg(msg,"FlowArn",params,undefined,false); 
			copyArg(msg,"VpcInterfaces",params,undefined,true); 
			

			svc.addFlowVpcInterfaces(params,cb);
		}

		
		service.CreateFlow=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"AvailabilityZone",params,undefined,false); 
			copyArg(msg,"Entitlements",params,undefined,true); 
			copyArg(msg,"MediaStreams",params,undefined,true); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Outputs",params,undefined,true); 
			copyArg(msg,"Source",params,undefined,true); 
			copyArg(msg,"SourceFailoverConfig",params,undefined,true); 
			copyArg(msg,"Sources",params,undefined,true); 
			copyArg(msg,"VpcInterfaces",params,undefined,true); 
			

			svc.createFlow(params,cb);
		}

		
		service.DeleteFlow=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FlowArn",params,undefined,false); 
			
			copyArg(msg,"FlowArn",params,undefined,false); 
			

			svc.deleteFlow(params,cb);
		}

		
		service.DescribeFlow=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FlowArn",params,undefined,false); 
			
			copyArg(msg,"FlowArn",params,undefined,false); 
			

			svc.describeFlow(params,cb);
		}

		
		service.DescribeOffering=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OfferingArn",params,undefined,false); 
			
			copyArg(msg,"OfferingArn",params,undefined,false); 
			

			svc.describeOffering(params,cb);
		}

		
		service.DescribeReservation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReservationArn",params,undefined,false); 
			
			copyArg(msg,"ReservationArn",params,undefined,false); 
			

			svc.describeReservation(params,cb);
		}

		
		service.GrantFlowEntitlements=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FlowArn",params,undefined,false); 
			copyArg(n,"Entitlements",params,undefined,true); 
			
			copyArg(msg,"Entitlements",params,undefined,true); 
			copyArg(msg,"FlowArn",params,undefined,false); 
			

			svc.grantFlowEntitlements(params,cb);
		}

		
		service.ListEntitlements=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listEntitlements(params,cb);
		}

		
		service.ListFlows=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listFlows(params,cb);
		}

		
		service.ListOfferings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listOfferings(params,cb);
		}

		
		service.ListReservations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listReservations(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PurchaseOffering=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OfferingArn",params,undefined,false); 
			copyArg(n,"Start",params,undefined,false); 
			copyArg(n,"ReservationName",params,undefined,false); 
			
			copyArg(msg,"OfferingArn",params,undefined,false); 
			copyArg(msg,"ReservationName",params,undefined,false); 
			copyArg(msg,"Start",params,undefined,false); 
			

			svc.purchaseOffering(params,cb);
		}

		
		service.RemoveFlowMediaStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FlowArn",params,undefined,false); 
			copyArg(n,"MediaStreamName",params,undefined,false); 
			
			copyArg(msg,"FlowArn",params,undefined,false); 
			copyArg(msg,"MediaStreamName",params,undefined,false); 
			

			svc.removeFlowMediaStream(params,cb);
		}

		
		service.RemoveFlowOutput=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FlowArn",params,undefined,false); 
			copyArg(n,"OutputArn",params,undefined,false); 
			
			copyArg(msg,"FlowArn",params,undefined,false); 
			copyArg(msg,"OutputArn",params,undefined,false); 
			

			svc.removeFlowOutput(params,cb);
		}

		
		service.RemoveFlowSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FlowArn",params,undefined,false); 
			copyArg(n,"SourceArn",params,undefined,false); 
			
			copyArg(msg,"FlowArn",params,undefined,false); 
			copyArg(msg,"SourceArn",params,undefined,false); 
			

			svc.removeFlowSource(params,cb);
		}

		
		service.RemoveFlowVpcInterface=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FlowArn",params,undefined,false); 
			copyArg(n,"VpcInterfaceName",params,undefined,false); 
			
			copyArg(msg,"FlowArn",params,undefined,false); 
			copyArg(msg,"VpcInterfaceName",params,undefined,false); 
			

			svc.removeFlowVpcInterface(params,cb);
		}

		
		service.RevokeFlowEntitlement=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FlowArn",params,undefined,false); 
			copyArg(n,"EntitlementArn",params,undefined,false); 
			
			copyArg(msg,"EntitlementArn",params,undefined,false); 
			copyArg(msg,"FlowArn",params,undefined,false); 
			

			svc.revokeFlowEntitlement(params,cb);
		}

		
		service.StartFlow=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FlowArn",params,undefined,false); 
			
			copyArg(msg,"FlowArn",params,undefined,false); 
			

			svc.startFlow(params,cb);
		}

		
		service.StopFlow=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FlowArn",params,undefined,false); 
			
			copyArg(msg,"FlowArn",params,undefined,false); 
			

			svc.stopFlow(params,cb);
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
			
			copyArg(n,"TagKeys",params,undefined,true); 
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateFlow=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FlowArn",params,undefined,false); 
			
			copyArg(msg,"FlowArn",params,undefined,false); 
			copyArg(msg,"SourceFailoverConfig",params,undefined,false); 
			

			svc.updateFlow(params,cb);
		}

		
		service.UpdateFlowEntitlement=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FlowArn",params,undefined,false); 
			copyArg(n,"EntitlementArn",params,undefined,false); 
			
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Encryption",params,undefined,true); 
			copyArg(msg,"EntitlementArn",params,undefined,false); 
			copyArg(msg,"EntitlementStatus",params,undefined,false); 
			copyArg(msg,"FlowArn",params,undefined,false); 
			copyArg(msg,"Subscribers",params,undefined,true); 
			

			svc.updateFlowEntitlement(params,cb);
		}

		
		service.UpdateFlowMediaStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FlowArn",params,undefined,false); 
			copyArg(n,"MediaStreamName",params,undefined,false); 
			
			copyArg(msg,"Attributes",params,undefined,true); 
			copyArg(msg,"ClockRate",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"FlowArn",params,undefined,false); 
			copyArg(msg,"MediaStreamName",params,undefined,false); 
			copyArg(msg,"MediaStreamType",params,undefined,false); 
			copyArg(msg,"VideoFormat",params,undefined,false); 
			

			svc.updateFlowMediaStream(params,cb);
		}

		
		service.UpdateFlowOutput=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FlowArn",params,undefined,false); 
			copyArg(n,"OutputArn",params,undefined,false); 
			
			copyArg(msg,"CidrAllowList",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Destination",params,undefined,false); 
			copyArg(msg,"Encryption",params,undefined,true); 
			copyArg(msg,"FlowArn",params,undefined,false); 
			copyArg(msg,"MaxLatency",params,undefined,false); 
			copyArg(msg,"MediaStreamOutputConfigurations",params,undefined,true); 
			copyArg(msg,"MinLatency",params,undefined,false); 
			copyArg(msg,"OutputArn",params,undefined,false); 
			copyArg(msg,"Port",params,undefined,false); 
			copyArg(msg,"Protocol",params,undefined,false); 
			copyArg(msg,"RemoteId",params,undefined,false); 
			copyArg(msg,"SmoothingLatency",params,undefined,false); 
			copyArg(msg,"StreamId",params,undefined,false); 
			copyArg(msg,"VpcInterfaceAttachment",params,undefined,true); 
			

			svc.updateFlowOutput(params,cb);
		}

		
		service.UpdateFlowSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FlowArn",params,undefined,false); 
			copyArg(n,"SourceArn",params,undefined,false); 
			
			copyArg(msg,"Decryption",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"EntitlementArn",params,undefined,false); 
			copyArg(msg,"FlowArn",params,undefined,false); 
			copyArg(msg,"IngestPort",params,undefined,false); 
			copyArg(msg,"MaxBitrate",params,undefined,false); 
			copyArg(msg,"MaxLatency",params,undefined,false); 
			copyArg(msg,"MaxSyncBuffer",params,undefined,false); 
			copyArg(msg,"MediaStreamSourceConfigurations",params,undefined,true); 
			copyArg(msg,"MinLatency",params,undefined,false); 
			copyArg(msg,"Protocol",params,undefined,false); 
			copyArg(msg,"SourceArn",params,undefined,false); 
			copyArg(msg,"StreamId",params,undefined,false); 
			copyArg(msg,"VpcInterfaceName",params,undefined,false); 
			copyArg(msg,"WhitelistCidr",params,undefined,false); 
			

			svc.updateFlowSource(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS MediaConnect", AmazonAPINode);

};
