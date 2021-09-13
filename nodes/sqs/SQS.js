
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

		var awsService = new AWS.SQS( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.SQS(msg.AWSConfig) : awsService;

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
		
			service.AddPermission=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			copyArgs(n,"Label",params,undefined,false); 
			copyArgs(n,"AWSAccountIds",params,undefined,false); 
			copyArgs(n,"Actions",params,undefined,false); 
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			copyArgs(n,"Label",params,undefined,false); 
			copyArgs(n,"AWSAccountIds",params,undefined,false); 
			copyArgs(n,"Actions",params,undefined,false); 
			
			copyArgs(msg,"QueueUrl",params,undefined,false); 
			copyArgs(msg,"Label",params,undefined,false); 
			copyArgs(msg,"AWSAccountIds",params,undefined,false); 
			copyArgs(msg,"Actions",params,undefined,false); 
			

			svc.addPermission(params,cb);
		}
			service.ChangeMessageVisibility=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			copyArgs(n,"ReceiptHandle",params,undefined,false); 
			copyArgs(Number(n),"VisibilityTimeout",params,undefined,false); 
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			copyArgs(n,"ReceiptHandle",params,undefined,false); 
			copyArgs(Number(n),"VisibilityTimeout",params,undefined,false); 
			
			copyArgs(msg,"QueueUrl",params,undefined,false); 
			copyArgs(msg,"ReceiptHandle",params,undefined,false); 
			copyArgs(msg,"VisibilityTimeout",params,undefined,false); 
			

			svc.changeMessageVisibility(params,cb);
		}
			service.ChangeMessageVisibilityBatch=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			copyArgs(n,"Entries",params,undefined,false); 
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			copyArgs(n,"Entries",params,undefined,false); 
			
			copyArgs(msg,"QueueUrl",params,undefined,false); 
			copyArgs(msg,"Entries",params,undefined,false); 
			

			svc.changeMessageVisibilityBatch(params,cb);
		}
			service.CreateQueue=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QueueName",params,undefined,false); 
			
			copyArgs(n,"QueueName",params,undefined,false); 
			copyArgs(n,"Attributes",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"QueueName",params,undefined,false); 
			copyArgs(msg,"Attributes",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createQueue(params,cb);
		}
			service.DeleteMessage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			copyArgs(n,"ReceiptHandle",params,undefined,false); 
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			copyArgs(n,"ReceiptHandle",params,undefined,false); 
			
			copyArgs(msg,"QueueUrl",params,undefined,false); 
			copyArgs(msg,"ReceiptHandle",params,undefined,false); 
			

			svc.deleteMessage(params,cb);
		}
			service.DeleteMessageBatch=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			copyArgs(n,"Entries",params,undefined,false); 
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			copyArgs(n,"Entries",params,undefined,false); 
			
			copyArgs(msg,"QueueUrl",params,undefined,false); 
			copyArgs(msg,"Entries",params,undefined,false); 
			

			svc.deleteMessageBatch(params,cb);
		}
			service.DeleteQueue=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			
			copyArgs(msg,"QueueUrl",params,undefined,false); 
			

			svc.deleteQueue(params,cb);
		}
			service.GetQueueAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			copyArgs(n,"AttributeNames",params,undefined,true); 
			
			copyArgs(msg,"QueueUrl",params,undefined,false); 
			copyArgs(msg,"AttributeNames",params,undefined,true); 
			

			svc.getQueueAttributes(params,cb);
		}
			service.GetQueueUrl=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QueueName",params,undefined,false); 
			
			copyArgs(n,"QueueName",params,undefined,false); 
			copyArgs(n,"QueueOwnerAWSAccountId",params,undefined,false); 
			
			copyArgs(msg,"QueueName",params,undefined,false); 
			copyArgs(msg,"QueueOwnerAWSAccountId",params,undefined,false); 
			

			svc.getQueueUrl(params,cb);
		}
			service.ListDeadLetterSourceQueues=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"QueueUrl",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listDeadLetterSourceQueues(params,cb);
		}
			service.ListQueueTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			
			copyArgs(msg,"QueueUrl",params,undefined,false); 
			

			svc.listQueueTags(params,cb);
		}
			service.ListQueues=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"QueueNamePrefix",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"QueueNamePrefix",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listQueues(params,cb);
		}
			service.PurgeQueue=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			
			copyArgs(msg,"QueueUrl",params,undefined,false); 
			

			svc.purgeQueue(params,cb);
		}
			service.ReceiveMessage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			copyArgs(n,"AttributeNames",params,undefined,true); 
			copyArgs(n,"MessageAttributeNames",params,undefined,false); 
			copyArgs(Number(n),"MaxNumberOfMessages",params,undefined,false); 
			copyArgs(Number(n),"VisibilityTimeout",params,undefined,false); 
			copyArgs(Number(n),"WaitTimeSeconds",params,undefined,false); 
			copyArgs(n,"ReceiveRequestAttemptId",params,undefined,false); 
			
			copyArgs(msg,"QueueUrl",params,undefined,false); 
			copyArgs(msg,"AttributeNames",params,undefined,true); 
			copyArgs(msg,"MessageAttributeNames",params,undefined,false); 
			copyArgs(msg,"MaxNumberOfMessages",params,undefined,false); 
			copyArgs(msg,"VisibilityTimeout",params,undefined,false); 
			copyArgs(msg,"WaitTimeSeconds",params,undefined,false); 
			copyArgs(msg,"ReceiveRequestAttemptId",params,undefined,false); 
			

			svc.receiveMessage(params,cb);
		}
			service.RemovePermission=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			copyArgs(n,"Label",params,undefined,false); 
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			copyArgs(n,"Label",params,undefined,false); 
			
			copyArgs(msg,"QueueUrl",params,undefined,false); 
			copyArgs(msg,"Label",params,undefined,false); 
			

			svc.removePermission(params,cb);
		}
			service.SendMessage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			copyArgs(n,"MessageBody",params,undefined,false); 
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			copyArgs(n,"MessageBody",params,undefined,false); 
			copyArgs(Number(n),"DelaySeconds",params,undefined,false); 
			copyArgs(n,"MessageAttributes",params,undefined,true); 
			copyArgs(n,"MessageSystemAttributes",params,undefined,true); 
			copyArgs(n,"MessageDeduplicationId",params,undefined,false); 
			copyArgs(n,"MessageGroupId",params,undefined,false); 
			
			copyArgs(msg,"QueueUrl",params,undefined,false); 
			copyArgs(msg,"MessageBody",params,undefined,false); 
			copyArgs(msg,"DelaySeconds",params,undefined,false); 
			copyArgs(msg,"MessageAttributes",params,undefined,true); 
			copyArgs(msg,"MessageSystemAttributes",params,undefined,true); 
			copyArgs(msg,"MessageDeduplicationId",params,undefined,false); 
			copyArgs(msg,"MessageGroupId",params,undefined,false); 
			

			svc.sendMessage(params,cb);
		}
			service.SendMessageBatch=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			copyArgs(n,"Entries",params,undefined,false); 
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			copyArgs(n,"Entries",params,undefined,false); 
			
			copyArgs(msg,"QueueUrl",params,undefined,false); 
			copyArgs(msg,"Entries",params,undefined,false); 
			

			svc.sendMessageBatch(params,cb);
		}
			service.SetQueueAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			copyArgs(n,"Attributes",params,undefined,true); 
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			copyArgs(n,"Attributes",params,undefined,true); 
			
			copyArgs(msg,"QueueUrl",params,undefined,false); 
			copyArgs(msg,"Attributes",params,undefined,true); 
			

			svc.setQueueAttributes(params,cb);
		}
			service.TagQueue=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"QueueUrl",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagQueue(params,cb);
		}
			service.UntagQueue=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"QueueUrl",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"QueueUrl",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagQueue(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS SQS", AmazonAPINode);

};
