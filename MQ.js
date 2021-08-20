
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

		var awsService = new AWS.MQ( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.MQ(msg.AWSConfig) : awsService;

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

		
		service.CreateBroker=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EngineVersion",params,undefined,false); 
			copyArg(n,"HostInstanceType",params,undefined,false); 
			copyArg(n,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArg(n,"Users",params,undefined,false); 
			copyArg(n,"BrokerName",params,undefined,false); 
			copyArg(n,"DeploymentMode",params,undefined,false); 
			copyArg(n,"EngineType",params,undefined,false); 
			copyArg(n,"PubliclyAccessible",params,undefined,false); 
			
			copyArg(msg,"AuthenticationStrategy",params,undefined,false); 
			copyArg(msg,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArg(msg,"BrokerName",params,undefined,false); 
			copyArg(msg,"Configuration",params,undefined,true); 
			copyArg(msg,"CreatorRequestId",params,undefined,false); 
			copyArg(msg,"DeploymentMode",params,undefined,false); 
			copyArg(msg,"EncryptionOptions",params,undefined,true); 
			copyArg(msg,"EngineType",params,undefined,false); 
			copyArg(msg,"EngineVersion",params,undefined,false); 
			copyArg(msg,"HostInstanceType",params,undefined,false); 
			copyArg(msg,"LdapServerMetadata",params,undefined,true); 
			copyArg(msg,"Logs",params,undefined,true); 
			copyArg(msg,"MaintenanceWindowStartTime",params,undefined,true); 
			copyArg(msg,"PubliclyAccessible",params,undefined,false); 
			copyArg(msg,"SecurityGroups",params,undefined,true); 
			copyArg(msg,"StorageType",params,undefined,false); 
			copyArg(msg,"SubnetIds",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"Users",params,undefined,false); 
			

			svc.createBroker(params,cb);
		}

		
		service.CreateConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EngineVersion",params,undefined,false); 
			copyArg(n,"EngineType",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"AuthenticationStrategy",params,undefined,false); 
			copyArg(msg,"EngineType",params,undefined,false); 
			copyArg(msg,"EngineVersion",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createConfiguration(params,cb);
		}

		
		service.CreateTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createTags(params,cb);
		}

		
		service.CreateUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Username",params,undefined,false); 
			copyArg(n,"BrokerId",params,undefined,false); 
			copyArg(n,"Password",params,undefined,false); 
			
			copyArg(msg,"BrokerId",params,undefined,false); 
			copyArg(msg,"ConsoleAccess",params,undefined,false); 
			copyArg(msg,"Groups",params,undefined,true); 
			copyArg(msg,"Password",params,undefined,false); 
			copyArg(msg,"Username",params,undefined,false); 
			

			svc.createUser(params,cb);
		}

		
		service.DeleteBroker=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BrokerId",params,undefined,false); 
			
			copyArg(msg,"BrokerId",params,undefined,false); 
			

			svc.deleteBroker(params,cb);
		}

		
		service.DeleteTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TagKeys",params,undefined,true); 
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			

			svc.deleteTags(params,cb);
		}

		
		service.DeleteUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Username",params,undefined,false); 
			copyArg(n,"BrokerId",params,undefined,false); 
			
			copyArg(msg,"BrokerId",params,undefined,false); 
			copyArg(msg,"Username",params,undefined,false); 
			

			svc.deleteUser(params,cb);
		}

		
		service.DescribeBroker=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BrokerId",params,undefined,false); 
			
			copyArg(msg,"BrokerId",params,undefined,false); 
			

			svc.describeBroker(params,cb);
		}

		
		service.DescribeBrokerEngineTypes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"EngineType",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeBrokerEngineTypes(params,cb);
		}

		
		service.DescribeBrokerInstanceOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"EngineType",params,undefined,false); 
			copyArg(msg,"HostInstanceType",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"StorageType",params,undefined,false); 
			

			svc.describeBrokerInstanceOptions(params,cb);
		}

		
		service.DescribeConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationId",params,undefined,false); 
			
			copyArg(msg,"ConfigurationId",params,undefined,false); 
			

			svc.describeConfiguration(params,cb);
		}

		
		service.DescribeConfigurationRevision=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationRevision",params,undefined,false); 
			copyArg(n,"ConfigurationId",params,undefined,false); 
			
			copyArg(msg,"ConfigurationId",params,undefined,false); 
			copyArg(msg,"ConfigurationRevision",params,undefined,false); 
			

			svc.describeConfigurationRevision(params,cb);
		}

		
		service.DescribeUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Username",params,undefined,false); 
			copyArg(n,"BrokerId",params,undefined,false); 
			
			copyArg(msg,"BrokerId",params,undefined,false); 
			copyArg(msg,"Username",params,undefined,false); 
			

			svc.describeUser(params,cb);
		}

		
		service.ListBrokers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listBrokers(params,cb);
		}

		
		service.ListConfigurationRevisions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationId",params,undefined,false); 
			
			copyArg(msg,"ConfigurationId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listConfigurationRevisions(params,cb);
		}

		
		service.ListConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listConfigurations(params,cb);
		}

		
		service.ListTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTags(params,cb);
		}

		
		service.ListUsers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BrokerId",params,undefined,false); 
			
			copyArg(msg,"BrokerId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listUsers(params,cb);
		}

		
		service.RebootBroker=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BrokerId",params,undefined,false); 
			
			copyArg(msg,"BrokerId",params,undefined,false); 
			

			svc.rebootBroker(params,cb);
		}

		
		service.UpdateBroker=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BrokerId",params,undefined,false); 
			
			copyArg(msg,"AuthenticationStrategy",params,undefined,false); 
			copyArg(msg,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArg(msg,"BrokerId",params,undefined,false); 
			copyArg(msg,"Configuration",params,undefined,true); 
			copyArg(msg,"EngineVersion",params,undefined,false); 
			copyArg(msg,"HostInstanceType",params,undefined,false); 
			copyArg(msg,"LdapServerMetadata",params,undefined,true); 
			copyArg(msg,"Logs",params,undefined,true); 
			copyArg(msg,"MaintenanceWindowStartTime",params,undefined,true); 
			copyArg(msg,"SecurityGroups",params,undefined,true); 
			

			svc.updateBroker(params,cb);
		}

		
		service.UpdateConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConfigurationId",params,undefined,false); 
			copyArg(n,"Data",params,undefined,false); 
			
			copyArg(msg,"ConfigurationId",params,undefined,false); 
			copyArg(msg,"Data",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			

			svc.updateConfiguration(params,cb);
		}

		
		service.UpdateUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Username",params,undefined,false); 
			copyArg(n,"BrokerId",params,undefined,false); 
			
			copyArg(msg,"BrokerId",params,undefined,false); 
			copyArg(msg,"ConsoleAccess",params,undefined,false); 
			copyArg(msg,"Groups",params,undefined,true); 
			copyArg(msg,"Password",params,undefined,false); 
			copyArg(msg,"Username",params,undefined,false); 
			

			svc.updateUser(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS MQ", AmazonAPINode);

};
