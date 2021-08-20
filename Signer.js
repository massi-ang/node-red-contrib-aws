
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

		var awsService = new AWS.Signer( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Signer(msg.AWSConfig) : awsService;

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

		
		service.AddProfilePermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"action",params,undefined,false); 
			copyArg(n,"principal",params,undefined,false); 
			copyArg(n,"statementId",params,undefined,false); 
			copyArg(n,"profileName",params,undefined,false); 
			
			copyArg(msg,"profileName",params,undefined,false); 
			copyArg(msg,"profileVersion",params,undefined,false); 
			copyArg(msg,"action",params,undefined,false); 
			copyArg(msg,"principal",params,undefined,false); 
			copyArg(msg,"revisionId",params,undefined,false); 
			copyArg(msg,"statementId",params,undefined,false); 
			

			svc.addProfilePermission(params,cb);
		}

		
		service.CancelSigningProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"profileName",params,undefined,false); 
			
			copyArg(msg,"profileName",params,undefined,false); 
			

			svc.cancelSigningProfile(params,cb);
		}

		
		service.DescribeSigningJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params,undefined,false); 
			
			copyArg(msg,"jobId",params,undefined,false); 
			

			svc.describeSigningJob(params,cb);
		}

		
		service.GetSigningPlatform=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"platformId",params,undefined,false); 
			
			copyArg(msg,"platformId",params,undefined,false); 
			

			svc.getSigningPlatform(params,cb);
		}

		
		service.GetSigningProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"profileName",params,undefined,false); 
			
			copyArg(msg,"profileName",params,undefined,false); 
			copyArg(msg,"profileOwner",params,undefined,false); 
			

			svc.getSigningProfile(params,cb);
		}

		
		service.ListProfilePermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"profileName",params,undefined,false); 
			
			copyArg(msg,"profileName",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listProfilePermissions(params,cb);
		}

		
		service.ListSigningJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"status",params,undefined,false); 
			copyArg(msg,"platformId",params,undefined,false); 
			copyArg(msg,"requestedBy",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"isRevoked",params,undefined,false); 
			copyArg(msg,"signatureExpiresBefore",params,undefined,false); 
			copyArg(msg,"signatureExpiresAfter",params,undefined,false); 
			copyArg(msg,"jobInvoker",params,undefined,false); 
			

			svc.listSigningJobs(params,cb);
		}

		
		service.ListSigningPlatforms=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"category",params,undefined,false); 
			copyArg(msg,"partner",params,undefined,false); 
			copyArg(msg,"target",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listSigningPlatforms(params,cb);
		}

		
		service.ListSigningProfiles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"includeCanceled",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"platformId",params,undefined,false); 
			copyArg(msg,"statuses",params,undefined,false); 
			

			svc.listSigningProfiles(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutSigningProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"profileName",params,undefined,false); 
			copyArg(n,"platformId",params,undefined,false); 
			
			copyArg(msg,"profileName",params,undefined,false); 
			copyArg(msg,"signingMaterial",params,undefined,true); 
			copyArg(msg,"signatureValidityPeriod",params,undefined,true); 
			copyArg(msg,"platformId",params,undefined,false); 
			copyArg(msg,"overrides",params,undefined,true); 
			copyArg(msg,"signingParameters",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.putSigningProfile(params,cb);
		}

		
		service.RemoveProfilePermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"revisionId",params,undefined,false); 
			copyArg(n,"profileName",params,undefined,false); 
			copyArg(n,"statementId",params,undefined,false); 
			
			copyArg(msg,"profileName",params,undefined,false); 
			copyArg(msg,"revisionId",params,undefined,false); 
			copyArg(msg,"statementId",params,undefined,false); 
			

			svc.removeProfilePermission(params,cb);
		}

		
		service.RevokeSignature=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"reason",params,undefined,false); 
			copyArg(n,"jobId",params,undefined,false); 
			
			copyArg(msg,"jobId",params,undefined,false); 
			copyArg(msg,"jobOwner",params,undefined,false); 
			copyArg(msg,"reason",params,undefined,false); 
			

			svc.revokeSignature(params,cb);
		}

		
		service.RevokeSigningProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"profileVersion",params,undefined,false); 
			copyArg(n,"reason",params,undefined,false); 
			copyArg(n,"effectiveTime",params,undefined,false); 
			copyArg(n,"profileName",params,undefined,false); 
			
			copyArg(msg,"profileName",params,undefined,false); 
			copyArg(msg,"profileVersion",params,undefined,false); 
			copyArg(msg,"reason",params,undefined,false); 
			copyArg(msg,"effectiveTime",params,undefined,false); 
			

			svc.revokeSigningProfile(params,cb);
		}

		
		service.StartSigningJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"source",params,undefined,true); 
			copyArg(n,"destination",params,undefined,false); 
			copyArg(n,"profileName",params,undefined,false); 
			copyArg(n,"clientRequestToken",params,undefined,false); 
			
			copyArg(msg,"source",params,undefined,true); 
			copyArg(msg,"destination",params,undefined,false); 
			copyArg(msg,"profileName",params,undefined,false); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			copyArg(msg,"profileOwner",params,undefined,false); 
			

			svc.startSigningJob(params,cb);
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

		 

	}
	RED.nodes.registerType("AWS Signer", AmazonAPINode);

};
