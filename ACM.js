
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

		var awsService = new AWS.ACM( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.ACM(msg.AWSConfig) : awsService;

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

		
		service.AddTagsToCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateArn",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"CertificateArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.addTagsToCertificate(params,cb);
		}

		
		service.DeleteCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateArn",params,undefined,false); 
			
			copyArg(msg,"CertificateArn",params,undefined,false); 
			

			svc.deleteCertificate(params,cb);
		}

		
		service.DescribeCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateArn",params,undefined,false); 
			
			copyArg(msg,"CertificateArn",params,undefined,false); 
			

			svc.describeCertificate(params,cb);
		}

		
		service.ExportCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateArn",params,undefined,false); 
			copyArg(n,"Passphrase",params,undefined,false); 
			
			copyArg(msg,"CertificateArn",params,undefined,false); 
			copyArg(msg,"Passphrase",params,undefined,false); 
			

			svc.exportCertificate(params,cb);
		}

		
		service.GetAccountConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getAccountConfiguration(params,cb);
		}

		
		service.GetCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateArn",params,undefined,false); 
			
			copyArg(msg,"CertificateArn",params,undefined,false); 
			

			svc.getCertificate(params,cb);
		}

		
		service.ImportCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Certificate",params,undefined,false); 
			copyArg(n,"PrivateKey",params,undefined,false); 
			
			copyArg(msg,"CertificateArn",params,undefined,false); 
			copyArg(msg,"Certificate",params,undefined,false); 
			copyArg(msg,"PrivateKey",params,undefined,false); 
			copyArg(msg,"CertificateChain",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.importCertificate(params,cb);
		}

		
		service.ListCertificates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CertificateStatuses",params,undefined,false); 
			copyArg(msg,"Includes",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listCertificates(params,cb);
		}

		
		service.ListTagsForCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateArn",params,undefined,false); 
			
			copyArg(msg,"CertificateArn",params,undefined,false); 
			

			svc.listTagsForCertificate(params,cb);
		}

		
		service.PutAccountConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IdempotencyToken",params,undefined,false); 
			
			copyArg(msg,"ExpiryEvents",params,undefined,true); 
			copyArg(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.putAccountConfiguration(params,cb);
		}

		
		service.RemoveTagsFromCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateArn",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"CertificateArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.removeTagsFromCertificate(params,cb);
		}

		
		service.RenewCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateArn",params,undefined,false); 
			
			copyArg(msg,"CertificateArn",params,undefined,false); 
			

			svc.renewCertificate(params,cb);
		}

		
		service.RequestCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"ValidationMethod",params,undefined,false); 
			copyArg(msg,"SubjectAlternativeNames",params,undefined,true); 
			copyArg(msg,"IdempotencyToken",params,undefined,false); 
			copyArg(msg,"DomainValidationOptions",params,undefined,false); 
			copyArg(msg,"Options",params,undefined,true); 
			copyArg(msg,"CertificateAuthorityArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.requestCertificate(params,cb);
		}

		
		service.ResendValidationEmail=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateArn",params,undefined,false); 
			copyArg(n,"Domain",params,undefined,false); 
			copyArg(n,"ValidationDomain",params,undefined,false); 
			
			copyArg(msg,"CertificateArn",params,undefined,false); 
			copyArg(msg,"Domain",params,undefined,false); 
			copyArg(msg,"ValidationDomain",params,undefined,false); 
			

			svc.resendValidationEmail(params,cb);
		}

		
		service.UpdateCertificateOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateArn",params,undefined,false); 
			copyArg(n,"Options",params,undefined,true); 
			
			copyArg(msg,"CertificateArn",params,undefined,false); 
			copyArg(msg,"Options",params,undefined,true); 
			

			svc.updateCertificateOptions(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS ACM", AmazonAPINode);

};
