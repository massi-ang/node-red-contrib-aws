
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

		var awsService = new AWS.ElasticBeanstalk( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.ElasticBeanstalk(msg.AWSConfig) : awsService;

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

		
		service.AbortEnvironmentUpdate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"EnvironmentId",params,undefined,false); 
			copyArg(msg,"EnvironmentName",params,undefined,false); 
			

			svc.abortEnvironmentUpdate(params,cb);
		}

		
		service.ApplyEnvironmentManagedAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ActionId",params,undefined,false); 
			
			copyArg(msg,"EnvironmentName",params,undefined,false); 
			copyArg(msg,"EnvironmentId",params,undefined,false); 
			copyArg(msg,"ActionId",params,undefined,false); 
			

			svc.applyEnvironmentManagedAction(params,cb);
		}

		
		service.AssociateEnvironmentOperationsRole=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EnvironmentName",params,undefined,false); 
			copyArg(n,"OperationsRole",params,undefined,false); 
			
			copyArg(msg,"EnvironmentName",params,undefined,false); 
			copyArg(msg,"OperationsRole",params,undefined,false); 
			

			svc.associateEnvironmentOperationsRole(params,cb);
		}

		
		service.CheckDNSAvailability=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CNAMEPrefix",params,undefined,false); 
			
			copyArg(msg,"CNAMEPrefix",params,undefined,false); 
			

			svc.checkDNSAvailability(params,cb);
		}

		
		service.ComposeEnvironments=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"VersionLabels",params,undefined,false); 
			

			svc.composeEnvironments(params,cb);
		}

		
		service.CreateApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"ResourceLifecycleConfig",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createApplication(params,cb);
		}

		
		service.CreateApplicationVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			copyArg(n,"VersionLabel",params,undefined,false); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"VersionLabel",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"SourceBuildInformation",params,undefined,true); 
			copyArg(msg,"SourceBundle",params,undefined,true); 
			copyArg(msg,"BuildConfiguration",params,undefined,false); 
			copyArg(msg,"AutoCreateApplication",params,undefined,false); 
			copyArg(msg,"Process",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createApplicationVersion(params,cb);
		}

		
		service.CreateConfigurationTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			copyArg(n,"TemplateName",params,undefined,false); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"TemplateName",params,undefined,false); 
			copyArg(msg,"SolutionStackName",params,undefined,false); 
			copyArg(msg,"PlatformArn",params,undefined,false); 
			copyArg(msg,"SourceConfiguration",params,undefined,false); 
			copyArg(msg,"EnvironmentId",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"OptionSettings",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createConfigurationTemplate(params,cb);
		}

		
		service.CreateEnvironment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"EnvironmentName",params,undefined,false); 
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"CNAMEPrefix",params,undefined,false); 
			copyArg(msg,"Tier",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"VersionLabel",params,undefined,false); 
			copyArg(msg,"TemplateName",params,undefined,false); 
			copyArg(msg,"SolutionStackName",params,undefined,false); 
			copyArg(msg,"PlatformArn",params,undefined,false); 
			copyArg(msg,"OptionSettings",params,undefined,true); 
			copyArg(msg,"OptionsToRemove",params,undefined,true); 
			copyArg(msg,"OperationsRole",params,undefined,false); 
			

			svc.createEnvironment(params,cb);
		}

		
		service.CreatePlatformVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PlatformName",params,undefined,false); 
			copyArg(n,"PlatformVersion",params,undefined,false); 
			copyArg(n,"PlatformDefinitionBundle",params,undefined,true); 
			
			copyArg(msg,"PlatformName",params,undefined,false); 
			copyArg(msg,"PlatformVersion",params,undefined,false); 
			copyArg(msg,"PlatformDefinitionBundle",params,undefined,true); 
			copyArg(msg,"EnvironmentName",params,undefined,false); 
			copyArg(msg,"OptionSettings",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createPlatformVersion(params,cb);
		}

		
		service.CreateStorageLocation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.createStorageLocation(params,cb);
		}

		
		service.DeleteApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"TerminateEnvByForce",params,undefined,false); 
			

			svc.deleteApplication(params,cb);
		}

		
		service.DeleteApplicationVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			copyArg(n,"VersionLabel",params,undefined,false); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"VersionLabel",params,undefined,false); 
			copyArg(msg,"DeleteSourceBundle",params,undefined,false); 
			

			svc.deleteApplicationVersion(params,cb);
		}

		
		service.DeleteConfigurationTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			copyArg(n,"TemplateName",params,undefined,false); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"TemplateName",params,undefined,false); 
			

			svc.deleteConfigurationTemplate(params,cb);
		}

		
		service.DeleteEnvironmentConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			copyArg(n,"EnvironmentName",params,undefined,false); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"EnvironmentName",params,undefined,false); 
			

			svc.deleteEnvironmentConfiguration(params,cb);
		}

		
		service.DeletePlatformVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"PlatformArn",params,undefined,false); 
			

			svc.deletePlatformVersion(params,cb);
		}

		
		service.DescribeAccountAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeAccountAttributes(params,cb);
		}

		
		service.DescribeApplicationVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"VersionLabels",params,undefined,true); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeApplicationVersions(params,cb);
		}

		
		service.DescribeApplications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ApplicationNames",params,undefined,false); 
			

			svc.describeApplications(params,cb);
		}

		
		service.DescribeConfigurationOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"TemplateName",params,undefined,false); 
			copyArg(msg,"EnvironmentName",params,undefined,false); 
			copyArg(msg,"SolutionStackName",params,undefined,false); 
			copyArg(msg,"PlatformArn",params,undefined,false); 
			copyArg(msg,"Options",params,undefined,true); 
			

			svc.describeConfigurationOptions(params,cb);
		}

		
		service.DescribeConfigurationSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"TemplateName",params,undefined,false); 
			copyArg(msg,"EnvironmentName",params,undefined,false); 
			

			svc.describeConfigurationSettings(params,cb);
		}

		
		service.DescribeEnvironmentHealth=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"EnvironmentName",params,undefined,false); 
			copyArg(msg,"EnvironmentId",params,undefined,false); 
			copyArg(msg,"AttributeNames",params,undefined,false); 
			

			svc.describeEnvironmentHealth(params,cb);
		}

		
		service.DescribeEnvironmentManagedActionHistory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"EnvironmentId",params,undefined,false); 
			copyArg(msg,"EnvironmentName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.describeEnvironmentManagedActionHistory(params,cb);
		}

		
		service.DescribeEnvironmentManagedActions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"EnvironmentName",params,undefined,false); 
			copyArg(msg,"EnvironmentId",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			

			svc.describeEnvironmentManagedActions(params,cb);
		}

		
		service.DescribeEnvironmentResources=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"EnvironmentId",params,undefined,false); 
			copyArg(msg,"EnvironmentName",params,undefined,false); 
			

			svc.describeEnvironmentResources(params,cb);
		}

		
		service.DescribeEnvironments=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"VersionLabel",params,undefined,false); 
			copyArg(msg,"EnvironmentIds",params,undefined,false); 
			copyArg(msg,"EnvironmentNames",params,undefined,false); 
			copyArg(msg,"IncludeDeleted",params,undefined,false); 
			copyArg(msg,"IncludedDeletedBackTo",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeEnvironments(params,cb);
		}

		
		service.DescribeEvents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"VersionLabel",params,undefined,false); 
			copyArg(msg,"TemplateName",params,undefined,false); 
			copyArg(msg,"EnvironmentId",params,undefined,false); 
			copyArg(msg,"EnvironmentName",params,undefined,false); 
			copyArg(msg,"PlatformArn",params,undefined,false); 
			copyArg(msg,"RequestId",params,undefined,false); 
			copyArg(msg,"Severity",params,undefined,false); 
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeEvents(params,cb);
		}

		
		service.DescribeInstancesHealth=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"EnvironmentName",params,undefined,false); 
			copyArg(msg,"EnvironmentId",params,undefined,false); 
			copyArg(msg,"AttributeNames",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeInstancesHealth(params,cb);
		}

		
		service.DescribePlatformVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"PlatformArn",params,undefined,false); 
			

			svc.describePlatformVersion(params,cb);
		}

		
		service.DisassociateEnvironmentOperationsRole=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EnvironmentName",params,undefined,false); 
			
			copyArg(msg,"EnvironmentName",params,undefined,false); 
			

			svc.disassociateEnvironmentOperationsRole(params,cb);
		}

		
		service.ListAvailableSolutionStacks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.listAvailableSolutionStacks(params,cb);
		}

		
		service.ListPlatformBranches=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listPlatformBranches(params,cb);
		}

		
		service.ListPlatformVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listPlatformVersions(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.RebuildEnvironment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"EnvironmentId",params,undefined,false); 
			copyArg(msg,"EnvironmentName",params,undefined,false); 
			

			svc.rebuildEnvironment(params,cb);
		}

		
		service.RequestEnvironmentInfo=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InfoType",params,undefined,false); 
			
			copyArg(msg,"EnvironmentId",params,undefined,false); 
			copyArg(msg,"EnvironmentName",params,undefined,false); 
			copyArg(msg,"InfoType",params,undefined,false); 
			

			svc.requestEnvironmentInfo(params,cb);
		}

		
		service.RestartAppServer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"EnvironmentId",params,undefined,false); 
			copyArg(msg,"EnvironmentName",params,undefined,false); 
			

			svc.restartAppServer(params,cb);
		}

		
		service.RetrieveEnvironmentInfo=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InfoType",params,undefined,false); 
			
			copyArg(msg,"EnvironmentId",params,undefined,false); 
			copyArg(msg,"EnvironmentName",params,undefined,false); 
			copyArg(msg,"InfoType",params,undefined,false); 
			

			svc.retrieveEnvironmentInfo(params,cb);
		}

		
		service.SwapEnvironmentCNAMEs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SourceEnvironmentId",params,undefined,false); 
			copyArg(msg,"SourceEnvironmentName",params,undefined,false); 
			copyArg(msg,"DestinationEnvironmentId",params,undefined,false); 
			copyArg(msg,"DestinationEnvironmentName",params,undefined,false); 
			

			svc.swapEnvironmentCNAMEs(params,cb);
		}

		
		service.TerminateEnvironment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"EnvironmentId",params,undefined,false); 
			copyArg(msg,"EnvironmentName",params,undefined,false); 
			copyArg(msg,"TerminateResources",params,undefined,false); 
			copyArg(msg,"ForceTerminate",params,undefined,false); 
			

			svc.terminateEnvironment(params,cb);
		}

		
		service.UpdateApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			

			svc.updateApplication(params,cb);
		}

		
		service.UpdateApplicationResourceLifecycle=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			copyArg(n,"ResourceLifecycleConfig",params,undefined,true); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"ResourceLifecycleConfig",params,undefined,true); 
			

			svc.updateApplicationResourceLifecycle(params,cb);
		}

		
		service.UpdateApplicationVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			copyArg(n,"VersionLabel",params,undefined,false); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"VersionLabel",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			

			svc.updateApplicationVersion(params,cb);
		}

		
		service.UpdateConfigurationTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			copyArg(n,"TemplateName",params,undefined,false); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"TemplateName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"OptionSettings",params,undefined,true); 
			copyArg(msg,"OptionsToRemove",params,undefined,true); 
			

			svc.updateConfigurationTemplate(params,cb);
		}

		
		service.UpdateEnvironment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"EnvironmentId",params,undefined,false); 
			copyArg(msg,"EnvironmentName",params,undefined,false); 
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Tier",params,undefined,true); 
			copyArg(msg,"VersionLabel",params,undefined,false); 
			copyArg(msg,"TemplateName",params,undefined,false); 
			copyArg(msg,"SolutionStackName",params,undefined,false); 
			copyArg(msg,"PlatformArn",params,undefined,false); 
			copyArg(msg,"OptionSettings",params,undefined,true); 
			copyArg(msg,"OptionsToRemove",params,undefined,true); 
			

			svc.updateEnvironment(params,cb);
		}

		
		service.UpdateTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagsToAdd",params,undefined,true); 
			copyArg(msg,"TagsToRemove",params,undefined,false); 
			

			svc.updateTagsForResource(params,cb);
		}

		
		service.ValidateConfigurationSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationName",params,undefined,false); 
			copyArg(n,"OptionSettings",params,undefined,true); 
			
			copyArg(msg,"ApplicationName",params,undefined,false); 
			copyArg(msg,"TemplateName",params,undefined,false); 
			copyArg(msg,"EnvironmentName",params,undefined,false); 
			copyArg(msg,"OptionSettings",params,undefined,true); 
			

			svc.validateConfigurationSettings(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS ElasticBeanstalk", AmazonAPINode);

};
