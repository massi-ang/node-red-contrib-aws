
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

		var awsService = new AWS.HealthLake( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.HealthLake(msg.AWSConfig) : awsService;

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

		
		service.CreateFHIRDatastore=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatastoreTypeVersion",params,undefined,false); 
			
			copyArg(msg,"DatastoreName",params,undefined,false); 
			copyArg(msg,"DatastoreTypeVersion",params,undefined,false); 
			copyArg(msg,"SseConfiguration",params,undefined,true); 
			copyArg(msg,"PreloadDataConfig",params,undefined,true); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createFHIRDatastore(params,cb);
		}

		
		service.DeleteFHIRDatastore=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DatastoreId",params,undefined,false); 
			

			svc.deleteFHIRDatastore(params,cb);
		}

		
		service.DescribeFHIRDatastore=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DatastoreId",params,undefined,false); 
			

			svc.describeFHIRDatastore(params,cb);
		}

		
		service.DescribeFHIRExportJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatastoreId",params,undefined,false); 
			copyArg(n,"JobId",params,undefined,false); 
			
			copyArg(msg,"DatastoreId",params,undefined,false); 
			copyArg(msg,"JobId",params,undefined,false); 
			

			svc.describeFHIRExportJob(params,cb);
		}

		
		service.DescribeFHIRImportJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatastoreId",params,undefined,false); 
			copyArg(n,"JobId",params,undefined,false); 
			
			copyArg(msg,"DatastoreId",params,undefined,false); 
			copyArg(msg,"JobId",params,undefined,false); 
			

			svc.describeFHIRImportJob(params,cb);
		}

		
		service.ListFHIRDatastores=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filter",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listFHIRDatastores(params,cb);
		}

		
		service.ListFHIRExportJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatastoreId",params,undefined,false); 
			
			copyArg(msg,"DatastoreId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"JobName",params,undefined,false); 
			copyArg(msg,"JobStatus",params,undefined,false); 
			copyArg(msg,"SubmittedBefore",params,undefined,false); 
			copyArg(msg,"SubmittedAfter",params,undefined,false); 
			

			svc.listFHIRExportJobs(params,cb);
		}

		
		service.ListFHIRImportJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatastoreId",params,undefined,false); 
			
			copyArg(msg,"DatastoreId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"JobName",params,undefined,false); 
			copyArg(msg,"JobStatus",params,undefined,false); 
			copyArg(msg,"SubmittedBefore",params,undefined,false); 
			copyArg(msg,"SubmittedAfter",params,undefined,false); 
			

			svc.listFHIRImportJobs(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.StartFHIRExportJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OutputDataConfig",params,undefined,true); 
			copyArg(n,"DatastoreId",params,undefined,false); 
			copyArg(n,"DataAccessRoleArn",params,undefined,false); 
			copyArg(n,"ClientToken",params,undefined,false); 
			
			copyArg(msg,"JobName",params,undefined,false); 
			copyArg(msg,"OutputDataConfig",params,undefined,true); 
			copyArg(msg,"DatastoreId",params,undefined,false); 
			copyArg(msg,"DataAccessRoleArn",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.startFHIRExportJob(params,cb);
		}

		
		service.StartFHIRImportJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InputDataConfig",params,undefined,true); 
			copyArg(n,"JobOutputDataConfig",params,undefined,true); 
			copyArg(n,"DatastoreId",params,undefined,false); 
			copyArg(n,"DataAccessRoleArn",params,undefined,false); 
			copyArg(n,"ClientToken",params,undefined,false); 
			
			copyArg(msg,"JobName",params,undefined,false); 
			copyArg(msg,"InputDataConfig",params,undefined,true); 
			copyArg(msg,"JobOutputDataConfig",params,undefined,true); 
			copyArg(msg,"DatastoreId",params,undefined,false); 
			copyArg(msg,"DataAccessRoleArn",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.startFHIRImportJob(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS HealthLake", AmazonAPINode);

};
