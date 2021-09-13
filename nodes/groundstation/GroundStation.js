
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

		var awsService = new AWS.GroundStation( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.GroundStation(msg.AWSConfig) : awsService;

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
		
			service.CancelContact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"contactId",params,undefined,false); 
			
			copyArgs(n,"contactId",params,undefined,false); 
			
			copyArgs(msg,"contactId",params,undefined,false); 
			

			svc.cancelContact(params,cb);
		}
			service.CreateConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"configData",params,undefined,true); 
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"configData",params,undefined,true); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"configData",params,undefined,true); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createConfig(params,cb);
		}
			service.CreateDataflowEndpointGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"endpointDetails",params,undefined,true); 
			
			copyArgs(n,"endpointDetails",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"endpointDetails",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createDataflowEndpointGroup(params,cb);
		}
			service.CreateMissionProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"dataflowEdges",params,undefined,true); 
			copyArgs(Number(n),"minimumViableContactDurationSeconds",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"trackingConfigArn",params,undefined,false); 
			
			copyArgs(Number(n),"contactPostPassDurationSeconds",params,undefined,false); 
			copyArgs(Number(n),"contactPrePassDurationSeconds",params,undefined,false); 
			copyArgs(n,"dataflowEdges",params,undefined,true); 
			copyArgs(Number(n),"minimumViableContactDurationSeconds",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"trackingConfigArn",params,undefined,false); 
			
			copyArgs(msg,"contactPostPassDurationSeconds",params,undefined,false); 
			copyArgs(msg,"contactPrePassDurationSeconds",params,undefined,false); 
			copyArgs(msg,"dataflowEdges",params,undefined,true); 
			copyArgs(msg,"minimumViableContactDurationSeconds",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"trackingConfigArn",params,undefined,false); 
			

			svc.createMissionProfile(params,cb);
		}
			service.DeleteConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"configId",params,undefined,false); 
			copyArgs(n,"configType",params,undefined,false); 
			
			copyArgs(n,"configId",params,undefined,false); 
			copyArgs(n,"configType",params,undefined,false); 
			
			copyArgs(msg,"configId",params,undefined,false); 
			copyArgs(msg,"configType",params,undefined,false); 
			

			svc.deleteConfig(params,cb);
		}
			service.DeleteDataflowEndpointGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"dataflowEndpointGroupId",params,undefined,false); 
			
			copyArgs(n,"dataflowEndpointGroupId",params,undefined,false); 
			
			copyArgs(msg,"dataflowEndpointGroupId",params,undefined,false); 
			

			svc.deleteDataflowEndpointGroup(params,cb);
		}
			service.DeleteMissionProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"missionProfileId",params,undefined,false); 
			
			copyArgs(n,"missionProfileId",params,undefined,false); 
			
			copyArgs(msg,"missionProfileId",params,undefined,false); 
			

			svc.deleteMissionProfile(params,cb);
		}
			service.DescribeContact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"contactId",params,undefined,false); 
			
			copyArgs(n,"contactId",params,undefined,false); 
			
			copyArgs(msg,"contactId",params,undefined,false); 
			

			svc.describeContact(params,cb);
		}
			service.GetConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"configId",params,undefined,false); 
			copyArgs(n,"configType",params,undefined,false); 
			
			copyArgs(n,"configId",params,undefined,false); 
			copyArgs(n,"configType",params,undefined,false); 
			
			copyArgs(msg,"configId",params,undefined,false); 
			copyArgs(msg,"configType",params,undefined,false); 
			

			svc.getConfig(params,cb);
		}
			service.GetDataflowEndpointGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"dataflowEndpointGroupId",params,undefined,false); 
			
			copyArgs(n,"dataflowEndpointGroupId",params,undefined,false); 
			
			copyArgs(msg,"dataflowEndpointGroupId",params,undefined,false); 
			

			svc.getDataflowEndpointGroup(params,cb);
		}
			service.GetMinuteUsage=function(svc,msg,cb){
			var params={};
			
			copyArgs(Number(n),"month",params,undefined,false); 
			copyArgs(Number(n),"year",params,undefined,false); 
			
			copyArgs(Number(n),"month",params,undefined,false); 
			copyArgs(Number(n),"year",params,undefined,false); 
			
			copyArgs(msg,"month",params,undefined,false); 
			copyArgs(msg,"year",params,undefined,false); 
			

			svc.getMinuteUsage(params,cb);
		}
			service.GetMissionProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"missionProfileId",params,undefined,false); 
			
			copyArgs(n,"missionProfileId",params,undefined,false); 
			
			copyArgs(msg,"missionProfileId",params,undefined,false); 
			

			svc.getMissionProfile(params,cb);
		}
			service.GetSatellite=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"satelliteId",params,undefined,false); 
			
			copyArgs(n,"satelliteId",params,undefined,false); 
			
			copyArgs(msg,"satelliteId",params,undefined,false); 
			

			svc.getSatellite(params,cb);
		}
			service.ListConfigs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listConfigs(params,cb);
		}
			service.ListContacts=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"statusList",params,undefined,false); 
			
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(n,"groundStation",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"missionProfileArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"satelliteArn",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"statusList",params,undefined,false); 
			
			copyArgs(msg,"endTime",params,undefined,false); 
			copyArgs(msg,"groundStation",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"missionProfileArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"satelliteArn",params,undefined,false); 
			copyArgs(msg,"startTime",params,undefined,false); 
			copyArgs(msg,"statusList",params,undefined,false); 
			

			svc.listContacts(params,cb);
		}
			service.ListDataflowEndpointGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listDataflowEndpointGroups(params,cb);
		}
			service.ListGroundStations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"satelliteId",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"satelliteId",params,undefined,false); 
			

			svc.listGroundStations(params,cb);
		}
			service.ListMissionProfiles=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listMissionProfiles(params,cb);
		}
			service.ListSatellites=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listSatellites(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.ReserveContact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(n,"groundStation",params,undefined,false); 
			copyArgs(n,"missionProfileArn",params,undefined,false); 
			copyArgs(n,"satelliteArn",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(n,"groundStation",params,undefined,false); 
			copyArgs(n,"missionProfileArn",params,undefined,false); 
			copyArgs(n,"satelliteArn",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"endTime",params,undefined,false); 
			copyArgs(msg,"groundStation",params,undefined,false); 
			copyArgs(msg,"missionProfileArn",params,undefined,false); 
			copyArgs(msg,"satelliteArn",params,undefined,false); 
			copyArgs(msg,"startTime",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.reserveContact(params,cb);
		}
			service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
			service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
			service.UpdateConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"configData",params,undefined,true); 
			copyArgs(n,"configId",params,undefined,false); 
			copyArgs(n,"configType",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"configData",params,undefined,true); 
			copyArgs(n,"configId",params,undefined,false); 
			copyArgs(n,"configType",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"configData",params,undefined,true); 
			copyArgs(msg,"configId",params,undefined,false); 
			copyArgs(msg,"configType",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.updateConfig(params,cb);
		}
			service.UpdateMissionProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"missionProfileId",params,undefined,false); 
			
			copyArgs(Number(n),"contactPostPassDurationSeconds",params,undefined,false); 
			copyArgs(Number(n),"contactPrePassDurationSeconds",params,undefined,false); 
			copyArgs(n,"dataflowEdges",params,undefined,true); 
			copyArgs(Number(n),"minimumViableContactDurationSeconds",params,undefined,false); 
			copyArgs(n,"missionProfileId",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"trackingConfigArn",params,undefined,false); 
			
			copyArgs(msg,"contactPostPassDurationSeconds",params,undefined,false); 
			copyArgs(msg,"contactPrePassDurationSeconds",params,undefined,false); 
			copyArgs(msg,"dataflowEdges",params,undefined,true); 
			copyArgs(msg,"minimumViableContactDurationSeconds",params,undefined,false); 
			copyArgs(msg,"missionProfileId",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"trackingConfigArn",params,undefined,false); 
			

			svc.updateMissionProfile(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS GroundStation", AmazonAPINode);

};
