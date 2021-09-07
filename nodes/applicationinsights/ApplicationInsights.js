
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

		var awsService = new AWS.ApplicationInsights( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.ApplicationInsights(msg.AWSConfig) : awsService;

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

		
		service.CreateApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"OpsCenterEnabled",params,undefined,false); 
			copyArgs(n,"CWEMonitorEnabled",params,undefined,false); 
			copyArgs(n,"OpsItemSNSTopicArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceGroupName",params,undefined,false); 
			copyArgs(msg,"OpsCenterEnabled",params,undefined,false); 
			copyArgs(msg,"CWEMonitorEnabled",params,undefined,false); 
			copyArgs(msg,"OpsItemSNSTopicArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createApplication(params,cb);
		}

		
		service.CreateComponent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"ComponentName",params,undefined,false); 
			copyArgs(n,"ResourceList",params,undefined,true); 
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"ComponentName",params,undefined,false); 
			copyArgs(n,"ResourceList",params,undefined,true); 
			
			copyArgs(msg,"ResourceGroupName",params,undefined,false); 
			copyArgs(msg,"ComponentName",params,undefined,false); 
			copyArgs(msg,"ResourceList",params,undefined,true); 
			

			svc.createComponent(params,cb);
		}

		
		service.CreateLogPattern=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"PatternSetName",params,undefined,false); 
			copyArgs(n,"PatternName",params,undefined,false); 
			copyArgs(n,"Pattern",params,undefined,false); 
			copyArgs(n,"Rank",params,undefined,false); 
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"PatternSetName",params,undefined,false); 
			copyArgs(n,"PatternName",params,undefined,false); 
			copyArgs(n,"Pattern",params,undefined,false); 
			copyArgs(n,"Rank",params,undefined,false); 
			
			copyArgs(msg,"ResourceGroupName",params,undefined,false); 
			copyArgs(msg,"PatternSetName",params,undefined,false); 
			copyArgs(msg,"PatternName",params,undefined,false); 
			copyArgs(msg,"Pattern",params,undefined,false); 
			copyArgs(msg,"Rank",params,undefined,false); 
			

			svc.createLogPattern(params,cb);
		}

		
		service.DeleteApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			
			copyArgs(msg,"ResourceGroupName",params,undefined,false); 
			

			svc.deleteApplication(params,cb);
		}

		
		service.DeleteComponent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"ComponentName",params,undefined,false); 
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"ComponentName",params,undefined,false); 
			
			copyArgs(msg,"ResourceGroupName",params,undefined,false); 
			copyArgs(msg,"ComponentName",params,undefined,false); 
			

			svc.deleteComponent(params,cb);
		}

		
		service.DeleteLogPattern=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"PatternSetName",params,undefined,false); 
			copyArgs(n,"PatternName",params,undefined,false); 
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"PatternSetName",params,undefined,false); 
			copyArgs(n,"PatternName",params,undefined,false); 
			
			copyArgs(msg,"ResourceGroupName",params,undefined,false); 
			copyArgs(msg,"PatternSetName",params,undefined,false); 
			copyArgs(msg,"PatternName",params,undefined,false); 
			

			svc.deleteLogPattern(params,cb);
		}

		
		service.DescribeApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			
			copyArgs(msg,"ResourceGroupName",params,undefined,false); 
			

			svc.describeApplication(params,cb);
		}

		
		service.DescribeComponent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"ComponentName",params,undefined,false); 
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"ComponentName",params,undefined,false); 
			
			copyArgs(msg,"ResourceGroupName",params,undefined,false); 
			copyArgs(msg,"ComponentName",params,undefined,false); 
			

			svc.describeComponent(params,cb);
		}

		
		service.DescribeComponentConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"ComponentName",params,undefined,false); 
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"ComponentName",params,undefined,false); 
			
			copyArgs(msg,"ResourceGroupName",params,undefined,false); 
			copyArgs(msg,"ComponentName",params,undefined,false); 
			

			svc.describeComponentConfiguration(params,cb);
		}

		
		service.DescribeComponentConfigurationRecommendation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"ComponentName",params,undefined,false); 
			copyArgs(n,"Tier",params,undefined,false); 
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"ComponentName",params,undefined,false); 
			copyArgs(n,"Tier",params,undefined,false); 
			
			copyArgs(msg,"ResourceGroupName",params,undefined,false); 
			copyArgs(msg,"ComponentName",params,undefined,false); 
			copyArgs(msg,"Tier",params,undefined,false); 
			

			svc.describeComponentConfigurationRecommendation(params,cb);
		}

		
		service.DescribeLogPattern=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"PatternSetName",params,undefined,false); 
			copyArgs(n,"PatternName",params,undefined,false); 
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"PatternSetName",params,undefined,false); 
			copyArgs(n,"PatternName",params,undefined,false); 
			
			copyArgs(msg,"ResourceGroupName",params,undefined,false); 
			copyArgs(msg,"PatternSetName",params,undefined,false); 
			copyArgs(msg,"PatternName",params,undefined,false); 
			

			svc.describeLogPattern(params,cb);
		}

		
		service.DescribeObservation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ObservationId",params,undefined,false); 
			
			copyArgs(n,"ObservationId",params,undefined,false); 
			
			copyArgs(msg,"ObservationId",params,undefined,false); 
			

			svc.describeObservation(params,cb);
		}

		
		service.DescribeProblem=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProblemId",params,undefined,false); 
			
			copyArgs(n,"ProblemId",params,undefined,false); 
			
			copyArgs(msg,"ProblemId",params,undefined,false); 
			

			svc.describeProblem(params,cb);
		}

		
		service.DescribeProblemObservations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProblemId",params,undefined,false); 
			
			copyArgs(n,"ProblemId",params,undefined,false); 
			
			copyArgs(msg,"ProblemId",params,undefined,false); 
			

			svc.describeProblemObservations(params,cb);
		}

		
		service.ListApplications=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listApplications(params,cb);
		}

		
		service.ListComponents=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ResourceGroupName",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listComponents(params,cb);
		}

		
		service.ListConfigurationHistory=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(n,"EventStatus",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ResourceGroupName",params,undefined,false); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"EventStatus",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listConfigurationHistory(params,cb);
		}

		
		service.ListLogPatternSets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ResourceGroupName",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listLogPatternSets(params,cb);
		}

		
		service.ListLogPatterns=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"PatternSetName",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ResourceGroupName",params,undefined,false); 
			copyArgs(msg,"PatternSetName",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listLogPatterns(params,cb);
		}

		
		service.ListProblems=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"StartTime",params,undefined,false); 
			copyArgs(n,"EndTime",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ResourceGroupName",params,undefined,false); 
			copyArgs(msg,"StartTime",params,undefined,false); 
			copyArgs(msg,"EndTime",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listProblems(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
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

		
		service.UpdateApplication=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"OpsCenterEnabled",params,undefined,false); 
			copyArgs(n,"CWEMonitorEnabled",params,undefined,false); 
			copyArgs(n,"OpsItemSNSTopicArn",params,undefined,false); 
			copyArgs(n,"RemoveSNSTopic",params,undefined,false); 
			
			copyArgs(msg,"ResourceGroupName",params,undefined,false); 
			copyArgs(msg,"OpsCenterEnabled",params,undefined,false); 
			copyArgs(msg,"CWEMonitorEnabled",params,undefined,false); 
			copyArgs(msg,"OpsItemSNSTopicArn",params,undefined,false); 
			copyArgs(msg,"RemoveSNSTopic",params,undefined,false); 
			

			svc.updateApplication(params,cb);
		}

		
		service.UpdateComponent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"ComponentName",params,undefined,false); 
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"ComponentName",params,undefined,false); 
			copyArgs(n,"NewComponentName",params,undefined,false); 
			copyArgs(n,"ResourceList",params,undefined,true); 
			
			copyArgs(msg,"ResourceGroupName",params,undefined,false); 
			copyArgs(msg,"ComponentName",params,undefined,false); 
			copyArgs(msg,"NewComponentName",params,undefined,false); 
			copyArgs(msg,"ResourceList",params,undefined,true); 
			

			svc.updateComponent(params,cb);
		}

		
		service.UpdateComponentConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"ComponentName",params,undefined,false); 
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"ComponentName",params,undefined,false); 
			copyArgs(n,"Monitor",params,undefined,false); 
			copyArgs(n,"Tier",params,undefined,false); 
			copyArgs(n,"ComponentConfiguration",params,undefined,false); 
			
			copyArgs(msg,"ResourceGroupName",params,undefined,false); 
			copyArgs(msg,"ComponentName",params,undefined,false); 
			copyArgs(msg,"Monitor",params,undefined,false); 
			copyArgs(msg,"Tier",params,undefined,false); 
			copyArgs(msg,"ComponentConfiguration",params,undefined,false); 
			

			svc.updateComponentConfiguration(params,cb);
		}

		
		service.UpdateLogPattern=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"PatternSetName",params,undefined,false); 
			copyArgs(n,"PatternName",params,undefined,false); 
			
			copyArgs(n,"ResourceGroupName",params,undefined,false); 
			copyArgs(n,"PatternSetName",params,undefined,false); 
			copyArgs(n,"PatternName",params,undefined,false); 
			copyArgs(n,"Pattern",params,undefined,false); 
			copyArgs(n,"Rank",params,undefined,false); 
			
			copyArgs(msg,"ResourceGroupName",params,undefined,false); 
			copyArgs(msg,"PatternSetName",params,undefined,false); 
			copyArgs(msg,"PatternName",params,undefined,false); 
			copyArgs(msg,"Pattern",params,undefined,false); 
			copyArgs(msg,"Rank",params,undefined,false); 
			

			svc.updateLogPattern(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS ApplicationInsights", AmazonAPINode);

};
