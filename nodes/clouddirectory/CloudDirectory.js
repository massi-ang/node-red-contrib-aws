
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

		var awsService = new AWS.CloudDirectory( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.CloudDirectory(msg.AWSConfig) : awsService;

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
		
			service.AddFacetToObject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"SchemaFacet",params,undefined,true); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"SchemaFacet",params,undefined,true); 
			copyArgs(n,"ObjectAttributeList",params,undefined,true); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"SchemaFacet",params,undefined,true); 
			copyArgs(msg,"ObjectAttributeList",params,undefined,true); 
			copyArgs(msg,"ObjectReference",params,undefined,true); 
			

			svc.addFacetToObject(params,cb);
		}
			service.ApplySchema=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PublishedSchemaArn",params,undefined,false); 
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			
			copyArgs(n,"PublishedSchemaArn",params,undefined,false); 
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			
			copyArgs(msg,"PublishedSchemaArn",params,undefined,false); 
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			

			svc.applySchema(params,cb);
		}
			service.AttachObject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"ParentReference",params,undefined,true); 
			copyArgs(n,"ChildReference",params,undefined,true); 
			copyArgs(n,"LinkName",params,undefined,false); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"ParentReference",params,undefined,true); 
			copyArgs(n,"ChildReference",params,undefined,true); 
			copyArgs(n,"LinkName",params,undefined,false); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"ParentReference",params,undefined,true); 
			copyArgs(msg,"ChildReference",params,undefined,true); 
			copyArgs(msg,"LinkName",params,undefined,false); 
			

			svc.attachObject(params,cb);
		}
			service.AttachPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"PolicyReference",params,undefined,true); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"PolicyReference",params,undefined,true); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"PolicyReference",params,undefined,true); 
			copyArgs(msg,"ObjectReference",params,undefined,true); 
			

			svc.attachPolicy(params,cb);
		}
			service.AttachToIndex=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"IndexReference",params,undefined,true); 
			copyArgs(n,"TargetReference",params,undefined,true); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"IndexReference",params,undefined,true); 
			copyArgs(n,"TargetReference",params,undefined,true); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"IndexReference",params,undefined,true); 
			copyArgs(msg,"TargetReference",params,undefined,true); 
			

			svc.attachToIndex(params,cb);
		}
			service.AttachTypedLink=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"SourceObjectReference",params,undefined,true); 
			copyArgs(n,"TargetObjectReference",params,undefined,true); 
			copyArgs(n,"TypedLinkFacet",params,undefined,true); 
			copyArgs(n,"Attributes",params,undefined,true); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"SourceObjectReference",params,undefined,true); 
			copyArgs(n,"TargetObjectReference",params,undefined,true); 
			copyArgs(n,"TypedLinkFacet",params,undefined,true); 
			copyArgs(n,"Attributes",params,undefined,true); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"SourceObjectReference",params,undefined,true); 
			copyArgs(msg,"TargetObjectReference",params,undefined,true); 
			copyArgs(msg,"TypedLinkFacet",params,undefined,true); 
			copyArgs(msg,"Attributes",params,undefined,true); 
			

			svc.attachTypedLink(params,cb);
		}
			service.BatchRead=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"Operations",params,undefined,false); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"Operations",params,undefined,false); 
			copyArgs(n,"ConsistencyLevel",params,undefined,false); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"Operations",params,undefined,false); 
			copyArgs(msg,"ConsistencyLevel",params,undefined,false); 
			

			svc.batchRead(params,cb);
		}
			service.BatchWrite=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"Operations",params,undefined,false); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"Operations",params,undefined,false); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"Operations",params,undefined,false); 
			

			svc.batchWrite(params,cb);
		}
			service.CreateDirectory=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"SchemaArn",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"SchemaArn",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"SchemaArn",params,undefined,false); 
			

			svc.createDirectory(params,cb);
		}
			service.CreateFacet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"Attributes",params,undefined,true); 
			copyArgs(n,"ObjectType",params,undefined,false); 
			copyArgs(n,"FacetStyle",params,undefined,false); 
			
			copyArgs(msg,"SchemaArn",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"Attributes",params,undefined,true); 
			copyArgs(msg,"ObjectType",params,undefined,false); 
			copyArgs(msg,"FacetStyle",params,undefined,false); 
			

			svc.createFacet(params,cb);
		}
			service.CreateIndex=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"OrderedIndexedAttributeList",params,undefined,true); 
			copyArgs(Boolean(n),"IsUnique",params,undefined,false); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"OrderedIndexedAttributeList",params,undefined,true); 
			copyArgs(Boolean(n),"IsUnique",params,undefined,false); 
			copyArgs(n,"ParentReference",params,undefined,true); 
			copyArgs(n,"LinkName",params,undefined,false); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"OrderedIndexedAttributeList",params,undefined,true); 
			copyArgs(msg,"IsUnique",params,undefined,false); 
			copyArgs(msg,"ParentReference",params,undefined,true); 
			copyArgs(msg,"LinkName",params,undefined,false); 
			

			svc.createIndex(params,cb);
		}
			service.CreateObject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"SchemaFacets",params,undefined,true); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"SchemaFacets",params,undefined,true); 
			copyArgs(n,"ObjectAttributeList",params,undefined,true); 
			copyArgs(n,"ParentReference",params,undefined,true); 
			copyArgs(n,"LinkName",params,undefined,false); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"SchemaFacets",params,undefined,true); 
			copyArgs(msg,"ObjectAttributeList",params,undefined,true); 
			copyArgs(msg,"ParentReference",params,undefined,true); 
			copyArgs(msg,"LinkName",params,undefined,false); 
			

			svc.createObject(params,cb);
		}
			service.CreateSchema=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.createSchema(params,cb);
		}
			service.CreateTypedLinkFacet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"Facet",params,undefined,false); 
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"Facet",params,undefined,false); 
			
			copyArgs(msg,"SchemaArn",params,undefined,false); 
			copyArgs(msg,"Facet",params,undefined,false); 
			

			svc.createTypedLinkFacet(params,cb);
		}
			service.DeleteDirectory=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			

			svc.deleteDirectory(params,cb);
		}
			service.DeleteFacet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"SchemaArn",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteFacet(params,cb);
		}
			service.DeleteObject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"ObjectReference",params,undefined,true); 
			

			svc.deleteObject(params,cb);
		}
			service.DeleteSchema=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			
			copyArgs(msg,"SchemaArn",params,undefined,false); 
			

			svc.deleteSchema(params,cb);
		}
			service.DeleteTypedLinkFacet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"SchemaArn",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deleteTypedLinkFacet(params,cb);
		}
			service.DetachFromIndex=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"IndexReference",params,undefined,true); 
			copyArgs(n,"TargetReference",params,undefined,true); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"IndexReference",params,undefined,true); 
			copyArgs(n,"TargetReference",params,undefined,true); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"IndexReference",params,undefined,true); 
			copyArgs(msg,"TargetReference",params,undefined,true); 
			

			svc.detachFromIndex(params,cb);
		}
			service.DetachObject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"ParentReference",params,undefined,true); 
			copyArgs(n,"LinkName",params,undefined,false); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"ParentReference",params,undefined,true); 
			copyArgs(n,"LinkName",params,undefined,false); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"ParentReference",params,undefined,true); 
			copyArgs(msg,"LinkName",params,undefined,false); 
			

			svc.detachObject(params,cb);
		}
			service.DetachPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"PolicyReference",params,undefined,true); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"PolicyReference",params,undefined,true); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"PolicyReference",params,undefined,true); 
			copyArgs(msg,"ObjectReference",params,undefined,true); 
			

			svc.detachPolicy(params,cb);
		}
			service.DetachTypedLink=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"TypedLinkSpecifier",params,undefined,true); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"TypedLinkSpecifier",params,undefined,true); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"TypedLinkSpecifier",params,undefined,true); 
			

			svc.detachTypedLink(params,cb);
		}
			service.DisableDirectory=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			

			svc.disableDirectory(params,cb);
		}
			service.EnableDirectory=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			

			svc.enableDirectory(params,cb);
		}
			service.GetAppliedSchemaVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			
			copyArgs(msg,"SchemaArn",params,undefined,false); 
			

			svc.getAppliedSchemaVersion(params,cb);
		}
			service.GetDirectory=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			

			svc.getDirectory(params,cb);
		}
			service.GetFacet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"SchemaArn",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getFacet(params,cb);
		}
			service.GetLinkAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"TypedLinkSpecifier",params,undefined,true); 
			copyArgs(n,"AttributeNames",params,undefined,true); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"TypedLinkSpecifier",params,undefined,true); 
			copyArgs(n,"AttributeNames",params,undefined,true); 
			copyArgs(n,"ConsistencyLevel",params,undefined,false); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"TypedLinkSpecifier",params,undefined,true); 
			copyArgs(msg,"AttributeNames",params,undefined,true); 
			copyArgs(msg,"ConsistencyLevel",params,undefined,false); 
			

			svc.getLinkAttributes(params,cb);
		}
			service.GetObjectAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			copyArgs(n,"SchemaFacet",params,undefined,true); 
			copyArgs(n,"AttributeNames",params,undefined,true); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			copyArgs(n,"ConsistencyLevel",params,undefined,false); 
			copyArgs(n,"SchemaFacet",params,undefined,true); 
			copyArgs(n,"AttributeNames",params,undefined,true); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"ObjectReference",params,undefined,true); 
			copyArgs(msg,"ConsistencyLevel",params,undefined,false); 
			copyArgs(msg,"SchemaFacet",params,undefined,true); 
			copyArgs(msg,"AttributeNames",params,undefined,true); 
			

			svc.getObjectAttributes(params,cb);
		}
			service.GetObjectInformation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			copyArgs(n,"ConsistencyLevel",params,undefined,false); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"ObjectReference",params,undefined,true); 
			copyArgs(msg,"ConsistencyLevel",params,undefined,false); 
			

			svc.getObjectInformation(params,cb);
		}
			service.GetSchemaAsJson=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			
			copyArgs(msg,"SchemaArn",params,undefined,false); 
			

			svc.getSchemaAsJson(params,cb);
		}
			service.GetTypedLinkFacetInformation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"SchemaArn",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getTypedLinkFacetInformation(params,cb);
		}
			service.ListAppliedSchemaArns=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"SchemaArn",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listAppliedSchemaArns(params,cb);
		}
			service.ListAttachedIndices=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"TargetReference",params,undefined,true); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"TargetReference",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"ConsistencyLevel",params,undefined,false); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"TargetReference",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"ConsistencyLevel",params,undefined,false); 
			

			svc.listAttachedIndices(params,cb);
		}
			service.ListDevelopmentSchemaArns=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listDevelopmentSchemaArns(params,cb);
		}
			service.ListDirectories=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"state",params,undefined,false); 
			
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"state",params,undefined,false); 
			

			svc.listDirectories(params,cb);
		}
			service.ListFacetAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"SchemaArn",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listFacetAttributes(params,cb);
		}
			service.ListFacetNames=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"SchemaArn",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listFacetNames(params,cb);
		}
			service.ListIncomingTypedLinks=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			copyArgs(n,"FilterAttributeRanges",params,undefined,true); 
			copyArgs(n,"FilterTypedLink",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"ConsistencyLevel",params,undefined,false); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"ObjectReference",params,undefined,true); 
			copyArgs(msg,"FilterAttributeRanges",params,undefined,true); 
			copyArgs(msg,"FilterTypedLink",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"ConsistencyLevel",params,undefined,false); 
			

			svc.listIncomingTypedLinks(params,cb);
		}
			service.ListIndex=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"IndexReference",params,undefined,true); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"RangesOnIndexedValues",params,undefined,true); 
			copyArgs(n,"IndexReference",params,undefined,true); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"ConsistencyLevel",params,undefined,false); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"RangesOnIndexedValues",params,undefined,true); 
			copyArgs(msg,"IndexReference",params,undefined,true); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"ConsistencyLevel",params,undefined,false); 
			

			svc.listIndex(params,cb);
		}
			service.ListManagedSchemaArns=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"SchemaArn",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listManagedSchemaArns(params,cb);
		}
			service.ListObjectAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"ConsistencyLevel",params,undefined,false); 
			copyArgs(n,"FacetFilter",params,undefined,true); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"ObjectReference",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"ConsistencyLevel",params,undefined,false); 
			copyArgs(msg,"FacetFilter",params,undefined,true); 
			

			svc.listObjectAttributes(params,cb);
		}
			service.ListObjectChildren=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"ConsistencyLevel",params,undefined,false); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"ObjectReference",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"ConsistencyLevel",params,undefined,false); 
			

			svc.listObjectChildren(params,cb);
		}
			service.ListObjectParentPaths=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"ObjectReference",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listObjectParentPaths(params,cb);
		}
			service.ListObjectParents=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"ConsistencyLevel",params,undefined,false); 
			copyArgs(Boolean(n),"IncludeAllLinksToEachParent",params,undefined,false); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"ObjectReference",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"ConsistencyLevel",params,undefined,false); 
			copyArgs(msg,"IncludeAllLinksToEachParent",params,undefined,false); 
			

			svc.listObjectParents(params,cb);
		}
			service.ListObjectPolicies=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"ConsistencyLevel",params,undefined,false); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"ObjectReference",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"ConsistencyLevel",params,undefined,false); 
			

			svc.listObjectPolicies(params,cb);
		}
			service.ListOutgoingTypedLinks=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			copyArgs(n,"FilterAttributeRanges",params,undefined,true); 
			copyArgs(n,"FilterTypedLink",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"ConsistencyLevel",params,undefined,false); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"ObjectReference",params,undefined,true); 
			copyArgs(msg,"FilterAttributeRanges",params,undefined,true); 
			copyArgs(msg,"FilterTypedLink",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"ConsistencyLevel",params,undefined,false); 
			

			svc.listOutgoingTypedLinks(params,cb);
		}
			service.ListPolicyAttachments=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"PolicyReference",params,undefined,true); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"PolicyReference",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"ConsistencyLevel",params,undefined,false); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"PolicyReference",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"ConsistencyLevel",params,undefined,false); 
			

			svc.listPolicyAttachments(params,cb);
		}
			service.ListPublishedSchemaArns=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"SchemaArn",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listPublishedSchemaArns(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.ListTypedLinkFacetAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"SchemaArn",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listTypedLinkFacetAttributes(params,cb);
		}
			service.ListTypedLinkFacetNames=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"SchemaArn",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.listTypedLinkFacetNames(params,cb);
		}
			service.LookupPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"ObjectReference",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			

			svc.lookupPolicy(params,cb);
		}
			service.PublishSchema=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DevelopmentSchemaArn",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			
			copyArgs(n,"DevelopmentSchemaArn",params,undefined,false); 
			copyArgs(n,"Version",params,undefined,false); 
			copyArgs(n,"MinorVersion",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"DevelopmentSchemaArn",params,undefined,false); 
			copyArgs(msg,"Version",params,undefined,false); 
			copyArgs(msg,"MinorVersion",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.publishSchema(params,cb);
		}
			service.PutSchemaFromJson=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"Document",params,undefined,false); 
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"Document",params,undefined,false); 
			
			copyArgs(msg,"SchemaArn",params,undefined,false); 
			copyArgs(msg,"Document",params,undefined,false); 
			

			svc.putSchemaFromJson(params,cb);
		}
			service.RemoveFacetFromObject=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"SchemaFacet",params,undefined,true); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"SchemaFacet",params,undefined,true); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"SchemaFacet",params,undefined,true); 
			copyArgs(msg,"ObjectReference",params,undefined,true); 
			

			svc.removeFacetFromObject(params,cb);
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
			service.UpdateFacet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"AttributeUpdates",params,undefined,false); 
			copyArgs(n,"ObjectType",params,undefined,false); 
			
			copyArgs(msg,"SchemaArn",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"AttributeUpdates",params,undefined,false); 
			copyArgs(msg,"ObjectType",params,undefined,false); 
			

			svc.updateFacet(params,cb);
		}
			service.UpdateLinkAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"TypedLinkSpecifier",params,undefined,true); 
			copyArgs(n,"AttributeUpdates",params,undefined,true); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"TypedLinkSpecifier",params,undefined,true); 
			copyArgs(n,"AttributeUpdates",params,undefined,true); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"TypedLinkSpecifier",params,undefined,true); 
			copyArgs(msg,"AttributeUpdates",params,undefined,true); 
			

			svc.updateLinkAttributes(params,cb);
		}
			service.UpdateObjectAttributes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			copyArgs(n,"AttributeUpdates",params,undefined,true); 
			
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(n,"ObjectReference",params,undefined,true); 
			copyArgs(n,"AttributeUpdates",params,undefined,true); 
			
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"ObjectReference",params,undefined,true); 
			copyArgs(msg,"AttributeUpdates",params,undefined,true); 
			

			svc.updateObjectAttributes(params,cb);
		}
			service.UpdateSchema=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"SchemaArn",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.updateSchema(params,cb);
		}
			service.UpdateTypedLinkFacet=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"AttributeUpdates",params,undefined,false); 
			copyArgs(n,"IdentityAttributeOrder",params,undefined,true); 
			
			copyArgs(n,"SchemaArn",params,undefined,false); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"AttributeUpdates",params,undefined,false); 
			copyArgs(n,"IdentityAttributeOrder",params,undefined,true); 
			
			copyArgs(msg,"SchemaArn",params,undefined,false); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"AttributeUpdates",params,undefined,false); 
			copyArgs(msg,"IdentityAttributeOrder",params,undefined,true); 
			

			svc.updateTypedLinkFacet(params,cb);
		}
			service.UpgradeAppliedSchema=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PublishedSchemaArn",params,undefined,false); 
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			
			copyArgs(n,"PublishedSchemaArn",params,undefined,false); 
			copyArgs(n,"DirectoryArn",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"PublishedSchemaArn",params,undefined,false); 
			copyArgs(msg,"DirectoryArn",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.upgradeAppliedSchema(params,cb);
		}
			service.UpgradePublishedSchema=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DevelopmentSchemaArn",params,undefined,false); 
			copyArgs(n,"PublishedSchemaArn",params,undefined,false); 
			copyArgs(n,"MinorVersion",params,undefined,false); 
			
			copyArgs(n,"DevelopmentSchemaArn",params,undefined,false); 
			copyArgs(n,"PublishedSchemaArn",params,undefined,false); 
			copyArgs(n,"MinorVersion",params,undefined,false); 
			copyArgs(Boolean(n),"DryRun",params,undefined,false); 
			
			copyArgs(msg,"DevelopmentSchemaArn",params,undefined,false); 
			copyArgs(msg,"PublishedSchemaArn",params,undefined,false); 
			copyArgs(msg,"MinorVersion",params,undefined,false); 
			copyArgs(msg,"DryRun",params,undefined,false); 
			

			svc.upgradePublishedSchema(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS CloudDirectory", AmazonAPINode);

};
