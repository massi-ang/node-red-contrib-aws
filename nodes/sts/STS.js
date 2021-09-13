
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

		var awsService = new AWS.STS( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.STS(msg.AWSConfig) : awsService;

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
		
			service.AssumeRole=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"RoleSessionName",params,undefined,false); 
			
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"RoleSessionName",params,undefined,false); 
			copyArgs(n,"PolicyArns",params,undefined,true); 
			copyArgs(n,"Policy",params,undefined,false); 
			copyArgs(Number(n),"DurationSeconds",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"TransitiveTagKeys",params,undefined,false); 
			copyArgs(n,"ExternalId",params,undefined,false); 
			copyArgs(n,"SerialNumber",params,undefined,false); 
			copyArgs(n,"TokenCode",params,undefined,false); 
			copyArgs(n,"SourceIdentity",params,undefined,false); 
			
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"RoleSessionName",params,undefined,false); 
			copyArgs(msg,"PolicyArns",params,undefined,true); 
			copyArgs(msg,"Policy",params,undefined,false); 
			copyArgs(msg,"DurationSeconds",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"TransitiveTagKeys",params,undefined,false); 
			copyArgs(msg,"ExternalId",params,undefined,false); 
			copyArgs(msg,"SerialNumber",params,undefined,false); 
			copyArgs(msg,"TokenCode",params,undefined,false); 
			copyArgs(msg,"SourceIdentity",params,undefined,false); 
			

			svc.assumeRole(params,cb);
		}
			service.AssumeRoleWithSAML=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"PrincipalArn",params,undefined,false); 
			copyArgs(n,"SAMLAssertion",params,undefined,false); 
			
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"PrincipalArn",params,undefined,false); 
			copyArgs(n,"SAMLAssertion",params,undefined,false); 
			copyArgs(n,"PolicyArns",params,undefined,true); 
			copyArgs(n,"Policy",params,undefined,false); 
			copyArgs(Number(n),"DurationSeconds",params,undefined,false); 
			
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"PrincipalArn",params,undefined,false); 
			copyArgs(msg,"SAMLAssertion",params,undefined,false); 
			copyArgs(msg,"PolicyArns",params,undefined,true); 
			copyArgs(msg,"Policy",params,undefined,false); 
			copyArgs(msg,"DurationSeconds",params,undefined,false); 
			

			svc.assumeRoleWithSAML(params,cb);
		}
			service.AssumeRoleWithWebIdentity=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"RoleSessionName",params,undefined,false); 
			copyArgs(n,"WebIdentityToken",params,undefined,false); 
			
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"RoleSessionName",params,undefined,false); 
			copyArgs(n,"WebIdentityToken",params,undefined,false); 
			copyArgs(n,"ProviderId",params,undefined,false); 
			copyArgs(n,"PolicyArns",params,undefined,true); 
			copyArgs(n,"Policy",params,undefined,false); 
			copyArgs(Number(n),"DurationSeconds",params,undefined,false); 
			
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"RoleSessionName",params,undefined,false); 
			copyArgs(msg,"WebIdentityToken",params,undefined,false); 
			copyArgs(msg,"ProviderId",params,undefined,false); 
			copyArgs(msg,"PolicyArns",params,undefined,true); 
			copyArgs(msg,"Policy",params,undefined,false); 
			copyArgs(msg,"DurationSeconds",params,undefined,false); 
			

			svc.assumeRoleWithWebIdentity(params,cb);
		}
			service.DecodeAuthorizationMessage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EncodedMessage",params,undefined,false); 
			
			copyArgs(n,"EncodedMessage",params,undefined,false); 
			
			copyArgs(msg,"EncodedMessage",params,undefined,false); 
			

			svc.decodeAuthorizationMessage(params,cb);
		}
			service.GetAccessKeyInfo=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccessKeyId",params,undefined,false); 
			
			copyArgs(n,"AccessKeyId",params,undefined,false); 
			
			copyArgs(msg,"AccessKeyId",params,undefined,false); 
			

			svc.getAccessKeyInfo(params,cb);
		}
			service.GetCallerIdentity=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getCallerIdentity(params,cb);
		}
			service.GetFederationToken=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			copyArgs(n,"PolicyArns",params,undefined,true); 
			copyArgs(Number(n),"DurationSeconds",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Policy",params,undefined,false); 
			copyArgs(msg,"PolicyArns",params,undefined,true); 
			copyArgs(msg,"DurationSeconds",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.getFederationToken(params,cb);
		}
			service.GetSessionToken=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"DurationSeconds",params,undefined,false); 
			copyArgs(n,"SerialNumber",params,undefined,false); 
			copyArgs(n,"TokenCode",params,undefined,false); 
			
			copyArgs(msg,"DurationSeconds",params,undefined,false); 
			copyArgs(msg,"SerialNumber",params,undefined,false); 
			copyArgs(msg,"TokenCode",params,undefined,false); 
			

			svc.getSessionToken(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS STS", AmazonAPINode);

};
