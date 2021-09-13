
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

		var awsService = new AWS.DeviceFarm( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.DeviceFarm(msg.AWSConfig) : awsService;

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
		
			service.CreateDevicePool=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectArn",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"rules",params,undefined,true); 
			
			copyArgs(n,"projectArn",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"rules",params,undefined,true); 
			copyArgs(Number(n),"maxDevices",params,undefined,false); 
			
			copyArgs(msg,"projectArn",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"rules",params,undefined,true); 
			copyArgs(msg,"maxDevices",params,undefined,false); 
			

			svc.createDevicePool(params,cb);
		}
			service.CreateInstanceProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(Boolean(n),"packageCleanup",params,undefined,false); 
			copyArgs(n,"excludeAppPackagesFromCleanup",params,undefined,true); 
			copyArgs(Boolean(n),"rebootAfterUse",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"packageCleanup",params,undefined,false); 
			copyArgs(msg,"excludeAppPackagesFromCleanup",params,undefined,true); 
			copyArgs(msg,"rebootAfterUse",params,undefined,false); 
			

			svc.createInstanceProfile(params,cb);
		}
			service.CreateNetworkProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectArn",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"projectArn",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"type",params,undefined,false); 
			copyArgs(n,"uplinkBandwidthBits",params,undefined,false); 
			copyArgs(n,"downlinkBandwidthBits",params,undefined,false); 
			copyArgs(n,"uplinkDelayMs",params,undefined,false); 
			copyArgs(n,"downlinkDelayMs",params,undefined,false); 
			copyArgs(n,"uplinkJitterMs",params,undefined,false); 
			copyArgs(n,"downlinkJitterMs",params,undefined,false); 
			copyArgs(Number(n),"uplinkLossPercent",params,undefined,false); 
			copyArgs(Number(n),"downlinkLossPercent",params,undefined,false); 
			
			copyArgs(msg,"projectArn",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"type",params,undefined,false); 
			copyArgs(msg,"uplinkBandwidthBits",params,undefined,false); 
			copyArgs(msg,"downlinkBandwidthBits",params,undefined,false); 
			copyArgs(msg,"uplinkDelayMs",params,undefined,false); 
			copyArgs(msg,"downlinkDelayMs",params,undefined,false); 
			copyArgs(msg,"uplinkJitterMs",params,undefined,false); 
			copyArgs(msg,"downlinkJitterMs",params,undefined,false); 
			copyArgs(msg,"uplinkLossPercent",params,undefined,false); 
			copyArgs(msg,"downlinkLossPercent",params,undefined,false); 
			

			svc.createNetworkProfile(params,cb);
		}
			service.CreateProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(Number(n),"defaultJobTimeoutMinutes",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"defaultJobTimeoutMinutes",params,undefined,false); 
			

			svc.createProject(params,cb);
		}
			service.CreateRemoteAccessSession=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectArn",params,undefined,false); 
			copyArgs(n,"deviceArn",params,undefined,false); 
			
			copyArgs(n,"projectArn",params,undefined,false); 
			copyArgs(n,"deviceArn",params,undefined,false); 
			copyArgs(n,"instanceArn",params,undefined,false); 
			copyArgs(n,"sshPublicKey",params,undefined,false); 
			copyArgs(Boolean(n),"remoteDebugEnabled",params,undefined,false); 
			copyArgs(Boolean(n),"remoteRecordEnabled",params,undefined,false); 
			copyArgs(n,"remoteRecordAppArn",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"clientId",params,undefined,false); 
			copyArgs(n,"configuration",params,undefined,false); 
			copyArgs(n,"interactionMode",params,undefined,false); 
			copyArgs(Boolean(n),"skipAppResign",params,undefined,false); 
			
			copyArgs(msg,"projectArn",params,undefined,false); 
			copyArgs(msg,"deviceArn",params,undefined,false); 
			copyArgs(msg,"instanceArn",params,undefined,false); 
			copyArgs(msg,"sshPublicKey",params,undefined,false); 
			copyArgs(msg,"remoteDebugEnabled",params,undefined,false); 
			copyArgs(msg,"remoteRecordEnabled",params,undefined,false); 
			copyArgs(msg,"remoteRecordAppArn",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"clientId",params,undefined,false); 
			copyArgs(msg,"configuration",params,undefined,false); 
			copyArgs(msg,"interactionMode",params,undefined,false); 
			copyArgs(msg,"skipAppResign",params,undefined,false); 
			

			svc.createRemoteAccessSession(params,cb);
		}
			service.CreateTestGridProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"vpcConfig",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"vpcConfig",params,undefined,true); 
			

			svc.createTestGridProject(params,cb);
		}
			service.CreateTestGridUrl=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectArn",params,undefined,false); 
			copyArgs(Number(n),"expiresInSeconds",params,undefined,false); 
			
			copyArgs(n,"projectArn",params,undefined,false); 
			copyArgs(Number(n),"expiresInSeconds",params,undefined,false); 
			
			copyArgs(msg,"projectArn",params,undefined,false); 
			copyArgs(msg,"expiresInSeconds",params,undefined,false); 
			

			svc.createTestGridUrl(params,cb);
		}
			service.CreateUpload=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectArn",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"_type",params,"type",false); 
			
			copyArgs(n,"projectArn",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"type",params,undefined,false); 
			copyArgs(n,"contentType",params,undefined,false); 
			
			copyArgs(msg,"projectArn",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"type",params,undefined,false); 
			copyArgs(msg,"contentType",params,undefined,false); 
			

			svc.createUpload(params,cb);
		}
			service.CreateVPCEConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"vpceConfigurationName",params,undefined,false); 
			copyArgs(n,"vpceServiceName",params,undefined,false); 
			copyArgs(n,"serviceDnsName",params,undefined,false); 
			
			copyArgs(n,"vpceConfigurationName",params,undefined,false); 
			copyArgs(n,"vpceServiceName",params,undefined,false); 
			copyArgs(n,"serviceDnsName",params,undefined,false); 
			copyArgs(n,"vpceConfigurationDescription",params,undefined,false); 
			
			copyArgs(msg,"vpceConfigurationName",params,undefined,false); 
			copyArgs(msg,"vpceServiceName",params,undefined,false); 
			copyArgs(msg,"serviceDnsName",params,undefined,false); 
			copyArgs(msg,"vpceConfigurationDescription",params,undefined,false); 
			

			svc.createVPCEConfiguration(params,cb);
		}
			service.DeleteDevicePool=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.deleteDevicePool(params,cb);
		}
			service.DeleteInstanceProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.deleteInstanceProfile(params,cb);
		}
			service.DeleteNetworkProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.deleteNetworkProfile(params,cb);
		}
			service.DeleteProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.deleteProject(params,cb);
		}
			service.DeleteRemoteAccessSession=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.deleteRemoteAccessSession(params,cb);
		}
			service.DeleteRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.deleteRun(params,cb);
		}
			service.DeleteTestGridProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectArn",params,undefined,false); 
			
			copyArgs(n,"projectArn",params,undefined,false); 
			
			copyArgs(msg,"projectArn",params,undefined,false); 
			

			svc.deleteTestGridProject(params,cb);
		}
			service.DeleteUpload=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.deleteUpload(params,cb);
		}
			service.DeleteVPCEConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.deleteVPCEConfiguration(params,cb);
		}
			service.GetAccountSettings=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getAccountSettings(params,cb);
		}
			service.GetDevice=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.getDevice(params,cb);
		}
			service.GetDeviceInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.getDeviceInstance(params,cb);
		}
			service.GetDevicePool=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.getDevicePool(params,cb);
		}
			service.GetDevicePoolCompatibility=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"devicePoolArn",params,undefined,false); 
			
			copyArgs(n,"devicePoolArn",params,undefined,false); 
			copyArgs(n,"appArn",params,undefined,false); 
			copyArgs(n,"testType",params,undefined,false); 
			copyArgs(n,"test",params,undefined,true); 
			copyArgs(n,"configuration",params,undefined,true); 
			
			copyArgs(msg,"devicePoolArn",params,undefined,false); 
			copyArgs(msg,"appArn",params,undefined,false); 
			copyArgs(msg,"testType",params,undefined,false); 
			copyArgs(msg,"test",params,undefined,true); 
			copyArgs(msg,"configuration",params,undefined,true); 
			

			svc.getDevicePoolCompatibility(params,cb);
		}
			service.GetInstanceProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.getInstanceProfile(params,cb);
		}
			service.GetJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.getJob(params,cb);
		}
			service.GetNetworkProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.getNetworkProfile(params,cb);
		}
			service.GetOfferingStatus=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.getOfferingStatus(params,cb);
		}
			service.GetProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.getProject(params,cb);
		}
			service.GetRemoteAccessSession=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.getRemoteAccessSession(params,cb);
		}
			service.GetRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.getRun(params,cb);
		}
			service.GetSuite=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.getSuite(params,cb);
		}
			service.GetTest=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.getTest(params,cb);
		}
			service.GetTestGridProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectArn",params,undefined,false); 
			
			copyArgs(n,"projectArn",params,undefined,false); 
			
			copyArgs(msg,"projectArn",params,undefined,false); 
			

			svc.getTestGridProject(params,cb);
		}
			service.GetTestGridSession=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"projectArn",params,undefined,false); 
			copyArgs(n,"sessionId",params,undefined,false); 
			copyArgs(n,"sessionArn",params,undefined,false); 
			
			copyArgs(msg,"projectArn",params,undefined,false); 
			copyArgs(msg,"sessionId",params,undefined,false); 
			copyArgs(msg,"sessionArn",params,undefined,false); 
			

			svc.getTestGridSession(params,cb);
		}
			service.GetUpload=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.getUpload(params,cb);
		}
			service.GetVPCEConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.getVPCEConfiguration(params,cb);
		}
			service.InstallToRemoteAccessSession=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"remoteAccessSessionArn",params,undefined,false); 
			copyArgs(n,"appArn",params,undefined,false); 
			
			copyArgs(n,"remoteAccessSessionArn",params,undefined,false); 
			copyArgs(n,"appArn",params,undefined,false); 
			
			copyArgs(msg,"remoteAccessSessionArn",params,undefined,false); 
			copyArgs(msg,"appArn",params,undefined,false); 
			

			svc.installToRemoteAccessSession(params,cb);
		}
			service.ListArtifacts=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"_type",params,"type",false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"type",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"type",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listArtifacts(params,cb);
		}
			service.ListDeviceInstances=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listDeviceInstances(params,cb);
		}
			service.ListDevicePools=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"type",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"type",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listDevicePools(params,cb);
		}
			service.ListDevices=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"filters",params,undefined,true); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"filters",params,undefined,true); 
			

			svc.listDevices(params,cb);
		}
			service.ListInstanceProfiles=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listInstanceProfiles(params,cb);
		}
			service.ListJobs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listJobs(params,cb);
		}
			service.ListNetworkProfiles=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"type",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"type",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listNetworkProfiles(params,cb);
		}
			service.ListOfferingPromotions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listOfferingPromotions(params,cb);
		}
			service.ListOfferingTransactions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listOfferingTransactions(params,cb);
		}
			service.ListOfferings=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listOfferings(params,cb);
		}
			service.ListProjects=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listProjects(params,cb);
		}
			service.ListRemoteAccessSessions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listRemoteAccessSessions(params,cb);
		}
			service.ListRuns=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listRuns(params,cb);
		}
			service.ListSamples=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listSamples(params,cb);
		}
			service.ListSuites=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listSuites(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.ListTestGridProjects=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"maxResult",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"maxResult",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listTestGridProjects(params,cb);
		}
			service.ListTestGridSessionActions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"sessionArn",params,undefined,false); 
			
			copyArgs(n,"sessionArn",params,undefined,false); 
			copyArgs(Number(n),"maxResult",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"sessionArn",params,undefined,false); 
			copyArgs(msg,"maxResult",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listTestGridSessionActions(params,cb);
		}
			service.ListTestGridSessionArtifacts=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"sessionArn",params,undefined,false); 
			
			copyArgs(n,"sessionArn",params,undefined,false); 
			copyArgs(n,"type",params,undefined,false); 
			copyArgs(Number(n),"maxResult",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"sessionArn",params,undefined,false); 
			copyArgs(msg,"type",params,undefined,false); 
			copyArgs(msg,"maxResult",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listTestGridSessionArtifacts(params,cb);
		}
			service.ListTestGridSessions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectArn",params,undefined,false); 
			
			copyArgs(n,"projectArn",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			copyArgs(n,"creationTimeAfter",params,undefined,false); 
			copyArgs(n,"creationTimeBefore",params,undefined,false); 
			copyArgs(n,"endTimeAfter",params,undefined,false); 
			copyArgs(n,"endTimeBefore",params,undefined,false); 
			copyArgs(Number(n),"maxResult",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"projectArn",params,undefined,false); 
			copyArgs(msg,"status",params,undefined,false); 
			copyArgs(msg,"creationTimeAfter",params,undefined,false); 
			copyArgs(msg,"creationTimeBefore",params,undefined,false); 
			copyArgs(msg,"endTimeAfter",params,undefined,false); 
			copyArgs(msg,"endTimeBefore",params,undefined,false); 
			copyArgs(msg,"maxResult",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listTestGridSessions(params,cb);
		}
			service.ListTests=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listTests(params,cb);
		}
			service.ListUniqueProblems=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listUniqueProblems(params,cb);
		}
			service.ListUploads=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"type",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"type",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listUploads(params,cb);
		}
			service.ListVPCEConfigurations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listVPCEConfigurations(params,cb);
		}
			service.PurchaseOffering=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"offeringId",params,undefined,false); 
			copyArgs(Number(n),"quantity",params,undefined,false); 
			
			copyArgs(n,"offeringId",params,undefined,false); 
			copyArgs(Number(n),"quantity",params,undefined,false); 
			copyArgs(n,"offeringPromotionId",params,undefined,false); 
			
			copyArgs(msg,"offeringId",params,undefined,false); 
			copyArgs(msg,"quantity",params,undefined,false); 
			copyArgs(msg,"offeringPromotionId",params,undefined,false); 
			

			svc.purchaseOffering(params,cb);
		}
			service.RenewOffering=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"offeringId",params,undefined,false); 
			copyArgs(Number(n),"quantity",params,undefined,false); 
			
			copyArgs(n,"offeringId",params,undefined,false); 
			copyArgs(Number(n),"quantity",params,undefined,false); 
			
			copyArgs(msg,"offeringId",params,undefined,false); 
			copyArgs(msg,"quantity",params,undefined,false); 
			

			svc.renewOffering(params,cb);
		}
			service.ScheduleRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectArn",params,undefined,false); 
			copyArgs(n,"test",params,undefined,true); 
			
			copyArgs(n,"projectArn",params,undefined,false); 
			copyArgs(n,"appArn",params,undefined,false); 
			copyArgs(n,"devicePoolArn",params,undefined,false); 
			copyArgs(n,"deviceSelectionConfiguration",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"test",params,undefined,true); 
			copyArgs(n,"configuration",params,undefined,true); 
			copyArgs(n,"executionConfiguration",params,undefined,false); 
			
			copyArgs(msg,"projectArn",params,undefined,false); 
			copyArgs(msg,"appArn",params,undefined,false); 
			copyArgs(msg,"devicePoolArn",params,undefined,false); 
			copyArgs(msg,"deviceSelectionConfiguration",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"test",params,undefined,true); 
			copyArgs(msg,"configuration",params,undefined,true); 
			copyArgs(msg,"executionConfiguration",params,undefined,false); 
			

			svc.scheduleRun(params,cb);
		}
			service.StopJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.stopJob(params,cb);
		}
			service.StopRemoteAccessSession=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.stopRemoteAccessSession(params,cb);
		}
			service.StopRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.stopRun(params,cb);
		}
			service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
			service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
			service.UpdateDeviceInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"profileArn",params,undefined,false); 
			copyArgs(n,"labels",params,undefined,true); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"profileArn",params,undefined,false); 
			copyArgs(msg,"labels",params,undefined,true); 
			

			svc.updateDeviceInstance(params,cb);
		}
			service.UpdateDevicePool=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"rules",params,undefined,true); 
			copyArgs(Number(n),"maxDevices",params,undefined,false); 
			copyArgs(Boolean(n),"clearMaxDevices",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"rules",params,undefined,true); 
			copyArgs(msg,"maxDevices",params,undefined,false); 
			copyArgs(msg,"clearMaxDevices",params,undefined,false); 
			

			svc.updateDevicePool(params,cb);
		}
			service.UpdateInstanceProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(Boolean(n),"packageCleanup",params,undefined,false); 
			copyArgs(n,"excludeAppPackagesFromCleanup",params,undefined,true); 
			copyArgs(Boolean(n),"rebootAfterUse",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"packageCleanup",params,undefined,false); 
			copyArgs(msg,"excludeAppPackagesFromCleanup",params,undefined,true); 
			copyArgs(msg,"rebootAfterUse",params,undefined,false); 
			

			svc.updateInstanceProfile(params,cb);
		}
			service.UpdateNetworkProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"type",params,undefined,false); 
			copyArgs(n,"uplinkBandwidthBits",params,undefined,false); 
			copyArgs(n,"downlinkBandwidthBits",params,undefined,false); 
			copyArgs(n,"uplinkDelayMs",params,undefined,false); 
			copyArgs(n,"downlinkDelayMs",params,undefined,false); 
			copyArgs(n,"uplinkJitterMs",params,undefined,false); 
			copyArgs(n,"downlinkJitterMs",params,undefined,false); 
			copyArgs(Number(n),"uplinkLossPercent",params,undefined,false); 
			copyArgs(Number(n),"downlinkLossPercent",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"type",params,undefined,false); 
			copyArgs(msg,"uplinkBandwidthBits",params,undefined,false); 
			copyArgs(msg,"downlinkBandwidthBits",params,undefined,false); 
			copyArgs(msg,"uplinkDelayMs",params,undefined,false); 
			copyArgs(msg,"downlinkDelayMs",params,undefined,false); 
			copyArgs(msg,"uplinkJitterMs",params,undefined,false); 
			copyArgs(msg,"downlinkJitterMs",params,undefined,false); 
			copyArgs(msg,"uplinkLossPercent",params,undefined,false); 
			copyArgs(msg,"downlinkLossPercent",params,undefined,false); 
			

			svc.updateNetworkProfile(params,cb);
		}
			service.UpdateProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(Number(n),"defaultJobTimeoutMinutes",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"defaultJobTimeoutMinutes",params,undefined,false); 
			

			svc.updateProject(params,cb);
		}
			service.UpdateTestGridProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectArn",params,undefined,false); 
			
			copyArgs(n,"projectArn",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"vpcConfig",params,undefined,true); 
			
			copyArgs(msg,"projectArn",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"vpcConfig",params,undefined,true); 
			

			svc.updateTestGridProject(params,cb);
		}
			service.UpdateUpload=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"contentType",params,undefined,false); 
			copyArgs(Boolean(n),"editContent",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"contentType",params,undefined,false); 
			copyArgs(msg,"editContent",params,undefined,false); 
			

			svc.updateUpload(params,cb);
		}
			service.UpdateVPCEConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"vpceConfigurationName",params,undefined,false); 
			copyArgs(n,"vpceServiceName",params,undefined,false); 
			copyArgs(n,"serviceDnsName",params,undefined,false); 
			copyArgs(n,"vpceConfigurationDescription",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"vpceConfigurationName",params,undefined,false); 
			copyArgs(msg,"vpceServiceName",params,undefined,false); 
			copyArgs(msg,"serviceDnsName",params,undefined,false); 
			copyArgs(msg,"vpceConfigurationDescription",params,undefined,false); 
			

			svc.updateVPCEConfiguration(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS DeviceFarm", AmazonAPINode);

};
