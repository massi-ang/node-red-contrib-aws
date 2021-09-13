
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

		var awsService = new AWS.ResourceGroups( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.ResourceGroups(msg.AWSConfig) : awsService;

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
		
			service.CreateGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"ResourceQuery",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"Configuration",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"ResourceQuery",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"Configuration",params,undefined,true); 
			

			svc.createGroup(params,cb);
		}
			service.DeleteGroup=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"Group",params,undefined,false); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"Group",params,undefined,false); 
			

			svc.deleteGroup(params,cb);
		}
			service.GetGroup=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"Group",params,undefined,false); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"Group",params,undefined,false); 
			

			svc.getGroup(params,cb);
		}
			service.GetGroupConfiguration=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Group",params,undefined,false); 
			
			copyArgs(msg,"Group",params,undefined,false); 
			

			svc.getGroupConfiguration(params,cb);
		}
			service.GetGroupQuery=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"Group",params,undefined,false); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"Group",params,undefined,false); 
			

			svc.getGroupQuery(params,cb);
		}
			service.GetTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			

			svc.getTags(params,cb);
		}
			service.GroupResources=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Group",params,undefined,false); 
			copyArgs(n,"ResourceArns",params,undefined,true); 
			
			copyArgs(n,"Group",params,undefined,false); 
			copyArgs(n,"ResourceArns",params,undefined,true); 
			
			copyArgs(msg,"Group",params,undefined,false); 
			copyArgs(msg,"ResourceArns",params,undefined,true); 
			

			svc.groupResources(params,cb);
		}
			service.ListGroupResources=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"Group",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"Group",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listGroupResources(params,cb);
		}
			service.ListGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listGroups(params,cb);
		}
			service.PutGroupConfiguration=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Group",params,undefined,false); 
			copyArgs(n,"Configuration",params,undefined,true); 
			
			copyArgs(msg,"Group",params,undefined,false); 
			copyArgs(msg,"Configuration",params,undefined,true); 
			

			svc.putGroupConfiguration(params,cb);
		}
			service.SearchResources=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceQuery",params,undefined,true); 
			
			copyArgs(n,"ResourceQuery",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ResourceQuery",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.searchResources(params,cb);
		}
			service.Tag=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tag(params,cb);
		}
			service.UngroupResources=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Group",params,undefined,false); 
			copyArgs(n,"ResourceArns",params,undefined,true); 
			
			copyArgs(n,"Group",params,undefined,false); 
			copyArgs(n,"ResourceArns",params,undefined,true); 
			
			copyArgs(msg,"Group",params,undefined,false); 
			copyArgs(msg,"ResourceArns",params,undefined,true); 
			

			svc.ungroupResources(params,cb);
		}
			service.Untag=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"Keys",params,undefined,true); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"Keys",params,undefined,true); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			copyArgs(msg,"Keys",params,undefined,true); 
			

			svc.untag(params,cb);
		}
			service.UpdateGroup=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"Group",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"Group",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			

			svc.updateGroup(params,cb);
		}
			service.UpdateGroupQuery=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceQuery",params,undefined,true); 
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"Group",params,undefined,false); 
			copyArgs(n,"ResourceQuery",params,undefined,true); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"Group",params,undefined,false); 
			copyArgs(msg,"ResourceQuery",params,undefined,true); 
			

			svc.updateGroupQuery(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS ResourceGroups", AmazonAPINode);

};
