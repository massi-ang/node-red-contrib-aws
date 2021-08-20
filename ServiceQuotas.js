
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

		var awsService = new AWS.ServiceQuotas( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.ServiceQuotas(msg.AWSConfig) : awsService;

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

		
		service.AssociateServiceQuotaTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.associateServiceQuotaTemplate(params,cb);
		}

		
		service.DeleteServiceQuotaIncreaseRequestFromTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceCode",params,undefined,false); 
			copyArg(n,"QuotaCode",params,undefined,false); 
			copyArg(n,"AwsRegion",params,undefined,false); 
			
			copyArg(msg,"ServiceCode",params,undefined,false); 
			copyArg(msg,"QuotaCode",params,undefined,false); 
			copyArg(msg,"AwsRegion",params,undefined,false); 
			

			svc.deleteServiceQuotaIncreaseRequestFromTemplate(params,cb);
		}

		
		service.DisassociateServiceQuotaTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.disassociateServiceQuotaTemplate(params,cb);
		}

		
		service.GetAWSDefaultServiceQuota=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceCode",params,undefined,false); 
			copyArg(n,"QuotaCode",params,undefined,false); 
			
			copyArg(msg,"ServiceCode",params,undefined,false); 
			copyArg(msg,"QuotaCode",params,undefined,false); 
			

			svc.getAWSDefaultServiceQuota(params,cb);
		}

		
		service.GetAssociationForServiceQuotaTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getAssociationForServiceQuotaTemplate(params,cb);
		}

		
		service.GetRequestedServiceQuotaChange=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RequestId",params,undefined,false); 
			
			copyArg(msg,"RequestId",params,undefined,false); 
			

			svc.getRequestedServiceQuotaChange(params,cb);
		}

		
		service.GetServiceQuota=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceCode",params,undefined,false); 
			copyArg(n,"QuotaCode",params,undefined,false); 
			
			copyArg(msg,"ServiceCode",params,undefined,false); 
			copyArg(msg,"QuotaCode",params,undefined,false); 
			

			svc.getServiceQuota(params,cb);
		}

		
		service.GetServiceQuotaIncreaseRequestFromTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceCode",params,undefined,false); 
			copyArg(n,"QuotaCode",params,undefined,false); 
			copyArg(n,"AwsRegion",params,undefined,false); 
			
			copyArg(msg,"ServiceCode",params,undefined,false); 
			copyArg(msg,"QuotaCode",params,undefined,false); 
			copyArg(msg,"AwsRegion",params,undefined,false); 
			

			svc.getServiceQuotaIncreaseRequestFromTemplate(params,cb);
		}

		
		service.ListAWSDefaultServiceQuotas=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceCode",params,undefined,false); 
			
			copyArg(msg,"ServiceCode",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listAWSDefaultServiceQuotas(params,cb);
		}

		
		service.ListRequestedServiceQuotaChangeHistory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ServiceCode",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listRequestedServiceQuotaChangeHistory(params,cb);
		}

		
		service.ListRequestedServiceQuotaChangeHistoryByQuota=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceCode",params,undefined,false); 
			copyArg(n,"QuotaCode",params,undefined,false); 
			
			copyArg(msg,"ServiceCode",params,undefined,false); 
			copyArg(msg,"QuotaCode",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listRequestedServiceQuotaChangeHistoryByQuota(params,cb);
		}

		
		service.ListServiceQuotaIncreaseRequestsInTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ServiceCode",params,undefined,false); 
			copyArg(msg,"AwsRegion",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listServiceQuotaIncreaseRequestsInTemplate(params,cb);
		}

		
		service.ListServiceQuotas=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceCode",params,undefined,false); 
			
			copyArg(msg,"ServiceCode",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listServiceQuotas(params,cb);
		}

		
		service.ListServices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listServices(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutServiceQuotaIncreaseRequestIntoTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QuotaCode",params,undefined,false); 
			copyArg(n,"ServiceCode",params,undefined,false); 
			copyArg(n,"AwsRegion",params,undefined,false); 
			copyArg(n,"DesiredValue",params,undefined,false); 
			
			copyArg(msg,"QuotaCode",params,undefined,false); 
			copyArg(msg,"ServiceCode",params,undefined,false); 
			copyArg(msg,"AwsRegion",params,undefined,false); 
			copyArg(msg,"DesiredValue",params,undefined,false); 
			

			svc.putServiceQuotaIncreaseRequestIntoTemplate(params,cb);
		}

		
		service.RequestServiceQuotaIncrease=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ServiceCode",params,undefined,false); 
			copyArg(n,"QuotaCode",params,undefined,false); 
			copyArg(n,"DesiredValue",params,undefined,false); 
			
			copyArg(msg,"ServiceCode",params,undefined,false); 
			copyArg(msg,"QuotaCode",params,undefined,false); 
			copyArg(msg,"DesiredValue",params,undefined,false); 
			

			svc.requestServiceQuotaIncrease(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,false); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,false); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS ServiceQuotas", AmazonAPINode);

};
