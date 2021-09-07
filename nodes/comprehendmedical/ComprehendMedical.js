
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

		var awsService = new AWS.ComprehendMedical( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.ComprehendMedical(msg.AWSConfig) : awsService;

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

		
		service.DescribeEntitiesDetectionV2Job=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.describeEntitiesDetectionV2Job(params,cb);
		}

		
		service.DescribeICD10CMInferenceJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.describeICD10CMInferenceJob(params,cb);
		}

		
		service.DescribePHIDetectionJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.describePHIDetectionJob(params,cb);
		}

		
		service.DescribeRxNormInferenceJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.describeRxNormInferenceJob(params,cb);
		}

		
		service.DetectEntities=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Text",params,undefined,false); 
			
			copyArgs(n,"Text",params,undefined,false); 
			
			copyArgs(msg,"Text",params,undefined,false); 
			

			svc.detectEntities(params,cb);
		}

		
		service.DetectEntitiesV2=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Text",params,undefined,false); 
			
			copyArgs(n,"Text",params,undefined,false); 
			
			copyArgs(msg,"Text",params,undefined,false); 
			

			svc.detectEntitiesV2(params,cb);
		}

		
		service.DetectPHI=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Text",params,undefined,false); 
			
			copyArgs(n,"Text",params,undefined,false); 
			
			copyArgs(msg,"Text",params,undefined,false); 
			

			svc.detectPHI(params,cb);
		}

		
		service.InferICD10CM=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Text",params,undefined,false); 
			
			copyArgs(n,"Text",params,undefined,false); 
			
			copyArgs(msg,"Text",params,undefined,false); 
			

			svc.inferICD10CM(params,cb);
		}

		
		service.InferRxNorm=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Text",params,undefined,false); 
			
			copyArgs(n,"Text",params,undefined,false); 
			
			copyArgs(msg,"Text",params,undefined,false); 
			

			svc.inferRxNorm(params,cb);
		}

		
		service.ListEntitiesDetectionV2Jobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filter",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filter",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listEntitiesDetectionV2Jobs(params,cb);
		}

		
		service.ListICD10CMInferenceJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filter",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filter",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listICD10CMInferenceJobs(params,cb);
		}

		
		service.ListPHIDetectionJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filter",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filter",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listPHIDetectionJobs(params,cb);
		}

		
		service.ListRxNormInferenceJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filter",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filter",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listRxNormInferenceJobs(params,cb);
		}

		
		service.StartEntitiesDetectionV2Job=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"JobName",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"KMSKey",params,undefined,false); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(msg,"InputDataConfig",params,undefined,true); 
			copyArgs(msg,"OutputDataConfig",params,undefined,true); 
			copyArgs(msg,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(msg,"JobName",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"KMSKey",params,undefined,false); 
			copyArgs(msg,"LanguageCode",params,undefined,false); 
			

			svc.startEntitiesDetectionV2Job(params,cb);
		}

		
		service.StartICD10CMInferenceJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"JobName",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"KMSKey",params,undefined,false); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(msg,"InputDataConfig",params,undefined,true); 
			copyArgs(msg,"OutputDataConfig",params,undefined,true); 
			copyArgs(msg,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(msg,"JobName",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"KMSKey",params,undefined,false); 
			copyArgs(msg,"LanguageCode",params,undefined,false); 
			

			svc.startICD10CMInferenceJob(params,cb);
		}

		
		service.StartPHIDetectionJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"JobName",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"KMSKey",params,undefined,false); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(msg,"InputDataConfig",params,undefined,true); 
			copyArgs(msg,"OutputDataConfig",params,undefined,true); 
			copyArgs(msg,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(msg,"JobName",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"KMSKey",params,undefined,false); 
			copyArgs(msg,"LanguageCode",params,undefined,false); 
			

			svc.startPHIDetectionJob(params,cb);
		}

		
		service.StartRxNormInferenceJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"JobName",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"KMSKey",params,undefined,false); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(msg,"InputDataConfig",params,undefined,true); 
			copyArgs(msg,"OutputDataConfig",params,undefined,true); 
			copyArgs(msg,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(msg,"JobName",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"KMSKey",params,undefined,false); 
			copyArgs(msg,"LanguageCode",params,undefined,false); 
			

			svc.startRxNormInferenceJob(params,cb);
		}

		
		service.StopEntitiesDetectionV2Job=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.stopEntitiesDetectionV2Job(params,cb);
		}

		
		service.StopICD10CMInferenceJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.stopICD10CMInferenceJob(params,cb);
		}

		
		service.StopPHIDetectionJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.stopPHIDetectionJob(params,cb);
		}

		
		service.StopRxNormInferenceJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.stopRxNormInferenceJob(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS ComprehendMedical", AmazonAPINode);

};
