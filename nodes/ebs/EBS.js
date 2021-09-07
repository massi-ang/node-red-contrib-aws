
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

		var awsService = new AWS.EBS( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.EBS(msg.AWSConfig) : awsService;

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

		
		service.CompleteSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SnapshotId",params,undefined,false); 
			copyArgs(n,"ChangedBlocksCount",params,undefined,false); 
			
			copyArgs(n,"SnapshotId",params,undefined,false); 
			copyArgs(n,"ChangedBlocksCount",params,undefined,false); 
			copyArgs(n,"Checksum",params,undefined,false); 
			copyArgs(n,"ChecksumAlgorithm",params,undefined,false); 
			copyArgs(n,"ChecksumAggregationMethod",params,undefined,false); 
			
			copyArgs(msg,"SnapshotId",params,undefined,false); 
			copyArgs(msg,"ChangedBlocksCount",params,undefined,false); 
			copyArgs(msg,"Checksum",params,undefined,false); 
			copyArgs(msg,"ChecksumAlgorithm",params,undefined,false); 
			copyArgs(msg,"ChecksumAggregationMethod",params,undefined,false); 
			

			svc.completeSnapshot(params,cb);
		}

		
		service.GetSnapshotBlock=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SnapshotId",params,undefined,false); 
			copyArgs(n,"BlockIndex",params,undefined,false); 
			copyArgs(n,"BlockToken",params,undefined,false); 
			
			copyArgs(n,"SnapshotId",params,undefined,false); 
			copyArgs(n,"BlockIndex",params,undefined,false); 
			copyArgs(n,"BlockToken",params,undefined,false); 
			
			copyArgs(msg,"SnapshotId",params,undefined,false); 
			copyArgs(msg,"BlockIndex",params,undefined,false); 
			copyArgs(msg,"BlockToken",params,undefined,false); 
			

			svc.getSnapshotBlock(params,cb);
		}

		
		service.ListChangedBlocks=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SecondSnapshotId",params,undefined,false); 
			
			copyArgs(n,"FirstSnapshotId",params,undefined,false); 
			copyArgs(n,"SecondSnapshotId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"StartingBlockIndex",params,undefined,false); 
			
			copyArgs(msg,"FirstSnapshotId",params,undefined,false); 
			copyArgs(msg,"SecondSnapshotId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"StartingBlockIndex",params,undefined,false); 
			

			svc.listChangedBlocks(params,cb);
		}

		
		service.ListSnapshotBlocks=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SnapshotId",params,undefined,false); 
			
			copyArgs(n,"SnapshotId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"StartingBlockIndex",params,undefined,false); 
			
			copyArgs(msg,"SnapshotId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"StartingBlockIndex",params,undefined,false); 
			

			svc.listSnapshotBlocks(params,cb);
		}

		
		service.PutSnapshotBlock=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SnapshotId",params,undefined,false); 
			copyArgs(n,"BlockIndex",params,undefined,false); 
			copyArgs(n,"BlockData",params,undefined,true); 
			copyArgs(n,"DataLength",params,undefined,false); 
			copyArgs(n,"Checksum",params,undefined,false); 
			copyArgs(n,"ChecksumAlgorithm",params,undefined,false); 
			
			copyArgs(n,"SnapshotId",params,undefined,false); 
			copyArgs(n,"BlockIndex",params,undefined,false); 
			copyArgs(n,"BlockData",params,undefined,true); 
			copyArgs(n,"DataLength",params,undefined,false); 
			copyArgs(n,"Progress",params,undefined,false); 
			copyArgs(n,"Checksum",params,undefined,false); 
			copyArgs(n,"ChecksumAlgorithm",params,undefined,false); 
			
			copyArgs(msg,"SnapshotId",params,undefined,false); 
			copyArgs(msg,"BlockIndex",params,undefined,false); 
			copyArgs(msg,"BlockData",params,undefined,true); 
			copyArgs(msg,"DataLength",params,undefined,false); 
			copyArgs(msg,"Progress",params,undefined,false); 
			copyArgs(msg,"Checksum",params,undefined,false); 
			copyArgs(msg,"ChecksumAlgorithm",params,undefined,false); 
			

			svc.putSnapshotBlock(params,cb);
		}

		
		service.StartSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VolumeSize",params,undefined,false); 
			
			copyArgs(n,"VolumeSize",params,undefined,false); 
			copyArgs(n,"ParentSnapshotId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Encrypted",params,undefined,false); 
			copyArgs(n,"KmsKeyArn",params,undefined,true); 
			copyArgs(n,"Timeout",params,undefined,false); 
			
			copyArgs(msg,"VolumeSize",params,undefined,false); 
			copyArgs(msg,"ParentSnapshotId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"Encrypted",params,undefined,false); 
			copyArgs(msg,"KmsKeyArn",params,undefined,true); 
			copyArgs(msg,"Timeout",params,undefined,false); 
			

			svc.startSnapshot(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS EBS", AmazonAPINode);

};
