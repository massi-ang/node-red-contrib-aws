
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

		var awsService = new AWS.Honeycode( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Honeycode(msg.AWSConfig) : awsService;

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

		
		service.BatchCreateTableRows=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"workbookId",params,undefined,false); 
			copyArg(n,"tableId",params,undefined,false); 
			copyArg(n,"rowsToCreate",params,undefined,false); 
			
			copyArg(msg,"workbookId",params,undefined,false); 
			copyArg(msg,"tableId",params,undefined,false); 
			copyArg(msg,"rowsToCreate",params,undefined,false); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			

			svc.batchCreateTableRows(params,cb);
		}

		
		service.BatchDeleteTableRows=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"workbookId",params,undefined,false); 
			copyArg(n,"tableId",params,undefined,false); 
			copyArg(n,"rowIds",params,undefined,true); 
			
			copyArg(msg,"workbookId",params,undefined,false); 
			copyArg(msg,"tableId",params,undefined,false); 
			copyArg(msg,"rowIds",params,undefined,true); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			

			svc.batchDeleteTableRows(params,cb);
		}

		
		service.BatchUpdateTableRows=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"workbookId",params,undefined,false); 
			copyArg(n,"tableId",params,undefined,false); 
			copyArg(n,"rowsToUpdate",params,undefined,false); 
			
			copyArg(msg,"workbookId",params,undefined,false); 
			copyArg(msg,"tableId",params,undefined,false); 
			copyArg(msg,"rowsToUpdate",params,undefined,false); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			

			svc.batchUpdateTableRows(params,cb);
		}

		
		service.BatchUpsertTableRows=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"workbookId",params,undefined,false); 
			copyArg(n,"tableId",params,undefined,false); 
			copyArg(n,"rowsToUpsert",params,undefined,false); 
			
			copyArg(msg,"workbookId",params,undefined,false); 
			copyArg(msg,"tableId",params,undefined,false); 
			copyArg(msg,"rowsToUpsert",params,undefined,false); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			

			svc.batchUpsertTableRows(params,cb);
		}

		
		service.DescribeTableDataImportJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"workbookId",params,undefined,false); 
			copyArg(n,"tableId",params,undefined,false); 
			copyArg(n,"jobId",params,undefined,false); 
			
			copyArg(msg,"workbookId",params,undefined,false); 
			copyArg(msg,"tableId",params,undefined,false); 
			copyArg(msg,"jobId",params,undefined,false); 
			

			svc.describeTableDataImportJob(params,cb);
		}

		
		service.GetScreenData=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"workbookId",params,undefined,false); 
			copyArg(n,"appId",params,undefined,false); 
			copyArg(n,"screenId",params,undefined,false); 
			
			copyArg(msg,"workbookId",params,undefined,false); 
			copyArg(msg,"appId",params,undefined,false); 
			copyArg(msg,"screenId",params,undefined,false); 
			copyArg(msg,"variables",params,undefined,true); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.getScreenData(params,cb);
		}

		
		service.InvokeScreenAutomation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"workbookId",params,undefined,false); 
			copyArg(n,"appId",params,undefined,false); 
			copyArg(n,"screenId",params,undefined,false); 
			copyArg(n,"screenAutomationId",params,undefined,false); 
			
			copyArg(msg,"workbookId",params,undefined,false); 
			copyArg(msg,"appId",params,undefined,false); 
			copyArg(msg,"screenId",params,undefined,false); 
			copyArg(msg,"screenAutomationId",params,undefined,false); 
			copyArg(msg,"variables",params,undefined,true); 
			copyArg(msg,"rowId",params,undefined,false); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			

			svc.invokeScreenAutomation(params,cb);
		}

		
		service.ListTableColumns=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"workbookId",params,undefined,false); 
			copyArg(n,"tableId",params,undefined,false); 
			
			copyArg(msg,"workbookId",params,undefined,false); 
			copyArg(msg,"tableId",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listTableColumns(params,cb);
		}

		
		service.ListTableRows=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"workbookId",params,undefined,false); 
			copyArg(n,"tableId",params,undefined,false); 
			
			copyArg(msg,"workbookId",params,undefined,false); 
			copyArg(msg,"tableId",params,undefined,false); 
			copyArg(msg,"rowIds",params,undefined,true); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listTableRows(params,cb);
		}

		
		service.ListTables=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"workbookId",params,undefined,false); 
			
			copyArg(msg,"workbookId",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listTables(params,cb);
		}

		
		service.QueryTableRows=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"workbookId",params,undefined,false); 
			copyArg(n,"tableId",params,undefined,false); 
			copyArg(n,"filterFormula",params,undefined,true); 
			
			copyArg(msg,"workbookId",params,undefined,false); 
			copyArg(msg,"tableId",params,undefined,false); 
			copyArg(msg,"filterFormula",params,undefined,true); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.queryTableRows(params,cb);
		}

		
		service.StartTableDataImportJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"workbookId",params,undefined,false); 
			copyArg(n,"dataSource",params,undefined,true); 
			copyArg(n,"dataFormat",params,undefined,false); 
			copyArg(n,"destinationTableId",params,undefined,false); 
			copyArg(n,"importOptions",params,undefined,true); 
			copyArg(n,"clientRequestToken",params,undefined,false); 
			
			copyArg(msg,"workbookId",params,undefined,false); 
			copyArg(msg,"dataSource",params,undefined,true); 
			copyArg(msg,"dataFormat",params,undefined,false); 
			copyArg(msg,"destinationTableId",params,undefined,false); 
			copyArg(msg,"importOptions",params,undefined,true); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			

			svc.startTableDataImportJob(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Honeycode", AmazonAPINode);

};
