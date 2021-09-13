
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

		var awsService = new AWS.TimestreamWrite( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.TimestreamWrite(msg.AWSConfig) : awsService;

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
		
			service.CreateDatabase=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createDatabase(params,cb);
		}
			service.CreateTable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"RetentionProperties",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"RetentionProperties",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createTable(params,cb);
		}
			service.DeleteDatabase=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			

			svc.deleteDatabase(params,cb);
		}
			service.DeleteTable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			

			svc.deleteTable(params,cb);
		}
			service.DescribeDatabase=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			

			svc.describeDatabase(params,cb);
		}
			service.DescribeEndpoints=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeEndpoints(params,cb);
		}
			service.DescribeTable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			

			svc.describeTable(params,cb);
		}
			service.ListDatabases=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listDatabases(params,cb);
		}
			service.ListTables=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listTables(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
			service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
			service.UpdateDatabase=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			

			svc.updateDatabase(params,cb);
		}
			service.UpdateTable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"RetentionProperties",params,undefined,true); 
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"RetentionProperties",params,undefined,true); 
			
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"RetentionProperties",params,undefined,true); 
			

			svc.updateTable(params,cb);
		}
			service.WriteRecords=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"Records",params,undefined,false); 
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"CommonAttributes",params,undefined,true); 
			copyArgs(n,"Records",params,undefined,false); 
			
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"CommonAttributes",params,undefined,true); 
			copyArgs(msg,"Records",params,undefined,false); 
			

			svc.writeRecords(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS TimestreamWrite", AmazonAPINode);

};
