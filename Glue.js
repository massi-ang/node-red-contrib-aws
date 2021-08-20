
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

		var awsService = new AWS.Glue( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Glue(msg.AWSConfig) : awsService;

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

		
		service.BatchCreatePartition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"TableName",params,undefined,false); 
			copyArg(n,"PartitionInputList",params,undefined,false); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"PartitionInputList",params,undefined,false); 
			

			svc.batchCreatePartition(params,cb);
		}

		
		service.BatchDeleteConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConnectionNameList",params,undefined,false); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"ConnectionNameList",params,undefined,false); 
			

			svc.batchDeleteConnection(params,cb);
		}

		
		service.BatchDeletePartition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"TableName",params,undefined,false); 
			copyArg(n,"PartitionsToDelete",params,undefined,false); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"PartitionsToDelete",params,undefined,false); 
			

			svc.batchDeletePartition(params,cb);
		}

		
		service.BatchDeleteTable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"TablesToDelete",params,undefined,false); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"TablesToDelete",params,undefined,false); 
			

			svc.batchDeleteTable(params,cb);
		}

		
		service.BatchDeleteTableVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"TableName",params,undefined,false); 
			copyArg(n,"VersionIds",params,undefined,false); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"VersionIds",params,undefined,false); 
			

			svc.batchDeleteTableVersion(params,cb);
		}

		
		service.BatchGetCrawlers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CrawlerNames",params,undefined,true); 
			
			copyArg(msg,"CrawlerNames",params,undefined,true); 
			

			svc.batchGetCrawlers(params,cb);
		}

		
		service.BatchGetDevEndpoints=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DevEndpointNames",params,undefined,true); 
			
			copyArg(msg,"DevEndpointNames",params,undefined,true); 
			

			svc.batchGetDevEndpoints(params,cb);
		}

		
		service.BatchGetJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobNames",params,undefined,true); 
			
			copyArg(msg,"JobNames",params,undefined,true); 
			

			svc.batchGetJobs(params,cb);
		}

		
		service.BatchGetPartition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"TableName",params,undefined,false); 
			copyArg(n,"PartitionsToGet",params,undefined,true); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"PartitionsToGet",params,undefined,true); 
			

			svc.batchGetPartition(params,cb);
		}

		
		service.BatchGetTriggers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TriggerNames",params,undefined,true); 
			
			copyArg(msg,"TriggerNames",params,undefined,true); 
			

			svc.batchGetTriggers(params,cb);
		}

		
		service.BatchGetWorkflows=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Names",params,undefined,true); 
			
			copyArg(msg,"Names",params,undefined,true); 
			copyArg(msg,"IncludeGraph",params,undefined,false); 
			

			svc.batchGetWorkflows(params,cb);
		}

		
		service.BatchStopJobRun=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobName",params,undefined,false); 
			copyArg(n,"JobRunIds",params,undefined,false); 
			
			copyArg(msg,"JobName",params,undefined,false); 
			copyArg(msg,"JobRunIds",params,undefined,false); 
			

			svc.batchStopJobRun(params,cb);
		}

		
		service.BatchUpdatePartition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"TableName",params,undefined,false); 
			copyArg(n,"Entries",params,undefined,false); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"Entries",params,undefined,false); 
			

			svc.batchUpdatePartition(params,cb);
		}

		
		service.CancelMLTaskRun=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TransformId",params,undefined,false); 
			copyArg(n,"TaskRunId",params,undefined,false); 
			
			copyArg(msg,"TransformId",params,undefined,false); 
			copyArg(msg,"TaskRunId",params,undefined,false); 
			

			svc.cancelMLTaskRun(params,cb);
		}

		
		service.CheckSchemaVersionValidity=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DataFormat",params,undefined,false); 
			copyArg(n,"SchemaDefinition",params,undefined,false); 
			
			copyArg(msg,"DataFormat",params,undefined,false); 
			copyArg(msg,"SchemaDefinition",params,undefined,false); 
			

			svc.checkSchemaVersionValidity(params,cb);
		}

		
		service.CreateClassifier=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"GrokClassifier",params,undefined,false); 
			copyArg(msg,"XMLClassifier",params,undefined,false); 
			copyArg(msg,"JsonClassifier",params,undefined,false); 
			copyArg(msg,"CsvClassifier",params,undefined,false); 
			

			svc.createClassifier(params,cb);
		}

		
		service.CreateConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConnectionInput",params,undefined,true); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"ConnectionInput",params,undefined,true); 
			

			svc.createConnection(params,cb);
		}

		
		service.CreateCrawler=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Role",params,undefined,false); 
			copyArg(n,"Targets",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Role",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Targets",params,undefined,true); 
			copyArg(msg,"Schedule",params,undefined,false); 
			copyArg(msg,"Classifiers",params,undefined,true); 
			copyArg(msg,"TablePrefix",params,undefined,false); 
			copyArg(msg,"SchemaChangePolicy",params,undefined,true); 
			copyArg(msg,"RecrawlPolicy",params,undefined,true); 
			copyArg(msg,"LineageConfiguration",params,undefined,true); 
			copyArg(msg,"Configuration",params,undefined,false); 
			copyArg(msg,"CrawlerSecurityConfiguration",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createCrawler(params,cb);
		}

		
		service.CreateDatabase=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseInput",params,undefined,true); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseInput",params,undefined,true); 
			

			svc.createDatabase(params,cb);
		}

		
		service.CreateDevEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndpointName",params,undefined,false); 
			copyArg(n,"RoleArn",params,undefined,false); 
			
			copyArg(msg,"EndpointName",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"SecurityGroupIds",params,undefined,true); 
			copyArg(msg,"SubnetId",params,undefined,false); 
			copyArg(msg,"PublicKey",params,undefined,false); 
			copyArg(msg,"PublicKeys",params,undefined,true); 
			copyArg(msg,"NumberOfNodes",params,undefined,false); 
			copyArg(msg,"WorkerType",params,undefined,false); 
			copyArg(msg,"GlueVersion",params,undefined,false); 
			copyArg(msg,"NumberOfWorkers",params,undefined,false); 
			copyArg(msg,"ExtraPythonLibsS3Path",params,undefined,false); 
			copyArg(msg,"ExtraJarsS3Path",params,undefined,false); 
			copyArg(msg,"SecurityConfiguration",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"Arguments",params,undefined,true); 
			

			svc.createDevEndpoint(params,cb);
		}

		
		service.CreateJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Role",params,undefined,false); 
			copyArg(n,"Command",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"LogUri",params,undefined,false); 
			copyArg(msg,"Role",params,undefined,false); 
			copyArg(msg,"ExecutionProperty",params,undefined,true); 
			copyArg(msg,"Command",params,undefined,true); 
			copyArg(msg,"DefaultArguments",params,undefined,true); 
			copyArg(msg,"NonOverridableArguments",params,undefined,true); 
			copyArg(msg,"Connections",params,undefined,true); 
			copyArg(msg,"MaxRetries",params,undefined,false); 
			copyArg(msg,"AllocatedCapacity",params,undefined,false); 
			copyArg(msg,"Timeout",params,undefined,false); 
			copyArg(msg,"MaxCapacity",params,undefined,false); 
			copyArg(msg,"SecurityConfiguration",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"NotificationProperty",params,undefined,true); 
			copyArg(msg,"GlueVersion",params,undefined,false); 
			copyArg(msg,"NumberOfWorkers",params,undefined,false); 
			copyArg(msg,"WorkerType",params,undefined,false); 
			

			svc.createJob(params,cb);
		}

		
		service.CreateMLTransform=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"InputRecordTables",params,undefined,true); 
			copyArg(n,"Parameters",params,undefined,true); 
			copyArg(n,"Role",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"InputRecordTables",params,undefined,true); 
			copyArg(msg,"Parameters",params,undefined,true); 
			copyArg(msg,"Role",params,undefined,false); 
			copyArg(msg,"GlueVersion",params,undefined,false); 
			copyArg(msg,"MaxCapacity",params,undefined,false); 
			copyArg(msg,"WorkerType",params,undefined,false); 
			copyArg(msg,"NumberOfWorkers",params,undefined,false); 
			copyArg(msg,"Timeout",params,undefined,false); 
			copyArg(msg,"MaxRetries",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"TransformEncryption",params,undefined,true); 
			

			svc.createMLTransform(params,cb);
		}

		
		service.CreatePartition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"TableName",params,undefined,false); 
			copyArg(n,"PartitionInput",params,undefined,true); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"PartitionInput",params,undefined,true); 
			

			svc.createPartition(params,cb);
		}

		
		service.CreatePartitionIndex=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"TableName",params,undefined,false); 
			copyArg(n,"PartitionIndex",params,undefined,true); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"PartitionIndex",params,undefined,true); 
			

			svc.createPartitionIndex(params,cb);
		}

		
		service.CreateRegistry=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RegistryName",params,undefined,false); 
			
			copyArg(msg,"RegistryName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createRegistry(params,cb);
		}

		
		service.CreateSchema=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SchemaName",params,undefined,false); 
			copyArg(n,"DataFormat",params,undefined,false); 
			
			copyArg(msg,"RegistryId",params,undefined,true); 
			copyArg(msg,"SchemaName",params,undefined,false); 
			copyArg(msg,"DataFormat",params,undefined,false); 
			copyArg(msg,"Compatibility",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"SchemaDefinition",params,undefined,false); 
			

			svc.createSchema(params,cb);
		}

		
		service.CreateScript=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DagNodes",params,undefined,true); 
			copyArg(msg,"DagEdges",params,undefined,true); 
			copyArg(msg,"Language",params,undefined,false); 
			

			svc.createScript(params,cb);
		}

		
		service.CreateSecurityConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"EncryptionConfiguration",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"EncryptionConfiguration",params,undefined,true); 
			

			svc.createSecurityConfiguration(params,cb);
		}

		
		service.CreateTable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"TableInput",params,undefined,true); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"TableInput",params,undefined,true); 
			copyArg(msg,"PartitionIndexes",params,undefined,false); 
			

			svc.createTable(params,cb);
		}

		
		service.CreateTrigger=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Type",params,undefined,false); 
			copyArg(n,"Actions",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"WorkflowName",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"Schedule",params,undefined,false); 
			copyArg(msg,"Predicate",params,undefined,true); 
			copyArg(msg,"Actions",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"StartOnCreation",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"EventBatchingCondition",params,undefined,true); 
			

			svc.createTrigger(params,cb);
		}

		
		service.CreateUserDefinedFunction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"FunctionInput",params,undefined,true); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"FunctionInput",params,undefined,true); 
			

			svc.createUserDefinedFunction(params,cb);
		}

		
		service.CreateWorkflow=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DefaultRunProperties",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"MaxConcurrentRuns",params,undefined,false); 
			

			svc.createWorkflow(params,cb);
		}

		
		service.DeleteClassifier=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteClassifier(params,cb);
		}

		
		service.DeleteColumnStatisticsForPartition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"TableName",params,undefined,false); 
			copyArg(n,"PartitionValues",params,undefined,true); 
			copyArg(n,"ColumnName",params,undefined,false); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"PartitionValues",params,undefined,true); 
			copyArg(msg,"ColumnName",params,undefined,false); 
			

			svc.deleteColumnStatisticsForPartition(params,cb);
		}

		
		service.DeleteColumnStatisticsForTable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"TableName",params,undefined,false); 
			copyArg(n,"ColumnName",params,undefined,false); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"ColumnName",params,undefined,false); 
			

			svc.deleteColumnStatisticsForTable(params,cb);
		}

		
		service.DeleteConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConnectionName",params,undefined,false); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"ConnectionName",params,undefined,false); 
			

			svc.deleteConnection(params,cb);
		}

		
		service.DeleteCrawler=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteCrawler(params,cb);
		}

		
		service.DeleteDatabase=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteDatabase(params,cb);
		}

		
		service.DeleteDevEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndpointName",params,undefined,false); 
			
			copyArg(msg,"EndpointName",params,undefined,false); 
			

			svc.deleteDevEndpoint(params,cb);
		}

		
		service.DeleteJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobName",params,undefined,false); 
			
			copyArg(msg,"JobName",params,undefined,false); 
			

			svc.deleteJob(params,cb);
		}

		
		service.DeleteMLTransform=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TransformId",params,undefined,false); 
			
			copyArg(msg,"TransformId",params,undefined,false); 
			

			svc.deleteMLTransform(params,cb);
		}

		
		service.DeletePartition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"TableName",params,undefined,false); 
			copyArg(n,"PartitionValues",params,undefined,true); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"PartitionValues",params,undefined,true); 
			

			svc.deletePartition(params,cb);
		}

		
		service.DeletePartitionIndex=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"TableName",params,undefined,false); 
			copyArg(n,"IndexName",params,undefined,false); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"IndexName",params,undefined,false); 
			

			svc.deletePartitionIndex(params,cb);
		}

		
		service.DeleteRegistry=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RegistryId",params,undefined,true); 
			
			copyArg(msg,"RegistryId",params,undefined,true); 
			

			svc.deleteRegistry(params,cb);
		}

		
		service.DeleteResourcePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"PolicyHashCondition",params,undefined,false); 
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.deleteResourcePolicy(params,cb);
		}

		
		service.DeleteSchema=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SchemaId",params,undefined,true); 
			
			copyArg(msg,"SchemaId",params,undefined,true); 
			

			svc.deleteSchema(params,cb);
		}

		
		service.DeleteSchemaVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SchemaId",params,undefined,true); 
			copyArg(n,"Versions",params,undefined,false); 
			
			copyArg(msg,"SchemaId",params,undefined,true); 
			copyArg(msg,"Versions",params,undefined,false); 
			

			svc.deleteSchemaVersions(params,cb);
		}

		
		service.DeleteSecurityConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteSecurityConfiguration(params,cb);
		}

		
		service.DeleteTable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteTable(params,cb);
		}

		
		service.DeleteTableVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"TableName",params,undefined,false); 
			copyArg(n,"VersionId",params,undefined,false); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			

			svc.deleteTableVersion(params,cb);
		}

		
		service.DeleteTrigger=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteTrigger(params,cb);
		}

		
		service.DeleteUserDefinedFunction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"FunctionName",params,undefined,false); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"FunctionName",params,undefined,false); 
			

			svc.deleteUserDefinedFunction(params,cb);
		}

		
		service.DeleteWorkflow=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteWorkflow(params,cb);
		}

		
		service.GetCatalogImportStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			

			svc.getCatalogImportStatus(params,cb);
		}

		
		service.GetClassifier=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.getClassifier(params,cb);
		}

		
		service.GetClassifiers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getClassifiers(params,cb);
		}

		
		service.GetColumnStatisticsForPartition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"TableName",params,undefined,false); 
			copyArg(n,"PartitionValues",params,undefined,true); 
			copyArg(n,"ColumnNames",params,undefined,true); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"PartitionValues",params,undefined,true); 
			copyArg(msg,"ColumnNames",params,undefined,true); 
			

			svc.getColumnStatisticsForPartition(params,cb);
		}

		
		service.GetColumnStatisticsForTable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"TableName",params,undefined,false); 
			copyArg(n,"ColumnNames",params,undefined,true); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"ColumnNames",params,undefined,true); 
			

			svc.getColumnStatisticsForTable(params,cb);
		}

		
		service.GetConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"HidePassword",params,undefined,false); 
			

			svc.getConnection(params,cb);
		}

		
		service.GetConnections=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"Filter",params,undefined,false); 
			copyArg(msg,"HidePassword",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.getConnections(params,cb);
		}

		
		service.GetCrawler=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.getCrawler(params,cb);
		}

		
		service.GetCrawlerMetrics=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CrawlerNameList",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getCrawlerMetrics(params,cb);
		}

		
		service.GetCrawlers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getCrawlers(params,cb);
		}

		
		service.GetDataCatalogEncryptionSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			

			svc.getDataCatalogEncryptionSettings(params,cb);
		}

		
		service.GetDatabase=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.getDatabase(params,cb);
		}

		
		service.GetDatabases=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"ResourceShareType",params,undefined,false); 
			

			svc.getDatabases(params,cb);
		}

		
		service.GetDataflowGraph=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"PythonScript",params,undefined,false); 
			

			svc.getDataflowGraph(params,cb);
		}

		
		service.GetDevEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndpointName",params,undefined,false); 
			
			copyArg(msg,"EndpointName",params,undefined,false); 
			

			svc.getDevEndpoint(params,cb);
		}

		
		service.GetDevEndpoints=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getDevEndpoints(params,cb);
		}

		
		service.GetJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobName",params,undefined,false); 
			
			copyArg(msg,"JobName",params,undefined,false); 
			

			svc.getJob(params,cb);
		}

		
		service.GetJobBookmark=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobName",params,undefined,false); 
			
			copyArg(msg,"JobName",params,undefined,false); 
			copyArg(msg,"RunId",params,undefined,false); 
			

			svc.getJobBookmark(params,cb);
		}

		
		service.GetJobRun=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobName",params,undefined,false); 
			copyArg(n,"RunId",params,undefined,false); 
			
			copyArg(msg,"JobName",params,undefined,false); 
			copyArg(msg,"RunId",params,undefined,false); 
			copyArg(msg,"PredecessorsIncluded",params,undefined,false); 
			

			svc.getJobRun(params,cb);
		}

		
		service.GetJobRuns=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobName",params,undefined,false); 
			
			copyArg(msg,"JobName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.getJobRuns(params,cb);
		}

		
		service.GetJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.getJobs(params,cb);
		}

		
		service.GetMLTaskRun=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TransformId",params,undefined,false); 
			copyArg(n,"TaskRunId",params,undefined,false); 
			
			copyArg(msg,"TransformId",params,undefined,false); 
			copyArg(msg,"TaskRunId",params,undefined,false); 
			

			svc.getMLTaskRun(params,cb);
		}

		
		service.GetMLTaskRuns=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TransformId",params,undefined,false); 
			
			copyArg(msg,"TransformId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"Filter",params,undefined,false); 
			copyArg(msg,"Sort",params,undefined,false); 
			

			svc.getMLTaskRuns(params,cb);
		}

		
		service.GetMLTransform=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TransformId",params,undefined,false); 
			
			copyArg(msg,"TransformId",params,undefined,false); 
			

			svc.getMLTransform(params,cb);
		}

		
		service.GetMLTransforms=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"Filter",params,undefined,true); 
			copyArg(msg,"Sort",params,undefined,true); 
			

			svc.getMLTransforms(params,cb);
		}

		
		service.GetMapping=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Source",params,undefined,true); 
			
			copyArg(msg,"Source",params,undefined,true); 
			copyArg(msg,"Sinks",params,undefined,true); 
			copyArg(msg,"Location",params,undefined,true); 
			

			svc.getMapping(params,cb);
		}

		
		service.GetPartition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"TableName",params,undefined,false); 
			copyArg(n,"PartitionValues",params,undefined,true); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"PartitionValues",params,undefined,true); 
			

			svc.getPartition(params,cb);
		}

		
		service.GetPartitionIndexes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"TableName",params,undefined,false); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getPartitionIndexes(params,cb);
		}

		
		service.GetPartitions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"TableName",params,undefined,false); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"Expression",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Segment",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"ExcludeColumnSchema",params,undefined,false); 
			

			svc.getPartitions(params,cb);
		}

		
		service.GetPlan=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Mapping",params,undefined,true); 
			copyArg(n,"Source",params,undefined,true); 
			
			copyArg(msg,"Mapping",params,undefined,true); 
			copyArg(msg,"Source",params,undefined,true); 
			copyArg(msg,"Sinks",params,undefined,true); 
			copyArg(msg,"Location",params,undefined,true); 
			copyArg(msg,"Language",params,undefined,false); 
			copyArg(msg,"AdditionalPlanOptionsMap",params,undefined,false); 
			

			svc.getPlan(params,cb);
		}

		
		service.GetRegistry=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RegistryId",params,undefined,true); 
			
			copyArg(msg,"RegistryId",params,undefined,true); 
			

			svc.getRegistry(params,cb);
		}

		
		service.GetResourcePolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.getResourcePolicies(params,cb);
		}

		
		service.GetResourcePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.getResourcePolicy(params,cb);
		}

		
		service.GetSchema=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SchemaId",params,undefined,true); 
			
			copyArg(msg,"SchemaId",params,undefined,true); 
			

			svc.getSchema(params,cb);
		}

		
		service.GetSchemaByDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SchemaId",params,undefined,true); 
			copyArg(n,"SchemaDefinition",params,undefined,false); 
			
			copyArg(msg,"SchemaId",params,undefined,true); 
			copyArg(msg,"SchemaDefinition",params,undefined,false); 
			

			svc.getSchemaByDefinition(params,cb);
		}

		
		service.GetSchemaVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SchemaId",params,undefined,true); 
			copyArg(msg,"SchemaVersionId",params,undefined,false); 
			copyArg(msg,"SchemaVersionNumber",params,undefined,true); 
			

			svc.getSchemaVersion(params,cb);
		}

		
		service.GetSchemaVersionsDiff=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SchemaId",params,undefined,true); 
			copyArg(n,"FirstSchemaVersionNumber",params,undefined,true); 
			copyArg(n,"SecondSchemaVersionNumber",params,undefined,true); 
			copyArg(n,"SchemaDiffType",params,undefined,false); 
			
			copyArg(msg,"SchemaId",params,undefined,true); 
			copyArg(msg,"FirstSchemaVersionNumber",params,undefined,true); 
			copyArg(msg,"SecondSchemaVersionNumber",params,undefined,true); 
			copyArg(msg,"SchemaDiffType",params,undefined,false); 
			

			svc.getSchemaVersionsDiff(params,cb);
		}

		
		service.GetSecurityConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.getSecurityConfiguration(params,cb);
		}

		
		service.GetSecurityConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getSecurityConfigurations(params,cb);
		}

		
		service.GetTable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.getTable(params,cb);
		}

		
		service.GetTableVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"TableName",params,undefined,false); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			

			svc.getTableVersion(params,cb);
		}

		
		service.GetTableVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"TableName",params,undefined,false); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.getTableVersions(params,cb);
		}

		
		service.GetTables=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"Expression",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.getTables(params,cb);
		}

		
		service.GetTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.getTags(params,cb);
		}

		
		service.GetTrigger=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.getTrigger(params,cb);
		}

		
		service.GetTriggers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"DependentJobName",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.getTriggers(params,cb);
		}

		
		service.GetUserDefinedFunction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"FunctionName",params,undefined,false); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"FunctionName",params,undefined,false); 
			

			svc.getUserDefinedFunction(params,cb);
		}

		
		service.GetUserDefinedFunctions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Pattern",params,undefined,false); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"Pattern",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.getUserDefinedFunctions(params,cb);
		}

		
		service.GetWorkflow=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"IncludeGraph",params,undefined,false); 
			

			svc.getWorkflow(params,cb);
		}

		
		service.GetWorkflowRun=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"RunId",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"RunId",params,undefined,false); 
			copyArg(msg,"IncludeGraph",params,undefined,false); 
			

			svc.getWorkflowRun(params,cb);
		}

		
		service.GetWorkflowRunProperties=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"RunId",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"RunId",params,undefined,false); 
			

			svc.getWorkflowRunProperties(params,cb);
		}

		
		service.GetWorkflowRuns=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"IncludeGraph",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.getWorkflowRuns(params,cb);
		}

		
		service.ImportCatalogToGlue=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			

			svc.importCatalogToGlue(params,cb);
		}

		
		service.ListCrawlers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.listCrawlers(params,cb);
		}

		
		service.ListDevEndpoints=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.listDevEndpoints(params,cb);
		}

		
		service.ListJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.listJobs(params,cb);
		}

		
		service.ListMLTransforms=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"Filter",params,undefined,true); 
			copyArg(msg,"Sort",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.listMLTransforms(params,cb);
		}

		
		service.ListRegistries=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listRegistries(params,cb);
		}

		
		service.ListSchemaVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SchemaId",params,undefined,true); 
			
			copyArg(msg,"SchemaId",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listSchemaVersions(params,cb);
		}

		
		service.ListSchemas=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"RegistryId",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listSchemas(params,cb);
		}

		
		service.ListTriggers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"DependentJobName",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.listTriggers(params,cb);
		}

		
		service.ListWorkflows=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listWorkflows(params,cb);
		}

		
		service.PutDataCatalogEncryptionSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DataCatalogEncryptionSettings",params,undefined,true); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DataCatalogEncryptionSettings",params,undefined,true); 
			

			svc.putDataCatalogEncryptionSettings(params,cb);
		}

		
		service.PutResourcePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PolicyInJson",params,undefined,false); 
			
			copyArg(msg,"PolicyInJson",params,undefined,false); 
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"PolicyHashCondition",params,undefined,false); 
			copyArg(msg,"PolicyExistsCondition",params,undefined,false); 
			copyArg(msg,"EnableHybrid",params,undefined,false); 
			

			svc.putResourcePolicy(params,cb);
		}

		
		service.PutSchemaVersionMetadata=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MetadataKeyValue",params,undefined,true); 
			
			copyArg(msg,"SchemaId",params,undefined,true); 
			copyArg(msg,"SchemaVersionNumber",params,undefined,true); 
			copyArg(msg,"SchemaVersionId",params,undefined,false); 
			copyArg(msg,"MetadataKeyValue",params,undefined,true); 
			

			svc.putSchemaVersionMetadata(params,cb);
		}

		
		service.PutWorkflowRunProperties=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"RunId",params,undefined,false); 
			copyArg(n,"RunProperties",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"RunId",params,undefined,false); 
			copyArg(msg,"RunProperties",params,undefined,true); 
			

			svc.putWorkflowRunProperties(params,cb);
		}

		
		service.QuerySchemaVersionMetadata=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SchemaId",params,undefined,true); 
			copyArg(msg,"SchemaVersionNumber",params,undefined,true); 
			copyArg(msg,"SchemaVersionId",params,undefined,false); 
			copyArg(msg,"MetadataList",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.querySchemaVersionMetadata(params,cb);
		}

		
		service.RegisterSchemaVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SchemaId",params,undefined,true); 
			copyArg(n,"SchemaDefinition",params,undefined,false); 
			
			copyArg(msg,"SchemaId",params,undefined,true); 
			copyArg(msg,"SchemaDefinition",params,undefined,false); 
			

			svc.registerSchemaVersion(params,cb);
		}

		
		service.RemoveSchemaVersionMetadata=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MetadataKeyValue",params,undefined,true); 
			
			copyArg(msg,"SchemaId",params,undefined,true); 
			copyArg(msg,"SchemaVersionNumber",params,undefined,true); 
			copyArg(msg,"SchemaVersionId",params,undefined,false); 
			copyArg(msg,"MetadataKeyValue",params,undefined,true); 
			

			svc.removeSchemaVersionMetadata(params,cb);
		}

		
		service.ResetJobBookmark=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobName",params,undefined,false); 
			
			copyArg(msg,"JobName",params,undefined,false); 
			copyArg(msg,"RunId",params,undefined,false); 
			

			svc.resetJobBookmark(params,cb);
		}

		
		service.ResumeWorkflowRun=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"RunId",params,undefined,false); 
			copyArg(n,"NodeIds",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"RunId",params,undefined,false); 
			copyArg(msg,"NodeIds",params,undefined,true); 
			

			svc.resumeWorkflowRun(params,cb);
		}

		
		service.SearchTables=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"SearchText",params,undefined,false); 
			copyArg(msg,"SortCriteria",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"ResourceShareType",params,undefined,false); 
			

			svc.searchTables(params,cb);
		}

		
		service.StartCrawler=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.startCrawler(params,cb);
		}

		
		service.StartCrawlerSchedule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CrawlerName",params,undefined,false); 
			
			copyArg(msg,"CrawlerName",params,undefined,false); 
			

			svc.startCrawlerSchedule(params,cb);
		}

		
		service.StartExportLabelsTaskRun=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TransformId",params,undefined,false); 
			copyArg(n,"OutputS3Path",params,undefined,false); 
			
			copyArg(msg,"TransformId",params,undefined,false); 
			copyArg(msg,"OutputS3Path",params,undefined,false); 
			

			svc.startExportLabelsTaskRun(params,cb);
		}

		
		service.StartImportLabelsTaskRun=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TransformId",params,undefined,false); 
			copyArg(n,"InputS3Path",params,undefined,false); 
			
			copyArg(msg,"TransformId",params,undefined,false); 
			copyArg(msg,"InputS3Path",params,undefined,false); 
			copyArg(msg,"ReplaceAllLabels",params,undefined,false); 
			

			svc.startImportLabelsTaskRun(params,cb);
		}

		
		service.StartJobRun=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobName",params,undefined,false); 
			
			copyArg(msg,"JobName",params,undefined,false); 
			copyArg(msg,"JobRunId",params,undefined,false); 
			copyArg(msg,"Arguments",params,undefined,true); 
			copyArg(msg,"AllocatedCapacity",params,undefined,false); 
			copyArg(msg,"Timeout",params,undefined,false); 
			copyArg(msg,"MaxCapacity",params,undefined,false); 
			copyArg(msg,"SecurityConfiguration",params,undefined,false); 
			copyArg(msg,"NotificationProperty",params,undefined,true); 
			copyArg(msg,"WorkerType",params,undefined,false); 
			copyArg(msg,"NumberOfWorkers",params,undefined,false); 
			

			svc.startJobRun(params,cb);
		}

		
		service.StartMLEvaluationTaskRun=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TransformId",params,undefined,false); 
			
			copyArg(msg,"TransformId",params,undefined,false); 
			

			svc.startMLEvaluationTaskRun(params,cb);
		}

		
		service.StartMLLabelingSetGenerationTaskRun=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TransformId",params,undefined,false); 
			copyArg(n,"OutputS3Path",params,undefined,false); 
			
			copyArg(msg,"TransformId",params,undefined,false); 
			copyArg(msg,"OutputS3Path",params,undefined,false); 
			

			svc.startMLLabelingSetGenerationTaskRun(params,cb);
		}

		
		service.StartTrigger=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.startTrigger(params,cb);
		}

		
		service.StartWorkflowRun=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.startWorkflowRun(params,cb);
		}

		
		service.StopCrawler=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.stopCrawler(params,cb);
		}

		
		service.StopCrawlerSchedule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CrawlerName",params,undefined,false); 
			
			copyArg(msg,"CrawlerName",params,undefined,false); 
			

			svc.stopCrawlerSchedule(params,cb);
		}

		
		service.StopTrigger=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.stopTrigger(params,cb);
		}

		
		service.StopWorkflowRun=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"RunId",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"RunId",params,undefined,false); 
			

			svc.stopWorkflowRun(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"TagsToAdd",params,undefined,true); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagsToAdd",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"TagsToRemove",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagsToRemove",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateClassifier=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"GrokClassifier",params,undefined,false); 
			copyArg(msg,"XMLClassifier",params,undefined,false); 
			copyArg(msg,"JsonClassifier",params,undefined,false); 
			copyArg(msg,"CsvClassifier",params,undefined,false); 
			

			svc.updateClassifier(params,cb);
		}

		
		service.UpdateColumnStatisticsForPartition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"TableName",params,undefined,false); 
			copyArg(n,"PartitionValues",params,undefined,true); 
			copyArg(n,"ColumnStatisticsList",params,undefined,true); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"PartitionValues",params,undefined,true); 
			copyArg(msg,"ColumnStatisticsList",params,undefined,true); 
			

			svc.updateColumnStatisticsForPartition(params,cb);
		}

		
		service.UpdateColumnStatisticsForTable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"TableName",params,undefined,false); 
			copyArg(n,"ColumnStatisticsList",params,undefined,true); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"ColumnStatisticsList",params,undefined,true); 
			

			svc.updateColumnStatisticsForTable(params,cb);
		}

		
		service.UpdateConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"ConnectionInput",params,undefined,true); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ConnectionInput",params,undefined,true); 
			

			svc.updateConnection(params,cb);
		}

		
		service.UpdateCrawler=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Role",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Targets",params,undefined,true); 
			copyArg(msg,"Schedule",params,undefined,false); 
			copyArg(msg,"Classifiers",params,undefined,true); 
			copyArg(msg,"TablePrefix",params,undefined,false); 
			copyArg(msg,"SchemaChangePolicy",params,undefined,true); 
			copyArg(msg,"RecrawlPolicy",params,undefined,true); 
			copyArg(msg,"LineageConfiguration",params,undefined,true); 
			copyArg(msg,"Configuration",params,undefined,false); 
			copyArg(msg,"CrawlerSecurityConfiguration",params,undefined,false); 
			

			svc.updateCrawler(params,cb);
		}

		
		service.UpdateCrawlerSchedule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CrawlerName",params,undefined,false); 
			
			copyArg(msg,"CrawlerName",params,undefined,false); 
			copyArg(msg,"Schedule",params,undefined,false); 
			

			svc.updateCrawlerSchedule(params,cb);
		}

		
		service.UpdateDatabase=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"DatabaseInput",params,undefined,true); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"DatabaseInput",params,undefined,true); 
			

			svc.updateDatabase(params,cb);
		}

		
		service.UpdateDevEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndpointName",params,undefined,false); 
			
			copyArg(msg,"EndpointName",params,undefined,false); 
			copyArg(msg,"PublicKey",params,undefined,false); 
			copyArg(msg,"AddPublicKeys",params,undefined,true); 
			copyArg(msg,"DeletePublicKeys",params,undefined,true); 
			copyArg(msg,"CustomLibraries",params,undefined,false); 
			copyArg(msg,"UpdateEtlLibraries",params,undefined,false); 
			copyArg(msg,"DeleteArguments",params,undefined,true); 
			copyArg(msg,"AddArguments",params,undefined,true); 
			

			svc.updateDevEndpoint(params,cb);
		}

		
		service.UpdateJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"JobName",params,undefined,false); 
			copyArg(n,"JobUpdate",params,undefined,false); 
			
			copyArg(msg,"JobName",params,undefined,false); 
			copyArg(msg,"JobUpdate",params,undefined,false); 
			

			svc.updateJob(params,cb);
		}

		
		service.UpdateMLTransform=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TransformId",params,undefined,false); 
			
			copyArg(msg,"TransformId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,true); 
			copyArg(msg,"Role",params,undefined,false); 
			copyArg(msg,"GlueVersion",params,undefined,false); 
			copyArg(msg,"MaxCapacity",params,undefined,false); 
			copyArg(msg,"WorkerType",params,undefined,false); 
			copyArg(msg,"NumberOfWorkers",params,undefined,false); 
			copyArg(msg,"Timeout",params,undefined,false); 
			copyArg(msg,"MaxRetries",params,undefined,false); 
			

			svc.updateMLTransform(params,cb);
		}

		
		service.UpdatePartition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"TableName",params,undefined,false); 
			copyArg(n,"PartitionValueList",params,undefined,true); 
			copyArg(n,"PartitionInput",params,undefined,true); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"PartitionValueList",params,undefined,true); 
			copyArg(msg,"PartitionInput",params,undefined,true); 
			

			svc.updatePartition(params,cb);
		}

		
		service.UpdateRegistry=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RegistryId",params,undefined,true); 
			copyArg(n,"Description",params,undefined,false); 
			
			copyArg(msg,"RegistryId",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			

			svc.updateRegistry(params,cb);
		}

		
		service.UpdateSchema=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SchemaId",params,undefined,true); 
			
			copyArg(msg,"SchemaId",params,undefined,true); 
			copyArg(msg,"SchemaVersionNumber",params,undefined,true); 
			copyArg(msg,"Compatibility",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			

			svc.updateSchema(params,cb);
		}

		
		service.UpdateTable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"TableInput",params,undefined,true); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"TableInput",params,undefined,true); 
			copyArg(msg,"SkipArchive",params,undefined,false); 
			

			svc.updateTable(params,cb);
		}

		
		service.UpdateTrigger=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"TriggerUpdate",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"TriggerUpdate",params,undefined,false); 
			

			svc.updateTrigger(params,cb);
		}

		
		service.UpdateUserDefinedFunction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DatabaseName",params,undefined,false); 
			copyArg(n,"FunctionName",params,undefined,false); 
			copyArg(n,"FunctionInput",params,undefined,true); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DatabaseName",params,undefined,false); 
			copyArg(msg,"FunctionName",params,undefined,false); 
			copyArg(msg,"FunctionInput",params,undefined,true); 
			

			svc.updateUserDefinedFunction(params,cb);
		}

		
		service.UpdateWorkflow=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DefaultRunProperties",params,undefined,true); 
			copyArg(msg,"MaxConcurrentRuns",params,undefined,false); 
			

			svc.updateWorkflow(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Glue", AmazonAPINode);

};
