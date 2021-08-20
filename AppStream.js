
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

		var awsService = new AWS.AppStream( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.AppStream(msg.AWSConfig) : awsService;

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

		
		service.AssociateFleet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetName",params,undefined,false); 
			copyArg(n,"StackName",params,undefined,false); 
			
			copyArg(msg,"FleetName",params,undefined,false); 
			copyArg(msg,"StackName",params,undefined,false); 
			

			svc.associateFleet(params,cb);
		}

		
		service.BatchAssociateUserStack=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserStackAssociations",params,undefined,true); 
			
			copyArg(msg,"UserStackAssociations",params,undefined,true); 
			

			svc.batchAssociateUserStack(params,cb);
		}

		
		service.BatchDisassociateUserStack=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserStackAssociations",params,undefined,true); 
			
			copyArg(msg,"UserStackAssociations",params,undefined,true); 
			

			svc.batchDisassociateUserStack(params,cb);
		}

		
		service.CopyImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceImageName",params,undefined,false); 
			copyArg(n,"DestinationImageName",params,undefined,false); 
			copyArg(n,"DestinationRegion",params,undefined,false); 
			
			copyArg(msg,"SourceImageName",params,undefined,false); 
			copyArg(msg,"DestinationImageName",params,undefined,false); 
			copyArg(msg,"DestinationRegion",params,undefined,false); 
			copyArg(msg,"DestinationImageDescription",params,undefined,false); 
			

			svc.copyImage(params,cb);
		}

		
		service.CreateDirectoryConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryName",params,undefined,false); 
			copyArg(n,"OrganizationalUnitDistinguishedNames",params,undefined,true); 
			
			copyArg(msg,"DirectoryName",params,undefined,false); 
			copyArg(msg,"OrganizationalUnitDistinguishedNames",params,undefined,true); 
			copyArg(msg,"ServiceAccountCredentials",params,undefined,true); 
			

			svc.createDirectoryConfig(params,cb);
		}

		
		service.CreateFleet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"InstanceType",params,undefined,false); 
			copyArg(n,"ComputeCapacity",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ImageName",params,undefined,false); 
			copyArg(msg,"ImageArn",params,undefined,false); 
			copyArg(msg,"InstanceType",params,undefined,false); 
			copyArg(msg,"FleetType",params,undefined,false); 
			copyArg(msg,"ComputeCapacity",params,undefined,true); 
			copyArg(msg,"VpcConfig",params,undefined,true); 
			copyArg(msg,"MaxUserDurationInSeconds",params,undefined,false); 
			copyArg(msg,"DisconnectTimeoutInSeconds",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DisplayName",params,undefined,false); 
			copyArg(msg,"EnableDefaultInternetAccess",params,undefined,false); 
			copyArg(msg,"DomainJoinInfo",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"IdleDisconnectTimeoutInSeconds",params,undefined,false); 
			copyArg(msg,"IamRoleArn",params,undefined,false); 
			copyArg(msg,"StreamView",params,undefined,false); 
			

			svc.createFleet(params,cb);
		}

		
		service.CreateImageBuilder=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"InstanceType",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"ImageName",params,undefined,false); 
			copyArg(msg,"ImageArn",params,undefined,false); 
			copyArg(msg,"InstanceType",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DisplayName",params,undefined,false); 
			copyArg(msg,"VpcConfig",params,undefined,true); 
			copyArg(msg,"IamRoleArn",params,undefined,false); 
			copyArg(msg,"EnableDefaultInternetAccess",params,undefined,false); 
			copyArg(msg,"DomainJoinInfo",params,undefined,true); 
			copyArg(msg,"AppstreamAgentVersion",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"AccessEndpoints",params,undefined,true); 
			

			svc.createImageBuilder(params,cb);
		}

		
		service.CreateImageBuilderStreamingURL=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Validity",params,undefined,false); 
			

			svc.createImageBuilderStreamingURL(params,cb);
		}

		
		service.CreateStack=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DisplayName",params,undefined,false); 
			copyArg(msg,"StorageConnectors",params,undefined,true); 
			copyArg(msg,"RedirectURL",params,undefined,false); 
			copyArg(msg,"FeedbackURL",params,undefined,false); 
			copyArg(msg,"UserSettings",params,undefined,true); 
			copyArg(msg,"ApplicationSettings",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"AccessEndpoints",params,undefined,true); 
			copyArg(msg,"EmbedHostDomains",params,undefined,true); 
			

			svc.createStack(params,cb);
		}

		
		service.CreateStreamingURL=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackName",params,undefined,false); 
			copyArg(n,"FleetName",params,undefined,false); 
			copyArg(n,"UserId",params,undefined,false); 
			
			copyArg(msg,"StackName",params,undefined,false); 
			copyArg(msg,"FleetName",params,undefined,false); 
			copyArg(msg,"UserId",params,undefined,false); 
			copyArg(msg,"ApplicationId",params,undefined,false); 
			copyArg(msg,"Validity",params,undefined,false); 
			copyArg(msg,"SessionContext",params,undefined,false); 
			

			svc.createStreamingURL(params,cb);
		}

		
		service.CreateUpdatedImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"existingImageName",params,undefined,false); 
			copyArg(n,"newImageName",params,undefined,false); 
			
			copyArg(msg,"existingImageName",params,undefined,false); 
			copyArg(msg,"newImageName",params,undefined,false); 
			copyArg(msg,"newImageDescription",params,undefined,false); 
			copyArg(msg,"newImageDisplayName",params,undefined,false); 
			copyArg(msg,"newImageTags",params,undefined,true); 
			copyArg(msg,"dryRun",params,undefined,false); 
			

			svc.createUpdatedImage(params,cb);
		}

		
		service.CreateUsageReportSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.createUsageReportSubscription(params,cb);
		}

		
		service.CreateUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,true); 
			copyArg(n,"AuthenticationType",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,true); 
			copyArg(msg,"MessageAction",params,undefined,false); 
			copyArg(msg,"FirstName",params,undefined,true); 
			copyArg(msg,"LastName",params,undefined,true); 
			copyArg(msg,"AuthenticationType",params,undefined,false); 
			

			svc.createUser(params,cb);
		}

		
		service.DeleteDirectoryConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryName",params,undefined,false); 
			
			copyArg(msg,"DirectoryName",params,undefined,false); 
			

			svc.deleteDirectoryConfig(params,cb);
		}

		
		service.DeleteFleet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteFleet(params,cb);
		}

		
		service.DeleteImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteImage(params,cb);
		}

		
		service.DeleteImageBuilder=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteImageBuilder(params,cb);
		}

		
		service.DeleteImagePermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"SharedAccountId",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"SharedAccountId",params,undefined,false); 
			

			svc.deleteImagePermissions(params,cb);
		}

		
		service.DeleteStack=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteStack(params,cb);
		}

		
		service.DeleteUsageReportSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.deleteUsageReportSubscription(params,cb);
		}

		
		service.DeleteUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,true); 
			copyArg(n,"AuthenticationType",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,true); 
			copyArg(msg,"AuthenticationType",params,undefined,false); 
			

			svc.deleteUser(params,cb);
		}

		
		service.DescribeDirectoryConfigs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DirectoryNames",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeDirectoryConfigs(params,cb);
		}

		
		service.DescribeFleets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Names",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeFleets(params,cb);
		}

		
		service.DescribeImageBuilders=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Names",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeImageBuilders(params,cb);
		}

		
		service.DescribeImagePermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"SharedAwsAccountIds",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeImagePermissions(params,cb);
		}

		
		service.DescribeImages=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Names",params,undefined,true); 
			copyArg(msg,"Arns",params,undefined,false); 
			copyArg(msg,"Type",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.describeImages(params,cb);
		}

		
		service.DescribeSessions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackName",params,undefined,false); 
			copyArg(n,"FleetName",params,undefined,false); 
			
			copyArg(msg,"StackName",params,undefined,false); 
			copyArg(msg,"FleetName",params,undefined,false); 
			copyArg(msg,"UserId",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"AuthenticationType",params,undefined,false); 
			

			svc.describeSessions(params,cb);
		}

		
		service.DescribeStacks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Names",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeStacks(params,cb);
		}

		
		service.DescribeUsageReportSubscriptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeUsageReportSubscriptions(params,cb);
		}

		
		service.DescribeUserStackAssociations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"StackName",params,undefined,false); 
			copyArg(msg,"UserName",params,undefined,true); 
			copyArg(msg,"AuthenticationType",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeUserStackAssociations(params,cb);
		}

		
		service.DescribeUsers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AuthenticationType",params,undefined,false); 
			
			copyArg(msg,"AuthenticationType",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeUsers(params,cb);
		}

		
		service.DisableUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,true); 
			copyArg(n,"AuthenticationType",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,true); 
			copyArg(msg,"AuthenticationType",params,undefined,false); 
			

			svc.disableUser(params,cb);
		}

		
		service.DisassociateFleet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetName",params,undefined,false); 
			copyArg(n,"StackName",params,undefined,false); 
			
			copyArg(msg,"FleetName",params,undefined,false); 
			copyArg(msg,"StackName",params,undefined,false); 
			

			svc.disassociateFleet(params,cb);
		}

		
		service.EnableUser=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UserName",params,undefined,true); 
			copyArg(n,"AuthenticationType",params,undefined,false); 
			
			copyArg(msg,"UserName",params,undefined,true); 
			copyArg(msg,"AuthenticationType",params,undefined,false); 
			

			svc.enableUser(params,cb);
		}

		
		service.ExpireSession=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SessionId",params,undefined,false); 
			
			copyArg(msg,"SessionId",params,undefined,false); 
			

			svc.expireSession(params,cb);
		}

		
		service.ListAssociatedFleets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StackName",params,undefined,false); 
			
			copyArg(msg,"StackName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listAssociatedFleets(params,cb);
		}

		
		service.ListAssociatedStacks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FleetName",params,undefined,false); 
			
			copyArg(msg,"FleetName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listAssociatedStacks(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.StartFleet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.startFleet(params,cb);
		}

		
		service.StartImageBuilder=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"AppstreamAgentVersion",params,undefined,false); 
			

			svc.startImageBuilder(params,cb);
		}

		
		service.StopFleet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.stopFleet(params,cb);
		}

		
		service.StopImageBuilder=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.stopImageBuilder(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateDirectoryConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryName",params,undefined,false); 
			
			copyArg(msg,"DirectoryName",params,undefined,false); 
			copyArg(msg,"OrganizationalUnitDistinguishedNames",params,undefined,true); 
			copyArg(msg,"ServiceAccountCredentials",params,undefined,true); 
			

			svc.updateDirectoryConfig(params,cb);
		}

		
		service.UpdateFleet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ImageName",params,undefined,false); 
			copyArg(msg,"ImageArn",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"InstanceType",params,undefined,false); 
			copyArg(msg,"ComputeCapacity",params,undefined,true); 
			copyArg(msg,"VpcConfig",params,undefined,true); 
			copyArg(msg,"MaxUserDurationInSeconds",params,undefined,false); 
			copyArg(msg,"DisconnectTimeoutInSeconds",params,undefined,false); 
			copyArg(msg,"DeleteVpcConfig",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"DisplayName",params,undefined,false); 
			copyArg(msg,"EnableDefaultInternetAccess",params,undefined,false); 
			copyArg(msg,"DomainJoinInfo",params,undefined,true); 
			copyArg(msg,"IdleDisconnectTimeoutInSeconds",params,undefined,false); 
			copyArg(msg,"AttributesToDelete",params,undefined,false); 
			copyArg(msg,"IamRoleArn",params,undefined,false); 
			copyArg(msg,"StreamView",params,undefined,false); 
			

			svc.updateFleet(params,cb);
		}

		
		service.UpdateImagePermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"SharedAccountId",params,undefined,false); 
			copyArg(n,"ImagePermissions",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"SharedAccountId",params,undefined,false); 
			copyArg(msg,"ImagePermissions",params,undefined,true); 
			

			svc.updateImagePermissions(params,cb);
		}

		
		service.UpdateStack=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"DisplayName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"StorageConnectors",params,undefined,true); 
			copyArg(msg,"DeleteStorageConnectors",params,undefined,false); 
			copyArg(msg,"RedirectURL",params,undefined,false); 
			copyArg(msg,"FeedbackURL",params,undefined,false); 
			copyArg(msg,"AttributesToDelete",params,undefined,false); 
			copyArg(msg,"UserSettings",params,undefined,true); 
			copyArg(msg,"ApplicationSettings",params,undefined,true); 
			copyArg(msg,"AccessEndpoints",params,undefined,true); 
			copyArg(msg,"EmbedHostDomains",params,undefined,true); 
			

			svc.updateStack(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS AppStream", AmazonAPINode);

};
