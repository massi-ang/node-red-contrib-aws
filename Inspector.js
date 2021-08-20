
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

		var awsService = new AWS.Inspector( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Inspector(msg.AWSConfig) : awsService;

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

		
		service.AddAttributesToFindings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"findingArns",params,undefined,true); 
			copyArg(n,"attributes",params,undefined,true); 
			
			copyArg(msg,"findingArns",params,undefined,true); 
			copyArg(msg,"attributes",params,undefined,true); 
			

			svc.addAttributesToFindings(params,cb);
		}

		
		service.CreateAssessmentTarget=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentTargetName",params,undefined,false); 
			
			copyArg(msg,"assessmentTargetName",params,undefined,false); 
			copyArg(msg,"resourceGroupArn",params,undefined,false); 
			

			svc.createAssessmentTarget(params,cb);
		}

		
		service.CreateAssessmentTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentTargetArn",params,undefined,false); 
			copyArg(n,"assessmentTemplateName",params,undefined,false); 
			copyArg(n,"durationInSeconds",params,undefined,false); 
			copyArg(n,"rulesPackageArns",params,undefined,true); 
			
			copyArg(msg,"assessmentTargetArn",params,undefined,false); 
			copyArg(msg,"assessmentTemplateName",params,undefined,false); 
			copyArg(msg,"durationInSeconds",params,undefined,false); 
			copyArg(msg,"rulesPackageArns",params,undefined,true); 
			copyArg(msg,"userAttributesForFindings",params,undefined,true); 
			

			svc.createAssessmentTemplate(params,cb);
		}

		
		service.CreateExclusionsPreview=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentTemplateArn",params,undefined,false); 
			
			copyArg(msg,"assessmentTemplateArn",params,undefined,false); 
			

			svc.createExclusionsPreview(params,cb);
		}

		
		service.CreateResourceGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceGroupTags",params,undefined,true); 
			
			copyArg(msg,"resourceGroupTags",params,undefined,true); 
			

			svc.createResourceGroup(params,cb);
		}

		
		service.DeleteAssessmentRun=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentRunArn",params,undefined,false); 
			
			copyArg(msg,"assessmentRunArn",params,undefined,false); 
			

			svc.deleteAssessmentRun(params,cb);
		}

		
		service.DeleteAssessmentTarget=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentTargetArn",params,undefined,false); 
			
			copyArg(msg,"assessmentTargetArn",params,undefined,false); 
			

			svc.deleteAssessmentTarget(params,cb);
		}

		
		service.DeleteAssessmentTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentTemplateArn",params,undefined,false); 
			
			copyArg(msg,"assessmentTemplateArn",params,undefined,false); 
			

			svc.deleteAssessmentTemplate(params,cb);
		}

		
		service.DescribeAssessmentRuns=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentRunArns",params,undefined,true); 
			
			copyArg(msg,"assessmentRunArns",params,undefined,true); 
			

			svc.describeAssessmentRuns(params,cb);
		}

		
		service.DescribeAssessmentTargets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentTargetArns",params,undefined,true); 
			
			copyArg(msg,"assessmentTargetArns",params,undefined,true); 
			

			svc.describeAssessmentTargets(params,cb);
		}

		
		service.DescribeAssessmentTemplates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentTemplateArns",params,undefined,true); 
			
			copyArg(msg,"assessmentTemplateArns",params,undefined,true); 
			

			svc.describeAssessmentTemplates(params,cb);
		}

		
		service.DescribeCrossAccountAccessRole=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeCrossAccountAccessRole(params,cb);
		}

		
		service.DescribeExclusions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"exclusionArns",params,undefined,false); 
			
			copyArg(msg,"exclusionArns",params,undefined,false); 
			copyArg(msg,"locale",params,undefined,false); 
			

			svc.describeExclusions(params,cb);
		}

		
		service.DescribeFindings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"findingArns",params,undefined,true); 
			
			copyArg(msg,"findingArns",params,undefined,true); 
			copyArg(msg,"locale",params,undefined,false); 
			

			svc.describeFindings(params,cb);
		}

		
		service.DescribeResourceGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceGroupArns",params,undefined,true); 
			
			copyArg(msg,"resourceGroupArns",params,undefined,true); 
			

			svc.describeResourceGroups(params,cb);
		}

		
		service.DescribeRulesPackages=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"rulesPackageArns",params,undefined,true); 
			
			copyArg(msg,"rulesPackageArns",params,undefined,true); 
			copyArg(msg,"locale",params,undefined,false); 
			

			svc.describeRulesPackages(params,cb);
		}

		
		service.GetAssessmentReport=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentRunArn",params,undefined,false); 
			copyArg(n,"reportFileFormat",params,undefined,false); 
			copyArg(n,"reportType",params,undefined,false); 
			
			copyArg(msg,"assessmentRunArn",params,undefined,false); 
			copyArg(msg,"reportFileFormat",params,undefined,false); 
			copyArg(msg,"reportType",params,undefined,false); 
			

			svc.getAssessmentReport(params,cb);
		}

		
		service.GetExclusionsPreview=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentTemplateArn",params,undefined,false); 
			copyArg(n,"previewToken",params,undefined,false); 
			
			copyArg(msg,"assessmentTemplateArn",params,undefined,false); 
			copyArg(msg,"previewToken",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"locale",params,undefined,false); 
			

			svc.getExclusionsPreview(params,cb);
		}

		
		service.GetTelemetryMetadata=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentRunArn",params,undefined,false); 
			
			copyArg(msg,"assessmentRunArn",params,undefined,false); 
			

			svc.getTelemetryMetadata(params,cb);
		}

		
		service.ListAssessmentRunAgents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentRunArn",params,undefined,false); 
			
			copyArg(msg,"assessmentRunArn",params,undefined,false); 
			copyArg(msg,"filter",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listAssessmentRunAgents(params,cb);
		}

		
		service.ListAssessmentRuns=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"assessmentTemplateArns",params,undefined,true); 
			copyArg(msg,"filter",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listAssessmentRuns(params,cb);
		}

		
		service.ListAssessmentTargets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"filter",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listAssessmentTargets(params,cb);
		}

		
		service.ListAssessmentTemplates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"assessmentTargetArns",params,undefined,true); 
			copyArg(msg,"filter",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listAssessmentTemplates(params,cb);
		}

		
		service.ListEventSubscriptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listEventSubscriptions(params,cb);
		}

		
		service.ListExclusions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentRunArn",params,undefined,false); 
			
			copyArg(msg,"assessmentRunArn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listExclusions(params,cb);
		}

		
		service.ListFindings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"assessmentRunArns",params,undefined,true); 
			copyArg(msg,"filter",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listFindings(params,cb);
		}

		
		service.ListRulesPackages=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listRulesPackages(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PreviewAgents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"previewAgentsArn",params,undefined,false); 
			
			copyArg(msg,"previewAgentsArn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.previewAgents(params,cb);
		}

		
		service.RegisterCrossAccountAccessRole=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"roleArn",params,undefined,false); 
			
			copyArg(msg,"roleArn",params,undefined,false); 
			

			svc.registerCrossAccountAccessRole(params,cb);
		}

		
		service.RemoveAttributesFromFindings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"findingArns",params,undefined,true); 
			copyArg(n,"attributeKeys",params,undefined,false); 
			
			copyArg(msg,"findingArns",params,undefined,true); 
			copyArg(msg,"attributeKeys",params,undefined,false); 
			

			svc.removeAttributesFromFindings(params,cb);
		}

		
		service.SetTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.setTagsForResource(params,cb);
		}

		
		service.StartAssessmentRun=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentTemplateArn",params,undefined,false); 
			
			copyArg(msg,"assessmentTemplateArn",params,undefined,false); 
			copyArg(msg,"assessmentRunName",params,undefined,false); 
			

			svc.startAssessmentRun(params,cb);
		}

		
		service.StopAssessmentRun=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentRunArn",params,undefined,false); 
			
			copyArg(msg,"assessmentRunArn",params,undefined,false); 
			copyArg(msg,"stopAction",params,undefined,false); 
			

			svc.stopAssessmentRun(params,cb);
		}

		
		service.SubscribeToEvent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"event",params,undefined,false); 
			copyArg(n,"topicArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"event",params,undefined,false); 
			copyArg(msg,"topicArn",params,undefined,false); 
			

			svc.subscribeToEvent(params,cb);
		}

		
		service.UnsubscribeFromEvent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"event",params,undefined,false); 
			copyArg(n,"topicArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"event",params,undefined,false); 
			copyArg(msg,"topicArn",params,undefined,false); 
			

			svc.unsubscribeFromEvent(params,cb);
		}

		
		service.UpdateAssessmentTarget=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assessmentTargetArn",params,undefined,false); 
			copyArg(n,"assessmentTargetName",params,undefined,false); 
			
			copyArg(msg,"assessmentTargetArn",params,undefined,false); 
			copyArg(msg,"assessmentTargetName",params,undefined,false); 
			copyArg(msg,"resourceGroupArn",params,undefined,false); 
			

			svc.updateAssessmentTarget(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Inspector", AmazonAPINode);

};
