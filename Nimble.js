
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

		var awsService = new AWS.Nimble( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Nimble(msg.AWSConfig) : awsService;

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

		
		service.AcceptEulas=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"eulaIds",params,undefined,true); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.acceptEulas(params,cb);
		}

		
		service.CreateLaunchProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ec2SubnetIds",params,undefined,true); 
			copyArg(n,"studioComponentIds",params,undefined,true); 
			copyArg(n,"studioId",params,undefined,false); 
			copyArg(n,"launchProfileProtocolVersions",params,undefined,true); 
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"streamConfiguration",params,undefined,true); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"ec2SubnetIds",params,undefined,true); 
			copyArg(msg,"launchProfileProtocolVersions",params,undefined,true); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"streamConfiguration",params,undefined,true); 
			copyArg(msg,"studioComponentIds",params,undefined,true); 
			copyArg(msg,"studioId",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createLaunchProfile(params,cb);
		}

		
		service.CreateStreamingImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"ec2ImageId",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"ec2ImageId",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createStreamingImage(params,cb);
		}

		
		service.CreateStreamingSession=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"ec2InstanceType",params,undefined,false); 
			copyArg(msg,"launchProfileId",params,undefined,false); 
			copyArg(msg,"ownedBy",params,undefined,false); 
			copyArg(msg,"streamingImageId",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createStreamingSession(params,cb);
		}

		
		service.CreateStreamingSessionStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			copyArg(n,"sessionId",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"expirationInSeconds",params,undefined,false); 
			copyArg(msg,"sessionId",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.createStreamingSessionStream(params,cb);
		}

		
		service.CreateStudio=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"displayName",params,undefined,false); 
			copyArg(n,"studioName",params,undefined,false); 
			copyArg(n,"userRoleArn",params,undefined,false); 
			copyArg(n,"adminRoleArn",params,undefined,false); 
			
			copyArg(msg,"adminRoleArn",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"displayName",params,undefined,false); 
			copyArg(msg,"studioEncryptionConfiguration",params,undefined,true); 
			copyArg(msg,"studioName",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"userRoleArn",params,undefined,false); 
			

			svc.createStudio(params,cb);
		}

		
		service.CreateStudioComponent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"_type",params,"type",false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"configuration",params,undefined,true); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"ec2SecurityGroupIds",params,undefined,true); 
			copyArg(msg,"initializationScripts",params,undefined,true); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"scriptParameters",params,undefined,true); 
			copyArg(msg,"studioId",params,undefined,false); 
			copyArg(msg,"subtype",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"type",params,undefined,false); 
			

			svc.createStudioComponent(params,cb);
		}

		
		service.DeleteLaunchProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			copyArg(n,"launchProfileId",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"launchProfileId",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.deleteLaunchProfile(params,cb);
		}

		
		service.DeleteLaunchProfileMember=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			copyArg(n,"principalId",params,undefined,false); 
			copyArg(n,"launchProfileId",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"launchProfileId",params,undefined,false); 
			copyArg(msg,"principalId",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.deleteLaunchProfileMember(params,cb);
		}

		
		service.DeleteStreamingImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			copyArg(n,"streamingImageId",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"streamingImageId",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.deleteStreamingImage(params,cb);
		}

		
		service.DeleteStreamingSession=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			copyArg(n,"sessionId",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"sessionId",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.deleteStreamingSession(params,cb);
		}

		
		service.DeleteStudio=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.deleteStudio(params,cb);
		}

		
		service.DeleteStudioComponent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			copyArg(n,"studioComponentId",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"studioComponentId",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.deleteStudioComponent(params,cb);
		}

		
		service.DeleteStudioMember=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			copyArg(n,"principalId",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"principalId",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.deleteStudioMember(params,cb);
		}

		
		service.GetEula=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"eulaId",params,undefined,false); 
			
			copyArg(msg,"eulaId",params,undefined,false); 
			

			svc.getEula(params,cb);
		}

		
		service.GetLaunchProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			copyArg(n,"launchProfileId",params,undefined,false); 
			
			copyArg(msg,"launchProfileId",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.getLaunchProfile(params,cb);
		}

		
		service.GetLaunchProfileDetails=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			copyArg(n,"launchProfileId",params,undefined,false); 
			
			copyArg(msg,"launchProfileId",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.getLaunchProfileDetails(params,cb);
		}

		
		service.GetLaunchProfileInitialization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			copyArg(n,"launchProfileProtocolVersions",params,undefined,true); 
			copyArg(n,"launchPurpose",params,undefined,false); 
			copyArg(n,"launchProfileId",params,undefined,false); 
			copyArg(n,"platform",params,undefined,false); 
			
			copyArg(msg,"launchProfileId",params,undefined,false); 
			copyArg(msg,"launchProfileProtocolVersions",params,undefined,true); 
			copyArg(msg,"launchPurpose",params,undefined,false); 
			copyArg(msg,"platform",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.getLaunchProfileInitialization(params,cb);
		}

		
		service.GetLaunchProfileMember=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			copyArg(n,"principalId",params,undefined,false); 
			copyArg(n,"launchProfileId",params,undefined,false); 
			
			copyArg(msg,"launchProfileId",params,undefined,false); 
			copyArg(msg,"principalId",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.getLaunchProfileMember(params,cb);
		}

		
		service.GetStreamingImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			copyArg(n,"streamingImageId",params,undefined,false); 
			
			copyArg(msg,"streamingImageId",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.getStreamingImage(params,cb);
		}

		
		service.GetStreamingSession=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			copyArg(n,"sessionId",params,undefined,false); 
			
			copyArg(msg,"sessionId",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.getStreamingSession(params,cb);
		}

		
		service.GetStreamingSessionStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			copyArg(n,"streamId",params,undefined,false); 
			copyArg(n,"sessionId",params,undefined,false); 
			
			copyArg(msg,"sessionId",params,undefined,false); 
			copyArg(msg,"streamId",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.getStreamingSessionStream(params,cb);
		}

		
		service.GetStudio=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.getStudio(params,cb);
		}

		
		service.GetStudioComponent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			copyArg(n,"studioComponentId",params,undefined,false); 
			
			copyArg(msg,"studioComponentId",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.getStudioComponent(params,cb);
		}

		
		service.GetStudioMember=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			copyArg(n,"principalId",params,undefined,false); 
			
			copyArg(msg,"principalId",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.getStudioMember(params,cb);
		}

		
		service.ListEulaAcceptances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			
			copyArg(msg,"eulaIds",params,undefined,true); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.listEulaAcceptances(params,cb);
		}

		
		service.ListEulas=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"eulaIds",params,undefined,true); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listEulas(params,cb);
		}

		
		service.ListLaunchProfileMembers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			copyArg(n,"launchProfileId",params,undefined,false); 
			
			copyArg(msg,"launchProfileId",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.listLaunchProfileMembers(params,cb);
		}

		
		service.ListLaunchProfiles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"principalId",params,undefined,false); 
			copyArg(msg,"states",params,undefined,true); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.listLaunchProfiles(params,cb);
		}

		
		service.ListStreamingImages=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"owner",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.listStreamingImages(params,cb);
		}

		
		service.ListStreamingSessions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			
			copyArg(msg,"createdBy",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"ownedBy",params,undefined,false); 
			copyArg(msg,"sessionIds",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.listStreamingSessions(params,cb);
		}

		
		service.ListStudioComponents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"states",params,undefined,true); 
			copyArg(msg,"studioId",params,undefined,false); 
			copyArg(msg,"types",params,undefined,true); 
			

			svc.listStudioComponents(params,cb);
		}

		
		service.ListStudioMembers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.listStudioMembers(params,cb);
		}

		
		service.ListStudios=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listStudios(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutLaunchProfileMembers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			copyArg(n,"members",params,undefined,false); 
			copyArg(n,"launchProfileId",params,undefined,false); 
			copyArg(n,"identityStoreId",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"identityStoreId",params,undefined,false); 
			copyArg(msg,"launchProfileId",params,undefined,false); 
			copyArg(msg,"members",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.putLaunchProfileMembers(params,cb);
		}

		
		service.PutStudioMembers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			copyArg(n,"members",params,undefined,false); 
			copyArg(n,"identityStoreId",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"identityStoreId",params,undefined,false); 
			copyArg(msg,"members",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.putStudioMembers(params,cb);
		}

		
		service.StartStudioSSOConfigurationRepair=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.startStudioSSOConfigurationRepair(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"tagKeys",params,undefined,true); 
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tagKeys",params,undefined,true); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateLaunchProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			copyArg(n,"launchProfileId",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"launchProfileId",params,undefined,false); 
			copyArg(msg,"launchProfileProtocolVersions",params,undefined,true); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"streamConfiguration",params,undefined,true); 
			copyArg(msg,"studioComponentIds",params,undefined,true); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.updateLaunchProfile(params,cb);
		}

		
		service.UpdateLaunchProfileMember=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			copyArg(n,"persona",params,undefined,false); 
			copyArg(n,"principalId",params,undefined,false); 
			copyArg(n,"launchProfileId",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"launchProfileId",params,undefined,false); 
			copyArg(msg,"persona",params,undefined,false); 
			copyArg(msg,"principalId",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.updateLaunchProfileMember(params,cb);
		}

		
		service.UpdateStreamingImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			copyArg(n,"streamingImageId",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"streamingImageId",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			

			svc.updateStreamingImage(params,cb);
		}

		
		service.UpdateStudio=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			
			copyArg(msg,"adminRoleArn",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"displayName",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			copyArg(msg,"userRoleArn",params,undefined,false); 
			

			svc.updateStudio(params,cb);
		}

		
		service.UpdateStudioComponent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"studioId",params,undefined,false); 
			copyArg(n,"studioComponentId",params,undefined,false); 
			
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"configuration",params,undefined,true); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"ec2SecurityGroupIds",params,undefined,true); 
			copyArg(msg,"initializationScripts",params,undefined,true); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"scriptParameters",params,undefined,true); 
			copyArg(msg,"studioComponentId",params,undefined,false); 
			copyArg(msg,"studioId",params,undefined,false); 
			copyArg(msg,"subtype",params,undefined,false); 
			copyArg(msg,"type",params,undefined,false); 
			

			svc.updateStudioComponent(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Nimble", AmazonAPINode);

};
