
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

		var awsService = new AWS.CloudWatch( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.CloudWatch(msg.AWSConfig) : awsService;

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

		
		service.DeleteAlarms=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AlarmNames",params,undefined,true); 
			
			copyArgs(n,"AlarmNames",params,undefined,true); 
			
			copyArgs(msg,"AlarmNames",params,undefined,true); 
			

			svc.deleteAlarms(params,cb);
		}

		
		service.DeleteAnomalyDetector=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Namespace",params,undefined,false); 
			copyArgs(n,"MetricName",params,undefined,false); 
			copyArgs(n,"Stat",params,undefined,false); 
			
			copyArgs(n,"Namespace",params,undefined,false); 
			copyArgs(n,"MetricName",params,undefined,false); 
			copyArgs(n,"Dimensions",params,undefined,true); 
			copyArgs(n,"Stat",params,undefined,false); 
			
			copyArgs(msg,"Namespace",params,undefined,false); 
			copyArgs(msg,"MetricName",params,undefined,false); 
			copyArgs(msg,"Dimensions",params,undefined,true); 
			copyArgs(msg,"Stat",params,undefined,false); 
			

			svc.deleteAnomalyDetector(params,cb);
		}

		
		service.DeleteDashboards=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DashboardNames",params,undefined,false); 
			
			copyArgs(n,"DashboardNames",params,undefined,false); 
			
			copyArgs(msg,"DashboardNames",params,undefined,false); 
			

			svc.deleteDashboards(params,cb);
		}

		
		service.DeleteInsightRules=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RuleNames",params,undefined,true); 
			
			copyArgs(n,"RuleNames",params,undefined,true); 
			
			copyArgs(msg,"RuleNames",params,undefined,true); 
			

			svc.deleteInsightRules(params,cb);
		}

		
		service.DeleteMetricStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteMetricStream(params,cb);
		}

		
		service.DescribeAlarmHistory=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AlarmName",params,undefined,false); 
			copyArgs(n,"AlarmTypes",params,undefined,true); 
			copyArgs(n,"HistoryItemType",params,undefined,false); 
			copyArgs(n,"StartDate",params,undefined,false); 
			copyArgs(n,"EndDate",params,undefined,false); 
			copyArgs(n,"MaxRecords",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"ScanBy",params,undefined,false); 
			
			copyArgs(msg,"AlarmName",params,undefined,false); 
			copyArgs(msg,"AlarmTypes",params,undefined,true); 
			copyArgs(msg,"HistoryItemType",params,undefined,false); 
			copyArgs(msg,"StartDate",params,undefined,false); 
			copyArgs(msg,"EndDate",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"ScanBy",params,undefined,false); 
			

			svc.describeAlarmHistory(params,cb);
		}

		
		service.DescribeAlarms=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AlarmNames",params,undefined,true); 
			copyArgs(n,"AlarmNamePrefix",params,undefined,false); 
			copyArgs(n,"AlarmTypes",params,undefined,true); 
			copyArgs(n,"ChildrenOfAlarmName",params,undefined,false); 
			copyArgs(n,"ParentsOfAlarmName",params,undefined,false); 
			copyArgs(n,"StateValue",params,undefined,false); 
			copyArgs(n,"ActionPrefix",params,undefined,false); 
			copyArgs(n,"MaxRecords",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AlarmNames",params,undefined,true); 
			copyArgs(msg,"AlarmNamePrefix",params,undefined,false); 
			copyArgs(msg,"AlarmTypes",params,undefined,true); 
			copyArgs(msg,"ChildrenOfAlarmName",params,undefined,false); 
			copyArgs(msg,"ParentsOfAlarmName",params,undefined,false); 
			copyArgs(msg,"StateValue",params,undefined,false); 
			copyArgs(msg,"ActionPrefix",params,undefined,false); 
			copyArgs(msg,"MaxRecords",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeAlarms(params,cb);
		}

		
		service.DescribeAlarmsForMetric=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MetricName",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			
			copyArgs(n,"MetricName",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			copyArgs(n,"Statistic",params,undefined,false); 
			copyArgs(n,"ExtendedStatistic",params,undefined,false); 
			copyArgs(n,"Dimensions",params,undefined,true); 
			copyArgs(n,"Period",params,undefined,false); 
			copyArgs(n,"Unit",params,undefined,false); 
			
			copyArgs(msg,"MetricName",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			copyArgs(msg,"Statistic",params,undefined,false); 
			copyArgs(msg,"ExtendedStatistic",params,undefined,false); 
			copyArgs(msg,"Dimensions",params,undefined,true); 
			copyArgs(msg,"Period",params,undefined,false); 
			copyArgs(msg,"Unit",params,undefined,false); 
			

			svc.describeAlarmsForMetric(params,cb);
		}

		
		service.DescribeAnomalyDetectors=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			copyArgs(n,"MetricName",params,undefined,false); 
			copyArgs(n,"Dimensions",params,undefined,true); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			copyArgs(msg,"MetricName",params,undefined,false); 
			copyArgs(msg,"Dimensions",params,undefined,true); 
			

			svc.describeAnomalyDetectors(params,cb);
		}

		
		service.DescribeInsightRules=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeInsightRules(params,cb);
		}

		
		service.DisableAlarmActions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AlarmNames",params,undefined,true); 
			
			copyArgs(n,"AlarmNames",params,undefined,true); 
			
			copyArgs(msg,"AlarmNames",params,undefined,true); 
			

			svc.disableAlarmActions(params,cb);
		}

		
		service.DisableInsightRules=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RuleNames",params,undefined,true); 
			
			copyArgs(n,"RuleNames",params,undefined,true); 
			
			copyArgs(msg,"RuleNames",params,undefined,true); 
			

			svc.disableInsightRules(params,cb);
		}

		
		service.EnableAlarmActions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AlarmNames",params,undefined,true); 
			
			copyArgs(n,"AlarmNames",params,undefined,true); 
			
			copyArgs(msg,"AlarmNames",params,undefined,true); 
			

			svc.enableAlarmActions(params,cb);
		}

		
		service.EnableInsightRules=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RuleNames",params,undefined,true); 
			
			copyArgs(n,"RuleNames",params,undefined,true); 
			
			copyArgs(msg,"RuleNames",params,undefined,true); 
			

			svc.enableInsightRules(params,cb);
		}

		
		service.GetDashboard=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DashboardName",params,undefined,false); 
			
			copyArgs(n,"DashboardName",params,undefined,false); 
			
			copyArgs(msg,"DashboardName",params,undefined,false); 
			

			svc.getDashboard(params,cb);
		}

		
		service.GetInsightRuleReport=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RuleName",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(n,"Period",params,undefined,false); 
			
			copyArgs(n,"RuleName",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(n,"Period",params,undefined,false); 
			copyArgs(n,"MaxContributorCount",params,undefined,false); 
			copyArgs(n,"Metrics",params,undefined,false); 
			copyArgs(n,"OrderBy",params,undefined,false); 
			
			copyArgs(msg,"RuleName",params,undefined,false); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"Period",params,undefined,false); 
			copyArgs(msg,"MaxContributorCount",params,undefined,false); 
			copyArgs(msg,"Metrics",params,undefined,false); 
			copyArgs(msg,"OrderBy",params,undefined,false); 
			

			svc.getInsightRuleReport(params,cb);
		}

		
		service.GetMetricData=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MetricDataQueries",params,undefined,true); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			
			copyArgs(n,"MetricDataQueries",params,undefined,true); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"ScanBy",params,undefined,false); 
			copyArgs(n,"MaxDatapoints",params,undefined,false); 
			copyArgs(n,"LabelOptions",params,undefined,false); 
			
			copyArgs(msg,"MetricDataQueries",params,undefined,true); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"ScanBy",params,undefined,false); 
			copyArgs(msg,"MaxDatapoints",params,undefined,false); 
			copyArgs(msg,"LabelOptions",params,undefined,false); 
			

			svc.getMetricData(params,cb);
		}

		
		service.GetMetricStatistics=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Namespace",params,undefined,false); 
			copyArgs(n,"MetricName",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(n,"Period",params,undefined,false); 
			
			copyArgs(n,"Namespace",params,undefined,false); 
			copyArgs(n,"MetricName",params,undefined,false); 
			copyArgs(n,"Dimensions",params,undefined,true); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(n,"Period",params,undefined,false); 
			copyArgs(n,"Statistics",params,undefined,false); 
			copyArgs(n,"ExtendedStatistics",params,undefined,false); 
			copyArgs(n,"Unit",params,undefined,false); 
			
			copyArgs(msg,"Namespace",params,undefined,false); 
			copyArgs(msg,"MetricName",params,undefined,false); 
			copyArgs(msg,"Dimensions",params,undefined,true); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"Period",params,undefined,false); 
			copyArgs(msg,"Statistics",params,undefined,false); 
			copyArgs(msg,"ExtendedStatistics",params,undefined,false); 
			copyArgs(msg,"Unit",params,undefined,false); 
			

			svc.getMetricStatistics(params,cb);
		}

		
		service.GetMetricStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getMetricStream(params,cb);
		}

		
		service.GetMetricWidgetImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MetricWidget",params,undefined,false); 
			
			copyArgs(n,"MetricWidget",params,undefined,false); 
			copyArgs(n,"OutputFormat",params,undefined,false); 
			
			copyArgs(msg,"MetricWidget",params,undefined,false); 
			copyArgs(msg,"OutputFormat",params,undefined,false); 
			

			svc.getMetricWidgetImage(params,cb);
		}

		
		service.ListDashboards=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DashboardNamePrefix",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DashboardNamePrefix",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listDashboards(params,cb);
		}

		
		service.ListMetricStreams=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listMetricStreams(params,cb);
		}

		
		service.ListMetrics=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Namespace",params,undefined,false); 
			copyArgs(n,"MetricName",params,undefined,false); 
			copyArgs(n,"Dimensions",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"RecentlyActive",params,undefined,false); 
			
			copyArgs(msg,"Namespace",params,undefined,false); 
			copyArgs(msg,"MetricName",params,undefined,false); 
			copyArgs(msg,"Dimensions",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"RecentlyActive",params,undefined,false); 
			

			svc.listMetrics(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutAnomalyDetector=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Namespace",params,undefined,false); 
			copyArgs(n,"MetricName",params,undefined,false); 
			copyArgs(n,"Stat",params,undefined,false); 
			
			copyArgs(n,"Namespace",params,undefined,false); 
			copyArgs(n,"MetricName",params,undefined,false); 
			copyArgs(n,"Dimensions",params,undefined,true); 
			copyArgs(n,"Stat",params,undefined,false); 
			copyArgs(n,"Configuration",params,undefined,true); 
			
			copyArgs(msg,"Namespace",params,undefined,false); 
			copyArgs(msg,"MetricName",params,undefined,false); 
			copyArgs(msg,"Dimensions",params,undefined,true); 
			copyArgs(msg,"Stat",params,undefined,false); 
			copyArgs(msg,"Configuration",params,undefined,true); 
			

			svc.putAnomalyDetector(params,cb);
		}

		
		service.PutCompositeAlarm=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AlarmName",params,undefined,false); 
			copyArgs(n,"AlarmRule",params,undefined,false); 
			
			copyArgs(n,"ActionsEnabled",params,undefined,false); 
			copyArgs(n,"AlarmActions",params,undefined,true); 
			copyArgs(n,"AlarmDescription",params,undefined,false); 
			copyArgs(n,"AlarmName",params,undefined,false); 
			copyArgs(n,"AlarmRule",params,undefined,false); 
			copyArgs(n,"InsufficientDataActions",params,undefined,true); 
			copyArgs(n,"OKActions",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ActionsEnabled",params,undefined,false); 
			copyArgs(msg,"AlarmActions",params,undefined,true); 
			copyArgs(msg,"AlarmDescription",params,undefined,false); 
			copyArgs(msg,"AlarmName",params,undefined,false); 
			copyArgs(msg,"AlarmRule",params,undefined,false); 
			copyArgs(msg,"InsufficientDataActions",params,undefined,true); 
			copyArgs(msg,"OKActions",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.putCompositeAlarm(params,cb);
		}

		
		service.PutDashboard=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DashboardName",params,undefined,false); 
			copyArgs(n,"DashboardBody",params,undefined,false); 
			
			copyArgs(n,"DashboardName",params,undefined,false); 
			copyArgs(n,"DashboardBody",params,undefined,false); 
			
			copyArgs(msg,"DashboardName",params,undefined,false); 
			copyArgs(msg,"DashboardBody",params,undefined,false); 
			

			svc.putDashboard(params,cb);
		}

		
		service.PutInsightRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RuleName",params,undefined,false); 
			copyArgs(n,"RuleDefinition",params,undefined,false); 
			
			copyArgs(n,"RuleName",params,undefined,false); 
			copyArgs(n,"RuleState",params,undefined,false); 
			copyArgs(n,"RuleDefinition",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"RuleName",params,undefined,false); 
			copyArgs(msg,"RuleState",params,undefined,false); 
			copyArgs(msg,"RuleDefinition",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.putInsightRule(params,cb);
		}

		
		service.PutMetricAlarm=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AlarmName",params,undefined,false); 
			copyArgs(n,"EvaluationPeriods",params,undefined,false); 
			copyArgs(n,"ComparisonOperator",params,undefined,false); 
			
			copyArgs(n,"AlarmName",params,undefined,false); 
			copyArgs(n,"AlarmDescription",params,undefined,false); 
			copyArgs(n,"ActionsEnabled",params,undefined,false); 
			copyArgs(n,"OKActions",params,undefined,true); 
			copyArgs(n,"AlarmActions",params,undefined,true); 
			copyArgs(n,"InsufficientDataActions",params,undefined,true); 
			copyArgs(n,"MetricName",params,undefined,false); 
			copyArgs(n,"Namespace",params,undefined,false); 
			copyArgs(n,"Statistic",params,undefined,false); 
			copyArgs(n,"ExtendedStatistic",params,undefined,false); 
			copyArgs(n,"Dimensions",params,undefined,true); 
			copyArgs(n,"Period",params,undefined,false); 
			copyArgs(n,"Unit",params,undefined,false); 
			copyArgs(n,"EvaluationPeriods",params,undefined,false); 
			copyArgs(n,"DatapointsToAlarm",params,undefined,false); 
			copyArgs(n,"Threshold",params,undefined,false); 
			copyArgs(n,"ComparisonOperator",params,undefined,false); 
			copyArgs(n,"TreatMissingData",params,undefined,false); 
			copyArgs(n,"EvaluateLowSampleCountPercentile",params,undefined,false); 
			copyArgs(n,"Metrics",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"ThresholdMetricId",params,undefined,false); 
			
			copyArgs(msg,"AlarmName",params,undefined,false); 
			copyArgs(msg,"AlarmDescription",params,undefined,false); 
			copyArgs(msg,"ActionsEnabled",params,undefined,false); 
			copyArgs(msg,"OKActions",params,undefined,true); 
			copyArgs(msg,"AlarmActions",params,undefined,true); 
			copyArgs(msg,"InsufficientDataActions",params,undefined,true); 
			copyArgs(msg,"MetricName",params,undefined,false); 
			copyArgs(msg,"Namespace",params,undefined,false); 
			copyArgs(msg,"Statistic",params,undefined,false); 
			copyArgs(msg,"ExtendedStatistic",params,undefined,false); 
			copyArgs(msg,"Dimensions",params,undefined,true); 
			copyArgs(msg,"Period",params,undefined,false); 
			copyArgs(msg,"Unit",params,undefined,false); 
			copyArgs(msg,"EvaluationPeriods",params,undefined,false); 
			copyArgs(msg,"DatapointsToAlarm",params,undefined,false); 
			copyArgs(msg,"Threshold",params,undefined,false); 
			copyArgs(msg,"ComparisonOperator",params,undefined,false); 
			copyArgs(msg,"TreatMissingData",params,undefined,false); 
			copyArgs(msg,"EvaluateLowSampleCountPercentile",params,undefined,false); 
			copyArgs(msg,"Metrics",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"ThresholdMetricId",params,undefined,false); 
			

			svc.putMetricAlarm(params,cb);
		}

		
		service.PutMetricData=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Namespace",params,undefined,false); 
			copyArgs(n,"MetricData",params,undefined,false); 
			
			copyArgs(n,"Namespace",params,undefined,false); 
			copyArgs(n,"MetricData",params,undefined,false); 
			
			copyArgs(msg,"Namespace",params,undefined,false); 
			copyArgs(msg,"MetricData",params,undefined,false); 
			

			svc.putMetricData(params,cb);
		}

		
		service.PutMetricStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"FirehoseArn",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"OutputFormat",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"IncludeFilters",params,undefined,true); 
			copyArgs(n,"ExcludeFilters",params,undefined,true); 
			copyArgs(n,"FirehoseArn",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"OutputFormat",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"IncludeFilters",params,undefined,true); 
			copyArgs(msg,"ExcludeFilters",params,undefined,true); 
			copyArgs(msg,"FirehoseArn",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"OutputFormat",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.putMetricStream(params,cb);
		}

		
		service.SetAlarmState=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AlarmName",params,undefined,false); 
			copyArgs(n,"StateValue",params,undefined,false); 
			copyArgs(n,"StateReason",params,undefined,false); 
			
			copyArgs(n,"AlarmName",params,undefined,false); 
			copyArgs(n,"StateValue",params,undefined,false); 
			copyArgs(n,"StateReason",params,undefined,false); 
			copyArgs(n,"StateReasonData",params,undefined,false); 
			
			copyArgs(msg,"AlarmName",params,undefined,false); 
			copyArgs(msg,"StateValue",params,undefined,false); 
			copyArgs(msg,"StateReason",params,undefined,false); 
			copyArgs(msg,"StateReasonData",params,undefined,false); 
			

			svc.setAlarmState(params,cb);
		}

		
		service.StartMetricStreams=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Names",params,undefined,true); 
			
			copyArgs(n,"Names",params,undefined,true); 
			
			copyArgs(msg,"Names",params,undefined,true); 
			

			svc.startMetricStreams(params,cb);
		}

		
		service.StopMetricStreams=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Names",params,undefined,true); 
			
			copyArgs(n,"Names",params,undefined,true); 
			
			copyArgs(msg,"Names",params,undefined,true); 
			

			svc.stopMetricStreams(params,cb);
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

		 

	}
	RED.nodes.registerType("AWS CloudWatch", AmazonAPINode);

};
