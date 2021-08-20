
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

		var awsService = new AWS.CloudTrail( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.CloudTrail(msg.AWSConfig) : awsService;

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

		
		service.AddTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"TagsList",params,undefined,true); 
			

			svc.addTags(params,cb);
		}

		
		service.CreateTrail=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"S3BucketName",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"S3BucketName",params,undefined,false); 
			copyArg(msg,"S3KeyPrefix",params,undefined,false); 
			copyArg(msg,"SnsTopicName",params,undefined,false); 
			copyArg(msg,"IncludeGlobalServiceEvents",params,undefined,false); 
			copyArg(msg,"IsMultiRegionTrail",params,undefined,false); 
			copyArg(msg,"EnableLogFileValidation",params,undefined,false); 
			copyArg(msg,"CloudWatchLogsLogGroupArn",params,undefined,false); 
			copyArg(msg,"CloudWatchLogsRoleArn",params,undefined,false); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"IsOrganizationTrail",params,undefined,false); 
			copyArg(msg,"TagsList",params,undefined,true); 
			

			svc.createTrail(params,cb);
		}

		
		service.DeleteTrail=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteTrail(params,cb);
		}

		
		service.DescribeTrails=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"trailNameList",params,undefined,false); 
			copyArg(msg,"includeShadowTrails",params,undefined,false); 
			

			svc.describeTrails(params,cb);
		}

		
		service.GetEventSelectors=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TrailName",params,undefined,false); 
			
			copyArg(msg,"TrailName",params,undefined,false); 
			

			svc.getEventSelectors(params,cb);
		}

		
		service.GetInsightSelectors=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TrailName",params,undefined,false); 
			
			copyArg(msg,"TrailName",params,undefined,false); 
			

			svc.getInsightSelectors(params,cb);
		}

		
		service.GetTrail=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.getTrail(params,cb);
		}

		
		service.GetTrailStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.getTrailStatus(params,cb);
		}

		
		service.ListPublicKeys=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listPublicKeys(params,cb);
		}

		
		service.ListTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceIdList",params,undefined,false); 
			
			copyArg(msg,"ResourceIdList",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listTags(params,cb);
		}

		
		service.ListTrails=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listTrails(params,cb);
		}

		
		service.LookupEvents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"LookupAttributes",params,undefined,false); 
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"EventCategory",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.lookupEvents(params,cb);
		}

		
		service.PutEventSelectors=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TrailName",params,undefined,false); 
			
			copyArg(msg,"TrailName",params,undefined,false); 
			copyArg(msg,"EventSelectors",params,undefined,true); 
			copyArg(msg,"AdvancedEventSelectors",params,undefined,true); 
			

			svc.putEventSelectors(params,cb);
		}

		
		service.PutInsightSelectors=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TrailName",params,undefined,false); 
			copyArg(n,"InsightSelectors",params,undefined,true); 
			
			copyArg(msg,"TrailName",params,undefined,false); 
			copyArg(msg,"InsightSelectors",params,undefined,true); 
			

			svc.putInsightSelectors(params,cb);
		}

		
		service.RemoveTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"TagsList",params,undefined,true); 
			

			svc.removeTags(params,cb);
		}

		
		service.StartLogging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.startLogging(params,cb);
		}

		
		service.StopLogging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.stopLogging(params,cb);
		}

		
		service.UpdateTrail=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"S3BucketName",params,undefined,false); 
			copyArg(msg,"S3KeyPrefix",params,undefined,false); 
			copyArg(msg,"SnsTopicName",params,undefined,false); 
			copyArg(msg,"IncludeGlobalServiceEvents",params,undefined,false); 
			copyArg(msg,"IsMultiRegionTrail",params,undefined,false); 
			copyArg(msg,"EnableLogFileValidation",params,undefined,false); 
			copyArg(msg,"CloudWatchLogsLogGroupArn",params,undefined,false); 
			copyArg(msg,"CloudWatchLogsRoleArn",params,undefined,false); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"IsOrganizationTrail",params,undefined,false); 
			

			svc.updateTrail(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS CloudTrail", AmazonAPINode);

};
