
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

		var awsService = new AWS.SNS( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.SNS(msg.AWSConfig) : awsService;

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
		
			service.AddPermission=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TopicArn",params,undefined,false); 
			copyArgs(n,"Label",params,undefined,false); 
			copyArgs(n,"AWSAccountId",params,undefined,false); 
			copyArgs(n,"ActionName",params,undefined,false); 
			
			copyArgs(n,"TopicArn",params,undefined,false); 
			copyArgs(n,"Label",params,undefined,false); 
			copyArgs(n,"AWSAccountId",params,undefined,false); 
			copyArgs(n,"ActionName",params,undefined,false); 
			
			copyArgs(msg,"TopicArn",params,undefined,false); 
			copyArgs(msg,"Label",params,undefined,false); 
			copyArgs(msg,"AWSAccountId",params,undefined,false); 
			copyArgs(msg,"ActionName",params,undefined,false); 
			

			svc.addPermission(params,cb);
		}
			service.CheckIfPhoneNumberIsOptedOut=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"phoneNumber",params,undefined,false); 
			
			copyArgs(n,"phoneNumber",params,undefined,false); 
			
			copyArgs(msg,"phoneNumber",params,undefined,false); 
			

			svc.checkIfPhoneNumberIsOptedOut(params,cb);
		}
			service.ConfirmSubscription=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TopicArn",params,undefined,false); 
			copyArgs(n,"Token",params,undefined,false); 
			
			copyArgs(n,"TopicArn",params,undefined,false); 
			copyArgs(n,"Token",params,undefined,false); 
			copyArgs(n,"AuthenticateOnUnsubscribe",params,undefined,false); 
			
			copyArgs(msg,"TopicArn",params,undefined,false); 
			copyArgs(msg,"Token",params,undefined,false); 
			copyArgs(msg,"AuthenticateOnUnsubscribe",params,undefined,false); 
			

			svc.confirmSubscription(params,cb);
		}
			service.CreatePlatformApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Platform",params,undefined,false); 
			copyArgs(n,"Attributes",params,undefined,true); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Platform",params,undefined,false); 
			copyArgs(n,"Attributes",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Platform",params,undefined,false); 
			copyArgs(msg,"Attributes",params,undefined,true); 
			

			svc.createPlatformApplication(params,cb);
		}
			service.CreatePlatformEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PlatformApplicationArn",params,undefined,false); 
			copyArgs(n,"Token",params,undefined,false); 
			
			copyArgs(n,"PlatformApplicationArn",params,undefined,false); 
			copyArgs(n,"Token",params,undefined,false); 
			copyArgs(n,"CustomUserData",params,undefined,false); 
			copyArgs(n,"Attributes",params,undefined,true); 
			
			copyArgs(msg,"PlatformApplicationArn",params,undefined,false); 
			copyArgs(msg,"Token",params,undefined,false); 
			copyArgs(msg,"CustomUserData",params,undefined,false); 
			copyArgs(msg,"Attributes",params,undefined,true); 
			

			svc.createPlatformEndpoint(params,cb);
		}
			service.CreateSMSSandboxPhoneNumber=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PhoneNumber",params,undefined,false); 
			
			copyArgs(n,"PhoneNumber",params,undefined,false); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(msg,"PhoneNumber",params,undefined,false); 
			copyArgs(msg,"LanguageCode",params,undefined,false); 
			

			svc.createSMSSandboxPhoneNumber(params,cb);
		}
			service.CreateTopic=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Attributes",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Attributes",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createTopic(params,cb);
		}
			service.DeleteEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointArn",params,undefined,false); 
			
			copyArgs(n,"EndpointArn",params,undefined,false); 
			
			copyArgs(msg,"EndpointArn",params,undefined,false); 
			

			svc.deleteEndpoint(params,cb);
		}
			service.DeletePlatformApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PlatformApplicationArn",params,undefined,false); 
			
			copyArgs(n,"PlatformApplicationArn",params,undefined,false); 
			
			copyArgs(msg,"PlatformApplicationArn",params,undefined,false); 
			

			svc.deletePlatformApplication(params,cb);
		}
			service.DeleteSMSSandboxPhoneNumber=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PhoneNumber",params,undefined,false); 
			
			copyArgs(n,"PhoneNumber",params,undefined,false); 
			
			copyArgs(msg,"PhoneNumber",params,undefined,false); 
			

			svc.deleteSMSSandboxPhoneNumber(params,cb);
		}
			service.DeleteTopic=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TopicArn",params,undefined,false); 
			
			copyArgs(n,"TopicArn",params,undefined,false); 
			
			copyArgs(msg,"TopicArn",params,undefined,false); 
			

			svc.deleteTopic(params,cb);
		}
			service.GetEndpointAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointArn",params,undefined,false); 
			
			copyArgs(n,"EndpointArn",params,undefined,false); 
			
			copyArgs(msg,"EndpointArn",params,undefined,false); 
			

			svc.getEndpointAttributes(params,cb);
		}
			service.GetPlatformApplicationAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PlatformApplicationArn",params,undefined,false); 
			
			copyArgs(n,"PlatformApplicationArn",params,undefined,false); 
			
			copyArgs(msg,"PlatformApplicationArn",params,undefined,false); 
			

			svc.getPlatformApplicationAttributes(params,cb);
		}
			service.GetSMSAttributes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"attributes",params,undefined,false); 
			
			copyArgs(msg,"attributes",params,undefined,false); 
			

			svc.getSMSAttributes(params,cb);
		}
			service.GetSMSSandboxAccountStatus=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getSMSSandboxAccountStatus(params,cb);
		}
			service.GetSubscriptionAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubscriptionArn",params,undefined,false); 
			
			copyArgs(n,"SubscriptionArn",params,undefined,false); 
			
			copyArgs(msg,"SubscriptionArn",params,undefined,false); 
			

			svc.getSubscriptionAttributes(params,cb);
		}
			service.GetTopicAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TopicArn",params,undefined,false); 
			
			copyArgs(n,"TopicArn",params,undefined,false); 
			
			copyArgs(msg,"TopicArn",params,undefined,false); 
			

			svc.getTopicAttributes(params,cb);
		}
			service.ListEndpointsByPlatformApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PlatformApplicationArn",params,undefined,false); 
			
			copyArgs(n,"PlatformApplicationArn",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"PlatformApplicationArn",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listEndpointsByPlatformApplication(params,cb);
		}
			service.ListOriginationNumbers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listOriginationNumbers(params,cb);
		}
			service.ListPhoneNumbersOptedOut=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listPhoneNumbersOptedOut(params,cb);
		}
			service.ListPlatformApplications=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listPlatformApplications(params,cb);
		}
			service.ListSMSSandboxPhoneNumbers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listSMSSandboxPhoneNumbers(params,cb);
		}
			service.ListSubscriptions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listSubscriptions(params,cb);
		}
			service.ListSubscriptionsByTopic=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TopicArn",params,undefined,false); 
			
			copyArgs(n,"TopicArn",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"TopicArn",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listSubscriptionsByTopic(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.ListTopics=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listTopics(params,cb);
		}
			service.OptInPhoneNumber=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"phoneNumber",params,undefined,false); 
			
			copyArgs(n,"phoneNumber",params,undefined,false); 
			
			copyArgs(msg,"phoneNumber",params,undefined,false); 
			

			svc.optInPhoneNumber(params,cb);
		}
			service.Publish=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Message",params,undefined,false); 
			
			copyArgs(n,"TopicArn",params,undefined,false); 
			copyArgs(n,"TargetArn",params,undefined,false); 
			copyArgs(n,"PhoneNumber",params,undefined,false); 
			copyArgs(n,"Message",params,undefined,false); 
			copyArgs(n,"Subject",params,undefined,false); 
			copyArgs(n,"MessageStructure",params,undefined,false); 
			copyArgs(n,"MessageAttributes",params,undefined,false); 
			copyArgs(n,"MessageDeduplicationId",params,undefined,false); 
			copyArgs(n,"MessageGroupId",params,undefined,false); 
			
			copyArgs(msg,"TopicArn",params,undefined,false); 
			copyArgs(msg,"TargetArn",params,undefined,false); 
			copyArgs(msg,"PhoneNumber",params,undefined,false); 
			copyArgs(msg,"Message",params,undefined,false); 
			copyArgs(msg,"Subject",params,undefined,false); 
			copyArgs(msg,"MessageStructure",params,undefined,false); 
			copyArgs(msg,"MessageAttributes",params,undefined,false); 
			copyArgs(msg,"MessageDeduplicationId",params,undefined,false); 
			copyArgs(msg,"MessageGroupId",params,undefined,false); 
			

			svc.publish(params,cb);
		}
			service.RemovePermission=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TopicArn",params,undefined,false); 
			copyArgs(n,"Label",params,undefined,false); 
			
			copyArgs(n,"TopicArn",params,undefined,false); 
			copyArgs(n,"Label",params,undefined,false); 
			
			copyArgs(msg,"TopicArn",params,undefined,false); 
			copyArgs(msg,"Label",params,undefined,false); 
			

			svc.removePermission(params,cb);
		}
			service.SetEndpointAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointArn",params,undefined,false); 
			copyArgs(n,"Attributes",params,undefined,true); 
			
			copyArgs(n,"EndpointArn",params,undefined,false); 
			copyArgs(n,"Attributes",params,undefined,true); 
			
			copyArgs(msg,"EndpointArn",params,undefined,false); 
			copyArgs(msg,"Attributes",params,undefined,true); 
			

			svc.setEndpointAttributes(params,cb);
		}
			service.SetPlatformApplicationAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PlatformApplicationArn",params,undefined,false); 
			copyArgs(n,"Attributes",params,undefined,true); 
			
			copyArgs(n,"PlatformApplicationArn",params,undefined,false); 
			copyArgs(n,"Attributes",params,undefined,true); 
			
			copyArgs(msg,"PlatformApplicationArn",params,undefined,false); 
			copyArgs(msg,"Attributes",params,undefined,true); 
			

			svc.setPlatformApplicationAttributes(params,cb);
		}
			service.SetSMSAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"attributes",params,undefined,true); 
			
			copyArgs(n,"attributes",params,undefined,true); 
			
			copyArgs(msg,"attributes",params,undefined,true); 
			

			svc.setSMSAttributes(params,cb);
		}
			service.SetSubscriptionAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubscriptionArn",params,undefined,false); 
			copyArgs(n,"AttributeName",params,undefined,false); 
			
			copyArgs(n,"SubscriptionArn",params,undefined,false); 
			copyArgs(n,"AttributeName",params,undefined,false); 
			copyArgs(n,"AttributeValue",params,undefined,false); 
			
			copyArgs(msg,"SubscriptionArn",params,undefined,false); 
			copyArgs(msg,"AttributeName",params,undefined,false); 
			copyArgs(msg,"AttributeValue",params,undefined,false); 
			

			svc.setSubscriptionAttributes(params,cb);
		}
			service.SetTopicAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TopicArn",params,undefined,false); 
			copyArgs(n,"AttributeName",params,undefined,false); 
			
			copyArgs(n,"TopicArn",params,undefined,false); 
			copyArgs(n,"AttributeName",params,undefined,false); 
			copyArgs(n,"AttributeValue",params,undefined,false); 
			
			copyArgs(msg,"TopicArn",params,undefined,false); 
			copyArgs(msg,"AttributeName",params,undefined,false); 
			copyArgs(msg,"AttributeValue",params,undefined,false); 
			

			svc.setTopicAttributes(params,cb);
		}
			service.Subscribe=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TopicArn",params,undefined,false); 
			copyArgs(n,"Protocol",params,undefined,false); 
			
			copyArgs(n,"TopicArn",params,undefined,false); 
			copyArgs(n,"Protocol",params,undefined,false); 
			copyArgs(n,"Endpoint",params,undefined,false); 
			copyArgs(n,"Attributes",params,undefined,true); 
			copyArgs(Boolean(n),"ReturnSubscriptionArn",params,undefined,false); 
			
			copyArgs(msg,"TopicArn",params,undefined,false); 
			copyArgs(msg,"Protocol",params,undefined,false); 
			copyArgs(msg,"Endpoint",params,undefined,false); 
			copyArgs(msg,"Attributes",params,undefined,true); 
			copyArgs(msg,"ReturnSubscriptionArn",params,undefined,false); 
			

			svc.subscribe(params,cb);
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
			service.Unsubscribe=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubscriptionArn",params,undefined,false); 
			
			copyArgs(n,"SubscriptionArn",params,undefined,false); 
			
			copyArgs(msg,"SubscriptionArn",params,undefined,false); 
			

			svc.unsubscribe(params,cb);
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
			service.VerifySMSSandboxPhoneNumber=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PhoneNumber",params,undefined,false); 
			copyArgs(n,"OneTimePassword",params,undefined,false); 
			
			copyArgs(n,"PhoneNumber",params,undefined,false); 
			copyArgs(n,"OneTimePassword",params,undefined,false); 
			
			copyArgs(msg,"PhoneNumber",params,undefined,false); 
			copyArgs(msg,"OneTimePassword",params,undefined,false); 
			

			svc.verifySMSSandboxPhoneNumber(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS SNS", AmazonAPINode);

};
