
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

		var awsService = new AWS.SimpleDB( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.SimpleDB(msg.AWSConfig) : awsService;

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

		
		service.BatchDeleteAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"Items",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"Items",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"Items",params,undefined,false); 
			

			svc.batchDeleteAttributes(params,cb);
		}

		
		service.BatchPutAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"Items",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"Items",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"Items",params,undefined,false); 
			

			svc.batchPutAttributes(params,cb);
		}

		
		service.CreateDomain=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			

			svc.createDomain(params,cb);
		}

		
		service.DeleteAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"ItemName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"ItemName",params,undefined,false); 
			copyArgs(n,"Attributes",params,undefined,true); 
			copyArgs(n,"Expected",params,undefined,true); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"ItemName",params,undefined,false); 
			copyArgs(msg,"Attributes",params,undefined,true); 
			copyArgs(msg,"Expected",params,undefined,true); 
			

			svc.deleteAttributes(params,cb);
		}

		
		service.DeleteDomain=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			

			svc.deleteDomain(params,cb);
		}

		
		service.DomainMetadata=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			

			svc.domainMetadata(params,cb);
		}

		
		service.GetAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"ItemName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"ItemName",params,undefined,false); 
			copyArgs(n,"AttributeNames",params,undefined,false); 
			copyArgs(n,"ConsistentRead",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"ItemName",params,undefined,false); 
			copyArgs(msg,"AttributeNames",params,undefined,false); 
			copyArgs(msg,"ConsistentRead",params,undefined,false); 
			

			svc.getAttributes(params,cb);
		}

		
		service.ListDomains=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxNumberOfDomains",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxNumberOfDomains",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listDomains(params,cb);
		}

		
		service.PutAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"ItemName",params,undefined,false); 
			copyArgs(n,"Attributes",params,undefined,true); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"ItemName",params,undefined,false); 
			copyArgs(n,"Attributes",params,undefined,true); 
			copyArgs(n,"Expected",params,undefined,true); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"ItemName",params,undefined,false); 
			copyArgs(msg,"Attributes",params,undefined,true); 
			copyArgs(msg,"Expected",params,undefined,true); 
			

			svc.putAttributes(params,cb);
		}

		
		service.Select=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SelectExpression",params,undefined,false); 
			
			copyArgs(n,"SelectExpression",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"ConsistentRead",params,undefined,false); 
			
			copyArgs(msg,"SelectExpression",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"ConsistentRead",params,undefined,false); 
			

			svc.select(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS SimpleDB", AmazonAPINode);

};
