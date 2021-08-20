
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

		var awsService = new AWS.DeviceFarm( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.DeviceFarm(msg.AWSConfig) : awsService;

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

		
		service.CreateDevicePool=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"projectArn",params,undefined,false); 
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"rules",params,undefined,true); 
			
			copyArg(msg,"projectArn",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"rules",params,undefined,true); 
			copyArg(msg,"maxDevices",params,undefined,false); 
			

			svc.createDevicePool(params,cb);
		}

		
		service.CreateInstanceProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"packageCleanup",params,undefined,false); 
			copyArg(msg,"excludeAppPackagesFromCleanup",params,undefined,true); 
			copyArg(msg,"rebootAfterUse",params,undefined,false); 
			

			svc.createInstanceProfile(params,cb);
		}

		
		service.CreateNetworkProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"projectArn",params,undefined,false); 
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"projectArn",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"type",params,undefined,false); 
			copyArg(msg,"uplinkBandwidthBits",params,undefined,false); 
			copyArg(msg,"downlinkBandwidthBits",params,undefined,false); 
			copyArg(msg,"uplinkDelayMs",params,undefined,false); 
			copyArg(msg,"downlinkDelayMs",params,undefined,false); 
			copyArg(msg,"uplinkJitterMs",params,undefined,false); 
			copyArg(msg,"downlinkJitterMs",params,undefined,false); 
			copyArg(msg,"uplinkLossPercent",params,undefined,false); 
			copyArg(msg,"downlinkLossPercent",params,undefined,false); 
			

			svc.createNetworkProfile(params,cb);
		}

		
		service.CreateProject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"defaultJobTimeoutMinutes",params,undefined,false); 
			

			svc.createProject(params,cb);
		}

		
		service.CreateRemoteAccessSession=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"projectArn",params,undefined,false); 
			copyArg(n,"deviceArn",params,undefined,false); 
			
			copyArg(msg,"projectArn",params,undefined,false); 
			copyArg(msg,"deviceArn",params,undefined,false); 
			copyArg(msg,"instanceArn",params,undefined,false); 
			copyArg(msg,"sshPublicKey",params,undefined,false); 
			copyArg(msg,"remoteDebugEnabled",params,undefined,false); 
			copyArg(msg,"remoteRecordEnabled",params,undefined,false); 
			copyArg(msg,"remoteRecordAppArn",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"clientId",params,undefined,false); 
			copyArg(msg,"configuration",params,undefined,false); 
			copyArg(msg,"interactionMode",params,undefined,false); 
			copyArg(msg,"skipAppResign",params,undefined,false); 
			

			svc.createRemoteAccessSession(params,cb);
		}

		
		service.CreateTestGridProject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"vpcConfig",params,undefined,true); 
			

			svc.createTestGridProject(params,cb);
		}

		
		service.CreateTestGridUrl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"projectArn",params,undefined,false); 
			copyArg(n,"expiresInSeconds",params,undefined,false); 
			
			copyArg(msg,"projectArn",params,undefined,false); 
			copyArg(msg,"expiresInSeconds",params,undefined,false); 
			

			svc.createTestGridUrl(params,cb);
		}

		
		service.CreateUpload=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"projectArn",params,undefined,false); 
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"_type",params,"type",false); 
			
			copyArg(msg,"projectArn",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"type",params,undefined,false); 
			copyArg(msg,"contentType",params,undefined,false); 
			

			svc.createUpload(params,cb);
		}

		
		service.CreateVPCEConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"vpceConfigurationName",params,undefined,false); 
			copyArg(n,"vpceServiceName",params,undefined,false); 
			copyArg(n,"serviceDnsName",params,undefined,false); 
			
			copyArg(msg,"vpceConfigurationName",params,undefined,false); 
			copyArg(msg,"vpceServiceName",params,undefined,false); 
			copyArg(msg,"serviceDnsName",params,undefined,false); 
			copyArg(msg,"vpceConfigurationDescription",params,undefined,false); 
			

			svc.createVPCEConfiguration(params,cb);
		}

		
		service.DeleteDevicePool=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.deleteDevicePool(params,cb);
		}

		
		service.DeleteInstanceProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.deleteInstanceProfile(params,cb);
		}

		
		service.DeleteNetworkProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.deleteNetworkProfile(params,cb);
		}

		
		service.DeleteProject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.deleteProject(params,cb);
		}

		
		service.DeleteRemoteAccessSession=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.deleteRemoteAccessSession(params,cb);
		}

		
		service.DeleteRun=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.deleteRun(params,cb);
		}

		
		service.DeleteTestGridProject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"projectArn",params,undefined,false); 
			
			copyArg(msg,"projectArn",params,undefined,false); 
			

			svc.deleteTestGridProject(params,cb);
		}

		
		service.DeleteUpload=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.deleteUpload(params,cb);
		}

		
		service.DeleteVPCEConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.deleteVPCEConfiguration(params,cb);
		}

		
		service.GetAccountSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getAccountSettings(params,cb);
		}

		
		service.GetDevice=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.getDevice(params,cb);
		}

		
		service.GetDeviceInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.getDeviceInstance(params,cb);
		}

		
		service.GetDevicePool=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.getDevicePool(params,cb);
		}

		
		service.GetDevicePoolCompatibility=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"devicePoolArn",params,undefined,false); 
			
			copyArg(msg,"devicePoolArn",params,undefined,false); 
			copyArg(msg,"appArn",params,undefined,false); 
			copyArg(msg,"testType",params,undefined,false); 
			copyArg(msg,"test",params,undefined,true); 
			copyArg(msg,"configuration",params,undefined,true); 
			

			svc.getDevicePoolCompatibility(params,cb);
		}

		
		service.GetInstanceProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.getInstanceProfile(params,cb);
		}

		
		service.GetJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.getJob(params,cb);
		}

		
		service.GetNetworkProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.getNetworkProfile(params,cb);
		}

		
		service.GetOfferingStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.getOfferingStatus(params,cb);
		}

		
		service.GetProject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.getProject(params,cb);
		}

		
		service.GetRemoteAccessSession=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.getRemoteAccessSession(params,cb);
		}

		
		service.GetRun=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.getRun(params,cb);
		}

		
		service.GetSuite=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.getSuite(params,cb);
		}

		
		service.GetTest=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.getTest(params,cb);
		}

		
		service.GetTestGridProject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"projectArn",params,undefined,false); 
			
			copyArg(msg,"projectArn",params,undefined,false); 
			

			svc.getTestGridProject(params,cb);
		}

		
		service.GetTestGridSession=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"projectArn",params,undefined,false); 
			copyArg(msg,"sessionId",params,undefined,false); 
			copyArg(msg,"sessionArn",params,undefined,false); 
			

			svc.getTestGridSession(params,cb);
		}

		
		service.GetUpload=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.getUpload(params,cb);
		}

		
		service.GetVPCEConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.getVPCEConfiguration(params,cb);
		}

		
		service.InstallToRemoteAccessSession=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"remoteAccessSessionArn",params,undefined,false); 
			copyArg(n,"appArn",params,undefined,false); 
			
			copyArg(msg,"remoteAccessSessionArn",params,undefined,false); 
			copyArg(msg,"appArn",params,undefined,false); 
			

			svc.installToRemoteAccessSession(params,cb);
		}

		
		service.ListArtifacts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			copyArg(n,"_type",params,"type",false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"type",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listArtifacts(params,cb);
		}

		
		service.ListDeviceInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listDeviceInstances(params,cb);
		}

		
		service.ListDevicePools=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"type",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listDevicePools(params,cb);
		}

		
		service.ListDevices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"filters",params,undefined,true); 
			

			svc.listDevices(params,cb);
		}

		
		service.ListInstanceProfiles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listInstanceProfiles(params,cb);
		}

		
		service.ListJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listJobs(params,cb);
		}

		
		service.ListNetworkProfiles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"type",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listNetworkProfiles(params,cb);
		}

		
		service.ListOfferingPromotions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listOfferingPromotions(params,cb);
		}

		
		service.ListOfferingTransactions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listOfferingTransactions(params,cb);
		}

		
		service.ListOfferings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listOfferings(params,cb);
		}

		
		service.ListProjects=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listProjects(params,cb);
		}

		
		service.ListRemoteAccessSessions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listRemoteAccessSessions(params,cb);
		}

		
		service.ListRuns=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listRuns(params,cb);
		}

		
		service.ListSamples=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listSamples(params,cb);
		}

		
		service.ListSuites=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listSuites(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListTestGridProjects=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"maxResult",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listTestGridProjects(params,cb);
		}

		
		service.ListTestGridSessionActions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"sessionArn",params,undefined,false); 
			
			copyArg(msg,"sessionArn",params,undefined,false); 
			copyArg(msg,"maxResult",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listTestGridSessionActions(params,cb);
		}

		
		service.ListTestGridSessionArtifacts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"sessionArn",params,undefined,false); 
			
			copyArg(msg,"sessionArn",params,undefined,false); 
			copyArg(msg,"type",params,undefined,false); 
			copyArg(msg,"maxResult",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listTestGridSessionArtifacts(params,cb);
		}

		
		service.ListTestGridSessions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"projectArn",params,undefined,false); 
			
			copyArg(msg,"projectArn",params,undefined,false); 
			copyArg(msg,"status",params,undefined,false); 
			copyArg(msg,"creationTimeAfter",params,undefined,false); 
			copyArg(msg,"creationTimeBefore",params,undefined,false); 
			copyArg(msg,"endTimeAfter",params,undefined,false); 
			copyArg(msg,"endTimeBefore",params,undefined,false); 
			copyArg(msg,"maxResult",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listTestGridSessions(params,cb);
		}

		
		service.ListTests=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listTests(params,cb);
		}

		
		service.ListUniqueProblems=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listUniqueProblems(params,cb);
		}

		
		service.ListUploads=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"type",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listUploads(params,cb);
		}

		
		service.ListVPCEConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listVPCEConfigurations(params,cb);
		}

		
		service.PurchaseOffering=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"offeringId",params,undefined,false); 
			copyArg(n,"quantity",params,undefined,false); 
			
			copyArg(msg,"offeringId",params,undefined,false); 
			copyArg(msg,"quantity",params,undefined,false); 
			copyArg(msg,"offeringPromotionId",params,undefined,false); 
			

			svc.purchaseOffering(params,cb);
		}

		
		service.RenewOffering=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"offeringId",params,undefined,false); 
			copyArg(n,"quantity",params,undefined,false); 
			
			copyArg(msg,"offeringId",params,undefined,false); 
			copyArg(msg,"quantity",params,undefined,false); 
			

			svc.renewOffering(params,cb);
		}

		
		service.ScheduleRun=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"projectArn",params,undefined,false); 
			copyArg(n,"test",params,undefined,true); 
			
			copyArg(msg,"projectArn",params,undefined,false); 
			copyArg(msg,"appArn",params,undefined,false); 
			copyArg(msg,"devicePoolArn",params,undefined,false); 
			copyArg(msg,"deviceSelectionConfiguration",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"test",params,undefined,true); 
			copyArg(msg,"configuration",params,undefined,true); 
			copyArg(msg,"executionConfiguration",params,undefined,false); 
			

			svc.scheduleRun(params,cb);
		}

		
		service.StopJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.stopJob(params,cb);
		}

		
		service.StopRemoteAccessSession=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.stopRemoteAccessSession(params,cb);
		}

		
		service.StopRun=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.stopRun(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateDeviceInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"profileArn",params,undefined,false); 
			copyArg(msg,"labels",params,undefined,true); 
			

			svc.updateDeviceInstance(params,cb);
		}

		
		service.UpdateDevicePool=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"rules",params,undefined,true); 
			copyArg(msg,"maxDevices",params,undefined,false); 
			copyArg(msg,"clearMaxDevices",params,undefined,false); 
			

			svc.updateDevicePool(params,cb);
		}

		
		service.UpdateInstanceProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"packageCleanup",params,undefined,false); 
			copyArg(msg,"excludeAppPackagesFromCleanup",params,undefined,true); 
			copyArg(msg,"rebootAfterUse",params,undefined,false); 
			

			svc.updateInstanceProfile(params,cb);
		}

		
		service.UpdateNetworkProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"type",params,undefined,false); 
			copyArg(msg,"uplinkBandwidthBits",params,undefined,false); 
			copyArg(msg,"downlinkBandwidthBits",params,undefined,false); 
			copyArg(msg,"uplinkDelayMs",params,undefined,false); 
			copyArg(msg,"downlinkDelayMs",params,undefined,false); 
			copyArg(msg,"uplinkJitterMs",params,undefined,false); 
			copyArg(msg,"downlinkJitterMs",params,undefined,false); 
			copyArg(msg,"uplinkLossPercent",params,undefined,false); 
			copyArg(msg,"downlinkLossPercent",params,undefined,false); 
			

			svc.updateNetworkProfile(params,cb);
		}

		
		service.UpdateProject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"defaultJobTimeoutMinutes",params,undefined,false); 
			

			svc.updateProject(params,cb);
		}

		
		service.UpdateTestGridProject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"projectArn",params,undefined,false); 
			
			copyArg(msg,"projectArn",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"vpcConfig",params,undefined,true); 
			

			svc.updateTestGridProject(params,cb);
		}

		
		service.UpdateUpload=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"contentType",params,undefined,false); 
			copyArg(msg,"editContent",params,undefined,false); 
			

			svc.updateUpload(params,cb);
		}

		
		service.UpdateVPCEConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"vpceConfigurationName",params,undefined,false); 
			copyArg(msg,"vpceServiceName",params,undefined,false); 
			copyArg(msg,"serviceDnsName",params,undefined,false); 
			copyArg(msg,"vpceConfigurationDescription",params,undefined,false); 
			

			svc.updateVPCEConfiguration(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS DeviceFarm", AmazonAPINode);

};
