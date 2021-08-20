
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

		var awsService = new AWS.Route53( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Route53(msg.AWSConfig) : awsService;

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

		
		service.ActivateKeySigningKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HostedZoneId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"HostedZoneId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.activateKeySigningKey(params,cb);
		}

		
		service.AssociateVPCWithHostedZone=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HostedZoneId",params,undefined,false); 
			copyArg(n,"VPC",params,undefined,true); 
			
			copyArg(msg,"HostedZoneId",params,undefined,false); 
			copyArg(msg,"VPC",params,undefined,true); 
			copyArg(msg,"Comment",params,undefined,false); 
			

			svc.associateVPCWithHostedZone(params,cb);
		}

		
		service.ChangeResourceRecordSets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HostedZoneId",params,undefined,false); 
			copyArg(n,"ChangeBatch",params,undefined,false); 
			
			copyArg(msg,"HostedZoneId",params,undefined,false); 
			copyArg(msg,"ChangeBatch",params,undefined,false); 
			

			svc.changeResourceRecordSets(params,cb);
		}

		
		service.ChangeTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceType",params,undefined,false); 
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"ResourceType",params,undefined,false); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"AddTags",params,undefined,true); 
			copyArg(msg,"RemoveTagKeys",params,undefined,false); 
			

			svc.changeTagsForResource(params,cb);
		}

		
		service.CreateHealthCheck=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CallerReference",params,undefined,false); 
			copyArg(n,"HealthCheckConfig",params,undefined,true); 
			
			copyArg(msg,"CallerReference",params,undefined,false); 
			copyArg(msg,"HealthCheckConfig",params,undefined,true); 
			

			svc.createHealthCheck(params,cb);
		}

		
		service.CreateHostedZone=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"CallerReference",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"VPC",params,undefined,true); 
			copyArg(msg,"CallerReference",params,undefined,false); 
			copyArg(msg,"HostedZoneConfig",params,undefined,true); 
			copyArg(msg,"DelegationSetId",params,undefined,false); 
			

			svc.createHostedZone(params,cb);
		}

		
		service.CreateKeySigningKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CallerReference",params,undefined,false); 
			copyArg(n,"HostedZoneId",params,undefined,false); 
			copyArg(n,"KeyManagementServiceArn",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Status",params,undefined,false); 
			
			copyArg(msg,"CallerReference",params,undefined,false); 
			copyArg(msg,"HostedZoneId",params,undefined,false); 
			copyArg(msg,"KeyManagementServiceArn",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			

			svc.createKeySigningKey(params,cb);
		}

		
		service.CreateQueryLoggingConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HostedZoneId",params,undefined,false); 
			copyArg(n,"CloudWatchLogsLogGroupArn",params,undefined,false); 
			
			copyArg(msg,"HostedZoneId",params,undefined,false); 
			copyArg(msg,"CloudWatchLogsLogGroupArn",params,undefined,false); 
			

			svc.createQueryLoggingConfig(params,cb);
		}

		
		service.CreateReusableDelegationSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CallerReference",params,undefined,false); 
			
			copyArg(msg,"CallerReference",params,undefined,false); 
			copyArg(msg,"HostedZoneId",params,undefined,false); 
			

			svc.createReusableDelegationSet(params,cb);
		}

		
		service.CreateTrafficPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Document",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Document",params,undefined,false); 
			copyArg(msg,"Comment",params,undefined,false); 
			

			svc.createTrafficPolicy(params,cb);
		}

		
		service.CreateTrafficPolicyInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HostedZoneId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"TTL",params,undefined,false); 
			copyArg(n,"TrafficPolicyId",params,undefined,false); 
			copyArg(n,"TrafficPolicyVersion",params,undefined,false); 
			
			copyArg(msg,"HostedZoneId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"TTL",params,undefined,false); 
			copyArg(msg,"TrafficPolicyId",params,undefined,false); 
			copyArg(msg,"TrafficPolicyVersion",params,undefined,false); 
			

			svc.createTrafficPolicyInstance(params,cb);
		}

		
		service.CreateTrafficPolicyVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"Document",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"Document",params,undefined,false); 
			copyArg(msg,"Comment",params,undefined,false); 
			

			svc.createTrafficPolicyVersion(params,cb);
		}

		
		service.CreateVPCAssociationAuthorization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HostedZoneId",params,undefined,false); 
			copyArg(n,"VPC",params,undefined,true); 
			
			copyArg(msg,"HostedZoneId",params,undefined,false); 
			copyArg(msg,"VPC",params,undefined,true); 
			

			svc.createVPCAssociationAuthorization(params,cb);
		}

		
		service.DeactivateKeySigningKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HostedZoneId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"HostedZoneId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deactivateKeySigningKey(params,cb);
		}

		
		service.DeleteHealthCheck=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HealthCheckId",params,undefined,false); 
			
			copyArg(msg,"HealthCheckId",params,undefined,false); 
			

			svc.deleteHealthCheck(params,cb);
		}

		
		service.DeleteHostedZone=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.deleteHostedZone(params,cb);
		}

		
		service.DeleteKeySigningKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HostedZoneId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"HostedZoneId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteKeySigningKey(params,cb);
		}

		
		service.DeleteQueryLoggingConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.deleteQueryLoggingConfig(params,cb);
		}

		
		service.DeleteReusableDelegationSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.deleteReusableDelegationSet(params,cb);
		}

		
		service.DeleteTrafficPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"Version",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"Version",params,undefined,false); 
			

			svc.deleteTrafficPolicy(params,cb);
		}

		
		service.DeleteTrafficPolicyInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.deleteTrafficPolicyInstance(params,cb);
		}

		
		service.DeleteVPCAssociationAuthorization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HostedZoneId",params,undefined,false); 
			copyArg(n,"VPC",params,undefined,true); 
			
			copyArg(msg,"HostedZoneId",params,undefined,false); 
			copyArg(msg,"VPC",params,undefined,true); 
			

			svc.deleteVPCAssociationAuthorization(params,cb);
		}

		
		service.DisableHostedZoneDNSSEC=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HostedZoneId",params,undefined,false); 
			
			copyArg(msg,"HostedZoneId",params,undefined,false); 
			

			svc.disableHostedZoneDNSSEC(params,cb);
		}

		
		service.DisassociateVPCFromHostedZone=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HostedZoneId",params,undefined,false); 
			copyArg(n,"VPC",params,undefined,true); 
			
			copyArg(msg,"HostedZoneId",params,undefined,false); 
			copyArg(msg,"VPC",params,undefined,true); 
			copyArg(msg,"Comment",params,undefined,false); 
			

			svc.disassociateVPCFromHostedZone(params,cb);
		}

		
		service.EnableHostedZoneDNSSEC=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HostedZoneId",params,undefined,false); 
			
			copyArg(msg,"HostedZoneId",params,undefined,false); 
			

			svc.enableHostedZoneDNSSEC(params,cb);
		}

		
		service.GetAccountLimit=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Type",params,undefined,false); 
			
			copyArg(msg,"Type",params,undefined,false); 
			

			svc.getAccountLimit(params,cb);
		}

		
		service.GetChange=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getChange(params,cb);
		}

		
		service.GetCheckerIpRanges=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getCheckerIpRanges(params,cb);
		}

		
		service.GetDNSSEC=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HostedZoneId",params,undefined,false); 
			
			copyArg(msg,"HostedZoneId",params,undefined,false); 
			

			svc.getDNSSEC(params,cb);
		}

		
		service.GetGeoLocation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ContinentCode",params,undefined,false); 
			copyArg(msg,"CountryCode",params,undefined,false); 
			copyArg(msg,"SubdivisionCode",params,undefined,false); 
			

			svc.getGeoLocation(params,cb);
		}

		
		service.GetHealthCheck=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HealthCheckId",params,undefined,false); 
			
			copyArg(msg,"HealthCheckId",params,undefined,false); 
			

			svc.getHealthCheck(params,cb);
		}

		
		service.GetHealthCheckCount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getHealthCheckCount(params,cb);
		}

		
		service.GetHealthCheckLastFailureReason=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HealthCheckId",params,undefined,false); 
			
			copyArg(msg,"HealthCheckId",params,undefined,false); 
			

			svc.getHealthCheckLastFailureReason(params,cb);
		}

		
		service.GetHealthCheckStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HealthCheckId",params,undefined,false); 
			
			copyArg(msg,"HealthCheckId",params,undefined,false); 
			

			svc.getHealthCheckStatus(params,cb);
		}

		
		service.GetHostedZone=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getHostedZone(params,cb);
		}

		
		service.GetHostedZoneCount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getHostedZoneCount(params,cb);
		}

		
		service.GetHostedZoneLimit=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Type",params,undefined,false); 
			copyArg(n,"HostedZoneId",params,undefined,false); 
			
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"HostedZoneId",params,undefined,false); 
			

			svc.getHostedZoneLimit(params,cb);
		}

		
		service.GetQueryLoggingConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getQueryLoggingConfig(params,cb);
		}

		
		service.GetReusableDelegationSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getReusableDelegationSet(params,cb);
		}

		
		service.GetReusableDelegationSetLimit=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Type",params,undefined,false); 
			copyArg(n,"DelegationSetId",params,undefined,false); 
			
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"DelegationSetId",params,undefined,false); 
			

			svc.getReusableDelegationSetLimit(params,cb);
		}

		
		service.GetTrafficPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"Version",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"Version",params,undefined,false); 
			

			svc.getTrafficPolicy(params,cb);
		}

		
		service.GetTrafficPolicyInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getTrafficPolicyInstance(params,cb);
		}

		
		service.GetTrafficPolicyInstanceCount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getTrafficPolicyInstanceCount(params,cb);
		}

		
		service.ListGeoLocations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"StartContinentCode",params,undefined,false); 
			copyArg(msg,"StartCountryCode",params,undefined,false); 
			copyArg(msg,"StartSubdivisionCode",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listGeoLocations(params,cb);
		}

		
		service.ListHealthChecks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listHealthChecks(params,cb);
		}

		
		service.ListHostedZones=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			copyArg(msg,"DelegationSetId",params,undefined,false); 
			

			svc.listHostedZones(params,cb);
		}

		
		service.ListHostedZonesByName=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DNSName",params,undefined,false); 
			copyArg(msg,"HostedZoneId",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listHostedZonesByName(params,cb);
		}

		
		service.ListHostedZonesByVPC=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VPCId",params,undefined,false); 
			copyArg(n,"VPCRegion",params,undefined,false); 
			
			copyArg(msg,"VPCId",params,undefined,false); 
			copyArg(msg,"VPCRegion",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listHostedZonesByVPC(params,cb);
		}

		
		service.ListQueryLoggingConfigs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"HostedZoneId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listQueryLoggingConfigs(params,cb);
		}

		
		service.ListResourceRecordSets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HostedZoneId",params,undefined,false); 
			
			copyArg(msg,"HostedZoneId",params,undefined,false); 
			copyArg(msg,"StartRecordName",params,undefined,false); 
			copyArg(msg,"StartRecordType",params,undefined,false); 
			copyArg(msg,"StartRecordIdentifier",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listResourceRecordSets(params,cb);
		}

		
		service.ListReusableDelegationSets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listReusableDelegationSets(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceType",params,undefined,false); 
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"ResourceType",params,undefined,false); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListTagsForResources=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceType",params,undefined,false); 
			copyArg(n,"ResourceIds",params,undefined,false); 
			
			copyArg(msg,"ResourceType",params,undefined,false); 
			copyArg(msg,"ResourceIds",params,undefined,false); 
			

			svc.listTagsForResources(params,cb);
		}

		
		service.ListTrafficPolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"TrafficPolicyIdMarker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listTrafficPolicies(params,cb);
		}

		
		service.ListTrafficPolicyInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"HostedZoneIdMarker",params,undefined,false); 
			copyArg(msg,"TrafficPolicyInstanceNameMarker",params,undefined,false); 
			copyArg(msg,"TrafficPolicyInstanceTypeMarker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listTrafficPolicyInstances(params,cb);
		}

		
		service.ListTrafficPolicyInstancesByHostedZone=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HostedZoneId",params,undefined,false); 
			
			copyArg(msg,"HostedZoneId",params,undefined,false); 
			copyArg(msg,"TrafficPolicyInstanceNameMarker",params,undefined,false); 
			copyArg(msg,"TrafficPolicyInstanceTypeMarker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listTrafficPolicyInstancesByHostedZone(params,cb);
		}

		
		service.ListTrafficPolicyInstancesByPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TrafficPolicyId",params,undefined,false); 
			copyArg(n,"TrafficPolicyVersion",params,undefined,false); 
			
			copyArg(msg,"TrafficPolicyId",params,undefined,false); 
			copyArg(msg,"TrafficPolicyVersion",params,undefined,false); 
			copyArg(msg,"HostedZoneIdMarker",params,undefined,false); 
			copyArg(msg,"TrafficPolicyInstanceNameMarker",params,undefined,false); 
			copyArg(msg,"TrafficPolicyInstanceTypeMarker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listTrafficPolicyInstancesByPolicy(params,cb);
		}

		
		service.ListTrafficPolicyVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"TrafficPolicyVersionMarker",params,undefined,false); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.listTrafficPolicyVersions(params,cb);
		}

		
		service.ListVPCAssociationAuthorizations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HostedZoneId",params,undefined,false); 
			
			copyArg(msg,"HostedZoneId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listVPCAssociationAuthorizations(params,cb);
		}

		
		service.TestDNSAnswer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HostedZoneId",params,undefined,false); 
			copyArg(n,"RecordName",params,undefined,false); 
			copyArg(n,"RecordType",params,undefined,false); 
			
			copyArg(msg,"HostedZoneId",params,undefined,false); 
			copyArg(msg,"RecordName",params,undefined,false); 
			copyArg(msg,"RecordType",params,undefined,false); 
			copyArg(msg,"ResolverIP",params,undefined,false); 
			copyArg(msg,"EDNS0ClientSubnetIP",params,undefined,false); 
			copyArg(msg,"EDNS0ClientSubnetMask",params,undefined,false); 
			

			svc.testDNSAnswer(params,cb);
		}

		
		service.UpdateHealthCheck=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HealthCheckId",params,undefined,false); 
			
			copyArg(msg,"HealthCheckId",params,undefined,false); 
			copyArg(msg,"HealthCheckVersion",params,undefined,false); 
			copyArg(msg,"IPAddress",params,undefined,false); 
			copyArg(msg,"Port",params,undefined,false); 
			copyArg(msg,"ResourcePath",params,undefined,false); 
			copyArg(msg,"FullyQualifiedDomainName",params,undefined,false); 
			copyArg(msg,"SearchString",params,undefined,false); 
			copyArg(msg,"FailureThreshold",params,undefined,false); 
			copyArg(msg,"Inverted",params,undefined,false); 
			copyArg(msg,"Disabled",params,undefined,false); 
			copyArg(msg,"HealthThreshold",params,undefined,false); 
			copyArg(msg,"ChildHealthChecks",params,undefined,true); 
			copyArg(msg,"EnableSNI",params,undefined,false); 
			copyArg(msg,"Regions",params,undefined,true); 
			copyArg(msg,"AlarmIdentifier",params,undefined,true); 
			copyArg(msg,"InsufficientDataHealthStatus",params,undefined,false); 
			copyArg(msg,"ResetElements",params,undefined,false); 
			

			svc.updateHealthCheck(params,cb);
		}

		
		service.UpdateHostedZoneComment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"Comment",params,undefined,false); 
			

			svc.updateHostedZoneComment(params,cb);
		}

		
		service.UpdateTrafficPolicyComment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"Version",params,undefined,false); 
			copyArg(n,"Comment",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"Version",params,undefined,false); 
			copyArg(msg,"Comment",params,undefined,false); 
			

			svc.updateTrafficPolicyComment(params,cb);
		}

		
		service.UpdateTrafficPolicyInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"TTL",params,undefined,false); 
			copyArg(n,"TrafficPolicyId",params,undefined,false); 
			copyArg(n,"TrafficPolicyVersion",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"TTL",params,undefined,false); 
			copyArg(msg,"TrafficPolicyId",params,undefined,false); 
			copyArg(msg,"TrafficPolicyVersion",params,undefined,false); 
			

			svc.updateTrafficPolicyInstance(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Route53", AmazonAPINode);

};
