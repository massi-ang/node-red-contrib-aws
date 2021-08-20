
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

		var awsService = new AWS.QuickSight( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.QuickSight(msg.AWSConfig) : awsService;

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

		
		service.CancelIngestion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"DataSetId",params,undefined,false); 
			copyArg(n,"IngestionId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"DataSetId",params,undefined,false); 
			copyArg(msg,"IngestionId",params,undefined,false); 
			

			svc.cancelIngestion(params,cb);
		}

		
		service.CreateAccountCustomization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"AccountCustomization",params,undefined,true); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			copyArg(msg,"AccountCustomization",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createAccountCustomization(params,cb);
		}

		
		service.CreateAnalysis=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"AnalysisId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"SourceEntity",params,undefined,true); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"AnalysisId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,true); 
			copyArg(msg,"Permissions",params,undefined,true); 
			copyArg(msg,"SourceEntity",params,undefined,true); 
			copyArg(msg,"ThemeArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createAnalysis(params,cb);
		}

		
		service.CreateDashboard=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"DashboardId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"SourceEntity",params,undefined,true); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"DashboardId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,true); 
			copyArg(msg,"Permissions",params,undefined,true); 
			copyArg(msg,"SourceEntity",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"VersionDescription",params,undefined,false); 
			copyArg(msg,"DashboardPublishOptions",params,undefined,true); 
			copyArg(msg,"ThemeArn",params,undefined,false); 
			

			svc.createDashboard(params,cb);
		}

		
		service.CreateDataSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"DataSetId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"PhysicalTableMap",params,undefined,true); 
			copyArg(n,"ImportMode",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"DataSetId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"PhysicalTableMap",params,undefined,true); 
			copyArg(msg,"LogicalTableMap",params,undefined,true); 
			copyArg(msg,"ImportMode",params,undefined,false); 
			copyArg(msg,"ColumnGroups",params,undefined,true); 
			copyArg(msg,"FieldFolders",params,undefined,true); 
			copyArg(msg,"Permissions",params,undefined,true); 
			copyArg(msg,"RowLevelPermissionDataSet",params,undefined,true); 
			copyArg(msg,"RowLevelPermissionTagConfiguration",params,undefined,true); 
			copyArg(msg,"ColumnLevelPermissionRules",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createDataSet(params,cb);
		}

		
		service.CreateDataSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"DataSourceId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Type",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"DataSourceId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"DataSourceParameters",params,undefined,true); 
			copyArg(msg,"Credentials",params,undefined,true); 
			copyArg(msg,"Permissions",params,undefined,true); 
			copyArg(msg,"VpcConnectionProperties",params,undefined,true); 
			copyArg(msg,"SslProperties",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createDataSource(params,cb);
		}

		
		service.CreateFolder=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"FolderId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"FolderId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"FolderType",params,undefined,false); 
			copyArg(msg,"ParentFolderArn",params,undefined,false); 
			copyArg(msg,"Permissions",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createFolder(params,cb);
		}

		
		service.CreateFolderMembership=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"FolderId",params,undefined,false); 
			copyArg(n,"MemberId",params,undefined,false); 
			copyArg(n,"MemberType",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"FolderId",params,undefined,false); 
			copyArg(msg,"MemberId",params,undefined,false); 
			copyArg(msg,"MemberType",params,undefined,false); 
			

			svc.createFolderMembership(params,cb);
		}

		
		service.CreateGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupName",params,undefined,false); 
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			

			svc.createGroup(params,cb);
		}

		
		service.CreateGroupMembership=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MemberName",params,undefined,false); 
			copyArg(n,"GroupName",params,undefined,false); 
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			
			copyArg(msg,"MemberName",params,undefined,false); 
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			

			svc.createGroupMembership(params,cb);
		}

		
		service.CreateIAMPolicyAssignment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"AssignmentName",params,undefined,false); 
			copyArg(n,"AssignmentStatus",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"AssignmentName",params,undefined,false); 
			copyArg(msg,"AssignmentStatus",params,undefined,false); 
			copyArg(msg,"PolicyArn",params,undefined,false); 
			copyArg(msg,"Identities",params,undefined,true); 
			copyArg(msg,"Namespace",params,undefined,false); 
			

			svc.createIAMPolicyAssignment(params,cb);
		}

		
		service.CreateIngestion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DataSetId",params,undefined,false); 
			copyArg(n,"IngestionId",params,undefined,false); 
			copyArg(n,"AwsAccountId",params,undefined,false); 
			
			copyArg(msg,"DataSetId",params,undefined,false); 
			copyArg(msg,"IngestionId",params,undefined,false); 
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			

			svc.createIngestion(params,cb);
		}

		
		service.CreateNamespace=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			copyArg(n,"IdentityStore",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			copyArg(msg,"IdentityStore",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createNamespace(params,cb);
		}

		
		service.CreateTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"TemplateId",params,undefined,false); 
			copyArg(n,"SourceEntity",params,undefined,true); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"TemplateId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Permissions",params,undefined,true); 
			copyArg(msg,"SourceEntity",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"VersionDescription",params,undefined,false); 
			

			svc.createTemplate(params,cb);
		}

		
		service.CreateTemplateAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"TemplateId",params,undefined,false); 
			copyArg(n,"AliasName",params,undefined,false); 
			copyArg(n,"TemplateVersionNumber",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"TemplateId",params,undefined,false); 
			copyArg(msg,"AliasName",params,undefined,false); 
			copyArg(msg,"TemplateVersionNumber",params,undefined,false); 
			

			svc.createTemplateAlias(params,cb);
		}

		
		service.CreateTheme=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"ThemeId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"BaseThemeId",params,undefined,false); 
			copyArg(n,"Configuration",params,undefined,true); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"ThemeId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"BaseThemeId",params,undefined,false); 
			copyArg(msg,"VersionDescription",params,undefined,false); 
			copyArg(msg,"Configuration",params,undefined,true); 
			copyArg(msg,"Permissions",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createTheme(params,cb);
		}

		
		service.CreateThemeAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"ThemeId",params,undefined,false); 
			copyArg(n,"AliasName",params,undefined,false); 
			copyArg(n,"ThemeVersionNumber",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"ThemeId",params,undefined,false); 
			copyArg(msg,"AliasName",params,undefined,false); 
			copyArg(msg,"ThemeVersionNumber",params,undefined,false); 
			

			svc.createThemeAlias(params,cb);
		}

		
		service.DeleteAccountCustomization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			

			svc.deleteAccountCustomization(params,cb);
		}

		
		service.DeleteAnalysis=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"AnalysisId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"AnalysisId",params,undefined,false); 
			copyArg(msg,"RecoveryWindowInDays",params,undefined,false); 
			copyArg(msg,"ForceDeleteWithoutRecovery",params,undefined,false); 
			

			svc.deleteAnalysis(params,cb);
		}

		
		service.DeleteDashboard=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"DashboardId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"DashboardId",params,undefined,false); 
			copyArg(msg,"VersionNumber",params,undefined,false); 
			

			svc.deleteDashboard(params,cb);
		}

		
		service.DeleteDataSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"DataSetId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"DataSetId",params,undefined,false); 
			

			svc.deleteDataSet(params,cb);
		}

		
		service.DeleteDataSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"DataSourceId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"DataSourceId",params,undefined,false); 
			

			svc.deleteDataSource(params,cb);
		}

		
		service.DeleteFolder=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"FolderId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"FolderId",params,undefined,false); 
			

			svc.deleteFolder(params,cb);
		}

		
		service.DeleteFolderMembership=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"FolderId",params,undefined,false); 
			copyArg(n,"MemberId",params,undefined,false); 
			copyArg(n,"MemberType",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"FolderId",params,undefined,false); 
			copyArg(msg,"MemberId",params,undefined,false); 
			copyArg(msg,"MemberType",params,undefined,false); 
			

			svc.deleteFolderMembership(params,cb);
		}

		
		service.DeleteGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupName",params,undefined,false); 
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			

			svc.deleteGroup(params,cb);
		}

		
		service.DeleteGroupMembership=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MemberName",params,undefined,false); 
			copyArg(n,"GroupName",params,undefined,false); 
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			
			copyArg(msg,"MemberName",params,undefined,false); 
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			

			svc.deleteGroupMembership(params,cb);
		}

		
		service.DeleteIAMPolicyAssignment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"AssignmentName",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"AssignmentName",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			

			svc.deleteIAMPolicyAssignment(params,cb);
		}

		
		service.DeleteNamespace=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			

			svc.deleteNamespace(params,cb);
		}

		
		service.DeleteTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"TemplateId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"TemplateId",params,undefined,false); 
			copyArg(msg,"VersionNumber",params,undefined,false); 
			

			svc.deleteTemplate(params,cb);
		}

		
		service.DeleteTemplateAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"TemplateId",params,undefined,false); 
			copyArg(n,"AliasName",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"TemplateId",params,undefined,false); 
			copyArg(msg,"AliasName",params,undefined,false); 
			

			svc.deleteTemplateAlias(params,cb);
		}

		
		service.DeleteTheme=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"ThemeId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"ThemeId",params,undefined,false); 
			copyArg(msg,"VersionNumber",params,undefined,false); 
			

			svc.deleteTheme(params,cb);
		}

		
		service.DeleteThemeAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"ThemeId",params,undefined,false); 
			copyArg(n,"AliasName",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"ThemeId",params,undefined,false); 
			copyArg(msg,"AliasName",params,undefined,false); 
			

			svc.deleteThemeAlias(params,cb);
		}

		
		service.DeleteUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			

			svc.deleteUser(params,cb);
		}

		
		service.DeleteUserByPrincipalId=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PrincipalId",params,undefined,false); 
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			
			copyArg(msg,"PrincipalId",params,undefined,false); 
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			

			svc.deleteUserByPrincipalId(params,cb);
		}

		
		service.DescribeAccountCustomization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			copyArg(msg,"Resolved",params,undefined,false); 
			

			svc.describeAccountCustomization(params,cb);
		}

		
		service.DescribeAccountSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			

			svc.describeAccountSettings(params,cb);
		}

		
		service.DescribeAnalysis=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"AnalysisId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"AnalysisId",params,undefined,false); 
			

			svc.describeAnalysis(params,cb);
		}

		
		service.DescribeAnalysisPermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"AnalysisId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"AnalysisId",params,undefined,false); 
			

			svc.describeAnalysisPermissions(params,cb);
		}

		
		service.DescribeDashboard=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"DashboardId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"DashboardId",params,undefined,false); 
			copyArg(msg,"VersionNumber",params,undefined,false); 
			copyArg(msg,"AliasName",params,undefined,false); 
			

			svc.describeDashboard(params,cb);
		}

		
		service.DescribeDashboardPermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"DashboardId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"DashboardId",params,undefined,false); 
			

			svc.describeDashboardPermissions(params,cb);
		}

		
		service.DescribeDataSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"DataSetId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"DataSetId",params,undefined,false); 
			

			svc.describeDataSet(params,cb);
		}

		
		service.DescribeDataSetPermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"DataSetId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"DataSetId",params,undefined,false); 
			

			svc.describeDataSetPermissions(params,cb);
		}

		
		service.DescribeDataSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"DataSourceId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"DataSourceId",params,undefined,false); 
			

			svc.describeDataSource(params,cb);
		}

		
		service.DescribeDataSourcePermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"DataSourceId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"DataSourceId",params,undefined,false); 
			

			svc.describeDataSourcePermissions(params,cb);
		}

		
		service.DescribeFolder=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"FolderId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"FolderId",params,undefined,false); 
			

			svc.describeFolder(params,cb);
		}

		
		service.DescribeFolderPermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"FolderId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"FolderId",params,undefined,false); 
			

			svc.describeFolderPermissions(params,cb);
		}

		
		service.DescribeFolderResolvedPermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"FolderId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"FolderId",params,undefined,false); 
			

			svc.describeFolderResolvedPermissions(params,cb);
		}

		
		service.DescribeGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupName",params,undefined,false); 
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			

			svc.describeGroup(params,cb);
		}

		
		service.DescribeIAMPolicyAssignment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"AssignmentName",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"AssignmentName",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			

			svc.describeIAMPolicyAssignment(params,cb);
		}

		
		service.DescribeIngestion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"DataSetId",params,undefined,false); 
			copyArg(n,"IngestionId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"DataSetId",params,undefined,false); 
			copyArg(msg,"IngestionId",params,undefined,false); 
			

			svc.describeIngestion(params,cb);
		}

		
		service.DescribeNamespace=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			

			svc.describeNamespace(params,cb);
		}

		
		service.DescribeTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"TemplateId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"TemplateId",params,undefined,false); 
			copyArg(msg,"VersionNumber",params,undefined,false); 
			copyArg(msg,"AliasName",params,undefined,false); 
			

			svc.describeTemplate(params,cb);
		}

		
		service.DescribeTemplateAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"TemplateId",params,undefined,false); 
			copyArg(n,"AliasName",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"TemplateId",params,undefined,false); 
			copyArg(msg,"AliasName",params,undefined,false); 
			

			svc.describeTemplateAlias(params,cb);
		}

		
		service.DescribeTemplatePermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"TemplateId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"TemplateId",params,undefined,false); 
			

			svc.describeTemplatePermissions(params,cb);
		}

		
		service.DescribeTheme=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"ThemeId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"ThemeId",params,undefined,false); 
			copyArg(msg,"VersionNumber",params,undefined,false); 
			copyArg(msg,"AliasName",params,undefined,false); 
			

			svc.describeTheme(params,cb);
		}

		
		service.DescribeThemeAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"ThemeId",params,undefined,false); 
			copyArg(n,"AliasName",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"ThemeId",params,undefined,false); 
			copyArg(msg,"AliasName",params,undefined,false); 
			

			svc.describeThemeAlias(params,cb);
		}

		
		service.DescribeThemePermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"ThemeId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"ThemeId",params,undefined,false); 
			

			svc.describeThemePermissions(params,cb);
		}

		
		service.DescribeUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			

			svc.describeUser(params,cb);
		}

		
		service.GenerateEmbedUrlForAnonymousUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			copyArg(n,"AuthorizedResourceArns",params,undefined,false); 
			copyArg(n,"ExperienceConfiguration",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"SessionLifetimeInMinutes",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			copyArg(msg,"SessionTags",params,undefined,false); 
			copyArg(msg,"AuthorizedResourceArns",params,undefined,false); 
			copyArg(msg,"ExperienceConfiguration",params,undefined,false); 
			

			svc.generateEmbedUrlForAnonymousUser(params,cb);
		}

		
		service.GenerateEmbedUrlForRegisteredUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"UserArn",params,undefined,false); 
			copyArg(n,"ExperienceConfiguration",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"SessionLifetimeInMinutes",params,undefined,false); 
			copyArg(msg,"UserArn",params,undefined,false); 
			copyArg(msg,"ExperienceConfiguration",params,undefined,false); 
			

			svc.generateEmbedUrlForRegisteredUser(params,cb);
		}

		
		service.GetDashboardEmbedUrl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"DashboardId",params,undefined,false); 
			copyArg(n,"IdentityType",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"DashboardId",params,undefined,false); 
			copyArg(msg,"IdentityType",params,undefined,false); 
			copyArg(msg,"SessionLifetimeInMinutes",params,undefined,false); 
			copyArg(msg,"UndoRedoDisabled",params,undefined,false); 
			copyArg(msg,"ResetDisabled",params,undefined,false); 
			copyArg(msg,"StatePersistenceEnabled",params,undefined,false); 
			copyArg(msg,"UserArn",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			copyArg(msg,"AdditionalDashboardIds",params,undefined,false); 
			

			svc.getDashboardEmbedUrl(params,cb);
		}

		
		service.GetSessionEmbedUrl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"EntryPoint",params,undefined,false); 
			copyArg(msg,"SessionLifetimeInMinutes",params,undefined,false); 
			copyArg(msg,"UserArn",params,undefined,false); 
			

			svc.getSessionEmbedUrl(params,cb);
		}

		
		service.ListAnalyses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listAnalyses(params,cb);
		}

		
		service.ListDashboardVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"DashboardId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"DashboardId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listDashboardVersions(params,cb);
		}

		
		service.ListDashboards=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listDashboards(params,cb);
		}

		
		service.ListDataSets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listDataSets(params,cb);
		}

		
		service.ListDataSources=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listDataSources(params,cb);
		}

		
		service.ListFolderMembers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"FolderId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"FolderId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listFolderMembers(params,cb);
		}

		
		service.ListFolders=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listFolders(params,cb);
		}

		
		service.ListGroupMemberships=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupName",params,undefined,false); 
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			

			svc.listGroupMemberships(params,cb);
		}

		
		service.ListGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			

			svc.listGroups(params,cb);
		}

		
		service.ListIAMPolicyAssignments=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"AssignmentStatus",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listIAMPolicyAssignments(params,cb);
		}

		
		service.ListIAMPolicyAssignmentsForUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"UserName",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			

			svc.listIAMPolicyAssignmentsForUser(params,cb);
		}

		
		service.ListIngestions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DataSetId",params,undefined,false); 
			copyArg(n,"AwsAccountId",params,undefined,false); 
			
			copyArg(msg,"DataSetId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listIngestions(params,cb);
		}

		
		service.ListNamespaces=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listNamespaces(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListTemplateAliases=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"TemplateId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"TemplateId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listTemplateAliases(params,cb);
		}

		
		service.ListTemplateVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"TemplateId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"TemplateId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listTemplateVersions(params,cb);
		}

		
		service.ListTemplates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listTemplates(params,cb);
		}

		
		service.ListThemeAliases=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"ThemeId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"ThemeId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listThemeAliases(params,cb);
		}

		
		service.ListThemeVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"ThemeId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"ThemeId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listThemeVersions(params,cb);
		}

		
		service.ListThemes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			

			svc.listThemes(params,cb);
		}

		
		service.ListUserGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listUserGroups(params,cb);
		}

		
		service.ListUsers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			

			svc.listUsers(params,cb);
		}

		
		service.RegisterUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IdentityType",params,undefined,false); 
			copyArg(n,"Email",params,undefined,false); 
			copyArg(n,"UserRole",params,undefined,false); 
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			
			copyArg(msg,"IdentityType",params,undefined,false); 
			copyArg(msg,"Email",params,undefined,false); 
			copyArg(msg,"UserRole",params,undefined,false); 
			copyArg(msg,"IamArn",params,undefined,false); 
			copyArg(msg,"SessionName",params,undefined,false); 
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"CustomPermissionsName",params,undefined,false); 
			copyArg(msg,"ExternalLoginFederationProviderType",params,undefined,false); 
			copyArg(msg,"CustomFederationProviderUrl",params,undefined,false); 
			copyArg(msg,"ExternalLoginId",params,undefined,false); 
			

			svc.registerUser(params,cb);
		}

		
		service.RestoreAnalysis=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"AnalysisId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"AnalysisId",params,undefined,false); 
			

			svc.restoreAnalysis(params,cb);
		}

		
		service.SearchAnalyses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"Filters",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.searchAnalyses(params,cb);
		}

		
		service.SearchDashboards=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"Filters",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.searchDashboards(params,cb);
		}

		
		service.SearchFolders=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"Filters",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.searchFolders(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateAccountCustomization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"AccountCustomization",params,undefined,true); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			copyArg(msg,"AccountCustomization",params,undefined,true); 
			

			svc.updateAccountCustomization(params,cb);
		}

		
		service.UpdateAccountSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"DefaultNamespace",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"DefaultNamespace",params,undefined,false); 
			copyArg(msg,"NotificationEmail",params,undefined,false); 
			

			svc.updateAccountSettings(params,cb);
		}

		
		service.UpdateAnalysis=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"AnalysisId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"SourceEntity",params,undefined,true); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"AnalysisId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,true); 
			copyArg(msg,"SourceEntity",params,undefined,true); 
			copyArg(msg,"ThemeArn",params,undefined,false); 
			

			svc.updateAnalysis(params,cb);
		}

		
		service.UpdateAnalysisPermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"AnalysisId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"AnalysisId",params,undefined,false); 
			copyArg(msg,"GrantPermissions",params,undefined,true); 
			copyArg(msg,"RevokePermissions",params,undefined,true); 
			

			svc.updateAnalysisPermissions(params,cb);
		}

		
		service.UpdateDashboard=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"DashboardId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"SourceEntity",params,undefined,true); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"DashboardId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"SourceEntity",params,undefined,true); 
			copyArg(msg,"Parameters",params,undefined,true); 
			copyArg(msg,"VersionDescription",params,undefined,false); 
			copyArg(msg,"DashboardPublishOptions",params,undefined,true); 
			copyArg(msg,"ThemeArn",params,undefined,false); 
			

			svc.updateDashboard(params,cb);
		}

		
		service.UpdateDashboardPermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"DashboardId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"DashboardId",params,undefined,false); 
			copyArg(msg,"GrantPermissions",params,undefined,true); 
			copyArg(msg,"RevokePermissions",params,undefined,true); 
			

			svc.updateDashboardPermissions(params,cb);
		}

		
		service.UpdateDashboardPublishedVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"DashboardId",params,undefined,false); 
			copyArg(n,"VersionNumber",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"DashboardId",params,undefined,false); 
			copyArg(msg,"VersionNumber",params,undefined,false); 
			

			svc.updateDashboardPublishedVersion(params,cb);
		}

		
		service.UpdateDataSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"DataSetId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"PhysicalTableMap",params,undefined,true); 
			copyArg(n,"ImportMode",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"DataSetId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"PhysicalTableMap",params,undefined,true); 
			copyArg(msg,"LogicalTableMap",params,undefined,true); 
			copyArg(msg,"ImportMode",params,undefined,false); 
			copyArg(msg,"ColumnGroups",params,undefined,true); 
			copyArg(msg,"FieldFolders",params,undefined,true); 
			copyArg(msg,"RowLevelPermissionDataSet",params,undefined,true); 
			copyArg(msg,"RowLevelPermissionTagConfiguration",params,undefined,true); 
			copyArg(msg,"ColumnLevelPermissionRules",params,undefined,true); 
			

			svc.updateDataSet(params,cb);
		}

		
		service.UpdateDataSetPermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"DataSetId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"DataSetId",params,undefined,false); 
			copyArg(msg,"GrantPermissions",params,undefined,true); 
			copyArg(msg,"RevokePermissions",params,undefined,true); 
			

			svc.updateDataSetPermissions(params,cb);
		}

		
		service.UpdateDataSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"DataSourceId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"DataSourceId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"DataSourceParameters",params,undefined,true); 
			copyArg(msg,"Credentials",params,undefined,true); 
			copyArg(msg,"VpcConnectionProperties",params,undefined,true); 
			copyArg(msg,"SslProperties",params,undefined,true); 
			

			svc.updateDataSource(params,cb);
		}

		
		service.UpdateDataSourcePermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"DataSourceId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"DataSourceId",params,undefined,false); 
			copyArg(msg,"GrantPermissions",params,undefined,true); 
			copyArg(msg,"RevokePermissions",params,undefined,true); 
			

			svc.updateDataSourcePermissions(params,cb);
		}

		
		service.UpdateFolder=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"FolderId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"FolderId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.updateFolder(params,cb);
		}

		
		service.UpdateFolderPermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"FolderId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"FolderId",params,undefined,false); 
			copyArg(msg,"GrantPermissions",params,undefined,true); 
			copyArg(msg,"RevokePermissions",params,undefined,true); 
			

			svc.updateFolderPermissions(params,cb);
		}

		
		service.UpdateGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupName",params,undefined,false); 
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			
			copyArg(msg,"GroupName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			

			svc.updateGroup(params,cb);
		}

		
		service.UpdateIAMPolicyAssignment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"AssignmentName",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"AssignmentName",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			copyArg(msg,"AssignmentStatus",params,undefined,false); 
			copyArg(msg,"PolicyArn",params,undefined,false); 
			copyArg(msg,"Identities",params,undefined,true); 
			

			svc.updateIAMPolicyAssignment(params,cb);
		}

		
		service.UpdateTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"TemplateId",params,undefined,false); 
			copyArg(n,"SourceEntity",params,undefined,true); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"TemplateId",params,undefined,false); 
			copyArg(msg,"SourceEntity",params,undefined,true); 
			copyArg(msg,"VersionDescription",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.updateTemplate(params,cb);
		}

		
		service.UpdateTemplateAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"TemplateId",params,undefined,false); 
			copyArg(n,"AliasName",params,undefined,false); 
			copyArg(n,"TemplateVersionNumber",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"TemplateId",params,undefined,false); 
			copyArg(msg,"AliasName",params,undefined,false); 
			copyArg(msg,"TemplateVersionNumber",params,undefined,false); 
			

			svc.updateTemplateAlias(params,cb);
		}

		
		service.UpdateTemplatePermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"TemplateId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"TemplateId",params,undefined,false); 
			copyArg(msg,"GrantPermissions",params,undefined,true); 
			copyArg(msg,"RevokePermissions",params,undefined,true); 
			

			svc.updateTemplatePermissions(params,cb);
		}

		
		service.UpdateTheme=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"ThemeId",params,undefined,false); 
			copyArg(n,"BaseThemeId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"ThemeId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"BaseThemeId",params,undefined,false); 
			copyArg(msg,"VersionDescription",params,undefined,false); 
			copyArg(msg,"Configuration",params,undefined,true); 
			

			svc.updateTheme(params,cb);
		}

		
		service.UpdateThemeAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"ThemeId",params,undefined,false); 
			copyArg(n,"AliasName",params,undefined,false); 
			copyArg(n,"ThemeVersionNumber",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"ThemeId",params,undefined,false); 
			copyArg(msg,"AliasName",params,undefined,false); 
			copyArg(msg,"ThemeVersionNumber",params,undefined,false); 
			

			svc.updateThemeAlias(params,cb);
		}

		
		service.UpdateThemePermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"ThemeId",params,undefined,false); 
			
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"ThemeId",params,undefined,false); 
			copyArg(msg,"GrantPermissions",params,undefined,true); 
			copyArg(msg,"RevokePermissions",params,undefined,true); 
			

			svc.updateThemePermissions(params,cb);
		}

		
		service.UpdateUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,false); 
			copyArg(n,"AwsAccountId",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			copyArg(n,"Email",params,undefined,false); 
			copyArg(n,"Role",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"AwsAccountId",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			copyArg(msg,"Email",params,undefined,false); 
			copyArg(msg,"Role",params,undefined,false); 
			copyArg(msg,"CustomPermissionsName",params,undefined,false); 
			copyArg(msg,"UnapplyCustomPermissions",params,undefined,false); 
			copyArg(msg,"ExternalLoginFederationProviderType",params,undefined,false); 
			copyArg(msg,"CustomFederationProviderUrl",params,undefined,false); 
			copyArg(msg,"ExternalLoginId",params,undefined,false); 
			

			svc.updateUser(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS QuickSight", AmazonAPINode);

};
