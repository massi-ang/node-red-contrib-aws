
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

		var awsService = new AWS.IAM( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.IAM(msg.AWSConfig) : awsService;

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

		
		service.AddClientIDToOpenIDConnectProvider=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OpenIDConnectProviderArn",params,undefined,false); 
			copyArg(n,"ClientID",params,undefined,false); 
			
			copyArg(msg,"OpenIDConnectProviderArn",params,undefined,false); 
			copyArg(msg,"ClientID",params,undefined,false); 
			

			svc.addClientIDToOpenIDConnectProvider(params,cb);
		}

		
		service.AddRoleToInstanceProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceProfileName",params,undefined,false); 
			copyArg(n,"RoleName",params,undefined,false); 
			
			copyArg(msg,"InstanceProfileName",params,undefined,false); 
			copyArg(msg,"RoleName",params,undefined,false); 
			

			svc.addRoleToInstanceProfile(params,cb);
		}

		
		service.AddUserToGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupName",params,undefined,false); 
			copyArg(n,"UserName",params,undefined,false); 
			
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"UserName",params,undefined,false); 
			

			svc.addUserToGroup(params,cb);
		}

		
		service.AttachGroupPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupName",params,undefined,false); 
			copyArg(n,"PolicyArn",params,undefined,false); 
			
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"PolicyArn",params,undefined,false); 
			

			svc.attachGroupPolicy(params,cb);
		}

		
		service.AttachRolePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RoleName",params,undefined,false); 
			copyArg(n,"PolicyArn",params,undefined,false); 
			
			copyArg(msg,"RoleName",params,undefined,false); 
			copyArg(msg,"PolicyArn",params,undefined,false); 
			

			svc.attachRolePolicy(params,cb);
		}

		
		service.AttachUserPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			copyArg(n,"PolicyArn",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"PolicyArn",params,undefined,false); 
			

			svc.attachUserPolicy(params,cb);
		}

		
		service.ChangePassword=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OldPassword",params,undefined,true); 
			copyArg(n,"NewPassword",params,undefined,true); 
			
			copyArg(msg,"OldPassword",params,undefined,true); 
			copyArg(msg,"NewPassword",params,undefined,true); 
			

			svc.changePassword(params,cb);
		}

		
		service.CreateAccessKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"UserName",params,undefined,false); 
			

			svc.createAccessKey(params,cb);
		}

		
		service.CreateAccountAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountAlias",params,undefined,false); 
			
			copyArg(msg,"AccountAlias",params,undefined,false); 
			

			svc.createAccountAlias(params,cb);
		}

		
		service.CreateGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupName",params,undefined,false); 
			
			copyArg(msg,"Path",params,undefined,false); 
			copyArg(msg,"GroupName",params,undefined,false); 
			

			svc.createGroup(params,cb);
		}

		
		service.CreateInstanceProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceProfileName",params,undefined,false); 
			
			copyArg(msg,"InstanceProfileName",params,undefined,false); 
			copyArg(msg,"Path",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createInstanceProfile(params,cb);
		}

		
		service.CreateLoginProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			copyArg(n,"Password",params,undefined,true); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"Password",params,undefined,true); 
			copyArg(msg,"PasswordResetRequired",params,undefined,false); 
			

			svc.createLoginProfile(params,cb);
		}

		
		service.CreateOpenIDConnectProvider=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Url",params,undefined,false); 
			copyArg(n,"ThumbprintList",params,undefined,true); 
			
			copyArg(msg,"Url",params,undefined,false); 
			copyArg(msg,"ClientIDList",params,undefined,true); 
			copyArg(msg,"ThumbprintList",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createOpenIDConnectProvider(params,cb);
		}

		
		service.CreatePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyName",params,undefined,false); 
			copyArg(n,"PolicyDocument",params,undefined,false); 
			
			copyArg(msg,"PolicyName",params,undefined,false); 
			copyArg(msg,"Path",params,undefined,false); 
			copyArg(msg,"PolicyDocument",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createPolicy(params,cb);
		}

		
		service.CreatePolicyVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyArn",params,undefined,false); 
			copyArg(n,"PolicyDocument",params,undefined,false); 
			
			copyArg(msg,"PolicyArn",params,undefined,false); 
			copyArg(msg,"PolicyDocument",params,undefined,false); 
			copyArg(msg,"SetAsDefault",params,undefined,false); 
			

			svc.createPolicyVersion(params,cb);
		}

		
		service.CreateRole=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RoleName",params,undefined,false); 
			copyArg(n,"AssumeRolePolicyDocument",params,undefined,false); 
			
			copyArg(msg,"Path",params,undefined,false); 
			copyArg(msg,"RoleName",params,undefined,false); 
			copyArg(msg,"AssumeRolePolicyDocument",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"MaxSessionDuration",params,undefined,false); 
			copyArg(msg,"PermissionsBoundary",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createRole(params,cb);
		}

		
		service.CreateSAMLProvider=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SAMLMetadataDocument",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"SAMLMetadataDocument",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createSAMLProvider(params,cb);
		}

		
		service.CreateServiceLinkedRole=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AWSServiceName",params,undefined,false); 
			
			copyArg(msg,"AWSServiceName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"CustomSuffix",params,undefined,false); 
			

			svc.createServiceLinkedRole(params,cb);
		}

		
		service.CreateServiceSpecificCredential=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			copyArg(n,"ServiceName",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"ServiceName",params,undefined,false); 
			

			svc.createServiceSpecificCredential(params,cb);
		}

		
		service.CreateUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			
			copyArg(msg,"Path",params,undefined,false); 
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"PermissionsBoundary",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createUser(params,cb);
		}

		
		service.CreateVirtualMFADevice=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VirtualMFADeviceName",params,undefined,false); 
			
			copyArg(msg,"Path",params,undefined,false); 
			copyArg(msg,"VirtualMFADeviceName",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createVirtualMFADevice(params,cb);
		}

		
		service.DeactivateMFADevice=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			copyArg(n,"SerialNumber",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"SerialNumber",params,undefined,false); 
			

			svc.deactivateMFADevice(params,cb);
		}

		
		service.DeleteAccessKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccessKeyId",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"AccessKeyId",params,undefined,false); 
			

			svc.deleteAccessKey(params,cb);
		}

		
		service.DeleteAccountAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountAlias",params,undefined,false); 
			
			copyArg(msg,"AccountAlias",params,undefined,false); 
			

			svc.deleteAccountAlias(params,cb);
		}

		
		service.DeleteAccountPasswordPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.deleteAccountPasswordPolicy(params,cb);
		}

		
		service.DeleteGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupName",params,undefined,false); 
			
			copyArg(msg,"GroupName",params,undefined,false); 
			

			svc.deleteGroup(params,cb);
		}

		
		service.DeleteGroupPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupName",params,undefined,false); 
			copyArg(n,"PolicyName",params,undefined,false); 
			
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"PolicyName",params,undefined,false); 
			

			svc.deleteGroupPolicy(params,cb);
		}

		
		service.DeleteInstanceProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceProfileName",params,undefined,false); 
			
			copyArg(msg,"InstanceProfileName",params,undefined,false); 
			

			svc.deleteInstanceProfile(params,cb);
		}

		
		service.DeleteLoginProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			

			svc.deleteLoginProfile(params,cb);
		}

		
		service.DeleteOpenIDConnectProvider=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OpenIDConnectProviderArn",params,undefined,false); 
			
			copyArg(msg,"OpenIDConnectProviderArn",params,undefined,false); 
			

			svc.deleteOpenIDConnectProvider(params,cb);
		}

		
		service.DeletePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyArn",params,undefined,false); 
			
			copyArg(msg,"PolicyArn",params,undefined,false); 
			

			svc.deletePolicy(params,cb);
		}

		
		service.DeletePolicyVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyArn",params,undefined,false); 
			copyArg(n,"VersionId",params,undefined,false); 
			
			copyArg(msg,"PolicyArn",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			

			svc.deletePolicyVersion(params,cb);
		}

		
		service.DeleteRole=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RoleName",params,undefined,false); 
			
			copyArg(msg,"RoleName",params,undefined,false); 
			

			svc.deleteRole(params,cb);
		}

		
		service.DeleteRolePermissionsBoundary=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RoleName",params,undefined,false); 
			
			copyArg(msg,"RoleName",params,undefined,false); 
			

			svc.deleteRolePermissionsBoundary(params,cb);
		}

		
		service.DeleteRolePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RoleName",params,undefined,false); 
			copyArg(n,"PolicyName",params,undefined,false); 
			
			copyArg(msg,"RoleName",params,undefined,false); 
			copyArg(msg,"PolicyName",params,undefined,false); 
			

			svc.deleteRolePolicy(params,cb);
		}

		
		service.DeleteSAMLProvider=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SAMLProviderArn",params,undefined,false); 
			
			copyArg(msg,"SAMLProviderArn",params,undefined,false); 
			

			svc.deleteSAMLProvider(params,cb);
		}

		
		service.DeleteSSHPublicKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			copyArg(n,"SSHPublicKeyId",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"SSHPublicKeyId",params,undefined,false); 
			

			svc.deleteSSHPublicKey(params,cb);
		}

		
		service.DeleteServerCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerCertificateName",params,undefined,false); 
			
			copyArg(msg,"ServerCertificateName",params,undefined,false); 
			

			svc.deleteServerCertificate(params,cb);
		}

		
		service.DeleteServiceLinkedRole=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RoleName",params,undefined,false); 
			
			copyArg(msg,"RoleName",params,undefined,false); 
			

			svc.deleteServiceLinkedRole(params,cb);
		}

		
		service.DeleteServiceSpecificCredential=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceSpecificCredentialId",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"ServiceSpecificCredentialId",params,undefined,false); 
			

			svc.deleteServiceSpecificCredential(params,cb);
		}

		
		service.DeleteSigningCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateId",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"CertificateId",params,undefined,false); 
			

			svc.deleteSigningCertificate(params,cb);
		}

		
		service.DeleteUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			

			svc.deleteUser(params,cb);
		}

		
		service.DeleteUserPermissionsBoundary=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			

			svc.deleteUserPermissionsBoundary(params,cb);
		}

		
		service.DeleteUserPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			copyArg(n,"PolicyName",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"PolicyName",params,undefined,false); 
			

			svc.deleteUserPolicy(params,cb);
		}

		
		service.DeleteVirtualMFADevice=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SerialNumber",params,undefined,false); 
			
			copyArg(msg,"SerialNumber",params,undefined,false); 
			

			svc.deleteVirtualMFADevice(params,cb);
		}

		
		service.DetachGroupPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupName",params,undefined,false); 
			copyArg(n,"PolicyArn",params,undefined,false); 
			
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"PolicyArn",params,undefined,false); 
			

			svc.detachGroupPolicy(params,cb);
		}

		
		service.DetachRolePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RoleName",params,undefined,false); 
			copyArg(n,"PolicyArn",params,undefined,false); 
			
			copyArg(msg,"RoleName",params,undefined,false); 
			copyArg(msg,"PolicyArn",params,undefined,false); 
			

			svc.detachRolePolicy(params,cb);
		}

		
		service.DetachUserPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			copyArg(n,"PolicyArn",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"PolicyArn",params,undefined,false); 
			

			svc.detachUserPolicy(params,cb);
		}

		
		service.EnableMFADevice=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			copyArg(n,"SerialNumber",params,undefined,false); 
			copyArg(n,"AuthenticationCode1",params,undefined,false); 
			copyArg(n,"AuthenticationCode2",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"SerialNumber",params,undefined,false); 
			copyArg(msg,"AuthenticationCode1",params,undefined,false); 
			copyArg(msg,"AuthenticationCode2",params,undefined,false); 
			

			svc.enableMFADevice(params,cb);
		}

		
		service.GenerateCredentialReport=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.generateCredentialReport(params,cb);
		}

		
		service.GenerateOrganizationsAccessReport=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EntityPath",params,undefined,false); 
			
			copyArg(msg,"EntityPath",params,undefined,false); 
			copyArg(msg,"OrganizationsPolicyId",params,undefined,false); 
			

			svc.generateOrganizationsAccessReport(params,cb);
		}

		
		service.GenerateServiceLastAccessedDetails=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Arn",params,undefined,false); 
			
			copyArg(msg,"Arn",params,undefined,false); 
			copyArg(msg,"Granularity",params,undefined,false); 
			

			svc.generateServiceLastAccessedDetails(params,cb);
		}

		
		service.GetAccessKeyLastUsed=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccessKeyId",params,undefined,false); 
			
			copyArg(msg,"AccessKeyId",params,undefined,false); 
			

			svc.getAccessKeyLastUsed(params,cb);
		}

		
		service.GetAccountAuthorizationDetails=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filter",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.getAccountAuthorizationDetails(params,cb);
		}

		
		service.GetAccountPasswordPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getAccountPasswordPolicy(params,cb);
		}

		
		service.GetAccountSummary=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getAccountSummary(params,cb);
		}

		
		service.GetContextKeysForCustomPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyInputList",params,undefined,true); 
			
			copyArg(msg,"PolicyInputList",params,undefined,true); 
			

			svc.getContextKeysForCustomPolicy(params,cb);
		}

		
		service.GetContextKeysForPrincipalPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicySourceArn",params,undefined,false); 
			
			copyArg(msg,"PolicySourceArn",params,undefined,false); 
			copyArg(msg,"PolicyInputList",params,undefined,true); 
			

			svc.getContextKeysForPrincipalPolicy(params,cb);
		}

		
		service.GetCredentialReport=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getCredentialReport(params,cb);
		}

		
		service.GetGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupName",params,undefined,false); 
			
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.getGroup(params,cb);
		}

		
		service.GetGroupPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupName",params,undefined,false); 
			copyArg(n,"PolicyName",params,undefined,false); 
			
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"PolicyName",params,undefined,false); 
			

			svc.getGroupPolicy(params,cb);
		}

		
		service.GetInstanceProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceProfileName",params,undefined,false); 
			
			copyArg(msg,"InstanceProfileName",params,undefined,false); 
			

			svc.getInstanceProfile(params,cb);
		}

		
		service.GetLoginProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			

			svc.getLoginProfile(params,cb);
		}

		
		service.GetOpenIDConnectProvider=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OpenIDConnectProviderArn",params,undefined,false); 
			
			copyArg(msg,"OpenIDConnectProviderArn",params,undefined,false); 
			

			svc.getOpenIDConnectProvider(params,cb);
		}

		
		service.GetOrganizationsAccessReport=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobId",params,undefined,false); 
			
			copyArg(msg,"JobId",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"SortKey",params,undefined,false); 
			

			svc.getOrganizationsAccessReport(params,cb);
		}

		
		service.GetPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyArn",params,undefined,false); 
			
			copyArg(msg,"PolicyArn",params,undefined,false); 
			

			svc.getPolicy(params,cb);
		}

		
		service.GetPolicyVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyArn",params,undefined,false); 
			copyArg(n,"VersionId",params,undefined,false); 
			
			copyArg(msg,"PolicyArn",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			

			svc.getPolicyVersion(params,cb);
		}

		
		service.GetRole=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RoleName",params,undefined,false); 
			
			copyArg(msg,"RoleName",params,undefined,false); 
			

			svc.getRole(params,cb);
		}

		
		service.GetRolePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RoleName",params,undefined,false); 
			copyArg(n,"PolicyName",params,undefined,false); 
			
			copyArg(msg,"RoleName",params,undefined,false); 
			copyArg(msg,"PolicyName",params,undefined,false); 
			

			svc.getRolePolicy(params,cb);
		}

		
		service.GetSAMLProvider=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SAMLProviderArn",params,undefined,false); 
			
			copyArg(msg,"SAMLProviderArn",params,undefined,false); 
			

			svc.getSAMLProvider(params,cb);
		}

		
		service.GetSSHPublicKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			copyArg(n,"SSHPublicKeyId",params,undefined,false); 
			copyArg(n,"Encoding",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"SSHPublicKeyId",params,undefined,false); 
			copyArg(msg,"Encoding",params,undefined,false); 
			

			svc.getSSHPublicKey(params,cb);
		}

		
		service.GetServerCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerCertificateName",params,undefined,false); 
			
			copyArg(msg,"ServerCertificateName",params,undefined,false); 
			

			svc.getServerCertificate(params,cb);
		}

		
		service.GetServiceLastAccessedDetails=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobId",params,undefined,false); 
			
			copyArg(msg,"JobId",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.getServiceLastAccessedDetails(params,cb);
		}

		
		service.GetServiceLastAccessedDetailsWithEntities=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobId",params,undefined,false); 
			copyArg(n,"ServiceNamespace",params,undefined,false); 
			
			copyArg(msg,"JobId",params,undefined,false); 
			copyArg(msg,"ServiceNamespace",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.getServiceLastAccessedDetailsWithEntities(params,cb);
		}

		
		service.GetServiceLinkedRoleDeletionStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeletionTaskId",params,undefined,false); 
			
			copyArg(msg,"DeletionTaskId",params,undefined,false); 
			

			svc.getServiceLinkedRoleDeletionStatus(params,cb);
		}

		
		service.GetUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"UserName",params,undefined,false); 
			

			svc.getUser(params,cb);
		}

		
		service.GetUserPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			copyArg(n,"PolicyName",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"PolicyName",params,undefined,false); 
			

			svc.getUserPolicy(params,cb);
		}

		
		service.ListAccessKeys=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listAccessKeys(params,cb);
		}

		
		service.ListAccountAliases=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listAccountAliases(params,cb);
		}

		
		service.ListAttachedGroupPolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupName",params,undefined,false); 
			
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"PathPrefix",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listAttachedGroupPolicies(params,cb);
		}

		
		service.ListAttachedRolePolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RoleName",params,undefined,false); 
			
			copyArg(msg,"RoleName",params,undefined,false); 
			copyArg(msg,"PathPrefix",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listAttachedRolePolicies(params,cb);
		}

		
		service.ListAttachedUserPolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"PathPrefix",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listAttachedUserPolicies(params,cb);
		}

		
		service.ListEntitiesForPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyArn",params,undefined,false); 
			
			copyArg(msg,"PolicyArn",params,undefined,false); 
			copyArg(msg,"EntityFilter",params,undefined,false); 
			copyArg(msg,"PathPrefix",params,undefined,false); 
			copyArg(msg,"PolicyUsageFilter",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listEntitiesForPolicy(params,cb);
		}

		
		service.ListGroupPolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupName",params,undefined,false); 
			
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listGroupPolicies(params,cb);
		}

		
		service.ListGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"PathPrefix",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listGroups(params,cb);
		}

		
		service.ListGroupsForUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listGroupsForUser(params,cb);
		}

		
		service.ListInstanceProfileTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceProfileName",params,undefined,false); 
			
			copyArg(msg,"InstanceProfileName",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listInstanceProfileTags(params,cb);
		}

		
		service.ListInstanceProfiles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"PathPrefix",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listInstanceProfiles(params,cb);
		}

		
		service.ListInstanceProfilesForRole=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RoleName",params,undefined,false); 
			
			copyArg(msg,"RoleName",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listInstanceProfilesForRole(params,cb);
		}

		
		service.ListMFADeviceTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SerialNumber",params,undefined,false); 
			
			copyArg(msg,"SerialNumber",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listMFADeviceTags(params,cb);
		}

		
		service.ListMFADevices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listMFADevices(params,cb);
		}

		
		service.ListOpenIDConnectProviderTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OpenIDConnectProviderArn",params,undefined,false); 
			
			copyArg(msg,"OpenIDConnectProviderArn",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listOpenIDConnectProviderTags(params,cb);
		}

		
		service.ListOpenIDConnectProviders=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.listOpenIDConnectProviders(params,cb);
		}

		
		service.ListPolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"OnlyAttached",params,undefined,false); 
			copyArg(msg,"PathPrefix",params,undefined,false); 
			copyArg(msg,"PolicyUsageFilter",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listPolicies(params,cb);
		}

		
		service.ListPoliciesGrantingServiceAccess=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Arn",params,undefined,false); 
			copyArg(n,"ServiceNamespaces",params,undefined,false); 
			
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"Arn",params,undefined,false); 
			copyArg(msg,"ServiceNamespaces",params,undefined,false); 
			

			svc.listPoliciesGrantingServiceAccess(params,cb);
		}

		
		service.ListPolicyTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyArn",params,undefined,false); 
			
			copyArg(msg,"PolicyArn",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listPolicyTags(params,cb);
		}

		
		service.ListPolicyVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyArn",params,undefined,false); 
			
			copyArg(msg,"PolicyArn",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listPolicyVersions(params,cb);
		}

		
		service.ListRolePolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RoleName",params,undefined,false); 
			
			copyArg(msg,"RoleName",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listRolePolicies(params,cb);
		}

		
		service.ListRoleTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RoleName",params,undefined,false); 
			
			copyArg(msg,"RoleName",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listRoleTags(params,cb);
		}

		
		service.ListRoles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"PathPrefix",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listRoles(params,cb);
		}

		
		service.ListSAMLProviderTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SAMLProviderArn",params,undefined,false); 
			
			copyArg(msg,"SAMLProviderArn",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listSAMLProviderTags(params,cb);
		}

		
		service.ListSAMLProviders=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.listSAMLProviders(params,cb);
		}

		
		service.ListSSHPublicKeys=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listSSHPublicKeys(params,cb);
		}

		
		service.ListServerCertificateTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerCertificateName",params,undefined,false); 
			
			copyArg(msg,"ServerCertificateName",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listServerCertificateTags(params,cb);
		}

		
		service.ListServerCertificates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"PathPrefix",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listServerCertificates(params,cb);
		}

		
		service.ListServiceSpecificCredentials=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"ServiceName",params,undefined,false); 
			

			svc.listServiceSpecificCredentials(params,cb);
		}

		
		service.ListSigningCertificates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listSigningCertificates(params,cb);
		}

		
		service.ListUserPolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listUserPolicies(params,cb);
		}

		
		service.ListUserTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listUserTags(params,cb);
		}

		
		service.ListUsers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"PathPrefix",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listUsers(params,cb);
		}

		
		service.ListVirtualMFADevices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AssignmentStatus",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listVirtualMFADevices(params,cb);
		}

		
		service.PutGroupPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupName",params,undefined,false); 
			copyArg(n,"PolicyName",params,undefined,false); 
			copyArg(n,"PolicyDocument",params,undefined,false); 
			
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"PolicyName",params,undefined,false); 
			copyArg(msg,"PolicyDocument",params,undefined,false); 
			

			svc.putGroupPolicy(params,cb);
		}

		
		service.PutRolePermissionsBoundary=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RoleName",params,undefined,false); 
			copyArg(n,"PermissionsBoundary",params,undefined,false); 
			
			copyArg(msg,"RoleName",params,undefined,false); 
			copyArg(msg,"PermissionsBoundary",params,undefined,false); 
			

			svc.putRolePermissionsBoundary(params,cb);
		}

		
		service.PutRolePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RoleName",params,undefined,false); 
			copyArg(n,"PolicyName",params,undefined,false); 
			copyArg(n,"PolicyDocument",params,undefined,false); 
			
			copyArg(msg,"RoleName",params,undefined,false); 
			copyArg(msg,"PolicyName",params,undefined,false); 
			copyArg(msg,"PolicyDocument",params,undefined,false); 
			

			svc.putRolePolicy(params,cb);
		}

		
		service.PutUserPermissionsBoundary=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			copyArg(n,"PermissionsBoundary",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"PermissionsBoundary",params,undefined,false); 
			

			svc.putUserPermissionsBoundary(params,cb);
		}

		
		service.PutUserPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			copyArg(n,"PolicyName",params,undefined,false); 
			copyArg(n,"PolicyDocument",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"PolicyName",params,undefined,false); 
			copyArg(msg,"PolicyDocument",params,undefined,false); 
			

			svc.putUserPolicy(params,cb);
		}

		
		service.RemoveClientIDFromOpenIDConnectProvider=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OpenIDConnectProviderArn",params,undefined,false); 
			copyArg(n,"ClientID",params,undefined,false); 
			
			copyArg(msg,"OpenIDConnectProviderArn",params,undefined,false); 
			copyArg(msg,"ClientID",params,undefined,false); 
			

			svc.removeClientIDFromOpenIDConnectProvider(params,cb);
		}

		
		service.RemoveRoleFromInstanceProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceProfileName",params,undefined,false); 
			copyArg(n,"RoleName",params,undefined,false); 
			
			copyArg(msg,"InstanceProfileName",params,undefined,false); 
			copyArg(msg,"RoleName",params,undefined,false); 
			

			svc.removeRoleFromInstanceProfile(params,cb);
		}

		
		service.RemoveUserFromGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupName",params,undefined,false); 
			copyArg(n,"UserName",params,undefined,false); 
			
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"UserName",params,undefined,false); 
			

			svc.removeUserFromGroup(params,cb);
		}

		
		service.ResetServiceSpecificCredential=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceSpecificCredentialId",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"ServiceSpecificCredentialId",params,undefined,false); 
			

			svc.resetServiceSpecificCredential(params,cb);
		}

		
		service.ResyncMFADevice=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			copyArg(n,"SerialNumber",params,undefined,false); 
			copyArg(n,"AuthenticationCode1",params,undefined,false); 
			copyArg(n,"AuthenticationCode2",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"SerialNumber",params,undefined,false); 
			copyArg(msg,"AuthenticationCode1",params,undefined,false); 
			copyArg(msg,"AuthenticationCode2",params,undefined,false); 
			

			svc.resyncMFADevice(params,cb);
		}

		
		service.SetDefaultPolicyVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyArn",params,undefined,false); 
			copyArg(n,"VersionId",params,undefined,false); 
			
			copyArg(msg,"PolicyArn",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			

			svc.setDefaultPolicyVersion(params,cb);
		}

		
		service.SetSecurityTokenServicePreferences=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalEndpointTokenVersion",params,undefined,false); 
			
			copyArg(msg,"GlobalEndpointTokenVersion",params,undefined,false); 
			

			svc.setSecurityTokenServicePreferences(params,cb);
		}

		
		service.SimulateCustomPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyInputList",params,undefined,true); 
			copyArg(n,"ActionNames",params,undefined,true); 
			
			copyArg(msg,"PolicyInputList",params,undefined,true); 
			copyArg(msg,"PermissionsBoundaryPolicyInputList",params,undefined,true); 
			copyArg(msg,"ActionNames",params,undefined,true); 
			copyArg(msg,"ResourceArns",params,undefined,true); 
			copyArg(msg,"ResourcePolicy",params,undefined,false); 
			copyArg(msg,"ResourceOwner",params,undefined,false); 
			copyArg(msg,"CallerArn",params,undefined,false); 
			copyArg(msg,"ContextEntries",params,undefined,true); 
			copyArg(msg,"ResourceHandlingOption",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.simulateCustomPolicy(params,cb);
		}

		
		service.SimulatePrincipalPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicySourceArn",params,undefined,false); 
			copyArg(n,"ActionNames",params,undefined,true); 
			
			copyArg(msg,"PolicySourceArn",params,undefined,false); 
			copyArg(msg,"PolicyInputList",params,undefined,true); 
			copyArg(msg,"PermissionsBoundaryPolicyInputList",params,undefined,true); 
			copyArg(msg,"ActionNames",params,undefined,true); 
			copyArg(msg,"ResourceArns",params,undefined,true); 
			copyArg(msg,"ResourcePolicy",params,undefined,false); 
			copyArg(msg,"ResourceOwner",params,undefined,false); 
			copyArg(msg,"CallerArn",params,undefined,false); 
			copyArg(msg,"ContextEntries",params,undefined,true); 
			copyArg(msg,"ResourceHandlingOption",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.simulatePrincipalPolicy(params,cb);
		}

		
		service.TagInstanceProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceProfileName",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"InstanceProfileName",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagInstanceProfile(params,cb);
		}

		
		service.TagMFADevice=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SerialNumber",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"SerialNumber",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagMFADevice(params,cb);
		}

		
		service.TagOpenIDConnectProvider=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OpenIDConnectProviderArn",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"OpenIDConnectProviderArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagOpenIDConnectProvider(params,cb);
		}

		
		service.TagPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyArn",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"PolicyArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagPolicy(params,cb);
		}

		
		service.TagRole=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RoleName",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"RoleName",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagRole(params,cb);
		}

		
		service.TagSAMLProvider=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SAMLProviderArn",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"SAMLProviderArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagSAMLProvider(params,cb);
		}

		
		service.TagServerCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerCertificateName",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ServerCertificateName",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagServerCertificate(params,cb);
		}

		
		service.TagUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagUser(params,cb);
		}

		
		service.UntagInstanceProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceProfileName",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,true); 
			
			copyArg(msg,"InstanceProfileName",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			

			svc.untagInstanceProfile(params,cb);
		}

		
		service.UntagMFADevice=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SerialNumber",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,true); 
			
			copyArg(msg,"SerialNumber",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			

			svc.untagMFADevice(params,cb);
		}

		
		service.UntagOpenIDConnectProvider=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OpenIDConnectProviderArn",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,true); 
			
			copyArg(msg,"OpenIDConnectProviderArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			

			svc.untagOpenIDConnectProvider(params,cb);
		}

		
		service.UntagPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyArn",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,true); 
			
			copyArg(msg,"PolicyArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			

			svc.untagPolicy(params,cb);
		}

		
		service.UntagRole=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RoleName",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,true); 
			
			copyArg(msg,"RoleName",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			

			svc.untagRole(params,cb);
		}

		
		service.UntagSAMLProvider=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SAMLProviderArn",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,true); 
			
			copyArg(msg,"SAMLProviderArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			

			svc.untagSAMLProvider(params,cb);
		}

		
		service.UntagServerCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerCertificateName",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,true); 
			
			copyArg(msg,"ServerCertificateName",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			

			svc.untagServerCertificate(params,cb);
		}

		
		service.UntagUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,true); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			

			svc.untagUser(params,cb);
		}

		
		service.UpdateAccessKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccessKeyId",params,undefined,false); 
			copyArg(n,"Status",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"AccessKeyId",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			

			svc.updateAccessKey(params,cb);
		}

		
		service.UpdateAccountPasswordPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MinimumPasswordLength",params,undefined,false); 
			copyArg(msg,"RequireSymbols",params,undefined,false); 
			copyArg(msg,"RequireNumbers",params,undefined,false); 
			copyArg(msg,"RequireUppercaseCharacters",params,undefined,false); 
			copyArg(msg,"RequireLowercaseCharacters",params,undefined,false); 
			copyArg(msg,"AllowUsersToChangePassword",params,undefined,false); 
			copyArg(msg,"MaxPasswordAge",params,undefined,false); 
			copyArg(msg,"PasswordReusePrevention",params,undefined,false); 
			copyArg(msg,"HardExpiry",params,undefined,false); 
			

			svc.updateAccountPasswordPolicy(params,cb);
		}

		
		service.UpdateAssumeRolePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RoleName",params,undefined,false); 
			copyArg(n,"PolicyDocument",params,undefined,false); 
			
			copyArg(msg,"RoleName",params,undefined,false); 
			copyArg(msg,"PolicyDocument",params,undefined,false); 
			

			svc.updateAssumeRolePolicy(params,cb);
		}

		
		service.UpdateGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupName",params,undefined,false); 
			
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"NewPath",params,undefined,false); 
			copyArg(msg,"NewGroupName",params,undefined,false); 
			

			svc.updateGroup(params,cb);
		}

		
		service.UpdateLoginProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"Password",params,undefined,true); 
			copyArg(msg,"PasswordResetRequired",params,undefined,false); 
			

			svc.updateLoginProfile(params,cb);
		}

		
		service.UpdateOpenIDConnectProviderThumbprint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OpenIDConnectProviderArn",params,undefined,false); 
			copyArg(n,"ThumbprintList",params,undefined,true); 
			
			copyArg(msg,"OpenIDConnectProviderArn",params,undefined,false); 
			copyArg(msg,"ThumbprintList",params,undefined,true); 
			

			svc.updateOpenIDConnectProviderThumbprint(params,cb);
		}

		
		service.UpdateRole=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RoleName",params,undefined,false); 
			
			copyArg(msg,"RoleName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"MaxSessionDuration",params,undefined,false); 
			

			svc.updateRole(params,cb);
		}

		
		service.UpdateRoleDescription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RoleName",params,undefined,false); 
			copyArg(n,"Description",params,undefined,false); 
			
			copyArg(msg,"RoleName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			

			svc.updateRoleDescription(params,cb);
		}

		
		service.UpdateSAMLProvider=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SAMLMetadataDocument",params,undefined,false); 
			copyArg(n,"SAMLProviderArn",params,undefined,false); 
			
			copyArg(msg,"SAMLMetadataDocument",params,undefined,false); 
			copyArg(msg,"SAMLProviderArn",params,undefined,false); 
			

			svc.updateSAMLProvider(params,cb);
		}

		
		service.UpdateSSHPublicKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			copyArg(n,"SSHPublicKeyId",params,undefined,false); 
			copyArg(n,"Status",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"SSHPublicKeyId",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			

			svc.updateSSHPublicKey(params,cb);
		}

		
		service.UpdateServerCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerCertificateName",params,undefined,false); 
			
			copyArg(msg,"ServerCertificateName",params,undefined,false); 
			copyArg(msg,"NewPath",params,undefined,false); 
			copyArg(msg,"NewServerCertificateName",params,undefined,false); 
			

			svc.updateServerCertificate(params,cb);
		}

		
		service.UpdateServiceSpecificCredential=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceSpecificCredentialId",params,undefined,false); 
			copyArg(n,"Status",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"ServiceSpecificCredentialId",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			

			svc.updateServiceSpecificCredential(params,cb);
		}

		
		service.UpdateSigningCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateId",params,undefined,false); 
			copyArg(n,"Status",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"CertificateId",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			

			svc.updateSigningCertificate(params,cb);
		}

		
		service.UpdateUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"NewPath",params,undefined,false); 
			copyArg(msg,"NewUserName",params,undefined,false); 
			

			svc.updateUser(params,cb);
		}

		
		service.UploadSSHPublicKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			copyArg(n,"SSHPublicKeyBody",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"SSHPublicKeyBody",params,undefined,false); 
			

			svc.uploadSSHPublicKey(params,cb);
		}

		
		service.UploadServerCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerCertificateName",params,undefined,false); 
			copyArg(n,"CertificateBody",params,undefined,false); 
			copyArg(n,"PrivateKey",params,undefined,false); 
			
			copyArg(msg,"Path",params,undefined,false); 
			copyArg(msg,"ServerCertificateName",params,undefined,false); 
			copyArg(msg,"CertificateBody",params,undefined,false); 
			copyArg(msg,"PrivateKey",params,undefined,false); 
			copyArg(msg,"CertificateChain",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.uploadServerCertificate(params,cb);
		}

		
		service.UploadSigningCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CertificateBody",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"CertificateBody",params,undefined,false); 
			

			svc.uploadSigningCertificate(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS IAM", AmazonAPINode);

};
