
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

		var awsService = new AWS.Schemas( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Schemas(msg.AWSConfig) : awsService;

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

		
		service.CreateDiscoverer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceArn",params,undefined,false); 
			
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"SourceArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createDiscoverer(params,cb);
		}

		
		service.CreateRegistry=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RegistryName",params,undefined,false); 
			
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"RegistryName",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createRegistry(params,cb);
		}

		
		service.CreateSchema=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RegistryName",params,undefined,false); 
			copyArg(n,"SchemaName",params,undefined,false); 
			copyArg(n,"Type",params,undefined,false); 
			copyArg(n,"Content",params,undefined,false); 
			
			copyArg(msg,"Content",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"RegistryName",params,undefined,false); 
			copyArg(msg,"SchemaName",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"Type",params,undefined,false); 
			

			svc.createSchema(params,cb);
		}

		
		service.DeleteDiscoverer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DiscovererId",params,undefined,false); 
			
			copyArg(msg,"DiscovererId",params,undefined,false); 
			

			svc.deleteDiscoverer(params,cb);
		}

		
		service.DeleteRegistry=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RegistryName",params,undefined,false); 
			
			copyArg(msg,"RegistryName",params,undefined,false); 
			

			svc.deleteRegistry(params,cb);
		}

		
		service.DeleteResourcePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"RegistryName",params,undefined,false); 
			

			svc.deleteResourcePolicy(params,cb);
		}

		
		service.DeleteSchema=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RegistryName",params,undefined,false); 
			copyArg(n,"SchemaName",params,undefined,false); 
			
			copyArg(msg,"RegistryName",params,undefined,false); 
			copyArg(msg,"SchemaName",params,undefined,false); 
			

			svc.deleteSchema(params,cb);
		}

		
		service.DeleteSchemaVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SchemaVersion",params,undefined,false); 
			copyArg(n,"RegistryName",params,undefined,false); 
			copyArg(n,"SchemaName",params,undefined,false); 
			
			copyArg(msg,"RegistryName",params,undefined,false); 
			copyArg(msg,"SchemaName",params,undefined,false); 
			copyArg(msg,"SchemaVersion",params,undefined,false); 
			

			svc.deleteSchemaVersion(params,cb);
		}

		
		service.DescribeCodeBinding=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RegistryName",params,undefined,false); 
			copyArg(n,"SchemaName",params,undefined,false); 
			copyArg(n,"Language",params,undefined,false); 
			
			copyArg(msg,"Language",params,undefined,false); 
			copyArg(msg,"RegistryName",params,undefined,false); 
			copyArg(msg,"SchemaName",params,undefined,false); 
			copyArg(msg,"SchemaVersion",params,undefined,false); 
			

			svc.describeCodeBinding(params,cb);
		}

		
		service.DescribeDiscoverer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DiscovererId",params,undefined,false); 
			
			copyArg(msg,"DiscovererId",params,undefined,false); 
			

			svc.describeDiscoverer(params,cb);
		}

		
		service.DescribeRegistry=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RegistryName",params,undefined,false); 
			
			copyArg(msg,"RegistryName",params,undefined,false); 
			

			svc.describeRegistry(params,cb);
		}

		
		service.DescribeSchema=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RegistryName",params,undefined,false); 
			copyArg(n,"SchemaName",params,undefined,false); 
			
			copyArg(msg,"RegistryName",params,undefined,false); 
			copyArg(msg,"SchemaName",params,undefined,false); 
			copyArg(msg,"SchemaVersion",params,undefined,false); 
			

			svc.describeSchema(params,cb);
		}

		
		service.ExportSchema=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RegistryName",params,undefined,false); 
			copyArg(n,"SchemaName",params,undefined,false); 
			copyArg(n,"Type",params,undefined,false); 
			
			copyArg(msg,"RegistryName",params,undefined,false); 
			copyArg(msg,"SchemaName",params,undefined,false); 
			copyArg(msg,"SchemaVersion",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			

			svc.exportSchema(params,cb);
		}

		
		service.GetCodeBindingSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RegistryName",params,undefined,false); 
			copyArg(n,"SchemaName",params,undefined,false); 
			copyArg(n,"Language",params,undefined,false); 
			
			copyArg(msg,"Language",params,undefined,false); 
			copyArg(msg,"RegistryName",params,undefined,false); 
			copyArg(msg,"SchemaName",params,undefined,false); 
			copyArg(msg,"SchemaVersion",params,undefined,false); 
			

			svc.getCodeBindingSource(params,cb);
		}

		
		service.GetDiscoveredSchema=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Type",params,undefined,false); 
			copyArg(n,"Events",params,undefined,false); 
			
			copyArg(msg,"Events",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			

			svc.getDiscoveredSchema(params,cb);
		}

		
		service.GetResourcePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"RegistryName",params,undefined,false); 
			

			svc.getResourcePolicy(params,cb);
		}

		
		service.ListDiscoverers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DiscovererIdPrefix",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"SourceArnPrefix",params,undefined,false); 
			

			svc.listDiscoverers(params,cb);
		}

		
		service.ListRegistries=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"RegistryNamePrefix",params,undefined,false); 
			copyArg(msg,"Scope",params,undefined,false); 
			

			svc.listRegistries(params,cb);
		}

		
		service.ListSchemaVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RegistryName",params,undefined,false); 
			copyArg(n,"SchemaName",params,undefined,false); 
			
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"RegistryName",params,undefined,false); 
			copyArg(msg,"SchemaName",params,undefined,false); 
			

			svc.listSchemaVersions(params,cb);
		}

		
		service.ListSchemas=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RegistryName",params,undefined,false); 
			
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"RegistryName",params,undefined,false); 
			copyArg(msg,"SchemaNamePrefix",params,undefined,false); 
			

			svc.listSchemas(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutCodeBinding=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RegistryName",params,undefined,false); 
			copyArg(n,"SchemaName",params,undefined,false); 
			copyArg(n,"Language",params,undefined,false); 
			
			copyArg(msg,"Language",params,undefined,false); 
			copyArg(msg,"RegistryName",params,undefined,false); 
			copyArg(msg,"SchemaName",params,undefined,false); 
			copyArg(msg,"SchemaVersion",params,undefined,false); 
			

			svc.putCodeBinding(params,cb);
		}

		
		service.PutResourcePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Policy",params,undefined,false); 
			
			copyArg(msg,"Policy",params,undefined,false); 
			copyArg(msg,"RegistryName",params,undefined,false); 
			copyArg(msg,"RevisionId",params,undefined,false); 
			

			svc.putResourcePolicy(params,cb);
		}

		
		service.SearchSchemas=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RegistryName",params,undefined,false); 
			copyArg(n,"Keywords",params,undefined,false); 
			
			copyArg(msg,"Keywords",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"RegistryName",params,undefined,false); 
			

			svc.searchSchemas(params,cb);
		}

		
		service.StartDiscoverer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DiscovererId",params,undefined,false); 
			
			copyArg(msg,"DiscovererId",params,undefined,false); 
			

			svc.startDiscoverer(params,cb);
		}

		
		service.StopDiscoverer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DiscovererId",params,undefined,false); 
			
			copyArg(msg,"DiscovererId",params,undefined,false); 
			

			svc.stopDiscoverer(params,cb);
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
			
			copyArg(n,"TagKeys",params,undefined,false); 
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateDiscoverer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DiscovererId",params,undefined,false); 
			
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DiscovererId",params,undefined,false); 
			

			svc.updateDiscoverer(params,cb);
		}

		
		service.UpdateRegistry=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RegistryName",params,undefined,false); 
			
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"RegistryName",params,undefined,false); 
			

			svc.updateRegistry(params,cb);
		}

		
		service.UpdateSchema=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RegistryName",params,undefined,false); 
			copyArg(n,"SchemaName",params,undefined,false); 
			
			copyArg(msg,"ClientTokenId",params,undefined,false); 
			copyArg(msg,"Content",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"RegistryName",params,undefined,false); 
			copyArg(msg,"SchemaName",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			

			svc.updateSchema(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Schemas", AmazonAPINode);

};
