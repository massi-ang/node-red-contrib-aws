
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

		var awsService = new AWS.ServiceCatalog( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.ServiceCatalog(msg.AWSConfig) : awsService;

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

		
		service.AcceptPortfolioShare=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PortfolioId",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"PortfolioId",params,undefined,false); 
			copyArg(msg,"PortfolioShareType",params,undefined,false); 
			

			svc.acceptPortfolioShare(params,cb);
		}

		
		service.AssociateBudgetWithResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BudgetName",params,undefined,false); 
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"BudgetName",params,undefined,false); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			

			svc.associateBudgetWithResource(params,cb);
		}

		
		service.AssociatePrincipalWithPortfolio=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PortfolioId",params,undefined,false); 
			copyArg(n,"PrincipalARN",params,undefined,false); 
			copyArg(n,"PrincipalType",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"PortfolioId",params,undefined,false); 
			copyArg(msg,"PrincipalARN",params,undefined,false); 
			copyArg(msg,"PrincipalType",params,undefined,false); 
			

			svc.associatePrincipalWithPortfolio(params,cb);
		}

		
		service.AssociateProductWithPortfolio=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProductId",params,undefined,false); 
			copyArg(n,"PortfolioId",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"ProductId",params,undefined,false); 
			copyArg(msg,"PortfolioId",params,undefined,false); 
			copyArg(msg,"SourcePortfolioId",params,undefined,false); 
			

			svc.associateProductWithPortfolio(params,cb);
		}

		
		service.AssociateServiceActionWithProvisioningArtifact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProductId",params,undefined,false); 
			copyArg(n,"ProvisioningArtifactId",params,undefined,false); 
			copyArg(n,"ServiceActionId",params,undefined,false); 
			
			copyArg(msg,"ProductId",params,undefined,false); 
			copyArg(msg,"ProvisioningArtifactId",params,undefined,false); 
			copyArg(msg,"ServiceActionId",params,undefined,false); 
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			

			svc.associateServiceActionWithProvisioningArtifact(params,cb);
		}

		
		service.AssociateTagOptionWithResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"TagOptionId",params,undefined,false); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"TagOptionId",params,undefined,false); 
			

			svc.associateTagOptionWithResource(params,cb);
		}

		
		service.BatchAssociateServiceActionWithProvisioningArtifact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceActionAssociations",params,undefined,true); 
			
			copyArg(msg,"ServiceActionAssociations",params,undefined,true); 
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			

			svc.batchAssociateServiceActionWithProvisioningArtifact(params,cb);
		}

		
		service.BatchDisassociateServiceActionFromProvisioningArtifact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceActionAssociations",params,undefined,true); 
			
			copyArg(msg,"ServiceActionAssociations",params,undefined,true); 
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			

			svc.batchDisassociateServiceActionFromProvisioningArtifact(params,cb);
		}

		
		service.CopyProduct=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceProductArn",params,undefined,false); 
			copyArg(n,"IdempotencyToken",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"SourceProductArn",params,undefined,false); 
			copyArg(msg,"TargetProductId",params,undefined,false); 
			copyArg(msg,"TargetProductName",params,undefined,false); 
			copyArg(msg,"SourceProvisioningArtifactIdentifiers",params,undefined,false); 
			copyArg(msg,"CopyOptions",params,undefined,false); 
			copyArg(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.copyProduct(params,cb);
		}

		
		service.CreateConstraint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PortfolioId",params,undefined,false); 
			copyArg(n,"ProductId",params,undefined,false); 
			copyArg(n,"Parameters",params,undefined,false); 
			copyArg(n,"Type",params,undefined,false); 
			copyArg(n,"IdempotencyToken",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"PortfolioId",params,undefined,false); 
			copyArg(msg,"ProductId",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.createConstraint(params,cb);
		}

		
		service.CreatePortfolio=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DisplayName",params,undefined,false); 
			copyArg(n,"ProviderName",params,undefined,false); 
			copyArg(n,"IdempotencyToken",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"DisplayName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"ProviderName",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.createPortfolio(params,cb);
		}

		
		service.CreatePortfolioShare=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PortfolioId",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"PortfolioId",params,undefined,false); 
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"OrganizationNode",params,undefined,true); 
			copyArg(msg,"ShareTagOptions",params,undefined,false); 
			

			svc.createPortfolioShare(params,cb);
		}

		
		service.CreateProduct=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Owner",params,undefined,false); 
			copyArg(n,"ProductType",params,undefined,false); 
			copyArg(n,"ProvisioningArtifactParameters",params,undefined,true); 
			copyArg(n,"IdempotencyToken",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Owner",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Distributor",params,undefined,false); 
			copyArg(msg,"SupportDescription",params,undefined,false); 
			copyArg(msg,"SupportEmail",params,undefined,false); 
			copyArg(msg,"SupportUrl",params,undefined,false); 
			copyArg(msg,"ProductType",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"ProvisioningArtifactParameters",params,undefined,true); 
			copyArg(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.createProduct(params,cb);
		}

		
		service.CreateProvisionedProductPlan=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PlanName",params,undefined,false); 
			copyArg(n,"PlanType",params,undefined,false); 
			copyArg(n,"ProductId",params,undefined,false); 
			copyArg(n,"ProvisionedProductName",params,undefined,false); 
			copyArg(n,"ProvisioningArtifactId",params,undefined,false); 
			copyArg(n,"IdempotencyToken",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"PlanName",params,undefined,false); 
			copyArg(msg,"PlanType",params,undefined,false); 
			copyArg(msg,"NotificationArns",params,undefined,true); 
			copyArg(msg,"PathId",params,undefined,false); 
			copyArg(msg,"ProductId",params,undefined,false); 
			copyArg(msg,"ProvisionedProductName",params,undefined,false); 
			copyArg(msg,"ProvisioningArtifactId",params,undefined,false); 
			copyArg(msg,"ProvisioningParameters",params,undefined,true); 
			copyArg(msg,"IdempotencyToken",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createProvisionedProductPlan(params,cb);
		}

		
		service.CreateProvisioningArtifact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProductId",params,undefined,false); 
			copyArg(n,"Parameters",params,undefined,true); 
			copyArg(n,"IdempotencyToken",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"ProductId",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,true); 
			copyArg(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.createProvisioningArtifact(params,cb);
		}

		
		service.CreateServiceAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"DefinitionType",params,undefined,false); 
			copyArg(n,"Definition",params,undefined,true); 
			copyArg(n,"IdempotencyToken",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"DefinitionType",params,undefined,false); 
			copyArg(msg,"Definition",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.createServiceAction(params,cb);
		}

		
		service.CreateTagOption=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Key",params,undefined,false); 
			copyArg(n,"Value",params,undefined,false); 
			
			copyArg(msg,"Key",params,undefined,false); 
			copyArg(msg,"Value",params,undefined,false); 
			

			svc.createTagOption(params,cb);
		}

		
		service.DeleteConstraint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.deleteConstraint(params,cb);
		}

		
		service.DeletePortfolio=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.deletePortfolio(params,cb);
		}

		
		service.DeletePortfolioShare=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PortfolioId",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"PortfolioId",params,undefined,false); 
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"OrganizationNode",params,undefined,true); 
			

			svc.deletePortfolioShare(params,cb);
		}

		
		service.DeleteProduct=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.deleteProduct(params,cb);
		}

		
		service.DeleteProvisionedProductPlan=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PlanId",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"PlanId",params,undefined,false); 
			copyArg(msg,"IgnoreErrors",params,undefined,false); 
			

			svc.deleteProvisionedProductPlan(params,cb);
		}

		
		service.DeleteProvisioningArtifact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProductId",params,undefined,false); 
			copyArg(n,"ProvisioningArtifactId",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"ProductId",params,undefined,false); 
			copyArg(msg,"ProvisioningArtifactId",params,undefined,false); 
			

			svc.deleteProvisioningArtifact(params,cb);
		}

		
		service.DeleteServiceAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			

			svc.deleteServiceAction(params,cb);
		}

		
		service.DeleteTagOption=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.deleteTagOption(params,cb);
		}

		
		service.DescribeConstraint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.describeConstraint(params,cb);
		}

		
		service.DescribeCopyProductStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CopyProductToken",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"CopyProductToken",params,undefined,false); 
			

			svc.describeCopyProductStatus(params,cb);
		}

		
		service.DescribePortfolio=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.describePortfolio(params,cb);
		}

		
		service.DescribePortfolioShareStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PortfolioShareToken",params,undefined,false); 
			
			copyArg(msg,"PortfolioShareToken",params,undefined,false); 
			

			svc.describePortfolioShareStatus(params,cb);
		}

		
		service.DescribePortfolioShares=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PortfolioId",params,undefined,false); 
			copyArg(n,"Type",params,undefined,false); 
			
			copyArg(msg,"PortfolioId",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"PageToken",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			

			svc.describePortfolioShares(params,cb);
		}

		
		service.DescribeProduct=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.describeProduct(params,cb);
		}

		
		service.DescribeProductAsAdmin=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"SourcePortfolioId",params,undefined,false); 
			

			svc.describeProductAsAdmin(params,cb);
		}

		
		service.DescribeProductView=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.describeProductView(params,cb);
		}

		
		service.DescribeProvisionedProduct=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.describeProvisionedProduct(params,cb);
		}

		
		service.DescribeProvisionedProductPlan=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PlanId",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"PlanId",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			copyArg(msg,"PageToken",params,undefined,false); 
			

			svc.describeProvisionedProductPlan(params,cb);
		}

		
		service.DescribeProvisioningArtifact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"ProvisioningArtifactId",params,undefined,false); 
			copyArg(msg,"ProductId",params,undefined,false); 
			copyArg(msg,"ProvisioningArtifactName",params,undefined,false); 
			copyArg(msg,"ProductName",params,undefined,false); 
			copyArg(msg,"Verbose",params,undefined,false); 
			

			svc.describeProvisioningArtifact(params,cb);
		}

		
		service.DescribeProvisioningParameters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"ProductId",params,undefined,false); 
			copyArg(msg,"ProductName",params,undefined,false); 
			copyArg(msg,"ProvisioningArtifactId",params,undefined,false); 
			copyArg(msg,"ProvisioningArtifactName",params,undefined,false); 
			copyArg(msg,"PathId",params,undefined,false); 
			copyArg(msg,"PathName",params,undefined,false); 
			

			svc.describeProvisioningParameters(params,cb);
		}

		
		service.DescribeRecord=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"PageToken",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			

			svc.describeRecord(params,cb);
		}

		
		service.DescribeServiceAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			

			svc.describeServiceAction(params,cb);
		}

		
		service.DescribeServiceActionExecutionParameters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProvisionedProductId",params,undefined,false); 
			copyArg(n,"ServiceActionId",params,undefined,false); 
			
			copyArg(msg,"ProvisionedProductId",params,undefined,false); 
			copyArg(msg,"ServiceActionId",params,undefined,false); 
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			

			svc.describeServiceActionExecutionParameters(params,cb);
		}

		
		service.DescribeTagOption=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.describeTagOption(params,cb);
		}

		
		service.DisableAWSOrganizationsAccess=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.disableAWSOrganizationsAccess(params,cb);
		}

		
		service.DisassociateBudgetFromResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BudgetName",params,undefined,false); 
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"BudgetName",params,undefined,false); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			

			svc.disassociateBudgetFromResource(params,cb);
		}

		
		service.DisassociatePrincipalFromPortfolio=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PortfolioId",params,undefined,false); 
			copyArg(n,"PrincipalARN",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"PortfolioId",params,undefined,false); 
			copyArg(msg,"PrincipalARN",params,undefined,false); 
			

			svc.disassociatePrincipalFromPortfolio(params,cb);
		}

		
		service.DisassociateProductFromPortfolio=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProductId",params,undefined,false); 
			copyArg(n,"PortfolioId",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"ProductId",params,undefined,false); 
			copyArg(msg,"PortfolioId",params,undefined,false); 
			

			svc.disassociateProductFromPortfolio(params,cb);
		}

		
		service.DisassociateServiceActionFromProvisioningArtifact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProductId",params,undefined,false); 
			copyArg(n,"ProvisioningArtifactId",params,undefined,false); 
			copyArg(n,"ServiceActionId",params,undefined,false); 
			
			copyArg(msg,"ProductId",params,undefined,false); 
			copyArg(msg,"ProvisioningArtifactId",params,undefined,false); 
			copyArg(msg,"ServiceActionId",params,undefined,false); 
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			

			svc.disassociateServiceActionFromProvisioningArtifact(params,cb);
		}

		
		service.DisassociateTagOptionFromResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"TagOptionId",params,undefined,false); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"TagOptionId",params,undefined,false); 
			

			svc.disassociateTagOptionFromResource(params,cb);
		}

		
		service.EnableAWSOrganizationsAccess=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.enableAWSOrganizationsAccess(params,cb);
		}

		
		service.ExecuteProvisionedProductPlan=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PlanId",params,undefined,false); 
			copyArg(n,"IdempotencyToken",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"PlanId",params,undefined,false); 
			copyArg(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.executeProvisionedProductPlan(params,cb);
		}

		
		service.ExecuteProvisionedProductServiceAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProvisionedProductId",params,undefined,false); 
			copyArg(n,"ServiceActionId",params,undefined,false); 
			copyArg(n,"ExecuteToken",params,undefined,false); 
			
			copyArg(msg,"ProvisionedProductId",params,undefined,false); 
			copyArg(msg,"ServiceActionId",params,undefined,false); 
			copyArg(msg,"ExecuteToken",params,undefined,false); 
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,false); 
			

			svc.executeProvisionedProductServiceAction(params,cb);
		}

		
		service.GetAWSOrganizationsAccessStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getAWSOrganizationsAccessStatus(params,cb);
		}

		
		service.GetProvisionedProductOutputs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"ProvisionedProductId",params,undefined,false); 
			copyArg(msg,"ProvisionedProductName",params,undefined,false); 
			copyArg(msg,"OutputKeys",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			copyArg(msg,"PageToken",params,undefined,false); 
			

			svc.getProvisionedProductOutputs(params,cb);
		}

		
		service.ImportAsProvisionedProduct=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProductId",params,undefined,false); 
			copyArg(n,"ProvisioningArtifactId",params,undefined,false); 
			copyArg(n,"ProvisionedProductName",params,undefined,false); 
			copyArg(n,"PhysicalId",params,undefined,false); 
			copyArg(n,"IdempotencyToken",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"ProductId",params,undefined,false); 
			copyArg(msg,"ProvisioningArtifactId",params,undefined,false); 
			copyArg(msg,"ProvisionedProductName",params,undefined,false); 
			copyArg(msg,"PhysicalId",params,undefined,false); 
			copyArg(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.importAsProvisionedProduct(params,cb);
		}

		
		service.ListAcceptedPortfolioShares=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"PageToken",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			copyArg(msg,"PortfolioShareType",params,undefined,false); 
			

			svc.listAcceptedPortfolioShares(params,cb);
		}

		
		service.ListBudgetsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			copyArg(msg,"PageToken",params,undefined,false); 
			

			svc.listBudgetsForResource(params,cb);
		}

		
		service.ListConstraintsForPortfolio=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PortfolioId",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"PortfolioId",params,undefined,false); 
			copyArg(msg,"ProductId",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			copyArg(msg,"PageToken",params,undefined,false); 
			

			svc.listConstraintsForPortfolio(params,cb);
		}

		
		service.ListLaunchPaths=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProductId",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"ProductId",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			copyArg(msg,"PageToken",params,undefined,false); 
			

			svc.listLaunchPaths(params,cb);
		}

		
		service.ListOrganizationPortfolioAccess=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PortfolioId",params,undefined,false); 
			copyArg(n,"OrganizationNodeType",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"PortfolioId",params,undefined,false); 
			copyArg(msg,"OrganizationNodeType",params,undefined,false); 
			copyArg(msg,"PageToken",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			

			svc.listOrganizationPortfolioAccess(params,cb);
		}

		
		service.ListPortfolioAccess=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PortfolioId",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"PortfolioId",params,undefined,false); 
			copyArg(msg,"OrganizationParentId",params,undefined,false); 
			copyArg(msg,"PageToken",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			

			svc.listPortfolioAccess(params,cb);
		}

		
		service.ListPortfolios=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"PageToken",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			

			svc.listPortfolios(params,cb);
		}

		
		service.ListPortfoliosForProduct=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProductId",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"ProductId",params,undefined,false); 
			copyArg(msg,"PageToken",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			

			svc.listPortfoliosForProduct(params,cb);
		}

		
		service.ListPrincipalsForPortfolio=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PortfolioId",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"PortfolioId",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			copyArg(msg,"PageToken",params,undefined,false); 
			

			svc.listPrincipalsForPortfolio(params,cb);
		}

		
		service.ListProvisionedProductPlans=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"ProvisionProductId",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			copyArg(msg,"PageToken",params,undefined,false); 
			copyArg(msg,"AccessLevelFilter",params,undefined,true); 
			

			svc.listProvisionedProductPlans(params,cb);
		}

		
		service.ListProvisioningArtifacts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProductId",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"ProductId",params,undefined,false); 
			

			svc.listProvisioningArtifacts(params,cb);
		}

		
		service.ListProvisioningArtifactsForServiceAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceActionId",params,undefined,false); 
			
			copyArg(msg,"ServiceActionId",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			copyArg(msg,"PageToken",params,undefined,false); 
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			

			svc.listProvisioningArtifactsForServiceAction(params,cb);
		}

		
		service.ListRecordHistory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"AccessLevelFilter",params,undefined,true); 
			copyArg(msg,"SearchFilter",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			copyArg(msg,"PageToken",params,undefined,false); 
			

			svc.listRecordHistory(params,cb);
		}

		
		service.ListResourcesForTagOption=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TagOptionId",params,undefined,false); 
			
			copyArg(msg,"TagOptionId",params,undefined,false); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			copyArg(msg,"PageToken",params,undefined,false); 
			

			svc.listResourcesForTagOption(params,cb);
		}

		
		service.ListServiceActions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			copyArg(msg,"PageToken",params,undefined,false); 
			

			svc.listServiceActions(params,cb);
		}

		
		service.ListServiceActionsForProvisioningArtifact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProductId",params,undefined,false); 
			copyArg(n,"ProvisioningArtifactId",params,undefined,false); 
			
			copyArg(msg,"ProductId",params,undefined,false); 
			copyArg(msg,"ProvisioningArtifactId",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			copyArg(msg,"PageToken",params,undefined,false); 
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			

			svc.listServiceActionsForProvisioningArtifact(params,cb);
		}

		
		service.ListStackInstancesForProvisionedProduct=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProvisionedProductId",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"ProvisionedProductId",params,undefined,false); 
			copyArg(msg,"PageToken",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			

			svc.listStackInstancesForProvisionedProduct(params,cb);
		}

		
		service.ListTagOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			copyArg(msg,"PageToken",params,undefined,false); 
			

			svc.listTagOptions(params,cb);
		}

		
		service.ProvisionProduct=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProvisionedProductName",params,undefined,false); 
			copyArg(n,"ProvisionToken",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"ProductId",params,undefined,false); 
			copyArg(msg,"ProductName",params,undefined,false); 
			copyArg(msg,"ProvisioningArtifactId",params,undefined,false); 
			copyArg(msg,"ProvisioningArtifactName",params,undefined,false); 
			copyArg(msg,"PathId",params,undefined,false); 
			copyArg(msg,"PathName",params,undefined,false); 
			copyArg(msg,"ProvisionedProductName",params,undefined,false); 
			copyArg(msg,"ProvisioningParameters",params,undefined,false); 
			copyArg(msg,"ProvisioningPreferences",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"NotificationArns",params,undefined,true); 
			copyArg(msg,"ProvisionToken",params,undefined,false); 
			

			svc.provisionProduct(params,cb);
		}

		
		service.RejectPortfolioShare=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PortfolioId",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"PortfolioId",params,undefined,false); 
			copyArg(msg,"PortfolioShareType",params,undefined,false); 
			

			svc.rejectPortfolioShare(params,cb);
		}

		
		service.ScanProvisionedProducts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"AccessLevelFilter",params,undefined,true); 
			copyArg(msg,"PageSize",params,undefined,false); 
			copyArg(msg,"PageToken",params,undefined,false); 
			

			svc.scanProvisionedProducts(params,cb);
		}

		
		service.SearchProducts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"PageSize",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"PageToken",params,undefined,false); 
			

			svc.searchProducts(params,cb);
		}

		
		service.SearchProductsAsAdmin=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"PortfolioId",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"PageToken",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			copyArg(msg,"ProductSource",params,undefined,false); 
			

			svc.searchProductsAsAdmin(params,cb);
		}

		
		service.SearchProvisionedProducts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"AccessLevelFilter",params,undefined,true); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			copyArg(msg,"PageToken",params,undefined,false); 
			

			svc.searchProvisionedProducts(params,cb);
		}

		
		service.TerminateProvisionedProduct=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TerminateToken",params,undefined,false); 
			
			copyArg(msg,"ProvisionedProductName",params,undefined,false); 
			copyArg(msg,"ProvisionedProductId",params,undefined,false); 
			copyArg(msg,"TerminateToken",params,undefined,false); 
			copyArg(msg,"IgnoreErrors",params,undefined,false); 
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"RetainPhysicalResources",params,undefined,false); 
			

			svc.terminateProvisionedProduct(params,cb);
		}

		
		service.UpdateConstraint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,false); 
			

			svc.updateConstraint(params,cb);
		}

		
		service.UpdatePortfolio=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"DisplayName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"ProviderName",params,undefined,false); 
			copyArg(msg,"AddTags",params,undefined,true); 
			copyArg(msg,"RemoveTags",params,undefined,true); 
			

			svc.updatePortfolio(params,cb);
		}

		
		service.UpdatePortfolioShare=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PortfolioId",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"PortfolioId",params,undefined,false); 
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"OrganizationNode",params,undefined,true); 
			copyArg(msg,"ShareTagOptions",params,undefined,false); 
			

			svc.updatePortfolioShare(params,cb);
		}

		
		service.UpdateProduct=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Owner",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Distributor",params,undefined,false); 
			copyArg(msg,"SupportDescription",params,undefined,false); 
			copyArg(msg,"SupportEmail",params,undefined,false); 
			copyArg(msg,"SupportUrl",params,undefined,false); 
			copyArg(msg,"AddTags",params,undefined,true); 
			copyArg(msg,"RemoveTags",params,undefined,true); 
			

			svc.updateProduct(params,cb);
		}

		
		service.UpdateProvisionedProduct=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UpdateToken",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"ProvisionedProductName",params,undefined,false); 
			copyArg(msg,"ProvisionedProductId",params,undefined,false); 
			copyArg(msg,"ProductId",params,undefined,false); 
			copyArg(msg,"ProductName",params,undefined,false); 
			copyArg(msg,"ProvisioningArtifactId",params,undefined,false); 
			copyArg(msg,"ProvisioningArtifactName",params,undefined,false); 
			copyArg(msg,"PathId",params,undefined,false); 
			copyArg(msg,"PathName",params,undefined,false); 
			copyArg(msg,"ProvisioningParameters",params,undefined,true); 
			copyArg(msg,"ProvisioningPreferences",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"UpdateToken",params,undefined,false); 
			

			svc.updateProvisionedProduct(params,cb);
		}

		
		service.UpdateProvisionedProductProperties=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProvisionedProductId",params,undefined,false); 
			copyArg(n,"ProvisionedProductProperties",params,undefined,true); 
			copyArg(n,"IdempotencyToken",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"ProvisionedProductId",params,undefined,false); 
			copyArg(msg,"ProvisionedProductProperties",params,undefined,true); 
			copyArg(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.updateProvisionedProductProperties(params,cb);
		}

		
		service.UpdateProvisioningArtifact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProductId",params,undefined,false); 
			copyArg(n,"ProvisioningArtifactId",params,undefined,false); 
			
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			copyArg(msg,"ProductId",params,undefined,false); 
			copyArg(msg,"ProvisioningArtifactId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Active",params,undefined,false); 
			copyArg(msg,"Guidance",params,undefined,false); 
			

			svc.updateProvisioningArtifact(params,cb);
		}

		
		service.UpdateServiceAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Definition",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"AcceptLanguage",params,undefined,false); 
			

			svc.updateServiceAction(params,cb);
		}

		
		service.UpdateTagOption=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"Value",params,undefined,false); 
			copyArg(msg,"Active",params,undefined,false); 
			

			svc.updateTagOption(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS ServiceCatalog", AmazonAPINode);

};
