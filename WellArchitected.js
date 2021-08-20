
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

		var awsService = new AWS.WellArchitected( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.WellArchitected(msg.AWSConfig) : awsService;

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

		
		service.AssociateLenses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkloadId",params,undefined,false); 
			copyArg(n,"LensAliases",params,undefined,true); 
			
			copyArg(msg,"WorkloadId",params,undefined,false); 
			copyArg(msg,"LensAliases",params,undefined,true); 
			

			svc.associateLenses(params,cb);
		}

		
		service.CreateMilestone=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkloadId",params,undefined,false); 
			copyArg(n,"MilestoneName",params,undefined,false); 
			copyArg(n,"ClientRequestToken",params,undefined,false); 
			
			copyArg(msg,"WorkloadId",params,undefined,false); 
			copyArg(msg,"MilestoneName",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.createMilestone(params,cb);
		}

		
		service.CreateWorkload=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkloadName",params,undefined,false); 
			copyArg(n,"Description",params,undefined,false); 
			copyArg(n,"Environment",params,undefined,false); 
			copyArg(n,"ReviewOwner",params,undefined,false); 
			copyArg(n,"Lenses",params,undefined,true); 
			copyArg(n,"ClientRequestToken",params,undefined,false); 
			
			copyArg(msg,"WorkloadName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Environment",params,undefined,false); 
			copyArg(msg,"AccountIds",params,undefined,true); 
			copyArg(msg,"AwsRegions",params,undefined,true); 
			copyArg(msg,"NonAwsRegions",params,undefined,true); 
			copyArg(msg,"PillarPriorities",params,undefined,true); 
			copyArg(msg,"ArchitecturalDesign",params,undefined,false); 
			copyArg(msg,"ReviewOwner",params,undefined,false); 
			copyArg(msg,"IndustryType",params,undefined,false); 
			copyArg(msg,"Industry",params,undefined,false); 
			copyArg(msg,"Lenses",params,undefined,true); 
			copyArg(msg,"Notes",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createWorkload(params,cb);
		}

		
		service.CreateWorkloadShare=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkloadId",params,undefined,false); 
			copyArg(n,"SharedWith",params,undefined,false); 
			copyArg(n,"PermissionType",params,undefined,false); 
			copyArg(n,"ClientRequestToken",params,undefined,false); 
			
			copyArg(msg,"WorkloadId",params,undefined,false); 
			copyArg(msg,"SharedWith",params,undefined,false); 
			copyArg(msg,"PermissionType",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.createWorkloadShare(params,cb);
		}

		
		service.DeleteWorkload=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkloadId",params,undefined,false); 
			copyArg(n,"ClientRequestToken",params,undefined,false); 
			
			copyArg(msg,"WorkloadId",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.deleteWorkload(params,cb);
		}

		
		service.DeleteWorkloadShare=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ShareId",params,undefined,false); 
			copyArg(n,"WorkloadId",params,undefined,false); 
			copyArg(n,"ClientRequestToken",params,undefined,false); 
			
			copyArg(msg,"ShareId",params,undefined,false); 
			copyArg(msg,"WorkloadId",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.deleteWorkloadShare(params,cb);
		}

		
		service.DisassociateLenses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkloadId",params,undefined,false); 
			copyArg(n,"LensAliases",params,undefined,true); 
			
			copyArg(msg,"WorkloadId",params,undefined,false); 
			copyArg(msg,"LensAliases",params,undefined,true); 
			

			svc.disassociateLenses(params,cb);
		}

		
		service.GetAnswer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkloadId",params,undefined,false); 
			copyArg(n,"LensAlias",params,undefined,false); 
			copyArg(n,"QuestionId",params,undefined,false); 
			
			copyArg(msg,"WorkloadId",params,undefined,false); 
			copyArg(msg,"LensAlias",params,undefined,false); 
			copyArg(msg,"QuestionId",params,undefined,false); 
			copyArg(msg,"MilestoneNumber",params,undefined,false); 
			

			svc.getAnswer(params,cb);
		}

		
		service.GetLensReview=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkloadId",params,undefined,false); 
			copyArg(n,"LensAlias",params,undefined,false); 
			
			copyArg(msg,"WorkloadId",params,undefined,false); 
			copyArg(msg,"LensAlias",params,undefined,false); 
			copyArg(msg,"MilestoneNumber",params,undefined,false); 
			

			svc.getLensReview(params,cb);
		}

		
		service.GetLensReviewReport=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkloadId",params,undefined,false); 
			copyArg(n,"LensAlias",params,undefined,false); 
			
			copyArg(msg,"WorkloadId",params,undefined,false); 
			copyArg(msg,"LensAlias",params,undefined,false); 
			copyArg(msg,"MilestoneNumber",params,undefined,false); 
			

			svc.getLensReviewReport(params,cb);
		}

		
		service.GetLensVersionDifference=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LensAlias",params,undefined,false); 
			copyArg(n,"BaseLensVersion",params,undefined,false); 
			
			copyArg(msg,"LensAlias",params,undefined,false); 
			copyArg(msg,"BaseLensVersion",params,undefined,false); 
			

			svc.getLensVersionDifference(params,cb);
		}

		
		service.GetMilestone=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkloadId",params,undefined,false); 
			copyArg(n,"MilestoneNumber",params,undefined,false); 
			
			copyArg(msg,"WorkloadId",params,undefined,false); 
			copyArg(msg,"MilestoneNumber",params,undefined,false); 
			

			svc.getMilestone(params,cb);
		}

		
		service.GetWorkload=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkloadId",params,undefined,false); 
			
			copyArg(msg,"WorkloadId",params,undefined,false); 
			

			svc.getWorkload(params,cb);
		}

		
		service.ListAnswers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkloadId",params,undefined,false); 
			copyArg(n,"LensAlias",params,undefined,false); 
			
			copyArg(msg,"WorkloadId",params,undefined,false); 
			copyArg(msg,"LensAlias",params,undefined,false); 
			copyArg(msg,"PillarId",params,undefined,false); 
			copyArg(msg,"MilestoneNumber",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listAnswers(params,cb);
		}

		
		service.ListLensReviewImprovements=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkloadId",params,undefined,false); 
			copyArg(n,"LensAlias",params,undefined,false); 
			
			copyArg(msg,"WorkloadId",params,undefined,false); 
			copyArg(msg,"LensAlias",params,undefined,false); 
			copyArg(msg,"PillarId",params,undefined,false); 
			copyArg(msg,"MilestoneNumber",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listLensReviewImprovements(params,cb);
		}

		
		service.ListLensReviews=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkloadId",params,undefined,false); 
			
			copyArg(msg,"WorkloadId",params,undefined,false); 
			copyArg(msg,"MilestoneNumber",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listLensReviews(params,cb);
		}

		
		service.ListLenses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listLenses(params,cb);
		}

		
		service.ListMilestones=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkloadId",params,undefined,false); 
			
			copyArg(msg,"WorkloadId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listMilestones(params,cb);
		}

		
		service.ListNotifications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"WorkloadId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listNotifications(params,cb);
		}

		
		service.ListShareInvitations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"WorkloadNamePrefix",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listShareInvitations(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkloadArn",params,undefined,false); 
			
			copyArg(msg,"WorkloadArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListWorkloadShares=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkloadId",params,undefined,false); 
			
			copyArg(msg,"WorkloadId",params,undefined,false); 
			copyArg(msg,"SharedWithPrefix",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listWorkloadShares(params,cb);
		}

		
		service.ListWorkloads=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"WorkloadNamePrefix",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listWorkloads(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkloadArn",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"WorkloadArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkloadArn",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"WorkloadArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateAnswer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkloadId",params,undefined,false); 
			copyArg(n,"LensAlias",params,undefined,false); 
			copyArg(n,"QuestionId",params,undefined,false); 
			
			copyArg(msg,"WorkloadId",params,undefined,false); 
			copyArg(msg,"LensAlias",params,undefined,false); 
			copyArg(msg,"QuestionId",params,undefined,false); 
			copyArg(msg,"SelectedChoices",params,undefined,true); 
			copyArg(msg,"ChoiceUpdates",params,undefined,false); 
			copyArg(msg,"Notes",params,undefined,false); 
			copyArg(msg,"IsApplicable",params,undefined,false); 
			copyArg(msg,"Reason",params,undefined,false); 
			

			svc.updateAnswer(params,cb);
		}

		
		service.UpdateLensReview=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkloadId",params,undefined,false); 
			copyArg(n,"LensAlias",params,undefined,false); 
			
			copyArg(msg,"WorkloadId",params,undefined,false); 
			copyArg(msg,"LensAlias",params,undefined,false); 
			copyArg(msg,"LensNotes",params,undefined,false); 
			copyArg(msg,"PillarNotes",params,undefined,false); 
			

			svc.updateLensReview(params,cb);
		}

		
		service.UpdateShareInvitation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ShareInvitationId",params,undefined,false); 
			copyArg(n,"ShareInvitationAction",params,undefined,false); 
			
			copyArg(msg,"ShareInvitationId",params,undefined,false); 
			copyArg(msg,"ShareInvitationAction",params,undefined,false); 
			

			svc.updateShareInvitation(params,cb);
		}

		
		service.UpdateWorkload=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkloadId",params,undefined,false); 
			
			copyArg(msg,"WorkloadId",params,undefined,false); 
			copyArg(msg,"WorkloadName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Environment",params,undefined,false); 
			copyArg(msg,"AccountIds",params,undefined,true); 
			copyArg(msg,"AwsRegions",params,undefined,true); 
			copyArg(msg,"NonAwsRegions",params,undefined,true); 
			copyArg(msg,"PillarPriorities",params,undefined,true); 
			copyArg(msg,"ArchitecturalDesign",params,undefined,false); 
			copyArg(msg,"ReviewOwner",params,undefined,false); 
			copyArg(msg,"IsReviewOwnerUpdateAcknowledged",params,undefined,false); 
			copyArg(msg,"IndustryType",params,undefined,false); 
			copyArg(msg,"Industry",params,undefined,false); 
			copyArg(msg,"Notes",params,undefined,false); 
			copyArg(msg,"ImprovementStatus",params,undefined,false); 
			

			svc.updateWorkload(params,cb);
		}

		
		service.UpdateWorkloadShare=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ShareId",params,undefined,false); 
			copyArg(n,"WorkloadId",params,undefined,false); 
			copyArg(n,"PermissionType",params,undefined,false); 
			
			copyArg(msg,"ShareId",params,undefined,false); 
			copyArg(msg,"WorkloadId",params,undefined,false); 
			copyArg(msg,"PermissionType",params,undefined,false); 
			

			svc.updateWorkloadShare(params,cb);
		}

		
		service.UpgradeLensReview=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkloadId",params,undefined,false); 
			copyArg(n,"LensAlias",params,undefined,false); 
			copyArg(n,"MilestoneName",params,undefined,false); 
			
			copyArg(msg,"WorkloadId",params,undefined,false); 
			copyArg(msg,"LensAlias",params,undefined,false); 
			copyArg(msg,"MilestoneName",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.upgradeLensReview(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS WellArchitected", AmazonAPINode);

};
