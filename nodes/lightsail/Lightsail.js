
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

		var awsService = new AWS.Lightsail( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Lightsail(msg.AWSConfig) : awsService;

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
		
			service.AllocateStaticIp=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"staticIpName",params,undefined,false); 
			
			copyArgs(n,"staticIpName",params,undefined,false); 
			
			copyArgs(msg,"staticIpName",params,undefined,false); 
			

			svc.allocateStaticIp(params,cb);
		}
			service.AttachCertificateToDistribution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"distributionName",params,undefined,false); 
			copyArgs(n,"certificateName",params,undefined,false); 
			
			copyArgs(n,"distributionName",params,undefined,false); 
			copyArgs(n,"certificateName",params,undefined,false); 
			
			copyArgs(msg,"distributionName",params,undefined,false); 
			copyArgs(msg,"certificateName",params,undefined,false); 
			

			svc.attachCertificateToDistribution(params,cb);
		}
			service.AttachDisk=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"diskName",params,undefined,false); 
			copyArgs(n,"instanceName",params,undefined,false); 
			copyArgs(n,"diskPath",params,undefined,false); 
			
			copyArgs(n,"diskName",params,undefined,false); 
			copyArgs(n,"instanceName",params,undefined,false); 
			copyArgs(n,"diskPath",params,undefined,false); 
			
			copyArgs(msg,"diskName",params,undefined,false); 
			copyArgs(msg,"instanceName",params,undefined,false); 
			copyArgs(msg,"diskPath",params,undefined,false); 
			

			svc.attachDisk(params,cb);
		}
			service.AttachInstancesToLoadBalancer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"loadBalancerName",params,undefined,false); 
			copyArgs(n,"instanceNames",params,undefined,true); 
			
			copyArgs(n,"loadBalancerName",params,undefined,false); 
			copyArgs(n,"instanceNames",params,undefined,true); 
			
			copyArgs(msg,"loadBalancerName",params,undefined,false); 
			copyArgs(msg,"instanceNames",params,undefined,true); 
			

			svc.attachInstancesToLoadBalancer(params,cb);
		}
			service.AttachLoadBalancerTlsCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"loadBalancerName",params,undefined,false); 
			copyArgs(n,"certificateName",params,undefined,false); 
			
			copyArgs(n,"loadBalancerName",params,undefined,false); 
			copyArgs(n,"certificateName",params,undefined,false); 
			
			copyArgs(msg,"loadBalancerName",params,undefined,false); 
			copyArgs(msg,"certificateName",params,undefined,false); 
			

			svc.attachLoadBalancerTlsCertificate(params,cb);
		}
			service.AttachStaticIp=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"staticIpName",params,undefined,false); 
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(n,"staticIpName",params,undefined,false); 
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(msg,"staticIpName",params,undefined,false); 
			copyArgs(msg,"instanceName",params,undefined,false); 
			

			svc.attachStaticIp(params,cb);
		}
			service.CloseInstancePublicPorts=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"portInfo",params,undefined,true); 
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(n,"portInfo",params,undefined,true); 
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(msg,"portInfo",params,undefined,true); 
			copyArgs(msg,"instanceName",params,undefined,false); 
			

			svc.closeInstancePublicPorts(params,cb);
		}
			service.CopySnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"targetSnapshotName",params,undefined,false); 
			copyArgs(n,"sourceRegion",params,undefined,false); 
			
			copyArgs(n,"sourceSnapshotName",params,undefined,false); 
			copyArgs(n,"sourceResourceName",params,undefined,false); 
			copyArgs(n,"restoreDate",params,undefined,false); 
			copyArgs(Boolean(n),"useLatestRestorableAutoSnapshot",params,undefined,false); 
			copyArgs(n,"targetSnapshotName",params,undefined,false); 
			copyArgs(n,"sourceRegion",params,undefined,false); 
			
			copyArgs(msg,"sourceSnapshotName",params,undefined,false); 
			copyArgs(msg,"sourceResourceName",params,undefined,false); 
			copyArgs(msg,"restoreDate",params,undefined,false); 
			copyArgs(msg,"useLatestRestorableAutoSnapshot",params,undefined,false); 
			copyArgs(msg,"targetSnapshotName",params,undefined,false); 
			copyArgs(msg,"sourceRegion",params,undefined,false); 
			

			svc.copySnapshot(params,cb);
		}
			service.CreateBucket=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"bucketName",params,undefined,false); 
			copyArgs(n,"bundleId",params,undefined,false); 
			
			copyArgs(n,"bucketName",params,undefined,false); 
			copyArgs(n,"bundleId",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(Boolean(n),"enableObjectVersioning",params,undefined,false); 
			
			copyArgs(msg,"bucketName",params,undefined,false); 
			copyArgs(msg,"bundleId",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"enableObjectVersioning",params,undefined,false); 
			

			svc.createBucket(params,cb);
		}
			service.CreateBucketAccessKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"bucketName",params,undefined,false); 
			
			copyArgs(n,"bucketName",params,undefined,false); 
			
			copyArgs(msg,"bucketName",params,undefined,false); 
			

			svc.createBucketAccessKey(params,cb);
		}
			service.CreateCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"certificateName",params,undefined,false); 
			copyArgs(n,"domainName",params,undefined,false); 
			
			copyArgs(n,"certificateName",params,undefined,false); 
			copyArgs(n,"domainName",params,undefined,false); 
			copyArgs(n,"subjectAlternativeNames",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"certificateName",params,undefined,false); 
			copyArgs(msg,"domainName",params,undefined,false); 
			copyArgs(msg,"subjectAlternativeNames",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createCertificate(params,cb);
		}
			service.CreateCloudFormationStack=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"instances",params,undefined,false); 
			
			copyArgs(n,"instances",params,undefined,false); 
			
			copyArgs(msg,"instances",params,undefined,false); 
			

			svc.createCloudFormationStack(params,cb);
		}
			service.CreateContactMethod=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"protocol",params,undefined,false); 
			copyArgs(n,"contactEndpoint",params,undefined,false); 
			
			copyArgs(n,"protocol",params,undefined,false); 
			copyArgs(n,"contactEndpoint",params,undefined,false); 
			
			copyArgs(msg,"protocol",params,undefined,false); 
			copyArgs(msg,"contactEndpoint",params,undefined,false); 
			

			svc.createContactMethod(params,cb);
		}
			service.CreateContainerService=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"serviceName",params,undefined,false); 
			copyArgs(n,"power",params,undefined,false); 
			copyArgs(Number(n),"scale",params,undefined,false); 
			
			copyArgs(n,"serviceName",params,undefined,false); 
			copyArgs(n,"power",params,undefined,false); 
			copyArgs(Number(n),"scale",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"publicDomainNames",params,undefined,true); 
			copyArgs(n,"deployment",params,undefined,false); 
			
			copyArgs(msg,"serviceName",params,undefined,false); 
			copyArgs(msg,"power",params,undefined,false); 
			copyArgs(msg,"scale",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"publicDomainNames",params,undefined,true); 
			copyArgs(msg,"deployment",params,undefined,false); 
			

			svc.createContainerService(params,cb);
		}
			service.CreateContainerServiceDeployment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"serviceName",params,undefined,false); 
			
			copyArgs(n,"serviceName",params,undefined,false); 
			copyArgs(n,"containers",params,undefined,true); 
			copyArgs(n,"publicEndpoint",params,undefined,true); 
			
			copyArgs(msg,"serviceName",params,undefined,false); 
			copyArgs(msg,"containers",params,undefined,true); 
			copyArgs(msg,"publicEndpoint",params,undefined,true); 
			

			svc.createContainerServiceDeployment(params,cb);
		}
			service.CreateContainerServiceRegistryLogin=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.createContainerServiceRegistryLogin(params,cb);
		}
			service.CreateDisk=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"diskName",params,undefined,false); 
			copyArgs(n,"availabilityZone",params,undefined,false); 
			copyArgs(Number(n),"sizeInGb",params,undefined,false); 
			
			copyArgs(n,"diskName",params,undefined,false); 
			copyArgs(n,"availabilityZone",params,undefined,false); 
			copyArgs(Number(n),"sizeInGb",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"addOns",params,undefined,true); 
			
			copyArgs(msg,"diskName",params,undefined,false); 
			copyArgs(msg,"availabilityZone",params,undefined,false); 
			copyArgs(msg,"sizeInGb",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"addOns",params,undefined,true); 
			

			svc.createDisk(params,cb);
		}
			service.CreateDiskFromSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"diskName",params,undefined,false); 
			copyArgs(n,"availabilityZone",params,undefined,false); 
			copyArgs(Number(n),"sizeInGb",params,undefined,false); 
			
			copyArgs(n,"diskName",params,undefined,false); 
			copyArgs(n,"diskSnapshotName",params,undefined,false); 
			copyArgs(n,"availabilityZone",params,undefined,false); 
			copyArgs(Number(n),"sizeInGb",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"addOns",params,undefined,true); 
			copyArgs(n,"sourceDiskName",params,undefined,false); 
			copyArgs(n,"restoreDate",params,undefined,false); 
			copyArgs(Boolean(n),"useLatestRestorableAutoSnapshot",params,undefined,false); 
			
			copyArgs(msg,"diskName",params,undefined,false); 
			copyArgs(msg,"diskSnapshotName",params,undefined,false); 
			copyArgs(msg,"availabilityZone",params,undefined,false); 
			copyArgs(msg,"sizeInGb",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"addOns",params,undefined,true); 
			copyArgs(msg,"sourceDiskName",params,undefined,false); 
			copyArgs(msg,"restoreDate",params,undefined,false); 
			copyArgs(msg,"useLatestRestorableAutoSnapshot",params,undefined,false); 
			

			svc.createDiskFromSnapshot(params,cb);
		}
			service.CreateDiskSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"diskSnapshotName",params,undefined,false); 
			
			copyArgs(n,"diskName",params,undefined,false); 
			copyArgs(n,"diskSnapshotName",params,undefined,false); 
			copyArgs(n,"instanceName",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"diskName",params,undefined,false); 
			copyArgs(msg,"diskSnapshotName",params,undefined,false); 
			copyArgs(msg,"instanceName",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createDiskSnapshot(params,cb);
		}
			service.CreateDistribution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"distributionName",params,undefined,false); 
			copyArgs(n,"origin",params,undefined,true); 
			copyArgs(n,"defaultCacheBehavior",params,undefined,true); 
			copyArgs(n,"bundleId",params,undefined,false); 
			
			copyArgs(n,"distributionName",params,undefined,false); 
			copyArgs(n,"origin",params,undefined,true); 
			copyArgs(n,"defaultCacheBehavior",params,undefined,true); 
			copyArgs(n,"cacheBehaviorSettings",params,undefined,true); 
			copyArgs(n,"cacheBehaviors",params,undefined,true); 
			copyArgs(n,"bundleId",params,undefined,false); 
			copyArgs(n,"ipAddressType",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"distributionName",params,undefined,false); 
			copyArgs(msg,"origin",params,undefined,true); 
			copyArgs(msg,"defaultCacheBehavior",params,undefined,true); 
			copyArgs(msg,"cacheBehaviorSettings",params,undefined,true); 
			copyArgs(msg,"cacheBehaviors",params,undefined,true); 
			copyArgs(msg,"bundleId",params,undefined,false); 
			copyArgs(msg,"ipAddressType",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createDistribution(params,cb);
		}
			service.CreateDomain=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domainName",params,undefined,false); 
			
			copyArgs(n,"domainName",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"domainName",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createDomain(params,cb);
		}
			service.CreateDomainEntry=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domainName",params,undefined,false); 
			copyArgs(n,"domainEntry",params,undefined,true); 
			
			copyArgs(n,"domainName",params,undefined,false); 
			copyArgs(n,"domainEntry",params,undefined,true); 
			
			copyArgs(msg,"domainName",params,undefined,false); 
			copyArgs(msg,"domainEntry",params,undefined,true); 
			

			svc.createDomainEntry(params,cb);
		}
			service.CreateInstanceSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"instanceSnapshotName",params,undefined,false); 
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(n,"instanceSnapshotName",params,undefined,false); 
			copyArgs(n,"instanceName",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"instanceSnapshotName",params,undefined,false); 
			copyArgs(msg,"instanceName",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createInstanceSnapshot(params,cb);
		}
			service.CreateInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"instanceNames",params,undefined,true); 
			copyArgs(n,"availabilityZone",params,undefined,false); 
			copyArgs(n,"blueprintId",params,undefined,false); 
			copyArgs(n,"bundleId",params,undefined,false); 
			
			copyArgs(n,"instanceNames",params,undefined,true); 
			copyArgs(n,"availabilityZone",params,undefined,false); 
			copyArgs(n,"customImageName",params,undefined,false); 
			copyArgs(n,"blueprintId",params,undefined,false); 
			copyArgs(n,"bundleId",params,undefined,false); 
			copyArgs(n,"userData",params,undefined,false); 
			copyArgs(n,"keyPairName",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"addOns",params,undefined,true); 
			copyArgs(n,"ipAddressType",params,undefined,false); 
			
			copyArgs(msg,"instanceNames",params,undefined,true); 
			copyArgs(msg,"availabilityZone",params,undefined,false); 
			copyArgs(msg,"customImageName",params,undefined,false); 
			copyArgs(msg,"blueprintId",params,undefined,false); 
			copyArgs(msg,"bundleId",params,undefined,false); 
			copyArgs(msg,"userData",params,undefined,false); 
			copyArgs(msg,"keyPairName",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"addOns",params,undefined,true); 
			copyArgs(msg,"ipAddressType",params,undefined,false); 
			

			svc.createInstances(params,cb);
		}
			service.CreateInstancesFromSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"instanceNames",params,undefined,true); 
			copyArgs(n,"availabilityZone",params,undefined,false); 
			copyArgs(n,"bundleId",params,undefined,false); 
			
			copyArgs(n,"instanceNames",params,undefined,true); 
			copyArgs(n,"attachedDiskMapping",params,undefined,false); 
			copyArgs(n,"availabilityZone",params,undefined,false); 
			copyArgs(n,"instanceSnapshotName",params,undefined,false); 
			copyArgs(n,"bundleId",params,undefined,false); 
			copyArgs(n,"userData",params,undefined,false); 
			copyArgs(n,"keyPairName",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"addOns",params,undefined,true); 
			copyArgs(n,"ipAddressType",params,undefined,false); 
			copyArgs(n,"sourceInstanceName",params,undefined,false); 
			copyArgs(n,"restoreDate",params,undefined,false); 
			copyArgs(Boolean(n),"useLatestRestorableAutoSnapshot",params,undefined,false); 
			
			copyArgs(msg,"instanceNames",params,undefined,true); 
			copyArgs(msg,"attachedDiskMapping",params,undefined,false); 
			copyArgs(msg,"availabilityZone",params,undefined,false); 
			copyArgs(msg,"instanceSnapshotName",params,undefined,false); 
			copyArgs(msg,"bundleId",params,undefined,false); 
			copyArgs(msg,"userData",params,undefined,false); 
			copyArgs(msg,"keyPairName",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"addOns",params,undefined,true); 
			copyArgs(msg,"ipAddressType",params,undefined,false); 
			copyArgs(msg,"sourceInstanceName",params,undefined,false); 
			copyArgs(msg,"restoreDate",params,undefined,false); 
			copyArgs(msg,"useLatestRestorableAutoSnapshot",params,undefined,false); 
			

			svc.createInstancesFromSnapshot(params,cb);
		}
			service.CreateKeyPair=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"keyPairName",params,undefined,false); 
			
			copyArgs(n,"keyPairName",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"keyPairName",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createKeyPair(params,cb);
		}
			service.CreateLoadBalancer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"loadBalancerName",params,undefined,false); 
			copyArgs(Number(n),"instancePort",params,undefined,false); 
			
			copyArgs(n,"loadBalancerName",params,undefined,false); 
			copyArgs(Number(n),"instancePort",params,undefined,false); 
			copyArgs(n,"healthCheckPath",params,undefined,false); 
			copyArgs(n,"certificateName",params,undefined,false); 
			copyArgs(n,"certificateDomainName",params,undefined,false); 
			copyArgs(n,"certificateAlternativeNames",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"ipAddressType",params,undefined,false); 
			
			copyArgs(msg,"loadBalancerName",params,undefined,false); 
			copyArgs(msg,"instancePort",params,undefined,false); 
			copyArgs(msg,"healthCheckPath",params,undefined,false); 
			copyArgs(msg,"certificateName",params,undefined,false); 
			copyArgs(msg,"certificateDomainName",params,undefined,false); 
			copyArgs(msg,"certificateAlternativeNames",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"ipAddressType",params,undefined,false); 
			

			svc.createLoadBalancer(params,cb);
		}
			service.CreateLoadBalancerTlsCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"loadBalancerName",params,undefined,false); 
			copyArgs(n,"certificateName",params,undefined,false); 
			copyArgs(n,"certificateDomainName",params,undefined,false); 
			
			copyArgs(n,"loadBalancerName",params,undefined,false); 
			copyArgs(n,"certificateName",params,undefined,false); 
			copyArgs(n,"certificateDomainName",params,undefined,false); 
			copyArgs(n,"certificateAlternativeNames",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"loadBalancerName",params,undefined,false); 
			copyArgs(msg,"certificateName",params,undefined,false); 
			copyArgs(msg,"certificateDomainName",params,undefined,false); 
			copyArgs(msg,"certificateAlternativeNames",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createLoadBalancerTlsCertificate(params,cb);
		}
			service.CreateRelationalDatabase=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			copyArgs(n,"relationalDatabaseBlueprintId",params,undefined,false); 
			copyArgs(n,"relationalDatabaseBundleId",params,undefined,false); 
			copyArgs(n,"masterDatabaseName",params,undefined,false); 
			copyArgs(n,"masterUsername",params,undefined,false); 
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			copyArgs(n,"availabilityZone",params,undefined,false); 
			copyArgs(n,"relationalDatabaseBlueprintId",params,undefined,false); 
			copyArgs(n,"relationalDatabaseBundleId",params,undefined,false); 
			copyArgs(n,"masterDatabaseName",params,undefined,false); 
			copyArgs(n,"masterUsername",params,undefined,false); 
			copyArgs(n,"masterUserPassword",params,undefined,true); 
			copyArgs(n,"preferredBackupWindow",params,undefined,false); 
			copyArgs(n,"preferredMaintenanceWindow",params,undefined,false); 
			copyArgs(Boolean(n),"publiclyAccessible",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"relationalDatabaseName",params,undefined,false); 
			copyArgs(msg,"availabilityZone",params,undefined,false); 
			copyArgs(msg,"relationalDatabaseBlueprintId",params,undefined,false); 
			copyArgs(msg,"relationalDatabaseBundleId",params,undefined,false); 
			copyArgs(msg,"masterDatabaseName",params,undefined,false); 
			copyArgs(msg,"masterUsername",params,undefined,false); 
			copyArgs(msg,"masterUserPassword",params,undefined,true); 
			copyArgs(msg,"preferredBackupWindow",params,undefined,false); 
			copyArgs(msg,"preferredMaintenanceWindow",params,undefined,false); 
			copyArgs(msg,"publiclyAccessible",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createRelationalDatabase(params,cb);
		}
			service.CreateRelationalDatabaseFromSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			copyArgs(n,"availabilityZone",params,undefined,false); 
			copyArgs(Boolean(n),"publiclyAccessible",params,undefined,false); 
			copyArgs(n,"relationalDatabaseSnapshotName",params,undefined,false); 
			copyArgs(n,"relationalDatabaseBundleId",params,undefined,false); 
			copyArgs(n,"sourceRelationalDatabaseName",params,undefined,false); 
			copyArgs(n,"restoreTime",params,undefined,false); 
			copyArgs(Boolean(n),"useLatestRestorableTime",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"relationalDatabaseName",params,undefined,false); 
			copyArgs(msg,"availabilityZone",params,undefined,false); 
			copyArgs(msg,"publiclyAccessible",params,undefined,false); 
			copyArgs(msg,"relationalDatabaseSnapshotName",params,undefined,false); 
			copyArgs(msg,"relationalDatabaseBundleId",params,undefined,false); 
			copyArgs(msg,"sourceRelationalDatabaseName",params,undefined,false); 
			copyArgs(msg,"restoreTime",params,undefined,false); 
			copyArgs(msg,"useLatestRestorableTime",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createRelationalDatabaseFromSnapshot(params,cb);
		}
			service.CreateRelationalDatabaseSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			copyArgs(n,"relationalDatabaseSnapshotName",params,undefined,false); 
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			copyArgs(n,"relationalDatabaseSnapshotName",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"relationalDatabaseName",params,undefined,false); 
			copyArgs(msg,"relationalDatabaseSnapshotName",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createRelationalDatabaseSnapshot(params,cb);
		}
			service.DeleteAlarm=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"alarmName",params,undefined,false); 
			
			copyArgs(n,"alarmName",params,undefined,false); 
			
			copyArgs(msg,"alarmName",params,undefined,false); 
			

			svc.deleteAlarm(params,cb);
		}
			service.DeleteAutoSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceName",params,undefined,false); 
			copyArgs(n,"date",params,undefined,false); 
			
			copyArgs(n,"resourceName",params,undefined,false); 
			copyArgs(n,"date",params,undefined,false); 
			
			copyArgs(msg,"resourceName",params,undefined,false); 
			copyArgs(msg,"date",params,undefined,false); 
			

			svc.deleteAutoSnapshot(params,cb);
		}
			service.DeleteBucket=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"bucketName",params,undefined,false); 
			
			copyArgs(n,"bucketName",params,undefined,false); 
			copyArgs(Boolean(n),"forceDelete",params,undefined,false); 
			
			copyArgs(msg,"bucketName",params,undefined,false); 
			copyArgs(msg,"forceDelete",params,undefined,false); 
			

			svc.deleteBucket(params,cb);
		}
			service.DeleteBucketAccessKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"bucketName",params,undefined,false); 
			copyArgs(n,"accessKeyId",params,undefined,false); 
			
			copyArgs(n,"bucketName",params,undefined,false); 
			copyArgs(n,"accessKeyId",params,undefined,false); 
			
			copyArgs(msg,"bucketName",params,undefined,false); 
			copyArgs(msg,"accessKeyId",params,undefined,false); 
			

			svc.deleteBucketAccessKey(params,cb);
		}
			service.DeleteCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"certificateName",params,undefined,false); 
			
			copyArgs(n,"certificateName",params,undefined,false); 
			
			copyArgs(msg,"certificateName",params,undefined,false); 
			

			svc.deleteCertificate(params,cb);
		}
			service.DeleteContactMethod=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"protocol",params,undefined,false); 
			
			copyArgs(n,"protocol",params,undefined,false); 
			
			copyArgs(msg,"protocol",params,undefined,false); 
			

			svc.deleteContactMethod(params,cb);
		}
			service.DeleteContainerImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"serviceName",params,undefined,false); 
			copyArgs(n,"image",params,undefined,false); 
			
			copyArgs(n,"serviceName",params,undefined,false); 
			copyArgs(n,"image",params,undefined,false); 
			
			copyArgs(msg,"serviceName",params,undefined,false); 
			copyArgs(msg,"image",params,undefined,false); 
			

			svc.deleteContainerImage(params,cb);
		}
			service.DeleteContainerService=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"serviceName",params,undefined,false); 
			
			copyArgs(n,"serviceName",params,undefined,false); 
			
			copyArgs(msg,"serviceName",params,undefined,false); 
			

			svc.deleteContainerService(params,cb);
		}
			service.DeleteDisk=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"diskName",params,undefined,false); 
			
			copyArgs(n,"diskName",params,undefined,false); 
			copyArgs(Boolean(n),"forceDeleteAddOns",params,undefined,false); 
			
			copyArgs(msg,"diskName",params,undefined,false); 
			copyArgs(msg,"forceDeleteAddOns",params,undefined,false); 
			

			svc.deleteDisk(params,cb);
		}
			service.DeleteDiskSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"diskSnapshotName",params,undefined,false); 
			
			copyArgs(n,"diskSnapshotName",params,undefined,false); 
			
			copyArgs(msg,"diskSnapshotName",params,undefined,false); 
			

			svc.deleteDiskSnapshot(params,cb);
		}
			service.DeleteDistribution=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"distributionName",params,undefined,false); 
			
			copyArgs(msg,"distributionName",params,undefined,false); 
			

			svc.deleteDistribution(params,cb);
		}
			service.DeleteDomain=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domainName",params,undefined,false); 
			
			copyArgs(n,"domainName",params,undefined,false); 
			
			copyArgs(msg,"domainName",params,undefined,false); 
			

			svc.deleteDomain(params,cb);
		}
			service.DeleteDomainEntry=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domainName",params,undefined,false); 
			copyArgs(n,"domainEntry",params,undefined,true); 
			
			copyArgs(n,"domainName",params,undefined,false); 
			copyArgs(n,"domainEntry",params,undefined,true); 
			
			copyArgs(msg,"domainName",params,undefined,false); 
			copyArgs(msg,"domainEntry",params,undefined,true); 
			

			svc.deleteDomainEntry(params,cb);
		}
			service.DeleteInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(n,"instanceName",params,undefined,false); 
			copyArgs(Boolean(n),"forceDeleteAddOns",params,undefined,false); 
			
			copyArgs(msg,"instanceName",params,undefined,false); 
			copyArgs(msg,"forceDeleteAddOns",params,undefined,false); 
			

			svc.deleteInstance(params,cb);
		}
			service.DeleteInstanceSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"instanceSnapshotName",params,undefined,false); 
			
			copyArgs(n,"instanceSnapshotName",params,undefined,false); 
			
			copyArgs(msg,"instanceSnapshotName",params,undefined,false); 
			

			svc.deleteInstanceSnapshot(params,cb);
		}
			service.DeleteKeyPair=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"keyPairName",params,undefined,false); 
			
			copyArgs(n,"keyPairName",params,undefined,false); 
			
			copyArgs(msg,"keyPairName",params,undefined,false); 
			

			svc.deleteKeyPair(params,cb);
		}
			service.DeleteKnownHostKeys=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(msg,"instanceName",params,undefined,false); 
			

			svc.deleteKnownHostKeys(params,cb);
		}
			service.DeleteLoadBalancer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"loadBalancerName",params,undefined,false); 
			
			copyArgs(n,"loadBalancerName",params,undefined,false); 
			
			copyArgs(msg,"loadBalancerName",params,undefined,false); 
			

			svc.deleteLoadBalancer(params,cb);
		}
			service.DeleteLoadBalancerTlsCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"loadBalancerName",params,undefined,false); 
			copyArgs(n,"certificateName",params,undefined,false); 
			
			copyArgs(n,"loadBalancerName",params,undefined,false); 
			copyArgs(n,"certificateName",params,undefined,false); 
			copyArgs(Boolean(n),"force",params,undefined,false); 
			
			copyArgs(msg,"loadBalancerName",params,undefined,false); 
			copyArgs(msg,"certificateName",params,undefined,false); 
			copyArgs(msg,"force",params,undefined,false); 
			

			svc.deleteLoadBalancerTlsCertificate(params,cb);
		}
			service.DeleteRelationalDatabase=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			copyArgs(Boolean(n),"skipFinalSnapshot",params,undefined,false); 
			copyArgs(n,"finalRelationalDatabaseSnapshotName",params,undefined,false); 
			
			copyArgs(msg,"relationalDatabaseName",params,undefined,false); 
			copyArgs(msg,"skipFinalSnapshot",params,undefined,false); 
			copyArgs(msg,"finalRelationalDatabaseSnapshotName",params,undefined,false); 
			

			svc.deleteRelationalDatabase(params,cb);
		}
			service.DeleteRelationalDatabaseSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"relationalDatabaseSnapshotName",params,undefined,false); 
			
			copyArgs(n,"relationalDatabaseSnapshotName",params,undefined,false); 
			
			copyArgs(msg,"relationalDatabaseSnapshotName",params,undefined,false); 
			

			svc.deleteRelationalDatabaseSnapshot(params,cb);
		}
			service.DetachCertificateFromDistribution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"distributionName",params,undefined,false); 
			
			copyArgs(n,"distributionName",params,undefined,false); 
			
			copyArgs(msg,"distributionName",params,undefined,false); 
			

			svc.detachCertificateFromDistribution(params,cb);
		}
			service.DetachDisk=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"diskName",params,undefined,false); 
			
			copyArgs(n,"diskName",params,undefined,false); 
			
			copyArgs(msg,"diskName",params,undefined,false); 
			

			svc.detachDisk(params,cb);
		}
			service.DetachInstancesFromLoadBalancer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"loadBalancerName",params,undefined,false); 
			copyArgs(n,"instanceNames",params,undefined,true); 
			
			copyArgs(n,"loadBalancerName",params,undefined,false); 
			copyArgs(n,"instanceNames",params,undefined,true); 
			
			copyArgs(msg,"loadBalancerName",params,undefined,false); 
			copyArgs(msg,"instanceNames",params,undefined,true); 
			

			svc.detachInstancesFromLoadBalancer(params,cb);
		}
			service.DetachStaticIp=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"staticIpName",params,undefined,false); 
			
			copyArgs(n,"staticIpName",params,undefined,false); 
			
			copyArgs(msg,"staticIpName",params,undefined,false); 
			

			svc.detachStaticIp(params,cb);
		}
			service.DisableAddOn=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"addOnType",params,undefined,false); 
			copyArgs(n,"resourceName",params,undefined,false); 
			
			copyArgs(n,"addOnType",params,undefined,false); 
			copyArgs(n,"resourceName",params,undefined,false); 
			
			copyArgs(msg,"addOnType",params,undefined,false); 
			copyArgs(msg,"resourceName",params,undefined,false); 
			

			svc.disableAddOn(params,cb);
		}
			service.DownloadDefaultKeyPair=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.downloadDefaultKeyPair(params,cb);
		}
			service.EnableAddOn=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceName",params,undefined,false); 
			copyArgs(n,"addOnRequest",params,undefined,true); 
			
			copyArgs(n,"resourceName",params,undefined,false); 
			copyArgs(n,"addOnRequest",params,undefined,true); 
			
			copyArgs(msg,"resourceName",params,undefined,false); 
			copyArgs(msg,"addOnRequest",params,undefined,true); 
			

			svc.enableAddOn(params,cb);
		}
			service.ExportSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"sourceSnapshotName",params,undefined,false); 
			
			copyArgs(n,"sourceSnapshotName",params,undefined,false); 
			
			copyArgs(msg,"sourceSnapshotName",params,undefined,false); 
			

			svc.exportSnapshot(params,cb);
		}
			service.GetActiveNames=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"pageToken",params,undefined,false); 
			
			copyArgs(msg,"pageToken",params,undefined,false); 
			

			svc.getActiveNames(params,cb);
		}
			service.GetAlarms=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"alarmName",params,undefined,false); 
			copyArgs(n,"pageToken",params,undefined,false); 
			copyArgs(n,"monitoredResourceName",params,undefined,false); 
			
			copyArgs(msg,"alarmName",params,undefined,false); 
			copyArgs(msg,"pageToken",params,undefined,false); 
			copyArgs(msg,"monitoredResourceName",params,undefined,false); 
			

			svc.getAlarms(params,cb);
		}
			service.GetAutoSnapshots=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceName",params,undefined,false); 
			
			copyArgs(n,"resourceName",params,undefined,false); 
			
			copyArgs(msg,"resourceName",params,undefined,false); 
			

			svc.getAutoSnapshots(params,cb);
		}
			service.GetBlueprints=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"includeInactive",params,undefined,false); 
			copyArgs(n,"pageToken",params,undefined,false); 
			
			copyArgs(msg,"includeInactive",params,undefined,false); 
			copyArgs(msg,"pageToken",params,undefined,false); 
			

			svc.getBlueprints(params,cb);
		}
			service.GetBucketAccessKeys=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"bucketName",params,undefined,false); 
			
			copyArgs(n,"bucketName",params,undefined,false); 
			
			copyArgs(msg,"bucketName",params,undefined,false); 
			

			svc.getBucketAccessKeys(params,cb);
		}
			service.GetBucketBundles=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"includeInactive",params,undefined,false); 
			
			copyArgs(msg,"includeInactive",params,undefined,false); 
			

			svc.getBucketBundles(params,cb);
		}
			service.GetBucketMetricData=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"bucketName",params,undefined,false); 
			copyArgs(n,"metricName",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(Number(n),"period",params,undefined,false); 
			copyArgs(n,"statistics",params,undefined,true); 
			copyArgs(n,"unit",params,undefined,false); 
			
			copyArgs(n,"bucketName",params,undefined,false); 
			copyArgs(n,"metricName",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(Number(n),"period",params,undefined,false); 
			copyArgs(n,"statistics",params,undefined,true); 
			copyArgs(n,"unit",params,undefined,false); 
			
			copyArgs(msg,"bucketName",params,undefined,false); 
			copyArgs(msg,"metricName",params,undefined,false); 
			copyArgs(msg,"startTime",params,undefined,false); 
			copyArgs(msg,"endTime",params,undefined,false); 
			copyArgs(msg,"period",params,undefined,false); 
			copyArgs(msg,"statistics",params,undefined,true); 
			copyArgs(msg,"unit",params,undefined,false); 
			

			svc.getBucketMetricData(params,cb);
		}
			service.GetBuckets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"bucketName",params,undefined,false); 
			copyArgs(n,"pageToken",params,undefined,false); 
			copyArgs(Boolean(n),"includeConnectedResources",params,undefined,false); 
			
			copyArgs(msg,"bucketName",params,undefined,false); 
			copyArgs(msg,"pageToken",params,undefined,false); 
			copyArgs(msg,"includeConnectedResources",params,undefined,false); 
			

			svc.getBuckets(params,cb);
		}
			service.GetBundles=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"includeInactive",params,undefined,false); 
			copyArgs(n,"pageToken",params,undefined,false); 
			
			copyArgs(msg,"includeInactive",params,undefined,false); 
			copyArgs(msg,"pageToken",params,undefined,false); 
			

			svc.getBundles(params,cb);
		}
			service.GetCertificates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"certificateStatuses",params,undefined,false); 
			copyArgs(Boolean(n),"includeCertificateDetails",params,undefined,false); 
			copyArgs(n,"certificateName",params,undefined,false); 
			
			copyArgs(msg,"certificateStatuses",params,undefined,false); 
			copyArgs(msg,"includeCertificateDetails",params,undefined,false); 
			copyArgs(msg,"certificateName",params,undefined,false); 
			

			svc.getCertificates(params,cb);
		}
			service.GetCloudFormationStackRecords=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"pageToken",params,undefined,false); 
			
			copyArgs(msg,"pageToken",params,undefined,false); 
			

			svc.getCloudFormationStackRecords(params,cb);
		}
			service.GetContactMethods=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"protocols",params,undefined,true); 
			
			copyArgs(msg,"protocols",params,undefined,true); 
			

			svc.getContactMethods(params,cb);
		}
			service.GetContainerAPIMetadata=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getContainerAPIMetadata(params,cb);
		}
			service.GetContainerImages=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"serviceName",params,undefined,false); 
			
			copyArgs(n,"serviceName",params,undefined,false); 
			
			copyArgs(msg,"serviceName",params,undefined,false); 
			

			svc.getContainerImages(params,cb);
		}
			service.GetContainerLog=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"serviceName",params,undefined,false); 
			copyArgs(n,"containerName",params,undefined,false); 
			
			copyArgs(n,"serviceName",params,undefined,false); 
			copyArgs(n,"containerName",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(n,"filterPattern",params,undefined,false); 
			copyArgs(n,"pageToken",params,undefined,false); 
			
			copyArgs(msg,"serviceName",params,undefined,false); 
			copyArgs(msg,"containerName",params,undefined,false); 
			copyArgs(msg,"startTime",params,undefined,false); 
			copyArgs(msg,"endTime",params,undefined,false); 
			copyArgs(msg,"filterPattern",params,undefined,false); 
			copyArgs(msg,"pageToken",params,undefined,false); 
			

			svc.getContainerLog(params,cb);
		}
			service.GetContainerServiceDeployments=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"serviceName",params,undefined,false); 
			
			copyArgs(n,"serviceName",params,undefined,false); 
			
			copyArgs(msg,"serviceName",params,undefined,false); 
			

			svc.getContainerServiceDeployments(params,cb);
		}
			service.GetContainerServiceMetricData=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"serviceName",params,undefined,false); 
			copyArgs(n,"metricName",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(Number(n),"period",params,undefined,false); 
			copyArgs(n,"statistics",params,undefined,true); 
			
			copyArgs(n,"serviceName",params,undefined,false); 
			copyArgs(n,"metricName",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(Number(n),"period",params,undefined,false); 
			copyArgs(n,"statistics",params,undefined,true); 
			
			copyArgs(msg,"serviceName",params,undefined,false); 
			copyArgs(msg,"metricName",params,undefined,false); 
			copyArgs(msg,"startTime",params,undefined,false); 
			copyArgs(msg,"endTime",params,undefined,false); 
			copyArgs(msg,"period",params,undefined,false); 
			copyArgs(msg,"statistics",params,undefined,true); 
			

			svc.getContainerServiceMetricData(params,cb);
		}
			service.GetContainerServicePowers=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getContainerServicePowers(params,cb);
		}
			service.GetContainerServices=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"serviceName",params,undefined,false); 
			
			copyArgs(msg,"serviceName",params,undefined,false); 
			

			svc.getContainerServices(params,cb);
		}
			service.GetDisk=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"diskName",params,undefined,false); 
			
			copyArgs(n,"diskName",params,undefined,false); 
			
			copyArgs(msg,"diskName",params,undefined,false); 
			

			svc.getDisk(params,cb);
		}
			service.GetDiskSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"diskSnapshotName",params,undefined,false); 
			
			copyArgs(n,"diskSnapshotName",params,undefined,false); 
			
			copyArgs(msg,"diskSnapshotName",params,undefined,false); 
			

			svc.getDiskSnapshot(params,cb);
		}
			service.GetDiskSnapshots=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"pageToken",params,undefined,false); 
			
			copyArgs(msg,"pageToken",params,undefined,false); 
			

			svc.getDiskSnapshots(params,cb);
		}
			service.GetDisks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"pageToken",params,undefined,false); 
			
			copyArgs(msg,"pageToken",params,undefined,false); 
			

			svc.getDisks(params,cb);
		}
			service.GetDistributionBundles=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getDistributionBundles(params,cb);
		}
			service.GetDistributionLatestCacheReset=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"distributionName",params,undefined,false); 
			
			copyArgs(msg,"distributionName",params,undefined,false); 
			

			svc.getDistributionLatestCacheReset(params,cb);
		}
			service.GetDistributionMetricData=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"distributionName",params,undefined,false); 
			copyArgs(n,"metricName",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(Number(n),"period",params,undefined,false); 
			copyArgs(n,"unit",params,undefined,false); 
			copyArgs(n,"statistics",params,undefined,true); 
			
			copyArgs(n,"distributionName",params,undefined,false); 
			copyArgs(n,"metricName",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(Number(n),"period",params,undefined,false); 
			copyArgs(n,"unit",params,undefined,false); 
			copyArgs(n,"statistics",params,undefined,true); 
			
			copyArgs(msg,"distributionName",params,undefined,false); 
			copyArgs(msg,"metricName",params,undefined,false); 
			copyArgs(msg,"startTime",params,undefined,false); 
			copyArgs(msg,"endTime",params,undefined,false); 
			copyArgs(msg,"period",params,undefined,false); 
			copyArgs(msg,"unit",params,undefined,false); 
			copyArgs(msg,"statistics",params,undefined,true); 
			

			svc.getDistributionMetricData(params,cb);
		}
			service.GetDistributions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"distributionName",params,undefined,false); 
			copyArgs(n,"pageToken",params,undefined,false); 
			
			copyArgs(msg,"distributionName",params,undefined,false); 
			copyArgs(msg,"pageToken",params,undefined,false); 
			

			svc.getDistributions(params,cb);
		}
			service.GetDomain=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domainName",params,undefined,false); 
			
			copyArgs(n,"domainName",params,undefined,false); 
			
			copyArgs(msg,"domainName",params,undefined,false); 
			

			svc.getDomain(params,cb);
		}
			service.GetDomains=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"pageToken",params,undefined,false); 
			
			copyArgs(msg,"pageToken",params,undefined,false); 
			

			svc.getDomains(params,cb);
		}
			service.GetExportSnapshotRecords=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"pageToken",params,undefined,false); 
			
			copyArgs(msg,"pageToken",params,undefined,false); 
			

			svc.getExportSnapshotRecords(params,cb);
		}
			service.GetInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(msg,"instanceName",params,undefined,false); 
			

			svc.getInstance(params,cb);
		}
			service.GetInstanceAccessDetails=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(n,"instanceName",params,undefined,false); 
			copyArgs(n,"protocol",params,undefined,false); 
			
			copyArgs(msg,"instanceName",params,undefined,false); 
			copyArgs(msg,"protocol",params,undefined,false); 
			

			svc.getInstanceAccessDetails(params,cb);
		}
			service.GetInstanceMetricData=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"instanceName",params,undefined,false); 
			copyArgs(n,"metricName",params,undefined,false); 
			copyArgs(Number(n),"period",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(n,"unit",params,undefined,false); 
			copyArgs(n,"statistics",params,undefined,true); 
			
			copyArgs(n,"instanceName",params,undefined,false); 
			copyArgs(n,"metricName",params,undefined,false); 
			copyArgs(Number(n),"period",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(n,"unit",params,undefined,false); 
			copyArgs(n,"statistics",params,undefined,true); 
			
			copyArgs(msg,"instanceName",params,undefined,false); 
			copyArgs(msg,"metricName",params,undefined,false); 
			copyArgs(msg,"period",params,undefined,false); 
			copyArgs(msg,"startTime",params,undefined,false); 
			copyArgs(msg,"endTime",params,undefined,false); 
			copyArgs(msg,"unit",params,undefined,false); 
			copyArgs(msg,"statistics",params,undefined,true); 
			

			svc.getInstanceMetricData(params,cb);
		}
			service.GetInstancePortStates=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(msg,"instanceName",params,undefined,false); 
			

			svc.getInstancePortStates(params,cb);
		}
			service.GetInstanceSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"instanceSnapshotName",params,undefined,false); 
			
			copyArgs(n,"instanceSnapshotName",params,undefined,false); 
			
			copyArgs(msg,"instanceSnapshotName",params,undefined,false); 
			

			svc.getInstanceSnapshot(params,cb);
		}
			service.GetInstanceSnapshots=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"pageToken",params,undefined,false); 
			
			copyArgs(msg,"pageToken",params,undefined,false); 
			

			svc.getInstanceSnapshots(params,cb);
		}
			service.GetInstanceState=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(msg,"instanceName",params,undefined,false); 
			

			svc.getInstanceState(params,cb);
		}
			service.GetInstances=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"pageToken",params,undefined,false); 
			
			copyArgs(msg,"pageToken",params,undefined,false); 
			

			svc.getInstances(params,cb);
		}
			service.GetKeyPair=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"keyPairName",params,undefined,false); 
			
			copyArgs(n,"keyPairName",params,undefined,false); 
			
			copyArgs(msg,"keyPairName",params,undefined,false); 
			

			svc.getKeyPair(params,cb);
		}
			service.GetKeyPairs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"pageToken",params,undefined,false); 
			
			copyArgs(msg,"pageToken",params,undefined,false); 
			

			svc.getKeyPairs(params,cb);
		}
			service.GetLoadBalancer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"loadBalancerName",params,undefined,false); 
			
			copyArgs(n,"loadBalancerName",params,undefined,false); 
			
			copyArgs(msg,"loadBalancerName",params,undefined,false); 
			

			svc.getLoadBalancer(params,cb);
		}
			service.GetLoadBalancerMetricData=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"loadBalancerName",params,undefined,false); 
			copyArgs(n,"metricName",params,undefined,false); 
			copyArgs(Number(n),"period",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(n,"unit",params,undefined,false); 
			copyArgs(n,"statistics",params,undefined,true); 
			
			copyArgs(n,"loadBalancerName",params,undefined,false); 
			copyArgs(n,"metricName",params,undefined,false); 
			copyArgs(Number(n),"period",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(n,"unit",params,undefined,false); 
			copyArgs(n,"statistics",params,undefined,true); 
			
			copyArgs(msg,"loadBalancerName",params,undefined,false); 
			copyArgs(msg,"metricName",params,undefined,false); 
			copyArgs(msg,"period",params,undefined,false); 
			copyArgs(msg,"startTime",params,undefined,false); 
			copyArgs(msg,"endTime",params,undefined,false); 
			copyArgs(msg,"unit",params,undefined,false); 
			copyArgs(msg,"statistics",params,undefined,true); 
			

			svc.getLoadBalancerMetricData(params,cb);
		}
			service.GetLoadBalancerTlsCertificates=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"loadBalancerName",params,undefined,false); 
			
			copyArgs(n,"loadBalancerName",params,undefined,false); 
			
			copyArgs(msg,"loadBalancerName",params,undefined,false); 
			

			svc.getLoadBalancerTlsCertificates(params,cb);
		}
			service.GetLoadBalancers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"pageToken",params,undefined,false); 
			
			copyArgs(msg,"pageToken",params,undefined,false); 
			

			svc.getLoadBalancers(params,cb);
		}
			service.GetOperation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"operationId",params,undefined,false); 
			
			copyArgs(n,"operationId",params,undefined,false); 
			
			copyArgs(msg,"operationId",params,undefined,false); 
			

			svc.getOperation(params,cb);
		}
			service.GetOperations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"pageToken",params,undefined,false); 
			
			copyArgs(msg,"pageToken",params,undefined,false); 
			

			svc.getOperations(params,cb);
		}
			service.GetOperationsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceName",params,undefined,false); 
			
			copyArgs(n,"resourceName",params,undefined,false); 
			copyArgs(n,"pageToken",params,undefined,false); 
			
			copyArgs(msg,"resourceName",params,undefined,false); 
			copyArgs(msg,"pageToken",params,undefined,false); 
			

			svc.getOperationsForResource(params,cb);
		}
			service.GetRegions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"includeAvailabilityZones",params,undefined,false); 
			copyArgs(Boolean(n),"includeRelationalDatabaseAvailabilityZones",params,undefined,false); 
			
			copyArgs(msg,"includeAvailabilityZones",params,undefined,false); 
			copyArgs(msg,"includeRelationalDatabaseAvailabilityZones",params,undefined,false); 
			

			svc.getRegions(params,cb);
		}
			service.GetRelationalDatabase=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			
			copyArgs(msg,"relationalDatabaseName",params,undefined,false); 
			

			svc.getRelationalDatabase(params,cb);
		}
			service.GetRelationalDatabaseBlueprints=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"pageToken",params,undefined,false); 
			
			copyArgs(msg,"pageToken",params,undefined,false); 
			

			svc.getRelationalDatabaseBlueprints(params,cb);
		}
			service.GetRelationalDatabaseBundles=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"pageToken",params,undefined,false); 
			
			copyArgs(msg,"pageToken",params,undefined,false); 
			

			svc.getRelationalDatabaseBundles(params,cb);
		}
			service.GetRelationalDatabaseEvents=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			copyArgs(Number(n),"durationInMinutes",params,undefined,false); 
			copyArgs(n,"pageToken",params,undefined,false); 
			
			copyArgs(msg,"relationalDatabaseName",params,undefined,false); 
			copyArgs(msg,"durationInMinutes",params,undefined,false); 
			copyArgs(msg,"pageToken",params,undefined,false); 
			

			svc.getRelationalDatabaseEvents(params,cb);
		}
			service.GetRelationalDatabaseLogEvents=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			copyArgs(n,"logStreamName",params,undefined,false); 
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			copyArgs(n,"logStreamName",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(Boolean(n),"startFromHead",params,undefined,false); 
			copyArgs(n,"pageToken",params,undefined,false); 
			
			copyArgs(msg,"relationalDatabaseName",params,undefined,false); 
			copyArgs(msg,"logStreamName",params,undefined,false); 
			copyArgs(msg,"startTime",params,undefined,false); 
			copyArgs(msg,"endTime",params,undefined,false); 
			copyArgs(msg,"startFromHead",params,undefined,false); 
			copyArgs(msg,"pageToken",params,undefined,false); 
			

			svc.getRelationalDatabaseLogEvents(params,cb);
		}
			service.GetRelationalDatabaseLogStreams=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			
			copyArgs(msg,"relationalDatabaseName",params,undefined,false); 
			

			svc.getRelationalDatabaseLogStreams(params,cb);
		}
			service.GetRelationalDatabaseMasterUserPassword=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			copyArgs(n,"passwordVersion",params,undefined,false); 
			
			copyArgs(msg,"relationalDatabaseName",params,undefined,false); 
			copyArgs(msg,"passwordVersion",params,undefined,false); 
			

			svc.getRelationalDatabaseMasterUserPassword(params,cb);
		}
			service.GetRelationalDatabaseMetricData=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			copyArgs(n,"metricName",params,undefined,false); 
			copyArgs(Number(n),"period",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(n,"unit",params,undefined,false); 
			copyArgs(n,"statistics",params,undefined,true); 
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			copyArgs(n,"metricName",params,undefined,false); 
			copyArgs(Number(n),"period",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(n,"unit",params,undefined,false); 
			copyArgs(n,"statistics",params,undefined,true); 
			
			copyArgs(msg,"relationalDatabaseName",params,undefined,false); 
			copyArgs(msg,"metricName",params,undefined,false); 
			copyArgs(msg,"period",params,undefined,false); 
			copyArgs(msg,"startTime",params,undefined,false); 
			copyArgs(msg,"endTime",params,undefined,false); 
			copyArgs(msg,"unit",params,undefined,false); 
			copyArgs(msg,"statistics",params,undefined,true); 
			

			svc.getRelationalDatabaseMetricData(params,cb);
		}
			service.GetRelationalDatabaseParameters=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			copyArgs(n,"pageToken",params,undefined,false); 
			
			copyArgs(msg,"relationalDatabaseName",params,undefined,false); 
			copyArgs(msg,"pageToken",params,undefined,false); 
			

			svc.getRelationalDatabaseParameters(params,cb);
		}
			service.GetRelationalDatabaseSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"relationalDatabaseSnapshotName",params,undefined,false); 
			
			copyArgs(n,"relationalDatabaseSnapshotName",params,undefined,false); 
			
			copyArgs(msg,"relationalDatabaseSnapshotName",params,undefined,false); 
			

			svc.getRelationalDatabaseSnapshot(params,cb);
		}
			service.GetRelationalDatabaseSnapshots=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"pageToken",params,undefined,false); 
			
			copyArgs(msg,"pageToken",params,undefined,false); 
			

			svc.getRelationalDatabaseSnapshots(params,cb);
		}
			service.GetRelationalDatabases=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"pageToken",params,undefined,false); 
			
			copyArgs(msg,"pageToken",params,undefined,false); 
			

			svc.getRelationalDatabases(params,cb);
		}
			service.GetStaticIp=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"staticIpName",params,undefined,false); 
			
			copyArgs(n,"staticIpName",params,undefined,false); 
			
			copyArgs(msg,"staticIpName",params,undefined,false); 
			

			svc.getStaticIp(params,cb);
		}
			service.GetStaticIps=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"pageToken",params,undefined,false); 
			
			copyArgs(msg,"pageToken",params,undefined,false); 
			

			svc.getStaticIps(params,cb);
		}
			service.ImportKeyPair=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"keyPairName",params,undefined,false); 
			copyArgs(n,"publicKeyBase64",params,undefined,false); 
			
			copyArgs(n,"keyPairName",params,undefined,false); 
			copyArgs(n,"publicKeyBase64",params,undefined,false); 
			
			copyArgs(msg,"keyPairName",params,undefined,false); 
			copyArgs(msg,"publicKeyBase64",params,undefined,false); 
			

			svc.importKeyPair(params,cb);
		}
			service.IsVpcPeered=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.isVpcPeered(params,cb);
		}
			service.OpenInstancePublicPorts=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"portInfo",params,undefined,true); 
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(n,"portInfo",params,undefined,true); 
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(msg,"portInfo",params,undefined,true); 
			copyArgs(msg,"instanceName",params,undefined,false); 
			

			svc.openInstancePublicPorts(params,cb);
		}
			service.PeerVpc=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.peerVpc(params,cb);
		}
			service.PutAlarm=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"alarmName",params,undefined,false); 
			copyArgs(n,"metricName",params,undefined,false); 
			copyArgs(n,"monitoredResourceName",params,undefined,false); 
			copyArgs(n,"comparisonOperator",params,undefined,false); 
			copyArgs(n,"threshold",params,undefined,false); 
			copyArgs(Number(n),"evaluationPeriods",params,undefined,false); 
			
			copyArgs(n,"alarmName",params,undefined,false); 
			copyArgs(n,"metricName",params,undefined,false); 
			copyArgs(n,"monitoredResourceName",params,undefined,false); 
			copyArgs(n,"comparisonOperator",params,undefined,false); 
			copyArgs(n,"threshold",params,undefined,false); 
			copyArgs(Number(n),"evaluationPeriods",params,undefined,false); 
			copyArgs(Number(n),"datapointsToAlarm",params,undefined,false); 
			copyArgs(n,"treatMissingData",params,undefined,false); 
			copyArgs(n,"contactProtocols",params,undefined,true); 
			copyArgs(n,"notificationTriggers",params,undefined,true); 
			copyArgs(Boolean(n),"notificationEnabled",params,undefined,false); 
			
			copyArgs(msg,"alarmName",params,undefined,false); 
			copyArgs(msg,"metricName",params,undefined,false); 
			copyArgs(msg,"monitoredResourceName",params,undefined,false); 
			copyArgs(msg,"comparisonOperator",params,undefined,false); 
			copyArgs(msg,"threshold",params,undefined,false); 
			copyArgs(msg,"evaluationPeriods",params,undefined,false); 
			copyArgs(msg,"datapointsToAlarm",params,undefined,false); 
			copyArgs(msg,"treatMissingData",params,undefined,false); 
			copyArgs(msg,"contactProtocols",params,undefined,true); 
			copyArgs(msg,"notificationTriggers",params,undefined,true); 
			copyArgs(msg,"notificationEnabled",params,undefined,false); 
			

			svc.putAlarm(params,cb);
		}
			service.PutInstancePublicPorts=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"portInfos",params,undefined,false); 
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(n,"portInfos",params,undefined,false); 
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(msg,"portInfos",params,undefined,false); 
			copyArgs(msg,"instanceName",params,undefined,false); 
			

			svc.putInstancePublicPorts(params,cb);
		}
			service.RebootInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(msg,"instanceName",params,undefined,false); 
			

			svc.rebootInstance(params,cb);
		}
			service.RebootRelationalDatabase=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			
			copyArgs(msg,"relationalDatabaseName",params,undefined,false); 
			

			svc.rebootRelationalDatabase(params,cb);
		}
			service.RegisterContainerImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"serviceName",params,undefined,false); 
			copyArgs(n,"label",params,undefined,false); 
			copyArgs(n,"digest",params,undefined,false); 
			
			copyArgs(n,"serviceName",params,undefined,false); 
			copyArgs(n,"label",params,undefined,false); 
			copyArgs(n,"digest",params,undefined,false); 
			
			copyArgs(msg,"serviceName",params,undefined,false); 
			copyArgs(msg,"label",params,undefined,false); 
			copyArgs(msg,"digest",params,undefined,false); 
			

			svc.registerContainerImage(params,cb);
		}
			service.ReleaseStaticIp=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"staticIpName",params,undefined,false); 
			
			copyArgs(n,"staticIpName",params,undefined,false); 
			
			copyArgs(msg,"staticIpName",params,undefined,false); 
			

			svc.releaseStaticIp(params,cb);
		}
			service.ResetDistributionCache=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"distributionName",params,undefined,false); 
			
			copyArgs(msg,"distributionName",params,undefined,false); 
			

			svc.resetDistributionCache(params,cb);
		}
			service.SendContactMethodVerification=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"protocol",params,undefined,false); 
			
			copyArgs(n,"protocol",params,undefined,false); 
			
			copyArgs(msg,"protocol",params,undefined,false); 
			

			svc.sendContactMethodVerification(params,cb);
		}
			service.SetIpAddressType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceType",params,undefined,false); 
			copyArgs(n,"resourceName",params,undefined,false); 
			copyArgs(n,"ipAddressType",params,undefined,false); 
			
			copyArgs(n,"resourceType",params,undefined,false); 
			copyArgs(n,"resourceName",params,undefined,false); 
			copyArgs(n,"ipAddressType",params,undefined,false); 
			
			copyArgs(msg,"resourceType",params,undefined,false); 
			copyArgs(msg,"resourceName",params,undefined,false); 
			copyArgs(msg,"ipAddressType",params,undefined,false); 
			

			svc.setIpAddressType(params,cb);
		}
			service.SetResourceAccessForBucket=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceName",params,undefined,false); 
			copyArgs(n,"bucketName",params,undefined,false); 
			copyArgs(n,"access",params,undefined,false); 
			
			copyArgs(n,"resourceName",params,undefined,false); 
			copyArgs(n,"bucketName",params,undefined,false); 
			copyArgs(n,"access",params,undefined,false); 
			
			copyArgs(msg,"resourceName",params,undefined,false); 
			copyArgs(msg,"bucketName",params,undefined,false); 
			copyArgs(msg,"access",params,undefined,false); 
			

			svc.setResourceAccessForBucket(params,cb);
		}
			service.StartInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(msg,"instanceName",params,undefined,false); 
			

			svc.startInstance(params,cb);
		}
			service.StartRelationalDatabase=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			
			copyArgs(msg,"relationalDatabaseName",params,undefined,false); 
			

			svc.startRelationalDatabase(params,cb);
		}
			service.StopInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"instanceName",params,undefined,false); 
			
			copyArgs(n,"instanceName",params,undefined,false); 
			copyArgs(Boolean(n),"force",params,undefined,false); 
			
			copyArgs(msg,"instanceName",params,undefined,false); 
			copyArgs(msg,"force",params,undefined,false); 
			

			svc.stopInstance(params,cb);
		}
			service.StopRelationalDatabase=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			copyArgs(n,"relationalDatabaseSnapshotName",params,undefined,false); 
			
			copyArgs(msg,"relationalDatabaseName",params,undefined,false); 
			copyArgs(msg,"relationalDatabaseSnapshotName",params,undefined,false); 
			

			svc.stopRelationalDatabase(params,cb);
		}
			service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceName",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(n,"resourceName",params,undefined,false); 
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"resourceName",params,undefined,false); 
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
			service.TestAlarm=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"alarmName",params,undefined,false); 
			copyArgs(n,"state",params,undefined,false); 
			
			copyArgs(n,"alarmName",params,undefined,false); 
			copyArgs(n,"state",params,undefined,false); 
			
			copyArgs(msg,"alarmName",params,undefined,false); 
			copyArgs(msg,"state",params,undefined,false); 
			

			svc.testAlarm(params,cb);
		}
			service.UnpeerVpc=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.unpeerVpc(params,cb);
		}
			service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceName",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(n,"resourceName",params,undefined,false); 
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(msg,"resourceName",params,undefined,false); 
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
			service.UpdateBucket=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"bucketName",params,undefined,false); 
			
			copyArgs(n,"bucketName",params,undefined,false); 
			copyArgs(n,"accessRules",params,undefined,true); 
			copyArgs(n,"versioning",params,undefined,false); 
			copyArgs(n,"readonlyAccessAccounts",params,undefined,true); 
			
			copyArgs(msg,"bucketName",params,undefined,false); 
			copyArgs(msg,"accessRules",params,undefined,true); 
			copyArgs(msg,"versioning",params,undefined,false); 
			copyArgs(msg,"readonlyAccessAccounts",params,undefined,true); 
			

			svc.updateBucket(params,cb);
		}
			service.UpdateBucketBundle=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"bucketName",params,undefined,false); 
			copyArgs(n,"bundleId",params,undefined,false); 
			
			copyArgs(n,"bucketName",params,undefined,false); 
			copyArgs(n,"bundleId",params,undefined,false); 
			
			copyArgs(msg,"bucketName",params,undefined,false); 
			copyArgs(msg,"bundleId",params,undefined,false); 
			

			svc.updateBucketBundle(params,cb);
		}
			service.UpdateContainerService=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"serviceName",params,undefined,false); 
			
			copyArgs(n,"serviceName",params,undefined,false); 
			copyArgs(n,"power",params,undefined,false); 
			copyArgs(Number(n),"scale",params,undefined,false); 
			copyArgs(Boolean(n),"isDisabled",params,undefined,false); 
			copyArgs(n,"publicDomainNames",params,undefined,true); 
			
			copyArgs(msg,"serviceName",params,undefined,false); 
			copyArgs(msg,"power",params,undefined,false); 
			copyArgs(msg,"scale",params,undefined,false); 
			copyArgs(msg,"isDisabled",params,undefined,false); 
			copyArgs(msg,"publicDomainNames",params,undefined,true); 
			

			svc.updateContainerService(params,cb);
		}
			service.UpdateDistribution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"distributionName",params,undefined,false); 
			
			copyArgs(n,"distributionName",params,undefined,false); 
			copyArgs(n,"origin",params,undefined,true); 
			copyArgs(n,"defaultCacheBehavior",params,undefined,true); 
			copyArgs(n,"cacheBehaviorSettings",params,undefined,true); 
			copyArgs(n,"cacheBehaviors",params,undefined,true); 
			copyArgs(Boolean(n),"isEnabled",params,undefined,false); 
			
			copyArgs(msg,"distributionName",params,undefined,false); 
			copyArgs(msg,"origin",params,undefined,true); 
			copyArgs(msg,"defaultCacheBehavior",params,undefined,true); 
			copyArgs(msg,"cacheBehaviorSettings",params,undefined,true); 
			copyArgs(msg,"cacheBehaviors",params,undefined,true); 
			copyArgs(msg,"isEnabled",params,undefined,false); 
			

			svc.updateDistribution(params,cb);
		}
			service.UpdateDistributionBundle=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"distributionName",params,undefined,false); 
			copyArgs(n,"bundleId",params,undefined,false); 
			
			copyArgs(msg,"distributionName",params,undefined,false); 
			copyArgs(msg,"bundleId",params,undefined,false); 
			

			svc.updateDistributionBundle(params,cb);
		}
			service.UpdateDomainEntry=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domainName",params,undefined,false); 
			copyArgs(n,"domainEntry",params,undefined,true); 
			
			copyArgs(n,"domainName",params,undefined,false); 
			copyArgs(n,"domainEntry",params,undefined,true); 
			
			copyArgs(msg,"domainName",params,undefined,false); 
			copyArgs(msg,"domainEntry",params,undefined,true); 
			

			svc.updateDomainEntry(params,cb);
		}
			service.UpdateLoadBalancerAttribute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"loadBalancerName",params,undefined,false); 
			copyArgs(n,"attributeName",params,undefined,false); 
			copyArgs(n,"attributeValue",params,undefined,false); 
			
			copyArgs(n,"loadBalancerName",params,undefined,false); 
			copyArgs(n,"attributeName",params,undefined,false); 
			copyArgs(n,"attributeValue",params,undefined,false); 
			
			copyArgs(msg,"loadBalancerName",params,undefined,false); 
			copyArgs(msg,"attributeName",params,undefined,false); 
			copyArgs(msg,"attributeValue",params,undefined,false); 
			

			svc.updateLoadBalancerAttribute(params,cb);
		}
			service.UpdateRelationalDatabase=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			copyArgs(n,"masterUserPassword",params,undefined,true); 
			copyArgs(Boolean(n),"rotateMasterUserPassword",params,undefined,false); 
			copyArgs(n,"preferredBackupWindow",params,undefined,false); 
			copyArgs(n,"preferredMaintenanceWindow",params,undefined,false); 
			copyArgs(Boolean(n),"enableBackupRetention",params,undefined,false); 
			copyArgs(Boolean(n),"disableBackupRetention",params,undefined,false); 
			copyArgs(Boolean(n),"publiclyAccessible",params,undefined,false); 
			copyArgs(Boolean(n),"applyImmediately",params,undefined,false); 
			copyArgs(n,"caCertificateIdentifier",params,undefined,false); 
			
			copyArgs(msg,"relationalDatabaseName",params,undefined,false); 
			copyArgs(msg,"masterUserPassword",params,undefined,true); 
			copyArgs(msg,"rotateMasterUserPassword",params,undefined,false); 
			copyArgs(msg,"preferredBackupWindow",params,undefined,false); 
			copyArgs(msg,"preferredMaintenanceWindow",params,undefined,false); 
			copyArgs(msg,"enableBackupRetention",params,undefined,false); 
			copyArgs(msg,"disableBackupRetention",params,undefined,false); 
			copyArgs(msg,"publiclyAccessible",params,undefined,false); 
			copyArgs(msg,"applyImmediately",params,undefined,false); 
			copyArgs(msg,"caCertificateIdentifier",params,undefined,false); 
			

			svc.updateRelationalDatabase(params,cb);
		}
			service.UpdateRelationalDatabaseParameters=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			copyArgs(n,"parameters",params,undefined,true); 
			
			copyArgs(n,"relationalDatabaseName",params,undefined,false); 
			copyArgs(n,"parameters",params,undefined,true); 
			
			copyArgs(msg,"relationalDatabaseName",params,undefined,false); 
			copyArgs(msg,"parameters",params,undefined,true); 
			

			svc.updateRelationalDatabaseParameters(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS Lightsail", AmazonAPINode);

};
