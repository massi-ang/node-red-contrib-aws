
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

		var awsService = new AWS.ACMPCA( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.ACMPCA(msg.AWSConfig) : awsService;

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
		
			service.CreateCertificateAuthority=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateAuthorityConfiguration",params,undefined,true); 
			copyArgs(n,"CertificateAuthorityType",params,undefined,false); 
			
			copyArgs(n,"CertificateAuthorityConfiguration",params,undefined,true); 
			copyArgs(n,"RevocationConfiguration",params,undefined,true); 
			copyArgs(n,"CertificateAuthorityType",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			copyArgs(n,"KeyStorageSecurityStandard",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"CertificateAuthorityConfiguration",params,undefined,true); 
			copyArgs(msg,"RevocationConfiguration",params,undefined,true); 
			copyArgs(msg,"CertificateAuthorityType",params,undefined,false); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			copyArgs(msg,"KeyStorageSecurityStandard",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createCertificateAuthority(params,cb);
		}
			service.CreateCertificateAuthorityAuditReport=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(n,"S3BucketName",params,undefined,false); 
			copyArgs(n,"AuditReportResponseFormat",params,undefined,false); 
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(n,"S3BucketName",params,undefined,false); 
			copyArgs(n,"AuditReportResponseFormat",params,undefined,false); 
			
			copyArgs(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(msg,"S3BucketName",params,undefined,false); 
			copyArgs(msg,"AuditReportResponseFormat",params,undefined,false); 
			

			svc.createCertificateAuthorityAuditReport(params,cb);
		}
			service.CreatePermission=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(n,"Principal",params,undefined,false); 
			copyArgs(n,"Actions",params,undefined,true); 
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(n,"Principal",params,undefined,false); 
			copyArgs(n,"SourceAccount",params,undefined,false); 
			copyArgs(n,"Actions",params,undefined,true); 
			
			copyArgs(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(msg,"Principal",params,undefined,false); 
			copyArgs(msg,"SourceAccount",params,undefined,false); 
			copyArgs(msg,"Actions",params,undefined,true); 
			

			svc.createPermission(params,cb);
		}
			service.DeleteCertificateAuthority=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(Number(n),"PermanentDeletionTimeInDays",params,undefined,false); 
			
			copyArgs(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(msg,"PermanentDeletionTimeInDays",params,undefined,false); 
			

			svc.deleteCertificateAuthority(params,cb);
		}
			service.DeletePermission=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(n,"Principal",params,undefined,false); 
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(n,"Principal",params,undefined,false); 
			copyArgs(n,"SourceAccount",params,undefined,false); 
			
			copyArgs(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(msg,"Principal",params,undefined,false); 
			copyArgs(msg,"SourceAccount",params,undefined,false); 
			

			svc.deletePermission(params,cb);
		}
			service.DeletePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.deletePolicy(params,cb);
		}
			service.DescribeCertificateAuthority=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			
			copyArgs(msg,"CertificateAuthorityArn",params,undefined,false); 
			

			svc.describeCertificateAuthority(params,cb);
		}
			service.DescribeCertificateAuthorityAuditReport=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(n,"AuditReportId",params,undefined,false); 
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(n,"AuditReportId",params,undefined,false); 
			
			copyArgs(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(msg,"AuditReportId",params,undefined,false); 
			

			svc.describeCertificateAuthorityAuditReport(params,cb);
		}
			service.GetCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(n,"CertificateArn",params,undefined,false); 
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(n,"CertificateArn",params,undefined,false); 
			
			copyArgs(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(msg,"CertificateArn",params,undefined,false); 
			

			svc.getCertificate(params,cb);
		}
			service.GetCertificateAuthorityCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			
			copyArgs(msg,"CertificateAuthorityArn",params,undefined,false); 
			

			svc.getCertificateAuthorityCertificate(params,cb);
		}
			service.GetCertificateAuthorityCsr=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			
			copyArgs(msg,"CertificateAuthorityArn",params,undefined,false); 
			

			svc.getCertificateAuthorityCsr(params,cb);
		}
			service.GetPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.getPolicy(params,cb);
		}
			service.ImportCertificateAuthorityCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(Buffer.from(n),"Certificate",params,undefined,false); 
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(Buffer.from(n),"Certificate",params,undefined,false); 
			copyArgs(Buffer.from(n),"CertificateChain",params,undefined,false); 
			
			copyArgs(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(msg,"Certificate",params,undefined,false); 
			copyArgs(msg,"CertificateChain",params,undefined,false); 
			

			svc.importCertificateAuthorityCertificate(params,cb);
		}
			service.IssueCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(Buffer.from(n),"Csr",params,undefined,false); 
			copyArgs(n,"SigningAlgorithm",params,undefined,false); 
			copyArgs(n,"Validity",params,undefined,true); 
			
			copyArgs(n,"ApiPassthrough",params,undefined,false); 
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(Buffer.from(n),"Csr",params,undefined,false); 
			copyArgs(n,"SigningAlgorithm",params,undefined,false); 
			copyArgs(n,"TemplateArn",params,undefined,false); 
			copyArgs(n,"Validity",params,undefined,true); 
			copyArgs(n,"ValidityNotBefore",params,undefined,true); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(msg,"ApiPassthrough",params,undefined,false); 
			copyArgs(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(msg,"Csr",params,undefined,false); 
			copyArgs(msg,"SigningAlgorithm",params,undefined,false); 
			copyArgs(msg,"TemplateArn",params,undefined,false); 
			copyArgs(msg,"Validity",params,undefined,true); 
			copyArgs(msg,"ValidityNotBefore",params,undefined,true); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.issueCertificate(params,cb);
		}
			service.ListCertificateAuthorities=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"ResourceOwner",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"ResourceOwner",params,undefined,false); 
			

			svc.listCertificateAuthorities(params,cb);
		}
			service.ListPermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listPermissions(params,cb);
		}
			service.ListTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listTags(params,cb);
		}
			service.PutPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"Policy",params,undefined,false); 
			

			svc.putPolicy(params,cb);
		}
			service.RestoreCertificateAuthority=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			
			copyArgs(msg,"CertificateAuthorityArn",params,undefined,false); 
			

			svc.restoreCertificateAuthority(params,cb);
		}
			service.RevokeCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(n,"CertificateSerial",params,undefined,false); 
			copyArgs(n,"RevocationReason",params,undefined,false); 
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(n,"CertificateSerial",params,undefined,false); 
			copyArgs(n,"RevocationReason",params,undefined,false); 
			
			copyArgs(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(msg,"CertificateSerial",params,undefined,false); 
			copyArgs(msg,"RevocationReason",params,undefined,false); 
			

			svc.revokeCertificate(params,cb);
		}
			service.TagCertificateAuthority=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagCertificateAuthority(params,cb);
		}
			service.UntagCertificateAuthority=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.untagCertificateAuthority(params,cb);
		}
			service.UpdateCertificateAuthority=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(n,"RevocationConfiguration",params,undefined,true); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(msg,"RevocationConfiguration",params,undefined,true); 
			copyArgs(msg,"Status",params,undefined,false); 
			

			svc.updateCertificateAuthority(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS ACMPCA", AmazonAPINode);

};
