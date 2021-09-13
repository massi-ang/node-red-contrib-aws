
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

		var awsService = new AWS.Honeycode( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Honeycode(msg.AWSConfig) : awsService;

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
		
		service.BatchCreateTableRows=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"workbookId",params,undefined,false); 
			copyArgs(n,"tableId",params,undefined,false); 
			copyArgs(n,"rowsToCreate",params,undefined,false); 
			
			copyArgs(n,"workbookId",params,undefined,false); 
			copyArgs(n,"tableId",params,undefined,false); 
			copyArgs(n,"rowsToCreate",params,undefined,false); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"workbookId",params,undefined,false); 
			copyArgs(msg,"tableId",params,undefined,false); 
			copyArgs(msg,"rowsToCreate",params,undefined,false); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			

			svc.batchCreateTableRows(params,cb);
		}
		
		service.BatchDeleteTableRows=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"workbookId",params,undefined,false); 
			copyArgs(n,"tableId",params,undefined,false); 
			copyArgs(n,"rowIds",params,undefined,true); 
			
			copyArgs(n,"workbookId",params,undefined,false); 
			copyArgs(n,"tableId",params,undefined,false); 
			copyArgs(n,"rowIds",params,undefined,true); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"workbookId",params,undefined,false); 
			copyArgs(msg,"tableId",params,undefined,false); 
			copyArgs(msg,"rowIds",params,undefined,true); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			

			svc.batchDeleteTableRows(params,cb);
		}
		
		service.BatchUpdateTableRows=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"workbookId",params,undefined,false); 
			copyArgs(n,"tableId",params,undefined,false); 
			copyArgs(n,"rowsToUpdate",params,undefined,false); 
			
			copyArgs(n,"workbookId",params,undefined,false); 
			copyArgs(n,"tableId",params,undefined,false); 
			copyArgs(n,"rowsToUpdate",params,undefined,false); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"workbookId",params,undefined,false); 
			copyArgs(msg,"tableId",params,undefined,false); 
			copyArgs(msg,"rowsToUpdate",params,undefined,false); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			

			svc.batchUpdateTableRows(params,cb);
		}
		
		service.BatchUpsertTableRows=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"workbookId",params,undefined,false); 
			copyArgs(n,"tableId",params,undefined,false); 
			copyArgs(n,"rowsToUpsert",params,undefined,false); 
			
			copyArgs(n,"workbookId",params,undefined,false); 
			copyArgs(n,"tableId",params,undefined,false); 
			copyArgs(n,"rowsToUpsert",params,undefined,false); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"workbookId",params,undefined,false); 
			copyArgs(msg,"tableId",params,undefined,false); 
			copyArgs(msg,"rowsToUpsert",params,undefined,false); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			

			svc.batchUpsertTableRows(params,cb);
		}
		
		service.DescribeTableDataImportJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"workbookId",params,undefined,false); 
			copyArgs(n,"tableId",params,undefined,false); 
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(n,"workbookId",params,undefined,false); 
			copyArgs(n,"tableId",params,undefined,false); 
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(msg,"workbookId",params,undefined,false); 
			copyArgs(msg,"tableId",params,undefined,false); 
			copyArgs(msg,"jobId",params,undefined,false); 
			

			svc.describeTableDataImportJob(params,cb);
		}
		
		service.GetScreenData=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"workbookId",params,undefined,false); 
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"screenId",params,undefined,false); 
			
			copyArgs(n,"workbookId",params,undefined,false); 
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"screenId",params,undefined,false); 
			copyArgs(n,"variables",params,undefined,true); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"workbookId",params,undefined,false); 
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"screenId",params,undefined,false); 
			copyArgs(msg,"variables",params,undefined,true); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.getScreenData(params,cb);
		}
		
		service.InvokeScreenAutomation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"workbookId",params,undefined,false); 
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"screenId",params,undefined,false); 
			copyArgs(n,"screenAutomationId",params,undefined,false); 
			
			copyArgs(n,"workbookId",params,undefined,false); 
			copyArgs(n,"appId",params,undefined,false); 
			copyArgs(n,"screenId",params,undefined,false); 
			copyArgs(n,"screenAutomationId",params,undefined,false); 
			copyArgs(n,"variables",params,undefined,true); 
			copyArgs(n,"rowId",params,undefined,false); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"workbookId",params,undefined,false); 
			copyArgs(msg,"appId",params,undefined,false); 
			copyArgs(msg,"screenId",params,undefined,false); 
			copyArgs(msg,"screenAutomationId",params,undefined,false); 
			copyArgs(msg,"variables",params,undefined,true); 
			copyArgs(msg,"rowId",params,undefined,false); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			

			svc.invokeScreenAutomation(params,cb);
		}
		
		service.ListTableColumns=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"workbookId",params,undefined,false); 
			copyArgs(n,"tableId",params,undefined,false); 
			
			copyArgs(n,"workbookId",params,undefined,false); 
			copyArgs(n,"tableId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"workbookId",params,undefined,false); 
			copyArgs(msg,"tableId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listTableColumns(params,cb);
		}
		
		service.ListTableRows=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"workbookId",params,undefined,false); 
			copyArgs(n,"tableId",params,undefined,false); 
			
			copyArgs(n,"workbookId",params,undefined,false); 
			copyArgs(n,"tableId",params,undefined,false); 
			copyArgs(n,"rowIds",params,undefined,true); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"workbookId",params,undefined,false); 
			copyArgs(msg,"tableId",params,undefined,false); 
			copyArgs(msg,"rowIds",params,undefined,true); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listTableRows(params,cb);
		}
		
		service.ListTables=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"workbookId",params,undefined,false); 
			
			copyArgs(n,"workbookId",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"workbookId",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listTables(params,cb);
		}
		
		service.QueryTableRows=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"workbookId",params,undefined,false); 
			copyArgs(n,"tableId",params,undefined,false); 
			copyArgs(n,"filterFormula",params,undefined,true); 
			
			copyArgs(n,"workbookId",params,undefined,false); 
			copyArgs(n,"tableId",params,undefined,false); 
			copyArgs(n,"filterFormula",params,undefined,true); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"workbookId",params,undefined,false); 
			copyArgs(msg,"tableId",params,undefined,false); 
			copyArgs(msg,"filterFormula",params,undefined,true); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.queryTableRows(params,cb);
		}
		
		service.StartTableDataImportJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"workbookId",params,undefined,false); 
			copyArgs(n,"dataSource",params,undefined,true); 
			copyArgs(n,"dataFormat",params,undefined,false); 
			copyArgs(n,"destinationTableId",params,undefined,false); 
			copyArgs(n,"importOptions",params,undefined,true); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(n,"workbookId",params,undefined,false); 
			copyArgs(n,"dataSource",params,undefined,true); 
			copyArgs(n,"dataFormat",params,undefined,false); 
			copyArgs(n,"destinationTableId",params,undefined,false); 
			copyArgs(n,"importOptions",params,undefined,true); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"workbookId",params,undefined,false); 
			copyArgs(msg,"dataSource",params,undefined,true); 
			copyArgs(msg,"dataFormat",params,undefined,false); 
			copyArgs(msg,"destinationTableId",params,undefined,false); 
			copyArgs(msg,"importOptions",params,undefined,true); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			

			svc.startTableDataImportJob(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS Honeycode", AmazonAPINode);

};
