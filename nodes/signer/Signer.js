
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

		var awsService = new AWS.Signer( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Signer(msg.AWSConfig) : awsService;

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
		
		service.AddProfilePermission=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"action",params,undefined,false); 
			copyArgs(n,"principal",params,undefined,false); 
			copyArgs(n,"statementId",params,undefined,false); 
			copyArgs(n,"profileName",params,undefined,false); 
			
			copyArgs(n,"profileName",params,undefined,false); 
			copyArgs(n,"profileVersion",params,undefined,false); 
			copyArgs(n,"action",params,undefined,false); 
			copyArgs(n,"principal",params,undefined,false); 
			copyArgs(n,"revisionId",params,undefined,false); 
			copyArgs(n,"statementId",params,undefined,false); 
			
			copyArgs(msg,"profileName",params,undefined,false); 
			copyArgs(msg,"profileVersion",params,undefined,false); 
			copyArgs(msg,"action",params,undefined,false); 
			copyArgs(msg,"principal",params,undefined,false); 
			copyArgs(msg,"revisionId",params,undefined,false); 
			copyArgs(msg,"statementId",params,undefined,false); 
			

			svc.addProfilePermission(params,cb);
		}
		
		service.CancelSigningProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"profileName",params,undefined,false); 
			
			copyArgs(n,"profileName",params,undefined,false); 
			
			copyArgs(msg,"profileName",params,undefined,false); 
			

			svc.cancelSigningProfile(params,cb);
		}
		
		service.DescribeSigningJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(msg,"jobId",params,undefined,false); 
			

			svc.describeSigningJob(params,cb);
		}
		
		service.GetSigningPlatform=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"platformId",params,undefined,false); 
			
			copyArgs(n,"platformId",params,undefined,false); 
			
			copyArgs(msg,"platformId",params,undefined,false); 
			

			svc.getSigningPlatform(params,cb);
		}
		
		service.GetSigningProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"profileName",params,undefined,false); 
			
			copyArgs(n,"profileName",params,undefined,false); 
			copyArgs(n,"profileOwner",params,undefined,false); 
			
			copyArgs(msg,"profileName",params,undefined,false); 
			copyArgs(msg,"profileOwner",params,undefined,false); 
			

			svc.getSigningProfile(params,cb);
		}
		
		service.ListProfilePermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"profileName",params,undefined,false); 
			
			copyArgs(n,"profileName",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"profileName",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listProfilePermissions(params,cb);
		}
		
		service.ListSigningJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"status",params,undefined,false); 
			copyArgs(n,"platformId",params,undefined,false); 
			copyArgs(n,"requestedBy",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Boolean(n),"isRevoked",params,undefined,false); 
			copyArgs(n,"signatureExpiresBefore",params,undefined,false); 
			copyArgs(n,"signatureExpiresAfter",params,undefined,false); 
			copyArgs(n,"jobInvoker",params,undefined,false); 
			
			copyArgs(msg,"status",params,undefined,false); 
			copyArgs(msg,"platformId",params,undefined,false); 
			copyArgs(msg,"requestedBy",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"isRevoked",params,undefined,false); 
			copyArgs(msg,"signatureExpiresBefore",params,undefined,false); 
			copyArgs(msg,"signatureExpiresAfter",params,undefined,false); 
			copyArgs(msg,"jobInvoker",params,undefined,false); 
			

			svc.listSigningJobs(params,cb);
		}
		
		service.ListSigningPlatforms=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"category",params,undefined,false); 
			copyArgs(n,"partner",params,undefined,false); 
			copyArgs(n,"target",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"category",params,undefined,false); 
			copyArgs(msg,"partner",params,undefined,false); 
			copyArgs(msg,"target",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listSigningPlatforms(params,cb);
		}
		
		service.ListSigningProfiles=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"includeCanceled",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"platformId",params,undefined,false); 
			copyArgs(n,"statuses",params,undefined,false); 
			
			copyArgs(msg,"includeCanceled",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"platformId",params,undefined,false); 
			copyArgs(msg,"statuses",params,undefined,false); 
			

			svc.listSigningProfiles(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.PutSigningProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"profileName",params,undefined,false); 
			copyArgs(n,"platformId",params,undefined,false); 
			
			copyArgs(n,"profileName",params,undefined,false); 
			copyArgs(n,"signingMaterial",params,undefined,true); 
			copyArgs(n,"signatureValidityPeriod",params,undefined,true); 
			copyArgs(n,"platformId",params,undefined,false); 
			copyArgs(n,"overrides",params,undefined,true); 
			copyArgs(n,"signingParameters",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"profileName",params,undefined,false); 
			copyArgs(msg,"signingMaterial",params,undefined,true); 
			copyArgs(msg,"signatureValidityPeriod",params,undefined,true); 
			copyArgs(msg,"platformId",params,undefined,false); 
			copyArgs(msg,"overrides",params,undefined,true); 
			copyArgs(msg,"signingParameters",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.putSigningProfile(params,cb);
		}
		
		service.RemoveProfilePermission=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"revisionId",params,undefined,false); 
			copyArgs(n,"profileName",params,undefined,false); 
			copyArgs(n,"statementId",params,undefined,false); 
			
			copyArgs(n,"profileName",params,undefined,false); 
			copyArgs(n,"revisionId",params,undefined,false); 
			copyArgs(n,"statementId",params,undefined,false); 
			
			copyArgs(msg,"profileName",params,undefined,false); 
			copyArgs(msg,"revisionId",params,undefined,false); 
			copyArgs(msg,"statementId",params,undefined,false); 
			

			svc.removeProfilePermission(params,cb);
		}
		
		service.RevokeSignature=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"reason",params,undefined,false); 
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"jobOwner",params,undefined,false); 
			copyArgs(n,"reason",params,undefined,false); 
			
			copyArgs(msg,"jobId",params,undefined,false); 
			copyArgs(msg,"jobOwner",params,undefined,false); 
			copyArgs(msg,"reason",params,undefined,false); 
			

			svc.revokeSignature(params,cb);
		}
		
		service.RevokeSigningProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"profileVersion",params,undefined,false); 
			copyArgs(n,"reason",params,undefined,false); 
			copyArgs(n,"effectiveTime",params,undefined,false); 
			copyArgs(n,"profileName",params,undefined,false); 
			
			copyArgs(n,"profileName",params,undefined,false); 
			copyArgs(n,"profileVersion",params,undefined,false); 
			copyArgs(n,"reason",params,undefined,false); 
			copyArgs(n,"effectiveTime",params,undefined,false); 
			
			copyArgs(msg,"profileName",params,undefined,false); 
			copyArgs(msg,"profileVersion",params,undefined,false); 
			copyArgs(msg,"reason",params,undefined,false); 
			copyArgs(msg,"effectiveTime",params,undefined,false); 
			

			svc.revokeSigningProfile(params,cb);
		}
		
		service.StartSigningJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"source",params,undefined,true); 
			copyArgs(n,"destination",params,undefined,false); 
			copyArgs(n,"profileName",params,undefined,false); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(n,"source",params,undefined,true); 
			copyArgs(n,"destination",params,undefined,false); 
			copyArgs(n,"profileName",params,undefined,false); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			copyArgs(n,"profileOwner",params,undefined,false); 
			
			copyArgs(msg,"source",params,undefined,true); 
			copyArgs(msg,"destination",params,undefined,false); 
			copyArgs(msg,"profileName",params,undefined,false); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			copyArgs(msg,"profileOwner",params,undefined,false); 
			

			svc.startSigningJob(params,cb);
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
		
	
	}
	RED.nodes.registerType("AWS Signer", AmazonAPINode);

};
