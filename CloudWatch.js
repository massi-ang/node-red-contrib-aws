
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

		var awsService = new AWS.CloudWatch( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.CloudWatch(msg.AWSConfig) : awsService;

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

		
		service.DeleteAlarms=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AlarmNames",params,undefined,true); 
			
			copyArg(msg,"AlarmNames",params,undefined,true); 
			

			svc.deleteAlarms(params,cb);
		}

		
		service.DeleteAnomalyDetector=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Namespace",params,undefined,false); 
			copyArg(n,"MetricName",params,undefined,false); 
			copyArg(n,"Stat",params,undefined,false); 
			
			copyArg(msg,"Namespace",params,undefined,false); 
			copyArg(msg,"MetricName",params,undefined,false); 
			copyArg(msg,"Dimensions",params,undefined,true); 
			copyArg(msg,"Stat",params,undefined,false); 
			

			svc.deleteAnomalyDetector(params,cb);
		}

		
		service.DeleteDashboards=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DashboardNames",params,undefined,false); 
			
			copyArg(msg,"DashboardNames",params,undefined,false); 
			

			svc.deleteDashboards(params,cb);
		}

		
		service.DeleteInsightRules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RuleNames",params,undefined,true); 
			
			copyArg(msg,"RuleNames",params,undefined,true); 
			

			svc.deleteInsightRules(params,cb);
		}

		
		service.DeleteMetricStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteMetricStream(params,cb);
		}

		
		service.DescribeAlarmHistory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AlarmName",params,undefined,false); 
			copyArg(msg,"AlarmTypes",params,undefined,true); 
			copyArg(msg,"HistoryItemType",params,undefined,false); 
			copyArg(msg,"StartDate",params,undefined,false); 
			copyArg(msg,"EndDate",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"ScanBy",params,undefined,false); 
			

			svc.describeAlarmHistory(params,cb);
		}

		
		service.DescribeAlarms=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AlarmNames",params,undefined,true); 
			copyArg(msg,"AlarmNamePrefix",params,undefined,false); 
			copyArg(msg,"AlarmTypes",params,undefined,true); 
			copyArg(msg,"ChildrenOfAlarmName",params,undefined,false); 
			copyArg(msg,"ParentsOfAlarmName",params,undefined,false); 
			copyArg(msg,"StateValue",params,undefined,false); 
			copyArg(msg,"ActionPrefix",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeAlarms(params,cb);
		}

		
		service.DescribeAlarmsForMetric=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MetricName",params,undefined,false); 
			copyArg(n,"Namespace",params,undefined,false); 
			
			copyArg(msg,"MetricName",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			copyArg(msg,"Statistic",params,undefined,false); 
			copyArg(msg,"ExtendedStatistic",params,undefined,false); 
			copyArg(msg,"Dimensions",params,undefined,true); 
			copyArg(msg,"Period",params,undefined,false); 
			copyArg(msg,"Unit",params,undefined,false); 
			

			svc.describeAlarmsForMetric(params,cb);
		}

		
		service.DescribeAnomalyDetectors=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			copyArg(msg,"MetricName",params,undefined,false); 
			copyArg(msg,"Dimensions",params,undefined,true); 
			

			svc.describeAnomalyDetectors(params,cb);
		}

		
		service.DescribeInsightRules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describeInsightRules(params,cb);
		}

		
		service.DisableAlarmActions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AlarmNames",params,undefined,true); 
			
			copyArg(msg,"AlarmNames",params,undefined,true); 
			

			svc.disableAlarmActions(params,cb);
		}

		
		service.DisableInsightRules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RuleNames",params,undefined,true); 
			
			copyArg(msg,"RuleNames",params,undefined,true); 
			

			svc.disableInsightRules(params,cb);
		}

		
		service.EnableAlarmActions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AlarmNames",params,undefined,true); 
			
			copyArg(msg,"AlarmNames",params,undefined,true); 
			

			svc.enableAlarmActions(params,cb);
		}

		
		service.EnableInsightRules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RuleNames",params,undefined,true); 
			
			copyArg(msg,"RuleNames",params,undefined,true); 
			

			svc.enableInsightRules(params,cb);
		}

		
		service.GetDashboard=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DashboardName",params,undefined,false); 
			
			copyArg(msg,"DashboardName",params,undefined,false); 
			

			svc.getDashboard(params,cb);
		}

		
		service.GetInsightRuleReport=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RuleName",params,undefined,false); 
			copyArg(n,"StartTime",params,undefined,false); 
			copyArg(n,"EndTime",params,undefined,false); 
			copyArg(n,"Period",params,undefined,false); 
			
			copyArg(msg,"RuleName",params,undefined,false); 
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"Period",params,undefined,false); 
			copyArg(msg,"MaxContributorCount",params,undefined,false); 
			copyArg(msg,"Metrics",params,undefined,false); 
			copyArg(msg,"OrderBy",params,undefined,false); 
			

			svc.getInsightRuleReport(params,cb);
		}

		
		service.GetMetricData=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MetricDataQueries",params,undefined,true); 
			copyArg(n,"StartTime",params,undefined,false); 
			copyArg(n,"EndTime",params,undefined,false); 
			
			copyArg(msg,"MetricDataQueries",params,undefined,true); 
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"ScanBy",params,undefined,false); 
			copyArg(msg,"MaxDatapoints",params,undefined,false); 
			copyArg(msg,"LabelOptions",params,undefined,false); 
			

			svc.getMetricData(params,cb);
		}

		
		service.GetMetricStatistics=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Namespace",params,undefined,false); 
			copyArg(n,"MetricName",params,undefined,false); 
			copyArg(n,"StartTime",params,undefined,false); 
			copyArg(n,"EndTime",params,undefined,false); 
			copyArg(n,"Period",params,undefined,false); 
			
			copyArg(msg,"Namespace",params,undefined,false); 
			copyArg(msg,"MetricName",params,undefined,false); 
			copyArg(msg,"Dimensions",params,undefined,true); 
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"Period",params,undefined,false); 
			copyArg(msg,"Statistics",params,undefined,false); 
			copyArg(msg,"ExtendedStatistics",params,undefined,false); 
			copyArg(msg,"Unit",params,undefined,false); 
			

			svc.getMetricStatistics(params,cb);
		}

		
		service.GetMetricStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.getMetricStream(params,cb);
		}

		
		service.GetMetricWidgetImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MetricWidget",params,undefined,false); 
			
			copyArg(msg,"MetricWidget",params,undefined,false); 
			copyArg(msg,"OutputFormat",params,undefined,false); 
			

			svc.getMetricWidgetImage(params,cb);
		}

		
		service.ListDashboards=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DashboardNamePrefix",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listDashboards(params,cb);
		}

		
		service.ListMetricStreams=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listMetricStreams(params,cb);
		}

		
		service.ListMetrics=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Namespace",params,undefined,false); 
			copyArg(msg,"MetricName",params,undefined,false); 
			copyArg(msg,"Dimensions",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"RecentlyActive",params,undefined,false); 
			

			svc.listMetrics(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutAnomalyDetector=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Namespace",params,undefined,false); 
			copyArg(n,"MetricName",params,undefined,false); 
			copyArg(n,"Stat",params,undefined,false); 
			
			copyArg(msg,"Namespace",params,undefined,false); 
			copyArg(msg,"MetricName",params,undefined,false); 
			copyArg(msg,"Dimensions",params,undefined,true); 
			copyArg(msg,"Stat",params,undefined,false); 
			copyArg(msg,"Configuration",params,undefined,true); 
			

			svc.putAnomalyDetector(params,cb);
		}

		
		service.PutCompositeAlarm=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AlarmName",params,undefined,false); 
			copyArg(n,"AlarmRule",params,undefined,false); 
			
			copyArg(msg,"ActionsEnabled",params,undefined,false); 
			copyArg(msg,"AlarmActions",params,undefined,true); 
			copyArg(msg,"AlarmDescription",params,undefined,false); 
			copyArg(msg,"AlarmName",params,undefined,false); 
			copyArg(msg,"AlarmRule",params,undefined,false); 
			copyArg(msg,"InsufficientDataActions",params,undefined,true); 
			copyArg(msg,"OKActions",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.putCompositeAlarm(params,cb);
		}

		
		service.PutDashboard=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DashboardName",params,undefined,false); 
			copyArg(n,"DashboardBody",params,undefined,false); 
			
			copyArg(msg,"DashboardName",params,undefined,false); 
			copyArg(msg,"DashboardBody",params,undefined,false); 
			

			svc.putDashboard(params,cb);
		}

		
		service.PutInsightRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RuleName",params,undefined,false); 
			copyArg(n,"RuleDefinition",params,undefined,false); 
			
			copyArg(msg,"RuleName",params,undefined,false); 
			copyArg(msg,"RuleState",params,undefined,false); 
			copyArg(msg,"RuleDefinition",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.putInsightRule(params,cb);
		}

		
		service.PutMetricAlarm=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AlarmName",params,undefined,false); 
			copyArg(n,"EvaluationPeriods",params,undefined,false); 
			copyArg(n,"ComparisonOperator",params,undefined,false); 
			
			copyArg(msg,"AlarmName",params,undefined,false); 
			copyArg(msg,"AlarmDescription",params,undefined,false); 
			copyArg(msg,"ActionsEnabled",params,undefined,false); 
			copyArg(msg,"OKActions",params,undefined,true); 
			copyArg(msg,"AlarmActions",params,undefined,true); 
			copyArg(msg,"InsufficientDataActions",params,undefined,true); 
			copyArg(msg,"MetricName",params,undefined,false); 
			copyArg(msg,"Namespace",params,undefined,false); 
			copyArg(msg,"Statistic",params,undefined,false); 
			copyArg(msg,"ExtendedStatistic",params,undefined,false); 
			copyArg(msg,"Dimensions",params,undefined,true); 
			copyArg(msg,"Period",params,undefined,false); 
			copyArg(msg,"Unit",params,undefined,false); 
			copyArg(msg,"EvaluationPeriods",params,undefined,false); 
			copyArg(msg,"DatapointsToAlarm",params,undefined,false); 
			copyArg(msg,"Threshold",params,undefined,false); 
			copyArg(msg,"ComparisonOperator",params,undefined,false); 
			copyArg(msg,"TreatMissingData",params,undefined,false); 
			copyArg(msg,"EvaluateLowSampleCountPercentile",params,undefined,false); 
			copyArg(msg,"Metrics",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"ThresholdMetricId",params,undefined,false); 
			

			svc.putMetricAlarm(params,cb);
		}

		
		service.PutMetricData=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Namespace",params,undefined,false); 
			copyArg(n,"MetricData",params,undefined,false); 
			
			copyArg(msg,"Namespace",params,undefined,false); 
			copyArg(msg,"MetricData",params,undefined,false); 
			

			svc.putMetricData(params,cb);
		}

		
		service.PutMetricStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"FirehoseArn",params,undefined,false); 
			copyArg(n,"RoleArn",params,undefined,false); 
			copyArg(n,"OutputFormat",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"IncludeFilters",params,undefined,true); 
			copyArg(msg,"ExcludeFilters",params,undefined,true); 
			copyArg(msg,"FirehoseArn",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"OutputFormat",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.putMetricStream(params,cb);
		}

		
		service.SetAlarmState=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AlarmName",params,undefined,false); 
			copyArg(n,"StateValue",params,undefined,false); 
			copyArg(n,"StateReason",params,undefined,false); 
			
			copyArg(msg,"AlarmName",params,undefined,false); 
			copyArg(msg,"StateValue",params,undefined,false); 
			copyArg(msg,"StateReason",params,undefined,false); 
			copyArg(msg,"StateReasonData",params,undefined,false); 
			

			svc.setAlarmState(params,cb);
		}

		
		service.StartMetricStreams=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Names",params,undefined,true); 
			
			copyArg(msg,"Names",params,undefined,true); 
			

			svc.startMetricStreams(params,cb);
		}

		
		service.StopMetricStreams=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Names",params,undefined,true); 
			
			copyArg(msg,"Names",params,undefined,true); 
			

			svc.stopMetricStreams(params,cb);
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

		 

	}
	RED.nodes.registerType("AWS CloudWatch", AmazonAPINode);

};
