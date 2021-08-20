
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

		var awsService = new AWS.CodeArtifact( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.CodeArtifact(msg.AWSConfig) : awsService;

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

		
		service.AssociateExternalConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"repository",params,undefined,false); 
			copyArg(n,"externalConnection",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"domainOwner",params,undefined,false); 
			copyArg(msg,"repository",params,undefined,false); 
			copyArg(msg,"externalConnection",params,undefined,false); 
			

			svc.associateExternalConnection(params,cb);
		}

		
		service.CopyPackageVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"sourceRepository",params,undefined,false); 
			copyArg(n,"destinationRepository",params,undefined,false); 
			copyArg(n,"format",params,undefined,false); 
			copyArg(n,"package",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"domainOwner",params,undefined,false); 
			copyArg(msg,"sourceRepository",params,undefined,false); 
			copyArg(msg,"destinationRepository",params,undefined,false); 
			copyArg(msg,"format",params,undefined,false); 
			copyArg(msg,"namespace",params,undefined,false); 
			copyArg(msg,"package",params,undefined,false); 
			copyArg(msg,"versions",params,undefined,true); 
			copyArg(msg,"versionRevisions",params,undefined,true); 
			copyArg(msg,"allowOverwrite",params,undefined,false); 
			copyArg(msg,"includeFromUpstream",params,undefined,false); 
			

			svc.copyPackageVersions(params,cb);
		}

		
		service.CreateDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"encryptionKey",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createDomain(params,cb);
		}

		
		service.CreateRepository=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"repository",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"domainOwner",params,undefined,false); 
			copyArg(msg,"repository",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"upstreams",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createRepository(params,cb);
		}

		
		service.DeleteDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"domainOwner",params,undefined,false); 
			

			svc.deleteDomain(params,cb);
		}

		
		service.DeleteDomainPermissionsPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"domainOwner",params,undefined,false); 
			copyArg(msg,"policyRevision",params,undefined,false); 
			

			svc.deleteDomainPermissionsPolicy(params,cb);
		}

		
		service.DeletePackageVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"repository",params,undefined,false); 
			copyArg(n,"format",params,undefined,false); 
			copyArg(n,"package",params,undefined,false); 
			copyArg(n,"versions",params,undefined,true); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"domainOwner",params,undefined,false); 
			copyArg(msg,"repository",params,undefined,false); 
			copyArg(msg,"format",params,undefined,false); 
			copyArg(msg,"namespace",params,undefined,false); 
			copyArg(msg,"package",params,undefined,false); 
			copyArg(msg,"versions",params,undefined,true); 
			copyArg(msg,"expectedStatus",params,undefined,false); 
			

			svc.deletePackageVersions(params,cb);
		}

		
		service.DeleteRepository=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"repository",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"domainOwner",params,undefined,false); 
			copyArg(msg,"repository",params,undefined,false); 
			

			svc.deleteRepository(params,cb);
		}

		
		service.DeleteRepositoryPermissionsPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"repository",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"domainOwner",params,undefined,false); 
			copyArg(msg,"repository",params,undefined,false); 
			copyArg(msg,"policyRevision",params,undefined,false); 
			

			svc.deleteRepositoryPermissionsPolicy(params,cb);
		}

		
		service.DescribeDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"domainOwner",params,undefined,false); 
			

			svc.describeDomain(params,cb);
		}

		
		service.DescribePackageVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"repository",params,undefined,false); 
			copyArg(n,"format",params,undefined,false); 
			copyArg(n,"package",params,undefined,false); 
			copyArg(n,"packageVersion",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"domainOwner",params,undefined,false); 
			copyArg(msg,"repository",params,undefined,false); 
			copyArg(msg,"format",params,undefined,false); 
			copyArg(msg,"namespace",params,undefined,false); 
			copyArg(msg,"package",params,undefined,false); 
			copyArg(msg,"packageVersion",params,undefined,false); 
			

			svc.describePackageVersion(params,cb);
		}

		
		service.DescribeRepository=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"repository",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"domainOwner",params,undefined,false); 
			copyArg(msg,"repository",params,undefined,false); 
			

			svc.describeRepository(params,cb);
		}

		
		service.DisassociateExternalConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"repository",params,undefined,false); 
			copyArg(n,"externalConnection",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"domainOwner",params,undefined,false); 
			copyArg(msg,"repository",params,undefined,false); 
			copyArg(msg,"externalConnection",params,undefined,false); 
			

			svc.disassociateExternalConnection(params,cb);
		}

		
		service.DisposePackageVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"repository",params,undefined,false); 
			copyArg(n,"format",params,undefined,false); 
			copyArg(n,"package",params,undefined,false); 
			copyArg(n,"versions",params,undefined,true); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"domainOwner",params,undefined,false); 
			copyArg(msg,"repository",params,undefined,false); 
			copyArg(msg,"format",params,undefined,false); 
			copyArg(msg,"namespace",params,undefined,false); 
			copyArg(msg,"package",params,undefined,false); 
			copyArg(msg,"versions",params,undefined,true); 
			copyArg(msg,"versionRevisions",params,undefined,true); 
			copyArg(msg,"expectedStatus",params,undefined,false); 
			

			svc.disposePackageVersions(params,cb);
		}

		
		service.GetAuthorizationToken=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"domainOwner",params,undefined,false); 
			copyArg(msg,"durationSeconds",params,undefined,false); 
			

			svc.getAuthorizationToken(params,cb);
		}

		
		service.GetDomainPermissionsPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"domainOwner",params,undefined,false); 
			

			svc.getDomainPermissionsPolicy(params,cb);
		}

		
		service.GetPackageVersionAsset=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"repository",params,undefined,false); 
			copyArg(n,"format",params,undefined,false); 
			copyArg(n,"package",params,undefined,false); 
			copyArg(n,"packageVersion",params,undefined,false); 
			copyArg(n,"asset",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"domainOwner",params,undefined,false); 
			copyArg(msg,"repository",params,undefined,false); 
			copyArg(msg,"format",params,undefined,false); 
			copyArg(msg,"namespace",params,undefined,false); 
			copyArg(msg,"package",params,undefined,false); 
			copyArg(msg,"packageVersion",params,undefined,false); 
			copyArg(msg,"asset",params,undefined,false); 
			copyArg(msg,"packageVersionRevision",params,undefined,false); 
			

			svc.getPackageVersionAsset(params,cb);
		}

		
		service.GetPackageVersionReadme=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"repository",params,undefined,false); 
			copyArg(n,"format",params,undefined,false); 
			copyArg(n,"package",params,undefined,false); 
			copyArg(n,"packageVersion",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"domainOwner",params,undefined,false); 
			copyArg(msg,"repository",params,undefined,false); 
			copyArg(msg,"format",params,undefined,false); 
			copyArg(msg,"namespace",params,undefined,false); 
			copyArg(msg,"package",params,undefined,false); 
			copyArg(msg,"packageVersion",params,undefined,false); 
			

			svc.getPackageVersionReadme(params,cb);
		}

		
		service.GetRepositoryEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"repository",params,undefined,false); 
			copyArg(n,"format",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"domainOwner",params,undefined,false); 
			copyArg(msg,"repository",params,undefined,false); 
			copyArg(msg,"format",params,undefined,false); 
			

			svc.getRepositoryEndpoint(params,cb);
		}

		
		service.GetRepositoryPermissionsPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"repository",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"domainOwner",params,undefined,false); 
			copyArg(msg,"repository",params,undefined,false); 
			

			svc.getRepositoryPermissionsPolicy(params,cb);
		}

		
		service.ListDomains=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listDomains(params,cb);
		}

		
		service.ListPackageVersionAssets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"repository",params,undefined,false); 
			copyArg(n,"format",params,undefined,false); 
			copyArg(n,"package",params,undefined,false); 
			copyArg(n,"packageVersion",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"domainOwner",params,undefined,false); 
			copyArg(msg,"repository",params,undefined,false); 
			copyArg(msg,"format",params,undefined,false); 
			copyArg(msg,"namespace",params,undefined,false); 
			copyArg(msg,"package",params,undefined,false); 
			copyArg(msg,"packageVersion",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listPackageVersionAssets(params,cb);
		}

		
		service.ListPackageVersionDependencies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"repository",params,undefined,false); 
			copyArg(n,"format",params,undefined,false); 
			copyArg(n,"package",params,undefined,false); 
			copyArg(n,"packageVersion",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"domainOwner",params,undefined,false); 
			copyArg(msg,"repository",params,undefined,false); 
			copyArg(msg,"format",params,undefined,false); 
			copyArg(msg,"namespace",params,undefined,false); 
			copyArg(msg,"package",params,undefined,false); 
			copyArg(msg,"packageVersion",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listPackageVersionDependencies(params,cb);
		}

		
		service.ListPackageVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"repository",params,undefined,false); 
			copyArg(n,"format",params,undefined,false); 
			copyArg(n,"package",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"domainOwner",params,undefined,false); 
			copyArg(msg,"repository",params,undefined,false); 
			copyArg(msg,"format",params,undefined,false); 
			copyArg(msg,"namespace",params,undefined,false); 
			copyArg(msg,"package",params,undefined,false); 
			copyArg(msg,"status",params,undefined,false); 
			copyArg(msg,"sortBy",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listPackageVersions(params,cb);
		}

		
		service.ListPackages=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"repository",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"domainOwner",params,undefined,false); 
			copyArg(msg,"repository",params,undefined,false); 
			copyArg(msg,"format",params,undefined,false); 
			copyArg(msg,"namespace",params,undefined,false); 
			copyArg(msg,"packagePrefix",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listPackages(params,cb);
		}

		
		service.ListRepositories=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"repositoryPrefix",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listRepositories(params,cb);
		}

		
		service.ListRepositoriesInDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"domainOwner",params,undefined,false); 
			copyArg(msg,"administratorAccount",params,undefined,false); 
			copyArg(msg,"repositoryPrefix",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listRepositoriesInDomain(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutDomainPermissionsPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"policyDocument",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"domainOwner",params,undefined,false); 
			copyArg(msg,"policyRevision",params,undefined,false); 
			copyArg(msg,"policyDocument",params,undefined,false); 
			

			svc.putDomainPermissionsPolicy(params,cb);
		}

		
		service.PutRepositoryPermissionsPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"repository",params,undefined,false); 
			copyArg(n,"policyDocument",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"domainOwner",params,undefined,false); 
			copyArg(msg,"repository",params,undefined,false); 
			copyArg(msg,"policyRevision",params,undefined,false); 
			copyArg(msg,"policyDocument",params,undefined,false); 
			

			svc.putRepositoryPermissionsPolicy(params,cb);
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

		
		service.UpdatePackageVersionsStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"repository",params,undefined,false); 
			copyArg(n,"format",params,undefined,false); 
			copyArg(n,"package",params,undefined,false); 
			copyArg(n,"versions",params,undefined,true); 
			copyArg(n,"targetStatus",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"domainOwner",params,undefined,false); 
			copyArg(msg,"repository",params,undefined,false); 
			copyArg(msg,"format",params,undefined,false); 
			copyArg(msg,"namespace",params,undefined,false); 
			copyArg(msg,"package",params,undefined,false); 
			copyArg(msg,"versions",params,undefined,true); 
			copyArg(msg,"versionRevisions",params,undefined,true); 
			copyArg(msg,"expectedStatus",params,undefined,false); 
			copyArg(msg,"targetStatus",params,undefined,false); 
			

			svc.updatePackageVersionsStatus(params,cb);
		}

		
		service.UpdateRepository=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domain",params,undefined,false); 
			copyArg(n,"repository",params,undefined,false); 
			
			copyArg(msg,"domain",params,undefined,false); 
			copyArg(msg,"domainOwner",params,undefined,false); 
			copyArg(msg,"repository",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"upstreams",params,undefined,true); 
			

			svc.updateRepository(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS CodeArtifact", AmazonAPINode);

};
