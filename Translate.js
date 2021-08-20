
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

		var awsService = new AWS.Translate( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Translate(msg.AWSConfig) : awsService;

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

		
		service.CreateParallelData=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"ParallelDataConfig",params,undefined,true); 
			copyArg(n,"ClientToken",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"ParallelDataConfig",params,undefined,true); 
			copyArg(msg,"EncryptionKey",params,undefined,true); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.createParallelData(params,cb);
		}

		
		service.DeleteParallelData=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteParallelData(params,cb);
		}

		
		service.DeleteTerminology=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteTerminology(params,cb);
		}

		
		service.DescribeTextTranslationJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobId",params,undefined,false); 
			
			copyArg(msg,"JobId",params,undefined,false); 
			

			svc.describeTextTranslationJob(params,cb);
		}

		
		service.GetParallelData=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.getParallelData(params,cb);
		}

		
		service.GetTerminology=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"TerminologyDataFormat",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"TerminologyDataFormat",params,undefined,false); 
			

			svc.getTerminology(params,cb);
		}

		
		service.ImportTerminology=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"MergeStrategy",params,undefined,false); 
			copyArg(n,"TerminologyData",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"MergeStrategy",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"TerminologyData",params,undefined,false); 
			copyArg(msg,"EncryptionKey",params,undefined,true); 
			

			svc.importTerminology(params,cb);
		}

		
		service.ListParallelData=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listParallelData(params,cb);
		}

		
		service.ListTerminologies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listTerminologies(params,cb);
		}

		
		service.ListTextTranslationJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filter",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listTextTranslationJobs(params,cb);
		}

		
		service.StartTextTranslationJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InputDataConfig",params,undefined,true); 
			copyArg(n,"OutputDataConfig",params,undefined,true); 
			copyArg(n,"DataAccessRoleArn",params,undefined,false); 
			copyArg(n,"SourceLanguageCode",params,undefined,false); 
			copyArg(n,"TargetLanguageCodes",params,undefined,true); 
			copyArg(n,"ClientToken",params,undefined,false); 
			
			copyArg(msg,"JobName",params,undefined,false); 
			copyArg(msg,"InputDataConfig",params,undefined,true); 
			copyArg(msg,"OutputDataConfig",params,undefined,true); 
			copyArg(msg,"DataAccessRoleArn",params,undefined,false); 
			copyArg(msg,"SourceLanguageCode",params,undefined,false); 
			copyArg(msg,"TargetLanguageCodes",params,undefined,true); 
			copyArg(msg,"TerminologyNames",params,undefined,true); 
			copyArg(msg,"ParallelDataNames",params,undefined,true); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.startTextTranslationJob(params,cb);
		}

		
		service.StopTextTranslationJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobId",params,undefined,false); 
			
			copyArg(msg,"JobId",params,undefined,false); 
			

			svc.stopTextTranslationJob(params,cb);
		}

		
		service.TranslateText=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Text",params,undefined,false); 
			copyArg(n,"SourceLanguageCode",params,undefined,false); 
			copyArg(n,"TargetLanguageCode",params,undefined,false); 
			
			copyArg(msg,"Text",params,undefined,false); 
			copyArg(msg,"TerminologyNames",params,undefined,true); 
			copyArg(msg,"SourceLanguageCode",params,undefined,false); 
			copyArg(msg,"TargetLanguageCode",params,undefined,false); 
			

			svc.translateText(params,cb);
		}

		
		service.UpdateParallelData=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"ParallelDataConfig",params,undefined,true); 
			copyArg(n,"ClientToken",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"ParallelDataConfig",params,undefined,true); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.updateParallelData(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Translate", AmazonAPINode);

};
