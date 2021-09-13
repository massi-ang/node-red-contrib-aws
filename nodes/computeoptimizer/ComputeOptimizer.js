
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

		var awsService = new AWS.ComputeOptimizer( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.ComputeOptimizer(msg.AWSConfig) : awsService;

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
		
			service.DescribeRecommendationExportJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"jobIds",params,undefined,false); 
			copyArgs(n,"filters",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"jobIds",params,undefined,false); 
			copyArgs(msg,"filters",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.describeRecommendationExportJobs(params,cb);
		}
			service.ExportAutoScalingGroupRecommendations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"s3DestinationConfig",params,undefined,true); 
			
			copyArgs(n,"accountIds",params,undefined,true); 
			copyArgs(n,"filters",params,undefined,true); 
			copyArgs(n,"fieldsToExport",params,undefined,false); 
			copyArgs(n,"s3DestinationConfig",params,undefined,true); 
			copyArgs(n,"fileFormat",params,undefined,false); 
			copyArgs(Boolean(n),"includeMemberAccounts",params,undefined,false); 
			copyArgs(n,"recommendationPreferences",params,undefined,true); 
			
			copyArgs(msg,"accountIds",params,undefined,true); 
			copyArgs(msg,"filters",params,undefined,true); 
			copyArgs(msg,"fieldsToExport",params,undefined,false); 
			copyArgs(msg,"s3DestinationConfig",params,undefined,true); 
			copyArgs(msg,"fileFormat",params,undefined,false); 
			copyArgs(msg,"includeMemberAccounts",params,undefined,false); 
			copyArgs(msg,"recommendationPreferences",params,undefined,true); 
			

			svc.exportAutoScalingGroupRecommendations(params,cb);
		}
			service.ExportEBSVolumeRecommendations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"s3DestinationConfig",params,undefined,true); 
			
			copyArgs(n,"accountIds",params,undefined,true); 
			copyArgs(n,"filters",params,undefined,true); 
			copyArgs(n,"fieldsToExport",params,undefined,false); 
			copyArgs(n,"s3DestinationConfig",params,undefined,true); 
			copyArgs(n,"fileFormat",params,undefined,false); 
			copyArgs(Boolean(n),"includeMemberAccounts",params,undefined,false); 
			
			copyArgs(msg,"accountIds",params,undefined,true); 
			copyArgs(msg,"filters",params,undefined,true); 
			copyArgs(msg,"fieldsToExport",params,undefined,false); 
			copyArgs(msg,"s3DestinationConfig",params,undefined,true); 
			copyArgs(msg,"fileFormat",params,undefined,false); 
			copyArgs(msg,"includeMemberAccounts",params,undefined,false); 
			

			svc.exportEBSVolumeRecommendations(params,cb);
		}
			service.ExportEC2InstanceRecommendations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"s3DestinationConfig",params,undefined,true); 
			
			copyArgs(n,"accountIds",params,undefined,true); 
			copyArgs(n,"filters",params,undefined,true); 
			copyArgs(n,"fieldsToExport",params,undefined,false); 
			copyArgs(n,"s3DestinationConfig",params,undefined,true); 
			copyArgs(n,"fileFormat",params,undefined,false); 
			copyArgs(Boolean(n),"includeMemberAccounts",params,undefined,false); 
			copyArgs(n,"recommendationPreferences",params,undefined,true); 
			
			copyArgs(msg,"accountIds",params,undefined,true); 
			copyArgs(msg,"filters",params,undefined,true); 
			copyArgs(msg,"fieldsToExport",params,undefined,false); 
			copyArgs(msg,"s3DestinationConfig",params,undefined,true); 
			copyArgs(msg,"fileFormat",params,undefined,false); 
			copyArgs(msg,"includeMemberAccounts",params,undefined,false); 
			copyArgs(msg,"recommendationPreferences",params,undefined,true); 
			

			svc.exportEC2InstanceRecommendations(params,cb);
		}
			service.ExportLambdaFunctionRecommendations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"s3DestinationConfig",params,undefined,true); 
			
			copyArgs(n,"accountIds",params,undefined,true); 
			copyArgs(n,"filters",params,undefined,true); 
			copyArgs(n,"fieldsToExport",params,undefined,false); 
			copyArgs(n,"s3DestinationConfig",params,undefined,true); 
			copyArgs(n,"fileFormat",params,undefined,false); 
			copyArgs(Boolean(n),"includeMemberAccounts",params,undefined,false); 
			
			copyArgs(msg,"accountIds",params,undefined,true); 
			copyArgs(msg,"filters",params,undefined,true); 
			copyArgs(msg,"fieldsToExport",params,undefined,false); 
			copyArgs(msg,"s3DestinationConfig",params,undefined,true); 
			copyArgs(msg,"fileFormat",params,undefined,false); 
			copyArgs(msg,"includeMemberAccounts",params,undefined,false); 
			

			svc.exportLambdaFunctionRecommendations(params,cb);
		}
			service.GetAutoScalingGroupRecommendations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"accountIds",params,undefined,true); 
			copyArgs(n,"autoScalingGroupArns",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"filters",params,undefined,true); 
			copyArgs(n,"recommendationPreferences",params,undefined,true); 
			
			copyArgs(msg,"accountIds",params,undefined,true); 
			copyArgs(msg,"autoScalingGroupArns",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"filters",params,undefined,true); 
			copyArgs(msg,"recommendationPreferences",params,undefined,true); 
			

			svc.getAutoScalingGroupRecommendations(params,cb);
		}
			service.GetEBSVolumeRecommendations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"volumeArns",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"filters",params,undefined,true); 
			copyArgs(n,"accountIds",params,undefined,true); 
			
			copyArgs(msg,"volumeArns",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"filters",params,undefined,true); 
			copyArgs(msg,"accountIds",params,undefined,true); 
			

			svc.getEBSVolumeRecommendations(params,cb);
		}
			service.GetEC2InstanceRecommendations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"instanceArns",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"filters",params,undefined,true); 
			copyArgs(n,"accountIds",params,undefined,true); 
			copyArgs(n,"recommendationPreferences",params,undefined,true); 
			
			copyArgs(msg,"instanceArns",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"filters",params,undefined,true); 
			copyArgs(msg,"accountIds",params,undefined,true); 
			copyArgs(msg,"recommendationPreferences",params,undefined,true); 
			

			svc.getEC2InstanceRecommendations(params,cb);
		}
			service.GetEC2RecommendationProjectedMetrics=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"instanceArn",params,undefined,false); 
			copyArgs(n,"stat",params,undefined,false); 
			copyArgs(Number(n),"period",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			
			copyArgs(n,"instanceArn",params,undefined,false); 
			copyArgs(n,"stat",params,undefined,false); 
			copyArgs(Number(n),"period",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(n,"recommendationPreferences",params,undefined,true); 
			
			copyArgs(msg,"instanceArn",params,undefined,false); 
			copyArgs(msg,"stat",params,undefined,false); 
			copyArgs(msg,"period",params,undefined,false); 
			copyArgs(msg,"startTime",params,undefined,false); 
			copyArgs(msg,"endTime",params,undefined,false); 
			copyArgs(msg,"recommendationPreferences",params,undefined,true); 
			

			svc.getEC2RecommendationProjectedMetrics(params,cb);
		}
			service.GetEnrollmentStatus=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getEnrollmentStatus(params,cb);
		}
			service.GetEnrollmentStatusesForOrganization=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"filters",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"filters",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getEnrollmentStatusesForOrganization(params,cb);
		}
			service.GetLambdaFunctionRecommendations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"functionArns",params,undefined,false); 
			copyArgs(n,"accountIds",params,undefined,true); 
			copyArgs(n,"filters",params,undefined,true); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"functionArns",params,undefined,false); 
			copyArgs(msg,"accountIds",params,undefined,true); 
			copyArgs(msg,"filters",params,undefined,true); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getLambdaFunctionRecommendations(params,cb);
		}
			service.GetRecommendationSummaries=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"accountIds",params,undefined,true); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"accountIds",params,undefined,true); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getRecommendationSummaries(params,cb);
		}
			service.UpdateEnrollmentStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"status",params,undefined,false); 
			
			copyArgs(n,"status",params,undefined,false); 
			copyArgs(Boolean(n),"includeMemberAccounts",params,undefined,false); 
			
			copyArgs(msg,"status",params,undefined,false); 
			copyArgs(msg,"includeMemberAccounts",params,undefined,false); 
			

			svc.updateEnrollmentStatus(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS ComputeOptimizer", AmazonAPINode);

};
