
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

		var awsService = new AWS.CloudHSMV2( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.CloudHSMV2(msg.AWSConfig) : awsService;

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

		
		service.CopyBackupToRegion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DestinationRegion",params,undefined,false); 
			copyArg(n,"BackupId",params,undefined,false); 
			
			copyArg(msg,"DestinationRegion",params,undefined,false); 
			copyArg(msg,"BackupId",params,undefined,false); 
			copyArg(msg,"TagList",params,undefined,true); 
			

			svc.copyBackupToRegion(params,cb);
		}

		
		service.CreateCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HsmType",params,undefined,false); 
			copyArg(n,"SubnetIds",params,undefined,false); 
			
			copyArg(msg,"BackupRetentionPolicy",params,undefined,true); 
			copyArg(msg,"HsmType",params,undefined,false); 
			copyArg(msg,"SourceBackupId",params,undefined,false); 
			copyArg(msg,"SubnetIds",params,undefined,false); 
			copyArg(msg,"TagList",params,undefined,true); 
			

			svc.createCluster(params,cb);
		}

		
		service.CreateHsm=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterId",params,undefined,false); 
			copyArg(n,"AvailabilityZone",params,undefined,false); 
			
			copyArg(msg,"ClusterId",params,undefined,false); 
			copyArg(msg,"AvailabilityZone",params,undefined,false); 
			copyArg(msg,"IpAddress",params,undefined,false); 
			

			svc.createHsm(params,cb);
		}

		
		service.DeleteBackup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupId",params,undefined,false); 
			
			copyArg(msg,"BackupId",params,undefined,false); 
			

			svc.deleteBackup(params,cb);
		}

		
		service.DeleteCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterId",params,undefined,false); 
			
			copyArg(msg,"ClusterId",params,undefined,false); 
			

			svc.deleteCluster(params,cb);
		}

		
		service.DeleteHsm=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterId",params,undefined,false); 
			
			copyArg(msg,"ClusterId",params,undefined,false); 
			copyArg(msg,"HsmId",params,undefined,false); 
			copyArg(msg,"EniId",params,undefined,false); 
			copyArg(msg,"EniIp",params,undefined,false); 
			

			svc.deleteHsm(params,cb);
		}

		
		service.DescribeBackups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"SortAscending",params,undefined,false); 
			

			svc.describeBackups(params,cb);
		}

		
		service.DescribeClusters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describeClusters(params,cb);
		}

		
		service.InitializeCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterId",params,undefined,false); 
			copyArg(n,"SignedCert",params,undefined,false); 
			copyArg(n,"TrustAnchor",params,undefined,false); 
			
			copyArg(msg,"ClusterId",params,undefined,false); 
			copyArg(msg,"SignedCert",params,undefined,false); 
			copyArg(msg,"TrustAnchor",params,undefined,false); 
			

			svc.initializeCluster(params,cb);
		}

		
		service.ListTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listTags(params,cb);
		}

		
		service.ModifyBackupAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupId",params,undefined,false); 
			copyArg(n,"NeverExpires",params,undefined,false); 
			
			copyArg(msg,"BackupId",params,undefined,false); 
			copyArg(msg,"NeverExpires",params,undefined,false); 
			

			svc.modifyBackupAttributes(params,cb);
		}

		
		service.ModifyCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupRetentionPolicy",params,undefined,true); 
			copyArg(n,"ClusterId",params,undefined,false); 
			
			copyArg(msg,"BackupRetentionPolicy",params,undefined,true); 
			copyArg(msg,"ClusterId",params,undefined,false); 
			

			svc.modifyCluster(params,cb);
		}

		
		service.RestoreBackup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupId",params,undefined,false); 
			
			copyArg(msg,"BackupId",params,undefined,false); 
			

			svc.restoreBackup(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"TagList",params,undefined,true); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"TagList",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"TagKeyList",params,undefined,false); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"TagKeyList",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS CloudHSMV2", AmazonAPINode);

};
