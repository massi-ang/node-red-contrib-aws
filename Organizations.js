
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

		var awsService = new AWS.Organizations( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Organizations(msg.AWSConfig) : awsService;

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

		
		service.AcceptHandshake=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HandshakeId",params,undefined,false); 
			
			copyArg(msg,"HandshakeId",params,undefined,false); 
			

			svc.acceptHandshake(params,cb);
		}

		
		service.AttachPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyId",params,undefined,false); 
			copyArg(n,"TargetId",params,undefined,false); 
			
			copyArg(msg,"PolicyId",params,undefined,false); 
			copyArg(msg,"TargetId",params,undefined,false); 
			

			svc.attachPolicy(params,cb);
		}

		
		service.CancelHandshake=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HandshakeId",params,undefined,false); 
			
			copyArg(msg,"HandshakeId",params,undefined,false); 
			

			svc.cancelHandshake(params,cb);
		}

		
		service.CreateAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Email",params,undefined,true); 
			copyArg(n,"AccountName",params,undefined,true); 
			
			copyArg(msg,"Email",params,undefined,true); 
			copyArg(msg,"AccountName",params,undefined,true); 
			copyArg(msg,"RoleName",params,undefined,false); 
			copyArg(msg,"IamUserAccessToBilling",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createAccount(params,cb);
		}

		
		service.CreateGovCloudAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Email",params,undefined,true); 
			copyArg(n,"AccountName",params,undefined,true); 
			
			copyArg(msg,"Email",params,undefined,true); 
			copyArg(msg,"AccountName",params,undefined,true); 
			copyArg(msg,"RoleName",params,undefined,false); 
			copyArg(msg,"IamUserAccessToBilling",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createGovCloudAccount(params,cb);
		}

		
		service.CreateOrganization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"FeatureSet",params,undefined,false); 
			

			svc.createOrganization(params,cb);
		}

		
		service.CreateOrganizationalUnit=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ParentId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"ParentId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createOrganizationalUnit(params,cb);
		}

		
		service.CreatePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Content",params,undefined,false); 
			copyArg(n,"Description",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Type",params,undefined,false); 
			
			copyArg(msg,"Content",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createPolicy(params,cb);
		}

		
		service.DeclineHandshake=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HandshakeId",params,undefined,false); 
			
			copyArg(msg,"HandshakeId",params,undefined,false); 
			

			svc.declineHandshake(params,cb);
		}

		
		service.DeleteOrganization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.deleteOrganization(params,cb);
		}

		
		service.DeleteOrganizationalUnit=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationalUnitId",params,undefined,false); 
			
			copyArg(msg,"OrganizationalUnitId",params,undefined,false); 
			

			svc.deleteOrganizationalUnit(params,cb);
		}

		
		service.DeletePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyId",params,undefined,false); 
			
			copyArg(msg,"PolicyId",params,undefined,false); 
			

			svc.deletePolicy(params,cb);
		}

		
		service.DeregisterDelegatedAdministrator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"ServicePrincipal",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"ServicePrincipal",params,undefined,false); 
			

			svc.deregisterDelegatedAdministrator(params,cb);
		}

		
		service.DescribeAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			

			svc.describeAccount(params,cb);
		}

		
		service.DescribeCreateAccountStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CreateAccountRequestId",params,undefined,false); 
			
			copyArg(msg,"CreateAccountRequestId",params,undefined,false); 
			

			svc.describeCreateAccountStatus(params,cb);
		}

		
		service.DescribeEffectivePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyType",params,undefined,false); 
			
			copyArg(msg,"PolicyType",params,undefined,false); 
			copyArg(msg,"TargetId",params,undefined,false); 
			

			svc.describeEffectivePolicy(params,cb);
		}

		
		service.DescribeHandshake=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HandshakeId",params,undefined,false); 
			
			copyArg(msg,"HandshakeId",params,undefined,false); 
			

			svc.describeHandshake(params,cb);
		}

		
		service.DescribeOrganization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeOrganization(params,cb);
		}

		
		service.DescribeOrganizationalUnit=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationalUnitId",params,undefined,false); 
			
			copyArg(msg,"OrganizationalUnitId",params,undefined,false); 
			

			svc.describeOrganizationalUnit(params,cb);
		}

		
		service.DescribePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyId",params,undefined,false); 
			
			copyArg(msg,"PolicyId",params,undefined,false); 
			

			svc.describePolicy(params,cb);
		}

		
		service.DetachPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyId",params,undefined,false); 
			copyArg(n,"TargetId",params,undefined,false); 
			
			copyArg(msg,"PolicyId",params,undefined,false); 
			copyArg(msg,"TargetId",params,undefined,false); 
			

			svc.detachPolicy(params,cb);
		}

		
		service.DisableAWSServiceAccess=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServicePrincipal",params,undefined,false); 
			
			copyArg(msg,"ServicePrincipal",params,undefined,false); 
			

			svc.disableAWSServiceAccess(params,cb);
		}

		
		service.DisablePolicyType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RootId",params,undefined,false); 
			copyArg(n,"PolicyType",params,undefined,false); 
			
			copyArg(msg,"RootId",params,undefined,false); 
			copyArg(msg,"PolicyType",params,undefined,false); 
			

			svc.disablePolicyType(params,cb);
		}

		
		service.EnableAWSServiceAccess=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServicePrincipal",params,undefined,false); 
			
			copyArg(msg,"ServicePrincipal",params,undefined,false); 
			

			svc.enableAWSServiceAccess(params,cb);
		}

		
		service.EnableAllFeatures=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.enableAllFeatures(params,cb);
		}

		
		service.EnablePolicyType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RootId",params,undefined,false); 
			copyArg(n,"PolicyType",params,undefined,false); 
			
			copyArg(msg,"RootId",params,undefined,false); 
			copyArg(msg,"PolicyType",params,undefined,false); 
			

			svc.enablePolicyType(params,cb);
		}

		
		service.InviteAccountToOrganization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Target",params,undefined,true); 
			
			copyArg(msg,"Target",params,undefined,true); 
			copyArg(msg,"Notes",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.inviteAccountToOrganization(params,cb);
		}

		
		service.LeaveOrganization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.leaveOrganization(params,cb);
		}

		
		service.ListAWSServiceAccessForOrganization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listAWSServiceAccessForOrganization(params,cb);
		}

		
		service.ListAccounts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listAccounts(params,cb);
		}

		
		service.ListAccountsForParent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ParentId",params,undefined,false); 
			
			copyArg(msg,"ParentId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listAccountsForParent(params,cb);
		}

		
		service.ListChildren=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ParentId",params,undefined,false); 
			copyArg(n,"ChildType",params,undefined,false); 
			
			copyArg(msg,"ParentId",params,undefined,false); 
			copyArg(msg,"ChildType",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listChildren(params,cb);
		}

		
		service.ListCreateAccountStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"States",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listCreateAccountStatus(params,cb);
		}

		
		service.ListDelegatedAdministrators=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ServicePrincipal",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listDelegatedAdministrators(params,cb);
		}

		
		service.ListDelegatedServicesForAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listDelegatedServicesForAccount(params,cb);
		}

		
		service.ListHandshakesForAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filter",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listHandshakesForAccount(params,cb);
		}

		
		service.ListHandshakesForOrganization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filter",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listHandshakesForOrganization(params,cb);
		}

		
		service.ListOrganizationalUnitsForParent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ParentId",params,undefined,false); 
			
			copyArg(msg,"ParentId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listOrganizationalUnitsForParent(params,cb);
		}

		
		service.ListParents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChildId",params,undefined,false); 
			
			copyArg(msg,"ChildId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listParents(params,cb);
		}

		
		service.ListPolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Filter",params,undefined,false); 
			
			copyArg(msg,"Filter",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listPolicies(params,cb);
		}

		
		service.ListPoliciesForTarget=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TargetId",params,undefined,false); 
			copyArg(n,"Filter",params,undefined,false); 
			
			copyArg(msg,"TargetId",params,undefined,false); 
			copyArg(msg,"Filter",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listPoliciesForTarget(params,cb);
		}

		
		service.ListRoots=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listRoots(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListTargetsForPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyId",params,undefined,false); 
			
			copyArg(msg,"PolicyId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listTargetsForPolicy(params,cb);
		}

		
		service.MoveAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"SourceParentId",params,undefined,false); 
			copyArg(n,"DestinationParentId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"SourceParentId",params,undefined,false); 
			copyArg(msg,"DestinationParentId",params,undefined,false); 
			

			svc.moveAccount(params,cb);
		}

		
		service.RegisterDelegatedAdministrator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"ServicePrincipal",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"ServicePrincipal",params,undefined,false); 
			

			svc.registerDelegatedAdministrator(params,cb);
		}

		
		service.RemoveAccountFromOrganization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AccountId",params,undefined,false); 
			
			copyArg(msg,"AccountId",params,undefined,false); 
			

			svc.removeAccountFromOrganization(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateOrganizationalUnit=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationalUnitId",params,undefined,false); 
			
			copyArg(msg,"OrganizationalUnitId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.updateOrganizationalUnit(params,cb);
		}

		
		service.UpdatePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyId",params,undefined,false); 
			
			copyArg(msg,"PolicyId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Content",params,undefined,false); 
			

			svc.updatePolicy(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Organizations", AmazonAPINode);

};
