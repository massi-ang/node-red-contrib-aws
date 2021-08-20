
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

		var awsService = new AWS.ComprehendMedical( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.ComprehendMedical(msg.AWSConfig) : awsService;

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

		
		service.DescribeEntitiesDetectionV2Job=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobId",params,undefined,false); 
			
			copyArg(msg,"JobId",params,undefined,false); 
			

			svc.describeEntitiesDetectionV2Job(params,cb);
		}

		
		service.DescribeICD10CMInferenceJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobId",params,undefined,false); 
			
			copyArg(msg,"JobId",params,undefined,false); 
			

			svc.describeICD10CMInferenceJob(params,cb);
		}

		
		service.DescribePHIDetectionJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobId",params,undefined,false); 
			
			copyArg(msg,"JobId",params,undefined,false); 
			

			svc.describePHIDetectionJob(params,cb);
		}

		
		service.DescribeRxNormInferenceJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobId",params,undefined,false); 
			
			copyArg(msg,"JobId",params,undefined,false); 
			

			svc.describeRxNormInferenceJob(params,cb);
		}

		
		service.DetectEntities=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Text",params,undefined,false); 
			
			copyArg(msg,"Text",params,undefined,false); 
			

			svc.detectEntities(params,cb);
		}

		
		service.DetectEntitiesV2=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Text",params,undefined,false); 
			
			copyArg(msg,"Text",params,undefined,false); 
			

			svc.detectEntitiesV2(params,cb);
		}

		
		service.DetectPHI=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Text",params,undefined,false); 
			
			copyArg(msg,"Text",params,undefined,false); 
			

			svc.detectPHI(params,cb);
		}

		
		service.InferICD10CM=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Text",params,undefined,false); 
			
			copyArg(msg,"Text",params,undefined,false); 
			

			svc.inferICD10CM(params,cb);
		}

		
		service.InferRxNorm=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Text",params,undefined,false); 
			
			copyArg(msg,"Text",params,undefined,false); 
			

			svc.inferRxNorm(params,cb);
		}

		
		service.ListEntitiesDetectionV2Jobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filter",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listEntitiesDetectionV2Jobs(params,cb);
		}

		
		service.ListICD10CMInferenceJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filter",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listICD10CMInferenceJobs(params,cb);
		}

		
		service.ListPHIDetectionJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filter",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listPHIDetectionJobs(params,cb);
		}

		
		service.ListRxNormInferenceJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filter",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listRxNormInferenceJobs(params,cb);
		}

		
		service.StartEntitiesDetectionV2Job=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InputDataConfig",params,undefined,true); 
			copyArg(n,"OutputDataConfig",params,undefined,true); 
			copyArg(n,"DataAccessRoleArn",params,undefined,false); 
			copyArg(n,"LanguageCode",params,undefined,false); 
			
			copyArg(msg,"InputDataConfig",params,undefined,true); 
			copyArg(msg,"OutputDataConfig",params,undefined,true); 
			copyArg(msg,"DataAccessRoleArn",params,undefined,false); 
			copyArg(msg,"JobName",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"KMSKey",params,undefined,false); 
			copyArg(msg,"LanguageCode",params,undefined,false); 
			

			svc.startEntitiesDetectionV2Job(params,cb);
		}

		
		service.StartICD10CMInferenceJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InputDataConfig",params,undefined,true); 
			copyArg(n,"OutputDataConfig",params,undefined,true); 
			copyArg(n,"DataAccessRoleArn",params,undefined,false); 
			copyArg(n,"LanguageCode",params,undefined,false); 
			
			copyArg(msg,"InputDataConfig",params,undefined,true); 
			copyArg(msg,"OutputDataConfig",params,undefined,true); 
			copyArg(msg,"DataAccessRoleArn",params,undefined,false); 
			copyArg(msg,"JobName",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"KMSKey",params,undefined,false); 
			copyArg(msg,"LanguageCode",params,undefined,false); 
			

			svc.startICD10CMInferenceJob(params,cb);
		}

		
		service.StartPHIDetectionJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InputDataConfig",params,undefined,true); 
			copyArg(n,"OutputDataConfig",params,undefined,true); 
			copyArg(n,"DataAccessRoleArn",params,undefined,false); 
			copyArg(n,"LanguageCode",params,undefined,false); 
			
			copyArg(msg,"InputDataConfig",params,undefined,true); 
			copyArg(msg,"OutputDataConfig",params,undefined,true); 
			copyArg(msg,"DataAccessRoleArn",params,undefined,false); 
			copyArg(msg,"JobName",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"KMSKey",params,undefined,false); 
			copyArg(msg,"LanguageCode",params,undefined,false); 
			

			svc.startPHIDetectionJob(params,cb);
		}

		
		service.StartRxNormInferenceJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InputDataConfig",params,undefined,true); 
			copyArg(n,"OutputDataConfig",params,undefined,true); 
			copyArg(n,"DataAccessRoleArn",params,undefined,false); 
			copyArg(n,"LanguageCode",params,undefined,false); 
			
			copyArg(msg,"InputDataConfig",params,undefined,true); 
			copyArg(msg,"OutputDataConfig",params,undefined,true); 
			copyArg(msg,"DataAccessRoleArn",params,undefined,false); 
			copyArg(msg,"JobName",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"KMSKey",params,undefined,false); 
			copyArg(msg,"LanguageCode",params,undefined,false); 
			

			svc.startRxNormInferenceJob(params,cb);
		}

		
		service.StopEntitiesDetectionV2Job=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobId",params,undefined,false); 
			
			copyArg(msg,"JobId",params,undefined,false); 
			

			svc.stopEntitiesDetectionV2Job(params,cb);
		}

		
		service.StopICD10CMInferenceJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobId",params,undefined,false); 
			
			copyArg(msg,"JobId",params,undefined,false); 
			

			svc.stopICD10CMInferenceJob(params,cb);
		}

		
		service.StopPHIDetectionJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobId",params,undefined,false); 
			
			copyArg(msg,"JobId",params,undefined,false); 
			

			svc.stopPHIDetectionJob(params,cb);
		}

		
		service.StopRxNormInferenceJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobId",params,undefined,false); 
			
			copyArg(msg,"JobId",params,undefined,false); 
			

			svc.stopRxNormInferenceJob(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS ComprehendMedical", AmazonAPINode);

};
