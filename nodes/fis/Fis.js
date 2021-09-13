
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

		var awsService = new AWS.Fis( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Fis(msg.AWSConfig) : awsService;

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
		
			service.CreateExperimentTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"stopConditions",params,undefined,false); 
			copyArgs(n,"actions",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"stopConditions",params,undefined,false); 
			copyArgs(n,"targets",params,undefined,false); 
			copyArgs(n,"actions",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"stopConditions",params,undefined,false); 
			copyArgs(msg,"targets",params,undefined,false); 
			copyArgs(msg,"actions",params,undefined,false); 
			copyArgs(msg,"roleArn",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createExperimentTemplate(params,cb);
		}
			service.DeleteExperimentTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.deleteExperimentTemplate(params,cb);
		}
			service.GetAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.getAction(params,cb);
		}
			service.GetExperiment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.getExperiment(params,cb);
		}
			service.GetExperimentTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.getExperimentTemplate(params,cb);
		}
			service.ListActions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listActions(params,cb);
		}
			service.ListExperimentTemplates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listExperimentTemplates(params,cb);
		}
			service.ListExperiments=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listExperiments(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.StartExperiment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"experimentTemplateId",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"experimentTemplateId",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"experimentTemplateId",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.startExperiment(params,cb);
		}
			service.StopExperiment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.stopExperiment(params,cb);
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
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
			service.UpdateExperimentTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"stopConditions",params,undefined,false); 
			copyArgs(n,"targets",params,undefined,false); 
			copyArgs(n,"actions",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"stopConditions",params,undefined,false); 
			copyArgs(msg,"targets",params,undefined,false); 
			copyArgs(msg,"actions",params,undefined,false); 
			copyArgs(msg,"roleArn",params,undefined,false); 
			

			svc.updateExperimentTemplate(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS Fis", AmazonAPINode);

};
