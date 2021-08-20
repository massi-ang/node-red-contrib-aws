
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

		var awsService = new AWS.IoTAnalytics( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.IoTAnalytics(msg.AWSConfig) : awsService;

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

		
		service.BatchPutMessage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"channelName",params,undefined,false); 
			copyArg(n,"messages",params,undefined,false); 
			
			copyArg(msg,"channelName",params,undefined,false); 
			copyArg(msg,"messages",params,undefined,false); 
			

			svc.batchPutMessage(params,cb);
		}

		
		service.CancelPipelineReprocessing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pipelineName",params,undefined,false); 
			copyArg(n,"reprocessingId",params,undefined,false); 
			
			copyArg(msg,"pipelineName",params,undefined,false); 
			copyArg(msg,"reprocessingId",params,undefined,false); 
			

			svc.cancelPipelineReprocessing(params,cb);
		}

		
		service.CreateChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"channelName",params,undefined,false); 
			
			copyArg(msg,"channelName",params,undefined,false); 
			copyArg(msg,"channelStorage",params,undefined,true); 
			copyArg(msg,"retentionPeriod",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createChannel(params,cb);
		}

		
		service.CreateDataset=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"datasetName",params,undefined,false); 
			copyArg(n,"actions",params,undefined,true); 
			
			copyArg(msg,"datasetName",params,undefined,false); 
			copyArg(msg,"actions",params,undefined,true); 
			copyArg(msg,"triggers",params,undefined,true); 
			copyArg(msg,"contentDeliveryRules",params,undefined,true); 
			copyArg(msg,"retentionPeriod",params,undefined,true); 
			copyArg(msg,"versioningConfiguration",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"lateDataRules",params,undefined,true); 
			

			svc.createDataset(params,cb);
		}

		
		service.CreateDatasetContent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"datasetName",params,undefined,false); 
			
			copyArg(msg,"datasetName",params,undefined,false); 
			copyArg(msg,"versionId",params,undefined,false); 
			

			svc.createDatasetContent(params,cb);
		}

		
		service.CreateDatastore=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"datastoreName",params,undefined,false); 
			
			copyArg(msg,"datastoreName",params,undefined,false); 
			copyArg(msg,"datastoreStorage",params,undefined,true); 
			copyArg(msg,"retentionPeriod",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"fileFormatConfiguration",params,undefined,true); 
			copyArg(msg,"datastorePartitions",params,undefined,true); 
			

			svc.createDatastore(params,cb);
		}

		
		service.CreatePipeline=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pipelineName",params,undefined,false); 
			copyArg(n,"pipelineActivities",params,undefined,true); 
			
			copyArg(msg,"pipelineName",params,undefined,false); 
			copyArg(msg,"pipelineActivities",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createPipeline(params,cb);
		}

		
		service.DeleteChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"channelName",params,undefined,false); 
			
			copyArg(msg,"channelName",params,undefined,false); 
			

			svc.deleteChannel(params,cb);
		}

		
		service.DeleteDataset=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"datasetName",params,undefined,false); 
			
			copyArg(msg,"datasetName",params,undefined,false); 
			

			svc.deleteDataset(params,cb);
		}

		
		service.DeleteDatasetContent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"datasetName",params,undefined,false); 
			
			copyArg(msg,"datasetName",params,undefined,false); 
			copyArg(msg,"versionId",params,undefined,false); 
			

			svc.deleteDatasetContent(params,cb);
		}

		
		service.DeleteDatastore=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"datastoreName",params,undefined,false); 
			
			copyArg(msg,"datastoreName",params,undefined,false); 
			

			svc.deleteDatastore(params,cb);
		}

		
		service.DeletePipeline=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pipelineName",params,undefined,false); 
			
			copyArg(msg,"pipelineName",params,undefined,false); 
			

			svc.deletePipeline(params,cb);
		}

		
		service.DescribeChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"channelName",params,undefined,false); 
			
			copyArg(msg,"channelName",params,undefined,false); 
			copyArg(msg,"includeStatistics",params,undefined,false); 
			

			svc.describeChannel(params,cb);
		}

		
		service.DescribeDataset=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"datasetName",params,undefined,false); 
			
			copyArg(msg,"datasetName",params,undefined,false); 
			

			svc.describeDataset(params,cb);
		}

		
		service.DescribeDatastore=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"datastoreName",params,undefined,false); 
			
			copyArg(msg,"datastoreName",params,undefined,false); 
			copyArg(msg,"includeStatistics",params,undefined,false); 
			

			svc.describeDatastore(params,cb);
		}

		
		service.DescribeLoggingOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeLoggingOptions(params,cb);
		}

		
		service.DescribePipeline=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pipelineName",params,undefined,false); 
			
			copyArg(msg,"pipelineName",params,undefined,false); 
			

			svc.describePipeline(params,cb);
		}

		
		service.GetDatasetContent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"datasetName",params,undefined,false); 
			
			copyArg(msg,"datasetName",params,undefined,false); 
			copyArg(msg,"versionId",params,undefined,false); 
			

			svc.getDatasetContent(params,cb);
		}

		
		service.ListChannels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listChannels(params,cb);
		}

		
		service.ListDatasetContents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"datasetName",params,undefined,false); 
			
			copyArg(msg,"datasetName",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"scheduledOnOrAfter",params,undefined,false); 
			copyArg(msg,"scheduledBefore",params,undefined,false); 
			

			svc.listDatasetContents(params,cb);
		}

		
		service.ListDatasets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listDatasets(params,cb);
		}

		
		service.ListDatastores=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listDatastores(params,cb);
		}

		
		service.ListPipelines=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listPipelines(params,cb);
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

		
		service.RunPipelineActivity=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pipelineActivity",params,undefined,true); 
			copyArg(n,"payloads",params,undefined,true); 
			
			copyArg(msg,"pipelineActivity",params,undefined,true); 
			copyArg(msg,"payloads",params,undefined,true); 
			

			svc.runPipelineActivity(params,cb);
		}

		
		service.SampleChannelData=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"channelName",params,undefined,false); 
			
			copyArg(msg,"channelName",params,undefined,false); 
			copyArg(msg,"maxMessages",params,undefined,false); 
			copyArg(msg,"startTime",params,undefined,false); 
			copyArg(msg,"endTime",params,undefined,false); 
			

			svc.sampleChannelData(params,cb);
		}

		
		service.StartPipelineReprocessing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pipelineName",params,undefined,false); 
			
			copyArg(msg,"pipelineName",params,undefined,false); 
			copyArg(msg,"startTime",params,undefined,false); 
			copyArg(msg,"endTime",params,undefined,false); 
			copyArg(msg,"channelMessages",params,undefined,false); 
			

			svc.startPipelineReprocessing(params,cb);
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

		
		service.UpdateChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"channelName",params,undefined,false); 
			
			copyArg(msg,"channelName",params,undefined,false); 
			copyArg(msg,"channelStorage",params,undefined,true); 
			copyArg(msg,"retentionPeriod",params,undefined,true); 
			

			svc.updateChannel(params,cb);
		}

		
		service.UpdateDataset=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"datasetName",params,undefined,false); 
			copyArg(n,"actions",params,undefined,true); 
			
			copyArg(msg,"datasetName",params,undefined,false); 
			copyArg(msg,"actions",params,undefined,true); 
			copyArg(msg,"triggers",params,undefined,true); 
			copyArg(msg,"contentDeliveryRules",params,undefined,true); 
			copyArg(msg,"retentionPeriod",params,undefined,true); 
			copyArg(msg,"versioningConfiguration",params,undefined,true); 
			copyArg(msg,"lateDataRules",params,undefined,true); 
			

			svc.updateDataset(params,cb);
		}

		
		service.UpdateDatastore=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"datastoreName",params,undefined,false); 
			
			copyArg(msg,"datastoreName",params,undefined,false); 
			copyArg(msg,"retentionPeriod",params,undefined,true); 
			copyArg(msg,"datastoreStorage",params,undefined,true); 
			copyArg(msg,"fileFormatConfiguration",params,undefined,true); 
			

			svc.updateDatastore(params,cb);
		}

		
		service.UpdatePipeline=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"pipelineName",params,undefined,false); 
			copyArg(n,"pipelineActivities",params,undefined,true); 
			
			copyArg(msg,"pipelineName",params,undefined,false); 
			copyArg(msg,"pipelineActivities",params,undefined,true); 
			

			svc.updatePipeline(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS IoTAnalytics", AmazonAPINode);

};
