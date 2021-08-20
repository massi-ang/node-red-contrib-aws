
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

		var awsService = new AWS.MediaConvert( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.MediaConvert(msg.AWSConfig) : awsService;

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

		
		service.AssociateCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Arn",params,undefined,false); 
			
			copyArg(msg,"Arn",params,undefined,false); 
			

			svc.associateCertificate(params,cb);
		}

		
		service.CancelJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.cancelJob(params,cb);
		}

		
		service.CreateJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Role",params,undefined,false); 
			copyArg(n,"Settings",params,undefined,true); 
			
			copyArg(msg,"AccelerationSettings",params,undefined,true); 
			copyArg(msg,"BillingTagsSource",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"HopDestinations",params,undefined,true); 
			copyArg(msg,"JobTemplate",params,undefined,false); 
			copyArg(msg,"Priority",params,undefined,false); 
			copyArg(msg,"Queue",params,undefined,false); 
			copyArg(msg,"Role",params,undefined,false); 
			copyArg(msg,"Settings",params,undefined,true); 
			copyArg(msg,"SimulateReservedQueue",params,undefined,false); 
			copyArg(msg,"StatusUpdateInterval",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"UserMetadata",params,undefined,true); 
			

			svc.createJob(params,cb);
		}

		
		service.CreateJobTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Settings",params,undefined,true); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"AccelerationSettings",params,undefined,true); 
			copyArg(msg,"Category",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"HopDestinations",params,undefined,true); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Priority",params,undefined,false); 
			copyArg(msg,"Queue",params,undefined,false); 
			copyArg(msg,"Settings",params,undefined,true); 
			copyArg(msg,"StatusUpdateInterval",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createJobTemplate(params,cb);
		}

		
		service.CreatePreset=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Settings",params,undefined,true); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Category",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Settings",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createPreset(params,cb);
		}

		
		service.CreateQueue=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"PricingPlan",params,undefined,false); 
			copyArg(msg,"ReservationPlanSettings",params,undefined,true); 
			copyArg(msg,"Status",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createQueue(params,cb);
		}

		
		service.DeleteJobTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteJobTemplate(params,cb);
		}

		
		service.DeletePreset=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deletePreset(params,cb);
		}

		
		service.DeleteQueue=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteQueue(params,cb);
		}

		
		service.DescribeEndpoints=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"Mode",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeEndpoints(params,cb);
		}

		
		service.DisassociateCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Arn",params,undefined,false); 
			
			copyArg(msg,"Arn",params,undefined,false); 
			

			svc.disassociateCertificate(params,cb);
		}

		
		service.GetJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getJob(params,cb);
		}

		
		service.GetJobTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.getJobTemplate(params,cb);
		}

		
		service.GetPreset=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.getPreset(params,cb);
		}

		
		service.GetQueue=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.getQueue(params,cb);
		}

		
		service.ListJobTemplates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Category",params,undefined,false); 
			copyArg(msg,"ListBy",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Order",params,undefined,false); 
			

			svc.listJobTemplates(params,cb);
		}

		
		service.ListJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Order",params,undefined,false); 
			copyArg(msg,"Queue",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			

			svc.listJobs(params,cb);
		}

		
		service.ListPresets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Category",params,undefined,false); 
			copyArg(msg,"ListBy",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Order",params,undefined,false); 
			

			svc.listPresets(params,cb);
		}

		
		service.ListQueues=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ListBy",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Order",params,undefined,false); 
			

			svc.listQueues(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Arn",params,undefined,false); 
			
			copyArg(msg,"Arn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Arn",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"Arn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Arn",params,undefined,false); 
			
			copyArg(msg,"Arn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateJobTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"AccelerationSettings",params,undefined,true); 
			copyArg(msg,"Category",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"HopDestinations",params,undefined,true); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Priority",params,undefined,false); 
			copyArg(msg,"Queue",params,undefined,false); 
			copyArg(msg,"Settings",params,undefined,true); 
			copyArg(msg,"StatusUpdateInterval",params,undefined,false); 
			

			svc.updateJobTemplate(params,cb);
		}

		
		service.UpdatePreset=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Category",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Settings",params,undefined,true); 
			

			svc.updatePreset(params,cb);
		}

		
		service.UpdateQueue=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ReservationPlanSettings",params,undefined,true); 
			copyArg(msg,"Status",params,undefined,false); 
			

			svc.updateQueue(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS MediaConvert", AmazonAPINode);

};
