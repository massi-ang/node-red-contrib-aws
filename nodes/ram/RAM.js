
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

		var awsService = new AWS.RAM( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.RAM(msg.AWSConfig) : awsService;

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
		
		service.AcceptResourceShareInvitation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceShareInvitationArn",params,undefined,false); 
			
			copyArgs(n,"resourceShareInvitationArn",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"resourceShareInvitationArn",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.acceptResourceShareInvitation(params,cb);
		}
		
		service.AssociateResourceShare=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceShareArn",params,undefined,false); 
			
			copyArgs(n,"resourceShareArn",params,undefined,false); 
			copyArgs(n,"resourceArns",params,undefined,true); 
			copyArgs(n,"principals",params,undefined,true); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"resourceShareArn",params,undefined,false); 
			copyArgs(msg,"resourceArns",params,undefined,true); 
			copyArgs(msg,"principals",params,undefined,true); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.associateResourceShare(params,cb);
		}
		
		service.AssociateResourceSharePermission=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceShareArn",params,undefined,false); 
			copyArgs(n,"permissionArn",params,undefined,false); 
			
			copyArgs(n,"resourceShareArn",params,undefined,false); 
			copyArgs(n,"permissionArn",params,undefined,false); 
			copyArgs(Boolean(n),"replace",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(Number(n),"permissionVersion",params,undefined,false); 
			
			copyArgs(msg,"resourceShareArn",params,undefined,false); 
			copyArgs(msg,"permissionArn",params,undefined,false); 
			copyArgs(msg,"replace",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"permissionVersion",params,undefined,false); 
			

			svc.associateResourceSharePermission(params,cb);
		}
		
		service.CreateResourceShare=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"resourceArns",params,undefined,true); 
			copyArgs(n,"principals",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(Boolean(n),"allowExternalPrincipals",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"permissionArns",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"resourceArns",params,undefined,true); 
			copyArgs(msg,"principals",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"allowExternalPrincipals",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"permissionArns",params,undefined,false); 
			

			svc.createResourceShare(params,cb);
		}
		
		service.DeleteResourceShare=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceShareArn",params,undefined,false); 
			
			copyArgs(n,"resourceShareArn",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"resourceShareArn",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.deleteResourceShare(params,cb);
		}
		
		service.DisassociateResourceShare=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceShareArn",params,undefined,false); 
			
			copyArgs(n,"resourceShareArn",params,undefined,false); 
			copyArgs(n,"resourceArns",params,undefined,true); 
			copyArgs(n,"principals",params,undefined,true); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"resourceShareArn",params,undefined,false); 
			copyArgs(msg,"resourceArns",params,undefined,true); 
			copyArgs(msg,"principals",params,undefined,true); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.disassociateResourceShare(params,cb);
		}
		
		service.DisassociateResourceSharePermission=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceShareArn",params,undefined,false); 
			copyArgs(n,"permissionArn",params,undefined,false); 
			
			copyArgs(n,"resourceShareArn",params,undefined,false); 
			copyArgs(n,"permissionArn",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"resourceShareArn",params,undefined,false); 
			copyArgs(msg,"permissionArn",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.disassociateResourceSharePermission(params,cb);
		}
		
		service.EnableSharingWithAwsOrganization=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.enableSharingWithAwsOrganization(params,cb);
		}
		
		service.GetPermission=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"permissionArn",params,undefined,false); 
			
			copyArgs(n,"permissionArn",params,undefined,false); 
			copyArgs(Number(n),"permissionVersion",params,undefined,false); 
			
			copyArgs(msg,"permissionArn",params,undefined,false); 
			copyArgs(msg,"permissionVersion",params,undefined,false); 
			

			svc.getPermission(params,cb);
		}
		
		service.GetResourcePolicies=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArns",params,undefined,true); 
			
			copyArgs(n,"resourceArns",params,undefined,true); 
			copyArgs(n,"principal",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"resourceArns",params,undefined,true); 
			copyArgs(msg,"principal",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getResourcePolicies(params,cb);
		}
		
		service.GetResourceShareAssociations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"associationType",params,undefined,false); 
			
			copyArgs(n,"associationType",params,undefined,false); 
			copyArgs(n,"resourceShareArns",params,undefined,true); 
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"principal",params,undefined,false); 
			copyArgs(n,"associationStatus",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"associationType",params,undefined,false); 
			copyArgs(msg,"resourceShareArns",params,undefined,true); 
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"principal",params,undefined,false); 
			copyArgs(msg,"associationStatus",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getResourceShareAssociations(params,cb);
		}
		
		service.GetResourceShareInvitations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"resourceShareInvitationArns",params,undefined,false); 
			copyArgs(n,"resourceShareArns",params,undefined,true); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"resourceShareInvitationArns",params,undefined,false); 
			copyArgs(msg,"resourceShareArns",params,undefined,true); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getResourceShareInvitations(params,cb);
		}
		
		service.GetResourceShares=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceOwner",params,undefined,false); 
			
			copyArgs(n,"resourceShareArns",params,undefined,true); 
			copyArgs(n,"resourceShareStatus",params,undefined,false); 
			copyArgs(n,"resourceOwner",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"tagFilters",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"permissionArn",params,undefined,false); 
			
			copyArgs(msg,"resourceShareArns",params,undefined,true); 
			copyArgs(msg,"resourceShareStatus",params,undefined,false); 
			copyArgs(msg,"resourceOwner",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"tagFilters",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"permissionArn",params,undefined,false); 
			

			svc.getResourceShares(params,cb);
		}
		
		service.ListPendingInvitationResources=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceShareInvitationArn",params,undefined,false); 
			
			copyArgs(n,"resourceShareInvitationArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"resourceShareInvitationArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listPendingInvitationResources(params,cb);
		}
		
		service.ListPermissions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"resourceType",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"resourceType",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listPermissions(params,cb);
		}
		
		service.ListPrincipals=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceOwner",params,undefined,false); 
			
			copyArgs(n,"resourceOwner",params,undefined,false); 
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"principals",params,undefined,true); 
			copyArgs(n,"resourceType",params,undefined,false); 
			copyArgs(n,"resourceShareArns",params,undefined,true); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"resourceOwner",params,undefined,false); 
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"principals",params,undefined,true); 
			copyArgs(msg,"resourceType",params,undefined,false); 
			copyArgs(msg,"resourceShareArns",params,undefined,true); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listPrincipals(params,cb);
		}
		
		service.ListResourceSharePermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceShareArn",params,undefined,false); 
			
			copyArgs(n,"resourceShareArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"resourceShareArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listResourceSharePermissions(params,cb);
		}
		
		service.ListResourceTypes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listResourceTypes(params,cb);
		}
		
		service.ListResources=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceOwner",params,undefined,false); 
			
			copyArgs(n,"resourceOwner",params,undefined,false); 
			copyArgs(n,"principal",params,undefined,false); 
			copyArgs(n,"resourceType",params,undefined,false); 
			copyArgs(n,"resourceArns",params,undefined,true); 
			copyArgs(n,"resourceShareArns",params,undefined,true); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"resourceOwner",params,undefined,false); 
			copyArgs(msg,"principal",params,undefined,false); 
			copyArgs(msg,"resourceType",params,undefined,false); 
			copyArgs(msg,"resourceArns",params,undefined,true); 
			copyArgs(msg,"resourceShareArns",params,undefined,true); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listResources(params,cb);
		}
		
		service.PromoteResourceShareCreatedFromPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceShareArn",params,undefined,false); 
			
			copyArgs(n,"resourceShareArn",params,undefined,false); 
			
			copyArgs(msg,"resourceShareArn",params,undefined,false); 
			

			svc.promoteResourceShareCreatedFromPolicy(params,cb);
		}
		
		service.RejectResourceShareInvitation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceShareInvitationArn",params,undefined,false); 
			
			copyArgs(n,"resourceShareInvitationArn",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"resourceShareInvitationArn",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.rejectResourceShareInvitation(params,cb);
		}
		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceShareArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(n,"resourceShareArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"resourceShareArn",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceShareArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(n,"resourceShareArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(msg,"resourceShareArn",params,undefined,false); 
			copyArgs(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
		
		service.UpdateResourceShare=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceShareArn",params,undefined,false); 
			
			copyArgs(n,"resourceShareArn",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(Boolean(n),"allowExternalPrincipals",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"resourceShareArn",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"allowExternalPrincipals",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.updateResourceShare(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS RAM", AmazonAPINode);

};
