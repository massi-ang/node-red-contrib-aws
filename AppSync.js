
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

		var awsService = new AWS.AppSync( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.AppSync(msg.AWSConfig) : awsService;

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

		
		service.CreateApiCache=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			copyArg(n,"ttl",params,undefined,false); 
			copyArg(n,"apiCachingBehavior",params,undefined,false); 
			copyArg(n,"_type",params,"type",false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"ttl",params,undefined,false); 
			copyArg(msg,"transitEncryptionEnabled",params,undefined,false); 
			copyArg(msg,"atRestEncryptionEnabled",params,undefined,false); 
			copyArg(msg,"apiCachingBehavior",params,undefined,false); 
			copyArg(msg,"type",params,undefined,false); 
			

			svc.createApiCache(params,cb);
		}

		
		service.CreateApiKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"expires",params,undefined,false); 
			

			svc.createApiKey(params,cb);
		}

		
		service.CreateDataSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"_type",params,"type",false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"type",params,undefined,false); 
			copyArg(msg,"serviceRoleArn",params,undefined,false); 
			copyArg(msg,"dynamodbConfig",params,undefined,true); 
			copyArg(msg,"lambdaConfig",params,undefined,true); 
			copyArg(msg,"elasticsearchConfig",params,undefined,true); 
			copyArg(msg,"httpConfig",params,undefined,true); 
			copyArg(msg,"relationalDatabaseConfig",params,undefined,true); 
			

			svc.createDataSource(params,cb);
		}

		
		service.CreateFunction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"dataSourceName",params,undefined,false); 
			copyArg(n,"functionVersion",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"dataSourceName",params,undefined,false); 
			copyArg(msg,"requestMappingTemplate",params,undefined,false); 
			copyArg(msg,"responseMappingTemplate",params,undefined,false); 
			copyArg(msg,"functionVersion",params,undefined,false); 
			copyArg(msg,"syncConfig",params,undefined,true); 
			

			svc.createFunction(params,cb);
		}

		
		service.CreateGraphqlApi=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"authenticationType",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"logConfig",params,undefined,true); 
			copyArg(msg,"authenticationType",params,undefined,false); 
			copyArg(msg,"userPoolConfig",params,undefined,true); 
			copyArg(msg,"openIDConnectConfig",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"additionalAuthenticationProviders",params,undefined,true); 
			copyArg(msg,"xrayEnabled",params,undefined,false); 
			copyArg(msg,"lambdaAuthorizerConfig",params,undefined,true); 
			

			svc.createGraphqlApi(params,cb);
		}

		
		service.CreateResolver=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			copyArg(n,"typeName",params,undefined,false); 
			copyArg(n,"fieldName",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"typeName",params,undefined,false); 
			copyArg(msg,"fieldName",params,undefined,false); 
			copyArg(msg,"dataSourceName",params,undefined,false); 
			copyArg(msg,"requestMappingTemplate",params,undefined,false); 
			copyArg(msg,"responseMappingTemplate",params,undefined,false); 
			copyArg(msg,"kind",params,undefined,false); 
			copyArg(msg,"pipelineConfig",params,undefined,true); 
			copyArg(msg,"syncConfig",params,undefined,true); 
			copyArg(msg,"cachingConfig",params,undefined,true); 
			

			svc.createResolver(params,cb);
		}

		
		service.CreateType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			copyArg(n,"definition",params,undefined,false); 
			copyArg(n,"format",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"definition",params,undefined,false); 
			copyArg(msg,"format",params,undefined,false); 
			

			svc.createType(params,cb);
		}

		
		service.DeleteApiCache=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			

			svc.deleteApiCache(params,cb);
		}

		
		service.DeleteApiKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"id",params,undefined,false); 
			

			svc.deleteApiKey(params,cb);
		}

		
		service.DeleteDataSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			

			svc.deleteDataSource(params,cb);
		}

		
		service.DeleteFunction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			copyArg(n,"functionId",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"functionId",params,undefined,false); 
			

			svc.deleteFunction(params,cb);
		}

		
		service.DeleteGraphqlApi=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			

			svc.deleteGraphqlApi(params,cb);
		}

		
		service.DeleteResolver=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			copyArg(n,"typeName",params,undefined,false); 
			copyArg(n,"fieldName",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"typeName",params,undefined,false); 
			copyArg(msg,"fieldName",params,undefined,false); 
			

			svc.deleteResolver(params,cb);
		}

		
		service.DeleteType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			copyArg(n,"typeName",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"typeName",params,undefined,false); 
			

			svc.deleteType(params,cb);
		}

		
		service.FlushApiCache=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			

			svc.flushApiCache(params,cb);
		}

		
		service.GetApiCache=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			

			svc.getApiCache(params,cb);
		}

		
		service.GetDataSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			

			svc.getDataSource(params,cb);
		}

		
		service.GetFunction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			copyArg(n,"functionId",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"functionId",params,undefined,false); 
			

			svc.getFunction(params,cb);
		}

		
		service.GetGraphqlApi=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			

			svc.getGraphqlApi(params,cb);
		}

		
		service.GetIntrospectionSchema=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			copyArg(n,"format",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"format",params,undefined,false); 
			copyArg(msg,"includeDirectives",params,undefined,false); 
			

			svc.getIntrospectionSchema(params,cb);
		}

		
		service.GetResolver=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			copyArg(n,"typeName",params,undefined,false); 
			copyArg(n,"fieldName",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"typeName",params,undefined,false); 
			copyArg(msg,"fieldName",params,undefined,false); 
			

			svc.getResolver(params,cb);
		}

		
		service.GetSchemaCreationStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			

			svc.getSchemaCreationStatus(params,cb);
		}

		
		service.GetType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			copyArg(n,"typeName",params,undefined,false); 
			copyArg(n,"format",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"typeName",params,undefined,false); 
			copyArg(msg,"format",params,undefined,false); 
			

			svc.getType(params,cb);
		}

		
		service.ListApiKeys=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listApiKeys(params,cb);
		}

		
		service.ListDataSources=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listDataSources(params,cb);
		}

		
		service.ListFunctions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listFunctions(params,cb);
		}

		
		service.ListGraphqlApis=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listGraphqlApis(params,cb);
		}

		
		service.ListResolvers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			copyArg(n,"typeName",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"typeName",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listResolvers(params,cb);
		}

		
		service.ListResolversByFunction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			copyArg(n,"functionId",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"functionId",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listResolversByFunction(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListTypes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			copyArg(n,"format",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"format",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listTypes(params,cb);
		}

		
		service.StartSchemaCreation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			copyArg(n,"definition",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"definition",params,undefined,false); 
			

			svc.startSchemaCreation(params,cb);
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

		
		service.UpdateApiCache=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			copyArg(n,"ttl",params,undefined,false); 
			copyArg(n,"apiCachingBehavior",params,undefined,false); 
			copyArg(n,"_type",params,"type",false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"ttl",params,undefined,false); 
			copyArg(msg,"apiCachingBehavior",params,undefined,false); 
			copyArg(msg,"type",params,undefined,false); 
			

			svc.updateApiCache(params,cb);
		}

		
		service.UpdateApiKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"id",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"expires",params,undefined,false); 
			

			svc.updateApiKey(params,cb);
		}

		
		service.UpdateDataSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"_type",params,"type",false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"type",params,undefined,false); 
			copyArg(msg,"serviceRoleArn",params,undefined,false); 
			copyArg(msg,"dynamodbConfig",params,undefined,true); 
			copyArg(msg,"lambdaConfig",params,undefined,true); 
			copyArg(msg,"elasticsearchConfig",params,undefined,true); 
			copyArg(msg,"httpConfig",params,undefined,true); 
			copyArg(msg,"relationalDatabaseConfig",params,undefined,true); 
			

			svc.updateDataSource(params,cb);
		}

		
		service.UpdateFunction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"functionId",params,undefined,false); 
			copyArg(n,"dataSourceName",params,undefined,false); 
			copyArg(n,"functionVersion",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"functionId",params,undefined,false); 
			copyArg(msg,"dataSourceName",params,undefined,false); 
			copyArg(msg,"requestMappingTemplate",params,undefined,false); 
			copyArg(msg,"responseMappingTemplate",params,undefined,false); 
			copyArg(msg,"functionVersion",params,undefined,false); 
			copyArg(msg,"syncConfig",params,undefined,true); 
			

			svc.updateFunction(params,cb);
		}

		
		service.UpdateGraphqlApi=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"logConfig",params,undefined,true); 
			copyArg(msg,"authenticationType",params,undefined,false); 
			copyArg(msg,"userPoolConfig",params,undefined,true); 
			copyArg(msg,"openIDConnectConfig",params,undefined,true); 
			copyArg(msg,"additionalAuthenticationProviders",params,undefined,true); 
			copyArg(msg,"xrayEnabled",params,undefined,false); 
			copyArg(msg,"lambdaAuthorizerConfig",params,undefined,true); 
			

			svc.updateGraphqlApi(params,cb);
		}

		
		service.UpdateResolver=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			copyArg(n,"typeName",params,undefined,false); 
			copyArg(n,"fieldName",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"typeName",params,undefined,false); 
			copyArg(msg,"fieldName",params,undefined,false); 
			copyArg(msg,"dataSourceName",params,undefined,false); 
			copyArg(msg,"requestMappingTemplate",params,undefined,false); 
			copyArg(msg,"responseMappingTemplate",params,undefined,false); 
			copyArg(msg,"kind",params,undefined,false); 
			copyArg(msg,"pipelineConfig",params,undefined,true); 
			copyArg(msg,"syncConfig",params,undefined,true); 
			copyArg(msg,"cachingConfig",params,undefined,true); 
			

			svc.updateResolver(params,cb);
		}

		
		service.UpdateType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiId",params,undefined,false); 
			copyArg(n,"typeName",params,undefined,false); 
			copyArg(n,"format",params,undefined,false); 
			
			copyArg(msg,"apiId",params,undefined,false); 
			copyArg(msg,"typeName",params,undefined,false); 
			copyArg(msg,"definition",params,undefined,false); 
			copyArg(msg,"format",params,undefined,false); 
			

			svc.updateType(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS AppSync", AmazonAPINode);

};
