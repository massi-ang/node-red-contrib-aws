
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

		var awsService = new AWS.ACMPCA( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.ACMPCA(msg.AWSConfig) : awsService;

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

		
		service.CreateCertificateAuthority=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateAuthorityConfiguration",params,undefined,true); 
			copyArg(n,"CertificateAuthorityType",params,undefined,false); 
			
			copyArg(msg,"CertificateAuthorityConfiguration",params,undefined,true); 
			copyArg(msg,"RevocationConfiguration",params,undefined,true); 
			copyArg(msg,"CertificateAuthorityType",params,undefined,false); 
			copyArg(msg,"IdempotencyToken",params,undefined,false); 
			copyArg(msg,"KeyStorageSecurityStandard",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createCertificateAuthority(params,cb);
		}

		
		service.CreateCertificateAuthorityAuditReport=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArg(n,"S3BucketName",params,undefined,false); 
			copyArg(n,"AuditReportResponseFormat",params,undefined,false); 
			
			copyArg(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArg(msg,"S3BucketName",params,undefined,false); 
			copyArg(msg,"AuditReportResponseFormat",params,undefined,false); 
			

			svc.createCertificateAuthorityAuditReport(params,cb);
		}

		
		service.CreatePermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArg(n,"Principal",params,undefined,false); 
			copyArg(n,"Actions",params,undefined,true); 
			
			copyArg(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArg(msg,"Principal",params,undefined,false); 
			copyArg(msg,"SourceAccount",params,undefined,false); 
			copyArg(msg,"Actions",params,undefined,true); 
			

			svc.createPermission(params,cb);
		}

		
		service.DeleteCertificateAuthority=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateAuthorityArn",params,undefined,false); 
			
			copyArg(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArg(msg,"PermanentDeletionTimeInDays",params,undefined,false); 
			

			svc.deleteCertificateAuthority(params,cb);
		}

		
		service.DeletePermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArg(n,"Principal",params,undefined,false); 
			
			copyArg(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArg(msg,"Principal",params,undefined,false); 
			copyArg(msg,"SourceAccount",params,undefined,false); 
			

			svc.deletePermission(params,cb);
		}

		
		service.DeletePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.deletePolicy(params,cb);
		}

		
		service.DescribeCertificateAuthority=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateAuthorityArn",params,undefined,false); 
			
			copyArg(msg,"CertificateAuthorityArn",params,undefined,false); 
			

			svc.describeCertificateAuthority(params,cb);
		}

		
		service.DescribeCertificateAuthorityAuditReport=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArg(n,"AuditReportId",params,undefined,false); 
			
			copyArg(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArg(msg,"AuditReportId",params,undefined,false); 
			

			svc.describeCertificateAuthorityAuditReport(params,cb);
		}

		
		service.GetCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArg(n,"CertificateArn",params,undefined,false); 
			
			copyArg(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArg(msg,"CertificateArn",params,undefined,false); 
			

			svc.getCertificate(params,cb);
		}

		
		service.GetCertificateAuthorityCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateAuthorityArn",params,undefined,false); 
			
			copyArg(msg,"CertificateAuthorityArn",params,undefined,false); 
			

			svc.getCertificateAuthorityCertificate(params,cb);
		}

		
		service.GetCertificateAuthorityCsr=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateAuthorityArn",params,undefined,false); 
			
			copyArg(msg,"CertificateAuthorityArn",params,undefined,false); 
			

			svc.getCertificateAuthorityCsr(params,cb);
		}

		
		service.GetPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.getPolicy(params,cb);
		}

		
		service.ImportCertificateAuthorityCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArg(n,"Certificate",params,undefined,false); 
			
			copyArg(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArg(msg,"Certificate",params,undefined,false); 
			copyArg(msg,"CertificateChain",params,undefined,false); 
			

			svc.importCertificateAuthorityCertificate(params,cb);
		}

		
		service.IssueCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArg(n,"Csr",params,undefined,false); 
			copyArg(n,"SigningAlgorithm",params,undefined,false); 
			copyArg(n,"Validity",params,undefined,true); 
			
			copyArg(msg,"ApiPassthrough",params,undefined,false); 
			copyArg(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArg(msg,"Csr",params,undefined,false); 
			copyArg(msg,"SigningAlgorithm",params,undefined,false); 
			copyArg(msg,"TemplateArn",params,undefined,false); 
			copyArg(msg,"Validity",params,undefined,true); 
			copyArg(msg,"ValidityNotBefore",params,undefined,true); 
			copyArg(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.issueCertificate(params,cb);
		}

		
		service.ListCertificateAuthorities=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"ResourceOwner",params,undefined,false); 
			

			svc.listCertificateAuthorities(params,cb);
		}

		
		service.ListPermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateAuthorityArn",params,undefined,false); 
			
			copyArg(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listPermissions(params,cb);
		}

		
		service.ListTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateAuthorityArn",params,undefined,false); 
			
			copyArg(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listTags(params,cb);
		}

		
		service.PutPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"Policy",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"Policy",params,undefined,false); 
			

			svc.putPolicy(params,cb);
		}

		
		service.RestoreCertificateAuthority=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateAuthorityArn",params,undefined,false); 
			
			copyArg(msg,"CertificateAuthorityArn",params,undefined,false); 
			

			svc.restoreCertificateAuthority(params,cb);
		}

		
		service.RevokeCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArg(n,"CertificateSerial",params,undefined,false); 
			copyArg(n,"RevocationReason",params,undefined,false); 
			
			copyArg(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArg(msg,"CertificateSerial",params,undefined,false); 
			copyArg(msg,"RevocationReason",params,undefined,false); 
			

			svc.revokeCertificate(params,cb);
		}

		
		service.TagCertificateAuthority=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagCertificateAuthority(params,cb);
		}

		
		service.UntagCertificateAuthority=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.untagCertificateAuthority(params,cb);
		}

		
		service.UpdateCertificateAuthority=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateAuthorityArn",params,undefined,false); 
			
			copyArg(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArg(msg,"RevocationConfiguration",params,undefined,true); 
			copyArg(msg,"Status",params,undefined,false); 
			

			svc.updateCertificateAuthority(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS ACMPCA", AmazonAPINode);

};
