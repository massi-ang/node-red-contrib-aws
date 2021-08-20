
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

		var awsService = new AWS.Support( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Support(msg.AWSConfig) : awsService;

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

		
		service.AddAttachmentsToSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"attachments",params,undefined,false); 
			
			copyArg(msg,"attachmentSetId",params,undefined,false); 
			copyArg(msg,"attachments",params,undefined,false); 
			

			svc.addAttachmentsToSet(params,cb);
		}

		
		service.AddCommunicationToCase=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"communicationBody",params,undefined,false); 
			
			copyArg(msg,"caseId",params,undefined,false); 
			copyArg(msg,"communicationBody",params,undefined,false); 
			copyArg(msg,"ccEmailAddresses",params,undefined,true); 
			copyArg(msg,"attachmentSetId",params,undefined,false); 
			

			svc.addCommunicationToCase(params,cb);
		}

		
		service.CreateCase=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"subject",params,undefined,false); 
			copyArg(n,"communicationBody",params,undefined,false); 
			
			copyArg(msg,"subject",params,undefined,false); 
			copyArg(msg,"serviceCode",params,undefined,false); 
			copyArg(msg,"severityCode",params,undefined,false); 
			copyArg(msg,"categoryCode",params,undefined,false); 
			copyArg(msg,"communicationBody",params,undefined,false); 
			copyArg(msg,"ccEmailAddresses",params,undefined,true); 
			copyArg(msg,"language",params,undefined,false); 
			copyArg(msg,"issueType",params,undefined,false); 
			copyArg(msg,"attachmentSetId",params,undefined,false); 
			

			svc.createCase(params,cb);
		}

		
		service.DescribeAttachment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"attachmentId",params,undefined,false); 
			
			copyArg(msg,"attachmentId",params,undefined,false); 
			

			svc.describeAttachment(params,cb);
		}

		
		service.DescribeCases=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"caseIdList",params,undefined,false); 
			copyArg(msg,"displayId",params,undefined,false); 
			copyArg(msg,"afterTime",params,undefined,false); 
			copyArg(msg,"beforeTime",params,undefined,false); 
			copyArg(msg,"includeResolvedCases",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"language",params,undefined,false); 
			copyArg(msg,"includeCommunications",params,undefined,false); 
			

			svc.describeCases(params,cb);
		}

		
		service.DescribeCommunications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"caseId",params,undefined,false); 
			
			copyArg(msg,"caseId",params,undefined,false); 
			copyArg(msg,"beforeTime",params,undefined,false); 
			copyArg(msg,"afterTime",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.describeCommunications(params,cb);
		}

		
		service.DescribeServices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"serviceCodeList",params,undefined,false); 
			copyArg(msg,"language",params,undefined,false); 
			

			svc.describeServices(params,cb);
		}

		
		service.DescribeSeverityLevels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"language",params,undefined,false); 
			

			svc.describeSeverityLevels(params,cb);
		}

		
		service.DescribeTrustedAdvisorCheckRefreshStatuses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"checkIds",params,undefined,true); 
			
			copyArg(msg,"checkIds",params,undefined,true); 
			

			svc.describeTrustedAdvisorCheckRefreshStatuses(params,cb);
		}

		
		service.DescribeTrustedAdvisorCheckResult=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"checkId",params,undefined,false); 
			
			copyArg(msg,"checkId",params,undefined,false); 
			copyArg(msg,"language",params,undefined,false); 
			

			svc.describeTrustedAdvisorCheckResult(params,cb);
		}

		
		service.DescribeTrustedAdvisorCheckSummaries=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"checkIds",params,undefined,true); 
			
			copyArg(msg,"checkIds",params,undefined,true); 
			

			svc.describeTrustedAdvisorCheckSummaries(params,cb);
		}

		
		service.DescribeTrustedAdvisorChecks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"language",params,undefined,false); 
			
			copyArg(msg,"language",params,undefined,false); 
			

			svc.describeTrustedAdvisorChecks(params,cb);
		}

		
		service.RefreshTrustedAdvisorCheck=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"checkId",params,undefined,false); 
			
			copyArg(msg,"checkId",params,undefined,false); 
			

			svc.refreshTrustedAdvisorCheck(params,cb);
		}

		
		service.ResolveCase=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"caseId",params,undefined,false); 
			

			svc.resolveCase(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Support", AmazonAPINode);

};
