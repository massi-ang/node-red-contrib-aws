
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

		var awsService = new AWS.Rekognition( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Rekognition(msg.AWSConfig) : awsService;

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
		
			service.CompareFaces=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceImage",params,undefined,true); 
			copyArgs(n,"TargetImage",params,undefined,true); 
			
			copyArgs(n,"SourceImage",params,undefined,true); 
			copyArgs(n,"TargetImage",params,undefined,true); 
			copyArgs(n,"SimilarityThreshold",params,undefined,false); 
			copyArgs(n,"QualityFilter",params,undefined,false); 
			
			copyArgs(msg,"SourceImage",params,undefined,true); 
			copyArgs(msg,"TargetImage",params,undefined,true); 
			copyArgs(msg,"SimilarityThreshold",params,undefined,false); 
			copyArgs(msg,"QualityFilter",params,undefined,false); 
			

			svc.compareFaces(params,cb);
		}
			service.CreateCollection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CollectionId",params,undefined,false); 
			
			copyArgs(n,"CollectionId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"CollectionId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createCollection(params,cb);
		}
			service.CreateProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			
			copyArgs(msg,"ProjectName",params,undefined,false); 
			

			svc.createProject(params,cb);
		}
			service.CreateProjectVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProjectArn",params,undefined,false); 
			copyArgs(n,"VersionName",params,undefined,false); 
			copyArgs(n,"OutputConfig",params,undefined,true); 
			copyArgs(n,"TrainingData",params,undefined,true); 
			copyArgs(n,"TestingData",params,undefined,true); 
			
			copyArgs(n,"ProjectArn",params,undefined,false); 
			copyArgs(n,"VersionName",params,undefined,false); 
			copyArgs(n,"OutputConfig",params,undefined,true); 
			copyArgs(n,"TrainingData",params,undefined,true); 
			copyArgs(n,"TestingData",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			
			copyArgs(msg,"ProjectArn",params,undefined,false); 
			copyArgs(msg,"VersionName",params,undefined,false); 
			copyArgs(msg,"OutputConfig",params,undefined,true); 
			copyArgs(msg,"TrainingData",params,undefined,true); 
			copyArgs(msg,"TestingData",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			

			svc.createProjectVersion(params,cb);
		}
			service.CreateStreamProcessor=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Input",params,undefined,true); 
			copyArgs(n,"Output",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Settings",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"Input",params,undefined,true); 
			copyArgs(n,"Output",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Settings",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Input",params,undefined,true); 
			copyArgs(msg,"Output",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Settings",params,undefined,true); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createStreamProcessor(params,cb);
		}
			service.DeleteCollection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CollectionId",params,undefined,false); 
			
			copyArgs(n,"CollectionId",params,undefined,false); 
			
			copyArgs(msg,"CollectionId",params,undefined,false); 
			

			svc.deleteCollection(params,cb);
		}
			service.DeleteFaces=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CollectionId",params,undefined,false); 
			copyArgs(n,"FaceIds",params,undefined,true); 
			
			copyArgs(n,"CollectionId",params,undefined,false); 
			copyArgs(n,"FaceIds",params,undefined,true); 
			
			copyArgs(msg,"CollectionId",params,undefined,false); 
			copyArgs(msg,"FaceIds",params,undefined,true); 
			

			svc.deleteFaces(params,cb);
		}
			service.DeleteProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProjectArn",params,undefined,false); 
			
			copyArgs(n,"ProjectArn",params,undefined,false); 
			
			copyArgs(msg,"ProjectArn",params,undefined,false); 
			

			svc.deleteProject(params,cb);
		}
			service.DeleteProjectVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProjectVersionArn",params,undefined,false); 
			
			copyArgs(n,"ProjectVersionArn",params,undefined,false); 
			
			copyArgs(msg,"ProjectVersionArn",params,undefined,false); 
			

			svc.deleteProjectVersion(params,cb);
		}
			service.DeleteStreamProcessor=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteStreamProcessor(params,cb);
		}
			service.DescribeCollection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CollectionId",params,undefined,false); 
			
			copyArgs(n,"CollectionId",params,undefined,false); 
			
			copyArgs(msg,"CollectionId",params,undefined,false); 
			

			svc.describeCollection(params,cb);
		}
			service.DescribeProjectVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProjectArn",params,undefined,false); 
			
			copyArgs(n,"ProjectArn",params,undefined,false); 
			copyArgs(n,"VersionNames",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ProjectArn",params,undefined,false); 
			copyArgs(msg,"VersionNames",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeProjectVersions(params,cb);
		}
			service.DescribeProjects=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeProjects(params,cb);
		}
			service.DescribeStreamProcessor=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.describeStreamProcessor(params,cb);
		}
			service.DetectCustomLabels=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProjectVersionArn",params,undefined,false); 
			copyArgs(n,"Image",params,undefined,true); 
			
			copyArgs(n,"ProjectVersionArn",params,undefined,false); 
			copyArgs(n,"Image",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"MinConfidence",params,undefined,false); 
			
			copyArgs(msg,"ProjectVersionArn",params,undefined,false); 
			copyArgs(msg,"Image",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"MinConfidence",params,undefined,false); 
			

			svc.detectCustomLabels(params,cb);
		}
			service.DetectFaces=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Image",params,undefined,true); 
			
			copyArgs(n,"Image",params,undefined,true); 
			copyArgs(n,"Attributes",params,undefined,true); 
			
			copyArgs(msg,"Image",params,undefined,true); 
			copyArgs(msg,"Attributes",params,undefined,true); 
			

			svc.detectFaces(params,cb);
		}
			service.DetectLabels=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Image",params,undefined,true); 
			
			copyArgs(n,"Image",params,undefined,true); 
			copyArgs(Number(n),"MaxLabels",params,undefined,false); 
			copyArgs(n,"MinConfidence",params,undefined,false); 
			
			copyArgs(msg,"Image",params,undefined,true); 
			copyArgs(msg,"MaxLabels",params,undefined,false); 
			copyArgs(msg,"MinConfidence",params,undefined,false); 
			

			svc.detectLabels(params,cb);
		}
			service.DetectModerationLabels=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Image",params,undefined,true); 
			
			copyArgs(n,"Image",params,undefined,true); 
			copyArgs(n,"MinConfidence",params,undefined,false); 
			copyArgs(n,"HumanLoopConfig",params,undefined,false); 
			
			copyArgs(msg,"Image",params,undefined,true); 
			copyArgs(msg,"MinConfidence",params,undefined,false); 
			copyArgs(msg,"HumanLoopConfig",params,undefined,false); 
			

			svc.detectModerationLabels(params,cb);
		}
			service.DetectProtectiveEquipment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Image",params,undefined,true); 
			
			copyArgs(n,"Image",params,undefined,true); 
			copyArgs(n,"SummarizationAttributes",params,undefined,false); 
			
			copyArgs(msg,"Image",params,undefined,true); 
			copyArgs(msg,"SummarizationAttributes",params,undefined,false); 
			

			svc.detectProtectiveEquipment(params,cb);
		}
			service.DetectText=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Image",params,undefined,true); 
			
			copyArgs(n,"Image",params,undefined,true); 
			copyArgs(n,"Filters",params,undefined,false); 
			
			copyArgs(msg,"Image",params,undefined,true); 
			copyArgs(msg,"Filters",params,undefined,false); 
			

			svc.detectText(params,cb);
		}
			service.GetCelebrityInfo=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getCelebrityInfo(params,cb);
		}
			service.GetCelebrityRecognition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			

			svc.getCelebrityRecognition(params,cb);
		}
			service.GetContentModeration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			

			svc.getContentModeration(params,cb);
		}
			service.GetFaceDetection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getFaceDetection(params,cb);
		}
			service.GetFaceSearch=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			

			svc.getFaceSearch(params,cb);
		}
			service.GetLabelDetection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			

			svc.getLabelDetection(params,cb);
		}
			service.GetPersonTracking=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			

			svc.getPersonTracking(params,cb);
		}
			service.GetSegmentDetection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getSegmentDetection(params,cb);
		}
			service.GetTextDetection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getTextDetection(params,cb);
		}
			service.IndexFaces=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CollectionId",params,undefined,false); 
			copyArgs(n,"Image",params,undefined,true); 
			
			copyArgs(n,"CollectionId",params,undefined,false); 
			copyArgs(n,"Image",params,undefined,true); 
			copyArgs(n,"ExternalImageId",params,undefined,false); 
			copyArgs(n,"DetectionAttributes",params,undefined,true); 
			copyArgs(Number(n),"MaxFaces",params,undefined,false); 
			copyArgs(n,"QualityFilter",params,undefined,false); 
			
			copyArgs(msg,"CollectionId",params,undefined,false); 
			copyArgs(msg,"Image",params,undefined,true); 
			copyArgs(msg,"ExternalImageId",params,undefined,false); 
			copyArgs(msg,"DetectionAttributes",params,undefined,true); 
			copyArgs(msg,"MaxFaces",params,undefined,false); 
			copyArgs(msg,"QualityFilter",params,undefined,false); 
			

			svc.indexFaces(params,cb);
		}
			service.ListCollections=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listCollections(params,cb);
		}
			service.ListFaces=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CollectionId",params,undefined,false); 
			
			copyArgs(n,"CollectionId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"CollectionId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listFaces(params,cb);
		}
			service.ListStreamProcessors=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listStreamProcessors(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.RecognizeCelebrities=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Image",params,undefined,true); 
			
			copyArgs(n,"Image",params,undefined,true); 
			
			copyArgs(msg,"Image",params,undefined,true); 
			

			svc.recognizeCelebrities(params,cb);
		}
			service.SearchFaces=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CollectionId",params,undefined,false); 
			copyArgs(n,"FaceId",params,undefined,false); 
			
			copyArgs(n,"CollectionId",params,undefined,false); 
			copyArgs(n,"FaceId",params,undefined,false); 
			copyArgs(Number(n),"MaxFaces",params,undefined,false); 
			copyArgs(n,"FaceMatchThreshold",params,undefined,false); 
			
			copyArgs(msg,"CollectionId",params,undefined,false); 
			copyArgs(msg,"FaceId",params,undefined,false); 
			copyArgs(msg,"MaxFaces",params,undefined,false); 
			copyArgs(msg,"FaceMatchThreshold",params,undefined,false); 
			

			svc.searchFaces(params,cb);
		}
			service.SearchFacesByImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CollectionId",params,undefined,false); 
			copyArgs(n,"Image",params,undefined,true); 
			
			copyArgs(n,"CollectionId",params,undefined,false); 
			copyArgs(n,"Image",params,undefined,true); 
			copyArgs(Number(n),"MaxFaces",params,undefined,false); 
			copyArgs(n,"FaceMatchThreshold",params,undefined,false); 
			copyArgs(n,"QualityFilter",params,undefined,false); 
			
			copyArgs(msg,"CollectionId",params,undefined,false); 
			copyArgs(msg,"Image",params,undefined,true); 
			copyArgs(msg,"MaxFaces",params,undefined,false); 
			copyArgs(msg,"FaceMatchThreshold",params,undefined,false); 
			copyArgs(msg,"QualityFilter",params,undefined,false); 
			

			svc.searchFacesByImage(params,cb);
		}
			service.StartCelebrityRecognition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Video",params,undefined,true); 
			
			copyArgs(n,"Video",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"NotificationChannel",params,undefined,true); 
			copyArgs(n,"JobTag",params,undefined,false); 
			
			copyArgs(msg,"Video",params,undefined,true); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"NotificationChannel",params,undefined,true); 
			copyArgs(msg,"JobTag",params,undefined,false); 
			

			svc.startCelebrityRecognition(params,cb);
		}
			service.StartContentModeration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Video",params,undefined,true); 
			
			copyArgs(n,"Video",params,undefined,true); 
			copyArgs(n,"MinConfidence",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"NotificationChannel",params,undefined,true); 
			copyArgs(n,"JobTag",params,undefined,false); 
			
			copyArgs(msg,"Video",params,undefined,true); 
			copyArgs(msg,"MinConfidence",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"NotificationChannel",params,undefined,true); 
			copyArgs(msg,"JobTag",params,undefined,false); 
			

			svc.startContentModeration(params,cb);
		}
			service.StartFaceDetection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Video",params,undefined,true); 
			
			copyArgs(n,"Video",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"NotificationChannel",params,undefined,true); 
			copyArgs(n,"FaceAttributes",params,undefined,false); 
			copyArgs(n,"JobTag",params,undefined,false); 
			
			copyArgs(msg,"Video",params,undefined,true); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"NotificationChannel",params,undefined,true); 
			copyArgs(msg,"FaceAttributes",params,undefined,false); 
			copyArgs(msg,"JobTag",params,undefined,false); 
			

			svc.startFaceDetection(params,cb);
		}
			service.StartFaceSearch=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Video",params,undefined,true); 
			copyArgs(n,"CollectionId",params,undefined,false); 
			
			copyArgs(n,"Video",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"FaceMatchThreshold",params,undefined,false); 
			copyArgs(n,"CollectionId",params,undefined,false); 
			copyArgs(n,"NotificationChannel",params,undefined,true); 
			copyArgs(n,"JobTag",params,undefined,false); 
			
			copyArgs(msg,"Video",params,undefined,true); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"FaceMatchThreshold",params,undefined,false); 
			copyArgs(msg,"CollectionId",params,undefined,false); 
			copyArgs(msg,"NotificationChannel",params,undefined,true); 
			copyArgs(msg,"JobTag",params,undefined,false); 
			

			svc.startFaceSearch(params,cb);
		}
			service.StartLabelDetection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Video",params,undefined,true); 
			
			copyArgs(n,"Video",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"MinConfidence",params,undefined,false); 
			copyArgs(n,"NotificationChannel",params,undefined,true); 
			copyArgs(n,"JobTag",params,undefined,false); 
			
			copyArgs(msg,"Video",params,undefined,true); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"MinConfidence",params,undefined,false); 
			copyArgs(msg,"NotificationChannel",params,undefined,true); 
			copyArgs(msg,"JobTag",params,undefined,false); 
			

			svc.startLabelDetection(params,cb);
		}
			service.StartPersonTracking=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Video",params,undefined,true); 
			
			copyArgs(n,"Video",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"NotificationChannel",params,undefined,true); 
			copyArgs(n,"JobTag",params,undefined,false); 
			
			copyArgs(msg,"Video",params,undefined,true); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"NotificationChannel",params,undefined,true); 
			copyArgs(msg,"JobTag",params,undefined,false); 
			

			svc.startPersonTracking(params,cb);
		}
			service.StartProjectVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProjectVersionArn",params,undefined,false); 
			copyArgs(Number(n),"MinInferenceUnits",params,undefined,false); 
			
			copyArgs(n,"ProjectVersionArn",params,undefined,false); 
			copyArgs(Number(n),"MinInferenceUnits",params,undefined,false); 
			
			copyArgs(msg,"ProjectVersionArn",params,undefined,false); 
			copyArgs(msg,"MinInferenceUnits",params,undefined,false); 
			

			svc.startProjectVersion(params,cb);
		}
			service.StartSegmentDetection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Video",params,undefined,true); 
			copyArgs(n,"SegmentTypes",params,undefined,false); 
			
			copyArgs(n,"Video",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"NotificationChannel",params,undefined,true); 
			copyArgs(n,"JobTag",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(n,"SegmentTypes",params,undefined,false); 
			
			copyArgs(msg,"Video",params,undefined,true); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"NotificationChannel",params,undefined,true); 
			copyArgs(msg,"JobTag",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"SegmentTypes",params,undefined,false); 
			

			svc.startSegmentDetection(params,cb);
		}
			service.StartStreamProcessor=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.startStreamProcessor(params,cb);
		}
			service.StartTextDetection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Video",params,undefined,true); 
			
			copyArgs(n,"Video",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"NotificationChannel",params,undefined,true); 
			copyArgs(n,"JobTag",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			
			copyArgs(msg,"Video",params,undefined,true); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"NotificationChannel",params,undefined,true); 
			copyArgs(msg,"JobTag",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			

			svc.startTextDetection(params,cb);
		}
			service.StopProjectVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProjectVersionArn",params,undefined,false); 
			
			copyArgs(n,"ProjectVersionArn",params,undefined,false); 
			
			copyArgs(msg,"ProjectVersionArn",params,undefined,false); 
			

			svc.stopProjectVersion(params,cb);
		}
			service.StopStreamProcessor=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.stopStreamProcessor(params,cb);
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
	
	}
	RED.nodes.registerType("AWS Rekognition", AmazonAPINode);

};
