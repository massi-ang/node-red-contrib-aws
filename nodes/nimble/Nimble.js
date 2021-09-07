
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

		var awsService = new AWS.Nimble( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Nimble(msg.AWSConfig) : awsService;

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

		
		service.AcceptEulas=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"eulaIds",params,undefined,true); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"eulaIds",params,undefined,true); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.acceptEulas(params,cb);
		}

		
		service.CreateLaunchProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ec2SubnetIds",params,undefined,true); 
			copyArgs(n,"studioComponentIds",params,undefined,true); 
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"launchProfileProtocolVersions",params,undefined,true); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"streamConfiguration",params,undefined,true); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"ec2SubnetIds",params,undefined,true); 
			copyArgs(n,"launchProfileProtocolVersions",params,undefined,true); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"streamConfiguration",params,undefined,true); 
			copyArgs(n,"studioComponentIds",params,undefined,true); 
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"ec2SubnetIds",params,undefined,true); 
			copyArgs(msg,"launchProfileProtocolVersions",params,undefined,true); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"streamConfiguration",params,undefined,true); 
			copyArgs(msg,"studioComponentIds",params,undefined,true); 
			copyArgs(msg,"studioId",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createLaunchProfile(params,cb);
		}

		
		service.CreateStreamingImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"ec2ImageId",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"ec2ImageId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"ec2ImageId",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createStreamingImage(params,cb);
		}

		
		service.CreateStreamingSession=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"ec2InstanceType",params,undefined,false); 
			copyArgs(n,"launchProfileId",params,undefined,false); 
			copyArgs(n,"ownedBy",params,undefined,false); 
			copyArgs(n,"streamingImageId",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"ec2InstanceType",params,undefined,false); 
			copyArgs(msg,"launchProfileId",params,undefined,false); 
			copyArgs(msg,"ownedBy",params,undefined,false); 
			copyArgs(msg,"streamingImageId",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createStreamingSession(params,cb);
		}

		
		service.CreateStreamingSessionStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"sessionId",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"expirationInSeconds",params,undefined,false); 
			copyArgs(n,"sessionId",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"expirationInSeconds",params,undefined,false); 
			copyArgs(msg,"sessionId",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.createStreamingSessionStream(params,cb);
		}

		
		service.CreateStudio=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"displayName",params,undefined,false); 
			copyArgs(n,"studioName",params,undefined,false); 
			copyArgs(n,"userRoleArn",params,undefined,false); 
			copyArgs(n,"adminRoleArn",params,undefined,false); 
			
			copyArgs(n,"adminRoleArn",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"displayName",params,undefined,false); 
			copyArgs(n,"studioEncryptionConfiguration",params,undefined,true); 
			copyArgs(n,"studioName",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"userRoleArn",params,undefined,false); 
			
			copyArgs(msg,"adminRoleArn",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"displayName",params,undefined,false); 
			copyArgs(msg,"studioEncryptionConfiguration",params,undefined,true); 
			copyArgs(msg,"studioName",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"userRoleArn",params,undefined,false); 
			

			svc.createStudio(params,cb);
		}

		
		service.CreateStudioComponent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"_type",params,"type",false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"configuration",params,undefined,true); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"ec2SecurityGroupIds",params,undefined,true); 
			copyArgs(n,"initializationScripts",params,undefined,true); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"scriptParameters",params,undefined,true); 
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"subtype",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"type",params,undefined,false); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"configuration",params,undefined,true); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"ec2SecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"initializationScripts",params,undefined,true); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"scriptParameters",params,undefined,true); 
			copyArgs(msg,"studioId",params,undefined,false); 
			copyArgs(msg,"subtype",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"type",params,undefined,false); 
			

			svc.createStudioComponent(params,cb);
		}

		
		service.DeleteLaunchProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"launchProfileId",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"launchProfileId",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"launchProfileId",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.deleteLaunchProfile(params,cb);
		}

		
		service.DeleteLaunchProfileMember=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"principalId",params,undefined,false); 
			copyArgs(n,"launchProfileId",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"launchProfileId",params,undefined,false); 
			copyArgs(n,"principalId",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"launchProfileId",params,undefined,false); 
			copyArgs(msg,"principalId",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.deleteLaunchProfileMember(params,cb);
		}

		
		service.DeleteStreamingImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"streamingImageId",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"streamingImageId",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"streamingImageId",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.deleteStreamingImage(params,cb);
		}

		
		service.DeleteStreamingSession=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"sessionId",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"sessionId",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"sessionId",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.deleteStreamingSession(params,cb);
		}

		
		service.DeleteStudio=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.deleteStudio(params,cb);
		}

		
		service.DeleteStudioComponent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"studioComponentId",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"studioComponentId",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"studioComponentId",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.deleteStudioComponent(params,cb);
		}

		
		service.DeleteStudioMember=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"principalId",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"principalId",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"principalId",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.deleteStudioMember(params,cb);
		}

		
		service.GetEula=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"eulaId",params,undefined,false); 
			
			copyArgs(n,"eulaId",params,undefined,false); 
			
			copyArgs(msg,"eulaId",params,undefined,false); 
			

			svc.getEula(params,cb);
		}

		
		service.GetLaunchProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"launchProfileId",params,undefined,false); 
			
			copyArgs(n,"launchProfileId",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"launchProfileId",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.getLaunchProfile(params,cb);
		}

		
		service.GetLaunchProfileDetails=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"launchProfileId",params,undefined,false); 
			
			copyArgs(n,"launchProfileId",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"launchProfileId",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.getLaunchProfileDetails(params,cb);
		}

		
		service.GetLaunchProfileInitialization=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"launchProfileProtocolVersions",params,undefined,true); 
			copyArgs(n,"launchPurpose",params,undefined,false); 
			copyArgs(n,"launchProfileId",params,undefined,false); 
			copyArgs(n,"platform",params,undefined,false); 
			
			copyArgs(n,"launchProfileId",params,undefined,false); 
			copyArgs(n,"launchProfileProtocolVersions",params,undefined,true); 
			copyArgs(n,"launchPurpose",params,undefined,false); 
			copyArgs(n,"platform",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"launchProfileId",params,undefined,false); 
			copyArgs(msg,"launchProfileProtocolVersions",params,undefined,true); 
			copyArgs(msg,"launchPurpose",params,undefined,false); 
			copyArgs(msg,"platform",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.getLaunchProfileInitialization(params,cb);
		}

		
		service.GetLaunchProfileMember=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"principalId",params,undefined,false); 
			copyArgs(n,"launchProfileId",params,undefined,false); 
			
			copyArgs(n,"launchProfileId",params,undefined,false); 
			copyArgs(n,"principalId",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"launchProfileId",params,undefined,false); 
			copyArgs(msg,"principalId",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.getLaunchProfileMember(params,cb);
		}

		
		service.GetStreamingImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"streamingImageId",params,undefined,false); 
			
			copyArgs(n,"streamingImageId",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"streamingImageId",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.getStreamingImage(params,cb);
		}

		
		service.GetStreamingSession=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"sessionId",params,undefined,false); 
			
			copyArgs(n,"sessionId",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"sessionId",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.getStreamingSession(params,cb);
		}

		
		service.GetStreamingSessionStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"streamId",params,undefined,false); 
			copyArgs(n,"sessionId",params,undefined,false); 
			
			copyArgs(n,"sessionId",params,undefined,false); 
			copyArgs(n,"streamId",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"sessionId",params,undefined,false); 
			copyArgs(msg,"streamId",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.getStreamingSessionStream(params,cb);
		}

		
		service.GetStudio=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.getStudio(params,cb);
		}

		
		service.GetStudioComponent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"studioComponentId",params,undefined,false); 
			
			copyArgs(n,"studioComponentId",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"studioComponentId",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.getStudioComponent(params,cb);
		}

		
		service.GetStudioMember=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"principalId",params,undefined,false); 
			
			copyArgs(n,"principalId",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"principalId",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.getStudioMember(params,cb);
		}

		
		service.ListEulaAcceptances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(n,"eulaIds",params,undefined,true); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"eulaIds",params,undefined,true); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.listEulaAcceptances(params,cb);
		}

		
		service.ListEulas=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"eulaIds",params,undefined,true); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"eulaIds",params,undefined,true); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listEulas(params,cb);
		}

		
		service.ListLaunchProfileMembers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"launchProfileId",params,undefined,false); 
			
			copyArgs(n,"launchProfileId",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"launchProfileId",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.listLaunchProfileMembers(params,cb);
		}

		
		service.ListLaunchProfiles=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"principalId",params,undefined,false); 
			copyArgs(n,"states",params,undefined,true); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"principalId",params,undefined,false); 
			copyArgs(msg,"states",params,undefined,true); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.listLaunchProfiles(params,cb);
		}

		
		service.ListStreamingImages=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"owner",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"owner",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.listStreamingImages(params,cb);
		}

		
		service.ListStreamingSessions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(n,"createdBy",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"ownedBy",params,undefined,false); 
			copyArgs(n,"sessionIds",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"createdBy",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"ownedBy",params,undefined,false); 
			copyArgs(msg,"sessionIds",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.listStreamingSessions(params,cb);
		}

		
		service.ListStudioComponents=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"states",params,undefined,true); 
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"types",params,undefined,true); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"states",params,undefined,true); 
			copyArgs(msg,"studioId",params,undefined,false); 
			copyArgs(msg,"types",params,undefined,true); 
			

			svc.listStudioComponents(params,cb);
		}

		
		service.ListStudioMembers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.listStudioMembers(params,cb);
		}

		
		service.ListStudios=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listStudios(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutLaunchProfileMembers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"members",params,undefined,false); 
			copyArgs(n,"launchProfileId",params,undefined,false); 
			copyArgs(n,"identityStoreId",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"identityStoreId",params,undefined,false); 
			copyArgs(n,"launchProfileId",params,undefined,false); 
			copyArgs(n,"members",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"identityStoreId",params,undefined,false); 
			copyArgs(msg,"launchProfileId",params,undefined,false); 
			copyArgs(msg,"members",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.putLaunchProfileMembers(params,cb);
		}

		
		service.PutStudioMembers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"members",params,undefined,false); 
			copyArgs(n,"identityStoreId",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"identityStoreId",params,undefined,false); 
			copyArgs(n,"members",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"identityStoreId",params,undefined,false); 
			copyArgs(msg,"members",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.putStudioMembers(params,cb);
		}

		
		service.StartStudioSSOConfigurationRepair=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.startStudioSSOConfigurationRepair(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"tagKeys",params,undefined,true); 
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,true); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tagKeys",params,undefined,true); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateLaunchProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"launchProfileId",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"launchProfileId",params,undefined,false); 
			copyArgs(n,"launchProfileProtocolVersions",params,undefined,true); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"streamConfiguration",params,undefined,true); 
			copyArgs(n,"studioComponentIds",params,undefined,true); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"launchProfileId",params,undefined,false); 
			copyArgs(msg,"launchProfileProtocolVersions",params,undefined,true); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"streamConfiguration",params,undefined,true); 
			copyArgs(msg,"studioComponentIds",params,undefined,true); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.updateLaunchProfile(params,cb);
		}

		
		service.UpdateLaunchProfileMember=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"persona",params,undefined,false); 
			copyArgs(n,"principalId",params,undefined,false); 
			copyArgs(n,"launchProfileId",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"launchProfileId",params,undefined,false); 
			copyArgs(n,"persona",params,undefined,false); 
			copyArgs(n,"principalId",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"launchProfileId",params,undefined,false); 
			copyArgs(msg,"persona",params,undefined,false); 
			copyArgs(msg,"principalId",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.updateLaunchProfileMember(params,cb);
		}

		
		service.UpdateStreamingImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"streamingImageId",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"streamingImageId",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"streamingImageId",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			

			svc.updateStreamingImage(params,cb);
		}

		
		service.UpdateStudio=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			
			copyArgs(n,"adminRoleArn",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"displayName",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"userRoleArn",params,undefined,false); 
			
			copyArgs(msg,"adminRoleArn",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"displayName",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			copyArgs(msg,"userRoleArn",params,undefined,false); 
			

			svc.updateStudio(params,cb);
		}

		
		service.UpdateStudioComponent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"studioComponentId",params,undefined,false); 
			
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"configuration",params,undefined,true); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"ec2SecurityGroupIds",params,undefined,true); 
			copyArgs(n,"initializationScripts",params,undefined,true); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"scriptParameters",params,undefined,true); 
			copyArgs(n,"studioComponentId",params,undefined,false); 
			copyArgs(n,"studioId",params,undefined,false); 
			copyArgs(n,"subtype",params,undefined,false); 
			copyArgs(n,"type",params,undefined,false); 
			
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"configuration",params,undefined,true); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"ec2SecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"initializationScripts",params,undefined,true); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"scriptParameters",params,undefined,true); 
			copyArgs(msg,"studioComponentId",params,undefined,false); 
			copyArgs(msg,"studioId",params,undefined,false); 
			copyArgs(msg,"subtype",params,undefined,false); 
			copyArgs(msg,"type",params,undefined,false); 
			

			svc.updateStudioComponent(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Nimble", AmazonAPINode);

};
