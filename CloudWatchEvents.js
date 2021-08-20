
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

		var awsService = new AWS.CloudWatchEvents( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.CloudWatchEvents(msg.AWSConfig) : awsService;

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

		
		service.ActivateEventSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.activateEventSource(params,cb);
		}

		
		service.CancelReplay=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReplayName",params,undefined,false); 
			
			copyArg(msg,"ReplayName",params,undefined,false); 
			

			svc.cancelReplay(params,cb);
		}

		
		service.CreateApiDestination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"ConnectionArn",params,undefined,false); 
			copyArg(n,"InvocationEndpoint",params,undefined,false); 
			copyArg(n,"HttpMethod",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"ConnectionArn",params,undefined,false); 
			copyArg(msg,"InvocationEndpoint",params,undefined,false); 
			copyArg(msg,"HttpMethod",params,undefined,false); 
			copyArg(msg,"InvocationRateLimitPerSecond",params,undefined,false); 
			

			svc.createApiDestination(params,cb);
		}

		
		service.CreateArchive=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ArchiveName",params,undefined,false); 
			copyArg(n,"EventSourceArn",params,undefined,false); 
			
			copyArg(msg,"ArchiveName",params,undefined,false); 
			copyArg(msg,"EventSourceArn",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"EventPattern",params,undefined,false); 
			copyArg(msg,"RetentionDays",params,undefined,false); 
			

			svc.createArchive(params,cb);
		}

		
		service.CreateConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"AuthorizationType",params,undefined,false); 
			copyArg(n,"AuthParameters",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"AuthorizationType",params,undefined,false); 
			copyArg(msg,"AuthParameters",params,undefined,false); 
			

			svc.createConnection(params,cb);
		}

		
		service.CreateEventBus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"EventSourceName",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createEventBus(params,cb);
		}

		
		service.CreatePartnerEventSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Account",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Account",params,undefined,false); 
			

			svc.createPartnerEventSource(params,cb);
		}

		
		service.DeactivateEventSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deactivateEventSource(params,cb);
		}

		
		service.DeauthorizeConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deauthorizeConnection(params,cb);
		}

		
		service.DeleteApiDestination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteApiDestination(params,cb);
		}

		
		service.DeleteArchive=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ArchiveName",params,undefined,false); 
			
			copyArg(msg,"ArchiveName",params,undefined,false); 
			

			svc.deleteArchive(params,cb);
		}

		
		service.DeleteConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteConnection(params,cb);
		}

		
		service.DeleteEventBus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteEventBus(params,cb);
		}

		
		service.DeletePartnerEventSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Account",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Account",params,undefined,false); 
			

			svc.deletePartnerEventSource(params,cb);
		}

		
		service.DeleteRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"EventBusName",params,undefined,false); 
			copyArg(msg,"Force",params,undefined,false); 
			

			svc.deleteRule(params,cb);
		}

		
		service.DescribeApiDestination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.describeApiDestination(params,cb);
		}

		
		service.DescribeArchive=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ArchiveName",params,undefined,false); 
			
			copyArg(msg,"ArchiveName",params,undefined,false); 
			

			svc.describeArchive(params,cb);
		}

		
		service.DescribeConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.describeConnection(params,cb);
		}

		
		service.DescribeEventBus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.describeEventBus(params,cb);
		}

		
		service.DescribeEventSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.describeEventSource(params,cb);
		}

		
		service.DescribePartnerEventSource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.describePartnerEventSource(params,cb);
		}

		
		service.DescribeReplay=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReplayName",params,undefined,false); 
			
			copyArg(msg,"ReplayName",params,undefined,false); 
			

			svc.describeReplay(params,cb);
		}

		
		service.DescribeRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"EventBusName",params,undefined,false); 
			

			svc.describeRule(params,cb);
		}

		
		service.DisableRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"EventBusName",params,undefined,false); 
			

			svc.disableRule(params,cb);
		}

		
		service.EnableRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"EventBusName",params,undefined,false); 
			

			svc.enableRule(params,cb);
		}

		
		service.ListApiDestinations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NamePrefix",params,undefined,false); 
			copyArg(msg,"ConnectionArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listApiDestinations(params,cb);
		}

		
		service.ListArchives=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NamePrefix",params,undefined,false); 
			copyArg(msg,"EventSourceArn",params,undefined,false); 
			copyArg(msg,"State",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listArchives(params,cb);
		}

		
		service.ListConnections=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NamePrefix",params,undefined,false); 
			copyArg(msg,"ConnectionState",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listConnections(params,cb);
		}

		
		service.ListEventBuses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NamePrefix",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listEventBuses(params,cb);
		}

		
		service.ListEventSources=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NamePrefix",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listEventSources(params,cb);
		}

		
		service.ListPartnerEventSourceAccounts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EventSourceName",params,undefined,false); 
			
			copyArg(msg,"EventSourceName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listPartnerEventSourceAccounts(params,cb);
		}

		
		service.ListPartnerEventSources=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NamePrefix",params,undefined,false); 
			
			copyArg(msg,"NamePrefix",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listPartnerEventSources(params,cb);
		}

		
		service.ListReplays=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NamePrefix",params,undefined,false); 
			copyArg(msg,"State",params,undefined,false); 
			copyArg(msg,"EventSourceArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listReplays(params,cb);
		}

		
		service.ListRuleNamesByTarget=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TargetArn",params,undefined,false); 
			
			copyArg(msg,"TargetArn",params,undefined,false); 
			copyArg(msg,"EventBusName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listRuleNamesByTarget(params,cb);
		}

		
		service.ListRules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NamePrefix",params,undefined,false); 
			copyArg(msg,"EventBusName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listRules(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			
			copyArg(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListTargetsByRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Rule",params,undefined,false); 
			
			copyArg(msg,"Rule",params,undefined,false); 
			copyArg(msg,"EventBusName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listTargetsByRule(params,cb);
		}

		
		service.PutEvents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Entries",params,undefined,false); 
			
			copyArg(msg,"Entries",params,undefined,false); 
			

			svc.putEvents(params,cb);
		}

		
		service.PutPartnerEvents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Entries",params,undefined,false); 
			
			copyArg(msg,"Entries",params,undefined,false); 
			

			svc.putPartnerEvents(params,cb);
		}

		
		service.PutPermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"EventBusName",params,undefined,false); 
			copyArg(msg,"Action",params,undefined,false); 
			copyArg(msg,"Principal",params,undefined,false); 
			copyArg(msg,"StatementId",params,undefined,false); 
			copyArg(msg,"Condition",params,undefined,false); 
			copyArg(msg,"Policy",params,undefined,false); 
			

			svc.putPermission(params,cb);
		}

		
		service.PutRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ScheduleExpression",params,undefined,false); 
			copyArg(msg,"EventPattern",params,undefined,false); 
			copyArg(msg,"State",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"EventBusName",params,undefined,false); 
			

			svc.putRule(params,cb);
		}

		
		service.PutTargets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Rule",params,undefined,false); 
			copyArg(n,"Targets",params,undefined,true); 
			
			copyArg(msg,"Rule",params,undefined,false); 
			copyArg(msg,"EventBusName",params,undefined,false); 
			copyArg(msg,"Targets",params,undefined,true); 
			

			svc.putTargets(params,cb);
		}

		
		service.RemovePermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"StatementId",params,undefined,false); 
			copyArg(msg,"RemoveAllPermissions",params,undefined,false); 
			copyArg(msg,"EventBusName",params,undefined,false); 
			

			svc.removePermission(params,cb);
		}

		
		service.RemoveTargets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Rule",params,undefined,false); 
			copyArg(n,"Ids",params,undefined,false); 
			
			copyArg(msg,"Rule",params,undefined,false); 
			copyArg(msg,"EventBusName",params,undefined,false); 
			copyArg(msg,"Ids",params,undefined,false); 
			copyArg(msg,"Force",params,undefined,false); 
			

			svc.removeTargets(params,cb);
		}

		
		service.StartReplay=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReplayName",params,undefined,false); 
			copyArg(n,"EventSourceArn",params,undefined,false); 
			copyArg(n,"EventStartTime",params,undefined,false); 
			copyArg(n,"EventEndTime",params,undefined,false); 
			copyArg(n,"Destination",params,undefined,true); 
			
			copyArg(msg,"ReplayName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"EventSourceArn",params,undefined,false); 
			copyArg(msg,"EventStartTime",params,undefined,false); 
			copyArg(msg,"EventEndTime",params,undefined,false); 
			copyArg(msg,"Destination",params,undefined,true); 
			

			svc.startReplay(params,cb);
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

		
		service.TestEventPattern=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EventPattern",params,undefined,false); 
			copyArg(n,"Event",params,undefined,false); 
			
			copyArg(msg,"EventPattern",params,undefined,false); 
			copyArg(msg,"Event",params,undefined,false); 
			

			svc.testEventPattern(params,cb);
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

		
		service.UpdateApiDestination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"ConnectionArn",params,undefined,false); 
			copyArg(msg,"InvocationEndpoint",params,undefined,false); 
			copyArg(msg,"HttpMethod",params,undefined,false); 
			copyArg(msg,"InvocationRateLimitPerSecond",params,undefined,false); 
			

			svc.updateApiDestination(params,cb);
		}

		
		service.UpdateArchive=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ArchiveName",params,undefined,false); 
			
			copyArg(msg,"ArchiveName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"EventPattern",params,undefined,false); 
			copyArg(msg,"RetentionDays",params,undefined,false); 
			

			svc.updateArchive(params,cb);
		}

		
		service.UpdateConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"AuthorizationType",params,undefined,false); 
			copyArg(msg,"AuthParameters",params,undefined,false); 
			

			svc.updateConnection(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS CloudWatchEvents", AmazonAPINode);

};
