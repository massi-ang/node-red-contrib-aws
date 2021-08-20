
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

		var awsService = new AWS.SSOAdmin( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.SSOAdmin(msg.AWSConfig) : awsService;

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

		
		service.AttachManagedPolicyToPermissionSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			copyArg(n,"PermissionSetArn",params,undefined,false); 
			copyArg(n,"ManagedPolicyArn",params,undefined,false); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			copyArg(msg,"PermissionSetArn",params,undefined,false); 
			copyArg(msg,"ManagedPolicyArn",params,undefined,false); 
			

			svc.attachManagedPolicyToPermissionSet(params,cb);
		}

		
		service.CreateAccountAssignment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			copyArg(n,"TargetId",params,undefined,false); 
			copyArg(n,"TargetType",params,undefined,false); 
			copyArg(n,"PermissionSetArn",params,undefined,false); 
			copyArg(n,"PrincipalType",params,undefined,false); 
			copyArg(n,"PrincipalId",params,undefined,false); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			copyArg(msg,"TargetId",params,undefined,false); 
			copyArg(msg,"TargetType",params,undefined,false); 
			copyArg(msg,"PermissionSetArn",params,undefined,false); 
			copyArg(msg,"PrincipalType",params,undefined,false); 
			copyArg(msg,"PrincipalId",params,undefined,false); 
			

			svc.createAccountAssignment(params,cb);
		}

		
		service.CreateInstanceAccessControlAttributeConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			copyArg(n,"InstanceAccessControlAttributeConfiguration",params,undefined,true); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			copyArg(msg,"InstanceAccessControlAttributeConfiguration",params,undefined,true); 
			

			svc.createInstanceAccessControlAttributeConfiguration(params,cb);
		}

		
		service.CreatePermissionSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"InstanceArn",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"InstanceArn",params,undefined,false); 
			copyArg(msg,"SessionDuration",params,undefined,false); 
			copyArg(msg,"RelayState",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createPermissionSet(params,cb);
		}

		
		service.DeleteAccountAssignment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			copyArg(n,"TargetId",params,undefined,false); 
			copyArg(n,"TargetType",params,undefined,false); 
			copyArg(n,"PermissionSetArn",params,undefined,false); 
			copyArg(n,"PrincipalType",params,undefined,false); 
			copyArg(n,"PrincipalId",params,undefined,false); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			copyArg(msg,"TargetId",params,undefined,false); 
			copyArg(msg,"TargetType",params,undefined,false); 
			copyArg(msg,"PermissionSetArn",params,undefined,false); 
			copyArg(msg,"PrincipalType",params,undefined,false); 
			copyArg(msg,"PrincipalId",params,undefined,false); 
			

			svc.deleteAccountAssignment(params,cb);
		}

		
		service.DeleteInlinePolicyFromPermissionSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			copyArg(n,"PermissionSetArn",params,undefined,false); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			copyArg(msg,"PermissionSetArn",params,undefined,false); 
			

			svc.deleteInlinePolicyFromPermissionSet(params,cb);
		}

		
		service.DeleteInstanceAccessControlAttributeConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			

			svc.deleteInstanceAccessControlAttributeConfiguration(params,cb);
		}

		
		service.DeletePermissionSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			copyArg(n,"PermissionSetArn",params,undefined,false); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			copyArg(msg,"PermissionSetArn",params,undefined,false); 
			

			svc.deletePermissionSet(params,cb);
		}

		
		service.DescribeAccountAssignmentCreationStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			copyArg(n,"AccountAssignmentCreationRequestId",params,undefined,false); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			copyArg(msg,"AccountAssignmentCreationRequestId",params,undefined,false); 
			

			svc.describeAccountAssignmentCreationStatus(params,cb);
		}

		
		service.DescribeAccountAssignmentDeletionStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			copyArg(n,"AccountAssignmentDeletionRequestId",params,undefined,false); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			copyArg(msg,"AccountAssignmentDeletionRequestId",params,undefined,false); 
			

			svc.describeAccountAssignmentDeletionStatus(params,cb);
		}

		
		service.DescribeInstanceAccessControlAttributeConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			

			svc.describeInstanceAccessControlAttributeConfiguration(params,cb);
		}

		
		service.DescribePermissionSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			copyArg(n,"PermissionSetArn",params,undefined,false); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			copyArg(msg,"PermissionSetArn",params,undefined,false); 
			

			svc.describePermissionSet(params,cb);
		}

		
		service.DescribePermissionSetProvisioningStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			copyArg(n,"ProvisionPermissionSetRequestId",params,undefined,false); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			copyArg(msg,"ProvisionPermissionSetRequestId",params,undefined,false); 
			

			svc.describePermissionSetProvisioningStatus(params,cb);
		}

		
		service.DetachManagedPolicyFromPermissionSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			copyArg(n,"PermissionSetArn",params,undefined,false); 
			copyArg(n,"ManagedPolicyArn",params,undefined,false); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			copyArg(msg,"PermissionSetArn",params,undefined,false); 
			copyArg(msg,"ManagedPolicyArn",params,undefined,false); 
			

			svc.detachManagedPolicyFromPermissionSet(params,cb);
		}

		
		service.GetInlinePolicyForPermissionSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			copyArg(n,"PermissionSetArn",params,undefined,false); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			copyArg(msg,"PermissionSetArn",params,undefined,false); 
			

			svc.getInlinePolicyForPermissionSet(params,cb);
		}

		
		service.ListAccountAssignmentCreationStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Filter",params,undefined,true); 
			

			svc.listAccountAssignmentCreationStatus(params,cb);
		}

		
		service.ListAccountAssignmentDeletionStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Filter",params,undefined,true); 
			

			svc.listAccountAssignmentDeletionStatus(params,cb);
		}

		
		service.ListAccountAssignments=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"PermissionSetArn",params,undefined,false); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"PermissionSetArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listAccountAssignments(params,cb);
		}

		
		service.ListAccountsForProvisionedPermissionSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			copyArg(n,"PermissionSetArn",params,undefined,false); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			copyArg(msg,"PermissionSetArn",params,undefined,false); 
			copyArg(msg,"ProvisioningStatus",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listAccountsForProvisionedPermissionSet(params,cb);
		}

		
		service.ListInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listInstances(params,cb);
		}

		
		service.ListManagedPoliciesInPermissionSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			copyArg(n,"PermissionSetArn",params,undefined,false); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			copyArg(msg,"PermissionSetArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listManagedPoliciesInPermissionSet(params,cb);
		}

		
		service.ListPermissionSetProvisioningStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Filter",params,undefined,true); 
			

			svc.listPermissionSetProvisioningStatus(params,cb);
		}

		
		service.ListPermissionSets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listPermissionSets(params,cb);
		}

		
		service.ListPermissionSetsProvisionedToAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			copyArg(n,"AccountId",params,undefined,false); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"ProvisioningStatus",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listPermissionSetsProvisionedToAccount(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ProvisionPermissionSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			copyArg(n,"PermissionSetArn",params,undefined,false); 
			copyArg(n,"TargetType",params,undefined,false); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			copyArg(msg,"PermissionSetArn",params,undefined,false); 
			copyArg(msg,"TargetId",params,undefined,false); 
			copyArg(msg,"TargetType",params,undefined,false); 
			

			svc.provisionPermissionSet(params,cb);
		}

		
		service.PutInlinePolicyToPermissionSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			copyArg(n,"PermissionSetArn",params,undefined,false); 
			copyArg(n,"InlinePolicy",params,undefined,true); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			copyArg(msg,"PermissionSetArn",params,undefined,false); 
			copyArg(msg,"InlinePolicy",params,undefined,true); 
			

			svc.putInlinePolicyToPermissionSet(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateInstanceAccessControlAttributeConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			copyArg(n,"InstanceAccessControlAttributeConfiguration",params,undefined,true); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			copyArg(msg,"InstanceAccessControlAttributeConfiguration",params,undefined,true); 
			

			svc.updateInstanceAccessControlAttributeConfiguration(params,cb);
		}

		
		service.UpdatePermissionSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceArn",params,undefined,false); 
			copyArg(n,"PermissionSetArn",params,undefined,false); 
			
			copyArg(msg,"InstanceArn",params,undefined,false); 
			copyArg(msg,"PermissionSetArn",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"SessionDuration",params,undefined,false); 
			copyArg(msg,"RelayState",params,undefined,false); 
			

			svc.updatePermissionSet(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS SSOAdmin", AmazonAPINode);

};
