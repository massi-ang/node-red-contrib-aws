
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

		var awsService = new AWS.MediaTailor( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.MediaTailor(msg.AWSConfig) : awsService;

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

		
		service.CreateChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelName",params,undefined,false); 
			copyArgs(n,"Outputs",params,undefined,true); 
			copyArgs(n,"PlaybackMode",params,undefined,false); 
			
			copyArgs(n,"ChannelName",params,undefined,false); 
			copyArgs(n,"FillerSlate",params,undefined,true); 
			copyArgs(n,"Outputs",params,undefined,true); 
			copyArgs(n,"PlaybackMode",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"ChannelName",params,undefined,false); 
			copyArgs(msg,"FillerSlate",params,undefined,true); 
			copyArgs(msg,"Outputs",params,undefined,true); 
			copyArgs(msg,"PlaybackMode",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createChannel(params,cb);
		}

		
		service.CreateProgram=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelName",params,undefined,false); 
			copyArgs(n,"ProgramName",params,undefined,false); 
			copyArgs(n,"VodSourceName",params,undefined,false); 
			copyArgs(n,"ScheduleConfiguration",params,undefined,false); 
			copyArgs(n,"SourceLocationName",params,undefined,false); 
			
			copyArgs(n,"AdBreaks",params,undefined,true); 
			copyArgs(n,"ChannelName",params,undefined,false); 
			copyArgs(n,"ProgramName",params,undefined,false); 
			copyArgs(n,"ScheduleConfiguration",params,undefined,false); 
			copyArgs(n,"SourceLocationName",params,undefined,false); 
			copyArgs(n,"VodSourceName",params,undefined,false); 
			
			copyArgs(msg,"AdBreaks",params,undefined,true); 
			copyArgs(msg,"ChannelName",params,undefined,false); 
			copyArgs(msg,"ProgramName",params,undefined,false); 
			copyArgs(msg,"ScheduleConfiguration",params,undefined,false); 
			copyArgs(msg,"SourceLocationName",params,undefined,false); 
			copyArgs(msg,"VodSourceName",params,undefined,false); 
			

			svc.createProgram(params,cb);
		}

		
		service.CreateSourceLocation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceLocationName",params,undefined,false); 
			copyArgs(n,"HttpConfiguration",params,undefined,true); 
			
			copyArgs(n,"AccessConfiguration",params,undefined,true); 
			copyArgs(n,"DefaultSegmentDeliveryConfiguration",params,undefined,true); 
			copyArgs(n,"HttpConfiguration",params,undefined,true); 
			copyArgs(n,"SourceLocationName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			
			copyArgs(msg,"AccessConfiguration",params,undefined,true); 
			copyArgs(msg,"DefaultSegmentDeliveryConfiguration",params,undefined,true); 
			copyArgs(msg,"HttpConfiguration",params,undefined,true); 
			copyArgs(msg,"SourceLocationName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			

			svc.createSourceLocation(params,cb);
		}

		
		service.CreateVodSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceLocationName",params,undefined,false); 
			copyArgs(n,"VodSourceName",params,undefined,false); 
			copyArgs(n,"HttpPackageConfigurations",params,undefined,true); 
			
			copyArgs(n,"HttpPackageConfigurations",params,undefined,true); 
			copyArgs(n,"SourceLocationName",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"VodSourceName",params,undefined,false); 
			
			copyArgs(msg,"HttpPackageConfigurations",params,undefined,true); 
			copyArgs(msg,"SourceLocationName",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"VodSourceName",params,undefined,false); 
			

			svc.createVodSource(params,cb);
		}

		
		service.DeleteChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelName",params,undefined,false); 
			
			copyArgs(n,"ChannelName",params,undefined,false); 
			
			copyArgs(msg,"ChannelName",params,undefined,false); 
			

			svc.deleteChannel(params,cb);
		}

		
		service.DeleteChannelPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelName",params,undefined,false); 
			
			copyArgs(n,"ChannelName",params,undefined,false); 
			
			copyArgs(msg,"ChannelName",params,undefined,false); 
			

			svc.deleteChannelPolicy(params,cb);
		}

		
		service.DeletePlaybackConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.deletePlaybackConfiguration(params,cb);
		}

		
		service.DeleteProgram=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelName",params,undefined,false); 
			copyArgs(n,"ProgramName",params,undefined,false); 
			
			copyArgs(n,"ChannelName",params,undefined,false); 
			copyArgs(n,"ProgramName",params,undefined,false); 
			
			copyArgs(msg,"ChannelName",params,undefined,false); 
			copyArgs(msg,"ProgramName",params,undefined,false); 
			

			svc.deleteProgram(params,cb);
		}

		
		service.DeleteSourceLocation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceLocationName",params,undefined,false); 
			
			copyArgs(n,"SourceLocationName",params,undefined,false); 
			
			copyArgs(msg,"SourceLocationName",params,undefined,false); 
			

			svc.deleteSourceLocation(params,cb);
		}

		
		service.DeleteVodSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceLocationName",params,undefined,false); 
			copyArgs(n,"VodSourceName",params,undefined,false); 
			
			copyArgs(n,"SourceLocationName",params,undefined,false); 
			copyArgs(n,"VodSourceName",params,undefined,false); 
			
			copyArgs(msg,"SourceLocationName",params,undefined,false); 
			copyArgs(msg,"VodSourceName",params,undefined,false); 
			

			svc.deleteVodSource(params,cb);
		}

		
		service.DescribeChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelName",params,undefined,false); 
			
			copyArgs(n,"ChannelName",params,undefined,false); 
			
			copyArgs(msg,"ChannelName",params,undefined,false); 
			

			svc.describeChannel(params,cb);
		}

		
		service.DescribeProgram=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelName",params,undefined,false); 
			copyArgs(n,"ProgramName",params,undefined,false); 
			
			copyArgs(n,"ChannelName",params,undefined,false); 
			copyArgs(n,"ProgramName",params,undefined,false); 
			
			copyArgs(msg,"ChannelName",params,undefined,false); 
			copyArgs(msg,"ProgramName",params,undefined,false); 
			

			svc.describeProgram(params,cb);
		}

		
		service.DescribeSourceLocation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceLocationName",params,undefined,false); 
			
			copyArgs(n,"SourceLocationName",params,undefined,false); 
			
			copyArgs(msg,"SourceLocationName",params,undefined,false); 
			

			svc.describeSourceLocation(params,cb);
		}

		
		service.DescribeVodSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceLocationName",params,undefined,false); 
			copyArgs(n,"VodSourceName",params,undefined,false); 
			
			copyArgs(n,"SourceLocationName",params,undefined,false); 
			copyArgs(n,"VodSourceName",params,undefined,false); 
			
			copyArgs(msg,"SourceLocationName",params,undefined,false); 
			copyArgs(msg,"VodSourceName",params,undefined,false); 
			

			svc.describeVodSource(params,cb);
		}

		
		service.GetChannelPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelName",params,undefined,false); 
			
			copyArgs(n,"ChannelName",params,undefined,false); 
			
			copyArgs(msg,"ChannelName",params,undefined,false); 
			

			svc.getChannelPolicy(params,cb);
		}

		
		service.GetChannelSchedule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelName",params,undefined,false); 
			
			copyArgs(n,"ChannelName",params,undefined,false); 
			copyArgs(n,"DurationMinutes",params,undefined,false); 
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"ChannelName",params,undefined,false); 
			copyArgs(msg,"DurationMinutes",params,undefined,false); 
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.getChannelSchedule(params,cb);
		}

		
		service.GetPlaybackConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(n,"Name",params,undefined,false); 
			
			copyArgs(msg,"Name",params,undefined,false); 
			

			svc.getPlaybackConfiguration(params,cb);
		}

		
		service.ListAlerts=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listAlerts(params,cb);
		}

		
		service.ListChannels=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listChannels(params,cb);
		}

		
		service.ListPlaybackConfigurations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listPlaybackConfigurations(params,cb);
		}

		
		service.ListSourceLocations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			

			svc.listSourceLocations(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListVodSources=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceLocationName",params,undefined,false); 
			
			copyArgs(n,"MaxResults",params,undefined,false); 
			copyArgs(n,"NextToken",params,undefined,false); 
			copyArgs(n,"SourceLocationName",params,undefined,false); 
			
			copyArgs(msg,"MaxResults",params,undefined,false); 
			copyArgs(msg,"NextToken",params,undefined,false); 
			copyArgs(msg,"SourceLocationName",params,undefined,false); 
			

			svc.listVodSources(params,cb);
		}

		
		service.PutChannelPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelName",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(n,"ChannelName",params,undefined,false); 
			copyArgs(n,"Policy",params,undefined,false); 
			
			copyArgs(msg,"ChannelName",params,undefined,false); 
			copyArgs(msg,"Policy",params,undefined,false); 
			

			svc.putChannelPolicy(params,cb);
		}

		
		service.PutPlaybackConfiguration=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"AdDecisionServerUrl",params,undefined,false); 
			copyArgs(n,"AvailSuppression",params,undefined,true); 
			copyArgs(n,"Bumper",params,undefined,true); 
			copyArgs(n,"CdnConfiguration",params,undefined,true); 
			copyArgs(n,"ConfigurationAliases",params,undefined,false); 
			copyArgs(n,"DashConfiguration",params,undefined,false); 
			copyArgs(n,"LivePreRollConfiguration",params,undefined,true); 
			copyArgs(n,"ManifestProcessingRules",params,undefined,true); 
			copyArgs(n,"Name",params,undefined,false); 
			copyArgs(n,"PersonalizationThresholdSeconds",params,undefined,false); 
			copyArgs(n,"SlateAdUrl",params,undefined,false); 
			copyArgs(n,"Tags",params,undefined,true); 
			copyArgs(n,"TranscodeProfileName",params,undefined,false); 
			copyArgs(n,"VideoContentSourceUrl",params,undefined,false); 
			
			copyArgs(msg,"AdDecisionServerUrl",params,undefined,false); 
			copyArgs(msg,"AvailSuppression",params,undefined,true); 
			copyArgs(msg,"Bumper",params,undefined,true); 
			copyArgs(msg,"CdnConfiguration",params,undefined,true); 
			copyArgs(msg,"ConfigurationAliases",params,undefined,false); 
			copyArgs(msg,"DashConfiguration",params,undefined,false); 
			copyArgs(msg,"LivePreRollConfiguration",params,undefined,true); 
			copyArgs(msg,"ManifestProcessingRules",params,undefined,true); 
			copyArgs(msg,"Name",params,undefined,false); 
			copyArgs(msg,"PersonalizationThresholdSeconds",params,undefined,false); 
			copyArgs(msg,"SlateAdUrl",params,undefined,false); 
			copyArgs(msg,"Tags",params,undefined,true); 
			copyArgs(msg,"TranscodeProfileName",params,undefined,false); 
			copyArgs(msg,"VideoContentSourceUrl",params,undefined,false); 
			

			svc.putPlaybackConfiguration(params,cb);
		}

		
		service.StartChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelName",params,undefined,false); 
			
			copyArgs(n,"ChannelName",params,undefined,false); 
			
			copyArgs(msg,"ChannelName",params,undefined,false); 
			

			svc.startChannel(params,cb);
		}

		
		service.StopChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelName",params,undefined,false); 
			
			copyArgs(n,"ChannelName",params,undefined,false); 
			
			copyArgs(msg,"ChannelName",params,undefined,false); 
			

			svc.stopChannel(params,cb);
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
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(n,"ResourceArn",params,undefined,false); 
			copyArgs(n,"TagKeys",params,undefined,true); 
			
			copyArgs(msg,"ResourceArn",params,undefined,false); 
			copyArgs(msg,"TagKeys",params,undefined,true); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateChannel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ChannelName",params,undefined,false); 
			copyArgs(n,"Outputs",params,undefined,true); 
			
			copyArgs(n,"ChannelName",params,undefined,false); 
			copyArgs(n,"Outputs",params,undefined,true); 
			
			copyArgs(msg,"ChannelName",params,undefined,false); 
			copyArgs(msg,"Outputs",params,undefined,true); 
			

			svc.updateChannel(params,cb);
		}

		
		service.UpdateSourceLocation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceLocationName",params,undefined,false); 
			copyArgs(n,"HttpConfiguration",params,undefined,true); 
			
			copyArgs(n,"AccessConfiguration",params,undefined,true); 
			copyArgs(n,"DefaultSegmentDeliveryConfiguration",params,undefined,true); 
			copyArgs(n,"HttpConfiguration",params,undefined,true); 
			copyArgs(n,"SourceLocationName",params,undefined,false); 
			
			copyArgs(msg,"AccessConfiguration",params,undefined,true); 
			copyArgs(msg,"DefaultSegmentDeliveryConfiguration",params,undefined,true); 
			copyArgs(msg,"HttpConfiguration",params,undefined,true); 
			copyArgs(msg,"SourceLocationName",params,undefined,false); 
			

			svc.updateSourceLocation(params,cb);
		}

		
		service.UpdateVodSource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"SourceLocationName",params,undefined,false); 
			copyArgs(n,"VodSourceName",params,undefined,false); 
			copyArgs(n,"HttpPackageConfigurations",params,undefined,true); 
			
			copyArgs(n,"HttpPackageConfigurations",params,undefined,true); 
			copyArgs(n,"SourceLocationName",params,undefined,false); 
			copyArgs(n,"VodSourceName",params,undefined,false); 
			
			copyArgs(msg,"HttpPackageConfigurations",params,undefined,true); 
			copyArgs(msg,"SourceLocationName",params,undefined,false); 
			copyArgs(msg,"VodSourceName",params,undefined,false); 
			

			svc.updateVodSource(params,cb);
		}

		 

	}
	RED.nodes.registerType("AWS MediaTailor", AmazonAPINode);

};
