
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

		var awsService = new AWS.CodeStar( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.CodeStar(msg.AWSConfig) : awsService;

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
		
			service.AssociateTeamMember=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectId",params,undefined,false); 
			copyArgs(n,"userArn",params,undefined,false); 
			copyArgs(n,"projectRole",params,undefined,false); 
			
			copyArgs(n,"projectId",params,undefined,false); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			copyArgs(n,"userArn",params,undefined,false); 
			copyArgs(n,"projectRole",params,undefined,false); 
			copyArgs(Boolean(n),"remoteAccessAllowed",params,undefined,false); 
			
			copyArgs(msg,"projectId",params,undefined,false); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			copyArgs(msg,"userArn",params,undefined,false); 
			copyArgs(msg,"projectRole",params,undefined,false); 
			copyArgs(msg,"remoteAccessAllowed",params,undefined,false); 
			

			svc.associateTeamMember(params,cb);
		}
			service.CreateProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,true); 
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,true); 
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"description",params,undefined,true); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			copyArgs(n,"sourceCode",params,undefined,false); 
			copyArgs(n,"toolchain",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,true); 
			copyArgs(msg,"id",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,true); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			copyArgs(msg,"sourceCode",params,undefined,false); 
			copyArgs(msg,"toolchain",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createProject(params,cb);
		}
			service.CreateUserProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"userArn",params,undefined,false); 
			copyArgs(n,"displayName",params,undefined,true); 
			copyArgs(n,"emailAddress",params,undefined,true); 
			
			copyArgs(n,"userArn",params,undefined,false); 
			copyArgs(n,"displayName",params,undefined,true); 
			copyArgs(n,"emailAddress",params,undefined,true); 
			copyArgs(n,"sshPublicKey",params,undefined,false); 
			
			copyArgs(msg,"userArn",params,undefined,false); 
			copyArgs(msg,"displayName",params,undefined,true); 
			copyArgs(msg,"emailAddress",params,undefined,true); 
			copyArgs(msg,"sshPublicKey",params,undefined,false); 
			

			svc.createUserProfile(params,cb);
		}
			service.DeleteProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			copyArgs(Boolean(n),"deleteStack",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			copyArgs(msg,"deleteStack",params,undefined,false); 
			

			svc.deleteProject(params,cb);
		}
			service.DeleteUserProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"userArn",params,undefined,false); 
			
			copyArgs(n,"userArn",params,undefined,false); 
			
			copyArgs(msg,"userArn",params,undefined,false); 
			

			svc.deleteUserProfile(params,cb);
		}
			service.DescribeProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.describeProject(params,cb);
		}
			service.DescribeUserProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"userArn",params,undefined,false); 
			
			copyArgs(n,"userArn",params,undefined,false); 
			
			copyArgs(msg,"userArn",params,undefined,false); 
			

			svc.describeUserProfile(params,cb);
		}
			service.DisassociateTeamMember=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectId",params,undefined,false); 
			copyArgs(n,"userArn",params,undefined,false); 
			
			copyArgs(n,"projectId",params,undefined,false); 
			copyArgs(n,"userArn",params,undefined,false); 
			
			copyArgs(msg,"projectId",params,undefined,false); 
			copyArgs(msg,"userArn",params,undefined,false); 
			

			svc.disassociateTeamMember(params,cb);
		}
			service.ListProjects=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listProjects(params,cb);
		}
			service.ListResources=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectId",params,undefined,false); 
			
			copyArgs(n,"projectId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"projectId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listResources(params,cb);
		}
			service.ListTagsForProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listTagsForProject(params,cb);
		}
			service.ListTeamMembers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectId",params,undefined,false); 
			
			copyArgs(n,"projectId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"projectId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listTeamMembers(params,cb);
		}
			service.ListUserProfiles=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listUserProfiles(params,cb);
		}
			service.TagProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"id",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.tagProject(params,cb);
		}
			service.UntagProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,false); 
			

			svc.untagProject(params,cb);
		}
			service.UpdateProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"name",params,undefined,true); 
			copyArgs(n,"description",params,undefined,true); 
			
			copyArgs(msg,"id",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,true); 
			copyArgs(msg,"description",params,undefined,true); 
			

			svc.updateProject(params,cb);
		}
			service.UpdateTeamMember=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectId",params,undefined,false); 
			copyArgs(n,"userArn",params,undefined,false); 
			
			copyArgs(n,"projectId",params,undefined,false); 
			copyArgs(n,"userArn",params,undefined,false); 
			copyArgs(n,"projectRole",params,undefined,false); 
			copyArgs(Boolean(n),"remoteAccessAllowed",params,undefined,false); 
			
			copyArgs(msg,"projectId",params,undefined,false); 
			copyArgs(msg,"userArn",params,undefined,false); 
			copyArgs(msg,"projectRole",params,undefined,false); 
			copyArgs(msg,"remoteAccessAllowed",params,undefined,false); 
			

			svc.updateTeamMember(params,cb);
		}
			service.UpdateUserProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"userArn",params,undefined,false); 
			
			copyArgs(n,"userArn",params,undefined,false); 
			copyArgs(n,"displayName",params,undefined,true); 
			copyArgs(n,"emailAddress",params,undefined,true); 
			copyArgs(n,"sshPublicKey",params,undefined,false); 
			
			copyArgs(msg,"userArn",params,undefined,false); 
			copyArgs(msg,"displayName",params,undefined,true); 
			copyArgs(msg,"emailAddress",params,undefined,true); 
			copyArgs(msg,"sshPublicKey",params,undefined,false); 
			

			svc.updateUserProfile(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS CodeStar", AmazonAPINode);

};
