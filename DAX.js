
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

		var awsService = new AWS.DAX( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.DAX(msg.AWSConfig) : awsService;

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

		
		service.CreateCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterName",params,undefined,false); 
			copyArg(n,"NodeType",params,undefined,false); 
			copyArg(n,"ReplicationFactor",params,undefined,false); 
			copyArg(n,"IamRoleArn",params,undefined,false); 
			
			copyArg(msg,"ClusterName",params,undefined,false); 
			copyArg(msg,"NodeType",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"ReplicationFactor",params,undefined,false); 
			copyArg(msg,"AvailabilityZones",params,undefined,true); 
			copyArg(msg,"SubnetGroupName",params,undefined,false); 
			copyArg(msg,"SecurityGroupIds",params,undefined,true); 
			copyArg(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArg(msg,"NotificationTopicArn",params,undefined,false); 
			copyArg(msg,"IamRoleArn",params,undefined,false); 
			copyArg(msg,"ParameterGroupName",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"SSESpecification",params,undefined,false); 
			copyArg(msg,"ClusterEndpointEncryptionType",params,undefined,false); 
			

			svc.createCluster(params,cb);
		}

		
		service.CreateParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ParameterGroupName",params,undefined,false); 
			
			copyArg(msg,"ParameterGroupName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			

			svc.createParameterGroup(params,cb);
		}

		
		service.CreateSubnetGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubnetGroupName",params,undefined,false); 
			copyArg(n,"SubnetIds",params,undefined,true); 
			
			copyArg(msg,"SubnetGroupName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"SubnetIds",params,undefined,true); 
			

			svc.createSubnetGroup(params,cb);
		}

		
		service.DecreaseReplicationFactor=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterName",params,undefined,false); 
			copyArg(n,"NewReplicationFactor",params,undefined,false); 
			
			copyArg(msg,"ClusterName",params,undefined,false); 
			copyArg(msg,"NewReplicationFactor",params,undefined,false); 
			copyArg(msg,"AvailabilityZones",params,undefined,true); 
			copyArg(msg,"NodeIdsToRemove",params,undefined,true); 
			

			svc.decreaseReplicationFactor(params,cb);
		}

		
		service.DeleteCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterName",params,undefined,false); 
			
			copyArg(msg,"ClusterName",params,undefined,false); 
			

			svc.deleteCluster(params,cb);
		}

		
		service.DeleteParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ParameterGroupName",params,undefined,false); 
			
			copyArg(msg,"ParameterGroupName",params,undefined,false); 
			

			svc.deleteParameterGroup(params,cb);
		}

		
		service.DeleteSubnetGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubnetGroupName",params,undefined,false); 
			
			copyArg(msg,"SubnetGroupName",params,undefined,false); 
			

			svc.deleteSubnetGroup(params,cb);
		}

		
		service.DescribeClusters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ClusterNames",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeClusters(params,cb);
		}

		
		service.DescribeDefaultParameters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeDefaultParameters(params,cb);
		}

		
		service.DescribeEvents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SourceName",params,undefined,false); 
			copyArg(msg,"SourceType",params,undefined,false); 
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"Duration",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeEvents(params,cb);
		}

		
		service.DescribeParameterGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ParameterGroupNames",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeParameterGroups(params,cb);
		}

		
		service.DescribeParameters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ParameterGroupName",params,undefined,false); 
			
			copyArg(msg,"ParameterGroupName",params,undefined,false); 
			copyArg(msg,"Source",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeParameters(params,cb);
		}

		
		service.DescribeSubnetGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SubnetGroupNames",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeSubnetGroups(params,cb);
		}

		
		service.IncreaseReplicationFactor=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterName",params,undefined,false); 
			copyArg(n,"NewReplicationFactor",params,undefined,false); 
			
			copyArg(msg,"ClusterName",params,undefined,false); 
			copyArg(msg,"NewReplicationFactor",params,undefined,false); 
			copyArg(msg,"AvailabilityZones",params,undefined,true); 
			

			svc.increaseReplicationFactor(params,cb);
		}

		
		service.ListTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceName",params,undefined,false); 
			
			copyArg(msg,"ResourceName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listTags(params,cb);
		}

		
		service.RebootNode=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterName",params,undefined,false); 
			copyArg(n,"NodeId",params,undefined,false); 
			
			copyArg(msg,"ClusterName",params,undefined,false); 
			copyArg(msg,"NodeId",params,undefined,false); 
			

			svc.rebootNode(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceName",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceName",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceName",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceName",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterName",params,undefined,false); 
			
			copyArg(msg,"ClusterName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArg(msg,"NotificationTopicArn",params,undefined,false); 
			copyArg(msg,"NotificationTopicStatus",params,undefined,false); 
			copyArg(msg,"ParameterGroupName",params,undefined,false); 
			copyArg(msg,"SecurityGroupIds",params,undefined,true); 
			

			svc.updateCluster(params,cb);
		}

		
		service.UpdateParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ParameterGroupName",params,undefined,false); 
			copyArg(n,"ParameterNameValues",params,undefined,false); 
			
			copyArg(msg,"ParameterGroupName",params,undefined,false); 
			copyArg(msg,"ParameterNameValues",params,undefined,false); 
			

			svc.updateParameterGroup(params,cb);
		}

		
		service.UpdateSubnetGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubnetGroupName",params,undefined,false); 
			
			copyArg(msg,"SubnetGroupName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"SubnetIds",params,undefined,true); 
			

			svc.updateSubnetGroup(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS DAX", AmazonAPINode);

};
