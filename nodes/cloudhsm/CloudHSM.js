
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

		var awsService = new AWS.CloudHSM( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.CloudHSM(msg.AWSConfig) : awsService;

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
		
			service.AddTagsToResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagList",params,undefined,true); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagList",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagList",params,undefined,true); 
			

			svc.addTagsToResource(params,cb);
		}
			service.CreateHapg=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Label",params,undefined,false); 
			
			copyArgs(n,"Label",params,undefined,false); 
			
			copyArgs(msg,"Label",params,undefined,false); 
			

			svc.createHapg(params,cb);
		}
			service.CreateHsm=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubnetId",params,undefined,false); 
			copyArgs(n,"SshKey",params,undefined,false); 
			copyArgs(n,"IamRoleArn",params,undefined,false); 
			copyArgs(n,"SubscriptionType",params,undefined,false); 
			
			copyArgs(n,"SubnetId",params,undefined,false); 
			copyArgs(n,"SshKey",params,undefined,false); 
			copyArgs(n,"EniIp",params,undefined,false); 
			copyArgs(n,"IamRoleArn",params,undefined,false); 
			copyArgs(n,"ExternalId",params,undefined,false); 
			copyArgs(n,"SubscriptionType",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"SyslogIp",params,undefined,false); 
			
			copyArgs(msg,"SubnetId",params,undefined,false); 
			copyArgs(msg,"SshKey",params,undefined,false); 
			copyArgs(msg,"EniIp",params,undefined,false); 
			copyArgs(msg,"IamRoleArn",params,undefined,false); 
			copyArgs(msg,"ExternalId",params,undefined,false); 
			copyArgs(msg,"SubscriptionType",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"SyslogIp",params,undefined,false); 
			

			svc.createHsm(params,cb);
		}
			service.CreateLunaClient=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Certificate",params,undefined,false); 
			
			copyArgs(n,"Label",params,undefined,false); 
			copyArgs(n,"Certificate",params,undefined,false); 
			
			copyArgs(msg,"Label",params,undefined,false); 
			copyArgs(msg,"Certificate",params,undefined,false); 
			

			svc.createLunaClient(params,cb);
		}
			service.DeleteHapg=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HapgArn",params,undefined,false); 
			
			copyArgs(n,"HapgArn",params,undefined,false); 
			
			copyArgs(msg,"HapgArn",params,undefined,false); 
			

			svc.deleteHapg(params,cb);
		}
			service.DeleteHsm=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HsmArn",params,undefined,false); 
			
			copyArgs(n,"HsmArn",params,undefined,false); 
			
			copyArgs(msg,"HsmArn",params,undefined,false); 
			

			svc.deleteHsm(params,cb);
		}
			service.DeleteLunaClient=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientArn",params,undefined,false); 
			
			copyArgs(n,"ClientArn",params,undefined,false); 
			
			copyArgs(msg,"ClientArn",params,undefined,false); 
			

			svc.deleteLunaClient(params,cb);
		}
			service.DescribeHapg=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HapgArn",params,undefined,false); 
			
			copyArgs(n,"HapgArn",params,undefined,false); 
			
			copyArgs(msg,"HapgArn",params,undefined,false); 
			

			svc.describeHapg(params,cb);
		}
			service.DescribeHsm=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"HsmArn",params,undefined,false); 
			copyArgs(n,"HsmSerialNumber",params,undefined,false); 
			
			copyArgs(msg,"HsmArn",params,undefined,false); 
			copyArgs(msg,"HsmSerialNumber",params,undefined,false); 
			

			svc.describeHsm(params,cb);
		}
			service.DescribeLunaClient=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ClientArn",params,undefined,false); 
			copyArgs(n,"CertificateFingerprint",params,undefined,false); 
			
			copyArgs(msg,"ClientArn",params,undefined,false); 
			copyArgs(msg,"CertificateFingerprint",params,undefined,false); 
			

			svc.describeLunaClient(params,cb);
		}
			service.GetConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientArn",params,undefined,false); 
			copyArgs(n,"ClientVersion",params,undefined,false); 
			copyArgs(n,"HapgList",params,undefined,true); 
			
			copyArgs(n,"ClientArn",params,undefined,false); 
			copyArgs(n,"ClientVersion",params,undefined,false); 
			copyArgs(n,"HapgList",params,undefined,true); 
			
			copyArgs(msg,"ClientArn",params,undefined,false); 
			copyArgs(msg,"ClientVersion",params,undefined,false); 
			copyArgs(msg,"HapgList",params,undefined,true); 
			

			svc.getConfig(params,cb);
		}
			service.ListAvailableZones=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.listAvailableZones(params,cb);
		}
			service.ListHapgs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listHapgs(params,cb);
		}
			service.ListHsms=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listHsms(params,cb);
		}
			service.ListLunaClients=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listLunaClients(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.ModifyHapg=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HapgArn",params,undefined,false); 
			
			copyArgs(n,"HapgArn",params,undefined,false); 
			copyArgs(n,"Label",params,undefined,false); 
			copyArgs(n,"PartitionSerialList",params,undefined,true); 
			
			copyArgs(msg,"HapgArn",params,undefined,false); 
			copyArgs(msg,"Label",params,undefined,false); 
			copyArgs(msg,"PartitionSerialList",params,undefined,true); 
			

			svc.modifyHapg(params,cb);
		}
			service.ModifyHsm=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HsmArn",params,undefined,false); 
			
			copyArgs(n,"HsmArn",params,undefined,false); 
			copyArgs(n,"SubnetId",params,undefined,false); 
			copyArgs(n,"EniIp",params,undefined,false); 
			copyArgs(n,"IamRoleArn",params,undefined,false); 
			copyArgs(n,"ExternalId",params,undefined,false); 
			copyArgs(n,"SyslogIp",params,undefined,false); 
			
			copyArgs(msg,"HsmArn",params,undefined,false); 
			copyArgs(msg,"SubnetId",params,undefined,false); 
			copyArgs(msg,"EniIp",params,undefined,false); 
			copyArgs(msg,"IamRoleArn",params,undefined,false); 
			copyArgs(msg,"ExternalId",params,undefined,false); 
			copyArgs(msg,"SyslogIp",params,undefined,false); 
			

			svc.modifyHsm(params,cb);
		}
			service.ModifyLunaClient=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientArn",params,undefined,false); 
			copyArgs(n,"Certificate",params,undefined,false); 
			
			copyArgs(n,"ClientArn",params,undefined,false); 
			copyArgs(n,"Certificate",params,undefined,false); 
			
			copyArgs(msg,"ClientArn",params,undefined,false); 
			copyArgs(msg,"Certificate",params,undefined,false); 
			

			svc.modifyLunaClient(params,cb);
		}
			service.RemoveTagsFromResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeyList",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeyList",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeyList",params,undefined,false); 
			

			svc.removeTagsFromResource(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS CloudHSM", AmazonAPINode);

};
