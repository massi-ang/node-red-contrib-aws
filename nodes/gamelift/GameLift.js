
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

		var awsService = new AWS.GameLift( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.GameLift(msg.AWSConfig) : awsService;

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
		
			service.AcceptMatch=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TicketId",params,undefined,false); 
			copyArgs(n,"PlayerIds",params,undefined,true); 
			copyArgs(n,"AcceptanceType",params,undefined,false); 
			
			copyArgs(n,"TicketId",params,undefined,false); 
			copyArgs(n,"PlayerIds",params,undefined,true); 
			copyArgs(n,"AcceptanceType",params,undefined,false); 
			
			copyArgs(msg,"TicketId",params,undefined,false); 
			copyArgs(msg,"PlayerIds",params,undefined,true); 
			copyArgs(msg,"AcceptanceType",params,undefined,false); 
			

			svc.acceptMatch(params,cb);
		}
			service.ClaimGameServer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GameServerGroupName",params,undefined,false); 
			
			copyArgs(n,"GameServerGroupName",params,undefined,false); 
			copyArgs(n,"GameServerId",params,undefined,false); 
			copyArgs(n,"GameServerData",params,undefined,false); 
			
			copyArgs(msg,"GameServerGroupName",params,undefined,false); 
			copyArgs(msg,"GameServerId",params,undefined,false); 
			copyArgs(msg,"GameServerData",params,undefined,false); 
			

			svc.claimGameServer(params,cb);
		}
			service.CreateAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RoutingStrategy",params,undefined,true); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"RoutingStrategy",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"RoutingStrategy",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createAlias(params,cb);
		}
			service.CreateBuild=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			copyArgs(n,"StorageLocation",params,undefined,true); 
			copyArgs(n,"OperatingSystem",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			copyArgs(msg,"StorageLocation",params,undefined,true); 
			copyArgs(msg,"OperatingSystem",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createBuild(params,cb);
		}
			service.CreateFleet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"EC2InstanceType",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"BuildId",params,undefined,false); 
			copyArgs(n,"ScriptId",params,undefined,false); 
			copyArgs(n,"ServerLaunchPath",params,undefined,false); 
			copyArgs(n,"ServerLaunchParameters",params,undefined,false); 
			copyArgs(n,"LogPaths",params,undefined,true); 
			copyArgs(n,"EC2InstanceType",params,undefined,false); 
			copyArgs(n,"EC2InboundPermissions",params,undefined,true); 
			copyArgs(n,"NewGameSessionProtectionPolicy",params,undefined,false); 
			copyArgs(n,"RuntimeConfiguration",params,undefined,true); 
			copyArgs(n,"ResourceCreationLimitPolicy",params,undefined,true); 
			copyArgs(n,"MetricGroups",params,undefined,true); 
			copyArgs(n,"PeerVpcAwsAccountId",params,undefined,false); 
			copyArgs(n,"PeerVpcId",params,undefined,false); 
			copyArgs(n,"FleetType",params,undefined,false); 
			copyArgs(n,"InstanceRoleArn",params,undefined,false); 
			copyArgs(n,"CertificateConfiguration",params,undefined,true); 
			copyArgs(n,"Locations",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"BuildId",params,undefined,false); 
			copyArgs(msg,"ScriptId",params,undefined,false); 
			copyArgs(msg,"ServerLaunchPath",params,undefined,false); 
			copyArgs(msg,"ServerLaunchParameters",params,undefined,false); 
			copyArgs(msg,"LogPaths",params,undefined,true); 
			copyArgs(msg,"EC2InstanceType",params,undefined,false); 
			copyArgs(msg,"EC2InboundPermissions",params,undefined,true); 
			copyArgs(msg,"NewGameSessionProtectionPolicy",params,undefined,false); 
			copyArgs(msg,"RuntimeConfiguration",params,undefined,true); 
			copyArgs(msg,"ResourceCreationLimitPolicy",params,undefined,true); 
			copyArgs(msg,"MetricGroups",params,undefined,true); 
			copyArgs(msg,"PeerVpcAwsAccountId",params,undefined,false); 
			copyArgs(msg,"PeerVpcId",params,undefined,false); 
			copyArgs(msg,"FleetType",params,undefined,false); 
			copyArgs(msg,"InstanceRoleArn",params,undefined,false); 
			copyArgs(msg,"CertificateConfiguration",params,undefined,true); 
			copyArgs(msg,"Locations",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createFleet(params,cb);
		}
			service.CreateFleetLocations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"Locations",params,undefined,true); 
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"Locations",params,undefined,true); 
			
			copyArgs(msg,"FleetId",params,undefined,false); 
			copyArgs(msg,"Locations",params,undefined,true); 
			

			svc.createFleetLocations(params,cb);
		}
			service.CreateGameServerGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GameServerGroupName",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(Number(n),"MinSize",params,undefined,false); 
			copyArgs(Number(n),"MaxSize",params,undefined,false); 
			copyArgs(n,"LaunchTemplate",params,undefined,false); 
			copyArgs(n,"InstanceDefinitions",params,undefined,true); 
			
			copyArgs(n,"GameServerGroupName",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(Number(n),"MinSize",params,undefined,false); 
			copyArgs(Number(n),"MaxSize",params,undefined,false); 
			copyArgs(n,"LaunchTemplate",params,undefined,false); 
			copyArgs(n,"InstanceDefinitions",params,undefined,true); 
			copyArgs(n,"AutoScalingPolicy",params,undefined,false); 
			copyArgs(n,"BalancingStrategy",params,undefined,false); 
			copyArgs(n,"GameServerProtectionPolicy",params,undefined,false); 
			copyArgs(n,"VpcSubnets",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"GameServerGroupName",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"MinSize",params,undefined,false); 
			copyArgs(msg,"MaxSize",params,undefined,false); 
			copyArgs(msg,"LaunchTemplate",params,undefined,false); 
			copyArgs(msg,"InstanceDefinitions",params,undefined,true); 
			copyArgs(msg,"AutoScalingPolicy",params,undefined,false); 
			copyArgs(msg,"BalancingStrategy",params,undefined,false); 
			copyArgs(msg,"GameServerProtectionPolicy",params,undefined,false); 
			copyArgs(msg,"VpcSubnets",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createGameServerGroup(params,cb);
		}
			service.CreateGameSession=function(svc,msg,cb){
			var params={};
			
			copyArgs(Number(n),"MaximumPlayerSessionCount",params,undefined,false); 
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"AliasId",params,undefined,false); 
			copyArgs(Number(n),"MaximumPlayerSessionCount",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"GameProperties",params,undefined,true); 
			copyArgs(n,"CreatorId",params,undefined,false); 
			copyArgs(n,"GameSessionId",params,undefined,false); 
			copyArgs(n,"IdempotencyToken",params,undefined,false); 
			copyArgs(n,"GameSessionData",params,undefined,false); 
			copyArgs(n,"Location",params,undefined,false); 
			
			copyArgs(msg,"FleetId",params,undefined,false); 
			copyArgs(msg,"AliasId",params,undefined,false); 
			copyArgs(msg,"MaximumPlayerSessionCount",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"GameProperties",params,undefined,true); 
			copyArgs(msg,"CreatorId",params,undefined,false); 
			copyArgs(msg,"GameSessionId",params,undefined,false); 
			copyArgs(msg,"IdempotencyToken",params,undefined,false); 
			copyArgs(msg,"GameSessionData",params,undefined,false); 
			copyArgs(msg,"Location",params,undefined,false); 
			

			svc.createGameSession(params,cb);
		}
			service.CreateGameSessionQueue=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(Number(n),"TimeoutInSeconds",params,undefined,false); 
			copyArgs(n,"PlayerLatencyPolicies",params,undefined,true); 
			copyArgs(n,"Destinations",params,undefined,true); 
			copyArgs(n,"FilterConfiguration",params,undefined,true); 
			copyArgs(n,"PriorityConfiguration",params,undefined,true); 
			copyArgs(n,"CustomEventData",params,undefined,false); 
			copyArgs(n,"NotificationTarget",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"TimeoutInSeconds",params,undefined,false); 
			copyArgs(msg,"PlayerLatencyPolicies",params,undefined,true); 
			copyArgs(msg,"Destinations",params,undefined,true); 
			copyArgs(msg,"FilterConfiguration",params,undefined,true); 
			copyArgs(msg,"PriorityConfiguration",params,undefined,true); 
			copyArgs(msg,"CustomEventData",params,undefined,false); 
			copyArgs(msg,"NotificationTarget",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createGameSessionQueue(params,cb);
		}
			service.CreateMatchmakingConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(Number(n),"RequestTimeoutSeconds",params,undefined,false); 
			copyArgs(Boolean(n),"AcceptanceRequired",params,undefined,false); 
			copyArgs(n,"RuleSetName",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"GameSessionQueueArns",params,undefined,true); 
			copyArgs(Number(n),"RequestTimeoutSeconds",params,undefined,false); 
			copyArgs(Number(n),"AcceptanceTimeoutSeconds",params,undefined,false); 
			copyArgs(Boolean(n),"AcceptanceRequired",params,undefined,false); 
			copyArgs(n,"RuleSetName",params,undefined,false); 
			copyArgs(n,"NotificationTarget",params,undefined,false); 
			copyArgs(Number(n),"AdditionalPlayerCount",params,undefined,false); 
			copyArgs(n,"CustomEventData",params,undefined,false); 
			copyArgs(n,"GameProperties",params,undefined,true); 
			copyArgs(n,"GameSessionData",params,undefined,false); 
			copyArgs(n,"BackfillMode",params,undefined,false); 
			copyArgs(n,"FlexMatchMode",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"GameSessionQueueArns",params,undefined,true); 
			copyArgs(msg,"RequestTimeoutSeconds",params,undefined,false); 
			copyArgs(msg,"AcceptanceTimeoutSeconds",params,undefined,false); 
			copyArgs(msg,"AcceptanceRequired",params,undefined,false); 
			copyArgs(msg,"RuleSetName",params,undefined,false); 
			copyArgs(msg,"NotificationTarget",params,undefined,false); 
			copyArgs(msg,"AdditionalPlayerCount",params,undefined,false); 
			copyArgs(msg,"CustomEventData",params,undefined,false); 
			copyArgs(msg,"GameProperties",params,undefined,true); 
			copyArgs(msg,"GameSessionData",params,undefined,false); 
			copyArgs(msg,"BackfillMode",params,undefined,false); 
			copyArgs(msg,"FlexMatchMode",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createMatchmakingConfiguration(params,cb);
		}
			service.CreateMatchmakingRuleSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RuleSetBody",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RuleSetBody",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"RuleSetBody",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createMatchmakingRuleSet(params,cb);
		}
			service.CreatePlayerSession=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GameSessionId",params,undefined,false); 
			copyArgs(n,"PlayerId",params,undefined,false); 
			
			copyArgs(n,"GameSessionId",params,undefined,false); 
			copyArgs(n,"PlayerId",params,undefined,false); 
			copyArgs(n,"PlayerData",params,undefined,false); 
			
			copyArgs(msg,"GameSessionId",params,undefined,false); 
			copyArgs(msg,"PlayerId",params,undefined,false); 
			copyArgs(msg,"PlayerData",params,undefined,false); 
			

			svc.createPlayerSession(params,cb);
		}
			service.CreatePlayerSessions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GameSessionId",params,undefined,false); 
			copyArgs(n,"PlayerIds",params,undefined,false); 
			
			copyArgs(n,"GameSessionId",params,undefined,false); 
			copyArgs(n,"PlayerIds",params,undefined,false); 
			copyArgs(n,"PlayerDataMap",params,undefined,false); 
			
			copyArgs(msg,"GameSessionId",params,undefined,false); 
			copyArgs(msg,"PlayerIds",params,undefined,false); 
			copyArgs(msg,"PlayerDataMap",params,undefined,false); 
			

			svc.createPlayerSessions(params,cb);
		}
			service.CreateScript=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			copyArgs(n,"StorageLocation",params,undefined,true); 
			copyArgs(n,"ZipFile",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			copyArgs(msg,"StorageLocation",params,undefined,true); 
			copyArgs(msg,"ZipFile",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createScript(params,cb);
		}
			service.CreateVpcPeeringAuthorization=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GameLiftAwsAccountId",params,undefined,false); 
			copyArgs(n,"PeerVpcId",params,undefined,false); 
			
			copyArgs(n,"GameLiftAwsAccountId",params,undefined,false); 
			copyArgs(n,"PeerVpcId",params,undefined,false); 
			
			copyArgs(msg,"GameLiftAwsAccountId",params,undefined,false); 
			copyArgs(msg,"PeerVpcId",params,undefined,false); 
			

			svc.createVpcPeeringAuthorization(params,cb);
		}
			service.CreateVpcPeeringConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"PeerVpcAwsAccountId",params,undefined,false); 
			copyArgs(n,"PeerVpcId",params,undefined,false); 
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"PeerVpcAwsAccountId",params,undefined,false); 
			copyArgs(n,"PeerVpcId",params,undefined,false); 
			
			copyArgs(msg,"FleetId",params,undefined,false); 
			copyArgs(msg,"PeerVpcAwsAccountId",params,undefined,false); 
			copyArgs(msg,"PeerVpcId",params,undefined,false); 
			

			svc.createVpcPeeringConnection(params,cb);
		}
			service.DeleteAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AliasId",params,undefined,false); 
			
			copyArgs(n,"AliasId",params,undefined,false); 
			
			copyArgs(msg,"AliasId",params,undefined,false); 
			

			svc.deleteAlias(params,cb);
		}
			service.DeleteBuild=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BuildId",params,undefined,false); 
			
			copyArgs(n,"BuildId",params,undefined,false); 
			
			copyArgs(msg,"BuildId",params,undefined,false); 
			

			svc.deleteBuild(params,cb);
		}
			service.DeleteFleet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FleetId",params,undefined,false); 
			
			copyArgs(n,"FleetId",params,undefined,false); 
			
			copyArgs(msg,"FleetId",params,undefined,false); 
			

			svc.deleteFleet(params,cb);
		}
			service.DeleteFleetLocations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"Locations",params,undefined,true); 
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"Locations",params,undefined,true); 
			
			copyArgs(msg,"FleetId",params,undefined,false); 
			copyArgs(msg,"Locations",params,undefined,true); 
			

			svc.deleteFleetLocations(params,cb);
		}
			service.DeleteGameServerGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GameServerGroupName",params,undefined,false); 
			
			copyArgs(n,"GameServerGroupName",params,undefined,false); 
			copyArgs(n,"DeleteOption",params,undefined,false); 
			
			copyArgs(msg,"GameServerGroupName",params,undefined,false); 
			copyArgs(msg,"DeleteOption",params,undefined,false); 
			

			svc.deleteGameServerGroup(params,cb);
		}
			service.DeleteGameSessionQueue=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteGameSessionQueue(params,cb);
		}
			service.DeleteMatchmakingConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteMatchmakingConfiguration(params,cb);
		}
			service.DeleteMatchmakingRuleSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteMatchmakingRuleSet(params,cb);
		}
			service.DeleteScalingPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"FleetId",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"FleetId",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"FleetId",params,undefined,false); 
			

			svc.deleteScalingPolicy(params,cb);
		}
			service.DeleteScript=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ScriptId",params,undefined,false); 
			
			copyArgs(n,"ScriptId",params,undefined,false); 
			
			copyArgs(msg,"ScriptId",params,undefined,false); 
			

			svc.deleteScript(params,cb);
		}
			service.DeleteVpcPeeringAuthorization=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GameLiftAwsAccountId",params,undefined,false); 
			copyArgs(n,"PeerVpcId",params,undefined,false); 
			
			copyArgs(n,"GameLiftAwsAccountId",params,undefined,false); 
			copyArgs(n,"PeerVpcId",params,undefined,false); 
			
			copyArgs(msg,"GameLiftAwsAccountId",params,undefined,false); 
			copyArgs(msg,"PeerVpcId",params,undefined,false); 
			

			svc.deleteVpcPeeringAuthorization(params,cb);
		}
			service.DeleteVpcPeeringConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"VpcPeeringConnectionId",params,undefined,false); 
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"VpcPeeringConnectionId",params,undefined,false); 
			
			copyArgs(msg,"FleetId",params,undefined,false); 
			copyArgs(msg,"VpcPeeringConnectionId",params,undefined,false); 
			

			svc.deleteVpcPeeringConnection(params,cb);
		}
			service.DeregisterGameServer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GameServerGroupName",params,undefined,false); 
			copyArgs(n,"GameServerId",params,undefined,false); 
			
			copyArgs(n,"GameServerGroupName",params,undefined,false); 
			copyArgs(n,"GameServerId",params,undefined,false); 
			
			copyArgs(msg,"GameServerGroupName",params,undefined,false); 
			copyArgs(msg,"GameServerId",params,undefined,false); 
			

			svc.deregisterGameServer(params,cb);
		}
			service.DescribeAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AliasId",params,undefined,false); 
			
			copyArgs(n,"AliasId",params,undefined,false); 
			
			copyArgs(msg,"AliasId",params,undefined,false); 
			

			svc.describeAlias(params,cb);
		}
			service.DescribeBuild=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BuildId",params,undefined,false); 
			
			copyArgs(n,"BuildId",params,undefined,false); 
			
			copyArgs(msg,"BuildId",params,undefined,false); 
			

			svc.describeBuild(params,cb);
		}
			service.DescribeEC2InstanceLimits=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"EC2InstanceType",params,undefined,false); 
			copyArgs(n,"Location",params,undefined,false); 
			
			copyArgs(msg,"EC2InstanceType",params,undefined,false); 
			copyArgs(msg,"Location",params,undefined,false); 
			

			svc.describeEC2InstanceLimits(params,cb);
		}
			service.DescribeFleetAttributes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"FleetIds",params,undefined,true); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"FleetIds",params,undefined,true); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeFleetAttributes(params,cb);
		}
			service.DescribeFleetCapacity=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"FleetIds",params,undefined,true); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"FleetIds",params,undefined,true); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeFleetCapacity(params,cb);
		}
			service.DescribeFleetEvents=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FleetId",params,undefined,false); 
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"FleetId",params,undefined,false); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeFleetEvents(params,cb);
		}
			service.DescribeFleetLocationAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FleetId",params,undefined,false); 
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"Locations",params,undefined,true); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"FleetId",params,undefined,false); 
			copyArgs(msg,"Locations",params,undefined,true); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeFleetLocationAttributes(params,cb);
		}
			service.DescribeFleetLocationCapacity=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"Location",params,undefined,false); 
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"Location",params,undefined,false); 
			
			copyArgs(msg,"FleetId",params,undefined,false); 
			copyArgs(msg,"Location",params,undefined,false); 
			

			svc.describeFleetLocationCapacity(params,cb);
		}
			service.DescribeFleetLocationUtilization=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"Location",params,undefined,false); 
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"Location",params,undefined,false); 
			
			copyArgs(msg,"FleetId",params,undefined,false); 
			copyArgs(msg,"Location",params,undefined,false); 
			

			svc.describeFleetLocationUtilization(params,cb);
		}
			service.DescribeFleetPortSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FleetId",params,undefined,false); 
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"Location",params,undefined,false); 
			
			copyArgs(msg,"FleetId",params,undefined,false); 
			copyArgs(msg,"Location",params,undefined,false); 
			

			svc.describeFleetPortSettings(params,cb);
		}
			service.DescribeFleetUtilization=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"FleetIds",params,undefined,true); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"FleetIds",params,undefined,true); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeFleetUtilization(params,cb);
		}
			service.DescribeGameServer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GameServerGroupName",params,undefined,false); 
			copyArgs(n,"GameServerId",params,undefined,false); 
			
			copyArgs(n,"GameServerGroupName",params,undefined,false); 
			copyArgs(n,"GameServerId",params,undefined,false); 
			
			copyArgs(msg,"GameServerGroupName",params,undefined,false); 
			copyArgs(msg,"GameServerId",params,undefined,false); 
			

			svc.describeGameServer(params,cb);
		}
			service.DescribeGameServerGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GameServerGroupName",params,undefined,false); 
			
			copyArgs(n,"GameServerGroupName",params,undefined,false); 
			
			copyArgs(msg,"GameServerGroupName",params,undefined,false); 
			

			svc.describeGameServerGroup(params,cb);
		}
			service.DescribeGameServerInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GameServerGroupName",params,undefined,false); 
			
			copyArgs(n,"GameServerGroupName",params,undefined,false); 
			copyArgs(n,"InstanceIds",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"GameServerGroupName",params,undefined,false); 
			copyArgs(msg,"InstanceIds",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeGameServerInstances(params,cb);
		}
			service.DescribeGameSessionDetails=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"GameSessionId",params,undefined,false); 
			copyArgs(n,"AliasId",params,undefined,false); 
			copyArgs(n,"Location",params,undefined,false); 
			copyArgs(n,"StatusFilter",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"FleetId",params,undefined,false); 
			copyArgs(msg,"GameSessionId",params,undefined,false); 
			copyArgs(msg,"AliasId",params,undefined,false); 
			copyArgs(msg,"Location",params,undefined,false); 
			copyArgs(msg,"StatusFilter",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeGameSessionDetails(params,cb);
		}
			service.DescribeGameSessionPlacement=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PlacementId",params,undefined,false); 
			
			copyArgs(n,"PlacementId",params,undefined,false); 
			
			copyArgs(msg,"PlacementId",params,undefined,false); 
			

			svc.describeGameSessionPlacement(params,cb);
		}
			service.DescribeGameSessionQueues=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Names",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Names",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeGameSessionQueues(params,cb);
		}
			service.DescribeGameSessions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"GameSessionId",params,undefined,false); 
			copyArgs(n,"AliasId",params,undefined,false); 
			copyArgs(n,"Location",params,undefined,false); 
			copyArgs(n,"StatusFilter",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"FleetId",params,undefined,false); 
			copyArgs(msg,"GameSessionId",params,undefined,false); 
			copyArgs(msg,"AliasId",params,undefined,false); 
			copyArgs(msg,"Location",params,undefined,false); 
			copyArgs(msg,"StatusFilter",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeGameSessions(params,cb);
		}
			service.DescribeInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FleetId",params,undefined,false); 
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Location",params,undefined,false); 
			
			copyArgs(msg,"FleetId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Location",params,undefined,false); 
			

			svc.describeInstances(params,cb);
		}
			service.DescribeMatchmaking=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TicketIds",params,undefined,false); 
			
			copyArgs(n,"TicketIds",params,undefined,false); 
			
			copyArgs(msg,"TicketIds",params,undefined,false); 
			

			svc.describeMatchmaking(params,cb);
		}
			service.DescribeMatchmakingConfigurations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Names",params,undefined,false); 
			copyArgs(n,"RuleSetName",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Names",params,undefined,false); 
			copyArgs(msg,"RuleSetName",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeMatchmakingConfigurations(params,cb);
		}
			service.DescribeMatchmakingRuleSets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Names",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Names",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeMatchmakingRuleSets(params,cb);
		}
			service.DescribePlayerSessions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"GameSessionId",params,undefined,false); 
			copyArgs(n,"PlayerId",params,undefined,false); 
			copyArgs(n,"PlayerSessionId",params,undefined,false); 
			copyArgs(n,"PlayerSessionStatusFilter",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"GameSessionId",params,undefined,false); 
			copyArgs(msg,"PlayerId",params,undefined,false); 
			copyArgs(msg,"PlayerSessionId",params,undefined,false); 
			copyArgs(msg,"PlayerSessionStatusFilter",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describePlayerSessions(params,cb);
		}
			service.DescribeRuntimeConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FleetId",params,undefined,false); 
			
			copyArgs(n,"FleetId",params,undefined,false); 
			
			copyArgs(msg,"FleetId",params,undefined,false); 
			

			svc.describeRuntimeConfiguration(params,cb);
		}
			service.DescribeScalingPolicies=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FleetId",params,undefined,false); 
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"StatusFilter",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Location",params,undefined,false); 
			
			copyArgs(msg,"FleetId",params,undefined,false); 
			copyArgs(msg,"StatusFilter",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Location",params,undefined,false); 
			

			svc.describeScalingPolicies(params,cb);
		}
			service.DescribeScript=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ScriptId",params,undefined,false); 
			
			copyArgs(n,"ScriptId",params,undefined,false); 
			
			copyArgs(msg,"ScriptId",params,undefined,false); 
			

			svc.describeScript(params,cb);
		}
			service.DescribeVpcPeeringAuthorizations=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeVpcPeeringAuthorizations(params,cb);
		}
			service.DescribeVpcPeeringConnections=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"FleetId",params,undefined,false); 
			
			copyArgs(msg,"FleetId",params,undefined,false); 
			

			svc.describeVpcPeeringConnections(params,cb);
		}
			service.GetGameSessionLogUrl=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GameSessionId",params,undefined,false); 
			
			copyArgs(n,"GameSessionId",params,undefined,false); 
			
			copyArgs(msg,"GameSessionId",params,undefined,false); 
			

			svc.getGameSessionLogUrl(params,cb);
		}
			service.GetInstanceAccess=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"FleetId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.getInstanceAccess(params,cb);
		}
			service.ListAliases=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"RoutingStrategyType",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"RoutingStrategyType",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listAliases(params,cb);
		}
			service.ListBuilds=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Status",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Status",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listBuilds(params,cb);
		}
			service.ListFleets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"BuildId",params,undefined,false); 
			copyArgs(n,"ScriptId",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"BuildId",params,undefined,false); 
			copyArgs(msg,"ScriptId",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listFleets(params,cb);
		}
			service.ListGameServerGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listGameServerGroups(params,cb);
		}
			service.ListGameServers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GameServerGroupName",params,undefined,false); 
			
			copyArgs(n,"GameServerGroupName",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"GameServerGroupName",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listGameServers(params,cb);
		}
			service.ListScripts=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listScripts(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.PutScalingPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"MetricName",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(Number(n),"ScalingAdjustment",params,undefined,false); 
			copyArgs(n,"ScalingAdjustmentType",params,undefined,false); 
			copyArgs(n,"Threshold",params,undefined,false); 
			copyArgs(n,"ComparisonOperator",params,undefined,false); 
			copyArgs(Number(n),"EvaluationPeriods",params,undefined,false); 
			copyArgs(n,"MetricName",params,undefined,false); 
			copyArgs(n,"PolicyType",params,undefined,false); 
			copyArgs(n,"TargetConfiguration",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"FleetId",params,undefined,false); 
			copyArgs(msg,"ScalingAdjustment",params,undefined,false); 
			copyArgs(msg,"ScalingAdjustmentType",params,undefined,false); 
			copyArgs(msg,"Threshold",params,undefined,false); 
			copyArgs(msg,"ComparisonOperator",params,undefined,false); 
			copyArgs(msg,"EvaluationPeriods",params,undefined,false); 
			copyArgs(msg,"MetricName",params,undefined,false); 
			copyArgs(msg,"PolicyType",params,undefined,false); 
			copyArgs(msg,"TargetConfiguration",params,undefined,true); 
			

			svc.putScalingPolicy(params,cb);
		}
			service.RegisterGameServer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GameServerGroupName",params,undefined,false); 
			copyArgs(n,"GameServerId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"GameServerGroupName",params,undefined,false); 
			copyArgs(n,"GameServerId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"ConnectionInfo",params,undefined,false); 
			copyArgs(n,"GameServerData",params,undefined,false); 
			
			copyArgs(msg,"GameServerGroupName",params,undefined,false); 
			copyArgs(msg,"GameServerId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"ConnectionInfo",params,undefined,false); 
			copyArgs(msg,"GameServerData",params,undefined,false); 
			

			svc.registerGameServer(params,cb);
		}
			service.RequestUploadCredentials=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BuildId",params,undefined,false); 
			
			copyArgs(n,"BuildId",params,undefined,false); 
			
			copyArgs(msg,"BuildId",params,undefined,false); 
			

			svc.requestUploadCredentials(params,cb);
		}
			service.ResolveAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AliasId",params,undefined,false); 
			
			copyArgs(n,"AliasId",params,undefined,false); 
			
			copyArgs(msg,"AliasId",params,undefined,false); 
			

			svc.resolveAlias(params,cb);
		}
			service.ResumeGameServerGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GameServerGroupName",params,undefined,false); 
			copyArgs(n,"ResumeActions",params,undefined,true); 
			
			copyArgs(n,"GameServerGroupName",params,undefined,false); 
			copyArgs(n,"ResumeActions",params,undefined,true); 
			
			copyArgs(msg,"GameServerGroupName",params,undefined,false); 
			copyArgs(msg,"ResumeActions",params,undefined,true); 
			

			svc.resumeGameServerGroup(params,cb);
		}
			service.SearchGameSessions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"AliasId",params,undefined,false); 
			copyArgs(n,"Location",params,undefined,false); 
			copyArgs(n,"FilterExpression",params,undefined,false); 
			copyArgs(n,"SortExpression",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"FleetId",params,undefined,false); 
			copyArgs(msg,"AliasId",params,undefined,false); 
			copyArgs(msg,"Location",params,undefined,false); 
			copyArgs(msg,"FilterExpression",params,undefined,false); 
			copyArgs(msg,"SortExpression",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.searchGameSessions(params,cb);
		}
			service.StartFleetActions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"Actions",params,undefined,true); 
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"Actions",params,undefined,true); 
			copyArgs(n,"Location",params,undefined,false); 
			
			copyArgs(msg,"FleetId",params,undefined,false); 
			copyArgs(msg,"Actions",params,undefined,true); 
			copyArgs(msg,"Location",params,undefined,false); 
			

			svc.startFleetActions(params,cb);
		}
			service.StartGameSessionPlacement=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PlacementId",params,undefined,false); 
			copyArgs(n,"GameSessionQueueName",params,undefined,false); 
			copyArgs(Number(n),"MaximumPlayerSessionCount",params,undefined,false); 
			
			copyArgs(n,"PlacementId",params,undefined,false); 
			copyArgs(n,"GameSessionQueueName",params,undefined,false); 
			copyArgs(n,"GameProperties",params,undefined,true); 
			copyArgs(Number(n),"MaximumPlayerSessionCount",params,undefined,false); 
			copyArgs(n,"GameSessionName",params,undefined,false); 
			copyArgs(n,"PlayerLatencies",params,undefined,true); 
			copyArgs(n,"DesiredPlayerSessions",params,undefined,false); 
			copyArgs(n,"GameSessionData",params,undefined,false); 
			
			copyArgs(msg,"PlacementId",params,undefined,false); 
			copyArgs(msg,"GameSessionQueueName",params,undefined,false); 
			copyArgs(msg,"GameProperties",params,undefined,true); 
			copyArgs(msg,"MaximumPlayerSessionCount",params,undefined,false); 
			copyArgs(msg,"GameSessionName",params,undefined,false); 
			copyArgs(msg,"PlayerLatencies",params,undefined,true); 
			copyArgs(msg,"DesiredPlayerSessions",params,undefined,false); 
			copyArgs(msg,"GameSessionData",params,undefined,false); 
			

			svc.startGameSessionPlacement(params,cb);
		}
			service.StartMatchBackfill=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationName",params,undefined,false); 
			copyArgs(n,"Players",params,undefined,true); 
			
			copyArgs(n,"TicketId",params,undefined,false); 
			copyArgs(n,"ConfigurationName",params,undefined,false); 
			copyArgs(n,"GameSessionArn",params,undefined,false); 
			copyArgs(n,"Players",params,undefined,true); 
			
			copyArgs(msg,"TicketId",params,undefined,false); 
			copyArgs(msg,"ConfigurationName",params,undefined,false); 
			copyArgs(msg,"GameSessionArn",params,undefined,false); 
			copyArgs(msg,"Players",params,undefined,true); 
			

			svc.startMatchBackfill(params,cb);
		}
			service.StartMatchmaking=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationName",params,undefined,false); 
			copyArgs(n,"Players",params,undefined,true); 
			
			copyArgs(n,"TicketId",params,undefined,false); 
			copyArgs(n,"ConfigurationName",params,undefined,false); 
			copyArgs(n,"Players",params,undefined,true); 
			
			copyArgs(msg,"TicketId",params,undefined,false); 
			copyArgs(msg,"ConfigurationName",params,undefined,false); 
			copyArgs(msg,"Players",params,undefined,true); 
			

			svc.startMatchmaking(params,cb);
		}
			service.StopFleetActions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"Actions",params,undefined,true); 
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"Actions",params,undefined,true); 
			copyArgs(n,"Location",params,undefined,false); 
			
			copyArgs(msg,"FleetId",params,undefined,false); 
			copyArgs(msg,"Actions",params,undefined,true); 
			copyArgs(msg,"Location",params,undefined,false); 
			

			svc.stopFleetActions(params,cb);
		}
			service.StopGameSessionPlacement=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PlacementId",params,undefined,false); 
			
			copyArgs(n,"PlacementId",params,undefined,false); 
			
			copyArgs(msg,"PlacementId",params,undefined,false); 
			

			svc.stopGameSessionPlacement(params,cb);
		}
			service.StopMatchmaking=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TicketId",params,undefined,false); 
			
			copyArgs(n,"TicketId",params,undefined,false); 
			
			copyArgs(msg,"TicketId",params,undefined,false); 
			

			svc.stopMatchmaking(params,cb);
		}
			service.SuspendGameServerGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GameServerGroupName",params,undefined,false); 
			copyArgs(n,"SuspendActions",params,undefined,true); 
			
			copyArgs(n,"GameServerGroupName",params,undefined,false); 
			copyArgs(n,"SuspendActions",params,undefined,true); 
			
			copyArgs(msg,"GameServerGroupName",params,undefined,false); 
			copyArgs(msg,"SuspendActions",params,undefined,true); 
			

			svc.suspendGameServerGroup(params,cb);
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
			service.UpdateAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AliasId",params,undefined,false); 
			
			copyArgs(n,"AliasId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"RoutingStrategy",params,undefined,true); 
			
			copyArgs(msg,"AliasId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"RoutingStrategy",params,undefined,true); 
			

			svc.updateAlias(params,cb);
		}
			service.UpdateBuild=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BuildId",params,undefined,false); 
			
			copyArgs(n,"BuildId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			
			copyArgs(msg,"BuildId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			

			svc.updateBuild(params,cb);
		}
			service.UpdateFleetAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FleetId",params,undefined,false); 
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"NewGameSessionProtectionPolicy",params,undefined,false); 
			copyArgs(n,"ResourceCreationLimitPolicy",params,undefined,true); 
			copyArgs(n,"MetricGroups",params,undefined,true); 
			
			copyArgs(msg,"FleetId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"NewGameSessionProtectionPolicy",params,undefined,false); 
			copyArgs(msg,"ResourceCreationLimitPolicy",params,undefined,true); 
			copyArgs(msg,"MetricGroups",params,undefined,true); 
			

			svc.updateFleetAttributes(params,cb);
		}
			service.UpdateFleetCapacity=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FleetId",params,undefined,false); 
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(Number(n),"DesiredInstances",params,undefined,false); 
			copyArgs(Number(n),"MinSize",params,undefined,false); 
			copyArgs(Number(n),"MaxSize",params,undefined,false); 
			copyArgs(n,"Location",params,undefined,false); 
			
			copyArgs(msg,"FleetId",params,undefined,false); 
			copyArgs(msg,"DesiredInstances",params,undefined,false); 
			copyArgs(msg,"MinSize",params,undefined,false); 
			copyArgs(msg,"MaxSize",params,undefined,false); 
			copyArgs(msg,"Location",params,undefined,false); 
			

			svc.updateFleetCapacity(params,cb);
		}
			service.UpdateFleetPortSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FleetId",params,undefined,false); 
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"InboundPermissionAuthorizations",params,undefined,true); 
			copyArgs(n,"InboundPermissionRevocations",params,undefined,true); 
			
			copyArgs(msg,"FleetId",params,undefined,false); 
			copyArgs(msg,"InboundPermissionAuthorizations",params,undefined,true); 
			copyArgs(msg,"InboundPermissionRevocations",params,undefined,true); 
			

			svc.updateFleetPortSettings(params,cb);
		}
			service.UpdateGameServer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GameServerGroupName",params,undefined,false); 
			copyArgs(n,"GameServerId",params,undefined,false); 
			
			copyArgs(n,"GameServerGroupName",params,undefined,false); 
			copyArgs(n,"GameServerId",params,undefined,false); 
			copyArgs(n,"GameServerData",params,undefined,false); 
			copyArgs(n,"UtilizationStatus",params,undefined,false); 
			copyArgs(n,"HealthCheck",params,undefined,false); 
			
			copyArgs(msg,"GameServerGroupName",params,undefined,false); 
			copyArgs(msg,"GameServerId",params,undefined,false); 
			copyArgs(msg,"GameServerData",params,undefined,false); 
			copyArgs(msg,"UtilizationStatus",params,undefined,false); 
			copyArgs(msg,"HealthCheck",params,undefined,false); 
			

			svc.updateGameServer(params,cb);
		}
			service.UpdateGameServerGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GameServerGroupName",params,undefined,false); 
			
			copyArgs(n,"GameServerGroupName",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"InstanceDefinitions",params,undefined,true); 
			copyArgs(n,"GameServerProtectionPolicy",params,undefined,false); 
			copyArgs(n,"BalancingStrategy",params,undefined,false); 
			
			copyArgs(msg,"GameServerGroupName",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"InstanceDefinitions",params,undefined,true); 
			copyArgs(msg,"GameServerProtectionPolicy",params,undefined,false); 
			copyArgs(msg,"BalancingStrategy",params,undefined,false); 
			

			svc.updateGameServerGroup(params,cb);
		}
			service.UpdateGameSession=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GameSessionId",params,undefined,false); 
			
			copyArgs(n,"GameSessionId",params,undefined,false); 
			copyArgs(Number(n),"MaximumPlayerSessionCount",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"PlayerSessionCreationPolicy",params,undefined,false); 
			copyArgs(n,"ProtectionPolicy",params,undefined,false); 
			
			copyArgs(msg,"GameSessionId",params,undefined,false); 
			copyArgs(msg,"MaximumPlayerSessionCount",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"PlayerSessionCreationPolicy",params,undefined,false); 
			copyArgs(msg,"ProtectionPolicy",params,undefined,false); 
			

			svc.updateGameSession(params,cb);
		}
			service.UpdateGameSessionQueue=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(Number(n),"TimeoutInSeconds",params,undefined,false); 
			copyArgs(n,"PlayerLatencyPolicies",params,undefined,true); 
			copyArgs(n,"Destinations",params,undefined,true); 
			copyArgs(n,"FilterConfiguration",params,undefined,true); 
			copyArgs(n,"PriorityConfiguration",params,undefined,true); 
			copyArgs(n,"CustomEventData",params,undefined,false); 
			copyArgs(n,"NotificationTarget",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"TimeoutInSeconds",params,undefined,false); 
			copyArgs(msg,"PlayerLatencyPolicies",params,undefined,true); 
			copyArgs(msg,"Destinations",params,undefined,true); 
			copyArgs(msg,"FilterConfiguration",params,undefined,true); 
			copyArgs(msg,"PriorityConfiguration",params,undefined,true); 
			copyArgs(msg,"CustomEventData",params,undefined,false); 
			copyArgs(msg,"NotificationTarget",params,undefined,false); 
			

			svc.updateGameSessionQueue(params,cb);
		}
			service.UpdateMatchmakingConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"GameSessionQueueArns",params,undefined,true); 
			copyArgs(Number(n),"RequestTimeoutSeconds",params,undefined,false); 
			copyArgs(Number(n),"AcceptanceTimeoutSeconds",params,undefined,false); 
			copyArgs(Boolean(n),"AcceptanceRequired",params,undefined,false); 
			copyArgs(n,"RuleSetName",params,undefined,false); 
			copyArgs(n,"NotificationTarget",params,undefined,false); 
			copyArgs(Number(n),"AdditionalPlayerCount",params,undefined,false); 
			copyArgs(n,"CustomEventData",params,undefined,false); 
			copyArgs(n,"GameProperties",params,undefined,true); 
			copyArgs(n,"GameSessionData",params,undefined,false); 
			copyArgs(n,"BackfillMode",params,undefined,false); 
			copyArgs(n,"FlexMatchMode",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"GameSessionQueueArns",params,undefined,true); 
			copyArgs(msg,"RequestTimeoutSeconds",params,undefined,false); 
			copyArgs(msg,"AcceptanceTimeoutSeconds",params,undefined,false); 
			copyArgs(msg,"AcceptanceRequired",params,undefined,false); 
			copyArgs(msg,"RuleSetName",params,undefined,false); 
			copyArgs(msg,"NotificationTarget",params,undefined,false); 
			copyArgs(msg,"AdditionalPlayerCount",params,undefined,false); 
			copyArgs(msg,"CustomEventData",params,undefined,false); 
			copyArgs(msg,"GameProperties",params,undefined,true); 
			copyArgs(msg,"GameSessionData",params,undefined,false); 
			copyArgs(msg,"BackfillMode",params,undefined,false); 
			copyArgs(msg,"FlexMatchMode",params,undefined,false); 
			

			svc.updateMatchmakingConfiguration(params,cb);
		}
			service.UpdateRuntimeConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"RuntimeConfiguration",params,undefined,true); 
			
			copyArgs(n,"FleetId",params,undefined,false); 
			copyArgs(n,"RuntimeConfiguration",params,undefined,true); 
			
			copyArgs(msg,"FleetId",params,undefined,false); 
			copyArgs(msg,"RuntimeConfiguration",params,undefined,true); 
			

			svc.updateRuntimeConfiguration(params,cb);
		}
			service.UpdateScript=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ScriptId",params,undefined,false); 
			
			copyArgs(n,"ScriptId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			copyArgs(n,"StorageLocation",params,undefined,true); 
			copyArgs(n,"ZipFile",params,undefined,false); 
			
			copyArgs(msg,"ScriptId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			copyArgs(msg,"StorageLocation",params,undefined,true); 
			copyArgs(msg,"ZipFile",params,undefined,false); 
			

			svc.updateScript(params,cb);
		}
			service.ValidateMatchmakingRuleSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RuleSetBody",params,undefined,false); 
			
			copyArgs(n,"RuleSetBody",params,undefined,false); 
			
			copyArgs(msg,"RuleSetBody",params,undefined,false); 
			

			svc.validateMatchmakingRuleSet(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS GameLift", AmazonAPINode);

};
