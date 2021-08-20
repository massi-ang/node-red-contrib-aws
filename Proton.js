
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

		var awsService = new AWS.Proton( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Proton(msg.AWSConfig) : awsService;

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

		
		service.AcceptEnvironmentAccountConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			

			svc.acceptEnvironmentAccountConnection(params,cb);
		}

		
		service.CancelEnvironmentDeployment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"environmentName",params,undefined,false); 
			
			copyArg(msg,"environmentName",params,undefined,false); 
			

			svc.cancelEnvironmentDeployment(params,cb);
		}

		
		service.CancelServiceInstanceDeployment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"serviceInstanceName",params,undefined,false); 
			copyArg(n,"serviceName",params,undefined,false); 
			
			copyArg(msg,"serviceInstanceName",params,undefined,false); 
			copyArg(msg,"serviceName",params,undefined,false); 
			

			svc.cancelServiceInstanceDeployment(params,cb);
		}

		
		service.CancelServicePipelineDeployment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"serviceName",params,undefined,false); 
			
			copyArg(msg,"serviceName",params,undefined,false); 
			

			svc.cancelServicePipelineDeployment(params,cb);
		}

		
		service.CreateEnvironment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"spec",params,undefined,true); 
			copyArg(n,"templateMajorVersion",params,undefined,false); 
			copyArg(n,"templateName",params,undefined,false); 
			
			copyArg(msg,"description",params,undefined,true); 
			copyArg(msg,"environmentAccountConnectionId",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"protonServiceRoleArn",params,undefined,false); 
			copyArg(msg,"spec",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"templateMajorVersion",params,undefined,false); 
			copyArg(msg,"templateMinorVersion",params,undefined,false); 
			copyArg(msg,"templateName",params,undefined,false); 
			

			svc.createEnvironment(params,cb);
		}

		
		service.CreateEnvironmentAccountConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"environmentName",params,undefined,false); 
			copyArg(n,"managementAccountId",params,undefined,false); 
			copyArg(n,"roleArn",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"environmentName",params,undefined,false); 
			copyArg(msg,"managementAccountId",params,undefined,false); 
			copyArg(msg,"roleArn",params,undefined,false); 
			

			svc.createEnvironmentAccountConnection(params,cb);
		}

		
		service.CreateEnvironmentTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"description",params,undefined,true); 
			copyArg(msg,"displayName",params,undefined,true); 
			copyArg(msg,"encryptionKey",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"provisioning",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createEnvironmentTemplate(params,cb);
		}

		
		service.CreateEnvironmentTemplateVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"source",params,undefined,true); 
			copyArg(n,"templateName",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"description",params,undefined,true); 
			copyArg(msg,"majorVersion",params,undefined,false); 
			copyArg(msg,"source",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"templateName",params,undefined,false); 
			

			svc.createEnvironmentTemplateVersion(params,cb);
		}

		
		service.CreateService=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"spec",params,undefined,true); 
			copyArg(n,"templateMajorVersion",params,undefined,false); 
			copyArg(n,"templateName",params,undefined,false); 
			
			copyArg(msg,"branchName",params,undefined,false); 
			copyArg(msg,"description",params,undefined,true); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"repositoryConnectionArn",params,undefined,false); 
			copyArg(msg,"repositoryId",params,undefined,false); 
			copyArg(msg,"spec",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"templateMajorVersion",params,undefined,false); 
			copyArg(msg,"templateMinorVersion",params,undefined,false); 
			copyArg(msg,"templateName",params,undefined,false); 
			

			svc.createService(params,cb);
		}

		
		service.CreateServiceTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"description",params,undefined,true); 
			copyArg(msg,"displayName",params,undefined,true); 
			copyArg(msg,"encryptionKey",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"pipelineProvisioning",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createServiceTemplate(params,cb);
		}

		
		service.CreateServiceTemplateVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"compatibleEnvironmentTemplates",params,undefined,true); 
			copyArg(n,"source",params,undefined,true); 
			copyArg(n,"templateName",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"compatibleEnvironmentTemplates",params,undefined,true); 
			copyArg(msg,"description",params,undefined,true); 
			copyArg(msg,"majorVersion",params,undefined,false); 
			copyArg(msg,"source",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"templateName",params,undefined,false); 
			

			svc.createServiceTemplateVersion(params,cb);
		}

		
		service.DeleteEnvironment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			

			svc.deleteEnvironment(params,cb);
		}

		
		service.DeleteEnvironmentAccountConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			

			svc.deleteEnvironmentAccountConnection(params,cb);
		}

		
		service.DeleteEnvironmentTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			

			svc.deleteEnvironmentTemplate(params,cb);
		}

		
		service.DeleteEnvironmentTemplateVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"majorVersion",params,undefined,false); 
			copyArg(n,"minorVersion",params,undefined,false); 
			copyArg(n,"templateName",params,undefined,false); 
			
			copyArg(msg,"majorVersion",params,undefined,false); 
			copyArg(msg,"minorVersion",params,undefined,false); 
			copyArg(msg,"templateName",params,undefined,false); 
			

			svc.deleteEnvironmentTemplateVersion(params,cb);
		}

		
		service.DeleteService=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			

			svc.deleteService(params,cb);
		}

		
		service.DeleteServiceTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			

			svc.deleteServiceTemplate(params,cb);
		}

		
		service.DeleteServiceTemplateVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"majorVersion",params,undefined,false); 
			copyArg(n,"minorVersion",params,undefined,false); 
			copyArg(n,"templateName",params,undefined,false); 
			
			copyArg(msg,"majorVersion",params,undefined,false); 
			copyArg(msg,"minorVersion",params,undefined,false); 
			copyArg(msg,"templateName",params,undefined,false); 
			

			svc.deleteServiceTemplateVersion(params,cb);
		}

		
		service.GetAccountSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getAccountSettings(params,cb);
		}

		
		service.GetEnvironment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			

			svc.getEnvironment(params,cb);
		}

		
		service.GetEnvironmentAccountConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			

			svc.getEnvironmentAccountConnection(params,cb);
		}

		
		service.GetEnvironmentTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			

			svc.getEnvironmentTemplate(params,cb);
		}

		
		service.GetEnvironmentTemplateVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"majorVersion",params,undefined,false); 
			copyArg(n,"minorVersion",params,undefined,false); 
			copyArg(n,"templateName",params,undefined,false); 
			
			copyArg(msg,"majorVersion",params,undefined,false); 
			copyArg(msg,"minorVersion",params,undefined,false); 
			copyArg(msg,"templateName",params,undefined,false); 
			

			svc.getEnvironmentTemplateVersion(params,cb);
		}

		
		service.GetService=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			

			svc.getService(params,cb);
		}

		
		service.GetServiceInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"serviceName",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"serviceName",params,undefined,false); 
			

			svc.getServiceInstance(params,cb);
		}

		
		service.GetServiceTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			

			svc.getServiceTemplate(params,cb);
		}

		
		service.GetServiceTemplateVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"majorVersion",params,undefined,false); 
			copyArg(n,"minorVersion",params,undefined,false); 
			copyArg(n,"templateName",params,undefined,false); 
			
			copyArg(msg,"majorVersion",params,undefined,false); 
			copyArg(msg,"minorVersion",params,undefined,false); 
			copyArg(msg,"templateName",params,undefined,false); 
			

			svc.getServiceTemplateVersion(params,cb);
		}

		
		service.ListEnvironmentAccountConnections=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"requestedBy",params,undefined,false); 
			
			copyArg(msg,"environmentName",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"requestedBy",params,undefined,false); 
			copyArg(msg,"statuses",params,undefined,false); 
			

			svc.listEnvironmentAccountConnections(params,cb);
		}

		
		service.ListEnvironmentTemplateVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"templateName",params,undefined,false); 
			
			copyArg(msg,"majorVersion",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"templateName",params,undefined,false); 
			

			svc.listEnvironmentTemplateVersions(params,cb);
		}

		
		service.ListEnvironmentTemplates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listEnvironmentTemplates(params,cb);
		}

		
		service.ListEnvironments=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"environmentTemplates",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listEnvironments(params,cb);
		}

		
		service.ListServiceInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"serviceName",params,undefined,false); 
			

			svc.listServiceInstances(params,cb);
		}

		
		service.ListServiceTemplateVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"templateName",params,undefined,false); 
			
			copyArg(msg,"majorVersion",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"templateName",params,undefined,false); 
			

			svc.listServiceTemplateVersions(params,cb);
		}

		
		service.ListServiceTemplates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listServiceTemplates(params,cb);
		}

		
		service.ListServices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listServices(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.RejectEnvironmentAccountConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			

			svc.rejectEnvironmentAccountConnection(params,cb);
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

		
		service.UpdateAccountSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pipelineServiceRoleArn",params,undefined,false); 
			

			svc.updateAccountSettings(params,cb);
		}

		
		service.UpdateEnvironment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"deploymentType",params,undefined,false); 
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"deploymentType",params,undefined,false); 
			copyArg(msg,"description",params,undefined,true); 
			copyArg(msg,"environmentAccountConnectionId",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"protonServiceRoleArn",params,undefined,false); 
			copyArg(msg,"spec",params,undefined,true); 
			copyArg(msg,"templateMajorVersion",params,undefined,false); 
			copyArg(msg,"templateMinorVersion",params,undefined,false); 
			

			svc.updateEnvironment(params,cb);
		}

		
		service.UpdateEnvironmentAccountConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			copyArg(n,"roleArn",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			copyArg(msg,"roleArn",params,undefined,false); 
			

			svc.updateEnvironmentAccountConnection(params,cb);
		}

		
		service.UpdateEnvironmentTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"description",params,undefined,true); 
			copyArg(msg,"displayName",params,undefined,true); 
			copyArg(msg,"name",params,undefined,false); 
			

			svc.updateEnvironmentTemplate(params,cb);
		}

		
		service.UpdateEnvironmentTemplateVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"majorVersion",params,undefined,false); 
			copyArg(n,"minorVersion",params,undefined,false); 
			copyArg(n,"templateName",params,undefined,false); 
			
			copyArg(msg,"description",params,undefined,true); 
			copyArg(msg,"majorVersion",params,undefined,false); 
			copyArg(msg,"minorVersion",params,undefined,false); 
			copyArg(msg,"status",params,undefined,false); 
			copyArg(msg,"templateName",params,undefined,false); 
			

			svc.updateEnvironmentTemplateVersion(params,cb);
		}

		
		service.UpdateService=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"description",params,undefined,true); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"spec",params,undefined,true); 
			

			svc.updateService(params,cb);
		}

		
		service.UpdateServiceInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"deploymentType",params,undefined,false); 
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"serviceName",params,undefined,false); 
			
			copyArg(msg,"deploymentType",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"serviceName",params,undefined,false); 
			copyArg(msg,"spec",params,undefined,true); 
			copyArg(msg,"templateMajorVersion",params,undefined,false); 
			copyArg(msg,"templateMinorVersion",params,undefined,false); 
			

			svc.updateServiceInstance(params,cb);
		}

		
		service.UpdateServicePipeline=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"deploymentType",params,undefined,false); 
			copyArg(n,"serviceName",params,undefined,false); 
			copyArg(n,"spec",params,undefined,true); 
			
			copyArg(msg,"deploymentType",params,undefined,false); 
			copyArg(msg,"serviceName",params,undefined,false); 
			copyArg(msg,"spec",params,undefined,true); 
			copyArg(msg,"templateMajorVersion",params,undefined,false); 
			copyArg(msg,"templateMinorVersion",params,undefined,false); 
			

			svc.updateServicePipeline(params,cb);
		}

		
		service.UpdateServiceTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"description",params,undefined,true); 
			copyArg(msg,"displayName",params,undefined,true); 
			copyArg(msg,"name",params,undefined,false); 
			

			svc.updateServiceTemplate(params,cb);
		}

		
		service.UpdateServiceTemplateVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"majorVersion",params,undefined,false); 
			copyArg(n,"minorVersion",params,undefined,false); 
			copyArg(n,"templateName",params,undefined,false); 
			
			copyArg(msg,"compatibleEnvironmentTemplates",params,undefined,true); 
			copyArg(msg,"description",params,undefined,true); 
			copyArg(msg,"majorVersion",params,undefined,false); 
			copyArg(msg,"minorVersion",params,undefined,false); 
			copyArg(msg,"status",params,undefined,false); 
			copyArg(msg,"templateName",params,undefined,false); 
			

			svc.updateServiceTemplateVersion(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Proton", AmazonAPINode);

};
