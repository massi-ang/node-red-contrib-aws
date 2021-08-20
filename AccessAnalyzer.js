
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

		var awsService = new AWS.AccessAnalyzer( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.AccessAnalyzer(msg.AWSConfig) : awsService;

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

		
		service.ApplyArchiveRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"analyzerArn",params,undefined,false); 
			copyArg(n,"ruleName",params,undefined,false); 
			
			copyArg(msg,"analyzerArn",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"ruleName",params,undefined,false); 
			

			svc.applyArchiveRule(params,cb);
		}

		
		service.CancelPolicyGeneration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params,undefined,false); 
			
			copyArg(msg,"jobId",params,undefined,false); 
			

			svc.cancelPolicyGeneration(params,cb);
		}

		
		service.CreateAccessPreview=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"analyzerArn",params,undefined,false); 
			copyArg(n,"configurations",params,undefined,true); 
			
			copyArg(msg,"analyzerArn",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"configurations",params,undefined,true); 
			

			svc.createAccessPreview(params,cb);
		}

		
		service.CreateAnalyzer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"analyzerName",params,undefined,false); 
			copyArg(n,"_type",params,"type",false); 
			
			copyArg(msg,"analyzerName",params,undefined,false); 
			copyArg(msg,"archiveRules",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"type",params,undefined,false); 
			

			svc.createAnalyzer(params,cb);
		}

		
		service.CreateArchiveRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"analyzerName",params,undefined,false); 
			copyArg(n,"filter",params,undefined,true); 
			copyArg(n,"ruleName",params,undefined,false); 
			
			copyArg(msg,"analyzerName",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"filter",params,undefined,true); 
			copyArg(msg,"ruleName",params,undefined,false); 
			

			svc.createArchiveRule(params,cb);
		}

		
		service.DeleteAnalyzer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"analyzerName",params,undefined,false); 
			
			copyArg(msg,"analyzerName",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.deleteAnalyzer(params,cb);
		}

		
		service.DeleteArchiveRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"analyzerName",params,undefined,false); 
			copyArg(n,"ruleName",params,undefined,false); 
			
			copyArg(msg,"analyzerName",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"ruleName",params,undefined,false); 
			

			svc.deleteArchiveRule(params,cb);
		}

		
		service.GetAccessPreview=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"accessPreviewId",params,undefined,false); 
			copyArg(n,"analyzerArn",params,undefined,false); 
			
			copyArg(msg,"accessPreviewId",params,undefined,false); 
			copyArg(msg,"analyzerArn",params,undefined,false); 
			

			svc.getAccessPreview(params,cb);
		}

		
		service.GetAnalyzedResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"analyzerArn",params,undefined,false); 
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"analyzerArn",params,undefined,false); 
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.getAnalyzedResource(params,cb);
		}

		
		service.GetAnalyzer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"analyzerName",params,undefined,false); 
			
			copyArg(msg,"analyzerName",params,undefined,false); 
			

			svc.getAnalyzer(params,cb);
		}

		
		service.GetArchiveRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"analyzerName",params,undefined,false); 
			copyArg(n,"ruleName",params,undefined,false); 
			
			copyArg(msg,"analyzerName",params,undefined,false); 
			copyArg(msg,"ruleName",params,undefined,false); 
			

			svc.getArchiveRule(params,cb);
		}

		
		service.GetFinding=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"analyzerArn",params,undefined,false); 
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"analyzerArn",params,undefined,false); 
			copyArg(msg,"id",params,undefined,false); 
			

			svc.getFinding(params,cb);
		}

		
		service.GetGeneratedPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params,undefined,false); 
			
			copyArg(msg,"includeResourcePlaceholders",params,undefined,false); 
			copyArg(msg,"includeServiceLevelTemplate",params,undefined,false); 
			copyArg(msg,"jobId",params,undefined,false); 
			

			svc.getGeneratedPolicy(params,cb);
		}

		
		service.ListAccessPreviewFindings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"accessPreviewId",params,undefined,false); 
			copyArg(n,"analyzerArn",params,undefined,false); 
			
			copyArg(msg,"accessPreviewId",params,undefined,false); 
			copyArg(msg,"analyzerArn",params,undefined,false); 
			copyArg(msg,"filter",params,undefined,true); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listAccessPreviewFindings(params,cb);
		}

		
		service.ListAccessPreviews=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"analyzerArn",params,undefined,false); 
			
			copyArg(msg,"analyzerArn",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listAccessPreviews(params,cb);
		}

		
		service.ListAnalyzedResources=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"analyzerArn",params,undefined,false); 
			
			copyArg(msg,"analyzerArn",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"resourceType",params,undefined,false); 
			

			svc.listAnalyzedResources(params,cb);
		}

		
		service.ListAnalyzers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"type",params,undefined,false); 
			

			svc.listAnalyzers(params,cb);
		}

		
		service.ListArchiveRules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"analyzerName",params,undefined,false); 
			
			copyArg(msg,"analyzerName",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listArchiveRules(params,cb);
		}

		
		service.ListFindings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"analyzerArn",params,undefined,false); 
			
			copyArg(msg,"analyzerArn",params,undefined,false); 
			copyArg(msg,"filter",params,undefined,true); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"sort",params,undefined,false); 
			

			svc.listFindings(params,cb);
		}

		
		service.ListPolicyGenerations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"principalArn",params,undefined,false); 
			

			svc.listPolicyGenerations(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.StartPolicyGeneration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyGenerationDetails",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"cloudTrailDetails",params,undefined,false); 
			copyArg(msg,"policyGenerationDetails",params,undefined,false); 
			

			svc.startPolicyGeneration(params,cb);
		}

		
		service.StartResourceScan=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"analyzerArn",params,undefined,false); 
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"analyzerArn",params,undefined,false); 
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.startResourceScan(params,cb);
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

		
		service.UpdateArchiveRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"analyzerName",params,undefined,false); 
			copyArg(n,"filter",params,undefined,true); 
			copyArg(n,"ruleName",params,undefined,false); 
			
			copyArg(msg,"analyzerName",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"filter",params,undefined,true); 
			copyArg(msg,"ruleName",params,undefined,false); 
			

			svc.updateArchiveRule(params,cb);
		}

		
		service.UpdateFindings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"analyzerArn",params,undefined,false); 
			copyArg(n,"status",params,undefined,false); 
			
			copyArg(msg,"analyzerArn",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"ids",params,undefined,false); 
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"status",params,undefined,false); 
			

			svc.updateFindings(params,cb);
		}

		
		service.ValidatePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyDocument",params,undefined,false); 
			copyArg(n,"policyType",params,undefined,false); 
			
			copyArg(msg,"locale",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"policyDocument",params,undefined,false); 
			copyArg(msg,"policyType",params,undefined,false); 
			

			svc.validatePolicy(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS AccessAnalyzer", AmazonAPINode);

};
