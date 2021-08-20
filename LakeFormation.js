
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

		var awsService = new AWS.LakeFormation( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.LakeFormation(msg.AWSConfig) : awsService;

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

		
		service.AddLFTagsToResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Resource",params,undefined,true); 
			copyArg(n,"LFTags",params,undefined,true); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"Resource",params,undefined,true); 
			copyArg(msg,"LFTags",params,undefined,true); 
			

			svc.addLFTagsToResource(params,cb);
		}

		
		service.BatchGrantPermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Entries",params,undefined,true); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"Entries",params,undefined,true); 
			

			svc.batchGrantPermissions(params,cb);
		}

		
		service.BatchRevokePermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Entries",params,undefined,true); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"Entries",params,undefined,true); 
			

			svc.batchRevokePermissions(params,cb);
		}

		
		service.CreateLFTag=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TagKey",params,undefined,false); 
			copyArg(n,"TagValues",params,undefined,true); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"TagKey",params,undefined,false); 
			copyArg(msg,"TagValues",params,undefined,true); 
			

			svc.createLFTag(params,cb);
		}

		
		service.DeleteLFTag=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TagKey",params,undefined,false); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"TagKey",params,undefined,false); 
			

			svc.deleteLFTag(params,cb);
		}

		
		service.DeregisterResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.deregisterResource(params,cb);
		}

		
		service.DescribeResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.describeResource(params,cb);
		}

		
		service.GetDataLakeSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			

			svc.getDataLakeSettings(params,cb);
		}

		
		service.GetEffectivePermissionsForPath=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.getEffectivePermissionsForPath(params,cb);
		}

		
		service.GetLFTag=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TagKey",params,undefined,false); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"TagKey",params,undefined,false); 
			

			svc.getLFTag(params,cb);
		}

		
		service.GetResourceLFTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Resource",params,undefined,true); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"Resource",params,undefined,true); 
			copyArg(msg,"ShowAssignedLFTags",params,undefined,false); 
			

			svc.getResourceLFTags(params,cb);
		}

		
		service.GrantPermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Principal",params,undefined,true); 
			copyArg(n,"Resource",params,undefined,true); 
			copyArg(n,"Permissions",params,undefined,true); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"Principal",params,undefined,true); 
			copyArg(msg,"Resource",params,undefined,true); 
			copyArg(msg,"Permissions",params,undefined,true); 
			copyArg(msg,"PermissionsWithGrantOption",params,undefined,true); 
			

			svc.grantPermissions(params,cb);
		}

		
		service.ListLFTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"ResourceShareType",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listLFTags(params,cb);
		}

		
		service.ListPermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"Principal",params,undefined,true); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			copyArg(msg,"Resource",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listPermissions(params,cb);
		}

		
		service.ListResources=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"FilterConditionList",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listResources(params,cb);
		}

		
		service.PutDataLakeSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DataLakeSettings",params,undefined,true); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"DataLakeSettings",params,undefined,true); 
			

			svc.putDataLakeSettings(params,cb);
		}

		
		service.RegisterResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"UseServiceLinkedRole",params,undefined,false); 
			copyArg(msg,"RoleArn",params,undefined,false); 
			

			svc.registerResource(params,cb);
		}

		
		service.RemoveLFTagsFromResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Resource",params,undefined,true); 
			copyArg(n,"LFTags",params,undefined,true); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"Resource",params,undefined,true); 
			copyArg(msg,"LFTags",params,undefined,true); 
			

			svc.removeLFTagsFromResource(params,cb);
		}

		
		service.RevokePermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Principal",params,undefined,true); 
			copyArg(n,"Resource",params,undefined,true); 
			copyArg(n,"Permissions",params,undefined,true); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"Principal",params,undefined,true); 
			copyArg(msg,"Resource",params,undefined,true); 
			copyArg(msg,"Permissions",params,undefined,true); 
			copyArg(msg,"PermissionsWithGrantOption",params,undefined,true); 
			

			svc.revokePermissions(params,cb);
		}

		
		service.SearchDatabasesByLFTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Expression",params,undefined,true); 
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"Expression",params,undefined,true); 
			

			svc.searchDatabasesByLFTags(params,cb);
		}

		
		service.SearchTablesByLFTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Expression",params,undefined,true); 
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"Expression",params,undefined,true); 
			

			svc.searchTablesByLFTags(params,cb);
		}

		
		service.UpdateLFTag=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TagKey",params,undefined,false); 
			
			copyArg(msg,"CatalogId",params,undefined,false); 
			copyArg(msg,"TagKey",params,undefined,false); 
			copyArg(msg,"TagValuesToDelete",params,undefined,true); 
			copyArg(msg,"TagValuesToAdd",params,undefined,true); 
			

			svc.updateLFTag(params,cb);
		}

		
		service.UpdateResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RoleArn",params,undefined,false); 
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"RoleArn",params,undefined,false); 
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.updateResource(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS LakeFormation", AmazonAPINode);

};
