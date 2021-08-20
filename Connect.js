
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

		var awsService = new AWS.Connect( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Connect(msg.AWSConfig) : awsService;

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

		
		service.AssociateApprovedOrigin=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"Origin",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"Origin",params,undefined,false); 
			

			svc.associateApprovedOrigin(params,cb);
		}

		
		service.AssociateBot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"LexBot",params,undefined,true); 
			copyArg(msg,"LexV2Bot",params,undefined,true); 
			

			svc.associateBot(params,cb);
		}

		
		service.AssociateInstanceStorageConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"ResourceType",params,undefined,false); 
			copyArg(n,"StorageConfig",params,undefined,true); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			copyArg(msg,"StorageConfig",params,undefined,true); 
			

			svc.associateInstanceStorageConfig(params,cb);
		}

		
		service.AssociateLambdaFunction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"FunctionArn",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"FunctionArn",params,undefined,false); 
			

			svc.associateLambdaFunction(params,cb);
		}

		
		service.AssociateLexBot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"LexBot",params,undefined,true); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"LexBot",params,undefined,true); 
			

			svc.associateLexBot(params,cb);
		}

		
		service.AssociateQueueQuickConnects=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"QueueId",params,undefined,false); 
			copyArg(n,"QuickConnectIds",params,undefined,true); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"QueueId",params,undefined,false); 
			copyArg(msg,"QuickConnectIds",params,undefined,true); 
			

			svc.associateQueueQuickConnects(params,cb);
		}

		
		service.AssociateRoutingProfileQueues=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"RoutingProfileId",params,undefined,false); 
			copyArg(n,"QueueConfigs",params,undefined,true); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"RoutingProfileId",params,undefined,false); 
			copyArg(msg,"QueueConfigs",params,undefined,true); 
			

			svc.associateRoutingProfileQueues(params,cb);
		}

		
		service.AssociateSecurityKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"Key",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"Key",params,undefined,false); 
			

			svc.associateSecurityKey(params,cb);
		}

		
		service.CreateAgentStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"State",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"State",params,undefined,false); 
			copyArg(msg,"DisplayOrder",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createAgentStatus(params,cb);
		}

		
		service.CreateContactFlow=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Type",params,undefined,false); 
			copyArg(n,"Content",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Content",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createContactFlow(params,cb);
		}

		
		service.CreateHoursOfOperation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"TimeZone",params,undefined,false); 
			copyArg(n,"Config",params,undefined,true); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"TimeZone",params,undefined,false); 
			copyArg(msg,"Config",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createHoursOfOperation(params,cb);
		}

		
		service.CreateInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IdentityManagementType",params,undefined,false); 
			copyArg(n,"InboundCallsEnabled",params,undefined,false); 
			copyArg(n,"OutboundCallsEnabled",params,undefined,false); 
			
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"IdentityManagementType",params,undefined,false); 
			copyArg(msg,"InstanceAlias",params,undefined,true); 
			copyArg(msg,"DirectoryId",params,undefined,false); 
			copyArg(msg,"InboundCallsEnabled",params,undefined,false); 
			copyArg(msg,"OutboundCallsEnabled",params,undefined,false); 
			

			svc.createInstance(params,cb);
		}

		
		service.CreateIntegrationAssociation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"IntegrationType",params,undefined,false); 
			copyArg(n,"IntegrationArn",params,undefined,false); 
			copyArg(n,"SourceApplicationUrl",params,undefined,false); 
			copyArg(n,"SourceApplicationName",params,undefined,false); 
			copyArg(n,"SourceType",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"IntegrationType",params,undefined,false); 
			copyArg(msg,"IntegrationArn",params,undefined,false); 
			copyArg(msg,"SourceApplicationUrl",params,undefined,false); 
			copyArg(msg,"SourceApplicationName",params,undefined,false); 
			copyArg(msg,"SourceType",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createIntegrationAssociation(params,cb);
		}

		
		service.CreateQueue=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"HoursOfOperationId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"OutboundCallerConfig",params,undefined,true); 
			copyArg(msg,"HoursOfOperationId",params,undefined,false); 
			copyArg(msg,"MaxContacts",params,undefined,false); 
			copyArg(msg,"QuickConnectIds",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createQueue(params,cb);
		}

		
		service.CreateQuickConnect=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"QuickConnectConfig",params,undefined,true); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"QuickConnectConfig",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createQuickConnect(params,cb);
		}

		
		service.CreateRoutingProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Description",params,undefined,false); 
			copyArg(n,"DefaultOutboundQueueId",params,undefined,false); 
			copyArg(n,"MediaConcurrencies",params,undefined,true); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DefaultOutboundQueueId",params,undefined,false); 
			copyArg(msg,"QueueConfigs",params,undefined,true); 
			copyArg(msg,"MediaConcurrencies",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createRoutingProfile(params,cb);
		}

		
		service.CreateUseCase=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"IntegrationAssociationId",params,undefined,false); 
			copyArg(n,"UseCaseType",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"IntegrationAssociationId",params,undefined,false); 
			copyArg(msg,"UseCaseType",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createUseCase(params,cb);
		}

		
		service.CreateUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Username",params,undefined,false); 
			copyArg(n,"PhoneConfig",params,undefined,true); 
			copyArg(n,"SecurityProfileIds",params,undefined,true); 
			copyArg(n,"RoutingProfileId",params,undefined,false); 
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"Username",params,undefined,false); 
			copyArg(msg,"Password",params,undefined,false); 
			copyArg(msg,"IdentityInfo",params,undefined,true); 
			copyArg(msg,"PhoneConfig",params,undefined,true); 
			copyArg(msg,"DirectoryUserId",params,undefined,false); 
			copyArg(msg,"SecurityProfileIds",params,undefined,true); 
			copyArg(msg,"RoutingProfileId",params,undefined,false); 
			copyArg(msg,"HierarchyGroupId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createUser(params,cb);
		}

		
		service.CreateUserHierarchyGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ParentGroupId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.createUserHierarchyGroup(params,cb);
		}

		
		service.DeleteHoursOfOperation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"HoursOfOperationId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"HoursOfOperationId",params,undefined,false); 
			

			svc.deleteHoursOfOperation(params,cb);
		}

		
		service.DeleteInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.deleteInstance(params,cb);
		}

		
		service.DeleteIntegrationAssociation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"IntegrationAssociationId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"IntegrationAssociationId",params,undefined,false); 
			

			svc.deleteIntegrationAssociation(params,cb);
		}

		
		service.DeleteQuickConnect=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"QuickConnectId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"QuickConnectId",params,undefined,false); 
			

			svc.deleteQuickConnect(params,cb);
		}

		
		service.DeleteUseCase=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"IntegrationAssociationId",params,undefined,false); 
			copyArg(n,"UseCaseId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"IntegrationAssociationId",params,undefined,false); 
			copyArg(msg,"UseCaseId",params,undefined,false); 
			

			svc.deleteUseCase(params,cb);
		}

		
		service.DeleteUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"UserId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"UserId",params,undefined,false); 
			

			svc.deleteUser(params,cb);
		}

		
		service.DeleteUserHierarchyGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HierarchyGroupId",params,undefined,false); 
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"HierarchyGroupId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.deleteUserHierarchyGroup(params,cb);
		}

		
		service.DescribeAgentStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"AgentStatusId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"AgentStatusId",params,undefined,false); 
			

			svc.describeAgentStatus(params,cb);
		}

		
		service.DescribeContactFlow=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"ContactFlowId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"ContactFlowId",params,undefined,false); 
			

			svc.describeContactFlow(params,cb);
		}

		
		service.DescribeHoursOfOperation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"HoursOfOperationId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"HoursOfOperationId",params,undefined,false); 
			

			svc.describeHoursOfOperation(params,cb);
		}

		
		service.DescribeInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.describeInstance(params,cb);
		}

		
		service.DescribeInstanceAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"AttributeType",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"AttributeType",params,undefined,false); 
			

			svc.describeInstanceAttribute(params,cb);
		}

		
		service.DescribeInstanceStorageConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"AssociationId",params,undefined,false); 
			copyArg(n,"ResourceType",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"AssociationId",params,undefined,false); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			

			svc.describeInstanceStorageConfig(params,cb);
		}

		
		service.DescribeQueue=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"QueueId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"QueueId",params,undefined,false); 
			

			svc.describeQueue(params,cb);
		}

		
		service.DescribeQuickConnect=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"QuickConnectId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"QuickConnectId",params,undefined,false); 
			

			svc.describeQuickConnect(params,cb);
		}

		
		service.DescribeRoutingProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"RoutingProfileId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"RoutingProfileId",params,undefined,false); 
			

			svc.describeRoutingProfile(params,cb);
		}

		
		service.DescribeUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserId",params,undefined,false); 
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"UserId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.describeUser(params,cb);
		}

		
		service.DescribeUserHierarchyGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HierarchyGroupId",params,undefined,false); 
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"HierarchyGroupId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.describeUserHierarchyGroup(params,cb);
		}

		
		service.DescribeUserHierarchyStructure=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.describeUserHierarchyStructure(params,cb);
		}

		
		service.DisassociateApprovedOrigin=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"Origin",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"Origin",params,undefined,false); 
			

			svc.disassociateApprovedOrigin(params,cb);
		}

		
		service.DisassociateBot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"LexBot",params,undefined,true); 
			copyArg(msg,"LexV2Bot",params,undefined,true); 
			

			svc.disassociateBot(params,cb);
		}

		
		service.DisassociateInstanceStorageConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"AssociationId",params,undefined,false); 
			copyArg(n,"ResourceType",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"AssociationId",params,undefined,false); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			

			svc.disassociateInstanceStorageConfig(params,cb);
		}

		
		service.DisassociateLambdaFunction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"FunctionArn",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"FunctionArn",params,undefined,false); 
			

			svc.disassociateLambdaFunction(params,cb);
		}

		
		service.DisassociateLexBot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"BotName",params,undefined,false); 
			copyArg(n,"LexRegion",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"BotName",params,undefined,false); 
			copyArg(msg,"LexRegion",params,undefined,false); 
			

			svc.disassociateLexBot(params,cb);
		}

		
		service.DisassociateQueueQuickConnects=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"QueueId",params,undefined,false); 
			copyArg(n,"QuickConnectIds",params,undefined,true); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"QueueId",params,undefined,false); 
			copyArg(msg,"QuickConnectIds",params,undefined,true); 
			

			svc.disassociateQueueQuickConnects(params,cb);
		}

		
		service.DisassociateRoutingProfileQueues=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"RoutingProfileId",params,undefined,false); 
			copyArg(n,"QueueReferences",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"RoutingProfileId",params,undefined,false); 
			copyArg(msg,"QueueReferences",params,undefined,false); 
			

			svc.disassociateRoutingProfileQueues(params,cb);
		}

		
		service.DisassociateSecurityKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"AssociationId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"AssociationId",params,undefined,false); 
			

			svc.disassociateSecurityKey(params,cb);
		}

		
		service.GetContactAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"InitialContactId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"InitialContactId",params,undefined,false); 
			

			svc.getContactAttributes(params,cb);
		}

		
		service.GetCurrentMetricData=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"Filters",params,undefined,true); 
			copyArg(n,"CurrentMetrics",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"Groupings",params,undefined,true); 
			copyArg(msg,"CurrentMetrics",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.getCurrentMetricData(params,cb);
		}

		
		service.GetFederationToken=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.getFederationToken(params,cb);
		}

		
		service.GetMetricData=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"StartTime",params,undefined,false); 
			copyArg(n,"EndTime",params,undefined,false); 
			copyArg(n,"Filters",params,undefined,true); 
			copyArg(n,"HistoricalMetrics",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"Groupings",params,undefined,true); 
			copyArg(msg,"HistoricalMetrics",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.getMetricData(params,cb);
		}

		
		service.ListAgentStatuses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"AgentStatusTypes",params,undefined,false); 
			

			svc.listAgentStatuses(params,cb);
		}

		
		service.ListApprovedOrigins=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listApprovedOrigins(params,cb);
		}

		
		service.ListBots=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"LexVersion",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"LexVersion",params,undefined,false); 
			

			svc.listBots(params,cb);
		}

		
		service.ListContactFlows=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"ContactFlowTypes",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listContactFlows(params,cb);
		}

		
		service.ListHoursOfOperations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listHoursOfOperations(params,cb);
		}

		
		service.ListInstanceAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listInstanceAttributes(params,cb);
		}

		
		service.ListInstanceStorageConfigs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"ResourceType",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listInstanceStorageConfigs(params,cb);
		}

		
		service.ListInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listInstances(params,cb);
		}

		
		service.ListIntegrationAssociations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listIntegrationAssociations(params,cb);
		}

		
		service.ListLambdaFunctions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listLambdaFunctions(params,cb);
		}

		
		service.ListLexBots=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listLexBots(params,cb);
		}

		
		service.ListPhoneNumbers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"PhoneNumberTypes",params,undefined,false); 
			copyArg(msg,"PhoneNumberCountryCodes",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listPhoneNumbers(params,cb);
		}

		
		service.ListPrompts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listPrompts(params,cb);
		}

		
		service.ListQueueQuickConnects=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"QueueId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"QueueId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listQueueQuickConnects(params,cb);
		}

		
		service.ListQueues=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"QueueTypes",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listQueues(params,cb);
		}

		
		service.ListQuickConnects=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"QuickConnectTypes",params,undefined,false); 
			

			svc.listQuickConnects(params,cb);
		}

		
		service.ListRoutingProfileQueues=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"RoutingProfileId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"RoutingProfileId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listRoutingProfileQueues(params,cb);
		}

		
		service.ListRoutingProfiles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listRoutingProfiles(params,cb);
		}

		
		service.ListSecurityKeys=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listSecurityKeys(params,cb);
		}

		
		service.ListSecurityProfiles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listSecurityProfiles(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListUseCases=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"IntegrationAssociationId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"IntegrationAssociationId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listUseCases(params,cb);
		}

		
		service.ListUserHierarchyGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listUserHierarchyGroups(params,cb);
		}

		
		service.ListUsers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listUsers(params,cb);
		}

		
		service.ResumeContactRecording=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"ContactId",params,undefined,false); 
			copyArg(n,"InitialContactId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"ContactId",params,undefined,false); 
			copyArg(msg,"InitialContactId",params,undefined,false); 
			

			svc.resumeContactRecording(params,cb);
		}

		
		service.StartChatContact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"ContactFlowId",params,undefined,false); 
			copyArg(n,"ParticipantDetails",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"ContactFlowId",params,undefined,false); 
			copyArg(msg,"Attributes",params,undefined,true); 
			copyArg(msg,"ParticipantDetails",params,undefined,false); 
			copyArg(msg,"InitialMessage",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.startChatContact(params,cb);
		}

		
		service.StartContactRecording=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"ContactId",params,undefined,false); 
			copyArg(n,"InitialContactId",params,undefined,false); 
			copyArg(n,"VoiceRecordingConfiguration",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"ContactId",params,undefined,false); 
			copyArg(msg,"InitialContactId",params,undefined,false); 
			copyArg(msg,"VoiceRecordingConfiguration",params,undefined,false); 
			

			svc.startContactRecording(params,cb);
		}

		
		service.StartOutboundVoiceContact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DestinationPhoneNumber",params,undefined,false); 
			copyArg(n,"ContactFlowId",params,undefined,false); 
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"DestinationPhoneNumber",params,undefined,false); 
			copyArg(msg,"ContactFlowId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"SourcePhoneNumber",params,undefined,false); 
			copyArg(msg,"QueueId",params,undefined,false); 
			copyArg(msg,"Attributes",params,undefined,true); 
			

			svc.startOutboundVoiceContact(params,cb);
		}

		
		service.StartTaskContact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"ContactFlowId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"PreviousContactId",params,undefined,false); 
			copyArg(msg,"ContactFlowId",params,undefined,false); 
			copyArg(msg,"Attributes",params,undefined,true); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"References",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.startTaskContact(params,cb);
		}

		
		service.StopContact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ContactId",params,undefined,false); 
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"ContactId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.stopContact(params,cb);
		}

		
		service.StopContactRecording=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"ContactId",params,undefined,false); 
			copyArg(n,"InitialContactId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"ContactId",params,undefined,false); 
			copyArg(msg,"InitialContactId",params,undefined,false); 
			

			svc.stopContactRecording(params,cb);
		}

		
		service.SuspendContactRecording=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"ContactId",params,undefined,false); 
			copyArg(n,"InitialContactId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"ContactId",params,undefined,false); 
			copyArg(msg,"InitialContactId",params,undefined,false); 
			

			svc.suspendContactRecording(params,cb);
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

		
		service.UpdateAgentStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"AgentStatusId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"AgentStatusId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"State",params,undefined,false); 
			copyArg(msg,"DisplayOrder",params,undefined,false); 
			copyArg(msg,"ResetOrderNumber",params,undefined,false); 
			

			svc.updateAgentStatus(params,cb);
		}

		
		service.UpdateContactAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InitialContactId",params,undefined,false); 
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"Attributes",params,undefined,true); 
			
			copyArg(msg,"InitialContactId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"Attributes",params,undefined,true); 
			

			svc.updateContactAttributes(params,cb);
		}

		
		service.UpdateContactFlowContent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"ContactFlowId",params,undefined,false); 
			copyArg(n,"Content",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"ContactFlowId",params,undefined,false); 
			copyArg(msg,"Content",params,undefined,false); 
			

			svc.updateContactFlowContent(params,cb);
		}

		
		service.UpdateContactFlowName=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"ContactFlowId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"ContactFlowId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			

			svc.updateContactFlowName(params,cb);
		}

		
		service.UpdateHoursOfOperation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"HoursOfOperationId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"HoursOfOperationId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"TimeZone",params,undefined,false); 
			copyArg(msg,"Config",params,undefined,true); 
			

			svc.updateHoursOfOperation(params,cb);
		}

		
		service.UpdateInstanceAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"AttributeType",params,undefined,false); 
			copyArg(n,"Value",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"AttributeType",params,undefined,false); 
			copyArg(msg,"Value",params,undefined,false); 
			

			svc.updateInstanceAttribute(params,cb);
		}

		
		service.UpdateInstanceStorageConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"AssociationId",params,undefined,false); 
			copyArg(n,"ResourceType",params,undefined,false); 
			copyArg(n,"StorageConfig",params,undefined,true); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"AssociationId",params,undefined,false); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			copyArg(msg,"StorageConfig",params,undefined,true); 
			

			svc.updateInstanceStorageConfig(params,cb);
		}

		
		service.UpdateQueueHoursOfOperation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"QueueId",params,undefined,false); 
			copyArg(n,"HoursOfOperationId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"QueueId",params,undefined,false); 
			copyArg(msg,"HoursOfOperationId",params,undefined,false); 
			

			svc.updateQueueHoursOfOperation(params,cb);
		}

		
		service.UpdateQueueMaxContacts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"QueueId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"QueueId",params,undefined,false); 
			copyArg(msg,"MaxContacts",params,undefined,false); 
			

			svc.updateQueueMaxContacts(params,cb);
		}

		
		service.UpdateQueueName=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"QueueId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"QueueId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			

			svc.updateQueueName(params,cb);
		}

		
		service.UpdateQueueOutboundCallerConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"QueueId",params,undefined,false); 
			copyArg(n,"OutboundCallerConfig",params,undefined,true); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"QueueId",params,undefined,false); 
			copyArg(msg,"OutboundCallerConfig",params,undefined,true); 
			

			svc.updateQueueOutboundCallerConfig(params,cb);
		}

		
		service.UpdateQueueStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"QueueId",params,undefined,false); 
			copyArg(n,"Status",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"QueueId",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			

			svc.updateQueueStatus(params,cb);
		}

		
		service.UpdateQuickConnectConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"QuickConnectId",params,undefined,false); 
			copyArg(n,"QuickConnectConfig",params,undefined,true); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"QuickConnectId",params,undefined,false); 
			copyArg(msg,"QuickConnectConfig",params,undefined,true); 
			

			svc.updateQuickConnectConfig(params,cb);
		}

		
		service.UpdateQuickConnectName=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"QuickConnectId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"QuickConnectId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			

			svc.updateQuickConnectName(params,cb);
		}

		
		service.UpdateRoutingProfileConcurrency=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"RoutingProfileId",params,undefined,false); 
			copyArg(n,"MediaConcurrencies",params,undefined,true); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"RoutingProfileId",params,undefined,false); 
			copyArg(msg,"MediaConcurrencies",params,undefined,true); 
			

			svc.updateRoutingProfileConcurrency(params,cb);
		}

		
		service.UpdateRoutingProfileDefaultOutboundQueue=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"RoutingProfileId",params,undefined,false); 
			copyArg(n,"DefaultOutboundQueueId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"RoutingProfileId",params,undefined,false); 
			copyArg(msg,"DefaultOutboundQueueId",params,undefined,false); 
			

			svc.updateRoutingProfileDefaultOutboundQueue(params,cb);
		}

		
		service.UpdateRoutingProfileName=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"RoutingProfileId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"RoutingProfileId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			

			svc.updateRoutingProfileName(params,cb);
		}

		
		service.UpdateRoutingProfileQueues=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"RoutingProfileId",params,undefined,false); 
			copyArg(n,"QueueConfigs",params,undefined,true); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"RoutingProfileId",params,undefined,false); 
			copyArg(msg,"QueueConfigs",params,undefined,true); 
			

			svc.updateRoutingProfileQueues(params,cb);
		}

		
		service.UpdateUserHierarchy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserId",params,undefined,false); 
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"HierarchyGroupId",params,undefined,false); 
			copyArg(msg,"UserId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.updateUserHierarchy(params,cb);
		}

		
		service.UpdateUserHierarchyGroupName=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"HierarchyGroupId",params,undefined,false); 
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"HierarchyGroupId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.updateUserHierarchyGroupName(params,cb);
		}

		
		service.UpdateUserHierarchyStructure=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HierarchyStructure",params,undefined,false); 
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"HierarchyStructure",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.updateUserHierarchyStructure(params,cb);
		}

		
		service.UpdateUserIdentityInfo=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IdentityInfo",params,undefined,true); 
			copyArg(n,"UserId",params,undefined,false); 
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"IdentityInfo",params,undefined,true); 
			copyArg(msg,"UserId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.updateUserIdentityInfo(params,cb);
		}

		
		service.UpdateUserPhoneConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PhoneConfig",params,undefined,true); 
			copyArg(n,"UserId",params,undefined,false); 
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"PhoneConfig",params,undefined,true); 
			copyArg(msg,"UserId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.updateUserPhoneConfig(params,cb);
		}

		
		service.UpdateUserRoutingProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RoutingProfileId",params,undefined,false); 
			copyArg(n,"UserId",params,undefined,false); 
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"RoutingProfileId",params,undefined,false); 
			copyArg(msg,"UserId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.updateUserRoutingProfile(params,cb);
		}

		
		service.UpdateUserSecurityProfiles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SecurityProfileIds",params,undefined,true); 
			copyArg(n,"UserId",params,undefined,false); 
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"SecurityProfileIds",params,undefined,true); 
			copyArg(msg,"UserId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.updateUserSecurityProfiles(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Connect", AmazonAPINode);

};
