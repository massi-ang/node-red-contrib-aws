
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

		var awsService = new AWS.SMS( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.SMS(msg.AWSConfig) : awsService;

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
		
			service.CreateApp=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"roleName",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"serverGroups",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"roleName",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"serverGroups",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createApp(params,cb);
		}
			service.CreateReplicationJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"serverId",params,undefined,false); 
			copyArgs(n,"seedReplicationTime",params,undefined,false); 
			
			copyArgs(n,"serverId",params,undefined,false); 
			copyArgs(n,"seedReplicationTime",params,undefined,false); 
			copyArgs(Number(n),"frequency",params,undefined,false); 
			copyArgs(Boolean(n),"runOnce",params,undefined,false); 
			copyArgs(n,"licenseType",params,undefined,false); 
			copyArgs(n,"roleName",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(Number(n),"numberOfRecentAmisToKeep",params,undefined,false); 
			copyArgs(Boolean(n),"encrypted",params,undefined,false); 
			copyArgs(n,"kmsKeyId",params,undefined,false); 
			
			copyArgs(msg,"serverId",params,undefined,false); 
			copyArgs(msg,"seedReplicationTime",params,undefined,false); 
			copyArgs(msg,"frequency",params,undefined,false); 
			copyArgs(msg,"runOnce",params,undefined,false); 
			copyArgs(msg,"licenseType",params,undefined,false); 
			copyArgs(msg,"roleName",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"numberOfRecentAmisToKeep",params,undefined,false); 
			copyArgs(msg,"encrypted",params,undefined,false); 
			copyArgs(msg,"kmsKeyId",params,undefined,false); 
			

			svc.createReplicationJob(params,cb);
		}
			service.DeleteApp=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(Boolean(n),"forceStopAppReplication",params,undefined,false); 
			copyArgs(Boolean(n),"forceTerminateApp",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"forceStopAppReplication",params,undefined,false); 
			copyArgs(msg,"forceTerminateApp",params,undefined,false); 
			

			svc.deleteApp(params,cb);
		}
			service.DeleteAppLaunchConfiguration=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			

			svc.deleteAppLaunchConfiguration(params,cb);
		}
			service.DeleteAppReplicationConfiguration=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			

			svc.deleteAppReplicationConfiguration(params,cb);
		}
			service.DeleteAppValidationConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			

			svc.deleteAppValidationConfiguration(params,cb);
		}
			service.DeleteReplicationJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"replicationJobId",params,undefined,false); 
			
			copyArgs(n,"replicationJobId",params,undefined,false); 
			
			copyArgs(msg,"replicationJobId",params,undefined,false); 
			

			svc.deleteReplicationJob(params,cb);
		}
			service.DeleteServerCatalog=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.deleteServerCatalog(params,cb);
		}
			service.DisassociateConnector=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"connectorId",params,undefined,false); 
			
			copyArgs(n,"connectorId",params,undefined,false); 
			
			copyArgs(msg,"connectorId",params,undefined,false); 
			

			svc.disassociateConnector(params,cb);
		}
			service.GenerateChangeSet=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"changesetFormat",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"changesetFormat",params,undefined,false); 
			

			svc.generateChangeSet(params,cb);
		}
			service.GenerateTemplate=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"templateFormat",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"templateFormat",params,undefined,false); 
			

			svc.generateTemplate(params,cb);
		}
			service.GetApp=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			

			svc.getApp(params,cb);
		}
			service.GetAppLaunchConfiguration=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			

			svc.getAppLaunchConfiguration(params,cb);
		}
			service.GetAppReplicationConfiguration=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			

			svc.getAppReplicationConfiguration(params,cb);
		}
			service.GetAppValidationConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			

			svc.getAppValidationConfiguration(params,cb);
		}
			service.GetAppValidationOutput=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			

			svc.getAppValidationOutput(params,cb);
		}
			service.GetConnectors=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getConnectors(params,cb);
		}
			service.GetReplicationJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"replicationJobId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"replicationJobId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getReplicationJobs(params,cb);
		}
			service.GetReplicationRuns=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"replicationJobId",params,undefined,false); 
			
			copyArgs(n,"replicationJobId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"replicationJobId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getReplicationRuns(params,cb);
		}
			service.GetServers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"vmServerAddressList",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"vmServerAddressList",params,undefined,false); 
			

			svc.getServers(params,cb);
		}
			service.ImportAppCatalog=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"roleName",params,undefined,false); 
			
			copyArgs(msg,"roleName",params,undefined,false); 
			

			svc.importAppCatalog(params,cb);
		}
			service.ImportServerCatalog=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.importServerCatalog(params,cb);
		}
			service.LaunchApp=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			

			svc.launchApp(params,cb);
		}
			service.ListApps=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"appIds",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"appIds",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listApps(params,cb);
		}
			service.NotifyAppValidationOutput=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"notificationContext",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"notificationContext",params,undefined,false); 
			

			svc.notifyAppValidationOutput(params,cb);
		}
			service.PutAppLaunchConfiguration=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"roleName",params,undefined,false); 
			copyArgs(Boolean(n),"autoLaunch",params,undefined,false); 
			copyArgs(n,"serverGroupLaunchConfigurations",params,undefined,true); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"roleName",params,undefined,false); 
			copyArgs(msg,"autoLaunch",params,undefined,false); 
			copyArgs(msg,"serverGroupLaunchConfigurations",params,undefined,true); 
			

			svc.putAppLaunchConfiguration(params,cb);
		}
			service.PutAppReplicationConfiguration=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"serverGroupReplicationConfigurations",params,undefined,true); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"serverGroupReplicationConfigurations",params,undefined,true); 
			

			svc.putAppReplicationConfiguration(params,cb);
		}
			service.PutAppValidationConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"appValidationConfigurations",params,undefined,true); 
			copyArgs(n,"serverGroupValidationConfigurations",params,undefined,true); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"appValidationConfigurations",params,undefined,true); 
			copyArgs(msg,"serverGroupValidationConfigurations",params,undefined,true); 
			

			svc.putAppValidationConfiguration(params,cb);
		}
			service.StartAppReplication=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			

			svc.startAppReplication(params,cb);
		}
			service.StartOnDemandAppReplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			

			svc.startOnDemandAppReplication(params,cb);
		}
			service.StartOnDemandReplicationRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"replicationJobId",params,undefined,false); 
			
			copyArgs(n,"replicationJobId",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			
			copyArgs(msg,"replicationJobId",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			

			svc.startOnDemandReplicationRun(params,cb);
		}
			service.StopAppReplication=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			

			svc.stopAppReplication(params,cb);
		}
			service.TerminateApp=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"appId",params,undefined,false); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			

			svc.terminateApp(params,cb);
		}
			service.UpdateApp=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"roleName",params,undefined,false); 
			copyArgs(n,"serverGroups",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"roleName",params,undefined,false); 
			copyArgs(msg,"serverGroups",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.updateApp(params,cb);
		}
			service.UpdateReplicationJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"replicationJobId",params,undefined,false); 
			
			copyArgs(n,"replicationJobId",params,undefined,false); 
			copyArgs(Number(n),"frequency",params,undefined,false); 
			copyArgs(n,"nextReplicationRunStartTime",params,undefined,false); 
			copyArgs(n,"licenseType",params,undefined,false); 
			copyArgs(n,"roleName",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(Number(n),"numberOfRecentAmisToKeep",params,undefined,false); 
			copyArgs(Boolean(n),"encrypted",params,undefined,false); 
			copyArgs(n,"kmsKeyId",params,undefined,false); 
			
			copyArgs(msg,"replicationJobId",params,undefined,false); 
			copyArgs(msg,"frequency",params,undefined,false); 
			copyArgs(msg,"nextReplicationRunStartTime",params,undefined,false); 
			copyArgs(msg,"licenseType",params,undefined,false); 
			copyArgs(msg,"roleName",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"numberOfRecentAmisToKeep",params,undefined,false); 
			copyArgs(msg,"encrypted",params,undefined,false); 
			copyArgs(msg,"kmsKeyId",params,undefined,false); 
			

			svc.updateReplicationJob(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS SMS", AmazonAPINode);

};
