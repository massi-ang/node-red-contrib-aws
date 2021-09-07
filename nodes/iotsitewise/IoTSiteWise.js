
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

		var awsService = new AWS.IoTSiteWise( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.IoTSiteWise(msg.AWSConfig) : awsService;

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

		
		service.AssociateAssets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assetId",params,undefined,false); 
			copyArgs(n,"hierarchyId",params,undefined,false); 
			copyArgs(n,"childAssetId",params,undefined,false); 
			
			copyArgs(n,"assetId",params,undefined,false); 
			copyArgs(n,"hierarchyId",params,undefined,false); 
			copyArgs(n,"childAssetId",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"assetId",params,undefined,false); 
			copyArgs(msg,"hierarchyId",params,undefined,false); 
			copyArgs(msg,"childAssetId",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.associateAssets(params,cb);
		}

		
		service.BatchAssociateProjectAssets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectId",params,undefined,false); 
			copyArgs(n,"assetIds",params,undefined,true); 
			
			copyArgs(n,"projectId",params,undefined,false); 
			copyArgs(n,"assetIds",params,undefined,true); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"projectId",params,undefined,false); 
			copyArgs(msg,"assetIds",params,undefined,true); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.batchAssociateProjectAssets(params,cb);
		}

		
		service.BatchDisassociateProjectAssets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectId",params,undefined,false); 
			copyArgs(n,"assetIds",params,undefined,true); 
			
			copyArgs(n,"projectId",params,undefined,false); 
			copyArgs(n,"assetIds",params,undefined,true); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"projectId",params,undefined,false); 
			copyArgs(msg,"assetIds",params,undefined,true); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.batchDisassociateProjectAssets(params,cb);
		}

		
		service.BatchPutAssetPropertyValue=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"entries",params,undefined,false); 
			
			copyArgs(n,"entries",params,undefined,false); 
			
			copyArgs(msg,"entries",params,undefined,false); 
			

			svc.batchPutAssetPropertyValue(params,cb);
		}

		
		service.CreateAccessPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accessPolicyIdentity",params,undefined,true); 
			copyArgs(n,"accessPolicyResource",params,undefined,true); 
			copyArgs(n,"accessPolicyPermission",params,undefined,false); 
			
			copyArgs(n,"accessPolicyIdentity",params,undefined,true); 
			copyArgs(n,"accessPolicyResource",params,undefined,true); 
			copyArgs(n,"accessPolicyPermission",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"accessPolicyIdentity",params,undefined,true); 
			copyArgs(msg,"accessPolicyResource",params,undefined,true); 
			copyArgs(msg,"accessPolicyPermission",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createAccessPolicy(params,cb);
		}

		
		service.CreateAsset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assetName",params,undefined,false); 
			copyArgs(n,"assetModelId",params,undefined,false); 
			
			copyArgs(n,"assetName",params,undefined,false); 
			copyArgs(n,"assetModelId",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"assetName",params,undefined,false); 
			copyArgs(msg,"assetModelId",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createAsset(params,cb);
		}

		
		service.CreateAssetModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assetModelName",params,undefined,false); 
			
			copyArgs(n,"assetModelName",params,undefined,false); 
			copyArgs(n,"assetModelDescription",params,undefined,false); 
			copyArgs(n,"assetModelProperties",params,undefined,true); 
			copyArgs(n,"assetModelHierarchies",params,undefined,false); 
			copyArgs(n,"assetModelCompositeModels",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"assetModelName",params,undefined,false); 
			copyArgs(msg,"assetModelDescription",params,undefined,false); 
			copyArgs(msg,"assetModelProperties",params,undefined,true); 
			copyArgs(msg,"assetModelHierarchies",params,undefined,false); 
			copyArgs(msg,"assetModelCompositeModels",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createAssetModel(params,cb);
		}

		
		service.CreateDashboard=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectId",params,undefined,false); 
			copyArgs(n,"dashboardName",params,undefined,false); 
			copyArgs(n,"dashboardDefinition",params,undefined,false); 
			
			copyArgs(n,"projectId",params,undefined,false); 
			copyArgs(n,"dashboardName",params,undefined,false); 
			copyArgs(n,"dashboardDescription",params,undefined,false); 
			copyArgs(n,"dashboardDefinition",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"projectId",params,undefined,false); 
			copyArgs(msg,"dashboardName",params,undefined,false); 
			copyArgs(msg,"dashboardDescription",params,undefined,false); 
			copyArgs(msg,"dashboardDefinition",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createDashboard(params,cb);
		}

		
		service.CreateGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"gatewayName",params,undefined,false); 
			copyArgs(n,"gatewayPlatform",params,undefined,true); 
			
			copyArgs(n,"gatewayName",params,undefined,false); 
			copyArgs(n,"gatewayPlatform",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"gatewayName",params,undefined,false); 
			copyArgs(msg,"gatewayPlatform",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createGateway(params,cb);
		}

		
		service.CreatePortal=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"portalName",params,undefined,false); 
			copyArgs(n,"portalContactEmail",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			
			copyArgs(n,"portalName",params,undefined,false); 
			copyArgs(n,"portalDescription",params,undefined,false); 
			copyArgs(n,"portalContactEmail",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"portalLogoImageFile",params,undefined,true); 
			copyArgs(n,"roleArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"portalAuthMode",params,undefined,false); 
			copyArgs(n,"notificationSenderEmail",params,undefined,false); 
			copyArgs(n,"alarms",params,undefined,true); 
			
			copyArgs(msg,"portalName",params,undefined,false); 
			copyArgs(msg,"portalDescription",params,undefined,false); 
			copyArgs(msg,"portalContactEmail",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"portalLogoImageFile",params,undefined,true); 
			copyArgs(msg,"roleArn",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"portalAuthMode",params,undefined,false); 
			copyArgs(msg,"notificationSenderEmail",params,undefined,false); 
			copyArgs(msg,"alarms",params,undefined,true); 
			

			svc.createPortal(params,cb);
		}

		
		service.CreateProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"portalId",params,undefined,false); 
			copyArgs(n,"projectName",params,undefined,false); 
			
			copyArgs(n,"portalId",params,undefined,false); 
			copyArgs(n,"projectName",params,undefined,false); 
			copyArgs(n,"projectDescription",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"portalId",params,undefined,false); 
			copyArgs(msg,"projectName",params,undefined,false); 
			copyArgs(msg,"projectDescription",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createProject(params,cb);
		}

		
		service.DeleteAccessPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accessPolicyId",params,undefined,false); 
			
			copyArgs(n,"accessPolicyId",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"accessPolicyId",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.deleteAccessPolicy(params,cb);
		}

		
		service.DeleteAsset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assetId",params,undefined,false); 
			
			copyArgs(n,"assetId",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"assetId",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.deleteAsset(params,cb);
		}

		
		service.DeleteAssetModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assetModelId",params,undefined,false); 
			
			copyArgs(n,"assetModelId",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"assetModelId",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.deleteAssetModel(params,cb);
		}

		
		service.DeleteDashboard=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"dashboardId",params,undefined,false); 
			
			copyArgs(n,"dashboardId",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"dashboardId",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.deleteDashboard(params,cb);
		}

		
		service.DeleteGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"gatewayId",params,undefined,false); 
			
			copyArgs(n,"gatewayId",params,undefined,false); 
			
			copyArgs(msg,"gatewayId",params,undefined,false); 
			

			svc.deleteGateway(params,cb);
		}

		
		service.DeletePortal=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"portalId",params,undefined,false); 
			
			copyArgs(n,"portalId",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"portalId",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.deletePortal(params,cb);
		}

		
		service.DeleteProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectId",params,undefined,false); 
			
			copyArgs(n,"projectId",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"projectId",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.deleteProject(params,cb);
		}

		
		service.DescribeAccessPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accessPolicyId",params,undefined,false); 
			
			copyArgs(n,"accessPolicyId",params,undefined,false); 
			
			copyArgs(msg,"accessPolicyId",params,undefined,false); 
			

			svc.describeAccessPolicy(params,cb);
		}

		
		service.DescribeAsset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assetId",params,undefined,false); 
			
			copyArgs(n,"assetId",params,undefined,false); 
			
			copyArgs(msg,"assetId",params,undefined,false); 
			

			svc.describeAsset(params,cb);
		}

		
		service.DescribeAssetModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assetModelId",params,undefined,false); 
			
			copyArgs(n,"assetModelId",params,undefined,false); 
			
			copyArgs(msg,"assetModelId",params,undefined,false); 
			

			svc.describeAssetModel(params,cb);
		}

		
		service.DescribeAssetProperty=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assetId",params,undefined,false); 
			copyArgs(n,"propertyId",params,undefined,false); 
			
			copyArgs(n,"assetId",params,undefined,false); 
			copyArgs(n,"propertyId",params,undefined,false); 
			
			copyArgs(msg,"assetId",params,undefined,false); 
			copyArgs(msg,"propertyId",params,undefined,false); 
			

			svc.describeAssetProperty(params,cb);
		}

		
		service.DescribeDashboard=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"dashboardId",params,undefined,false); 
			
			copyArgs(n,"dashboardId",params,undefined,false); 
			
			copyArgs(msg,"dashboardId",params,undefined,false); 
			

			svc.describeDashboard(params,cb);
		}

		
		service.DescribeDefaultEncryptionConfiguration=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeDefaultEncryptionConfiguration(params,cb);
		}

		
		service.DescribeGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"gatewayId",params,undefined,false); 
			
			copyArgs(n,"gatewayId",params,undefined,false); 
			
			copyArgs(msg,"gatewayId",params,undefined,false); 
			

			svc.describeGateway(params,cb);
		}

		
		service.DescribeGatewayCapabilityConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"gatewayId",params,undefined,false); 
			copyArgs(n,"capabilityNamespace",params,undefined,false); 
			
			copyArgs(n,"gatewayId",params,undefined,false); 
			copyArgs(n,"capabilityNamespace",params,undefined,false); 
			
			copyArgs(msg,"gatewayId",params,undefined,false); 
			copyArgs(msg,"capabilityNamespace",params,undefined,false); 
			

			svc.describeGatewayCapabilityConfiguration(params,cb);
		}

		
		service.DescribeLoggingOptions=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeLoggingOptions(params,cb);
		}

		
		service.DescribePortal=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"portalId",params,undefined,false); 
			
			copyArgs(n,"portalId",params,undefined,false); 
			
			copyArgs(msg,"portalId",params,undefined,false); 
			

			svc.describePortal(params,cb);
		}

		
		service.DescribeProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectId",params,undefined,false); 
			
			copyArgs(n,"projectId",params,undefined,false); 
			
			copyArgs(msg,"projectId",params,undefined,false); 
			

			svc.describeProject(params,cb);
		}

		
		service.DescribeStorageConfiguration=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeStorageConfiguration(params,cb);
		}

		
		service.DisassociateAssets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assetId",params,undefined,false); 
			copyArgs(n,"hierarchyId",params,undefined,false); 
			copyArgs(n,"childAssetId",params,undefined,false); 
			
			copyArgs(n,"assetId",params,undefined,false); 
			copyArgs(n,"hierarchyId",params,undefined,false); 
			copyArgs(n,"childAssetId",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"assetId",params,undefined,false); 
			copyArgs(msg,"hierarchyId",params,undefined,false); 
			copyArgs(msg,"childAssetId",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.disassociateAssets(params,cb);
		}

		
		service.GetAssetPropertyAggregates=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"aggregateTypes",params,undefined,false); 
			copyArgs(n,"resolution",params,undefined,false); 
			copyArgs(n,"startDate",params,undefined,false); 
			copyArgs(n,"endDate",params,undefined,false); 
			
			copyArgs(n,"assetId",params,undefined,false); 
			copyArgs(n,"propertyId",params,undefined,false); 
			copyArgs(n,"propertyAlias",params,undefined,false); 
			copyArgs(n,"aggregateTypes",params,undefined,false); 
			copyArgs(n,"resolution",params,undefined,false); 
			copyArgs(n,"qualities",params,undefined,true); 
			copyArgs(n,"startDate",params,undefined,false); 
			copyArgs(n,"endDate",params,undefined,false); 
			copyArgs(n,"timeOrdering",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"assetId",params,undefined,false); 
			copyArgs(msg,"propertyId",params,undefined,false); 
			copyArgs(msg,"propertyAlias",params,undefined,false); 
			copyArgs(msg,"aggregateTypes",params,undefined,false); 
			copyArgs(msg,"resolution",params,undefined,false); 
			copyArgs(msg,"qualities",params,undefined,true); 
			copyArgs(msg,"startDate",params,undefined,false); 
			copyArgs(msg,"endDate",params,undefined,false); 
			copyArgs(msg,"timeOrdering",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getAssetPropertyAggregates(params,cb);
		}

		
		service.GetAssetPropertyValue=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"assetId",params,undefined,false); 
			copyArgs(n,"propertyId",params,undefined,false); 
			copyArgs(n,"propertyAlias",params,undefined,false); 
			
			copyArgs(msg,"assetId",params,undefined,false); 
			copyArgs(msg,"propertyId",params,undefined,false); 
			copyArgs(msg,"propertyAlias",params,undefined,false); 
			

			svc.getAssetPropertyValue(params,cb);
		}

		
		service.GetAssetPropertyValueHistory=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"assetId",params,undefined,false); 
			copyArgs(n,"propertyId",params,undefined,false); 
			copyArgs(n,"propertyAlias",params,undefined,false); 
			copyArgs(n,"startDate",params,undefined,false); 
			copyArgs(n,"endDate",params,undefined,false); 
			copyArgs(n,"qualities",params,undefined,true); 
			copyArgs(n,"timeOrdering",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"assetId",params,undefined,false); 
			copyArgs(msg,"propertyId",params,undefined,false); 
			copyArgs(msg,"propertyAlias",params,undefined,false); 
			copyArgs(msg,"startDate",params,undefined,false); 
			copyArgs(msg,"endDate",params,undefined,false); 
			copyArgs(msg,"qualities",params,undefined,true); 
			copyArgs(msg,"timeOrdering",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.getAssetPropertyValueHistory(params,cb);
		}

		
		service.GetInterpolatedAssetPropertyValues=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"startTimeInSeconds",params,undefined,false); 
			copyArgs(n,"endTimeInSeconds",params,undefined,false); 
			copyArgs(n,"quality",params,undefined,false); 
			copyArgs(n,"intervalInSeconds",params,undefined,false); 
			copyArgs(n,"_type",params,"type",false); 
			
			copyArgs(n,"assetId",params,undefined,false); 
			copyArgs(n,"propertyId",params,undefined,false); 
			copyArgs(n,"propertyAlias",params,undefined,false); 
			copyArgs(n,"startTimeInSeconds",params,undefined,false); 
			copyArgs(n,"startTimeOffsetInNanos",params,undefined,false); 
			copyArgs(n,"endTimeInSeconds",params,undefined,false); 
			copyArgs(n,"endTimeOffsetInNanos",params,undefined,false); 
			copyArgs(n,"quality",params,undefined,false); 
			copyArgs(n,"intervalInSeconds",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"type",params,undefined,false); 
			copyArgs(n,"intervalWindowInSeconds",params,undefined,false); 
			
			copyArgs(msg,"assetId",params,undefined,false); 
			copyArgs(msg,"propertyId",params,undefined,false); 
			copyArgs(msg,"propertyAlias",params,undefined,false); 
			copyArgs(msg,"startTimeInSeconds",params,undefined,false); 
			copyArgs(msg,"startTimeOffsetInNanos",params,undefined,false); 
			copyArgs(msg,"endTimeInSeconds",params,undefined,false); 
			copyArgs(msg,"endTimeOffsetInNanos",params,undefined,false); 
			copyArgs(msg,"quality",params,undefined,false); 
			copyArgs(msg,"intervalInSeconds",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"type",params,undefined,false); 
			copyArgs(msg,"intervalWindowInSeconds",params,undefined,false); 
			

			svc.getInterpolatedAssetPropertyValues(params,cb);
		}

		
		service.ListAccessPolicies=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"identityType",params,undefined,false); 
			copyArgs(n,"identityId",params,undefined,false); 
			copyArgs(n,"resourceType",params,undefined,false); 
			copyArgs(n,"resourceId",params,undefined,false); 
			copyArgs(n,"iamArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"identityType",params,undefined,false); 
			copyArgs(msg,"identityId",params,undefined,false); 
			copyArgs(msg,"resourceType",params,undefined,false); 
			copyArgs(msg,"resourceId",params,undefined,false); 
			copyArgs(msg,"iamArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listAccessPolicies(params,cb);
		}

		
		service.ListAssetModels=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listAssetModels(params,cb);
		}

		
		service.ListAssetRelationships=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assetId",params,undefined,false); 
			copyArgs(n,"traversalType",params,undefined,false); 
			
			copyArgs(n,"assetId",params,undefined,false); 
			copyArgs(n,"traversalType",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"assetId",params,undefined,false); 
			copyArgs(msg,"traversalType",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listAssetRelationships(params,cb);
		}

		
		service.ListAssets=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			copyArgs(n,"assetModelId",params,undefined,false); 
			copyArgs(n,"filter",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"assetModelId",params,undefined,false); 
			copyArgs(msg,"filter",params,undefined,false); 
			

			svc.listAssets(params,cb);
		}

		
		service.ListAssociatedAssets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assetId",params,undefined,false); 
			
			copyArgs(n,"assetId",params,undefined,false); 
			copyArgs(n,"hierarchyId",params,undefined,false); 
			copyArgs(n,"traversalDirection",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"assetId",params,undefined,false); 
			copyArgs(msg,"hierarchyId",params,undefined,false); 
			copyArgs(msg,"traversalDirection",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listAssociatedAssets(params,cb);
		}

		
		service.ListDashboards=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectId",params,undefined,false); 
			
			copyArgs(n,"projectId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"projectId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listDashboards(params,cb);
		}

		
		service.ListGateways=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listGateways(params,cb);
		}

		
		service.ListPortals=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listPortals(params,cb);
		}

		
		service.ListProjectAssets=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectId",params,undefined,false); 
			
			copyArgs(n,"projectId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"projectId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listProjectAssets(params,cb);
		}

		
		service.ListProjects=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"portalId",params,undefined,false); 
			
			copyArgs(n,"portalId",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"maxResults",params,undefined,false); 
			
			copyArgs(msg,"portalId",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listProjects(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutDefaultEncryptionConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"encryptionType",params,undefined,false); 
			
			copyArgs(n,"encryptionType",params,undefined,false); 
			copyArgs(n,"kmsKeyId",params,undefined,false); 
			
			copyArgs(msg,"encryptionType",params,undefined,false); 
			copyArgs(msg,"kmsKeyId",params,undefined,false); 
			

			svc.putDefaultEncryptionConfiguration(params,cb);
		}

		
		service.PutLoggingOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"loggingOptions",params,undefined,true); 
			
			copyArgs(n,"loggingOptions",params,undefined,true); 
			
			copyArgs(msg,"loggingOptions",params,undefined,true); 
			

			svc.putLoggingOptions(params,cb);
		}

		
		service.PutStorageConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"storageType",params,undefined,false); 
			
			copyArgs(n,"storageType",params,undefined,false); 
			copyArgs(n,"multiLayerStorage",params,undefined,true); 
			
			copyArgs(msg,"storageType",params,undefined,false); 
			copyArgs(msg,"multiLayerStorage",params,undefined,true); 
			

			svc.putStorageConfiguration(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"tagKeys",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateAccessPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"accessPolicyId",params,undefined,false); 
			copyArgs(n,"accessPolicyIdentity",params,undefined,true); 
			copyArgs(n,"accessPolicyResource",params,undefined,true); 
			copyArgs(n,"accessPolicyPermission",params,undefined,false); 
			
			copyArgs(n,"accessPolicyId",params,undefined,false); 
			copyArgs(n,"accessPolicyIdentity",params,undefined,true); 
			copyArgs(n,"accessPolicyResource",params,undefined,true); 
			copyArgs(n,"accessPolicyPermission",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"accessPolicyId",params,undefined,false); 
			copyArgs(msg,"accessPolicyIdentity",params,undefined,true); 
			copyArgs(msg,"accessPolicyResource",params,undefined,true); 
			copyArgs(msg,"accessPolicyPermission",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.updateAccessPolicy(params,cb);
		}

		
		service.UpdateAsset=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assetId",params,undefined,false); 
			copyArgs(n,"assetName",params,undefined,false); 
			
			copyArgs(n,"assetId",params,undefined,false); 
			copyArgs(n,"assetName",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"assetId",params,undefined,false); 
			copyArgs(msg,"assetName",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.updateAsset(params,cb);
		}

		
		service.UpdateAssetModel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assetModelId",params,undefined,false); 
			copyArgs(n,"assetModelName",params,undefined,false); 
			
			copyArgs(n,"assetModelId",params,undefined,false); 
			copyArgs(n,"assetModelName",params,undefined,false); 
			copyArgs(n,"assetModelDescription",params,undefined,false); 
			copyArgs(n,"assetModelProperties",params,undefined,true); 
			copyArgs(n,"assetModelHierarchies",params,undefined,true); 
			copyArgs(n,"assetModelCompositeModels",params,undefined,true); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"assetModelId",params,undefined,false); 
			copyArgs(msg,"assetModelName",params,undefined,false); 
			copyArgs(msg,"assetModelDescription",params,undefined,false); 
			copyArgs(msg,"assetModelProperties",params,undefined,true); 
			copyArgs(msg,"assetModelHierarchies",params,undefined,true); 
			copyArgs(msg,"assetModelCompositeModels",params,undefined,true); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.updateAssetModel(params,cb);
		}

		
		service.UpdateAssetProperty=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"assetId",params,undefined,false); 
			copyArgs(n,"propertyId",params,undefined,false); 
			
			copyArgs(n,"assetId",params,undefined,false); 
			copyArgs(n,"propertyId",params,undefined,false); 
			copyArgs(n,"propertyAlias",params,undefined,false); 
			copyArgs(n,"propertyNotificationState",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"assetId",params,undefined,false); 
			copyArgs(msg,"propertyId",params,undefined,false); 
			copyArgs(msg,"propertyAlias",params,undefined,false); 
			copyArgs(msg,"propertyNotificationState",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.updateAssetProperty(params,cb);
		}

		
		service.UpdateDashboard=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"dashboardId",params,undefined,false); 
			copyArgs(n,"dashboardName",params,undefined,false); 
			copyArgs(n,"dashboardDefinition",params,undefined,false); 
			
			copyArgs(n,"dashboardId",params,undefined,false); 
			copyArgs(n,"dashboardName",params,undefined,false); 
			copyArgs(n,"dashboardDescription",params,undefined,false); 
			copyArgs(n,"dashboardDefinition",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"dashboardId",params,undefined,false); 
			copyArgs(msg,"dashboardName",params,undefined,false); 
			copyArgs(msg,"dashboardDescription",params,undefined,false); 
			copyArgs(msg,"dashboardDefinition",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.updateDashboard(params,cb);
		}

		
		service.UpdateGateway=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"gatewayId",params,undefined,false); 
			copyArgs(n,"gatewayName",params,undefined,false); 
			
			copyArgs(n,"gatewayId",params,undefined,false); 
			copyArgs(n,"gatewayName",params,undefined,false); 
			
			copyArgs(msg,"gatewayId",params,undefined,false); 
			copyArgs(msg,"gatewayName",params,undefined,false); 
			

			svc.updateGateway(params,cb);
		}

		
		service.UpdateGatewayCapabilityConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"gatewayId",params,undefined,false); 
			copyArgs(n,"capabilityNamespace",params,undefined,false); 
			copyArgs(n,"capabilityConfiguration",params,undefined,false); 
			
			copyArgs(n,"gatewayId",params,undefined,false); 
			copyArgs(n,"capabilityNamespace",params,undefined,false); 
			copyArgs(n,"capabilityConfiguration",params,undefined,false); 
			
			copyArgs(msg,"gatewayId",params,undefined,false); 
			copyArgs(msg,"capabilityNamespace",params,undefined,false); 
			copyArgs(msg,"capabilityConfiguration",params,undefined,false); 
			

			svc.updateGatewayCapabilityConfiguration(params,cb);
		}

		
		service.UpdatePortal=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"portalId",params,undefined,false); 
			copyArgs(n,"portalName",params,undefined,false); 
			copyArgs(n,"portalContactEmail",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			
			copyArgs(n,"portalId",params,undefined,false); 
			copyArgs(n,"portalName",params,undefined,false); 
			copyArgs(n,"portalDescription",params,undefined,false); 
			copyArgs(n,"portalContactEmail",params,undefined,false); 
			copyArgs(n,"portalLogoImage",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			copyArgs(n,"notificationSenderEmail",params,undefined,false); 
			copyArgs(n,"alarms",params,undefined,true); 
			
			copyArgs(msg,"portalId",params,undefined,false); 
			copyArgs(msg,"portalName",params,undefined,false); 
			copyArgs(msg,"portalDescription",params,undefined,false); 
			copyArgs(msg,"portalContactEmail",params,undefined,false); 
			copyArgs(msg,"portalLogoImage",params,undefined,false); 
			copyArgs(msg,"roleArn",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			copyArgs(msg,"notificationSenderEmail",params,undefined,false); 
			copyArgs(msg,"alarms",params,undefined,true); 
			

			svc.updatePortal(params,cb);
		}

		
		service.UpdateProject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"projectId",params,undefined,false); 
			copyArgs(n,"projectName",params,undefined,false); 
			
			copyArgs(n,"projectId",params,undefined,false); 
			copyArgs(n,"projectName",params,undefined,false); 
			copyArgs(n,"projectDescription",params,undefined,false); 
			copyArgs(n,"clientToken",params,undefined,false); 
			
			copyArgs(msg,"projectId",params,undefined,false); 
			copyArgs(msg,"projectName",params,undefined,false); 
			copyArgs(msg,"projectDescription",params,undefined,false); 
			copyArgs(msg,"clientToken",params,undefined,false); 
			

			svc.updateProject(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS IoTSiteWise", AmazonAPINode);

};
