
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

		var awsService = new AWS.Imagebuilder( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Imagebuilder(msg.AWSConfig) : awsService;

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
		
		service.CancelImageCreation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"imageBuildVersionArn",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(n,"imageBuildVersionArn",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"imageBuildVersionArn",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.cancelImageCreation(params,cb);
		}
		
		service.CreateComponent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"semanticVersion",params,undefined,false); 
			copyArgs(n,"platform",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"semanticVersion",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"changeDescription",params,undefined,false); 
			copyArgs(n,"platform",params,undefined,false); 
			copyArgs(n,"supportedOsVersions",params,undefined,true); 
			copyArgs(n,"data",params,undefined,false); 
			copyArgs(n,"uri",params,undefined,false); 
			copyArgs(n,"kmsKeyId",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"semanticVersion",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"changeDescription",params,undefined,false); 
			copyArgs(msg,"platform",params,undefined,false); 
			copyArgs(msg,"supportedOsVersions",params,undefined,true); 
			copyArgs(msg,"data",params,undefined,false); 
			copyArgs(msg,"uri",params,undefined,false); 
			copyArgs(msg,"kmsKeyId",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.createComponent(params,cb);
		}
		
		service.CreateContainerRecipe=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"containerType",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"semanticVersion",params,undefined,false); 
			copyArgs(n,"components",params,undefined,true); 
			copyArgs(n,"parentImage",params,undefined,false); 
			copyArgs(n,"targetRepository",params,undefined,true); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(n,"containerType",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"semanticVersion",params,undefined,false); 
			copyArgs(n,"components",params,undefined,true); 
			copyArgs(n,"instanceConfiguration",params,undefined,true); 
			copyArgs(n,"dockerfileTemplateData",params,undefined,false); 
			copyArgs(n,"dockerfileTemplateUri",params,undefined,false); 
			copyArgs(n,"platformOverride",params,undefined,false); 
			copyArgs(n,"imageOsVersionOverride",params,undefined,false); 
			copyArgs(n,"parentImage",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"workingDirectory",params,undefined,false); 
			copyArgs(n,"targetRepository",params,undefined,true); 
			copyArgs(n,"kmsKeyId",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"containerType",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"semanticVersion",params,undefined,false); 
			copyArgs(msg,"components",params,undefined,true); 
			copyArgs(msg,"instanceConfiguration",params,undefined,true); 
			copyArgs(msg,"dockerfileTemplateData",params,undefined,false); 
			copyArgs(msg,"dockerfileTemplateUri",params,undefined,false); 
			copyArgs(msg,"platformOverride",params,undefined,false); 
			copyArgs(msg,"imageOsVersionOverride",params,undefined,false); 
			copyArgs(msg,"parentImage",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"workingDirectory",params,undefined,false); 
			copyArgs(msg,"targetRepository",params,undefined,true); 
			copyArgs(msg,"kmsKeyId",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.createContainerRecipe(params,cb);
		}
		
		service.CreateDistributionConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"distributions",params,undefined,true); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"distributions",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"distributions",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.createDistributionConfiguration(params,cb);
		}
		
		service.CreateImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"infrastructureConfigurationArn",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(n,"imageRecipeArn",params,undefined,false); 
			copyArgs(n,"containerRecipeArn",params,undefined,false); 
			copyArgs(n,"distributionConfigurationArn",params,undefined,false); 
			copyArgs(n,"infrastructureConfigurationArn",params,undefined,false); 
			copyArgs(n,"imageTestsConfiguration",params,undefined,true); 
			copyArgs(Boolean(n),"enhancedImageMetadataEnabled",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"imageRecipeArn",params,undefined,false); 
			copyArgs(msg,"containerRecipeArn",params,undefined,false); 
			copyArgs(msg,"distributionConfigurationArn",params,undefined,false); 
			copyArgs(msg,"infrastructureConfigurationArn",params,undefined,false); 
			copyArgs(msg,"imageTestsConfiguration",params,undefined,true); 
			copyArgs(msg,"enhancedImageMetadataEnabled",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.createImage(params,cb);
		}
		
		service.CreateImagePipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"infrastructureConfigurationArn",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"imageRecipeArn",params,undefined,false); 
			copyArgs(n,"containerRecipeArn",params,undefined,false); 
			copyArgs(n,"infrastructureConfigurationArn",params,undefined,false); 
			copyArgs(n,"distributionConfigurationArn",params,undefined,false); 
			copyArgs(n,"imageTestsConfiguration",params,undefined,true); 
			copyArgs(Boolean(n),"enhancedImageMetadataEnabled",params,undefined,false); 
			copyArgs(n,"schedule",params,undefined,true); 
			copyArgs(n,"status",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"imageRecipeArn",params,undefined,false); 
			copyArgs(msg,"containerRecipeArn",params,undefined,false); 
			copyArgs(msg,"infrastructureConfigurationArn",params,undefined,false); 
			copyArgs(msg,"distributionConfigurationArn",params,undefined,false); 
			copyArgs(msg,"imageTestsConfiguration",params,undefined,true); 
			copyArgs(msg,"enhancedImageMetadataEnabled",params,undefined,false); 
			copyArgs(msg,"schedule",params,undefined,true); 
			copyArgs(msg,"status",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.createImagePipeline(params,cb);
		}
		
		service.CreateImageRecipe=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"semanticVersion",params,undefined,false); 
			copyArgs(n,"components",params,undefined,true); 
			copyArgs(n,"parentImage",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"semanticVersion",params,undefined,false); 
			copyArgs(n,"components",params,undefined,true); 
			copyArgs(n,"parentImage",params,undefined,false); 
			copyArgs(n,"blockDeviceMappings",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"workingDirectory",params,undefined,false); 
			copyArgs(n,"additionalInstanceConfiguration",params,undefined,true); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"semanticVersion",params,undefined,false); 
			copyArgs(msg,"components",params,undefined,true); 
			copyArgs(msg,"parentImage",params,undefined,false); 
			copyArgs(msg,"blockDeviceMappings",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"workingDirectory",params,undefined,false); 
			copyArgs(msg,"additionalInstanceConfiguration",params,undefined,true); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.createImageRecipe(params,cb);
		}
		
		service.CreateInfrastructureConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"instanceProfileName",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"instanceTypes",params,undefined,true); 
			copyArgs(n,"instanceProfileName",params,undefined,false); 
			copyArgs(n,"securityGroupIds",params,undefined,true); 
			copyArgs(n,"subnetId",params,undefined,false); 
			copyArgs(n,"logging",params,undefined,true); 
			copyArgs(n,"keyPair",params,undefined,false); 
			copyArgs(Boolean(n),"terminateInstanceOnFailure",params,undefined,false); 
			copyArgs(n,"snsTopicArn",params,undefined,false); 
			copyArgs(n,"resourceTags",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"instanceTypes",params,undefined,true); 
			copyArgs(msg,"instanceProfileName",params,undefined,false); 
			copyArgs(msg,"securityGroupIds",params,undefined,true); 
			copyArgs(msg,"subnetId",params,undefined,false); 
			copyArgs(msg,"logging",params,undefined,true); 
			copyArgs(msg,"keyPair",params,undefined,false); 
			copyArgs(msg,"terminateInstanceOnFailure",params,undefined,false); 
			copyArgs(msg,"snsTopicArn",params,undefined,false); 
			copyArgs(msg,"resourceTags",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.createInfrastructureConfiguration(params,cb);
		}
		
		service.DeleteComponent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"componentBuildVersionArn",params,undefined,false); 
			
			copyArgs(n,"componentBuildVersionArn",params,undefined,false); 
			
			copyArgs(msg,"componentBuildVersionArn",params,undefined,false); 
			

			svc.deleteComponent(params,cb);
		}
		
		service.DeleteContainerRecipe=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"containerRecipeArn",params,undefined,false); 
			
			copyArgs(n,"containerRecipeArn",params,undefined,false); 
			
			copyArgs(msg,"containerRecipeArn",params,undefined,false); 
			

			svc.deleteContainerRecipe(params,cb);
		}
		
		service.DeleteDistributionConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"distributionConfigurationArn",params,undefined,false); 
			
			copyArgs(n,"distributionConfigurationArn",params,undefined,false); 
			
			copyArgs(msg,"distributionConfigurationArn",params,undefined,false); 
			

			svc.deleteDistributionConfiguration(params,cb);
		}
		
		service.DeleteImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"imageBuildVersionArn",params,undefined,false); 
			
			copyArgs(n,"imageBuildVersionArn",params,undefined,false); 
			
			copyArgs(msg,"imageBuildVersionArn",params,undefined,false); 
			

			svc.deleteImage(params,cb);
		}
		
		service.DeleteImagePipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"imagePipelineArn",params,undefined,false); 
			
			copyArgs(n,"imagePipelineArn",params,undefined,false); 
			
			copyArgs(msg,"imagePipelineArn",params,undefined,false); 
			

			svc.deleteImagePipeline(params,cb);
		}
		
		service.DeleteImageRecipe=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"imageRecipeArn",params,undefined,false); 
			
			copyArgs(n,"imageRecipeArn",params,undefined,false); 
			
			copyArgs(msg,"imageRecipeArn",params,undefined,false); 
			

			svc.deleteImageRecipe(params,cb);
		}
		
		service.DeleteInfrastructureConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"infrastructureConfigurationArn",params,undefined,false); 
			
			copyArgs(n,"infrastructureConfigurationArn",params,undefined,false); 
			
			copyArgs(msg,"infrastructureConfigurationArn",params,undefined,false); 
			

			svc.deleteInfrastructureConfiguration(params,cb);
		}
		
		service.GetComponent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"componentBuildVersionArn",params,undefined,false); 
			
			copyArgs(n,"componentBuildVersionArn",params,undefined,false); 
			
			copyArgs(msg,"componentBuildVersionArn",params,undefined,false); 
			

			svc.getComponent(params,cb);
		}
		
		service.GetComponentPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"componentArn",params,undefined,false); 
			
			copyArgs(n,"componentArn",params,undefined,false); 
			
			copyArgs(msg,"componentArn",params,undefined,false); 
			

			svc.getComponentPolicy(params,cb);
		}
		
		service.GetContainerRecipe=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"containerRecipeArn",params,undefined,false); 
			
			copyArgs(n,"containerRecipeArn",params,undefined,false); 
			
			copyArgs(msg,"containerRecipeArn",params,undefined,false); 
			

			svc.getContainerRecipe(params,cb);
		}
		
		service.GetContainerRecipePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"containerRecipeArn",params,undefined,false); 
			
			copyArgs(n,"containerRecipeArn",params,undefined,false); 
			
			copyArgs(msg,"containerRecipeArn",params,undefined,false); 
			

			svc.getContainerRecipePolicy(params,cb);
		}
		
		service.GetDistributionConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"distributionConfigurationArn",params,undefined,false); 
			
			copyArgs(n,"distributionConfigurationArn",params,undefined,false); 
			
			copyArgs(msg,"distributionConfigurationArn",params,undefined,false); 
			

			svc.getDistributionConfiguration(params,cb);
		}
		
		service.GetImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"imageBuildVersionArn",params,undefined,false); 
			
			copyArgs(n,"imageBuildVersionArn",params,undefined,false); 
			
			copyArgs(msg,"imageBuildVersionArn",params,undefined,false); 
			

			svc.getImage(params,cb);
		}
		
		service.GetImagePipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"imagePipelineArn",params,undefined,false); 
			
			copyArgs(n,"imagePipelineArn",params,undefined,false); 
			
			copyArgs(msg,"imagePipelineArn",params,undefined,false); 
			

			svc.getImagePipeline(params,cb);
		}
		
		service.GetImagePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"imageArn",params,undefined,false); 
			
			copyArgs(n,"imageArn",params,undefined,false); 
			
			copyArgs(msg,"imageArn",params,undefined,false); 
			

			svc.getImagePolicy(params,cb);
		}
		
		service.GetImageRecipe=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"imageRecipeArn",params,undefined,false); 
			
			copyArgs(n,"imageRecipeArn",params,undefined,false); 
			
			copyArgs(msg,"imageRecipeArn",params,undefined,false); 
			

			svc.getImageRecipe(params,cb);
		}
		
		service.GetImageRecipePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"imageRecipeArn",params,undefined,false); 
			
			copyArgs(n,"imageRecipeArn",params,undefined,false); 
			
			copyArgs(msg,"imageRecipeArn",params,undefined,false); 
			

			svc.getImageRecipePolicy(params,cb);
		}
		
		service.GetInfrastructureConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"infrastructureConfigurationArn",params,undefined,false); 
			
			copyArgs(n,"infrastructureConfigurationArn",params,undefined,false); 
			
			copyArgs(msg,"infrastructureConfigurationArn",params,undefined,false); 
			

			svc.getInfrastructureConfiguration(params,cb);
		}
		
		service.ImportComponent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"semanticVersion",params,undefined,false); 
			copyArgs(n,"_type",params,"type",false); 
			copyArgs(n,"format",params,undefined,false); 
			copyArgs(n,"platform",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"semanticVersion",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"changeDescription",params,undefined,false); 
			copyArgs(n,"type",params,undefined,false); 
			copyArgs(n,"format",params,undefined,false); 
			copyArgs(n,"platform",params,undefined,false); 
			copyArgs(n,"data",params,undefined,false); 
			copyArgs(n,"uri",params,undefined,false); 
			copyArgs(n,"kmsKeyId",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"semanticVersion",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"changeDescription",params,undefined,false); 
			copyArgs(msg,"type",params,undefined,false); 
			copyArgs(msg,"format",params,undefined,false); 
			copyArgs(msg,"platform",params,undefined,false); 
			copyArgs(msg,"data",params,undefined,false); 
			copyArgs(msg,"uri",params,undefined,false); 
			copyArgs(msg,"kmsKeyId",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.importComponent(params,cb);
		}
		
		service.ListComponentBuildVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"componentVersionArn",params,undefined,false); 
			
			copyArgs(n,"componentVersionArn",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"componentVersionArn",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listComponentBuildVersions(params,cb);
		}
		
		service.ListComponents=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"owner",params,undefined,false); 
			copyArgs(n,"filters",params,undefined,true); 
			copyArgs(Boolean(n),"byName",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"owner",params,undefined,false); 
			copyArgs(msg,"filters",params,undefined,true); 
			copyArgs(msg,"byName",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listComponents(params,cb);
		}
		
		service.ListContainerRecipes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"owner",params,undefined,false); 
			copyArgs(n,"filters",params,undefined,true); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"owner",params,undefined,false); 
			copyArgs(msg,"filters",params,undefined,true); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listContainerRecipes(params,cb);
		}
		
		service.ListDistributionConfigurations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"filters",params,undefined,true); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"filters",params,undefined,true); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listDistributionConfigurations(params,cb);
		}
		
		service.ListImageBuildVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"imageVersionArn",params,undefined,false); 
			
			copyArgs(n,"imageVersionArn",params,undefined,false); 
			copyArgs(n,"filters",params,undefined,true); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"imageVersionArn",params,undefined,false); 
			copyArgs(msg,"filters",params,undefined,true); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listImageBuildVersions(params,cb);
		}
		
		service.ListImagePackages=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"imageBuildVersionArn",params,undefined,false); 
			
			copyArgs(n,"imageBuildVersionArn",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"imageBuildVersionArn",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listImagePackages(params,cb);
		}
		
		service.ListImagePipelineImages=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"imagePipelineArn",params,undefined,false); 
			
			copyArgs(n,"imagePipelineArn",params,undefined,false); 
			copyArgs(n,"filters",params,undefined,true); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"imagePipelineArn",params,undefined,false); 
			copyArgs(msg,"filters",params,undefined,true); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listImagePipelineImages(params,cb);
		}
		
		service.ListImagePipelines=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"filters",params,undefined,true); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"filters",params,undefined,true); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listImagePipelines(params,cb);
		}
		
		service.ListImageRecipes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"owner",params,undefined,false); 
			copyArgs(n,"filters",params,undefined,true); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"owner",params,undefined,false); 
			copyArgs(msg,"filters",params,undefined,true); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listImageRecipes(params,cb);
		}
		
		service.ListImages=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"owner",params,undefined,false); 
			copyArgs(n,"filters",params,undefined,true); 
			copyArgs(Boolean(n),"byName",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Boolean(n),"includeDeprecated",params,undefined,false); 
			
			copyArgs(msg,"owner",params,undefined,false); 
			copyArgs(msg,"filters",params,undefined,true); 
			copyArgs(msg,"byName",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"includeDeprecated",params,undefined,false); 
			

			svc.listImages(params,cb);
		}
		
		service.ListInfrastructureConfigurations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"filters",params,undefined,true); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"filters",params,undefined,true); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listInfrastructureConfigurations(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.PutComponentPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"componentArn",params,undefined,false); 
			copyArgs(n,"policy",params,undefined,false); 
			
			copyArgs(n,"componentArn",params,undefined,false); 
			copyArgs(n,"policy",params,undefined,false); 
			
			copyArgs(msg,"componentArn",params,undefined,false); 
			copyArgs(msg,"policy",params,undefined,false); 
			

			svc.putComponentPolicy(params,cb);
		}
		
		service.PutContainerRecipePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"containerRecipeArn",params,undefined,false); 
			copyArgs(n,"policy",params,undefined,false); 
			
			copyArgs(n,"containerRecipeArn",params,undefined,false); 
			copyArgs(n,"policy",params,undefined,false); 
			
			copyArgs(msg,"containerRecipeArn",params,undefined,false); 
			copyArgs(msg,"policy",params,undefined,false); 
			

			svc.putContainerRecipePolicy(params,cb);
		}
		
		service.PutImagePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"imageArn",params,undefined,false); 
			copyArgs(n,"policy",params,undefined,false); 
			
			copyArgs(n,"imageArn",params,undefined,false); 
			copyArgs(n,"policy",params,undefined,false); 
			
			copyArgs(msg,"imageArn",params,undefined,false); 
			copyArgs(msg,"policy",params,undefined,false); 
			

			svc.putImagePolicy(params,cb);
		}
		
		service.PutImageRecipePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"imageRecipeArn",params,undefined,false); 
			copyArgs(n,"policy",params,undefined,false); 
			
			copyArgs(n,"imageRecipeArn",params,undefined,false); 
			copyArgs(n,"policy",params,undefined,false); 
			
			copyArgs(msg,"imageRecipeArn",params,undefined,false); 
			copyArgs(msg,"policy",params,undefined,false); 
			

			svc.putImageRecipePolicy(params,cb);
		}
		
		service.StartImagePipelineExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"imagePipelineArn",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(n,"imagePipelineArn",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"imagePipelineArn",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.startImagePipelineExecution(params,cb);
		}
		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
		
		service.UpdateDistributionConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"distributionConfigurationArn",params,undefined,false); 
			copyArgs(n,"distributions",params,undefined,true); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(n,"distributionConfigurationArn",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"distributions",params,undefined,true); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"distributionConfigurationArn",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"distributions",params,undefined,true); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.updateDistributionConfiguration(params,cb);
		}
		
		service.UpdateImagePipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"imagePipelineArn",params,undefined,false); 
			copyArgs(n,"infrastructureConfigurationArn",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(n,"imagePipelineArn",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"imageRecipeArn",params,undefined,false); 
			copyArgs(n,"containerRecipeArn",params,undefined,false); 
			copyArgs(n,"infrastructureConfigurationArn",params,undefined,false); 
			copyArgs(n,"distributionConfigurationArn",params,undefined,false); 
			copyArgs(n,"imageTestsConfiguration",params,undefined,true); 
			copyArgs(Boolean(n),"enhancedImageMetadataEnabled",params,undefined,false); 
			copyArgs(n,"schedule",params,undefined,true); 
			copyArgs(n,"status",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"imagePipelineArn",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"imageRecipeArn",params,undefined,false); 
			copyArgs(msg,"containerRecipeArn",params,undefined,false); 
			copyArgs(msg,"infrastructureConfigurationArn",params,undefined,false); 
			copyArgs(msg,"distributionConfigurationArn",params,undefined,false); 
			copyArgs(msg,"imageTestsConfiguration",params,undefined,true); 
			copyArgs(msg,"enhancedImageMetadataEnabled",params,undefined,false); 
			copyArgs(msg,"schedule",params,undefined,true); 
			copyArgs(msg,"status",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.updateImagePipeline(params,cb);
		}
		
		service.UpdateInfrastructureConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"infrastructureConfigurationArn",params,undefined,false); 
			copyArgs(n,"instanceProfileName",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(n,"infrastructureConfigurationArn",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"instanceTypes",params,undefined,true); 
			copyArgs(n,"instanceProfileName",params,undefined,false); 
			copyArgs(n,"securityGroupIds",params,undefined,true); 
			copyArgs(n,"subnetId",params,undefined,false); 
			copyArgs(n,"logging",params,undefined,true); 
			copyArgs(n,"keyPair",params,undefined,false); 
			copyArgs(Boolean(n),"terminateInstanceOnFailure",params,undefined,false); 
			copyArgs(n,"snsTopicArn",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"resourceTags",params,undefined,true); 
			
			copyArgs(msg,"infrastructureConfigurationArn",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"instanceTypes",params,undefined,true); 
			copyArgs(msg,"instanceProfileName",params,undefined,false); 
			copyArgs(msg,"securityGroupIds",params,undefined,true); 
			copyArgs(msg,"subnetId",params,undefined,false); 
			copyArgs(msg,"logging",params,undefined,true); 
			copyArgs(msg,"keyPair",params,undefined,false); 
			copyArgs(msg,"terminateInstanceOnFailure",params,undefined,false); 
			copyArgs(msg,"snsTopicArn",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"resourceTags",params,undefined,true); 
			

			svc.updateInfrastructureConfiguration(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS Imagebuilder", AmazonAPINode);

};
