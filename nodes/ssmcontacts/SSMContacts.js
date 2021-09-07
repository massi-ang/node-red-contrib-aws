
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

		var awsService = new AWS.SSMContacts( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.SSMContacts(msg.AWSConfig) : awsService;

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

		
		service.AcceptPage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PageId",params,undefined,false); 
			copyArgs(n,"AcceptType",params,undefined,false); 
			copyArgs(n,"AcceptCode",params,undefined,false); 
			
			copyArgs(n,"PageId",params,undefined,false); 
			copyArgs(n,"ContactChannelId",params,undefined,false); 
			copyArgs(n,"AcceptType",params,undefined,false); 
			copyArgs(n,"Note",params,undefined,false); 
			copyArgs(n,"AcceptCode",params,undefined,false); 
			copyArgs(n,"AcceptCodeValidation",params,undefined,false); 
			
			copyArgs(msg,"PageId",params,undefined,false); 
			copyArgs(msg,"ContactChannelId",params,undefined,false); 
			copyArgs(msg,"AcceptType",params,undefined,false); 
			copyArgs(msg,"Note",params,undefined,false); 
			copyArgs(msg,"AcceptCode",params,undefined,false); 
			copyArgs(msg,"AcceptCodeValidation",params,undefined,false); 
			

			svc.acceptPage(params,cb);
		}

		
		service.ActivateContactChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContactChannelId",params,undefined,false); 
			copyArgs(n,"ActivationCode",params,undefined,false); 
			
			copyArgs(n,"ContactChannelId",params,undefined,false); 
			copyArgs(n,"ActivationCode",params,undefined,false); 
			
			copyArgs(msg,"ContactChannelId",params,undefined,false); 
			copyArgs(msg,"ActivationCode",params,undefined,false); 
			

			svc.activateContactChannel(params,cb);
		}

		
		service.CreateContact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Alias",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Plan",params,undefined,true); 
			
			copyArgs(n,"Alias",params,undefined,false); 
			copyArgs(n,"DisplayName",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Plan",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(msg,"Alias",params,undefined,false); 
			copyArgs(msg,"DisplayName",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"Plan",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.createContact(params,cb);
		}

		
		service.CreateContactChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContactId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"DeliveryAddress",params,undefined,true); 
			
			copyArgs(n,"ContactId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"DeliveryAddress",params,undefined,true); 
			copyArgs(n,"DeferActivation",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(msg,"ContactId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"DeliveryAddress",params,undefined,true); 
			copyArgs(msg,"DeferActivation",params,undefined,false); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.createContactChannel(params,cb);
		}

		
		service.DeactivateContactChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContactChannelId",params,undefined,false); 
			
			copyArgs(n,"ContactChannelId",params,undefined,false); 
			
			copyArgs(msg,"ContactChannelId",params,undefined,false); 
			

			svc.deactivateContactChannel(params,cb);
		}

		
		service.DeleteContact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContactId",params,undefined,false); 
			
			copyArgs(n,"ContactId",params,undefined,false); 
			
			copyArgs(msg,"ContactId",params,undefined,false); 
			

			svc.deleteContact(params,cb);
		}

		
		service.DeleteContactChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContactChannelId",params,undefined,false); 
			
			copyArgs(n,"ContactChannelId",params,undefined,false); 
			
			copyArgs(msg,"ContactChannelId",params,undefined,false); 
			

			svc.deleteContactChannel(params,cb);
		}

		
		service.DescribeEngagement=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EngagementId",params,undefined,false); 
			
			copyArgs(n,"EngagementId",params,undefined,false); 
			
			copyArgs(msg,"EngagementId",params,undefined,false); 
			

			svc.describeEngagement(params,cb);
		}

		
		service.DescribePage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PageId",params,undefined,false); 
			
			copyArgs(n,"PageId",params,undefined,false); 
			
			copyArgs(msg,"PageId",params,undefined,false); 
			

			svc.describePage(params,cb);
		}

		
		service.GetContact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContactId",params,undefined,false); 
			
			copyArgs(n,"ContactId",params,undefined,false); 
			
			copyArgs(msg,"ContactId",params,undefined,false); 
			

			svc.getContact(params,cb);
		}

		
		service.GetContactChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContactChannelId",params,undefined,false); 
			
			copyArgs(n,"ContactChannelId",params,undefined,false); 
			
			copyArgs(msg,"ContactChannelId",params,undefined,false); 
			

			svc.getContactChannel(params,cb);
		}

		
		service.GetContactPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContactArn",params,undefined,false); 
			
			copyArgs(n,"ContactArn",params,undefined,false); 
			
			copyArgs(msg,"ContactArn",params,undefined,false); 
			

			svc.getContactPolicy(params,cb);
		}

		
		service.ListContactChannels=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContactId",params,undefined,false); 
			
			copyArgs(n,"ContactId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ContactId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listContactChannels(params,cb);
		}

		
		service.ListContacts=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"AliasPrefix",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"AliasPrefix",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			

			svc.listContacts(params,cb);
		}

		
		service.ListEngagements=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"IncidentId",params,undefined,false); 
			copyArgs(n,"TimeRangeValue",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"IncidentId",params,undefined,false); 
			copyArgs(msg,"TimeRangeValue",params,undefined,false); 
			

			svc.listEngagements(params,cb);
		}

		
		service.ListPageReceipts=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PageId",params,undefined,false); 
			
			copyArgs(n,"PageId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"PageId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listPageReceipts(params,cb);
		}

		
		service.ListPagesByContact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContactId",params,undefined,false); 
			
			copyArgs(n,"ContactId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ContactId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listPagesByContact(params,cb);
		}

		
		service.ListPagesByEngagement=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EngagementId",params,undefined,false); 
			
			copyArgs(n,"EngagementId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"EngagementId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listPagesByEngagement(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutContactPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContactArn",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(n,"ContactArn",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(msg,"ContactArn",params,undefined,false); 
			copyArgs(msg,"Policy",params,undefined,false); 
			

			svc.putContactPolicy(params,cb);
		}

		
		service.SendActivationCode=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContactChannelId",params,undefined,false); 
			
			copyArgs(n,"ContactChannelId",params,undefined,false); 
			
			copyArgs(msg,"ContactChannelId",params,undefined,false); 
			

			svc.sendActivationCode(params,cb);
		}

		
		service.StartEngagement=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContactId",params,undefined,false); 
			copyArgs(n,"Sender",params,undefined,false); 
			copyArgs(n,"Subject",params,undefined,false); 
			copyArgs(n,"Content",params,undefined,false); 
			
			copyArgs(n,"ContactId",params,undefined,false); 
			copyArgs(n,"Sender",params,undefined,false); 
			copyArgs(n,"Subject",params,undefined,false); 
			copyArgs(n,"Content",params,undefined,false); 
			copyArgs(n,"PublicSubject",params,undefined,false); 
			copyArgs(n,"PublicContent",params,undefined,false); 
			copyArgs(n,"IncidentId",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(msg,"ContactId",params,undefined,false); 
			copyArgs(msg,"Sender",params,undefined,false); 
			copyArgs(msg,"Subject",params,undefined,false); 
			copyArgs(msg,"Content",params,undefined,false); 
			copyArgs(msg,"PublicSubject",params,undefined,false); 
			copyArgs(msg,"PublicContent",params,undefined,false); 
			copyArgs(msg,"IncidentId",params,undefined,false); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.startEngagement(params,cb);
		}

		
		service.StopEngagement=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EngagementId",params,undefined,false); 
			
			copyArgs(n,"EngagementId",params,undefined,false); 
			copyArgs(n,"Reason",params,undefined,false); 
			
			copyArgs(msg,"EngagementId",params,undefined,false); 
			copyArgs(msg,"Reason",params,undefined,false); 
			

			svc.stopEngagement(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateContact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContactId",params,undefined,false); 
			
			copyArgs(n,"ContactId",params,undefined,false); 
			copyArgs(n,"DisplayName",params,undefined,false); 
			copyArgs(n,"Plan",params,undefined,true); 
			
			copyArgs(msg,"ContactId",params,undefined,false); 
			copyArgs(msg,"DisplayName",params,undefined,false); 
			copyArgs(msg,"Plan",params,undefined,true); 
			

			svc.updateContact(params,cb);
		}

		
		service.UpdateContactChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContactChannelId",params,undefined,false); 
			
			copyArgs(n,"ContactChannelId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"DeliveryAddress",params,undefined,true); 
			
			copyArgs(msg,"ContactChannelId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"DeliveryAddress",params,undefined,true); 
			

			svc.updateContactChannel(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS SSMContacts", AmazonAPINode);

};
