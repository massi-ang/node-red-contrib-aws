
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

		var awsService = new AWS.Route53( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Route53(msg.AWSConfig) : awsService;

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

		
		service.ActivateKeySigningKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"HostedZoneId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.activateKeySigningKey(params,cb);
		}

		
		service.AssociateVPCWithHostedZone=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"VPC",params,undefined,true); 
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"VPC",params,undefined,true); 
			copyArgs(n,"Comment",params,undefined,false); 
			
			copyArgs(msg,"HostedZoneId",params,undefined,false); 
			copyArgs(msg,"VPC",params,undefined,true); 
			copyArgs(msg,"Comment",params,undefined,false); 
			

			svc.associateVPCWithHostedZone(params,cb);
		}

		
		service.ChangeResourceRecordSets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"ChangeBatch",params,undefined,false); 
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"ChangeBatch",params,undefined,false); 
			
			copyArgs(msg,"HostedZoneId",params,undefined,false); 
			copyArgs(msg,"ChangeBatch",params,undefined,false); 
			

			svc.changeResourceRecordSets(params,cb);
		}

		
		service.ChangeTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"AddTags",params,undefined,true); 
			copyArgs(n,"RemoveTagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceType",params,undefined,false); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"AddTags",params,undefined,true); 
			copyArgs(msg,"RemoveTagKeys",params,undefined,false); 
			

			svc.changeTagsForResource(params,cb);
		}

		
		service.CreateHealthCheck=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CallerReference",params,undefined,false); 
			copyArgs(n,"HealthCheckConfig",params,undefined,true); 
			
			copyArgs(n,"CallerReference",params,undefined,false); 
			copyArgs(n,"HealthCheckConfig",params,undefined,true); 
			
			copyArgs(msg,"CallerReference",params,undefined,false); 
			copyArgs(msg,"HealthCheckConfig",params,undefined,true); 
			

			svc.createHealthCheck(params,cb);
		}

		
		service.CreateHostedZone=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"CallerReference",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"VPC",params,undefined,true); 
			copyArgs(n,"CallerReference",params,undefined,false); 
			copyArgs(n,"HostedZoneConfig",params,undefined,true); 
			copyArgs(n,"DelegationSetId",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"VPC",params,undefined,true); 
			copyArgs(msg,"CallerReference",params,undefined,false); 
			copyArgs(msg,"HostedZoneConfig",params,undefined,true); 
			copyArgs(msg,"DelegationSetId",params,undefined,false); 
			

			svc.createHostedZone(params,cb);
		}

		
		service.CreateKeySigningKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CallerReference",params,undefined,false); 
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"KeyManagementServiceArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(n,"CallerReference",params,undefined,false); 
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"KeyManagementServiceArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(msg,"CallerReference",params,undefined,false); 
			copyArgs(msg,"HostedZoneId",params,undefined,false); 
			copyArgs(msg,"KeyManagementServiceArn",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			

			svc.createKeySigningKey(params,cb);
		}

		
		service.CreateQueryLoggingConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"CloudWatchLogsLogGroupArn",params,undefined,false); 
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"CloudWatchLogsLogGroupArn",params,undefined,false); 
			
			copyArgs(msg,"HostedZoneId",params,undefined,false); 
			copyArgs(msg,"CloudWatchLogsLogGroupArn",params,undefined,false); 
			

			svc.createQueryLoggingConfig(params,cb);
		}

		
		service.CreateReusableDelegationSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CallerReference",params,undefined,false); 
			
			copyArgs(n,"CallerReference",params,undefined,false); 
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			
			copyArgs(msg,"CallerReference",params,undefined,false); 
			copyArgs(msg,"HostedZoneId",params,undefined,false); 
			

			svc.createReusableDelegationSet(params,cb);
		}

		
		service.CreateTrafficPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Document",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Document",params,undefined,false); 
			copyArgs(n,"Comment",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Document",params,undefined,false); 
			copyArgs(msg,"Comment",params,undefined,false); 
			

			svc.createTrafficPolicy(params,cb);
		}

		
		service.CreateTrafficPolicyInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"TTL",params,undefined,false); 
			copyArgs(n,"TrafficPolicyId",params,undefined,false); 
			copyArgs(n,"TrafficPolicyVersion",params,undefined,false); 
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"TTL",params,undefined,false); 
			copyArgs(n,"TrafficPolicyId",params,undefined,false); 
			copyArgs(n,"TrafficPolicyVersion",params,undefined,false); 
			
			copyArgs(msg,"HostedZoneId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"TTL",params,undefined,false); 
			copyArgs(msg,"TrafficPolicyId",params,undefined,false); 
			copyArgs(msg,"TrafficPolicyVersion",params,undefined,false); 
			

			svc.createTrafficPolicyInstance(params,cb);
		}

		
		service.CreateTrafficPolicyVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Document",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Document",params,undefined,false); 
			copyArgs(n,"Comment",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"Document",params,undefined,false); 
			copyArgs(msg,"Comment",params,undefined,false); 
			

			svc.createTrafficPolicyVersion(params,cb);
		}

		
		service.CreateVPCAssociationAuthorization=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"VPC",params,undefined,true); 
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"VPC",params,undefined,true); 
			
			copyArgs(msg,"HostedZoneId",params,undefined,false); 
			copyArgs(msg,"VPC",params,undefined,true); 
			

			svc.createVPCAssociationAuthorization(params,cb);
		}

		
		service.DeactivateKeySigningKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"HostedZoneId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deactivateKeySigningKey(params,cb);
		}

		
		service.DeleteHealthCheck=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HealthCheckId",params,undefined,false); 
			
			copyArgs(n,"HealthCheckId",params,undefined,false); 
			
			copyArgs(msg,"HealthCheckId",params,undefined,false); 
			

			svc.deleteHealthCheck(params,cb);
		}

		
		service.DeleteHostedZone=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.deleteHostedZone(params,cb);
		}

		
		service.DeleteKeySigningKey=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"HostedZoneId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteKeySigningKey(params,cb);
		}

		
		service.DeleteQueryLoggingConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.deleteQueryLoggingConfig(params,cb);
		}

		
		service.DeleteReusableDelegationSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.deleteReusableDelegationSet(params,cb);
		}

		
		service.DeleteTrafficPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			

			svc.deleteTrafficPolicy(params,cb);
		}

		
		service.DeleteTrafficPolicyInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.deleteTrafficPolicyInstance(params,cb);
		}

		
		service.DeleteVPCAssociationAuthorization=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"VPC",params,undefined,true); 
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"VPC",params,undefined,true); 
			
			copyArgs(msg,"HostedZoneId",params,undefined,false); 
			copyArgs(msg,"VPC",params,undefined,true); 
			

			svc.deleteVPCAssociationAuthorization(params,cb);
		}

		
		service.DisableHostedZoneDNSSEC=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			
			copyArgs(msg,"HostedZoneId",params,undefined,false); 
			

			svc.disableHostedZoneDNSSEC(params,cb);
		}

		
		service.DisassociateVPCFromHostedZone=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"VPC",params,undefined,true); 
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"VPC",params,undefined,true); 
			copyArgs(n,"Comment",params,undefined,false); 
			
			copyArgs(msg,"HostedZoneId",params,undefined,false); 
			copyArgs(msg,"VPC",params,undefined,true); 
			copyArgs(msg,"Comment",params,undefined,false); 
			

			svc.disassociateVPCFromHostedZone(params,cb);
		}

		
		service.EnableHostedZoneDNSSEC=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			
			copyArgs(msg,"HostedZoneId",params,undefined,false); 
			

			svc.enableHostedZoneDNSSEC(params,cb);
		}

		
		service.GetAccountLimit=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(msg,"Type",params,undefined,false); 
			

			svc.getAccountLimit(params,cb);
		}

		
		service.GetChange=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getChange(params,cb);
		}

		
		service.GetCheckerIpRanges=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getCheckerIpRanges(params,cb);
		}

		
		service.GetDNSSEC=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			
			copyArgs(msg,"HostedZoneId",params,undefined,false); 
			

			svc.getDNSSEC(params,cb);
		}

		
		service.GetGeoLocation=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ContinentCode",params,undefined,false); 
			copyArgs(n,"CountryCode",params,undefined,false); 
			copyArgs(n,"SubdivisionCode",params,undefined,false); 
			
			copyArgs(msg,"ContinentCode",params,undefined,false); 
			copyArgs(msg,"CountryCode",params,undefined,false); 
			copyArgs(msg,"SubdivisionCode",params,undefined,false); 
			

			svc.getGeoLocation(params,cb);
		}

		
		service.GetHealthCheck=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HealthCheckId",params,undefined,false); 
			
			copyArgs(n,"HealthCheckId",params,undefined,false); 
			
			copyArgs(msg,"HealthCheckId",params,undefined,false); 
			

			svc.getHealthCheck(params,cb);
		}

		
		service.GetHealthCheckCount=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getHealthCheckCount(params,cb);
		}

		
		service.GetHealthCheckLastFailureReason=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HealthCheckId",params,undefined,false); 
			
			copyArgs(n,"HealthCheckId",params,undefined,false); 
			
			copyArgs(msg,"HealthCheckId",params,undefined,false); 
			

			svc.getHealthCheckLastFailureReason(params,cb);
		}

		
		service.GetHealthCheckStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HealthCheckId",params,undefined,false); 
			
			copyArgs(n,"HealthCheckId",params,undefined,false); 
			
			copyArgs(msg,"HealthCheckId",params,undefined,false); 
			

			svc.getHealthCheckStatus(params,cb);
		}

		
		service.GetHostedZone=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getHostedZone(params,cb);
		}

		
		service.GetHostedZoneCount=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getHostedZoneCount(params,cb);
		}

		
		service.GetHostedZoneLimit=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"HostedZoneId",params,undefined,false); 
			

			svc.getHostedZoneLimit(params,cb);
		}

		
		service.GetQueryLoggingConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getQueryLoggingConfig(params,cb);
		}

		
		service.GetReusableDelegationSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getReusableDelegationSet(params,cb);
		}

		
		service.GetReusableDelegationSetLimit=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"DelegationSetId",params,undefined,false); 
			
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"DelegationSetId",params,undefined,false); 
			
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"DelegationSetId",params,undefined,false); 
			

			svc.getReusableDelegationSetLimit(params,cb);
		}

		
		service.GetTrafficPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			

			svc.getTrafficPolicy(params,cb);
		}

		
		service.GetTrafficPolicyInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getTrafficPolicyInstance(params,cb);
		}

		
		service.GetTrafficPolicyInstanceCount=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getTrafficPolicyInstanceCount(params,cb);
		}

		
		service.ListGeoLocations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"StartContinentCode",params,undefined,false); 
			copyArgs(n,"StartCountryCode",params,undefined,false); 
			copyArgs(n,"StartSubdivisionCode",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"StartContinentCode",params,undefined,false); 
			copyArgs(msg,"StartCountryCode",params,undefined,false); 
			copyArgs(msg,"StartSubdivisionCode",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listGeoLocations(params,cb);
		}

		
		service.ListHealthChecks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listHealthChecks(params,cb);
		}

		
		service.ListHostedZones=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			copyArgs(n,"DelegationSetId",params,undefined,false); 
			
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			copyArgs(msg,"DelegationSetId",params,undefined,false); 
			

			svc.listHostedZones(params,cb);
		}

		
		service.ListHostedZonesByName=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DNSName",params,undefined,false); 
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"DNSName",params,undefined,false); 
			copyArgs(msg,"HostedZoneId",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listHostedZonesByName(params,cb);
		}

		
		service.ListHostedZonesByVPC=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VPCId",params,undefined,false); 
			copyArgs(n,"VPCRegion",params,undefined,false); 
			
			copyArgs(n,"VPCId",params,undefined,false); 
			copyArgs(n,"VPCRegion",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"VPCId",params,undefined,false); 
			copyArgs(msg,"VPCRegion",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listHostedZonesByVPC(params,cb);
		}

		
		service.ListQueryLoggingConfigs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"HostedZoneId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listQueryLoggingConfigs(params,cb);
		}

		
		service.ListResourceRecordSets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"StartRecordName",params,undefined,false); 
			copyArgs(n,"StartRecordType",params,undefined,false); 
			copyArgs(n,"StartRecordIdentifier",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"HostedZoneId",params,undefined,false); 
			copyArgs(msg,"StartRecordName",params,undefined,false); 
			copyArgs(msg,"StartRecordType",params,undefined,false); 
			copyArgs(msg,"StartRecordIdentifier",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listResourceRecordSets(params,cb);
		}

		
		service.ListReusableDelegationSets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listReusableDelegationSets(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(msg,"ResourceType",params,undefined,false); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListTagsForResources=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"ResourceIds",params,undefined,false); 
			
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"ResourceIds",params,undefined,false); 
			
			copyArgs(msg,"ResourceType",params,undefined,false); 
			copyArgs(msg,"ResourceIds",params,undefined,false); 
			

			svc.listTagsForResources(params,cb);
		}

		
		service.ListTrafficPolicies=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TrafficPolicyIdMarker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"TrafficPolicyIdMarker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listTrafficPolicies(params,cb);
		}

		
		service.ListTrafficPolicyInstances=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"HostedZoneIdMarker",params,undefined,false); 
			copyArgs(n,"TrafficPolicyInstanceNameMarker",params,undefined,false); 
			copyArgs(n,"TrafficPolicyInstanceTypeMarker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"HostedZoneIdMarker",params,undefined,false); 
			copyArgs(msg,"TrafficPolicyInstanceNameMarker",params,undefined,false); 
			copyArgs(msg,"TrafficPolicyInstanceTypeMarker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listTrafficPolicyInstances(params,cb);
		}

		
		service.ListTrafficPolicyInstancesByHostedZone=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"TrafficPolicyInstanceNameMarker",params,undefined,false); 
			copyArgs(n,"TrafficPolicyInstanceTypeMarker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"HostedZoneId",params,undefined,false); 
			copyArgs(msg,"TrafficPolicyInstanceNameMarker",params,undefined,false); 
			copyArgs(msg,"TrafficPolicyInstanceTypeMarker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listTrafficPolicyInstancesByHostedZone(params,cb);
		}

		
		service.ListTrafficPolicyInstancesByPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrafficPolicyId",params,undefined,false); 
			copyArgs(n,"TrafficPolicyVersion",params,undefined,false); 
			
			copyArgs(n,"TrafficPolicyId",params,undefined,false); 
			copyArgs(n,"TrafficPolicyVersion",params,undefined,false); 
			copyArgs(n,"HostedZoneIdMarker",params,undefined,false); 
			copyArgs(n,"TrafficPolicyInstanceNameMarker",params,undefined,false); 
			copyArgs(n,"TrafficPolicyInstanceTypeMarker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"TrafficPolicyId",params,undefined,false); 
			copyArgs(msg,"TrafficPolicyVersion",params,undefined,false); 
			copyArgs(msg,"HostedZoneIdMarker",params,undefined,false); 
			copyArgs(msg,"TrafficPolicyInstanceNameMarker",params,undefined,false); 
			copyArgs(msg,"TrafficPolicyInstanceTypeMarker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listTrafficPolicyInstancesByPolicy(params,cb);
		}

		
		service.ListTrafficPolicyVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"TrafficPolicyVersionMarker",params,undefined,false); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"TrafficPolicyVersionMarker",params,undefined,false); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.listTrafficPolicyVersions(params,cb);
		}

		
		service.ListVPCAssociationAuthorizations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"HostedZoneId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listVPCAssociationAuthorizations(params,cb);
		}

		
		service.TestDNSAnswer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"RecordName",params,undefined,false); 
			copyArgs(n,"RecordType",params,undefined,false); 
			
			copyArgs(n,"HostedZoneId",params,undefined,false); 
			copyArgs(n,"RecordName",params,undefined,false); 
			copyArgs(n,"RecordType",params,undefined,false); 
			copyArgs(n,"ResolverIP",params,undefined,false); 
			copyArgs(n,"EDNS0ClientSubnetIP",params,undefined,false); 
			copyArgs(n,"EDNS0ClientSubnetMask",params,undefined,false); 
			
			copyArgs(msg,"HostedZoneId",params,undefined,false); 
			copyArgs(msg,"RecordName",params,undefined,false); 
			copyArgs(msg,"RecordType",params,undefined,false); 
			copyArgs(msg,"ResolverIP",params,undefined,false); 
			copyArgs(msg,"EDNS0ClientSubnetIP",params,undefined,false); 
			copyArgs(msg,"EDNS0ClientSubnetMask",params,undefined,false); 
			

			svc.testDNSAnswer(params,cb);
		}

		
		service.UpdateHealthCheck=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HealthCheckId",params,undefined,false); 
			
			copyArgs(n,"HealthCheckId",params,undefined,false); 
			copyArgs(n,"HealthCheckVersion",params,undefined,false); 
			copyArgs(n,"IPAddress",params,undefined,false); 
			copyArgs(n,"Port",params,undefined,false); 
			copyArgs(n,"ResourcePath",params,undefined,false); 
			copyArgs(n,"FullyQualifiedDomainName",params,undefined,false); 
			copyArgs(n,"SearchString",params,undefined,false); 
			copyArgs(n,"FailureThreshold",params,undefined,false); 
			copyArgs(n,"Inverted",params,undefined,false); 
			copyArgs(n,"Disabled",params,undefined,false); 
			copyArgs(n,"HealthThreshold",params,undefined,false); 
			copyArgs(n,"ChildHealthChecks",params,undefined,true); 
			copyArgs(n,"EnableSNI",params,undefined,false); 
			copyArgs(n,"Regions",params,undefined,true); 
			copyArgs(n,"AlarmIdentifier",params,undefined,true); 
			copyArgs(n,"InsufficientDataHealthStatus",params,undefined,false); 
			copyArgs(n,"ResetElements",params,undefined,false); 
			
			copyArgs(msg,"HealthCheckId",params,undefined,false); 
			copyArgs(msg,"HealthCheckVersion",params,undefined,false); 
			copyArgs(msg,"IPAddress",params,undefined,false); 
			copyArgs(msg,"Port",params,undefined,false); 
			copyArgs(msg,"ResourcePath",params,undefined,false); 
			copyArgs(msg,"FullyQualifiedDomainName",params,undefined,false); 
			copyArgs(msg,"SearchString",params,undefined,false); 
			copyArgs(msg,"FailureThreshold",params,undefined,false); 
			copyArgs(msg,"Inverted",params,undefined,false); 
			copyArgs(msg,"Disabled",params,undefined,false); 
			copyArgs(msg,"HealthThreshold",params,undefined,false); 
			copyArgs(msg,"ChildHealthChecks",params,undefined,true); 
			copyArgs(msg,"EnableSNI",params,undefined,false); 
			copyArgs(msg,"Regions",params,undefined,true); 
			copyArgs(msg,"AlarmIdentifier",params,undefined,true); 
			copyArgs(msg,"InsufficientDataHealthStatus",params,undefined,false); 
			copyArgs(msg,"ResetElements",params,undefined,false); 
			

			svc.updateHealthCheck(params,cb);
		}

		
		service.UpdateHostedZoneComment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Comment",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"Comment",params,undefined,false); 
			

			svc.updateHostedZoneComment(params,cb);
		}

		
		service.UpdateTrafficPolicyComment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			copyArgs(n,"Comment",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			copyArgs(n,"Comment",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			copyArgs(msg,"Comment",params,undefined,false); 
			

			svc.updateTrafficPolicyComment(params,cb);
		}

		
		service.UpdateTrafficPolicyInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"TTL",params,undefined,false); 
			copyArgs(n,"TrafficPolicyId",params,undefined,false); 
			copyArgs(n,"TrafficPolicyVersion",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"TTL",params,undefined,false); 
			copyArgs(n,"TrafficPolicyId",params,undefined,false); 
			copyArgs(n,"TrafficPolicyVersion",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"TTL",params,undefined,false); 
			copyArgs(msg,"TrafficPolicyId",params,undefined,false); 
			copyArgs(msg,"TrafficPolicyVersion",params,undefined,false); 
			

			svc.updateTrafficPolicyInstance(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Route53", AmazonAPINode);

};
