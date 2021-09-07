
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

		var awsService = new AWS.CognitoSync( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.CognitoSync(msg.AWSConfig) : awsService;

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

		
		service.BulkPublish=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			

			svc.bulkPublish(params,cb);
		}

		
		service.DeleteDataset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"IdentityId",params,undefined,false); 
			copyArgs(n,"DatasetName",params,undefined,false); 
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"IdentityId",params,undefined,false); 
			copyArgs(n,"DatasetName",params,undefined,false); 
			
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			copyArgs(msg,"IdentityId",params,undefined,false); 
			copyArgs(msg,"DatasetName",params,undefined,false); 
			

			svc.deleteDataset(params,cb);
		}

		
		service.DescribeDataset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"IdentityId",params,undefined,false); 
			copyArgs(n,"DatasetName",params,undefined,false); 
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"IdentityId",params,undefined,false); 
			copyArgs(n,"DatasetName",params,undefined,false); 
			
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			copyArgs(msg,"IdentityId",params,undefined,false); 
			copyArgs(msg,"DatasetName",params,undefined,false); 
			

			svc.describeDataset(params,cb);
		}

		
		service.DescribeIdentityPoolUsage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			

			svc.describeIdentityPoolUsage(params,cb);
		}

		
		service.DescribeIdentityUsage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"IdentityId",params,undefined,false); 
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"IdentityId",params,undefined,false); 
			
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			copyArgs(msg,"IdentityId",params,undefined,false); 
			

			svc.describeIdentityUsage(params,cb);
		}

		
		service.GetBulkPublishDetails=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			

			svc.getBulkPublishDetails(params,cb);
		}

		
		service.GetCognitoEvents=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			

			svc.getCognitoEvents(params,cb);
		}

		
		service.GetIdentityPoolConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			

			svc.getIdentityPoolConfiguration(params,cb);
		}

		
		service.ListDatasets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityId",params,undefined,false); 
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"IdentityId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			copyArgs(msg,"IdentityId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listDatasets(params,cb);
		}

		
		service.ListIdentityPoolUsage=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listIdentityPoolUsage(params,cb);
		}

		
		service.ListRecords=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"IdentityId",params,undefined,false); 
			copyArgs(n,"DatasetName",params,undefined,false); 
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"IdentityId",params,undefined,false); 
			copyArgs(n,"DatasetName",params,undefined,false); 
			copyArgs(n,"LastSyncCount",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"SyncSessionToken",params,undefined,false); 
			
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			copyArgs(msg,"IdentityId",params,undefined,false); 
			copyArgs(msg,"DatasetName",params,undefined,false); 
			copyArgs(msg,"LastSyncCount",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"SyncSessionToken",params,undefined,false); 
			

			svc.listRecords(params,cb);
		}

		
		service.RegisterDevice=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"IdentityId",params,undefined,false); 
			copyArgs(n,"Platform",params,undefined,false); 
			copyArgs(n,"Token",params,undefined,false); 
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"IdentityId",params,undefined,false); 
			copyArgs(n,"Platform",params,undefined,false); 
			copyArgs(n,"Token",params,undefined,false); 
			
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			copyArgs(msg,"IdentityId",params,undefined,false); 
			copyArgs(msg,"Platform",params,undefined,false); 
			copyArgs(msg,"Token",params,undefined,false); 
			

			svc.registerDevice(params,cb);
		}

		
		service.SetCognitoEvents=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"Events",params,undefined,true); 
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"Events",params,undefined,true); 
			
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			copyArgs(msg,"Events",params,undefined,true); 
			

			svc.setCognitoEvents(params,cb);
		}

		
		service.SetIdentityPoolConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"PushSync",params,undefined,true); 
			copyArgs(n,"CognitoStreams",params,undefined,true); 
			
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			copyArgs(msg,"PushSync",params,undefined,true); 
			copyArgs(msg,"CognitoStreams",params,undefined,true); 
			

			svc.setIdentityPoolConfiguration(params,cb);
		}

		
		service.SubscribeToDataset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"IdentityId",params,undefined,false); 
			copyArgs(n,"DatasetName",params,undefined,false); 
			copyArgs(n,"DeviceId",params,undefined,false); 
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"IdentityId",params,undefined,false); 
			copyArgs(n,"DatasetName",params,undefined,false); 
			copyArgs(n,"DeviceId",params,undefined,false); 
			
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			copyArgs(msg,"IdentityId",params,undefined,false); 
			copyArgs(msg,"DatasetName",params,undefined,false); 
			copyArgs(msg,"DeviceId",params,undefined,false); 
			

			svc.subscribeToDataset(params,cb);
		}

		
		service.UnsubscribeFromDataset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"IdentityId",params,undefined,false); 
			copyArgs(n,"DatasetName",params,undefined,false); 
			copyArgs(n,"DeviceId",params,undefined,false); 
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"IdentityId",params,undefined,false); 
			copyArgs(n,"DatasetName",params,undefined,false); 
			copyArgs(n,"DeviceId",params,undefined,false); 
			
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			copyArgs(msg,"IdentityId",params,undefined,false); 
			copyArgs(msg,"DatasetName",params,undefined,false); 
			copyArgs(msg,"DeviceId",params,undefined,false); 
			

			svc.unsubscribeFromDataset(params,cb);
		}

		
		service.UpdateRecords=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"IdentityId",params,undefined,false); 
			copyArgs(n,"DatasetName",params,undefined,false); 
			copyArgs(n,"SyncSessionToken",params,undefined,false); 
			
			copyArgs(n,"IdentityPoolId",params,undefined,false); 
			copyArgs(n,"IdentityId",params,undefined,false); 
			copyArgs(n,"DatasetName",params,undefined,false); 
			copyArgs(n,"DeviceId",params,undefined,false); 
			copyArgs(n,"RecordPatches",params,undefined,false); 
			copyArgs(n,"SyncSessionToken",params,undefined,false); 
			copyArgs(n,"ClientContext",params,undefined,false); 
			
			copyArgs(msg,"IdentityPoolId",params,undefined,false); 
			copyArgs(msg,"IdentityId",params,undefined,false); 
			copyArgs(msg,"DatasetName",params,undefined,false); 
			copyArgs(msg,"DeviceId",params,undefined,false); 
			copyArgs(msg,"RecordPatches",params,undefined,false); 
			copyArgs(msg,"SyncSessionToken",params,undefined,false); 
			copyArgs(msg,"ClientContext",params,undefined,false); 
			

			svc.updateRecords(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS CognitoSync", AmazonAPINode);

};
