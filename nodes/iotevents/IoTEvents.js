
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

		var awsService = new AWS.IoTEvents( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.IoTEvents(msg.AWSConfig) : awsService;

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
		
		service.CreateAlarmModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"alarmModelName",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			copyArgs(n,"alarmRule",params,undefined,true); 
			
			copyArgs(n,"alarmModelName",params,undefined,false); 
			copyArgs(n,"alarmModelDescription",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"key",params,undefined,false); 
			copyArgs(Number(n),"severity",params,undefined,false); 
			copyArgs(n,"alarmRule",params,undefined,true); 
			copyArgs(n,"alarmNotification",params,undefined,true); 
			copyArgs(n,"alarmEventActions",params,undefined,true); 
			copyArgs(n,"alarmCapabilities",params,undefined,true); 
			
			copyArgs(msg,"alarmModelName",params,undefined,false); 
			copyArgs(msg,"alarmModelDescription",params,undefined,false); 
			copyArgs(msg,"roleArn",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"key",params,undefined,false); 
			copyArgs(msg,"severity",params,undefined,false); 
			copyArgs(msg,"alarmRule",params,undefined,true); 
			copyArgs(msg,"alarmNotification",params,undefined,true); 
			copyArgs(msg,"alarmEventActions",params,undefined,true); 
			copyArgs(msg,"alarmCapabilities",params,undefined,true); 
			

			svc.createAlarmModel(params,cb);
		}
		
		service.CreateDetectorModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"detectorModelName",params,undefined,false); 
			copyArgs(n,"detectorModelDefinition",params,undefined,true); 
			copyArgs(n,"roleArn",params,undefined,false); 
			
			copyArgs(n,"detectorModelName",params,undefined,false); 
			copyArgs(n,"detectorModelDefinition",params,undefined,true); 
			copyArgs(n,"detectorModelDescription",params,undefined,false); 
			copyArgs(n,"key",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"evaluationMethod",params,undefined,false); 
			
			copyArgs(msg,"detectorModelName",params,undefined,false); 
			copyArgs(msg,"detectorModelDefinition",params,undefined,true); 
			copyArgs(msg,"detectorModelDescription",params,undefined,false); 
			copyArgs(msg,"key",params,undefined,false); 
			copyArgs(msg,"roleArn",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"evaluationMethod",params,undefined,false); 
			

			svc.createDetectorModel(params,cb);
		}
		
		service.CreateInput=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"inputName",params,undefined,false); 
			copyArgs(n,"inputDefinition",params,undefined,true); 
			
			copyArgs(n,"inputName",params,undefined,false); 
			copyArgs(n,"inputDescription",params,undefined,false); 
			copyArgs(n,"inputDefinition",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"inputName",params,undefined,false); 
			copyArgs(msg,"inputDescription",params,undefined,false); 
			copyArgs(msg,"inputDefinition",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createInput(params,cb);
		}
		
		service.DeleteAlarmModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"alarmModelName",params,undefined,false); 
			
			copyArgs(n,"alarmModelName",params,undefined,false); 
			
			copyArgs(msg,"alarmModelName",params,undefined,false); 
			

			svc.deleteAlarmModel(params,cb);
		}
		
		service.DeleteDetectorModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"detectorModelName",params,undefined,false); 
			
			copyArgs(n,"detectorModelName",params,undefined,false); 
			
			copyArgs(msg,"detectorModelName",params,undefined,false); 
			

			svc.deleteDetectorModel(params,cb);
		}
		
		service.DeleteInput=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"inputName",params,undefined,false); 
			
			copyArgs(n,"inputName",params,undefined,false); 
			
			copyArgs(msg,"inputName",params,undefined,false); 
			

			svc.deleteInput(params,cb);
		}
		
		service.DescribeAlarmModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"alarmModelName",params,undefined,false); 
			
			copyArgs(n,"alarmModelName",params,undefined,false); 
			copyArgs(n,"alarmModelVersion",params,undefined,false); 
			
			copyArgs(msg,"alarmModelName",params,undefined,false); 
			copyArgs(msg,"alarmModelVersion",params,undefined,false); 
			

			svc.describeAlarmModel(params,cb);
		}
		
		service.DescribeDetectorModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"detectorModelName",params,undefined,false); 
			
			copyArgs(n,"detectorModelName",params,undefined,false); 
			copyArgs(n,"detectorModelVersion",params,undefined,false); 
			
			copyArgs(msg,"detectorModelName",params,undefined,false); 
			copyArgs(msg,"detectorModelVersion",params,undefined,false); 
			

			svc.describeDetectorModel(params,cb);
		}
		
		service.DescribeDetectorModelAnalysis=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"analysisId",params,undefined,false); 
			
			copyArgs(n,"analysisId",params,undefined,false); 
			
			copyArgs(msg,"analysisId",params,undefined,false); 
			

			svc.describeDetectorModelAnalysis(params,cb);
		}
		
		service.DescribeInput=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"inputName",params,undefined,false); 
			
			copyArgs(n,"inputName",params,undefined,false); 
			
			copyArgs(msg,"inputName",params,undefined,false); 
			

			svc.describeInput(params,cb);
		}
		
		service.DescribeLoggingOptions=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeLoggingOptions(params,cb);
		}
		
		service.GetDetectorModelAnalysisResults=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"analysisId",params,undefined,false); 
			
			copyArgs(n,"analysisId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"analysisId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getDetectorModelAnalysisResults(params,cb);
		}
		
		service.ListAlarmModelVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"alarmModelName",params,undefined,false); 
			
			copyArgs(n,"alarmModelName",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"alarmModelName",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listAlarmModelVersions(params,cb);
		}
		
		service.ListAlarmModels=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listAlarmModels(params,cb);
		}
		
		service.ListDetectorModelVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"detectorModelName",params,undefined,false); 
			
			copyArgs(n,"detectorModelName",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"detectorModelName",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listDetectorModelVersions(params,cb);
		}
		
		service.ListDetectorModels=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listDetectorModels(params,cb);
		}
		
		service.ListInputRoutings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"inputIdentifier",params,undefined,false); 
			
			copyArgs(n,"inputIdentifier",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"inputIdentifier",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listInputRoutings(params,cb);
		}
		
		service.ListInputs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listInputs(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.PutLoggingOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"loggingOptions",params,undefined,true); 
			
			copyArgs(n,"loggingOptions",params,undefined,true); 
			
			copyArgs(msg,"loggingOptions",params,undefined,true); 
			

			svc.putLoggingOptions(params,cb);
		}
		
		service.StartDetectorModelAnalysis=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"detectorModelDefinition",params,undefined,true); 
			
			copyArgs(n,"detectorModelDefinition",params,undefined,true); 
			
			copyArgs(msg,"detectorModelDefinition",params,undefined,true); 
			

			svc.startDetectorModelAnalysis(params,cb);
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
		
		service.UpdateAlarmModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"alarmModelName",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			copyArgs(n,"alarmRule",params,undefined,true); 
			
			copyArgs(n,"alarmModelName",params,undefined,false); 
			copyArgs(n,"alarmModelDescription",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			copyArgs(Number(n),"severity",params,undefined,false); 
			copyArgs(n,"alarmRule",params,undefined,true); 
			copyArgs(n,"alarmNotification",params,undefined,true); 
			copyArgs(n,"alarmEventActions",params,undefined,true); 
			copyArgs(n,"alarmCapabilities",params,undefined,true); 
			
			copyArgs(msg,"alarmModelName",params,undefined,false); 
			copyArgs(msg,"alarmModelDescription",params,undefined,false); 
			copyArgs(msg,"roleArn",params,undefined,false); 
			copyArgs(msg,"severity",params,undefined,false); 
			copyArgs(msg,"alarmRule",params,undefined,true); 
			copyArgs(msg,"alarmNotification",params,undefined,true); 
			copyArgs(msg,"alarmEventActions",params,undefined,true); 
			copyArgs(msg,"alarmCapabilities",params,undefined,true); 
			

			svc.updateAlarmModel(params,cb);
		}
		
		service.UpdateDetectorModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"detectorModelName",params,undefined,false); 
			copyArgs(n,"detectorModelDefinition",params,undefined,true); 
			copyArgs(n,"roleArn",params,undefined,false); 
			
			copyArgs(n,"detectorModelName",params,undefined,false); 
			copyArgs(n,"detectorModelDefinition",params,undefined,true); 
			copyArgs(n,"detectorModelDescription",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			copyArgs(n,"evaluationMethod",params,undefined,false); 
			
			copyArgs(msg,"detectorModelName",params,undefined,false); 
			copyArgs(msg,"detectorModelDefinition",params,undefined,true); 
			copyArgs(msg,"detectorModelDescription",params,undefined,false); 
			copyArgs(msg,"roleArn",params,undefined,false); 
			copyArgs(msg,"evaluationMethod",params,undefined,false); 
			

			svc.updateDetectorModel(params,cb);
		}
		
		service.UpdateInput=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"inputName",params,undefined,false); 
			copyArgs(n,"inputDefinition",params,undefined,true); 
			
			copyArgs(n,"inputName",params,undefined,false); 
			copyArgs(n,"inputDescription",params,undefined,false); 
			copyArgs(n,"inputDefinition",params,undefined,true); 
			
			copyArgs(msg,"inputName",params,undefined,false); 
			copyArgs(msg,"inputDescription",params,undefined,false); 
			copyArgs(msg,"inputDefinition",params,undefined,true); 
			

			svc.updateInput(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS IoTEvents", AmazonAPINode);

};
