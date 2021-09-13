
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

		var awsService = new AWS.SavingsPlans( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.SavingsPlans(msg.AWSConfig) : awsService;

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
		
		service.CreateSavingsPlan=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"savingsPlanOfferingId",params,undefined,false); 
			copyArgs(n,"commitment",params,undefined,false); 
			
			copyArgs(n,"savingsPlanOfferingId",params,undefined,false); 
			copyArgs(n,"commitment",params,undefined,false); 
			copyArgs(n,"upfrontPaymentAmount",params,undefined,false); 
			copyArgs(n,"purchaseTime",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"savingsPlanOfferingId",params,undefined,false); 
			copyArgs(msg,"commitment",params,undefined,false); 
			copyArgs(msg,"upfrontPaymentAmount",params,undefined,false); 
			copyArgs(msg,"purchaseTime",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createSavingsPlan(params,cb);
		}
		
		service.DeleteQueuedSavingsPlan=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"savingsPlanId",params,undefined,false); 
			
			copyArgs(n,"savingsPlanId",params,undefined,false); 
			
			copyArgs(msg,"savingsPlanId",params,undefined,false); 
			

			svc.deleteQueuedSavingsPlan(params,cb);
		}
		
		service.DescribeSavingsPlanRates=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"savingsPlanId",params,undefined,false); 
			
			copyArgs(n,"savingsPlanId",params,undefined,false); 
			copyArgs(n,"filters",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"savingsPlanId",params,undefined,false); 
			copyArgs(msg,"filters",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.describeSavingsPlanRates(params,cb);
		}
		
		service.DescribeSavingsPlans=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"savingsPlanArns",params,undefined,false); 
			copyArgs(n,"savingsPlanIds",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"states",params,undefined,false); 
			copyArgs(n,"filters",params,undefined,false); 
			
			copyArgs(msg,"savingsPlanArns",params,undefined,false); 
			copyArgs(msg,"savingsPlanIds",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"states",params,undefined,false); 
			copyArgs(msg,"filters",params,undefined,false); 
			

			svc.describeSavingsPlans(params,cb);
		}
		
		service.DescribeSavingsPlansOfferingRates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"savingsPlanOfferingIds",params,undefined,true); 
			copyArgs(n,"savingsPlanPaymentOptions",params,undefined,true); 
			copyArgs(n,"savingsPlanTypes",params,undefined,true); 
			copyArgs(n,"products",params,undefined,true); 
			copyArgs(n,"serviceCodes",params,undefined,false); 
			copyArgs(n,"usageTypes",params,undefined,false); 
			copyArgs(n,"operations",params,undefined,false); 
			copyArgs(n,"filters",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"savingsPlanOfferingIds",params,undefined,true); 
			copyArgs(msg,"savingsPlanPaymentOptions",params,undefined,true); 
			copyArgs(msg,"savingsPlanTypes",params,undefined,true); 
			copyArgs(msg,"products",params,undefined,true); 
			copyArgs(msg,"serviceCodes",params,undefined,false); 
			copyArgs(msg,"usageTypes",params,undefined,false); 
			copyArgs(msg,"operations",params,undefined,false); 
			copyArgs(msg,"filters",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.describeSavingsPlansOfferingRates(params,cb);
		}
		
		service.DescribeSavingsPlansOfferings=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"offeringIds",params,undefined,true); 
			copyArgs(n,"paymentOptions",params,undefined,true); 
			copyArgs(n,"productType",params,undefined,false); 
			copyArgs(n,"planTypes",params,undefined,true); 
			copyArgs(n,"durations",params,undefined,false); 
			copyArgs(n,"currencies",params,undefined,false); 
			copyArgs(n,"descriptions",params,undefined,false); 
			copyArgs(n,"serviceCodes",params,undefined,false); 
			copyArgs(n,"usageTypes",params,undefined,false); 
			copyArgs(n,"operations",params,undefined,false); 
			copyArgs(n,"filters",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"offeringIds",params,undefined,true); 
			copyArgs(msg,"paymentOptions",params,undefined,true); 
			copyArgs(msg,"productType",params,undefined,false); 
			copyArgs(msg,"planTypes",params,undefined,true); 
			copyArgs(msg,"durations",params,undefined,false); 
			copyArgs(msg,"currencies",params,undefined,false); 
			copyArgs(msg,"descriptions",params,undefined,false); 
			copyArgs(msg,"serviceCodes",params,undefined,false); 
			copyArgs(msg,"usageTypes",params,undefined,false); 
			copyArgs(msg,"operations",params,undefined,false); 
			copyArgs(msg,"filters",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.describeSavingsPlansOfferings(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS SavingsPlans", AmazonAPINode);

};
