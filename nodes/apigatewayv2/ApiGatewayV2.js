
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

		var awsService = new AWS.ApiGatewayV2( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.ApiGatewayV2(msg.AWSConfig) : awsService;

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

		
		service.CreateApi=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProtocolType",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"ApiKeySelectionExpression",params,undefined,false); 
			copyArgs(n,"CorsConfiguration",params,undefined,true); 
			copyArgs(n,"CredentialsArn",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"DisableSchemaValidation",params,undefined,false); 
			copyArgs(n,"DisableExecuteApiEndpoint",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ProtocolType",params,undefined,false); 
			copyArgs(n,"RouteKey",params,undefined,false); 
			copyArgs(n,"RouteSelectionExpression",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"Target",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			
			copyArgs(msg,"ApiKeySelectionExpression",params,undefined,false); 
			copyArgs(msg,"CorsConfiguration",params,undefined,true); 
			copyArgs(msg,"CredentialsArn",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DisableSchemaValidation",params,undefined,false); 
			copyArgs(msg,"DisableExecuteApiEndpoint",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ProtocolType",params,undefined,false); 
			copyArgs(msg,"RouteKey",params,undefined,false); 
			copyArgs(msg,"RouteSelectionExpression",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"Target",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			

			svc.createApi(params,cb);
		}

		
		service.CreateApiMapping=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"Stage",params,undefined,false); 
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"ApiMappingKey",params,undefined,false); 
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"Stage",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"ApiMappingKey",params,undefined,false); 
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"Stage",params,undefined,false); 
			

			svc.createApiMapping(params,cb);
		}

		
		service.CreateAuthorizer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"AuthorizerType",params,undefined,false); 
			copyArgs(n,"IdentitySource",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"AuthorizerCredentialsArn",params,undefined,false); 
			copyArgs(n,"AuthorizerPayloadFormatVersion",params,undefined,false); 
			copyArgs(n,"AuthorizerResultTtlInSeconds",params,undefined,false); 
			copyArgs(n,"AuthorizerType",params,undefined,false); 
			copyArgs(n,"AuthorizerUri",params,undefined,false); 
			copyArgs(n,"EnableSimpleResponses",params,undefined,false); 
			copyArgs(n,"IdentitySource",params,undefined,true); 
			copyArgs(n,"IdentityValidationExpression",params,undefined,false); 
			copyArgs(n,"JwtConfiguration",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"AuthorizerCredentialsArn",params,undefined,false); 
			copyArgs(msg,"AuthorizerPayloadFormatVersion",params,undefined,false); 
			copyArgs(msg,"AuthorizerResultTtlInSeconds",params,undefined,false); 
			copyArgs(msg,"AuthorizerType",params,undefined,false); 
			copyArgs(msg,"AuthorizerUri",params,undefined,false); 
			copyArgs(msg,"EnableSimpleResponses",params,undefined,false); 
			copyArgs(msg,"IdentitySource",params,undefined,true); 
			copyArgs(msg,"IdentityValidationExpression",params,undefined,false); 
			copyArgs(msg,"JwtConfiguration",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.createAuthorizer(params,cb);
		}

		
		service.CreateDeployment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"StageName",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"StageName",params,undefined,false); 
			

			svc.createDeployment(params,cb);
		}

		
		service.CreateDomainName=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"DomainNameConfigurations",params,undefined,true); 
			copyArgs(n,"MutualTlsAuthentication",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"DomainNameConfigurations",params,undefined,true); 
			copyArgs(msg,"MutualTlsAuthentication",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createDomainName(params,cb);
		}

		
		service.CreateIntegration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"IntegrationType",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"ConnectionId",params,undefined,false); 
			copyArgs(n,"ConnectionType",params,undefined,false); 
			copyArgs(n,"ContentHandlingStrategy",params,undefined,false); 
			copyArgs(n,"CredentialsArn",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"IntegrationMethod",params,undefined,false); 
			copyArgs(n,"IntegrationSubtype",params,undefined,false); 
			copyArgs(n,"IntegrationType",params,undefined,false); 
			copyArgs(n,"IntegrationUri",params,undefined,false); 
			copyArgs(n,"PassthroughBehavior",params,undefined,false); 
			copyArgs(n,"PayloadFormatVersion",params,undefined,false); 
			copyArgs(n,"RequestParameters",params,undefined,true); 
			copyArgs(n,"RequestTemplates",params,undefined,true); 
			copyArgs(n,"ResponseParameters",params,undefined,true); 
			copyArgs(n,"TemplateSelectionExpression",params,undefined,false); 
			copyArgs(n,"TimeoutInMillis",params,undefined,false); 
			copyArgs(n,"TlsConfig",params,undefined,true); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"ConnectionId",params,undefined,false); 
			copyArgs(msg,"ConnectionType",params,undefined,false); 
			copyArgs(msg,"ContentHandlingStrategy",params,undefined,false); 
			copyArgs(msg,"CredentialsArn",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"IntegrationMethod",params,undefined,false); 
			copyArgs(msg,"IntegrationSubtype",params,undefined,false); 
			copyArgs(msg,"IntegrationType",params,undefined,false); 
			copyArgs(msg,"IntegrationUri",params,undefined,false); 
			copyArgs(msg,"PassthroughBehavior",params,undefined,false); 
			copyArgs(msg,"PayloadFormatVersion",params,undefined,false); 
			copyArgs(msg,"RequestParameters",params,undefined,true); 
			copyArgs(msg,"RequestTemplates",params,undefined,true); 
			copyArgs(msg,"ResponseParameters",params,undefined,true); 
			copyArgs(msg,"TemplateSelectionExpression",params,undefined,false); 
			copyArgs(msg,"TimeoutInMillis",params,undefined,false); 
			copyArgs(msg,"TlsConfig",params,undefined,true); 
			

			svc.createIntegration(params,cb);
		}

		
		service.CreateIntegrationResponse=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"IntegrationId",params,undefined,false); 
			copyArgs(n,"IntegrationResponseKey",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"ContentHandlingStrategy",params,undefined,false); 
			copyArgs(n,"IntegrationId",params,undefined,false); 
			copyArgs(n,"IntegrationResponseKey",params,undefined,false); 
			copyArgs(n,"ResponseParameters",params,undefined,true); 
			copyArgs(n,"ResponseTemplates",params,undefined,true); 
			copyArgs(n,"TemplateSelectionExpression",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"ContentHandlingStrategy",params,undefined,false); 
			copyArgs(msg,"IntegrationId",params,undefined,false); 
			copyArgs(msg,"IntegrationResponseKey",params,undefined,false); 
			copyArgs(msg,"ResponseParameters",params,undefined,true); 
			copyArgs(msg,"ResponseTemplates",params,undefined,true); 
			copyArgs(msg,"TemplateSelectionExpression",params,undefined,false); 
			

			svc.createIntegrationResponse(params,cb);
		}

		
		service.CreateModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"Schema",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"ContentType",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Schema",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"ContentType",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Schema",params,undefined,false); 
			

			svc.createModel(params,cb);
		}

		
		service.CreateRoute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"RouteKey",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"ApiKeyRequired",params,undefined,false); 
			copyArgs(n,"AuthorizationScopes",params,undefined,true); 
			copyArgs(n,"AuthorizationType",params,undefined,false); 
			copyArgs(n,"AuthorizerId",params,undefined,false); 
			copyArgs(n,"ModelSelectionExpression",params,undefined,false); 
			copyArgs(n,"OperationName",params,undefined,false); 
			copyArgs(n,"RequestModels",params,undefined,true); 
			copyArgs(n,"RequestParameters",params,undefined,true); 
			copyArgs(n,"RouteKey",params,undefined,false); 
			copyArgs(n,"RouteResponseSelectionExpression",params,undefined,false); 
			copyArgs(n,"Target",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"ApiKeyRequired",params,undefined,false); 
			copyArgs(msg,"AuthorizationScopes",params,undefined,true); 
			copyArgs(msg,"AuthorizationType",params,undefined,false); 
			copyArgs(msg,"AuthorizerId",params,undefined,false); 
			copyArgs(msg,"ModelSelectionExpression",params,undefined,false); 
			copyArgs(msg,"OperationName",params,undefined,false); 
			copyArgs(msg,"RequestModels",params,undefined,true); 
			copyArgs(msg,"RequestParameters",params,undefined,true); 
			copyArgs(msg,"RouteKey",params,undefined,false); 
			copyArgs(msg,"RouteResponseSelectionExpression",params,undefined,false); 
			copyArgs(msg,"Target",params,undefined,false); 
			

			svc.createRoute(params,cb);
		}

		
		service.CreateRouteResponse=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"RouteId",params,undefined,false); 
			copyArgs(n,"RouteResponseKey",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"ModelSelectionExpression",params,undefined,false); 
			copyArgs(n,"ResponseModels",params,undefined,true); 
			copyArgs(n,"ResponseParameters",params,undefined,true); 
			copyArgs(n,"RouteId",params,undefined,false); 
			copyArgs(n,"RouteResponseKey",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"ModelSelectionExpression",params,undefined,false); 
			copyArgs(msg,"ResponseModels",params,undefined,true); 
			copyArgs(msg,"ResponseParameters",params,undefined,true); 
			copyArgs(msg,"RouteId",params,undefined,false); 
			copyArgs(msg,"RouteResponseKey",params,undefined,false); 
			

			svc.createRouteResponse(params,cb);
		}

		
		service.CreateStage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"StageName",params,undefined,false); 
			
			copyArgs(n,"AccessLogSettings",params,undefined,true); 
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"AutoDeploy",params,undefined,false); 
			copyArgs(n,"ClientCertificateId",params,undefined,false); 
			copyArgs(n,"DefaultRouteSettings",params,undefined,true); 
			copyArgs(n,"DeploymentId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"RouteSettings",params,undefined,true); 
			copyArgs(n,"StageName",params,undefined,false); 
			copyArgs(n,"StageVariables",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"AccessLogSettings",params,undefined,true); 
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"AutoDeploy",params,undefined,false); 
			copyArgs(msg,"ClientCertificateId",params,undefined,false); 
			copyArgs(msg,"DefaultRouteSettings",params,undefined,true); 
			copyArgs(msg,"DeploymentId",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"RouteSettings",params,undefined,true); 
			copyArgs(msg,"StageName",params,undefined,false); 
			copyArgs(msg,"StageVariables",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createStage(params,cb);
		}

		
		service.CreateVpcLink=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubnetIds",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"SecurityGroupIds",params,undefined,true); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"SecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"SubnetIds",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createVpcLink(params,cb);
		}

		
		service.DeleteAccessLogSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StageName",params,undefined,false); 
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"StageName",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"StageName",params,undefined,false); 
			

			svc.deleteAccessLogSettings(params,cb);
		}

		
		service.DeleteApi=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			

			svc.deleteApi(params,cb);
		}

		
		service.DeleteApiMapping=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiMappingId",params,undefined,false); 
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"ApiMappingId",params,undefined,false); 
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(msg,"ApiMappingId",params,undefined,false); 
			copyArgs(msg,"DomainName",params,undefined,false); 
			

			svc.deleteApiMapping(params,cb);
		}

		
		service.DeleteAuthorizer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AuthorizerId",params,undefined,false); 
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"AuthorizerId",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"AuthorizerId",params,undefined,false); 
			

			svc.deleteAuthorizer(params,cb);
		}

		
		service.DeleteCorsConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			

			svc.deleteCorsConfiguration(params,cb);
		}

		
		service.DeleteDeployment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"DeploymentId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"DeploymentId",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"DeploymentId",params,undefined,false); 
			

			svc.deleteDeployment(params,cb);
		}

		
		service.DeleteDomainName=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			

			svc.deleteDomainName(params,cb);
		}

		
		service.DeleteIntegration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"IntegrationId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"IntegrationId",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"IntegrationId",params,undefined,false); 
			

			svc.deleteIntegration(params,cb);
		}

		
		service.DeleteIntegrationResponse=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"IntegrationResponseId",params,undefined,false); 
			copyArgs(n,"IntegrationId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"IntegrationId",params,undefined,false); 
			copyArgs(n,"IntegrationResponseId",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"IntegrationId",params,undefined,false); 
			copyArgs(msg,"IntegrationResponseId",params,undefined,false); 
			

			svc.deleteIntegrationResponse(params,cb);
		}

		
		service.DeleteModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ModelId",params,undefined,false); 
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"ModelId",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"ModelId",params,undefined,false); 
			

			svc.deleteModel(params,cb);
		}

		
		service.DeleteRoute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"RouteId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"RouteId",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"RouteId",params,undefined,false); 
			

			svc.deleteRoute(params,cb);
		}

		
		service.DeleteRouteRequestParameter=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RequestParameterKey",params,undefined,false); 
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"RouteId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"RequestParameterKey",params,undefined,false); 
			copyArgs(n,"RouteId",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"RequestParameterKey",params,undefined,false); 
			copyArgs(msg,"RouteId",params,undefined,false); 
			

			svc.deleteRouteRequestParameter(params,cb);
		}

		
		service.DeleteRouteResponse=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RouteResponseId",params,undefined,false); 
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"RouteId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"RouteId",params,undefined,false); 
			copyArgs(n,"RouteResponseId",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"RouteId",params,undefined,false); 
			copyArgs(msg,"RouteResponseId",params,undefined,false); 
			

			svc.deleteRouteResponse(params,cb);
		}

		
		service.DeleteRouteSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StageName",params,undefined,false); 
			copyArgs(n,"RouteKey",params,undefined,false); 
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"RouteKey",params,undefined,false); 
			copyArgs(n,"StageName",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"RouteKey",params,undefined,false); 
			copyArgs(msg,"StageName",params,undefined,false); 
			

			svc.deleteRouteSettings(params,cb);
		}

		
		service.DeleteStage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StageName",params,undefined,false); 
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"StageName",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"StageName",params,undefined,false); 
			

			svc.deleteStage(params,cb);
		}

		
		service.DeleteVpcLink=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpcLinkId",params,undefined,false); 
			
			copyArgs(n,"VpcLinkId",params,undefined,false); 
			
			copyArgs(msg,"VpcLinkId",params,undefined,false); 
			

			svc.deleteVpcLink(params,cb);
		}

		
		service.ExportApi=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Specification",params,undefined,false); 
			copyArgs(n,"OutputType",params,undefined,false); 
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"ExportVersion",params,undefined,false); 
			copyArgs(n,"IncludeExtensions",params,undefined,false); 
			copyArgs(n,"OutputType",params,undefined,false); 
			copyArgs(n,"Specification",params,undefined,false); 
			copyArgs(n,"StageName",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"ExportVersion",params,undefined,false); 
			copyArgs(msg,"IncludeExtensions",params,undefined,false); 
			copyArgs(msg,"OutputType",params,undefined,false); 
			copyArgs(msg,"Specification",params,undefined,false); 
			copyArgs(msg,"StageName",params,undefined,false); 
			

			svc.exportApi(params,cb);
		}

		
		service.ResetAuthorizersCache=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StageName",params,undefined,false); 
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"StageName",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"StageName",params,undefined,false); 
			

			svc.resetAuthorizersCache(params,cb);
		}

		
		service.GetApi=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			

			svc.getApi(params,cb);
		}

		
		service.GetApiMapping=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiMappingId",params,undefined,false); 
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"ApiMappingId",params,undefined,false); 
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(msg,"ApiMappingId",params,undefined,false); 
			copyArgs(msg,"DomainName",params,undefined,false); 
			

			svc.getApiMapping(params,cb);
		}

		
		service.GetApiMappings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getApiMappings(params,cb);
		}

		
		service.GetApis=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getApis(params,cb);
		}

		
		service.GetAuthorizer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AuthorizerId",params,undefined,false); 
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"AuthorizerId",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"AuthorizerId",params,undefined,false); 
			

			svc.getAuthorizer(params,cb);
		}

		
		service.GetAuthorizers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getAuthorizers(params,cb);
		}

		
		service.GetDeployment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"DeploymentId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"DeploymentId",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"DeploymentId",params,undefined,false); 
			

			svc.getDeployment(params,cb);
		}

		
		service.GetDeployments=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getDeployments(params,cb);
		}

		
		service.GetDomainName=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			

			svc.getDomainName(params,cb);
		}

		
		service.GetDomainNames=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getDomainNames(params,cb);
		}

		
		service.GetIntegration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"IntegrationId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"IntegrationId",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"IntegrationId",params,undefined,false); 
			

			svc.getIntegration(params,cb);
		}

		
		service.GetIntegrationResponse=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"IntegrationResponseId",params,undefined,false); 
			copyArgs(n,"IntegrationId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"IntegrationId",params,undefined,false); 
			copyArgs(n,"IntegrationResponseId",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"IntegrationId",params,undefined,false); 
			copyArgs(msg,"IntegrationResponseId",params,undefined,false); 
			

			svc.getIntegrationResponse(params,cb);
		}

		
		service.GetIntegrationResponses=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IntegrationId",params,undefined,false); 
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"IntegrationId",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"IntegrationId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getIntegrationResponses(params,cb);
		}

		
		service.GetIntegrations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getIntegrations(params,cb);
		}

		
		service.GetModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ModelId",params,undefined,false); 
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"ModelId",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"ModelId",params,undefined,false); 
			

			svc.getModel(params,cb);
		}

		
		service.GetModelTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ModelId",params,undefined,false); 
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"ModelId",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"ModelId",params,undefined,false); 
			

			svc.getModelTemplate(params,cb);
		}

		
		service.GetModels=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getModels(params,cb);
		}

		
		service.GetRoute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"RouteId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"RouteId",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"RouteId",params,undefined,false); 
			

			svc.getRoute(params,cb);
		}

		
		service.GetRouteResponse=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RouteResponseId",params,undefined,false); 
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"RouteId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"RouteId",params,undefined,false); 
			copyArgs(n,"RouteResponseId",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"RouteId",params,undefined,false); 
			copyArgs(msg,"RouteResponseId",params,undefined,false); 
			

			svc.getRouteResponse(params,cb);
		}

		
		service.GetRouteResponses=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RouteId",params,undefined,false); 
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"RouteId",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"RouteId",params,undefined,false); 
			

			svc.getRouteResponses(params,cb);
		}

		
		service.GetRoutes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getRoutes(params,cb);
		}

		
		service.GetStage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StageName",params,undefined,false); 
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"StageName",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"StageName",params,undefined,false); 
			

			svc.getStage(params,cb);
		}

		
		service.GetStages=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getStages(params,cb);
		}

		
		service.GetTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.getTags(params,cb);
		}

		
		service.GetVpcLink=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpcLinkId",params,undefined,false); 
			
			copyArgs(n,"VpcLinkId",params,undefined,false); 
			
			copyArgs(msg,"VpcLinkId",params,undefined,false); 
			

			svc.getVpcLink(params,cb);
		}

		
		service.GetVpcLinks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getVpcLinks(params,cb);
		}

		
		service.ImportApi=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Body",params,undefined,false); 
			
			copyArgs(n,"Basepath",params,undefined,false); 
			copyArgs(n,"Body",params,undefined,false); 
			copyArgs(n,"FailOnWarnings",params,undefined,false); 
			
			copyArgs(msg,"Basepath",params,undefined,false); 
			copyArgs(msg,"Body",params,undefined,false); 
			copyArgs(msg,"FailOnWarnings",params,undefined,false); 
			

			svc.importApi(params,cb);
		}

		
		service.ReimportApi=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"Body",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"Basepath",params,undefined,false); 
			copyArgs(n,"Body",params,undefined,false); 
			copyArgs(n,"FailOnWarnings",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"Basepath",params,undefined,false); 
			copyArgs(msg,"Body",params,undefined,false); 
			copyArgs(msg,"FailOnWarnings",params,undefined,false); 
			

			svc.reimportApi(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateApi=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"ApiKeySelectionExpression",params,undefined,false); 
			copyArgs(n,"CorsConfiguration",params,undefined,true); 
			copyArgs(n,"CredentialsArn",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"DisableSchemaValidation",params,undefined,false); 
			copyArgs(n,"DisableExecuteApiEndpoint",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RouteKey",params,undefined,false); 
			copyArgs(n,"RouteSelectionExpression",params,undefined,false); 
			copyArgs(n,"Target",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"ApiKeySelectionExpression",params,undefined,false); 
			copyArgs(msg,"CorsConfiguration",params,undefined,true); 
			copyArgs(msg,"CredentialsArn",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DisableSchemaValidation",params,undefined,false); 
			copyArgs(msg,"DisableExecuteApiEndpoint",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"RouteKey",params,undefined,false); 
			copyArgs(msg,"RouteSelectionExpression",params,undefined,false); 
			copyArgs(msg,"Target",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			

			svc.updateApi(params,cb);
		}

		
		service.UpdateApiMapping=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiMappingId",params,undefined,false); 
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"ApiMappingId",params,undefined,false); 
			copyArgs(n,"ApiMappingKey",params,undefined,false); 
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"Stage",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"ApiMappingId",params,undefined,false); 
			copyArgs(msg,"ApiMappingKey",params,undefined,false); 
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"Stage",params,undefined,false); 
			

			svc.updateApiMapping(params,cb);
		}

		
		service.UpdateAuthorizer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AuthorizerId",params,undefined,false); 
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"AuthorizerCredentialsArn",params,undefined,false); 
			copyArgs(n,"AuthorizerId",params,undefined,false); 
			copyArgs(n,"AuthorizerPayloadFormatVersion",params,undefined,false); 
			copyArgs(n,"AuthorizerResultTtlInSeconds",params,undefined,false); 
			copyArgs(n,"AuthorizerType",params,undefined,false); 
			copyArgs(n,"AuthorizerUri",params,undefined,false); 
			copyArgs(n,"EnableSimpleResponses",params,undefined,false); 
			copyArgs(n,"IdentitySource",params,undefined,true); 
			copyArgs(n,"IdentityValidationExpression",params,undefined,false); 
			copyArgs(n,"JwtConfiguration",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"AuthorizerCredentialsArn",params,undefined,false); 
			copyArgs(msg,"AuthorizerId",params,undefined,false); 
			copyArgs(msg,"AuthorizerPayloadFormatVersion",params,undefined,false); 
			copyArgs(msg,"AuthorizerResultTtlInSeconds",params,undefined,false); 
			copyArgs(msg,"AuthorizerType",params,undefined,false); 
			copyArgs(msg,"AuthorizerUri",params,undefined,false); 
			copyArgs(msg,"EnableSimpleResponses",params,undefined,false); 
			copyArgs(msg,"IdentitySource",params,undefined,true); 
			copyArgs(msg,"IdentityValidationExpression",params,undefined,false); 
			copyArgs(msg,"JwtConfiguration",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.updateAuthorizer(params,cb);
		}

		
		service.UpdateDeployment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"DeploymentId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"DeploymentId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"DeploymentId",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			

			svc.updateDeployment(params,cb);
		}

		
		service.UpdateDomainName=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"DomainNameConfigurations",params,undefined,true); 
			copyArgs(n,"MutualTlsAuthentication",params,undefined,true); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"DomainNameConfigurations",params,undefined,true); 
			copyArgs(msg,"MutualTlsAuthentication",params,undefined,true); 
			

			svc.updateDomainName(params,cb);
		}

		
		service.UpdateIntegration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"IntegrationId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"ConnectionId",params,undefined,false); 
			copyArgs(n,"ConnectionType",params,undefined,false); 
			copyArgs(n,"ContentHandlingStrategy",params,undefined,false); 
			copyArgs(n,"CredentialsArn",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"IntegrationId",params,undefined,false); 
			copyArgs(n,"IntegrationMethod",params,undefined,false); 
			copyArgs(n,"IntegrationSubtype",params,undefined,false); 
			copyArgs(n,"IntegrationType",params,undefined,false); 
			copyArgs(n,"IntegrationUri",params,undefined,false); 
			copyArgs(n,"PassthroughBehavior",params,undefined,false); 
			copyArgs(n,"PayloadFormatVersion",params,undefined,false); 
			copyArgs(n,"RequestParameters",params,undefined,true); 
			copyArgs(n,"RequestTemplates",params,undefined,true); 
			copyArgs(n,"ResponseParameters",params,undefined,true); 
			copyArgs(n,"TemplateSelectionExpression",params,undefined,false); 
			copyArgs(n,"TimeoutInMillis",params,undefined,false); 
			copyArgs(n,"TlsConfig",params,undefined,true); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"ConnectionId",params,undefined,false); 
			copyArgs(msg,"ConnectionType",params,undefined,false); 
			copyArgs(msg,"ContentHandlingStrategy",params,undefined,false); 
			copyArgs(msg,"CredentialsArn",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"IntegrationId",params,undefined,false); 
			copyArgs(msg,"IntegrationMethod",params,undefined,false); 
			copyArgs(msg,"IntegrationSubtype",params,undefined,false); 
			copyArgs(msg,"IntegrationType",params,undefined,false); 
			copyArgs(msg,"IntegrationUri",params,undefined,false); 
			copyArgs(msg,"PassthroughBehavior",params,undefined,false); 
			copyArgs(msg,"PayloadFormatVersion",params,undefined,false); 
			copyArgs(msg,"RequestParameters",params,undefined,true); 
			copyArgs(msg,"RequestTemplates",params,undefined,true); 
			copyArgs(msg,"ResponseParameters",params,undefined,true); 
			copyArgs(msg,"TemplateSelectionExpression",params,undefined,false); 
			copyArgs(msg,"TimeoutInMillis",params,undefined,false); 
			copyArgs(msg,"TlsConfig",params,undefined,true); 
			

			svc.updateIntegration(params,cb);
		}

		
		service.UpdateIntegrationResponse=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"IntegrationResponseId",params,undefined,false); 
			copyArgs(n,"IntegrationId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"ContentHandlingStrategy",params,undefined,false); 
			copyArgs(n,"IntegrationId",params,undefined,false); 
			copyArgs(n,"IntegrationResponseId",params,undefined,false); 
			copyArgs(n,"IntegrationResponseKey",params,undefined,false); 
			copyArgs(n,"ResponseParameters",params,undefined,true); 
			copyArgs(n,"ResponseTemplates",params,undefined,true); 
			copyArgs(n,"TemplateSelectionExpression",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"ContentHandlingStrategy",params,undefined,false); 
			copyArgs(msg,"IntegrationId",params,undefined,false); 
			copyArgs(msg,"IntegrationResponseId",params,undefined,false); 
			copyArgs(msg,"IntegrationResponseKey",params,undefined,false); 
			copyArgs(msg,"ResponseParameters",params,undefined,true); 
			copyArgs(msg,"ResponseTemplates",params,undefined,true); 
			copyArgs(msg,"TemplateSelectionExpression",params,undefined,false); 
			

			svc.updateIntegrationResponse(params,cb);
		}

		
		service.UpdateModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ModelId",params,undefined,false); 
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"ContentType",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"ModelId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Schema",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"ContentType",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"ModelId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Schema",params,undefined,false); 
			

			svc.updateModel(params,cb);
		}

		
		service.UpdateRoute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"RouteId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"ApiKeyRequired",params,undefined,false); 
			copyArgs(n,"AuthorizationScopes",params,undefined,true); 
			copyArgs(n,"AuthorizationType",params,undefined,false); 
			copyArgs(n,"AuthorizerId",params,undefined,false); 
			copyArgs(n,"ModelSelectionExpression",params,undefined,false); 
			copyArgs(n,"OperationName",params,undefined,false); 
			copyArgs(n,"RequestModels",params,undefined,true); 
			copyArgs(n,"RequestParameters",params,undefined,true); 
			copyArgs(n,"RouteId",params,undefined,false); 
			copyArgs(n,"RouteKey",params,undefined,false); 
			copyArgs(n,"RouteResponseSelectionExpression",params,undefined,false); 
			copyArgs(n,"Target",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"ApiKeyRequired",params,undefined,false); 
			copyArgs(msg,"AuthorizationScopes",params,undefined,true); 
			copyArgs(msg,"AuthorizationType",params,undefined,false); 
			copyArgs(msg,"AuthorizerId",params,undefined,false); 
			copyArgs(msg,"ModelSelectionExpression",params,undefined,false); 
			copyArgs(msg,"OperationName",params,undefined,false); 
			copyArgs(msg,"RequestModels",params,undefined,true); 
			copyArgs(msg,"RequestParameters",params,undefined,true); 
			copyArgs(msg,"RouteId",params,undefined,false); 
			copyArgs(msg,"RouteKey",params,undefined,false); 
			copyArgs(msg,"RouteResponseSelectionExpression",params,undefined,false); 
			copyArgs(msg,"Target",params,undefined,false); 
			

			svc.updateRoute(params,cb);
		}

		
		service.UpdateRouteResponse=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RouteResponseId",params,undefined,false); 
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"RouteId",params,undefined,false); 
			
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"ModelSelectionExpression",params,undefined,false); 
			copyArgs(n,"ResponseModels",params,undefined,true); 
			copyArgs(n,"ResponseParameters",params,undefined,true); 
			copyArgs(n,"RouteId",params,undefined,false); 
			copyArgs(n,"RouteResponseId",params,undefined,false); 
			copyArgs(n,"RouteResponseKey",params,undefined,false); 
			
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"ModelSelectionExpression",params,undefined,false); 
			copyArgs(msg,"ResponseModels",params,undefined,true); 
			copyArgs(msg,"ResponseParameters",params,undefined,true); 
			copyArgs(msg,"RouteId",params,undefined,false); 
			copyArgs(msg,"RouteResponseId",params,undefined,false); 
			copyArgs(msg,"RouteResponseKey",params,undefined,false); 
			

			svc.updateRouteResponse(params,cb);
		}

		
		service.UpdateStage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StageName",params,undefined,false); 
			copyArgs(n,"ApiId",params,undefined,false); 
			
			copyArgs(n,"AccessLogSettings",params,undefined,true); 
			copyArgs(n,"ApiId",params,undefined,false); 
			copyArgs(n,"AutoDeploy",params,undefined,false); 
			copyArgs(n,"ClientCertificateId",params,undefined,false); 
			copyArgs(n,"DefaultRouteSettings",params,undefined,true); 
			copyArgs(n,"DeploymentId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"RouteSettings",params,undefined,true); 
			copyArgs(n,"StageName",params,undefined,false); 
			copyArgs(n,"StageVariables",params,undefined,true); 
			
			copyArgs(msg,"AccessLogSettings",params,undefined,true); 
			copyArgs(msg,"ApiId",params,undefined,false); 
			copyArgs(msg,"AutoDeploy",params,undefined,false); 
			copyArgs(msg,"ClientCertificateId",params,undefined,false); 
			copyArgs(msg,"DefaultRouteSettings",params,undefined,true); 
			copyArgs(msg,"DeploymentId",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"RouteSettings",params,undefined,true); 
			copyArgs(msg,"StageName",params,undefined,false); 
			copyArgs(msg,"StageVariables",params,undefined,true); 
			

			svc.updateStage(params,cb);
		}

		
		service.UpdateVpcLink=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VpcLinkId",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"VpcLinkId",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"VpcLinkId",params,undefined,false); 
			

			svc.updateVpcLink(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS ApiGatewayV2", AmazonAPINode);

};
