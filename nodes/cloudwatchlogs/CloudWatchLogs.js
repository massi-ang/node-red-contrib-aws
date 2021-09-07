
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

		var awsService = new AWS.CloudWatchLogs( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.CloudWatchLogs(msg.AWSConfig) : awsService;

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

		
		service.AssociateKmsKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"kmsKeyId",params,undefined,false); 
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"kmsKeyId",params,undefined,false); 
			
			copyArgs(msg,"logGroupName",params,undefined,false); 
			copyArgs(msg,"kmsKeyId",params,undefined,false); 
			

			svc.associateKmsKey(params,cb);
		}

		
		service.CancelExportTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"taskId",params,undefined,false); 
			
			copyArgs(n,"taskId",params,undefined,false); 
			
			copyArgs(msg,"taskId",params,undefined,false); 
			

			svc.cancelExportTask(params,cb);
		}

		
		service.CreateExportTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"from",params,undefined,false); 
			copyArgs(n,"to",params,undefined,false); 
			copyArgs(n,"destination",params,undefined,false); 
			
			copyArgs(n,"taskName",params,undefined,false); 
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"logStreamNamePrefix",params,undefined,false); 
			copyArgs(n,"from",params,undefined,false); 
			copyArgs(n,"to",params,undefined,false); 
			copyArgs(n,"destination",params,undefined,false); 
			copyArgs(n,"destinationPrefix",params,undefined,false); 
			
			copyArgs(msg,"taskName",params,undefined,false); 
			copyArgs(msg,"logGroupName",params,undefined,false); 
			copyArgs(msg,"logStreamNamePrefix",params,undefined,false); 
			copyArgs(msg,"from",params,undefined,false); 
			copyArgs(msg,"to",params,undefined,false); 
			copyArgs(msg,"destination",params,undefined,false); 
			copyArgs(msg,"destinationPrefix",params,undefined,false); 
			

			svc.createExportTask(params,cb);
		}

		
		service.CreateLogGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"kmsKeyId",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"logGroupName",params,undefined,false); 
			copyArgs(msg,"kmsKeyId",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createLogGroup(params,cb);
		}

		
		service.CreateLogStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"logStreamName",params,undefined,false); 
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"logStreamName",params,undefined,false); 
			
			copyArgs(msg,"logGroupName",params,undefined,false); 
			copyArgs(msg,"logStreamName",params,undefined,false); 
			

			svc.createLogStream(params,cb);
		}

		
		service.DeleteDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"destinationName",params,undefined,false); 
			
			copyArgs(n,"destinationName",params,undefined,false); 
			
			copyArgs(msg,"destinationName",params,undefined,false); 
			

			svc.deleteDestination(params,cb);
		}

		
		service.DeleteLogGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			
			copyArgs(msg,"logGroupName",params,undefined,false); 
			

			svc.deleteLogGroup(params,cb);
		}

		
		service.DeleteLogStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"logStreamName",params,undefined,false); 
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"logStreamName",params,undefined,false); 
			
			copyArgs(msg,"logGroupName",params,undefined,false); 
			copyArgs(msg,"logStreamName",params,undefined,false); 
			

			svc.deleteLogStream(params,cb);
		}

		
		service.DeleteMetricFilter=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"filterName",params,undefined,false); 
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"filterName",params,undefined,false); 
			
			copyArgs(msg,"logGroupName",params,undefined,false); 
			copyArgs(msg,"filterName",params,undefined,false); 
			

			svc.deleteMetricFilter(params,cb);
		}

		
		service.DeleteQueryDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"queryDefinitionId",params,undefined,false); 
			
			copyArgs(n,"queryDefinitionId",params,undefined,false); 
			
			copyArgs(msg,"queryDefinitionId",params,undefined,false); 
			

			svc.deleteQueryDefinition(params,cb);
		}

		
		service.DeleteResourcePolicy=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"policyName",params,undefined,false); 
			
			copyArgs(msg,"policyName",params,undefined,false); 
			

			svc.deleteResourcePolicy(params,cb);
		}

		
		service.DeleteRetentionPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			
			copyArgs(msg,"logGroupName",params,undefined,false); 
			

			svc.deleteRetentionPolicy(params,cb);
		}

		
		service.DeleteSubscriptionFilter=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"filterName",params,undefined,false); 
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"filterName",params,undefined,false); 
			
			copyArgs(msg,"logGroupName",params,undefined,false); 
			copyArgs(msg,"filterName",params,undefined,false); 
			

			svc.deleteSubscriptionFilter(params,cb);
		}

		
		service.DescribeDestinations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DestinationNamePrefix",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"limit",params,undefined,false); 
			
			copyArgs(msg,"DestinationNamePrefix",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			

			svc.describeDestinations(params,cb);
		}

		
		service.DescribeExportTasks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"taskId",params,undefined,false); 
			copyArgs(n,"statusCode",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"limit",params,undefined,false); 
			
			copyArgs(msg,"taskId",params,undefined,false); 
			copyArgs(msg,"statusCode",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			

			svc.describeExportTasks(params,cb);
		}

		
		service.DescribeLogGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"logGroupNamePrefix",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"limit",params,undefined,false); 
			
			copyArgs(msg,"logGroupNamePrefix",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			

			svc.describeLogGroups(params,cb);
		}

		
		service.DescribeLogStreams=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"logStreamNamePrefix",params,undefined,false); 
			copyArgs(n,"orderBy",params,undefined,false); 
			copyArgs(n,"descending",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"limit",params,undefined,false); 
			
			copyArgs(msg,"logGroupName",params,undefined,false); 
			copyArgs(msg,"logStreamNamePrefix",params,undefined,false); 
			copyArgs(msg,"orderBy",params,undefined,false); 
			copyArgs(msg,"descending",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			

			svc.describeLogStreams(params,cb);
		}

		
		service.DescribeMetricFilters=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"filterNamePrefix",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"limit",params,undefined,false); 
			copyArgs(n,"metricName",params,undefined,false); 
			copyArgs(n,"metricNamespace",params,undefined,false); 
			
			copyArgs(msg,"logGroupName",params,undefined,false); 
			copyArgs(msg,"filterNamePrefix",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			copyArgs(msg,"metricName",params,undefined,false); 
			copyArgs(msg,"metricNamespace",params,undefined,false); 
			

			svc.describeMetricFilters(params,cb);
		}

		
		service.DescribeQueries=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"logGroupName",params,undefined,false); 
			copyArgs(msg,"status",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.describeQueries(params,cb);
		}

		
		service.DescribeQueryDefinitions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"queryDefinitionNamePrefix",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"queryDefinitionNamePrefix",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.describeQueryDefinitions(params,cb);
		}

		
		service.DescribeResourcePolicies=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"limit",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			

			svc.describeResourcePolicies(params,cb);
		}

		
		service.DescribeSubscriptionFilters=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"filterNamePrefix",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"limit",params,undefined,false); 
			
			copyArgs(msg,"logGroupName",params,undefined,false); 
			copyArgs(msg,"filterNamePrefix",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			

			svc.describeSubscriptionFilters(params,cb);
		}

		
		service.DisassociateKmsKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			
			copyArgs(msg,"logGroupName",params,undefined,false); 
			

			svc.disassociateKmsKey(params,cb);
		}

		
		service.FilterLogEvents=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"logStreamNames",params,undefined,false); 
			copyArgs(n,"logStreamNamePrefix",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(n,"filterPattern",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"limit",params,undefined,false); 
			copyArgs(n,"interleaved",params,undefined,false); 
			
			copyArgs(msg,"logGroupName",params,undefined,false); 
			copyArgs(msg,"logStreamNames",params,undefined,false); 
			copyArgs(msg,"logStreamNamePrefix",params,undefined,false); 
			copyArgs(msg,"startTime",params,undefined,false); 
			copyArgs(msg,"endTime",params,undefined,false); 
			copyArgs(msg,"filterPattern",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			copyArgs(msg,"interleaved",params,undefined,false); 
			

			svc.filterLogEvents(params,cb);
		}

		
		service.GetLogEvents=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"logStreamName",params,undefined,false); 
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"logStreamName",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"limit",params,undefined,false); 
			copyArgs(n,"startFromHead",params,undefined,false); 
			
			copyArgs(msg,"logGroupName",params,undefined,false); 
			copyArgs(msg,"logStreamName",params,undefined,false); 
			copyArgs(msg,"startTime",params,undefined,false); 
			copyArgs(msg,"endTime",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			copyArgs(msg,"startFromHead",params,undefined,false); 
			

			svc.getLogEvents(params,cb);
		}

		
		service.GetLogGroupFields=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"time",params,undefined,false); 
			
			copyArgs(msg,"logGroupName",params,undefined,false); 
			copyArgs(msg,"time",params,undefined,false); 
			

			svc.getLogGroupFields(params,cb);
		}

		
		service.GetLogRecord=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"logRecordPointer",params,undefined,false); 
			
			copyArgs(n,"logRecordPointer",params,undefined,false); 
			
			copyArgs(msg,"logRecordPointer",params,undefined,false); 
			

			svc.getLogRecord(params,cb);
		}

		
		service.GetQueryResults=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"queryId",params,undefined,false); 
			
			copyArgs(n,"queryId",params,undefined,false); 
			
			copyArgs(msg,"queryId",params,undefined,false); 
			

			svc.getQueryResults(params,cb);
		}

		
		service.ListTagsLogGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			
			copyArgs(msg,"logGroupName",params,undefined,false); 
			

			svc.listTagsLogGroup(params,cb);
		}

		
		service.PutDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"destinationName",params,undefined,false); 
			copyArgs(n,"targetArn",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			
			copyArgs(n,"destinationName",params,undefined,false); 
			copyArgs(n,"targetArn",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			
			copyArgs(msg,"destinationName",params,undefined,false); 
			copyArgs(msg,"targetArn",params,undefined,false); 
			copyArgs(msg,"roleArn",params,undefined,false); 
			

			svc.putDestination(params,cb);
		}

		
		service.PutDestinationPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"destinationName",params,undefined,false); 
			copyArgs(n,"accessPolicy",params,undefined,false); 
			
			copyArgs(n,"destinationName",params,undefined,false); 
			copyArgs(n,"accessPolicy",params,undefined,false); 
			
			copyArgs(msg,"destinationName",params,undefined,false); 
			copyArgs(msg,"accessPolicy",params,undefined,false); 
			

			svc.putDestinationPolicy(params,cb);
		}

		
		service.PutLogEvents=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"logStreamName",params,undefined,false); 
			copyArgs(n,"logEvents",params,undefined,false); 
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"logStreamName",params,undefined,false); 
			copyArgs(n,"logEvents",params,undefined,false); 
			copyArgs(n,"sequenceToken",params,undefined,false); 
			
			copyArgs(msg,"logGroupName",params,undefined,false); 
			copyArgs(msg,"logStreamName",params,undefined,false); 
			copyArgs(msg,"logEvents",params,undefined,false); 
			copyArgs(msg,"sequenceToken",params,undefined,false); 
			

			svc.putLogEvents(params,cb);
		}

		
		service.PutMetricFilter=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"filterName",params,undefined,false); 
			copyArgs(n,"filterPattern",params,undefined,false); 
			copyArgs(n,"metricTransformations",params,undefined,true); 
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"filterName",params,undefined,false); 
			copyArgs(n,"filterPattern",params,undefined,false); 
			copyArgs(n,"metricTransformations",params,undefined,true); 
			
			copyArgs(msg,"logGroupName",params,undefined,false); 
			copyArgs(msg,"filterName",params,undefined,false); 
			copyArgs(msg,"filterPattern",params,undefined,false); 
			copyArgs(msg,"metricTransformations",params,undefined,true); 
			

			svc.putMetricFilter(params,cb);
		}

		
		service.PutQueryDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"queryString",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"queryDefinitionId",params,undefined,false); 
			copyArgs(n,"logGroupNames",params,undefined,true); 
			copyArgs(n,"queryString",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"queryDefinitionId",params,undefined,false); 
			copyArgs(msg,"logGroupNames",params,undefined,true); 
			copyArgs(msg,"queryString",params,undefined,false); 
			

			svc.putQueryDefinition(params,cb);
		}

		
		service.PutResourcePolicy=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"policyName",params,undefined,false); 
			copyArgs(n,"policyDocument",params,undefined,false); 
			
			copyArgs(msg,"policyName",params,undefined,false); 
			copyArgs(msg,"policyDocument",params,undefined,false); 
			

			svc.putResourcePolicy(params,cb);
		}

		
		service.PutRetentionPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"retentionInDays",params,undefined,false); 
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"retentionInDays",params,undefined,false); 
			
			copyArgs(msg,"logGroupName",params,undefined,false); 
			copyArgs(msg,"retentionInDays",params,undefined,false); 
			

			svc.putRetentionPolicy(params,cb);
		}

		
		service.PutSubscriptionFilter=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"filterName",params,undefined,false); 
			copyArgs(n,"filterPattern",params,undefined,false); 
			copyArgs(n,"destinationArn",params,undefined,false); 
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"filterName",params,undefined,false); 
			copyArgs(n,"filterPattern",params,undefined,false); 
			copyArgs(n,"destinationArn",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			copyArgs(n,"distribution",params,undefined,false); 
			
			copyArgs(msg,"logGroupName",params,undefined,false); 
			copyArgs(msg,"filterName",params,undefined,false); 
			copyArgs(msg,"filterPattern",params,undefined,false); 
			copyArgs(msg,"destinationArn",params,undefined,false); 
			copyArgs(msg,"roleArn",params,undefined,false); 
			copyArgs(msg,"distribution",params,undefined,false); 
			

			svc.putSubscriptionFilter(params,cb);
		}

		
		service.StartQuery=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(n,"queryString",params,undefined,false); 
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"logGroupNames",params,undefined,true); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(n,"queryString",params,undefined,false); 
			copyArgs(n,"limit",params,undefined,false); 
			
			copyArgs(msg,"logGroupName",params,undefined,false); 
			copyArgs(msg,"logGroupNames",params,undefined,true); 
			copyArgs(msg,"startTime",params,undefined,false); 
			copyArgs(msg,"endTime",params,undefined,false); 
			copyArgs(msg,"queryString",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			

			svc.startQuery(params,cb);
		}

		
		service.StopQuery=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"queryId",params,undefined,false); 
			
			copyArgs(n,"queryId",params,undefined,false); 
			
			copyArgs(msg,"queryId",params,undefined,false); 
			

			svc.stopQuery(params,cb);
		}

		
		service.TagLogGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"logGroupName",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.tagLogGroup(params,cb);
		}

		
		service.TestMetricFilter=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"filterPattern",params,undefined,false); 
			copyArgs(n,"logEventMessages",params,undefined,false); 
			
			copyArgs(n,"filterPattern",params,undefined,false); 
			copyArgs(n,"logEventMessages",params,undefined,false); 
			
			copyArgs(msg,"filterPattern",params,undefined,false); 
			copyArgs(msg,"logEventMessages",params,undefined,false); 
			

			svc.testMetricFilter(params,cb);
		}

		
		service.UntagLogGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,false); 
			
			copyArgs(n,"logGroupName",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,false); 
			
			copyArgs(msg,"logGroupName",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,false); 
			

			svc.untagLogGroup(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS CloudWatchLogs", AmazonAPINode);

};
