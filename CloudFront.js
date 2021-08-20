
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

		var awsService = new AWS.CloudFront( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.CloudFront(msg.AWSConfig) : awsService;

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

		
		service.AssociateAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TargetDistributionId",params,undefined,false); 
			copyArg(n,"Alias",params,undefined,false); 
			
			copyArg(msg,"TargetDistributionId",params,undefined,false); 
			copyArg(msg,"Alias",params,undefined,false); 
			

			svc.associateAlias(params,cb);
		}

		
		service.CreateCachePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CachePolicyConfig",params,undefined,true); 
			
			copyArg(msg,"CachePolicyConfig",params,undefined,true); 
			

			svc.createCachePolicy(params,cb);
		}

		
		service.CreateCloudFrontOriginAccessIdentity=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CloudFrontOriginAccessIdentityConfig",params,undefined,true); 
			
			copyArg(msg,"CloudFrontOriginAccessIdentityConfig",params,undefined,true); 
			

			svc.createCloudFrontOriginAccessIdentity(params,cb);
		}

		
		service.CreateDistribution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DistributionConfig",params,undefined,true); 
			
			copyArg(msg,"DistributionConfig",params,undefined,true); 
			

			svc.createDistribution(params,cb);
		}

		
		service.CreateDistributionWithTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DistributionConfigWithTags",params,undefined,false); 
			
			copyArg(msg,"DistributionConfigWithTags",params,undefined,false); 
			

			svc.createDistributionWithTags(params,cb);
		}

		
		service.CreateFieldLevelEncryptionConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FieldLevelEncryptionConfig",params,undefined,true); 
			
			copyArg(msg,"FieldLevelEncryptionConfig",params,undefined,true); 
			

			svc.createFieldLevelEncryptionConfig(params,cb);
		}

		
		service.CreateFieldLevelEncryptionProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FieldLevelEncryptionProfileConfig",params,undefined,true); 
			
			copyArg(msg,"FieldLevelEncryptionProfileConfig",params,undefined,true); 
			

			svc.createFieldLevelEncryptionProfile(params,cb);
		}

		
		service.CreateFunction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"FunctionConfig",params,undefined,true); 
			copyArg(n,"FunctionCode",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"FunctionConfig",params,undefined,true); 
			copyArg(msg,"FunctionCode",params,undefined,true); 
			

			svc.createFunction(params,cb);
		}

		
		service.CreateInvalidation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DistributionId",params,undefined,false); 
			copyArg(n,"InvalidationBatch",params,undefined,true); 
			
			copyArg(msg,"DistributionId",params,undefined,false); 
			copyArg(msg,"InvalidationBatch",params,undefined,true); 
			

			svc.createInvalidation(params,cb);
		}

		
		service.CreateKeyGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyGroupConfig",params,undefined,true); 
			
			copyArg(msg,"KeyGroupConfig",params,undefined,true); 
			

			svc.createKeyGroup(params,cb);
		}

		
		service.CreateMonitoringSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MonitoringSubscription",params,undefined,true); 
			copyArg(n,"DistributionId",params,undefined,false); 
			
			copyArg(msg,"DistributionId",params,undefined,false); 
			copyArg(msg,"MonitoringSubscription",params,undefined,true); 
			

			svc.createMonitoringSubscription(params,cb);
		}

		
		service.CreateOriginRequestPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OriginRequestPolicyConfig",params,undefined,true); 
			
			copyArg(msg,"OriginRequestPolicyConfig",params,undefined,true); 
			

			svc.createOriginRequestPolicy(params,cb);
		}

		
		service.CreatePublicKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PublicKeyConfig",params,undefined,true); 
			
			copyArg(msg,"PublicKeyConfig",params,undefined,true); 
			

			svc.createPublicKey(params,cb);
		}

		
		service.CreateRealtimeLogConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndPoints",params,undefined,true); 
			copyArg(n,"Fields",params,undefined,true); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"SamplingRate",params,undefined,false); 
			
			copyArg(msg,"EndPoints",params,undefined,true); 
			copyArg(msg,"Fields",params,undefined,true); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"SamplingRate",params,undefined,false); 
			

			svc.createRealtimeLogConfig(params,cb);
		}

		
		service.CreateStreamingDistribution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamingDistributionConfig",params,undefined,true); 
			
			copyArg(msg,"StreamingDistributionConfig",params,undefined,true); 
			

			svc.createStreamingDistribution(params,cb);
		}

		
		service.CreateStreamingDistributionWithTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamingDistributionConfigWithTags",params,undefined,false); 
			
			copyArg(msg,"StreamingDistributionConfigWithTags",params,undefined,false); 
			

			svc.createStreamingDistributionWithTags(params,cb);
		}

		
		service.DeleteCachePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IfMatch",params,undefined,false); 
			

			svc.deleteCachePolicy(params,cb);
		}

		
		service.DeleteCloudFrontOriginAccessIdentity=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IfMatch",params,undefined,false); 
			

			svc.deleteCloudFrontOriginAccessIdentity(params,cb);
		}

		
		service.DeleteDistribution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IfMatch",params,undefined,false); 
			

			svc.deleteDistribution(params,cb);
		}

		
		service.DeleteFieldLevelEncryptionConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IfMatch",params,undefined,false); 
			

			svc.deleteFieldLevelEncryptionConfig(params,cb);
		}

		
		service.DeleteFieldLevelEncryptionProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IfMatch",params,undefined,false); 
			

			svc.deleteFieldLevelEncryptionProfile(params,cb);
		}

		
		service.DeleteFunction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IfMatch",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"IfMatch",params,undefined,false); 
			

			svc.deleteFunction(params,cb);
		}

		
		service.DeleteKeyGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IfMatch",params,undefined,false); 
			

			svc.deleteKeyGroup(params,cb);
		}

		
		service.DeleteMonitoringSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DistributionId",params,undefined,false); 
			
			copyArg(msg,"DistributionId",params,undefined,false); 
			

			svc.deleteMonitoringSubscription(params,cb);
		}

		
		service.DeleteOriginRequestPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IfMatch",params,undefined,false); 
			

			svc.deleteOriginRequestPolicy(params,cb);
		}

		
		service.DeletePublicKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IfMatch",params,undefined,false); 
			

			svc.deletePublicKey(params,cb);
		}

		
		service.DeleteRealtimeLogConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ARN",params,undefined,false); 
			

			svc.deleteRealtimeLogConfig(params,cb);
		}

		
		service.DeleteStreamingDistribution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IfMatch",params,undefined,false); 
			

			svc.deleteStreamingDistribution(params,cb);
		}

		
		service.DescribeFunction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Stage",params,undefined,false); 
			

			svc.describeFunction(params,cb);
		}

		
		service.GetCachePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getCachePolicy(params,cb);
		}

		
		service.GetCachePolicyConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getCachePolicyConfig(params,cb);
		}

		
		service.GetCloudFrontOriginAccessIdentity=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getCloudFrontOriginAccessIdentity(params,cb);
		}

		
		service.GetCloudFrontOriginAccessIdentityConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getCloudFrontOriginAccessIdentityConfig(params,cb);
		}

		
		service.GetDistribution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getDistribution(params,cb);
		}

		
		service.GetDistributionConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getDistributionConfig(params,cb);
		}

		
		service.GetFieldLevelEncryption=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getFieldLevelEncryption(params,cb);
		}

		
		service.GetFieldLevelEncryptionConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getFieldLevelEncryptionConfig(params,cb);
		}

		
		service.GetFieldLevelEncryptionProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getFieldLevelEncryptionProfile(params,cb);
		}

		
		service.GetFieldLevelEncryptionProfileConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getFieldLevelEncryptionProfileConfig(params,cb);
		}

		
		service.GetFunction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Stage",params,undefined,false); 
			

			svc.getFunction(params,cb);
		}

		
		service.GetInvalidation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DistributionId",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"DistributionId",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getInvalidation(params,cb);
		}

		
		service.GetKeyGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getKeyGroup(params,cb);
		}

		
		service.GetKeyGroupConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getKeyGroupConfig(params,cb);
		}

		
		service.GetMonitoringSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DistributionId",params,undefined,false); 
			
			copyArg(msg,"DistributionId",params,undefined,false); 
			

			svc.getMonitoringSubscription(params,cb);
		}

		
		service.GetOriginRequestPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getOriginRequestPolicy(params,cb);
		}

		
		service.GetOriginRequestPolicyConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getOriginRequestPolicyConfig(params,cb);
		}

		
		service.GetPublicKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getPublicKey(params,cb);
		}

		
		service.GetPublicKeyConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getPublicKeyConfig(params,cb);
		}

		
		service.GetRealtimeLogConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ARN",params,undefined,false); 
			

			svc.getRealtimeLogConfig(params,cb);
		}

		
		service.GetStreamingDistribution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getStreamingDistribution(params,cb);
		}

		
		service.GetStreamingDistributionConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getStreamingDistributionConfig(params,cb);
		}

		
		service.ListCachePolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listCachePolicies(params,cb);
		}

		
		service.ListCloudFrontOriginAccessIdentities=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listCloudFrontOriginAccessIdentities(params,cb);
		}

		
		service.ListConflictingAliases=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DistributionId",params,undefined,false); 
			copyArg(n,"Alias",params,undefined,false); 
			
			copyArg(msg,"DistributionId",params,undefined,false); 
			copyArg(msg,"Alias",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listConflictingAliases(params,cb);
		}

		
		service.ListDistributions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listDistributions(params,cb);
		}

		
		service.ListDistributionsByCachePolicyId=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CachePolicyId",params,undefined,false); 
			
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			copyArg(msg,"CachePolicyId",params,undefined,false); 
			

			svc.listDistributionsByCachePolicyId(params,cb);
		}

		
		service.ListDistributionsByKeyGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyGroupId",params,undefined,false); 
			
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			copyArg(msg,"KeyGroupId",params,undefined,false); 
			

			svc.listDistributionsByKeyGroup(params,cb);
		}

		
		service.ListDistributionsByOriginRequestPolicyId=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OriginRequestPolicyId",params,undefined,false); 
			
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			copyArg(msg,"OriginRequestPolicyId",params,undefined,false); 
			

			svc.listDistributionsByOriginRequestPolicyId(params,cb);
		}

		
		service.ListDistributionsByRealtimeLogConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			copyArg(msg,"RealtimeLogConfigName",params,undefined,false); 
			copyArg(msg,"RealtimeLogConfigArn",params,undefined,false); 
			

			svc.listDistributionsByRealtimeLogConfig(params,cb);
		}

		
		service.ListDistributionsByWebACLId=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WebACLId",params,undefined,false); 
			
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			copyArg(msg,"WebACLId",params,undefined,false); 
			

			svc.listDistributionsByWebACLId(params,cb);
		}

		
		service.ListFieldLevelEncryptionConfigs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listFieldLevelEncryptionConfigs(params,cb);
		}

		
		service.ListFieldLevelEncryptionProfiles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listFieldLevelEncryptionProfiles(params,cb);
		}

		
		service.ListFunctions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			copyArg(msg,"Stage",params,undefined,false); 
			

			svc.listFunctions(params,cb);
		}

		
		service.ListInvalidations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DistributionId",params,undefined,false); 
			
			copyArg(msg,"DistributionId",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listInvalidations(params,cb);
		}

		
		service.ListKeyGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listKeyGroups(params,cb);
		}

		
		service.ListOriginRequestPolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listOriginRequestPolicies(params,cb);
		}

		
		service.ListPublicKeys=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listPublicKeys(params,cb);
		}

		
		service.ListRealtimeLogConfigs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxItems",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.listRealtimeLogConfigs(params,cb);
		}

		
		service.ListStreamingDistributions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listStreamingDistributions(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Resource",params,undefined,false); 
			
			copyArg(msg,"Resource",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PublishFunction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"IfMatch",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"IfMatch",params,undefined,false); 
			

			svc.publishFunction(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Resource",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"Resource",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.TestFunction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"IfMatch",params,undefined,false); 
			copyArg(n,"EventObject",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"IfMatch",params,undefined,false); 
			copyArg(msg,"Stage",params,undefined,false); 
			copyArg(msg,"EventObject",params,undefined,false); 
			

			svc.testFunction(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Resource",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"Resource",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateCachePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CachePolicyConfig",params,undefined,true); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"CachePolicyConfig",params,undefined,true); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IfMatch",params,undefined,false); 
			

			svc.updateCachePolicy(params,cb);
		}

		
		service.UpdateCloudFrontOriginAccessIdentity=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CloudFrontOriginAccessIdentityConfig",params,undefined,true); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"CloudFrontOriginAccessIdentityConfig",params,undefined,true); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IfMatch",params,undefined,false); 
			

			svc.updateCloudFrontOriginAccessIdentity(params,cb);
		}

		
		service.UpdateDistribution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DistributionConfig",params,undefined,true); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"DistributionConfig",params,undefined,true); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IfMatch",params,undefined,false); 
			

			svc.updateDistribution(params,cb);
		}

		
		service.UpdateFieldLevelEncryptionConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FieldLevelEncryptionConfig",params,undefined,true); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"FieldLevelEncryptionConfig",params,undefined,true); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IfMatch",params,undefined,false); 
			

			svc.updateFieldLevelEncryptionConfig(params,cb);
		}

		
		service.UpdateFieldLevelEncryptionProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FieldLevelEncryptionProfileConfig",params,undefined,true); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"FieldLevelEncryptionProfileConfig",params,undefined,true); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IfMatch",params,undefined,false); 
			

			svc.updateFieldLevelEncryptionProfile(params,cb);
		}

		
		service.UpdateFunction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IfMatch",params,undefined,false); 
			copyArg(n,"FunctionConfig",params,undefined,true); 
			copyArg(n,"FunctionCode",params,undefined,true); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"IfMatch",params,undefined,false); 
			copyArg(msg,"FunctionConfig",params,undefined,true); 
			copyArg(msg,"FunctionCode",params,undefined,true); 
			

			svc.updateFunction(params,cb);
		}

		
		service.UpdateKeyGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyGroupConfig",params,undefined,true); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"KeyGroupConfig",params,undefined,true); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IfMatch",params,undefined,false); 
			

			svc.updateKeyGroup(params,cb);
		}

		
		service.UpdateOriginRequestPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OriginRequestPolicyConfig",params,undefined,true); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"OriginRequestPolicyConfig",params,undefined,true); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IfMatch",params,undefined,false); 
			

			svc.updateOriginRequestPolicy(params,cb);
		}

		
		service.UpdatePublicKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PublicKeyConfig",params,undefined,true); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"PublicKeyConfig",params,undefined,true); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IfMatch",params,undefined,false); 
			

			svc.updatePublicKey(params,cb);
		}

		
		service.UpdateRealtimeLogConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"EndPoints",params,undefined,true); 
			copyArg(msg,"Fields",params,undefined,true); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ARN",params,undefined,false); 
			copyArg(msg,"SamplingRate",params,undefined,false); 
			

			svc.updateRealtimeLogConfig(params,cb);
		}

		
		service.UpdateStreamingDistribution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamingDistributionConfig",params,undefined,true); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"StreamingDistributionConfig",params,undefined,true); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IfMatch",params,undefined,false); 
			

			svc.updateStreamingDistribution(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS CloudFront", AmazonAPINode);

};
