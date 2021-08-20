
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

		var awsService = new AWS.KinesisVideo( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.KinesisVideo(msg.AWSConfig) : awsService;

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

		
		service.CreateSignalingChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelName",params,undefined,false); 
			
			copyArg(msg,"ChannelName",params,undefined,false); 
			copyArg(msg,"ChannelType",params,undefined,false); 
			copyArg(msg,"SingleMasterConfiguration",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,false); 
			

			svc.createSignalingChannel(params,cb);
		}

		
		service.CreateStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params,undefined,false); 
			
			copyArg(msg,"DeviceName",params,undefined,false); 
			copyArg(msg,"StreamName",params,undefined,false); 
			copyArg(msg,"MediaType",params,undefined,false); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"DataRetentionInHours",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createStream(params,cb);
		}

		
		service.DeleteSignalingChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelARN",params,undefined,false); 
			
			copyArg(msg,"ChannelARN",params,undefined,false); 
			copyArg(msg,"CurrentVersion",params,undefined,false); 
			

			svc.deleteSignalingChannel(params,cb);
		}

		
		service.DeleteStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamARN",params,undefined,false); 
			
			copyArg(msg,"StreamARN",params,undefined,false); 
			copyArg(msg,"CurrentVersion",params,undefined,false); 
			

			svc.deleteStream(params,cb);
		}

		
		service.DescribeSignalingChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ChannelName",params,undefined,false); 
			copyArg(msg,"ChannelARN",params,undefined,false); 
			

			svc.describeSignalingChannel(params,cb);
		}

		
		service.DescribeStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"StreamName",params,undefined,false); 
			copyArg(msg,"StreamARN",params,undefined,false); 
			

			svc.describeStream(params,cb);
		}

		
		service.GetDataEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"APIName",params,undefined,false); 
			
			copyArg(msg,"StreamName",params,undefined,false); 
			copyArg(msg,"StreamARN",params,undefined,false); 
			copyArg(msg,"APIName",params,undefined,false); 
			

			svc.getDataEndpoint(params,cb);
		}

		
		service.GetSignalingChannelEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelARN",params,undefined,false); 
			
			copyArg(msg,"ChannelARN",params,undefined,false); 
			copyArg(msg,"SingleMasterChannelEndpointConfiguration",params,undefined,false); 
			

			svc.getSignalingChannelEndpoint(params,cb);
		}

		
		service.ListSignalingChannels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"ChannelNameCondition",params,undefined,false); 
			

			svc.listSignalingChannels(params,cb);
		}

		
		service.ListStreams=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"StreamNameCondition",params,undefined,false); 
			

			svc.listStreams(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListTagsForStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"StreamARN",params,undefined,false); 
			copyArg(msg,"StreamName",params,undefined,false); 
			

			svc.listTagsForStream(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,false); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,false); 
			

			svc.tagResource(params,cb);
		}

		
		service.TagStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"StreamARN",params,undefined,false); 
			copyArg(msg,"StreamName",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagStream(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			copyArg(n,"TagKeyList",params,undefined,true); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			copyArg(msg,"TagKeyList",params,undefined,true); 
			

			svc.untagResource(params,cb);
		}

		
		service.UntagStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TagKeyList",params,undefined,true); 
			
			copyArg(msg,"StreamARN",params,undefined,false); 
			copyArg(msg,"StreamName",params,undefined,false); 
			copyArg(msg,"TagKeyList",params,undefined,true); 
			

			svc.untagStream(params,cb);
		}

		
		service.UpdateDataRetention=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CurrentVersion",params,undefined,false); 
			copyArg(n,"Operation",params,undefined,false); 
			copyArg(n,"DataRetentionChangeInHours",params,undefined,false); 
			
			copyArg(msg,"StreamName",params,undefined,false); 
			copyArg(msg,"StreamARN",params,undefined,false); 
			copyArg(msg,"CurrentVersion",params,undefined,false); 
			copyArg(msg,"Operation",params,undefined,false); 
			copyArg(msg,"DataRetentionChangeInHours",params,undefined,false); 
			

			svc.updateDataRetention(params,cb);
		}

		
		service.UpdateSignalingChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelARN",params,undefined,false); 
			copyArg(n,"CurrentVersion",params,undefined,false); 
			
			copyArg(msg,"ChannelARN",params,undefined,false); 
			copyArg(msg,"CurrentVersion",params,undefined,false); 
			copyArg(msg,"SingleMasterConfiguration",params,undefined,true); 
			

			svc.updateSignalingChannel(params,cb);
		}

		
		service.UpdateStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CurrentVersion",params,undefined,false); 
			
			copyArg(msg,"StreamName",params,undefined,false); 
			copyArg(msg,"StreamARN",params,undefined,false); 
			copyArg(msg,"CurrentVersion",params,undefined,false); 
			copyArg(msg,"DeviceName",params,undefined,false); 
			copyArg(msg,"MediaType",params,undefined,false); 
			

			svc.updateStream(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS KinesisVideo", AmazonAPINode);

};
