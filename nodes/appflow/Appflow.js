
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

		var awsService = new AWS.Appflow( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Appflow(msg.AWSConfig) : awsService;

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
		
			service.CreateConnectorProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"connectorProfileName",params,undefined,false); 
			copyArgs(n,"connectorType",params,undefined,false); 
			copyArgs(n,"connectionMode",params,undefined,false); 
			copyArgs(n,"connectorProfileConfig",params,undefined,true); 
			
			copyArgs(n,"connectorProfileName",params,undefined,false); 
			copyArgs(n,"kmsArn",params,undefined,false); 
			copyArgs(n,"connectorType",params,undefined,false); 
			copyArgs(n,"connectionMode",params,undefined,false); 
			copyArgs(n,"connectorProfileConfig",params,undefined,true); 
			
			copyArgs(msg,"connectorProfileName",params,undefined,false); 
			copyArgs(msg,"kmsArn",params,undefined,false); 
			copyArgs(msg,"connectorType",params,undefined,false); 
			copyArgs(msg,"connectionMode",params,undefined,false); 
			copyArgs(msg,"connectorProfileConfig",params,undefined,true); 
			

			svc.createConnectorProfile(params,cb);
		}
			service.CreateFlow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"flowName",params,undefined,false); 
			copyArgs(n,"triggerConfig",params,undefined,true); 
			copyArgs(n,"sourceFlowConfig",params,undefined,true); 
			copyArgs(n,"destinationFlowConfigList",params,undefined,true); 
			copyArgs(n,"tasks",params,undefined,true); 
			
			copyArgs(n,"flowName",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"kmsArn",params,undefined,false); 
			copyArgs(n,"triggerConfig",params,undefined,true); 
			copyArgs(n,"sourceFlowConfig",params,undefined,true); 
			copyArgs(n,"destinationFlowConfigList",params,undefined,true); 
			copyArgs(n,"tasks",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"flowName",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"kmsArn",params,undefined,false); 
			copyArgs(msg,"triggerConfig",params,undefined,true); 
			copyArgs(msg,"sourceFlowConfig",params,undefined,true); 
			copyArgs(msg,"destinationFlowConfigList",params,undefined,true); 
			copyArgs(msg,"tasks",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createFlow(params,cb);
		}
			service.DeleteConnectorProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"connectorProfileName",params,undefined,false); 
			
			copyArgs(n,"connectorProfileName",params,undefined,false); 
			copyArgs(Boolean(n),"forceDelete",params,undefined,false); 
			
			copyArgs(msg,"connectorProfileName",params,undefined,false); 
			copyArgs(msg,"forceDelete",params,undefined,false); 
			

			svc.deleteConnectorProfile(params,cb);
		}
			service.DeleteFlow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"flowName",params,undefined,false); 
			
			copyArgs(n,"flowName",params,undefined,false); 
			copyArgs(Boolean(n),"forceDelete",params,undefined,false); 
			
			copyArgs(msg,"flowName",params,undefined,false); 
			copyArgs(msg,"forceDelete",params,undefined,false); 
			

			svc.deleteFlow(params,cb);
		}
			service.DescribeConnectorEntity=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"connectorEntityName",params,undefined,false); 
			
			copyArgs(n,"connectorEntityName",params,undefined,false); 
			copyArgs(n,"connectorType",params,undefined,false); 
			copyArgs(n,"connectorProfileName",params,undefined,false); 
			
			copyArgs(msg,"connectorEntityName",params,undefined,false); 
			copyArgs(msg,"connectorType",params,undefined,false); 
			copyArgs(msg,"connectorProfileName",params,undefined,false); 
			

			svc.describeConnectorEntity(params,cb);
		}
			service.DescribeConnectorProfiles=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"connectorProfileNames",params,undefined,false); 
			copyArgs(n,"connectorType",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"connectorProfileNames",params,undefined,false); 
			copyArgs(msg,"connectorType",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.describeConnectorProfiles(params,cb);
		}
			service.DescribeConnectors=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"connectorTypes",params,undefined,true); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"connectorTypes",params,undefined,true); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.describeConnectors(params,cb);
		}
			service.DescribeFlow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"flowName",params,undefined,false); 
			
			copyArgs(n,"flowName",params,undefined,false); 
			
			copyArgs(msg,"flowName",params,undefined,false); 
			

			svc.describeFlow(params,cb);
		}
			service.DescribeFlowExecutionRecords=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"flowName",params,undefined,false); 
			
			copyArgs(n,"flowName",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"flowName",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.describeFlowExecutionRecords(params,cb);
		}
			service.ListConnectorEntities=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"connectorProfileName",params,undefined,false); 
			copyArgs(n,"connectorType",params,undefined,false); 
			copyArgs(n,"entitiesPath",params,undefined,false); 
			
			copyArgs(msg,"connectorProfileName",params,undefined,false); 
			copyArgs(msg,"connectorType",params,undefined,false); 
			copyArgs(msg,"entitiesPath",params,undefined,false); 
			

			svc.listConnectorEntities(params,cb);
		}
			service.ListFlows=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listFlows(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.StartFlow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"flowName",params,undefined,false); 
			
			copyArgs(n,"flowName",params,undefined,false); 
			
			copyArgs(msg,"flowName",params,undefined,false); 
			

			svc.startFlow(params,cb);
		}
			service.StopFlow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"flowName",params,undefined,false); 
			
			copyArgs(n,"flowName",params,undefined,false); 
			
			copyArgs(msg,"flowName",params,undefined,false); 
			

			svc.stopFlow(params,cb);
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
			service.UpdateConnectorProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"connectorProfileName",params,undefined,false); 
			copyArgs(n,"connectionMode",params,undefined,false); 
			copyArgs(n,"connectorProfileConfig",params,undefined,true); 
			
			copyArgs(n,"connectorProfileName",params,undefined,false); 
			copyArgs(n,"connectionMode",params,undefined,false); 
			copyArgs(n,"connectorProfileConfig",params,undefined,true); 
			
			copyArgs(msg,"connectorProfileName",params,undefined,false); 
			copyArgs(msg,"connectionMode",params,undefined,false); 
			copyArgs(msg,"connectorProfileConfig",params,undefined,true); 
			

			svc.updateConnectorProfile(params,cb);
		}
			service.UpdateFlow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"flowName",params,undefined,false); 
			copyArgs(n,"triggerConfig",params,undefined,true); 
			copyArgs(n,"sourceFlowConfig",params,undefined,true); 
			copyArgs(n,"destinationFlowConfigList",params,undefined,true); 
			copyArgs(n,"tasks",params,undefined,true); 
			
			copyArgs(n,"flowName",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"triggerConfig",params,undefined,true); 
			copyArgs(n,"sourceFlowConfig",params,undefined,true); 
			copyArgs(n,"destinationFlowConfigList",params,undefined,true); 
			copyArgs(n,"tasks",params,undefined,true); 
			
			copyArgs(msg,"flowName",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"triggerConfig",params,undefined,true); 
			copyArgs(msg,"sourceFlowConfig",params,undefined,true); 
			copyArgs(msg,"destinationFlowConfigList",params,undefined,true); 
			copyArgs(msg,"tasks",params,undefined,true); 
			

			svc.updateFlow(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS Appflow", AmazonAPINode);

};
