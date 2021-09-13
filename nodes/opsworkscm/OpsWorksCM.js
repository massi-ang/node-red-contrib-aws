
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

		var awsService = new AWS.OpsWorksCM( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.OpsWorksCM(msg.AWSConfig) : awsService;

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
		
			service.AssociateNode=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerName",params,undefined,false); 
			copyArgs(n,"NodeName",params,undefined,false); 
			copyArgs(n,"EngineAttributes",params,undefined,true); 
			
			copyArgs(n,"ServerName",params,undefined,false); 
			copyArgs(n,"NodeName",params,undefined,false); 
			copyArgs(n,"EngineAttributes",params,undefined,true); 
			
			copyArgs(msg,"ServerName",params,undefined,false); 
			copyArgs(msg,"NodeName",params,undefined,false); 
			copyArgs(msg,"EngineAttributes",params,undefined,true); 
			

			svc.associateNode(params,cb);
		}
			service.CreateBackup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerName",params,undefined,false); 
			
			copyArgs(n,"ServerName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ServerName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createBackup(params,cb);
		}
			service.CreateServer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"ServerName",params,undefined,false); 
			copyArgs(n,"InstanceProfileArn",params,undefined,false); 
			copyArgs(n,"InstanceType",params,undefined,false); 
			copyArgs(n,"ServiceRoleArn",params,undefined,false); 
			
			copyArgs(Boolean(n),"AssociatePublicIpAddress",params,undefined,false); 
			copyArgs(n,"CustomDomain",params,undefined,false); 
			copyArgs(n,"CustomCertificate",params,undefined,false); 
			copyArgs(n,"CustomPrivateKey",params,undefined,false); 
			copyArgs(Boolean(n),"DisableAutomatedBackup",params,undefined,false); 
			copyArgs(n,"Engine",params,undefined,false); 
			copyArgs(n,"EngineModel",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(n,"EngineAttributes",params,undefined,true); 
			copyArgs(Number(n),"BackupRetentionCount",params,undefined,false); 
			copyArgs(n,"ServerName",params,undefined,false); 
			copyArgs(n,"InstanceProfileArn",params,undefined,false); 
			copyArgs(n,"InstanceType",params,undefined,false); 
			copyArgs(n,"KeyPair",params,undefined,false); 
			copyArgs(n,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(n,"PreferredBackupWindow",params,undefined,false); 
			copyArgs(n,"SecurityGroupIds",params,undefined,true); 
			copyArgs(n,"ServiceRoleArn",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"BackupId",params,undefined,false); 
			
			copyArgs(msg,"AssociatePublicIpAddress",params,undefined,false); 
			copyArgs(msg,"CustomDomain",params,undefined,false); 
			copyArgs(msg,"CustomCertificate",params,undefined,false); 
			copyArgs(msg,"CustomPrivateKey",params,undefined,false); 
			copyArgs(msg,"DisableAutomatedBackup",params,undefined,false); 
			copyArgs(msg,"Engine",params,undefined,false); 
			copyArgs(msg,"EngineModel",params,undefined,false); 
			copyArgs(msg,"EngineVersion",params,undefined,false); 
			copyArgs(msg,"EngineAttributes",params,undefined,true); 
			copyArgs(msg,"BackupRetentionCount",params,undefined,false); 
			copyArgs(msg,"ServerName",params,undefined,false); 
			copyArgs(msg,"InstanceProfileArn",params,undefined,false); 
			copyArgs(msg,"InstanceType",params,undefined,false); 
			copyArgs(msg,"KeyPair",params,undefined,false); 
			copyArgs(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(msg,"PreferredBackupWindow",params,undefined,false); 
			copyArgs(msg,"SecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"ServiceRoleArn",params,undefined,false); 
			copyArgs(msg,"SubnetIds",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"BackupId",params,undefined,false); 
			

			svc.createServer(params,cb);
		}
			service.DeleteBackup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupId",params,undefined,false); 
			
			copyArgs(n,"BackupId",params,undefined,false); 
			
			copyArgs(msg,"BackupId",params,undefined,false); 
			

			svc.deleteBackup(params,cb);
		}
			service.DeleteServer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerName",params,undefined,false); 
			
			copyArgs(n,"ServerName",params,undefined,false); 
			
			copyArgs(msg,"ServerName",params,undefined,false); 
			

			svc.deleteServer(params,cb);
		}
			service.DescribeAccountAttributes=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeAccountAttributes(params,cb);
		}
			service.DescribeBackups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"BackupId",params,undefined,false); 
			copyArgs(n,"ServerName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"BackupId",params,undefined,false); 
			copyArgs(msg,"ServerName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeBackups(params,cb);
		}
			service.DescribeEvents=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerName",params,undefined,false); 
			
			copyArgs(n,"ServerName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ServerName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeEvents(params,cb);
		}
			service.DescribeNodeAssociationStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NodeAssociationStatusToken",params,undefined,false); 
			copyArgs(n,"ServerName",params,undefined,false); 
			
			copyArgs(n,"NodeAssociationStatusToken",params,undefined,false); 
			copyArgs(n,"ServerName",params,undefined,false); 
			
			copyArgs(msg,"NodeAssociationStatusToken",params,undefined,false); 
			copyArgs(msg,"ServerName",params,undefined,false); 
			

			svc.describeNodeAssociationStatus(params,cb);
		}
			service.DescribeServers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ServerName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ServerName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeServers(params,cb);
		}
			service.DisassociateNode=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerName",params,undefined,false); 
			copyArgs(n,"NodeName",params,undefined,false); 
			
			copyArgs(n,"ServerName",params,undefined,false); 
			copyArgs(n,"NodeName",params,undefined,false); 
			copyArgs(n,"EngineAttributes",params,undefined,true); 
			
			copyArgs(msg,"ServerName",params,undefined,false); 
			copyArgs(msg,"NodeName",params,undefined,false); 
			copyArgs(msg,"EngineAttributes",params,undefined,true); 
			

			svc.disassociateNode(params,cb);
		}
			service.ExportServerEngineAttribute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ExportAttributeName",params,undefined,false); 
			copyArgs(n,"ServerName",params,undefined,false); 
			
			copyArgs(n,"ExportAttributeName",params,undefined,false); 
			copyArgs(n,"ServerName",params,undefined,false); 
			copyArgs(n,"InputAttributes",params,undefined,true); 
			
			copyArgs(msg,"ExportAttributeName",params,undefined,false); 
			copyArgs(msg,"ServerName",params,undefined,false); 
			copyArgs(msg,"InputAttributes",params,undefined,true); 
			

			svc.exportServerEngineAttribute(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.RestoreServer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupId",params,undefined,false); 
			copyArgs(n,"ServerName",params,undefined,false); 
			
			copyArgs(n,"BackupId",params,undefined,false); 
			copyArgs(n,"ServerName",params,undefined,false); 
			copyArgs(n,"InstanceType",params,undefined,false); 
			copyArgs(n,"KeyPair",params,undefined,false); 
			
			copyArgs(msg,"BackupId",params,undefined,false); 
			copyArgs(msg,"ServerName",params,undefined,false); 
			copyArgs(msg,"InstanceType",params,undefined,false); 
			copyArgs(msg,"KeyPair",params,undefined,false); 
			

			svc.restoreServer(params,cb);
		}
			service.StartMaintenance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerName",params,undefined,false); 
			
			copyArgs(n,"ServerName",params,undefined,false); 
			copyArgs(n,"EngineAttributes",params,undefined,true); 
			
			copyArgs(msg,"ServerName",params,undefined,false); 
			copyArgs(msg,"EngineAttributes",params,undefined,true); 
			

			svc.startMaintenance(params,cb);
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
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
			service.UpdateServer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerName",params,undefined,false); 
			
			copyArgs(Boolean(n),"DisableAutomatedBackup",params,undefined,false); 
			copyArgs(Number(n),"BackupRetentionCount",params,undefined,false); 
			copyArgs(n,"ServerName",params,undefined,false); 
			copyArgs(n,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(n,"PreferredBackupWindow",params,undefined,false); 
			
			copyArgs(msg,"DisableAutomatedBackup",params,undefined,false); 
			copyArgs(msg,"BackupRetentionCount",params,undefined,false); 
			copyArgs(msg,"ServerName",params,undefined,false); 
			copyArgs(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArgs(msg,"PreferredBackupWindow",params,undefined,false); 
			

			svc.updateServer(params,cb);
		}
			service.UpdateServerEngineAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ServerName",params,undefined,false); 
			copyArgs(n,"AttributeName",params,undefined,false); 
			
			copyArgs(n,"ServerName",params,undefined,false); 
			copyArgs(n,"AttributeName",params,undefined,false); 
			copyArgs(n,"AttributeValue",params,undefined,false); 
			
			copyArgs(msg,"ServerName",params,undefined,false); 
			copyArgs(msg,"AttributeName",params,undefined,false); 
			copyArgs(msg,"AttributeValue",params,undefined,false); 
			

			svc.updateServerEngineAttributes(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS OpsWorksCM", AmazonAPINode);

};
