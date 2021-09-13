
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

		var awsService = new AWS.MTurk( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.MTurk(msg.AWSConfig) : awsService;

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
		
		service.AcceptQualificationRequest=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QualificationRequestId",params,undefined,false); 
			
			copyArgs(n,"QualificationRequestId",params,undefined,false); 
			copyArgs(Number(n),"IntegerValue",params,undefined,false); 
			
			copyArgs(msg,"QualificationRequestId",params,undefined,false); 
			copyArgs(msg,"IntegerValue",params,undefined,false); 
			

			svc.acceptQualificationRequest(params,cb);
		}
		
		service.ApproveAssignment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AssignmentId",params,undefined,false); 
			
			copyArgs(n,"AssignmentId",params,undefined,false); 
			copyArgs(n,"RequesterFeedback",params,undefined,false); 
			copyArgs(Boolean(n),"OverrideRejection",params,undefined,false); 
			
			copyArgs(msg,"AssignmentId",params,undefined,false); 
			copyArgs(msg,"RequesterFeedback",params,undefined,false); 
			copyArgs(msg,"OverrideRejection",params,undefined,false); 
			

			svc.approveAssignment(params,cb);
		}
		
		service.AssociateQualificationWithWorker=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QualificationTypeId",params,undefined,false); 
			copyArgs(n,"WorkerId",params,undefined,false); 
			
			copyArgs(n,"QualificationTypeId",params,undefined,false); 
			copyArgs(n,"WorkerId",params,undefined,false); 
			copyArgs(Number(n),"IntegerValue",params,undefined,false); 
			copyArgs(Boolean(n),"SendNotification",params,undefined,false); 
			
			copyArgs(msg,"QualificationTypeId",params,undefined,false); 
			copyArgs(msg,"WorkerId",params,undefined,false); 
			copyArgs(msg,"IntegerValue",params,undefined,false); 
			copyArgs(msg,"SendNotification",params,undefined,false); 
			

			svc.associateQualificationWithWorker(params,cb);
		}
		
		service.CreateAdditionalAssignmentsForHIT=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HITId",params,undefined,false); 
			copyArgs(Number(n),"NumberOfAdditionalAssignments",params,undefined,false); 
			
			copyArgs(n,"HITId",params,undefined,false); 
			copyArgs(Number(n),"NumberOfAdditionalAssignments",params,undefined,false); 
			copyArgs(n,"UniqueRequestToken",params,undefined,false); 
			
			copyArgs(msg,"HITId",params,undefined,false); 
			copyArgs(msg,"NumberOfAdditionalAssignments",params,undefined,false); 
			copyArgs(msg,"UniqueRequestToken",params,undefined,false); 
			

			svc.createAdditionalAssignmentsForHIT(params,cb);
		}
		
		service.CreateHIT=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"LifetimeInSeconds",params,undefined,false); 
			copyArgs(n,"AssignmentDurationInSeconds",params,undefined,false); 
			copyArgs(n,"Reward",params,undefined,false); 
			copyArgs(n,"Title",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(Number(n),"MaxAssignments",params,undefined,false); 
			copyArgs(n,"AutoApprovalDelayInSeconds",params,undefined,false); 
			copyArgs(n,"LifetimeInSeconds",params,undefined,false); 
			copyArgs(n,"AssignmentDurationInSeconds",params,undefined,false); 
			copyArgs(n,"Reward",params,undefined,false); 
			copyArgs(n,"Title",params,undefined,false); 
			copyArgs(n,"Keywords",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Question",params,undefined,false); 
			copyArgs(n,"RequesterAnnotation",params,undefined,false); 
			copyArgs(n,"QualificationRequirements",params,undefined,true); 
			copyArgs(n,"UniqueRequestToken",params,undefined,false); 
			copyArgs(n,"AssignmentReviewPolicy",params,undefined,true); 
			copyArgs(n,"HITReviewPolicy",params,undefined,true); 
			copyArgs(n,"HITLayoutId",params,undefined,false); 
			copyArgs(n,"HITLayoutParameters",params,undefined,true); 
			
			copyArgs(msg,"MaxAssignments",params,undefined,false); 
			copyArgs(msg,"AutoApprovalDelayInSeconds",params,undefined,false); 
			copyArgs(msg,"LifetimeInSeconds",params,undefined,false); 
			copyArgs(msg,"AssignmentDurationInSeconds",params,undefined,false); 
			copyArgs(msg,"Reward",params,undefined,false); 
			copyArgs(msg,"Title",params,undefined,false); 
			copyArgs(msg,"Keywords",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Question",params,undefined,false); 
			copyArgs(msg,"RequesterAnnotation",params,undefined,false); 
			copyArgs(msg,"QualificationRequirements",params,undefined,true); 
			copyArgs(msg,"UniqueRequestToken",params,undefined,false); 
			copyArgs(msg,"AssignmentReviewPolicy",params,undefined,true); 
			copyArgs(msg,"HITReviewPolicy",params,undefined,true); 
			copyArgs(msg,"HITLayoutId",params,undefined,false); 
			copyArgs(msg,"HITLayoutParameters",params,undefined,true); 
			

			svc.createHIT(params,cb);
		}
		
		service.CreateHITType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AssignmentDurationInSeconds",params,undefined,false); 
			copyArgs(n,"Reward",params,undefined,false); 
			copyArgs(n,"Title",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(n,"AutoApprovalDelayInSeconds",params,undefined,false); 
			copyArgs(n,"AssignmentDurationInSeconds",params,undefined,false); 
			copyArgs(n,"Reward",params,undefined,false); 
			copyArgs(n,"Title",params,undefined,false); 
			copyArgs(n,"Keywords",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"QualificationRequirements",params,undefined,true); 
			
			copyArgs(msg,"AutoApprovalDelayInSeconds",params,undefined,false); 
			copyArgs(msg,"AssignmentDurationInSeconds",params,undefined,false); 
			copyArgs(msg,"Reward",params,undefined,false); 
			copyArgs(msg,"Title",params,undefined,false); 
			copyArgs(msg,"Keywords",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"QualificationRequirements",params,undefined,true); 
			

			svc.createHITType(params,cb);
		}
		
		service.CreateHITWithHITType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HITTypeId",params,undefined,false); 
			copyArgs(n,"LifetimeInSeconds",params,undefined,false); 
			
			copyArgs(n,"HITTypeId",params,undefined,false); 
			copyArgs(Number(n),"MaxAssignments",params,undefined,false); 
			copyArgs(n,"LifetimeInSeconds",params,undefined,false); 
			copyArgs(n,"Question",params,undefined,false); 
			copyArgs(n,"RequesterAnnotation",params,undefined,false); 
			copyArgs(n,"UniqueRequestToken",params,undefined,false); 
			copyArgs(n,"AssignmentReviewPolicy",params,undefined,true); 
			copyArgs(n,"HITReviewPolicy",params,undefined,true); 
			copyArgs(n,"HITLayoutId",params,undefined,false); 
			copyArgs(n,"HITLayoutParameters",params,undefined,true); 
			
			copyArgs(msg,"HITTypeId",params,undefined,false); 
			copyArgs(msg,"MaxAssignments",params,undefined,false); 
			copyArgs(msg,"LifetimeInSeconds",params,undefined,false); 
			copyArgs(msg,"Question",params,undefined,false); 
			copyArgs(msg,"RequesterAnnotation",params,undefined,false); 
			copyArgs(msg,"UniqueRequestToken",params,undefined,false); 
			copyArgs(msg,"AssignmentReviewPolicy",params,undefined,true); 
			copyArgs(msg,"HITReviewPolicy",params,undefined,true); 
			copyArgs(msg,"HITLayoutId",params,undefined,false); 
			copyArgs(msg,"HITLayoutParameters",params,undefined,true); 
			

			svc.createHITWithHITType(params,cb);
		}
		
		service.CreateQualificationType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"QualificationTypeStatus",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Keywords",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"QualificationTypeStatus",params,undefined,false); 
			copyArgs(n,"RetryDelayInSeconds",params,undefined,false); 
			copyArgs(n,"Test",params,undefined,false); 
			copyArgs(n,"AnswerKey",params,undefined,false); 
			copyArgs(n,"TestDurationInSeconds",params,undefined,false); 
			copyArgs(Boolean(n),"AutoGranted",params,undefined,false); 
			copyArgs(Number(n),"AutoGrantedValue",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Keywords",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"QualificationTypeStatus",params,undefined,false); 
			copyArgs(msg,"RetryDelayInSeconds",params,undefined,false); 
			copyArgs(msg,"Test",params,undefined,false); 
			copyArgs(msg,"AnswerKey",params,undefined,false); 
			copyArgs(msg,"TestDurationInSeconds",params,undefined,false); 
			copyArgs(msg,"AutoGranted",params,undefined,false); 
			copyArgs(msg,"AutoGrantedValue",params,undefined,false); 
			

			svc.createQualificationType(params,cb);
		}
		
		service.CreateWorkerBlock=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkerId",params,undefined,false); 
			copyArgs(n,"Reason",params,undefined,false); 
			
			copyArgs(n,"WorkerId",params,undefined,false); 
			copyArgs(n,"Reason",params,undefined,false); 
			
			copyArgs(msg,"WorkerId",params,undefined,false); 
			copyArgs(msg,"Reason",params,undefined,false); 
			

			svc.createWorkerBlock(params,cb);
		}
		
		service.DeleteHIT=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HITId",params,undefined,false); 
			
			copyArgs(n,"HITId",params,undefined,false); 
			
			copyArgs(msg,"HITId",params,undefined,false); 
			

			svc.deleteHIT(params,cb);
		}
		
		service.DeleteQualificationType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QualificationTypeId",params,undefined,false); 
			
			copyArgs(n,"QualificationTypeId",params,undefined,false); 
			
			copyArgs(msg,"QualificationTypeId",params,undefined,false); 
			

			svc.deleteQualificationType(params,cb);
		}
		
		service.DeleteWorkerBlock=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkerId",params,undefined,false); 
			
			copyArgs(n,"WorkerId",params,undefined,false); 
			copyArgs(n,"Reason",params,undefined,false); 
			
			copyArgs(msg,"WorkerId",params,undefined,false); 
			copyArgs(msg,"Reason",params,undefined,false); 
			

			svc.deleteWorkerBlock(params,cb);
		}
		
		service.DisassociateQualificationFromWorker=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkerId",params,undefined,false); 
			copyArgs(n,"QualificationTypeId",params,undefined,false); 
			
			copyArgs(n,"WorkerId",params,undefined,false); 
			copyArgs(n,"QualificationTypeId",params,undefined,false); 
			copyArgs(n,"Reason",params,undefined,false); 
			
			copyArgs(msg,"WorkerId",params,undefined,false); 
			copyArgs(msg,"QualificationTypeId",params,undefined,false); 
			copyArgs(msg,"Reason",params,undefined,false); 
			

			svc.disassociateQualificationFromWorker(params,cb);
		}
		
		service.GetAccountBalance=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getAccountBalance(params,cb);
		}
		
		service.GetAssignment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AssignmentId",params,undefined,false); 
			
			copyArgs(n,"AssignmentId",params,undefined,false); 
			
			copyArgs(msg,"AssignmentId",params,undefined,false); 
			

			svc.getAssignment(params,cb);
		}
		
		service.GetFileUploadURL=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AssignmentId",params,undefined,false); 
			copyArgs(n,"QuestionIdentifier",params,undefined,false); 
			
			copyArgs(n,"AssignmentId",params,undefined,false); 
			copyArgs(n,"QuestionIdentifier",params,undefined,false); 
			
			copyArgs(msg,"AssignmentId",params,undefined,false); 
			copyArgs(msg,"QuestionIdentifier",params,undefined,false); 
			

			svc.getFileUploadURL(params,cb);
		}
		
		service.GetHIT=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HITId",params,undefined,false); 
			
			copyArgs(n,"HITId",params,undefined,false); 
			
			copyArgs(msg,"HITId",params,undefined,false); 
			

			svc.getHIT(params,cb);
		}
		
		service.GetQualificationScore=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QualificationTypeId",params,undefined,false); 
			copyArgs(n,"WorkerId",params,undefined,false); 
			
			copyArgs(n,"QualificationTypeId",params,undefined,false); 
			copyArgs(n,"WorkerId",params,undefined,false); 
			
			copyArgs(msg,"QualificationTypeId",params,undefined,false); 
			copyArgs(msg,"WorkerId",params,undefined,false); 
			

			svc.getQualificationScore(params,cb);
		}
		
		service.GetQualificationType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QualificationTypeId",params,undefined,false); 
			
			copyArgs(n,"QualificationTypeId",params,undefined,false); 
			
			copyArgs(msg,"QualificationTypeId",params,undefined,false); 
			

			svc.getQualificationType(params,cb);
		}
		
		service.ListAssignmentsForHIT=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HITId",params,undefined,false); 
			
			copyArgs(n,"HITId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"AssignmentStatuses",params,undefined,false); 
			
			copyArgs(msg,"HITId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"AssignmentStatuses",params,undefined,false); 
			

			svc.listAssignmentsForHIT(params,cb);
		}
		
		service.ListBonusPayments=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"HITId",params,undefined,false); 
			copyArgs(n,"AssignmentId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"HITId",params,undefined,false); 
			copyArgs(msg,"AssignmentId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listBonusPayments(params,cb);
		}
		
		service.ListHITs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listHITs(params,cb);
		}
		
		service.ListHITsForQualificationType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QualificationTypeId",params,undefined,false); 
			
			copyArgs(n,"QualificationTypeId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"QualificationTypeId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listHITsForQualificationType(params,cb);
		}
		
		service.ListQualificationRequests=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"QualificationTypeId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"QualificationTypeId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listQualificationRequests(params,cb);
		}
		
		service.ListQualificationTypes=function(svc,msg,cb){
			var params={};
			
			copyArgs(Boolean(n),"MustBeRequestable",params,undefined,false); 
			
			copyArgs(n,"Query",params,undefined,false); 
			copyArgs(Boolean(n),"MustBeRequestable",params,undefined,false); 
			copyArgs(Boolean(n),"MustBeOwnedByCaller",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Query",params,undefined,false); 
			copyArgs(msg,"MustBeRequestable",params,undefined,false); 
			copyArgs(msg,"MustBeOwnedByCaller",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listQualificationTypes(params,cb);
		}
		
		service.ListReviewPolicyResultsForHIT=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HITId",params,undefined,false); 
			
			copyArgs(n,"HITId",params,undefined,false); 
			copyArgs(n,"PolicyLevels",params,undefined,false); 
			copyArgs(Boolean(n),"RetrieveActions",params,undefined,false); 
			copyArgs(Boolean(n),"RetrieveResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"HITId",params,undefined,false); 
			copyArgs(msg,"PolicyLevels",params,undefined,false); 
			copyArgs(msg,"RetrieveActions",params,undefined,false); 
			copyArgs(msg,"RetrieveResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listReviewPolicyResultsForHIT(params,cb);
		}
		
		service.ListReviewableHITs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"HITTypeId",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"HITTypeId",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listReviewableHITs(params,cb);
		}
		
		service.ListWorkerBlocks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listWorkerBlocks(params,cb);
		}
		
		service.ListWorkersWithQualificationType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QualificationTypeId",params,undefined,false); 
			
			copyArgs(n,"QualificationTypeId",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"QualificationTypeId",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listWorkersWithQualificationType(params,cb);
		}
		
		service.NotifyWorkers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Subject",params,undefined,false); 
			copyArgs(n,"MessageText",params,undefined,false); 
			copyArgs(n,"WorkerIds",params,undefined,false); 
			
			copyArgs(n,"Subject",params,undefined,false); 
			copyArgs(n,"MessageText",params,undefined,false); 
			copyArgs(n,"WorkerIds",params,undefined,false); 
			
			copyArgs(msg,"Subject",params,undefined,false); 
			copyArgs(msg,"MessageText",params,undefined,false); 
			copyArgs(msg,"WorkerIds",params,undefined,false); 
			

			svc.notifyWorkers(params,cb);
		}
		
		service.RejectAssignment=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AssignmentId",params,undefined,false); 
			copyArgs(n,"RequesterFeedback",params,undefined,false); 
			
			copyArgs(n,"AssignmentId",params,undefined,false); 
			copyArgs(n,"RequesterFeedback",params,undefined,false); 
			
			copyArgs(msg,"AssignmentId",params,undefined,false); 
			copyArgs(msg,"RequesterFeedback",params,undefined,false); 
			

			svc.rejectAssignment(params,cb);
		}
		
		service.RejectQualificationRequest=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QualificationRequestId",params,undefined,false); 
			
			copyArgs(n,"QualificationRequestId",params,undefined,false); 
			copyArgs(n,"Reason",params,undefined,false); 
			
			copyArgs(msg,"QualificationRequestId",params,undefined,false); 
			copyArgs(msg,"Reason",params,undefined,false); 
			

			svc.rejectQualificationRequest(params,cb);
		}
		
		service.SendBonus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"WorkerId",params,undefined,false); 
			copyArgs(n,"BonusAmount",params,undefined,false); 
			copyArgs(n,"AssignmentId",params,undefined,false); 
			copyArgs(n,"Reason",params,undefined,false); 
			
			copyArgs(n,"WorkerId",params,undefined,false); 
			copyArgs(n,"BonusAmount",params,undefined,false); 
			copyArgs(n,"AssignmentId",params,undefined,false); 
			copyArgs(n,"Reason",params,undefined,false); 
			copyArgs(n,"UniqueRequestToken",params,undefined,false); 
			
			copyArgs(msg,"WorkerId",params,undefined,false); 
			copyArgs(msg,"BonusAmount",params,undefined,false); 
			copyArgs(msg,"AssignmentId",params,undefined,false); 
			copyArgs(msg,"Reason",params,undefined,false); 
			copyArgs(msg,"UniqueRequestToken",params,undefined,false); 
			

			svc.sendBonus(params,cb);
		}
		
		service.SendTestEventNotification=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Notification",params,undefined,true); 
			copyArgs(n,"TestEventType",params,undefined,false); 
			
			copyArgs(n,"Notification",params,undefined,true); 
			copyArgs(n,"TestEventType",params,undefined,false); 
			
			copyArgs(msg,"Notification",params,undefined,true); 
			copyArgs(msg,"TestEventType",params,undefined,false); 
			

			svc.sendTestEventNotification(params,cb);
		}
		
		service.UpdateExpirationForHIT=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HITId",params,undefined,false); 
			copyArgs(n,"ExpireAt",params,undefined,false); 
			
			copyArgs(n,"HITId",params,undefined,false); 
			copyArgs(n,"ExpireAt",params,undefined,false); 
			
			copyArgs(msg,"HITId",params,undefined,false); 
			copyArgs(msg,"ExpireAt",params,undefined,false); 
			

			svc.updateExpirationForHIT(params,cb);
		}
		
		service.UpdateHITReviewStatus=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HITId",params,undefined,false); 
			
			copyArgs(n,"HITId",params,undefined,false); 
			copyArgs(Boolean(n),"Revert",params,undefined,false); 
			
			copyArgs(msg,"HITId",params,undefined,false); 
			copyArgs(msg,"Revert",params,undefined,false); 
			

			svc.updateHITReviewStatus(params,cb);
		}
		
		service.UpdateHITTypeOfHIT=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HITId",params,undefined,false); 
			copyArgs(n,"HITTypeId",params,undefined,false); 
			
			copyArgs(n,"HITId",params,undefined,false); 
			copyArgs(n,"HITTypeId",params,undefined,false); 
			
			copyArgs(msg,"HITId",params,undefined,false); 
			copyArgs(msg,"HITTypeId",params,undefined,false); 
			

			svc.updateHITTypeOfHIT(params,cb);
		}
		
		service.UpdateNotificationSettings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"HITTypeId",params,undefined,false); 
			
			copyArgs(n,"HITTypeId",params,undefined,false); 
			copyArgs(n,"Notification",params,undefined,true); 
			copyArgs(Boolean(n),"Active",params,undefined,false); 
			
			copyArgs(msg,"HITTypeId",params,undefined,false); 
			copyArgs(msg,"Notification",params,undefined,true); 
			copyArgs(msg,"Active",params,undefined,false); 
			

			svc.updateNotificationSettings(params,cb);
		}
		
		service.UpdateQualificationType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QualificationTypeId",params,undefined,false); 
			
			copyArgs(n,"QualificationTypeId",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"QualificationTypeStatus",params,undefined,false); 
			copyArgs(n,"Test",params,undefined,false); 
			copyArgs(n,"AnswerKey",params,undefined,false); 
			copyArgs(n,"TestDurationInSeconds",params,undefined,false); 
			copyArgs(n,"RetryDelayInSeconds",params,undefined,false); 
			copyArgs(Boolean(n),"AutoGranted",params,undefined,false); 
			copyArgs(Number(n),"AutoGrantedValue",params,undefined,false); 
			
			copyArgs(msg,"QualificationTypeId",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"QualificationTypeStatus",params,undefined,false); 
			copyArgs(msg,"Test",params,undefined,false); 
			copyArgs(msg,"AnswerKey",params,undefined,false); 
			copyArgs(msg,"TestDurationInSeconds",params,undefined,false); 
			copyArgs(msg,"RetryDelayInSeconds",params,undefined,false); 
			copyArgs(msg,"AutoGranted",params,undefined,false); 
			copyArgs(msg,"AutoGrantedValue",params,undefined,false); 
			

			svc.updateQualificationType(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS MTurk", AmazonAPINode);

};
