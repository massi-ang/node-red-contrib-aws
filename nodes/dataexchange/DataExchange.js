
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

		var awsService = new AWS.DataExchange( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.DataExchange(msg.AWSConfig) : awsService;

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

		
		service.CancelJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.cancelJob(params,cb);
		}

		
		service.CreateDataSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AssetType",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"AssetType",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"AssetType",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createDataSet(params,cb);
		}

		
		service.CreateJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Details",params,undefined,false); 
			
			copyArgs(n,"Details",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(msg,"Details",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			

			svc.createJob(params,cb);
		}

		
		service.CreateRevision=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DataSetId",params,undefined,false); 
			
			copyArgs(n,"Comment",params,undefined,false); 
			copyArgs(n,"DataSetId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Comment",params,undefined,false); 
			copyArgs(msg,"DataSetId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createRevision(params,cb);
		}

		
		service.DeleteAsset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RevisionId",params,undefined,false); 
			copyArgs(n,"AssetId",params,undefined,false); 
			copyArgs(n,"DataSetId",params,undefined,false); 
			
			copyArgs(n,"AssetId",params,undefined,false); 
			copyArgs(n,"DataSetId",params,undefined,false); 
			copyArgs(n,"RevisionId",params,undefined,false); 
			
			copyArgs(msg,"AssetId",params,undefined,false); 
			copyArgs(msg,"DataSetId",params,undefined,false); 
			copyArgs(msg,"RevisionId",params,undefined,false); 
			

			svc.deleteAsset(params,cb);
		}

		
		service.DeleteDataSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DataSetId",params,undefined,false); 
			
			copyArgs(n,"DataSetId",params,undefined,false); 
			
			copyArgs(msg,"DataSetId",params,undefined,false); 
			

			svc.deleteDataSet(params,cb);
		}

		
		service.DeleteRevision=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RevisionId",params,undefined,false); 
			copyArgs(n,"DataSetId",params,undefined,false); 
			
			copyArgs(n,"DataSetId",params,undefined,false); 
			copyArgs(n,"RevisionId",params,undefined,false); 
			
			copyArgs(msg,"DataSetId",params,undefined,false); 
			copyArgs(msg,"RevisionId",params,undefined,false); 
			

			svc.deleteRevision(params,cb);
		}

		
		service.GetAsset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RevisionId",params,undefined,false); 
			copyArgs(n,"AssetId",params,undefined,false); 
			copyArgs(n,"DataSetId",params,undefined,false); 
			
			copyArgs(n,"AssetId",params,undefined,false); 
			copyArgs(n,"DataSetId",params,undefined,false); 
			copyArgs(n,"RevisionId",params,undefined,false); 
			
			copyArgs(msg,"AssetId",params,undefined,false); 
			copyArgs(msg,"DataSetId",params,undefined,false); 
			copyArgs(msg,"RevisionId",params,undefined,false); 
			

			svc.getAsset(params,cb);
		}

		
		service.GetDataSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DataSetId",params,undefined,false); 
			
			copyArgs(n,"DataSetId",params,undefined,false); 
			
			copyArgs(msg,"DataSetId",params,undefined,false); 
			

			svc.getDataSet(params,cb);
		}

		
		service.GetJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.getJob(params,cb);
		}

		
		service.GetRevision=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RevisionId",params,undefined,false); 
			copyArgs(n,"DataSetId",params,undefined,false); 
			
			copyArgs(n,"DataSetId",params,undefined,false); 
			copyArgs(n,"RevisionId",params,undefined,false); 
			
			copyArgs(msg,"DataSetId",params,undefined,false); 
			copyArgs(msg,"RevisionId",params,undefined,false); 
			

			svc.getRevision(params,cb);
		}

		
		service.ListDataSetRevisions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DataSetId",params,undefined,false); 
			
			copyArgs(n,"DataSetId",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DataSetId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listDataSetRevisions(params,cb);
		}

		
		service.ListDataSets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Origin",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Origin",params,undefined,false); 
			

			svc.listDataSets(params,cb);
		}

		
		service.ListJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DataSetId",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"RevisionId",params,undefined,false); 
			
			copyArgs(msg,"DataSetId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"RevisionId",params,undefined,false); 
			

			svc.listJobs(params,cb);
		}

		
		service.ListRevisionAssets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RevisionId",params,undefined,false); 
			copyArgs(n,"DataSetId",params,undefined,false); 
			
			copyArgs(n,"DataSetId",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"RevisionId",params,undefined,false); 
			
			copyArgs(msg,"DataSetId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"RevisionId",params,undefined,false); 
			

			svc.listRevisionAssets(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.StartJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.startJob(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TagKeys",params,undefined,false); 
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateAsset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RevisionId",params,undefined,false); 
			copyArgs(n,"AssetId",params,undefined,false); 
			copyArgs(n,"DataSetId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"AssetId",params,undefined,false); 
			copyArgs(n,"DataSetId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RevisionId",params,undefined,false); 
			
			copyArgs(msg,"AssetId",params,undefined,false); 
			copyArgs(msg,"DataSetId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"RevisionId",params,undefined,false); 
			

			svc.updateAsset(params,cb);
		}

		
		service.UpdateDataSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DataSetId",params,undefined,false); 
			
			copyArgs(n,"DataSetId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"DataSetId",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.updateDataSet(params,cb);
		}

		
		service.UpdateRevision=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RevisionId",params,undefined,false); 
			copyArgs(n,"DataSetId",params,undefined,false); 
			
			copyArgs(n,"Comment",params,undefined,false); 
			copyArgs(n,"DataSetId",params,undefined,false); 
			copyArgs(n,"Finalized",params,undefined,false); 
			copyArgs(n,"RevisionId",params,undefined,false); 
			
			copyArgs(msg,"Comment",params,undefined,false); 
			copyArgs(msg,"DataSetId",params,undefined,false); 
			copyArgs(msg,"Finalized",params,undefined,false); 
			copyArgs(msg,"RevisionId",params,undefined,false); 
			

			svc.updateRevision(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS DataExchange", AmazonAPINode);

};
