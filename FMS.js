
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

		var awsService = new AWS.FMS( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.FMS(msg.AWSConfig) : awsService;

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

		
		service.AssociateAdminAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AdminAccount",params,undefined,false); 
			
			copyArg(msg,"AdminAccount",params,undefined,false); 
			

			svc.associateAdminAccount(params,cb);
		}

		
		service.DeleteAppsList=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ListId",params,undefined,false); 
			
			copyArg(msg,"ListId",params,undefined,false); 
			

			svc.deleteAppsList(params,cb);
		}

		
		service.DeleteNotificationChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.deleteNotificationChannel(params,cb);
		}

		
		service.DeletePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyId",params,undefined,false); 
			
			copyArg(msg,"PolicyId",params,undefined,false); 
			copyArg(msg,"DeleteAllPolicyResources",params,undefined,false); 
			

			svc.deletePolicy(params,cb);
		}

		
		service.DeleteProtocolsList=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ListId",params,undefined,false); 
			
			copyArg(msg,"ListId",params,undefined,false); 
			

			svc.deleteProtocolsList(params,cb);
		}

		
		service.DisassociateAdminAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.disassociateAdminAccount(params,cb);
		}

		
		service.GetAdminAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getAdminAccount(params,cb);
		}

		
		service.GetAppsList=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ListId",params,undefined,false); 
			
			copyArg(msg,"ListId",params,undefined,false); 
			copyArg(msg,"DefaultList",params,undefined,false); 
			

			svc.getAppsList(params,cb);
		}

		
		service.GetComplianceDetail=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyId",params,undefined,false); 
			copyArg(n,"MemberAccount",params,undefined,false); 
			
			copyArg(msg,"PolicyId",params,undefined,false); 
			copyArg(msg,"MemberAccount",params,undefined,false); 
			

			svc.getComplianceDetail(params,cb);
		}

		
		service.GetNotificationChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getNotificationChannel(params,cb);
		}

		
		service.GetPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyId",params,undefined,false); 
			
			copyArg(msg,"PolicyId",params,undefined,false); 
			

			svc.getPolicy(params,cb);
		}

		
		service.GetProtectionStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyId",params,undefined,false); 
			
			copyArg(msg,"PolicyId",params,undefined,false); 
			copyArg(msg,"MemberAccountId",params,undefined,false); 
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.getProtectionStatus(params,cb);
		}

		
		service.GetProtocolsList=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ListId",params,undefined,false); 
			
			copyArg(msg,"ListId",params,undefined,false); 
			copyArg(msg,"DefaultList",params,undefined,false); 
			

			svc.getProtocolsList(params,cb);
		}

		
		service.GetViolationDetails=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyId",params,undefined,false); 
			copyArg(n,"MemberAccount",params,undefined,false); 
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"ResourceType",params,undefined,false); 
			
			copyArg(msg,"PolicyId",params,undefined,false); 
			copyArg(msg,"MemberAccount",params,undefined,false); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			

			svc.getViolationDetails(params,cb);
		}

		
		service.ListAppsLists=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MaxResults",params,undefined,false); 
			
			copyArg(msg,"DefaultLists",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listAppsLists(params,cb);
		}

		
		service.ListComplianceStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyId",params,undefined,false); 
			
			copyArg(msg,"PolicyId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listComplianceStatus(params,cb);
		}

		
		service.ListMemberAccounts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listMemberAccounts(params,cb);
		}

		
		service.ListPolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listPolicies(params,cb);
		}

		
		service.ListProtocolsLists=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MaxResults",params,undefined,false); 
			
			copyArg(msg,"DefaultLists",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listProtocolsLists(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutAppsList=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AppsList",params,undefined,true); 
			
			copyArg(msg,"AppsList",params,undefined,true); 
			copyArg(msg,"TagList",params,undefined,true); 
			

			svc.putAppsList(params,cb);
		}

		
		service.PutNotificationChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SnsTopicArn",params,undefined,false); 
			copyArg(n,"SnsRoleName",params,undefined,false); 
			
			copyArg(msg,"SnsTopicArn",params,undefined,false); 
			copyArg(msg,"SnsRoleName",params,undefined,false); 
			

			svc.putNotificationChannel(params,cb);
		}

		
		service.PutPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Policy",params,undefined,true); 
			
			copyArg(msg,"Policy",params,undefined,true); 
			copyArg(msg,"TagList",params,undefined,true); 
			

			svc.putPolicy(params,cb);
		}

		
		service.PutProtocolsList=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProtocolsList",params,undefined,true); 
			
			copyArg(msg,"ProtocolsList",params,undefined,true); 
			copyArg(msg,"TagList",params,undefined,true); 
			

			svc.putProtocolsList(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"TagList",params,undefined,true); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagList",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS FMS", AmazonAPINode);

};
