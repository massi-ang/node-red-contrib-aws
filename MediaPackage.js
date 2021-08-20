
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

		var awsService = new AWS.MediaPackage( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.MediaPackage(msg.AWSConfig) : awsService;

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

		
		service.ConfigureLogs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"EgressAccessLogs",params,undefined,true); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IngressAccessLogs",params,undefined,true); 
			

			svc.configureLogs(params,cb);
		}

		
		service.CreateChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createChannel(params,cb);
		}

		
		service.CreateHarvestJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"S3Destination",params,undefined,true); 
			copyArg(n,"EndTime",params,undefined,false); 
			copyArg(n,"OriginEndpointId",params,undefined,false); 
			copyArg(n,"StartTime",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"OriginEndpointId",params,undefined,false); 
			copyArg(msg,"S3Destination",params,undefined,true); 
			copyArg(msg,"StartTime",params,undefined,false); 
			

			svc.createHarvestJob(params,cb);
		}

		
		service.CreateOriginEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChannelId",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Authorization",params,undefined,true); 
			copyArg(msg,"ChannelId",params,undefined,false); 
			copyArg(msg,"CmafPackage",params,undefined,true); 
			copyArg(msg,"DashPackage",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"HlsPackage",params,undefined,true); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"ManifestName",params,undefined,false); 
			copyArg(msg,"MssPackage",params,undefined,true); 
			copyArg(msg,"Origination",params,undefined,false); 
			copyArg(msg,"StartoverWindowSeconds",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"TimeDelaySeconds",params,undefined,false); 
			copyArg(msg,"Whitelist",params,undefined,true); 
			

			svc.createOriginEndpoint(params,cb);
		}

		
		service.DeleteChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.deleteChannel(params,cb);
		}

		
		service.DeleteOriginEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.deleteOriginEndpoint(params,cb);
		}

		
		service.DescribeChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.describeChannel(params,cb);
		}

		
		service.DescribeHarvestJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.describeHarvestJob(params,cb);
		}

		
		service.DescribeOriginEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.describeOriginEndpoint(params,cb);
		}

		
		service.ListChannels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listChannels(params,cb);
		}

		
		service.ListHarvestJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"IncludeChannelId",params,undefined,false); 
			copyArg(msg,"IncludeStatus",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listHarvestJobs(params,cb);
		}

		
		service.ListOriginEndpoints=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ChannelId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listOriginEndpoints(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.RotateChannelCredentials=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.rotateChannelCredentials(params,cb);
		}

		
		service.RotateIngestEndpointCredentials=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IngestEndpointId",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IngestEndpointId",params,undefined,false); 
			

			svc.rotateIngestEndpointCredentials(params,cb);
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
			
			copyArg(n,"TagKeys",params,undefined,true); 
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.updateChannel(params,cb);
		}

		
		service.UpdateOriginEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Authorization",params,undefined,true); 
			copyArg(msg,"CmafPackage",params,undefined,true); 
			copyArg(msg,"DashPackage",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"HlsPackage",params,undefined,true); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"ManifestName",params,undefined,false); 
			copyArg(msg,"MssPackage",params,undefined,true); 
			copyArg(msg,"Origination",params,undefined,false); 
			copyArg(msg,"StartoverWindowSeconds",params,undefined,false); 
			copyArg(msg,"TimeDelaySeconds",params,undefined,false); 
			copyArg(msg,"Whitelist",params,undefined,true); 
			

			svc.updateOriginEndpoint(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS MediaPackage", AmazonAPINode);

};
