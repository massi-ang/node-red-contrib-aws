
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

		var awsService = new AWS.CloudHSMV2( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.CloudHSMV2(msg.AWSConfig) : awsService;

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
		
			service.CopyBackupToRegion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DestinationRegion",params,undefined,false); 
			copyArgs(n,"BackupId",params,undefined,false); 
			
			copyArgs(n,"DestinationRegion",params,undefined,false); 
			copyArgs(n,"BackupId",params,undefined,false); 
			copyArgs(n,"TagList",params,undefined,true); 
			
			copyArgs(msg,"DestinationRegion",params,undefined,false); 
			copyArgs(msg,"BackupId",params,undefined,false); 
			copyArgs(msg,"TagList",params,undefined,true); 
			

			svc.copyBackupToRegion(params,cb);
		}
			service.CreateCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HsmType",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,false); 
			
			copyArgs(n,"BackupRetentionPolicy",params,undefined,true); 
			copyArgs(n,"HsmType",params,undefined,false); 
			copyArgs(n,"SourceBackupId",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,false); 
			copyArgs(n,"TagList",params,undefined,true); 
			
			copyArgs(msg,"BackupRetentionPolicy",params,undefined,true); 
			copyArgs(msg,"HsmType",params,undefined,false); 
			copyArgs(msg,"SourceBackupId",params,undefined,false); 
			copyArgs(msg,"SubnetIds",params,undefined,false); 
			copyArgs(msg,"TagList",params,undefined,true); 
			

			svc.createCluster(params,cb);
		}
			service.CreateHsm=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"AvailabilityZone",params,undefined,false); 
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"AvailabilityZone",params,undefined,false); 
			copyArgs(n,"IpAddress",params,undefined,false); 
			
			copyArgs(msg,"ClusterId",params,undefined,false); 
			copyArgs(msg,"AvailabilityZone",params,undefined,false); 
			copyArgs(msg,"IpAddress",params,undefined,false); 
			

			svc.createHsm(params,cb);
		}
			service.DeleteBackup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupId",params,undefined,false); 
			
			copyArgs(n,"BackupId",params,undefined,false); 
			
			copyArgs(msg,"BackupId",params,undefined,false); 
			

			svc.deleteBackup(params,cb);
		}
			service.DeleteCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			
			copyArgs(msg,"ClusterId",params,undefined,false); 
			

			svc.deleteCluster(params,cb);
		}
			service.DeleteHsm=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"HsmId",params,undefined,false); 
			copyArgs(n,"EniId",params,undefined,false); 
			copyArgs(n,"EniIp",params,undefined,false); 
			
			copyArgs(msg,"ClusterId",params,undefined,false); 
			copyArgs(msg,"HsmId",params,undefined,false); 
			copyArgs(msg,"EniId",params,undefined,false); 
			copyArgs(msg,"EniIp",params,undefined,false); 
			

			svc.deleteHsm(params,cb);
		}
			service.DescribeBackups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(Boolean(n),"SortAscending",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"SortAscending",params,undefined,false); 
			

			svc.describeBackups(params,cb);
		}
			service.DescribeClusters=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeClusters(params,cb);
		}
			service.InitializeCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"SignedCert",params,undefined,false); 
			copyArgs(n,"TrustAnchor",params,undefined,false); 
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"SignedCert",params,undefined,false); 
			copyArgs(n,"TrustAnchor",params,undefined,false); 
			
			copyArgs(msg,"ClusterId",params,undefined,false); 
			copyArgs(msg,"SignedCert",params,undefined,false); 
			copyArgs(msg,"TrustAnchor",params,undefined,false); 
			

			svc.initializeCluster(params,cb);
		}
			service.ListTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listTags(params,cb);
		}
			service.ModifyBackupAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupId",params,undefined,false); 
			copyArgs(Boolean(n),"NeverExpires",params,undefined,false); 
			
			copyArgs(n,"BackupId",params,undefined,false); 
			copyArgs(Boolean(n),"NeverExpires",params,undefined,false); 
			
			copyArgs(msg,"BackupId",params,undefined,false); 
			copyArgs(msg,"NeverExpires",params,undefined,false); 
			

			svc.modifyBackupAttributes(params,cb);
		}
			service.ModifyCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupRetentionPolicy",params,undefined,true); 
			copyArgs(n,"ClusterId",params,undefined,false); 
			
			copyArgs(n,"BackupRetentionPolicy",params,undefined,true); 
			copyArgs(n,"ClusterId",params,undefined,false); 
			
			copyArgs(msg,"BackupRetentionPolicy",params,undefined,true); 
			copyArgs(msg,"ClusterId",params,undefined,false); 
			

			svc.modifyCluster(params,cb);
		}
			service.RestoreBackup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupId",params,undefined,false); 
			
			copyArgs(n,"BackupId",params,undefined,false); 
			
			copyArgs(msg,"BackupId",params,undefined,false); 
			

			svc.restoreBackup(params,cb);
		}
			service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"TagList",params,undefined,true); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"TagList",params,undefined,true); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"TagList",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
			service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"TagKeyList",params,undefined,false); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"TagKeyList",params,undefined,false); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"TagKeyList",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS CloudHSMV2", AmazonAPINode);

};
