
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

		var awsService = new AWS.WorkMail( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.WorkMail(msg.AWSConfig) : awsService;

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

		
		service.AssociateDelegateToResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"EntityId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"EntityId",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"EntityId",params,undefined,false); 
			

			svc.associateDelegateToResource(params,cb);
		}

		
		service.AssociateMemberToGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"MemberId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"MemberId",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"GroupId",params,undefined,false); 
			copyArgs(msg,"MemberId",params,undefined,false); 
			

			svc.associateMemberToGroup(params,cb);
		}

		
		service.CancelMailboxExportJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(n,"OrganizationId",params,undefined,false); 
			
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(n,"OrganizationId",params,undefined,false); 
			
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"JobId",params,undefined,false); 
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			

			svc.cancelMailboxExportJob(params,cb);
		}

		
		service.CreateAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"EntityId",params,undefined,false); 
			copyArgs(n,"Alias",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"EntityId",params,undefined,false); 
			copyArgs(n,"Alias",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"EntityId",params,undefined,false); 
			copyArgs(msg,"Alias",params,undefined,false); 
			

			svc.createAlias(params,cb);
		}

		
		service.CreateGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.createGroup(params,cb);
		}

		
		service.CreateMobileDeviceAccessRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Effect",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Effect",params,undefined,false); 
			copyArgs(n,"DeviceTypes",params,undefined,true); 
			copyArgs(n,"NotDeviceTypes",params,undefined,true); 
			copyArgs(n,"DeviceModels",params,undefined,true); 
			copyArgs(n,"NotDeviceModels",params,undefined,true); 
			copyArgs(n,"DeviceOperatingSystems",params,undefined,true); 
			copyArgs(n,"NotDeviceOperatingSystems",params,undefined,true); 
			copyArgs(n,"DeviceUserAgents",params,undefined,true); 
			copyArgs(n,"NotDeviceUserAgents",params,undefined,true); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Effect",params,undefined,false); 
			copyArgs(msg,"DeviceTypes",params,undefined,true); 
			copyArgs(msg,"NotDeviceTypes",params,undefined,true); 
			copyArgs(msg,"DeviceModels",params,undefined,true); 
			copyArgs(msg,"NotDeviceModels",params,undefined,true); 
			copyArgs(msg,"DeviceOperatingSystems",params,undefined,true); 
			copyArgs(msg,"NotDeviceOperatingSystems",params,undefined,true); 
			copyArgs(msg,"DeviceUserAgents",params,undefined,true); 
			copyArgs(msg,"NotDeviceUserAgents",params,undefined,true); 
			

			svc.createMobileDeviceAccessRule(params,cb);
		}

		
		service.CreateOrganization=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Alias",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"Alias",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Domains",params,undefined,false); 
			copyArgs(n,"KmsKeyArn",params,undefined,false); 
			copyArgs(n,"EnableInteroperability",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"Alias",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"Domains",params,undefined,false); 
			copyArgs(msg,"KmsKeyArn",params,undefined,false); 
			copyArgs(msg,"EnableInteroperability",params,undefined,false); 
			

			svc.createOrganization(params,cb);
		}

		
		service.CreateResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			

			svc.createResource(params,cb);
		}

		
		service.CreateUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"DisplayName",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,true); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"DisplayName",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,true); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"DisplayName",params,undefined,false); 
			copyArgs(msg,"Password",params,undefined,true); 
			

			svc.createUser(params,cb);
		}

		
		service.DeleteAccessControlRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteAccessControlRule(params,cb);
		}

		
		service.DeleteAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"EntityId",params,undefined,false); 
			copyArgs(n,"Alias",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"EntityId",params,undefined,false); 
			copyArgs(n,"Alias",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"EntityId",params,undefined,false); 
			copyArgs(msg,"Alias",params,undefined,false); 
			

			svc.deleteAlias(params,cb);
		}

		
		service.DeleteGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"GroupId",params,undefined,false); 
			

			svc.deleteGroup(params,cb);
		}

		
		service.DeleteMailboxPermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"EntityId",params,undefined,false); 
			copyArgs(n,"GranteeId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"EntityId",params,undefined,false); 
			copyArgs(n,"GranteeId",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"EntityId",params,undefined,false); 
			copyArgs(msg,"GranteeId",params,undefined,false); 
			

			svc.deleteMailboxPermissions(params,cb);
		}

		
		service.DeleteMobileDeviceAccessRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"MobileDeviceAccessRuleId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"MobileDeviceAccessRuleId",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"MobileDeviceAccessRuleId",params,undefined,false); 
			

			svc.deleteMobileDeviceAccessRule(params,cb);
		}

		
		service.DeleteOrganization=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"DeleteDirectory",params,undefined,false); 
			
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"DeleteDirectory",params,undefined,false); 
			
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"DeleteDirectory",params,undefined,false); 
			

			svc.deleteOrganization(params,cb);
		}

		
		service.DeleteResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			

			svc.deleteResource(params,cb);
		}

		
		service.DeleteRetentionPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.deleteRetentionPolicy(params,cb);
		}

		
		service.DeleteUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"UserId",params,undefined,false); 
			

			svc.deleteUser(params,cb);
		}

		
		service.DeregisterFromWorkMail=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"EntityId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"EntityId",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"EntityId",params,undefined,false); 
			

			svc.deregisterFromWorkMail(params,cb);
		}

		
		service.DescribeGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"GroupId",params,undefined,false); 
			

			svc.describeGroup(params,cb);
		}

		
		service.DescribeMailboxExportJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(n,"OrganizationId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(n,"OrganizationId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			

			svc.describeMailboxExportJob(params,cb);
		}

		
		service.DescribeOrganization=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			

			svc.describeOrganization(params,cb);
		}

		
		service.DescribeResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			

			svc.describeResource(params,cb);
		}

		
		service.DescribeUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"UserId",params,undefined,false); 
			

			svc.describeUser(params,cb);
		}

		
		service.DisassociateDelegateFromResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"EntityId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"EntityId",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"EntityId",params,undefined,false); 
			

			svc.disassociateDelegateFromResource(params,cb);
		}

		
		service.DisassociateMemberFromGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"MemberId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"MemberId",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"GroupId",params,undefined,false); 
			copyArgs(msg,"MemberId",params,undefined,false); 
			

			svc.disassociateMemberFromGroup(params,cb);
		}

		
		service.GetAccessControlEffect=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"IpAddress",params,undefined,false); 
			copyArgs(n,"Action",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"IpAddress",params,undefined,false); 
			copyArgs(n,"Action",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"IpAddress",params,undefined,false); 
			copyArgs(msg,"Action",params,undefined,false); 
			copyArgs(msg,"UserId",params,undefined,false); 
			

			svc.getAccessControlEffect(params,cb);
		}

		
		service.GetDefaultRetentionPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			

			svc.getDefaultRetentionPolicy(params,cb);
		}

		
		service.GetMailboxDetails=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"UserId",params,undefined,false); 
			

			svc.getMailboxDetails(params,cb);
		}

		
		service.GetMobileDeviceAccessEffect=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"DeviceType",params,undefined,false); 
			copyArgs(n,"DeviceModel",params,undefined,false); 
			copyArgs(n,"DeviceOperatingSystem",params,undefined,false); 
			copyArgs(n,"DeviceUserAgent",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"DeviceType",params,undefined,false); 
			copyArgs(msg,"DeviceModel",params,undefined,false); 
			copyArgs(msg,"DeviceOperatingSystem",params,undefined,false); 
			copyArgs(msg,"DeviceUserAgent",params,undefined,false); 
			

			svc.getMobileDeviceAccessEffect(params,cb);
		}

		
		service.ListAccessControlRules=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			

			svc.listAccessControlRules(params,cb);
		}

		
		service.ListAliases=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"EntityId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"EntityId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"EntityId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listAliases(params,cb);
		}

		
		service.ListGroupMembers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"GroupId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listGroupMembers(params,cb);
		}

		
		service.ListGroups=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listGroups(params,cb);
		}

		
		service.ListMailboxExportJobs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listMailboxExportJobs(params,cb);
		}

		
		service.ListMailboxPermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"EntityId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"EntityId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"EntityId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listMailboxPermissions(params,cb);
		}

		
		service.ListMobileDeviceAccessRules=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			

			svc.listMobileDeviceAccessRules(params,cb);
		}

		
		service.ListOrganizations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listOrganizations(params,cb);
		}

		
		service.ListResourceDelegates=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listResourceDelegates(params,cb);
		}

		
		service.ListResources=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listResources(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListUsers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listUsers(params,cb);
		}

		
		service.PutAccessControlRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Effect",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"OrganizationId",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Effect",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"IpRanges",params,undefined,true); 
			copyArgs(n,"NotIpRanges",params,undefined,true); 
			copyArgs(n,"Actions",params,undefined,true); 
			copyArgs(n,"NotActions",params,undefined,true); 
			copyArgs(n,"UserIds",params,undefined,true); 
			copyArgs(n,"NotUserIds",params,undefined,true); 
			copyArgs(n,"OrganizationId",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Effect",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"IpRanges",params,undefined,true); 
			copyArgs(msg,"NotIpRanges",params,undefined,true); 
			copyArgs(msg,"Actions",params,undefined,true); 
			copyArgs(msg,"NotActions",params,undefined,true); 
			copyArgs(msg,"UserIds",params,undefined,true); 
			copyArgs(msg,"NotUserIds",params,undefined,true); 
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			

			svc.putAccessControlRule(params,cb);
		}

		
		service.PutMailboxPermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"EntityId",params,undefined,false); 
			copyArgs(n,"GranteeId",params,undefined,false); 
			copyArgs(n,"PermissionValues",params,undefined,true); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"EntityId",params,undefined,false); 
			copyArgs(n,"GranteeId",params,undefined,false); 
			copyArgs(n,"PermissionValues",params,undefined,true); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"EntityId",params,undefined,false); 
			copyArgs(msg,"GranteeId",params,undefined,false); 
			copyArgs(msg,"PermissionValues",params,undefined,true); 
			

			svc.putMailboxPermissions(params,cb);
		}

		
		service.PutRetentionPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"FolderConfigurations",params,undefined,true); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"FolderConfigurations",params,undefined,true); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"FolderConfigurations",params,undefined,true); 
			

			svc.putRetentionPolicy(params,cb);
		}

		
		service.RegisterToWorkMail=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"EntityId",params,undefined,false); 
			copyArgs(n,"Email",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"EntityId",params,undefined,false); 
			copyArgs(n,"Email",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"EntityId",params,undefined,false); 
			copyArgs(msg,"Email",params,undefined,false); 
			

			svc.registerToWorkMail(params,cb);
		}

		
		service.ResetPassword=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,true); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,true); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"UserId",params,undefined,false); 
			copyArgs(msg,"Password",params,undefined,true); 
			

			svc.resetPassword(params,cb);
		}

		
		service.StartMailboxExportJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"EntityId",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"KmsKeyArn",params,undefined,false); 
			copyArgs(n,"S3BucketName",params,undefined,false); 
			copyArgs(n,"S3Prefix",params,undefined,false); 
			
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"EntityId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"KmsKeyArn",params,undefined,false); 
			copyArgs(n,"S3BucketName",params,undefined,false); 
			copyArgs(n,"S3Prefix",params,undefined,false); 
			
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"EntityId",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"KmsKeyArn",params,undefined,false); 
			copyArgs(msg,"S3BucketName",params,undefined,false); 
			copyArgs(msg,"S3Prefix",params,undefined,false); 
			

			svc.startMailboxExportJob(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateMailboxQuota=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"MailboxQuota",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"MailboxQuota",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"UserId",params,undefined,false); 
			copyArgs(msg,"MailboxQuota",params,undefined,false); 
			

			svc.updateMailboxQuota(params,cb);
		}

		
		service.UpdateMobileDeviceAccessRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"MobileDeviceAccessRuleId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Effect",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"MobileDeviceAccessRuleId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Effect",params,undefined,false); 
			copyArgs(n,"DeviceTypes",params,undefined,true); 
			copyArgs(n,"NotDeviceTypes",params,undefined,true); 
			copyArgs(n,"DeviceModels",params,undefined,true); 
			copyArgs(n,"NotDeviceModels",params,undefined,true); 
			copyArgs(n,"DeviceOperatingSystems",params,undefined,true); 
			copyArgs(n,"NotDeviceOperatingSystems",params,undefined,true); 
			copyArgs(n,"DeviceUserAgents",params,undefined,true); 
			copyArgs(n,"NotDeviceUserAgents",params,undefined,true); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"MobileDeviceAccessRuleId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Effect",params,undefined,false); 
			copyArgs(msg,"DeviceTypes",params,undefined,true); 
			copyArgs(msg,"NotDeviceTypes",params,undefined,true); 
			copyArgs(msg,"DeviceModels",params,undefined,true); 
			copyArgs(msg,"NotDeviceModels",params,undefined,true); 
			copyArgs(msg,"DeviceOperatingSystems",params,undefined,true); 
			copyArgs(msg,"NotDeviceOperatingSystems",params,undefined,true); 
			copyArgs(msg,"DeviceUserAgents",params,undefined,true); 
			copyArgs(msg,"NotDeviceUserAgents",params,undefined,true); 
			

			svc.updateMobileDeviceAccessRule(params,cb);
		}

		
		service.UpdatePrimaryEmailAddress=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"EntityId",params,undefined,false); 
			copyArgs(n,"Email",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"EntityId",params,undefined,false); 
			copyArgs(n,"Email",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"EntityId",params,undefined,false); 
			copyArgs(msg,"Email",params,undefined,false); 
			

			svc.updatePrimaryEmailAddress(params,cb);
		}

		
		service.UpdateResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"BookingOptions",params,undefined,true); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"BookingOptions",params,undefined,true); 
			

			svc.updateResource(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS WorkMail", AmazonAPINode);

};
