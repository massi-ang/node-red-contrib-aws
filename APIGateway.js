
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

		var awsService = new AWS.APIGateway( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.APIGateway(msg.AWSConfig) : awsService;

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

		
		service.CreateApiKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"enabled",params,undefined,false); 
			copyArg(msg,"generateDistinctId",params,undefined,false); 
			copyArg(msg,"value",params,undefined,false); 
			copyArg(msg,"stageKeys",params,undefined,false); 
			copyArg(msg,"customerId",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createApiKey(params,cb);
		}

		
		service.CreateAuthorizer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"_type",params,"type",false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"type",params,undefined,false); 
			copyArg(msg,"providerARNs",params,undefined,true); 
			copyArg(msg,"authType",params,undefined,false); 
			copyArg(msg,"authorizerUri",params,undefined,false); 
			copyArg(msg,"authorizerCredentials",params,undefined,false); 
			copyArg(msg,"identitySource",params,undefined,false); 
			copyArg(msg,"identityValidationExpression",params,undefined,false); 
			copyArg(msg,"authorizerResultTtlInSeconds",params,undefined,false); 
			

			svc.createAuthorizer(params,cb);
		}

		
		service.CreateBasePathMapping=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domainName",params,undefined,false); 
			copyArg(n,"restApiId",params,undefined,false); 
			
			copyArg(msg,"domainName",params,undefined,false); 
			copyArg(msg,"basePath",params,undefined,false); 
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"stage",params,undefined,false); 
			

			svc.createBasePathMapping(params,cb);
		}

		
		service.CreateDeployment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"stageName",params,undefined,false); 
			copyArg(msg,"stageDescription",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"cacheClusterEnabled",params,undefined,false); 
			copyArg(msg,"cacheClusterSize",params,undefined,false); 
			copyArg(msg,"variables",params,undefined,true); 
			copyArg(msg,"canarySettings",params,undefined,false); 
			copyArg(msg,"tracingEnabled",params,undefined,false); 
			

			svc.createDeployment(params,cb);
		}

		
		service.CreateDocumentationPart=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"location",params,undefined,true); 
			copyArg(n,"properties",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"location",params,undefined,true); 
			copyArg(msg,"properties",params,undefined,false); 
			

			svc.createDocumentationPart(params,cb);
		}

		
		service.CreateDocumentationVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"documentationVersion",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"documentationVersion",params,undefined,false); 
			copyArg(msg,"stageName",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			

			svc.createDocumentationVersion(params,cb);
		}

		
		service.CreateDomainName=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domainName",params,undefined,false); 
			
			copyArg(msg,"domainName",params,undefined,false); 
			copyArg(msg,"certificateName",params,undefined,false); 
			copyArg(msg,"certificateBody",params,undefined,false); 
			copyArg(msg,"certificatePrivateKey",params,undefined,false); 
			copyArg(msg,"certificateChain",params,undefined,false); 
			copyArg(msg,"certificateArn",params,undefined,false); 
			copyArg(msg,"regionalCertificateName",params,undefined,false); 
			copyArg(msg,"regionalCertificateArn",params,undefined,false); 
			copyArg(msg,"endpointConfiguration",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"securityPolicy",params,undefined,false); 
			copyArg(msg,"mutualTlsAuthentication",params,undefined,false); 
			copyArg(msg,"ownershipVerificationCertificateArn",params,undefined,false); 
			

			svc.createDomainName(params,cb);
		}

		
		service.CreateModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"contentType",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"schema",params,undefined,false); 
			copyArg(msg,"contentType",params,undefined,false); 
			

			svc.createModel(params,cb);
		}

		
		service.CreateRequestValidator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"validateRequestBody",params,undefined,false); 
			copyArg(msg,"validateRequestParameters",params,undefined,false); 
			

			svc.createRequestValidator(params,cb);
		}

		
		service.CreateResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"parentId",params,undefined,false); 
			copyArg(n,"pathPart",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"parentId",params,undefined,false); 
			copyArg(msg,"pathPart",params,undefined,false); 
			

			svc.createResource(params,cb);
		}

		
		service.CreateRestApi=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"version",params,undefined,false); 
			copyArg(msg,"cloneFrom",params,undefined,false); 
			copyArg(msg,"binaryMediaTypes",params,undefined,true); 
			copyArg(msg,"minimumCompressionSize",params,undefined,false); 
			copyArg(msg,"apiKeySource",params,undefined,false); 
			copyArg(msg,"endpointConfiguration",params,undefined,true); 
			copyArg(msg,"policy",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"disableExecuteApiEndpoint",params,undefined,false); 
			

			svc.createRestApi(params,cb);
		}

		
		service.CreateStage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"stageName",params,undefined,false); 
			copyArg(n,"deploymentId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"stageName",params,undefined,false); 
			copyArg(msg,"deploymentId",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"cacheClusterEnabled",params,undefined,false); 
			copyArg(msg,"cacheClusterSize",params,undefined,false); 
			copyArg(msg,"variables",params,undefined,true); 
			copyArg(msg,"documentationVersion",params,undefined,false); 
			copyArg(msg,"canarySettings",params,undefined,true); 
			copyArg(msg,"tracingEnabled",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createStage(params,cb);
		}

		
		service.CreateUsagePlan=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"apiStages",params,undefined,true); 
			copyArg(msg,"throttle",params,undefined,true); 
			copyArg(msg,"quota",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createUsagePlan(params,cb);
		}

		
		service.CreateUsagePlanKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"usagePlanId",params,undefined,false); 
			copyArg(n,"keyId",params,undefined,false); 
			copyArg(n,"keyType",params,undefined,false); 
			
			copyArg(msg,"usagePlanId",params,undefined,false); 
			copyArg(msg,"keyId",params,undefined,false); 
			copyArg(msg,"keyType",params,undefined,false); 
			

			svc.createUsagePlanKey(params,cb);
		}

		
		service.CreateVpcLink=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"targetArns",params,undefined,true); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"targetArns",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createVpcLink(params,cb);
		}

		
		service.DeleteApiKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiKey",params,undefined,false); 
			
			copyArg(msg,"apiKey",params,undefined,false); 
			

			svc.deleteApiKey(params,cb);
		}

		
		service.DeleteAuthorizer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"authorizerId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"authorizerId",params,undefined,false); 
			

			svc.deleteAuthorizer(params,cb);
		}

		
		service.DeleteBasePathMapping=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domainName",params,undefined,false); 
			copyArg(n,"basePath",params,undefined,false); 
			
			copyArg(msg,"domainName",params,undefined,false); 
			copyArg(msg,"basePath",params,undefined,false); 
			

			svc.deleteBasePathMapping(params,cb);
		}

		
		service.DeleteClientCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"clientCertificateId",params,undefined,false); 
			
			copyArg(msg,"clientCertificateId",params,undefined,false); 
			

			svc.deleteClientCertificate(params,cb);
		}

		
		service.DeleteDeployment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"deploymentId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"deploymentId",params,undefined,false); 
			

			svc.deleteDeployment(params,cb);
		}

		
		service.DeleteDocumentationPart=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"documentationPartId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"documentationPartId",params,undefined,false); 
			

			svc.deleteDocumentationPart(params,cb);
		}

		
		service.DeleteDocumentationVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"documentationVersion",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"documentationVersion",params,undefined,false); 
			

			svc.deleteDocumentationVersion(params,cb);
		}

		
		service.DeleteDomainName=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domainName",params,undefined,false); 
			
			copyArg(msg,"domainName",params,undefined,false); 
			

			svc.deleteDomainName(params,cb);
		}

		
		service.DeleteGatewayResponse=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"responseType",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"responseType",params,undefined,false); 
			

			svc.deleteGatewayResponse(params,cb);
		}

		
		service.DeleteIntegration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"resourceId",params,undefined,false); 
			copyArg(n,"httpMethod",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"resourceId",params,undefined,false); 
			copyArg(msg,"httpMethod",params,undefined,false); 
			

			svc.deleteIntegration(params,cb);
		}

		
		service.DeleteIntegrationResponse=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"resourceId",params,undefined,false); 
			copyArg(n,"httpMethod",params,undefined,false); 
			copyArg(n,"statusCode",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"resourceId",params,undefined,false); 
			copyArg(msg,"httpMethod",params,undefined,false); 
			copyArg(msg,"statusCode",params,undefined,false); 
			

			svc.deleteIntegrationResponse(params,cb);
		}

		
		service.DeleteMethod=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"resourceId",params,undefined,false); 
			copyArg(n,"httpMethod",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"resourceId",params,undefined,false); 
			copyArg(msg,"httpMethod",params,undefined,false); 
			

			svc.deleteMethod(params,cb);
		}

		
		service.DeleteMethodResponse=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"resourceId",params,undefined,false); 
			copyArg(n,"httpMethod",params,undefined,false); 
			copyArg(n,"statusCode",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"resourceId",params,undefined,false); 
			copyArg(msg,"httpMethod",params,undefined,false); 
			copyArg(msg,"statusCode",params,undefined,false); 
			

			svc.deleteMethodResponse(params,cb);
		}

		
		service.DeleteModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"modelName",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"modelName",params,undefined,false); 
			

			svc.deleteModel(params,cb);
		}

		
		service.DeleteRequestValidator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"requestValidatorId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"requestValidatorId",params,undefined,false); 
			

			svc.deleteRequestValidator(params,cb);
		}

		
		service.DeleteResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"resourceId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"resourceId",params,undefined,false); 
			

			svc.deleteResource(params,cb);
		}

		
		service.DeleteRestApi=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			

			svc.deleteRestApi(params,cb);
		}

		
		service.DeleteStage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"stageName",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"stageName",params,undefined,false); 
			

			svc.deleteStage(params,cb);
		}

		
		service.DeleteUsagePlan=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"usagePlanId",params,undefined,false); 
			
			copyArg(msg,"usagePlanId",params,undefined,false); 
			

			svc.deleteUsagePlan(params,cb);
		}

		
		service.DeleteUsagePlanKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"usagePlanId",params,undefined,false); 
			copyArg(n,"keyId",params,undefined,false); 
			
			copyArg(msg,"usagePlanId",params,undefined,false); 
			copyArg(msg,"keyId",params,undefined,false); 
			

			svc.deleteUsagePlanKey(params,cb);
		}

		
		service.DeleteVpcLink=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"vpcLinkId",params,undefined,false); 
			
			copyArg(msg,"vpcLinkId",params,undefined,false); 
			

			svc.deleteVpcLink(params,cb);
		}

		
		service.FlushStageAuthorizersCache=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"stageName",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"stageName",params,undefined,false); 
			

			svc.flushStageAuthorizersCache(params,cb);
		}

		
		service.FlushStageCache=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"stageName",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"stageName",params,undefined,false); 
			

			svc.flushStageCache(params,cb);
		}

		
		service.GenerateClientCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.generateClientCertificate(params,cb);
		}

		
		service.GetAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getAccount(params,cb);
		}

		
		service.GetApiKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiKey",params,undefined,false); 
			
			copyArg(msg,"apiKey",params,undefined,false); 
			copyArg(msg,"includeValue",params,undefined,false); 
			

			svc.getApiKey(params,cb);
		}

		
		service.GetApiKeys=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"position",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			copyArg(msg,"nameQuery",params,undefined,false); 
			copyArg(msg,"customerId",params,undefined,false); 
			copyArg(msg,"includeValues",params,undefined,false); 
			

			svc.getApiKeys(params,cb);
		}

		
		service.GetAuthorizer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"authorizerId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"authorizerId",params,undefined,false); 
			

			svc.getAuthorizer(params,cb);
		}

		
		service.GetAuthorizers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"position",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			

			svc.getAuthorizers(params,cb);
		}

		
		service.GetBasePathMapping=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domainName",params,undefined,false); 
			copyArg(n,"basePath",params,undefined,false); 
			
			copyArg(msg,"domainName",params,undefined,false); 
			copyArg(msg,"basePath",params,undefined,false); 
			

			svc.getBasePathMapping(params,cb);
		}

		
		service.GetBasePathMappings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domainName",params,undefined,false); 
			
			copyArg(msg,"domainName",params,undefined,false); 
			copyArg(msg,"position",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			

			svc.getBasePathMappings(params,cb);
		}

		
		service.GetClientCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"clientCertificateId",params,undefined,false); 
			
			copyArg(msg,"clientCertificateId",params,undefined,false); 
			

			svc.getClientCertificate(params,cb);
		}

		
		service.GetClientCertificates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"position",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			

			svc.getClientCertificates(params,cb);
		}

		
		service.GetDeployment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"deploymentId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"deploymentId",params,undefined,false); 
			copyArg(msg,"embed",params,undefined,true); 
			

			svc.getDeployment(params,cb);
		}

		
		service.GetDeployments=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"position",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			

			svc.getDeployments(params,cb);
		}

		
		service.GetDocumentationPart=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"documentationPartId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"documentationPartId",params,undefined,false); 
			

			svc.getDocumentationPart(params,cb);
		}

		
		service.GetDocumentationParts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"type",params,undefined,false); 
			copyArg(msg,"nameQuery",params,undefined,false); 
			copyArg(msg,"path",params,undefined,false); 
			copyArg(msg,"position",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			copyArg(msg,"locationStatus",params,undefined,false); 
			

			svc.getDocumentationParts(params,cb);
		}

		
		service.GetDocumentationVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"documentationVersion",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"documentationVersion",params,undefined,false); 
			

			svc.getDocumentationVersion(params,cb);
		}

		
		service.GetDocumentationVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"position",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			

			svc.getDocumentationVersions(params,cb);
		}

		
		service.GetDomainName=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domainName",params,undefined,false); 
			
			copyArg(msg,"domainName",params,undefined,false); 
			

			svc.getDomainName(params,cb);
		}

		
		service.GetDomainNames=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"position",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			

			svc.getDomainNames(params,cb);
		}

		
		service.GetExport=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"stageName",params,undefined,false); 
			copyArg(n,"exportType",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"stageName",params,undefined,false); 
			copyArg(msg,"exportType",params,undefined,false); 
			copyArg(msg,"parameters",params,undefined,true); 
			copyArg(msg,"accepts",params,undefined,false); 
			

			svc.getExport(params,cb);
		}

		
		service.GetGatewayResponse=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"responseType",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"responseType",params,undefined,false); 
			

			svc.getGatewayResponse(params,cb);
		}

		
		service.GetGatewayResponses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"position",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			

			svc.getGatewayResponses(params,cb);
		}

		
		service.GetIntegration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"resourceId",params,undefined,false); 
			copyArg(n,"httpMethod",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"resourceId",params,undefined,false); 
			copyArg(msg,"httpMethod",params,undefined,false); 
			

			svc.getIntegration(params,cb);
		}

		
		service.GetIntegrationResponse=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"resourceId",params,undefined,false); 
			copyArg(n,"httpMethod",params,undefined,false); 
			copyArg(n,"statusCode",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"resourceId",params,undefined,false); 
			copyArg(msg,"httpMethod",params,undefined,false); 
			copyArg(msg,"statusCode",params,undefined,false); 
			

			svc.getIntegrationResponse(params,cb);
		}

		
		service.GetMethod=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"resourceId",params,undefined,false); 
			copyArg(n,"httpMethod",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"resourceId",params,undefined,false); 
			copyArg(msg,"httpMethod",params,undefined,false); 
			

			svc.getMethod(params,cb);
		}

		
		service.GetMethodResponse=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"resourceId",params,undefined,false); 
			copyArg(n,"httpMethod",params,undefined,false); 
			copyArg(n,"statusCode",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"resourceId",params,undefined,false); 
			copyArg(msg,"httpMethod",params,undefined,false); 
			copyArg(msg,"statusCode",params,undefined,false); 
			

			svc.getMethodResponse(params,cb);
		}

		
		service.GetModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"modelName",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"modelName",params,undefined,false); 
			copyArg(msg,"flatten",params,undefined,false); 
			

			svc.getModel(params,cb);
		}

		
		service.GetModelTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"modelName",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"modelName",params,undefined,false); 
			

			svc.getModelTemplate(params,cb);
		}

		
		service.GetModels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"position",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			

			svc.getModels(params,cb);
		}

		
		service.GetRequestValidator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"requestValidatorId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"requestValidatorId",params,undefined,false); 
			

			svc.getRequestValidator(params,cb);
		}

		
		service.GetRequestValidators=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"position",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			

			svc.getRequestValidators(params,cb);
		}

		
		service.GetResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"resourceId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"resourceId",params,undefined,false); 
			copyArg(msg,"embed",params,undefined,true); 
			

			svc.getResource(params,cb);
		}

		
		service.GetResources=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"position",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			copyArg(msg,"embed",params,undefined,true); 
			

			svc.getResources(params,cb);
		}

		
		service.GetRestApi=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			

			svc.getRestApi(params,cb);
		}

		
		service.GetRestApis=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"position",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			

			svc.getRestApis(params,cb);
		}

		
		service.GetSdk=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"stageName",params,undefined,false); 
			copyArg(n,"sdkType",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"stageName",params,undefined,false); 
			copyArg(msg,"sdkType",params,undefined,false); 
			copyArg(msg,"parameters",params,undefined,true); 
			

			svc.getSdk(params,cb);
		}

		
		service.GetSdkType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"id",params,undefined,false); 
			
			copyArg(msg,"id",params,undefined,false); 
			

			svc.getSdkType(params,cb);
		}

		
		service.GetSdkTypes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"position",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			

			svc.getSdkTypes(params,cb);
		}

		
		service.GetStage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"stageName",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"stageName",params,undefined,false); 
			

			svc.getStage(params,cb);
		}

		
		service.GetStages=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"deploymentId",params,undefined,false); 
			

			svc.getStages(params,cb);
		}

		
		service.GetTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"position",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			

			svc.getTags(params,cb);
		}

		
		service.GetUsage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"usagePlanId",params,undefined,false); 
			copyArg(n,"startDate",params,undefined,false); 
			copyArg(n,"endDate",params,undefined,false); 
			
			copyArg(msg,"usagePlanId",params,undefined,false); 
			copyArg(msg,"keyId",params,undefined,false); 
			copyArg(msg,"startDate",params,undefined,false); 
			copyArg(msg,"endDate",params,undefined,false); 
			copyArg(msg,"position",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			

			svc.getUsage(params,cb);
		}

		
		service.GetUsagePlan=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"usagePlanId",params,undefined,false); 
			
			copyArg(msg,"usagePlanId",params,undefined,false); 
			

			svc.getUsagePlan(params,cb);
		}

		
		service.GetUsagePlanKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"usagePlanId",params,undefined,false); 
			copyArg(n,"keyId",params,undefined,false); 
			
			copyArg(msg,"usagePlanId",params,undefined,false); 
			copyArg(msg,"keyId",params,undefined,false); 
			

			svc.getUsagePlanKey(params,cb);
		}

		
		service.GetUsagePlanKeys=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"usagePlanId",params,undefined,false); 
			
			copyArg(msg,"usagePlanId",params,undefined,false); 
			copyArg(msg,"position",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			copyArg(msg,"nameQuery",params,undefined,false); 
			

			svc.getUsagePlanKeys(params,cb);
		}

		
		service.GetUsagePlans=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"position",params,undefined,false); 
			copyArg(msg,"keyId",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			

			svc.getUsagePlans(params,cb);
		}

		
		service.GetVpcLink=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"vpcLinkId",params,undefined,false); 
			
			copyArg(msg,"vpcLinkId",params,undefined,false); 
			

			svc.getVpcLink(params,cb);
		}

		
		service.GetVpcLinks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"position",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			

			svc.getVpcLinks(params,cb);
		}

		
		service.ImportApiKeys=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"body",params,undefined,false); 
			copyArg(n,"format",params,undefined,false); 
			
			copyArg(msg,"body",params,undefined,false); 
			copyArg(msg,"format",params,undefined,false); 
			copyArg(msg,"failOnWarnings",params,undefined,false); 
			

			svc.importApiKeys(params,cb);
		}

		
		service.ImportDocumentationParts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"body",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"mode",params,undefined,false); 
			copyArg(msg,"failOnWarnings",params,undefined,false); 
			copyArg(msg,"body",params,undefined,false); 
			

			svc.importDocumentationParts(params,cb);
		}

		
		service.ImportRestApi=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"body",params,undefined,false); 
			
			copyArg(msg,"failOnWarnings",params,undefined,false); 
			copyArg(msg,"parameters",params,undefined,true); 
			copyArg(msg,"body",params,undefined,false); 
			

			svc.importRestApi(params,cb);
		}

		
		service.PutGatewayResponse=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"responseType",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"responseType",params,undefined,false); 
			copyArg(msg,"statusCode",params,undefined,false); 
			copyArg(msg,"responseParameters",params,undefined,true); 
			copyArg(msg,"responseTemplates",params,undefined,true); 
			

			svc.putGatewayResponse(params,cb);
		}

		
		service.PutIntegration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"resourceId",params,undefined,false); 
			copyArg(n,"httpMethod",params,undefined,false); 
			copyArg(n,"_type",params,"type",false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"resourceId",params,undefined,false); 
			copyArg(msg,"httpMethod",params,undefined,false); 
			copyArg(msg,"type",params,undefined,false); 
			copyArg(msg,"integrationHttpMethod",params,undefined,false); 
			copyArg(msg,"uri",params,undefined,false); 
			copyArg(msg,"connectionType",params,undefined,false); 
			copyArg(msg,"connectionId",params,undefined,false); 
			copyArg(msg,"credentials",params,undefined,false); 
			copyArg(msg,"requestParameters",params,undefined,true); 
			copyArg(msg,"requestTemplates",params,undefined,true); 
			copyArg(msg,"passthroughBehavior",params,undefined,false); 
			copyArg(msg,"cacheNamespace",params,undefined,false); 
			copyArg(msg,"cacheKeyParameters",params,undefined,true); 
			copyArg(msg,"contentHandling",params,undefined,false); 
			copyArg(msg,"timeoutInMillis",params,undefined,false); 
			copyArg(msg,"tlsConfig",params,undefined,true); 
			

			svc.putIntegration(params,cb);
		}

		
		service.PutIntegrationResponse=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"resourceId",params,undefined,false); 
			copyArg(n,"httpMethod",params,undefined,false); 
			copyArg(n,"statusCode",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"resourceId",params,undefined,false); 
			copyArg(msg,"httpMethod",params,undefined,false); 
			copyArg(msg,"statusCode",params,undefined,false); 
			copyArg(msg,"selectionPattern",params,undefined,false); 
			copyArg(msg,"responseParameters",params,undefined,true); 
			copyArg(msg,"responseTemplates",params,undefined,true); 
			copyArg(msg,"contentHandling",params,undefined,false); 
			

			svc.putIntegrationResponse(params,cb);
		}

		
		service.PutMethod=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"resourceId",params,undefined,false); 
			copyArg(n,"httpMethod",params,undefined,false); 
			copyArg(n,"authorizationType",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"resourceId",params,undefined,false); 
			copyArg(msg,"httpMethod",params,undefined,false); 
			copyArg(msg,"authorizationType",params,undefined,false); 
			copyArg(msg,"authorizerId",params,undefined,false); 
			copyArg(msg,"apiKeyRequired",params,undefined,false); 
			copyArg(msg,"operationName",params,undefined,false); 
			copyArg(msg,"requestParameters",params,undefined,true); 
			copyArg(msg,"requestModels",params,undefined,true); 
			copyArg(msg,"requestValidatorId",params,undefined,false); 
			copyArg(msg,"authorizationScopes",params,undefined,true); 
			

			svc.putMethod(params,cb);
		}

		
		service.PutMethodResponse=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"resourceId",params,undefined,false); 
			copyArg(n,"httpMethod",params,undefined,false); 
			copyArg(n,"statusCode",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"resourceId",params,undefined,false); 
			copyArg(msg,"httpMethod",params,undefined,false); 
			copyArg(msg,"statusCode",params,undefined,false); 
			copyArg(msg,"responseParameters",params,undefined,true); 
			copyArg(msg,"responseModels",params,undefined,true); 
			

			svc.putMethodResponse(params,cb);
		}

		
		service.PutRestApi=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"body",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"mode",params,undefined,false); 
			copyArg(msg,"failOnWarnings",params,undefined,false); 
			copyArg(msg,"parameters",params,undefined,true); 
			copyArg(msg,"body",params,undefined,false); 
			

			svc.putRestApi(params,cb);
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

		
		service.TestInvokeAuthorizer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"authorizerId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"authorizerId",params,undefined,false); 
			copyArg(msg,"headers",params,undefined,true); 
			copyArg(msg,"multiValueHeaders",params,undefined,true); 
			copyArg(msg,"pathWithQueryString",params,undefined,false); 
			copyArg(msg,"body",params,undefined,false); 
			copyArg(msg,"stageVariables",params,undefined,true); 
			copyArg(msg,"additionalContext",params,undefined,true); 
			

			svc.testInvokeAuthorizer(params,cb);
		}

		
		service.TestInvokeMethod=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"resourceId",params,undefined,false); 
			copyArg(n,"httpMethod",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"resourceId",params,undefined,false); 
			copyArg(msg,"httpMethod",params,undefined,false); 
			copyArg(msg,"pathWithQueryString",params,undefined,false); 
			copyArg(msg,"body",params,undefined,false); 
			copyArg(msg,"headers",params,undefined,true); 
			copyArg(msg,"multiValueHeaders",params,undefined,true); 
			copyArg(msg,"clientCertificateId",params,undefined,false); 
			copyArg(msg,"stageVariables",params,undefined,true); 
			

			svc.testInvokeMethod(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"tagKeys",params,undefined,true); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tagKeys",params,undefined,true); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateAccount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"patchOperations",params,undefined,true); 
			

			svc.updateAccount(params,cb);
		}

		
		service.UpdateApiKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"apiKey",params,undefined,false); 
			
			copyArg(msg,"apiKey",params,undefined,false); 
			copyArg(msg,"patchOperations",params,undefined,true); 
			

			svc.updateApiKey(params,cb);
		}

		
		service.UpdateAuthorizer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"authorizerId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"authorizerId",params,undefined,false); 
			copyArg(msg,"patchOperations",params,undefined,true); 
			

			svc.updateAuthorizer(params,cb);
		}

		
		service.UpdateBasePathMapping=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domainName",params,undefined,false); 
			copyArg(n,"basePath",params,undefined,false); 
			
			copyArg(msg,"domainName",params,undefined,false); 
			copyArg(msg,"basePath",params,undefined,false); 
			copyArg(msg,"patchOperations",params,undefined,true); 
			

			svc.updateBasePathMapping(params,cb);
		}

		
		service.UpdateClientCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"clientCertificateId",params,undefined,false); 
			
			copyArg(msg,"clientCertificateId",params,undefined,false); 
			copyArg(msg,"patchOperations",params,undefined,true); 
			

			svc.updateClientCertificate(params,cb);
		}

		
		service.UpdateDeployment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"deploymentId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"deploymentId",params,undefined,false); 
			copyArg(msg,"patchOperations",params,undefined,true); 
			

			svc.updateDeployment(params,cb);
		}

		
		service.UpdateDocumentationPart=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"documentationPartId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"documentationPartId",params,undefined,false); 
			copyArg(msg,"patchOperations",params,undefined,true); 
			

			svc.updateDocumentationPart(params,cb);
		}

		
		service.UpdateDocumentationVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"documentationVersion",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"documentationVersion",params,undefined,false); 
			copyArg(msg,"patchOperations",params,undefined,true); 
			

			svc.updateDocumentationVersion(params,cb);
		}

		
		service.UpdateDomainName=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domainName",params,undefined,false); 
			
			copyArg(msg,"domainName",params,undefined,false); 
			copyArg(msg,"patchOperations",params,undefined,true); 
			

			svc.updateDomainName(params,cb);
		}

		
		service.UpdateGatewayResponse=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"responseType",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"responseType",params,undefined,false); 
			copyArg(msg,"patchOperations",params,undefined,true); 
			

			svc.updateGatewayResponse(params,cb);
		}

		
		service.UpdateIntegration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"resourceId",params,undefined,false); 
			copyArg(n,"httpMethod",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"resourceId",params,undefined,false); 
			copyArg(msg,"httpMethod",params,undefined,false); 
			copyArg(msg,"patchOperations",params,undefined,true); 
			

			svc.updateIntegration(params,cb);
		}

		
		service.UpdateIntegrationResponse=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"resourceId",params,undefined,false); 
			copyArg(n,"httpMethod",params,undefined,false); 
			copyArg(n,"statusCode",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"resourceId",params,undefined,false); 
			copyArg(msg,"httpMethod",params,undefined,false); 
			copyArg(msg,"statusCode",params,undefined,false); 
			copyArg(msg,"patchOperations",params,undefined,true); 
			

			svc.updateIntegrationResponse(params,cb);
		}

		
		service.UpdateMethod=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"resourceId",params,undefined,false); 
			copyArg(n,"httpMethod",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"resourceId",params,undefined,false); 
			copyArg(msg,"httpMethod",params,undefined,false); 
			copyArg(msg,"patchOperations",params,undefined,true); 
			

			svc.updateMethod(params,cb);
		}

		
		service.UpdateMethodResponse=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"resourceId",params,undefined,false); 
			copyArg(n,"httpMethod",params,undefined,false); 
			copyArg(n,"statusCode",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"resourceId",params,undefined,false); 
			copyArg(msg,"httpMethod",params,undefined,false); 
			copyArg(msg,"statusCode",params,undefined,false); 
			copyArg(msg,"patchOperations",params,undefined,true); 
			

			svc.updateMethodResponse(params,cb);
		}

		
		service.UpdateModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"modelName",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"modelName",params,undefined,false); 
			copyArg(msg,"patchOperations",params,undefined,true); 
			

			svc.updateModel(params,cb);
		}

		
		service.UpdateRequestValidator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"requestValidatorId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"requestValidatorId",params,undefined,false); 
			copyArg(msg,"patchOperations",params,undefined,true); 
			

			svc.updateRequestValidator(params,cb);
		}

		
		service.UpdateResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"resourceId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"resourceId",params,undefined,false); 
			copyArg(msg,"patchOperations",params,undefined,true); 
			

			svc.updateResource(params,cb);
		}

		
		service.UpdateRestApi=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"patchOperations",params,undefined,true); 
			

			svc.updateRestApi(params,cb);
		}

		
		service.UpdateStage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"restApiId",params,undefined,false); 
			copyArg(n,"stageName",params,undefined,false); 
			
			copyArg(msg,"restApiId",params,undefined,false); 
			copyArg(msg,"stageName",params,undefined,false); 
			copyArg(msg,"patchOperations",params,undefined,true); 
			

			svc.updateStage(params,cb);
		}

		
		service.UpdateUsage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"usagePlanId",params,undefined,false); 
			copyArg(n,"keyId",params,undefined,false); 
			
			copyArg(msg,"usagePlanId",params,undefined,false); 
			copyArg(msg,"keyId",params,undefined,false); 
			copyArg(msg,"patchOperations",params,undefined,true); 
			

			svc.updateUsage(params,cb);
		}

		
		service.UpdateUsagePlan=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"usagePlanId",params,undefined,false); 
			
			copyArg(msg,"usagePlanId",params,undefined,false); 
			copyArg(msg,"patchOperations",params,undefined,true); 
			

			svc.updateUsagePlan(params,cb);
		}

		
		service.UpdateVpcLink=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"vpcLinkId",params,undefined,false); 
			
			copyArg(msg,"vpcLinkId",params,undefined,false); 
			copyArg(msg,"patchOperations",params,undefined,true); 
			

			svc.updateVpcLink(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS APIGateway", AmazonAPINode);

};
