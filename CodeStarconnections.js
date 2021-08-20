
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

		var awsService = new AWS.CodeStarconnections( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.CodeStarconnections(msg.AWSConfig) : awsService;

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

		
		service.CreateConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConnectionName",params,undefined,false); 
			
			copyArg(msg,"ProviderType",params,undefined,false); 
			copyArg(msg,"ConnectionName",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"HostArn",params,undefined,false); 
			

			svc.createConnection(params,cb);
		}

		
		service.CreateHost=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"ProviderType",params,undefined,false); 
			copyArg(n,"ProviderEndpoint",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ProviderType",params,undefined,false); 
			copyArg(msg,"ProviderEndpoint",params,undefined,false); 
			copyArg(msg,"VpcConfiguration",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createHost(params,cb);
		}

		
		service.DeleteConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConnectionArn",params,undefined,false); 
			
			copyArg(msg,"ConnectionArn",params,undefined,false); 
			

			svc.deleteConnection(params,cb);
		}

		
		service.DeleteHost=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HostArn",params,undefined,false); 
			
			copyArg(msg,"HostArn",params,undefined,false); 
			

			svc.deleteHost(params,cb);
		}

		
		service.GetConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConnectionArn",params,undefined,false); 
			
			copyArg(msg,"ConnectionArn",params,undefined,false); 
			

			svc.getConnection(params,cb);
		}

		
		service.GetHost=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HostArn",params,undefined,false); 
			
			copyArg(msg,"HostArn",params,undefined,false); 
			

			svc.getHost(params,cb);
		}

		
		service.ListConnections=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ProviderTypeFilter",params,undefined,false); 
			copyArg(msg,"HostArnFilter",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listConnections(params,cb);
		}

		
		service.ListHosts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listHosts(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateHost=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HostArn",params,undefined,false); 
			
			copyArg(msg,"HostArn",params,undefined,false); 
			copyArg(msg,"ProviderEndpoint",params,undefined,false); 
			copyArg(msg,"VpcConfiguration",params,undefined,true); 
			

			svc.updateHost(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS CodeStarconnections", AmazonAPINode);

};
