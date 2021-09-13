
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

		var awsService = new AWS.APIGateway( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.APIGateway(msg.AWSConfig) : awsService;

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
		
		service.CreateApiKey=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(Boolean(n),"enabled",params,undefined,false); 
			copyArgs(Boolean(n),"generateDistinctId",params,undefined,false); 
			copyArgs(n,"value",params,undefined,false); 
			copyArgs(n,"stageKeys",params,undefined,false); 
			copyArgs(n,"customerId",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"enabled",params,undefined,false); 
			copyArgs(msg,"generateDistinctId",params,undefined,false); 
			copyArgs(msg,"value",params,undefined,false); 
			copyArgs(msg,"stageKeys",params,undefined,false); 
			copyArgs(msg,"customerId",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createApiKey(params,cb);
		}
		
		service.CreateAuthorizer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"_type",params,"type",false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"type",params,undefined,false); 
			copyArgs(n,"providerARNs",params,undefined,true); 
			copyArgs(n,"authType",params,undefined,false); 
			copyArgs(n,"authorizerUri",params,undefined,false); 
			copyArgs(n,"authorizerCredentials",params,undefined,false); 
			copyArgs(n,"identitySource",params,undefined,false); 
			copyArgs(n,"identityValidationExpression",params,undefined,false); 
			copyArgs(Number(n),"authorizerResultTtlInSeconds",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"type",params,undefined,false); 
			copyArgs(msg,"providerARNs",params,undefined,true); 
			copyArgs(msg,"authType",params,undefined,false); 
			copyArgs(msg,"authorizerUri",params,undefined,false); 
			copyArgs(msg,"authorizerCredentials",params,undefined,false); 
			copyArgs(msg,"identitySource",params,undefined,false); 
			copyArgs(msg,"identityValidationExpression",params,undefined,false); 
			copyArgs(msg,"authorizerResultTtlInSeconds",params,undefined,false); 
			

			svc.createAuthorizer(params,cb);
		}
		
		service.CreateBasePathMapping=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domainName",params,undefined,false); 
			copyArgs(n,"restApiId",params,undefined,false); 
			
			copyArgs(n,"domainName",params,undefined,false); 
			copyArgs(n,"basePath",params,undefined,false); 
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"stage",params,undefined,false); 
			
			copyArgs(msg,"domainName",params,undefined,false); 
			copyArgs(msg,"basePath",params,undefined,false); 
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"stage",params,undefined,false); 
			

			svc.createBasePathMapping(params,cb);
		}
		
		service.CreateDeployment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"stageName",params,undefined,false); 
			copyArgs(n,"stageDescription",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(Boolean(n),"cacheClusterEnabled",params,undefined,false); 
			copyArgs(n,"cacheClusterSize",params,undefined,false); 
			copyArgs(n,"variables",params,undefined,true); 
			copyArgs(n,"canarySettings",params,undefined,false); 
			copyArgs(Boolean(n),"tracingEnabled",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"stageName",params,undefined,false); 
			copyArgs(msg,"stageDescription",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"cacheClusterEnabled",params,undefined,false); 
			copyArgs(msg,"cacheClusterSize",params,undefined,false); 
			copyArgs(msg,"variables",params,undefined,true); 
			copyArgs(msg,"canarySettings",params,undefined,false); 
			copyArgs(msg,"tracingEnabled",params,undefined,false); 
			

			svc.createDeployment(params,cb);
		}
		
		service.CreateDocumentationPart=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"location",params,undefined,true); 
			copyArgs(n,"properties",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"location",params,undefined,true); 
			copyArgs(n,"properties",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"location",params,undefined,true); 
			copyArgs(msg,"properties",params,undefined,false); 
			

			svc.createDocumentationPart(params,cb);
		}
		
		service.CreateDocumentationVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"documentationVersion",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"documentationVersion",params,undefined,false); 
			copyArgs(n,"stageName",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"documentationVersion",params,undefined,false); 
			copyArgs(msg,"stageName",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			

			svc.createDocumentationVersion(params,cb);
		}
		
		service.CreateDomainName=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domainName",params,undefined,false); 
			
			copyArgs(n,"domainName",params,undefined,false); 
			copyArgs(n,"certificateName",params,undefined,false); 
			copyArgs(n,"certificateBody",params,undefined,false); 
			copyArgs(n,"certificatePrivateKey",params,undefined,false); 
			copyArgs(n,"certificateChain",params,undefined,false); 
			copyArgs(n,"certificateArn",params,undefined,false); 
			copyArgs(n,"regionalCertificateName",params,undefined,false); 
			copyArgs(n,"regionalCertificateArn",params,undefined,false); 
			copyArgs(n,"endpointConfiguration",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"securityPolicy",params,undefined,false); 
			copyArgs(n,"mutualTlsAuthentication",params,undefined,false); 
			copyArgs(n,"ownershipVerificationCertificateArn",params,undefined,false); 
			
			copyArgs(msg,"domainName",params,undefined,false); 
			copyArgs(msg,"certificateName",params,undefined,false); 
			copyArgs(msg,"certificateBody",params,undefined,false); 
			copyArgs(msg,"certificatePrivateKey",params,undefined,false); 
			copyArgs(msg,"certificateChain",params,undefined,false); 
			copyArgs(msg,"certificateArn",params,undefined,false); 
			copyArgs(msg,"regionalCertificateName",params,undefined,false); 
			copyArgs(msg,"regionalCertificateArn",params,undefined,false); 
			copyArgs(msg,"endpointConfiguration",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"securityPolicy",params,undefined,false); 
			copyArgs(msg,"mutualTlsAuthentication",params,undefined,false); 
			copyArgs(msg,"ownershipVerificationCertificateArn",params,undefined,false); 
			

			svc.createDomainName(params,cb);
		}
		
		service.CreateModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"contentType",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"schema",params,undefined,false); 
			copyArgs(n,"contentType",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"schema",params,undefined,false); 
			copyArgs(msg,"contentType",params,undefined,false); 
			

			svc.createModel(params,cb);
		}
		
		service.CreateRequestValidator=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(Boolean(n),"validateRequestBody",params,undefined,false); 
			copyArgs(Boolean(n),"validateRequestParameters",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"validateRequestBody",params,undefined,false); 
			copyArgs(msg,"validateRequestParameters",params,undefined,false); 
			

			svc.createRequestValidator(params,cb);
		}
		
		service.CreateResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"parentId",params,undefined,false); 
			copyArgs(n,"pathPart",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"parentId",params,undefined,false); 
			copyArgs(n,"pathPart",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"parentId",params,undefined,false); 
			copyArgs(msg,"pathPart",params,undefined,false); 
			

			svc.createResource(params,cb);
		}
		
		service.CreateRestApi=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"version",params,undefined,false); 
			copyArgs(n,"cloneFrom",params,undefined,false); 
			copyArgs(n,"binaryMediaTypes",params,undefined,true); 
			copyArgs(Number(n),"minimumCompressionSize",params,undefined,false); 
			copyArgs(n,"apiKeySource",params,undefined,false); 
			copyArgs(n,"endpointConfiguration",params,undefined,true); 
			copyArgs(n,"policy",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(Boolean(n),"disableExecuteApiEndpoint",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"version",params,undefined,false); 
			copyArgs(msg,"cloneFrom",params,undefined,false); 
			copyArgs(msg,"binaryMediaTypes",params,undefined,true); 
			copyArgs(msg,"minimumCompressionSize",params,undefined,false); 
			copyArgs(msg,"apiKeySource",params,undefined,false); 
			copyArgs(msg,"endpointConfiguration",params,undefined,true); 
			copyArgs(msg,"policy",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"disableExecuteApiEndpoint",params,undefined,false); 
			

			svc.createRestApi(params,cb);
		}
		
		service.CreateStage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"stageName",params,undefined,false); 
			copyArgs(n,"deploymentId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"stageName",params,undefined,false); 
			copyArgs(n,"deploymentId",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(Boolean(n),"cacheClusterEnabled",params,undefined,false); 
			copyArgs(n,"cacheClusterSize",params,undefined,false); 
			copyArgs(n,"variables",params,undefined,true); 
			copyArgs(n,"documentationVersion",params,undefined,false); 
			copyArgs(n,"canarySettings",params,undefined,true); 
			copyArgs(Boolean(n),"tracingEnabled",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"stageName",params,undefined,false); 
			copyArgs(msg,"deploymentId",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"cacheClusterEnabled",params,undefined,false); 
			copyArgs(msg,"cacheClusterSize",params,undefined,false); 
			copyArgs(msg,"variables",params,undefined,true); 
			copyArgs(msg,"documentationVersion",params,undefined,false); 
			copyArgs(msg,"canarySettings",params,undefined,true); 
			copyArgs(msg,"tracingEnabled",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createStage(params,cb);
		}
		
		service.CreateUsagePlan=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"apiStages",params,undefined,true); 
			copyArgs(n,"throttle",params,undefined,true); 
			copyArgs(n,"quota",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"apiStages",params,undefined,true); 
			copyArgs(msg,"throttle",params,undefined,true); 
			copyArgs(msg,"quota",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createUsagePlan(params,cb);
		}
		
		service.CreateUsagePlanKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"usagePlanId",params,undefined,false); 
			copyArgs(n,"keyId",params,undefined,false); 
			copyArgs(n,"keyType",params,undefined,false); 
			
			copyArgs(n,"usagePlanId",params,undefined,false); 
			copyArgs(n,"keyId",params,undefined,false); 
			copyArgs(n,"keyType",params,undefined,false); 
			
			copyArgs(msg,"usagePlanId",params,undefined,false); 
			copyArgs(msg,"keyId",params,undefined,false); 
			copyArgs(msg,"keyType",params,undefined,false); 
			

			svc.createUsagePlanKey(params,cb);
		}
		
		service.CreateVpcLink=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"targetArns",params,undefined,true); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"targetArns",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"targetArns",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createVpcLink(params,cb);
		}
		
		service.DeleteApiKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiKey",params,undefined,false); 
			
			copyArgs(n,"apiKey",params,undefined,false); 
			
			copyArgs(msg,"apiKey",params,undefined,false); 
			

			svc.deleteApiKey(params,cb);
		}
		
		service.DeleteAuthorizer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"authorizerId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"authorizerId",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"authorizerId",params,undefined,false); 
			

			svc.deleteAuthorizer(params,cb);
		}
		
		service.DeleteBasePathMapping=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domainName",params,undefined,false); 
			copyArgs(n,"basePath",params,undefined,false); 
			
			copyArgs(n,"domainName",params,undefined,false); 
			copyArgs(n,"basePath",params,undefined,false); 
			
			copyArgs(msg,"domainName",params,undefined,false); 
			copyArgs(msg,"basePath",params,undefined,false); 
			

			svc.deleteBasePathMapping(params,cb);
		}
		
		service.DeleteClientCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clientCertificateId",params,undefined,false); 
			
			copyArgs(n,"clientCertificateId",params,undefined,false); 
			
			copyArgs(msg,"clientCertificateId",params,undefined,false); 
			

			svc.deleteClientCertificate(params,cb);
		}
		
		service.DeleteDeployment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"deploymentId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"deploymentId",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"deploymentId",params,undefined,false); 
			

			svc.deleteDeployment(params,cb);
		}
		
		service.DeleteDocumentationPart=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"documentationPartId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"documentationPartId",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"documentationPartId",params,undefined,false); 
			

			svc.deleteDocumentationPart(params,cb);
		}
		
		service.DeleteDocumentationVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"documentationVersion",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"documentationVersion",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"documentationVersion",params,undefined,false); 
			

			svc.deleteDocumentationVersion(params,cb);
		}
		
		service.DeleteDomainName=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domainName",params,undefined,false); 
			
			copyArgs(n,"domainName",params,undefined,false); 
			
			copyArgs(msg,"domainName",params,undefined,false); 
			

			svc.deleteDomainName(params,cb);
		}
		
		service.DeleteGatewayResponse=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"responseType",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"responseType",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"responseType",params,undefined,false); 
			

			svc.deleteGatewayResponse(params,cb);
		}
		
		service.DeleteIntegration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"resourceId",params,undefined,false); 
			copyArgs(msg,"httpMethod",params,undefined,false); 
			

			svc.deleteIntegration(params,cb);
		}
		
		service.DeleteIntegrationResponse=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			copyArgs(n,"statusCode",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			copyArgs(n,"statusCode",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"resourceId",params,undefined,false); 
			copyArgs(msg,"httpMethod",params,undefined,false); 
			copyArgs(msg,"statusCode",params,undefined,false); 
			

			svc.deleteIntegrationResponse(params,cb);
		}
		
		service.DeleteMethod=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"resourceId",params,undefined,false); 
			copyArgs(msg,"httpMethod",params,undefined,false); 
			

			svc.deleteMethod(params,cb);
		}
		
		service.DeleteMethodResponse=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			copyArgs(n,"statusCode",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			copyArgs(n,"statusCode",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"resourceId",params,undefined,false); 
			copyArgs(msg,"httpMethod",params,undefined,false); 
			copyArgs(msg,"statusCode",params,undefined,false); 
			

			svc.deleteMethodResponse(params,cb);
		}
		
		service.DeleteModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"modelName",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"modelName",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"modelName",params,undefined,false); 
			

			svc.deleteModel(params,cb);
		}
		
		service.DeleteRequestValidator=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"requestValidatorId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"requestValidatorId",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"requestValidatorId",params,undefined,false); 
			

			svc.deleteRequestValidator(params,cb);
		}
		
		service.DeleteResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"resourceId",params,undefined,false); 
			

			svc.deleteResource(params,cb);
		}
		
		service.DeleteRestApi=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			

			svc.deleteRestApi(params,cb);
		}
		
		service.DeleteStage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"stageName",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"stageName",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"stageName",params,undefined,false); 
			

			svc.deleteStage(params,cb);
		}
		
		service.DeleteUsagePlan=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"usagePlanId",params,undefined,false); 
			
			copyArgs(n,"usagePlanId",params,undefined,false); 
			
			copyArgs(msg,"usagePlanId",params,undefined,false); 
			

			svc.deleteUsagePlan(params,cb);
		}
		
		service.DeleteUsagePlanKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"usagePlanId",params,undefined,false); 
			copyArgs(n,"keyId",params,undefined,false); 
			
			copyArgs(n,"usagePlanId",params,undefined,false); 
			copyArgs(n,"keyId",params,undefined,false); 
			
			copyArgs(msg,"usagePlanId",params,undefined,false); 
			copyArgs(msg,"keyId",params,undefined,false); 
			

			svc.deleteUsagePlanKey(params,cb);
		}
		
		service.DeleteVpcLink=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"vpcLinkId",params,undefined,false); 
			
			copyArgs(n,"vpcLinkId",params,undefined,false); 
			
			copyArgs(msg,"vpcLinkId",params,undefined,false); 
			

			svc.deleteVpcLink(params,cb);
		}
		
		service.FlushStageAuthorizersCache=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"stageName",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"stageName",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"stageName",params,undefined,false); 
			

			svc.flushStageAuthorizersCache(params,cb);
		}
		
		service.FlushStageCache=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"stageName",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"stageName",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"stageName",params,undefined,false); 
			

			svc.flushStageCache(params,cb);
		}
		
		service.GenerateClientCertificate=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.generateClientCertificate(params,cb);
		}
		
		service.GetAccount=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getAccount(params,cb);
		}
		
		service.GetApiKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiKey",params,undefined,false); 
			
			copyArgs(n,"apiKey",params,undefined,false); 
			copyArgs(Boolean(n),"includeValue",params,undefined,false); 
			
			copyArgs(msg,"apiKey",params,undefined,false); 
			copyArgs(msg,"includeValue",params,undefined,false); 
			

			svc.getApiKey(params,cb);
		}
		
		service.GetApiKeys=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"position",params,undefined,false); 
			copyArgs(Number(n),"limit",params,undefined,false); 
			copyArgs(n,"nameQuery",params,undefined,false); 
			copyArgs(n,"customerId",params,undefined,false); 
			copyArgs(Boolean(n),"includeValues",params,undefined,false); 
			
			copyArgs(msg,"position",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			copyArgs(msg,"nameQuery",params,undefined,false); 
			copyArgs(msg,"customerId",params,undefined,false); 
			copyArgs(msg,"includeValues",params,undefined,false); 
			

			svc.getApiKeys(params,cb);
		}
		
		service.GetAuthorizer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"authorizerId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"authorizerId",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"authorizerId",params,undefined,false); 
			

			svc.getAuthorizer(params,cb);
		}
		
		service.GetAuthorizers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"position",params,undefined,false); 
			copyArgs(Number(n),"limit",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"position",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			

			svc.getAuthorizers(params,cb);
		}
		
		service.GetBasePathMapping=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domainName",params,undefined,false); 
			copyArgs(n,"basePath",params,undefined,false); 
			
			copyArgs(n,"domainName",params,undefined,false); 
			copyArgs(n,"basePath",params,undefined,false); 
			
			copyArgs(msg,"domainName",params,undefined,false); 
			copyArgs(msg,"basePath",params,undefined,false); 
			

			svc.getBasePathMapping(params,cb);
		}
		
		service.GetBasePathMappings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domainName",params,undefined,false); 
			
			copyArgs(n,"domainName",params,undefined,false); 
			copyArgs(n,"position",params,undefined,false); 
			copyArgs(Number(n),"limit",params,undefined,false); 
			
			copyArgs(msg,"domainName",params,undefined,false); 
			copyArgs(msg,"position",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			

			svc.getBasePathMappings(params,cb);
		}
		
		service.GetClientCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clientCertificateId",params,undefined,false); 
			
			copyArgs(n,"clientCertificateId",params,undefined,false); 
			
			copyArgs(msg,"clientCertificateId",params,undefined,false); 
			

			svc.getClientCertificate(params,cb);
		}
		
		service.GetClientCertificates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"position",params,undefined,false); 
			copyArgs(Number(n),"limit",params,undefined,false); 
			
			copyArgs(msg,"position",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			

			svc.getClientCertificates(params,cb);
		}
		
		service.GetDeployment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"deploymentId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"deploymentId",params,undefined,false); 
			copyArgs(n,"embed",params,undefined,true); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"deploymentId",params,undefined,false); 
			copyArgs(msg,"embed",params,undefined,true); 
			

			svc.getDeployment(params,cb);
		}
		
		service.GetDeployments=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"position",params,undefined,false); 
			copyArgs(Number(n),"limit",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"position",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			

			svc.getDeployments(params,cb);
		}
		
		service.GetDocumentationPart=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"documentationPartId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"documentationPartId",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"documentationPartId",params,undefined,false); 
			

			svc.getDocumentationPart(params,cb);
		}
		
		service.GetDocumentationParts=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"type",params,undefined,false); 
			copyArgs(n,"nameQuery",params,undefined,false); 
			copyArgs(n,"path",params,undefined,false); 
			copyArgs(n,"position",params,undefined,false); 
			copyArgs(Number(n),"limit",params,undefined,false); 
			copyArgs(n,"locationStatus",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"type",params,undefined,false); 
			copyArgs(msg,"nameQuery",params,undefined,false); 
			copyArgs(msg,"path",params,undefined,false); 
			copyArgs(msg,"position",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			copyArgs(msg,"locationStatus",params,undefined,false); 
			

			svc.getDocumentationParts(params,cb);
		}
		
		service.GetDocumentationVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"documentationVersion",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"documentationVersion",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"documentationVersion",params,undefined,false); 
			

			svc.getDocumentationVersion(params,cb);
		}
		
		service.GetDocumentationVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"position",params,undefined,false); 
			copyArgs(Number(n),"limit",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"position",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			

			svc.getDocumentationVersions(params,cb);
		}
		
		service.GetDomainName=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domainName",params,undefined,false); 
			
			copyArgs(n,"domainName",params,undefined,false); 
			
			copyArgs(msg,"domainName",params,undefined,false); 
			

			svc.getDomainName(params,cb);
		}
		
		service.GetDomainNames=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"position",params,undefined,false); 
			copyArgs(Number(n),"limit",params,undefined,false); 
			
			copyArgs(msg,"position",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			

			svc.getDomainNames(params,cb);
		}
		
		service.GetExport=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"stageName",params,undefined,false); 
			copyArgs(n,"exportType",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"stageName",params,undefined,false); 
			copyArgs(n,"exportType",params,undefined,false); 
			copyArgs(n,"parameters",params,undefined,true); 
			copyArgs(n,"accepts",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"stageName",params,undefined,false); 
			copyArgs(msg,"exportType",params,undefined,false); 
			copyArgs(msg,"parameters",params,undefined,true); 
			copyArgs(msg,"accepts",params,undefined,false); 
			

			svc.getExport(params,cb);
		}
		
		service.GetGatewayResponse=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"responseType",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"responseType",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"responseType",params,undefined,false); 
			

			svc.getGatewayResponse(params,cb);
		}
		
		service.GetGatewayResponses=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"position",params,undefined,false); 
			copyArgs(Number(n),"limit",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"position",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			

			svc.getGatewayResponses(params,cb);
		}
		
		service.GetIntegration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"resourceId",params,undefined,false); 
			copyArgs(msg,"httpMethod",params,undefined,false); 
			

			svc.getIntegration(params,cb);
		}
		
		service.GetIntegrationResponse=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			copyArgs(n,"statusCode",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			copyArgs(n,"statusCode",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"resourceId",params,undefined,false); 
			copyArgs(msg,"httpMethod",params,undefined,false); 
			copyArgs(msg,"statusCode",params,undefined,false); 
			

			svc.getIntegrationResponse(params,cb);
		}
		
		service.GetMethod=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"resourceId",params,undefined,false); 
			copyArgs(msg,"httpMethod",params,undefined,false); 
			

			svc.getMethod(params,cb);
		}
		
		service.GetMethodResponse=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			copyArgs(n,"statusCode",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			copyArgs(n,"statusCode",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"resourceId",params,undefined,false); 
			copyArgs(msg,"httpMethod",params,undefined,false); 
			copyArgs(msg,"statusCode",params,undefined,false); 
			

			svc.getMethodResponse(params,cb);
		}
		
		service.GetModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"modelName",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"modelName",params,undefined,false); 
			copyArgs(Boolean(n),"flatten",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"modelName",params,undefined,false); 
			copyArgs(msg,"flatten",params,undefined,false); 
			

			svc.getModel(params,cb);
		}
		
		service.GetModelTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"modelName",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"modelName",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"modelName",params,undefined,false); 
			

			svc.getModelTemplate(params,cb);
		}
		
		service.GetModels=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"position",params,undefined,false); 
			copyArgs(Number(n),"limit",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"position",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			

			svc.getModels(params,cb);
		}
		
		service.GetRequestValidator=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"requestValidatorId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"requestValidatorId",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"requestValidatorId",params,undefined,false); 
			

			svc.getRequestValidator(params,cb);
		}
		
		service.GetRequestValidators=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"position",params,undefined,false); 
			copyArgs(Number(n),"limit",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"position",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			

			svc.getRequestValidators(params,cb);
		}
		
		service.GetResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"embed",params,undefined,true); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"resourceId",params,undefined,false); 
			copyArgs(msg,"embed",params,undefined,true); 
			

			svc.getResource(params,cb);
		}
		
		service.GetResources=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"position",params,undefined,false); 
			copyArgs(Number(n),"limit",params,undefined,false); 
			copyArgs(n,"embed",params,undefined,true); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"position",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			copyArgs(msg,"embed",params,undefined,true); 
			

			svc.getResources(params,cb);
		}
		
		service.GetRestApi=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			

			svc.getRestApi(params,cb);
		}
		
		service.GetRestApis=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"position",params,undefined,false); 
			copyArgs(Number(n),"limit",params,undefined,false); 
			
			copyArgs(msg,"position",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			

			svc.getRestApis(params,cb);
		}
		
		service.GetSdk=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"stageName",params,undefined,false); 
			copyArgs(n,"sdkType",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"stageName",params,undefined,false); 
			copyArgs(n,"sdkType",params,undefined,false); 
			copyArgs(n,"parameters",params,undefined,true); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"stageName",params,undefined,false); 
			copyArgs(msg,"sdkType",params,undefined,false); 
			copyArgs(msg,"parameters",params,undefined,true); 
			

			svc.getSdk(params,cb);
		}
		
		service.GetSdkType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(n,"id",params,undefined,false); 
			
			copyArgs(msg,"id",params,undefined,false); 
			

			svc.getSdkType(params,cb);
		}
		
		service.GetSdkTypes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"position",params,undefined,false); 
			copyArgs(Number(n),"limit",params,undefined,false); 
			
			copyArgs(msg,"position",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			

			svc.getSdkTypes(params,cb);
		}
		
		service.GetStage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"stageName",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"stageName",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"stageName",params,undefined,false); 
			

			svc.getStage(params,cb);
		}
		
		service.GetStages=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"deploymentId",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"deploymentId",params,undefined,false); 
			

			svc.getStages(params,cb);
		}
		
		service.GetTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"position",params,undefined,false); 
			copyArgs(Number(n),"limit",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"position",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			

			svc.getTags(params,cb);
		}
		
		service.GetUsage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"usagePlanId",params,undefined,false); 
			copyArgs(n,"startDate",params,undefined,false); 
			copyArgs(n,"endDate",params,undefined,false); 
			
			copyArgs(n,"usagePlanId",params,undefined,false); 
			copyArgs(n,"keyId",params,undefined,false); 
			copyArgs(n,"startDate",params,undefined,false); 
			copyArgs(n,"endDate",params,undefined,false); 
			copyArgs(n,"position",params,undefined,false); 
			copyArgs(Number(n),"limit",params,undefined,false); 
			
			copyArgs(msg,"usagePlanId",params,undefined,false); 
			copyArgs(msg,"keyId",params,undefined,false); 
			copyArgs(msg,"startDate",params,undefined,false); 
			copyArgs(msg,"endDate",params,undefined,false); 
			copyArgs(msg,"position",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			

			svc.getUsage(params,cb);
		}
		
		service.GetUsagePlan=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"usagePlanId",params,undefined,false); 
			
			copyArgs(n,"usagePlanId",params,undefined,false); 
			
			copyArgs(msg,"usagePlanId",params,undefined,false); 
			

			svc.getUsagePlan(params,cb);
		}
		
		service.GetUsagePlanKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"usagePlanId",params,undefined,false); 
			copyArgs(n,"keyId",params,undefined,false); 
			
			copyArgs(n,"usagePlanId",params,undefined,false); 
			copyArgs(n,"keyId",params,undefined,false); 
			
			copyArgs(msg,"usagePlanId",params,undefined,false); 
			copyArgs(msg,"keyId",params,undefined,false); 
			

			svc.getUsagePlanKey(params,cb);
		}
		
		service.GetUsagePlanKeys=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"usagePlanId",params,undefined,false); 
			
			copyArgs(n,"usagePlanId",params,undefined,false); 
			copyArgs(n,"position",params,undefined,false); 
			copyArgs(Number(n),"limit",params,undefined,false); 
			copyArgs(n,"nameQuery",params,undefined,false); 
			
			copyArgs(msg,"usagePlanId",params,undefined,false); 
			copyArgs(msg,"position",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			copyArgs(msg,"nameQuery",params,undefined,false); 
			

			svc.getUsagePlanKeys(params,cb);
		}
		
		service.GetUsagePlans=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"position",params,undefined,false); 
			copyArgs(n,"keyId",params,undefined,false); 
			copyArgs(Number(n),"limit",params,undefined,false); 
			
			copyArgs(msg,"position",params,undefined,false); 
			copyArgs(msg,"keyId",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			

			svc.getUsagePlans(params,cb);
		}
		
		service.GetVpcLink=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"vpcLinkId",params,undefined,false); 
			
			copyArgs(n,"vpcLinkId",params,undefined,false); 
			
			copyArgs(msg,"vpcLinkId",params,undefined,false); 
			

			svc.getVpcLink(params,cb);
		}
		
		service.GetVpcLinks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"position",params,undefined,false); 
			copyArgs(Number(n),"limit",params,undefined,false); 
			
			copyArgs(msg,"position",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			

			svc.getVpcLinks(params,cb);
		}
		
		service.ImportApiKeys=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"body",params,undefined,false); 
			copyArgs(n,"format",params,undefined,false); 
			
			copyArgs(n,"body",params,undefined,false); 
			copyArgs(n,"format",params,undefined,false); 
			copyArgs(Boolean(n),"failOnWarnings",params,undefined,false); 
			
			copyArgs(msg,"body",params,undefined,false); 
			copyArgs(msg,"format",params,undefined,false); 
			copyArgs(msg,"failOnWarnings",params,undefined,false); 
			

			svc.importApiKeys(params,cb);
		}
		
		service.ImportDocumentationParts=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"body",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"mode",params,undefined,false); 
			copyArgs(Boolean(n),"failOnWarnings",params,undefined,false); 
			copyArgs(n,"body",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"mode",params,undefined,false); 
			copyArgs(msg,"failOnWarnings",params,undefined,false); 
			copyArgs(msg,"body",params,undefined,false); 
			

			svc.importDocumentationParts(params,cb);
		}
		
		service.ImportRestApi=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"body",params,undefined,false); 
			
			copyArgs(Boolean(n),"failOnWarnings",params,undefined,false); 
			copyArgs(n,"parameters",params,undefined,true); 
			copyArgs(n,"body",params,undefined,false); 
			
			copyArgs(msg,"failOnWarnings",params,undefined,false); 
			copyArgs(msg,"parameters",params,undefined,true); 
			copyArgs(msg,"body",params,undefined,false); 
			

			svc.importRestApi(params,cb);
		}
		
		service.PutGatewayResponse=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"responseType",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"responseType",params,undefined,false); 
			copyArgs(n,"statusCode",params,undefined,false); 
			copyArgs(n,"responseParameters",params,undefined,true); 
			copyArgs(n,"responseTemplates",params,undefined,true); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"responseType",params,undefined,false); 
			copyArgs(msg,"statusCode",params,undefined,false); 
			copyArgs(msg,"responseParameters",params,undefined,true); 
			copyArgs(msg,"responseTemplates",params,undefined,true); 
			

			svc.putGatewayResponse(params,cb);
		}
		
		service.PutIntegration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			copyArgs(n,"_type",params,"type",false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			copyArgs(n,"type",params,undefined,false); 
			copyArgs(n,"integrationHttpMethod",params,undefined,false); 
			copyArgs(n,"uri",params,undefined,false); 
			copyArgs(n,"connectionType",params,undefined,false); 
			copyArgs(n,"connectionId",params,undefined,false); 
			copyArgs(n,"credentials",params,undefined,false); 
			copyArgs(n,"requestParameters",params,undefined,true); 
			copyArgs(n,"requestTemplates",params,undefined,true); 
			copyArgs(n,"passthroughBehavior",params,undefined,false); 
			copyArgs(n,"cacheNamespace",params,undefined,false); 
			copyArgs(n,"cacheKeyParameters",params,undefined,true); 
			copyArgs(n,"contentHandling",params,undefined,false); 
			copyArgs(Number(n),"timeoutInMillis",params,undefined,false); 
			copyArgs(n,"tlsConfig",params,undefined,true); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"resourceId",params,undefined,false); 
			copyArgs(msg,"httpMethod",params,undefined,false); 
			copyArgs(msg,"type",params,undefined,false); 
			copyArgs(msg,"integrationHttpMethod",params,undefined,false); 
			copyArgs(msg,"uri",params,undefined,false); 
			copyArgs(msg,"connectionType",params,undefined,false); 
			copyArgs(msg,"connectionId",params,undefined,false); 
			copyArgs(msg,"credentials",params,undefined,false); 
			copyArgs(msg,"requestParameters",params,undefined,true); 
			copyArgs(msg,"requestTemplates",params,undefined,true); 
			copyArgs(msg,"passthroughBehavior",params,undefined,false); 
			copyArgs(msg,"cacheNamespace",params,undefined,false); 
			copyArgs(msg,"cacheKeyParameters",params,undefined,true); 
			copyArgs(msg,"contentHandling",params,undefined,false); 
			copyArgs(msg,"timeoutInMillis",params,undefined,false); 
			copyArgs(msg,"tlsConfig",params,undefined,true); 
			

			svc.putIntegration(params,cb);
		}
		
		service.PutIntegrationResponse=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			copyArgs(n,"statusCode",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			copyArgs(n,"statusCode",params,undefined,false); 
			copyArgs(n,"selectionPattern",params,undefined,false); 
			copyArgs(n,"responseParameters",params,undefined,true); 
			copyArgs(n,"responseTemplates",params,undefined,true); 
			copyArgs(n,"contentHandling",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"resourceId",params,undefined,false); 
			copyArgs(msg,"httpMethod",params,undefined,false); 
			copyArgs(msg,"statusCode",params,undefined,false); 
			copyArgs(msg,"selectionPattern",params,undefined,false); 
			copyArgs(msg,"responseParameters",params,undefined,true); 
			copyArgs(msg,"responseTemplates",params,undefined,true); 
			copyArgs(msg,"contentHandling",params,undefined,false); 
			

			svc.putIntegrationResponse(params,cb);
		}
		
		service.PutMethod=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			copyArgs(n,"authorizationType",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			copyArgs(n,"authorizationType",params,undefined,false); 
			copyArgs(n,"authorizerId",params,undefined,false); 
			copyArgs(Boolean(n),"apiKeyRequired",params,undefined,false); 
			copyArgs(n,"operationName",params,undefined,false); 
			copyArgs(n,"requestParameters",params,undefined,true); 
			copyArgs(n,"requestModels",params,undefined,true); 
			copyArgs(n,"requestValidatorId",params,undefined,false); 
			copyArgs(n,"authorizationScopes",params,undefined,true); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"resourceId",params,undefined,false); 
			copyArgs(msg,"httpMethod",params,undefined,false); 
			copyArgs(msg,"authorizationType",params,undefined,false); 
			copyArgs(msg,"authorizerId",params,undefined,false); 
			copyArgs(msg,"apiKeyRequired",params,undefined,false); 
			copyArgs(msg,"operationName",params,undefined,false); 
			copyArgs(msg,"requestParameters",params,undefined,true); 
			copyArgs(msg,"requestModels",params,undefined,true); 
			copyArgs(msg,"requestValidatorId",params,undefined,false); 
			copyArgs(msg,"authorizationScopes",params,undefined,true); 
			

			svc.putMethod(params,cb);
		}
		
		service.PutMethodResponse=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			copyArgs(n,"statusCode",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			copyArgs(n,"statusCode",params,undefined,false); 
			copyArgs(n,"responseParameters",params,undefined,true); 
			copyArgs(n,"responseModels",params,undefined,true); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"resourceId",params,undefined,false); 
			copyArgs(msg,"httpMethod",params,undefined,false); 
			copyArgs(msg,"statusCode",params,undefined,false); 
			copyArgs(msg,"responseParameters",params,undefined,true); 
			copyArgs(msg,"responseModels",params,undefined,true); 
			

			svc.putMethodResponse(params,cb);
		}
		
		service.PutRestApi=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"body",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"mode",params,undefined,false); 
			copyArgs(Boolean(n),"failOnWarnings",params,undefined,false); 
			copyArgs(n,"parameters",params,undefined,true); 
			copyArgs(n,"body",params,undefined,false); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"mode",params,undefined,false); 
			copyArgs(msg,"failOnWarnings",params,undefined,false); 
			copyArgs(msg,"parameters",params,undefined,true); 
			copyArgs(msg,"body",params,undefined,false); 
			

			svc.putRestApi(params,cb);
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
		
		service.TestInvokeAuthorizer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"authorizerId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"authorizerId",params,undefined,false); 
			copyArgs(n,"headers",params,undefined,true); 
			copyArgs(n,"multiValueHeaders",params,undefined,true); 
			copyArgs(n,"pathWithQueryString",params,undefined,false); 
			copyArgs(n,"body",params,undefined,false); 
			copyArgs(n,"stageVariables",params,undefined,true); 
			copyArgs(n,"additionalContext",params,undefined,true); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"authorizerId",params,undefined,false); 
			copyArgs(msg,"headers",params,undefined,true); 
			copyArgs(msg,"multiValueHeaders",params,undefined,true); 
			copyArgs(msg,"pathWithQueryString",params,undefined,false); 
			copyArgs(msg,"body",params,undefined,false); 
			copyArgs(msg,"stageVariables",params,undefined,true); 
			copyArgs(msg,"additionalContext",params,undefined,true); 
			

			svc.testInvokeAuthorizer(params,cb);
		}
		
		service.TestInvokeMethod=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			copyArgs(n,"pathWithQueryString",params,undefined,false); 
			copyArgs(n,"body",params,undefined,false); 
			copyArgs(n,"headers",params,undefined,true); 
			copyArgs(n,"multiValueHeaders",params,undefined,true); 
			copyArgs(n,"clientCertificateId",params,undefined,false); 
			copyArgs(n,"stageVariables",params,undefined,true); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"resourceId",params,undefined,false); 
			copyArgs(msg,"httpMethod",params,undefined,false); 
			copyArgs(msg,"pathWithQueryString",params,undefined,false); 
			copyArgs(msg,"body",params,undefined,false); 
			copyArgs(msg,"headers",params,undefined,true); 
			copyArgs(msg,"multiValueHeaders",params,undefined,true); 
			copyArgs(msg,"clientCertificateId",params,undefined,false); 
			copyArgs(msg,"stageVariables",params,undefined,true); 
			

			svc.testInvokeMethod(params,cb);
		}
		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,true); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,true); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tagKeys",params,undefined,true); 
			

			svc.untagResource(params,cb);
		}
		
		service.UpdateAccount=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"patchOperations",params,undefined,true); 
			
			copyArgs(msg,"patchOperations",params,undefined,true); 
			

			svc.updateAccount(params,cb);
		}
		
		service.UpdateApiKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"apiKey",params,undefined,false); 
			
			copyArgs(n,"apiKey",params,undefined,false); 
			copyArgs(n,"patchOperations",params,undefined,true); 
			
			copyArgs(msg,"apiKey",params,undefined,false); 
			copyArgs(msg,"patchOperations",params,undefined,true); 
			

			svc.updateApiKey(params,cb);
		}
		
		service.UpdateAuthorizer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"authorizerId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"authorizerId",params,undefined,false); 
			copyArgs(n,"patchOperations",params,undefined,true); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"authorizerId",params,undefined,false); 
			copyArgs(msg,"patchOperations",params,undefined,true); 
			

			svc.updateAuthorizer(params,cb);
		}
		
		service.UpdateBasePathMapping=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domainName",params,undefined,false); 
			copyArgs(n,"basePath",params,undefined,false); 
			
			copyArgs(n,"domainName",params,undefined,false); 
			copyArgs(n,"basePath",params,undefined,false); 
			copyArgs(n,"patchOperations",params,undefined,true); 
			
			copyArgs(msg,"domainName",params,undefined,false); 
			copyArgs(msg,"basePath",params,undefined,false); 
			copyArgs(msg,"patchOperations",params,undefined,true); 
			

			svc.updateBasePathMapping(params,cb);
		}
		
		service.UpdateClientCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"clientCertificateId",params,undefined,false); 
			
			copyArgs(n,"clientCertificateId",params,undefined,false); 
			copyArgs(n,"patchOperations",params,undefined,true); 
			
			copyArgs(msg,"clientCertificateId",params,undefined,false); 
			copyArgs(msg,"patchOperations",params,undefined,true); 
			

			svc.updateClientCertificate(params,cb);
		}
		
		service.UpdateDeployment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"deploymentId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"deploymentId",params,undefined,false); 
			copyArgs(n,"patchOperations",params,undefined,true); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"deploymentId",params,undefined,false); 
			copyArgs(msg,"patchOperations",params,undefined,true); 
			

			svc.updateDeployment(params,cb);
		}
		
		service.UpdateDocumentationPart=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"documentationPartId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"documentationPartId",params,undefined,false); 
			copyArgs(n,"patchOperations",params,undefined,true); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"documentationPartId",params,undefined,false); 
			copyArgs(msg,"patchOperations",params,undefined,true); 
			

			svc.updateDocumentationPart(params,cb);
		}
		
		service.UpdateDocumentationVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"documentationVersion",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"documentationVersion",params,undefined,false); 
			copyArgs(n,"patchOperations",params,undefined,true); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"documentationVersion",params,undefined,false); 
			copyArgs(msg,"patchOperations",params,undefined,true); 
			

			svc.updateDocumentationVersion(params,cb);
		}
		
		service.UpdateDomainName=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domainName",params,undefined,false); 
			
			copyArgs(n,"domainName",params,undefined,false); 
			copyArgs(n,"patchOperations",params,undefined,true); 
			
			copyArgs(msg,"domainName",params,undefined,false); 
			copyArgs(msg,"patchOperations",params,undefined,true); 
			

			svc.updateDomainName(params,cb);
		}
		
		service.UpdateGatewayResponse=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"responseType",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"responseType",params,undefined,false); 
			copyArgs(n,"patchOperations",params,undefined,true); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"responseType",params,undefined,false); 
			copyArgs(msg,"patchOperations",params,undefined,true); 
			

			svc.updateGatewayResponse(params,cb);
		}
		
		service.UpdateIntegration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			copyArgs(n,"patchOperations",params,undefined,true); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"resourceId",params,undefined,false); 
			copyArgs(msg,"httpMethod",params,undefined,false); 
			copyArgs(msg,"patchOperations",params,undefined,true); 
			

			svc.updateIntegration(params,cb);
		}
		
		service.UpdateIntegrationResponse=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			copyArgs(n,"statusCode",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			copyArgs(n,"statusCode",params,undefined,false); 
			copyArgs(n,"patchOperations",params,undefined,true); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"resourceId",params,undefined,false); 
			copyArgs(msg,"httpMethod",params,undefined,false); 
			copyArgs(msg,"statusCode",params,undefined,false); 
			copyArgs(msg,"patchOperations",params,undefined,true); 
			

			svc.updateIntegrationResponse(params,cb);
		}
		
		service.UpdateMethod=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			copyArgs(n,"patchOperations",params,undefined,true); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"resourceId",params,undefined,false); 
			copyArgs(msg,"httpMethod",params,undefined,false); 
			copyArgs(msg,"patchOperations",params,undefined,true); 
			

			svc.updateMethod(params,cb);
		}
		
		service.UpdateMethodResponse=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			copyArgs(n,"statusCode",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"httpMethod",params,undefined,false); 
			copyArgs(n,"statusCode",params,undefined,false); 
			copyArgs(n,"patchOperations",params,undefined,true); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"resourceId",params,undefined,false); 
			copyArgs(msg,"httpMethod",params,undefined,false); 
			copyArgs(msg,"statusCode",params,undefined,false); 
			copyArgs(msg,"patchOperations",params,undefined,true); 
			

			svc.updateMethodResponse(params,cb);
		}
		
		service.UpdateModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"modelName",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"modelName",params,undefined,false); 
			copyArgs(n,"patchOperations",params,undefined,true); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"modelName",params,undefined,false); 
			copyArgs(msg,"patchOperations",params,undefined,true); 
			

			svc.updateModel(params,cb);
		}
		
		service.UpdateRequestValidator=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"requestValidatorId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"requestValidatorId",params,undefined,false); 
			copyArgs(n,"patchOperations",params,undefined,true); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"requestValidatorId",params,undefined,false); 
			copyArgs(msg,"patchOperations",params,undefined,true); 
			

			svc.updateRequestValidator(params,cb);
		}
		
		service.UpdateResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"patchOperations",params,undefined,true); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"resourceId",params,undefined,false); 
			copyArgs(msg,"patchOperations",params,undefined,true); 
			

			svc.updateResource(params,cb);
		}
		
		service.UpdateRestApi=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"patchOperations",params,undefined,true); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"patchOperations",params,undefined,true); 
			

			svc.updateRestApi(params,cb);
		}
		
		service.UpdateStage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"stageName",params,undefined,false); 
			
			copyArgs(n,"restApiId",params,undefined,false); 
			copyArgs(n,"stageName",params,undefined,false); 
			copyArgs(n,"patchOperations",params,undefined,true); 
			
			copyArgs(msg,"restApiId",params,undefined,false); 
			copyArgs(msg,"stageName",params,undefined,false); 
			copyArgs(msg,"patchOperations",params,undefined,true); 
			

			svc.updateStage(params,cb);
		}
		
		service.UpdateUsage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"usagePlanId",params,undefined,false); 
			copyArgs(n,"keyId",params,undefined,false); 
			
			copyArgs(n,"usagePlanId",params,undefined,false); 
			copyArgs(n,"keyId",params,undefined,false); 
			copyArgs(n,"patchOperations",params,undefined,true); 
			
			copyArgs(msg,"usagePlanId",params,undefined,false); 
			copyArgs(msg,"keyId",params,undefined,false); 
			copyArgs(msg,"patchOperations",params,undefined,true); 
			

			svc.updateUsage(params,cb);
		}
		
		service.UpdateUsagePlan=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"usagePlanId",params,undefined,false); 
			
			copyArgs(n,"usagePlanId",params,undefined,false); 
			copyArgs(n,"patchOperations",params,undefined,true); 
			
			copyArgs(msg,"usagePlanId",params,undefined,false); 
			copyArgs(msg,"patchOperations",params,undefined,true); 
			

			svc.updateUsagePlan(params,cb);
		}
		
		service.UpdateVpcLink=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"vpcLinkId",params,undefined,false); 
			
			copyArgs(n,"vpcLinkId",params,undefined,false); 
			copyArgs(n,"patchOperations",params,undefined,true); 
			
			copyArgs(msg,"vpcLinkId",params,undefined,false); 
			copyArgs(msg,"patchOperations",params,undefined,true); 
			

			svc.updateVpcLink(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS APIGateway", AmazonAPINode);

};
