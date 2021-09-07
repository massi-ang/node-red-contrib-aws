
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

		var awsService = new AWS.Outposts( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Outposts(msg.AWSConfig) : awsService;

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

		
		service.CreateOrder=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OutpostIdentifier",params,undefined,false); 
			copyArgs(n,"LineItems",params,undefined,false); 
			copyArgs(n,"PaymentOption",params,undefined,false); 
			
			copyArgs(n,"OutpostIdentifier",params,undefined,false); 
			copyArgs(n,"LineItems",params,undefined,false); 
			copyArgs(n,"PaymentOption",params,undefined,false); 
			copyArgs(n,"PaymentTerm",params,undefined,false); 
			
			copyArgs(msg,"OutpostIdentifier",params,undefined,false); 
			copyArgs(msg,"LineItems",params,undefined,false); 
			copyArgs(msg,"PaymentOption",params,undefined,false); 
			copyArgs(msg,"PaymentTerm",params,undefined,false); 
			

			svc.createOrder(params,cb);
		}

		
		service.CreateOutpost=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"SiteId",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"SiteId",params,undefined,false); 
			copyArgs(n,"AvailabilityZone",params,undefined,false); 
			copyArgs(n,"AvailabilityZoneId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"SiteId",params,undefined,false); 
			copyArgs(msg,"AvailabilityZone",params,undefined,false); 
			copyArgs(msg,"AvailabilityZoneId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createOutpost(params,cb);
		}

		
		service.DeleteOutpost=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OutpostId",params,undefined,false); 
			
			copyArgs(n,"OutpostId",params,undefined,false); 
			
			copyArgs(msg,"OutpostId",params,undefined,false); 
			

			svc.deleteOutpost(params,cb);
		}

		
		service.DeleteSite=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SiteId",params,undefined,false); 
			
			copyArgs(n,"SiteId",params,undefined,false); 
			
			copyArgs(msg,"SiteId",params,undefined,false); 
			

			svc.deleteSite(params,cb);
		}

		
		service.GetOutpost=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OutpostId",params,undefined,false); 
			
			copyArgs(n,"OutpostId",params,undefined,false); 
			
			copyArgs(msg,"OutpostId",params,undefined,false); 
			

			svc.getOutpost(params,cb);
		}

		
		service.GetOutpostInstanceTypes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OutpostId",params,undefined,false); 
			
			copyArgs(n,"OutpostId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"OutpostId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.getOutpostInstanceTypes(params,cb);
		}

		
		service.ListOutposts=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"LifeCycleStatusFilter",params,undefined,false); 
			copyArgs(n,"AvailabilityZoneFilter",params,undefined,false); 
			copyArgs(n,"AvailabilityZoneIdFilter",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"LifeCycleStatusFilter",params,undefined,false); 
			copyArgs(msg,"AvailabilityZoneFilter",params,undefined,false); 
			copyArgs(msg,"AvailabilityZoneIdFilter",params,undefined,false); 
			

			svc.listOutposts(params,cb);
		}

		
		service.ListSites=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listSites(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
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

		 

	}
	RED.nodes.registerType("AWS Outposts", AmazonAPINode);

};
