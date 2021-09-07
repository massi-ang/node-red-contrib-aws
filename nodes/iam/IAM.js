
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

		var awsService = new AWS.IAM( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.IAM(msg.AWSConfig) : awsService;

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

		
		service.AddClientIDToOpenIDConnectProvider=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OpenIDConnectProviderArn",params,undefined,false); 
			copyArgs(n,"ClientID",params,undefined,false); 
			
			copyArgs(n,"OpenIDConnectProviderArn",params,undefined,false); 
			copyArgs(n,"ClientID",params,undefined,false); 
			
			copyArgs(msg,"OpenIDConnectProviderArn",params,undefined,false); 
			copyArgs(msg,"ClientID",params,undefined,false); 
			

			svc.addClientIDToOpenIDConnectProvider(params,cb);
		}

		
		service.AddRoleToInstanceProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceProfileName",params,undefined,false); 
			copyArgs(n,"RoleName",params,undefined,false); 
			
			copyArgs(n,"InstanceProfileName",params,undefined,false); 
			copyArgs(n,"RoleName",params,undefined,false); 
			
			copyArgs(msg,"InstanceProfileName",params,undefined,false); 
			copyArgs(msg,"RoleName",params,undefined,false); 
			

			svc.addRoleToInstanceProfile(params,cb);
		}

		
		service.AddUserToGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"UserName",params,undefined,false); 
			

			svc.addUserToGroup(params,cb);
		}

		
		service.AttachGroupPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"PolicyArn",params,undefined,false); 
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"PolicyArn",params,undefined,false); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"PolicyArn",params,undefined,false); 
			

			svc.attachGroupPolicy(params,cb);
		}

		
		service.AttachRolePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"PolicyArn",params,undefined,false); 
			
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"PolicyArn",params,undefined,false); 
			
			copyArgs(msg,"RoleName",params,undefined,false); 
			copyArgs(msg,"PolicyArn",params,undefined,false); 
			

			svc.attachRolePolicy(params,cb);
		}

		
		service.AttachUserPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"PolicyArn",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"PolicyArn",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"PolicyArn",params,undefined,false); 
			

			svc.attachUserPolicy(params,cb);
		}

		
		service.ChangePassword=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OldPassword",params,undefined,true); 
			copyArgs(n,"NewPassword",params,undefined,true); 
			
			copyArgs(n,"OldPassword",params,undefined,true); 
			copyArgs(n,"NewPassword",params,undefined,true); 
			
			copyArgs(msg,"OldPassword",params,undefined,true); 
			copyArgs(msg,"NewPassword",params,undefined,true); 
			

			svc.changePassword(params,cb);
		}

		
		service.CreateAccessKey=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			

			svc.createAccessKey(params,cb);
		}

		
		service.CreateAccountAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountAlias",params,undefined,false); 
			
			copyArgs(n,"AccountAlias",params,undefined,false); 
			
			copyArgs(msg,"AccountAlias",params,undefined,false); 
			

			svc.createAccountAlias(params,cb);
		}

		
		service.CreateGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupName",params,undefined,false); 
			
			copyArgs(n,"Path",params,undefined,false); 
			copyArgs(n,"GroupName",params,undefined,false); 
			
			copyArgs(msg,"Path",params,undefined,false); 
			copyArgs(msg,"GroupName",params,undefined,false); 
			

			svc.createGroup(params,cb);
		}

		
		service.CreateInstanceProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceProfileName",params,undefined,false); 
			
			copyArgs(n,"InstanceProfileName",params,undefined,false); 
			copyArgs(n,"Path",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"InstanceProfileName",params,undefined,false); 
			copyArgs(msg,"Path",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createInstanceProfile(params,cb);
		}

		
		service.CreateLoginProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,true); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,true); 
			copyArgs(n,"PasswordResetRequired",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"Password",params,undefined,true); 
			copyArgs(msg,"PasswordResetRequired",params,undefined,false); 
			

			svc.createLoginProfile(params,cb);
		}

		
		service.CreateOpenIDConnectProvider=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Url",params,undefined,false); 
			copyArgs(n,"ThumbprintList",params,undefined,true); 
			
			copyArgs(n,"Url",params,undefined,false); 
			copyArgs(n,"ClientIDList",params,undefined,true); 
			copyArgs(n,"ThumbprintList",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Url",params,undefined,false); 
			copyArgs(msg,"ClientIDList",params,undefined,true); 
			copyArgs(msg,"ThumbprintList",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createOpenIDConnectProvider(params,cb);
		}

		
		service.CreatePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicyName",params,undefined,false); 
			copyArgs(n,"PolicyDocument",params,undefined,false); 
			
			copyArgs(n,"PolicyName",params,undefined,false); 
			copyArgs(n,"Path",params,undefined,false); 
			copyArgs(n,"PolicyDocument",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"PolicyName",params,undefined,false); 
			copyArgs(msg,"Path",params,undefined,false); 
			copyArgs(msg,"PolicyDocument",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createPolicy(params,cb);
		}

		
		service.CreatePolicyVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicyArn",params,undefined,false); 
			copyArgs(n,"PolicyDocument",params,undefined,false); 
			
			copyArgs(n,"PolicyArn",params,undefined,false); 
			copyArgs(n,"PolicyDocument",params,undefined,false); 
			copyArgs(n,"SetAsDefault",params,undefined,false); 
			
			copyArgs(msg,"PolicyArn",params,undefined,false); 
			copyArgs(msg,"PolicyDocument",params,undefined,false); 
			copyArgs(msg,"SetAsDefault",params,undefined,false); 
			

			svc.createPolicyVersion(params,cb);
		}

		
		service.CreateRole=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"AssumeRolePolicyDocument",params,undefined,false); 
			
			copyArgs(n,"Path",params,undefined,false); 
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"AssumeRolePolicyDocument",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"MaxSessionDuration",params,undefined,false); 
			copyArgs(n,"PermissionsBoundary",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Path",params,undefined,false); 
			copyArgs(msg,"RoleName",params,undefined,false); 
			copyArgs(msg,"AssumeRolePolicyDocument",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"MaxSessionDuration",params,undefined,false); 
			copyArgs(msg,"PermissionsBoundary",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createRole(params,cb);
		}

		
		service.CreateSAMLProvider=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SAMLMetadataDocument",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"SAMLMetadataDocument",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"SAMLMetadataDocument",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createSAMLProvider(params,cb);
		}

		
		service.CreateServiceLinkedRole=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AWSServiceName",params,undefined,false); 
			
			copyArgs(n,"AWSServiceName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"CustomSuffix",params,undefined,false); 
			
			copyArgs(msg,"AWSServiceName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"CustomSuffix",params,undefined,false); 
			

			svc.createServiceLinkedRole(params,cb);
		}

		
		service.CreateServiceSpecificCredential=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"ServiceName",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"ServiceName",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"ServiceName",params,undefined,false); 
			

			svc.createServiceSpecificCredential(params,cb);
		}

		
		service.CreateUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(n,"Path",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"PermissionsBoundary",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Path",params,undefined,false); 
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"PermissionsBoundary",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createUser(params,cb);
		}

		
		service.CreateVirtualMFADevice=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VirtualMFADeviceName",params,undefined,false); 
			
			copyArgs(n,"Path",params,undefined,false); 
			copyArgs(n,"VirtualMFADeviceName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Path",params,undefined,false); 
			copyArgs(msg,"VirtualMFADeviceName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createVirtualMFADevice(params,cb);
		}

		
		service.DeactivateMFADevice=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"SerialNumber",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"SerialNumber",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"SerialNumber",params,undefined,false); 
			

			svc.deactivateMFADevice(params,cb);
		}

		
		service.DeleteAccessKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccessKeyId",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"AccessKeyId",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"AccessKeyId",params,undefined,false); 
			

			svc.deleteAccessKey(params,cb);
		}

		
		service.DeleteAccountAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountAlias",params,undefined,false); 
			
			copyArgs(n,"AccountAlias",params,undefined,false); 
			
			copyArgs(msg,"AccountAlias",params,undefined,false); 
			

			svc.deleteAccountAlias(params,cb);
		}

		
		service.DeleteAccountPasswordPolicy=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.deleteAccountPasswordPolicy(params,cb);
		}

		
		service.DeleteGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupName",params,undefined,false); 
			
			copyArgs(n,"GroupName",params,undefined,false); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			

			svc.deleteGroup(params,cb);
		}

		
		service.DeleteGroupPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"PolicyName",params,undefined,false); 
			

			svc.deleteGroupPolicy(params,cb);
		}

		
		service.DeleteInstanceProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceProfileName",params,undefined,false); 
			
			copyArgs(n,"InstanceProfileName",params,undefined,false); 
			
			copyArgs(msg,"InstanceProfileName",params,undefined,false); 
			

			svc.deleteInstanceProfile(params,cb);
		}

		
		service.DeleteLoginProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			

			svc.deleteLoginProfile(params,cb);
		}

		
		service.DeleteOpenIDConnectProvider=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OpenIDConnectProviderArn",params,undefined,false); 
			
			copyArgs(n,"OpenIDConnectProviderArn",params,undefined,false); 
			
			copyArgs(msg,"OpenIDConnectProviderArn",params,undefined,false); 
			

			svc.deleteOpenIDConnectProvider(params,cb);
		}

		
		service.DeletePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicyArn",params,undefined,false); 
			
			copyArgs(n,"PolicyArn",params,undefined,false); 
			
			copyArgs(msg,"PolicyArn",params,undefined,false); 
			

			svc.deletePolicy(params,cb);
		}

		
		service.DeletePolicyVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicyArn",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			
			copyArgs(n,"PolicyArn",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			
			copyArgs(msg,"PolicyArn",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			

			svc.deletePolicyVersion(params,cb);
		}

		
		service.DeleteRole=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RoleName",params,undefined,false); 
			
			copyArgs(n,"RoleName",params,undefined,false); 
			
			copyArgs(msg,"RoleName",params,undefined,false); 
			

			svc.deleteRole(params,cb);
		}

		
		service.DeleteRolePermissionsBoundary=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RoleName",params,undefined,false); 
			
			copyArgs(n,"RoleName",params,undefined,false); 
			
			copyArgs(msg,"RoleName",params,undefined,false); 
			

			svc.deleteRolePermissionsBoundary(params,cb);
		}

		
		service.DeleteRolePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			
			copyArgs(msg,"RoleName",params,undefined,false); 
			copyArgs(msg,"PolicyName",params,undefined,false); 
			

			svc.deleteRolePolicy(params,cb);
		}

		
		service.DeleteSAMLProvider=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SAMLProviderArn",params,undefined,false); 
			
			copyArgs(n,"SAMLProviderArn",params,undefined,false); 
			
			copyArgs(msg,"SAMLProviderArn",params,undefined,false); 
			

			svc.deleteSAMLProvider(params,cb);
		}

		
		service.DeleteSSHPublicKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"SSHPublicKeyId",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"SSHPublicKeyId",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"SSHPublicKeyId",params,undefined,false); 
			

			svc.deleteSSHPublicKey(params,cb);
		}

		
		service.DeleteServerCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerCertificateName",params,undefined,false); 
			
			copyArgs(n,"ServerCertificateName",params,undefined,false); 
			
			copyArgs(msg,"ServerCertificateName",params,undefined,false); 
			

			svc.deleteServerCertificate(params,cb);
		}

		
		service.DeleteServiceLinkedRole=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RoleName",params,undefined,false); 
			
			copyArgs(n,"RoleName",params,undefined,false); 
			
			copyArgs(msg,"RoleName",params,undefined,false); 
			

			svc.deleteServiceLinkedRole(params,cb);
		}

		
		service.DeleteServiceSpecificCredential=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServiceSpecificCredentialId",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"ServiceSpecificCredentialId",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"ServiceSpecificCredentialId",params,undefined,false); 
			

			svc.deleteServiceSpecificCredential(params,cb);
		}

		
		service.DeleteSigningCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateId",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"CertificateId",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"CertificateId",params,undefined,false); 
			

			svc.deleteSigningCertificate(params,cb);
		}

		
		service.DeleteUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			

			svc.deleteUser(params,cb);
		}

		
		service.DeleteUserPermissionsBoundary=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			

			svc.deleteUserPermissionsBoundary(params,cb);
		}

		
		service.DeleteUserPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"PolicyName",params,undefined,false); 
			

			svc.deleteUserPolicy(params,cb);
		}

		
		service.DeleteVirtualMFADevice=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SerialNumber",params,undefined,false); 
			
			copyArgs(n,"SerialNumber",params,undefined,false); 
			
			copyArgs(msg,"SerialNumber",params,undefined,false); 
			

			svc.deleteVirtualMFADevice(params,cb);
		}

		
		service.DetachGroupPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"PolicyArn",params,undefined,false); 
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"PolicyArn",params,undefined,false); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"PolicyArn",params,undefined,false); 
			

			svc.detachGroupPolicy(params,cb);
		}

		
		service.DetachRolePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"PolicyArn",params,undefined,false); 
			
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"PolicyArn",params,undefined,false); 
			
			copyArgs(msg,"RoleName",params,undefined,false); 
			copyArgs(msg,"PolicyArn",params,undefined,false); 
			

			svc.detachRolePolicy(params,cb);
		}

		
		service.DetachUserPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"PolicyArn",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"PolicyArn",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"PolicyArn",params,undefined,false); 
			

			svc.detachUserPolicy(params,cb);
		}

		
		service.EnableMFADevice=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"SerialNumber",params,undefined,false); 
			copyArgs(n,"AuthenticationCode1",params,undefined,false); 
			copyArgs(n,"AuthenticationCode2",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"SerialNumber",params,undefined,false); 
			copyArgs(n,"AuthenticationCode1",params,undefined,false); 
			copyArgs(n,"AuthenticationCode2",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"SerialNumber",params,undefined,false); 
			copyArgs(msg,"AuthenticationCode1",params,undefined,false); 
			copyArgs(msg,"AuthenticationCode2",params,undefined,false); 
			

			svc.enableMFADevice(params,cb);
		}

		
		service.GenerateCredentialReport=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.generateCredentialReport(params,cb);
		}

		
		service.GenerateOrganizationsAccessReport=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EntityPath",params,undefined,false); 
			
			copyArgs(n,"EntityPath",params,undefined,false); 
			copyArgs(n,"OrganizationsPolicyId",params,undefined,false); 
			
			copyArgs(msg,"EntityPath",params,undefined,false); 
			copyArgs(msg,"OrganizationsPolicyId",params,undefined,false); 
			

			svc.generateOrganizationsAccessReport(params,cb);
		}

		
		service.GenerateServiceLastAccessedDetails=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"Granularity",params,undefined,false); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			copyArgs(msg,"Granularity",params,undefined,false); 
			

			svc.generateServiceLastAccessedDetails(params,cb);
		}

		
		service.GetAccessKeyLastUsed=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccessKeyId",params,undefined,false); 
			
			copyArgs(n,"AccessKeyId",params,undefined,false); 
			
			copyArgs(msg,"AccessKeyId",params,undefined,false); 
			

			svc.getAccessKeyLastUsed(params,cb);
		}

		
		service.GetAccountAuthorizationDetails=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filter",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"Filter",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.getAccountAuthorizationDetails(params,cb);
		}

		
		service.GetAccountPasswordPolicy=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getAccountPasswordPolicy(params,cb);
		}

		
		service.GetAccountSummary=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getAccountSummary(params,cb);
		}

		
		service.GetContextKeysForCustomPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicyInputList",params,undefined,true); 
			
			copyArgs(n,"PolicyInputList",params,undefined,true); 
			
			copyArgs(msg,"PolicyInputList",params,undefined,true); 
			

			svc.getContextKeysForCustomPolicy(params,cb);
		}

		
		service.GetContextKeysForPrincipalPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicySourceArn",params,undefined,false); 
			
			copyArgs(n,"PolicySourceArn",params,undefined,false); 
			copyArgs(n,"PolicyInputList",params,undefined,true); 
			
			copyArgs(msg,"PolicySourceArn",params,undefined,false); 
			copyArgs(msg,"PolicyInputList",params,undefined,true); 
			

			svc.getContextKeysForPrincipalPolicy(params,cb);
		}

		
		service.GetCredentialReport=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getCredentialReport(params,cb);
		}

		
		service.GetGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupName",params,undefined,false); 
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.getGroup(params,cb);
		}

		
		service.GetGroupPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"PolicyName",params,undefined,false); 
			

			svc.getGroupPolicy(params,cb);
		}

		
		service.GetInstanceProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceProfileName",params,undefined,false); 
			
			copyArgs(n,"InstanceProfileName",params,undefined,false); 
			
			copyArgs(msg,"InstanceProfileName",params,undefined,false); 
			

			svc.getInstanceProfile(params,cb);
		}

		
		service.GetLoginProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			

			svc.getLoginProfile(params,cb);
		}

		
		service.GetOpenIDConnectProvider=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OpenIDConnectProviderArn",params,undefined,false); 
			
			copyArgs(n,"OpenIDConnectProviderArn",params,undefined,false); 
			
			copyArgs(msg,"OpenIDConnectProviderArn",params,undefined,false); 
			

			svc.getOpenIDConnectProvider(params,cb);
		}

		
		service.GetOrganizationsAccessReport=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"SortKey",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"SortKey",params,undefined,false); 
			

			svc.getOrganizationsAccessReport(params,cb);
		}

		
		service.GetPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicyArn",params,undefined,false); 
			
			copyArgs(n,"PolicyArn",params,undefined,false); 
			
			copyArgs(msg,"PolicyArn",params,undefined,false); 
			

			svc.getPolicy(params,cb);
		}

		
		service.GetPolicyVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicyArn",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			
			copyArgs(n,"PolicyArn",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			
			copyArgs(msg,"PolicyArn",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			

			svc.getPolicyVersion(params,cb);
		}

		
		service.GetRole=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RoleName",params,undefined,false); 
			
			copyArgs(n,"RoleName",params,undefined,false); 
			
			copyArgs(msg,"RoleName",params,undefined,false); 
			

			svc.getRole(params,cb);
		}

		
		service.GetRolePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			
			copyArgs(msg,"RoleName",params,undefined,false); 
			copyArgs(msg,"PolicyName",params,undefined,false); 
			

			svc.getRolePolicy(params,cb);
		}

		
		service.GetSAMLProvider=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SAMLProviderArn",params,undefined,false); 
			
			copyArgs(n,"SAMLProviderArn",params,undefined,false); 
			
			copyArgs(msg,"SAMLProviderArn",params,undefined,false); 
			

			svc.getSAMLProvider(params,cb);
		}

		
		service.GetSSHPublicKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"SSHPublicKeyId",params,undefined,false); 
			copyArgs(n,"Encoding",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"SSHPublicKeyId",params,undefined,false); 
			copyArgs(n,"Encoding",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"SSHPublicKeyId",params,undefined,false); 
			copyArgs(msg,"Encoding",params,undefined,false); 
			

			svc.getSSHPublicKey(params,cb);
		}

		
		service.GetServerCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerCertificateName",params,undefined,false); 
			
			copyArgs(n,"ServerCertificateName",params,undefined,false); 
			
			copyArgs(msg,"ServerCertificateName",params,undefined,false); 
			

			svc.getServerCertificate(params,cb);
		}

		
		service.GetServiceLastAccessedDetails=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.getServiceLastAccessedDetails(params,cb);
		}

		
		service.GetServiceLastAccessedDetailsWithEntities=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(n,"ServiceNamespace",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(n,"ServiceNamespace",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			copyArgs(msg,"ServiceNamespace",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.getServiceLastAccessedDetailsWithEntities(params,cb);
		}

		
		service.GetServiceLinkedRoleDeletionStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeletionTaskId",params,undefined,false); 
			
			copyArgs(n,"DeletionTaskId",params,undefined,false); 
			
			copyArgs(msg,"DeletionTaskId",params,undefined,false); 
			

			svc.getServiceLinkedRoleDeletionStatus(params,cb);
		}

		
		service.GetUser=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			

			svc.getUser(params,cb);
		}

		
		service.GetUserPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"PolicyName",params,undefined,false); 
			

			svc.getUserPolicy(params,cb);
		}

		
		service.ListAccessKeys=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listAccessKeys(params,cb);
		}

		
		service.ListAccountAliases=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listAccountAliases(params,cb);
		}

		
		service.ListAttachedGroupPolicies=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupName",params,undefined,false); 
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"PathPrefix",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"PathPrefix",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listAttachedGroupPolicies(params,cb);
		}

		
		service.ListAttachedRolePolicies=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RoleName",params,undefined,false); 
			
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"PathPrefix",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"RoleName",params,undefined,false); 
			copyArgs(msg,"PathPrefix",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listAttachedRolePolicies(params,cb);
		}

		
		service.ListAttachedUserPolicies=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"PathPrefix",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"PathPrefix",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listAttachedUserPolicies(params,cb);
		}

		
		service.ListEntitiesForPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicyArn",params,undefined,false); 
			
			copyArgs(n,"PolicyArn",params,undefined,false); 
			copyArgs(n,"EntityFilter",params,undefined,false); 
			copyArgs(n,"PathPrefix",params,undefined,false); 
			copyArgs(n,"PolicyUsageFilter",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"PolicyArn",params,undefined,false); 
			copyArgs(msg,"EntityFilter",params,undefined,false); 
			copyArgs(msg,"PathPrefix",params,undefined,false); 
			copyArgs(msg,"PolicyUsageFilter",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listEntitiesForPolicy(params,cb);
		}

		
		service.ListGroupPolicies=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupName",params,undefined,false); 
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listGroupPolicies(params,cb);
		}

		
		service.ListGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"PathPrefix",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"PathPrefix",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listGroups(params,cb);
		}

		
		service.ListGroupsForUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listGroupsForUser(params,cb);
		}

		
		service.ListInstanceProfileTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceProfileName",params,undefined,false); 
			
			copyArgs(n,"InstanceProfileName",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"InstanceProfileName",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listInstanceProfileTags(params,cb);
		}

		
		service.ListInstanceProfiles=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"PathPrefix",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"PathPrefix",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listInstanceProfiles(params,cb);
		}

		
		service.ListInstanceProfilesForRole=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RoleName",params,undefined,false); 
			
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"RoleName",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listInstanceProfilesForRole(params,cb);
		}

		
		service.ListMFADeviceTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SerialNumber",params,undefined,false); 
			
			copyArgs(n,"SerialNumber",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"SerialNumber",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listMFADeviceTags(params,cb);
		}

		
		service.ListMFADevices=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listMFADevices(params,cb);
		}

		
		service.ListOpenIDConnectProviderTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OpenIDConnectProviderArn",params,undefined,false); 
			
			copyArgs(n,"OpenIDConnectProviderArn",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"OpenIDConnectProviderArn",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listOpenIDConnectProviderTags(params,cb);
		}

		
		service.ListOpenIDConnectProviders=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.listOpenIDConnectProviders(params,cb);
		}

		
		service.ListPolicies=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"OnlyAttached",params,undefined,false); 
			copyArgs(n,"PathPrefix",params,undefined,false); 
			copyArgs(n,"PolicyUsageFilter",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"OnlyAttached",params,undefined,false); 
			copyArgs(msg,"PathPrefix",params,undefined,false); 
			copyArgs(msg,"PolicyUsageFilter",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listPolicies(params,cb);
		}

		
		service.ListPoliciesGrantingServiceAccess=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"ServiceNamespaces",params,undefined,false); 
			
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"ServiceNamespaces",params,undefined,false); 
			
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"Arn",params,undefined,false); 
			copyArgs(msg,"ServiceNamespaces",params,undefined,false); 
			

			svc.listPoliciesGrantingServiceAccess(params,cb);
		}

		
		service.ListPolicyTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicyArn",params,undefined,false); 
			
			copyArgs(n,"PolicyArn",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"PolicyArn",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listPolicyTags(params,cb);
		}

		
		service.ListPolicyVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicyArn",params,undefined,false); 
			
			copyArgs(n,"PolicyArn",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"PolicyArn",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listPolicyVersions(params,cb);
		}

		
		service.ListRolePolicies=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RoleName",params,undefined,false); 
			
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"RoleName",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listRolePolicies(params,cb);
		}

		
		service.ListRoleTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RoleName",params,undefined,false); 
			
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"RoleName",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listRoleTags(params,cb);
		}

		
		service.ListRoles=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"PathPrefix",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"PathPrefix",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listRoles(params,cb);
		}

		
		service.ListSAMLProviderTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SAMLProviderArn",params,undefined,false); 
			
			copyArgs(n,"SAMLProviderArn",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"SAMLProviderArn",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listSAMLProviderTags(params,cb);
		}

		
		service.ListSAMLProviders=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.listSAMLProviders(params,cb);
		}

		
		service.ListSSHPublicKeys=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listSSHPublicKeys(params,cb);
		}

		
		service.ListServerCertificateTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerCertificateName",params,undefined,false); 
			
			copyArgs(n,"ServerCertificateName",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"ServerCertificateName",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listServerCertificateTags(params,cb);
		}

		
		service.ListServerCertificates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"PathPrefix",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"PathPrefix",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listServerCertificates(params,cb);
		}

		
		service.ListServiceSpecificCredentials=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"ServiceName",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"ServiceName",params,undefined,false); 
			

			svc.listServiceSpecificCredentials(params,cb);
		}

		
		service.ListSigningCertificates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listSigningCertificates(params,cb);
		}

		
		service.ListUserPolicies=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listUserPolicies(params,cb);
		}

		
		service.ListUserTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listUserTags(params,cb);
		}

		
		service.ListUsers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"PathPrefix",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"PathPrefix",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listUsers(params,cb);
		}

		
		service.ListVirtualMFADevices=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AssignmentStatus",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"AssignmentStatus",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listVirtualMFADevices(params,cb);
		}

		
		service.PutGroupPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			copyArgs(n,"PolicyDocument",params,undefined,false); 
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			copyArgs(n,"PolicyDocument",params,undefined,false); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"PolicyName",params,undefined,false); 
			copyArgs(msg,"PolicyDocument",params,undefined,false); 
			

			svc.putGroupPolicy(params,cb);
		}

		
		service.PutRolePermissionsBoundary=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"PermissionsBoundary",params,undefined,false); 
			
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"PermissionsBoundary",params,undefined,false); 
			
			copyArgs(msg,"RoleName",params,undefined,false); 
			copyArgs(msg,"PermissionsBoundary",params,undefined,false); 
			

			svc.putRolePermissionsBoundary(params,cb);
		}

		
		service.PutRolePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			copyArgs(n,"PolicyDocument",params,undefined,false); 
			
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			copyArgs(n,"PolicyDocument",params,undefined,false); 
			
			copyArgs(msg,"RoleName",params,undefined,false); 
			copyArgs(msg,"PolicyName",params,undefined,false); 
			copyArgs(msg,"PolicyDocument",params,undefined,false); 
			

			svc.putRolePolicy(params,cb);
		}

		
		service.PutUserPermissionsBoundary=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"PermissionsBoundary",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"PermissionsBoundary",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"PermissionsBoundary",params,undefined,false); 
			

			svc.putUserPermissionsBoundary(params,cb);
		}

		
		service.PutUserPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			copyArgs(n,"PolicyDocument",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			copyArgs(n,"PolicyDocument",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"PolicyName",params,undefined,false); 
			copyArgs(msg,"PolicyDocument",params,undefined,false); 
			

			svc.putUserPolicy(params,cb);
		}

		
		service.RemoveClientIDFromOpenIDConnectProvider=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OpenIDConnectProviderArn",params,undefined,false); 
			copyArgs(n,"ClientID",params,undefined,false); 
			
			copyArgs(n,"OpenIDConnectProviderArn",params,undefined,false); 
			copyArgs(n,"ClientID",params,undefined,false); 
			
			copyArgs(msg,"OpenIDConnectProviderArn",params,undefined,false); 
			copyArgs(msg,"ClientID",params,undefined,false); 
			

			svc.removeClientIDFromOpenIDConnectProvider(params,cb);
		}

		
		service.RemoveRoleFromInstanceProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceProfileName",params,undefined,false); 
			copyArgs(n,"RoleName",params,undefined,false); 
			
			copyArgs(n,"InstanceProfileName",params,undefined,false); 
			copyArgs(n,"RoleName",params,undefined,false); 
			
			copyArgs(msg,"InstanceProfileName",params,undefined,false); 
			copyArgs(msg,"RoleName",params,undefined,false); 
			

			svc.removeRoleFromInstanceProfile(params,cb);
		}

		
		service.RemoveUserFromGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"UserName",params,undefined,false); 
			

			svc.removeUserFromGroup(params,cb);
		}

		
		service.ResetServiceSpecificCredential=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServiceSpecificCredentialId",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"ServiceSpecificCredentialId",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"ServiceSpecificCredentialId",params,undefined,false); 
			

			svc.resetServiceSpecificCredential(params,cb);
		}

		
		service.ResyncMFADevice=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"SerialNumber",params,undefined,false); 
			copyArgs(n,"AuthenticationCode1",params,undefined,false); 
			copyArgs(n,"AuthenticationCode2",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"SerialNumber",params,undefined,false); 
			copyArgs(n,"AuthenticationCode1",params,undefined,false); 
			copyArgs(n,"AuthenticationCode2",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"SerialNumber",params,undefined,false); 
			copyArgs(msg,"AuthenticationCode1",params,undefined,false); 
			copyArgs(msg,"AuthenticationCode2",params,undefined,false); 
			

			svc.resyncMFADevice(params,cb);
		}

		
		service.SetDefaultPolicyVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicyArn",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			
			copyArgs(n,"PolicyArn",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			
			copyArgs(msg,"PolicyArn",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			

			svc.setDefaultPolicyVersion(params,cb);
		}

		
		service.SetSecurityTokenServicePreferences=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalEndpointTokenVersion",params,undefined,false); 
			
			copyArgs(n,"GlobalEndpointTokenVersion",params,undefined,false); 
			
			copyArgs(msg,"GlobalEndpointTokenVersion",params,undefined,false); 
			

			svc.setSecurityTokenServicePreferences(params,cb);
		}

		
		service.SimulateCustomPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicyInputList",params,undefined,true); 
			copyArgs(n,"ActionNames",params,undefined,true); 
			
			copyArgs(n,"PolicyInputList",params,undefined,true); 
			copyArgs(n,"PermissionsBoundaryPolicyInputList",params,undefined,true); 
			copyArgs(n,"ActionNames",params,undefined,true); 
			copyArgs(n,"ResourceArns",params,undefined,true); 
			copyArgs(n,"ResourcePolicy",params,undefined,false); 
			copyArgs(n,"ResourceOwner",params,undefined,false); 
			copyArgs(n,"CallerArn",params,undefined,false); 
			copyArgs(n,"ContextEntries",params,undefined,true); 
			copyArgs(n,"ResourceHandlingOption",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"PolicyInputList",params,undefined,true); 
			copyArgs(msg,"PermissionsBoundaryPolicyInputList",params,undefined,true); 
			copyArgs(msg,"ActionNames",params,undefined,true); 
			copyArgs(msg,"ResourceArns",params,undefined,true); 
			copyArgs(msg,"ResourcePolicy",params,undefined,false); 
			copyArgs(msg,"ResourceOwner",params,undefined,false); 
			copyArgs(msg,"CallerArn",params,undefined,false); 
			copyArgs(msg,"ContextEntries",params,undefined,true); 
			copyArgs(msg,"ResourceHandlingOption",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.simulateCustomPolicy(params,cb);
		}

		
		service.SimulatePrincipalPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicySourceArn",params,undefined,false); 
			copyArgs(n,"ActionNames",params,undefined,true); 
			
			copyArgs(n,"PolicySourceArn",params,undefined,false); 
			copyArgs(n,"PolicyInputList",params,undefined,true); 
			copyArgs(n,"PermissionsBoundaryPolicyInputList",params,undefined,true); 
			copyArgs(n,"ActionNames",params,undefined,true); 
			copyArgs(n,"ResourceArns",params,undefined,true); 
			copyArgs(n,"ResourcePolicy",params,undefined,false); 
			copyArgs(n,"ResourceOwner",params,undefined,false); 
			copyArgs(n,"CallerArn",params,undefined,false); 
			copyArgs(n,"ContextEntries",params,undefined,true); 
			copyArgs(n,"ResourceHandlingOption",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"PolicySourceArn",params,undefined,false); 
			copyArgs(msg,"PolicyInputList",params,undefined,true); 
			copyArgs(msg,"PermissionsBoundaryPolicyInputList",params,undefined,true); 
			copyArgs(msg,"ActionNames",params,undefined,true); 
			copyArgs(msg,"ResourceArns",params,undefined,true); 
			copyArgs(msg,"ResourcePolicy",params,undefined,false); 
			copyArgs(msg,"ResourceOwner",params,undefined,false); 
			copyArgs(msg,"CallerArn",params,undefined,false); 
			copyArgs(msg,"ContextEntries",params,undefined,true); 
			copyArgs(msg,"ResourceHandlingOption",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.simulatePrincipalPolicy(params,cb);
		}

		
		service.TagInstanceProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceProfileName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"InstanceProfileName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"InstanceProfileName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagInstanceProfile(params,cb);
		}

		
		service.TagMFADevice=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SerialNumber",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"SerialNumber",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"SerialNumber",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagMFADevice(params,cb);
		}

		
		service.TagOpenIDConnectProvider=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OpenIDConnectProviderArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"OpenIDConnectProviderArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"OpenIDConnectProviderArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagOpenIDConnectProvider(params,cb);
		}

		
		service.TagPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicyArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"PolicyArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"PolicyArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagPolicy(params,cb);
		}

		
		service.TagRole=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"RoleName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagRole(params,cb);
		}

		
		service.TagSAMLProvider=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SAMLProviderArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"SAMLProviderArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"SAMLProviderArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagSAMLProvider(params,cb);
		}

		
		service.TagServerCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerCertificateName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ServerCertificateName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ServerCertificateName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagServerCertificate(params,cb);
		}

		
		service.TagUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagUser(params,cb);
		}

		
		service.UntagInstanceProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceProfileName",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(n,"InstanceProfileName",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(msg,"InstanceProfileName",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			

			svc.untagInstanceProfile(params,cb);
		}

		
		service.UntagMFADevice=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SerialNumber",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(n,"SerialNumber",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(msg,"SerialNumber",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			

			svc.untagMFADevice(params,cb);
		}

		
		service.UntagOpenIDConnectProvider=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OpenIDConnectProviderArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(n,"OpenIDConnectProviderArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(msg,"OpenIDConnectProviderArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			

			svc.untagOpenIDConnectProvider(params,cb);
		}

		
		service.UntagPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicyArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(n,"PolicyArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(msg,"PolicyArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			

			svc.untagPolicy(params,cb);
		}

		
		service.UntagRole=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(msg,"RoleName",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			

			svc.untagRole(params,cb);
		}

		
		service.UntagSAMLProvider=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SAMLProviderArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(n,"SAMLProviderArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(msg,"SAMLProviderArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			

			svc.untagSAMLProvider(params,cb);
		}

		
		service.UntagServerCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerCertificateName",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(n,"ServerCertificateName",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(msg,"ServerCertificateName",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			

			svc.untagServerCertificate(params,cb);
		}

		
		service.UntagUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			

			svc.untagUser(params,cb);
		}

		
		service.UpdateAccessKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccessKeyId",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"AccessKeyId",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"AccessKeyId",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			

			svc.updateAccessKey(params,cb);
		}

		
		service.UpdateAccountPasswordPolicy=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MinimumPasswordLength",params,undefined,false); 
			copyArgs(n,"RequireSymbols",params,undefined,false); 
			copyArgs(n,"RequireNumbers",params,undefined,false); 
			copyArgs(n,"RequireUppercaseCharacters",params,undefined,false); 
			copyArgs(n,"RequireLowercaseCharacters",params,undefined,false); 
			copyArgs(n,"AllowUsersToChangePassword",params,undefined,false); 
			copyArgs(n,"MaxPasswordAge",params,undefined,false); 
			copyArgs(n,"PasswordReusePrevention",params,undefined,false); 
			copyArgs(n,"HardExpiry",params,undefined,false); 
			
			copyArgs(msg,"MinimumPasswordLength",params,undefined,false); 
			copyArgs(msg,"RequireSymbols",params,undefined,false); 
			copyArgs(msg,"RequireNumbers",params,undefined,false); 
			copyArgs(msg,"RequireUppercaseCharacters",params,undefined,false); 
			copyArgs(msg,"RequireLowercaseCharacters",params,undefined,false); 
			copyArgs(msg,"AllowUsersToChangePassword",params,undefined,false); 
			copyArgs(msg,"MaxPasswordAge",params,undefined,false); 
			copyArgs(msg,"PasswordReusePrevention",params,undefined,false); 
			copyArgs(msg,"HardExpiry",params,undefined,false); 
			

			svc.updateAccountPasswordPolicy(params,cb);
		}

		
		service.UpdateAssumeRolePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"PolicyDocument",params,undefined,false); 
			
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"PolicyDocument",params,undefined,false); 
			
			copyArgs(msg,"RoleName",params,undefined,false); 
			copyArgs(msg,"PolicyDocument",params,undefined,false); 
			

			svc.updateAssumeRolePolicy(params,cb);
		}

		
		service.UpdateGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupName",params,undefined,false); 
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"NewPath",params,undefined,false); 
			copyArgs(n,"NewGroupName",params,undefined,false); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"NewPath",params,undefined,false); 
			copyArgs(msg,"NewGroupName",params,undefined,false); 
			

			svc.updateGroup(params,cb);
		}

		
		service.UpdateLoginProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,true); 
			copyArgs(n,"PasswordResetRequired",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"Password",params,undefined,true); 
			copyArgs(msg,"PasswordResetRequired",params,undefined,false); 
			

			svc.updateLoginProfile(params,cb);
		}

		
		service.UpdateOpenIDConnectProviderThumbprint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OpenIDConnectProviderArn",params,undefined,false); 
			copyArgs(n,"ThumbprintList",params,undefined,true); 
			
			copyArgs(n,"OpenIDConnectProviderArn",params,undefined,false); 
			copyArgs(n,"ThumbprintList",params,undefined,true); 
			
			copyArgs(msg,"OpenIDConnectProviderArn",params,undefined,false); 
			copyArgs(msg,"ThumbprintList",params,undefined,true); 
			

			svc.updateOpenIDConnectProviderThumbprint(params,cb);
		}

		
		service.UpdateRole=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RoleName",params,undefined,false); 
			
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"MaxSessionDuration",params,undefined,false); 
			
			copyArgs(msg,"RoleName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"MaxSessionDuration",params,undefined,false); 
			

			svc.updateRole(params,cb);
		}

		
		service.UpdateRoleDescription=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(msg,"RoleName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			

			svc.updateRoleDescription(params,cb);
		}

		
		service.UpdateSAMLProvider=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SAMLMetadataDocument",params,undefined,false); 
			copyArgs(n,"SAMLProviderArn",params,undefined,false); 
			
			copyArgs(n,"SAMLMetadataDocument",params,undefined,false); 
			copyArgs(n,"SAMLProviderArn",params,undefined,false); 
			
			copyArgs(msg,"SAMLMetadataDocument",params,undefined,false); 
			copyArgs(msg,"SAMLProviderArn",params,undefined,false); 
			

			svc.updateSAMLProvider(params,cb);
		}

		
		service.UpdateSSHPublicKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"SSHPublicKeyId",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"SSHPublicKeyId",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"SSHPublicKeyId",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			

			svc.updateSSHPublicKey(params,cb);
		}

		
		service.UpdateServerCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerCertificateName",params,undefined,false); 
			
			copyArgs(n,"ServerCertificateName",params,undefined,false); 
			copyArgs(n,"NewPath",params,undefined,false); 
			copyArgs(n,"NewServerCertificateName",params,undefined,false); 
			
			copyArgs(msg,"ServerCertificateName",params,undefined,false); 
			copyArgs(msg,"NewPath",params,undefined,false); 
			copyArgs(msg,"NewServerCertificateName",params,undefined,false); 
			

			svc.updateServerCertificate(params,cb);
		}

		
		service.UpdateServiceSpecificCredential=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServiceSpecificCredentialId",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"ServiceSpecificCredentialId",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"ServiceSpecificCredentialId",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			

			svc.updateServiceSpecificCredential(params,cb);
		}

		
		service.UpdateSigningCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateId",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"CertificateId",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"CertificateId",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			

			svc.updateSigningCertificate(params,cb);
		}

		
		service.UpdateUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"NewPath",params,undefined,false); 
			copyArgs(n,"NewUserName",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"NewPath",params,undefined,false); 
			copyArgs(msg,"NewUserName",params,undefined,false); 
			

			svc.updateUser(params,cb);
		}

		
		service.UploadSSHPublicKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"SSHPublicKeyBody",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"SSHPublicKeyBody",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"SSHPublicKeyBody",params,undefined,false); 
			

			svc.uploadSSHPublicKey(params,cb);
		}

		
		service.UploadServerCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerCertificateName",params,undefined,false); 
			copyArgs(n,"CertificateBody",params,undefined,false); 
			copyArgs(n,"PrivateKey",params,undefined,false); 
			
			copyArgs(n,"Path",params,undefined,false); 
			copyArgs(n,"ServerCertificateName",params,undefined,false); 
			copyArgs(n,"CertificateBody",params,undefined,false); 
			copyArgs(n,"PrivateKey",params,undefined,false); 
			copyArgs(n,"CertificateChain",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Path",params,undefined,false); 
			copyArgs(msg,"ServerCertificateName",params,undefined,false); 
			copyArgs(msg,"CertificateBody",params,undefined,false); 
			copyArgs(msg,"PrivateKey",params,undefined,false); 
			copyArgs(msg,"CertificateChain",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.uploadServerCertificate(params,cb);
		}

		
		service.UploadSigningCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CertificateBody",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"CertificateBody",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"CertificateBody",params,undefined,false); 
			

			svc.uploadSigningCertificate(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS IAM", AmazonAPINode);

};
