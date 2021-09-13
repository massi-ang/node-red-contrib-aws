
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

		var awsService = new AWS.Transfer( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Transfer(msg.AWSConfig) : awsService;

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
		
			service.CreateAccess=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Role",params,undefined,false); 
			copyArgs(n,"ServerId",params,undefined,false); 
			copyArgs(n,"ExternalId",params,undefined,false); 
			
			copyArgs(n,"HomeDirectory",params,undefined,false); 
			copyArgs(n,"HomeDirectoryType",params,undefined,false); 
			copyArgs(n,"HomeDirectoryMappings",params,undefined,true); 
			copyArgs(n,"Policy",params,undefined,false); 
			copyArgs(n,"PosixProfile",params,undefined,true); 
			copyArgs(n,"Role",params,undefined,false); 
			copyArgs(n,"ServerId",params,undefined,false); 
			copyArgs(n,"ExternalId",params,undefined,false); 
			
			copyArgs(msg,"HomeDirectory",params,undefined,false); 
			copyArgs(msg,"HomeDirectoryType",params,undefined,false); 
			copyArgs(msg,"HomeDirectoryMappings",params,undefined,true); 
			copyArgs(msg,"Policy",params,undefined,false); 
			copyArgs(msg,"PosixProfile",params,undefined,true); 
			copyArgs(msg,"Role",params,undefined,false); 
			copyArgs(msg,"ServerId",params,undefined,false); 
			copyArgs(msg,"ExternalId",params,undefined,false); 
			

			svc.createAccess(params,cb);
		}
			service.CreateServer=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Certificate",params,undefined,false); 
			copyArgs(n,"Domain",params,undefined,false); 
			copyArgs(n,"EndpointDetails",params,undefined,true); 
			copyArgs(n,"EndpointType",params,undefined,false); 
			copyArgs(n,"HostKey",params,undefined,true); 
			copyArgs(n,"IdentityProviderDetails",params,undefined,true); 
			copyArgs(n,"IdentityProviderType",params,undefined,false); 
			copyArgs(n,"LoggingRole",params,undefined,false); 
			copyArgs(n,"Protocols",params,undefined,true); 
			copyArgs(n,"SecurityPolicyName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"WorkflowDetails",params,undefined,true); 
			
			copyArgs(msg,"Certificate",params,undefined,false); 
			copyArgs(msg,"Domain",params,undefined,false); 
			copyArgs(msg,"EndpointDetails",params,undefined,true); 
			copyArgs(msg,"EndpointType",params,undefined,false); 
			copyArgs(msg,"HostKey",params,undefined,true); 
			copyArgs(msg,"IdentityProviderDetails",params,undefined,true); 
			copyArgs(msg,"IdentityProviderType",params,undefined,false); 
			copyArgs(msg,"LoggingRole",params,undefined,false); 
			copyArgs(msg,"Protocols",params,undefined,true); 
			copyArgs(msg,"SecurityPolicyName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"WorkflowDetails",params,undefined,true); 
			

			svc.createServer(params,cb);
		}
			service.CreateUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Role",params,undefined,false); 
			copyArgs(n,"ServerId",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(n,"HomeDirectory",params,undefined,false); 
			copyArgs(n,"HomeDirectoryType",params,undefined,false); 
			copyArgs(n,"HomeDirectoryMappings",params,undefined,true); 
			copyArgs(n,"Policy",params,undefined,false); 
			copyArgs(n,"PosixProfile",params,undefined,true); 
			copyArgs(n,"Role",params,undefined,false); 
			copyArgs(n,"ServerId",params,undefined,false); 
			copyArgs(n,"SshPublicKeyBody",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(msg,"HomeDirectory",params,undefined,false); 
			copyArgs(msg,"HomeDirectoryType",params,undefined,false); 
			copyArgs(msg,"HomeDirectoryMappings",params,undefined,true); 
			copyArgs(msg,"Policy",params,undefined,false); 
			copyArgs(msg,"PosixProfile",params,undefined,true); 
			copyArgs(msg,"Role",params,undefined,false); 
			copyArgs(msg,"ServerId",params,undefined,false); 
			copyArgs(msg,"SshPublicKeyBody",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"UserName",params,undefined,false); 
			

			svc.createUser(params,cb);
		}
			service.CreateWorkflow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Steps",params,undefined,true); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Steps",params,undefined,true); 
			copyArgs(n,"OnExceptionSteps",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Steps",params,undefined,true); 
			copyArgs(msg,"OnExceptionSteps",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createWorkflow(params,cb);
		}
			service.DeleteAccess=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerId",params,undefined,false); 
			copyArgs(n,"ExternalId",params,undefined,false); 
			
			copyArgs(n,"ServerId",params,undefined,false); 
			copyArgs(n,"ExternalId",params,undefined,false); 
			
			copyArgs(msg,"ServerId",params,undefined,false); 
			copyArgs(msg,"ExternalId",params,undefined,false); 
			

			svc.deleteAccess(params,cb);
		}
			service.DeleteServer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerId",params,undefined,false); 
			
			copyArgs(n,"ServerId",params,undefined,false); 
			
			copyArgs(msg,"ServerId",params,undefined,false); 
			

			svc.deleteServer(params,cb);
		}
			service.DeleteSshPublicKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerId",params,undefined,false); 
			copyArgs(n,"SshPublicKeyId",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(n,"ServerId",params,undefined,false); 
			copyArgs(n,"SshPublicKeyId",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(msg,"ServerId",params,undefined,false); 
			copyArgs(msg,"SshPublicKeyId",params,undefined,false); 
			copyArgs(msg,"UserName",params,undefined,false); 
			

			svc.deleteSshPublicKey(params,cb);
		}
			service.DeleteUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerId",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(n,"ServerId",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(msg,"ServerId",params,undefined,false); 
			copyArgs(msg,"UserName",params,undefined,false); 
			

			svc.deleteUser(params,cb);
		}
			service.DeleteWorkflow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkflowId",params,undefined,false); 
			
			copyArgs(n,"WorkflowId",params,undefined,false); 
			
			copyArgs(msg,"WorkflowId",params,undefined,false); 
			

			svc.deleteWorkflow(params,cb);
		}
			service.DescribeAccess=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerId",params,undefined,false); 
			copyArgs(n,"ExternalId",params,undefined,false); 
			
			copyArgs(n,"ServerId",params,undefined,false); 
			copyArgs(n,"ExternalId",params,undefined,false); 
			
			copyArgs(msg,"ServerId",params,undefined,false); 
			copyArgs(msg,"ExternalId",params,undefined,false); 
			

			svc.describeAccess(params,cb);
		}
			service.DescribeExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ExecutionId",params,undefined,false); 
			copyArgs(n,"WorkflowId",params,undefined,false); 
			
			copyArgs(n,"ExecutionId",params,undefined,false); 
			copyArgs(n,"WorkflowId",params,undefined,false); 
			
			copyArgs(msg,"ExecutionId",params,undefined,false); 
			copyArgs(msg,"WorkflowId",params,undefined,false); 
			

			svc.describeExecution(params,cb);
		}
			service.DescribeSecurityPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SecurityPolicyName",params,undefined,false); 
			
			copyArgs(n,"SecurityPolicyName",params,undefined,false); 
			
			copyArgs(msg,"SecurityPolicyName",params,undefined,false); 
			

			svc.describeSecurityPolicy(params,cb);
		}
			service.DescribeServer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerId",params,undefined,false); 
			
			copyArgs(n,"ServerId",params,undefined,false); 
			
			copyArgs(msg,"ServerId",params,undefined,false); 
			

			svc.describeServer(params,cb);
		}
			service.DescribeUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerId",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(n,"ServerId",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(msg,"ServerId",params,undefined,false); 
			copyArgs(msg,"UserName",params,undefined,false); 
			

			svc.describeUser(params,cb);
		}
			service.DescribeWorkflow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkflowId",params,undefined,false); 
			
			copyArgs(n,"WorkflowId",params,undefined,false); 
			
			copyArgs(msg,"WorkflowId",params,undefined,false); 
			

			svc.describeWorkflow(params,cb);
		}
			service.ImportSshPublicKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerId",params,undefined,false); 
			copyArgs(n,"SshPublicKeyBody",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(n,"ServerId",params,undefined,false); 
			copyArgs(n,"SshPublicKeyBody",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(msg,"ServerId",params,undefined,false); 
			copyArgs(msg,"SshPublicKeyBody",params,undefined,false); 
			copyArgs(msg,"UserName",params,undefined,false); 
			

			svc.importSshPublicKey(params,cb);
		}
			service.ListAccesses=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerId",params,undefined,false); 
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"ServerId",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"ServerId",params,undefined,false); 
			

			svc.listAccesses(params,cb);
		}
			service.ListExecutions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkflowId",params,undefined,false); 
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"WorkflowId",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"WorkflowId",params,undefined,false); 
			

			svc.listExecutions(params,cb);
		}
			service.ListSecurityPolicies=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listSecurityPolicies(params,cb);
		}
			service.ListServers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listServers(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.ListUsers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerId",params,undefined,false); 
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"ServerId",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"ServerId",params,undefined,false); 
			

			svc.listUsers(params,cb);
		}
			service.ListWorkflows=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listWorkflows(params,cb);
		}
			service.SendWorkflowStepState=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkflowId",params,undefined,false); 
			copyArgs(n,"ExecutionId",params,undefined,false); 
			copyArgs(n,"Token",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(n,"WorkflowId",params,undefined,false); 
			copyArgs(n,"ExecutionId",params,undefined,false); 
			copyArgs(n,"Token",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(msg,"WorkflowId",params,undefined,false); 
			copyArgs(msg,"ExecutionId",params,undefined,false); 
			copyArgs(msg,"Token",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			

			svc.sendWorkflowStepState(params,cb);
		}
			service.StartServer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerId",params,undefined,false); 
			
			copyArgs(n,"ServerId",params,undefined,false); 
			
			copyArgs(msg,"ServerId",params,undefined,false); 
			

			svc.startServer(params,cb);
		}
			service.StopServer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerId",params,undefined,false); 
			
			copyArgs(n,"ServerId",params,undefined,false); 
			
			copyArgs(msg,"ServerId",params,undefined,false); 
			

			svc.stopServer(params,cb);
		}
			service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
			service.TestIdentityProvider=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerId",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(n,"ServerId",params,undefined,false); 
			copyArgs(n,"ServerProtocol",params,undefined,false); 
			copyArgs(n,"SourceIp",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"UserPassword",params,undefined,false); 
			
			copyArgs(msg,"ServerId",params,undefined,false); 
			copyArgs(msg,"ServerProtocol",params,undefined,false); 
			copyArgs(msg,"SourceIp",params,undefined,false); 
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"UserPassword",params,undefined,false); 
			

			svc.testIdentityProvider(params,cb);
		}
			service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
			service.UpdateAccess=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerId",params,undefined,false); 
			copyArgs(n,"ExternalId",params,undefined,false); 
			
			copyArgs(n,"HomeDirectory",params,undefined,false); 
			copyArgs(n,"HomeDirectoryType",params,undefined,false); 
			copyArgs(n,"HomeDirectoryMappings",params,undefined,true); 
			copyArgs(n,"Policy",params,undefined,false); 
			copyArgs(n,"PosixProfile",params,undefined,true); 
			copyArgs(n,"Role",params,undefined,false); 
			copyArgs(n,"ServerId",params,undefined,false); 
			copyArgs(n,"ExternalId",params,undefined,false); 
			
			copyArgs(msg,"HomeDirectory",params,undefined,false); 
			copyArgs(msg,"HomeDirectoryType",params,undefined,false); 
			copyArgs(msg,"HomeDirectoryMappings",params,undefined,true); 
			copyArgs(msg,"Policy",params,undefined,false); 
			copyArgs(msg,"PosixProfile",params,undefined,true); 
			copyArgs(msg,"Role",params,undefined,false); 
			copyArgs(msg,"ServerId",params,undefined,false); 
			copyArgs(msg,"ExternalId",params,undefined,false); 
			

			svc.updateAccess(params,cb);
		}
			service.UpdateServer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerId",params,undefined,false); 
			
			copyArgs(n,"Certificate",params,undefined,false); 
			copyArgs(n,"ProtocolDetails",params,undefined,true); 
			copyArgs(n,"EndpointDetails",params,undefined,true); 
			copyArgs(n,"EndpointType",params,undefined,false); 
			copyArgs(n,"HostKey",params,undefined,true); 
			copyArgs(n,"IdentityProviderDetails",params,undefined,true); 
			copyArgs(n,"LoggingRole",params,undefined,false); 
			copyArgs(n,"Protocols",params,undefined,true); 
			copyArgs(n,"SecurityPolicyName",params,undefined,false); 
			copyArgs(n,"ServerId",params,undefined,false); 
			copyArgs(n,"WorkflowDetails",params,undefined,true); 
			
			copyArgs(msg,"Certificate",params,undefined,false); 
			copyArgs(msg,"ProtocolDetails",params,undefined,true); 
			copyArgs(msg,"EndpointDetails",params,undefined,true); 
			copyArgs(msg,"EndpointType",params,undefined,false); 
			copyArgs(msg,"HostKey",params,undefined,true); 
			copyArgs(msg,"IdentityProviderDetails",params,undefined,true); 
			copyArgs(msg,"LoggingRole",params,undefined,false); 
			copyArgs(msg,"Protocols",params,undefined,true); 
			copyArgs(msg,"SecurityPolicyName",params,undefined,false); 
			copyArgs(msg,"ServerId",params,undefined,false); 
			copyArgs(msg,"WorkflowDetails",params,undefined,true); 
			

			svc.updateServer(params,cb);
		}
			service.UpdateUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerId",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(n,"HomeDirectory",params,undefined,false); 
			copyArgs(n,"HomeDirectoryType",params,undefined,false); 
			copyArgs(n,"HomeDirectoryMappings",params,undefined,true); 
			copyArgs(n,"Policy",params,undefined,false); 
			copyArgs(n,"PosixProfile",params,undefined,true); 
			copyArgs(n,"Role",params,undefined,false); 
			copyArgs(n,"ServerId",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(msg,"HomeDirectory",params,undefined,false); 
			copyArgs(msg,"HomeDirectoryType",params,undefined,false); 
			copyArgs(msg,"HomeDirectoryMappings",params,undefined,true); 
			copyArgs(msg,"Policy",params,undefined,false); 
			copyArgs(msg,"PosixProfile",params,undefined,true); 
			copyArgs(msg,"Role",params,undefined,false); 
			copyArgs(msg,"ServerId",params,undefined,false); 
			copyArgs(msg,"UserName",params,undefined,false); 
			

			svc.updateUser(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS Transfer", AmazonAPINode);

};
