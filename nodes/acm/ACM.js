
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

		var awsService = new AWS.ACM( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.ACM(msg.AWSConfig) : awsService;

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
		
			service.AddTagsToCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"CertificateArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"CertificateArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.addTagsToCertificate(params,cb);
		}
			service.DeleteCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateArn",params,undefined,false); 
			
			copyArgs(n,"CertificateArn",params,undefined,false); 
			
			copyArgs(msg,"CertificateArn",params,undefined,false); 
			

			svc.deleteCertificate(params,cb);
		}
			service.DescribeCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateArn",params,undefined,false); 
			
			copyArgs(n,"CertificateArn",params,undefined,false); 
			
			copyArgs(msg,"CertificateArn",params,undefined,false); 
			

			svc.describeCertificate(params,cb);
		}
			service.ExportCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateArn",params,undefined,false); 
			copyArgs(Buffer.from(n),"Passphrase",params,undefined,false); 
			
			copyArgs(n,"CertificateArn",params,undefined,false); 
			copyArgs(Buffer.from(n),"Passphrase",params,undefined,false); 
			
			copyArgs(msg,"CertificateArn",params,undefined,false); 
			copyArgs(msg,"Passphrase",params,undefined,false); 
			

			svc.exportCertificate(params,cb);
		}
			service.GetAccountConfiguration=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getAccountConfiguration(params,cb);
		}
			service.GetCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateArn",params,undefined,false); 
			
			copyArgs(n,"CertificateArn",params,undefined,false); 
			
			copyArgs(msg,"CertificateArn",params,undefined,false); 
			

			svc.getCertificate(params,cb);
		}
			service.ImportCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(Buffer.from(n),"Certificate",params,undefined,false); 
			copyArgs(Buffer.from(n),"PrivateKey",params,undefined,false); 
			
			copyArgs(n,"CertificateArn",params,undefined,false); 
			copyArgs(Buffer.from(n),"Certificate",params,undefined,false); 
			copyArgs(Buffer.from(n),"PrivateKey",params,undefined,false); 
			copyArgs(Buffer.from(n),"CertificateChain",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"CertificateArn",params,undefined,false); 
			copyArgs(msg,"Certificate",params,undefined,false); 
			copyArgs(msg,"PrivateKey",params,undefined,false); 
			copyArgs(msg,"CertificateChain",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.importCertificate(params,cb);
		}
			service.ListCertificates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CertificateStatuses",params,undefined,false); 
			copyArgs(n,"Includes",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"CertificateStatuses",params,undefined,false); 
			copyArgs(msg,"Includes",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listCertificates(params,cb);
		}
			service.ListTagsForCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateArn",params,undefined,false); 
			
			copyArgs(n,"CertificateArn",params,undefined,false); 
			
			copyArgs(msg,"CertificateArn",params,undefined,false); 
			

			svc.listTagsForCertificate(params,cb);
		}
			service.PutAccountConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(n,"ExpiryEvents",params,undefined,true); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(msg,"ExpiryEvents",params,undefined,true); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.putAccountConfiguration(params,cb);
		}
			service.RemoveTagsFromCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"CertificateArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"CertificateArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.removeTagsFromCertificate(params,cb);
		}
			service.RenewCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateArn",params,undefined,false); 
			
			copyArgs(n,"CertificateArn",params,undefined,false); 
			
			copyArgs(msg,"CertificateArn",params,undefined,false); 
			

			svc.renewCertificate(params,cb);
		}
			service.RequestCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"ValidationMethod",params,undefined,false); 
			copyArgs(n,"SubjectAlternativeNames",params,undefined,true); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			copyArgs(n,"DomainValidationOptions",params,undefined,false); 
			copyArgs(n,"Options",params,undefined,true); 
			copyArgs(n,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"ValidationMethod",params,undefined,false); 
			copyArgs(msg,"SubjectAlternativeNames",params,undefined,true); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			copyArgs(msg,"DomainValidationOptions",params,undefined,false); 
			copyArgs(msg,"Options",params,undefined,true); 
			copyArgs(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.requestCertificate(params,cb);
		}
			service.ResendValidationEmail=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateArn",params,undefined,false); 
			copyArgs(n,"Domain",params,undefined,false); 
			copyArgs(n,"ValidationDomain",params,undefined,false); 
			
			copyArgs(n,"CertificateArn",params,undefined,false); 
			copyArgs(n,"Domain",params,undefined,false); 
			copyArgs(n,"ValidationDomain",params,undefined,false); 
			
			copyArgs(msg,"CertificateArn",params,undefined,false); 
			copyArgs(msg,"Domain",params,undefined,false); 
			copyArgs(msg,"ValidationDomain",params,undefined,false); 
			

			svc.resendValidationEmail(params,cb);
		}
			service.UpdateCertificateOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateArn",params,undefined,false); 
			copyArgs(n,"Options",params,undefined,true); 
			
			copyArgs(n,"CertificateArn",params,undefined,false); 
			copyArgs(n,"Options",params,undefined,true); 
			
			copyArgs(msg,"CertificateArn",params,undefined,false); 
			copyArgs(msg,"Options",params,undefined,true); 
			

			svc.updateCertificateOptions(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS ACM", AmazonAPINode);

};
