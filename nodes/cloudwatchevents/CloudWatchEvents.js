
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

		var awsService = new AWS.CloudWatchEvents( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.CloudWatchEvents(msg.AWSConfig) : awsService;

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

		
		service.ActivateEventSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.activateEventSource(params,cb);
		}

		
		service.CancelReplay=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReplayName",params,undefined,false); 
			
			copyArgs(n,"ReplayName",params,undefined,false); 
			
			copyArgs(msg,"ReplayName",params,undefined,false); 
			

			svc.cancelReplay(params,cb);
		}

		
		service.CreateApiDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ConnectionArn",params,undefined,false); 
			copyArgs(n,"InvocationEndpoint",params,undefined,false); 
			copyArgs(n,"HttpMethod",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"ConnectionArn",params,undefined,false); 
			copyArgs(n,"InvocationEndpoint",params,undefined,false); 
			copyArgs(n,"HttpMethod",params,undefined,false); 
			copyArgs(n,"InvocationRateLimitPerSecond",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"ConnectionArn",params,undefined,false); 
			copyArgs(msg,"InvocationEndpoint",params,undefined,false); 
			copyArgs(msg,"HttpMethod",params,undefined,false); 
			copyArgs(msg,"InvocationRateLimitPerSecond",params,undefined,false); 
			

			svc.createApiDestination(params,cb);
		}

		
		service.CreateArchive=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ArchiveName",params,undefined,false); 
			copyArgs(n,"EventSourceArn",params,undefined,false); 
			
			copyArgs(n,"ArchiveName",params,undefined,false); 
			copyArgs(n,"EventSourceArn",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"EventPattern",params,undefined,false); 
			copyArgs(n,"RetentionDays",params,undefined,false); 
			
			copyArgs(msg,"ArchiveName",params,undefined,false); 
			copyArgs(msg,"EventSourceArn",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"EventPattern",params,undefined,false); 
			copyArgs(msg,"RetentionDays",params,undefined,false); 
			

			svc.createArchive(params,cb);
		}

		
		service.CreateConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"AuthorizationType",params,undefined,false); 
			copyArgs(n,"AuthParameters",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"AuthorizationType",params,undefined,false); 
			copyArgs(n,"AuthParameters",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"AuthorizationType",params,undefined,false); 
			copyArgs(msg,"AuthParameters",params,undefined,false); 
			

			svc.createConnection(params,cb);
		}

		
		service.CreateEventBus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"EventSourceName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"EventSourceName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createEventBus(params,cb);
		}

		
		service.CreatePartnerEventSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Account",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Account",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Account",params,undefined,false); 
			

			svc.createPartnerEventSource(params,cb);
		}

		
		service.DeactivateEventSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deactivateEventSource(params,cb);
		}

		
		service.DeauthorizeConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deauthorizeConnection(params,cb);
		}

		
		service.DeleteApiDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteApiDestination(params,cb);
		}

		
		service.DeleteArchive=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ArchiveName",params,undefined,false); 
			
			copyArgs(n,"ArchiveName",params,undefined,false); 
			
			copyArgs(msg,"ArchiveName",params,undefined,false); 
			

			svc.deleteArchive(params,cb);
		}

		
		service.DeleteConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteConnection(params,cb);
		}

		
		service.DeleteEventBus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteEventBus(params,cb);
		}

		
		service.DeletePartnerEventSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Account",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Account",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Account",params,undefined,false); 
			

			svc.deletePartnerEventSource(params,cb);
		}

		
		service.DeleteRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"EventBusName",params,undefined,false); 
			copyArgs(n,"Force",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"EventBusName",params,undefined,false); 
			copyArgs(msg,"Force",params,undefined,false); 
			

			svc.deleteRule(params,cb);
		}

		
		service.DescribeApiDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.describeApiDestination(params,cb);
		}

		
		service.DescribeArchive=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ArchiveName",params,undefined,false); 
			
			copyArgs(n,"ArchiveName",params,undefined,false); 
			
			copyArgs(msg,"ArchiveName",params,undefined,false); 
			

			svc.describeArchive(params,cb);
		}

		
		service.DescribeConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.describeConnection(params,cb);
		}

		
		service.DescribeEventBus=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.describeEventBus(params,cb);
		}

		
		service.DescribeEventSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.describeEventSource(params,cb);
		}

		
		service.DescribePartnerEventSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.describePartnerEventSource(params,cb);
		}

		
		service.DescribeReplay=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReplayName",params,undefined,false); 
			
			copyArgs(n,"ReplayName",params,undefined,false); 
			
			copyArgs(msg,"ReplayName",params,undefined,false); 
			

			svc.describeReplay(params,cb);
		}

		
		service.DescribeRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"EventBusName",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"EventBusName",params,undefined,false); 
			

			svc.describeRule(params,cb);
		}

		
		service.DisableRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"EventBusName",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"EventBusName",params,undefined,false); 
			

			svc.disableRule(params,cb);
		}

		
		service.EnableRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"EventBusName",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"EventBusName",params,undefined,false); 
			

			svc.enableRule(params,cb);
		}

		
		service.ListApiDestinations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NamePrefix",params,undefined,false); 
			copyArgs(n,"ConnectionArn",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Limit",params,undefined,false); 
			
			copyArgs(msg,"NamePrefix",params,undefined,false); 
			copyArgs(msg,"ConnectionArn",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listApiDestinations(params,cb);
		}

		
		service.ListArchives=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NamePrefix",params,undefined,false); 
			copyArgs(n,"EventSourceArn",params,undefined,false); 
			copyArgs(n,"State",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Limit",params,undefined,false); 
			
			copyArgs(msg,"NamePrefix",params,undefined,false); 
			copyArgs(msg,"EventSourceArn",params,undefined,false); 
			copyArgs(msg,"State",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listArchives(params,cb);
		}

		
		service.ListConnections=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NamePrefix",params,undefined,false); 
			copyArgs(n,"ConnectionState",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Limit",params,undefined,false); 
			
			copyArgs(msg,"NamePrefix",params,undefined,false); 
			copyArgs(msg,"ConnectionState",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listConnections(params,cb);
		}

		
		service.ListEventBuses=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NamePrefix",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Limit",params,undefined,false); 
			
			copyArgs(msg,"NamePrefix",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listEventBuses(params,cb);
		}

		
		service.ListEventSources=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NamePrefix",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Limit",params,undefined,false); 
			
			copyArgs(msg,"NamePrefix",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listEventSources(params,cb);
		}

		
		service.ListPartnerEventSourceAccounts=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EventSourceName",params,undefined,false); 
			
			copyArgs(n,"EventSourceName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Limit",params,undefined,false); 
			
			copyArgs(msg,"EventSourceName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listPartnerEventSourceAccounts(params,cb);
		}

		
		service.ListPartnerEventSources=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NamePrefix",params,undefined,false); 
			
			copyArgs(n,"NamePrefix",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Limit",params,undefined,false); 
			
			copyArgs(msg,"NamePrefix",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listPartnerEventSources(params,cb);
		}

		
		service.ListReplays=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NamePrefix",params,undefined,false); 
			copyArgs(n,"State",params,undefined,false); 
			copyArgs(n,"EventSourceArn",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Limit",params,undefined,false); 
			
			copyArgs(msg,"NamePrefix",params,undefined,false); 
			copyArgs(msg,"State",params,undefined,false); 
			copyArgs(msg,"EventSourceArn",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listReplays(params,cb);
		}

		
		service.ListRuleNamesByTarget=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TargetArn",params,undefined,false); 
			
			copyArgs(n,"TargetArn",params,undefined,false); 
			copyArgs(n,"EventBusName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Limit",params,undefined,false); 
			
			copyArgs(msg,"TargetArn",params,undefined,false); 
			copyArgs(msg,"EventBusName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listRuleNamesByTarget(params,cb);
		}

		
		service.ListRules=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NamePrefix",params,undefined,false); 
			copyArgs(n,"EventBusName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Limit",params,undefined,false); 
			
			copyArgs(msg,"NamePrefix",params,undefined,false); 
			copyArgs(msg,"EventBusName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listRules(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListTargetsByRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Rule",params,undefined,false); 
			
			copyArgs(n,"Rule",params,undefined,false); 
			copyArgs(n,"EventBusName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Limit",params,undefined,false); 
			
			copyArgs(msg,"Rule",params,undefined,false); 
			copyArgs(msg,"EventBusName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listTargetsByRule(params,cb);
		}

		
		service.PutEvents=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Entries",params,undefined,false); 
			
			copyArgs(n,"Entries",params,undefined,false); 
			
			copyArgs(msg,"Entries",params,undefined,false); 
			

			svc.putEvents(params,cb);
		}

		
		service.PutPartnerEvents=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Entries",params,undefined,false); 
			
			copyArgs(n,"Entries",params,undefined,false); 
			
			copyArgs(msg,"Entries",params,undefined,false); 
			

			svc.putPartnerEvents(params,cb);
		}

		
		service.PutPermission=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"EventBusName",params,undefined,false); 
			copyArgs(n,"Action",params,undefined,false); 
			copyArgs(n,"Principal",params,undefined,false); 
			copyArgs(n,"StatementId",params,undefined,false); 
			copyArgs(n,"Condition",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(msg,"EventBusName",params,undefined,false); 
			copyArgs(msg,"Action",params,undefined,false); 
			copyArgs(msg,"Principal",params,undefined,false); 
			copyArgs(msg,"StatementId",params,undefined,false); 
			copyArgs(msg,"Condition",params,undefined,false); 
			copyArgs(msg,"Policy",params,undefined,false); 
			

			svc.putPermission(params,cb);
		}

		
		service.PutRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ScheduleExpression",params,undefined,false); 
			copyArgs(n,"EventPattern",params,undefined,false); 
			copyArgs(n,"State",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"RoleArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"EventBusName",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ScheduleExpression",params,undefined,false); 
			copyArgs(msg,"EventPattern",params,undefined,false); 
			copyArgs(msg,"State",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"RoleArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"EventBusName",params,undefined,false); 
			

			svc.putRule(params,cb);
		}

		
		service.PutTargets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Rule",params,undefined,false); 
			copyArgs(n,"Targets",params,undefined,true); 
			
			copyArgs(n,"Rule",params,undefined,false); 
			copyArgs(n,"EventBusName",params,undefined,false); 
			copyArgs(n,"Targets",params,undefined,true); 
			
			copyArgs(msg,"Rule",params,undefined,false); 
			copyArgs(msg,"EventBusName",params,undefined,false); 
			copyArgs(msg,"Targets",params,undefined,true); 
			

			svc.putTargets(params,cb);
		}

		
		service.RemovePermission=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"StatementId",params,undefined,false); 
			copyArgs(n,"RemoveAllPermissions",params,undefined,false); 
			copyArgs(n,"EventBusName",params,undefined,false); 
			
			copyArgs(msg,"StatementId",params,undefined,false); 
			copyArgs(msg,"RemoveAllPermissions",params,undefined,false); 
			copyArgs(msg,"EventBusName",params,undefined,false); 
			

			svc.removePermission(params,cb);
		}

		
		service.RemoveTargets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Rule",params,undefined,false); 
			copyArgs(n,"Ids",params,undefined,false); 
			
			copyArgs(n,"Rule",params,undefined,false); 
			copyArgs(n,"EventBusName",params,undefined,false); 
			copyArgs(n,"Ids",params,undefined,false); 
			copyArgs(n,"Force",params,undefined,false); 
			
			copyArgs(msg,"Rule",params,undefined,false); 
			copyArgs(msg,"EventBusName",params,undefined,false); 
			copyArgs(msg,"Ids",params,undefined,false); 
			copyArgs(msg,"Force",params,undefined,false); 
			

			svc.removeTargets(params,cb);
		}

		
		service.StartReplay=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ReplayName",params,undefined,false); 
			copyArgs(n,"EventSourceArn",params,undefined,false); 
			copyArgs(n,"EventStartTime",params,undefined,false); 
			copyArgs(n,"EventEndTime",params,undefined,false); 
			copyArgs(n,"Destination",params,undefined,true); 
			
			copyArgs(n,"ReplayName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"EventSourceArn",params,undefined,false); 
			copyArgs(n,"EventStartTime",params,undefined,false); 
			copyArgs(n,"EventEndTime",params,undefined,false); 
			copyArgs(n,"Destination",params,undefined,true); 
			
			copyArgs(msg,"ReplayName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"EventSourceArn",params,undefined,false); 
			copyArgs(msg,"EventStartTime",params,undefined,false); 
			copyArgs(msg,"EventEndTime",params,undefined,false); 
			copyArgs(msg,"Destination",params,undefined,true); 
			

			svc.startReplay(params,cb);
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

		
		service.TestEventPattern=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EventPattern",params,undefined,false); 
			copyArgs(n,"Event",params,undefined,false); 
			
			copyArgs(n,"EventPattern",params,undefined,false); 
			copyArgs(n,"Event",params,undefined,false); 
			
			copyArgs(msg,"EventPattern",params,undefined,false); 
			copyArgs(msg,"Event",params,undefined,false); 
			

			svc.testEventPattern(params,cb);
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

		
		service.UpdateApiDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"ConnectionArn",params,undefined,false); 
			copyArgs(n,"InvocationEndpoint",params,undefined,false); 
			copyArgs(n,"HttpMethod",params,undefined,false); 
			copyArgs(n,"InvocationRateLimitPerSecond",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"ConnectionArn",params,undefined,false); 
			copyArgs(msg,"InvocationEndpoint",params,undefined,false); 
			copyArgs(msg,"HttpMethod",params,undefined,false); 
			copyArgs(msg,"InvocationRateLimitPerSecond",params,undefined,false); 
			

			svc.updateApiDestination(params,cb);
		}

		
		service.UpdateArchive=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ArchiveName",params,undefined,false); 
			
			copyArgs(n,"ArchiveName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"EventPattern",params,undefined,false); 
			copyArgs(n,"RetentionDays",params,undefined,false); 
			
			copyArgs(msg,"ArchiveName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"EventPattern",params,undefined,false); 
			copyArgs(msg,"RetentionDays",params,undefined,false); 
			

			svc.updateArchive(params,cb);
		}

		
		service.UpdateConnection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"AuthorizationType",params,undefined,false); 
			copyArgs(n,"AuthParameters",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"AuthorizationType",params,undefined,false); 
			copyArgs(msg,"AuthParameters",params,undefined,false); 
			

			svc.updateConnection(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS CloudWatchEvents", AmazonAPINode);

};
