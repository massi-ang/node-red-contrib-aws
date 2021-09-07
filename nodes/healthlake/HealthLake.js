
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

		var awsService = new AWS.HealthLake( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.HealthLake(msg.AWSConfig) : awsService;

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

		
		service.CreateFHIRDatastore=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatastoreTypeVersion",params,undefined,false); 
			
			copyArgs(n,"DatastoreName",params,undefined,false); 
			copyArgs(n,"DatastoreTypeVersion",params,undefined,false); 
			copyArgs(n,"SseConfiguration",params,undefined,true); 
			copyArgs(n,"PreloadDataConfig",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DatastoreName",params,undefined,false); 
			copyArgs(msg,"DatastoreTypeVersion",params,undefined,false); 
			copyArgs(msg,"SseConfiguration",params,undefined,true); 
			copyArgs(msg,"PreloadDataConfig",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createFHIRDatastore(params,cb);
		}

		
		service.DeleteFHIRDatastore=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DatastoreId",params,undefined,false); 
			
			copyArgs(msg,"DatastoreId",params,undefined,false); 
			

			svc.deleteFHIRDatastore(params,cb);
		}

		
		service.DescribeFHIRDatastore=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DatastoreId",params,undefined,false); 
			
			copyArgs(msg,"DatastoreId",params,undefined,false); 
			

			svc.describeFHIRDatastore(params,cb);
		}

		
		service.DescribeFHIRExportJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatastoreId",params,undefined,false); 
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"DatastoreId",params,undefined,false); 
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"DatastoreId",params,undefined,false); 
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.describeFHIRExportJob(params,cb);
		}

		
		service.DescribeFHIRImportJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatastoreId",params,undefined,false); 
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"DatastoreId",params,undefined,false); 
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"DatastoreId",params,undefined,false); 
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.describeFHIRImportJob(params,cb);
		}

		
		service.ListFHIRDatastores=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filter",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filter",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listFHIRDatastores(params,cb);
		}

		
		service.ListFHIRExportJobs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatastoreId",params,undefined,false); 
			
			copyArgs(n,"DatastoreId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"JobName",params,undefined,false); 
			copyArgs(n,"JobStatus",params,undefined,false); 
			copyArgs(n,"SubmittedBefore",params,undefined,false); 
			copyArgs(n,"SubmittedAfter",params,undefined,false); 
			
			copyArgs(msg,"DatastoreId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"JobName",params,undefined,false); 
			copyArgs(msg,"JobStatus",params,undefined,false); 
			copyArgs(msg,"SubmittedBefore",params,undefined,false); 
			copyArgs(msg,"SubmittedAfter",params,undefined,false); 
			

			svc.listFHIRExportJobs(params,cb);
		}

		
		service.ListFHIRImportJobs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatastoreId",params,undefined,false); 
			
			copyArgs(n,"DatastoreId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"JobName",params,undefined,false); 
			copyArgs(n,"JobStatus",params,undefined,false); 
			copyArgs(n,"SubmittedBefore",params,undefined,false); 
			copyArgs(n,"SubmittedAfter",params,undefined,false); 
			
			copyArgs(msg,"DatastoreId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"JobName",params,undefined,false); 
			copyArgs(msg,"JobStatus",params,undefined,false); 
			copyArgs(msg,"SubmittedBefore",params,undefined,false); 
			copyArgs(msg,"SubmittedAfter",params,undefined,false); 
			

			svc.listFHIRImportJobs(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.StartFHIRExportJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"DatastoreId",params,undefined,false); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(n,"JobName",params,undefined,false); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"DatastoreId",params,undefined,false); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"JobName",params,undefined,false); 
			copyArgs(msg,"OutputDataConfig",params,undefined,true); 
			copyArgs(msg,"DatastoreId",params,undefined,false); 
			copyArgs(msg,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.startFHIRExportJob(params,cb);
		}

		
		service.StartFHIRImportJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"JobOutputDataConfig",params,undefined,true); 
			copyArgs(n,"DatastoreId",params,undefined,false); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(n,"JobName",params,undefined,false); 
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"JobOutputDataConfig",params,undefined,true); 
			copyArgs(n,"DatastoreId",params,undefined,false); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"JobName",params,undefined,false); 
			copyArgs(msg,"InputDataConfig",params,undefined,true); 
			copyArgs(msg,"JobOutputDataConfig",params,undefined,true); 
			copyArgs(msg,"DatastoreId",params,undefined,false); 
			copyArgs(msg,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.startFHIRImportJob(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS HealthLake", AmazonAPINode);

};
