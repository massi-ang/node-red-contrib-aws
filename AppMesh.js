
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

		var awsService = new AWS.AppMesh( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.AppMesh(msg.AWSConfig) : awsService;

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

		
		service.CreateGatewayRoute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"gatewayRouteName",params,undefined,false); 
			copyArg(n,"meshName",params,undefined,false); 
			copyArg(n,"spec",params,undefined,true); 
			copyArg(n,"virtualGatewayName",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"gatewayRouteName",params,undefined,false); 
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"spec",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"virtualGatewayName",params,undefined,false); 
			

			svc.createGatewayRoute(params,cb);
		}

		
		service.CreateMesh=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"spec",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createMesh(params,cb);
		}

		
		service.CreateRoute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			copyArg(n,"routeName",params,undefined,false); 
			copyArg(n,"spec",params,undefined,true); 
			copyArg(n,"virtualRouterName",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"routeName",params,undefined,false); 
			copyArg(msg,"spec",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"virtualRouterName",params,undefined,false); 
			

			svc.createRoute(params,cb);
		}

		
		service.CreateVirtualGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			copyArg(n,"spec",params,undefined,true); 
			copyArg(n,"virtualGatewayName",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"spec",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"virtualGatewayName",params,undefined,false); 
			

			svc.createVirtualGateway(params,cb);
		}

		
		service.CreateVirtualNode=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			copyArg(n,"spec",params,undefined,true); 
			copyArg(n,"virtualNodeName",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"spec",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"virtualNodeName",params,undefined,false); 
			

			svc.createVirtualNode(params,cb);
		}

		
		service.CreateVirtualRouter=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			copyArg(n,"spec",params,undefined,true); 
			copyArg(n,"virtualRouterName",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"spec",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"virtualRouterName",params,undefined,false); 
			

			svc.createVirtualRouter(params,cb);
		}

		
		service.CreateVirtualService=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			copyArg(n,"spec",params,undefined,true); 
			copyArg(n,"virtualServiceName",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"spec",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"virtualServiceName",params,undefined,false); 
			

			svc.createVirtualService(params,cb);
		}

		
		service.DeleteGatewayRoute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"gatewayRouteName",params,undefined,false); 
			copyArg(n,"meshName",params,undefined,false); 
			copyArg(n,"virtualGatewayName",params,undefined,false); 
			
			copyArg(msg,"gatewayRouteName",params,undefined,false); 
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"virtualGatewayName",params,undefined,false); 
			

			svc.deleteGatewayRoute(params,cb);
		}

		
		service.DeleteMesh=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			
			copyArg(msg,"meshName",params,undefined,false); 
			

			svc.deleteMesh(params,cb);
		}

		
		service.DeleteRoute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			copyArg(n,"routeName",params,undefined,false); 
			copyArg(n,"virtualRouterName",params,undefined,false); 
			
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"routeName",params,undefined,false); 
			copyArg(msg,"virtualRouterName",params,undefined,false); 
			

			svc.deleteRoute(params,cb);
		}

		
		service.DeleteVirtualGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			copyArg(n,"virtualGatewayName",params,undefined,false); 
			
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"virtualGatewayName",params,undefined,false); 
			

			svc.deleteVirtualGateway(params,cb);
		}

		
		service.DeleteVirtualNode=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			copyArg(n,"virtualNodeName",params,undefined,false); 
			
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"virtualNodeName",params,undefined,false); 
			

			svc.deleteVirtualNode(params,cb);
		}

		
		service.DeleteVirtualRouter=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			copyArg(n,"virtualRouterName",params,undefined,false); 
			
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"virtualRouterName",params,undefined,false); 
			

			svc.deleteVirtualRouter(params,cb);
		}

		
		service.DeleteVirtualService=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			copyArg(n,"virtualServiceName",params,undefined,false); 
			
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"virtualServiceName",params,undefined,false); 
			

			svc.deleteVirtualService(params,cb);
		}

		
		service.DescribeGatewayRoute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"gatewayRouteName",params,undefined,false); 
			copyArg(n,"meshName",params,undefined,false); 
			copyArg(n,"virtualGatewayName",params,undefined,false); 
			
			copyArg(msg,"gatewayRouteName",params,undefined,false); 
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"virtualGatewayName",params,undefined,false); 
			

			svc.describeGatewayRoute(params,cb);
		}

		
		service.DescribeMesh=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			

			svc.describeMesh(params,cb);
		}

		
		service.DescribeRoute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			copyArg(n,"routeName",params,undefined,false); 
			copyArg(n,"virtualRouterName",params,undefined,false); 
			
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"routeName",params,undefined,false); 
			copyArg(msg,"virtualRouterName",params,undefined,false); 
			

			svc.describeRoute(params,cb);
		}

		
		service.DescribeVirtualGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			copyArg(n,"virtualGatewayName",params,undefined,false); 
			
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"virtualGatewayName",params,undefined,false); 
			

			svc.describeVirtualGateway(params,cb);
		}

		
		service.DescribeVirtualNode=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			copyArg(n,"virtualNodeName",params,undefined,false); 
			
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"virtualNodeName",params,undefined,false); 
			

			svc.describeVirtualNode(params,cb);
		}

		
		service.DescribeVirtualRouter=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			copyArg(n,"virtualRouterName",params,undefined,false); 
			
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"virtualRouterName",params,undefined,false); 
			

			svc.describeVirtualRouter(params,cb);
		}

		
		service.DescribeVirtualService=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			copyArg(n,"virtualServiceName",params,undefined,false); 
			
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"virtualServiceName",params,undefined,false); 
			

			svc.describeVirtualService(params,cb);
		}

		
		service.ListGatewayRoutes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			copyArg(n,"virtualGatewayName",params,undefined,false); 
			
			copyArg(msg,"limit",params,undefined,false); 
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"virtualGatewayName",params,undefined,false); 
			

			svc.listGatewayRoutes(params,cb);
		}

		
		service.ListMeshes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"limit",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listMeshes(params,cb);
		}

		
		service.ListRoutes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			copyArg(n,"virtualRouterName",params,undefined,false); 
			
			copyArg(msg,"limit",params,undefined,false); 
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"virtualRouterName",params,undefined,false); 
			

			svc.listRoutes(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"limit",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListVirtualGateways=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			
			copyArg(msg,"limit",params,undefined,false); 
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listVirtualGateways(params,cb);
		}

		
		service.ListVirtualNodes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			
			copyArg(msg,"limit",params,undefined,false); 
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listVirtualNodes(params,cb);
		}

		
		service.ListVirtualRouters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			
			copyArg(msg,"limit",params,undefined,false); 
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listVirtualRouters(params,cb);
		}

		
		service.ListVirtualServices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			
			copyArg(msg,"limit",params,undefined,false); 
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listVirtualServices(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"tags",params,undefined,true); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"tagKeys",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateGatewayRoute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"gatewayRouteName",params,undefined,false); 
			copyArg(n,"meshName",params,undefined,false); 
			copyArg(n,"spec",params,undefined,true); 
			copyArg(n,"virtualGatewayName",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"gatewayRouteName",params,undefined,false); 
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"spec",params,undefined,true); 
			copyArg(msg,"virtualGatewayName",params,undefined,false); 
			

			svc.updateGatewayRoute(params,cb);
		}

		
		service.UpdateMesh=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"spec",params,undefined,true); 
			

			svc.updateMesh(params,cb);
		}

		
		service.UpdateRoute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			copyArg(n,"routeName",params,undefined,false); 
			copyArg(n,"spec",params,undefined,true); 
			copyArg(n,"virtualRouterName",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"routeName",params,undefined,false); 
			copyArg(msg,"spec",params,undefined,true); 
			copyArg(msg,"virtualRouterName",params,undefined,false); 
			

			svc.updateRoute(params,cb);
		}

		
		service.UpdateVirtualGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			copyArg(n,"spec",params,undefined,true); 
			copyArg(n,"virtualGatewayName",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"spec",params,undefined,true); 
			copyArg(msg,"virtualGatewayName",params,undefined,false); 
			

			svc.updateVirtualGateway(params,cb);
		}

		
		service.UpdateVirtualNode=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			copyArg(n,"spec",params,undefined,true); 
			copyArg(n,"virtualNodeName",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"spec",params,undefined,true); 
			copyArg(msg,"virtualNodeName",params,undefined,false); 
			

			svc.updateVirtualNode(params,cb);
		}

		
		service.UpdateVirtualRouter=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			copyArg(n,"spec",params,undefined,true); 
			copyArg(n,"virtualRouterName",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"spec",params,undefined,true); 
			copyArg(msg,"virtualRouterName",params,undefined,false); 
			

			svc.updateVirtualRouter(params,cb);
		}

		
		service.UpdateVirtualService=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"meshName",params,undefined,false); 
			copyArg(n,"spec",params,undefined,true); 
			copyArg(n,"virtualServiceName",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"meshName",params,undefined,false); 
			copyArg(msg,"meshOwner",params,undefined,false); 
			copyArg(msg,"spec",params,undefined,true); 
			copyArg(msg,"virtualServiceName",params,undefined,false); 
			

			svc.updateVirtualService(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS AppMesh", AmazonAPINode);

};
