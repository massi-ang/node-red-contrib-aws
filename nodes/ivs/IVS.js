
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

		var awsService = new AWS.IVS( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.IVS(msg.AWSConfig) : awsService;

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
		
			service.BatchGetChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arns",params,undefined,false); 
			
			copyArgs(n,"arns",params,undefined,false); 
			
			copyArgs(msg,"arns",params,undefined,false); 
			

			svc.batchGetChannel(params,cb);
		}
			service.BatchGetStreamKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arns",params,undefined,false); 
			
			copyArgs(n,"arns",params,undefined,false); 
			
			copyArgs(msg,"arns",params,undefined,false); 
			

			svc.batchGetStreamKey(params,cb);
		}
			service.CreateChannel=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"latencyMode",params,undefined,false); 
			copyArgs(n,"type",params,undefined,false); 
			copyArgs(Boolean(n),"authorized",params,undefined,false); 
			copyArgs(n,"recordingConfigurationArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"latencyMode",params,undefined,false); 
			copyArgs(msg,"type",params,undefined,false); 
			copyArgs(msg,"authorized",params,undefined,false); 
			copyArgs(msg,"recordingConfigurationArn",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createChannel(params,cb);
		}
			service.CreateRecordingConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"destinationConfiguration",params,undefined,true); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"destinationConfiguration",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"destinationConfiguration",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createRecordingConfiguration(params,cb);
		}
			service.CreateStreamKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"channelArn",params,undefined,false); 
			
			copyArgs(n,"channelArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"channelArn",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createStreamKey(params,cb);
		}
			service.DeleteChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.deleteChannel(params,cb);
		}
			service.DeletePlaybackKeyPair=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.deletePlaybackKeyPair(params,cb);
		}
			service.DeleteRecordingConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.deleteRecordingConfiguration(params,cb);
		}
			service.DeleteStreamKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.deleteStreamKey(params,cb);
		}
			service.GetChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.getChannel(params,cb);
		}
			service.GetPlaybackKeyPair=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.getPlaybackKeyPair(params,cb);
		}
			service.GetRecordingConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.getRecordingConfiguration(params,cb);
		}
			service.GetStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"channelArn",params,undefined,false); 
			
			copyArgs(n,"channelArn",params,undefined,false); 
			
			copyArgs(msg,"channelArn",params,undefined,false); 
			

			svc.getStream(params,cb);
		}
			service.GetStreamKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.getStreamKey(params,cb);
		}
			service.ImportPlaybackKeyPair=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"publicKeyMaterial",params,undefined,false); 
			
			copyArgs(n,"publicKeyMaterial",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"publicKeyMaterial",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.importPlaybackKeyPair(params,cb);
		}
			service.ListChannels=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"filterByName",params,undefined,false); 
			copyArgs(n,"filterByRecordingConfigurationArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"filterByName",params,undefined,false); 
			copyArgs(msg,"filterByRecordingConfigurationArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listChannels(params,cb);
		}
			service.ListPlaybackKeyPairs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listPlaybackKeyPairs(params,cb);
		}
			service.ListRecordingConfigurations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listRecordingConfigurations(params,cb);
		}
			service.ListStreamKeys=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"channelArn",params,undefined,false); 
			
			copyArgs(n,"channelArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"channelArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listStreamKeys(params,cb);
		}
			service.ListStreams=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listStreams(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.PutMetadata=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"channelArn",params,undefined,false); 
			copyArgs(n,"metadata",params,undefined,false); 
			
			copyArgs(n,"channelArn",params,undefined,false); 
			copyArgs(n,"metadata",params,undefined,false); 
			
			copyArgs(msg,"channelArn",params,undefined,false); 
			copyArgs(msg,"metadata",params,undefined,false); 
			

			svc.putMetadata(params,cb);
		}
			service.StopStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"channelArn",params,undefined,false); 
			
			copyArgs(n,"channelArn",params,undefined,false); 
			
			copyArgs(msg,"channelArn",params,undefined,false); 
			

			svc.stopStream(params,cb);
		}
			service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
			service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
			service.UpdateChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"latencyMode",params,undefined,false); 
			copyArgs(n,"type",params,undefined,false); 
			copyArgs(Boolean(n),"authorized",params,undefined,false); 
			copyArgs(n,"recordingConfigurationArn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"latencyMode",params,undefined,false); 
			copyArgs(msg,"type",params,undefined,false); 
			copyArgs(msg,"authorized",params,undefined,false); 
			copyArgs(msg,"recordingConfigurationArn",params,undefined,false); 
			

			svc.updateChannel(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS IVS", AmazonAPINode);

};
