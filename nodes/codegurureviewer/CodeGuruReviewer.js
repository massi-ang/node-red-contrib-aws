
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

		var awsService = new AWS.CodeGuruReviewer( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.CodeGuruReviewer(msg.AWSConfig) : awsService;

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

		
		service.AssociateRepository=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Repository",params,undefined,false); 
			
			copyArgs(n,"Repository",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"KMSKeyDetails",params,undefined,true); 
			
			copyArgs(msg,"Repository",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"KMSKeyDetails",params,undefined,true); 
			

			svc.associateRepository(params,cb);
		}

		
		service.CreateCodeReview=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RepositoryAssociationArn",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"RepositoryAssociationArn",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"ClientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"RepositoryAssociationArn",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.createCodeReview(params,cb);
		}

		
		service.DescribeCodeReview=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CodeReviewArn",params,undefined,false); 
			
			copyArgs(n,"CodeReviewArn",params,undefined,false); 
			
			copyArgs(msg,"CodeReviewArn",params,undefined,false); 
			

			svc.describeCodeReview(params,cb);
		}

		
		service.DescribeRecommendationFeedback=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CodeReviewArn",params,undefined,false); 
			copyArgs(n,"RecommendationId",params,undefined,false); 
			
			copyArgs(n,"CodeReviewArn",params,undefined,false); 
			copyArgs(n,"RecommendationId",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(msg,"CodeReviewArn",params,undefined,false); 
			copyArgs(msg,"RecommendationId",params,undefined,false); 
			copyArgs(msg,"UserId",params,undefined,false); 
			

			svc.describeRecommendationFeedback(params,cb);
		}

		
		service.DescribeRepositoryAssociation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AssociationArn",params,undefined,false); 
			
			copyArgs(n,"AssociationArn",params,undefined,false); 
			
			copyArgs(msg,"AssociationArn",params,undefined,false); 
			

			svc.describeRepositoryAssociation(params,cb);
		}

		
		service.DisassociateRepository=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AssociationArn",params,undefined,false); 
			
			copyArgs(n,"AssociationArn",params,undefined,false); 
			
			copyArgs(msg,"AssociationArn",params,undefined,false); 
			

			svc.disassociateRepository(params,cb);
		}

		
		service.ListCodeReviews=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Type",params,undefined,false); 
			
			copyArgs(n,"ProviderTypes",params,undefined,true); 
			copyArgs(n,"States",params,undefined,false); 
			copyArgs(n,"RepositoryNames",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ProviderTypes",params,undefined,true); 
			copyArgs(msg,"States",params,undefined,false); 
			copyArgs(msg,"RepositoryNames",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listCodeReviews(params,cb);
		}

		
		service.ListRecommendationFeedback=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CodeReviewArn",params,undefined,false); 
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"CodeReviewArn",params,undefined,false); 
			copyArgs(n,"UserIds",params,undefined,false); 
			copyArgs(n,"RecommendationIds",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"CodeReviewArn",params,undefined,false); 
			copyArgs(msg,"UserIds",params,undefined,false); 
			copyArgs(msg,"RecommendationIds",params,undefined,false); 
			

			svc.listRecommendationFeedback(params,cb);
		}

		
		service.ListRecommendations=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CodeReviewArn",params,undefined,false); 
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"CodeReviewArn",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"CodeReviewArn",params,undefined,false); 
			

			svc.listRecommendations(params,cb);
		}

		
		service.ListRepositoryAssociations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ProviderTypes",params,undefined,true); 
			copyArgs(n,"States",params,undefined,false); 
			copyArgs(n,"Names",params,undefined,false); 
			copyArgs(n,"Owners",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ProviderTypes",params,undefined,true); 
			copyArgs(msg,"States",params,undefined,false); 
			copyArgs(msg,"Names",params,undefined,false); 
			copyArgs(msg,"Owners",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listRepositoryAssociations(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutRecommendationFeedback=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CodeReviewArn",params,undefined,false); 
			copyArgs(n,"RecommendationId",params,undefined,false); 
			copyArgs(n,"Reactions",params,undefined,true); 
			
			copyArgs(n,"CodeReviewArn",params,undefined,false); 
			copyArgs(n,"RecommendationId",params,undefined,false); 
			copyArgs(n,"Reactions",params,undefined,true); 
			
			copyArgs(msg,"CodeReviewArn",params,undefined,false); 
			copyArgs(msg,"RecommendationId",params,undefined,false); 
			copyArgs(msg,"Reactions",params,undefined,true); 
			

			svc.putRecommendationFeedback(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS CodeGuruReviewer", AmazonAPINode);

};
