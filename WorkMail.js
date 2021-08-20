
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

		var awsService = new AWS.WorkMail( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.WorkMail(msg.AWSConfig) : awsService;

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

		
		service.AssociateDelegateToResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"EntityId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"EntityId",params,undefined,false); 
			

			svc.associateDelegateToResource(params,cb);
		}

		
		service.AssociateMemberToGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"GroupId",params,undefined,false); 
			copyArg(n,"MemberId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"GroupId",params,undefined,false); 
			copyArg(msg,"MemberId",params,undefined,false); 
			

			svc.associateMemberToGroup(params,cb);
		}

		
		service.CancelMailboxExportJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClientToken",params,undefined,false); 
			copyArg(n,"JobId",params,undefined,false); 
			copyArg(n,"OrganizationId",params,undefined,false); 
			
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"JobId",params,undefined,false); 
			copyArg(msg,"OrganizationId",params,undefined,false); 
			

			svc.cancelMailboxExportJob(params,cb);
		}

		
		service.CreateAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"EntityId",params,undefined,false); 
			copyArg(n,"Alias",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"EntityId",params,undefined,false); 
			copyArg(msg,"Alias",params,undefined,false); 
			

			svc.createAlias(params,cb);
		}

		
		service.CreateGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.createGroup(params,cb);
		}

		
		service.CreateMobileDeviceAccessRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Effect",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Effect",params,undefined,false); 
			copyArg(msg,"DeviceTypes",params,undefined,true); 
			copyArg(msg,"NotDeviceTypes",params,undefined,true); 
			copyArg(msg,"DeviceModels",params,undefined,true); 
			copyArg(msg,"NotDeviceModels",params,undefined,true); 
			copyArg(msg,"DeviceOperatingSystems",params,undefined,true); 
			copyArg(msg,"NotDeviceOperatingSystems",params,undefined,true); 
			copyArg(msg,"DeviceUserAgents",params,undefined,true); 
			copyArg(msg,"NotDeviceUserAgents",params,undefined,true); 
			

			svc.createMobileDeviceAccessRule(params,cb);
		}

		
		service.CreateOrganization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Alias",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"Alias",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"Domains",params,undefined,false); 
			copyArg(msg,"KmsKeyArn",params,undefined,false); 
			copyArg(msg,"EnableInteroperability",params,undefined,false); 
			

			svc.createOrganization(params,cb);
		}

		
		service.CreateResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Type",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			

			svc.createResource(params,cb);
		}

		
		service.CreateUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"DisplayName",params,undefined,false); 
			copyArg(n,"Password",params,undefined,true); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"DisplayName",params,undefined,false); 
			copyArg(msg,"Password",params,undefined,true); 
			

			svc.createUser(params,cb);
		}

		
		service.DeleteAccessControlRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteAccessControlRule(params,cb);
		}

		
		service.DeleteAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"EntityId",params,undefined,false); 
			copyArg(n,"Alias",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"EntityId",params,undefined,false); 
			copyArg(msg,"Alias",params,undefined,false); 
			

			svc.deleteAlias(params,cb);
		}

		
		service.DeleteGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"GroupId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"GroupId",params,undefined,false); 
			

			svc.deleteGroup(params,cb);
		}

		
		service.DeleteMailboxPermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"EntityId",params,undefined,false); 
			copyArg(n,"GranteeId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"EntityId",params,undefined,false); 
			copyArg(msg,"GranteeId",params,undefined,false); 
			

			svc.deleteMailboxPermissions(params,cb);
		}

		
		service.DeleteMobileDeviceAccessRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"MobileDeviceAccessRuleId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"MobileDeviceAccessRuleId",params,undefined,false); 
			

			svc.deleteMobileDeviceAccessRule(params,cb);
		}

		
		service.DeleteOrganization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"DeleteDirectory",params,undefined,false); 
			
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"DeleteDirectory",params,undefined,false); 
			

			svc.deleteOrganization(params,cb);
		}

		
		service.DeleteResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			

			svc.deleteResource(params,cb);
		}

		
		service.DeleteRetentionPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.deleteRetentionPolicy(params,cb);
		}

		
		service.DeleteUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"UserId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"UserId",params,undefined,false); 
			

			svc.deleteUser(params,cb);
		}

		
		service.DeregisterFromWorkMail=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"EntityId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"EntityId",params,undefined,false); 
			

			svc.deregisterFromWorkMail(params,cb);
		}

		
		service.DescribeGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"GroupId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"GroupId",params,undefined,false); 
			

			svc.describeGroup(params,cb);
		}

		
		service.DescribeMailboxExportJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobId",params,undefined,false); 
			copyArg(n,"OrganizationId",params,undefined,false); 
			
			copyArg(msg,"JobId",params,undefined,false); 
			copyArg(msg,"OrganizationId",params,undefined,false); 
			

			svc.describeMailboxExportJob(params,cb);
		}

		
		service.DescribeOrganization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			

			svc.describeOrganization(params,cb);
		}

		
		service.DescribeResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			

			svc.describeResource(params,cb);
		}

		
		service.DescribeUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"UserId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"UserId",params,undefined,false); 
			

			svc.describeUser(params,cb);
		}

		
		service.DisassociateDelegateFromResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"EntityId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"EntityId",params,undefined,false); 
			

			svc.disassociateDelegateFromResource(params,cb);
		}

		
		service.DisassociateMemberFromGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"GroupId",params,undefined,false); 
			copyArg(n,"MemberId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"GroupId",params,undefined,false); 
			copyArg(msg,"MemberId",params,undefined,false); 
			

			svc.disassociateMemberFromGroup(params,cb);
		}

		
		service.GetAccessControlEffect=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"IpAddress",params,undefined,false); 
			copyArg(n,"Action",params,undefined,false); 
			copyArg(n,"UserId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"IpAddress",params,undefined,false); 
			copyArg(msg,"Action",params,undefined,false); 
			copyArg(msg,"UserId",params,undefined,false); 
			

			svc.getAccessControlEffect(params,cb);
		}

		
		service.GetDefaultRetentionPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			

			svc.getDefaultRetentionPolicy(params,cb);
		}

		
		service.GetMailboxDetails=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"UserId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"UserId",params,undefined,false); 
			

			svc.getMailboxDetails(params,cb);
		}

		
		service.GetMobileDeviceAccessEffect=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"DeviceType",params,undefined,false); 
			copyArg(msg,"DeviceModel",params,undefined,false); 
			copyArg(msg,"DeviceOperatingSystem",params,undefined,false); 
			copyArg(msg,"DeviceUserAgent",params,undefined,false); 
			

			svc.getMobileDeviceAccessEffect(params,cb);
		}

		
		service.ListAccessControlRules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			

			svc.listAccessControlRules(params,cb);
		}

		
		service.ListAliases=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"EntityId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"EntityId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listAliases(params,cb);
		}

		
		service.ListGroupMembers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"GroupId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"GroupId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listGroupMembers(params,cb);
		}

		
		service.ListGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listGroups(params,cb);
		}

		
		service.ListMailboxExportJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listMailboxExportJobs(params,cb);
		}

		
		service.ListMailboxPermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"EntityId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"EntityId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listMailboxPermissions(params,cb);
		}

		
		service.ListMobileDeviceAccessRules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			

			svc.listMobileDeviceAccessRules(params,cb);
		}

		
		service.ListOrganizations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listOrganizations(params,cb);
		}

		
		service.ListResourceDelegates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listResourceDelegates(params,cb);
		}

		
		service.ListResources=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listResources(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListUsers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listUsers(params,cb);
		}

		
		service.PutAccessControlRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Effect",params,undefined,false); 
			copyArg(n,"Description",params,undefined,false); 
			copyArg(n,"OrganizationId",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Effect",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"IpRanges",params,undefined,true); 
			copyArg(msg,"NotIpRanges",params,undefined,true); 
			copyArg(msg,"Actions",params,undefined,true); 
			copyArg(msg,"NotActions",params,undefined,true); 
			copyArg(msg,"UserIds",params,undefined,true); 
			copyArg(msg,"NotUserIds",params,undefined,true); 
			copyArg(msg,"OrganizationId",params,undefined,false); 
			

			svc.putAccessControlRule(params,cb);
		}

		
		service.PutMailboxPermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"EntityId",params,undefined,false); 
			copyArg(n,"GranteeId",params,undefined,false); 
			copyArg(n,"PermissionValues",params,undefined,true); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"EntityId",params,undefined,false); 
			copyArg(msg,"GranteeId",params,undefined,false); 
			copyArg(msg,"PermissionValues",params,undefined,true); 
			

			svc.putMailboxPermissions(params,cb);
		}

		
		service.PutRetentionPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"FolderConfigurations",params,undefined,true); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"FolderConfigurations",params,undefined,true); 
			

			svc.putRetentionPolicy(params,cb);
		}

		
		service.RegisterToWorkMail=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"EntityId",params,undefined,false); 
			copyArg(n,"Email",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"EntityId",params,undefined,false); 
			copyArg(msg,"Email",params,undefined,false); 
			

			svc.registerToWorkMail(params,cb);
		}

		
		service.ResetPassword=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"UserId",params,undefined,false); 
			copyArg(n,"Password",params,undefined,true); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"UserId",params,undefined,false); 
			copyArg(msg,"Password",params,undefined,true); 
			

			svc.resetPassword(params,cb);
		}

		
		service.StartMailboxExportJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClientToken",params,undefined,false); 
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"EntityId",params,undefined,false); 
			copyArg(n,"RoleArn",params,undefined,false); 
			copyArg(n,"KmsKeyArn",params,undefined,false); 
			copyArg(n,"S3BucketName",params,undefined,false); 
			copyArg(n,"S3Prefix",params,undefined,false); 
			
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"EntityId",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"KmsKeyArn",params,undefined,false); 
			copyArg(msg,"S3BucketName",params,undefined,false); 
			copyArg(msg,"S3Prefix",params,undefined,false); 
			

			svc.startMailboxExportJob(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateMailboxQuota=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"UserId",params,undefined,false); 
			copyArg(n,"MailboxQuota",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"UserId",params,undefined,false); 
			copyArg(msg,"MailboxQuota",params,undefined,false); 
			

			svc.updateMailboxQuota(params,cb);
		}

		
		service.UpdateMobileDeviceAccessRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"MobileDeviceAccessRuleId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Effect",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"MobileDeviceAccessRuleId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Effect",params,undefined,false); 
			copyArg(msg,"DeviceTypes",params,undefined,true); 
			copyArg(msg,"NotDeviceTypes",params,undefined,true); 
			copyArg(msg,"DeviceModels",params,undefined,true); 
			copyArg(msg,"NotDeviceModels",params,undefined,true); 
			copyArg(msg,"DeviceOperatingSystems",params,undefined,true); 
			copyArg(msg,"NotDeviceOperatingSystems",params,undefined,true); 
			copyArg(msg,"DeviceUserAgents",params,undefined,true); 
			copyArg(msg,"NotDeviceUserAgents",params,undefined,true); 
			

			svc.updateMobileDeviceAccessRule(params,cb);
		}

		
		service.UpdatePrimaryEmailAddress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"EntityId",params,undefined,false); 
			copyArg(n,"Email",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"EntityId",params,undefined,false); 
			copyArg(msg,"Email",params,undefined,false); 
			

			svc.updatePrimaryEmailAddress(params,cb);
		}

		
		service.UpdateResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"BookingOptions",params,undefined,true); 
			

			svc.updateResource(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS WorkMail", AmazonAPINode);

};
