
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

		var awsService = new AWS.Route53Resolver( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Route53Resolver(msg.AWSConfig) : awsService;

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

		
		service.AssociateFirewallRuleGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CreatorRequestId",params,undefined,false); 
			copyArg(n,"FirewallRuleGroupId",params,undefined,false); 
			copyArg(n,"VpcId",params,undefined,false); 
			copyArg(n,"Priority",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"CreatorRequestId",params,undefined,false); 
			copyArg(msg,"FirewallRuleGroupId",params,undefined,false); 
			copyArg(msg,"VpcId",params,undefined,false); 
			copyArg(msg,"Priority",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"MutationProtection",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.associateFirewallRuleGroup(params,cb);
		}

		
		service.AssociateResolverEndpointIpAddress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResolverEndpointId",params,undefined,false); 
			copyArg(n,"IpAddress",params,undefined,true); 
			
			copyArg(msg,"ResolverEndpointId",params,undefined,false); 
			copyArg(msg,"IpAddress",params,undefined,true); 
			

			svc.associateResolverEndpointIpAddress(params,cb);
		}

		
		service.AssociateResolverQueryLogConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResolverQueryLogConfigId",params,undefined,false); 
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"ResolverQueryLogConfigId",params,undefined,false); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			

			svc.associateResolverQueryLogConfig(params,cb);
		}

		
		service.AssociateResolverRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResolverRuleId",params,undefined,false); 
			copyArg(n,"VPCId",params,undefined,false); 
			
			copyArg(msg,"ResolverRuleId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"VPCId",params,undefined,false); 
			

			svc.associateResolverRule(params,cb);
		}

		
		service.CreateFirewallDomainList=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CreatorRequestId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"CreatorRequestId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createFirewallDomainList(params,cb);
		}

		
		service.CreateFirewallRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CreatorRequestId",params,undefined,false); 
			copyArg(n,"FirewallRuleGroupId",params,undefined,false); 
			copyArg(n,"FirewallDomainListId",params,undefined,false); 
			copyArg(n,"Priority",params,undefined,false); 
			copyArg(n,"Action",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"CreatorRequestId",params,undefined,false); 
			copyArg(msg,"FirewallRuleGroupId",params,undefined,false); 
			copyArg(msg,"FirewallDomainListId",params,undefined,false); 
			copyArg(msg,"Priority",params,undefined,false); 
			copyArg(msg,"Action",params,undefined,false); 
			copyArg(msg,"BlockResponse",params,undefined,false); 
			copyArg(msg,"BlockOverrideDomain",params,undefined,false); 
			copyArg(msg,"BlockOverrideDnsType",params,undefined,false); 
			copyArg(msg,"BlockOverrideTtl",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.createFirewallRule(params,cb);
		}

		
		service.CreateFirewallRuleGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CreatorRequestId",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"CreatorRequestId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createFirewallRuleGroup(params,cb);
		}

		
		service.CreateResolverEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CreatorRequestId",params,undefined,false); 
			copyArg(n,"SecurityGroupIds",params,undefined,true); 
			copyArg(n,"Direction",params,undefined,false); 
			copyArg(n,"IpAddresses",params,undefined,false); 
			
			copyArg(msg,"CreatorRequestId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"SecurityGroupIds",params,undefined,true); 
			copyArg(msg,"Direction",params,undefined,false); 
			copyArg(msg,"IpAddresses",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createResolverEndpoint(params,cb);
		}

		
		service.CreateResolverQueryLogConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"DestinationArn",params,undefined,false); 
			copyArg(n,"CreatorRequestId",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"DestinationArn",params,undefined,false); 
			copyArg(msg,"CreatorRequestId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createResolverQueryLogConfig(params,cb);
		}

		
		service.CreateResolverRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CreatorRequestId",params,undefined,false); 
			copyArg(n,"RuleType",params,undefined,false); 
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"CreatorRequestId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"RuleType",params,undefined,false); 
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"TargetIps",params,undefined,true); 
			copyArg(msg,"ResolverEndpointId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createResolverRule(params,cb);
		}

		
		service.DeleteFirewallDomainList=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FirewallDomainListId",params,undefined,false); 
			
			copyArg(msg,"FirewallDomainListId",params,undefined,false); 
			

			svc.deleteFirewallDomainList(params,cb);
		}

		
		service.DeleteFirewallRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FirewallRuleGroupId",params,undefined,false); 
			copyArg(n,"FirewallDomainListId",params,undefined,false); 
			
			copyArg(msg,"FirewallRuleGroupId",params,undefined,false); 
			copyArg(msg,"FirewallDomainListId",params,undefined,false); 
			

			svc.deleteFirewallRule(params,cb);
		}

		
		service.DeleteFirewallRuleGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FirewallRuleGroupId",params,undefined,false); 
			
			copyArg(msg,"FirewallRuleGroupId",params,undefined,false); 
			

			svc.deleteFirewallRuleGroup(params,cb);
		}

		
		service.DeleteResolverEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResolverEndpointId",params,undefined,false); 
			
			copyArg(msg,"ResolverEndpointId",params,undefined,false); 
			

			svc.deleteResolverEndpoint(params,cb);
		}

		
		service.DeleteResolverQueryLogConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResolverQueryLogConfigId",params,undefined,false); 
			
			copyArg(msg,"ResolverQueryLogConfigId",params,undefined,false); 
			

			svc.deleteResolverQueryLogConfig(params,cb);
		}

		
		service.DeleteResolverRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResolverRuleId",params,undefined,false); 
			
			copyArg(msg,"ResolverRuleId",params,undefined,false); 
			

			svc.deleteResolverRule(params,cb);
		}

		
		service.DisassociateFirewallRuleGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FirewallRuleGroupAssociationId",params,undefined,false); 
			
			copyArg(msg,"FirewallRuleGroupAssociationId",params,undefined,false); 
			

			svc.disassociateFirewallRuleGroup(params,cb);
		}

		
		service.DisassociateResolverEndpointIpAddress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResolverEndpointId",params,undefined,false); 
			copyArg(n,"IpAddress",params,undefined,true); 
			
			copyArg(msg,"ResolverEndpointId",params,undefined,false); 
			copyArg(msg,"IpAddress",params,undefined,true); 
			

			svc.disassociateResolverEndpointIpAddress(params,cb);
		}

		
		service.DisassociateResolverQueryLogConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResolverQueryLogConfigId",params,undefined,false); 
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"ResolverQueryLogConfigId",params,undefined,false); 
			copyArg(msg,"ResourceId",params,undefined,false); 
			

			svc.disassociateResolverQueryLogConfig(params,cb);
		}

		
		service.DisassociateResolverRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VPCId",params,undefined,false); 
			copyArg(n,"ResolverRuleId",params,undefined,false); 
			
			copyArg(msg,"VPCId",params,undefined,false); 
			copyArg(msg,"ResolverRuleId",params,undefined,false); 
			

			svc.disassociateResolverRule(params,cb);
		}

		
		service.GetFirewallConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			

			svc.getFirewallConfig(params,cb);
		}

		
		service.GetFirewallDomainList=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FirewallDomainListId",params,undefined,false); 
			
			copyArg(msg,"FirewallDomainListId",params,undefined,false); 
			

			svc.getFirewallDomainList(params,cb);
		}

		
		service.GetFirewallRuleGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FirewallRuleGroupId",params,undefined,false); 
			
			copyArg(msg,"FirewallRuleGroupId",params,undefined,false); 
			

			svc.getFirewallRuleGroup(params,cb);
		}

		
		service.GetFirewallRuleGroupAssociation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FirewallRuleGroupAssociationId",params,undefined,false); 
			
			copyArg(msg,"FirewallRuleGroupAssociationId",params,undefined,false); 
			

			svc.getFirewallRuleGroupAssociation(params,cb);
		}

		
		service.GetFirewallRuleGroupPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Arn",params,undefined,false); 
			
			copyArg(msg,"Arn",params,undefined,false); 
			

			svc.getFirewallRuleGroupPolicy(params,cb);
		}

		
		service.GetResolverDnssecConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			

			svc.getResolverDnssecConfig(params,cb);
		}

		
		service.GetResolverEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResolverEndpointId",params,undefined,false); 
			
			copyArg(msg,"ResolverEndpointId",params,undefined,false); 
			

			svc.getResolverEndpoint(params,cb);
		}

		
		service.GetResolverQueryLogConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResolverQueryLogConfigId",params,undefined,false); 
			
			copyArg(msg,"ResolverQueryLogConfigId",params,undefined,false); 
			

			svc.getResolverQueryLogConfig(params,cb);
		}

		
		service.GetResolverQueryLogConfigAssociation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResolverQueryLogConfigAssociationId",params,undefined,false); 
			
			copyArg(msg,"ResolverQueryLogConfigAssociationId",params,undefined,false); 
			

			svc.getResolverQueryLogConfigAssociation(params,cb);
		}

		
		service.GetResolverQueryLogConfigPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Arn",params,undefined,false); 
			
			copyArg(msg,"Arn",params,undefined,false); 
			

			svc.getResolverQueryLogConfigPolicy(params,cb);
		}

		
		service.GetResolverRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResolverRuleId",params,undefined,false); 
			
			copyArg(msg,"ResolverRuleId",params,undefined,false); 
			

			svc.getResolverRule(params,cb);
		}

		
		service.GetResolverRuleAssociation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResolverRuleAssociationId",params,undefined,false); 
			
			copyArg(msg,"ResolverRuleAssociationId",params,undefined,false); 
			

			svc.getResolverRuleAssociation(params,cb);
		}

		
		service.GetResolverRulePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Arn",params,undefined,false); 
			
			copyArg(msg,"Arn",params,undefined,false); 
			

			svc.getResolverRulePolicy(params,cb);
		}

		
		service.ImportFirewallDomains=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FirewallDomainListId",params,undefined,false); 
			copyArg(n,"Operation",params,undefined,false); 
			copyArg(n,"DomainFileUrl",params,undefined,false); 
			
			copyArg(msg,"FirewallDomainListId",params,undefined,false); 
			copyArg(msg,"Operation",params,undefined,false); 
			copyArg(msg,"DomainFileUrl",params,undefined,false); 
			

			svc.importFirewallDomains(params,cb);
		}

		
		service.ListFirewallConfigs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listFirewallConfigs(params,cb);
		}

		
		service.ListFirewallDomainLists=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listFirewallDomainLists(params,cb);
		}

		
		service.ListFirewallDomains=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FirewallDomainListId",params,undefined,false); 
			
			copyArg(msg,"FirewallDomainListId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listFirewallDomains(params,cb);
		}

		
		service.ListFirewallRuleGroupAssociations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"FirewallRuleGroupId",params,undefined,false); 
			copyArg(msg,"VpcId",params,undefined,false); 
			copyArg(msg,"Priority",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listFirewallRuleGroupAssociations(params,cb);
		}

		
		service.ListFirewallRuleGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listFirewallRuleGroups(params,cb);
		}

		
		service.ListFirewallRules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FirewallRuleGroupId",params,undefined,false); 
			
			copyArg(msg,"FirewallRuleGroupId",params,undefined,false); 
			copyArg(msg,"Priority",params,undefined,false); 
			copyArg(msg,"Action",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listFirewallRules(params,cb);
		}

		
		service.ListResolverDnssecConfigs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			

			svc.listResolverDnssecConfigs(params,cb);
		}

		
		service.ListResolverEndpointIpAddresses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResolverEndpointId",params,undefined,false); 
			
			copyArg(msg,"ResolverEndpointId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listResolverEndpointIpAddresses(params,cb);
		}

		
		service.ListResolverEndpoints=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			

			svc.listResolverEndpoints(params,cb);
		}

		
		service.ListResolverQueryLogConfigAssociations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			

			svc.listResolverQueryLogConfigAssociations(params,cb);
		}

		
		service.ListResolverQueryLogConfigs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"SortBy",params,undefined,false); 
			copyArg(msg,"SortOrder",params,undefined,false); 
			

			svc.listResolverQueryLogConfigs(params,cb);
		}

		
		service.ListResolverRuleAssociations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			

			svc.listResolverRuleAssociations(params,cb);
		}

		
		service.ListResolverRules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,true); 
			

			svc.listResolverRules(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutFirewallRuleGroupPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Arn",params,undefined,false); 
			copyArg(n,"FirewallRuleGroupPolicy",params,undefined,false); 
			
			copyArg(msg,"Arn",params,undefined,false); 
			copyArg(msg,"FirewallRuleGroupPolicy",params,undefined,false); 
			

			svc.putFirewallRuleGroupPolicy(params,cb);
		}

		
		service.PutResolverQueryLogConfigPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Arn",params,undefined,false); 
			copyArg(n,"ResolverQueryLogConfigPolicy",params,undefined,false); 
			
			copyArg(msg,"Arn",params,undefined,false); 
			copyArg(msg,"ResolverQueryLogConfigPolicy",params,undefined,false); 
			

			svc.putResolverQueryLogConfigPolicy(params,cb);
		}

		
		service.PutResolverRulePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Arn",params,undefined,false); 
			copyArg(n,"ResolverRulePolicy",params,undefined,false); 
			
			copyArg(msg,"Arn",params,undefined,false); 
			copyArg(msg,"ResolverRulePolicy",params,undefined,false); 
			

			svc.putResolverRulePolicy(params,cb);
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

		
		service.UpdateFirewallConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"FirewallFailOpen",params,undefined,false); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"FirewallFailOpen",params,undefined,false); 
			

			svc.updateFirewallConfig(params,cb);
		}

		
		service.UpdateFirewallDomains=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FirewallDomainListId",params,undefined,false); 
			copyArg(n,"Operation",params,undefined,false); 
			copyArg(n,"Domains",params,undefined,true); 
			
			copyArg(msg,"FirewallDomainListId",params,undefined,false); 
			copyArg(msg,"Operation",params,undefined,false); 
			copyArg(msg,"Domains",params,undefined,true); 
			

			svc.updateFirewallDomains(params,cb);
		}

		
		service.UpdateFirewallRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FirewallRuleGroupId",params,undefined,false); 
			copyArg(n,"FirewallDomainListId",params,undefined,false); 
			
			copyArg(msg,"FirewallRuleGroupId",params,undefined,false); 
			copyArg(msg,"FirewallDomainListId",params,undefined,false); 
			copyArg(msg,"Priority",params,undefined,false); 
			copyArg(msg,"Action",params,undefined,false); 
			copyArg(msg,"BlockResponse",params,undefined,false); 
			copyArg(msg,"BlockOverrideDomain",params,undefined,false); 
			copyArg(msg,"BlockOverrideDnsType",params,undefined,false); 
			copyArg(msg,"BlockOverrideTtl",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.updateFirewallRule(params,cb);
		}

		
		service.UpdateFirewallRuleGroupAssociation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FirewallRuleGroupAssociationId",params,undefined,false); 
			
			copyArg(msg,"FirewallRuleGroupAssociationId",params,undefined,false); 
			copyArg(msg,"Priority",params,undefined,false); 
			copyArg(msg,"MutationProtection",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.updateFirewallRuleGroupAssociation(params,cb);
		}

		
		service.UpdateResolverDnssecConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceId",params,undefined,false); 
			copyArg(n,"Validation",params,undefined,false); 
			
			copyArg(msg,"ResourceId",params,undefined,false); 
			copyArg(msg,"Validation",params,undefined,false); 
			

			svc.updateResolverDnssecConfig(params,cb);
		}

		
		service.UpdateResolverEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResolverEndpointId",params,undefined,false); 
			
			copyArg(msg,"ResolverEndpointId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.updateResolverEndpoint(params,cb);
		}

		
		service.UpdateResolverRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResolverRuleId",params,undefined,false); 
			copyArg(n,"Config",params,undefined,false); 
			
			copyArg(msg,"ResolverRuleId",params,undefined,false); 
			copyArg(msg,"Config",params,undefined,false); 
			

			svc.updateResolverRule(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Route53Resolver", AmazonAPINode);

};
