
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

		var awsService = new AWS.WorkDocs( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.WorkDocs(msg.AWSConfig) : awsService;

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
		
			service.AbortDocumentVersionUpload=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DocumentId",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"DocumentId",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"DocumentId",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			

			svc.abortDocumentVersionUpload(params,cb);
		}
			service.ActivateUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			
			copyArgs(msg,"UserId",params,undefined,false); 
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			

			svc.activateUser(params,cb);
		}
			service.AddResourcePermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"Principals",params,undefined,false); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"Principals",params,undefined,false); 
			copyArgs(n,"NotificationOptions",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"Principals",params,undefined,false); 
			copyArgs(msg,"NotificationOptions",params,undefined,false); 
			

			svc.addResourcePermissions(params,cb);
		}
			service.CreateComment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DocumentId",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			copyArgs(n,"Text",params,undefined,true); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"DocumentId",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			copyArgs(n,"ParentId",params,undefined,false); 
			copyArgs(n,"ThreadId",params,undefined,false); 
			copyArgs(n,"Text",params,undefined,true); 
			copyArgs(n,"Visibility",params,undefined,false); 
			copyArgs(Boolean(n),"NotifyCollaborators",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"DocumentId",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			copyArgs(msg,"ParentId",params,undefined,false); 
			copyArgs(msg,"ThreadId",params,undefined,false); 
			copyArgs(msg,"Text",params,undefined,true); 
			copyArgs(msg,"Visibility",params,undefined,false); 
			copyArgs(msg,"NotifyCollaborators",params,undefined,false); 
			

			svc.createComment(params,cb);
		}
			service.CreateCustomMetadata=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"CustomMetadata",params,undefined,true); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			copyArgs(n,"CustomMetadata",params,undefined,true); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			copyArgs(msg,"CustomMetadata",params,undefined,true); 
			

			svc.createCustomMetadata(params,cb);
		}
			service.CreateFolder=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ParentFolderId",params,undefined,false); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ParentFolderId",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ParentFolderId",params,undefined,false); 
			

			svc.createFolder(params,cb);
		}
			service.CreateLabels=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"Labels",params,undefined,true); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"Labels",params,undefined,true); 
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"Labels",params,undefined,true); 
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			

			svc.createLabels(params,cb);
		}
			service.CreateNotificationSubscription=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"Endpoint",params,undefined,false); 
			copyArgs(n,"Protocol",params,undefined,false); 
			copyArgs(n,"SubscriptionType",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"Endpoint",params,undefined,false); 
			copyArgs(n,"Protocol",params,undefined,false); 
			copyArgs(n,"SubscriptionType",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"Endpoint",params,undefined,false); 
			copyArgs(msg,"Protocol",params,undefined,false); 
			copyArgs(msg,"SubscriptionType",params,undefined,false); 
			

			svc.createNotificationSubscription(params,cb);
		}
			service.CreateUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Username",params,undefined,false); 
			copyArgs(n,"GivenName",params,undefined,false); 
			copyArgs(n,"Surname",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"Username",params,undefined,false); 
			copyArgs(n,"EmailAddress",params,undefined,false); 
			copyArgs(n,"GivenName",params,undefined,false); 
			copyArgs(n,"Surname",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,false); 
			copyArgs(n,"TimeZoneId",params,undefined,false); 
			copyArgs(n,"StorageRule",params,undefined,true); 
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"Username",params,undefined,false); 
			copyArgs(msg,"EmailAddress",params,undefined,false); 
			copyArgs(msg,"GivenName",params,undefined,false); 
			copyArgs(msg,"Surname",params,undefined,false); 
			copyArgs(msg,"Password",params,undefined,false); 
			copyArgs(msg,"TimeZoneId",params,undefined,false); 
			copyArgs(msg,"StorageRule",params,undefined,true); 
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			

			svc.createUser(params,cb);
		}
			service.DeactivateUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			
			copyArgs(msg,"UserId",params,undefined,false); 
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			

			svc.deactivateUser(params,cb);
		}
			service.DeleteComment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DocumentId",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			copyArgs(n,"CommentId",params,undefined,false); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"DocumentId",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			copyArgs(n,"CommentId",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"DocumentId",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			copyArgs(msg,"CommentId",params,undefined,false); 
			

			svc.deleteComment(params,cb);
		}
			service.DeleteCustomMetadata=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			copyArgs(n,"Keys",params,undefined,false); 
			copyArgs(Boolean(n),"DeleteAll",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			copyArgs(msg,"Keys",params,undefined,false); 
			copyArgs(msg,"DeleteAll",params,undefined,false); 
			

			svc.deleteCustomMetadata(params,cb);
		}
			service.DeleteDocument=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DocumentId",params,undefined,false); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"DocumentId",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"DocumentId",params,undefined,false); 
			

			svc.deleteDocument(params,cb);
		}
			service.DeleteFolder=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FolderId",params,undefined,false); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"FolderId",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"FolderId",params,undefined,false); 
			

			svc.deleteFolder(params,cb);
		}
			service.DeleteFolderContents=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FolderId",params,undefined,false); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"FolderId",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"FolderId",params,undefined,false); 
			

			svc.deleteFolderContents(params,cb);
		}
			service.DeleteLabels=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"Labels",params,undefined,true); 
			copyArgs(Boolean(n),"DeleteAll",params,undefined,false); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"Labels",params,undefined,true); 
			copyArgs(msg,"DeleteAll",params,undefined,false); 
			

			svc.deleteLabels(params,cb);
		}
			service.DeleteNotificationSubscription=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubscriptionId",params,undefined,false); 
			copyArgs(n,"OrganizationId",params,undefined,false); 
			
			copyArgs(n,"SubscriptionId",params,undefined,false); 
			copyArgs(n,"OrganizationId",params,undefined,false); 
			
			copyArgs(msg,"SubscriptionId",params,undefined,false); 
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			

			svc.deleteNotificationSubscription(params,cb);
		}
			service.DeleteUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"UserId",params,undefined,false); 
			

			svc.deleteUser(params,cb);
		}
			service.DescribeActivities=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"ActivityTypes",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(Boolean(n),"IncludeIndirectActivities",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"ActivityTypes",params,undefined,false); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"UserId",params,undefined,false); 
			copyArgs(msg,"IncludeIndirectActivities",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeActivities(params,cb);
		}
			service.DescribeComments=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DocumentId",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"DocumentId",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"DocumentId",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeComments(params,cb);
		}
			service.DescribeDocumentVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DocumentId",params,undefined,false); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"DocumentId",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"Include",params,undefined,false); 
			copyArgs(n,"Fields",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"DocumentId",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"Include",params,undefined,false); 
			copyArgs(msg,"Fields",params,undefined,false); 
			

			svc.describeDocumentVersions(params,cb);
		}
			service.DescribeFolderContents=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FolderId",params,undefined,false); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"FolderId",params,undefined,false); 
			copyArgs(n,"Sort",params,undefined,false); 
			copyArgs(n,"Order",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Include",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"FolderId",params,undefined,false); 
			copyArgs(msg,"Sort",params,undefined,false); 
			copyArgs(msg,"Order",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"Include",params,undefined,false); 
			

			svc.describeFolderContents(params,cb);
		}
			service.DescribeGroups=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SearchQuery",params,undefined,true); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"SearchQuery",params,undefined,true); 
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"SearchQuery",params,undefined,true); 
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.describeGroups(params,cb);
		}
			service.DescribeNotificationSubscriptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.describeNotificationSubscriptions(params,cb);
		}
			service.DescribeResourcePermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"PrincipalId",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"PrincipalId",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeResourcePermissions(params,cb);
		}
			service.DescribeRootFolders=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.describeRootFolders(params,cb);
		}
			service.DescribeUsers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"OrganizationId",params,undefined,false); 
			copyArgs(n,"UserIds",params,undefined,false); 
			copyArgs(n,"Query",params,undefined,true); 
			copyArgs(n,"Include",params,undefined,false); 
			copyArgs(n,"Order",params,undefined,false); 
			copyArgs(n,"Sort",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"Fields",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			copyArgs(msg,"UserIds",params,undefined,false); 
			copyArgs(msg,"Query",params,undefined,true); 
			copyArgs(msg,"Include",params,undefined,false); 
			copyArgs(msg,"Order",params,undefined,false); 
			copyArgs(msg,"Sort",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"Fields",params,undefined,false); 
			

			svc.describeUsers(params,cb);
		}
			service.GetCurrentUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			

			svc.getCurrentUser(params,cb);
		}
			service.GetDocument=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DocumentId",params,undefined,false); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"DocumentId",params,undefined,false); 
			copyArgs(Boolean(n),"IncludeCustomMetadata",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"DocumentId",params,undefined,false); 
			copyArgs(msg,"IncludeCustomMetadata",params,undefined,false); 
			

			svc.getDocument(params,cb);
		}
			service.GetDocumentPath=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DocumentId",params,undefined,false); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"DocumentId",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"Fields",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"DocumentId",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"Fields",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.getDocumentPath(params,cb);
		}
			service.GetDocumentVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DocumentId",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"DocumentId",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			copyArgs(n,"Fields",params,undefined,false); 
			copyArgs(Boolean(n),"IncludeCustomMetadata",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"DocumentId",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			copyArgs(msg,"Fields",params,undefined,false); 
			copyArgs(msg,"IncludeCustomMetadata",params,undefined,false); 
			

			svc.getDocumentVersion(params,cb);
		}
			service.GetFolder=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FolderId",params,undefined,false); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"FolderId",params,undefined,false); 
			copyArgs(Boolean(n),"IncludeCustomMetadata",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"FolderId",params,undefined,false); 
			copyArgs(msg,"IncludeCustomMetadata",params,undefined,false); 
			

			svc.getFolder(params,cb);
		}
			service.GetFolderPath=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FolderId",params,undefined,false); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"FolderId",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"Fields",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"FolderId",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"Fields",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.getFolderPath(params,cb);
		}
			service.GetResources=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"CollectionType",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"UserId",params,undefined,false); 
			copyArgs(msg,"CollectionType",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.getResources(params,cb);
		}
			service.InitiateDocumentVersionUpload=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ParentFolderId",params,undefined,false); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ContentCreatedTimestamp",params,undefined,false); 
			copyArgs(n,"ContentModifiedTimestamp",params,undefined,false); 
			copyArgs(n,"ContentType",params,undefined,false); 
			copyArgs(n,"DocumentSizeInBytes",params,undefined,false); 
			copyArgs(n,"ParentFolderId",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ContentCreatedTimestamp",params,undefined,false); 
			copyArgs(msg,"ContentModifiedTimestamp",params,undefined,false); 
			copyArgs(msg,"ContentType",params,undefined,false); 
			copyArgs(msg,"DocumentSizeInBytes",params,undefined,false); 
			copyArgs(msg,"ParentFolderId",params,undefined,false); 
			

			svc.initiateDocumentVersionUpload(params,cb);
		}
			service.RemoveAllResourcePermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			

			svc.removeAllResourcePermissions(params,cb);
		}
			service.RemoveResourcePermission=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"PrincipalId",params,undefined,false); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"PrincipalId",params,undefined,false); 
			copyArgs(n,"PrincipalType",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"PrincipalId",params,undefined,false); 
			copyArgs(msg,"PrincipalType",params,undefined,false); 
			

			svc.removeResourcePermission(params,cb);
		}
			service.UpdateDocument=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DocumentId",params,undefined,false); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"DocumentId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ParentFolderId",params,undefined,false); 
			copyArgs(n,"ResourceState",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"DocumentId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ParentFolderId",params,undefined,false); 
			copyArgs(msg,"ResourceState",params,undefined,false); 
			

			svc.updateDocument(params,cb);
		}
			service.UpdateDocumentVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DocumentId",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"DocumentId",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			copyArgs(n,"VersionStatus",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"DocumentId",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			copyArgs(msg,"VersionStatus",params,undefined,false); 
			

			svc.updateDocumentVersion(params,cb);
		}
			service.UpdateFolder=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FolderId",params,undefined,false); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"FolderId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ParentFolderId",params,undefined,false); 
			copyArgs(n,"ResourceState",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"FolderId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ParentFolderId",params,undefined,false); 
			copyArgs(msg,"ResourceState",params,undefined,false); 
			

			svc.updateFolder(params,cb);
		}
			service.UpdateUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(n,"AuthenticationToken",params,undefined,true); 
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"GivenName",params,undefined,false); 
			copyArgs(n,"Surname",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"StorageRule",params,undefined,true); 
			copyArgs(n,"TimeZoneId",params,undefined,false); 
			copyArgs(n,"Locale",params,undefined,false); 
			copyArgs(n,"GrantPoweruserPrivileges",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationToken",params,undefined,true); 
			copyArgs(msg,"UserId",params,undefined,false); 
			copyArgs(msg,"GivenName",params,undefined,false); 
			copyArgs(msg,"Surname",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"StorageRule",params,undefined,true); 
			copyArgs(msg,"TimeZoneId",params,undefined,false); 
			copyArgs(msg,"Locale",params,undefined,false); 
			copyArgs(msg,"GrantPoweruserPrivileges",params,undefined,false); 
			

			svc.updateUser(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS WorkDocs", AmazonAPINode);

};
