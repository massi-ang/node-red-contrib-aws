
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

		var awsService = new AWS.OpsWorks( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.OpsWorks(msg.AWSConfig) : awsService;

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

		
		service.AssignInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"LayerIds",params,undefined,true); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"LayerIds",params,undefined,true); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"LayerIds",params,undefined,true); 
			

			svc.assignInstance(params,cb);
		}

		
		service.AssignVolume=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VolumeId",params,undefined,false); 
			
			copyArgs(n,"VolumeId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"VolumeId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.assignVolume(params,cb);
		}

		
		service.AssociateElasticIp=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ElasticIp",params,undefined,false); 
			
			copyArgs(n,"ElasticIp",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"ElasticIp",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.associateElasticIp(params,cb);
		}

		
		service.AttachElasticLoadBalancer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ElasticLoadBalancerName",params,undefined,false); 
			copyArgs(n,"LayerId",params,undefined,false); 
			
			copyArgs(n,"ElasticLoadBalancerName",params,undefined,false); 
			copyArgs(n,"LayerId",params,undefined,false); 
			
			copyArgs(msg,"ElasticLoadBalancerName",params,undefined,false); 
			copyArgs(msg,"LayerId",params,undefined,false); 
			

			svc.attachElasticLoadBalancer(params,cb);
		}

		
		service.CloneStack=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceStackId",params,undefined,false); 
			copyArgs(n,"ServiceRoleArn",params,undefined,false); 
			
			copyArgs(n,"SourceStackId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Region",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"Attributes",params,undefined,true); 
			copyArgs(n,"ServiceRoleArn",params,undefined,false); 
			copyArgs(n,"DefaultInstanceProfileArn",params,undefined,false); 
			copyArgs(n,"DefaultOs",params,undefined,false); 
			copyArgs(n,"HostnameTheme",params,undefined,false); 
			copyArgs(n,"DefaultAvailabilityZone",params,undefined,false); 
			copyArgs(n,"DefaultSubnetId",params,undefined,false); 
			copyArgs(n,"CustomJson",params,undefined,false); 
			copyArgs(n,"ConfigurationManager",params,undefined,true); 
			copyArgs(n,"ChefConfiguration",params,undefined,true); 
			copyArgs(n,"UseCustomCookbooks",params,undefined,false); 
			copyArgs(n,"UseOpsworksSecurityGroups",params,undefined,false); 
			copyArgs(n,"CustomCookbooksSource",params,undefined,true); 
			copyArgs(n,"DefaultSshKeyName",params,undefined,false); 
			copyArgs(n,"ClonePermissions",params,undefined,false); 
			copyArgs(n,"CloneAppIds",params,undefined,true); 
			copyArgs(n,"DefaultRootDeviceType",params,undefined,false); 
			copyArgs(n,"AgentVersion",params,undefined,false); 
			
			copyArgs(msg,"SourceStackId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Region",params,undefined,false); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			copyArgs(msg,"Attributes",params,undefined,true); 
			copyArgs(msg,"ServiceRoleArn",params,undefined,false); 
			copyArgs(msg,"DefaultInstanceProfileArn",params,undefined,false); 
			copyArgs(msg,"DefaultOs",params,undefined,false); 
			copyArgs(msg,"HostnameTheme",params,undefined,false); 
			copyArgs(msg,"DefaultAvailabilityZone",params,undefined,false); 
			copyArgs(msg,"DefaultSubnetId",params,undefined,false); 
			copyArgs(msg,"CustomJson",params,undefined,false); 
			copyArgs(msg,"ConfigurationManager",params,undefined,true); 
			copyArgs(msg,"ChefConfiguration",params,undefined,true); 
			copyArgs(msg,"UseCustomCookbooks",params,undefined,false); 
			copyArgs(msg,"UseOpsworksSecurityGroups",params,undefined,false); 
			copyArgs(msg,"CustomCookbooksSource",params,undefined,true); 
			copyArgs(msg,"DefaultSshKeyName",params,undefined,false); 
			copyArgs(msg,"ClonePermissions",params,undefined,false); 
			copyArgs(msg,"CloneAppIds",params,undefined,true); 
			copyArgs(msg,"DefaultRootDeviceType",params,undefined,false); 
			copyArgs(msg,"AgentVersion",params,undefined,false); 
			

			svc.cloneStack(params,cb);
		}

		
		service.CreateApp=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(n,"StackId",params,undefined,false); 
			copyArgs(n,"Shortname",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"DataSources",params,undefined,true); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"AppSource",params,undefined,true); 
			copyArgs(n,"Domains",params,undefined,true); 
			copyArgs(n,"EnableSsl",params,undefined,false); 
			copyArgs(n,"SslConfiguration",params,undefined,true); 
			copyArgs(n,"Attributes",params,undefined,true); 
			copyArgs(n,"Environment",params,undefined,true); 
			
			copyArgs(msg,"StackId",params,undefined,false); 
			copyArgs(msg,"Shortname",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DataSources",params,undefined,true); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"AppSource",params,undefined,true); 
			copyArgs(msg,"Domains",params,undefined,true); 
			copyArgs(msg,"EnableSsl",params,undefined,false); 
			copyArgs(msg,"SslConfiguration",params,undefined,true); 
			copyArgs(msg,"Attributes",params,undefined,true); 
			copyArgs(msg,"Environment",params,undefined,true); 
			

			svc.createApp(params,cb);
		}

		
		service.CreateDeployment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackId",params,undefined,false); 
			copyArgs(n,"Command",params,undefined,true); 
			
			copyArgs(n,"StackId",params,undefined,false); 
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"InstanceIds",params,undefined,true); 
			copyArgs(n,"LayerIds",params,undefined,true); 
			copyArgs(n,"Command",params,undefined,true); 
			copyArgs(n,"Comment",params,undefined,false); 
			copyArgs(n,"CustomJson",params,undefined,false); 
			
			copyArgs(msg,"StackId",params,undefined,false); 
			copyArgs(msg,"AppId",params,undefined,false); 
			copyArgs(msg,"InstanceIds",params,undefined,true); 
			copyArgs(msg,"LayerIds",params,undefined,true); 
			copyArgs(msg,"Command",params,undefined,true); 
			copyArgs(msg,"Comment",params,undefined,false); 
			copyArgs(msg,"CustomJson",params,undefined,false); 
			

			svc.createDeployment(params,cb);
		}

		
		service.CreateInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackId",params,undefined,false); 
			copyArgs(n,"LayerIds",params,undefined,true); 
			copyArgs(n,"InstanceType",params,undefined,false); 
			
			copyArgs(n,"StackId",params,undefined,false); 
			copyArgs(n,"LayerIds",params,undefined,true); 
			copyArgs(n,"InstanceType",params,undefined,false); 
			copyArgs(n,"AutoScalingType",params,undefined,false); 
			copyArgs(n,"Hostname",params,undefined,false); 
			copyArgs(n,"Os",params,undefined,false); 
			copyArgs(n,"AmiId",params,undefined,false); 
			copyArgs(n,"SshKeyName",params,undefined,false); 
			copyArgs(n,"AvailabilityZone",params,undefined,false); 
			copyArgs(n,"VirtualizationType",params,undefined,false); 
			copyArgs(n,"SubnetId",params,undefined,false); 
			copyArgs(n,"Architecture",params,undefined,false); 
			copyArgs(n,"RootDeviceType",params,undefined,false); 
			copyArgs(n,"BlockDeviceMappings",params,undefined,true); 
			copyArgs(n,"InstallUpdatesOnBoot",params,undefined,false); 
			copyArgs(n,"EbsOptimized",params,undefined,false); 
			copyArgs(n,"AgentVersion",params,undefined,false); 
			copyArgs(n,"Tenancy",params,undefined,false); 
			
			copyArgs(msg,"StackId",params,undefined,false); 
			copyArgs(msg,"LayerIds",params,undefined,true); 
			copyArgs(msg,"InstanceType",params,undefined,false); 
			copyArgs(msg,"AutoScalingType",params,undefined,false); 
			copyArgs(msg,"Hostname",params,undefined,false); 
			copyArgs(msg,"Os",params,undefined,false); 
			copyArgs(msg,"AmiId",params,undefined,false); 
			copyArgs(msg,"SshKeyName",params,undefined,false); 
			copyArgs(msg,"AvailabilityZone",params,undefined,false); 
			copyArgs(msg,"VirtualizationType",params,undefined,false); 
			copyArgs(msg,"SubnetId",params,undefined,false); 
			copyArgs(msg,"Architecture",params,undefined,false); 
			copyArgs(msg,"RootDeviceType",params,undefined,false); 
			copyArgs(msg,"BlockDeviceMappings",params,undefined,true); 
			copyArgs(msg,"InstallUpdatesOnBoot",params,undefined,false); 
			copyArgs(msg,"EbsOptimized",params,undefined,false); 
			copyArgs(msg,"AgentVersion",params,undefined,false); 
			copyArgs(msg,"Tenancy",params,undefined,false); 
			

			svc.createInstance(params,cb);
		}

		
		service.CreateLayer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackId",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Shortname",params,undefined,false); 
			
			copyArgs(n,"StackId",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Shortname",params,undefined,false); 
			copyArgs(n,"Attributes",params,undefined,true); 
			copyArgs(n,"CloudWatchLogsConfiguration",params,undefined,true); 
			copyArgs(n,"CustomInstanceProfileArn",params,undefined,false); 
			copyArgs(n,"CustomJson",params,undefined,false); 
			copyArgs(n,"CustomSecurityGroupIds",params,undefined,true); 
			copyArgs(n,"Packages",params,undefined,true); 
			copyArgs(n,"VolumeConfigurations",params,undefined,true); 
			copyArgs(n,"EnableAutoHealing",params,undefined,false); 
			copyArgs(n,"AutoAssignElasticIps",params,undefined,false); 
			copyArgs(n,"AutoAssignPublicIps",params,undefined,false); 
			copyArgs(n,"CustomRecipes",params,undefined,true); 
			copyArgs(n,"InstallUpdatesOnBoot",params,undefined,false); 
			copyArgs(n,"UseEbsOptimizedInstances",params,undefined,false); 
			copyArgs(n,"LifecycleEventConfiguration",params,undefined,true); 
			
			copyArgs(msg,"StackId",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Shortname",params,undefined,false); 
			copyArgs(msg,"Attributes",params,undefined,true); 
			copyArgs(msg,"CloudWatchLogsConfiguration",params,undefined,true); 
			copyArgs(msg,"CustomInstanceProfileArn",params,undefined,false); 
			copyArgs(msg,"CustomJson",params,undefined,false); 
			copyArgs(msg,"CustomSecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"Packages",params,undefined,true); 
			copyArgs(msg,"VolumeConfigurations",params,undefined,true); 
			copyArgs(msg,"EnableAutoHealing",params,undefined,false); 
			copyArgs(msg,"AutoAssignElasticIps",params,undefined,false); 
			copyArgs(msg,"AutoAssignPublicIps",params,undefined,false); 
			copyArgs(msg,"CustomRecipes",params,undefined,true); 
			copyArgs(msg,"InstallUpdatesOnBoot",params,undefined,false); 
			copyArgs(msg,"UseEbsOptimizedInstances",params,undefined,false); 
			copyArgs(msg,"LifecycleEventConfiguration",params,undefined,true); 
			

			svc.createLayer(params,cb);
		}

		
		service.CreateStack=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Region",params,undefined,false); 
			copyArgs(n,"ServiceRoleArn",params,undefined,false); 
			copyArgs(n,"DefaultInstanceProfileArn",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Region",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"Attributes",params,undefined,true); 
			copyArgs(n,"ServiceRoleArn",params,undefined,false); 
			copyArgs(n,"DefaultInstanceProfileArn",params,undefined,false); 
			copyArgs(n,"DefaultOs",params,undefined,false); 
			copyArgs(n,"HostnameTheme",params,undefined,false); 
			copyArgs(n,"DefaultAvailabilityZone",params,undefined,false); 
			copyArgs(n,"DefaultSubnetId",params,undefined,false); 
			copyArgs(n,"CustomJson",params,undefined,false); 
			copyArgs(n,"ConfigurationManager",params,undefined,true); 
			copyArgs(n,"ChefConfiguration",params,undefined,true); 
			copyArgs(n,"UseCustomCookbooks",params,undefined,false); 
			copyArgs(n,"UseOpsworksSecurityGroups",params,undefined,false); 
			copyArgs(n,"CustomCookbooksSource",params,undefined,true); 
			copyArgs(n,"DefaultSshKeyName",params,undefined,false); 
			copyArgs(n,"DefaultRootDeviceType",params,undefined,false); 
			copyArgs(n,"AgentVersion",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Region",params,undefined,false); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			copyArgs(msg,"Attributes",params,undefined,true); 
			copyArgs(msg,"ServiceRoleArn",params,undefined,false); 
			copyArgs(msg,"DefaultInstanceProfileArn",params,undefined,false); 
			copyArgs(msg,"DefaultOs",params,undefined,false); 
			copyArgs(msg,"HostnameTheme",params,undefined,false); 
			copyArgs(msg,"DefaultAvailabilityZone",params,undefined,false); 
			copyArgs(msg,"DefaultSubnetId",params,undefined,false); 
			copyArgs(msg,"CustomJson",params,undefined,false); 
			copyArgs(msg,"ConfigurationManager",params,undefined,true); 
			copyArgs(msg,"ChefConfiguration",params,undefined,true); 
			copyArgs(msg,"UseCustomCookbooks",params,undefined,false); 
			copyArgs(msg,"UseOpsworksSecurityGroups",params,undefined,false); 
			copyArgs(msg,"CustomCookbooksSource",params,undefined,true); 
			copyArgs(msg,"DefaultSshKeyName",params,undefined,false); 
			copyArgs(msg,"DefaultRootDeviceType",params,undefined,false); 
			copyArgs(msg,"AgentVersion",params,undefined,false); 
			

			svc.createStack(params,cb);
		}

		
		service.CreateUserProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IamUserArn",params,undefined,false); 
			
			copyArgs(n,"IamUserArn",params,undefined,false); 
			copyArgs(n,"SshUsername",params,undefined,false); 
			copyArgs(n,"SshPublicKey",params,undefined,false); 
			copyArgs(n,"AllowSelfManagement",params,undefined,false); 
			
			copyArgs(msg,"IamUserArn",params,undefined,false); 
			copyArgs(msg,"SshUsername",params,undefined,false); 
			copyArgs(msg,"SshPublicKey",params,undefined,false); 
			copyArgs(msg,"AllowSelfManagement",params,undefined,false); 
			

			svc.createUserProfile(params,cb);
		}

		
		service.DeleteApp=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppId",params,undefined,false); 
			
			copyArgs(n,"AppId",params,undefined,false); 
			
			copyArgs(msg,"AppId",params,undefined,false); 
			

			svc.deleteApp(params,cb);
		}

		
		service.DeleteInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"DeleteElasticIp",params,undefined,false); 
			copyArgs(n,"DeleteVolumes",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"DeleteElasticIp",params,undefined,false); 
			copyArgs(msg,"DeleteVolumes",params,undefined,false); 
			

			svc.deleteInstance(params,cb);
		}

		
		service.DeleteLayer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LayerId",params,undefined,false); 
			
			copyArgs(n,"LayerId",params,undefined,false); 
			
			copyArgs(msg,"LayerId",params,undefined,false); 
			

			svc.deleteLayer(params,cb);
		}

		
		service.DeleteStack=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackId",params,undefined,false); 
			
			copyArgs(n,"StackId",params,undefined,false); 
			
			copyArgs(msg,"StackId",params,undefined,false); 
			

			svc.deleteStack(params,cb);
		}

		
		service.DeleteUserProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IamUserArn",params,undefined,false); 
			
			copyArgs(n,"IamUserArn",params,undefined,false); 
			
			copyArgs(msg,"IamUserArn",params,undefined,false); 
			

			svc.deleteUserProfile(params,cb);
		}

		
		service.DeregisterEcsCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EcsClusterArn",params,undefined,false); 
			
			copyArgs(n,"EcsClusterArn",params,undefined,false); 
			
			copyArgs(msg,"EcsClusterArn",params,undefined,false); 
			

			svc.deregisterEcsCluster(params,cb);
		}

		
		service.DeregisterElasticIp=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ElasticIp",params,undefined,false); 
			
			copyArgs(n,"ElasticIp",params,undefined,false); 
			
			copyArgs(msg,"ElasticIp",params,undefined,false); 
			

			svc.deregisterElasticIp(params,cb);
		}

		
		service.DeregisterInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.deregisterInstance(params,cb);
		}

		
		service.DeregisterRdsDbInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RdsDbInstanceArn",params,undefined,false); 
			
			copyArgs(n,"RdsDbInstanceArn",params,undefined,false); 
			
			copyArgs(msg,"RdsDbInstanceArn",params,undefined,false); 
			

			svc.deregisterRdsDbInstance(params,cb);
		}

		
		service.DeregisterVolume=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VolumeId",params,undefined,false); 
			
			copyArgs(n,"VolumeId",params,undefined,false); 
			
			copyArgs(msg,"VolumeId",params,undefined,false); 
			

			svc.deregisterVolume(params,cb);
		}

		
		service.DescribeAgentVersions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"StackId",params,undefined,false); 
			copyArgs(n,"ConfigurationManager",params,undefined,true); 
			
			copyArgs(msg,"StackId",params,undefined,false); 
			copyArgs(msg,"ConfigurationManager",params,undefined,true); 
			

			svc.describeAgentVersions(params,cb);
		}

		
		service.DescribeApps=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"StackId",params,undefined,false); 
			copyArgs(n,"AppIds",params,undefined,true); 
			
			copyArgs(msg,"StackId",params,undefined,false); 
			copyArgs(msg,"AppIds",params,undefined,true); 
			

			svc.describeApps(params,cb);
		}

		
		service.DescribeCommands=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DeploymentId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"CommandIds",params,undefined,true); 
			
			copyArgs(msg,"DeploymentId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"CommandIds",params,undefined,true); 
			

			svc.describeCommands(params,cb);
		}

		
		service.DescribeDeployments=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"StackId",params,undefined,false); 
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"DeploymentIds",params,undefined,true); 
			
			copyArgs(msg,"StackId",params,undefined,false); 
			copyArgs(msg,"AppId",params,undefined,false); 
			copyArgs(msg,"DeploymentIds",params,undefined,true); 
			

			svc.describeDeployments(params,cb);
		}

		
		service.DescribeEcsClusters=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"EcsClusterArns",params,undefined,true); 
			copyArgs(n,"StackId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"EcsClusterArns",params,undefined,true); 
			copyArgs(msg,"StackId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeEcsClusters(params,cb);
		}

		
		service.DescribeElasticIps=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"StackId",params,undefined,false); 
			copyArgs(n,"Ips",params,undefined,true); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"StackId",params,undefined,false); 
			copyArgs(msg,"Ips",params,undefined,true); 
			

			svc.describeElasticIps(params,cb);
		}

		
		service.DescribeElasticLoadBalancers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"StackId",params,undefined,false); 
			copyArgs(n,"LayerIds",params,undefined,true); 
			
			copyArgs(msg,"StackId",params,undefined,false); 
			copyArgs(msg,"LayerIds",params,undefined,true); 
			

			svc.describeElasticLoadBalancers(params,cb);
		}

		
		service.DescribeInstances=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"StackId",params,undefined,false); 
			copyArgs(n,"LayerId",params,undefined,false); 
			copyArgs(n,"InstanceIds",params,undefined,true); 
			
			copyArgs(msg,"StackId",params,undefined,false); 
			copyArgs(msg,"LayerId",params,undefined,false); 
			copyArgs(msg,"InstanceIds",params,undefined,true); 
			

			svc.describeInstances(params,cb);
		}

		
		service.DescribeLayers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"StackId",params,undefined,false); 
			copyArgs(n,"LayerIds",params,undefined,true); 
			
			copyArgs(msg,"StackId",params,undefined,false); 
			copyArgs(msg,"LayerIds",params,undefined,true); 
			

			svc.describeLayers(params,cb);
		}

		
		service.DescribeLoadBasedAutoScaling=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LayerIds",params,undefined,true); 
			
			copyArgs(n,"LayerIds",params,undefined,true); 
			
			copyArgs(msg,"LayerIds",params,undefined,true); 
			

			svc.describeLoadBasedAutoScaling(params,cb);
		}

		
		service.DescribeMyUserProfile=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeMyUserProfile(params,cb);
		}

		
		service.DescribeOperatingSystems=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeOperatingSystems(params,cb);
		}

		
		service.DescribePermissions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"IamUserArn",params,undefined,false); 
			copyArgs(n,"StackId",params,undefined,false); 
			
			copyArgs(msg,"IamUserArn",params,undefined,false); 
			copyArgs(msg,"StackId",params,undefined,false); 
			

			svc.describePermissions(params,cb);
		}

		
		service.DescribeRaidArrays=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"StackId",params,undefined,false); 
			copyArgs(n,"RaidArrayIds",params,undefined,true); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"StackId",params,undefined,false); 
			copyArgs(msg,"RaidArrayIds",params,undefined,true); 
			

			svc.describeRaidArrays(params,cb);
		}

		
		service.DescribeRdsDbInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackId",params,undefined,false); 
			
			copyArgs(n,"StackId",params,undefined,false); 
			copyArgs(n,"RdsDbInstanceArns",params,undefined,true); 
			
			copyArgs(msg,"StackId",params,undefined,false); 
			copyArgs(msg,"RdsDbInstanceArns",params,undefined,true); 
			

			svc.describeRdsDbInstances(params,cb);
		}

		
		service.DescribeServiceErrors=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"StackId",params,undefined,false); 
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"ServiceErrorIds",params,undefined,true); 
			
			copyArgs(msg,"StackId",params,undefined,false); 
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"ServiceErrorIds",params,undefined,true); 
			

			svc.describeServiceErrors(params,cb);
		}

		
		service.DescribeStackProvisioningParameters=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackId",params,undefined,false); 
			
			copyArgs(n,"StackId",params,undefined,false); 
			
			copyArgs(msg,"StackId",params,undefined,false); 
			

			svc.describeStackProvisioningParameters(params,cb);
		}

		
		service.DescribeStackSummary=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackId",params,undefined,false); 
			
			copyArgs(n,"StackId",params,undefined,false); 
			
			copyArgs(msg,"StackId",params,undefined,false); 
			

			svc.describeStackSummary(params,cb);
		}

		
		service.DescribeStacks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"StackIds",params,undefined,true); 
			
			copyArgs(msg,"StackIds",params,undefined,true); 
			

			svc.describeStacks(params,cb);
		}

		
		service.DescribeTimeBasedAutoScaling=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceIds",params,undefined,true); 
			
			copyArgs(n,"InstanceIds",params,undefined,true); 
			
			copyArgs(msg,"InstanceIds",params,undefined,true); 
			

			svc.describeTimeBasedAutoScaling(params,cb);
		}

		
		service.DescribeUserProfiles=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"IamUserArns",params,undefined,true); 
			
			copyArgs(msg,"IamUserArns",params,undefined,true); 
			

			svc.describeUserProfiles(params,cb);
		}

		
		service.DescribeVolumes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"StackId",params,undefined,false); 
			copyArgs(n,"RaidArrayId",params,undefined,false); 
			copyArgs(n,"VolumeIds",params,undefined,true); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"StackId",params,undefined,false); 
			copyArgs(msg,"RaidArrayId",params,undefined,false); 
			copyArgs(msg,"VolumeIds",params,undefined,true); 
			

			svc.describeVolumes(params,cb);
		}

		
		service.DetachElasticLoadBalancer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ElasticLoadBalancerName",params,undefined,false); 
			copyArgs(n,"LayerId",params,undefined,false); 
			
			copyArgs(n,"ElasticLoadBalancerName",params,undefined,false); 
			copyArgs(n,"LayerId",params,undefined,false); 
			
			copyArgs(msg,"ElasticLoadBalancerName",params,undefined,false); 
			copyArgs(msg,"LayerId",params,undefined,false); 
			

			svc.detachElasticLoadBalancer(params,cb);
		}

		
		service.DisassociateElasticIp=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ElasticIp",params,undefined,false); 
			
			copyArgs(n,"ElasticIp",params,undefined,false); 
			
			copyArgs(msg,"ElasticIp",params,undefined,false); 
			

			svc.disassociateElasticIp(params,cb);
		}

		
		service.GetHostnameSuggestion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LayerId",params,undefined,false); 
			
			copyArgs(n,"LayerId",params,undefined,false); 
			
			copyArgs(msg,"LayerId",params,undefined,false); 
			

			svc.getHostnameSuggestion(params,cb);
		}

		
		service.GrantAccess=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"ValidForInMinutes",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"ValidForInMinutes",params,undefined,false); 
			

			svc.grantAccess(params,cb);
		}

		
		service.ListTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listTags(params,cb);
		}

		
		service.RebootInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.rebootInstance(params,cb);
		}

		
		service.RegisterEcsCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EcsClusterArn",params,undefined,false); 
			copyArgs(n,"StackId",params,undefined,false); 
			
			copyArgs(n,"EcsClusterArn",params,undefined,false); 
			copyArgs(n,"StackId",params,undefined,false); 
			
			copyArgs(msg,"EcsClusterArn",params,undefined,false); 
			copyArgs(msg,"StackId",params,undefined,false); 
			

			svc.registerEcsCluster(params,cb);
		}

		
		service.RegisterElasticIp=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ElasticIp",params,undefined,false); 
			copyArgs(n,"StackId",params,undefined,false); 
			
			copyArgs(n,"ElasticIp",params,undefined,false); 
			copyArgs(n,"StackId",params,undefined,false); 
			
			copyArgs(msg,"ElasticIp",params,undefined,false); 
			copyArgs(msg,"StackId",params,undefined,false); 
			

			svc.registerElasticIp(params,cb);
		}

		
		service.RegisterInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackId",params,undefined,false); 
			
			copyArgs(n,"StackId",params,undefined,false); 
			copyArgs(n,"Hostname",params,undefined,false); 
			copyArgs(n,"PublicIp",params,undefined,false); 
			copyArgs(n,"PrivateIp",params,undefined,false); 
			copyArgs(n,"RsaPublicKey",params,undefined,false); 
			copyArgs(n,"RsaPublicKeyFingerprint",params,undefined,false); 
			copyArgs(n,"InstanceIdentity",params,undefined,false); 
			
			copyArgs(msg,"StackId",params,undefined,false); 
			copyArgs(msg,"Hostname",params,undefined,false); 
			copyArgs(msg,"PublicIp",params,undefined,false); 
			copyArgs(msg,"PrivateIp",params,undefined,false); 
			copyArgs(msg,"RsaPublicKey",params,undefined,false); 
			copyArgs(msg,"RsaPublicKeyFingerprint",params,undefined,false); 
			copyArgs(msg,"InstanceIdentity",params,undefined,false); 
			

			svc.registerInstance(params,cb);
		}

		
		service.RegisterRdsDbInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackId",params,undefined,false); 
			copyArgs(n,"RdsDbInstanceArn",params,undefined,false); 
			copyArgs(n,"DbUser",params,undefined,false); 
			copyArgs(n,"DbPassword",params,undefined,false); 
			
			copyArgs(n,"StackId",params,undefined,false); 
			copyArgs(n,"RdsDbInstanceArn",params,undefined,false); 
			copyArgs(n,"DbUser",params,undefined,false); 
			copyArgs(n,"DbPassword",params,undefined,false); 
			
			copyArgs(msg,"StackId",params,undefined,false); 
			copyArgs(msg,"RdsDbInstanceArn",params,undefined,false); 
			copyArgs(msg,"DbUser",params,undefined,false); 
			copyArgs(msg,"DbPassword",params,undefined,false); 
			

			svc.registerRdsDbInstance(params,cb);
		}

		
		service.RegisterVolume=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackId",params,undefined,false); 
			
			copyArgs(n,"Ec2VolumeId",params,undefined,false); 
			copyArgs(n,"StackId",params,undefined,false); 
			
			copyArgs(msg,"Ec2VolumeId",params,undefined,false); 
			copyArgs(msg,"StackId",params,undefined,false); 
			

			svc.registerVolume(params,cb);
		}

		
		service.SetLoadBasedAutoScaling=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LayerId",params,undefined,false); 
			
			copyArgs(n,"LayerId",params,undefined,false); 
			copyArgs(n,"Enable",params,undefined,false); 
			copyArgs(n,"UpScaling",params,undefined,true); 
			copyArgs(n,"DownScaling",params,undefined,true); 
			
			copyArgs(msg,"LayerId",params,undefined,false); 
			copyArgs(msg,"Enable",params,undefined,false); 
			copyArgs(msg,"UpScaling",params,undefined,true); 
			copyArgs(msg,"DownScaling",params,undefined,true); 
			

			svc.setLoadBasedAutoScaling(params,cb);
		}

		
		service.SetPermission=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackId",params,undefined,false); 
			copyArgs(n,"IamUserArn",params,undefined,false); 
			
			copyArgs(n,"StackId",params,undefined,false); 
			copyArgs(n,"IamUserArn",params,undefined,false); 
			copyArgs(n,"AllowSsh",params,undefined,false); 
			copyArgs(n,"AllowSudo",params,undefined,false); 
			copyArgs(n,"Level",params,undefined,false); 
			
			copyArgs(msg,"StackId",params,undefined,false); 
			copyArgs(msg,"IamUserArn",params,undefined,false); 
			copyArgs(msg,"AllowSsh",params,undefined,false); 
			copyArgs(msg,"AllowSudo",params,undefined,false); 
			copyArgs(msg,"Level",params,undefined,false); 
			

			svc.setPermission(params,cb);
		}

		
		service.SetTimeBasedAutoScaling=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"AutoScalingSchedule",params,undefined,true); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"AutoScalingSchedule",params,undefined,true); 
			

			svc.setTimeBasedAutoScaling(params,cb);
		}

		
		service.StartInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.startInstance(params,cb);
		}

		
		service.StartStack=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackId",params,undefined,false); 
			
			copyArgs(n,"StackId",params,undefined,false); 
			
			copyArgs(msg,"StackId",params,undefined,false); 
			

			svc.startStack(params,cb);
		}

		
		service.StopInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"Force",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"Force",params,undefined,false); 
			

			svc.stopInstance(params,cb);
		}

		
		service.StopStack=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackId",params,undefined,false); 
			
			copyArgs(n,"StackId",params,undefined,false); 
			
			copyArgs(msg,"StackId",params,undefined,false); 
			

			svc.stopStack(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UnassignInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			

			svc.unassignInstance(params,cb);
		}

		
		service.UnassignVolume=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VolumeId",params,undefined,false); 
			
			copyArgs(n,"VolumeId",params,undefined,false); 
			
			copyArgs(msg,"VolumeId",params,undefined,false); 
			

			svc.unassignVolume(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateApp=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AppId",params,undefined,false); 
			
			copyArgs(n,"AppId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"DataSources",params,undefined,true); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"AppSource",params,undefined,true); 
			copyArgs(n,"Domains",params,undefined,true); 
			copyArgs(n,"EnableSsl",params,undefined,false); 
			copyArgs(n,"SslConfiguration",params,undefined,true); 
			copyArgs(n,"Attributes",params,undefined,true); 
			copyArgs(n,"Environment",params,undefined,true); 
			
			copyArgs(msg,"AppId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DataSources",params,undefined,true); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"AppSource",params,undefined,true); 
			copyArgs(msg,"Domains",params,undefined,true); 
			copyArgs(msg,"EnableSsl",params,undefined,false); 
			copyArgs(msg,"SslConfiguration",params,undefined,true); 
			copyArgs(msg,"Attributes",params,undefined,true); 
			copyArgs(msg,"Environment",params,undefined,true); 
			

			svc.updateApp(params,cb);
		}

		
		service.UpdateElasticIp=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ElasticIp",params,undefined,false); 
			
			copyArgs(n,"ElasticIp",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"ElasticIp",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.updateElasticIp(params,cb);
		}

		
		service.UpdateInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			
			copyArgs(n,"InstanceId",params,undefined,false); 
			copyArgs(n,"LayerIds",params,undefined,true); 
			copyArgs(n,"InstanceType",params,undefined,false); 
			copyArgs(n,"AutoScalingType",params,undefined,false); 
			copyArgs(n,"Hostname",params,undefined,false); 
			copyArgs(n,"Os",params,undefined,false); 
			copyArgs(n,"AmiId",params,undefined,false); 
			copyArgs(n,"SshKeyName",params,undefined,false); 
			copyArgs(n,"Architecture",params,undefined,false); 
			copyArgs(n,"InstallUpdatesOnBoot",params,undefined,false); 
			copyArgs(n,"EbsOptimized",params,undefined,false); 
			copyArgs(n,"AgentVersion",params,undefined,false); 
			
			copyArgs(msg,"InstanceId",params,undefined,false); 
			copyArgs(msg,"LayerIds",params,undefined,true); 
			copyArgs(msg,"InstanceType",params,undefined,false); 
			copyArgs(msg,"AutoScalingType",params,undefined,false); 
			copyArgs(msg,"Hostname",params,undefined,false); 
			copyArgs(msg,"Os",params,undefined,false); 
			copyArgs(msg,"AmiId",params,undefined,false); 
			copyArgs(msg,"SshKeyName",params,undefined,false); 
			copyArgs(msg,"Architecture",params,undefined,false); 
			copyArgs(msg,"InstallUpdatesOnBoot",params,undefined,false); 
			copyArgs(msg,"EbsOptimized",params,undefined,false); 
			copyArgs(msg,"AgentVersion",params,undefined,false); 
			

			svc.updateInstance(params,cb);
		}

		
		service.UpdateLayer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LayerId",params,undefined,false); 
			
			copyArgs(n,"LayerId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Shortname",params,undefined,false); 
			copyArgs(n,"Attributes",params,undefined,true); 
			copyArgs(n,"CloudWatchLogsConfiguration",params,undefined,true); 
			copyArgs(n,"CustomInstanceProfileArn",params,undefined,false); 
			copyArgs(n,"CustomJson",params,undefined,false); 
			copyArgs(n,"CustomSecurityGroupIds",params,undefined,true); 
			copyArgs(n,"Packages",params,undefined,true); 
			copyArgs(n,"VolumeConfigurations",params,undefined,true); 
			copyArgs(n,"EnableAutoHealing",params,undefined,false); 
			copyArgs(n,"AutoAssignElasticIps",params,undefined,false); 
			copyArgs(n,"AutoAssignPublicIps",params,undefined,false); 
			copyArgs(n,"CustomRecipes",params,undefined,true); 
			copyArgs(n,"InstallUpdatesOnBoot",params,undefined,false); 
			copyArgs(n,"UseEbsOptimizedInstances",params,undefined,false); 
			copyArgs(n,"LifecycleEventConfiguration",params,undefined,true); 
			
			copyArgs(msg,"LayerId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Shortname",params,undefined,false); 
			copyArgs(msg,"Attributes",params,undefined,true); 
			copyArgs(msg,"CloudWatchLogsConfiguration",params,undefined,true); 
			copyArgs(msg,"CustomInstanceProfileArn",params,undefined,false); 
			copyArgs(msg,"CustomJson",params,undefined,false); 
			copyArgs(msg,"CustomSecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"Packages",params,undefined,true); 
			copyArgs(msg,"VolumeConfigurations",params,undefined,true); 
			copyArgs(msg,"EnableAutoHealing",params,undefined,false); 
			copyArgs(msg,"AutoAssignElasticIps",params,undefined,false); 
			copyArgs(msg,"AutoAssignPublicIps",params,undefined,false); 
			copyArgs(msg,"CustomRecipes",params,undefined,true); 
			copyArgs(msg,"InstallUpdatesOnBoot",params,undefined,false); 
			copyArgs(msg,"UseEbsOptimizedInstances",params,undefined,false); 
			copyArgs(msg,"LifecycleEventConfiguration",params,undefined,true); 
			

			svc.updateLayer(params,cb);
		}

		
		service.UpdateMyUserProfile=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SshPublicKey",params,undefined,false); 
			
			copyArgs(msg,"SshPublicKey",params,undefined,false); 
			

			svc.updateMyUserProfile(params,cb);
		}

		
		service.UpdateRdsDbInstance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RdsDbInstanceArn",params,undefined,false); 
			
			copyArgs(n,"RdsDbInstanceArn",params,undefined,false); 
			copyArgs(n,"DbUser",params,undefined,false); 
			copyArgs(n,"DbPassword",params,undefined,false); 
			
			copyArgs(msg,"RdsDbInstanceArn",params,undefined,false); 
			copyArgs(msg,"DbUser",params,undefined,false); 
			copyArgs(msg,"DbPassword",params,undefined,false); 
			

			svc.updateRdsDbInstance(params,cb);
		}

		
		service.UpdateStack=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackId",params,undefined,false); 
			
			copyArgs(n,"StackId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Attributes",params,undefined,true); 
			copyArgs(n,"ServiceRoleArn",params,undefined,false); 
			copyArgs(n,"DefaultInstanceProfileArn",params,undefined,false); 
			copyArgs(n,"DefaultOs",params,undefined,false); 
			copyArgs(n,"HostnameTheme",params,undefined,false); 
			copyArgs(n,"DefaultAvailabilityZone",params,undefined,false); 
			copyArgs(n,"DefaultSubnetId",params,undefined,false); 
			copyArgs(n,"CustomJson",params,undefined,false); 
			copyArgs(n,"ConfigurationManager",params,undefined,true); 
			copyArgs(n,"ChefConfiguration",params,undefined,true); 
			copyArgs(n,"UseCustomCookbooks",params,undefined,false); 
			copyArgs(n,"CustomCookbooksSource",params,undefined,true); 
			copyArgs(n,"DefaultSshKeyName",params,undefined,false); 
			copyArgs(n,"DefaultRootDeviceType",params,undefined,false); 
			copyArgs(n,"UseOpsworksSecurityGroups",params,undefined,false); 
			copyArgs(n,"AgentVersion",params,undefined,false); 
			
			copyArgs(msg,"StackId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Attributes",params,undefined,true); 
			copyArgs(msg,"ServiceRoleArn",params,undefined,false); 
			copyArgs(msg,"DefaultInstanceProfileArn",params,undefined,false); 
			copyArgs(msg,"DefaultOs",params,undefined,false); 
			copyArgs(msg,"HostnameTheme",params,undefined,false); 
			copyArgs(msg,"DefaultAvailabilityZone",params,undefined,false); 
			copyArgs(msg,"DefaultSubnetId",params,undefined,false); 
			copyArgs(msg,"CustomJson",params,undefined,false); 
			copyArgs(msg,"ConfigurationManager",params,undefined,true); 
			copyArgs(msg,"ChefConfiguration",params,undefined,true); 
			copyArgs(msg,"UseCustomCookbooks",params,undefined,false); 
			copyArgs(msg,"CustomCookbooksSource",params,undefined,true); 
			copyArgs(msg,"DefaultSshKeyName",params,undefined,false); 
			copyArgs(msg,"DefaultRootDeviceType",params,undefined,false); 
			copyArgs(msg,"UseOpsworksSecurityGroups",params,undefined,false); 
			copyArgs(msg,"AgentVersion",params,undefined,false); 
			

			svc.updateStack(params,cb);
		}

		
		service.UpdateUserProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IamUserArn",params,undefined,false); 
			
			copyArgs(n,"IamUserArn",params,undefined,false); 
			copyArgs(n,"SshUsername",params,undefined,false); 
			copyArgs(n,"SshPublicKey",params,undefined,false); 
			copyArgs(n,"AllowSelfManagement",params,undefined,false); 
			
			copyArgs(msg,"IamUserArn",params,undefined,false); 
			copyArgs(msg,"SshUsername",params,undefined,false); 
			copyArgs(msg,"SshPublicKey",params,undefined,false); 
			copyArgs(msg,"AllowSelfManagement",params,undefined,false); 
			

			svc.updateUserProfile(params,cb);
		}

		
		service.UpdateVolume=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VolumeId",params,undefined,false); 
			
			copyArgs(n,"VolumeId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"MountPoint",params,undefined,false); 
			
			copyArgs(msg,"VolumeId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"MountPoint",params,undefined,false); 
			

			svc.updateVolume(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS OpsWorks", AmazonAPINode);

};
