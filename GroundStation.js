
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

		var awsService = new AWS.GroundStation( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.GroundStation(msg.AWSConfig) : awsService;

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

		
		service.CancelContact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"contactId",params,undefined,false); 
			
			copyArg(msg,"contactId",params,undefined,false); 
			

			svc.cancelContact(params,cb);
		}

		
		service.CreateConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"configData",params,undefined,true); 
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"configData",params,undefined,true); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createConfig(params,cb);
		}

		
		service.CreateDataflowEndpointGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"endpointDetails",params,undefined,true); 
			
			copyArg(msg,"endpointDetails",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createDataflowEndpointGroup(params,cb);
		}

		
		service.CreateMissionProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"dataflowEdges",params,undefined,true); 
			copyArg(n,"minimumViableContactDurationSeconds",params,undefined,false); 
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"trackingConfigArn",params,undefined,false); 
			
			copyArg(msg,"contactPostPassDurationSeconds",params,undefined,false); 
			copyArg(msg,"contactPrePassDurationSeconds",params,undefined,false); 
			copyArg(msg,"dataflowEdges",params,undefined,true); 
			copyArg(msg,"minimumViableContactDurationSeconds",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"trackingConfigArn",params,undefined,false); 
			

			svc.createMissionProfile(params,cb);
		}

		
		service.DeleteConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"configId",params,undefined,false); 
			copyArg(n,"configType",params,undefined,false); 
			
			copyArg(msg,"configId",params,undefined,false); 
			copyArg(msg,"configType",params,undefined,false); 
			

			svc.deleteConfig(params,cb);
		}

		
		service.DeleteDataflowEndpointGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"dataflowEndpointGroupId",params,undefined,false); 
			
			copyArg(msg,"dataflowEndpointGroupId",params,undefined,false); 
			

			svc.deleteDataflowEndpointGroup(params,cb);
		}

		
		service.DeleteMissionProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"missionProfileId",params,undefined,false); 
			
			copyArg(msg,"missionProfileId",params,undefined,false); 
			

			svc.deleteMissionProfile(params,cb);
		}

		
		service.DescribeContact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"contactId",params,undefined,false); 
			
			copyArg(msg,"contactId",params,undefined,false); 
			

			svc.describeContact(params,cb);
		}

		
		service.GetConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"configId",params,undefined,false); 
			copyArg(n,"configType",params,undefined,false); 
			
			copyArg(msg,"configId",params,undefined,false); 
			copyArg(msg,"configType",params,undefined,false); 
			

			svc.getConfig(params,cb);
		}

		
		service.GetDataflowEndpointGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"dataflowEndpointGroupId",params,undefined,false); 
			
			copyArg(msg,"dataflowEndpointGroupId",params,undefined,false); 
			

			svc.getDataflowEndpointGroup(params,cb);
		}

		
		service.GetMinuteUsage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"month",params,undefined,false); 
			copyArg(n,"year",params,undefined,false); 
			
			copyArg(msg,"month",params,undefined,false); 
			copyArg(msg,"year",params,undefined,false); 
			

			svc.getMinuteUsage(params,cb);
		}

		
		service.GetMissionProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"missionProfileId",params,undefined,false); 
			
			copyArg(msg,"missionProfileId",params,undefined,false); 
			

			svc.getMissionProfile(params,cb);
		}

		
		service.GetSatellite=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"satelliteId",params,undefined,false); 
			
			copyArg(msg,"satelliteId",params,undefined,false); 
			

			svc.getSatellite(params,cb);
		}

		
		service.ListConfigs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listConfigs(params,cb);
		}

		
		service.ListContacts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"endTime",params,undefined,false); 
			copyArg(n,"startTime",params,undefined,false); 
			copyArg(n,"statusList",params,undefined,false); 
			
			copyArg(msg,"endTime",params,undefined,false); 
			copyArg(msg,"groundStation",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"missionProfileArn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"satelliteArn",params,undefined,false); 
			copyArg(msg,"startTime",params,undefined,false); 
			copyArg(msg,"statusList",params,undefined,false); 
			

			svc.listContacts(params,cb);
		}

		
		service.ListDataflowEndpointGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listDataflowEndpointGroups(params,cb);
		}

		
		service.ListGroundStations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"satelliteId",params,undefined,false); 
			

			svc.listGroundStations(params,cb);
		}

		
		service.ListMissionProfiles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listMissionProfiles(params,cb);
		}

		
		service.ListSatellites=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listSatellites(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ReserveContact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"endTime",params,undefined,false); 
			copyArg(n,"groundStation",params,undefined,false); 
			copyArg(n,"missionProfileArn",params,undefined,false); 
			copyArg(n,"satelliteArn",params,undefined,false); 
			copyArg(n,"startTime",params,undefined,false); 
			
			copyArg(msg,"endTime",params,undefined,false); 
			copyArg(msg,"groundStation",params,undefined,false); 
			copyArg(msg,"missionProfileArn",params,undefined,false); 
			copyArg(msg,"satelliteArn",params,undefined,false); 
			copyArg(msg,"startTime",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.reserveContact(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"tags",params,undefined,true); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"tagKeys",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"configData",params,undefined,true); 
			copyArg(n,"configId",params,undefined,false); 
			copyArg(n,"configType",params,undefined,false); 
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"configData",params,undefined,true); 
			copyArg(msg,"configId",params,undefined,false); 
			copyArg(msg,"configType",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			

			svc.updateConfig(params,cb);
		}

		
		service.UpdateMissionProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"missionProfileId",params,undefined,false); 
			
			copyArg(msg,"contactPostPassDurationSeconds",params,undefined,false); 
			copyArg(msg,"contactPrePassDurationSeconds",params,undefined,false); 
			copyArg(msg,"dataflowEdges",params,undefined,true); 
			copyArg(msg,"minimumViableContactDurationSeconds",params,undefined,false); 
			copyArg(msg,"missionProfileId",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"trackingConfigArn",params,undefined,false); 
			

			svc.updateMissionProfile(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS GroundStation", AmazonAPINode);

};
