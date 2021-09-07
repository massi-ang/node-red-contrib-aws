
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

		var awsService = new AWS.Glue( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Glue(msg.AWSConfig) : awsService;

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

		
		service.BatchCreatePartition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"PartitionInputList",params,undefined,false); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"PartitionInputList",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"PartitionInputList",params,undefined,false); 
			

			svc.batchCreatePartition(params,cb);
		}

		
		service.BatchDeleteConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConnectionNameList",params,undefined,false); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"ConnectionNameList",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"ConnectionNameList",params,undefined,false); 
			

			svc.batchDeleteConnection(params,cb);
		}

		
		service.BatchDeletePartition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"PartitionsToDelete",params,undefined,false); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"PartitionsToDelete",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"PartitionsToDelete",params,undefined,false); 
			

			svc.batchDeletePartition(params,cb);
		}

		
		service.BatchDeleteTable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TablesToDelete",params,undefined,false); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TablesToDelete",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TablesToDelete",params,undefined,false); 
			

			svc.batchDeleteTable(params,cb);
		}

		
		service.BatchDeleteTableVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"VersionIds",params,undefined,false); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"VersionIds",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"VersionIds",params,undefined,false); 
			

			svc.batchDeleteTableVersion(params,cb);
		}

		
		service.BatchGetBlueprints=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Names",params,undefined,false); 
			
			copyArgs(n,"Names",params,undefined,false); 
			copyArgs(n,"IncludeBlueprint",params,undefined,false); 
			copyArgs(n,"IncludeParameterSpec",params,undefined,false); 
			
			copyArgs(msg,"Names",params,undefined,false); 
			copyArgs(msg,"IncludeBlueprint",params,undefined,false); 
			copyArgs(msg,"IncludeParameterSpec",params,undefined,false); 
			

			svc.batchGetBlueprints(params,cb);
		}

		
		service.BatchGetCrawlers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CrawlerNames",params,undefined,true); 
			
			copyArgs(n,"CrawlerNames",params,undefined,true); 
			
			copyArgs(msg,"CrawlerNames",params,undefined,true); 
			

			svc.batchGetCrawlers(params,cb);
		}

		
		service.BatchGetDevEndpoints=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DevEndpointNames",params,undefined,true); 
			
			copyArgs(n,"DevEndpointNames",params,undefined,true); 
			
			copyArgs(msg,"DevEndpointNames",params,undefined,true); 
			

			svc.batchGetDevEndpoints(params,cb);
		}

		
		service.BatchGetJobs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobNames",params,undefined,true); 
			
			copyArgs(n,"JobNames",params,undefined,true); 
			
			copyArgs(msg,"JobNames",params,undefined,true); 
			

			svc.batchGetJobs(params,cb);
		}

		
		service.BatchGetPartition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"PartitionsToGet",params,undefined,true); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"PartitionsToGet",params,undefined,true); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"PartitionsToGet",params,undefined,true); 
			

			svc.batchGetPartition(params,cb);
		}

		
		service.BatchGetTriggers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TriggerNames",params,undefined,true); 
			
			copyArgs(n,"TriggerNames",params,undefined,true); 
			
			copyArgs(msg,"TriggerNames",params,undefined,true); 
			

			svc.batchGetTriggers(params,cb);
		}

		
		service.BatchGetWorkflows=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Names",params,undefined,true); 
			
			copyArgs(n,"Names",params,undefined,true); 
			copyArgs(n,"IncludeGraph",params,undefined,false); 
			
			copyArgs(msg,"Names",params,undefined,true); 
			copyArgs(msg,"IncludeGraph",params,undefined,false); 
			

			svc.batchGetWorkflows(params,cb);
		}

		
		service.BatchStopJobRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobName",params,undefined,false); 
			copyArgs(n,"JobRunIds",params,undefined,false); 
			
			copyArgs(n,"JobName",params,undefined,false); 
			copyArgs(n,"JobRunIds",params,undefined,false); 
			
			copyArgs(msg,"JobName",params,undefined,false); 
			copyArgs(msg,"JobRunIds",params,undefined,false); 
			

			svc.batchStopJobRun(params,cb);
		}

		
		service.BatchUpdatePartition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"Entries",params,undefined,false); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"Entries",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"Entries",params,undefined,false); 
			

			svc.batchUpdatePartition(params,cb);
		}

		
		service.CancelMLTaskRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransformId",params,undefined,false); 
			copyArgs(n,"TaskRunId",params,undefined,false); 
			
			copyArgs(n,"TransformId",params,undefined,false); 
			copyArgs(n,"TaskRunId",params,undefined,false); 
			
			copyArgs(msg,"TransformId",params,undefined,false); 
			copyArgs(msg,"TaskRunId",params,undefined,false); 
			

			svc.cancelMLTaskRun(params,cb);
		}

		
		service.CheckSchemaVersionValidity=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DataFormat",params,undefined,false); 
			copyArgs(n,"SchemaDefinition",params,undefined,false); 
			
			copyArgs(n,"DataFormat",params,undefined,false); 
			copyArgs(n,"SchemaDefinition",params,undefined,false); 
			
			copyArgs(msg,"DataFormat",params,undefined,false); 
			copyArgs(msg,"SchemaDefinition",params,undefined,false); 
			

			svc.checkSchemaVersionValidity(params,cb);
		}

		
		service.CreateBlueprint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"BlueprintLocation",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"BlueprintLocation",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"BlueprintLocation",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createBlueprint(params,cb);
		}

		
		service.CreateClassifier=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"GrokClassifier",params,undefined,false); 
			copyArgs(n,"XMLClassifier",params,undefined,false); 
			copyArgs(n,"JsonClassifier",params,undefined,false); 
			copyArgs(n,"CsvClassifier",params,undefined,false); 
			
			copyArgs(msg,"GrokClassifier",params,undefined,false); 
			copyArgs(msg,"XMLClassifier",params,undefined,false); 
			copyArgs(msg,"JsonClassifier",params,undefined,false); 
			copyArgs(msg,"CsvClassifier",params,undefined,false); 
			

			svc.createClassifier(params,cb);
		}

		
		service.CreateConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConnectionInput",params,undefined,true); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"ConnectionInput",params,undefined,true); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"ConnectionInput",params,undefined,true); 
			

			svc.createConnection(params,cb);
		}

		
		service.CreateCrawler=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Role",params,undefined,false); 
			copyArgs(n,"Targets",params,undefined,true); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Role",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Targets",params,undefined,true); 
			copyArgs(n,"Schedule",params,undefined,false); 
			copyArgs(n,"Classifiers",params,undefined,true); 
			copyArgs(n,"TablePrefix",params,undefined,false); 
			copyArgs(n,"SchemaChangePolicy",params,undefined,true); 
			copyArgs(n,"RecrawlPolicy",params,undefined,true); 
			copyArgs(n,"LineageConfiguration",params,undefined,true); 
			copyArgs(n,"Configuration",params,undefined,false); 
			copyArgs(n,"CrawlerSecurityConfiguration",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Role",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Targets",params,undefined,true); 
			copyArgs(msg,"Schedule",params,undefined,false); 
			copyArgs(msg,"Classifiers",params,undefined,true); 
			copyArgs(msg,"TablePrefix",params,undefined,false); 
			copyArgs(msg,"SchemaChangePolicy",params,undefined,true); 
			copyArgs(msg,"RecrawlPolicy",params,undefined,true); 
			copyArgs(msg,"LineageConfiguration",params,undefined,true); 
			copyArgs(msg,"Configuration",params,undefined,false); 
			copyArgs(msg,"CrawlerSecurityConfiguration",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createCrawler(params,cb);
		}

		
		service.CreateDatabase=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseInput",params,undefined,true); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseInput",params,undefined,true); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseInput",params,undefined,true); 
			

			svc.createDatabase(params,cb);
		}

		
		service.CreateDevEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"SecurityGroupIds",params,undefined,true); 
			copyArgs(n,"SubnetId",params,undefined,false); 
			copyArgs(n,"PublicKey",params,undefined,false); 
			copyArgs(n,"PublicKeys",params,undefined,true); 
			copyArgs(n,"NumberOfNodes",params,undefined,false); 
			copyArgs(n,"WorkerType",params,undefined,false); 
			copyArgs(n,"GlueVersion",params,undefined,false); 
			copyArgs(n,"NumberOfWorkers",params,undefined,false); 
			copyArgs(n,"ExtraPythonLibsS3Path",params,undefined,false); 
			copyArgs(n,"ExtraJarsS3Path",params,undefined,false); 
			copyArgs(n,"SecurityConfiguration",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"Arguments",params,undefined,true); 
			
			copyArgs(msg,"EndpointName",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"SecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"SubnetId",params,undefined,false); 
			copyArgs(msg,"PublicKey",params,undefined,false); 
			copyArgs(msg,"PublicKeys",params,undefined,true); 
			copyArgs(msg,"NumberOfNodes",params,undefined,false); 
			copyArgs(msg,"WorkerType",params,undefined,false); 
			copyArgs(msg,"GlueVersion",params,undefined,false); 
			copyArgs(msg,"NumberOfWorkers",params,undefined,false); 
			copyArgs(msg,"ExtraPythonLibsS3Path",params,undefined,false); 
			copyArgs(msg,"ExtraJarsS3Path",params,undefined,false); 
			copyArgs(msg,"SecurityConfiguration",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"Arguments",params,undefined,true); 
			

			svc.createDevEndpoint(params,cb);
		}

		
		service.CreateJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Role",params,undefined,false); 
			copyArgs(n,"Command",params,undefined,true); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"LogUri",params,undefined,false); 
			copyArgs(n,"Role",params,undefined,false); 
			copyArgs(n,"ExecutionProperty",params,undefined,true); 
			copyArgs(n,"Command",params,undefined,true); 
			copyArgs(n,"DefaultArguments",params,undefined,true); 
			copyArgs(n,"NonOverridableArguments",params,undefined,true); 
			copyArgs(n,"Connections",params,undefined,true); 
			copyArgs(n,"MaxRetries",params,undefined,false); 
			copyArgs(n,"AllocatedCapacity",params,undefined,false); 
			copyArgs(n,"Timeout",params,undefined,false); 
			copyArgs(n,"MaxCapacity",params,undefined,false); 
			copyArgs(n,"SecurityConfiguration",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"NotificationProperty",params,undefined,true); 
			copyArgs(n,"GlueVersion",params,undefined,false); 
			copyArgs(n,"NumberOfWorkers",params,undefined,false); 
			copyArgs(n,"WorkerType",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"LogUri",params,undefined,false); 
			copyArgs(msg,"Role",params,undefined,false); 
			copyArgs(msg,"ExecutionProperty",params,undefined,true); 
			copyArgs(msg,"Command",params,undefined,true); 
			copyArgs(msg,"DefaultArguments",params,undefined,true); 
			copyArgs(msg,"NonOverridableArguments",params,undefined,true); 
			copyArgs(msg,"Connections",params,undefined,true); 
			copyArgs(msg,"MaxRetries",params,undefined,false); 
			copyArgs(msg,"AllocatedCapacity",params,undefined,false); 
			copyArgs(msg,"Timeout",params,undefined,false); 
			copyArgs(msg,"MaxCapacity",params,undefined,false); 
			copyArgs(msg,"SecurityConfiguration",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"NotificationProperty",params,undefined,true); 
			copyArgs(msg,"GlueVersion",params,undefined,false); 
			copyArgs(msg,"NumberOfWorkers",params,undefined,false); 
			copyArgs(msg,"WorkerType",params,undefined,false); 
			

			svc.createJob(params,cb);
		}

		
		service.CreateMLTransform=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"InputRecordTables",params,undefined,true); 
			copyArgs(n,"Parameters",params,undefined,true); 
			copyArgs(n,"Role",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"InputRecordTables",params,undefined,true); 
			copyArgs(n,"Parameters",params,undefined,true); 
			copyArgs(n,"Role",params,undefined,false); 
			copyArgs(n,"GlueVersion",params,undefined,false); 
			copyArgs(n,"MaxCapacity",params,undefined,false); 
			copyArgs(n,"WorkerType",params,undefined,false); 
			copyArgs(n,"NumberOfWorkers",params,undefined,false); 
			copyArgs(n,"Timeout",params,undefined,false); 
			copyArgs(n,"MaxRetries",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"TransformEncryption",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"InputRecordTables",params,undefined,true); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			copyArgs(msg,"Role",params,undefined,false); 
			copyArgs(msg,"GlueVersion",params,undefined,false); 
			copyArgs(msg,"MaxCapacity",params,undefined,false); 
			copyArgs(msg,"WorkerType",params,undefined,false); 
			copyArgs(msg,"NumberOfWorkers",params,undefined,false); 
			copyArgs(msg,"Timeout",params,undefined,false); 
			copyArgs(msg,"MaxRetries",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"TransformEncryption",params,undefined,true); 
			

			svc.createMLTransform(params,cb);
		}

		
		service.CreatePartition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"PartitionInput",params,undefined,true); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"PartitionInput",params,undefined,true); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"PartitionInput",params,undefined,true); 
			

			svc.createPartition(params,cb);
		}

		
		service.CreatePartitionIndex=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"PartitionIndex",params,undefined,true); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"PartitionIndex",params,undefined,true); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"PartitionIndex",params,undefined,true); 
			

			svc.createPartitionIndex(params,cb);
		}

		
		service.CreateRegistry=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RegistryName",params,undefined,false); 
			
			copyArgs(n,"RegistryName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"RegistryName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createRegistry(params,cb);
		}

		
		service.CreateSchema=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SchemaName",params,undefined,false); 
			copyArgs(n,"DataFormat",params,undefined,false); 
			
			copyArgs(n,"RegistryId",params,undefined,true); 
			copyArgs(n,"SchemaName",params,undefined,false); 
			copyArgs(n,"DataFormat",params,undefined,false); 
			copyArgs(n,"Compatibility",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"SchemaDefinition",params,undefined,false); 
			
			copyArgs(msg,"RegistryId",params,undefined,true); 
			copyArgs(msg,"SchemaName",params,undefined,false); 
			copyArgs(msg,"DataFormat",params,undefined,false); 
			copyArgs(msg,"Compatibility",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"SchemaDefinition",params,undefined,false); 
			

			svc.createSchema(params,cb);
		}

		
		service.CreateScript=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DagNodes",params,undefined,true); 
			copyArgs(n,"DagEdges",params,undefined,true); 
			copyArgs(n,"Language",params,undefined,false); 
			
			copyArgs(msg,"DagNodes",params,undefined,true); 
			copyArgs(msg,"DagEdges",params,undefined,true); 
			copyArgs(msg,"Language",params,undefined,false); 
			

			svc.createScript(params,cb);
		}

		
		service.CreateSecurityConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"EncryptionConfiguration",params,undefined,true); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"EncryptionConfiguration",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"EncryptionConfiguration",params,undefined,true); 
			

			svc.createSecurityConfiguration(params,cb);
		}

		
		service.CreateTable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableInput",params,undefined,true); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableInput",params,undefined,true); 
			copyArgs(n,"PartitionIndexes",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableInput",params,undefined,true); 
			copyArgs(msg,"PartitionIndexes",params,undefined,false); 
			

			svc.createTable(params,cb);
		}

		
		service.CreateTrigger=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Actions",params,undefined,true); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"WorkflowName",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Schedule",params,undefined,false); 
			copyArgs(n,"Predicate",params,undefined,true); 
			copyArgs(n,"Actions",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"StartOnCreation",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"EventBatchingCondition",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"WorkflowName",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"Schedule",params,undefined,false); 
			copyArgs(msg,"Predicate",params,undefined,true); 
			copyArgs(msg,"Actions",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"StartOnCreation",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"EventBatchingCondition",params,undefined,true); 
			

			svc.createTrigger(params,cb);
		}

		
		service.CreateUserDefinedFunction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"FunctionInput",params,undefined,true); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"FunctionInput",params,undefined,true); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"FunctionInput",params,undefined,true); 
			

			svc.createUserDefinedFunction(params,cb);
		}

		
		service.CreateWorkflow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"DefaultRunProperties",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"MaxConcurrentRuns",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DefaultRunProperties",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"MaxConcurrentRuns",params,undefined,false); 
			

			svc.createWorkflow(params,cb);
		}

		
		service.DeleteBlueprint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteBlueprint(params,cb);
		}

		
		service.DeleteClassifier=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteClassifier(params,cb);
		}

		
		service.DeleteColumnStatisticsForPartition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"PartitionValues",params,undefined,true); 
			copyArgs(n,"ColumnName",params,undefined,false); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"PartitionValues",params,undefined,true); 
			copyArgs(n,"ColumnName",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"PartitionValues",params,undefined,true); 
			copyArgs(msg,"ColumnName",params,undefined,false); 
			

			svc.deleteColumnStatisticsForPartition(params,cb);
		}

		
		service.DeleteColumnStatisticsForTable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"ColumnName",params,undefined,false); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"ColumnName",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"ColumnName",params,undefined,false); 
			

			svc.deleteColumnStatisticsForTable(params,cb);
		}

		
		service.DeleteConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConnectionName",params,undefined,false); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"ConnectionName",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"ConnectionName",params,undefined,false); 
			

			svc.deleteConnection(params,cb);
		}

		
		service.DeleteCrawler=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteCrawler(params,cb);
		}

		
		service.DeleteDatabase=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteDatabase(params,cb);
		}

		
		service.DeleteDevEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			
			copyArgs(msg,"EndpointName",params,undefined,false); 
			

			svc.deleteDevEndpoint(params,cb);
		}

		
		service.DeleteJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobName",params,undefined,false); 
			
			copyArgs(n,"JobName",params,undefined,false); 
			
			copyArgs(msg,"JobName",params,undefined,false); 
			

			svc.deleteJob(params,cb);
		}

		
		service.DeleteMLTransform=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransformId",params,undefined,false); 
			
			copyArgs(n,"TransformId",params,undefined,false); 
			
			copyArgs(msg,"TransformId",params,undefined,false); 
			

			svc.deleteMLTransform(params,cb);
		}

		
		service.DeletePartition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"PartitionValues",params,undefined,true); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"PartitionValues",params,undefined,true); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"PartitionValues",params,undefined,true); 
			

			svc.deletePartition(params,cb);
		}

		
		service.DeletePartitionIndex=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"IndexName",params,undefined,false); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"IndexName",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"IndexName",params,undefined,false); 
			

			svc.deletePartitionIndex(params,cb);
		}

		
		service.DeleteRegistry=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RegistryId",params,undefined,true); 
			
			copyArgs(n,"RegistryId",params,undefined,true); 
			
			copyArgs(msg,"RegistryId",params,undefined,true); 
			

			svc.deleteRegistry(params,cb);
		}

		
		service.DeleteResourcePolicy=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"PolicyHashCondition",params,undefined,false); 
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"PolicyHashCondition",params,undefined,false); 
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.deleteResourcePolicy(params,cb);
		}

		
		service.DeleteSchema=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SchemaId",params,undefined,true); 
			
			copyArgs(n,"SchemaId",params,undefined,true); 
			
			copyArgs(msg,"SchemaId",params,undefined,true); 
			

			svc.deleteSchema(params,cb);
		}

		
		service.DeleteSchemaVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SchemaId",params,undefined,true); 
			copyArgs(n,"Versions",params,undefined,false); 
			
			copyArgs(n,"SchemaId",params,undefined,true); 
			copyArgs(n,"Versions",params,undefined,false); 
			
			copyArgs(msg,"SchemaId",params,undefined,true); 
			copyArgs(msg,"Versions",params,undefined,false); 
			

			svc.deleteSchemaVersions(params,cb);
		}

		
		service.DeleteSecurityConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteSecurityConfiguration(params,cb);
		}

		
		service.DeleteTable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteTable(params,cb);
		}

		
		service.DeleteTableVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			

			svc.deleteTableVersion(params,cb);
		}

		
		service.DeleteTrigger=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteTrigger(params,cb);
		}

		
		service.DeleteUserDefinedFunction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"FunctionName",params,undefined,false); 
			

			svc.deleteUserDefinedFunction(params,cb);
		}

		
		service.DeleteWorkflow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteWorkflow(params,cb);
		}

		
		service.GetBlueprint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"IncludeBlueprint",params,undefined,false); 
			copyArgs(n,"IncludeParameterSpec",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"IncludeBlueprint",params,undefined,false); 
			copyArgs(msg,"IncludeParameterSpec",params,undefined,false); 
			

			svc.getBlueprint(params,cb);
		}

		
		service.GetBlueprintRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BlueprintName",params,undefined,false); 
			copyArgs(n,"RunId",params,undefined,false); 
			
			copyArgs(n,"BlueprintName",params,undefined,false); 
			copyArgs(n,"RunId",params,undefined,false); 
			
			copyArgs(msg,"BlueprintName",params,undefined,false); 
			copyArgs(msg,"RunId",params,undefined,false); 
			

			svc.getBlueprintRun(params,cb);
		}

		
		service.GetBlueprintRuns=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BlueprintName",params,undefined,false); 
			
			copyArgs(n,"BlueprintName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"BlueprintName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.getBlueprintRuns(params,cb);
		}

		
		service.GetCatalogImportStatus=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			

			svc.getCatalogImportStatus(params,cb);
		}

		
		service.GetClassifier=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getClassifier(params,cb);
		}

		
		service.GetClassifiers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getClassifiers(params,cb);
		}

		
		service.GetColumnStatisticsForPartition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"PartitionValues",params,undefined,true); 
			copyArgs(n,"ColumnNames",params,undefined,true); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"PartitionValues",params,undefined,true); 
			copyArgs(n,"ColumnNames",params,undefined,true); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"PartitionValues",params,undefined,true); 
			copyArgs(msg,"ColumnNames",params,undefined,true); 
			

			svc.getColumnStatisticsForPartition(params,cb);
		}

		
		service.GetColumnStatisticsForTable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"ColumnNames",params,undefined,true); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"ColumnNames",params,undefined,true); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"ColumnNames",params,undefined,true); 
			

			svc.getColumnStatisticsForTable(params,cb);
		}

		
		service.GetConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"HidePassword",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"HidePassword",params,undefined,false); 
			

			svc.getConnection(params,cb);
		}

		
		service.GetConnections=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"Filter",params,undefined,false); 
			copyArgs(n,"HidePassword",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"Filter",params,undefined,false); 
			copyArgs(msg,"HidePassword",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.getConnections(params,cb);
		}

		
		service.GetCrawler=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getCrawler(params,cb);
		}

		
		service.GetCrawlerMetrics=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CrawlerNameList",params,undefined,true); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"CrawlerNameList",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getCrawlerMetrics(params,cb);
		}

		
		service.GetCrawlers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getCrawlers(params,cb);
		}

		
		service.GetDataCatalogEncryptionSettings=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			

			svc.getDataCatalogEncryptionSettings(params,cb);
		}

		
		service.GetDatabase=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getDatabase(params,cb);
		}

		
		service.GetDatabases=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"ResourceShareType",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"ResourceShareType",params,undefined,false); 
			

			svc.getDatabases(params,cb);
		}

		
		service.GetDataflowGraph=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"PythonScript",params,undefined,false); 
			
			copyArgs(msg,"PythonScript",params,undefined,false); 
			

			svc.getDataflowGraph(params,cb);
		}

		
		service.GetDevEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			
			copyArgs(msg,"EndpointName",params,undefined,false); 
			

			svc.getDevEndpoint(params,cb);
		}

		
		service.GetDevEndpoints=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getDevEndpoints(params,cb);
		}

		
		service.GetJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobName",params,undefined,false); 
			
			copyArgs(n,"JobName",params,undefined,false); 
			
			copyArgs(msg,"JobName",params,undefined,false); 
			

			svc.getJob(params,cb);
		}

		
		service.GetJobBookmark=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobName",params,undefined,false); 
			
			copyArgs(n,"JobName",params,undefined,false); 
			copyArgs(n,"RunId",params,undefined,false); 
			
			copyArgs(msg,"JobName",params,undefined,false); 
			copyArgs(msg,"RunId",params,undefined,false); 
			

			svc.getJobBookmark(params,cb);
		}

		
		service.GetJobRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobName",params,undefined,false); 
			copyArgs(n,"RunId",params,undefined,false); 
			
			copyArgs(n,"JobName",params,undefined,false); 
			copyArgs(n,"RunId",params,undefined,false); 
			copyArgs(n,"PredecessorsIncluded",params,undefined,false); 
			
			copyArgs(msg,"JobName",params,undefined,false); 
			copyArgs(msg,"RunId",params,undefined,false); 
			copyArgs(msg,"PredecessorsIncluded",params,undefined,false); 
			

			svc.getJobRun(params,cb);
		}

		
		service.GetJobRuns=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobName",params,undefined,false); 
			
			copyArgs(n,"JobName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"JobName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.getJobRuns(params,cb);
		}

		
		service.GetJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.getJobs(params,cb);
		}

		
		service.GetMLTaskRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransformId",params,undefined,false); 
			copyArgs(n,"TaskRunId",params,undefined,false); 
			
			copyArgs(n,"TransformId",params,undefined,false); 
			copyArgs(n,"TaskRunId",params,undefined,false); 
			
			copyArgs(msg,"TransformId",params,undefined,false); 
			copyArgs(msg,"TaskRunId",params,undefined,false); 
			

			svc.getMLTaskRun(params,cb);
		}

		
		service.GetMLTaskRuns=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransformId",params,undefined,false); 
			
			copyArgs(n,"TransformId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"Filter",params,undefined,false); 
			copyArgs(n,"Sort",params,undefined,false); 
			
			copyArgs(msg,"TransformId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"Filter",params,undefined,false); 
			copyArgs(msg,"Sort",params,undefined,false); 
			

			svc.getMLTaskRuns(params,cb);
		}

		
		service.GetMLTransform=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransformId",params,undefined,false); 
			
			copyArgs(n,"TransformId",params,undefined,false); 
			
			copyArgs(msg,"TransformId",params,undefined,false); 
			

			svc.getMLTransform(params,cb);
		}

		
		service.GetMLTransforms=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"Filter",params,undefined,true); 
			copyArgs(n,"Sort",params,undefined,true); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"Filter",params,undefined,true); 
			copyArgs(msg,"Sort",params,undefined,true); 
			

			svc.getMLTransforms(params,cb);
		}

		
		service.GetMapping=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Source",params,undefined,true); 
			
			copyArgs(n,"Source",params,undefined,true); 
			copyArgs(n,"Sinks",params,undefined,true); 
			copyArgs(n,"Location",params,undefined,true); 
			
			copyArgs(msg,"Source",params,undefined,true); 
			copyArgs(msg,"Sinks",params,undefined,true); 
			copyArgs(msg,"Location",params,undefined,true); 
			

			svc.getMapping(params,cb);
		}

		
		service.GetPartition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"PartitionValues",params,undefined,true); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"PartitionValues",params,undefined,true); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"PartitionValues",params,undefined,true); 
			

			svc.getPartition(params,cb);
		}

		
		service.GetPartitionIndexes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getPartitionIndexes(params,cb);
		}

		
		service.GetPartitions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"Expression",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Segment",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"ExcludeColumnSchema",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"Expression",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Segment",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"ExcludeColumnSchema",params,undefined,false); 
			

			svc.getPartitions(params,cb);
		}

		
		service.GetPlan=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Mapping",params,undefined,true); 
			copyArgs(n,"Source",params,undefined,true); 
			
			copyArgs(n,"Mapping",params,undefined,true); 
			copyArgs(n,"Source",params,undefined,true); 
			copyArgs(n,"Sinks",params,undefined,true); 
			copyArgs(n,"Location",params,undefined,true); 
			copyArgs(n,"Language",params,undefined,false); 
			copyArgs(n,"AdditionalPlanOptionsMap",params,undefined,false); 
			
			copyArgs(msg,"Mapping",params,undefined,true); 
			copyArgs(msg,"Source",params,undefined,true); 
			copyArgs(msg,"Sinks",params,undefined,true); 
			copyArgs(msg,"Location",params,undefined,true); 
			copyArgs(msg,"Language",params,undefined,false); 
			copyArgs(msg,"AdditionalPlanOptionsMap",params,undefined,false); 
			

			svc.getPlan(params,cb);
		}

		
		service.GetRegistry=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RegistryId",params,undefined,true); 
			
			copyArgs(n,"RegistryId",params,undefined,true); 
			
			copyArgs(msg,"RegistryId",params,undefined,true); 
			

			svc.getRegistry(params,cb);
		}

		
		service.GetResourcePolicies=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.getResourcePolicies(params,cb);
		}

		
		service.GetResourcePolicy=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.getResourcePolicy(params,cb);
		}

		
		service.GetSchema=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SchemaId",params,undefined,true); 
			
			copyArgs(n,"SchemaId",params,undefined,true); 
			
			copyArgs(msg,"SchemaId",params,undefined,true); 
			

			svc.getSchema(params,cb);
		}

		
		service.GetSchemaByDefinition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SchemaId",params,undefined,true); 
			copyArgs(n,"SchemaDefinition",params,undefined,false); 
			
			copyArgs(n,"SchemaId",params,undefined,true); 
			copyArgs(n,"SchemaDefinition",params,undefined,false); 
			
			copyArgs(msg,"SchemaId",params,undefined,true); 
			copyArgs(msg,"SchemaDefinition",params,undefined,false); 
			

			svc.getSchemaByDefinition(params,cb);
		}

		
		service.GetSchemaVersion=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SchemaId",params,undefined,true); 
			copyArgs(n,"SchemaVersionId",params,undefined,false); 
			copyArgs(n,"SchemaVersionNumber",params,undefined,true); 
			
			copyArgs(msg,"SchemaId",params,undefined,true); 
			copyArgs(msg,"SchemaVersionId",params,undefined,false); 
			copyArgs(msg,"SchemaVersionNumber",params,undefined,true); 
			

			svc.getSchemaVersion(params,cb);
		}

		
		service.GetSchemaVersionsDiff=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SchemaId",params,undefined,true); 
			copyArgs(n,"FirstSchemaVersionNumber",params,undefined,true); 
			copyArgs(n,"SecondSchemaVersionNumber",params,undefined,true); 
			copyArgs(n,"SchemaDiffType",params,undefined,false); 
			
			copyArgs(n,"SchemaId",params,undefined,true); 
			copyArgs(n,"FirstSchemaVersionNumber",params,undefined,true); 
			copyArgs(n,"SecondSchemaVersionNumber",params,undefined,true); 
			copyArgs(n,"SchemaDiffType",params,undefined,false); 
			
			copyArgs(msg,"SchemaId",params,undefined,true); 
			copyArgs(msg,"FirstSchemaVersionNumber",params,undefined,true); 
			copyArgs(msg,"SecondSchemaVersionNumber",params,undefined,true); 
			copyArgs(msg,"SchemaDiffType",params,undefined,false); 
			

			svc.getSchemaVersionsDiff(params,cb);
		}

		
		service.GetSecurityConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getSecurityConfiguration(params,cb);
		}

		
		service.GetSecurityConfigurations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getSecurityConfigurations(params,cb);
		}

		
		service.GetTable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getTable(params,cb);
		}

		
		service.GetTableVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"VersionId",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"VersionId",params,undefined,false); 
			

			svc.getTableVersion(params,cb);
		}

		
		service.GetTableVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.getTableVersions(params,cb);
		}

		
		service.GetTables=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"Expression",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"Expression",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.getTables(params,cb);
		}

		
		service.GetTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.getTags(params,cb);
		}

		
		service.GetTrigger=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getTrigger(params,cb);
		}

		
		service.GetTriggers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"DependentJobName",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DependentJobName",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.getTriggers(params,cb);
		}

		
		service.GetUserDefinedFunction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"FunctionName",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"FunctionName",params,undefined,false); 
			

			svc.getUserDefinedFunction(params,cb);
		}

		
		service.GetUserDefinedFunctions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Pattern",params,undefined,false); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"Pattern",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"Pattern",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.getUserDefinedFunctions(params,cb);
		}

		
		service.GetWorkflow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"IncludeGraph",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"IncludeGraph",params,undefined,false); 
			

			svc.getWorkflow(params,cb);
		}

		
		service.GetWorkflowRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RunId",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RunId",params,undefined,false); 
			copyArgs(n,"IncludeGraph",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"RunId",params,undefined,false); 
			copyArgs(msg,"IncludeGraph",params,undefined,false); 
			

			svc.getWorkflowRun(params,cb);
		}

		
		service.GetWorkflowRunProperties=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RunId",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RunId",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"RunId",params,undefined,false); 
			

			svc.getWorkflowRunProperties(params,cb);
		}

		
		service.GetWorkflowRuns=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"IncludeGraph",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"IncludeGraph",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.getWorkflowRuns(params,cb);
		}

		
		service.ImportCatalogToGlue=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			

			svc.importCatalogToGlue(params,cb);
		}

		
		service.ListBlueprints=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.listBlueprints(params,cb);
		}

		
		service.ListCrawlers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.listCrawlers(params,cb);
		}

		
		service.ListDevEndpoints=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.listDevEndpoints(params,cb);
		}

		
		service.ListJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.listJobs(params,cb);
		}

		
		service.ListMLTransforms=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"Filter",params,undefined,true); 
			copyArgs(n,"Sort",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"Filter",params,undefined,true); 
			copyArgs(msg,"Sort",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.listMLTransforms(params,cb);
		}

		
		service.ListRegistries=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listRegistries(params,cb);
		}

		
		service.ListSchemaVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SchemaId",params,undefined,true); 
			
			copyArgs(n,"SchemaId",params,undefined,true); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"SchemaId",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listSchemaVersions(params,cb);
		}

		
		service.ListSchemas=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"RegistryId",params,undefined,true); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"RegistryId",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listSchemas(params,cb);
		}

		
		service.ListTriggers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"DependentJobName",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"DependentJobName",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.listTriggers(params,cb);
		}

		
		service.ListWorkflows=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listWorkflows(params,cb);
		}

		
		service.PutDataCatalogEncryptionSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DataCatalogEncryptionSettings",params,undefined,true); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DataCatalogEncryptionSettings",params,undefined,true); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DataCatalogEncryptionSettings",params,undefined,true); 
			

			svc.putDataCatalogEncryptionSettings(params,cb);
		}

		
		service.PutResourcePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PolicyInJson",params,undefined,false); 
			
			copyArgs(n,"PolicyInJson",params,undefined,false); 
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"PolicyHashCondition",params,undefined,false); 
			copyArgs(n,"PolicyExistsCondition",params,undefined,false); 
			copyArgs(n,"EnableHybrid",params,undefined,false); 
			
			copyArgs(msg,"PolicyInJson",params,undefined,false); 
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"PolicyHashCondition",params,undefined,false); 
			copyArgs(msg,"PolicyExistsCondition",params,undefined,false); 
			copyArgs(msg,"EnableHybrid",params,undefined,false); 
			

			svc.putResourcePolicy(params,cb);
		}

		
		service.PutSchemaVersionMetadata=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MetadataKeyValue",params,undefined,true); 
			
			copyArgs(n,"SchemaId",params,undefined,true); 
			copyArgs(n,"SchemaVersionNumber",params,undefined,true); 
			copyArgs(n,"SchemaVersionId",params,undefined,false); 
			copyArgs(n,"MetadataKeyValue",params,undefined,true); 
			
			copyArgs(msg,"SchemaId",params,undefined,true); 
			copyArgs(msg,"SchemaVersionNumber",params,undefined,true); 
			copyArgs(msg,"SchemaVersionId",params,undefined,false); 
			copyArgs(msg,"MetadataKeyValue",params,undefined,true); 
			

			svc.putSchemaVersionMetadata(params,cb);
		}

		
		service.PutWorkflowRunProperties=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RunId",params,undefined,false); 
			copyArgs(n,"RunProperties",params,undefined,true); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RunId",params,undefined,false); 
			copyArgs(n,"RunProperties",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"RunId",params,undefined,false); 
			copyArgs(msg,"RunProperties",params,undefined,true); 
			

			svc.putWorkflowRunProperties(params,cb);
		}

		
		service.QuerySchemaVersionMetadata=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SchemaId",params,undefined,true); 
			copyArgs(n,"SchemaVersionNumber",params,undefined,true); 
			copyArgs(n,"SchemaVersionId",params,undefined,false); 
			copyArgs(n,"MetadataList",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"SchemaId",params,undefined,true); 
			copyArgs(msg,"SchemaVersionNumber",params,undefined,true); 
			copyArgs(msg,"SchemaVersionId",params,undefined,false); 
			copyArgs(msg,"MetadataList",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.querySchemaVersionMetadata(params,cb);
		}

		
		service.RegisterSchemaVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SchemaId",params,undefined,true); 
			copyArgs(n,"SchemaDefinition",params,undefined,false); 
			
			copyArgs(n,"SchemaId",params,undefined,true); 
			copyArgs(n,"SchemaDefinition",params,undefined,false); 
			
			copyArgs(msg,"SchemaId",params,undefined,true); 
			copyArgs(msg,"SchemaDefinition",params,undefined,false); 
			

			svc.registerSchemaVersion(params,cb);
		}

		
		service.RemoveSchemaVersionMetadata=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MetadataKeyValue",params,undefined,true); 
			
			copyArgs(n,"SchemaId",params,undefined,true); 
			copyArgs(n,"SchemaVersionNumber",params,undefined,true); 
			copyArgs(n,"SchemaVersionId",params,undefined,false); 
			copyArgs(n,"MetadataKeyValue",params,undefined,true); 
			
			copyArgs(msg,"SchemaId",params,undefined,true); 
			copyArgs(msg,"SchemaVersionNumber",params,undefined,true); 
			copyArgs(msg,"SchemaVersionId",params,undefined,false); 
			copyArgs(msg,"MetadataKeyValue",params,undefined,true); 
			

			svc.removeSchemaVersionMetadata(params,cb);
		}

		
		service.ResetJobBookmark=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobName",params,undefined,false); 
			
			copyArgs(n,"JobName",params,undefined,false); 
			copyArgs(n,"RunId",params,undefined,false); 
			
			copyArgs(msg,"JobName",params,undefined,false); 
			copyArgs(msg,"RunId",params,undefined,false); 
			

			svc.resetJobBookmark(params,cb);
		}

		
		service.ResumeWorkflowRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RunId",params,undefined,false); 
			copyArgs(n,"NodeIds",params,undefined,true); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RunId",params,undefined,false); 
			copyArgs(n,"NodeIds",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"RunId",params,undefined,false); 
			copyArgs(msg,"NodeIds",params,undefined,true); 
			

			svc.resumeWorkflowRun(params,cb);
		}

		
		service.SearchTables=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(n,"SearchText",params,undefined,false); 
			copyArgs(n,"SortCriteria",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"ResourceShareType",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"SearchText",params,undefined,false); 
			copyArgs(msg,"SortCriteria",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"ResourceShareType",params,undefined,false); 
			

			svc.searchTables(params,cb);
		}

		
		service.StartBlueprintRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BlueprintName",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"BlueprintName",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(msg,"BlueprintName",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			

			svc.startBlueprintRun(params,cb);
		}

		
		service.StartCrawler=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.startCrawler(params,cb);
		}

		
		service.StartCrawlerSchedule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CrawlerName",params,undefined,false); 
			
			copyArgs(n,"CrawlerName",params,undefined,false); 
			
			copyArgs(msg,"CrawlerName",params,undefined,false); 
			

			svc.startCrawlerSchedule(params,cb);
		}

		
		service.StartExportLabelsTaskRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransformId",params,undefined,false); 
			copyArgs(n,"OutputS3Path",params,undefined,false); 
			
			copyArgs(n,"TransformId",params,undefined,false); 
			copyArgs(n,"OutputS3Path",params,undefined,false); 
			
			copyArgs(msg,"TransformId",params,undefined,false); 
			copyArgs(msg,"OutputS3Path",params,undefined,false); 
			

			svc.startExportLabelsTaskRun(params,cb);
		}

		
		service.StartImportLabelsTaskRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransformId",params,undefined,false); 
			copyArgs(n,"InputS3Path",params,undefined,false); 
			
			copyArgs(n,"TransformId",params,undefined,false); 
			copyArgs(n,"InputS3Path",params,undefined,false); 
			copyArgs(n,"ReplaceAllLabels",params,undefined,false); 
			
			copyArgs(msg,"TransformId",params,undefined,false); 
			copyArgs(msg,"InputS3Path",params,undefined,false); 
			copyArgs(msg,"ReplaceAllLabels",params,undefined,false); 
			

			svc.startImportLabelsTaskRun(params,cb);
		}

		
		service.StartJobRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobName",params,undefined,false); 
			
			copyArgs(n,"JobName",params,undefined,false); 
			copyArgs(n,"JobRunId",params,undefined,false); 
			copyArgs(n,"Arguments",params,undefined,true); 
			copyArgs(n,"AllocatedCapacity",params,undefined,false); 
			copyArgs(n,"Timeout",params,undefined,false); 
			copyArgs(n,"MaxCapacity",params,undefined,false); 
			copyArgs(n,"SecurityConfiguration",params,undefined,false); 
			copyArgs(n,"NotificationProperty",params,undefined,true); 
			copyArgs(n,"WorkerType",params,undefined,false); 
			copyArgs(n,"NumberOfWorkers",params,undefined,false); 
			
			copyArgs(msg,"JobName",params,undefined,false); 
			copyArgs(msg,"JobRunId",params,undefined,false); 
			copyArgs(msg,"Arguments",params,undefined,true); 
			copyArgs(msg,"AllocatedCapacity",params,undefined,false); 
			copyArgs(msg,"Timeout",params,undefined,false); 
			copyArgs(msg,"MaxCapacity",params,undefined,false); 
			copyArgs(msg,"SecurityConfiguration",params,undefined,false); 
			copyArgs(msg,"NotificationProperty",params,undefined,true); 
			copyArgs(msg,"WorkerType",params,undefined,false); 
			copyArgs(msg,"NumberOfWorkers",params,undefined,false); 
			

			svc.startJobRun(params,cb);
		}

		
		service.StartMLEvaluationTaskRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransformId",params,undefined,false); 
			
			copyArgs(n,"TransformId",params,undefined,false); 
			
			copyArgs(msg,"TransformId",params,undefined,false); 
			

			svc.startMLEvaluationTaskRun(params,cb);
		}

		
		service.StartMLLabelingSetGenerationTaskRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransformId",params,undefined,false); 
			copyArgs(n,"OutputS3Path",params,undefined,false); 
			
			copyArgs(n,"TransformId",params,undefined,false); 
			copyArgs(n,"OutputS3Path",params,undefined,false); 
			
			copyArgs(msg,"TransformId",params,undefined,false); 
			copyArgs(msg,"OutputS3Path",params,undefined,false); 
			

			svc.startMLLabelingSetGenerationTaskRun(params,cb);
		}

		
		service.StartTrigger=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.startTrigger(params,cb);
		}

		
		service.StartWorkflowRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.startWorkflowRun(params,cb);
		}

		
		service.StopCrawler=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.stopCrawler(params,cb);
		}

		
		service.StopCrawlerSchedule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CrawlerName",params,undefined,false); 
			
			copyArgs(n,"CrawlerName",params,undefined,false); 
			
			copyArgs(msg,"CrawlerName",params,undefined,false); 
			

			svc.stopCrawlerSchedule(params,cb);
		}

		
		service.StopTrigger=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.stopTrigger(params,cb);
		}

		
		service.StopWorkflowRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RunId",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RunId",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"RunId",params,undefined,false); 
			

			svc.stopWorkflowRun(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagsToAdd",params,undefined,true); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagsToAdd",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagsToAdd",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagsToRemove",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagsToRemove",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagsToRemove",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateBlueprint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"BlueprintLocation",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"BlueprintLocation",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"BlueprintLocation",params,undefined,false); 
			

			svc.updateBlueprint(params,cb);
		}

		
		service.UpdateClassifier=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"GrokClassifier",params,undefined,false); 
			copyArgs(n,"XMLClassifier",params,undefined,false); 
			copyArgs(n,"JsonClassifier",params,undefined,false); 
			copyArgs(n,"CsvClassifier",params,undefined,false); 
			
			copyArgs(msg,"GrokClassifier",params,undefined,false); 
			copyArgs(msg,"XMLClassifier",params,undefined,false); 
			copyArgs(msg,"JsonClassifier",params,undefined,false); 
			copyArgs(msg,"CsvClassifier",params,undefined,false); 
			

			svc.updateClassifier(params,cb);
		}

		
		service.UpdateColumnStatisticsForPartition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"PartitionValues",params,undefined,true); 
			copyArgs(n,"ColumnStatisticsList",params,undefined,true); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"PartitionValues",params,undefined,true); 
			copyArgs(n,"ColumnStatisticsList",params,undefined,true); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"PartitionValues",params,undefined,true); 
			copyArgs(msg,"ColumnStatisticsList",params,undefined,true); 
			

			svc.updateColumnStatisticsForPartition(params,cb);
		}

		
		service.UpdateColumnStatisticsForTable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"ColumnStatisticsList",params,undefined,true); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"ColumnStatisticsList",params,undefined,true); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"ColumnStatisticsList",params,undefined,true); 
			

			svc.updateColumnStatisticsForTable(params,cb);
		}

		
		service.UpdateConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ConnectionInput",params,undefined,true); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ConnectionInput",params,undefined,true); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ConnectionInput",params,undefined,true); 
			

			svc.updateConnection(params,cb);
		}

		
		service.UpdateCrawler=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Role",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Targets",params,undefined,true); 
			copyArgs(n,"Schedule",params,undefined,false); 
			copyArgs(n,"Classifiers",params,undefined,true); 
			copyArgs(n,"TablePrefix",params,undefined,false); 
			copyArgs(n,"SchemaChangePolicy",params,undefined,true); 
			copyArgs(n,"RecrawlPolicy",params,undefined,true); 
			copyArgs(n,"LineageConfiguration",params,undefined,true); 
			copyArgs(n,"Configuration",params,undefined,false); 
			copyArgs(n,"CrawlerSecurityConfiguration",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Role",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Targets",params,undefined,true); 
			copyArgs(msg,"Schedule",params,undefined,false); 
			copyArgs(msg,"Classifiers",params,undefined,true); 
			copyArgs(msg,"TablePrefix",params,undefined,false); 
			copyArgs(msg,"SchemaChangePolicy",params,undefined,true); 
			copyArgs(msg,"RecrawlPolicy",params,undefined,true); 
			copyArgs(msg,"LineageConfiguration",params,undefined,true); 
			copyArgs(msg,"Configuration",params,undefined,false); 
			copyArgs(msg,"CrawlerSecurityConfiguration",params,undefined,false); 
			

			svc.updateCrawler(params,cb);
		}

		
		service.UpdateCrawlerSchedule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CrawlerName",params,undefined,false); 
			
			copyArgs(n,"CrawlerName",params,undefined,false); 
			copyArgs(n,"Schedule",params,undefined,false); 
			
			copyArgs(msg,"CrawlerName",params,undefined,false); 
			copyArgs(msg,"Schedule",params,undefined,false); 
			

			svc.updateCrawlerSchedule(params,cb);
		}

		
		service.UpdateDatabase=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"DatabaseInput",params,undefined,true); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"DatabaseInput",params,undefined,true); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"DatabaseInput",params,undefined,true); 
			

			svc.updateDatabase(params,cb);
		}

		
		service.UpdateDevEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			
			copyArgs(n,"EndpointName",params,undefined,false); 
			copyArgs(n,"PublicKey",params,undefined,false); 
			copyArgs(n,"AddPublicKeys",params,undefined,true); 
			copyArgs(n,"DeletePublicKeys",params,undefined,true); 
			copyArgs(n,"CustomLibraries",params,undefined,false); 
			copyArgs(n,"UpdateEtlLibraries",params,undefined,false); 
			copyArgs(n,"DeleteArguments",params,undefined,true); 
			copyArgs(n,"AddArguments",params,undefined,true); 
			
			copyArgs(msg,"EndpointName",params,undefined,false); 
			copyArgs(msg,"PublicKey",params,undefined,false); 
			copyArgs(msg,"AddPublicKeys",params,undefined,true); 
			copyArgs(msg,"DeletePublicKeys",params,undefined,true); 
			copyArgs(msg,"CustomLibraries",params,undefined,false); 
			copyArgs(msg,"UpdateEtlLibraries",params,undefined,false); 
			copyArgs(msg,"DeleteArguments",params,undefined,true); 
			copyArgs(msg,"AddArguments",params,undefined,true); 
			

			svc.updateDevEndpoint(params,cb);
		}

		
		service.UpdateJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"JobName",params,undefined,false); 
			copyArgs(n,"JobUpdate",params,undefined,false); 
			
			copyArgs(n,"JobName",params,undefined,false); 
			copyArgs(n,"JobUpdate",params,undefined,false); 
			
			copyArgs(msg,"JobName",params,undefined,false); 
			copyArgs(msg,"JobUpdate",params,undefined,false); 
			

			svc.updateJob(params,cb);
		}

		
		service.UpdateMLTransform=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransformId",params,undefined,false); 
			
			copyArgs(n,"TransformId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			copyArgs(n,"Role",params,undefined,false); 
			copyArgs(n,"GlueVersion",params,undefined,false); 
			copyArgs(n,"MaxCapacity",params,undefined,false); 
			copyArgs(n,"WorkerType",params,undefined,false); 
			copyArgs(n,"NumberOfWorkers",params,undefined,false); 
			copyArgs(n,"Timeout",params,undefined,false); 
			copyArgs(n,"MaxRetries",params,undefined,false); 
			
			copyArgs(msg,"TransformId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			copyArgs(msg,"Role",params,undefined,false); 
			copyArgs(msg,"GlueVersion",params,undefined,false); 
			copyArgs(msg,"MaxCapacity",params,undefined,false); 
			copyArgs(msg,"WorkerType",params,undefined,false); 
			copyArgs(msg,"NumberOfWorkers",params,undefined,false); 
			copyArgs(msg,"Timeout",params,undefined,false); 
			copyArgs(msg,"MaxRetries",params,undefined,false); 
			

			svc.updateMLTransform(params,cb);
		}

		
		service.UpdatePartition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"PartitionValueList",params,undefined,true); 
			copyArgs(n,"PartitionInput",params,undefined,true); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"PartitionValueList",params,undefined,true); 
			copyArgs(n,"PartitionInput",params,undefined,true); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"PartitionValueList",params,undefined,true); 
			copyArgs(msg,"PartitionInput",params,undefined,true); 
			

			svc.updatePartition(params,cb);
		}

		
		service.UpdateRegistry=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RegistryId",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(n,"RegistryId",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(msg,"RegistryId",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			

			svc.updateRegistry(params,cb);
		}

		
		service.UpdateSchema=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SchemaId",params,undefined,true); 
			
			copyArgs(n,"SchemaId",params,undefined,true); 
			copyArgs(n,"SchemaVersionNumber",params,undefined,true); 
			copyArgs(n,"Compatibility",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(msg,"SchemaId",params,undefined,true); 
			copyArgs(msg,"SchemaVersionNumber",params,undefined,true); 
			copyArgs(msg,"Compatibility",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			

			svc.updateSchema(params,cb);
		}

		
		service.UpdateTable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableInput",params,undefined,true); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"TableInput",params,undefined,true); 
			copyArgs(n,"SkipArchive",params,undefined,false); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"TableInput",params,undefined,true); 
			copyArgs(msg,"SkipArchive",params,undefined,false); 
			

			svc.updateTable(params,cb);
		}

		
		service.UpdateTrigger=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"TriggerUpdate",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"TriggerUpdate",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"TriggerUpdate",params,undefined,false); 
			

			svc.updateTrigger(params,cb);
		}

		
		service.UpdateUserDefinedFunction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"FunctionInput",params,undefined,true); 
			
			copyArgs(n,"CatalogId",params,undefined,false); 
			copyArgs(n,"DatabaseName",params,undefined,false); 
			copyArgs(n,"FunctionName",params,undefined,false); 
			copyArgs(n,"FunctionInput",params,undefined,true); 
			
			copyArgs(msg,"CatalogId",params,undefined,false); 
			copyArgs(msg,"DatabaseName",params,undefined,false); 
			copyArgs(msg,"FunctionName",params,undefined,false); 
			copyArgs(msg,"FunctionInput",params,undefined,true); 
			

			svc.updateUserDefinedFunction(params,cb);
		}

		
		service.UpdateWorkflow=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"DefaultRunProperties",params,undefined,true); 
			copyArgs(n,"MaxConcurrentRuns",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DefaultRunProperties",params,undefined,true); 
			copyArgs(msg,"MaxConcurrentRuns",params,undefined,false); 
			

			svc.updateWorkflow(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Glue", AmazonAPINode);

};
