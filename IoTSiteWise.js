
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

		var awsService = new AWS.IoTSiteWise( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.IoTSiteWise(msg.AWSConfig) : awsService;

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

		
		service.AssociateAssets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assetId",params,undefined,false); 
			copyArg(n,"hierarchyId",params,undefined,false); 
			copyArg(n,"childAssetId",params,undefined,false); 
			
			copyArg(msg,"assetId",params,undefined,false); 
			copyArg(msg,"hierarchyId",params,undefined,false); 
			copyArg(msg,"childAssetId",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.associateAssets(params,cb);
		}

		
		service.BatchAssociateProjectAssets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"projectId",params,undefined,false); 
			copyArg(n,"assetIds",params,undefined,true); 
			
			copyArg(msg,"projectId",params,undefined,false); 
			copyArg(msg,"assetIds",params,undefined,true); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.batchAssociateProjectAssets(params,cb);
		}

		
		service.BatchDisassociateProjectAssets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"projectId",params,undefined,false); 
			copyArg(n,"assetIds",params,undefined,true); 
			
			copyArg(msg,"projectId",params,undefined,false); 
			copyArg(msg,"assetIds",params,undefined,true); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.batchDisassociateProjectAssets(params,cb);
		}

		
		service.BatchPutAssetPropertyValue=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"entries",params,undefined,false); 
			
			copyArg(msg,"entries",params,undefined,false); 
			

			svc.batchPutAssetPropertyValue(params,cb);
		}

		
		service.CreateAccessPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"accessPolicyIdentity",params,undefined,true); 
			copyArg(n,"accessPolicyResource",params,undefined,true); 
			copyArg(n,"accessPolicyPermission",params,undefined,false); 
			
			copyArg(msg,"accessPolicyIdentity",params,undefined,true); 
			copyArg(msg,"accessPolicyResource",params,undefined,true); 
			copyArg(msg,"accessPolicyPermission",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createAccessPolicy(params,cb);
		}

		
		service.CreateAsset=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assetName",params,undefined,false); 
			copyArg(n,"assetModelId",params,undefined,false); 
			
			copyArg(msg,"assetName",params,undefined,false); 
			copyArg(msg,"assetModelId",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createAsset(params,cb);
		}

		
		service.CreateAssetModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assetModelName",params,undefined,false); 
			
			copyArg(msg,"assetModelName",params,undefined,false); 
			copyArg(msg,"assetModelDescription",params,undefined,false); 
			copyArg(msg,"assetModelProperties",params,undefined,true); 
			copyArg(msg,"assetModelHierarchies",params,undefined,false); 
			copyArg(msg,"assetModelCompositeModels",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createAssetModel(params,cb);
		}

		
		service.CreateDashboard=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"projectId",params,undefined,false); 
			copyArg(n,"dashboardName",params,undefined,false); 
			copyArg(n,"dashboardDefinition",params,undefined,false); 
			
			copyArg(msg,"projectId",params,undefined,false); 
			copyArg(msg,"dashboardName",params,undefined,false); 
			copyArg(msg,"dashboardDescription",params,undefined,false); 
			copyArg(msg,"dashboardDefinition",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createDashboard(params,cb);
		}

		
		service.CreateGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"gatewayName",params,undefined,false); 
			copyArg(n,"gatewayPlatform",params,undefined,true); 
			
			copyArg(msg,"gatewayName",params,undefined,false); 
			copyArg(msg,"gatewayPlatform",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createGateway(params,cb);
		}

		
		service.CreatePortal=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"portalName",params,undefined,false); 
			copyArg(n,"portalContactEmail",params,undefined,false); 
			copyArg(n,"roleArn",params,undefined,false); 
			
			copyArg(msg,"portalName",params,undefined,false); 
			copyArg(msg,"portalDescription",params,undefined,false); 
			copyArg(msg,"portalContactEmail",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"portalLogoImageFile",params,undefined,true); 
			copyArg(msg,"roleArn",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"portalAuthMode",params,undefined,false); 
			copyArg(msg,"notificationSenderEmail",params,undefined,false); 
			copyArg(msg,"alarms",params,undefined,true); 
			

			svc.createPortal(params,cb);
		}

		
		service.CreateProject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"portalId",params,undefined,false); 
			copyArg(n,"projectName",params,undefined,false); 
			
			copyArg(msg,"portalId",params,undefined,false); 
			copyArg(msg,"projectName",params,undefined,false); 
			copyArg(msg,"projectDescription",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createProject(params,cb);
		}

		
		service.DeleteAccessPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"accessPolicyId",params,undefined,false); 
			
			copyArg(msg,"accessPolicyId",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.deleteAccessPolicy(params,cb);
		}

		
		service.DeleteAsset=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assetId",params,undefined,false); 
			
			copyArg(msg,"assetId",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.deleteAsset(params,cb);
		}

		
		service.DeleteAssetModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assetModelId",params,undefined,false); 
			
			copyArg(msg,"assetModelId",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.deleteAssetModel(params,cb);
		}

		
		service.DeleteDashboard=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"dashboardId",params,undefined,false); 
			
			copyArg(msg,"dashboardId",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.deleteDashboard(params,cb);
		}

		
		service.DeleteGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"gatewayId",params,undefined,false); 
			
			copyArg(msg,"gatewayId",params,undefined,false); 
			

			svc.deleteGateway(params,cb);
		}

		
		service.DeletePortal=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"portalId",params,undefined,false); 
			
			copyArg(msg,"portalId",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.deletePortal(params,cb);
		}

		
		service.DeleteProject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"projectId",params,undefined,false); 
			
			copyArg(msg,"projectId",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.deleteProject(params,cb);
		}

		
		service.DescribeAccessPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"accessPolicyId",params,undefined,false); 
			
			copyArg(msg,"accessPolicyId",params,undefined,false); 
			

			svc.describeAccessPolicy(params,cb);
		}

		
		service.DescribeAsset=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assetId",params,undefined,false); 
			
			copyArg(msg,"assetId",params,undefined,false); 
			

			svc.describeAsset(params,cb);
		}

		
		service.DescribeAssetModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assetModelId",params,undefined,false); 
			
			copyArg(msg,"assetModelId",params,undefined,false); 
			

			svc.describeAssetModel(params,cb);
		}

		
		service.DescribeAssetProperty=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assetId",params,undefined,false); 
			copyArg(n,"propertyId",params,undefined,false); 
			
			copyArg(msg,"assetId",params,undefined,false); 
			copyArg(msg,"propertyId",params,undefined,false); 
			

			svc.describeAssetProperty(params,cb);
		}

		
		service.DescribeDashboard=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"dashboardId",params,undefined,false); 
			
			copyArg(msg,"dashboardId",params,undefined,false); 
			

			svc.describeDashboard(params,cb);
		}

		
		service.DescribeDefaultEncryptionConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeDefaultEncryptionConfiguration(params,cb);
		}

		
		service.DescribeGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"gatewayId",params,undefined,false); 
			
			copyArg(msg,"gatewayId",params,undefined,false); 
			

			svc.describeGateway(params,cb);
		}

		
		service.DescribeGatewayCapabilityConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"gatewayId",params,undefined,false); 
			copyArg(n,"capabilityNamespace",params,undefined,false); 
			
			copyArg(msg,"gatewayId",params,undefined,false); 
			copyArg(msg,"capabilityNamespace",params,undefined,false); 
			

			svc.describeGatewayCapabilityConfiguration(params,cb);
		}

		
		service.DescribeLoggingOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeLoggingOptions(params,cb);
		}

		
		service.DescribePortal=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"portalId",params,undefined,false); 
			
			copyArg(msg,"portalId",params,undefined,false); 
			

			svc.describePortal(params,cb);
		}

		
		service.DescribeProject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"projectId",params,undefined,false); 
			
			copyArg(msg,"projectId",params,undefined,false); 
			

			svc.describeProject(params,cb);
		}

		
		service.DescribeStorageConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeStorageConfiguration(params,cb);
		}

		
		service.DisassociateAssets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assetId",params,undefined,false); 
			copyArg(n,"hierarchyId",params,undefined,false); 
			copyArg(n,"childAssetId",params,undefined,false); 
			
			copyArg(msg,"assetId",params,undefined,false); 
			copyArg(msg,"hierarchyId",params,undefined,false); 
			copyArg(msg,"childAssetId",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.disassociateAssets(params,cb);
		}

		
		service.GetAssetPropertyAggregates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"aggregateTypes",params,undefined,false); 
			copyArg(n,"resolution",params,undefined,false); 
			copyArg(n,"startDate",params,undefined,false); 
			copyArg(n,"endDate",params,undefined,false); 
			
			copyArg(msg,"assetId",params,undefined,false); 
			copyArg(msg,"propertyId",params,undefined,false); 
			copyArg(msg,"propertyAlias",params,undefined,false); 
			copyArg(msg,"aggregateTypes",params,undefined,false); 
			copyArg(msg,"resolution",params,undefined,false); 
			copyArg(msg,"qualities",params,undefined,true); 
			copyArg(msg,"startDate",params,undefined,false); 
			copyArg(msg,"endDate",params,undefined,false); 
			copyArg(msg,"timeOrdering",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.getAssetPropertyAggregates(params,cb);
		}

		
		service.GetAssetPropertyValue=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"assetId",params,undefined,false); 
			copyArg(msg,"propertyId",params,undefined,false); 
			copyArg(msg,"propertyAlias",params,undefined,false); 
			

			svc.getAssetPropertyValue(params,cb);
		}

		
		service.GetAssetPropertyValueHistory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"assetId",params,undefined,false); 
			copyArg(msg,"propertyId",params,undefined,false); 
			copyArg(msg,"propertyAlias",params,undefined,false); 
			copyArg(msg,"startDate",params,undefined,false); 
			copyArg(msg,"endDate",params,undefined,false); 
			copyArg(msg,"qualities",params,undefined,true); 
			copyArg(msg,"timeOrdering",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.getAssetPropertyValueHistory(params,cb);
		}

		
		service.GetInterpolatedAssetPropertyValues=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"startTimeInSeconds",params,undefined,false); 
			copyArg(n,"endTimeInSeconds",params,undefined,false); 
			copyArg(n,"quality",params,undefined,false); 
			copyArg(n,"intervalInSeconds",params,undefined,false); 
			copyArg(n,"_type",params,"type",false); 
			
			copyArg(msg,"assetId",params,undefined,false); 
			copyArg(msg,"propertyId",params,undefined,false); 
			copyArg(msg,"propertyAlias",params,undefined,false); 
			copyArg(msg,"startTimeInSeconds",params,undefined,false); 
			copyArg(msg,"startTimeOffsetInNanos",params,undefined,false); 
			copyArg(msg,"endTimeInSeconds",params,undefined,false); 
			copyArg(msg,"endTimeOffsetInNanos",params,undefined,false); 
			copyArg(msg,"quality",params,undefined,false); 
			copyArg(msg,"intervalInSeconds",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"type",params,undefined,false); 
			copyArg(msg,"intervalWindowInSeconds",params,undefined,false); 
			

			svc.getInterpolatedAssetPropertyValues(params,cb);
		}

		
		service.ListAccessPolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"identityType",params,undefined,false); 
			copyArg(msg,"identityId",params,undefined,false); 
			copyArg(msg,"resourceType",params,undefined,false); 
			copyArg(msg,"resourceId",params,undefined,false); 
			copyArg(msg,"iamArn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listAccessPolicies(params,cb);
		}

		
		service.ListAssetModels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listAssetModels(params,cb);
		}

		
		service.ListAssetRelationships=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assetId",params,undefined,false); 
			copyArg(n,"traversalType",params,undefined,false); 
			
			copyArg(msg,"assetId",params,undefined,false); 
			copyArg(msg,"traversalType",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listAssetRelationships(params,cb);
		}

		
		service.ListAssets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"assetModelId",params,undefined,false); 
			copyArg(msg,"filter",params,undefined,false); 
			

			svc.listAssets(params,cb);
		}

		
		service.ListAssociatedAssets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assetId",params,undefined,false); 
			
			copyArg(msg,"assetId",params,undefined,false); 
			copyArg(msg,"hierarchyId",params,undefined,false); 
			copyArg(msg,"traversalDirection",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listAssociatedAssets(params,cb);
		}

		
		service.ListDashboards=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"projectId",params,undefined,false); 
			
			copyArg(msg,"projectId",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listDashboards(params,cb);
		}

		
		service.ListGateways=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listGateways(params,cb);
		}

		
		service.ListPortals=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listPortals(params,cb);
		}

		
		service.ListProjectAssets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"projectId",params,undefined,false); 
			
			copyArg(msg,"projectId",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listProjectAssets(params,cb);
		}

		
		service.ListProjects=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"portalId",params,undefined,false); 
			
			copyArg(msg,"portalId",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listProjects(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.PutDefaultEncryptionConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"encryptionType",params,undefined,false); 
			
			copyArg(msg,"encryptionType",params,undefined,false); 
			copyArg(msg,"kmsKeyId",params,undefined,false); 
			

			svc.putDefaultEncryptionConfiguration(params,cb);
		}

		
		service.PutLoggingOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"loggingOptions",params,undefined,true); 
			
			copyArg(msg,"loggingOptions",params,undefined,true); 
			

			svc.putLoggingOptions(params,cb);
		}

		
		service.PutStorageConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"storageType",params,undefined,false); 
			
			copyArg(msg,"storageType",params,undefined,false); 
			copyArg(msg,"multiLayerStorage",params,undefined,true); 
			

			svc.putStorageConfiguration(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"tags",params,undefined,true); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"tagKeys",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateAccessPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"accessPolicyId",params,undefined,false); 
			copyArg(n,"accessPolicyIdentity",params,undefined,true); 
			copyArg(n,"accessPolicyResource",params,undefined,true); 
			copyArg(n,"accessPolicyPermission",params,undefined,false); 
			
			copyArg(msg,"accessPolicyId",params,undefined,false); 
			copyArg(msg,"accessPolicyIdentity",params,undefined,true); 
			copyArg(msg,"accessPolicyResource",params,undefined,true); 
			copyArg(msg,"accessPolicyPermission",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.updateAccessPolicy(params,cb);
		}

		
		service.UpdateAsset=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assetId",params,undefined,false); 
			copyArg(n,"assetName",params,undefined,false); 
			
			copyArg(msg,"assetId",params,undefined,false); 
			copyArg(msg,"assetName",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.updateAsset(params,cb);
		}

		
		service.UpdateAssetModel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assetModelId",params,undefined,false); 
			copyArg(n,"assetModelName",params,undefined,false); 
			
			copyArg(msg,"assetModelId",params,undefined,false); 
			copyArg(msg,"assetModelName",params,undefined,false); 
			copyArg(msg,"assetModelDescription",params,undefined,false); 
			copyArg(msg,"assetModelProperties",params,undefined,true); 
			copyArg(msg,"assetModelHierarchies",params,undefined,true); 
			copyArg(msg,"assetModelCompositeModels",params,undefined,true); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.updateAssetModel(params,cb);
		}

		
		service.UpdateAssetProperty=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"assetId",params,undefined,false); 
			copyArg(n,"propertyId",params,undefined,false); 
			
			copyArg(msg,"assetId",params,undefined,false); 
			copyArg(msg,"propertyId",params,undefined,false); 
			copyArg(msg,"propertyAlias",params,undefined,false); 
			copyArg(msg,"propertyNotificationState",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.updateAssetProperty(params,cb);
		}

		
		service.UpdateDashboard=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"dashboardId",params,undefined,false); 
			copyArg(n,"dashboardName",params,undefined,false); 
			copyArg(n,"dashboardDefinition",params,undefined,false); 
			
			copyArg(msg,"dashboardId",params,undefined,false); 
			copyArg(msg,"dashboardName",params,undefined,false); 
			copyArg(msg,"dashboardDescription",params,undefined,false); 
			copyArg(msg,"dashboardDefinition",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.updateDashboard(params,cb);
		}

		
		service.UpdateGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"gatewayId",params,undefined,false); 
			copyArg(n,"gatewayName",params,undefined,false); 
			
			copyArg(msg,"gatewayId",params,undefined,false); 
			copyArg(msg,"gatewayName",params,undefined,false); 
			

			svc.updateGateway(params,cb);
		}

		
		service.UpdateGatewayCapabilityConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"gatewayId",params,undefined,false); 
			copyArg(n,"capabilityNamespace",params,undefined,false); 
			copyArg(n,"capabilityConfiguration",params,undefined,false); 
			
			copyArg(msg,"gatewayId",params,undefined,false); 
			copyArg(msg,"capabilityNamespace",params,undefined,false); 
			copyArg(msg,"capabilityConfiguration",params,undefined,false); 
			

			svc.updateGatewayCapabilityConfiguration(params,cb);
		}

		
		service.UpdatePortal=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"portalId",params,undefined,false); 
			copyArg(n,"portalName",params,undefined,false); 
			copyArg(n,"portalContactEmail",params,undefined,false); 
			copyArg(n,"roleArn",params,undefined,false); 
			
			copyArg(msg,"portalId",params,undefined,false); 
			copyArg(msg,"portalName",params,undefined,false); 
			copyArg(msg,"portalDescription",params,undefined,false); 
			copyArg(msg,"portalContactEmail",params,undefined,false); 
			copyArg(msg,"portalLogoImage",params,undefined,false); 
			copyArg(msg,"roleArn",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"notificationSenderEmail",params,undefined,false); 
			copyArg(msg,"alarms",params,undefined,true); 
			

			svc.updatePortal(params,cb);
		}

		
		service.UpdateProject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"projectId",params,undefined,false); 
			copyArg(n,"projectName",params,undefined,false); 
			
			copyArg(msg,"projectId",params,undefined,false); 
			copyArg(msg,"projectName",params,undefined,false); 
			copyArg(msg,"projectDescription",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			

			svc.updateProject(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS IoTSiteWise", AmazonAPINode);

};
