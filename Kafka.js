
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

		var awsService = new AWS.Kafka( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Kafka(msg.AWSConfig) : awsService;

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

		
		service.BatchAssociateScramSecret=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterArn",params,undefined,false); 
			copyArg(n,"SecretArnList",params,undefined,true); 
			
			copyArg(msg,"ClusterArn",params,undefined,false); 
			copyArg(msg,"SecretArnList",params,undefined,true); 
			

			svc.batchAssociateScramSecret(params,cb);
		}

		
		service.CreateCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BrokerNodeGroupInfo",params,undefined,true); 
			copyArg(n,"KafkaVersion",params,undefined,false); 
			copyArg(n,"NumberOfBrokerNodes",params,undefined,false); 
			copyArg(n,"ClusterName",params,undefined,false); 
			
			copyArg(msg,"BrokerNodeGroupInfo",params,undefined,true); 
			copyArg(msg,"ClientAuthentication",params,undefined,true); 
			copyArg(msg,"ClusterName",params,undefined,false); 
			copyArg(msg,"ConfigurationInfo",params,undefined,true); 
			copyArg(msg,"EncryptionInfo",params,undefined,true); 
			copyArg(msg,"EnhancedMonitoring",params,undefined,false); 
			copyArg(msg,"OpenMonitoring",params,undefined,true); 
			copyArg(msg,"KafkaVersion",params,undefined,false); 
			copyArg(msg,"LoggingInfo",params,undefined,true); 
			copyArg(msg,"NumberOfBrokerNodes",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createCluster(params,cb);
		}

		
		service.CreateConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerProperties",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"KafkaVersions",params,undefined,true); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ServerProperties",params,undefined,false); 
			

			svc.createConfiguration(params,cb);
		}

		
		service.DeleteCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterArn",params,undefined,false); 
			
			copyArg(msg,"ClusterArn",params,undefined,false); 
			copyArg(msg,"CurrentVersion",params,undefined,false); 
			

			svc.deleteCluster(params,cb);
		}

		
		service.DeleteConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Arn",params,undefined,false); 
			
			copyArg(msg,"Arn",params,undefined,false); 
			

			svc.deleteConfiguration(params,cb);
		}

		
		service.DescribeCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterArn",params,undefined,false); 
			
			copyArg(msg,"ClusterArn",params,undefined,false); 
			

			svc.describeCluster(params,cb);
		}

		
		service.DescribeClusterOperation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterOperationArn",params,undefined,false); 
			
			copyArg(msg,"ClusterOperationArn",params,undefined,false); 
			

			svc.describeClusterOperation(params,cb);
		}

		
		service.DescribeConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Arn",params,undefined,false); 
			
			copyArg(msg,"Arn",params,undefined,false); 
			

			svc.describeConfiguration(params,cb);
		}

		
		service.DescribeConfigurationRevision=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Revision",params,undefined,false); 
			copyArg(n,"Arn",params,undefined,false); 
			
			copyArg(msg,"Arn",params,undefined,false); 
			copyArg(msg,"Revision",params,undefined,false); 
			

			svc.describeConfigurationRevision(params,cb);
		}

		
		service.BatchDisassociateScramSecret=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterArn",params,undefined,false); 
			copyArg(n,"SecretArnList",params,undefined,true); 
			
			copyArg(msg,"ClusterArn",params,undefined,false); 
			copyArg(msg,"SecretArnList",params,undefined,true); 
			

			svc.batchDisassociateScramSecret(params,cb);
		}

		
		service.GetBootstrapBrokers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterArn",params,undefined,false); 
			
			copyArg(msg,"ClusterArn",params,undefined,false); 
			

			svc.getBootstrapBrokers(params,cb);
		}

		
		service.GetCompatibleKafkaVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ClusterArn",params,undefined,false); 
			

			svc.getCompatibleKafkaVersions(params,cb);
		}

		
		service.ListClusterOperations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterArn",params,undefined,false); 
			
			copyArg(msg,"ClusterArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listClusterOperations(params,cb);
		}

		
		service.ListClusters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ClusterNameFilter",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listClusters(params,cb);
		}

		
		service.ListConfigurationRevisions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Arn",params,undefined,false); 
			
			copyArg(msg,"Arn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listConfigurationRevisions(params,cb);
		}

		
		service.ListConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listConfigurations(params,cb);
		}

		
		service.ListKafkaVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listKafkaVersions(params,cb);
		}

		
		service.ListNodes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterArn",params,undefined,false); 
			
			copyArg(msg,"ClusterArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listNodes(params,cb);
		}

		
		service.ListScramSecrets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterArn",params,undefined,false); 
			
			copyArg(msg,"ClusterArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listScramSecrets(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.RebootBroker=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterArn",params,undefined,false); 
			copyArg(n,"BrokerIds",params,undefined,true); 
			
			copyArg(msg,"BrokerIds",params,undefined,true); 
			copyArg(msg,"ClusterArn",params,undefined,false); 
			

			svc.rebootBroker(params,cb);
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

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TagKeys",params,undefined,true); 
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateBrokerCount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterArn",params,undefined,false); 
			copyArg(n,"CurrentVersion",params,undefined,false); 
			copyArg(n,"TargetNumberOfBrokerNodes",params,undefined,false); 
			
			copyArg(msg,"ClusterArn",params,undefined,false); 
			copyArg(msg,"CurrentVersion",params,undefined,false); 
			copyArg(msg,"TargetNumberOfBrokerNodes",params,undefined,false); 
			

			svc.updateBrokerCount(params,cb);
		}

		
		service.UpdateBrokerType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterArn",params,undefined,false); 
			copyArg(n,"CurrentVersion",params,undefined,false); 
			copyArg(n,"TargetInstanceType",params,undefined,false); 
			
			copyArg(msg,"ClusterArn",params,undefined,false); 
			copyArg(msg,"CurrentVersion",params,undefined,false); 
			copyArg(msg,"TargetInstanceType",params,undefined,false); 
			

			svc.updateBrokerType(params,cb);
		}

		
		service.UpdateBrokerStorage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterArn",params,undefined,false); 
			copyArg(n,"TargetBrokerEBSVolumeInfo",params,undefined,true); 
			copyArg(n,"CurrentVersion",params,undefined,false); 
			
			copyArg(msg,"ClusterArn",params,undefined,false); 
			copyArg(msg,"CurrentVersion",params,undefined,false); 
			copyArg(msg,"TargetBrokerEBSVolumeInfo",params,undefined,true); 
			

			svc.updateBrokerStorage(params,cb);
		}

		
		service.UpdateConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Arn",params,undefined,false); 
			copyArg(n,"ServerProperties",params,undefined,false); 
			
			copyArg(msg,"Arn",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"ServerProperties",params,undefined,false); 
			

			svc.updateConfiguration(params,cb);
		}

		
		service.UpdateClusterConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterArn",params,undefined,false); 
			copyArg(n,"CurrentVersion",params,undefined,false); 
			copyArg(n,"ConfigurationInfo",params,undefined,true); 
			
			copyArg(msg,"ClusterArn",params,undefined,false); 
			copyArg(msg,"ConfigurationInfo",params,undefined,true); 
			copyArg(msg,"CurrentVersion",params,undefined,false); 
			

			svc.updateClusterConfiguration(params,cb);
		}

		
		service.UpdateClusterKafkaVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterArn",params,undefined,false); 
			copyArg(n,"TargetKafkaVersion",params,undefined,false); 
			copyArg(n,"CurrentVersion",params,undefined,false); 
			
			copyArg(msg,"ClusterArn",params,undefined,false); 
			copyArg(msg,"ConfigurationInfo",params,undefined,true); 
			copyArg(msg,"CurrentVersion",params,undefined,false); 
			copyArg(msg,"TargetKafkaVersion",params,undefined,false); 
			

			svc.updateClusterKafkaVersion(params,cb);
		}

		
		service.UpdateMonitoring=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterArn",params,undefined,false); 
			copyArg(n,"CurrentVersion",params,undefined,false); 
			
			copyArg(msg,"ClusterArn",params,undefined,false); 
			copyArg(msg,"CurrentVersion",params,undefined,false); 
			copyArg(msg,"EnhancedMonitoring",params,undefined,false); 
			copyArg(msg,"OpenMonitoring",params,undefined,true); 
			copyArg(msg,"LoggingInfo",params,undefined,true); 
			

			svc.updateMonitoring(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Kafka", AmazonAPINode);

};
