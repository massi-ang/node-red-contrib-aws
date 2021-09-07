
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

		var awsService = new AWS.DynamoDB( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.DynamoDB(msg.AWSConfig) : awsService;

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
			
			copyArgs(n,"Statements",params,undefined,false); 
			
			copyArgs(n,"Statements",params,undefined,false); 
			
			copyArgs(msg,"Statements",params,undefined,false); 
			

			svc.batchExecuteStatement(params,cb);
		}

		
		service.BatchGetItem=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RequestItems",params,undefined,true); 
			
			copyArgs(n,"RequestItems",params,undefined,true); 
			copyArgs(n,"ReturnConsumedCapacity",params,undefined,false); 
			
			copyArgs(msg,"RequestItems",params,undefined,true); 
			copyArgs(msg,"ReturnConsumedCapacity",params,undefined,false); 
			

			svc.batchGetItem(params,cb);
		}

		
		service.BatchWriteItem=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RequestItems",params,undefined,true); 
			
			copyArgs(n,"RequestItems",params,undefined,true); 
			copyArgs(n,"ReturnConsumedCapacity",params,undefined,false); 
			copyArgs(n,"ReturnItemCollectionMetrics",params,undefined,false); 
			
			copyArgs(msg,"RequestItems",params,undefined,true); 
			copyArgs(msg,"ReturnConsumedCapacity",params,undefined,false); 
			copyArgs(msg,"ReturnItemCollectionMetrics",params,undefined,false); 
			

			svc.batchWriteItem(params,cb);
		}

		
		service.CreateBackup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"BackupName",params,undefined,false); 
			
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"BackupName",params,undefined,false); 
			
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"BackupName",params,undefined,false); 
			

			svc.createBackup(params,cb);
		}

		
		service.CreateGlobalTable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalTableName",params,undefined,false); 
			copyArgs(n,"ReplicationGroup",params,undefined,true); 
			
			copyArgs(n,"GlobalTableName",params,undefined,false); 
			copyArgs(n,"ReplicationGroup",params,undefined,true); 
			
			copyArgs(msg,"GlobalTableName",params,undefined,false); 
			copyArgs(msg,"ReplicationGroup",params,undefined,true); 
			

			svc.createGlobalTable(params,cb);
		}

		
		service.CreateTable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AttributeDefinitions",params,undefined,true); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"KeySchema",params,undefined,true); 
			
			copyArgs(n,"AttributeDefinitions",params,undefined,true); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"KeySchema",params,undefined,true); 
			copyArgs(n,"LocalSecondaryIndexes",params,undefined,true); 
			copyArgs(n,"GlobalSecondaryIndexes",params,undefined,true); 
			copyArgs(n,"BillingMode",params,undefined,false); 
			copyArgs(n,"ProvisionedThroughput",params,undefined,true); 
			copyArgs(n,"StreamSpecification",params,undefined,true); 
			copyArgs(n,"SSESpecification",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"AttributeDefinitions",params,undefined,true); 
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"KeySchema",params,undefined,true); 
			copyArgs(msg,"LocalSecondaryIndexes",params,undefined,true); 
			copyArgs(msg,"GlobalSecondaryIndexes",params,undefined,true); 
			copyArgs(msg,"BillingMode",params,undefined,false); 
			copyArgs(msg,"ProvisionedThroughput",params,undefined,true); 
			copyArgs(msg,"StreamSpecification",params,undefined,true); 
			copyArgs(msg,"SSESpecification",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createTable(params,cb);
		}

		
		service.DeleteBackup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupArn",params,undefined,false); 
			
			copyArgs(n,"BackupArn",params,undefined,false); 
			
			copyArgs(msg,"BackupArn",params,undefined,false); 
			

			svc.deleteBackup(params,cb);
		}

		
		service.DeleteItem=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,true); 
			
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,true); 
			copyArgs(n,"Expected",params,undefined,true); 
			copyArgs(n,"ConditionalOperator",params,undefined,false); 
			copyArgs(n,"ReturnValues",params,undefined,false); 
			copyArgs(n,"ReturnConsumedCapacity",params,undefined,false); 
			copyArgs(n,"ReturnItemCollectionMetrics",params,undefined,false); 
			copyArgs(n,"ConditionExpression",params,undefined,false); 
			copyArgs(n,"ExpressionAttributeNames",params,undefined,true); 
			copyArgs(n,"ExpressionAttributeValues",params,undefined,true); 
			
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"Key",params,undefined,true); 
			copyArgs(msg,"Expected",params,undefined,true); 
			copyArgs(msg,"ConditionalOperator",params,undefined,false); 
			copyArgs(msg,"ReturnValues",params,undefined,false); 
			copyArgs(msg,"ReturnConsumedCapacity",params,undefined,false); 
			copyArgs(msg,"ReturnItemCollectionMetrics",params,undefined,false); 
			copyArgs(msg,"ConditionExpression",params,undefined,false); 
			copyArgs(msg,"ExpressionAttributeNames",params,undefined,true); 
			copyArgs(msg,"ExpressionAttributeValues",params,undefined,true); 
			

			svc.deleteItem(params,cb);
		}

		
		service.DeleteTable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TableName",params,undefined,false); 
			
			copyArgs(n,"TableName",params,undefined,false); 
			
			copyArgs(msg,"TableName",params,undefined,false); 
			

			svc.deleteTable(params,cb);
		}

		
		service.DescribeBackup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BackupArn",params,undefined,false); 
			
			copyArgs(n,"BackupArn",params,undefined,false); 
			
			copyArgs(msg,"BackupArn",params,undefined,false); 
			

			svc.describeBackup(params,cb);
		}

		
		service.DescribeContinuousBackups=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TableName",params,undefined,false); 
			
			copyArgs(n,"TableName",params,undefined,false); 
			
			copyArgs(msg,"TableName",params,undefined,false); 
			

			svc.describeContinuousBackups(params,cb);
		}

		
		service.DescribeContributorInsights=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TableName",params,undefined,false); 
			
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"IndexName",params,undefined,false); 
			
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"IndexName",params,undefined,false); 
			

			svc.describeContributorInsights(params,cb);
		}

		
		service.DescribeEndpoints=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeEndpoints(params,cb);
		}

		
		service.DescribeExport=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ExportArn",params,undefined,false); 
			
			copyArgs(n,"ExportArn",params,undefined,false); 
			
			copyArgs(msg,"ExportArn",params,undefined,false); 
			

			svc.describeExport(params,cb);
		}

		
		service.DescribeGlobalTable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalTableName",params,undefined,false); 
			
			copyArgs(n,"GlobalTableName",params,undefined,false); 
			
			copyArgs(msg,"GlobalTableName",params,undefined,false); 
			

			svc.describeGlobalTable(params,cb);
		}

		
		service.DescribeGlobalTableSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalTableName",params,undefined,false); 
			
			copyArgs(n,"GlobalTableName",params,undefined,false); 
			
			copyArgs(msg,"GlobalTableName",params,undefined,false); 
			

			svc.describeGlobalTableSettings(params,cb);
		}

		
		service.DescribeKinesisStreamingDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TableName",params,undefined,false); 
			
			copyArgs(n,"TableName",params,undefined,false); 
			
			copyArgs(msg,"TableName",params,undefined,false); 
			

			svc.describeKinesisStreamingDestination(params,cb);
		}

		
		service.DescribeLimits=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeLimits(params,cb);
		}

		
		service.DescribeTable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TableName",params,undefined,false); 
			
			copyArgs(n,"TableName",params,undefined,false); 
			
			copyArgs(msg,"TableName",params,undefined,false); 
			

			svc.describeTable(params,cb);
		}

		
		service.DescribeTableReplicaAutoScaling=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TableName",params,undefined,false); 
			
			copyArgs(n,"TableName",params,undefined,false); 
			
			copyArgs(msg,"TableName",params,undefined,false); 
			

			svc.describeTableReplicaAutoScaling(params,cb);
		}

		
		service.DescribeTimeToLive=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TableName",params,undefined,false); 
			
			copyArgs(n,"TableName",params,undefined,false); 
			
			copyArgs(msg,"TableName",params,undefined,false); 
			

			svc.describeTimeToLive(params,cb);
		}

		
		service.DisableKinesisStreamingDestination=function(svc,msg,cb){
			var params={};
			
			
			
			
			copyArgs(msg,"TableName",params,undefined,true); 
			copyArgs(msg,"StreamArn",params,undefined,true); 

			svc.disableKinesisStreamingDestination(params,cb);
		}

		
		service.EnableKinesisStreamingDestination=function(svc,msg,cb){
			var params={};
			
			
			
			
			copyArgs(msg,"TableName",params,undefined,true); 
			copyArgs(msg,"StreamArn",params,undefined,true); 

			svc.enableKinesisStreamingDestination(params,cb);
		}

		
		service.ExecuteStatement=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Statement",params,undefined,false); 
			
			copyArgs(n,"Statement",params,undefined,false); 
			copyArgs(n,"Parameters",params,undefined,true); 
			copyArgs(n,"ConsistentRead",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Statement",params,undefined,false); 
			copyArgs(msg,"Parameters",params,undefined,true); 
			copyArgs(msg,"ConsistentRead",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.executeStatement(params,cb);
		}

		
		service.ExecuteTransaction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransactStatements",params,undefined,false); 
			
			copyArgs(n,"TransactStatements",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"TransactStatements",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.executeTransaction(params,cb);
		}

		
		service.ExportTableToPointInTime=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TableArn",params,undefined,false); 
			copyArgs(n,"S3Bucket",params,undefined,false); 
			
			copyArgs(n,"TableArn",params,undefined,false); 
			copyArgs(n,"ExportTime",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"S3Bucket",params,undefined,false); 
			copyArgs(n,"S3BucketOwner",params,undefined,false); 
			copyArgs(n,"S3Prefix",params,undefined,false); 
			copyArgs(n,"S3SseAlgorithm",params,undefined,false); 
			copyArgs(n,"S3SseKmsKeyId",params,undefined,false); 
			copyArgs(n,"ExportFormat",params,undefined,false); 
			
			copyArgs(msg,"TableArn",params,undefined,false); 
			copyArgs(msg,"ExportTime",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"S3Bucket",params,undefined,false); 
			copyArgs(msg,"S3BucketOwner",params,undefined,false); 
			copyArgs(msg,"S3Prefix",params,undefined,false); 
			copyArgs(msg,"S3SseAlgorithm",params,undefined,false); 
			copyArgs(msg,"S3SseKmsKeyId",params,undefined,false); 
			copyArgs(msg,"ExportFormat",params,undefined,false); 
			

			svc.exportTableToPointInTime(params,cb);
		}

		
		service.GetItem=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,true); 
			
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,true); 
			copyArgs(n,"AttributesToGet",params,undefined,true); 
			copyArgs(n,"ConsistentRead",params,undefined,false); 
			copyArgs(n,"ReturnConsumedCapacity",params,undefined,false); 
			copyArgs(n,"ProjectionExpression",params,undefined,false); 
			copyArgs(n,"ExpressionAttributeNames",params,undefined,true); 
			
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"Key",params,undefined,true); 
			copyArgs(msg,"AttributesToGet",params,undefined,true); 
			copyArgs(msg,"ConsistentRead",params,undefined,false); 
			copyArgs(msg,"ReturnConsumedCapacity",params,undefined,false); 
			copyArgs(msg,"ProjectionExpression",params,undefined,false); 
			copyArgs(msg,"ExpressionAttributeNames",params,undefined,true); 
			

			svc.getItem(params,cb);
		}

		
		service.ListBackups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"Limit",params,undefined,false); 
			copyArgs(n,"TimeRangeLowerBound",params,undefined,false); 
			copyArgs(n,"TimeRangeUpperBound",params,undefined,false); 
			copyArgs(n,"ExclusiveStartBackupArn",params,undefined,false); 
			copyArgs(n,"BackupType",params,undefined,false); 
			
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"TimeRangeLowerBound",params,undefined,false); 
			copyArgs(msg,"TimeRangeUpperBound",params,undefined,false); 
			copyArgs(msg,"ExclusiveStartBackupArn",params,undefined,false); 
			copyArgs(msg,"BackupType",params,undefined,false); 
			

			svc.listBackups(params,cb);
		}

		
		service.ListContributorInsights=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listContributorInsights(params,cb);
		}

		
		service.ListExports=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"TableArn",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"TableArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listExports(params,cb);
		}

		
		service.ListGlobalTables=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ExclusiveStartGlobalTableName",params,undefined,false); 
			copyArgs(n,"Limit",params,undefined,false); 
			copyArgs(n,"RegionName",params,undefined,false); 
			
			copyArgs(msg,"ExclusiveStartGlobalTableName",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"RegionName",params,undefined,false); 
			

			svc.listGlobalTables(params,cb);
		}

		
		service.ListTables=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ExclusiveStartTableName",params,undefined,false); 
			copyArgs(n,"Limit",params,undefined,false); 
			
			copyArgs(msg,"ExclusiveStartTableName",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listTables(params,cb);
		}

		
		service.ListTagsOfResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listTagsOfResource(params,cb);
		}

		
		service.PutItem=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"Item",params,undefined,true); 
			
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"Item",params,undefined,true); 
			copyArgs(n,"Expected",params,undefined,true); 
			copyArgs(n,"ReturnValues",params,undefined,false); 
			copyArgs(n,"ReturnConsumedCapacity",params,undefined,false); 
			copyArgs(n,"ReturnItemCollectionMetrics",params,undefined,false); 
			copyArgs(n,"ConditionalOperator",params,undefined,false); 
			copyArgs(n,"ConditionExpression",params,undefined,false); 
			copyArgs(n,"ExpressionAttributeNames",params,undefined,true); 
			copyArgs(n,"ExpressionAttributeValues",params,undefined,true); 
			
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"Item",params,undefined,true); 
			copyArgs(msg,"Expected",params,undefined,true); 
			copyArgs(msg,"ReturnValues",params,undefined,false); 
			copyArgs(msg,"ReturnConsumedCapacity",params,undefined,false); 
			copyArgs(msg,"ReturnItemCollectionMetrics",params,undefined,false); 
			copyArgs(msg,"ConditionalOperator",params,undefined,false); 
			copyArgs(msg,"ConditionExpression",params,undefined,false); 
			copyArgs(msg,"ExpressionAttributeNames",params,undefined,true); 
			copyArgs(msg,"ExpressionAttributeValues",params,undefined,true); 
			

			svc.putItem(params,cb);
		}

		
		service.Query=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TableName",params,undefined,false); 
			
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"IndexName",params,undefined,false); 
			copyArgs(n,"Select",params,undefined,false); 
			copyArgs(n,"AttributesToGet",params,undefined,true); 
			copyArgs(n,"Limit",params,undefined,false); 
			copyArgs(n,"ConsistentRead",params,undefined,false); 
			copyArgs(n,"KeyConditions",params,undefined,false); 
			copyArgs(n,"QueryFilter",params,undefined,true); 
			copyArgs(n,"ConditionalOperator",params,undefined,false); 
			copyArgs(n,"ScanIndexForward",params,undefined,false); 
			copyArgs(n,"ExclusiveStartKey",params,undefined,true); 
			copyArgs(n,"ReturnConsumedCapacity",params,undefined,false); 
			copyArgs(n,"ProjectionExpression",params,undefined,false); 
			copyArgs(n,"FilterExpression",params,undefined,false); 
			copyArgs(n,"KeyConditionExpression",params,undefined,false); 
			copyArgs(n,"ExpressionAttributeNames",params,undefined,true); 
			copyArgs(n,"ExpressionAttributeValues",params,undefined,true); 
			
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"IndexName",params,undefined,false); 
			copyArgs(msg,"Select",params,undefined,false); 
			copyArgs(msg,"AttributesToGet",params,undefined,true); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"ConsistentRead",params,undefined,false); 
			copyArgs(msg,"KeyConditions",params,undefined,false); 
			copyArgs(msg,"QueryFilter",params,undefined,true); 
			copyArgs(msg,"ConditionalOperator",params,undefined,false); 
			copyArgs(msg,"ScanIndexForward",params,undefined,false); 
			copyArgs(msg,"ExclusiveStartKey",params,undefined,true); 
			copyArgs(msg,"ReturnConsumedCapacity",params,undefined,false); 
			copyArgs(msg,"ProjectionExpression",params,undefined,false); 
			copyArgs(msg,"FilterExpression",params,undefined,false); 
			copyArgs(msg,"KeyConditionExpression",params,undefined,false); 
			copyArgs(msg,"ExpressionAttributeNames",params,undefined,true); 
			copyArgs(msg,"ExpressionAttributeValues",params,undefined,true); 
			

			svc.query(params,cb);
		}

		
		service.RestoreTableFromBackup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TargetTableName",params,undefined,false); 
			copyArgs(n,"BackupArn",params,undefined,false); 
			
			copyArgs(n,"TargetTableName",params,undefined,false); 
			copyArgs(n,"BackupArn",params,undefined,false); 
			copyArgs(n,"BillingModeOverride",params,undefined,false); 
			copyArgs(n,"GlobalSecondaryIndexOverride",params,undefined,true); 
			copyArgs(n,"LocalSecondaryIndexOverride",params,undefined,true); 
			copyArgs(n,"ProvisionedThroughputOverride",params,undefined,true); 
			copyArgs(n,"SSESpecificationOverride",params,undefined,true); 
			
			copyArgs(msg,"TargetTableName",params,undefined,false); 
			copyArgs(msg,"BackupArn",params,undefined,false); 
			copyArgs(msg,"BillingModeOverride",params,undefined,false); 
			copyArgs(msg,"GlobalSecondaryIndexOverride",params,undefined,true); 
			copyArgs(msg,"LocalSecondaryIndexOverride",params,undefined,true); 
			copyArgs(msg,"ProvisionedThroughputOverride",params,undefined,true); 
			copyArgs(msg,"SSESpecificationOverride",params,undefined,true); 
			

			svc.restoreTableFromBackup(params,cb);
		}

		
		service.RestoreTableToPointInTime=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TargetTableName",params,undefined,false); 
			
			copyArgs(n,"SourceTableArn",params,undefined,false); 
			copyArgs(n,"SourceTableName",params,undefined,false); 
			copyArgs(n,"TargetTableName",params,undefined,false); 
			copyArgs(n,"UseLatestRestorableTime",params,undefined,false); 
			copyArgs(n,"RestoreDateTime",params,undefined,false); 
			copyArgs(n,"BillingModeOverride",params,undefined,false); 
			copyArgs(n,"GlobalSecondaryIndexOverride",params,undefined,true); 
			copyArgs(n,"LocalSecondaryIndexOverride",params,undefined,true); 
			copyArgs(n,"ProvisionedThroughputOverride",params,undefined,true); 
			copyArgs(n,"SSESpecificationOverride",params,undefined,true); 
			
			copyArgs(msg,"SourceTableArn",params,undefined,false); 
			copyArgs(msg,"SourceTableName",params,undefined,false); 
			copyArgs(msg,"TargetTableName",params,undefined,false); 
			copyArgs(msg,"UseLatestRestorableTime",params,undefined,false); 
			copyArgs(msg,"RestoreDateTime",params,undefined,false); 
			copyArgs(msg,"BillingModeOverride",params,undefined,false); 
			copyArgs(msg,"GlobalSecondaryIndexOverride",params,undefined,true); 
			copyArgs(msg,"LocalSecondaryIndexOverride",params,undefined,true); 
			copyArgs(msg,"ProvisionedThroughputOverride",params,undefined,true); 
			copyArgs(msg,"SSESpecificationOverride",params,undefined,true); 
			

			svc.restoreTableToPointInTime(params,cb);
		}

		
		service.Scan=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TableName",params,undefined,false); 
			
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"IndexName",params,undefined,false); 
			copyArgs(n,"AttributesToGet",params,undefined,true); 
			copyArgs(n,"Limit",params,undefined,false); 
			copyArgs(n,"Select",params,undefined,false); 
			copyArgs(n,"ScanFilter",params,undefined,true); 
			copyArgs(n,"ConditionalOperator",params,undefined,false); 
			copyArgs(n,"ExclusiveStartKey",params,undefined,true); 
			copyArgs(n,"ReturnConsumedCapacity",params,undefined,false); 
			copyArgs(n,"TotalSegments",params,undefined,false); 
			copyArgs(n,"Segment",params,undefined,false); 
			copyArgs(n,"ProjectionExpression",params,undefined,false); 
			copyArgs(n,"FilterExpression",params,undefined,false); 
			copyArgs(n,"ExpressionAttributeNames",params,undefined,true); 
			copyArgs(n,"ExpressionAttributeValues",params,undefined,true); 
			copyArgs(n,"ConsistentRead",params,undefined,false); 
			
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"IndexName",params,undefined,false); 
			copyArgs(msg,"AttributesToGet",params,undefined,true); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"Select",params,undefined,false); 
			copyArgs(msg,"ScanFilter",params,undefined,true); 
			copyArgs(msg,"ConditionalOperator",params,undefined,false); 
			copyArgs(msg,"ExclusiveStartKey",params,undefined,true); 
			copyArgs(msg,"ReturnConsumedCapacity",params,undefined,false); 
			copyArgs(msg,"TotalSegments",params,undefined,false); 
			copyArgs(msg,"Segment",params,undefined,false); 
			copyArgs(msg,"ProjectionExpression",params,undefined,false); 
			copyArgs(msg,"FilterExpression",params,undefined,false); 
			copyArgs(msg,"ExpressionAttributeNames",params,undefined,true); 
			copyArgs(msg,"ExpressionAttributeValues",params,undefined,true); 
			copyArgs(msg,"ConsistentRead",params,undefined,false); 
			

			svc.scan(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.TransactGetItems=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransactItems",params,undefined,false); 
			
			copyArgs(n,"TransactItems",params,undefined,false); 
			copyArgs(n,"ReturnConsumedCapacity",params,undefined,false); 
			
			copyArgs(msg,"TransactItems",params,undefined,false); 
			copyArgs(msg,"ReturnConsumedCapacity",params,undefined,false); 
			

			svc.transactGetItems(params,cb);
		}

		
		service.TransactWriteItems=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TransactItems",params,undefined,false); 
			
			copyArgs(n,"TransactItems",params,undefined,false); 
			copyArgs(n,"ReturnConsumedCapacity",params,undefined,false); 
			copyArgs(n,"ReturnItemCollectionMetrics",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"TransactItems",params,undefined,false); 
			copyArgs(msg,"ReturnConsumedCapacity",params,undefined,false); 
			copyArgs(msg,"ReturnItemCollectionMetrics",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.transactWriteItems(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateContinuousBackups=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"PointInTimeRecoverySpecification",params,undefined,false); 
			
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"PointInTimeRecoverySpecification",params,undefined,false); 
			
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"PointInTimeRecoverySpecification",params,undefined,false); 
			

			svc.updateContinuousBackups(params,cb);
		}

		
		service.UpdateContributorInsights=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"ContributorInsightsAction",params,undefined,false); 
			
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"IndexName",params,undefined,false); 
			copyArgs(n,"ContributorInsightsAction",params,undefined,false); 
			
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"IndexName",params,undefined,false); 
			copyArgs(msg,"ContributorInsightsAction",params,undefined,false); 
			

			svc.updateContributorInsights(params,cb);
		}

		
		service.UpdateGlobalTable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalTableName",params,undefined,false); 
			copyArgs(n,"ReplicaUpdates",params,undefined,false); 
			
			copyArgs(n,"GlobalTableName",params,undefined,false); 
			copyArgs(n,"ReplicaUpdates",params,undefined,false); 
			
			copyArgs(msg,"GlobalTableName",params,undefined,false); 
			copyArgs(msg,"ReplicaUpdates",params,undefined,false); 
			

			svc.updateGlobalTable(params,cb);
		}

		
		service.UpdateGlobalTableSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"GlobalTableName",params,undefined,false); 
			
			copyArgs(n,"GlobalTableName",params,undefined,false); 
			copyArgs(n,"GlobalTableBillingMode",params,undefined,false); 
			copyArgs(n,"GlobalTableProvisionedWriteCapacityUnits",params,undefined,false); 
			copyArgs(n,"GlobalTableProvisionedWriteCapacityAutoScalingSettingsUpdate",params,undefined,true); 
			copyArgs(n,"GlobalTableGlobalSecondaryIndexSettingsUpdate",params,undefined,false); 
			copyArgs(n,"ReplicaSettingsUpdate",params,undefined,false); 
			
			copyArgs(msg,"GlobalTableName",params,undefined,false); 
			copyArgs(msg,"GlobalTableBillingMode",params,undefined,false); 
			copyArgs(msg,"GlobalTableProvisionedWriteCapacityUnits",params,undefined,false); 
			copyArgs(msg,"GlobalTableProvisionedWriteCapacityAutoScalingSettingsUpdate",params,undefined,true); 
			copyArgs(msg,"GlobalTableGlobalSecondaryIndexSettingsUpdate",params,undefined,false); 
			copyArgs(msg,"ReplicaSettingsUpdate",params,undefined,false); 
			

			svc.updateGlobalTableSettings(params,cb);
		}

		
		service.UpdateItem=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,true); 
			
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"Key",params,undefined,true); 
			copyArgs(n,"AttributeUpdates",params,undefined,false); 
			copyArgs(n,"Expected",params,undefined,true); 
			copyArgs(n,"ConditionalOperator",params,undefined,false); 
			copyArgs(n,"ReturnValues",params,undefined,false); 
			copyArgs(n,"ReturnConsumedCapacity",params,undefined,false); 
			copyArgs(n,"ReturnItemCollectionMetrics",params,undefined,false); 
			copyArgs(n,"UpdateExpression",params,undefined,false); 
			copyArgs(n,"ConditionExpression",params,undefined,false); 
			copyArgs(n,"ExpressionAttributeNames",params,undefined,true); 
			copyArgs(n,"ExpressionAttributeValues",params,undefined,true); 
			
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"Key",params,undefined,true); 
			copyArgs(msg,"AttributeUpdates",params,undefined,false); 
			copyArgs(msg,"Expected",params,undefined,true); 
			copyArgs(msg,"ConditionalOperator",params,undefined,false); 
			copyArgs(msg,"ReturnValues",params,undefined,false); 
			copyArgs(msg,"ReturnConsumedCapacity",params,undefined,false); 
			copyArgs(msg,"ReturnItemCollectionMetrics",params,undefined,false); 
			copyArgs(msg,"UpdateExpression",params,undefined,false); 
			copyArgs(msg,"ConditionExpression",params,undefined,false); 
			copyArgs(msg,"ExpressionAttributeNames",params,undefined,true); 
			copyArgs(msg,"ExpressionAttributeValues",params,undefined,true); 
			

			svc.updateItem(params,cb);
		}

		
		service.UpdateTable=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TableName",params,undefined,false); 
			
			copyArgs(n,"AttributeDefinitions",params,undefined,true); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"BillingMode",params,undefined,false); 
			copyArgs(n,"ProvisionedThroughput",params,undefined,true); 
			copyArgs(n,"GlobalSecondaryIndexUpdates",params,undefined,false); 
			copyArgs(n,"StreamSpecification",params,undefined,true); 
			copyArgs(n,"SSESpecification",params,undefined,true); 
			copyArgs(n,"ReplicaUpdates",params,undefined,false); 
			
			copyArgs(msg,"AttributeDefinitions",params,undefined,true); 
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"BillingMode",params,undefined,false); 
			copyArgs(msg,"ProvisionedThroughput",params,undefined,true); 
			copyArgs(msg,"GlobalSecondaryIndexUpdates",params,undefined,false); 
			copyArgs(msg,"StreamSpecification",params,undefined,true); 
			copyArgs(msg,"SSESpecification",params,undefined,true); 
			copyArgs(msg,"ReplicaUpdates",params,undefined,false); 
			

			svc.updateTable(params,cb);
		}

		
		service.UpdateTableReplicaAutoScaling=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TableName",params,undefined,false); 
			
			copyArgs(n,"GlobalSecondaryIndexUpdates",params,undefined,false); 
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"ProvisionedWriteCapacityAutoScalingUpdate",params,undefined,true); 
			copyArgs(n,"ReplicaUpdates",params,undefined,false); 
			
			copyArgs(msg,"GlobalSecondaryIndexUpdates",params,undefined,false); 
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"ProvisionedWriteCapacityAutoScalingUpdate",params,undefined,true); 
			copyArgs(msg,"ReplicaUpdates",params,undefined,false); 
			

			svc.updateTableReplicaAutoScaling(params,cb);
		}

		
		service.UpdateTimeToLive=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"TimeToLiveSpecification",params,undefined,true); 
			
			copyArgs(n,"TableName",params,undefined,false); 
			copyArgs(n,"TimeToLiveSpecification",params,undefined,true); 
			
			copyArgs(msg,"TableName",params,undefined,false); 
			copyArgs(msg,"TimeToLiveSpecification",params,undefined,true); 
			

			svc.updateTimeToLive(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS DynamoDB", AmazonAPINode);

};
