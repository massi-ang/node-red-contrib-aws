
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

		var awsService = new AWS.KinesisAnalytics( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.KinesisAnalytics(msg.AWSConfig) : awsService;

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

		
		service.AddApplicationCloudWatchLoggingOption=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(n,"CloudWatchLoggingOption",params,undefined,true); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(n,"CloudWatchLoggingOption",params,undefined,true); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(msg,"CloudWatchLoggingOption",params,undefined,true); 
			

			svc.addApplicationCloudWatchLoggingOption(params,cb);
		}

		
		service.AddApplicationInput=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(n,"Input",params,undefined,true); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(n,"Input",params,undefined,true); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(msg,"Input",params,undefined,true); 
			

			svc.addApplicationInput(params,cb);
		}

		
		service.AddApplicationInputProcessingConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(n,"InputId",params,undefined,false); 
			copyArgs(n,"InputProcessingConfiguration",params,undefined,true); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(n,"InputId",params,undefined,false); 
			copyArgs(n,"InputProcessingConfiguration",params,undefined,true); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(msg,"InputId",params,undefined,false); 
			copyArgs(msg,"InputProcessingConfiguration",params,undefined,true); 
			

			svc.addApplicationInputProcessingConfiguration(params,cb);
		}

		
		service.AddApplicationOutput=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(n,"Output",params,undefined,true); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(n,"Output",params,undefined,true); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(msg,"Output",params,undefined,true); 
			

			svc.addApplicationOutput(params,cb);
		}

		
		service.AddApplicationReferenceDataSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(n,"ReferenceDataSource",params,undefined,false); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(n,"ReferenceDataSource",params,undefined,false); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(msg,"ReferenceDataSource",params,undefined,false); 
			

			svc.addApplicationReferenceDataSource(params,cb);
		}

		
		service.CreateApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"ApplicationDescription",params,undefined,false); 
			copyArgs(n,"Inputs",params,undefined,false); 
			copyArgs(n,"Outputs",params,undefined,false); 
			copyArgs(n,"CloudWatchLoggingOptions",params,undefined,false); 
			copyArgs(n,"ApplicationCode",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"ApplicationDescription",params,undefined,false); 
			copyArgs(msg,"Inputs",params,undefined,false); 
			copyArgs(msg,"Outputs",params,undefined,false); 
			copyArgs(msg,"CloudWatchLoggingOptions",params,undefined,false); 
			copyArgs(msg,"ApplicationCode",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createApplication(params,cb);
		}

		
		service.DeleteApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"CreateTimestamp",params,undefined,false); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"CreateTimestamp",params,undefined,false); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"CreateTimestamp",params,undefined,false); 
			

			svc.deleteApplication(params,cb);
		}

		
		service.DeleteApplicationCloudWatchLoggingOption=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(n,"CloudWatchLoggingOptionId",params,undefined,false); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(n,"CloudWatchLoggingOptionId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(msg,"CloudWatchLoggingOptionId",params,undefined,false); 
			

			svc.deleteApplicationCloudWatchLoggingOption(params,cb);
		}

		
		service.DeleteApplicationInputProcessingConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(n,"InputId",params,undefined,false); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(n,"InputId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(msg,"InputId",params,undefined,false); 
			

			svc.deleteApplicationInputProcessingConfiguration(params,cb);
		}

		
		service.DeleteApplicationOutput=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(n,"OutputId",params,undefined,false); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(n,"OutputId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(msg,"OutputId",params,undefined,false); 
			

			svc.deleteApplicationOutput(params,cb);
		}

		
		service.DeleteApplicationReferenceDataSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(n,"ReferenceId",params,undefined,false); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(n,"ReferenceId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(msg,"ReferenceId",params,undefined,false); 
			

			svc.deleteApplicationReferenceDataSource(params,cb);
		}

		
		service.DescribeApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			

			svc.describeApplication(params,cb);
		}

		
		service.DiscoverInputSchema=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"RoleARN",params,undefined,false); 
			copyArgs(n,"InputStartingPositionConfiguration",params,undefined,true); 
			copyArgs(n,"S3Configuration",params,undefined,false); 
			copyArgs(n,"InputProcessingConfiguration",params,undefined,true); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			copyArgs(msg,"RoleARN",params,undefined,false); 
			copyArgs(msg,"InputStartingPositionConfiguration",params,undefined,true); 
			copyArgs(msg,"S3Configuration",params,undefined,false); 
			copyArgs(msg,"InputProcessingConfiguration",params,undefined,true); 
			

			svc.discoverInputSchema(params,cb);
		}

		
		service.ListApplications=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Limit",params,undefined,false); 
			copyArgs(n,"ExclusiveStartApplicationName",params,undefined,false); 
			
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"ExclusiveStartApplicationName",params,undefined,false); 
			

			svc.listApplications(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.StartApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"InputConfigurations",params,undefined,false); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"InputConfigurations",params,undefined,false); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"InputConfigurations",params,undefined,false); 
			

			svc.startApplication(params,cb);
		}

		
		service.StopApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			

			svc.stopApplication(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(n,"ApplicationUpdate",params,undefined,false); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(n,"ApplicationUpdate",params,undefined,false); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"CurrentApplicationVersionId",params,undefined,false); 
			copyArgs(msg,"ApplicationUpdate",params,undefined,false); 
			

			svc.updateApplication(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS KinesisAnalytics", AmazonAPINode);

};
