
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

		var awsService = new AWS.MWAA( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.MWAA(msg.AWSConfig) : awsService;

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

		
		service.CreateCliToken=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.createCliToken(params,cb);
		}

		
		service.CreateEnvironment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DagS3Path",params,undefined,false); 
			copyArg(n,"ExecutionRoleArn",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"NetworkConfiguration",params,undefined,true); 
			copyArg(n,"SourceBucketArn",params,undefined,false); 
			
			copyArg(msg,"AirflowConfigurationOptions",params,undefined,false); 
			copyArg(msg,"AirflowVersion",params,undefined,false); 
			copyArg(msg,"DagS3Path",params,undefined,false); 
			copyArg(msg,"EnvironmentClass",params,undefined,false); 
			copyArg(msg,"ExecutionRoleArn",params,undefined,false); 
			copyArg(msg,"KmsKey",params,undefined,false); 
			copyArg(msg,"LoggingConfiguration",params,undefined,true); 
			copyArg(msg,"MaxWorkers",params,undefined,false); 
			copyArg(msg,"MinWorkers",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"NetworkConfiguration",params,undefined,true); 
			copyArg(msg,"PluginsS3ObjectVersion",params,undefined,false); 
			copyArg(msg,"PluginsS3Path",params,undefined,false); 
			copyArg(msg,"RequirementsS3ObjectVersion",params,undefined,false); 
			copyArg(msg,"RequirementsS3Path",params,undefined,false); 
			copyArg(msg,"Schedulers",params,undefined,false); 
			copyArg(msg,"SourceBucketArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"WebserverAccessMode",params,undefined,false); 
			copyArg(msg,"WeeklyMaintenanceWindowStart",params,undefined,false); 
			

			svc.createEnvironment(params,cb);
		}

		
		service.CreateWebLoginToken=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.createWebLoginToken(params,cb);
		}

		
		service.DeleteEnvironment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteEnvironment(params,cb);
		}

		
		service.GetEnvironment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.getEnvironment(params,cb);
		}

		
		service.ListEnvironments=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listEnvironments(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PublishMetrics=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EnvironmentName",params,undefined,false); 
			copyArg(n,"MetricData",params,undefined,false); 
			
			copyArg(msg,"EnvironmentName",params,undefined,false); 
			copyArg(msg,"MetricData",params,undefined,false); 
			

			svc.publishMetrics(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"tagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateEnvironment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"AirflowConfigurationOptions",params,undefined,false); 
			copyArg(msg,"AirflowVersion",params,undefined,false); 
			copyArg(msg,"DagS3Path",params,undefined,false); 
			copyArg(msg,"EnvironmentClass",params,undefined,false); 
			copyArg(msg,"ExecutionRoleArn",params,undefined,false); 
			copyArg(msg,"LoggingConfiguration",params,undefined,true); 
			copyArg(msg,"MaxWorkers",params,undefined,false); 
			copyArg(msg,"MinWorkers",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"NetworkConfiguration",params,undefined,false); 
			copyArg(msg,"PluginsS3ObjectVersion",params,undefined,false); 
			copyArg(msg,"PluginsS3Path",params,undefined,false); 
			copyArg(msg,"RequirementsS3ObjectVersion",params,undefined,false); 
			copyArg(msg,"RequirementsS3Path",params,undefined,false); 
			copyArg(msg,"Schedulers",params,undefined,false); 
			copyArg(msg,"SourceBucketArn",params,undefined,false); 
			copyArg(msg,"WebserverAccessMode",params,undefined,false); 
			copyArg(msg,"WeeklyMaintenanceWindowStart",params,undefined,false); 
			

			svc.updateEnvironment(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS MWAA", AmazonAPINode);

};
