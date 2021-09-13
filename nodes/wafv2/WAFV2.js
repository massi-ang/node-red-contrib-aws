
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

		var awsService = new AWS.WAFV2( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.WAFV2(msg.AWSConfig) : awsService;

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
		
			service.AssociateWebACL=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WebACLArn",params,undefined,false); 
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"WebACLArn",params,undefined,false); 
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"WebACLArn",params,undefined,false); 
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.associateWebACL(params,cb);
		}
			service.CheckCapacity=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Rules",params,undefined,true); 
			
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Rules",params,undefined,true); 
			
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"Rules",params,undefined,true); 
			

			svc.checkCapacity(params,cb);
		}
			service.CreateIPSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"IPAddressVersion",params,undefined,false); 
			copyArgs(n,"Addresses",params,undefined,true); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"IPAddressVersion",params,undefined,false); 
			copyArgs(n,"Addresses",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"IPAddressVersion",params,undefined,false); 
			copyArgs(msg,"Addresses",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createIPSet(params,cb);
		}
			service.CreateRegexPatternSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"RegularExpressionList",params,undefined,true); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"RegularExpressionList",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"RegularExpressionList",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createRegexPatternSet(params,cb);
		}
			service.CreateRuleGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Capacity",params,undefined,false); 
			copyArgs(n,"VisibilityConfig",params,undefined,true); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Capacity",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Rules",params,undefined,true); 
			copyArgs(n,"VisibilityConfig",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"CustomResponseBodies",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"Capacity",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Rules",params,undefined,true); 
			copyArgs(msg,"VisibilityConfig",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"CustomResponseBodies",params,undefined,true); 
			

			svc.createRuleGroup(params,cb);
		}
			service.CreateWebACL=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"DefaultAction",params,undefined,true); 
			copyArgs(n,"VisibilityConfig",params,undefined,true); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"DefaultAction",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Rules",params,undefined,true); 
			copyArgs(n,"VisibilityConfig",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"CustomResponseBodies",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"DefaultAction",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Rules",params,undefined,true); 
			copyArgs(msg,"VisibilityConfig",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"CustomResponseBodies",params,undefined,true); 
			

			svc.createWebACL(params,cb);
		}
			service.DeleteFirewallManagerRuleGroups=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WebACLArn",params,undefined,false); 
			copyArgs(n,"WebACLLockToken",params,undefined,false); 
			
			copyArgs(n,"WebACLArn",params,undefined,false); 
			copyArgs(n,"WebACLLockToken",params,undefined,false); 
			
			copyArgs(msg,"WebACLArn",params,undefined,false); 
			copyArgs(msg,"WebACLLockToken",params,undefined,false); 
			

			svc.deleteFirewallManagerRuleGroups(params,cb);
		}
			service.DeleteIPSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"LockToken",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"LockToken",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"LockToken",params,undefined,false); 
			

			svc.deleteIPSet(params,cb);
		}
			service.DeleteLoggingConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.deleteLoggingConfiguration(params,cb);
		}
			service.DeletePermissionPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.deletePermissionPolicy(params,cb);
		}
			service.DeleteRegexPatternSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"LockToken",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"LockToken",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"LockToken",params,undefined,false); 
			

			svc.deleteRegexPatternSet(params,cb);
		}
			service.DeleteRuleGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"LockToken",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"LockToken",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"LockToken",params,undefined,false); 
			

			svc.deleteRuleGroup(params,cb);
		}
			service.DeleteWebACL=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"LockToken",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"LockToken",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"LockToken",params,undefined,false); 
			

			svc.deleteWebACL(params,cb);
		}
			service.DescribeManagedRuleGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VendorName",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			
			copyArgs(n,"VendorName",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"VersionName",params,undefined,false); 
			
			copyArgs(msg,"VendorName",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"VersionName",params,undefined,false); 
			

			svc.describeManagedRuleGroup(params,cb);
		}
			service.DisassociateWebACL=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.disassociateWebACL(params,cb);
		}
			service.GetIPSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getIPSet(params,cb);
		}
			service.GetLoggingConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.getLoggingConfiguration(params,cb);
		}
			service.GetManagedRuleSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getManagedRuleSet(params,cb);
		}
			service.GetPermissionPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.getPermissionPolicy(params,cb);
		}
			service.GetRateBasedStatementManagedKeys=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"WebACLName",params,undefined,false); 
			copyArgs(n,"WebACLId",params,undefined,false); 
			copyArgs(n,"RuleName",params,undefined,false); 
			
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"WebACLName",params,undefined,false); 
			copyArgs(n,"WebACLId",params,undefined,false); 
			copyArgs(n,"RuleName",params,undefined,false); 
			
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"WebACLName",params,undefined,false); 
			copyArgs(msg,"WebACLId",params,undefined,false); 
			copyArgs(msg,"RuleName",params,undefined,false); 
			

			svc.getRateBasedStatementManagedKeys(params,cb);
		}
			service.GetRegexPatternSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getRegexPatternSet(params,cb);
		}
			service.GetRuleGroup=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"ARN",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"ARN",params,undefined,false); 
			

			svc.getRuleGroup(params,cb);
		}
			service.GetSampledRequests=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WebAclArn",params,undefined,false); 
			copyArgs(n,"RuleMetricName",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"TimeWindow",params,undefined,true); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(n,"WebAclArn",params,undefined,false); 
			copyArgs(n,"RuleMetricName",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"TimeWindow",params,undefined,true); 
			copyArgs(n,"MaxItems",params,undefined,false); 
			
			copyArgs(msg,"WebAclArn",params,undefined,false); 
			copyArgs(msg,"RuleMetricName",params,undefined,false); 
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"TimeWindow",params,undefined,true); 
			copyArgs(msg,"MaxItems",params,undefined,false); 
			

			svc.getSampledRequests(params,cb);
		}
			service.GetWebACL=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			

			svc.getWebACL(params,cb);
		}
			service.GetWebACLForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.getWebACLForResource(params,cb);
		}
			service.ListAvailableManagedRuleGroupVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VendorName",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			
			copyArgs(n,"VendorName",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"NextMarker",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"VendorName",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"NextMarker",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listAvailableManagedRuleGroupVersions(params,cb);
		}
			service.ListAvailableManagedRuleGroups=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Scope",params,undefined,false); 
			
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"NextMarker",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"NextMarker",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listAvailableManagedRuleGroups(params,cb);
		}
			service.ListIPSets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Scope",params,undefined,false); 
			
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"NextMarker",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"NextMarker",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listIPSets(params,cb);
		}
			service.ListLoggingConfigurations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"NextMarker",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"NextMarker",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listLoggingConfigurations(params,cb);
		}
			service.ListManagedRuleSets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Scope",params,undefined,false); 
			
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"NextMarker",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"NextMarker",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listManagedRuleSets(params,cb);
		}
			service.ListRegexPatternSets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Scope",params,undefined,false); 
			
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"NextMarker",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"NextMarker",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listRegexPatternSets(params,cb);
		}
			service.ListResourcesForWebACL=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WebACLArn",params,undefined,false); 
			
			copyArgs(n,"WebACLArn",params,undefined,false); 
			copyArgs(n,"ResourceType",params,undefined,false); 
			
			copyArgs(msg,"WebACLArn",params,undefined,false); 
			copyArgs(msg,"ResourceType",params,undefined,false); 
			

			svc.listResourcesForWebACL(params,cb);
		}
			service.ListRuleGroups=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Scope",params,undefined,false); 
			
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"NextMarker",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"NextMarker",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listRuleGroups(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(n,"NextMarker",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			copyArgs(n,"ResourceARN",params,undefined,false); 
			
			copyArgs(msg,"NextMarker",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.ListWebACLs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Scope",params,undefined,false); 
			
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"NextMarker",params,undefined,false); 
			copyArgs(Number(n),"Limit",params,undefined,false); 
			
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"NextMarker",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			

			svc.listWebACLs(params,cb);
		}
			service.PutLoggingConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LoggingConfiguration",params,undefined,true); 
			
			copyArgs(n,"LoggingConfiguration",params,undefined,true); 
			
			copyArgs(msg,"LoggingConfiguration",params,undefined,true); 
			

			svc.putLoggingConfiguration(params,cb);
		}
			service.PutManagedRuleSetVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"LockToken",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"LockToken",params,undefined,false); 
			copyArgs(n,"RecommendedVersion",params,undefined,false); 
			copyArgs(n,"VersionsToPublish",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"LockToken",params,undefined,false); 
			copyArgs(msg,"RecommendedVersion",params,undefined,false); 
			copyArgs(msg,"VersionsToPublish",params,undefined,false); 
			

			svc.putManagedRuleSetVersions(params,cb);
		}
			service.PutPermissionPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"Policy",params,undefined,false); 
			

			svc.putPermissionPolicy(params,cb);
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
			service.UpdateIPSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Addresses",params,undefined,true); 
			copyArgs(n,"LockToken",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Addresses",params,undefined,true); 
			copyArgs(n,"LockToken",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Addresses",params,undefined,true); 
			copyArgs(msg,"LockToken",params,undefined,false); 
			

			svc.updateIPSet(params,cb);
		}
			service.UpdateManagedRuleSetVersionExpiryDate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"LockToken",params,undefined,false); 
			copyArgs(n,"VersionToExpire",params,undefined,false); 
			copyArgs(n,"ExpiryTimestamp",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"LockToken",params,undefined,false); 
			copyArgs(n,"VersionToExpire",params,undefined,false); 
			copyArgs(n,"ExpiryTimestamp",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"LockToken",params,undefined,false); 
			copyArgs(msg,"VersionToExpire",params,undefined,false); 
			copyArgs(msg,"ExpiryTimestamp",params,undefined,false); 
			

			svc.updateManagedRuleSetVersionExpiryDate(params,cb);
		}
			service.UpdateRegexPatternSet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"RegularExpressionList",params,undefined,true); 
			copyArgs(n,"LockToken",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"RegularExpressionList",params,undefined,true); 
			copyArgs(n,"LockToken",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"RegularExpressionList",params,undefined,true); 
			copyArgs(msg,"LockToken",params,undefined,false); 
			

			svc.updateRegexPatternSet(params,cb);
		}
			service.UpdateRuleGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"VisibilityConfig",params,undefined,true); 
			copyArgs(n,"LockToken",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Rules",params,undefined,true); 
			copyArgs(n,"VisibilityConfig",params,undefined,true); 
			copyArgs(n,"LockToken",params,undefined,false); 
			copyArgs(n,"CustomResponseBodies",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Rules",params,undefined,true); 
			copyArgs(msg,"VisibilityConfig",params,undefined,true); 
			copyArgs(msg,"LockToken",params,undefined,false); 
			copyArgs(msg,"CustomResponseBodies",params,undefined,true); 
			

			svc.updateRuleGroup(params,cb);
		}
			service.UpdateWebACL=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"DefaultAction",params,undefined,true); 
			copyArgs(n,"VisibilityConfig",params,undefined,true); 
			copyArgs(n,"LockToken",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Scope",params,undefined,false); 
			copyArgs(n,"Id",params,undefined,false); 
			copyArgs(n,"DefaultAction",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Rules",params,undefined,true); 
			copyArgs(n,"VisibilityConfig",params,undefined,true); 
			copyArgs(n,"LockToken",params,undefined,false); 
			copyArgs(n,"CustomResponseBodies",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Scope",params,undefined,false); 
			copyArgs(msg,"Id",params,undefined,false); 
			copyArgs(msg,"DefaultAction",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Rules",params,undefined,true); 
			copyArgs(msg,"VisibilityConfig",params,undefined,true); 
			copyArgs(msg,"LockToken",params,undefined,false); 
			copyArgs(msg,"CustomResponseBodies",params,undefined,true); 
			

			svc.updateWebACL(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS WAFV2", AmazonAPINode);

};
