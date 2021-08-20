
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

		var awsService = new AWS.Lightsail( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Lightsail(msg.AWSConfig) : awsService;

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

		
		service.AllocateStaticIp=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"staticIpName",params,undefined,false); 
			
			copyArg(msg,"staticIpName",params,undefined,false); 
			

			svc.allocateStaticIp(params,cb);
		}

		
		service.AttachCertificateToDistribution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"distributionName",params,undefined,false); 
			copyArg(n,"certificateName",params,undefined,false); 
			
			copyArg(msg,"distributionName",params,undefined,false); 
			copyArg(msg,"certificateName",params,undefined,false); 
			

			svc.attachCertificateToDistribution(params,cb);
		}

		
		service.AttachDisk=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"diskName",params,undefined,false); 
			copyArg(n,"instanceName",params,undefined,false); 
			copyArg(n,"diskPath",params,undefined,false); 
			
			copyArg(msg,"diskName",params,undefined,false); 
			copyArg(msg,"instanceName",params,undefined,false); 
			copyArg(msg,"diskPath",params,undefined,false); 
			

			svc.attachDisk(params,cb);
		}

		
		service.AttachInstancesToLoadBalancer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"loadBalancerName",params,undefined,false); 
			copyArg(n,"instanceNames",params,undefined,true); 
			
			copyArg(msg,"loadBalancerName",params,undefined,false); 
			copyArg(msg,"instanceNames",params,undefined,true); 
			

			svc.attachInstancesToLoadBalancer(params,cb);
		}

		
		service.AttachLoadBalancerTlsCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"loadBalancerName",params,undefined,false); 
			copyArg(n,"certificateName",params,undefined,false); 
			
			copyArg(msg,"loadBalancerName",params,undefined,false); 
			copyArg(msg,"certificateName",params,undefined,false); 
			

			svc.attachLoadBalancerTlsCertificate(params,cb);
		}

		
		service.AttachStaticIp=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"staticIpName",params,undefined,false); 
			copyArg(n,"instanceName",params,undefined,false); 
			
			copyArg(msg,"staticIpName",params,undefined,false); 
			copyArg(msg,"instanceName",params,undefined,false); 
			

			svc.attachStaticIp(params,cb);
		}

		
		service.CloseInstancePublicPorts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"portInfo",params,undefined,true); 
			copyArg(n,"instanceName",params,undefined,false); 
			
			copyArg(msg,"portInfo",params,undefined,true); 
			copyArg(msg,"instanceName",params,undefined,false); 
			

			svc.closeInstancePublicPorts(params,cb);
		}

		
		service.CopySnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"targetSnapshotName",params,undefined,false); 
			copyArg(n,"sourceRegion",params,undefined,false); 
			
			copyArg(msg,"sourceSnapshotName",params,undefined,false); 
			copyArg(msg,"sourceResourceName",params,undefined,false); 
			copyArg(msg,"restoreDate",params,undefined,false); 
			copyArg(msg,"useLatestRestorableAutoSnapshot",params,undefined,false); 
			copyArg(msg,"targetSnapshotName",params,undefined,false); 
			copyArg(msg,"sourceRegion",params,undefined,false); 
			

			svc.copySnapshot(params,cb);
		}

		
		service.CreateBucket=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"bucketName",params,undefined,false); 
			copyArg(n,"bundleId",params,undefined,false); 
			
			copyArg(msg,"bucketName",params,undefined,false); 
			copyArg(msg,"bundleId",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"enableObjectVersioning",params,undefined,false); 
			

			svc.createBucket(params,cb);
		}

		
		service.CreateBucketAccessKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"bucketName",params,undefined,false); 
			
			copyArg(msg,"bucketName",params,undefined,false); 
			

			svc.createBucketAccessKey(params,cb);
		}

		
		service.CreateCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateName",params,undefined,false); 
			copyArg(n,"domainName",params,undefined,false); 
			
			copyArg(msg,"certificateName",params,undefined,false); 
			copyArg(msg,"domainName",params,undefined,false); 
			copyArg(msg,"subjectAlternativeNames",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createCertificate(params,cb);
		}

		
		service.CreateCloudFormationStack=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"instances",params,undefined,false); 
			
			copyArg(msg,"instances",params,undefined,false); 
			

			svc.createCloudFormationStack(params,cb);
		}

		
		service.CreateContactMethod=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"protocol",params,undefined,false); 
			copyArg(n,"contactEndpoint",params,undefined,false); 
			
			copyArg(msg,"protocol",params,undefined,false); 
			copyArg(msg,"contactEndpoint",params,undefined,false); 
			

			svc.createContactMethod(params,cb);
		}

		
		service.CreateContainerService=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"serviceName",params,undefined,false); 
			copyArg(n,"power",params,undefined,false); 
			copyArg(n,"scale",params,undefined,false); 
			
			copyArg(msg,"serviceName",params,undefined,false); 
			copyArg(msg,"power",params,undefined,false); 
			copyArg(msg,"scale",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"publicDomainNames",params,undefined,true); 
			copyArg(msg,"deployment",params,undefined,false); 
			

			svc.createContainerService(params,cb);
		}

		
		service.CreateContainerServiceDeployment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"serviceName",params,undefined,false); 
			
			copyArg(msg,"serviceName",params,undefined,false); 
			copyArg(msg,"containers",params,undefined,true); 
			copyArg(msg,"publicEndpoint",params,undefined,true); 
			

			svc.createContainerServiceDeployment(params,cb);
		}

		
		service.CreateContainerServiceRegistryLogin=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.createContainerServiceRegistryLogin(params,cb);
		}

		
		service.CreateDisk=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"diskName",params,undefined,false); 
			copyArg(n,"availabilityZone",params,undefined,false); 
			copyArg(n,"sizeInGb",params,undefined,false); 
			
			copyArg(msg,"diskName",params,undefined,false); 
			copyArg(msg,"availabilityZone",params,undefined,false); 
			copyArg(msg,"sizeInGb",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"addOns",params,undefined,true); 
			

			svc.createDisk(params,cb);
		}

		
		service.CreateDiskFromSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"diskName",params,undefined,false); 
			copyArg(n,"availabilityZone",params,undefined,false); 
			copyArg(n,"sizeInGb",params,undefined,false); 
			
			copyArg(msg,"diskName",params,undefined,false); 
			copyArg(msg,"diskSnapshotName",params,undefined,false); 
			copyArg(msg,"availabilityZone",params,undefined,false); 
			copyArg(msg,"sizeInGb",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"addOns",params,undefined,true); 
			copyArg(msg,"sourceDiskName",params,undefined,false); 
			copyArg(msg,"restoreDate",params,undefined,false); 
			copyArg(msg,"useLatestRestorableAutoSnapshot",params,undefined,false); 
			

			svc.createDiskFromSnapshot(params,cb);
		}

		
		service.CreateDiskSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"diskSnapshotName",params,undefined,false); 
			
			copyArg(msg,"diskName",params,undefined,false); 
			copyArg(msg,"diskSnapshotName",params,undefined,false); 
			copyArg(msg,"instanceName",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createDiskSnapshot(params,cb);
		}

		
		service.CreateDistribution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"distributionName",params,undefined,false); 
			copyArg(n,"origin",params,undefined,true); 
			copyArg(n,"defaultCacheBehavior",params,undefined,true); 
			copyArg(n,"bundleId",params,undefined,false); 
			
			copyArg(msg,"distributionName",params,undefined,false); 
			copyArg(msg,"origin",params,undefined,true); 
			copyArg(msg,"defaultCacheBehavior",params,undefined,true); 
			copyArg(msg,"cacheBehaviorSettings",params,undefined,true); 
			copyArg(msg,"cacheBehaviors",params,undefined,true); 
			copyArg(msg,"bundleId",params,undefined,false); 
			copyArg(msg,"ipAddressType",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createDistribution(params,cb);
		}

		
		service.CreateDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domainName",params,undefined,false); 
			
			copyArg(msg,"domainName",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createDomain(params,cb);
		}

		
		service.CreateDomainEntry=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domainName",params,undefined,false); 
			copyArg(n,"domainEntry",params,undefined,true); 
			
			copyArg(msg,"domainName",params,undefined,false); 
			copyArg(msg,"domainEntry",params,undefined,true); 
			

			svc.createDomainEntry(params,cb);
		}

		
		service.CreateInstanceSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"instanceSnapshotName",params,undefined,false); 
			copyArg(n,"instanceName",params,undefined,false); 
			
			copyArg(msg,"instanceSnapshotName",params,undefined,false); 
			copyArg(msg,"instanceName",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createInstanceSnapshot(params,cb);
		}

		
		service.CreateInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"instanceNames",params,undefined,true); 
			copyArg(n,"availabilityZone",params,undefined,false); 
			copyArg(n,"blueprintId",params,undefined,false); 
			copyArg(n,"bundleId",params,undefined,false); 
			
			copyArg(msg,"instanceNames",params,undefined,true); 
			copyArg(msg,"availabilityZone",params,undefined,false); 
			copyArg(msg,"customImageName",params,undefined,false); 
			copyArg(msg,"blueprintId",params,undefined,false); 
			copyArg(msg,"bundleId",params,undefined,false); 
			copyArg(msg,"userData",params,undefined,false); 
			copyArg(msg,"keyPairName",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"addOns",params,undefined,true); 
			copyArg(msg,"ipAddressType",params,undefined,false); 
			

			svc.createInstances(params,cb);
		}

		
		service.CreateInstancesFromSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"instanceNames",params,undefined,true); 
			copyArg(n,"availabilityZone",params,undefined,false); 
			copyArg(n,"bundleId",params,undefined,false); 
			
			copyArg(msg,"instanceNames",params,undefined,true); 
			copyArg(msg,"attachedDiskMapping",params,undefined,false); 
			copyArg(msg,"availabilityZone",params,undefined,false); 
			copyArg(msg,"instanceSnapshotName",params,undefined,false); 
			copyArg(msg,"bundleId",params,undefined,false); 
			copyArg(msg,"userData",params,undefined,false); 
			copyArg(msg,"keyPairName",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"addOns",params,undefined,true); 
			copyArg(msg,"ipAddressType",params,undefined,false); 
			copyArg(msg,"sourceInstanceName",params,undefined,false); 
			copyArg(msg,"restoreDate",params,undefined,false); 
			copyArg(msg,"useLatestRestorableAutoSnapshot",params,undefined,false); 
			

			svc.createInstancesFromSnapshot(params,cb);
		}

		
		service.CreateKeyPair=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"keyPairName",params,undefined,false); 
			
			copyArg(msg,"keyPairName",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createKeyPair(params,cb);
		}

		
		service.CreateLoadBalancer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"loadBalancerName",params,undefined,false); 
			copyArg(n,"instancePort",params,undefined,false); 
			
			copyArg(msg,"loadBalancerName",params,undefined,false); 
			copyArg(msg,"instancePort",params,undefined,false); 
			copyArg(msg,"healthCheckPath",params,undefined,false); 
			copyArg(msg,"certificateName",params,undefined,false); 
			copyArg(msg,"certificateDomainName",params,undefined,false); 
			copyArg(msg,"certificateAlternativeNames",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"ipAddressType",params,undefined,false); 
			

			svc.createLoadBalancer(params,cb);
		}

		
		service.CreateLoadBalancerTlsCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"loadBalancerName",params,undefined,false); 
			copyArg(n,"certificateName",params,undefined,false); 
			copyArg(n,"certificateDomainName",params,undefined,false); 
			
			copyArg(msg,"loadBalancerName",params,undefined,false); 
			copyArg(msg,"certificateName",params,undefined,false); 
			copyArg(msg,"certificateDomainName",params,undefined,false); 
			copyArg(msg,"certificateAlternativeNames",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createLoadBalancerTlsCertificate(params,cb);
		}

		
		service.CreateRelationalDatabase=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"relationalDatabaseName",params,undefined,false); 
			copyArg(n,"relationalDatabaseBlueprintId",params,undefined,false); 
			copyArg(n,"relationalDatabaseBundleId",params,undefined,false); 
			copyArg(n,"masterDatabaseName",params,undefined,false); 
			copyArg(n,"masterUsername",params,undefined,false); 
			
			copyArg(msg,"relationalDatabaseName",params,undefined,false); 
			copyArg(msg,"availabilityZone",params,undefined,false); 
			copyArg(msg,"relationalDatabaseBlueprintId",params,undefined,false); 
			copyArg(msg,"relationalDatabaseBundleId",params,undefined,false); 
			copyArg(msg,"masterDatabaseName",params,undefined,false); 
			copyArg(msg,"masterUsername",params,undefined,false); 
			copyArg(msg,"masterUserPassword",params,undefined,true); 
			copyArg(msg,"preferredBackupWindow",params,undefined,false); 
			copyArg(msg,"preferredMaintenanceWindow",params,undefined,false); 
			copyArg(msg,"publiclyAccessible",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createRelationalDatabase(params,cb);
		}

		
		service.CreateRelationalDatabaseFromSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"relationalDatabaseName",params,undefined,false); 
			
			copyArg(msg,"relationalDatabaseName",params,undefined,false); 
			copyArg(msg,"availabilityZone",params,undefined,false); 
			copyArg(msg,"publiclyAccessible",params,undefined,false); 
			copyArg(msg,"relationalDatabaseSnapshotName",params,undefined,false); 
			copyArg(msg,"relationalDatabaseBundleId",params,undefined,false); 
			copyArg(msg,"sourceRelationalDatabaseName",params,undefined,false); 
			copyArg(msg,"restoreTime",params,undefined,false); 
			copyArg(msg,"useLatestRestorableTime",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createRelationalDatabaseFromSnapshot(params,cb);
		}

		
		service.CreateRelationalDatabaseSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"relationalDatabaseName",params,undefined,false); 
			copyArg(n,"relationalDatabaseSnapshotName",params,undefined,false); 
			
			copyArg(msg,"relationalDatabaseName",params,undefined,false); 
			copyArg(msg,"relationalDatabaseSnapshotName",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createRelationalDatabaseSnapshot(params,cb);
		}

		
		service.DeleteAlarm=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"alarmName",params,undefined,false); 
			
			copyArg(msg,"alarmName",params,undefined,false); 
			

			svc.deleteAlarm(params,cb);
		}

		
		service.DeleteAutoSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceName",params,undefined,false); 
			copyArg(n,"date",params,undefined,false); 
			
			copyArg(msg,"resourceName",params,undefined,false); 
			copyArg(msg,"date",params,undefined,false); 
			

			svc.deleteAutoSnapshot(params,cb);
		}

		
		service.DeleteBucket=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"bucketName",params,undefined,false); 
			
			copyArg(msg,"bucketName",params,undefined,false); 
			copyArg(msg,"forceDelete",params,undefined,false); 
			

			svc.deleteBucket(params,cb);
		}

		
		service.DeleteBucketAccessKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"bucketName",params,undefined,false); 
			copyArg(n,"accessKeyId",params,undefined,false); 
			
			copyArg(msg,"bucketName",params,undefined,false); 
			copyArg(msg,"accessKeyId",params,undefined,false); 
			

			svc.deleteBucketAccessKey(params,cb);
		}

		
		service.DeleteCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateName",params,undefined,false); 
			
			copyArg(msg,"certificateName",params,undefined,false); 
			

			svc.deleteCertificate(params,cb);
		}

		
		service.DeleteContactMethod=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"protocol",params,undefined,false); 
			
			copyArg(msg,"protocol",params,undefined,false); 
			

			svc.deleteContactMethod(params,cb);
		}

		
		service.DeleteContainerImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"serviceName",params,undefined,false); 
			copyArg(n,"image",params,undefined,false); 
			
			copyArg(msg,"serviceName",params,undefined,false); 
			copyArg(msg,"image",params,undefined,false); 
			

			svc.deleteContainerImage(params,cb);
		}

		
		service.DeleteContainerService=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"serviceName",params,undefined,false); 
			
			copyArg(msg,"serviceName",params,undefined,false); 
			

			svc.deleteContainerService(params,cb);
		}

		
		service.DeleteDisk=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"diskName",params,undefined,false); 
			
			copyArg(msg,"diskName",params,undefined,false); 
			copyArg(msg,"forceDeleteAddOns",params,undefined,false); 
			

			svc.deleteDisk(params,cb);
		}

		
		service.DeleteDiskSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"diskSnapshotName",params,undefined,false); 
			
			copyArg(msg,"diskSnapshotName",params,undefined,false); 
			

			svc.deleteDiskSnapshot(params,cb);
		}

		
		service.DeleteDistribution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"distributionName",params,undefined,false); 
			

			svc.deleteDistribution(params,cb);
		}

		
		service.DeleteDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domainName",params,undefined,false); 
			
			copyArg(msg,"domainName",params,undefined,false); 
			

			svc.deleteDomain(params,cb);
		}

		
		service.DeleteDomainEntry=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domainName",params,undefined,false); 
			copyArg(n,"domainEntry",params,undefined,true); 
			
			copyArg(msg,"domainName",params,undefined,false); 
			copyArg(msg,"domainEntry",params,undefined,true); 
			

			svc.deleteDomainEntry(params,cb);
		}

		
		service.DeleteInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"instanceName",params,undefined,false); 
			
			copyArg(msg,"instanceName",params,undefined,false); 
			copyArg(msg,"forceDeleteAddOns",params,undefined,false); 
			

			svc.deleteInstance(params,cb);
		}

		
		service.DeleteInstanceSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"instanceSnapshotName",params,undefined,false); 
			
			copyArg(msg,"instanceSnapshotName",params,undefined,false); 
			

			svc.deleteInstanceSnapshot(params,cb);
		}

		
		service.DeleteKeyPair=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"keyPairName",params,undefined,false); 
			
			copyArg(msg,"keyPairName",params,undefined,false); 
			

			svc.deleteKeyPair(params,cb);
		}

		
		service.DeleteKnownHostKeys=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"instanceName",params,undefined,false); 
			
			copyArg(msg,"instanceName",params,undefined,false); 
			

			svc.deleteKnownHostKeys(params,cb);
		}

		
		service.DeleteLoadBalancer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"loadBalancerName",params,undefined,false); 
			
			copyArg(msg,"loadBalancerName",params,undefined,false); 
			

			svc.deleteLoadBalancer(params,cb);
		}

		
		service.DeleteLoadBalancerTlsCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"loadBalancerName",params,undefined,false); 
			copyArg(n,"certificateName",params,undefined,false); 
			
			copyArg(msg,"loadBalancerName",params,undefined,false); 
			copyArg(msg,"certificateName",params,undefined,false); 
			copyArg(msg,"force",params,undefined,false); 
			

			svc.deleteLoadBalancerTlsCertificate(params,cb);
		}

		
		service.DeleteRelationalDatabase=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"relationalDatabaseName",params,undefined,false); 
			
			copyArg(msg,"relationalDatabaseName",params,undefined,false); 
			copyArg(msg,"skipFinalSnapshot",params,undefined,false); 
			copyArg(msg,"finalRelationalDatabaseSnapshotName",params,undefined,false); 
			

			svc.deleteRelationalDatabase(params,cb);
		}

		
		service.DeleteRelationalDatabaseSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"relationalDatabaseSnapshotName",params,undefined,false); 
			
			copyArg(msg,"relationalDatabaseSnapshotName",params,undefined,false); 
			

			svc.deleteRelationalDatabaseSnapshot(params,cb);
		}

		
		service.DetachCertificateFromDistribution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"distributionName",params,undefined,false); 
			
			copyArg(msg,"distributionName",params,undefined,false); 
			

			svc.detachCertificateFromDistribution(params,cb);
		}

		
		service.DetachDisk=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"diskName",params,undefined,false); 
			
			copyArg(msg,"diskName",params,undefined,false); 
			

			svc.detachDisk(params,cb);
		}

		
		service.DetachInstancesFromLoadBalancer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"loadBalancerName",params,undefined,false); 
			copyArg(n,"instanceNames",params,undefined,true); 
			
			copyArg(msg,"loadBalancerName",params,undefined,false); 
			copyArg(msg,"instanceNames",params,undefined,true); 
			

			svc.detachInstancesFromLoadBalancer(params,cb);
		}

		
		service.DetachStaticIp=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"staticIpName",params,undefined,false); 
			
			copyArg(msg,"staticIpName",params,undefined,false); 
			

			svc.detachStaticIp(params,cb);
		}

		
		service.DisableAddOn=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"addOnType",params,undefined,false); 
			copyArg(n,"resourceName",params,undefined,false); 
			
			copyArg(msg,"addOnType",params,undefined,false); 
			copyArg(msg,"resourceName",params,undefined,false); 
			

			svc.disableAddOn(params,cb);
		}

		
		service.DownloadDefaultKeyPair=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.downloadDefaultKeyPair(params,cb);
		}

		
		service.EnableAddOn=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceName",params,undefined,false); 
			copyArg(n,"addOnRequest",params,undefined,true); 
			
			copyArg(msg,"resourceName",params,undefined,false); 
			copyArg(msg,"addOnRequest",params,undefined,true); 
			

			svc.enableAddOn(params,cb);
		}

		
		service.ExportSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"sourceSnapshotName",params,undefined,false); 
			
			copyArg(msg,"sourceSnapshotName",params,undefined,false); 
			

			svc.exportSnapshot(params,cb);
		}

		
		service.GetActiveNames=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageToken",params,undefined,false); 
			

			svc.getActiveNames(params,cb);
		}

		
		service.GetAlarms=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"alarmName",params,undefined,false); 
			copyArg(msg,"pageToken",params,undefined,false); 
			copyArg(msg,"monitoredResourceName",params,undefined,false); 
			

			svc.getAlarms(params,cb);
		}

		
		service.GetAutoSnapshots=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceName",params,undefined,false); 
			
			copyArg(msg,"resourceName",params,undefined,false); 
			

			svc.getAutoSnapshots(params,cb);
		}

		
		service.GetBlueprints=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"includeInactive",params,undefined,false); 
			copyArg(msg,"pageToken",params,undefined,false); 
			

			svc.getBlueprints(params,cb);
		}

		
		service.GetBucketAccessKeys=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"bucketName",params,undefined,false); 
			
			copyArg(msg,"bucketName",params,undefined,false); 
			

			svc.getBucketAccessKeys(params,cb);
		}

		
		service.GetBucketBundles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"includeInactive",params,undefined,false); 
			

			svc.getBucketBundles(params,cb);
		}

		
		service.GetBucketMetricData=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"bucketName",params,undefined,false); 
			copyArg(n,"metricName",params,undefined,false); 
			copyArg(n,"startTime",params,undefined,false); 
			copyArg(n,"endTime",params,undefined,false); 
			copyArg(n,"period",params,undefined,false); 
			copyArg(n,"statistics",params,undefined,true); 
			copyArg(n,"unit",params,undefined,false); 
			
			copyArg(msg,"bucketName",params,undefined,false); 
			copyArg(msg,"metricName",params,undefined,false); 
			copyArg(msg,"startTime",params,undefined,false); 
			copyArg(msg,"endTime",params,undefined,false); 
			copyArg(msg,"period",params,undefined,false); 
			copyArg(msg,"statistics",params,undefined,true); 
			copyArg(msg,"unit",params,undefined,false); 
			

			svc.getBucketMetricData(params,cb);
		}

		
		service.GetBuckets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"bucketName",params,undefined,false); 
			copyArg(msg,"pageToken",params,undefined,false); 
			copyArg(msg,"includeConnectedResources",params,undefined,false); 
			

			svc.getBuckets(params,cb);
		}

		
		service.GetBundles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"includeInactive",params,undefined,false); 
			copyArg(msg,"pageToken",params,undefined,false); 
			

			svc.getBundles(params,cb);
		}

		
		service.GetCertificates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"certificateStatuses",params,undefined,false); 
			copyArg(msg,"includeCertificateDetails",params,undefined,false); 
			copyArg(msg,"certificateName",params,undefined,false); 
			

			svc.getCertificates(params,cb);
		}

		
		service.GetCloudFormationStackRecords=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageToken",params,undefined,false); 
			

			svc.getCloudFormationStackRecords(params,cb);
		}

		
		service.GetContactMethods=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"protocols",params,undefined,true); 
			

			svc.getContactMethods(params,cb);
		}

		
		service.GetContainerAPIMetadata=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getContainerAPIMetadata(params,cb);
		}

		
		service.GetContainerImages=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"serviceName",params,undefined,false); 
			
			copyArg(msg,"serviceName",params,undefined,false); 
			

			svc.getContainerImages(params,cb);
		}

		
		service.GetContainerLog=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"serviceName",params,undefined,false); 
			copyArg(n,"containerName",params,undefined,false); 
			
			copyArg(msg,"serviceName",params,undefined,false); 
			copyArg(msg,"containerName",params,undefined,false); 
			copyArg(msg,"startTime",params,undefined,false); 
			copyArg(msg,"endTime",params,undefined,false); 
			copyArg(msg,"filterPattern",params,undefined,false); 
			copyArg(msg,"pageToken",params,undefined,false); 
			

			svc.getContainerLog(params,cb);
		}

		
		service.GetContainerServiceDeployments=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"serviceName",params,undefined,false); 
			
			copyArg(msg,"serviceName",params,undefined,false); 
			

			svc.getContainerServiceDeployments(params,cb);
		}

		
		service.GetContainerServiceMetricData=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"serviceName",params,undefined,false); 
			copyArg(n,"metricName",params,undefined,false); 
			copyArg(n,"startTime",params,undefined,false); 
			copyArg(n,"endTime",params,undefined,false); 
			copyArg(n,"period",params,undefined,false); 
			copyArg(n,"statistics",params,undefined,true); 
			
			copyArg(msg,"serviceName",params,undefined,false); 
			copyArg(msg,"metricName",params,undefined,false); 
			copyArg(msg,"startTime",params,undefined,false); 
			copyArg(msg,"endTime",params,undefined,false); 
			copyArg(msg,"period",params,undefined,false); 
			copyArg(msg,"statistics",params,undefined,true); 
			

			svc.getContainerServiceMetricData(params,cb);
		}

		
		service.GetContainerServicePowers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getContainerServicePowers(params,cb);
		}

		
		service.GetContainerServices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"serviceName",params,undefined,false); 
			

			svc.getContainerServices(params,cb);
		}

		
		service.GetDisk=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"diskName",params,undefined,false); 
			
			copyArg(msg,"diskName",params,undefined,false); 
			

			svc.getDisk(params,cb);
		}

		
		service.GetDiskSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"diskSnapshotName",params,undefined,false); 
			
			copyArg(msg,"diskSnapshotName",params,undefined,false); 
			

			svc.getDiskSnapshot(params,cb);
		}

		
		service.GetDiskSnapshots=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageToken",params,undefined,false); 
			

			svc.getDiskSnapshots(params,cb);
		}

		
		service.GetDisks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageToken",params,undefined,false); 
			

			svc.getDisks(params,cb);
		}

		
		service.GetDistributionBundles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getDistributionBundles(params,cb);
		}

		
		service.GetDistributionLatestCacheReset=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"distributionName",params,undefined,false); 
			

			svc.getDistributionLatestCacheReset(params,cb);
		}

		
		service.GetDistributionMetricData=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"distributionName",params,undefined,false); 
			copyArg(n,"metricName",params,undefined,false); 
			copyArg(n,"startTime",params,undefined,false); 
			copyArg(n,"endTime",params,undefined,false); 
			copyArg(n,"period",params,undefined,false); 
			copyArg(n,"unit",params,undefined,false); 
			copyArg(n,"statistics",params,undefined,true); 
			
			copyArg(msg,"distributionName",params,undefined,false); 
			copyArg(msg,"metricName",params,undefined,false); 
			copyArg(msg,"startTime",params,undefined,false); 
			copyArg(msg,"endTime",params,undefined,false); 
			copyArg(msg,"period",params,undefined,false); 
			copyArg(msg,"unit",params,undefined,false); 
			copyArg(msg,"statistics",params,undefined,true); 
			

			svc.getDistributionMetricData(params,cb);
		}

		
		service.GetDistributions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"distributionName",params,undefined,false); 
			copyArg(msg,"pageToken",params,undefined,false); 
			

			svc.getDistributions(params,cb);
		}

		
		service.GetDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domainName",params,undefined,false); 
			
			copyArg(msg,"domainName",params,undefined,false); 
			

			svc.getDomain(params,cb);
		}

		
		service.GetDomains=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageToken",params,undefined,false); 
			

			svc.getDomains(params,cb);
		}

		
		service.GetExportSnapshotRecords=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageToken",params,undefined,false); 
			

			svc.getExportSnapshotRecords(params,cb);
		}

		
		service.GetInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"instanceName",params,undefined,false); 
			
			copyArg(msg,"instanceName",params,undefined,false); 
			

			svc.getInstance(params,cb);
		}

		
		service.GetInstanceAccessDetails=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"instanceName",params,undefined,false); 
			
			copyArg(msg,"instanceName",params,undefined,false); 
			copyArg(msg,"protocol",params,undefined,false); 
			

			svc.getInstanceAccessDetails(params,cb);
		}

		
		service.GetInstanceMetricData=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"instanceName",params,undefined,false); 
			copyArg(n,"metricName",params,undefined,false); 
			copyArg(n,"period",params,undefined,false); 
			copyArg(n,"startTime",params,undefined,false); 
			copyArg(n,"endTime",params,undefined,false); 
			copyArg(n,"unit",params,undefined,false); 
			copyArg(n,"statistics",params,undefined,true); 
			
			copyArg(msg,"instanceName",params,undefined,false); 
			copyArg(msg,"metricName",params,undefined,false); 
			copyArg(msg,"period",params,undefined,false); 
			copyArg(msg,"startTime",params,undefined,false); 
			copyArg(msg,"endTime",params,undefined,false); 
			copyArg(msg,"unit",params,undefined,false); 
			copyArg(msg,"statistics",params,undefined,true); 
			

			svc.getInstanceMetricData(params,cb);
		}

		
		service.GetInstancePortStates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"instanceName",params,undefined,false); 
			
			copyArg(msg,"instanceName",params,undefined,false); 
			

			svc.getInstancePortStates(params,cb);
		}

		
		service.GetInstanceSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"instanceSnapshotName",params,undefined,false); 
			
			copyArg(msg,"instanceSnapshotName",params,undefined,false); 
			

			svc.getInstanceSnapshot(params,cb);
		}

		
		service.GetInstanceSnapshots=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageToken",params,undefined,false); 
			

			svc.getInstanceSnapshots(params,cb);
		}

		
		service.GetInstanceState=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"instanceName",params,undefined,false); 
			
			copyArg(msg,"instanceName",params,undefined,false); 
			

			svc.getInstanceState(params,cb);
		}

		
		service.GetInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageToken",params,undefined,false); 
			

			svc.getInstances(params,cb);
		}

		
		service.GetKeyPair=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"keyPairName",params,undefined,false); 
			
			copyArg(msg,"keyPairName",params,undefined,false); 
			

			svc.getKeyPair(params,cb);
		}

		
		service.GetKeyPairs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageToken",params,undefined,false); 
			

			svc.getKeyPairs(params,cb);
		}

		
		service.GetLoadBalancer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"loadBalancerName",params,undefined,false); 
			
			copyArg(msg,"loadBalancerName",params,undefined,false); 
			

			svc.getLoadBalancer(params,cb);
		}

		
		service.GetLoadBalancerMetricData=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"loadBalancerName",params,undefined,false); 
			copyArg(n,"metricName",params,undefined,false); 
			copyArg(n,"period",params,undefined,false); 
			copyArg(n,"startTime",params,undefined,false); 
			copyArg(n,"endTime",params,undefined,false); 
			copyArg(n,"unit",params,undefined,false); 
			copyArg(n,"statistics",params,undefined,true); 
			
			copyArg(msg,"loadBalancerName",params,undefined,false); 
			copyArg(msg,"metricName",params,undefined,false); 
			copyArg(msg,"period",params,undefined,false); 
			copyArg(msg,"startTime",params,undefined,false); 
			copyArg(msg,"endTime",params,undefined,false); 
			copyArg(msg,"unit",params,undefined,false); 
			copyArg(msg,"statistics",params,undefined,true); 
			

			svc.getLoadBalancerMetricData(params,cb);
		}

		
		service.GetLoadBalancerTlsCertificates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"loadBalancerName",params,undefined,false); 
			
			copyArg(msg,"loadBalancerName",params,undefined,false); 
			

			svc.getLoadBalancerTlsCertificates(params,cb);
		}

		
		service.GetLoadBalancers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageToken",params,undefined,false); 
			

			svc.getLoadBalancers(params,cb);
		}

		
		service.GetOperation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"operationId",params,undefined,false); 
			
			copyArg(msg,"operationId",params,undefined,false); 
			

			svc.getOperation(params,cb);
		}

		
		service.GetOperations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageToken",params,undefined,false); 
			

			svc.getOperations(params,cb);
		}

		
		service.GetOperationsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceName",params,undefined,false); 
			
			copyArg(msg,"resourceName",params,undefined,false); 
			copyArg(msg,"pageToken",params,undefined,false); 
			

			svc.getOperationsForResource(params,cb);
		}

		
		service.GetRegions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"includeAvailabilityZones",params,undefined,false); 
			copyArg(msg,"includeRelationalDatabaseAvailabilityZones",params,undefined,false); 
			

			svc.getRegions(params,cb);
		}

		
		service.GetRelationalDatabase=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"relationalDatabaseName",params,undefined,false); 
			
			copyArg(msg,"relationalDatabaseName",params,undefined,false); 
			

			svc.getRelationalDatabase(params,cb);
		}

		
		service.GetRelationalDatabaseBlueprints=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageToken",params,undefined,false); 
			

			svc.getRelationalDatabaseBlueprints(params,cb);
		}

		
		service.GetRelationalDatabaseBundles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageToken",params,undefined,false); 
			

			svc.getRelationalDatabaseBundles(params,cb);
		}

		
		service.GetRelationalDatabaseEvents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"relationalDatabaseName",params,undefined,false); 
			
			copyArg(msg,"relationalDatabaseName",params,undefined,false); 
			copyArg(msg,"durationInMinutes",params,undefined,false); 
			copyArg(msg,"pageToken",params,undefined,false); 
			

			svc.getRelationalDatabaseEvents(params,cb);
		}

		
		service.GetRelationalDatabaseLogEvents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"relationalDatabaseName",params,undefined,false); 
			copyArg(n,"logStreamName",params,undefined,false); 
			
			copyArg(msg,"relationalDatabaseName",params,undefined,false); 
			copyArg(msg,"logStreamName",params,undefined,false); 
			copyArg(msg,"startTime",params,undefined,false); 
			copyArg(msg,"endTime",params,undefined,false); 
			copyArg(msg,"startFromHead",params,undefined,false); 
			copyArg(msg,"pageToken",params,undefined,false); 
			

			svc.getRelationalDatabaseLogEvents(params,cb);
		}

		
		service.GetRelationalDatabaseLogStreams=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"relationalDatabaseName",params,undefined,false); 
			
			copyArg(msg,"relationalDatabaseName",params,undefined,false); 
			

			svc.getRelationalDatabaseLogStreams(params,cb);
		}

		
		service.GetRelationalDatabaseMasterUserPassword=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"relationalDatabaseName",params,undefined,false); 
			
			copyArg(msg,"relationalDatabaseName",params,undefined,false); 
			copyArg(msg,"passwordVersion",params,undefined,false); 
			

			svc.getRelationalDatabaseMasterUserPassword(params,cb);
		}

		
		service.GetRelationalDatabaseMetricData=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"relationalDatabaseName",params,undefined,false); 
			copyArg(n,"metricName",params,undefined,false); 
			copyArg(n,"period",params,undefined,false); 
			copyArg(n,"startTime",params,undefined,false); 
			copyArg(n,"endTime",params,undefined,false); 
			copyArg(n,"unit",params,undefined,false); 
			copyArg(n,"statistics",params,undefined,true); 
			
			copyArg(msg,"relationalDatabaseName",params,undefined,false); 
			copyArg(msg,"metricName",params,undefined,false); 
			copyArg(msg,"period",params,undefined,false); 
			copyArg(msg,"startTime",params,undefined,false); 
			copyArg(msg,"endTime",params,undefined,false); 
			copyArg(msg,"unit",params,undefined,false); 
			copyArg(msg,"statistics",params,undefined,true); 
			

			svc.getRelationalDatabaseMetricData(params,cb);
		}

		
		service.GetRelationalDatabaseParameters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"relationalDatabaseName",params,undefined,false); 
			
			copyArg(msg,"relationalDatabaseName",params,undefined,false); 
			copyArg(msg,"pageToken",params,undefined,false); 
			

			svc.getRelationalDatabaseParameters(params,cb);
		}

		
		service.GetRelationalDatabaseSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"relationalDatabaseSnapshotName",params,undefined,false); 
			
			copyArg(msg,"relationalDatabaseSnapshotName",params,undefined,false); 
			

			svc.getRelationalDatabaseSnapshot(params,cb);
		}

		
		service.GetRelationalDatabaseSnapshots=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageToken",params,undefined,false); 
			

			svc.getRelationalDatabaseSnapshots(params,cb);
		}

		
		service.GetRelationalDatabases=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageToken",params,undefined,false); 
			

			svc.getRelationalDatabases(params,cb);
		}

		
		service.GetStaticIp=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"staticIpName",params,undefined,false); 
			
			copyArg(msg,"staticIpName",params,undefined,false); 
			

			svc.getStaticIp(params,cb);
		}

		
		service.GetStaticIps=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageToken",params,undefined,false); 
			

			svc.getStaticIps(params,cb);
		}

		
		service.ImportKeyPair=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"keyPairName",params,undefined,false); 
			copyArg(n,"publicKeyBase64",params,undefined,false); 
			
			copyArg(msg,"keyPairName",params,undefined,false); 
			copyArg(msg,"publicKeyBase64",params,undefined,false); 
			

			svc.importKeyPair(params,cb);
		}

		
		service.IsVpcPeered=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.isVpcPeered(params,cb);
		}

		
		service.OpenInstancePublicPorts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"portInfo",params,undefined,true); 
			copyArg(n,"instanceName",params,undefined,false); 
			
			copyArg(msg,"portInfo",params,undefined,true); 
			copyArg(msg,"instanceName",params,undefined,false); 
			

			svc.openInstancePublicPorts(params,cb);
		}

		
		service.PeerVpc=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.peerVpc(params,cb);
		}

		
		service.PutAlarm=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"alarmName",params,undefined,false); 
			copyArg(n,"metricName",params,undefined,false); 
			copyArg(n,"monitoredResourceName",params,undefined,false); 
			copyArg(n,"comparisonOperator",params,undefined,false); 
			copyArg(n,"threshold",params,undefined,false); 
			copyArg(n,"evaluationPeriods",params,undefined,false); 
			
			copyArg(msg,"alarmName",params,undefined,false); 
			copyArg(msg,"metricName",params,undefined,false); 
			copyArg(msg,"monitoredResourceName",params,undefined,false); 
			copyArg(msg,"comparisonOperator",params,undefined,false); 
			copyArg(msg,"threshold",params,undefined,false); 
			copyArg(msg,"evaluationPeriods",params,undefined,false); 
			copyArg(msg,"datapointsToAlarm",params,undefined,false); 
			copyArg(msg,"treatMissingData",params,undefined,false); 
			copyArg(msg,"contactProtocols",params,undefined,true); 
			copyArg(msg,"notificationTriggers",params,undefined,true); 
			copyArg(msg,"notificationEnabled",params,undefined,false); 
			

			svc.putAlarm(params,cb);
		}

		
		service.PutInstancePublicPorts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"portInfos",params,undefined,false); 
			copyArg(n,"instanceName",params,undefined,false); 
			
			copyArg(msg,"portInfos",params,undefined,false); 
			copyArg(msg,"instanceName",params,undefined,false); 
			

			svc.putInstancePublicPorts(params,cb);
		}

		
		service.RebootInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"instanceName",params,undefined,false); 
			
			copyArg(msg,"instanceName",params,undefined,false); 
			

			svc.rebootInstance(params,cb);
		}

		
		service.RebootRelationalDatabase=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"relationalDatabaseName",params,undefined,false); 
			
			copyArg(msg,"relationalDatabaseName",params,undefined,false); 
			

			svc.rebootRelationalDatabase(params,cb);
		}

		
		service.RegisterContainerImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"serviceName",params,undefined,false); 
			copyArg(n,"label",params,undefined,false); 
			copyArg(n,"digest",params,undefined,false); 
			
			copyArg(msg,"serviceName",params,undefined,false); 
			copyArg(msg,"label",params,undefined,false); 
			copyArg(msg,"digest",params,undefined,false); 
			

			svc.registerContainerImage(params,cb);
		}

		
		service.ReleaseStaticIp=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"staticIpName",params,undefined,false); 
			
			copyArg(msg,"staticIpName",params,undefined,false); 
			

			svc.releaseStaticIp(params,cb);
		}

		
		service.ResetDistributionCache=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"distributionName",params,undefined,false); 
			

			svc.resetDistributionCache(params,cb);
		}

		
		service.SendContactMethodVerification=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"protocol",params,undefined,false); 
			
			copyArg(msg,"protocol",params,undefined,false); 
			

			svc.sendContactMethodVerification(params,cb);
		}

		
		service.SetIpAddressType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceType",params,undefined,false); 
			copyArg(n,"resourceName",params,undefined,false); 
			copyArg(n,"ipAddressType",params,undefined,false); 
			
			copyArg(msg,"resourceType",params,undefined,false); 
			copyArg(msg,"resourceName",params,undefined,false); 
			copyArg(msg,"ipAddressType",params,undefined,false); 
			

			svc.setIpAddressType(params,cb);
		}

		
		service.SetResourceAccessForBucket=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceName",params,undefined,false); 
			copyArg(n,"bucketName",params,undefined,false); 
			copyArg(n,"access",params,undefined,false); 
			
			copyArg(msg,"resourceName",params,undefined,false); 
			copyArg(msg,"bucketName",params,undefined,false); 
			copyArg(msg,"access",params,undefined,false); 
			

			svc.setResourceAccessForBucket(params,cb);
		}

		
		service.StartInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"instanceName",params,undefined,false); 
			
			copyArg(msg,"instanceName",params,undefined,false); 
			

			svc.startInstance(params,cb);
		}

		
		service.StartRelationalDatabase=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"relationalDatabaseName",params,undefined,false); 
			
			copyArg(msg,"relationalDatabaseName",params,undefined,false); 
			

			svc.startRelationalDatabase(params,cb);
		}

		
		service.StopInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"instanceName",params,undefined,false); 
			
			copyArg(msg,"instanceName",params,undefined,false); 
			copyArg(msg,"force",params,undefined,false); 
			

			svc.stopInstance(params,cb);
		}

		
		service.StopRelationalDatabase=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"relationalDatabaseName",params,undefined,false); 
			
			copyArg(msg,"relationalDatabaseName",params,undefined,false); 
			copyArg(msg,"relationalDatabaseSnapshotName",params,undefined,false); 
			

			svc.stopRelationalDatabase(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceName",params,undefined,false); 
			copyArg(n,"tags",params,undefined,true); 
			
			copyArg(msg,"resourceName",params,undefined,false); 
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.TestAlarm=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"alarmName",params,undefined,false); 
			copyArg(n,"state",params,undefined,false); 
			
			copyArg(msg,"alarmName",params,undefined,false); 
			copyArg(msg,"state",params,undefined,false); 
			

			svc.testAlarm(params,cb);
		}

		
		service.UnpeerVpc=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.unpeerVpc(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceName",params,undefined,false); 
			copyArg(n,"tagKeys",params,undefined,false); 
			
			copyArg(msg,"resourceName",params,undefined,false); 
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateBucket=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"bucketName",params,undefined,false); 
			
			copyArg(msg,"bucketName",params,undefined,false); 
			copyArg(msg,"accessRules",params,undefined,true); 
			copyArg(msg,"versioning",params,undefined,false); 
			copyArg(msg,"readonlyAccessAccounts",params,undefined,true); 
			

			svc.updateBucket(params,cb);
		}

		
		service.UpdateBucketBundle=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"bucketName",params,undefined,false); 
			copyArg(n,"bundleId",params,undefined,false); 
			
			copyArg(msg,"bucketName",params,undefined,false); 
			copyArg(msg,"bundleId",params,undefined,false); 
			

			svc.updateBucketBundle(params,cb);
		}

		
		service.UpdateContainerService=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"serviceName",params,undefined,false); 
			
			copyArg(msg,"serviceName",params,undefined,false); 
			copyArg(msg,"power",params,undefined,false); 
			copyArg(msg,"scale",params,undefined,false); 
			copyArg(msg,"isDisabled",params,undefined,false); 
			copyArg(msg,"publicDomainNames",params,undefined,true); 
			

			svc.updateContainerService(params,cb);
		}

		
		service.UpdateDistribution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"distributionName",params,undefined,false); 
			
			copyArg(msg,"distributionName",params,undefined,false); 
			copyArg(msg,"origin",params,undefined,true); 
			copyArg(msg,"defaultCacheBehavior",params,undefined,true); 
			copyArg(msg,"cacheBehaviorSettings",params,undefined,true); 
			copyArg(msg,"cacheBehaviors",params,undefined,true); 
			copyArg(msg,"isEnabled",params,undefined,false); 
			

			svc.updateDistribution(params,cb);
		}

		
		service.UpdateDistributionBundle=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"distributionName",params,undefined,false); 
			copyArg(msg,"bundleId",params,undefined,false); 
			

			svc.updateDistributionBundle(params,cb);
		}

		
		service.UpdateDomainEntry=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domainName",params,undefined,false); 
			copyArg(n,"domainEntry",params,undefined,true); 
			
			copyArg(msg,"domainName",params,undefined,false); 
			copyArg(msg,"domainEntry",params,undefined,true); 
			

			svc.updateDomainEntry(params,cb);
		}

		
		service.UpdateLoadBalancerAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"loadBalancerName",params,undefined,false); 
			copyArg(n,"attributeName",params,undefined,false); 
			copyArg(n,"attributeValue",params,undefined,false); 
			
			copyArg(msg,"loadBalancerName",params,undefined,false); 
			copyArg(msg,"attributeName",params,undefined,false); 
			copyArg(msg,"attributeValue",params,undefined,false); 
			

			svc.updateLoadBalancerAttribute(params,cb);
		}

		
		service.UpdateRelationalDatabase=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"relationalDatabaseName",params,undefined,false); 
			
			copyArg(msg,"relationalDatabaseName",params,undefined,false); 
			copyArg(msg,"masterUserPassword",params,undefined,true); 
			copyArg(msg,"rotateMasterUserPassword",params,undefined,false); 
			copyArg(msg,"preferredBackupWindow",params,undefined,false); 
			copyArg(msg,"preferredMaintenanceWindow",params,undefined,false); 
			copyArg(msg,"enableBackupRetention",params,undefined,false); 
			copyArg(msg,"disableBackupRetention",params,undefined,false); 
			copyArg(msg,"publiclyAccessible",params,undefined,false); 
			copyArg(msg,"applyImmediately",params,undefined,false); 
			copyArg(msg,"caCertificateIdentifier",params,undefined,false); 
			

			svc.updateRelationalDatabase(params,cb);
		}

		
		service.UpdateRelationalDatabaseParameters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"relationalDatabaseName",params,undefined,false); 
			copyArg(n,"parameters",params,undefined,true); 
			
			copyArg(msg,"relationalDatabaseName",params,undefined,false); 
			copyArg(msg,"parameters",params,undefined,true); 
			

			svc.updateRelationalDatabaseParameters(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Lightsail", AmazonAPINode);

};
