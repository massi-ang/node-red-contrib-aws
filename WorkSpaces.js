
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

		var awsService = new AWS.WorkSpaces( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.WorkSpaces(msg.AWSConfig) : awsService;

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

		
		service.AssociateConnectionAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AliasId",params,undefined,false); 
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"AliasId",params,undefined,false); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			

			svc.associateConnectionAlias(params,cb);
		}

		
		service.AssociateIpGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"GroupIds",params,undefined,true); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"GroupIds",params,undefined,true); 
			

			svc.associateIpGroups(params,cb);
		}

		
		service.AuthorizeIpRules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupId",params,undefined,false); 
			copyArg(n,"UserRules",params,undefined,true); 
			
			copyArg(msg,"GroupId",params,undefined,false); 
			copyArg(msg,"UserRules",params,undefined,true); 
			

			svc.authorizeIpRules(params,cb);
		}

		
		service.CopyWorkspaceImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"SourceImageId",params,undefined,false); 
			copyArg(n,"SourceRegion",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"SourceImageId",params,undefined,false); 
			copyArg(msg,"SourceRegion",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.copyWorkspaceImage(params,cb);
		}

		
		service.CreateConnectionAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConnectionString",params,undefined,false); 
			
			copyArg(msg,"ConnectionString",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createConnectionAlias(params,cb);
		}

		
		service.CreateIpGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupName",params,undefined,false); 
			
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"GroupDesc",params,undefined,false); 
			copyArg(msg,"UserRules",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createIpGroup(params,cb);
		}

		
		service.CreateTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createTags(params,cb);
		}

		
		service.CreateWorkspaceBundle=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BundleName",params,undefined,false); 
			copyArg(n,"BundleDescription",params,undefined,false); 
			copyArg(n,"ImageId",params,undefined,false); 
			copyArg(n,"ComputeType",params,undefined,true); 
			copyArg(n,"UserStorage",params,undefined,true); 
			
			copyArg(msg,"BundleName",params,undefined,false); 
			copyArg(msg,"BundleDescription",params,undefined,false); 
			copyArg(msg,"ImageId",params,undefined,false); 
			copyArg(msg,"ComputeType",params,undefined,true); 
			copyArg(msg,"UserStorage",params,undefined,true); 
			copyArg(msg,"RootStorage",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createWorkspaceBundle(params,cb);
		}

		
		service.CreateWorkspaces=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Workspaces",params,undefined,false); 
			
			copyArg(msg,"Workspaces",params,undefined,false); 
			

			svc.createWorkspaces(params,cb);
		}

		
		service.DeleteConnectionAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AliasId",params,undefined,false); 
			
			copyArg(msg,"AliasId",params,undefined,false); 
			

			svc.deleteConnectionAlias(params,cb);
		}

		
		service.DeleteIpGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupId",params,undefined,false); 
			
			copyArg(msg,"GroupId",params,undefined,false); 
			

			svc.deleteIpGroup(params,cb);
		}

		
		service.DeleteTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.deleteTags(params,cb);
		}

		
		service.DeleteWorkspaceBundle=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"BundleId",params,undefined,false); 
			

			svc.deleteWorkspaceBundle(params,cb);
		}

		
		service.DeleteWorkspaceImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ImageId",params,undefined,false); 
			
			copyArg(msg,"ImageId",params,undefined,false); 
			

			svc.deleteWorkspaceImage(params,cb);
		}

		
		service.DeregisterWorkspaceDirectory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			

			svc.deregisterWorkspaceDirectory(params,cb);
		}

		
		service.DescribeAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeAccount(params,cb);
		}

		
		service.DescribeAccountModifications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeAccountModifications(params,cb);
		}

		
		service.DescribeClientProperties=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceIds",params,undefined,false); 
			
			copyArg(msg,"ResourceIds",params,undefined,false); 
			

			svc.describeClientProperties(params,cb);
		}

		
		service.DescribeConnectionAliasPermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AliasId",params,undefined,false); 
			
			copyArg(msg,"AliasId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describeConnectionAliasPermissions(params,cb);
		}

		
		service.DescribeConnectionAliases=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AliasIds",params,undefined,false); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeConnectionAliases(params,cb);
		}

		
		service.DescribeIpGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"GroupIds",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describeIpGroups(params,cb);
		}

		
		service.DescribeTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			

			svc.describeTags(params,cb);
		}

		
		service.DescribeWorkspaceBundles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"BundleIds",params,undefined,false); 
			copyArg(msg,"Owner",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeWorkspaceBundles(params,cb);
		}

		
		service.DescribeWorkspaceDirectories=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DirectoryIds",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeWorkspaceDirectories(params,cb);
		}

		
		service.DescribeWorkspaceImagePermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ImageId",params,undefined,false); 
			
			copyArg(msg,"ImageId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describeWorkspaceImagePermissions(params,cb);
		}

		
		service.DescribeWorkspaceImages=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ImageIds",params,undefined,false); 
			copyArg(msg,"ImageType",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describeWorkspaceImages(params,cb);
		}

		
		service.DescribeWorkspaceSnapshots=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkspaceId",params,undefined,false); 
			
			copyArg(msg,"WorkspaceId",params,undefined,false); 
			

			svc.describeWorkspaceSnapshots(params,cb);
		}

		
		service.DescribeWorkspaces=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"WorkspaceIds",params,undefined,true); 
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"BundleId",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeWorkspaces(params,cb);
		}

		
		service.DescribeWorkspacesConnectionStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"WorkspaceIds",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeWorkspacesConnectionStatus(params,cb);
		}

		
		service.DisassociateConnectionAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AliasId",params,undefined,false); 
			
			copyArg(msg,"AliasId",params,undefined,false); 
			

			svc.disassociateConnectionAlias(params,cb);
		}

		
		service.DisassociateIpGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"GroupIds",params,undefined,true); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"GroupIds",params,undefined,true); 
			

			svc.disassociateIpGroups(params,cb);
		}

		
		service.ImportWorkspaceImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Ec2ImageId",params,undefined,false); 
			copyArg(n,"IngestionProcess",params,undefined,false); 
			copyArg(n,"ImageName",params,undefined,false); 
			copyArg(n,"ImageDescription",params,undefined,false); 
			
			copyArg(msg,"Ec2ImageId",params,undefined,false); 
			copyArg(msg,"IngestionProcess",params,undefined,false); 
			copyArg(msg,"ImageName",params,undefined,false); 
			copyArg(msg,"ImageDescription",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"Applications",params,undefined,false); 
			

			svc.importWorkspaceImage(params,cb);
		}

		
		service.ListAvailableManagementCidrRanges=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ManagementCidrRangeConstraint",params,undefined,false); 
			
			copyArg(msg,"ManagementCidrRangeConstraint",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listAvailableManagementCidrRanges(params,cb);
		}

		
		service.MigrateWorkspace=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceWorkspaceId",params,undefined,false); 
			copyArg(n,"BundleId",params,undefined,false); 
			
			copyArg(msg,"SourceWorkspaceId",params,undefined,false); 
			copyArg(msg,"BundleId",params,undefined,false); 
			

			svc.migrateWorkspace(params,cb);
		}

		
		service.ModifyAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DedicatedTenancySupport",params,undefined,false); 
			copyArg(msg,"DedicatedTenancyManagementCidrRange",params,undefined,false); 
			

			svc.modifyAccount(params,cb);
		}

		
		service.ModifyClientProperties=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"ClientProperties",params,undefined,true); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"ClientProperties",params,undefined,true); 
			

			svc.modifyClientProperties(params,cb);
		}

		
		service.ModifySelfservicePermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"SelfservicePermissions",params,undefined,true); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"SelfservicePermissions",params,undefined,true); 
			

			svc.modifySelfservicePermissions(params,cb);
		}

		
		service.ModifyWorkspaceAccessProperties=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"WorkspaceAccessProperties",params,undefined,true); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"WorkspaceAccessProperties",params,undefined,true); 
			

			svc.modifyWorkspaceAccessProperties(params,cb);
		}

		
		service.ModifyWorkspaceCreationProperties=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"WorkspaceCreationProperties",params,undefined,false); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"WorkspaceCreationProperties",params,undefined,false); 
			

			svc.modifyWorkspaceCreationProperties(params,cb);
		}

		
		service.ModifyWorkspaceProperties=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkspaceId",params,undefined,false); 
			copyArg(n,"WorkspaceProperties",params,undefined,true); 
			
			copyArg(msg,"WorkspaceId",params,undefined,false); 
			copyArg(msg,"WorkspaceProperties",params,undefined,true); 
			

			svc.modifyWorkspaceProperties(params,cb);
		}

		
		service.ModifyWorkspaceState=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkspaceId",params,undefined,false); 
			copyArg(n,"WorkspaceState",params,undefined,false); 
			
			copyArg(msg,"WorkspaceId",params,undefined,false); 
			copyArg(msg,"WorkspaceState",params,undefined,false); 
			

			svc.modifyWorkspaceState(params,cb);
		}

		
		service.RebootWorkspaces=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RebootWorkspaceRequests",params,undefined,false); 
			
			copyArg(msg,"RebootWorkspaceRequests",params,undefined,false); 
			

			svc.rebootWorkspaces(params,cb);
		}

		
		service.RebuildWorkspaces=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RebuildWorkspaceRequests",params,undefined,false); 
			
			copyArg(msg,"RebuildWorkspaceRequests",params,undefined,false); 
			

			svc.rebuildWorkspaces(params,cb);
		}

		
		service.RegisterWorkspaceDirectory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"EnableWorkDocs",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"SubnetIds",params,undefined,true); 
			copyArg(msg,"EnableWorkDocs",params,undefined,false); 
			copyArg(msg,"EnableSelfService",params,undefined,false); 
			copyArg(msg,"Tenancy",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.registerWorkspaceDirectory(params,cb);
		}

		
		service.RestoreWorkspace=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkspaceId",params,undefined,false); 
			
			copyArg(msg,"WorkspaceId",params,undefined,false); 
			

			svc.restoreWorkspace(params,cb);
		}

		
		service.RevokeIpRules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupId",params,undefined,false); 
			copyArg(n,"UserRules",params,undefined,false); 
			
			copyArg(msg,"GroupId",params,undefined,false); 
			copyArg(msg,"UserRules",params,undefined,false); 
			

			svc.revokeIpRules(params,cb);
		}

		
		service.StartWorkspaces=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StartWorkspaceRequests",params,undefined,false); 
			
			copyArg(msg,"StartWorkspaceRequests",params,undefined,false); 
			

			svc.startWorkspaces(params,cb);
		}

		
		service.StopWorkspaces=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StopWorkspaceRequests",params,undefined,false); 
			
			copyArg(msg,"StopWorkspaceRequests",params,undefined,false); 
			

			svc.stopWorkspaces(params,cb);
		}

		
		service.TerminateWorkspaces=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TerminateWorkspaceRequests",params,undefined,false); 
			
			copyArg(msg,"TerminateWorkspaceRequests",params,undefined,false); 
			

			svc.terminateWorkspaces(params,cb);
		}

		
		service.UpdateConnectionAliasPermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AliasId",params,undefined,false); 
			copyArg(n,"ConnectionAliasPermission",params,undefined,true); 
			
			copyArg(msg,"AliasId",params,undefined,false); 
			copyArg(msg,"ConnectionAliasPermission",params,undefined,true); 
			

			svc.updateConnectionAliasPermission(params,cb);
		}

		
		service.UpdateRulesOfIpGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupId",params,undefined,false); 
			copyArg(n,"UserRules",params,undefined,true); 
			
			copyArg(msg,"GroupId",params,undefined,false); 
			copyArg(msg,"UserRules",params,undefined,true); 
			

			svc.updateRulesOfIpGroup(params,cb);
		}

		
		service.UpdateWorkspaceBundle=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"BundleId",params,undefined,false); 
			copyArg(msg,"ImageId",params,undefined,false); 
			

			svc.updateWorkspaceBundle(params,cb);
		}

		
		service.UpdateWorkspaceImagePermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ImageId",params,undefined,false); 
			copyArg(n,"AllowCopyImage",params,undefined,false); 
			copyArg(n,"SharedAccountId",params,undefined,false); 
			
			copyArg(msg,"ImageId",params,undefined,false); 
			copyArg(msg,"AllowCopyImage",params,undefined,false); 
			copyArg(msg,"SharedAccountId",params,undefined,false); 
			

			svc.updateWorkspaceImagePermission(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS WorkSpaces", AmazonAPINode);

};
