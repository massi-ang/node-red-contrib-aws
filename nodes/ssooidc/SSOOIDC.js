
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

		var awsService = new AWS.SSOOIDC( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.SSOOIDC(msg.AWSConfig) : awsService;

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

		
		service.CreateToken=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clientId",params,undefined,false); 
			copyArgs(n,"clientSecret",params,undefined,false); 
			copyArgs(n,"grantType",params,undefined,false); 
			copyArgs(n,"deviceCode",params,undefined,false); 
			
			copyArgs(n,"clientId",params,undefined,false); 
			copyArgs(n,"clientSecret",params,undefined,false); 
			copyArgs(n,"grantType",params,undefined,false); 
			copyArgs(n,"deviceCode",params,undefined,false); 
			copyArgs(n,"code",params,undefined,false); 
			copyArgs(n,"refreshToken",params,undefined,false); 
			copyArgs(n,"scope",params,undefined,true); 
			copyArgs(n,"redirectUri",params,undefined,false); 
			
			copyArgs(msg,"clientId",params,undefined,false); 
			copyArgs(msg,"clientSecret",params,undefined,false); 
			copyArgs(msg,"grantType",params,undefined,false); 
			copyArgs(msg,"deviceCode",params,undefined,false); 
			copyArgs(msg,"code",params,undefined,false); 
			copyArgs(msg,"refreshToken",params,undefined,false); 
			copyArgs(msg,"scope",params,undefined,true); 
			copyArgs(msg,"redirectUri",params,undefined,false); 
			

			svc.createToken(params,cb);
		}

		
		service.RegisterClient=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clientName",params,undefined,false); 
			copyArgs(n,"clientType",params,undefined,false); 
			
			copyArgs(n,"clientName",params,undefined,false); 
			copyArgs(n,"clientType",params,undefined,false); 
			copyArgs(n,"scopes",params,undefined,true); 
			
			copyArgs(msg,"clientName",params,undefined,false); 
			copyArgs(msg,"clientType",params,undefined,false); 
			copyArgs(msg,"scopes",params,undefined,true); 
			

			svc.registerClient(params,cb);
		}

		
		service.StartDeviceAuthorization=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clientId",params,undefined,false); 
			copyArgs(n,"clientSecret",params,undefined,false); 
			copyArgs(n,"startUrl",params,undefined,false); 
			
			copyArgs(n,"clientId",params,undefined,false); 
			copyArgs(n,"clientSecret",params,undefined,false); 
			copyArgs(n,"startUrl",params,undefined,false); 
			
			copyArgs(msg,"clientId",params,undefined,false); 
			copyArgs(msg,"clientSecret",params,undefined,false); 
			copyArgs(msg,"startUrl",params,undefined,false); 
			

			svc.startDeviceAuthorization(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS SSOOIDC", AmazonAPINode);

};
