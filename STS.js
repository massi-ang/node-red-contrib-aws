
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

		var awsService = new AWS.STS( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.STS(msg.AWSConfig) : awsService;

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

		
		service.AssumeRole=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RoleArn",params,undefined,false); 
			copyArg(n,"RoleSessionName",params,undefined,false); 
			
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"RoleSessionName",params,undefined,false); 
			copyArg(msg,"PolicyArns",params,undefined,true); 
			copyArg(msg,"Policy",params,undefined,false); 
			copyArg(msg,"DurationSeconds",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"TransitiveTagKeys",params,undefined,false); 
			copyArg(msg,"ExternalId",params,undefined,false); 
			copyArg(msg,"SerialNumber",params,undefined,false); 
			copyArg(msg,"TokenCode",params,undefined,false); 
			copyArg(msg,"SourceIdentity",params,undefined,false); 
			

			svc.assumeRole(params,cb);
		}

		
		service.AssumeRoleWithSAML=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RoleArn",params,undefined,false); 
			copyArg(n,"PrincipalArn",params,undefined,false); 
			copyArg(n,"SAMLAssertion",params,undefined,false); 
			
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"PrincipalArn",params,undefined,false); 
			copyArg(msg,"SAMLAssertion",params,undefined,false); 
			copyArg(msg,"PolicyArns",params,undefined,true); 
			copyArg(msg,"Policy",params,undefined,false); 
			copyArg(msg,"DurationSeconds",params,undefined,false); 
			

			svc.assumeRoleWithSAML(params,cb);
		}

		
		service.AssumeRoleWithWebIdentity=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RoleArn",params,undefined,false); 
			copyArg(n,"RoleSessionName",params,undefined,false); 
			copyArg(n,"WebIdentityToken",params,undefined,false); 
			
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"RoleSessionName",params,undefined,false); 
			copyArg(msg,"WebIdentityToken",params,undefined,false); 
			copyArg(msg,"ProviderId",params,undefined,false); 
			copyArg(msg,"PolicyArns",params,undefined,true); 
			copyArg(msg,"Policy",params,undefined,false); 
			copyArg(msg,"DurationSeconds",params,undefined,false); 
			

			svc.assumeRoleWithWebIdentity(params,cb);
		}

		
		service.DecodeAuthorizationMessage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EncodedMessage",params,undefined,false); 
			
			copyArg(msg,"EncodedMessage",params,undefined,false); 
			

			svc.decodeAuthorizationMessage(params,cb);
		}

		
		service.GetAccessKeyInfo=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccessKeyId",params,undefined,false); 
			
			copyArg(msg,"AccessKeyId",params,undefined,false); 
			

			svc.getAccessKeyInfo(params,cb);
		}

		
		service.GetCallerIdentity=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getCallerIdentity(params,cb);
		}

		
		service.GetFederationToken=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Policy",params,undefined,false); 
			copyArg(msg,"PolicyArns",params,undefined,true); 
			copyArg(msg,"DurationSeconds",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.getFederationToken(params,cb);
		}

		
		service.GetSessionToken=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DurationSeconds",params,undefined,false); 
			copyArg(msg,"SerialNumber",params,undefined,false); 
			copyArg(msg,"TokenCode",params,undefined,false); 
			

			svc.getSessionToken(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS STS", AmazonAPINode);

};
