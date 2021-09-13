
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

		var awsService = new AWS.Comprehend( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Comprehend(msg.AWSConfig) : awsService;

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
		
		service.BatchDetectDominantLanguage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TextList",params,undefined,true); 
			
			copyArgs(n,"TextList",params,undefined,true); 
			
			copyArgs(msg,"TextList",params,undefined,true); 
			

			svc.batchDetectDominantLanguage(params,cb);
		}
		
		service.BatchDetectEntities=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TextList",params,undefined,true); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(n,"TextList",params,undefined,true); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(msg,"TextList",params,undefined,true); 
			copyArgs(msg,"LanguageCode",params,undefined,false); 
			

			svc.batchDetectEntities(params,cb);
		}
		
		service.BatchDetectKeyPhrases=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TextList",params,undefined,true); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(n,"TextList",params,undefined,true); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(msg,"TextList",params,undefined,true); 
			copyArgs(msg,"LanguageCode",params,undefined,false); 
			

			svc.batchDetectKeyPhrases(params,cb);
		}
		
		service.BatchDetectSentiment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TextList",params,undefined,true); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(n,"TextList",params,undefined,true); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(msg,"TextList",params,undefined,true); 
			copyArgs(msg,"LanguageCode",params,undefined,false); 
			

			svc.batchDetectSentiment(params,cb);
		}
		
		service.BatchDetectSyntax=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TextList",params,undefined,true); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(n,"TextList",params,undefined,true); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(msg,"TextList",params,undefined,true); 
			copyArgs(msg,"LanguageCode",params,undefined,false); 
			

			svc.batchDetectSyntax(params,cb);
		}
		
		service.ClassifyDocument=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Text",params,undefined,true); 
			copyArgs(n,"EndpointArn",params,undefined,false); 
			
			copyArgs(n,"Text",params,undefined,true); 
			copyArgs(n,"EndpointArn",params,undefined,false); 
			
			copyArgs(msg,"Text",params,undefined,true); 
			copyArgs(msg,"EndpointArn",params,undefined,false); 
			

			svc.classifyDocument(params,cb);
		}
		
		service.ContainsPiiEntities=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Text",params,undefined,false); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(n,"Text",params,undefined,false); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(msg,"Text",params,undefined,false); 
			copyArgs(msg,"LanguageCode",params,undefined,false); 
			

			svc.containsPiiEntities(params,cb);
		}
		
		service.CreateDocumentClassifier=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DocumentClassifierName",params,undefined,false); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(n,"DocumentClassifierName",params,undefined,false); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			copyArgs(n,"VolumeKmsKeyId",params,undefined,false); 
			copyArgs(n,"VpcConfig",params,undefined,true); 
			copyArgs(n,"Mode",params,undefined,false); 
			copyArgs(n,"ModelKmsKeyId",params,undefined,false); 
			
			copyArgs(msg,"DocumentClassifierName",params,undefined,false); 
			copyArgs(msg,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"InputDataConfig",params,undefined,true); 
			copyArgs(msg,"OutputDataConfig",params,undefined,true); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"LanguageCode",params,undefined,false); 
			copyArgs(msg,"VolumeKmsKeyId",params,undefined,false); 
			copyArgs(msg,"VpcConfig",params,undefined,true); 
			copyArgs(msg,"Mode",params,undefined,false); 
			copyArgs(msg,"ModelKmsKeyId",params,undefined,false); 
			

			svc.createDocumentClassifier(params,cb);
		}
		
		service.CreateEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			copyArgs(n,"ModelArn",params,undefined,false); 
			copyArgs(Number(n),"DesiredInferenceUnits",params,undefined,false); 
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			copyArgs(n,"ModelArn",params,undefined,false); 
			copyArgs(Number(n),"DesiredInferenceUnits",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			
			copyArgs(msg,"EndpointName",params,undefined,false); 
			copyArgs(msg,"ModelArn",params,undefined,false); 
			copyArgs(msg,"DesiredInferenceUnits",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"DataAccessRoleArn",params,undefined,false); 
			

			svc.createEndpoint(params,cb);
		}
		
		service.CreateEntityRecognizer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RecognizerName",params,undefined,false); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(n,"RecognizerName",params,undefined,false); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			copyArgs(n,"VolumeKmsKeyId",params,undefined,false); 
			copyArgs(n,"VpcConfig",params,undefined,true); 
			copyArgs(n,"ModelKmsKeyId",params,undefined,false); 
			
			copyArgs(msg,"RecognizerName",params,undefined,false); 
			copyArgs(msg,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"InputDataConfig",params,undefined,true); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"LanguageCode",params,undefined,false); 
			copyArgs(msg,"VolumeKmsKeyId",params,undefined,false); 
			copyArgs(msg,"VpcConfig",params,undefined,true); 
			copyArgs(msg,"ModelKmsKeyId",params,undefined,false); 
			

			svc.createEntityRecognizer(params,cb);
		}
		
		service.DeleteDocumentClassifier=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DocumentClassifierArn",params,undefined,false); 
			
			copyArgs(n,"DocumentClassifierArn",params,undefined,false); 
			
			copyArgs(msg,"DocumentClassifierArn",params,undefined,false); 
			

			svc.deleteDocumentClassifier(params,cb);
		}
		
		service.DeleteEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointArn",params,undefined,false); 
			
			copyArgs(n,"EndpointArn",params,undefined,false); 
			
			copyArgs(msg,"EndpointArn",params,undefined,false); 
			

			svc.deleteEndpoint(params,cb);
		}
		
		service.DeleteEntityRecognizer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EntityRecognizerArn",params,undefined,false); 
			
			copyArgs(n,"EntityRecognizerArn",params,undefined,false); 
			
			copyArgs(msg,"EntityRecognizerArn",params,undefined,false); 
			

			svc.deleteEntityRecognizer(params,cb);
		}
		
		service.DescribeDocumentClassificationJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.describeDocumentClassificationJob(params,cb);
		}
		
		service.DescribeDocumentClassifier=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DocumentClassifierArn",params,undefined,false); 
			
			copyArgs(n,"DocumentClassifierArn",params,undefined,false); 
			
			copyArgs(msg,"DocumentClassifierArn",params,undefined,false); 
			

			svc.describeDocumentClassifier(params,cb);
		}
		
		service.DescribeDominantLanguageDetectionJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.describeDominantLanguageDetectionJob(params,cb);
		}
		
		service.DescribeEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointArn",params,undefined,false); 
			
			copyArgs(n,"EndpointArn",params,undefined,false); 
			
			copyArgs(msg,"EndpointArn",params,undefined,false); 
			

			svc.describeEndpoint(params,cb);
		}
		
		service.DescribeEntitiesDetectionJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.describeEntitiesDetectionJob(params,cb);
		}
		
		service.DescribeEntityRecognizer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EntityRecognizerArn",params,undefined,false); 
			
			copyArgs(n,"EntityRecognizerArn",params,undefined,false); 
			
			copyArgs(msg,"EntityRecognizerArn",params,undefined,false); 
			

			svc.describeEntityRecognizer(params,cb);
		}
		
		service.DescribeEventsDetectionJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.describeEventsDetectionJob(params,cb);
		}
		
		service.DescribeKeyPhrasesDetectionJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.describeKeyPhrasesDetectionJob(params,cb);
		}
		
		service.DescribePiiEntitiesDetectionJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.describePiiEntitiesDetectionJob(params,cb);
		}
		
		service.DescribeSentimentDetectionJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.describeSentimentDetectionJob(params,cb);
		}
		
		service.DescribeTopicsDetectionJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.describeTopicsDetectionJob(params,cb);
		}
		
		service.DetectDominantLanguage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Text",params,undefined,true); 
			
			copyArgs(n,"Text",params,undefined,true); 
			
			copyArgs(msg,"Text",params,undefined,true); 
			

			svc.detectDominantLanguage(params,cb);
		}
		
		service.DetectEntities=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Text",params,undefined,true); 
			
			copyArgs(n,"Text",params,undefined,true); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			copyArgs(n,"EndpointArn",params,undefined,false); 
			
			copyArgs(msg,"Text",params,undefined,true); 
			copyArgs(msg,"LanguageCode",params,undefined,false); 
			copyArgs(msg,"EndpointArn",params,undefined,false); 
			

			svc.detectEntities(params,cb);
		}
		
		service.DetectKeyPhrases=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Text",params,undefined,true); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(n,"Text",params,undefined,true); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(msg,"Text",params,undefined,true); 
			copyArgs(msg,"LanguageCode",params,undefined,false); 
			

			svc.detectKeyPhrases(params,cb);
		}
		
		service.DetectPiiEntities=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Text",params,undefined,false); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(n,"Text",params,undefined,false); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(msg,"Text",params,undefined,false); 
			copyArgs(msg,"LanguageCode",params,undefined,false); 
			

			svc.detectPiiEntities(params,cb);
		}
		
		service.DetectSentiment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Text",params,undefined,true); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(n,"Text",params,undefined,true); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(msg,"Text",params,undefined,true); 
			copyArgs(msg,"LanguageCode",params,undefined,false); 
			

			svc.detectSentiment(params,cb);
		}
		
		service.DetectSyntax=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Text",params,undefined,true); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(n,"Text",params,undefined,true); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(msg,"Text",params,undefined,true); 
			copyArgs(msg,"LanguageCode",params,undefined,false); 
			

			svc.detectSyntax(params,cb);
		}
		
		service.ListDocumentClassificationJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filter",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filter",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listDocumentClassificationJobs(params,cb);
		}
		
		service.ListDocumentClassifiers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filter",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filter",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listDocumentClassifiers(params,cb);
		}
		
		service.ListDominantLanguageDetectionJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filter",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filter",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listDominantLanguageDetectionJobs(params,cb);
		}
		
		service.ListEndpoints=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filter",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filter",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listEndpoints(params,cb);
		}
		
		service.ListEntitiesDetectionJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filter",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filter",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listEntitiesDetectionJobs(params,cb);
		}
		
		service.ListEntityRecognizers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filter",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filter",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listEntityRecognizers(params,cb);
		}
		
		service.ListEventsDetectionJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filter",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filter",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listEventsDetectionJobs(params,cb);
		}
		
		service.ListKeyPhrasesDetectionJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filter",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filter",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listKeyPhrasesDetectionJobs(params,cb);
		}
		
		service.ListPiiEntitiesDetectionJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filter",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filter",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listPiiEntitiesDetectionJobs(params,cb);
		}
		
		service.ListSentimentDetectionJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filter",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filter",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listSentimentDetectionJobs(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.ListTopicsDetectionJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filter",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filter",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listTopicsDetectionJobs(params,cb);
		}
		
		service.StartDocumentClassificationJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DocumentClassifierArn",params,undefined,false); 
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			
			copyArgs(n,"JobName",params,undefined,false); 
			copyArgs(n,"DocumentClassifierArn",params,undefined,false); 
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"VolumeKmsKeyId",params,undefined,false); 
			copyArgs(n,"VpcConfig",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"JobName",params,undefined,false); 
			copyArgs(msg,"DocumentClassifierArn",params,undefined,false); 
			copyArgs(msg,"InputDataConfig",params,undefined,true); 
			copyArgs(msg,"OutputDataConfig",params,undefined,true); 
			copyArgs(msg,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"VolumeKmsKeyId",params,undefined,false); 
			copyArgs(msg,"VpcConfig",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.startDocumentClassificationJob(params,cb);
		}
		
		service.StartDominantLanguageDetectionJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"JobName",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"VolumeKmsKeyId",params,undefined,false); 
			copyArgs(n,"VpcConfig",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"InputDataConfig",params,undefined,true); 
			copyArgs(msg,"OutputDataConfig",params,undefined,true); 
			copyArgs(msg,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(msg,"JobName",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"VolumeKmsKeyId",params,undefined,false); 
			copyArgs(msg,"VpcConfig",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.startDominantLanguageDetectionJob(params,cb);
		}
		
		service.StartEntitiesDetectionJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"JobName",params,undefined,false); 
			copyArgs(n,"EntityRecognizerArn",params,undefined,false); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"VolumeKmsKeyId",params,undefined,false); 
			copyArgs(n,"VpcConfig",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"InputDataConfig",params,undefined,true); 
			copyArgs(msg,"OutputDataConfig",params,undefined,true); 
			copyArgs(msg,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(msg,"JobName",params,undefined,false); 
			copyArgs(msg,"EntityRecognizerArn",params,undefined,false); 
			copyArgs(msg,"LanguageCode",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"VolumeKmsKeyId",params,undefined,false); 
			copyArgs(msg,"VpcConfig",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.startEntitiesDetectionJob(params,cb);
		}
		
		service.StartEventsDetectionJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			copyArgs(n,"TargetEventTypes",params,undefined,true); 
			
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"JobName",params,undefined,false); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"TargetEventTypes",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"InputDataConfig",params,undefined,true); 
			copyArgs(msg,"OutputDataConfig",params,undefined,true); 
			copyArgs(msg,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(msg,"JobName",params,undefined,false); 
			copyArgs(msg,"LanguageCode",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"TargetEventTypes",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.startEventsDetectionJob(params,cb);
		}
		
		service.StartKeyPhrasesDetectionJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"JobName",params,undefined,false); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"VolumeKmsKeyId",params,undefined,false); 
			copyArgs(n,"VpcConfig",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"InputDataConfig",params,undefined,true); 
			copyArgs(msg,"OutputDataConfig",params,undefined,true); 
			copyArgs(msg,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(msg,"JobName",params,undefined,false); 
			copyArgs(msg,"LanguageCode",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"VolumeKmsKeyId",params,undefined,false); 
			copyArgs(msg,"VpcConfig",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.startKeyPhrasesDetectionJob(params,cb);
		}
		
		service.StartPiiEntitiesDetectionJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"Mode",params,undefined,false); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"Mode",params,undefined,false); 
			copyArgs(n,"RedactionConfig",params,undefined,true); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"JobName",params,undefined,false); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"InputDataConfig",params,undefined,true); 
			copyArgs(msg,"OutputDataConfig",params,undefined,true); 
			copyArgs(msg,"Mode",params,undefined,false); 
			copyArgs(msg,"RedactionConfig",params,undefined,true); 
			copyArgs(msg,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(msg,"JobName",params,undefined,false); 
			copyArgs(msg,"LanguageCode",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.startPiiEntitiesDetectionJob(params,cb);
		}
		
		service.StartSentimentDetectionJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"JobName",params,undefined,false); 
			copyArgs(n,"LanguageCode",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"VolumeKmsKeyId",params,undefined,false); 
			copyArgs(n,"VpcConfig",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"InputDataConfig",params,undefined,true); 
			copyArgs(msg,"OutputDataConfig",params,undefined,true); 
			copyArgs(msg,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(msg,"JobName",params,undefined,false); 
			copyArgs(msg,"LanguageCode",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"VolumeKmsKeyId",params,undefined,false); 
			copyArgs(msg,"VpcConfig",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.startSentimentDetectionJob(params,cb);
		}
		
		service.StartTopicsDetectionJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(n,"JobName",params,undefined,false); 
			copyArgs(Number(n),"NumberOfTopics",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"VolumeKmsKeyId",params,undefined,false); 
			copyArgs(n,"VpcConfig",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"InputDataConfig",params,undefined,true); 
			copyArgs(msg,"OutputDataConfig",params,undefined,true); 
			copyArgs(msg,"DataAccessRoleArn",params,undefined,false); 
			copyArgs(msg,"JobName",params,undefined,false); 
			copyArgs(msg,"NumberOfTopics",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"VolumeKmsKeyId",params,undefined,false); 
			copyArgs(msg,"VpcConfig",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.startTopicsDetectionJob(params,cb);
		}
		
		service.StopDominantLanguageDetectionJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.stopDominantLanguageDetectionJob(params,cb);
		}
		
		service.StopEntitiesDetectionJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.stopEntitiesDetectionJob(params,cb);
		}
		
		service.StopEventsDetectionJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.stopEventsDetectionJob(params,cb);
		}
		
		service.StopKeyPhrasesDetectionJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.stopKeyPhrasesDetectionJob(params,cb);
		}
		
		service.StopPiiEntitiesDetectionJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.stopPiiEntitiesDetectionJob(params,cb);
		}
		
		service.StopSentimentDetectionJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.stopSentimentDetectionJob(params,cb);
		}
		
		service.StopTrainingDocumentClassifier=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DocumentClassifierArn",params,undefined,false); 
			
			copyArgs(n,"DocumentClassifierArn",params,undefined,false); 
			
			copyArgs(msg,"DocumentClassifierArn",params,undefined,false); 
			

			svc.stopTrainingDocumentClassifier(params,cb);
		}
		
		service.StopTrainingEntityRecognizer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EntityRecognizerArn",params,undefined,false); 
			
			copyArgs(n,"EntityRecognizerArn",params,undefined,false); 
			
			copyArgs(msg,"EntityRecognizerArn",params,undefined,false); 
			

			svc.stopTrainingEntityRecognizer(params,cb);
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
		
		service.UpdateEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointArn",params,undefined,false); 
			copyArgs(Number(n),"DesiredInferenceUnits",params,undefined,false); 
			
			copyArgs(n,"EndpointArn",params,undefined,false); 
			copyArgs(Number(n),"DesiredInferenceUnits",params,undefined,false); 
			
			copyArgs(msg,"EndpointArn",params,undefined,false); 
			copyArgs(msg,"DesiredInferenceUnits",params,undefined,false); 
			

			svc.updateEndpoint(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS Comprehend", AmazonAPINode);

};
