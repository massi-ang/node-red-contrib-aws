
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

		var awsService = new AWS.ConnectParticipant( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.ConnectParticipant(msg.AWSConfig) : awsService;

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
		
			service.CompleteAttachmentUpload=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AttachmentIds",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"ConnectionToken",params,undefined,false); 
			
			copyArgs(n,"AttachmentIds",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"ConnectionToken",params,undefined,false); 
			
			copyArgs(msg,"AttachmentIds",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"ConnectionToken",params,undefined,false); 
			

			svc.completeAttachmentUpload(params,cb);
		}
			service.CreateParticipantConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"ParticipantToken",params,undefined,false); 
			
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"ParticipantToken",params,undefined,false); 
			
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"ParticipantToken",params,undefined,false); 
			

			svc.createParticipantConnection(params,cb);
		}
			service.DisconnectParticipant=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConnectionToken",params,undefined,false); 
			
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"ConnectionToken",params,undefined,false); 
			
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"ConnectionToken",params,undefined,false); 
			

			svc.disconnectParticipant(params,cb);
		}
			service.GetAttachment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AttachmentId",params,undefined,false); 
			copyArgs(n,"ConnectionToken",params,undefined,false); 
			
			copyArgs(n,"AttachmentId",params,undefined,false); 
			copyArgs(n,"ConnectionToken",params,undefined,false); 
			
			copyArgs(msg,"AttachmentId",params,undefined,false); 
			copyArgs(msg,"ConnectionToken",params,undefined,false); 
			

			svc.getAttachment(params,cb);
		}
			service.GetTranscript=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConnectionToken",params,undefined,false); 
			
			copyArgs(n,"ContactId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"ScanDirection",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"StartPosition",params,undefined,false); 
			copyArgs(n,"ConnectionToken",params,undefined,false); 
			
			copyArgs(msg,"ContactId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"ScanDirection",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"StartPosition",params,undefined,false); 
			copyArgs(msg,"ConnectionToken",params,undefined,false); 
			

			svc.getTranscript(params,cb);
		}
			service.SendEvent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContentType",params,undefined,false); 
			copyArgs(n,"ConnectionToken",params,undefined,false); 
			
			copyArgs(n,"ContentType",params,undefined,false); 
			copyArgs(n,"Content",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"ConnectionToken",params,undefined,false); 
			
			copyArgs(msg,"ContentType",params,undefined,false); 
			copyArgs(msg,"Content",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"ConnectionToken",params,undefined,false); 
			

			svc.sendEvent(params,cb);
		}
			service.SendMessage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContentType",params,undefined,false); 
			copyArgs(n,"Content",params,undefined,false); 
			copyArgs(n,"ConnectionToken",params,undefined,false); 
			
			copyArgs(n,"ContentType",params,undefined,false); 
			copyArgs(n,"Content",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"ConnectionToken",params,undefined,false); 
			
			copyArgs(msg,"ContentType",params,undefined,false); 
			copyArgs(msg,"Content",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"ConnectionToken",params,undefined,false); 
			

			svc.sendMessage(params,cb);
		}
			service.StartAttachmentUpload=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContentType",params,undefined,false); 
			copyArgs(n,"AttachmentSizeInBytes",params,undefined,false); 
			copyArgs(n,"AttachmentName",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"ConnectionToken",params,undefined,false); 
			
			copyArgs(n,"ContentType",params,undefined,false); 
			copyArgs(n,"AttachmentSizeInBytes",params,undefined,false); 
			copyArgs(n,"AttachmentName",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"ConnectionToken",params,undefined,false); 
			
			copyArgs(msg,"ContentType",params,undefined,false); 
			copyArgs(msg,"AttachmentSizeInBytes",params,undefined,false); 
			copyArgs(msg,"AttachmentName",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"ConnectionToken",params,undefined,false); 
			

			svc.startAttachmentUpload(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS ConnectParticipant", AmazonAPINode);

};
