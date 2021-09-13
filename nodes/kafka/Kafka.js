
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

		var awsService = new AWS.Kafka( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Kafka(msg.AWSConfig) : awsService;

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
		
			service.BatchAssociateScramSecret=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			copyArgs(n,"SecretArnList",params,undefined,true); 
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			copyArgs(n,"SecretArnList",params,undefined,true); 
			
			copyArgs(msg,"ClusterArn",params,undefined,false); 
			copyArgs(msg,"SecretArnList",params,undefined,true); 
			

			svc.batchAssociateScramSecret(params,cb);
		}
			service.CreateCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BrokerNodeGroupInfo",params,undefined,true); 
			copyArgs(n,"KafkaVersion",params,undefined,false); 
			copyArgs(Number(n),"NumberOfBrokerNodes",params,undefined,false); 
			copyArgs(n,"ClusterName",params,undefined,false); 
			
			copyArgs(n,"BrokerNodeGroupInfo",params,undefined,true); 
			copyArgs(n,"ClientAuthentication",params,undefined,true); 
			copyArgs(n,"ClusterName",params,undefined,false); 
			copyArgs(n,"ConfigurationInfo",params,undefined,true); 
			copyArgs(n,"EncryptionInfo",params,undefined,true); 
			copyArgs(n,"EnhancedMonitoring",params,undefined,false); 
			copyArgs(n,"OpenMonitoring",params,undefined,true); 
			copyArgs(n,"KafkaVersion",params,undefined,false); 
			copyArgs(n,"LoggingInfo",params,undefined,true); 
			copyArgs(Number(n),"NumberOfBrokerNodes",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"BrokerNodeGroupInfo",params,undefined,true); 
			copyArgs(msg,"ClientAuthentication",params,undefined,true); 
			copyArgs(msg,"ClusterName",params,undefined,false); 
			copyArgs(msg,"ConfigurationInfo",params,undefined,true); 
			copyArgs(msg,"EncryptionInfo",params,undefined,true); 
			copyArgs(msg,"EnhancedMonitoring",params,undefined,false); 
			copyArgs(msg,"OpenMonitoring",params,undefined,true); 
			copyArgs(msg,"KafkaVersion",params,undefined,false); 
			copyArgs(msg,"LoggingInfo",params,undefined,true); 
			copyArgs(msg,"NumberOfBrokerNodes",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createCluster(params,cb);
		}
			service.CreateConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(Buffer.from(n),"ServerProperties",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"KafkaVersions",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(Buffer.from(n),"ServerProperties",params,undefined,false); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"KafkaVersions",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ServerProperties",params,undefined,false); 
			

			svc.createConfiguration(params,cb);
		}
			service.DeleteCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			copyArgs(n,"CurrentVersion",params,undefined,false); 
			
			copyArgs(msg,"ClusterArn",params,undefined,false); 
			copyArgs(msg,"CurrentVersion",params,undefined,false); 
			

			svc.deleteCluster(params,cb);
		}
			service.DeleteConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			

			svc.deleteConfiguration(params,cb);
		}
			service.DescribeCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			
			copyArgs(msg,"ClusterArn",params,undefined,false); 
			

			svc.describeCluster(params,cb);
		}
			service.DescribeClusterOperation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterOperationArn",params,undefined,false); 
			
			copyArgs(n,"ClusterOperationArn",params,undefined,false); 
			
			copyArgs(msg,"ClusterOperationArn",params,undefined,false); 
			

			svc.describeClusterOperation(params,cb);
		}
			service.DescribeConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			

			svc.describeConfiguration(params,cb);
		}
			service.DescribeConfigurationRevision=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Revision",params,undefined,false); 
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"Revision",params,undefined,false); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			copyArgs(msg,"Revision",params,undefined,false); 
			

			svc.describeConfigurationRevision(params,cb);
		}
			service.BatchDisassociateScramSecret=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			copyArgs(n,"SecretArnList",params,undefined,true); 
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			copyArgs(n,"SecretArnList",params,undefined,true); 
			
			copyArgs(msg,"ClusterArn",params,undefined,false); 
			copyArgs(msg,"SecretArnList",params,undefined,true); 
			

			svc.batchDisassociateScramSecret(params,cb);
		}
			service.GetBootstrapBrokers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			
			copyArgs(msg,"ClusterArn",params,undefined,false); 
			

			svc.getBootstrapBrokers(params,cb);
		}
			service.GetCompatibleKafkaVersions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			
			copyArgs(msg,"ClusterArn",params,undefined,false); 
			

			svc.getCompatibleKafkaVersions(params,cb);
		}
			service.ListClusterOperations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ClusterArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listClusterOperations(params,cb);
		}
			service.ListClusters=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ClusterNameFilter",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ClusterNameFilter",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listClusters(params,cb);
		}
			service.ListConfigurationRevisions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listConfigurationRevisions(params,cb);
		}
			service.ListConfigurations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listConfigurations(params,cb);
		}
			service.ListKafkaVersions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listKafkaVersions(params,cb);
		}
			service.ListNodes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ClusterArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listNodes(params,cb);
		}
			service.ListScramSecrets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ClusterArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listScramSecrets(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.RebootBroker=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			copyArgs(n,"BrokerIds",params,undefined,true); 
			
			copyArgs(n,"BrokerIds",params,undefined,true); 
			copyArgs(n,"ClusterArn",params,undefined,false); 
			
			copyArgs(msg,"BrokerIds",params,undefined,true); 
			copyArgs(msg,"ClusterArn",params,undefined,false); 
			

			svc.rebootBroker(params,cb);
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
			service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TagKeys",params,undefined,true); 
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			

			svc.untagResource(params,cb);
		}
			service.UpdateBrokerCount=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			copyArgs(n,"CurrentVersion",params,undefined,false); 
			copyArgs(Number(n),"TargetNumberOfBrokerNodes",params,undefined,false); 
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			copyArgs(n,"CurrentVersion",params,undefined,false); 
			copyArgs(Number(n),"TargetNumberOfBrokerNodes",params,undefined,false); 
			
			copyArgs(msg,"ClusterArn",params,undefined,false); 
			copyArgs(msg,"CurrentVersion",params,undefined,false); 
			copyArgs(msg,"TargetNumberOfBrokerNodes",params,undefined,false); 
			

			svc.updateBrokerCount(params,cb);
		}
			service.UpdateBrokerType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			copyArgs(n,"CurrentVersion",params,undefined,false); 
			copyArgs(n,"TargetInstanceType",params,undefined,false); 
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			copyArgs(n,"CurrentVersion",params,undefined,false); 
			copyArgs(n,"TargetInstanceType",params,undefined,false); 
			
			copyArgs(msg,"ClusterArn",params,undefined,false); 
			copyArgs(msg,"CurrentVersion",params,undefined,false); 
			copyArgs(msg,"TargetInstanceType",params,undefined,false); 
			

			svc.updateBrokerType(params,cb);
		}
			service.UpdateBrokerStorage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			copyArgs(n,"TargetBrokerEBSVolumeInfo",params,undefined,true); 
			copyArgs(n,"CurrentVersion",params,undefined,false); 
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			copyArgs(n,"CurrentVersion",params,undefined,false); 
			copyArgs(n,"TargetBrokerEBSVolumeInfo",params,undefined,true); 
			
			copyArgs(msg,"ClusterArn",params,undefined,false); 
			copyArgs(msg,"CurrentVersion",params,undefined,false); 
			copyArgs(msg,"TargetBrokerEBSVolumeInfo",params,undefined,true); 
			

			svc.updateBrokerStorage(params,cb);
		}
			service.UpdateConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(Buffer.from(n),"ServerProperties",params,undefined,false); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(Buffer.from(n),"ServerProperties",params,undefined,false); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"ServerProperties",params,undefined,false); 
			

			svc.updateConfiguration(params,cb);
		}
			service.UpdateClusterConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			copyArgs(n,"CurrentVersion",params,undefined,false); 
			copyArgs(n,"ConfigurationInfo",params,undefined,true); 
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			copyArgs(n,"ConfigurationInfo",params,undefined,true); 
			copyArgs(n,"CurrentVersion",params,undefined,false); 
			
			copyArgs(msg,"ClusterArn",params,undefined,false); 
			copyArgs(msg,"ConfigurationInfo",params,undefined,true); 
			copyArgs(msg,"CurrentVersion",params,undefined,false); 
			

			svc.updateClusterConfiguration(params,cb);
		}
			service.UpdateClusterKafkaVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			copyArgs(n,"TargetKafkaVersion",params,undefined,false); 
			copyArgs(n,"CurrentVersion",params,undefined,false); 
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			copyArgs(n,"ConfigurationInfo",params,undefined,true); 
			copyArgs(n,"CurrentVersion",params,undefined,false); 
			copyArgs(n,"TargetKafkaVersion",params,undefined,false); 
			
			copyArgs(msg,"ClusterArn",params,undefined,false); 
			copyArgs(msg,"ConfigurationInfo",params,undefined,true); 
			copyArgs(msg,"CurrentVersion",params,undefined,false); 
			copyArgs(msg,"TargetKafkaVersion",params,undefined,false); 
			

			svc.updateClusterKafkaVersion(params,cb);
		}
			service.UpdateMonitoring=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			copyArgs(n,"CurrentVersion",params,undefined,false); 
			
			copyArgs(n,"ClusterArn",params,undefined,false); 
			copyArgs(n,"CurrentVersion",params,undefined,false); 
			copyArgs(n,"EnhancedMonitoring",params,undefined,false); 
			copyArgs(n,"OpenMonitoring",params,undefined,true); 
			copyArgs(n,"LoggingInfo",params,undefined,true); 
			
			copyArgs(msg,"ClusterArn",params,undefined,false); 
			copyArgs(msg,"CurrentVersion",params,undefined,false); 
			copyArgs(msg,"EnhancedMonitoring",params,undefined,false); 
			copyArgs(msg,"OpenMonitoring",params,undefined,true); 
			copyArgs(msg,"LoggingInfo",params,undefined,true); 
			

			svc.updateMonitoring(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS Kafka", AmazonAPINode);

};
