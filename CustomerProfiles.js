
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

		var awsService = new AWS.CustomerProfiles( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.CustomerProfiles(msg.AWSConfig) : awsService;

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

		
		service.AddProfileKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProfileId",params,undefined,false); 
			copyArg(n,"KeyName",params,undefined,false); 
			copyArg(n,"Values",params,undefined,true); 
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"ProfileId",params,undefined,false); 
			copyArg(msg,"KeyName",params,undefined,false); 
			copyArg(msg,"Values",params,undefined,true); 
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.addProfileKey(params,cb);
		}

		
		service.CreateDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			copyArg(n,"DefaultExpirationDays",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"DefaultExpirationDays",params,undefined,false); 
			copyArg(msg,"DefaultEncryptionKey",params,undefined,false); 
			copyArg(msg,"DeadLetterQueueUrl",params,undefined,false); 
			copyArg(msg,"Matching",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createDomain(params,cb);
		}

		
		service.CreateProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"AccountNumber",params,undefined,false); 
			copyArg(msg,"AdditionalInformation",params,undefined,false); 
			copyArg(msg,"PartyType",params,undefined,false); 
			copyArg(msg,"BusinessName",params,undefined,false); 
			copyArg(msg,"FirstName",params,undefined,false); 
			copyArg(msg,"MiddleName",params,undefined,false); 
			copyArg(msg,"LastName",params,undefined,false); 
			copyArg(msg,"BirthDate",params,undefined,false); 
			copyArg(msg,"Gender",params,undefined,false); 
			copyArg(msg,"PhoneNumber",params,undefined,false); 
			copyArg(msg,"MobilePhoneNumber",params,undefined,false); 
			copyArg(msg,"HomePhoneNumber",params,undefined,false); 
			copyArg(msg,"BusinessPhoneNumber",params,undefined,false); 
			copyArg(msg,"EmailAddress",params,undefined,false); 
			copyArg(msg,"PersonalEmailAddress",params,undefined,false); 
			copyArg(msg,"BusinessEmailAddress",params,undefined,false); 
			copyArg(msg,"Address",params,undefined,true); 
			copyArg(msg,"ShippingAddress",params,undefined,true); 
			copyArg(msg,"MailingAddress",params,undefined,true); 
			copyArg(msg,"BillingAddress",params,undefined,true); 
			copyArg(msg,"Attributes",params,undefined,true); 
			

			svc.createProfile(params,cb);
		}

		
		service.DeleteDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.deleteDomain(params,cb);
		}

		
		service.DeleteIntegration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			copyArg(n,"Uri",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"Uri",params,undefined,false); 
			

			svc.deleteIntegration(params,cb);
		}

		
		service.DeleteProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProfileId",params,undefined,false); 
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"ProfileId",params,undefined,false); 
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.deleteProfile(params,cb);
		}

		
		service.DeleteProfileKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProfileId",params,undefined,false); 
			copyArg(n,"KeyName",params,undefined,false); 
			copyArg(n,"Values",params,undefined,true); 
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"ProfileId",params,undefined,false); 
			copyArg(msg,"KeyName",params,undefined,false); 
			copyArg(msg,"Values",params,undefined,true); 
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.deleteProfileKey(params,cb);
		}

		
		service.DeleteProfileObject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProfileId",params,undefined,false); 
			copyArg(n,"ProfileObjectUniqueKey",params,undefined,false); 
			copyArg(n,"ObjectTypeName",params,undefined,false); 
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"ProfileId",params,undefined,false); 
			copyArg(msg,"ProfileObjectUniqueKey",params,undefined,false); 
			copyArg(msg,"ObjectTypeName",params,undefined,false); 
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.deleteProfileObject(params,cb);
		}

		
		service.DeleteProfileObjectType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			copyArg(n,"ObjectTypeName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"ObjectTypeName",params,undefined,false); 
			

			svc.deleteProfileObjectType(params,cb);
		}

		
		service.GetDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.getDomain(params,cb);
		}

		
		service.GetIntegration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			copyArg(n,"Uri",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"Uri",params,undefined,false); 
			

			svc.getIntegration(params,cb);
		}

		
		service.GetMatches=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.getMatches(params,cb);
		}

		
		service.GetProfileObjectType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			copyArg(n,"ObjectTypeName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"ObjectTypeName",params,undefined,false); 
			

			svc.getProfileObjectType(params,cb);
		}

		
		service.GetProfileObjectTypeTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TemplateId",params,undefined,false); 
			
			copyArg(msg,"TemplateId",params,undefined,false); 
			

			svc.getProfileObjectTypeTemplate(params,cb);
		}

		
		service.ListAccountIntegrations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Uri",params,undefined,false); 
			
			copyArg(msg,"Uri",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listAccountIntegrations(params,cb);
		}

		
		service.ListDomains=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listDomains(params,cb);
		}

		
		service.ListIntegrations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listIntegrations(params,cb);
		}

		
		service.ListProfileObjectTypeTemplates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listProfileObjectTypeTemplates(params,cb);
		}

		
		service.ListProfileObjectTypes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listProfileObjectTypes(params,cb);
		}

		
		service.ListProfileObjects=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			copyArg(n,"ObjectTypeName",params,undefined,false); 
			copyArg(n,"ProfileId",params,undefined,false); 
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"ObjectTypeName",params,undefined,false); 
			copyArg(msg,"ProfileId",params,undefined,false); 
			copyArg(msg,"ObjectFilter",params,undefined,false); 
			

			svc.listProfileObjects(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.MergeProfiles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			copyArg(n,"MainProfileId",params,undefined,false); 
			copyArg(n,"ProfileIdsToBeMerged",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"MainProfileId",params,undefined,false); 
			copyArg(msg,"ProfileIdsToBeMerged",params,undefined,false); 
			copyArg(msg,"FieldSourceProfileIds",params,undefined,false); 
			

			svc.mergeProfiles(params,cb);
		}

		
		service.PutIntegration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			copyArg(n,"ObjectTypeName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"Uri",params,undefined,false); 
			copyArg(msg,"ObjectTypeName",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"FlowDefinition",params,undefined,false); 
			

			svc.putIntegration(params,cb);
		}

		
		service.PutProfileObject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ObjectTypeName",params,undefined,false); 
			copyArg(n,"Object",params,undefined,false); 
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"ObjectTypeName",params,undefined,false); 
			copyArg(msg,"Object",params,undefined,false); 
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.putProfileObject(params,cb);
		}

		
		service.PutProfileObjectType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			copyArg(n,"ObjectTypeName",params,undefined,false); 
			copyArg(n,"Description",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"ObjectTypeName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"TemplateId",params,undefined,false); 
			copyArg(msg,"ExpirationDays",params,undefined,false); 
			copyArg(msg,"EncryptionKey",params,undefined,false); 
			copyArg(msg,"AllowProfileCreation",params,undefined,false); 
			copyArg(msg,"Fields",params,undefined,true); 
			copyArg(msg,"Keys",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.putProfileObjectType(params,cb);
		}

		
		service.SearchProfiles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			copyArg(n,"KeyName",params,undefined,false); 
			copyArg(n,"Values",params,undefined,true); 
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"KeyName",params,undefined,false); 
			copyArg(msg,"Values",params,undefined,true); 
			

			svc.searchProfiles(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"tags",params,undefined,true); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"tagKeys",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"DefaultExpirationDays",params,undefined,false); 
			copyArg(msg,"DefaultEncryptionKey",params,undefined,false); 
			copyArg(msg,"DeadLetterQueueUrl",params,undefined,false); 
			copyArg(msg,"Matching",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.updateDomain(params,cb);
		}

		
		service.UpdateProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			copyArg(n,"ProfileId",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"ProfileId",params,undefined,false); 
			copyArg(msg,"AdditionalInformation",params,undefined,false); 
			copyArg(msg,"AccountNumber",params,undefined,false); 
			copyArg(msg,"PartyType",params,undefined,false); 
			copyArg(msg,"BusinessName",params,undefined,false); 
			copyArg(msg,"FirstName",params,undefined,false); 
			copyArg(msg,"MiddleName",params,undefined,false); 
			copyArg(msg,"LastName",params,undefined,false); 
			copyArg(msg,"BirthDate",params,undefined,false); 
			copyArg(msg,"Gender",params,undefined,false); 
			copyArg(msg,"PhoneNumber",params,undefined,false); 
			copyArg(msg,"MobilePhoneNumber",params,undefined,false); 
			copyArg(msg,"HomePhoneNumber",params,undefined,false); 
			copyArg(msg,"BusinessPhoneNumber",params,undefined,false); 
			copyArg(msg,"EmailAddress",params,undefined,false); 
			copyArg(msg,"PersonalEmailAddress",params,undefined,false); 
			copyArg(msg,"BusinessEmailAddress",params,undefined,false); 
			copyArg(msg,"Address",params,undefined,true); 
			copyArg(msg,"ShippingAddress",params,undefined,true); 
			copyArg(msg,"MailingAddress",params,undefined,true); 
			copyArg(msg,"BillingAddress",params,undefined,true); 
			copyArg(msg,"Attributes",params,undefined,false); 
			

			svc.updateProfile(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS CustomerProfiles", AmazonAPINode);

};
