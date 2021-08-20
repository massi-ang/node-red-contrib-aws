
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

		var awsService = new AWS.WAFV2( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.WAFV2(msg.AWSConfig) : awsService;

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

		
		service.AssociateWebACL=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WebACLArn",params,undefined,false); 
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"WebACLArn",params,undefined,false); 
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.associateWebACL(params,cb);
		}

		
		service.CheckCapacity=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Scope",params,undefined,false); 
			copyArg(n,"Rules",params,undefined,true); 
			
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"Rules",params,undefined,true); 
			

			svc.checkCapacity(params,cb);
		}

		
		service.CreateIPSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Scope",params,undefined,false); 
			copyArg(n,"IPAddressVersion",params,undefined,false); 
			copyArg(n,"Addresses",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"IPAddressVersion",params,undefined,false); 
			copyArg(msg,"Addresses",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createIPSet(params,cb);
		}

		
		service.CreateRegexPatternSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Scope",params,undefined,false); 
			copyArg(n,"RegularExpressionList",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"RegularExpressionList",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createRegexPatternSet(params,cb);
		}

		
		service.CreateRuleGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Scope",params,undefined,false); 
			copyArg(n,"Capacity",params,undefined,false); 
			copyArg(n,"VisibilityConfig",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"Capacity",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Rules",params,undefined,true); 
			copyArg(msg,"VisibilityConfig",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"CustomResponseBodies",params,undefined,true); 
			

			svc.createRuleGroup(params,cb);
		}

		
		service.CreateWebACL=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Scope",params,undefined,false); 
			copyArg(n,"DefaultAction",params,undefined,true); 
			copyArg(n,"VisibilityConfig",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"DefaultAction",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Rules",params,undefined,true); 
			copyArg(msg,"VisibilityConfig",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"CustomResponseBodies",params,undefined,true); 
			

			svc.createWebACL(params,cb);
		}

		
		service.DeleteFirewallManagerRuleGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WebACLArn",params,undefined,false); 
			copyArg(n,"WebACLLockToken",params,undefined,false); 
			
			copyArg(msg,"WebACLArn",params,undefined,false); 
			copyArg(msg,"WebACLLockToken",params,undefined,false); 
			

			svc.deleteFirewallManagerRuleGroups(params,cb);
		}

		
		service.DeleteIPSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Scope",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"LockToken",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"LockToken",params,undefined,false); 
			

			svc.deleteIPSet(params,cb);
		}

		
		service.DeleteLoggingConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.deleteLoggingConfiguration(params,cb);
		}

		
		service.DeletePermissionPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.deletePermissionPolicy(params,cb);
		}

		
		service.DeleteRegexPatternSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Scope",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"LockToken",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"LockToken",params,undefined,false); 
			

			svc.deleteRegexPatternSet(params,cb);
		}

		
		service.DeleteRuleGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Scope",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"LockToken",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"LockToken",params,undefined,false); 
			

			svc.deleteRuleGroup(params,cb);
		}

		
		service.DeleteWebACL=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Scope",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"LockToken",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"LockToken",params,undefined,false); 
			

			svc.deleteWebACL(params,cb);
		}

		
		service.DescribeManagedRuleGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VendorName",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Scope",params,undefined,false); 
			
			copyArg(msg,"VendorName",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"VersionName",params,undefined,false); 
			

			svc.describeManagedRuleGroup(params,cb);
		}

		
		service.DisassociateWebACL=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.disassociateWebACL(params,cb);
		}

		
		service.GetIPSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Scope",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getIPSet(params,cb);
		}

		
		service.GetLoggingConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.getLoggingConfiguration(params,cb);
		}

		
		service.GetManagedRuleSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Scope",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getManagedRuleSet(params,cb);
		}

		
		service.GetPermissionPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.getPermissionPolicy(params,cb);
		}

		
		service.GetRateBasedStatementManagedKeys=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Scope",params,undefined,false); 
			copyArg(n,"WebACLName",params,undefined,false); 
			copyArg(n,"WebACLId",params,undefined,false); 
			copyArg(n,"RuleName",params,undefined,false); 
			
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"WebACLName",params,undefined,false); 
			copyArg(msg,"WebACLId",params,undefined,false); 
			copyArg(msg,"RuleName",params,undefined,false); 
			

			svc.getRateBasedStatementManagedKeys(params,cb);
		}

		
		service.GetRegexPatternSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Scope",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getRegexPatternSet(params,cb);
		}

		
		service.GetRuleGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"ARN",params,undefined,false); 
			

			svc.getRuleGroup(params,cb);
		}

		
		service.GetSampledRequests=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WebAclArn",params,undefined,false); 
			copyArg(n,"RuleMetricName",params,undefined,false); 
			copyArg(n,"Scope",params,undefined,false); 
			copyArg(n,"TimeWindow",params,undefined,true); 
			copyArg(n,"MaxItems",params,undefined,false); 
			
			copyArg(msg,"WebAclArn",params,undefined,false); 
			copyArg(msg,"RuleMetricName",params,undefined,false); 
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"TimeWindow",params,undefined,true); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.getSampledRequests(params,cb);
		}

		
		service.GetWebACL=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Scope",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getWebACL(params,cb);
		}

		
		service.GetWebACLForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.getWebACLForResource(params,cb);
		}

		
		service.ListAvailableManagedRuleGroupVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VendorName",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Scope",params,undefined,false); 
			
			copyArg(msg,"VendorName",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"NextMarker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listAvailableManagedRuleGroupVersions(params,cb);
		}

		
		service.ListAvailableManagedRuleGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Scope",params,undefined,false); 
			
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"NextMarker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listAvailableManagedRuleGroups(params,cb);
		}

		
		service.ListIPSets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Scope",params,undefined,false); 
			
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"NextMarker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listIPSets(params,cb);
		}

		
		service.ListLoggingConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"NextMarker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listLoggingConfigurations(params,cb);
		}

		
		service.ListManagedRuleSets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Scope",params,undefined,false); 
			
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"NextMarker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listManagedRuleSets(params,cb);
		}

		
		service.ListRegexPatternSets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Scope",params,undefined,false); 
			
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"NextMarker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listRegexPatternSets(params,cb);
		}

		
		service.ListResourcesForWebACL=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WebACLArn",params,undefined,false); 
			
			copyArg(msg,"WebACLArn",params,undefined,false); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			

			svc.listResourcesForWebACL(params,cb);
		}

		
		service.ListRuleGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Scope",params,undefined,false); 
			
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"NextMarker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listRuleGroups(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARN",params,undefined,false); 
			
			copyArg(msg,"NextMarker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"ResourceARN",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListWebACLs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Scope",params,undefined,false); 
			
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"NextMarker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listWebACLs(params,cb);
		}

		
		service.PutLoggingConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LoggingConfiguration",params,undefined,true); 
			
			copyArg(msg,"LoggingConfiguration",params,undefined,true); 
			

			svc.putLoggingConfiguration(params,cb);
		}

		
		service.PutManagedRuleSetVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Scope",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"LockToken",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"LockToken",params,undefined,false); 
			copyArg(msg,"RecommendedVersion",params,undefined,false); 
			copyArg(msg,"VersionsToPublish",params,undefined,false); 
			

			svc.putManagedRuleSetVersions(params,cb);
		}

		
		service.PutPermissionPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"Policy",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"Policy",params,undefined,false); 
			

			svc.putPermissionPolicy(params,cb);
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

		
		service.UpdateIPSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Scope",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"Addresses",params,undefined,true); 
			copyArg(n,"LockToken",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Addresses",params,undefined,true); 
			copyArg(msg,"LockToken",params,undefined,false); 
			

			svc.updateIPSet(params,cb);
		}

		
		service.UpdateManagedRuleSetVersionExpiryDate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Scope",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"LockToken",params,undefined,false); 
			copyArg(n,"VersionToExpire",params,undefined,false); 
			copyArg(n,"ExpiryTimestamp",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"LockToken",params,undefined,false); 
			copyArg(msg,"VersionToExpire",params,undefined,false); 
			copyArg(msg,"ExpiryTimestamp",params,undefined,false); 
			

			svc.updateManagedRuleSetVersionExpiryDate(params,cb);
		}

		
		service.UpdateRegexPatternSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Scope",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"RegularExpressionList",params,undefined,true); 
			copyArg(n,"LockToken",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"RegularExpressionList",params,undefined,true); 
			copyArg(msg,"LockToken",params,undefined,false); 
			

			svc.updateRegexPatternSet(params,cb);
		}

		
		service.UpdateRuleGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Scope",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"VisibilityConfig",params,undefined,true); 
			copyArg(n,"LockToken",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Rules",params,undefined,true); 
			copyArg(msg,"VisibilityConfig",params,undefined,true); 
			copyArg(msg,"LockToken",params,undefined,false); 
			copyArg(msg,"CustomResponseBodies",params,undefined,true); 
			

			svc.updateRuleGroup(params,cb);
		}

		
		service.UpdateWebACL=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Scope",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"DefaultAction",params,undefined,true); 
			copyArg(n,"VisibilityConfig",params,undefined,true); 
			copyArg(n,"LockToken",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Scope",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"DefaultAction",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Rules",params,undefined,true); 
			copyArg(msg,"VisibilityConfig",params,undefined,true); 
			copyArg(msg,"LockToken",params,undefined,false); 
			copyArg(msg,"CustomResponseBodies",params,undefined,true); 
			

			svc.updateWebACL(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS WAFV2", AmazonAPINode);

};
