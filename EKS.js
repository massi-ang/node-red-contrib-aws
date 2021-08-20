
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

		var awsService = new AWS.EKS( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.EKS(msg.AWSConfig) : awsService;

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

		
		service.AssociateEncryptionConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"clusterName",params,undefined,false); 
			copyArg(n,"encryptionConfig",params,undefined,true); 
			
			copyArg(msg,"clusterName",params,undefined,false); 
			copyArg(msg,"encryptionConfig",params,undefined,true); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			

			svc.associateEncryptionConfig(params,cb);
		}

		
		service.AssociateIdentityProviderConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"clusterName",params,undefined,false); 
			copyArg(n,"oidc",params,undefined,false); 
			
			copyArg(msg,"clusterName",params,undefined,false); 
			copyArg(msg,"oidc",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			

			svc.associateIdentityProviderConfig(params,cb);
		}

		
		service.CreateAddon=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"clusterName",params,undefined,false); 
			copyArg(n,"addonName",params,undefined,false); 
			
			copyArg(msg,"clusterName",params,undefined,false); 
			copyArg(msg,"addonName",params,undefined,false); 
			copyArg(msg,"addonVersion",params,undefined,false); 
			copyArg(msg,"serviceAccountRoleArn",params,undefined,false); 
			copyArg(msg,"resolveConflicts",params,undefined,false); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createAddon(params,cb);
		}

		
		service.CreateCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"roleArn",params,undefined,false); 
			copyArg(n,"resourcesVpcConfig",params,undefined,true); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"version",params,undefined,false); 
			copyArg(msg,"roleArn",params,undefined,false); 
			copyArg(msg,"resourcesVpcConfig",params,undefined,true); 
			copyArg(msg,"kubernetesNetworkConfig",params,undefined,false); 
			copyArg(msg,"logging",params,undefined,true); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"encryptionConfig",params,undefined,true); 
			

			svc.createCluster(params,cb);
		}

		
		service.CreateFargateProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"fargateProfileName",params,undefined,false); 
			copyArg(n,"clusterName",params,undefined,false); 
			copyArg(n,"podExecutionRoleArn",params,undefined,false); 
			
			copyArg(msg,"fargateProfileName",params,undefined,false); 
			copyArg(msg,"clusterName",params,undefined,false); 
			copyArg(msg,"podExecutionRoleArn",params,undefined,false); 
			copyArg(msg,"subnets",params,undefined,true); 
			copyArg(msg,"selectors",params,undefined,true); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createFargateProfile(params,cb);
		}

		
		service.CreateNodegroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"clusterName",params,undefined,false); 
			copyArg(n,"nodegroupName",params,undefined,false); 
			copyArg(n,"subnets",params,undefined,true); 
			copyArg(n,"nodeRole",params,undefined,false); 
			
			copyArg(msg,"clusterName",params,undefined,false); 
			copyArg(msg,"nodegroupName",params,undefined,false); 
			copyArg(msg,"scalingConfig",params,undefined,true); 
			copyArg(msg,"diskSize",params,undefined,false); 
			copyArg(msg,"subnets",params,undefined,true); 
			copyArg(msg,"instanceTypes",params,undefined,true); 
			copyArg(msg,"amiType",params,undefined,false); 
			copyArg(msg,"remoteAccess",params,undefined,true); 
			copyArg(msg,"nodeRole",params,undefined,false); 
			copyArg(msg,"labels",params,undefined,true); 
			copyArg(msg,"taints",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			copyArg(msg,"launchTemplate",params,undefined,true); 
			copyArg(msg,"updateConfig",params,undefined,true); 
			copyArg(msg,"capacityType",params,undefined,false); 
			copyArg(msg,"version",params,undefined,false); 
			copyArg(msg,"releaseVersion",params,undefined,false); 
			

			svc.createNodegroup(params,cb);
		}

		
		service.DeleteAddon=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"clusterName",params,undefined,false); 
			copyArg(n,"addonName",params,undefined,false); 
			
			copyArg(msg,"clusterName",params,undefined,false); 
			copyArg(msg,"addonName",params,undefined,false); 
			

			svc.deleteAddon(params,cb);
		}

		
		service.DeleteCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			

			svc.deleteCluster(params,cb);
		}

		
		service.DeleteFargateProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"clusterName",params,undefined,false); 
			copyArg(n,"fargateProfileName",params,undefined,false); 
			
			copyArg(msg,"clusterName",params,undefined,false); 
			copyArg(msg,"fargateProfileName",params,undefined,false); 
			

			svc.deleteFargateProfile(params,cb);
		}

		
		service.DeleteNodegroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"clusterName",params,undefined,false); 
			copyArg(n,"nodegroupName",params,undefined,false); 
			
			copyArg(msg,"clusterName",params,undefined,false); 
			copyArg(msg,"nodegroupName",params,undefined,false); 
			

			svc.deleteNodegroup(params,cb);
		}

		
		service.DescribeAddon=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"clusterName",params,undefined,false); 
			copyArg(n,"addonName",params,undefined,false); 
			
			copyArg(msg,"clusterName",params,undefined,false); 
			copyArg(msg,"addonName",params,undefined,false); 
			

			svc.describeAddon(params,cb);
		}

		
		service.DescribeAddonVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"kubernetesVersion",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"addonName",params,undefined,false); 
			

			svc.describeAddonVersions(params,cb);
		}

		
		service.DescribeCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			

			svc.describeCluster(params,cb);
		}

		
		service.DescribeFargateProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"clusterName",params,undefined,false); 
			copyArg(n,"fargateProfileName",params,undefined,false); 
			
			copyArg(msg,"clusterName",params,undefined,false); 
			copyArg(msg,"fargateProfileName",params,undefined,false); 
			

			svc.describeFargateProfile(params,cb);
		}

		
		service.DescribeIdentityProviderConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"clusterName",params,undefined,false); 
			copyArg(n,"identityProviderConfig",params,undefined,true); 
			
			copyArg(msg,"clusterName",params,undefined,false); 
			copyArg(msg,"identityProviderConfig",params,undefined,true); 
			

			svc.describeIdentityProviderConfig(params,cb);
		}

		
		service.DescribeNodegroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"clusterName",params,undefined,false); 
			copyArg(n,"nodegroupName",params,undefined,false); 
			
			copyArg(msg,"clusterName",params,undefined,false); 
			copyArg(msg,"nodegroupName",params,undefined,false); 
			

			svc.describeNodegroup(params,cb);
		}

		
		service.DescribeUpdate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"updateId",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"updateId",params,undefined,false); 
			copyArg(msg,"nodegroupName",params,undefined,false); 
			copyArg(msg,"addonName",params,undefined,false); 
			

			svc.describeUpdate(params,cb);
		}

		
		service.DisassociateIdentityProviderConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"clusterName",params,undefined,false); 
			copyArg(n,"identityProviderConfig",params,undefined,true); 
			
			copyArg(msg,"clusterName",params,undefined,false); 
			copyArg(msg,"identityProviderConfig",params,undefined,true); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			

			svc.disassociateIdentityProviderConfig(params,cb);
		}

		
		service.ListAddons=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"clusterName",params,undefined,false); 
			
			copyArg(msg,"clusterName",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listAddons(params,cb);
		}

		
		service.ListClusters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listClusters(params,cb);
		}

		
		service.ListFargateProfiles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"clusterName",params,undefined,false); 
			
			copyArg(msg,"clusterName",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listFargateProfiles(params,cb);
		}

		
		service.ListIdentityProviderConfigs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"clusterName",params,undefined,false); 
			
			copyArg(msg,"clusterName",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listIdentityProviderConfigs(params,cb);
		}

		
		service.ListNodegroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"clusterName",params,undefined,false); 
			
			copyArg(msg,"clusterName",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listNodegroups(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListUpdates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"nodegroupName",params,undefined,false); 
			copyArg(msg,"addonName",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listUpdates(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"tags",params,undefined,true); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"tagKeys",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateAddon=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"clusterName",params,undefined,false); 
			copyArg(n,"addonName",params,undefined,false); 
			
			copyArg(msg,"clusterName",params,undefined,false); 
			copyArg(msg,"addonName",params,undefined,false); 
			copyArg(msg,"addonVersion",params,undefined,false); 
			copyArg(msg,"serviceAccountRoleArn",params,undefined,false); 
			copyArg(msg,"resolveConflicts",params,undefined,false); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			

			svc.updateAddon(params,cb);
		}

		
		service.UpdateClusterConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"resourcesVpcConfig",params,undefined,true); 
			copyArg(msg,"logging",params,undefined,true); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			

			svc.updateClusterConfig(params,cb);
		}

		
		service.UpdateClusterVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"version",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"version",params,undefined,false); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			

			svc.updateClusterVersion(params,cb);
		}

		
		service.UpdateNodegroupConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"clusterName",params,undefined,false); 
			copyArg(n,"nodegroupName",params,undefined,false); 
			
			copyArg(msg,"clusterName",params,undefined,false); 
			copyArg(msg,"nodegroupName",params,undefined,false); 
			copyArg(msg,"labels",params,undefined,false); 
			copyArg(msg,"taints",params,undefined,false); 
			copyArg(msg,"scalingConfig",params,undefined,true); 
			copyArg(msg,"updateConfig",params,undefined,true); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			

			svc.updateNodegroupConfig(params,cb);
		}

		
		service.UpdateNodegroupVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"clusterName",params,undefined,false); 
			copyArg(n,"nodegroupName",params,undefined,false); 
			
			copyArg(msg,"clusterName",params,undefined,false); 
			copyArg(msg,"nodegroupName",params,undefined,false); 
			copyArg(msg,"version",params,undefined,false); 
			copyArg(msg,"releaseVersion",params,undefined,false); 
			copyArg(msg,"launchTemplate",params,undefined,true); 
			copyArg(msg,"force",params,undefined,false); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			

			svc.updateNodegroupVersion(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS EKS", AmazonAPINode);

};
