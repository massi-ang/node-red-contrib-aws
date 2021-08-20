
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

		var awsService = new AWS.CodeGuruProfiler( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.CodeGuruProfiler(msg.AWSConfig) : awsService;

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

		
		service.AddNotificationChannels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"channels",params,undefined,true); 
			copyArg(n,"profilingGroupName",params,undefined,false); 
			
			copyArg(msg,"channels",params,undefined,true); 
			copyArg(msg,"profilingGroupName",params,undefined,false); 
			

			svc.addNotificationChannels(params,cb);
		}

		
		service.BatchGetFrameMetricData=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"profilingGroupName",params,undefined,false); 
			
			copyArg(msg,"endTime",params,undefined,true); 
			copyArg(msg,"frameMetrics",params,undefined,false); 
			copyArg(msg,"period",params,undefined,false); 
			copyArg(msg,"profilingGroupName",params,undefined,false); 
			copyArg(msg,"startTime",params,undefined,true); 
			copyArg(msg,"targetResolution",params,undefined,false); 
			

			svc.batchGetFrameMetricData(params,cb);
		}

		
		service.ConfigureAgent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"profilingGroupName",params,undefined,false); 
			
			copyArg(msg,"fleetInstanceId",params,undefined,false); 
			copyArg(msg,"metadata",params,undefined,false); 
			copyArg(msg,"profilingGroupName",params,undefined,false); 
			

			svc.configureAgent(params,cb);
		}

		
		service.CreateProfilingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"clientToken",params,undefined,false); 
			copyArg(n,"profilingGroupName",params,undefined,false); 
			
			copyArg(msg,"agentOrchestrationConfig",params,undefined,true); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"computePlatform",params,undefined,false); 
			copyArg(msg,"profilingGroupName",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createProfilingGroup(params,cb);
		}

		
		service.DeleteProfilingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"profilingGroupName",params,undefined,false); 
			
			copyArg(msg,"profilingGroupName",params,undefined,false); 
			

			svc.deleteProfilingGroup(params,cb);
		}

		
		service.DescribeProfilingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"profilingGroupName",params,undefined,false); 
			
			copyArg(msg,"profilingGroupName",params,undefined,false); 
			

			svc.describeProfilingGroup(params,cb);
		}

		
		service.GetFindingsReportAccountSummary=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"dailyReportsOnly",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.getFindingsReportAccountSummary(params,cb);
		}

		
		service.GetNotificationConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"profilingGroupName",params,undefined,false); 
			
			copyArg(msg,"profilingGroupName",params,undefined,false); 
			

			svc.getNotificationConfiguration(params,cb);
		}

		
		service.GetPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"profilingGroupName",params,undefined,false); 
			
			copyArg(msg,"profilingGroupName",params,undefined,false); 
			

			svc.getPolicy(params,cb);
		}

		
		service.GetProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"profilingGroupName",params,undefined,false); 
			
			copyArg(msg,"accept",params,undefined,false); 
			copyArg(msg,"endTime",params,undefined,true); 
			copyArg(msg,"maxDepth",params,undefined,false); 
			copyArg(msg,"period",params,undefined,false); 
			copyArg(msg,"profilingGroupName",params,undefined,false); 
			copyArg(msg,"startTime",params,undefined,true); 
			

			svc.getProfile(params,cb);
		}

		
		service.GetRecommendations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"endTime",params,undefined,true); 
			copyArg(n,"profilingGroupName",params,undefined,false); 
			copyArg(n,"startTime",params,undefined,true); 
			
			copyArg(msg,"endTime",params,undefined,true); 
			copyArg(msg,"locale",params,undefined,false); 
			copyArg(msg,"profilingGroupName",params,undefined,false); 
			copyArg(msg,"startTime",params,undefined,true); 
			

			svc.getRecommendations(params,cb);
		}

		
		service.ListFindingsReports=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"endTime",params,undefined,true); 
			copyArg(n,"profilingGroupName",params,undefined,false); 
			copyArg(n,"startTime",params,undefined,true); 
			
			copyArg(msg,"dailyReportsOnly",params,undefined,false); 
			copyArg(msg,"endTime",params,undefined,true); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"profilingGroupName",params,undefined,false); 
			copyArg(msg,"startTime",params,undefined,true); 
			

			svc.listFindingsReports(params,cb);
		}

		
		service.ListProfileTimes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"endTime",params,undefined,true); 
			copyArg(n,"period",params,undefined,false); 
			copyArg(n,"profilingGroupName",params,undefined,false); 
			copyArg(n,"startTime",params,undefined,true); 
			
			copyArg(msg,"endTime",params,undefined,true); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"orderBy",params,undefined,false); 
			copyArg(msg,"period",params,undefined,false); 
			copyArg(msg,"profilingGroupName",params,undefined,false); 
			copyArg(msg,"startTime",params,undefined,true); 
			

			svc.listProfileTimes(params,cb);
		}

		
		service.ListProfilingGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"includeDescription",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listProfilingGroups(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PostAgentProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"agentProfile",params,undefined,false); 
			copyArg(n,"contentType",params,undefined,false); 
			copyArg(n,"profilingGroupName",params,undefined,false); 
			
			copyArg(msg,"agentProfile",params,undefined,false); 
			copyArg(msg,"contentType",params,undefined,false); 
			copyArg(msg,"profileToken",params,undefined,false); 
			copyArg(msg,"profilingGroupName",params,undefined,false); 
			

			svc.postAgentProfile(params,cb);
		}

		
		service.PutPermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"actionGroup",params,undefined,false); 
			copyArg(n,"principals",params,undefined,false); 
			copyArg(n,"profilingGroupName",params,undefined,false); 
			
			copyArg(msg,"actionGroup",params,undefined,false); 
			copyArg(msg,"principals",params,undefined,false); 
			copyArg(msg,"profilingGroupName",params,undefined,false); 
			copyArg(msg,"revisionId",params,undefined,false); 
			

			svc.putPermission(params,cb);
		}

		
		service.RemoveNotificationChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"channelId",params,undefined,false); 
			copyArg(n,"profilingGroupName",params,undefined,false); 
			
			copyArg(msg,"channelId",params,undefined,false); 
			copyArg(msg,"profilingGroupName",params,undefined,false); 
			

			svc.removeNotificationChannel(params,cb);
		}

		
		service.RemovePermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"actionGroup",params,undefined,false); 
			copyArg(n,"profilingGroupName",params,undefined,false); 
			copyArg(n,"revisionId",params,undefined,false); 
			
			copyArg(msg,"actionGroup",params,undefined,false); 
			copyArg(msg,"profilingGroupName",params,undefined,false); 
			copyArg(msg,"revisionId",params,undefined,false); 
			

			svc.removePermission(params,cb);
		}

		
		service.SubmitFeedback=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"anomalyInstanceId",params,undefined,false); 
			copyArg(n,"profilingGroupName",params,undefined,false); 
			copyArg(n,"_type",params,"type",false); 
			
			copyArg(msg,"anomalyInstanceId",params,undefined,false); 
			copyArg(msg,"comment",params,undefined,false); 
			copyArg(msg,"profilingGroupName",params,undefined,false); 
			copyArg(msg,"type",params,undefined,false); 
			

			svc.submitFeedback(params,cb);
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

		
		service.UpdateProfilingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"agentOrchestrationConfig",params,undefined,true); 
			copyArg(n,"profilingGroupName",params,undefined,false); 
			
			copyArg(msg,"agentOrchestrationConfig",params,undefined,true); 
			copyArg(msg,"profilingGroupName",params,undefined,false); 
			

			svc.updateProfilingGroup(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS CodeGuruProfiler", AmazonAPINode);

};
