
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

		var awsService = new AWS.WorkSpaces( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.WorkSpaces(msg.AWSConfig) : awsService;

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
		
			service.AssociateConnectionAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AliasId",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"AliasId",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(msg,"AliasId",params,undefined,false); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			

			svc.associateConnectionAlias(params,cb);
		}
			service.AssociateIpGroups=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"GroupIds",params,undefined,true); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"GroupIds",params,undefined,true); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"GroupIds",params,undefined,true); 
			

			svc.associateIpGroups(params,cb);
		}
			service.AuthorizeIpRules=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"UserRules",params,undefined,true); 
			
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"UserRules",params,undefined,true); 
			
			copyArgs(msg,"GroupId",params,undefined,false); 
			copyArgs(msg,"UserRules",params,undefined,true); 
			

			svc.authorizeIpRules(params,cb);
		}
			service.CopyWorkspaceImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"SourceImageId",params,undefined,false); 
			copyArgs(n,"SourceRegion",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"SourceImageId",params,undefined,false); 
			copyArgs(n,"SourceRegion",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"SourceImageId",params,undefined,false); 
			copyArgs(msg,"SourceRegion",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.copyWorkspaceImage(params,cb);
		}
			service.CreateConnectionAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConnectionString",params,undefined,false); 
			
			copyArgs(n,"ConnectionString",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ConnectionString",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createConnectionAlias(params,cb);
		}
			service.CreateIpGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupName",params,undefined,false); 
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"GroupDesc",params,undefined,false); 
			copyArgs(n,"UserRules",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"GroupDesc",params,undefined,false); 
			copyArgs(msg,"UserRules",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createIpGroup(params,cb);
		}
			service.CreateTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createTags(params,cb);
		}
			service.CreateWorkspaceBundle=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BundleName",params,undefined,false); 
			copyArgs(n,"BundleDescription",params,undefined,false); 
			copyArgs(n,"ImageId",params,undefined,false); 
			copyArgs(n,"ComputeType",params,undefined,true); 
			copyArgs(n,"UserStorage",params,undefined,true); 
			
			copyArgs(n,"BundleName",params,undefined,false); 
			copyArgs(n,"BundleDescription",params,undefined,false); 
			copyArgs(n,"ImageId",params,undefined,false); 
			copyArgs(n,"ComputeType",params,undefined,true); 
			copyArgs(n,"UserStorage",params,undefined,true); 
			copyArgs(n,"RootStorage",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"BundleName",params,undefined,false); 
			copyArgs(msg,"BundleDescription",params,undefined,false); 
			copyArgs(msg,"ImageId",params,undefined,false); 
			copyArgs(msg,"ComputeType",params,undefined,true); 
			copyArgs(msg,"UserStorage",params,undefined,true); 
			copyArgs(msg,"RootStorage",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createWorkspaceBundle(params,cb);
		}
			service.CreateWorkspaces=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Workspaces",params,undefined,false); 
			
			copyArgs(n,"Workspaces",params,undefined,false); 
			
			copyArgs(msg,"Workspaces",params,undefined,false); 
			

			svc.createWorkspaces(params,cb);
		}
			service.DeleteConnectionAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AliasId",params,undefined,false); 
			
			copyArgs(n,"AliasId",params,undefined,false); 
			
			copyArgs(msg,"AliasId",params,undefined,false); 
			

			svc.deleteConnectionAlias(params,cb);
		}
			service.DeleteIpGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(msg,"GroupId",params,undefined,false); 
			

			svc.deleteIpGroup(params,cb);
		}
			service.DeleteTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.deleteTags(params,cb);
		}
			service.DeleteWorkspaceBundle=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"BundleId",params,undefined,false); 
			
			copyArgs(msg,"BundleId",params,undefined,false); 
			

			svc.deleteWorkspaceBundle(params,cb);
		}
			service.DeleteWorkspaceImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ImageId",params,undefined,false); 
			
			copyArgs(n,"ImageId",params,undefined,false); 
			
			copyArgs(msg,"ImageId",params,undefined,false); 
			

			svc.deleteWorkspaceImage(params,cb);
		}
			service.DeregisterWorkspaceDirectory=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			

			svc.deregisterWorkspaceDirectory(params,cb);
		}
			service.DescribeAccount=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeAccount(params,cb);
		}
			service.DescribeAccountModifications=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeAccountModifications(params,cb);
		}
			service.DescribeClientProperties=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceIds",params,undefined,false); 
			
			copyArgs(n,"ResourceIds",params,undefined,false); 
			
			copyArgs(msg,"ResourceIds",params,undefined,false); 
			

			svc.describeClientProperties(params,cb);
		}
			service.DescribeConnectionAliasPermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AliasId",params,undefined,false); 
			
			copyArgs(n,"AliasId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"AliasId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeConnectionAliasPermissions(params,cb);
		}
			service.DescribeConnectionAliases=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AliasIds",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AliasIds",params,undefined,false); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeConnectionAliases(params,cb);
		}
			service.DescribeIpGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"GroupIds",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"GroupIds",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeIpGroups(params,cb);
		}
			service.DescribeTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			

			svc.describeTags(params,cb);
		}
			service.DescribeWorkspaceBundles=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"BundleIds",params,undefined,false); 
			copyArgs(n,"Owner",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"BundleIds",params,undefined,false); 
			copyArgs(msg,"Owner",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeWorkspaceBundles(params,cb);
		}
			service.DescribeWorkspaceDirectories=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DirectoryIds",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DirectoryIds",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeWorkspaceDirectories(params,cb);
		}
			service.DescribeWorkspaceImagePermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ImageId",params,undefined,false); 
			
			copyArgs(n,"ImageId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ImageId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeWorkspaceImagePermissions(params,cb);
		}
			service.DescribeWorkspaceImages=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ImageIds",params,undefined,false); 
			copyArgs(n,"ImageType",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ImageIds",params,undefined,false); 
			copyArgs(msg,"ImageType",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeWorkspaceImages(params,cb);
		}
			service.DescribeWorkspaceSnapshots=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkspaceId",params,undefined,false); 
			
			copyArgs(n,"WorkspaceId",params,undefined,false); 
			
			copyArgs(msg,"WorkspaceId",params,undefined,false); 
			

			svc.describeWorkspaceSnapshots(params,cb);
		}
			service.DescribeWorkspaces=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"WorkspaceIds",params,undefined,true); 
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"BundleId",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"WorkspaceIds",params,undefined,true); 
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"BundleId",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeWorkspaces(params,cb);
		}
			service.DescribeWorkspacesConnectionStatus=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"WorkspaceIds",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"WorkspaceIds",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeWorkspacesConnectionStatus(params,cb);
		}
			service.DisassociateConnectionAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AliasId",params,undefined,false); 
			
			copyArgs(n,"AliasId",params,undefined,false); 
			
			copyArgs(msg,"AliasId",params,undefined,false); 
			

			svc.disassociateConnectionAlias(params,cb);
		}
			service.DisassociateIpGroups=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"GroupIds",params,undefined,true); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"GroupIds",params,undefined,true); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"GroupIds",params,undefined,true); 
			

			svc.disassociateIpGroups(params,cb);
		}
			service.ImportWorkspaceImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Ec2ImageId",params,undefined,false); 
			copyArgs(n,"IngestionProcess",params,undefined,false); 
			copyArgs(n,"ImageName",params,undefined,false); 
			copyArgs(n,"ImageDescription",params,undefined,false); 
			
			copyArgs(n,"Ec2ImageId",params,undefined,false); 
			copyArgs(n,"IngestionProcess",params,undefined,false); 
			copyArgs(n,"ImageName",params,undefined,false); 
			copyArgs(n,"ImageDescription",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"Applications",params,undefined,false); 
			
			copyArgs(msg,"Ec2ImageId",params,undefined,false); 
			copyArgs(msg,"IngestionProcess",params,undefined,false); 
			copyArgs(msg,"ImageName",params,undefined,false); 
			copyArgs(msg,"ImageDescription",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"Applications",params,undefined,false); 
			

			svc.importWorkspaceImage(params,cb);
		}
			service.ListAvailableManagementCidrRanges=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ManagementCidrRangeConstraint",params,undefined,false); 
			
			copyArgs(n,"ManagementCidrRangeConstraint",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ManagementCidrRangeConstraint",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listAvailableManagementCidrRanges(params,cb);
		}
			service.MigrateWorkspace=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceWorkspaceId",params,undefined,false); 
			copyArgs(n,"BundleId",params,undefined,false); 
			
			copyArgs(n,"SourceWorkspaceId",params,undefined,false); 
			copyArgs(n,"BundleId",params,undefined,false); 
			
			copyArgs(msg,"SourceWorkspaceId",params,undefined,false); 
			copyArgs(msg,"BundleId",params,undefined,false); 
			

			svc.migrateWorkspace(params,cb);
		}
			service.ModifyAccount=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DedicatedTenancySupport",params,undefined,false); 
			copyArgs(n,"DedicatedTenancyManagementCidrRange",params,undefined,false); 
			
			copyArgs(msg,"DedicatedTenancySupport",params,undefined,false); 
			copyArgs(msg,"DedicatedTenancyManagementCidrRange",params,undefined,false); 
			

			svc.modifyAccount(params,cb);
		}
			service.ModifyClientProperties=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"ClientProperties",params,undefined,true); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"ClientProperties",params,undefined,true); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"ClientProperties",params,undefined,true); 
			

			svc.modifyClientProperties(params,cb);
		}
			service.ModifySelfservicePermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"SelfservicePermissions",params,undefined,true); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"SelfservicePermissions",params,undefined,true); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"SelfservicePermissions",params,undefined,true); 
			

			svc.modifySelfservicePermissions(params,cb);
		}
			service.ModifyWorkspaceAccessProperties=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"WorkspaceAccessProperties",params,undefined,true); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"WorkspaceAccessProperties",params,undefined,true); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"WorkspaceAccessProperties",params,undefined,true); 
			

			svc.modifyWorkspaceAccessProperties(params,cb);
		}
			service.ModifyWorkspaceCreationProperties=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"WorkspaceCreationProperties",params,undefined,false); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"WorkspaceCreationProperties",params,undefined,false); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"WorkspaceCreationProperties",params,undefined,false); 
			

			svc.modifyWorkspaceCreationProperties(params,cb);
		}
			service.ModifyWorkspaceProperties=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkspaceId",params,undefined,false); 
			copyArgs(n,"WorkspaceProperties",params,undefined,true); 
			
			copyArgs(n,"WorkspaceId",params,undefined,false); 
			copyArgs(n,"WorkspaceProperties",params,undefined,true); 
			
			copyArgs(msg,"WorkspaceId",params,undefined,false); 
			copyArgs(msg,"WorkspaceProperties",params,undefined,true); 
			

			svc.modifyWorkspaceProperties(params,cb);
		}
			service.ModifyWorkspaceState=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkspaceId",params,undefined,false); 
			copyArgs(n,"WorkspaceState",params,undefined,false); 
			
			copyArgs(n,"WorkspaceId",params,undefined,false); 
			copyArgs(n,"WorkspaceState",params,undefined,false); 
			
			copyArgs(msg,"WorkspaceId",params,undefined,false); 
			copyArgs(msg,"WorkspaceState",params,undefined,false); 
			

			svc.modifyWorkspaceState(params,cb);
		}
			service.RebootWorkspaces=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RebootWorkspaceRequests",params,undefined,false); 
			
			copyArgs(n,"RebootWorkspaceRequests",params,undefined,false); 
			
			copyArgs(msg,"RebootWorkspaceRequests",params,undefined,false); 
			

			svc.rebootWorkspaces(params,cb);
		}
			service.RebuildWorkspaces=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RebuildWorkspaceRequests",params,undefined,false); 
			
			copyArgs(n,"RebuildWorkspaceRequests",params,undefined,false); 
			
			copyArgs(msg,"RebuildWorkspaceRequests",params,undefined,false); 
			

			svc.rebuildWorkspaces(params,cb);
		}
			service.RegisterWorkspaceDirectory=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(Boolean(n),"EnableWorkDocs",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			copyArgs(Boolean(n),"EnableWorkDocs",params,undefined,false); 
			copyArgs(Boolean(n),"EnableSelfService",params,undefined,false); 
			copyArgs(n,"Tenancy",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"SubnetIds",params,undefined,true); 
			copyArgs(msg,"EnableWorkDocs",params,undefined,false); 
			copyArgs(msg,"EnableSelfService",params,undefined,false); 
			copyArgs(msg,"Tenancy",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.registerWorkspaceDirectory(params,cb);
		}
			service.RestoreWorkspace=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkspaceId",params,undefined,false); 
			
			copyArgs(n,"WorkspaceId",params,undefined,false); 
			
			copyArgs(msg,"WorkspaceId",params,undefined,false); 
			

			svc.restoreWorkspace(params,cb);
		}
			service.RevokeIpRules=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"UserRules",params,undefined,false); 
			
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"UserRules",params,undefined,false); 
			
			copyArgs(msg,"GroupId",params,undefined,false); 
			copyArgs(msg,"UserRules",params,undefined,false); 
			

			svc.revokeIpRules(params,cb);
		}
			service.StartWorkspaces=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StartWorkspaceRequests",params,undefined,false); 
			
			copyArgs(n,"StartWorkspaceRequests",params,undefined,false); 
			
			copyArgs(msg,"StartWorkspaceRequests",params,undefined,false); 
			

			svc.startWorkspaces(params,cb);
		}
			service.StopWorkspaces=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StopWorkspaceRequests",params,undefined,false); 
			
			copyArgs(n,"StopWorkspaceRequests",params,undefined,false); 
			
			copyArgs(msg,"StopWorkspaceRequests",params,undefined,false); 
			

			svc.stopWorkspaces(params,cb);
		}
			service.TerminateWorkspaces=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TerminateWorkspaceRequests",params,undefined,false); 
			
			copyArgs(n,"TerminateWorkspaceRequests",params,undefined,false); 
			
			copyArgs(msg,"TerminateWorkspaceRequests",params,undefined,false); 
			

			svc.terminateWorkspaces(params,cb);
		}
			service.UpdateConnectionAliasPermission=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AliasId",params,undefined,false); 
			copyArgs(n,"ConnectionAliasPermission",params,undefined,true); 
			
			copyArgs(n,"AliasId",params,undefined,false); 
			copyArgs(n,"ConnectionAliasPermission",params,undefined,true); 
			
			copyArgs(msg,"AliasId",params,undefined,false); 
			copyArgs(msg,"ConnectionAliasPermission",params,undefined,true); 
			

			svc.updateConnectionAliasPermission(params,cb);
		}
			service.UpdateRulesOfIpGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"UserRules",params,undefined,true); 
			
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"UserRules",params,undefined,true); 
			
			copyArgs(msg,"GroupId",params,undefined,false); 
			copyArgs(msg,"UserRules",params,undefined,true); 
			

			svc.updateRulesOfIpGroup(params,cb);
		}
			service.UpdateWorkspaceBundle=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"BundleId",params,undefined,false); 
			copyArgs(n,"ImageId",params,undefined,false); 
			
			copyArgs(msg,"BundleId",params,undefined,false); 
			copyArgs(msg,"ImageId",params,undefined,false); 
			

			svc.updateWorkspaceBundle(params,cb);
		}
			service.UpdateWorkspaceImagePermission=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ImageId",params,undefined,false); 
			copyArgs(Boolean(n),"AllowCopyImage",params,undefined,false); 
			copyArgs(n,"SharedAccountId",params,undefined,false); 
			
			copyArgs(n,"ImageId",params,undefined,false); 
			copyArgs(Boolean(n),"AllowCopyImage",params,undefined,false); 
			copyArgs(n,"SharedAccountId",params,undefined,false); 
			
			copyArgs(msg,"ImageId",params,undefined,false); 
			copyArgs(msg,"AllowCopyImage",params,undefined,false); 
			copyArgs(msg,"SharedAccountId",params,undefined,false); 
			

			svc.updateWorkspaceImagePermission(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS WorkSpaces", AmazonAPINode);

};
