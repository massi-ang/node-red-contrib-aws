
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

		var awsService = new AWS.CloudFront( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.CloudFront(msg.AWSConfig) : awsService;

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
		
			service.AssociateAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TargetDistributionId",params,undefined,false); 
			copyArgs(n,"Alias",params,undefined,false); 
			
			copyArgs(n,"TargetDistributionId",params,undefined,false); 
			copyArgs(n,"Alias",params,undefined,false); 
			
			copyArgs(msg,"TargetDistributionId",params,undefined,false); 
			copyArgs(msg,"Alias",params,undefined,false); 
			

			svc.associateAlias(params,cb);
		}
			service.CreateCachePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CachePolicyConfig",params,undefined,true); 
			
			copyArgs(n,"CachePolicyConfig",params,undefined,true); 
			
			copyArgs(msg,"CachePolicyConfig",params,undefined,true); 
			

			svc.createCachePolicy(params,cb);
		}
			service.CreateCloudFrontOriginAccessIdentity=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CloudFrontOriginAccessIdentityConfig",params,undefined,true); 
			
			copyArgs(n,"CloudFrontOriginAccessIdentityConfig",params,undefined,true); 
			
			copyArgs(msg,"CloudFrontOriginAccessIdentityConfig",params,undefined,true); 
			

			svc.createCloudFrontOriginAccessIdentity(params,cb);
		}
			service.CreateDistribution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DistributionConfig",params,undefined,true); 
			
			copyArgs(n,"DistributionConfig",params,undefined,true); 
			
			copyArgs(msg,"DistributionConfig",params,undefined,true); 
			

			svc.createDistribution(params,cb);
		}
			service.CreateDistributionWithTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DistributionConfigWithTags",params,undefined,false); 
			
			copyArgs(n,"DistributionConfigWithTags",params,undefined,false); 
			
			copyArgs(msg,"DistributionConfigWithTags",params,undefined,false); 
			

			svc.createDistributionWithTags(params,cb);
		}
			service.CreateFieldLevelEncryptionConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FieldLevelEncryptionConfig",params,undefined,true); 
			
			copyArgs(n,"FieldLevelEncryptionConfig",params,undefined,true); 
			
			copyArgs(msg,"FieldLevelEncryptionConfig",params,undefined,true); 
			

			svc.createFieldLevelEncryptionConfig(params,cb);
		}
			service.CreateFieldLevelEncryptionProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FieldLevelEncryptionProfileConfig",params,undefined,true); 
			
			copyArgs(n,"FieldLevelEncryptionProfileConfig",params,undefined,true); 
			
			copyArgs(msg,"FieldLevelEncryptionProfileConfig",params,undefined,true); 
			

			svc.createFieldLevelEncryptionProfile(params,cb);
		}
			service.CreateFunction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"FunctionConfig",params,undefined,true); 
			copyArgs(n,"FunctionCode",params,undefined,true); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"FunctionConfig",params,undefined,true); 
			copyArgs(n,"FunctionCode",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"FunctionConfig",params,undefined,true); 
			copyArgs(msg,"FunctionCode",params,undefined,true); 
			

			svc.createFunction(params,cb);
		}
			service.CreateInvalidation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DistributionId",params,undefined,false); 
			copyArgs(n,"InvalidationBatch",params,undefined,true); 
			
			copyArgs(n,"DistributionId",params,undefined,false); 
			copyArgs(n,"InvalidationBatch",params,undefined,true); 
			
			copyArgs(msg,"DistributionId",params,undefined,false); 
			copyArgs(msg,"InvalidationBatch",params,undefined,true); 
			

			svc.createInvalidation(params,cb);
		}
			service.CreateKeyGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyGroupConfig",params,undefined,true); 
			
			copyArgs(n,"KeyGroupConfig",params,undefined,true); 
			
			copyArgs(msg,"KeyGroupConfig",params,undefined,true); 
			

			svc.createKeyGroup(params,cb);
		}
			service.CreateMonitoringSubscription=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MonitoringSubscription",params,undefined,true); 
			copyArgs(n,"DistributionId",params,undefined,false); 
			
			copyArgs(n,"DistributionId",params,undefined,false); 
			copyArgs(n,"MonitoringSubscription",params,undefined,true); 
			
			copyArgs(msg,"DistributionId",params,undefined,false); 
			copyArgs(msg,"MonitoringSubscription",params,undefined,true); 
			

			svc.createMonitoringSubscription(params,cb);
		}
			service.CreateOriginRequestPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OriginRequestPolicyConfig",params,undefined,true); 
			
			copyArgs(n,"OriginRequestPolicyConfig",params,undefined,true); 
			
			copyArgs(msg,"OriginRequestPolicyConfig",params,undefined,true); 
			

			svc.createOriginRequestPolicy(params,cb);
		}
			service.CreatePublicKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PublicKeyConfig",params,undefined,true); 
			
			copyArgs(n,"PublicKeyConfig",params,undefined,true); 
			
			copyArgs(msg,"PublicKeyConfig",params,undefined,true); 
			

			svc.createPublicKey(params,cb);
		}
			service.CreateRealtimeLogConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndPoints",params,undefined,true); 
			copyArgs(n,"Fields",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"SamplingRate",params,undefined,false); 
			
			copyArgs(n,"EndPoints",params,undefined,true); 
			copyArgs(n,"Fields",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"SamplingRate",params,undefined,false); 
			
			copyArgs(msg,"EndPoints",params,undefined,true); 
			copyArgs(msg,"Fields",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"SamplingRate",params,undefined,false); 
			

			svc.createRealtimeLogConfig(params,cb);
		}
			service.CreateStreamingDistribution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StreamingDistributionConfig",params,undefined,true); 
			
			copyArgs(n,"StreamingDistributionConfig",params,undefined,true); 
			
			copyArgs(msg,"StreamingDistributionConfig",params,undefined,true); 
			

			svc.createStreamingDistribution(params,cb);
		}
			service.CreateStreamingDistributionWithTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StreamingDistributionConfigWithTags",params,undefined,false); 
			
			copyArgs(n,"StreamingDistributionConfigWithTags",params,undefined,false); 
			
			copyArgs(msg,"StreamingDistributionConfigWithTags",params,undefined,false); 
			

			svc.createStreamingDistributionWithTags(params,cb);
		}
			service.DeleteCachePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IfMatch",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IfMatch",params,undefined,false); 
			

			svc.deleteCachePolicy(params,cb);
		}
			service.DeleteCloudFrontOriginAccessIdentity=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IfMatch",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IfMatch",params,undefined,false); 
			

			svc.deleteCloudFrontOriginAccessIdentity(params,cb);
		}
			service.DeleteDistribution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IfMatch",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IfMatch",params,undefined,false); 
			

			svc.deleteDistribution(params,cb);
		}
			service.DeleteFieldLevelEncryptionConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IfMatch",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IfMatch",params,undefined,false); 
			

			svc.deleteFieldLevelEncryptionConfig(params,cb);
		}
			service.DeleteFieldLevelEncryptionProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IfMatch",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IfMatch",params,undefined,false); 
			

			svc.deleteFieldLevelEncryptionProfile(params,cb);
		}
			service.DeleteFunction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IfMatch",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"IfMatch",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"IfMatch",params,undefined,false); 
			

			svc.deleteFunction(params,cb);
		}
			service.DeleteKeyGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IfMatch",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IfMatch",params,undefined,false); 
			

			svc.deleteKeyGroup(params,cb);
		}
			service.DeleteMonitoringSubscription=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DistributionId",params,undefined,false); 
			
			copyArgs(n,"DistributionId",params,undefined,false); 
			
			copyArgs(msg,"DistributionId",params,undefined,false); 
			

			svc.deleteMonitoringSubscription(params,cb);
		}
			service.DeleteOriginRequestPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IfMatch",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IfMatch",params,undefined,false); 
			

			svc.deleteOriginRequestPolicy(params,cb);
		}
			service.DeletePublicKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IfMatch",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IfMatch",params,undefined,false); 
			

			svc.deletePublicKey(params,cb);
		}
			service.DeleteRealtimeLogConfig=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ARN",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ARN",params,undefined,false); 
			

			svc.deleteRealtimeLogConfig(params,cb);
		}
			service.DeleteStreamingDistribution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IfMatch",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IfMatch",params,undefined,false); 
			

			svc.deleteStreamingDistribution(params,cb);
		}
			service.DescribeFunction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Stage",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Stage",params,undefined,false); 
			

			svc.describeFunction(params,cb);
		}
			service.GetCachePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getCachePolicy(params,cb);
		}
			service.GetCachePolicyConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getCachePolicyConfig(params,cb);
		}
			service.GetCloudFrontOriginAccessIdentity=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getCloudFrontOriginAccessIdentity(params,cb);
		}
			service.GetCloudFrontOriginAccessIdentityConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getCloudFrontOriginAccessIdentityConfig(params,cb);
		}
			service.GetDistribution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getDistribution(params,cb);
		}
			service.GetDistributionConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getDistributionConfig(params,cb);
		}
			service.GetFieldLevelEncryption=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getFieldLevelEncryption(params,cb);
		}
			service.GetFieldLevelEncryptionConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getFieldLevelEncryptionConfig(params,cb);
		}
			service.GetFieldLevelEncryptionProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getFieldLevelEncryptionProfile(params,cb);
		}
			service.GetFieldLevelEncryptionProfileConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getFieldLevelEncryptionProfileConfig(params,cb);
		}
			service.GetFunction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Stage",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Stage",params,undefined,false); 
			

			svc.getFunction(params,cb);
		}
			service.GetInvalidation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DistributionId",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"DistributionId",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"DistributionId",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getInvalidation(params,cb);
		}
			service.GetKeyGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getKeyGroup(params,cb);
		}
			service.GetKeyGroupConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getKeyGroupConfig(params,cb);
		}
			service.GetMonitoringSubscription=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DistributionId",params,undefined,false); 
			
			copyArgs(n,"DistributionId",params,undefined,false); 
			
			copyArgs(msg,"DistributionId",params,undefined,false); 
			

			svc.getMonitoringSubscription(params,cb);
		}
			service.GetOriginRequestPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getOriginRequestPolicy(params,cb);
		}
			service.GetOriginRequestPolicyConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getOriginRequestPolicyConfig(params,cb);
		}
			service.GetPublicKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getPublicKey(params,cb);
		}
			service.GetPublicKeyConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getPublicKeyConfig(params,cb);
		}
			service.GetRealtimeLogConfig=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ARN",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ARN",params,undefined,false); 
			

			svc.getRealtimeLogConfig(params,cb);
		}
			service.GetStreamingDistribution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getStreamingDistribution(params,cb);
		}
			service.GetStreamingDistributionConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getStreamingDistributionConfig(params,cb);
		}
			service.ListCachePolicies=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listCachePolicies(params,cb);
		}
			service.ListCloudFrontOriginAccessIdentities=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listCloudFrontOriginAccessIdentities(params,cb);
		}
			service.ListConflictingAliases=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DistributionId",params,undefined,false); 
			copyArgs(n,"Alias",params,undefined,false); 
			
			copyArgs(n,"DistributionId",params,undefined,false); 
			copyArgs(n,"Alias",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(Number(n),"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"DistributionId",params,undefined,false); 
			copyArgs(msg,"Alias",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listConflictingAliases(params,cb);
		}
			service.ListDistributions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listDistributions(params,cb);
		}
			service.ListDistributionsByCachePolicyId=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CachePolicyId",params,undefined,false); 
			
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			copyArgs(n,"CachePolicyId",params,undefined,false); 
			
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			copyArgs(msg,"CachePolicyId",params,undefined,false); 
			

			svc.listDistributionsByCachePolicyId(params,cb);
		}
			service.ListDistributionsByKeyGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyGroupId",params,undefined,false); 
			
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			copyArgs(n,"KeyGroupId",params,undefined,false); 
			
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			copyArgs(msg,"KeyGroupId",params,undefined,false); 
			

			svc.listDistributionsByKeyGroup(params,cb);
		}
			service.ListDistributionsByOriginRequestPolicyId=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OriginRequestPolicyId",params,undefined,false); 
			
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			copyArgs(n,"OriginRequestPolicyId",params,undefined,false); 
			
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			copyArgs(msg,"OriginRequestPolicyId",params,undefined,false); 
			

			svc.listDistributionsByOriginRequestPolicyId(params,cb);
		}
			service.ListDistributionsByRealtimeLogConfig=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			copyArgs(n,"RealtimeLogConfigName",params,undefined,false); 
			copyArgs(n,"RealtimeLogConfigArn",params,undefined,false); 
			
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			copyArgs(msg,"RealtimeLogConfigName",params,undefined,false); 
			copyArgs(msg,"RealtimeLogConfigArn",params,undefined,false); 
			

			svc.listDistributionsByRealtimeLogConfig(params,cb);
		}
			service.ListDistributionsByWebACLId=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WebACLId",params,undefined,false); 
			
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			copyArgs(n,"WebACLId",params,undefined,false); 
			
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			copyArgs(msg,"WebACLId",params,undefined,false); 
			

			svc.listDistributionsByWebACLId(params,cb);
		}
			service.ListFieldLevelEncryptionConfigs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listFieldLevelEncryptionConfigs(params,cb);
		}
			service.ListFieldLevelEncryptionProfiles=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listFieldLevelEncryptionProfiles(params,cb);
		}
			service.ListFunctions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			copyArgs(n,"Stage",params,undefined,false); 
			
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			copyArgs(msg,"Stage",params,undefined,false); 
			

			svc.listFunctions(params,cb);
		}
			service.ListInvalidations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DistributionId",params,undefined,false); 
			
			copyArgs(n,"DistributionId",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"DistributionId",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listInvalidations(params,cb);
		}
			service.ListKeyGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listKeyGroups(params,cb);
		}
			service.ListOriginRequestPolicies=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listOriginRequestPolicies(params,cb);
		}
			service.ListPublicKeys=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listPublicKeys(params,cb);
		}
			service.ListRealtimeLogConfigs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxItems",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"MaxItems",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.listRealtimeLogConfigs(params,cb);
		}
			service.ListStreamingDistributions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listStreamingDistributions(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Resource",params,undefined,false); 
			
			copyArgs(n,"Resource",params,undefined,false); 
			
			copyArgs(msg,"Resource",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.PublishFunction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"IfMatch",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"IfMatch",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"IfMatch",params,undefined,false); 
			

			svc.publishFunction(params,cb);
		}
			service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Resource",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"Resource",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Resource",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
			service.TestFunction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"IfMatch",params,undefined,false); 
			copyArgs(Buffer.from(n),"EventObject",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"IfMatch",params,undefined,false); 
			copyArgs(n,"Stage",params,undefined,false); 
			copyArgs(Buffer.from(n),"EventObject",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"IfMatch",params,undefined,false); 
			copyArgs(msg,"Stage",params,undefined,false); 
			copyArgs(msg,"EventObject",params,undefined,false); 
			

			svc.testFunction(params,cb);
		}
			service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Resource",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"Resource",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"Resource",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
			service.UpdateCachePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CachePolicyConfig",params,undefined,true); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"CachePolicyConfig",params,undefined,true); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IfMatch",params,undefined,false); 
			
			copyArgs(msg,"CachePolicyConfig",params,undefined,true); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IfMatch",params,undefined,false); 
			

			svc.updateCachePolicy(params,cb);
		}
			service.UpdateCloudFrontOriginAccessIdentity=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CloudFrontOriginAccessIdentityConfig",params,undefined,true); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"CloudFrontOriginAccessIdentityConfig",params,undefined,true); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IfMatch",params,undefined,false); 
			
			copyArgs(msg,"CloudFrontOriginAccessIdentityConfig",params,undefined,true); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IfMatch",params,undefined,false); 
			

			svc.updateCloudFrontOriginAccessIdentity(params,cb);
		}
			service.UpdateDistribution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DistributionConfig",params,undefined,true); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"DistributionConfig",params,undefined,true); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IfMatch",params,undefined,false); 
			
			copyArgs(msg,"DistributionConfig",params,undefined,true); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IfMatch",params,undefined,false); 
			

			svc.updateDistribution(params,cb);
		}
			service.UpdateFieldLevelEncryptionConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FieldLevelEncryptionConfig",params,undefined,true); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"FieldLevelEncryptionConfig",params,undefined,true); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IfMatch",params,undefined,false); 
			
			copyArgs(msg,"FieldLevelEncryptionConfig",params,undefined,true); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IfMatch",params,undefined,false); 
			

			svc.updateFieldLevelEncryptionConfig(params,cb);
		}
			service.UpdateFieldLevelEncryptionProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FieldLevelEncryptionProfileConfig",params,undefined,true); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"FieldLevelEncryptionProfileConfig",params,undefined,true); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IfMatch",params,undefined,false); 
			
			copyArgs(msg,"FieldLevelEncryptionProfileConfig",params,undefined,true); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IfMatch",params,undefined,false); 
			

			svc.updateFieldLevelEncryptionProfile(params,cb);
		}
			service.UpdateFunction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IfMatch",params,undefined,false); 
			copyArgs(n,"FunctionConfig",params,undefined,true); 
			copyArgs(n,"FunctionCode",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"IfMatch",params,undefined,false); 
			copyArgs(n,"FunctionConfig",params,undefined,true); 
			copyArgs(n,"FunctionCode",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"IfMatch",params,undefined,false); 
			copyArgs(msg,"FunctionConfig",params,undefined,true); 
			copyArgs(msg,"FunctionCode",params,undefined,true); 
			

			svc.updateFunction(params,cb);
		}
			service.UpdateKeyGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"KeyGroupConfig",params,undefined,true); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"KeyGroupConfig",params,undefined,true); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IfMatch",params,undefined,false); 
			
			copyArgs(msg,"KeyGroupConfig",params,undefined,true); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IfMatch",params,undefined,false); 
			

			svc.updateKeyGroup(params,cb);
		}
			service.UpdateOriginRequestPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OriginRequestPolicyConfig",params,undefined,true); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"OriginRequestPolicyConfig",params,undefined,true); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IfMatch",params,undefined,false); 
			
			copyArgs(msg,"OriginRequestPolicyConfig",params,undefined,true); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IfMatch",params,undefined,false); 
			

			svc.updateOriginRequestPolicy(params,cb);
		}
			service.UpdatePublicKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PublicKeyConfig",params,undefined,true); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"PublicKeyConfig",params,undefined,true); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IfMatch",params,undefined,false); 
			
			copyArgs(msg,"PublicKeyConfig",params,undefined,true); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IfMatch",params,undefined,false); 
			

			svc.updatePublicKey(params,cb);
		}
			service.UpdateRealtimeLogConfig=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"EndPoints",params,undefined,true); 
			copyArgs(n,"Fields",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ARN",params,undefined,false); 
			copyArgs(n,"SamplingRate",params,undefined,false); 
			
			copyArgs(msg,"EndPoints",params,undefined,true); 
			copyArgs(msg,"Fields",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ARN",params,undefined,false); 
			copyArgs(msg,"SamplingRate",params,undefined,false); 
			

			svc.updateRealtimeLogConfig(params,cb);
		}
			service.UpdateStreamingDistribution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StreamingDistributionConfig",params,undefined,true); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"StreamingDistributionConfig",params,undefined,true); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IfMatch",params,undefined,false); 
			
			copyArgs(msg,"StreamingDistributionConfig",params,undefined,true); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IfMatch",params,undefined,false); 
			

			svc.updateStreamingDistribution(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS CloudFront", AmazonAPINode);

};
