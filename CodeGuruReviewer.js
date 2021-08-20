
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

		var awsService = new AWS.CodeGuruReviewer( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.CodeGuruReviewer(msg.AWSConfig) : awsService;

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

		
		service.AssociateRepository=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Repository",params,undefined,false); 
			
			copyArg(msg,"Repository",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"KMSKeyDetails",params,undefined,true); 
			

			svc.associateRepository(params,cb);
		}

		
		service.CreateCodeReview=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"RepositoryAssociationArn",params,undefined,false); 
			copyArg(n,"Type",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"RepositoryAssociationArn",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.createCodeReview(params,cb);
		}

		
		service.DescribeCodeReview=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CodeReviewArn",params,undefined,false); 
			
			copyArg(msg,"CodeReviewArn",params,undefined,false); 
			

			svc.describeCodeReview(params,cb);
		}

		
		service.DescribeRecommendationFeedback=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CodeReviewArn",params,undefined,false); 
			copyArg(n,"RecommendationId",params,undefined,false); 
			
			copyArg(msg,"CodeReviewArn",params,undefined,false); 
			copyArg(msg,"RecommendationId",params,undefined,false); 
			copyArg(msg,"UserId",params,undefined,false); 
			

			svc.describeRecommendationFeedback(params,cb);
		}

		
		service.DescribeRepositoryAssociation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AssociationArn",params,undefined,false); 
			
			copyArg(msg,"AssociationArn",params,undefined,false); 
			

			svc.describeRepositoryAssociation(params,cb);
		}

		
		service.DisassociateRepository=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AssociationArn",params,undefined,false); 
			
			copyArg(msg,"AssociationArn",params,undefined,false); 
			

			svc.disassociateRepository(params,cb);
		}

		
		service.ListCodeReviews=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Type",params,undefined,false); 
			
			copyArg(msg,"ProviderTypes",params,undefined,true); 
			copyArg(msg,"States",params,undefined,false); 
			copyArg(msg,"RepositoryNames",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listCodeReviews(params,cb);
		}

		
		service.ListRecommendationFeedback=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CodeReviewArn",params,undefined,false); 
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"CodeReviewArn",params,undefined,false); 
			copyArg(msg,"UserIds",params,undefined,false); 
			copyArg(msg,"RecommendationIds",params,undefined,false); 
			

			svc.listRecommendationFeedback(params,cb);
		}

		
		service.ListRecommendations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CodeReviewArn",params,undefined,false); 
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"CodeReviewArn",params,undefined,false); 
			

			svc.listRecommendations(params,cb);
		}

		
		service.ListRepositoryAssociations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ProviderTypes",params,undefined,true); 
			copyArg(msg,"States",params,undefined,false); 
			copyArg(msg,"Names",params,undefined,false); 
			copyArg(msg,"Owners",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listRepositoryAssociations(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutRecommendationFeedback=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CodeReviewArn",params,undefined,false); 
			copyArg(n,"RecommendationId",params,undefined,false); 
			copyArg(n,"Reactions",params,undefined,true); 
			
			copyArg(msg,"CodeReviewArn",params,undefined,false); 
			copyArg(msg,"RecommendationId",params,undefined,false); 
			copyArg(msg,"Reactions",params,undefined,true); 
			

			svc.putRecommendationFeedback(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS CodeGuruReviewer", AmazonAPINode);

};
