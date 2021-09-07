
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

		var awsService = new AWS.CloudTrail( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.CloudTrail(msg.AWSConfig) : awsService;

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

		
		service.AddTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"TagsList",params,undefined,true); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"TagsList",params,undefined,true); 
			

			svc.addTags(params,cb);
		}

		
		service.CreateTrail=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"S3BucketName",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"S3BucketName",params,undefined,false); 
			copyArgs(n,"S3KeyPrefix",params,undefined,false); 
			copyArgs(n,"SnsTopicName",params,undefined,false); 
			copyArgs(n,"IncludeGlobalServiceEvents",params,undefined,false); 
			copyArgs(n,"IsMultiRegionTrail",params,undefined,false); 
			copyArgs(n,"EnableLogFileValidation",params,undefined,false); 
			copyArgs(n,"CloudWatchLogsLogGroupArn",params,undefined,false); 
			copyArgs(n,"CloudWatchLogsRoleArn",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"IsOrganizationTrail",params,undefined,false); 
			copyArgs(n,"TagsList",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"S3BucketName",params,undefined,false); 
			copyArgs(msg,"S3KeyPrefix",params,undefined,false); 
			copyArgs(msg,"SnsTopicName",params,undefined,false); 
			copyArgs(msg,"IncludeGlobalServiceEvents",params,undefined,false); 
			copyArgs(msg,"IsMultiRegionTrail",params,undefined,false); 
			copyArgs(msg,"EnableLogFileValidation",params,undefined,false); 
			copyArgs(msg,"CloudWatchLogsLogGroupArn",params,undefined,false); 
			copyArgs(msg,"CloudWatchLogsRoleArn",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"IsOrganizationTrail",params,undefined,false); 
			copyArgs(msg,"TagsList",params,undefined,true); 
			

			svc.createTrail(params,cb);
		}

		
		service.DeleteTrail=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteTrail(params,cb);
		}

		
		service.DescribeTrails=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"trailNameList",params,undefined,false); 
			copyArgs(n,"includeShadowTrails",params,undefined,false); 
			
			copyArgs(msg,"trailNameList",params,undefined,false); 
			copyArgs(msg,"includeShadowTrails",params,undefined,false); 
			

			svc.describeTrails(params,cb);
		}

		
		service.GetEventSelectors=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrailName",params,undefined,false); 
			
			copyArgs(n,"TrailName",params,undefined,false); 
			
			copyArgs(msg,"TrailName",params,undefined,false); 
			

			svc.getEventSelectors(params,cb);
		}

		
		service.GetInsightSelectors=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrailName",params,undefined,false); 
			
			copyArgs(n,"TrailName",params,undefined,false); 
			
			copyArgs(msg,"TrailName",params,undefined,false); 
			

			svc.getInsightSelectors(params,cb);
		}

		
		service.GetTrail=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getTrail(params,cb);
		}

		
		service.GetTrailStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getTrailStatus(params,cb);
		}

		
		service.ListPublicKeys=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listPublicKeys(params,cb);
		}

		
		service.ListTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceIdList",params,undefined,false); 
			
			copyArgs(n,"ResourceIdList",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ResourceIdList",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listTags(params,cb);
		}

		
		service.ListTrails=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listTrails(params,cb);
		}

		
		service.LookupEvents=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"LookupAttributes",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(n,"EventCategory",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"LookupAttributes",params,undefined,false); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"EventCategory",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.lookupEvents(params,cb);
		}

		
		service.PutEventSelectors=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrailName",params,undefined,false); 
			
			copyArgs(n,"TrailName",params,undefined,false); 
			copyArgs(n,"EventSelectors",params,undefined,true); 
			copyArgs(n,"AdvancedEventSelectors",params,undefined,true); 
			
			copyArgs(msg,"TrailName",params,undefined,false); 
			copyArgs(msg,"EventSelectors",params,undefined,true); 
			copyArgs(msg,"AdvancedEventSelectors",params,undefined,true); 
			

			svc.putEventSelectors(params,cb);
		}

		
		service.PutInsightSelectors=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrailName",params,undefined,false); 
			copyArgs(n,"InsightSelectors",params,undefined,true); 
			
			copyArgs(n,"TrailName",params,undefined,false); 
			copyArgs(n,"InsightSelectors",params,undefined,true); 
			
			copyArgs(msg,"TrailName",params,undefined,false); 
			copyArgs(msg,"InsightSelectors",params,undefined,true); 
			

			svc.putInsightSelectors(params,cb);
		}

		
		service.RemoveTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"TagsList",params,undefined,true); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"TagsList",params,undefined,true); 
			

			svc.removeTags(params,cb);
		}

		
		service.StartLogging=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.startLogging(params,cb);
		}

		
		service.StopLogging=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.stopLogging(params,cb);
		}

		
		service.UpdateTrail=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"S3BucketName",params,undefined,false); 
			copyArgs(n,"S3KeyPrefix",params,undefined,false); 
			copyArgs(n,"SnsTopicName",params,undefined,false); 
			copyArgs(n,"IncludeGlobalServiceEvents",params,undefined,false); 
			copyArgs(n,"IsMultiRegionTrail",params,undefined,false); 
			copyArgs(n,"EnableLogFileValidation",params,undefined,false); 
			copyArgs(n,"CloudWatchLogsLogGroupArn",params,undefined,false); 
			copyArgs(n,"CloudWatchLogsRoleArn",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"IsOrganizationTrail",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"S3BucketName",params,undefined,false); 
			copyArgs(msg,"S3KeyPrefix",params,undefined,false); 
			copyArgs(msg,"SnsTopicName",params,undefined,false); 
			copyArgs(msg,"IncludeGlobalServiceEvents",params,undefined,false); 
			copyArgs(msg,"IsMultiRegionTrail",params,undefined,false); 
			copyArgs(msg,"EnableLogFileValidation",params,undefined,false); 
			copyArgs(msg,"CloudWatchLogsLogGroupArn",params,undefined,false); 
			copyArgs(msg,"CloudWatchLogsRoleArn",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"IsOrganizationTrail",params,undefined,false); 
			

			svc.updateTrail(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS CloudTrail", AmazonAPINode);

};
