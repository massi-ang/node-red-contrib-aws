
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

		var awsService = new AWS.EKS( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.EKS(msg.AWSConfig) : awsService;

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

		
		service.AssociateEncryptionConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"encryptionConfig",params,undefined,true); 
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"encryptionConfig",params,undefined,true); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"clusterName",params,undefined,false); 
			copyArgs(msg,"encryptionConfig",params,undefined,true); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			

			svc.associateEncryptionConfig(params,cb);
		}

		
		service.AssociateIdentityProviderConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"oidc",params,undefined,false); 
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"oidc",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"clusterName",params,undefined,false); 
			copyArgs(msg,"oidc",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			

			svc.associateIdentityProviderConfig(params,cb);
		}

		
		service.CreateAddon=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"addonName",params,undefined,false); 
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"addonName",params,undefined,false); 
			copyArgs(n,"addonVersion",params,undefined,false); 
			copyArgs(n,"serviceAccountRoleArn",params,undefined,false); 
			copyArgs(n,"resolveConflicts",params,undefined,false); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"clusterName",params,undefined,false); 
			copyArgs(msg,"addonName",params,undefined,false); 
			copyArgs(msg,"addonVersion",params,undefined,false); 
			copyArgs(msg,"serviceAccountRoleArn",params,undefined,false); 
			copyArgs(msg,"resolveConflicts",params,undefined,false); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createAddon(params,cb);
		}

		
		service.CreateCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			copyArgs(n,"resourcesVpcConfig",params,undefined,true); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"version",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			copyArgs(n,"resourcesVpcConfig",params,undefined,true); 
			copyArgs(n,"kubernetesNetworkConfig",params,undefined,false); 
			copyArgs(n,"logging",params,undefined,true); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"encryptionConfig",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"version",params,undefined,false); 
			copyArgs(msg,"roleArn",params,undefined,false); 
			copyArgs(msg,"resourcesVpcConfig",params,undefined,true); 
			copyArgs(msg,"kubernetesNetworkConfig",params,undefined,false); 
			copyArgs(msg,"logging",params,undefined,true); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"encryptionConfig",params,undefined,true); 
			

			svc.createCluster(params,cb);
		}

		
		service.CreateFargateProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"fargateProfileName",params,undefined,false); 
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"podExecutionRoleArn",params,undefined,false); 
			
			copyArgs(n,"fargateProfileName",params,undefined,false); 
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"podExecutionRoleArn",params,undefined,false); 
			copyArgs(n,"subnets",params,undefined,true); 
			copyArgs(n,"selectors",params,undefined,true); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"fargateProfileName",params,undefined,false); 
			copyArgs(msg,"clusterName",params,undefined,false); 
			copyArgs(msg,"podExecutionRoleArn",params,undefined,false); 
			copyArgs(msg,"subnets",params,undefined,true); 
			copyArgs(msg,"selectors",params,undefined,true); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createFargateProfile(params,cb);
		}

		
		service.CreateNodegroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"nodegroupName",params,undefined,false); 
			copyArgs(n,"subnets",params,undefined,true); 
			copyArgs(n,"nodeRole",params,undefined,false); 
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"nodegroupName",params,undefined,false); 
			copyArgs(n,"scalingConfig",params,undefined,true); 
			copyArgs(n,"diskSize",params,undefined,false); 
			copyArgs(n,"subnets",params,undefined,true); 
			copyArgs(n,"instanceTypes",params,undefined,true); 
			copyArgs(n,"amiType",params,undefined,false); 
			copyArgs(n,"remoteAccess",params,undefined,true); 
			copyArgs(n,"nodeRole",params,undefined,false); 
			copyArgs(n,"labels",params,undefined,true); 
			copyArgs(n,"taints",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			copyArgs(n,"launchTemplate",params,undefined,true); 
			copyArgs(n,"updateConfig",params,undefined,true); 
			copyArgs(n,"capacityType",params,undefined,false); 
			copyArgs(n,"version",params,undefined,false); 
			copyArgs(n,"releaseVersion",params,undefined,false); 
			
			copyArgs(msg,"clusterName",params,undefined,false); 
			copyArgs(msg,"nodegroupName",params,undefined,false); 
			copyArgs(msg,"scalingConfig",params,undefined,true); 
			copyArgs(msg,"diskSize",params,undefined,false); 
			copyArgs(msg,"subnets",params,undefined,true); 
			copyArgs(msg,"instanceTypes",params,undefined,true); 
			copyArgs(msg,"amiType",params,undefined,false); 
			copyArgs(msg,"remoteAccess",params,undefined,true); 
			copyArgs(msg,"nodeRole",params,undefined,false); 
			copyArgs(msg,"labels",params,undefined,true); 
			copyArgs(msg,"taints",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			copyArgs(msg,"launchTemplate",params,undefined,true); 
			copyArgs(msg,"updateConfig",params,undefined,true); 
			copyArgs(msg,"capacityType",params,undefined,false); 
			copyArgs(msg,"version",params,undefined,false); 
			copyArgs(msg,"releaseVersion",params,undefined,false); 
			

			svc.createNodegroup(params,cb);
		}

		
		service.DeleteAddon=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"addonName",params,undefined,false); 
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"addonName",params,undefined,false); 
			copyArgs(n,"preserve",params,undefined,false); 
			
			copyArgs(msg,"clusterName",params,undefined,false); 
			copyArgs(msg,"addonName",params,undefined,false); 
			copyArgs(msg,"preserve",params,undefined,false); 
			

			svc.deleteAddon(params,cb);
		}

		
		service.DeleteCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.deleteCluster(params,cb);
		}

		
		service.DeleteFargateProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"fargateProfileName",params,undefined,false); 
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"fargateProfileName",params,undefined,false); 
			
			copyArgs(msg,"clusterName",params,undefined,false); 
			copyArgs(msg,"fargateProfileName",params,undefined,false); 
			

			svc.deleteFargateProfile(params,cb);
		}

		
		service.DeleteNodegroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"nodegroupName",params,undefined,false); 
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"nodegroupName",params,undefined,false); 
			
			copyArgs(msg,"clusterName",params,undefined,false); 
			copyArgs(msg,"nodegroupName",params,undefined,false); 
			

			svc.deleteNodegroup(params,cb);
		}

		
		service.DescribeAddon=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"addonName",params,undefined,false); 
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"addonName",params,undefined,false); 
			
			copyArgs(msg,"clusterName",params,undefined,false); 
			copyArgs(msg,"addonName",params,undefined,false); 
			

			svc.describeAddon(params,cb);
		}

		
		service.DescribeAddonVersions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"kubernetesVersion",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"addonName",params,undefined,false); 
			
			copyArgs(msg,"kubernetesVersion",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"addonName",params,undefined,false); 
			

			svc.describeAddonVersions(params,cb);
		}

		
		service.DescribeCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.describeCluster(params,cb);
		}

		
		service.DescribeFargateProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"fargateProfileName",params,undefined,false); 
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"fargateProfileName",params,undefined,false); 
			
			copyArgs(msg,"clusterName",params,undefined,false); 
			copyArgs(msg,"fargateProfileName",params,undefined,false); 
			

			svc.describeFargateProfile(params,cb);
		}

		
		service.DescribeIdentityProviderConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"identityProviderConfig",params,undefined,true); 
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"identityProviderConfig",params,undefined,true); 
			
			copyArgs(msg,"clusterName",params,undefined,false); 
			copyArgs(msg,"identityProviderConfig",params,undefined,true); 
			

			svc.describeIdentityProviderConfig(params,cb);
		}

		
		service.DescribeNodegroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"nodegroupName",params,undefined,false); 
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"nodegroupName",params,undefined,false); 
			
			copyArgs(msg,"clusterName",params,undefined,false); 
			copyArgs(msg,"nodegroupName",params,undefined,false); 
			

			svc.describeNodegroup(params,cb);
		}

		
		service.DescribeUpdate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"updateId",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"updateId",params,undefined,false); 
			copyArgs(n,"nodegroupName",params,undefined,false); 
			copyArgs(n,"addonName",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"updateId",params,undefined,false); 
			copyArgs(msg,"nodegroupName",params,undefined,false); 
			copyArgs(msg,"addonName",params,undefined,false); 
			

			svc.describeUpdate(params,cb);
		}

		
		service.DisassociateIdentityProviderConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"identityProviderConfig",params,undefined,true); 
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"identityProviderConfig",params,undefined,true); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"clusterName",params,undefined,false); 
			copyArgs(msg,"identityProviderConfig",params,undefined,true); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			

			svc.disassociateIdentityProviderConfig(params,cb);
		}

		
		service.ListAddons=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clusterName",params,undefined,false); 
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"clusterName",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listAddons(params,cb);
		}

		
		service.ListClusters=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listClusters(params,cb);
		}

		
		service.ListFargateProfiles=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clusterName",params,undefined,false); 
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"clusterName",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listFargateProfiles(params,cb);
		}

		
		service.ListIdentityProviderConfigs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clusterName",params,undefined,false); 
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"clusterName",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listIdentityProviderConfigs(params,cb);
		}

		
		service.ListNodegroups=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clusterName",params,undefined,false); 
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"clusterName",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listNodegroups(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListUpdates=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"nodegroupName",params,undefined,false); 
			copyArgs(n,"addonName",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"nodegroupName",params,undefined,false); 
			copyArgs(msg,"addonName",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listUpdates(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateAddon=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"addonName",params,undefined,false); 
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"addonName",params,undefined,false); 
			copyArgs(n,"addonVersion",params,undefined,false); 
			copyArgs(n,"serviceAccountRoleArn",params,undefined,false); 
			copyArgs(n,"resolveConflicts",params,undefined,false); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"clusterName",params,undefined,false); 
			copyArgs(msg,"addonName",params,undefined,false); 
			copyArgs(msg,"addonVersion",params,undefined,false); 
			copyArgs(msg,"serviceAccountRoleArn",params,undefined,false); 
			copyArgs(msg,"resolveConflicts",params,undefined,false); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			

			svc.updateAddon(params,cb);
		}

		
		service.UpdateClusterConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"resourcesVpcConfig",params,undefined,true); 
			copyArgs(n,"logging",params,undefined,true); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"resourcesVpcConfig",params,undefined,true); 
			copyArgs(msg,"logging",params,undefined,true); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			

			svc.updateClusterConfig(params,cb);
		}

		
		service.UpdateClusterVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"version",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"version",params,undefined,false); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"version",params,undefined,false); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			

			svc.updateClusterVersion(params,cb);
		}

		
		service.UpdateNodegroupConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"nodegroupName",params,undefined,false); 
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"nodegroupName",params,undefined,false); 
			copyArgs(n,"labels",params,undefined,false); 
			copyArgs(n,"taints",params,undefined,false); 
			copyArgs(n,"scalingConfig",params,undefined,true); 
			copyArgs(n,"updateConfig",params,undefined,true); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"clusterName",params,undefined,false); 
			copyArgs(msg,"nodegroupName",params,undefined,false); 
			copyArgs(msg,"labels",params,undefined,false); 
			copyArgs(msg,"taints",params,undefined,false); 
			copyArgs(msg,"scalingConfig",params,undefined,true); 
			copyArgs(msg,"updateConfig",params,undefined,true); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			

			svc.updateNodegroupConfig(params,cb);
		}

		
		service.UpdateNodegroupVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"nodegroupName",params,undefined,false); 
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"nodegroupName",params,undefined,false); 
			copyArgs(n,"version",params,undefined,false); 
			copyArgs(n,"releaseVersion",params,undefined,false); 
			copyArgs(n,"launchTemplate",params,undefined,true); 
			copyArgs(n,"force",params,undefined,false); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"clusterName",params,undefined,false); 
			copyArgs(msg,"nodegroupName",params,undefined,false); 
			copyArgs(msg,"version",params,undefined,false); 
			copyArgs(msg,"releaseVersion",params,undefined,false); 
			copyArgs(msg,"launchTemplate",params,undefined,true); 
			copyArgs(msg,"force",params,undefined,false); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			

			svc.updateNodegroupVersion(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS EKS", AmazonAPINode);

};
