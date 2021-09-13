
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

		var awsService = new AWS.CodeGuruProfiler( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.CodeGuruProfiler(msg.AWSConfig) : awsService;

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
		
		service.AddNotificationChannels=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"channels",params,undefined,true); 
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			
			copyArgs(n,"channels",params,undefined,true); 
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			
			copyArgs(msg,"channels",params,undefined,true); 
			copyArgs(msg,"profilingGroupName",params,undefined,false); 
			

			svc.addNotificationChannels(params,cb);
		}
		
		service.BatchGetFrameMetricData=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			
			copyArgs(n,"endTime",params,undefined,true); 
			copyArgs(n,"frameMetrics",params,undefined,false); 
			copyArgs(n,"period",params,undefined,false); 
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,true); 
			copyArgs(n,"targetResolution",params,undefined,false); 
			
			copyArgs(msg,"endTime",params,undefined,true); 
			copyArgs(msg,"frameMetrics",params,undefined,false); 
			copyArgs(msg,"period",params,undefined,false); 
			copyArgs(msg,"profilingGroupName",params,undefined,false); 
			copyArgs(msg,"startTime",params,undefined,true); 
			copyArgs(msg,"targetResolution",params,undefined,false); 
			

			svc.batchGetFrameMetricData(params,cb);
		}
		
		service.ConfigureAgent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			
			copyArgs(n,"fleetInstanceId",params,undefined,false); 
			copyArgs(n,"metadata",params,undefined,false); 
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			
			copyArgs(msg,"fleetInstanceId",params,undefined,false); 
			copyArgs(msg,"metadata",params,undefined,false); 
			copyArgs(msg,"profilingGroupName",params,undefined,false); 
			

			svc.configureAgent(params,cb);
		}
		
		service.CreateProfilingGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			
			copyArgs(n,"agentOrchestrationConfig",params,undefined,true); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"computePlatform",params,undefined,false); 
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"agentOrchestrationConfig",params,undefined,true); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"computePlatform",params,undefined,false); 
			copyArgs(msg,"profilingGroupName",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createProfilingGroup(params,cb);
		}
		
		service.DeleteProfilingGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			
			copyArgs(msg,"profilingGroupName",params,undefined,false); 
			

			svc.deleteProfilingGroup(params,cb);
		}
		
		service.DescribeProfilingGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			
			copyArgs(msg,"profilingGroupName",params,undefined,false); 
			

			svc.describeProfilingGroup(params,cb);
		}
		
		service.GetFindingsReportAccountSummary=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"dailyReportsOnly",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"dailyReportsOnly",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.getFindingsReportAccountSummary(params,cb);
		}
		
		service.GetNotificationConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			
			copyArgs(msg,"profilingGroupName",params,undefined,false); 
			

			svc.getNotificationConfiguration(params,cb);
		}
		
		service.GetPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			
			copyArgs(msg,"profilingGroupName",params,undefined,false); 
			

			svc.getPolicy(params,cb);
		}
		
		service.GetProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			
			copyArgs(n,"accept",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,true); 
			copyArgs(Number(n),"maxDepth",params,undefined,false); 
			copyArgs(n,"period",params,undefined,false); 
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,true); 
			
			copyArgs(msg,"accept",params,undefined,false); 
			copyArgs(msg,"endTime",params,undefined,true); 
			copyArgs(msg,"maxDepth",params,undefined,false); 
			copyArgs(msg,"period",params,undefined,false); 
			copyArgs(msg,"profilingGroupName",params,undefined,false); 
			copyArgs(msg,"startTime",params,undefined,true); 
			

			svc.getProfile(params,cb);
		}
		
		service.GetRecommendations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"endTime",params,undefined,true); 
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,true); 
			
			copyArgs(n,"endTime",params,undefined,true); 
			copyArgs(n,"locale",params,undefined,false); 
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,true); 
			
			copyArgs(msg,"endTime",params,undefined,true); 
			copyArgs(msg,"locale",params,undefined,false); 
			copyArgs(msg,"profilingGroupName",params,undefined,false); 
			copyArgs(msg,"startTime",params,undefined,true); 
			

			svc.getRecommendations(params,cb);
		}
		
		service.ListFindingsReports=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"endTime",params,undefined,true); 
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,true); 
			
			copyArgs(Boolean(n),"dailyReportsOnly",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,true); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,true); 
			
			copyArgs(msg,"dailyReportsOnly",params,undefined,false); 
			copyArgs(msg,"endTime",params,undefined,true); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"profilingGroupName",params,undefined,false); 
			copyArgs(msg,"startTime",params,undefined,true); 
			

			svc.listFindingsReports(params,cb);
		}
		
		service.ListProfileTimes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"endTime",params,undefined,true); 
			copyArgs(n,"period",params,undefined,false); 
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,true); 
			
			copyArgs(n,"endTime",params,undefined,true); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"orderBy",params,undefined,false); 
			copyArgs(n,"period",params,undefined,false); 
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,true); 
			
			copyArgs(msg,"endTime",params,undefined,true); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"orderBy",params,undefined,false); 
			copyArgs(msg,"period",params,undefined,false); 
			copyArgs(msg,"profilingGroupName",params,undefined,false); 
			copyArgs(msg,"startTime",params,undefined,true); 
			

			svc.listProfileTimes(params,cb);
		}
		
		service.ListProfilingGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"includeDescription",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"includeDescription",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listProfilingGroups(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.PostAgentProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"agentProfile",params,undefined,false); 
			copyArgs(n,"contentType",params,undefined,false); 
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			
			copyArgs(n,"agentProfile",params,undefined,false); 
			copyArgs(n,"contentType",params,undefined,false); 
			copyArgs(n,"profileToken",params,undefined,false); 
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			
			copyArgs(msg,"agentProfile",params,undefined,false); 
			copyArgs(msg,"contentType",params,undefined,false); 
			copyArgs(msg,"profileToken",params,undefined,false); 
			copyArgs(msg,"profilingGroupName",params,undefined,false); 
			

			svc.postAgentProfile(params,cb);
		}
		
		service.PutPermission=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"actionGroup",params,undefined,false); 
			copyArgs(n,"principals",params,undefined,false); 
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			
			copyArgs(n,"actionGroup",params,undefined,false); 
			copyArgs(n,"principals",params,undefined,false); 
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			copyArgs(n,"revisionId",params,undefined,false); 
			
			copyArgs(msg,"actionGroup",params,undefined,false); 
			copyArgs(msg,"principals",params,undefined,false); 
			copyArgs(msg,"profilingGroupName",params,undefined,false); 
			copyArgs(msg,"revisionId",params,undefined,false); 
			

			svc.putPermission(params,cb);
		}
		
		service.RemoveNotificationChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"channelId",params,undefined,false); 
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			
			copyArgs(n,"channelId",params,undefined,false); 
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			
			copyArgs(msg,"channelId",params,undefined,false); 
			copyArgs(msg,"profilingGroupName",params,undefined,false); 
			

			svc.removeNotificationChannel(params,cb);
		}
		
		service.RemovePermission=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"actionGroup",params,undefined,false); 
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			copyArgs(n,"revisionId",params,undefined,false); 
			
			copyArgs(n,"actionGroup",params,undefined,false); 
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			copyArgs(n,"revisionId",params,undefined,false); 
			
			copyArgs(msg,"actionGroup",params,undefined,false); 
			copyArgs(msg,"profilingGroupName",params,undefined,false); 
			copyArgs(msg,"revisionId",params,undefined,false); 
			

			svc.removePermission(params,cb);
		}
		
		service.SubmitFeedback=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"anomalyInstanceId",params,undefined,false); 
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			copyArgs(n,"_type",params,"type",false); 
			
			copyArgs(n,"anomalyInstanceId",params,undefined,false); 
			copyArgs(n,"comment",params,undefined,false); 
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			copyArgs(n,"type",params,undefined,false); 
			
			copyArgs(msg,"anomalyInstanceId",params,undefined,false); 
			copyArgs(msg,"comment",params,undefined,false); 
			copyArgs(msg,"profilingGroupName",params,undefined,false); 
			copyArgs(msg,"type",params,undefined,false); 
			

			svc.submitFeedback(params,cb);
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
		
		service.UpdateProfilingGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"agentOrchestrationConfig",params,undefined,true); 
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			
			copyArgs(n,"agentOrchestrationConfig",params,undefined,true); 
			copyArgs(n,"profilingGroupName",params,undefined,false); 
			
			copyArgs(msg,"agentOrchestrationConfig",params,undefined,true); 
			copyArgs(msg,"profilingGroupName",params,undefined,false); 
			

			svc.updateProfilingGroup(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS CodeGuruProfiler", AmazonAPINode);

};
