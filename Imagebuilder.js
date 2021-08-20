
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

		var awsService = new AWS.Imagebuilder( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Imagebuilder(msg.AWSConfig) : awsService;

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

		
		service.CancelImageCreation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"imageBuildVersionArn",params,undefined,false); 
			copyArg(n,"clientToken",params,undefined,false); 
			
			copyArg(msg,"imageBuildVersionArn",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.cancelImageCreation(params,cb);
		}

		
		service.CreateComponent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"semanticVersion",params,undefined,false); 
			copyArg(n,"platform",params,undefined,false); 
			copyArg(n,"clientToken",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"semanticVersion",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"changeDescription",params,undefined,false); 
			copyArg(msg,"platform",params,undefined,false); 
			copyArg(msg,"supportedOsVersions",params,undefined,true); 
			copyArg(msg,"data",params,undefined,false); 
			copyArg(msg,"uri",params,undefined,false); 
			copyArg(msg,"kmsKeyId",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.createComponent(params,cb);
		}

		
		service.CreateContainerRecipe=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"containerType",params,undefined,false); 
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"semanticVersion",params,undefined,false); 
			copyArg(n,"components",params,undefined,true); 
			copyArg(n,"parentImage",params,undefined,false); 
			copyArg(n,"targetRepository",params,undefined,true); 
			copyArg(n,"clientToken",params,undefined,false); 
			
			copyArg(msg,"containerType",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"semanticVersion",params,undefined,false); 
			copyArg(msg,"components",params,undefined,true); 
			copyArg(msg,"instanceConfiguration",params,undefined,true); 
			copyArg(msg,"dockerfileTemplateData",params,undefined,false); 
			copyArg(msg,"dockerfileTemplateUri",params,undefined,false); 
			copyArg(msg,"platformOverride",params,undefined,false); 
			copyArg(msg,"imageOsVersionOverride",params,undefined,false); 
			copyArg(msg,"parentImage",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"workingDirectory",params,undefined,false); 
			copyArg(msg,"targetRepository",params,undefined,true); 
			copyArg(msg,"kmsKeyId",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.createContainerRecipe(params,cb);
		}

		
		service.CreateDistributionConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"distributions",params,undefined,true); 
			copyArg(n,"clientToken",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"distributions",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.createDistributionConfiguration(params,cb);
		}

		
		service.CreateImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"infrastructureConfigurationArn",params,undefined,false); 
			copyArg(n,"clientToken",params,undefined,false); 
			
			copyArg(msg,"imageRecipeArn",params,undefined,false); 
			copyArg(msg,"containerRecipeArn",params,undefined,false); 
			copyArg(msg,"distributionConfigurationArn",params,undefined,false); 
			copyArg(msg,"infrastructureConfigurationArn",params,undefined,false); 
			copyArg(msg,"imageTestsConfiguration",params,undefined,true); 
			copyArg(msg,"enhancedImageMetadataEnabled",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.createImage(params,cb);
		}

		
		service.CreateImagePipeline=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"infrastructureConfigurationArn",params,undefined,false); 
			copyArg(n,"clientToken",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"imageRecipeArn",params,undefined,false); 
			copyArg(msg,"containerRecipeArn",params,undefined,false); 
			copyArg(msg,"infrastructureConfigurationArn",params,undefined,false); 
			copyArg(msg,"distributionConfigurationArn",params,undefined,false); 
			copyArg(msg,"imageTestsConfiguration",params,undefined,true); 
			copyArg(msg,"enhancedImageMetadataEnabled",params,undefined,false); 
			copyArg(msg,"schedule",params,undefined,true); 
			copyArg(msg,"status",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.createImagePipeline(params,cb);
		}

		
		service.CreateImageRecipe=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"semanticVersion",params,undefined,false); 
			copyArg(n,"components",params,undefined,true); 
			copyArg(n,"parentImage",params,undefined,false); 
			copyArg(n,"clientToken",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"semanticVersion",params,undefined,false); 
			copyArg(msg,"components",params,undefined,true); 
			copyArg(msg,"parentImage",params,undefined,false); 
			copyArg(msg,"blockDeviceMappings",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"workingDirectory",params,undefined,false); 
			copyArg(msg,"additionalInstanceConfiguration",params,undefined,true); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.createImageRecipe(params,cb);
		}

		
		service.CreateInfrastructureConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"instanceProfileName",params,undefined,false); 
			copyArg(n,"clientToken",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"instanceTypes",params,undefined,true); 
			copyArg(msg,"instanceProfileName",params,undefined,false); 
			copyArg(msg,"securityGroupIds",params,undefined,true); 
			copyArg(msg,"subnetId",params,undefined,false); 
			copyArg(msg,"logging",params,undefined,true); 
			copyArg(msg,"keyPair",params,undefined,false); 
			copyArg(msg,"terminateInstanceOnFailure",params,undefined,false); 
			copyArg(msg,"snsTopicArn",params,undefined,false); 
			copyArg(msg,"resourceTags",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.createInfrastructureConfiguration(params,cb);
		}

		
		service.DeleteComponent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"componentBuildVersionArn",params,undefined,false); 
			
			copyArg(msg,"componentBuildVersionArn",params,undefined,false); 
			

			svc.deleteComponent(params,cb);
		}

		
		service.DeleteContainerRecipe=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"containerRecipeArn",params,undefined,false); 
			
			copyArg(msg,"containerRecipeArn",params,undefined,false); 
			

			svc.deleteContainerRecipe(params,cb);
		}

		
		service.DeleteDistributionConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"distributionConfigurationArn",params,undefined,false); 
			
			copyArg(msg,"distributionConfigurationArn",params,undefined,false); 
			

			svc.deleteDistributionConfiguration(params,cb);
		}

		
		service.DeleteImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"imageBuildVersionArn",params,undefined,false); 
			
			copyArg(msg,"imageBuildVersionArn",params,undefined,false); 
			

			svc.deleteImage(params,cb);
		}

		
		service.DeleteImagePipeline=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"imagePipelineArn",params,undefined,false); 
			
			copyArg(msg,"imagePipelineArn",params,undefined,false); 
			

			svc.deleteImagePipeline(params,cb);
		}

		
		service.DeleteImageRecipe=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"imageRecipeArn",params,undefined,false); 
			
			copyArg(msg,"imageRecipeArn",params,undefined,false); 
			

			svc.deleteImageRecipe(params,cb);
		}

		
		service.DeleteInfrastructureConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"infrastructureConfigurationArn",params,undefined,false); 
			
			copyArg(msg,"infrastructureConfigurationArn",params,undefined,false); 
			

			svc.deleteInfrastructureConfiguration(params,cb);
		}

		
		service.GetComponent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"componentBuildVersionArn",params,undefined,false); 
			
			copyArg(msg,"componentBuildVersionArn",params,undefined,false); 
			

			svc.getComponent(params,cb);
		}

		
		service.GetComponentPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"componentArn",params,undefined,false); 
			
			copyArg(msg,"componentArn",params,undefined,false); 
			

			svc.getComponentPolicy(params,cb);
		}

		
		service.GetContainerRecipe=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"containerRecipeArn",params,undefined,false); 
			
			copyArg(msg,"containerRecipeArn",params,undefined,false); 
			

			svc.getContainerRecipe(params,cb);
		}

		
		service.GetContainerRecipePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"containerRecipeArn",params,undefined,false); 
			
			copyArg(msg,"containerRecipeArn",params,undefined,false); 
			

			svc.getContainerRecipePolicy(params,cb);
		}

		
		service.GetDistributionConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"distributionConfigurationArn",params,undefined,false); 
			
			copyArg(msg,"distributionConfigurationArn",params,undefined,false); 
			

			svc.getDistributionConfiguration(params,cb);
		}

		
		service.GetImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"imageBuildVersionArn",params,undefined,false); 
			
			copyArg(msg,"imageBuildVersionArn",params,undefined,false); 
			

			svc.getImage(params,cb);
		}

		
		service.GetImagePipeline=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"imagePipelineArn",params,undefined,false); 
			
			copyArg(msg,"imagePipelineArn",params,undefined,false); 
			

			svc.getImagePipeline(params,cb);
		}

		
		service.GetImagePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"imageArn",params,undefined,false); 
			
			copyArg(msg,"imageArn",params,undefined,false); 
			

			svc.getImagePolicy(params,cb);
		}

		
		service.GetImageRecipe=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"imageRecipeArn",params,undefined,false); 
			
			copyArg(msg,"imageRecipeArn",params,undefined,false); 
			

			svc.getImageRecipe(params,cb);
		}

		
		service.GetImageRecipePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"imageRecipeArn",params,undefined,false); 
			
			copyArg(msg,"imageRecipeArn",params,undefined,false); 
			

			svc.getImageRecipePolicy(params,cb);
		}

		
		service.GetInfrastructureConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"infrastructureConfigurationArn",params,undefined,false); 
			
			copyArg(msg,"infrastructureConfigurationArn",params,undefined,false); 
			

			svc.getInfrastructureConfiguration(params,cb);
		}

		
		service.ImportComponent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"semanticVersion",params,undefined,false); 
			copyArg(n,"_type",params,"type",false); 
			copyArg(n,"format",params,undefined,false); 
			copyArg(n,"platform",params,undefined,false); 
			copyArg(n,"clientToken",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"semanticVersion",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"changeDescription",params,undefined,false); 
			copyArg(msg,"type",params,undefined,false); 
			copyArg(msg,"format",params,undefined,false); 
			copyArg(msg,"platform",params,undefined,false); 
			copyArg(msg,"data",params,undefined,false); 
			copyArg(msg,"uri",params,undefined,false); 
			copyArg(msg,"kmsKeyId",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.importComponent(params,cb);
		}

		
		service.ListComponentBuildVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"componentVersionArn",params,undefined,false); 
			
			copyArg(msg,"componentVersionArn",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listComponentBuildVersions(params,cb);
		}

		
		service.ListComponents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"owner",params,undefined,false); 
			copyArg(msg,"filters",params,undefined,true); 
			copyArg(msg,"byName",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listComponents(params,cb);
		}

		
		service.ListContainerRecipes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"owner",params,undefined,false); 
			copyArg(msg,"filters",params,undefined,true); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listContainerRecipes(params,cb);
		}

		
		service.ListDistributionConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"filters",params,undefined,true); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listDistributionConfigurations(params,cb);
		}

		
		service.ListImageBuildVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"imageVersionArn",params,undefined,false); 
			
			copyArg(msg,"imageVersionArn",params,undefined,false); 
			copyArg(msg,"filters",params,undefined,true); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listImageBuildVersions(params,cb);
		}

		
		service.ListImagePackages=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"imageBuildVersionArn",params,undefined,false); 
			
			copyArg(msg,"imageBuildVersionArn",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listImagePackages(params,cb);
		}

		
		service.ListImagePipelineImages=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"imagePipelineArn",params,undefined,false); 
			
			copyArg(msg,"imagePipelineArn",params,undefined,false); 
			copyArg(msg,"filters",params,undefined,true); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listImagePipelineImages(params,cb);
		}

		
		service.ListImagePipelines=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"filters",params,undefined,true); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listImagePipelines(params,cb);
		}

		
		service.ListImageRecipes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"owner",params,undefined,false); 
			copyArg(msg,"filters",params,undefined,true); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listImageRecipes(params,cb);
		}

		
		service.ListImages=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"owner",params,undefined,false); 
			copyArg(msg,"filters",params,undefined,true); 
			copyArg(msg,"byName",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"includeDeprecated",params,undefined,false); 
			

			svc.listImages(params,cb);
		}

		
		service.ListInfrastructureConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"filters",params,undefined,true); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listInfrastructureConfigurations(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutComponentPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"componentArn",params,undefined,false); 
			copyArg(n,"policy",params,undefined,false); 
			
			copyArg(msg,"componentArn",params,undefined,false); 
			copyArg(msg,"policy",params,undefined,false); 
			

			svc.putComponentPolicy(params,cb);
		}

		
		service.PutContainerRecipePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"containerRecipeArn",params,undefined,false); 
			copyArg(n,"policy",params,undefined,false); 
			
			copyArg(msg,"containerRecipeArn",params,undefined,false); 
			copyArg(msg,"policy",params,undefined,false); 
			

			svc.putContainerRecipePolicy(params,cb);
		}

		
		service.PutImagePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"imageArn",params,undefined,false); 
			copyArg(n,"policy",params,undefined,false); 
			
			copyArg(msg,"imageArn",params,undefined,false); 
			copyArg(msg,"policy",params,undefined,false); 
			

			svc.putImagePolicy(params,cb);
		}

		
		service.PutImageRecipePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"imageRecipeArn",params,undefined,false); 
			copyArg(n,"policy",params,undefined,false); 
			
			copyArg(msg,"imageRecipeArn",params,undefined,false); 
			copyArg(msg,"policy",params,undefined,false); 
			

			svc.putImageRecipePolicy(params,cb);
		}

		
		service.StartImagePipelineExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"imagePipelineArn",params,undefined,false); 
			copyArg(n,"clientToken",params,undefined,false); 
			
			copyArg(msg,"imagePipelineArn",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.startImagePipelineExecution(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"tags",params,undefined,true); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"tagKeys",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateDistributionConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"distributionConfigurationArn",params,undefined,false); 
			copyArg(n,"distributions",params,undefined,true); 
			copyArg(n,"clientToken",params,undefined,false); 
			
			copyArg(msg,"distributionConfigurationArn",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"distributions",params,undefined,true); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.updateDistributionConfiguration(params,cb);
		}

		
		service.UpdateImagePipeline=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"imagePipelineArn",params,undefined,false); 
			copyArg(n,"infrastructureConfigurationArn",params,undefined,false); 
			copyArg(n,"clientToken",params,undefined,false); 
			
			copyArg(msg,"imagePipelineArn",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"imageRecipeArn",params,undefined,false); 
			copyArg(msg,"containerRecipeArn",params,undefined,false); 
			copyArg(msg,"infrastructureConfigurationArn",params,undefined,false); 
			copyArg(msg,"distributionConfigurationArn",params,undefined,false); 
			copyArg(msg,"imageTestsConfiguration",params,undefined,true); 
			copyArg(msg,"enhancedImageMetadataEnabled",params,undefined,false); 
			copyArg(msg,"schedule",params,undefined,true); 
			copyArg(msg,"status",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.updateImagePipeline(params,cb);
		}

		
		service.UpdateInfrastructureConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"infrastructureConfigurationArn",params,undefined,false); 
			copyArg(n,"instanceProfileName",params,undefined,false); 
			copyArg(n,"clientToken",params,undefined,false); 
			
			copyArg(msg,"infrastructureConfigurationArn",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"instanceTypes",params,undefined,true); 
			copyArg(msg,"instanceProfileName",params,undefined,false); 
			copyArg(msg,"securityGroupIds",params,undefined,true); 
			copyArg(msg,"subnetId",params,undefined,false); 
			copyArg(msg,"logging",params,undefined,true); 
			copyArg(msg,"keyPair",params,undefined,false); 
			copyArg(msg,"terminateInstanceOnFailure",params,undefined,false); 
			copyArg(msg,"snsTopicArn",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"resourceTags",params,undefined,true); 
			

			svc.updateInfrastructureConfiguration(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Imagebuilder", AmazonAPINode);

};
