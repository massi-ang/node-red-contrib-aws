
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

		var awsService = new AWS.Greengrass( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Greengrass(msg.AWSConfig) : awsService;

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
		
		service.AssociateRoleToGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(msg,"GroupId",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			

			svc.associateRoleToGroup(params,cb);
		}
		
		service.AssociateServiceRoleToAccount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(msg,"RoleArn",params,undefined,false); 
			

			svc.associateServiceRoleToAccount(params,cb);
		}
		
		service.CreateConnectorDefinition=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AmznClientToken",params,undefined,false); 
			copyArgs(n,"InitialVersion",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"AmznClientToken",params,undefined,false); 
			copyArgs(msg,"InitialVersion",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createConnectorDefinition(params,cb);
		}
		
		service.CreateConnectorDefinitionVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConnectorDefinitionId",params,undefined,false); 
			
			copyArgs(n,"AmznClientToken",params,undefined,false); 
			copyArgs(n,"ConnectorDefinitionId",params,undefined,false); 
			copyArgs(n,"Connectors",params,undefined,true); 
			
			copyArgs(msg,"AmznClientToken",params,undefined,false); 
			copyArgs(msg,"ConnectorDefinitionId",params,undefined,false); 
			copyArgs(msg,"Connectors",params,undefined,true); 
			

			svc.createConnectorDefinitionVersion(params,cb);
		}
		
		service.CreateCoreDefinition=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AmznClientToken",params,undefined,false); 
			copyArgs(n,"InitialVersion",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"AmznClientToken",params,undefined,false); 
			copyArgs(msg,"InitialVersion",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createCoreDefinition(params,cb);
		}
		
		service.CreateCoreDefinitionVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CoreDefinitionId",params,undefined,false); 
			
			copyArgs(n,"AmznClientToken",params,undefined,false); 
			copyArgs(n,"CoreDefinitionId",params,undefined,false); 
			copyArgs(n,"Cores",params,undefined,true); 
			
			copyArgs(msg,"AmznClientToken",params,undefined,false); 
			copyArgs(msg,"CoreDefinitionId",params,undefined,false); 
			copyArgs(msg,"Cores",params,undefined,true); 
			

			svc.createCoreDefinitionVersion(params,cb);
		}
		
		service.CreateDeployment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"DeploymentType",params,undefined,false); 
			
			copyArgs(n,"AmznClientToken",params,undefined,false); 
			copyArgs(n,"DeploymentId",params,undefined,false); 
			copyArgs(n,"DeploymentType",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"GroupVersionId",params,undefined,false); 
			
			copyArgs(msg,"AmznClientToken",params,undefined,false); 
			copyArgs(msg,"DeploymentId",params,undefined,false); 
			copyArgs(msg,"DeploymentType",params,undefined,false); 
			copyArgs(msg,"GroupId",params,undefined,false); 
			copyArgs(msg,"GroupVersionId",params,undefined,false); 
			

			svc.createDeployment(params,cb);
		}
		
		service.CreateDeviceDefinition=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AmznClientToken",params,undefined,false); 
			copyArgs(n,"InitialVersion",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"AmznClientToken",params,undefined,false); 
			copyArgs(msg,"InitialVersion",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createDeviceDefinition(params,cb);
		}
		
		service.CreateDeviceDefinitionVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeviceDefinitionId",params,undefined,false); 
			
			copyArgs(n,"AmznClientToken",params,undefined,false); 
			copyArgs(n,"DeviceDefinitionId",params,undefined,false); 
			copyArgs(n,"Devices",params,undefined,true); 
			
			copyArgs(msg,"AmznClientToken",params,undefined,false); 
			copyArgs(msg,"DeviceDefinitionId",params,undefined,false); 
			copyArgs(msg,"Devices",params,undefined,true); 
			

			svc.createDeviceDefinitionVersion(params,cb);
		}
		
		service.CreateFunctionDefinition=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AmznClientToken",params,undefined,false); 
			copyArgs(n,"InitialVersion",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"AmznClientToken",params,undefined,false); 
			copyArgs(msg,"InitialVersion",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createFunctionDefinition(params,cb);
		}
		
		service.CreateFunctionDefinitionVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionDefinitionId",params,undefined,false); 
			
			copyArgs(n,"AmznClientToken",params,undefined,false); 
			copyArgs(n,"DefaultConfig",params,undefined,true); 
			copyArgs(n,"FunctionDefinitionId",params,undefined,false); 
			copyArgs(n,"Functions",params,undefined,true); 
			
			copyArgs(msg,"AmznClientToken",params,undefined,false); 
			copyArgs(msg,"DefaultConfig",params,undefined,true); 
			copyArgs(msg,"FunctionDefinitionId",params,undefined,false); 
			copyArgs(msg,"Functions",params,undefined,true); 
			

			svc.createFunctionDefinitionVersion(params,cb);
		}
		
		service.CreateGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"AmznClientToken",params,undefined,false); 
			copyArgs(n,"InitialVersion",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"AmznClientToken",params,undefined,false); 
			copyArgs(msg,"InitialVersion",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createGroup(params,cb);
		}
		
		service.CreateGroupCertificateAuthority=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(n,"AmznClientToken",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(msg,"AmznClientToken",params,undefined,false); 
			copyArgs(msg,"GroupId",params,undefined,false); 
			

			svc.createGroupCertificateAuthority(params,cb);
		}
		
		service.CreateGroupVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(n,"AmznClientToken",params,undefined,false); 
			copyArgs(n,"ConnectorDefinitionVersionArn",params,undefined,false); 
			copyArgs(n,"CoreDefinitionVersionArn",params,undefined,false); 
			copyArgs(n,"DeviceDefinitionVersionArn",params,undefined,false); 
			copyArgs(n,"FunctionDefinitionVersionArn",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"LoggerDefinitionVersionArn",params,undefined,false); 
			copyArgs(n,"ResourceDefinitionVersionArn",params,undefined,false); 
			copyArgs(n,"SubscriptionDefinitionVersionArn",params,undefined,false); 
			
			copyArgs(msg,"AmznClientToken",params,undefined,false); 
			copyArgs(msg,"ConnectorDefinitionVersionArn",params,undefined,false); 
			copyArgs(msg,"CoreDefinitionVersionArn",params,undefined,false); 
			copyArgs(msg,"DeviceDefinitionVersionArn",params,undefined,false); 
			copyArgs(msg,"FunctionDefinitionVersionArn",params,undefined,false); 
			copyArgs(msg,"GroupId",params,undefined,false); 
			copyArgs(msg,"LoggerDefinitionVersionArn",params,undefined,false); 
			copyArgs(msg,"ResourceDefinitionVersionArn",params,undefined,false); 
			copyArgs(msg,"SubscriptionDefinitionVersionArn",params,undefined,false); 
			

			svc.createGroupVersion(params,cb);
		}
		
		service.CreateLoggerDefinition=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AmznClientToken",params,undefined,false); 
			copyArgs(n,"InitialVersion",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"AmznClientToken",params,undefined,false); 
			copyArgs(msg,"InitialVersion",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createLoggerDefinition(params,cb);
		}
		
		service.CreateLoggerDefinitionVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LoggerDefinitionId",params,undefined,false); 
			
			copyArgs(n,"AmznClientToken",params,undefined,false); 
			copyArgs(n,"LoggerDefinitionId",params,undefined,false); 
			copyArgs(n,"Loggers",params,undefined,true); 
			
			copyArgs(msg,"AmznClientToken",params,undefined,false); 
			copyArgs(msg,"LoggerDefinitionId",params,undefined,false); 
			copyArgs(msg,"Loggers",params,undefined,true); 
			

			svc.createLoggerDefinitionVersion(params,cb);
		}
		
		service.CreateResourceDefinition=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AmznClientToken",params,undefined,false); 
			copyArgs(n,"InitialVersion",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"AmznClientToken",params,undefined,false); 
			copyArgs(msg,"InitialVersion",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createResourceDefinition(params,cb);
		}
		
		service.CreateResourceDefinitionVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceDefinitionId",params,undefined,false); 
			
			copyArgs(n,"AmznClientToken",params,undefined,false); 
			copyArgs(n,"ResourceDefinitionId",params,undefined,false); 
			copyArgs(n,"Resources",params,undefined,true); 
			
			copyArgs(msg,"AmznClientToken",params,undefined,false); 
			copyArgs(msg,"ResourceDefinitionId",params,undefined,false); 
			copyArgs(msg,"Resources",params,undefined,true); 
			

			svc.createResourceDefinitionVersion(params,cb);
		}
		
		service.CreateSoftwareUpdateJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"S3UrlSignerRole",params,undefined,false); 
			copyArgs(n,"UpdateTargetsArchitecture",params,undefined,false); 
			copyArgs(n,"SoftwareToUpdate",params,undefined,false); 
			copyArgs(n,"UpdateTargets",params,undefined,false); 
			copyArgs(n,"UpdateTargetsOperatingSystem",params,undefined,false); 
			
			copyArgs(n,"AmznClientToken",params,undefined,false); 
			copyArgs(n,"S3UrlSignerRole",params,undefined,false); 
			copyArgs(n,"SoftwareToUpdate",params,undefined,false); 
			copyArgs(n,"UpdateAgentLogLevel",params,undefined,false); 
			copyArgs(n,"UpdateTargets",params,undefined,false); 
			copyArgs(n,"UpdateTargetsArchitecture",params,undefined,false); 
			copyArgs(n,"UpdateTargetsOperatingSystem",params,undefined,false); 
			
			copyArgs(msg,"AmznClientToken",params,undefined,false); 
			copyArgs(msg,"S3UrlSignerRole",params,undefined,false); 
			copyArgs(msg,"SoftwareToUpdate",params,undefined,false); 
			copyArgs(msg,"UpdateAgentLogLevel",params,undefined,false); 
			copyArgs(msg,"UpdateTargets",params,undefined,false); 
			copyArgs(msg,"UpdateTargetsArchitecture",params,undefined,false); 
			copyArgs(msg,"UpdateTargetsOperatingSystem",params,undefined,false); 
			

			svc.createSoftwareUpdateJob(params,cb);
		}
		
		service.CreateSubscriptionDefinition=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AmznClientToken",params,undefined,false); 
			copyArgs(n,"InitialVersion",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"AmznClientToken",params,undefined,false); 
			copyArgs(msg,"InitialVersion",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createSubscriptionDefinition(params,cb);
		}
		
		service.CreateSubscriptionDefinitionVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubscriptionDefinitionId",params,undefined,false); 
			
			copyArgs(n,"AmznClientToken",params,undefined,false); 
			copyArgs(n,"SubscriptionDefinitionId",params,undefined,false); 
			copyArgs(n,"Subscriptions",params,undefined,true); 
			
			copyArgs(msg,"AmznClientToken",params,undefined,false); 
			copyArgs(msg,"SubscriptionDefinitionId",params,undefined,false); 
			copyArgs(msg,"Subscriptions",params,undefined,true); 
			

			svc.createSubscriptionDefinitionVersion(params,cb);
		}
		
		service.DeleteConnectorDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConnectorDefinitionId",params,undefined,false); 
			
			copyArgs(n,"ConnectorDefinitionId",params,undefined,false); 
			
			copyArgs(msg,"ConnectorDefinitionId",params,undefined,false); 
			

			svc.deleteConnectorDefinition(params,cb);
		}
		
		service.DeleteCoreDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CoreDefinitionId",params,undefined,false); 
			
			copyArgs(n,"CoreDefinitionId",params,undefined,false); 
			
			copyArgs(msg,"CoreDefinitionId",params,undefined,false); 
			

			svc.deleteCoreDefinition(params,cb);
		}
		
		service.DeleteDeviceDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeviceDefinitionId",params,undefined,false); 
			
			copyArgs(n,"DeviceDefinitionId",params,undefined,false); 
			
			copyArgs(msg,"DeviceDefinitionId",params,undefined,false); 
			

			svc.deleteDeviceDefinition(params,cb);
		}
		
		service.DeleteFunctionDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionDefinitionId",params,undefined,false); 
			
			copyArgs(n,"FunctionDefinitionId",params,undefined,false); 
			
			copyArgs(msg,"FunctionDefinitionId",params,undefined,false); 
			

			svc.deleteFunctionDefinition(params,cb);
		}
		
		service.DeleteGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(msg,"GroupId",params,undefined,false); 
			

			svc.deleteGroup(params,cb);
		}
		
		service.DeleteLoggerDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LoggerDefinitionId",params,undefined,false); 
			
			copyArgs(n,"LoggerDefinitionId",params,undefined,false); 
			
			copyArgs(msg,"LoggerDefinitionId",params,undefined,false); 
			

			svc.deleteLoggerDefinition(params,cb);
		}
		
		service.DeleteResourceDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceDefinitionId",params,undefined,false); 
			
			copyArgs(n,"ResourceDefinitionId",params,undefined,false); 
			
			copyArgs(msg,"ResourceDefinitionId",params,undefined,false); 
			

			svc.deleteResourceDefinition(params,cb);
		}
		
		service.DeleteSubscriptionDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubscriptionDefinitionId",params,undefined,false); 
			
			copyArgs(n,"SubscriptionDefinitionId",params,undefined,false); 
			
			copyArgs(msg,"SubscriptionDefinitionId",params,undefined,false); 
			

			svc.deleteSubscriptionDefinition(params,cb);
		}
		
		service.DisassociateRoleFromGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(msg,"GroupId",params,undefined,false); 
			

			svc.disassociateRoleFromGroup(params,cb);
		}
		
		service.DisassociateServiceRoleFromAccount=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.disassociateServiceRoleFromAccount(params,cb);
		}
		
		service.GetAssociatedRole=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(msg,"GroupId",params,undefined,false); 
			

			svc.getAssociatedRole(params,cb);
		}
		
		service.GetBulkDeploymentStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BulkDeploymentId",params,undefined,false); 
			
			copyArgs(n,"BulkDeploymentId",params,undefined,false); 
			
			copyArgs(msg,"BulkDeploymentId",params,undefined,false); 
			

			svc.getBulkDeploymentStatus(params,cb);
		}
		
		service.GetConnectivityInfo=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ThingName",params,undefined,false); 
			
			copyArgs(n,"ThingName",params,undefined,false); 
			
			copyArgs(msg,"ThingName",params,undefined,false); 
			

			svc.getConnectivityInfo(params,cb);
		}
		
		service.GetConnectorDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConnectorDefinitionId",params,undefined,false); 
			
			copyArgs(n,"ConnectorDefinitionId",params,undefined,false); 
			
			copyArgs(msg,"ConnectorDefinitionId",params,undefined,false); 
			

			svc.getConnectorDefinition(params,cb);
		}
		
		service.GetConnectorDefinitionVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConnectorDefinitionId",params,undefined,false); 
			copyArgs(n,"ConnectorDefinitionVersionId",params,undefined,false); 
			
			copyArgs(n,"ConnectorDefinitionId",params,undefined,false); 
			copyArgs(n,"ConnectorDefinitionVersionId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ConnectorDefinitionId",params,undefined,false); 
			copyArgs(msg,"ConnectorDefinitionVersionId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getConnectorDefinitionVersion(params,cb);
		}
		
		service.GetCoreDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CoreDefinitionId",params,undefined,false); 
			
			copyArgs(n,"CoreDefinitionId",params,undefined,false); 
			
			copyArgs(msg,"CoreDefinitionId",params,undefined,false); 
			

			svc.getCoreDefinition(params,cb);
		}
		
		service.GetCoreDefinitionVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CoreDefinitionId",params,undefined,false); 
			copyArgs(n,"CoreDefinitionVersionId",params,undefined,false); 
			
			copyArgs(n,"CoreDefinitionId",params,undefined,false); 
			copyArgs(n,"CoreDefinitionVersionId",params,undefined,false); 
			
			copyArgs(msg,"CoreDefinitionId",params,undefined,false); 
			copyArgs(msg,"CoreDefinitionVersionId",params,undefined,false); 
			

			svc.getCoreDefinitionVersion(params,cb);
		}
		
		service.GetDeploymentStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"DeploymentId",params,undefined,false); 
			
			copyArgs(n,"DeploymentId",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(msg,"DeploymentId",params,undefined,false); 
			copyArgs(msg,"GroupId",params,undefined,false); 
			

			svc.getDeploymentStatus(params,cb);
		}
		
		service.GetDeviceDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeviceDefinitionId",params,undefined,false); 
			
			copyArgs(n,"DeviceDefinitionId",params,undefined,false); 
			
			copyArgs(msg,"DeviceDefinitionId",params,undefined,false); 
			

			svc.getDeviceDefinition(params,cb);
		}
		
		service.GetDeviceDefinitionVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeviceDefinitionVersionId",params,undefined,false); 
			copyArgs(n,"DeviceDefinitionId",params,undefined,false); 
			
			copyArgs(n,"DeviceDefinitionId",params,undefined,false); 
			copyArgs(n,"DeviceDefinitionVersionId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DeviceDefinitionId",params,undefined,false); 
			copyArgs(msg,"DeviceDefinitionVersionId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getDeviceDefinitionVersion(params,cb);
		}
		
		service.GetFunctionDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionDefinitionId",params,undefined,false); 
			
			copyArgs(n,"FunctionDefinitionId",params,undefined,false); 
			
			copyArgs(msg,"FunctionDefinitionId",params,undefined,false); 
			

			svc.getFunctionDefinition(params,cb);
		}
		
		service.GetFunctionDefinitionVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionDefinitionId",params,undefined,false); 
			copyArgs(n,"FunctionDefinitionVersionId",params,undefined,false); 
			
			copyArgs(n,"FunctionDefinitionId",params,undefined,false); 
			copyArgs(n,"FunctionDefinitionVersionId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"FunctionDefinitionId",params,undefined,false); 
			copyArgs(msg,"FunctionDefinitionVersionId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getFunctionDefinitionVersion(params,cb);
		}
		
		service.GetGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(msg,"GroupId",params,undefined,false); 
			

			svc.getGroup(params,cb);
		}
		
		service.GetGroupCertificateAuthority=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateAuthorityId",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(n,"CertificateAuthorityId",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(msg,"CertificateAuthorityId",params,undefined,false); 
			copyArgs(msg,"GroupId",params,undefined,false); 
			

			svc.getGroupCertificateAuthority(params,cb);
		}
		
		service.GetGroupCertificateConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(msg,"GroupId",params,undefined,false); 
			

			svc.getGroupCertificateConfiguration(params,cb);
		}
		
		service.GetGroupVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupVersionId",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"GroupVersionId",params,undefined,false); 
			
			copyArgs(msg,"GroupId",params,undefined,false); 
			copyArgs(msg,"GroupVersionId",params,undefined,false); 
			

			svc.getGroupVersion(params,cb);
		}
		
		service.GetLoggerDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LoggerDefinitionId",params,undefined,false); 
			
			copyArgs(n,"LoggerDefinitionId",params,undefined,false); 
			
			copyArgs(msg,"LoggerDefinitionId",params,undefined,false); 
			

			svc.getLoggerDefinition(params,cb);
		}
		
		service.GetLoggerDefinitionVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LoggerDefinitionVersionId",params,undefined,false); 
			copyArgs(n,"LoggerDefinitionId",params,undefined,false); 
			
			copyArgs(n,"LoggerDefinitionId",params,undefined,false); 
			copyArgs(n,"LoggerDefinitionVersionId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"LoggerDefinitionId",params,undefined,false); 
			copyArgs(msg,"LoggerDefinitionVersionId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getLoggerDefinitionVersion(params,cb);
		}
		
		service.GetResourceDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceDefinitionId",params,undefined,false); 
			
			copyArgs(n,"ResourceDefinitionId",params,undefined,false); 
			
			copyArgs(msg,"ResourceDefinitionId",params,undefined,false); 
			

			svc.getResourceDefinition(params,cb);
		}
		
		service.GetResourceDefinitionVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceDefinitionVersionId",params,undefined,false); 
			copyArgs(n,"ResourceDefinitionId",params,undefined,false); 
			
			copyArgs(n,"ResourceDefinitionId",params,undefined,false); 
			copyArgs(n,"ResourceDefinitionVersionId",params,undefined,false); 
			
			copyArgs(msg,"ResourceDefinitionId",params,undefined,false); 
			copyArgs(msg,"ResourceDefinitionVersionId",params,undefined,false); 
			

			svc.getResourceDefinitionVersion(params,cb);
		}
		
		service.GetServiceRoleForAccount=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getServiceRoleForAccount(params,cb);
		}
		
		service.GetSubscriptionDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubscriptionDefinitionId",params,undefined,false); 
			
			copyArgs(n,"SubscriptionDefinitionId",params,undefined,false); 
			
			copyArgs(msg,"SubscriptionDefinitionId",params,undefined,false); 
			

			svc.getSubscriptionDefinition(params,cb);
		}
		
		service.GetSubscriptionDefinitionVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubscriptionDefinitionId",params,undefined,false); 
			copyArgs(n,"SubscriptionDefinitionVersionId",params,undefined,false); 
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"SubscriptionDefinitionId",params,undefined,false); 
			copyArgs(n,"SubscriptionDefinitionVersionId",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"SubscriptionDefinitionId",params,undefined,false); 
			copyArgs(msg,"SubscriptionDefinitionVersionId",params,undefined,false); 
			

			svc.getSubscriptionDefinitionVersion(params,cb);
		}
		
		service.GetThingRuntimeConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ThingName",params,undefined,false); 
			
			copyArgs(n,"ThingName",params,undefined,false); 
			
			copyArgs(msg,"ThingName",params,undefined,false); 
			

			svc.getThingRuntimeConfiguration(params,cb);
		}
		
		service.ListBulkDeploymentDetailedReports=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BulkDeploymentId",params,undefined,false); 
			
			copyArgs(n,"BulkDeploymentId",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"BulkDeploymentId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listBulkDeploymentDetailedReports(params,cb);
		}
		
		service.ListBulkDeployments=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listBulkDeployments(params,cb);
		}
		
		service.ListConnectorDefinitionVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConnectorDefinitionId",params,undefined,false); 
			
			copyArgs(n,"ConnectorDefinitionId",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ConnectorDefinitionId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listConnectorDefinitionVersions(params,cb);
		}
		
		service.ListConnectorDefinitions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listConnectorDefinitions(params,cb);
		}
		
		service.ListCoreDefinitionVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CoreDefinitionId",params,undefined,false); 
			
			copyArgs(n,"CoreDefinitionId",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"CoreDefinitionId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listCoreDefinitionVersions(params,cb);
		}
		
		service.ListCoreDefinitions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listCoreDefinitions(params,cb);
		}
		
		service.ListDeployments=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"GroupId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listDeployments(params,cb);
		}
		
		service.ListDeviceDefinitionVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeviceDefinitionId",params,undefined,false); 
			
			copyArgs(n,"DeviceDefinitionId",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DeviceDefinitionId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listDeviceDefinitionVersions(params,cb);
		}
		
		service.ListDeviceDefinitions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listDeviceDefinitions(params,cb);
		}
		
		service.ListFunctionDefinitionVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionDefinitionId",params,undefined,false); 
			
			copyArgs(n,"FunctionDefinitionId",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"FunctionDefinitionId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listFunctionDefinitionVersions(params,cb);
		}
		
		service.ListFunctionDefinitions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listFunctionDefinitions(params,cb);
		}
		
		service.ListGroupCertificateAuthorities=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(msg,"GroupId",params,undefined,false); 
			

			svc.listGroupCertificateAuthorities(params,cb);
		}
		
		service.ListGroupVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"GroupId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listGroupVersions(params,cb);
		}
		
		service.ListGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listGroups(params,cb);
		}
		
		service.ListLoggerDefinitionVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LoggerDefinitionId",params,undefined,false); 
			
			copyArgs(n,"LoggerDefinitionId",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"LoggerDefinitionId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listLoggerDefinitionVersions(params,cb);
		}
		
		service.ListLoggerDefinitions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listLoggerDefinitions(params,cb);
		}
		
		service.ListResourceDefinitionVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceDefinitionId",params,undefined,false); 
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"ResourceDefinitionId",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"ResourceDefinitionId",params,undefined,false); 
			

			svc.listResourceDefinitionVersions(params,cb);
		}
		
		service.ListResourceDefinitions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listResourceDefinitions(params,cb);
		}
		
		service.ListSubscriptionDefinitionVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubscriptionDefinitionId",params,undefined,false); 
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"SubscriptionDefinitionId",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"SubscriptionDefinitionId",params,undefined,false); 
			

			svc.listSubscriptionDefinitionVersions(params,cb);
		}
		
		service.ListSubscriptionDefinitions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listSubscriptionDefinitions(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.ResetDeployments=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(n,"AmznClientToken",params,undefined,false); 
			copyArgs(Boolean(n),"Force",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(msg,"AmznClientToken",params,undefined,false); 
			copyArgs(msg,"Force",params,undefined,false); 
			copyArgs(msg,"GroupId",params,undefined,false); 
			

			svc.resetDeployments(params,cb);
		}
		
		service.StartBulkDeployment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(n,"InputFileUri",params,undefined,false); 
			
			copyArgs(n,"AmznClientToken",params,undefined,false); 
			copyArgs(n,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(n,"InputFileUri",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"AmznClientToken",params,undefined,false); 
			copyArgs(msg,"ExecutionRoleArn",params,undefined,false); 
			copyArgs(msg,"InputFileUri",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.startBulkDeployment(params,cb);
		}
		
		service.StopBulkDeployment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BulkDeploymentId",params,undefined,false); 
			
			copyArgs(n,"BulkDeploymentId",params,undefined,false); 
			
			copyArgs(msg,"BulkDeploymentId",params,undefined,false); 
			

			svc.stopBulkDeployment(params,cb);
		}
		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TagKeys",params,undefined,true); 
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			

			svc.untagResource(params,cb);
		}
		
		service.UpdateConnectivityInfo=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ThingName",params,undefined,false); 
			
			copyArgs(n,"ConnectivityInfo",params,undefined,true); 
			copyArgs(n,"ThingName",params,undefined,false); 
			
			copyArgs(msg,"ConnectivityInfo",params,undefined,true); 
			copyArgs(msg,"ThingName",params,undefined,false); 
			

			svc.updateConnectivityInfo(params,cb);
		}
		
		service.UpdateConnectorDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConnectorDefinitionId",params,undefined,false); 
			
			copyArgs(n,"ConnectorDefinitionId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"ConnectorDefinitionId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.updateConnectorDefinition(params,cb);
		}
		
		service.UpdateCoreDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CoreDefinitionId",params,undefined,false); 
			
			copyArgs(n,"CoreDefinitionId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"CoreDefinitionId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.updateCoreDefinition(params,cb);
		}
		
		service.UpdateDeviceDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeviceDefinitionId",params,undefined,false); 
			
			copyArgs(n,"DeviceDefinitionId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"DeviceDefinitionId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.updateDeviceDefinition(params,cb);
		}
		
		service.UpdateFunctionDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FunctionDefinitionId",params,undefined,false); 
			
			copyArgs(n,"FunctionDefinitionId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"FunctionDefinitionId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.updateFunctionDefinition(params,cb);
		}
		
		service.UpdateGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"GroupId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.updateGroup(params,cb);
		}
		
		service.UpdateGroupCertificateConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(n,"CertificateExpiryInMilliseconds",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(msg,"CertificateExpiryInMilliseconds",params,undefined,false); 
			copyArgs(msg,"GroupId",params,undefined,false); 
			

			svc.updateGroupCertificateConfiguration(params,cb);
		}
		
		service.UpdateLoggerDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LoggerDefinitionId",params,undefined,false); 
			
			copyArgs(n,"LoggerDefinitionId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"LoggerDefinitionId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.updateLoggerDefinition(params,cb);
		}
		
		service.UpdateResourceDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceDefinitionId",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ResourceDefinitionId",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ResourceDefinitionId",params,undefined,false); 
			

			svc.updateResourceDefinition(params,cb);
		}
		
		service.UpdateSubscriptionDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubscriptionDefinitionId",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"SubscriptionDefinitionId",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"SubscriptionDefinitionId",params,undefined,false); 
			

			svc.updateSubscriptionDefinition(params,cb);
		}
		
		service.UpdateThingRuntimeConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ThingName",params,undefined,false); 
			
			copyArgs(n,"TelemetryConfiguration",params,undefined,false); 
			copyArgs(n,"ThingName",params,undefined,false); 
			
			copyArgs(msg,"TelemetryConfiguration",params,undefined,false); 
			copyArgs(msg,"ThingName",params,undefined,false); 
			

			svc.updateThingRuntimeConfiguration(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS Greengrass", AmazonAPINode);

};
