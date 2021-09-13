
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

		var awsService = new AWS.Kinesis( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Kinesis(msg.AWSConfig) : awsService;

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
		
		service.AddTagsToStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,false); 
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,false); 
			
			copyArgs(msg,"StreamName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,false); 
			

			svc.addTagsToStream(params,cb);
		}
		
		service.CreateStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(Number(n),"ShardCount",params,undefined,false); 
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(Number(n),"ShardCount",params,undefined,false); 
			
			copyArgs(msg,"StreamName",params,undefined,false); 
			copyArgs(msg,"ShardCount",params,undefined,false); 
			

			svc.createStream(params,cb);
		}
		
		service.DecreaseStreamRetentionPeriod=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(Number(n),"RetentionPeriodHours",params,undefined,false); 
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(Number(n),"RetentionPeriodHours",params,undefined,false); 
			
			copyArgs(msg,"StreamName",params,undefined,false); 
			copyArgs(msg,"RetentionPeriodHours",params,undefined,false); 
			

			svc.decreaseStreamRetentionPeriod(params,cb);
		}
		
		service.DeleteStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StreamName",params,undefined,false); 
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(Boolean(n),"EnforceConsumerDeletion",params,undefined,false); 
			
			copyArgs(msg,"StreamName",params,undefined,false); 
			copyArgs(msg,"EnforceConsumerDeletion",params,undefined,false); 
			

			svc.deleteStream(params,cb);
		}
		
		service.DeregisterStreamConsumer=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"StreamARN",params,undefined,false); 
			copyArgs(n,"ConsumerName",params,undefined,false); 
			copyArgs(n,"ConsumerARN",params,undefined,false); 
			
			copyArgs(msg,"StreamARN",params,undefined,false); 
			copyArgs(msg,"ConsumerName",params,undefined,false); 
			copyArgs(msg,"ConsumerARN",params,undefined,false); 
			

			svc.deregisterStreamConsumer(params,cb);
		}
		
		service.DescribeLimits=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeLimits(params,cb);
		}
		
		service.DescribeStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StreamName",params,undefined,false); 
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"ExclusiveStartShardId",params,undefined,false); 
			
			copyArgs(msg,"StreamName",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"ExclusiveStartShardId",params,undefined,false); 
			

			svc.describeStream(params,cb);
		}
		
		service.DescribeStreamConsumer=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"StreamARN",params,undefined,false); 
			copyArgs(n,"ConsumerName",params,undefined,false); 
			copyArgs(n,"ConsumerARN",params,undefined,false); 
			
			copyArgs(msg,"StreamARN",params,undefined,false); 
			copyArgs(msg,"ConsumerName",params,undefined,false); 
			copyArgs(msg,"ConsumerARN",params,undefined,false); 
			

			svc.describeStreamConsumer(params,cb);
		}
		
		service.DescribeStreamSummary=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StreamName",params,undefined,false); 
			
			copyArgs(n,"StreamName",params,undefined,false); 
			
			copyArgs(msg,"StreamName",params,undefined,false); 
			

			svc.describeStreamSummary(params,cb);
		}
		
		service.DisableEnhancedMonitoring=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"ShardLevelMetrics",params,undefined,true); 
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"ShardLevelMetrics",params,undefined,true); 
			
			copyArgs(msg,"StreamName",params,undefined,false); 
			copyArgs(msg,"ShardLevelMetrics",params,undefined,true); 
			

			svc.disableEnhancedMonitoring(params,cb);
		}
		
		service.EnableEnhancedMonitoring=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"ShardLevelMetrics",params,undefined,true); 
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"ShardLevelMetrics",params,undefined,true); 
			
			copyArgs(msg,"StreamName",params,undefined,false); 
			copyArgs(msg,"ShardLevelMetrics",params,undefined,true); 
			

			svc.enableEnhancedMonitoring(params,cb);
		}
		
		service.GetRecords=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ShardIterator",params,undefined,false); 
			
			copyArgs(n,"ShardIterator",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"ShardIterator",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.getRecords(params,cb);
		}
		
		service.GetShardIterator=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"ShardId",params,undefined,false); 
			copyArgs(n,"ShardIteratorType",params,undefined,false); 
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"ShardId",params,undefined,false); 
			copyArgs(n,"ShardIteratorType",params,undefined,false); 
			copyArgs(n,"StartingSequenceNumber",params,undefined,false); 
			copyArgs(n,"Timestamp",params,undefined,false); 
			
			copyArgs(msg,"StreamName",params,undefined,false); 
			copyArgs(msg,"ShardId",params,undefined,false); 
			copyArgs(msg,"ShardIteratorType",params,undefined,false); 
			copyArgs(msg,"StartingSequenceNumber",params,undefined,false); 
			copyArgs(msg,"Timestamp",params,undefined,false); 
			

			svc.getShardIterator(params,cb);
		}
		
		service.IncreaseStreamRetentionPeriod=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(Number(n),"RetentionPeriodHours",params,undefined,false); 
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(Number(n),"RetentionPeriodHours",params,undefined,false); 
			
			copyArgs(msg,"StreamName",params,undefined,false); 
			copyArgs(msg,"RetentionPeriodHours",params,undefined,false); 
			

			svc.increaseStreamRetentionPeriod(params,cb);
		}
		
		service.ListShards=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"ExclusiveStartShardId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"StreamCreationTimestamp",params,undefined,false); 
			copyArgs(n,"ShardFilter",params,undefined,false); 
			
			copyArgs(msg,"StreamName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"ExclusiveStartShardId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"StreamCreationTimestamp",params,undefined,false); 
			copyArgs(msg,"ShardFilter",params,undefined,false); 
			

			svc.listShards(params,cb);
		}
		
		service.ListStreamConsumers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StreamARN",params,undefined,false); 
			
			copyArgs(n,"StreamARN",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"StreamCreationTimestamp",params,undefined,false); 
			
			copyArgs(msg,"StreamARN",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"StreamCreationTimestamp",params,undefined,false); 
			

			svc.listStreamConsumers(params,cb);
		}
		
		service.ListStreams=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"ExclusiveStartStreamName",params,undefined,false); 
			
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"ExclusiveStartStreamName",params,undefined,false); 
			

			svc.listStreams(params,cb);
		}
		
		service.ListTagsForStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StreamName",params,undefined,false); 
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"ExclusiveStartTagKey",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"StreamName",params,undefined,false); 
			copyArgs(msg,"ExclusiveStartTagKey",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listTagsForStream(params,cb);
		}
		
		service.MergeShards=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"ShardToMerge",params,undefined,false); 
			copyArgs(n,"AdjacentShardToMerge",params,undefined,false); 
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"ShardToMerge",params,undefined,false); 
			copyArgs(n,"AdjacentShardToMerge",params,undefined,false); 
			
			copyArgs(msg,"StreamName",params,undefined,false); 
			copyArgs(msg,"ShardToMerge",params,undefined,false); 
			copyArgs(msg,"AdjacentShardToMerge",params,undefined,false); 
			

			svc.mergeShards(params,cb);
		}
		
		service.PutRecord=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"Data",params,undefined,false); 
			copyArgs(n,"PartitionKey",params,undefined,false); 
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"Data",params,undefined,false); 
			copyArgs(n,"PartitionKey",params,undefined,false); 
			copyArgs(n,"ExplicitHashKey",params,undefined,false); 
			copyArgs(n,"SequenceNumberForOrdering",params,undefined,false); 
			
			copyArgs(msg,"StreamName",params,undefined,false); 
			copyArgs(msg,"Data",params,undefined,false); 
			copyArgs(msg,"PartitionKey",params,undefined,false); 
			copyArgs(msg,"ExplicitHashKey",params,undefined,false); 
			copyArgs(msg,"SequenceNumberForOrdering",params,undefined,false); 
			

			svc.putRecord(params,cb);
		}
		
		service.PutRecords=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Records",params,undefined,false); 
			copyArgs(n,"StreamName",params,undefined,false); 
			
			copyArgs(n,"Records",params,undefined,false); 
			copyArgs(n,"StreamName",params,undefined,false); 
			
			copyArgs(msg,"Records",params,undefined,false); 
			copyArgs(msg,"StreamName",params,undefined,false); 
			

			svc.putRecords(params,cb);
		}
		
		service.RegisterStreamConsumer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StreamARN",params,undefined,false); 
			copyArgs(n,"ConsumerName",params,undefined,false); 
			
			copyArgs(n,"StreamARN",params,undefined,false); 
			copyArgs(n,"ConsumerName",params,undefined,false); 
			
			copyArgs(msg,"StreamARN",params,undefined,false); 
			copyArgs(msg,"ConsumerName",params,undefined,false); 
			

			svc.registerStreamConsumer(params,cb);
		}
		
		service.RemoveTagsFromStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"StreamName",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.removeTagsFromStream(params,cb);
		}
		
		service.SplitShard=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"ShardToSplit",params,undefined,false); 
			copyArgs(n,"NewStartingHashKey",params,undefined,false); 
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"ShardToSplit",params,undefined,false); 
			copyArgs(n,"NewStartingHashKey",params,undefined,false); 
			
			copyArgs(msg,"StreamName",params,undefined,false); 
			copyArgs(msg,"ShardToSplit",params,undefined,false); 
			copyArgs(msg,"NewStartingHashKey",params,undefined,false); 
			

			svc.splitShard(params,cb);
		}
		
		service.StartStreamEncryption=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"EncryptionType",params,undefined,false); 
			copyArgs(n,"KeyId",params,undefined,false); 
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"EncryptionType",params,undefined,false); 
			copyArgs(n,"KeyId",params,undefined,false); 
			
			copyArgs(msg,"StreamName",params,undefined,false); 
			copyArgs(msg,"EncryptionType",params,undefined,false); 
			copyArgs(msg,"KeyId",params,undefined,false); 
			

			svc.startStreamEncryption(params,cb);
		}
		
		service.StopStreamEncryption=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"EncryptionType",params,undefined,false); 
			copyArgs(n,"KeyId",params,undefined,false); 
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"EncryptionType",params,undefined,false); 
			copyArgs(n,"KeyId",params,undefined,false); 
			
			copyArgs(msg,"StreamName",params,undefined,false); 
			copyArgs(msg,"EncryptionType",params,undefined,false); 
			copyArgs(msg,"KeyId",params,undefined,false); 
			

			svc.stopStreamEncryption(params,cb);
		}
		
		service.UpdateShardCount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(Number(n),"TargetShardCount",params,undefined,false); 
			copyArgs(n,"ScalingType",params,undefined,false); 
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(Number(n),"TargetShardCount",params,undefined,false); 
			copyArgs(n,"ScalingType",params,undefined,false); 
			
			copyArgs(msg,"StreamName",params,undefined,false); 
			copyArgs(msg,"TargetShardCount",params,undefined,false); 
			copyArgs(msg,"ScalingType",params,undefined,false); 
			

			svc.updateShardCount(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS Kinesis", AmazonAPINode);

};
