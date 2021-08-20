
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

		var awsService = new AWS.MigrationHub( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.MigrationHub(msg.AWSConfig) : awsService;

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

		
		service.AssociateCreatedArtifact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProgressUpdateStream",params,undefined,false); 
			copyArg(n,"MigrationTaskName",params,undefined,false); 
			copyArg(n,"CreatedArtifact",params,undefined,true); 
			
			copyArg(msg,"ProgressUpdateStream",params,undefined,false); 
			copyArg(msg,"MigrationTaskName",params,undefined,false); 
			copyArg(msg,"CreatedArtifact",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.associateCreatedArtifact(params,cb);
		}

		
		service.AssociateDiscoveredResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProgressUpdateStream",params,undefined,false); 
			copyArg(n,"MigrationTaskName",params,undefined,false); 
			copyArg(n,"DiscoveredResource",params,undefined,true); 
			
			copyArg(msg,"ProgressUpdateStream",params,undefined,false); 
			copyArg(msg,"MigrationTaskName",params,undefined,false); 
			copyArg(msg,"DiscoveredResource",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.associateDiscoveredResource(params,cb);
		}

		
		service.CreateProgressUpdateStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProgressUpdateStreamName",params,undefined,false); 
			
			copyArg(msg,"ProgressUpdateStreamName",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.createProgressUpdateStream(params,cb);
		}

		
		service.DeleteProgressUpdateStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProgressUpdateStreamName",params,undefined,false); 
			
			copyArg(msg,"ProgressUpdateStreamName",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.deleteProgressUpdateStream(params,cb);
		}

		
		service.DescribeApplicationState=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			

			svc.describeApplicationState(params,cb);
		}

		
		service.DescribeMigrationTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProgressUpdateStream",params,undefined,false); 
			copyArg(n,"MigrationTaskName",params,undefined,false); 
			
			copyArg(msg,"ProgressUpdateStream",params,undefined,false); 
			copyArg(msg,"MigrationTaskName",params,undefined,false); 
			

			svc.describeMigrationTask(params,cb);
		}

		
		service.DisassociateCreatedArtifact=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProgressUpdateStream",params,undefined,false); 
			copyArg(n,"MigrationTaskName",params,undefined,false); 
			copyArg(n,"CreatedArtifactName",params,undefined,false); 
			
			copyArg(msg,"ProgressUpdateStream",params,undefined,false); 
			copyArg(msg,"MigrationTaskName",params,undefined,false); 
			copyArg(msg,"CreatedArtifactName",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.disassociateCreatedArtifact(params,cb);
		}

		
		service.DisassociateDiscoveredResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProgressUpdateStream",params,undefined,false); 
			copyArg(n,"MigrationTaskName",params,undefined,false); 
			copyArg(n,"ConfigurationId",params,undefined,false); 
			
			copyArg(msg,"ProgressUpdateStream",params,undefined,false); 
			copyArg(msg,"MigrationTaskName",params,undefined,false); 
			copyArg(msg,"ConfigurationId",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.disassociateDiscoveredResource(params,cb);
		}

		
		service.ImportMigrationTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProgressUpdateStream",params,undefined,false); 
			copyArg(n,"MigrationTaskName",params,undefined,false); 
			
			copyArg(msg,"ProgressUpdateStream",params,undefined,false); 
			copyArg(msg,"MigrationTaskName",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.importMigrationTask(params,cb);
		}

		
		service.ListApplicationStates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ApplicationIds",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listApplicationStates(params,cb);
		}

		
		service.ListCreatedArtifacts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProgressUpdateStream",params,undefined,false); 
			copyArg(n,"MigrationTaskName",params,undefined,false); 
			
			copyArg(msg,"ProgressUpdateStream",params,undefined,false); 
			copyArg(msg,"MigrationTaskName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listCreatedArtifacts(params,cb);
		}

		
		service.ListDiscoveredResources=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProgressUpdateStream",params,undefined,false); 
			copyArg(n,"MigrationTaskName",params,undefined,false); 
			
			copyArg(msg,"ProgressUpdateStream",params,undefined,false); 
			copyArg(msg,"MigrationTaskName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listDiscoveredResources(params,cb);
		}

		
		service.ListMigrationTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"ResourceName",params,undefined,false); 
			

			svc.listMigrationTasks(params,cb);
		}

		
		service.ListProgressUpdateStreams=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listProgressUpdateStreams(params,cb);
		}

		
		service.NotifyApplicationState=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ApplicationId",params,undefined,false); 
			copyArg(n,"Status",params,undefined,false); 
			
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			copyArg(msg,"UpdateDateTime",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.notifyApplicationState(params,cb);
		}

		
		service.NotifyMigrationTaskState=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProgressUpdateStream",params,undefined,false); 
			copyArg(n,"MigrationTaskName",params,undefined,false); 
			copyArg(n,"Task",params,undefined,true); 
			copyArg(n,"UpdateDateTime",params,undefined,false); 
			copyArg(n,"NextUpdateSeconds",params,undefined,false); 
			
			copyArg(msg,"ProgressUpdateStream",params,undefined,false); 
			copyArg(msg,"MigrationTaskName",params,undefined,false); 
			copyArg(msg,"Task",params,undefined,true); 
			copyArg(msg,"UpdateDateTime",params,undefined,false); 
			copyArg(msg,"NextUpdateSeconds",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.notifyMigrationTaskState(params,cb);
		}

		
		service.PutResourceAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ProgressUpdateStream",params,undefined,false); 
			copyArg(n,"MigrationTaskName",params,undefined,false); 
			copyArg(n,"ResourceAttributeList",params,undefined,false); 
			
			copyArg(msg,"ProgressUpdateStream",params,undefined,false); 
			copyArg(msg,"MigrationTaskName",params,undefined,false); 
			copyArg(msg,"ResourceAttributeList",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.putResourceAttributes(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS MigrationHub", AmazonAPINode);

};
