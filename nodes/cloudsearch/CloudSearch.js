
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

		var awsService = new AWS.CloudSearch( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.CloudSearch(msg.AWSConfig) : awsService;

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
		
		service.BuildSuggesters=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			

			svc.buildSuggesters(params,cb);
		}
		
		service.CreateDomain=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			

			svc.createDomain(params,cb);
		}
		
		service.DefineAnalysisScheme=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"AnalysisScheme",params,undefined,true); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"AnalysisScheme",params,undefined,true); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"AnalysisScheme",params,undefined,true); 
			

			svc.defineAnalysisScheme(params,cb);
		}
		
		service.DefineExpression=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"Expression",params,undefined,true); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"Expression",params,undefined,true); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"Expression",params,undefined,true); 
			

			svc.defineExpression(params,cb);
		}
		
		service.DefineIndexField=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"IndexField",params,undefined,true); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"IndexField",params,undefined,true); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"IndexField",params,undefined,true); 
			

			svc.defineIndexField(params,cb);
		}
		
		service.DefineSuggester=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"Suggester",params,undefined,true); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"Suggester",params,undefined,true); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"Suggester",params,undefined,true); 
			

			svc.defineSuggester(params,cb);
		}
		
		service.DeleteAnalysisScheme=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"AnalysisSchemeName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"AnalysisSchemeName",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"AnalysisSchemeName",params,undefined,false); 
			

			svc.deleteAnalysisScheme(params,cb);
		}
		
		service.DeleteDomain=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			

			svc.deleteDomain(params,cb);
		}
		
		service.DeleteExpression=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"ExpressionName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"ExpressionName",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"ExpressionName",params,undefined,false); 
			

			svc.deleteExpression(params,cb);
		}
		
		service.DeleteIndexField=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"IndexFieldName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"IndexFieldName",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"IndexFieldName",params,undefined,false); 
			

			svc.deleteIndexField(params,cb);
		}
		
		service.DeleteSuggester=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"SuggesterName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"SuggesterName",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"SuggesterName",params,undefined,false); 
			

			svc.deleteSuggester(params,cb);
		}
		
		service.DescribeAnalysisSchemes=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"AnalysisSchemeNames",params,undefined,true); 
			copyArgs(Boolean(n),"Deployed",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"AnalysisSchemeNames",params,undefined,true); 
			copyArgs(msg,"Deployed",params,undefined,false); 
			

			svc.describeAnalysisSchemes(params,cb);
		}
		
		service.DescribeAvailabilityOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(Boolean(n),"Deployed",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"Deployed",params,undefined,false); 
			

			svc.describeAvailabilityOptions(params,cb);
		}
		
		service.DescribeDomainEndpointOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(Boolean(n),"Deployed",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"Deployed",params,undefined,false); 
			

			svc.describeDomainEndpointOptions(params,cb);
		}
		
		service.DescribeDomains=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"DomainNames",params,undefined,false); 
			
			copyArgs(msg,"DomainNames",params,undefined,false); 
			

			svc.describeDomains(params,cb);
		}
		
		service.DescribeExpressions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"ExpressionNames",params,undefined,true); 
			copyArgs(Boolean(n),"Deployed",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"ExpressionNames",params,undefined,true); 
			copyArgs(msg,"Deployed",params,undefined,false); 
			

			svc.describeExpressions(params,cb);
		}
		
		service.DescribeIndexFields=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"FieldNames",params,undefined,false); 
			copyArgs(Boolean(n),"Deployed",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"FieldNames",params,undefined,false); 
			copyArgs(msg,"Deployed",params,undefined,false); 
			

			svc.describeIndexFields(params,cb);
		}
		
		service.DescribeScalingParameters=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			

			svc.describeScalingParameters(params,cb);
		}
		
		service.DescribeServiceAccessPolicies=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(Boolean(n),"Deployed",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"Deployed",params,undefined,false); 
			

			svc.describeServiceAccessPolicies(params,cb);
		}
		
		service.DescribeSuggesters=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"SuggesterNames",params,undefined,true); 
			copyArgs(Boolean(n),"Deployed",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"SuggesterNames",params,undefined,true); 
			copyArgs(msg,"Deployed",params,undefined,false); 
			

			svc.describeSuggesters(params,cb);
		}
		
		service.IndexDocuments=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			

			svc.indexDocuments(params,cb);
		}
		
		service.ListDomainNames=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.listDomainNames(params,cb);
		}
		
		service.UpdateAvailabilityOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(Boolean(n),"MultiAZ",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(Boolean(n),"MultiAZ",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"MultiAZ",params,undefined,false); 
			

			svc.updateAvailabilityOptions(params,cb);
		}
		
		service.UpdateDomainEndpointOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"DomainEndpointOptions",params,undefined,true); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"DomainEndpointOptions",params,undefined,true); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"DomainEndpointOptions",params,undefined,true); 
			

			svc.updateDomainEndpointOptions(params,cb);
		}
		
		service.UpdateScalingParameters=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"ScalingParameters",params,undefined,true); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"ScalingParameters",params,undefined,true); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"ScalingParameters",params,undefined,true); 
			

			svc.updateScalingParameters(params,cb);
		}
		
		service.UpdateServiceAccessPolicies=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"AccessPolicies",params,undefined,false); 
			
			copyArgs(n,"DomainName",params,undefined,false); 
			copyArgs(n,"AccessPolicies",params,undefined,false); 
			
			copyArgs(msg,"DomainName",params,undefined,false); 
			copyArgs(msg,"AccessPolicies",params,undefined,false); 
			

			svc.updateServiceAccessPolicies(params,cb);
		}
		
	
	}
	RED.nodes.registerType("AWS CloudSearch", AmazonAPINode);

};
