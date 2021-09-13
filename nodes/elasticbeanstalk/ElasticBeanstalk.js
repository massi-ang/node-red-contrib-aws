
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

		var awsService = new AWS.ElasticBeanstalk( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.ElasticBeanstalk(msg.AWSConfig) : awsService;

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
		
			service.AbortEnvironmentUpdate=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			copyArgs(n,"EnvironmentName",params,undefined,false); 
			
			copyArgs(msg,"EnvironmentId",params,undefined,false); 
			copyArgs(msg,"EnvironmentName",params,undefined,false); 
			

			svc.abortEnvironmentUpdate(params,cb);
		}
			service.ApplyEnvironmentManagedAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ActionId",params,undefined,false); 
			
			copyArgs(n,"EnvironmentName",params,undefined,false); 
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			copyArgs(n,"ActionId",params,undefined,false); 
			
			copyArgs(msg,"EnvironmentName",params,undefined,false); 
			copyArgs(msg,"EnvironmentId",params,undefined,false); 
			copyArgs(msg,"ActionId",params,undefined,false); 
			

			svc.applyEnvironmentManagedAction(params,cb);
		}
			service.AssociateEnvironmentOperationsRole=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EnvironmentName",params,undefined,false); 
			copyArgs(n,"OperationsRole",params,undefined,false); 
			
			copyArgs(n,"EnvironmentName",params,undefined,false); 
			copyArgs(n,"OperationsRole",params,undefined,false); 
			
			copyArgs(msg,"EnvironmentName",params,undefined,false); 
			copyArgs(msg,"OperationsRole",params,undefined,false); 
			

			svc.associateEnvironmentOperationsRole(params,cb);
		}
			service.CheckDNSAvailability=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CNAMEPrefix",params,undefined,false); 
			
			copyArgs(n,"CNAMEPrefix",params,undefined,false); 
			
			copyArgs(msg,"CNAMEPrefix",params,undefined,false); 
			

			svc.checkDNSAvailability(params,cb);
		}
			service.ComposeEnvironments=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"VersionLabels",params,undefined,false); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"VersionLabels",params,undefined,false); 
			

			svc.composeEnvironments(params,cb);
		}
			service.CreateApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"ResourceLifecycleConfig",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"ResourceLifecycleConfig",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createApplication(params,cb);
		}
			service.CreateApplicationVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"VersionLabel",params,undefined,false); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"VersionLabel",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"SourceBuildInformation",params,undefined,true); 
			copyArgs(n,"SourceBundle",params,undefined,true); 
			copyArgs(n,"BuildConfiguration",params,undefined,false); 
			copyArgs(Boolean(n),"AutoCreateApplication",params,undefined,false); 
			copyArgs(Boolean(n),"Process",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"VersionLabel",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"SourceBuildInformation",params,undefined,true); 
			copyArgs(msg,"SourceBundle",params,undefined,true); 
			copyArgs(msg,"BuildConfiguration",params,undefined,false); 
			copyArgs(msg,"AutoCreateApplication",params,undefined,false); 
			copyArgs(msg,"Process",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createApplicationVersion(params,cb);
		}
			service.CreateConfigurationTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"SolutionStackName",params,undefined,false); 
			copyArgs(n,"PlatformArn",params,undefined,false); 
			copyArgs(n,"SourceConfiguration",params,undefined,false); 
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"OptionSettings",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"SolutionStackName",params,undefined,false); 
			copyArgs(msg,"PlatformArn",params,undefined,false); 
			copyArgs(msg,"SourceConfiguration",params,undefined,false); 
			copyArgs(msg,"EnvironmentId",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"OptionSettings",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createConfigurationTemplate(params,cb);
		}
			service.CreateEnvironment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"EnvironmentName",params,undefined,false); 
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"CNAMEPrefix",params,undefined,false); 
			copyArgs(n,"Tier",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"VersionLabel",params,undefined,false); 
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"SolutionStackName",params,undefined,false); 
			copyArgs(n,"PlatformArn",params,undefined,false); 
			copyArgs(n,"OptionSettings",params,undefined,true); 
			copyArgs(n,"OptionsToRemove",params,undefined,true); 
			copyArgs(n,"OperationsRole",params,undefined,false); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"EnvironmentName",params,undefined,false); 
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"CNAMEPrefix",params,undefined,false); 
			copyArgs(msg,"Tier",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"VersionLabel",params,undefined,false); 
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"SolutionStackName",params,undefined,false); 
			copyArgs(msg,"PlatformArn",params,undefined,false); 
			copyArgs(msg,"OptionSettings",params,undefined,true); 
			copyArgs(msg,"OptionsToRemove",params,undefined,true); 
			copyArgs(msg,"OperationsRole",params,undefined,false); 
			

			svc.createEnvironment(params,cb);
		}
			service.CreatePlatformVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PlatformName",params,undefined,false); 
			copyArgs(n,"PlatformVersion",params,undefined,false); 
			copyArgs(n,"PlatformDefinitionBundle",params,undefined,true); 
			
			copyArgs(n,"PlatformName",params,undefined,false); 
			copyArgs(n,"PlatformVersion",params,undefined,false); 
			copyArgs(n,"PlatformDefinitionBundle",params,undefined,true); 
			copyArgs(n,"EnvironmentName",params,undefined,false); 
			copyArgs(n,"OptionSettings",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"PlatformName",params,undefined,false); 
			copyArgs(msg,"PlatformVersion",params,undefined,false); 
			copyArgs(msg,"PlatformDefinitionBundle",params,undefined,true); 
			copyArgs(msg,"EnvironmentName",params,undefined,false); 
			copyArgs(msg,"OptionSettings",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createPlatformVersion(params,cb);
		}
			service.CreateStorageLocation=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.createStorageLocation(params,cb);
		}
			service.DeleteApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(Boolean(n),"TerminateEnvByForce",params,undefined,false); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"TerminateEnvByForce",params,undefined,false); 
			

			svc.deleteApplication(params,cb);
		}
			service.DeleteApplicationVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"VersionLabel",params,undefined,false); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"VersionLabel",params,undefined,false); 
			copyArgs(Boolean(n),"DeleteSourceBundle",params,undefined,false); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"VersionLabel",params,undefined,false); 
			copyArgs(msg,"DeleteSourceBundle",params,undefined,false); 
			

			svc.deleteApplicationVersion(params,cb);
		}
			service.DeleteConfigurationTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"TemplateName",params,undefined,false); 
			

			svc.deleteConfigurationTemplate(params,cb);
		}
			service.DeleteEnvironmentConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"EnvironmentName",params,undefined,false); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"EnvironmentName",params,undefined,false); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"EnvironmentName",params,undefined,false); 
			

			svc.deleteEnvironmentConfiguration(params,cb);
		}
			service.DeletePlatformVersion=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"PlatformArn",params,undefined,false); 
			
			copyArgs(msg,"PlatformArn",params,undefined,false); 
			

			svc.deletePlatformVersion(params,cb);
		}
			service.DescribeAccountAttributes=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeAccountAttributes(params,cb);
		}
			service.DescribeApplicationVersions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"VersionLabels",params,undefined,true); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"VersionLabels",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeApplicationVersions(params,cb);
		}
			service.DescribeApplications=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ApplicationNames",params,undefined,false); 
			
			copyArgs(msg,"ApplicationNames",params,undefined,false); 
			

			svc.describeApplications(params,cb);
		}
			service.DescribeConfigurationOptions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"EnvironmentName",params,undefined,false); 
			copyArgs(n,"SolutionStackName",params,undefined,false); 
			copyArgs(n,"PlatformArn",params,undefined,false); 
			copyArgs(n,"Options",params,undefined,true); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"EnvironmentName",params,undefined,false); 
			copyArgs(msg,"SolutionStackName",params,undefined,false); 
			copyArgs(msg,"PlatformArn",params,undefined,false); 
			copyArgs(msg,"Options",params,undefined,true); 
			

			svc.describeConfigurationOptions(params,cb);
		}
			service.DescribeConfigurationSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"EnvironmentName",params,undefined,false); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"EnvironmentName",params,undefined,false); 
			

			svc.describeConfigurationSettings(params,cb);
		}
			service.DescribeEnvironmentHealth=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"EnvironmentName",params,undefined,false); 
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			copyArgs(n,"AttributeNames",params,undefined,false); 
			
			copyArgs(msg,"EnvironmentName",params,undefined,false); 
			copyArgs(msg,"EnvironmentId",params,undefined,false); 
			copyArgs(msg,"AttributeNames",params,undefined,false); 
			

			svc.describeEnvironmentHealth(params,cb);
		}
			service.DescribeEnvironmentManagedActionHistory=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			copyArgs(n,"EnvironmentName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"EnvironmentId",params,undefined,false); 
			copyArgs(msg,"EnvironmentName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.describeEnvironmentManagedActionHistory(params,cb);
		}
			service.DescribeEnvironmentManagedActions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"EnvironmentName",params,undefined,false); 
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(msg,"EnvironmentName",params,undefined,false); 
			copyArgs(msg,"EnvironmentId",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			

			svc.describeEnvironmentManagedActions(params,cb);
		}
			service.DescribeEnvironmentResources=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			copyArgs(n,"EnvironmentName",params,undefined,false); 
			
			copyArgs(msg,"EnvironmentId",params,undefined,false); 
			copyArgs(msg,"EnvironmentName",params,undefined,false); 
			

			svc.describeEnvironmentResources(params,cb);
		}
			service.DescribeEnvironments=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"VersionLabel",params,undefined,false); 
			copyArgs(n,"EnvironmentIds",params,undefined,false); 
			copyArgs(n,"EnvironmentNames",params,undefined,false); 
			copyArgs(Boolean(n),"IncludeDeleted",params,undefined,false); 
			copyArgs(n,"IncludedDeletedBackTo",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"VersionLabel",params,undefined,false); 
			copyArgs(msg,"EnvironmentIds",params,undefined,false); 
			copyArgs(msg,"EnvironmentNames",params,undefined,false); 
			copyArgs(msg,"IncludeDeleted",params,undefined,false); 
			copyArgs(msg,"IncludedDeletedBackTo",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeEnvironments(params,cb);
		}
			service.DescribeEvents=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"VersionLabel",params,undefined,false); 
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			copyArgs(n,"EnvironmentName",params,undefined,false); 
			copyArgs(n,"PlatformArn",params,undefined,false); 
			copyArgs(n,"RequestId",params,undefined,false); 
			copyArgs(n,"Severity",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"VersionLabel",params,undefined,false); 
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"EnvironmentId",params,undefined,false); 
			copyArgs(msg,"EnvironmentName",params,undefined,false); 
			copyArgs(msg,"PlatformArn",params,undefined,false); 
			copyArgs(msg,"RequestId",params,undefined,false); 
			copyArgs(msg,"Severity",params,undefined,false); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeEvents(params,cb);
		}
			service.DescribeInstancesHealth=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"EnvironmentName",params,undefined,false); 
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			copyArgs(n,"AttributeNames",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"EnvironmentName",params,undefined,false); 
			copyArgs(msg,"EnvironmentId",params,undefined,false); 
			copyArgs(msg,"AttributeNames",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeInstancesHealth(params,cb);
		}
			service.DescribePlatformVersion=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"PlatformArn",params,undefined,false); 
			
			copyArgs(msg,"PlatformArn",params,undefined,false); 
			

			svc.describePlatformVersion(params,cb);
		}
			service.DisassociateEnvironmentOperationsRole=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EnvironmentName",params,undefined,false); 
			
			copyArgs(n,"EnvironmentName",params,undefined,false); 
			
			copyArgs(msg,"EnvironmentName",params,undefined,false); 
			

			svc.disassociateEnvironmentOperationsRole(params,cb);
		}
			service.ListAvailableSolutionStacks=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.listAvailableSolutionStacks(params,cb);
		}
			service.ListPlatformBranches=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listPlatformBranches(params,cb);
		}
			service.ListPlatformVersions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listPlatformVersions(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.RebuildEnvironment=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			copyArgs(n,"EnvironmentName",params,undefined,false); 
			
			copyArgs(msg,"EnvironmentId",params,undefined,false); 
			copyArgs(msg,"EnvironmentName",params,undefined,false); 
			

			svc.rebuildEnvironment(params,cb);
		}
			service.RequestEnvironmentInfo=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InfoType",params,undefined,false); 
			
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			copyArgs(n,"EnvironmentName",params,undefined,false); 
			copyArgs(n,"InfoType",params,undefined,false); 
			
			copyArgs(msg,"EnvironmentId",params,undefined,false); 
			copyArgs(msg,"EnvironmentName",params,undefined,false); 
			copyArgs(msg,"InfoType",params,undefined,false); 
			

			svc.requestEnvironmentInfo(params,cb);
		}
			service.RestartAppServer=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			copyArgs(n,"EnvironmentName",params,undefined,false); 
			
			copyArgs(msg,"EnvironmentId",params,undefined,false); 
			copyArgs(msg,"EnvironmentName",params,undefined,false); 
			

			svc.restartAppServer(params,cb);
		}
			service.RetrieveEnvironmentInfo=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InfoType",params,undefined,false); 
			
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			copyArgs(n,"EnvironmentName",params,undefined,false); 
			copyArgs(n,"InfoType",params,undefined,false); 
			
			copyArgs(msg,"EnvironmentId",params,undefined,false); 
			copyArgs(msg,"EnvironmentName",params,undefined,false); 
			copyArgs(msg,"InfoType",params,undefined,false); 
			

			svc.retrieveEnvironmentInfo(params,cb);
		}
			service.SwapEnvironmentCNAMEs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SourceEnvironmentId",params,undefined,false); 
			copyArgs(n,"SourceEnvironmentName",params,undefined,false); 
			copyArgs(n,"DestinationEnvironmentId",params,undefined,false); 
			copyArgs(n,"DestinationEnvironmentName",params,undefined,false); 
			
			copyArgs(msg,"SourceEnvironmentId",params,undefined,false); 
			copyArgs(msg,"SourceEnvironmentName",params,undefined,false); 
			copyArgs(msg,"DestinationEnvironmentId",params,undefined,false); 
			copyArgs(msg,"DestinationEnvironmentName",params,undefined,false); 
			

			svc.swapEnvironmentCNAMEs(params,cb);
		}
			service.TerminateEnvironment=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			copyArgs(n,"EnvironmentName",params,undefined,false); 
			copyArgs(Boolean(n),"TerminateResources",params,undefined,false); 
			copyArgs(Boolean(n),"ForceTerminate",params,undefined,false); 
			
			copyArgs(msg,"EnvironmentId",params,undefined,false); 
			copyArgs(msg,"EnvironmentName",params,undefined,false); 
			copyArgs(msg,"TerminateResources",params,undefined,false); 
			copyArgs(msg,"ForceTerminate",params,undefined,false); 
			

			svc.terminateEnvironment(params,cb);
		}
			service.UpdateApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			

			svc.updateApplication(params,cb);
		}
			service.UpdateApplicationResourceLifecycle=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"ResourceLifecycleConfig",params,undefined,true); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"ResourceLifecycleConfig",params,undefined,true); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"ResourceLifecycleConfig",params,undefined,true); 
			

			svc.updateApplicationResourceLifecycle(params,cb);
		}
			service.UpdateApplicationVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"VersionLabel",params,undefined,false); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"VersionLabel",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"VersionLabel",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			

			svc.updateApplicationVersion(params,cb);
		}
			service.UpdateConfigurationTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"TemplateName",params,undefined,false); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"OptionSettings",params,undefined,true); 
			copyArgs(n,"OptionsToRemove",params,undefined,true); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"OptionSettings",params,undefined,true); 
			copyArgs(msg,"OptionsToRemove",params,undefined,true); 
			

			svc.updateConfigurationTemplate(params,cb);
		}
			service.UpdateEnvironment=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"EnvironmentId",params,undefined,false); 
			copyArgs(n,"EnvironmentName",params,undefined,false); 
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Tier",params,undefined,true); 
			copyArgs(n,"VersionLabel",params,undefined,false); 
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"SolutionStackName",params,undefined,false); 
			copyArgs(n,"PlatformArn",params,undefined,false); 
			copyArgs(n,"OptionSettings",params,undefined,true); 
			copyArgs(n,"OptionsToRemove",params,undefined,true); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"EnvironmentId",params,undefined,false); 
			copyArgs(msg,"EnvironmentName",params,undefined,false); 
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Tier",params,undefined,true); 
			copyArgs(msg,"VersionLabel",params,undefined,false); 
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"SolutionStackName",params,undefined,false); 
			copyArgs(msg,"PlatformArn",params,undefined,false); 
			copyArgs(msg,"OptionSettings",params,undefined,true); 
			copyArgs(msg,"OptionsToRemove",params,undefined,true); 
			

			svc.updateEnvironment(params,cb);
		}
			service.UpdateTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagsToAdd",params,undefined,true); 
			copyArgs(n,"TagsToRemove",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagsToAdd",params,undefined,true); 
			copyArgs(msg,"TagsToRemove",params,undefined,false); 
			

			svc.updateTagsForResource(params,cb);
		}
			service.ValidateConfigurationSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"OptionSettings",params,undefined,true); 
			
			copyArgs(n,"ApplicationName",params,undefined,false); 
			copyArgs(n,"TemplateName",params,undefined,false); 
			copyArgs(n,"EnvironmentName",params,undefined,false); 
			copyArgs(n,"OptionSettings",params,undefined,true); 
			
			copyArgs(msg,"ApplicationName",params,undefined,false); 
			copyArgs(msg,"TemplateName",params,undefined,false); 
			copyArgs(msg,"EnvironmentName",params,undefined,false); 
			copyArgs(msg,"OptionSettings",params,undefined,true); 
			

			svc.validateConfigurationSettings(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS ElasticBeanstalk", AmazonAPINode);

};
