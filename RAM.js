
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

		var awsService = new AWS.RAM( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.RAM(msg.AWSConfig) : awsService;

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

		
		service.AcceptResourceShareInvitation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceShareInvitationArn",params,undefined,false); 
			
			copyArg(msg,"resourceShareInvitationArn",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.acceptResourceShareInvitation(params,cb);
		}

		
		service.AssociateResourceShare=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceShareArn",params,undefined,false); 
			
			copyArg(msg,"resourceShareArn",params,undefined,false); 
			copyArg(msg,"resourceArns",params,undefined,true); 
			copyArg(msg,"principals",params,undefined,true); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.associateResourceShare(params,cb);
		}

		
		service.AssociateResourceSharePermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceShareArn",params,undefined,false); 
			copyArg(n,"permissionArn",params,undefined,false); 
			
			copyArg(msg,"resourceShareArn",params,undefined,false); 
			copyArg(msg,"permissionArn",params,undefined,false); 
			copyArg(msg,"replace",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"permissionVersion",params,undefined,false); 
			

			svc.associateResourceSharePermission(params,cb);
		}

		
		service.CreateResourceShare=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"resourceArns",params,undefined,true); 
			copyArg(msg,"principals",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"allowExternalPrincipals",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"permissionArns",params,undefined,false); 
			

			svc.createResourceShare(params,cb);
		}

		
		service.DeleteResourceShare=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceShareArn",params,undefined,false); 
			
			copyArg(msg,"resourceShareArn",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.deleteResourceShare(params,cb);
		}

		
		service.DisassociateResourceShare=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceShareArn",params,undefined,false); 
			
			copyArg(msg,"resourceShareArn",params,undefined,false); 
			copyArg(msg,"resourceArns",params,undefined,true); 
			copyArg(msg,"principals",params,undefined,true); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.disassociateResourceShare(params,cb);
		}

		
		service.DisassociateResourceSharePermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceShareArn",params,undefined,false); 
			copyArg(n,"permissionArn",params,undefined,false); 
			
			copyArg(msg,"resourceShareArn",params,undefined,false); 
			copyArg(msg,"permissionArn",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.disassociateResourceSharePermission(params,cb);
		}

		
		service.EnableSharingWithAwsOrganization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.enableSharingWithAwsOrganization(params,cb);
		}

		
		service.GetPermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"permissionArn",params,undefined,false); 
			
			copyArg(msg,"permissionArn",params,undefined,false); 
			copyArg(msg,"permissionVersion",params,undefined,false); 
			

			svc.getPermission(params,cb);
		}

		
		service.GetResourcePolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArns",params,undefined,true); 
			
			copyArg(msg,"resourceArns",params,undefined,true); 
			copyArg(msg,"principal",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.getResourcePolicies(params,cb);
		}

		
		service.GetResourceShareAssociations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"associationType",params,undefined,false); 
			
			copyArg(msg,"associationType",params,undefined,false); 
			copyArg(msg,"resourceShareArns",params,undefined,true); 
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"principal",params,undefined,false); 
			copyArg(msg,"associationStatus",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.getResourceShareAssociations(params,cb);
		}

		
		service.GetResourceShareInvitations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"resourceShareInvitationArns",params,undefined,false); 
			copyArg(msg,"resourceShareArns",params,undefined,true); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.getResourceShareInvitations(params,cb);
		}

		
		service.GetResourceShares=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceOwner",params,undefined,false); 
			
			copyArg(msg,"resourceShareArns",params,undefined,true); 
			copyArg(msg,"resourceShareStatus",params,undefined,false); 
			copyArg(msg,"resourceOwner",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"tagFilters",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"permissionArn",params,undefined,false); 
			

			svc.getResourceShares(params,cb);
		}

		
		service.ListPendingInvitationResources=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceShareInvitationArn",params,undefined,false); 
			
			copyArg(msg,"resourceShareInvitationArn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listPendingInvitationResources(params,cb);
		}

		
		service.ListPermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"resourceType",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listPermissions(params,cb);
		}

		
		service.ListPrincipals=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceOwner",params,undefined,false); 
			
			copyArg(msg,"resourceOwner",params,undefined,false); 
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"principals",params,undefined,true); 
			copyArg(msg,"resourceType",params,undefined,false); 
			copyArg(msg,"resourceShareArns",params,undefined,true); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listPrincipals(params,cb);
		}

		
		service.ListResourceSharePermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceShareArn",params,undefined,false); 
			
			copyArg(msg,"resourceShareArn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listResourceSharePermissions(params,cb);
		}

		
		service.ListResourceTypes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listResourceTypes(params,cb);
		}

		
		service.ListResources=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceOwner",params,undefined,false); 
			
			copyArg(msg,"resourceOwner",params,undefined,false); 
			copyArg(msg,"principal",params,undefined,false); 
			copyArg(msg,"resourceType",params,undefined,false); 
			copyArg(msg,"resourceArns",params,undefined,true); 
			copyArg(msg,"resourceShareArns",params,undefined,true); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listResources(params,cb);
		}

		
		service.PromoteResourceShareCreatedFromPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceShareArn",params,undefined,false); 
			
			copyArg(msg,"resourceShareArn",params,undefined,false); 
			

			svc.promoteResourceShareCreatedFromPolicy(params,cb);
		}

		
		service.RejectResourceShareInvitation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceShareInvitationArn",params,undefined,false); 
			
			copyArg(msg,"resourceShareInvitationArn",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.rejectResourceShareInvitation(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceShareArn",params,undefined,false); 
			copyArg(n,"tags",params,undefined,true); 
			
			copyArg(msg,"resourceShareArn",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceShareArn",params,undefined,false); 
			copyArg(n,"tagKeys",params,undefined,false); 
			
			copyArg(msg,"resourceShareArn",params,undefined,false); 
			copyArg(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateResourceShare=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceShareArn",params,undefined,false); 
			
			copyArg(msg,"resourceShareArn",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"allowExternalPrincipals",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.updateResourceShare(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS RAM", AmazonAPINode);

};
