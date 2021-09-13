
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

		var awsService = new AWS.ImportExport( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.ImportExport(msg.AWSConfig) : awsService;

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
		
		service.CancelJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(n,"APIVersion",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			copyArgs(msg,"APIVersion",params,undefined,false); 
			

			svc.cancelJob(params,cb);
		}
		
		service.CreateJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobType",params,undefined,false); 
			copyArgs(n,"Manifest",params,undefined,false); 
			copyArgs(Boolean(n),"ValidateOnly",params,undefined,false); 
			
			copyArgs(n,"JobType",params,undefined,false); 
			copyArgs(n,"Manifest",params,undefined,false); 
			copyArgs(n,"ManifestAddendum",params,undefined,false); 
			copyArgs(Boolean(n),"ValidateOnly",params,undefined,false); 
			copyArgs(n,"APIVersion",params,undefined,false); 
			
			copyArgs(msg,"JobType",params,undefined,false); 
			copyArgs(msg,"Manifest",params,undefined,false); 
			copyArgs(msg,"ManifestAddendum",params,undefined,false); 
			copyArgs(msg,"ValidateOnly",params,undefined,false); 
			copyArgs(msg,"APIVersion",params,undefined,false); 
			

			svc.createJob(params,cb);
		}
		
		service.GetShippingLabel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobIds",params,undefined,false); 
			
			copyArgs(n,"jobIds",params,undefined,false); 
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"company",params,undefined,false); 
			copyArgs(n,"phoneNumber",params,undefined,false); 
			copyArgs(n,"country",params,undefined,false); 
			copyArgs(n,"stateOrProvince",params,undefined,false); 
			copyArgs(n,"city",params,undefined,false); 
			copyArgs(n,"postalCode",params,undefined,false); 
			copyArgs(n,"street1",params,undefined,false); 
			copyArgs(n,"street2",params,undefined,false); 
			copyArgs(n,"street3",params,undefined,false); 
			copyArgs(n,"APIVersion",params,undefined,false); 
			
			copyArgs(msg,"jobIds",params,undefined,false); 
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"company",params,undefined,false); 
			copyArgs(msg,"phoneNumber",params,undefined,false); 
			copyArgs(msg,"country",params,undefined,false); 
			copyArgs(msg,"stateOrProvince",params,undefined,false); 
			copyArgs(msg,"city",params,undefined,false); 
			copyArgs(msg,"postalCode",params,undefined,false); 
			copyArgs(msg,"street1",params,undefined,false); 
			copyArgs(msg,"street2",params,undefined,false); 
			copyArgs(msg,"street3",params,undefined,false); 
			copyArgs(msg,"APIVersion",params,undefined,false); 
			

			svc.getShippingLabel(params,cb);
		}
		
		service.GetStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(n,"APIVersion",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			copyArgs(msg,"APIVersion",params,undefined,false); 
			

			svc.getStatus(params,cb);
		}
		
		service.ListJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxJobs",params,undefined,false); 
			copyArgs(n,"Marker",params,undefined,false); 
			copyArgs(n,"APIVersion",params,undefined,false); 
			
			copyArgs(msg,"MaxJobs",params,undefined,false); 
			copyArgs(msg,"Marker",params,undefined,false); 
			copyArgs(msg,"APIVersion",params,undefined,false); 
			

			svc.listJobs(params,cb);
		}
		
		service.UpdateJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(n,"Manifest",params,undefined,false); 
			copyArgs(n,"JobType",params,undefined,false); 
			copyArgs(Boolean(n),"ValidateOnly",params,undefined,false); 
			
			copyArgs(n,"JobId",params,undefined,false); 
			copyArgs(n,"Manifest",params,undefined,false); 
			copyArgs(n,"JobType",params,undefined,false); 
			copyArgs(Boolean(n),"ValidateOnly",params,undefined,false); 
			copyArgs(n,"APIVersion",params,undefined,false); 
			
			copyArgs(msg,"JobId",params,undefined,false); 
			copyArgs(msg,"Manifest",params,undefined,false); 
			copyArgs(msg,"JobType",params,undefined,false); 
			copyArgs(msg,"ValidateOnly",params,undefined,false); 
			copyArgs(msg,"APIVersion",params,undefined,false); 
			

			svc.updateJob(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS ImportExport", AmazonAPINode);

};
