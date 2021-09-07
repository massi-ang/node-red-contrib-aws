
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

		var awsService = new AWS.PersonalizeRuntime( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.PersonalizeRuntime(msg.AWSConfig) : awsService;

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

		
		service.GetPersonalizedRanking=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"campaignArn",params,undefined,false); 
			copyArgs(n,"inputList",params,undefined,false); 
			copyArgs(n,"userId",params,undefined,false); 
			
			copyArgs(n,"campaignArn",params,undefined,false); 
			copyArgs(n,"inputList",params,undefined,false); 
			copyArgs(n,"userId",params,undefined,false); 
			copyArgs(n,"context",params,undefined,true); 
			copyArgs(n,"filterArn",params,undefined,false); 
			copyArgs(n,"filterValues",params,undefined,true); 
			
			copyArgs(msg,"campaignArn",params,undefined,false); 
			copyArgs(msg,"inputList",params,undefined,false); 
			copyArgs(msg,"userId",params,undefined,false); 
			copyArgs(msg,"context",params,undefined,true); 
			copyArgs(msg,"filterArn",params,undefined,false); 
			copyArgs(msg,"filterValues",params,undefined,true); 
			

			svc.getPersonalizedRanking(params,cb);
		}

		
		service.GetRecommendations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"campaignArn",params,undefined,false); 
			
			copyArgs(n,"campaignArn",params,undefined,false); 
			copyArgs(n,"itemId",params,undefined,false); 
			copyArgs(n,"userId",params,undefined,false); 
			copyArgs(n,"numResults",params,undefined,false); 
			copyArgs(n,"context",params,undefined,true); 
			copyArgs(n,"filterArn",params,undefined,false); 
			copyArgs(n,"filterValues",params,undefined,true); 
			
			copyArgs(msg,"campaignArn",params,undefined,false); 
			copyArgs(msg,"itemId",params,undefined,false); 
			copyArgs(msg,"userId",params,undefined,false); 
			copyArgs(msg,"numResults",params,undefined,false); 
			copyArgs(msg,"context",params,undefined,true); 
			copyArgs(msg,"filterArn",params,undefined,false); 
			copyArgs(msg,"filterValues",params,undefined,true); 
			

			svc.getRecommendations(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS PersonalizeRuntime", AmazonAPINode);

};
