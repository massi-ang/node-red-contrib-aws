
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

		var awsService = new AWS.Support( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Support(msg.AWSConfig) : awsService;

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
		
			service.AddAttachmentsToSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"attachments",params,undefined,false); 
			
			copyArgs(n,"attachmentSetId",params,undefined,false); 
			copyArgs(n,"attachments",params,undefined,false); 
			
			copyArgs(msg,"attachmentSetId",params,undefined,false); 
			copyArgs(msg,"attachments",params,undefined,false); 
			

			svc.addAttachmentsToSet(params,cb);
		}
			service.AddCommunicationToCase=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"communicationBody",params,undefined,false); 
			
			copyArgs(n,"caseId",params,undefined,false); 
			copyArgs(n,"communicationBody",params,undefined,false); 
			copyArgs(n,"ccEmailAddresses",params,undefined,true); 
			copyArgs(n,"attachmentSetId",params,undefined,false); 
			
			copyArgs(msg,"caseId",params,undefined,false); 
			copyArgs(msg,"communicationBody",params,undefined,false); 
			copyArgs(msg,"ccEmailAddresses",params,undefined,true); 
			copyArgs(msg,"attachmentSetId",params,undefined,false); 
			

			svc.addCommunicationToCase(params,cb);
		}
			service.CreateCase=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"subject",params,undefined,false); 
			copyArgs(n,"communicationBody",params,undefined,false); 
			
			copyArgs(n,"subject",params,undefined,false); 
			copyArgs(n,"serviceCode",params,undefined,false); 
			copyArgs(n,"severityCode",params,undefined,false); 
			copyArgs(n,"categoryCode",params,undefined,false); 
			copyArgs(n,"communicationBody",params,undefined,false); 
			copyArgs(n,"ccEmailAddresses",params,undefined,true); 
			copyArgs(n,"language",params,undefined,false); 
			copyArgs(n,"issueType",params,undefined,false); 
			copyArgs(n,"attachmentSetId",params,undefined,false); 
			
			copyArgs(msg,"subject",params,undefined,false); 
			copyArgs(msg,"serviceCode",params,undefined,false); 
			copyArgs(msg,"severityCode",params,undefined,false); 
			copyArgs(msg,"categoryCode",params,undefined,false); 
			copyArgs(msg,"communicationBody",params,undefined,false); 
			copyArgs(msg,"ccEmailAddresses",params,undefined,true); 
			copyArgs(msg,"language",params,undefined,false); 
			copyArgs(msg,"issueType",params,undefined,false); 
			copyArgs(msg,"attachmentSetId",params,undefined,false); 
			

			svc.createCase(params,cb);
		}
			service.DescribeAttachment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"attachmentId",params,undefined,false); 
			
			copyArgs(n,"attachmentId",params,undefined,false); 
			
			copyArgs(msg,"attachmentId",params,undefined,false); 
			

			svc.describeAttachment(params,cb);
		}
			service.DescribeCases=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"caseIdList",params,undefined,false); 
			copyArgs(n,"displayId",params,undefined,false); 
			copyArgs(n,"afterTime",params,undefined,false); 
			copyArgs(n,"beforeTime",params,undefined,false); 
			copyArgs(Boolean(n),"includeResolvedCases",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"language",params,undefined,false); 
			copyArgs(Boolean(n),"includeCommunications",params,undefined,false); 
			
			copyArgs(msg,"caseIdList",params,undefined,false); 
			copyArgs(msg,"displayId",params,undefined,false); 
			copyArgs(msg,"afterTime",params,undefined,false); 
			copyArgs(msg,"beforeTime",params,undefined,false); 
			copyArgs(msg,"includeResolvedCases",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"language",params,undefined,false); 
			copyArgs(msg,"includeCommunications",params,undefined,false); 
			

			svc.describeCases(params,cb);
		}
			service.DescribeCommunications=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"caseId",params,undefined,false); 
			
			copyArgs(n,"caseId",params,undefined,false); 
			copyArgs(n,"beforeTime",params,undefined,false); 
			copyArgs(n,"afterTime",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"caseId",params,undefined,false); 
			copyArgs(msg,"beforeTime",params,undefined,false); 
			copyArgs(msg,"afterTime",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.describeCommunications(params,cb);
		}
			service.DescribeServices=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"serviceCodeList",params,undefined,false); 
			copyArgs(n,"language",params,undefined,false); 
			
			copyArgs(msg,"serviceCodeList",params,undefined,false); 
			copyArgs(msg,"language",params,undefined,false); 
			

			svc.describeServices(params,cb);
		}
			service.DescribeSeverityLevels=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"language",params,undefined,false); 
			
			copyArgs(msg,"language",params,undefined,false); 
			

			svc.describeSeverityLevels(params,cb);
		}
			service.DescribeTrustedAdvisorCheckRefreshStatuses=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"checkIds",params,undefined,true); 
			
			copyArgs(n,"checkIds",params,undefined,true); 
			
			copyArgs(msg,"checkIds",params,undefined,true); 
			

			svc.describeTrustedAdvisorCheckRefreshStatuses(params,cb);
		}
			service.DescribeTrustedAdvisorCheckResult=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"checkId",params,undefined,false); 
			
			copyArgs(n,"checkId",params,undefined,false); 
			copyArgs(n,"language",params,undefined,false); 
			
			copyArgs(msg,"checkId",params,undefined,false); 
			copyArgs(msg,"language",params,undefined,false); 
			

			svc.describeTrustedAdvisorCheckResult(params,cb);
		}
			service.DescribeTrustedAdvisorCheckSummaries=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"checkIds",params,undefined,true); 
			
			copyArgs(n,"checkIds",params,undefined,true); 
			
			copyArgs(msg,"checkIds",params,undefined,true); 
			

			svc.describeTrustedAdvisorCheckSummaries(params,cb);
		}
			service.DescribeTrustedAdvisorChecks=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"language",params,undefined,false); 
			
			copyArgs(n,"language",params,undefined,false); 
			
			copyArgs(msg,"language",params,undefined,false); 
			

			svc.describeTrustedAdvisorChecks(params,cb);
		}
			service.RefreshTrustedAdvisorCheck=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"checkId",params,undefined,false); 
			
			copyArgs(n,"checkId",params,undefined,false); 
			
			copyArgs(msg,"checkId",params,undefined,false); 
			

			svc.refreshTrustedAdvisorCheck(params,cb);
		}
			service.ResolveCase=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"caseId",params,undefined,false); 
			
			copyArgs(msg,"caseId",params,undefined,false); 
			

			svc.resolveCase(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS Support", AmazonAPINode);

};
