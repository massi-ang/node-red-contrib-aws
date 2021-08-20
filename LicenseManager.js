
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

		var awsService = new AWS.LicenseManager( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.LicenseManager(msg.AWSConfig) : awsService;

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

		
		service.AcceptGrant=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GrantArn",params,undefined,false); 
			
			copyArg(msg,"GrantArn",params,undefined,false); 
			

			svc.acceptGrant(params,cb);
		}

		
		service.CheckInLicense=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LicenseConsumptionToken",params,undefined,false); 
			
			copyArg(msg,"LicenseConsumptionToken",params,undefined,false); 
			copyArg(msg,"Beneficiary",params,undefined,false); 
			

			svc.checkInLicense(params,cb);
		}

		
		service.CheckoutBorrowLicense=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LicenseArn",params,undefined,false); 
			copyArg(n,"Entitlements",params,undefined,true); 
			copyArg(n,"DigitalSignatureMethod",params,undefined,false); 
			copyArg(n,"ClientToken",params,undefined,false); 
			
			copyArg(msg,"LicenseArn",params,undefined,false); 
			copyArg(msg,"Entitlements",params,undefined,true); 
			copyArg(msg,"DigitalSignatureMethod",params,undefined,false); 
			copyArg(msg,"NodeId",params,undefined,false); 
			copyArg(msg,"CheckoutMetadata",params,undefined,true); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.checkoutBorrowLicense(params,cb);
		}

		
		service.CheckoutLicense=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProductSKU",params,undefined,false); 
			copyArg(n,"CheckoutType",params,undefined,false); 
			copyArg(n,"KeyFingerprint",params,undefined,false); 
			copyArg(n,"Entitlements",params,undefined,true); 
			copyArg(n,"ClientToken",params,undefined,false); 
			
			copyArg(msg,"ProductSKU",params,undefined,false); 
			copyArg(msg,"CheckoutType",params,undefined,false); 
			copyArg(msg,"KeyFingerprint",params,undefined,false); 
			copyArg(msg,"Entitlements",params,undefined,true); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"Beneficiary",params,undefined,false); 
			copyArg(msg,"NodeId",params,undefined,false); 
			

			svc.checkoutLicense(params,cb);
		}

		
		service.CreateGrant=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClientToken",params,undefined,false); 
			copyArg(n,"GrantName",params,undefined,false); 
			copyArg(n,"LicenseArn",params,undefined,false); 
			copyArg(n,"Principals",params,undefined,false); 
			copyArg(n,"HomeRegion",params,undefined,false); 
			copyArg(n,"AllowedOperations",params,undefined,true); 
			
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"GrantName",params,undefined,false); 
			copyArg(msg,"LicenseArn",params,undefined,false); 
			copyArg(msg,"Principals",params,undefined,false); 
			copyArg(msg,"HomeRegion",params,undefined,false); 
			copyArg(msg,"AllowedOperations",params,undefined,true); 
			

			svc.createGrant(params,cb);
		}

		
		service.CreateGrantVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClientToken",params,undefined,false); 
			copyArg(n,"GrantArn",params,undefined,false); 
			
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"GrantArn",params,undefined,false); 
			copyArg(msg,"GrantName",params,undefined,false); 
			copyArg(msg,"AllowedOperations",params,undefined,true); 
			copyArg(msg,"Status",params,undefined,false); 
			copyArg(msg,"StatusReason",params,undefined,false); 
			copyArg(msg,"SourceVersion",params,undefined,false); 
			

			svc.createGrantVersion(params,cb);
		}

		
		service.CreateLicense=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LicenseName",params,undefined,false); 
			copyArg(n,"ProductName",params,undefined,false); 
			copyArg(n,"ProductSKU",params,undefined,false); 
			copyArg(n,"Issuer",params,undefined,true); 
			copyArg(n,"HomeRegion",params,undefined,false); 
			copyArg(n,"Validity",params,undefined,true); 
			copyArg(n,"Entitlements",params,undefined,true); 
			copyArg(n,"Beneficiary",params,undefined,false); 
			copyArg(n,"ConsumptionConfiguration",params,undefined,true); 
			copyArg(n,"ClientToken",params,undefined,false); 
			
			copyArg(msg,"LicenseName",params,undefined,false); 
			copyArg(msg,"ProductName",params,undefined,false); 
			copyArg(msg,"ProductSKU",params,undefined,false); 
			copyArg(msg,"Issuer",params,undefined,true); 
			copyArg(msg,"HomeRegion",params,undefined,false); 
			copyArg(msg,"Validity",params,undefined,true); 
			copyArg(msg,"Entitlements",params,undefined,true); 
			copyArg(msg,"Beneficiary",params,undefined,false); 
			copyArg(msg,"ConsumptionConfiguration",params,undefined,true); 
			copyArg(msg,"LicenseMetadata",params,undefined,true); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.createLicense(params,cb);
		}

		
		service.CreateLicenseConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"LicenseCountingType",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"LicenseCountingType",params,undefined,false); 
			copyArg(msg,"LicenseCount",params,undefined,false); 
			copyArg(msg,"LicenseCountHardLimit",params,undefined,false); 
			copyArg(msg,"LicenseRules",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"DisassociateWhenNotFound",params,undefined,false); 
			copyArg(msg,"ProductInformationList",params,undefined,true); 
			

			svc.createLicenseConfiguration(params,cb);
		}

		
		service.CreateLicenseManagerReportGenerator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReportGeneratorName",params,undefined,false); 
			copyArg(n,"Type",params,undefined,true); 
			copyArg(n,"ReportContext",params,undefined,true); 
			copyArg(n,"ReportFrequency",params,undefined,true); 
			copyArg(n,"ClientToken",params,undefined,false); 
			
			copyArg(msg,"ReportGeneratorName",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,true); 
			copyArg(msg,"ReportContext",params,undefined,true); 
			copyArg(msg,"ReportFrequency",params,undefined,true); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createLicenseManagerReportGenerator(params,cb);
		}

		
		service.CreateLicenseVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LicenseArn",params,undefined,false); 
			copyArg(n,"LicenseName",params,undefined,false); 
			copyArg(n,"ProductName",params,undefined,false); 
			copyArg(n,"Issuer",params,undefined,true); 
			copyArg(n,"HomeRegion",params,undefined,false); 
			copyArg(n,"Validity",params,undefined,true); 
			copyArg(n,"Entitlements",params,undefined,true); 
			copyArg(n,"ConsumptionConfiguration",params,undefined,true); 
			copyArg(n,"Status",params,undefined,false); 
			copyArg(n,"ClientToken",params,undefined,false); 
			
			copyArg(msg,"LicenseArn",params,undefined,false); 
			copyArg(msg,"LicenseName",params,undefined,false); 
			copyArg(msg,"ProductName",params,undefined,false); 
			copyArg(msg,"Issuer",params,undefined,true); 
			copyArg(msg,"HomeRegion",params,undefined,false); 
			copyArg(msg,"Validity",params,undefined,true); 
			copyArg(msg,"LicenseMetadata",params,undefined,true); 
			copyArg(msg,"Entitlements",params,undefined,true); 
			copyArg(msg,"ConsumptionConfiguration",params,undefined,true); 
			copyArg(msg,"Status",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"SourceVersion",params,undefined,false); 
			

			svc.createLicenseVersion(params,cb);
		}

		
		service.CreateToken=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LicenseArn",params,undefined,false); 
			copyArg(n,"ClientToken",params,undefined,false); 
			
			copyArg(msg,"LicenseArn",params,undefined,false); 
			copyArg(msg,"RoleArns",params,undefined,true); 
			copyArg(msg,"ExpirationInDays",params,undefined,false); 
			copyArg(msg,"TokenProperties",params,undefined,true); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.createToken(params,cb);
		}

		
		service.DeleteGrant=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GrantArn",params,undefined,false); 
			copyArg(n,"Version",params,undefined,false); 
			
			copyArg(msg,"GrantArn",params,undefined,false); 
			copyArg(msg,"StatusReason",params,undefined,false); 
			copyArg(msg,"Version",params,undefined,false); 
			

			svc.deleteGrant(params,cb);
		}

		
		service.DeleteLicense=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LicenseArn",params,undefined,false); 
			copyArg(n,"SourceVersion",params,undefined,false); 
			
			copyArg(msg,"LicenseArn",params,undefined,false); 
			copyArg(msg,"SourceVersion",params,undefined,false); 
			

			svc.deleteLicense(params,cb);
		}

		
		service.DeleteLicenseConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LicenseConfigurationArn",params,undefined,false); 
			
			copyArg(msg,"LicenseConfigurationArn",params,undefined,false); 
			

			svc.deleteLicenseConfiguration(params,cb);
		}

		
		service.DeleteLicenseManagerReportGenerator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LicenseManagerReportGeneratorArn",params,undefined,false); 
			
			copyArg(msg,"LicenseManagerReportGeneratorArn",params,undefined,false); 
			

			svc.deleteLicenseManagerReportGenerator(params,cb);
		}

		
		service.DeleteToken=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TokenId",params,undefined,false); 
			
			copyArg(msg,"TokenId",params,undefined,false); 
			

			svc.deleteToken(params,cb);
		}

		
		service.ExtendLicenseConsumption=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LicenseConsumptionToken",params,undefined,false); 
			
			copyArg(msg,"LicenseConsumptionToken",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.extendLicenseConsumption(params,cb);
		}

		
		service.GetAccessToken=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Token",params,undefined,false); 
			
			copyArg(msg,"Token",params,undefined,false); 
			copyArg(msg,"TokenProperties",params,undefined,true); 
			

			svc.getAccessToken(params,cb);
		}

		
		service.GetGrant=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GrantArn",params,undefined,false); 
			
			copyArg(msg,"GrantArn",params,undefined,false); 
			copyArg(msg,"Version",params,undefined,false); 
			

			svc.getGrant(params,cb);
		}

		
		service.GetLicense=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LicenseArn",params,undefined,false); 
			
			copyArg(msg,"LicenseArn",params,undefined,false); 
			copyArg(msg,"Version",params,undefined,false); 
			

			svc.getLicense(params,cb);
		}

		
		service.GetLicenseConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LicenseConfigurationArn",params,undefined,false); 
			
			copyArg(msg,"LicenseConfigurationArn",params,undefined,false); 
			

			svc.getLicenseConfiguration(params,cb);
		}

		
		service.GetLicenseManagerReportGenerator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LicenseManagerReportGeneratorArn",params,undefined,false); 
			
			copyArg(msg,"LicenseManagerReportGeneratorArn",params,undefined,false); 
			

			svc.getLicenseManagerReportGenerator(params,cb);
		}

		
		service.GetLicenseUsage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LicenseArn",params,undefined,false); 
			
			copyArg(msg,"LicenseArn",params,undefined,false); 
			

			svc.getLicenseUsage(params,cb);
		}

		
		service.GetServiceSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getServiceSettings(params,cb);
		}

		
		service.ListAssociationsForLicenseConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LicenseConfigurationArn",params,undefined,false); 
			
			copyArg(msg,"LicenseConfigurationArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listAssociationsForLicenseConfiguration(params,cb);
		}

		
		service.ListDistributedGrants=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"GrantArns",params,undefined,true); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listDistributedGrants(params,cb);
		}

		
		service.ListFailuresForLicenseConfigurationOperations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LicenseConfigurationArn",params,undefined,false); 
			
			copyArg(msg,"LicenseConfigurationArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listFailuresForLicenseConfigurationOperations(params,cb);
		}

		
		service.ListLicenseConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"LicenseConfigurationArns",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			

			svc.listLicenseConfigurations(params,cb);
		}

		
		service.ListLicenseManagerReportGenerators=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listLicenseManagerReportGenerators(params,cb);
		}

		
		service.ListLicenseSpecificationsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listLicenseSpecificationsForResource(params,cb);
		}

		
		service.ListLicenseVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LicenseArn",params,undefined,false); 
			
			copyArg(msg,"LicenseArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listLicenseVersions(params,cb);
		}

		
		service.ListLicenses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"LicenseArns",params,undefined,true); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listLicenses(params,cb);
		}

		
		service.ListReceivedGrants=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"GrantArns",params,undefined,true); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listReceivedGrants(params,cb);
		}

		
		service.ListReceivedLicenses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"LicenseArns",params,undefined,true); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listReceivedLicenses(params,cb);
		}

		
		service.ListResourceInventory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			

			svc.listResourceInventory(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListTokens=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"TokenIds",params,undefined,true); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listTokens(params,cb);
		}

		
		service.ListUsageForLicenseConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LicenseConfigurationArn",params,undefined,false); 
			
			copyArg(msg,"LicenseConfigurationArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			

			svc.listUsageForLicenseConfiguration(params,cb);
		}

		
		service.RejectGrant=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GrantArn",params,undefined,false); 
			
			copyArg(msg,"GrantArn",params,undefined,false); 
			

			svc.rejectGrant(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateLicenseConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LicenseConfigurationArn",params,undefined,false); 
			
			copyArg(msg,"LicenseConfigurationArn",params,undefined,false); 
			copyArg(msg,"LicenseConfigurationStatus",params,undefined,false); 
			copyArg(msg,"LicenseRules",params,undefined,true); 
			copyArg(msg,"LicenseCount",params,undefined,false); 
			copyArg(msg,"LicenseCountHardLimit",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"ProductInformationList",params,undefined,true); 
			copyArg(msg,"DisassociateWhenNotFound",params,undefined,false); 
			

			svc.updateLicenseConfiguration(params,cb);
		}

		
		service.UpdateLicenseManagerReportGenerator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LicenseManagerReportGeneratorArn",params,undefined,false); 
			copyArg(n,"ReportGeneratorName",params,undefined,false); 
			copyArg(n,"Type",params,undefined,true); 
			copyArg(n,"ReportContext",params,undefined,true); 
			copyArg(n,"ReportFrequency",params,undefined,true); 
			copyArg(n,"ClientToken",params,undefined,false); 
			
			copyArg(msg,"LicenseManagerReportGeneratorArn",params,undefined,false); 
			copyArg(msg,"ReportGeneratorName",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,true); 
			copyArg(msg,"ReportContext",params,undefined,true); 
			copyArg(msg,"ReportFrequency",params,undefined,true); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			

			svc.updateLicenseManagerReportGenerator(params,cb);
		}

		
		service.UpdateLicenseSpecificationsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"AddLicenseSpecifications",params,undefined,true); 
			copyArg(msg,"RemoveLicenseSpecifications",params,undefined,true); 
			

			svc.updateLicenseSpecificationsForResource(params,cb);
		}

		
		service.UpdateServiceSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"S3BucketArn",params,undefined,false); 
			copyArg(msg,"SnsTopicArn",params,undefined,false); 
			copyArg(msg,"OrganizationConfiguration",params,undefined,true); 
			copyArg(msg,"EnableCrossAccountsDiscovery",params,undefined,false); 
			

			svc.updateServiceSettings(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS LicenseManager", AmazonAPINode);

};
