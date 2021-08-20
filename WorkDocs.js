
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

		var awsService = new AWS.WorkDocs( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.WorkDocs(msg.AWSConfig) : awsService;

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

		
		service.AbortDocumentVersionUpload=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DocumentId",params,undefined,false); 
			copyArg(n,"VersionId",params,undefined,false); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"DocumentId",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			

			svc.abortDocumentVersionUpload(params,cb);
		}

		
		service.ActivateUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserId",params,undefined,false); 
			
			copyArg(msg,"UserId",params,undefined,false); 
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			

			svc.activateUser(params,cb);
		}

		
		service.AddResourcePermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"Principals",params,undefined,false); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"Principals",params,undefined,false); 
			copyArg(msg,"NotificationOptions",params,undefined,false); 
			

			svc.addResourcePermissions(params,cb);
		}

		
		service.CreateComment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DocumentId",params,undefined,false); 
			copyArg(n,"VersionId",params,undefined,false); 
			copyArg(n,"Text",params,undefined,true); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"DocumentId",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			copyArg(msg,"ParentId",params,undefined,false); 
			copyArg(msg,"ThreadId",params,undefined,false); 
			copyArg(msg,"Text",params,undefined,true); 
			copyArg(msg,"Visibility",params,undefined,false); 
			copyArg(msg,"NotifyCollaborators",params,undefined,false); 
			

			svc.createComment(params,cb);
		}

		
		service.CreateCustomMetadata=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"CustomMetadata",params,undefined,true); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			copyArg(msg,"CustomMetadata",params,undefined,true); 
			

			svc.createCustomMetadata(params,cb);
		}

		
		service.CreateFolder=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ParentFolderId",params,undefined,false); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ParentFolderId",params,undefined,false); 
			

			svc.createFolder(params,cb);
		}

		
		service.CreateLabels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"Labels",params,undefined,true); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"Labels",params,undefined,true); 
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			

			svc.createLabels(params,cb);
		}

		
		service.CreateNotificationSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			copyArg(n,"Endpoint",params,undefined,false); 
			copyArg(n,"Protocol",params,undefined,false); 
			copyArg(n,"SubscriptionType",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"Endpoint",params,undefined,false); 
			copyArg(msg,"Protocol",params,undefined,false); 
			copyArg(msg,"SubscriptionType",params,undefined,false); 
			

			svc.createNotificationSubscription(params,cb);
		}

		
		service.CreateUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Username",params,undefined,false); 
			copyArg(n,"GivenName",params,undefined,false); 
			copyArg(n,"Surname",params,undefined,false); 
			copyArg(n,"Password",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"Username",params,undefined,false); 
			copyArg(msg,"EmailAddress",params,undefined,false); 
			copyArg(msg,"GivenName",params,undefined,false); 
			copyArg(msg,"Surname",params,undefined,false); 
			copyArg(msg,"Password",params,undefined,false); 
			copyArg(msg,"TimeZoneId",params,undefined,false); 
			copyArg(msg,"StorageRule",params,undefined,true); 
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			

			svc.createUser(params,cb);
		}

		
		service.DeactivateUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserId",params,undefined,false); 
			
			copyArg(msg,"UserId",params,undefined,false); 
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			

			svc.deactivateUser(params,cb);
		}

		
		service.DeleteComment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DocumentId",params,undefined,false); 
			copyArg(n,"VersionId",params,undefined,false); 
			copyArg(n,"CommentId",params,undefined,false); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"DocumentId",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			copyArg(msg,"CommentId",params,undefined,false); 
			

			svc.deleteComment(params,cb);
		}

		
		service.DeleteCustomMetadata=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			copyArg(msg,"Keys",params,undefined,false); 
			copyArg(msg,"DeleteAll",params,undefined,false); 
			

			svc.deleteCustomMetadata(params,cb);
		}

		
		service.DeleteDocument=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DocumentId",params,undefined,false); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"DocumentId",params,undefined,false); 
			

			svc.deleteDocument(params,cb);
		}

		
		service.DeleteFolder=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FolderId",params,undefined,false); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"FolderId",params,undefined,false); 
			

			svc.deleteFolder(params,cb);
		}

		
		service.DeleteFolderContents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FolderId",params,undefined,false); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"FolderId",params,undefined,false); 
			

			svc.deleteFolderContents(params,cb);
		}

		
		service.DeleteLabels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"Labels",params,undefined,true); 
			copyArg(msg,"DeleteAll",params,undefined,false); 
			

			svc.deleteLabels(params,cb);
		}

		
		service.DeleteNotificationSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubscriptionId",params,undefined,false); 
			copyArg(n,"OrganizationId",params,undefined,false); 
			
			copyArg(msg,"SubscriptionId",params,undefined,false); 
			copyArg(msg,"OrganizationId",params,undefined,false); 
			

			svc.deleteNotificationSubscription(params,cb);
		}

		
		service.DeleteUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserId",params,undefined,false); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"UserId",params,undefined,false); 
			

			svc.deleteUser(params,cb);
		}

		
		service.DescribeActivities=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"ActivityTypes",params,undefined,false); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"UserId",params,undefined,false); 
			copyArg(msg,"IncludeIndirectActivities",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeActivities(params,cb);
		}

		
		service.DescribeComments=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DocumentId",params,undefined,false); 
			copyArg(n,"VersionId",params,undefined,false); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"DocumentId",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeComments(params,cb);
		}

		
		service.DescribeDocumentVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DocumentId",params,undefined,false); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"DocumentId",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"Include",params,undefined,false); 
			copyArg(msg,"Fields",params,undefined,false); 
			

			svc.describeDocumentVersions(params,cb);
		}

		
		service.DescribeFolderContents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FolderId",params,undefined,false); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"FolderId",params,undefined,false); 
			copyArg(msg,"Sort",params,undefined,false); 
			copyArg(msg,"Order",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"Include",params,undefined,false); 
			

			svc.describeFolderContents(params,cb);
		}

		
		service.DescribeGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SearchQuery",params,undefined,true); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"SearchQuery",params,undefined,true); 
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.describeGroups(params,cb);
		}

		
		service.DescribeNotificationSubscriptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationId",params,undefined,false); 
			
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.describeNotificationSubscriptions(params,cb);
		}

		
		service.DescribeResourcePermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"PrincipalId",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeResourcePermissions(params,cb);
		}

		
		service.DescribeRootFolders=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AuthenticationToken",params,undefined,true); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeRootFolders(params,cb);
		}

		
		service.DescribeUsers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"OrganizationId",params,undefined,false); 
			copyArg(msg,"UserIds",params,undefined,false); 
			copyArg(msg,"Query",params,undefined,true); 
			copyArg(msg,"Include",params,undefined,false); 
			copyArg(msg,"Order",params,undefined,false); 
			copyArg(msg,"Sort",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"Fields",params,undefined,false); 
			

			svc.describeUsers(params,cb);
		}

		
		service.GetCurrentUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AuthenticationToken",params,undefined,true); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			

			svc.getCurrentUser(params,cb);
		}

		
		service.GetDocument=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DocumentId",params,undefined,false); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"DocumentId",params,undefined,false); 
			copyArg(msg,"IncludeCustomMetadata",params,undefined,false); 
			

			svc.getDocument(params,cb);
		}

		
		service.GetDocumentPath=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DocumentId",params,undefined,false); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"DocumentId",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"Fields",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.getDocumentPath(params,cb);
		}

		
		service.GetDocumentVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DocumentId",params,undefined,false); 
			copyArg(n,"VersionId",params,undefined,false); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"DocumentId",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			copyArg(msg,"Fields",params,undefined,false); 
			copyArg(msg,"IncludeCustomMetadata",params,undefined,false); 
			

			svc.getDocumentVersion(params,cb);
		}

		
		service.GetFolder=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FolderId",params,undefined,false); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"FolderId",params,undefined,false); 
			copyArg(msg,"IncludeCustomMetadata",params,undefined,false); 
			

			svc.getFolder(params,cb);
		}

		
		service.GetFolderPath=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FolderId",params,undefined,false); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"FolderId",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"Fields",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.getFolderPath(params,cb);
		}

		
		service.GetResources=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"UserId",params,undefined,false); 
			copyArg(msg,"CollectionType",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.getResources(params,cb);
		}

		
		service.InitiateDocumentVersionUpload=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ParentFolderId",params,undefined,false); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ContentCreatedTimestamp",params,undefined,false); 
			copyArg(msg,"ContentModifiedTimestamp",params,undefined,false); 
			copyArg(msg,"ContentType",params,undefined,false); 
			copyArg(msg,"DocumentSizeInBytes",params,undefined,false); 
			copyArg(msg,"ParentFolderId",params,undefined,false); 
			

			svc.initiateDocumentVersionUpload(params,cb);
		}

		
		service.RemoveAllResourcePermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			

			svc.removeAllResourcePermissions(params,cb);
		}

		
		service.RemoveResourcePermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"PrincipalId",params,undefined,false); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"PrincipalId",params,undefined,false); 
			copyArg(msg,"PrincipalType",params,undefined,false); 
			

			svc.removeResourcePermission(params,cb);
		}

		
		service.UpdateDocument=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DocumentId",params,undefined,false); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"DocumentId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ParentFolderId",params,undefined,false); 
			copyArg(msg,"ResourceState",params,undefined,false); 
			

			svc.updateDocument(params,cb);
		}

		
		service.UpdateDocumentVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DocumentId",params,undefined,false); 
			copyArg(n,"VersionId",params,undefined,false); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"DocumentId",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			copyArg(msg,"VersionStatus",params,undefined,false); 
			

			svc.updateDocumentVersion(params,cb);
		}

		
		service.UpdateFolder=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FolderId",params,undefined,false); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"FolderId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ParentFolderId",params,undefined,false); 
			copyArg(msg,"ResourceState",params,undefined,false); 
			

			svc.updateFolder(params,cb);
		}

		
		service.UpdateUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserId",params,undefined,false); 
			
			copyArg(msg,"AuthenticationToken",params,undefined,true); 
			copyArg(msg,"UserId",params,undefined,false); 
			copyArg(msg,"GivenName",params,undefined,false); 
			copyArg(msg,"Surname",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"StorageRule",params,undefined,true); 
			copyArg(msg,"TimeZoneId",params,undefined,false); 
			copyArg(msg,"Locale",params,undefined,false); 
			copyArg(msg,"GrantPoweruserPrivileges",params,undefined,false); 
			

			svc.updateUser(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS WorkDocs", AmazonAPINode);

};
