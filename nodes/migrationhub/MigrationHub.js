
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

		var awsService = new AWS.MigrationHub( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.MigrationHub(msg.AWSConfig) : awsService;

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

		
		service.AssociateCreatedArtifact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(n,"MigrationTaskName",params,undefined,false); 
			copyArgs(n,"CreatedArtifact",params,undefined,true); 
			
			copyArgs(n,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(n,"MigrationTaskName",params,undefined,false); 
			copyArgs(n,"CreatedArtifact",params,undefined,true); 
			copyArgs(n,"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(msg,"MigrationTaskName",params,undefined,false); 
			copyArgs(msg,"CreatedArtifact",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.associateCreatedArtifact(params,cb);
		}

		
		service.AssociateDiscoveredResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(n,"MigrationTaskName",params,undefined,false); 
			copyArgs(n,"DiscoveredResource",params,undefined,true); 
			
			copyArgs(n,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(n,"MigrationTaskName",params,undefined,false); 
			copyArgs(n,"DiscoveredResource",params,undefined,true); 
			copyArgs(n,"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(msg,"MigrationTaskName",params,undefined,false); 
			copyArgs(msg,"DiscoveredResource",params,undefined,true); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.associateDiscoveredResource(params,cb);
		}

		
		service.CreateProgressUpdateStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProgressUpdateStreamName",params,undefined,false); 
			
			copyArgs(n,"ProgressUpdateStreamName",params,undefined,false); 
			copyArgs(n,"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ProgressUpdateStreamName",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.createProgressUpdateStream(params,cb);
		}

		
		service.DeleteProgressUpdateStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProgressUpdateStreamName",params,undefined,false); 
			
			copyArgs(n,"ProgressUpdateStreamName",params,undefined,false); 
			copyArgs(n,"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ProgressUpdateStreamName",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.deleteProgressUpdateStream(params,cb);
		}

		
		service.DescribeApplicationState=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			

			svc.describeApplicationState(params,cb);
		}

		
		service.DescribeMigrationTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(n,"MigrationTaskName",params,undefined,false); 
			
			copyArgs(n,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(n,"MigrationTaskName",params,undefined,false); 
			
			copyArgs(msg,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(msg,"MigrationTaskName",params,undefined,false); 
			

			svc.describeMigrationTask(params,cb);
		}

		
		service.DisassociateCreatedArtifact=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(n,"MigrationTaskName",params,undefined,false); 
			copyArgs(n,"CreatedArtifactName",params,undefined,false); 
			
			copyArgs(n,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(n,"MigrationTaskName",params,undefined,false); 
			copyArgs(n,"CreatedArtifactName",params,undefined,false); 
			copyArgs(n,"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(msg,"MigrationTaskName",params,undefined,false); 
			copyArgs(msg,"CreatedArtifactName",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.disassociateCreatedArtifact(params,cb);
		}

		
		service.DisassociateDiscoveredResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(n,"MigrationTaskName",params,undefined,false); 
			copyArgs(n,"ConfigurationId",params,undefined,false); 
			
			copyArgs(n,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(n,"MigrationTaskName",params,undefined,false); 
			copyArgs(n,"ConfigurationId",params,undefined,false); 
			copyArgs(n,"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(msg,"MigrationTaskName",params,undefined,false); 
			copyArgs(msg,"ConfigurationId",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.disassociateDiscoveredResource(params,cb);
		}

		
		service.ImportMigrationTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(n,"MigrationTaskName",params,undefined,false); 
			
			copyArgs(n,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(n,"MigrationTaskName",params,undefined,false); 
			copyArgs(n,"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(msg,"MigrationTaskName",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.importMigrationTask(params,cb);
		}

		
		service.ListApplicationStates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ApplicationIds",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ApplicationIds",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listApplicationStates(params,cb);
		}

		
		service.ListCreatedArtifacts=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(n,"MigrationTaskName",params,undefined,false); 
			
			copyArgs(n,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(n,"MigrationTaskName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(msg,"MigrationTaskName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listCreatedArtifacts(params,cb);
		}

		
		service.ListDiscoveredResources=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(n,"MigrationTaskName",params,undefined,false); 
			
			copyArgs(n,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(n,"MigrationTaskName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(msg,"MigrationTaskName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listDiscoveredResources(params,cb);
		}

		
		service.ListMigrationTasks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"ResourceName",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"ResourceName",params,undefined,false); 
			

			svc.listMigrationTasks(params,cb);
		}

		
		service.ListProgressUpdateStreams=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listProgressUpdateStreams(params,cb);
		}

		
		service.NotifyApplicationState=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"Status",params,undefined,false); 
			copyArgs(n,"UpdateDateTime",params,undefined,false); 
			copyArgs(n,"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"Status",params,undefined,false); 
			copyArgs(msg,"UpdateDateTime",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.notifyApplicationState(params,cb);
		}

		
		service.NotifyMigrationTaskState=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(n,"MigrationTaskName",params,undefined,false); 
			copyArgs(n,"Task",params,undefined,true); 
			copyArgs(n,"UpdateDateTime",params,undefined,false); 
			copyArgs(n,"NextUpdateSeconds",params,undefined,false); 
			
			copyArgs(n,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(n,"MigrationTaskName",params,undefined,false); 
			copyArgs(n,"Task",params,undefined,true); 
			copyArgs(n,"UpdateDateTime",params,undefined,false); 
			copyArgs(n,"NextUpdateSeconds",params,undefined,false); 
			copyArgs(n,"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(msg,"MigrationTaskName",params,undefined,false); 
			copyArgs(msg,"Task",params,undefined,true); 
			copyArgs(msg,"UpdateDateTime",params,undefined,false); 
			copyArgs(msg,"NextUpdateSeconds",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.notifyMigrationTaskState(params,cb);
		}

		
		service.PutResourceAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(n,"MigrationTaskName",params,undefined,false); 
			copyArgs(n,"ResourceAttributeList",params,undefined,false); 
			
			copyArgs(n,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(n,"MigrationTaskName",params,undefined,false); 
			copyArgs(n,"ResourceAttributeList",params,undefined,false); 
			copyArgs(n,"DryRun",params,undefined,false); 
			
			copyArgs(msg,"ProgressUpdateStream",params,undefined,false); 
			copyArgs(msg,"MigrationTaskName",params,undefined,false); 
			copyArgs(msg,"ResourceAttributeList",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.putResourceAttributes(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS MigrationHub", AmazonAPINode);

};
