
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

		var awsService = new AWS.CodeStarNotifications( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.CodeStarNotifications(msg.AWSConfig) : awsService;

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

		
		service.CreateNotificationRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,true); 
			copyArg(n,"EventTypeIds",params,undefined,true); 
			copyArg(n,"Resource",params,undefined,false); 
			copyArg(n,"Targets",params,undefined,true); 
			copyArg(n,"DetailType",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,true); 
			copyArg(msg,"EventTypeIds",params,undefined,true); 
			copyArg(msg,"Resource",params,undefined,false); 
			copyArg(msg,"Targets",params,undefined,true); 
			copyArg(msg,"DetailType",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"Status",params,undefined,false); 
			

			svc.createNotificationRule(params,cb);
		}

		
		service.DeleteNotificationRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Arn",params,undefined,false); 
			
			copyArg(msg,"Arn",params,undefined,false); 
			

			svc.deleteNotificationRule(params,cb);
		}

		
		service.DeleteTarget=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TargetAddress",params,undefined,true); 
			
			copyArg(msg,"TargetAddress",params,undefined,true); 
			copyArg(msg,"ForceUnsubscribeAll",params,undefined,false); 
			

			svc.deleteTarget(params,cb);
		}

		
		service.DescribeNotificationRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Arn",params,undefined,false); 
			
			copyArg(msg,"Arn",params,undefined,false); 
			

			svc.describeNotificationRule(params,cb);
		}

		
		service.ListEventTypes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listEventTypes(params,cb);
		}

		
		service.ListNotificationRules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listNotificationRules(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Arn",params,undefined,false); 
			
			copyArg(msg,"Arn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListTargets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listTargets(params,cb);
		}

		
		service.Subscribe=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Arn",params,undefined,false); 
			copyArg(n,"Target",params,undefined,true); 
			
			copyArg(msg,"Arn",params,undefined,false); 
			copyArg(msg,"Target",params,undefined,true); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.subscribe(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Arn",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"Arn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.Unsubscribe=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Arn",params,undefined,false); 
			copyArg(n,"TargetAddress",params,undefined,true); 
			
			copyArg(msg,"Arn",params,undefined,false); 
			copyArg(msg,"TargetAddress",params,undefined,true); 
			

			svc.unsubscribe(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Arn",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"Arn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateNotificationRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Arn",params,undefined,false); 
			
			copyArg(msg,"Arn",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,true); 
			copyArg(msg,"Status",params,undefined,false); 
			copyArg(msg,"EventTypeIds",params,undefined,true); 
			copyArg(msg,"Targets",params,undefined,true); 
			copyArg(msg,"DetailType",params,undefined,false); 
			

			svc.updateNotificationRule(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS CodeStarNotifications", AmazonAPINode);

};
