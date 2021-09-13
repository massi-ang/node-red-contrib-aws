
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

		var awsService = new AWS.EMR( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.EMR(msg.AWSConfig) : awsService;

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
		
			service.AddInstanceFleet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"InstanceFleet",params,undefined,true); 
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"InstanceFleet",params,undefined,true); 
			
			copyArgs(msg,"ClusterId",params,undefined,false); 
			copyArgs(msg,"InstanceFleet",params,undefined,true); 
			

			svc.addInstanceFleet(params,cb);
		}
			service.AddInstanceGroups=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InstanceGroups",params,undefined,true); 
			copyArgs(n,"JobFlowId",params,undefined,false); 
			
			copyArgs(n,"InstanceGroups",params,undefined,true); 
			copyArgs(n,"JobFlowId",params,undefined,false); 
			
			copyArgs(msg,"InstanceGroups",params,undefined,true); 
			copyArgs(msg,"JobFlowId",params,undefined,false); 
			

			svc.addInstanceGroups(params,cb);
		}
			service.AddJobFlowSteps=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobFlowId",params,undefined,false); 
			copyArgs(n,"Steps",params,undefined,true); 
			
			copyArgs(n,"JobFlowId",params,undefined,false); 
			copyArgs(n,"Steps",params,undefined,true); 
			
			copyArgs(msg,"JobFlowId",params,undefined,false); 
			copyArgs(msg,"Steps",params,undefined,true); 
			

			svc.addJobFlowSteps(params,cb);
		}
			service.AddTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.addTags(params,cb);
		}
			service.CancelSteps=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"StepIds",params,undefined,true); 
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"StepIds",params,undefined,true); 
			copyArgs(n,"StepCancellationOption",params,undefined,false); 
			
			copyArgs(msg,"ClusterId",params,undefined,false); 
			copyArgs(msg,"StepIds",params,undefined,true); 
			copyArgs(msg,"StepCancellationOption",params,undefined,false); 
			

			svc.cancelSteps(params,cb);
		}
			service.CreateSecurityConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"SecurityConfiguration",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"SecurityConfiguration",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"SecurityConfiguration",params,undefined,false); 
			

			svc.createSecurityConfiguration(params,cb);
		}
			service.CreateStudio=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"AuthMode",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			copyArgs(n,"ServiceRole",params,undefined,false); 
			copyArgs(n,"UserRole",params,undefined,false); 
			copyArgs(n,"WorkspaceSecurityGroupId",params,undefined,false); 
			copyArgs(n,"EngineSecurityGroupId",params,undefined,false); 
			copyArgs(n,"DefaultS3Location",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"AuthMode",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			copyArgs(n,"ServiceRole",params,undefined,false); 
			copyArgs(n,"UserRole",params,undefined,false); 
			copyArgs(n,"WorkspaceSecurityGroupId",params,undefined,false); 
			copyArgs(n,"EngineSecurityGroupId",params,undefined,false); 
			copyArgs(n,"DefaultS3Location",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"AuthMode",params,undefined,false); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			copyArgs(msg,"SubnetIds",params,undefined,true); 
			copyArgs(msg,"ServiceRole",params,undefined,false); 
			copyArgs(msg,"UserRole",params,undefined,false); 
			copyArgs(msg,"WorkspaceSecurityGroupId",params,undefined,false); 
			copyArgs(msg,"EngineSecurityGroupId",params,undefined,false); 
			copyArgs(msg,"DefaultS3Location",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createStudio(params,cb);
		}
			service.CreateStudioSessionMapping=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StudioId",params,undefined,false); 
			copyArgs(n,"IdentityType",params,undefined,false); 
			copyArgs(n,"SessionPolicyArn",params,undefined,false); 
			
			copyArgs(n,"StudioId",params,undefined,false); 
			copyArgs(n,"IdentityId",params,undefined,false); 
			copyArgs(n,"IdentityName",params,undefined,false); 
			copyArgs(n,"IdentityType",params,undefined,false); 
			copyArgs(n,"SessionPolicyArn",params,undefined,false); 
			
			copyArgs(msg,"StudioId",params,undefined,false); 
			copyArgs(msg,"IdentityId",params,undefined,false); 
			copyArgs(msg,"IdentityName",params,undefined,false); 
			copyArgs(msg,"IdentityType",params,undefined,false); 
			copyArgs(msg,"SessionPolicyArn",params,undefined,false); 
			

			svc.createStudioSessionMapping(params,cb);
		}
			service.DeleteSecurityConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteSecurityConfiguration(params,cb);
		}
			service.DeleteStudio=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StudioId",params,undefined,false); 
			
			copyArgs(n,"StudioId",params,undefined,false); 
			
			copyArgs(msg,"StudioId",params,undefined,false); 
			

			svc.deleteStudio(params,cb);
		}
			service.DeleteStudioSessionMapping=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StudioId",params,undefined,false); 
			copyArgs(n,"IdentityType",params,undefined,false); 
			
			copyArgs(n,"StudioId",params,undefined,false); 
			copyArgs(n,"IdentityId",params,undefined,false); 
			copyArgs(n,"IdentityName",params,undefined,false); 
			copyArgs(n,"IdentityType",params,undefined,false); 
			
			copyArgs(msg,"StudioId",params,undefined,false); 
			copyArgs(msg,"IdentityId",params,undefined,false); 
			copyArgs(msg,"IdentityName",params,undefined,false); 
			copyArgs(msg,"IdentityType",params,undefined,false); 
			

			svc.deleteStudioSessionMapping(params,cb);
		}
			service.DescribeCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			
			copyArgs(msg,"ClusterId",params,undefined,false); 
			

			svc.describeCluster(params,cb);
		}
			service.DescribeJobFlows=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CreatedAfter",params,undefined,false); 
			copyArgs(n,"CreatedBefore",params,undefined,false); 
			copyArgs(n,"JobFlowIds",params,undefined,true); 
			copyArgs(n,"JobFlowStates",params,undefined,false); 
			
			copyArgs(msg,"CreatedAfter",params,undefined,false); 
			copyArgs(msg,"CreatedBefore",params,undefined,false); 
			copyArgs(msg,"JobFlowIds",params,undefined,true); 
			copyArgs(msg,"JobFlowStates",params,undefined,false); 
			

			svc.describeJobFlows(params,cb);
		}
			service.DescribeNotebookExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NotebookExecutionId",params,undefined,false); 
			
			copyArgs(n,"NotebookExecutionId",params,undefined,false); 
			
			copyArgs(msg,"NotebookExecutionId",params,undefined,false); 
			

			svc.describeNotebookExecution(params,cb);
		}
			service.DescribeReleaseLabel=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ReleaseLabel",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ReleaseLabel",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeReleaseLabel(params,cb);
		}
			service.DescribeSecurityConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.describeSecurityConfiguration(params,cb);
		}
			service.DescribeStep=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"StepId",params,undefined,false); 
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"StepId",params,undefined,false); 
			
			copyArgs(msg,"ClusterId",params,undefined,false); 
			copyArgs(msg,"StepId",params,undefined,false); 
			

			svc.describeStep(params,cb);
		}
			service.DescribeStudio=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StudioId",params,undefined,false); 
			
			copyArgs(n,"StudioId",params,undefined,false); 
			
			copyArgs(msg,"StudioId",params,undefined,false); 
			

			svc.describeStudio(params,cb);
		}
			service.GetAutoTerminationPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			
			copyArgs(msg,"ClusterId",params,undefined,false); 
			

			svc.getAutoTerminationPolicy(params,cb);
		}
			service.GetBlockPublicAccessConfiguration=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getBlockPublicAccessConfiguration(params,cb);
		}
			service.GetManagedScalingPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			
			copyArgs(msg,"ClusterId",params,undefined,false); 
			

			svc.getManagedScalingPolicy(params,cb);
		}
			service.GetStudioSessionMapping=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StudioId",params,undefined,false); 
			copyArgs(n,"IdentityType",params,undefined,false); 
			
			copyArgs(n,"StudioId",params,undefined,false); 
			copyArgs(n,"IdentityId",params,undefined,false); 
			copyArgs(n,"IdentityName",params,undefined,false); 
			copyArgs(n,"IdentityType",params,undefined,false); 
			
			copyArgs(msg,"StudioId",params,undefined,false); 
			copyArgs(msg,"IdentityId",params,undefined,false); 
			copyArgs(msg,"IdentityName",params,undefined,false); 
			copyArgs(msg,"IdentityType",params,undefined,false); 
			

			svc.getStudioSessionMapping(params,cb);
		}
			service.ListBootstrapActions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"ClusterId",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.listBootstrapActions(params,cb);
		}
			service.ListClusters=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CreatedAfter",params,undefined,false); 
			copyArgs(n,"CreatedBefore",params,undefined,false); 
			copyArgs(n,"ClusterStates",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"CreatedAfter",params,undefined,false); 
			copyArgs(msg,"CreatedBefore",params,undefined,false); 
			copyArgs(msg,"ClusterStates",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.listClusters(params,cb);
		}
			service.ListInstanceFleets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"ClusterId",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.listInstanceFleets(params,cb);
		}
			service.ListInstanceGroups=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"ClusterId",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.listInstanceGroups(params,cb);
		}
			service.ListInstances=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"InstanceGroupId",params,undefined,false); 
			copyArgs(n,"InstanceGroupTypes",params,undefined,false); 
			copyArgs(n,"InstanceFleetId",params,undefined,false); 
			copyArgs(n,"InstanceFleetType",params,undefined,false); 
			copyArgs(n,"InstanceStates",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"ClusterId",params,undefined,false); 
			copyArgs(msg,"InstanceGroupId",params,undefined,false); 
			copyArgs(msg,"InstanceGroupTypes",params,undefined,false); 
			copyArgs(msg,"InstanceFleetId",params,undefined,false); 
			copyArgs(msg,"InstanceFleetType",params,undefined,false); 
			copyArgs(msg,"InstanceStates",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.listInstances(params,cb);
		}
			service.ListNotebookExecutions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"EditorId",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			copyArgs(n,"From",params,undefined,false); 
			copyArgs(n,"To",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"EditorId",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			copyArgs(msg,"From",params,undefined,false); 
			copyArgs(msg,"To",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.listNotebookExecutions(params,cb);
		}
			service.ListReleaseLabels=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listReleaseLabels(params,cb);
		}
			service.ListSecurityConfigurations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.listSecurityConfigurations(params,cb);
		}
			service.ListSteps=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"StepStates",params,undefined,false); 
			copyArgs(n,"StepIds",params,undefined,true); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"ClusterId",params,undefined,false); 
			copyArgs(msg,"StepStates",params,undefined,false); 
			copyArgs(msg,"StepIds",params,undefined,true); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.listSteps(params,cb);
		}
			service.ListStudioSessionMappings=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"StudioId",params,undefined,false); 
			copyArgs(n,"IdentityType",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"StudioId",params,undefined,false); 
			copyArgs(msg,"IdentityType",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.listStudioSessionMappings(params,cb);
		}
			service.ListStudios=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Marker",params,undefined,false); 
			
			copyArgs(msg,"Marker",params,undefined,false); 
			

			svc.listStudios(params,cb);
		}
			service.ModifyCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(Number(n),"StepConcurrencyLevel",params,undefined,false); 
			
			copyArgs(msg,"ClusterId",params,undefined,false); 
			copyArgs(msg,"StepConcurrencyLevel",params,undefined,false); 
			

			svc.modifyCluster(params,cb);
		}
			service.ModifyInstanceFleet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"InstanceFleet",params,undefined,false); 
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"InstanceFleet",params,undefined,false); 
			
			copyArgs(msg,"ClusterId",params,undefined,false); 
			copyArgs(msg,"InstanceFleet",params,undefined,false); 
			

			svc.modifyInstanceFleet(params,cb);
		}
			service.ModifyInstanceGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"InstanceGroups",params,undefined,false); 
			
			copyArgs(msg,"ClusterId",params,undefined,false); 
			copyArgs(msg,"InstanceGroups",params,undefined,false); 
			

			svc.modifyInstanceGroups(params,cb);
		}
			service.PutAutoScalingPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"InstanceGroupId",params,undefined,false); 
			copyArgs(n,"AutoScalingPolicy",params,undefined,true); 
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"InstanceGroupId",params,undefined,false); 
			copyArgs(n,"AutoScalingPolicy",params,undefined,true); 
			
			copyArgs(msg,"ClusterId",params,undefined,false); 
			copyArgs(msg,"InstanceGroupId",params,undefined,false); 
			copyArgs(msg,"AutoScalingPolicy",params,undefined,true); 
			

			svc.putAutoScalingPolicy(params,cb);
		}
			service.PutAutoTerminationPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"AutoTerminationPolicy",params,undefined,true); 
			
			copyArgs(msg,"ClusterId",params,undefined,false); 
			copyArgs(msg,"AutoTerminationPolicy",params,undefined,true); 
			

			svc.putAutoTerminationPolicy(params,cb);
		}
			service.PutBlockPublicAccessConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BlockPublicAccessConfiguration",params,undefined,true); 
			
			copyArgs(n,"BlockPublicAccessConfiguration",params,undefined,true); 
			
			copyArgs(msg,"BlockPublicAccessConfiguration",params,undefined,true); 
			

			svc.putBlockPublicAccessConfiguration(params,cb);
		}
			service.PutManagedScalingPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"ManagedScalingPolicy",params,undefined,true); 
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"ManagedScalingPolicy",params,undefined,true); 
			
			copyArgs(msg,"ClusterId",params,undefined,false); 
			copyArgs(msg,"ManagedScalingPolicy",params,undefined,true); 
			

			svc.putManagedScalingPolicy(params,cb);
		}
			service.RemoveAutoScalingPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"InstanceGroupId",params,undefined,false); 
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"InstanceGroupId",params,undefined,false); 
			
			copyArgs(msg,"ClusterId",params,undefined,false); 
			copyArgs(msg,"InstanceGroupId",params,undefined,false); 
			

			svc.removeAutoScalingPolicy(params,cb);
		}
			service.RemoveAutoTerminationPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			
			copyArgs(msg,"ClusterId",params,undefined,false); 
			

			svc.removeAutoTerminationPolicy(params,cb);
		}
			service.RemoveManagedScalingPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			
			copyArgs(msg,"ClusterId",params,undefined,false); 
			

			svc.removeManagedScalingPolicy(params,cb);
		}
			service.RemoveTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			

			svc.removeTags(params,cb);
		}
			service.RunJobFlow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Instances",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"LogUri",params,undefined,false); 
			copyArgs(n,"LogEncryptionKmsKeyId",params,undefined,false); 
			copyArgs(n,"AdditionalInfo",params,undefined,false); 
			copyArgs(n,"AmiVersion",params,undefined,false); 
			copyArgs(n,"ReleaseLabel",params,undefined,false); 
			copyArgs(n,"Instances",params,undefined,false); 
			copyArgs(n,"Steps",params,undefined,true); 
			copyArgs(n,"BootstrapActions",params,undefined,false); 
			copyArgs(n,"SupportedProducts",params,undefined,true); 
			copyArgs(n,"NewSupportedProducts",params,undefined,false); 
			copyArgs(n,"Applications",params,undefined,true); 
			copyArgs(n,"Configurations",params,undefined,true); 
			copyArgs(Boolean(n),"VisibleToAllUsers",params,undefined,false); 
			copyArgs(n,"JobFlowRole",params,undefined,false); 
			copyArgs(n,"ServiceRole",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"SecurityConfiguration",params,undefined,false); 
			copyArgs(n,"AutoScalingRole",params,undefined,false); 
			copyArgs(n,"ScaleDownBehavior",params,undefined,false); 
			copyArgs(n,"CustomAmiId",params,undefined,false); 
			copyArgs(Number(n),"EbsRootVolumeSize",params,undefined,false); 
			copyArgs(n,"RepoUpgradeOnBoot",params,undefined,false); 
			copyArgs(n,"KerberosAttributes",params,undefined,true); 
			copyArgs(Number(n),"StepConcurrencyLevel",params,undefined,false); 
			copyArgs(n,"ManagedScalingPolicy",params,undefined,true); 
			copyArgs(n,"PlacementGroupConfigs",params,undefined,true); 
			copyArgs(n,"AutoTerminationPolicy",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"LogUri",params,undefined,false); 
			copyArgs(msg,"LogEncryptionKmsKeyId",params,undefined,false); 
			copyArgs(msg,"AdditionalInfo",params,undefined,false); 
			copyArgs(msg,"AmiVersion",params,undefined,false); 
			copyArgs(msg,"ReleaseLabel",params,undefined,false); 
			copyArgs(msg,"Instances",params,undefined,false); 
			copyArgs(msg,"Steps",params,undefined,true); 
			copyArgs(msg,"BootstrapActions",params,undefined,false); 
			copyArgs(msg,"SupportedProducts",params,undefined,true); 
			copyArgs(msg,"NewSupportedProducts",params,undefined,false); 
			copyArgs(msg,"Applications",params,undefined,true); 
			copyArgs(msg,"Configurations",params,undefined,true); 
			copyArgs(msg,"VisibleToAllUsers",params,undefined,false); 
			copyArgs(msg,"JobFlowRole",params,undefined,false); 
			copyArgs(msg,"ServiceRole",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"SecurityConfiguration",params,undefined,false); 
			copyArgs(msg,"AutoScalingRole",params,undefined,false); 
			copyArgs(msg,"ScaleDownBehavior",params,undefined,false); 
			copyArgs(msg,"CustomAmiId",params,undefined,false); 
			copyArgs(msg,"EbsRootVolumeSize",params,undefined,false); 
			copyArgs(msg,"RepoUpgradeOnBoot",params,undefined,false); 
			copyArgs(msg,"KerberosAttributes",params,undefined,true); 
			copyArgs(msg,"StepConcurrencyLevel",params,undefined,false); 
			copyArgs(msg,"ManagedScalingPolicy",params,undefined,true); 
			copyArgs(msg,"PlacementGroupConfigs",params,undefined,true); 
			copyArgs(msg,"AutoTerminationPolicy",params,undefined,true); 
			

			svc.runJobFlow(params,cb);
		}
			service.SetTerminationProtection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobFlowIds",params,undefined,true); 
			copyArgs(Boolean(n),"TerminationProtected",params,undefined,false); 
			
			copyArgs(n,"JobFlowIds",params,undefined,true); 
			copyArgs(Boolean(n),"TerminationProtected",params,undefined,false); 
			
			copyArgs(msg,"JobFlowIds",params,undefined,true); 
			copyArgs(msg,"TerminationProtected",params,undefined,false); 
			

			svc.setTerminationProtection(params,cb);
		}
			service.SetVisibleToAllUsers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobFlowIds",params,undefined,true); 
			copyArgs(Boolean(n),"VisibleToAllUsers",params,undefined,false); 
			
			copyArgs(n,"JobFlowIds",params,undefined,true); 
			copyArgs(Boolean(n),"VisibleToAllUsers",params,undefined,false); 
			
			copyArgs(msg,"JobFlowIds",params,undefined,true); 
			copyArgs(msg,"VisibleToAllUsers",params,undefined,false); 
			

			svc.setVisibleToAllUsers(params,cb);
		}
			service.StartNotebookExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EditorId",params,undefined,false); 
			copyArgs(n,"RelativePath",params,undefined,false); 
			copyArgs(n,"ExecutionEngine",params,undefined,true); 
			copyArgs(n,"ServiceRole",params,undefined,false); 
			
			copyArgs(n,"EditorId",params,undefined,false); 
			copyArgs(n,"RelativePath",params,undefined,false); 
			copyArgs(n,"NotebookExecutionName",params,undefined,false); 
			copyArgs(n,"NotebookParams",params,undefined,false); 
			copyArgs(n,"ExecutionEngine",params,undefined,true); 
			copyArgs(n,"ServiceRole",params,undefined,false); 
			copyArgs(n,"NotebookInstanceSecurityGroupId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"EditorId",params,undefined,false); 
			copyArgs(msg,"RelativePath",params,undefined,false); 
			copyArgs(msg,"NotebookExecutionName",params,undefined,false); 
			copyArgs(msg,"NotebookParams",params,undefined,false); 
			copyArgs(msg,"ExecutionEngine",params,undefined,true); 
			copyArgs(msg,"ServiceRole",params,undefined,false); 
			copyArgs(msg,"NotebookInstanceSecurityGroupId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.startNotebookExecution(params,cb);
		}
			service.StopNotebookExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NotebookExecutionId",params,undefined,false); 
			
			copyArgs(n,"NotebookExecutionId",params,undefined,false); 
			
			copyArgs(msg,"NotebookExecutionId",params,undefined,false); 
			

			svc.stopNotebookExecution(params,cb);
		}
			service.TerminateJobFlows=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobFlowIds",params,undefined,true); 
			
			copyArgs(n,"JobFlowIds",params,undefined,true); 
			
			copyArgs(msg,"JobFlowIds",params,undefined,true); 
			

			svc.terminateJobFlows(params,cb);
		}
			service.UpdateStudio=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StudioId",params,undefined,false); 
			
			copyArgs(n,"StudioId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			copyArgs(n,"DefaultS3Location",params,undefined,false); 
			
			copyArgs(msg,"StudioId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"SubnetIds",params,undefined,true); 
			copyArgs(msg,"DefaultS3Location",params,undefined,false); 
			

			svc.updateStudio(params,cb);
		}
			service.UpdateStudioSessionMapping=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StudioId",params,undefined,false); 
			copyArgs(n,"IdentityType",params,undefined,false); 
			copyArgs(n,"SessionPolicyArn",params,undefined,false); 
			
			copyArgs(n,"StudioId",params,undefined,false); 
			copyArgs(n,"IdentityId",params,undefined,false); 
			copyArgs(n,"IdentityName",params,undefined,false); 
			copyArgs(n,"IdentityType",params,undefined,false); 
			copyArgs(n,"SessionPolicyArn",params,undefined,false); 
			
			copyArgs(msg,"StudioId",params,undefined,false); 
			copyArgs(msg,"IdentityId",params,undefined,false); 
			copyArgs(msg,"IdentityName",params,undefined,false); 
			copyArgs(msg,"IdentityType",params,undefined,false); 
			copyArgs(msg,"SessionPolicyArn",params,undefined,false); 
			

			svc.updateStudioSessionMapping(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS EMR", AmazonAPINode);

};
