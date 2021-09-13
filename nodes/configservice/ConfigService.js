
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

		var awsService = new AWS.ConfigService( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.ConfigService(msg.AWSConfig) : awsService;

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
		
			service.BatchGetAggregateResourceConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationAggregatorName",params,undefined,false); 
			copyArgs(n,"ResourceIdentifiers",params,undefined,false); 
			
			copyArgs(n,"ConfigurationAggregatorName",params,undefined,false); 
			copyArgs(n,"ResourceIdentifiers",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationAggregatorName",params,undefined,false); 
			copyArgs(msg,"ResourceIdentifiers",params,undefined,false); 
			

			svc.batchGetAggregateResourceConfig(params,cb);
		}
			service.BatchGetResourceConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceKeys",params,undefined,true); 
			
			copyArgs(n,"resourceKeys",params,undefined,true); 
			
			copyArgs(msg,"resourceKeys",params,undefined,true); 
			

			svc.batchGetResourceConfig(params,cb);
		}
			service.DeleteAggregationAuthorization=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AuthorizedAccountId",params,undefined,false); 
			copyArgs(n,"AuthorizedAwsRegion",params,undefined,false); 
			
			copyArgs(n,"AuthorizedAccountId",params,undefined,false); 
			copyArgs(n,"AuthorizedAwsRegion",params,undefined,false); 
			
			copyArgs(msg,"AuthorizedAccountId",params,undefined,false); 
			copyArgs(msg,"AuthorizedAwsRegion",params,undefined,false); 
			

			svc.deleteAggregationAuthorization(params,cb);
		}
			service.DeleteConfigRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigRuleName",params,undefined,false); 
			
			copyArgs(n,"ConfigRuleName",params,undefined,false); 
			
			copyArgs(msg,"ConfigRuleName",params,undefined,false); 
			

			svc.deleteConfigRule(params,cb);
		}
			service.DeleteConfigurationAggregator=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationAggregatorName",params,undefined,false); 
			
			copyArgs(n,"ConfigurationAggregatorName",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationAggregatorName",params,undefined,false); 
			

			svc.deleteConfigurationAggregator(params,cb);
		}
			service.DeleteConfigurationRecorder=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationRecorderName",params,undefined,false); 
			
			copyArgs(n,"ConfigurationRecorderName",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationRecorderName",params,undefined,false); 
			

			svc.deleteConfigurationRecorder(params,cb);
		}
			service.DeleteConformancePack=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConformancePackName",params,undefined,false); 
			
			copyArgs(n,"ConformancePackName",params,undefined,false); 
			
			copyArgs(msg,"ConformancePackName",params,undefined,false); 
			

			svc.deleteConformancePack(params,cb);
		}
			service.DeleteDeliveryChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeliveryChannelName",params,undefined,false); 
			
			copyArgs(n,"DeliveryChannelName",params,undefined,false); 
			
			copyArgs(msg,"DeliveryChannelName",params,undefined,false); 
			

			svc.deleteDeliveryChannel(params,cb);
		}
			service.DeleteEvaluationResults=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigRuleName",params,undefined,false); 
			
			copyArgs(n,"ConfigRuleName",params,undefined,false); 
			
			copyArgs(msg,"ConfigRuleName",params,undefined,false); 
			

			svc.deleteEvaluationResults(params,cb);
		}
			service.DeleteOrganizationConfigRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationConfigRuleName",params,undefined,false); 
			
			copyArgs(n,"OrganizationConfigRuleName",params,undefined,false); 
			
			copyArgs(msg,"OrganizationConfigRuleName",params,undefined,false); 
			

			svc.deleteOrganizationConfigRule(params,cb);
		}
			service.DeleteOrganizationConformancePack=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationConformancePackName",params,undefined,false); 
			
			copyArgs(n,"OrganizationConformancePackName",params,undefined,false); 
			
			copyArgs(msg,"OrganizationConformancePackName",params,undefined,false); 
			

			svc.deleteOrganizationConformancePack(params,cb);
		}
			service.DeletePendingAggregationRequest=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RequesterAccountId",params,undefined,false); 
			copyArgs(n,"RequesterAwsRegion",params,undefined,false); 
			
			copyArgs(n,"RequesterAccountId",params,undefined,false); 
			copyArgs(n,"RequesterAwsRegion",params,undefined,false); 
			
			copyArgs(msg,"RequesterAccountId",params,undefined,false); 
			copyArgs(msg,"RequesterAwsRegion",params,undefined,false); 
			

			svc.deletePendingAggregationRequest(params,cb);
		}
			service.DeleteRemediationConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigRuleName",params,undefined,false); 
			
			copyArgs(n,"ConfigRuleName",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			
			copyArgs(msg,"ConfigRuleName",params,undefined,false); 
			copyArgs(msg,"ResourceType",params,undefined,false); 
			

			svc.deleteRemediationConfiguration(params,cb);
		}
			service.DeleteRemediationExceptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigRuleName",params,undefined,false); 
			copyArgs(n,"ResourceKeys",params,undefined,true); 
			
			copyArgs(n,"ConfigRuleName",params,undefined,false); 
			copyArgs(n,"ResourceKeys",params,undefined,true); 
			
			copyArgs(msg,"ConfigRuleName",params,undefined,false); 
			copyArgs(msg,"ResourceKeys",params,undefined,true); 
			

			svc.deleteRemediationExceptions(params,cb);
		}
			service.DeleteResourceConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(msg,"ResourceType",params,undefined,false); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			

			svc.deleteResourceConfig(params,cb);
		}
			service.DeleteRetentionConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RetentionConfigurationName",params,undefined,false); 
			
			copyArgs(n,"RetentionConfigurationName",params,undefined,false); 
			
			copyArgs(msg,"RetentionConfigurationName",params,undefined,false); 
			

			svc.deleteRetentionConfiguration(params,cb);
		}
			service.DeleteStoredQuery=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QueryName",params,undefined,false); 
			
			copyArgs(n,"QueryName",params,undefined,false); 
			
			copyArgs(msg,"QueryName",params,undefined,false); 
			

			svc.deleteStoredQuery(params,cb);
		}
			service.DeliverConfigSnapshot=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"deliveryChannelName",params,undefined,false); 
			
			copyArgs(n,"deliveryChannelName",params,undefined,false); 
			
			copyArgs(msg,"deliveryChannelName",params,undefined,false); 
			

			svc.deliverConfigSnapshot(params,cb);
		}
			service.DescribeAggregateComplianceByConfigRules=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationAggregatorName",params,undefined,false); 
			
			copyArgs(n,"ConfigurationAggregatorName",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationAggregatorName",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeAggregateComplianceByConfigRules(params,cb);
		}
			service.DescribeAggregateComplianceByConformancePacks=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationAggregatorName",params,undefined,false); 
			
			copyArgs(n,"ConfigurationAggregatorName",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationAggregatorName",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeAggregateComplianceByConformancePacks(params,cb);
		}
			service.DescribeAggregationAuthorizations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeAggregationAuthorizations(params,cb);
		}
			service.DescribeComplianceByConfigRule=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ConfigRuleNames",params,undefined,true); 
			copyArgs(n,"ComplianceTypes",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ConfigRuleNames",params,undefined,true); 
			copyArgs(msg,"ComplianceTypes",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeComplianceByConfigRule(params,cb);
		}
			service.DescribeComplianceByResource=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"ComplianceTypes",params,undefined,true); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ResourceType",params,undefined,false); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"ComplianceTypes",params,undefined,true); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeComplianceByResource(params,cb);
		}
			service.DescribeConfigRuleEvaluationStatus=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ConfigRuleNames",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"ConfigRuleNames",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.describeConfigRuleEvaluationStatus(params,cb);
		}
			service.DescribeConfigRules=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ConfigRuleNames",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ConfigRuleNames",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeConfigRules(params,cb);
		}
			service.DescribeConfigurationAggregatorSourcesStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationAggregatorName",params,undefined,false); 
			
			copyArgs(n,"ConfigurationAggregatorName",params,undefined,false); 
			copyArgs(n,"UpdateStatus",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationAggregatorName",params,undefined,false); 
			copyArgs(msg,"UpdateStatus",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.describeConfigurationAggregatorSourcesStatus(params,cb);
		}
			service.DescribeConfigurationAggregators=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ConfigurationAggregatorNames",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationAggregatorNames",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.describeConfigurationAggregators(params,cb);
		}
			service.DescribeConfigurationRecorderStatus=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ConfigurationRecorderNames",params,undefined,true); 
			
			copyArgs(msg,"ConfigurationRecorderNames",params,undefined,true); 
			

			svc.describeConfigurationRecorderStatus(params,cb);
		}
			service.DescribeConfigurationRecorders=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ConfigurationRecorderNames",params,undefined,true); 
			
			copyArgs(msg,"ConfigurationRecorderNames",params,undefined,true); 
			

			svc.describeConfigurationRecorders(params,cb);
		}
			service.DescribeConformancePackCompliance=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConformancePackName",params,undefined,false); 
			
			copyArgs(n,"ConformancePackName",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ConformancePackName",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeConformancePackCompliance(params,cb);
		}
			service.DescribeConformancePackStatus=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ConformancePackNames",params,undefined,true); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ConformancePackNames",params,undefined,true); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeConformancePackStatus(params,cb);
		}
			service.DescribeConformancePacks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ConformancePackNames",params,undefined,true); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ConformancePackNames",params,undefined,true); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeConformancePacks(params,cb);
		}
			service.DescribeDeliveryChannelStatus=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DeliveryChannelNames",params,undefined,true); 
			
			copyArgs(msg,"DeliveryChannelNames",params,undefined,true); 
			

			svc.describeDeliveryChannelStatus(params,cb);
		}
			service.DescribeDeliveryChannels=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DeliveryChannelNames",params,undefined,true); 
			
			copyArgs(msg,"DeliveryChannelNames",params,undefined,true); 
			

			svc.describeDeliveryChannels(params,cb);
		}
			service.DescribeOrganizationConfigRuleStatuses=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"OrganizationConfigRuleNames",params,undefined,true); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"OrganizationConfigRuleNames",params,undefined,true); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeOrganizationConfigRuleStatuses(params,cb);
		}
			service.DescribeOrganizationConfigRules=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"OrganizationConfigRuleNames",params,undefined,true); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"OrganizationConfigRuleNames",params,undefined,true); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeOrganizationConfigRules(params,cb);
		}
			service.DescribeOrganizationConformancePackStatuses=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"OrganizationConformancePackNames",params,undefined,true); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"OrganizationConformancePackNames",params,undefined,true); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeOrganizationConformancePackStatuses(params,cb);
		}
			service.DescribeOrganizationConformancePacks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"OrganizationConformancePackNames",params,undefined,true); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"OrganizationConformancePackNames",params,undefined,true); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeOrganizationConformancePacks(params,cb);
		}
			service.DescribePendingAggregationRequests=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describePendingAggregationRequests(params,cb);
		}
			service.DescribeRemediationConfigurations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigRuleNames",params,undefined,true); 
			
			copyArgs(n,"ConfigRuleNames",params,undefined,true); 
			
			copyArgs(msg,"ConfigRuleNames",params,undefined,true); 
			

			svc.describeRemediationConfigurations(params,cb);
		}
			service.DescribeRemediationExceptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigRuleName",params,undefined,false); 
			
			copyArgs(n,"ConfigRuleName",params,undefined,false); 
			copyArgs(n,"ResourceKeys",params,undefined,true); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ConfigRuleName",params,undefined,false); 
			copyArgs(msg,"ResourceKeys",params,undefined,true); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeRemediationExceptions(params,cb);
		}
			service.DescribeRemediationExecutionStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigRuleName",params,undefined,false); 
			
			copyArgs(n,"ConfigRuleName",params,undefined,false); 
			copyArgs(n,"ResourceKeys",params,undefined,true); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ConfigRuleName",params,undefined,false); 
			copyArgs(msg,"ResourceKeys",params,undefined,true); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeRemediationExecutionStatus(params,cb);
		}
			service.DescribeRetentionConfigurations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"RetentionConfigurationNames",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"RetentionConfigurationNames",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeRetentionConfigurations(params,cb);
		}
			service.GetAggregateComplianceDetailsByConfigRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationAggregatorName",params,undefined,false); 
			copyArgs(n,"ConfigRuleName",params,undefined,false); 
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"AwsRegion",params,undefined,false); 
			
			copyArgs(n,"ConfigurationAggregatorName",params,undefined,false); 
			copyArgs(n,"ConfigRuleName",params,undefined,false); 
			copyArgs(n,"AccountId",params,undefined,false); 
			copyArgs(n,"AwsRegion",params,undefined,false); 
			copyArgs(n,"ComplianceType",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationAggregatorName",params,undefined,false); 
			copyArgs(msg,"ConfigRuleName",params,undefined,false); 
			copyArgs(msg,"AccountId",params,undefined,false); 
			copyArgs(msg,"AwsRegion",params,undefined,false); 
			copyArgs(msg,"ComplianceType",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getAggregateComplianceDetailsByConfigRule(params,cb);
		}
			service.GetAggregateConfigRuleComplianceSummary=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationAggregatorName",params,undefined,false); 
			
			copyArgs(n,"ConfigurationAggregatorName",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(n,"GroupByKey",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationAggregatorName",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"GroupByKey",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getAggregateConfigRuleComplianceSummary(params,cb);
		}
			service.GetAggregateConformancePackComplianceSummary=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationAggregatorName",params,undefined,false); 
			
			copyArgs(n,"ConfigurationAggregatorName",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(n,"GroupByKey",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationAggregatorName",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"GroupByKey",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getAggregateConformancePackComplianceSummary(params,cb);
		}
			service.GetAggregateDiscoveredResourceCounts=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationAggregatorName",params,undefined,false); 
			
			copyArgs(n,"ConfigurationAggregatorName",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(n,"GroupByKey",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationAggregatorName",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"GroupByKey",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getAggregateDiscoveredResourceCounts(params,cb);
		}
			service.GetAggregateResourceConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationAggregatorName",params,undefined,false); 
			copyArgs(n,"ResourceIdentifier",params,undefined,true); 
			
			copyArgs(n,"ConfigurationAggregatorName",params,undefined,false); 
			copyArgs(n,"ResourceIdentifier",params,undefined,true); 
			
			copyArgs(msg,"ConfigurationAggregatorName",params,undefined,false); 
			copyArgs(msg,"ResourceIdentifier",params,undefined,true); 
			

			svc.getAggregateResourceConfig(params,cb);
		}
			service.GetComplianceDetailsByConfigRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigRuleName",params,undefined,false); 
			
			copyArgs(n,"ConfigRuleName",params,undefined,false); 
			copyArgs(n,"ComplianceTypes",params,undefined,true); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ConfigRuleName",params,undefined,false); 
			copyArgs(msg,"ComplianceTypes",params,undefined,true); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getComplianceDetailsByConfigRule(params,cb);
		}
			service.GetComplianceDetailsByResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"ComplianceTypes",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ResourceType",params,undefined,false); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"ComplianceTypes",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getComplianceDetailsByResource(params,cb);
		}
			service.GetComplianceSummaryByConfigRule=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getComplianceSummaryByConfigRule(params,cb);
		}
			service.GetComplianceSummaryByResourceType=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ResourceTypes",params,undefined,true); 
			
			copyArgs(msg,"ResourceTypes",params,undefined,true); 
			

			svc.getComplianceSummaryByResourceType(params,cb);
		}
			service.GetConformancePackComplianceDetails=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConformancePackName",params,undefined,false); 
			
			copyArgs(n,"ConformancePackName",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ConformancePackName",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getConformancePackComplianceDetails(params,cb);
		}
			service.GetConformancePackComplianceSummary=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConformancePackNames",params,undefined,false); 
			
			copyArgs(n,"ConformancePackNames",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ConformancePackNames",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getConformancePackComplianceSummary(params,cb);
		}
			service.GetDiscoveredResourceCounts=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"resourceTypes",params,undefined,true); 
			copyArgs(Number(n),"limit",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"resourceTypes",params,undefined,true); 
			copyArgs(msg,"limit",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.getDiscoveredResourceCounts(params,cb);
		}
			service.GetOrganizationConfigRuleDetailedStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationConfigRuleName",params,undefined,false); 
			
			copyArgs(n,"OrganizationConfigRuleName",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"OrganizationConfigRuleName",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getOrganizationConfigRuleDetailedStatus(params,cb);
		}
			service.GetOrganizationConformancePackDetailedStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationConformancePackName",params,undefined,false); 
			
			copyArgs(n,"OrganizationConformancePackName",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"OrganizationConformancePackName",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getOrganizationConformancePackDetailedStatus(params,cb);
		}
			service.GetResourceConfigHistory=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceType",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			
			copyArgs(n,"resourceType",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"laterTime",params,undefined,false); 
			copyArgs(n,"earlierTime",params,undefined,false); 
			copyArgs(n,"chronologicalOrder",params,undefined,false); 
			copyArgs(Number(n),"limit",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"resourceType",params,undefined,false); 
			copyArgs(msg,"resourceId",params,undefined,false); 
			copyArgs(msg,"laterTime",params,undefined,false); 
			copyArgs(msg,"earlierTime",params,undefined,false); 
			copyArgs(msg,"chronologicalOrder",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.getResourceConfigHistory(params,cb);
		}
			service.GetStoredQuery=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QueryName",params,undefined,false); 
			
			copyArgs(n,"QueryName",params,undefined,false); 
			
			copyArgs(msg,"QueryName",params,undefined,false); 
			

			svc.getStoredQuery(params,cb);
		}
			service.ListAggregateDiscoveredResources=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationAggregatorName",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			
			copyArgs(n,"ConfigurationAggregatorName",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationAggregatorName",params,undefined,false); 
			copyArgs(msg,"ResourceType",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listAggregateDiscoveredResources(params,cb);
		}
			service.ListDiscoveredResources=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceType",params,undefined,false); 
			
			copyArgs(n,"resourceType",params,undefined,false); 
			copyArgs(n,"resourceIds",params,undefined,false); 
			copyArgs(n,"resourceName",params,undefined,false); 
			copyArgs(Number(n),"limit",params,undefined,false); 
			copyArgs(Boolean(n),"includeDeletedResources",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"resourceType",params,undefined,false); 
			copyArgs(msg,"resourceIds",params,undefined,false); 
			copyArgs(msg,"resourceName",params,undefined,false); 
			copyArgs(msg,"limit",params,undefined,false); 
			copyArgs(msg,"includeDeletedResources",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listDiscoveredResources(params,cb);
		}
			service.ListStoredQueries=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listStoredQueries(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.PutAggregationAuthorization=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AuthorizedAccountId",params,undefined,false); 
			copyArgs(n,"AuthorizedAwsRegion",params,undefined,false); 
			
			copyArgs(n,"AuthorizedAccountId",params,undefined,false); 
			copyArgs(n,"AuthorizedAwsRegion",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"AuthorizedAccountId",params,undefined,false); 
			copyArgs(msg,"AuthorizedAwsRegion",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.putAggregationAuthorization(params,cb);
		}
			service.PutConfigRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigRule",params,undefined,true); 
			
			copyArgs(n,"ConfigRule",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ConfigRule",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.putConfigRule(params,cb);
		}
			service.PutConfigurationAggregator=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationAggregatorName",params,undefined,false); 
			
			copyArgs(n,"ConfigurationAggregatorName",params,undefined,false); 
			copyArgs(n,"AccountAggregationSources",params,undefined,true); 
			copyArgs(n,"OrganizationAggregationSource",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ConfigurationAggregatorName",params,undefined,false); 
			copyArgs(msg,"AccountAggregationSources",params,undefined,true); 
			copyArgs(msg,"OrganizationAggregationSource",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.putConfigurationAggregator(params,cb);
		}
			service.PutConfigurationRecorder=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationRecorder",params,undefined,true); 
			
			copyArgs(n,"ConfigurationRecorder",params,undefined,true); 
			
			copyArgs(msg,"ConfigurationRecorder",params,undefined,true); 
			

			svc.putConfigurationRecorder(params,cb);
		}
			service.PutConformancePack=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConformancePackName",params,undefined,false); 
			
			copyArgs(n,"ConformancePackName",params,undefined,false); 
			copyArgs(n,"TemplateS3Uri",params,undefined,false); 
			copyArgs(n,"TemplateBody",params,undefined,false); 
			copyArgs(n,"DeliveryS3Bucket",params,undefined,false); 
			copyArgs(n,"DeliveryS3KeyPrefix",params,undefined,false); 
			copyArgs(n,"ConformancePackInputParameters",params,undefined,true); 
			
			copyArgs(msg,"ConformancePackName",params,undefined,false); 
			copyArgs(msg,"TemplateS3Uri",params,undefined,false); 
			copyArgs(msg,"TemplateBody",params,undefined,false); 
			copyArgs(msg,"DeliveryS3Bucket",params,undefined,false); 
			copyArgs(msg,"DeliveryS3KeyPrefix",params,undefined,false); 
			copyArgs(msg,"ConformancePackInputParameters",params,undefined,true); 
			

			svc.putConformancePack(params,cb);
		}
			service.PutDeliveryChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeliveryChannel",params,undefined,true); 
			
			copyArgs(n,"DeliveryChannel",params,undefined,true); 
			
			copyArgs(msg,"DeliveryChannel",params,undefined,true); 
			

			svc.putDeliveryChannel(params,cb);
		}
			service.PutEvaluations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResultToken",params,undefined,false); 
			
			copyArgs(n,"Evaluations",params,undefined,true); 
			copyArgs(n,"ResultToken",params,undefined,false); 
			copyArgs(Boolean(n),"TestMode",params,undefined,false); 
			
			copyArgs(msg,"Evaluations",params,undefined,true); 
			copyArgs(msg,"ResultToken",params,undefined,false); 
			copyArgs(msg,"TestMode",params,undefined,false); 
			

			svc.putEvaluations(params,cb);
		}
			service.PutExternalEvaluation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigRuleName",params,undefined,false); 
			copyArgs(n,"ExternalEvaluation",params,undefined,false); 
			
			copyArgs(n,"ConfigRuleName",params,undefined,false); 
			copyArgs(n,"ExternalEvaluation",params,undefined,false); 
			
			copyArgs(msg,"ConfigRuleName",params,undefined,false); 
			copyArgs(msg,"ExternalEvaluation",params,undefined,false); 
			

			svc.putExternalEvaluation(params,cb);
		}
			service.PutOrganizationConfigRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationConfigRuleName",params,undefined,false); 
			
			copyArgs(n,"OrganizationConfigRuleName",params,undefined,false); 
			copyArgs(n,"OrganizationManagedRuleMetadata",params,undefined,true); 
			copyArgs(n,"OrganizationCustomRuleMetadata",params,undefined,true); 
			copyArgs(n,"ExcludedAccounts",params,undefined,true); 
			
			copyArgs(msg,"OrganizationConfigRuleName",params,undefined,false); 
			copyArgs(msg,"OrganizationManagedRuleMetadata",params,undefined,true); 
			copyArgs(msg,"OrganizationCustomRuleMetadata",params,undefined,true); 
			copyArgs(msg,"ExcludedAccounts",params,undefined,true); 
			

			svc.putOrganizationConfigRule(params,cb);
		}
			service.PutOrganizationConformancePack=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"OrganizationConformancePackName",params,undefined,false); 
			
			copyArgs(n,"OrganizationConformancePackName",params,undefined,false); 
			copyArgs(n,"TemplateS3Uri",params,undefined,false); 
			copyArgs(n,"TemplateBody",params,undefined,false); 
			copyArgs(n,"DeliveryS3Bucket",params,undefined,false); 
			copyArgs(n,"DeliveryS3KeyPrefix",params,undefined,false); 
			copyArgs(n,"ConformancePackInputParameters",params,undefined,true); 
			copyArgs(n,"ExcludedAccounts",params,undefined,true); 
			
			copyArgs(msg,"OrganizationConformancePackName",params,undefined,false); 
			copyArgs(msg,"TemplateS3Uri",params,undefined,false); 
			copyArgs(msg,"TemplateBody",params,undefined,false); 
			copyArgs(msg,"DeliveryS3Bucket",params,undefined,false); 
			copyArgs(msg,"DeliveryS3KeyPrefix",params,undefined,false); 
			copyArgs(msg,"ConformancePackInputParameters",params,undefined,true); 
			copyArgs(msg,"ExcludedAccounts",params,undefined,true); 
			

			svc.putOrganizationConformancePack(params,cb);
		}
			service.PutRemediationConfigurations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RemediationConfigurations",params,undefined,true); 
			
			copyArgs(n,"RemediationConfigurations",params,undefined,true); 
			
			copyArgs(msg,"RemediationConfigurations",params,undefined,true); 
			

			svc.putRemediationConfigurations(params,cb);
		}
			service.PutRemediationExceptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigRuleName",params,undefined,false); 
			copyArgs(n,"ResourceKeys",params,undefined,true); 
			
			copyArgs(n,"ConfigRuleName",params,undefined,false); 
			copyArgs(n,"ResourceKeys",params,undefined,true); 
			copyArgs(n,"Message",params,undefined,false); 
			copyArgs(n,"ExpirationTime",params,undefined,false); 
			
			copyArgs(msg,"ConfigRuleName",params,undefined,false); 
			copyArgs(msg,"ResourceKeys",params,undefined,true); 
			copyArgs(msg,"Message",params,undefined,false); 
			copyArgs(msg,"ExpirationTime",params,undefined,false); 
			

			svc.putRemediationExceptions(params,cb);
		}
			service.PutResourceConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"SchemaVersionId",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"Configuration",params,undefined,false); 
			
			copyArgs(n,"ResourceType",params,undefined,false); 
			copyArgs(n,"SchemaVersionId",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"ResourceName",params,undefined,false); 
			copyArgs(n,"Configuration",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceType",params,undefined,false); 
			copyArgs(msg,"SchemaVersionId",params,undefined,false); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"ResourceName",params,undefined,false); 
			copyArgs(msg,"Configuration",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.putResourceConfig(params,cb);
		}
			service.PutRetentionConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(Number(n),"RetentionPeriodInDays",params,undefined,false); 
			
			copyArgs(Number(n),"RetentionPeriodInDays",params,undefined,false); 
			
			copyArgs(msg,"RetentionPeriodInDays",params,undefined,false); 
			

			svc.putRetentionConfiguration(params,cb);
		}
			service.PutStoredQuery=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StoredQuery",params,undefined,true); 
			
			copyArgs(n,"StoredQuery",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"StoredQuery",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.putStoredQuery(params,cb);
		}
			service.SelectAggregateResourceConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Expression",params,undefined,false); 
			copyArgs(n,"ConfigurationAggregatorName",params,undefined,false); 
			
			copyArgs(n,"Expression",params,undefined,false); 
			copyArgs(n,"ConfigurationAggregatorName",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Expression",params,undefined,false); 
			copyArgs(msg,"ConfigurationAggregatorName",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.selectAggregateResourceConfig(params,cb);
		}
			service.SelectResourceConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Expression",params,undefined,false); 
			
			copyArgs(n,"Expression",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Expression",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.selectResourceConfig(params,cb);
		}
			service.StartConfigRulesEvaluation=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ConfigRuleNames",params,undefined,false); 
			
			copyArgs(msg,"ConfigRuleNames",params,undefined,false); 
			

			svc.startConfigRulesEvaluation(params,cb);
		}
			service.StartConfigurationRecorder=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationRecorderName",params,undefined,false); 
			
			copyArgs(n,"ConfigurationRecorderName",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationRecorderName",params,undefined,false); 
			

			svc.startConfigurationRecorder(params,cb);
		}
			service.StartRemediationExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigRuleName",params,undefined,false); 
			copyArgs(n,"ResourceKeys",params,undefined,true); 
			
			copyArgs(n,"ConfigRuleName",params,undefined,false); 
			copyArgs(n,"ResourceKeys",params,undefined,true); 
			
			copyArgs(msg,"ConfigRuleName",params,undefined,false); 
			copyArgs(msg,"ResourceKeys",params,undefined,true); 
			

			svc.startRemediationExecution(params,cb);
		}
			service.StopConfigurationRecorder=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationRecorderName",params,undefined,false); 
			
			copyArgs(n,"ConfigurationRecorderName",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationRecorderName",params,undefined,false); 
			

			svc.stopConfigurationRecorder(params,cb);
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
	
	}
	RED.nodes.registerType("AWS ConfigService", AmazonAPINode);

};
