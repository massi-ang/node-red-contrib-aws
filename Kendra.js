
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

		var awsService = new AWS.Kendra( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Kendra(msg.AWSConfig) : awsService;

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

		
		service.BatchDeleteDocument=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IndexId",params,undefined,false); 
			copyArg(n,"DocumentIdList",params,undefined,false); 
			
			copyArg(msg,"IndexId",params,undefined,false); 
			copyArg(msg,"DocumentIdList",params,undefined,false); 
			copyArg(msg,"DataSourceSyncJobMetricTarget",params,undefined,false); 
			

			svc.batchDeleteDocument(params,cb);
		}

		
		service.BatchGetDocumentStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IndexId",params,undefined,false); 
			copyArg(n,"DocumentInfoList",params,undefined,false); 
			
			copyArg(msg,"IndexId",params,undefined,false); 
			copyArg(msg,"DocumentInfoList",params,undefined,false); 
			

			svc.batchGetDocumentStatus(params,cb);
		}

		
		service.BatchPutDocument=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IndexId",params,undefined,false); 
			copyArg(n,"Documents",params,undefined,false); 
			
			copyArg(msg,"IndexId",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"Documents",params,undefined,false); 
			

			svc.batchPutDocument(params,cb);
		}

		
		service.ClearQuerySuggestions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IndexId",params,undefined,false); 
			
			copyArg(msg,"IndexId",params,undefined,false); 
			

			svc.clearQuerySuggestions(params,cb);
		}

		
		service.CreateDataSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"IndexId",params,undefined,false); 
			copyArg(n,"Type",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"IndexId",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"Configuration",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Schedule",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.createDataSource(params,cb);
		}

		
		service.CreateFaq=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IndexId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"S3Path",params,undefined,true); 
			copyArg(n,"RoleArn",params,undefined,false); 
			
			copyArg(msg,"IndexId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"S3Path",params,undefined,true); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"FileFormat",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.createFaq(params,cb);
		}

		
		service.CreateIndex=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"RoleArn",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Edition",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"ServerSideEncryptionConfiguration",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"UserTokenConfigurations",params,undefined,true); 
			copyArg(msg,"UserContextPolicy",params,undefined,false); 
			

			svc.createIndex(params,cb);
		}

		
		service.CreateQuerySuggestionsBlockList=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IndexId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"SourceS3Path",params,undefined,true); 
			copyArg(n,"RoleArn",params,undefined,false); 
			
			copyArg(msg,"IndexId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"SourceS3Path",params,undefined,true); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createQuerySuggestionsBlockList(params,cb);
		}

		
		service.CreateThesaurus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IndexId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"RoleArn",params,undefined,false); 
			copyArg(n,"SourceS3Path",params,undefined,true); 
			
			copyArg(msg,"IndexId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"SourceS3Path",params,undefined,true); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			

			svc.createThesaurus(params,cb);
		}

		
		service.DeleteDataSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"IndexId",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IndexId",params,undefined,false); 
			

			svc.deleteDataSource(params,cb);
		}

		
		service.DeleteFaq=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"IndexId",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IndexId",params,undefined,false); 
			

			svc.deleteFaq(params,cb);
		}

		
		service.DeleteIndex=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.deleteIndex(params,cb);
		}

		
		service.DeletePrincipalMapping=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IndexId",params,undefined,false); 
			copyArg(n,"GroupId",params,undefined,false); 
			
			copyArg(msg,"IndexId",params,undefined,false); 
			copyArg(msg,"DataSourceId",params,undefined,false); 
			copyArg(msg,"GroupId",params,undefined,false); 
			copyArg(msg,"OrderingId",params,undefined,false); 
			

			svc.deletePrincipalMapping(params,cb);
		}

		
		service.DeleteQuerySuggestionsBlockList=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IndexId",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"IndexId",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.deleteQuerySuggestionsBlockList(params,cb);
		}

		
		service.DeleteThesaurus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"IndexId",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IndexId",params,undefined,false); 
			

			svc.deleteThesaurus(params,cb);
		}

		
		service.DescribeDataSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"IndexId",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IndexId",params,undefined,false); 
			

			svc.describeDataSource(params,cb);
		}

		
		service.DescribeFaq=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"IndexId",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IndexId",params,undefined,false); 
			

			svc.describeFaq(params,cb);
		}

		
		service.DescribeIndex=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.describeIndex(params,cb);
		}

		
		service.DescribePrincipalMapping=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IndexId",params,undefined,false); 
			copyArg(n,"GroupId",params,undefined,false); 
			
			copyArg(msg,"IndexId",params,undefined,false); 
			copyArg(msg,"DataSourceId",params,undefined,false); 
			copyArg(msg,"GroupId",params,undefined,false); 
			

			svc.describePrincipalMapping(params,cb);
		}

		
		service.DescribeQuerySuggestionsBlockList=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IndexId",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"IndexId",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.describeQuerySuggestionsBlockList(params,cb);
		}

		
		service.DescribeQuerySuggestionsConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IndexId",params,undefined,false); 
			
			copyArg(msg,"IndexId",params,undefined,false); 
			

			svc.describeQuerySuggestionsConfig(params,cb);
		}

		
		service.DescribeThesaurus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"IndexId",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IndexId",params,undefined,false); 
			

			svc.describeThesaurus(params,cb);
		}

		
		service.GetQuerySuggestions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IndexId",params,undefined,false); 
			copyArg(n,"QueryText",params,undefined,false); 
			
			copyArg(msg,"IndexId",params,undefined,false); 
			copyArg(msg,"QueryText",params,undefined,false); 
			copyArg(msg,"MaxSuggestionsCount",params,undefined,false); 
			

			svc.getQuerySuggestions(params,cb);
		}

		
		service.ListDataSourceSyncJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"IndexId",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IndexId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"StartTimeFilter",params,undefined,false); 
			copyArg(msg,"StatusFilter",params,undefined,false); 
			

			svc.listDataSourceSyncJobs(params,cb);
		}

		
		service.ListDataSources=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IndexId",params,undefined,false); 
			
			copyArg(msg,"IndexId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listDataSources(params,cb);
		}

		
		service.ListFaqs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IndexId",params,undefined,false); 
			
			copyArg(msg,"IndexId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listFaqs(params,cb);
		}

		
		service.ListGroupsOlderThanOrderingId=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IndexId",params,undefined,false); 
			copyArg(n,"OrderingId",params,undefined,false); 
			
			copyArg(msg,"IndexId",params,undefined,false); 
			copyArg(msg,"DataSourceId",params,undefined,false); 
			copyArg(msg,"OrderingId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listGroupsOlderThanOrderingId(params,cb);
		}

		
		service.ListIndices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listIndices(params,cb);
		}

		
		service.ListQuerySuggestionsBlockLists=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IndexId",params,undefined,false); 
			
			copyArg(msg,"IndexId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listQuerySuggestionsBlockLists(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListThesauri=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IndexId",params,undefined,false); 
			
			copyArg(msg,"IndexId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listThesauri(params,cb);
		}

		
		service.PutPrincipalMapping=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IndexId",params,undefined,false); 
			copyArg(n,"GroupId",params,undefined,false); 
			copyArg(n,"GroupMembers",params,undefined,false); 
			
			copyArg(msg,"IndexId",params,undefined,false); 
			copyArg(msg,"DataSourceId",params,undefined,false); 
			copyArg(msg,"GroupId",params,undefined,false); 
			copyArg(msg,"GroupMembers",params,undefined,false); 
			copyArg(msg,"OrderingId",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			

			svc.putPrincipalMapping(params,cb);
		}

		
		service.Query=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IndexId",params,undefined,false); 
			copyArg(n,"QueryText",params,undefined,false); 
			
			copyArg(msg,"IndexId",params,undefined,false); 
			copyArg(msg,"QueryText",params,undefined,false); 
			copyArg(msg,"AttributeFilter",params,undefined,true); 
			copyArg(msg,"Facets",params,undefined,false); 
			copyArg(msg,"RequestedDocumentAttributes",params,undefined,false); 
			copyArg(msg,"QueryResultTypeFilter",params,undefined,false); 
			copyArg(msg,"DocumentRelevanceOverrideConfigurations",params,undefined,false); 
			copyArg(msg,"PageNumber",params,undefined,false); 
			copyArg(msg,"PageSize",params,undefined,false); 
			copyArg(msg,"SortingConfiguration",params,undefined,false); 
			copyArg(msg,"UserContext",params,undefined,false); 
			copyArg(msg,"VisitorId",params,undefined,false); 
			

			svc.query(params,cb);
		}

		
		service.StartDataSourceSyncJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"IndexId",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IndexId",params,undefined,false); 
			

			svc.startDataSourceSyncJob(params,cb);
		}

		
		service.StopDataSourceSyncJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"IndexId",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IndexId",params,undefined,false); 
			

			svc.stopDataSourceSyncJob(params,cb);
		}

		
		service.SubmitFeedback=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IndexId",params,undefined,false); 
			copyArg(n,"QueryId",params,undefined,false); 
			
			copyArg(msg,"IndexId",params,undefined,false); 
			copyArg(msg,"QueryId",params,undefined,false); 
			copyArg(msg,"ClickFeedbackItems",params,undefined,false); 
			copyArg(msg,"RelevanceFeedbackItems",params,undefined,false); 
			

			svc.submitFeedback(params,cb);
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

		
		service.UpdateDataSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"IndexId",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"IndexId",params,undefined,false); 
			copyArg(msg,"Configuration",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Schedule",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			

			svc.updateDataSource(params,cb);
		}

		
		service.UpdateIndex=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DocumentMetadataConfigurationUpdates",params,undefined,true); 
			copyArg(msg,"CapacityUnits",params,undefined,true); 
			copyArg(msg,"UserTokenConfigurations",params,undefined,true); 
			copyArg(msg,"UserContextPolicy",params,undefined,false); 
			

			svc.updateIndex(params,cb);
		}

		
		service.UpdateQuerySuggestionsBlockList=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IndexId",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"IndexId",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"SourceS3Path",params,undefined,true); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			

			svc.updateQuerySuggestionsBlockList(params,cb);
		}

		
		service.UpdateQuerySuggestionsConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IndexId",params,undefined,false); 
			
			copyArg(msg,"IndexId",params,undefined,false); 
			copyArg(msg,"Mode",params,undefined,false); 
			copyArg(msg,"QueryLogLookBackWindowInDays",params,undefined,false); 
			copyArg(msg,"IncludeQueriesWithoutUserInformation",params,undefined,false); 
			copyArg(msg,"MinimumNumberOfQueryingUsers",params,undefined,false); 
			copyArg(msg,"MinimumQueryCount",params,undefined,false); 
			

			svc.updateQuerySuggestionsConfig(params,cb);
		}

		
		service.UpdateThesaurus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"IndexId",params,undefined,false); 
			
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"IndexId",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"SourceS3Path",params,undefined,true); 
			

			svc.updateThesaurus(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Kendra", AmazonAPINode);

};
