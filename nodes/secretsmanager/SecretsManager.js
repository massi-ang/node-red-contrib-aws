
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

		var awsService = new AWS.SecretsManager( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.SecretsManager(msg.AWSConfig) : awsService;

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
		
			service.CancelRotateSecret=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SecretId",params,undefined,false); 
			
			copyArgs(n,"SecretId",params,undefined,false); 
			
			copyArgs(msg,"SecretId",params,undefined,false); 
			

			svc.cancelRotateSecret(params,cb);
		}
			service.CreateSecret=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"SecretBinary",params,undefined,true); 
			copyArgs(n,"SecretString",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"AddReplicaRegions",params,undefined,true); 
			copyArgs(Boolean(n),"ForceOverwriteReplicaSecret",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"SecretBinary",params,undefined,true); 
			copyArgs(msg,"SecretString",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"AddReplicaRegions",params,undefined,true); 
			copyArgs(msg,"ForceOverwriteReplicaSecret",params,undefined,false); 
			

			svc.createSecret(params,cb);
		}
			service.DeleteResourcePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SecretId",params,undefined,false); 
			
			copyArgs(n,"SecretId",params,undefined,false); 
			
			copyArgs(msg,"SecretId",params,undefined,false); 
			

			svc.deleteResourcePolicy(params,cb);
		}
			service.DeleteSecret=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SecretId",params,undefined,false); 
			
			copyArgs(n,"SecretId",params,undefined,false); 
			copyArgs(n,"RecoveryWindowInDays",params,undefined,false); 
			copyArgs(Boolean(n),"ForceDeleteWithoutRecovery",params,undefined,false); 
			
			copyArgs(msg,"SecretId",params,undefined,false); 
			copyArgs(msg,"RecoveryWindowInDays",params,undefined,false); 
			copyArgs(msg,"ForceDeleteWithoutRecovery",params,undefined,false); 
			

			svc.deleteSecret(params,cb);
		}
			service.DescribeSecret=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SecretId",params,undefined,false); 
			
			copyArgs(n,"SecretId",params,undefined,false); 
			
			copyArgs(msg,"SecretId",params,undefined,false); 
			

			svc.describeSecret(params,cb);
		}
			service.GetRandomPassword=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"PasswordLength",params,undefined,false); 
			copyArgs(n,"ExcludeCharacters",params,undefined,false); 
			copyArgs(Boolean(n),"ExcludeNumbers",params,undefined,false); 
			copyArgs(Boolean(n),"ExcludePunctuation",params,undefined,false); 
			copyArgs(Boolean(n),"ExcludeUppercase",params,undefined,false); 
			copyArgs(Boolean(n),"ExcludeLowercase",params,undefined,false); 
			copyArgs(Boolean(n),"IncludeSpace",params,undefined,false); 
			copyArgs(Boolean(n),"RequireEachIncludedType",params,undefined,false); 
			
			copyArgs(msg,"PasswordLength",params,undefined,false); 
			copyArgs(msg,"ExcludeCharacters",params,undefined,false); 
			copyArgs(msg,"ExcludeNumbers",params,undefined,false); 
			copyArgs(msg,"ExcludePunctuation",params,undefined,false); 
			copyArgs(msg,"ExcludeUppercase",params,undefined,false); 
			copyArgs(msg,"ExcludeLowercase",params,undefined,false); 
			copyArgs(msg,"IncludeSpace",params,undefined,false); 
			copyArgs(msg,"RequireEachIncludedType",params,undefined,false); 
			

			svc.getRandomPassword(params,cb);
		}
			service.GetResourcePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SecretId",params,undefined,false); 
			
			copyArgs(n,"SecretId",params,undefined,false); 
			
			copyArgs(msg,"SecretId",params,undefined,false); 
			

			svc.getResourcePolicy(params,cb);
		}
			service.GetSecretValue=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SecretId",params,undefined,false); 
			
			copyArgs(n,"SecretId",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			copyArgs(n,"VersionStage",params,undefined,false); 
			
			copyArgs(msg,"SecretId",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			copyArgs(msg,"VersionStage",params,undefined,false); 
			

			svc.getSecretValue(params,cb);
		}
			service.ListSecretVersionIds=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SecretId",params,undefined,false); 
			
			copyArgs(n,"SecretId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"IncludeDeprecated",params,undefined,false); 
			
			copyArgs(msg,"SecretId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"IncludeDeprecated",params,undefined,false); 
			

			svc.listSecretVersionIds(params,cb);
		}
			service.ListSecrets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			

			svc.listSecrets(params,cb);
		}
			service.PutResourcePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SecretId",params,undefined,false); 
			copyArgs(n,"ResourcePolicy",params,undefined,false); 
			
			copyArgs(n,"SecretId",params,undefined,false); 
			copyArgs(n,"ResourcePolicy",params,undefined,false); 
			copyArgs(Boolean(n),"BlockPublicPolicy",params,undefined,false); 
			
			copyArgs(msg,"SecretId",params,undefined,false); 
			copyArgs(msg,"ResourcePolicy",params,undefined,false); 
			copyArgs(msg,"BlockPublicPolicy",params,undefined,false); 
			

			svc.putResourcePolicy(params,cb);
		}
			service.PutSecretValue=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SecretId",params,undefined,false); 
			
			copyArgs(n,"SecretId",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"SecretBinary",params,undefined,true); 
			copyArgs(n,"SecretString",params,undefined,true); 
			copyArgs(n,"VersionStages",params,undefined,true); 
			
			copyArgs(msg,"SecretId",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"SecretBinary",params,undefined,true); 
			copyArgs(msg,"SecretString",params,undefined,true); 
			copyArgs(msg,"VersionStages",params,undefined,true); 
			

			svc.putSecretValue(params,cb);
		}
			service.RemoveRegionsFromReplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SecretId",params,undefined,false); 
			copyArgs(n,"RemoveReplicaRegions",params,undefined,false); 
			
			copyArgs(n,"SecretId",params,undefined,false); 
			copyArgs(n,"RemoveReplicaRegions",params,undefined,false); 
			
			copyArgs(msg,"SecretId",params,undefined,false); 
			copyArgs(msg,"RemoveReplicaRegions",params,undefined,false); 
			

			svc.removeRegionsFromReplication(params,cb);
		}
			service.ReplicateSecretToRegions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SecretId",params,undefined,false); 
			copyArgs(n,"AddReplicaRegions",params,undefined,true); 
			
			copyArgs(n,"SecretId",params,undefined,false); 
			copyArgs(n,"AddReplicaRegions",params,undefined,true); 
			copyArgs(Boolean(n),"ForceOverwriteReplicaSecret",params,undefined,false); 
			
			copyArgs(msg,"SecretId",params,undefined,false); 
			copyArgs(msg,"AddReplicaRegions",params,undefined,true); 
			copyArgs(msg,"ForceOverwriteReplicaSecret",params,undefined,false); 
			

			svc.replicateSecretToRegions(params,cb);
		}
			service.RestoreSecret=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SecretId",params,undefined,false); 
			
			copyArgs(n,"SecretId",params,undefined,false); 
			
			copyArgs(msg,"SecretId",params,undefined,false); 
			

			svc.restoreSecret(params,cb);
		}
			service.RotateSecret=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SecretId",params,undefined,false); 
			
			copyArgs(n,"SecretId",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"RotationLambdaARN",params,undefined,false); 
			copyArgs(n,"RotationRules",params,undefined,true); 
			
			copyArgs(msg,"SecretId",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"RotationLambdaARN",params,undefined,false); 
			copyArgs(msg,"RotationRules",params,undefined,true); 
			

			svc.rotateSecret(params,cb);
		}
			service.StopReplicationToReplica=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SecretId",params,undefined,false); 
			
			copyArgs(n,"SecretId",params,undefined,false); 
			
			copyArgs(msg,"SecretId",params,undefined,false); 
			

			svc.stopReplicationToReplica(params,cb);
		}
			service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SecretId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"SecretId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"SecretId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
			service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SecretId",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"SecretId",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"SecretId",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
			service.UpdateSecret=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SecretId",params,undefined,false); 
			
			copyArgs(n,"SecretId",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"SecretBinary",params,undefined,true); 
			copyArgs(n,"SecretString",params,undefined,true); 
			
			copyArgs(msg,"SecretId",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"SecretBinary",params,undefined,true); 
			copyArgs(msg,"SecretString",params,undefined,true); 
			

			svc.updateSecret(params,cb);
		}
			service.UpdateSecretVersionStage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SecretId",params,undefined,false); 
			copyArgs(n,"VersionStage",params,undefined,false); 
			
			copyArgs(n,"SecretId",params,undefined,false); 
			copyArgs(n,"VersionStage",params,undefined,false); 
			copyArgs(n,"RemoveFromVersionId",params,undefined,false); 
			copyArgs(n,"MoveToVersionId",params,undefined,false); 
			
			copyArgs(msg,"SecretId",params,undefined,false); 
			copyArgs(msg,"VersionStage",params,undefined,false); 
			copyArgs(msg,"RemoveFromVersionId",params,undefined,false); 
			copyArgs(msg,"MoveToVersionId",params,undefined,false); 
			

			svc.updateSecretVersionStage(params,cb);
		}
			service.ValidateResourcePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourcePolicy",params,undefined,false); 
			
			copyArgs(n,"SecretId",params,undefined,false); 
			copyArgs(n,"ResourcePolicy",params,undefined,false); 
			
			copyArgs(msg,"SecretId",params,undefined,false); 
			copyArgs(msg,"ResourcePolicy",params,undefined,false); 
			

			svc.validateResourcePolicy(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS SecretsManager", AmazonAPINode);

};
