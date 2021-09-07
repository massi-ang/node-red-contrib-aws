
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

		var awsService = new AWS.Lambda( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Lambda(msg.AWSConfig) : awsService;

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

		
		service.AddLayerVersionPermission=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LayerName",params,undefined,false); 
			copyArgs(n,"VersionNumber",params,undefined,false); 
			copyArgs(n,"StatementId",params,undefined,false); 
			copyArgs(n,"Action",params,undefined,false); 
			copyArgs(n,"Principal",params,undefined,false); 
			
			copyArgs(n,"LayerName",params,undefined,false); 
			copyArgs(n,"VersionNumber",params,undefined,false); 
			copyArgs(n,"StatementId",params,undefined,false); 
			copyArgs(n,"Action",params,undefined,false); 
			copyArgs(n,"Principal",params,undefined,false); 
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"RevisionId",params,undefined,false); 
			
			copyArgs(msg,"LayerName",params,undefined,false); 
			copyArgs(msg,"VersionNumber",params,undefined,false); 
			copyArgs(msg,"StatementId",params,undefined,false); 
			copyArgs(msg,"Action",params,undefined,false); 
			copyArgs(msg,"Principal",params,undefined,false); 
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"RevisionId",params,undefined,false); 
			

			svc.addLayerVersionPermission(params,cb);
		}

		
		service.AddPermission=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"StatementId",params,undefined,false); 
			copyArgs(n,"Action",params,undefined,false); 
			copyArgs(n,"Principal",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"StatementId",params,undefined,false); 
			copyArgs(n,"Action",params,undefined,false); 
			copyArgs(n,"Principal",params,undefined,false); 
			copyArgs(n,"SourceArn",params,undefined,false); 
			copyArgs(n,"SourceAccount",params,undefined,false); 
			copyArgs(n,"EventSourceToken",params,undefined,false); 
			copyArgs(n,"Qualifier",params,undefined,false); 
			copyArgs(n,"RevisionId",params,undefined,false); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"StatementId",params,undefined,false); 
			copyArgs(msg,"Action",params,undefined,false); 
			copyArgs(msg,"Principal",params,undefined,false); 
			copyArgs(msg,"SourceArn",params,undefined,false); 
			copyArgs(msg,"SourceAccount",params,undefined,false); 
			copyArgs(msg,"EventSourceToken",params,undefined,false); 
			copyArgs(msg,"Qualifier",params,undefined,false); 
			copyArgs(msg,"RevisionId",params,undefined,false); 
			

			svc.addPermission(params,cb);
		}

		
		service.CreateAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"FunctionVersion",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"FunctionVersion",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"RoutingConfig",params,undefined,true); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"FunctionVersion",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"RoutingConfig",params,undefined,true); 
			

			svc.createAlias(params,cb);
		}

		
		service.CreateCodeSigningConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AllowedPublishers",params,undefined,true); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"AllowedPublishers",params,undefined,true); 
			copyArgs(n,"CodeSigningPolicies",params,undefined,true); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"AllowedPublishers",params,undefined,true); 
			copyArgs(msg,"CodeSigningPolicies",params,undefined,true); 
			

			svc.createCodeSigningConfig(params,cb);
		}

		
		service.CreateEventSourceMapping=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(n,"EventSourceArn",params,undefined,false); 
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Enabled",params,undefined,false); 
			copyArgs(n,"BatchSize",params,undefined,false); 
			copyArgs(n,"MaximumBatchingWindowInSeconds",params,undefined,false); 
			copyArgs(n,"ParallelizationFactor",params,undefined,false); 
			copyArgs(n,"StartingPosition",params,undefined,false); 
			copyArgs(n,"StartingPositionTimestamp",params,undefined,false); 
			copyArgs(n,"DestinationConfig",params,undefined,true); 
			copyArgs(n,"MaximumRecordAgeInSeconds",params,undefined,false); 
			copyArgs(n,"BisectBatchOnFunctionError",params,undefined,false); 
			copyArgs(n,"MaximumRetryAttempts",params,undefined,false); 
			copyArgs(n,"TumblingWindowInSeconds",params,undefined,false); 
			copyArgs(n,"Topics",params,undefined,true); 
			copyArgs(n,"Queues",params,undefined,true); 
			copyArgs(n,"SourceAccessConfigurations",params,undefined,true); 
			copyArgs(n,"SelfManagedEventSource",params,undefined,true); 
			copyArgs(n,"FunctionResponseTypes",params,undefined,true); 
			
			copyArgs(msg,"EventSourceArn",params,undefined,false); 
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"Enabled",params,undefined,false); 
			copyArgs(msg,"BatchSize",params,undefined,false); 
			copyArgs(msg,"MaximumBatchingWindowInSeconds",params,undefined,false); 
			copyArgs(msg,"ParallelizationFactor",params,undefined,false); 
			copyArgs(msg,"StartingPosition",params,undefined,false); 
			copyArgs(msg,"StartingPositionTimestamp",params,undefined,false); 
			copyArgs(msg,"DestinationConfig",params,undefined,true); 
			copyArgs(msg,"MaximumRecordAgeInSeconds",params,undefined,false); 
			copyArgs(msg,"BisectBatchOnFunctionError",params,undefined,false); 
			copyArgs(msg,"MaximumRetryAttempts",params,undefined,false); 
			copyArgs(msg,"TumblingWindowInSeconds",params,undefined,false); 
			copyArgs(msg,"Topics",params,undefined,true); 
			copyArgs(msg,"Queues",params,undefined,true); 
			copyArgs(msg,"SourceAccessConfigurations",params,undefined,true); 
			copyArgs(msg,"SelfManagedEventSource",params,undefined,true); 
			copyArgs(msg,"FunctionResponseTypes",params,undefined,true); 
			

			svc.createEventSourceMapping(params,cb);
		}

		
		service.CreateFunction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Role",params,undefined,false); 
			copyArgs(n,"Code",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Runtime",params,undefined,false); 
			copyArgs(n,"Role",params,undefined,false); 
			copyArgs(n,"Handler",params,undefined,false); 
			copyArgs(n,"Code",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Timeout",params,undefined,false); 
			copyArgs(n,"MemorySize",params,undefined,false); 
			copyArgs(n,"Publish",params,undefined,false); 
			copyArgs(n,"VpcConfig",params,undefined,true); 
			copyArgs(n,"PackageType",params,undefined,false); 
			copyArgs(n,"DeadLetterConfig",params,undefined,true); 
			copyArgs(n,"Environment",params,undefined,true); 
			copyArgs(n,"KMSKeyArn",params,undefined,false); 
			copyArgs(n,"TracingConfig",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"Layers",params,undefined,true); 
			copyArgs(n,"FileSystemConfigs",params,undefined,true); 
			copyArgs(n,"ImageConfig",params,undefined,true); 
			copyArgs(n,"CodeSigningConfigArn",params,undefined,false); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"Runtime",params,undefined,false); 
			copyArgs(msg,"Role",params,undefined,false); 
			copyArgs(msg,"Handler",params,undefined,false); 
			copyArgs(msg,"Code",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Timeout",params,undefined,false); 
			copyArgs(msg,"MemorySize",params,undefined,false); 
			copyArgs(msg,"Publish",params,undefined,false); 
			copyArgs(msg,"VpcConfig",params,undefined,true); 
			copyArgs(msg,"PackageType",params,undefined,false); 
			copyArgs(msg,"DeadLetterConfig",params,undefined,true); 
			copyArgs(msg,"Environment",params,undefined,true); 
			copyArgs(msg,"KMSKeyArn",params,undefined,false); 
			copyArgs(msg,"TracingConfig",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"Layers",params,undefined,true); 
			copyArgs(msg,"FileSystemConfigs",params,undefined,true); 
			copyArgs(msg,"ImageConfig",params,undefined,true); 
			copyArgs(msg,"CodeSigningConfigArn",params,undefined,false); 
			

			svc.createFunction(params,cb);
		}

		
		service.DeleteAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteAlias(params,cb);
		}

		
		service.DeleteCodeSigningConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CodeSigningConfigArn",params,undefined,false); 
			
			copyArgs(n,"CodeSigningConfigArn",params,undefined,false); 
			
			copyArgs(msg,"CodeSigningConfigArn",params,undefined,false); 
			

			svc.deleteCodeSigningConfig(params,cb);
		}

		
		service.DeleteEventSourceMapping=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UUID",params,undefined,false); 
			
			copyArgs(n,"UUID",params,undefined,false); 
			
			copyArgs(msg,"UUID",params,undefined,false); 
			

			svc.deleteEventSourceMapping(params,cb);
		}

		
		service.DeleteFunction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Qualifier",params,undefined,false); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"Qualifier",params,undefined,false); 
			

			svc.deleteFunction(params,cb);
		}

		
		service.DeleteFunctionCodeSigningConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			

			svc.deleteFunctionCodeSigningConfig(params,cb);
		}

		
		service.DeleteFunctionConcurrency=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			

			svc.deleteFunctionConcurrency(params,cb);
		}

		
		service.DeleteFunctionEventInvokeConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Qualifier",params,undefined,false); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"Qualifier",params,undefined,false); 
			

			svc.deleteFunctionEventInvokeConfig(params,cb);
		}

		
		service.DeleteLayerVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LayerName",params,undefined,false); 
			copyArgs(n,"VersionNumber",params,undefined,false); 
			
			copyArgs(n,"LayerName",params,undefined,false); 
			copyArgs(n,"VersionNumber",params,undefined,false); 
			
			copyArgs(msg,"LayerName",params,undefined,false); 
			copyArgs(msg,"VersionNumber",params,undefined,false); 
			

			svc.deleteLayerVersion(params,cb);
		}

		
		service.DeleteProvisionedConcurrencyConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Qualifier",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Qualifier",params,undefined,false); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"Qualifier",params,undefined,false); 
			

			svc.deleteProvisionedConcurrencyConfig(params,cb);
		}

		
		service.GetAccountSettings=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getAccountSettings(params,cb);
		}

		
		service.GetAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getAlias(params,cb);
		}

		
		service.GetCodeSigningConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CodeSigningConfigArn",params,undefined,false); 
			
			copyArgs(n,"CodeSigningConfigArn",params,undefined,false); 
			
			copyArgs(msg,"CodeSigningConfigArn",params,undefined,false); 
			

			svc.getCodeSigningConfig(params,cb);
		}

		
		service.GetEventSourceMapping=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UUID",params,undefined,false); 
			
			copyArgs(n,"UUID",params,undefined,false); 
			
			copyArgs(msg,"UUID",params,undefined,false); 
			

			svc.getEventSourceMapping(params,cb);
		}

		
		service.GetFunction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Qualifier",params,undefined,false); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"Qualifier",params,undefined,false); 
			

			svc.getFunction(params,cb);
		}

		
		service.GetFunctionCodeSigningConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			

			svc.getFunctionCodeSigningConfig(params,cb);
		}

		
		service.GetFunctionConcurrency=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			

			svc.getFunctionConcurrency(params,cb);
		}

		
		service.GetFunctionConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Qualifier",params,undefined,false); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"Qualifier",params,undefined,false); 
			

			svc.getFunctionConfiguration(params,cb);
		}

		
		service.GetFunctionEventInvokeConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Qualifier",params,undefined,false); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"Qualifier",params,undefined,false); 
			

			svc.getFunctionEventInvokeConfig(params,cb);
		}

		
		service.GetLayerVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LayerName",params,undefined,false); 
			copyArgs(n,"VersionNumber",params,undefined,false); 
			
			copyArgs(n,"LayerName",params,undefined,false); 
			copyArgs(n,"VersionNumber",params,undefined,false); 
			
			copyArgs(msg,"LayerName",params,undefined,false); 
			copyArgs(msg,"VersionNumber",params,undefined,false); 
			

			svc.getLayerVersion(params,cb);
		}

		
		service.GetLayerVersionByArn=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			

			svc.getLayerVersionByArn(params,cb);
		}

		
		service.GetLayerVersionPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LayerName",params,undefined,false); 
			copyArgs(n,"VersionNumber",params,undefined,false); 
			
			copyArgs(n,"LayerName",params,undefined,false); 
			copyArgs(n,"VersionNumber",params,undefined,false); 
			
			copyArgs(msg,"LayerName",params,undefined,false); 
			copyArgs(msg,"VersionNumber",params,undefined,false); 
			

			svc.getLayerVersionPolicy(params,cb);
		}

		
		service.GetPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Qualifier",params,undefined,false); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"Qualifier",params,undefined,false); 
			

			svc.getPolicy(params,cb);
		}

		
		service.GetProvisionedConcurrencyConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Qualifier",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Qualifier",params,undefined,false); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"Qualifier",params,undefined,false); 
			

			svc.getProvisionedConcurrencyConfig(params,cb);
		}

		
		service.Invoke=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"InvocationType",params,undefined,false); 
			copyArgs(n,"LogType",params,undefined,false); 
			copyArgs(n,"ClientContext",params,undefined,false); 
			copyArgs(n,"Payload",params,undefined,true); 
			copyArgs(n,"Qualifier",params,undefined,false); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"InvocationType",params,undefined,false); 
			copyArgs(msg,"LogType",params,undefined,false); 
			copyArgs(msg,"ClientContext",params,undefined,false); 
			copyArgs(msg,"Payload",params,undefined,true); 
			copyArgs(msg,"Qualifier",params,undefined,false); 
			

			svc.invoke(params,cb);
		}

		
		service.InvokeAsync=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"InvokeArgs",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"InvokeArgs",params,undefined,false); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"InvokeArgs",params,undefined,false); 
			

			svc.invokeAsync(params,cb);
		}

		
		service.ListAliases=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"FunctionVersion",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"FunctionVersion",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listAliases(params,cb);
		}

		
		service.ListCodeSigningConfigs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listCodeSigningConfigs(params,cb);
		}

		
		service.ListEventSourceMappings=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"EventSourceArn",params,undefined,false); 
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"EventSourceArn",params,undefined,false); 
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listEventSourceMappings(params,cb);
		}

		
		service.ListFunctionEventInvokeConfigs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listFunctionEventInvokeConfigs(params,cb);
		}

		
		service.ListFunctions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MasterRegion",params,undefined,false); 
			copyArgs(n,"FunctionVersion",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"MasterRegion",params,undefined,false); 
			copyArgs(msg,"FunctionVersion",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listFunctions(params,cb);
		}

		
		service.ListFunctionsByCodeSigningConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CodeSigningConfigArn",params,undefined,false); 
			
			copyArgs(n,"CodeSigningConfigArn",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"CodeSigningConfigArn",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listFunctionsByCodeSigningConfig(params,cb);
		}

		
		service.ListLayerVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LayerName",params,undefined,false); 
			
			copyArgs(n,"CompatibleRuntime",params,undefined,false); 
			copyArgs(n,"LayerName",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"CompatibleRuntime",params,undefined,false); 
			copyArgs(msg,"LayerName",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listLayerVersions(params,cb);
		}

		
		service.ListLayers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CompatibleRuntime",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"CompatibleRuntime",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listLayers(params,cb);
		}

		
		service.ListProvisionedConcurrencyConfigs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listProvisionedConcurrencyConfigs(params,cb);
		}

		
		service.ListTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Resource",params,undefined,false); 
			
			copyArgs(n,"Resource",params,undefined,false); 
			
			copyArgs(msg,"Resource",params,undefined,false); 
			

			svc.listTags(params,cb);
		}

		
		service.ListVersionsByFunction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listVersionsByFunction(params,cb);
		}

		
		service.PublishLayerVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LayerName",params,undefined,false); 
			copyArgs(n,"Content",params,undefined,false); 
			
			copyArgs(n,"LayerName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Content",params,undefined,false); 
			copyArgs(n,"CompatibleRuntimes",params,undefined,true); 
			copyArgs(n,"LicenseInfo",params,undefined,false); 
			
			copyArgs(msg,"LayerName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Content",params,undefined,false); 
			copyArgs(msg,"CompatibleRuntimes",params,undefined,true); 
			copyArgs(msg,"LicenseInfo",params,undefined,false); 
			

			svc.publishLayerVersion(params,cb);
		}

		
		service.PublishVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"CodeSha256",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"RevisionId",params,undefined,false); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"CodeSha256",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"RevisionId",params,undefined,false); 
			

			svc.publishVersion(params,cb);
		}

		
		service.PutFunctionCodeSigningConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CodeSigningConfigArn",params,undefined,false); 
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(n,"CodeSigningConfigArn",params,undefined,false); 
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(msg,"CodeSigningConfigArn",params,undefined,false); 
			copyArgs(msg,"FunctionName",params,undefined,false); 
			

			svc.putFunctionCodeSigningConfig(params,cb);
		}

		
		service.PutFunctionConcurrency=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"ReservedConcurrentExecutions",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"ReservedConcurrentExecutions",params,undefined,false); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"ReservedConcurrentExecutions",params,undefined,false); 
			

			svc.putFunctionConcurrency(params,cb);
		}

		
		service.PutFunctionEventInvokeConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Qualifier",params,undefined,false); 
			copyArgs(n,"MaximumRetryAttempts",params,undefined,false); 
			copyArgs(n,"MaximumEventAgeInSeconds",params,undefined,false); 
			copyArgs(n,"DestinationConfig",params,undefined,true); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"Qualifier",params,undefined,false); 
			copyArgs(msg,"MaximumRetryAttempts",params,undefined,false); 
			copyArgs(msg,"MaximumEventAgeInSeconds",params,undefined,false); 
			copyArgs(msg,"DestinationConfig",params,undefined,true); 
			

			svc.putFunctionEventInvokeConfig(params,cb);
		}

		
		service.PutProvisionedConcurrencyConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Qualifier",params,undefined,false); 
			copyArgs(n,"ProvisionedConcurrentExecutions",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Qualifier",params,undefined,false); 
			copyArgs(n,"ProvisionedConcurrentExecutions",params,undefined,false); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"Qualifier",params,undefined,false); 
			copyArgs(msg,"ProvisionedConcurrentExecutions",params,undefined,false); 
			

			svc.putProvisionedConcurrencyConfig(params,cb);
		}

		
		service.RemoveLayerVersionPermission=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LayerName",params,undefined,false); 
			copyArgs(n,"VersionNumber",params,undefined,false); 
			copyArgs(n,"StatementId",params,undefined,false); 
			
			copyArgs(n,"LayerName",params,undefined,false); 
			copyArgs(n,"VersionNumber",params,undefined,false); 
			copyArgs(n,"StatementId",params,undefined,false); 
			copyArgs(n,"RevisionId",params,undefined,false); 
			
			copyArgs(msg,"LayerName",params,undefined,false); 
			copyArgs(msg,"VersionNumber",params,undefined,false); 
			copyArgs(msg,"StatementId",params,undefined,false); 
			copyArgs(msg,"RevisionId",params,undefined,false); 
			

			svc.removeLayerVersionPermission(params,cb);
		}

		
		service.RemovePermission=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"StatementId",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"StatementId",params,undefined,false); 
			copyArgs(n,"Qualifier",params,undefined,false); 
			copyArgs(n,"RevisionId",params,undefined,false); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"StatementId",params,undefined,false); 
			copyArgs(msg,"Qualifier",params,undefined,false); 
			copyArgs(msg,"RevisionId",params,undefined,false); 
			

			svc.removePermission(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Resource",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"Resource",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Resource",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Resource",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"Resource",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"Resource",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"FunctionVersion",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"RoutingConfig",params,undefined,true); 
			copyArgs(n,"RevisionId",params,undefined,false); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"FunctionVersion",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"RoutingConfig",params,undefined,true); 
			copyArgs(msg,"RevisionId",params,undefined,false); 
			

			svc.updateAlias(params,cb);
		}

		
		service.UpdateCodeSigningConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CodeSigningConfigArn",params,undefined,false); 
			
			copyArgs(n,"CodeSigningConfigArn",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"AllowedPublishers",params,undefined,true); 
			copyArgs(n,"CodeSigningPolicies",params,undefined,true); 
			
			copyArgs(msg,"CodeSigningConfigArn",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"AllowedPublishers",params,undefined,true); 
			copyArgs(msg,"CodeSigningPolicies",params,undefined,true); 
			

			svc.updateCodeSigningConfig(params,cb);
		}

		
		service.UpdateEventSourceMapping=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UUID",params,undefined,false); 
			
			copyArgs(n,"UUID",params,undefined,false); 
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Enabled",params,undefined,false); 
			copyArgs(n,"BatchSize",params,undefined,false); 
			copyArgs(n,"MaximumBatchingWindowInSeconds",params,undefined,false); 
			copyArgs(n,"DestinationConfig",params,undefined,true); 
			copyArgs(n,"MaximumRecordAgeInSeconds",params,undefined,false); 
			copyArgs(n,"BisectBatchOnFunctionError",params,undefined,false); 
			copyArgs(n,"MaximumRetryAttempts",params,undefined,false); 
			copyArgs(n,"ParallelizationFactor",params,undefined,false); 
			copyArgs(n,"SourceAccessConfigurations",params,undefined,true); 
			copyArgs(n,"TumblingWindowInSeconds",params,undefined,false); 
			copyArgs(n,"FunctionResponseTypes",params,undefined,true); 
			
			copyArgs(msg,"UUID",params,undefined,false); 
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"Enabled",params,undefined,false); 
			copyArgs(msg,"BatchSize",params,undefined,false); 
			copyArgs(msg,"MaximumBatchingWindowInSeconds",params,undefined,false); 
			copyArgs(msg,"DestinationConfig",params,undefined,true); 
			copyArgs(msg,"MaximumRecordAgeInSeconds",params,undefined,false); 
			copyArgs(msg,"BisectBatchOnFunctionError",params,undefined,false); 
			copyArgs(msg,"MaximumRetryAttempts",params,undefined,false); 
			copyArgs(msg,"ParallelizationFactor",params,undefined,false); 
			copyArgs(msg,"SourceAccessConfigurations",params,undefined,true); 
			copyArgs(msg,"TumblingWindowInSeconds",params,undefined,false); 
			copyArgs(msg,"FunctionResponseTypes",params,undefined,true); 
			

			svc.updateEventSourceMapping(params,cb);
		}

		
		service.UpdateFunctionCode=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"ZipFile",params,undefined,true); 
			copyArgs(n,"S3Bucket",params,undefined,false); 
			copyArgs(n,"S3Key",params,undefined,false); 
			copyArgs(n,"S3ObjectVersion",params,undefined,false); 
			copyArgs(n,"ImageUri",params,undefined,false); 
			copyArgs(n,"Publish",params,undefined,false); 
			copyArgs(n,"DryRun",params,undefined,false); 
			copyArgs(n,"RevisionId",params,undefined,false); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"ZipFile",params,undefined,true); 
			copyArgs(msg,"S3Bucket",params,undefined,false); 
			copyArgs(msg,"S3Key",params,undefined,false); 
			copyArgs(msg,"S3ObjectVersion",params,undefined,false); 
			copyArgs(msg,"ImageUri",params,undefined,false); 
			copyArgs(msg,"Publish",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			copyArgs(msg,"RevisionId",params,undefined,false); 
			

			svc.updateFunctionCode(params,cb);
		}

		
		service.UpdateFunctionConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Role",params,undefined,false); 
			copyArgs(n,"Handler",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Timeout",params,undefined,false); 
			copyArgs(n,"MemorySize",params,undefined,false); 
			copyArgs(n,"VpcConfig",params,undefined,true); 
			copyArgs(n,"Environment",params,undefined,true); 
			copyArgs(n,"Runtime",params,undefined,false); 
			copyArgs(n,"DeadLetterConfig",params,undefined,true); 
			copyArgs(n,"KMSKeyArn",params,undefined,false); 
			copyArgs(n,"TracingConfig",params,undefined,true); 
			copyArgs(n,"RevisionId",params,undefined,false); 
			copyArgs(n,"Layers",params,undefined,true); 
			copyArgs(n,"FileSystemConfigs",params,undefined,true); 
			copyArgs(n,"ImageConfig",params,undefined,true); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"Role",params,undefined,false); 
			copyArgs(msg,"Handler",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Timeout",params,undefined,false); 
			copyArgs(msg,"MemorySize",params,undefined,false); 
			copyArgs(msg,"VpcConfig",params,undefined,true); 
			copyArgs(msg,"Environment",params,undefined,true); 
			copyArgs(msg,"Runtime",params,undefined,false); 
			copyArgs(msg,"DeadLetterConfig",params,undefined,true); 
			copyArgs(msg,"KMSKeyArn",params,undefined,false); 
			copyArgs(msg,"TracingConfig",params,undefined,true); 
			copyArgs(msg,"RevisionId",params,undefined,false); 
			copyArgs(msg,"Layers",params,undefined,true); 
			copyArgs(msg,"FileSystemConfigs",params,undefined,true); 
			copyArgs(msg,"ImageConfig",params,undefined,true); 
			

			svc.updateFunctionConfiguration(params,cb);
		}

		
		service.UpdateFunctionEventInvokeConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"Qualifier",params,undefined,false); 
			copyArgs(n,"MaximumRetryAttempts",params,undefined,false); 
			copyArgs(n,"MaximumEventAgeInSeconds",params,undefined,false); 
			copyArgs(n,"DestinationConfig",params,undefined,true); 
			
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"Qualifier",params,undefined,false); 
			copyArgs(msg,"MaximumRetryAttempts",params,undefined,false); 
			copyArgs(msg,"MaximumEventAgeInSeconds",params,undefined,false); 
			copyArgs(msg,"DestinationConfig",params,undefined,true); 
			

			svc.updateFunctionEventInvokeConfig(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Lambda", AmazonAPINode);

};
