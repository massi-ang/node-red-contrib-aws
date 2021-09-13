
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

		var awsService = new AWS.Organizations( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Organizations(msg.AWSConfig) : awsService;

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
		
		service.AcceptHandshake=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HandshakeId",params,undefined,false); 
			
			copyArgs(n,"HandshakeId",params,undefined,false); 
			
			copyArgs(msg,"HandshakeId",params,undefined,false); 
			

			svc.acceptHandshake(params,cb);
		}
		
		service.AttachPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicyId",params,undefined,false); 
			copyArgs(n,"TargetId",params,undefined,false); 
			
			copyArgs(n,"PolicyId",params,undefined,false); 
			copyArgs(n,"TargetId",params,undefined,false); 
			
			copyArgs(msg,"PolicyId",params,undefined,false); 
			copyArgs(msg,"TargetId",params,undefined,false); 
			

			svc.attachPolicy(params,cb);
		}
		
		service.CancelHandshake=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HandshakeId",params,undefined,false); 
			
			copyArgs(n,"HandshakeId",params,undefined,false); 
			
			copyArgs(msg,"HandshakeId",params,undefined,false); 
			

			svc.cancelHandshake(params,cb);
		}
		
		service.CreateAccount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Email",params,undefined,true); 
			copyArgs(n,"AccountName",params,undefined,true); 
			
			copyArgs(n,"Email",params,undefined,true); 
			copyArgs(n,"AccountName",params,undefined,true); 
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"IamUserAccessToBilling",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Email",params,undefined,true); 
			copyArgs(msg,"AccountName",params,undefined,true); 
			copyArgs(msg,"RoleName",params,undefined,false); 
			copyArgs(msg,"IamUserAccessToBilling",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createAccount(params,cb);
		}
		
		service.CreateGovCloudAccount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Email",params,undefined,true); 
			copyArgs(n,"AccountName",params,undefined,true); 
			
			copyArgs(n,"Email",params,undefined,true); 
			copyArgs(n,"AccountName",params,undefined,true); 
			copyArgs(n,"RoleName",params,undefined,false); 
			copyArgs(n,"IamUserAccessToBilling",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Email",params,undefined,true); 
			copyArgs(msg,"AccountName",params,undefined,true); 
			copyArgs(msg,"RoleName",params,undefined,false); 
			copyArgs(msg,"IamUserAccessToBilling",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createGovCloudAccount(params,cb);
		}
		
		service.CreateOrganization=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"FeatureSet",params,undefined,false); 
			
			copyArgs(msg,"FeatureSet",params,undefined,false); 
			

			svc.createOrganization(params,cb);
		}
		
		service.CreateOrganizationalUnit=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ParentId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"ParentId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ParentId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createOrganizationalUnit(params,cb);
		}
		
		service.CreatePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Content",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(n,"Content",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Content",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createPolicy(params,cb);
		}
		
		service.DeclineHandshake=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HandshakeId",params,undefined,false); 
			
			copyArgs(n,"HandshakeId",params,undefined,false); 
			
			copyArgs(msg,"HandshakeId",params,undefined,false); 
			

			svc.declineHandshake(params,cb);
		}
		
		service.DeleteOrganization=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.deleteOrganization(params,cb);
		}
		
		service.DeleteOrganizationalUnit=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationalUnitId",params,undefined,false); 
			
			copyArgs(n,"OrganizationalUnitId",params,undefined,false); 
			
			copyArgs(msg,"OrganizationalUnitId",params,undefined,false); 
			

			svc.deleteOrganizationalUnit(params,cb);
		}
		
		service.DeletePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicyId",params,undefined,false); 
			
			copyArgs(n,"PolicyId",params,undefined,false); 
			
			copyArgs(msg,"PolicyId",params,undefined,false); 
			

			svc.deletePolicy(params,cb);
		}
		
		service.DeregisterDelegatedAdministrator=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"ServicePrincipal",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"ServicePrincipal",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"ServicePrincipal",params,undefined,false); 
			

			svc.deregisterDelegatedAdministrator(params,cb);
		}
		
		service.DescribeAccount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			

			svc.describeAccount(params,cb);
		}
		
		service.DescribeCreateAccountStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CreateAccountRequestId",params,undefined,false); 
			
			copyArgs(n,"CreateAccountRequestId",params,undefined,false); 
			
			copyArgs(msg,"CreateAccountRequestId",params,undefined,false); 
			

			svc.describeCreateAccountStatus(params,cb);
		}
		
		service.DescribeEffectivePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicyType",params,undefined,false); 
			
			copyArgs(n,"PolicyType",params,undefined,false); 
			copyArgs(n,"TargetId",params,undefined,false); 
			
			copyArgs(msg,"PolicyType",params,undefined,false); 
			copyArgs(msg,"TargetId",params,undefined,false); 
			

			svc.describeEffectivePolicy(params,cb);
		}
		
		service.DescribeHandshake=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HandshakeId",params,undefined,false); 
			
			copyArgs(n,"HandshakeId",params,undefined,false); 
			
			copyArgs(msg,"HandshakeId",params,undefined,false); 
			

			svc.describeHandshake(params,cb);
		}
		
		service.DescribeOrganization=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeOrganization(params,cb);
		}
		
		service.DescribeOrganizationalUnit=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationalUnitId",params,undefined,false); 
			
			copyArgs(n,"OrganizationalUnitId",params,undefined,false); 
			
			copyArgs(msg,"OrganizationalUnitId",params,undefined,false); 
			

			svc.describeOrganizationalUnit(params,cb);
		}
		
		service.DescribePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicyId",params,undefined,false); 
			
			copyArgs(n,"PolicyId",params,undefined,false); 
			
			copyArgs(msg,"PolicyId",params,undefined,false); 
			

			svc.describePolicy(params,cb);
		}
		
		service.DetachPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicyId",params,undefined,false); 
			copyArgs(n,"TargetId",params,undefined,false); 
			
			copyArgs(n,"PolicyId",params,undefined,false); 
			copyArgs(n,"TargetId",params,undefined,false); 
			
			copyArgs(msg,"PolicyId",params,undefined,false); 
			copyArgs(msg,"TargetId",params,undefined,false); 
			

			svc.detachPolicy(params,cb);
		}
		
		service.DisableAWSServiceAccess=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServicePrincipal",params,undefined,false); 
			
			copyArgs(n,"ServicePrincipal",params,undefined,false); 
			
			copyArgs(msg,"ServicePrincipal",params,undefined,false); 
			

			svc.disableAWSServiceAccess(params,cb);
		}
		
		service.DisablePolicyType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RootId",params,undefined,false); 
			copyArgs(n,"PolicyType",params,undefined,false); 
			
			copyArgs(n,"RootId",params,undefined,false); 
			copyArgs(n,"PolicyType",params,undefined,false); 
			
			copyArgs(msg,"RootId",params,undefined,false); 
			copyArgs(msg,"PolicyType",params,undefined,false); 
			

			svc.disablePolicyType(params,cb);
		}
		
		service.EnableAWSServiceAccess=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServicePrincipal",params,undefined,false); 
			
			copyArgs(n,"ServicePrincipal",params,undefined,false); 
			
			copyArgs(msg,"ServicePrincipal",params,undefined,false); 
			

			svc.enableAWSServiceAccess(params,cb);
		}
		
		service.EnableAllFeatures=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.enableAllFeatures(params,cb);
		}
		
		service.EnablePolicyType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RootId",params,undefined,false); 
			copyArgs(n,"PolicyType",params,undefined,false); 
			
			copyArgs(n,"RootId",params,undefined,false); 
			copyArgs(n,"PolicyType",params,undefined,false); 
			
			copyArgs(msg,"RootId",params,undefined,false); 
			copyArgs(msg,"PolicyType",params,undefined,false); 
			

			svc.enablePolicyType(params,cb);
		}
		
		service.InviteAccountToOrganization=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Target",params,undefined,true); 
			
			copyArgs(n,"Target",params,undefined,true); 
			copyArgs(n,"Notes",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Target",params,undefined,true); 
			copyArgs(msg,"Notes",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.inviteAccountToOrganization(params,cb);
		}
		
		service.LeaveOrganization=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.leaveOrganization(params,cb);
		}
		
		service.ListAWSServiceAccessForOrganization=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listAWSServiceAccessForOrganization(params,cb);
		}
		
		service.ListAccounts=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listAccounts(params,cb);
		}
		
		service.ListAccountsForParent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ParentId",params,undefined,false); 
			
			copyArgs(n,"ParentId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ParentId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listAccountsForParent(params,cb);
		}
		
		service.ListChildren=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ParentId",params,undefined,false); 
			copyArgs(n,"ChildType",params,undefined,false); 
			
			copyArgs(n,"ParentId",params,undefined,false); 
			copyArgs(n,"ChildType",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ParentId",params,undefined,false); 
			copyArgs(msg,"ChildType",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listChildren(params,cb);
		}
		
		service.ListCreateAccountStatus=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"States",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"States",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listCreateAccountStatus(params,cb);
		}
		
		service.ListDelegatedAdministrators=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ServicePrincipal",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ServicePrincipal",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listDelegatedAdministrators(params,cb);
		}
		
		service.ListDelegatedServicesForAccount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listDelegatedServicesForAccount(params,cb);
		}
		
		service.ListHandshakesForAccount=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filter",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filter",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listHandshakesForAccount(params,cb);
		}
		
		service.ListHandshakesForOrganization=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filter",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filter",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listHandshakesForOrganization(params,cb);
		}
		
		service.ListOrganizationalUnitsForParent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ParentId",params,undefined,false); 
			
			copyArgs(n,"ParentId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ParentId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listOrganizationalUnitsForParent(params,cb);
		}
		
		service.ListParents=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChildId",params,undefined,false); 
			
			copyArgs(n,"ChildId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ChildId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listParents(params,cb);
		}
		
		service.ListPolicies=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Filter",params,undefined,false); 
			
			copyArgs(n,"Filter",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filter",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listPolicies(params,cb);
		}
		
		service.ListPoliciesForTarget=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TargetId",params,undefined,false); 
			copyArgs(n,"Filter",params,undefined,false); 
			
			copyArgs(n,"TargetId",params,undefined,false); 
			copyArgs(n,"Filter",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"TargetId",params,undefined,false); 
			copyArgs(msg,"Filter",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listPoliciesForTarget(params,cb);
		}
		
		service.ListRoots=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listRoots(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.ListTargetsForPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicyId",params,undefined,false); 
			
			copyArgs(n,"PolicyId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"PolicyId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listTargetsForPolicy(params,cb);
		}
		
		service.MoveAccount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"SourceParentId",params,undefined,false); 
			copyArgs(n,"DestinationParentId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"SourceParentId",params,undefined,false); 
			copyArgs(n,"DestinationParentId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"SourceParentId",params,undefined,false); 
			copyArgs(msg,"DestinationParentId",params,undefined,false); 
			

			svc.moveAccount(params,cb);
		}
		
		service.RegisterDelegatedAdministrator=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"ServicePrincipal",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"ServicePrincipal",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"ServicePrincipal",params,undefined,false); 
			

			svc.registerDelegatedAdministrator(params,cb);
		}
		
		service.RemoveAccountFromOrganization=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(n,"AccountId",params,undefined,false); 
			
			copyArgs(msg,"AccountId",params,undefined,false); 
			

			svc.removeAccountFromOrganization(params,cb);
		}
		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
		
		service.UpdateOrganizationalUnit=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationalUnitId",params,undefined,false); 
			
			copyArgs(n,"OrganizationalUnitId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"OrganizationalUnitId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.updateOrganizationalUnit(params,cb);
		}
		
		service.UpdatePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicyId",params,undefined,false); 
			
			copyArgs(n,"PolicyId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Content",params,undefined,false); 
			
			copyArgs(msg,"PolicyId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Content",params,undefined,false); 
			

			svc.updatePolicy(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS Organizations", AmazonAPINode);

};
