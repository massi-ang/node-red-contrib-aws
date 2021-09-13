
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

		var awsService = new AWS.Route53Resolver( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Route53Resolver(msg.AWSConfig) : awsService;

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
		
			service.AssociateFirewallRuleGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CreatorRequestId",params,undefined,false); 
			copyArgs(n,"FirewallRuleGroupId",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(Number(n),"Priority",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"CreatorRequestId",params,undefined,false); 
			copyArgs(n,"FirewallRuleGroupId",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(Number(n),"Priority",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"MutationProtection",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"CreatorRequestId",params,undefined,false); 
			copyArgs(msg,"FirewallRuleGroupId",params,undefined,false); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			copyArgs(msg,"Priority",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"MutationProtection",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.associateFirewallRuleGroup(params,cb);
		}
			service.AssociateResolverEndpointIpAddress=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResolverEndpointId",params,undefined,false); 
			copyArgs(n,"IpAddress",params,undefined,true); 
			
			copyArgs(n,"ResolverEndpointId",params,undefined,false); 
			copyArgs(n,"IpAddress",params,undefined,true); 
			
			copyArgs(msg,"ResolverEndpointId",params,undefined,false); 
			copyArgs(msg,"IpAddress",params,undefined,true); 
			

			svc.associateResolverEndpointIpAddress(params,cb);
		}
			service.AssociateResolverQueryLogConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResolverQueryLogConfigId",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"ResolverQueryLogConfigId",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(msg,"ResolverQueryLogConfigId",params,undefined,false); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			

			svc.associateResolverQueryLogConfig(params,cb);
		}
			service.AssociateResolverRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResolverRuleId",params,undefined,false); 
			copyArgs(n,"VPCId",params,undefined,false); 
			
			copyArgs(n,"ResolverRuleId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"VPCId",params,undefined,false); 
			
			copyArgs(msg,"ResolverRuleId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"VPCId",params,undefined,false); 
			

			svc.associateResolverRule(params,cb);
		}
			service.CreateFirewallDomainList=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CreatorRequestId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"CreatorRequestId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"CreatorRequestId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createFirewallDomainList(params,cb);
		}
			service.CreateFirewallRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CreatorRequestId",params,undefined,false); 
			copyArgs(n,"FirewallRuleGroupId",params,undefined,false); 
			copyArgs(n,"FirewallDomainListId",params,undefined,false); 
			copyArgs(Number(n),"Priority",params,undefined,false); 
			copyArgs(n,"Action",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"CreatorRequestId",params,undefined,false); 
			copyArgs(n,"FirewallRuleGroupId",params,undefined,false); 
			copyArgs(n,"FirewallDomainListId",params,undefined,false); 
			copyArgs(Number(n),"Priority",params,undefined,false); 
			copyArgs(n,"Action",params,undefined,false); 
			copyArgs(n,"BlockResponse",params,undefined,false); 
			copyArgs(n,"BlockOverrideDomain",params,undefined,false); 
			copyArgs(n,"BlockOverrideDnsType",params,undefined,false); 
			copyArgs(Number(n),"BlockOverrideTtl",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"CreatorRequestId",params,undefined,false); 
			copyArgs(msg,"FirewallRuleGroupId",params,undefined,false); 
			copyArgs(msg,"FirewallDomainListId",params,undefined,false); 
			copyArgs(msg,"Priority",params,undefined,false); 
			copyArgs(msg,"Action",params,undefined,false); 
			copyArgs(msg,"BlockResponse",params,undefined,false); 
			copyArgs(msg,"BlockOverrideDomain",params,undefined,false); 
			copyArgs(msg,"BlockOverrideDnsType",params,undefined,false); 
			copyArgs(msg,"BlockOverrideTtl",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.createFirewallRule(params,cb);
		}
			service.CreateFirewallRuleGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CreatorRequestId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"CreatorRequestId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"CreatorRequestId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createFirewallRuleGroup(params,cb);
		}
			service.CreateResolverEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CreatorRequestId",params,undefined,false); 
			copyArgs(n,"SecurityGroupIds",params,undefined,true); 
			copyArgs(n,"Direction",params,undefined,false); 
			copyArgs(n,"IpAddresses",params,undefined,false); 
			
			copyArgs(n,"CreatorRequestId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"SecurityGroupIds",params,undefined,true); 
			copyArgs(n,"Direction",params,undefined,false); 
			copyArgs(n,"IpAddresses",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"CreatorRequestId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"SecurityGroupIds",params,undefined,true); 
			copyArgs(msg,"Direction",params,undefined,false); 
			copyArgs(msg,"IpAddresses",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createResolverEndpoint(params,cb);
		}
			service.CreateResolverQueryLogConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"DestinationArn",params,undefined,false); 
			copyArgs(n,"CreatorRequestId",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"DestinationArn",params,undefined,false); 
			copyArgs(n,"CreatorRequestId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"DestinationArn",params,undefined,false); 
			copyArgs(msg,"CreatorRequestId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createResolverQueryLogConfig(params,cb);
		}
			service.CreateResolverRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CreatorRequestId",params,undefined,false); 
			copyArgs(n,"RuleType",params,undefined,false); 
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"CreatorRequestId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RuleType",params,undefined,false); 
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"TargetIps",params,undefined,true); 
			copyArgs(n,"ResolverEndpointId",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"CreatorRequestId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"RuleType",params,undefined,false); 
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"TargetIps",params,undefined,true); 
			copyArgs(msg,"ResolverEndpointId",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createResolverRule(params,cb);
		}
			service.DeleteFirewallDomainList=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FirewallDomainListId",params,undefined,false); 
			
			copyArgs(n,"FirewallDomainListId",params,undefined,false); 
			
			copyArgs(msg,"FirewallDomainListId",params,undefined,false); 
			

			svc.deleteFirewallDomainList(params,cb);
		}
			service.DeleteFirewallRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FirewallRuleGroupId",params,undefined,false); 
			copyArgs(n,"FirewallDomainListId",params,undefined,false); 
			
			copyArgs(n,"FirewallRuleGroupId",params,undefined,false); 
			copyArgs(n,"FirewallDomainListId",params,undefined,false); 
			
			copyArgs(msg,"FirewallRuleGroupId",params,undefined,false); 
			copyArgs(msg,"FirewallDomainListId",params,undefined,false); 
			

			svc.deleteFirewallRule(params,cb);
		}
			service.DeleteFirewallRuleGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FirewallRuleGroupId",params,undefined,false); 
			
			copyArgs(n,"FirewallRuleGroupId",params,undefined,false); 
			
			copyArgs(msg,"FirewallRuleGroupId",params,undefined,false); 
			

			svc.deleteFirewallRuleGroup(params,cb);
		}
			service.DeleteResolverEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResolverEndpointId",params,undefined,false); 
			
			copyArgs(n,"ResolverEndpointId",params,undefined,false); 
			
			copyArgs(msg,"ResolverEndpointId",params,undefined,false); 
			

			svc.deleteResolverEndpoint(params,cb);
		}
			service.DeleteResolverQueryLogConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResolverQueryLogConfigId",params,undefined,false); 
			
			copyArgs(n,"ResolverQueryLogConfigId",params,undefined,false); 
			
			copyArgs(msg,"ResolverQueryLogConfigId",params,undefined,false); 
			

			svc.deleteResolverQueryLogConfig(params,cb);
		}
			service.DeleteResolverRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResolverRuleId",params,undefined,false); 
			
			copyArgs(n,"ResolverRuleId",params,undefined,false); 
			
			copyArgs(msg,"ResolverRuleId",params,undefined,false); 
			

			svc.deleteResolverRule(params,cb);
		}
			service.DisassociateFirewallRuleGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FirewallRuleGroupAssociationId",params,undefined,false); 
			
			copyArgs(n,"FirewallRuleGroupAssociationId",params,undefined,false); 
			
			copyArgs(msg,"FirewallRuleGroupAssociationId",params,undefined,false); 
			

			svc.disassociateFirewallRuleGroup(params,cb);
		}
			service.DisassociateResolverEndpointIpAddress=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResolverEndpointId",params,undefined,false); 
			copyArgs(n,"IpAddress",params,undefined,true); 
			
			copyArgs(n,"ResolverEndpointId",params,undefined,false); 
			copyArgs(n,"IpAddress",params,undefined,true); 
			
			copyArgs(msg,"ResolverEndpointId",params,undefined,false); 
			copyArgs(msg,"IpAddress",params,undefined,true); 
			

			svc.disassociateResolverEndpointIpAddress(params,cb);
		}
			service.DisassociateResolverQueryLogConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResolverQueryLogConfigId",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"ResolverQueryLogConfigId",params,undefined,false); 
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(msg,"ResolverQueryLogConfigId",params,undefined,false); 
			copyArgs(msg,"ResourceId",params,undefined,false); 
			

			svc.disassociateResolverQueryLogConfig(params,cb);
		}
			service.DisassociateResolverRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"VPCId",params,undefined,false); 
			copyArgs(n,"ResolverRuleId",params,undefined,false); 
			
			copyArgs(n,"VPCId",params,undefined,false); 
			copyArgs(n,"ResolverRuleId",params,undefined,false); 
			
			copyArgs(msg,"VPCId",params,undefined,false); 
			copyArgs(msg,"ResolverRuleId",params,undefined,false); 
			

			svc.disassociateResolverRule(params,cb);
		}
			service.GetFirewallConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			

			svc.getFirewallConfig(params,cb);
		}
			service.GetFirewallDomainList=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FirewallDomainListId",params,undefined,false); 
			
			copyArgs(n,"FirewallDomainListId",params,undefined,false); 
			
			copyArgs(msg,"FirewallDomainListId",params,undefined,false); 
			

			svc.getFirewallDomainList(params,cb);
		}
			service.GetFirewallRuleGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FirewallRuleGroupId",params,undefined,false); 
			
			copyArgs(n,"FirewallRuleGroupId",params,undefined,false); 
			
			copyArgs(msg,"FirewallRuleGroupId",params,undefined,false); 
			

			svc.getFirewallRuleGroup(params,cb);
		}
			service.GetFirewallRuleGroupAssociation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FirewallRuleGroupAssociationId",params,undefined,false); 
			
			copyArgs(n,"FirewallRuleGroupAssociationId",params,undefined,false); 
			
			copyArgs(msg,"FirewallRuleGroupAssociationId",params,undefined,false); 
			

			svc.getFirewallRuleGroupAssociation(params,cb);
		}
			service.GetFirewallRuleGroupPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			

			svc.getFirewallRuleGroupPolicy(params,cb);
		}
			service.GetResolverDnssecConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			

			svc.getResolverDnssecConfig(params,cb);
		}
			service.GetResolverEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResolverEndpointId",params,undefined,false); 
			
			copyArgs(n,"ResolverEndpointId",params,undefined,false); 
			
			copyArgs(msg,"ResolverEndpointId",params,undefined,false); 
			

			svc.getResolverEndpoint(params,cb);
		}
			service.GetResolverQueryLogConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResolverQueryLogConfigId",params,undefined,false); 
			
			copyArgs(n,"ResolverQueryLogConfigId",params,undefined,false); 
			
			copyArgs(msg,"ResolverQueryLogConfigId",params,undefined,false); 
			

			svc.getResolverQueryLogConfig(params,cb);
		}
			service.GetResolverQueryLogConfigAssociation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResolverQueryLogConfigAssociationId",params,undefined,false); 
			
			copyArgs(n,"ResolverQueryLogConfigAssociationId",params,undefined,false); 
			
			copyArgs(msg,"ResolverQueryLogConfigAssociationId",params,undefined,false); 
			

			svc.getResolverQueryLogConfigAssociation(params,cb);
		}
			service.GetResolverQueryLogConfigPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			

			svc.getResolverQueryLogConfigPolicy(params,cb);
		}
			service.GetResolverRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResolverRuleId",params,undefined,false); 
			
			copyArgs(n,"ResolverRuleId",params,undefined,false); 
			
			copyArgs(msg,"ResolverRuleId",params,undefined,false); 
			

			svc.getResolverRule(params,cb);
		}
			service.GetResolverRuleAssociation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResolverRuleAssociationId",params,undefined,false); 
			
			copyArgs(n,"ResolverRuleAssociationId",params,undefined,false); 
			
			copyArgs(msg,"ResolverRuleAssociationId",params,undefined,false); 
			

			svc.getResolverRuleAssociation(params,cb);
		}
			service.GetResolverRulePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			

			svc.getResolverRulePolicy(params,cb);
		}
			service.ImportFirewallDomains=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FirewallDomainListId",params,undefined,false); 
			copyArgs(n,"Operation",params,undefined,false); 
			copyArgs(n,"DomainFileUrl",params,undefined,false); 
			
			copyArgs(n,"FirewallDomainListId",params,undefined,false); 
			copyArgs(n,"Operation",params,undefined,false); 
			copyArgs(n,"DomainFileUrl",params,undefined,false); 
			
			copyArgs(msg,"FirewallDomainListId",params,undefined,false); 
			copyArgs(msg,"Operation",params,undefined,false); 
			copyArgs(msg,"DomainFileUrl",params,undefined,false); 
			

			svc.importFirewallDomains(params,cb);
		}
			service.ListFirewallConfigs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listFirewallConfigs(params,cb);
		}
			service.ListFirewallDomainLists=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listFirewallDomainLists(params,cb);
		}
			service.ListFirewallDomains=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FirewallDomainListId",params,undefined,false); 
			
			copyArgs(n,"FirewallDomainListId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"FirewallDomainListId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listFirewallDomains(params,cb);
		}
			service.ListFirewallRuleGroupAssociations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"FirewallRuleGroupId",params,undefined,false); 
			copyArgs(n,"VpcId",params,undefined,false); 
			copyArgs(Number(n),"Priority",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"FirewallRuleGroupId",params,undefined,false); 
			copyArgs(msg,"VpcId",params,undefined,false); 
			copyArgs(msg,"Priority",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listFirewallRuleGroupAssociations(params,cb);
		}
			service.ListFirewallRuleGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listFirewallRuleGroups(params,cb);
		}
			service.ListFirewallRules=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FirewallRuleGroupId",params,undefined,false); 
			
			copyArgs(n,"FirewallRuleGroupId",params,undefined,false); 
			copyArgs(Number(n),"Priority",params,undefined,false); 
			copyArgs(n,"Action",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"FirewallRuleGroupId",params,undefined,false); 
			copyArgs(msg,"Priority",params,undefined,false); 
			copyArgs(msg,"Action",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listFirewallRules(params,cb);
		}
			service.ListResolverDnssecConfigs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			

			svc.listResolverDnssecConfigs(params,cb);
		}
			service.ListResolverEndpointIpAddresses=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResolverEndpointId",params,undefined,false); 
			
			copyArgs(n,"ResolverEndpointId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ResolverEndpointId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listResolverEndpointIpAddresses(params,cb);
		}
			service.ListResolverEndpoints=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			

			svc.listResolverEndpoints(params,cb);
		}
			service.ListResolverQueryLogConfigAssociations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			

			svc.listResolverQueryLogConfigAssociations(params,cb);
		}
			service.ListResolverQueryLogConfigs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			copyArgs(n,"SortBy",params,undefined,false); 
			copyArgs(n,"SortOrder",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			copyArgs(msg,"SortBy",params,undefined,false); 
			copyArgs(msg,"SortOrder",params,undefined,false); 
			

			svc.listResolverQueryLogConfigs(params,cb);
		}
			service.ListResolverRuleAssociations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			

			svc.listResolverRuleAssociations(params,cb);
		}
			service.ListResolverRules=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Filters",params,undefined,true); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Filters",params,undefined,true); 
			

			svc.listResolverRules(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.PutFirewallRuleGroupPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"FirewallRuleGroupPolicy",params,undefined,false); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"FirewallRuleGroupPolicy",params,undefined,false); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			copyArgs(msg,"FirewallRuleGroupPolicy",params,undefined,false); 
			

			svc.putFirewallRuleGroupPolicy(params,cb);
		}
			service.PutResolverQueryLogConfigPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"ResolverQueryLogConfigPolicy",params,undefined,false); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"ResolverQueryLogConfigPolicy",params,undefined,false); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			copyArgs(msg,"ResolverQueryLogConfigPolicy",params,undefined,false); 
			

			svc.putResolverQueryLogConfigPolicy(params,cb);
		}
			service.PutResolverRulePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"ResolverRulePolicy",params,undefined,false); 
			
			copyArgs(n,"Arn",params,undefined,false); 
			copyArgs(n,"ResolverRulePolicy",params,undefined,false); 
			
			copyArgs(msg,"Arn",params,undefined,false); 
			copyArgs(msg,"ResolverRulePolicy",params,undefined,false); 
			

			svc.putResolverRulePolicy(params,cb);
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
			service.UpdateFirewallConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"FirewallFailOpen",params,undefined,false); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"FirewallFailOpen",params,undefined,false); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"FirewallFailOpen",params,undefined,false); 
			

			svc.updateFirewallConfig(params,cb);
		}
			service.UpdateFirewallDomains=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FirewallDomainListId",params,undefined,false); 
			copyArgs(n,"Operation",params,undefined,false); 
			copyArgs(n,"Domains",params,undefined,true); 
			
			copyArgs(n,"FirewallDomainListId",params,undefined,false); 
			copyArgs(n,"Operation",params,undefined,false); 
			copyArgs(n,"Domains",params,undefined,true); 
			
			copyArgs(msg,"FirewallDomainListId",params,undefined,false); 
			copyArgs(msg,"Operation",params,undefined,false); 
			copyArgs(msg,"Domains",params,undefined,true); 
			

			svc.updateFirewallDomains(params,cb);
		}
			service.UpdateFirewallRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FirewallRuleGroupId",params,undefined,false); 
			copyArgs(n,"FirewallDomainListId",params,undefined,false); 
			
			copyArgs(n,"FirewallRuleGroupId",params,undefined,false); 
			copyArgs(n,"FirewallDomainListId",params,undefined,false); 
			copyArgs(Number(n),"Priority",params,undefined,false); 
			copyArgs(n,"Action",params,undefined,false); 
			copyArgs(n,"BlockResponse",params,undefined,false); 
			copyArgs(n,"BlockOverrideDomain",params,undefined,false); 
			copyArgs(n,"BlockOverrideDnsType",params,undefined,false); 
			copyArgs(Number(n),"BlockOverrideTtl",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"FirewallRuleGroupId",params,undefined,false); 
			copyArgs(msg,"FirewallDomainListId",params,undefined,false); 
			copyArgs(msg,"Priority",params,undefined,false); 
			copyArgs(msg,"Action",params,undefined,false); 
			copyArgs(msg,"BlockResponse",params,undefined,false); 
			copyArgs(msg,"BlockOverrideDomain",params,undefined,false); 
			copyArgs(msg,"BlockOverrideDnsType",params,undefined,false); 
			copyArgs(msg,"BlockOverrideTtl",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.updateFirewallRule(params,cb);
		}
			service.UpdateFirewallRuleGroupAssociation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FirewallRuleGroupAssociationId",params,undefined,false); 
			
			copyArgs(n,"FirewallRuleGroupAssociationId",params,undefined,false); 
			copyArgs(Number(n),"Priority",params,undefined,false); 
			copyArgs(n,"MutationProtection",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"FirewallRuleGroupAssociationId",params,undefined,false); 
			copyArgs(msg,"Priority",params,undefined,false); 
			copyArgs(msg,"MutationProtection",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.updateFirewallRuleGroupAssociation(params,cb);
		}
			service.UpdateResolverDnssecConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"Validation",params,undefined,false); 
			
			copyArgs(n,"ResourceId",params,undefined,false); 
			copyArgs(n,"Validation",params,undefined,false); 
			
			copyArgs(msg,"ResourceId",params,undefined,false); 
			copyArgs(msg,"Validation",params,undefined,false); 
			

			svc.updateResolverDnssecConfig(params,cb);
		}
			service.UpdateResolverEndpoint=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResolverEndpointId",params,undefined,false); 
			
			copyArgs(n,"ResolverEndpointId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"ResolverEndpointId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.updateResolverEndpoint(params,cb);
		}
			service.UpdateResolverRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResolverRuleId",params,undefined,false); 
			copyArgs(n,"Config",params,undefined,false); 
			
			copyArgs(n,"ResolverRuleId",params,undefined,false); 
			copyArgs(n,"Config",params,undefined,false); 
			
			copyArgs(msg,"ResolverRuleId",params,undefined,false); 
			copyArgs(msg,"Config",params,undefined,false); 
			

			svc.updateResolverRule(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS Route53Resolver", AmazonAPINode);

};
