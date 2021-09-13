
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

		var awsService = new AWS.Location( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Location(msg.AWSConfig) : awsService;

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
		
		service.AssociateTrackerConsumer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConsumerArn",params,undefined,false); 
			copyArgs(n,"TrackerName",params,undefined,false); 
			
			copyArgs(n,"ConsumerArn",params,undefined,false); 
			copyArgs(n,"TrackerName",params,undefined,false); 
			
			copyArgs(msg,"ConsumerArn",params,undefined,false); 
			copyArgs(msg,"TrackerName",params,undefined,false); 
			

			svc.associateTrackerConsumer(params,cb);
		}
		
		service.BatchDeleteDevicePositionHistory=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeviceIds",params,undefined,false); 
			copyArgs(n,"TrackerName",params,undefined,false); 
			
			copyArgs(n,"DeviceIds",params,undefined,false); 
			copyArgs(n,"TrackerName",params,undefined,false); 
			
			copyArgs(msg,"DeviceIds",params,undefined,false); 
			copyArgs(msg,"TrackerName",params,undefined,false); 
			

			svc.batchDeleteDevicePositionHistory(params,cb);
		}
		
		service.BatchDeleteGeofence=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CollectionName",params,undefined,false); 
			copyArgs(n,"GeofenceIds",params,undefined,false); 
			
			copyArgs(n,"CollectionName",params,undefined,false); 
			copyArgs(n,"GeofenceIds",params,undefined,false); 
			
			copyArgs(msg,"CollectionName",params,undefined,false); 
			copyArgs(msg,"GeofenceIds",params,undefined,false); 
			

			svc.batchDeleteGeofence(params,cb);
		}
		
		service.BatchEvaluateGeofences=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CollectionName",params,undefined,false); 
			copyArgs(n,"DevicePositionUpdates",params,undefined,false); 
			
			copyArgs(n,"CollectionName",params,undefined,false); 
			copyArgs(n,"DevicePositionUpdates",params,undefined,false); 
			
			copyArgs(msg,"CollectionName",params,undefined,false); 
			copyArgs(msg,"DevicePositionUpdates",params,undefined,false); 
			

			svc.batchEvaluateGeofences(params,cb);
		}
		
		service.BatchGetDevicePosition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeviceIds",params,undefined,false); 
			copyArgs(n,"TrackerName",params,undefined,false); 
			
			copyArgs(n,"DeviceIds",params,undefined,false); 
			copyArgs(n,"TrackerName",params,undefined,false); 
			
			copyArgs(msg,"DeviceIds",params,undefined,false); 
			copyArgs(msg,"TrackerName",params,undefined,false); 
			

			svc.batchGetDevicePosition(params,cb);
		}
		
		service.BatchPutGeofence=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CollectionName",params,undefined,false); 
			copyArgs(n,"Entries",params,undefined,false); 
			
			copyArgs(n,"CollectionName",params,undefined,false); 
			copyArgs(n,"Entries",params,undefined,false); 
			
			copyArgs(msg,"CollectionName",params,undefined,false); 
			copyArgs(msg,"Entries",params,undefined,false); 
			

			svc.batchPutGeofence(params,cb);
		}
		
		service.BatchUpdateDevicePosition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrackerName",params,undefined,false); 
			copyArgs(n,"Updates",params,undefined,false); 
			
			copyArgs(n,"TrackerName",params,undefined,false); 
			copyArgs(n,"Updates",params,undefined,false); 
			
			copyArgs(msg,"TrackerName",params,undefined,false); 
			copyArgs(msg,"Updates",params,undefined,false); 
			

			svc.batchUpdateDevicePosition(params,cb);
		}
		
		service.CalculateRoute=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CalculatorName",params,undefined,false); 
			copyArgs(n,"DeparturePosition",params,undefined,true); 
			copyArgs(n,"DestinationPosition",params,undefined,true); 
			
			copyArgs(n,"CalculatorName",params,undefined,false); 
			copyArgs(n,"CarModeOptions",params,undefined,false); 
			copyArgs(Boolean(n),"DepartNow",params,undefined,false); 
			copyArgs(n,"DeparturePosition",params,undefined,true); 
			copyArgs(n,"DepartureTime",params,undefined,true); 
			copyArgs(n,"DestinationPosition",params,undefined,true); 
			copyArgs(n,"DistanceUnit",params,undefined,false); 
			copyArgs(Boolean(n),"IncludeLegGeometry",params,undefined,false); 
			copyArgs(n,"TravelMode",params,undefined,false); 
			copyArgs(n,"TruckModeOptions",params,undefined,false); 
			copyArgs(n,"WaypointPositions",params,undefined,false); 
			
			copyArgs(msg,"CalculatorName",params,undefined,false); 
			copyArgs(msg,"CarModeOptions",params,undefined,false); 
			copyArgs(msg,"DepartNow",params,undefined,false); 
			copyArgs(msg,"DeparturePosition",params,undefined,true); 
			copyArgs(msg,"DepartureTime",params,undefined,true); 
			copyArgs(msg,"DestinationPosition",params,undefined,true); 
			copyArgs(msg,"DistanceUnit",params,undefined,false); 
			copyArgs(msg,"IncludeLegGeometry",params,undefined,false); 
			copyArgs(msg,"TravelMode",params,undefined,false); 
			copyArgs(msg,"TruckModeOptions",params,undefined,false); 
			copyArgs(msg,"WaypointPositions",params,undefined,false); 
			

			svc.calculateRoute(params,cb);
		}
		
		service.CreateGeofenceCollection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CollectionName",params,undefined,false); 
			copyArgs(n,"PricingPlan",params,undefined,false); 
			
			copyArgs(n,"CollectionName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"PricingPlan",params,undefined,false); 
			copyArgs(n,"PricingPlanDataSource",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"CollectionName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"PricingPlan",params,undefined,false); 
			copyArgs(msg,"PricingPlanDataSource",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createGeofenceCollection(params,cb);
		}
		
		service.CreateMap=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Configuration",params,undefined,true); 
			copyArgs(n,"MapName",params,undefined,false); 
			copyArgs(n,"PricingPlan",params,undefined,false); 
			
			copyArgs(n,"Configuration",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"MapName",params,undefined,false); 
			copyArgs(n,"PricingPlan",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"Configuration",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"MapName",params,undefined,false); 
			copyArgs(msg,"PricingPlan",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createMap(params,cb);
		}
		
		service.CreatePlaceIndex=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DataSource",params,undefined,false); 
			copyArgs(n,"IndexName",params,undefined,false); 
			copyArgs(n,"PricingPlan",params,undefined,false); 
			
			copyArgs(n,"DataSource",params,undefined,false); 
			copyArgs(n,"DataSourceConfiguration",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"IndexName",params,undefined,false); 
			copyArgs(n,"PricingPlan",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"DataSource",params,undefined,false); 
			copyArgs(msg,"DataSourceConfiguration",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"IndexName",params,undefined,false); 
			copyArgs(msg,"PricingPlan",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createPlaceIndex(params,cb);
		}
		
		service.CreateRouteCalculator=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CalculatorName",params,undefined,false); 
			copyArgs(n,"DataSource",params,undefined,false); 
			copyArgs(n,"PricingPlan",params,undefined,false); 
			
			copyArgs(n,"CalculatorName",params,undefined,false); 
			copyArgs(n,"DataSource",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"PricingPlan",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"CalculatorName",params,undefined,false); 
			copyArgs(msg,"DataSource",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"PricingPlan",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createRouteCalculator(params,cb);
		}
		
		service.CreateTracker=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"PricingPlan",params,undefined,false); 
			copyArgs(n,"TrackerName",params,undefined,false); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"KmsKeyId",params,undefined,false); 
			copyArgs(n,"PricingPlan",params,undefined,false); 
			copyArgs(n,"PricingPlanDataSource",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"TrackerName",params,undefined,false); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"KmsKeyId",params,undefined,false); 
			copyArgs(msg,"PricingPlan",params,undefined,false); 
			copyArgs(msg,"PricingPlanDataSource",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"TrackerName",params,undefined,false); 
			

			svc.createTracker(params,cb);
		}
		
		service.DeleteGeofenceCollection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CollectionName",params,undefined,false); 
			
			copyArgs(n,"CollectionName",params,undefined,false); 
			
			copyArgs(msg,"CollectionName",params,undefined,false); 
			

			svc.deleteGeofenceCollection(params,cb);
		}
		
		service.DeleteMap=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MapName",params,undefined,false); 
			
			copyArgs(n,"MapName",params,undefined,false); 
			
			copyArgs(msg,"MapName",params,undefined,false); 
			

			svc.deleteMap(params,cb);
		}
		
		service.DeletePlaceIndex=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IndexName",params,undefined,false); 
			
			copyArgs(n,"IndexName",params,undefined,false); 
			
			copyArgs(msg,"IndexName",params,undefined,false); 
			

			svc.deletePlaceIndex(params,cb);
		}
		
		service.DeleteRouteCalculator=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CalculatorName",params,undefined,false); 
			
			copyArgs(n,"CalculatorName",params,undefined,false); 
			
			copyArgs(msg,"CalculatorName",params,undefined,false); 
			

			svc.deleteRouteCalculator(params,cb);
		}
		
		service.DeleteTracker=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrackerName",params,undefined,false); 
			
			copyArgs(n,"TrackerName",params,undefined,false); 
			
			copyArgs(msg,"TrackerName",params,undefined,false); 
			

			svc.deleteTracker(params,cb);
		}
		
		service.DescribeGeofenceCollection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CollectionName",params,undefined,false); 
			
			copyArgs(n,"CollectionName",params,undefined,false); 
			
			copyArgs(msg,"CollectionName",params,undefined,false); 
			

			svc.describeGeofenceCollection(params,cb);
		}
		
		service.DescribeMap=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MapName",params,undefined,false); 
			
			copyArgs(n,"MapName",params,undefined,false); 
			
			copyArgs(msg,"MapName",params,undefined,false); 
			

			svc.describeMap(params,cb);
		}
		
		service.DescribePlaceIndex=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IndexName",params,undefined,false); 
			
			copyArgs(n,"IndexName",params,undefined,false); 
			
			copyArgs(msg,"IndexName",params,undefined,false); 
			

			svc.describePlaceIndex(params,cb);
		}
		
		service.DescribeRouteCalculator=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CalculatorName",params,undefined,false); 
			
			copyArgs(n,"CalculatorName",params,undefined,false); 
			
			copyArgs(msg,"CalculatorName",params,undefined,false); 
			

			svc.describeRouteCalculator(params,cb);
		}
		
		service.DescribeTracker=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrackerName",params,undefined,false); 
			
			copyArgs(n,"TrackerName",params,undefined,false); 
			
			copyArgs(msg,"TrackerName",params,undefined,false); 
			

			svc.describeTracker(params,cb);
		}
		
		service.DisassociateTrackerConsumer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ConsumerArn",params,undefined,false); 
			copyArgs(n,"TrackerName",params,undefined,false); 
			
			copyArgs(n,"ConsumerArn",params,undefined,false); 
			copyArgs(n,"TrackerName",params,undefined,false); 
			
			copyArgs(msg,"ConsumerArn",params,undefined,false); 
			copyArgs(msg,"TrackerName",params,undefined,false); 
			

			svc.disassociateTrackerConsumer(params,cb);
		}
		
		service.GetDevicePosition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeviceId",params,undefined,false); 
			copyArgs(n,"TrackerName",params,undefined,false); 
			
			copyArgs(n,"DeviceId",params,undefined,false); 
			copyArgs(n,"TrackerName",params,undefined,false); 
			
			copyArgs(msg,"DeviceId",params,undefined,false); 
			copyArgs(msg,"TrackerName",params,undefined,false); 
			

			svc.getDevicePosition(params,cb);
		}
		
		service.GetDevicePositionHistory=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DeviceId",params,undefined,false); 
			copyArgs(n,"TrackerName",params,undefined,false); 
			
			copyArgs(n,"DeviceId",params,undefined,false); 
			copyArgs(n,"EndTimeExclusive",params,undefined,true); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"StartTimeInclusive",params,undefined,true); 
			copyArgs(n,"TrackerName",params,undefined,false); 
			
			copyArgs(msg,"DeviceId",params,undefined,false); 
			copyArgs(msg,"EndTimeExclusive",params,undefined,true); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"StartTimeInclusive",params,undefined,true); 
			copyArgs(msg,"TrackerName",params,undefined,false); 
			

			svc.getDevicePositionHistory(params,cb);
		}
		
		service.GetGeofence=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CollectionName",params,undefined,false); 
			copyArgs(n,"GeofenceId",params,undefined,false); 
			
			copyArgs(n,"CollectionName",params,undefined,false); 
			copyArgs(n,"GeofenceId",params,undefined,false); 
			
			copyArgs(msg,"CollectionName",params,undefined,false); 
			copyArgs(msg,"GeofenceId",params,undefined,false); 
			

			svc.getGeofence(params,cb);
		}
		
		service.GetMapGlyphs=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FontStack",params,undefined,false); 
			copyArgs(n,"FontUnicodeRange",params,undefined,false); 
			copyArgs(n,"MapName",params,undefined,false); 
			
			copyArgs(n,"FontStack",params,undefined,false); 
			copyArgs(n,"FontUnicodeRange",params,undefined,false); 
			copyArgs(n,"MapName",params,undefined,false); 
			
			copyArgs(msg,"FontStack",params,undefined,false); 
			copyArgs(msg,"FontUnicodeRange",params,undefined,false); 
			copyArgs(msg,"MapName",params,undefined,false); 
			

			svc.getMapGlyphs(params,cb);
		}
		
		service.GetMapSprites=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"FileName",params,undefined,false); 
			copyArgs(n,"MapName",params,undefined,false); 
			
			copyArgs(n,"FileName",params,undefined,false); 
			copyArgs(n,"MapName",params,undefined,false); 
			
			copyArgs(msg,"FileName",params,undefined,false); 
			copyArgs(msg,"MapName",params,undefined,false); 
			

			svc.getMapSprites(params,cb);
		}
		
		service.GetMapStyleDescriptor=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MapName",params,undefined,false); 
			
			copyArgs(n,"MapName",params,undefined,false); 
			
			copyArgs(msg,"MapName",params,undefined,false); 
			

			svc.getMapStyleDescriptor(params,cb);
		}
		
		service.GetMapTile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MapName",params,undefined,false); 
			copyArgs(n,"X",params,undefined,false); 
			copyArgs(n,"Y",params,undefined,false); 
			copyArgs(n,"Z",params,undefined,false); 
			
			copyArgs(n,"MapName",params,undefined,false); 
			copyArgs(n,"X",params,undefined,false); 
			copyArgs(n,"Y",params,undefined,false); 
			copyArgs(n,"Z",params,undefined,false); 
			
			copyArgs(msg,"MapName",params,undefined,false); 
			copyArgs(msg,"X",params,undefined,false); 
			copyArgs(msg,"Y",params,undefined,false); 
			copyArgs(msg,"Z",params,undefined,false); 
			

			svc.getMapTile(params,cb);
		}
		
		service.ListDevicePositions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrackerName",params,undefined,false); 
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"TrackerName",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"TrackerName",params,undefined,false); 
			

			svc.listDevicePositions(params,cb);
		}
		
		service.ListGeofenceCollections=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listGeofenceCollections(params,cb);
		}
		
		service.ListGeofences=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CollectionName",params,undefined,false); 
			
			copyArgs(n,"CollectionName",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"CollectionName",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listGeofences(params,cb);
		}
		
		service.ListMaps=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listMaps(params,cb);
		}
		
		service.ListPlaceIndexes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listPlaceIndexes(params,cb);
		}
		
		service.ListRouteCalculators=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listRouteCalculators(params,cb);
		}
		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
		
		service.ListTrackerConsumers=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrackerName",params,undefined,false); 
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"TrackerName",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"TrackerName",params,undefined,false); 
			

			svc.listTrackerConsumers(params,cb);
		}
		
		service.ListTrackers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listTrackers(params,cb);
		}
		
		service.PutGeofence=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CollectionName",params,undefined,false); 
			copyArgs(n,"GeofenceId",params,undefined,false); 
			copyArgs(n,"Geometry",params,undefined,true); 
			
			copyArgs(n,"CollectionName",params,undefined,false); 
			copyArgs(n,"GeofenceId",params,undefined,false); 
			copyArgs(n,"Geometry",params,undefined,true); 
			
			copyArgs(msg,"CollectionName",params,undefined,false); 
			copyArgs(msg,"GeofenceId",params,undefined,false); 
			copyArgs(msg,"Geometry",params,undefined,true); 
			

			svc.putGeofence(params,cb);
		}
		
		service.SearchPlaceIndexForPosition=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IndexName",params,undefined,false); 
			copyArgs(n,"Position",params,undefined,true); 
			
			copyArgs(n,"IndexName",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"Position",params,undefined,true); 
			
			copyArgs(msg,"IndexName",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"Position",params,undefined,true); 
			

			svc.searchPlaceIndexForPosition(params,cb);
		}
		
		service.SearchPlaceIndexForText=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IndexName",params,undefined,false); 
			copyArgs(n,"Text",params,undefined,false); 
			
			copyArgs(n,"BiasPosition",params,undefined,true); 
			copyArgs(n,"FilterBBox",params,undefined,true); 
			copyArgs(n,"FilterCountries",params,undefined,true); 
			copyArgs(n,"IndexName",params,undefined,false); 
			copyArgs(Number(n),"MaxResults",params,undefined,false); 
			copyArgs(n,"Text",params,undefined,false); 
			
			copyArgs(msg,"BiasPosition",params,undefined,true); 
			copyArgs(msg,"FilterBBox",params,undefined,true); 
			copyArgs(msg,"FilterCountries",params,undefined,true); 
			copyArgs(msg,"IndexName",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"Text",params,undefined,false); 
			

			svc.searchPlaceIndexForText(params,cb);
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
		
		service.UpdateGeofenceCollection=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CollectionName",params,undefined,false); 
			
			copyArgs(n,"CollectionName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"PricingPlan",params,undefined,false); 
			copyArgs(n,"PricingPlanDataSource",params,undefined,false); 
			
			copyArgs(msg,"CollectionName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"PricingPlan",params,undefined,false); 
			copyArgs(msg,"PricingPlanDataSource",params,undefined,false); 
			

			svc.updateGeofenceCollection(params,cb);
		}
		
		service.UpdateMap=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"MapName",params,undefined,false); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"MapName",params,undefined,false); 
			copyArgs(n,"PricingPlan",params,undefined,false); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"MapName",params,undefined,false); 
			copyArgs(msg,"PricingPlan",params,undefined,false); 
			

			svc.updateMap(params,cb);
		}
		
		service.UpdatePlaceIndex=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"IndexName",params,undefined,false); 
			
			copyArgs(n,"DataSourceConfiguration",params,undefined,true); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"IndexName",params,undefined,false); 
			copyArgs(n,"PricingPlan",params,undefined,false); 
			
			copyArgs(msg,"DataSourceConfiguration",params,undefined,true); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"IndexName",params,undefined,false); 
			copyArgs(msg,"PricingPlan",params,undefined,false); 
			

			svc.updatePlaceIndex(params,cb);
		}
		
		service.UpdateRouteCalculator=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"CalculatorName",params,undefined,false); 
			
			copyArgs(n,"CalculatorName",params,undefined,false); 
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"PricingPlan",params,undefined,false); 
			
			copyArgs(msg,"CalculatorName",params,undefined,false); 
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"PricingPlan",params,undefined,false); 
			

			svc.updateRouteCalculator(params,cb);
		}
		
		service.UpdateTracker=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"TrackerName",params,undefined,false); 
			
			copyArgs(n,"Description",params,undefined,false); 
			copyArgs(n,"PricingPlan",params,undefined,false); 
			copyArgs(n,"PricingPlanDataSource",params,undefined,false); 
			copyArgs(n,"TrackerName",params,undefined,false); 
			
			copyArgs(msg,"Description",params,undefined,false); 
			copyArgs(msg,"PricingPlan",params,undefined,false); 
			copyArgs(msg,"PricingPlanDataSource",params,undefined,false); 
			copyArgs(msg,"TrackerName",params,undefined,false); 
			

			svc.updateTracker(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS Location", AmazonAPINode);

};
