
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

		var awsService = new AWS.DAX( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.DAX(msg.AWSConfig) : awsService;

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

		
		service.CreateCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterName",params,undefined,false); 
			copyArgs(n,"NodeType",params,undefined,false); 
			copyArgs(n,"ReplicationFactor",params,undefined,false); 
			copyArgs(n,"IamRoleArn",params,undefined,false); 
			
			copyArgs(n,"ClusterName",params,undefined,false); 
			copyArgs(n,"NodeType",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"ReplicationFactor",params,undefined,false); 
			copyArgs(n,"AvailabilityZones",params,undefined,true); 
			copyArgs(n,"SubnetGroupName",params,undefined,false); 
			copyArgs(n,"SecurityGroupIds",params,undefined,true); 
			copyArgs(n,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(n,"NotificationTopicArn",params,undefined,false); 
			copyArgs(n,"IamRoleArn",params,undefined,false); 
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"SSESpecification",params,undefined,false); 
			copyArgs(n,"ClusterEndpointEncryptionType",params,undefined,false); 
			
			copyArgs(msg,"ClusterName",params,undefined,false); 
			copyArgs(msg,"NodeType",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"ReplicationFactor",params,undefined,false); 
			copyArgs(msg,"AvailabilityZones",params,undefined,true); 
			copyArgs(msg,"SubnetGroupName",params,undefined,false); 
			copyArgs(msg,"SecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(msg,"NotificationTopicArn",params,undefined,false); 
			copyArgs(msg,"IamRoleArn",params,undefined,false); 
			copyArgs(msg,"ParameterGroupName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"SSESpecification",params,undefined,false); 
			copyArgs(msg,"ClusterEndpointEncryptionType",params,undefined,false); 
			

			svc.createCluster(params,cb);
		}

		
		service.CreateParameterGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(msg,"ParameterGroupName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			

			svc.createParameterGroup(params,cb);
		}

		
		service.CreateSubnetGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubnetGroupName",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			
			copyArgs(n,"SubnetGroupName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			
			copyArgs(msg,"SubnetGroupName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"SubnetIds",params,undefined,true); 
			

			svc.createSubnetGroup(params,cb);
		}

		
		service.DecreaseReplicationFactor=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterName",params,undefined,false); 
			copyArgs(n,"NewReplicationFactor",params,undefined,false); 
			
			copyArgs(n,"ClusterName",params,undefined,false); 
			copyArgs(n,"NewReplicationFactor",params,undefined,false); 
			copyArgs(n,"AvailabilityZones",params,undefined,true); 
			copyArgs(n,"NodeIdsToRemove",params,undefined,true); 
			
			copyArgs(msg,"ClusterName",params,undefined,false); 
			copyArgs(msg,"NewReplicationFactor",params,undefined,false); 
			copyArgs(msg,"AvailabilityZones",params,undefined,true); 
			copyArgs(msg,"NodeIdsToRemove",params,undefined,true); 
			

			svc.decreaseReplicationFactor(params,cb);
		}

		
		service.DeleteCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterName",params,undefined,false); 
			
			copyArgs(n,"ClusterName",params,undefined,false); 
			
			copyArgs(msg,"ClusterName",params,undefined,false); 
			

			svc.deleteCluster(params,cb);
		}

		
		service.DeleteParameterGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			
			copyArgs(msg,"ParameterGroupName",params,undefined,false); 
			

			svc.deleteParameterGroup(params,cb);
		}

		
		service.DeleteSubnetGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubnetGroupName",params,undefined,false); 
			
			copyArgs(n,"SubnetGroupName",params,undefined,false); 
			
			copyArgs(msg,"SubnetGroupName",params,undefined,false); 
			

			svc.deleteSubnetGroup(params,cb);
		}

		
		service.DescribeClusters=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ClusterNames",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ClusterNames",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeClusters(params,cb);
		}

		
		service.DescribeDefaultParameters=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeDefaultParameters(params,cb);
		}

		
		service.DescribeEvents=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SourceName",params,undefined,false); 
			copyArgs(n,"SourceType",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(n,"Duration",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"SourceName",params,undefined,false); 
			copyArgs(msg,"SourceType",params,undefined,false); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"Duration",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeEvents(params,cb);
		}

		
		service.DescribeParameterGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ParameterGroupNames",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ParameterGroupNames",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeParameterGroups(params,cb);
		}

		
		service.DescribeParameters=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			copyArgs(n,"Source",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ParameterGroupName",params,undefined,false); 
			copyArgs(msg,"Source",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeParameters(params,cb);
		}

		
		service.DescribeSubnetGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SubnetGroupNames",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"SubnetGroupNames",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeSubnetGroups(params,cb);
		}

		
		service.IncreaseReplicationFactor=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterName",params,undefined,false); 
			copyArgs(n,"NewReplicationFactor",params,undefined,false); 
			
			copyArgs(n,"ClusterName",params,undefined,false); 
			copyArgs(n,"NewReplicationFactor",params,undefined,false); 
			copyArgs(n,"AvailabilityZones",params,undefined,true); 
			
			copyArgs(msg,"ClusterName",params,undefined,false); 
			copyArgs(msg,"NewReplicationFactor",params,undefined,false); 
			copyArgs(msg,"AvailabilityZones",params,undefined,true); 
			

			svc.increaseReplicationFactor(params,cb);
		}

		
		service.ListTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceName",params,undefined,false); 
			
			copyArgs(n,"ResourceName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ResourceName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listTags(params,cb);
		}

		
		service.RebootNode=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterName",params,undefined,false); 
			copyArgs(n,"NodeId",params,undefined,false); 
			
			copyArgs(n,"ClusterName",params,undefined,false); 
			copyArgs(n,"NodeId",params,undefined,false); 
			
			copyArgs(msg,"ClusterName",params,undefined,false); 
			copyArgs(msg,"NodeId",params,undefined,false); 
			

			svc.rebootNode(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceName",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceName",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceName",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterName",params,undefined,false); 
			
			copyArgs(n,"ClusterName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(n,"NotificationTopicArn",params,undefined,false); 
			copyArgs(n,"NotificationTopicStatus",params,undefined,false); 
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			copyArgs(n,"SecurityGroupIds",params,undefined,true); 
			
			copyArgs(msg,"ClusterName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(msg,"NotificationTopicArn",params,undefined,false); 
			copyArgs(msg,"NotificationTopicStatus",params,undefined,false); 
			copyArgs(msg,"ParameterGroupName",params,undefined,false); 
			copyArgs(msg,"SecurityGroupIds",params,undefined,true); 
			

			svc.updateCluster(params,cb);
		}

		
		service.UpdateParameterGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			copyArgs(n,"ParameterNameValues",params,undefined,false); 
			
			copyArgs(n,"ParameterGroupName",params,undefined,false); 
			copyArgs(n,"ParameterNameValues",params,undefined,false); 
			
			copyArgs(msg,"ParameterGroupName",params,undefined,false); 
			copyArgs(msg,"ParameterNameValues",params,undefined,false); 
			

			svc.updateParameterGroup(params,cb);
		}

		
		service.UpdateSubnetGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubnetGroupName",params,undefined,false); 
			
			copyArgs(n,"SubnetGroupName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			
			copyArgs(msg,"SubnetGroupName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"SubnetIds",params,undefined,true); 
			

			svc.updateSubnetGroup(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS DAX", AmazonAPINode);

};
