
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

		var awsService = new AWS.AutoScaling( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.AutoScaling(msg.AWSConfig) : awsService;

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
		
			service.AttachInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArgs(n,"InstanceIds",params,undefined,true); 
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArgs(msg,"InstanceIds",params,undefined,true); 
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			

			svc.attachInstances(params,cb);
		}
			service.AttachLoadBalancerTargetGroups=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"TargetGroupARNs",params,undefined,true); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"TargetGroupARNs",params,undefined,true); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"TargetGroupARNs",params,undefined,true); 
			

			svc.attachLoadBalancerTargetGroups(params,cb);
		}
			service.AttachLoadBalancers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"LoadBalancerNames",params,undefined,true); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"LoadBalancerNames",params,undefined,true); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"LoadBalancerNames",params,undefined,true); 
			

			svc.attachLoadBalancers(params,cb);
		}
			service.BatchDeleteScheduledAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"ScheduledActionNames",params,undefined,true); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"ScheduledActionNames",params,undefined,true); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"ScheduledActionNames",params,undefined,true); 
			

			svc.batchDeleteScheduledAction(params,cb);
		}
			service.BatchPutScheduledUpdateGroupAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"ScheduledUpdateGroupActions",params,undefined,false); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"ScheduledUpdateGroupActions",params,undefined,false); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"ScheduledUpdateGroupActions",params,undefined,false); 
			

			svc.batchPutScheduledUpdateGroupAction(params,cb);
		}
			service.CancelInstanceRefresh=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			

			svc.cancelInstanceRefresh(params,cb);
		}
			service.CompleteLifecycleAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LifecycleHookName",params,undefined,false); 
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"LifecycleActionResult",params,undefined,false); 
			
			copyArgs(n,"LifecycleHookName",params,undefined,false); 
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"LifecycleActionToken",params,undefined,false); 
			copyArgs(n,"LifecycleActionResult",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"LifecycleHookName",params,undefined,false); 
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"LifecycleActionToken",params,undefined,false); 
			copyArgs(msg,"LifecycleActionResult",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.completeLifecycleAction(params,cb);
		}
			service.CreateAutoScalingGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(Number(n),"MinSize",params,undefined,false); 
			copyArgs(Number(n),"MaxSize",params,undefined,false); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"LaunchConfigurationName",params,undefined,false); 
			copyArgs(n,"LaunchTemplate",params,undefined,true); 
			copyArgs(n,"MixedInstancesPolicy",params,undefined,true); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(Number(n),"MinSize",params,undefined,false); 
			copyArgs(Number(n),"MaxSize",params,undefined,false); 
			copyArgs(Number(n),"DesiredCapacity",params,undefined,false); 
			copyArgs(Number(n),"DefaultCooldown",params,undefined,false); 
			copyArgs(n,"AvailabilityZones",params,undefined,true); 
			copyArgs(n,"LoadBalancerNames",params,undefined,true); 
			copyArgs(n,"TargetGroupARNs",params,undefined,true); 
			copyArgs(n,"HealthCheckType",params,undefined,false); 
			copyArgs(Number(n),"HealthCheckGracePeriod",params,undefined,false); 
			copyArgs(n,"PlacementGroup",params,undefined,false); 
			copyArgs(n,"VPCZoneIdentifier",params,undefined,false); 
			copyArgs(n,"TerminationPolicies",params,undefined,true); 
			copyArgs(Boolean(n),"NewInstancesProtectedFromScaleIn",params,undefined,false); 
			copyArgs(Boolean(n),"CapacityRebalance",params,undefined,false); 
			copyArgs(n,"LifecycleHookSpecificationList",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"ServiceLinkedRoleARN",params,undefined,false); 
			copyArgs(Number(n),"MaxInstanceLifetime",params,undefined,false); 
			copyArgs(n,"Context",params,undefined,false); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"LaunchConfigurationName",params,undefined,false); 
			copyArgs(msg,"LaunchTemplate",params,undefined,true); 
			copyArgs(msg,"MixedInstancesPolicy",params,undefined,true); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"MinSize",params,undefined,false); 
			copyArgs(msg,"MaxSize",params,undefined,false); 
			copyArgs(msg,"DesiredCapacity",params,undefined,false); 
			copyArgs(msg,"DefaultCooldown",params,undefined,false); 
			copyArgs(msg,"AvailabilityZones",params,undefined,true); 
			copyArgs(msg,"LoadBalancerNames",params,undefined,true); 
			copyArgs(msg,"TargetGroupARNs",params,undefined,true); 
			copyArgs(msg,"HealthCheckType",params,undefined,false); 
			copyArgs(msg,"HealthCheckGracePeriod",params,undefined,false); 
			copyArgs(msg,"PlacementGroup",params,undefined,false); 
			copyArgs(msg,"VPCZoneIdentifier",params,undefined,false); 
			copyArgs(msg,"TerminationPolicies",params,undefined,true); 
			copyArgs(msg,"NewInstancesProtectedFromScaleIn",params,undefined,false); 
			copyArgs(msg,"CapacityRebalance",params,undefined,false); 
			copyArgs(msg,"LifecycleHookSpecificationList",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"ServiceLinkedRoleARN",params,undefined,false); 
			copyArgs(msg,"MaxInstanceLifetime",params,undefined,false); 
			copyArgs(msg,"Context",params,undefined,false); 
			

			svc.createAutoScalingGroup(params,cb);
		}
			service.CreateLaunchConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LaunchConfigurationName",params,undefined,false); 
			
			copyArgs(n,"LaunchConfigurationName",params,undefined,false); 
			copyArgs(n,"ImageId",params,undefined,false); 
			copyArgs(n,"KeyName",params,undefined,false); 
			copyArgs(n,"SecurityGroups",params,undefined,true); 
			copyArgs(n,"ClassicLinkVPCId",params,undefined,false); 
			copyArgs(n,"ClassicLinkVPCSecurityGroups",params,undefined,true); 
			copyArgs(n,"UserData",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"InstanceType",params,undefined,false); 
			copyArgs(n,"KernelId",params,undefined,false); 
			copyArgs(n,"RamdiskId",params,undefined,false); 
			copyArgs(n,"BlockDeviceMappings",params,undefined,true); 
			copyArgs(n,"InstanceMonitoring",params,undefined,true); 
			copyArgs(n,"SpotPrice",params,undefined,false); 
			copyArgs(n,"IamInstanceProfile",params,undefined,false); 
			copyArgs(Boolean(n),"EbsOptimized",params,undefined,false); 
			copyArgs(Boolean(n),"AssociatePublicIpAddress",params,undefined,false); 
			copyArgs(n,"PlacementTenancy",params,undefined,false); 
			copyArgs(n,"MetadataOptions",params,undefined,true); 
			
			copyArgs(msg,"LaunchConfigurationName",params,undefined,false); 
			copyArgs(msg,"ImageId",params,undefined,false); 
			copyArgs(msg,"KeyName",params,undefined,false); 
			copyArgs(msg,"SecurityGroups",params,undefined,true); 
			copyArgs(msg,"ClassicLinkVPCId",params,undefined,false); 
			copyArgs(msg,"ClassicLinkVPCSecurityGroups",params,undefined,true); 
			copyArgs(msg,"UserData",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"InstanceType",params,undefined,false); 
			copyArgs(msg,"KernelId",params,undefined,false); 
			copyArgs(msg,"RamdiskId",params,undefined,false); 
			copyArgs(msg,"BlockDeviceMappings",params,undefined,true); 
			copyArgs(msg,"InstanceMonitoring",params,undefined,true); 
			copyArgs(msg,"SpotPrice",params,undefined,false); 
			copyArgs(msg,"IamInstanceProfile",params,undefined,false); 
			copyArgs(msg,"EbsOptimized",params,undefined,false); 
			copyArgs(msg,"AssociatePublicIpAddress",params,undefined,false); 
			copyArgs(msg,"PlacementTenancy",params,undefined,false); 
			copyArgs(msg,"MetadataOptions",params,undefined,true); 
			

			svc.createLaunchConfiguration(params,cb);
		}
			service.CreateOrUpdateTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createOrUpdateTags(params,cb);
		}
			service.DeleteAutoScalingGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(Boolean(n),"ForceDelete",params,undefined,false); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"ForceDelete",params,undefined,false); 
			

			svc.deleteAutoScalingGroup(params,cb);
		}
			service.DeleteLaunchConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LaunchConfigurationName",params,undefined,false); 
			
			copyArgs(n,"LaunchConfigurationName",params,undefined,false); 
			
			copyArgs(msg,"LaunchConfigurationName",params,undefined,false); 
			

			svc.deleteLaunchConfiguration(params,cb);
		}
			service.DeleteLifecycleHook=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LifecycleHookName",params,undefined,false); 
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArgs(n,"LifecycleHookName",params,undefined,false); 
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArgs(msg,"LifecycleHookName",params,undefined,false); 
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			

			svc.deleteLifecycleHook(params,cb);
		}
			service.DeleteNotificationConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"TopicARN",params,undefined,false); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"TopicARN",params,undefined,false); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"TopicARN",params,undefined,false); 
			

			svc.deleteNotificationConfiguration(params,cb);
		}
			service.DeletePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicyName",params,undefined,false); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"PolicyName",params,undefined,false); 
			

			svc.deletePolicy(params,cb);
		}
			service.DeleteScheduledAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"ScheduledActionName",params,undefined,false); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"ScheduledActionName",params,undefined,false); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"ScheduledActionName",params,undefined,false); 
			

			svc.deleteScheduledAction(params,cb);
		}
			service.DeleteTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.deleteTags(params,cb);
		}
			service.DeleteWarmPool=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(Boolean(n),"ForceDelete",params,undefined,false); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"ForceDelete",params,undefined,false); 
			

			svc.deleteWarmPool(params,cb);
		}
			service.DescribeAccountLimits=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeAccountLimits(params,cb);
		}
			service.DescribeAdjustmentTypes=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeAdjustmentTypes(params,cb);
		}
			service.DescribeAutoScalingGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AutoScalingGroupNames",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			
			copyArgs(msg,"AutoScalingGroupNames",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			

			svc.describeAutoScalingGroups(params,cb);
		}
			service.DescribeAutoScalingInstances=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"InstanceIds",params,undefined,true); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"InstanceIds",params,undefined,true); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeAutoScalingInstances(params,cb);
		}
			service.DescribeAutoScalingNotificationTypes=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeAutoScalingNotificationTypes(params,cb);
		}
			service.DescribeInstanceRefreshes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"InstanceRefreshIds",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"InstanceRefreshIds",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			

			svc.describeInstanceRefreshes(params,cb);
		}
			service.DescribeLaunchConfigurations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"LaunchConfigurationNames",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			
			copyArgs(msg,"LaunchConfigurationNames",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			

			svc.describeLaunchConfigurations(params,cb);
		}
			service.DescribeLifecycleHookTypes=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeLifecycleHookTypes(params,cb);
		}
			service.DescribeLifecycleHooks=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"LifecycleHookNames",params,undefined,false); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"LifecycleHookNames",params,undefined,false); 
			

			svc.describeLifecycleHooks(params,cb);
		}
			service.DescribeLoadBalancerTargetGroups=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			

			svc.describeLoadBalancerTargetGroups(params,cb);
		}
			service.DescribeLoadBalancers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			

			svc.describeLoadBalancers(params,cb);
		}
			service.DescribeMetricCollectionTypes=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeMetricCollectionTypes(params,cb);
		}
			service.DescribeNotificationConfigurations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AutoScalingGroupNames",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			
			copyArgs(msg,"AutoScalingGroupNames",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			

			svc.describeNotificationConfigurations(params,cb);
		}
			service.DescribePolicies=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"PolicyNames",params,undefined,false); 
			copyArgs(n,"PolicyTypes",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"PolicyNames",params,undefined,false); 
			copyArgs(msg,"PolicyTypes",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			

			svc.describePolicies(params,cb);
		}
			service.DescribeScalingActivities=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ActivityIds",params,undefined,false); 
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(Boolean(n),"IncludeDeletedGroups",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ActivityIds",params,undefined,false); 
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"IncludeDeletedGroups",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeScalingActivities(params,cb);
		}
			service.DescribeScalingProcessTypes=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeScalingProcessTypes(params,cb);
		}
			service.DescribeScheduledActions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"ScheduledActionNames",params,undefined,true); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"ScheduledActionNames",params,undefined,true); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			

			svc.describeScheduledActions(params,cb);
		}
			service.DescribeTags=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			

			svc.describeTags(params,cb);
		}
			service.DescribeTerminationPolicyTypes=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeTerminationPolicyTypes(params,cb);
		}
			service.DescribeWarmPool=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(Number(n),"MaxRecords",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeWarmPool(params,cb);
		}
			service.DetachInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(Boolean(n),"ShouldDecrementDesiredCapacity",params,undefined,false); 
			
			copyArgs(n,"InstanceIds",params,undefined,true); 
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(Boolean(n),"ShouldDecrementDesiredCapacity",params,undefined,false); 
			
			copyArgs(msg,"InstanceIds",params,undefined,true); 
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"ShouldDecrementDesiredCapacity",params,undefined,false); 
			

			svc.detachInstances(params,cb);
		}
			service.DetachLoadBalancerTargetGroups=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"TargetGroupARNs",params,undefined,true); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"TargetGroupARNs",params,undefined,true); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"TargetGroupARNs",params,undefined,true); 
			

			svc.detachLoadBalancerTargetGroups(params,cb);
		}
			service.DetachLoadBalancers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"LoadBalancerNames",params,undefined,true); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"LoadBalancerNames",params,undefined,true); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"LoadBalancerNames",params,undefined,true); 
			

			svc.detachLoadBalancers(params,cb);
		}
			service.DisableMetricsCollection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"Metrics",params,undefined,true); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"Metrics",params,undefined,true); 
			

			svc.disableMetricsCollection(params,cb);
		}
			service.EnableMetricsCollection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"Granularity",params,undefined,false); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"Metrics",params,undefined,true); 
			copyArgs(n,"Granularity",params,undefined,false); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"Metrics",params,undefined,true); 
			copyArgs(msg,"Granularity",params,undefined,false); 
			

			svc.enableMetricsCollection(params,cb);
		}
			service.EnterStandby=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(Boolean(n),"ShouldDecrementDesiredCapacity",params,undefined,false); 
			
			copyArgs(n,"InstanceIds",params,undefined,true); 
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(Boolean(n),"ShouldDecrementDesiredCapacity",params,undefined,false); 
			
			copyArgs(msg,"InstanceIds",params,undefined,true); 
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"ShouldDecrementDesiredCapacity",params,undefined,false); 
			

			svc.enterStandby(params,cb);
		}
			service.ExecutePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicyName",params,undefined,false); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			copyArgs(Boolean(n),"HonorCooldown",params,undefined,false); 
			copyArgs(n,"MetricValue",params,undefined,false); 
			copyArgs(n,"BreachThreshold",params,undefined,false); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"PolicyName",params,undefined,false); 
			copyArgs(msg,"HonorCooldown",params,undefined,false); 
			copyArgs(msg,"MetricValue",params,undefined,false); 
			copyArgs(msg,"BreachThreshold",params,undefined,false); 
			

			svc.executePolicy(params,cb);
		}
			service.ExitStandby=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArgs(n,"InstanceIds",params,undefined,true); 
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArgs(msg,"InstanceIds",params,undefined,true); 
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			

			svc.exitStandby(params,cb);
		}
			service.GetPredictiveScalingForecast=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"PolicyName",params,undefined,false); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			

			svc.getPredictiveScalingForecast(params,cb);
		}
			service.PutLifecycleHook=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LifecycleHookName",params,undefined,false); 
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArgs(n,"LifecycleHookName",params,undefined,false); 
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"LifecycleTransition",params,undefined,false); 
			copyArgs(n,"RoleARN",params,undefined,false); 
			copyArgs(n,"NotificationTargetARN",params,undefined,false); 
			copyArgs(n,"NotificationMetadata",params,undefined,false); 
			copyArgs(Number(n),"HeartbeatTimeout",params,undefined,false); 
			copyArgs(n,"DefaultResult",params,undefined,false); 
			
			copyArgs(msg,"LifecycleHookName",params,undefined,false); 
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"LifecycleTransition",params,undefined,false); 
			copyArgs(msg,"RoleARN",params,undefined,false); 
			copyArgs(msg,"NotificationTargetARN",params,undefined,false); 
			copyArgs(msg,"NotificationMetadata",params,undefined,false); 
			copyArgs(msg,"HeartbeatTimeout",params,undefined,false); 
			copyArgs(msg,"DefaultResult",params,undefined,false); 
			

			svc.putLifecycleHook(params,cb);
		}
			service.PutNotificationConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"TopicARN",params,undefined,false); 
			copyArgs(n,"NotificationTypes",params,undefined,true); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"TopicARN",params,undefined,false); 
			copyArgs(n,"NotificationTypes",params,undefined,true); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"TopicARN",params,undefined,false); 
			copyArgs(msg,"NotificationTypes",params,undefined,true); 
			

			svc.putNotificationConfiguration(params,cb);
		}
			service.PutScalingPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"PolicyName",params,undefined,false); 
			copyArgs(n,"PolicyType",params,undefined,false); 
			copyArgs(n,"AdjustmentType",params,undefined,false); 
			copyArgs(n,"MinAdjustmentStep",params,undefined,true); 
			copyArgs(Number(n),"MinAdjustmentMagnitude",params,undefined,false); 
			copyArgs(Number(n),"ScalingAdjustment",params,undefined,false); 
			copyArgs(Number(n),"Cooldown",params,undefined,false); 
			copyArgs(n,"MetricAggregationType",params,undefined,false); 
			copyArgs(n,"StepAdjustments",params,undefined,true); 
			copyArgs(Number(n),"EstimatedInstanceWarmup",params,undefined,false); 
			copyArgs(n,"TargetTrackingConfiguration",params,undefined,true); 
			copyArgs(Boolean(n),"Enabled",params,undefined,false); 
			copyArgs(n,"PredictiveScalingConfiguration",params,undefined,true); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"PolicyName",params,undefined,false); 
			copyArgs(msg,"PolicyType",params,undefined,false); 
			copyArgs(msg,"AdjustmentType",params,undefined,false); 
			copyArgs(msg,"MinAdjustmentStep",params,undefined,true); 
			copyArgs(msg,"MinAdjustmentMagnitude",params,undefined,false); 
			copyArgs(msg,"ScalingAdjustment",params,undefined,false); 
			copyArgs(msg,"Cooldown",params,undefined,false); 
			copyArgs(msg,"MetricAggregationType",params,undefined,false); 
			copyArgs(msg,"StepAdjustments",params,undefined,true); 
			copyArgs(msg,"EstimatedInstanceWarmup",params,undefined,false); 
			copyArgs(msg,"TargetTrackingConfiguration",params,undefined,true); 
			copyArgs(msg,"Enabled",params,undefined,false); 
			copyArgs(msg,"PredictiveScalingConfiguration",params,undefined,true); 
			

			svc.putScalingPolicy(params,cb);
		}
			service.PutScheduledUpdateGroupAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"ScheduledActionName",params,undefined,false); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"ScheduledActionName",params,undefined,false); 
			copyArgs(n,"Time",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(n,"Recurrence",params,undefined,false); 
			copyArgs(Number(n),"MinSize",params,undefined,false); 
			copyArgs(Number(n),"MaxSize",params,undefined,false); 
			copyArgs(Number(n),"DesiredCapacity",params,undefined,false); 
			copyArgs(n,"TimeZone",params,undefined,false); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"ScheduledActionName",params,undefined,false); 
			copyArgs(msg,"Time",params,undefined,false); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"Recurrence",params,undefined,false); 
			copyArgs(msg,"MinSize",params,undefined,false); 
			copyArgs(msg,"MaxSize",params,undefined,false); 
			copyArgs(msg,"DesiredCapacity",params,undefined,false); 
			copyArgs(msg,"TimeZone",params,undefined,false); 
			

			svc.putScheduledUpdateGroupAction(params,cb);
		}
			service.PutWarmPool=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(Number(n),"MaxGroupPreparedCapacity",params,undefined,false); 
			copyArgs(Number(n),"MinSize",params,undefined,false); 
			copyArgs(n,"PoolState",params,undefined,false); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"MaxGroupPreparedCapacity",params,undefined,false); 
			copyArgs(msg,"MinSize",params,undefined,false); 
			copyArgs(msg,"PoolState",params,undefined,false); 
			

			svc.putWarmPool(params,cb);
		}
			service.RecordLifecycleActionHeartbeat=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LifecycleHookName",params,undefined,false); 
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArgs(n,"LifecycleHookName",params,undefined,false); 
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"LifecycleActionToken",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"LifecycleHookName",params,undefined,false); 
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"LifecycleActionToken",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.recordLifecycleActionHeartbeat(params,cb);
		}
			service.ResumeProcesses=function(svc,msg,cb){
			var params={};
			
			
			
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,true); 
			copyArgs(msg,"ScalingProcesses",params,undefined,true); 

			svc.resumeProcesses(params,cb);
		}
			service.SetDesiredCapacity=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(Number(n),"DesiredCapacity",params,undefined,false); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(Number(n),"DesiredCapacity",params,undefined,false); 
			copyArgs(Boolean(n),"HonorCooldown",params,undefined,false); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"DesiredCapacity",params,undefined,false); 
			copyArgs(msg,"HonorCooldown",params,undefined,false); 
			

			svc.setDesiredCapacity(params,cb);
		}
			service.SetInstanceHealth=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"HealthStatus",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"HealthStatus",params,undefined,false); 
			copyArgs(Boolean(n),"ShouldRespectGracePeriod",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"HealthStatus",params,undefined,false); 
			copyArgs(msg,"ShouldRespectGracePeriod",params,undefined,false); 
			

			svc.setInstanceHealth(params,cb);
		}
			service.SetInstanceProtection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceIds",params,undefined,true); 
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(Boolean(n),"ProtectedFromScaleIn",params,undefined,false); 
			
			copyArgs(n,"InstanceIds",params,undefined,true); 
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(Boolean(n),"ProtectedFromScaleIn",params,undefined,false); 
			
			copyArgs(msg,"InstanceIds",params,undefined,true); 
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"ProtectedFromScaleIn",params,undefined,false); 
			

			svc.setInstanceProtection(params,cb);
		}
			service.StartInstanceRefresh=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"Strategy",params,undefined,false); 
			copyArgs(n,"DesiredConfiguration",params,undefined,true); 
			copyArgs(n,"Preferences",params,undefined,true); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"Strategy",params,undefined,false); 
			copyArgs(msg,"DesiredConfiguration",params,undefined,true); 
			copyArgs(msg,"Preferences",params,undefined,true); 
			

			svc.startInstanceRefresh(params,cb);
		}
			service.SuspendProcesses=function(svc,msg,cb){
			var params={};
			
			
			
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,true); 
			copyArgs(msg,"ScalingProcesses",params,undefined,true); 

			svc.suspendProcesses(params,cb);
		}
			service.TerminateInstanceInAutoScalingGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(Boolean(n),"ShouldDecrementDesiredCapacity",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(Boolean(n),"ShouldDecrementDesiredCapacity",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"ShouldDecrementDesiredCapacity",params,undefined,false); 
			

			svc.terminateInstanceInAutoScalingGroup(params,cb);
		}
			service.UpdateAutoScalingGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArgs(n,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(n,"LaunchConfigurationName",params,undefined,false); 
			copyArgs(n,"LaunchTemplate",params,undefined,true); 
			copyArgs(n,"MixedInstancesPolicy",params,undefined,true); 
			copyArgs(Number(n),"MinSize",params,undefined,false); 
			copyArgs(Number(n),"MaxSize",params,undefined,false); 
			copyArgs(Number(n),"DesiredCapacity",params,undefined,false); 
			copyArgs(Number(n),"DefaultCooldown",params,undefined,false); 
			copyArgs(n,"AvailabilityZones",params,undefined,true); 
			copyArgs(n,"HealthCheckType",params,undefined,false); 
			copyArgs(Number(n),"HealthCheckGracePeriod",params,undefined,false); 
			copyArgs(n,"PlacementGroup",params,undefined,false); 
			copyArgs(n,"VPCZoneIdentifier",params,undefined,false); 
			copyArgs(n,"TerminationPolicies",params,undefined,true); 
			copyArgs(Boolean(n),"NewInstancesProtectedFromScaleIn",params,undefined,false); 
			copyArgs(n,"ServiceLinkedRoleARN",params,undefined,false); 
			copyArgs(Number(n),"MaxInstanceLifetime",params,undefined,false); 
			copyArgs(Boolean(n),"CapacityRebalance",params,undefined,false); 
			copyArgs(n,"Context",params,undefined,false); 
			
			copyArgs(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArgs(msg,"LaunchConfigurationName",params,undefined,false); 
			copyArgs(msg,"LaunchTemplate",params,undefined,true); 
			copyArgs(msg,"MixedInstancesPolicy",params,undefined,true); 
			copyArgs(msg,"MinSize",params,undefined,false); 
			copyArgs(msg,"MaxSize",params,undefined,false); 
			copyArgs(msg,"DesiredCapacity",params,undefined,false); 
			copyArgs(msg,"DefaultCooldown",params,undefined,false); 
			copyArgs(msg,"AvailabilityZones",params,undefined,true); 
			copyArgs(msg,"HealthCheckType",params,undefined,false); 
			copyArgs(msg,"HealthCheckGracePeriod",params,undefined,false); 
			copyArgs(msg,"PlacementGroup",params,undefined,false); 
			copyArgs(msg,"VPCZoneIdentifier",params,undefined,false); 
			copyArgs(msg,"TerminationPolicies",params,undefined,true); 
			copyArgs(msg,"NewInstancesProtectedFromScaleIn",params,undefined,false); 
			copyArgs(msg,"ServiceLinkedRoleARN",params,undefined,false); 
			copyArgs(msg,"MaxInstanceLifetime",params,undefined,false); 
			copyArgs(msg,"CapacityRebalance",params,undefined,false); 
			copyArgs(msg,"Context",params,undefined,false); 
			

			svc.updateAutoScalingGroup(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS AutoScaling", AmazonAPINode);

};
