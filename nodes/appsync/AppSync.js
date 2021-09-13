
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

		var awsService = new AWS.AppSync( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.AppSync(msg.AWSConfig) : awsService;

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
		
		service.CreateApiCache=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"ttl",params,undefined,false); 
			copyArgs(n,"apiCachingBehavior",params,undefined,false); 
			copyArgs(n,"_type",params,"type",false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"ttl",params,undefined,false); 
			copyArgs(Boolean(n),"transitEncryptionEnabled",params,undefined,false); 
			copyArgs(Boolean(n),"atRestEncryptionEnabled",params,undefined,false); 
			copyArgs(n,"apiCachingBehavior",params,undefined,false); 
			copyArgs(n,"type",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"ttl",params,undefined,false); 
			copyArgs(msg,"transitEncryptionEnabled",params,undefined,false); 
			copyArgs(msg,"atRestEncryptionEnabled",params,undefined,false); 
			copyArgs(msg,"apiCachingBehavior",params,undefined,false); 
			copyArgs(msg,"type",params,undefined,false); 
			

			svc.createApiCache(params,cb);
		}
		
		service.CreateApiKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"expires",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"expires",params,undefined,false); 
			

			svc.createApiKey(params,cb);
		}
		
		service.CreateDataSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"_type",params,"type",false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"type",params,undefined,false); 
			copyArgs(n,"serviceRoleArn",params,undefined,false); 
			copyArgs(n,"dynamodbConfig",params,undefined,true); 
			copyArgs(n,"lambdaConfig",params,undefined,true); 
			copyArgs(n,"elasticsearchConfig",params,undefined,true); 
			copyArgs(n,"httpConfig",params,undefined,true); 
			copyArgs(n,"relationalDatabaseConfig",params,undefined,true); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"type",params,undefined,false); 
			copyArgs(msg,"serviceRoleArn",params,undefined,false); 
			copyArgs(msg,"dynamodbConfig",params,undefined,true); 
			copyArgs(msg,"lambdaConfig",params,undefined,true); 
			copyArgs(msg,"elasticsearchConfig",params,undefined,true); 
			copyArgs(msg,"httpConfig",params,undefined,true); 
			copyArgs(msg,"relationalDatabaseConfig",params,undefined,true); 
			

			svc.createDataSource(params,cb);
		}
		
		service.CreateFunction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"dataSourceName",params,undefined,false); 
			copyArgs(n,"functionVersion",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"dataSourceName",params,undefined,false); 
			copyArgs(n,"requestMappingTemplate",params,undefined,false); 
			copyArgs(n,"responseMappingTemplate",params,undefined,false); 
			copyArgs(n,"functionVersion",params,undefined,false); 
			copyArgs(n,"syncConfig",params,undefined,true); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"dataSourceName",params,undefined,false); 
			copyArgs(msg,"requestMappingTemplate",params,undefined,false); 
			copyArgs(msg,"responseMappingTemplate",params,undefined,false); 
			copyArgs(msg,"functionVersion",params,undefined,false); 
			copyArgs(msg,"syncConfig",params,undefined,true); 
			

			svc.createFunction(params,cb);
		}
		
		service.CreateGraphqlApi=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"authenticationType",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"logConfig",params,undefined,true); 
			copyArgs(n,"authenticationType",params,undefined,false); 
			copyArgs(n,"userPoolConfig",params,undefined,true); 
			copyArgs(n,"openIDConnectConfig",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"additionalAuthenticationProviders",params,undefined,true); 
			copyArgs(Boolean(n),"xrayEnabled",params,undefined,false); 
			copyArgs(n,"lambdaAuthorizerConfig",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"logConfig",params,undefined,true); 
			copyArgs(msg,"authenticationType",params,undefined,false); 
			copyArgs(msg,"userPoolConfig",params,undefined,true); 
			copyArgs(msg,"openIDConnectConfig",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"additionalAuthenticationProviders",params,undefined,true); 
			copyArgs(msg,"xrayEnabled",params,undefined,false); 
			copyArgs(msg,"lambdaAuthorizerConfig",params,undefined,true); 
			

			svc.createGraphqlApi(params,cb);
		}
		
		service.CreateResolver=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"typeName",params,undefined,false); 
			copyArgs(n,"fieldName",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"typeName",params,undefined,false); 
			copyArgs(n,"fieldName",params,undefined,false); 
			copyArgs(n,"dataSourceName",params,undefined,false); 
			copyArgs(n,"requestMappingTemplate",params,undefined,false); 
			copyArgs(n,"responseMappingTemplate",params,undefined,false); 
			copyArgs(n,"kind",params,undefined,false); 
			copyArgs(n,"pipelineConfig",params,undefined,true); 
			copyArgs(n,"syncConfig",params,undefined,true); 
			copyArgs(n,"cachingConfig",params,undefined,true); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"typeName",params,undefined,false); 
			copyArgs(msg,"fieldName",params,undefined,false); 
			copyArgs(msg,"dataSourceName",params,undefined,false); 
			copyArgs(msg,"requestMappingTemplate",params,undefined,false); 
			copyArgs(msg,"responseMappingTemplate",params,undefined,false); 
			copyArgs(msg,"kind",params,undefined,false); 
			copyArgs(msg,"pipelineConfig",params,undefined,true); 
			copyArgs(msg,"syncConfig",params,undefined,true); 
			copyArgs(msg,"cachingConfig",params,undefined,true); 
			

			svc.createResolver(params,cb);
		}
		
		service.CreateType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"definition",params,undefined,false); 
			copyArgs(n,"format",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"definition",params,undefined,false); 
			copyArgs(n,"format",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"definition",params,undefined,false); 
			copyArgs(msg,"format",params,undefined,false); 
			

			svc.createType(params,cb);
		}
		
		service.DeleteApiCache=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			

			svc.deleteApiCache(params,cb);
		}
		
		service.DeleteApiKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.deleteApiKey(params,cb);
		}
		
		service.DeleteDataSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.deleteDataSource(params,cb);
		}
		
		service.DeleteFunction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"functionId",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"functionId",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"functionId",params,undefined,false); 
			

			svc.deleteFunction(params,cb);
		}
		
		service.DeleteGraphqlApi=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			

			svc.deleteGraphqlApi(params,cb);
		}
		
		service.DeleteResolver=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"typeName",params,undefined,false); 
			copyArgs(n,"fieldName",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"typeName",params,undefined,false); 
			copyArgs(n,"fieldName",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"typeName",params,undefined,false); 
			copyArgs(msg,"fieldName",params,undefined,false); 
			

			svc.deleteResolver(params,cb);
		}
		
		service.DeleteType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"typeName",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"typeName",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"typeName",params,undefined,false); 
			

			svc.deleteType(params,cb);
		}
		
		service.FlushApiCache=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			

			svc.flushApiCache(params,cb);
		}
		
		service.GetApiCache=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			

			svc.getApiCache(params,cb);
		}
		
		service.GetDataSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.getDataSource(params,cb);
		}
		
		service.GetFunction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"functionId",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"functionId",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"functionId",params,undefined,false); 
			

			svc.getFunction(params,cb);
		}
		
		service.GetGraphqlApi=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			

			svc.getGraphqlApi(params,cb);
		}
		
		service.GetIntrospectionSchema=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"format",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"format",params,undefined,false); 
			copyArgs(Boolean(n),"includeDirectives",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"format",params,undefined,false); 
			copyArgs(msg,"includeDirectives",params,undefined,false); 
			

			svc.getIntrospectionSchema(params,cb);
		}
		
		service.GetResolver=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"typeName",params,undefined,false); 
			copyArgs(n,"fieldName",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"typeName",params,undefined,false); 
			copyArgs(n,"fieldName",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"typeName",params,undefined,false); 
			copyArgs(msg,"fieldName",params,undefined,false); 
			

			svc.getResolver(params,cb);
		}
		
		service.GetSchemaCreationStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			

			svc.getSchemaCreationStatus(params,cb);
		}
		
		service.GetType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"typeName",params,undefined,false); 
			copyArgs(n,"format",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"typeName",params,undefined,false); 
			copyArgs(n,"format",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"typeName",params,undefined,false); 
			copyArgs(msg,"format",params,undefined,false); 
			

			svc.getType(params,cb);
		}
		
		service.ListApiKeys=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listApiKeys(params,cb);
		}
		
		service.ListDataSources=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listDataSources(params,cb);
		}
		
		service.ListFunctions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listFunctions(params,cb);
		}
		
		service.ListGraphqlApis=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listGraphqlApis(params,cb);
		}
		
		service.ListResolvers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"typeName",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"typeName",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"typeName",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listResolvers(params,cb);
		}
		
		service.ListResolversByFunction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"functionId",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"functionId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"functionId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listResolversByFunction(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.ListTypes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"format",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"format",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"format",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listTypes(params,cb);
		}
		
		service.StartSchemaCreation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"definition",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"definition",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"definition",params,undefined,false); 
			

			svc.startSchemaCreation(params,cb);
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
		
		service.UpdateApiCache=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"ttl",params,undefined,false); 
			copyArgs(n,"apiCachingBehavior",params,undefined,false); 
			copyArgs(n,"_type",params,"type",false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"ttl",params,undefined,false); 
			copyArgs(n,"apiCachingBehavior",params,undefined,false); 
			copyArgs(n,"type",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"ttl",params,undefined,false); 
			copyArgs(msg,"apiCachingBehavior",params,undefined,false); 
			copyArgs(msg,"type",params,undefined,false); 
			

			svc.updateApiCache(params,cb);
		}
		
		service.UpdateApiKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"id",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"expires",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"id",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"expires",params,undefined,false); 
			

			svc.updateApiKey(params,cb);
		}
		
		service.UpdateDataSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"_type",params,"type",false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"type",params,undefined,false); 
			copyArgs(n,"serviceRoleArn",params,undefined,false); 
			copyArgs(n,"dynamodbConfig",params,undefined,true); 
			copyArgs(n,"lambdaConfig",params,undefined,true); 
			copyArgs(n,"elasticsearchConfig",params,undefined,true); 
			copyArgs(n,"httpConfig",params,undefined,true); 
			copyArgs(n,"relationalDatabaseConfig",params,undefined,true); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"type",params,undefined,false); 
			copyArgs(msg,"serviceRoleArn",params,undefined,false); 
			copyArgs(msg,"dynamodbConfig",params,undefined,true); 
			copyArgs(msg,"lambdaConfig",params,undefined,true); 
			copyArgs(msg,"elasticsearchConfig",params,undefined,true); 
			copyArgs(msg,"httpConfig",params,undefined,true); 
			copyArgs(msg,"relationalDatabaseConfig",params,undefined,true); 
			

			svc.updateDataSource(params,cb);
		}
		
		service.UpdateFunction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"functionId",params,undefined,false); 
			copyArgs(n,"dataSourceName",params,undefined,false); 
			copyArgs(n,"functionVersion",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"functionId",params,undefined,false); 
			copyArgs(n,"dataSourceName",params,undefined,false); 
			copyArgs(n,"requestMappingTemplate",params,undefined,false); 
			copyArgs(n,"responseMappingTemplate",params,undefined,false); 
			copyArgs(n,"functionVersion",params,undefined,false); 
			copyArgs(n,"syncConfig",params,undefined,true); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"functionId",params,undefined,false); 
			copyArgs(msg,"dataSourceName",params,undefined,false); 
			copyArgs(msg,"requestMappingTemplate",params,undefined,false); 
			copyArgs(msg,"responseMappingTemplate",params,undefined,false); 
			copyArgs(msg,"functionVersion",params,undefined,false); 
			copyArgs(msg,"syncConfig",params,undefined,true); 
			

			svc.updateFunction(params,cb);
		}
		
		service.UpdateGraphqlApi=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"logConfig",params,undefined,true); 
			copyArgs(n,"authenticationType",params,undefined,false); 
			copyArgs(n,"userPoolConfig",params,undefined,true); 
			copyArgs(n,"openIDConnectConfig",params,undefined,true); 
			copyArgs(n,"additionalAuthenticationProviders",params,undefined,true); 
			copyArgs(Boolean(n),"xrayEnabled",params,undefined,false); 
			copyArgs(n,"lambdaAuthorizerConfig",params,undefined,true); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"logConfig",params,undefined,true); 
			copyArgs(msg,"authenticationType",params,undefined,false); 
			copyArgs(msg,"userPoolConfig",params,undefined,true); 
			copyArgs(msg,"openIDConnectConfig",params,undefined,true); 
			copyArgs(msg,"additionalAuthenticationProviders",params,undefined,true); 
			copyArgs(msg,"xrayEnabled",params,undefined,false); 
			copyArgs(msg,"lambdaAuthorizerConfig",params,undefined,true); 
			

			svc.updateGraphqlApi(params,cb);
		}
		
		service.UpdateResolver=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"typeName",params,undefined,false); 
			copyArgs(n,"fieldName",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"typeName",params,undefined,false); 
			copyArgs(n,"fieldName",params,undefined,false); 
			copyArgs(n,"dataSourceName",params,undefined,false); 
			copyArgs(n,"requestMappingTemplate",params,undefined,false); 
			copyArgs(n,"responseMappingTemplate",params,undefined,false); 
			copyArgs(n,"kind",params,undefined,false); 
			copyArgs(n,"pipelineConfig",params,undefined,true); 
			copyArgs(n,"syncConfig",params,undefined,true); 
			copyArgs(n,"cachingConfig",params,undefined,true); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"typeName",params,undefined,false); 
			copyArgs(msg,"fieldName",params,undefined,false); 
			copyArgs(msg,"dataSourceName",params,undefined,false); 
			copyArgs(msg,"requestMappingTemplate",params,undefined,false); 
			copyArgs(msg,"responseMappingTemplate",params,undefined,false); 
			copyArgs(msg,"kind",params,undefined,false); 
			copyArgs(msg,"pipelineConfig",params,undefined,true); 
			copyArgs(msg,"syncConfig",params,undefined,true); 
			copyArgs(msg,"cachingConfig",params,undefined,true); 
			

			svc.updateResolver(params,cb);
		}
		
		service.UpdateType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"typeName",params,undefined,false); 
			copyArgs(n,"format",params,undefined,false); 
			
			copyArgs(n,"apiId",params,undefined,false); 
			copyArgs(n,"typeName",params,undefined,false); 
			copyArgs(n,"definition",params,undefined,false); 
			copyArgs(n,"format",params,undefined,false); 
			
			copyArgs(msg,"apiId",params,undefined,false); 
			copyArgs(msg,"typeName",params,undefined,false); 
			copyArgs(msg,"definition",params,undefined,false); 
			copyArgs(msg,"format",params,undefined,false); 
			

			svc.updateType(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS AppSync", AmazonAPINode);

};
