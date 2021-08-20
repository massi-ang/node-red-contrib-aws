
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

		var awsService = new AWS.ImportExport( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.ImportExport(msg.AWSConfig) : awsService;

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

		
		service.CancelJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobId",params,undefined,false); 
			
			copyArg(msg,"JobId",params,undefined,false); 
			copyArg(msg,"APIVersion",params,undefined,false); 
			

			svc.cancelJob(params,cb);
		}

		
		service.CreateJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobType",params,undefined,false); 
			copyArg(n,"Manifest",params,undefined,false); 
			copyArg(n,"ValidateOnly",params,undefined,false); 
			
			copyArg(msg,"JobType",params,undefined,false); 
			copyArg(msg,"Manifest",params,undefined,false); 
			copyArg(msg,"ManifestAddendum",params,undefined,false); 
			copyArg(msg,"ValidateOnly",params,undefined,false); 
			copyArg(msg,"APIVersion",params,undefined,false); 
			

			svc.createJob(params,cb);
		}

		
		service.GetShippingLabel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobIds",params,undefined,false); 
			
			copyArg(msg,"jobIds",params,undefined,false); 
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"company",params,undefined,false); 
			copyArg(msg,"phoneNumber",params,undefined,false); 
			copyArg(msg,"country",params,undefined,false); 
			copyArg(msg,"stateOrProvince",params,undefined,false); 
			copyArg(msg,"city",params,undefined,false); 
			copyArg(msg,"postalCode",params,undefined,false); 
			copyArg(msg,"street1",params,undefined,false); 
			copyArg(msg,"street2",params,undefined,false); 
			copyArg(msg,"street3",params,undefined,false); 
			copyArg(msg,"APIVersion",params,undefined,false); 
			

			svc.getShippingLabel(params,cb);
		}

		
		service.GetStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobId",params,undefined,false); 
			
			copyArg(msg,"JobId",params,undefined,false); 
			copyArg(msg,"APIVersion",params,undefined,false); 
			

			svc.getStatus(params,cb);
		}

		
		service.ListJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxJobs",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"APIVersion",params,undefined,false); 
			

			svc.listJobs(params,cb);
		}

		
		service.UpdateJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobId",params,undefined,false); 
			copyArg(n,"Manifest",params,undefined,false); 
			copyArg(n,"JobType",params,undefined,false); 
			copyArg(n,"ValidateOnly",params,undefined,false); 
			
			copyArg(msg,"JobId",params,undefined,false); 
			copyArg(msg,"Manifest",params,undefined,false); 
			copyArg(msg,"JobType",params,undefined,false); 
			copyArg(msg,"ValidateOnly",params,undefined,false); 
			copyArg(msg,"APIVersion",params,undefined,false); 
			

			svc.updateJob(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS ImportExport", AmazonAPINode);

};
