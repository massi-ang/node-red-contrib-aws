
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

		var awsService = new AWS.Translate( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Translate(msg.AWSConfig) : awsService;

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

		
		service.CreateParallelData=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ParallelDataConfig",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"ParallelDataConfig",params,undefined,true); 
			copyArgs(n,"EncryptionKey",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"ParallelDataConfig",params,undefined,true); 
			copyArgs(msg,"EncryptionKey",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.createParallelData(params,cb);
		}

		
		service.DeleteParallelData=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteParallelData(params,cb);
		}

		
		service.DeleteTerminology=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteTerminology(params,cb);
		}

		
		service.DescribeTextTranslationJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.describeTextTranslationJob(params,cb);
		}

		
		service.GetParallelData=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getParallelData(params,cb);
		}

		
		service.GetTerminology=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"TerminologyDataFormat",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"TerminologyDataFormat",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"TerminologyDataFormat",params,undefined,false); 
			

			svc.getTerminology(params,cb);
		}

		
		service.ImportTerminology=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"MergeStrategy",params,undefined,false); 
			copyArgs(n,"TerminologyData",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"MergeStrategy",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"TerminologyData",params,undefined,false); 
			copyArgs(n,"EncryptionKey",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"MergeStrategy",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"TerminologyData",params,undefined,false); 
			copyArgs(msg,"EncryptionKey",params,undefined,true); 
			

			svc.importTerminology(params,cb);
		}

		
		service.ListParallelData=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listParallelData(params,cb);
		}

		
		service.ListTerminologies=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listTerminologies(params,cb);
		}

		
		service.ListTextTranslationJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filter",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filter",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listTextTranslationJobs(params,cb);
		}

		
		service.StartTextTranslationJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"SourceLanguageCode",params,undefined,false); 
			copyArgs(n,"TargetLanguageCodes",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(n,"JobName",params,undefined,false); 
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"SourceLanguageCode",params,undefined,false); 
			copyArgs(n,"TargetLanguageCodes",params,undefined,true); 
			copyArgs(n,"TerminologyNames",params,undefined,true); 
			copyArgs(n,"ParallelDataNames",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"JobName",params,undefined,false); 
			copyArgs(msg,"InputDataConfig",params,undefined,true); 
			copyArgs(msg,"OutputDataConfig",params,undefined,true); 
			copyArgs(msg,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(msg,"SourceLanguageCode",params,undefined,false); 
			copyArgs(msg,"TargetLanguageCodes",params,undefined,true); 
			copyArgs(msg,"TerminologyNames",params,undefined,true); 
			copyArgs(msg,"ParallelDataNames",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.startTextTranslationJob(params,cb);
		}

		
		service.StopTextTranslationJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.stopTextTranslationJob(params,cb);
		}

		
		service.TranslateText=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Text",params,undefined,false); 
			copyArgs(n,"SourceLanguageCode",params,undefined,false); 
			copyArgs(n,"TargetLanguageCode",params,undefined,false); 
			
			copyArgs(n,"Text",params,undefined,false); 
			copyArgs(n,"TerminologyNames",params,undefined,true); 
			copyArgs(n,"SourceLanguageCode",params,undefined,false); 
			copyArgs(n,"TargetLanguageCode",params,undefined,false); 
			
			copyArgs(msg,"Text",params,undefined,false); 
			copyArgs(msg,"TerminologyNames",params,undefined,true); 
			copyArgs(msg,"SourceLanguageCode",params,undefined,false); 
			copyArgs(msg,"TargetLanguageCode",params,undefined,false); 
			

			svc.translateText(params,cb);
		}

		
		service.UpdateParallelData=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ParallelDataConfig",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"ParallelDataConfig",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"ParallelDataConfig",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.updateParallelData(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Translate", AmazonAPINode);

};
