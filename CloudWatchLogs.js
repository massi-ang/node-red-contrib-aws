
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

		var awsService = new AWS.CloudWatchLogs( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.CloudWatchLogs(msg.AWSConfig) : awsService;

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

		
		service.AssociateKmsKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"logGroupName",params,undefined,false); 
			copyArg(n,"kmsKeyId",params,undefined,false); 
			
			copyArg(msg,"logGroupName",params,undefined,false); 
			copyArg(msg,"kmsKeyId",params,undefined,false); 
			

			svc.associateKmsKey(params,cb);
		}

		
		service.CancelExportTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"taskId",params,undefined,false); 
			
			copyArg(msg,"taskId",params,undefined,false); 
			

			svc.cancelExportTask(params,cb);
		}

		
		service.CreateExportTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"logGroupName",params,undefined,false); 
			copyArg(n,"from",params,undefined,false); 
			copyArg(n,"to",params,undefined,false); 
			copyArg(n,"destination",params,undefined,false); 
			
			copyArg(msg,"taskName",params,undefined,false); 
			copyArg(msg,"logGroupName",params,undefined,false); 
			copyArg(msg,"logStreamNamePrefix",params,undefined,false); 
			copyArg(msg,"from",params,undefined,false); 
			copyArg(msg,"to",params,undefined,false); 
			copyArg(msg,"destination",params,undefined,false); 
			copyArg(msg,"destinationPrefix",params,undefined,false); 
			

			svc.createExportTask(params,cb);
		}

		
		service.CreateLogGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"logGroupName",params,undefined,false); 
			
			copyArg(msg,"logGroupName",params,undefined,false); 
			copyArg(msg,"kmsKeyId",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createLogGroup(params,cb);
		}

		
		service.CreateLogStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"logGroupName",params,undefined,false); 
			copyArg(n,"logStreamName",params,undefined,false); 
			
			copyArg(msg,"logGroupName",params,undefined,false); 
			copyArg(msg,"logStreamName",params,undefined,false); 
			

			svc.createLogStream(params,cb);
		}

		
		service.DeleteDestination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"destinationName",params,undefined,false); 
			
			copyArg(msg,"destinationName",params,undefined,false); 
			

			svc.deleteDestination(params,cb);
		}

		
		service.DeleteLogGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"logGroupName",params,undefined,false); 
			
			copyArg(msg,"logGroupName",params,undefined,false); 
			

			svc.deleteLogGroup(params,cb);
		}

		
		service.DeleteLogStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"logGroupName",params,undefined,false); 
			copyArg(n,"logStreamName",params,undefined,false); 
			
			copyArg(msg,"logGroupName",params,undefined,false); 
			copyArg(msg,"logStreamName",params,undefined,false); 
			

			svc.deleteLogStream(params,cb);
		}

		
		service.DeleteMetricFilter=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"logGroupName",params,undefined,false); 
			copyArg(n,"filterName",params,undefined,false); 
			
			copyArg(msg,"logGroupName",params,undefined,false); 
			copyArg(msg,"filterName",params,undefined,false); 
			

			svc.deleteMetricFilter(params,cb);
		}

		
		service.DeleteQueryDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"queryDefinitionId",params,undefined,false); 
			
			copyArg(msg,"queryDefinitionId",params,undefined,false); 
			

			svc.deleteQueryDefinition(params,cb);
		}

		
		service.DeleteResourcePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"policyName",params,undefined,false); 
			

			svc.deleteResourcePolicy(params,cb);
		}

		
		service.DeleteRetentionPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"logGroupName",params,undefined,false); 
			
			copyArg(msg,"logGroupName",params,undefined,false); 
			

			svc.deleteRetentionPolicy(params,cb);
		}

		
		service.DeleteSubscriptionFilter=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"logGroupName",params,undefined,false); 
			copyArg(n,"filterName",params,undefined,false); 
			
			copyArg(msg,"logGroupName",params,undefined,false); 
			copyArg(msg,"filterName",params,undefined,false); 
			

			svc.deleteSubscriptionFilter(params,cb);
		}

		
		service.DescribeDestinations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DestinationNamePrefix",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			

			svc.describeDestinations(params,cb);
		}

		
		service.DescribeExportTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"taskId",params,undefined,false); 
			copyArg(msg,"statusCode",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			

			svc.describeExportTasks(params,cb);
		}

		
		service.DescribeLogGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"logGroupNamePrefix",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			

			svc.describeLogGroups(params,cb);
		}

		
		service.DescribeLogStreams=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"logGroupName",params,undefined,false); 
			
			copyArg(msg,"logGroupName",params,undefined,false); 
			copyArg(msg,"logStreamNamePrefix",params,undefined,false); 
			copyArg(msg,"orderBy",params,undefined,false); 
			copyArg(msg,"descending",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			

			svc.describeLogStreams(params,cb);
		}

		
		service.DescribeMetricFilters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"logGroupName",params,undefined,false); 
			copyArg(msg,"filterNamePrefix",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			copyArg(msg,"metricName",params,undefined,false); 
			copyArg(msg,"metricNamespace",params,undefined,false); 
			

			svc.describeMetricFilters(params,cb);
		}

		
		service.DescribeQueries=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"logGroupName",params,undefined,false); 
			copyArg(msg,"status",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.describeQueries(params,cb);
		}

		
		service.DescribeQueryDefinitions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"queryDefinitionNamePrefix",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.describeQueryDefinitions(params,cb);
		}

		
		service.DescribeResourcePolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			

			svc.describeResourcePolicies(params,cb);
		}

		
		service.DescribeSubscriptionFilters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"logGroupName",params,undefined,false); 
			
			copyArg(msg,"logGroupName",params,undefined,false); 
			copyArg(msg,"filterNamePrefix",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			

			svc.describeSubscriptionFilters(params,cb);
		}

		
		service.DisassociateKmsKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"logGroupName",params,undefined,false); 
			
			copyArg(msg,"logGroupName",params,undefined,false); 
			

			svc.disassociateKmsKey(params,cb);
		}

		
		service.FilterLogEvents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"logGroupName",params,undefined,false); 
			
			copyArg(msg,"logGroupName",params,undefined,false); 
			copyArg(msg,"logStreamNames",params,undefined,false); 
			copyArg(msg,"logStreamNamePrefix",params,undefined,false); 
			copyArg(msg,"startTime",params,undefined,false); 
			copyArg(msg,"endTime",params,undefined,false); 
			copyArg(msg,"filterPattern",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			copyArg(msg,"interleaved",params,undefined,false); 
			

			svc.filterLogEvents(params,cb);
		}

		
		service.GetLogEvents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"logGroupName",params,undefined,false); 
			copyArg(n,"logStreamName",params,undefined,false); 
			
			copyArg(msg,"logGroupName",params,undefined,false); 
			copyArg(msg,"logStreamName",params,undefined,false); 
			copyArg(msg,"startTime",params,undefined,false); 
			copyArg(msg,"endTime",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			copyArg(msg,"startFromHead",params,undefined,false); 
			

			svc.getLogEvents(params,cb);
		}

		
		service.GetLogGroupFields=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"logGroupName",params,undefined,false); 
			
			copyArg(msg,"logGroupName",params,undefined,false); 
			copyArg(msg,"time",params,undefined,false); 
			

			svc.getLogGroupFields(params,cb);
		}

		
		service.GetLogRecord=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"logRecordPointer",params,undefined,false); 
			
			copyArg(msg,"logRecordPointer",params,undefined,false); 
			

			svc.getLogRecord(params,cb);
		}

		
		service.GetQueryResults=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"queryId",params,undefined,false); 
			
			copyArg(msg,"queryId",params,undefined,false); 
			

			svc.getQueryResults(params,cb);
		}

		
		service.ListTagsLogGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"logGroupName",params,undefined,false); 
			
			copyArg(msg,"logGroupName",params,undefined,false); 
			

			svc.listTagsLogGroup(params,cb);
		}

		
		service.PutDestination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"destinationName",params,undefined,false); 
			copyArg(n,"targetArn",params,undefined,false); 
			copyArg(n,"roleArn",params,undefined,false); 
			
			copyArg(msg,"destinationName",params,undefined,false); 
			copyArg(msg,"targetArn",params,undefined,false); 
			copyArg(msg,"roleArn",params,undefined,false); 
			

			svc.putDestination(params,cb);
		}

		
		service.PutDestinationPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"destinationName",params,undefined,false); 
			copyArg(n,"accessPolicy",params,undefined,false); 
			
			copyArg(msg,"destinationName",params,undefined,false); 
			copyArg(msg,"accessPolicy",params,undefined,false); 
			

			svc.putDestinationPolicy(params,cb);
		}

		
		service.PutLogEvents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"logGroupName",params,undefined,false); 
			copyArg(n,"logStreamName",params,undefined,false); 
			copyArg(n,"logEvents",params,undefined,false); 
			
			copyArg(msg,"logGroupName",params,undefined,false); 
			copyArg(msg,"logStreamName",params,undefined,false); 
			copyArg(msg,"logEvents",params,undefined,false); 
			copyArg(msg,"sequenceToken",params,undefined,false); 
			

			svc.putLogEvents(params,cb);
		}

		
		service.PutMetricFilter=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"logGroupName",params,undefined,false); 
			copyArg(n,"filterName",params,undefined,false); 
			copyArg(n,"filterPattern",params,undefined,false); 
			copyArg(n,"metricTransformations",params,undefined,true); 
			
			copyArg(msg,"logGroupName",params,undefined,false); 
			copyArg(msg,"filterName",params,undefined,false); 
			copyArg(msg,"filterPattern",params,undefined,false); 
			copyArg(msg,"metricTransformations",params,undefined,true); 
			

			svc.putMetricFilter(params,cb);
		}

		
		service.PutQueryDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"queryString",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"queryDefinitionId",params,undefined,false); 
			copyArg(msg,"logGroupNames",params,undefined,true); 
			copyArg(msg,"queryString",params,undefined,false); 
			

			svc.putQueryDefinition(params,cb);
		}

		
		service.PutResourcePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"policyName",params,undefined,false); 
			copyArg(msg,"policyDocument",params,undefined,false); 
			

			svc.putResourcePolicy(params,cb);
		}

		
		service.PutRetentionPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"logGroupName",params,undefined,false); 
			copyArg(n,"retentionInDays",params,undefined,false); 
			
			copyArg(msg,"logGroupName",params,undefined,false); 
			copyArg(msg,"retentionInDays",params,undefined,false); 
			

			svc.putRetentionPolicy(params,cb);
		}

		
		service.PutSubscriptionFilter=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"logGroupName",params,undefined,false); 
			copyArg(n,"filterName",params,undefined,false); 
			copyArg(n,"filterPattern",params,undefined,false); 
			copyArg(n,"destinationArn",params,undefined,false); 
			
			copyArg(msg,"logGroupName",params,undefined,false); 
			copyArg(msg,"filterName",params,undefined,false); 
			copyArg(msg,"filterPattern",params,undefined,false); 
			copyArg(msg,"destinationArn",params,undefined,false); 
			copyArg(msg,"roleArn",params,undefined,false); 
			copyArg(msg,"distribution",params,undefined,false); 
			

			svc.putSubscriptionFilter(params,cb);
		}

		
		service.StartQuery=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"startTime",params,undefined,false); 
			copyArg(n,"endTime",params,undefined,false); 
			copyArg(n,"queryString",params,undefined,false); 
			
			copyArg(msg,"logGroupName",params,undefined,false); 
			copyArg(msg,"logGroupNames",params,undefined,true); 
			copyArg(msg,"startTime",params,undefined,false); 
			copyArg(msg,"endTime",params,undefined,false); 
			copyArg(msg,"queryString",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			

			svc.startQuery(params,cb);
		}

		
		service.StopQuery=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"queryId",params,undefined,false); 
			
			copyArg(msg,"queryId",params,undefined,false); 
			

			svc.stopQuery(params,cb);
		}

		
		service.TagLogGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"logGroupName",params,undefined,false); 
			copyArg(n,"tags",params,undefined,true); 
			
			copyArg(msg,"logGroupName",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.tagLogGroup(params,cb);
		}

		
		service.TestMetricFilter=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"filterPattern",params,undefined,false); 
			copyArg(n,"logEventMessages",params,undefined,false); 
			
			copyArg(msg,"filterPattern",params,undefined,false); 
			copyArg(msg,"logEventMessages",params,undefined,false); 
			

			svc.testMetricFilter(params,cb);
		}

		
		service.UntagLogGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"logGroupName",params,undefined,false); 
			copyArg(n,"tags",params,undefined,false); 
			
			copyArg(msg,"logGroupName",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,false); 
			

			svc.untagLogGroup(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS CloudWatchLogs", AmazonAPINode);

};
