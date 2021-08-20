
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

		var awsService = new AWS.Location( { 'region': node.region } );
		
		node.on("input", function(msg) {
			var aService = msg.AWSConfig?new AWS.Location(msg.AWSConfig) : awsService;

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

		
		service.AssociateTrackerConsumer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConsumerArn",params,undefined,false); 
			copyArg(n,"TrackerName",params,undefined,false); 
			
			copyArg(msg,"ConsumerArn",params,undefined,false); 
			copyArg(msg,"TrackerName",params,undefined,false); 
			

			svc.associateTrackerConsumer(params,cb);
		}

		
		service.BatchDeleteDevicePositionHistory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeviceIds",params,undefined,false); 
			copyArg(n,"TrackerName",params,undefined,false); 
			
			copyArg(msg,"DeviceIds",params,undefined,false); 
			copyArg(msg,"TrackerName",params,undefined,false); 
			

			svc.batchDeleteDevicePositionHistory(params,cb);
		}

		
		service.BatchDeleteGeofence=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CollectionName",params,undefined,false); 
			copyArg(n,"GeofenceIds",params,undefined,false); 
			
			copyArg(msg,"CollectionName",params,undefined,false); 
			copyArg(msg,"GeofenceIds",params,undefined,false); 
			

			svc.batchDeleteGeofence(params,cb);
		}

		
		service.BatchEvaluateGeofences=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CollectionName",params,undefined,false); 
			copyArg(n,"DevicePositionUpdates",params,undefined,false); 
			
			copyArg(msg,"CollectionName",params,undefined,false); 
			copyArg(msg,"DevicePositionUpdates",params,undefined,false); 
			

			svc.batchEvaluateGeofences(params,cb);
		}

		
		service.BatchGetDevicePosition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeviceIds",params,undefined,false); 
			copyArg(n,"TrackerName",params,undefined,false); 
			
			copyArg(msg,"DeviceIds",params,undefined,false); 
			copyArg(msg,"TrackerName",params,undefined,false); 
			

			svc.batchGetDevicePosition(params,cb);
		}

		
		service.BatchPutGeofence=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CollectionName",params,undefined,false); 
			copyArg(n,"Entries",params,undefined,false); 
			
			copyArg(msg,"CollectionName",params,undefined,false); 
			copyArg(msg,"Entries",params,undefined,false); 
			

			svc.batchPutGeofence(params,cb);
		}

		
		service.BatchUpdateDevicePosition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TrackerName",params,undefined,false); 
			copyArg(n,"Updates",params,undefined,false); 
			
			copyArg(msg,"TrackerName",params,undefined,false); 
			copyArg(msg,"Updates",params,undefined,false); 
			

			svc.batchUpdateDevicePosition(params,cb);
		}

		
		service.CalculateRoute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CalculatorName",params,undefined,false); 
			copyArg(n,"DeparturePosition",params,undefined,true); 
			copyArg(n,"DestinationPosition",params,undefined,true); 
			
			copyArg(msg,"CalculatorName",params,undefined,false); 
			copyArg(msg,"CarModeOptions",params,undefined,false); 
			copyArg(msg,"DepartNow",params,undefined,false); 
			copyArg(msg,"DeparturePosition",params,undefined,true); 
			copyArg(msg,"DepartureTime",params,undefined,true); 
			copyArg(msg,"DestinationPosition",params,undefined,true); 
			copyArg(msg,"DistanceUnit",params,undefined,false); 
			copyArg(msg,"IncludeLegGeometry",params,undefined,false); 
			copyArg(msg,"TravelMode",params,undefined,false); 
			copyArg(msg,"TruckModeOptions",params,undefined,false); 
			copyArg(msg,"WaypointPositions",params,undefined,false); 
			

			svc.calculateRoute(params,cb);
		}

		
		service.CreateGeofenceCollection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CollectionName",params,undefined,false); 
			copyArg(n,"PricingPlan",params,undefined,false); 
			
			copyArg(msg,"CollectionName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"PricingPlan",params,undefined,false); 
			copyArg(msg,"PricingPlanDataSource",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createGeofenceCollection(params,cb);
		}

		
		service.CreateMap=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Configuration",params,undefined,true); 
			copyArg(n,"MapName",params,undefined,false); 
			copyArg(n,"PricingPlan",params,undefined,false); 
			
			copyArg(msg,"Configuration",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"MapName",params,undefined,false); 
			copyArg(msg,"PricingPlan",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createMap(params,cb);
		}

		
		service.CreatePlaceIndex=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DataSource",params,undefined,false); 
			copyArg(n,"IndexName",params,undefined,false); 
			copyArg(n,"PricingPlan",params,undefined,false); 
			
			copyArg(msg,"DataSource",params,undefined,false); 
			copyArg(msg,"DataSourceConfiguration",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"IndexName",params,undefined,false); 
			copyArg(msg,"PricingPlan",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createPlaceIndex(params,cb);
		}

		
		service.CreateRouteCalculator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CalculatorName",params,undefined,false); 
			copyArg(n,"DataSource",params,undefined,false); 
			copyArg(n,"PricingPlan",params,undefined,false); 
			
			copyArg(msg,"CalculatorName",params,undefined,false); 
			copyArg(msg,"DataSource",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"PricingPlan",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createRouteCalculator(params,cb);
		}

		
		service.CreateTracker=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PricingPlan",params,undefined,false); 
			copyArg(n,"TrackerName",params,undefined,false); 
			
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"PricingPlan",params,undefined,false); 
			copyArg(msg,"PricingPlanDataSource",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"TrackerName",params,undefined,false); 
			

			svc.createTracker(params,cb);
		}

		
		service.DeleteGeofenceCollection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CollectionName",params,undefined,false); 
			
			copyArg(msg,"CollectionName",params,undefined,false); 
			

			svc.deleteGeofenceCollection(params,cb);
		}

		
		service.DeleteMap=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MapName",params,undefined,false); 
			
			copyArg(msg,"MapName",params,undefined,false); 
			

			svc.deleteMap(params,cb);
		}

		
		service.DeletePlaceIndex=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IndexName",params,undefined,false); 
			
			copyArg(msg,"IndexName",params,undefined,false); 
			

			svc.deletePlaceIndex(params,cb);
		}

		
		service.DeleteRouteCalculator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CalculatorName",params,undefined,false); 
			
			copyArg(msg,"CalculatorName",params,undefined,false); 
			

			svc.deleteRouteCalculator(params,cb);
		}

		
		service.DeleteTracker=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TrackerName",params,undefined,false); 
			
			copyArg(msg,"TrackerName",params,undefined,false); 
			

			svc.deleteTracker(params,cb);
		}

		
		service.DescribeGeofenceCollection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CollectionName",params,undefined,false); 
			
			copyArg(msg,"CollectionName",params,undefined,false); 
			

			svc.describeGeofenceCollection(params,cb);
		}

		
		service.DescribeMap=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MapName",params,undefined,false); 
			
			copyArg(msg,"MapName",params,undefined,false); 
			

			svc.describeMap(params,cb);
		}

		
		service.DescribePlaceIndex=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IndexName",params,undefined,false); 
			
			copyArg(msg,"IndexName",params,undefined,false); 
			

			svc.describePlaceIndex(params,cb);
		}

		
		service.DescribeRouteCalculator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CalculatorName",params,undefined,false); 
			
			copyArg(msg,"CalculatorName",params,undefined,false); 
			

			svc.describeRouteCalculator(params,cb);
		}

		
		service.DescribeTracker=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TrackerName",params,undefined,false); 
			
			copyArg(msg,"TrackerName",params,undefined,false); 
			

			svc.describeTracker(params,cb);
		}

		
		service.DisassociateTrackerConsumer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConsumerArn",params,undefined,false); 
			copyArg(n,"TrackerName",params,undefined,false); 
			
			copyArg(msg,"ConsumerArn",params,undefined,false); 
			copyArg(msg,"TrackerName",params,undefined,false); 
			

			svc.disassociateTrackerConsumer(params,cb);
		}

		
		service.GetDevicePosition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeviceId",params,undefined,false); 
			copyArg(n,"TrackerName",params,undefined,false); 
			
			copyArg(msg,"DeviceId",params,undefined,false); 
			copyArg(msg,"TrackerName",params,undefined,false); 
			

			svc.getDevicePosition(params,cb);
		}

		
		service.GetDevicePositionHistory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeviceId",params,undefined,false); 
			copyArg(n,"TrackerName",params,undefined,false); 
			
			copyArg(msg,"DeviceId",params,undefined,false); 
			copyArg(msg,"EndTimeExclusive",params,undefined,true); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"StartTimeInclusive",params,undefined,true); 
			copyArg(msg,"TrackerName",params,undefined,false); 
			

			svc.getDevicePositionHistory(params,cb);
		}

		
		service.GetGeofence=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CollectionName",params,undefined,false); 
			copyArg(n,"GeofenceId",params,undefined,false); 
			
			copyArg(msg,"CollectionName",params,undefined,false); 
			copyArg(msg,"GeofenceId",params,undefined,false); 
			

			svc.getGeofence(params,cb);
		}

		
		service.GetMapGlyphs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FontStack",params,undefined,false); 
			copyArg(n,"FontUnicodeRange",params,undefined,false); 
			copyArg(n,"MapName",params,undefined,false); 
			
			copyArg(msg,"FontStack",params,undefined,false); 
			copyArg(msg,"FontUnicodeRange",params,undefined,false); 
			copyArg(msg,"MapName",params,undefined,false); 
			

			svc.getMapGlyphs(params,cb);
		}

		
		service.GetMapSprites=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FileName",params,undefined,false); 
			copyArg(n,"MapName",params,undefined,false); 
			
			copyArg(msg,"FileName",params,undefined,false); 
			copyArg(msg,"MapName",params,undefined,false); 
			

			svc.getMapSprites(params,cb);
		}

		
		service.GetMapStyleDescriptor=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MapName",params,undefined,false); 
			
			copyArg(msg,"MapName",params,undefined,false); 
			

			svc.getMapStyleDescriptor(params,cb);
		}

		
		service.GetMapTile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MapName",params,undefined,false); 
			copyArg(n,"X",params,undefined,false); 
			copyArg(n,"Y",params,undefined,false); 
			copyArg(n,"Z",params,undefined,false); 
			
			copyArg(msg,"MapName",params,undefined,false); 
			copyArg(msg,"X",params,undefined,false); 
			copyArg(msg,"Y",params,undefined,false); 
			copyArg(msg,"Z",params,undefined,false); 
			

			svc.getMapTile(params,cb);
		}

		
		service.ListDevicePositions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TrackerName",params,undefined,false); 
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"TrackerName",params,undefined,false); 
			

			svc.listDevicePositions(params,cb);
		}

		
		service.ListGeofenceCollections=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listGeofenceCollections(params,cb);
		}

		
		service.ListGeofences=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CollectionName",params,undefined,false); 
			
			copyArg(msg,"CollectionName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listGeofences(params,cb);
		}

		
		service.ListMaps=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listMaps(params,cb);
		}

		
		service.ListPlaceIndexes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listPlaceIndexes(params,cb);
		}

		
		service.ListRouteCalculators=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listRouteCalculators(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListTrackerConsumers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TrackerName",params,undefined,false); 
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"TrackerName",params,undefined,false); 
			

			svc.listTrackerConsumers(params,cb);
		}

		
		service.ListTrackers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listTrackers(params,cb);
		}

		
		service.PutGeofence=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CollectionName",params,undefined,false); 
			copyArg(n,"GeofenceId",params,undefined,false); 
			copyArg(n,"Geometry",params,undefined,true); 
			
			copyArg(msg,"CollectionName",params,undefined,false); 
			copyArg(msg,"GeofenceId",params,undefined,false); 
			copyArg(msg,"Geometry",params,undefined,true); 
			

			svc.putGeofence(params,cb);
		}

		
		service.SearchPlaceIndexForPosition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IndexName",params,undefined,false); 
			copyArg(n,"Position",params,undefined,true); 
			
			copyArg(msg,"IndexName",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"Position",params,undefined,true); 
			

			svc.searchPlaceIndexForPosition(params,cb);
		}

		
		service.SearchPlaceIndexForText=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IndexName",params,undefined,false); 
			copyArg(n,"Text",params,undefined,false); 
			
			copyArg(msg,"BiasPosition",params,undefined,true); 
			copyArg(msg,"FilterBBox",params,undefined,true); 
			copyArg(msg,"FilterCountries",params,undefined,true); 
			copyArg(msg,"IndexName",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"Text",params,undefined,false); 
			

			svc.searchPlaceIndexForText(params,cb);
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

		
		service.UpdateGeofenceCollection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CollectionName",params,undefined,false); 
			
			copyArg(msg,"CollectionName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"PricingPlan",params,undefined,false); 
			copyArg(msg,"PricingPlanDataSource",params,undefined,false); 
			

			svc.updateGeofenceCollection(params,cb);
		}

		
		service.UpdateMap=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"MapName",params,undefined,false); 
			
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"MapName",params,undefined,false); 
			copyArg(msg,"PricingPlan",params,undefined,false); 
			

			svc.updateMap(params,cb);
		}

		
		service.UpdatePlaceIndex=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IndexName",params,undefined,false); 
			
			copyArg(msg,"DataSourceConfiguration",params,undefined,true); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"IndexName",params,undefined,false); 
			copyArg(msg,"PricingPlan",params,undefined,false); 
			

			svc.updatePlaceIndex(params,cb);
		}

		
		service.UpdateRouteCalculator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CalculatorName",params,undefined,false); 
			
			copyArg(msg,"CalculatorName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"PricingPlan",params,undefined,false); 
			

			svc.updateRouteCalculator(params,cb);
		}

		
		service.UpdateTracker=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TrackerName",params,undefined,false); 
			
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"PricingPlan",params,undefined,false); 
			copyArg(msg,"PricingPlanDataSource",params,undefined,false); 
			copyArg(msg,"TrackerName",params,undefined,false); 
			

			svc.updateTracker(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS Location", AmazonAPINode);

};
