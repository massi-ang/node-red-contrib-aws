
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

		var awsService = new AWS.MQ( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.MQ(msg.AWSConfig) : awsService;

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
		
		service.CreateBroker=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(n,"HostInstanceType",params,undefined,false); 
			copyArgs(Boolean(n),"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArgs(n,"Users",params,undefined,false); 
			copyArgs(n,"BrokerName",params,undefined,false); 
			copyArgs(n,"DeploymentMode",params,undefined,false); 
			copyArgs(n,"EngineType",params,undefined,false); 
			copyArgs(Boolean(n),"PubliclyAccessible",params,undefined,false); 
			
			copyArgs(n,"AuthenticationStrategy",params,undefined,false); 
			copyArgs(Boolean(n),"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArgs(n,"BrokerName",params,undefined,false); 
			copyArgs(n,"Configuration",params,undefined,true); 
			copyArgs(n,"CreatorRequestId",params,undefined,false); 
			copyArgs(n,"DeploymentMode",params,undefined,false); 
			copyArgs(n,"EncryptionOptions",params,undefined,true); 
			copyArgs(n,"EngineType",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(n,"HostInstanceType",params,undefined,false); 
			copyArgs(n,"LdapServerMetadata",params,undefined,true); 
			copyArgs(n,"Logs",params,undefined,true); 
			copyArgs(n,"MaintenanceWindowStartTime",params,undefined,true); 
			copyArgs(Boolean(n),"PubliclyAccessible",params,undefined,false); 
			copyArgs(n,"SecurityGroups",params,undefined,true); 
			copyArgs(n,"StorageType",params,undefined,false); 
			copyArgs(n,"SubnetIds",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"Users",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationStrategy",params,undefined,false); 
			copyArgs(msg,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArgs(msg,"BrokerName",params,undefined,false); 
			copyArgs(msg,"Configuration",params,undefined,true); 
			copyArgs(msg,"CreatorRequestId",params,undefined,false); 
			copyArgs(msg,"DeploymentMode",params,undefined,false); 
			copyArgs(msg,"EncryptionOptions",params,undefined,true); 
			copyArgs(msg,"EngineType",params,undefined,false); 
			copyArgs(msg,"EngineVersion",params,undefined,false); 
			copyArgs(msg,"HostInstanceType",params,undefined,false); 
			copyArgs(msg,"LdapServerMetadata",params,undefined,true); 
			copyArgs(msg,"Logs",params,undefined,true); 
			copyArgs(msg,"MaintenanceWindowStartTime",params,undefined,true); 
			copyArgs(msg,"PubliclyAccessible",params,undefined,false); 
			copyArgs(msg,"SecurityGroups",params,undefined,true); 
			copyArgs(msg,"StorageType",params,undefined,false); 
			copyArgs(msg,"SubnetIds",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"Users",params,undefined,false); 
			

			svc.createBroker(params,cb);
		}
		
		service.CreateConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(n,"EngineType",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"AuthenticationStrategy",params,undefined,false); 
			copyArgs(n,"EngineType",params,undefined,false); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"AuthenticationStrategy",params,undefined,false); 
			copyArgs(msg,"EngineType",params,undefined,false); 
			copyArgs(msg,"EngineVersion",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createConfiguration(params,cb);
		}
		
		service.CreateTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createTags(params,cb);
		}
		
		service.CreateUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Username",params,undefined,false); 
			copyArgs(n,"BrokerId",params,undefined,false); 
			copyArgs(n,"Password",params,undefined,false); 
			
			copyArgs(n,"BrokerId",params,undefined,false); 
			copyArgs(Boolean(n),"ConsoleAccess",params,undefined,false); 
			copyArgs(n,"Groups",params,undefined,true); 
			copyArgs(n,"Password",params,undefined,false); 
			copyArgs(n,"Username",params,undefined,false); 
			
			copyArgs(msg,"BrokerId",params,undefined,false); 
			copyArgs(msg,"ConsoleAccess",params,undefined,false); 
			copyArgs(msg,"Groups",params,undefined,true); 
			copyArgs(msg,"Password",params,undefined,false); 
			copyArgs(msg,"Username",params,undefined,false); 
			

			svc.createUser(params,cb);
		}
		
		service.DeleteBroker=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BrokerId",params,undefined,false); 
			
			copyArgs(n,"BrokerId",params,undefined,false); 
			
			copyArgs(msg,"BrokerId",params,undefined,false); 
			

			svc.deleteBroker(params,cb);
		}
		
		service.DeleteTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TagKeys",params,undefined,true); 
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			

			svc.deleteTags(params,cb);
		}
		
		service.DeleteUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Username",params,undefined,false); 
			copyArgs(n,"BrokerId",params,undefined,false); 
			
			copyArgs(n,"BrokerId",params,undefined,false); 
			copyArgs(n,"Username",params,undefined,false); 
			
			copyArgs(msg,"BrokerId",params,undefined,false); 
			copyArgs(msg,"Username",params,undefined,false); 
			

			svc.deleteUser(params,cb);
		}
		
		service.DescribeBroker=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BrokerId",params,undefined,false); 
			
			copyArgs(n,"BrokerId",params,undefined,false); 
			
			copyArgs(msg,"BrokerId",params,undefined,false); 
			

			svc.describeBroker(params,cb);
		}
		
		service.DescribeBrokerEngineTypes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"EngineType",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"EngineType",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeBrokerEngineTypes(params,cb);
		}
		
		service.DescribeBrokerInstanceOptions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"EngineType",params,undefined,false); 
			copyArgs(n,"HostInstanceType",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"StorageType",params,undefined,false); 
			
			copyArgs(msg,"EngineType",params,undefined,false); 
			copyArgs(msg,"HostInstanceType",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"StorageType",params,undefined,false); 
			

			svc.describeBrokerInstanceOptions(params,cb);
		}
		
		service.DescribeConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationId",params,undefined,false); 
			
			copyArgs(n,"ConfigurationId",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationId",params,undefined,false); 
			

			svc.describeConfiguration(params,cb);
		}
		
		service.DescribeConfigurationRevision=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationRevision",params,undefined,false); 
			copyArgs(n,"ConfigurationId",params,undefined,false); 
			
			copyArgs(n,"ConfigurationId",params,undefined,false); 
			copyArgs(n,"ConfigurationRevision",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationId",params,undefined,false); 
			copyArgs(msg,"ConfigurationRevision",params,undefined,false); 
			

			svc.describeConfigurationRevision(params,cb);
		}
		
		service.DescribeUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Username",params,undefined,false); 
			copyArgs(n,"BrokerId",params,undefined,false); 
			
			copyArgs(n,"BrokerId",params,undefined,false); 
			copyArgs(n,"Username",params,undefined,false); 
			
			copyArgs(msg,"BrokerId",params,undefined,false); 
			copyArgs(msg,"Username",params,undefined,false); 
			

			svc.describeUser(params,cb);
		}
		
		service.ListBrokers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listBrokers(params,cb);
		}
		
		service.ListConfigurationRevisions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationId",params,undefined,false); 
			
			copyArgs(n,"ConfigurationId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listConfigurationRevisions(params,cb);
		}
		
		service.ListConfigurations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listConfigurations(params,cb);
		}
		
		service.ListTags=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTags(params,cb);
		}
		
		service.ListUsers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BrokerId",params,undefined,false); 
			
			copyArgs(n,"BrokerId",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"BrokerId",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listUsers(params,cb);
		}
		
		service.RebootBroker=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BrokerId",params,undefined,false); 
			
			copyArgs(n,"BrokerId",params,undefined,false); 
			
			copyArgs(msg,"BrokerId",params,undefined,false); 
			

			svc.rebootBroker(params,cb);
		}
		
		service.UpdateBroker=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"BrokerId",params,undefined,false); 
			
			copyArgs(n,"AuthenticationStrategy",params,undefined,false); 
			copyArgs(Boolean(n),"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArgs(n,"BrokerId",params,undefined,false); 
			copyArgs(n,"Configuration",params,undefined,true); 
			copyArgs(n,"EngineVersion",params,undefined,false); 
			copyArgs(n,"HostInstanceType",params,undefined,false); 
			copyArgs(n,"LdapServerMetadata",params,undefined,true); 
			copyArgs(n,"Logs",params,undefined,true); 
			copyArgs(n,"MaintenanceWindowStartTime",params,undefined,true); 
			copyArgs(n,"SecurityGroups",params,undefined,true); 
			
			copyArgs(msg,"AuthenticationStrategy",params,undefined,false); 
			copyArgs(msg,"AutoMinorVersionUpgrade",params,undefined,false); 
			copyArgs(msg,"BrokerId",params,undefined,false); 
			copyArgs(msg,"Configuration",params,undefined,true); 
			copyArgs(msg,"EngineVersion",params,undefined,false); 
			copyArgs(msg,"HostInstanceType",params,undefined,false); 
			copyArgs(msg,"LdapServerMetadata",params,undefined,true); 
			copyArgs(msg,"Logs",params,undefined,true); 
			copyArgs(msg,"MaintenanceWindowStartTime",params,undefined,true); 
			copyArgs(msg,"SecurityGroups",params,undefined,true); 
			

			svc.updateBroker(params,cb);
		}
		
		service.UpdateConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConfigurationId",params,undefined,false); 
			copyArgs(n,"Data",params,undefined,false); 
			
			copyArgs(n,"ConfigurationId",params,undefined,false); 
			copyArgs(n,"Data",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			
			copyArgs(msg,"ConfigurationId",params,undefined,false); 
			copyArgs(msg,"Data",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			

			svc.updateConfiguration(params,cb);
		}
		
		service.UpdateUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Username",params,undefined,false); 
			copyArgs(n,"BrokerId",params,undefined,false); 
			
			copyArgs(n,"BrokerId",params,undefined,false); 
			copyArgs(Boolean(n),"ConsoleAccess",params,undefined,false); 
			copyArgs(n,"Groups",params,undefined,true); 
			copyArgs(n,"Password",params,undefined,false); 
			copyArgs(n,"Username",params,undefined,false); 
			
			copyArgs(msg,"BrokerId",params,undefined,false); 
			copyArgs(msg,"ConsoleAccess",params,undefined,false); 
			copyArgs(msg,"Groups",params,undefined,true); 
			copyArgs(msg,"Password",params,undefined,false); 
			copyArgs(msg,"Username",params,undefined,false); 
			

			svc.updateUser(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS MQ", AmazonAPINode);

};
