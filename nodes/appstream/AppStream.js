
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

		var awsService = new AWS.AppStream( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.AppStream(msg.AWSConfig) : awsService;

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

		
		service.AssociateFleet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FleetName",params,undefined,false); 
			copyArgs(n,"StackName",params,undefined,false); 
			
			copyArgs(n,"FleetName",params,undefined,false); 
			copyArgs(n,"StackName",params,undefined,false); 
			
			copyArgs(msg,"FleetName",params,undefined,false); 
			copyArgs(msg,"StackName",params,undefined,false); 
			

			svc.associateFleet(params,cb);
		}

		
		service.BatchAssociateUserStack=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserStackAssociations",params,undefined,true); 
			
			copyArgs(n,"UserStackAssociations",params,undefined,true); 
			
			copyArgs(msg,"UserStackAssociations",params,undefined,true); 
			

			svc.batchAssociateUserStack(params,cb);
		}

		
		service.BatchDisassociateUserStack=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserStackAssociations",params,undefined,true); 
			
			copyArgs(n,"UserStackAssociations",params,undefined,true); 
			
			copyArgs(msg,"UserStackAssociations",params,undefined,true); 
			

			svc.batchDisassociateUserStack(params,cb);
		}

		
		service.CopyImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceImageName",params,undefined,false); 
			copyArgs(n,"DestinationImageName",params,undefined,false); 
			copyArgs(n,"DestinationRegion",params,undefined,false); 
			
			copyArgs(n,"SourceImageName",params,undefined,false); 
			copyArgs(n,"DestinationImageName",params,undefined,false); 
			copyArgs(n,"DestinationRegion",params,undefined,false); 
			copyArgs(n,"DestinationImageDescription",params,undefined,false); 
			
			copyArgs(msg,"SourceImageName",params,undefined,false); 
			copyArgs(msg,"DestinationImageName",params,undefined,false); 
			copyArgs(msg,"DestinationRegion",params,undefined,false); 
			copyArgs(msg,"DestinationImageDescription",params,undefined,false); 
			

			svc.copyImage(params,cb);
		}

		
		service.CreateDirectoryConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryName",params,undefined,false); 
			copyArgs(n,"OrganizationalUnitDistinguishedNames",params,undefined,true); 
			
			copyArgs(n,"DirectoryName",params,undefined,false); 
			copyArgs(n,"OrganizationalUnitDistinguishedNames",params,undefined,true); 
			copyArgs(n,"ServiceAccountCredentials",params,undefined,true); 
			
			copyArgs(msg,"DirectoryName",params,undefined,false); 
			copyArgs(msg,"OrganizationalUnitDistinguishedNames",params,undefined,true); 
			copyArgs(msg,"ServiceAccountCredentials",params,undefined,true); 
			

			svc.createDirectoryConfig(params,cb);
		}

		
		service.CreateFleet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"InstanceType",params,undefined,false); 
			copyArgs(n,"ComputeCapacity",params,undefined,true); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ImageName",params,undefined,false); 
			copyArgs(n,"ImageArn",params,undefined,false); 
			copyArgs(n,"InstanceType",params,undefined,false); 
			copyArgs(n,"FleetType",params,undefined,false); 
			copyArgs(n,"ComputeCapacity",params,undefined,true); 
			copyArgs(n,"VpcConfig",params,undefined,true); 
			copyArgs(n,"MaxUserDurationInSeconds",params,undefined,false); 
			copyArgs(n,"DisconnectTimeoutInSeconds",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"DisplayName",params,undefined,false); 
			copyArgs(n,"EnableDefaultInternetAccess",params,undefined,false); 
			copyArgs(n,"DomainJoinInfo",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"IdleDisconnectTimeoutInSeconds",params,undefined,false); 
			copyArgs(n,"IamRoleArn",params,undefined,false); 
			copyArgs(n,"StreamView",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ImageName",params,undefined,false); 
			copyArgs(msg,"ImageArn",params,undefined,false); 
			copyArgs(msg,"InstanceType",params,undefined,false); 
			copyArgs(msg,"FleetType",params,undefined,false); 
			copyArgs(msg,"ComputeCapacity",params,undefined,true); 
			copyArgs(msg,"VpcConfig",params,undefined,true); 
			copyArgs(msg,"MaxUserDurationInSeconds",params,undefined,false); 
			copyArgs(msg,"DisconnectTimeoutInSeconds",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DisplayName",params,undefined,false); 
			copyArgs(msg,"EnableDefaultInternetAccess",params,undefined,false); 
			copyArgs(msg,"DomainJoinInfo",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"IdleDisconnectTimeoutInSeconds",params,undefined,false); 
			copyArgs(msg,"IamRoleArn",params,undefined,false); 
			copyArgs(msg,"StreamView",params,undefined,false); 
			

			svc.createFleet(params,cb);
		}

		
		service.CreateImageBuilder=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"InstanceType",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"ImageName",params,undefined,false); 
			copyArgs(n,"ImageArn",params,undefined,false); 
			copyArgs(n,"InstanceType",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"DisplayName",params,undefined,false); 
			copyArgs(n,"VpcConfig",params,undefined,true); 
			copyArgs(n,"IamRoleArn",params,undefined,false); 
			copyArgs(n,"EnableDefaultInternetAccess",params,undefined,false); 
			copyArgs(n,"DomainJoinInfo",params,undefined,true); 
			copyArgs(n,"AppstreamAgentVersion",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"AccessEndpoints",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"ImageName",params,undefined,false); 
			copyArgs(msg,"ImageArn",params,undefined,false); 
			copyArgs(msg,"InstanceType",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DisplayName",params,undefined,false); 
			copyArgs(msg,"VpcConfig",params,undefined,true); 
			copyArgs(msg,"IamRoleArn",params,undefined,false); 
			copyArgs(msg,"EnableDefaultInternetAccess",params,undefined,false); 
			copyArgs(msg,"DomainJoinInfo",params,undefined,true); 
			copyArgs(msg,"AppstreamAgentVersion",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"AccessEndpoints",params,undefined,true); 
			

			svc.createImageBuilder(params,cb);
		}

		
		service.CreateImageBuilderStreamingURL=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Validity",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Validity",params,undefined,false); 
			

			svc.createImageBuilderStreamingURL(params,cb);
		}

		
		service.CreateStack=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"DisplayName",params,undefined,false); 
			copyArgs(n,"StorageConnectors",params,undefined,true); 
			copyArgs(n,"RedirectURL",params,undefined,false); 
			copyArgs(n,"FeedbackURL",params,undefined,false); 
			copyArgs(n,"UserSettings",params,undefined,true); 
			copyArgs(n,"ApplicationSettings",params,undefined,true); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"AccessEndpoints",params,undefined,true); 
			copyArgs(n,"EmbedHostDomains",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DisplayName",params,undefined,false); 
			copyArgs(msg,"StorageConnectors",params,undefined,true); 
			copyArgs(msg,"RedirectURL",params,undefined,false); 
			copyArgs(msg,"FeedbackURL",params,undefined,false); 
			copyArgs(msg,"UserSettings",params,undefined,true); 
			copyArgs(msg,"ApplicationSettings",params,undefined,true); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"AccessEndpoints",params,undefined,true); 
			copyArgs(msg,"EmbedHostDomains",params,undefined,true); 
			

			svc.createStack(params,cb);
		}

		
		service.CreateStreamingURL=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"FleetName",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"FleetName",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"ApplicationId",params,undefined,false); 
			copyArgs(n,"Validity",params,undefined,false); 
			copyArgs(n,"SessionContext",params,undefined,false); 
			
			copyArgs(msg,"StackName",params,undefined,false); 
			copyArgs(msg,"FleetName",params,undefined,false); 
			copyArgs(msg,"UserId",params,undefined,false); 
			copyArgs(msg,"ApplicationId",params,undefined,false); 
			copyArgs(msg,"Validity",params,undefined,false); 
			copyArgs(msg,"SessionContext",params,undefined,false); 
			

			svc.createStreamingURL(params,cb);
		}

		
		service.CreateUpdatedImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"existingImageName",params,undefined,false); 
			copyArgs(n,"newImageName",params,undefined,false); 
			
			copyArgs(n,"existingImageName",params,undefined,false); 
			copyArgs(n,"newImageName",params,undefined,false); 
			copyArgs(n,"newImageDescription",params,undefined,false); 
			copyArgs(n,"newImageDisplayName",params,undefined,false); 
			copyArgs(n,"newImageTags",params,undefined,true); 
			copyArgs(n,"dryRun",params,undefined,false); 
			
			copyArgs(msg,"existingImageName",params,undefined,false); 
			copyArgs(msg,"newImageName",params,undefined,false); 
			copyArgs(msg,"newImageDescription",params,undefined,false); 
			copyArgs(msg,"newImageDisplayName",params,undefined,false); 
			copyArgs(msg,"newImageTags",params,undefined,true); 
			copyArgs(msg,"dryRun",params,undefined,false); 
			

			svc.createUpdatedImage(params,cb);
		}

		
		service.CreateUsageReportSubscription=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.createUsageReportSubscription(params,cb);
		}

		
		service.CreateUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,true); 
			copyArgs(n,"AuthenticationType",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,true); 
			copyArgs(n,"MessageAction",params,undefined,false); 
			copyArgs(n,"FirstName",params,undefined,true); 
			copyArgs(n,"LastName",params,undefined,true); 
			copyArgs(n,"AuthenticationType",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,true); 
			copyArgs(msg,"MessageAction",params,undefined,false); 
			copyArgs(msg,"FirstName",params,undefined,true); 
			copyArgs(msg,"LastName",params,undefined,true); 
			copyArgs(msg,"AuthenticationType",params,undefined,false); 
			

			svc.createUser(params,cb);
		}

		
		service.DeleteDirectoryConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryName",params,undefined,false); 
			
			copyArgs(n,"DirectoryName",params,undefined,false); 
			
			copyArgs(msg,"DirectoryName",params,undefined,false); 
			

			svc.deleteDirectoryConfig(params,cb);
		}

		
		service.DeleteFleet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteFleet(params,cb);
		}

		
		service.DeleteImage=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteImage(params,cb);
		}

		
		service.DeleteImageBuilder=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteImageBuilder(params,cb);
		}

		
		service.DeleteImagePermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"SharedAccountId",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"SharedAccountId",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"SharedAccountId",params,undefined,false); 
			

			svc.deleteImagePermissions(params,cb);
		}

		
		service.DeleteStack=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteStack(params,cb);
		}

		
		service.DeleteUsageReportSubscription=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.deleteUsageReportSubscription(params,cb);
		}

		
		service.DeleteUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,true); 
			copyArgs(n,"AuthenticationType",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,true); 
			copyArgs(n,"AuthenticationType",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,true); 
			copyArgs(msg,"AuthenticationType",params,undefined,false); 
			

			svc.deleteUser(params,cb);
		}

		
		service.DescribeDirectoryConfigs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DirectoryNames",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"DirectoryNames",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeDirectoryConfigs(params,cb);
		}

		
		service.DescribeFleets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Names",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Names",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeFleets(params,cb);
		}

		
		service.DescribeImageBuilders=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Names",params,undefined,true); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Names",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeImageBuilders(params,cb);
		}

		
		service.DescribeImagePermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"SharedAwsAccountIds",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"SharedAwsAccountIds",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeImagePermissions(params,cb);
		}

		
		service.DescribeImages=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Names",params,undefined,true); 
			copyArgs(n,"Arns",params,undefined,false); 
			copyArgs(n,"Type",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"Names",params,undefined,true); 
			copyArgs(msg,"Arns",params,undefined,false); 
			copyArgs(msg,"Type",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.describeImages(params,cb);
		}

		
		service.DescribeSessions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"FleetName",params,undefined,false); 
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"FleetName",params,undefined,false); 
			copyArgs(n,"UserId",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"Limit",params,undefined,false); 
			copyArgs(n,"AuthenticationType",params,undefined,false); 
			
			copyArgs(msg,"StackName",params,undefined,false); 
			copyArgs(msg,"FleetName",params,undefined,false); 
			copyArgs(msg,"UserId",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"Limit",params,undefined,false); 
			copyArgs(msg,"AuthenticationType",params,undefined,false); 
			

			svc.describeSessions(params,cb);
		}

		
		service.DescribeStacks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"Names",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"Names",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeStacks(params,cb);
		}

		
		service.DescribeUsageReportSubscriptions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeUsageReportSubscriptions(params,cb);
		}

		
		service.DescribeUserStackAssociations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"UserName",params,undefined,true); 
			copyArgs(n,"AuthenticationType",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"StackName",params,undefined,false); 
			copyArgs(msg,"UserName",params,undefined,true); 
			copyArgs(msg,"AuthenticationType",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeUserStackAssociations(params,cb);
		}

		
		service.DescribeUsers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"AuthenticationType",params,undefined,false); 
			
			copyArgs(n,"AuthenticationType",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"AuthenticationType",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.describeUsers(params,cb);
		}

		
		service.DisableUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,true); 
			copyArgs(n,"AuthenticationType",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,true); 
			copyArgs(n,"AuthenticationType",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,true); 
			copyArgs(msg,"AuthenticationType",params,undefined,false); 
			

			svc.disableUser(params,cb);
		}

		
		service.DisassociateFleet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FleetName",params,undefined,false); 
			copyArgs(n,"StackName",params,undefined,false); 
			
			copyArgs(n,"FleetName",params,undefined,false); 
			copyArgs(n,"StackName",params,undefined,false); 
			
			copyArgs(msg,"FleetName",params,undefined,false); 
			copyArgs(msg,"StackName",params,undefined,false); 
			

			svc.disassociateFleet(params,cb);
		}

		
		service.EnableUser=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"UserName",params,undefined,true); 
			copyArgs(n,"AuthenticationType",params,undefined,false); 
			
			copyArgs(n,"UserName",params,undefined,true); 
			copyArgs(n,"AuthenticationType",params,undefined,false); 
			
			copyArgs(msg,"UserName",params,undefined,true); 
			copyArgs(msg,"AuthenticationType",params,undefined,false); 
			

			svc.enableUser(params,cb);
		}

		
		service.ExpireSession=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SessionId",params,undefined,false); 
			
			copyArgs(n,"SessionId",params,undefined,false); 
			
			copyArgs(msg,"SessionId",params,undefined,false); 
			

			svc.expireSession(params,cb);
		}

		
		service.ListAssociatedFleets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"StackName",params,undefined,false); 
			
			copyArgs(n,"StackName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"StackName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listAssociatedFleets(params,cb);
		}

		
		service.ListAssociatedStacks=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FleetName",params,undefined,false); 
			
			copyArgs(n,"FleetName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"FleetName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listAssociatedStacks(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.StartFleet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.startFleet(params,cb);
		}

		
		service.StartImageBuilder=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"AppstreamAgentVersion",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"AppstreamAgentVersion",params,undefined,false); 
			

			svc.startImageBuilder(params,cb);
		}

		
		service.StopFleet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.stopFleet(params,cb);
		}

		
		service.StopImageBuilder=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.stopImageBuilder(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateDirectoryConfig=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryName",params,undefined,false); 
			
			copyArgs(n,"DirectoryName",params,undefined,false); 
			copyArgs(n,"OrganizationalUnitDistinguishedNames",params,undefined,true); 
			copyArgs(n,"ServiceAccountCredentials",params,undefined,true); 
			
			copyArgs(msg,"DirectoryName",params,undefined,false); 
			copyArgs(msg,"OrganizationalUnitDistinguishedNames",params,undefined,true); 
			copyArgs(msg,"ServiceAccountCredentials",params,undefined,true); 
			

			svc.updateDirectoryConfig(params,cb);
		}

		
		service.UpdateFleet=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"ImageName",params,undefined,false); 
			copyArgs(n,"ImageArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"InstanceType",params,undefined,false); 
			copyArgs(n,"ComputeCapacity",params,undefined,true); 
			copyArgs(n,"VpcConfig",params,undefined,true); 
			copyArgs(n,"MaxUserDurationInSeconds",params,undefined,false); 
			copyArgs(n,"DisconnectTimeoutInSeconds",params,undefined,false); 
			copyArgs(n,"DeleteVpcConfig",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"DisplayName",params,undefined,false); 
			copyArgs(n,"EnableDefaultInternetAccess",params,undefined,false); 
			copyArgs(n,"DomainJoinInfo",params,undefined,true); 
			copyArgs(n,"IdleDisconnectTimeoutInSeconds",params,undefined,false); 
			copyArgs(n,"AttributesToDelete",params,undefined,false); 
			copyArgs(n,"IamRoleArn",params,undefined,false); 
			copyArgs(n,"StreamView",params,undefined,false); 
			
			copyArgs(msg,"ImageName",params,undefined,false); 
			copyArgs(msg,"ImageArn",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"InstanceType",params,undefined,false); 
			copyArgs(msg,"ComputeCapacity",params,undefined,true); 
			copyArgs(msg,"VpcConfig",params,undefined,true); 
			copyArgs(msg,"MaxUserDurationInSeconds",params,undefined,false); 
			copyArgs(msg,"DisconnectTimeoutInSeconds",params,undefined,false); 
			copyArgs(msg,"DeleteVpcConfig",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"DisplayName",params,undefined,false); 
			copyArgs(msg,"EnableDefaultInternetAccess",params,undefined,false); 
			copyArgs(msg,"DomainJoinInfo",params,undefined,true); 
			copyArgs(msg,"IdleDisconnectTimeoutInSeconds",params,undefined,false); 
			copyArgs(msg,"AttributesToDelete",params,undefined,false); 
			copyArgs(msg,"IamRoleArn",params,undefined,false); 
			copyArgs(msg,"StreamView",params,undefined,false); 
			

			svc.updateFleet(params,cb);
		}

		
		service.UpdateImagePermissions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"SharedAccountId",params,undefined,false); 
			copyArgs(n,"ImagePermissions",params,undefined,true); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"SharedAccountId",params,undefined,false); 
			copyArgs(n,"ImagePermissions",params,undefined,true); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"SharedAccountId",params,undefined,false); 
			copyArgs(msg,"ImagePermissions",params,undefined,true); 
			

			svc.updateImagePermissions(params,cb);
		}

		
		service.UpdateStack=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"DisplayName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"StorageConnectors",params,undefined,true); 
			copyArgs(n,"DeleteStorageConnectors",params,undefined,false); 
			copyArgs(n,"RedirectURL",params,undefined,false); 
			copyArgs(n,"FeedbackURL",params,undefined,false); 
			copyArgs(n,"AttributesToDelete",params,undefined,false); 
			copyArgs(n,"UserSettings",params,undefined,true); 
			copyArgs(n,"ApplicationSettings",params,undefined,true); 
			copyArgs(n,"AccessEndpoints",params,undefined,true); 
			copyArgs(n,"EmbedHostDomains",params,undefined,true); 
			
			copyArgs(msg,"DisplayName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"StorageConnectors",params,undefined,true); 
			copyArgs(msg,"DeleteStorageConnectors",params,undefined,false); 
			copyArgs(msg,"RedirectURL",params,undefined,false); 
			copyArgs(msg,"FeedbackURL",params,undefined,false); 
			copyArgs(msg,"AttributesToDelete",params,undefined,false); 
			copyArgs(msg,"UserSettings",params,undefined,true); 
			copyArgs(msg,"ApplicationSettings",params,undefined,true); 
			copyArgs(msg,"AccessEndpoints",params,undefined,true); 
			copyArgs(msg,"EmbedHostDomains",params,undefined,true); 
			

			svc.updateStack(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS AppStream", AmazonAPINode);

};
