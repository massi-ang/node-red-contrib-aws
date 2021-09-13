
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

		var awsService = new AWS.ManagedBlockchain( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.ManagedBlockchain(msg.AWSConfig) : awsService;

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
		
			service.CreateMember=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"InvitationId",params,undefined,false); 
			copyArgs(n,"NetworkId",params,undefined,false); 
			copyArgs(n,"MemberConfiguration",params,undefined,true); 
			
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"InvitationId",params,undefined,false); 
			copyArgs(n,"NetworkId",params,undefined,false); 
			copyArgs(n,"MemberConfiguration",params,undefined,true); 
			
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"InvitationId",params,undefined,false); 
			copyArgs(msg,"NetworkId",params,undefined,false); 
			copyArgs(msg,"MemberConfiguration",params,undefined,true); 
			

			svc.createMember(params,cb);
		}
			service.CreateNetwork=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Framework",params,undefined,false); 
			copyArgs(n,"FrameworkVersion",params,undefined,false); 
			copyArgs(n,"VotingPolicy",params,undefined,true); 
			copyArgs(n,"MemberConfiguration",params,undefined,true); 
			
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Framework",params,undefined,false); 
			copyArgs(n,"FrameworkVersion",params,undefined,false); 
			copyArgs(n,"FrameworkConfiguration",params,undefined,false); 
			copyArgs(n,"VotingPolicy",params,undefined,true); 
			copyArgs(n,"MemberConfiguration",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Framework",params,undefined,false); 
			copyArgs(msg,"FrameworkVersion",params,undefined,false); 
			copyArgs(msg,"FrameworkConfiguration",params,undefined,false); 
			copyArgs(msg,"VotingPolicy",params,undefined,true); 
			copyArgs(msg,"MemberConfiguration",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createNetwork(params,cb);
		}
			service.CreateNode=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"NetworkId",params,undefined,false); 
			copyArgs(n,"NodeConfiguration",params,undefined,false); 
			
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"NetworkId",params,undefined,false); 
			copyArgs(n,"MemberId",params,undefined,false); 
			copyArgs(n,"NodeConfiguration",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"NetworkId",params,undefined,false); 
			copyArgs(msg,"MemberId",params,undefined,false); 
			copyArgs(msg,"NodeConfiguration",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createNode(params,cb);
		}
			service.CreateProposal=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"NetworkId",params,undefined,false); 
			copyArgs(n,"MemberId",params,undefined,false); 
			copyArgs(n,"Actions",params,undefined,true); 
			
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"NetworkId",params,undefined,false); 
			copyArgs(n,"MemberId",params,undefined,false); 
			copyArgs(n,"Actions",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"NetworkId",params,undefined,false); 
			copyArgs(msg,"MemberId",params,undefined,false); 
			copyArgs(msg,"Actions",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createProposal(params,cb);
		}
			service.DeleteMember=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NetworkId",params,undefined,false); 
			copyArgs(n,"MemberId",params,undefined,false); 
			
			copyArgs(n,"NetworkId",params,undefined,false); 
			copyArgs(n,"MemberId",params,undefined,false); 
			
			copyArgs(msg,"NetworkId",params,undefined,false); 
			copyArgs(msg,"MemberId",params,undefined,false); 
			

			svc.deleteMember(params,cb);
		}
			service.DeleteNode=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NetworkId",params,undefined,false); 
			copyArgs(n,"NodeId",params,undefined,false); 
			
			copyArgs(n,"NetworkId",params,undefined,false); 
			copyArgs(n,"MemberId",params,undefined,false); 
			copyArgs(n,"NodeId",params,undefined,false); 
			
			copyArgs(msg,"NetworkId",params,undefined,false); 
			copyArgs(msg,"MemberId",params,undefined,false); 
			copyArgs(msg,"NodeId",params,undefined,false); 
			

			svc.deleteNode(params,cb);
		}
			service.GetMember=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NetworkId",params,undefined,false); 
			copyArgs(n,"MemberId",params,undefined,false); 
			
			copyArgs(n,"NetworkId",params,undefined,false); 
			copyArgs(n,"MemberId",params,undefined,false); 
			
			copyArgs(msg,"NetworkId",params,undefined,false); 
			copyArgs(msg,"MemberId",params,undefined,false); 
			

			svc.getMember(params,cb);
		}
			service.GetNetwork=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NetworkId",params,undefined,false); 
			
			copyArgs(n,"NetworkId",params,undefined,false); 
			
			copyArgs(msg,"NetworkId",params,undefined,false); 
			

			svc.getNetwork(params,cb);
		}
			service.GetNode=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NetworkId",params,undefined,false); 
			copyArgs(n,"NodeId",params,undefined,false); 
			
			copyArgs(n,"NetworkId",params,undefined,false); 
			copyArgs(n,"MemberId",params,undefined,false); 
			copyArgs(n,"NodeId",params,undefined,false); 
			
			copyArgs(msg,"NetworkId",params,undefined,false); 
			copyArgs(msg,"MemberId",params,undefined,false); 
			copyArgs(msg,"NodeId",params,undefined,false); 
			

			svc.getNode(params,cb);
		}
			service.GetProposal=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NetworkId",params,undefined,false); 
			copyArgs(n,"ProposalId",params,undefined,false); 
			
			copyArgs(n,"NetworkId",params,undefined,false); 
			copyArgs(n,"ProposalId",params,undefined,false); 
			
			copyArgs(msg,"NetworkId",params,undefined,false); 
			copyArgs(msg,"ProposalId",params,undefined,false); 
			

			svc.getProposal(params,cb);
		}
			service.ListInvitations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listInvitations(params,cb);
		}
			service.ListMembers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NetworkId",params,undefined,false); 
			
			copyArgs(n,"NetworkId",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			copyArgs(Boolean(n),"IsOwned",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"NetworkId",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			copyArgs(msg,"IsOwned",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listMembers(params,cb);
		}
			service.ListNetworks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Framework",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Framework",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listNetworks(params,cb);
		}
			service.ListNodes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NetworkId",params,undefined,false); 
			
			copyArgs(n,"NetworkId",params,undefined,false); 
			copyArgs(n,"MemberId",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"NetworkId",params,undefined,false); 
			copyArgs(msg,"MemberId",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listNodes(params,cb);
		}
			service.ListProposalVotes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NetworkId",params,undefined,false); 
			copyArgs(n,"ProposalId",params,undefined,false); 
			
			copyArgs(n,"NetworkId",params,undefined,false); 
			copyArgs(n,"ProposalId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"NetworkId",params,undefined,false); 
			copyArgs(msg,"ProposalId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listProposalVotes(params,cb);
		}
			service.ListProposals=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NetworkId",params,undefined,false); 
			
			copyArgs(n,"NetworkId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"NetworkId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listProposals(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.RejectInvitation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"InvitationId",params,undefined,false); 
			
			copyArgs(n,"InvitationId",params,undefined,false); 
			
			copyArgs(msg,"InvitationId",params,undefined,false); 
			

			svc.rejectInvitation(params,cb);
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
			service.UpdateMember=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NetworkId",params,undefined,false); 
			copyArgs(n,"MemberId",params,undefined,false); 
			
			copyArgs(n,"NetworkId",params,undefined,false); 
			copyArgs(n,"MemberId",params,undefined,false); 
			copyArgs(n,"LogPublishingConfiguration",params,undefined,true); 
			
			copyArgs(msg,"NetworkId",params,undefined,false); 
			copyArgs(msg,"MemberId",params,undefined,false); 
			copyArgs(msg,"LogPublishingConfiguration",params,undefined,true); 
			

			svc.updateMember(params,cb);
		}
			service.UpdateNode=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NetworkId",params,undefined,false); 
			copyArgs(n,"NodeId",params,undefined,false); 
			
			copyArgs(n,"NetworkId",params,undefined,false); 
			copyArgs(n,"MemberId",params,undefined,false); 
			copyArgs(n,"NodeId",params,undefined,false); 
			copyArgs(n,"LogPublishingConfiguration",params,undefined,true); 
			
			copyArgs(msg,"NetworkId",params,undefined,false); 
			copyArgs(msg,"MemberId",params,undefined,false); 
			copyArgs(msg,"NodeId",params,undefined,false); 
			copyArgs(msg,"LogPublishingConfiguration",params,undefined,true); 
			

			svc.updateNode(params,cb);
		}
			service.VoteOnProposal=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"NetworkId",params,undefined,false); 
			copyArgs(n,"ProposalId",params,undefined,false); 
			copyArgs(n,"VoterMemberId",params,undefined,false); 
			copyArgs(n,"Vote",params,undefined,false); 
			
			copyArgs(n,"NetworkId",params,undefined,false); 
			copyArgs(n,"ProposalId",params,undefined,false); 
			copyArgs(n,"VoterMemberId",params,undefined,false); 
			copyArgs(n,"Vote",params,undefined,false); 
			
			copyArgs(msg,"NetworkId",params,undefined,false); 
			copyArgs(msg,"ProposalId",params,undefined,false); 
			copyArgs(msg,"VoterMemberId",params,undefined,false); 
			copyArgs(msg,"Vote",params,undefined,false); 
			

			svc.voteOnProposal(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS ManagedBlockchain", AmazonAPINode);

};
