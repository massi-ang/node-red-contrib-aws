
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

		var awsService = new AWS.CognitoIdentity( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.CognitoIdentity(msg.AWSConfig) : awsService;

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
		
			service.CreateIdentityPool=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityPoolName",params,undefined,false); 
			copyArgs(Boolean(n),"AllowUnauthenticatedIdentities",params,undefined,false); 
			
			copyArgs(n,"IdentityPoolName",params,undefined,false); 
			copyArgs(Boolean(n),"AllowUnauthenticatedIdentities",params,undefined,false); 
			copyArgs(Boolean(n),"AllowClassicFlow",params,undefined,false); 
			copyArgs(n,"SupportedLoginProviders",params,undefined,true); 
			copyArgs(n,"DeveloperProviderName",params,undefined,false); 
			copyArgs(n,"OpenIdConnectProviderARNs",params,undefined,true); 
			copyArgs(n,"CognitoIdentityProviders",params,undefined,true); 
			copyArgs(n,"SamlProviderARNs",params,undefined,true); 
			copyArgs(n,"IdentityPoolTags",params,undefined,true); 
			
			copyArgs(msg,"IdentityPoolName",params,undefined,false); 
			copyArgs(msg,"AllowUnauthenticatedIdentities",params,undefined,false); 
			copyArgs(msg,"AllowClassicFlow",params,undefined,false); 
			copyArgs(msg,"SupportedLoginProviders",params,undefined,true); 
			copyArgs(msg,"DeveloperProviderName",params,undefined,false); 
			copyArgs(msg,"OpenIdConnectProviderARNs",params,undefined,true); 
			copyArgs(msg,"CognitoIdentityProviders",params,undefined,true); 
			copyArgs(msg,"SamlProviderARNs",params,undefined,true); 
			copyArgs(msg,"IdentityPoolTags",params,undefined,true); 
			

			svc.createIdentityPool(params,cb);
		}
			service.DeleteIdentities=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityIdsToDelete",params,undefined,false); 
			
			copyArgs(n,"IdentityIdsToDelete",params,undefined,false); 
			
			copyArgs(msg,"IdentityIdsToDelete",params,undefined,false); 
			

			svc.deleteIdentities(params,cb);
		}
			service.DeleteIdentityPool=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			

			svc.deleteIdentityPool(params,cb);
		}
			service.DescribeIdentity=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityId",params,undefined,false); 
			
			copyArgs(n,"IdentityId",params,undefined,false); 
			
			copyArgs(msg,"IdentityId",params,undefined,false); 
			

			svc.describeIdentity(params,cb);
		}
			service.DescribeIdentityPool=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			

			svc.describeIdentityPool(params,cb);
		}
			service.GetCredentialsForIdentity=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityId",params,undefined,false); 
			
			copyArgs(n,"IdentityId",params,undefined,false); 
			copyArgs(n,"Logins",params,undefined,true); 
			copyArgs(n,"CustomRoleArn",params,undefined,false); 
			
			copyArgs(msg,"IdentityId",params,undefined,false); 
			copyArgs(msg,"Logins",params,undefined,true); 
			copyArgs(msg,"CustomRoleArn",params,undefined,false); 
			

			svc.getCredentialsForIdentity(params,cb);
		}
			service.GetId=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"Logins",params,undefined,true); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			copyArgs(msg,"Logins",params,undefined,true); 
			

			svc.getId(params,cb);
		}
			service.GetIdentityPoolRoles=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			

			svc.getIdentityPoolRoles(params,cb);
		}
			service.GetOpenIdToken=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityId",params,undefined,false); 
			
			copyArgs(n,"IdentityId",params,undefined,false); 
			copyArgs(n,"Logins",params,undefined,true); 
			
			copyArgs(msg,"IdentityId",params,undefined,false); 
			copyArgs(msg,"Logins",params,undefined,true); 
			

			svc.getOpenIdToken(params,cb);
		}
			service.GetOpenIdTokenForDeveloperIdentity=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"Logins",params,undefined,true); 
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"IdentityId",params,undefined,false); 
			copyArgs(n,"Logins",params,undefined,true); 
			copyArgs(n,"PrincipalTags",params,undefined,true); 
			copyArgs(n,"TokenDuration",params,undefined,false); 
			
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			copyArgs(msg,"IdentityId",params,undefined,false); 
			copyArgs(msg,"Logins",params,undefined,true); 
			copyArgs(msg,"PrincipalTags",params,undefined,true); 
			copyArgs(msg,"TokenDuration",params,undefined,false); 
			

			svc.getOpenIdTokenForDeveloperIdentity(params,cb);
		}
			service.GetPrincipalTagAttributeMap=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"IdentityProviderName",params,undefined,false); 
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"IdentityProviderName",params,undefined,false); 
			
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			copyArgs(msg,"IdentityProviderName",params,undefined,false); 
			

			svc.getPrincipalTagAttributeMap(params,cb);
		}
			service.ListIdentities=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"HideDisabled",params,undefined,false); 
			
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"HideDisabled",params,undefined,false); 
			

			svc.listIdentities(params,cb);
		}
			service.ListIdentityPools=function(svc,msg,cb){
			var params={};
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listIdentityPools(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.LookupDeveloperIdentity=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"IdentityId",params,undefined,false); 
			copyArgs(n,"DeveloperUserIdentifier",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			copyArgs(msg,"IdentityId",params,undefined,false); 
			copyArgs(msg,"DeveloperUserIdentifier",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.lookupDeveloperIdentity(params,cb);
		}
			service.MergeDeveloperIdentities=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceUserIdentifier",params,undefined,false); 
			copyArgs(n,"DestinationUserIdentifier",params,undefined,false); 
			copyArgs(n,"DeveloperProviderName",params,undefined,false); 
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			
			copyArgs(n,"SourceUserIdentifier",params,undefined,false); 
			copyArgs(n,"DestinationUserIdentifier",params,undefined,false); 
			copyArgs(n,"DeveloperProviderName",params,undefined,false); 
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			
			copyArgs(msg,"SourceUserIdentifier",params,undefined,false); 
			copyArgs(msg,"DestinationUserIdentifier",params,undefined,false); 
			copyArgs(msg,"DeveloperProviderName",params,undefined,false); 
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			

			svc.mergeDeveloperIdentities(params,cb);
		}
			service.SetIdentityPoolRoles=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"Roles",params,undefined,true); 
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"Roles",params,undefined,true); 
			copyArgs(n,"RoleMappings",params,undefined,true); 
			
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			copyArgs(msg,"Roles",params,undefined,true); 
			copyArgs(msg,"RoleMappings",params,undefined,true); 
			

			svc.setIdentityPoolRoles(params,cb);
		}
			service.SetPrincipalTagAttributeMap=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"IdentityProviderName",params,undefined,false); 
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"IdentityProviderName",params,undefined,false); 
			copyArgs(Boolean(n),"UseDefaults",params,undefined,false); 
			copyArgs(n,"PrincipalTags",params,undefined,true); 
			
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			copyArgs(msg,"IdentityProviderName",params,undefined,false); 
			copyArgs(msg,"UseDefaults",params,undefined,false); 
			copyArgs(msg,"PrincipalTags",params,undefined,true); 
			

			svc.setPrincipalTagAttributeMap(params,cb);
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
			service.UnlinkDeveloperIdentity=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityId",params,undefined,false); 
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"DeveloperProviderName",params,undefined,false); 
			copyArgs(n,"DeveloperUserIdentifier",params,undefined,false); 
			
			copyArgs(n,"IdentityId",params,undefined,false); 
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"DeveloperProviderName",params,undefined,false); 
			copyArgs(n,"DeveloperUserIdentifier",params,undefined,false); 
			
			copyArgs(msg,"IdentityId",params,undefined,false); 
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			copyArgs(msg,"DeveloperProviderName",params,undefined,false); 
			copyArgs(msg,"DeveloperUserIdentifier",params,undefined,false); 
			

			svc.unlinkDeveloperIdentity(params,cb);
		}
			service.UnlinkIdentity=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityId",params,undefined,false); 
			copyArgs(n,"Logins",params,undefined,true); 
			copyArgs(n,"LoginsToRemove",params,undefined,true); 
			
			copyArgs(n,"IdentityId",params,undefined,false); 
			copyArgs(n,"Logins",params,undefined,true); 
			copyArgs(n,"LoginsToRemove",params,undefined,true); 
			
			copyArgs(msg,"IdentityId",params,undefined,false); 
			copyArgs(msg,"Logins",params,undefined,true); 
			copyArgs(msg,"LoginsToRemove",params,undefined,true); 
			

			svc.unlinkIdentity(params,cb);
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
			service.UpdateIdentityPool=function(svc,msg,cb){
			var params={};
			
			
			
			
			copyArgs(msg,"IdentityPoolId",params,undefined,true); 
			copyArgs(msg,"IdentityPoolName",params,undefined,true); 
			copyArgs(msg,"AllowUnauthenticatedIdentities",params,undefined,true); 
			copyArgs(msg,"AllowClassicFlow",params,undefined,true); 
			copyArgs(msg,"SupportedLoginProviders",params,undefined,true); 
			copyArgs(msg,"DeveloperProviderName",params,undefined,true); 
			copyArgs(msg,"OpenIdConnectProviderARNs",params,undefined,true); 
			copyArgs(msg,"CognitoIdentityProviders",params,undefined,true); 
			copyArgs(msg,"SamlProviderARNs",params,undefined,true); 
			copyArgs(msg,"IdentityPoolTags",params,undefined,true); 

			svc.updateIdentityPool(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS CognitoIdentity", AmazonAPINode);

};
