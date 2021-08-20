
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

		var awsService = new AWS.DirectoryService( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.DirectoryService(msg.AWSConfig) : awsService;

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

		
		service.AcceptSharedDirectory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SharedDirectoryId",params,undefined,false); 
			
			copyArg(msg,"SharedDirectoryId",params,undefined,false); 
			

			svc.acceptSharedDirectory(params,cb);
		}

		
		service.AddIpRoutes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"IpRoutes",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"IpRoutes",params,undefined,false); 
			copyArg(msg,"UpdateSecurityGroupForDirectoryControllers",params,undefined,false); 
			

			svc.addIpRoutes(params,cb);
		}

		
		service.AddRegion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"RegionName",params,undefined,false); 
			copyArg(n,"VPCSettings",params,undefined,true); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"RegionName",params,undefined,false); 
			copyArg(msg,"VPCSettings",params,undefined,true); 
			

			svc.addRegion(params,cb);
		}

		
		service.AddTagsToResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.addTagsToResource(params,cb);
		}

		
		service.CancelSchemaExtension=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"SchemaExtensionId",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"SchemaExtensionId",params,undefined,false); 
			

			svc.cancelSchemaExtension(params,cb);
		}

		
		service.ConnectDirectory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Password",params,undefined,true); 
			copyArg(n,"Size",params,undefined,false); 
			copyArg(n,"ConnectSettings",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ShortName",params,undefined,false); 
			copyArg(msg,"Password",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Size",params,undefined,false); 
			copyArg(msg,"ConnectSettings",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.connectDirectory(params,cb);
		}

		
		service.CreateAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"Alias",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"Alias",params,undefined,false); 
			

			svc.createAlias(params,cb);
		}

		
		service.CreateComputer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"ComputerName",params,undefined,false); 
			copyArg(n,"Password",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"ComputerName",params,undefined,false); 
			copyArg(msg,"Password",params,undefined,false); 
			copyArg(msg,"OrganizationalUnitDistinguishedName",params,undefined,false); 
			copyArg(msg,"ComputerAttributes",params,undefined,true); 
			

			svc.createComputer(params,cb);
		}

		
		service.CreateConditionalForwarder=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"RemoteDomainName",params,undefined,false); 
			copyArg(n,"DnsIpAddrs",params,undefined,true); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"RemoteDomainName",params,undefined,false); 
			copyArg(msg,"DnsIpAddrs",params,undefined,true); 
			

			svc.createConditionalForwarder(params,cb);
		}

		
		service.CreateDirectory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Password",params,undefined,true); 
			copyArg(n,"Size",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ShortName",params,undefined,false); 
			copyArg(msg,"Password",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Size",params,undefined,false); 
			copyArg(msg,"VpcSettings",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createDirectory(params,cb);
		}

		
		service.CreateLogSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"LogGroupName",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"LogGroupName",params,undefined,false); 
			

			svc.createLogSubscription(params,cb);
		}

		
		service.CreateMicrosoftAD=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Password",params,undefined,true); 
			copyArg(n,"VpcSettings",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ShortName",params,undefined,false); 
			copyArg(msg,"Password",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"VpcSettings",params,undefined,true); 
			copyArg(msg,"Edition",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createMicrosoftAD(params,cb);
		}

		
		service.CreateSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.createSnapshot(params,cb);
		}

		
		service.CreateTrust=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"RemoteDomainName",params,undefined,false); 
			copyArg(n,"TrustPassword",params,undefined,false); 
			copyArg(n,"TrustDirection",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"RemoteDomainName",params,undefined,false); 
			copyArg(msg,"TrustPassword",params,undefined,false); 
			copyArg(msg,"TrustDirection",params,undefined,false); 
			copyArg(msg,"TrustType",params,undefined,false); 
			copyArg(msg,"ConditionalForwarderIpAddrs",params,undefined,true); 
			copyArg(msg,"SelectiveAuth",params,undefined,false); 
			

			svc.createTrust(params,cb);
		}

		
		service.DeleteConditionalForwarder=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"RemoteDomainName",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"RemoteDomainName",params,undefined,false); 
			

			svc.deleteConditionalForwarder(params,cb);
		}

		
		service.DeleteDirectory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			

			svc.deleteDirectory(params,cb);
		}

		
		service.DeleteLogSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			

			svc.deleteLogSubscription(params,cb);
		}

		
		service.DeleteSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SnapshotId",params,undefined,false); 
			
			copyArg(msg,"SnapshotId",params,undefined,false); 
			

			svc.deleteSnapshot(params,cb);
		}

		
		service.DeleteTrust=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TrustId",params,undefined,false); 
			
			copyArg(msg,"TrustId",params,undefined,false); 
			copyArg(msg,"DeleteAssociatedConditionalForwarder",params,undefined,false); 
			

			svc.deleteTrust(params,cb);
		}

		
		service.DeregisterCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"CertificateId",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"CertificateId",params,undefined,false); 
			

			svc.deregisterCertificate(params,cb);
		}

		
		service.DeregisterEventTopic=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"TopicName",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"TopicName",params,undefined,false); 
			

			svc.deregisterEventTopic(params,cb);
		}

		
		service.DescribeCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"CertificateId",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"CertificateId",params,undefined,false); 
			

			svc.describeCertificate(params,cb);
		}

		
		service.DescribeClientAuthenticationSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.describeClientAuthenticationSettings(params,cb);
		}

		
		service.DescribeConditionalForwarders=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"RemoteDomainNames",params,undefined,false); 
			

			svc.describeConditionalForwarders(params,cb);
		}

		
		service.DescribeDirectories=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DirectoryIds",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.describeDirectories(params,cb);
		}

		
		service.DescribeDomainControllers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"DomainControllerIds",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.describeDomainControllers(params,cb);
		}

		
		service.DescribeEventTopics=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"TopicNames",params,undefined,false); 
			

			svc.describeEventTopics(params,cb);
		}

		
		service.DescribeLDAPSSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.describeLDAPSSettings(params,cb);
		}

		
		service.DescribeRegions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"RegionName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeRegions(params,cb);
		}

		
		service.DescribeSharedDirectories=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OwnerDirectoryId",params,undefined,false); 
			
			copyArg(msg,"OwnerDirectoryId",params,undefined,false); 
			copyArg(msg,"SharedDirectoryIds",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.describeSharedDirectories(params,cb);
		}

		
		service.DescribeSnapshots=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"SnapshotIds",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.describeSnapshots(params,cb);
		}

		
		service.DescribeTrusts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"TrustIds",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.describeTrusts(params,cb);
		}

		
		service.DisableClientAuthentication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"Type",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			

			svc.disableClientAuthentication(params,cb);
		}

		
		service.DisableLDAPS=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"Type",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			

			svc.disableLDAPS(params,cb);
		}

		
		service.DisableRadius=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			

			svc.disableRadius(params,cb);
		}

		
		service.DisableSso=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"Password",params,undefined,true); 
			

			svc.disableSso(params,cb);
		}

		
		service.EnableClientAuthentication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"Type",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			

			svc.enableClientAuthentication(params,cb);
		}

		
		service.EnableLDAPS=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"Type",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			

			svc.enableLDAPS(params,cb);
		}

		
		service.EnableRadius=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"RadiusSettings",params,undefined,true); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"RadiusSettings",params,undefined,true); 
			

			svc.enableRadius(params,cb);
		}

		
		service.EnableSso=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"Password",params,undefined,true); 
			

			svc.enableSso(params,cb);
		}

		
		service.GetDirectoryLimits=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getDirectoryLimits(params,cb);
		}

		
		service.GetSnapshotLimits=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			

			svc.getSnapshotLimits(params,cb);
		}

		
		service.ListCertificates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listCertificates(params,cb);
		}

		
		service.ListIpRoutes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listIpRoutes(params,cb);
		}

		
		service.ListLogSubscriptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listLogSubscriptions(params,cb);
		}

		
		service.ListSchemaExtensions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listSchemaExtensions(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.RegisterCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"CertificateData",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"CertificateData",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"ClientCertAuthSettings",params,undefined,true); 
			

			svc.registerCertificate(params,cb);
		}

		
		service.RegisterEventTopic=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"TopicName",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"TopicName",params,undefined,false); 
			

			svc.registerEventTopic(params,cb);
		}

		
		service.RejectSharedDirectory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SharedDirectoryId",params,undefined,false); 
			
			copyArg(msg,"SharedDirectoryId",params,undefined,false); 
			

			svc.rejectSharedDirectory(params,cb);
		}

		
		service.RemoveIpRoutes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"CidrIps",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"CidrIps",params,undefined,false); 
			

			svc.removeIpRoutes(params,cb);
		}

		
		service.RemoveRegion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			

			svc.removeRegion(params,cb);
		}

		
		service.RemoveTagsFromResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.removeTagsFromResource(params,cb);
		}

		
		service.ResetUserPassword=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"UserName",params,undefined,false); 
			copyArg(n,"NewPassword",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"UserName",params,undefined,false); 
			copyArg(msg,"NewPassword",params,undefined,false); 
			

			svc.resetUserPassword(params,cb);
		}

		
		service.RestoreFromSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SnapshotId",params,undefined,false); 
			
			copyArg(msg,"SnapshotId",params,undefined,false); 
			

			svc.restoreFromSnapshot(params,cb);
		}

		
		service.ShareDirectory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"ShareTarget",params,undefined,false); 
			copyArg(n,"ShareMethod",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"ShareNotes",params,undefined,true); 
			copyArg(msg,"ShareTarget",params,undefined,false); 
			copyArg(msg,"ShareMethod",params,undefined,false); 
			

			svc.shareDirectory(params,cb);
		}

		
		service.StartSchemaExtension=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"CreateSnapshotBeforeSchemaExtension",params,undefined,false); 
			copyArg(n,"LdifContent",params,undefined,false); 
			copyArg(n,"Description",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"CreateSnapshotBeforeSchemaExtension",params,undefined,false); 
			copyArg(msg,"LdifContent",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			

			svc.startSchemaExtension(params,cb);
		}

		
		service.UnshareDirectory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"UnshareTarget",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"UnshareTarget",params,undefined,false); 
			

			svc.unshareDirectory(params,cb);
		}

		
		service.UpdateConditionalForwarder=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"RemoteDomainName",params,undefined,false); 
			copyArg(n,"DnsIpAddrs",params,undefined,true); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"RemoteDomainName",params,undefined,false); 
			copyArg(msg,"DnsIpAddrs",params,undefined,true); 
			

			svc.updateConditionalForwarder(params,cb);
		}

		
		service.UpdateNumberOfDomainControllers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"DesiredNumber",params,undefined,false); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"DesiredNumber",params,undefined,false); 
			

			svc.updateNumberOfDomainControllers(params,cb);
		}

		
		service.UpdateRadius=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryId",params,undefined,false); 
			copyArg(n,"RadiusSettings",params,undefined,true); 
			
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"RadiusSettings",params,undefined,true); 
			

			svc.updateRadius(params,cb);
		}

		
		service.UpdateTrust=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TrustId",params,undefined,false); 
			
			copyArg(msg,"TrustId",params,undefined,false); 
			copyArg(msg,"SelectiveAuth",params,undefined,false); 
			

			svc.updateTrust(params,cb);
		}

		
		service.VerifyTrust=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TrustId",params,undefined,false); 
			
			copyArg(msg,"TrustId",params,undefined,false); 
			

			svc.verifyTrust(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS DirectoryService", AmazonAPINode);

};
