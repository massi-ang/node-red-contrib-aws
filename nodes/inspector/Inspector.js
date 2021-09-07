
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

		var awsService = new AWS.Inspector( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Inspector(msg.AWSConfig) : awsService;

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

		
		service.AddAttributesToFindings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"findingArns",params,undefined,true); 
			copyArgs(n,"attributes",params,undefined,true); 
			
			copyArgs(n,"findingArns",params,undefined,true); 
			copyArgs(n,"attributes",params,undefined,true); 
			
			copyArgs(msg,"findingArns",params,undefined,true); 
			copyArgs(msg,"attributes",params,undefined,true); 
			

			svc.addAttributesToFindings(params,cb);
		}

		
		service.CreateAssessmentTarget=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentTargetName",params,undefined,false); 
			
			copyArgs(n,"assessmentTargetName",params,undefined,false); 
			copyArgs(n,"resourceGroupArn",params,undefined,false); 
			
			copyArgs(msg,"assessmentTargetName",params,undefined,false); 
			copyArgs(msg,"resourceGroupArn",params,undefined,false); 
			

			svc.createAssessmentTarget(params,cb);
		}

		
		service.CreateAssessmentTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentTargetArn",params,undefined,false); 
			copyArgs(n,"assessmentTemplateName",params,undefined,false); 
			copyArgs(n,"durationInSeconds",params,undefined,false); 
			copyArgs(n,"rulesPackageArns",params,undefined,true); 
			
			copyArgs(n,"assessmentTargetArn",params,undefined,false); 
			copyArgs(n,"assessmentTemplateName",params,undefined,false); 
			copyArgs(n,"durationInSeconds",params,undefined,false); 
			copyArgs(n,"rulesPackageArns",params,undefined,true); 
			copyArgs(n,"userAttributesForFindings",params,undefined,true); 
			
			copyArgs(msg,"assessmentTargetArn",params,undefined,false); 
			copyArgs(msg,"assessmentTemplateName",params,undefined,false); 
			copyArgs(msg,"durationInSeconds",params,undefined,false); 
			copyArgs(msg,"rulesPackageArns",params,undefined,true); 
			copyArgs(msg,"userAttributesForFindings",params,undefined,true); 
			

			svc.createAssessmentTemplate(params,cb);
		}

		
		service.CreateExclusionsPreview=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentTemplateArn",params,undefined,false); 
			
			copyArgs(n,"assessmentTemplateArn",params,undefined,false); 
			
			copyArgs(msg,"assessmentTemplateArn",params,undefined,false); 
			

			svc.createExclusionsPreview(params,cb);
		}

		
		service.CreateResourceGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceGroupTags",params,undefined,true); 
			
			copyArgs(n,"resourceGroupTags",params,undefined,true); 
			
			copyArgs(msg,"resourceGroupTags",params,undefined,true); 
			

			svc.createResourceGroup(params,cb);
		}

		
		service.DeleteAssessmentRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentRunArn",params,undefined,false); 
			
			copyArgs(n,"assessmentRunArn",params,undefined,false); 
			
			copyArgs(msg,"assessmentRunArn",params,undefined,false); 
			

			svc.deleteAssessmentRun(params,cb);
		}

		
		service.DeleteAssessmentTarget=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentTargetArn",params,undefined,false); 
			
			copyArgs(n,"assessmentTargetArn",params,undefined,false); 
			
			copyArgs(msg,"assessmentTargetArn",params,undefined,false); 
			

			svc.deleteAssessmentTarget(params,cb);
		}

		
		service.DeleteAssessmentTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentTemplateArn",params,undefined,false); 
			
			copyArgs(n,"assessmentTemplateArn",params,undefined,false); 
			
			copyArgs(msg,"assessmentTemplateArn",params,undefined,false); 
			

			svc.deleteAssessmentTemplate(params,cb);
		}

		
		service.DescribeAssessmentRuns=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentRunArns",params,undefined,true); 
			
			copyArgs(n,"assessmentRunArns",params,undefined,true); 
			
			copyArgs(msg,"assessmentRunArns",params,undefined,true); 
			

			svc.describeAssessmentRuns(params,cb);
		}

		
		service.DescribeAssessmentTargets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentTargetArns",params,undefined,true); 
			
			copyArgs(n,"assessmentTargetArns",params,undefined,true); 
			
			copyArgs(msg,"assessmentTargetArns",params,undefined,true); 
			

			svc.describeAssessmentTargets(params,cb);
		}

		
		service.DescribeAssessmentTemplates=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentTemplateArns",params,undefined,true); 
			
			copyArgs(n,"assessmentTemplateArns",params,undefined,true); 
			
			copyArgs(msg,"assessmentTemplateArns",params,undefined,true); 
			

			svc.describeAssessmentTemplates(params,cb);
		}

		
		service.DescribeCrossAccountAccessRole=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeCrossAccountAccessRole(params,cb);
		}

		
		service.DescribeExclusions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"exclusionArns",params,undefined,false); 
			
			copyArgs(n,"exclusionArns",params,undefined,false); 
			copyArgs(n,"locale",params,undefined,false); 
			
			copyArgs(msg,"exclusionArns",params,undefined,false); 
			copyArgs(msg,"locale",params,undefined,false); 
			

			svc.describeExclusions(params,cb);
		}

		
		service.DescribeFindings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"findingArns",params,undefined,true); 
			
			copyArgs(n,"findingArns",params,undefined,true); 
			copyArgs(n,"locale",params,undefined,false); 
			
			copyArgs(msg,"findingArns",params,undefined,true); 
			copyArgs(msg,"locale",params,undefined,false); 
			

			svc.describeFindings(params,cb);
		}

		
		service.DescribeResourceGroups=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceGroupArns",params,undefined,true); 
			
			copyArgs(n,"resourceGroupArns",params,undefined,true); 
			
			copyArgs(msg,"resourceGroupArns",params,undefined,true); 
			

			svc.describeResourceGroups(params,cb);
		}

		
		service.DescribeRulesPackages=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"rulesPackageArns",params,undefined,true); 
			
			copyArgs(n,"rulesPackageArns",params,undefined,true); 
			copyArgs(n,"locale",params,undefined,false); 
			
			copyArgs(msg,"rulesPackageArns",params,undefined,true); 
			copyArgs(msg,"locale",params,undefined,false); 
			

			svc.describeRulesPackages(params,cb);
		}

		
		service.GetAssessmentReport=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentRunArn",params,undefined,false); 
			copyArgs(n,"reportFileFormat",params,undefined,false); 
			copyArgs(n,"reportType",params,undefined,false); 
			
			copyArgs(n,"assessmentRunArn",params,undefined,false); 
			copyArgs(n,"reportFileFormat",params,undefined,false); 
			copyArgs(n,"reportType",params,undefined,false); 
			
			copyArgs(msg,"assessmentRunArn",params,undefined,false); 
			copyArgs(msg,"reportFileFormat",params,undefined,false); 
			copyArgs(msg,"reportType",params,undefined,false); 
			

			svc.getAssessmentReport(params,cb);
		}

		
		service.GetExclusionsPreview=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentTemplateArn",params,undefined,false); 
			copyArgs(n,"previewToken",params,undefined,false); 
			
			copyArgs(n,"assessmentTemplateArn",params,undefined,false); 
			copyArgs(n,"previewToken",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"locale",params,undefined,false); 
			
			copyArgs(msg,"assessmentTemplateArn",params,undefined,false); 
			copyArgs(msg,"previewToken",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"locale",params,undefined,false); 
			

			svc.getExclusionsPreview(params,cb);
		}

		
		service.GetTelemetryMetadata=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentRunArn",params,undefined,false); 
			
			copyArgs(n,"assessmentRunArn",params,undefined,false); 
			
			copyArgs(msg,"assessmentRunArn",params,undefined,false); 
			

			svc.getTelemetryMetadata(params,cb);
		}

		
		service.ListAssessmentRunAgents=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentRunArn",params,undefined,false); 
			
			copyArgs(n,"assessmentRunArn",params,undefined,false); 
			copyArgs(n,"filter",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"assessmentRunArn",params,undefined,false); 
			copyArgs(msg,"filter",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listAssessmentRunAgents(params,cb);
		}

		
		service.ListAssessmentRuns=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"assessmentTemplateArns",params,undefined,true); 
			copyArgs(n,"filter",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"assessmentTemplateArns",params,undefined,true); 
			copyArgs(msg,"filter",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listAssessmentRuns(params,cb);
		}

		
		service.ListAssessmentTargets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"filter",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"filter",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listAssessmentTargets(params,cb);
		}

		
		service.ListAssessmentTemplates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"assessmentTargetArns",params,undefined,true); 
			copyArgs(n,"filter",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"assessmentTargetArns",params,undefined,true); 
			copyArgs(msg,"filter",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listAssessmentTemplates(params,cb);
		}

		
		service.ListEventSubscriptions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listEventSubscriptions(params,cb);
		}

		
		service.ListExclusions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentRunArn",params,undefined,false); 
			
			copyArgs(n,"assessmentRunArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"assessmentRunArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listExclusions(params,cb);
		}

		
		service.ListFindings=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"assessmentRunArns",params,undefined,true); 
			copyArgs(n,"filter",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"assessmentRunArns",params,undefined,true); 
			copyArgs(msg,"filter",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listFindings(params,cb);
		}

		
		service.ListRulesPackages=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listRulesPackages(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PreviewAgents=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"previewAgentsArn",params,undefined,false); 
			
			copyArgs(n,"previewAgentsArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"previewAgentsArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.previewAgents(params,cb);
		}

		
		service.RegisterCrossAccountAccessRole=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"roleArn",params,undefined,false); 
			
			copyArgs(n,"roleArn",params,undefined,false); 
			
			copyArgs(msg,"roleArn",params,undefined,false); 
			

			svc.registerCrossAccountAccessRole(params,cb);
		}

		
		service.RemoveAttributesFromFindings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"findingArns",params,undefined,true); 
			copyArgs(n,"attributeKeys",params,undefined,false); 
			
			copyArgs(n,"findingArns",params,undefined,true); 
			copyArgs(n,"attributeKeys",params,undefined,false); 
			
			copyArgs(msg,"findingArns",params,undefined,true); 
			copyArgs(msg,"attributeKeys",params,undefined,false); 
			

			svc.removeAttributesFromFindings(params,cb);
		}

		
		service.SetTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.setTagsForResource(params,cb);
		}

		
		service.StartAssessmentRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentTemplateArn",params,undefined,false); 
			
			copyArgs(n,"assessmentTemplateArn",params,undefined,false); 
			copyArgs(n,"assessmentRunName",params,undefined,false); 
			
			copyArgs(msg,"assessmentTemplateArn",params,undefined,false); 
			copyArgs(msg,"assessmentRunName",params,undefined,false); 
			

			svc.startAssessmentRun(params,cb);
		}

		
		service.StopAssessmentRun=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentRunArn",params,undefined,false); 
			
			copyArgs(n,"assessmentRunArn",params,undefined,false); 
			copyArgs(n,"stopAction",params,undefined,false); 
			
			copyArgs(msg,"assessmentRunArn",params,undefined,false); 
			copyArgs(msg,"stopAction",params,undefined,false); 
			

			svc.stopAssessmentRun(params,cb);
		}

		
		service.SubscribeToEvent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"event",params,undefined,false); 
			copyArgs(n,"topicArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"event",params,undefined,false); 
			copyArgs(n,"topicArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"event",params,undefined,false); 
			copyArgs(msg,"topicArn",params,undefined,false); 
			

			svc.subscribeToEvent(params,cb);
		}

		
		service.UnsubscribeFromEvent=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"event",params,undefined,false); 
			copyArgs(n,"topicArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"event",params,undefined,false); 
			copyArgs(n,"topicArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"event",params,undefined,false); 
			copyArgs(msg,"topicArn",params,undefined,false); 
			

			svc.unsubscribeFromEvent(params,cb);
		}

		
		service.UpdateAssessmentTarget=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assessmentTargetArn",params,undefined,false); 
			copyArgs(n,"assessmentTargetName",params,undefined,false); 
			
			copyArgs(n,"assessmentTargetArn",params,undefined,false); 
			copyArgs(n,"assessmentTargetName",params,undefined,false); 
			copyArgs(n,"resourceGroupArn",params,undefined,false); 
			
			copyArgs(msg,"assessmentTargetArn",params,undefined,false); 
			copyArgs(msg,"assessmentTargetName",params,undefined,false); 
			copyArgs(msg,"resourceGroupArn",params,undefined,false); 
			

			svc.updateAssessmentTarget(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Inspector", AmazonAPINode);

};
