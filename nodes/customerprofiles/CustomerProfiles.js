
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

		var awsService = new AWS.CustomerProfiles( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.CustomerProfiles(msg.AWSConfig) : awsService;

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

		
		service.AddProfileKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProfileId",params,undefined,false); 
			copyArgs(n,"KeyName",params,undefined,false); 
			copyArgs(n,"Values",params,undefined,true); 
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"ProfileId",params,undefined,false); 
			copyArgs(n,"KeyName",params,undefined,false); 
			copyArgs(n,"Values",params,undefined,true); 
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(msg,"ProfileId",params,undefined,false); 
			copyArgs(msg,"KeyName",params,undefined,false); 
			copyArgs(msg,"Values",params,undefined,true); 
			copyArgs(msg,"DomainName",params,undefined,false); 
			

			svc.addProfileKey(params,cb);
		}

		
		service.CreateDomain=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"DefaultExpirationDays",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"DefaultExpirationDays",params,undefined,false); 
			copyArgs(n,"DefaultEncryptionKey",params,undefined,false); 
			copyArgs(n,"DeadLetterQueueUrl",params,undefined,false); 
			copyArgs(n,"Matching",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"DefaultExpirationDays",params,undefined,false); 
			copyArgs(msg,"DefaultEncryptionKey",params,undefined,false); 
			copyArgs(msg,"DeadLetterQueueUrl",params,undefined,false); 
			copyArgs(msg,"Matching",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createDomain(params,cb);
		}

		
		service.CreateProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"AccountNumber",params,undefined,false); 
			copyArgs(n,"AdditionalInformation",params,undefined,false); 
			copyArgs(n,"PartyType",params,undefined,false); 
			copyArgs(n,"BusinessName",params,undefined,false); 
			copyArgs(n,"FirstName",params,undefined,false); 
			copyArgs(n,"MiddleName",params,undefined,false); 
			copyArgs(n,"LastName",params,undefined,false); 
			copyArgs(n,"BirthDate",params,undefined,false); 
			copyArgs(n,"Gender",params,undefined,false); 
			copyArgs(n,"PhoneNumber",params,undefined,false); 
			copyArgs(n,"MobilePhoneNumber",params,undefined,false); 
			copyArgs(n,"HomePhoneNumber",params,undefined,false); 
			copyArgs(n,"BusinessPhoneNumber",params,undefined,false); 
			copyArgs(n,"EmailAddress",params,undefined,false); 
			copyArgs(n,"PersonalEmailAddress",params,undefined,false); 
			copyArgs(n,"BusinessEmailAddress",params,undefined,false); 
			copyArgs(n,"Address",params,undefined,true); 
			copyArgs(n,"ShippingAddress",params,undefined,true); 
			copyArgs(n,"MailingAddress",params,undefined,true); 
			copyArgs(n,"BillingAddress",params,undefined,true); 
			copyArgs(n,"Attributes",params,undefined,true); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"AccountNumber",params,undefined,false); 
			copyArgs(msg,"AdditionalInformation",params,undefined,false); 
			copyArgs(msg,"PartyType",params,undefined,false); 
			copyArgs(msg,"BusinessName",params,undefined,false); 
			copyArgs(msg,"FirstName",params,undefined,false); 
			copyArgs(msg,"MiddleName",params,undefined,false); 
			copyArgs(msg,"LastName",params,undefined,false); 
			copyArgs(msg,"BirthDate",params,undefined,false); 
			copyArgs(msg,"Gender",params,undefined,false); 
			copyArgs(msg,"PhoneNumber",params,undefined,false); 
			copyArgs(msg,"MobilePhoneNumber",params,undefined,false); 
			copyArgs(msg,"HomePhoneNumber",params,undefined,false); 
			copyArgs(msg,"BusinessPhoneNumber",params,undefined,false); 
			copyArgs(msg,"EmailAddress",params,undefined,false); 
			copyArgs(msg,"PersonalEmailAddress",params,undefined,false); 
			copyArgs(msg,"BusinessEmailAddress",params,undefined,false); 
			copyArgs(msg,"Address",params,undefined,true); 
			copyArgs(msg,"ShippingAddress",params,undefined,true); 
			copyArgs(msg,"MailingAddress",params,undefined,true); 
			copyArgs(msg,"BillingAddress",params,undefined,true); 
			copyArgs(msg,"Attributes",params,undefined,true); 
			

			svc.createProfile(params,cb);
		}

		
		service.DeleteDomain=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			

			svc.deleteDomain(params,cb);
		}

		
		service.DeleteIntegration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"Uri",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"Uri",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"Uri",params,undefined,false); 
			

			svc.deleteIntegration(params,cb);
		}

		
		service.DeleteProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProfileId",params,undefined,false); 
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"ProfileId",params,undefined,false); 
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(msg,"ProfileId",params,undefined,false); 
			copyArgs(msg,"DomainName",params,undefined,false); 
			

			svc.deleteProfile(params,cb);
		}

		
		service.DeleteProfileKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProfileId",params,undefined,false); 
			copyArgs(n,"KeyName",params,undefined,false); 
			copyArgs(n,"Values",params,undefined,true); 
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"ProfileId",params,undefined,false); 
			copyArgs(n,"KeyName",params,undefined,false); 
			copyArgs(n,"Values",params,undefined,true); 
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(msg,"ProfileId",params,undefined,false); 
			copyArgs(msg,"KeyName",params,undefined,false); 
			copyArgs(msg,"Values",params,undefined,true); 
			copyArgs(msg,"DomainName",params,undefined,false); 
			

			svc.deleteProfileKey(params,cb);
		}

		
		service.DeleteProfileObject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProfileId",params,undefined,false); 
			copyArgs(n,"ProfileObjectUniqueKey",params,undefined,false); 
			copyArgs(n,"ObjectTypeName",params,undefined,false); 
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"ProfileId",params,undefined,false); 
			copyArgs(n,"ProfileObjectUniqueKey",params,undefined,false); 
			copyArgs(n,"ObjectTypeName",params,undefined,false); 
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(msg,"ProfileId",params,undefined,false); 
			copyArgs(msg,"ProfileObjectUniqueKey",params,undefined,false); 
			copyArgs(msg,"ObjectTypeName",params,undefined,false); 
			copyArgs(msg,"DomainName",params,undefined,false); 
			

			svc.deleteProfileObject(params,cb);
		}

		
		service.DeleteProfileObjectType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"ObjectTypeName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"ObjectTypeName",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"ObjectTypeName",params,undefined,false); 
			

			svc.deleteProfileObjectType(params,cb);
		}

		
		service.GetDomain=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			

			svc.getDomain(params,cb);
		}

		
		service.GetIntegration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"Uri",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"Uri",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"Uri",params,undefined,false); 
			

			svc.getIntegration(params,cb);
		}

		
		service.GetMatches=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"DomainName",params,undefined,false); 
			

			svc.getMatches(params,cb);
		}

		
		service.GetProfileObjectType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"ObjectTypeName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"ObjectTypeName",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"ObjectTypeName",params,undefined,false); 
			

			svc.getProfileObjectType(params,cb);
		}

		
		service.GetProfileObjectTypeTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TemplateId",params,undefined,false); 
			
			copyArgs(n,"TemplateId",params,undefined,false); 
			
			copyArgs(msg,"TemplateId",params,undefined,false); 
			

			svc.getProfileObjectTypeTemplate(params,cb);
		}

		
		service.ListAccountIntegrations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Uri",params,undefined,false); 
			
			copyArgs(n,"Uri",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Uri",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listAccountIntegrations(params,cb);
		}

		
		service.ListDomains=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listDomains(params,cb);
		}

		
		service.ListIntegrations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listIntegrations(params,cb);
		}

		
		service.ListProfileObjectTypeTemplates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listProfileObjectTypeTemplates(params,cb);
		}

		
		service.ListProfileObjectTypes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listProfileObjectTypes(params,cb);
		}

		
		service.ListProfileObjects=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"ObjectTypeName",params,undefined,false); 
			copyArgs(n,"ProfileId",params,undefined,false); 
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"ObjectTypeName",params,undefined,false); 
			copyArgs(n,"ProfileId",params,undefined,false); 
			copyArgs(n,"ObjectFilter",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"ObjectTypeName",params,undefined,false); 
			copyArgs(msg,"ProfileId",params,undefined,false); 
			copyArgs(msg,"ObjectFilter",params,undefined,false); 
			

			svc.listProfileObjects(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.MergeProfiles=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"MainProfileId",params,undefined,false); 
			copyArgs(n,"ProfileIdsToBeMerged",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"MainProfileId",params,undefined,false); 
			copyArgs(n,"ProfileIdsToBeMerged",params,undefined,false); 
			copyArgs(n,"FieldSourceProfileIds",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"MainProfileId",params,undefined,false); 
			copyArgs(msg,"ProfileIdsToBeMerged",params,undefined,false); 
			copyArgs(msg,"FieldSourceProfileIds",params,undefined,false); 
			

			svc.mergeProfiles(params,cb);
		}

		
		service.PutIntegration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"ObjectTypeName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"Uri",params,undefined,false); 
			copyArgs(n,"ObjectTypeName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"FlowDefinition",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"Uri",params,undefined,false); 
			copyArgs(msg,"ObjectTypeName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"FlowDefinition",params,undefined,false); 
			

			svc.putIntegration(params,cb);
		}

		
		service.PutProfileObject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ObjectTypeName",params,undefined,false); 
			copyArgs(n,"Object",params,undefined,false); 
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"ObjectTypeName",params,undefined,false); 
			copyArgs(n,"Object",params,undefined,false); 
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(msg,"ObjectTypeName",params,undefined,false); 
			copyArgs(msg,"Object",params,undefined,false); 
			copyArgs(msg,"DomainName",params,undefined,false); 
			

			svc.putProfileObject(params,cb);
		}

		
		service.PutProfileObjectType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"ObjectTypeName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"ObjectTypeName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"TemplateId",params,undefined,false); 
			copyArgs(n,"ExpirationDays",params,undefined,false); 
			copyArgs(n,"EncryptionKey",params,undefined,false); 
			copyArgs(n,"AllowProfileCreation",params,undefined,false); 
			copyArgs(n,"Fields",params,undefined,true); 
			copyArgs(n,"Keys",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"ObjectTypeName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"TemplateId",params,undefined,false); 
			copyArgs(msg,"ExpirationDays",params,undefined,false); 
			copyArgs(msg,"EncryptionKey",params,undefined,false); 
			copyArgs(msg,"AllowProfileCreation",params,undefined,false); 
			copyArgs(msg,"Fields",params,undefined,true); 
			copyArgs(msg,"Keys",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.putProfileObjectType(params,cb);
		}

		
		service.SearchProfiles=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"KeyName",params,undefined,false); 
			copyArgs(n,"Values",params,undefined,true); 
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"KeyName",params,undefined,false); 
			copyArgs(n,"Values",params,undefined,true); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"KeyName",params,undefined,false); 
			copyArgs(msg,"Values",params,undefined,true); 
			

			svc.searchProfiles(params,cb);
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

		
		service.UpdateDomain=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"DefaultExpirationDays",params,undefined,false); 
			copyArgs(n,"DefaultEncryptionKey",params,undefined,false); 
			copyArgs(n,"DeadLetterQueueUrl",params,undefined,false); 
			copyArgs(n,"Matching",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"DefaultExpirationDays",params,undefined,false); 
			copyArgs(msg,"DefaultEncryptionKey",params,undefined,false); 
			copyArgs(msg,"DeadLetterQueueUrl",params,undefined,false); 
			copyArgs(msg,"Matching",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.updateDomain(params,cb);
		}

		
		service.UpdateProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"ProfileId",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"ProfileId",params,undefined,false); 
			copyArgs(n,"AdditionalInformation",params,undefined,false); 
			copyArgs(n,"AccountNumber",params,undefined,false); 
			copyArgs(n,"PartyType",params,undefined,false); 
			copyArgs(n,"BusinessName",params,undefined,false); 
			copyArgs(n,"FirstName",params,undefined,false); 
			copyArgs(n,"MiddleName",params,undefined,false); 
			copyArgs(n,"LastName",params,undefined,false); 
			copyArgs(n,"BirthDate",params,undefined,false); 
			copyArgs(n,"Gender",params,undefined,false); 
			copyArgs(n,"PhoneNumber",params,undefined,false); 
			copyArgs(n,"MobilePhoneNumber",params,undefined,false); 
			copyArgs(n,"HomePhoneNumber",params,undefined,false); 
			copyArgs(n,"BusinessPhoneNumber",params,undefined,false); 
			copyArgs(n,"EmailAddress",params,undefined,false); 
			copyArgs(n,"PersonalEmailAddress",params,undefined,false); 
			copyArgs(n,"BusinessEmailAddress",params,undefined,false); 
			copyArgs(n,"Address",params,undefined,true); 
			copyArgs(n,"ShippingAddress",params,undefined,true); 
			copyArgs(n,"MailingAddress",params,undefined,true); 
			copyArgs(n,"BillingAddress",params,undefined,true); 
			copyArgs(n,"Attributes",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"ProfileId",params,undefined,false); 
			copyArgs(msg,"AdditionalInformation",params,undefined,false); 
			copyArgs(msg,"AccountNumber",params,undefined,false); 
			copyArgs(msg,"PartyType",params,undefined,false); 
			copyArgs(msg,"BusinessName",params,undefined,false); 
			copyArgs(msg,"FirstName",params,undefined,false); 
			copyArgs(msg,"MiddleName",params,undefined,false); 
			copyArgs(msg,"LastName",params,undefined,false); 
			copyArgs(msg,"BirthDate",params,undefined,false); 
			copyArgs(msg,"Gender",params,undefined,false); 
			copyArgs(msg,"PhoneNumber",params,undefined,false); 
			copyArgs(msg,"MobilePhoneNumber",params,undefined,false); 
			copyArgs(msg,"HomePhoneNumber",params,undefined,false); 
			copyArgs(msg,"BusinessPhoneNumber",params,undefined,false); 
			copyArgs(msg,"EmailAddress",params,undefined,false); 
			copyArgs(msg,"PersonalEmailAddress",params,undefined,false); 
			copyArgs(msg,"BusinessEmailAddress",params,undefined,false); 
			copyArgs(msg,"Address",params,undefined,true); 
			copyArgs(msg,"ShippingAddress",params,undefined,true); 
			copyArgs(msg,"MailingAddress",params,undefined,true); 
			copyArgs(msg,"BillingAddress",params,undefined,true); 
			copyArgs(msg,"Attributes",params,undefined,false); 
			

			svc.updateProfile(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS CustomerProfiles", AmazonAPINode);

};
