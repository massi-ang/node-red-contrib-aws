
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

		var awsService = new AWS.CloudSearchDomain( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.CloudSearchDomain(msg.AWSConfig) : awsService;

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
		
		service.Search=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"query",params,undefined,false); 
			
			copyArgs(n,"cursor",params,undefined,false); 
			copyArgs(n,"expr",params,undefined,false); 
			copyArgs(n,"facet",params,undefined,false); 
			copyArgs(n,"filterQuery",params,undefined,false); 
			copyArgs(n,"highlight",params,undefined,false); 
			copyArgs(Boolean(n),"partial",params,undefined,false); 
			copyArgs(n,"query",params,undefined,false); 
			copyArgs(n,"queryOptions",params,undefined,false); 
			copyArgs(n,"queryParser",params,undefined,false); 
			copyArgs(n,"return",params,undefined,false); 
			copyArgs(n,"size",params,undefined,false); 
			copyArgs(n,"sort",params,undefined,false); 
			copyArgs(n,"start",params,undefined,false); 
			copyArgs(n,"stats",params,undefined,false); 
			
			copyArgs(msg,"cursor",params,undefined,false); 
			copyArgs(msg,"expr",params,undefined,false); 
			copyArgs(msg,"facet",params,undefined,false); 
			copyArgs(msg,"filterQuery",params,undefined,false); 
			copyArgs(msg,"highlight",params,undefined,false); 
			copyArgs(msg,"partial",params,undefined,false); 
			copyArgs(msg,"query",params,undefined,false); 
			copyArgs(msg,"queryOptions",params,undefined,false); 
			copyArgs(msg,"queryParser",params,undefined,false); 
			copyArgs(msg,"return",params,undefined,false); 
			copyArgs(msg,"size",params,undefined,false); 
			copyArgs(msg,"sort",params,undefined,false); 
			copyArgs(msg,"start",params,undefined,false); 
			copyArgs(msg,"stats",params,undefined,false); 
			

			svc.search(params,cb);
		}
		
		service.Suggest=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"query",params,undefined,false); 
			copyArgs(n,"suggester",params,undefined,false); 
			
			copyArgs(n,"query",params,undefined,false); 
			copyArgs(n,"suggester",params,undefined,false); 
			copyArgs(n,"size",params,undefined,false); 
			
			copyArgs(msg,"query",params,undefined,false); 
			copyArgs(msg,"suggester",params,undefined,false); 
			copyArgs(msg,"size",params,undefined,false); 
			

			svc.suggest(params,cb);
		}
		
		service.UploadDocuments=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"documents",params,undefined,false); 
			copyArgs(n,"contentType",params,undefined,false); 
			
			copyArgs(n,"documents",params,undefined,false); 
			copyArgs(n,"contentType",params,undefined,false); 
			
			copyArgs(msg,"documents",params,undefined,false); 
			copyArgs(msg,"contentType",params,undefined,false); 
			

			svc.uploadDocuments(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS CloudSearchDomain", AmazonAPINode);

};
