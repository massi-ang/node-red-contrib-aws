
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

		var awsService = new AWS.QuickSight( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.QuickSight(msg.AWSConfig) : awsService;

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

		
		service.CancelIngestion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DataSetId",params,undefined,false); 
			copyArgs(n,"IngestionId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DataSetId",params,undefined,false); 
			copyArgs(n,"IngestionId",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"DataSetId",params,undefined,false); 
			copyArgs(msg,"IngestionId",params,undefined,false); 
			

			svc.cancelIngestion(params,cb);
		}

		
		service.CreateAccountCustomization=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"AccountCustomization",params,undefined,true); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			copyArgs(n,"AccountCustomization",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			copyArgs(msg,"AccountCustomization",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createAccountCustomization(params,cb);
		}

		
		service.CreateAnalysis=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"AnalysisId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"SourceEntity",params,undefined,true); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"AnalysisId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			copyArgs(n,"Permissions",params,undefined,true); 
			copyArgs(n,"SourceEntity",params,undefined,true); 
			copyArgs(n,"ThemeArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"AnalysisId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			copyArgs(msg,"Permissions",params,undefined,true); 
			copyArgs(msg,"SourceEntity",params,undefined,true); 
			copyArgs(msg,"ThemeArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createAnalysis(params,cb);
		}

		
		service.CreateDashboard=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DashboardId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"SourceEntity",params,undefined,true); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DashboardId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			copyArgs(n,"Permissions",params,undefined,true); 
			copyArgs(n,"SourceEntity",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"VersionDescription",params,undefined,false); 
			copyArgs(n,"DashboardPublishOptions",params,undefined,true); 
			copyArgs(n,"ThemeArn",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"DashboardId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			copyArgs(msg,"Permissions",params,undefined,true); 
			copyArgs(msg,"SourceEntity",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"VersionDescription",params,undefined,false); 
			copyArgs(msg,"DashboardPublishOptions",params,undefined,true); 
			copyArgs(msg,"ThemeArn",params,undefined,false); 
			

			svc.createDashboard(params,cb);
		}

		
		service.CreateDataSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DataSetId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"PhysicalTableMap",params,undefined,true); 
			copyArgs(n,"ImportMode",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DataSetId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"PhysicalTableMap",params,undefined,true); 
			copyArgs(n,"LogicalTableMap",params,undefined,true); 
			copyArgs(n,"ImportMode",params,undefined,false); 
			copyArgs(n,"ColumnGroups",params,undefined,true); 
			copyArgs(n,"FieldFolders",params,undefined,true); 
			copyArgs(n,"Permissions",params,undefined,true); 
			copyArgs(n,"RowLevelPermissionDataSet",params,undefined,true); 
			copyArgs(n,"RowLevelPermissionTagConfiguration",params,undefined,true); 
			copyArgs(n,"ColumnLevelPermissionRules",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"DataSetUsageConfiguration",params,undefined,true); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"DataSetId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"PhysicalTableMap",params,undefined,true); 
			copyArgs(msg,"LogicalTableMap",params,undefined,true); 
			copyArgs(msg,"ImportMode",params,undefined,false); 
			copyArgs(msg,"ColumnGroups",params,undefined,true); 
			copyArgs(msg,"FieldFolders",params,undefined,true); 
			copyArgs(msg,"Permissions",params,undefined,true); 
			copyArgs(msg,"RowLevelPermissionDataSet",params,undefined,true); 
			copyArgs(msg,"RowLevelPermissionTagConfiguration",params,undefined,true); 
			copyArgs(msg,"ColumnLevelPermissionRules",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"DataSetUsageConfiguration",params,undefined,true); 
			

			svc.createDataSet(params,cb);
		}

		
		service.CreateDataSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DataSourceId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DataSourceId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"DataSourceParameters",params,undefined,true); 
			copyArgs(n,"Credentials",params,undefined,true); 
			copyArgs(n,"Permissions",params,undefined,true); 
			copyArgs(n,"VpcConnectionProperties",params,undefined,true); 
			copyArgs(n,"SslProperties",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"DataSourceId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"DataSourceParameters",params,undefined,true); 
			copyArgs(msg,"Credentials",params,undefined,true); 
			copyArgs(msg,"Permissions",params,undefined,true); 
			copyArgs(msg,"VpcConnectionProperties",params,undefined,true); 
			copyArgs(msg,"SslProperties",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createDataSource(params,cb);
		}

		
		service.CreateFolder=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"FolderId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"FolderId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"FolderType",params,undefined,false); 
			copyArgs(n,"ParentFolderArn",params,undefined,false); 
			copyArgs(n,"Permissions",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"FolderId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"FolderType",params,undefined,false); 
			copyArgs(msg,"ParentFolderArn",params,undefined,false); 
			copyArgs(msg,"Permissions",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createFolder(params,cb);
		}

		
		service.CreateFolderMembership=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"FolderId",params,undefined,false); 
			copyArgs(n,"MemberId",params,undefined,false); 
			copyArgs(n,"MemberType",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"FolderId",params,undefined,false); 
			copyArgs(n,"MemberId",params,undefined,false); 
			copyArgs(n,"MemberType",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"FolderId",params,undefined,false); 
			copyArgs(msg,"MemberId",params,undefined,false); 
			copyArgs(msg,"MemberType",params,undefined,false); 
			

			svc.createFolderMembership(params,cb);
		}

		
		service.CreateGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			

			svc.createGroup(params,cb);
		}

		
		service.CreateGroupMembership=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MemberName",params,undefined,false); 
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(n,"MemberName",params,undefined,false); 
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(msg,"MemberName",params,undefined,false); 
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			

			svc.createGroupMembership(params,cb);
		}

		
		service.CreateIAMPolicyAssignment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"AssignmentName",params,undefined,false); 
			copyArgs(n,"AssignmentStatus",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"AssignmentName",params,undefined,false); 
			copyArgs(n,"AssignmentStatus",params,undefined,false); 
			copyArgs(n,"PolicyArn",params,undefined,false); 
			copyArgs(n,"Identities",params,undefined,true); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"AssignmentName",params,undefined,false); 
			copyArgs(msg,"AssignmentStatus",params,undefined,false); 
			copyArgs(msg,"PolicyArn",params,undefined,false); 
			copyArgs(msg,"Identities",params,undefined,true); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			

			svc.createIAMPolicyAssignment(params,cb);
		}

		
		service.CreateIngestion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DataSetId",params,undefined,false); 
			copyArgs(n,"IngestionId",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			
			copyArgs(n,"DataSetId",params,undefined,false); 
			copyArgs(n,"IngestionId",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			
			copyArgs(msg,"DataSetId",params,undefined,false); 
			copyArgs(msg,"IngestionId",params,undefined,false); 
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			

			svc.createIngestion(params,cb);
		}

		
		service.CreateNamespace=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			copyArgs(n,"IdentityStore",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			copyArgs(n,"IdentityStore",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			copyArgs(msg,"IdentityStore",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createNamespace(params,cb);
		}

		
		service.CreateTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"TemplateId",params,undefined,false); 
			copyArgs(n,"SourceEntity",params,undefined,true); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"TemplateId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Permissions",params,undefined,true); 
			copyArgs(n,"SourceEntity",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"VersionDescription",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"TemplateId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Permissions",params,undefined,true); 
			copyArgs(msg,"SourceEntity",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"VersionDescription",params,undefined,false); 
			

			svc.createTemplate(params,cb);
		}

		
		service.CreateTemplateAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"TemplateId",params,undefined,false); 
			copyArgs(n,"AliasName",params,undefined,false); 
			copyArgs(n,"TemplateVersionNumber",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"TemplateId",params,undefined,false); 
			copyArgs(n,"AliasName",params,undefined,false); 
			copyArgs(n,"TemplateVersionNumber",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"TemplateId",params,undefined,false); 
			copyArgs(msg,"AliasName",params,undefined,false); 
			copyArgs(msg,"TemplateVersionNumber",params,undefined,false); 
			

			svc.createTemplateAlias(params,cb);
		}

		
		service.CreateTheme=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"ThemeId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"BaseThemeId",params,undefined,false); 
			copyArgs(n,"Configuration",params,undefined,true); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"ThemeId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"BaseThemeId",params,undefined,false); 
			copyArgs(n,"VersionDescription",params,undefined,false); 
			copyArgs(n,"Configuration",params,undefined,true); 
			copyArgs(n,"Permissions",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"ThemeId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"BaseThemeId",params,undefined,false); 
			copyArgs(msg,"VersionDescription",params,undefined,false); 
			copyArgs(msg,"Configuration",params,undefined,true); 
			copyArgs(msg,"Permissions",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createTheme(params,cb);
		}

		
		service.CreateThemeAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"ThemeId",params,undefined,false); 
			copyArgs(n,"AliasName",params,undefined,false); 
			copyArgs(n,"ThemeVersionNumber",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"ThemeId",params,undefined,false); 
			copyArgs(n,"AliasName",params,undefined,false); 
			copyArgs(n,"ThemeVersionNumber",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"ThemeId",params,undefined,false); 
			copyArgs(msg,"AliasName",params,undefined,false); 
			copyArgs(msg,"ThemeVersionNumber",params,undefined,false); 
			

			svc.createThemeAlias(params,cb);
		}

		
		service.DeleteAccountCustomization=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			

			svc.deleteAccountCustomization(params,cb);
		}

		
		service.DeleteAnalysis=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"AnalysisId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"AnalysisId",params,undefined,false); 
			copyArgs(n,"RecoveryWindowInDays",params,undefined,false); 
			copyArgs(n,"ForceDeleteWithoutRecovery",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"AnalysisId",params,undefined,false); 
			copyArgs(msg,"RecoveryWindowInDays",params,undefined,false); 
			copyArgs(msg,"ForceDeleteWithoutRecovery",params,undefined,false); 
			

			svc.deleteAnalysis(params,cb);
		}

		
		service.DeleteDashboard=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DashboardId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DashboardId",params,undefined,false); 
			copyArgs(n,"VersionNumber",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"DashboardId",params,undefined,false); 
			copyArgs(msg,"VersionNumber",params,undefined,false); 
			

			svc.deleteDashboard(params,cb);
		}

		
		service.DeleteDataSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DataSetId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DataSetId",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"DataSetId",params,undefined,false); 
			

			svc.deleteDataSet(params,cb);
		}

		
		service.DeleteDataSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DataSourceId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DataSourceId",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"DataSourceId",params,undefined,false); 
			

			svc.deleteDataSource(params,cb);
		}

		
		service.DeleteFolder=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"FolderId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"FolderId",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"FolderId",params,undefined,false); 
			

			svc.deleteFolder(params,cb);
		}

		
		service.DeleteFolderMembership=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"FolderId",params,undefined,false); 
			copyArgs(n,"MemberId",params,undefined,false); 
			copyArgs(n,"MemberType",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"FolderId",params,undefined,false); 
			copyArgs(n,"MemberId",params,undefined,false); 
			copyArgs(n,"MemberType",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"FolderId",params,undefined,false); 
			copyArgs(msg,"MemberId",params,undefined,false); 
			copyArgs(msg,"MemberType",params,undefined,false); 
			

			svc.deleteFolderMembership(params,cb);
		}

		
		service.DeleteGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			

			svc.deleteGroup(params,cb);
		}

		
		service.DeleteGroupMembership=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MemberName",params,undefined,false); 
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(n,"MemberName",params,undefined,false); 
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(msg,"MemberName",params,undefined,false); 
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			

			svc.deleteGroupMembership(params,cb);
		}

		
		service.DeleteIAMPolicyAssignment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"AssignmentName",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"AssignmentName",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"AssignmentName",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			

			svc.deleteIAMPolicyAssignment(params,cb);
		}

		
		service.DeleteNamespace=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			

			svc.deleteNamespace(params,cb);
		}

		
		service.DeleteTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"TemplateId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"TemplateId",params,undefined,false); 
			copyArgs(n,"VersionNumber",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"TemplateId",params,undefined,false); 
			copyArgs(msg,"VersionNumber",params,undefined,false); 
			

			svc.deleteTemplate(params,cb);
		}

		
		service.DeleteTemplateAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"TemplateId",params,undefined,false); 
			copyArgs(n,"AliasName",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"TemplateId",params,undefined,false); 
			copyArgs(n,"AliasName",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"TemplateId",params,undefined,false); 
			copyArgs(msg,"AliasName",params,undefined,false); 
			

			svc.deleteTemplateAlias(params,cb);
		}

		
		service.DeleteTheme=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"ThemeId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"ThemeId",params,undefined,false); 
			copyArgs(n,"VersionNumber",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"ThemeId",params,undefined,false); 
			copyArgs(msg,"VersionNumber",params,undefined,false); 
			

			svc.deleteTheme(params,cb);
		}

		
		service.DeleteThemeAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"ThemeId",params,undefined,false); 
			copyArgs(n,"AliasName",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"ThemeId",params,undefined,false); 
			copyArgs(n,"AliasName",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"ThemeId",params,undefined,false); 
			copyArgs(msg,"AliasName",params,undefined,false); 
			

			svc.deleteThemeAlias(params,cb);
		}

		
		service.DeleteUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			

			svc.deleteUser(params,cb);
		}

		
		service.DeleteUserByPrincipalId=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PrincipalId",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(n,"PrincipalId",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(msg,"PrincipalId",params,undefined,false); 
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			

			svc.deleteUserByPrincipalId(params,cb);
		}

		
		service.DescribeAccountCustomization=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			copyArgs(n,"Resolved",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			copyArgs(msg,"Resolved",params,undefined,false); 
			

			svc.describeAccountCustomization(params,cb);
		}

		
		service.DescribeAccountSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			

			svc.describeAccountSettings(params,cb);
		}

		
		service.DescribeAnalysis=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"AnalysisId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"AnalysisId",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"AnalysisId",params,undefined,false); 
			

			svc.describeAnalysis(params,cb);
		}

		
		service.DescribeAnalysisPermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"AnalysisId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"AnalysisId",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"AnalysisId",params,undefined,false); 
			

			svc.describeAnalysisPermissions(params,cb);
		}

		
		service.DescribeDashboard=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DashboardId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DashboardId",params,undefined,false); 
			copyArgs(n,"VersionNumber",params,undefined,false); 
			copyArgs(n,"AliasName",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"DashboardId",params,undefined,false); 
			copyArgs(msg,"VersionNumber",params,undefined,false); 
			copyArgs(msg,"AliasName",params,undefined,false); 
			

			svc.describeDashboard(params,cb);
		}

		
		service.DescribeDashboardPermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DashboardId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DashboardId",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"DashboardId",params,undefined,false); 
			

			svc.describeDashboardPermissions(params,cb);
		}

		
		service.DescribeDataSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DataSetId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DataSetId",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"DataSetId",params,undefined,false); 
			

			svc.describeDataSet(params,cb);
		}

		
		service.DescribeDataSetPermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DataSetId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DataSetId",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"DataSetId",params,undefined,false); 
			

			svc.describeDataSetPermissions(params,cb);
		}

		
		service.DescribeDataSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DataSourceId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DataSourceId",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"DataSourceId",params,undefined,false); 
			

			svc.describeDataSource(params,cb);
		}

		
		service.DescribeDataSourcePermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DataSourceId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DataSourceId",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"DataSourceId",params,undefined,false); 
			

			svc.describeDataSourcePermissions(params,cb);
		}

		
		service.DescribeFolder=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"FolderId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"FolderId",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"FolderId",params,undefined,false); 
			

			svc.describeFolder(params,cb);
		}

		
		service.DescribeFolderPermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"FolderId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"FolderId",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"FolderId",params,undefined,false); 
			

			svc.describeFolderPermissions(params,cb);
		}

		
		service.DescribeFolderResolvedPermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"FolderId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"FolderId",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"FolderId",params,undefined,false); 
			

			svc.describeFolderResolvedPermissions(params,cb);
		}

		
		service.DescribeGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			

			svc.describeGroup(params,cb);
		}

		
		service.DescribeIAMPolicyAssignment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"AssignmentName",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"AssignmentName",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"AssignmentName",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			

			svc.describeIAMPolicyAssignment(params,cb);
		}

		
		service.DescribeIngestion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DataSetId",params,undefined,false); 
			copyArgs(n,"IngestionId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DataSetId",params,undefined,false); 
			copyArgs(n,"IngestionId",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"DataSetId",params,undefined,false); 
			copyArgs(msg,"IngestionId",params,undefined,false); 
			

			svc.describeIngestion(params,cb);
		}

		
		service.DescribeNamespace=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			

			svc.describeNamespace(params,cb);
		}

		
		service.DescribeTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"TemplateId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"TemplateId",params,undefined,false); 
			copyArgs(n,"VersionNumber",params,undefined,false); 
			copyArgs(n,"AliasName",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"TemplateId",params,undefined,false); 
			copyArgs(msg,"VersionNumber",params,undefined,false); 
			copyArgs(msg,"AliasName",params,undefined,false); 
			

			svc.describeTemplate(params,cb);
		}

		
		service.DescribeTemplateAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"TemplateId",params,undefined,false); 
			copyArgs(n,"AliasName",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"TemplateId",params,undefined,false); 
			copyArgs(n,"AliasName",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"TemplateId",params,undefined,false); 
			copyArgs(msg,"AliasName",params,undefined,false); 
			

			svc.describeTemplateAlias(params,cb);
		}

		
		service.DescribeTemplatePermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"TemplateId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"TemplateId",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"TemplateId",params,undefined,false); 
			

			svc.describeTemplatePermissions(params,cb);
		}

		
		service.DescribeTheme=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"ThemeId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"ThemeId",params,undefined,false); 
			copyArgs(n,"VersionNumber",params,undefined,false); 
			copyArgs(n,"AliasName",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"ThemeId",params,undefined,false); 
			copyArgs(msg,"VersionNumber",params,undefined,false); 
			copyArgs(msg,"AliasName",params,undefined,false); 
			

			svc.describeTheme(params,cb);
		}

		
		service.DescribeThemeAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"ThemeId",params,undefined,false); 
			copyArgs(n,"AliasName",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"ThemeId",params,undefined,false); 
			copyArgs(n,"AliasName",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"ThemeId",params,undefined,false); 
			copyArgs(msg,"AliasName",params,undefined,false); 
			

			svc.describeThemeAlias(params,cb);
		}

		
		service.DescribeThemePermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"ThemeId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"ThemeId",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"ThemeId",params,undefined,false); 
			

			svc.describeThemePermissions(params,cb);
		}

		
		service.DescribeUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			

			svc.describeUser(params,cb);
		}

		
		service.GenerateEmbedUrlForAnonymousUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			copyArgs(n,"AuthorizedResourceArns",params,undefined,false); 
			copyArgs(n,"ExperienceConfiguration",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"SessionLifetimeInMinutes",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			copyArgs(n,"SessionTags",params,undefined,false); 
			copyArgs(n,"AuthorizedResourceArns",params,undefined,false); 
			copyArgs(n,"ExperienceConfiguration",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"SessionLifetimeInMinutes",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			copyArgs(msg,"SessionTags",params,undefined,false); 
			copyArgs(msg,"AuthorizedResourceArns",params,undefined,false); 
			copyArgs(msg,"ExperienceConfiguration",params,undefined,false); 
			

			svc.generateEmbedUrlForAnonymousUser(params,cb);
		}

		
		service.GenerateEmbedUrlForRegisteredUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"UserArn",params,undefined,false); 
			copyArgs(n,"ExperienceConfiguration",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"SessionLifetimeInMinutes",params,undefined,false); 
			copyArgs(n,"UserArn",params,undefined,false); 
			copyArgs(n,"ExperienceConfiguration",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"SessionLifetimeInMinutes",params,undefined,false); 
			copyArgs(msg,"UserArn",params,undefined,false); 
			copyArgs(msg,"ExperienceConfiguration",params,undefined,false); 
			

			svc.generateEmbedUrlForRegisteredUser(params,cb);
		}

		
		service.GetDashboardEmbedUrl=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DashboardId",params,undefined,false); 
			copyArgs(n,"IdentityType",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DashboardId",params,undefined,false); 
			copyArgs(n,"IdentityType",params,undefined,false); 
			copyArgs(n,"SessionLifetimeInMinutes",params,undefined,false); 
			copyArgs(n,"UndoRedoDisabled",params,undefined,false); 
			copyArgs(n,"ResetDisabled",params,undefined,false); 
			copyArgs(n,"StatePersistenceEnabled",params,undefined,false); 
			copyArgs(n,"UserArn",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			copyArgs(n,"AdditionalDashboardIds",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"DashboardId",params,undefined,false); 
			copyArgs(msg,"IdentityType",params,undefined,false); 
			copyArgs(msg,"SessionLifetimeInMinutes",params,undefined,false); 
			copyArgs(msg,"UndoRedoDisabled",params,undefined,false); 
			copyArgs(msg,"ResetDisabled",params,undefined,false); 
			copyArgs(msg,"StatePersistenceEnabled",params,undefined,false); 
			copyArgs(msg,"UserArn",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			copyArgs(msg,"AdditionalDashboardIds",params,undefined,false); 
			

			svc.getDashboardEmbedUrl(params,cb);
		}

		
		service.GetSessionEmbedUrl=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"EntryPoint",params,undefined,false); 
			copyArgs(n,"SessionLifetimeInMinutes",params,undefined,false); 
			copyArgs(n,"UserArn",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"EntryPoint",params,undefined,false); 
			copyArgs(msg,"SessionLifetimeInMinutes",params,undefined,false); 
			copyArgs(msg,"UserArn",params,undefined,false); 
			

			svc.getSessionEmbedUrl(params,cb);
		}

		
		service.ListAnalyses=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listAnalyses(params,cb);
		}

		
		service.ListDashboardVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DashboardId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DashboardId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"DashboardId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listDashboardVersions(params,cb);
		}

		
		service.ListDashboards=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listDashboards(params,cb);
		}

		
		service.ListDataSets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listDataSets(params,cb);
		}

		
		service.ListDataSources=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listDataSources(params,cb);
		}

		
		service.ListFolderMembers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"FolderId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"FolderId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"FolderId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listFolderMembers(params,cb);
		}

		
		service.ListFolders=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listFolders(params,cb);
		}

		
		service.ListGroupMemberships=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			

			svc.listGroupMemberships(params,cb);
		}

		
		service.ListGroups=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			

			svc.listGroups(params,cb);
		}

		
		service.ListIAMPolicyAssignments=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"AssignmentStatus",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"AssignmentStatus",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listIAMPolicyAssignments(params,cb);
		}

		
		service.ListIAMPolicyAssignmentsForUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			

			svc.listIAMPolicyAssignmentsForUser(params,cb);
		}

		
		service.ListIngestions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DataSetId",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			
			copyArgs(n,"DataSetId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"DataSetId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listIngestions(params,cb);
		}

		
		service.ListNamespaces=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listNamespaces(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListTemplateAliases=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"TemplateId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"TemplateId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"TemplateId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listTemplateAliases(params,cb);
		}

		
		service.ListTemplateVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"TemplateId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"TemplateId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"TemplateId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listTemplateVersions(params,cb);
		}

		
		service.ListTemplates=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listTemplates(params,cb);
		}

		
		service.ListThemeAliases=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"ThemeId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"ThemeId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"ThemeId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listThemeAliases(params,cb);
		}

		
		service.ListThemeVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"ThemeId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"ThemeId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"ThemeId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listThemeVersions(params,cb);
		}

		
		service.ListThemes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			

			svc.listThemes(params,cb);
		}

		
		service.ListUserGroups=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listUserGroups(params,cb);
		}

		
		service.ListUsers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			

			svc.listUsers(params,cb);
		}

		
		service.RegisterUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityType",params,undefined,false); 
			copyArgs(n,"Email",params,undefined,false); 
			copyArgs(n,"UserRole",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(n,"IdentityType",params,undefined,false); 
			copyArgs(n,"Email",params,undefined,false); 
			copyArgs(n,"UserRole",params,undefined,false); 
			copyArgs(n,"IamArn",params,undefined,false); 
			copyArgs(n,"SessionName",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"CustomPermissionsName",params,undefined,false); 
			copyArgs(n,"ExternalLoginFederationProviderType",params,undefined,false); 
			copyArgs(n,"CustomFederationProviderUrl",params,undefined,false); 
			copyArgs(n,"ExternalLoginId",params,undefined,false); 
			
			copyArgs(msg,"IdentityType",params,undefined,false); 
			copyArgs(msg,"Email",params,undefined,false); 
			copyArgs(msg,"UserRole",params,undefined,false); 
			copyArgs(msg,"IamArn",params,undefined,false); 
			copyArgs(msg,"SessionName",params,undefined,false); 
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"CustomPermissionsName",params,undefined,false); 
			copyArgs(msg,"ExternalLoginFederationProviderType",params,undefined,false); 
			copyArgs(msg,"CustomFederationProviderUrl",params,undefined,false); 
			copyArgs(msg,"ExternalLoginId",params,undefined,false); 
			

			svc.registerUser(params,cb);
		}

		
		service.RestoreAnalysis=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"AnalysisId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"AnalysisId",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"AnalysisId",params,undefined,false); 
			

			svc.restoreAnalysis(params,cb);
		}

		
		service.SearchAnalyses=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.searchAnalyses(params,cb);
		}

		
		service.SearchDashboards=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.searchDashboards(params,cb);
		}

		
		service.SearchFolders=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.searchFolders(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateAccountCustomization=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"AccountCustomization",params,undefined,true); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			copyArgs(n,"AccountCustomization",params,undefined,true); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			copyArgs(msg,"AccountCustomization",params,undefined,true); 
			

			svc.updateAccountCustomization(params,cb);
		}

		
		service.UpdateAccountSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DefaultNamespace",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DefaultNamespace",params,undefined,false); 
			copyArgs(n,"NotificationEmail",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"DefaultNamespace",params,undefined,false); 
			copyArgs(msg,"NotificationEmail",params,undefined,false); 
			

			svc.updateAccountSettings(params,cb);
		}

		
		service.UpdateAnalysis=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"AnalysisId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"SourceEntity",params,undefined,true); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"AnalysisId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			copyArgs(n,"SourceEntity",params,undefined,true); 
			copyArgs(n,"ThemeArn",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"AnalysisId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			copyArgs(msg,"SourceEntity",params,undefined,true); 
			copyArgs(msg,"ThemeArn",params,undefined,false); 
			

			svc.updateAnalysis(params,cb);
		}

		
		service.UpdateAnalysisPermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"AnalysisId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"AnalysisId",params,undefined,false); 
			copyArgs(n,"GrantPermissions",params,undefined,true); 
			copyArgs(n,"RevokePermissions",params,undefined,true); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"AnalysisId",params,undefined,false); 
			copyArgs(msg,"GrantPermissions",params,undefined,true); 
			copyArgs(msg,"RevokePermissions",params,undefined,true); 
			

			svc.updateAnalysisPermissions(params,cb);
		}

		
		service.UpdateDashboard=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DashboardId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"SourceEntity",params,undefined,true); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DashboardId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"SourceEntity",params,undefined,true); 
			copyArgs(n,"Parameters",params,undefined,true); 
			copyArgs(n,"VersionDescription",params,undefined,false); 
			copyArgs(n,"DashboardPublishOptions",params,undefined,true); 
			copyArgs(n,"ThemeArn",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"DashboardId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"SourceEntity",params,undefined,true); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			copyArgs(msg,"VersionDescription",params,undefined,false); 
			copyArgs(msg,"DashboardPublishOptions",params,undefined,true); 
			copyArgs(msg,"ThemeArn",params,undefined,false); 
			

			svc.updateDashboard(params,cb);
		}

		
		service.UpdateDashboardPermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DashboardId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DashboardId",params,undefined,false); 
			copyArgs(n,"GrantPermissions",params,undefined,true); 
			copyArgs(n,"RevokePermissions",params,undefined,true); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"DashboardId",params,undefined,false); 
			copyArgs(msg,"GrantPermissions",params,undefined,true); 
			copyArgs(msg,"RevokePermissions",params,undefined,true); 
			

			svc.updateDashboardPermissions(params,cb);
		}

		
		service.UpdateDashboardPublishedVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DashboardId",params,undefined,false); 
			copyArgs(n,"VersionNumber",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DashboardId",params,undefined,false); 
			copyArgs(n,"VersionNumber",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"DashboardId",params,undefined,false); 
			copyArgs(msg,"VersionNumber",params,undefined,false); 
			

			svc.updateDashboardPublishedVersion(params,cb);
		}

		
		service.UpdateDataSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DataSetId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"PhysicalTableMap",params,undefined,true); 
			copyArgs(n,"ImportMode",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DataSetId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"PhysicalTableMap",params,undefined,true); 
			copyArgs(n,"LogicalTableMap",params,undefined,true); 
			copyArgs(n,"ImportMode",params,undefined,false); 
			copyArgs(n,"ColumnGroups",params,undefined,true); 
			copyArgs(n,"FieldFolders",params,undefined,true); 
			copyArgs(n,"RowLevelPermissionDataSet",params,undefined,true); 
			copyArgs(n,"RowLevelPermissionTagConfiguration",params,undefined,true); 
			copyArgs(n,"ColumnLevelPermissionRules",params,undefined,true); 
			copyArgs(n,"DataSetUsageConfiguration",params,undefined,true); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"DataSetId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"PhysicalTableMap",params,undefined,true); 
			copyArgs(msg,"LogicalTableMap",params,undefined,true); 
			copyArgs(msg,"ImportMode",params,undefined,false); 
			copyArgs(msg,"ColumnGroups",params,undefined,true); 
			copyArgs(msg,"FieldFolders",params,undefined,true); 
			copyArgs(msg,"RowLevelPermissionDataSet",params,undefined,true); 
			copyArgs(msg,"RowLevelPermissionTagConfiguration",params,undefined,true); 
			copyArgs(msg,"ColumnLevelPermissionRules",params,undefined,true); 
			copyArgs(msg,"DataSetUsageConfiguration",params,undefined,true); 
			

			svc.updateDataSet(params,cb);
		}

		
		service.UpdateDataSetPermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DataSetId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DataSetId",params,undefined,false); 
			copyArgs(n,"GrantPermissions",params,undefined,true); 
			copyArgs(n,"RevokePermissions",params,undefined,true); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"DataSetId",params,undefined,false); 
			copyArgs(msg,"GrantPermissions",params,undefined,true); 
			copyArgs(msg,"RevokePermissions",params,undefined,true); 
			

			svc.updateDataSetPermissions(params,cb);
		}

		
		service.UpdateDataSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DataSourceId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DataSourceId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"DataSourceParameters",params,undefined,true); 
			copyArgs(n,"Credentials",params,undefined,true); 
			copyArgs(n,"VpcConnectionProperties",params,undefined,true); 
			copyArgs(n,"SslProperties",params,undefined,true); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"DataSourceId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"DataSourceParameters",params,undefined,true); 
			copyArgs(msg,"Credentials",params,undefined,true); 
			copyArgs(msg,"VpcConnectionProperties",params,undefined,true); 
			copyArgs(msg,"SslProperties",params,undefined,true); 
			

			svc.updateDataSource(params,cb);
		}

		
		service.UpdateDataSourcePermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DataSourceId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"DataSourceId",params,undefined,false); 
			copyArgs(n,"GrantPermissions",params,undefined,true); 
			copyArgs(n,"RevokePermissions",params,undefined,true); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"DataSourceId",params,undefined,false); 
			copyArgs(msg,"GrantPermissions",params,undefined,true); 
			copyArgs(msg,"RevokePermissions",params,undefined,true); 
			

			svc.updateDataSourcePermissions(params,cb);
		}

		
		service.UpdateFolder=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"FolderId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"FolderId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"FolderId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.updateFolder(params,cb);
		}

		
		service.UpdateFolderPermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"FolderId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"FolderId",params,undefined,false); 
			copyArgs(n,"GrantPermissions",params,undefined,true); 
			copyArgs(n,"RevokePermissions",params,undefined,true); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"FolderId",params,undefined,false); 
			copyArgs(msg,"GrantPermissions",params,undefined,true); 
			copyArgs(msg,"RevokePermissions",params,undefined,true); 
			

			svc.updateFolderPermissions(params,cb);
		}

		
		service.UpdateGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(n,"GroupName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(msg,"GroupName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			

			svc.updateGroup(params,cb);
		}

		
		service.UpdateIAMPolicyAssignment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"AssignmentName",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"AssignmentName",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			copyArgs(n,"AssignmentStatus",params,undefined,false); 
			copyArgs(n,"PolicyArn",params,undefined,false); 
			copyArgs(n,"Identities",params,undefined,true); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"AssignmentName",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			copyArgs(msg,"AssignmentStatus",params,undefined,false); 
			copyArgs(msg,"PolicyArn",params,undefined,false); 
			copyArgs(msg,"Identities",params,undefined,true); 
			

			svc.updateIAMPolicyAssignment(params,cb);
		}

		
		service.UpdateTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"TemplateId",params,undefined,false); 
			copyArgs(n,"SourceEntity",params,undefined,true); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"TemplateId",params,undefined,false); 
			copyArgs(n,"SourceEntity",params,undefined,true); 
			copyArgs(n,"VersionDescription",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"TemplateId",params,undefined,false); 
			copyArgs(msg,"SourceEntity",params,undefined,true); 
			copyArgs(msg,"VersionDescription",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.updateTemplate(params,cb);
		}

		
		service.UpdateTemplateAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"TemplateId",params,undefined,false); 
			copyArgs(n,"AliasName",params,undefined,false); 
			copyArgs(n,"TemplateVersionNumber",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"TemplateId",params,undefined,false); 
			copyArgs(n,"AliasName",params,undefined,false); 
			copyArgs(n,"TemplateVersionNumber",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"TemplateId",params,undefined,false); 
			copyArgs(msg,"AliasName",params,undefined,false); 
			copyArgs(msg,"TemplateVersionNumber",params,undefined,false); 
			

			svc.updateTemplateAlias(params,cb);
		}

		
		service.UpdateTemplatePermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"TemplateId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"TemplateId",params,undefined,false); 
			copyArgs(n,"GrantPermissions",params,undefined,true); 
			copyArgs(n,"RevokePermissions",params,undefined,true); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"TemplateId",params,undefined,false); 
			copyArgs(msg,"GrantPermissions",params,undefined,true); 
			copyArgs(msg,"RevokePermissions",params,undefined,true); 
			

			svc.updateTemplatePermissions(params,cb);
		}

		
		service.UpdateTheme=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"ThemeId",params,undefined,false); 
			copyArgs(n,"BaseThemeId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"ThemeId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"BaseThemeId",params,undefined,false); 
			copyArgs(n,"VersionDescription",params,undefined,false); 
			copyArgs(n,"Configuration",params,undefined,true); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"ThemeId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"BaseThemeId",params,undefined,false); 
			copyArgs(msg,"VersionDescription",params,undefined,false); 
			copyArgs(msg,"Configuration",params,undefined,true); 
			

			svc.updateTheme(params,cb);
		}

		
		service.UpdateThemeAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"ThemeId",params,undefined,false); 
			copyArgs(n,"AliasName",params,undefined,false); 
			copyArgs(n,"ThemeVersionNumber",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"ThemeId",params,undefined,false); 
			copyArgs(n,"AliasName",params,undefined,false); 
			copyArgs(n,"ThemeVersionNumber",params,undefined,false); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"ThemeId",params,undefined,false); 
			copyArgs(msg,"AliasName",params,undefined,false); 
			copyArgs(msg,"ThemeVersionNumber",params,undefined,false); 
			

			svc.updateThemeAlias(params,cb);
		}

		
		service.UpdateThemePermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"ThemeId",params,undefined,false); 
			
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"ThemeId",params,undefined,false); 
			copyArgs(n,"GrantPermissions",params,undefined,true); 
			copyArgs(n,"RevokePermissions",params,undefined,true); 
			
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"ThemeId",params,undefined,false); 
			copyArgs(msg,"GrantPermissions",params,undefined,true); 
			copyArgs(msg,"RevokePermissions",params,undefined,true); 
			

			svc.updateThemePermissions(params,cb);
		}

		
		service.UpdateUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			copyArgs(n,"Email",params,undefined,false); 
			copyArgs(n,"Role",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"AwsAccountId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			copyArgs(n,"Email",params,undefined,false); 
			copyArgs(n,"Role",params,undefined,false); 
			copyArgs(n,"CustomPermissionsName",params,undefined,false); 
			copyArgs(n,"UnapplyCustomPermissions",params,undefined,false); 
			copyArgs(n,"ExternalLoginFederationProviderType",params,undefined,false); 
			copyArgs(n,"CustomFederationProviderUrl",params,undefined,false); 
			copyArgs(n,"ExternalLoginId",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"AwsAccountId",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			copyArgs(msg,"Email",params,undefined,false); 
			copyArgs(msg,"Role",params,undefined,false); 
			copyArgs(msg,"CustomPermissionsName",params,undefined,false); 
			copyArgs(msg,"UnapplyCustomPermissions",params,undefined,false); 
			copyArgs(msg,"ExternalLoginFederationProviderType",params,undefined,false); 
			copyArgs(msg,"CustomFederationProviderUrl",params,undefined,false); 
			copyArgs(msg,"ExternalLoginId",params,undefined,false); 
			

			svc.updateUser(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS QuickSight", AmazonAPINode);

};
