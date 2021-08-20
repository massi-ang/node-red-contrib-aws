
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

		var awsService = new AWS.NetworkFirewall( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.NetworkFirewall(msg.AWSConfig) : awsService;

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

		
		service.AssociateFirewallPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FirewallPolicyArn",params,undefined,false); 
			
			copyArg(msg,"UpdateToken",params,undefined,false); 
			copyArg(msg,"FirewallArn",params,undefined,false); 
			copyArg(msg,"FirewallName",params,undefined,false); 
			copyArg(msg,"FirewallPolicyArn",params,undefined,false); 
			

			svc.associateFirewallPolicy(params,cb);
		}

		
		service.AssociateSubnets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubnetMappings",params,undefined,true); 
			
			copyArg(msg,"UpdateToken",params,undefined,false); 
			copyArg(msg,"FirewallArn",params,undefined,false); 
			copyArg(msg,"FirewallName",params,undefined,false); 
			copyArg(msg,"SubnetMappings",params,undefined,true); 
			

			svc.associateSubnets(params,cb);
		}

		
		service.CreateFirewall=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FirewallName",params,undefined,false); 
			copyArg(n,"FirewallPolicyArn",params,undefined,false); 
			copyArg(n,"VpcId",params,undefined,false); 
			copyArg(n,"SubnetMappings",params,undefined,true); 
			
			copyArg(msg,"FirewallName",params,undefined,false); 
			copyArg(msg,"FirewallPolicyArn",params,undefined,false); 
			copyArg(msg,"VpcId",params,undefined,false); 
			copyArg(msg,"SubnetMappings",params,undefined,true); 
			copyArg(msg,"DeleteProtection",params,undefined,false); 
			copyArg(msg,"SubnetChangeProtection",params,undefined,false); 
			copyArg(msg,"FirewallPolicyChangeProtection",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createFirewall(params,cb);
		}

		
		service.CreateFirewallPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FirewallPolicyName",params,undefined,false); 
			copyArg(n,"FirewallPolicy",params,undefined,true); 
			
			copyArg(msg,"FirewallPolicyName",params,undefined,false); 
			copyArg(msg,"FirewallPolicy",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.createFirewallPolicy(params,cb);
		}

		
		service.CreateRuleGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RuleGroupName",params,undefined,false); 
			copyArg(n,"Type",params,undefined,false); 
			copyArg(n,"Capacity",params,undefined,false); 
			
			copyArg(msg,"RuleGroupName",params,undefined,false); 
			copyArg(msg,"RuleGroup",params,undefined,true); 
			copyArg(msg,"Rules",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Capacity",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.createRuleGroup(params,cb);
		}

		
		service.DeleteFirewall=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"FirewallName",params,undefined,false); 
			copyArg(msg,"FirewallArn",params,undefined,false); 
			

			svc.deleteFirewall(params,cb);
		}

		
		service.DeleteFirewallPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"FirewallPolicyName",params,undefined,false); 
			copyArg(msg,"FirewallPolicyArn",params,undefined,false); 
			

			svc.deleteFirewallPolicy(params,cb);
		}

		
		service.DeleteResourcePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.deleteResourcePolicy(params,cb);
		}

		
		service.DeleteRuleGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"RuleGroupName",params,undefined,false); 
			copyArg(msg,"RuleGroupArn",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			

			svc.deleteRuleGroup(params,cb);
		}

		
		service.DescribeFirewall=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"FirewallName",params,undefined,false); 
			copyArg(msg,"FirewallArn",params,undefined,false); 
			

			svc.describeFirewall(params,cb);
		}

		
		service.DescribeFirewallPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"FirewallPolicyName",params,undefined,false); 
			copyArg(msg,"FirewallPolicyArn",params,undefined,false); 
			

			svc.describeFirewallPolicy(params,cb);
		}

		
		service.DescribeLoggingConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"FirewallArn",params,undefined,false); 
			copyArg(msg,"FirewallName",params,undefined,false); 
			

			svc.describeLoggingConfiguration(params,cb);
		}

		
		service.DescribeResourcePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.describeResourcePolicy(params,cb);
		}

		
		service.DescribeRuleGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"RuleGroupName",params,undefined,false); 
			copyArg(msg,"RuleGroupArn",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			

			svc.describeRuleGroup(params,cb);
		}

		
		service.DisassociateSubnets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubnetIds",params,undefined,false); 
			
			copyArg(msg,"UpdateToken",params,undefined,false); 
			copyArg(msg,"FirewallArn",params,undefined,false); 
			copyArg(msg,"FirewallName",params,undefined,false); 
			copyArg(msg,"SubnetIds",params,undefined,false); 
			

			svc.disassociateSubnets(params,cb);
		}

		
		service.ListFirewallPolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listFirewallPolicies(params,cb);
		}

		
		service.ListFirewalls=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"VpcIds",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listFirewalls(params,cb);
		}

		
		service.ListRuleGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listRuleGroups(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutResourcePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"Policy",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"Policy",params,undefined,false); 
			

			svc.putResourcePolicy(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateFirewallDeleteProtection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeleteProtection",params,undefined,false); 
			
			copyArg(msg,"UpdateToken",params,undefined,false); 
			copyArg(msg,"FirewallArn",params,undefined,false); 
			copyArg(msg,"FirewallName",params,undefined,false); 
			copyArg(msg,"DeleteProtection",params,undefined,false); 
			

			svc.updateFirewallDeleteProtection(params,cb);
		}

		
		service.UpdateFirewallDescription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"UpdateToken",params,undefined,false); 
			copyArg(msg,"FirewallArn",params,undefined,false); 
			copyArg(msg,"FirewallName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			

			svc.updateFirewallDescription(params,cb);
		}

		
		service.UpdateFirewallPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UpdateToken",params,undefined,false); 
			copyArg(n,"FirewallPolicy",params,undefined,true); 
			
			copyArg(msg,"UpdateToken",params,undefined,false); 
			copyArg(msg,"FirewallPolicyArn",params,undefined,false); 
			copyArg(msg,"FirewallPolicyName",params,undefined,false); 
			copyArg(msg,"FirewallPolicy",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.updateFirewallPolicy(params,cb);
		}

		
		service.UpdateFirewallPolicyChangeProtection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FirewallPolicyChangeProtection",params,undefined,false); 
			
			copyArg(msg,"UpdateToken",params,undefined,false); 
			copyArg(msg,"FirewallArn",params,undefined,false); 
			copyArg(msg,"FirewallName",params,undefined,false); 
			copyArg(msg,"FirewallPolicyChangeProtection",params,undefined,false); 
			

			svc.updateFirewallPolicyChangeProtection(params,cb);
		}

		
		service.UpdateLoggingConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"FirewallArn",params,undefined,false); 
			copyArg(msg,"FirewallName",params,undefined,false); 
			copyArg(msg,"LoggingConfiguration",params,undefined,true); 
			

			svc.updateLoggingConfiguration(params,cb);
		}

		
		service.UpdateRuleGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UpdateToken",params,undefined,false); 
			
			copyArg(msg,"UpdateToken",params,undefined,false); 
			copyArg(msg,"RuleGroupArn",params,undefined,false); 
			copyArg(msg,"RuleGroupName",params,undefined,false); 
			copyArg(msg,"RuleGroup",params,undefined,true); 
			copyArg(msg,"Rules",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.updateRuleGroup(params,cb);
		}

		
		service.UpdateSubnetChangeProtection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubnetChangeProtection",params,undefined,false); 
			
			copyArg(msg,"UpdateToken",params,undefined,false); 
			copyArg(msg,"FirewallArn",params,undefined,false); 
			copyArg(msg,"FirewallName",params,undefined,false); 
			copyArg(msg,"SubnetChangeProtection",params,undefined,false); 
			

			svc.updateSubnetChangeProtection(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS NetworkFirewall", AmazonAPINode);

};
