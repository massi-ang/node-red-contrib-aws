
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

		var awsService = new AWS.WellArchitected( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.WellArchitected(msg.AWSConfig) : awsService;

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
		
		service.AssociateLenses=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"LensAliases",params,undefined,true); 
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"LensAliases",params,undefined,true); 
			
			copyArgs(msg,"WorkloadId",params,undefined,false); 
			copyArgs(msg,"LensAliases",params,undefined,true); 
			

			svc.associateLenses(params,cb);
		}
		
		service.CreateMilestone=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"MilestoneName",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"MilestoneName",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"WorkloadId",params,undefined,false); 
			copyArgs(msg,"MilestoneName",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.createMilestone(params,cb);
		}
		
		service.CreateWorkload=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkloadName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Environment",params,undefined,false); 
			copyArgs(n,"ReviewOwner",params,undefined,false); 
			copyArgs(n,"Lenses",params,undefined,true); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(n,"WorkloadName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Environment",params,undefined,false); 
			copyArgs(n,"AccountIds",params,undefined,true); 
			copyArgs(n,"AwsRegions",params,undefined,true); 
			copyArgs(n,"NonAwsRegions",params,undefined,true); 
			copyArgs(n,"PillarPriorities",params,undefined,true); 
			copyArgs(n,"ArchitecturalDesign",params,undefined,false); 
			copyArgs(n,"ReviewOwner",params,undefined,false); 
			copyArgs(n,"IndustryType",params,undefined,false); 
			copyArgs(n,"Industry",params,undefined,false); 
			copyArgs(n,"Lenses",params,undefined,true); 
			copyArgs(n,"Notes",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"WorkloadName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Environment",params,undefined,false); 
			copyArgs(msg,"AccountIds",params,undefined,true); 
			copyArgs(msg,"AwsRegions",params,undefined,true); 
			copyArgs(msg,"NonAwsRegions",params,undefined,true); 
			copyArgs(msg,"PillarPriorities",params,undefined,true); 
			copyArgs(msg,"ArchitecturalDesign",params,undefined,false); 
			copyArgs(msg,"ReviewOwner",params,undefined,false); 
			copyArgs(msg,"IndustryType",params,undefined,false); 
			copyArgs(msg,"Industry",params,undefined,false); 
			copyArgs(msg,"Lenses",params,undefined,true); 
			copyArgs(msg,"Notes",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createWorkload(params,cb);
		}
		
		service.CreateWorkloadShare=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"SharedWith",params,undefined,false); 
			copyArgs(n,"PermissionType",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"SharedWith",params,undefined,false); 
			copyArgs(n,"PermissionType",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"WorkloadId",params,undefined,false); 
			copyArgs(msg,"SharedWith",params,undefined,false); 
			copyArgs(msg,"PermissionType",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.createWorkloadShare(params,cb);
		}
		
		service.DeleteWorkload=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"WorkloadId",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.deleteWorkload(params,cb);
		}
		
		service.DeleteWorkloadShare=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ShareId",params,undefined,false); 
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(n,"ShareId",params,undefined,false); 
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"ShareId",params,undefined,false); 
			copyArgs(msg,"WorkloadId",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.deleteWorkloadShare(params,cb);
		}
		
		service.DisassociateLenses=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"LensAliases",params,undefined,true); 
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"LensAliases",params,undefined,true); 
			
			copyArgs(msg,"WorkloadId",params,undefined,false); 
			copyArgs(msg,"LensAliases",params,undefined,true); 
			

			svc.disassociateLenses(params,cb);
		}
		
		service.GetAnswer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"LensAlias",params,undefined,false); 
			copyArgs(n,"QuestionId",params,undefined,false); 
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"LensAlias",params,undefined,false); 
			copyArgs(n,"QuestionId",params,undefined,false); 
			copyArgs(Number(n),"MilestoneNumber",params,undefined,false); 
			
			copyArgs(msg,"WorkloadId",params,undefined,false); 
			copyArgs(msg,"LensAlias",params,undefined,false); 
			copyArgs(msg,"QuestionId",params,undefined,false); 
			copyArgs(msg,"MilestoneNumber",params,undefined,false); 
			

			svc.getAnswer(params,cb);
		}
		
		service.GetLensReview=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"LensAlias",params,undefined,false); 
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"LensAlias",params,undefined,false); 
			copyArgs(Number(n),"MilestoneNumber",params,undefined,false); 
			
			copyArgs(msg,"WorkloadId",params,undefined,false); 
			copyArgs(msg,"LensAlias",params,undefined,false); 
			copyArgs(msg,"MilestoneNumber",params,undefined,false); 
			

			svc.getLensReview(params,cb);
		}
		
		service.GetLensReviewReport=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"LensAlias",params,undefined,false); 
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"LensAlias",params,undefined,false); 
			copyArgs(Number(n),"MilestoneNumber",params,undefined,false); 
			
			copyArgs(msg,"WorkloadId",params,undefined,false); 
			copyArgs(msg,"LensAlias",params,undefined,false); 
			copyArgs(msg,"MilestoneNumber",params,undefined,false); 
			

			svc.getLensReviewReport(params,cb);
		}
		
		service.GetLensVersionDifference=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LensAlias",params,undefined,false); 
			copyArgs(n,"BaseLensVersion",params,undefined,false); 
			
			copyArgs(n,"LensAlias",params,undefined,false); 
			copyArgs(n,"BaseLensVersion",params,undefined,false); 
			
			copyArgs(msg,"LensAlias",params,undefined,false); 
			copyArgs(msg,"BaseLensVersion",params,undefined,false); 
			

			svc.getLensVersionDifference(params,cb);
		}
		
		service.GetMilestone=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(Number(n),"MilestoneNumber",params,undefined,false); 
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(Number(n),"MilestoneNumber",params,undefined,false); 
			
			copyArgs(msg,"WorkloadId",params,undefined,false); 
			copyArgs(msg,"MilestoneNumber",params,undefined,false); 
			

			svc.getMilestone(params,cb);
		}
		
		service.GetWorkload=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			
			copyArgs(msg,"WorkloadId",params,undefined,false); 
			

			svc.getWorkload(params,cb);
		}
		
		service.ListAnswers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"LensAlias",params,undefined,false); 
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"LensAlias",params,undefined,false); 
			copyArgs(n,"PillarId",params,undefined,false); 
			copyArgs(Number(n),"MilestoneNumber",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"WorkloadId",params,undefined,false); 
			copyArgs(msg,"LensAlias",params,undefined,false); 
			copyArgs(msg,"PillarId",params,undefined,false); 
			copyArgs(msg,"MilestoneNumber",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listAnswers(params,cb);
		}
		
		service.ListLensReviewImprovements=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"LensAlias",params,undefined,false); 
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"LensAlias",params,undefined,false); 
			copyArgs(n,"PillarId",params,undefined,false); 
			copyArgs(Number(n),"MilestoneNumber",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"WorkloadId",params,undefined,false); 
			copyArgs(msg,"LensAlias",params,undefined,false); 
			copyArgs(msg,"PillarId",params,undefined,false); 
			copyArgs(msg,"MilestoneNumber",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listLensReviewImprovements(params,cb);
		}
		
		service.ListLensReviews=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(Number(n),"MilestoneNumber",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"WorkloadId",params,undefined,false); 
			copyArgs(msg,"MilestoneNumber",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listLensReviews(params,cb);
		}
		
		service.ListLenses=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listLenses(params,cb);
		}
		
		service.ListMilestones=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"WorkloadId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listMilestones(params,cb);
		}
		
		service.ListNotifications=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"WorkloadId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listNotifications(params,cb);
		}
		
		service.ListShareInvitations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"WorkloadNamePrefix",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"WorkloadNamePrefix",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listShareInvitations(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkloadArn",params,undefined,false); 
			
			copyArgs(n,"WorkloadArn",params,undefined,false); 
			
			copyArgs(msg,"WorkloadArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.ListWorkloadShares=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"SharedWithPrefix",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"WorkloadId",params,undefined,false); 
			copyArgs(msg,"SharedWithPrefix",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listWorkloadShares(params,cb);
		}
		
		service.ListWorkloads=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"WorkloadNamePrefix",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"WorkloadNamePrefix",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listWorkloads(params,cb);
		}
		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkloadArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"WorkloadArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"WorkloadArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}
		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkloadArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"WorkloadArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"WorkloadArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}
		
		service.UpdateAnswer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"LensAlias",params,undefined,false); 
			copyArgs(n,"QuestionId",params,undefined,false); 
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"LensAlias",params,undefined,false); 
			copyArgs(n,"QuestionId",params,undefined,false); 
			copyArgs(n,"SelectedChoices",params,undefined,true); 
			copyArgs(n,"ChoiceUpdates",params,undefined,false); 
			copyArgs(n,"Notes",params,undefined,false); 
			copyArgs(Boolean(n),"IsApplicable",params,undefined,false); 
			copyArgs(n,"Reason",params,undefined,false); 
			
			copyArgs(msg,"WorkloadId",params,undefined,false); 
			copyArgs(msg,"LensAlias",params,undefined,false); 
			copyArgs(msg,"QuestionId",params,undefined,false); 
			copyArgs(msg,"SelectedChoices",params,undefined,true); 
			copyArgs(msg,"ChoiceUpdates",params,undefined,false); 
			copyArgs(msg,"Notes",params,undefined,false); 
			copyArgs(msg,"IsApplicable",params,undefined,false); 
			copyArgs(msg,"Reason",params,undefined,false); 
			

			svc.updateAnswer(params,cb);
		}
		
		service.UpdateLensReview=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"LensAlias",params,undefined,false); 
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"LensAlias",params,undefined,false); 
			copyArgs(n,"LensNotes",params,undefined,false); 
			copyArgs(n,"PillarNotes",params,undefined,false); 
			
			copyArgs(msg,"WorkloadId",params,undefined,false); 
			copyArgs(msg,"LensAlias",params,undefined,false); 
			copyArgs(msg,"LensNotes",params,undefined,false); 
			copyArgs(msg,"PillarNotes",params,undefined,false); 
			

			svc.updateLensReview(params,cb);
		}
		
		service.UpdateShareInvitation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ShareInvitationId",params,undefined,false); 
			copyArgs(n,"ShareInvitationAction",params,undefined,false); 
			
			copyArgs(n,"ShareInvitationId",params,undefined,false); 
			copyArgs(n,"ShareInvitationAction",params,undefined,false); 
			
			copyArgs(msg,"ShareInvitationId",params,undefined,false); 
			copyArgs(msg,"ShareInvitationAction",params,undefined,false); 
			

			svc.updateShareInvitation(params,cb);
		}
		
		service.UpdateWorkload=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"WorkloadName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Environment",params,undefined,false); 
			copyArgs(n,"AccountIds",params,undefined,true); 
			copyArgs(n,"AwsRegions",params,undefined,true); 
			copyArgs(n,"NonAwsRegions",params,undefined,true); 
			copyArgs(n,"PillarPriorities",params,undefined,true); 
			copyArgs(n,"ArchitecturalDesign",params,undefined,false); 
			copyArgs(n,"ReviewOwner",params,undefined,false); 
			copyArgs(Boolean(n),"IsReviewOwnerUpdateAcknowledged",params,undefined,false); 
			copyArgs(n,"IndustryType",params,undefined,false); 
			copyArgs(n,"Industry",params,undefined,false); 
			copyArgs(n,"Notes",params,undefined,false); 
			copyArgs(n,"ImprovementStatus",params,undefined,false); 
			
			copyArgs(msg,"WorkloadId",params,undefined,false); 
			copyArgs(msg,"WorkloadName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Environment",params,undefined,false); 
			copyArgs(msg,"AccountIds",params,undefined,true); 
			copyArgs(msg,"AwsRegions",params,undefined,true); 
			copyArgs(msg,"NonAwsRegions",params,undefined,true); 
			copyArgs(msg,"PillarPriorities",params,undefined,true); 
			copyArgs(msg,"ArchitecturalDesign",params,undefined,false); 
			copyArgs(msg,"ReviewOwner",params,undefined,false); 
			copyArgs(msg,"IsReviewOwnerUpdateAcknowledged",params,undefined,false); 
			copyArgs(msg,"IndustryType",params,undefined,false); 
			copyArgs(msg,"Industry",params,undefined,false); 
			copyArgs(msg,"Notes",params,undefined,false); 
			copyArgs(msg,"ImprovementStatus",params,undefined,false); 
			

			svc.updateWorkload(params,cb);
		}
		
		service.UpdateWorkloadShare=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ShareId",params,undefined,false); 
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"PermissionType",params,undefined,false); 
			
			copyArgs(n,"ShareId",params,undefined,false); 
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"PermissionType",params,undefined,false); 
			
			copyArgs(msg,"ShareId",params,undefined,false); 
			copyArgs(msg,"WorkloadId",params,undefined,false); 
			copyArgs(msg,"PermissionType",params,undefined,false); 
			

			svc.updateWorkloadShare(params,cb);
		}
		
		service.UpgradeLensReview=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"LensAlias",params,undefined,false); 
			copyArgs(n,"MilestoneName",params,undefined,false); 
			
			copyArgs(n,"WorkloadId",params,undefined,false); 
			copyArgs(n,"LensAlias",params,undefined,false); 
			copyArgs(n,"MilestoneName",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"WorkloadId",params,undefined,false); 
			copyArgs(msg,"LensAlias",params,undefined,false); 
			copyArgs(msg,"MilestoneName",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.upgradeLensReview(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS WellArchitected", AmazonAPINode);

};
