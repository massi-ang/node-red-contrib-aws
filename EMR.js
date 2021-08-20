
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

		var awsService = new AWS.EMR( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.EMR(msg.AWSConfig) : awsService;

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

		
		service.AddInstanceFleet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterId",params,undefined,false); 
			copyArg(n,"InstanceFleet",params,undefined,true); 
			
			copyArg(msg,"ClusterId",params,undefined,false); 
			copyArg(msg,"InstanceFleet",params,undefined,true); 
			

			svc.addInstanceFleet(params,cb);
		}

		
		service.AddInstanceGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceGroups",params,undefined,true); 
			copyArg(n,"JobFlowId",params,undefined,false); 
			
			copyArg(msg,"InstanceGroups",params,undefined,true); 
			copyArg(msg,"JobFlowId",params,undefined,false); 
			

			svc.addInstanceGroups(params,cb);
		}

		
		service.AddJobFlowSteps=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobFlowId",params,undefined,false); 
			copyArg(n,"Steps",params,undefined,true); 
			
			copyArg(msg,"JobFlowId",params,undefined,false); 
			copyArg(msg,"Steps",params,undefined,true); 
			

			svc.addJobFlowSteps(params,cb);
		}

		
		service.AddTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.addTags(params,cb);
		}

		
		service.CancelSteps=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterId",params,undefined,false); 
			copyArg(n,"StepIds",params,undefined,true); 
			
			copyArg(msg,"ClusterId",params,undefined,false); 
			copyArg(msg,"StepIds",params,undefined,true); 
			copyArg(msg,"StepCancellationOption",params,undefined,false); 
			

			svc.cancelSteps(params,cb);
		}

		
		service.CreateSecurityConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"SecurityConfiguration",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"SecurityConfiguration",params,undefined,false); 
			

			svc.createSecurityConfiguration(params,cb);
		}

		
		service.CreateStudio=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"AuthMode",params,undefined,false); 
			copyArg(n,"VpcId",params,undefined,false); 
			copyArg(n,"SubnetIds",params,undefined,true); 
			copyArg(n,"ServiceRole",params,undefined,false); 
			copyArg(n,"UserRole",params,undefined,false); 
			copyArg(n,"WorkspaceSecurityGroupId",params,undefined,false); 
			copyArg(n,"EngineSecurityGroupId",params,undefined,false); 
			copyArg(n,"DefaultS3Location",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"AuthMode",params,undefined,false); 
			copyArg(msg,"VpcId",params,undefined,false); 
			copyArg(msg,"SubnetIds",params,undefined,true); 
			copyArg(msg,"ServiceRole",params,undefined,false); 
			copyArg(msg,"UserRole",params,undefined,false); 
			copyArg(msg,"WorkspaceSecurityGroupId",params,undefined,false); 
			copyArg(msg,"EngineSecurityGroupId",params,undefined,false); 
			copyArg(msg,"DefaultS3Location",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createStudio(params,cb);
		}

		
		service.CreateStudioSessionMapping=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StudioId",params,undefined,false); 
			copyArg(n,"IdentityType",params,undefined,false); 
			copyArg(n,"SessionPolicyArn",params,undefined,false); 
			
			copyArg(msg,"StudioId",params,undefined,false); 
			copyArg(msg,"IdentityId",params,undefined,false); 
			copyArg(msg,"IdentityName",params,undefined,false); 
			copyArg(msg,"IdentityType",params,undefined,false); 
			copyArg(msg,"SessionPolicyArn",params,undefined,false); 
			

			svc.createStudioSessionMapping(params,cb);
		}

		
		service.DeleteSecurityConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteSecurityConfiguration(params,cb);
		}

		
		service.DeleteStudio=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StudioId",params,undefined,false); 
			
			copyArg(msg,"StudioId",params,undefined,false); 
			

			svc.deleteStudio(params,cb);
		}

		
		service.DeleteStudioSessionMapping=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StudioId",params,undefined,false); 
			copyArg(n,"IdentityType",params,undefined,false); 
			
			copyArg(msg,"StudioId",params,undefined,false); 
			copyArg(msg,"IdentityId",params,undefined,false); 
			copyArg(msg,"IdentityName",params,undefined,false); 
			copyArg(msg,"IdentityType",params,undefined,false); 
			

			svc.deleteStudioSessionMapping(params,cb);
		}

		
		service.DescribeCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterId",params,undefined,false); 
			
			copyArg(msg,"ClusterId",params,undefined,false); 
			

			svc.describeCluster(params,cb);
		}

		
		service.DescribeJobFlows=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CreatedAfter",params,undefined,false); 
			copyArg(msg,"CreatedBefore",params,undefined,false); 
			copyArg(msg,"JobFlowIds",params,undefined,true); 
			copyArg(msg,"JobFlowStates",params,undefined,false); 
			

			svc.describeJobFlows(params,cb);
		}

		
		service.DescribeNotebookExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NotebookExecutionId",params,undefined,false); 
			
			copyArg(msg,"NotebookExecutionId",params,undefined,false); 
			

			svc.describeNotebookExecution(params,cb);
		}

		
		service.DescribeReleaseLabel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ReleaseLabel",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describeReleaseLabel(params,cb);
		}

		
		service.DescribeSecurityConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.describeSecurityConfiguration(params,cb);
		}

		
		service.DescribeStep=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterId",params,undefined,false); 
			copyArg(n,"StepId",params,undefined,false); 
			
			copyArg(msg,"ClusterId",params,undefined,false); 
			copyArg(msg,"StepId",params,undefined,false); 
			

			svc.describeStep(params,cb);
		}

		
		service.DescribeStudio=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StudioId",params,undefined,false); 
			
			copyArg(msg,"StudioId",params,undefined,false); 
			

			svc.describeStudio(params,cb);
		}

		
		service.GetBlockPublicAccessConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getBlockPublicAccessConfiguration(params,cb);
		}

		
		service.GetManagedScalingPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterId",params,undefined,false); 
			
			copyArg(msg,"ClusterId",params,undefined,false); 
			

			svc.getManagedScalingPolicy(params,cb);
		}

		
		service.GetStudioSessionMapping=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StudioId",params,undefined,false); 
			copyArg(n,"IdentityType",params,undefined,false); 
			
			copyArg(msg,"StudioId",params,undefined,false); 
			copyArg(msg,"IdentityId",params,undefined,false); 
			copyArg(msg,"IdentityName",params,undefined,false); 
			copyArg(msg,"IdentityType",params,undefined,false); 
			

			svc.getStudioSessionMapping(params,cb);
		}

		
		service.ListBootstrapActions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterId",params,undefined,false); 
			
			copyArg(msg,"ClusterId",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.listBootstrapActions(params,cb);
		}

		
		service.ListClusters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CreatedAfter",params,undefined,false); 
			copyArg(msg,"CreatedBefore",params,undefined,false); 
			copyArg(msg,"ClusterStates",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.listClusters(params,cb);
		}

		
		service.ListInstanceFleets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterId",params,undefined,false); 
			
			copyArg(msg,"ClusterId",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.listInstanceFleets(params,cb);
		}

		
		service.ListInstanceGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterId",params,undefined,false); 
			
			copyArg(msg,"ClusterId",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.listInstanceGroups(params,cb);
		}

		
		service.ListInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterId",params,undefined,false); 
			
			copyArg(msg,"ClusterId",params,undefined,false); 
			copyArg(msg,"InstanceGroupId",params,undefined,false); 
			copyArg(msg,"InstanceGroupTypes",params,undefined,false); 
			copyArg(msg,"InstanceFleetId",params,undefined,false); 
			copyArg(msg,"InstanceFleetType",params,undefined,false); 
			copyArg(msg,"InstanceStates",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.listInstances(params,cb);
		}

		
		service.ListNotebookExecutions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"EditorId",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			copyArg(msg,"From",params,undefined,false); 
			copyArg(msg,"To",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.listNotebookExecutions(params,cb);
		}

		
		service.ListReleaseLabels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listReleaseLabels(params,cb);
		}

		
		service.ListSecurityConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.listSecurityConfigurations(params,cb);
		}

		
		service.ListSteps=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterId",params,undefined,false); 
			
			copyArg(msg,"ClusterId",params,undefined,false); 
			copyArg(msg,"StepStates",params,undefined,false); 
			copyArg(msg,"StepIds",params,undefined,true); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.listSteps(params,cb);
		}

		
		service.ListStudioSessionMappings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"StudioId",params,undefined,false); 
			copyArg(msg,"IdentityType",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.listStudioSessionMappings(params,cb);
		}

		
		service.ListStudios=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.listStudios(params,cb);
		}

		
		service.ModifyCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterId",params,undefined,false); 
			
			copyArg(msg,"ClusterId",params,undefined,false); 
			copyArg(msg,"StepConcurrencyLevel",params,undefined,false); 
			

			svc.modifyCluster(params,cb);
		}

		
		service.ModifyInstanceFleet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterId",params,undefined,false); 
			copyArg(n,"InstanceFleet",params,undefined,false); 
			
			copyArg(msg,"ClusterId",params,undefined,false); 
			copyArg(msg,"InstanceFleet",params,undefined,false); 
			

			svc.modifyInstanceFleet(params,cb);
		}

		
		service.ModifyInstanceGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ClusterId",params,undefined,false); 
			copyArg(msg,"InstanceGroups",params,undefined,false); 
			

			svc.modifyInstanceGroups(params,cb);
		}

		
		service.PutAutoScalingPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterId",params,undefined,false); 
			copyArg(n,"InstanceGroupId",params,undefined,false); 
			copyArg(n,"AutoScalingPolicy",params,undefined,true); 
			
			copyArg(msg,"ClusterId",params,undefined,false); 
			copyArg(msg,"InstanceGroupId",params,undefined,false); 
			copyArg(msg,"AutoScalingPolicy",params,undefined,true); 
			

			svc.putAutoScalingPolicy(params,cb);
		}

		
		service.PutBlockPublicAccessConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BlockPublicAccessConfiguration",params,undefined,true); 
			
			copyArg(msg,"BlockPublicAccessConfiguration",params,undefined,true); 
			

			svc.putBlockPublicAccessConfiguration(params,cb);
		}

		
		service.PutManagedScalingPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterId",params,undefined,false); 
			copyArg(n,"ManagedScalingPolicy",params,undefined,true); 
			
			copyArg(msg,"ClusterId",params,undefined,false); 
			copyArg(msg,"ManagedScalingPolicy",params,undefined,true); 
			

			svc.putManagedScalingPolicy(params,cb);
		}

		
		service.RemoveAutoScalingPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterId",params,undefined,false); 
			copyArg(n,"InstanceGroupId",params,undefined,false); 
			
			copyArg(msg,"ClusterId",params,undefined,false); 
			copyArg(msg,"InstanceGroupId",params,undefined,false); 
			

			svc.removeAutoScalingPolicy(params,cb);
		}

		
		service.RemoveManagedScalingPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterId",params,undefined,false); 
			
			copyArg(msg,"ClusterId",params,undefined,false); 
			

			svc.removeManagedScalingPolicy(params,cb);
		}

		
		service.RemoveTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,true); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			

			svc.removeTags(params,cb);
		}

		
		service.RunJobFlow=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Instances",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"LogUri",params,undefined,false); 
			copyArg(msg,"LogEncryptionKmsKeyId",params,undefined,false); 
			copyArg(msg,"AdditionalInfo",params,undefined,false); 
			copyArg(msg,"AmiVersion",params,undefined,false); 
			copyArg(msg,"ReleaseLabel",params,undefined,false); 
			copyArg(msg,"Instances",params,undefined,false); 
			copyArg(msg,"Steps",params,undefined,true); 
			copyArg(msg,"BootstrapActions",params,undefined,false); 
			copyArg(msg,"SupportedProducts",params,undefined,true); 
			copyArg(msg,"NewSupportedProducts",params,undefined,false); 
			copyArg(msg,"Applications",params,undefined,true); 
			copyArg(msg,"Configurations",params,undefined,true); 
			copyArg(msg,"VisibleToAllUsers",params,undefined,false); 
			copyArg(msg,"JobFlowRole",params,undefined,false); 
			copyArg(msg,"ServiceRole",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"SecurityConfiguration",params,undefined,false); 
			copyArg(msg,"AutoScalingRole",params,undefined,false); 
			copyArg(msg,"ScaleDownBehavior",params,undefined,false); 
			copyArg(msg,"CustomAmiId",params,undefined,false); 
			copyArg(msg,"EbsRootVolumeSize",params,undefined,false); 
			copyArg(msg,"RepoUpgradeOnBoot",params,undefined,false); 
			copyArg(msg,"KerberosAttributes",params,undefined,true); 
			copyArg(msg,"StepConcurrencyLevel",params,undefined,false); 
			copyArg(msg,"ManagedScalingPolicy",params,undefined,true); 
			copyArg(msg,"PlacementGroupConfigs",params,undefined,true); 
			

			svc.runJobFlow(params,cb);
		}

		
		service.SetTerminationProtection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobFlowIds",params,undefined,true); 
			copyArg(n,"TerminationProtected",params,undefined,false); 
			
			copyArg(msg,"JobFlowIds",params,undefined,true); 
			copyArg(msg,"TerminationProtected",params,undefined,false); 
			

			svc.setTerminationProtection(params,cb);
		}

		
		service.SetVisibleToAllUsers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobFlowIds",params,undefined,true); 
			copyArg(n,"VisibleToAllUsers",params,undefined,false); 
			
			copyArg(msg,"JobFlowIds",params,undefined,true); 
			copyArg(msg,"VisibleToAllUsers",params,undefined,false); 
			

			svc.setVisibleToAllUsers(params,cb);
		}

		
		service.StartNotebookExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EditorId",params,undefined,false); 
			copyArg(n,"RelativePath",params,undefined,false); 
			copyArg(n,"ExecutionEngine",params,undefined,true); 
			copyArg(n,"ServiceRole",params,undefined,false); 
			
			copyArg(msg,"EditorId",params,undefined,false); 
			copyArg(msg,"RelativePath",params,undefined,false); 
			copyArg(msg,"NotebookExecutionName",params,undefined,false); 
			copyArg(msg,"NotebookParams",params,undefined,false); 
			copyArg(msg,"ExecutionEngine",params,undefined,true); 
			copyArg(msg,"ServiceRole",params,undefined,false); 
			copyArg(msg,"NotebookInstanceSecurityGroupId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.startNotebookExecution(params,cb);
		}

		
		service.StopNotebookExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NotebookExecutionId",params,undefined,false); 
			
			copyArg(msg,"NotebookExecutionId",params,undefined,false); 
			

			svc.stopNotebookExecution(params,cb);
		}

		
		service.TerminateJobFlows=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobFlowIds",params,undefined,true); 
			
			copyArg(msg,"JobFlowIds",params,undefined,true); 
			

			svc.terminateJobFlows(params,cb);
		}

		
		service.UpdateStudio=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StudioId",params,undefined,false); 
			
			copyArg(msg,"StudioId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"SubnetIds",params,undefined,true); 
			copyArg(msg,"DefaultS3Location",params,undefined,false); 
			

			svc.updateStudio(params,cb);
		}

		
		service.UpdateStudioSessionMapping=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StudioId",params,undefined,false); 
			copyArg(n,"IdentityType",params,undefined,false); 
			copyArg(n,"SessionPolicyArn",params,undefined,false); 
			
			copyArg(msg,"StudioId",params,undefined,false); 
			copyArg(msg,"IdentityId",params,undefined,false); 
			copyArg(msg,"IdentityName",params,undefined,false); 
			copyArg(msg,"IdentityType",params,undefined,false); 
			copyArg(msg,"SessionPolicyArn",params,undefined,false); 
			

			svc.updateStudioSessionMapping(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS EMR", AmazonAPINode);

};
