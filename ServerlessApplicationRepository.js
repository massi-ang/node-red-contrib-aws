
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

		var awsService = new AWS.ServerlessApplicationRepository( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.ServerlessApplicationRepository(msg.AWSConfig) : awsService;

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

		
		service.CreateApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Description",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Author",params,undefined,false); 
			
			copyArg(msg,"Author",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"HomePageUrl",params,undefined,false); 
			copyArg(msg,"Labels",params,undefined,true); 
			copyArg(msg,"LicenseBody",params,undefined,false); 
			copyArg(msg,"LicenseUrl",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ReadmeBody",params,undefined,false); 
			copyArg(msg,"ReadmeUrl",params,undefined,false); 
			copyArg(msg,"SemanticVersion",params,undefined,false); 
			copyArg(msg,"SourceCodeArchiveUrl",params,undefined,false); 
			copyArg(msg,"SourceCodeUrl",params,undefined,false); 
			copyArg(msg,"SpdxLicenseId",params,undefined,false); 
			copyArg(msg,"TemplateBody",params,undefined,false); 
			copyArg(msg,"TemplateUrl",params,undefined,false); 
			

			svc.createApplication(params,cb);
		}

		
		service.CreateApplicationVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			copyArg(n,"SemanticVersion",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"SemanticVersion",params,undefined,false); 
			copyArg(msg,"SourceCodeArchiveUrl",params,undefined,false); 
			copyArg(msg,"SourceCodeUrl",params,undefined,false); 
			copyArg(msg,"TemplateBody",params,undefined,false); 
			copyArg(msg,"TemplateUrl",params,undefined,false); 
			

			svc.createApplicationVersion(params,cb);
		}

		
		service.CreateCloudFormationChangeSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			copyArg(n,"StackName",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"Capabilities",params,undefined,true); 
			copyArg(msg,"ChangeSetName",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"NotificationArns",params,undefined,true); 
			copyArg(msg,"ParameterOverrides",params,undefined,false); 
			copyArg(msg,"ResourceTypes",params,undefined,true); 
			copyArg(msg,"RollbackConfiguration",params,undefined,false); 
			copyArg(msg,"SemanticVersion",params,undefined,false); 
			copyArg(msg,"StackName",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,false); 
			copyArg(msg,"TemplateId",params,undefined,false); 
			

			svc.createCloudFormationChangeSet(params,cb);
		}

		
		service.CreateCloudFormationTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"SemanticVersion",params,undefined,false); 
			

			svc.createCloudFormationTemplate(params,cb);
		}

		
		service.DeleteApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			

			svc.deleteApplication(params,cb);
		}

		
		service.GetApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"SemanticVersion",params,undefined,false); 
			

			svc.getApplication(params,cb);
		}

		
		service.GetApplicationPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			

			svc.getApplicationPolicy(params,cb);
		}

		
		service.GetCloudFormationTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			copyArg(n,"TemplateId",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"TemplateId",params,undefined,false); 
			

			svc.getCloudFormationTemplate(params,cb);
		}

		
		service.ListApplicationDependencies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"SemanticVersion",params,undefined,false); 
			

			svc.listApplicationDependencies(params,cb);
		}

		
		service.ListApplicationVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listApplicationVersions(params,cb);
		}

		
		service.ListApplications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxItems",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listApplications(params,cb);
		}

		
		service.PutApplicationPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			copyArg(n,"Statements",params,undefined,true); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"Statements",params,undefined,true); 
			

			svc.putApplicationPolicy(params,cb);
		}

		
		service.UnshareApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			copyArg(n,"OrganizationId",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"OrganizationId",params,undefined,false); 
			

			svc.unshareApplication(params,cb);
		}

		
		service.UpdateApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"Author",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"HomePageUrl",params,undefined,false); 
			copyArg(msg,"Labels",params,undefined,true); 
			copyArg(msg,"ReadmeBody",params,undefined,false); 
			copyArg(msg,"ReadmeUrl",params,undefined,false); 
			

			svc.updateApplication(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS ServerlessApplicationRepository", AmazonAPINode);

};
