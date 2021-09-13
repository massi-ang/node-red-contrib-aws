
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

		var awsService = new AWS.Firehose( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Firehose(msg.AWSConfig) : awsService;

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
		
			service.CreateDeliveryStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeliveryStreamName",params,undefined,false); 
			
			copyArgs(n,"DeliveryStreamName",params,undefined,false); 
			copyArgs(n,"DeliveryStreamType",params,undefined,false); 
			copyArgs(n,"KinesisStreamSourceConfiguration",params,undefined,false); 
			copyArgs(n,"DeliveryStreamEncryptionConfigurationInput",params,undefined,true); 
			copyArgs(n,"S3DestinationConfiguration",params,undefined,true); 
			copyArgs(n,"ExtendedS3DestinationConfiguration",params,undefined,false); 
			copyArgs(n,"RedshiftDestinationConfiguration",params,undefined,false); 
			copyArgs(n,"ElasticsearchDestinationConfiguration",params,undefined,false); 
			copyArgs(n,"SplunkDestinationConfiguration",params,undefined,false); 
			copyArgs(n,"HttpEndpointDestinationConfiguration",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DeliveryStreamName",params,undefined,false); 
			copyArgs(msg,"DeliveryStreamType",params,undefined,false); 
			copyArgs(msg,"KinesisStreamSourceConfiguration",params,undefined,false); 
			copyArgs(msg,"DeliveryStreamEncryptionConfigurationInput",params,undefined,true); 
			copyArgs(msg,"S3DestinationConfiguration",params,undefined,true); 
			copyArgs(msg,"ExtendedS3DestinationConfiguration",params,undefined,false); 
			copyArgs(msg,"RedshiftDestinationConfiguration",params,undefined,false); 
			copyArgs(msg,"ElasticsearchDestinationConfiguration",params,undefined,false); 
			copyArgs(msg,"SplunkDestinationConfiguration",params,undefined,false); 
			copyArgs(msg,"HttpEndpointDestinationConfiguration",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createDeliveryStream(params,cb);
		}
			service.DeleteDeliveryStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeliveryStreamName",params,undefined,false); 
			
			copyArgs(n,"DeliveryStreamName",params,undefined,false); 
			copyArgs(Boolean(n),"AllowForceDelete",params,undefined,false); 
			
			copyArgs(msg,"DeliveryStreamName",params,undefined,false); 
			copyArgs(msg,"AllowForceDelete",params,undefined,false); 
			

			svc.deleteDeliveryStream(params,cb);
		}
			service.DescribeDeliveryStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeliveryStreamName",params,undefined,false); 
			
			copyArgs(n,"DeliveryStreamName",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"ExclusiveStartDestinationId",params,undefined,false); 
			
			copyArgs(msg,"DeliveryStreamName",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"ExclusiveStartDestinationId",params,undefined,false); 
			

			svc.describeDeliveryStream(params,cb);
		}
			service.ListDeliveryStreams=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"DeliveryStreamType",params,undefined,false); 
			copyArgs(n,"ExclusiveStartDeliveryStreamName",params,undefined,false); 
			
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"DeliveryStreamType",params,undefined,false); 
			copyArgs(msg,"ExclusiveStartDeliveryStreamName",params,undefined,false); 
			

			svc.listDeliveryStreams(params,cb);
		}
			service.ListTagsForDeliveryStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeliveryStreamName",params,undefined,false); 
			
			copyArgs(n,"DeliveryStreamName",params,undefined,false); 
			copyArgs(n,"ExclusiveStartTagKey",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"DeliveryStreamName",params,undefined,false); 
			copyArgs(msg,"ExclusiveStartTagKey",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listTagsForDeliveryStream(params,cb);
		}
			service.PutRecord=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeliveryStreamName",params,undefined,false); 
			copyArgs(n,"Record",params,undefined,true); 
			
			copyArgs(n,"DeliveryStreamName",params,undefined,false); 
			copyArgs(n,"Record",params,undefined,true); 
			
			copyArgs(msg,"DeliveryStreamName",params,undefined,false); 
			copyArgs(msg,"Record",params,undefined,true); 
			

			svc.putRecord(params,cb);
		}
			service.PutRecordBatch=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeliveryStreamName",params,undefined,false); 
			copyArgs(n,"Records",params,undefined,false); 
			
			copyArgs(n,"DeliveryStreamName",params,undefined,false); 
			copyArgs(n,"Records",params,undefined,false); 
			
			copyArgs(msg,"DeliveryStreamName",params,undefined,false); 
			copyArgs(msg,"Records",params,undefined,false); 
			

			svc.putRecordBatch(params,cb);
		}
			service.StartDeliveryStreamEncryption=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeliveryStreamName",params,undefined,false); 
			
			copyArgs(n,"DeliveryStreamName",params,undefined,false); 
			copyArgs(n,"DeliveryStreamEncryptionConfigurationInput",params,undefined,true); 
			
			copyArgs(msg,"DeliveryStreamName",params,undefined,false); 
			copyArgs(msg,"DeliveryStreamEncryptionConfigurationInput",params,undefined,true); 
			

			svc.startDeliveryStreamEncryption(params,cb);
		}
			service.StopDeliveryStreamEncryption=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeliveryStreamName",params,undefined,false); 
			
			copyArgs(n,"DeliveryStreamName",params,undefined,false); 
			
			copyArgs(msg,"DeliveryStreamName",params,undefined,false); 
			

			svc.stopDeliveryStreamEncryption(params,cb);
		}
			service.TagDeliveryStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeliveryStreamName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"DeliveryStreamName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DeliveryStreamName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagDeliveryStream(params,cb);
		}
			service.UntagDeliveryStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeliveryStreamName",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"DeliveryStreamName",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"DeliveryStreamName",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagDeliveryStream(params,cb);
		}
			service.UpdateDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeliveryStreamName",params,undefined,false); 
			copyArgs(n,"CurrentDeliveryStreamVersionId",params,undefined,false); 
			copyArgs(n,"DestinationId",params,undefined,false); 
			
			copyArgs(n,"DeliveryStreamName",params,undefined,false); 
			copyArgs(n,"CurrentDeliveryStreamVersionId",params,undefined,false); 
			copyArgs(n,"DestinationId",params,undefined,false); 
			copyArgs(n,"S3DestinationUpdate",params,undefined,true); 
			copyArgs(n,"ExtendedS3DestinationUpdate",params,undefined,false); 
			copyArgs(n,"RedshiftDestinationUpdate",params,undefined,false); 
			copyArgs(n,"ElasticsearchDestinationUpdate",params,undefined,false); 
			copyArgs(n,"SplunkDestinationUpdate",params,undefined,false); 
			copyArgs(n,"HttpEndpointDestinationUpdate",params,undefined,false); 
			
			copyArgs(msg,"DeliveryStreamName",params,undefined,false); 
			copyArgs(msg,"CurrentDeliveryStreamVersionId",params,undefined,false); 
			copyArgs(msg,"DestinationId",params,undefined,false); 
			copyArgs(msg,"S3DestinationUpdate",params,undefined,true); 
			copyArgs(msg,"ExtendedS3DestinationUpdate",params,undefined,false); 
			copyArgs(msg,"RedshiftDestinationUpdate",params,undefined,false); 
			copyArgs(msg,"ElasticsearchDestinationUpdate",params,undefined,false); 
			copyArgs(msg,"SplunkDestinationUpdate",params,undefined,false); 
			copyArgs(msg,"HttpEndpointDestinationUpdate",params,undefined,false); 
			

			svc.updateDestination(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS Firehose", AmazonAPINode);

};
