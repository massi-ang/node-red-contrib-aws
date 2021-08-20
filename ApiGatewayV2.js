
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

		var awsService = new AWS.ApiGatewayV2( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.ApiGatewayV2(msg.AWSConfig) : awsService;

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

		
		service.CreateApi=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProtocolType",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"ApiKeySelectionExpression",params,undefined,false); 
			copyArg(msg,"CorsConfiguration",params,undefined,true); 
			copyArg(msg,"CredentialsArn",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DisableSchemaValidation",params,undefined,false); 
			copyArg(msg,"DisableExecuteApiEndpoint",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ProtocolType",params,undefined,false); 
			copyArg(msg,"RouteKey",params,undefined,false); 
			copyArg(msg,"RouteSelectionExpression",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"Target",params,undefined,false); 
			copyArg(msg,"Version",params,undefined,false); 
			

			svc.createApi(params,cb);
		}

		
		service.CreateApiMapping=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			copyArg(n,"Stage",params,undefined,false); 
			copyArg(n,"ApiId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"ApiMappingKey",params,undefined,false); 
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"Stage",params,undefined,false); 
			

			svc.createApiMapping(params,cb);
		}

		
		service.CreateAuthorizer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			copyArg(n,"AuthorizerType",params,undefined,false); 
			copyArg(n,"IdentitySource",params,undefined,true); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"AuthorizerCredentialsArn",params,undefined,false); 
			copyArg(msg,"AuthorizerPayloadFormatVersion",params,undefined,false); 
			copyArg(msg,"AuthorizerResultTtlInSeconds",params,undefined,false); 
			copyArg(msg,"AuthorizerType",params,undefined,false); 
			copyArg(msg,"AuthorizerUri",params,undefined,false); 
			copyArg(msg,"EnableSimpleResponses",params,undefined,false); 
			copyArg(msg,"IdentitySource",params,undefined,true); 
			copyArg(msg,"IdentityValidationExpression",params,undefined,false); 
			copyArg(msg,"JwtConfiguration",params,undefined,true); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.createAuthorizer(params,cb);
		}

		
		service.CreateDeployment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"StageName",params,undefined,false); 
			

			svc.createDeployment(params,cb);
		}

		
		service.CreateDomainName=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"DomainNameConfigurations",params,undefined,true); 
			copyArg(msg,"MutualTlsAuthentication",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createDomainName(params,cb);
		}

		
		service.CreateIntegration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			copyArg(n,"IntegrationType",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"ConnectionId",params,undefined,false); 
			copyArg(msg,"ConnectionType",params,undefined,false); 
			copyArg(msg,"ContentHandlingStrategy",params,undefined,false); 
			copyArg(msg,"CredentialsArn",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"IntegrationMethod",params,undefined,false); 
			copyArg(msg,"IntegrationSubtype",params,undefined,false); 
			copyArg(msg,"IntegrationType",params,undefined,false); 
			copyArg(msg,"IntegrationUri",params,undefined,false); 
			copyArg(msg,"PassthroughBehavior",params,undefined,false); 
			copyArg(msg,"PayloadFormatVersion",params,undefined,false); 
			copyArg(msg,"RequestParameters",params,undefined,true); 
			copyArg(msg,"RequestTemplates",params,undefined,true); 
			copyArg(msg,"ResponseParameters",params,undefined,true); 
			copyArg(msg,"TemplateSelectionExpression",params,undefined,false); 
			copyArg(msg,"TimeoutInMillis",params,undefined,false); 
			copyArg(msg,"TlsConfig",params,undefined,true); 
			

			svc.createIntegration(params,cb);
		}

		
		service.CreateIntegrationResponse=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			copyArg(n,"IntegrationId",params,undefined,false); 
			copyArg(n,"IntegrationResponseKey",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"ContentHandlingStrategy",params,undefined,false); 
			copyArg(msg,"IntegrationId",params,undefined,false); 
			copyArg(msg,"IntegrationResponseKey",params,undefined,false); 
			copyArg(msg,"ResponseParameters",params,undefined,true); 
			copyArg(msg,"ResponseTemplates",params,undefined,true); 
			copyArg(msg,"TemplateSelectionExpression",params,undefined,false); 
			

			svc.createIntegrationResponse(params,cb);
		}

		
		service.CreateModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			copyArg(n,"Schema",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"ContentType",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Schema",params,undefined,false); 
			

			svc.createModel(params,cb);
		}

		
		service.CreateRoute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			copyArg(n,"RouteKey",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"ApiKeyRequired",params,undefined,false); 
			copyArg(msg,"AuthorizationScopes",params,undefined,true); 
			copyArg(msg,"AuthorizationType",params,undefined,false); 
			copyArg(msg,"AuthorizerId",params,undefined,false); 
			copyArg(msg,"ModelSelectionExpression",params,undefined,false); 
			copyArg(msg,"OperationName",params,undefined,false); 
			copyArg(msg,"RequestModels",params,undefined,true); 
			copyArg(msg,"RequestParameters",params,undefined,true); 
			copyArg(msg,"RouteKey",params,undefined,false); 
			copyArg(msg,"RouteResponseSelectionExpression",params,undefined,false); 
			copyArg(msg,"Target",params,undefined,false); 
			

			svc.createRoute(params,cb);
		}

		
		service.CreateRouteResponse=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			copyArg(n,"RouteId",params,undefined,false); 
			copyArg(n,"RouteResponseKey",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"ModelSelectionExpression",params,undefined,false); 
			copyArg(msg,"ResponseModels",params,undefined,true); 
			copyArg(msg,"ResponseParameters",params,undefined,true); 
			copyArg(msg,"RouteId",params,undefined,false); 
			copyArg(msg,"RouteResponseKey",params,undefined,false); 
			

			svc.createRouteResponse(params,cb);
		}

		
		service.CreateStage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			copyArg(n,"StageName",params,undefined,false); 
			
			copyArg(msg,"AccessLogSettings",params,undefined,true); 
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"AutoDeploy",params,undefined,false); 
			copyArg(msg,"ClientCertificateId",params,undefined,false); 
			copyArg(msg,"DefaultRouteSettings",params,undefined,true); 
			copyArg(msg,"DeploymentId",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"RouteSettings",params,undefined,true); 
			copyArg(msg,"StageName",params,undefined,false); 
			copyArg(msg,"StageVariables",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createStage(params,cb);
		}

		
		service.CreateVpcLink=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubnetIds",params,undefined,true); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"SecurityGroupIds",params,undefined,true); 
			copyArg(msg,"SubnetIds",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createVpcLink(params,cb);
		}

		
		service.DeleteAccessLogSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StageName",params,undefined,false); 
			copyArg(n,"ApiId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"StageName",params,undefined,false); 
			

			svc.deleteAccessLogSettings(params,cb);
		}

		
		service.DeleteApi=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			

			svc.deleteApi(params,cb);
		}

		
		service.DeleteApiMapping=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiMappingId",params,undefined,false); 
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"ApiMappingId",params,undefined,false); 
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.deleteApiMapping(params,cb);
		}

		
		service.DeleteAuthorizer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AuthorizerId",params,undefined,false); 
			copyArg(n,"ApiId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"AuthorizerId",params,undefined,false); 
			

			svc.deleteAuthorizer(params,cb);
		}

		
		service.DeleteCorsConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			

			svc.deleteCorsConfiguration(params,cb);
		}

		
		service.DeleteDeployment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			copyArg(n,"DeploymentId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"DeploymentId",params,undefined,false); 
			

			svc.deleteDeployment(params,cb);
		}

		
		service.DeleteDomainName=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.deleteDomainName(params,cb);
		}

		
		service.DeleteIntegration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			copyArg(n,"IntegrationId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"IntegrationId",params,undefined,false); 
			

			svc.deleteIntegration(params,cb);
		}

		
		service.DeleteIntegrationResponse=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			copyArg(n,"IntegrationResponseId",params,undefined,false); 
			copyArg(n,"IntegrationId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"IntegrationId",params,undefined,false); 
			copyArg(msg,"IntegrationResponseId",params,undefined,false); 
			

			svc.deleteIntegrationResponse(params,cb);
		}

		
		service.DeleteModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ModelId",params,undefined,false); 
			copyArg(n,"ApiId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"ModelId",params,undefined,false); 
			

			svc.deleteModel(params,cb);
		}

		
		service.DeleteRoute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			copyArg(n,"RouteId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"RouteId",params,undefined,false); 
			

			svc.deleteRoute(params,cb);
		}

		
		service.DeleteRouteRequestParameter=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RequestParameterKey",params,undefined,false); 
			copyArg(n,"ApiId",params,undefined,false); 
			copyArg(n,"RouteId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"RequestParameterKey",params,undefined,false); 
			copyArg(msg,"RouteId",params,undefined,false); 
			

			svc.deleteRouteRequestParameter(params,cb);
		}

		
		service.DeleteRouteResponse=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RouteResponseId",params,undefined,false); 
			copyArg(n,"ApiId",params,undefined,false); 
			copyArg(n,"RouteId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"RouteId",params,undefined,false); 
			copyArg(msg,"RouteResponseId",params,undefined,false); 
			

			svc.deleteRouteResponse(params,cb);
		}

		
		service.DeleteRouteSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StageName",params,undefined,false); 
			copyArg(n,"RouteKey",params,undefined,false); 
			copyArg(n,"ApiId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"RouteKey",params,undefined,false); 
			copyArg(msg,"StageName",params,undefined,false); 
			

			svc.deleteRouteSettings(params,cb);
		}

		
		service.DeleteStage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StageName",params,undefined,false); 
			copyArg(n,"ApiId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"StageName",params,undefined,false); 
			

			svc.deleteStage(params,cb);
		}

		
		service.DeleteVpcLink=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcLinkId",params,undefined,false); 
			
			copyArg(msg,"VpcLinkId",params,undefined,false); 
			

			svc.deleteVpcLink(params,cb);
		}

		
		service.ExportApi=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Specification",params,undefined,false); 
			copyArg(n,"OutputType",params,undefined,false); 
			copyArg(n,"ApiId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"ExportVersion",params,undefined,false); 
			copyArg(msg,"IncludeExtensions",params,undefined,false); 
			copyArg(msg,"OutputType",params,undefined,false); 
			copyArg(msg,"Specification",params,undefined,false); 
			copyArg(msg,"StageName",params,undefined,false); 
			

			svc.exportApi(params,cb);
		}

		
		service.ResetAuthorizersCache=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StageName",params,undefined,false); 
			copyArg(n,"ApiId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"StageName",params,undefined,false); 
			

			svc.resetAuthorizersCache(params,cb);
		}

		
		service.GetApi=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			

			svc.getApi(params,cb);
		}

		
		service.GetApiMapping=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiMappingId",params,undefined,false); 
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"ApiMappingId",params,undefined,false); 
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.getApiMapping(params,cb);
		}

		
		service.GetApiMappings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getApiMappings(params,cb);
		}

		
		service.GetApis=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getApis(params,cb);
		}

		
		service.GetAuthorizer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AuthorizerId",params,undefined,false); 
			copyArg(n,"ApiId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"AuthorizerId",params,undefined,false); 
			

			svc.getAuthorizer(params,cb);
		}

		
		service.GetAuthorizers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getAuthorizers(params,cb);
		}

		
		service.GetDeployment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			copyArg(n,"DeploymentId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"DeploymentId",params,undefined,false); 
			

			svc.getDeployment(params,cb);
		}

		
		service.GetDeployments=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getDeployments(params,cb);
		}

		
		service.GetDomainName=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.getDomainName(params,cb);
		}

		
		service.GetDomainNames=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getDomainNames(params,cb);
		}

		
		service.GetIntegration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			copyArg(n,"IntegrationId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"IntegrationId",params,undefined,false); 
			

			svc.getIntegration(params,cb);
		}

		
		service.GetIntegrationResponse=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			copyArg(n,"IntegrationResponseId",params,undefined,false); 
			copyArg(n,"IntegrationId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"IntegrationId",params,undefined,false); 
			copyArg(msg,"IntegrationResponseId",params,undefined,false); 
			

			svc.getIntegrationResponse(params,cb);
		}

		
		service.GetIntegrationResponses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IntegrationId",params,undefined,false); 
			copyArg(n,"ApiId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"IntegrationId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getIntegrationResponses(params,cb);
		}

		
		service.GetIntegrations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getIntegrations(params,cb);
		}

		
		service.GetModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ModelId",params,undefined,false); 
			copyArg(n,"ApiId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"ModelId",params,undefined,false); 
			

			svc.getModel(params,cb);
		}

		
		service.GetModelTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ModelId",params,undefined,false); 
			copyArg(n,"ApiId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"ModelId",params,undefined,false); 
			

			svc.getModelTemplate(params,cb);
		}

		
		service.GetModels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getModels(params,cb);
		}

		
		service.GetRoute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			copyArg(n,"RouteId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"RouteId",params,undefined,false); 
			

			svc.getRoute(params,cb);
		}

		
		service.GetRouteResponse=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RouteResponseId",params,undefined,false); 
			copyArg(n,"ApiId",params,undefined,false); 
			copyArg(n,"RouteId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"RouteId",params,undefined,false); 
			copyArg(msg,"RouteResponseId",params,undefined,false); 
			

			svc.getRouteResponse(params,cb);
		}

		
		service.GetRouteResponses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RouteId",params,undefined,false); 
			copyArg(n,"ApiId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"RouteId",params,undefined,false); 
			

			svc.getRouteResponses(params,cb);
		}

		
		service.GetRoutes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getRoutes(params,cb);
		}

		
		service.GetStage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StageName",params,undefined,false); 
			copyArg(n,"ApiId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"StageName",params,undefined,false); 
			

			svc.getStage(params,cb);
		}

		
		service.GetStages=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getStages(params,cb);
		}

		
		service.GetTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.getTags(params,cb);
		}

		
		service.GetVpcLink=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcLinkId",params,undefined,false); 
			
			copyArg(msg,"VpcLinkId",params,undefined,false); 
			

			svc.getVpcLink(params,cb);
		}

		
		service.GetVpcLinks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getVpcLinks(params,cb);
		}

		
		service.ImportApi=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Body",params,undefined,false); 
			
			copyArg(msg,"Basepath",params,undefined,false); 
			copyArg(msg,"Body",params,undefined,false); 
			copyArg(msg,"FailOnWarnings",params,undefined,false); 
			

			svc.importApi(params,cb);
		}

		
		service.ReimportApi=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			copyArg(n,"Body",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"Basepath",params,undefined,false); 
			copyArg(msg,"Body",params,undefined,false); 
			copyArg(msg,"FailOnWarnings",params,undefined,false); 
			

			svc.reimportApi(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,true); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateApi=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"ApiKeySelectionExpression",params,undefined,false); 
			copyArg(msg,"CorsConfiguration",params,undefined,true); 
			copyArg(msg,"CredentialsArn",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DisableSchemaValidation",params,undefined,false); 
			copyArg(msg,"DisableExecuteApiEndpoint",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"RouteKey",params,undefined,false); 
			copyArg(msg,"RouteSelectionExpression",params,undefined,false); 
			copyArg(msg,"Target",params,undefined,false); 
			copyArg(msg,"Version",params,undefined,false); 
			

			svc.updateApi(params,cb);
		}

		
		service.UpdateApiMapping=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiMappingId",params,undefined,false); 
			copyArg(n,"ApiId",params,undefined,false); 
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"ApiMappingId",params,undefined,false); 
			copyArg(msg,"ApiMappingKey",params,undefined,false); 
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"Stage",params,undefined,false); 
			

			svc.updateApiMapping(params,cb);
		}

		
		service.UpdateAuthorizer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AuthorizerId",params,undefined,false); 
			copyArg(n,"ApiId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"AuthorizerCredentialsArn",params,undefined,false); 
			copyArg(msg,"AuthorizerId",params,undefined,false); 
			copyArg(msg,"AuthorizerPayloadFormatVersion",params,undefined,false); 
			copyArg(msg,"AuthorizerResultTtlInSeconds",params,undefined,false); 
			copyArg(msg,"AuthorizerType",params,undefined,false); 
			copyArg(msg,"AuthorizerUri",params,undefined,false); 
			copyArg(msg,"EnableSimpleResponses",params,undefined,false); 
			copyArg(msg,"IdentitySource",params,undefined,true); 
			copyArg(msg,"IdentityValidationExpression",params,undefined,false); 
			copyArg(msg,"JwtConfiguration",params,undefined,true); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.updateAuthorizer(params,cb);
		}

		
		service.UpdateDeployment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			copyArg(n,"DeploymentId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"DeploymentId",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			

			svc.updateDeployment(params,cb);
		}

		
		service.UpdateDomainName=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"DomainNameConfigurations",params,undefined,true); 
			copyArg(msg,"MutualTlsAuthentication",params,undefined,true); 
			

			svc.updateDomainName(params,cb);
		}

		
		service.UpdateIntegration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			copyArg(n,"IntegrationId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"ConnectionId",params,undefined,false); 
			copyArg(msg,"ConnectionType",params,undefined,false); 
			copyArg(msg,"ContentHandlingStrategy",params,undefined,false); 
			copyArg(msg,"CredentialsArn",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"IntegrationId",params,undefined,false); 
			copyArg(msg,"IntegrationMethod",params,undefined,false); 
			copyArg(msg,"IntegrationSubtype",params,undefined,false); 
			copyArg(msg,"IntegrationType",params,undefined,false); 
			copyArg(msg,"IntegrationUri",params,undefined,false); 
			copyArg(msg,"PassthroughBehavior",params,undefined,false); 
			copyArg(msg,"PayloadFormatVersion",params,undefined,false); 
			copyArg(msg,"RequestParameters",params,undefined,true); 
			copyArg(msg,"RequestTemplates",params,undefined,true); 
			copyArg(msg,"ResponseParameters",params,undefined,true); 
			copyArg(msg,"TemplateSelectionExpression",params,undefined,false); 
			copyArg(msg,"TimeoutInMillis",params,undefined,false); 
			copyArg(msg,"TlsConfig",params,undefined,true); 
			

			svc.updateIntegration(params,cb);
		}

		
		service.UpdateIntegrationResponse=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			copyArg(n,"IntegrationResponseId",params,undefined,false); 
			copyArg(n,"IntegrationId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"ContentHandlingStrategy",params,undefined,false); 
			copyArg(msg,"IntegrationId",params,undefined,false); 
			copyArg(msg,"IntegrationResponseId",params,undefined,false); 
			copyArg(msg,"IntegrationResponseKey",params,undefined,false); 
			copyArg(msg,"ResponseParameters",params,undefined,true); 
			copyArg(msg,"ResponseTemplates",params,undefined,true); 
			copyArg(msg,"TemplateSelectionExpression",params,undefined,false); 
			

			svc.updateIntegrationResponse(params,cb);
		}

		
		service.UpdateModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ModelId",params,undefined,false); 
			copyArg(n,"ApiId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"ContentType",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"ModelId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Schema",params,undefined,false); 
			

			svc.updateModel(params,cb);
		}

		
		service.UpdateRoute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApiId",params,undefined,false); 
			copyArg(n,"RouteId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"ApiKeyRequired",params,undefined,false); 
			copyArg(msg,"AuthorizationScopes",params,undefined,true); 
			copyArg(msg,"AuthorizationType",params,undefined,false); 
			copyArg(msg,"AuthorizerId",params,undefined,false); 
			copyArg(msg,"ModelSelectionExpression",params,undefined,false); 
			copyArg(msg,"OperationName",params,undefined,false); 
			copyArg(msg,"RequestModels",params,undefined,true); 
			copyArg(msg,"RequestParameters",params,undefined,true); 
			copyArg(msg,"RouteId",params,undefined,false); 
			copyArg(msg,"RouteKey",params,undefined,false); 
			copyArg(msg,"RouteResponseSelectionExpression",params,undefined,false); 
			copyArg(msg,"Target",params,undefined,false); 
			

			svc.updateRoute(params,cb);
		}

		
		service.UpdateRouteResponse=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RouteResponseId",params,undefined,false); 
			copyArg(n,"ApiId",params,undefined,false); 
			copyArg(n,"RouteId",params,undefined,false); 
			
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"ModelSelectionExpression",params,undefined,false); 
			copyArg(msg,"ResponseModels",params,undefined,true); 
			copyArg(msg,"ResponseParameters",params,undefined,true); 
			copyArg(msg,"RouteId",params,undefined,false); 
			copyArg(msg,"RouteResponseId",params,undefined,false); 
			copyArg(msg,"RouteResponseKey",params,undefined,false); 
			

			svc.updateRouteResponse(params,cb);
		}

		
		service.UpdateStage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StageName",params,undefined,false); 
			copyArg(n,"ApiId",params,undefined,false); 
			
			copyArg(msg,"AccessLogSettings",params,undefined,true); 
			copyArg(msg,"ApiId",params,undefined,false); 
			copyArg(msg,"AutoDeploy",params,undefined,false); 
			copyArg(msg,"ClientCertificateId",params,undefined,false); 
			copyArg(msg,"DefaultRouteSettings",params,undefined,true); 
			copyArg(msg,"DeploymentId",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"RouteSettings",params,undefined,true); 
			copyArg(msg,"StageName",params,undefined,false); 
			copyArg(msg,"StageVariables",params,undefined,true); 
			

			svc.updateStage(params,cb);
		}

		
		service.UpdateVpcLink=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcLinkId",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"VpcLinkId",params,undefined,false); 
			

			svc.updateVpcLink(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS ApiGatewayV2", AmazonAPINode);

};
