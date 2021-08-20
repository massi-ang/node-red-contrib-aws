
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

		var awsService = new AWS.QLDB( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.QLDB(msg.AWSConfig) : awsService;

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

		
		service.CancelJournalKinesisStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LedgerName",params,undefined,false); 
			copyArg(n,"StreamId",params,undefined,false); 
			
			copyArg(msg,"LedgerName",params,undefined,false); 
			copyArg(msg,"StreamId",params,undefined,false); 
			

			svc.cancelJournalKinesisStream(params,cb);
		}

		
		service.CreateLedger=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"PermissionsMode",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"PermissionsMode",params,undefined,false); 
			copyArg(msg,"DeletionProtection",params,undefined,false); 
			copyArg(msg,"KmsKey",params,undefined,false); 
			

			svc.createLedger(params,cb);
		}

		
		service.DeleteLedger=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteLedger(params,cb);
		}

		
		service.DescribeJournalKinesisStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LedgerName",params,undefined,false); 
			copyArg(n,"StreamId",params,undefined,false); 
			
			copyArg(msg,"LedgerName",params,undefined,false); 
			copyArg(msg,"StreamId",params,undefined,false); 
			

			svc.describeJournalKinesisStream(params,cb);
		}

		
		service.DescribeJournalS3Export=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"ExportId",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ExportId",params,undefined,false); 
			

			svc.describeJournalS3Export(params,cb);
		}

		
		service.DescribeLedger=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.describeLedger(params,cb);
		}

		
		service.ExportJournalToS3=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"InclusiveStartTime",params,undefined,false); 
			copyArg(n,"ExclusiveEndTime",params,undefined,false); 
			copyArg(n,"S3ExportConfiguration",params,undefined,true); 
			copyArg(n,"RoleArn",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"InclusiveStartTime",params,undefined,false); 
			copyArg(msg,"ExclusiveEndTime",params,undefined,false); 
			copyArg(msg,"S3ExportConfiguration",params,undefined,true); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			

			svc.exportJournalToS3(params,cb);
		}

		
		service.GetBlock=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"BlockAddress",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"BlockAddress",params,undefined,true); 
			copyArg(msg,"DigestTipAddress",params,undefined,true); 
			

			svc.getBlock(params,cb);
		}

		
		service.GetDigest=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.getDigest(params,cb);
		}

		
		service.GetRevision=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"BlockAddress",params,undefined,true); 
			copyArg(n,"DocumentId",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"BlockAddress",params,undefined,true); 
			copyArg(msg,"DocumentId",params,undefined,false); 
			copyArg(msg,"DigestTipAddress",params,undefined,true); 
			

			svc.getRevision(params,cb);
		}

		
		service.ListJournalKinesisStreamsForLedger=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LedgerName",params,undefined,false); 
			
			copyArg(msg,"LedgerName",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listJournalKinesisStreamsForLedger(params,cb);
		}

		
		service.ListJournalS3Exports=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listJournalS3Exports(params,cb);
		}

		
		service.ListJournalS3ExportsForLedger=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listJournalS3ExportsForLedger(params,cb);
		}

		
		service.ListLedgers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listLedgers(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.StreamJournalToKinesis=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LedgerName",params,undefined,false); 
			copyArg(n,"RoleArn",params,undefined,false); 
			copyArg(n,"InclusiveStartTime",params,undefined,false); 
			copyArg(n,"KinesisConfiguration",params,undefined,true); 
			copyArg(n,"StreamName",params,undefined,false); 
			
			copyArg(msg,"LedgerName",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"InclusiveStartTime",params,undefined,false); 
			copyArg(msg,"ExclusiveEndTime",params,undefined,false); 
			copyArg(msg,"KinesisConfiguration",params,undefined,true); 
			copyArg(msg,"StreamName",params,undefined,false); 
			

			svc.streamJournalToKinesis(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateLedger=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"DeletionProtection",params,undefined,false); 
			copyArg(msg,"KmsKey",params,undefined,false); 
			

			svc.updateLedger(params,cb);
		}

		
		service.UpdateLedgerPermissionsMode=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"PermissionsMode",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"PermissionsMode",params,undefined,false); 
			

			svc.updateLedgerPermissionsMode(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS QLDB", AmazonAPINode);

};
