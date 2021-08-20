
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

		var awsService = new AWS.CognitoIdentity( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.CognitoIdentity(msg.AWSConfig) : awsService;

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

		
		service.CreateIdentityPool=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IdentityPoolName",params,undefined,false); 
			copyArg(n,"AllowUnauthenticatedIdentities",params,undefined,false); 
			
			copyArg(msg,"IdentityPoolName",params,undefined,false); 
			copyArg(msg,"AllowUnauthenticatedIdentities",params,undefined,false); 
			copyArg(msg,"AllowClassicFlow",params,undefined,false); 
			copyArg(msg,"SupportedLoginProviders",params,undefined,true); 
			copyArg(msg,"DeveloperProviderName",params,undefined,false); 
			copyArg(msg,"OpenIdConnectProviderARNs",params,undefined,true); 
			copyArg(msg,"CognitoIdentityProviders",params,undefined,true); 
			copyArg(msg,"SamlProviderARNs",params,undefined,true); 
			copyArg(msg,"IdentityPoolTags",params,undefined,true); 
			

			svc.createIdentityPool(params,cb);
		}

		
		service.DeleteIdentities=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IdentityIdsToDelete",params,undefined,false); 
			
			copyArg(msg,"IdentityIdsToDelete",params,undefined,false); 
			

			svc.deleteIdentities(params,cb);
		}

		
		service.DeleteIdentityPool=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IdentityPoolId",params,undefined,false); 
			
			copyArg(msg,"IdentityPoolId",params,undefined,false); 
			

			svc.deleteIdentityPool(params,cb);
		}

		
		service.DescribeIdentity=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IdentityId",params,undefined,false); 
			
			copyArg(msg,"IdentityId",params,undefined,false); 
			

			svc.describeIdentity(params,cb);
		}

		
		service.DescribeIdentityPool=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IdentityPoolId",params,undefined,false); 
			
			copyArg(msg,"IdentityPoolId",params,undefined,false); 
			

			svc.describeIdentityPool(params,cb);
		}

		
		service.GetCredentialsForIdentity=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IdentityId",params,undefined,false); 
			
			copyArg(msg,"IdentityId",params,undefined,false); 
			copyArg(msg,"Logins",params,undefined,true); 
			copyArg(msg,"CustomRoleArn",params,undefined,false); 
			

			svc.getCredentialsForIdentity(params,cb);
		}

		
		service.GetId=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IdentityPoolId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"IdentityPoolId",params,undefined,false); 
			copyArg(msg,"Logins",params,undefined,true); 
			

			svc.getId(params,cb);
		}

		
		service.GetIdentityPoolRoles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IdentityPoolId",params,undefined,false); 
			
			copyArg(msg,"IdentityPoolId",params,undefined,false); 
			

			svc.getIdentityPoolRoles(params,cb);
		}

		
		service.GetOpenIdToken=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IdentityId",params,undefined,false); 
			
			copyArg(msg,"IdentityId",params,undefined,false); 
			copyArg(msg,"Logins",params,undefined,true); 
			

			svc.getOpenIdToken(params,cb);
		}

		
		service.GetOpenIdTokenForDeveloperIdentity=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IdentityPoolId",params,undefined,false); 
			copyArg(n,"Logins",params,undefined,true); 
			
			copyArg(msg,"IdentityPoolId",params,undefined,false); 
			copyArg(msg,"IdentityId",params,undefined,false); 
			copyArg(msg,"Logins",params,undefined,true); 
			copyArg(msg,"PrincipalTags",params,undefined,true); 
			copyArg(msg,"TokenDuration",params,undefined,false); 
			

			svc.getOpenIdTokenForDeveloperIdentity(params,cb);
		}

		
		service.GetPrincipalTagAttributeMap=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IdentityPoolId",params,undefined,false); 
			copyArg(n,"IdentityProviderName",params,undefined,false); 
			
			copyArg(msg,"IdentityPoolId",params,undefined,false); 
			copyArg(msg,"IdentityProviderName",params,undefined,false); 
			

			svc.getPrincipalTagAttributeMap(params,cb);
		}

		
		service.ListIdentities=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IdentityPoolId",params,undefined,false); 
			copyArg(n,"MaxResults",params,undefined,false); 
			
			copyArg(msg,"IdentityPoolId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"HideDisabled",params,undefined,false); 
			

			svc.listIdentities(params,cb);
		}

		
		service.ListIdentityPools=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MaxResults",params,undefined,false); 
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listIdentityPools(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.LookupDeveloperIdentity=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IdentityPoolId",params,undefined,false); 
			
			copyArg(msg,"IdentityPoolId",params,undefined,false); 
			copyArg(msg,"IdentityId",params,undefined,false); 
			copyArg(msg,"DeveloperUserIdentifier",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.lookupDeveloperIdentity(params,cb);
		}

		
		service.MergeDeveloperIdentities=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceUserIdentifier",params,undefined,false); 
			copyArg(n,"DestinationUserIdentifier",params,undefined,false); 
			copyArg(n,"DeveloperProviderName",params,undefined,false); 
			copyArg(n,"IdentityPoolId",params,undefined,false); 
			
			copyArg(msg,"SourceUserIdentifier",params,undefined,false); 
			copyArg(msg,"DestinationUserIdentifier",params,undefined,false); 
			copyArg(msg,"DeveloperProviderName",params,undefined,false); 
			copyArg(msg,"IdentityPoolId",params,undefined,false); 
			

			svc.mergeDeveloperIdentities(params,cb);
		}

		
		service.SetIdentityPoolRoles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IdentityPoolId",params,undefined,false); 
			copyArg(n,"Roles",params,undefined,true); 
			
			copyArg(msg,"IdentityPoolId",params,undefined,false); 
			copyArg(msg,"Roles",params,undefined,true); 
			copyArg(msg,"RoleMappings",params,undefined,true); 
			

			svc.setIdentityPoolRoles(params,cb);
		}

		
		service.SetPrincipalTagAttributeMap=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IdentityPoolId",params,undefined,false); 
			copyArg(n,"IdentityProviderName",params,undefined,false); 
			
			copyArg(msg,"IdentityPoolId",params,undefined,false); 
			copyArg(msg,"IdentityProviderName",params,undefined,false); 
			copyArg(msg,"UseDefaults",params,undefined,false); 
			copyArg(msg,"PrincipalTags",params,undefined,true); 
			

			svc.setPrincipalTagAttributeMap(params,cb);
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

		
		service.UnlinkDeveloperIdentity=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IdentityId",params,undefined,false); 
			copyArg(n,"IdentityPoolId",params,undefined,false); 
			copyArg(n,"DeveloperProviderName",params,undefined,false); 
			copyArg(n,"DeveloperUserIdentifier",params,undefined,false); 
			
			copyArg(msg,"IdentityId",params,undefined,false); 
			copyArg(msg,"IdentityPoolId",params,undefined,false); 
			copyArg(msg,"DeveloperProviderName",params,undefined,false); 
			copyArg(msg,"DeveloperUserIdentifier",params,undefined,false); 
			

			svc.unlinkDeveloperIdentity(params,cb);
		}

		
		service.UnlinkIdentity=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IdentityId",params,undefined,false); 
			copyArg(n,"Logins",params,undefined,true); 
			copyArg(n,"LoginsToRemove",params,undefined,true); 
			
			copyArg(msg,"IdentityId",params,undefined,false); 
			copyArg(msg,"Logins",params,undefined,true); 
			copyArg(msg,"LoginsToRemove",params,undefined,true); 
			

			svc.unlinkIdentity(params,cb);
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

		
		service.UpdateIdentityPool=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			
			copyArg(msg,"IdentityPoolId",params,undefined,true); 
			copyArg(msg,"IdentityPoolName",params,undefined,true); 
			copyArg(msg,"AllowUnauthenticatedIdentities",params,undefined,true); 
			copyArg(msg,"AllowClassicFlow",params,undefined,true); 
			copyArg(msg,"SupportedLoginProviders",params,undefined,true); 
			copyArg(msg,"DeveloperProviderName",params,undefined,true); 
			copyArg(msg,"OpenIdConnectProviderARNs",params,undefined,true); 
			copyArg(msg,"CognitoIdentityProviders",params,undefined,true); 
			copyArg(msg,"SamlProviderARNs",params,undefined,true); 
			copyArg(msg,"IdentityPoolTags",params,undefined,true); 

			svc.updateIdentityPool(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS CognitoIdentity", AmazonAPINode);

};
