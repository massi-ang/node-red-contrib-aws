
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

		var awsService = new AWS.ECS( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.ECS(msg.AWSConfig) : awsService;

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

		
		service.CreateCapacityProvider=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"autoScalingGroupProvider",params,undefined,true); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"autoScalingGroupProvider",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"autoScalingGroupProvider",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createCapacityProvider(params,cb);
		}

		
		service.CreateCluster=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"clusterName",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"settings",params,undefined,true); 
			copyArgs(n,"configuration",params,undefined,true); 
			copyArgs(n,"capacityProviders",params,undefined,true); 
			copyArgs(n,"defaultCapacityProviderStrategy",params,undefined,true); 
			
			copyArgs(msg,"clusterName",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"settings",params,undefined,true); 
			copyArgs(msg,"configuration",params,undefined,true); 
			copyArgs(msg,"capacityProviders",params,undefined,true); 
			copyArgs(msg,"defaultCapacityProviderStrategy",params,undefined,true); 
			

			svc.createCluster(params,cb);
		}

		
		service.CreateService=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"serviceName",params,undefined,false); 
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"serviceName",params,undefined,false); 
			copyArgs(n,"taskDefinition",params,undefined,false); 
			copyArgs(n,"loadBalancers",params,undefined,true); 
			copyArgs(n,"serviceRegistries",params,undefined,true); 
			copyArgs(n,"desiredCount",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"launchType",params,undefined,false); 
			copyArgs(n,"capacityProviderStrategy",params,undefined,true); 
			copyArgs(n,"platformVersion",params,undefined,false); 
			copyArgs(n,"role",params,undefined,false); 
			copyArgs(n,"deploymentConfiguration",params,undefined,true); 
			copyArgs(n,"placementConstraints",params,undefined,true); 
			copyArgs(n,"placementStrategy",params,undefined,true); 
			copyArgs(n,"networkConfiguration",params,undefined,true); 
			copyArgs(n,"healthCheckGracePeriodSeconds",params,undefined,false); 
			copyArgs(n,"schedulingStrategy",params,undefined,false); 
			copyArgs(n,"deploymentController",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"enableECSManagedTags",params,undefined,false); 
			copyArgs(n,"propagateTags",params,undefined,false); 
			copyArgs(n,"enableExecuteCommand",params,undefined,false); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"serviceName",params,undefined,false); 
			copyArgs(msg,"taskDefinition",params,undefined,false); 
			copyArgs(msg,"loadBalancers",params,undefined,true); 
			copyArgs(msg,"serviceRegistries",params,undefined,true); 
			copyArgs(msg,"desiredCount",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"launchType",params,undefined,false); 
			copyArgs(msg,"capacityProviderStrategy",params,undefined,true); 
			copyArgs(msg,"platformVersion",params,undefined,false); 
			copyArgs(msg,"role",params,undefined,false); 
			copyArgs(msg,"deploymentConfiguration",params,undefined,true); 
			copyArgs(msg,"placementConstraints",params,undefined,true); 
			copyArgs(msg,"placementStrategy",params,undefined,true); 
			copyArgs(msg,"networkConfiguration",params,undefined,true); 
			copyArgs(msg,"healthCheckGracePeriodSeconds",params,undefined,false); 
			copyArgs(msg,"schedulingStrategy",params,undefined,false); 
			copyArgs(msg,"deploymentController",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"enableECSManagedTags",params,undefined,false); 
			copyArgs(msg,"propagateTags",params,undefined,false); 
			copyArgs(msg,"enableExecuteCommand",params,undefined,false); 
			

			svc.createService(params,cb);
		}

		
		service.CreateTaskSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"service",params,undefined,false); 
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"taskDefinition",params,undefined,false); 
			
			copyArgs(n,"service",params,undefined,false); 
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"externalId",params,undefined,false); 
			copyArgs(n,"taskDefinition",params,undefined,false); 
			copyArgs(n,"networkConfiguration",params,undefined,true); 
			copyArgs(n,"loadBalancers",params,undefined,true); 
			copyArgs(n,"serviceRegistries",params,undefined,true); 
			copyArgs(n,"launchType",params,undefined,false); 
			copyArgs(n,"capacityProviderStrategy",params,undefined,true); 
			copyArgs(n,"platformVersion",params,undefined,false); 
			copyArgs(n,"scale",params,undefined,true); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"service",params,undefined,false); 
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"externalId",params,undefined,false); 
			copyArgs(msg,"taskDefinition",params,undefined,false); 
			copyArgs(msg,"networkConfiguration",params,undefined,true); 
			copyArgs(msg,"loadBalancers",params,undefined,true); 
			copyArgs(msg,"serviceRegistries",params,undefined,true); 
			copyArgs(msg,"launchType",params,undefined,false); 
			copyArgs(msg,"capacityProviderStrategy",params,undefined,true); 
			copyArgs(msg,"platformVersion",params,undefined,false); 
			copyArgs(msg,"scale",params,undefined,true); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createTaskSet(params,cb);
		}

		
		service.DeleteAccountSetting=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"principalArn",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"principalArn",params,undefined,false); 
			

			svc.deleteAccountSetting(params,cb);
		}

		
		service.DeleteAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"attributes",params,undefined,true); 
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"attributes",params,undefined,true); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"attributes",params,undefined,true); 
			

			svc.deleteAttributes(params,cb);
		}

		
		service.DeleteCapacityProvider=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"capacityProvider",params,undefined,false); 
			
			copyArgs(n,"capacityProvider",params,undefined,false); 
			
			copyArgs(msg,"capacityProvider",params,undefined,false); 
			

			svc.deleteCapacityProvider(params,cb);
		}

		
		service.DeleteCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"cluster",params,undefined,false); 
			
			copyArgs(n,"cluster",params,undefined,false); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			

			svc.deleteCluster(params,cb);
		}

		
		service.DeleteService=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"service",params,undefined,false); 
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"service",params,undefined,false); 
			copyArgs(n,"force",params,undefined,false); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"service",params,undefined,false); 
			copyArgs(msg,"force",params,undefined,false); 
			

			svc.deleteService(params,cb);
		}

		
		service.DeleteTaskSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"service",params,undefined,false); 
			copyArgs(n,"taskSet",params,undefined,false); 
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"service",params,undefined,false); 
			copyArgs(n,"taskSet",params,undefined,false); 
			copyArgs(n,"force",params,undefined,false); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"service",params,undefined,false); 
			copyArgs(msg,"taskSet",params,undefined,false); 
			copyArgs(msg,"force",params,undefined,false); 
			

			svc.deleteTaskSet(params,cb);
		}

		
		service.DeregisterContainerInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"containerInstance",params,undefined,false); 
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"containerInstance",params,undefined,false); 
			copyArgs(n,"force",params,undefined,false); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"containerInstance",params,undefined,false); 
			copyArgs(msg,"force",params,undefined,false); 
			

			svc.deregisterContainerInstance(params,cb);
		}

		
		service.DeregisterTaskDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"taskDefinition",params,undefined,false); 
			
			copyArgs(n,"taskDefinition",params,undefined,false); 
			
			copyArgs(msg,"taskDefinition",params,undefined,false); 
			

			svc.deregisterTaskDefinition(params,cb);
		}

		
		service.DescribeCapacityProviders=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"capacityProviders",params,undefined,true); 
			copyArgs(n,"include",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"capacityProviders",params,undefined,true); 
			copyArgs(msg,"include",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.describeCapacityProviders(params,cb);
		}

		
		service.DescribeClusters=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"clusters",params,undefined,true); 
			copyArgs(n,"include",params,undefined,false); 
			
			copyArgs(msg,"clusters",params,undefined,true); 
			copyArgs(msg,"include",params,undefined,false); 
			

			svc.describeClusters(params,cb);
		}

		
		service.DescribeContainerInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"containerInstances",params,undefined,true); 
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"containerInstances",params,undefined,true); 
			copyArgs(n,"include",params,undefined,false); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"containerInstances",params,undefined,true); 
			copyArgs(msg,"include",params,undefined,false); 
			

			svc.describeContainerInstances(params,cb);
		}

		
		service.DescribeServices=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"services",params,undefined,true); 
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"services",params,undefined,true); 
			copyArgs(n,"include",params,undefined,false); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"services",params,undefined,true); 
			copyArgs(msg,"include",params,undefined,false); 
			

			svc.describeServices(params,cb);
		}

		
		service.DescribeTaskDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"taskDefinition",params,undefined,false); 
			
			copyArgs(n,"taskDefinition",params,undefined,false); 
			copyArgs(n,"include",params,undefined,false); 
			
			copyArgs(msg,"taskDefinition",params,undefined,false); 
			copyArgs(msg,"include",params,undefined,false); 
			

			svc.describeTaskDefinition(params,cb);
		}

		
		service.DescribeTaskSets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"service",params,undefined,false); 
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"service",params,undefined,false); 
			copyArgs(n,"taskSets",params,undefined,true); 
			copyArgs(n,"include",params,undefined,false); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"service",params,undefined,false); 
			copyArgs(msg,"taskSets",params,undefined,true); 
			copyArgs(msg,"include",params,undefined,false); 
			

			svc.describeTaskSets(params,cb);
		}

		
		service.DescribeTasks=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"tasks",params,undefined,true); 
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"tasks",params,undefined,true); 
			copyArgs(n,"include",params,undefined,false); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"tasks",params,undefined,true); 
			copyArgs(msg,"include",params,undefined,false); 
			

			svc.describeTasks(params,cb);
		}

		
		service.DiscoverPollEndpoint=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"containerInstance",params,undefined,false); 
			copyArgs(n,"cluster",params,undefined,false); 
			
			copyArgs(msg,"containerInstance",params,undefined,false); 
			copyArgs(msg,"cluster",params,undefined,false); 
			

			svc.discoverPollEndpoint(params,cb);
		}

		
		service.ExecuteCommand=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"command",params,undefined,false); 
			copyArgs(n,"interactive",params,undefined,false); 
			copyArgs(n,"task",params,undefined,false); 
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"container",params,undefined,false); 
			copyArgs(n,"command",params,undefined,false); 
			copyArgs(n,"interactive",params,undefined,false); 
			copyArgs(n,"task",params,undefined,false); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"container",params,undefined,false); 
			copyArgs(msg,"command",params,undefined,false); 
			copyArgs(msg,"interactive",params,undefined,false); 
			copyArgs(msg,"task",params,undefined,false); 
			

			svc.executeCommand(params,cb);
		}

		
		service.ListAccountSettings=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"value",params,undefined,false); 
			copyArgs(n,"principalArn",params,undefined,false); 
			copyArgs(n,"effectiveSettings",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"value",params,undefined,false); 
			copyArgs(msg,"principalArn",params,undefined,false); 
			copyArgs(msg,"effectiveSettings",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listAccountSettings(params,cb);
		}

		
		service.ListAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"targetType",params,undefined,false); 
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"targetType",params,undefined,false); 
			copyArgs(n,"attributeName",params,undefined,false); 
			copyArgs(n,"attributeValue",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"targetType",params,undefined,false); 
			copyArgs(msg,"attributeName",params,undefined,false); 
			copyArgs(msg,"attributeValue",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listAttributes(params,cb);
		}

		
		service.ListClusters=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listClusters(params,cb);
		}

		
		service.ListContainerInstances=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"filter",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"filter",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"status",params,undefined,false); 
			

			svc.listContainerInstances(params,cb);
		}

		
		service.ListServices=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"launchType",params,undefined,false); 
			copyArgs(n,"schedulingStrategy",params,undefined,false); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"launchType",params,undefined,false); 
			copyArgs(msg,"schedulingStrategy",params,undefined,false); 
			

			svc.listServices(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListTaskDefinitionFamilies=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"familyPrefix",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"familyPrefix",params,undefined,false); 
			copyArgs(msg,"status",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listTaskDefinitionFamilies(params,cb);
		}

		
		service.ListTaskDefinitions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"familyPrefix",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			copyArgs(n,"sort",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"familyPrefix",params,undefined,false); 
			copyArgs(msg,"status",params,undefined,false); 
			copyArgs(msg,"sort",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listTaskDefinitions(params,cb);
		}

		
		service.ListTasks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"containerInstance",params,undefined,false); 
			copyArgs(n,"family",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"startedBy",params,undefined,false); 
			copyArgs(n,"serviceName",params,undefined,false); 
			copyArgs(n,"desiredStatus",params,undefined,false); 
			copyArgs(n,"launchType",params,undefined,false); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"containerInstance",params,undefined,false); 
			copyArgs(msg,"family",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"startedBy",params,undefined,false); 
			copyArgs(msg,"serviceName",params,undefined,false); 
			copyArgs(msg,"desiredStatus",params,undefined,false); 
			copyArgs(msg,"launchType",params,undefined,false); 
			

			svc.listTasks(params,cb);
		}

		
		service.PutAccountSetting=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"value",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"value",params,undefined,false); 
			copyArgs(n,"principalArn",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"value",params,undefined,false); 
			copyArgs(msg,"principalArn",params,undefined,false); 
			

			svc.putAccountSetting(params,cb);
		}

		
		service.PutAccountSettingDefault=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"value",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"value",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"value",params,undefined,false); 
			

			svc.putAccountSettingDefault(params,cb);
		}

		
		service.PutAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"attributes",params,undefined,true); 
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"attributes",params,undefined,true); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"attributes",params,undefined,true); 
			

			svc.putAttributes(params,cb);
		}

		
		service.PutClusterCapacityProviders=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"capacityProviders",params,undefined,true); 
			copyArgs(n,"defaultCapacityProviderStrategy",params,undefined,true); 
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"capacityProviders",params,undefined,true); 
			copyArgs(n,"defaultCapacityProviderStrategy",params,undefined,true); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"capacityProviders",params,undefined,true); 
			copyArgs(msg,"defaultCapacityProviderStrategy",params,undefined,true); 
			

			svc.putClusterCapacityProviders(params,cb);
		}

		
		service.RegisterContainerInstance=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"instanceIdentityDocument",params,undefined,false); 
			copyArgs(n,"instanceIdentityDocumentSignature",params,undefined,false); 
			copyArgs(n,"totalResources",params,undefined,true); 
			copyArgs(n,"versionInfo",params,undefined,true); 
			copyArgs(n,"containerInstanceArn",params,undefined,false); 
			copyArgs(n,"attributes",params,undefined,true); 
			copyArgs(n,"platformDevices",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"instanceIdentityDocument",params,undefined,false); 
			copyArgs(msg,"instanceIdentityDocumentSignature",params,undefined,false); 
			copyArgs(msg,"totalResources",params,undefined,true); 
			copyArgs(msg,"versionInfo",params,undefined,true); 
			copyArgs(msg,"containerInstanceArn",params,undefined,false); 
			copyArgs(msg,"attributes",params,undefined,true); 
			copyArgs(msg,"platformDevices",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.registerContainerInstance(params,cb);
		}

		
		service.RegisterTaskDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"family",params,undefined,false); 
			copyArgs(n,"containerDefinitions",params,undefined,true); 
			
			copyArgs(n,"family",params,undefined,false); 
			copyArgs(n,"taskRoleArn",params,undefined,false); 
			copyArgs(n,"executionRoleArn",params,undefined,false); 
			copyArgs(n,"networkMode",params,undefined,false); 
			copyArgs(n,"containerDefinitions",params,undefined,true); 
			copyArgs(n,"volumes",params,undefined,true); 
			copyArgs(n,"placementConstraints",params,undefined,true); 
			copyArgs(n,"requiresCompatibilities",params,undefined,true); 
			copyArgs(n,"cpu",params,undefined,false); 
			copyArgs(n,"memory",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"pidMode",params,undefined,false); 
			copyArgs(n,"ipcMode",params,undefined,false); 
			copyArgs(n,"proxyConfiguration",params,undefined,true); 
			copyArgs(n,"inferenceAccelerators",params,undefined,true); 
			copyArgs(n,"ephemeralStorage",params,undefined,true); 
			
			copyArgs(msg,"family",params,undefined,false); 
			copyArgs(msg,"taskRoleArn",params,undefined,false); 
			copyArgs(msg,"executionRoleArn",params,undefined,false); 
			copyArgs(msg,"networkMode",params,undefined,false); 
			copyArgs(msg,"containerDefinitions",params,undefined,true); 
			copyArgs(msg,"volumes",params,undefined,true); 
			copyArgs(msg,"placementConstraints",params,undefined,true); 
			copyArgs(msg,"requiresCompatibilities",params,undefined,true); 
			copyArgs(msg,"cpu",params,undefined,false); 
			copyArgs(msg,"memory",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"pidMode",params,undefined,false); 
			copyArgs(msg,"ipcMode",params,undefined,false); 
			copyArgs(msg,"proxyConfiguration",params,undefined,true); 
			copyArgs(msg,"inferenceAccelerators",params,undefined,true); 
			copyArgs(msg,"ephemeralStorage",params,undefined,true); 
			

			svc.registerTaskDefinition(params,cb);
		}

		
		service.RunTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"taskDefinition",params,undefined,false); 
			
			copyArgs(n,"capacityProviderStrategy",params,undefined,true); 
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"count",params,undefined,false); 
			copyArgs(n,"enableECSManagedTags",params,undefined,false); 
			copyArgs(n,"enableExecuteCommand",params,undefined,false); 
			copyArgs(n,"group",params,undefined,false); 
			copyArgs(n,"launchType",params,undefined,false); 
			copyArgs(n,"networkConfiguration",params,undefined,true); 
			copyArgs(n,"overrides",params,undefined,true); 
			copyArgs(n,"placementConstraints",params,undefined,true); 
			copyArgs(n,"placementStrategy",params,undefined,true); 
			copyArgs(n,"platformVersion",params,undefined,false); 
			copyArgs(n,"propagateTags",params,undefined,false); 
			copyArgs(n,"referenceId",params,undefined,false); 
			copyArgs(n,"startedBy",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"taskDefinition",params,undefined,false); 
			
			copyArgs(msg,"capacityProviderStrategy",params,undefined,true); 
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"count",params,undefined,false); 
			copyArgs(msg,"enableECSManagedTags",params,undefined,false); 
			copyArgs(msg,"enableExecuteCommand",params,undefined,false); 
			copyArgs(msg,"group",params,undefined,false); 
			copyArgs(msg,"launchType",params,undefined,false); 
			copyArgs(msg,"networkConfiguration",params,undefined,true); 
			copyArgs(msg,"overrides",params,undefined,true); 
			copyArgs(msg,"placementConstraints",params,undefined,true); 
			copyArgs(msg,"placementStrategy",params,undefined,true); 
			copyArgs(msg,"platformVersion",params,undefined,false); 
			copyArgs(msg,"propagateTags",params,undefined,false); 
			copyArgs(msg,"referenceId",params,undefined,false); 
			copyArgs(msg,"startedBy",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"taskDefinition",params,undefined,false); 
			

			svc.runTask(params,cb);
		}

		
		service.StartTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"containerInstances",params,undefined,true); 
			copyArgs(n,"taskDefinition",params,undefined,false); 
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"containerInstances",params,undefined,true); 
			copyArgs(n,"enableECSManagedTags",params,undefined,false); 
			copyArgs(n,"enableExecuteCommand",params,undefined,false); 
			copyArgs(n,"group",params,undefined,false); 
			copyArgs(n,"networkConfiguration",params,undefined,true); 
			copyArgs(n,"overrides",params,undefined,true); 
			copyArgs(n,"propagateTags",params,undefined,false); 
			copyArgs(n,"referenceId",params,undefined,false); 
			copyArgs(n,"startedBy",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"taskDefinition",params,undefined,false); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"containerInstances",params,undefined,true); 
			copyArgs(msg,"enableECSManagedTags",params,undefined,false); 
			copyArgs(msg,"enableExecuteCommand",params,undefined,false); 
			copyArgs(msg,"group",params,undefined,false); 
			copyArgs(msg,"networkConfiguration",params,undefined,true); 
			copyArgs(msg,"overrides",params,undefined,true); 
			copyArgs(msg,"propagateTags",params,undefined,false); 
			copyArgs(msg,"referenceId",params,undefined,false); 
			copyArgs(msg,"startedBy",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"taskDefinition",params,undefined,false); 
			

			svc.startTask(params,cb);
		}

		
		service.StopTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"task",params,undefined,false); 
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"task",params,undefined,false); 
			copyArgs(n,"reason",params,undefined,false); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"task",params,undefined,false); 
			copyArgs(msg,"reason",params,undefined,false); 
			

			svc.stopTask(params,cb);
		}

		
		service.SubmitAttachmentStateChanges=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"attachments",params,undefined,true); 
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"attachments",params,undefined,true); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"attachments",params,undefined,true); 
			

			svc.submitAttachmentStateChanges(params,cb);
		}

		
		service.SubmitContainerStateChange=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"task",params,undefined,false); 
			copyArgs(n,"containerName",params,undefined,false); 
			copyArgs(n,"runtimeId",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			copyArgs(n,"exitCode",params,undefined,false); 
			copyArgs(n,"reason",params,undefined,false); 
			copyArgs(n,"networkBindings",params,undefined,true); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"task",params,undefined,false); 
			copyArgs(msg,"containerName",params,undefined,false); 
			copyArgs(msg,"runtimeId",params,undefined,false); 
			copyArgs(msg,"status",params,undefined,false); 
			copyArgs(msg,"exitCode",params,undefined,false); 
			copyArgs(msg,"reason",params,undefined,false); 
			copyArgs(msg,"networkBindings",params,undefined,true); 
			

			svc.submitContainerStateChange(params,cb);
		}

		
		service.SubmitTaskStateChange=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"task",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			copyArgs(n,"reason",params,undefined,false); 
			copyArgs(n,"containers",params,undefined,false); 
			copyArgs(n,"attachments",params,undefined,true); 
			copyArgs(n,"managedAgents",params,undefined,false); 
			copyArgs(n,"pullStartedAt",params,undefined,false); 
			copyArgs(n,"pullStoppedAt",params,undefined,false); 
			copyArgs(n,"executionStoppedAt",params,undefined,false); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"task",params,undefined,false); 
			copyArgs(msg,"status",params,undefined,false); 
			copyArgs(msg,"reason",params,undefined,false); 
			copyArgs(msg,"containers",params,undefined,false); 
			copyArgs(msg,"attachments",params,undefined,true); 
			copyArgs(msg,"managedAgents",params,undefined,false); 
			copyArgs(msg,"pullStartedAt",params,undefined,false); 
			copyArgs(msg,"pullStoppedAt",params,undefined,false); 
			copyArgs(msg,"executionStoppedAt",params,undefined,false); 
			

			svc.submitTaskStateChange(params,cb);
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

		
		service.UpdateCapacityProvider=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"autoScalingGroupProvider",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"autoScalingGroupProvider",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"autoScalingGroupProvider",params,undefined,false); 
			

			svc.updateCapacityProvider(params,cb);
		}

		
		service.UpdateCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"cluster",params,undefined,false); 
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"settings",params,undefined,true); 
			copyArgs(n,"configuration",params,undefined,true); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"settings",params,undefined,true); 
			copyArgs(msg,"configuration",params,undefined,true); 
			

			svc.updateCluster(params,cb);
		}

		
		service.UpdateClusterSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"settings",params,undefined,true); 
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"settings",params,undefined,true); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"settings",params,undefined,true); 
			

			svc.updateClusterSettings(params,cb);
		}

		
		service.UpdateContainerAgent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"containerInstance",params,undefined,false); 
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"containerInstance",params,undefined,false); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"containerInstance",params,undefined,false); 
			

			svc.updateContainerAgent(params,cb);
		}

		
		service.UpdateContainerInstancesState=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"containerInstances",params,undefined,true); 
			copyArgs(n,"status",params,undefined,false); 
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"containerInstances",params,undefined,true); 
			copyArgs(n,"status",params,undefined,false); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"containerInstances",params,undefined,true); 
			copyArgs(msg,"status",params,undefined,false); 
			

			svc.updateContainerInstancesState(params,cb);
		}

		
		service.UpdateService=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"service",params,undefined,false); 
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"service",params,undefined,false); 
			copyArgs(n,"desiredCount",params,undefined,false); 
			copyArgs(n,"taskDefinition",params,undefined,false); 
			copyArgs(n,"capacityProviderStrategy",params,undefined,true); 
			copyArgs(n,"deploymentConfiguration",params,undefined,true); 
			copyArgs(n,"networkConfiguration",params,undefined,true); 
			copyArgs(n,"placementConstraints",params,undefined,true); 
			copyArgs(n,"placementStrategy",params,undefined,true); 
			copyArgs(n,"platformVersion",params,undefined,false); 
			copyArgs(n,"forceNewDeployment",params,undefined,false); 
			copyArgs(n,"healthCheckGracePeriodSeconds",params,undefined,false); 
			copyArgs(n,"enableExecuteCommand",params,undefined,false); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"service",params,undefined,false); 
			copyArgs(msg,"desiredCount",params,undefined,false); 
			copyArgs(msg,"taskDefinition",params,undefined,false); 
			copyArgs(msg,"capacityProviderStrategy",params,undefined,true); 
			copyArgs(msg,"deploymentConfiguration",params,undefined,true); 
			copyArgs(msg,"networkConfiguration",params,undefined,true); 
			copyArgs(msg,"placementConstraints",params,undefined,true); 
			copyArgs(msg,"placementStrategy",params,undefined,true); 
			copyArgs(msg,"platformVersion",params,undefined,false); 
			copyArgs(msg,"forceNewDeployment",params,undefined,false); 
			copyArgs(msg,"healthCheckGracePeriodSeconds",params,undefined,false); 
			copyArgs(msg,"enableExecuteCommand",params,undefined,false); 
			

			svc.updateService(params,cb);
		}

		
		service.UpdateServicePrimaryTaskSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"service",params,undefined,false); 
			copyArgs(n,"primaryTaskSet",params,undefined,false); 
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"service",params,undefined,false); 
			copyArgs(n,"primaryTaskSet",params,undefined,false); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"service",params,undefined,false); 
			copyArgs(msg,"primaryTaskSet",params,undefined,false); 
			

			svc.updateServicePrimaryTaskSet(params,cb);
		}

		
		service.UpdateTaskSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"service",params,undefined,false); 
			copyArgs(n,"taskSet",params,undefined,false); 
			copyArgs(n,"scale",params,undefined,true); 
			
			copyArgs(n,"cluster",params,undefined,false); 
			copyArgs(n,"service",params,undefined,false); 
			copyArgs(n,"taskSet",params,undefined,false); 
			copyArgs(n,"scale",params,undefined,true); 
			
			copyArgs(msg,"cluster",params,undefined,false); 
			copyArgs(msg,"service",params,undefined,false); 
			copyArgs(msg,"taskSet",params,undefined,false); 
			copyArgs(msg,"scale",params,undefined,true); 
			

			svc.updateTaskSet(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS ECS", AmazonAPINode);

};
