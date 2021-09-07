
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

		var awsService = new AWS.Polly( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Polly(msg.AWSConfig) : awsService;

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

		
		service.DeleteLexicon=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteLexicon(params,cb);
		}

		
		service.DescribeVoices=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			copyArgs(n,"IncludeAdditionalLanguageCodes",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Engine",params,undefined,false); 
			copyArgs(msg,"LanguageCode",params,undefined,false); 
			copyArgs(msg,"IncludeAdditionalLanguageCodes",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeVoices(params,cb);
		}

		
		service.GetLexicon=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getLexicon(params,cb);
		}

		
		service.GetSpeechSynthesisTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TaskId",params,undefined,false); 
			
			copyArgs(n,"TaskId",params,undefined,false); 
			
			copyArgs(msg,"TaskId",params,undefined,false); 
			

			svc.getSpeechSynthesisTask(params,cb);
		}

		
		service.ListLexicons=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listLexicons(params,cb);
		}

		
		service.ListSpeechSynthesisTasks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			

			svc.listSpeechSynthesisTasks(params,cb);
		}

		
		service.PutLexicon=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Content",params,undefined,true); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Content",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Content",params,undefined,true); 
			

			svc.putLexicon(params,cb);
		}

		
		service.StartSpeechSynthesisTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OutputFormat",params,undefined,false); 
			copyArgs(n,"OutputS3BucketName",params,undefined,false); 
			copyArgs(n,"Text",params,undefined,false); 
			copyArgs(n,"VoiceId",params,undefined,false); 
			
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			copyArgs(n,"LexiconNames",params,undefined,true); 
			copyArgs(n,"OutputFormat",params,undefined,false); 
			copyArgs(n,"OutputS3BucketName",params,undefined,false); 
			copyArgs(n,"OutputS3KeyPrefix",params,undefined,false); 
			copyArgs(n,"SampleRate",params,undefined,false); 
			copyArgs(n,"SnsTopicArn",params,undefined,false); 
			copyArgs(n,"SpeechMarkTypes",params,undefined,true); 
			copyArgs(n,"Text",params,undefined,false); 
			copyArgs(n,"TextType",params,undefined,false); 
			copyArgs(n,"VoiceId",params,undefined,false); 
			
			copyArgs(msg,"Engine",params,undefined,false); 
			copyArgs(msg,"LanguageCode",params,undefined,false); 
			copyArgs(msg,"LexiconNames",params,undefined,true); 
			copyArgs(msg,"OutputFormat",params,undefined,false); 
			copyArgs(msg,"OutputS3BucketName",params,undefined,false); 
			copyArgs(msg,"OutputS3KeyPrefix",params,undefined,false); 
			copyArgs(msg,"SampleRate",params,undefined,false); 
			copyArgs(msg,"SnsTopicArn",params,undefined,false); 
			copyArgs(msg,"SpeechMarkTypes",params,undefined,true); 
			copyArgs(msg,"Text",params,undefined,false); 
			copyArgs(msg,"TextType",params,undefined,false); 
			copyArgs(msg,"VoiceId",params,undefined,false); 
			

			svc.startSpeechSynthesisTask(params,cb);
		}

		
		service.SynthesizeSpeech=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OutputFormat",params,undefined,false); 
			copyArgs(n,"Text",params,undefined,false); 
			copyArgs(n,"VoiceId",params,undefined,false); 
			
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			copyArgs(n,"LexiconNames",params,undefined,true); 
			copyArgs(n,"OutputFormat",params,undefined,false); 
			copyArgs(n,"SampleRate",params,undefined,false); 
			copyArgs(n,"SpeechMarkTypes",params,undefined,true); 
			copyArgs(n,"Text",params,undefined,false); 
			copyArgs(n,"TextType",params,undefined,false); 
			copyArgs(n,"VoiceId",params,undefined,false); 
			
			copyArgs(msg,"Engine",params,undefined,false); 
			copyArgs(msg,"LanguageCode",params,undefined,false); 
			copyArgs(msg,"LexiconNames",params,undefined,true); 
			copyArgs(msg,"OutputFormat",params,undefined,false); 
			copyArgs(msg,"SampleRate",params,undefined,false); 
			copyArgs(msg,"SpeechMarkTypes",params,undefined,true); 
			copyArgs(msg,"Text",params,undefined,false); 
			copyArgs(msg,"TextType",params,undefined,false); 
			copyArgs(msg,"VoiceId",params,undefined,false); 
			

			svc.synthesizeSpeech(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Polly", AmazonAPINode);

};
