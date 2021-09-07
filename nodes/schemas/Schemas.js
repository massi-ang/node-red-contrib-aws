
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

		var awsService = new AWS.Schemas( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Schemas(msg.AWSConfig) : awsService;

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

		
		service.CreateDiscoverer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceArn",params,undefined,false); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"SourceArn",params,undefined,false); 
			copyArgs(n,"CrossAccount",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"SourceArn",params,undefined,false); 
			copyArgs(msg,"CrossAccount",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createDiscoverer(params,cb);
		}

		
		service.CreateRegistry=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RegistryName",params,undefined,false); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"RegistryName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"RegistryName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createRegistry(params,cb);
		}

		
		service.CreateSchema=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RegistryName",params,undefined,false); 
			copyArgs(n,"SchemaName",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Content",params,undefined,false); 
			
			copyArgs(n,"Content",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"RegistryName",params,undefined,false); 
			copyArgs(n,"SchemaName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(msg,"Content",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"RegistryName",params,undefined,false); 
			copyArgs(msg,"SchemaName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"Type",params,undefined,false); 
			

			svc.createSchema(params,cb);
		}

		
		service.DeleteDiscoverer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DiscovererId",params,undefined,false); 
			
			copyArgs(n,"DiscovererId",params,undefined,false); 
			
			copyArgs(msg,"DiscovererId",params,undefined,false); 
			

			svc.deleteDiscoverer(params,cb);
		}

		
		service.DeleteRegistry=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RegistryName",params,undefined,false); 
			
			copyArgs(n,"RegistryName",params,undefined,false); 
			
			copyArgs(msg,"RegistryName",params,undefined,false); 
			

			svc.deleteRegistry(params,cb);
		}

		
		service.DeleteResourcePolicy=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"RegistryName",params,undefined,false); 
			
			copyArgs(msg,"RegistryName",params,undefined,false); 
			

			svc.deleteResourcePolicy(params,cb);
		}

		
		service.DeleteSchema=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RegistryName",params,undefined,false); 
			copyArgs(n,"SchemaName",params,undefined,false); 
			
			copyArgs(n,"RegistryName",params,undefined,false); 
			copyArgs(n,"SchemaName",params,undefined,false); 
			
			copyArgs(msg,"RegistryName",params,undefined,false); 
			copyArgs(msg,"SchemaName",params,undefined,false); 
			

			svc.deleteSchema(params,cb);
		}

		
		service.DeleteSchemaVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SchemaVersion",params,undefined,false); 
			copyArgs(n,"RegistryName",params,undefined,false); 
			copyArgs(n,"SchemaName",params,undefined,false); 
			
			copyArgs(n,"RegistryName",params,undefined,false); 
			copyArgs(n,"SchemaName",params,undefined,false); 
			copyArgs(n,"SchemaVersion",params,undefined,false); 
			
			copyArgs(msg,"RegistryName",params,undefined,false); 
			copyArgs(msg,"SchemaName",params,undefined,false); 
			copyArgs(msg,"SchemaVersion",params,undefined,false); 
			

			svc.deleteSchemaVersion(params,cb);
		}

		
		service.DescribeCodeBinding=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RegistryName",params,undefined,false); 
			copyArgs(n,"SchemaName",params,undefined,false); 
			copyArgs(n,"Language",params,undefined,false); 
			
			copyArgs(n,"Language",params,undefined,false); 
			copyArgs(n,"RegistryName",params,undefined,false); 
			copyArgs(n,"SchemaName",params,undefined,false); 
			copyArgs(n,"SchemaVersion",params,undefined,false); 
			
			copyArgs(msg,"Language",params,undefined,false); 
			copyArgs(msg,"RegistryName",params,undefined,false); 
			copyArgs(msg,"SchemaName",params,undefined,false); 
			copyArgs(msg,"SchemaVersion",params,undefined,false); 
			

			svc.describeCodeBinding(params,cb);
		}

		
		service.DescribeDiscoverer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DiscovererId",params,undefined,false); 
			
			copyArgs(n,"DiscovererId",params,undefined,false); 
			
			copyArgs(msg,"DiscovererId",params,undefined,false); 
			

			svc.describeDiscoverer(params,cb);
		}

		
		service.DescribeRegistry=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RegistryName",params,undefined,false); 
			
			copyArgs(n,"RegistryName",params,undefined,false); 
			
			copyArgs(msg,"RegistryName",params,undefined,false); 
			

			svc.describeRegistry(params,cb);
		}

		
		service.DescribeSchema=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RegistryName",params,undefined,false); 
			copyArgs(n,"SchemaName",params,undefined,false); 
			
			copyArgs(n,"RegistryName",params,undefined,false); 
			copyArgs(n,"SchemaName",params,undefined,false); 
			copyArgs(n,"SchemaVersion",params,undefined,false); 
			
			copyArgs(msg,"RegistryName",params,undefined,false); 
			copyArgs(msg,"SchemaName",params,undefined,false); 
			copyArgs(msg,"SchemaVersion",params,undefined,false); 
			

			svc.describeSchema(params,cb);
		}

		
		service.ExportSchema=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RegistryName",params,undefined,false); 
			copyArgs(n,"SchemaName",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(n,"RegistryName",params,undefined,false); 
			copyArgs(n,"SchemaName",params,undefined,false); 
			copyArgs(n,"SchemaVersion",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(msg,"RegistryName",params,undefined,false); 
			copyArgs(msg,"SchemaName",params,undefined,false); 
			copyArgs(msg,"SchemaVersion",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			

			svc.exportSchema(params,cb);
		}

		
		service.GetCodeBindingSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RegistryName",params,undefined,false); 
			copyArgs(n,"SchemaName",params,undefined,false); 
			copyArgs(n,"Language",params,undefined,false); 
			
			copyArgs(n,"Language",params,undefined,false); 
			copyArgs(n,"RegistryName",params,undefined,false); 
			copyArgs(n,"SchemaName",params,undefined,false); 
			copyArgs(n,"SchemaVersion",params,undefined,false); 
			
			copyArgs(msg,"Language",params,undefined,false); 
			copyArgs(msg,"RegistryName",params,undefined,false); 
			copyArgs(msg,"SchemaName",params,undefined,false); 
			copyArgs(msg,"SchemaVersion",params,undefined,false); 
			

			svc.getCodeBindingSource(params,cb);
		}

		
		service.GetDiscoveredSchema=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Events",params,undefined,false); 
			
			copyArgs(n,"Events",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(msg,"Events",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			

			svc.getDiscoveredSchema(params,cb);
		}

		
		service.GetResourcePolicy=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"RegistryName",params,undefined,false); 
			
			copyArgs(msg,"RegistryName",params,undefined,false); 
			

			svc.getResourcePolicy(params,cb);
		}

		
		service.ListDiscoverers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DiscovererIdPrefix",params,undefined,false); 
			copyArgs(n,"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"SourceArnPrefix",params,undefined,false); 
			
			copyArgs(msg,"DiscovererIdPrefix",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"SourceArnPrefix",params,undefined,false); 
			

			svc.listDiscoverers(params,cb);
		}

		
		service.ListRegistries=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"RegistryNamePrefix",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"RegistryNamePrefix",params,undefined,false); 
			copyArgs(msg,"Scope",params,undefined,false); 
			

			svc.listRegistries(params,cb);
		}

		
		service.ListSchemaVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RegistryName",params,undefined,false); 
			copyArgs(n,"SchemaName",params,undefined,false); 
			
			copyArgs(n,"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"RegistryName",params,undefined,false); 
			copyArgs(n,"SchemaName",params,undefined,false); 
			
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"RegistryName",params,undefined,false); 
			copyArgs(msg,"SchemaName",params,undefined,false); 
			

			svc.listSchemaVersions(params,cb);
		}

		
		service.ListSchemas=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RegistryName",params,undefined,false); 
			
			copyArgs(n,"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"RegistryName",params,undefined,false); 
			copyArgs(n,"SchemaNamePrefix",params,undefined,false); 
			
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"RegistryName",params,undefined,false); 
			copyArgs(msg,"SchemaNamePrefix",params,undefined,false); 
			

			svc.listSchemas(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutCodeBinding=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RegistryName",params,undefined,false); 
			copyArgs(n,"SchemaName",params,undefined,false); 
			copyArgs(n,"Language",params,undefined,false); 
			
			copyArgs(n,"Language",params,undefined,false); 
			copyArgs(n,"RegistryName",params,undefined,false); 
			copyArgs(n,"SchemaName",params,undefined,false); 
			copyArgs(n,"SchemaVersion",params,undefined,false); 
			
			copyArgs(msg,"Language",params,undefined,false); 
			copyArgs(msg,"RegistryName",params,undefined,false); 
			copyArgs(msg,"SchemaName",params,undefined,false); 
			copyArgs(msg,"SchemaVersion",params,undefined,false); 
			

			svc.putCodeBinding(params,cb);
		}

		
		service.PutResourcePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(n,"Policy",params,undefined,false); 
			copyArgs(n,"RegistryName",params,undefined,false); 
			copyArgs(n,"RevisionId",params,undefined,false); 
			
			copyArgs(msg,"Policy",params,undefined,false); 
			copyArgs(msg,"RegistryName",params,undefined,false); 
			copyArgs(msg,"RevisionId",params,undefined,false); 
			

			svc.putResourcePolicy(params,cb);
		}

		
		service.SearchSchemas=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RegistryName",params,undefined,false); 
			copyArgs(n,"Keywords",params,undefined,false); 
			
			copyArgs(n,"Keywords",params,undefined,false); 
			copyArgs(n,"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"RegistryName",params,undefined,false); 
			
			copyArgs(msg,"Keywords",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"RegistryName",params,undefined,false); 
			

			svc.searchSchemas(params,cb);
		}

		
		service.StartDiscoverer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DiscovererId",params,undefined,false); 
			
			copyArgs(n,"DiscovererId",params,undefined,false); 
			
			copyArgs(msg,"DiscovererId",params,undefined,false); 
			

			svc.startDiscoverer(params,cb);
		}

		
		service.StopDiscoverer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DiscovererId",params,undefined,false); 
			
			copyArgs(n,"DiscovererId",params,undefined,false); 
			
			copyArgs(msg,"DiscovererId",params,undefined,false); 
			

			svc.stopDiscoverer(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TagKeys",params,undefined,false); 
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateDiscoverer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DiscovererId",params,undefined,false); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"DiscovererId",params,undefined,false); 
			copyArgs(n,"CrossAccount",params,undefined,false); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DiscovererId",params,undefined,false); 
			copyArgs(msg,"CrossAccount",params,undefined,false); 
			

			svc.updateDiscoverer(params,cb);
		}

		
		service.UpdateRegistry=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RegistryName",params,undefined,false); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"RegistryName",params,undefined,false); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"RegistryName",params,undefined,false); 
			

			svc.updateRegistry(params,cb);
		}

		
		service.UpdateSchema=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RegistryName",params,undefined,false); 
			copyArgs(n,"SchemaName",params,undefined,false); 
			
			copyArgs(n,"ClientTokenId",params,undefined,false); 
			copyArgs(n,"Content",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"RegistryName",params,undefined,false); 
			copyArgs(n,"SchemaName",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(msg,"ClientTokenId",params,undefined,false); 
			copyArgs(msg,"Content",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"RegistryName",params,undefined,false); 
			copyArgs(msg,"SchemaName",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			

			svc.updateSchema(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Schemas", AmazonAPINode);

};
