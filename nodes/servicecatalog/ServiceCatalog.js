
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

		var awsService = new AWS.ServiceCatalog( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.ServiceCatalog(msg.AWSConfig) : awsService;

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
		
			service.AcceptPortfolioShare=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PortfolioId",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"PortfolioId",params,undefined,false); 
			copyArgs(n,"PortfolioShareType",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"PortfolioId",params,undefined,false); 
			copyArgs(msg,"PortfolioShareType",params,undefined,false); 
			

			svc.acceptPortfolioShare(params,cb);
		}
			service.AssociateBudgetWithResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(msg,"BudgetName",params,undefined,false); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			

			svc.associateBudgetWithResource(params,cb);
		}
			service.AssociatePrincipalWithPortfolio=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PortfolioId",params,undefined,false); 
			copyArgs(n,"PrincipalARN",params,undefined,false); 
			copyArgs(n,"PrincipalType",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"PortfolioId",params,undefined,false); 
			copyArgs(n,"PrincipalARN",params,undefined,false); 
			copyArgs(n,"PrincipalType",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"PortfolioId",params,undefined,false); 
			copyArgs(msg,"PrincipalARN",params,undefined,false); 
			copyArgs(msg,"PrincipalType",params,undefined,false); 
			

			svc.associatePrincipalWithPortfolio(params,cb);
		}
			service.AssociateProductWithPortfolio=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(n,"PortfolioId",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(n,"PortfolioId",params,undefined,false); 
			copyArgs(n,"SourcePortfolioId",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"ProductId",params,undefined,false); 
			copyArgs(msg,"PortfolioId",params,undefined,false); 
			copyArgs(msg,"SourcePortfolioId",params,undefined,false); 
			

			svc.associateProductWithPortfolio(params,cb);
		}
			service.AssociateServiceActionWithProvisioningArtifact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(n,"ProvisioningArtifactId",params,undefined,false); 
			copyArgs(n,"ServiceActionId",params,undefined,false); 
			
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(n,"ProvisioningArtifactId",params,undefined,false); 
			copyArgs(n,"ServiceActionId",params,undefined,false); 
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			
			copyArgs(msg,"ProductId",params,undefined,false); 
			copyArgs(msg,"ProvisioningArtifactId",params,undefined,false); 
			copyArgs(msg,"ServiceActionId",params,undefined,false); 
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			

			svc.associateServiceActionWithProvisioningArtifact(params,cb);
		}
			service.AssociateTagOptionWithResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"TagOptionId",params,undefined,false); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"TagOptionId",params,undefined,false); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"TagOptionId",params,undefined,false); 
			

			svc.associateTagOptionWithResource(params,cb);
		}
			service.BatchAssociateServiceActionWithProvisioningArtifact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServiceActionAssociations",params,undefined,true); 
			
			copyArgs(n,"ServiceActionAssociations",params,undefined,true); 
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			
			copyArgs(msg,"ServiceActionAssociations",params,undefined,true); 
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			

			svc.batchAssociateServiceActionWithProvisioningArtifact(params,cb);
		}
			service.BatchDisassociateServiceActionFromProvisioningArtifact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServiceActionAssociations",params,undefined,true); 
			
			copyArgs(n,"ServiceActionAssociations",params,undefined,true); 
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			
			copyArgs(msg,"ServiceActionAssociations",params,undefined,true); 
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			

			svc.batchDisassociateServiceActionFromProvisioningArtifact(params,cb);
		}
			service.CopyProduct=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceProductArn",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"SourceProductArn",params,undefined,false); 
			copyArgs(n,"TargetProductId",params,undefined,false); 
			copyArgs(n,"TargetProductName",params,undefined,false); 
			copyArgs(n,"SourceProvisioningArtifactIdentifiers",params,undefined,false); 
			copyArgs(n,"CopyOptions",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"SourceProductArn",params,undefined,false); 
			copyArgs(msg,"TargetProductId",params,undefined,false); 
			copyArgs(msg,"TargetProductName",params,undefined,false); 
			copyArgs(msg,"SourceProvisioningArtifactIdentifiers",params,undefined,false); 
			copyArgs(msg,"CopyOptions",params,undefined,false); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.copyProduct(params,cb);
		}
			service.CreateConstraint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PortfolioId",params,undefined,false); 
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"PortfolioId",params,undefined,false); 
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"PortfolioId",params,undefined,false); 
			copyArgs(msg,"ProductId",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.createConstraint(params,cb);
		}
			service.CreatePortfolio=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DisplayName",params,undefined,false); 
			copyArgs(n,"ProviderName",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"DisplayName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"ProviderName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"DisplayName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"ProviderName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.createPortfolio(params,cb);
		}
			service.CreatePortfolioShare=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PortfolioId",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"PortfolioId",params,undefined,false); 
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"OrganizationNode",params,undefined,true); 
			copyArgs(Boolean(n),"ShareTagOptions",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"PortfolioId",params,undefined,false); 
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"OrganizationNode",params,undefined,true); 
			copyArgs(msg,"ShareTagOptions",params,undefined,false); 
			

			svc.createPortfolioShare(params,cb);
		}
			service.CreateProduct=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Owner",params,undefined,false); 
			copyArgs(n,"ProductType",params,undefined,false); 
			copyArgs(n,"ProvisioningArtifactParameters",params,undefined,true); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Owner",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Distributor",params,undefined,false); 
			copyArgs(n,"SupportDescription",params,undefined,false); 
			copyArgs(n,"SupportEmail",params,undefined,false); 
			copyArgs(n,"SupportUrl",params,undefined,false); 
			copyArgs(n,"ProductType",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"ProvisioningArtifactParameters",params,undefined,true); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Owner",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Distributor",params,undefined,false); 
			copyArgs(msg,"SupportDescription",params,undefined,false); 
			copyArgs(msg,"SupportEmail",params,undefined,false); 
			copyArgs(msg,"SupportUrl",params,undefined,false); 
			copyArgs(msg,"ProductType",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"ProvisioningArtifactParameters",params,undefined,true); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.createProduct(params,cb);
		}
			service.CreateProvisionedProductPlan=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PlanName",params,undefined,false); 
			copyArgs(n,"PlanType",params,undefined,false); 
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(n,"ProvisionedProductName",params,undefined,false); 
			copyArgs(n,"ProvisioningArtifactId",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"PlanName",params,undefined,false); 
			copyArgs(n,"PlanType",params,undefined,false); 
			copyArgs(n,"NotificationArns",params,undefined,true); 
			copyArgs(n,"PathId",params,undefined,false); 
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(n,"ProvisionedProductName",params,undefined,false); 
			copyArgs(n,"ProvisioningArtifactId",params,undefined,false); 
			copyArgs(n,"ProvisioningParameters",params,undefined,true); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"PlanName",params,undefined,false); 
			copyArgs(msg,"PlanType",params,undefined,false); 
			copyArgs(msg,"NotificationArns",params,undefined,true); 
			copyArgs(msg,"PathId",params,undefined,false); 
			copyArgs(msg,"ProductId",params,undefined,false); 
			copyArgs(msg,"ProvisionedProductName",params,undefined,false); 
			copyArgs(msg,"ProvisioningArtifactId",params,undefined,false); 
			copyArgs(msg,"ProvisioningParameters",params,undefined,true); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createProvisionedProductPlan(params,cb);
		}
			service.CreateProvisioningArtifact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"ProductId",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.createProvisioningArtifact(params,cb);
		}
			service.CreateServiceAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"DefinitionType",params,undefined,false); 
			copyArgs(n,"Definition",params,undefined,true); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"DefinitionType",params,undefined,false); 
			copyArgs(n,"Definition",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"DefinitionType",params,undefined,false); 
			copyArgs(msg,"Definition",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.createServiceAction(params,cb);
		}
			service.CreateTagOption=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(n,"Value",params,undefined,false); 
			
			copyArgs(n,"Key",params,undefined,false); 
			copyArgs(n,"Value",params,undefined,false); 
			
			copyArgs(msg,"Key",params,undefined,false); 
			copyArgs(msg,"Value",params,undefined,false); 
			

			svc.createTagOption(params,cb);
		}
			service.DeleteConstraint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.deleteConstraint(params,cb);
		}
			service.DeletePortfolio=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.deletePortfolio(params,cb);
		}
			service.DeletePortfolioShare=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PortfolioId",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"PortfolioId",params,undefined,false); 
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"OrganizationNode",params,undefined,true); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"PortfolioId",params,undefined,false); 
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"OrganizationNode",params,undefined,true); 
			

			svc.deletePortfolioShare(params,cb);
		}
			service.DeleteProduct=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.deleteProduct(params,cb);
		}
			service.DeleteProvisionedProductPlan=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PlanId",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"PlanId",params,undefined,false); 
			copyArgs(Boolean(n),"IgnoreErrors",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"PlanId",params,undefined,false); 
			copyArgs(msg,"IgnoreErrors",params,undefined,false); 
			

			svc.deleteProvisionedProductPlan(params,cb);
		}
			service.DeleteProvisioningArtifact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(n,"ProvisioningArtifactId",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(n,"ProvisioningArtifactId",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"ProductId",params,undefined,false); 
			copyArgs(msg,"ProvisioningArtifactId",params,undefined,false); 
			

			svc.deleteProvisioningArtifact(params,cb);
		}
			service.DeleteServiceAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			

			svc.deleteServiceAction(params,cb);
		}
			service.DeleteTagOption=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.deleteTagOption(params,cb);
		}
			service.DescribeConstraint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.describeConstraint(params,cb);
		}
			service.DescribeCopyProductStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CopyProductToken",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"CopyProductToken",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"CopyProductToken",params,undefined,false); 
			

			svc.describeCopyProductStatus(params,cb);
		}
			service.DescribePortfolio=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.describePortfolio(params,cb);
		}
			service.DescribePortfolioShareStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PortfolioShareToken",params,undefined,false); 
			
			copyArgs(n,"PortfolioShareToken",params,undefined,false); 
			
			copyArgs(msg,"PortfolioShareToken",params,undefined,false); 
			

			svc.describePortfolioShareStatus(params,cb);
		}
			service.DescribePortfolioShares=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PortfolioId",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(n,"PortfolioId",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			
			copyArgs(msg,"PortfolioId",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			

			svc.describePortfolioShares(params,cb);
		}
			service.DescribeProduct=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.describeProduct(params,cb);
		}
			service.DescribeProductAsAdmin=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"SourcePortfolioId",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"SourcePortfolioId",params,undefined,false); 
			

			svc.describeProductAsAdmin(params,cb);
		}
			service.DescribeProductView=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.describeProductView(params,cb);
		}
			service.DescribeProvisionedProduct=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.describeProvisionedProduct(params,cb);
		}
			service.DescribeProvisionedProductPlan=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PlanId",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"PlanId",params,undefined,false); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"PlanId",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			

			svc.describeProvisionedProductPlan(params,cb);
		}
			service.DescribeProvisioningArtifact=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"ProvisioningArtifactId",params,undefined,false); 
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(n,"ProvisioningArtifactName",params,undefined,false); 
			copyArgs(n,"ProductName",params,undefined,false); 
			copyArgs(Boolean(n),"Verbose",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"ProvisioningArtifactId",params,undefined,false); 
			copyArgs(msg,"ProductId",params,undefined,false); 
			copyArgs(msg,"ProvisioningArtifactName",params,undefined,false); 
			copyArgs(msg,"ProductName",params,undefined,false); 
			copyArgs(msg,"Verbose",params,undefined,false); 
			

			svc.describeProvisioningArtifact(params,cb);
		}
			service.DescribeProvisioningParameters=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(n,"ProductName",params,undefined,false); 
			copyArgs(n,"ProvisioningArtifactId",params,undefined,false); 
			copyArgs(n,"ProvisioningArtifactName",params,undefined,false); 
			copyArgs(n,"PathId",params,undefined,false); 
			copyArgs(n,"PathName",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"ProductId",params,undefined,false); 
			copyArgs(msg,"ProductName",params,undefined,false); 
			copyArgs(msg,"ProvisioningArtifactId",params,undefined,false); 
			copyArgs(msg,"ProvisioningArtifactName",params,undefined,false); 
			copyArgs(msg,"PathId",params,undefined,false); 
			copyArgs(msg,"PathName",params,undefined,false); 
			

			svc.describeProvisioningParameters(params,cb);
		}
			service.DescribeRecord=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			

			svc.describeRecord(params,cb);
		}
			service.DescribeServiceAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			

			svc.describeServiceAction(params,cb);
		}
			service.DescribeServiceActionExecutionParameters=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProvisionedProductId",params,undefined,false); 
			copyArgs(n,"ServiceActionId",params,undefined,false); 
			
			copyArgs(n,"ProvisionedProductId",params,undefined,false); 
			copyArgs(n,"ServiceActionId",params,undefined,false); 
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			
			copyArgs(msg,"ProvisionedProductId",params,undefined,false); 
			copyArgs(msg,"ServiceActionId",params,undefined,false); 
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			

			svc.describeServiceActionExecutionParameters(params,cb);
		}
			service.DescribeTagOption=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.describeTagOption(params,cb);
		}
			service.DisableAWSOrganizationsAccess=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.disableAWSOrganizationsAccess(params,cb);
		}
			service.DisassociateBudgetFromResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"BudgetName",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(msg,"BudgetName",params,undefined,false); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			

			svc.disassociateBudgetFromResource(params,cb);
		}
			service.DisassociatePrincipalFromPortfolio=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PortfolioId",params,undefined,false); 
			copyArgs(n,"PrincipalARN",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"PortfolioId",params,undefined,false); 
			copyArgs(n,"PrincipalARN",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"PortfolioId",params,undefined,false); 
			copyArgs(msg,"PrincipalARN",params,undefined,false); 
			

			svc.disassociatePrincipalFromPortfolio(params,cb);
		}
			service.DisassociateProductFromPortfolio=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(n,"PortfolioId",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(n,"PortfolioId",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"ProductId",params,undefined,false); 
			copyArgs(msg,"PortfolioId",params,undefined,false); 
			

			svc.disassociateProductFromPortfolio(params,cb);
		}
			service.DisassociateServiceActionFromProvisioningArtifact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(n,"ProvisioningArtifactId",params,undefined,false); 
			copyArgs(n,"ServiceActionId",params,undefined,false); 
			
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(n,"ProvisioningArtifactId",params,undefined,false); 
			copyArgs(n,"ServiceActionId",params,undefined,false); 
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			
			copyArgs(msg,"ProductId",params,undefined,false); 
			copyArgs(msg,"ProvisioningArtifactId",params,undefined,false); 
			copyArgs(msg,"ServiceActionId",params,undefined,false); 
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			

			svc.disassociateServiceActionFromProvisioningArtifact(params,cb);
		}
			service.DisassociateTagOptionFromResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"TagOptionId",params,undefined,false); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"TagOptionId",params,undefined,false); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"TagOptionId",params,undefined,false); 
			

			svc.disassociateTagOptionFromResource(params,cb);
		}
			service.EnableAWSOrganizationsAccess=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.enableAWSOrganizationsAccess(params,cb);
		}
			service.ExecuteProvisionedProductPlan=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PlanId",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"PlanId",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"PlanId",params,undefined,false); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.executeProvisionedProductPlan(params,cb);
		}
			service.ExecuteProvisionedProductServiceAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProvisionedProductId",params,undefined,false); 
			copyArgs(n,"ServiceActionId",params,undefined,false); 
			copyArgs(n,"ExecuteToken",params,undefined,false); 
			
			copyArgs(n,"ProvisionedProductId",params,undefined,false); 
			copyArgs(n,"ServiceActionId",params,undefined,false); 
			copyArgs(n,"ExecuteToken",params,undefined,false); 
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,false); 
			
			copyArgs(msg,"ProvisionedProductId",params,undefined,false); 
			copyArgs(msg,"ServiceActionId",params,undefined,false); 
			copyArgs(msg,"ExecuteToken",params,undefined,false); 
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,false); 
			

			svc.executeProvisionedProductServiceAction(params,cb);
		}
			service.GetAWSOrganizationsAccessStatus=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getAWSOrganizationsAccessStatus(params,cb);
		}
			service.GetProvisionedProductOutputs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"ProvisionedProductId",params,undefined,false); 
			copyArgs(n,"ProvisionedProductName",params,undefined,false); 
			copyArgs(n,"OutputKeys",params,undefined,false); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"ProvisionedProductId",params,undefined,false); 
			copyArgs(msg,"ProvisionedProductName",params,undefined,false); 
			copyArgs(msg,"OutputKeys",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			

			svc.getProvisionedProductOutputs(params,cb);
		}
			service.ImportAsProvisionedProduct=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(n,"ProvisioningArtifactId",params,undefined,false); 
			copyArgs(n,"ProvisionedProductName",params,undefined,false); 
			copyArgs(n,"PhysicalId",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(n,"ProvisioningArtifactId",params,undefined,false); 
			copyArgs(n,"ProvisionedProductName",params,undefined,false); 
			copyArgs(n,"PhysicalId",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"ProductId",params,undefined,false); 
			copyArgs(msg,"ProvisioningArtifactId",params,undefined,false); 
			copyArgs(msg,"ProvisionedProductName",params,undefined,false); 
			copyArgs(msg,"PhysicalId",params,undefined,false); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.importAsProvisionedProduct(params,cb);
		}
			service.ListAcceptedPortfolioShares=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			copyArgs(n,"PortfolioShareType",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"PortfolioShareType",params,undefined,false); 
			

			svc.listAcceptedPortfolioShares(params,cb);
		}
			service.ListBudgetsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			

			svc.listBudgetsForResource(params,cb);
		}
			service.ListConstraintsForPortfolio=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PortfolioId",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"PortfolioId",params,undefined,false); 
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"PortfolioId",params,undefined,false); 
			copyArgs(msg,"ProductId",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			

			svc.listConstraintsForPortfolio(params,cb);
		}
			service.ListLaunchPaths=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProductId",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"ProductId",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			

			svc.listLaunchPaths(params,cb);
		}
			service.ListOrganizationPortfolioAccess=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PortfolioId",params,undefined,false); 
			copyArgs(n,"OrganizationNodeType",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"PortfolioId",params,undefined,false); 
			copyArgs(n,"OrganizationNodeType",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"PortfolioId",params,undefined,false); 
			copyArgs(msg,"OrganizationNodeType",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			

			svc.listOrganizationPortfolioAccess(params,cb);
		}
			service.ListPortfolioAccess=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PortfolioId",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"PortfolioId",params,undefined,false); 
			copyArgs(n,"OrganizationParentId",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"PortfolioId",params,undefined,false); 
			copyArgs(msg,"OrganizationParentId",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			

			svc.listPortfolioAccess(params,cb);
		}
			service.ListPortfolios=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			

			svc.listPortfolios(params,cb);
		}
			service.ListPortfoliosForProduct=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProductId",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"ProductId",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			

			svc.listPortfoliosForProduct(params,cb);
		}
			service.ListPrincipalsForPortfolio=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PortfolioId",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"PortfolioId",params,undefined,false); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"PortfolioId",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			

			svc.listPrincipalsForPortfolio(params,cb);
		}
			service.ListProvisionedProductPlans=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"ProvisionProductId",params,undefined,false); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			copyArgs(n,"AccessLevelFilter",params,undefined,true); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"ProvisionProductId",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			copyArgs(msg,"AccessLevelFilter",params,undefined,true); 
			

			svc.listProvisionedProductPlans(params,cb);
		}
			service.ListProvisioningArtifacts=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProductId",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"ProductId",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"ProductId",params,undefined,false); 
			

			svc.listProvisioningArtifacts(params,cb);
		}
			service.ListProvisioningArtifactsForServiceAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServiceActionId",params,undefined,false); 
			
			copyArgs(n,"ServiceActionId",params,undefined,false); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			
			copyArgs(msg,"ServiceActionId",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			

			svc.listProvisioningArtifactsForServiceAction(params,cb);
		}
			service.ListRecordHistory=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"AccessLevelFilter",params,undefined,true); 
			copyArgs(n,"SearchFilter",params,undefined,false); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"AccessLevelFilter",params,undefined,true); 
			copyArgs(msg,"SearchFilter",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			

			svc.listRecordHistory(params,cb);
		}
			service.ListResourcesForTagOption=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TagOptionId",params,undefined,false); 
			
			copyArgs(n,"TagOptionId",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			
			copyArgs(msg,"TagOptionId",params,undefined,false); 
			copyArgs(msg,"ResourceType",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			

			svc.listResourcesForTagOption(params,cb);
		}
			service.ListServiceActions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			

			svc.listServiceActions(params,cb);
		}
			service.ListServiceActionsForProvisioningArtifact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(n,"ProvisioningArtifactId",params,undefined,false); 
			
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(n,"ProvisioningArtifactId",params,undefined,false); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			
			copyArgs(msg,"ProductId",params,undefined,false); 
			copyArgs(msg,"ProvisioningArtifactId",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			

			svc.listServiceActionsForProvisioningArtifact(params,cb);
		}
			service.ListStackInstancesForProvisionedProduct=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProvisionedProductId",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"ProvisionedProductId",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"ProvisionedProductId",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			

			svc.listStackInstancesForProvisionedProduct(params,cb);
		}
			service.ListTagOptions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			

			svc.listTagOptions(params,cb);
		}
			service.ProvisionProduct=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProvisionedProductName",params,undefined,false); 
			copyArgs(n,"ProvisionToken",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(n,"ProductName",params,undefined,false); 
			copyArgs(n,"ProvisioningArtifactId",params,undefined,false); 
			copyArgs(n,"ProvisioningArtifactName",params,undefined,false); 
			copyArgs(n,"PathId",params,undefined,false); 
			copyArgs(n,"PathName",params,undefined,false); 
			copyArgs(n,"ProvisionedProductName",params,undefined,false); 
			copyArgs(n,"ProvisioningParameters",params,undefined,false); 
			copyArgs(n,"ProvisioningPreferences",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"NotificationArns",params,undefined,true); 
			copyArgs(n,"ProvisionToken",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"ProductId",params,undefined,false); 
			copyArgs(msg,"ProductName",params,undefined,false); 
			copyArgs(msg,"ProvisioningArtifactId",params,undefined,false); 
			copyArgs(msg,"ProvisioningArtifactName",params,undefined,false); 
			copyArgs(msg,"PathId",params,undefined,false); 
			copyArgs(msg,"PathName",params,undefined,false); 
			copyArgs(msg,"ProvisionedProductName",params,undefined,false); 
			copyArgs(msg,"ProvisioningParameters",params,undefined,false); 
			copyArgs(msg,"ProvisioningPreferences",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"NotificationArns",params,undefined,true); 
			copyArgs(msg,"ProvisionToken",params,undefined,false); 
			

			svc.provisionProduct(params,cb);
		}
			service.RejectPortfolioShare=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PortfolioId",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"PortfolioId",params,undefined,false); 
			copyArgs(n,"PortfolioShareType",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"PortfolioId",params,undefined,false); 
			copyArgs(msg,"PortfolioShareType",params,undefined,false); 
			

			svc.rejectPortfolioShare(params,cb);
		}
			service.ScanProvisionedProducts=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"AccessLevelFilter",params,undefined,true); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"AccessLevelFilter",params,undefined,true); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			

			svc.scanProvisionedProducts(params,cb);
		}
			service.SearchProducts=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			

			svc.searchProducts(params,cb);
		}
			service.SearchProductsAsAdmin=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"PortfolioId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			copyArgs(n,"ProductSource",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"PortfolioId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"ProductSource",params,undefined,false); 
			

			svc.searchProductsAsAdmin(params,cb);
		}
			service.SearchProvisionedProducts=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"AccessLevelFilter",params,undefined,true); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(Number(n),"PageSize",params,undefined,false); 
			copyArgs(n,"PageToken",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"AccessLevelFilter",params,undefined,true); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"PageToken",params,undefined,false); 
			

			svc.searchProvisionedProducts(params,cb);
		}
			service.TerminateProvisionedProduct=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TerminateToken",params,undefined,false); 
			
			copyArgs(n,"ProvisionedProductName",params,undefined,false); 
			copyArgs(n,"ProvisionedProductId",params,undefined,false); 
			copyArgs(n,"TerminateToken",params,undefined,false); 
			copyArgs(Boolean(n),"IgnoreErrors",params,undefined,false); 
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(Boolean(n),"RetainPhysicalResources",params,undefined,false); 
			
			copyArgs(msg,"ProvisionedProductName",params,undefined,false); 
			copyArgs(msg,"ProvisionedProductId",params,undefined,false); 
			copyArgs(msg,"TerminateToken",params,undefined,false); 
			copyArgs(msg,"IgnoreErrors",params,undefined,false); 
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"RetainPhysicalResources",params,undefined,false); 
			

			svc.terminateProvisionedProduct(params,cb);
		}
			service.UpdateConstraint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,false); 
			

			svc.updateConstraint(params,cb);
		}
			service.UpdatePortfolio=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"DisplayName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"ProviderName",params,undefined,false); 
			copyArgs(n,"AddTags",params,undefined,true); 
			copyArgs(n,"RemoveTags",params,undefined,true); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"DisplayName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"ProviderName",params,undefined,false); 
			copyArgs(msg,"AddTags",params,undefined,true); 
			copyArgs(msg,"RemoveTags",params,undefined,true); 
			

			svc.updatePortfolio(params,cb);
		}
			service.UpdatePortfolioShare=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PortfolioId",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"PortfolioId",params,undefined,false); 
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"OrganizationNode",params,undefined,true); 
			copyArgs(Boolean(n),"ShareTagOptions",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"PortfolioId",params,undefined,false); 
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"OrganizationNode",params,undefined,true); 
			copyArgs(msg,"ShareTagOptions",params,undefined,false); 
			

			svc.updatePortfolioShare(params,cb);
		}
			service.UpdateProduct=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Owner",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Distributor",params,undefined,false); 
			copyArgs(n,"SupportDescription",params,undefined,false); 
			copyArgs(n,"SupportEmail",params,undefined,false); 
			copyArgs(n,"SupportUrl",params,undefined,false); 
			copyArgs(n,"AddTags",params,undefined,true); 
			copyArgs(n,"RemoveTags",params,undefined,true); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Owner",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Distributor",params,undefined,false); 
			copyArgs(msg,"SupportDescription",params,undefined,false); 
			copyArgs(msg,"SupportEmail",params,undefined,false); 
			copyArgs(msg,"SupportUrl",params,undefined,false); 
			copyArgs(msg,"AddTags",params,undefined,true); 
			copyArgs(msg,"RemoveTags",params,undefined,true); 
			

			svc.updateProduct(params,cb);
		}
			service.UpdateProvisionedProduct=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UpdateToken",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"ProvisionedProductName",params,undefined,false); 
			copyArgs(n,"ProvisionedProductId",params,undefined,false); 
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(n,"ProductName",params,undefined,false); 
			copyArgs(n,"ProvisioningArtifactId",params,undefined,false); 
			copyArgs(n,"ProvisioningArtifactName",params,undefined,false); 
			copyArgs(n,"PathId",params,undefined,false); 
			copyArgs(n,"PathName",params,undefined,false); 
			copyArgs(n,"ProvisioningParameters",params,undefined,true); 
			copyArgs(n,"ProvisioningPreferences",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"UpdateToken",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"ProvisionedProductName",params,undefined,false); 
			copyArgs(msg,"ProvisionedProductId",params,undefined,false); 
			copyArgs(msg,"ProductId",params,undefined,false); 
			copyArgs(msg,"ProductName",params,undefined,false); 
			copyArgs(msg,"ProvisioningArtifactId",params,undefined,false); 
			copyArgs(msg,"ProvisioningArtifactName",params,undefined,false); 
			copyArgs(msg,"PathId",params,undefined,false); 
			copyArgs(msg,"PathName",params,undefined,false); 
			copyArgs(msg,"ProvisioningParameters",params,undefined,true); 
			copyArgs(msg,"ProvisioningPreferences",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"UpdateToken",params,undefined,false); 
			

			svc.updateProvisionedProduct(params,cb);
		}
			service.UpdateProvisionedProductProperties=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProvisionedProductId",params,undefined,false); 
			copyArgs(n,"ProvisionedProductProperties",params,undefined,true); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"ProvisionedProductId",params,undefined,false); 
			copyArgs(n,"ProvisionedProductProperties",params,undefined,true); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"ProvisionedProductId",params,undefined,false); 
			copyArgs(msg,"ProvisionedProductProperties",params,undefined,true); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			

			svc.updateProvisionedProductProperties(params,cb);
		}
			service.UpdateProvisioningArtifact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(n,"ProvisioningArtifactId",params,undefined,false); 
			
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			copyArgs(n,"ProductId",params,undefined,false); 
			copyArgs(n,"ProvisioningArtifactId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(Boolean(n),"Active",params,undefined,false); 
			copyArgs(n,"Guidance",params,undefined,false); 
			
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			copyArgs(msg,"ProductId",params,undefined,false); 
			copyArgs(msg,"ProvisioningArtifactId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Active",params,undefined,false); 
			copyArgs(msg,"Guidance",params,undefined,false); 
			

			svc.updateProvisioningArtifact(params,cb);
		}
			service.UpdateServiceAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Definition",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"AcceptLanguage",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Definition",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"AcceptLanguage",params,undefined,false); 
			

			svc.updateServiceAction(params,cb);
		}
			service.UpdateTagOption=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Value",params,undefined,false); 
			copyArgs(Boolean(n),"Active",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"Value",params,undefined,false); 
			copyArgs(msg,"Active",params,undefined,false); 
			

			svc.updateTagOption(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS ServiceCatalog", AmazonAPINode);

};
