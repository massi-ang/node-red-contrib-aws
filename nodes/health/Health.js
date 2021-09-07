
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

		var awsService = new AWS.Health( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Health(msg.AWSConfig) : awsService;

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

		
		service.DescribeAffectedAccountsForOrganization=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"eventArn",params,undefined,false); 
			
			copyArgs(n,"eventArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"eventArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.describeAffectedAccountsForOrganization(params,cb);
		}

		
		service.DescribeAffectedEntities=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"filter",params,undefined,false); 
			
			copyArgs(n,"filter",params,undefined,false); 
			copyArgs(n,"locale",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"filter",params,undefined,false); 
			copyArgs(msg,"locale",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.describeAffectedEntities(params,cb);
		}

		
		service.DescribeAffectedEntitiesForOrganization=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"organizationEntityFilters",params,undefined,false); 
			
			copyArgs(n,"organizationEntityFilters",params,undefined,false); 
			copyArgs(n,"locale",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"organizationEntityFilters",params,undefined,false); 
			copyArgs(msg,"locale",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.describeAffectedEntitiesForOrganization(params,cb);
		}

		
		service.DescribeEntityAggregates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"eventArns",params,undefined,false); 
			
			copyArgs(msg,"eventArns",params,undefined,false); 
			

			svc.describeEntityAggregates(params,cb);
		}

		
		service.DescribeEventAggregates=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"aggregateField",params,undefined,false); 
			
			copyArgs(n,"filter",params,undefined,true); 
			copyArgs(n,"aggregateField",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"filter",params,undefined,true); 
			copyArgs(msg,"aggregateField",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.describeEventAggregates(params,cb);
		}

		
		service.DescribeEventDetails=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"eventArns",params,undefined,true); 
			
			copyArgs(n,"eventArns",params,undefined,true); 
			copyArgs(n,"locale",params,undefined,false); 
			
			copyArgs(msg,"eventArns",params,undefined,true); 
			copyArgs(msg,"locale",params,undefined,false); 
			

			svc.describeEventDetails(params,cb);
		}

		
		service.DescribeEventDetailsForOrganization=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"organizationEventDetailFilters",params,undefined,false); 
			
			copyArgs(n,"organizationEventDetailFilters",params,undefined,false); 
			copyArgs(n,"locale",params,undefined,false); 
			
			copyArgs(msg,"organizationEventDetailFilters",params,undefined,false); 
			copyArgs(msg,"locale",params,undefined,false); 
			

			svc.describeEventDetailsForOrganization(params,cb);
		}

		
		service.DescribeEventTypes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"filter",params,undefined,false); 
			copyArgs(n,"locale",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"filter",params,undefined,false); 
			copyArgs(msg,"locale",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.describeEventTypes(params,cb);
		}

		
		service.DescribeEvents=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"filter",params,undefined,true); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"locale",params,undefined,false); 
			
			copyArgs(msg,"filter",params,undefined,true); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"locale",params,undefined,false); 
			

			svc.describeEvents(params,cb);
		}

		
		service.DescribeEventsForOrganization=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"filter",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"locale",params,undefined,false); 
			
			copyArgs(msg,"filter",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"locale",params,undefined,false); 
			

			svc.describeEventsForOrganization(params,cb);
		}

		
		service.DescribeHealthServiceStatusForOrganization=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeHealthServiceStatusForOrganization(params,cb);
		}

		
		service.DisableHealthServiceAccessForOrganization=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.disableHealthServiceAccessForOrganization(params,cb);
		}

		
		service.EnableHealthServiceAccessForOrganization=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.enableHealthServiceAccessForOrganization(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Health", AmazonAPINode);

};
