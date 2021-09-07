
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

		var awsService = new AWS.Athena( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Athena(msg.AWSConfig) : awsService;

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

		
		service.BatchGetNamedQuery=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NamedQueryIds",params,undefined,true); 
			
			copyArgs(n,"NamedQueryIds",params,undefined,true); 
			
			copyArgs(msg,"NamedQueryIds",params,undefined,true); 
			

			svc.batchGetNamedQuery(params,cb);
		}

		
		service.BatchGetQueryExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QueryExecutionIds",params,undefined,true); 
			
			copyArgs(n,"QueryExecutionIds",params,undefined,true); 
			
			copyArgs(msg,"QueryExecutionIds",params,undefined,true); 
			

			svc.batchGetQueryExecution(params,cb);
		}

		
		service.CreateDataCatalog=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createDataCatalog(params,cb);
		}

		
		service.CreateNamedQuery=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Database",params,undefined,false); 
			copyArgs(n,"QueryString",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Database",params,undefined,false); 
			copyArgs(n,"QueryString",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"WorkGroup",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Database",params,undefined,false); 
			copyArgs(msg,"QueryString",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"WorkGroup",params,undefined,false); 
			

			svc.createNamedQuery(params,cb);
		}

		
		service.CreatePreparedStatement=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StatementName",params,undefined,false); 
			copyArgs(n,"WorkGroup",params,undefined,false); 
			copyArgs(n,"QueryStatement",params,undefined,false); 
			
			copyArgs(n,"StatementName",params,undefined,false); 
			copyArgs(n,"WorkGroup",params,undefined,false); 
			copyArgs(n,"QueryStatement",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(msg,"StatementName",params,undefined,false); 
			copyArgs(msg,"WorkGroup",params,undefined,false); 
			copyArgs(msg,"QueryStatement",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			

			svc.createPreparedStatement(params,cb);
		}

		
		service.CreateWorkGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Configuration",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Configuration",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createWorkGroup(params,cb);
		}

		
		service.DeleteDataCatalog=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteDataCatalog(params,cb);
		}

		
		service.DeleteNamedQuery=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NamedQueryId",params,undefined,false); 
			
			copyArgs(n,"NamedQueryId",params,undefined,false); 
			
			copyArgs(msg,"NamedQueryId",params,undefined,false); 
			

			svc.deleteNamedQuery(params,cb);
		}

		
		service.DeletePreparedStatement=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StatementName",params,undefined,false); 
			copyArgs(n,"WorkGroup",params,undefined,false); 
			
			copyArgs(n,"StatementName",params,undefined,false); 
			copyArgs(n,"WorkGroup",params,undefined,false); 
			
			copyArgs(msg,"StatementName",params,undefined,false); 
			copyArgs(msg,"WorkGroup",params,undefined,false); 
			

			svc.deletePreparedStatement(params,cb);
		}

		
		service.DeleteWorkGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkGroup",params,undefined,false); 
			
			copyArgs(n,"WorkGroup",params,undefined,false); 
			copyArgs(n,"RecursiveDeleteOption",params,undefined,false); 
			
			copyArgs(msg,"WorkGroup",params,undefined,false); 
			copyArgs(msg,"RecursiveDeleteOption",params,undefined,false); 
			

			svc.deleteWorkGroup(params,cb);
		}

		
		service.GetDataCatalog=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getDataCatalog(params,cb);
		}

		
		service.GetDatabase=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CatalogName",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			
			copyArgs(n,"CatalogName",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			
			copyArgs(msg,"CatalogName",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			

			svc.getDatabase(params,cb);
		}

		
		service.GetNamedQuery=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NamedQueryId",params,undefined,false); 
			
			copyArgs(n,"NamedQueryId",params,undefined,false); 
			
			copyArgs(msg,"NamedQueryId",params,undefined,false); 
			

			svc.getNamedQuery(params,cb);
		}

		
		service.GetPreparedStatement=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StatementName",params,undefined,false); 
			copyArgs(n,"WorkGroup",params,undefined,false); 
			
			copyArgs(n,"StatementName",params,undefined,false); 
			copyArgs(n,"WorkGroup",params,undefined,false); 
			
			copyArgs(msg,"StatementName",params,undefined,false); 
			copyArgs(msg,"WorkGroup",params,undefined,false); 
			

			svc.getPreparedStatement(params,cb);
		}

		
		service.GetQueryExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QueryExecutionId",params,undefined,false); 
			
			copyArgs(n,"QueryExecutionId",params,undefined,false); 
			
			copyArgs(msg,"QueryExecutionId",params,undefined,false); 
			

			svc.getQueryExecution(params,cb);
		}

		
		service.GetQueryResults=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QueryExecutionId",params,undefined,false); 
			
			copyArgs(n,"QueryExecutionId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"QueryExecutionId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.getQueryResults(params,cb);
		}

		
		service.GetTableMetadata=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CatalogName",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			
			copyArgs(n,"CatalogName",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			
			copyArgs(msg,"CatalogName",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			

			svc.getTableMetadata(params,cb);
		}

		
		service.GetWorkGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkGroup",params,undefined,false); 
			
			copyArgs(n,"WorkGroup",params,undefined,false); 
			
			copyArgs(msg,"WorkGroup",params,undefined,false); 
			

			svc.getWorkGroup(params,cb);
		}

		
		service.ListDataCatalogs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listDataCatalogs(params,cb);
		}

		
		service.ListDatabases=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CatalogName",params,undefined,false); 
			
			copyArgs(n,"CatalogName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"CatalogName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listDatabases(params,cb);
		}

		
		service.ListEngineVersions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listEngineVersions(params,cb);
		}

		
		service.ListNamedQueries=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"WorkGroup",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"WorkGroup",params,undefined,false); 
			

			svc.listNamedQueries(params,cb);
		}

		
		service.ListPreparedStatements=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkGroup",params,undefined,false); 
			
			copyArgs(n,"WorkGroup",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"WorkGroup",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listPreparedStatements(params,cb);
		}

		
		service.ListQueryExecutions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"WorkGroup",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"WorkGroup",params,undefined,false); 
			

			svc.listQueryExecutions(params,cb);
		}

		
		service.ListTableMetadata=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CatalogName",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			
			copyArgs(n,"CatalogName",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"Expression",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"CatalogName",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"Expression",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listTableMetadata(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListWorkGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listWorkGroups(params,cb);
		}

		
		service.StartQueryExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QueryString",params,undefined,false); 
			
			copyArgs(n,"QueryString",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"QueryExecutionContext",params,undefined,true); 
			copyArgs(n,"ResultConfiguration",params,undefined,true); 
			copyArgs(n,"WorkGroup",params,undefined,false); 
			
			copyArgs(msg,"QueryString",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"QueryExecutionContext",params,undefined,true); 
			copyArgs(msg,"ResultConfiguration",params,undefined,true); 
			copyArgs(msg,"WorkGroup",params,undefined,false); 
			

			svc.startQueryExecution(params,cb);
		}

		
		service.StopQueryExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QueryExecutionId",params,undefined,false); 
			
			copyArgs(n,"QueryExecutionId",params,undefined,false); 
			
			copyArgs(msg,"QueryExecutionId",params,undefined,false); 
			

			svc.stopQueryExecution(params,cb);
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

		
		service.UpdateDataCatalog=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			

			svc.updateDataCatalog(params,cb);
		}

		
		service.UpdatePreparedStatement=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StatementName",params,undefined,false); 
			copyArgs(n,"WorkGroup",params,undefined,false); 
			copyArgs(n,"QueryStatement",params,undefined,false); 
			
			copyArgs(n,"StatementName",params,undefined,false); 
			copyArgs(n,"WorkGroup",params,undefined,false); 
			copyArgs(n,"QueryStatement",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(msg,"StatementName",params,undefined,false); 
			copyArgs(msg,"WorkGroup",params,undefined,false); 
			copyArgs(msg,"QueryStatement",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			

			svc.updatePreparedStatement(params,cb);
		}

		
		service.UpdateWorkGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkGroup",params,undefined,false); 
			
			copyArgs(n,"WorkGroup",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"ConfigurationUpdates",params,undefined,false); 
			copyArgs(n,"State",params,undefined,false); 
			
			copyArgs(msg,"WorkGroup",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"ConfigurationUpdates",params,undefined,false); 
			copyArgs(msg,"State",params,undefined,false); 
			

			svc.updateWorkGroup(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Athena", AmazonAPINode);

};
