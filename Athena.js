
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

		var awsService = new AWS.Athena( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Athena(msg.AWSConfig) : awsService;

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

		
		service.BatchGetNamedQuery=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NamedQueryIds",params,undefined,true); 
			
			copyArg(msg,"NamedQueryIds",params,undefined,true); 
			

			svc.batchGetNamedQuery(params,cb);
		}

		
		service.BatchGetQueryExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueryExecutionIds",params,undefined,true); 
			
			copyArg(msg,"QueryExecutionIds",params,undefined,true); 
			

			svc.batchGetQueryExecution(params,cb);
		}

		
		service.CreateDataCatalog=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Type",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createDataCatalog(params,cb);
		}

		
		service.CreateNamedQuery=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Database",params,undefined,false); 
			copyArg(n,"QueryString",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Database",params,undefined,false); 
			copyArg(msg,"QueryString",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"WorkGroup",params,undefined,false); 
			

			svc.createNamedQuery(params,cb);
		}

		
		service.CreatePreparedStatement=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StatementName",params,undefined,false); 
			copyArg(n,"WorkGroup",params,undefined,false); 
			copyArg(n,"QueryStatement",params,undefined,false); 
			
			copyArg(msg,"StatementName",params,undefined,false); 
			copyArg(msg,"WorkGroup",params,undefined,false); 
			copyArg(msg,"QueryStatement",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			

			svc.createPreparedStatement(params,cb);
		}

		
		service.CreateWorkGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Configuration",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createWorkGroup(params,cb);
		}

		
		service.DeleteDataCatalog=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteDataCatalog(params,cb);
		}

		
		service.DeleteNamedQuery=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NamedQueryId",params,undefined,false); 
			
			copyArg(msg,"NamedQueryId",params,undefined,false); 
			

			svc.deleteNamedQuery(params,cb);
		}

		
		service.DeletePreparedStatement=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StatementName",params,undefined,false); 
			copyArg(n,"WorkGroup",params,undefined,false); 
			
			copyArg(msg,"StatementName",params,undefined,false); 
			copyArg(msg,"WorkGroup",params,undefined,false); 
			

			svc.deletePreparedStatement(params,cb);
		}

		
		service.DeleteWorkGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkGroup",params,undefined,false); 
			
			copyArg(msg,"WorkGroup",params,undefined,false); 
			copyArg(msg,"RecursiveDeleteOption",params,undefined,false); 
			

			svc.deleteWorkGroup(params,cb);
		}

		
		service.GetDataCatalog=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.getDataCatalog(params,cb);
		}

		
		service.GetDatabase=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CatalogName",params,undefined,false); 
			copyArg(n,"DatabaseName",params,undefined,false); 
			
			copyArg(msg,"CatalogName",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			

			svc.getDatabase(params,cb);
		}

		
		service.GetNamedQuery=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NamedQueryId",params,undefined,false); 
			
			copyArg(msg,"NamedQueryId",params,undefined,false); 
			

			svc.getNamedQuery(params,cb);
		}

		
		service.GetPreparedStatement=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StatementName",params,undefined,false); 
			copyArg(n,"WorkGroup",params,undefined,false); 
			
			copyArg(msg,"StatementName",params,undefined,false); 
			copyArg(msg,"WorkGroup",params,undefined,false); 
			

			svc.getPreparedStatement(params,cb);
		}

		
		service.GetQueryExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueryExecutionId",params,undefined,false); 
			
			copyArg(msg,"QueryExecutionId",params,undefined,false); 
			

			svc.getQueryExecution(params,cb);
		}

		
		service.GetQueryResults=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueryExecutionId",params,undefined,false); 
			
			copyArg(msg,"QueryExecutionId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.getQueryResults(params,cb);
		}

		
		service.GetTableMetadata=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CatalogName",params,undefined,false); 
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"TableName",params,undefined,false); 
			
			copyArg(msg,"CatalogName",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"TableName",params,undefined,false); 
			

			svc.getTableMetadata(params,cb);
		}

		
		service.GetWorkGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkGroup",params,undefined,false); 
			
			copyArg(msg,"WorkGroup",params,undefined,false); 
			

			svc.getWorkGroup(params,cb);
		}

		
		service.ListDataCatalogs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listDataCatalogs(params,cb);
		}

		
		service.ListDatabases=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CatalogName",params,undefined,false); 
			
			copyArg(msg,"CatalogName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listDatabases(params,cb);
		}

		
		service.ListEngineVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listEngineVersions(params,cb);
		}

		
		service.ListNamedQueries=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"WorkGroup",params,undefined,false); 
			

			svc.listNamedQueries(params,cb);
		}

		
		service.ListPreparedStatements=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkGroup",params,undefined,false); 
			
			copyArg(msg,"WorkGroup",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listPreparedStatements(params,cb);
		}

		
		service.ListQueryExecutions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"WorkGroup",params,undefined,false); 
			

			svc.listQueryExecutions(params,cb);
		}

		
		service.ListTableMetadata=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CatalogName",params,undefined,false); 
			copyArg(n,"DatabaseName",params,undefined,false); 
			
			copyArg(msg,"CatalogName",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"Expression",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listTableMetadata(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListWorkGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listWorkGroups(params,cb);
		}

		
		service.StartQueryExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueryString",params,undefined,false); 
			
			copyArg(msg,"QueryString",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"QueryExecutionContext",params,undefined,true); 
			copyArg(msg,"ResultConfiguration",params,undefined,true); 
			copyArg(msg,"WorkGroup",params,undefined,false); 
			

			svc.startQueryExecution(params,cb);
		}

		
		service.StopQueryExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueryExecutionId",params,undefined,false); 
			
			copyArg(msg,"QueryExecutionId",params,undefined,false); 
			

			svc.stopQueryExecution(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateDataCatalog=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Type",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,true); 
			

			svc.updateDataCatalog(params,cb);
		}

		
		service.UpdatePreparedStatement=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StatementName",params,undefined,false); 
			copyArg(n,"WorkGroup",params,undefined,false); 
			copyArg(n,"QueryStatement",params,undefined,false); 
			
			copyArg(msg,"StatementName",params,undefined,false); 
			copyArg(msg,"WorkGroup",params,undefined,false); 
			copyArg(msg,"QueryStatement",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			

			svc.updatePreparedStatement(params,cb);
		}

		
		service.UpdateWorkGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkGroup",params,undefined,false); 
			
			copyArg(msg,"WorkGroup",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"ConfigurationUpdates",params,undefined,false); 
			copyArg(msg,"State",params,undefined,false); 
			

			svc.updateWorkGroup(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Athena", AmazonAPINode);

};
