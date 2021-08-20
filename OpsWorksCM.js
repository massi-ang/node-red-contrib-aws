
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

		var awsService = new AWS.OpsWorksCM( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.OpsWorksCM(msg.AWSConfig) : awsService;

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

		
		service.AssociateNode=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerName",params,undefined,false); 
			copyArg(n,"NodeName",params,undefined,false); 
			copyArg(n,"EngineAttributes",params,undefined,true); 
			
			copyArg(msg,"ServerName",params,undefined,false); 
			copyArg(msg,"NodeName",params,undefined,false); 
			copyArg(msg,"EngineAttributes",params,undefined,true); 
			

			svc.associateNode(params,cb);
		}

		
		service.CreateBackup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerName",params,undefined,false); 
			
			copyArg(msg,"ServerName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createBackup(params,cb);
		}

		
		service.CreateServer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Engine",params,undefined,false); 
			copyArg(n,"ServerName",params,undefined,false); 
			copyArg(n,"InstanceProfileArn",params,undefined,false); 
			copyArg(n,"InstanceType",params,undefined,false); 
			copyArg(n,"ServiceRoleArn",params,undefined,false); 
			
			copyArg(msg,"AssociatePublicIpAddress",params,undefined,false); 
			copyArg(msg,"CustomDomain",params,undefined,false); 
			copyArg(msg,"CustomCertificate",params,undefined,false); 
			copyArg(msg,"CustomPrivateKey",params,undefined,false); 
			copyArg(msg,"DisableAutomatedBackup",params,undefined,false); 
			copyArg(msg,"Engine",params,undefined,false); 
			copyArg(msg,"EngineModel",params,undefined,false); 
			copyArg(msg,"EngineVersion",params,undefined,false); 
			copyArg(msg,"EngineAttributes",params,undefined,true); 
			copyArg(msg,"BackupRetentionCount",params,undefined,false); 
			copyArg(msg,"ServerName",params,undefined,false); 
			copyArg(msg,"InstanceProfileArn",params,undefined,false); 
			copyArg(msg,"InstanceType",params,undefined,false); 
			copyArg(msg,"KeyPair",params,undefined,false); 
			copyArg(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArg(msg,"PreferredBackupWindow",params,undefined,false); 
			copyArg(msg,"SecurityGroupIds",params,undefined,true); 
			copyArg(msg,"ServiceRoleArn",params,undefined,false); 
			copyArg(msg,"SubnetIds",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"BackupId",params,undefined,false); 
			

			svc.createServer(params,cb);
		}

		
		service.DeleteBackup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupId",params,undefined,false); 
			
			copyArg(msg,"BackupId",params,undefined,false); 
			

			svc.deleteBackup(params,cb);
		}

		
		service.DeleteServer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerName",params,undefined,false); 
			
			copyArg(msg,"ServerName",params,undefined,false); 
			

			svc.deleteServer(params,cb);
		}

		
		service.DescribeAccountAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeAccountAttributes(params,cb);
		}

		
		service.DescribeBackups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"BackupId",params,undefined,false); 
			copyArg(msg,"ServerName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describeBackups(params,cb);
		}

		
		service.DescribeEvents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerName",params,undefined,false); 
			
			copyArg(msg,"ServerName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describeEvents(params,cb);
		}

		
		service.DescribeNodeAssociationStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NodeAssociationStatusToken",params,undefined,false); 
			copyArg(n,"ServerName",params,undefined,false); 
			
			copyArg(msg,"NodeAssociationStatusToken",params,undefined,false); 
			copyArg(msg,"ServerName",params,undefined,false); 
			

			svc.describeNodeAssociationStatus(params,cb);
		}

		
		service.DescribeServers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ServerName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describeServers(params,cb);
		}

		
		service.DisassociateNode=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerName",params,undefined,false); 
			copyArg(n,"NodeName",params,undefined,false); 
			
			copyArg(msg,"ServerName",params,undefined,false); 
			copyArg(msg,"NodeName",params,undefined,false); 
			copyArg(msg,"EngineAttributes",params,undefined,true); 
			

			svc.disassociateNode(params,cb);
		}

		
		service.ExportServerEngineAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ExportAttributeName",params,undefined,false); 
			copyArg(n,"ServerName",params,undefined,false); 
			
			copyArg(msg,"ExportAttributeName",params,undefined,false); 
			copyArg(msg,"ServerName",params,undefined,false); 
			copyArg(msg,"InputAttributes",params,undefined,true); 
			

			svc.exportServerEngineAttribute(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.RestoreServer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupId",params,undefined,false); 
			copyArg(n,"ServerName",params,undefined,false); 
			
			copyArg(msg,"BackupId",params,undefined,false); 
			copyArg(msg,"ServerName",params,undefined,false); 
			copyArg(msg,"InstanceType",params,undefined,false); 
			copyArg(msg,"KeyPair",params,undefined,false); 
			

			svc.restoreServer(params,cb);
		}

		
		service.StartMaintenance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerName",params,undefined,false); 
			
			copyArg(msg,"ServerName",params,undefined,false); 
			copyArg(msg,"EngineAttributes",params,undefined,true); 
			

			svc.startMaintenance(params,cb);
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
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateServer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerName",params,undefined,false); 
			
			copyArg(msg,"DisableAutomatedBackup",params,undefined,false); 
			copyArg(msg,"BackupRetentionCount",params,undefined,false); 
			copyArg(msg,"ServerName",params,undefined,false); 
			copyArg(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArg(msg,"PreferredBackupWindow",params,undefined,false); 
			

			svc.updateServer(params,cb);
		}

		
		service.UpdateServerEngineAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServerName",params,undefined,false); 
			copyArg(n,"AttributeName",params,undefined,false); 
			
			copyArg(msg,"ServerName",params,undefined,false); 
			copyArg(msg,"AttributeName",params,undefined,false); 
			copyArg(msg,"AttributeValue",params,undefined,false); 
			

			svc.updateServerEngineAttributes(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS OpsWorksCM", AmazonAPINode);

};
