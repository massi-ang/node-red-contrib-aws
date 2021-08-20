
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

		var awsService = new AWS.CloudHSM( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.CloudHSM(msg.AWSConfig) : awsService;

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

		
		service.AddTagsToResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"TagList",params,undefined,true); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagList",params,undefined,true); 
			

			svc.addTagsToResource(params,cb);
		}

		
		service.CreateHapg=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Label",params,undefined,false); 
			
			copyArg(msg,"Label",params,undefined,false); 
			

			svc.createHapg(params,cb);
		}

		
		service.CreateHsm=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubnetId",params,undefined,false); 
			copyArg(n,"SshKey",params,undefined,false); 
			copyArg(n,"IamRoleArn",params,undefined,false); 
			copyArg(n,"SubscriptionType",params,undefined,false); 
			
			copyArg(msg,"SubnetId",params,undefined,false); 
			copyArg(msg,"SshKey",params,undefined,false); 
			copyArg(msg,"EniIp",params,undefined,false); 
			copyArg(msg,"IamRoleArn",params,undefined,false); 
			copyArg(msg,"ExternalId",params,undefined,false); 
			copyArg(msg,"SubscriptionType",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"SyslogIp",params,undefined,false); 
			

			svc.createHsm(params,cb);
		}

		
		service.CreateLunaClient=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Certificate",params,undefined,false); 
			
			copyArg(msg,"Label",params,undefined,false); 
			copyArg(msg,"Certificate",params,undefined,false); 
			

			svc.createLunaClient(params,cb);
		}

		
		service.DeleteHapg=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HapgArn",params,undefined,false); 
			
			copyArg(msg,"HapgArn",params,undefined,false); 
			

			svc.deleteHapg(params,cb);
		}

		
		service.DeleteHsm=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HsmArn",params,undefined,false); 
			
			copyArg(msg,"HsmArn",params,undefined,false); 
			

			svc.deleteHsm(params,cb);
		}

		
		service.DeleteLunaClient=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClientArn",params,undefined,false); 
			
			copyArg(msg,"ClientArn",params,undefined,false); 
			

			svc.deleteLunaClient(params,cb);
		}

		
		service.DescribeHapg=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HapgArn",params,undefined,false); 
			
			copyArg(msg,"HapgArn",params,undefined,false); 
			

			svc.describeHapg(params,cb);
		}

		
		service.DescribeHsm=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"HsmArn",params,undefined,false); 
			copyArg(msg,"HsmSerialNumber",params,undefined,false); 
			

			svc.describeHsm(params,cb);
		}

		
		service.DescribeLunaClient=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ClientArn",params,undefined,false); 
			copyArg(msg,"CertificateFingerprint",params,undefined,false); 
			

			svc.describeLunaClient(params,cb);
		}

		
		service.GetConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClientArn",params,undefined,false); 
			copyArg(n,"ClientVersion",params,undefined,false); 
			copyArg(n,"HapgList",params,undefined,true); 
			
			copyArg(msg,"ClientArn",params,undefined,false); 
			copyArg(msg,"ClientVersion",params,undefined,false); 
			copyArg(msg,"HapgList",params,undefined,true); 
			

			svc.getConfig(params,cb);
		}

		
		service.ListAvailableZones=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.listAvailableZones(params,cb);
		}

		
		service.ListHapgs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listHapgs(params,cb);
		}

		
		service.ListHsms=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listHsms(params,cb);
		}

		
		service.ListLunaClients=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listLunaClients(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ModifyHapg=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HapgArn",params,undefined,false); 
			
			copyArg(msg,"HapgArn",params,undefined,false); 
			copyArg(msg,"Label",params,undefined,false); 
			copyArg(msg,"PartitionSerialList",params,undefined,true); 
			

			svc.modifyHapg(params,cb);
		}

		
		service.ModifyHsm=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HsmArn",params,undefined,false); 
			
			copyArg(msg,"HsmArn",params,undefined,false); 
			copyArg(msg,"SubnetId",params,undefined,false); 
			copyArg(msg,"EniIp",params,undefined,false); 
			copyArg(msg,"IamRoleArn",params,undefined,false); 
			copyArg(msg,"ExternalId",params,undefined,false); 
			copyArg(msg,"SyslogIp",params,undefined,false); 
			

			svc.modifyHsm(params,cb);
		}

		
		service.ModifyLunaClient=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClientArn",params,undefined,false); 
			copyArg(n,"Certificate",params,undefined,false); 
			
			copyArg(msg,"ClientArn",params,undefined,false); 
			copyArg(msg,"Certificate",params,undefined,false); 
			

			svc.modifyLunaClient(params,cb);
		}

		
		service.RemoveTagsFromResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"TagKeyList",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagKeyList",params,undefined,false); 
			

			svc.removeTagsFromResource(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS CloudHSM", AmazonAPINode);

};
