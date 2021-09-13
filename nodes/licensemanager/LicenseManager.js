
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

		var awsService = new AWS.LicenseManager( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.LicenseManager(msg.AWSConfig) : awsService;

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
		
			service.AcceptGrant=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GrantArn",params,undefined,false); 
			
			copyArgs(n,"GrantArn",params,undefined,false); 
			
			copyArgs(msg,"GrantArn",params,undefined,false); 
			

			svc.acceptGrant(params,cb);
		}
			service.CheckInLicense=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LicenseConsumptionToken",params,undefined,false); 
			
			copyArgs(n,"LicenseConsumptionToken",params,undefined,false); 
			copyArgs(n,"Beneficiary",params,undefined,false); 
			
			copyArgs(msg,"LicenseConsumptionToken",params,undefined,false); 
			copyArgs(msg,"Beneficiary",params,undefined,false); 
			

			svc.checkInLicense(params,cb);
		}
			service.CheckoutBorrowLicense=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LicenseArn",params,undefined,false); 
			copyArgs(n,"Entitlements",params,undefined,true); 
			copyArgs(n,"DigitalSignatureMethod",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(n,"LicenseArn",params,undefined,false); 
			copyArgs(n,"Entitlements",params,undefined,true); 
			copyArgs(n,"DigitalSignatureMethod",params,undefined,false); 
			copyArgs(n,"NodeId",params,undefined,false); 
			copyArgs(n,"CheckoutMetadata",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"LicenseArn",params,undefined,false); 
			copyArgs(msg,"Entitlements",params,undefined,true); 
			copyArgs(msg,"DigitalSignatureMethod",params,undefined,false); 
			copyArgs(msg,"NodeId",params,undefined,false); 
			copyArgs(msg,"CheckoutMetadata",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.checkoutBorrowLicense(params,cb);
		}
			service.CheckoutLicense=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProductSKU",params,undefined,false); 
			copyArgs(n,"CheckoutType",params,undefined,false); 
			copyArgs(n,"KeyFingerprint",params,undefined,false); 
			copyArgs(n,"Entitlements",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(n,"ProductSKU",params,undefined,false); 
			copyArgs(n,"CheckoutType",params,undefined,false); 
			copyArgs(n,"KeyFingerprint",params,undefined,false); 
			copyArgs(n,"Entitlements",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Beneficiary",params,undefined,false); 
			copyArgs(n,"NodeId",params,undefined,false); 
			
			copyArgs(msg,"ProductSKU",params,undefined,false); 
			copyArgs(msg,"CheckoutType",params,undefined,false); 
			copyArgs(msg,"KeyFingerprint",params,undefined,false); 
			copyArgs(msg,"Entitlements",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"Beneficiary",params,undefined,false); 
			copyArgs(msg,"NodeId",params,undefined,false); 
			

			svc.checkoutLicense(params,cb);
		}
			service.CreateGrant=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"GrantName",params,undefined,false); 
			copyArgs(n,"LicenseArn",params,undefined,false); 
			copyArgs(n,"Principals",params,undefined,false); 
			copyArgs(n,"HomeRegion",params,undefined,false); 
			copyArgs(n,"AllowedOperations",params,undefined,true); 
			
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"GrantName",params,undefined,false); 
			copyArgs(n,"LicenseArn",params,undefined,false); 
			copyArgs(n,"Principals",params,undefined,false); 
			copyArgs(n,"HomeRegion",params,undefined,false); 
			copyArgs(n,"AllowedOperations",params,undefined,true); 
			
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"GrantName",params,undefined,false); 
			copyArgs(msg,"LicenseArn",params,undefined,false); 
			copyArgs(msg,"Principals",params,undefined,false); 
			copyArgs(msg,"HomeRegion",params,undefined,false); 
			copyArgs(msg,"AllowedOperations",params,undefined,true); 
			

			svc.createGrant(params,cb);
		}
			service.CreateGrantVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"GrantArn",params,undefined,false); 
			
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"GrantArn",params,undefined,false); 
			copyArgs(n,"GrantName",params,undefined,false); 
			copyArgs(n,"AllowedOperations",params,undefined,true); 
			copyArgs(n,"Status",params,undefined,false); 
			copyArgs(n,"StatusReason",params,undefined,false); 
			copyArgs(n,"SourceVersion",params,undefined,false); 
			
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"GrantArn",params,undefined,false); 
			copyArgs(msg,"GrantName",params,undefined,false); 
			copyArgs(msg,"AllowedOperations",params,undefined,true); 
			copyArgs(msg,"Status",params,undefined,false); 
			copyArgs(msg,"StatusReason",params,undefined,false); 
			copyArgs(msg,"SourceVersion",params,undefined,false); 
			

			svc.createGrantVersion(params,cb);
		}
			service.CreateLicense=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LicenseName",params,undefined,false); 
			copyArgs(n,"ProductName",params,undefined,false); 
			copyArgs(n,"ProductSKU",params,undefined,false); 
			copyArgs(n,"Issuer",params,undefined,true); 
			copyArgs(n,"HomeRegion",params,undefined,false); 
			copyArgs(n,"Validity",params,undefined,true); 
			copyArgs(n,"Entitlements",params,undefined,true); 
			copyArgs(n,"Beneficiary",params,undefined,false); 
			copyArgs(n,"ConsumptionConfiguration",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(n,"LicenseName",params,undefined,false); 
			copyArgs(n,"ProductName",params,undefined,false); 
			copyArgs(n,"ProductSKU",params,undefined,false); 
			copyArgs(n,"Issuer",params,undefined,true); 
			copyArgs(n,"HomeRegion",params,undefined,false); 
			copyArgs(n,"Validity",params,undefined,true); 
			copyArgs(n,"Entitlements",params,undefined,true); 
			copyArgs(n,"Beneficiary",params,undefined,false); 
			copyArgs(n,"ConsumptionConfiguration",params,undefined,true); 
			copyArgs(n,"LicenseMetadata",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"LicenseName",params,undefined,false); 
			copyArgs(msg,"ProductName",params,undefined,false); 
			copyArgs(msg,"ProductSKU",params,undefined,false); 
			copyArgs(msg,"Issuer",params,undefined,true); 
			copyArgs(msg,"HomeRegion",params,undefined,false); 
			copyArgs(msg,"Validity",params,undefined,true); 
			copyArgs(msg,"Entitlements",params,undefined,true); 
			copyArgs(msg,"Beneficiary",params,undefined,false); 
			copyArgs(msg,"ConsumptionConfiguration",params,undefined,true); 
			copyArgs(msg,"LicenseMetadata",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.createLicense(params,cb);
		}
			service.CreateLicenseConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"LicenseCountingType",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"LicenseCountingType",params,undefined,false); 
			copyArgs(n,"LicenseCount",params,undefined,false); 
			copyArgs(Boolean(n),"LicenseCountHardLimit",params,undefined,false); 
			copyArgs(n,"LicenseRules",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(Boolean(n),"DisassociateWhenNotFound",params,undefined,false); 
			copyArgs(n,"ProductInformationList",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"LicenseCountingType",params,undefined,false); 
			copyArgs(msg,"LicenseCount",params,undefined,false); 
			copyArgs(msg,"LicenseCountHardLimit",params,undefined,false); 
			copyArgs(msg,"LicenseRules",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"DisassociateWhenNotFound",params,undefined,false); 
			copyArgs(msg,"ProductInformationList",params,undefined,true); 
			

			svc.createLicenseConfiguration(params,cb);
		}
			service.CreateLicenseManagerReportGenerator=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReportGeneratorName",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,true); 
			copyArgs(n,"ReportContext",params,undefined,true); 
			copyArgs(n,"ReportFrequency",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(n,"ReportGeneratorName",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,true); 
			copyArgs(n,"ReportContext",params,undefined,true); 
			copyArgs(n,"ReportFrequency",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ReportGeneratorName",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,true); 
			copyArgs(msg,"ReportContext",params,undefined,true); 
			copyArgs(msg,"ReportFrequency",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createLicenseManagerReportGenerator(params,cb);
		}
			service.CreateLicenseVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LicenseArn",params,undefined,false); 
			copyArgs(n,"LicenseName",params,undefined,false); 
			copyArgs(n,"ProductName",params,undefined,false); 
			copyArgs(n,"Issuer",params,undefined,true); 
			copyArgs(n,"HomeRegion",params,undefined,false); 
			copyArgs(n,"Validity",params,undefined,true); 
			copyArgs(n,"Entitlements",params,undefined,true); 
			copyArgs(n,"ConsumptionConfiguration",params,undefined,true); 
			copyArgs(n,"Status",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(n,"LicenseArn",params,undefined,false); 
			copyArgs(n,"LicenseName",params,undefined,false); 
			copyArgs(n,"ProductName",params,undefined,false); 
			copyArgs(n,"Issuer",params,undefined,true); 
			copyArgs(n,"HomeRegion",params,undefined,false); 
			copyArgs(n,"Validity",params,undefined,true); 
			copyArgs(n,"LicenseMetadata",params,undefined,true); 
			copyArgs(n,"Entitlements",params,undefined,true); 
			copyArgs(n,"ConsumptionConfiguration",params,undefined,true); 
			copyArgs(n,"Status",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"SourceVersion",params,undefined,false); 
			
			copyArgs(msg,"LicenseArn",params,undefined,false); 
			copyArgs(msg,"LicenseName",params,undefined,false); 
			copyArgs(msg,"ProductName",params,undefined,false); 
			copyArgs(msg,"Issuer",params,undefined,true); 
			copyArgs(msg,"HomeRegion",params,undefined,false); 
			copyArgs(msg,"Validity",params,undefined,true); 
			copyArgs(msg,"LicenseMetadata",params,undefined,true); 
			copyArgs(msg,"Entitlements",params,undefined,true); 
			copyArgs(msg,"ConsumptionConfiguration",params,undefined,true); 
			copyArgs(msg,"Status",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"SourceVersion",params,undefined,false); 
			

			svc.createLicenseVersion(params,cb);
		}
			service.CreateToken=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LicenseArn",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(n,"LicenseArn",params,undefined,false); 
			copyArgs(n,"RoleArns",params,undefined,true); 
			copyArgs(Number(n),"ExpirationInDays",params,undefined,false); 
			copyArgs(n,"TokenProperties",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"LicenseArn",params,undefined,false); 
			copyArgs(msg,"RoleArns",params,undefined,true); 
			copyArgs(msg,"ExpirationInDays",params,undefined,false); 
			copyArgs(msg,"TokenProperties",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.createToken(params,cb);
		}
			service.DeleteGrant=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GrantArn",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			
			copyArgs(n,"GrantArn",params,undefined,false); 
			copyArgs(n,"StatusReason",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			
			copyArgs(msg,"GrantArn",params,undefined,false); 
			copyArgs(msg,"StatusReason",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			

			svc.deleteGrant(params,cb);
		}
			service.DeleteLicense=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LicenseArn",params,undefined,false); 
			copyArgs(n,"SourceVersion",params,undefined,false); 
			
			copyArgs(n,"LicenseArn",params,undefined,false); 
			copyArgs(n,"SourceVersion",params,undefined,false); 
			
			copyArgs(msg,"LicenseArn",params,undefined,false); 
			copyArgs(msg,"SourceVersion",params,undefined,false); 
			

			svc.deleteLicense(params,cb);
		}
			service.DeleteLicenseConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LicenseConfigurationArn",params,undefined,false); 
			
			copyArgs(n,"LicenseConfigurationArn",params,undefined,false); 
			
			copyArgs(msg,"LicenseConfigurationArn",params,undefined,false); 
			

			svc.deleteLicenseConfiguration(params,cb);
		}
			service.DeleteLicenseManagerReportGenerator=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LicenseManagerReportGeneratorArn",params,undefined,false); 
			
			copyArgs(n,"LicenseManagerReportGeneratorArn",params,undefined,false); 
			
			copyArgs(msg,"LicenseManagerReportGeneratorArn",params,undefined,false); 
			

			svc.deleteLicenseManagerReportGenerator(params,cb);
		}
			service.DeleteToken=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TokenId",params,undefined,false); 
			
			copyArgs(n,"TokenId",params,undefined,false); 
			
			copyArgs(msg,"TokenId",params,undefined,false); 
			

			svc.deleteToken(params,cb);
		}
			service.ExtendLicenseConsumption=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LicenseConsumptionToken",params,undefined,false); 
			
			copyArgs(n,"LicenseConsumptionToken",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"LicenseConsumptionToken",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.extendLicenseConsumption(params,cb);
		}
			service.GetAccessToken=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Token",params,undefined,false); 
			
			copyArgs(n,"Token",params,undefined,false); 
			copyArgs(n,"TokenProperties",params,undefined,true); 
			
			copyArgs(msg,"Token",params,undefined,false); 
			copyArgs(msg,"TokenProperties",params,undefined,true); 
			

			svc.getAccessToken(params,cb);
		}
			service.GetGrant=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GrantArn",params,undefined,false); 
			
			copyArgs(n,"GrantArn",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			
			copyArgs(msg,"GrantArn",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			

			svc.getGrant(params,cb);
		}
			service.GetLicense=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LicenseArn",params,undefined,false); 
			
			copyArgs(n,"LicenseArn",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			
			copyArgs(msg,"LicenseArn",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			

			svc.getLicense(params,cb);
		}
			service.GetLicenseConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LicenseConfigurationArn",params,undefined,false); 
			
			copyArgs(n,"LicenseConfigurationArn",params,undefined,false); 
			
			copyArgs(msg,"LicenseConfigurationArn",params,undefined,false); 
			

			svc.getLicenseConfiguration(params,cb);
		}
			service.GetLicenseManagerReportGenerator=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LicenseManagerReportGeneratorArn",params,undefined,false); 
			
			copyArgs(n,"LicenseManagerReportGeneratorArn",params,undefined,false); 
			
			copyArgs(msg,"LicenseManagerReportGeneratorArn",params,undefined,false); 
			

			svc.getLicenseManagerReportGenerator(params,cb);
		}
			service.GetLicenseUsage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LicenseArn",params,undefined,false); 
			
			copyArgs(n,"LicenseArn",params,undefined,false); 
			
			copyArgs(msg,"LicenseArn",params,undefined,false); 
			

			svc.getLicenseUsage(params,cb);
		}
			service.GetServiceSettings=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getServiceSettings(params,cb);
		}
			service.ListAssociationsForLicenseConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LicenseConfigurationArn",params,undefined,false); 
			
			copyArgs(n,"LicenseConfigurationArn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"LicenseConfigurationArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listAssociationsForLicenseConfiguration(params,cb);
		}
			service.ListDistributedGrants=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"GrantArns",params,undefined,true); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"GrantArns",params,undefined,true); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listDistributedGrants(params,cb);
		}
			service.ListFailuresForLicenseConfigurationOperations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LicenseConfigurationArn",params,undefined,false); 
			
			copyArgs(n,"LicenseConfigurationArn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"LicenseConfigurationArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listFailuresForLicenseConfigurationOperations(params,cb);
		}
			service.ListLicenseConfigurations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"LicenseConfigurationArns",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			
			copyArgs(msg,"LicenseConfigurationArns",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			

			svc.listLicenseConfigurations(params,cb);
		}
			service.ListLicenseManagerReportGenerators=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listLicenseManagerReportGenerators(params,cb);
		}
			service.ListLicenseSpecificationsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listLicenseSpecificationsForResource(params,cb);
		}
			service.ListLicenseVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LicenseArn",params,undefined,false); 
			
			copyArgs(n,"LicenseArn",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"LicenseArn",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listLicenseVersions(params,cb);
		}
			service.ListLicenses=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"LicenseArns",params,undefined,true); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"LicenseArns",params,undefined,true); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listLicenses(params,cb);
		}
			service.ListReceivedGrants=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"GrantArns",params,undefined,true); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"GrantArns",params,undefined,true); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listReceivedGrants(params,cb);
		}
			service.ListReceivedLicenses=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"LicenseArns",params,undefined,true); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"LicenseArns",params,undefined,true); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listReceivedLicenses(params,cb);
		}
			service.ListResourceInventory=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			

			svc.listResourceInventory(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.ListTokens=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TokenIds",params,undefined,true); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"TokenIds",params,undefined,true); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listTokens(params,cb);
		}
			service.ListUsageForLicenseConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LicenseConfigurationArn",params,undefined,false); 
			
			copyArgs(n,"LicenseConfigurationArn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			
			copyArgs(msg,"LicenseConfigurationArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			

			svc.listUsageForLicenseConfiguration(params,cb);
		}
			service.RejectGrant=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GrantArn",params,undefined,false); 
			
			copyArgs(n,"GrantArn",params,undefined,false); 
			
			copyArgs(msg,"GrantArn",params,undefined,false); 
			

			svc.rejectGrant(params,cb);
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
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
			service.UpdateLicenseConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LicenseConfigurationArn",params,undefined,false); 
			
			copyArgs(n,"LicenseConfigurationArn",params,undefined,false); 
			copyArgs(n,"LicenseConfigurationStatus",params,undefined,false); 
			copyArgs(n,"LicenseRules",params,undefined,true); 
			copyArgs(n,"LicenseCount",params,undefined,false); 
			copyArgs(Boolean(n),"LicenseCountHardLimit",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"ProductInformationList",params,undefined,true); 
			copyArgs(Boolean(n),"DisassociateWhenNotFound",params,undefined,false); 
			
			copyArgs(msg,"LicenseConfigurationArn",params,undefined,false); 
			copyArgs(msg,"LicenseConfigurationStatus",params,undefined,false); 
			copyArgs(msg,"LicenseRules",params,undefined,true); 
			copyArgs(msg,"LicenseCount",params,undefined,false); 
			copyArgs(msg,"LicenseCountHardLimit",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"ProductInformationList",params,undefined,true); 
			copyArgs(msg,"DisassociateWhenNotFound",params,undefined,false); 
			

			svc.updateLicenseConfiguration(params,cb);
		}
			service.UpdateLicenseManagerReportGenerator=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LicenseManagerReportGeneratorArn",params,undefined,false); 
			copyArgs(n,"ReportGeneratorName",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,true); 
			copyArgs(n,"ReportContext",params,undefined,true); 
			copyArgs(n,"ReportFrequency",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(n,"LicenseManagerReportGeneratorArn",params,undefined,false); 
			copyArgs(n,"ReportGeneratorName",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,true); 
			copyArgs(n,"ReportContext",params,undefined,true); 
			copyArgs(n,"ReportFrequency",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(msg,"LicenseManagerReportGeneratorArn",params,undefined,false); 
			copyArgs(msg,"ReportGeneratorName",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,true); 
			copyArgs(msg,"ReportContext",params,undefined,true); 
			copyArgs(msg,"ReportFrequency",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			

			svc.updateLicenseManagerReportGenerator(params,cb);
		}
			service.UpdateLicenseSpecificationsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"AddLicenseSpecifications",params,undefined,true); 
			copyArgs(n,"RemoveLicenseSpecifications",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"AddLicenseSpecifications",params,undefined,true); 
			copyArgs(msg,"RemoveLicenseSpecifications",params,undefined,true); 
			

			svc.updateLicenseSpecificationsForResource(params,cb);
		}
			service.UpdateServiceSettings=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"S3BucketArn",params,undefined,false); 
			copyArgs(n,"SnsTopicArn",params,undefined,false); 
			copyArgs(n,"OrganizationConfiguration",params,undefined,true); 
			copyArgs(Boolean(n),"EnableCrossAccountsDiscovery",params,undefined,false); 
			
			copyArgs(msg,"S3BucketArn",params,undefined,false); 
			copyArgs(msg,"SnsTopicArn",params,undefined,false); 
			copyArgs(msg,"OrganizationConfiguration",params,undefined,true); 
			copyArgs(msg,"EnableCrossAccountsDiscovery",params,undefined,false); 
			

			svc.updateServiceSettings(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS LicenseManager", AmazonAPINode);

};
