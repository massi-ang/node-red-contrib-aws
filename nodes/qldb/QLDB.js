
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

		var awsService = new AWS.QLDB( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.QLDB(msg.AWSConfig) : awsService;

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
		
		service.CancelJournalKinesisStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LedgerName",params,undefined,false); 
			copyArgs(n,"StreamId",params,undefined,false); 
			
			copyArgs(n,"LedgerName",params,undefined,false); 
			copyArgs(n,"StreamId",params,undefined,false); 
			
			copyArgs(msg,"LedgerName",params,undefined,false); 
			copyArgs(msg,"StreamId",params,undefined,false); 
			

			svc.cancelJournalKinesisStream(params,cb);
		}
		
		service.CreateLedger=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"PermissionsMode",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"PermissionsMode",params,undefined,false); 
			copyArgs(Boolean(n),"DeletionProtection",params,undefined,false); 
			copyArgs(n,"KmsKey",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"PermissionsMode",params,undefined,false); 
			copyArgs(msg,"DeletionProtection",params,undefined,false); 
			copyArgs(msg,"KmsKey",params,undefined,false); 
			

			svc.createLedger(params,cb);
		}
		
		service.DeleteLedger=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteLedger(params,cb);
		}
		
		service.DescribeJournalKinesisStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LedgerName",params,undefined,false); 
			copyArgs(n,"StreamId",params,undefined,false); 
			
			copyArgs(n,"LedgerName",params,undefined,false); 
			copyArgs(n,"StreamId",params,undefined,false); 
			
			copyArgs(msg,"LedgerName",params,undefined,false); 
			copyArgs(msg,"StreamId",params,undefined,false); 
			

			svc.describeJournalKinesisStream(params,cb);
		}
		
		service.DescribeJournalS3Export=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ExportId",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ExportId",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ExportId",params,undefined,false); 
			

			svc.describeJournalS3Export(params,cb);
		}
		
		service.DescribeLedger=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.describeLedger(params,cb);
		}
		
		service.ExportJournalToS3=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"InclusiveStartTime",params,undefined,false); 
			copyArgs(n,"ExclusiveEndTime",params,undefined,false); 
			copyArgs(n,"S3ExportConfiguration",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"InclusiveStartTime",params,undefined,false); 
			copyArgs(n,"ExclusiveEndTime",params,undefined,false); 
			copyArgs(n,"S3ExportConfiguration",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"InclusiveStartTime",params,undefined,false); 
			copyArgs(msg,"ExclusiveEndTime",params,undefined,false); 
			copyArgs(msg,"S3ExportConfiguration",params,undefined,true); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			

			svc.exportJournalToS3(params,cb);
		}
		
		service.GetBlock=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"BlockAddress",params,undefined,true); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"BlockAddress",params,undefined,true); 
			copyArgs(n,"DigestTipAddress",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"BlockAddress",params,undefined,true); 
			copyArgs(msg,"DigestTipAddress",params,undefined,true); 
			

			svc.getBlock(params,cb);
		}
		
		service.GetDigest=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getDigest(params,cb);
		}
		
		service.GetRevision=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"BlockAddress",params,undefined,true); 
			copyArgs(n,"DocumentId",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"BlockAddress",params,undefined,true); 
			copyArgs(n,"DocumentId",params,undefined,false); 
			copyArgs(n,"DigestTipAddress",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"BlockAddress",params,undefined,true); 
			copyArgs(msg,"DocumentId",params,undefined,false); 
			copyArgs(msg,"DigestTipAddress",params,undefined,true); 
			

			svc.getRevision(params,cb);
		}
		
		service.ListJournalKinesisStreamsForLedger=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LedgerName",params,undefined,false); 
			
			copyArgs(n,"LedgerName",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"LedgerName",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listJournalKinesisStreamsForLedger(params,cb);
		}
		
		service.ListJournalS3Exports=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listJournalS3Exports(params,cb);
		}
		
		service.ListJournalS3ExportsForLedger=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listJournalS3ExportsForLedger(params,cb);
		}
		
		service.ListLedgers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listLedgers(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.StreamJournalToKinesis=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LedgerName",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"InclusiveStartTime",params,undefined,false); 
			copyArgs(n,"KinesisConfiguration",params,undefined,true); 
			copyArgs(n,"StreamName",params,undefined,false); 
			
			copyArgs(n,"LedgerName",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"InclusiveStartTime",params,undefined,false); 
			copyArgs(n,"ExclusiveEndTime",params,undefined,false); 
			copyArgs(n,"KinesisConfiguration",params,undefined,true); 
			copyArgs(n,"StreamName",params,undefined,false); 
			
			copyArgs(msg,"LedgerName",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"InclusiveStartTime",params,undefined,false); 
			copyArgs(msg,"ExclusiveEndTime",params,undefined,false); 
			copyArgs(msg,"KinesisConfiguration",params,undefined,true); 
			copyArgs(msg,"StreamName",params,undefined,false); 
			

			svc.streamJournalToKinesis(params,cb);
		}
		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
		
		service.UpdateLedger=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(Boolean(n),"DeletionProtection",params,undefined,false); 
			copyArgs(n,"KmsKey",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"DeletionProtection",params,undefined,false); 
			copyArgs(msg,"KmsKey",params,undefined,false); 
			

			svc.updateLedger(params,cb);
		}
		
		service.UpdateLedgerPermissionsMode=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"PermissionsMode",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"PermissionsMode",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"PermissionsMode",params,undefined,false); 
			

			svc.updateLedgerPermissionsMode(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS QLDB", AmazonAPINode);

};
