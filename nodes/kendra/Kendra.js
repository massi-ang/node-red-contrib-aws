
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

		var awsService = new AWS.Kendra( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Kendra(msg.AWSConfig) : awsService;

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

		
		service.BatchDeleteDocument=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"DocumentIdList",params,undefined,false); 
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"DocumentIdList",params,undefined,false); 
			copyArgs(n,"DataSourceSyncJobMetricTarget",params,undefined,false); 
			
			copyArgs(msg,"IndexId",params,undefined,false); 
			copyArgs(msg,"DocumentIdList",params,undefined,false); 
			copyArgs(msg,"DataSourceSyncJobMetricTarget",params,undefined,false); 
			

			svc.batchDeleteDocument(params,cb);
		}

		
		service.BatchGetDocumentStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"DocumentInfoList",params,undefined,false); 
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"DocumentInfoList",params,undefined,false); 
			
			copyArgs(msg,"IndexId",params,undefined,false); 
			copyArgs(msg,"DocumentInfoList",params,undefined,false); 
			

			svc.batchGetDocumentStatus(params,cb);
		}

		
		service.BatchPutDocument=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"Documents",params,undefined,false); 
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"Documents",params,undefined,false); 
			
			copyArgs(msg,"IndexId",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"Documents",params,undefined,false); 
			

			svc.batchPutDocument(params,cb);
		}

		
		service.ClearQuerySuggestions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IndexId",params,undefined,false); 
			
			copyArgs(n,"IndexId",params,undefined,false); 
			
			copyArgs(msg,"IndexId",params,undefined,false); 
			

			svc.clearQuerySuggestions(params,cb);
		}

		
		service.CreateDataSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Configuration",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Schedule",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"IndexId",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"Configuration",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Schedule",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.createDataSource(params,cb);
		}

		
		service.CreateFaq=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"S3Path",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"S3Path",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"FileFormat",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"IndexId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"S3Path",params,undefined,true); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"FileFormat",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.createFaq(params,cb);
		}

		
		service.CreateIndex=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Edition",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"ServerSideEncryptionConfiguration",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"UserTokenConfigurations",params,undefined,true); 
			copyArgs(n,"UserContextPolicy",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Edition",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"ServerSideEncryptionConfiguration",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"UserTokenConfigurations",params,undefined,true); 
			copyArgs(msg,"UserContextPolicy",params,undefined,false); 
			

			svc.createIndex(params,cb);
		}

		
		service.CreateQuerySuggestionsBlockList=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"SourceS3Path",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"SourceS3Path",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"IndexId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"SourceS3Path",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createQuerySuggestionsBlockList(params,cb);
		}

		
		service.CreateThesaurus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"SourceS3Path",params,undefined,true); 
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"SourceS3Path",params,undefined,true); 
			copyArgs(n,"ClientToken",params,undefined,false); 
			
			copyArgs(msg,"IndexId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"SourceS3Path",params,undefined,true); 
			copyArgs(msg,"ClientToken",params,undefined,false); 
			

			svc.createThesaurus(params,cb);
		}

		
		service.DeleteDataSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IndexId",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IndexId",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IndexId",params,undefined,false); 
			

			svc.deleteDataSource(params,cb);
		}

		
		service.DeleteFaq=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IndexId",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IndexId",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IndexId",params,undefined,false); 
			

			svc.deleteFaq(params,cb);
		}

		
		service.DeleteIndex=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.deleteIndex(params,cb);
		}

		
		service.DeletePrincipalMapping=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"DataSourceId",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"OrderingId",params,undefined,false); 
			
			copyArgs(msg,"IndexId",params,undefined,false); 
			copyArgs(msg,"DataSourceId",params,undefined,false); 
			copyArgs(msg,"GroupId",params,undefined,false); 
			copyArgs(msg,"OrderingId",params,undefined,false); 
			

			svc.deletePrincipalMapping(params,cb);
		}

		
		service.DeleteQuerySuggestionsBlockList=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"IndexId",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.deleteQuerySuggestionsBlockList(params,cb);
		}

		
		service.DeleteThesaurus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IndexId",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IndexId",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IndexId",params,undefined,false); 
			

			svc.deleteThesaurus(params,cb);
		}

		
		service.DescribeDataSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IndexId",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IndexId",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IndexId",params,undefined,false); 
			

			svc.describeDataSource(params,cb);
		}

		
		service.DescribeFaq=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IndexId",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IndexId",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IndexId",params,undefined,false); 
			

			svc.describeFaq(params,cb);
		}

		
		service.DescribeIndex=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.describeIndex(params,cb);
		}

		
		service.DescribePrincipalMapping=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"DataSourceId",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			
			copyArgs(msg,"IndexId",params,undefined,false); 
			copyArgs(msg,"DataSourceId",params,undefined,false); 
			copyArgs(msg,"GroupId",params,undefined,false); 
			

			svc.describePrincipalMapping(params,cb);
		}

		
		service.DescribeQuerySuggestionsBlockList=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"IndexId",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.describeQuerySuggestionsBlockList(params,cb);
		}

		
		service.DescribeQuerySuggestionsConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IndexId",params,undefined,false); 
			
			copyArgs(n,"IndexId",params,undefined,false); 
			
			copyArgs(msg,"IndexId",params,undefined,false); 
			

			svc.describeQuerySuggestionsConfig(params,cb);
		}

		
		service.DescribeThesaurus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IndexId",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IndexId",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IndexId",params,undefined,false); 
			

			svc.describeThesaurus(params,cb);
		}

		
		service.GetQuerySuggestions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"QueryText",params,undefined,false); 
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"QueryText",params,undefined,false); 
			copyArgs(n,"MaxSuggestionsCount",params,undefined,false); 
			
			copyArgs(msg,"IndexId",params,undefined,false); 
			copyArgs(msg,"QueryText",params,undefined,false); 
			copyArgs(msg,"MaxSuggestionsCount",params,undefined,false); 
			

			svc.getQuerySuggestions(params,cb);
		}

		
		service.ListDataSourceSyncJobs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IndexId",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"StartTimeFilter",params,undefined,false); 
			copyArgs(n,"StatusFilter",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IndexId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"StartTimeFilter",params,undefined,false); 
			copyArgs(msg,"StatusFilter",params,undefined,false); 
			

			svc.listDataSourceSyncJobs(params,cb);
		}

		
		service.ListDataSources=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IndexId",params,undefined,false); 
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"IndexId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listDataSources(params,cb);
		}

		
		service.ListFaqs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IndexId",params,undefined,false); 
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"IndexId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listFaqs(params,cb);
		}

		
		service.ListGroupsOlderThanOrderingId=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"OrderingId",params,undefined,false); 
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"DataSourceId",params,undefined,false); 
			copyArgs(n,"OrderingId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"IndexId",params,undefined,false); 
			copyArgs(msg,"DataSourceId",params,undefined,false); 
			copyArgs(msg,"OrderingId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listGroupsOlderThanOrderingId(params,cb);
		}

		
		service.ListIndices=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listIndices(params,cb);
		}

		
		service.ListQuerySuggestionsBlockLists=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IndexId",params,undefined,false); 
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"IndexId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listQuerySuggestionsBlockLists(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListThesauri=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IndexId",params,undefined,false); 
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"IndexId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listThesauri(params,cb);
		}

		
		service.PutPrincipalMapping=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"GroupMembers",params,undefined,false); 
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"DataSourceId",params,undefined,false); 
			copyArgs(n,"GroupId",params,undefined,false); 
			copyArgs(n,"GroupMembers",params,undefined,false); 
			copyArgs(n,"OrderingId",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(msg,"IndexId",params,undefined,false); 
			copyArgs(msg,"DataSourceId",params,undefined,false); 
			copyArgs(msg,"GroupId",params,undefined,false); 
			copyArgs(msg,"GroupMembers",params,undefined,false); 
			copyArgs(msg,"OrderingId",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			

			svc.putPrincipalMapping(params,cb);
		}

		
		service.Query=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"QueryText",params,undefined,false); 
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"QueryText",params,undefined,false); 
			copyArgs(n,"AttributeFilter",params,undefined,true); 
			copyArgs(n,"Facets",params,undefined,false); 
			copyArgs(n,"RequestedDocumentAttributes",params,undefined,false); 
			copyArgs(n,"QueryResultTypeFilter",params,undefined,false); 
			copyArgs(n,"DocumentRelevanceOverrideConfigurations",params,undefined,false); 
			copyArgs(n,"PageNumber",params,undefined,false); 
			copyArgs(n,"PageSize",params,undefined,false); 
			copyArgs(n,"SortingConfiguration",params,undefined,false); 
			copyArgs(n,"UserContext",params,undefined,false); 
			copyArgs(n,"VisitorId",params,undefined,false); 
			
			copyArgs(msg,"IndexId",params,undefined,false); 
			copyArgs(msg,"QueryText",params,undefined,false); 
			copyArgs(msg,"AttributeFilter",params,undefined,true); 
			copyArgs(msg,"Facets",params,undefined,false); 
			copyArgs(msg,"RequestedDocumentAttributes",params,undefined,false); 
			copyArgs(msg,"QueryResultTypeFilter",params,undefined,false); 
			copyArgs(msg,"DocumentRelevanceOverrideConfigurations",params,undefined,false); 
			copyArgs(msg,"PageNumber",params,undefined,false); 
			copyArgs(msg,"PageSize",params,undefined,false); 
			copyArgs(msg,"SortingConfiguration",params,undefined,false); 
			copyArgs(msg,"UserContext",params,undefined,false); 
			copyArgs(msg,"VisitorId",params,undefined,false); 
			

			svc.query(params,cb);
		}

		
		service.StartDataSourceSyncJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IndexId",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IndexId",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IndexId",params,undefined,false); 
			

			svc.startDataSourceSyncJob(params,cb);
		}

		
		service.StopDataSourceSyncJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IndexId",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IndexId",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"IndexId",params,undefined,false); 
			

			svc.stopDataSourceSyncJob(params,cb);
		}

		
		service.SubmitFeedback=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"QueryId",params,undefined,false); 
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"QueryId",params,undefined,false); 
			copyArgs(n,"ClickFeedbackItems",params,undefined,false); 
			copyArgs(n,"RelevanceFeedbackItems",params,undefined,false); 
			
			copyArgs(msg,"IndexId",params,undefined,false); 
			copyArgs(msg,"QueryId",params,undefined,false); 
			copyArgs(msg,"ClickFeedbackItems",params,undefined,false); 
			copyArgs(msg,"RelevanceFeedbackItems",params,undefined,false); 
			

			svc.submitFeedback(params,cb);
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

		
		service.UpdateDataSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IndexId",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"Configuration",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Schedule",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"IndexId",params,undefined,false); 
			copyArgs(msg,"Configuration",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Schedule",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			

			svc.updateDataSource(params,cb);
		}

		
		service.UpdateIndex=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"DocumentMetadataConfigurationUpdates",params,undefined,true); 
			copyArgs(n,"CapacityUnits",params,undefined,true); 
			copyArgs(n,"UserTokenConfigurations",params,undefined,true); 
			copyArgs(n,"UserContextPolicy",params,undefined,false); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DocumentMetadataConfigurationUpdates",params,undefined,true); 
			copyArgs(msg,"CapacityUnits",params,undefined,true); 
			copyArgs(msg,"UserTokenConfigurations",params,undefined,true); 
			copyArgs(msg,"UserContextPolicy",params,undefined,false); 
			

			svc.updateIndex(params,cb);
		}

		
		service.UpdateQuerySuggestionsBlockList=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"SourceS3Path",params,undefined,true); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			
			copyArgs(msg,"IndexId",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"SourceS3Path",params,undefined,true); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			

			svc.updateQuerySuggestionsBlockList(params,cb);
		}

		
		service.UpdateQuerySuggestionsConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IndexId",params,undefined,false); 
			
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"Mode",params,undefined,false); 
			copyArgs(n,"QueryLogLookBackWindowInDays",params,undefined,false); 
			copyArgs(n,"IncludeQueriesWithoutUserInformation",params,undefined,false); 
			copyArgs(n,"MinimumNumberOfQueryingUsers",params,undefined,false); 
			copyArgs(n,"MinimumQueryCount",params,undefined,false); 
			
			copyArgs(msg,"IndexId",params,undefined,false); 
			copyArgs(msg,"Mode",params,undefined,false); 
			copyArgs(msg,"QueryLogLookBackWindowInDays",params,undefined,false); 
			copyArgs(msg,"IncludeQueriesWithoutUserInformation",params,undefined,false); 
			copyArgs(msg,"MinimumNumberOfQueryingUsers",params,undefined,false); 
			copyArgs(msg,"MinimumQueryCount",params,undefined,false); 
			

			svc.updateQuerySuggestionsConfig(params,cb);
		}

		
		service.UpdateThesaurus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"IndexId",params,undefined,false); 
			
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"IndexId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"SourceS3Path",params,undefined,true); 
			
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"IndexId",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"SourceS3Path",params,undefined,true); 
			

			svc.updateThesaurus(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Kendra", AmazonAPINode);

};
