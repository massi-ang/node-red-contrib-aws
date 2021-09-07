
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

		var awsService = new AWS.ServerlessApplicationRepository( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.ServerlessApplicationRepository(msg.AWSConfig) : awsService;

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

		
		service.CreateApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Author",params,undefined,false); 
			
			copyArgs(n,"Author",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"HomePageUrl",params,undefined,false); 
			copyArgs(n,"Labels",params,undefined,true); 
			copyArgs(n,"LicenseBody",params,undefined,false); 
			copyArgs(n,"LicenseUrl",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ReadmeBody",params,undefined,false); 
			copyArgs(n,"ReadmeUrl",params,undefined,false); 
			copyArgs(n,"SemanticVersion",params,undefined,false); 
			copyArgs(n,"SourceCodeArchiveUrl",params,undefined,false); 
			copyArgs(n,"SourceCodeUrl",params,undefined,false); 
			copyArgs(n,"SpdxLicenseId",params,undefined,false); 
			copyArgs(n,"TemplateBody",params,undefined,false); 
			copyArgs(n,"TemplateUrl",params,undefined,false); 
			
			copyArgs(msg,"Author",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"HomePageUrl",params,undefined,false); 
			copyArgs(msg,"Labels",params,undefined,true); 
			copyArgs(msg,"LicenseBody",params,undefined,false); 
			copyArgs(msg,"LicenseUrl",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ReadmeBody",params,undefined,false); 
			copyArgs(msg,"ReadmeUrl",params,undefined,false); 
			copyArgs(msg,"SemanticVersion",params,undefined,false); 
			copyArgs(msg,"SourceCodeArchiveUrl",params,undefined,false); 
			copyArgs(msg,"SourceCodeUrl",params,undefined,false); 
			copyArgs(msg,"SpdxLicenseId",params,undefined,false); 
			copyArgs(msg,"TemplateBody",params,undefined,false); 
			copyArgs(msg,"TemplateUrl",params,undefined,false); 
			

			svc.createApplication(params,cb);
		}

		
		service.CreateApplicationVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"SemanticVersion",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"SemanticVersion",params,undefined,false); 
			copyArgs(n,"SourceCodeArchiveUrl",params,undefined,false); 
			copyArgs(n,"SourceCodeUrl",params,undefined,false); 
			copyArgs(n,"TemplateBody",params,undefined,false); 
			copyArgs(n,"TemplateUrl",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"SemanticVersion",params,undefined,false); 
			copyArgs(msg,"SourceCodeArchiveUrl",params,undefined,false); 
			copyArgs(msg,"SourceCodeUrl",params,undefined,false); 
			copyArgs(msg,"TemplateBody",params,undefined,false); 
			copyArgs(msg,"TemplateUrl",params,undefined,false); 
			

			svc.createApplicationVersion(params,cb);
		}

		
		service.CreateCloudFormationChangeSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"StackName",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"Capabilities",params,undefined,true); 
			copyArgs(n,"ChangeSetName",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"NotificationArns",params,undefined,true); 
			copyArgs(n,"ParameterOverrides",params,undefined,false); 
			copyArgs(n,"ResourceTypes",params,undefined,true); 
			copyArgs(n,"RollbackConfiguration",params,undefined,false); 
			copyArgs(n,"SemanticVersion",params,undefined,false); 
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,false); 
			copyArgs(n,"TemplateId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"Capabilities",params,undefined,true); 
			copyArgs(msg,"ChangeSetName",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"NotificationArns",params,undefined,true); 
			copyArgs(msg,"ParameterOverrides",params,undefined,false); 
			copyArgs(msg,"ResourceTypes",params,undefined,true); 
			copyArgs(msg,"RollbackConfiguration",params,undefined,false); 
			copyArgs(msg,"SemanticVersion",params,undefined,false); 
			copyArgs(msg,"StackName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,false); 
			copyArgs(msg,"TemplateId",params,undefined,false); 
			

			svc.createCloudFormationChangeSet(params,cb);
		}

		
		service.CreateCloudFormationTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"SemanticVersion",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"SemanticVersion",params,undefined,false); 
			

			svc.createCloudFormationTemplate(params,cb);
		}

		
		service.DeleteApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.deleteApplication(params,cb);
		}

		
		service.GetApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"SemanticVersion",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"SemanticVersion",params,undefined,false); 
			

			svc.getApplication(params,cb);
		}

		
		service.GetApplicationPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.getApplicationPolicy(params,cb);
		}

		
		service.GetCloudFormationTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"TemplateId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"TemplateId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"TemplateId",params,undefined,false); 
			

			svc.getCloudFormationTemplate(params,cb);
		}

		
		service.ListApplicationDependencies=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"SemanticVersion",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"SemanticVersion",params,undefined,false); 
			

			svc.listApplicationDependencies(params,cb);
		}

		
		service.ListApplicationVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listApplicationVersions(params,cb);
		}

		
		service.ListApplications=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxItems",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxItems",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listApplications(params,cb);
		}

		
		service.PutApplicationPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"Statements",params,undefined,true); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"Statements",params,undefined,true); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"Statements",params,undefined,true); 
			

			svc.putApplicationPolicy(params,cb);
		}

		
		service.UnshareApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"OrganizationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"OrganizationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"OrganizationId",params,undefined,false); 
			

			svc.unshareApplication(params,cb);
		}

		
		service.UpdateApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"Author",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"HomePageUrl",params,undefined,false); 
			copyArgs(n,"Labels",params,undefined,true); 
			copyArgs(n,"ReadmeBody",params,undefined,false); 
			copyArgs(n,"ReadmeUrl",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"Author",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"HomePageUrl",params,undefined,false); 
			copyArgs(msg,"Labels",params,undefined,true); 
			copyArgs(msg,"ReadmeBody",params,undefined,false); 
			copyArgs(msg,"ReadmeUrl",params,undefined,false); 
			

			svc.updateApplication(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS ServerlessApplicationRepository", AmazonAPINode);

};
