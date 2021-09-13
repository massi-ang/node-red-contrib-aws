
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

		var awsService = new AWS.AmplifyBackend( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.AmplifyBackend(msg.AWSConfig) : awsService;

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
		
		service.CloneBackend=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"TargetEnvironmentName",params,undefined,false); 
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"TargetEnvironmentName",params,undefined,false); 
			
			copyArgs(msg,"AppId",params,undefined,false); 
			copyArgs(msg,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(msg,"TargetEnvironmentName",params,undefined,false); 
			

			svc.cloneBackend(params,cb);
		}
		
		service.CreateBackend=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"AppName",params,undefined,false); 
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"AppName",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"ResourceConfig",params,undefined,false); 
			copyArgs(n,"ResourceName",params,undefined,false); 
			
			copyArgs(msg,"AppId",params,undefined,false); 
			copyArgs(msg,"AppName",params,undefined,false); 
			copyArgs(msg,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(msg,"ResourceConfig",params,undefined,false); 
			copyArgs(msg,"ResourceName",params,undefined,false); 
			

			svc.createBackend(params,cb);
		}
		
		service.CreateBackendAPI=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"ResourceName",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"ResourceConfig",params,undefined,true); 
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"ResourceConfig",params,undefined,true); 
			copyArgs(n,"ResourceName",params,undefined,false); 
			
			copyArgs(msg,"AppId",params,undefined,false); 
			copyArgs(msg,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(msg,"ResourceConfig",params,undefined,true); 
			copyArgs(msg,"ResourceName",params,undefined,false); 
			

			svc.createBackendAPI(params,cb);
		}
		
		service.CreateBackendAuth=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"ResourceName",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"ResourceConfig",params,undefined,true); 
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"ResourceConfig",params,undefined,true); 
			copyArgs(n,"ResourceName",params,undefined,false); 
			
			copyArgs(msg,"AppId",params,undefined,false); 
			copyArgs(msg,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(msg,"ResourceConfig",params,undefined,true); 
			copyArgs(msg,"ResourceName",params,undefined,false); 
			

			svc.createBackendAuth(params,cb);
		}
		
		service.CreateBackendConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppId",params,undefined,false); 
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendManagerAppId",params,undefined,false); 
			
			copyArgs(msg,"AppId",params,undefined,false); 
			copyArgs(msg,"BackendManagerAppId",params,undefined,false); 
			

			svc.createBackendConfig(params,cb);
		}
		
		service.CreateToken=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppId",params,undefined,false); 
			
			copyArgs(n,"AppId",params,undefined,false); 
			
			copyArgs(msg,"AppId",params,undefined,false); 
			

			svc.createToken(params,cb);
		}
		
		service.DeleteBackend=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			
			copyArgs(msg,"AppId",params,undefined,false); 
			copyArgs(msg,"BackendEnvironmentName",params,undefined,false); 
			

			svc.deleteBackend(params,cb);
		}
		
		service.DeleteBackendAPI=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"ResourceName",params,undefined,false); 
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"ResourceConfig",params,undefined,true); 
			copyArgs(n,"ResourceName",params,undefined,false); 
			
			copyArgs(msg,"AppId",params,undefined,false); 
			copyArgs(msg,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(msg,"ResourceConfig",params,undefined,true); 
			copyArgs(msg,"ResourceName",params,undefined,false); 
			

			svc.deleteBackendAPI(params,cb);
		}
		
		service.DeleteBackendAuth=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"ResourceName",params,undefined,false); 
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"ResourceName",params,undefined,false); 
			
			copyArgs(msg,"AppId",params,undefined,false); 
			copyArgs(msg,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(msg,"ResourceName",params,undefined,false); 
			

			svc.deleteBackendAuth(params,cb);
		}
		
		service.DeleteToken=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SessionId",params,undefined,false); 
			copyArgs(n,"AppId",params,undefined,false); 
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"SessionId",params,undefined,false); 
			
			copyArgs(msg,"AppId",params,undefined,false); 
			copyArgs(msg,"SessionId",params,undefined,false); 
			

			svc.deleteToken(params,cb);
		}
		
		service.GenerateBackendAPIModels=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"ResourceName",params,undefined,false); 
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"ResourceName",params,undefined,false); 
			
			copyArgs(msg,"AppId",params,undefined,false); 
			copyArgs(msg,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(msg,"ResourceName",params,undefined,false); 
			

			svc.generateBackendAPIModels(params,cb);
		}
		
		service.GetBackend=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppId",params,undefined,false); 
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			
			copyArgs(msg,"AppId",params,undefined,false); 
			copyArgs(msg,"BackendEnvironmentName",params,undefined,false); 
			

			svc.getBackend(params,cb);
		}
		
		service.GetBackendAPI=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"ResourceName",params,undefined,false); 
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"ResourceConfig",params,undefined,true); 
			copyArgs(n,"ResourceName",params,undefined,false); 
			
			copyArgs(msg,"AppId",params,undefined,false); 
			copyArgs(msg,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(msg,"ResourceConfig",params,undefined,true); 
			copyArgs(msg,"ResourceName",params,undefined,false); 
			

			svc.getBackendAPI(params,cb);
		}
		
		service.GetBackendAPIModels=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"ResourceName",params,undefined,false); 
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"ResourceName",params,undefined,false); 
			
			copyArgs(msg,"AppId",params,undefined,false); 
			copyArgs(msg,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(msg,"ResourceName",params,undefined,false); 
			

			svc.getBackendAPIModels(params,cb);
		}
		
		service.GetBackendAuth=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"ResourceName",params,undefined,false); 
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"ResourceName",params,undefined,false); 
			
			copyArgs(msg,"AppId",params,undefined,false); 
			copyArgs(msg,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(msg,"ResourceName",params,undefined,false); 
			

			svc.getBackendAuth(params,cb);
		}
		
		service.GetBackendJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"AppId",params,undefined,false); 
			copyArgs(msg,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.getBackendJob(params,cb);
		}
		
		service.GetToken=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SessionId",params,undefined,false); 
			copyArgs(n,"AppId",params,undefined,false); 
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"SessionId",params,undefined,false); 
			
			copyArgs(msg,"AppId",params,undefined,false); 
			copyArgs(msg,"SessionId",params,undefined,false); 
			

			svc.getToken(params,cb);
		}
		
		service.ImportBackendAuth=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"UserPoolId",params,undefined,false); 
			copyArgs(n,"NativeClientId",params,undefined,false); 
			copyArgs(n,"WebClientId",params,undefined,false); 
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"NativeClientId",params,undefined,false); 
			copyArgs(n,"UserPoolId",params,undefined,false); 
			copyArgs(n,"WebClientId",params,undefined,false); 
			
			copyArgs(msg,"AppId",params,undefined,false); 
			copyArgs(msg,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			copyArgs(msg,"NativeClientId",params,undefined,false); 
			copyArgs(msg,"UserPoolId",params,undefined,false); 
			copyArgs(msg,"WebClientId",params,undefined,false); 
			

			svc.importBackendAuth(params,cb);
		}
		
		service.ListBackendJobs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Operation",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(msg,"AppId",params,undefined,false); 
			copyArgs(msg,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(msg,"JobId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Operation",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			

			svc.listBackendJobs(params,cb);
		}
		
		service.RemoveAllBackends=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppId",params,undefined,false); 
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(Boolean(n),"CleanAmplifyApp",params,undefined,false); 
			
			copyArgs(msg,"AppId",params,undefined,false); 
			copyArgs(msg,"CleanAmplifyApp",params,undefined,false); 
			

			svc.removeAllBackends(params,cb);
		}
		
		service.RemoveBackendConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppId",params,undefined,false); 
			
			copyArgs(n,"AppId",params,undefined,false); 
			
			copyArgs(msg,"AppId",params,undefined,false); 
			

			svc.removeBackendConfig(params,cb);
		}
		
		service.UpdateBackendAPI=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"ResourceName",params,undefined,false); 
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"ResourceConfig",params,undefined,true); 
			copyArgs(n,"ResourceName",params,undefined,false); 
			
			copyArgs(msg,"AppId",params,undefined,false); 
			copyArgs(msg,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(msg,"ResourceConfig",params,undefined,true); 
			copyArgs(msg,"ResourceName",params,undefined,false); 
			

			svc.updateBackendAPI(params,cb);
		}
		
		service.UpdateBackendAuth=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"ResourceName",params,undefined,false); 
			copyArgs(n,"ResourceConfig",params,undefined,false); 
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"ResourceConfig",params,undefined,false); 
			copyArgs(n,"ResourceName",params,undefined,false); 
			
			copyArgs(msg,"AppId",params,undefined,false); 
			copyArgs(msg,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(msg,"ResourceConfig",params,undefined,false); 
			copyArgs(msg,"ResourceName",params,undefined,false); 
			

			svc.updateBackendAuth(params,cb);
		}
		
		service.UpdateBackendConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppId",params,undefined,false); 
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"LoginAuthConfig",params,undefined,true); 
			
			copyArgs(msg,"AppId",params,undefined,false); 
			copyArgs(msg,"LoginAuthConfig",params,undefined,true); 
			

			svc.updateBackendConfig(params,cb);
		}
		
		service.UpdateBackendJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(n,"Operation",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(msg,"AppId",params,undefined,false); 
			copyArgs(msg,"BackendEnvironmentName",params,undefined,false); 
			copyArgs(msg,"JobId",params,undefined,false); 
			copyArgs(msg,"Operation",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			

			svc.updateBackendJob(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS AmplifyBackend", AmazonAPINode);

};
