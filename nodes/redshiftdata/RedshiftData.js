
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

		var awsService = new AWS.RedshiftData( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.RedshiftData(msg.AWSConfig) : awsService;

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
		
		service.BatchExecuteStatement=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"Database",params,undefined,false); 
			copyArgs(n,"Sqls",params,undefined,false); 
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"Database",params,undefined,false); 
			copyArgs(n,"DbUser",params,undefined,false); 
			copyArgs(n,"SecretArn",params,undefined,false); 
			copyArgs(n,"Sqls",params,undefined,false); 
			copyArgs(n,"StatementName",params,undefined,false); 
			copyArgs(Boolean(n),"WithEvent",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"Database",params,undefined,false); 
			copyArgs(msg,"DbUser",params,undefined,false); 
			copyArgs(msg,"SecretArn",params,undefined,false); 
			copyArgs(msg,"Sqls",params,undefined,false); 
			copyArgs(msg,"StatementName",params,undefined,false); 
			copyArgs(msg,"WithEvent",params,undefined,false); 
			

			svc.batchExecuteStatement(params,cb);
		}
		
		service.CancelStatement=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.cancelStatement(params,cb);
		}
		
		service.DescribeStatement=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.describeStatement(params,cb);
		}
		
		service.DescribeTable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"Database",params,undefined,false); 
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"ConnectedDatabase",params,undefined,false); 
			copyArgs(n,"Database",params,undefined,false); 
			copyArgs(n,"DbUser",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Schema",params,undefined,false); 
			copyArgs(n,"SecretArn",params,undefined,false); 
			copyArgs(n,"Table",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"ConnectedDatabase",params,undefined,false); 
			copyArgs(msg,"Database",params,undefined,false); 
			copyArgs(msg,"DbUser",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Schema",params,undefined,false); 
			copyArgs(msg,"SecretArn",params,undefined,false); 
			copyArgs(msg,"Table",params,undefined,false); 
			

			svc.describeTable(params,cb);
		}
		
		service.ExecuteStatement=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"Database",params,undefined,false); 
			copyArgs(n,"Sql",params,undefined,false); 
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"Database",params,undefined,false); 
			copyArgs(n,"DbUser",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			copyArgs(n,"SecretArn",params,undefined,false); 
			copyArgs(n,"Sql",params,undefined,false); 
			copyArgs(n,"StatementName",params,undefined,false); 
			copyArgs(Boolean(n),"WithEvent",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"Database",params,undefined,false); 
			copyArgs(msg,"DbUser",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			copyArgs(msg,"SecretArn",params,undefined,false); 
			copyArgs(msg,"Sql",params,undefined,false); 
			copyArgs(msg,"StatementName",params,undefined,false); 
			copyArgs(msg,"WithEvent",params,undefined,false); 
			

			svc.executeStatement(params,cb);
		}
		
		service.GetStatementResult=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getStatementResult(params,cb);
		}
		
		service.ListDatabases=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"Database",params,undefined,false); 
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"Database",params,undefined,false); 
			copyArgs(n,"DbUser",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"SecretArn",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"Database",params,undefined,false); 
			copyArgs(msg,"DbUser",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"SecretArn",params,undefined,false); 
			

			svc.listDatabases(params,cb);
		}
		
		service.ListSchemas=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"Database",params,undefined,false); 
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"ConnectedDatabase",params,undefined,false); 
			copyArgs(n,"Database",params,undefined,false); 
			copyArgs(n,"DbUser",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"SchemaPattern",params,undefined,false); 
			copyArgs(n,"SecretArn",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"ConnectedDatabase",params,undefined,false); 
			copyArgs(msg,"Database",params,undefined,false); 
			copyArgs(msg,"DbUser",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"SchemaPattern",params,undefined,false); 
			copyArgs(msg,"SecretArn",params,undefined,false); 
			

			svc.listSchemas(params,cb);
		}
		
		service.ListStatements=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Boolean(n),"RoleLevel",params,undefined,false); 
			copyArgs(n,"StatementName",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"RoleLevel",params,undefined,false); 
			copyArgs(msg,"StatementName",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			

			svc.listStatements(params,cb);
		}
		
		service.ListTables=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"Database",params,undefined,false); 
			
			copyArgs(n,"ClusterIdentifier",params,undefined,false); 
			copyArgs(n,"ConnectedDatabase",params,undefined,false); 
			copyArgs(n,"Database",params,undefined,false); 
			copyArgs(n,"DbUser",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"SchemaPattern",params,undefined,false); 
			copyArgs(n,"SecretArn",params,undefined,false); 
			copyArgs(n,"TablePattern",params,undefined,false); 
			
			copyArgs(msg,"ClusterIdentifier",params,undefined,false); 
			copyArgs(msg,"ConnectedDatabase",params,undefined,false); 
			copyArgs(msg,"Database",params,undefined,false); 
			copyArgs(msg,"DbUser",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"SchemaPattern",params,undefined,false); 
			copyArgs(msg,"SecretArn",params,undefined,false); 
			copyArgs(msg,"TablePattern",params,undefined,false); 
			

			svc.listTables(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS RedshiftData", AmazonAPINode);

};
