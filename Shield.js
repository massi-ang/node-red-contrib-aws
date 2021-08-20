
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

		var awsService = new AWS.Shield( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Shield(msg.AWSConfig) : awsService;

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

		
		service.AssociateDRTLogBucket=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LogBucket",params,undefined,false); 
			
			copyArg(msg,"LogBucket",params,undefined,false); 
			

			svc.associateDRTLogBucket(params,cb);
		}

		
		service.AssociateDRTRole=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RoleArn",params,undefined,false); 
			
			copyArg(msg,"RoleArn",params,undefined,false); 
			

			svc.associateDRTRole(params,cb);
		}

		
		service.AssociateHealthCheck=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProtectionId",params,undefined,false); 
			copyArg(n,"HealthCheckArn",params,undefined,false); 
			
			copyArg(msg,"ProtectionId",params,undefined,false); 
			copyArg(msg,"HealthCheckArn",params,undefined,false); 
			

			svc.associateHealthCheck(params,cb);
		}

		
		service.AssociateProactiveEngagementDetails=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EmergencyContactList",params,undefined,true); 
			
			copyArg(msg,"EmergencyContactList",params,undefined,true); 
			

			svc.associateProactiveEngagementDetails(params,cb);
		}

		
		service.CreateProtection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createProtection(params,cb);
		}

		
		service.CreateProtectionGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProtectionGroupId",params,undefined,false); 
			copyArg(n,"Aggregation",params,undefined,false); 
			copyArg(n,"Pattern",params,undefined,false); 
			
			copyArg(msg,"ProtectionGroupId",params,undefined,false); 
			copyArg(msg,"Aggregation",params,undefined,false); 
			copyArg(msg,"Pattern",params,undefined,false); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			copyArg(msg,"Members",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createProtectionGroup(params,cb);
		}

		
		service.CreateSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.createSubscription(params,cb);
		}

		
		service.DeleteProtection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProtectionId",params,undefined,false); 
			
			copyArg(msg,"ProtectionId",params,undefined,false); 
			

			svc.deleteProtection(params,cb);
		}

		
		service.DeleteProtectionGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProtectionGroupId",params,undefined,false); 
			
			copyArg(msg,"ProtectionGroupId",params,undefined,false); 
			

			svc.deleteProtectionGroup(params,cb);
		}

		
		service.DeleteSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.deleteSubscription(params,cb);
		}

		
		service.DescribeAttack=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AttackId",params,undefined,false); 
			
			copyArg(msg,"AttackId",params,undefined,false); 
			

			svc.describeAttack(params,cb);
		}

		
		service.DescribeAttackStatistics=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeAttackStatistics(params,cb);
		}

		
		service.DescribeDRTAccess=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeDRTAccess(params,cb);
		}

		
		service.DescribeEmergencyContactSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeEmergencyContactSettings(params,cb);
		}

		
		service.DescribeProtection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ProtectionId",params,undefined,false); 
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.describeProtection(params,cb);
		}

		
		service.DescribeProtectionGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProtectionGroupId",params,undefined,false); 
			
			copyArg(msg,"ProtectionGroupId",params,undefined,false); 
			

			svc.describeProtectionGroup(params,cb);
		}

		
		service.DescribeSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeSubscription(params,cb);
		}

		
		service.DisableProactiveEngagement=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.disableProactiveEngagement(params,cb);
		}

		
		service.DisassociateDRTLogBucket=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LogBucket",params,undefined,false); 
			
			copyArg(msg,"LogBucket",params,undefined,false); 
			

			svc.disassociateDRTLogBucket(params,cb);
		}

		
		service.DisassociateDRTRole=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.disassociateDRTRole(params,cb);
		}

		
		service.DisassociateHealthCheck=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProtectionId",params,undefined,false); 
			copyArg(n,"HealthCheckArn",params,undefined,false); 
			
			copyArg(msg,"ProtectionId",params,undefined,false); 
			copyArg(msg,"HealthCheckArn",params,undefined,false); 
			

			svc.disassociateHealthCheck(params,cb);
		}

		
		service.EnableProactiveEngagement=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.enableProactiveEngagement(params,cb);
		}

		
		service.GetSubscriptionState=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getSubscriptionState(params,cb);
		}

		
		service.ListAttacks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ResourceArns",params,undefined,false); 
			copyArg(msg,"StartTime",params,undefined,true); 
			copyArg(msg,"EndTime",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listAttacks(params,cb);
		}

		
		service.ListProtectionGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listProtectionGroups(params,cb);
		}

		
		service.ListProtections=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listProtections(params,cb);
		}

		
		service.ListResourcesInProtectionGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProtectionGroupId",params,undefined,false); 
			
			copyArg(msg,"ProtectionGroupId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listResourcesInProtectionGroup(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
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

		
		service.UpdateEmergencyContactSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"EmergencyContactList",params,undefined,true); 
			

			svc.updateEmergencyContactSettings(params,cb);
		}

		
		service.UpdateProtectionGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProtectionGroupId",params,undefined,false); 
			copyArg(n,"Aggregation",params,undefined,false); 
			copyArg(n,"Pattern",params,undefined,false); 
			
			copyArg(msg,"ProtectionGroupId",params,undefined,false); 
			copyArg(msg,"Aggregation",params,undefined,false); 
			copyArg(msg,"Pattern",params,undefined,false); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			copyArg(msg,"Members",params,undefined,true); 
			

			svc.updateProtectionGroup(params,cb);
		}

		
		service.UpdateSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AutoRenew",params,undefined,false); 
			

			svc.updateSubscription(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Shield", AmazonAPINode);

};
