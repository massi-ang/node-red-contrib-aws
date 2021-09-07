
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

		var awsService = new AWS.IoTAnalytics( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.IoTAnalytics(msg.AWSConfig) : awsService;

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

		
		service.BatchPutMessage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"channelName",params,undefined,false); 
			copyArgs(n,"messages",params,undefined,false); 
			
			copyArgs(n,"channelName",params,undefined,false); 
			copyArgs(n,"messages",params,undefined,false); 
			
			copyArgs(msg,"channelName",params,undefined,false); 
			copyArgs(msg,"messages",params,undefined,false); 
			

			svc.batchPutMessage(params,cb);
		}

		
		service.CancelPipelineReprocessing=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			copyArgs(n,"reprocessingId",params,undefined,false); 
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			copyArgs(n,"reprocessingId",params,undefined,false); 
			
			copyArgs(msg,"pipelineName",params,undefined,false); 
			copyArgs(msg,"reprocessingId",params,undefined,false); 
			

			svc.cancelPipelineReprocessing(params,cb);
		}

		
		service.CreateChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"channelName",params,undefined,false); 
			
			copyArgs(n,"channelName",params,undefined,false); 
			copyArgs(n,"channelStorage",params,undefined,true); 
			copyArgs(n,"retentionPeriod",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"channelName",params,undefined,false); 
			copyArgs(msg,"channelStorage",params,undefined,true); 
			copyArgs(msg,"retentionPeriod",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createChannel(params,cb);
		}

		
		service.CreateDataset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"datasetName",params,undefined,false); 
			copyArgs(n,"actions",params,undefined,true); 
			
			copyArgs(n,"datasetName",params,undefined,false); 
			copyArgs(n,"actions",params,undefined,true); 
			copyArgs(n,"triggers",params,undefined,true); 
			copyArgs(n,"contentDeliveryRules",params,undefined,true); 
			copyArgs(n,"retentionPeriod",params,undefined,true); 
			copyArgs(n,"versioningConfiguration",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"lateDataRules",params,undefined,true); 
			
			copyArgs(msg,"datasetName",params,undefined,false); 
			copyArgs(msg,"actions",params,undefined,true); 
			copyArgs(msg,"triggers",params,undefined,true); 
			copyArgs(msg,"contentDeliveryRules",params,undefined,true); 
			copyArgs(msg,"retentionPeriod",params,undefined,true); 
			copyArgs(msg,"versioningConfiguration",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"lateDataRules",params,undefined,true); 
			

			svc.createDataset(params,cb);
		}

		
		service.CreateDatasetContent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"datasetName",params,undefined,false); 
			
			copyArgs(n,"datasetName",params,undefined,false); 
			copyArgs(n,"versionId",params,undefined,false); 
			
			copyArgs(msg,"datasetName",params,undefined,false); 
			copyArgs(msg,"versionId",params,undefined,false); 
			

			svc.createDatasetContent(params,cb);
		}

		
		service.CreateDatastore=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"datastoreName",params,undefined,false); 
			
			copyArgs(n,"datastoreName",params,undefined,false); 
			copyArgs(n,"datastoreStorage",params,undefined,true); 
			copyArgs(n,"retentionPeriod",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"fileFormatConfiguration",params,undefined,true); 
			copyArgs(n,"datastorePartitions",params,undefined,true); 
			
			copyArgs(msg,"datastoreName",params,undefined,false); 
			copyArgs(msg,"datastoreStorage",params,undefined,true); 
			copyArgs(msg,"retentionPeriod",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"fileFormatConfiguration",params,undefined,true); 
			copyArgs(msg,"datastorePartitions",params,undefined,true); 
			

			svc.createDatastore(params,cb);
		}

		
		service.CreatePipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			copyArgs(n,"pipelineActivities",params,undefined,true); 
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			copyArgs(n,"pipelineActivities",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"pipelineName",params,undefined,false); 
			copyArgs(msg,"pipelineActivities",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createPipeline(params,cb);
		}

		
		service.DeleteChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"channelName",params,undefined,false); 
			
			copyArgs(n,"channelName",params,undefined,false); 
			
			copyArgs(msg,"channelName",params,undefined,false); 
			

			svc.deleteChannel(params,cb);
		}

		
		service.DeleteDataset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"datasetName",params,undefined,false); 
			
			copyArgs(n,"datasetName",params,undefined,false); 
			
			copyArgs(msg,"datasetName",params,undefined,false); 
			

			svc.deleteDataset(params,cb);
		}

		
		service.DeleteDatasetContent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"datasetName",params,undefined,false); 
			
			copyArgs(n,"datasetName",params,undefined,false); 
			copyArgs(n,"versionId",params,undefined,false); 
			
			copyArgs(msg,"datasetName",params,undefined,false); 
			copyArgs(msg,"versionId",params,undefined,false); 
			

			svc.deleteDatasetContent(params,cb);
		}

		
		service.DeleteDatastore=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"datastoreName",params,undefined,false); 
			
			copyArgs(n,"datastoreName",params,undefined,false); 
			
			copyArgs(msg,"datastoreName",params,undefined,false); 
			

			svc.deleteDatastore(params,cb);
		}

		
		service.DeletePipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			
			copyArgs(msg,"pipelineName",params,undefined,false); 
			

			svc.deletePipeline(params,cb);
		}

		
		service.DescribeChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"channelName",params,undefined,false); 
			
			copyArgs(n,"channelName",params,undefined,false); 
			copyArgs(n,"includeStatistics",params,undefined,false); 
			
			copyArgs(msg,"channelName",params,undefined,false); 
			copyArgs(msg,"includeStatistics",params,undefined,false); 
			

			svc.describeChannel(params,cb);
		}

		
		service.DescribeDataset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"datasetName",params,undefined,false); 
			
			copyArgs(n,"datasetName",params,undefined,false); 
			
			copyArgs(msg,"datasetName",params,undefined,false); 
			

			svc.describeDataset(params,cb);
		}

		
		service.DescribeDatastore=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"datastoreName",params,undefined,false); 
			
			copyArgs(n,"datastoreName",params,undefined,false); 
			copyArgs(n,"includeStatistics",params,undefined,false); 
			
			copyArgs(msg,"datastoreName",params,undefined,false); 
			copyArgs(msg,"includeStatistics",params,undefined,false); 
			

			svc.describeDatastore(params,cb);
		}

		
		service.DescribeLoggingOptions=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeLoggingOptions(params,cb);
		}

		
		service.DescribePipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			
			copyArgs(msg,"pipelineName",params,undefined,false); 
			

			svc.describePipeline(params,cb);
		}

		
		service.GetDatasetContent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"datasetName",params,undefined,false); 
			
			copyArgs(n,"datasetName",params,undefined,false); 
			copyArgs(n,"versionId",params,undefined,false); 
			
			copyArgs(msg,"datasetName",params,undefined,false); 
			copyArgs(msg,"versionId",params,undefined,false); 
			

			svc.getDatasetContent(params,cb);
		}

		
		service.ListChannels=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listChannels(params,cb);
		}

		
		service.ListDatasetContents=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"datasetName",params,undefined,false); 
			
			copyArgs(n,"datasetName",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"scheduledOnOrAfter",params,undefined,false); 
			copyArgs(n,"scheduledBefore",params,undefined,false); 
			
			copyArgs(msg,"datasetName",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"scheduledOnOrAfter",params,undefined,false); 
			copyArgs(msg,"scheduledBefore",params,undefined,false); 
			

			svc.listDatasetContents(params,cb);
		}

		
		service.ListDatasets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listDatasets(params,cb);
		}

		
		service.ListDatastores=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listDatastores(params,cb);
		}

		
		service.ListPipelines=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listPipelines(params,cb);
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

		
		service.RunPipelineActivity=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineActivity",params,undefined,true); 
			copyArgs(n,"payloads",params,undefined,true); 
			
			copyArgs(n,"pipelineActivity",params,undefined,true); 
			copyArgs(n,"payloads",params,undefined,true); 
			
			copyArgs(msg,"pipelineActivity",params,undefined,true); 
			copyArgs(msg,"payloads",params,undefined,true); 
			

			svc.runPipelineActivity(params,cb);
		}

		
		service.SampleChannelData=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"channelName",params,undefined,false); 
			
			copyArgs(n,"channelName",params,undefined,false); 
			copyArgs(n,"maxMessages",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			
			copyArgs(msg,"channelName",params,undefined,false); 
			copyArgs(msg,"maxMessages",params,undefined,false); 
			copyArgs(msg,"startTime",params,undefined,false); 
			copyArgs(msg,"endTime",params,undefined,false); 
			

			svc.sampleChannelData(params,cb);
		}

		
		service.StartPipelineReprocessing=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(n,"channelMessages",params,undefined,false); 
			
			copyArgs(msg,"pipelineName",params,undefined,false); 
			copyArgs(msg,"startTime",params,undefined,false); 
			copyArgs(msg,"endTime",params,undefined,false); 
			copyArgs(msg,"channelMessages",params,undefined,false); 
			

			svc.startPipelineReprocessing(params,cb);
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

		
		service.UpdateChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"channelName",params,undefined,false); 
			
			copyArgs(n,"channelName",params,undefined,false); 
			copyArgs(n,"channelStorage",params,undefined,true); 
			copyArgs(n,"retentionPeriod",params,undefined,true); 
			
			copyArgs(msg,"channelName",params,undefined,false); 
			copyArgs(msg,"channelStorage",params,undefined,true); 
			copyArgs(msg,"retentionPeriod",params,undefined,true); 
			

			svc.updateChannel(params,cb);
		}

		
		service.UpdateDataset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"datasetName",params,undefined,false); 
			copyArgs(n,"actions",params,undefined,true); 
			
			copyArgs(n,"datasetName",params,undefined,false); 
			copyArgs(n,"actions",params,undefined,true); 
			copyArgs(n,"triggers",params,undefined,true); 
			copyArgs(n,"contentDeliveryRules",params,undefined,true); 
			copyArgs(n,"retentionPeriod",params,undefined,true); 
			copyArgs(n,"versioningConfiguration",params,undefined,true); 
			copyArgs(n,"lateDataRules",params,undefined,true); 
			
			copyArgs(msg,"datasetName",params,undefined,false); 
			copyArgs(msg,"actions",params,undefined,true); 
			copyArgs(msg,"triggers",params,undefined,true); 
			copyArgs(msg,"contentDeliveryRules",params,undefined,true); 
			copyArgs(msg,"retentionPeriod",params,undefined,true); 
			copyArgs(msg,"versioningConfiguration",params,undefined,true); 
			copyArgs(msg,"lateDataRules",params,undefined,true); 
			

			svc.updateDataset(params,cb);
		}

		
		service.UpdateDatastore=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"datastoreName",params,undefined,false); 
			
			copyArgs(n,"datastoreName",params,undefined,false); 
			copyArgs(n,"retentionPeriod",params,undefined,true); 
			copyArgs(n,"datastoreStorage",params,undefined,true); 
			copyArgs(n,"fileFormatConfiguration",params,undefined,true); 
			
			copyArgs(msg,"datastoreName",params,undefined,false); 
			copyArgs(msg,"retentionPeriod",params,undefined,true); 
			copyArgs(msg,"datastoreStorage",params,undefined,true); 
			copyArgs(msg,"fileFormatConfiguration",params,undefined,true); 
			

			svc.updateDatastore(params,cb);
		}

		
		service.UpdatePipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			copyArgs(n,"pipelineActivities",params,undefined,true); 
			
			copyArgs(n,"pipelineName",params,undefined,false); 
			copyArgs(n,"pipelineActivities",params,undefined,true); 
			
			copyArgs(msg,"pipelineName",params,undefined,false); 
			copyArgs(msg,"pipelineActivities",params,undefined,true); 
			

			svc.updatePipeline(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS IoTAnalytics", AmazonAPINode);

};
