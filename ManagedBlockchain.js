
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

		var awsService = new AWS.ManagedBlockchain( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.ManagedBlockchain(msg.AWSConfig) : awsService;

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

		
		service.CreateMember=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClientRequestToken",params,undefined,false); 
			copyArg(n,"InvitationId",params,undefined,false); 
			copyArg(n,"NetworkId",params,undefined,false); 
			copyArg(n,"MemberConfiguration",params,undefined,true); 
			
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"InvitationId",params,undefined,false); 
			copyArg(msg,"NetworkId",params,undefined,false); 
			copyArg(msg,"MemberConfiguration",params,undefined,true); 
			

			svc.createMember(params,cb);
		}

		
		service.CreateNetwork=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClientRequestToken",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Framework",params,undefined,false); 
			copyArg(n,"FrameworkVersion",params,undefined,false); 
			copyArg(n,"VotingPolicy",params,undefined,true); 
			copyArg(n,"MemberConfiguration",params,undefined,true); 
			
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Framework",params,undefined,false); 
			copyArg(msg,"FrameworkVersion",params,undefined,false); 
			copyArg(msg,"FrameworkConfiguration",params,undefined,false); 
			copyArg(msg,"VotingPolicy",params,undefined,true); 
			copyArg(msg,"MemberConfiguration",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createNetwork(params,cb);
		}

		
		service.CreateNode=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClientRequestToken",params,undefined,false); 
			copyArg(n,"NetworkId",params,undefined,false); 
			copyArg(n,"NodeConfiguration",params,undefined,false); 
			
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"NetworkId",params,undefined,false); 
			copyArg(msg,"MemberId",params,undefined,false); 
			copyArg(msg,"NodeConfiguration",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createNode(params,cb);
		}

		
		service.CreateProposal=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClientRequestToken",params,undefined,false); 
			copyArg(n,"NetworkId",params,undefined,false); 
			copyArg(n,"MemberId",params,undefined,false); 
			copyArg(n,"Actions",params,undefined,true); 
			
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"NetworkId",params,undefined,false); 
			copyArg(msg,"MemberId",params,undefined,false); 
			copyArg(msg,"Actions",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createProposal(params,cb);
		}

		
		service.DeleteMember=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkId",params,undefined,false); 
			copyArg(n,"MemberId",params,undefined,false); 
			
			copyArg(msg,"NetworkId",params,undefined,false); 
			copyArg(msg,"MemberId",params,undefined,false); 
			

			svc.deleteMember(params,cb);
		}

		
		service.DeleteNode=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkId",params,undefined,false); 
			copyArg(n,"NodeId",params,undefined,false); 
			
			copyArg(msg,"NetworkId",params,undefined,false); 
			copyArg(msg,"MemberId",params,undefined,false); 
			copyArg(msg,"NodeId",params,undefined,false); 
			

			svc.deleteNode(params,cb);
		}

		
		service.GetMember=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkId",params,undefined,false); 
			copyArg(n,"MemberId",params,undefined,false); 
			
			copyArg(msg,"NetworkId",params,undefined,false); 
			copyArg(msg,"MemberId",params,undefined,false); 
			

			svc.getMember(params,cb);
		}

		
		service.GetNetwork=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkId",params,undefined,false); 
			
			copyArg(msg,"NetworkId",params,undefined,false); 
			

			svc.getNetwork(params,cb);
		}

		
		service.GetNode=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkId",params,undefined,false); 
			copyArg(n,"NodeId",params,undefined,false); 
			
			copyArg(msg,"NetworkId",params,undefined,false); 
			copyArg(msg,"MemberId",params,undefined,false); 
			copyArg(msg,"NodeId",params,undefined,false); 
			

			svc.getNode(params,cb);
		}

		
		service.GetProposal=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkId",params,undefined,false); 
			copyArg(n,"ProposalId",params,undefined,false); 
			
			copyArg(msg,"NetworkId",params,undefined,false); 
			copyArg(msg,"ProposalId",params,undefined,false); 
			

			svc.getProposal(params,cb);
		}

		
		service.ListInvitations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listInvitations(params,cb);
		}

		
		service.ListMembers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkId",params,undefined,false); 
			
			copyArg(msg,"NetworkId",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			copyArg(msg,"IsOwned",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listMembers(params,cb);
		}

		
		service.ListNetworks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Framework",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listNetworks(params,cb);
		}

		
		service.ListNodes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkId",params,undefined,false); 
			
			copyArg(msg,"NetworkId",params,undefined,false); 
			copyArg(msg,"MemberId",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listNodes(params,cb);
		}

		
		service.ListProposalVotes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkId",params,undefined,false); 
			copyArg(n,"ProposalId",params,undefined,false); 
			
			copyArg(msg,"NetworkId",params,undefined,false); 
			copyArg(msg,"ProposalId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listProposalVotes(params,cb);
		}

		
		service.ListProposals=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkId",params,undefined,false); 
			
			copyArg(msg,"NetworkId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listProposals(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.RejectInvitation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InvitationId",params,undefined,false); 
			
			copyArg(msg,"InvitationId",params,undefined,false); 
			

			svc.rejectInvitation(params,cb);
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

		
		service.UpdateMember=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkId",params,undefined,false); 
			copyArg(n,"MemberId",params,undefined,false); 
			
			copyArg(msg,"NetworkId",params,undefined,false); 
			copyArg(msg,"MemberId",params,undefined,false); 
			copyArg(msg,"LogPublishingConfiguration",params,undefined,true); 
			

			svc.updateMember(params,cb);
		}

		
		service.UpdateNode=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkId",params,undefined,false); 
			copyArg(n,"NodeId",params,undefined,false); 
			
			copyArg(msg,"NetworkId",params,undefined,false); 
			copyArg(msg,"MemberId",params,undefined,false); 
			copyArg(msg,"NodeId",params,undefined,false); 
			copyArg(msg,"LogPublishingConfiguration",params,undefined,true); 
			

			svc.updateNode(params,cb);
		}

		
		service.VoteOnProposal=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkId",params,undefined,false); 
			copyArg(n,"ProposalId",params,undefined,false); 
			copyArg(n,"VoterMemberId",params,undefined,false); 
			copyArg(n,"Vote",params,undefined,false); 
			
			copyArg(msg,"NetworkId",params,undefined,false); 
			copyArg(msg,"ProposalId",params,undefined,false); 
			copyArg(msg,"VoterMemberId",params,undefined,false); 
			copyArg(msg,"Vote",params,undefined,false); 
			

			svc.voteOnProposal(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS ManagedBlockchain", AmazonAPINode);

};
