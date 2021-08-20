
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

		var awsService = new AWS.SecretsManager( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.SecretsManager(msg.AWSConfig) : awsService;

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

		
		service.CancelRotateSecret=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SecretId",params,undefined,false); 
			
			copyArg(msg,"SecretId",params,undefined,false); 
			

			svc.cancelRotateSecret(params,cb);
		}

		
		service.CreateSecret=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"SecretBinary",params,undefined,true); 
			copyArg(msg,"SecretString",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"AddReplicaRegions",params,undefined,true); 
			copyArg(msg,"ForceOverwriteReplicaSecret",params,undefined,false); 
			

			svc.createSecret(params,cb);
		}

		
		service.DeleteResourcePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SecretId",params,undefined,false); 
			
			copyArg(msg,"SecretId",params,undefined,false); 
			

			svc.deleteResourcePolicy(params,cb);
		}

		
		service.DeleteSecret=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SecretId",params,undefined,false); 
			
			copyArg(msg,"SecretId",params,undefined,false); 
			copyArg(msg,"RecoveryWindowInDays",params,undefined,false); 
			copyArg(msg,"ForceDeleteWithoutRecovery",params,undefined,false); 
			

			svc.deleteSecret(params,cb);
		}

		
		service.DescribeSecret=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SecretId",params,undefined,false); 
			
			copyArg(msg,"SecretId",params,undefined,false); 
			

			svc.describeSecret(params,cb);
		}

		
		service.GetRandomPassword=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"PasswordLength",params,undefined,false); 
			copyArg(msg,"ExcludeCharacters",params,undefined,false); 
			copyArg(msg,"ExcludeNumbers",params,undefined,false); 
			copyArg(msg,"ExcludePunctuation",params,undefined,false); 
			copyArg(msg,"ExcludeUppercase",params,undefined,false); 
			copyArg(msg,"ExcludeLowercase",params,undefined,false); 
			copyArg(msg,"IncludeSpace",params,undefined,false); 
			copyArg(msg,"RequireEachIncludedType",params,undefined,false); 
			

			svc.getRandomPassword(params,cb);
		}

		
		service.GetResourcePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SecretId",params,undefined,false); 
			
			copyArg(msg,"SecretId",params,undefined,false); 
			

			svc.getResourcePolicy(params,cb);
		}

		
		service.GetSecretValue=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SecretId",params,undefined,false); 
			
			copyArg(msg,"SecretId",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			copyArg(msg,"VersionStage",params,undefined,false); 
			

			svc.getSecretValue(params,cb);
		}

		
		service.ListSecretVersionIds=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SecretId",params,undefined,false); 
			
			copyArg(msg,"SecretId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"IncludeDeprecated",params,undefined,false); 
			

			svc.listSecretVersionIds(params,cb);
		}

		
		service.ListSecrets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			

			svc.listSecrets(params,cb);
		}

		
		service.PutResourcePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SecretId",params,undefined,false); 
			copyArg(n,"ResourcePolicy",params,undefined,false); 
			
			copyArg(msg,"SecretId",params,undefined,false); 
			copyArg(msg,"ResourcePolicy",params,undefined,false); 
			copyArg(msg,"BlockPublicPolicy",params,undefined,false); 
			

			svc.putResourcePolicy(params,cb);
		}

		
		service.PutSecretValue=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SecretId",params,undefined,false); 
			
			copyArg(msg,"SecretId",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"SecretBinary",params,undefined,true); 
			copyArg(msg,"SecretString",params,undefined,true); 
			copyArg(msg,"VersionStages",params,undefined,true); 
			

			svc.putSecretValue(params,cb);
		}

		
		service.RemoveRegionsFromReplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SecretId",params,undefined,false); 
			copyArg(n,"RemoveReplicaRegions",params,undefined,false); 
			
			copyArg(msg,"SecretId",params,undefined,false); 
			copyArg(msg,"RemoveReplicaRegions",params,undefined,false); 
			

			svc.removeRegionsFromReplication(params,cb);
		}

		
		service.ReplicateSecretToRegions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SecretId",params,undefined,false); 
			copyArg(n,"AddReplicaRegions",params,undefined,true); 
			
			copyArg(msg,"SecretId",params,undefined,false); 
			copyArg(msg,"AddReplicaRegions",params,undefined,true); 
			copyArg(msg,"ForceOverwriteReplicaSecret",params,undefined,false); 
			

			svc.replicateSecretToRegions(params,cb);
		}

		
		service.RestoreSecret=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SecretId",params,undefined,false); 
			
			copyArg(msg,"SecretId",params,undefined,false); 
			

			svc.restoreSecret(params,cb);
		}

		
		service.RotateSecret=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SecretId",params,undefined,false); 
			
			copyArg(msg,"SecretId",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"RotationLambdaARN",params,undefined,false); 
			copyArg(msg,"RotationRules",params,undefined,true); 
			

			svc.rotateSecret(params,cb);
		}

		
		service.StopReplicationToReplica=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SecretId",params,undefined,false); 
			
			copyArg(msg,"SecretId",params,undefined,false); 
			

			svc.stopReplicationToReplica(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SecretId",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"SecretId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SecretId",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"SecretId",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateSecret=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SecretId",params,undefined,false); 
			
			copyArg(msg,"SecretId",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"SecretBinary",params,undefined,true); 
			copyArg(msg,"SecretString",params,undefined,true); 
			

			svc.updateSecret(params,cb);
		}

		
		service.UpdateSecretVersionStage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SecretId",params,undefined,false); 
			copyArg(n,"VersionStage",params,undefined,false); 
			
			copyArg(msg,"SecretId",params,undefined,false); 
			copyArg(msg,"VersionStage",params,undefined,false); 
			copyArg(msg,"RemoveFromVersionId",params,undefined,false); 
			copyArg(msg,"MoveToVersionId",params,undefined,false); 
			

			svc.updateSecretVersionStage(params,cb);
		}

		
		service.ValidateResourcePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourcePolicy",params,undefined,false); 
			
			copyArg(msg,"SecretId",params,undefined,false); 
			copyArg(msg,"ResourcePolicy",params,undefined,false); 
			

			svc.validateResourcePolicy(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS SecretsManager", AmazonAPINode);

};
