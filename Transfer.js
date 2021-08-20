
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

		var awsService = new AWS.Transfer( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Transfer(msg.AWSConfig) : awsService;

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

		
		service.CreateAccess=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Role",params,undefined,false); 
			copyArg(n,"ServerId",params,undefined,false); 
			copyArg(n,"ExternalId",params,undefined,false); 
			
			copyArg(msg,"HomeDirectory",params,undefined,false); 
			copyArg(msg,"HomeDirectoryType",params,undefined,false); 
			copyArg(msg,"HomeDirectoryMappings",params,undefined,true); 
			copyArg(msg,"Policy",params,undefined,false); 
			copyArg(msg,"PosixProfile",params,undefined,true); 
			copyArg(msg,"Role",params,undefined,false); 
			copyArg(msg,"ServerId",params,undefined,false); 
			copyArg(msg,"ExternalId",params,undefined,false); 
			

			svc.createAccess(params,cb);
		}

		
		service.CreateServer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Certificate",params,undefined,false); 
			copyArg(msg,"Domain",params,undefined,false); 
			copyArg(msg,"EndpointDetails",params,undefined,true); 
			copyArg(msg,"EndpointType",params,undefined,false); 
			copyArg(msg,"HostKey",params,undefined,true); 
			copyArg(msg,"IdentityProviderDetails",params,undefined,true); 
			copyArg(msg,"IdentityProviderType",params,undefined,false); 
			copyArg(msg,"LoggingRole",params,undefined,false); 
			copyArg(msg,"Protocols",params,undefined,true); 
			copyArg(msg,"SecurityPolicyName",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createServer(params,cb);
		}

		
		service.CreateUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Role",params,undefined,false); 
			copyArg(n,"ServerId",params,undefined,false); 
			copyArg(n,"UserName",params,undefined,false); 
			
			copyArg(msg,"HomeDirectory",params,undefined,false); 
			copyArg(msg,"HomeDirectoryType",params,undefined,false); 
			copyArg(msg,"HomeDirectoryMappings",params,undefined,true); 
			copyArg(msg,"Policy",params,undefined,false); 
			copyArg(msg,"PosixProfile",params,undefined,true); 
			copyArg(msg,"Role",params,undefined,false); 
			copyArg(msg,"ServerId",params,undefined,false); 
			copyArg(msg,"SshPublicKeyBody",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"UserName",params,undefined,false); 
			

			svc.createUser(params,cb);
		}

		
		service.DeleteAccess=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerId",params,undefined,false); 
			copyArg(n,"ExternalId",params,undefined,false); 
			
			copyArg(msg,"ServerId",params,undefined,false); 
			copyArg(msg,"ExternalId",params,undefined,false); 
			

			svc.deleteAccess(params,cb);
		}

		
		service.DeleteServer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerId",params,undefined,false); 
			
			copyArg(msg,"ServerId",params,undefined,false); 
			

			svc.deleteServer(params,cb);
		}

		
		service.DeleteSshPublicKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerId",params,undefined,false); 
			copyArg(n,"SshPublicKeyId",params,undefined,false); 
			copyArg(n,"UserName",params,undefined,false); 
			
			copyArg(msg,"ServerId",params,undefined,false); 
			copyArg(msg,"SshPublicKeyId",params,undefined,false); 
			copyArg(msg,"UserName",params,undefined,false); 
			

			svc.deleteSshPublicKey(params,cb);
		}

		
		service.DeleteUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerId",params,undefined,false); 
			copyArg(n,"UserName",params,undefined,false); 
			
			copyArg(msg,"ServerId",params,undefined,false); 
			copyArg(msg,"UserName",params,undefined,false); 
			

			svc.deleteUser(params,cb);
		}

		
		service.DescribeAccess=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerId",params,undefined,false); 
			copyArg(n,"ExternalId",params,undefined,false); 
			
			copyArg(msg,"ServerId",params,undefined,false); 
			copyArg(msg,"ExternalId",params,undefined,false); 
			

			svc.describeAccess(params,cb);
		}

		
		service.DescribeSecurityPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SecurityPolicyName",params,undefined,false); 
			
			copyArg(msg,"SecurityPolicyName",params,undefined,false); 
			

			svc.describeSecurityPolicy(params,cb);
		}

		
		service.DescribeServer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerId",params,undefined,false); 
			
			copyArg(msg,"ServerId",params,undefined,false); 
			

			svc.describeServer(params,cb);
		}

		
		service.DescribeUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerId",params,undefined,false); 
			copyArg(n,"UserName",params,undefined,false); 
			
			copyArg(msg,"ServerId",params,undefined,false); 
			copyArg(msg,"UserName",params,undefined,false); 
			

			svc.describeUser(params,cb);
		}

		
		service.ImportSshPublicKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerId",params,undefined,false); 
			copyArg(n,"SshPublicKeyBody",params,undefined,false); 
			copyArg(n,"UserName",params,undefined,false); 
			
			copyArg(msg,"ServerId",params,undefined,false); 
			copyArg(msg,"SshPublicKeyBody",params,undefined,false); 
			copyArg(msg,"UserName",params,undefined,false); 
			

			svc.importSshPublicKey(params,cb);
		}

		
		service.ListAccesses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerId",params,undefined,false); 
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"ServerId",params,undefined,false); 
			

			svc.listAccesses(params,cb);
		}

		
		service.ListSecurityPolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listSecurityPolicies(params,cb);
		}

		
		service.ListServers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listServers(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Arn",params,undefined,false); 
			
			copyArg(msg,"Arn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListUsers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerId",params,undefined,false); 
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"ServerId",params,undefined,false); 
			

			svc.listUsers(params,cb);
		}

		
		service.StartServer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerId",params,undefined,false); 
			
			copyArg(msg,"ServerId",params,undefined,false); 
			

			svc.startServer(params,cb);
		}

		
		service.StopServer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerId",params,undefined,false); 
			
			copyArg(msg,"ServerId",params,undefined,false); 
			

			svc.stopServer(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Arn",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"Arn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.TestIdentityProvider=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerId",params,undefined,false); 
			copyArg(n,"UserName",params,undefined,false); 
			
			copyArg(msg,"ServerId",params,undefined,false); 
			copyArg(msg,"ServerProtocol",params,undefined,false); 
			copyArg(msg,"SourceIp",params,undefined,false); 
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"UserPassword",params,undefined,false); 
			

			svc.testIdentityProvider(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Arn",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"Arn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateAccess=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerId",params,undefined,false); 
			copyArg(n,"ExternalId",params,undefined,false); 
			
			copyArg(msg,"HomeDirectory",params,undefined,false); 
			copyArg(msg,"HomeDirectoryType",params,undefined,false); 
			copyArg(msg,"HomeDirectoryMappings",params,undefined,true); 
			copyArg(msg,"Policy",params,undefined,false); 
			copyArg(msg,"PosixProfile",params,undefined,true); 
			copyArg(msg,"Role",params,undefined,false); 
			copyArg(msg,"ServerId",params,undefined,false); 
			copyArg(msg,"ExternalId",params,undefined,false); 
			

			svc.updateAccess(params,cb);
		}

		
		service.UpdateServer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerId",params,undefined,false); 
			
			copyArg(msg,"Certificate",params,undefined,false); 
			copyArg(msg,"ProtocolDetails",params,undefined,true); 
			copyArg(msg,"EndpointDetails",params,undefined,true); 
			copyArg(msg,"EndpointType",params,undefined,false); 
			copyArg(msg,"HostKey",params,undefined,true); 
			copyArg(msg,"IdentityProviderDetails",params,undefined,true); 
			copyArg(msg,"LoggingRole",params,undefined,false); 
			copyArg(msg,"Protocols",params,undefined,true); 
			copyArg(msg,"SecurityPolicyName",params,undefined,false); 
			copyArg(msg,"ServerId",params,undefined,false); 
			

			svc.updateServer(params,cb);
		}

		
		service.UpdateUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerId",params,undefined,false); 
			copyArg(n,"UserName",params,undefined,false); 
			
			copyArg(msg,"HomeDirectory",params,undefined,false); 
			copyArg(msg,"HomeDirectoryType",params,undefined,false); 
			copyArg(msg,"HomeDirectoryMappings",params,undefined,true); 
			copyArg(msg,"Policy",params,undefined,false); 
			copyArg(msg,"PosixProfile",params,undefined,true); 
			copyArg(msg,"Role",params,undefined,false); 
			copyArg(msg,"ServerId",params,undefined,false); 
			copyArg(msg,"UserName",params,undefined,false); 
			

			svc.updateUser(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Transfer", AmazonAPINode);

};
