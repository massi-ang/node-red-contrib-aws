
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

		var awsService = new AWS.MediaPackage( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.MediaPackage(msg.AWSConfig) : awsService;

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

		
		service.ConfigureLogs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"EgressAccessLogs",params,undefined,true); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IngressAccessLogs",params,undefined,true); 
			
			copyArgs(msg,"EgressAccessLogs",params,undefined,true); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IngressAccessLogs",params,undefined,true); 
			

			svc.configureLogs(params,cb);
		}

		
		service.CreateChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createChannel(params,cb);
		}

		
		service.CreateHarvestJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"S3Destination",params,undefined,true); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(n,"OriginEndpointId",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"OriginEndpointId",params,undefined,false); 
			copyArgs(n,"S3Destination",params,undefined,true); 
			copyArgs(n,"StartTime",params,undefined,false); 
			
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"OriginEndpointId",params,undefined,false); 
			copyArgs(msg,"S3Destination",params,undefined,true); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			

			svc.createHarvestJob(params,cb);
		}

		
		service.CreateOriginEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelId",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Authorization",params,undefined,true); 
			copyArgs(n,"ChannelId",params,undefined,false); 
			copyArgs(n,"CmafPackage",params,undefined,true); 
			copyArgs(n,"DashPackage",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"HlsPackage",params,undefined,true); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"ManifestName",params,undefined,false); 
			copyArgs(n,"MssPackage",params,undefined,true); 
			copyArgs(n,"Origination",params,undefined,false); 
			copyArgs(n,"StartoverWindowSeconds",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"TimeDelaySeconds",params,undefined,false); 
			copyArgs(n,"Whitelist",params,undefined,true); 
			
			copyArgs(msg,"Authorization",params,undefined,true); 
			copyArgs(msg,"ChannelId",params,undefined,false); 
			copyArgs(msg,"CmafPackage",params,undefined,true); 
			copyArgs(msg,"DashPackage",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"HlsPackage",params,undefined,true); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"ManifestName",params,undefined,false); 
			copyArgs(msg,"MssPackage",params,undefined,true); 
			copyArgs(msg,"Origination",params,undefined,false); 
			copyArgs(msg,"StartoverWindowSeconds",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"TimeDelaySeconds",params,undefined,false); 
			copyArgs(msg,"Whitelist",params,undefined,true); 
			

			svc.createOriginEndpoint(params,cb);
		}

		
		service.DeleteChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.deleteChannel(params,cb);
		}

		
		service.DeleteOriginEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.deleteOriginEndpoint(params,cb);
		}

		
		service.DescribeChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.describeChannel(params,cb);
		}

		
		service.DescribeHarvestJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.describeHarvestJob(params,cb);
		}

		
		service.DescribeOriginEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.describeOriginEndpoint(params,cb);
		}

		
		service.ListChannels=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listChannels(params,cb);
		}

		
		service.ListHarvestJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"IncludeChannelId",params,undefined,false); 
			copyArgs(n,"IncludeStatus",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"IncludeChannelId",params,undefined,false); 
			copyArgs(msg,"IncludeStatus",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listHarvestJobs(params,cb);
		}

		
		service.ListOriginEndpoints=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ChannelId",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ChannelId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listOriginEndpoints(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.RotateChannelCredentials=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.rotateChannelCredentials(params,cb);
		}

		
		service.RotateIngestEndpointCredentials=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IngestEndpointId",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IngestEndpointId",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IngestEndpointId",params,undefined,false); 
			

			svc.rotateIngestEndpointCredentials(params,cb);
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
			
			copyArgs(n,"TagKeys",params,undefined,true); 
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.updateChannel(params,cb);
		}

		
		service.UpdateOriginEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Authorization",params,undefined,true); 
			copyArgs(n,"CmafPackage",params,undefined,true); 
			copyArgs(n,"DashPackage",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"HlsPackage",params,undefined,true); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"ManifestName",params,undefined,false); 
			copyArgs(n,"MssPackage",params,undefined,true); 
			copyArgs(n,"Origination",params,undefined,false); 
			copyArgs(n,"StartoverWindowSeconds",params,undefined,false); 
			copyArgs(n,"TimeDelaySeconds",params,undefined,false); 
			copyArgs(n,"Whitelist",params,undefined,true); 
			
			copyArgs(msg,"Authorization",params,undefined,true); 
			copyArgs(msg,"CmafPackage",params,undefined,true); 
			copyArgs(msg,"DashPackage",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"HlsPackage",params,undefined,true); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"ManifestName",params,undefined,false); 
			copyArgs(msg,"MssPackage",params,undefined,true); 
			copyArgs(msg,"Origination",params,undefined,false); 
			copyArgs(msg,"StartoverWindowSeconds",params,undefined,false); 
			copyArgs(msg,"TimeDelaySeconds",params,undefined,false); 
			copyArgs(msg,"Whitelist",params,undefined,true); 
			

			svc.updateOriginEndpoint(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS MediaPackage", AmazonAPINode);

};
