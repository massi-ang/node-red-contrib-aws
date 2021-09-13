
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

		var awsService = new AWS.NetworkFirewall( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.NetworkFirewall(msg.AWSConfig) : awsService;

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
		
			service.AssociateFirewallPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FirewallPolicyArn",params,undefined,false); 
			
			copyArgs(n,"UpdateToken",params,undefined,false); 
			copyArgs(n,"FirewallArn",params,undefined,false); 
			copyArgs(n,"FirewallName",params,undefined,false); 
			copyArgs(n,"FirewallPolicyArn",params,undefined,false); 
			
			copyArgs(msg,"UpdateToken",params,undefined,false); 
			copyArgs(msg,"FirewallArn",params,undefined,false); 
			copyArgs(msg,"FirewallName",params,undefined,false); 
			copyArgs(msg,"FirewallPolicyArn",params,undefined,false); 
			

			svc.associateFirewallPolicy(params,cb);
		}
			service.AssociateSubnets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubnetMappings",params,undefined,true); 
			
			copyArgs(n,"UpdateToken",params,undefined,false); 
			copyArgs(n,"FirewallArn",params,undefined,false); 
			copyArgs(n,"FirewallName",params,undefined,false); 
			copyArgs(n,"SubnetMappings",params,undefined,true); 
			
			copyArgs(msg,"UpdateToken",params,undefined,false); 
			copyArgs(msg,"FirewallArn",params,undefined,false); 
			copyArgs(msg,"FirewallName",params,undefined,false); 
			copyArgs(msg,"SubnetMappings",params,undefined,true); 
			

			svc.associateSubnets(params,cb);
		}
			service.CreateFirewall=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FirewallName",params,undefined,false); 
			copyArgs(n,"FirewallPolicyArn",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"SubnetMappings",params,undefined,true); 
			
			copyArgs(n,"FirewallName",params,undefined,false); 
			copyArgs(n,"FirewallPolicyArn",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(n,"SubnetMappings",params,undefined,true); 
			copyArgs(Boolean(n),"DeleteProtection",params,undefined,false); 
			copyArgs(Boolean(n),"SubnetChangeProtection",params,undefined,false); 
			copyArgs(Boolean(n),"FirewallPolicyChangeProtection",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"FirewallName",params,undefined,false); 
			copyArgs(msg,"FirewallPolicyArn",params,undefined,false); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			copyArgs(msg,"SubnetMappings",params,undefined,true); 
			copyArgs(msg,"DeleteProtection",params,undefined,false); 
			copyArgs(msg,"SubnetChangeProtection",params,undefined,false); 
			copyArgs(msg,"FirewallPolicyChangeProtection",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createFirewall(params,cb);
		}
			service.CreateFirewallPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FirewallPolicyName",params,undefined,false); 
			copyArgs(n,"FirewallPolicy",params,undefined,true); 
			
			copyArgs(n,"FirewallPolicyName",params,undefined,false); 
			copyArgs(n,"FirewallPolicy",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"FirewallPolicyName",params,undefined,false); 
			copyArgs(msg,"FirewallPolicy",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.createFirewallPolicy(params,cb);
		}
			service.CreateRuleGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"RuleGroupName",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(Number(n),"Capacity",params,undefined,false); 
			
			copyArgs(n,"RuleGroupName",params,undefined,false); 
			copyArgs(n,"RuleGroup",params,undefined,true); 
			copyArgs(n,"Rules",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(Number(n),"Capacity",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"RuleGroupName",params,undefined,false); 
			copyArgs(msg,"RuleGroup",params,undefined,true); 
			copyArgs(msg,"Rules",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Capacity",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.createRuleGroup(params,cb);
		}
			service.DeleteFirewall=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"FirewallName",params,undefined,false); 
			copyArgs(n,"FirewallArn",params,undefined,false); 
			
			copyArgs(msg,"FirewallName",params,undefined,false); 
			copyArgs(msg,"FirewallArn",params,undefined,false); 
			

			svc.deleteFirewall(params,cb);
		}
			service.DeleteFirewallPolicy=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"FirewallPolicyName",params,undefined,false); 
			copyArgs(n,"FirewallPolicyArn",params,undefined,false); 
			
			copyArgs(msg,"FirewallPolicyName",params,undefined,false); 
			copyArgs(msg,"FirewallPolicyArn",params,undefined,false); 
			

			svc.deleteFirewallPolicy(params,cb);
		}
			service.DeleteResourcePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.deleteResourcePolicy(params,cb);
		}
			service.DeleteRuleGroup=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"RuleGroupName",params,undefined,false); 
			copyArgs(n,"RuleGroupArn",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(msg,"RuleGroupName",params,undefined,false); 
			copyArgs(msg,"RuleGroupArn",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			

			svc.deleteRuleGroup(params,cb);
		}
			service.DescribeFirewall=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"FirewallName",params,undefined,false); 
			copyArgs(n,"FirewallArn",params,undefined,false); 
			
			copyArgs(msg,"FirewallName",params,undefined,false); 
			copyArgs(msg,"FirewallArn",params,undefined,false); 
			

			svc.describeFirewall(params,cb);
		}
			service.DescribeFirewallPolicy=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"FirewallPolicyName",params,undefined,false); 
			copyArgs(n,"FirewallPolicyArn",params,undefined,false); 
			
			copyArgs(msg,"FirewallPolicyName",params,undefined,false); 
			copyArgs(msg,"FirewallPolicyArn",params,undefined,false); 
			

			svc.describeFirewallPolicy(params,cb);
		}
			service.DescribeLoggingConfiguration=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"FirewallArn",params,undefined,false); 
			copyArgs(n,"FirewallName",params,undefined,false); 
			
			copyArgs(msg,"FirewallArn",params,undefined,false); 
			copyArgs(msg,"FirewallName",params,undefined,false); 
			

			svc.describeLoggingConfiguration(params,cb);
		}
			service.DescribeResourcePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.describeResourcePolicy(params,cb);
		}
			service.DescribeRuleGroup=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"RuleGroupName",params,undefined,false); 
			copyArgs(n,"RuleGroupArn",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(msg,"RuleGroupName",params,undefined,false); 
			copyArgs(msg,"RuleGroupArn",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			

			svc.describeRuleGroup(params,cb);
		}
			service.DisassociateSubnets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SubnetIds",params,undefined,false); 
			
			copyArgs(n,"UpdateToken",params,undefined,false); 
			copyArgs(n,"FirewallArn",params,undefined,false); 
			copyArgs(n,"FirewallName",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,false); 
			
			copyArgs(msg,"UpdateToken",params,undefined,false); 
			copyArgs(msg,"FirewallArn",params,undefined,false); 
			copyArgs(msg,"FirewallName",params,undefined,false); 
			copyArgs(msg,"SubnetIds",params,undefined,false); 
			

			svc.disassociateSubnets(params,cb);
		}
			service.ListFirewallPolicies=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listFirewallPolicies(params,cb);
		}
			service.ListFirewalls=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"VpcIds",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"VpcIds",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listFirewalls(params,cb);
		}
			service.ListRuleGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listRuleGroups(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.PutResourcePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"Policy",params,undefined,false); 
			

			svc.putResourcePolicy(params,cb);
		}
			service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
			service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
			service.UpdateFirewallDeleteProtection=function(svc,msg,cb){
			var params={};
			
			copyArgs(Boolean(n),"DeleteProtection",params,undefined,false); 
			
			copyArgs(n,"UpdateToken",params,undefined,false); 
			copyArgs(n,"FirewallArn",params,undefined,false); 
			copyArgs(n,"FirewallName",params,undefined,false); 
			copyArgs(Boolean(n),"DeleteProtection",params,undefined,false); 
			
			copyArgs(msg,"UpdateToken",params,undefined,false); 
			copyArgs(msg,"FirewallArn",params,undefined,false); 
			copyArgs(msg,"FirewallName",params,undefined,false); 
			copyArgs(msg,"DeleteProtection",params,undefined,false); 
			

			svc.updateFirewallDeleteProtection(params,cb);
		}
			service.UpdateFirewallDescription=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"UpdateToken",params,undefined,false); 
			copyArgs(n,"FirewallArn",params,undefined,false); 
			copyArgs(n,"FirewallName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(msg,"UpdateToken",params,undefined,false); 
			copyArgs(msg,"FirewallArn",params,undefined,false); 
			copyArgs(msg,"FirewallName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			

			svc.updateFirewallDescription(params,cb);
		}
			service.UpdateFirewallPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UpdateToken",params,undefined,false); 
			copyArgs(n,"FirewallPolicy",params,undefined,true); 
			
			copyArgs(n,"UpdateToken",params,undefined,false); 
			copyArgs(n,"FirewallPolicyArn",params,undefined,false); 
			copyArgs(n,"FirewallPolicyName",params,undefined,false); 
			copyArgs(n,"FirewallPolicy",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"UpdateToken",params,undefined,false); 
			copyArgs(msg,"FirewallPolicyArn",params,undefined,false); 
			copyArgs(msg,"FirewallPolicyName",params,undefined,false); 
			copyArgs(msg,"FirewallPolicy",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.updateFirewallPolicy(params,cb);
		}
			service.UpdateFirewallPolicyChangeProtection=function(svc,msg,cb){
			var params={};
			
			copyArgs(Boolean(n),"FirewallPolicyChangeProtection",params,undefined,false); 
			
			copyArgs(n,"UpdateToken",params,undefined,false); 
			copyArgs(n,"FirewallArn",params,undefined,false); 
			copyArgs(n,"FirewallName",params,undefined,false); 
			copyArgs(Boolean(n),"FirewallPolicyChangeProtection",params,undefined,false); 
			
			copyArgs(msg,"UpdateToken",params,undefined,false); 
			copyArgs(msg,"FirewallArn",params,undefined,false); 
			copyArgs(msg,"FirewallName",params,undefined,false); 
			copyArgs(msg,"FirewallPolicyChangeProtection",params,undefined,false); 
			

			svc.updateFirewallPolicyChangeProtection(params,cb);
		}
			service.UpdateLoggingConfiguration=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"FirewallArn",params,undefined,false); 
			copyArgs(n,"FirewallName",params,undefined,false); 
			copyArgs(n,"LoggingConfiguration",params,undefined,true); 
			
			copyArgs(msg,"FirewallArn",params,undefined,false); 
			copyArgs(msg,"FirewallName",params,undefined,false); 
			copyArgs(msg,"LoggingConfiguration",params,undefined,true); 
			

			svc.updateLoggingConfiguration(params,cb);
		}
			service.UpdateRuleGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UpdateToken",params,undefined,false); 
			
			copyArgs(n,"UpdateToken",params,undefined,false); 
			copyArgs(n,"RuleGroupArn",params,undefined,false); 
			copyArgs(n,"RuleGroupName",params,undefined,false); 
			copyArgs(n,"RuleGroup",params,undefined,true); 
			copyArgs(n,"Rules",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"UpdateToken",params,undefined,false); 
			copyArgs(msg,"RuleGroupArn",params,undefined,false); 
			copyArgs(msg,"RuleGroupName",params,undefined,false); 
			copyArgs(msg,"RuleGroup",params,undefined,true); 
			copyArgs(msg,"Rules",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.updateRuleGroup(params,cb);
		}
			service.UpdateSubnetChangeProtection=function(svc,msg,cb){
			var params={};
			
			copyArgs(Boolean(n),"SubnetChangeProtection",params,undefined,false); 
			
			copyArgs(n,"UpdateToken",params,undefined,false); 
			copyArgs(n,"FirewallArn",params,undefined,false); 
			copyArgs(n,"FirewallName",params,undefined,false); 
			copyArgs(Boolean(n),"SubnetChangeProtection",params,undefined,false); 
			
			copyArgs(msg,"UpdateToken",params,undefined,false); 
			copyArgs(msg,"FirewallArn",params,undefined,false); 
			copyArgs(msg,"FirewallName",params,undefined,false); 
			copyArgs(msg,"SubnetChangeProtection",params,undefined,false); 
			

			svc.updateSubnetChangeProtection(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS NetworkFirewall", AmazonAPINode);

};
