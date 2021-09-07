
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

		var awsService = new AWS.CloudFormation( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.CloudFormation(msg.AWSConfig) : awsService;

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

		
		service.ActivateType=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"PublicTypeArn",params,undefined,false); 
			copyArgs(n,"PublisherId",params,undefined,false); 
			copyArgs(n,"TypeName",params,undefined,false); 
			copyArgs(n,"TypeNameAlias",params,undefined,false); 
			copyArgs(n,"AutoUpdate",params,undefined,false); 
			copyArgs(n,"LoggingConfig",params,undefined,true); 
			copyArgs(n,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(n,"VersionBump",params,undefined,false); 
			copyArgs(n,"MajorVersion",params,undefined,false); 
			
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"PublicTypeArn",params,undefined,false); 
			copyArgs(msg,"PublisherId",params,undefined,false); 
			copyArgs(msg,"TypeName",params,undefined,false); 
			copyArgs(msg,"TypeNameAlias",params,undefined,false); 
			copyArgs(msg,"AutoUpdate",params,undefined,false); 
			copyArgs(msg,"LoggingConfig",params,undefined,true); 
			copyArgs(msg,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(msg,"VersionBump",params,undefined,false); 
			copyArgs(msg,"MajorVersion",params,undefined,false); 
			

			svc.activateType(params,cb);
		}

		
		service.BatchDescribeTypeConfigurations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TypeConfigurationIdentifiers",params,undefined,false); 
			
			copyArgs(n,"TypeConfigurationIdentifiers",params,undefined,false); 
			
			copyArgs(msg,"TypeConfigurationIdentifiers",params,undefined,false); 
			

			svc.batchDescribeTypeConfigurations(params,cb);
		}

		
		service.CancelUpdateStack=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackName",params,undefined,false); 
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"StackName",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.cancelUpdateStack(params,cb);
		}

		
		service.ContinueUpdateRollback=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackName",params,undefined,false); 
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"RoleARN",params,undefined,false); 
			copyArgs(n,"ResourcesToSkip",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"StackName",params,undefined,false); 
			copyArgs(msg,"RoleARN",params,undefined,false); 
			copyArgs(msg,"ResourcesToSkip",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.continueUpdateRollback(params,cb);
		}

		
		service.CreateChangeSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"ChangeSetName",params,undefined,false); 
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"TemplateBody",params,undefined,false); 
			copyArgs(n,"TemplateURL",params,undefined,false); 
			copyArgs(n,"UsePreviousTemplate",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			copyArgs(n,"Capabilities",params,undefined,true); 
			copyArgs(n,"ResourceTypes",params,undefined,true); 
			copyArgs(n,"RoleARN",params,undefined,false); 
			copyArgs(n,"RollbackConfiguration",params,undefined,true); 
			copyArgs(n,"NotificationARNs",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"ChangeSetName",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"ChangeSetType",params,undefined,false); 
			copyArgs(n,"ResourcesToImport",params,undefined,false); 
			copyArgs(n,"IncludeNestedStacks",params,undefined,false); 
			
			copyArgs(msg,"StackName",params,undefined,false); 
			copyArgs(msg,"TemplateBody",params,undefined,false); 
			copyArgs(msg,"TemplateURL",params,undefined,false); 
			copyArgs(msg,"UsePreviousTemplate",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			copyArgs(msg,"Capabilities",params,undefined,true); 
			copyArgs(msg,"ResourceTypes",params,undefined,true); 
			copyArgs(msg,"RoleARN",params,undefined,false); 
			copyArgs(msg,"RollbackConfiguration",params,undefined,true); 
			copyArgs(msg,"NotificationARNs",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"ChangeSetName",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"ChangeSetType",params,undefined,false); 
			copyArgs(msg,"ResourcesToImport",params,undefined,false); 
			copyArgs(msg,"IncludeNestedStacks",params,undefined,false); 
			

			svc.createChangeSet(params,cb);
		}

		
		service.CreateStack=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackName",params,undefined,false); 
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"TemplateBody",params,undefined,false); 
			copyArgs(n,"TemplateURL",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			copyArgs(n,"DisableRollback",params,undefined,false); 
			copyArgs(n,"RollbackConfiguration",params,undefined,true); 
			copyArgs(n,"TimeoutInMinutes",params,undefined,false); 
			copyArgs(n,"NotificationARNs",params,undefined,true); 
			copyArgs(n,"Capabilities",params,undefined,true); 
			copyArgs(n,"ResourceTypes",params,undefined,true); 
			copyArgs(n,"RoleARN",params,undefined,false); 
			copyArgs(n,"OnFailure",params,undefined,false); 
			copyArgs(n,"StackPolicyBody",params,undefined,false); 
			copyArgs(n,"StackPolicyURL",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"EnableTerminationProtection",params,undefined,false); 
			
			copyArgs(msg,"StackName",params,undefined,false); 
			copyArgs(msg,"TemplateBody",params,undefined,false); 
			copyArgs(msg,"TemplateURL",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			copyArgs(msg,"DisableRollback",params,undefined,false); 
			copyArgs(msg,"RollbackConfiguration",params,undefined,true); 
			copyArgs(msg,"TimeoutInMinutes",params,undefined,false); 
			copyArgs(msg,"NotificationARNs",params,undefined,true); 
			copyArgs(msg,"Capabilities",params,undefined,true); 
			copyArgs(msg,"ResourceTypes",params,undefined,true); 
			copyArgs(msg,"RoleARN",params,undefined,false); 
			copyArgs(msg,"OnFailure",params,undefined,false); 
			copyArgs(msg,"StackPolicyBody",params,undefined,false); 
			copyArgs(msg,"StackPolicyURL",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"EnableTerminationProtection",params,undefined,false); 
			

			svc.createStack(params,cb);
		}

		
		service.CreateStackInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			copyArgs(n,"Regions",params,undefined,true); 
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			copyArgs(n,"Accounts",params,undefined,true); 
			copyArgs(n,"DeploymentTargets",params,undefined,true); 
			copyArgs(n,"Regions",params,undefined,true); 
			copyArgs(n,"ParameterOverrides",params,undefined,true); 
			copyArgs(n,"OperationPreferences",params,undefined,true); 
			copyArgs(n,"OperationId",params,undefined,false); 
			copyArgs(n,"CallAs",params,undefined,false); 
			
			copyArgs(msg,"StackSetName",params,undefined,false); 
			copyArgs(msg,"Accounts",params,undefined,true); 
			copyArgs(msg,"DeploymentTargets",params,undefined,true); 
			copyArgs(msg,"Regions",params,undefined,true); 
			copyArgs(msg,"ParameterOverrides",params,undefined,true); 
			copyArgs(msg,"OperationPreferences",params,undefined,true); 
			copyArgs(msg,"OperationId",params,undefined,false); 
			copyArgs(msg,"CallAs",params,undefined,false); 
			

			svc.createStackInstances(params,cb);
		}

		
		service.CreateStackSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"TemplateBody",params,undefined,false); 
			copyArgs(n,"TemplateURL",params,undefined,false); 
			copyArgs(n,"StackId",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			copyArgs(n,"Capabilities",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"AdministrationRoleARN",params,undefined,false); 
			copyArgs(n,"ExecutionRoleName",params,undefined,false); 
			copyArgs(n,"PermissionModel",params,undefined,false); 
			copyArgs(n,"AutoDeployment",params,undefined,true); 
			copyArgs(n,"CallAs",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"StackSetName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"TemplateBody",params,undefined,false); 
			copyArgs(msg,"TemplateURL",params,undefined,false); 
			copyArgs(msg,"StackId",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			copyArgs(msg,"Capabilities",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"AdministrationRoleARN",params,undefined,false); 
			copyArgs(msg,"ExecutionRoleName",params,undefined,false); 
			copyArgs(msg,"PermissionModel",params,undefined,false); 
			copyArgs(msg,"AutoDeployment",params,undefined,true); 
			copyArgs(msg,"CallAs",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.createStackSet(params,cb);
		}

		
		service.DeactivateType=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TypeName",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(msg,"TypeName",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"Arn",params,undefined,false); 
			

			svc.deactivateType(params,cb);
		}

		
		service.DeleteChangeSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChangeSetName",params,undefined,false); 
			
			copyArgs(n,"ChangeSetName",params,undefined,false); 
			copyArgs(n,"StackName",params,undefined,false); 
			
			copyArgs(msg,"ChangeSetName",params,undefined,false); 
			copyArgs(msg,"StackName",params,undefined,false); 
			

			svc.deleteChangeSet(params,cb);
		}

		
		service.DeleteStack=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackName",params,undefined,false); 
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"RetainResources",params,undefined,false); 
			copyArgs(n,"RoleARN",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"StackName",params,undefined,false); 
			copyArgs(msg,"RetainResources",params,undefined,false); 
			copyArgs(msg,"RoleARN",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.deleteStack(params,cb);
		}

		
		service.DeleteStackInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			copyArgs(n,"Regions",params,undefined,true); 
			copyArgs(n,"RetainStacks",params,undefined,false); 
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			copyArgs(n,"Accounts",params,undefined,true); 
			copyArgs(n,"DeploymentTargets",params,undefined,true); 
			copyArgs(n,"Regions",params,undefined,true); 
			copyArgs(n,"OperationPreferences",params,undefined,true); 
			copyArgs(n,"RetainStacks",params,undefined,false); 
			copyArgs(n,"OperationId",params,undefined,false); 
			copyArgs(n,"CallAs",params,undefined,false); 
			
			copyArgs(msg,"StackSetName",params,undefined,false); 
			copyArgs(msg,"Accounts",params,undefined,true); 
			copyArgs(msg,"DeploymentTargets",params,undefined,true); 
			copyArgs(msg,"Regions",params,undefined,true); 
			copyArgs(msg,"OperationPreferences",params,undefined,true); 
			copyArgs(msg,"RetainStacks",params,undefined,false); 
			copyArgs(msg,"OperationId",params,undefined,false); 
			copyArgs(msg,"CallAs",params,undefined,false); 
			

			svc.deleteStackInstances(params,cb);
		}

		
		service.DeleteStackSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			copyArgs(n,"CallAs",params,undefined,false); 
			
			copyArgs(msg,"StackSetName",params,undefined,false); 
			copyArgs(msg,"CallAs",params,undefined,false); 
			

			svc.deleteStackSet(params,cb);
		}

		
		service.DeregisterType=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"TypeName",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"TypeName",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			

			svc.deregisterType(params,cb);
		}

		
		service.DescribeAccountLimits=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeAccountLimits(params,cb);
		}

		
		service.DescribeChangeSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChangeSetName",params,undefined,false); 
			
			copyArgs(n,"ChangeSetName",params,undefined,false); 
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ChangeSetName",params,undefined,false); 
			copyArgs(msg,"StackName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeChangeSet(params,cb);
		}

		
		service.DescribePublisher=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"PublisherId",params,undefined,false); 
			
			copyArgs(msg,"PublisherId",params,undefined,false); 
			

			svc.describePublisher(params,cb);
		}

		
		service.DescribeStackDriftDetectionStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackDriftDetectionId",params,undefined,false); 
			
			copyArgs(n,"StackDriftDetectionId",params,undefined,false); 
			
			copyArgs(msg,"StackDriftDetectionId",params,undefined,false); 
			

			svc.describeStackDriftDetectionStatus(params,cb);
		}

		
		service.DescribeStackEvents=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"StackName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeStackEvents(params,cb);
		}

		
		service.DescribeStackInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			copyArgs(n,"StackInstanceAccount",params,undefined,false); 
			copyArgs(n,"StackInstanceRegion",params,undefined,false); 
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			copyArgs(n,"StackInstanceAccount",params,undefined,false); 
			copyArgs(n,"StackInstanceRegion",params,undefined,false); 
			copyArgs(n,"CallAs",params,undefined,false); 
			
			copyArgs(msg,"StackSetName",params,undefined,false); 
			copyArgs(msg,"StackInstanceAccount",params,undefined,false); 
			copyArgs(msg,"StackInstanceRegion",params,undefined,false); 
			copyArgs(msg,"CallAs",params,undefined,false); 
			

			svc.describeStackInstance(params,cb);
		}

		
		service.DescribeStackResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"LogicalResourceId",params,undefined,false); 
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"LogicalResourceId",params,undefined,false); 
			
			copyArgs(msg,"StackName",params,undefined,false); 
			copyArgs(msg,"LogicalResourceId",params,undefined,false); 
			

			svc.describeStackResource(params,cb);
		}

		
		service.DescribeStackResourceDrifts=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackName",params,undefined,false); 
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"StackResourceDriftStatusFilters",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"StackName",params,undefined,false); 
			copyArgs(msg,"StackResourceDriftStatusFilters",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeStackResourceDrifts(params,cb);
		}

		
		service.DescribeStackResources=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"LogicalResourceId",params,undefined,false); 
			copyArgs(n,"PhysicalResourceId",params,undefined,false); 
			
			copyArgs(msg,"StackName",params,undefined,false); 
			copyArgs(msg,"LogicalResourceId",params,undefined,false); 
			copyArgs(msg,"PhysicalResourceId",params,undefined,false); 
			

			svc.describeStackResources(params,cb);
		}

		
		service.DescribeStackSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			copyArgs(n,"CallAs",params,undefined,false); 
			
			copyArgs(msg,"StackSetName",params,undefined,false); 
			copyArgs(msg,"CallAs",params,undefined,false); 
			

			svc.describeStackSet(params,cb);
		}

		
		service.DescribeStackSetOperation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			copyArgs(n,"OperationId",params,undefined,false); 
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			copyArgs(n,"OperationId",params,undefined,false); 
			copyArgs(n,"CallAs",params,undefined,false); 
			
			copyArgs(msg,"StackSetName",params,undefined,false); 
			copyArgs(msg,"OperationId",params,undefined,false); 
			copyArgs(msg,"CallAs",params,undefined,false); 
			

			svc.describeStackSetOperation(params,cb);
		}

		
		service.DescribeStacks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"StackName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeStacks(params,cb);
		}

		
		service.DescribeType=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"TypeName",params,undefined,false); 
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			copyArgs(n,"PublisherId",params,undefined,false); 
			copyArgs(n,"PublicVersionNumber",params,undefined,false); 
			
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"TypeName",params,undefined,false); 
			copyArgs(msg,"Arn",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			copyArgs(msg,"PublisherId",params,undefined,false); 
			copyArgs(msg,"PublicVersionNumber",params,undefined,false); 
			

			svc.describeType(params,cb);
		}

		
		service.DescribeTypeRegistration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RegistrationToken",params,undefined,false); 
			
			copyArgs(n,"RegistrationToken",params,undefined,false); 
			
			copyArgs(msg,"RegistrationToken",params,undefined,false); 
			

			svc.describeTypeRegistration(params,cb);
		}

		
		service.DetectStackDrift=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackName",params,undefined,false); 
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"LogicalResourceIds",params,undefined,true); 
			
			copyArgs(msg,"StackName",params,undefined,false); 
			copyArgs(msg,"LogicalResourceIds",params,undefined,true); 
			

			svc.detectStackDrift(params,cb);
		}

		
		service.DetectStackResourceDrift=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"LogicalResourceId",params,undefined,false); 
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"LogicalResourceId",params,undefined,false); 
			
			copyArgs(msg,"StackName",params,undefined,false); 
			copyArgs(msg,"LogicalResourceId",params,undefined,false); 
			

			svc.detectStackResourceDrift(params,cb);
		}

		
		service.DetectStackSetDrift=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			copyArgs(n,"OperationPreferences",params,undefined,true); 
			copyArgs(n,"OperationId",params,undefined,false); 
			copyArgs(n,"CallAs",params,undefined,false); 
			
			copyArgs(msg,"StackSetName",params,undefined,false); 
			copyArgs(msg,"OperationPreferences",params,undefined,true); 
			copyArgs(msg,"OperationId",params,undefined,false); 
			copyArgs(msg,"CallAs",params,undefined,false); 
			

			svc.detectStackSetDrift(params,cb);
		}

		
		service.EstimateTemplateCost=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TemplateBody",params,undefined,false); 
			copyArgs(n,"TemplateURL",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			
			copyArgs(msg,"TemplateBody",params,undefined,false); 
			copyArgs(msg,"TemplateURL",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			

			svc.estimateTemplateCost(params,cb);
		}

		
		service.ExecuteChangeSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChangeSetName",params,undefined,false); 
			
			copyArgs(n,"ChangeSetName",params,undefined,false); 
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"DisableRollback",params,undefined,false); 
			
			copyArgs(msg,"ChangeSetName",params,undefined,false); 
			copyArgs(msg,"StackName",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"DisableRollback",params,undefined,false); 
			

			svc.executeChangeSet(params,cb);
		}

		
		service.GetStackPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackName",params,undefined,false); 
			
			copyArgs(n,"StackName",params,undefined,false); 
			
			copyArgs(msg,"StackName",params,undefined,false); 
			

			svc.getStackPolicy(params,cb);
		}

		
		service.GetTemplate=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"ChangeSetName",params,undefined,false); 
			copyArgs(n,"TemplateStage",params,undefined,false); 
			
			copyArgs(msg,"StackName",params,undefined,false); 
			copyArgs(msg,"ChangeSetName",params,undefined,false); 
			copyArgs(msg,"TemplateStage",params,undefined,false); 
			

			svc.getTemplate(params,cb);
		}

		
		service.GetTemplateSummary=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TemplateBody",params,undefined,false); 
			copyArgs(n,"TemplateURL",params,undefined,false); 
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"StackSetName",params,undefined,false); 
			copyArgs(n,"CallAs",params,undefined,false); 
			
			copyArgs(msg,"TemplateBody",params,undefined,false); 
			copyArgs(msg,"TemplateURL",params,undefined,false); 
			copyArgs(msg,"StackName",params,undefined,false); 
			copyArgs(msg,"StackSetName",params,undefined,false); 
			copyArgs(msg,"CallAs",params,undefined,false); 
			

			svc.getTemplateSummary(params,cb);
		}

		
		service.ImportStacksToStackSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			copyArgs(n,"StackIds",params,undefined,false); 
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			copyArgs(n,"StackIds",params,undefined,false); 
			copyArgs(n,"OperationPreferences",params,undefined,true); 
			copyArgs(n,"OperationId",params,undefined,false); 
			copyArgs(n,"CallAs",params,undefined,false); 
			
			copyArgs(msg,"StackSetName",params,undefined,false); 
			copyArgs(msg,"StackIds",params,undefined,false); 
			copyArgs(msg,"OperationPreferences",params,undefined,true); 
			copyArgs(msg,"OperationId",params,undefined,false); 
			copyArgs(msg,"CallAs",params,undefined,false); 
			

			svc.importStacksToStackSet(params,cb);
		}

		
		service.ListChangeSets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackName",params,undefined,false); 
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"StackName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listChangeSets(params,cb);
		}

		
		service.ListExports=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listExports(params,cb);
		}

		
		service.ListImports=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ExportName",params,undefined,false); 
			
			copyArgs(n,"ExportName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ExportName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listImports(params,cb);
		}

		
		service.ListStackInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(n,"StackInstanceAccount",params,undefined,false); 
			copyArgs(n,"StackInstanceRegion",params,undefined,false); 
			copyArgs(n,"CallAs",params,undefined,false); 
			
			copyArgs(msg,"StackSetName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"StackInstanceAccount",params,undefined,false); 
			copyArgs(msg,"StackInstanceRegion",params,undefined,false); 
			copyArgs(msg,"CallAs",params,undefined,false); 
			

			svc.listStackInstances(params,cb);
		}

		
		service.ListStackResources=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackName",params,undefined,false); 
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"StackName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listStackResources(params,cb);
		}

		
		service.ListStackSetOperationResults=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			copyArgs(n,"OperationId",params,undefined,false); 
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			copyArgs(n,"OperationId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"CallAs",params,undefined,false); 
			
			copyArgs(msg,"StackSetName",params,undefined,false); 
			copyArgs(msg,"OperationId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"CallAs",params,undefined,false); 
			

			svc.listStackSetOperationResults(params,cb);
		}

		
		service.ListStackSetOperations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"CallAs",params,undefined,false); 
			
			copyArgs(msg,"StackSetName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"CallAs",params,undefined,false); 
			

			svc.listStackSetOperations(params,cb);
		}

		
		service.ListStackSets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			copyArgs(n,"CallAs",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			copyArgs(msg,"CallAs",params,undefined,false); 
			

			svc.listStackSets(params,cb);
		}

		
		service.ListStacks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"StackStatusFilter",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"StackStatusFilter",params,undefined,false); 
			

			svc.listStacks(params,cb);
		}

		
		service.ListTypeRegistrations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"TypeName",params,undefined,false); 
			copyArgs(n,"TypeArn",params,undefined,false); 
			copyArgs(n,"RegistrationStatusFilter",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"TypeName",params,undefined,false); 
			copyArgs(msg,"TypeArn",params,undefined,false); 
			copyArgs(msg,"RegistrationStatusFilter",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listTypeRegistrations(params,cb);
		}

		
		service.ListTypeVersions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"TypeName",params,undefined,false); 
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"DeprecatedStatus",params,undefined,false); 
			copyArgs(n,"PublisherId",params,undefined,false); 
			
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"TypeName",params,undefined,false); 
			copyArgs(msg,"Arn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DeprecatedStatus",params,undefined,false); 
			copyArgs(msg,"PublisherId",params,undefined,false); 
			

			svc.listTypeVersions(params,cb);
		}

		
		service.ListTypes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Visibility",params,undefined,false); 
			copyArgs(n,"ProvisioningType",params,undefined,false); 
			copyArgs(n,"DeprecatedStatus",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Visibility",params,undefined,false); 
			copyArgs(msg,"ProvisioningType",params,undefined,false); 
			copyArgs(msg,"DeprecatedStatus",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listTypes(params,cb);
		}

		
		service.PublishType=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"TypeName",params,undefined,false); 
			copyArgs(n,"PublicVersionNumber",params,undefined,false); 
			
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"Arn",params,undefined,false); 
			copyArgs(msg,"TypeName",params,undefined,false); 
			copyArgs(msg,"PublicVersionNumber",params,undefined,false); 
			

			svc.publishType(params,cb);
		}

		
		service.RecordHandlerProgress=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BearerToken",params,undefined,false); 
			copyArgs(n,"OperationStatus",params,undefined,false); 
			
			copyArgs(n,"BearerToken",params,undefined,false); 
			copyArgs(n,"OperationStatus",params,undefined,false); 
			copyArgs(n,"CurrentOperationStatus",params,undefined,false); 
			copyArgs(n,"StatusMessage",params,undefined,false); 
			copyArgs(n,"ErrorCode",params,undefined,false); 
			copyArgs(n,"ResourceModel",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"BearerToken",params,undefined,false); 
			copyArgs(msg,"OperationStatus",params,undefined,false); 
			copyArgs(msg,"CurrentOperationStatus",params,undefined,false); 
			copyArgs(msg,"StatusMessage",params,undefined,false); 
			copyArgs(msg,"ErrorCode",params,undefined,false); 
			copyArgs(msg,"ResourceModel",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.recordHandlerProgress(params,cb);
		}

		
		service.RegisterPublisher=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AcceptTermsAndConditions",params,undefined,false); 
			copyArgs(n,"ConnectionArn",params,undefined,false); 
			
			copyArgs(msg,"AcceptTermsAndConditions",params,undefined,false); 
			copyArgs(msg,"ConnectionArn",params,undefined,false); 
			

			svc.registerPublisher(params,cb);
		}

		
		service.RegisterType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TypeName",params,undefined,false); 
			copyArgs(n,"SchemaHandlerPackage",params,undefined,false); 
			
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"TypeName",params,undefined,false); 
			copyArgs(n,"SchemaHandlerPackage",params,undefined,false); 
			copyArgs(n,"LoggingConfig",params,undefined,true); 
			copyArgs(n,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"TypeName",params,undefined,false); 
			copyArgs(msg,"SchemaHandlerPackage",params,undefined,false); 
			copyArgs(msg,"LoggingConfig",params,undefined,true); 
			copyArgs(msg,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.registerType(params,cb);
		}

		
		service.RollbackStack=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackName",params,undefined,false); 
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"RoleARN",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"StackName",params,undefined,false); 
			copyArgs(msg,"RoleARN",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.rollbackStack(params,cb);
		}

		
		service.SetStackPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackName",params,undefined,false); 
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"StackPolicyBody",params,undefined,false); 
			copyArgs(n,"StackPolicyURL",params,undefined,false); 
			
			copyArgs(msg,"StackName",params,undefined,false); 
			copyArgs(msg,"StackPolicyBody",params,undefined,false); 
			copyArgs(msg,"StackPolicyURL",params,undefined,false); 
			

			svc.setStackPolicy(params,cb);
		}

		
		service.SetTypeConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Configuration",params,undefined,false); 
			
			copyArgs(n,"TypeArn",params,undefined,false); 
			copyArgs(n,"Configuration",params,undefined,false); 
			copyArgs(n,"ConfigurationAlias",params,undefined,false); 
			copyArgs(n,"TypeName",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(msg,"TypeArn",params,undefined,false); 
			copyArgs(msg,"Configuration",params,undefined,false); 
			copyArgs(msg,"ConfigurationAlias",params,undefined,false); 
			copyArgs(msg,"TypeName",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			

			svc.setTypeConfiguration(params,cb);
		}

		
		service.SetTypeDefaultVersion=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"TypeName",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"TypeName",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			

			svc.setTypeDefaultVersion(params,cb);
		}

		
		service.SignalResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"LogicalResourceId",params,undefined,false); 
			copyArgs(n,"UniqueId",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"LogicalResourceId",params,undefined,false); 
			copyArgs(n,"UniqueId",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(msg,"StackName",params,undefined,false); 
			copyArgs(msg,"LogicalResourceId",params,undefined,false); 
			copyArgs(msg,"UniqueId",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			

			svc.signalResource(params,cb);
		}

		
		service.StopStackSetOperation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			copyArgs(n,"OperationId",params,undefined,false); 
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			copyArgs(n,"OperationId",params,undefined,false); 
			copyArgs(n,"CallAs",params,undefined,false); 
			
			copyArgs(msg,"StackSetName",params,undefined,false); 
			copyArgs(msg,"OperationId",params,undefined,false); 
			copyArgs(msg,"CallAs",params,undefined,false); 
			

			svc.stopStackSetOperation(params,cb);
		}

		
		service.TestType=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"TypeName",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			copyArgs(n,"LogDeliveryBucket",params,undefined,false); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"TypeName",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			copyArgs(msg,"LogDeliveryBucket",params,undefined,false); 
			

			svc.testType(params,cb);
		}

		
		service.UpdateStack=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackName",params,undefined,false); 
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"TemplateBody",params,undefined,false); 
			copyArgs(n,"TemplateURL",params,undefined,false); 
			copyArgs(n,"UsePreviousTemplate",params,undefined,false); 
			copyArgs(n,"StackPolicyDuringUpdateBody",params,undefined,false); 
			copyArgs(n,"StackPolicyDuringUpdateURL",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			copyArgs(n,"Capabilities",params,undefined,true); 
			copyArgs(n,"ResourceTypes",params,undefined,true); 
			copyArgs(n,"RoleARN",params,undefined,false); 
			copyArgs(n,"RollbackConfiguration",params,undefined,true); 
			copyArgs(n,"StackPolicyBody",params,undefined,false); 
			copyArgs(n,"StackPolicyURL",params,undefined,false); 
			copyArgs(n,"NotificationARNs",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"DisableRollback",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"StackName",params,undefined,false); 
			copyArgs(msg,"TemplateBody",params,undefined,false); 
			copyArgs(msg,"TemplateURL",params,undefined,false); 
			copyArgs(msg,"UsePreviousTemplate",params,undefined,false); 
			copyArgs(msg,"StackPolicyDuringUpdateBody",params,undefined,false); 
			copyArgs(msg,"StackPolicyDuringUpdateURL",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			copyArgs(msg,"Capabilities",params,undefined,true); 
			copyArgs(msg,"ResourceTypes",params,undefined,true); 
			copyArgs(msg,"RoleARN",params,undefined,false); 
			copyArgs(msg,"RollbackConfiguration",params,undefined,true); 
			copyArgs(msg,"StackPolicyBody",params,undefined,false); 
			copyArgs(msg,"StackPolicyURL",params,undefined,false); 
			copyArgs(msg,"NotificationARNs",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"DisableRollback",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.updateStack(params,cb);
		}

		
		service.UpdateStackInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			copyArgs(n,"Regions",params,undefined,true); 
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			copyArgs(n,"Accounts",params,undefined,true); 
			copyArgs(n,"DeploymentTargets",params,undefined,true); 
			copyArgs(n,"Regions",params,undefined,true); 
			copyArgs(n,"ParameterOverrides",params,undefined,true); 
			copyArgs(n,"OperationPreferences",params,undefined,true); 
			copyArgs(n,"OperationId",params,undefined,false); 
			copyArgs(n,"CallAs",params,undefined,false); 
			
			copyArgs(msg,"StackSetName",params,undefined,false); 
			copyArgs(msg,"Accounts",params,undefined,true); 
			copyArgs(msg,"DeploymentTargets",params,undefined,true); 
			copyArgs(msg,"Regions",params,undefined,true); 
			copyArgs(msg,"ParameterOverrides",params,undefined,true); 
			copyArgs(msg,"OperationPreferences",params,undefined,true); 
			copyArgs(msg,"OperationId",params,undefined,false); 
			copyArgs(msg,"CallAs",params,undefined,false); 
			

			svc.updateStackInstances(params,cb);
		}

		
		service.UpdateStackSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			
			copyArgs(n,"StackSetName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"TemplateBody",params,undefined,false); 
			copyArgs(n,"TemplateURL",params,undefined,false); 
			copyArgs(n,"UsePreviousTemplate",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			copyArgs(n,"Capabilities",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"OperationPreferences",params,undefined,true); 
			copyArgs(n,"AdministrationRoleARN",params,undefined,false); 
			copyArgs(n,"ExecutionRoleName",params,undefined,false); 
			copyArgs(n,"DeploymentTargets",params,undefined,true); 
			copyArgs(n,"PermissionModel",params,undefined,false); 
			copyArgs(n,"AutoDeployment",params,undefined,true); 
			copyArgs(n,"OperationId",params,undefined,false); 
			copyArgs(n,"Accounts",params,undefined,true); 
			copyArgs(n,"Regions",params,undefined,true); 
			copyArgs(n,"CallAs",params,undefined,false); 
			
			copyArgs(msg,"StackSetName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"TemplateBody",params,undefined,false); 
			copyArgs(msg,"TemplateURL",params,undefined,false); 
			copyArgs(msg,"UsePreviousTemplate",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			copyArgs(msg,"Capabilities",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"OperationPreferences",params,undefined,true); 
			copyArgs(msg,"AdministrationRoleARN",params,undefined,false); 
			copyArgs(msg,"ExecutionRoleName",params,undefined,false); 
			copyArgs(msg,"DeploymentTargets",params,undefined,true); 
			copyArgs(msg,"PermissionModel",params,undefined,false); 
			copyArgs(msg,"AutoDeployment",params,undefined,true); 
			copyArgs(msg,"OperationId",params,undefined,false); 
			copyArgs(msg,"Accounts",params,undefined,true); 
			copyArgs(msg,"Regions",params,undefined,true); 
			copyArgs(msg,"CallAs",params,undefined,false); 
			

			svc.updateStackSet(params,cb);
		}

		
		service.UpdateTerminationProtection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EnableTerminationProtection",params,undefined,false); 
			copyArgs(n,"StackName",params,undefined,false); 
			
			copyArgs(n,"EnableTerminationProtection",params,undefined,false); 
			copyArgs(n,"StackName",params,undefined,false); 
			
			copyArgs(msg,"EnableTerminationProtection",params,undefined,false); 
			copyArgs(msg,"StackName",params,undefined,false); 
			

			svc.updateTerminationProtection(params,cb);
		}

		
		service.ValidateTemplate=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TemplateBody",params,undefined,false); 
			copyArgs(n,"TemplateURL",params,undefined,false); 
			
			copyArgs(msg,"TemplateBody",params,undefined,false); 
			copyArgs(msg,"TemplateURL",params,undefined,false); 
			

			svc.validateTemplate(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS CloudFormation", AmazonAPINode);

};
