
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

		var awsService = new AWS.MTurk( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.MTurk(msg.AWSConfig) : awsService;

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

		
		service.AcceptQualificationRequest=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QualificationRequestId",params,undefined,false); 
			
			copyArg(msg,"QualificationRequestId",params,undefined,false); 
			copyArg(msg,"IntegerValue",params,undefined,false); 
			

			svc.acceptQualificationRequest(params,cb);
		}

		
		service.ApproveAssignment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AssignmentId",params,undefined,false); 
			
			copyArg(msg,"AssignmentId",params,undefined,false); 
			copyArg(msg,"RequesterFeedback",params,undefined,false); 
			copyArg(msg,"OverrideRejection",params,undefined,false); 
			

			svc.approveAssignment(params,cb);
		}

		
		service.AssociateQualificationWithWorker=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QualificationTypeId",params,undefined,false); 
			copyArg(n,"WorkerId",params,undefined,false); 
			
			copyArg(msg,"QualificationTypeId",params,undefined,false); 
			copyArg(msg,"WorkerId",params,undefined,false); 
			copyArg(msg,"IntegerValue",params,undefined,false); 
			copyArg(msg,"SendNotification",params,undefined,false); 
			

			svc.associateQualificationWithWorker(params,cb);
		}

		
		service.CreateAdditionalAssignmentsForHIT=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HITId",params,undefined,false); 
			copyArg(n,"NumberOfAdditionalAssignments",params,undefined,false); 
			
			copyArg(msg,"HITId",params,undefined,false); 
			copyArg(msg,"NumberOfAdditionalAssignments",params,undefined,false); 
			copyArg(msg,"UniqueRequestToken",params,undefined,false); 
			

			svc.createAdditionalAssignmentsForHIT(params,cb);
		}

		
		service.CreateHIT=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LifetimeInSeconds",params,undefined,false); 
			copyArg(n,"AssignmentDurationInSeconds",params,undefined,false); 
			copyArg(n,"Reward",params,undefined,false); 
			copyArg(n,"Title",params,undefined,false); 
			copyArg(n,"Description",params,undefined,false); 
			
			copyArg(msg,"MaxAssignments",params,undefined,false); 
			copyArg(msg,"AutoApprovalDelayInSeconds",params,undefined,false); 
			copyArg(msg,"LifetimeInSeconds",params,undefined,false); 
			copyArg(msg,"AssignmentDurationInSeconds",params,undefined,false); 
			copyArg(msg,"Reward",params,undefined,false); 
			copyArg(msg,"Title",params,undefined,false); 
			copyArg(msg,"Keywords",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Question",params,undefined,false); 
			copyArg(msg,"RequesterAnnotation",params,undefined,false); 
			copyArg(msg,"QualificationRequirements",params,undefined,true); 
			copyArg(msg,"UniqueRequestToken",params,undefined,false); 
			copyArg(msg,"AssignmentReviewPolicy",params,undefined,true); 
			copyArg(msg,"HITReviewPolicy",params,undefined,true); 
			copyArg(msg,"HITLayoutId",params,undefined,false); 
			copyArg(msg,"HITLayoutParameters",params,undefined,true); 
			

			svc.createHIT(params,cb);
		}

		
		service.CreateHITType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AssignmentDurationInSeconds",params,undefined,false); 
			copyArg(n,"Reward",params,undefined,false); 
			copyArg(n,"Title",params,undefined,false); 
			copyArg(n,"Description",params,undefined,false); 
			
			copyArg(msg,"AutoApprovalDelayInSeconds",params,undefined,false); 
			copyArg(msg,"AssignmentDurationInSeconds",params,undefined,false); 
			copyArg(msg,"Reward",params,undefined,false); 
			copyArg(msg,"Title",params,undefined,false); 
			copyArg(msg,"Keywords",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"QualificationRequirements",params,undefined,true); 
			

			svc.createHITType(params,cb);
		}

		
		service.CreateHITWithHITType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HITTypeId",params,undefined,false); 
			copyArg(n,"LifetimeInSeconds",params,undefined,false); 
			
			copyArg(msg,"HITTypeId",params,undefined,false); 
			copyArg(msg,"MaxAssignments",params,undefined,false); 
			copyArg(msg,"LifetimeInSeconds",params,undefined,false); 
			copyArg(msg,"Question",params,undefined,false); 
			copyArg(msg,"RequesterAnnotation",params,undefined,false); 
			copyArg(msg,"UniqueRequestToken",params,undefined,false); 
			copyArg(msg,"AssignmentReviewPolicy",params,undefined,true); 
			copyArg(msg,"HITReviewPolicy",params,undefined,true); 
			copyArg(msg,"HITLayoutId",params,undefined,false); 
			copyArg(msg,"HITLayoutParameters",params,undefined,true); 
			

			svc.createHITWithHITType(params,cb);
		}

		
		service.CreateQualificationType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Description",params,undefined,false); 
			copyArg(n,"QualificationTypeStatus",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Keywords",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"QualificationTypeStatus",params,undefined,false); 
			copyArg(msg,"RetryDelayInSeconds",params,undefined,false); 
			copyArg(msg,"Test",params,undefined,false); 
			copyArg(msg,"AnswerKey",params,undefined,false); 
			copyArg(msg,"TestDurationInSeconds",params,undefined,false); 
			copyArg(msg,"AutoGranted",params,undefined,false); 
			copyArg(msg,"AutoGrantedValue",params,undefined,false); 
			

			svc.createQualificationType(params,cb);
		}

		
		service.CreateWorkerBlock=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkerId",params,undefined,false); 
			copyArg(n,"Reason",params,undefined,false); 
			
			copyArg(msg,"WorkerId",params,undefined,false); 
			copyArg(msg,"Reason",params,undefined,false); 
			

			svc.createWorkerBlock(params,cb);
		}

		
		service.DeleteHIT=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HITId",params,undefined,false); 
			
			copyArg(msg,"HITId",params,undefined,false); 
			

			svc.deleteHIT(params,cb);
		}

		
		service.DeleteQualificationType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QualificationTypeId",params,undefined,false); 
			
			copyArg(msg,"QualificationTypeId",params,undefined,false); 
			

			svc.deleteQualificationType(params,cb);
		}

		
		service.DeleteWorkerBlock=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkerId",params,undefined,false); 
			
			copyArg(msg,"WorkerId",params,undefined,false); 
			copyArg(msg,"Reason",params,undefined,false); 
			

			svc.deleteWorkerBlock(params,cb);
		}

		
		service.DisassociateQualificationFromWorker=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkerId",params,undefined,false); 
			copyArg(n,"QualificationTypeId",params,undefined,false); 
			
			copyArg(msg,"WorkerId",params,undefined,false); 
			copyArg(msg,"QualificationTypeId",params,undefined,false); 
			copyArg(msg,"Reason",params,undefined,false); 
			

			svc.disassociateQualificationFromWorker(params,cb);
		}

		
		service.GetAccountBalance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getAccountBalance(params,cb);
		}

		
		service.GetAssignment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AssignmentId",params,undefined,false); 
			
			copyArg(msg,"AssignmentId",params,undefined,false); 
			

			svc.getAssignment(params,cb);
		}

		
		service.GetFileUploadURL=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AssignmentId",params,undefined,false); 
			copyArg(n,"QuestionIdentifier",params,undefined,false); 
			
			copyArg(msg,"AssignmentId",params,undefined,false); 
			copyArg(msg,"QuestionIdentifier",params,undefined,false); 
			

			svc.getFileUploadURL(params,cb);
		}

		
		service.GetHIT=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HITId",params,undefined,false); 
			
			copyArg(msg,"HITId",params,undefined,false); 
			

			svc.getHIT(params,cb);
		}

		
		service.GetQualificationScore=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QualificationTypeId",params,undefined,false); 
			copyArg(n,"WorkerId",params,undefined,false); 
			
			copyArg(msg,"QualificationTypeId",params,undefined,false); 
			copyArg(msg,"WorkerId",params,undefined,false); 
			

			svc.getQualificationScore(params,cb);
		}

		
		service.GetQualificationType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QualificationTypeId",params,undefined,false); 
			
			copyArg(msg,"QualificationTypeId",params,undefined,false); 
			

			svc.getQualificationType(params,cb);
		}

		
		service.ListAssignmentsForHIT=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HITId",params,undefined,false); 
			
			copyArg(msg,"HITId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"AssignmentStatuses",params,undefined,false); 
			

			svc.listAssignmentsForHIT(params,cb);
		}

		
		service.ListBonusPayments=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"HITId",params,undefined,false); 
			copyArg(msg,"AssignmentId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listBonusPayments(params,cb);
		}

		
		service.ListHITs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listHITs(params,cb);
		}

		
		service.ListHITsForQualificationType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QualificationTypeId",params,undefined,false); 
			
			copyArg(msg,"QualificationTypeId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listHITsForQualificationType(params,cb);
		}

		
		service.ListQualificationRequests=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"QualificationTypeId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listQualificationRequests(params,cb);
		}

		
		service.ListQualificationTypes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MustBeRequestable",params,undefined,false); 
			
			copyArg(msg,"Query",params,undefined,false); 
			copyArg(msg,"MustBeRequestable",params,undefined,false); 
			copyArg(msg,"MustBeOwnedByCaller",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listQualificationTypes(params,cb);
		}

		
		service.ListReviewPolicyResultsForHIT=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HITId",params,undefined,false); 
			
			copyArg(msg,"HITId",params,undefined,false); 
			copyArg(msg,"PolicyLevels",params,undefined,false); 
			copyArg(msg,"RetrieveActions",params,undefined,false); 
			copyArg(msg,"RetrieveResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listReviewPolicyResultsForHIT(params,cb);
		}

		
		service.ListReviewableHITs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"HITTypeId",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listReviewableHITs(params,cb);
		}

		
		service.ListWorkerBlocks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listWorkerBlocks(params,cb);
		}

		
		service.ListWorkersWithQualificationType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QualificationTypeId",params,undefined,false); 
			
			copyArg(msg,"QualificationTypeId",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listWorkersWithQualificationType(params,cb);
		}

		
		service.NotifyWorkers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Subject",params,undefined,false); 
			copyArg(n,"MessageText",params,undefined,false); 
			copyArg(n,"WorkerIds",params,undefined,false); 
			
			copyArg(msg,"Subject",params,undefined,false); 
			copyArg(msg,"MessageText",params,undefined,false); 
			copyArg(msg,"WorkerIds",params,undefined,false); 
			

			svc.notifyWorkers(params,cb);
		}

		
		service.RejectAssignment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AssignmentId",params,undefined,false); 
			copyArg(n,"RequesterFeedback",params,undefined,false); 
			
			copyArg(msg,"AssignmentId",params,undefined,false); 
			copyArg(msg,"RequesterFeedback",params,undefined,false); 
			

			svc.rejectAssignment(params,cb);
		}

		
		service.RejectQualificationRequest=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QualificationRequestId",params,undefined,false); 
			
			copyArg(msg,"QualificationRequestId",params,undefined,false); 
			copyArg(msg,"Reason",params,undefined,false); 
			

			svc.rejectQualificationRequest(params,cb);
		}

		
		service.SendBonus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"WorkerId",params,undefined,false); 
			copyArg(n,"BonusAmount",params,undefined,false); 
			copyArg(n,"AssignmentId",params,undefined,false); 
			copyArg(n,"Reason",params,undefined,false); 
			
			copyArg(msg,"WorkerId",params,undefined,false); 
			copyArg(msg,"BonusAmount",params,undefined,false); 
			copyArg(msg,"AssignmentId",params,undefined,false); 
			copyArg(msg,"Reason",params,undefined,false); 
			copyArg(msg,"UniqueRequestToken",params,undefined,false); 
			

			svc.sendBonus(params,cb);
		}

		
		service.SendTestEventNotification=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Notification",params,undefined,true); 
			copyArg(n,"TestEventType",params,undefined,false); 
			
			copyArg(msg,"Notification",params,undefined,true); 
			copyArg(msg,"TestEventType",params,undefined,false); 
			

			svc.sendTestEventNotification(params,cb);
		}

		
		service.UpdateExpirationForHIT=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HITId",params,undefined,false); 
			copyArg(n,"ExpireAt",params,undefined,false); 
			
			copyArg(msg,"HITId",params,undefined,false); 
			copyArg(msg,"ExpireAt",params,undefined,false); 
			

			svc.updateExpirationForHIT(params,cb);
		}

		
		service.UpdateHITReviewStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HITId",params,undefined,false); 
			
			copyArg(msg,"HITId",params,undefined,false); 
			copyArg(msg,"Revert",params,undefined,false); 
			

			svc.updateHITReviewStatus(params,cb);
		}

		
		service.UpdateHITTypeOfHIT=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HITId",params,undefined,false); 
			copyArg(n,"HITTypeId",params,undefined,false); 
			
			copyArg(msg,"HITId",params,undefined,false); 
			copyArg(msg,"HITTypeId",params,undefined,false); 
			

			svc.updateHITTypeOfHIT(params,cb);
		}

		
		service.UpdateNotificationSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HITTypeId",params,undefined,false); 
			
			copyArg(msg,"HITTypeId",params,undefined,false); 
			copyArg(msg,"Notification",params,undefined,true); 
			copyArg(msg,"Active",params,undefined,false); 
			

			svc.updateNotificationSettings(params,cb);
		}

		
		service.UpdateQualificationType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QualificationTypeId",params,undefined,false); 
			
			copyArg(msg,"QualificationTypeId",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"QualificationTypeStatus",params,undefined,false); 
			copyArg(msg,"Test",params,undefined,false); 
			copyArg(msg,"AnswerKey",params,undefined,false); 
			copyArg(msg,"TestDurationInSeconds",params,undefined,false); 
			copyArg(msg,"RetryDelayInSeconds",params,undefined,false); 
			copyArg(msg,"AutoGranted",params,undefined,false); 
			copyArg(msg,"AutoGrantedValue",params,undefined,false); 
			

			svc.updateQualificationType(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS MTurk", AmazonAPINode);

};
