
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

		var awsService = new AWS.Proton( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Proton(msg.AWSConfig) : awsService;

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
		
			service.AcceptEnvironmentAccountConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.acceptEnvironmentAccountConnection(params,cb);
		}
			service.CancelEnvironmentDeployment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"environmentName",params,undefined,false); 
			
			copyArgs(n,"environmentName",params,undefined,false); 
			
			copyArgs(msg,"environmentName",params,undefined,false); 
			

			svc.cancelEnvironmentDeployment(params,cb);
		}
			service.CancelServiceInstanceDeployment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"serviceInstanceName",params,undefined,false); 
			copyArgs(n,"serviceName",params,undefined,false); 
			
			copyArgs(n,"serviceInstanceName",params,undefined,false); 
			copyArgs(n,"serviceName",params,undefined,false); 
			
			copyArgs(msg,"serviceInstanceName",params,undefined,false); 
			copyArgs(msg,"serviceName",params,undefined,false); 
			

			svc.cancelServiceInstanceDeployment(params,cb);
		}
			service.CancelServicePipelineDeployment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"serviceName",params,undefined,false); 
			
			copyArgs(n,"serviceName",params,undefined,false); 
			
			copyArgs(msg,"serviceName",params,undefined,false); 
			

			svc.cancelServicePipelineDeployment(params,cb);
		}
			service.CreateEnvironment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"spec",params,undefined,true); 
			copyArgs(n,"templateMajorVersion",params,undefined,false); 
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(n,"description",params,undefined,true); 
			copyArgs(n,"environmentAccountConnectionId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"protonServiceRoleArn",params,undefined,false); 
			copyArgs(n,"spec",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"templateMajorVersion",params,undefined,false); 
			copyArgs(n,"templateMinorVersion",params,undefined,false); 
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(msg,"description",params,undefined,true); 
			copyArgs(msg,"environmentAccountConnectionId",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"protonServiceRoleArn",params,undefined,false); 
			copyArgs(msg,"spec",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"templateMajorVersion",params,undefined,false); 
			copyArgs(msg,"templateMinorVersion",params,undefined,false); 
			copyArgs(msg,"templateName",params,undefined,false); 
			

			svc.createEnvironment(params,cb);
		}
			service.CreateEnvironmentAccountConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"environmentName",params,undefined,false); 
			copyArgs(n,"managementAccountId",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"environmentName",params,undefined,false); 
			copyArgs(n,"managementAccountId",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"environmentName",params,undefined,false); 
			copyArgs(msg,"managementAccountId",params,undefined,false); 
			copyArgs(msg,"roleArn",params,undefined,false); 
			

			svc.createEnvironmentAccountConnection(params,cb);
		}
			service.CreateEnvironmentTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"description",params,undefined,true); 
			copyArgs(n,"displayName",params,undefined,true); 
			copyArgs(n,"encryptionKey",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"provisioning",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"description",params,undefined,true); 
			copyArgs(msg,"displayName",params,undefined,true); 
			copyArgs(msg,"encryptionKey",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"provisioning",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createEnvironmentTemplate(params,cb);
		}
			service.CreateEnvironmentTemplateVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"source",params,undefined,true); 
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"description",params,undefined,true); 
			copyArgs(n,"majorVersion",params,undefined,false); 
			copyArgs(n,"source",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,true); 
			copyArgs(msg,"majorVersion",params,undefined,false); 
			copyArgs(msg,"source",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"templateName",params,undefined,false); 
			

			svc.createEnvironmentTemplateVersion(params,cb);
		}
			service.CreateService=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"spec",params,undefined,true); 
			copyArgs(n,"templateMajorVersion",params,undefined,false); 
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(n,"branchName",params,undefined,false); 
			copyArgs(n,"description",params,undefined,true); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"repositoryConnectionArn",params,undefined,false); 
			copyArgs(n,"repositoryId",params,undefined,false); 
			copyArgs(n,"spec",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"templateMajorVersion",params,undefined,false); 
			copyArgs(n,"templateMinorVersion",params,undefined,false); 
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(msg,"branchName",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,true); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"repositoryConnectionArn",params,undefined,false); 
			copyArgs(msg,"repositoryId",params,undefined,false); 
			copyArgs(msg,"spec",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"templateMajorVersion",params,undefined,false); 
			copyArgs(msg,"templateMinorVersion",params,undefined,false); 
			copyArgs(msg,"templateName",params,undefined,false); 
			

			svc.createService(params,cb);
		}
			service.CreateServiceTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"description",params,undefined,true); 
			copyArgs(n,"displayName",params,undefined,true); 
			copyArgs(n,"encryptionKey",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"pipelineProvisioning",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"description",params,undefined,true); 
			copyArgs(msg,"displayName",params,undefined,true); 
			copyArgs(msg,"encryptionKey",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"pipelineProvisioning",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createServiceTemplate(params,cb);
		}
			service.CreateServiceTemplateVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"compatibleEnvironmentTemplates",params,undefined,true); 
			copyArgs(n,"source",params,undefined,true); 
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"compatibleEnvironmentTemplates",params,undefined,true); 
			copyArgs(n,"description",params,undefined,true); 
			copyArgs(n,"majorVersion",params,undefined,false); 
			copyArgs(n,"source",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"compatibleEnvironmentTemplates",params,undefined,true); 
			copyArgs(msg,"description",params,undefined,true); 
			copyArgs(msg,"majorVersion",params,undefined,false); 
			copyArgs(msg,"source",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"templateName",params,undefined,false); 
			

			svc.createServiceTemplateVersion(params,cb);
		}
			service.DeleteEnvironment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.deleteEnvironment(params,cb);
		}
			service.DeleteEnvironmentAccountConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.deleteEnvironmentAccountConnection(params,cb);
		}
			service.DeleteEnvironmentTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.deleteEnvironmentTemplate(params,cb);
		}
			service.DeleteEnvironmentTemplateVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"majorVersion",params,undefined,false); 
			copyArgs(n,"minorVersion",params,undefined,false); 
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(n,"majorVersion",params,undefined,false); 
			copyArgs(n,"minorVersion",params,undefined,false); 
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(msg,"majorVersion",params,undefined,false); 
			copyArgs(msg,"minorVersion",params,undefined,false); 
			copyArgs(msg,"templateName",params,undefined,false); 
			

			svc.deleteEnvironmentTemplateVersion(params,cb);
		}
			service.DeleteService=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.deleteService(params,cb);
		}
			service.DeleteServiceTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.deleteServiceTemplate(params,cb);
		}
			service.DeleteServiceTemplateVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"majorVersion",params,undefined,false); 
			copyArgs(n,"minorVersion",params,undefined,false); 
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(n,"majorVersion",params,undefined,false); 
			copyArgs(n,"minorVersion",params,undefined,false); 
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(msg,"majorVersion",params,undefined,false); 
			copyArgs(msg,"minorVersion",params,undefined,false); 
			copyArgs(msg,"templateName",params,undefined,false); 
			

			svc.deleteServiceTemplateVersion(params,cb);
		}
			service.GetAccountSettings=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getAccountSettings(params,cb);
		}
			service.GetEnvironment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.getEnvironment(params,cb);
		}
			service.GetEnvironmentAccountConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.getEnvironmentAccountConnection(params,cb);
		}
			service.GetEnvironmentTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.getEnvironmentTemplate(params,cb);
		}
			service.GetEnvironmentTemplateVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"majorVersion",params,undefined,false); 
			copyArgs(n,"minorVersion",params,undefined,false); 
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(n,"majorVersion",params,undefined,false); 
			copyArgs(n,"minorVersion",params,undefined,false); 
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(msg,"majorVersion",params,undefined,false); 
			copyArgs(msg,"minorVersion",params,undefined,false); 
			copyArgs(msg,"templateName",params,undefined,false); 
			

			svc.getEnvironmentTemplateVersion(params,cb);
		}
			service.GetService=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.getService(params,cb);
		}
			service.GetServiceInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"serviceName",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"serviceName",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"serviceName",params,undefined,false); 
			

			svc.getServiceInstance(params,cb);
		}
			service.GetServiceTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.getServiceTemplate(params,cb);
		}
			service.GetServiceTemplateVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"majorVersion",params,undefined,false); 
			copyArgs(n,"minorVersion",params,undefined,false); 
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(n,"majorVersion",params,undefined,false); 
			copyArgs(n,"minorVersion",params,undefined,false); 
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(msg,"majorVersion",params,undefined,false); 
			copyArgs(msg,"minorVersion",params,undefined,false); 
			copyArgs(msg,"templateName",params,undefined,false); 
			

			svc.getServiceTemplateVersion(params,cb);
		}
			service.ListEnvironmentAccountConnections=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"requestedBy",params,undefined,false); 
			
			copyArgs(n,"environmentName",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"requestedBy",params,undefined,false); 
			copyArgs(n,"statuses",params,undefined,false); 
			
			copyArgs(msg,"environmentName",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"requestedBy",params,undefined,false); 
			copyArgs(msg,"statuses",params,undefined,false); 
			

			svc.listEnvironmentAccountConnections(params,cb);
		}
			service.ListEnvironmentTemplateVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(n,"majorVersion",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(msg,"majorVersion",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"templateName",params,undefined,false); 
			

			svc.listEnvironmentTemplateVersions(params,cb);
		}
			service.ListEnvironmentTemplates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listEnvironmentTemplates(params,cb);
		}
			service.ListEnvironments=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"environmentTemplates",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"environmentTemplates",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listEnvironments(params,cb);
		}
			service.ListServiceInstances=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"serviceName",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"serviceName",params,undefined,false); 
			

			svc.listServiceInstances(params,cb);
		}
			service.ListServiceTemplateVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(n,"majorVersion",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(msg,"majorVersion",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"templateName",params,undefined,false); 
			

			svc.listServiceTemplateVersions(params,cb);
		}
			service.ListServiceTemplates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listServiceTemplates(params,cb);
		}
			service.ListServices=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listServices(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.RejectEnvironmentAccountConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.rejectEnvironmentAccountConnection(params,cb);
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
			service.UpdateAccountSettings=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"pipelineServiceRoleArn",params,undefined,false); 
			
			copyArgs(msg,"pipelineServiceRoleArn",params,undefined,false); 
			

			svc.updateAccountSettings(params,cb);
		}
			service.UpdateEnvironment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"deploymentType",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"deploymentType",params,undefined,false); 
			copyArgs(n,"description",params,undefined,true); 
			copyArgs(n,"environmentAccountConnectionId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"protonServiceRoleArn",params,undefined,false); 
			copyArgs(n,"spec",params,undefined,true); 
			copyArgs(n,"templateMajorVersion",params,undefined,false); 
			copyArgs(n,"templateMinorVersion",params,undefined,false); 
			
			copyArgs(msg,"deploymentType",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,true); 
			copyArgs(msg,"environmentAccountConnectionId",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"protonServiceRoleArn",params,undefined,false); 
			copyArgs(msg,"spec",params,undefined,true); 
			copyArgs(msg,"templateMajorVersion",params,undefined,false); 
			copyArgs(msg,"templateMinorVersion",params,undefined,false); 
			

			svc.updateEnvironment(params,cb);
		}
			service.UpdateEnvironmentAccountConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			copyArgs(msg,"roleArn",params,undefined,false); 
			

			svc.updateEnvironmentAccountConnection(params,cb);
		}
			service.UpdateEnvironmentTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"description",params,undefined,true); 
			copyArgs(n,"displayName",params,undefined,true); 
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"description",params,undefined,true); 
			copyArgs(msg,"displayName",params,undefined,true); 
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.updateEnvironmentTemplate(params,cb);
		}
			service.UpdateEnvironmentTemplateVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"majorVersion",params,undefined,false); 
			copyArgs(n,"minorVersion",params,undefined,false); 
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(n,"description",params,undefined,true); 
			copyArgs(n,"majorVersion",params,undefined,false); 
			copyArgs(n,"minorVersion",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(msg,"description",params,undefined,true); 
			copyArgs(msg,"majorVersion",params,undefined,false); 
			copyArgs(msg,"minorVersion",params,undefined,false); 
			copyArgs(msg,"status",params,undefined,false); 
			copyArgs(msg,"templateName",params,undefined,false); 
			

			svc.updateEnvironmentTemplateVersion(params,cb);
		}
			service.UpdateService=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"description",params,undefined,true); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"spec",params,undefined,true); 
			
			copyArgs(msg,"description",params,undefined,true); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"spec",params,undefined,true); 
			

			svc.updateService(params,cb);
		}
			service.UpdateServiceInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"deploymentType",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"serviceName",params,undefined,false); 
			
			copyArgs(n,"deploymentType",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"serviceName",params,undefined,false); 
			copyArgs(n,"spec",params,undefined,true); 
			copyArgs(n,"templateMajorVersion",params,undefined,false); 
			copyArgs(n,"templateMinorVersion",params,undefined,false); 
			
			copyArgs(msg,"deploymentType",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"serviceName",params,undefined,false); 
			copyArgs(msg,"spec",params,undefined,true); 
			copyArgs(msg,"templateMajorVersion",params,undefined,false); 
			copyArgs(msg,"templateMinorVersion",params,undefined,false); 
			

			svc.updateServiceInstance(params,cb);
		}
			service.UpdateServicePipeline=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"deploymentType",params,undefined,false); 
			copyArgs(n,"serviceName",params,undefined,false); 
			copyArgs(n,"spec",params,undefined,true); 
			
			copyArgs(n,"deploymentType",params,undefined,false); 
			copyArgs(n,"serviceName",params,undefined,false); 
			copyArgs(n,"spec",params,undefined,true); 
			copyArgs(n,"templateMajorVersion",params,undefined,false); 
			copyArgs(n,"templateMinorVersion",params,undefined,false); 
			
			copyArgs(msg,"deploymentType",params,undefined,false); 
			copyArgs(msg,"serviceName",params,undefined,false); 
			copyArgs(msg,"spec",params,undefined,true); 
			copyArgs(msg,"templateMajorVersion",params,undefined,false); 
			copyArgs(msg,"templateMinorVersion",params,undefined,false); 
			

			svc.updateServicePipeline(params,cb);
		}
			service.UpdateServiceTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"description",params,undefined,true); 
			copyArgs(n,"displayName",params,undefined,true); 
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"description",params,undefined,true); 
			copyArgs(msg,"displayName",params,undefined,true); 
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.updateServiceTemplate(params,cb);
		}
			service.UpdateServiceTemplateVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"majorVersion",params,undefined,false); 
			copyArgs(n,"minorVersion",params,undefined,false); 
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(n,"compatibleEnvironmentTemplates",params,undefined,true); 
			copyArgs(n,"description",params,undefined,true); 
			copyArgs(n,"majorVersion",params,undefined,false); 
			copyArgs(n,"minorVersion",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(msg,"compatibleEnvironmentTemplates",params,undefined,true); 
			copyArgs(msg,"description",params,undefined,true); 
			copyArgs(msg,"majorVersion",params,undefined,false); 
			copyArgs(msg,"minorVersion",params,undefined,false); 
			copyArgs(msg,"status",params,undefined,false); 
			copyArgs(msg,"templateName",params,undefined,false); 
			

			svc.updateServiceTemplateVersion(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS Proton", AmazonAPINode);

};
