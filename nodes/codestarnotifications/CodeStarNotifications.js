
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

		var awsService = new AWS.CodeStarNotifications( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.CodeStarNotifications(msg.AWSConfig) : awsService;

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
		
		service.CreateNotificationRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,true); 
			copyArgs(n,"EventTypeIds",params,undefined,true); 
			copyArgs(n,"Resource",params,undefined,false); 
			copyArgs(n,"Targets",params,undefined,true); 
			copyArgs(n,"DetailType",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,true); 
			copyArgs(n,"EventTypeIds",params,undefined,true); 
			copyArgs(n,"Resource",params,undefined,false); 
			copyArgs(n,"Targets",params,undefined,true); 
			copyArgs(n,"DetailType",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,true); 
			copyArgs(msg,"EventTypeIds",params,undefined,true); 
			copyArgs(msg,"Resource",params,undefined,false); 
			copyArgs(msg,"Targets",params,undefined,true); 
			copyArgs(msg,"DetailType",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"Status",params,undefined,false); 
			

			svc.createNotificationRule(params,cb);
		}
		
		service.DeleteNotificationRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			

			svc.deleteNotificationRule(params,cb);
		}
		
		service.DeleteTarget=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TargetAddress",params,undefined,true); 
			
			copyArgs(n,"TargetAddress",params,undefined,true); 
			copyArgs(Boolean(n),"ForceUnsubscribeAll",params,undefined,false); 
			
			copyArgs(msg,"TargetAddress",params,undefined,true); 
			copyArgs(msg,"ForceUnsubscribeAll",params,undefined,false); 
			

			svc.deleteTarget(params,cb);
		}
		
		service.DescribeNotificationRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			

			svc.describeNotificationRule(params,cb);
		}
		
		service.ListEventTypes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listEventTypes(params,cb);
		}
		
		service.ListNotificationRules=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listNotificationRules(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.ListTargets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listTargets(params,cb);
		}
		
		service.Subscribe=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"Target",params,undefined,true); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"Target",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			copyArgs(msg,"Target",params,undefined,true); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.subscribe(params,cb);
		}
		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
		
		service.Unsubscribe=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"TargetAddress",params,undefined,true); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"TargetAddress",params,undefined,true); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			copyArgs(msg,"TargetAddress",params,undefined,true); 
			

			svc.unsubscribe(params,cb);
		}
		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
		
		service.UpdateNotificationRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,true); 
			copyArgs(n,"Status",params,undefined,false); 
			copyArgs(n,"EventTypeIds",params,undefined,true); 
			copyArgs(n,"Targets",params,undefined,true); 
			copyArgs(n,"DetailType",params,undefined,false); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,true); 
			copyArgs(msg,"Status",params,undefined,false); 
			copyArgs(msg,"EventTypeIds",params,undefined,true); 
			copyArgs(msg,"Targets",params,undefined,true); 
			copyArgs(msg,"DetailType",params,undefined,false); 
			

			svc.updateNotificationRule(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS CodeStarNotifications", AmazonAPINode);

};
