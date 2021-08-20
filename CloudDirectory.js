
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

		var awsService = new AWS.CloudDirectory( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.CloudDirectory(msg.AWSConfig) : awsService;

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

		
		service.AddFacetToObject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"SchemaFacet",params,undefined,true); 
			copyArg(n,"ObjectReference",params,undefined,true); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"SchemaFacet",params,undefined,true); 
			copyArg(msg,"ObjectAttributeList",params,undefined,true); 
			copyArg(msg,"ObjectReference",params,undefined,true); 
			

			svc.addFacetToObject(params,cb);
		}

		
		service.ApplySchema=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PublishedSchemaArn",params,undefined,false); 
			copyArg(n,"DirectoryArn",params,undefined,false); 
			
			copyArg(msg,"PublishedSchemaArn",params,undefined,false); 
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			

			svc.applySchema(params,cb);
		}

		
		service.AttachObject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"ParentReference",params,undefined,true); 
			copyArg(n,"ChildReference",params,undefined,true); 
			copyArg(n,"LinkName",params,undefined,false); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"ParentReference",params,undefined,true); 
			copyArg(msg,"ChildReference",params,undefined,true); 
			copyArg(msg,"LinkName",params,undefined,false); 
			

			svc.attachObject(params,cb);
		}

		
		service.AttachPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"PolicyReference",params,undefined,true); 
			copyArg(n,"ObjectReference",params,undefined,true); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"PolicyReference",params,undefined,true); 
			copyArg(msg,"ObjectReference",params,undefined,true); 
			

			svc.attachPolicy(params,cb);
		}

		
		service.AttachToIndex=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"IndexReference",params,undefined,true); 
			copyArg(n,"TargetReference",params,undefined,true); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"IndexReference",params,undefined,true); 
			copyArg(msg,"TargetReference",params,undefined,true); 
			

			svc.attachToIndex(params,cb);
		}

		
		service.AttachTypedLink=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"SourceObjectReference",params,undefined,true); 
			copyArg(n,"TargetObjectReference",params,undefined,true); 
			copyArg(n,"TypedLinkFacet",params,undefined,true); 
			copyArg(n,"Attributes",params,undefined,true); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"SourceObjectReference",params,undefined,true); 
			copyArg(msg,"TargetObjectReference",params,undefined,true); 
			copyArg(msg,"TypedLinkFacet",params,undefined,true); 
			copyArg(msg,"Attributes",params,undefined,true); 
			

			svc.attachTypedLink(params,cb);
		}

		
		service.BatchRead=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"Operations",params,undefined,false); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"Operations",params,undefined,false); 
			copyArg(msg,"ConsistencyLevel",params,undefined,false); 
			

			svc.batchRead(params,cb);
		}

		
		service.BatchWrite=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"Operations",params,undefined,false); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"Operations",params,undefined,false); 
			

			svc.batchWrite(params,cb);
		}

		
		service.CreateDirectory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"SchemaArn",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"SchemaArn",params,undefined,false); 
			

			svc.createDirectory(params,cb);
		}

		
		service.CreateFacet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SchemaArn",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"SchemaArn",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Attributes",params,undefined,true); 
			copyArg(msg,"ObjectType",params,undefined,false); 
			copyArg(msg,"FacetStyle",params,undefined,false); 
			

			svc.createFacet(params,cb);
		}

		
		service.CreateIndex=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"OrderedIndexedAttributeList",params,undefined,true); 
			copyArg(n,"IsUnique",params,undefined,false); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"OrderedIndexedAttributeList",params,undefined,true); 
			copyArg(msg,"IsUnique",params,undefined,false); 
			copyArg(msg,"ParentReference",params,undefined,true); 
			copyArg(msg,"LinkName",params,undefined,false); 
			

			svc.createIndex(params,cb);
		}

		
		service.CreateObject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"SchemaFacets",params,undefined,true); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"SchemaFacets",params,undefined,true); 
			copyArg(msg,"ObjectAttributeList",params,undefined,true); 
			copyArg(msg,"ParentReference",params,undefined,true); 
			copyArg(msg,"LinkName",params,undefined,false); 
			

			svc.createObject(params,cb);
		}

		
		service.CreateSchema=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.createSchema(params,cb);
		}

		
		service.CreateTypedLinkFacet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SchemaArn",params,undefined,false); 
			copyArg(n,"Facet",params,undefined,false); 
			
			copyArg(msg,"SchemaArn",params,undefined,false); 
			copyArg(msg,"Facet",params,undefined,false); 
			

			svc.createTypedLinkFacet(params,cb);
		}

		
		service.DeleteDirectory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			

			svc.deleteDirectory(params,cb);
		}

		
		service.DeleteFacet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SchemaArn",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"SchemaArn",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteFacet(params,cb);
		}

		
		service.DeleteObject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"ObjectReference",params,undefined,true); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"ObjectReference",params,undefined,true); 
			

			svc.deleteObject(params,cb);
		}

		
		service.DeleteSchema=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SchemaArn",params,undefined,false); 
			
			copyArg(msg,"SchemaArn",params,undefined,false); 
			

			svc.deleteSchema(params,cb);
		}

		
		service.DeleteTypedLinkFacet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SchemaArn",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"SchemaArn",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteTypedLinkFacet(params,cb);
		}

		
		service.DetachFromIndex=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"IndexReference",params,undefined,true); 
			copyArg(n,"TargetReference",params,undefined,true); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"IndexReference",params,undefined,true); 
			copyArg(msg,"TargetReference",params,undefined,true); 
			

			svc.detachFromIndex(params,cb);
		}

		
		service.DetachObject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"ParentReference",params,undefined,true); 
			copyArg(n,"LinkName",params,undefined,false); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"ParentReference",params,undefined,true); 
			copyArg(msg,"LinkName",params,undefined,false); 
			

			svc.detachObject(params,cb);
		}

		
		service.DetachPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"PolicyReference",params,undefined,true); 
			copyArg(n,"ObjectReference",params,undefined,true); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"PolicyReference",params,undefined,true); 
			copyArg(msg,"ObjectReference",params,undefined,true); 
			

			svc.detachPolicy(params,cb);
		}

		
		service.DetachTypedLink=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"TypedLinkSpecifier",params,undefined,true); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"TypedLinkSpecifier",params,undefined,true); 
			

			svc.detachTypedLink(params,cb);
		}

		
		service.DisableDirectory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			

			svc.disableDirectory(params,cb);
		}

		
		service.EnableDirectory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			

			svc.enableDirectory(params,cb);
		}

		
		service.GetAppliedSchemaVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SchemaArn",params,undefined,false); 
			
			copyArg(msg,"SchemaArn",params,undefined,false); 
			

			svc.getAppliedSchemaVersion(params,cb);
		}

		
		service.GetDirectory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			

			svc.getDirectory(params,cb);
		}

		
		service.GetFacet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SchemaArn",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"SchemaArn",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.getFacet(params,cb);
		}

		
		service.GetLinkAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"TypedLinkSpecifier",params,undefined,true); 
			copyArg(n,"AttributeNames",params,undefined,true); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"TypedLinkSpecifier",params,undefined,true); 
			copyArg(msg,"AttributeNames",params,undefined,true); 
			copyArg(msg,"ConsistencyLevel",params,undefined,false); 
			

			svc.getLinkAttributes(params,cb);
		}

		
		service.GetObjectAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"ObjectReference",params,undefined,true); 
			copyArg(n,"SchemaFacet",params,undefined,true); 
			copyArg(n,"AttributeNames",params,undefined,true); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"ObjectReference",params,undefined,true); 
			copyArg(msg,"ConsistencyLevel",params,undefined,false); 
			copyArg(msg,"SchemaFacet",params,undefined,true); 
			copyArg(msg,"AttributeNames",params,undefined,true); 
			

			svc.getObjectAttributes(params,cb);
		}

		
		service.GetObjectInformation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"ObjectReference",params,undefined,true); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"ObjectReference",params,undefined,true); 
			copyArg(msg,"ConsistencyLevel",params,undefined,false); 
			

			svc.getObjectInformation(params,cb);
		}

		
		service.GetSchemaAsJson=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SchemaArn",params,undefined,false); 
			
			copyArg(msg,"SchemaArn",params,undefined,false); 
			

			svc.getSchemaAsJson(params,cb);
		}

		
		service.GetTypedLinkFacetInformation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SchemaArn",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"SchemaArn",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.getTypedLinkFacetInformation(params,cb);
		}

		
		service.ListAppliedSchemaArns=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"SchemaArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listAppliedSchemaArns(params,cb);
		}

		
		service.ListAttachedIndices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"TargetReference",params,undefined,true); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"TargetReference",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"ConsistencyLevel",params,undefined,false); 
			

			svc.listAttachedIndices(params,cb);
		}

		
		service.ListDevelopmentSchemaArns=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listDevelopmentSchemaArns(params,cb);
		}

		
		service.ListDirectories=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"state",params,undefined,false); 
			

			svc.listDirectories(params,cb);
		}

		
		service.ListFacetAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SchemaArn",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"SchemaArn",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listFacetAttributes(params,cb);
		}

		
		service.ListFacetNames=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SchemaArn",params,undefined,false); 
			
			copyArg(msg,"SchemaArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listFacetNames(params,cb);
		}

		
		service.ListIncomingTypedLinks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"ObjectReference",params,undefined,true); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"ObjectReference",params,undefined,true); 
			copyArg(msg,"FilterAttributeRanges",params,undefined,true); 
			copyArg(msg,"FilterTypedLink",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"ConsistencyLevel",params,undefined,false); 
			

			svc.listIncomingTypedLinks(params,cb);
		}

		
		service.ListIndex=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"IndexReference",params,undefined,true); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"RangesOnIndexedValues",params,undefined,true); 
			copyArg(msg,"IndexReference",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"ConsistencyLevel",params,undefined,false); 
			

			svc.listIndex(params,cb);
		}

		
		service.ListManagedSchemaArns=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SchemaArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listManagedSchemaArns(params,cb);
		}

		
		service.ListObjectAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"ObjectReference",params,undefined,true); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"ObjectReference",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"ConsistencyLevel",params,undefined,false); 
			copyArg(msg,"FacetFilter",params,undefined,true); 
			

			svc.listObjectAttributes(params,cb);
		}

		
		service.ListObjectChildren=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"ObjectReference",params,undefined,true); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"ObjectReference",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"ConsistencyLevel",params,undefined,false); 
			

			svc.listObjectChildren(params,cb);
		}

		
		service.ListObjectParentPaths=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"ObjectReference",params,undefined,true); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"ObjectReference",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listObjectParentPaths(params,cb);
		}

		
		service.ListObjectParents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"ObjectReference",params,undefined,true); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"ObjectReference",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"ConsistencyLevel",params,undefined,false); 
			copyArg(msg,"IncludeAllLinksToEachParent",params,undefined,false); 
			

			svc.listObjectParents(params,cb);
		}

		
		service.ListObjectPolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"ObjectReference",params,undefined,true); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"ObjectReference",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"ConsistencyLevel",params,undefined,false); 
			

			svc.listObjectPolicies(params,cb);
		}

		
		service.ListOutgoingTypedLinks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"ObjectReference",params,undefined,true); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"ObjectReference",params,undefined,true); 
			copyArg(msg,"FilterAttributeRanges",params,undefined,true); 
			copyArg(msg,"FilterTypedLink",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"ConsistencyLevel",params,undefined,false); 
			

			svc.listOutgoingTypedLinks(params,cb);
		}

		
		service.ListPolicyAttachments=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"PolicyReference",params,undefined,true); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"PolicyReference",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"ConsistencyLevel",params,undefined,false); 
			

			svc.listPolicyAttachments(params,cb);
		}

		
		service.ListPublishedSchemaArns=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SchemaArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listPublishedSchemaArns(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListTypedLinkFacetAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SchemaArn",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"SchemaArn",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listTypedLinkFacetAttributes(params,cb);
		}

		
		service.ListTypedLinkFacetNames=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SchemaArn",params,undefined,false); 
			
			copyArg(msg,"SchemaArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listTypedLinkFacetNames(params,cb);
		}

		
		service.LookupPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"ObjectReference",params,undefined,true); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"ObjectReference",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.lookupPolicy(params,cb);
		}

		
		service.PublishSchema=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DevelopmentSchemaArn",params,undefined,false); 
			copyArg(n,"Version",params,undefined,false); 
			
			copyArg(msg,"DevelopmentSchemaArn",params,undefined,false); 
			copyArg(msg,"Version",params,undefined,false); 
			copyArg(msg,"MinorVersion",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.publishSchema(params,cb);
		}

		
		service.PutSchemaFromJson=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SchemaArn",params,undefined,false); 
			copyArg(n,"Document",params,undefined,false); 
			
			copyArg(msg,"SchemaArn",params,undefined,false); 
			copyArg(msg,"Document",params,undefined,false); 
			

			svc.putSchemaFromJson(params,cb);
		}

		
		service.RemoveFacetFromObject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"SchemaFacet",params,undefined,true); 
			copyArg(n,"ObjectReference",params,undefined,true); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"SchemaFacet",params,undefined,true); 
			copyArg(msg,"ObjectReference",params,undefined,true); 
			

			svc.removeFacetFromObject(params,cb);
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

		
		service.UpdateFacet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SchemaArn",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"SchemaArn",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"AttributeUpdates",params,undefined,false); 
			copyArg(msg,"ObjectType",params,undefined,false); 
			

			svc.updateFacet(params,cb);
		}

		
		service.UpdateLinkAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"TypedLinkSpecifier",params,undefined,true); 
			copyArg(n,"AttributeUpdates",params,undefined,true); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"TypedLinkSpecifier",params,undefined,true); 
			copyArg(msg,"AttributeUpdates",params,undefined,true); 
			

			svc.updateLinkAttributes(params,cb);
		}

		
		service.UpdateObjectAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DirectoryArn",params,undefined,false); 
			copyArg(n,"ObjectReference",params,undefined,true); 
			copyArg(n,"AttributeUpdates",params,undefined,true); 
			
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"ObjectReference",params,undefined,true); 
			copyArg(msg,"AttributeUpdates",params,undefined,true); 
			

			svc.updateObjectAttributes(params,cb);
		}

		
		service.UpdateSchema=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SchemaArn",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"SchemaArn",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.updateSchema(params,cb);
		}

		
		service.UpdateTypedLinkFacet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SchemaArn",params,undefined,false); 
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"AttributeUpdates",params,undefined,false); 
			copyArg(n,"IdentityAttributeOrder",params,undefined,true); 
			
			copyArg(msg,"SchemaArn",params,undefined,false); 
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"AttributeUpdates",params,undefined,false); 
			copyArg(msg,"IdentityAttributeOrder",params,undefined,true); 
			

			svc.updateTypedLinkFacet(params,cb);
		}

		
		service.UpgradeAppliedSchema=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PublishedSchemaArn",params,undefined,false); 
			copyArg(n,"DirectoryArn",params,undefined,false); 
			
			copyArg(msg,"PublishedSchemaArn",params,undefined,false); 
			copyArg(msg,"DirectoryArn",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.upgradeAppliedSchema(params,cb);
		}

		
		service.UpgradePublishedSchema=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DevelopmentSchemaArn",params,undefined,false); 
			copyArg(n,"PublishedSchemaArn",params,undefined,false); 
			copyArg(n,"MinorVersion",params,undefined,false); 
			
			copyArg(msg,"DevelopmentSchemaArn",params,undefined,false); 
			copyArg(msg,"PublishedSchemaArn",params,undefined,false); 
			copyArg(msg,"MinorVersion",params,undefined,false); 
			copyArg(msg,"DryRun",params,undefined,false); 
			

			svc.upgradePublishedSchema(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS CloudDirectory", AmazonAPINode);

};
