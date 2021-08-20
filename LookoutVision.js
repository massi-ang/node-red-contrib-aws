
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

		var awsService = new AWS.LookoutVision( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.LookoutVision(msg.AWSConfig) : awsService;

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

		
		service.CreateDataset=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProjectName",params,undefined,false); 
			copyArg(n,"DatasetType",params,undefined,false); 
			
			copyArg(msg,"ProjectName",params,undefined,false); 
			copyArg(msg,"DatasetType",params,undefined,false); 
			copyArg(msg,"DatasetSource",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.createDataset(params,cb);
		}

		
		service.CreateModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProjectName",params,undefined,false); 
			copyArg(n,"OutputConfig",params,undefined,true); 
			
			copyArg(msg,"ProjectName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"OutputConfig",params,undefined,true); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createModel(params,cb);
		}

		
		service.CreateProject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProjectName",params,undefined,false); 
			
			copyArg(msg,"ProjectName",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.createProject(params,cb);
		}

		
		service.DeleteDataset=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProjectName",params,undefined,false); 
			copyArg(n,"DatasetType",params,undefined,false); 
			
			copyArg(msg,"ProjectName",params,undefined,false); 
			copyArg(msg,"DatasetType",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.deleteDataset(params,cb);
		}

		
		service.DeleteModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProjectName",params,undefined,false); 
			copyArg(n,"ModelVersion",params,undefined,false); 
			
			copyArg(msg,"ProjectName",params,undefined,false); 
			copyArg(msg,"ModelVersion",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.deleteModel(params,cb);
		}

		
		service.DeleteProject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProjectName",params,undefined,false); 
			
			copyArg(msg,"ProjectName",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.deleteProject(params,cb);
		}

		
		service.DescribeDataset=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProjectName",params,undefined,false); 
			copyArg(n,"DatasetType",params,undefined,false); 
			
			copyArg(msg,"ProjectName",params,undefined,false); 
			copyArg(msg,"DatasetType",params,undefined,false); 
			

			svc.describeDataset(params,cb);
		}

		
		service.DescribeModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProjectName",params,undefined,false); 
			copyArg(n,"ModelVersion",params,undefined,false); 
			
			copyArg(msg,"ProjectName",params,undefined,false); 
			copyArg(msg,"ModelVersion",params,undefined,false); 
			

			svc.describeModel(params,cb);
		}

		
		service.DescribeProject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProjectName",params,undefined,false); 
			
			copyArg(msg,"ProjectName",params,undefined,false); 
			

			svc.describeProject(params,cb);
		}

		
		service.DetectAnomalies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProjectName",params,undefined,false); 
			copyArg(n,"ModelVersion",params,undefined,false); 
			copyArg(n,"Body",params,undefined,false); 
			copyArg(n,"ContentType",params,undefined,false); 
			
			copyArg(msg,"ProjectName",params,undefined,false); 
			copyArg(msg,"ModelVersion",params,undefined,false); 
			copyArg(msg,"Body",params,undefined,false); 
			copyArg(msg,"ContentType",params,undefined,false); 
			

			svc.detectAnomalies(params,cb);
		}

		
		service.ListDatasetEntries=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProjectName",params,undefined,false); 
			copyArg(n,"DatasetType",params,undefined,false); 
			
			copyArg(msg,"ProjectName",params,undefined,false); 
			copyArg(msg,"DatasetType",params,undefined,false); 
			copyArg(msg,"Labeled",params,undefined,false); 
			copyArg(msg,"AnomalyClass",params,undefined,false); 
			copyArg(msg,"BeforeCreationDate",params,undefined,false); 
			copyArg(msg,"AfterCreationDate",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"SourceRefContains",params,undefined,false); 
			

			svc.listDatasetEntries(params,cb);
		}

		
		service.ListModels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProjectName",params,undefined,false); 
			
			copyArg(msg,"ProjectName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listModels(params,cb);
		}

		
		service.ListProjects=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listProjects(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.StartModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProjectName",params,undefined,false); 
			copyArg(n,"ModelVersion",params,undefined,false); 
			copyArg(n,"MinInferenceUnits",params,undefined,false); 
			
			copyArg(msg,"ProjectName",params,undefined,false); 
			copyArg(msg,"ModelVersion",params,undefined,false); 
			copyArg(msg,"MinInferenceUnits",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.startModel(params,cb);
		}

		
		service.StopModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProjectName",params,undefined,false); 
			copyArg(n,"ModelVersion",params,undefined,false); 
			
			copyArg(msg,"ProjectName",params,undefined,false); 
			copyArg(msg,"ModelVersion",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.stopModel(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateDatasetEntries=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProjectName",params,undefined,false); 
			copyArg(n,"DatasetType",params,undefined,false); 
			copyArg(n,"Changes",params,undefined,false); 
			
			copyArg(msg,"ProjectName",params,undefined,false); 
			copyArg(msg,"DatasetType",params,undefined,false); 
			copyArg(msg,"Changes",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.updateDatasetEntries(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS LookoutVision", AmazonAPINode);

};
