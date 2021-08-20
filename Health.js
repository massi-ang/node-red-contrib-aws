
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

		var awsService = new AWS.Health( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Health(msg.AWSConfig) : awsService;

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

		
		service.DescribeAffectedAccountsForOrganization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"eventArn",params,undefined,false); 
			
			copyArg(msg,"eventArn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.describeAffectedAccountsForOrganization(params,cb);
		}

		
		service.DescribeAffectedEntities=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"filter",params,undefined,false); 
			
			copyArg(msg,"filter",params,undefined,false); 
			copyArg(msg,"locale",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.describeAffectedEntities(params,cb);
		}

		
		service.DescribeAffectedEntitiesForOrganization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"organizationEntityFilters",params,undefined,false); 
			
			copyArg(msg,"organizationEntityFilters",params,undefined,false); 
			copyArg(msg,"locale",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.describeAffectedEntitiesForOrganization(params,cb);
		}

		
		service.DescribeEntityAggregates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"eventArns",params,undefined,false); 
			

			svc.describeEntityAggregates(params,cb);
		}

		
		service.DescribeEventAggregates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"aggregateField",params,undefined,false); 
			
			copyArg(msg,"filter",params,undefined,true); 
			copyArg(msg,"aggregateField",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.describeEventAggregates(params,cb);
		}

		
		service.DescribeEventDetails=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"eventArns",params,undefined,true); 
			
			copyArg(msg,"eventArns",params,undefined,true); 
			copyArg(msg,"locale",params,undefined,false); 
			

			svc.describeEventDetails(params,cb);
		}

		
		service.DescribeEventDetailsForOrganization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"organizationEventDetailFilters",params,undefined,false); 
			
			copyArg(msg,"organizationEventDetailFilters",params,undefined,false); 
			copyArg(msg,"locale",params,undefined,false); 
			

			svc.describeEventDetailsForOrganization(params,cb);
		}

		
		service.DescribeEventTypes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"filter",params,undefined,false); 
			copyArg(msg,"locale",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.describeEventTypes(params,cb);
		}

		
		service.DescribeEvents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"filter",params,undefined,true); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"locale",params,undefined,false); 
			

			svc.describeEvents(params,cb);
		}

		
		service.DescribeEventsForOrganization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"filter",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"locale",params,undefined,false); 
			

			svc.describeEventsForOrganization(params,cb);
		}

		
		service.DescribeHealthServiceStatusForOrganization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeHealthServiceStatusForOrganization(params,cb);
		}

		
		service.DisableHealthServiceAccessForOrganization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.disableHealthServiceAccessForOrganization(params,cb);
		}

		
		service.EnableHealthServiceAccessForOrganization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.enableHealthServiceAccessForOrganization(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Health", AmazonAPINode);

};
