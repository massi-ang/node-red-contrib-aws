
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

		var awsService = new AWS.LookoutVision( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.LookoutVision(msg.AWSConfig) : awsService;

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
		
			service.CreateDataset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			copyArgs(n,"DatasetType",params,undefined,false); 
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			copyArgs(n,"DatasetType",params,undefined,false); 
			copyArgs(n,"DatasetSource",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"ProjectName",params,undefined,false); 
			copyArgs(msg,"DatasetType",params,undefined,false); 
			copyArgs(msg,"DatasetSource",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.createDataset(params,cb);
		}
			service.CreateModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			copyArgs(n,"OutputConfig",params,undefined,true); 
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"OutputConfig",params,undefined,true); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ProjectName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"OutputConfig",params,undefined,true); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createModel(params,cb);
		}
			service.CreateProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"ProjectName",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.createProject(params,cb);
		}
			service.DeleteDataset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			copyArgs(n,"DatasetType",params,undefined,false); 
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			copyArgs(n,"DatasetType",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"ProjectName",params,undefined,false); 
			copyArgs(msg,"DatasetType",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.deleteDataset(params,cb);
		}
			service.DeleteModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			copyArgs(n,"ModelVersion",params,undefined,false); 
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			copyArgs(n,"ModelVersion",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"ProjectName",params,undefined,false); 
			copyArgs(msg,"ModelVersion",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.deleteModel(params,cb);
		}
			service.DeleteProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"ProjectName",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.deleteProject(params,cb);
		}
			service.DescribeDataset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			copyArgs(n,"DatasetType",params,undefined,false); 
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			copyArgs(n,"DatasetType",params,undefined,false); 
			
			copyArgs(msg,"ProjectName",params,undefined,false); 
			copyArgs(msg,"DatasetType",params,undefined,false); 
			

			svc.describeDataset(params,cb);
		}
			service.DescribeModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			copyArgs(n,"ModelVersion",params,undefined,false); 
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			copyArgs(n,"ModelVersion",params,undefined,false); 
			
			copyArgs(msg,"ProjectName",params,undefined,false); 
			copyArgs(msg,"ModelVersion",params,undefined,false); 
			

			svc.describeModel(params,cb);
		}
			service.DescribeProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			
			copyArgs(msg,"ProjectName",params,undefined,false); 
			

			svc.describeProject(params,cb);
		}
			service.DetectAnomalies=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			copyArgs(n,"ModelVersion",params,undefined,false); 
			copyArgs(Buffer.from(n),"Body",params,undefined,false); 
			copyArgs(n,"ContentType",params,undefined,false); 
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			copyArgs(n,"ModelVersion",params,undefined,false); 
			copyArgs(Buffer.from(n),"Body",params,undefined,false); 
			copyArgs(n,"ContentType",params,undefined,false); 
			
			copyArgs(msg,"ProjectName",params,undefined,false); 
			copyArgs(msg,"ModelVersion",params,undefined,false); 
			copyArgs(msg,"Body",params,undefined,false); 
			copyArgs(msg,"ContentType",params,undefined,false); 
			

			svc.detectAnomalies(params,cb);
		}
			service.ListDatasetEntries=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			copyArgs(n,"DatasetType",params,undefined,false); 
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			copyArgs(n,"DatasetType",params,undefined,false); 
			copyArgs(Boolean(n),"Labeled",params,undefined,false); 
			copyArgs(n,"AnomalyClass",params,undefined,false); 
			copyArgs(n,"BeforeCreationDate",params,undefined,false); 
			copyArgs(n,"AfterCreationDate",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"SourceRefContains",params,undefined,false); 
			
			copyArgs(msg,"ProjectName",params,undefined,false); 
			copyArgs(msg,"DatasetType",params,undefined,false); 
			copyArgs(msg,"Labeled",params,undefined,false); 
			copyArgs(msg,"AnomalyClass",params,undefined,false); 
			copyArgs(msg,"BeforeCreationDate",params,undefined,false); 
			copyArgs(msg,"AfterCreationDate",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"SourceRefContains",params,undefined,false); 
			

			svc.listDatasetEntries(params,cb);
		}
			service.ListModels=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ProjectName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listModels(params,cb);
		}
			service.ListProjects=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listProjects(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.StartModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			copyArgs(n,"ModelVersion",params,undefined,false); 
			copyArgs(Number(n),"MinInferenceUnits",params,undefined,false); 
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			copyArgs(n,"ModelVersion",params,undefined,false); 
			copyArgs(Number(n),"MinInferenceUnits",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"ProjectName",params,undefined,false); 
			copyArgs(msg,"ModelVersion",params,undefined,false); 
			copyArgs(msg,"MinInferenceUnits",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.startModel(params,cb);
		}
			service.StopModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			copyArgs(n,"ModelVersion",params,undefined,false); 
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			copyArgs(n,"ModelVersion",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"ProjectName",params,undefined,false); 
			copyArgs(msg,"ModelVersion",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.stopModel(params,cb);
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
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
			service.UpdateDatasetEntries=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			copyArgs(n,"DatasetType",params,undefined,false); 
			copyArgs(Buffer.from(n),"Changes",params,undefined,false); 
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			copyArgs(n,"DatasetType",params,undefined,false); 
			copyArgs(Buffer.from(n),"Changes",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"ProjectName",params,undefined,false); 
			copyArgs(msg,"DatasetType",params,undefined,false); 
			copyArgs(msg,"Changes",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.updateDatasetEntries(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS LookoutVision", AmazonAPINode);

};
