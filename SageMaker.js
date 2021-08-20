
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

		var awsService = new AWS.SageMaker( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.SageMaker(msg.AWSConfig) : awsService;

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

		
		service.AddAssociation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceArn",params,undefined,false); 
			copyArg(n,"DestinationArn",params,undefined,false); 
			
			copyArg(msg,"SourceArn",params,undefined,false); 
			copyArg(msg,"DestinationArn",params,undefined,false); 
			copyArg(msg,"AssociationType",params,undefined,false); 
			

			svc.addAssociation(params,cb);
		}

		
		service.AddTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.addTags(params,cb);
		}

		
		service.AssociateTrialComponent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TrialComponentName",params,undefined,false); 
			copyArg(n,"TrialName",params,undefined,false); 
			
			copyArg(msg,"TrialComponentName",params,undefined,false); 
			copyArg(msg,"TrialName",params,undefined,false); 
			

			svc.associateTrialComponent(params,cb);
		}

		
		service.CreateAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ActionName",params,undefined,false); 
			copyArg(n,"Source",params,undefined,true); 
			copyArg(n,"ActionType",params,undefined,false); 
			
			copyArg(msg,"ActionName",params,undefined,false); 
			copyArg(msg,"Source",params,undefined,true); 
			copyArg(msg,"ActionType",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			copyArg(msg,"Properties",params,undefined,true); 
			copyArg(msg,"MetadataProperties",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createAction(params,cb);
		}

		
		service.CreateAlgorithm=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AlgorithmName",params,undefined,false); 
			copyArg(n,"TrainingSpecification",params,undefined,true); 
			
			copyArg(msg,"AlgorithmName",params,undefined,false); 
			copyArg(msg,"AlgorithmDescription",params,undefined,false); 
			copyArg(msg,"TrainingSpecification",params,undefined,true); 
			copyArg(msg,"InferenceSpecification",params,undefined,true); 
			copyArg(msg,"ValidationSpecification",params,undefined,true); 
			copyArg(msg,"CertifyForMarketplace",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createAlgorithm(params,cb);
		}

		
		service.CreateApp=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainId",params,undefined,false); 
			copyArg(n,"UserProfileName",params,undefined,false); 
			copyArg(n,"AppType",params,undefined,false); 
			copyArg(n,"AppName",params,undefined,false); 
			
			copyArg(msg,"DomainId",params,undefined,false); 
			copyArg(msg,"UserProfileName",params,undefined,false); 
			copyArg(msg,"AppType",params,undefined,false); 
			copyArg(msg,"AppName",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"ResourceSpec",params,undefined,true); 
			

			svc.createApp(params,cb);
		}

		
		service.CreateAppImageConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AppImageConfigName",params,undefined,false); 
			
			copyArg(msg,"AppImageConfigName",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"KernelGatewayImageConfig",params,undefined,true); 
			

			svc.createAppImageConfig(params,cb);
		}

		
		service.CreateArtifact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Source",params,undefined,true); 
			copyArg(n,"ArtifactType",params,undefined,false); 
			
			copyArg(msg,"ArtifactName",params,undefined,false); 
			copyArg(msg,"Source",params,undefined,true); 
			copyArg(msg,"ArtifactType",params,undefined,false); 
			copyArg(msg,"Properties",params,undefined,true); 
			copyArg(msg,"MetadataProperties",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createArtifact(params,cb);
		}

		
		service.CreateAutoMLJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoMLJobName",params,undefined,false); 
			copyArg(n,"InputDataConfig",params,undefined,true); 
			copyArg(n,"OutputDataConfig",params,undefined,true); 
			copyArg(n,"RoleArn",params,undefined,false); 
			
			copyArg(msg,"AutoMLJobName",params,undefined,false); 
			copyArg(msg,"InputDataConfig",params,undefined,true); 
			copyArg(msg,"OutputDataConfig",params,undefined,true); 
			copyArg(msg,"ProblemType",params,undefined,false); 
			copyArg(msg,"AutoMLJobObjective",params,undefined,true); 
			copyArg(msg,"AutoMLJobConfig",params,undefined,true); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"GenerateCandidateDefinitionsOnly",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"ModelDeployConfig",params,undefined,true); 
			

			svc.createAutoMLJob(params,cb);
		}

		
		service.CreateCodeRepository=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CodeRepositoryName",params,undefined,false); 
			copyArg(n,"GitConfig",params,undefined,true); 
			
			copyArg(msg,"CodeRepositoryName",params,undefined,false); 
			copyArg(msg,"GitConfig",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createCodeRepository(params,cb);
		}

		
		service.CreateCompilationJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CompilationJobName",params,undefined,false); 
			copyArg(n,"RoleArn",params,undefined,false); 
			copyArg(n,"InputConfig",params,undefined,true); 
			copyArg(n,"OutputConfig",params,undefined,true); 
			copyArg(n,"StoppingCondition",params,undefined,true); 
			
			copyArg(msg,"CompilationJobName",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"InputConfig",params,undefined,true); 
			copyArg(msg,"OutputConfig",params,undefined,true); 
			copyArg(msg,"VpcConfig",params,undefined,true); 
			copyArg(msg,"StoppingCondition",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createCompilationJob(params,cb);
		}

		
		service.CreateContext=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContextName",params,undefined,false); 
			copyArg(n,"Source",params,undefined,true); 
			copyArg(n,"ContextType",params,undefined,false); 
			
			copyArg(msg,"ContextName",params,undefined,false); 
			copyArg(msg,"Source",params,undefined,true); 
			copyArg(msg,"ContextType",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Properties",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createContext(params,cb);
		}

		
		service.CreateDataQualityJobDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobDefinitionName",params,undefined,false); 
			copyArg(n,"DataQualityAppSpecification",params,undefined,true); 
			copyArg(n,"DataQualityJobInput",params,undefined,true); 
			copyArg(n,"DataQualityJobOutputConfig",params,undefined,true); 
			copyArg(n,"JobResources",params,undefined,true); 
			copyArg(n,"RoleArn",params,undefined,false); 
			
			copyArg(msg,"JobDefinitionName",params,undefined,false); 
			copyArg(msg,"DataQualityBaselineConfig",params,undefined,true); 
			copyArg(msg,"DataQualityAppSpecification",params,undefined,true); 
			copyArg(msg,"DataQualityJobInput",params,undefined,true); 
			copyArg(msg,"DataQualityJobOutputConfig",params,undefined,true); 
			copyArg(msg,"JobResources",params,undefined,true); 
			copyArg(msg,"NetworkConfig",params,undefined,true); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"StoppingCondition",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createDataQualityJobDefinition(params,cb);
		}

		
		service.CreateDeviceFleet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeviceFleetName",params,undefined,false); 
			copyArg(n,"OutputConfig",params,undefined,true); 
			
			copyArg(msg,"DeviceFleetName",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"OutputConfig",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"EnableIotRoleAlias",params,undefined,false); 
			

			svc.createDeviceFleet(params,cb);
		}

		
		service.CreateDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			copyArg(n,"AuthMode",params,undefined,false); 
			copyArg(n,"DefaultUserSettings",params,undefined,true); 
			copyArg(n,"SubnetIds",params,undefined,true); 
			copyArg(n,"VpcId",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"AuthMode",params,undefined,false); 
			copyArg(msg,"DefaultUserSettings",params,undefined,true); 
			copyArg(msg,"SubnetIds",params,undefined,true); 
			copyArg(msg,"VpcId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"AppNetworkAccessType",params,undefined,false); 
			copyArg(msg,"HomeEfsFileSystemKmsKeyId",params,undefined,false); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			

			svc.createDomain(params,cb);
		}

		
		service.CreateEdgePackagingJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EdgePackagingJobName",params,undefined,false); 
			copyArg(n,"CompilationJobName",params,undefined,false); 
			copyArg(n,"ModelName",params,undefined,false); 
			copyArg(n,"ModelVersion",params,undefined,false); 
			copyArg(n,"RoleArn",params,undefined,false); 
			copyArg(n,"OutputConfig",params,undefined,true); 
			
			copyArg(msg,"EdgePackagingJobName",params,undefined,false); 
			copyArg(msg,"CompilationJobName",params,undefined,false); 
			copyArg(msg,"ModelName",params,undefined,false); 
			copyArg(msg,"ModelVersion",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"OutputConfig",params,undefined,true); 
			copyArg(msg,"ResourceKey",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createEdgePackagingJob(params,cb);
		}

		
		service.CreateEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndpointName",params,undefined,false); 
			copyArg(n,"EndpointConfigName",params,undefined,false); 
			
			copyArg(msg,"EndpointName",params,undefined,false); 
			copyArg(msg,"EndpointConfigName",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createEndpoint(params,cb);
		}

		
		service.CreateEndpointConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndpointConfigName",params,undefined,false); 
			copyArg(n,"ProductionVariants",params,undefined,true); 
			
			copyArg(msg,"EndpointConfigName",params,undefined,false); 
			copyArg(msg,"ProductionVariants",params,undefined,true); 
			copyArg(msg,"DataCaptureConfig",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"AsyncInferenceConfig",params,undefined,true); 
			

			svc.createEndpointConfig(params,cb);
		}

		
		service.CreateExperiment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ExperimentName",params,undefined,false); 
			
			copyArg(msg,"ExperimentName",params,undefined,false); 
			copyArg(msg,"DisplayName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createExperiment(params,cb);
		}

		
		service.CreateFeatureGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FeatureGroupName",params,undefined,false); 
			copyArg(n,"RecordIdentifierFeatureName",params,undefined,false); 
			copyArg(n,"EventTimeFeatureName",params,undefined,false); 
			copyArg(n,"FeatureDefinitions",params,undefined,true); 
			
			copyArg(msg,"FeatureGroupName",params,undefined,false); 
			copyArg(msg,"RecordIdentifierFeatureName",params,undefined,false); 
			copyArg(msg,"EventTimeFeatureName",params,undefined,false); 
			copyArg(msg,"FeatureDefinitions",params,undefined,true); 
			copyArg(msg,"OnlineStoreConfig",params,undefined,true); 
			copyArg(msg,"OfflineStoreConfig",params,undefined,true); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createFeatureGroup(params,cb);
		}

		
		service.CreateFlowDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FlowDefinitionName",params,undefined,false); 
			copyArg(n,"HumanLoopConfig",params,undefined,true); 
			copyArg(n,"OutputConfig",params,undefined,true); 
			copyArg(n,"RoleArn",params,undefined,false); 
			
			copyArg(msg,"FlowDefinitionName",params,undefined,false); 
			copyArg(msg,"HumanLoopRequestSource",params,undefined,true); 
			copyArg(msg,"HumanLoopActivationConfig",params,undefined,true); 
			copyArg(msg,"HumanLoopConfig",params,undefined,true); 
			copyArg(msg,"OutputConfig",params,undefined,true); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createFlowDefinition(params,cb);
		}

		
		service.CreateHumanTaskUi=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HumanTaskUiName",params,undefined,false); 
			copyArg(n,"UiTemplate",params,undefined,true); 
			
			copyArg(msg,"HumanTaskUiName",params,undefined,false); 
			copyArg(msg,"UiTemplate",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createHumanTaskUi(params,cb);
		}

		
		service.CreateHyperParameterTuningJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HyperParameterTuningJobName",params,undefined,false); 
			copyArg(n,"HyperParameterTuningJobConfig",params,undefined,true); 
			
			copyArg(msg,"HyperParameterTuningJobName",params,undefined,false); 
			copyArg(msg,"HyperParameterTuningJobConfig",params,undefined,true); 
			copyArg(msg,"TrainingJobDefinition",params,undefined,true); 
			copyArg(msg,"TrainingJobDefinitions",params,undefined,true); 
			copyArg(msg,"WarmStartConfig",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createHyperParameterTuningJob(params,cb);
		}

		
		service.CreateImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ImageName",params,undefined,false); 
			copyArg(n,"RoleArn",params,undefined,false); 
			
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DisplayName",params,undefined,false); 
			copyArg(msg,"ImageName",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createImage(params,cb);
		}

		
		service.CreateImageVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BaseImage",params,undefined,false); 
			copyArg(n,"ClientToken",params,undefined,false); 
			copyArg(n,"ImageName",params,undefined,false); 
			
			copyArg(msg,"BaseImage",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"ImageName",params,undefined,false); 
			

			svc.createImageVersion(params,cb);
		}

		
		service.CreateLabelingJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LabelingJobName",params,undefined,false); 
			copyArg(n,"LabelAttributeName",params,undefined,false); 
			copyArg(n,"InputConfig",params,undefined,true); 
			copyArg(n,"OutputConfig",params,undefined,true); 
			copyArg(n,"RoleArn",params,undefined,false); 
			copyArg(n,"HumanTaskConfig",params,undefined,true); 
			
			copyArg(msg,"LabelingJobName",params,undefined,false); 
			copyArg(msg,"LabelAttributeName",params,undefined,false); 
			copyArg(msg,"InputConfig",params,undefined,true); 
			copyArg(msg,"OutputConfig",params,undefined,true); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"LabelCategoryConfigS3Uri",params,undefined,false); 
			copyArg(msg,"StoppingConditions",params,undefined,true); 
			copyArg(msg,"LabelingJobAlgorithmsConfig",params,undefined,true); 
			copyArg(msg,"HumanTaskConfig",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createLabelingJob(params,cb);
		}

		
		service.CreateModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ModelName",params,undefined,false); 
			copyArg(n,"ExecutionRoleArn",params,undefined,false); 
			
			copyArg(msg,"ModelName",params,undefined,false); 
			copyArg(msg,"PrimaryContainer",params,undefined,true); 
			copyArg(msg,"Containers",params,undefined,true); 
			copyArg(msg,"InferenceExecutionConfig",params,undefined,true); 
			copyArg(msg,"ExecutionRoleArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"VpcConfig",params,undefined,true); 
			copyArg(msg,"EnableNetworkIsolation",params,undefined,false); 
			

			svc.createModel(params,cb);
		}

		
		service.CreateModelBiasJobDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobDefinitionName",params,undefined,false); 
			copyArg(n,"ModelBiasAppSpecification",params,undefined,true); 
			copyArg(n,"ModelBiasJobInput",params,undefined,true); 
			copyArg(n,"ModelBiasJobOutputConfig",params,undefined,true); 
			copyArg(n,"JobResources",params,undefined,true); 
			copyArg(n,"RoleArn",params,undefined,false); 
			
			copyArg(msg,"JobDefinitionName",params,undefined,false); 
			copyArg(msg,"ModelBiasBaselineConfig",params,undefined,true); 
			copyArg(msg,"ModelBiasAppSpecification",params,undefined,true); 
			copyArg(msg,"ModelBiasJobInput",params,undefined,true); 
			copyArg(msg,"ModelBiasJobOutputConfig",params,undefined,true); 
			copyArg(msg,"JobResources",params,undefined,true); 
			copyArg(msg,"NetworkConfig",params,undefined,true); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"StoppingCondition",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createModelBiasJobDefinition(params,cb);
		}

		
		service.CreateModelExplainabilityJobDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobDefinitionName",params,undefined,false); 
			copyArg(n,"ModelExplainabilityAppSpecification",params,undefined,true); 
			copyArg(n,"ModelExplainabilityJobInput",params,undefined,true); 
			copyArg(n,"ModelExplainabilityJobOutputConfig",params,undefined,true); 
			copyArg(n,"JobResources",params,undefined,true); 
			copyArg(n,"RoleArn",params,undefined,false); 
			
			copyArg(msg,"JobDefinitionName",params,undefined,false); 
			copyArg(msg,"ModelExplainabilityBaselineConfig",params,undefined,true); 
			copyArg(msg,"ModelExplainabilityAppSpecification",params,undefined,true); 
			copyArg(msg,"ModelExplainabilityJobInput",params,undefined,true); 
			copyArg(msg,"ModelExplainabilityJobOutputConfig",params,undefined,true); 
			copyArg(msg,"JobResources",params,undefined,true); 
			copyArg(msg,"NetworkConfig",params,undefined,true); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"StoppingCondition",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createModelExplainabilityJobDefinition(params,cb);
		}

		
		service.CreateModelPackage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ModelPackageName",params,undefined,false); 
			copyArg(msg,"ModelPackageGroupName",params,undefined,false); 
			copyArg(msg,"ModelPackageDescription",params,undefined,false); 
			copyArg(msg,"InferenceSpecification",params,undefined,true); 
			copyArg(msg,"ValidationSpecification",params,undefined,true); 
			copyArg(msg,"SourceAlgorithmSpecification",params,undefined,true); 
			copyArg(msg,"CertifyForMarketplace",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"ModelApprovalStatus",params,undefined,false); 
			copyArg(msg,"MetadataProperties",params,undefined,true); 
			copyArg(msg,"ModelMetrics",params,undefined,true); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.createModelPackage(params,cb);
		}

		
		service.CreateModelPackageGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ModelPackageGroupName",params,undefined,false); 
			
			copyArg(msg,"ModelPackageGroupName",params,undefined,false); 
			copyArg(msg,"ModelPackageGroupDescription",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createModelPackageGroup(params,cb);
		}

		
		service.CreateModelQualityJobDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobDefinitionName",params,undefined,false); 
			copyArg(n,"ModelQualityAppSpecification",params,undefined,true); 
			copyArg(n,"ModelQualityJobInput",params,undefined,true); 
			copyArg(n,"ModelQualityJobOutputConfig",params,undefined,true); 
			copyArg(n,"JobResources",params,undefined,true); 
			copyArg(n,"RoleArn",params,undefined,false); 
			
			copyArg(msg,"JobDefinitionName",params,undefined,false); 
			copyArg(msg,"ModelQualityBaselineConfig",params,undefined,true); 
			copyArg(msg,"ModelQualityAppSpecification",params,undefined,true); 
			copyArg(msg,"ModelQualityJobInput",params,undefined,true); 
			copyArg(msg,"ModelQualityJobOutputConfig",params,undefined,true); 
			copyArg(msg,"JobResources",params,undefined,true); 
			copyArg(msg,"NetworkConfig",params,undefined,true); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"StoppingCondition",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createModelQualityJobDefinition(params,cb);
		}

		
		service.CreateMonitoringSchedule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MonitoringScheduleName",params,undefined,false); 
			copyArg(n,"MonitoringScheduleConfig",params,undefined,true); 
			
			copyArg(msg,"MonitoringScheduleName",params,undefined,false); 
			copyArg(msg,"MonitoringScheduleConfig",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createMonitoringSchedule(params,cb);
		}

		
		service.CreateNotebookInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NotebookInstanceName",params,undefined,false); 
			copyArg(n,"InstanceType",params,undefined,false); 
			copyArg(n,"RoleArn",params,undefined,false); 
			
			copyArg(msg,"NotebookInstanceName",params,undefined,false); 
			copyArg(msg,"InstanceType",params,undefined,false); 
			copyArg(msg,"SubnetId",params,undefined,false); 
			copyArg(msg,"SecurityGroupIds",params,undefined,true); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"LifecycleConfigName",params,undefined,false); 
			copyArg(msg,"DirectInternetAccess",params,undefined,false); 
			copyArg(msg,"VolumeSizeInGB",params,undefined,false); 
			copyArg(msg,"AcceleratorTypes",params,undefined,true); 
			copyArg(msg,"DefaultCodeRepository",params,undefined,false); 
			copyArg(msg,"AdditionalCodeRepositories",params,undefined,true); 
			copyArg(msg,"RootAccess",params,undefined,false); 
			copyArg(msg,"PlatformIdentifier",params,undefined,false); 
			

			svc.createNotebookInstance(params,cb);
		}

		
		service.CreateNotebookInstanceLifecycleConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NotebookInstanceLifecycleConfigName",params,undefined,false); 
			
			copyArg(msg,"NotebookInstanceLifecycleConfigName",params,undefined,false); 
			copyArg(msg,"OnCreate",params,undefined,true); 
			copyArg(msg,"OnStart",params,undefined,true); 
			

			svc.createNotebookInstanceLifecycleConfig(params,cb);
		}

		
		service.CreatePipeline=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PipelineName",params,undefined,false); 
			copyArg(n,"PipelineDefinition",params,undefined,false); 
			copyArg(n,"ClientRequestToken",params,undefined,false); 
			copyArg(n,"RoleArn",params,undefined,false); 
			
			copyArg(msg,"PipelineName",params,undefined,false); 
			copyArg(msg,"PipelineDisplayName",params,undefined,false); 
			copyArg(msg,"PipelineDefinition",params,undefined,false); 
			copyArg(msg,"PipelineDescription",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createPipeline(params,cb);
		}

		
		service.CreatePresignedDomainUrl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainId",params,undefined,false); 
			copyArg(n,"UserProfileName",params,undefined,false); 
			
			copyArg(msg,"DomainId",params,undefined,false); 
			copyArg(msg,"UserProfileName",params,undefined,false); 
			copyArg(msg,"SessionExpirationDurationInSeconds",params,undefined,false); 
			copyArg(msg,"ExpiresInSeconds",params,undefined,false); 
			

			svc.createPresignedDomainUrl(params,cb);
		}

		
		service.CreatePresignedNotebookInstanceUrl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NotebookInstanceName",params,undefined,false); 
			
			copyArg(msg,"NotebookInstanceName",params,undefined,false); 
			copyArg(msg,"SessionExpirationDurationInSeconds",params,undefined,false); 
			

			svc.createPresignedNotebookInstanceUrl(params,cb);
		}

		
		service.CreateProcessingJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProcessingJobName",params,undefined,false); 
			copyArg(n,"ProcessingResources",params,undefined,true); 
			copyArg(n,"AppSpecification",params,undefined,true); 
			copyArg(n,"RoleArn",params,undefined,false); 
			
			copyArg(msg,"ProcessingInputs",params,undefined,true); 
			copyArg(msg,"ProcessingOutputConfig",params,undefined,true); 
			copyArg(msg,"ProcessingJobName",params,undefined,false); 
			copyArg(msg,"ProcessingResources",params,undefined,true); 
			copyArg(msg,"StoppingCondition",params,undefined,true); 
			copyArg(msg,"AppSpecification",params,undefined,true); 
			copyArg(msg,"Environment",params,undefined,true); 
			copyArg(msg,"NetworkConfig",params,undefined,true); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"ExperimentConfig",params,undefined,true); 
			

			svc.createProcessingJob(params,cb);
		}

		
		service.CreateProject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProjectName",params,undefined,false); 
			copyArg(n,"ServiceCatalogProvisioningDetails",params,undefined,true); 
			
			copyArg(msg,"ProjectName",params,undefined,false); 
			copyArg(msg,"ProjectDescription",params,undefined,false); 
			copyArg(msg,"ServiceCatalogProvisioningDetails",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createProject(params,cb);
		}

		
		service.CreateTrainingJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TrainingJobName",params,undefined,false); 
			copyArg(n,"AlgorithmSpecification",params,undefined,true); 
			copyArg(n,"RoleArn",params,undefined,false); 
			copyArg(n,"OutputDataConfig",params,undefined,true); 
			copyArg(n,"ResourceConfig",params,undefined,true); 
			copyArg(n,"StoppingCondition",params,undefined,true); 
			
			copyArg(msg,"TrainingJobName",params,undefined,false); 
			copyArg(msg,"HyperParameters",params,undefined,true); 
			copyArg(msg,"AlgorithmSpecification",params,undefined,true); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"InputDataConfig",params,undefined,true); 
			copyArg(msg,"OutputDataConfig",params,undefined,true); 
			copyArg(msg,"ResourceConfig",params,undefined,true); 
			copyArg(msg,"VpcConfig",params,undefined,true); 
			copyArg(msg,"StoppingCondition",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"EnableNetworkIsolation",params,undefined,false); 
			copyArg(msg,"EnableInterContainerTrafficEncryption",params,undefined,false); 
			copyArg(msg,"EnableManagedSpotTraining",params,undefined,false); 
			copyArg(msg,"CheckpointConfig",params,undefined,true); 
			copyArg(msg,"DebugHookConfig",params,undefined,true); 
			copyArg(msg,"DebugRuleConfigurations",params,undefined,true); 
			copyArg(msg,"TensorBoardOutputConfig",params,undefined,true); 
			copyArg(msg,"ExperimentConfig",params,undefined,true); 
			copyArg(msg,"ProfilerConfig",params,undefined,true); 
			copyArg(msg,"ProfilerRuleConfigurations",params,undefined,true); 
			copyArg(msg,"Environment",params,undefined,true); 
			copyArg(msg,"RetryStrategy",params,undefined,true); 
			

			svc.createTrainingJob(params,cb);
		}

		
		service.CreateTransformJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TransformJobName",params,undefined,false); 
			copyArg(n,"ModelName",params,undefined,false); 
			copyArg(n,"TransformInput",params,undefined,true); 
			copyArg(n,"TransformOutput",params,undefined,true); 
			copyArg(n,"TransformResources",params,undefined,true); 
			
			copyArg(msg,"TransformJobName",params,undefined,false); 
			copyArg(msg,"ModelName",params,undefined,false); 
			copyArg(msg,"MaxConcurrentTransforms",params,undefined,false); 
			copyArg(msg,"ModelClientConfig",params,undefined,true); 
			copyArg(msg,"MaxPayloadInMB",params,undefined,false); 
			copyArg(msg,"BatchStrategy",params,undefined,false); 
			copyArg(msg,"Environment",params,undefined,true); 
			copyArg(msg,"TransformInput",params,undefined,true); 
			copyArg(msg,"TransformOutput",params,undefined,true); 
			copyArg(msg,"TransformResources",params,undefined,true); 
			copyArg(msg,"DataProcessing",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"ExperimentConfig",params,undefined,true); 
			

			svc.createTransformJob(params,cb);
		}

		
		service.CreateTrial=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TrialName",params,undefined,false); 
			copyArg(n,"ExperimentName",params,undefined,false); 
			
			copyArg(msg,"TrialName",params,undefined,false); 
			copyArg(msg,"DisplayName",params,undefined,false); 
			copyArg(msg,"ExperimentName",params,undefined,false); 
			copyArg(msg,"MetadataProperties",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createTrial(params,cb);
		}

		
		service.CreateTrialComponent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TrialComponentName",params,undefined,false); 
			
			copyArg(msg,"TrialComponentName",params,undefined,false); 
			copyArg(msg,"DisplayName",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,true); 
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,true); 
			copyArg(msg,"InputArtifacts",params,undefined,true); 
			copyArg(msg,"OutputArtifacts",params,undefined,true); 
			copyArg(msg,"MetadataProperties",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createTrialComponent(params,cb);
		}

		
		service.CreateUserProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainId",params,undefined,false); 
			copyArg(n,"UserProfileName",params,undefined,false); 
			
			copyArg(msg,"DomainId",params,undefined,false); 
			copyArg(msg,"UserProfileName",params,undefined,false); 
			copyArg(msg,"SingleSignOnUserIdentifier",params,undefined,false); 
			copyArg(msg,"SingleSignOnUserValue",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"UserSettings",params,undefined,true); 
			

			svc.createUserProfile(params,cb);
		}

		
		service.CreateWorkforce=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkforceName",params,undefined,false); 
			
			copyArg(msg,"CognitoConfig",params,undefined,true); 
			copyArg(msg,"OidcConfig",params,undefined,true); 
			copyArg(msg,"SourceIpConfig",params,undefined,true); 
			copyArg(msg,"WorkforceName",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createWorkforce(params,cb);
		}

		
		service.CreateWorkteam=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkteamName",params,undefined,false); 
			copyArg(n,"MemberDefinitions",params,undefined,true); 
			copyArg(n,"Description",params,undefined,false); 
			
			copyArg(msg,"WorkteamName",params,undefined,false); 
			copyArg(msg,"WorkforceName",params,undefined,false); 
			copyArg(msg,"MemberDefinitions",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"NotificationConfiguration",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createWorkteam(params,cb);
		}

		
		service.DeleteAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ActionName",params,undefined,false); 
			
			copyArg(msg,"ActionName",params,undefined,false); 
			

			svc.deleteAction(params,cb);
		}

		
		service.DeleteAlgorithm=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AlgorithmName",params,undefined,false); 
			
			copyArg(msg,"AlgorithmName",params,undefined,false); 
			

			svc.deleteAlgorithm(params,cb);
		}

		
		service.DeleteApp=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainId",params,undefined,false); 
			copyArg(n,"UserProfileName",params,undefined,false); 
			copyArg(n,"AppType",params,undefined,false); 
			copyArg(n,"AppName",params,undefined,false); 
			
			copyArg(msg,"DomainId",params,undefined,false); 
			copyArg(msg,"UserProfileName",params,undefined,false); 
			copyArg(msg,"AppType",params,undefined,false); 
			copyArg(msg,"AppName",params,undefined,false); 
			

			svc.deleteApp(params,cb);
		}

		
		service.DeleteAppImageConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AppImageConfigName",params,undefined,false); 
			
			copyArg(msg,"AppImageConfigName",params,undefined,false); 
			

			svc.deleteAppImageConfig(params,cb);
		}

		
		service.DeleteArtifact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ArtifactArn",params,undefined,false); 
			copyArg(msg,"Source",params,undefined,true); 
			

			svc.deleteArtifact(params,cb);
		}

		
		service.DeleteAssociation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceArn",params,undefined,false); 
			copyArg(n,"DestinationArn",params,undefined,false); 
			
			copyArg(msg,"SourceArn",params,undefined,false); 
			copyArg(msg,"DestinationArn",params,undefined,false); 
			

			svc.deleteAssociation(params,cb);
		}

		
		service.DeleteCodeRepository=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CodeRepositoryName",params,undefined,false); 
			
			copyArg(msg,"CodeRepositoryName",params,undefined,false); 
			

			svc.deleteCodeRepository(params,cb);
		}

		
		service.DeleteContext=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContextName",params,undefined,false); 
			
			copyArg(msg,"ContextName",params,undefined,false); 
			

			svc.deleteContext(params,cb);
		}

		
		service.DeleteDataQualityJobDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobDefinitionName",params,undefined,false); 
			
			copyArg(msg,"JobDefinitionName",params,undefined,false); 
			

			svc.deleteDataQualityJobDefinition(params,cb);
		}

		
		service.DeleteDeviceFleet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeviceFleetName",params,undefined,false); 
			
			copyArg(msg,"DeviceFleetName",params,undefined,false); 
			

			svc.deleteDeviceFleet(params,cb);
		}

		
		service.DeleteDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainId",params,undefined,false); 
			
			copyArg(msg,"DomainId",params,undefined,false); 
			copyArg(msg,"RetentionPolicy",params,undefined,false); 
			

			svc.deleteDomain(params,cb);
		}

		
		service.DeleteEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndpointName",params,undefined,false); 
			
			copyArg(msg,"EndpointName",params,undefined,false); 
			

			svc.deleteEndpoint(params,cb);
		}

		
		service.DeleteEndpointConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndpointConfigName",params,undefined,false); 
			
			copyArg(msg,"EndpointConfigName",params,undefined,false); 
			

			svc.deleteEndpointConfig(params,cb);
		}

		
		service.DeleteExperiment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ExperimentName",params,undefined,false); 
			
			copyArg(msg,"ExperimentName",params,undefined,false); 
			

			svc.deleteExperiment(params,cb);
		}

		
		service.DeleteFeatureGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FeatureGroupName",params,undefined,false); 
			
			copyArg(msg,"FeatureGroupName",params,undefined,false); 
			

			svc.deleteFeatureGroup(params,cb);
		}

		
		service.DeleteFlowDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FlowDefinitionName",params,undefined,false); 
			
			copyArg(msg,"FlowDefinitionName",params,undefined,false); 
			

			svc.deleteFlowDefinition(params,cb);
		}

		
		service.DeleteHumanTaskUi=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HumanTaskUiName",params,undefined,false); 
			
			copyArg(msg,"HumanTaskUiName",params,undefined,false); 
			

			svc.deleteHumanTaskUi(params,cb);
		}

		
		service.DeleteImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ImageName",params,undefined,false); 
			
			copyArg(msg,"ImageName",params,undefined,false); 
			

			svc.deleteImage(params,cb);
		}

		
		service.DeleteImageVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ImageName",params,undefined,false); 
			copyArg(n,"Version",params,undefined,false); 
			
			copyArg(msg,"ImageName",params,undefined,false); 
			copyArg(msg,"Version",params,undefined,false); 
			

			svc.deleteImageVersion(params,cb);
		}

		
		service.DeleteModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ModelName",params,undefined,false); 
			
			copyArg(msg,"ModelName",params,undefined,false); 
			

			svc.deleteModel(params,cb);
		}

		
		service.DeleteModelBiasJobDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobDefinitionName",params,undefined,false); 
			
			copyArg(msg,"JobDefinitionName",params,undefined,false); 
			

			svc.deleteModelBiasJobDefinition(params,cb);
		}

		
		service.DeleteModelExplainabilityJobDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobDefinitionName",params,undefined,false); 
			
			copyArg(msg,"JobDefinitionName",params,undefined,false); 
			

			svc.deleteModelExplainabilityJobDefinition(params,cb);
		}

		
		service.DeleteModelPackage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ModelPackageName",params,undefined,false); 
			
			copyArg(msg,"ModelPackageName",params,undefined,false); 
			

			svc.deleteModelPackage(params,cb);
		}

		
		service.DeleteModelPackageGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ModelPackageGroupName",params,undefined,false); 
			
			copyArg(msg,"ModelPackageGroupName",params,undefined,false); 
			

			svc.deleteModelPackageGroup(params,cb);
		}

		
		service.DeleteModelPackageGroupPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ModelPackageGroupName",params,undefined,false); 
			
			copyArg(msg,"ModelPackageGroupName",params,undefined,false); 
			

			svc.deleteModelPackageGroupPolicy(params,cb);
		}

		
		service.DeleteModelQualityJobDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobDefinitionName",params,undefined,false); 
			
			copyArg(msg,"JobDefinitionName",params,undefined,false); 
			

			svc.deleteModelQualityJobDefinition(params,cb);
		}

		
		service.DeleteMonitoringSchedule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MonitoringScheduleName",params,undefined,false); 
			
			copyArg(msg,"MonitoringScheduleName",params,undefined,false); 
			

			svc.deleteMonitoringSchedule(params,cb);
		}

		
		service.DeleteNotebookInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NotebookInstanceName",params,undefined,false); 
			
			copyArg(msg,"NotebookInstanceName",params,undefined,false); 
			

			svc.deleteNotebookInstance(params,cb);
		}

		
		service.DeleteNotebookInstanceLifecycleConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NotebookInstanceLifecycleConfigName",params,undefined,false); 
			
			copyArg(msg,"NotebookInstanceLifecycleConfigName",params,undefined,false); 
			

			svc.deleteNotebookInstanceLifecycleConfig(params,cb);
		}

		
		service.DeletePipeline=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PipelineName",params,undefined,false); 
			copyArg(n,"ClientRequestToken",params,undefined,false); 
			
			copyArg(msg,"PipelineName",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.deletePipeline(params,cb);
		}

		
		service.DeleteProject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProjectName",params,undefined,false); 
			
			copyArg(msg,"ProjectName",params,undefined,false); 
			

			svc.deleteProject(params,cb);
		}

		
		service.DeleteTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.deleteTags(params,cb);
		}

		
		service.DeleteTrial=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TrialName",params,undefined,false); 
			
			copyArg(msg,"TrialName",params,undefined,false); 
			

			svc.deleteTrial(params,cb);
		}

		
		service.DeleteTrialComponent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TrialComponentName",params,undefined,false); 
			
			copyArg(msg,"TrialComponentName",params,undefined,false); 
			

			svc.deleteTrialComponent(params,cb);
		}

		
		service.DeleteUserProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainId",params,undefined,false); 
			copyArg(n,"UserProfileName",params,undefined,false); 
			
			copyArg(msg,"DomainId",params,undefined,false); 
			copyArg(msg,"UserProfileName",params,undefined,false); 
			

			svc.deleteUserProfile(params,cb);
		}

		
		service.DeleteWorkforce=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkforceName",params,undefined,false); 
			
			copyArg(msg,"WorkforceName",params,undefined,false); 
			

			svc.deleteWorkforce(params,cb);
		}

		
		service.DeleteWorkteam=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkteamName",params,undefined,false); 
			
			copyArg(msg,"WorkteamName",params,undefined,false); 
			

			svc.deleteWorkteam(params,cb);
		}

		
		service.DeregisterDevices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeviceFleetName",params,undefined,false); 
			copyArg(n,"DeviceNames",params,undefined,false); 
			
			copyArg(msg,"DeviceFleetName",params,undefined,false); 
			copyArg(msg,"DeviceNames",params,undefined,false); 
			

			svc.deregisterDevices(params,cb);
		}

		
		service.DescribeAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ActionName",params,undefined,false); 
			
			copyArg(msg,"ActionName",params,undefined,false); 
			

			svc.describeAction(params,cb);
		}

		
		service.DescribeAlgorithm=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AlgorithmName",params,undefined,false); 
			
			copyArg(msg,"AlgorithmName",params,undefined,false); 
			

			svc.describeAlgorithm(params,cb);
		}

		
		service.DescribeApp=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainId",params,undefined,false); 
			copyArg(n,"UserProfileName",params,undefined,false); 
			copyArg(n,"AppType",params,undefined,false); 
			copyArg(n,"AppName",params,undefined,false); 
			
			copyArg(msg,"DomainId",params,undefined,false); 
			copyArg(msg,"UserProfileName",params,undefined,false); 
			copyArg(msg,"AppType",params,undefined,false); 
			copyArg(msg,"AppName",params,undefined,false); 
			

			svc.describeApp(params,cb);
		}

		
		service.DescribeAppImageConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AppImageConfigName",params,undefined,false); 
			
			copyArg(msg,"AppImageConfigName",params,undefined,false); 
			

			svc.describeAppImageConfig(params,cb);
		}

		
		service.DescribeArtifact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ArtifactArn",params,undefined,false); 
			
			copyArg(msg,"ArtifactArn",params,undefined,false); 
			

			svc.describeArtifact(params,cb);
		}

		
		service.DescribeAutoMLJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoMLJobName",params,undefined,false); 
			
			copyArg(msg,"AutoMLJobName",params,undefined,false); 
			

			svc.describeAutoMLJob(params,cb);
		}

		
		service.DescribeCodeRepository=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CodeRepositoryName",params,undefined,false); 
			
			copyArg(msg,"CodeRepositoryName",params,undefined,false); 
			

			svc.describeCodeRepository(params,cb);
		}

		
		service.DescribeCompilationJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CompilationJobName",params,undefined,false); 
			
			copyArg(msg,"CompilationJobName",params,undefined,false); 
			

			svc.describeCompilationJob(params,cb);
		}

		
		service.DescribeContext=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContextName",params,undefined,false); 
			
			copyArg(msg,"ContextName",params,undefined,false); 
			

			svc.describeContext(params,cb);
		}

		
		service.DescribeDataQualityJobDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobDefinitionName",params,undefined,false); 
			
			copyArg(msg,"JobDefinitionName",params,undefined,false); 
			

			svc.describeDataQualityJobDefinition(params,cb);
		}

		
		service.DescribeDevice=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeviceName",params,undefined,false); 
			copyArg(n,"DeviceFleetName",params,undefined,false); 
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"DeviceName",params,undefined,false); 
			copyArg(msg,"DeviceFleetName",params,undefined,false); 
			

			svc.describeDevice(params,cb);
		}

		
		service.DescribeDeviceFleet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeviceFleetName",params,undefined,false); 
			
			copyArg(msg,"DeviceFleetName",params,undefined,false); 
			

			svc.describeDeviceFleet(params,cb);
		}

		
		service.DescribeDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainId",params,undefined,false); 
			
			copyArg(msg,"DomainId",params,undefined,false); 
			

			svc.describeDomain(params,cb);
		}

		
		service.DescribeEdgePackagingJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EdgePackagingJobName",params,undefined,false); 
			
			copyArg(msg,"EdgePackagingJobName",params,undefined,false); 
			

			svc.describeEdgePackagingJob(params,cb);
		}

		
		service.DescribeEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndpointName",params,undefined,false); 
			
			copyArg(msg,"EndpointName",params,undefined,false); 
			

			svc.describeEndpoint(params,cb);
		}

		
		service.DescribeEndpointConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndpointConfigName",params,undefined,false); 
			
			copyArg(msg,"EndpointConfigName",params,undefined,false); 
			

			svc.describeEndpointConfig(params,cb);
		}

		
		service.DescribeExperiment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ExperimentName",params,undefined,false); 
			
			copyArg(msg,"ExperimentName",params,undefined,false); 
			

			svc.describeExperiment(params,cb);
		}

		
		service.DescribeFeatureGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FeatureGroupName",params,undefined,false); 
			
			copyArg(msg,"FeatureGroupName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeFeatureGroup(params,cb);
		}

		
		service.DescribeFlowDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FlowDefinitionName",params,undefined,false); 
			
			copyArg(msg,"FlowDefinitionName",params,undefined,false); 
			

			svc.describeFlowDefinition(params,cb);
		}

		
		service.DescribeHumanTaskUi=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HumanTaskUiName",params,undefined,false); 
			
			copyArg(msg,"HumanTaskUiName",params,undefined,false); 
			

			svc.describeHumanTaskUi(params,cb);
		}

		
		service.DescribeHyperParameterTuningJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HyperParameterTuningJobName",params,undefined,false); 
			
			copyArg(msg,"HyperParameterTuningJobName",params,undefined,false); 
			

			svc.describeHyperParameterTuningJob(params,cb);
		}

		
		service.DescribeImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ImageName",params,undefined,false); 
			
			copyArg(msg,"ImageName",params,undefined,false); 
			

			svc.describeImage(params,cb);
		}

		
		service.DescribeImageVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ImageName",params,undefined,false); 
			
			copyArg(msg,"ImageName",params,undefined,false); 
			copyArg(msg,"Version",params,undefined,false); 
			

			svc.describeImageVersion(params,cb);
		}

		
		service.DescribeLabelingJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LabelingJobName",params,undefined,false); 
			
			copyArg(msg,"LabelingJobName",params,undefined,false); 
			

			svc.describeLabelingJob(params,cb);
		}

		
		service.DescribeModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ModelName",params,undefined,false); 
			
			copyArg(msg,"ModelName",params,undefined,false); 
			

			svc.describeModel(params,cb);
		}

		
		service.DescribeModelBiasJobDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobDefinitionName",params,undefined,false); 
			
			copyArg(msg,"JobDefinitionName",params,undefined,false); 
			

			svc.describeModelBiasJobDefinition(params,cb);
		}

		
		service.DescribeModelExplainabilityJobDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobDefinitionName",params,undefined,false); 
			
			copyArg(msg,"JobDefinitionName",params,undefined,false); 
			

			svc.describeModelExplainabilityJobDefinition(params,cb);
		}

		
		service.DescribeModelPackage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ModelPackageName",params,undefined,false); 
			
			copyArg(msg,"ModelPackageName",params,undefined,false); 
			

			svc.describeModelPackage(params,cb);
		}

		
		service.DescribeModelPackageGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ModelPackageGroupName",params,undefined,false); 
			
			copyArg(msg,"ModelPackageGroupName",params,undefined,false); 
			

			svc.describeModelPackageGroup(params,cb);
		}

		
		service.DescribeModelQualityJobDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobDefinitionName",params,undefined,false); 
			
			copyArg(msg,"JobDefinitionName",params,undefined,false); 
			

			svc.describeModelQualityJobDefinition(params,cb);
		}

		
		service.DescribeMonitoringSchedule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MonitoringScheduleName",params,undefined,false); 
			
			copyArg(msg,"MonitoringScheduleName",params,undefined,false); 
			

			svc.describeMonitoringSchedule(params,cb);
		}

		
		service.DescribeNotebookInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NotebookInstanceName",params,undefined,false); 
			
			copyArg(msg,"NotebookInstanceName",params,undefined,false); 
			

			svc.describeNotebookInstance(params,cb);
		}

		
		service.DescribeNotebookInstanceLifecycleConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NotebookInstanceLifecycleConfigName",params,undefined,false); 
			
			copyArg(msg,"NotebookInstanceLifecycleConfigName",params,undefined,false); 
			

			svc.describeNotebookInstanceLifecycleConfig(params,cb);
		}

		
		service.DescribePipeline=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PipelineName",params,undefined,false); 
			
			copyArg(msg,"PipelineName",params,undefined,false); 
			

			svc.describePipeline(params,cb);
		}

		
		service.DescribePipelineDefinitionForExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PipelineExecutionArn",params,undefined,false); 
			
			copyArg(msg,"PipelineExecutionArn",params,undefined,false); 
			

			svc.describePipelineDefinitionForExecution(params,cb);
		}

		
		service.DescribePipelineExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PipelineExecutionArn",params,undefined,false); 
			
			copyArg(msg,"PipelineExecutionArn",params,undefined,false); 
			

			svc.describePipelineExecution(params,cb);
		}

		
		service.DescribeProcessingJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProcessingJobName",params,undefined,false); 
			
			copyArg(msg,"ProcessingJobName",params,undefined,false); 
			

			svc.describeProcessingJob(params,cb);
		}

		
		service.DescribeProject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProjectName",params,undefined,false); 
			
			copyArg(msg,"ProjectName",params,undefined,false); 
			

			svc.describeProject(params,cb);
		}

		
		service.DescribeSubscribedWorkteam=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkteamArn",params,undefined,false); 
			
			copyArg(msg,"WorkteamArn",params,undefined,false); 
			

			svc.describeSubscribedWorkteam(params,cb);
		}

		
		service.DescribeTrainingJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TrainingJobName",params,undefined,false); 
			
			copyArg(msg,"TrainingJobName",params,undefined,false); 
			

			svc.describeTrainingJob(params,cb);
		}

		
		service.DescribeTransformJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TransformJobName",params,undefined,false); 
			
			copyArg(msg,"TransformJobName",params,undefined,false); 
			

			svc.describeTransformJob(params,cb);
		}

		
		service.DescribeTrial=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TrialName",params,undefined,false); 
			
			copyArg(msg,"TrialName",params,undefined,false); 
			

			svc.describeTrial(params,cb);
		}

		
		service.DescribeTrialComponent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TrialComponentName",params,undefined,false); 
			
			copyArg(msg,"TrialComponentName",params,undefined,false); 
			

			svc.describeTrialComponent(params,cb);
		}

		
		service.DescribeUserProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainId",params,undefined,false); 
			copyArg(n,"UserProfileName",params,undefined,false); 
			
			copyArg(msg,"DomainId",params,undefined,false); 
			copyArg(msg,"UserProfileName",params,undefined,false); 
			

			svc.describeUserProfile(params,cb);
		}

		
		service.DescribeWorkforce=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkforceName",params,undefined,false); 
			
			copyArg(msg,"WorkforceName",params,undefined,false); 
			

			svc.describeWorkforce(params,cb);
		}

		
		service.DescribeWorkteam=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkteamName",params,undefined,false); 
			
			copyArg(msg,"WorkteamName",params,undefined,false); 
			

			svc.describeWorkteam(params,cb);
		}

		
		service.DisableSagemakerServicecatalogPortfolio=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.disableSagemakerServicecatalogPortfolio(params,cb);
		}

		
		service.DisassociateTrialComponent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TrialComponentName",params,undefined,false); 
			copyArg(n,"TrialName",params,undefined,false); 
			
			copyArg(msg,"TrialComponentName",params,undefined,false); 
			copyArg(msg,"TrialName",params,undefined,false); 
			

			svc.disassociateTrialComponent(params,cb);
		}

		
		service.EnableSagemakerServicecatalogPortfolio=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.enableSagemakerServicecatalogPortfolio(params,cb);
		}

		
		service.GetDeviceFleetReport=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeviceFleetName",params,undefined,false); 
			
			copyArg(msg,"DeviceFleetName",params,undefined,false); 
			

			svc.getDeviceFleetReport(params,cb);
		}

		
		service.GetModelPackageGroupPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ModelPackageGroupName",params,undefined,false); 
			
			copyArg(msg,"ModelPackageGroupName",params,undefined,false); 
			

			svc.getModelPackageGroupPolicy(params,cb);
		}

		
		service.GetSagemakerServicecatalogPortfolioStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getSagemakerServicecatalogPortfolioStatus(params,cb);
		}

		
		service.GetSearchSuggestions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Resource",params,undefined,false); 
			
			copyArg(msg,"Resource",params,undefined,false); 
			copyArg(msg,"SuggestionQuery",params,undefined,false); 
			

			svc.getSearchSuggestions(params,cb);
		}

		
		service.ListActions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SourceUri",params,undefined,false); 
			copyArg(msg,"ActionType",params,undefined,false); 
			copyArg(msg,"CreatedAfter",params,undefined,false); 
			copyArg(msg,"CreatedBefore",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listActions(params,cb);
		}

		
		service.ListAlgorithms=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			

			svc.listAlgorithms(params,cb);
		}

		
		service.ListAppImageConfigs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			copyArg(msg,"ModifiedTimeBefore",params,undefined,false); 
			copyArg(msg,"ModifiedTimeAfter",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			

			svc.listAppImageConfigs(params,cb);
		}

		
		service.ListApps=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"DomainIdEquals",params,undefined,false); 
			copyArg(msg,"UserProfileNameEquals",params,undefined,false); 
			

			svc.listApps(params,cb);
		}

		
		service.ListArtifacts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SourceUri",params,undefined,false); 
			copyArg(msg,"ArtifactType",params,undefined,false); 
			copyArg(msg,"CreatedAfter",params,undefined,false); 
			copyArg(msg,"CreatedBefore",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listArtifacts(params,cb);
		}

		
		service.ListAssociations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SourceArn",params,undefined,false); 
			copyArg(msg,"DestinationArn",params,undefined,false); 
			copyArg(msg,"SourceType",params,undefined,false); 
			copyArg(msg,"DestinationType",params,undefined,false); 
			copyArg(msg,"AssociationType",params,undefined,false); 
			copyArg(msg,"CreatedAfter",params,undefined,false); 
			copyArg(msg,"CreatedBefore",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listAssociations(params,cb);
		}

		
		service.ListAutoMLJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"StatusEquals",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listAutoMLJobs(params,cb);
		}

		
		service.ListCandidatesForAutoMLJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoMLJobName",params,undefined,false); 
			
			copyArg(msg,"AutoMLJobName",params,undefined,false); 
			copyArg(msg,"StatusEquals",params,undefined,false); 
			copyArg(msg,"CandidateNameEquals",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listCandidatesForAutoMLJob(params,cb);
		}

		
		service.ListCodeRepositories=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			

			svc.listCodeRepositories(params,cb);
		}

		
		service.ListCompilationJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"StatusEquals",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			

			svc.listCompilationJobs(params,cb);
		}

		
		service.ListContexts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SourceUri",params,undefined,false); 
			copyArg(msg,"ContextType",params,undefined,false); 
			copyArg(msg,"CreatedAfter",params,undefined,false); 
			copyArg(msg,"CreatedBefore",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listContexts(params,cb);
		}

		
		service.ListDataQualityJobDefinitions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"EndpointName",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			

			svc.listDataQualityJobDefinitions(params,cb);
		}

		
		service.ListDeviceFleets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			

			svc.listDeviceFleets(params,cb);
		}

		
		service.ListDevices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"LatestHeartbeatAfter",params,undefined,false); 
			copyArg(msg,"ModelName",params,undefined,false); 
			copyArg(msg,"DeviceFleetName",params,undefined,false); 
			

			svc.listDevices(params,cb);
		}

		
		service.ListDomains=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listDomains(params,cb);
		}

		
		service.ListEdgePackagingJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"ModelNameContains",params,undefined,false); 
			copyArg(msg,"StatusEquals",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			

			svc.listEdgePackagingJobs(params,cb);
		}

		
		service.ListEndpointConfigs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			

			svc.listEndpointConfigs(params,cb);
		}

		
		service.ListEndpoints=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArg(msg,"StatusEquals",params,undefined,false); 
			

			svc.listEndpoints(params,cb);
		}

		
		service.ListExperiments=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CreatedAfter",params,undefined,false); 
			copyArg(msg,"CreatedBefore",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listExperiments(params,cb);
		}

		
		service.ListFeatureGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"FeatureGroupStatusEquals",params,undefined,false); 
			copyArg(msg,"OfflineStoreStatusEquals",params,undefined,false); 
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listFeatureGroups(params,cb);
		}

		
		service.ListFlowDefinitions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listFlowDefinitions(params,cb);
		}

		
		service.ListHumanTaskUis=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listHumanTaskUis(params,cb);
		}

		
		service.ListHyperParameterTuningJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArg(msg,"StatusEquals",params,undefined,false); 
			

			svc.listHyperParameterTuningJobs(params,cb);
		}

		
		service.ListImageVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ImageName",params,undefined,false); 
			
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"ImageName",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			

			svc.listImageVersions(params,cb);
		}

		
		service.ListImages=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			

			svc.listImages(params,cb);
		}

		
		service.ListLabelingJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"StatusEquals",params,undefined,false); 
			

			svc.listLabelingJobs(params,cb);
		}

		
		service.ListLabelingJobsForWorkteam=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkteamArn",params,undefined,false); 
			
			copyArg(msg,"WorkteamArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"JobReferenceCodeContains",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			

			svc.listLabelingJobsForWorkteam(params,cb);
		}

		
		service.ListModelBiasJobDefinitions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"EndpointName",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			

			svc.listModelBiasJobDefinitions(params,cb);
		}

		
		service.ListModelExplainabilityJobDefinitions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"EndpointName",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			

			svc.listModelExplainabilityJobDefinitions(params,cb);
		}

		
		service.ListModelPackageGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			

			svc.listModelPackageGroups(params,cb);
		}

		
		service.ListModelPackages=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"ModelApprovalStatus",params,undefined,false); 
			copyArg(msg,"ModelPackageGroupName",params,undefined,false); 
			copyArg(msg,"ModelPackageType",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			

			svc.listModelPackages(params,cb);
		}

		
		service.ListModelQualityJobDefinitions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"EndpointName",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			

			svc.listModelQualityJobDefinitions(params,cb);
		}

		
		service.ListModels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			

			svc.listModels(params,cb);
		}

		
		service.ListMonitoringExecutions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MonitoringScheduleName",params,undefined,false); 
			copyArg(msg,"EndpointName",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"ScheduledTimeBefore",params,undefined,false); 
			copyArg(msg,"ScheduledTimeAfter",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArg(msg,"StatusEquals",params,undefined,false); 
			copyArg(msg,"MonitoringJobDefinitionName",params,undefined,false); 
			copyArg(msg,"MonitoringTypeEquals",params,undefined,false); 
			

			svc.listMonitoringExecutions(params,cb);
		}

		
		service.ListMonitoringSchedules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"EndpointName",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArg(msg,"StatusEquals",params,undefined,false); 
			copyArg(msg,"MonitoringJobDefinitionName",params,undefined,false); 
			copyArg(msg,"MonitoringTypeEquals",params,undefined,false); 
			

			svc.listMonitoringSchedules(params,cb);
		}

		
		service.ListNotebookInstanceLifecycleConfigs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeAfter",params,undefined,false); 
			

			svc.listNotebookInstanceLifecycleConfigs(params,cb);
		}

		
		service.ListNotebookInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArg(msg,"StatusEquals",params,undefined,false); 
			copyArg(msg,"NotebookInstanceLifecycleConfigNameContains",params,undefined,false); 
			copyArg(msg,"DefaultCodeRepositoryContains",params,undefined,false); 
			copyArg(msg,"AdditionalCodeRepositoryEquals",params,undefined,false); 
			

			svc.listNotebookInstances(params,cb);
		}

		
		service.ListPipelineExecutionSteps=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"PipelineExecutionArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			

			svc.listPipelineExecutionSteps(params,cb);
		}

		
		service.ListPipelineExecutions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PipelineName",params,undefined,false); 
			
			copyArg(msg,"PipelineName",params,undefined,false); 
			copyArg(msg,"CreatedAfter",params,undefined,false); 
			copyArg(msg,"CreatedBefore",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listPipelineExecutions(params,cb);
		}

		
		service.ListPipelineParametersForExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PipelineExecutionArn",params,undefined,false); 
			
			copyArg(msg,"PipelineExecutionArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listPipelineParametersForExecution(params,cb);
		}

		
		service.ListPipelines=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"PipelineNamePrefix",params,undefined,false); 
			copyArg(msg,"CreatedAfter",params,undefined,false); 
			copyArg(msg,"CreatedBefore",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listPipelines(params,cb);
		}

		
		service.ListProcessingJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"StatusEquals",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listProcessingJobs(params,cb);
		}

		
		service.ListProjects=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			

			svc.listProjects(params,cb);
		}

		
		service.ListSubscribedWorkteams=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listSubscribedWorkteams(params,cb);
		}

		
		service.ListTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listTags(params,cb);
		}

		
		service.ListTrainingJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"StatusEquals",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			

			svc.listTrainingJobs(params,cb);
		}

		
		service.ListTrainingJobsForHyperParameterTuningJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HyperParameterTuningJobName",params,undefined,false); 
			
			copyArg(msg,"HyperParameterTuningJobName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"StatusEquals",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			

			svc.listTrainingJobsForHyperParameterTuningJob(params,cb);
		}

		
		service.ListTransformJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CreationTimeAfter",params,undefined,false); 
			copyArg(msg,"CreationTimeBefore",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeAfter",params,undefined,false); 
			copyArg(msg,"LastModifiedTimeBefore",params,undefined,false); 
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"StatusEquals",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listTransformJobs(params,cb);
		}

		
		service.ListTrialComponents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ExperimentName",params,undefined,false); 
			copyArg(msg,"TrialName",params,undefined,false); 
			copyArg(msg,"SourceArn",params,undefined,false); 
			copyArg(msg,"CreatedAfter",params,undefined,false); 
			copyArg(msg,"CreatedBefore",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listTrialComponents(params,cb);
		}

		
		service.ListTrials=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ExperimentName",params,undefined,false); 
			copyArg(msg,"TrialComponentName",params,undefined,false); 
			copyArg(msg,"CreatedAfter",params,undefined,false); 
			copyArg(msg,"CreatedBefore",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listTrials(params,cb);
		}

		
		service.ListUserProfiles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"DomainIdEquals",params,undefined,false); 
			copyArg(msg,"UserProfileNameContains",params,undefined,false); 
			

			svc.listUserProfiles(params,cb);
		}

		
		service.ListWorkforces=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listWorkforces(params,cb);
		}

		
		service.ListWorkteams=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NameContains",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listWorkteams(params,cb);
		}

		
		service.PutModelPackageGroupPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ModelPackageGroupName",params,undefined,false); 
			copyArg(n,"ResourcePolicy",params,undefined,false); 
			
			copyArg(msg,"ModelPackageGroupName",params,undefined,false); 
			copyArg(msg,"ResourcePolicy",params,undefined,false); 
			

			svc.putModelPackageGroupPolicy(params,cb);
		}

		
		service.RegisterDevices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeviceFleetName",params,undefined,false); 
			copyArg(n,"Devices",params,undefined,true); 
			
			copyArg(msg,"DeviceFleetName",params,undefined,false); 
			copyArg(msg,"Devices",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.registerDevices(params,cb);
		}

		
		service.RenderUiTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Task",params,undefined,false); 
			copyArg(n,"RoleArn",params,undefined,false); 
			
			copyArg(msg,"UiTemplate",params,undefined,true); 
			copyArg(msg,"Task",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"HumanTaskUiArn",params,undefined,false); 
			

			svc.renderUiTemplate(params,cb);
		}

		
		service.Search=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Resource",params,undefined,false); 
			
			copyArg(msg,"Resource",params,undefined,false); 
			copyArg(msg,"SearchExpression",params,undefined,true); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.search(params,cb);
		}

		
		service.SendPipelineExecutionStepFailure=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CallbackToken",params,undefined,false); 
			
			copyArg(msg,"CallbackToken",params,undefined,false); 
			copyArg(msg,"FailureReason",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.sendPipelineExecutionStepFailure(params,cb);
		}

		
		service.SendPipelineExecutionStepSuccess=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CallbackToken",params,undefined,false); 
			
			copyArg(msg,"CallbackToken",params,undefined,false); 
			copyArg(msg,"OutputParameters",params,undefined,true); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.sendPipelineExecutionStepSuccess(params,cb);
		}

		
		service.StartMonitoringSchedule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MonitoringScheduleName",params,undefined,false); 
			
			copyArg(msg,"MonitoringScheduleName",params,undefined,false); 
			

			svc.startMonitoringSchedule(params,cb);
		}

		
		service.StartNotebookInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NotebookInstanceName",params,undefined,false); 
			
			copyArg(msg,"NotebookInstanceName",params,undefined,false); 
			

			svc.startNotebookInstance(params,cb);
		}

		
		service.StartPipelineExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PipelineName",params,undefined,false); 
			copyArg(n,"ClientRequestToken",params,undefined,false); 
			
			copyArg(msg,"PipelineName",params,undefined,false); 
			copyArg(msg,"PipelineExecutionDisplayName",params,undefined,false); 
			copyArg(msg,"PipelineParameters",params,undefined,true); 
			copyArg(msg,"PipelineExecutionDescription",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.startPipelineExecution(params,cb);
		}

		
		service.StopAutoMLJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoMLJobName",params,undefined,false); 
			
			copyArg(msg,"AutoMLJobName",params,undefined,false); 
			

			svc.stopAutoMLJob(params,cb);
		}

		
		service.StopCompilationJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CompilationJobName",params,undefined,false); 
			
			copyArg(msg,"CompilationJobName",params,undefined,false); 
			

			svc.stopCompilationJob(params,cb);
		}

		
		service.StopEdgePackagingJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EdgePackagingJobName",params,undefined,false); 
			
			copyArg(msg,"EdgePackagingJobName",params,undefined,false); 
			

			svc.stopEdgePackagingJob(params,cb);
		}

		
		service.StopHyperParameterTuningJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HyperParameterTuningJobName",params,undefined,false); 
			
			copyArg(msg,"HyperParameterTuningJobName",params,undefined,false); 
			

			svc.stopHyperParameterTuningJob(params,cb);
		}

		
		service.StopLabelingJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LabelingJobName",params,undefined,false); 
			
			copyArg(msg,"LabelingJobName",params,undefined,false); 
			

			svc.stopLabelingJob(params,cb);
		}

		
		service.StopMonitoringSchedule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MonitoringScheduleName",params,undefined,false); 
			
			copyArg(msg,"MonitoringScheduleName",params,undefined,false); 
			

			svc.stopMonitoringSchedule(params,cb);
		}

		
		service.StopNotebookInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NotebookInstanceName",params,undefined,false); 
			
			copyArg(msg,"NotebookInstanceName",params,undefined,false); 
			

			svc.stopNotebookInstance(params,cb);
		}

		
		service.StopPipelineExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PipelineExecutionArn",params,undefined,false); 
			copyArg(n,"ClientRequestToken",params,undefined,false); 
			
			copyArg(msg,"PipelineExecutionArn",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.stopPipelineExecution(params,cb);
		}

		
		service.StopProcessingJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProcessingJobName",params,undefined,false); 
			
			copyArg(msg,"ProcessingJobName",params,undefined,false); 
			

			svc.stopProcessingJob(params,cb);
		}

		
		service.StopTrainingJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TrainingJobName",params,undefined,false); 
			
			copyArg(msg,"TrainingJobName",params,undefined,false); 
			

			svc.stopTrainingJob(params,cb);
		}

		
		service.StopTransformJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TransformJobName",params,undefined,false); 
			
			copyArg(msg,"TransformJobName",params,undefined,false); 
			

			svc.stopTransformJob(params,cb);
		}

		
		service.UpdateAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ActionName",params,undefined,false); 
			
			copyArg(msg,"ActionName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			copyArg(msg,"Properties",params,undefined,true); 
			copyArg(msg,"PropertiesToRemove",params,undefined,true); 
			

			svc.updateAction(params,cb);
		}

		
		service.UpdateAppImageConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AppImageConfigName",params,undefined,false); 
			
			copyArg(msg,"AppImageConfigName",params,undefined,false); 
			copyArg(msg,"KernelGatewayImageConfig",params,undefined,true); 
			

			svc.updateAppImageConfig(params,cb);
		}

		
		service.UpdateArtifact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ArtifactArn",params,undefined,false); 
			
			copyArg(msg,"ArtifactArn",params,undefined,false); 
			copyArg(msg,"ArtifactName",params,undefined,false); 
			copyArg(msg,"Properties",params,undefined,true); 
			copyArg(msg,"PropertiesToRemove",params,undefined,true); 
			

			svc.updateArtifact(params,cb);
		}

		
		service.UpdateCodeRepository=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CodeRepositoryName",params,undefined,false); 
			
			copyArg(msg,"CodeRepositoryName",params,undefined,false); 
			copyArg(msg,"GitConfig",params,undefined,false); 
			

			svc.updateCodeRepository(params,cb);
		}

		
		service.UpdateContext=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContextName",params,undefined,false); 
			
			copyArg(msg,"ContextName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Properties",params,undefined,true); 
			copyArg(msg,"PropertiesToRemove",params,undefined,true); 
			

			svc.updateContext(params,cb);
		}

		
		service.UpdateDeviceFleet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeviceFleetName",params,undefined,false); 
			copyArg(n,"OutputConfig",params,undefined,true); 
			
			copyArg(msg,"DeviceFleetName",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"OutputConfig",params,undefined,true); 
			copyArg(msg,"EnableIotRoleAlias",params,undefined,false); 
			

			svc.updateDeviceFleet(params,cb);
		}

		
		service.UpdateDevices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeviceFleetName",params,undefined,false); 
			copyArg(n,"Devices",params,undefined,true); 
			
			copyArg(msg,"DeviceFleetName",params,undefined,false); 
			copyArg(msg,"Devices",params,undefined,true); 
			

			svc.updateDevices(params,cb);
		}

		
		service.UpdateDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainId",params,undefined,false); 
			
			copyArg(msg,"DomainId",params,undefined,false); 
			copyArg(msg,"DefaultUserSettings",params,undefined,true); 
			

			svc.updateDomain(params,cb);
		}

		
		service.UpdateEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndpointName",params,undefined,false); 
			copyArg(n,"EndpointConfigName",params,undefined,false); 
			
			copyArg(msg,"EndpointName",params,undefined,false); 
			copyArg(msg,"EndpointConfigName",params,undefined,false); 
			copyArg(msg,"RetainAllVariantProperties",params,undefined,false); 
			copyArg(msg,"ExcludeRetainedVariantProperties",params,undefined,false); 
			copyArg(msg,"DeploymentConfig",params,undefined,true); 
			

			svc.updateEndpoint(params,cb);
		}

		
		service.UpdateEndpointWeightsAndCapacities=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndpointName",params,undefined,false); 
			copyArg(n,"DesiredWeightsAndCapacities",params,undefined,false); 
			
			copyArg(msg,"EndpointName",params,undefined,false); 
			copyArg(msg,"DesiredWeightsAndCapacities",params,undefined,false); 
			

			svc.updateEndpointWeightsAndCapacities(params,cb);
		}

		
		service.UpdateExperiment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ExperimentName",params,undefined,false); 
			
			copyArg(msg,"ExperimentName",params,undefined,false); 
			copyArg(msg,"DisplayName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			

			svc.updateExperiment(params,cb);
		}

		
		service.UpdateImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ImageName",params,undefined,false); 
			
			copyArg(msg,"DeleteProperties",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DisplayName",params,undefined,false); 
			copyArg(msg,"ImageName",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			

			svc.updateImage(params,cb);
		}

		
		service.UpdateModelPackage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ModelPackageArn",params,undefined,false); 
			copyArg(n,"ModelApprovalStatus",params,undefined,false); 
			
			copyArg(msg,"ModelPackageArn",params,undefined,false); 
			copyArg(msg,"ModelApprovalStatus",params,undefined,false); 
			copyArg(msg,"ApprovalDescription",params,undefined,false); 
			

			svc.updateModelPackage(params,cb);
		}

		
		service.UpdateMonitoringSchedule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MonitoringScheduleName",params,undefined,false); 
			copyArg(n,"MonitoringScheduleConfig",params,undefined,true); 
			
			copyArg(msg,"MonitoringScheduleName",params,undefined,false); 
			copyArg(msg,"MonitoringScheduleConfig",params,undefined,true); 
			

			svc.updateMonitoringSchedule(params,cb);
		}

		
		service.UpdateNotebookInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NotebookInstanceName",params,undefined,false); 
			
			copyArg(msg,"NotebookInstanceName",params,undefined,false); 
			copyArg(msg,"InstanceType",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"LifecycleConfigName",params,undefined,false); 
			copyArg(msg,"DisassociateLifecycleConfig",params,undefined,false); 
			copyArg(msg,"VolumeSizeInGB",params,undefined,false); 
			copyArg(msg,"DefaultCodeRepository",params,undefined,false); 
			copyArg(msg,"AdditionalCodeRepositories",params,undefined,true); 
			copyArg(msg,"AcceleratorTypes",params,undefined,true); 
			copyArg(msg,"DisassociateAcceleratorTypes",params,undefined,false); 
			copyArg(msg,"DisassociateDefaultCodeRepository",params,undefined,false); 
			copyArg(msg,"DisassociateAdditionalCodeRepositories",params,undefined,false); 
			copyArg(msg,"RootAccess",params,undefined,false); 
			

			svc.updateNotebookInstance(params,cb);
		}

		
		service.UpdateNotebookInstanceLifecycleConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NotebookInstanceLifecycleConfigName",params,undefined,false); 
			
			copyArg(msg,"NotebookInstanceLifecycleConfigName",params,undefined,false); 
			copyArg(msg,"OnCreate",params,undefined,true); 
			copyArg(msg,"OnStart",params,undefined,true); 
			

			svc.updateNotebookInstanceLifecycleConfig(params,cb);
		}

		
		service.UpdatePipeline=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PipelineName",params,undefined,false); 
			
			copyArg(msg,"PipelineName",params,undefined,false); 
			copyArg(msg,"PipelineDisplayName",params,undefined,false); 
			copyArg(msg,"PipelineDefinition",params,undefined,false); 
			copyArg(msg,"PipelineDescription",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			

			svc.updatePipeline(params,cb);
		}

		
		service.UpdatePipelineExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PipelineExecutionArn",params,undefined,false); 
			
			copyArg(msg,"PipelineExecutionArn",params,undefined,false); 
			copyArg(msg,"PipelineExecutionDescription",params,undefined,false); 
			copyArg(msg,"PipelineExecutionDisplayName",params,undefined,false); 
			

			svc.updatePipelineExecution(params,cb);
		}

		
		service.UpdateTrainingJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TrainingJobName",params,undefined,false); 
			
			copyArg(msg,"TrainingJobName",params,undefined,false); 
			copyArg(msg,"ProfilerConfig",params,undefined,false); 
			copyArg(msg,"ProfilerRuleConfigurations",params,undefined,true); 
			

			svc.updateTrainingJob(params,cb);
		}

		
		service.UpdateTrial=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TrialName",params,undefined,false); 
			
			copyArg(msg,"TrialName",params,undefined,false); 
			copyArg(msg,"DisplayName",params,undefined,false); 
			

			svc.updateTrial(params,cb);
		}

		
		service.UpdateTrialComponent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TrialComponentName",params,undefined,false); 
			
			copyArg(msg,"TrialComponentName",params,undefined,false); 
			copyArg(msg,"DisplayName",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,true); 
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,true); 
			copyArg(msg,"ParametersToRemove",params,undefined,true); 
			copyArg(msg,"InputArtifacts",params,undefined,true); 
			copyArg(msg,"InputArtifactsToRemove",params,undefined,true); 
			copyArg(msg,"OutputArtifacts",params,undefined,true); 
			copyArg(msg,"OutputArtifactsToRemove",params,undefined,true); 
			

			svc.updateTrialComponent(params,cb);
		}

		
		service.UpdateUserProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainId",params,undefined,false); 
			copyArg(n,"UserProfileName",params,undefined,false); 
			
			copyArg(msg,"DomainId",params,undefined,false); 
			copyArg(msg,"UserProfileName",params,undefined,false); 
			copyArg(msg,"UserSettings",params,undefined,true); 
			

			svc.updateUserProfile(params,cb);
		}

		
		service.UpdateWorkforce=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkforceName",params,undefined,false); 
			
			copyArg(msg,"WorkforceName",params,undefined,false); 
			copyArg(msg,"SourceIpConfig",params,undefined,true); 
			copyArg(msg,"OidcConfig",params,undefined,true); 
			

			svc.updateWorkforce(params,cb);
		}

		
		service.UpdateWorkteam=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkteamName",params,undefined,false); 
			
			copyArg(msg,"WorkteamName",params,undefined,false); 
			copyArg(msg,"MemberDefinitions",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"NotificationConfiguration",params,undefined,true); 
			

			svc.updateWorkteam(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS SageMaker", AmazonAPINode);

};
