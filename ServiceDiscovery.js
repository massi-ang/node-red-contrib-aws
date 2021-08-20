
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

		var awsService = new AWS.ServiceDiscovery( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.ServiceDiscovery(msg.AWSConfig) : awsService;

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

		
		service.CreateHttpNamespace=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"CreatorRequestId",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createHttpNamespace(params,cb);
		}

		
		service.CreatePrivateDnsNamespace=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Vpc",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"CreatorRequestId",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Vpc",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"Properties",params,undefined,false); 
			

			svc.createPrivateDnsNamespace(params,cb);
		}

		
		service.CreatePublicDnsNamespace=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"CreatorRequestId",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"Properties",params,undefined,false); 
			

			svc.createPublicDnsNamespace(params,cb);
		}

		
		service.CreateService=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"NamespaceId",params,undefined,false); 
			copyArg(msg,"CreatorRequestId",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DnsConfig",params,undefined,true); 
			copyArg(msg,"HealthCheckConfig",params,undefined,true); 
			copyArg(msg,"HealthCheckCustomConfig",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"Type",params,undefined,false); 
			

			svc.createService(params,cb);
		}

		
		service.DeleteNamespace=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.deleteNamespace(params,cb);
		}

		
		service.DeleteService=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.deleteService(params,cb);
		}

		
		service.DeregisterInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceId",params,undefined,false); 
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"ServiceId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.deregisterInstance(params,cb);
		}

		
		service.DiscoverInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NamespaceName",params,undefined,false); 
			copyArg(n,"ServiceName",params,undefined,false); 
			
			copyArg(msg,"NamespaceName",params,undefined,false); 
			copyArg(msg,"ServiceName",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"QueryParameters",params,undefined,true); 
			copyArg(msg,"OptionalParameters",params,undefined,true); 
			copyArg(msg,"HealthStatus",params,undefined,false); 
			

			svc.discoverInstances(params,cb);
		}

		
		service.GetInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceId",params,undefined,false); 
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"ServiceId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.getInstance(params,cb);
		}

		
		service.GetInstancesHealthStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceId",params,undefined,false); 
			
			copyArg(msg,"ServiceId",params,undefined,false); 
			copyArg(msg,"Instances",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getInstancesHealthStatus(params,cb);
		}

		
		service.GetNamespace=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getNamespace(params,cb);
		}

		
		service.GetOperation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OperationId",params,undefined,false); 
			
			copyArg(msg,"OperationId",params,undefined,false); 
			

			svc.getOperation(params,cb);
		}

		
		service.GetService=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getService(params,cb);
		}

		
		service.ListInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceId",params,undefined,false); 
			
			copyArg(msg,"ServiceId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listInstances(params,cb);
		}

		
		service.ListNamespaces=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			

			svc.listNamespaces(params,cb);
		}

		
		service.ListOperations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			

			svc.listOperations(params,cb);
		}

		
		service.ListServices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			

			svc.listServices(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.RegisterInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceId",params,undefined,false); 
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"Attributes",params,undefined,true); 
			
			copyArg(msg,"ServiceId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"CreatorRequestId",params,undefined,false); 
			copyArg(msg,"Attributes",params,undefined,true); 
			

			svc.registerInstance(params,cb);
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

		
		service.UpdateHttpNamespace=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"UpdaterRequestId",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			

			svc.updateHttpNamespace(params,cb);
		}

		
		service.UpdateInstanceCustomHealthStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceId",params,undefined,false); 
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"Status",params,undefined,false); 
			
			copyArg(msg,"ServiceId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			

			svc.updateInstanceCustomHealthStatus(params,cb);
		}

		
		service.UpdatePrivateDnsNamespace=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"UpdaterRequestId",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			

			svc.updatePrivateDnsNamespace(params,cb);
		}

		
		service.UpdatePublicDnsNamespace=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"UpdaterRequestId",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			

			svc.updatePublicDnsNamespace(params,cb);
		}

		
		service.UpdateService=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"Service",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"Service",params,undefined,false); 
			

			svc.updateService(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS ServiceDiscovery", AmazonAPINode);

};
