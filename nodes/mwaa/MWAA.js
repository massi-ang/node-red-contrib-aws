
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

		var awsService = new AWS.MWAA( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.MWAA(msg.AWSConfig) : awsService;

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
		
		service.CreateCliToken=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.createCliToken(params,cb);
		}
		
		service.CreateEnvironment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DagS3Path",params,undefined,false); 
			copyArgs(n,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"NetworkConfiguration",params,undefined,true); 
			copyArgs(n,"SourceBucketArn",params,undefined,false); 
			
			copyArgs(n,"AirflowConfigurationOptions",params,undefined,false); 
			copyArgs(n,"AirflowVersion",params,undefined,false); 
			copyArgs(n,"DagS3Path",params,undefined,false); 
			copyArgs(n,"EnvironmentClass",params,undefined,false); 
			copyArgs(n,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(n,"KmsKey",params,undefined,false); 
			copyArgs(n,"LoggingConfiguration",params,undefined,true); 
			copyArgs(Number(n),"MaxWorkers",params,undefined,false); 
			copyArgs(Number(n),"MinWorkers",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"NetworkConfiguration",params,undefined,true); 
			copyArgs(n,"PluginsS3ObjectVersion",params,undefined,false); 
			copyArgs(n,"PluginsS3Path",params,undefined,false); 
			copyArgs(n,"RequirementsS3ObjectVersion",params,undefined,false); 
			copyArgs(n,"RequirementsS3Path",params,undefined,false); 
			copyArgs(Number(n),"Schedulers",params,undefined,false); 
			copyArgs(n,"SourceBucketArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"WebserverAccessMode",params,undefined,false); 
			copyArgs(n,"WeeklyMaintenanceWindowStart",params,undefined,false); 
			
			copyArgs(msg,"AirflowConfigurationOptions",params,undefined,false); 
			copyArgs(msg,"AirflowVersion",params,undefined,false); 
			copyArgs(msg,"DagS3Path",params,undefined,false); 
			copyArgs(msg,"EnvironmentClass",params,undefined,false); 
			copyArgs(msg,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(msg,"KmsKey",params,undefined,false); 
			copyArgs(msg,"LoggingConfiguration",params,undefined,true); 
			copyArgs(msg,"MaxWorkers",params,undefined,false); 
			copyArgs(msg,"MinWorkers",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"NetworkConfiguration",params,undefined,true); 
			copyArgs(msg,"PluginsS3ObjectVersion",params,undefined,false); 
			copyArgs(msg,"PluginsS3Path",params,undefined,false); 
			copyArgs(msg,"RequirementsS3ObjectVersion",params,undefined,false); 
			copyArgs(msg,"RequirementsS3Path",params,undefined,false); 
			copyArgs(msg,"Schedulers",params,undefined,false); 
			copyArgs(msg,"SourceBucketArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"WebserverAccessMode",params,undefined,false); 
			copyArgs(msg,"WeeklyMaintenanceWindowStart",params,undefined,false); 
			

			svc.createEnvironment(params,cb);
		}
		
		service.CreateWebLoginToken=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.createWebLoginToken(params,cb);
		}
		
		service.DeleteEnvironment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteEnvironment(params,cb);
		}
		
		service.GetEnvironment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getEnvironment(params,cb);
		}
		
		service.ListEnvironments=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listEnvironments(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.PublishMetrics=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EnvironmentName",params,undefined,false); 
			copyArgs(n,"MetricData",params,undefined,false); 
			
			copyArgs(n,"EnvironmentName",params,undefined,false); 
			copyArgs(n,"MetricData",params,undefined,false); 
			
			copyArgs(msg,"EnvironmentName",params,undefined,false); 
			copyArgs(msg,"MetricData",params,undefined,false); 
			

			svc.publishMetrics(params,cb);
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
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
		
		service.UpdateEnvironment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"AirflowConfigurationOptions",params,undefined,false); 
			copyArgs(n,"AirflowVersion",params,undefined,false); 
			copyArgs(n,"DagS3Path",params,undefined,false); 
			copyArgs(n,"EnvironmentClass",params,undefined,false); 
			copyArgs(n,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(n,"LoggingConfiguration",params,undefined,true); 
			copyArgs(Number(n),"MaxWorkers",params,undefined,false); 
			copyArgs(Number(n),"MinWorkers",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"NetworkConfiguration",params,undefined,false); 
			copyArgs(n,"PluginsS3ObjectVersion",params,undefined,false); 
			copyArgs(n,"PluginsS3Path",params,undefined,false); 
			copyArgs(n,"RequirementsS3ObjectVersion",params,undefined,false); 
			copyArgs(n,"RequirementsS3Path",params,undefined,false); 
			copyArgs(Number(n),"Schedulers",params,undefined,false); 
			copyArgs(n,"SourceBucketArn",params,undefined,false); 
			copyArgs(n,"WebserverAccessMode",params,undefined,false); 
			copyArgs(n,"WeeklyMaintenanceWindowStart",params,undefined,false); 
			
			copyArgs(msg,"AirflowConfigurationOptions",params,undefined,false); 
			copyArgs(msg,"AirflowVersion",params,undefined,false); 
			copyArgs(msg,"DagS3Path",params,undefined,false); 
			copyArgs(msg,"EnvironmentClass",params,undefined,false); 
			copyArgs(msg,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(msg,"LoggingConfiguration",params,undefined,true); 
			copyArgs(msg,"MaxWorkers",params,undefined,false); 
			copyArgs(msg,"MinWorkers",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"NetworkConfiguration",params,undefined,false); 
			copyArgs(msg,"PluginsS3ObjectVersion",params,undefined,false); 
			copyArgs(msg,"PluginsS3Path",params,undefined,false); 
			copyArgs(msg,"RequirementsS3ObjectVersion",params,undefined,false); 
			copyArgs(msg,"RequirementsS3Path",params,undefined,false); 
			copyArgs(msg,"Schedulers",params,undefined,false); 
			copyArgs(msg,"SourceBucketArn",params,undefined,false); 
			copyArgs(msg,"WebserverAccessMode",params,undefined,false); 
			copyArgs(msg,"WeeklyMaintenanceWindowStart",params,undefined,false); 
			

			svc.updateEnvironment(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS MWAA", AmazonAPINode);

};
