
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

		var awsService = new AWS.ConfigService( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.ConfigService(msg.AWSConfig) : awsService;

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

		
		service.BatchGetAggregateResourceConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationAggregatorName",params,undefined,false); 
			copyArg(n,"ResourceIdentifiers",params,undefined,false); 
			
			copyArg(msg,"ConfigurationAggregatorName",params,undefined,false); 
			copyArg(msg,"ResourceIdentifiers",params,undefined,false); 
			

			svc.batchGetAggregateResourceConfig(params,cb);
		}

		
		service.BatchGetResourceConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceKeys",params,undefined,true); 
			
			copyArg(msg,"resourceKeys",params,undefined,true); 
			

			svc.batchGetResourceConfig(params,cb);
		}

		
		service.DeleteAggregationAuthorization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AuthorizedAccountId",params,undefined,false); 
			copyArg(n,"AuthorizedAwsRegion",params,undefined,false); 
			
			copyArg(msg,"AuthorizedAccountId",params,undefined,false); 
			copyArg(msg,"AuthorizedAwsRegion",params,undefined,false); 
			

			svc.deleteAggregationAuthorization(params,cb);
		}

		
		service.DeleteConfigRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigRuleName",params,undefined,false); 
			
			copyArg(msg,"ConfigRuleName",params,undefined,false); 
			

			svc.deleteConfigRule(params,cb);
		}

		
		service.DeleteConfigurationAggregator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationAggregatorName",params,undefined,false); 
			
			copyArg(msg,"ConfigurationAggregatorName",params,undefined,false); 
			

			svc.deleteConfigurationAggregator(params,cb);
		}

		
		service.DeleteConfigurationRecorder=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationRecorderName",params,undefined,false); 
			
			copyArg(msg,"ConfigurationRecorderName",params,undefined,false); 
			

			svc.deleteConfigurationRecorder(params,cb);
		}

		
		service.DeleteConformancePack=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConformancePackName",params,undefined,false); 
			
			copyArg(msg,"ConformancePackName",params,undefined,false); 
			

			svc.deleteConformancePack(params,cb);
		}

		
		service.DeleteDeliveryChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeliveryChannelName",params,undefined,false); 
			
			copyArg(msg,"DeliveryChannelName",params,undefined,false); 
			

			svc.deleteDeliveryChannel(params,cb);
		}

		
		service.DeleteEvaluationResults=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigRuleName",params,undefined,false); 
			
			copyArg(msg,"ConfigRuleName",params,undefined,false); 
			

			svc.deleteEvaluationResults(params,cb);
		}

		
		service.DeleteOrganizationConfigRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationConfigRuleName",params,undefined,false); 
			
			copyArg(msg,"OrganizationConfigRuleName",params,undefined,false); 
			

			svc.deleteOrganizationConfigRule(params,cb);
		}

		
		service.DeleteOrganizationConformancePack=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationConformancePackName",params,undefined,false); 
			
			copyArg(msg,"OrganizationConformancePackName",params,undefined,false); 
			

			svc.deleteOrganizationConformancePack(params,cb);
		}

		
		service.DeletePendingAggregationRequest=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RequesterAccountId",params,undefined,false); 
			copyArg(n,"RequesterAwsRegion",params,undefined,false); 
			
			copyArg(msg,"RequesterAccountId",params,undefined,false); 
			copyArg(msg,"RequesterAwsRegion",params,undefined,false); 
			

			svc.deletePendingAggregationRequest(params,cb);
		}

		
		service.DeleteRemediationConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigRuleName",params,undefined,false); 
			
			copyArg(msg,"ConfigRuleName",params,undefined,false); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			

			svc.deleteRemediationConfiguration(params,cb);
		}

		
		service.DeleteRemediationExceptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigRuleName",params,undefined,false); 
			copyArg(n,"ResourceKeys",params,undefined,true); 
			
			copyArg(msg,"ConfigRuleName",params,undefined,false); 
			copyArg(msg,"ResourceKeys",params,undefined,true); 
			

			svc.deleteRemediationExceptions(params,cb);
		}

		
		service.DeleteResourceConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceType",params,undefined,false); 
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"ResourceType",params,undefined,false); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			

			svc.deleteResourceConfig(params,cb);
		}

		
		service.DeleteRetentionConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RetentionConfigurationName",params,undefined,false); 
			
			copyArg(msg,"RetentionConfigurationName",params,undefined,false); 
			

			svc.deleteRetentionConfiguration(params,cb);
		}

		
		service.DeleteStoredQuery=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueryName",params,undefined,false); 
			
			copyArg(msg,"QueryName",params,undefined,false); 
			

			svc.deleteStoredQuery(params,cb);
		}

		
		service.DeliverConfigSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"deliveryChannelName",params,undefined,false); 
			
			copyArg(msg,"deliveryChannelName",params,undefined,false); 
			

			svc.deliverConfigSnapshot(params,cb);
		}

		
		service.DescribeAggregateComplianceByConfigRules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationAggregatorName",params,undefined,false); 
			
			copyArg(msg,"ConfigurationAggregatorName",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeAggregateComplianceByConfigRules(params,cb);
		}

		
		service.DescribeAggregateComplianceByConformancePacks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationAggregatorName",params,undefined,false); 
			
			copyArg(msg,"ConfigurationAggregatorName",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeAggregateComplianceByConformancePacks(params,cb);
		}

		
		service.DescribeAggregationAuthorizations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeAggregationAuthorizations(params,cb);
		}

		
		service.DescribeComplianceByConfigRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ConfigRuleNames",params,undefined,true); 
			copyArg(msg,"ComplianceTypes",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeComplianceByConfigRule(params,cb);
		}

		
		service.DescribeComplianceByResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ResourceType",params,undefined,false); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"ComplianceTypes",params,undefined,true); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeComplianceByResource(params,cb);
		}

		
		service.DescribeConfigRuleEvaluationStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ConfigRuleNames",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.describeConfigRuleEvaluationStatus(params,cb);
		}

		
		service.DescribeConfigRules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ConfigRuleNames",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeConfigRules(params,cb);
		}

		
		service.DescribeConfigurationAggregatorSourcesStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationAggregatorName",params,undefined,false); 
			
			copyArg(msg,"ConfigurationAggregatorName",params,undefined,false); 
			copyArg(msg,"UpdateStatus",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.describeConfigurationAggregatorSourcesStatus(params,cb);
		}

		
		service.DescribeConfigurationAggregators=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ConfigurationAggregatorNames",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.describeConfigurationAggregators(params,cb);
		}

		
		service.DescribeConfigurationRecorderStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ConfigurationRecorderNames",params,undefined,true); 
			

			svc.describeConfigurationRecorderStatus(params,cb);
		}

		
		service.DescribeConfigurationRecorders=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ConfigurationRecorderNames",params,undefined,true); 
			

			svc.describeConfigurationRecorders(params,cb);
		}

		
		service.DescribeConformancePackCompliance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConformancePackName",params,undefined,false); 
			
			copyArg(msg,"ConformancePackName",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeConformancePackCompliance(params,cb);
		}

		
		service.DescribeConformancePackStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ConformancePackNames",params,undefined,true); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeConformancePackStatus(params,cb);
		}

		
		service.DescribeConformancePacks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ConformancePackNames",params,undefined,true); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeConformancePacks(params,cb);
		}

		
		service.DescribeDeliveryChannelStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DeliveryChannelNames",params,undefined,true); 
			

			svc.describeDeliveryChannelStatus(params,cb);
		}

		
		service.DescribeDeliveryChannels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DeliveryChannelNames",params,undefined,true); 
			

			svc.describeDeliveryChannels(params,cb);
		}

		
		service.DescribeOrganizationConfigRuleStatuses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"OrganizationConfigRuleNames",params,undefined,true); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeOrganizationConfigRuleStatuses(params,cb);
		}

		
		service.DescribeOrganizationConfigRules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"OrganizationConfigRuleNames",params,undefined,true); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeOrganizationConfigRules(params,cb);
		}

		
		service.DescribeOrganizationConformancePackStatuses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"OrganizationConformancePackNames",params,undefined,true); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeOrganizationConformancePackStatuses(params,cb);
		}

		
		service.DescribeOrganizationConformancePacks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"OrganizationConformancePackNames",params,undefined,true); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeOrganizationConformancePacks(params,cb);
		}

		
		service.DescribePendingAggregationRequests=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describePendingAggregationRequests(params,cb);
		}

		
		service.DescribeRemediationConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigRuleNames",params,undefined,true); 
			
			copyArg(msg,"ConfigRuleNames",params,undefined,true); 
			

			svc.describeRemediationConfigurations(params,cb);
		}

		
		service.DescribeRemediationExceptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigRuleName",params,undefined,false); 
			
			copyArg(msg,"ConfigRuleName",params,undefined,false); 
			copyArg(msg,"ResourceKeys",params,undefined,true); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeRemediationExceptions(params,cb);
		}

		
		service.DescribeRemediationExecutionStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigRuleName",params,undefined,false); 
			
			copyArg(msg,"ConfigRuleName",params,undefined,false); 
			copyArg(msg,"ResourceKeys",params,undefined,true); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeRemediationExecutionStatus(params,cb);
		}

		
		service.DescribeRetentionConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"RetentionConfigurationNames",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeRetentionConfigurations(params,cb);
		}

		
		service.GetAggregateComplianceDetailsByConfigRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationAggregatorName",params,undefined,false); 
			copyArg(n,"ConfigRuleName",params,undefined,false); 
			copyArg(n,"AccountId",params,undefined,false); 
			copyArg(n,"AwsRegion",params,undefined,false); 
			
			copyArg(msg,"ConfigurationAggregatorName",params,undefined,false); 
			copyArg(msg,"ConfigRuleName",params,undefined,false); 
			copyArg(msg,"AccountId",params,undefined,false); 
			copyArg(msg,"AwsRegion",params,undefined,false); 
			copyArg(msg,"ComplianceType",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getAggregateComplianceDetailsByConfigRule(params,cb);
		}

		
		service.GetAggregateConfigRuleComplianceSummary=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationAggregatorName",params,undefined,false); 
			
			copyArg(msg,"ConfigurationAggregatorName",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"GroupByKey",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getAggregateConfigRuleComplianceSummary(params,cb);
		}

		
		service.GetAggregateConformancePackComplianceSummary=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationAggregatorName",params,undefined,false); 
			
			copyArg(msg,"ConfigurationAggregatorName",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"GroupByKey",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getAggregateConformancePackComplianceSummary(params,cb);
		}

		
		service.GetAggregateDiscoveredResourceCounts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationAggregatorName",params,undefined,false); 
			
			copyArg(msg,"ConfigurationAggregatorName",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"GroupByKey",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getAggregateDiscoveredResourceCounts(params,cb);
		}

		
		service.GetAggregateResourceConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationAggregatorName",params,undefined,false); 
			copyArg(n,"ResourceIdentifier",params,undefined,true); 
			
			copyArg(msg,"ConfigurationAggregatorName",params,undefined,false); 
			copyArg(msg,"ResourceIdentifier",params,undefined,true); 
			

			svc.getAggregateResourceConfig(params,cb);
		}

		
		service.GetComplianceDetailsByConfigRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigRuleName",params,undefined,false); 
			
			copyArg(msg,"ConfigRuleName",params,undefined,false); 
			copyArg(msg,"ComplianceTypes",params,undefined,true); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getComplianceDetailsByConfigRule(params,cb);
		}

		
		service.GetComplianceDetailsByResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceType",params,undefined,false); 
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"ResourceType",params,undefined,false); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"ComplianceTypes",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getComplianceDetailsByResource(params,cb);
		}

		
		service.GetComplianceSummaryByConfigRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getComplianceSummaryByConfigRule(params,cb);
		}

		
		service.GetComplianceSummaryByResourceType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ResourceTypes",params,undefined,true); 
			

			svc.getComplianceSummaryByResourceType(params,cb);
		}

		
		service.GetConformancePackComplianceDetails=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConformancePackName",params,undefined,false); 
			
			copyArg(msg,"ConformancePackName",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getConformancePackComplianceDetails(params,cb);
		}

		
		service.GetConformancePackComplianceSummary=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConformancePackNames",params,undefined,false); 
			
			copyArg(msg,"ConformancePackNames",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getConformancePackComplianceSummary(params,cb);
		}

		
		service.GetDiscoveredResourceCounts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"resourceTypes",params,undefined,true); 
			copyArg(msg,"limit",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.getDiscoveredResourceCounts(params,cb);
		}

		
		service.GetOrganizationConfigRuleDetailedStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationConfigRuleName",params,undefined,false); 
			
			copyArg(msg,"OrganizationConfigRuleName",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getOrganizationConfigRuleDetailedStatus(params,cb);
		}

		
		service.GetOrganizationConformancePackDetailedStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationConformancePackName",params,undefined,false); 
			
			copyArg(msg,"OrganizationConformancePackName",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getOrganizationConformancePackDetailedStatus(params,cb);
		}

		
		service.GetResourceConfigHistory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceType",params,undefined,false); 
			copyArg(n,"resourceId",params,undefined,false); 
			
			copyArg(msg,"resourceType",params,undefined,false); 
			copyArg(msg,"resourceId",params,undefined,false); 
			copyArg(msg,"laterTime",params,undefined,false); 
			copyArg(msg,"earlierTime",params,undefined,false); 
			copyArg(msg,"chronologicalOrder",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.getResourceConfigHistory(params,cb);
		}

		
		service.GetStoredQuery=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueryName",params,undefined,false); 
			
			copyArg(msg,"QueryName",params,undefined,false); 
			

			svc.getStoredQuery(params,cb);
		}

		
		service.ListAggregateDiscoveredResources=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationAggregatorName",params,undefined,false); 
			copyArg(n,"ResourceType",params,undefined,false); 
			
			copyArg(msg,"ConfigurationAggregatorName",params,undefined,false); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listAggregateDiscoveredResources(params,cb);
		}

		
		service.ListDiscoveredResources=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceType",params,undefined,false); 
			
			copyArg(msg,"resourceType",params,undefined,false); 
			copyArg(msg,"resourceIds",params,undefined,false); 
			copyArg(msg,"resourceName",params,undefined,false); 
			copyArg(msg,"limit",params,undefined,false); 
			copyArg(msg,"includeDeletedResources",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listDiscoveredResources(params,cb);
		}

		
		service.ListStoredQueries=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listStoredQueries(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutAggregationAuthorization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AuthorizedAccountId",params,undefined,false); 
			copyArg(n,"AuthorizedAwsRegion",params,undefined,false); 
			
			copyArg(msg,"AuthorizedAccountId",params,undefined,false); 
			copyArg(msg,"AuthorizedAwsRegion",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.putAggregationAuthorization(params,cb);
		}

		
		service.PutConfigRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigRule",params,undefined,true); 
			
			copyArg(msg,"ConfigRule",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.putConfigRule(params,cb);
		}

		
		service.PutConfigurationAggregator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationAggregatorName",params,undefined,false); 
			
			copyArg(msg,"ConfigurationAggregatorName",params,undefined,false); 
			copyArg(msg,"AccountAggregationSources",params,undefined,true); 
			copyArg(msg,"OrganizationAggregationSource",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.putConfigurationAggregator(params,cb);
		}

		
		service.PutConfigurationRecorder=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationRecorder",params,undefined,true); 
			
			copyArg(msg,"ConfigurationRecorder",params,undefined,true); 
			

			svc.putConfigurationRecorder(params,cb);
		}

		
		service.PutConformancePack=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConformancePackName",params,undefined,false); 
			
			copyArg(msg,"ConformancePackName",params,undefined,false); 
			copyArg(msg,"TemplateS3Uri",params,undefined,false); 
			copyArg(msg,"TemplateBody",params,undefined,false); 
			copyArg(msg,"DeliveryS3Bucket",params,undefined,false); 
			copyArg(msg,"DeliveryS3KeyPrefix",params,undefined,false); 
			copyArg(msg,"ConformancePackInputParameters",params,undefined,true); 
			

			svc.putConformancePack(params,cb);
		}

		
		service.PutDeliveryChannel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeliveryChannel",params,undefined,true); 
			
			copyArg(msg,"DeliveryChannel",params,undefined,true); 
			

			svc.putDeliveryChannel(params,cb);
		}

		
		service.PutEvaluations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResultToken",params,undefined,false); 
			
			copyArg(msg,"Evaluations",params,undefined,true); 
			copyArg(msg,"ResultToken",params,undefined,false); 
			copyArg(msg,"TestMode",params,undefined,false); 
			

			svc.putEvaluations(params,cb);
		}

		
		service.PutExternalEvaluation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigRuleName",params,undefined,false); 
			copyArg(n,"ExternalEvaluation",params,undefined,false); 
			
			copyArg(msg,"ConfigRuleName",params,undefined,false); 
			copyArg(msg,"ExternalEvaluation",params,undefined,false); 
			

			svc.putExternalEvaluation(params,cb);
		}

		
		service.PutOrganizationConfigRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationConfigRuleName",params,undefined,false); 
			
			copyArg(msg,"OrganizationConfigRuleName",params,undefined,false); 
			copyArg(msg,"OrganizationManagedRuleMetadata",params,undefined,true); 
			copyArg(msg,"OrganizationCustomRuleMetadata",params,undefined,true); 
			copyArg(msg,"ExcludedAccounts",params,undefined,true); 
			

			svc.putOrganizationConfigRule(params,cb);
		}

		
		service.PutOrganizationConformancePack=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OrganizationConformancePackName",params,undefined,false); 
			
			copyArg(msg,"OrganizationConformancePackName",params,undefined,false); 
			copyArg(msg,"TemplateS3Uri",params,undefined,false); 
			copyArg(msg,"TemplateBody",params,undefined,false); 
			copyArg(msg,"DeliveryS3Bucket",params,undefined,false); 
			copyArg(msg,"DeliveryS3KeyPrefix",params,undefined,false); 
			copyArg(msg,"ConformancePackInputParameters",params,undefined,true); 
			copyArg(msg,"ExcludedAccounts",params,undefined,true); 
			

			svc.putOrganizationConformancePack(params,cb);
		}

		
		service.PutRemediationConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RemediationConfigurations",params,undefined,true); 
			
			copyArg(msg,"RemediationConfigurations",params,undefined,true); 
			

			svc.putRemediationConfigurations(params,cb);
		}

		
		service.PutRemediationExceptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigRuleName",params,undefined,false); 
			copyArg(n,"ResourceKeys",params,undefined,true); 
			
			copyArg(msg,"ConfigRuleName",params,undefined,false); 
			copyArg(msg,"ResourceKeys",params,undefined,true); 
			copyArg(msg,"Message",params,undefined,false); 
			copyArg(msg,"ExpirationTime",params,undefined,false); 
			

			svc.putRemediationExceptions(params,cb);
		}

		
		service.PutResourceConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceType",params,undefined,false); 
			copyArg(n,"SchemaVersionId",params,undefined,false); 
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"Configuration",params,undefined,false); 
			
			copyArg(msg,"ResourceType",params,undefined,false); 
			copyArg(msg,"SchemaVersionId",params,undefined,false); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"ResourceName",params,undefined,false); 
			copyArg(msg,"Configuration",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.putResourceConfig(params,cb);
		}

		
		service.PutRetentionConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RetentionPeriodInDays",params,undefined,false); 
			
			copyArg(msg,"RetentionPeriodInDays",params,undefined,false); 
			

			svc.putRetentionConfiguration(params,cb);
		}

		
		service.PutStoredQuery=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StoredQuery",params,undefined,true); 
			
			copyArg(msg,"StoredQuery",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.putStoredQuery(params,cb);
		}

		
		service.SelectAggregateResourceConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Expression",params,undefined,false); 
			copyArg(n,"ConfigurationAggregatorName",params,undefined,false); 
			
			copyArg(msg,"Expression",params,undefined,false); 
			copyArg(msg,"ConfigurationAggregatorName",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.selectAggregateResourceConfig(params,cb);
		}

		
		service.SelectResourceConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Expression",params,undefined,false); 
			
			copyArg(msg,"Expression",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.selectResourceConfig(params,cb);
		}

		
		service.StartConfigRulesEvaluation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ConfigRuleNames",params,undefined,false); 
			

			svc.startConfigRulesEvaluation(params,cb);
		}

		
		service.StartConfigurationRecorder=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationRecorderName",params,undefined,false); 
			
			copyArg(msg,"ConfigurationRecorderName",params,undefined,false); 
			

			svc.startConfigurationRecorder(params,cb);
		}

		
		service.StartRemediationExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigRuleName",params,undefined,false); 
			copyArg(n,"ResourceKeys",params,undefined,true); 
			
			copyArg(msg,"ConfigRuleName",params,undefined,false); 
			copyArg(msg,"ResourceKeys",params,undefined,true); 
			

			svc.startRemediationExecution(params,cb);
		}

		
		service.StopConfigurationRecorder=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationRecorderName",params,undefined,false); 
			
			copyArg(msg,"ConfigurationRecorderName",params,undefined,false); 
			

			svc.stopConfigurationRecorder(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS ConfigService", AmazonAPINode);

};
