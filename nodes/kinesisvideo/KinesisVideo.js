
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

		var awsService = new AWS.KinesisVideo( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.KinesisVideo(msg.AWSConfig) : awsService;

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
		
			service.CreateSignalingChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelName",params,undefined,false); 
			
			copyArgs(n,"ChannelName",params,undefined,false); 
			copyArgs(n,"ChannelType",params,undefined,false); 
			copyArgs(n,"SingleMasterConfiguration",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,false); 
			
			copyArgs(msg,"ChannelName",params,undefined,false); 
			copyArgs(msg,"ChannelType",params,undefined,false); 
			copyArgs(msg,"SingleMasterConfiguration",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,false); 
			

			svc.createSignalingChannel(params,cb);
		}
			service.CreateStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StreamName",params,undefined,false); 
			
			copyArgs(n,"DeviceName",params,undefined,false); 
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"MediaType",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(Number(n),"DataRetentionInHours",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DeviceName",params,undefined,false); 
			copyArgs(msg,"StreamName",params,undefined,false); 
			copyArgs(msg,"MediaType",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"DataRetentionInHours",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createStream(params,cb);
		}
			service.DeleteSignalingChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelARN",params,undefined,false); 
			
			copyArgs(n,"ChannelARN",params,undefined,false); 
			copyArgs(n,"CurrentVersion",params,undefined,false); 
			
			copyArgs(msg,"ChannelARN",params,undefined,false); 
			copyArgs(msg,"CurrentVersion",params,undefined,false); 
			

			svc.deleteSignalingChannel(params,cb);
		}
			service.DeleteStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StreamARN",params,undefined,false); 
			
			copyArgs(n,"StreamARN",params,undefined,false); 
			copyArgs(n,"CurrentVersion",params,undefined,false); 
			
			copyArgs(msg,"StreamARN",params,undefined,false); 
			copyArgs(msg,"CurrentVersion",params,undefined,false); 
			

			svc.deleteStream(params,cb);
		}
			service.DescribeSignalingChannel=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ChannelName",params,undefined,false); 
			copyArgs(n,"ChannelARN",params,undefined,false); 
			
			copyArgs(msg,"ChannelName",params,undefined,false); 
			copyArgs(msg,"ChannelARN",params,undefined,false); 
			

			svc.describeSignalingChannel(params,cb);
		}
			service.DescribeStream=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"StreamARN",params,undefined,false); 
			
			copyArgs(msg,"StreamName",params,undefined,false); 
			copyArgs(msg,"StreamARN",params,undefined,false); 
			

			svc.describeStream(params,cb);
		}
			service.GetDataEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"APIName",params,undefined,false); 
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"StreamARN",params,undefined,false); 
			copyArgs(n,"APIName",params,undefined,false); 
			
			copyArgs(msg,"StreamName",params,undefined,false); 
			copyArgs(msg,"StreamARN",params,undefined,false); 
			copyArgs(msg,"APIName",params,undefined,false); 
			

			svc.getDataEndpoint(params,cb);
		}
			service.GetSignalingChannelEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelARN",params,undefined,false); 
			
			copyArgs(n,"ChannelARN",params,undefined,false); 
			copyArgs(n,"SingleMasterChannelEndpointConfiguration",params,undefined,false); 
			
			copyArgs(msg,"ChannelARN",params,undefined,false); 
			copyArgs(msg,"SingleMasterChannelEndpointConfiguration",params,undefined,false); 
			

			svc.getSignalingChannelEndpoint(params,cb);
		}
			service.ListSignalingChannels=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"ChannelNameCondition",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"ChannelNameCondition",params,undefined,false); 
			

			svc.listSignalingChannels(params,cb);
		}
			service.ListStreams=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"StreamNameCondition",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"StreamNameCondition",params,undefined,false); 
			

			svc.listStreams(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.ListTagsForStream=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"StreamARN",params,undefined,false); 
			copyArgs(n,"StreamName",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"StreamARN",params,undefined,false); 
			copyArgs(msg,"StreamName",params,undefined,false); 
			

			svc.listTagsForStream(params,cb);
		}
			service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,false); 
			

			svc.tagResource(params,cb);
		}
			service.TagStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"StreamARN",params,undefined,false); 
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"StreamARN",params,undefined,false); 
			copyArgs(msg,"StreamName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagStream(params,cb);
		}
			service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"TagKeyList",params,undefined,true); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"TagKeyList",params,undefined,true); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			copyArgs(msg,"TagKeyList",params,undefined,true); 
			

			svc.untagResource(params,cb);
		}
			service.UntagStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TagKeyList",params,undefined,true); 
			
			copyArgs(n,"StreamARN",params,undefined,false); 
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"TagKeyList",params,undefined,true); 
			
			copyArgs(msg,"StreamARN",params,undefined,false); 
			copyArgs(msg,"StreamName",params,undefined,false); 
			copyArgs(msg,"TagKeyList",params,undefined,true); 
			

			svc.untagStream(params,cb);
		}
			service.UpdateDataRetention=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CurrentVersion",params,undefined,false); 
			copyArgs(n,"Operation",params,undefined,false); 
			copyArgs(Number(n),"DataRetentionChangeInHours",params,undefined,false); 
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"StreamARN",params,undefined,false); 
			copyArgs(n,"CurrentVersion",params,undefined,false); 
			copyArgs(n,"Operation",params,undefined,false); 
			copyArgs(Number(n),"DataRetentionChangeInHours",params,undefined,false); 
			
			copyArgs(msg,"StreamName",params,undefined,false); 
			copyArgs(msg,"StreamARN",params,undefined,false); 
			copyArgs(msg,"CurrentVersion",params,undefined,false); 
			copyArgs(msg,"Operation",params,undefined,false); 
			copyArgs(msg,"DataRetentionChangeInHours",params,undefined,false); 
			

			svc.updateDataRetention(params,cb);
		}
			service.UpdateSignalingChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelARN",params,undefined,false); 
			copyArgs(n,"CurrentVersion",params,undefined,false); 
			
			copyArgs(n,"ChannelARN",params,undefined,false); 
			copyArgs(n,"CurrentVersion",params,undefined,false); 
			copyArgs(n,"SingleMasterConfiguration",params,undefined,true); 
			
			copyArgs(msg,"ChannelARN",params,undefined,false); 
			copyArgs(msg,"CurrentVersion",params,undefined,false); 
			copyArgs(msg,"SingleMasterConfiguration",params,undefined,true); 
			

			svc.updateSignalingChannel(params,cb);
		}
			service.UpdateStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CurrentVersion",params,undefined,false); 
			
			copyArgs(n,"StreamName",params,undefined,false); 
			copyArgs(n,"StreamARN",params,undefined,false); 
			copyArgs(n,"CurrentVersion",params,undefined,false); 
			copyArgs(n,"DeviceName",params,undefined,false); 
			copyArgs(n,"MediaType",params,undefined,false); 
			
			copyArgs(msg,"StreamName",params,undefined,false); 
			copyArgs(msg,"StreamARN",params,undefined,false); 
			copyArgs(msg,"CurrentVersion",params,undefined,false); 
			copyArgs(msg,"DeviceName",params,undefined,false); 
			copyArgs(msg,"MediaType",params,undefined,false); 
			

			svc.updateStream(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS KinesisVideo", AmazonAPINode);

};
