
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

		var awsService = new AWS.KMS( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.KMS(msg.AWSConfig) : awsService;

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
		
			service.CancelKeyDeletion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			

			svc.cancelKeyDeletion(params,cb);
		}
			service.ConnectCustomKeyStore=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CustomKeyStoreId",params,undefined,false); 
			
			copyArgs(n,"CustomKeyStoreId",params,undefined,false); 
			
			copyArgs(msg,"CustomKeyStoreId",params,undefined,false); 
			

			svc.connectCustomKeyStore(params,cb);
		}
			service.CreateAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AliasName",params,undefined,false); 
			copyArgs(n,"TargetKeyId",params,undefined,false); 
			
			copyArgs(n,"AliasName",params,undefined,false); 
			copyArgs(n,"TargetKeyId",params,undefined,false); 
			
			copyArgs(msg,"AliasName",params,undefined,false); 
			copyArgs(msg,"TargetKeyId",params,undefined,false); 
			

			svc.createAlias(params,cb);
		}
			service.CreateCustomKeyStore=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CustomKeyStoreName",params,undefined,false); 
			copyArgs(n,"CloudHsmClusterId",params,undefined,false); 
			copyArgs(n,"TrustAnchorCertificate",params,undefined,false); 
			copyArgs(n,"KeyStorePassword",params,undefined,true); 
			
			copyArgs(n,"CustomKeyStoreName",params,undefined,false); 
			copyArgs(n,"CloudHsmClusterId",params,undefined,false); 
			copyArgs(n,"TrustAnchorCertificate",params,undefined,false); 
			copyArgs(n,"KeyStorePassword",params,undefined,true); 
			
			copyArgs(msg,"CustomKeyStoreName",params,undefined,false); 
			copyArgs(msg,"CloudHsmClusterId",params,undefined,false); 
			copyArgs(msg,"TrustAnchorCertificate",params,undefined,false); 
			copyArgs(msg,"KeyStorePassword",params,undefined,true); 
			

			svc.createCustomKeyStore(params,cb);
		}
			service.CreateGrant=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"GranteePrincipal",params,undefined,false); 
			copyArgs(n,"Operations",params,undefined,true); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"GranteePrincipal",params,undefined,false); 
			copyArgs(n,"RetiringPrincipal",params,undefined,false); 
			copyArgs(n,"Operations",params,undefined,true); 
			copyArgs(n,"Constraints",params,undefined,true); 
			copyArgs(n,"GrantTokens",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"GranteePrincipal",params,undefined,false); 
			copyArgs(msg,"RetiringPrincipal",params,undefined,false); 
			copyArgs(msg,"Operations",params,undefined,true); 
			copyArgs(msg,"Constraints",params,undefined,true); 
			copyArgs(msg,"GrantTokens",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.createGrant(params,cb);
		}
			service.CreateKey=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Policy",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"KeyUsage",params,undefined,false); 
			copyArgs(n,"CustomerMasterKeySpec",params,undefined,true); 
			copyArgs(n,"KeySpec",params,undefined,false); 
			copyArgs(n,"Origin",params,undefined,false); 
			copyArgs(n,"CustomKeyStoreId",params,undefined,false); 
			copyArgs(Boolean(n),"BypassPolicyLockoutSafetyCheck",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(Boolean(n),"MultiRegion",params,undefined,false); 
			
			copyArgs(msg,"Policy",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"KeyUsage",params,undefined,false); 
			copyArgs(msg,"CustomerMasterKeySpec",params,undefined,true); 
			copyArgs(msg,"KeySpec",params,undefined,false); 
			copyArgs(msg,"Origin",params,undefined,false); 
			copyArgs(msg,"CustomKeyStoreId",params,undefined,false); 
			copyArgs(msg,"BypassPolicyLockoutSafetyCheck",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"MultiRegion",params,undefined,false); 
			

			svc.createKey(params,cb);
		}
			service.Decrypt=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CiphertextBlob",params,undefined,false); 
			
			copyArgs(n,"CiphertextBlob",params,undefined,false); 
			copyArgs(n,"EncryptionContext",params,undefined,true); 
			copyArgs(n,"GrantTokens",params,undefined,true); 
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"EncryptionAlgorithm",params,undefined,false); 
			
			copyArgs(msg,"CiphertextBlob",params,undefined,false); 
			copyArgs(msg,"EncryptionContext",params,undefined,true); 
			copyArgs(msg,"GrantTokens",params,undefined,true); 
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"EncryptionAlgorithm",params,undefined,false); 
			

			svc.decrypt(params,cb);
		}
			service.DeleteAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AliasName",params,undefined,false); 
			
			copyArgs(n,"AliasName",params,undefined,false); 
			
			copyArgs(msg,"AliasName",params,undefined,false); 
			

			svc.deleteAlias(params,cb);
		}
			service.DeleteCustomKeyStore=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CustomKeyStoreId",params,undefined,false); 
			
			copyArgs(n,"CustomKeyStoreId",params,undefined,false); 
			
			copyArgs(msg,"CustomKeyStoreId",params,undefined,false); 
			

			svc.deleteCustomKeyStore(params,cb);
		}
			service.DeleteImportedKeyMaterial=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			

			svc.deleteImportedKeyMaterial(params,cb);
		}
			service.DescribeCustomKeyStores=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CustomKeyStoreId",params,undefined,false); 
			copyArgs(n,"CustomKeyStoreName",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"CustomKeyStoreId",params,undefined,false); 
			copyArgs(msg,"CustomKeyStoreName",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeCustomKeyStores(params,cb);
		}
			service.DescribeKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"GrantTokens",params,undefined,true); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"GrantTokens",params,undefined,true); 
			

			svc.describeKey(params,cb);
		}
			service.DisableKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			

			svc.disableKey(params,cb);
		}
			service.DisableKeyRotation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			

			svc.disableKeyRotation(params,cb);
		}
			service.DisconnectCustomKeyStore=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CustomKeyStoreId",params,undefined,false); 
			
			copyArgs(n,"CustomKeyStoreId",params,undefined,false); 
			
			copyArgs(msg,"CustomKeyStoreId",params,undefined,false); 
			

			svc.disconnectCustomKeyStore(params,cb);
		}
			service.EnableKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			

			svc.enableKey(params,cb);
		}
			service.EnableKeyRotation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			

			svc.enableKeyRotation(params,cb);
		}
			service.Encrypt=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"Plaintext",params,undefined,true); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"Plaintext",params,undefined,true); 
			copyArgs(n,"EncryptionContext",params,undefined,true); 
			copyArgs(n,"GrantTokens",params,undefined,true); 
			copyArgs(n,"EncryptionAlgorithm",params,undefined,false); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"Plaintext",params,undefined,true); 
			copyArgs(msg,"EncryptionContext",params,undefined,true); 
			copyArgs(msg,"GrantTokens",params,undefined,true); 
			copyArgs(msg,"EncryptionAlgorithm",params,undefined,false); 
			

			svc.encrypt(params,cb);
		}
			service.GenerateDataKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"EncryptionContext",params,undefined,true); 
			copyArgs(Number(n),"NumberOfBytes",params,undefined,false); 
			copyArgs(n,"KeySpec",params,undefined,false); 
			copyArgs(n,"GrantTokens",params,undefined,true); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"EncryptionContext",params,undefined,true); 
			copyArgs(msg,"NumberOfBytes",params,undefined,false); 
			copyArgs(msg,"KeySpec",params,undefined,false); 
			copyArgs(msg,"GrantTokens",params,undefined,true); 
			

			svc.generateDataKey(params,cb);
		}
			service.GenerateDataKeyPair=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"KeyPairSpec",params,undefined,false); 
			
			copyArgs(n,"EncryptionContext",params,undefined,true); 
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"KeyPairSpec",params,undefined,false); 
			copyArgs(n,"GrantTokens",params,undefined,true); 
			
			copyArgs(msg,"EncryptionContext",params,undefined,true); 
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"KeyPairSpec",params,undefined,false); 
			copyArgs(msg,"GrantTokens",params,undefined,true); 
			

			svc.generateDataKeyPair(params,cb);
		}
			service.GenerateDataKeyPairWithoutPlaintext=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"KeyPairSpec",params,undefined,false); 
			
			copyArgs(n,"EncryptionContext",params,undefined,true); 
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"KeyPairSpec",params,undefined,false); 
			copyArgs(n,"GrantTokens",params,undefined,true); 
			
			copyArgs(msg,"EncryptionContext",params,undefined,true); 
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"KeyPairSpec",params,undefined,false); 
			copyArgs(msg,"GrantTokens",params,undefined,true); 
			

			svc.generateDataKeyPairWithoutPlaintext(params,cb);
		}
			service.GenerateDataKeyWithoutPlaintext=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"EncryptionContext",params,undefined,true); 
			copyArgs(n,"KeySpec",params,undefined,false); 
			copyArgs(Number(n),"NumberOfBytes",params,undefined,false); 
			copyArgs(n,"GrantTokens",params,undefined,true); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"EncryptionContext",params,undefined,true); 
			copyArgs(msg,"KeySpec",params,undefined,false); 
			copyArgs(msg,"NumberOfBytes",params,undefined,false); 
			copyArgs(msg,"GrantTokens",params,undefined,true); 
			

			svc.generateDataKeyWithoutPlaintext(params,cb);
		}
			service.GenerateRandom=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"NumberOfBytes",params,undefined,false); 
			copyArgs(n,"CustomKeyStoreId",params,undefined,false); 
			
			copyArgs(msg,"NumberOfBytes",params,undefined,false); 
			copyArgs(msg,"CustomKeyStoreId",params,undefined,false); 
			

			svc.generateRandom(params,cb);
		}
			service.GetKeyPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"PolicyName",params,undefined,false); 
			

			svc.getKeyPolicy(params,cb);
		}
			service.GetKeyRotationStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			

			svc.getKeyRotationStatus(params,cb);
		}
			service.GetParametersForImport=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"WrappingAlgorithm",params,undefined,false); 
			copyArgs(n,"WrappingKeySpec",params,undefined,false); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"WrappingAlgorithm",params,undefined,false); 
			copyArgs(n,"WrappingKeySpec",params,undefined,false); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"WrappingAlgorithm",params,undefined,false); 
			copyArgs(msg,"WrappingKeySpec",params,undefined,false); 
			

			svc.getParametersForImport(params,cb);
		}
			service.GetPublicKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"GrantTokens",params,undefined,true); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"GrantTokens",params,undefined,true); 
			

			svc.getPublicKey(params,cb);
		}
			service.ImportKeyMaterial=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"ImportToken",params,undefined,false); 
			copyArgs(n,"EncryptedKeyMaterial",params,undefined,false); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"ImportToken",params,undefined,false); 
			copyArgs(n,"EncryptedKeyMaterial",params,undefined,false); 
			copyArgs(n,"ValidTo",params,undefined,false); 
			copyArgs(n,"ExpirationModel",params,undefined,false); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"ImportToken",params,undefined,false); 
			copyArgs(msg,"EncryptedKeyMaterial",params,undefined,false); 
			copyArgs(msg,"ValidTo",params,undefined,false); 
			copyArgs(msg,"ExpirationModel",params,undefined,false); 
			

			svc.importKeyMaterial(params,cb);
		}
			service.ListAliases=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.listAliases(params,cb);
		}
			service.ListGrants=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"GrantId",params,undefined,false); 
			copyArgs(n,"GranteePrincipal",params,undefined,false); 
			
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"GrantId",params,undefined,false); 
			copyArgs(msg,"GranteePrincipal",params,undefined,false); 
			

			svc.listGrants(params,cb);
		}
			service.ListKeyPolicies=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.listKeyPolicies(params,cb);
		}
			service.ListKeys=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.listKeys(params,cb);
		}
			service.ListResourceTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.listResourceTags(params,cb);
		}
			service.ListRetirableGrants=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RetiringPrincipal",params,undefined,false); 
			
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"RetiringPrincipal",params,undefined,false); 
			
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"RetiringPrincipal",params,undefined,false); 
			

			svc.listRetirableGrants(params,cb);
		}
			service.PutKeyPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			copyArgs(Boolean(n),"BypassPolicyLockoutSafetyCheck",params,undefined,false); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"PolicyName",params,undefined,false); 
			copyArgs(msg,"Policy",params,undefined,false); 
			copyArgs(msg,"BypassPolicyLockoutSafetyCheck",params,undefined,false); 
			

			svc.putKeyPolicy(params,cb);
		}
			service.ReEncrypt=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CiphertextBlob",params,undefined,false); 
			copyArgs(n,"DestinationKeyId",params,undefined,false); 
			
			copyArgs(n,"CiphertextBlob",params,undefined,false); 
			copyArgs(n,"SourceEncryptionContext",params,undefined,true); 
			copyArgs(n,"SourceKeyId",params,undefined,false); 
			copyArgs(n,"DestinationKeyId",params,undefined,false); 
			copyArgs(n,"DestinationEncryptionContext",params,undefined,true); 
			copyArgs(n,"SourceEncryptionAlgorithm",params,undefined,false); 
			copyArgs(n,"DestinationEncryptionAlgorithm",params,undefined,false); 
			copyArgs(n,"GrantTokens",params,undefined,true); 
			
			copyArgs(msg,"CiphertextBlob",params,undefined,false); 
			copyArgs(msg,"SourceEncryptionContext",params,undefined,true); 
			copyArgs(msg,"SourceKeyId",params,undefined,false); 
			copyArgs(msg,"DestinationKeyId",params,undefined,false); 
			copyArgs(msg,"DestinationEncryptionContext",params,undefined,true); 
			copyArgs(msg,"SourceEncryptionAlgorithm",params,undefined,false); 
			copyArgs(msg,"DestinationEncryptionAlgorithm",params,undefined,false); 
			copyArgs(msg,"GrantTokens",params,undefined,true); 
			

			svc.reEncrypt(params,cb);
		}
			service.ReplicateKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"ReplicaRegion",params,undefined,false); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"ReplicaRegion",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			copyArgs(Boolean(n),"BypassPolicyLockoutSafetyCheck",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"ReplicaRegion",params,undefined,false); 
			copyArgs(msg,"Policy",params,undefined,false); 
			copyArgs(msg,"BypassPolicyLockoutSafetyCheck",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.replicateKey(params,cb);
		}
			service.RetireGrant=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"GrantToken",params,undefined,false); 
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"GrantId",params,undefined,false); 
			
			copyArgs(msg,"GrantToken",params,undefined,false); 
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"GrantId",params,undefined,false); 
			

			svc.retireGrant(params,cb);
		}
			service.RevokeGrant=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"GrantId",params,undefined,false); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"GrantId",params,undefined,false); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"GrantId",params,undefined,false); 
			

			svc.revokeGrant(params,cb);
		}
			service.ScheduleKeyDeletion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(Number(n),"PendingWindowInDays",params,undefined,false); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"PendingWindowInDays",params,undefined,false); 
			

			svc.scheduleKeyDeletion(params,cb);
		}
			service.Sign=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"Message",params,undefined,true); 
			copyArgs(n,"SigningAlgorithm",params,undefined,false); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"Message",params,undefined,true); 
			copyArgs(n,"MessageType",params,undefined,false); 
			copyArgs(n,"GrantTokens",params,undefined,true); 
			copyArgs(n,"SigningAlgorithm",params,undefined,false); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"Message",params,undefined,true); 
			copyArgs(msg,"MessageType",params,undefined,false); 
			copyArgs(msg,"GrantTokens",params,undefined,true); 
			copyArgs(msg,"SigningAlgorithm",params,undefined,false); 
			

			svc.sign(params,cb);
		}
			service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
			service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
			service.UpdateAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AliasName",params,undefined,false); 
			copyArgs(n,"TargetKeyId",params,undefined,false); 
			
			copyArgs(n,"AliasName",params,undefined,false); 
			copyArgs(n,"TargetKeyId",params,undefined,false); 
			
			copyArgs(msg,"AliasName",params,undefined,false); 
			copyArgs(msg,"TargetKeyId",params,undefined,false); 
			

			svc.updateAlias(params,cb);
		}
			service.UpdateCustomKeyStore=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CustomKeyStoreId",params,undefined,false); 
			
			copyArgs(n,"CustomKeyStoreId",params,undefined,false); 
			copyArgs(n,"NewCustomKeyStoreName",params,undefined,false); 
			copyArgs(n,"KeyStorePassword",params,undefined,true); 
			copyArgs(n,"CloudHsmClusterId",params,undefined,false); 
			
			copyArgs(msg,"CustomKeyStoreId",params,undefined,false); 
			copyArgs(msg,"NewCustomKeyStoreName",params,undefined,false); 
			copyArgs(msg,"KeyStorePassword",params,undefined,true); 
			copyArgs(msg,"CloudHsmClusterId",params,undefined,false); 
			

			svc.updateCustomKeyStore(params,cb);
		}
			service.UpdateKeyDescription=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			

			svc.updateKeyDescription(params,cb);
		}
			service.UpdatePrimaryRegion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"PrimaryRegion",params,undefined,false); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"PrimaryRegion",params,undefined,false); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"PrimaryRegion",params,undefined,false); 
			

			svc.updatePrimaryRegion(params,cb);
		}
			service.Verify=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"Message",params,undefined,true); 
			copyArgs(n,"Signature",params,undefined,false); 
			copyArgs(n,"SigningAlgorithm",params,undefined,false); 
			
			copyArgs(n,"KeyId",params,undefined,false); 
			copyArgs(n,"Message",params,undefined,true); 
			copyArgs(n,"MessageType",params,undefined,false); 
			copyArgs(n,"Signature",params,undefined,false); 
			copyArgs(n,"SigningAlgorithm",params,undefined,false); 
			copyArgs(n,"GrantTokens",params,undefined,true); 
			
			copyArgs(msg,"KeyId",params,undefined,false); 
			copyArgs(msg,"Message",params,undefined,true); 
			copyArgs(msg,"MessageType",params,undefined,false); 
			copyArgs(msg,"Signature",params,undefined,false); 
			copyArgs(msg,"SigningAlgorithm",params,undefined,false); 
			copyArgs(msg,"GrantTokens",params,undefined,true); 
			

			svc.verify(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS KMS", AmazonAPINode);

};
