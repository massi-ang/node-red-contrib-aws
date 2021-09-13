
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

		var awsService = new AWS.ElasticTranscoder( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.ElasticTranscoder(msg.AWSConfig) : awsService;

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
		
			service.CancelJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.cancelJob(params,cb);
		}
			service.CreateJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PipelineId",params,undefined,false); 
			
			copyArgs(n,"PipelineId",params,undefined,false); 
			copyArgs(n,"Input",params,undefined,true); 
			copyArgs(n,"Inputs",params,undefined,true); 
			copyArgs(n,"Output",params,undefined,true); 
			copyArgs(n,"Outputs",params,undefined,false); 
			copyArgs(n,"OutputKeyPrefix",params,undefined,false); 
			copyArgs(n,"Playlists",params,undefined,false); 
			copyArgs(n,"UserMetadata",params,undefined,true); 
			
			copyArgs(msg,"PipelineId",params,undefined,false); 
			copyArgs(msg,"Input",params,undefined,true); 
			copyArgs(msg,"Inputs",params,undefined,true); 
			copyArgs(msg,"Output",params,undefined,true); 
			copyArgs(msg,"Outputs",params,undefined,false); 
			copyArgs(msg,"OutputKeyPrefix",params,undefined,false); 
			copyArgs(msg,"Playlists",params,undefined,false); 
			copyArgs(msg,"UserMetadata",params,undefined,true); 
			

			svc.createJob(params,cb);
		}
			service.CreatePipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"InputBucket",params,undefined,false); 
			copyArgs(n,"Role",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"InputBucket",params,undefined,false); 
			copyArgs(n,"OutputBucket",params,undefined,false); 
			copyArgs(n,"Role",params,undefined,false); 
			copyArgs(n,"AwsKmsKeyArn",params,undefined,false); 
			copyArgs(n,"Notifications",params,undefined,true); 
			copyArgs(n,"ContentConfig",params,undefined,true); 
			copyArgs(n,"ThumbnailConfig",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"InputBucket",params,undefined,false); 
			copyArgs(msg,"OutputBucket",params,undefined,false); 
			copyArgs(msg,"Role",params,undefined,false); 
			copyArgs(msg,"AwsKmsKeyArn",params,undefined,false); 
			copyArgs(msg,"Notifications",params,undefined,true); 
			copyArgs(msg,"ContentConfig",params,undefined,true); 
			copyArgs(msg,"ThumbnailConfig",params,undefined,true); 
			

			svc.createPipeline(params,cb);
		}
			service.CreatePreset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Container",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Container",params,undefined,false); 
			copyArgs(n,"Video",params,undefined,true); 
			copyArgs(n,"Audio",params,undefined,true); 
			copyArgs(n,"Thumbnails",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Container",params,undefined,false); 
			copyArgs(msg,"Video",params,undefined,true); 
			copyArgs(msg,"Audio",params,undefined,true); 
			copyArgs(msg,"Thumbnails",params,undefined,true); 
			

			svc.createPreset(params,cb);
		}
			service.DeletePipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.deletePipeline(params,cb);
		}
			service.DeletePreset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.deletePreset(params,cb);
		}
			service.ListJobsByPipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PipelineId",params,undefined,false); 
			
			copyArgs(n,"PipelineId",params,undefined,false); 
			copyArgs(n,"Ascending",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			
			copyArgs(msg,"PipelineId",params,undefined,false); 
			copyArgs(msg,"Ascending",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			

			svc.listJobsByPipeline(params,cb);
		}
			service.ListJobsByStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(n,"Status",params,undefined,false); 
			copyArgs(n,"Ascending",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			
			copyArgs(msg,"Status",params,undefined,false); 
			copyArgs(msg,"Ascending",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			

			svc.listJobsByStatus(params,cb);
		}
			service.ListPipelines=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Ascending",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			
			copyArgs(msg,"Ascending",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			

			svc.listPipelines(params,cb);
		}
			service.ListPresets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Ascending",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			
			copyArgs(msg,"Ascending",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			

			svc.listPresets(params,cb);
		}
			service.ReadJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.readJob(params,cb);
		}
			service.ReadPipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.readPipeline(params,cb);
		}
			service.ReadPreset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.readPreset(params,cb);
		}
			service.TestRole=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Role",params,undefined,false); 
			copyArgs(n,"InputBucket",params,undefined,false); 
			copyArgs(n,"OutputBucket",params,undefined,false); 
			copyArgs(n,"Topics",params,undefined,false); 
			
			copyArgs(n,"Role",params,undefined,false); 
			copyArgs(n,"InputBucket",params,undefined,false); 
			copyArgs(n,"OutputBucket",params,undefined,false); 
			copyArgs(n,"Topics",params,undefined,false); 
			
			copyArgs(msg,"Role",params,undefined,false); 
			copyArgs(msg,"InputBucket",params,undefined,false); 
			copyArgs(msg,"OutputBucket",params,undefined,false); 
			copyArgs(msg,"Topics",params,undefined,false); 
			

			svc.testRole(params,cb);
		}
			service.UpdatePipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"InputBucket",params,undefined,false); 
			copyArgs(n,"Role",params,undefined,false); 
			copyArgs(n,"AwsKmsKeyArn",params,undefined,false); 
			copyArgs(n,"Notifications",params,undefined,true); 
			copyArgs(n,"ContentConfig",params,undefined,true); 
			copyArgs(n,"ThumbnailConfig",params,undefined,true); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"InputBucket",params,undefined,false); 
			copyArgs(msg,"Role",params,undefined,false); 
			copyArgs(msg,"AwsKmsKeyArn",params,undefined,false); 
			copyArgs(msg,"Notifications",params,undefined,true); 
			copyArgs(msg,"ContentConfig",params,undefined,true); 
			copyArgs(msg,"ThumbnailConfig",params,undefined,true); 
			

			svc.updatePipeline(params,cb);
		}
			service.UpdatePipelineNotifications=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Notifications",params,undefined,true); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Notifications",params,undefined,true); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"Notifications",params,undefined,true); 
			

			svc.updatePipelineNotifications(params,cb);
		}
			service.UpdatePipelineStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			

			svc.updatePipelineStatus(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS ElasticTranscoder", AmazonAPINode);

};
