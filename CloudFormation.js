
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

		var awsService = new AWS.CloudFormation( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.CloudFormation(msg.AWSConfig) : awsService;

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

		
		service.ActivateType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"PublicTypeArn",params,undefined,false); 
			copyArg(msg,"PublisherId",params,undefined,false); 
			copyArg(msg,"TypeName",params,undefined,false); 
			copyArg(msg,"TypeNameAlias",params,undefined,false); 
			copyArg(msg,"AutoUpdate",params,undefined,false); 
			copyArg(msg,"LoggingConfig",params,undefined,true); 
			copyArg(msg,"ExecutionRoleArn",params,undefined,false); 
			copyArg(msg,"VersionBump",params,undefined,false); 
			copyArg(msg,"MajorVersion",params,undefined,false); 
			

			svc.activateType(params,cb);
		}

		
		service.BatchDescribeTypeConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TypeConfigurationIdentifiers",params,undefined,false); 
			
			copyArg(msg,"TypeConfigurationIdentifiers",params,undefined,false); 
			

			svc.batchDescribeTypeConfigurations(params,cb);
		}

		
		service.CancelUpdateStack=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackName",params,undefined,false); 
			
			copyArg(msg,"StackName",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.cancelUpdateStack(params,cb);
		}

		
		service.ContinueUpdateRollback=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackName",params,undefined,false); 
			
			copyArg(msg,"StackName",params,undefined,false); 
			copyArg(msg,"RoleARN",params,undefined,false); 
			copyArg(msg,"ResourcesToSkip",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.continueUpdateRollback(params,cb);
		}

		
		service.CreateChangeSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackName",params,undefined,false); 
			copyArg(n,"ChangeSetName",params,undefined,false); 
			
			copyArg(msg,"StackName",params,undefined,false); 
			copyArg(msg,"TemplateBody",params,undefined,false); 
			copyArg(msg,"TemplateURL",params,undefined,false); 
			copyArg(msg,"UsePreviousTemplate",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,true); 
			copyArg(msg,"Capabilities",params,undefined,true); 
			copyArg(msg,"ResourceTypes",params,undefined,true); 
			copyArg(msg,"RoleARN",params,undefined,false); 
			copyArg(msg,"RollbackConfiguration",params,undefined,true); 
			copyArg(msg,"NotificationARNs",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"ChangeSetName",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"ChangeSetType",params,undefined,false); 
			copyArg(msg,"ResourcesToImport",params,undefined,false); 
			copyArg(msg,"IncludeNestedStacks",params,undefined,false); 
			

			svc.createChangeSet(params,cb);
		}

		
		service.CreateStack=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackName",params,undefined,false); 
			
			copyArg(msg,"StackName",params,undefined,false); 
			copyArg(msg,"TemplateBody",params,undefined,false); 
			copyArg(msg,"TemplateURL",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,true); 
			copyArg(msg,"DisableRollback",params,undefined,false); 
			copyArg(msg,"RollbackConfiguration",params,undefined,true); 
			copyArg(msg,"TimeoutInMinutes",params,undefined,false); 
			copyArg(msg,"NotificationARNs",params,undefined,true); 
			copyArg(msg,"Capabilities",params,undefined,true); 
			copyArg(msg,"ResourceTypes",params,undefined,true); 
			copyArg(msg,"RoleARN",params,undefined,false); 
			copyArg(msg,"OnFailure",params,undefined,false); 
			copyArg(msg,"StackPolicyBody",params,undefined,false); 
			copyArg(msg,"StackPolicyURL",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"EnableTerminationProtection",params,undefined,false); 
			

			svc.createStack(params,cb);
		}

		
		service.CreateStackInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackSetName",params,undefined,false); 
			copyArg(n,"Regions",params,undefined,true); 
			
			copyArg(msg,"StackSetName",params,undefined,false); 
			copyArg(msg,"Accounts",params,undefined,true); 
			copyArg(msg,"DeploymentTargets",params,undefined,true); 
			copyArg(msg,"Regions",params,undefined,true); 
			copyArg(msg,"ParameterOverrides",params,undefined,true); 
			copyArg(msg,"OperationPreferences",params,undefined,true); 
			copyArg(msg,"OperationId",params,undefined,false); 
			copyArg(msg,"CallAs",params,undefined,false); 
			

			svc.createStackInstances(params,cb);
		}

		
		service.CreateStackSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackSetName",params,undefined,false); 
			
			copyArg(msg,"StackSetName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"TemplateBody",params,undefined,false); 
			copyArg(msg,"TemplateURL",params,undefined,false); 
			copyArg(msg,"StackId",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,true); 
			copyArg(msg,"Capabilities",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"AdministrationRoleARN",params,undefined,false); 
			copyArg(msg,"ExecutionRoleName",params,undefined,false); 
			copyArg(msg,"PermissionModel",params,undefined,false); 
			copyArg(msg,"AutoDeployment",params,undefined,true); 
			copyArg(msg,"CallAs",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.createStackSet(params,cb);
		}

		
		service.DeactivateType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"TypeName",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"Arn",params,undefined,false); 
			

			svc.deactivateType(params,cb);
		}

		
		service.DeleteChangeSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChangeSetName",params,undefined,false); 
			
			copyArg(msg,"ChangeSetName",params,undefined,false); 
			copyArg(msg,"StackName",params,undefined,false); 
			

			svc.deleteChangeSet(params,cb);
		}

		
		service.DeleteStack=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackName",params,undefined,false); 
			
			copyArg(msg,"StackName",params,undefined,false); 
			copyArg(msg,"RetainResources",params,undefined,false); 
			copyArg(msg,"RoleARN",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.deleteStack(params,cb);
		}

		
		service.DeleteStackInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackSetName",params,undefined,false); 
			copyArg(n,"Regions",params,undefined,true); 
			copyArg(n,"RetainStacks",params,undefined,false); 
			
			copyArg(msg,"StackSetName",params,undefined,false); 
			copyArg(msg,"Accounts",params,undefined,true); 
			copyArg(msg,"DeploymentTargets",params,undefined,true); 
			copyArg(msg,"Regions",params,undefined,true); 
			copyArg(msg,"OperationPreferences",params,undefined,true); 
			copyArg(msg,"RetainStacks",params,undefined,false); 
			copyArg(msg,"OperationId",params,undefined,false); 
			copyArg(msg,"CallAs",params,undefined,false); 
			

			svc.deleteStackInstances(params,cb);
		}

		
		service.DeleteStackSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackSetName",params,undefined,false); 
			
			copyArg(msg,"StackSetName",params,undefined,false); 
			copyArg(msg,"CallAs",params,undefined,false); 
			

			svc.deleteStackSet(params,cb);
		}

		
		service.DeregisterType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Arn",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"TypeName",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			

			svc.deregisterType(params,cb);
		}

		
		service.DescribeAccountLimits=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeAccountLimits(params,cb);
		}

		
		service.DescribeChangeSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChangeSetName",params,undefined,false); 
			
			copyArg(msg,"ChangeSetName",params,undefined,false); 
			copyArg(msg,"StackName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeChangeSet(params,cb);
		}

		
		service.DescribePublisher=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"PublisherId",params,undefined,false); 
			

			svc.describePublisher(params,cb);
		}

		
		service.DescribeStackDriftDetectionStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackDriftDetectionId",params,undefined,false); 
			
			copyArg(msg,"StackDriftDetectionId",params,undefined,false); 
			

			svc.describeStackDriftDetectionStatus(params,cb);
		}

		
		service.DescribeStackEvents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"StackName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeStackEvents(params,cb);
		}

		
		service.DescribeStackInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackSetName",params,undefined,false); 
			copyArg(n,"StackInstanceAccount",params,undefined,false); 
			copyArg(n,"StackInstanceRegion",params,undefined,false); 
			
			copyArg(msg,"StackSetName",params,undefined,false); 
			copyArg(msg,"StackInstanceAccount",params,undefined,false); 
			copyArg(msg,"StackInstanceRegion",params,undefined,false); 
			copyArg(msg,"CallAs",params,undefined,false); 
			

			svc.describeStackInstance(params,cb);
		}

		
		service.DescribeStackResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackName",params,undefined,false); 
			copyArg(n,"LogicalResourceId",params,undefined,false); 
			
			copyArg(msg,"StackName",params,undefined,false); 
			copyArg(msg,"LogicalResourceId",params,undefined,false); 
			

			svc.describeStackResource(params,cb);
		}

		
		service.DescribeStackResourceDrifts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackName",params,undefined,false); 
			
			copyArg(msg,"StackName",params,undefined,false); 
			copyArg(msg,"StackResourceDriftStatusFilters",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describeStackResourceDrifts(params,cb);
		}

		
		service.DescribeStackResources=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"StackName",params,undefined,false); 
			copyArg(msg,"LogicalResourceId",params,undefined,false); 
			copyArg(msg,"PhysicalResourceId",params,undefined,false); 
			

			svc.describeStackResources(params,cb);
		}

		
		service.DescribeStackSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackSetName",params,undefined,false); 
			
			copyArg(msg,"StackSetName",params,undefined,false); 
			copyArg(msg,"CallAs",params,undefined,false); 
			

			svc.describeStackSet(params,cb);
		}

		
		service.DescribeStackSetOperation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackSetName",params,undefined,false); 
			copyArg(n,"OperationId",params,undefined,false); 
			
			copyArg(msg,"StackSetName",params,undefined,false); 
			copyArg(msg,"OperationId",params,undefined,false); 
			copyArg(msg,"CallAs",params,undefined,false); 
			

			svc.describeStackSetOperation(params,cb);
		}

		
		service.DescribeStacks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"StackName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeStacks(params,cb);
		}

		
		service.DescribeType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"TypeName",params,undefined,false); 
			copyArg(msg,"Arn",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			copyArg(msg,"PublisherId",params,undefined,false); 
			copyArg(msg,"PublicVersionNumber",params,undefined,false); 
			

			svc.describeType(params,cb);
		}

		
		service.DescribeTypeRegistration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RegistrationToken",params,undefined,false); 
			
			copyArg(msg,"RegistrationToken",params,undefined,false); 
			

			svc.describeTypeRegistration(params,cb);
		}

		
		service.DetectStackDrift=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackName",params,undefined,false); 
			
			copyArg(msg,"StackName",params,undefined,false); 
			copyArg(msg,"LogicalResourceIds",params,undefined,true); 
			

			svc.detectStackDrift(params,cb);
		}

		
		service.DetectStackResourceDrift=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackName",params,undefined,false); 
			copyArg(n,"LogicalResourceId",params,undefined,false); 
			
			copyArg(msg,"StackName",params,undefined,false); 
			copyArg(msg,"LogicalResourceId",params,undefined,false); 
			

			svc.detectStackResourceDrift(params,cb);
		}

		
		service.DetectStackSetDrift=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackSetName",params,undefined,false); 
			
			copyArg(msg,"StackSetName",params,undefined,false); 
			copyArg(msg,"OperationPreferences",params,undefined,true); 
			copyArg(msg,"OperationId",params,undefined,false); 
			copyArg(msg,"CallAs",params,undefined,false); 
			

			svc.detectStackSetDrift(params,cb);
		}

		
		service.EstimateTemplateCost=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"TemplateBody",params,undefined,false); 
			copyArg(msg,"TemplateURL",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,true); 
			

			svc.estimateTemplateCost(params,cb);
		}

		
		service.ExecuteChangeSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChangeSetName",params,undefined,false); 
			
			copyArg(msg,"ChangeSetName",params,undefined,false); 
			copyArg(msg,"StackName",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.executeChangeSet(params,cb);
		}

		
		service.GetStackPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackName",params,undefined,false); 
			
			copyArg(msg,"StackName",params,undefined,false); 
			

			svc.getStackPolicy(params,cb);
		}

		
		service.GetTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"StackName",params,undefined,false); 
			copyArg(msg,"ChangeSetName",params,undefined,false); 
			copyArg(msg,"TemplateStage",params,undefined,false); 
			

			svc.getTemplate(params,cb);
		}

		
		service.GetTemplateSummary=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"TemplateBody",params,undefined,false); 
			copyArg(msg,"TemplateURL",params,undefined,false); 
			copyArg(msg,"StackName",params,undefined,false); 
			copyArg(msg,"StackSetName",params,undefined,false); 
			copyArg(msg,"CallAs",params,undefined,false); 
			

			svc.getTemplateSummary(params,cb);
		}

		
		service.ImportStacksToStackSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackSetName",params,undefined,false); 
			copyArg(n,"StackIds",params,undefined,false); 
			
			copyArg(msg,"StackSetName",params,undefined,false); 
			copyArg(msg,"StackIds",params,undefined,false); 
			copyArg(msg,"OperationPreferences",params,undefined,true); 
			copyArg(msg,"OperationId",params,undefined,false); 
			copyArg(msg,"CallAs",params,undefined,false); 
			

			svc.importStacksToStackSet(params,cb);
		}

		
		service.ListChangeSets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackName",params,undefined,false); 
			
			copyArg(msg,"StackName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listChangeSets(params,cb);
		}

		
		service.ListExports=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listExports(params,cb);
		}

		
		service.ListImports=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ExportName",params,undefined,false); 
			
			copyArg(msg,"ExportName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listImports(params,cb);
		}

		
		service.ListStackInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackSetName",params,undefined,false); 
			
			copyArg(msg,"StackSetName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"StackInstanceAccount",params,undefined,false); 
			copyArg(msg,"StackInstanceRegion",params,undefined,false); 
			copyArg(msg,"CallAs",params,undefined,false); 
			

			svc.listStackInstances(params,cb);
		}

		
		service.ListStackResources=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackName",params,undefined,false); 
			
			copyArg(msg,"StackName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listStackResources(params,cb);
		}

		
		service.ListStackSetOperationResults=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackSetName",params,undefined,false); 
			copyArg(n,"OperationId",params,undefined,false); 
			
			copyArg(msg,"StackSetName",params,undefined,false); 
			copyArg(msg,"OperationId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"CallAs",params,undefined,false); 
			

			svc.listStackSetOperationResults(params,cb);
		}

		
		service.ListStackSetOperations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackSetName",params,undefined,false); 
			
			copyArg(msg,"StackSetName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"CallAs",params,undefined,false); 
			

			svc.listStackSetOperations(params,cb);
		}

		
		service.ListStackSets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			copyArg(msg,"CallAs",params,undefined,false); 
			

			svc.listStackSets(params,cb);
		}

		
		service.ListStacks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"StackStatusFilter",params,undefined,false); 
			

			svc.listStacks(params,cb);
		}

		
		service.ListTypeRegistrations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"TypeName",params,undefined,false); 
			copyArg(msg,"TypeArn",params,undefined,false); 
			copyArg(msg,"RegistrationStatusFilter",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listTypeRegistrations(params,cb);
		}

		
		service.ListTypeVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"TypeName",params,undefined,false); 
			copyArg(msg,"Arn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"DeprecatedStatus",params,undefined,false); 
			copyArg(msg,"PublisherId",params,undefined,false); 
			

			svc.listTypeVersions(params,cb);
		}

		
		service.ListTypes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Visibility",params,undefined,false); 
			copyArg(msg,"ProvisioningType",params,undefined,false); 
			copyArg(msg,"DeprecatedStatus",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listTypes(params,cb);
		}

		
		service.PublishType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"Arn",params,undefined,false); 
			copyArg(msg,"TypeName",params,undefined,false); 
			copyArg(msg,"PublicVersionNumber",params,undefined,false); 
			

			svc.publishType(params,cb);
		}

		
		service.RecordHandlerProgress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BearerToken",params,undefined,false); 
			copyArg(n,"OperationStatus",params,undefined,false); 
			
			copyArg(msg,"BearerToken",params,undefined,false); 
			copyArg(msg,"OperationStatus",params,undefined,false); 
			copyArg(msg,"CurrentOperationStatus",params,undefined,false); 
			copyArg(msg,"StatusMessage",params,undefined,false); 
			copyArg(msg,"ErrorCode",params,undefined,false); 
			copyArg(msg,"ResourceModel",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.recordHandlerProgress(params,cb);
		}

		
		service.RegisterPublisher=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AcceptTermsAndConditions",params,undefined,false); 
			copyArg(msg,"ConnectionArn",params,undefined,false); 
			

			svc.registerPublisher(params,cb);
		}

		
		service.RegisterType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TypeName",params,undefined,false); 
			copyArg(n,"SchemaHandlerPackage",params,undefined,false); 
			
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"TypeName",params,undefined,false); 
			copyArg(msg,"SchemaHandlerPackage",params,undefined,false); 
			copyArg(msg,"LoggingConfig",params,undefined,true); 
			copyArg(msg,"ExecutionRoleArn",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.registerType(params,cb);
		}

		
		service.SetStackPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackName",params,undefined,false); 
			
			copyArg(msg,"StackName",params,undefined,false); 
			copyArg(msg,"StackPolicyBody",params,undefined,false); 
			copyArg(msg,"StackPolicyURL",params,undefined,false); 
			

			svc.setStackPolicy(params,cb);
		}

		
		service.SetTypeConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Configuration",params,undefined,false); 
			
			copyArg(msg,"TypeArn",params,undefined,false); 
			copyArg(msg,"Configuration",params,undefined,false); 
			copyArg(msg,"ConfigurationAlias",params,undefined,false); 
			copyArg(msg,"TypeName",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			

			svc.setTypeConfiguration(params,cb);
		}

		
		service.SetTypeDefaultVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Arn",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"TypeName",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			

			svc.setTypeDefaultVersion(params,cb);
		}

		
		service.SignalResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackName",params,undefined,false); 
			copyArg(n,"LogicalResourceId",params,undefined,false); 
			copyArg(n,"UniqueId",params,undefined,false); 
			copyArg(n,"Status",params,undefined,false); 
			
			copyArg(msg,"StackName",params,undefined,false); 
			copyArg(msg,"LogicalResourceId",params,undefined,false); 
			copyArg(msg,"UniqueId",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			

			svc.signalResource(params,cb);
		}

		
		service.StopStackSetOperation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackSetName",params,undefined,false); 
			copyArg(n,"OperationId",params,undefined,false); 
			
			copyArg(msg,"StackSetName",params,undefined,false); 
			copyArg(msg,"OperationId",params,undefined,false); 
			copyArg(msg,"CallAs",params,undefined,false); 
			

			svc.stopStackSetOperation(params,cb);
		}

		
		service.TestType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Arn",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"TypeName",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			copyArg(msg,"LogDeliveryBucket",params,undefined,false); 
			

			svc.testType(params,cb);
		}

		
		service.UpdateStack=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackName",params,undefined,false); 
			
			copyArg(msg,"StackName",params,undefined,false); 
			copyArg(msg,"TemplateBody",params,undefined,false); 
			copyArg(msg,"TemplateURL",params,undefined,false); 
			copyArg(msg,"UsePreviousTemplate",params,undefined,false); 
			copyArg(msg,"StackPolicyDuringUpdateBody",params,undefined,false); 
			copyArg(msg,"StackPolicyDuringUpdateURL",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,true); 
			copyArg(msg,"Capabilities",params,undefined,true); 
			copyArg(msg,"ResourceTypes",params,undefined,true); 
			copyArg(msg,"RoleARN",params,undefined,false); 
			copyArg(msg,"RollbackConfiguration",params,undefined,true); 
			copyArg(msg,"StackPolicyBody",params,undefined,false); 
			copyArg(msg,"StackPolicyURL",params,undefined,false); 
			copyArg(msg,"NotificationARNs",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.updateStack(params,cb);
		}

		
		service.UpdateStackInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackSetName",params,undefined,false); 
			copyArg(n,"Regions",params,undefined,true); 
			
			copyArg(msg,"StackSetName",params,undefined,false); 
			copyArg(msg,"Accounts",params,undefined,true); 
			copyArg(msg,"DeploymentTargets",params,undefined,true); 
			copyArg(msg,"Regions",params,undefined,true); 
			copyArg(msg,"ParameterOverrides",params,undefined,true); 
			copyArg(msg,"OperationPreferences",params,undefined,true); 
			copyArg(msg,"OperationId",params,undefined,false); 
			copyArg(msg,"CallAs",params,undefined,false); 
			

			svc.updateStackInstances(params,cb);
		}

		
		service.UpdateStackSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackSetName",params,undefined,false); 
			
			copyArg(msg,"StackSetName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"TemplateBody",params,undefined,false); 
			copyArg(msg,"TemplateURL",params,undefined,false); 
			copyArg(msg,"UsePreviousTemplate",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,true); 
			copyArg(msg,"Capabilities",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"OperationPreferences",params,undefined,true); 
			copyArg(msg,"AdministrationRoleARN",params,undefined,false); 
			copyArg(msg,"ExecutionRoleName",params,undefined,false); 
			copyArg(msg,"DeploymentTargets",params,undefined,true); 
			copyArg(msg,"PermissionModel",params,undefined,false); 
			copyArg(msg,"AutoDeployment",params,undefined,true); 
			copyArg(msg,"OperationId",params,undefined,false); 
			copyArg(msg,"Accounts",params,undefined,true); 
			copyArg(msg,"Regions",params,undefined,true); 
			copyArg(msg,"CallAs",params,undefined,false); 
			

			svc.updateStackSet(params,cb);
		}

		
		service.UpdateTerminationProtection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EnableTerminationProtection",params,undefined,false); 
			copyArg(n,"StackName",params,undefined,false); 
			
			copyArg(msg,"EnableTerminationProtection",params,undefined,false); 
			copyArg(msg,"StackName",params,undefined,false); 
			

			svc.updateTerminationProtection(params,cb);
		}

		
		service.ValidateTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"TemplateBody",params,undefined,false); 
			copyArg(msg,"TemplateURL",params,undefined,false); 
			

			svc.validateTemplate(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS CloudFormation", AmazonAPINode);

};
