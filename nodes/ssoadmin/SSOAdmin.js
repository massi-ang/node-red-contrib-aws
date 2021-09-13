
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

		var awsService = new AWS.SSOAdmin( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.SSOAdmin(msg.AWSConfig) : awsService;

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
		
		service.AttachManagedPolicyToPermissionSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"PermissionSetArn",params,undefined,false); 
			copyArgs(n,"ManagedPolicyArn",params,undefined,false); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"PermissionSetArn",params,undefined,false); 
			copyArgs(n,"ManagedPolicyArn",params,undefined,false); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			copyArgs(msg,"PermissionSetArn",params,undefined,false); 
			copyArgs(msg,"ManagedPolicyArn",params,undefined,false); 
			

			svc.attachManagedPolicyToPermissionSet(params,cb);
		}
		
		service.CreateAccountAssignment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"TargetId",params,undefined,false); 
			copyArgs(n,"TargetType",params,undefined,false); 
			copyArgs(n,"PermissionSetArn",params,undefined,false); 
			copyArgs(n,"PrincipalType",params,undefined,false); 
			copyArgs(n,"PrincipalId",params,undefined,false); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"TargetId",params,undefined,false); 
			copyArgs(n,"TargetType",params,undefined,false); 
			copyArgs(n,"PermissionSetArn",params,undefined,false); 
			copyArgs(n,"PrincipalType",params,undefined,false); 
			copyArgs(n,"PrincipalId",params,undefined,false); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			copyArgs(msg,"TargetId",params,undefined,false); 
			copyArgs(msg,"TargetType",params,undefined,false); 
			copyArgs(msg,"PermissionSetArn",params,undefined,false); 
			copyArgs(msg,"PrincipalType",params,undefined,false); 
			copyArgs(msg,"PrincipalId",params,undefined,false); 
			

			svc.createAccountAssignment(params,cb);
		}
		
		service.CreateInstanceAccessControlAttributeConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"InstanceAccessControlAttributeConfiguration",params,undefined,true); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"InstanceAccessControlAttributeConfiguration",params,undefined,true); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			copyArgs(msg,"InstanceAccessControlAttributeConfiguration",params,undefined,true); 
			

			svc.createInstanceAccessControlAttributeConfiguration(params,cb);
		}
		
		service.CreatePermissionSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"InstanceArn",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"SessionDuration",params,undefined,false); 
			copyArgs(n,"RelayState",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			copyArgs(msg,"SessionDuration",params,undefined,false); 
			copyArgs(msg,"RelayState",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createPermissionSet(params,cb);
		}
		
		service.DeleteAccountAssignment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"TargetId",params,undefined,false); 
			copyArgs(n,"TargetType",params,undefined,false); 
			copyArgs(n,"PermissionSetArn",params,undefined,false); 
			copyArgs(n,"PrincipalType",params,undefined,false); 
			copyArgs(n,"PrincipalId",params,undefined,false); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"TargetId",params,undefined,false); 
			copyArgs(n,"TargetType",params,undefined,false); 
			copyArgs(n,"PermissionSetArn",params,undefined,false); 
			copyArgs(n,"PrincipalType",params,undefined,false); 
			copyArgs(n,"PrincipalId",params,undefined,false); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			copyArgs(msg,"TargetId",params,undefined,false); 
			copyArgs(msg,"TargetType",params,undefined,false); 
			copyArgs(msg,"PermissionSetArn",params,undefined,false); 
			copyArgs(msg,"PrincipalType",params,undefined,false); 
			copyArgs(msg,"PrincipalId",params,undefined,false); 
			

			svc.deleteAccountAssignment(params,cb);
		}
		
		service.DeleteInlinePolicyFromPermissionSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"PermissionSetArn",params,undefined,false); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"PermissionSetArn",params,undefined,false); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			copyArgs(msg,"PermissionSetArn",params,undefined,false); 
			

			svc.deleteInlinePolicyFromPermissionSet(params,cb);
		}
		
		service.DeleteInstanceAccessControlAttributeConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			

			svc.deleteInstanceAccessControlAttributeConfiguration(params,cb);
		}
		
		service.DeletePermissionSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"PermissionSetArn",params,undefined,false); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"PermissionSetArn",params,undefined,false); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			copyArgs(msg,"PermissionSetArn",params,undefined,false); 
			

			svc.deletePermissionSet(params,cb);
		}
		
		service.DescribeAccountAssignmentCreationStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"AccountAssignmentCreationRequestId",params,undefined,false); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"AccountAssignmentCreationRequestId",params,undefined,false); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			copyArgs(msg,"AccountAssignmentCreationRequestId",params,undefined,false); 
			

			svc.describeAccountAssignmentCreationStatus(params,cb);
		}
		
		service.DescribeAccountAssignmentDeletionStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"AccountAssignmentDeletionRequestId",params,undefined,false); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"AccountAssignmentDeletionRequestId",params,undefined,false); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			copyArgs(msg,"AccountAssignmentDeletionRequestId",params,undefined,false); 
			

			svc.describeAccountAssignmentDeletionStatus(params,cb);
		}
		
		service.DescribeInstanceAccessControlAttributeConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			

			svc.describeInstanceAccessControlAttributeConfiguration(params,cb);
		}
		
		service.DescribePermissionSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"PermissionSetArn",params,undefined,false); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"PermissionSetArn",params,undefined,false); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			copyArgs(msg,"PermissionSetArn",params,undefined,false); 
			

			svc.describePermissionSet(params,cb);
		}
		
		service.DescribePermissionSetProvisioningStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"ProvisionPermissionSetRequestId",params,undefined,false); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"ProvisionPermissionSetRequestId",params,undefined,false); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			copyArgs(msg,"ProvisionPermissionSetRequestId",params,undefined,false); 
			

			svc.describePermissionSetProvisioningStatus(params,cb);
		}
		
		service.DetachManagedPolicyFromPermissionSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"PermissionSetArn",params,undefined,false); 
			copyArgs(n,"ManagedPolicyArn",params,undefined,false); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"PermissionSetArn",params,undefined,false); 
			copyArgs(n,"ManagedPolicyArn",params,undefined,false); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			copyArgs(msg,"PermissionSetArn",params,undefined,false); 
			copyArgs(msg,"ManagedPolicyArn",params,undefined,false); 
			

			svc.detachManagedPolicyFromPermissionSet(params,cb);
		}
		
		service.GetInlinePolicyForPermissionSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"PermissionSetArn",params,undefined,false); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"PermissionSetArn",params,undefined,false); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			copyArgs(msg,"PermissionSetArn",params,undefined,false); 
			

			svc.getInlinePolicyForPermissionSet(params,cb);
		}
		
		service.ListAccountAssignmentCreationStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Filter",params,undefined,true); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Filter",params,undefined,true); 
			

			svc.listAccountAssignmentCreationStatus(params,cb);
		}
		
		service.ListAccountAssignmentDeletionStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Filter",params,undefined,true); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Filter",params,undefined,true); 
			

			svc.listAccountAssignmentDeletionStatus(params,cb);
		}
		
		service.ListAccountAssignments=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"PermissionSetArn",params,undefined,false); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"PermissionSetArn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"PermissionSetArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listAccountAssignments(params,cb);
		}
		
		service.ListAccountsForProvisionedPermissionSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"PermissionSetArn",params,undefined,false); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"PermissionSetArn",params,undefined,false); 
			copyArgs(n,"ProvisioningStatus",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			copyArgs(msg,"PermissionSetArn",params,undefined,false); 
			copyArgs(msg,"ProvisioningStatus",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listAccountsForProvisionedPermissionSet(params,cb);
		}
		
		service.ListInstances=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listInstances(params,cb);
		}
		
		service.ListManagedPoliciesInPermissionSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"PermissionSetArn",params,undefined,false); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"PermissionSetArn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			copyArgs(msg,"PermissionSetArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listManagedPoliciesInPermissionSet(params,cb);
		}
		
		service.ListPermissionSetProvisioningStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Filter",params,undefined,true); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Filter",params,undefined,true); 
			

			svc.listPermissionSetProvisioningStatus(params,cb);
		}
		
		service.ListPermissionSets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listPermissionSets(params,cb);
		}
		
		service.ListPermissionSetsProvisionedToAccount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"ProvisioningStatus",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"ProvisioningStatus",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listPermissionSetsProvisionedToAccount(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.ProvisionPermissionSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"PermissionSetArn",params,undefined,false); 
			copyArgs(n,"TargetType",params,undefined,false); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"PermissionSetArn",params,undefined,false); 
			copyArgs(n,"TargetId",params,undefined,false); 
			copyArgs(n,"TargetType",params,undefined,false); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			copyArgs(msg,"PermissionSetArn",params,undefined,false); 
			copyArgs(msg,"TargetId",params,undefined,false); 
			copyArgs(msg,"TargetType",params,undefined,false); 
			

			svc.provisionPermissionSet(params,cb);
		}
		
		service.PutInlinePolicyToPermissionSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"PermissionSetArn",params,undefined,false); 
			copyArgs(n,"InlinePolicy",params,undefined,true); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"PermissionSetArn",params,undefined,false); 
			copyArgs(n,"InlinePolicy",params,undefined,true); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			copyArgs(msg,"PermissionSetArn",params,undefined,false); 
			copyArgs(msg,"InlinePolicy",params,undefined,true); 
			

			svc.putInlinePolicyToPermissionSet(params,cb);
		}
		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
		
		service.UpdateInstanceAccessControlAttributeConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"InstanceAccessControlAttributeConfiguration",params,undefined,true); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"InstanceAccessControlAttributeConfiguration",params,undefined,true); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			copyArgs(msg,"InstanceAccessControlAttributeConfiguration",params,undefined,true); 
			

			svc.updateInstanceAccessControlAttributeConfiguration(params,cb);
		}
		
		service.UpdatePermissionSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"PermissionSetArn",params,undefined,false); 
			
			copyArgs(n,"InstanceArn",params,undefined,false); 
			copyArgs(n,"PermissionSetArn",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"SessionDuration",params,undefined,false); 
			copyArgs(n,"RelayState",params,undefined,false); 
			
			copyArgs(msg,"InstanceArn",params,undefined,false); 
			copyArgs(msg,"PermissionSetArn",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"SessionDuration",params,undefined,false); 
			copyArgs(msg,"RelayState",params,undefined,false); 
			

			svc.updatePermissionSet(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS SSOAdmin", AmazonAPINode);

};
