
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

		var awsService = new AWS.AutoScaling( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.AutoScaling(msg.AWSConfig) : awsService;

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

		
		service.AttachInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArg(msg,"InstanceIds",params,undefined,true); 
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			

			svc.attachInstances(params,cb);
		}

		
		service.AttachLoadBalancerTargetGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			copyArg(n,"TargetGroupARNs",params,undefined,true); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"TargetGroupARNs",params,undefined,true); 
			

			svc.attachLoadBalancerTargetGroups(params,cb);
		}

		
		service.AttachLoadBalancers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			copyArg(n,"LoadBalancerNames",params,undefined,true); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"LoadBalancerNames",params,undefined,true); 
			

			svc.attachLoadBalancers(params,cb);
		}

		
		service.BatchDeleteScheduledAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			copyArg(n,"ScheduledActionNames",params,undefined,true); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"ScheduledActionNames",params,undefined,true); 
			

			svc.batchDeleteScheduledAction(params,cb);
		}

		
		service.BatchPutScheduledUpdateGroupAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			copyArg(n,"ScheduledUpdateGroupActions",params,undefined,false); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"ScheduledUpdateGroupActions",params,undefined,false); 
			

			svc.batchPutScheduledUpdateGroupAction(params,cb);
		}

		
		service.CancelInstanceRefresh=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			

			svc.cancelInstanceRefresh(params,cb);
		}

		
		service.CompleteLifecycleAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LifecycleHookName",params,undefined,false); 
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			copyArg(n,"LifecycleActionResult",params,undefined,false); 
			
			copyArg(msg,"LifecycleHookName",params,undefined,false); 
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"LifecycleActionToken",params,undefined,false); 
			copyArg(msg,"LifecycleActionResult",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.completeLifecycleAction(params,cb);
		}

		
		service.CreateAutoScalingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			copyArg(n,"MinSize",params,undefined,false); 
			copyArg(n,"MaxSize",params,undefined,false); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"LaunchConfigurationName",params,undefined,false); 
			copyArg(msg,"LaunchTemplate",params,undefined,true); 
			copyArg(msg,"MixedInstancesPolicy",params,undefined,true); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"MinSize",params,undefined,false); 
			copyArg(msg,"MaxSize",params,undefined,false); 
			copyArg(msg,"DesiredCapacity",params,undefined,false); 
			copyArg(msg,"DefaultCooldown",params,undefined,false); 
			copyArg(msg,"AvailabilityZones",params,undefined,true); 
			copyArg(msg,"LoadBalancerNames",params,undefined,true); 
			copyArg(msg,"TargetGroupARNs",params,undefined,true); 
			copyArg(msg,"HealthCheckType",params,undefined,false); 
			copyArg(msg,"HealthCheckGracePeriod",params,undefined,false); 
			copyArg(msg,"PlacementGroup",params,undefined,false); 
			copyArg(msg,"VPCZoneIdentifier",params,undefined,false); 
			copyArg(msg,"TerminationPolicies",params,undefined,true); 
			copyArg(msg,"NewInstancesProtectedFromScaleIn",params,undefined,false); 
			copyArg(msg,"CapacityRebalance",params,undefined,false); 
			copyArg(msg,"LifecycleHookSpecificationList",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"ServiceLinkedRoleARN",params,undefined,false); 
			copyArg(msg,"MaxInstanceLifetime",params,undefined,false); 
			copyArg(msg,"Context",params,undefined,false); 
			

			svc.createAutoScalingGroup(params,cb);
		}

		
		service.CreateLaunchConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LaunchConfigurationName",params,undefined,false); 
			
			copyArg(msg,"LaunchConfigurationName",params,undefined,false); 
			copyArg(msg,"ImageId",params,undefined,false); 
			copyArg(msg,"KeyName",params,undefined,false); 
			copyArg(msg,"SecurityGroups",params,undefined,true); 
			copyArg(msg,"ClassicLinkVPCId",params,undefined,false); 
			copyArg(msg,"ClassicLinkVPCSecurityGroups",params,undefined,true); 
			copyArg(msg,"UserData",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"InstanceType",params,undefined,false); 
			copyArg(msg,"KernelId",params,undefined,false); 
			copyArg(msg,"RamdiskId",params,undefined,false); 
			copyArg(msg,"BlockDeviceMappings",params,undefined,true); 
			copyArg(msg,"InstanceMonitoring",params,undefined,true); 
			copyArg(msg,"SpotPrice",params,undefined,false); 
			copyArg(msg,"IamInstanceProfile",params,undefined,false); 
			copyArg(msg,"EbsOptimized",params,undefined,false); 
			copyArg(msg,"AssociatePublicIpAddress",params,undefined,false); 
			copyArg(msg,"PlacementTenancy",params,undefined,false); 
			copyArg(msg,"MetadataOptions",params,undefined,true); 
			

			svc.createLaunchConfiguration(params,cb);
		}

		
		service.CreateOrUpdateTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createOrUpdateTags(params,cb);
		}

		
		service.DeleteAutoScalingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"ForceDelete",params,undefined,false); 
			

			svc.deleteAutoScalingGroup(params,cb);
		}

		
		service.DeleteLaunchConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LaunchConfigurationName",params,undefined,false); 
			
			copyArg(msg,"LaunchConfigurationName",params,undefined,false); 
			

			svc.deleteLaunchConfiguration(params,cb);
		}

		
		service.DeleteLifecycleHook=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LifecycleHookName",params,undefined,false); 
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArg(msg,"LifecycleHookName",params,undefined,false); 
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			

			svc.deleteLifecycleHook(params,cb);
		}

		
		service.DeleteNotificationConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			copyArg(n,"TopicARN",params,undefined,false); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"TopicARN",params,undefined,false); 
			

			svc.deleteNotificationConfiguration(params,cb);
		}

		
		service.DeletePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyName",params,undefined,false); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"PolicyName",params,undefined,false); 
			

			svc.deletePolicy(params,cb);
		}

		
		service.DeleteScheduledAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			copyArg(n,"ScheduledActionName",params,undefined,false); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"ScheduledActionName",params,undefined,false); 
			

			svc.deleteScheduledAction(params,cb);
		}

		
		service.DeleteTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.deleteTags(params,cb);
		}

		
		service.DeleteWarmPool=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"ForceDelete",params,undefined,false); 
			

			svc.deleteWarmPool(params,cb);
		}

		
		service.DescribeAccountLimits=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeAccountLimits(params,cb);
		}

		
		service.DescribeAdjustmentTypes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeAdjustmentTypes(params,cb);
		}

		
		service.DescribeAutoScalingGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AutoScalingGroupNames",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			

			svc.describeAutoScalingGroups(params,cb);
		}

		
		service.DescribeAutoScalingInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"InstanceIds",params,undefined,true); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeAutoScalingInstances(params,cb);
		}

		
		service.DescribeAutoScalingNotificationTypes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeAutoScalingNotificationTypes(params,cb);
		}

		
		service.DescribeInstanceRefreshes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"InstanceRefreshIds",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			

			svc.describeInstanceRefreshes(params,cb);
		}

		
		service.DescribeLaunchConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"LaunchConfigurationNames",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			

			svc.describeLaunchConfigurations(params,cb);
		}

		
		service.DescribeLifecycleHookTypes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeLifecycleHookTypes(params,cb);
		}

		
		service.DescribeLifecycleHooks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"LifecycleHookNames",params,undefined,false); 
			

			svc.describeLifecycleHooks(params,cb);
		}

		
		service.DescribeLoadBalancerTargetGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			

			svc.describeLoadBalancerTargetGroups(params,cb);
		}

		
		service.DescribeLoadBalancers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			

			svc.describeLoadBalancers(params,cb);
		}

		
		service.DescribeMetricCollectionTypes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeMetricCollectionTypes(params,cb);
		}

		
		service.DescribeNotificationConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AutoScalingGroupNames",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			

			svc.describeNotificationConfigurations(params,cb);
		}

		
		service.DescribePolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"PolicyNames",params,undefined,false); 
			copyArg(msg,"PolicyTypes",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			

			svc.describePolicies(params,cb);
		}

		
		service.DescribeScalingActivities=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ActivityIds",params,undefined,false); 
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"IncludeDeletedGroups",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeScalingActivities(params,cb);
		}

		
		service.DescribeScalingProcessTypes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeScalingProcessTypes(params,cb);
		}

		
		service.DescribeScheduledActions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"ScheduledActionNames",params,undefined,true); 
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			

			svc.describeScheduledActions(params,cb);
		}

		
		service.DescribeTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			

			svc.describeTags(params,cb);
		}

		
		service.DescribeTerminationPolicyTypes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeTerminationPolicyTypes(params,cb);
		}

		
		service.DescribeWarmPool=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeWarmPool(params,cb);
		}

		
		service.DetachInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			copyArg(n,"ShouldDecrementDesiredCapacity",params,undefined,false); 
			
			copyArg(msg,"InstanceIds",params,undefined,true); 
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"ShouldDecrementDesiredCapacity",params,undefined,false); 
			

			svc.detachInstances(params,cb);
		}

		
		service.DetachLoadBalancerTargetGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			copyArg(n,"TargetGroupARNs",params,undefined,true); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"TargetGroupARNs",params,undefined,true); 
			

			svc.detachLoadBalancerTargetGroups(params,cb);
		}

		
		service.DetachLoadBalancers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			copyArg(n,"LoadBalancerNames",params,undefined,true); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"LoadBalancerNames",params,undefined,true); 
			

			svc.detachLoadBalancers(params,cb);
		}

		
		service.DisableMetricsCollection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"Metrics",params,undefined,true); 
			

			svc.disableMetricsCollection(params,cb);
		}

		
		service.EnableMetricsCollection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			copyArg(n,"Granularity",params,undefined,false); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"Metrics",params,undefined,true); 
			copyArg(msg,"Granularity",params,undefined,false); 
			

			svc.enableMetricsCollection(params,cb);
		}

		
		service.EnterStandby=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			copyArg(n,"ShouldDecrementDesiredCapacity",params,undefined,false); 
			
			copyArg(msg,"InstanceIds",params,undefined,true); 
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"ShouldDecrementDesiredCapacity",params,undefined,false); 
			

			svc.enterStandby(params,cb);
		}

		
		service.ExecutePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyName",params,undefined,false); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"PolicyName",params,undefined,false); 
			copyArg(msg,"HonorCooldown",params,undefined,false); 
			copyArg(msg,"MetricValue",params,undefined,false); 
			copyArg(msg,"BreachThreshold",params,undefined,false); 
			

			svc.executePolicy(params,cb);
		}

		
		service.ExitStandby=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArg(msg,"InstanceIds",params,undefined,true); 
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			

			svc.exitStandby(params,cb);
		}

		
		service.GetPredictiveScalingForecast=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			copyArg(n,"PolicyName",params,undefined,false); 
			copyArg(n,"StartTime",params,undefined,false); 
			copyArg(n,"EndTime",params,undefined,false); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"PolicyName",params,undefined,false); 
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			

			svc.getPredictiveScalingForecast(params,cb);
		}

		
		service.PutLifecycleHook=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LifecycleHookName",params,undefined,false); 
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArg(msg,"LifecycleHookName",params,undefined,false); 
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"LifecycleTransition",params,undefined,false); 
			copyArg(msg,"RoleARN",params,undefined,false); 
			copyArg(msg,"NotificationTargetARN",params,undefined,false); 
			copyArg(msg,"NotificationMetadata",params,undefined,false); 
			copyArg(msg,"HeartbeatTimeout",params,undefined,false); 
			copyArg(msg,"DefaultResult",params,undefined,false); 
			

			svc.putLifecycleHook(params,cb);
		}

		
		service.PutNotificationConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			copyArg(n,"TopicARN",params,undefined,false); 
			copyArg(n,"NotificationTypes",params,undefined,true); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"TopicARN",params,undefined,false); 
			copyArg(msg,"NotificationTypes",params,undefined,true); 
			

			svc.putNotificationConfiguration(params,cb);
		}

		
		service.PutScalingPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			copyArg(n,"PolicyName",params,undefined,false); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"PolicyName",params,undefined,false); 
			copyArg(msg,"PolicyType",params,undefined,false); 
			copyArg(msg,"AdjustmentType",params,undefined,false); 
			copyArg(msg,"MinAdjustmentStep",params,undefined,true); 
			copyArg(msg,"MinAdjustmentMagnitude",params,undefined,false); 
			copyArg(msg,"ScalingAdjustment",params,undefined,false); 
			copyArg(msg,"Cooldown",params,undefined,false); 
			copyArg(msg,"MetricAggregationType",params,undefined,false); 
			copyArg(msg,"StepAdjustments",params,undefined,true); 
			copyArg(msg,"EstimatedInstanceWarmup",params,undefined,false); 
			copyArg(msg,"TargetTrackingConfiguration",params,undefined,true); 
			copyArg(msg,"Enabled",params,undefined,false); 
			copyArg(msg,"PredictiveScalingConfiguration",params,undefined,true); 
			

			svc.putScalingPolicy(params,cb);
		}

		
		service.PutScheduledUpdateGroupAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			copyArg(n,"ScheduledActionName",params,undefined,false); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"ScheduledActionName",params,undefined,false); 
			copyArg(msg,"Time",params,undefined,false); 
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"Recurrence",params,undefined,false); 
			copyArg(msg,"MinSize",params,undefined,false); 
			copyArg(msg,"MaxSize",params,undefined,false); 
			copyArg(msg,"DesiredCapacity",params,undefined,false); 
			copyArg(msg,"TimeZone",params,undefined,false); 
			

			svc.putScheduledUpdateGroupAction(params,cb);
		}

		
		service.PutWarmPool=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"MaxGroupPreparedCapacity",params,undefined,false); 
			copyArg(msg,"MinSize",params,undefined,false); 
			copyArg(msg,"PoolState",params,undefined,false); 
			

			svc.putWarmPool(params,cb);
		}

		
		service.RecordLifecycleActionHeartbeat=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LifecycleHookName",params,undefined,false); 
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArg(msg,"LifecycleHookName",params,undefined,false); 
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"LifecycleActionToken",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.recordLifecycleActionHeartbeat(params,cb);
		}

		
		service.ResumeProcesses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,true); 
			copyArg(msg,"ScalingProcesses",params,undefined,true); 

			svc.resumeProcesses(params,cb);
		}

		
		service.SetDesiredCapacity=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			copyArg(n,"DesiredCapacity",params,undefined,false); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"DesiredCapacity",params,undefined,false); 
			copyArg(msg,"HonorCooldown",params,undefined,false); 
			

			svc.setDesiredCapacity(params,cb);
		}

		
		service.SetInstanceHealth=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"HealthStatus",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"HealthStatus",params,undefined,false); 
			copyArg(msg,"ShouldRespectGracePeriod",params,undefined,false); 
			

			svc.setInstanceHealth(params,cb);
		}

		
		service.SetInstanceProtection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceIds",params,undefined,true); 
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			copyArg(n,"ProtectedFromScaleIn",params,undefined,false); 
			
			copyArg(msg,"InstanceIds",params,undefined,true); 
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"ProtectedFromScaleIn",params,undefined,false); 
			

			svc.setInstanceProtection(params,cb);
		}

		
		service.StartInstanceRefresh=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"Strategy",params,undefined,false); 
			copyArg(msg,"DesiredConfiguration",params,undefined,true); 
			copyArg(msg,"Preferences",params,undefined,true); 
			

			svc.startInstanceRefresh(params,cb);
		}

		
		service.SuspendProcesses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,true); 
			copyArg(msg,"ScalingProcesses",params,undefined,true); 

			svc.suspendProcesses(params,cb);
		}

		
		service.TerminateInstanceInAutoScalingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"ShouldDecrementDesiredCapacity",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"ShouldDecrementDesiredCapacity",params,undefined,false); 
			

			svc.terminateInstanceInAutoScalingGroup(params,cb);
		}

		
		service.UpdateAutoScalingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoScalingGroupName",params,undefined,false); 
			
			copyArg(msg,"AutoScalingGroupName",params,undefined,false); 
			copyArg(msg,"LaunchConfigurationName",params,undefined,false); 
			copyArg(msg,"LaunchTemplate",params,undefined,true); 
			copyArg(msg,"MixedInstancesPolicy",params,undefined,true); 
			copyArg(msg,"MinSize",params,undefined,false); 
			copyArg(msg,"MaxSize",params,undefined,false); 
			copyArg(msg,"DesiredCapacity",params,undefined,false); 
			copyArg(msg,"DefaultCooldown",params,undefined,false); 
			copyArg(msg,"AvailabilityZones",params,undefined,true); 
			copyArg(msg,"HealthCheckType",params,undefined,false); 
			copyArg(msg,"HealthCheckGracePeriod",params,undefined,false); 
			copyArg(msg,"PlacementGroup",params,undefined,false); 
			copyArg(msg,"VPCZoneIdentifier",params,undefined,false); 
			copyArg(msg,"TerminationPolicies",params,undefined,true); 
			copyArg(msg,"NewInstancesProtectedFromScaleIn",params,undefined,false); 
			copyArg(msg,"ServiceLinkedRoleARN",params,undefined,false); 
			copyArg(msg,"MaxInstanceLifetime",params,undefined,false); 
			copyArg(msg,"CapacityRebalance",params,undefined,false); 
			copyArg(msg,"Context",params,undefined,false); 
			

			svc.updateAutoScalingGroup(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS AutoScaling", AmazonAPINode);

};
