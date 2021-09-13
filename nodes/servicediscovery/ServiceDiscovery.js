
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

		var awsService = new AWS.ServiceDiscovery( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.ServiceDiscovery(msg.AWSConfig) : awsService;

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
		
			service.CreateHttpNamespace=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"CreatorRequestId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"CreatorRequestId",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createHttpNamespace(params,cb);
		}
			service.CreatePrivateDnsNamespace=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Vpc",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"CreatorRequestId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Vpc",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"Properties",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"CreatorRequestId",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Vpc",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"Properties",params,undefined,false); 
			

			svc.createPrivateDnsNamespace(params,cb);
		}
			service.CreatePublicDnsNamespace=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"CreatorRequestId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"Properties",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"CreatorRequestId",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"Properties",params,undefined,false); 
			

			svc.createPublicDnsNamespace(params,cb);
		}
			service.CreateService=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"NamespaceId",params,undefined,false); 
			copyArgs(n,"CreatorRequestId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"DnsConfig",params,undefined,true); 
			copyArgs(n,"HealthCheckConfig",params,undefined,true); 
			copyArgs(n,"HealthCheckCustomConfig",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"NamespaceId",params,undefined,false); 
			copyArgs(msg,"CreatorRequestId",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DnsConfig",params,undefined,true); 
			copyArgs(msg,"HealthCheckConfig",params,undefined,true); 
			copyArgs(msg,"HealthCheckCustomConfig",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"Type",params,undefined,false); 
			

			svc.createService(params,cb);
		}
			service.DeleteNamespace=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.deleteNamespace(params,cb);
		}
			service.DeleteService=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.deleteService(params,cb);
		}
			service.DeregisterInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServiceId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"ServiceId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"ServiceId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.deregisterInstance(params,cb);
		}
			service.DiscoverInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NamespaceName",params,undefined,false); 
			copyArgs(n,"ServiceName",params,undefined,false); 
			
			copyArgs(n,"NamespaceName",params,undefined,false); 
			copyArgs(n,"ServiceName",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"QueryParameters",params,undefined,true); 
			copyArgs(n,"OptionalParameters",params,undefined,true); 
			copyArgs(n,"HealthStatus",params,undefined,false); 
			
			copyArgs(msg,"NamespaceName",params,undefined,false); 
			copyArgs(msg,"ServiceName",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"QueryParameters",params,undefined,true); 
			copyArgs(msg,"OptionalParameters",params,undefined,true); 
			copyArgs(msg,"HealthStatus",params,undefined,false); 
			

			svc.discoverInstances(params,cb);
		}
			service.GetInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServiceId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"ServiceId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"ServiceId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.getInstance(params,cb);
		}
			service.GetInstancesHealthStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServiceId",params,undefined,false); 
			
			copyArgs(n,"ServiceId",params,undefined,false); 
			copyArgs(n,"Instances",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ServiceId",params,undefined,false); 
			copyArgs(msg,"Instances",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getInstancesHealthStatus(params,cb);
		}
			service.GetNamespace=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getNamespace(params,cb);
		}
			service.GetOperation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OperationId",params,undefined,false); 
			
			copyArgs(n,"OperationId",params,undefined,false); 
			
			copyArgs(msg,"OperationId",params,undefined,false); 
			

			svc.getOperation(params,cb);
		}
			service.GetService=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getService(params,cb);
		}
			service.ListInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServiceId",params,undefined,false); 
			
			copyArgs(n,"ServiceId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ServiceId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listInstances(params,cb);
		}
			service.ListNamespaces=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			

			svc.listNamespaces(params,cb);
		}
			service.ListOperations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			

			svc.listOperations(params,cb);
		}
			service.ListServices=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			

			svc.listServices(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.RegisterInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServiceId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Attributes",params,undefined,true); 
			
			copyArgs(n,"ServiceId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"CreatorRequestId",params,undefined,false); 
			copyArgs(n,"Attributes",params,undefined,true); 
			
			copyArgs(msg,"ServiceId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"CreatorRequestId",params,undefined,false); 
			copyArgs(msg,"Attributes",params,undefined,true); 
			

			svc.registerInstance(params,cb);
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
			service.UpdateHttpNamespace=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"UpdaterRequestId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"UpdaterRequestId",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			

			svc.updateHttpNamespace(params,cb);
		}
			service.UpdateInstanceCustomHealthStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServiceId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(n,"ServiceId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(msg,"ServiceId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			

			svc.updateInstanceCustomHealthStatus(params,cb);
		}
			service.UpdatePrivateDnsNamespace=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"UpdaterRequestId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"UpdaterRequestId",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			

			svc.updatePrivateDnsNamespace(params,cb);
		}
			service.UpdatePublicDnsNamespace=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"UpdaterRequestId",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"UpdaterRequestId",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			

			svc.updatePublicDnsNamespace(params,cb);
		}
			service.UpdateService=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Service",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Service",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"Service",params,undefined,false); 
			

			svc.updateService(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS ServiceDiscovery", AmazonAPINode);

};
