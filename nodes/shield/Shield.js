
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

		var awsService = new AWS.Shield( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Shield(msg.AWSConfig) : awsService;

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

		
		service.AssociateDRTLogBucket=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LogBucket",params,undefined,false); 
			
			copyArgs(n,"LogBucket",params,undefined,false); 
			
			copyArgs(msg,"LogBucket",params,undefined,false); 
			

			svc.associateDRTLogBucket(params,cb);
		}

		
		service.AssociateDRTRole=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(msg,"RoleArn",params,undefined,false); 
			

			svc.associateDRTRole(params,cb);
		}

		
		service.AssociateHealthCheck=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProtectionId",params,undefined,false); 
			copyArgs(n,"HealthCheckArn",params,undefined,false); 
			
			copyArgs(n,"ProtectionId",params,undefined,false); 
			copyArgs(n,"HealthCheckArn",params,undefined,false); 
			
			copyArgs(msg,"ProtectionId",params,undefined,false); 
			copyArgs(msg,"HealthCheckArn",params,undefined,false); 
			

			svc.associateHealthCheck(params,cb);
		}

		
		service.AssociateProactiveEngagementDetails=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EmergencyContactList",params,undefined,true); 
			
			copyArgs(n,"EmergencyContactList",params,undefined,true); 
			
			copyArgs(msg,"EmergencyContactList",params,undefined,true); 
			

			svc.associateProactiveEngagementDetails(params,cb);
		}

		
		service.CreateProtection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createProtection(params,cb);
		}

		
		service.CreateProtectionGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProtectionGroupId",params,undefined,false); 
			copyArgs(n,"Aggregation",params,undefined,false); 
			copyArgs(n,"Pattern",params,undefined,false); 
			
			copyArgs(n,"ProtectionGroupId",params,undefined,false); 
			copyArgs(n,"Aggregation",params,undefined,false); 
			copyArgs(n,"Pattern",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"Members",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ProtectionGroupId",params,undefined,false); 
			copyArgs(msg,"Aggregation",params,undefined,false); 
			copyArgs(msg,"Pattern",params,undefined,false); 
			copyArgs(msg,"ResourceType",params,undefined,false); 
			copyArgs(msg,"Members",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createProtectionGroup(params,cb);
		}

		
		service.CreateSubscription=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.createSubscription(params,cb);
		}

		
		service.DeleteProtection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProtectionId",params,undefined,false); 
			
			copyArgs(n,"ProtectionId",params,undefined,false); 
			
			copyArgs(msg,"ProtectionId",params,undefined,false); 
			

			svc.deleteProtection(params,cb);
		}

		
		service.DeleteProtectionGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProtectionGroupId",params,undefined,false); 
			
			copyArgs(n,"ProtectionGroupId",params,undefined,false); 
			
			copyArgs(msg,"ProtectionGroupId",params,undefined,false); 
			

			svc.deleteProtectionGroup(params,cb);
		}

		
		service.DeleteSubscription=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.deleteSubscription(params,cb);
		}

		
		service.DescribeAttack=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AttackId",params,undefined,false); 
			
			copyArgs(n,"AttackId",params,undefined,false); 
			
			copyArgs(msg,"AttackId",params,undefined,false); 
			

			svc.describeAttack(params,cb);
		}

		
		service.DescribeAttackStatistics=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeAttackStatistics(params,cb);
		}

		
		service.DescribeDRTAccess=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeDRTAccess(params,cb);
		}

		
		service.DescribeEmergencyContactSettings=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeEmergencyContactSettings(params,cb);
		}

		
		service.DescribeProtection=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ProtectionId",params,undefined,false); 
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ProtectionId",params,undefined,false); 
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.describeProtection(params,cb);
		}

		
		service.DescribeProtectionGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProtectionGroupId",params,undefined,false); 
			
			copyArgs(n,"ProtectionGroupId",params,undefined,false); 
			
			copyArgs(msg,"ProtectionGroupId",params,undefined,false); 
			

			svc.describeProtectionGroup(params,cb);
		}

		
		service.DescribeSubscription=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeSubscription(params,cb);
		}

		
		service.DisableProactiveEngagement=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.disableProactiveEngagement(params,cb);
		}

		
		service.DisassociateDRTLogBucket=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LogBucket",params,undefined,false); 
			
			copyArgs(n,"LogBucket",params,undefined,false); 
			
			copyArgs(msg,"LogBucket",params,undefined,false); 
			

			svc.disassociateDRTLogBucket(params,cb);
		}

		
		service.DisassociateDRTRole=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.disassociateDRTRole(params,cb);
		}

		
		service.DisassociateHealthCheck=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProtectionId",params,undefined,false); 
			copyArgs(n,"HealthCheckArn",params,undefined,false); 
			
			copyArgs(n,"ProtectionId",params,undefined,false); 
			copyArgs(n,"HealthCheckArn",params,undefined,false); 
			
			copyArgs(msg,"ProtectionId",params,undefined,false); 
			copyArgs(msg,"HealthCheckArn",params,undefined,false); 
			

			svc.disassociateHealthCheck(params,cb);
		}

		
		service.EnableProactiveEngagement=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.enableProactiveEngagement(params,cb);
		}

		
		service.GetSubscriptionState=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getSubscriptionState(params,cb);
		}

		
		service.ListAttacks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ResourceArns",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,true); 
			copyArgs(n,"EndTime",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ResourceArns",params,undefined,false); 
			copyArgs(msg,"StartTime",params,undefined,true); 
			copyArgs(msg,"EndTime",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listAttacks(params,cb);
		}

		
		service.ListProtectionGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listProtectionGroups(params,cb);
		}

		
		service.ListProtections=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listProtections(params,cb);
		}

		
		service.ListResourcesInProtectionGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProtectionGroupId",params,undefined,false); 
			
			copyArgs(n,"ProtectionGroupId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ProtectionGroupId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listResourcesInProtectionGroup(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
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

		
		service.UpdateEmergencyContactSettings=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"EmergencyContactList",params,undefined,true); 
			
			copyArgs(msg,"EmergencyContactList",params,undefined,true); 
			

			svc.updateEmergencyContactSettings(params,cb);
		}

		
		service.UpdateProtectionGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProtectionGroupId",params,undefined,false); 
			copyArgs(n,"Aggregation",params,undefined,false); 
			copyArgs(n,"Pattern",params,undefined,false); 
			
			copyArgs(n,"ProtectionGroupId",params,undefined,false); 
			copyArgs(n,"Aggregation",params,undefined,false); 
			copyArgs(n,"Pattern",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"Members",params,undefined,true); 
			
			copyArgs(msg,"ProtectionGroupId",params,undefined,false); 
			copyArgs(msg,"Aggregation",params,undefined,false); 
			copyArgs(msg,"Pattern",params,undefined,false); 
			copyArgs(msg,"ResourceType",params,undefined,false); 
			copyArgs(msg,"Members",params,undefined,true); 
			

			svc.updateProtectionGroup(params,cb);
		}

		
		service.UpdateSubscription=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AutoRenew",params,undefined,false); 
			
			copyArgs(msg,"AutoRenew",params,undefined,false); 
			

			svc.updateSubscription(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Shield", AmazonAPINode);

};
