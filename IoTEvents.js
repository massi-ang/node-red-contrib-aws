
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

		var awsService = new AWS.IoTEvents( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.IoTEvents(msg.AWSConfig) : awsService;

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

		
		service.CreateAlarmModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"alarmModelName",params,undefined,false); 
			copyArg(n,"roleArn",params,undefined,false); 
			copyArg(n,"alarmRule",params,undefined,true); 
			
			copyArg(msg,"alarmModelName",params,undefined,false); 
			copyArg(msg,"alarmModelDescription",params,undefined,false); 
			copyArg(msg,"roleArn",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"key",params,undefined,false); 
			copyArg(msg,"severity",params,undefined,false); 
			copyArg(msg,"alarmRule",params,undefined,true); 
			copyArg(msg,"alarmNotification",params,undefined,true); 
			copyArg(msg,"alarmEventActions",params,undefined,true); 
			copyArg(msg,"alarmCapabilities",params,undefined,true); 
			

			svc.createAlarmModel(params,cb);
		}

		
		service.CreateDetectorModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"detectorModelName",params,undefined,false); 
			copyArg(n,"detectorModelDefinition",params,undefined,true); 
			copyArg(n,"roleArn",params,undefined,false); 
			
			copyArg(msg,"detectorModelName",params,undefined,false); 
			copyArg(msg,"detectorModelDefinition",params,undefined,true); 
			copyArg(msg,"detectorModelDescription",params,undefined,false); 
			copyArg(msg,"key",params,undefined,false); 
			copyArg(msg,"roleArn",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"evaluationMethod",params,undefined,false); 
			

			svc.createDetectorModel(params,cb);
		}

		
		service.CreateInput=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"inputName",params,undefined,false); 
			copyArg(n,"inputDefinition",params,undefined,true); 
			
			copyArg(msg,"inputName",params,undefined,false); 
			copyArg(msg,"inputDescription",params,undefined,false); 
			copyArg(msg,"inputDefinition",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createInput(params,cb);
		}

		
		service.DeleteAlarmModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"alarmModelName",params,undefined,false); 
			
			copyArg(msg,"alarmModelName",params,undefined,false); 
			

			svc.deleteAlarmModel(params,cb);
		}

		
		service.DeleteDetectorModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"detectorModelName",params,undefined,false); 
			
			copyArg(msg,"detectorModelName",params,undefined,false); 
			

			svc.deleteDetectorModel(params,cb);
		}

		
		service.DeleteInput=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"inputName",params,undefined,false); 
			
			copyArg(msg,"inputName",params,undefined,false); 
			

			svc.deleteInput(params,cb);
		}

		
		service.DescribeAlarmModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"alarmModelName",params,undefined,false); 
			
			copyArg(msg,"alarmModelName",params,undefined,false); 
			copyArg(msg,"alarmModelVersion",params,undefined,false); 
			

			svc.describeAlarmModel(params,cb);
		}

		
		service.DescribeDetectorModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"detectorModelName",params,undefined,false); 
			
			copyArg(msg,"detectorModelName",params,undefined,false); 
			copyArg(msg,"detectorModelVersion",params,undefined,false); 
			

			svc.describeDetectorModel(params,cb);
		}

		
		service.DescribeDetectorModelAnalysis=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"analysisId",params,undefined,false); 
			
			copyArg(msg,"analysisId",params,undefined,false); 
			

			svc.describeDetectorModelAnalysis(params,cb);
		}

		
		service.DescribeInput=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"inputName",params,undefined,false); 
			
			copyArg(msg,"inputName",params,undefined,false); 
			

			svc.describeInput(params,cb);
		}

		
		service.DescribeLoggingOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeLoggingOptions(params,cb);
		}

		
		service.GetDetectorModelAnalysisResults=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"analysisId",params,undefined,false); 
			
			copyArg(msg,"analysisId",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.getDetectorModelAnalysisResults(params,cb);
		}

		
		service.ListAlarmModelVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"alarmModelName",params,undefined,false); 
			
			copyArg(msg,"alarmModelName",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listAlarmModelVersions(params,cb);
		}

		
		service.ListAlarmModels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listAlarmModels(params,cb);
		}

		
		service.ListDetectorModelVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"detectorModelName",params,undefined,false); 
			
			copyArg(msg,"detectorModelName",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listDetectorModelVersions(params,cb);
		}

		
		service.ListDetectorModels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listDetectorModels(params,cb);
		}

		
		service.ListInputRoutings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"inputIdentifier",params,undefined,false); 
			
			copyArg(msg,"inputIdentifier",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listInputRoutings(params,cb);
		}

		
		service.ListInputs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listInputs(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutLoggingOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"loggingOptions",params,undefined,true); 
			
			copyArg(msg,"loggingOptions",params,undefined,true); 
			

			svc.putLoggingOptions(params,cb);
		}

		
		service.StartDetectorModelAnalysis=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"detectorModelDefinition",params,undefined,true); 
			
			copyArg(msg,"detectorModelDefinition",params,undefined,true); 
			

			svc.startDetectorModelAnalysis(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"tags",params,undefined,true); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"tagKeys",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateAlarmModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"alarmModelName",params,undefined,false); 
			copyArg(n,"roleArn",params,undefined,false); 
			copyArg(n,"alarmRule",params,undefined,true); 
			
			copyArg(msg,"alarmModelName",params,undefined,false); 
			copyArg(msg,"alarmModelDescription",params,undefined,false); 
			copyArg(msg,"roleArn",params,undefined,false); 
			copyArg(msg,"severity",params,undefined,false); 
			copyArg(msg,"alarmRule",params,undefined,true); 
			copyArg(msg,"alarmNotification",params,undefined,true); 
			copyArg(msg,"alarmEventActions",params,undefined,true); 
			copyArg(msg,"alarmCapabilities",params,undefined,true); 
			

			svc.updateAlarmModel(params,cb);
		}

		
		service.UpdateDetectorModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"detectorModelName",params,undefined,false); 
			copyArg(n,"detectorModelDefinition",params,undefined,true); 
			copyArg(n,"roleArn",params,undefined,false); 
			
			copyArg(msg,"detectorModelName",params,undefined,false); 
			copyArg(msg,"detectorModelDefinition",params,undefined,true); 
			copyArg(msg,"detectorModelDescription",params,undefined,false); 
			copyArg(msg,"roleArn",params,undefined,false); 
			copyArg(msg,"evaluationMethod",params,undefined,false); 
			

			svc.updateDetectorModel(params,cb);
		}

		
		service.UpdateInput=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"inputName",params,undefined,false); 
			copyArg(n,"inputDefinition",params,undefined,true); 
			
			copyArg(msg,"inputName",params,undefined,false); 
			copyArg(msg,"inputDescription",params,undefined,false); 
			copyArg(msg,"inputDefinition",params,undefined,true); 
			

			svc.updateInput(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS IoTEvents", AmazonAPINode);

};
