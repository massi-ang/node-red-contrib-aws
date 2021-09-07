
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

		var awsService = new AWS.Connect( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Connect(msg.AWSConfig) : awsService;

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

		
		service.AssociateApprovedOrigin=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Origin",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Origin",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"Origin",params,undefined,false); 
			

			svc.associateApprovedOrigin(params,cb);
		}

		
		service.AssociateBot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"LexBot",params,undefined,true); 
			copyArgs(n,"LexV2Bot",params,undefined,true); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"LexBot",params,undefined,true); 
			copyArgs(msg,"LexV2Bot",params,undefined,true); 
			

			svc.associateBot(params,cb);
		}

		
		service.AssociateInstanceStorageConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"StorageConfig",params,undefined,true); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"StorageConfig",params,undefined,true); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"ResourceType",params,undefined,false); 
			copyArgs(msg,"StorageConfig",params,undefined,true); 
			

			svc.associateInstanceStorageConfig(params,cb);
		}

		
		service.AssociateLambdaFunction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"FunctionArn",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"FunctionArn",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"FunctionArn",params,undefined,false); 
			

			svc.associateLambdaFunction(params,cb);
		}

		
		service.AssociateLexBot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"LexBot",params,undefined,true); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"LexBot",params,undefined,true); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"LexBot",params,undefined,true); 
			

			svc.associateLexBot(params,cb);
		}

		
		service.AssociateQueueQuickConnects=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"QueueId",params,undefined,false); 
			copyArgs(n,"QuickConnectIds",params,undefined,true); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"QueueId",params,undefined,false); 
			copyArgs(n,"QuickConnectIds",params,undefined,true); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"QueueId",params,undefined,false); 
			copyArgs(msg,"QuickConnectIds",params,undefined,true); 
			

			svc.associateQueueQuickConnects(params,cb);
		}

		
		service.AssociateRoutingProfileQueues=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"RoutingProfileId",params,undefined,false); 
			copyArgs(n,"QueueConfigs",params,undefined,true); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"RoutingProfileId",params,undefined,false); 
			copyArgs(n,"QueueConfigs",params,undefined,true); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"RoutingProfileId",params,undefined,false); 
			copyArgs(msg,"QueueConfigs",params,undefined,true); 
			

			svc.associateRoutingProfileQueues(params,cb);
		}

		
		service.AssociateSecurityKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"Key",params,undefined,false); 
			

			svc.associateSecurityKey(params,cb);
		}

		
		service.CreateAgentStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"State",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"State",params,undefined,false); 
			copyArgs(n,"DisplayOrder",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"State",params,undefined,false); 
			copyArgs(msg,"DisplayOrder",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createAgentStatus(params,cb);
		}

		
		service.CreateContactFlow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Content",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Content",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Content",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createContactFlow(params,cb);
		}

		
		service.CreateHoursOfOperation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"TimeZone",params,undefined,false); 
			copyArgs(n,"Config",params,undefined,true); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"TimeZone",params,undefined,false); 
			copyArgs(n,"Config",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"TimeZone",params,undefined,false); 
			copyArgs(msg,"Config",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createHoursOfOperation(params,cb);
		}

		
		service.CreateInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityManagementType",params,undefined,false); 
			copyArgs(n,"InboundCallsEnabled",params,undefined,false); 
			copyArgs(n,"OutboundCallsEnabled",params,undefined,false); 
			
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"IdentityManagementType",params,undefined,false); 
			copyArgs(n,"InstanceAlias",params,undefined,true); 
			copyArgs(n,"DirectoryId",params,undefined,false); 
			copyArgs(n,"InboundCallsEnabled",params,undefined,false); 
			copyArgs(n,"OutboundCallsEnabled",params,undefined,false); 
			
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"IdentityManagementType",params,undefined,false); 
			copyArgs(msg,"InstanceAlias",params,undefined,true); 
			copyArgs(msg,"DirectoryId",params,undefined,false); 
			copyArgs(msg,"InboundCallsEnabled",params,undefined,false); 
			copyArgs(msg,"OutboundCallsEnabled",params,undefined,false); 
			

			svc.createInstance(params,cb);
		}

		
		service.CreateIntegrationAssociation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"IntegrationType",params,undefined,false); 
			copyArgs(n,"IntegrationArn",params,undefined,false); 
			copyArgs(n,"SourceApplicationUrl",params,undefined,false); 
			copyArgs(n,"SourceApplicationName",params,undefined,false); 
			copyArgs(n,"SourceType",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"IntegrationType",params,undefined,false); 
			copyArgs(n,"IntegrationArn",params,undefined,false); 
			copyArgs(n,"SourceApplicationUrl",params,undefined,false); 
			copyArgs(n,"SourceApplicationName",params,undefined,false); 
			copyArgs(n,"SourceType",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"IntegrationType",params,undefined,false); 
			copyArgs(msg,"IntegrationArn",params,undefined,false); 
			copyArgs(msg,"SourceApplicationUrl",params,undefined,false); 
			copyArgs(msg,"SourceApplicationName",params,undefined,false); 
			copyArgs(msg,"SourceType",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createIntegrationAssociation(params,cb);
		}

		
		service.CreateQueue=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"HoursOfOperationId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"OutboundCallerConfig",params,undefined,true); 
			copyArgs(n,"HoursOfOperationId",params,undefined,false); 
			copyArgs(n,"MaxContacts",params,undefined,false); 
			copyArgs(n,"QuickConnectIds",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"OutboundCallerConfig",params,undefined,true); 
			copyArgs(msg,"HoursOfOperationId",params,undefined,false); 
			copyArgs(msg,"MaxContacts",params,undefined,false); 
			copyArgs(msg,"QuickConnectIds",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createQueue(params,cb);
		}

		
		service.CreateQuickConnect=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"QuickConnectConfig",params,undefined,true); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"QuickConnectConfig",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"QuickConnectConfig",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createQuickConnect(params,cb);
		}

		
		service.CreateRoutingProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"DefaultOutboundQueueId",params,undefined,false); 
			copyArgs(n,"MediaConcurrencies",params,undefined,true); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"DefaultOutboundQueueId",params,undefined,false); 
			copyArgs(n,"QueueConfigs",params,undefined,true); 
			copyArgs(n,"MediaConcurrencies",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DefaultOutboundQueueId",params,undefined,false); 
			copyArgs(msg,"QueueConfigs",params,undefined,true); 
			copyArgs(msg,"MediaConcurrencies",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createRoutingProfile(params,cb);
		}

		
		service.CreateUseCase=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"IntegrationAssociationId",params,undefined,false); 
			copyArgs(n,"UseCaseType",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"IntegrationAssociationId",params,undefined,false); 
			copyArgs(n,"UseCaseType",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"IntegrationAssociationId",params,undefined,false); 
			copyArgs(msg,"UseCaseType",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createUseCase(params,cb);
		}

		
		service.CreateUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Username",params,undefined,false); 
			copyArgs(n,"PhoneConfig",params,undefined,true); 
			copyArgs(n,"SecurityProfileIds",params,undefined,true); 
			copyArgs(n,"RoutingProfileId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"Username",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,false); 
			copyArgs(n,"IdentityInfo",params,undefined,true); 
			copyArgs(n,"PhoneConfig",params,undefined,true); 
			copyArgs(n,"DirectoryUserId",params,undefined,false); 
			copyArgs(n,"SecurityProfileIds",params,undefined,true); 
			copyArgs(n,"RoutingProfileId",params,undefined,false); 
			copyArgs(n,"HierarchyGroupId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Username",params,undefined,false); 
			copyArgs(msg,"Password",params,undefined,false); 
			copyArgs(msg,"IdentityInfo",params,undefined,true); 
			copyArgs(msg,"PhoneConfig",params,undefined,true); 
			copyArgs(msg,"DirectoryUserId",params,undefined,false); 
			copyArgs(msg,"SecurityProfileIds",params,undefined,true); 
			copyArgs(msg,"RoutingProfileId",params,undefined,false); 
			copyArgs(msg,"HierarchyGroupId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createUser(params,cb);
		}

		
		service.CreateUserHierarchyGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ParentGroupId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ParentGroupId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.createUserHierarchyGroup(params,cb);
		}

		
		service.DeleteHoursOfOperation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"HoursOfOperationId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"HoursOfOperationId",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"HoursOfOperationId",params,undefined,false); 
			

			svc.deleteHoursOfOperation(params,cb);
		}

		
		service.DeleteInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.deleteInstance(params,cb);
		}

		
		service.DeleteIntegrationAssociation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"IntegrationAssociationId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"IntegrationAssociationId",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"IntegrationAssociationId",params,undefined,false); 
			

			svc.deleteIntegrationAssociation(params,cb);
		}

		
		service.DeleteQuickConnect=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"QuickConnectId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"QuickConnectId",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"QuickConnectId",params,undefined,false); 
			

			svc.deleteQuickConnect(params,cb);
		}

		
		service.DeleteUseCase=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"IntegrationAssociationId",params,undefined,false); 
			copyArgs(n,"UseCaseId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"IntegrationAssociationId",params,undefined,false); 
			copyArgs(n,"UseCaseId",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"IntegrationAssociationId",params,undefined,false); 
			copyArgs(msg,"UseCaseId",params,undefined,false); 
			

			svc.deleteUseCase(params,cb);
		}

		
		service.DeleteUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"UserId",params,undefined,false); 
			

			svc.deleteUser(params,cb);
		}

		
		service.DeleteUserHierarchyGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HierarchyGroupId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"HierarchyGroupId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"HierarchyGroupId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.deleteUserHierarchyGroup(params,cb);
		}

		
		service.DescribeAgentStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"AgentStatusId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"AgentStatusId",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"AgentStatusId",params,undefined,false); 
			

			svc.describeAgentStatus(params,cb);
		}

		
		service.DescribeContactFlow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"ContactFlowId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"ContactFlowId",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"ContactFlowId",params,undefined,false); 
			

			svc.describeContactFlow(params,cb);
		}

		
		service.DescribeHoursOfOperation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"HoursOfOperationId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"HoursOfOperationId",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"HoursOfOperationId",params,undefined,false); 
			

			svc.describeHoursOfOperation(params,cb);
		}

		
		service.DescribeInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.describeInstance(params,cb);
		}

		
		service.DescribeInstanceAttribute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"AttributeType",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"AttributeType",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"AttributeType",params,undefined,false); 
			

			svc.describeInstanceAttribute(params,cb);
		}

		
		service.DescribeInstanceStorageConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"AssociationId",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"AssociationId",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"AssociationId",params,undefined,false); 
			copyArgs(msg,"ResourceType",params,undefined,false); 
			

			svc.describeInstanceStorageConfig(params,cb);
		}

		
		service.DescribeQueue=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"QueueId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"QueueId",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"QueueId",params,undefined,false); 
			

			svc.describeQueue(params,cb);
		}

		
		service.DescribeQuickConnect=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"QuickConnectId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"QuickConnectId",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"QuickConnectId",params,undefined,false); 
			

			svc.describeQuickConnect(params,cb);
		}

		
		service.DescribeRoutingProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"RoutingProfileId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"RoutingProfileId",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"RoutingProfileId",params,undefined,false); 
			

			svc.describeRoutingProfile(params,cb);
		}

		
		service.DescribeUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"UserId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.describeUser(params,cb);
		}

		
		service.DescribeUserHierarchyGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HierarchyGroupId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"HierarchyGroupId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"HierarchyGroupId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.describeUserHierarchyGroup(params,cb);
		}

		
		service.DescribeUserHierarchyStructure=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.describeUserHierarchyStructure(params,cb);
		}

		
		service.DisassociateApprovedOrigin=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Origin",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Origin",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"Origin",params,undefined,false); 
			

			svc.disassociateApprovedOrigin(params,cb);
		}

		
		service.DisassociateBot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"LexBot",params,undefined,true); 
			copyArgs(n,"LexV2Bot",params,undefined,true); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"LexBot",params,undefined,true); 
			copyArgs(msg,"LexV2Bot",params,undefined,true); 
			

			svc.disassociateBot(params,cb);
		}

		
		service.DisassociateInstanceStorageConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"AssociationId",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"AssociationId",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"AssociationId",params,undefined,false); 
			copyArgs(msg,"ResourceType",params,undefined,false); 
			

			svc.disassociateInstanceStorageConfig(params,cb);
		}

		
		service.DisassociateLambdaFunction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"FunctionArn",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"FunctionArn",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"FunctionArn",params,undefined,false); 
			

			svc.disassociateLambdaFunction(params,cb);
		}

		
		service.DisassociateLexBot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"BotName",params,undefined,false); 
			copyArgs(n,"LexRegion",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"BotName",params,undefined,false); 
			copyArgs(n,"LexRegion",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"BotName",params,undefined,false); 
			copyArgs(msg,"LexRegion",params,undefined,false); 
			

			svc.disassociateLexBot(params,cb);
		}

		
		service.DisassociateQueueQuickConnects=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"QueueId",params,undefined,false); 
			copyArgs(n,"QuickConnectIds",params,undefined,true); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"QueueId",params,undefined,false); 
			copyArgs(n,"QuickConnectIds",params,undefined,true); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"QueueId",params,undefined,false); 
			copyArgs(msg,"QuickConnectIds",params,undefined,true); 
			

			svc.disassociateQueueQuickConnects(params,cb);
		}

		
		service.DisassociateRoutingProfileQueues=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"RoutingProfileId",params,undefined,false); 
			copyArgs(n,"QueueReferences",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"RoutingProfileId",params,undefined,false); 
			copyArgs(n,"QueueReferences",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"RoutingProfileId",params,undefined,false); 
			copyArgs(msg,"QueueReferences",params,undefined,false); 
			

			svc.disassociateRoutingProfileQueues(params,cb);
		}

		
		service.DisassociateSecurityKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"AssociationId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"AssociationId",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"AssociationId",params,undefined,false); 
			

			svc.disassociateSecurityKey(params,cb);
		}

		
		service.GetContactAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"InitialContactId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"InitialContactId",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"InitialContactId",params,undefined,false); 
			

			svc.getContactAttributes(params,cb);
		}

		
		service.GetCurrentMetricData=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"CurrentMetrics",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"Groupings",params,undefined,true); 
			copyArgs(n,"CurrentMetrics",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"Groupings",params,undefined,true); 
			copyArgs(msg,"CurrentMetrics",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.getCurrentMetricData(params,cb);
		}

		
		service.GetFederationToken=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.getFederationToken(params,cb);
		}

		
		service.GetMetricData=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"HistoricalMetrics",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"Groupings",params,undefined,true); 
			copyArgs(n,"HistoricalMetrics",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"Groupings",params,undefined,true); 
			copyArgs(msg,"HistoricalMetrics",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.getMetricData(params,cb);
		}

		
		service.ListAgentStatuses=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"AgentStatusTypes",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"AgentStatusTypes",params,undefined,false); 
			

			svc.listAgentStatuses(params,cb);
		}

		
		service.ListApprovedOrigins=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listApprovedOrigins(params,cb);
		}

		
		service.ListBots=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"LexVersion",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"LexVersion",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"LexVersion",params,undefined,false); 
			

			svc.listBots(params,cb);
		}

		
		service.ListContactFlows=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"ContactFlowTypes",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"ContactFlowTypes",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listContactFlows(params,cb);
		}

		
		service.ListHoursOfOperations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listHoursOfOperations(params,cb);
		}

		
		service.ListInstanceAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listInstanceAttributes(params,cb);
		}

		
		service.ListInstanceStorageConfigs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"ResourceType",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listInstanceStorageConfigs(params,cb);
		}

		
		service.ListInstances=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listInstances(params,cb);
		}

		
		service.ListIntegrationAssociations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listIntegrationAssociations(params,cb);
		}

		
		service.ListLambdaFunctions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listLambdaFunctions(params,cb);
		}

		
		service.ListLexBots=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listLexBots(params,cb);
		}

		
		service.ListPhoneNumbers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"PhoneNumberTypes",params,undefined,false); 
			copyArgs(n,"PhoneNumberCountryCodes",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"PhoneNumberTypes",params,undefined,false); 
			copyArgs(msg,"PhoneNumberCountryCodes",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listPhoneNumbers(params,cb);
		}

		
		service.ListPrompts=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listPrompts(params,cb);
		}

		
		service.ListQueueQuickConnects=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"QueueId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"QueueId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"QueueId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listQueueQuickConnects(params,cb);
		}

		
		service.ListQueues=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"QueueTypes",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"QueueTypes",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listQueues(params,cb);
		}

		
		service.ListQuickConnects=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"QuickConnectTypes",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"QuickConnectTypes",params,undefined,false); 
			

			svc.listQuickConnects(params,cb);
		}

		
		service.ListRoutingProfileQueues=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"RoutingProfileId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"RoutingProfileId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"RoutingProfileId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listRoutingProfileQueues(params,cb);
		}

		
		service.ListRoutingProfiles=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listRoutingProfiles(params,cb);
		}

		
		service.ListSecurityKeys=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listSecurityKeys(params,cb);
		}

		
		service.ListSecurityProfiles=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listSecurityProfiles(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListUseCases=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"IntegrationAssociationId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"IntegrationAssociationId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"IntegrationAssociationId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listUseCases(params,cb);
		}

		
		service.ListUserHierarchyGroups=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listUserHierarchyGroups(params,cb);
		}

		
		service.ListUsers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listUsers(params,cb);
		}

		
		service.ResumeContactRecording=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"ContactId",params,undefined,false); 
			copyArgs(n,"InitialContactId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"ContactId",params,undefined,false); 
			copyArgs(n,"InitialContactId",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"ContactId",params,undefined,false); 
			copyArgs(msg,"InitialContactId",params,undefined,false); 
			

			svc.resumeContactRecording(params,cb);
		}

		
		service.StartChatContact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"ContactFlowId",params,undefined,false); 
			copyArgs(n,"ParticipantDetails",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"ContactFlowId",params,undefined,false); 
			copyArgs(n,"Attributes",params,undefined,true); 
			copyArgs(n,"ParticipantDetails",params,undefined,false); 
			copyArgs(n,"InitialMessage",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"ContactFlowId",params,undefined,false); 
			copyArgs(msg,"Attributes",params,undefined,true); 
			copyArgs(msg,"ParticipantDetails",params,undefined,false); 
			copyArgs(msg,"InitialMessage",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.startChatContact(params,cb);
		}

		
		service.StartContactRecording=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"ContactId",params,undefined,false); 
			copyArgs(n,"InitialContactId",params,undefined,false); 
			copyArgs(n,"VoiceRecordingConfiguration",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"ContactId",params,undefined,false); 
			copyArgs(n,"InitialContactId",params,undefined,false); 
			copyArgs(n,"VoiceRecordingConfiguration",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"ContactId",params,undefined,false); 
			copyArgs(msg,"InitialContactId",params,undefined,false); 
			copyArgs(msg,"VoiceRecordingConfiguration",params,undefined,false); 
			

			svc.startContactRecording(params,cb);
		}

		
		service.StartOutboundVoiceContact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DestinationPhoneNumber",params,undefined,false); 
			copyArgs(n,"ContactFlowId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"DestinationPhoneNumber",params,undefined,false); 
			copyArgs(n,"ContactFlowId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"SourcePhoneNumber",params,undefined,false); 
			copyArgs(n,"QueueId",params,undefined,false); 
			copyArgs(n,"Attributes",params,undefined,true); 
			
			copyArgs(msg,"DestinationPhoneNumber",params,undefined,false); 
			copyArgs(msg,"ContactFlowId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"SourcePhoneNumber",params,undefined,false); 
			copyArgs(msg,"QueueId",params,undefined,false); 
			copyArgs(msg,"Attributes",params,undefined,true); 
			

			svc.startOutboundVoiceContact(params,cb);
		}

		
		service.StartTaskContact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"ContactFlowId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"PreviousContactId",params,undefined,false); 
			copyArgs(n,"ContactFlowId",params,undefined,false); 
			copyArgs(n,"Attributes",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"References",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"PreviousContactId",params,undefined,false); 
			copyArgs(msg,"ContactFlowId",params,undefined,false); 
			copyArgs(msg,"Attributes",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"References",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.startTaskContact(params,cb);
		}

		
		service.StopContact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ContactId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"ContactId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"ContactId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.stopContact(params,cb);
		}

		
		service.StopContactRecording=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"ContactId",params,undefined,false); 
			copyArgs(n,"InitialContactId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"ContactId",params,undefined,false); 
			copyArgs(n,"InitialContactId",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"ContactId",params,undefined,false); 
			copyArgs(msg,"InitialContactId",params,undefined,false); 
			

			svc.stopContactRecording(params,cb);
		}

		
		service.SuspendContactRecording=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"ContactId",params,undefined,false); 
			copyArgs(n,"InitialContactId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"ContactId",params,undefined,false); 
			copyArgs(n,"InitialContactId",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"ContactId",params,undefined,false); 
			copyArgs(msg,"InitialContactId",params,undefined,false); 
			

			svc.suspendContactRecording(params,cb);
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

		
		service.UpdateAgentStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"AgentStatusId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"AgentStatusId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"State",params,undefined,false); 
			copyArgs(n,"DisplayOrder",params,undefined,false); 
			copyArgs(n,"ResetOrderNumber",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"AgentStatusId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"State",params,undefined,false); 
			copyArgs(msg,"DisplayOrder",params,undefined,false); 
			copyArgs(msg,"ResetOrderNumber",params,undefined,false); 
			

			svc.updateAgentStatus(params,cb);
		}

		
		service.UpdateContactAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InitialContactId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Attributes",params,undefined,true); 
			
			copyArgs(n,"InitialContactId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Attributes",params,undefined,true); 
			
			copyArgs(msg,"InitialContactId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"Attributes",params,undefined,true); 
			

			svc.updateContactAttributes(params,cb);
		}

		
		service.UpdateContactFlowContent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"ContactFlowId",params,undefined,false); 
			copyArgs(n,"Content",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"ContactFlowId",params,undefined,false); 
			copyArgs(n,"Content",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"ContactFlowId",params,undefined,false); 
			copyArgs(msg,"Content",params,undefined,false); 
			

			svc.updateContactFlowContent(params,cb);
		}

		
		service.UpdateContactFlowName=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"ContactFlowId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"ContactFlowId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"ContactFlowId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			

			svc.updateContactFlowName(params,cb);
		}

		
		service.UpdateHoursOfOperation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"HoursOfOperationId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"HoursOfOperationId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"TimeZone",params,undefined,false); 
			copyArgs(n,"Config",params,undefined,true); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"HoursOfOperationId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"TimeZone",params,undefined,false); 
			copyArgs(msg,"Config",params,undefined,true); 
			

			svc.updateHoursOfOperation(params,cb);
		}

		
		service.UpdateInstanceAttribute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"AttributeType",params,undefined,false); 
			copyArgs(n,"Value",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"AttributeType",params,undefined,false); 
			copyArgs(n,"Value",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"AttributeType",params,undefined,false); 
			copyArgs(msg,"Value",params,undefined,false); 
			

			svc.updateInstanceAttribute(params,cb);
		}

		
		service.UpdateInstanceStorageConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"AssociationId",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"StorageConfig",params,undefined,true); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"AssociationId",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"StorageConfig",params,undefined,true); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"AssociationId",params,undefined,false); 
			copyArgs(msg,"ResourceType",params,undefined,false); 
			copyArgs(msg,"StorageConfig",params,undefined,true); 
			

			svc.updateInstanceStorageConfig(params,cb);
		}

		
		service.UpdateQueueHoursOfOperation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"QueueId",params,undefined,false); 
			copyArgs(n,"HoursOfOperationId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"QueueId",params,undefined,false); 
			copyArgs(n,"HoursOfOperationId",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"QueueId",params,undefined,false); 
			copyArgs(msg,"HoursOfOperationId",params,undefined,false); 
			

			svc.updateQueueHoursOfOperation(params,cb);
		}

		
		service.UpdateQueueMaxContacts=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"QueueId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"QueueId",params,undefined,false); 
			copyArgs(n,"MaxContacts",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"QueueId",params,undefined,false); 
			copyArgs(msg,"MaxContacts",params,undefined,false); 
			

			svc.updateQueueMaxContacts(params,cb);
		}

		
		service.UpdateQueueName=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"QueueId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"QueueId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"QueueId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			

			svc.updateQueueName(params,cb);
		}

		
		service.UpdateQueueOutboundCallerConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"QueueId",params,undefined,false); 
			copyArgs(n,"OutboundCallerConfig",params,undefined,true); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"QueueId",params,undefined,false); 
			copyArgs(n,"OutboundCallerConfig",params,undefined,true); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"QueueId",params,undefined,false); 
			copyArgs(msg,"OutboundCallerConfig",params,undefined,true); 
			

			svc.updateQueueOutboundCallerConfig(params,cb);
		}

		
		service.UpdateQueueStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"QueueId",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"QueueId",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"QueueId",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			

			svc.updateQueueStatus(params,cb);
		}

		
		service.UpdateQuickConnectConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"QuickConnectId",params,undefined,false); 
			copyArgs(n,"QuickConnectConfig",params,undefined,true); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"QuickConnectId",params,undefined,false); 
			copyArgs(n,"QuickConnectConfig",params,undefined,true); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"QuickConnectId",params,undefined,false); 
			copyArgs(msg,"QuickConnectConfig",params,undefined,true); 
			

			svc.updateQuickConnectConfig(params,cb);
		}

		
		service.UpdateQuickConnectName=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"QuickConnectId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"QuickConnectId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"QuickConnectId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			

			svc.updateQuickConnectName(params,cb);
		}

		
		service.UpdateRoutingProfileConcurrency=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"RoutingProfileId",params,undefined,false); 
			copyArgs(n,"MediaConcurrencies",params,undefined,true); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"RoutingProfileId",params,undefined,false); 
			copyArgs(n,"MediaConcurrencies",params,undefined,true); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"RoutingProfileId",params,undefined,false); 
			copyArgs(msg,"MediaConcurrencies",params,undefined,true); 
			

			svc.updateRoutingProfileConcurrency(params,cb);
		}

		
		service.UpdateRoutingProfileDefaultOutboundQueue=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"RoutingProfileId",params,undefined,false); 
			copyArgs(n,"DefaultOutboundQueueId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"RoutingProfileId",params,undefined,false); 
			copyArgs(n,"DefaultOutboundQueueId",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"RoutingProfileId",params,undefined,false); 
			copyArgs(msg,"DefaultOutboundQueueId",params,undefined,false); 
			

			svc.updateRoutingProfileDefaultOutboundQueue(params,cb);
		}

		
		service.UpdateRoutingProfileName=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"RoutingProfileId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"RoutingProfileId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"RoutingProfileId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			

			svc.updateRoutingProfileName(params,cb);
		}

		
		service.UpdateRoutingProfileQueues=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"RoutingProfileId",params,undefined,false); 
			copyArgs(n,"QueueConfigs",params,undefined,true); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"RoutingProfileId",params,undefined,false); 
			copyArgs(n,"QueueConfigs",params,undefined,true); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"RoutingProfileId",params,undefined,false); 
			copyArgs(msg,"QueueConfigs",params,undefined,true); 
			

			svc.updateRoutingProfileQueues(params,cb);
		}

		
		service.UpdateUserHierarchy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"HierarchyGroupId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"HierarchyGroupId",params,undefined,false); 
			copyArgs(msg,"UserId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.updateUserHierarchy(params,cb);
		}

		
		service.UpdateUserHierarchyGroupName=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"HierarchyGroupId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"HierarchyGroupId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"HierarchyGroupId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.updateUserHierarchyGroupName(params,cb);
		}

		
		service.UpdateUserHierarchyStructure=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HierarchyStructure",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"HierarchyStructure",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"HierarchyStructure",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.updateUserHierarchyStructure(params,cb);
		}

		
		service.UpdateUserIdentityInfo=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityInfo",params,undefined,true); 
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"IdentityInfo",params,undefined,true); 
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"IdentityInfo",params,undefined,true); 
			copyArgs(msg,"UserId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.updateUserIdentityInfo(params,cb);
		}

		
		service.UpdateUserPhoneConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PhoneConfig",params,undefined,true); 
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"PhoneConfig",params,undefined,true); 
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"PhoneConfig",params,undefined,true); 
			copyArgs(msg,"UserId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.updateUserPhoneConfig(params,cb);
		}

		
		service.UpdateUserRoutingProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RoutingProfileId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"RoutingProfileId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"RoutingProfileId",params,undefined,false); 
			copyArgs(msg,"UserId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.updateUserRoutingProfile(params,cb);
		}

		
		service.UpdateUserSecurityProfiles=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SecurityProfileIds",params,undefined,true); 
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"SecurityProfileIds",params,undefined,true); 
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"SecurityProfileIds",params,undefined,true); 
			copyArgs(msg,"UserId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.updateUserSecurityProfiles(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Connect", AmazonAPINode);

};
