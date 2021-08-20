
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

		var awsService = new AWS.OpsWorks( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.OpsWorks(msg.AWSConfig) : awsService;

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

		
		service.AssignInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			copyArg(n,"LayerIds",params,undefined,true); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"LayerIds",params,undefined,true); 
			

			svc.assignInstance(params,cb);
		}

		
		service.AssignVolume=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VolumeId",params,undefined,false); 
			
			copyArg(msg,"VolumeId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.assignVolume(params,cb);
		}

		
		service.AssociateElasticIp=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ElasticIp",params,undefined,false); 
			
			copyArg(msg,"ElasticIp",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.associateElasticIp(params,cb);
		}

		
		service.AttachElasticLoadBalancer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ElasticLoadBalancerName",params,undefined,false); 
			copyArg(n,"LayerId",params,undefined,false); 
			
			copyArg(msg,"ElasticLoadBalancerName",params,undefined,false); 
			copyArg(msg,"LayerId",params,undefined,false); 
			

			svc.attachElasticLoadBalancer(params,cb);
		}

		
		service.CloneStack=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceStackId",params,undefined,false); 
			copyArg(n,"ServiceRoleArn",params,undefined,false); 
			
			copyArg(msg,"SourceStackId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Region",params,undefined,false); 
			copyArg(msg,"VpcId",params,undefined,false); 
			copyArg(msg,"Attributes",params,undefined,true); 
			copyArg(msg,"ServiceRoleArn",params,undefined,false); 
			copyArg(msg,"DefaultInstanceProfileArn",params,undefined,false); 
			copyArg(msg,"DefaultOs",params,undefined,false); 
			copyArg(msg,"HostnameTheme",params,undefined,false); 
			copyArg(msg,"DefaultAvailabilityZone",params,undefined,false); 
			copyArg(msg,"DefaultSubnetId",params,undefined,false); 
			copyArg(msg,"CustomJson",params,undefined,false); 
			copyArg(msg,"ConfigurationManager",params,undefined,true); 
			copyArg(msg,"ChefConfiguration",params,undefined,true); 
			copyArg(msg,"UseCustomCookbooks",params,undefined,false); 
			copyArg(msg,"UseOpsworksSecurityGroups",params,undefined,false); 
			copyArg(msg,"CustomCookbooksSource",params,undefined,true); 
			copyArg(msg,"DefaultSshKeyName",params,undefined,false); 
			copyArg(msg,"ClonePermissions",params,undefined,false); 
			copyArg(msg,"CloneAppIds",params,undefined,true); 
			copyArg(msg,"DefaultRootDeviceType",params,undefined,false); 
			copyArg(msg,"AgentVersion",params,undefined,false); 
			

			svc.cloneStack(params,cb);
		}

		
		service.CreateApp=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Type",params,undefined,false); 
			
			copyArg(msg,"StackId",params,undefined,false); 
			copyArg(msg,"Shortname",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DataSources",params,undefined,true); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"AppSource",params,undefined,true); 
			copyArg(msg,"Domains",params,undefined,true); 
			copyArg(msg,"EnableSsl",params,undefined,false); 
			copyArg(msg,"SslConfiguration",params,undefined,true); 
			copyArg(msg,"Attributes",params,undefined,true); 
			copyArg(msg,"Environment",params,undefined,true); 
			

			svc.createApp(params,cb);
		}

		
		service.CreateDeployment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackId",params,undefined,false); 
			copyArg(n,"Command",params,undefined,true); 
			
			copyArg(msg,"StackId",params,undefined,false); 
			copyArg(msg,"AppId",params,undefined,false); 
			copyArg(msg,"InstanceIds",params,undefined,true); 
			copyArg(msg,"LayerIds",params,undefined,true); 
			copyArg(msg,"Command",params,undefined,true); 
			copyArg(msg,"Comment",params,undefined,false); 
			copyArg(msg,"CustomJson",params,undefined,false); 
			

			svc.createDeployment(params,cb);
		}

		
		service.CreateInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackId",params,undefined,false); 
			copyArg(n,"LayerIds",params,undefined,true); 
			copyArg(n,"InstanceType",params,undefined,false); 
			
			copyArg(msg,"StackId",params,undefined,false); 
			copyArg(msg,"LayerIds",params,undefined,true); 
			copyArg(msg,"InstanceType",params,undefined,false); 
			copyArg(msg,"AutoScalingType",params,undefined,false); 
			copyArg(msg,"Hostname",params,undefined,false); 
			copyArg(msg,"Os",params,undefined,false); 
			copyArg(msg,"AmiId",params,undefined,false); 
			copyArg(msg,"SshKeyName",params,undefined,false); 
			copyArg(msg,"AvailabilityZone",params,undefined,false); 
			copyArg(msg,"VirtualizationType",params,undefined,false); 
			copyArg(msg,"SubnetId",params,undefined,false); 
			copyArg(msg,"Architecture",params,undefined,false); 
			copyArg(msg,"RootDeviceType",params,undefined,false); 
			copyArg(msg,"BlockDeviceMappings",params,undefined,true); 
			copyArg(msg,"InstallUpdatesOnBoot",params,undefined,false); 
			copyArg(msg,"EbsOptimized",params,undefined,false); 
			copyArg(msg,"AgentVersion",params,undefined,false); 
			copyArg(msg,"Tenancy",params,undefined,false); 
			

			svc.createInstance(params,cb);
		}

		
		service.CreateLayer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackId",params,undefined,false); 
			copyArg(n,"Type",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Shortname",params,undefined,false); 
			
			copyArg(msg,"StackId",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Shortname",params,undefined,false); 
			copyArg(msg,"Attributes",params,undefined,true); 
			copyArg(msg,"CloudWatchLogsConfiguration",params,undefined,true); 
			copyArg(msg,"CustomInstanceProfileArn",params,undefined,false); 
			copyArg(msg,"CustomJson",params,undefined,false); 
			copyArg(msg,"CustomSecurityGroupIds",params,undefined,true); 
			copyArg(msg,"Packages",params,undefined,true); 
			copyArg(msg,"VolumeConfigurations",params,undefined,true); 
			copyArg(msg,"EnableAutoHealing",params,undefined,false); 
			copyArg(msg,"AutoAssignElasticIps",params,undefined,false); 
			copyArg(msg,"AutoAssignPublicIps",params,undefined,false); 
			copyArg(msg,"CustomRecipes",params,undefined,true); 
			copyArg(msg,"InstallUpdatesOnBoot",params,undefined,false); 
			copyArg(msg,"UseEbsOptimizedInstances",params,undefined,false); 
			copyArg(msg,"LifecycleEventConfiguration",params,undefined,true); 
			

			svc.createLayer(params,cb);
		}

		
		service.CreateStack=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Region",params,undefined,false); 
			copyArg(n,"ServiceRoleArn",params,undefined,false); 
			copyArg(n,"DefaultInstanceProfileArn",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Region",params,undefined,false); 
			copyArg(msg,"VpcId",params,undefined,false); 
			copyArg(msg,"Attributes",params,undefined,true); 
			copyArg(msg,"ServiceRoleArn",params,undefined,false); 
			copyArg(msg,"DefaultInstanceProfileArn",params,undefined,false); 
			copyArg(msg,"DefaultOs",params,undefined,false); 
			copyArg(msg,"HostnameTheme",params,undefined,false); 
			copyArg(msg,"DefaultAvailabilityZone",params,undefined,false); 
			copyArg(msg,"DefaultSubnetId",params,undefined,false); 
			copyArg(msg,"CustomJson",params,undefined,false); 
			copyArg(msg,"ConfigurationManager",params,undefined,true); 
			copyArg(msg,"ChefConfiguration",params,undefined,true); 
			copyArg(msg,"UseCustomCookbooks",params,undefined,false); 
			copyArg(msg,"UseOpsworksSecurityGroups",params,undefined,false); 
			copyArg(msg,"CustomCookbooksSource",params,undefined,true); 
			copyArg(msg,"DefaultSshKeyName",params,undefined,false); 
			copyArg(msg,"DefaultRootDeviceType",params,undefined,false); 
			copyArg(msg,"AgentVersion",params,undefined,false); 
			

			svc.createStack(params,cb);
		}

		
		service.CreateUserProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IamUserArn",params,undefined,false); 
			
			copyArg(msg,"IamUserArn",params,undefined,false); 
			copyArg(msg,"SshUsername",params,undefined,false); 
			copyArg(msg,"SshPublicKey",params,undefined,false); 
			copyArg(msg,"AllowSelfManagement",params,undefined,false); 
			

			svc.createUserProfile(params,cb);
		}

		
		service.DeleteApp=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AppId",params,undefined,false); 
			
			copyArg(msg,"AppId",params,undefined,false); 
			

			svc.deleteApp(params,cb);
		}

		
		service.DeleteInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"DeleteElasticIp",params,undefined,false); 
			copyArg(msg,"DeleteVolumes",params,undefined,false); 
			

			svc.deleteInstance(params,cb);
		}

		
		service.DeleteLayer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LayerId",params,undefined,false); 
			
			copyArg(msg,"LayerId",params,undefined,false); 
			

			svc.deleteLayer(params,cb);
		}

		
		service.DeleteStack=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackId",params,undefined,false); 
			
			copyArg(msg,"StackId",params,undefined,false); 
			

			svc.deleteStack(params,cb);
		}

		
		service.DeleteUserProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IamUserArn",params,undefined,false); 
			
			copyArg(msg,"IamUserArn",params,undefined,false); 
			

			svc.deleteUserProfile(params,cb);
		}

		
		service.DeregisterEcsCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EcsClusterArn",params,undefined,false); 
			
			copyArg(msg,"EcsClusterArn",params,undefined,false); 
			

			svc.deregisterEcsCluster(params,cb);
		}

		
		service.DeregisterElasticIp=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ElasticIp",params,undefined,false); 
			
			copyArg(msg,"ElasticIp",params,undefined,false); 
			

			svc.deregisterElasticIp(params,cb);
		}

		
		service.DeregisterInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.deregisterInstance(params,cb);
		}

		
		service.DeregisterRdsDbInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RdsDbInstanceArn",params,undefined,false); 
			
			copyArg(msg,"RdsDbInstanceArn",params,undefined,false); 
			

			svc.deregisterRdsDbInstance(params,cb);
		}

		
		service.DeregisterVolume=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VolumeId",params,undefined,false); 
			
			copyArg(msg,"VolumeId",params,undefined,false); 
			

			svc.deregisterVolume(params,cb);
		}

		
		service.DescribeAgentVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"StackId",params,undefined,false); 
			copyArg(msg,"ConfigurationManager",params,undefined,true); 
			

			svc.describeAgentVersions(params,cb);
		}

		
		service.DescribeApps=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"StackId",params,undefined,false); 
			copyArg(msg,"AppIds",params,undefined,true); 
			

			svc.describeApps(params,cb);
		}

		
		service.DescribeCommands=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DeploymentId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"CommandIds",params,undefined,true); 
			

			svc.describeCommands(params,cb);
		}

		
		service.DescribeDeployments=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"StackId",params,undefined,false); 
			copyArg(msg,"AppId",params,undefined,false); 
			copyArg(msg,"DeploymentIds",params,undefined,true); 
			

			svc.describeDeployments(params,cb);
		}

		
		service.DescribeEcsClusters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"EcsClusterArns",params,undefined,true); 
			copyArg(msg,"StackId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describeEcsClusters(params,cb);
		}

		
		service.DescribeElasticIps=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"StackId",params,undefined,false); 
			copyArg(msg,"Ips",params,undefined,true); 
			

			svc.describeElasticIps(params,cb);
		}

		
		service.DescribeElasticLoadBalancers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"StackId",params,undefined,false); 
			copyArg(msg,"LayerIds",params,undefined,true); 
			

			svc.describeElasticLoadBalancers(params,cb);
		}

		
		service.DescribeInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"StackId",params,undefined,false); 
			copyArg(msg,"LayerId",params,undefined,false); 
			copyArg(msg,"InstanceIds",params,undefined,true); 
			

			svc.describeInstances(params,cb);
		}

		
		service.DescribeLayers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"StackId",params,undefined,false); 
			copyArg(msg,"LayerIds",params,undefined,true); 
			

			svc.describeLayers(params,cb);
		}

		
		service.DescribeLoadBasedAutoScaling=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LayerIds",params,undefined,true); 
			
			copyArg(msg,"LayerIds",params,undefined,true); 
			

			svc.describeLoadBasedAutoScaling(params,cb);
		}

		
		service.DescribeMyUserProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeMyUserProfile(params,cb);
		}

		
		service.DescribeOperatingSystems=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeOperatingSystems(params,cb);
		}

		
		service.DescribePermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"IamUserArn",params,undefined,false); 
			copyArg(msg,"StackId",params,undefined,false); 
			

			svc.describePermissions(params,cb);
		}

		
		service.DescribeRaidArrays=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"StackId",params,undefined,false); 
			copyArg(msg,"RaidArrayIds",params,undefined,true); 
			

			svc.describeRaidArrays(params,cb);
		}

		
		service.DescribeRdsDbInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackId",params,undefined,false); 
			
			copyArg(msg,"StackId",params,undefined,false); 
			copyArg(msg,"RdsDbInstanceArns",params,undefined,true); 
			

			svc.describeRdsDbInstances(params,cb);
		}

		
		service.DescribeServiceErrors=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"StackId",params,undefined,false); 
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"ServiceErrorIds",params,undefined,true); 
			

			svc.describeServiceErrors(params,cb);
		}

		
		service.DescribeStackProvisioningParameters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackId",params,undefined,false); 
			
			copyArg(msg,"StackId",params,undefined,false); 
			

			svc.describeStackProvisioningParameters(params,cb);
		}

		
		service.DescribeStackSummary=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackId",params,undefined,false); 
			
			copyArg(msg,"StackId",params,undefined,false); 
			

			svc.describeStackSummary(params,cb);
		}

		
		service.DescribeStacks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"StackIds",params,undefined,true); 
			

			svc.describeStacks(params,cb);
		}

		
		service.DescribeTimeBasedAutoScaling=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceIds",params,undefined,true); 
			
			copyArg(msg,"InstanceIds",params,undefined,true); 
			

			svc.describeTimeBasedAutoScaling(params,cb);
		}

		
		service.DescribeUserProfiles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"IamUserArns",params,undefined,true); 
			

			svc.describeUserProfiles(params,cb);
		}

		
		service.DescribeVolumes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"StackId",params,undefined,false); 
			copyArg(msg,"RaidArrayId",params,undefined,false); 
			copyArg(msg,"VolumeIds",params,undefined,true); 
			

			svc.describeVolumes(params,cb);
		}

		
		service.DetachElasticLoadBalancer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ElasticLoadBalancerName",params,undefined,false); 
			copyArg(n,"LayerId",params,undefined,false); 
			
			copyArg(msg,"ElasticLoadBalancerName",params,undefined,false); 
			copyArg(msg,"LayerId",params,undefined,false); 
			

			svc.detachElasticLoadBalancer(params,cb);
		}

		
		service.DisassociateElasticIp=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ElasticIp",params,undefined,false); 
			
			copyArg(msg,"ElasticIp",params,undefined,false); 
			

			svc.disassociateElasticIp(params,cb);
		}

		
		service.GetHostnameSuggestion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LayerId",params,undefined,false); 
			
			copyArg(msg,"LayerId",params,undefined,false); 
			

			svc.getHostnameSuggestion(params,cb);
		}

		
		service.GrantAccess=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"ValidForInMinutes",params,undefined,false); 
			

			svc.grantAccess(params,cb);
		}

		
		service.ListTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listTags(params,cb);
		}

		
		service.RebootInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.rebootInstance(params,cb);
		}

		
		service.RegisterEcsCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EcsClusterArn",params,undefined,false); 
			copyArg(n,"StackId",params,undefined,false); 
			
			copyArg(msg,"EcsClusterArn",params,undefined,false); 
			copyArg(msg,"StackId",params,undefined,false); 
			

			svc.registerEcsCluster(params,cb);
		}

		
		service.RegisterElasticIp=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ElasticIp",params,undefined,false); 
			copyArg(n,"StackId",params,undefined,false); 
			
			copyArg(msg,"ElasticIp",params,undefined,false); 
			copyArg(msg,"StackId",params,undefined,false); 
			

			svc.registerElasticIp(params,cb);
		}

		
		service.RegisterInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackId",params,undefined,false); 
			
			copyArg(msg,"StackId",params,undefined,false); 
			copyArg(msg,"Hostname",params,undefined,false); 
			copyArg(msg,"PublicIp",params,undefined,false); 
			copyArg(msg,"PrivateIp",params,undefined,false); 
			copyArg(msg,"RsaPublicKey",params,undefined,false); 
			copyArg(msg,"RsaPublicKeyFingerprint",params,undefined,false); 
			copyArg(msg,"InstanceIdentity",params,undefined,false); 
			

			svc.registerInstance(params,cb);
		}

		
		service.RegisterRdsDbInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackId",params,undefined,false); 
			copyArg(n,"RdsDbInstanceArn",params,undefined,false); 
			copyArg(n,"DbUser",params,undefined,false); 
			copyArg(n,"DbPassword",params,undefined,false); 
			
			copyArg(msg,"StackId",params,undefined,false); 
			copyArg(msg,"RdsDbInstanceArn",params,undefined,false); 
			copyArg(msg,"DbUser",params,undefined,false); 
			copyArg(msg,"DbPassword",params,undefined,false); 
			

			svc.registerRdsDbInstance(params,cb);
		}

		
		service.RegisterVolume=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackId",params,undefined,false); 
			
			copyArg(msg,"Ec2VolumeId",params,undefined,false); 
			copyArg(msg,"StackId",params,undefined,false); 
			

			svc.registerVolume(params,cb);
		}

		
		service.SetLoadBasedAutoScaling=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LayerId",params,undefined,false); 
			
			copyArg(msg,"LayerId",params,undefined,false); 
			copyArg(msg,"Enable",params,undefined,false); 
			copyArg(msg,"UpScaling",params,undefined,true); 
			copyArg(msg,"DownScaling",params,undefined,true); 
			

			svc.setLoadBasedAutoScaling(params,cb);
		}

		
		service.SetPermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackId",params,undefined,false); 
			copyArg(n,"IamUserArn",params,undefined,false); 
			
			copyArg(msg,"StackId",params,undefined,false); 
			copyArg(msg,"IamUserArn",params,undefined,false); 
			copyArg(msg,"AllowSsh",params,undefined,false); 
			copyArg(msg,"AllowSudo",params,undefined,false); 
			copyArg(msg,"Level",params,undefined,false); 
			

			svc.setPermission(params,cb);
		}

		
		service.SetTimeBasedAutoScaling=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"AutoScalingSchedule",params,undefined,true); 
			

			svc.setTimeBasedAutoScaling(params,cb);
		}

		
		service.StartInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.startInstance(params,cb);
		}

		
		service.StartStack=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackId",params,undefined,false); 
			
			copyArg(msg,"StackId",params,undefined,false); 
			

			svc.startStack(params,cb);
		}

		
		service.StopInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"Force",params,undefined,false); 
			

			svc.stopInstance(params,cb);
		}

		
		service.StopStack=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackId",params,undefined,false); 
			
			copyArg(msg,"StackId",params,undefined,false); 
			

			svc.stopStack(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UnassignInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			

			svc.unassignInstance(params,cb);
		}

		
		service.UnassignVolume=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VolumeId",params,undefined,false); 
			
			copyArg(msg,"VolumeId",params,undefined,false); 
			

			svc.unassignVolume(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateApp=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AppId",params,undefined,false); 
			
			copyArg(msg,"AppId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DataSources",params,undefined,true); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"AppSource",params,undefined,true); 
			copyArg(msg,"Domains",params,undefined,true); 
			copyArg(msg,"EnableSsl",params,undefined,false); 
			copyArg(msg,"SslConfiguration",params,undefined,true); 
			copyArg(msg,"Attributes",params,undefined,true); 
			copyArg(msg,"Environment",params,undefined,true); 
			

			svc.updateApp(params,cb);
		}

		
		service.UpdateElasticIp=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ElasticIp",params,undefined,false); 
			
			copyArg(msg,"ElasticIp",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.updateElasticIp(params,cb);
		}

		
		service.UpdateInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params,undefined,false); 
			
			copyArg(msg,"InstanceId",params,undefined,false); 
			copyArg(msg,"LayerIds",params,undefined,true); 
			copyArg(msg,"InstanceType",params,undefined,false); 
			copyArg(msg,"AutoScalingType",params,undefined,false); 
			copyArg(msg,"Hostname",params,undefined,false); 
			copyArg(msg,"Os",params,undefined,false); 
			copyArg(msg,"AmiId",params,undefined,false); 
			copyArg(msg,"SshKeyName",params,undefined,false); 
			copyArg(msg,"Architecture",params,undefined,false); 
			copyArg(msg,"InstallUpdatesOnBoot",params,undefined,false); 
			copyArg(msg,"EbsOptimized",params,undefined,false); 
			copyArg(msg,"AgentVersion",params,undefined,false); 
			

			svc.updateInstance(params,cb);
		}

		
		service.UpdateLayer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LayerId",params,undefined,false); 
			
			copyArg(msg,"LayerId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Shortname",params,undefined,false); 
			copyArg(msg,"Attributes",params,undefined,true); 
			copyArg(msg,"CloudWatchLogsConfiguration",params,undefined,true); 
			copyArg(msg,"CustomInstanceProfileArn",params,undefined,false); 
			copyArg(msg,"CustomJson",params,undefined,false); 
			copyArg(msg,"CustomSecurityGroupIds",params,undefined,true); 
			copyArg(msg,"Packages",params,undefined,true); 
			copyArg(msg,"VolumeConfigurations",params,undefined,true); 
			copyArg(msg,"EnableAutoHealing",params,undefined,false); 
			copyArg(msg,"AutoAssignElasticIps",params,undefined,false); 
			copyArg(msg,"AutoAssignPublicIps",params,undefined,false); 
			copyArg(msg,"CustomRecipes",params,undefined,true); 
			copyArg(msg,"InstallUpdatesOnBoot",params,undefined,false); 
			copyArg(msg,"UseEbsOptimizedInstances",params,undefined,false); 
			copyArg(msg,"LifecycleEventConfiguration",params,undefined,true); 
			

			svc.updateLayer(params,cb);
		}

		
		service.UpdateMyUserProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SshPublicKey",params,undefined,false); 
			

			svc.updateMyUserProfile(params,cb);
		}

		
		service.UpdateRdsDbInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RdsDbInstanceArn",params,undefined,false); 
			
			copyArg(msg,"RdsDbInstanceArn",params,undefined,false); 
			copyArg(msg,"DbUser",params,undefined,false); 
			copyArg(msg,"DbPassword",params,undefined,false); 
			

			svc.updateRdsDbInstance(params,cb);
		}

		
		service.UpdateStack=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackId",params,undefined,false); 
			
			copyArg(msg,"StackId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Attributes",params,undefined,true); 
			copyArg(msg,"ServiceRoleArn",params,undefined,false); 
			copyArg(msg,"DefaultInstanceProfileArn",params,undefined,false); 
			copyArg(msg,"DefaultOs",params,undefined,false); 
			copyArg(msg,"HostnameTheme",params,undefined,false); 
			copyArg(msg,"DefaultAvailabilityZone",params,undefined,false); 
			copyArg(msg,"DefaultSubnetId",params,undefined,false); 
			copyArg(msg,"CustomJson",params,undefined,false); 
			copyArg(msg,"ConfigurationManager",params,undefined,true); 
			copyArg(msg,"ChefConfiguration",params,undefined,true); 
			copyArg(msg,"UseCustomCookbooks",params,undefined,false); 
			copyArg(msg,"CustomCookbooksSource",params,undefined,true); 
			copyArg(msg,"DefaultSshKeyName",params,undefined,false); 
			copyArg(msg,"DefaultRootDeviceType",params,undefined,false); 
			copyArg(msg,"UseOpsworksSecurityGroups",params,undefined,false); 
			copyArg(msg,"AgentVersion",params,undefined,false); 
			

			svc.updateStack(params,cb);
		}

		
		service.UpdateUserProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IamUserArn",params,undefined,false); 
			
			copyArg(msg,"IamUserArn",params,undefined,false); 
			copyArg(msg,"SshUsername",params,undefined,false); 
			copyArg(msg,"SshPublicKey",params,undefined,false); 
			copyArg(msg,"AllowSelfManagement",params,undefined,false); 
			

			svc.updateUserProfile(params,cb);
		}

		
		service.UpdateVolume=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VolumeId",params,undefined,false); 
			
			copyArg(msg,"VolumeId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"MountPoint",params,undefined,false); 
			

			svc.updateVolume(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS OpsWorks", AmazonAPINode);

};
