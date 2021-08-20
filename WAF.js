
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

		var awsService = new AWS.WAF( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.WAF(msg.AWSConfig) : awsService;

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

		
		service.CreateByteMatchSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			

			svc.createByteMatchSet(params,cb);
		}

		
		service.CreateGeoMatchSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			

			svc.createGeoMatchSet(params,cb);
		}

		
		service.CreateIPSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			

			svc.createIPSet(params,cb);
		}

		
		service.CreateRateBasedRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"MetricName",params,undefined,false); 
			copyArg(n,"RateKey",params,undefined,false); 
			copyArg(n,"RateLimit",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"MetricName",params,undefined,false); 
			copyArg(msg,"RateKey",params,undefined,false); 
			copyArg(msg,"RateLimit",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createRateBasedRule(params,cb);
		}

		
		service.CreateRegexMatchSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			

			svc.createRegexMatchSet(params,cb);
		}

		
		service.CreateRegexPatternSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			

			svc.createRegexPatternSet(params,cb);
		}

		
		service.CreateRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"MetricName",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"MetricName",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createRule(params,cb);
		}

		
		service.CreateRuleGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"MetricName",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"MetricName",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createRuleGroup(params,cb);
		}

		
		service.CreateSizeConstraintSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			

			svc.createSizeConstraintSet(params,cb);
		}

		
		service.CreateSqlInjectionMatchSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			

			svc.createSqlInjectionMatchSet(params,cb);
		}

		
		service.CreateWebACL=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"MetricName",params,undefined,false); 
			copyArg(n,"DefaultAction",params,undefined,true); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"MetricName",params,undefined,false); 
			copyArg(msg,"DefaultAction",params,undefined,true); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createWebACL(params,cb);
		}

		
		service.CreateWebACLMigrationStack=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WebACLId",params,undefined,false); 
			copyArg(n,"S3BucketName",params,undefined,false); 
			copyArg(n,"IgnoreUnsupportedType",params,undefined,false); 
			
			copyArg(msg,"WebACLId",params,undefined,false); 
			copyArg(msg,"S3BucketName",params,undefined,false); 
			copyArg(msg,"IgnoreUnsupportedType",params,undefined,false); 
			

			svc.createWebACLMigrationStack(params,cb);
		}

		
		service.CreateXssMatchSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			

			svc.createXssMatchSet(params,cb);
		}

		
		service.DeleteByteMatchSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ByteMatchSetId",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"ByteMatchSetId",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			

			svc.deleteByteMatchSet(params,cb);
		}

		
		service.DeleteGeoMatchSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GeoMatchSetId",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"GeoMatchSetId",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			

			svc.deleteGeoMatchSet(params,cb);
		}

		
		service.DeleteIPSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IPSetId",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"IPSetId",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			

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

		
		service.DeleteRateBasedRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RuleId",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"RuleId",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			

			svc.deleteRateBasedRule(params,cb);
		}

		
		service.DeleteRegexMatchSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RegexMatchSetId",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"RegexMatchSetId",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			

			svc.deleteRegexMatchSet(params,cb);
		}

		
		service.DeleteRegexPatternSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RegexPatternSetId",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"RegexPatternSetId",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			

			svc.deleteRegexPatternSet(params,cb);
		}

		
		service.DeleteRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RuleId",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"RuleId",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			

			svc.deleteRule(params,cb);
		}

		
		service.DeleteRuleGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RuleGroupId",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"RuleGroupId",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			

			svc.deleteRuleGroup(params,cb);
		}

		
		service.DeleteSizeConstraintSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SizeConstraintSetId",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"SizeConstraintSetId",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			

			svc.deleteSizeConstraintSet(params,cb);
		}

		
		service.DeleteSqlInjectionMatchSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SqlInjectionMatchSetId",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"SqlInjectionMatchSetId",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			

			svc.deleteSqlInjectionMatchSet(params,cb);
		}

		
		service.DeleteWebACL=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WebACLId",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"WebACLId",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			

			svc.deleteWebACL(params,cb);
		}

		
		service.DeleteXssMatchSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"XssMatchSetId",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"XssMatchSetId",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			

			svc.deleteXssMatchSet(params,cb);
		}

		
		service.GetByteMatchSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ByteMatchSetId",params,undefined,false); 
			
			copyArg(msg,"ByteMatchSetId",params,undefined,false); 
			

			svc.getByteMatchSet(params,cb);
		}

		
		service.GetChangeToken=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getChangeToken(params,cb);
		}

		
		service.GetChangeTokenStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"ChangeToken",params,undefined,false); 
			

			svc.getChangeTokenStatus(params,cb);
		}

		
		service.GetGeoMatchSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GeoMatchSetId",params,undefined,false); 
			
			copyArg(msg,"GeoMatchSetId",params,undefined,false); 
			

			svc.getGeoMatchSet(params,cb);
		}

		
		service.GetIPSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IPSetId",params,undefined,false); 
			
			copyArg(msg,"IPSetId",params,undefined,false); 
			

			svc.getIPSet(params,cb);
		}

		
		service.GetLoggingConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.getLoggingConfiguration(params,cb);
		}

		
		service.GetPermissionPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.getPermissionPolicy(params,cb);
		}

		
		service.GetRateBasedRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RuleId",params,undefined,false); 
			
			copyArg(msg,"RuleId",params,undefined,false); 
			

			svc.getRateBasedRule(params,cb);
		}

		
		service.GetRateBasedRuleManagedKeys=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RuleId",params,undefined,false); 
			
			copyArg(msg,"RuleId",params,undefined,false); 
			copyArg(msg,"NextMarker",params,undefined,false); 
			

			svc.getRateBasedRuleManagedKeys(params,cb);
		}

		
		service.GetRegexMatchSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RegexMatchSetId",params,undefined,false); 
			
			copyArg(msg,"RegexMatchSetId",params,undefined,false); 
			

			svc.getRegexMatchSet(params,cb);
		}

		
		service.GetRegexPatternSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RegexPatternSetId",params,undefined,false); 
			
			copyArg(msg,"RegexPatternSetId",params,undefined,false); 
			

			svc.getRegexPatternSet(params,cb);
		}

		
		service.GetRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RuleId",params,undefined,false); 
			
			copyArg(msg,"RuleId",params,undefined,false); 
			

			svc.getRule(params,cb);
		}

		
		service.GetRuleGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RuleGroupId",params,undefined,false); 
			
			copyArg(msg,"RuleGroupId",params,undefined,false); 
			

			svc.getRuleGroup(params,cb);
		}

		
		service.GetSampledRequests=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WebAclId",params,undefined,false); 
			copyArg(n,"RuleId",params,undefined,false); 
			copyArg(n,"TimeWindow",params,undefined,true); 
			copyArg(n,"MaxItems",params,undefined,false); 
			
			copyArg(msg,"WebAclId",params,undefined,false); 
			copyArg(msg,"RuleId",params,undefined,false); 
			copyArg(msg,"TimeWindow",params,undefined,true); 
			copyArg(msg,"MaxItems",params,undefined,false); 
			

			svc.getSampledRequests(params,cb);
		}

		
		service.GetSizeConstraintSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SizeConstraintSetId",params,undefined,false); 
			
			copyArg(msg,"SizeConstraintSetId",params,undefined,false); 
			

			svc.getSizeConstraintSet(params,cb);
		}

		
		service.GetSqlInjectionMatchSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SqlInjectionMatchSetId",params,undefined,false); 
			
			copyArg(msg,"SqlInjectionMatchSetId",params,undefined,false); 
			

			svc.getSqlInjectionMatchSet(params,cb);
		}

		
		service.GetWebACL=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WebACLId",params,undefined,false); 
			
			copyArg(msg,"WebACLId",params,undefined,false); 
			

			svc.getWebACL(params,cb);
		}

		
		service.GetXssMatchSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"XssMatchSetId",params,undefined,false); 
			
			copyArg(msg,"XssMatchSetId",params,undefined,false); 
			

			svc.getXssMatchSet(params,cb);
		}

		
		service.ListActivatedRulesInRuleGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"RuleGroupId",params,undefined,false); 
			copyArg(msg,"NextMarker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listActivatedRulesInRuleGroup(params,cb);
		}

		
		service.ListByteMatchSets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextMarker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listByteMatchSets(params,cb);
		}

		
		service.ListGeoMatchSets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextMarker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listGeoMatchSets(params,cb);
		}

		
		service.ListIPSets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextMarker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listIPSets(params,cb);
		}

		
		service.ListLoggingConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextMarker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listLoggingConfigurations(params,cb);
		}

		
		service.ListRateBasedRules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextMarker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listRateBasedRules(params,cb);
		}

		
		service.ListRegexMatchSets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextMarker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listRegexMatchSets(params,cb);
		}

		
		service.ListRegexPatternSets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextMarker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listRegexPatternSets(params,cb);
		}

		
		service.ListRuleGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextMarker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listRuleGroups(params,cb);
		}

		
		service.ListRules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextMarker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listRules(params,cb);
		}

		
		service.ListSizeConstraintSets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextMarker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listSizeConstraintSets(params,cb);
		}

		
		service.ListSqlInjectionMatchSets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextMarker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listSqlInjectionMatchSets(params,cb);
		}

		
		service.ListSubscribedRuleGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextMarker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listSubscribedRuleGroups(params,cb);
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
			
			
			copyArg(msg,"NextMarker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listWebACLs(params,cb);
		}

		
		service.ListXssMatchSets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextMarker",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listXssMatchSets(params,cb);
		}

		
		service.PutLoggingConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LoggingConfiguration",params,undefined,true); 
			
			copyArg(msg,"LoggingConfiguration",params,undefined,true); 
			

			svc.putLoggingConfiguration(params,cb);
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

		
		service.UpdateByteMatchSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ByteMatchSetId",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			copyArg(n,"Updates",params,undefined,false); 
			
			copyArg(msg,"ByteMatchSetId",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			copyArg(msg,"Updates",params,undefined,false); 
			

			svc.updateByteMatchSet(params,cb);
		}

		
		service.UpdateGeoMatchSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GeoMatchSetId",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			copyArg(n,"Updates",params,undefined,false); 
			
			copyArg(msg,"GeoMatchSetId",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			copyArg(msg,"Updates",params,undefined,false); 
			

			svc.updateGeoMatchSet(params,cb);
		}

		
		service.UpdateIPSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IPSetId",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			copyArg(n,"Updates",params,undefined,false); 
			
			copyArg(msg,"IPSetId",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			copyArg(msg,"Updates",params,undefined,false); 
			

			svc.updateIPSet(params,cb);
		}

		
		service.UpdateRateBasedRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RuleId",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			copyArg(n,"Updates",params,undefined,true); 
			copyArg(n,"RateLimit",params,undefined,false); 
			
			copyArg(msg,"RuleId",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			copyArg(msg,"Updates",params,undefined,true); 
			copyArg(msg,"RateLimit",params,undefined,false); 
			

			svc.updateRateBasedRule(params,cb);
		}

		
		service.UpdateRegexMatchSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RegexMatchSetId",params,undefined,false); 
			copyArg(n,"Updates",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"RegexMatchSetId",params,undefined,false); 
			copyArg(msg,"Updates",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			

			svc.updateRegexMatchSet(params,cb);
		}

		
		service.UpdateRegexPatternSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RegexPatternSetId",params,undefined,false); 
			copyArg(n,"Updates",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"RegexPatternSetId",params,undefined,false); 
			copyArg(msg,"Updates",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			

			svc.updateRegexPatternSet(params,cb);
		}

		
		service.UpdateRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RuleId",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			copyArg(n,"Updates",params,undefined,true); 
			
			copyArg(msg,"RuleId",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			copyArg(msg,"Updates",params,undefined,true); 
			

			svc.updateRule(params,cb);
		}

		
		service.UpdateRuleGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RuleGroupId",params,undefined,false); 
			copyArg(n,"Updates",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"RuleGroupId",params,undefined,false); 
			copyArg(msg,"Updates",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			

			svc.updateRuleGroup(params,cb);
		}

		
		service.UpdateSizeConstraintSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SizeConstraintSetId",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			copyArg(n,"Updates",params,undefined,false); 
			
			copyArg(msg,"SizeConstraintSetId",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			copyArg(msg,"Updates",params,undefined,false); 
			

			svc.updateSizeConstraintSet(params,cb);
		}

		
		service.UpdateSqlInjectionMatchSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SqlInjectionMatchSetId",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			copyArg(n,"Updates",params,undefined,false); 
			
			copyArg(msg,"SqlInjectionMatchSetId",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			copyArg(msg,"Updates",params,undefined,false); 
			

			svc.updateSqlInjectionMatchSet(params,cb);
		}

		
		service.UpdateWebACL=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WebACLId",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			
			copyArg(msg,"WebACLId",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			copyArg(msg,"Updates",params,undefined,false); 
			copyArg(msg,"DefaultAction",params,undefined,true); 
			

			svc.updateWebACL(params,cb);
		}

		
		service.UpdateXssMatchSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"XssMatchSetId",params,undefined,false); 
			copyArg(n,"ChangeToken",params,undefined,false); 
			copyArg(n,"Updates",params,undefined,false); 
			
			copyArg(msg,"XssMatchSetId",params,undefined,false); 
			copyArg(msg,"ChangeToken",params,undefined,false); 
			copyArg(msg,"Updates",params,undefined,false); 
			

			svc.updateXssMatchSet(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS WAF", AmazonAPINode);

};
