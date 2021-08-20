
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

		var awsService = new AWS.WorkLink( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.WorkLink(msg.AWSConfig) : awsService;

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

		
		service.AssociateDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetArn",params,undefined,false); 
			copyArg(n,"DomainName",params,undefined,false); 
			copyArg(n,"AcmCertificateArn",params,undefined,false); 
			
			copyArg(msg,"FleetArn",params,undefined,false); 
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"DisplayName",params,undefined,false); 
			copyArg(msg,"AcmCertificateArn",params,undefined,false); 
			

			svc.associateDomain(params,cb);
		}

		
		service.AssociateWebsiteAuthorizationProvider=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetArn",params,undefined,false); 
			copyArg(n,"AuthorizationProviderType",params,undefined,false); 
			
			copyArg(msg,"FleetArn",params,undefined,false); 
			copyArg(msg,"AuthorizationProviderType",params,undefined,false); 
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.associateWebsiteAuthorizationProvider(params,cb);
		}

		
		service.AssociateWebsiteCertificateAuthority=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetArn",params,undefined,false); 
			copyArg(n,"Certificate",params,undefined,false); 
			
			copyArg(msg,"FleetArn",params,undefined,false); 
			copyArg(msg,"Certificate",params,undefined,false); 
			copyArg(msg,"DisplayName",params,undefined,false); 
			

			svc.associateWebsiteCertificateAuthority(params,cb);
		}

		
		service.CreateFleet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetName",params,undefined,false); 
			
			copyArg(msg,"FleetName",params,undefined,false); 
			copyArg(msg,"DisplayName",params,undefined,false); 
			copyArg(msg,"OptimizeForEndUserLocation",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createFleet(params,cb);
		}

		
		service.DeleteFleet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetArn",params,undefined,false); 
			
			copyArg(msg,"FleetArn",params,undefined,false); 
			

			svc.deleteFleet(params,cb);
		}

		
		service.DescribeAuditStreamConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetArn",params,undefined,false); 
			
			copyArg(msg,"FleetArn",params,undefined,false); 
			

			svc.describeAuditStreamConfiguration(params,cb);
		}

		
		service.DescribeCompanyNetworkConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetArn",params,undefined,false); 
			
			copyArg(msg,"FleetArn",params,undefined,false); 
			

			svc.describeCompanyNetworkConfiguration(params,cb);
		}

		
		service.DescribeDevice=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetArn",params,undefined,false); 
			copyArg(n,"DeviceId",params,undefined,false); 
			
			copyArg(msg,"FleetArn",params,undefined,false); 
			copyArg(msg,"DeviceId",params,undefined,false); 
			

			svc.describeDevice(params,cb);
		}

		
		service.DescribeDevicePolicyConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetArn",params,undefined,false); 
			
			copyArg(msg,"FleetArn",params,undefined,false); 
			

			svc.describeDevicePolicyConfiguration(params,cb);
		}

		
		service.DescribeDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetArn",params,undefined,false); 
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"FleetArn",params,undefined,false); 
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.describeDomain(params,cb);
		}

		
		service.DescribeFleetMetadata=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetArn",params,undefined,false); 
			
			copyArg(msg,"FleetArn",params,undefined,false); 
			

			svc.describeFleetMetadata(params,cb);
		}

		
		service.DescribeIdentityProviderConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetArn",params,undefined,false); 
			
			copyArg(msg,"FleetArn",params,undefined,false); 
			

			svc.describeIdentityProviderConfiguration(params,cb);
		}

		
		service.DescribeWebsiteCertificateAuthority=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetArn",params,undefined,false); 
			copyArg(n,"WebsiteCaId",params,undefined,false); 
			
			copyArg(msg,"FleetArn",params,undefined,false); 
			copyArg(msg,"WebsiteCaId",params,undefined,false); 
			

			svc.describeWebsiteCertificateAuthority(params,cb);
		}

		
		service.DisassociateDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetArn",params,undefined,false); 
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"FleetArn",params,undefined,false); 
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.disassociateDomain(params,cb);
		}

		
		service.DisassociateWebsiteAuthorizationProvider=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetArn",params,undefined,false); 
			copyArg(n,"AuthorizationProviderId",params,undefined,false); 
			
			copyArg(msg,"FleetArn",params,undefined,false); 
			copyArg(msg,"AuthorizationProviderId",params,undefined,false); 
			

			svc.disassociateWebsiteAuthorizationProvider(params,cb);
		}

		
		service.DisassociateWebsiteCertificateAuthority=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetArn",params,undefined,false); 
			copyArg(n,"WebsiteCaId",params,undefined,false); 
			
			copyArg(msg,"FleetArn",params,undefined,false); 
			copyArg(msg,"WebsiteCaId",params,undefined,false); 
			

			svc.disassociateWebsiteCertificateAuthority(params,cb);
		}

		
		service.ListDevices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetArn",params,undefined,false); 
			
			copyArg(msg,"FleetArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listDevices(params,cb);
		}

		
		service.ListDomains=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetArn",params,undefined,false); 
			
			copyArg(msg,"FleetArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listDomains(params,cb);
		}

		
		service.ListFleets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listFleets(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListWebsiteAuthorizationProviders=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetArn",params,undefined,false); 
			
			copyArg(msg,"FleetArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listWebsiteAuthorizationProviders(params,cb);
		}

		
		service.ListWebsiteCertificateAuthorities=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetArn",params,undefined,false); 
			
			copyArg(msg,"FleetArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listWebsiteCertificateAuthorities(params,cb);
		}

		
		service.RestoreDomainAccess=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetArn",params,undefined,false); 
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"FleetArn",params,undefined,false); 
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.restoreDomainAccess(params,cb);
		}

		
		service.RevokeDomainAccess=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetArn",params,undefined,false); 
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"FleetArn",params,undefined,false); 
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.revokeDomainAccess(params,cb);
		}

		
		service.SignOutUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetArn",params,undefined,false); 
			copyArg(n,"Username",params,undefined,false); 
			
			copyArg(msg,"FleetArn",params,undefined,false); 
			copyArg(msg,"Username",params,undefined,false); 
			

			svc.signOutUser(params,cb);
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

		
		service.UpdateAuditStreamConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetArn",params,undefined,false); 
			
			copyArg(msg,"FleetArn",params,undefined,false); 
			copyArg(msg,"AuditStreamArn",params,undefined,false); 
			

			svc.updateAuditStreamConfiguration(params,cb);
		}

		
		service.UpdateCompanyNetworkConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetArn",params,undefined,false); 
			copyArg(n,"VpcId",params,undefined,false); 
			copyArg(n,"SubnetIds",params,undefined,true); 
			copyArg(n,"SecurityGroupIds",params,undefined,true); 
			
			copyArg(msg,"FleetArn",params,undefined,false); 
			copyArg(msg,"VpcId",params,undefined,false); 
			copyArg(msg,"SubnetIds",params,undefined,true); 
			copyArg(msg,"SecurityGroupIds",params,undefined,true); 
			

			svc.updateCompanyNetworkConfiguration(params,cb);
		}

		
		service.UpdateDevicePolicyConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetArn",params,undefined,false); 
			
			copyArg(msg,"FleetArn",params,undefined,false); 
			copyArg(msg,"DeviceCaCertificate",params,undefined,false); 
			

			svc.updateDevicePolicyConfiguration(params,cb);
		}

		
		service.UpdateDomainMetadata=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetArn",params,undefined,false); 
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"FleetArn",params,undefined,false); 
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"DisplayName",params,undefined,false); 
			

			svc.updateDomainMetadata(params,cb);
		}

		
		service.UpdateFleetMetadata=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetArn",params,undefined,false); 
			
			copyArg(msg,"FleetArn",params,undefined,false); 
			copyArg(msg,"DisplayName",params,undefined,false); 
			copyArg(msg,"OptimizeForEndUserLocation",params,undefined,false); 
			

			svc.updateFleetMetadata(params,cb);
		}

		
		service.UpdateIdentityProviderConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetArn",params,undefined,false); 
			copyArg(n,"IdentityProviderType",params,undefined,false); 
			
			copyArg(msg,"FleetArn",params,undefined,false); 
			copyArg(msg,"IdentityProviderType",params,undefined,false); 
			copyArg(msg,"IdentityProviderSamlMetadata",params,undefined,false); 
			

			svc.updateIdentityProviderConfiguration(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS WorkLink", AmazonAPINode);

};
