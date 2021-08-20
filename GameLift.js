
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

		var awsService = new AWS.GameLift( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.GameLift(msg.AWSConfig) : awsService;

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

		
		service.AcceptMatch=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TicketId",params,undefined,false); 
			copyArg(n,"PlayerIds",params,undefined,true); 
			copyArg(n,"AcceptanceType",params,undefined,false); 
			
			copyArg(msg,"TicketId",params,undefined,false); 
			copyArg(msg,"PlayerIds",params,undefined,true); 
			copyArg(msg,"AcceptanceType",params,undefined,false); 
			

			svc.acceptMatch(params,cb);
		}

		
		service.ClaimGameServer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GameServerGroupName",params,undefined,false); 
			
			copyArg(msg,"GameServerGroupName",params,undefined,false); 
			copyArg(msg,"GameServerId",params,undefined,false); 
			copyArg(msg,"GameServerData",params,undefined,false); 
			

			svc.claimGameServer(params,cb);
		}

		
		service.CreateAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"RoutingStrategy",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"RoutingStrategy",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createAlias(params,cb);
		}

		
		service.CreateBuild=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Version",params,undefined,false); 
			copyArg(msg,"StorageLocation",params,undefined,true); 
			copyArg(msg,"OperatingSystem",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createBuild(params,cb);
		}

		
		service.CreateFleet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"EC2InstanceType",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"BuildId",params,undefined,false); 
			copyArg(msg,"ScriptId",params,undefined,false); 
			copyArg(msg,"ServerLaunchPath",params,undefined,false); 
			copyArg(msg,"ServerLaunchParameters",params,undefined,false); 
			copyArg(msg,"LogPaths",params,undefined,true); 
			copyArg(msg,"EC2InstanceType",params,undefined,false); 
			copyArg(msg,"EC2InboundPermissions",params,undefined,true); 
			copyArg(msg,"NewGameSessionProtectionPolicy",params,undefined,false); 
			copyArg(msg,"RuntimeConfiguration",params,undefined,true); 
			copyArg(msg,"ResourceCreationLimitPolicy",params,undefined,true); 
			copyArg(msg,"MetricGroups",params,undefined,true); 
			copyArg(msg,"PeerVpcAwsAccountId",params,undefined,false); 
			copyArg(msg,"PeerVpcId",params,undefined,false); 
			copyArg(msg,"FleetType",params,undefined,false); 
			copyArg(msg,"InstanceRoleArn",params,undefined,false); 
			copyArg(msg,"CertificateConfiguration",params,undefined,true); 
			copyArg(msg,"Locations",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createFleet(params,cb);
		}

		
		service.CreateFleetLocations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetId",params,undefined,false); 
			copyArg(n,"Locations",params,undefined,true); 
			
			copyArg(msg,"FleetId",params,undefined,false); 
			copyArg(msg,"Locations",params,undefined,true); 
			

			svc.createFleetLocations(params,cb);
		}

		
		service.CreateGameServerGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GameServerGroupName",params,undefined,false); 
			copyArg(n,"RoleArn",params,undefined,false); 
			copyArg(n,"MinSize",params,undefined,false); 
			copyArg(n,"MaxSize",params,undefined,false); 
			copyArg(n,"LaunchTemplate",params,undefined,false); 
			copyArg(n,"InstanceDefinitions",params,undefined,true); 
			
			copyArg(msg,"GameServerGroupName",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"MinSize",params,undefined,false); 
			copyArg(msg,"MaxSize",params,undefined,false); 
			copyArg(msg,"LaunchTemplate",params,undefined,false); 
			copyArg(msg,"InstanceDefinitions",params,undefined,true); 
			copyArg(msg,"AutoScalingPolicy",params,undefined,false); 
			copyArg(msg,"BalancingStrategy",params,undefined,false); 
			copyArg(msg,"GameServerProtectionPolicy",params,undefined,false); 
			copyArg(msg,"VpcSubnets",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createGameServerGroup(params,cb);
		}

		
		service.CreateGameSession=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MaximumPlayerSessionCount",params,undefined,false); 
			
			copyArg(msg,"FleetId",params,undefined,false); 
			copyArg(msg,"AliasId",params,undefined,false); 
			copyArg(msg,"MaximumPlayerSessionCount",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"GameProperties",params,undefined,true); 
			copyArg(msg,"CreatorId",params,undefined,false); 
			copyArg(msg,"GameSessionId",params,undefined,false); 
			copyArg(msg,"IdempotencyToken",params,undefined,false); 
			copyArg(msg,"GameSessionData",params,undefined,false); 
			copyArg(msg,"Location",params,undefined,false); 
			

			svc.createGameSession(params,cb);
		}

		
		service.CreateGameSessionQueue=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"TimeoutInSeconds",params,undefined,false); 
			copyArg(msg,"PlayerLatencyPolicies",params,undefined,true); 
			copyArg(msg,"Destinations",params,undefined,true); 
			copyArg(msg,"FilterConfiguration",params,undefined,true); 
			copyArg(msg,"PriorityConfiguration",params,undefined,true); 
			copyArg(msg,"CustomEventData",params,undefined,false); 
			copyArg(msg,"NotificationTarget",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createGameSessionQueue(params,cb);
		}

		
		service.CreateMatchmakingConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"RequestTimeoutSeconds",params,undefined,false); 
			copyArg(n,"AcceptanceRequired",params,undefined,false); 
			copyArg(n,"RuleSetName",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"GameSessionQueueArns",params,undefined,true); 
			copyArg(msg,"RequestTimeoutSeconds",params,undefined,false); 
			copyArg(msg,"AcceptanceTimeoutSeconds",params,undefined,false); 
			copyArg(msg,"AcceptanceRequired",params,undefined,false); 
			copyArg(msg,"RuleSetName",params,undefined,false); 
			copyArg(msg,"NotificationTarget",params,undefined,false); 
			copyArg(msg,"AdditionalPlayerCount",params,undefined,false); 
			copyArg(msg,"CustomEventData",params,undefined,false); 
			copyArg(msg,"GameProperties",params,undefined,true); 
			copyArg(msg,"GameSessionData",params,undefined,false); 
			copyArg(msg,"BackfillMode",params,undefined,false); 
			copyArg(msg,"FlexMatchMode",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createMatchmakingConfiguration(params,cb);
		}

		
		service.CreateMatchmakingRuleSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"RuleSetBody",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"RuleSetBody",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createMatchmakingRuleSet(params,cb);
		}

		
		service.CreatePlayerSession=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GameSessionId",params,undefined,false); 
			copyArg(n,"PlayerId",params,undefined,false); 
			
			copyArg(msg,"GameSessionId",params,undefined,false); 
			copyArg(msg,"PlayerId",params,undefined,false); 
			copyArg(msg,"PlayerData",params,undefined,false); 
			

			svc.createPlayerSession(params,cb);
		}

		
		service.CreatePlayerSessions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GameSessionId",params,undefined,false); 
			copyArg(n,"PlayerIds",params,undefined,false); 
			
			copyArg(msg,"GameSessionId",params,undefined,false); 
			copyArg(msg,"PlayerIds",params,undefined,false); 
			copyArg(msg,"PlayerDataMap",params,undefined,false); 
			

			svc.createPlayerSessions(params,cb);
		}

		
		service.CreateScript=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Version",params,undefined,false); 
			copyArg(msg,"StorageLocation",params,undefined,true); 
			copyArg(msg,"ZipFile",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createScript(params,cb);
		}

		
		service.CreateVpcPeeringAuthorization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GameLiftAwsAccountId",params,undefined,false); 
			copyArg(n,"PeerVpcId",params,undefined,false); 
			
			copyArg(msg,"GameLiftAwsAccountId",params,undefined,false); 
			copyArg(msg,"PeerVpcId",params,undefined,false); 
			

			svc.createVpcPeeringAuthorization(params,cb);
		}

		
		service.CreateVpcPeeringConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetId",params,undefined,false); 
			copyArg(n,"PeerVpcAwsAccountId",params,undefined,false); 
			copyArg(n,"PeerVpcId",params,undefined,false); 
			
			copyArg(msg,"FleetId",params,undefined,false); 
			copyArg(msg,"PeerVpcAwsAccountId",params,undefined,false); 
			copyArg(msg,"PeerVpcId",params,undefined,false); 
			

			svc.createVpcPeeringConnection(params,cb);
		}

		
		service.DeleteAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AliasId",params,undefined,false); 
			
			copyArg(msg,"AliasId",params,undefined,false); 
			

			svc.deleteAlias(params,cb);
		}

		
		service.DeleteBuild=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BuildId",params,undefined,false); 
			
			copyArg(msg,"BuildId",params,undefined,false); 
			

			svc.deleteBuild(params,cb);
		}

		
		service.DeleteFleet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetId",params,undefined,false); 
			
			copyArg(msg,"FleetId",params,undefined,false); 
			

			svc.deleteFleet(params,cb);
		}

		
		service.DeleteFleetLocations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetId",params,undefined,false); 
			copyArg(n,"Locations",params,undefined,true); 
			
			copyArg(msg,"FleetId",params,undefined,false); 
			copyArg(msg,"Locations",params,undefined,true); 
			

			svc.deleteFleetLocations(params,cb);
		}

		
		service.DeleteGameServerGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GameServerGroupName",params,undefined,false); 
			
			copyArg(msg,"GameServerGroupName",params,undefined,false); 
			copyArg(msg,"DeleteOption",params,undefined,false); 
			

			svc.deleteGameServerGroup(params,cb);
		}

		
		service.DeleteGameSessionQueue=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteGameSessionQueue(params,cb);
		}

		
		service.DeleteMatchmakingConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteMatchmakingConfiguration(params,cb);
		}

		
		service.DeleteMatchmakingRuleSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteMatchmakingRuleSet(params,cb);
		}

		
		service.DeleteScalingPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"FleetId",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"FleetId",params,undefined,false); 
			

			svc.deleteScalingPolicy(params,cb);
		}

		
		service.DeleteScript=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ScriptId",params,undefined,false); 
			
			copyArg(msg,"ScriptId",params,undefined,false); 
			

			svc.deleteScript(params,cb);
		}

		
		service.DeleteVpcPeeringAuthorization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GameLiftAwsAccountId",params,undefined,false); 
			copyArg(n,"PeerVpcId",params,undefined,false); 
			
			copyArg(msg,"GameLiftAwsAccountId",params,undefined,false); 
			copyArg(msg,"PeerVpcId",params,undefined,false); 
			

			svc.deleteVpcPeeringAuthorization(params,cb);
		}

		
		service.DeleteVpcPeeringConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetId",params,undefined,false); 
			copyArg(n,"VpcPeeringConnectionId",params,undefined,false); 
			
			copyArg(msg,"FleetId",params,undefined,false); 
			copyArg(msg,"VpcPeeringConnectionId",params,undefined,false); 
			

			svc.deleteVpcPeeringConnection(params,cb);
		}

		
		service.DeregisterGameServer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GameServerGroupName",params,undefined,false); 
			copyArg(n,"GameServerId",params,undefined,false); 
			
			copyArg(msg,"GameServerGroupName",params,undefined,false); 
			copyArg(msg,"GameServerId",params,undefined,false); 
			

			svc.deregisterGameServer(params,cb);
		}

		
		service.DescribeAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AliasId",params,undefined,false); 
			
			copyArg(msg,"AliasId",params,undefined,false); 
			

			svc.describeAlias(params,cb);
		}

		
		service.DescribeBuild=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BuildId",params,undefined,false); 
			
			copyArg(msg,"BuildId",params,undefined,false); 
			

			svc.describeBuild(params,cb);
		}

		
		service.DescribeEC2InstanceLimits=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"EC2InstanceType",params,undefined,false); 
			copyArg(msg,"Location",params,undefined,false); 
			

			svc.describeEC2InstanceLimits(params,cb);
		}

		
		service.DescribeFleetAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"FleetIds",params,undefined,true); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeFleetAttributes(params,cb);
		}

		
		service.DescribeFleetCapacity=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"FleetIds",params,undefined,true); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeFleetCapacity(params,cb);
		}

		
		service.DescribeFleetEvents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetId",params,undefined,false); 
			
			copyArg(msg,"FleetId",params,undefined,false); 
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeFleetEvents(params,cb);
		}

		
		service.DescribeFleetLocationAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetId",params,undefined,false); 
			
			copyArg(msg,"FleetId",params,undefined,false); 
			copyArg(msg,"Locations",params,undefined,true); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeFleetLocationAttributes(params,cb);
		}

		
		service.DescribeFleetLocationCapacity=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetId",params,undefined,false); 
			copyArg(n,"Location",params,undefined,false); 
			
			copyArg(msg,"FleetId",params,undefined,false); 
			copyArg(msg,"Location",params,undefined,false); 
			

			svc.describeFleetLocationCapacity(params,cb);
		}

		
		service.DescribeFleetLocationUtilization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetId",params,undefined,false); 
			copyArg(n,"Location",params,undefined,false); 
			
			copyArg(msg,"FleetId",params,undefined,false); 
			copyArg(msg,"Location",params,undefined,false); 
			

			svc.describeFleetLocationUtilization(params,cb);
		}

		
		service.DescribeFleetPortSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetId",params,undefined,false); 
			
			copyArg(msg,"FleetId",params,undefined,false); 
			copyArg(msg,"Location",params,undefined,false); 
			

			svc.describeFleetPortSettings(params,cb);
		}

		
		service.DescribeFleetUtilization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"FleetIds",params,undefined,true); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeFleetUtilization(params,cb);
		}

		
		service.DescribeGameServer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GameServerGroupName",params,undefined,false); 
			copyArg(n,"GameServerId",params,undefined,false); 
			
			copyArg(msg,"GameServerGroupName",params,undefined,false); 
			copyArg(msg,"GameServerId",params,undefined,false); 
			

			svc.describeGameServer(params,cb);
		}

		
		service.DescribeGameServerGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GameServerGroupName",params,undefined,false); 
			
			copyArg(msg,"GameServerGroupName",params,undefined,false); 
			

			svc.describeGameServerGroup(params,cb);
		}

		
		service.DescribeGameServerInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GameServerGroupName",params,undefined,false); 
			
			copyArg(msg,"GameServerGroupName",params,undefined,false); 
			copyArg(msg,"InstanceIds",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeGameServerInstances(params,cb);
		}

		
		service.DescribeGameSessionDetails=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"FleetId",params,undefined,false); 
			copyArg(msg,"GameSessionId",params,undefined,false); 
			copyArg(msg,"AliasId",params,undefined,false); 
			copyArg(msg,"Location",params,undefined,false); 
			copyArg(msg,"StatusFilter",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeGameSessionDetails(params,cb);
		}

		
		service.DescribeGameSessionPlacement=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PlacementId",params,undefined,false); 
			
			copyArg(msg,"PlacementId",params,undefined,false); 
			

			svc.describeGameSessionPlacement(params,cb);
		}

		
		service.DescribeGameSessionQueues=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Names",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeGameSessionQueues(params,cb);
		}

		
		service.DescribeGameSessions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"FleetId",params,undefined,false); 
			copyArg(msg,"GameSessionId",params,undefined,false); 
			copyArg(msg,"AliasId",params,undefined,false); 
			copyArg(msg,"Location",params,undefined,false); 
			copyArg(msg,"StatusFilter",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeGameSessions(params,cb);
		}

		
		service.DescribeInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetId",params,undefined,false); 
			
			copyArg(msg,"FleetId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Location",params,undefined,false); 
			

			svc.describeInstances(params,cb);
		}

		
		service.DescribeMatchmaking=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TicketIds",params,undefined,false); 
			
			copyArg(msg,"TicketIds",params,undefined,false); 
			

			svc.describeMatchmaking(params,cb);
		}

		
		service.DescribeMatchmakingConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Names",params,undefined,false); 
			copyArg(msg,"RuleSetName",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeMatchmakingConfigurations(params,cb);
		}

		
		service.DescribeMatchmakingRuleSets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Names",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeMatchmakingRuleSets(params,cb);
		}

		
		service.DescribePlayerSessions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"GameSessionId",params,undefined,false); 
			copyArg(msg,"PlayerId",params,undefined,false); 
			copyArg(msg,"PlayerSessionId",params,undefined,false); 
			copyArg(msg,"PlayerSessionStatusFilter",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describePlayerSessions(params,cb);
		}

		
		service.DescribeRuntimeConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetId",params,undefined,false); 
			
			copyArg(msg,"FleetId",params,undefined,false); 
			

			svc.describeRuntimeConfiguration(params,cb);
		}

		
		service.DescribeScalingPolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetId",params,undefined,false); 
			
			copyArg(msg,"FleetId",params,undefined,false); 
			copyArg(msg,"StatusFilter",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Location",params,undefined,false); 
			

			svc.describeScalingPolicies(params,cb);
		}

		
		service.DescribeScript=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ScriptId",params,undefined,false); 
			
			copyArg(msg,"ScriptId",params,undefined,false); 
			

			svc.describeScript(params,cb);
		}

		
		service.DescribeVpcPeeringAuthorizations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeVpcPeeringAuthorizations(params,cb);
		}

		
		service.DescribeVpcPeeringConnections=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"FleetId",params,undefined,false); 
			

			svc.describeVpcPeeringConnections(params,cb);
		}

		
		service.GetGameSessionLogUrl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GameSessionId",params,undefined,false); 
			
			copyArg(msg,"GameSessionId",params,undefined,false); 
			

			svc.getGameSessionLogUrl(params,cb);
		}

		
		service.GetInstanceAccess=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetId",params,undefined,false); 
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"FleetId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.getInstanceAccess(params,cb);
		}

		
		service.ListAliases=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"RoutingStrategyType",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listAliases(params,cb);
		}

		
		service.ListBuilds=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Status",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listBuilds(params,cb);
		}

		
		service.ListFleets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"BuildId",params,undefined,false); 
			copyArg(msg,"ScriptId",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listFleets(params,cb);
		}

		
		service.ListGameServerGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listGameServerGroups(params,cb);
		}

		
		service.ListGameServers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GameServerGroupName",params,undefined,false); 
			
			copyArg(msg,"GameServerGroupName",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listGameServers(params,cb);
		}

		
		service.ListScripts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listScripts(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutScalingPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"FleetId",params,undefined,false); 
			copyArg(n,"MetricName",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"FleetId",params,undefined,false); 
			copyArg(msg,"ScalingAdjustment",params,undefined,false); 
			copyArg(msg,"ScalingAdjustmentType",params,undefined,false); 
			copyArg(msg,"Threshold",params,undefined,false); 
			copyArg(msg,"ComparisonOperator",params,undefined,false); 
			copyArg(msg,"EvaluationPeriods",params,undefined,false); 
			copyArg(msg,"MetricName",params,undefined,false); 
			copyArg(msg,"PolicyType",params,undefined,false); 
			copyArg(msg,"TargetConfiguration",params,undefined,true); 
			

			svc.putScalingPolicy(params,cb);
		}

		
		service.RegisterGameServer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GameServerGroupName",params,undefined,false); 
			copyArg(n,"GameServerId",params,undefined,false); 
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"GameServerGroupName",params,undefined,false); 
			copyArg(msg,"GameServerId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"ConnectionInfo",params,undefined,false); 
			copyArg(msg,"GameServerData",params,undefined,false); 
			

			svc.registerGameServer(params,cb);
		}

		
		service.RequestUploadCredentials=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BuildId",params,undefined,false); 
			
			copyArg(msg,"BuildId",params,undefined,false); 
			

			svc.requestUploadCredentials(params,cb);
		}

		
		service.ResolveAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AliasId",params,undefined,false); 
			
			copyArg(msg,"AliasId",params,undefined,false); 
			

			svc.resolveAlias(params,cb);
		}

		
		service.ResumeGameServerGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GameServerGroupName",params,undefined,false); 
			copyArg(n,"ResumeActions",params,undefined,true); 
			
			copyArg(msg,"GameServerGroupName",params,undefined,false); 
			copyArg(msg,"ResumeActions",params,undefined,true); 
			

			svc.resumeGameServerGroup(params,cb);
		}

		
		service.SearchGameSessions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"FleetId",params,undefined,false); 
			copyArg(msg,"AliasId",params,undefined,false); 
			copyArg(msg,"Location",params,undefined,false); 
			copyArg(msg,"FilterExpression",params,undefined,false); 
			copyArg(msg,"SortExpression",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.searchGameSessions(params,cb);
		}

		
		service.StartFleetActions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetId",params,undefined,false); 
			copyArg(n,"Actions",params,undefined,true); 
			
			copyArg(msg,"FleetId",params,undefined,false); 
			copyArg(msg,"Actions",params,undefined,true); 
			copyArg(msg,"Location",params,undefined,false); 
			

			svc.startFleetActions(params,cb);
		}

		
		service.StartGameSessionPlacement=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PlacementId",params,undefined,false); 
			copyArg(n,"GameSessionQueueName",params,undefined,false); 
			copyArg(n,"MaximumPlayerSessionCount",params,undefined,false); 
			
			copyArg(msg,"PlacementId",params,undefined,false); 
			copyArg(msg,"GameSessionQueueName",params,undefined,false); 
			copyArg(msg,"GameProperties",params,undefined,true); 
			copyArg(msg,"MaximumPlayerSessionCount",params,undefined,false); 
			copyArg(msg,"GameSessionName",params,undefined,false); 
			copyArg(msg,"PlayerLatencies",params,undefined,true); 
			copyArg(msg,"DesiredPlayerSessions",params,undefined,false); 
			copyArg(msg,"GameSessionData",params,undefined,false); 
			

			svc.startGameSessionPlacement(params,cb);
		}

		
		service.StartMatchBackfill=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationName",params,undefined,false); 
			copyArg(n,"Players",params,undefined,true); 
			
			copyArg(msg,"TicketId",params,undefined,false); 
			copyArg(msg,"ConfigurationName",params,undefined,false); 
			copyArg(msg,"GameSessionArn",params,undefined,false); 
			copyArg(msg,"Players",params,undefined,true); 
			

			svc.startMatchBackfill(params,cb);
		}

		
		service.StartMatchmaking=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationName",params,undefined,false); 
			copyArg(n,"Players",params,undefined,true); 
			
			copyArg(msg,"TicketId",params,undefined,false); 
			copyArg(msg,"ConfigurationName",params,undefined,false); 
			copyArg(msg,"Players",params,undefined,true); 
			

			svc.startMatchmaking(params,cb);
		}

		
		service.StopFleetActions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetId",params,undefined,false); 
			copyArg(n,"Actions",params,undefined,true); 
			
			copyArg(msg,"FleetId",params,undefined,false); 
			copyArg(msg,"Actions",params,undefined,true); 
			copyArg(msg,"Location",params,undefined,false); 
			

			svc.stopFleetActions(params,cb);
		}

		
		service.StopGameSessionPlacement=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PlacementId",params,undefined,false); 
			
			copyArg(msg,"PlacementId",params,undefined,false); 
			

			svc.stopGameSessionPlacement(params,cb);
		}

		
		service.StopMatchmaking=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TicketId",params,undefined,false); 
			
			copyArg(msg,"TicketId",params,undefined,false); 
			

			svc.stopMatchmaking(params,cb);
		}

		
		service.SuspendGameServerGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GameServerGroupName",params,undefined,false); 
			copyArg(n,"SuspendActions",params,undefined,true); 
			
			copyArg(msg,"GameServerGroupName",params,undefined,false); 
			copyArg(msg,"SuspendActions",params,undefined,true); 
			

			svc.suspendGameServerGroup(params,cb);
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

		
		service.UpdateAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AliasId",params,undefined,false); 
			
			copyArg(msg,"AliasId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"RoutingStrategy",params,undefined,true); 
			

			svc.updateAlias(params,cb);
		}

		
		service.UpdateBuild=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BuildId",params,undefined,false); 
			
			copyArg(msg,"BuildId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Version",params,undefined,false); 
			

			svc.updateBuild(params,cb);
		}

		
		service.UpdateFleetAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetId",params,undefined,false); 
			
			copyArg(msg,"FleetId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"NewGameSessionProtectionPolicy",params,undefined,false); 
			copyArg(msg,"ResourceCreationLimitPolicy",params,undefined,true); 
			copyArg(msg,"MetricGroups",params,undefined,true); 
			

			svc.updateFleetAttributes(params,cb);
		}

		
		service.UpdateFleetCapacity=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetId",params,undefined,false); 
			
			copyArg(msg,"FleetId",params,undefined,false); 
			copyArg(msg,"DesiredInstances",params,undefined,false); 
			copyArg(msg,"MinSize",params,undefined,false); 
			copyArg(msg,"MaxSize",params,undefined,false); 
			copyArg(msg,"Location",params,undefined,false); 
			

			svc.updateFleetCapacity(params,cb);
		}

		
		service.UpdateFleetPortSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetId",params,undefined,false); 
			
			copyArg(msg,"FleetId",params,undefined,false); 
			copyArg(msg,"InboundPermissionAuthorizations",params,undefined,true); 
			copyArg(msg,"InboundPermissionRevocations",params,undefined,true); 
			

			svc.updateFleetPortSettings(params,cb);
		}

		
		service.UpdateGameServer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GameServerGroupName",params,undefined,false); 
			copyArg(n,"GameServerId",params,undefined,false); 
			
			copyArg(msg,"GameServerGroupName",params,undefined,false); 
			copyArg(msg,"GameServerId",params,undefined,false); 
			copyArg(msg,"GameServerData",params,undefined,false); 
			copyArg(msg,"UtilizationStatus",params,undefined,false); 
			copyArg(msg,"HealthCheck",params,undefined,false); 
			

			svc.updateGameServer(params,cb);
		}

		
		service.UpdateGameServerGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GameServerGroupName",params,undefined,false); 
			
			copyArg(msg,"GameServerGroupName",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"InstanceDefinitions",params,undefined,true); 
			copyArg(msg,"GameServerProtectionPolicy",params,undefined,false); 
			copyArg(msg,"BalancingStrategy",params,undefined,false); 
			

			svc.updateGameServerGroup(params,cb);
		}

		
		service.UpdateGameSession=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GameSessionId",params,undefined,false); 
			
			copyArg(msg,"GameSessionId",params,undefined,false); 
			copyArg(msg,"MaximumPlayerSessionCount",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"PlayerSessionCreationPolicy",params,undefined,false); 
			copyArg(msg,"ProtectionPolicy",params,undefined,false); 
			

			svc.updateGameSession(params,cb);
		}

		
		service.UpdateGameSessionQueue=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"TimeoutInSeconds",params,undefined,false); 
			copyArg(msg,"PlayerLatencyPolicies",params,undefined,true); 
			copyArg(msg,"Destinations",params,undefined,true); 
			copyArg(msg,"FilterConfiguration",params,undefined,true); 
			copyArg(msg,"PriorityConfiguration",params,undefined,true); 
			copyArg(msg,"CustomEventData",params,undefined,false); 
			copyArg(msg,"NotificationTarget",params,undefined,false); 
			

			svc.updateGameSessionQueue(params,cb);
		}

		
		service.UpdateMatchmakingConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"GameSessionQueueArns",params,undefined,true); 
			copyArg(msg,"RequestTimeoutSeconds",params,undefined,false); 
			copyArg(msg,"AcceptanceTimeoutSeconds",params,undefined,false); 
			copyArg(msg,"AcceptanceRequired",params,undefined,false); 
			copyArg(msg,"RuleSetName",params,undefined,false); 
			copyArg(msg,"NotificationTarget",params,undefined,false); 
			copyArg(msg,"AdditionalPlayerCount",params,undefined,false); 
			copyArg(msg,"CustomEventData",params,undefined,false); 
			copyArg(msg,"GameProperties",params,undefined,true); 
			copyArg(msg,"GameSessionData",params,undefined,false); 
			copyArg(msg,"BackfillMode",params,undefined,false); 
			copyArg(msg,"FlexMatchMode",params,undefined,false); 
			

			svc.updateMatchmakingConfiguration(params,cb);
		}

		
		service.UpdateRuntimeConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetId",params,undefined,false); 
			copyArg(n,"RuntimeConfiguration",params,undefined,true); 
			
			copyArg(msg,"FleetId",params,undefined,false); 
			copyArg(msg,"RuntimeConfiguration",params,undefined,true); 
			

			svc.updateRuntimeConfiguration(params,cb);
		}

		
		service.UpdateScript=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ScriptId",params,undefined,false); 
			
			copyArg(msg,"ScriptId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Version",params,undefined,false); 
			copyArg(msg,"StorageLocation",params,undefined,true); 
			copyArg(msg,"ZipFile",params,undefined,false); 
			

			svc.updateScript(params,cb);
		}

		
		service.ValidateMatchmakingRuleSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RuleSetBody",params,undefined,false); 
			
			copyArg(msg,"RuleSetBody",params,undefined,false); 
			

			svc.validateMatchmakingRuleSet(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS GameLift", AmazonAPINode);

};
