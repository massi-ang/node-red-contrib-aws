
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

		var awsService = new AWS.SSMContacts( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.SSMContacts(msg.AWSConfig) : awsService;

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

		
		service.AcceptPage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PageId",params,undefined,false); 
			copyArg(n,"AcceptType",params,undefined,false); 
			copyArg(n,"AcceptCode",params,undefined,false); 
			
			copyArg(msg,"PageId",params,undefined,false); 
			copyArg(msg,"ContactChannelId",params,undefined,false); 
			copyArg(msg,"AcceptType",params,undefined,false); 
			copyArg(msg,"Note",params,undefined,false); 
			copyArg(msg,"AcceptCode",params,undefined,false); 
			copyArg(msg,"AcceptCodeValidation",params,undefined,false); 
			

			svc.acceptPage(params,cb);
		}

		
		service.ActivateContactChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContactChannelId",params,undefined,false); 
			copyArg(n,"ActivationCode",params,undefined,false); 
			
			copyArg(msg,"ContactChannelId",params,undefined,false); 
			copyArg(msg,"ActivationCode",params,undefined,false); 
			

			svc.activateContactChannel(params,cb);
		}

		
		service.CreateContact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Alias",params,undefined,false); 
			copyArg(n,"Type",params,undefined,false); 
			copyArg(n,"Plan",params,undefined,true); 
			
			copyArg(msg,"Alias",params,undefined,false); 
			copyArg(msg,"DisplayName",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"Plan",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.createContact(params,cb);
		}

		
		service.CreateContactChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContactId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Type",params,undefined,false); 
			copyArg(n,"DeliveryAddress",params,undefined,true); 
			
			copyArg(msg,"ContactId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"DeliveryAddress",params,undefined,true); 
			copyArg(msg,"DeferActivation",params,undefined,false); 
			copyArg(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.createContactChannel(params,cb);
		}

		
		service.DeactivateContactChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContactChannelId",params,undefined,false); 
			
			copyArg(msg,"ContactChannelId",params,undefined,false); 
			

			svc.deactivateContactChannel(params,cb);
		}

		
		service.DeleteContact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContactId",params,undefined,false); 
			
			copyArg(msg,"ContactId",params,undefined,false); 
			

			svc.deleteContact(params,cb);
		}

		
		service.DeleteContactChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContactChannelId",params,undefined,false); 
			
			copyArg(msg,"ContactChannelId",params,undefined,false); 
			

			svc.deleteContactChannel(params,cb);
		}

		
		service.DescribeEngagement=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EngagementId",params,undefined,false); 
			
			copyArg(msg,"EngagementId",params,undefined,false); 
			

			svc.describeEngagement(params,cb);
		}

		
		service.DescribePage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PageId",params,undefined,false); 
			
			copyArg(msg,"PageId",params,undefined,false); 
			

			svc.describePage(params,cb);
		}

		
		service.GetContact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContactId",params,undefined,false); 
			
			copyArg(msg,"ContactId",params,undefined,false); 
			

			svc.getContact(params,cb);
		}

		
		service.GetContactChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContactChannelId",params,undefined,false); 
			
			copyArg(msg,"ContactChannelId",params,undefined,false); 
			

			svc.getContactChannel(params,cb);
		}

		
		service.GetContactPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContactArn",params,undefined,false); 
			
			copyArg(msg,"ContactArn",params,undefined,false); 
			

			svc.getContactPolicy(params,cb);
		}

		
		service.ListContactChannels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContactId",params,undefined,false); 
			
			copyArg(msg,"ContactId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listContactChannels(params,cb);
		}

		
		service.ListContacts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"AliasPrefix",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			

			svc.listContacts(params,cb);
		}

		
		service.ListEngagements=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"IncidentId",params,undefined,false); 
			copyArg(msg,"TimeRangeValue",params,undefined,false); 
			

			svc.listEngagements(params,cb);
		}

		
		service.ListPageReceipts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PageId",params,undefined,false); 
			
			copyArg(msg,"PageId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listPageReceipts(params,cb);
		}

		
		service.ListPagesByContact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContactId",params,undefined,false); 
			
			copyArg(msg,"ContactId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listPagesByContact(params,cb);
		}

		
		service.ListPagesByEngagement=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EngagementId",params,undefined,false); 
			
			copyArg(msg,"EngagementId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listPagesByEngagement(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutContactPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContactArn",params,undefined,false); 
			copyArg(n,"Policy",params,undefined,false); 
			
			copyArg(msg,"ContactArn",params,undefined,false); 
			copyArg(msg,"Policy",params,undefined,false); 
			

			svc.putContactPolicy(params,cb);
		}

		
		service.SendActivationCode=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContactChannelId",params,undefined,false); 
			
			copyArg(msg,"ContactChannelId",params,undefined,false); 
			

			svc.sendActivationCode(params,cb);
		}

		
		service.StartEngagement=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContactId",params,undefined,false); 
			copyArg(n,"Sender",params,undefined,false); 
			copyArg(n,"Subject",params,undefined,false); 
			copyArg(n,"Content",params,undefined,false); 
			
			copyArg(msg,"ContactId",params,undefined,false); 
			copyArg(msg,"Sender",params,undefined,false); 
			copyArg(msg,"Subject",params,undefined,false); 
			copyArg(msg,"Content",params,undefined,false); 
			copyArg(msg,"PublicSubject",params,undefined,false); 
			copyArg(msg,"PublicContent",params,undefined,false); 
			copyArg(msg,"IncidentId",params,undefined,false); 
			copyArg(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.startEngagement(params,cb);
		}

		
		service.StopEngagement=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EngagementId",params,undefined,false); 
			
			copyArg(msg,"EngagementId",params,undefined,false); 
			copyArg(msg,"Reason",params,undefined,false); 
			

			svc.stopEngagement(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateContact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContactId",params,undefined,false); 
			
			copyArg(msg,"ContactId",params,undefined,false); 
			copyArg(msg,"DisplayName",params,undefined,false); 
			copyArg(msg,"Plan",params,undefined,true); 
			

			svc.updateContact(params,cb);
		}

		
		service.UpdateContactChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContactChannelId",params,undefined,false); 
			
			copyArg(msg,"ContactChannelId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"DeliveryAddress",params,undefined,true); 
			

			svc.updateContactChannel(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS SSMContacts", AmazonAPINode);

};
