
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

		var awsService = new AWS.DirectoryService( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.DirectoryService(msg.AWSConfig) : awsService;

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
		
		service.AcceptSharedDirectory=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SharedDirectoryId",params,undefined,false); 
			
			copyArgs(n,"SharedDirectoryId",params,undefined,false); 
			
			copyArgs(msg,"SharedDirectoryId",params,undefined,false); 
			

			svc.acceptSharedDirectory(params,cb);
		}
		
		service.AddIpRoutes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"IpRoutes",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"IpRoutes",params,undefined,false); 
			copyArgs(Boolean(n),"UpdateSecurityGroupForDirectoryControllers",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"IpRoutes",params,undefined,false); 
			copyArgs(msg,"UpdateSecurityGroupForDirectoryControllers",params,undefined,false); 
			

			svc.addIpRoutes(params,cb);
		}
		
		service.AddRegion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"RegionName",params,undefined,false); 
			copyArgs(n,"VPCSettings",params,undefined,true); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"RegionName",params,undefined,false); 
			copyArgs(n,"VPCSettings",params,undefined,true); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"RegionName",params,undefined,false); 
			copyArgs(msg,"VPCSettings",params,undefined,true); 
			

			svc.addRegion(params,cb);
		}
		
		service.AddTagsToResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.addTagsToResource(params,cb);
		}
		
		service.CancelSchemaExtension=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"SchemaExtensionId",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"SchemaExtensionId",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"SchemaExtensionId",params,undefined,false); 
			

			svc.cancelSchemaExtension(params,cb);
		}
		
		service.ConnectDirectory=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,true); 
			copyArgs(n,"Size",params,undefined,false); 
			copyArgs(n,"ConnectSettings",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ShortName",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Size",params,undefined,false); 
			copyArgs(n,"ConnectSettings",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ShortName",params,undefined,false); 
			copyArgs(msg,"Password",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Size",params,undefined,false); 
			copyArgs(msg,"ConnectSettings",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.connectDirectory(params,cb);
		}
		
		service.CreateAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"Alias",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"Alias",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"Alias",params,undefined,false); 
			

			svc.createAlias(params,cb);
		}
		
		service.CreateComputer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"ComputerName",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"ComputerName",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,false); 
			copyArgs(n,"OrganizationalUnitDistinguishedName",params,undefined,false); 
			copyArgs(n,"ComputerAttributes",params,undefined,true); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"ComputerName",params,undefined,false); 
			copyArgs(msg,"Password",params,undefined,false); 
			copyArgs(msg,"OrganizationalUnitDistinguishedName",params,undefined,false); 
			copyArgs(msg,"ComputerAttributes",params,undefined,true); 
			

			svc.createComputer(params,cb);
		}
		
		service.CreateConditionalForwarder=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"RemoteDomainName",params,undefined,false); 
			copyArgs(n,"DnsIpAddrs",params,undefined,true); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"RemoteDomainName",params,undefined,false); 
			copyArgs(n,"DnsIpAddrs",params,undefined,true); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"RemoteDomainName",params,undefined,false); 
			copyArgs(msg,"DnsIpAddrs",params,undefined,true); 
			

			svc.createConditionalForwarder(params,cb);
		}
		
		service.CreateDirectory=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,true); 
			copyArgs(n,"Size",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ShortName",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Size",params,undefined,false); 
			copyArgs(n,"VpcSettings",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ShortName",params,undefined,false); 
			copyArgs(msg,"Password",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Size",params,undefined,false); 
			copyArgs(msg,"VpcSettings",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createDirectory(params,cb);
		}
		
		service.CreateLogSubscription=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"LogGroupName",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"LogGroupName",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"LogGroupName",params,undefined,false); 
			

			svc.createLogSubscription(params,cb);
		}
		
		service.CreateMicrosoftAD=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,true); 
			copyArgs(n,"VpcSettings",params,undefined,true); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ShortName",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"VpcSettings",params,undefined,true); 
			copyArgs(n,"Edition",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ShortName",params,undefined,false); 
			copyArgs(msg,"Password",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"VpcSettings",params,undefined,true); 
			copyArgs(msg,"Edition",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createMicrosoftAD(params,cb);
		}
		
		service.CreateSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.createSnapshot(params,cb);
		}
		
		service.CreateTrust=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"RemoteDomainName",params,undefined,false); 
			copyArgs(n,"TrustPassword",params,undefined,false); 
			copyArgs(n,"TrustDirection",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"RemoteDomainName",params,undefined,false); 
			copyArgs(n,"TrustPassword",params,undefined,false); 
			copyArgs(n,"TrustDirection",params,undefined,false); 
			copyArgs(n,"TrustType",params,undefined,false); 
			copyArgs(n,"ConditionalForwarderIpAddrs",params,undefined,true); 
			copyArgs(n,"SelectiveAuth",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"RemoteDomainName",params,undefined,false); 
			copyArgs(msg,"TrustPassword",params,undefined,false); 
			copyArgs(msg,"TrustDirection",params,undefined,false); 
			copyArgs(msg,"TrustType",params,undefined,false); 
			copyArgs(msg,"ConditionalForwarderIpAddrs",params,undefined,true); 
			copyArgs(msg,"SelectiveAuth",params,undefined,false); 
			

			svc.createTrust(params,cb);
		}
		
		service.DeleteConditionalForwarder=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"RemoteDomainName",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"RemoteDomainName",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"RemoteDomainName",params,undefined,false); 
			

			svc.deleteConditionalForwarder(params,cb);
		}
		
		service.DeleteDirectory=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			

			svc.deleteDirectory(params,cb);
		}
		
		service.DeleteLogSubscription=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			

			svc.deleteLogSubscription(params,cb);
		}
		
		service.DeleteSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SnapshotId",params,undefined,false); 
			
			copyArgs(n,"SnapshotId",params,undefined,false); 
			
			copyArgs(msg,"SnapshotId",params,undefined,false); 
			

			svc.deleteSnapshot(params,cb);
		}
		
		service.DeleteTrust=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrustId",params,undefined,false); 
			
			copyArgs(n,"TrustId",params,undefined,false); 
			copyArgs(Boolean(n),"DeleteAssociatedConditionalForwarder",params,undefined,false); 
			
			copyArgs(msg,"TrustId",params,undefined,false); 
			copyArgs(msg,"DeleteAssociatedConditionalForwarder",params,undefined,false); 
			

			svc.deleteTrust(params,cb);
		}
		
		service.DeregisterCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"CertificateId",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"CertificateId",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"CertificateId",params,undefined,false); 
			

			svc.deregisterCertificate(params,cb);
		}
		
		service.DeregisterEventTopic=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"TopicName",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"TopicName",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"TopicName",params,undefined,false); 
			

			svc.deregisterEventTopic(params,cb);
		}
		
		service.DescribeCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"CertificateId",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"CertificateId",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"CertificateId",params,undefined,false); 
			

			svc.describeCertificate(params,cb);
		}
		
		service.DescribeClientAuthenticationSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.describeClientAuthenticationSettings(params,cb);
		}
		
		service.DescribeConditionalForwarders=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"RemoteDomainNames",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"RemoteDomainNames",params,undefined,false); 
			

			svc.describeConditionalForwarders(params,cb);
		}
		
		service.DescribeDirectories=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DirectoryIds",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"DirectoryIds",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.describeDirectories(params,cb);
		}
		
		service.DescribeDomainControllers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"DomainControllerIds",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"DomainControllerIds",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.describeDomainControllers(params,cb);
		}
		
		service.DescribeEventTopics=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"TopicNames",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"TopicNames",params,undefined,false); 
			

			svc.describeEventTopics(params,cb);
		}
		
		service.DescribeLDAPSSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.describeLDAPSSettings(params,cb);
		}
		
		service.DescribeRegions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"RegionName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"RegionName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeRegions(params,cb);
		}
		
		service.DescribeSharedDirectories=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OwnerDirectoryId",params,undefined,false); 
			
			copyArgs(n,"OwnerDirectoryId",params,undefined,false); 
			copyArgs(n,"SharedDirectoryIds",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"OwnerDirectoryId",params,undefined,false); 
			copyArgs(msg,"SharedDirectoryIds",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.describeSharedDirectories(params,cb);
		}
		
		service.DescribeSnapshots=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"SnapshotIds",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"SnapshotIds",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.describeSnapshots(params,cb);
		}
		
		service.DescribeTrusts=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"TrustIds",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"TrustIds",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.describeTrusts(params,cb);
		}
		
		service.DisableClientAuthentication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			

			svc.disableClientAuthentication(params,cb);
		}
		
		service.DisableLDAPS=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			

			svc.disableLDAPS(params,cb);
		}
		
		service.DisableRadius=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			

			svc.disableRadius(params,cb);
		}
		
		service.DisableSso=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,true); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"Password",params,undefined,true); 
			

			svc.disableSso(params,cb);
		}
		
		service.EnableClientAuthentication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			

			svc.enableClientAuthentication(params,cb);
		}
		
		service.EnableLDAPS=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			

			svc.enableLDAPS(params,cb);
		}
		
		service.EnableRadius=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"RadiusSettings",params,undefined,true); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"RadiusSettings",params,undefined,true); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"RadiusSettings",params,undefined,true); 
			

			svc.enableRadius(params,cb);
		}
		
		service.EnableSso=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,true); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"Password",params,undefined,true); 
			

			svc.enableSso(params,cb);
		}
		
		service.GetDirectoryLimits=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getDirectoryLimits(params,cb);
		}
		
		service.GetSnapshotLimits=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			

			svc.getSnapshotLimits(params,cb);
		}
		
		service.ListCertificates=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listCertificates(params,cb);
		}
		
		service.ListIpRoutes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listIpRoutes(params,cb);
		}
		
		service.ListLogSubscriptions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listLogSubscriptions(params,cb);
		}
		
		service.ListSchemaExtensions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listSchemaExtensions(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.RegisterCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"CertificateData",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"CertificateData",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"ClientCertAuthSettings",params,undefined,true); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"CertificateData",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"ClientCertAuthSettings",params,undefined,true); 
			

			svc.registerCertificate(params,cb);
		}
		
		service.RegisterEventTopic=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"TopicName",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"TopicName",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"TopicName",params,undefined,false); 
			

			svc.registerEventTopic(params,cb);
		}
		
		service.RejectSharedDirectory=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SharedDirectoryId",params,undefined,false); 
			
			copyArgs(n,"SharedDirectoryId",params,undefined,false); 
			
			copyArgs(msg,"SharedDirectoryId",params,undefined,false); 
			

			svc.rejectSharedDirectory(params,cb);
		}
		
		service.RemoveIpRoutes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"CidrIps",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"CidrIps",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"CidrIps",params,undefined,false); 
			

			svc.removeIpRoutes(params,cb);
		}
		
		service.RemoveRegion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			

			svc.removeRegion(params,cb);
		}
		
		service.RemoveTagsFromResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.removeTagsFromResource(params,cb);
		}
		
		service.ResetUserPassword=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"NewPassword",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,false); 
			copyArgs(n,"NewPassword",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"UserName",params,undefined,false); 
			copyArgs(msg,"NewPassword",params,undefined,false); 
			

			svc.resetUserPassword(params,cb);
		}
		
		service.RestoreFromSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SnapshotId",params,undefined,false); 
			
			copyArgs(n,"SnapshotId",params,undefined,false); 
			
			copyArgs(msg,"SnapshotId",params,undefined,false); 
			

			svc.restoreFromSnapshot(params,cb);
		}
		
		service.ShareDirectory=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"ShareTarget",params,undefined,false); 
			copyArgs(n,"ShareMethod",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"ShareNotes",params,undefined,true); 
			copyArgs(n,"ShareTarget",params,undefined,false); 
			copyArgs(n,"ShareMethod",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"ShareNotes",params,undefined,true); 
			copyArgs(msg,"ShareTarget",params,undefined,false); 
			copyArgs(msg,"ShareMethod",params,undefined,false); 
			

			svc.shareDirectory(params,cb);
		}
		
		service.StartSchemaExtension=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(Boolean(n),"CreateSnapshotBeforeSchemaExtension",params,undefined,false); 
			copyArgs(n,"LdifContent",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(Boolean(n),"CreateSnapshotBeforeSchemaExtension",params,undefined,false); 
			copyArgs(n,"LdifContent",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"CreateSnapshotBeforeSchemaExtension",params,undefined,false); 
			copyArgs(msg,"LdifContent",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			

			svc.startSchemaExtension(params,cb);
		}
		
		service.UnshareDirectory=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"UnshareTarget",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"UnshareTarget",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"UnshareTarget",params,undefined,false); 
			

			svc.unshareDirectory(params,cb);
		}
		
		service.UpdateConditionalForwarder=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"RemoteDomainName",params,undefined,false); 
			copyArgs(n,"DnsIpAddrs",params,undefined,true); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"RemoteDomainName",params,undefined,false); 
			copyArgs(n,"DnsIpAddrs",params,undefined,true); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"RemoteDomainName",params,undefined,false); 
			copyArgs(msg,"DnsIpAddrs",params,undefined,true); 
			

			svc.updateConditionalForwarder(params,cb);
		}
		
		service.UpdateNumberOfDomainControllers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(Number(n),"DesiredNumber",params,undefined,false); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(Number(n),"DesiredNumber",params,undefined,false); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"DesiredNumber",params,undefined,false); 
			

			svc.updateNumberOfDomainControllers(params,cb);
		}
		
		service.UpdateRadius=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"RadiusSettings",params,undefined,true); 
			
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"RadiusSettings",params,undefined,true); 
			
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"RadiusSettings",params,undefined,true); 
			

			svc.updateRadius(params,cb);
		}
		
		service.UpdateTrust=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrustId",params,undefined,false); 
			
			copyArgs(n,"TrustId",params,undefined,false); 
			copyArgs(n,"SelectiveAuth",params,undefined,false); 
			
			copyArgs(msg,"TrustId",params,undefined,false); 
			copyArgs(msg,"SelectiveAuth",params,undefined,false); 
			

			svc.updateTrust(params,cb);
		}
		
		service.VerifyTrust=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrustId",params,undefined,false); 
			
			copyArgs(n,"TrustId",params,undefined,false); 
			
			copyArgs(msg,"TrustId",params,undefined,false); 
			

			svc.verifyTrust(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS DirectoryService", AmazonAPINode);

};
