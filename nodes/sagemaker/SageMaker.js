
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

		var awsService = new AWS.SageMaker( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.SageMaker(msg.AWSConfig) : awsService;

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
		
			service.AddAssociation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceArn",params,undefined,false); 
			copyArgs(n,"DestinationArn",params,undefined,false); 
			
			copyArgs(n,"SourceArn",params,undefined,false); 
			copyArgs(n,"DestinationArn",params,undefined,false); 
			copyArgs(n,"AssociationType",params,undefined,false); 
			
			copyArgs(msg,"SourceArn",params,undefined,false); 
			copyArgs(msg,"DestinationArn",params,undefined,false); 
			copyArgs(msg,"AssociationType",params,undefined,false); 
			

			svc.addAssociation(params,cb);
		}
			service.AddTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.addTags(params,cb);
		}
			service.AssociateTrialComponent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrialComponentName",params,undefined,false); 
			copyArgs(n,"TrialName",params,undefined,false); 
			
			copyArgs(n,"TrialComponentName",params,undefined,false); 
			copyArgs(n,"TrialName",params,undefined,false); 
			
			copyArgs(msg,"TrialComponentName",params,undefined,false); 
			copyArgs(msg,"TrialName",params,undefined,false); 
			

			svc.associateTrialComponent(params,cb);
		}
			service.CreateAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ActionName",params,undefined,false); 
			copyArgs(n,"Source",params,undefined,true); 
			copyArgs(n,"ActionType",params,undefined,false); 
			
			copyArgs(n,"ActionName",params,undefined,false); 
			copyArgs(n,"Source",params,undefined,true); 
			copyArgs(n,"ActionType",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			copyArgs(n,"Properties",params,undefined,true); 
			copyArgs(n,"MetadataProperties",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ActionName",params,undefined,false); 
			copyArgs(msg,"Source",params,undefined,true); 
			copyArgs(msg,"ActionType",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			copyArgs(msg,"Properties",params,undefined,true); 
			copyArgs(msg,"MetadataProperties",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createAction(params,cb);
		}
			service.CreateAlgorithm=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AlgorithmName",params,undefined,false); 
			copyArgs(n,"TrainingSpecification",params,undefined,true); 
			
			copyArgs(n,"AlgorithmName",params,undefined,false); 
			copyArgs(n,"AlgorithmDescription",params,undefined,false); 
			copyArgs(n,"TrainingSpecification",params,undefined,true); 
			copyArgs(n,"InferenceSpecification",params,undefined,true); 
			copyArgs(n,"ValidationSpecification",params,undefined,true); 
			copyArgs(Boolean(n),"CertifyForMarketplace",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"AlgorithmName",params,undefined,false); 
			copyArgs(msg,"AlgorithmDescription",params,undefined,false); 
			copyArgs(msg,"TrainingSpecification",params,undefined,true); 
			copyArgs(msg,"InferenceSpecification",params,undefined,true); 
			copyArgs(msg,"ValidationSpecification",params,undefined,true); 
			copyArgs(msg,"CertifyForMarketplace",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createAlgorithm(params,cb);
		}
			service.CreateApp=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainId",params,undefined,false); 
			copyArgs(n,"UserProfileName",params,undefined,false); 
			copyArgs(n,"AppType",params,undefined,false); 
			copyArgs(n,"AppName",params,undefined,false); 
			
			copyArgs(n,"DomainId",params,undefined,false); 
			copyArgs(n,"UserProfileName",params,undefined,false); 
			copyArgs(n,"AppType",params,undefined,false); 
			copyArgs(n,"AppName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"ResourceSpec",params,undefined,true); 
			
			copyArgs(msg,"DomainId",params,undefined,false); 
			copyArgs(msg,"UserProfileName",params,undefined,false); 
			copyArgs(msg,"AppType",params,undefined,false); 
			copyArgs(msg,"AppName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"ResourceSpec",params,undefined,true); 
			

			svc.createApp(params,cb);
		}
			service.CreateAppImageConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppImageConfigName",params,undefined,false); 
			
			copyArgs(n,"AppImageConfigName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"KernelGatewayImageConfig",params,undefined,true); 
			
			copyArgs(msg,"AppImageConfigName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"KernelGatewayImageConfig",params,undefined,true); 
			

			svc.createAppImageConfig(params,cb);
		}
			service.CreateArtifact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Source",params,undefined,true); 
			copyArgs(n,"ArtifactType",params,undefined,false); 
			
			copyArgs(n,"ArtifactName",params,undefined,false); 
			copyArgs(n,"Source",params,undefined,true); 
			copyArgs(n,"ArtifactType",params,undefined,false); 
			copyArgs(n,"Properties",params,undefined,true); 
			copyArgs(n,"MetadataProperties",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ArtifactName",params,undefined,false); 
			copyArgs(msg,"Source",params,undefined,true); 
			copyArgs(msg,"ArtifactType",params,undefined,false); 
			copyArgs(msg,"Properties",params,undefined,true); 
			copyArgs(msg,"MetadataProperties",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createArtifact(params,cb);
		}
			service.CreateAutoMLJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoMLJobName",params,undefined,false); 
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"AutoMLJobName",params,undefined,false); 
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"ProblemType",params,undefined,false); 
			copyArgs(n,"AutoMLJobObjective",params,undefined,true); 
			copyArgs(n,"AutoMLJobConfig",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(Boolean(n),"GenerateCandidateDefinitionsOnly",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"ModelDeployConfig",params,undefined,true); 
			
			copyArgs(msg,"AutoMLJobName",params,undefined,false); 
			copyArgs(msg,"InputDataConfig",params,undefined,true); 
			copyArgs(msg,"OutputDataConfig",params,undefined,true); 
			copyArgs(msg,"ProblemType",params,undefined,false); 
			copyArgs(msg,"AutoMLJobObjective",params,undefined,true); 
			copyArgs(msg,"AutoMLJobConfig",params,undefined,true); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"GenerateCandidateDefinitionsOnly",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"ModelDeployConfig",params,undefined,true); 
			

			svc.createAutoMLJob(params,cb);
		}
			service.CreateCodeRepository=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CodeRepositoryName",params,undefined,false); 
			copyArgs(n,"GitConfig",params,undefined,true); 
			
			copyArgs(n,"CodeRepositoryName",params,undefined,false); 
			copyArgs(n,"GitConfig",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"CodeRepositoryName",params,undefined,false); 
			copyArgs(msg,"GitConfig",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createCodeRepository(params,cb);
		}
			service.CreateCompilationJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CompilationJobName",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"InputConfig",params,undefined,true); 
			copyArgs(n,"OutputConfig",params,undefined,true); 
			copyArgs(n,"StoppingCondition",params,undefined,true); 
			
			copyArgs(n,"CompilationJobName",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"InputConfig",params,undefined,true); 
			copyArgs(n,"OutputConfig",params,undefined,true); 
			copyArgs(n,"VpcConfig",params,undefined,true); 
			copyArgs(n,"StoppingCondition",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"CompilationJobName",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"InputConfig",params,undefined,true); 
			copyArgs(msg,"OutputConfig",params,undefined,true); 
			copyArgs(msg,"VpcConfig",params,undefined,true); 
			copyArgs(msg,"StoppingCondition",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createCompilationJob(params,cb);
		}
			service.CreateContext=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContextName",params,undefined,false); 
			copyArgs(n,"Source",params,undefined,true); 
			copyArgs(n,"ContextType",params,undefined,false); 
			
			copyArgs(n,"ContextName",params,undefined,false); 
			copyArgs(n,"Source",params,undefined,true); 
			copyArgs(n,"ContextType",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Properties",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ContextName",params,undefined,false); 
			copyArgs(msg,"Source",params,undefined,true); 
			copyArgs(msg,"ContextType",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Properties",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createContext(params,cb);
		}
			service.CreateDataQualityJobDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobDefinitionName",params,undefined,false); 
			copyArgs(n,"DataQualityAppSpecification",params,undefined,true); 
			copyArgs(n,"DataQualityJobInput",params,undefined,true); 
			copyArgs(n,"DataQualityJobOutputConfig",params,undefined,true); 
			copyArgs(n,"JobResources",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"JobDefinitionName",params,undefined,false); 
			copyArgs(n,"DataQualityBaselineConfig",params,undefined,true); 
			copyArgs(n,"DataQualityAppSpecification",params,undefined,true); 
			copyArgs(n,"DataQualityJobInput",params,undefined,true); 
			copyArgs(n,"DataQualityJobOutputConfig",params,undefined,true); 
			copyArgs(n,"JobResources",params,undefined,true); 
			copyArgs(n,"NetworkConfig",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"StoppingCondition",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"JobDefinitionName",params,undefined,false); 
			copyArgs(msg,"DataQualityBaselineConfig",params,undefined,true); 
			copyArgs(msg,"DataQualityAppSpecification",params,undefined,true); 
			copyArgs(msg,"DataQualityJobInput",params,undefined,true); 
			copyArgs(msg,"DataQualityJobOutputConfig",params,undefined,true); 
			copyArgs(msg,"JobResources",params,undefined,true); 
			copyArgs(msg,"NetworkConfig",params,undefined,true); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"StoppingCondition",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createDataQualityJobDefinition(params,cb);
		}
			service.CreateDeviceFleet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeviceFleetName",params,undefined,false); 
			copyArgs(n,"OutputConfig",params,undefined,true); 
			
			copyArgs(n,"DeviceFleetName",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"OutputConfig",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(Boolean(n),"EnableIotRoleAlias",params,undefined,false); 
			
			copyArgs(msg,"DeviceFleetName",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"OutputConfig",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"EnableIotRoleAlias",params,undefined,false); 
			

			svc.createDeviceFleet(params,cb);
		}
			service.CreateDomain=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"AuthMode",params,undefined,false); 
			copyArgs(n,"DefaultUserSettings",params,undefined,true); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			copyArgs(n,"VpcId",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"AuthMode",params,undefined,false); 
			copyArgs(n,"DefaultUserSettings",params,undefined,true); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"AppNetworkAccessType",params,undefined,false); 
			copyArgs(n,"HomeEfsFileSystemKmsKeyId",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"AuthMode",params,undefined,false); 
			copyArgs(msg,"DefaultUserSettings",params,undefined,true); 
			copyArgs(msg,"SubnetIds",params,undefined,true); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"AppNetworkAccessType",params,undefined,false); 
			copyArgs(msg,"HomeEfsFileSystemKmsKeyId",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			

			svc.createDomain(params,cb);
		}
			service.CreateEdgePackagingJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EdgePackagingJobName",params,undefined,false); 
			copyArgs(n,"CompilationJobName",params,undefined,false); 
			copyArgs(n,"ModelName",params,undefined,false); 
			copyArgs(n,"ModelVersion",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"OutputConfig",params,undefined,true); 
			
			copyArgs(n,"EdgePackagingJobName",params,undefined,false); 
			copyArgs(n,"CompilationJobName",params,undefined,false); 
			copyArgs(n,"ModelName",params,undefined,false); 
			copyArgs(n,"ModelVersion",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"OutputConfig",params,undefined,true); 
			copyArgs(n,"ResourceKey",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"EdgePackagingJobName",params,undefined,false); 
			copyArgs(msg,"CompilationJobName",params,undefined,false); 
			copyArgs(msg,"ModelName",params,undefined,false); 
			copyArgs(msg,"ModelVersion",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"OutputConfig",params,undefined,true); 
			copyArgs(msg,"ResourceKey",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createEdgePackagingJob(params,cb);
		}
			service.CreateEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			copyArgs(n,"EndpointConfigName",params,undefined,false); 
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			copyArgs(n,"EndpointConfigName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"EndpointName",params,undefined,false); 
			copyArgs(msg,"EndpointConfigName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createEndpoint(params,cb);
		}
			service.CreateEndpointConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointConfigName",params,undefined,false); 
			copyArgs(n,"ProductionVariants",params,undefined,true); 
			
			copyArgs(n,"EndpointConfigName",params,undefined,false); 
			copyArgs(n,"ProductionVariants",params,undefined,true); 
			copyArgs(n,"DataCaptureConfig",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"AsyncInferenceConfig",params,undefined,true); 
			
			copyArgs(msg,"EndpointConfigName",params,undefined,false); 
			copyArgs(msg,"ProductionVariants",params,undefined,true); 
			copyArgs(msg,"DataCaptureConfig",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"AsyncInferenceConfig",params,undefined,true); 
			

			svc.createEndpointConfig(params,cb);
		}
			service.CreateExperiment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ExperimentName",params,undefined,false); 
			
			copyArgs(n,"ExperimentName",params,undefined,false); 
			copyArgs(n,"DisplayName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ExperimentName",params,undefined,false); 
			copyArgs(msg,"DisplayName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createExperiment(params,cb);
		}
			service.CreateFeatureGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FeatureGroupName",params,undefined,false); 
			copyArgs(n,"RecordIdentifierFeatureName",params,undefined,false); 
			copyArgs(n,"EventTimeFeatureName",params,undefined,false); 
			copyArgs(n,"FeatureDefinitions",params,undefined,true); 
			
			copyArgs(n,"FeatureGroupName",params,undefined,false); 
			copyArgs(n,"RecordIdentifierFeatureName",params,undefined,false); 
			copyArgs(n,"EventTimeFeatureName",params,undefined,false); 
			copyArgs(n,"FeatureDefinitions",params,undefined,true); 
			copyArgs(n,"OnlineStoreConfig",params,undefined,true); 
			copyArgs(n,"OfflineStoreConfig",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"FeatureGroupName",params,undefined,false); 
			copyArgs(msg,"RecordIdentifierFeatureName",params,undefined,false); 
			copyArgs(msg,"EventTimeFeatureName",params,undefined,false); 
			copyArgs(msg,"FeatureDefinitions",params,undefined,true); 
			copyArgs(msg,"OnlineStoreConfig",params,undefined,true); 
			copyArgs(msg,"OfflineStoreConfig",params,undefined,true); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createFeatureGroup(params,cb);
		}
			service.CreateFlowDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FlowDefinitionName",params,undefined,false); 
			copyArgs(n,"HumanLoopConfig",params,undefined,true); 
			copyArgs(n,"OutputConfig",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"FlowDefinitionName",params,undefined,false); 
			copyArgs(n,"HumanLoopRequestSource",params,undefined,true); 
			copyArgs(n,"HumanLoopActivationConfig",params,undefined,true); 
			copyArgs(n,"HumanLoopConfig",params,undefined,true); 
			copyArgs(n,"OutputConfig",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"FlowDefinitionName",params,undefined,false); 
			copyArgs(msg,"HumanLoopRequestSource",params,undefined,true); 
			copyArgs(msg,"HumanLoopActivationConfig",params,undefined,true); 
			copyArgs(msg,"HumanLoopConfig",params,undefined,true); 
			copyArgs(msg,"OutputConfig",params,undefined,true); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createFlowDefinition(params,cb);
		}
			service.CreateHumanTaskUi=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HumanTaskUiName",params,undefined,false); 
			copyArgs(n,"UiTemplate",params,undefined,true); 
			
			copyArgs(n,"HumanTaskUiName",params,undefined,false); 
			copyArgs(n,"UiTemplate",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"HumanTaskUiName",params,undefined,false); 
			copyArgs(msg,"UiTemplate",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createHumanTaskUi(params,cb);
		}
			service.CreateHyperParameterTuningJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HyperParameterTuningJobName",params,undefined,false); 
			copyArgs(n,"HyperParameterTuningJobConfig",params,undefined,true); 
			
			copyArgs(n,"HyperParameterTuningJobName",params,undefined,false); 
			copyArgs(n,"HyperParameterTuningJobConfig",params,undefined,true); 
			copyArgs(n,"TrainingJobDefinition",params,undefined,true); 
			copyArgs(n,"TrainingJobDefinitions",params,undefined,true); 
			copyArgs(n,"WarmStartConfig",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"HyperParameterTuningJobName",params,undefined,false); 
			copyArgs(msg,"HyperParameterTuningJobConfig",params,undefined,true); 
			copyArgs(msg,"TrainingJobDefinition",params,undefined,true); 
			copyArgs(msg,"TrainingJobDefinitions",params,undefined,true); 
			copyArgs(msg,"WarmStartConfig",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createHyperParameterTuningJob(params,cb);
		}
			service.CreateImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ImageName",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"DisplayName",params,undefined,false); 
			copyArgs(n,"ImageName",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DisplayName",params,undefined,false); 
			copyArgs(msg,"ImageName",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createImage(params,cb);
		}
			service.CreateImageVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BaseImage",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"ImageName",params,undefined,false); 
			
			copyArgs(n,"BaseImage",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"ImageName",params,undefined,false); 
			
			copyArgs(msg,"BaseImage",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"ImageName",params,undefined,false); 
			

			svc.createImageVersion(params,cb);
		}
			service.CreateLabelingJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LabelingJobName",params,undefined,false); 
			copyArgs(n,"LabelAttributeName",params,undefined,false); 
			copyArgs(n,"InputConfig",params,undefined,true); 
			copyArgs(n,"OutputConfig",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"HumanTaskConfig",params,undefined,true); 
			
			copyArgs(n,"LabelingJobName",params,undefined,false); 
			copyArgs(n,"LabelAttributeName",params,undefined,false); 
			copyArgs(n,"InputConfig",params,undefined,true); 
			copyArgs(n,"OutputConfig",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"LabelCategoryConfigS3Uri",params,undefined,false); 
			copyArgs(n,"StoppingConditions",params,undefined,true); 
			copyArgs(n,"LabelingJobAlgorithmsConfig",params,undefined,true); 
			copyArgs(n,"HumanTaskConfig",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"LabelingJobName",params,undefined,false); 
			copyArgs(msg,"LabelAttributeName",params,undefined,false); 
			copyArgs(msg,"InputConfig",params,undefined,true); 
			copyArgs(msg,"OutputConfig",params,undefined,true); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"LabelCategoryConfigS3Uri",params,undefined,false); 
			copyArgs(msg,"StoppingConditions",params,undefined,true); 
			copyArgs(msg,"LabelingJobAlgorithmsConfig",params,undefined,true); 
			copyArgs(msg,"HumanTaskConfig",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createLabelingJob(params,cb);
		}
			service.CreateModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ModelName",params,undefined,false); 
			copyArgs(n,"ExecutionRoleArn",params,undefined,false); 
			
			copyArgs(n,"ModelName",params,undefined,false); 
			copyArgs(n,"PrimaryContainer",params,undefined,true); 
			copyArgs(n,"Containers",params,undefined,true); 
			copyArgs(n,"InferenceExecutionConfig",params,undefined,true); 
			copyArgs(n,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"VpcConfig",params,undefined,true); 
			copyArgs(Boolean(n),"EnableNetworkIsolation",params,undefined,false); 
			
			copyArgs(msg,"ModelName",params,undefined,false); 
			copyArgs(msg,"PrimaryContainer",params,undefined,true); 
			copyArgs(msg,"Containers",params,undefined,true); 
			copyArgs(msg,"InferenceExecutionConfig",params,undefined,true); 
			copyArgs(msg,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"VpcConfig",params,undefined,true); 
			copyArgs(msg,"EnableNetworkIsolation",params,undefined,false); 
			

			svc.createModel(params,cb);
		}
			service.CreateModelBiasJobDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobDefinitionName",params,undefined,false); 
			copyArgs(n,"ModelBiasAppSpecification",params,undefined,true); 
			copyArgs(n,"ModelBiasJobInput",params,undefined,true); 
			copyArgs(n,"ModelBiasJobOutputConfig",params,undefined,true); 
			copyArgs(n,"JobResources",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"JobDefinitionName",params,undefined,false); 
			copyArgs(n,"ModelBiasBaselineConfig",params,undefined,true); 
			copyArgs(n,"ModelBiasAppSpecification",params,undefined,true); 
			copyArgs(n,"ModelBiasJobInput",params,undefined,true); 
			copyArgs(n,"ModelBiasJobOutputConfig",params,undefined,true); 
			copyArgs(n,"JobResources",params,undefined,true); 
			copyArgs(n,"NetworkConfig",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"StoppingCondition",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"JobDefinitionName",params,undefined,false); 
			copyArgs(msg,"ModelBiasBaselineConfig",params,undefined,true); 
			copyArgs(msg,"ModelBiasAppSpecification",params,undefined,true); 
			copyArgs(msg,"ModelBiasJobInput",params,undefined,true); 
			copyArgs(msg,"ModelBiasJobOutputConfig",params,undefined,true); 
			copyArgs(msg,"JobResources",params,undefined,true); 
			copyArgs(msg,"NetworkConfig",params,undefined,true); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"StoppingCondition",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createModelBiasJobDefinition(params,cb);
		}
			service.CreateModelExplainabilityJobDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobDefinitionName",params,undefined,false); 
			copyArgs(n,"ModelExplainabilityAppSpecification",params,undefined,true); 
			copyArgs(n,"ModelExplainabilityJobInput",params,undefined,true); 
			copyArgs(n,"ModelExplainabilityJobOutputConfig",params,undefined,true); 
			copyArgs(n,"JobResources",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"JobDefinitionName",params,undefined,false); 
			copyArgs(n,"ModelExplainabilityBaselineConfig",params,undefined,true); 
			copyArgs(n,"ModelExplainabilityAppSpecification",params,undefined,true); 
			copyArgs(n,"ModelExplainabilityJobInput",params,undefined,true); 
			copyArgs(n,"ModelExplainabilityJobOutputConfig",params,undefined,true); 
			copyArgs(n,"JobResources",params,undefined,true); 
			copyArgs(n,"NetworkConfig",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"StoppingCondition",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"JobDefinitionName",params,undefined,false); 
			copyArgs(msg,"ModelExplainabilityBaselineConfig",params,undefined,true); 
			copyArgs(msg,"ModelExplainabilityAppSpecification",params,undefined,true); 
			copyArgs(msg,"ModelExplainabilityJobInput",params,undefined,true); 
			copyArgs(msg,"ModelExplainabilityJobOutputConfig",params,undefined,true); 
			copyArgs(msg,"JobResources",params,undefined,true); 
			copyArgs(msg,"NetworkConfig",params,undefined,true); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"StoppingCondition",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createModelExplainabilityJobDefinition(params,cb);
		}
			service.CreateModelPackage=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ModelPackageName",params,undefined,false); 
			copyArgs(n,"ModelPackageGroupName",params,undefined,false); 
			copyArgs(n,"ModelPackageDescription",params,undefined,false); 
			copyArgs(n,"InferenceSpecification",params,undefined,true); 
			copyArgs(n,"ValidationSpecification",params,undefined,true); 
			copyArgs(n,"SourceAlgorithmSpecification",params,undefined,true); 
			copyArgs(Boolean(n),"CertifyForMarketplace",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"ModelApprovalStatus",params,undefined,false); 
			copyArgs(n,"MetadataProperties",params,undefined,true); 
			copyArgs(n,"ModelMetrics",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"ModelPackageName",params,undefined,false); 
			copyArgs(msg,"ModelPackageGroupName",params,undefined,false); 
			copyArgs(msg,"ModelPackageDescription",params,undefined,false); 
			copyArgs(msg,"InferenceSpecification",params,undefined,true); 
			copyArgs(msg,"ValidationSpecification",params,undefined,true); 
			copyArgs(msg,"SourceAlgorithmSpecification",params,undefined,true); 
			copyArgs(msg,"CertifyForMarketplace",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"ModelApprovalStatus",params,undefined,false); 
			copyArgs(msg,"MetadataProperties",params,undefined,true); 
			copyArgs(msg,"ModelMetrics",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.createModelPackage(params,cb);
		}
			service.CreateModelPackageGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ModelPackageGroupName",params,undefined,false); 
			
			copyArgs(n,"ModelPackageGroupName",params,undefined,false); 
			copyArgs(n,"ModelPackageGroupDescription",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ModelPackageGroupName",params,undefined,false); 
			copyArgs(msg,"ModelPackageGroupDescription",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createModelPackageGroup(params,cb);
		}
			service.CreateModelQualityJobDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobDefinitionName",params,undefined,false); 
			copyArgs(n,"ModelQualityAppSpecification",params,undefined,true); 
			copyArgs(n,"ModelQualityJobInput",params,undefined,true); 
			copyArgs(n,"ModelQualityJobOutputConfig",params,undefined,true); 
			copyArgs(n,"JobResources",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"JobDefinitionName",params,undefined,false); 
			copyArgs(n,"ModelQualityBaselineConfig",params,undefined,true); 
			copyArgs(n,"ModelQualityAppSpecification",params,undefined,true); 
			copyArgs(n,"ModelQualityJobInput",params,undefined,true); 
			copyArgs(n,"ModelQualityJobOutputConfig",params,undefined,true); 
			copyArgs(n,"JobResources",params,undefined,true); 
			copyArgs(n,"NetworkConfig",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"StoppingCondition",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"JobDefinitionName",params,undefined,false); 
			copyArgs(msg,"ModelQualityBaselineConfig",params,undefined,true); 
			copyArgs(msg,"ModelQualityAppSpecification",params,undefined,true); 
			copyArgs(msg,"ModelQualityJobInput",params,undefined,true); 
			copyArgs(msg,"ModelQualityJobOutputConfig",params,undefined,true); 
			copyArgs(msg,"JobResources",params,undefined,true); 
			copyArgs(msg,"NetworkConfig",params,undefined,true); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"StoppingCondition",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createModelQualityJobDefinition(params,cb);
		}
			service.CreateMonitoringSchedule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MonitoringScheduleName",params,undefined,false); 
			copyArgs(n,"MonitoringScheduleConfig",params,undefined,true); 
			
			copyArgs(n,"MonitoringScheduleName",params,undefined,false); 
			copyArgs(n,"MonitoringScheduleConfig",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"MonitoringScheduleName",params,undefined,false); 
			copyArgs(msg,"MonitoringScheduleConfig",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createMonitoringSchedule(params,cb);
		}
			service.CreateNotebookInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NotebookInstanceName",params,undefined,false); 
			copyArgs(n,"InstanceType",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"NotebookInstanceName",params,undefined,false); 
			copyArgs(n,"InstanceType",params,undefined,false); 
			copyArgs(n,"SubnetId",params,undefined,false); 
			copyArgs(n,"SecurityGroupIds",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"LifecycleConfigName",params,undefined,false); 
			copyArgs(n,"DirectInternetAccess",params,undefined,false); 
			copyArgs(Number(n),"VolumeSizeInGB",params,undefined,false); 
			copyArgs(n,"AcceleratorTypes",params,undefined,true); 
			copyArgs(n,"DefaultCodeRepository",params,undefined,false); 
			copyArgs(n,"AdditionalCodeRepositories",params,undefined,true); 
			copyArgs(n,"RootAccess",params,undefined,false); 
			copyArgs(n,"PlatformIdentifier",params,undefined,false); 
			
			copyArgs(msg,"NotebookInstanceName",params,undefined,false); 
			copyArgs(msg,"InstanceType",params,undefined,false); 
			copyArgs(msg,"SubnetId",params,undefined,false); 
			copyArgs(msg,"SecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"LifecycleConfigName",params,undefined,false); 
			copyArgs(msg,"DirectInternetAccess",params,undefined,false); 
			copyArgs(msg,"VolumeSizeInGB",params,undefined,false); 
			copyArgs(msg,"AcceleratorTypes",params,undefined,true); 
			copyArgs(msg,"DefaultCodeRepository",params,undefined,false); 
			copyArgs(msg,"AdditionalCodeRepositories",params,undefined,true); 
			copyArgs(msg,"RootAccess",params,undefined,false); 
			copyArgs(msg,"PlatformIdentifier",params,undefined,false); 
			

			svc.createNotebookInstance(params,cb);
		}
			service.CreateNotebookInstanceLifecycleConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NotebookInstanceLifecycleConfigName",params,undefined,false); 
			
			copyArgs(n,"NotebookInstanceLifecycleConfigName",params,undefined,false); 
			copyArgs(n,"OnCreate",params,undefined,true); 
			copyArgs(n,"OnStart",params,undefined,true); 
			
			copyArgs(msg,"NotebookInstanceLifecycleConfigName",params,undefined,false); 
			copyArgs(msg,"OnCreate",params,undefined,true); 
			copyArgs(msg,"OnStart",params,undefined,true); 
			

			svc.createNotebookInstanceLifecycleConfig(params,cb);
		}
			service.CreatePipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PipelineName",params,undefined,false); 
			copyArgs(n,"PipelineDefinition",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"PipelineName",params,undefined,false); 
			copyArgs(n,"PipelineDisplayName",params,undefined,false); 
			copyArgs(n,"PipelineDefinition",params,undefined,false); 
			copyArgs(n,"PipelineDescription",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"PipelineName",params,undefined,false); 
			copyArgs(msg,"PipelineDisplayName",params,undefined,false); 
			copyArgs(msg,"PipelineDefinition",params,undefined,false); 
			copyArgs(msg,"PipelineDescription",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createPipeline(params,cb);
		}
			service.CreatePresignedDomainUrl=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainId",params,undefined,false); 
			copyArgs(n,"UserProfileName",params,undefined,false); 
			
			copyArgs(n,"DomainId",params,undefined,false); 
			copyArgs(n,"UserProfileName",params,undefined,false); 
			copyArgs(Number(n),"SessionExpirationDurationInSeconds",params,undefined,false); 
			copyArgs(Number(n),"ExpiresInSeconds",params,undefined,false); 
			
			copyArgs(msg,"DomainId",params,undefined,false); 
			copyArgs(msg,"UserProfileName",params,undefined,false); 
			copyArgs(msg,"SessionExpirationDurationInSeconds",params,undefined,false); 
			copyArgs(msg,"ExpiresInSeconds",params,undefined,false); 
			

			svc.createPresignedDomainUrl(params,cb);
		}
			service.CreatePresignedNotebookInstanceUrl=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NotebookInstanceName",params,undefined,false); 
			
			copyArgs(n,"NotebookInstanceName",params,undefined,false); 
			copyArgs(Number(n),"SessionExpirationDurationInSeconds",params,undefined,false); 
			
			copyArgs(msg,"NotebookInstanceName",params,undefined,false); 
			copyArgs(msg,"SessionExpirationDurationInSeconds",params,undefined,false); 
			

			svc.createPresignedNotebookInstanceUrl(params,cb);
		}
			service.CreateProcessingJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProcessingJobName",params,undefined,false); 
			copyArgs(n,"ProcessingResources",params,undefined,true); 
			copyArgs(n,"AppSpecification",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"ProcessingInputs",params,undefined,true); 
			copyArgs(n,"ProcessingOutputConfig",params,undefined,true); 
			copyArgs(n,"ProcessingJobName",params,undefined,false); 
			copyArgs(n,"ProcessingResources",params,undefined,true); 
			copyArgs(n,"StoppingCondition",params,undefined,true); 
			copyArgs(n,"AppSpecification",params,undefined,true); 
			copyArgs(n,"Environment",params,undefined,true); 
			copyArgs(n,"NetworkConfig",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"ExperimentConfig",params,undefined,true); 
			
			copyArgs(msg,"ProcessingInputs",params,undefined,true); 
			copyArgs(msg,"ProcessingOutputConfig",params,undefined,true); 
			copyArgs(msg,"ProcessingJobName",params,undefined,false); 
			copyArgs(msg,"ProcessingResources",params,undefined,true); 
			copyArgs(msg,"StoppingCondition",params,undefined,true); 
			copyArgs(msg,"AppSpecification",params,undefined,true); 
			copyArgs(msg,"Environment",params,undefined,true); 
			copyArgs(msg,"NetworkConfig",params,undefined,true); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"ExperimentConfig",params,undefined,true); 
			

			svc.createProcessingJob(params,cb);
		}
			service.CreateProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			copyArgs(n,"ServiceCatalogProvisioningDetails",params,undefined,true); 
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			copyArgs(n,"ProjectDescription",params,undefined,false); 
			copyArgs(n,"ServiceCatalogProvisioningDetails",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ProjectName",params,undefined,false); 
			copyArgs(msg,"ProjectDescription",params,undefined,false); 
			copyArgs(msg,"ServiceCatalogProvisioningDetails",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createProject(params,cb);
		}
			service.CreateTrainingJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrainingJobName",params,undefined,false); 
			copyArgs(n,"AlgorithmSpecification",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"ResourceConfig",params,undefined,true); 
			copyArgs(n,"StoppingCondition",params,undefined,true); 
			
			copyArgs(n,"TrainingJobName",params,undefined,false); 
			copyArgs(n,"HyperParameters",params,undefined,true); 
			copyArgs(n,"AlgorithmSpecification",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"InputDataConfig",params,undefined,true); 
			copyArgs(n,"OutputDataConfig",params,undefined,true); 
			copyArgs(n,"ResourceConfig",params,undefined,true); 
			copyArgs(n,"VpcConfig",params,undefined,true); 
			copyArgs(n,"StoppingCondition",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(Boolean(n),"EnableNetworkIsolation",params,undefined,false); 
			copyArgs(Boolean(n),"EnableInterContainerTrafficEncryption",params,undefined,false); 
			copyArgs(Boolean(n),"EnableManagedSpotTraining",params,undefined,false); 
			copyArgs(n,"CheckpointConfig",params,undefined,true); 
			copyArgs(n,"DebugHookConfig",params,undefined,true); 
			copyArgs(n,"DebugRuleConfigurations",params,undefined,true); 
			copyArgs(n,"TensorBoardOutputConfig",params,undefined,true); 
			copyArgs(n,"ExperimentConfig",params,undefined,true); 
			copyArgs(n,"ProfilerConfig",params,undefined,true); 
			copyArgs(n,"ProfilerRuleConfigurations",params,undefined,true); 
			copyArgs(n,"Environment",params,undefined,true); 
			copyArgs(n,"RetryStrategy",params,undefined,true); 
			
			copyArgs(msg,"TrainingJobName",params,undefined,false); 
			copyArgs(msg,"HyperParameters",params,undefined,true); 
			copyArgs(msg,"AlgorithmSpecification",params,undefined,true); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"InputDataConfig",params,undefined,true); 
			copyArgs(msg,"OutputDataConfig",params,undefined,true); 
			copyArgs(msg,"ResourceConfig",params,undefined,true); 
			copyArgs(msg,"VpcConfig",params,undefined,true); 
			copyArgs(msg,"StoppingCondition",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"EnableNetworkIsolation",params,undefined,false); 
			copyArgs(msg,"EnableInterContainerTrafficEncryption",params,undefined,false); 
			copyArgs(msg,"EnableManagedSpotTraining",params,undefined,false); 
			copyArgs(msg,"CheckpointConfig",params,undefined,true); 
			copyArgs(msg,"DebugHookConfig",params,undefined,true); 
			copyArgs(msg,"DebugRuleConfigurations",params,undefined,true); 
			copyArgs(msg,"TensorBoardOutputConfig",params,undefined,true); 
			copyArgs(msg,"ExperimentConfig",params,undefined,true); 
			copyArgs(msg,"ProfilerConfig",params,undefined,true); 
			copyArgs(msg,"ProfilerRuleConfigurations",params,undefined,true); 
			copyArgs(msg,"Environment",params,undefined,true); 
			copyArgs(msg,"RetryStrategy",params,undefined,true); 
			

			svc.createTrainingJob(params,cb);
		}
			service.CreateTransformJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransformJobName",params,undefined,false); 
			copyArgs(n,"ModelName",params,undefined,false); 
			copyArgs(n,"TransformInput",params,undefined,true); 
			copyArgs(n,"TransformOutput",params,undefined,true); 
			copyArgs(n,"TransformResources",params,undefined,true); 
			
			copyArgs(n,"TransformJobName",params,undefined,false); 
			copyArgs(n,"ModelName",params,undefined,false); 
			copyArgs(Number(n),"MaxConcurrentTransforms",params,undefined,false); 
			copyArgs(n,"ModelClientConfig",params,undefined,true); 
			copyArgs(Number(n),"MaxPayloadInMB",params,undefined,false); 
			copyArgs(n,"BatchStrategy",params,undefined,false); 
			copyArgs(n,"Environment",params,undefined,true); 
			copyArgs(n,"TransformInput",params,undefined,true); 
			copyArgs(n,"TransformOutput",params,undefined,true); 
			copyArgs(n,"TransformResources",params,undefined,true); 
			copyArgs(n,"DataProcessing",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"ExperimentConfig",params,undefined,true); 
			
			copyArgs(msg,"TransformJobName",params,undefined,false); 
			copyArgs(msg,"ModelName",params,undefined,false); 
			copyArgs(msg,"MaxConcurrentTransforms",params,undefined,false); 
			copyArgs(msg,"ModelClientConfig",params,undefined,true); 
			copyArgs(msg,"MaxPayloadInMB",params,undefined,false); 
			copyArgs(msg,"BatchStrategy",params,undefined,false); 
			copyArgs(msg,"Environment",params,undefined,true); 
			copyArgs(msg,"TransformInput",params,undefined,true); 
			copyArgs(msg,"TransformOutput",params,undefined,true); 
			copyArgs(msg,"TransformResources",params,undefined,true); 
			copyArgs(msg,"DataProcessing",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"ExperimentConfig",params,undefined,true); 
			

			svc.createTransformJob(params,cb);
		}
			service.CreateTrial=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrialName",params,undefined,false); 
			copyArgs(n,"ExperimentName",params,undefined,false); 
			
			copyArgs(n,"TrialName",params,undefined,false); 
			copyArgs(n,"DisplayName",params,undefined,false); 
			copyArgs(n,"ExperimentName",params,undefined,false); 
			copyArgs(n,"MetadataProperties",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"TrialName",params,undefined,false); 
			copyArgs(msg,"DisplayName",params,undefined,false); 
			copyArgs(msg,"ExperimentName",params,undefined,false); 
			copyArgs(msg,"MetadataProperties",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createTrial(params,cb);
		}
			service.CreateTrialComponent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrialComponentName",params,undefined,false); 
			
			copyArgs(n,"TrialComponentName",params,undefined,false); 
			copyArgs(n,"DisplayName",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,true); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			copyArgs(n,"InputArtifacts",params,undefined,true); 
			copyArgs(n,"OutputArtifacts",params,undefined,true); 
			copyArgs(n,"MetadataProperties",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"TrialComponentName",params,undefined,false); 
			copyArgs(msg,"DisplayName",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,true); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			copyArgs(msg,"InputArtifacts",params,undefined,true); 
			copyArgs(msg,"OutputArtifacts",params,undefined,true); 
			copyArgs(msg,"MetadataProperties",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createTrialComponent(params,cb);
		}
			service.CreateUserProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainId",params,undefined,false); 
			copyArgs(n,"UserProfileName",params,undefined,false); 
			
			copyArgs(n,"DomainId",params,undefined,false); 
			copyArgs(n,"UserProfileName",params,undefined,false); 
			copyArgs(n,"SingleSignOnUserIdentifier",params,undefined,false); 
			copyArgs(n,"SingleSignOnUserValue",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"UserSettings",params,undefined,true); 
			
			copyArgs(msg,"DomainId",params,undefined,false); 
			copyArgs(msg,"UserProfileName",params,undefined,false); 
			copyArgs(msg,"SingleSignOnUserIdentifier",params,undefined,false); 
			copyArgs(msg,"SingleSignOnUserValue",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"UserSettings",params,undefined,true); 
			

			svc.createUserProfile(params,cb);
		}
			service.CreateWorkforce=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkforceName",params,undefined,false); 
			
			copyArgs(n,"CognitoConfig",params,undefined,true); 
			copyArgs(n,"OidcConfig",params,undefined,true); 
			copyArgs(n,"SourceIpConfig",params,undefined,true); 
			copyArgs(n,"WorkforceName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"CognitoConfig",params,undefined,true); 
			copyArgs(msg,"OidcConfig",params,undefined,true); 
			copyArgs(msg,"SourceIpConfig",params,undefined,true); 
			copyArgs(msg,"WorkforceName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createWorkforce(params,cb);
		}
			service.CreateWorkteam=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkteamName",params,undefined,false); 
			copyArgs(n,"MemberDefinitions",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(n,"WorkteamName",params,undefined,false); 
			copyArgs(n,"WorkforceName",params,undefined,false); 
			copyArgs(n,"MemberDefinitions",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"NotificationConfiguration",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"WorkteamName",params,undefined,false); 
			copyArgs(msg,"WorkforceName",params,undefined,false); 
			copyArgs(msg,"MemberDefinitions",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"NotificationConfiguration",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createWorkteam(params,cb);
		}
			service.DeleteAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ActionName",params,undefined,false); 
			
			copyArgs(n,"ActionName",params,undefined,false); 
			
			copyArgs(msg,"ActionName",params,undefined,false); 
			

			svc.deleteAction(params,cb);
		}
			service.DeleteAlgorithm=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AlgorithmName",params,undefined,false); 
			
			copyArgs(n,"AlgorithmName",params,undefined,false); 
			
			copyArgs(msg,"AlgorithmName",params,undefined,false); 
			

			svc.deleteAlgorithm(params,cb);
		}
			service.DeleteApp=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainId",params,undefined,false); 
			copyArgs(n,"UserProfileName",params,undefined,false); 
			copyArgs(n,"AppType",params,undefined,false); 
			copyArgs(n,"AppName",params,undefined,false); 
			
			copyArgs(n,"DomainId",params,undefined,false); 
			copyArgs(n,"UserProfileName",params,undefined,false); 
			copyArgs(n,"AppType",params,undefined,false); 
			copyArgs(n,"AppName",params,undefined,false); 
			
			copyArgs(msg,"DomainId",params,undefined,false); 
			copyArgs(msg,"UserProfileName",params,undefined,false); 
			copyArgs(msg,"AppType",params,undefined,false); 
			copyArgs(msg,"AppName",params,undefined,false); 
			

			svc.deleteApp(params,cb);
		}
			service.DeleteAppImageConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppImageConfigName",params,undefined,false); 
			
			copyArgs(n,"AppImageConfigName",params,undefined,false); 
			
			copyArgs(msg,"AppImageConfigName",params,undefined,false); 
			

			svc.deleteAppImageConfig(params,cb);
		}
			service.DeleteArtifact=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ArtifactArn",params,undefined,false); 
			copyArgs(n,"Source",params,undefined,true); 
			
			copyArgs(msg,"ArtifactArn",params,undefined,false); 
			copyArgs(msg,"Source",params,undefined,true); 
			

			svc.deleteArtifact(params,cb);
		}
			service.DeleteAssociation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceArn",params,undefined,false); 
			copyArgs(n,"DestinationArn",params,undefined,false); 
			
			copyArgs(n,"SourceArn",params,undefined,false); 
			copyArgs(n,"DestinationArn",params,undefined,false); 
			
			copyArgs(msg,"SourceArn",params,undefined,false); 
			copyArgs(msg,"DestinationArn",params,undefined,false); 
			

			svc.deleteAssociation(params,cb);
		}
			service.DeleteCodeRepository=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CodeRepositoryName",params,undefined,false); 
			
			copyArgs(n,"CodeRepositoryName",params,undefined,false); 
			
			copyArgs(msg,"CodeRepositoryName",params,undefined,false); 
			

			svc.deleteCodeRepository(params,cb);
		}
			service.DeleteContext=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContextName",params,undefined,false); 
			
			copyArgs(n,"ContextName",params,undefined,false); 
			
			copyArgs(msg,"ContextName",params,undefined,false); 
			

			svc.deleteContext(params,cb);
		}
			service.DeleteDataQualityJobDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobDefinitionName",params,undefined,false); 
			
			copyArgs(n,"JobDefinitionName",params,undefined,false); 
			
			copyArgs(msg,"JobDefinitionName",params,undefined,false); 
			

			svc.deleteDataQualityJobDefinition(params,cb);
		}
			service.DeleteDeviceFleet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeviceFleetName",params,undefined,false); 
			
			copyArgs(n,"DeviceFleetName",params,undefined,false); 
			
			copyArgs(msg,"DeviceFleetName",params,undefined,false); 
			

			svc.deleteDeviceFleet(params,cb);
		}
			service.DeleteDomain=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainId",params,undefined,false); 
			
			copyArgs(n,"DomainId",params,undefined,false); 
			copyArgs(n,"RetentionPolicy",params,undefined,false); 
			
			copyArgs(msg,"DomainId",params,undefined,false); 
			copyArgs(msg,"RetentionPolicy",params,undefined,false); 
			

			svc.deleteDomain(params,cb);
		}
			service.DeleteEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			
			copyArgs(msg,"EndpointName",params,undefined,false); 
			

			svc.deleteEndpoint(params,cb);
		}
			service.DeleteEndpointConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointConfigName",params,undefined,false); 
			
			copyArgs(n,"EndpointConfigName",params,undefined,false); 
			
			copyArgs(msg,"EndpointConfigName",params,undefined,false); 
			

			svc.deleteEndpointConfig(params,cb);
		}
			service.DeleteExperiment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ExperimentName",params,undefined,false); 
			
			copyArgs(n,"ExperimentName",params,undefined,false); 
			
			copyArgs(msg,"ExperimentName",params,undefined,false); 
			

			svc.deleteExperiment(params,cb);
		}
			service.DeleteFeatureGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FeatureGroupName",params,undefined,false); 
			
			copyArgs(n,"FeatureGroupName",params,undefined,false); 
			
			copyArgs(msg,"FeatureGroupName",params,undefined,false); 
			

			svc.deleteFeatureGroup(params,cb);
		}
			service.DeleteFlowDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FlowDefinitionName",params,undefined,false); 
			
			copyArgs(n,"FlowDefinitionName",params,undefined,false); 
			
			copyArgs(msg,"FlowDefinitionName",params,undefined,false); 
			

			svc.deleteFlowDefinition(params,cb);
		}
			service.DeleteHumanTaskUi=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HumanTaskUiName",params,undefined,false); 
			
			copyArgs(n,"HumanTaskUiName",params,undefined,false); 
			
			copyArgs(msg,"HumanTaskUiName",params,undefined,false); 
			

			svc.deleteHumanTaskUi(params,cb);
		}
			service.DeleteImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ImageName",params,undefined,false); 
			
			copyArgs(n,"ImageName",params,undefined,false); 
			
			copyArgs(msg,"ImageName",params,undefined,false); 
			

			svc.deleteImage(params,cb);
		}
			service.DeleteImageVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ImageName",params,undefined,false); 
			copyArgs(Number(n),"Version",params,undefined,false); 
			
			copyArgs(n,"ImageName",params,undefined,false); 
			copyArgs(Number(n),"Version",params,undefined,false); 
			
			copyArgs(msg,"ImageName",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			

			svc.deleteImageVersion(params,cb);
		}
			service.DeleteModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ModelName",params,undefined,false); 
			
			copyArgs(n,"ModelName",params,undefined,false); 
			
			copyArgs(msg,"ModelName",params,undefined,false); 
			

			svc.deleteModel(params,cb);
		}
			service.DeleteModelBiasJobDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobDefinitionName",params,undefined,false); 
			
			copyArgs(n,"JobDefinitionName",params,undefined,false); 
			
			copyArgs(msg,"JobDefinitionName",params,undefined,false); 
			

			svc.deleteModelBiasJobDefinition(params,cb);
		}
			service.DeleteModelExplainabilityJobDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobDefinitionName",params,undefined,false); 
			
			copyArgs(n,"JobDefinitionName",params,undefined,false); 
			
			copyArgs(msg,"JobDefinitionName",params,undefined,false); 
			

			svc.deleteModelExplainabilityJobDefinition(params,cb);
		}
			service.DeleteModelPackage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ModelPackageName",params,undefined,false); 
			
			copyArgs(n,"ModelPackageName",params,undefined,false); 
			
			copyArgs(msg,"ModelPackageName",params,undefined,false); 
			

			svc.deleteModelPackage(params,cb);
		}
			service.DeleteModelPackageGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ModelPackageGroupName",params,undefined,false); 
			
			copyArgs(n,"ModelPackageGroupName",params,undefined,false); 
			
			copyArgs(msg,"ModelPackageGroupName",params,undefined,false); 
			

			svc.deleteModelPackageGroup(params,cb);
		}
			service.DeleteModelPackageGroupPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ModelPackageGroupName",params,undefined,false); 
			
			copyArgs(n,"ModelPackageGroupName",params,undefined,false); 
			
			copyArgs(msg,"ModelPackageGroupName",params,undefined,false); 
			

			svc.deleteModelPackageGroupPolicy(params,cb);
		}
			service.DeleteModelQualityJobDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobDefinitionName",params,undefined,false); 
			
			copyArgs(n,"JobDefinitionName",params,undefined,false); 
			
			copyArgs(msg,"JobDefinitionName",params,undefined,false); 
			

			svc.deleteModelQualityJobDefinition(params,cb);
		}
			service.DeleteMonitoringSchedule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MonitoringScheduleName",params,undefined,false); 
			
			copyArgs(n,"MonitoringScheduleName",params,undefined,false); 
			
			copyArgs(msg,"MonitoringScheduleName",params,undefined,false); 
			

			svc.deleteMonitoringSchedule(params,cb);
		}
			service.DeleteNotebookInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NotebookInstanceName",params,undefined,false); 
			
			copyArgs(n,"NotebookInstanceName",params,undefined,false); 
			
			copyArgs(msg,"NotebookInstanceName",params,undefined,false); 
			

			svc.deleteNotebookInstance(params,cb);
		}
			service.DeleteNotebookInstanceLifecycleConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NotebookInstanceLifecycleConfigName",params,undefined,false); 
			
			copyArgs(n,"NotebookInstanceLifecycleConfigName",params,undefined,false); 
			
			copyArgs(msg,"NotebookInstanceLifecycleConfigName",params,undefined,false); 
			

			svc.deleteNotebookInstanceLifecycleConfig(params,cb);
		}
			service.DeletePipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PipelineName",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(n,"PipelineName",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"PipelineName",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.deletePipeline(params,cb);
		}
			service.DeleteProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			
			copyArgs(msg,"ProjectName",params,undefined,false); 
			

			svc.deleteProject(params,cb);
		}
			service.DeleteTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.deleteTags(params,cb);
		}
			service.DeleteTrial=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrialName",params,undefined,false); 
			
			copyArgs(n,"TrialName",params,undefined,false); 
			
			copyArgs(msg,"TrialName",params,undefined,false); 
			

			svc.deleteTrial(params,cb);
		}
			service.DeleteTrialComponent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrialComponentName",params,undefined,false); 
			
			copyArgs(n,"TrialComponentName",params,undefined,false); 
			
			copyArgs(msg,"TrialComponentName",params,undefined,false); 
			

			svc.deleteTrialComponent(params,cb);
		}
			service.DeleteUserProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainId",params,undefined,false); 
			copyArgs(n,"UserProfileName",params,undefined,false); 
			
			copyArgs(n,"DomainId",params,undefined,false); 
			copyArgs(n,"UserProfileName",params,undefined,false); 
			
			copyArgs(msg,"DomainId",params,undefined,false); 
			copyArgs(msg,"UserProfileName",params,undefined,false); 
			

			svc.deleteUserProfile(params,cb);
		}
			service.DeleteWorkforce=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkforceName",params,undefined,false); 
			
			copyArgs(n,"WorkforceName",params,undefined,false); 
			
			copyArgs(msg,"WorkforceName",params,undefined,false); 
			

			svc.deleteWorkforce(params,cb);
		}
			service.DeleteWorkteam=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkteamName",params,undefined,false); 
			
			copyArgs(n,"WorkteamName",params,undefined,false); 
			
			copyArgs(msg,"WorkteamName",params,undefined,false); 
			

			svc.deleteWorkteam(params,cb);
		}
			service.DeregisterDevices=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeviceFleetName",params,undefined,false); 
			copyArgs(n,"DeviceNames",params,undefined,false); 
			
			copyArgs(n,"DeviceFleetName",params,undefined,false); 
			copyArgs(n,"DeviceNames",params,undefined,false); 
			
			copyArgs(msg,"DeviceFleetName",params,undefined,false); 
			copyArgs(msg,"DeviceNames",params,undefined,false); 
			

			svc.deregisterDevices(params,cb);
		}
			service.DescribeAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ActionName",params,undefined,false); 
			
			copyArgs(n,"ActionName",params,undefined,false); 
			
			copyArgs(msg,"ActionName",params,undefined,false); 
			

			svc.describeAction(params,cb);
		}
			service.DescribeAlgorithm=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AlgorithmName",params,undefined,false); 
			
			copyArgs(n,"AlgorithmName",params,undefined,false); 
			
			copyArgs(msg,"AlgorithmName",params,undefined,false); 
			

			svc.describeAlgorithm(params,cb);
		}
			service.DescribeApp=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainId",params,undefined,false); 
			copyArgs(n,"UserProfileName",params,undefined,false); 
			copyArgs(n,"AppType",params,undefined,false); 
			copyArgs(n,"AppName",params,undefined,false); 
			
			copyArgs(n,"DomainId",params,undefined,false); 
			copyArgs(n,"UserProfileName",params,undefined,false); 
			copyArgs(n,"AppType",params,undefined,false); 
			copyArgs(n,"AppName",params,undefined,false); 
			
			copyArgs(msg,"DomainId",params,undefined,false); 
			copyArgs(msg,"UserProfileName",params,undefined,false); 
			copyArgs(msg,"AppType",params,undefined,false); 
			copyArgs(msg,"AppName",params,undefined,false); 
			

			svc.describeApp(params,cb);
		}
			service.DescribeAppImageConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppImageConfigName",params,undefined,false); 
			
			copyArgs(n,"AppImageConfigName",params,undefined,false); 
			
			copyArgs(msg,"AppImageConfigName",params,undefined,false); 
			

			svc.describeAppImageConfig(params,cb);
		}
			service.DescribeArtifact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ArtifactArn",params,undefined,false); 
			
			copyArgs(n,"ArtifactArn",params,undefined,false); 
			
			copyArgs(msg,"ArtifactArn",params,undefined,false); 
			

			svc.describeArtifact(params,cb);
		}
			service.DescribeAutoMLJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoMLJobName",params,undefined,false); 
			
			copyArgs(n,"AutoMLJobName",params,undefined,false); 
			
			copyArgs(msg,"AutoMLJobName",params,undefined,false); 
			

			svc.describeAutoMLJob(params,cb);
		}
			service.DescribeCodeRepository=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CodeRepositoryName",params,undefined,false); 
			
			copyArgs(n,"CodeRepositoryName",params,undefined,false); 
			
			copyArgs(msg,"CodeRepositoryName",params,undefined,false); 
			

			svc.describeCodeRepository(params,cb);
		}
			service.DescribeCompilationJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CompilationJobName",params,undefined,false); 
			
			copyArgs(n,"CompilationJobName",params,undefined,false); 
			
			copyArgs(msg,"CompilationJobName",params,undefined,false); 
			

			svc.describeCompilationJob(params,cb);
		}
			service.DescribeContext=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContextName",params,undefined,false); 
			
			copyArgs(n,"ContextName",params,undefined,false); 
			
			copyArgs(msg,"ContextName",params,undefined,false); 
			

			svc.describeContext(params,cb);
		}
			service.DescribeDataQualityJobDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobDefinitionName",params,undefined,false); 
			
			copyArgs(n,"JobDefinitionName",params,undefined,false); 
			
			copyArgs(msg,"JobDefinitionName",params,undefined,false); 
			

			svc.describeDataQualityJobDefinition(params,cb);
		}
			service.DescribeDevice=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeviceName",params,undefined,false); 
			copyArgs(n,"DeviceFleetName",params,undefined,false); 
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"DeviceName",params,undefined,false); 
			copyArgs(n,"DeviceFleetName",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DeviceName",params,undefined,false); 
			copyArgs(msg,"DeviceFleetName",params,undefined,false); 
			

			svc.describeDevice(params,cb);
		}
			service.DescribeDeviceFleet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeviceFleetName",params,undefined,false); 
			
			copyArgs(n,"DeviceFleetName",params,undefined,false); 
			
			copyArgs(msg,"DeviceFleetName",params,undefined,false); 
			

			svc.describeDeviceFleet(params,cb);
		}
			service.DescribeDomain=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainId",params,undefined,false); 
			
			copyArgs(n,"DomainId",params,undefined,false); 
			
			copyArgs(msg,"DomainId",params,undefined,false); 
			

			svc.describeDomain(params,cb);
		}
			service.DescribeEdgePackagingJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EdgePackagingJobName",params,undefined,false); 
			
			copyArgs(n,"EdgePackagingJobName",params,undefined,false); 
			
			copyArgs(msg,"EdgePackagingJobName",params,undefined,false); 
			

			svc.describeEdgePackagingJob(params,cb);
		}
			service.DescribeEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			
			copyArgs(msg,"EndpointName",params,undefined,false); 
			

			svc.describeEndpoint(params,cb);
		}
			service.DescribeEndpointConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointConfigName",params,undefined,false); 
			
			copyArgs(n,"EndpointConfigName",params,undefined,false); 
			
			copyArgs(msg,"EndpointConfigName",params,undefined,false); 
			

			svc.describeEndpointConfig(params,cb);
		}
			service.DescribeExperiment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ExperimentName",params,undefined,false); 
			
			copyArgs(n,"ExperimentName",params,undefined,false); 
			
			copyArgs(msg,"ExperimentName",params,undefined,false); 
			

			svc.describeExperiment(params,cb);
		}
			service.DescribeFeatureGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FeatureGroupName",params,undefined,false); 
			
			copyArgs(n,"FeatureGroupName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"FeatureGroupName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeFeatureGroup(params,cb);
		}
			service.DescribeFlowDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FlowDefinitionName",params,undefined,false); 
			
			copyArgs(n,"FlowDefinitionName",params,undefined,false); 
			
			copyArgs(msg,"FlowDefinitionName",params,undefined,false); 
			

			svc.describeFlowDefinition(params,cb);
		}
			service.DescribeHumanTaskUi=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HumanTaskUiName",params,undefined,false); 
			
			copyArgs(n,"HumanTaskUiName",params,undefined,false); 
			
			copyArgs(msg,"HumanTaskUiName",params,undefined,false); 
			

			svc.describeHumanTaskUi(params,cb);
		}
			service.DescribeHyperParameterTuningJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HyperParameterTuningJobName",params,undefined,false); 
			
			copyArgs(n,"HyperParameterTuningJobName",params,undefined,false); 
			
			copyArgs(msg,"HyperParameterTuningJobName",params,undefined,false); 
			

			svc.describeHyperParameterTuningJob(params,cb);
		}
			service.DescribeImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ImageName",params,undefined,false); 
			
			copyArgs(n,"ImageName",params,undefined,false); 
			
			copyArgs(msg,"ImageName",params,undefined,false); 
			

			svc.describeImage(params,cb);
		}
			service.DescribeImageVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ImageName",params,undefined,false); 
			
			copyArgs(n,"ImageName",params,undefined,false); 
			copyArgs(Number(n),"Version",params,undefined,false); 
			
			copyArgs(msg,"ImageName",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			

			svc.describeImageVersion(params,cb);
		}
			service.DescribeLabelingJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LabelingJobName",params,undefined,false); 
			
			copyArgs(n,"LabelingJobName",params,undefined,false); 
			
			copyArgs(msg,"LabelingJobName",params,undefined,false); 
			

			svc.describeLabelingJob(params,cb);
		}
			service.DescribeModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ModelName",params,undefined,false); 
			
			copyArgs(n,"ModelName",params,undefined,false); 
			
			copyArgs(msg,"ModelName",params,undefined,false); 
			

			svc.describeModel(params,cb);
		}
			service.DescribeModelBiasJobDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobDefinitionName",params,undefined,false); 
			
			copyArgs(n,"JobDefinitionName",params,undefined,false); 
			
			copyArgs(msg,"JobDefinitionName",params,undefined,false); 
			

			svc.describeModelBiasJobDefinition(params,cb);
		}
			service.DescribeModelExplainabilityJobDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobDefinitionName",params,undefined,false); 
			
			copyArgs(n,"JobDefinitionName",params,undefined,false); 
			
			copyArgs(msg,"JobDefinitionName",params,undefined,false); 
			

			svc.describeModelExplainabilityJobDefinition(params,cb);
		}
			service.DescribeModelPackage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ModelPackageName",params,undefined,false); 
			
			copyArgs(n,"ModelPackageName",params,undefined,false); 
			
			copyArgs(msg,"ModelPackageName",params,undefined,false); 
			

			svc.describeModelPackage(params,cb);
		}
			service.DescribeModelPackageGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ModelPackageGroupName",params,undefined,false); 
			
			copyArgs(n,"ModelPackageGroupName",params,undefined,false); 
			
			copyArgs(msg,"ModelPackageGroupName",params,undefined,false); 
			

			svc.describeModelPackageGroup(params,cb);
		}
			service.DescribeModelQualityJobDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobDefinitionName",params,undefined,false); 
			
			copyArgs(n,"JobDefinitionName",params,undefined,false); 
			
			copyArgs(msg,"JobDefinitionName",params,undefined,false); 
			

			svc.describeModelQualityJobDefinition(params,cb);
		}
			service.DescribeMonitoringSchedule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MonitoringScheduleName",params,undefined,false); 
			
			copyArgs(n,"MonitoringScheduleName",params,undefined,false); 
			
			copyArgs(msg,"MonitoringScheduleName",params,undefined,false); 
			

			svc.describeMonitoringSchedule(params,cb);
		}
			service.DescribeNotebookInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NotebookInstanceName",params,undefined,false); 
			
			copyArgs(n,"NotebookInstanceName",params,undefined,false); 
			
			copyArgs(msg,"NotebookInstanceName",params,undefined,false); 
			

			svc.describeNotebookInstance(params,cb);
		}
			service.DescribeNotebookInstanceLifecycleConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NotebookInstanceLifecycleConfigName",params,undefined,false); 
			
			copyArgs(n,"NotebookInstanceLifecycleConfigName",params,undefined,false); 
			
			copyArgs(msg,"NotebookInstanceLifecycleConfigName",params,undefined,false); 
			

			svc.describeNotebookInstanceLifecycleConfig(params,cb);
		}
			service.DescribePipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PipelineName",params,undefined,false); 
			
			copyArgs(n,"PipelineName",params,undefined,false); 
			
			copyArgs(msg,"PipelineName",params,undefined,false); 
			

			svc.describePipeline(params,cb);
		}
			service.DescribePipelineDefinitionForExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PipelineExecutionArn",params,undefined,false); 
			
			copyArgs(n,"PipelineExecutionArn",params,undefined,false); 
			
			copyArgs(msg,"PipelineExecutionArn",params,undefined,false); 
			

			svc.describePipelineDefinitionForExecution(params,cb);
		}
			service.DescribePipelineExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PipelineExecutionArn",params,undefined,false); 
			
			copyArgs(n,"PipelineExecutionArn",params,undefined,false); 
			
			copyArgs(msg,"PipelineExecutionArn",params,undefined,false); 
			

			svc.describePipelineExecution(params,cb);
		}
			service.DescribeProcessingJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProcessingJobName",params,undefined,false); 
			
			copyArgs(n,"ProcessingJobName",params,undefined,false); 
			
			copyArgs(msg,"ProcessingJobName",params,undefined,false); 
			

			svc.describeProcessingJob(params,cb);
		}
			service.DescribeProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			
			copyArgs(n,"ProjectName",params,undefined,false); 
			
			copyArgs(msg,"ProjectName",params,undefined,false); 
			

			svc.describeProject(params,cb);
		}
			service.DescribeSubscribedWorkteam=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkteamArn",params,undefined,false); 
			
			copyArgs(n,"WorkteamArn",params,undefined,false); 
			
			copyArgs(msg,"WorkteamArn",params,undefined,false); 
			

			svc.describeSubscribedWorkteam(params,cb);
		}
			service.DescribeTrainingJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrainingJobName",params,undefined,false); 
			
			copyArgs(n,"TrainingJobName",params,undefined,false); 
			
			copyArgs(msg,"TrainingJobName",params,undefined,false); 
			

			svc.describeTrainingJob(params,cb);
		}
			service.DescribeTransformJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransformJobName",params,undefined,false); 
			
			copyArgs(n,"TransformJobName",params,undefined,false); 
			
			copyArgs(msg,"TransformJobName",params,undefined,false); 
			

			svc.describeTransformJob(params,cb);
		}
			service.DescribeTrial=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrialName",params,undefined,false); 
			
			copyArgs(n,"TrialName",params,undefined,false); 
			
			copyArgs(msg,"TrialName",params,undefined,false); 
			

			svc.describeTrial(params,cb);
		}
			service.DescribeTrialComponent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrialComponentName",params,undefined,false); 
			
			copyArgs(n,"TrialComponentName",params,undefined,false); 
			
			copyArgs(msg,"TrialComponentName",params,undefined,false); 
			

			svc.describeTrialComponent(params,cb);
		}
			service.DescribeUserProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainId",params,undefined,false); 
			copyArgs(n,"UserProfileName",params,undefined,false); 
			
			copyArgs(n,"DomainId",params,undefined,false); 
			copyArgs(n,"UserProfileName",params,undefined,false); 
			
			copyArgs(msg,"DomainId",params,undefined,false); 
			copyArgs(msg,"UserProfileName",params,undefined,false); 
			

			svc.describeUserProfile(params,cb);
		}
			service.DescribeWorkforce=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkforceName",params,undefined,false); 
			
			copyArgs(n,"WorkforceName",params,undefined,false); 
			
			copyArgs(msg,"WorkforceName",params,undefined,false); 
			

			svc.describeWorkforce(params,cb);
		}
			service.DescribeWorkteam=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkteamName",params,undefined,false); 
			
			copyArgs(n,"WorkteamName",params,undefined,false); 
			
			copyArgs(msg,"WorkteamName",params,undefined,false); 
			

			svc.describeWorkteam(params,cb);
		}
			service.DisableSagemakerServicecatalogPortfolio=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.disableSagemakerServicecatalogPortfolio(params,cb);
		}
			service.DisassociateTrialComponent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrialComponentName",params,undefined,false); 
			copyArgs(n,"TrialName",params,undefined,false); 
			
			copyArgs(n,"TrialComponentName",params,undefined,false); 
			copyArgs(n,"TrialName",params,undefined,false); 
			
			copyArgs(msg,"TrialComponentName",params,undefined,false); 
			copyArgs(msg,"TrialName",params,undefined,false); 
			

			svc.disassociateTrialComponent(params,cb);
		}
			service.EnableSagemakerServicecatalogPortfolio=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.enableSagemakerServicecatalogPortfolio(params,cb);
		}
			service.GetDeviceFleetReport=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeviceFleetName",params,undefined,false); 
			
			copyArgs(n,"DeviceFleetName",params,undefined,false); 
			
			copyArgs(msg,"DeviceFleetName",params,undefined,false); 
			

			svc.getDeviceFleetReport(params,cb);
		}
			service.GetModelPackageGroupPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ModelPackageGroupName",params,undefined,false); 
			
			copyArgs(n,"ModelPackageGroupName",params,undefined,false); 
			
			copyArgs(msg,"ModelPackageGroupName",params,undefined,false); 
			

			svc.getModelPackageGroupPolicy(params,cb);
		}
			service.GetSagemakerServicecatalogPortfolioStatus=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getSagemakerServicecatalogPortfolioStatus(params,cb);
		}
			service.GetSearchSuggestions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Resource",params,undefined,false); 
			
			copyArgs(n,"Resource",params,undefined,false); 
			copyArgs(n,"SuggestionQuery",params,undefined,false); 
			
			copyArgs(msg,"Resource",params,undefined,false); 
			copyArgs(msg,"SuggestionQuery",params,undefined,false); 
			

			svc.getSearchSuggestions(params,cb);
		}
			service.ListActions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SourceUri",params,undefined,false); 
			copyArgs(n,"ActionType",params,undefined,false); 
			copyArgs(n,"CreatedAfter",params,undefined,false); 
			copyArgs(n,"CreatedBefore",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"SourceUri",params,undefined,false); 
			copyArgs(msg,"ActionType",params,undefined,false); 
			copyArgs(msg,"CreatedAfter",params,undefined,false); 
			copyArgs(msg,"CreatedBefore",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listActions(params,cb);
		}
			service.ListAlgorithms=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			

			svc.listAlgorithms(params,cb);
		}
			service.ListAppImageConfigs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			copyArgs(n,"ModifiedTimeBefore",params,undefined,false); 
			copyArgs(n,"ModifiedTimeAfter",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			copyArgs(msg,"ModifiedTimeBefore",params,undefined,false); 
			copyArgs(msg,"ModifiedTimeAfter",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			

			svc.listAppImageConfigs(params,cb);
		}
			service.ListApps=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"DomainIdEquals",params,undefined,false); 
			copyArgs(n,"UserProfileNameEquals",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"DomainIdEquals",params,undefined,false); 
			copyArgs(msg,"UserProfileNameEquals",params,undefined,false); 
			

			svc.listApps(params,cb);
		}
			service.ListArtifacts=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SourceUri",params,undefined,false); 
			copyArgs(n,"ArtifactType",params,undefined,false); 
			copyArgs(n,"CreatedAfter",params,undefined,false); 
			copyArgs(n,"CreatedBefore",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"SourceUri",params,undefined,false); 
			copyArgs(msg,"ArtifactType",params,undefined,false); 
			copyArgs(msg,"CreatedAfter",params,undefined,false); 
			copyArgs(msg,"CreatedBefore",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listArtifacts(params,cb);
		}
			service.ListAssociations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SourceArn",params,undefined,false); 
			copyArgs(n,"DestinationArn",params,undefined,false); 
			copyArgs(n,"SourceType",params,undefined,false); 
			copyArgs(n,"DestinationType",params,undefined,false); 
			copyArgs(n,"AssociationType",params,undefined,false); 
			copyArgs(n,"CreatedAfter",params,undefined,false); 
			copyArgs(n,"CreatedBefore",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"SourceArn",params,undefined,false); 
			copyArgs(msg,"DestinationArn",params,undefined,false); 
			copyArgs(msg,"SourceType",params,undefined,false); 
			copyArgs(msg,"DestinationType",params,undefined,false); 
			copyArgs(msg,"AssociationType",params,undefined,false); 
			copyArgs(msg,"CreatedAfter",params,undefined,false); 
			copyArgs(msg,"CreatedBefore",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listAssociations(params,cb);
		}
			service.ListAutoMLJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"StatusEquals",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"StatusEquals",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listAutoMLJobs(params,cb);
		}
			service.ListCandidatesForAutoMLJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoMLJobName",params,undefined,false); 
			
			copyArgs(n,"AutoMLJobName",params,undefined,false); 
			copyArgs(n,"StatusEquals",params,undefined,false); 
			copyArgs(n,"CandidateNameEquals",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AutoMLJobName",params,undefined,false); 
			copyArgs(msg,"StatusEquals",params,undefined,false); 
			copyArgs(msg,"CandidateNameEquals",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listCandidatesForAutoMLJob(params,cb);
		}
			service.ListCodeRepositories=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			

			svc.listCodeRepositories(params,cb);
		}
			service.ListCompilationJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"StatusEquals",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"StatusEquals",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			

			svc.listCompilationJobs(params,cb);
		}
			service.ListContexts=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SourceUri",params,undefined,false); 
			copyArgs(n,"ContextType",params,undefined,false); 
			copyArgs(n,"CreatedAfter",params,undefined,false); 
			copyArgs(n,"CreatedBefore",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"SourceUri",params,undefined,false); 
			copyArgs(msg,"ContextType",params,undefined,false); 
			copyArgs(msg,"CreatedAfter",params,undefined,false); 
			copyArgs(msg,"CreatedBefore",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listContexts(params,cb);
		}
			service.ListDataQualityJobDefinitions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			
			copyArgs(msg,"EndpointName",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			

			svc.listDataQualityJobDefinitions(params,cb);
		}
			service.ListDeviceFleets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			

			svc.listDeviceFleets(params,cb);
		}
			service.ListDevices=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"LatestHeartbeatAfter",params,undefined,false); 
			copyArgs(n,"ModelName",params,undefined,false); 
			copyArgs(n,"DeviceFleetName",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"LatestHeartbeatAfter",params,undefined,false); 
			copyArgs(msg,"ModelName",params,undefined,false); 
			copyArgs(msg,"DeviceFleetName",params,undefined,false); 
			

			svc.listDevices(params,cb);
		}
			service.ListDomains=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listDomains(params,cb);
		}
			service.ListEdgePackagingJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"ModelNameContains",params,undefined,false); 
			copyArgs(n,"StatusEquals",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"ModelNameContains",params,undefined,false); 
			copyArgs(msg,"StatusEquals",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			

			svc.listEdgePackagingJobs(params,cb);
		}
			service.ListEndpointConfigs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			

			svc.listEndpointConfigs(params,cb);
		}
			service.ListEndpoints=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(n,"StatusEquals",params,undefined,false); 
			
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(msg,"StatusEquals",params,undefined,false); 
			

			svc.listEndpoints(params,cb);
		}
			service.ListExperiments=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CreatedAfter",params,undefined,false); 
			copyArgs(n,"CreatedBefore",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"CreatedAfter",params,undefined,false); 
			copyArgs(msg,"CreatedBefore",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listExperiments(params,cb);
		}
			service.ListFeatureGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"FeatureGroupStatusEquals",params,undefined,false); 
			copyArgs(n,"OfflineStoreStatusEquals",params,undefined,false); 
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"FeatureGroupStatusEquals",params,undefined,false); 
			copyArgs(msg,"OfflineStoreStatusEquals",params,undefined,false); 
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listFeatureGroups(params,cb);
		}
			service.ListFlowDefinitions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listFlowDefinitions(params,cb);
		}
			service.ListHumanTaskUis=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listHumanTaskUis(params,cb);
		}
			service.ListHyperParameterTuningJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(n,"StatusEquals",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(msg,"StatusEquals",params,undefined,false); 
			

			svc.listHyperParameterTuningJobs(params,cb);
		}
			service.ListImageVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ImageName",params,undefined,false); 
			
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(n,"ImageName",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"ImageName",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			

			svc.listImageVersions(params,cb);
		}
			service.ListImages=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			

			svc.listImages(params,cb);
		}
			service.ListLabelingJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"StatusEquals",params,undefined,false); 
			
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"StatusEquals",params,undefined,false); 
			

			svc.listLabelingJobs(params,cb);
		}
			service.ListLabelingJobsForWorkteam=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkteamArn",params,undefined,false); 
			
			copyArgs(n,"WorkteamArn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(n,"JobReferenceCodeContains",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			
			copyArgs(msg,"WorkteamArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"JobReferenceCodeContains",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			

			svc.listLabelingJobsForWorkteam(params,cb);
		}
			service.ListModelBiasJobDefinitions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			
			copyArgs(msg,"EndpointName",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			

			svc.listModelBiasJobDefinitions(params,cb);
		}
			service.ListModelExplainabilityJobDefinitions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			
			copyArgs(msg,"EndpointName",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			

			svc.listModelExplainabilityJobDefinitions(params,cb);
		}
			service.ListModelPackageGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			

			svc.listModelPackageGroups(params,cb);
		}
			service.ListModelPackages=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"ModelApprovalStatus",params,undefined,false); 
			copyArgs(n,"ModelPackageGroupName",params,undefined,false); 
			copyArgs(n,"ModelPackageType",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"ModelApprovalStatus",params,undefined,false); 
			copyArgs(msg,"ModelPackageGroupName",params,undefined,false); 
			copyArgs(msg,"ModelPackageType",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			

			svc.listModelPackages(params,cb);
		}
			service.ListModelQualityJobDefinitions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			
			copyArgs(msg,"EndpointName",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			

			svc.listModelQualityJobDefinitions(params,cb);
		}
			service.ListModels=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			

			svc.listModels(params,cb);
		}
			service.ListMonitoringExecutions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MonitoringScheduleName",params,undefined,false); 
			copyArgs(n,"EndpointName",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"ScheduledTimeBefore",params,undefined,false); 
			copyArgs(n,"ScheduledTimeAfter",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(n,"StatusEquals",params,undefined,false); 
			copyArgs(n,"MonitoringJobDefinitionName",params,undefined,false); 
			copyArgs(n,"MonitoringTypeEquals",params,undefined,false); 
			
			copyArgs(msg,"MonitoringScheduleName",params,undefined,false); 
			copyArgs(msg,"EndpointName",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"ScheduledTimeBefore",params,undefined,false); 
			copyArgs(msg,"ScheduledTimeAfter",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(msg,"StatusEquals",params,undefined,false); 
			copyArgs(msg,"MonitoringJobDefinitionName",params,undefined,false); 
			copyArgs(msg,"MonitoringTypeEquals",params,undefined,false); 
			

			svc.listMonitoringExecutions(params,cb);
		}
			service.ListMonitoringSchedules=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(n,"StatusEquals",params,undefined,false); 
			copyArgs(n,"MonitoringJobDefinitionName",params,undefined,false); 
			copyArgs(n,"MonitoringTypeEquals",params,undefined,false); 
			
			copyArgs(msg,"EndpointName",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(msg,"StatusEquals",params,undefined,false); 
			copyArgs(msg,"MonitoringJobDefinitionName",params,undefined,false); 
			copyArgs(msg,"MonitoringTypeEquals",params,undefined,false); 
			

			svc.listMonitoringSchedules(params,cb);
		}
			service.ListNotebookInstanceLifecycleConfigs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeAfter",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeAfter",params,undefined,false); 
			

			svc.listNotebookInstanceLifecycleConfigs(params,cb);
		}
			service.ListNotebookInstances=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(n,"StatusEquals",params,undefined,false); 
			copyArgs(n,"NotebookInstanceLifecycleConfigNameContains",params,undefined,false); 
			copyArgs(n,"DefaultCodeRepositoryContains",params,undefined,false); 
			copyArgs(n,"AdditionalCodeRepositoryEquals",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(msg,"StatusEquals",params,undefined,false); 
			copyArgs(msg,"NotebookInstanceLifecycleConfigNameContains",params,undefined,false); 
			copyArgs(msg,"DefaultCodeRepositoryContains",params,undefined,false); 
			copyArgs(msg,"AdditionalCodeRepositoryEquals",params,undefined,false); 
			

			svc.listNotebookInstances(params,cb);
		}
			service.ListPipelineExecutionSteps=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"PipelineExecutionArn",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			
			copyArgs(msg,"PipelineExecutionArn",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			

			svc.listPipelineExecutionSteps(params,cb);
		}
			service.ListPipelineExecutions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PipelineName",params,undefined,false); 
			
			copyArgs(n,"PipelineName",params,undefined,false); 
			copyArgs(n,"CreatedAfter",params,undefined,false); 
			copyArgs(n,"CreatedBefore",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"PipelineName",params,undefined,false); 
			copyArgs(msg,"CreatedAfter",params,undefined,false); 
			copyArgs(msg,"CreatedBefore",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listPipelineExecutions(params,cb);
		}
			service.ListPipelineParametersForExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PipelineExecutionArn",params,undefined,false); 
			
			copyArgs(n,"PipelineExecutionArn",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"PipelineExecutionArn",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listPipelineParametersForExecution(params,cb);
		}
			service.ListPipelines=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"PipelineNamePrefix",params,undefined,false); 
			copyArgs(n,"CreatedAfter",params,undefined,false); 
			copyArgs(n,"CreatedBefore",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"PipelineNamePrefix",params,undefined,false); 
			copyArgs(msg,"CreatedAfter",params,undefined,false); 
			copyArgs(msg,"CreatedBefore",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listPipelines(params,cb);
		}
			service.ListProcessingJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"StatusEquals",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"StatusEquals",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listProcessingJobs(params,cb);
		}
			service.ListProjects=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			

			svc.listProjects(params,cb);
		}
			service.ListSubscribedWorkteams=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listSubscribedWorkteams(params,cb);
		}
			service.ListTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listTags(params,cb);
		}
			service.ListTrainingJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"StatusEquals",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"StatusEquals",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			

			svc.listTrainingJobs(params,cb);
		}
			service.ListTrainingJobsForHyperParameterTuningJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HyperParameterTuningJobName",params,undefined,false); 
			
			copyArgs(n,"HyperParameterTuningJobName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"StatusEquals",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			
			copyArgs(msg,"HyperParameterTuningJobName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"StatusEquals",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			

			svc.listTrainingJobsForHyperParameterTuningJob(params,cb);
		}
			service.ListTransformJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CreationTimeAfter",params,undefined,false); 
			copyArgs(n,"CreationTimeBefore",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(n,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"StatusEquals",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"CreationTimeAfter",params,undefined,false); 
			copyArgs(msg,"CreationTimeBefore",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArgs(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"StatusEquals",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listTransformJobs(params,cb);
		}
			service.ListTrialComponents=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ExperimentName",params,undefined,false); 
			copyArgs(n,"TrialName",params,undefined,false); 
			copyArgs(n,"SourceArn",params,undefined,false); 
			copyArgs(n,"CreatedAfter",params,undefined,false); 
			copyArgs(n,"CreatedBefore",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ExperimentName",params,undefined,false); 
			copyArgs(msg,"TrialName",params,undefined,false); 
			copyArgs(msg,"SourceArn",params,undefined,false); 
			copyArgs(msg,"CreatedAfter",params,undefined,false); 
			copyArgs(msg,"CreatedBefore",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listTrialComponents(params,cb);
		}
			service.ListTrials=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ExperimentName",params,undefined,false); 
			copyArgs(n,"TrialComponentName",params,undefined,false); 
			copyArgs(n,"CreatedAfter",params,undefined,false); 
			copyArgs(n,"CreatedBefore",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ExperimentName",params,undefined,false); 
			copyArgs(msg,"TrialComponentName",params,undefined,false); 
			copyArgs(msg,"CreatedAfter",params,undefined,false); 
			copyArgs(msg,"CreatedBefore",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listTrials(params,cb);
		}
			service.ListUserProfiles=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"DomainIdEquals",params,undefined,false); 
			copyArgs(n,"UserProfileNameContains",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"DomainIdEquals",params,undefined,false); 
			copyArgs(msg,"UserProfileNameContains",params,undefined,false); 
			

			svc.listUserProfiles(params,cb);
		}
			service.ListWorkforces=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listWorkforces(params,cb);
		}
			service.ListWorkteams=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NameContains",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NameContains",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listWorkteams(params,cb);
		}
			service.PutModelPackageGroupPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ModelPackageGroupName",params,undefined,false); 
			copyArgs(n,"ResourcePolicy",params,undefined,false); 
			
			copyArgs(n,"ModelPackageGroupName",params,undefined,false); 
			copyArgs(n,"ResourcePolicy",params,undefined,false); 
			
			copyArgs(msg,"ModelPackageGroupName",params,undefined,false); 
			copyArgs(msg,"ResourcePolicy",params,undefined,false); 
			

			svc.putModelPackageGroupPolicy(params,cb);
		}
			service.RegisterDevices=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeviceFleetName",params,undefined,false); 
			copyArgs(n,"Devices",params,undefined,true); 
			
			copyArgs(n,"DeviceFleetName",params,undefined,false); 
			copyArgs(n,"Devices",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DeviceFleetName",params,undefined,false); 
			copyArgs(msg,"Devices",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.registerDevices(params,cb);
		}
			service.RenderUiTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Task",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"UiTemplate",params,undefined,true); 
			copyArgs(n,"Task",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"HumanTaskUiArn",params,undefined,false); 
			
			copyArgs(msg,"UiTemplate",params,undefined,true); 
			copyArgs(msg,"Task",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"HumanTaskUiArn",params,undefined,false); 
			

			svc.renderUiTemplate(params,cb);
		}
			service.Search=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Resource",params,undefined,false); 
			
			copyArgs(n,"Resource",params,undefined,false); 
			copyArgs(n,"SearchExpression",params,undefined,true); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Resource",params,undefined,false); 
			copyArgs(msg,"SearchExpression",params,undefined,true); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.search(params,cb);
		}
			service.SendPipelineExecutionStepFailure=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CallbackToken",params,undefined,false); 
			
			copyArgs(n,"CallbackToken",params,undefined,false); 
			copyArgs(n,"FailureReason",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"CallbackToken",params,undefined,false); 
			copyArgs(msg,"FailureReason",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.sendPipelineExecutionStepFailure(params,cb);
		}
			service.SendPipelineExecutionStepSuccess=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CallbackToken",params,undefined,false); 
			
			copyArgs(n,"CallbackToken",params,undefined,false); 
			copyArgs(n,"OutputParameters",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"CallbackToken",params,undefined,false); 
			copyArgs(msg,"OutputParameters",params,undefined,true); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.sendPipelineExecutionStepSuccess(params,cb);
		}
			service.StartMonitoringSchedule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MonitoringScheduleName",params,undefined,false); 
			
			copyArgs(n,"MonitoringScheduleName",params,undefined,false); 
			
			copyArgs(msg,"MonitoringScheduleName",params,undefined,false); 
			

			svc.startMonitoringSchedule(params,cb);
		}
			service.StartNotebookInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NotebookInstanceName",params,undefined,false); 
			
			copyArgs(n,"NotebookInstanceName",params,undefined,false); 
			
			copyArgs(msg,"NotebookInstanceName",params,undefined,false); 
			

			svc.startNotebookInstance(params,cb);
		}
			service.StartPipelineExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PipelineName",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(n,"PipelineName",params,undefined,false); 
			copyArgs(n,"PipelineExecutionDisplayName",params,undefined,false); 
			copyArgs(n,"PipelineParameters",params,undefined,true); 
			copyArgs(n,"PipelineExecutionDescription",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"PipelineName",params,undefined,false); 
			copyArgs(msg,"PipelineExecutionDisplayName",params,undefined,false); 
			copyArgs(msg,"PipelineParameters",params,undefined,true); 
			copyArgs(msg,"PipelineExecutionDescription",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.startPipelineExecution(params,cb);
		}
			service.StopAutoMLJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoMLJobName",params,undefined,false); 
			
			copyArgs(n,"AutoMLJobName",params,undefined,false); 
			
			copyArgs(msg,"AutoMLJobName",params,undefined,false); 
			

			svc.stopAutoMLJob(params,cb);
		}
			service.StopCompilationJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CompilationJobName",params,undefined,false); 
			
			copyArgs(n,"CompilationJobName",params,undefined,false); 
			
			copyArgs(msg,"CompilationJobName",params,undefined,false); 
			

			svc.stopCompilationJob(params,cb);
		}
			service.StopEdgePackagingJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EdgePackagingJobName",params,undefined,false); 
			
			copyArgs(n,"EdgePackagingJobName",params,undefined,false); 
			
			copyArgs(msg,"EdgePackagingJobName",params,undefined,false); 
			

			svc.stopEdgePackagingJob(params,cb);
		}
			service.StopHyperParameterTuningJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HyperParameterTuningJobName",params,undefined,false); 
			
			copyArgs(n,"HyperParameterTuningJobName",params,undefined,false); 
			
			copyArgs(msg,"HyperParameterTuningJobName",params,undefined,false); 
			

			svc.stopHyperParameterTuningJob(params,cb);
		}
			service.StopLabelingJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LabelingJobName",params,undefined,false); 
			
			copyArgs(n,"LabelingJobName",params,undefined,false); 
			
			copyArgs(msg,"LabelingJobName",params,undefined,false); 
			

			svc.stopLabelingJob(params,cb);
		}
			service.StopMonitoringSchedule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MonitoringScheduleName",params,undefined,false); 
			
			copyArgs(n,"MonitoringScheduleName",params,undefined,false); 
			
			copyArgs(msg,"MonitoringScheduleName",params,undefined,false); 
			

			svc.stopMonitoringSchedule(params,cb);
		}
			service.StopNotebookInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NotebookInstanceName",params,undefined,false); 
			
			copyArgs(n,"NotebookInstanceName",params,undefined,false); 
			
			copyArgs(msg,"NotebookInstanceName",params,undefined,false); 
			

			svc.stopNotebookInstance(params,cb);
		}
			service.StopPipelineExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PipelineExecutionArn",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(n,"PipelineExecutionArn",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"PipelineExecutionArn",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.stopPipelineExecution(params,cb);
		}
			service.StopProcessingJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProcessingJobName",params,undefined,false); 
			
			copyArgs(n,"ProcessingJobName",params,undefined,false); 
			
			copyArgs(msg,"ProcessingJobName",params,undefined,false); 
			

			svc.stopProcessingJob(params,cb);
		}
			service.StopTrainingJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrainingJobName",params,undefined,false); 
			
			copyArgs(n,"TrainingJobName",params,undefined,false); 
			
			copyArgs(msg,"TrainingJobName",params,undefined,false); 
			

			svc.stopTrainingJob(params,cb);
		}
			service.StopTransformJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransformJobName",params,undefined,false); 
			
			copyArgs(n,"TransformJobName",params,undefined,false); 
			
			copyArgs(msg,"TransformJobName",params,undefined,false); 
			

			svc.stopTransformJob(params,cb);
		}
			service.UpdateAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ActionName",params,undefined,false); 
			
			copyArgs(n,"ActionName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			copyArgs(n,"Properties",params,undefined,true); 
			copyArgs(n,"PropertiesToRemove",params,undefined,true); 
			
			copyArgs(msg,"ActionName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			copyArgs(msg,"Properties",params,undefined,true); 
			copyArgs(msg,"PropertiesToRemove",params,undefined,true); 
			

			svc.updateAction(params,cb);
		}
			service.UpdateAppImageConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppImageConfigName",params,undefined,false); 
			
			copyArgs(n,"AppImageConfigName",params,undefined,false); 
			copyArgs(n,"KernelGatewayImageConfig",params,undefined,true); 
			
			copyArgs(msg,"AppImageConfigName",params,undefined,false); 
			copyArgs(msg,"KernelGatewayImageConfig",params,undefined,true); 
			

			svc.updateAppImageConfig(params,cb);
		}
			service.UpdateArtifact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ArtifactArn",params,undefined,false); 
			
			copyArgs(n,"ArtifactArn",params,undefined,false); 
			copyArgs(n,"ArtifactName",params,undefined,false); 
			copyArgs(n,"Properties",params,undefined,true); 
			copyArgs(n,"PropertiesToRemove",params,undefined,true); 
			
			copyArgs(msg,"ArtifactArn",params,undefined,false); 
			copyArgs(msg,"ArtifactName",params,undefined,false); 
			copyArgs(msg,"Properties",params,undefined,true); 
			copyArgs(msg,"PropertiesToRemove",params,undefined,true); 
			

			svc.updateArtifact(params,cb);
		}
			service.UpdateCodeRepository=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CodeRepositoryName",params,undefined,false); 
			
			copyArgs(n,"CodeRepositoryName",params,undefined,false); 
			copyArgs(n,"GitConfig",params,undefined,false); 
			
			copyArgs(msg,"CodeRepositoryName",params,undefined,false); 
			copyArgs(msg,"GitConfig",params,undefined,false); 
			

			svc.updateCodeRepository(params,cb);
		}
			service.UpdateContext=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContextName",params,undefined,false); 
			
			copyArgs(n,"ContextName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Properties",params,undefined,true); 
			copyArgs(n,"PropertiesToRemove",params,undefined,true); 
			
			copyArgs(msg,"ContextName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Properties",params,undefined,true); 
			copyArgs(msg,"PropertiesToRemove",params,undefined,true); 
			

			svc.updateContext(params,cb);
		}
			service.UpdateDeviceFleet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeviceFleetName",params,undefined,false); 
			copyArgs(n,"OutputConfig",params,undefined,true); 
			
			copyArgs(n,"DeviceFleetName",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"OutputConfig",params,undefined,true); 
			copyArgs(Boolean(n),"EnableIotRoleAlias",params,undefined,false); 
			
			copyArgs(msg,"DeviceFleetName",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"OutputConfig",params,undefined,true); 
			copyArgs(msg,"EnableIotRoleAlias",params,undefined,false); 
			

			svc.updateDeviceFleet(params,cb);
		}
			service.UpdateDevices=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeviceFleetName",params,undefined,false); 
			copyArgs(n,"Devices",params,undefined,true); 
			
			copyArgs(n,"DeviceFleetName",params,undefined,false); 
			copyArgs(n,"Devices",params,undefined,true); 
			
			copyArgs(msg,"DeviceFleetName",params,undefined,false); 
			copyArgs(msg,"Devices",params,undefined,true); 
			

			svc.updateDevices(params,cb);
		}
			service.UpdateDomain=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainId",params,undefined,false); 
			
			copyArgs(n,"DomainId",params,undefined,false); 
			copyArgs(n,"DefaultUserSettings",params,undefined,true); 
			
			copyArgs(msg,"DomainId",params,undefined,false); 
			copyArgs(msg,"DefaultUserSettings",params,undefined,true); 
			

			svc.updateDomain(params,cb);
		}
			service.UpdateEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			copyArgs(n,"EndpointConfigName",params,undefined,false); 
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			copyArgs(n,"EndpointConfigName",params,undefined,false); 
			copyArgs(Boolean(n),"RetainAllVariantProperties",params,undefined,false); 
			copyArgs(n,"ExcludeRetainedVariantProperties",params,undefined,false); 
			copyArgs(n,"DeploymentConfig",params,undefined,true); 
			
			copyArgs(msg,"EndpointName",params,undefined,false); 
			copyArgs(msg,"EndpointConfigName",params,undefined,false); 
			copyArgs(msg,"RetainAllVariantProperties",params,undefined,false); 
			copyArgs(msg,"ExcludeRetainedVariantProperties",params,undefined,false); 
			copyArgs(msg,"DeploymentConfig",params,undefined,true); 
			

			svc.updateEndpoint(params,cb);
		}
			service.UpdateEndpointWeightsAndCapacities=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			copyArgs(n,"DesiredWeightsAndCapacities",params,undefined,false); 
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			copyArgs(n,"DesiredWeightsAndCapacities",params,undefined,false); 
			
			copyArgs(msg,"EndpointName",params,undefined,false); 
			copyArgs(msg,"DesiredWeightsAndCapacities",params,undefined,false); 
			

			svc.updateEndpointWeightsAndCapacities(params,cb);
		}
			service.UpdateExperiment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ExperimentName",params,undefined,false); 
			
			copyArgs(n,"ExperimentName",params,undefined,false); 
			copyArgs(n,"DisplayName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(msg,"ExperimentName",params,undefined,false); 
			copyArgs(msg,"DisplayName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			

			svc.updateExperiment(params,cb);
		}
			service.UpdateImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ImageName",params,undefined,false); 
			
			copyArgs(n,"DeleteProperties",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"DisplayName",params,undefined,false); 
			copyArgs(n,"ImageName",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(msg,"DeleteProperties",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DisplayName",params,undefined,false); 
			copyArgs(msg,"ImageName",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			

			svc.updateImage(params,cb);
		}
			service.UpdateModelPackage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ModelPackageArn",params,undefined,false); 
			copyArgs(n,"ModelApprovalStatus",params,undefined,false); 
			
			copyArgs(n,"ModelPackageArn",params,undefined,false); 
			copyArgs(n,"ModelApprovalStatus",params,undefined,false); 
			copyArgs(n,"ApprovalDescription",params,undefined,false); 
			
			copyArgs(msg,"ModelPackageArn",params,undefined,false); 
			copyArgs(msg,"ModelApprovalStatus",params,undefined,false); 
			copyArgs(msg,"ApprovalDescription",params,undefined,false); 
			

			svc.updateModelPackage(params,cb);
		}
			service.UpdateMonitoringSchedule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MonitoringScheduleName",params,undefined,false); 
			copyArgs(n,"MonitoringScheduleConfig",params,undefined,true); 
			
			copyArgs(n,"MonitoringScheduleName",params,undefined,false); 
			copyArgs(n,"MonitoringScheduleConfig",params,undefined,true); 
			
			copyArgs(msg,"MonitoringScheduleName",params,undefined,false); 
			copyArgs(msg,"MonitoringScheduleConfig",params,undefined,true); 
			

			svc.updateMonitoringSchedule(params,cb);
		}
			service.UpdateNotebookInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NotebookInstanceName",params,undefined,false); 
			
			copyArgs(n,"NotebookInstanceName",params,undefined,false); 
			copyArgs(n,"InstanceType",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"LifecycleConfigName",params,undefined,false); 
			copyArgs(Boolean(n),"DisassociateLifecycleConfig",params,undefined,false); 
			copyArgs(Number(n),"VolumeSizeInGB",params,undefined,false); 
			copyArgs(n,"DefaultCodeRepository",params,undefined,false); 
			copyArgs(n,"AdditionalCodeRepositories",params,undefined,true); 
			copyArgs(n,"AcceleratorTypes",params,undefined,true); 
			copyArgs(Boolean(n),"DisassociateAcceleratorTypes",params,undefined,false); 
			copyArgs(Boolean(n),"DisassociateDefaultCodeRepository",params,undefined,false); 
			copyArgs(Boolean(n),"DisassociateAdditionalCodeRepositories",params,undefined,false); 
			copyArgs(n,"RootAccess",params,undefined,false); 
			
			copyArgs(msg,"NotebookInstanceName",params,undefined,false); 
			copyArgs(msg,"InstanceType",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"LifecycleConfigName",params,undefined,false); 
			copyArgs(msg,"DisassociateLifecycleConfig",params,undefined,false); 
			copyArgs(msg,"VolumeSizeInGB",params,undefined,false); 
			copyArgs(msg,"DefaultCodeRepository",params,undefined,false); 
			copyArgs(msg,"AdditionalCodeRepositories",params,undefined,true); 
			copyArgs(msg,"AcceleratorTypes",params,undefined,true); 
			copyArgs(msg,"DisassociateAcceleratorTypes",params,undefined,false); 
			copyArgs(msg,"DisassociateDefaultCodeRepository",params,undefined,false); 
			copyArgs(msg,"DisassociateAdditionalCodeRepositories",params,undefined,false); 
			copyArgs(msg,"RootAccess",params,undefined,false); 
			

			svc.updateNotebookInstance(params,cb);
		}
			service.UpdateNotebookInstanceLifecycleConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NotebookInstanceLifecycleConfigName",params,undefined,false); 
			
			copyArgs(n,"NotebookInstanceLifecycleConfigName",params,undefined,false); 
			copyArgs(n,"OnCreate",params,undefined,true); 
			copyArgs(n,"OnStart",params,undefined,true); 
			
			copyArgs(msg,"NotebookInstanceLifecycleConfigName",params,undefined,false); 
			copyArgs(msg,"OnCreate",params,undefined,true); 
			copyArgs(msg,"OnStart",params,undefined,true); 
			

			svc.updateNotebookInstanceLifecycleConfig(params,cb);
		}
			service.UpdatePipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PipelineName",params,undefined,false); 
			
			copyArgs(n,"PipelineName",params,undefined,false); 
			copyArgs(n,"PipelineDisplayName",params,undefined,false); 
			copyArgs(n,"PipelineDefinition",params,undefined,false); 
			copyArgs(n,"PipelineDescription",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(msg,"PipelineName",params,undefined,false); 
			copyArgs(msg,"PipelineDisplayName",params,undefined,false); 
			copyArgs(msg,"PipelineDefinition",params,undefined,false); 
			copyArgs(msg,"PipelineDescription",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			

			svc.updatePipeline(params,cb);
		}
			service.UpdatePipelineExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PipelineExecutionArn",params,undefined,false); 
			
			copyArgs(n,"PipelineExecutionArn",params,undefined,false); 
			copyArgs(n,"PipelineExecutionDescription",params,undefined,false); 
			copyArgs(n,"PipelineExecutionDisplayName",params,undefined,false); 
			
			copyArgs(msg,"PipelineExecutionArn",params,undefined,false); 
			copyArgs(msg,"PipelineExecutionDescription",params,undefined,false); 
			copyArgs(msg,"PipelineExecutionDisplayName",params,undefined,false); 
			

			svc.updatePipelineExecution(params,cb);
		}
			service.UpdateTrainingJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrainingJobName",params,undefined,false); 
			
			copyArgs(n,"TrainingJobName",params,undefined,false); 
			copyArgs(n,"ProfilerConfig",params,undefined,false); 
			copyArgs(n,"ProfilerRuleConfigurations",params,undefined,true); 
			
			copyArgs(msg,"TrainingJobName",params,undefined,false); 
			copyArgs(msg,"ProfilerConfig",params,undefined,false); 
			copyArgs(msg,"ProfilerRuleConfigurations",params,undefined,true); 
			

			svc.updateTrainingJob(params,cb);
		}
			service.UpdateTrial=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrialName",params,undefined,false); 
			
			copyArgs(n,"TrialName",params,undefined,false); 
			copyArgs(n,"DisplayName",params,undefined,false); 
			
			copyArgs(msg,"TrialName",params,undefined,false); 
			copyArgs(msg,"DisplayName",params,undefined,false); 
			

			svc.updateTrial(params,cb);
		}
			service.UpdateTrialComponent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrialComponentName",params,undefined,false); 
			
			copyArgs(n,"TrialComponentName",params,undefined,false); 
			copyArgs(n,"DisplayName",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,true); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			copyArgs(n,"ParametersToRemove",params,undefined,true); 
			copyArgs(n,"InputArtifacts",params,undefined,true); 
			copyArgs(n,"InputArtifactsToRemove",params,undefined,true); 
			copyArgs(n,"OutputArtifacts",params,undefined,true); 
			copyArgs(n,"OutputArtifactsToRemove",params,undefined,true); 
			
			copyArgs(msg,"TrialComponentName",params,undefined,false); 
			copyArgs(msg,"DisplayName",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,true); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			copyArgs(msg,"ParametersToRemove",params,undefined,true); 
			copyArgs(msg,"InputArtifacts",params,undefined,true); 
			copyArgs(msg,"InputArtifactsToRemove",params,undefined,true); 
			copyArgs(msg,"OutputArtifacts",params,undefined,true); 
			copyArgs(msg,"OutputArtifactsToRemove",params,undefined,true); 
			

			svc.updateTrialComponent(params,cb);
		}
			service.UpdateUserProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainId",params,undefined,false); 
			copyArgs(n,"UserProfileName",params,undefined,false); 
			
			copyArgs(n,"DomainId",params,undefined,false); 
			copyArgs(n,"UserProfileName",params,undefined,false); 
			copyArgs(n,"UserSettings",params,undefined,true); 
			
			copyArgs(msg,"DomainId",params,undefined,false); 
			copyArgs(msg,"UserProfileName",params,undefined,false); 
			copyArgs(msg,"UserSettings",params,undefined,true); 
			

			svc.updateUserProfile(params,cb);
		}
			service.UpdateWorkforce=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkforceName",params,undefined,false); 
			
			copyArgs(n,"WorkforceName",params,undefined,false); 
			copyArgs(n,"SourceIpConfig",params,undefined,true); 
			copyArgs(n,"OidcConfig",params,undefined,true); 
			
			copyArgs(msg,"WorkforceName",params,undefined,false); 
			copyArgs(msg,"SourceIpConfig",params,undefined,true); 
			copyArgs(msg,"OidcConfig",params,undefined,true); 
			

			svc.updateWorkforce(params,cb);
		}
			service.UpdateWorkteam=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkteamName",params,undefined,false); 
			
			copyArgs(n,"WorkteamName",params,undefined,false); 
			copyArgs(n,"MemberDefinitions",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"NotificationConfiguration",params,undefined,true); 
			
			copyArgs(msg,"WorkteamName",params,undefined,false); 
			copyArgs(msg,"MemberDefinitions",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"NotificationConfiguration",params,undefined,true); 
			

			svc.updateWorkteam(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS SageMaker", AmazonAPINode);

};
