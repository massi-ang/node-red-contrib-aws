
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

		var awsService = new AWS.MediaConvert( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.MediaConvert(msg.AWSConfig) : awsService;

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
		
			service.AssociateCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			

			svc.associateCertificate(params,cb);
		}
			service.CancelJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.cancelJob(params,cb);
		}
			service.CreateJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Role",params,undefined,false); 
			copyArgs(n,"Settings",params,undefined,true); 
			
			copyArgs(n,"AccelerationSettings",params,undefined,true); 
			copyArgs(n,"BillingTagsSource",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"HopDestinations",params,undefined,true); 
			copyArgs(n,"JobTemplate",params,undefined,false); 
			copyArgs(Number(n),"Priority",params,undefined,false); 
			copyArgs(n,"Queue",params,undefined,false); 
			copyArgs(n,"Role",params,undefined,false); 
			copyArgs(n,"Settings",params,undefined,true); 
			copyArgs(n,"SimulateReservedQueue",params,undefined,false); 
			copyArgs(n,"StatusUpdateInterval",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"UserMetadata",params,undefined,true); 
			
			copyArgs(msg,"AccelerationSettings",params,undefined,true); 
			copyArgs(msg,"BillingTagsSource",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"HopDestinations",params,undefined,true); 
			copyArgs(msg,"JobTemplate",params,undefined,false); 
			copyArgs(msg,"Priority",params,undefined,false); 
			copyArgs(msg,"Queue",params,undefined,false); 
			copyArgs(msg,"Role",params,undefined,false); 
			copyArgs(msg,"Settings",params,undefined,true); 
			copyArgs(msg,"SimulateReservedQueue",params,undefined,false); 
			copyArgs(msg,"StatusUpdateInterval",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"UserMetadata",params,undefined,true); 
			

			svc.createJob(params,cb);
		}
			service.CreateJobTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Settings",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"AccelerationSettings",params,undefined,true); 
			copyArgs(n,"Category",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"HopDestinations",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(Number(n),"Priority",params,undefined,false); 
			copyArgs(n,"Queue",params,undefined,false); 
			copyArgs(n,"Settings",params,undefined,true); 
			copyArgs(n,"StatusUpdateInterval",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"AccelerationSettings",params,undefined,true); 
			copyArgs(msg,"Category",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"HopDestinations",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Priority",params,undefined,false); 
			copyArgs(msg,"Queue",params,undefined,false); 
			copyArgs(msg,"Settings",params,undefined,true); 
			copyArgs(msg,"StatusUpdateInterval",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createJobTemplate(params,cb);
		}
			service.CreatePreset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Settings",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Category",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Settings",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Category",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Settings",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createPreset(params,cb);
		}
			service.CreateQueue=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"PricingPlan",params,undefined,false); 
			copyArgs(n,"ReservationPlanSettings",params,undefined,true); 
			copyArgs(n,"Status",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"PricingPlan",params,undefined,false); 
			copyArgs(msg,"ReservationPlanSettings",params,undefined,true); 
			copyArgs(msg,"Status",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createQueue(params,cb);
		}
			service.DeleteJobTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteJobTemplate(params,cb);
		}
			service.DeletePreset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deletePreset(params,cb);
		}
			service.DeleteQueue=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteQueue(params,cb);
		}
			service.DescribeEndpoints=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"Mode",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"Mode",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeEndpoints(params,cb);
		}
			service.DisassociateCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			

			svc.disassociateCertificate(params,cb);
		}
			service.GetJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getJob(params,cb);
		}
			service.GetJobTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getJobTemplate(params,cb);
		}
			service.GetPreset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getPreset(params,cb);
		}
			service.GetQueue=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getQueue(params,cb);
		}
			service.ListJobTemplates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Category",params,undefined,false); 
			copyArgs(n,"ListBy",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Order",params,undefined,false); 
			
			copyArgs(msg,"Category",params,undefined,false); 
			copyArgs(msg,"ListBy",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Order",params,undefined,false); 
			

			svc.listJobTemplates(params,cb);
		}
			service.ListJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Order",params,undefined,false); 
			copyArgs(n,"Queue",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Order",params,undefined,false); 
			copyArgs(msg,"Queue",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			

			svc.listJobs(params,cb);
		}
			service.ListPresets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Category",params,undefined,false); 
			copyArgs(n,"ListBy",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Order",params,undefined,false); 
			
			copyArgs(msg,"Category",params,undefined,false); 
			copyArgs(msg,"ListBy",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Order",params,undefined,false); 
			

			svc.listPresets(params,cb);
		}
			service.ListQueues=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ListBy",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Order",params,undefined,false); 
			
			copyArgs(msg,"ListBy",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Order",params,undefined,false); 
			

			svc.listQueues(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
			service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			

			svc.untagResource(params,cb);
		}
			service.UpdateJobTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"AccelerationSettings",params,undefined,true); 
			copyArgs(n,"Category",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"HopDestinations",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(Number(n),"Priority",params,undefined,false); 
			copyArgs(n,"Queue",params,undefined,false); 
			copyArgs(n,"Settings",params,undefined,true); 
			copyArgs(n,"StatusUpdateInterval",params,undefined,false); 
			
			copyArgs(msg,"AccelerationSettings",params,undefined,true); 
			copyArgs(msg,"Category",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"HopDestinations",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Priority",params,undefined,false); 
			copyArgs(msg,"Queue",params,undefined,false); 
			copyArgs(msg,"Settings",params,undefined,true); 
			copyArgs(msg,"StatusUpdateInterval",params,undefined,false); 
			

			svc.updateJobTemplate(params,cb);
		}
			service.UpdatePreset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Category",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Settings",params,undefined,true); 
			
			copyArgs(msg,"Category",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Settings",params,undefined,true); 
			

			svc.updatePreset(params,cb);
		}
			service.UpdateQueue=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ReservationPlanSettings",params,undefined,true); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ReservationPlanSettings",params,undefined,true); 
			copyArgs(msg,"Status",params,undefined,false); 
			

			svc.updateQueue(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS MediaConvert", AmazonAPINode);

};
