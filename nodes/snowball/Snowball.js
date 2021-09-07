
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

		var awsService = new AWS.Snowball( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Snowball(msg.AWSConfig) : awsService;

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

		
		service.CancelCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			
			copyArgs(msg,"ClusterId",params,undefined,false); 
			

			svc.cancelCluster(params,cb);
		}

		
		service.CancelJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.cancelJob(params,cb);
		}

		
		service.CreateAddress=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Address",params,undefined,true); 
			
			copyArgs(n,"Address",params,undefined,true); 
			
			copyArgs(msg,"Address",params,undefined,true); 
			

			svc.createAddress(params,cb);
		}

		
		service.CreateCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobType",params,undefined,false); 
			copyArgs(n,"Resources",params,undefined,true); 
			copyArgs(n,"AddressId",params,undefined,false); 
			copyArgs(n,"RoleARN",params,undefined,false); 
			copyArgs(n,"SnowballType",params,undefined,false); 
			copyArgs(n,"ShippingOption",params,undefined,false); 
			
			copyArgs(n,"JobType",params,undefined,false); 
			copyArgs(n,"Resources",params,undefined,true); 
			copyArgs(n,"OnDeviceServiceConfiguration",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"AddressId",params,undefined,false); 
			copyArgs(n,"KmsKeyARN",params,undefined,false); 
			copyArgs(n,"RoleARN",params,undefined,false); 
			copyArgs(n,"SnowballType",params,undefined,false); 
			copyArgs(n,"ShippingOption",params,undefined,false); 
			copyArgs(n,"Notification",params,undefined,true); 
			copyArgs(n,"ForwardingAddressId",params,undefined,false); 
			copyArgs(n,"TaxDocuments",params,undefined,true); 
			copyArgs(n,"RemoteManagement",params,undefined,false); 
			
			copyArgs(msg,"JobType",params,undefined,false); 
			copyArgs(msg,"Resources",params,undefined,true); 
			copyArgs(msg,"OnDeviceServiceConfiguration",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"AddressId",params,undefined,false); 
			copyArgs(msg,"KmsKeyARN",params,undefined,false); 
			copyArgs(msg,"RoleARN",params,undefined,false); 
			copyArgs(msg,"SnowballType",params,undefined,false); 
			copyArgs(msg,"ShippingOption",params,undefined,false); 
			copyArgs(msg,"Notification",params,undefined,true); 
			copyArgs(msg,"ForwardingAddressId",params,undefined,false); 
			copyArgs(msg,"TaxDocuments",params,undefined,true); 
			copyArgs(msg,"RemoteManagement",params,undefined,false); 
			

			svc.createCluster(params,cb);
		}

		
		service.CreateJob=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"JobType",params,undefined,false); 
			copyArgs(n,"Resources",params,undefined,true); 
			copyArgs(n,"OnDeviceServiceConfiguration",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"AddressId",params,undefined,false); 
			copyArgs(n,"KmsKeyARN",params,undefined,false); 
			copyArgs(n,"RoleARN",params,undefined,false); 
			copyArgs(n,"SnowballCapacityPreference",params,undefined,false); 
			copyArgs(n,"ShippingOption",params,undefined,false); 
			copyArgs(n,"Notification",params,undefined,true); 
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"SnowballType",params,undefined,false); 
			copyArgs(n,"ForwardingAddressId",params,undefined,false); 
			copyArgs(n,"TaxDocuments",params,undefined,true); 
			copyArgs(n,"DeviceConfiguration",params,undefined,true); 
			copyArgs(n,"RemoteManagement",params,undefined,false); 
			copyArgs(n,"LongTermPricingId",params,undefined,false); 
			
			copyArgs(msg,"JobType",params,undefined,false); 
			copyArgs(msg,"Resources",params,undefined,true); 
			copyArgs(msg,"OnDeviceServiceConfiguration",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"AddressId",params,undefined,false); 
			copyArgs(msg,"KmsKeyARN",params,undefined,false); 
			copyArgs(msg,"RoleARN",params,undefined,false); 
			copyArgs(msg,"SnowballCapacityPreference",params,undefined,false); 
			copyArgs(msg,"ShippingOption",params,undefined,false); 
			copyArgs(msg,"Notification",params,undefined,true); 
			copyArgs(msg,"ClusterId",params,undefined,false); 
			copyArgs(msg,"SnowballType",params,undefined,false); 
			copyArgs(msg,"ForwardingAddressId",params,undefined,false); 
			copyArgs(msg,"TaxDocuments",params,undefined,true); 
			copyArgs(msg,"DeviceConfiguration",params,undefined,true); 
			copyArgs(msg,"RemoteManagement",params,undefined,false); 
			copyArgs(msg,"LongTermPricingId",params,undefined,false); 
			

			svc.createJob(params,cb);
		}

		
		service.CreateLongTermPricing=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LongTermPricingType",params,undefined,false); 
			
			copyArgs(n,"LongTermPricingType",params,undefined,false); 
			copyArgs(n,"IsLongTermPricingAutoRenew",params,undefined,false); 
			copyArgs(n,"SnowballType",params,undefined,false); 
			
			copyArgs(msg,"LongTermPricingType",params,undefined,false); 
			copyArgs(msg,"IsLongTermPricingAutoRenew",params,undefined,false); 
			copyArgs(msg,"SnowballType",params,undefined,false); 
			

			svc.createLongTermPricing(params,cb);
		}

		
		service.CreateReturnShippingLabel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(n,"ShippingOption",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			copyArgs(msg,"ShippingOption",params,undefined,false); 
			

			svc.createReturnShippingLabel(params,cb);
		}

		
		service.DescribeAddress=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AddressId",params,undefined,false); 
			
			copyArgs(n,"AddressId",params,undefined,false); 
			
			copyArgs(msg,"AddressId",params,undefined,false); 
			

			svc.describeAddress(params,cb);
		}

		
		service.DescribeAddresses=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeAddresses(params,cb);
		}

		
		service.DescribeCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			
			copyArgs(msg,"ClusterId",params,undefined,false); 
			

			svc.describeCluster(params,cb);
		}

		
		service.DescribeJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.describeJob(params,cb);
		}

		
		service.DescribeReturnShippingLabel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.describeReturnShippingLabel(params,cb);
		}

		
		service.GetJobManifest=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.getJobManifest(params,cb);
		}

		
		service.GetJobUnlockCode=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.getJobUnlockCode(params,cb);
		}

		
		service.GetSnowballUsage=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getSnowballUsage(params,cb);
		}

		
		service.GetSoftwareUpdates=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			

			svc.getSoftwareUpdates(params,cb);
		}

		
		service.ListClusterJobs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ClusterId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listClusterJobs(params,cb);
		}

		
		service.ListClusters=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listClusters(params,cb);
		}

		
		service.ListCompatibleImages=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listCompatibleImages(params,cb);
		}

		
		service.ListJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listJobs(params,cb);
		}

		
		service.ListLongTermPricing=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listLongTermPricing(params,cb);
		}

		
		service.UpdateCluster=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			
			copyArgs(n,"ClusterId",params,undefined,false); 
			copyArgs(n,"RoleARN",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Resources",params,undefined,true); 
			copyArgs(n,"OnDeviceServiceConfiguration",params,undefined,true); 
			copyArgs(n,"AddressId",params,undefined,false); 
			copyArgs(n,"ShippingOption",params,undefined,false); 
			copyArgs(n,"Notification",params,undefined,true); 
			copyArgs(n,"ForwardingAddressId",params,undefined,false); 
			
			copyArgs(msg,"ClusterId",params,undefined,false); 
			copyArgs(msg,"RoleARN",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Resources",params,undefined,true); 
			copyArgs(msg,"OnDeviceServiceConfiguration",params,undefined,true); 
			copyArgs(msg,"AddressId",params,undefined,false); 
			copyArgs(msg,"ShippingOption",params,undefined,false); 
			copyArgs(msg,"Notification",params,undefined,true); 
			copyArgs(msg,"ForwardingAddressId",params,undefined,false); 
			

			svc.updateCluster(params,cb);
		}

		
		service.UpdateJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(n,"RoleARN",params,undefined,false); 
			copyArgs(n,"Notification",params,undefined,true); 
			copyArgs(n,"Resources",params,undefined,true); 
			copyArgs(n,"OnDeviceServiceConfiguration",params,undefined,true); 
			copyArgs(n,"AddressId",params,undefined,false); 
			copyArgs(n,"ShippingOption",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"SnowballCapacityPreference",params,undefined,false); 
			copyArgs(n,"ForwardingAddressId",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			copyArgs(msg,"RoleARN",params,undefined,false); 
			copyArgs(msg,"Notification",params,undefined,true); 
			copyArgs(msg,"Resources",params,undefined,true); 
			copyArgs(msg,"OnDeviceServiceConfiguration",params,undefined,true); 
			copyArgs(msg,"AddressId",params,undefined,false); 
			copyArgs(msg,"ShippingOption",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"SnowballCapacityPreference",params,undefined,false); 
			copyArgs(msg,"ForwardingAddressId",params,undefined,false); 
			

			svc.updateJob(params,cb);
		}

		
		service.UpdateJobShipmentState=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(n,"ShipmentState",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(n,"ShipmentState",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			copyArgs(msg,"ShipmentState",params,undefined,false); 
			

			svc.updateJobShipmentState(params,cb);
		}

		
		service.UpdateLongTermPricing=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LongTermPricingId",params,undefined,false); 
			
			copyArgs(n,"LongTermPricingId",params,undefined,false); 
			copyArgs(n,"ReplacementJob",params,undefined,false); 
			copyArgs(n,"IsLongTermPricingAutoRenew",params,undefined,false); 
			
			copyArgs(msg,"LongTermPricingId",params,undefined,false); 
			copyArgs(msg,"ReplacementJob",params,undefined,false); 
			copyArgs(msg,"IsLongTermPricingAutoRenew",params,undefined,false); 
			

			svc.updateLongTermPricing(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Snowball", AmazonAPINode);

};
