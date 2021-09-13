
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

		var awsService = new AWS.Iot( { 'region': node.region } );
		
		node.on("input", function(msg, send, done) {
			var aService = msg.AWSConfig?new AWS.Iot(msg.AWSConfig) : awsService;

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
		
			service.AcceptCertificateTransfer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"certificateId",params,undefined,false); 
			
			copyArgs(n,"certificateId",params,undefined,false); 
			copyArgs(Boolean(n),"setAsActive",params,undefined,false); 
			
			copyArgs(msg,"certificateId",params,undefined,false); 
			copyArgs(msg,"setAsActive",params,undefined,false); 
			

			svc.acceptCertificateTransfer(params,cb);
		}
			service.AddThingToBillingGroup=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"billingGroupName",params,undefined,false); 
			copyArgs(n,"billingGroupArn",params,undefined,false); 
			copyArgs(n,"thingName",params,undefined,false); 
			copyArgs(n,"thingArn",params,undefined,false); 
			
			copyArgs(msg,"billingGroupName",params,undefined,false); 
			copyArgs(msg,"billingGroupArn",params,undefined,false); 
			copyArgs(msg,"thingName",params,undefined,false); 
			copyArgs(msg,"thingArn",params,undefined,false); 
			

			svc.addThingToBillingGroup(params,cb);
		}
			service.AddThingToThingGroup=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"thingGroupName",params,undefined,false); 
			copyArgs(n,"thingGroupArn",params,undefined,false); 
			copyArgs(n,"thingName",params,undefined,false); 
			copyArgs(n,"thingArn",params,undefined,false); 
			copyArgs(Boolean(n),"overrideDynamicGroups",params,undefined,false); 
			
			copyArgs(msg,"thingGroupName",params,undefined,false); 
			copyArgs(msg,"thingGroupArn",params,undefined,false); 
			copyArgs(msg,"thingName",params,undefined,false); 
			copyArgs(msg,"thingArn",params,undefined,false); 
			copyArgs(msg,"overrideDynamicGroups",params,undefined,false); 
			

			svc.addThingToThingGroup(params,cb);
		}
			service.AssociateTargetsWithJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"targets",params,undefined,true); 
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(n,"targets",params,undefined,true); 
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"comment",params,undefined,false); 
			copyArgs(n,"namespaceId",params,undefined,false); 
			
			copyArgs(msg,"targets",params,undefined,true); 
			copyArgs(msg,"jobId",params,undefined,false); 
			copyArgs(msg,"comment",params,undefined,false); 
			copyArgs(msg,"namespaceId",params,undefined,false); 
			

			svc.associateTargetsWithJob(params,cb);
		}
			service.AttachPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"policyName",params,undefined,false); 
			copyArgs(n,"target",params,undefined,false); 
			
			copyArgs(n,"policyName",params,undefined,false); 
			copyArgs(n,"target",params,undefined,false); 
			
			copyArgs(msg,"policyName",params,undefined,false); 
			copyArgs(msg,"target",params,undefined,false); 
			

			svc.attachPolicy(params,cb);
		}
			service.AttachPrincipalPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"policyName",params,undefined,false); 
			copyArgs(n,"principal",params,undefined,false); 
			
			copyArgs(n,"policyName",params,undefined,false); 
			copyArgs(n,"principal",params,undefined,false); 
			
			copyArgs(msg,"policyName",params,undefined,false); 
			copyArgs(msg,"principal",params,undefined,false); 
			

			svc.attachPrincipalPolicy(params,cb);
		}
			service.AttachSecurityProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"securityProfileName",params,undefined,false); 
			copyArgs(n,"securityProfileTargetArn",params,undefined,false); 
			
			copyArgs(n,"securityProfileName",params,undefined,false); 
			copyArgs(n,"securityProfileTargetArn",params,undefined,false); 
			
			copyArgs(msg,"securityProfileName",params,undefined,false); 
			copyArgs(msg,"securityProfileTargetArn",params,undefined,false); 
			

			svc.attachSecurityProfile(params,cb);
		}
			service.AttachThingPrincipal=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"thingName",params,undefined,false); 
			copyArgs(n,"principal",params,undefined,false); 
			
			copyArgs(n,"thingName",params,undefined,false); 
			copyArgs(n,"principal",params,undefined,false); 
			
			copyArgs(msg,"thingName",params,undefined,false); 
			copyArgs(msg,"principal",params,undefined,false); 
			

			svc.attachThingPrincipal(params,cb);
		}
			service.CancelAuditMitigationActionsTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"taskId",params,undefined,false); 
			
			copyArgs(n,"taskId",params,undefined,false); 
			
			copyArgs(msg,"taskId",params,undefined,false); 
			

			svc.cancelAuditMitigationActionsTask(params,cb);
		}
			service.CancelAuditTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"taskId",params,undefined,false); 
			
			copyArgs(n,"taskId",params,undefined,false); 
			
			copyArgs(msg,"taskId",params,undefined,false); 
			

			svc.cancelAuditTask(params,cb);
		}
			service.CancelCertificateTransfer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"certificateId",params,undefined,false); 
			
			copyArgs(n,"certificateId",params,undefined,false); 
			
			copyArgs(msg,"certificateId",params,undefined,false); 
			

			svc.cancelCertificateTransfer(params,cb);
		}
			service.CancelDetectMitigationActionsTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"taskId",params,undefined,false); 
			
			copyArgs(n,"taskId",params,undefined,false); 
			
			copyArgs(msg,"taskId",params,undefined,false); 
			

			svc.cancelDetectMitigationActionsTask(params,cb);
		}
			service.CancelJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"reasonCode",params,undefined,false); 
			copyArgs(n,"comment",params,undefined,false); 
			copyArgs(Boolean(n),"force",params,undefined,false); 
			
			copyArgs(msg,"jobId",params,undefined,false); 
			copyArgs(msg,"reasonCode",params,undefined,false); 
			copyArgs(msg,"comment",params,undefined,false); 
			copyArgs(msg,"force",params,undefined,false); 
			

			svc.cancelJob(params,cb);
		}
			service.CancelJobExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"thingName",params,undefined,false); 
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"thingName",params,undefined,false); 
			copyArgs(Boolean(n),"force",params,undefined,false); 
			copyArgs(n,"expectedVersion",params,undefined,false); 
			copyArgs(n,"statusDetails",params,undefined,true); 
			
			copyArgs(msg,"jobId",params,undefined,false); 
			copyArgs(msg,"thingName",params,undefined,false); 
			copyArgs(msg,"force",params,undefined,false); 
			copyArgs(msg,"expectedVersion",params,undefined,false); 
			copyArgs(msg,"statusDetails",params,undefined,true); 
			

			svc.cancelJobExecution(params,cb);
		}
			service.ClearDefaultAuthorizer=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.clearDefaultAuthorizer(params,cb);
		}
			service.ConfirmTopicRuleDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"confirmationToken",params,undefined,false); 
			
			copyArgs(n,"confirmationToken",params,undefined,false); 
			
			copyArgs(msg,"confirmationToken",params,undefined,false); 
			

			svc.confirmTopicRuleDestination(params,cb);
		}
			service.CreateAuditSuppression=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"checkName",params,undefined,false); 
			copyArgs(n,"resourceIdentifier",params,undefined,true); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(n,"checkName",params,undefined,false); 
			copyArgs(n,"resourceIdentifier",params,undefined,true); 
			copyArgs(n,"expirationDate",params,undefined,false); 
			copyArgs(Boolean(n),"suppressIndefinitely",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"checkName",params,undefined,false); 
			copyArgs(msg,"resourceIdentifier",params,undefined,true); 
			copyArgs(msg,"expirationDate",params,undefined,false); 
			copyArgs(msg,"suppressIndefinitely",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			

			svc.createAuditSuppression(params,cb);
		}
			service.CreateAuthorizer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"authorizerName",params,undefined,false); 
			copyArgs(n,"authorizerFunctionArn",params,undefined,false); 
			
			copyArgs(n,"authorizerName",params,undefined,false); 
			copyArgs(n,"authorizerFunctionArn",params,undefined,false); 
			copyArgs(n,"tokenKeyName",params,undefined,false); 
			copyArgs(n,"tokenSigningPublicKeys",params,undefined,true); 
			copyArgs(n,"status",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(Boolean(n),"signingDisabled",params,undefined,false); 
			
			copyArgs(msg,"authorizerName",params,undefined,false); 
			copyArgs(msg,"authorizerFunctionArn",params,undefined,false); 
			copyArgs(msg,"tokenKeyName",params,undefined,false); 
			copyArgs(msg,"tokenSigningPublicKeys",params,undefined,true); 
			copyArgs(msg,"status",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"signingDisabled",params,undefined,false); 
			

			svc.createAuthorizer(params,cb);
		}
			service.CreateBillingGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"billingGroupName",params,undefined,false); 
			
			copyArgs(n,"billingGroupName",params,undefined,false); 
			copyArgs(n,"billingGroupProperties",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"billingGroupName",params,undefined,false); 
			copyArgs(msg,"billingGroupProperties",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createBillingGroup(params,cb);
		}
			service.CreateCertificateFromCsr=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"certificateSigningRequest",params,undefined,false); 
			
			copyArgs(n,"certificateSigningRequest",params,undefined,false); 
			copyArgs(Boolean(n),"setAsActive",params,undefined,false); 
			
			copyArgs(msg,"certificateSigningRequest",params,undefined,false); 
			copyArgs(msg,"setAsActive",params,undefined,false); 
			

			svc.createCertificateFromCsr(params,cb);
		}
			service.CreateCustomMetric=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"metricName",params,undefined,false); 
			copyArgs(n,"metricType",params,undefined,false); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(n,"metricName",params,undefined,false); 
			copyArgs(n,"displayName",params,undefined,false); 
			copyArgs(n,"metricType",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"metricName",params,undefined,false); 
			copyArgs(msg,"displayName",params,undefined,false); 
			copyArgs(msg,"metricType",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			

			svc.createCustomMetric(params,cb);
		}
			service.CreateDimension=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"_type",params,"type",false); 
			copyArgs(n,"stringValues",params,undefined,true); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"type",params,undefined,false); 
			copyArgs(n,"stringValues",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"type",params,undefined,false); 
			copyArgs(msg,"stringValues",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			

			svc.createDimension(params,cb);
		}
			service.CreateDomainConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domainConfigurationName",params,undefined,false); 
			
			copyArgs(n,"domainConfigurationName",params,undefined,false); 
			copyArgs(n,"domainName",params,undefined,false); 
			copyArgs(n,"serverCertificateArns",params,undefined,false); 
			copyArgs(n,"validationCertificateArn",params,undefined,false); 
			copyArgs(n,"authorizerConfig",params,undefined,true); 
			copyArgs(n,"serviceType",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"domainConfigurationName",params,undefined,false); 
			copyArgs(msg,"domainName",params,undefined,false); 
			copyArgs(msg,"serverCertificateArns",params,undefined,false); 
			copyArgs(msg,"validationCertificateArn",params,undefined,false); 
			copyArgs(msg,"authorizerConfig",params,undefined,true); 
			copyArgs(msg,"serviceType",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createDomainConfiguration(params,cb);
		}
			service.CreateDynamicThingGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"thingGroupName",params,undefined,false); 
			copyArgs(n,"queryString",params,undefined,false); 
			
			copyArgs(n,"thingGroupName",params,undefined,false); 
			copyArgs(n,"thingGroupProperties",params,undefined,true); 
			copyArgs(n,"indexName",params,undefined,false); 
			copyArgs(n,"queryString",params,undefined,false); 
			copyArgs(n,"queryVersion",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"thingGroupName",params,undefined,false); 
			copyArgs(msg,"thingGroupProperties",params,undefined,true); 
			copyArgs(msg,"indexName",params,undefined,false); 
			copyArgs(msg,"queryString",params,undefined,false); 
			copyArgs(msg,"queryVersion",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createDynamicThingGroup(params,cb);
		}
			service.CreateFleetMetric=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"metricName",params,undefined,false); 
			copyArgs(n,"queryString",params,undefined,false); 
			copyArgs(n,"aggregationType",params,undefined,true); 
			copyArgs(Number(n),"period",params,undefined,false); 
			copyArgs(n,"aggregationField",params,undefined,false); 
			
			copyArgs(n,"metricName",params,undefined,false); 
			copyArgs(n,"queryString",params,undefined,false); 
			copyArgs(n,"aggregationType",params,undefined,true); 
			copyArgs(Number(n),"period",params,undefined,false); 
			copyArgs(n,"aggregationField",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"queryVersion",params,undefined,false); 
			copyArgs(n,"indexName",params,undefined,false); 
			copyArgs(n,"unit",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"metricName",params,undefined,false); 
			copyArgs(msg,"queryString",params,undefined,false); 
			copyArgs(msg,"aggregationType",params,undefined,true); 
			copyArgs(msg,"period",params,undefined,false); 
			copyArgs(msg,"aggregationField",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"queryVersion",params,undefined,false); 
			copyArgs(msg,"indexName",params,undefined,false); 
			copyArgs(msg,"unit",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createFleetMetric(params,cb);
		}
			service.CreateJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"targets",params,undefined,true); 
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"targets",params,undefined,true); 
			copyArgs(n,"documentSource",params,undefined,false); 
			copyArgs(n,"document",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"presignedUrlConfig",params,undefined,true); 
			copyArgs(n,"targetSelection",params,undefined,false); 
			copyArgs(n,"jobExecutionsRolloutConfig",params,undefined,true); 
			copyArgs(n,"abortConfig",params,undefined,true); 
			copyArgs(n,"timeoutConfig",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			copyArgs(n,"namespaceId",params,undefined,false); 
			copyArgs(n,"jobTemplateArn",params,undefined,false); 
			
			copyArgs(msg,"jobId",params,undefined,false); 
			copyArgs(msg,"targets",params,undefined,true); 
			copyArgs(msg,"documentSource",params,undefined,false); 
			copyArgs(msg,"document",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"presignedUrlConfig",params,undefined,true); 
			copyArgs(msg,"targetSelection",params,undefined,false); 
			copyArgs(msg,"jobExecutionsRolloutConfig",params,undefined,true); 
			copyArgs(msg,"abortConfig",params,undefined,true); 
			copyArgs(msg,"timeoutConfig",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			copyArgs(msg,"namespaceId",params,undefined,false); 
			copyArgs(msg,"jobTemplateArn",params,undefined,false); 
			

			svc.createJob(params,cb);
		}
			service.CreateJobTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobTemplateId",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			
			copyArgs(n,"jobTemplateId",params,undefined,false); 
			copyArgs(n,"jobArn",params,undefined,false); 
			copyArgs(n,"documentSource",params,undefined,false); 
			copyArgs(n,"document",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"presignedUrlConfig",params,undefined,true); 
			copyArgs(n,"jobExecutionsRolloutConfig",params,undefined,true); 
			copyArgs(n,"abortConfig",params,undefined,true); 
			copyArgs(n,"timeoutConfig",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"jobTemplateId",params,undefined,false); 
			copyArgs(msg,"jobArn",params,undefined,false); 
			copyArgs(msg,"documentSource",params,undefined,false); 
			copyArgs(msg,"document",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"presignedUrlConfig",params,undefined,true); 
			copyArgs(msg,"jobExecutionsRolloutConfig",params,undefined,true); 
			copyArgs(msg,"abortConfig",params,undefined,true); 
			copyArgs(msg,"timeoutConfig",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createJobTemplate(params,cb);
		}
			service.CreateKeysAndCertificate=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"setAsActive",params,undefined,false); 
			
			copyArgs(msg,"setAsActive",params,undefined,false); 
			

			svc.createKeysAndCertificate(params,cb);
		}
			service.CreateMitigationAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"actionName",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			copyArgs(n,"actionParams",params,undefined,true); 
			
			copyArgs(n,"actionName",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			copyArgs(n,"actionParams",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"actionName",params,undefined,false); 
			copyArgs(msg,"roleArn",params,undefined,false); 
			copyArgs(msg,"actionParams",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createMitigationAction(params,cb);
		}
			service.CreateOTAUpdate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"otaUpdateId",params,undefined,false); 
			copyArgs(n,"targets",params,undefined,true); 
			copyArgs(n,"files",params,undefined,true); 
			copyArgs(n,"roleArn",params,undefined,false); 
			
			copyArgs(n,"otaUpdateId",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"targets",params,undefined,true); 
			copyArgs(n,"protocols",params,undefined,true); 
			copyArgs(n,"targetSelection",params,undefined,false); 
			copyArgs(n,"awsJobExecutionsRolloutConfig",params,undefined,true); 
			copyArgs(n,"awsJobPresignedUrlConfig",params,undefined,true); 
			copyArgs(n,"awsJobAbortConfig",params,undefined,false); 
			copyArgs(n,"awsJobTimeoutConfig",params,undefined,false); 
			copyArgs(n,"files",params,undefined,true); 
			copyArgs(n,"roleArn",params,undefined,false); 
			copyArgs(n,"additionalParameters",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"otaUpdateId",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"targets",params,undefined,true); 
			copyArgs(msg,"protocols",params,undefined,true); 
			copyArgs(msg,"targetSelection",params,undefined,false); 
			copyArgs(msg,"awsJobExecutionsRolloutConfig",params,undefined,true); 
			copyArgs(msg,"awsJobPresignedUrlConfig",params,undefined,true); 
			copyArgs(msg,"awsJobAbortConfig",params,undefined,false); 
			copyArgs(msg,"awsJobTimeoutConfig",params,undefined,false); 
			copyArgs(msg,"files",params,undefined,true); 
			copyArgs(msg,"roleArn",params,undefined,false); 
			copyArgs(msg,"additionalParameters",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createOTAUpdate(params,cb);
		}
			service.CreatePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"policyName",params,undefined,false); 
			copyArgs(n,"policyDocument",params,undefined,false); 
			
			copyArgs(n,"policyName",params,undefined,false); 
			copyArgs(n,"policyDocument",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"policyName",params,undefined,false); 
			copyArgs(msg,"policyDocument",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createPolicy(params,cb);
		}
			service.CreatePolicyVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"policyName",params,undefined,false); 
			copyArgs(n,"policyDocument",params,undefined,false); 
			
			copyArgs(n,"policyName",params,undefined,false); 
			copyArgs(n,"policyDocument",params,undefined,false); 
			copyArgs(Boolean(n),"setAsDefault",params,undefined,false); 
			
			copyArgs(msg,"policyName",params,undefined,false); 
			copyArgs(msg,"policyDocument",params,undefined,false); 
			copyArgs(msg,"setAsDefault",params,undefined,false); 
			

			svc.createPolicyVersion(params,cb);
		}
			service.CreateProvisioningClaim=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(msg,"templateName",params,undefined,false); 
			

			svc.createProvisioningClaim(params,cb);
		}
			service.CreateProvisioningTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"templateName",params,undefined,false); 
			copyArgs(n,"templateBody",params,undefined,false); 
			copyArgs(n,"provisioningRoleArn",params,undefined,false); 
			
			copyArgs(n,"templateName",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"templateBody",params,undefined,false); 
			copyArgs(Boolean(n),"enabled",params,undefined,false); 
			copyArgs(n,"provisioningRoleArn",params,undefined,false); 
			copyArgs(n,"preProvisioningHook",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"templateName",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"templateBody",params,undefined,false); 
			copyArgs(msg,"enabled",params,undefined,false); 
			copyArgs(msg,"provisioningRoleArn",params,undefined,false); 
			copyArgs(msg,"preProvisioningHook",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createProvisioningTemplate(params,cb);
		}
			service.CreateProvisioningTemplateVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"templateName",params,undefined,false); 
			copyArgs(n,"templateBody",params,undefined,false); 
			
			copyArgs(n,"templateName",params,undefined,false); 
			copyArgs(n,"templateBody",params,undefined,false); 
			copyArgs(Boolean(n),"setAsDefault",params,undefined,false); 
			
			copyArgs(msg,"templateName",params,undefined,false); 
			copyArgs(msg,"templateBody",params,undefined,false); 
			copyArgs(msg,"setAsDefault",params,undefined,false); 
			

			svc.createProvisioningTemplateVersion(params,cb);
		}
			service.CreateRoleAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"roleAlias",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			
			copyArgs(n,"roleAlias",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			copyArgs(Number(n),"credentialDurationSeconds",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"roleAlias",params,undefined,false); 
			copyArgs(msg,"roleArn",params,undefined,false); 
			copyArgs(msg,"credentialDurationSeconds",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createRoleAlias(params,cb);
		}
			service.CreateScheduledAudit=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"frequency",params,undefined,false); 
			copyArgs(n,"targetCheckNames",params,undefined,true); 
			copyArgs(n,"scheduledAuditName",params,undefined,false); 
			
			copyArgs(n,"frequency",params,undefined,false); 
			copyArgs(n,"dayOfMonth",params,undefined,false); 
			copyArgs(n,"dayOfWeek",params,undefined,false); 
			copyArgs(n,"targetCheckNames",params,undefined,true); 
			copyArgs(n,"scheduledAuditName",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"frequency",params,undefined,false); 
			copyArgs(msg,"dayOfMonth",params,undefined,false); 
			copyArgs(msg,"dayOfWeek",params,undefined,false); 
			copyArgs(msg,"targetCheckNames",params,undefined,true); 
			copyArgs(msg,"scheduledAuditName",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createScheduledAudit(params,cb);
		}
			service.CreateSecurityProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"securityProfileName",params,undefined,false); 
			
			copyArgs(n,"securityProfileName",params,undefined,false); 
			copyArgs(n,"securityProfileDescription",params,undefined,false); 
			copyArgs(n,"behaviors",params,undefined,true); 
			copyArgs(n,"alertTargets",params,undefined,true); 
			copyArgs(n,"additionalMetricsToRetain",params,undefined,true); 
			copyArgs(n,"additionalMetricsToRetainV2",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"securityProfileName",params,undefined,false); 
			copyArgs(msg,"securityProfileDescription",params,undefined,false); 
			copyArgs(msg,"behaviors",params,undefined,true); 
			copyArgs(msg,"alertTargets",params,undefined,true); 
			copyArgs(msg,"additionalMetricsToRetain",params,undefined,true); 
			copyArgs(msg,"additionalMetricsToRetainV2",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createSecurityProfile(params,cb);
		}
			service.CreateStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"streamId",params,undefined,false); 
			copyArgs(n,"files",params,undefined,true); 
			copyArgs(n,"roleArn",params,undefined,false); 
			
			copyArgs(n,"streamId",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"files",params,undefined,true); 
			copyArgs(n,"roleArn",params,undefined,false); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"streamId",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"files",params,undefined,true); 
			copyArgs(msg,"roleArn",params,undefined,false); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createStream(params,cb);
		}
			service.CreateThing=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"thingName",params,undefined,false); 
			
			copyArgs(n,"thingName",params,undefined,false); 
			copyArgs(n,"thingTypeName",params,undefined,false); 
			copyArgs(n,"attributePayload",params,undefined,true); 
			copyArgs(n,"billingGroupName",params,undefined,false); 
			
			copyArgs(msg,"thingName",params,undefined,false); 
			copyArgs(msg,"thingTypeName",params,undefined,false); 
			copyArgs(msg,"attributePayload",params,undefined,true); 
			copyArgs(msg,"billingGroupName",params,undefined,false); 
			

			svc.createThing(params,cb);
		}
			service.CreateThingGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"thingGroupName",params,undefined,false); 
			
			copyArgs(n,"thingGroupName",params,undefined,false); 
			copyArgs(n,"parentGroupName",params,undefined,false); 
			copyArgs(n,"thingGroupProperties",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"thingGroupName",params,undefined,false); 
			copyArgs(msg,"parentGroupName",params,undefined,false); 
			copyArgs(msg,"thingGroupProperties",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createThingGroup(params,cb);
		}
			service.CreateThingType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"thingTypeName",params,undefined,false); 
			
			copyArgs(n,"thingTypeName",params,undefined,false); 
			copyArgs(n,"thingTypeProperties",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"thingTypeName",params,undefined,false); 
			copyArgs(msg,"thingTypeProperties",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.createThingType(params,cb);
		}
			service.CreateTopicRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ruleName",params,undefined,false); 
			copyArgs(n,"topicRulePayload",params,undefined,true); 
			
			copyArgs(n,"ruleName",params,undefined,false); 
			copyArgs(n,"topicRulePayload",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,false); 
			
			copyArgs(msg,"ruleName",params,undefined,false); 
			copyArgs(msg,"topicRulePayload",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,false); 
			

			svc.createTopicRule(params,cb);
		}
			service.CreateTopicRuleDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"destinationConfiguration",params,undefined,false); 
			
			copyArgs(n,"destinationConfiguration",params,undefined,false); 
			
			copyArgs(msg,"destinationConfiguration",params,undefined,false); 
			

			svc.createTopicRuleDestination(params,cb);
		}
			service.DeleteAccountAuditConfiguration=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Boolean(n),"deleteScheduledAudits",params,undefined,false); 
			
			copyArgs(msg,"deleteScheduledAudits",params,undefined,false); 
			

			svc.deleteAccountAuditConfiguration(params,cb);
		}
			service.DeleteAuditSuppression=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"checkName",params,undefined,false); 
			copyArgs(n,"resourceIdentifier",params,undefined,true); 
			
			copyArgs(n,"checkName",params,undefined,false); 
			copyArgs(n,"resourceIdentifier",params,undefined,true); 
			
			copyArgs(msg,"checkName",params,undefined,false); 
			copyArgs(msg,"resourceIdentifier",params,undefined,true); 
			

			svc.deleteAuditSuppression(params,cb);
		}
			service.DeleteAuthorizer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"authorizerName",params,undefined,false); 
			
			copyArgs(n,"authorizerName",params,undefined,false); 
			
			copyArgs(msg,"authorizerName",params,undefined,false); 
			

			svc.deleteAuthorizer(params,cb);
		}
			service.DeleteBillingGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"billingGroupName",params,undefined,false); 
			
			copyArgs(n,"billingGroupName",params,undefined,false); 
			copyArgs(n,"expectedVersion",params,undefined,false); 
			
			copyArgs(msg,"billingGroupName",params,undefined,false); 
			copyArgs(msg,"expectedVersion",params,undefined,false); 
			

			svc.deleteBillingGroup(params,cb);
		}
			service.DeleteCACertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"certificateId",params,undefined,false); 
			
			copyArgs(n,"certificateId",params,undefined,false); 
			
			copyArgs(msg,"certificateId",params,undefined,false); 
			

			svc.deleteCACertificate(params,cb);
		}
			service.DeleteCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"certificateId",params,undefined,false); 
			
			copyArgs(n,"certificateId",params,undefined,false); 
			copyArgs(Boolean(n),"forceDelete",params,undefined,false); 
			
			copyArgs(msg,"certificateId",params,undefined,false); 
			copyArgs(msg,"forceDelete",params,undefined,false); 
			

			svc.deleteCertificate(params,cb);
		}
			service.DeleteCustomMetric=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"metricName",params,undefined,false); 
			
			copyArgs(n,"metricName",params,undefined,false); 
			
			copyArgs(msg,"metricName",params,undefined,false); 
			

			svc.deleteCustomMetric(params,cb);
		}
			service.DeleteDimension=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.deleteDimension(params,cb);
		}
			service.DeleteDomainConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domainConfigurationName",params,undefined,false); 
			
			copyArgs(n,"domainConfigurationName",params,undefined,false); 
			
			copyArgs(msg,"domainConfigurationName",params,undefined,false); 
			

			svc.deleteDomainConfiguration(params,cb);
		}
			service.DeleteDynamicThingGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"thingGroupName",params,undefined,false); 
			
			copyArgs(n,"thingGroupName",params,undefined,false); 
			copyArgs(n,"expectedVersion",params,undefined,false); 
			
			copyArgs(msg,"thingGroupName",params,undefined,false); 
			copyArgs(msg,"expectedVersion",params,undefined,false); 
			

			svc.deleteDynamicThingGroup(params,cb);
		}
			service.DeleteFleetMetric=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"metricName",params,undefined,false); 
			
			copyArgs(n,"metricName",params,undefined,false); 
			copyArgs(n,"expectedVersion",params,undefined,false); 
			
			copyArgs(msg,"metricName",params,undefined,false); 
			copyArgs(msg,"expectedVersion",params,undefined,false); 
			

			svc.deleteFleetMetric(params,cb);
		}
			service.DeleteJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(Boolean(n),"force",params,undefined,false); 
			copyArgs(n,"namespaceId",params,undefined,false); 
			
			copyArgs(msg,"jobId",params,undefined,false); 
			copyArgs(msg,"force",params,undefined,false); 
			copyArgs(msg,"namespaceId",params,undefined,false); 
			

			svc.deleteJob(params,cb);
		}
			service.DeleteJobExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"thingName",params,undefined,false); 
			copyArgs(n,"executionNumber",params,undefined,false); 
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"thingName",params,undefined,false); 
			copyArgs(n,"executionNumber",params,undefined,false); 
			copyArgs(Boolean(n),"force",params,undefined,false); 
			copyArgs(n,"namespaceId",params,undefined,false); 
			
			copyArgs(msg,"jobId",params,undefined,false); 
			copyArgs(msg,"thingName",params,undefined,false); 
			copyArgs(msg,"executionNumber",params,undefined,false); 
			copyArgs(msg,"force",params,undefined,false); 
			copyArgs(msg,"namespaceId",params,undefined,false); 
			

			svc.deleteJobExecution(params,cb);
		}
			service.DeleteJobTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobTemplateId",params,undefined,false); 
			
			copyArgs(n,"jobTemplateId",params,undefined,false); 
			
			copyArgs(msg,"jobTemplateId",params,undefined,false); 
			

			svc.deleteJobTemplate(params,cb);
		}
			service.DeleteMitigationAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"actionName",params,undefined,false); 
			
			copyArgs(n,"actionName",params,undefined,false); 
			
			copyArgs(msg,"actionName",params,undefined,false); 
			

			svc.deleteMitigationAction(params,cb);
		}
			service.DeleteOTAUpdate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"otaUpdateId",params,undefined,false); 
			
			copyArgs(n,"otaUpdateId",params,undefined,false); 
			copyArgs(Boolean(n),"deleteStream",params,undefined,false); 
			copyArgs(Boolean(n),"forceDeleteAWSJob",params,undefined,false); 
			
			copyArgs(msg,"otaUpdateId",params,undefined,false); 
			copyArgs(msg,"deleteStream",params,undefined,false); 
			copyArgs(msg,"forceDeleteAWSJob",params,undefined,false); 
			

			svc.deleteOTAUpdate(params,cb);
		}
			service.DeletePolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"policyName",params,undefined,false); 
			
			copyArgs(n,"policyName",params,undefined,false); 
			
			copyArgs(msg,"policyName",params,undefined,false); 
			

			svc.deletePolicy(params,cb);
		}
			service.DeletePolicyVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"policyName",params,undefined,false); 
			copyArgs(n,"policyVersionId",params,undefined,false); 
			
			copyArgs(n,"policyName",params,undefined,false); 
			copyArgs(n,"policyVersionId",params,undefined,false); 
			
			copyArgs(msg,"policyName",params,undefined,false); 
			copyArgs(msg,"policyVersionId",params,undefined,false); 
			

			svc.deletePolicyVersion(params,cb);
		}
			service.DeleteProvisioningTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(msg,"templateName",params,undefined,false); 
			

			svc.deleteProvisioningTemplate(params,cb);
		}
			service.DeleteProvisioningTemplateVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"templateName",params,undefined,false); 
			copyArgs(Number(n),"versionId",params,undefined,false); 
			
			copyArgs(n,"templateName",params,undefined,false); 
			copyArgs(Number(n),"versionId",params,undefined,false); 
			
			copyArgs(msg,"templateName",params,undefined,false); 
			copyArgs(msg,"versionId",params,undefined,false); 
			

			svc.deleteProvisioningTemplateVersion(params,cb);
		}
			service.DeleteRegistrationCode=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.deleteRegistrationCode(params,cb);
		}
			service.DeleteRoleAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"roleAlias",params,undefined,false); 
			
			copyArgs(n,"roleAlias",params,undefined,false); 
			
			copyArgs(msg,"roleAlias",params,undefined,false); 
			

			svc.deleteRoleAlias(params,cb);
		}
			service.DeleteScheduledAudit=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"scheduledAuditName",params,undefined,false); 
			
			copyArgs(n,"scheduledAuditName",params,undefined,false); 
			
			copyArgs(msg,"scheduledAuditName",params,undefined,false); 
			

			svc.deleteScheduledAudit(params,cb);
		}
			service.DeleteSecurityProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"securityProfileName",params,undefined,false); 
			
			copyArgs(n,"securityProfileName",params,undefined,false); 
			copyArgs(n,"expectedVersion",params,undefined,false); 
			
			copyArgs(msg,"securityProfileName",params,undefined,false); 
			copyArgs(msg,"expectedVersion",params,undefined,false); 
			

			svc.deleteSecurityProfile(params,cb);
		}
			service.DeleteStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"streamId",params,undefined,false); 
			
			copyArgs(n,"streamId",params,undefined,false); 
			
			copyArgs(msg,"streamId",params,undefined,false); 
			

			svc.deleteStream(params,cb);
		}
			service.DeleteThing=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"thingName",params,undefined,false); 
			
			copyArgs(n,"thingName",params,undefined,false); 
			copyArgs(n,"expectedVersion",params,undefined,false); 
			
			copyArgs(msg,"thingName",params,undefined,false); 
			copyArgs(msg,"expectedVersion",params,undefined,false); 
			

			svc.deleteThing(params,cb);
		}
			service.DeleteThingGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"thingGroupName",params,undefined,false); 
			
			copyArgs(n,"thingGroupName",params,undefined,false); 
			copyArgs(n,"expectedVersion",params,undefined,false); 
			
			copyArgs(msg,"thingGroupName",params,undefined,false); 
			copyArgs(msg,"expectedVersion",params,undefined,false); 
			

			svc.deleteThingGroup(params,cb);
		}
			service.DeleteThingType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"thingTypeName",params,undefined,false); 
			
			copyArgs(n,"thingTypeName",params,undefined,false); 
			
			copyArgs(msg,"thingTypeName",params,undefined,false); 
			

			svc.deleteThingType(params,cb);
		}
			service.DeleteTopicRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ruleName",params,undefined,false); 
			
			copyArgs(n,"ruleName",params,undefined,false); 
			
			copyArgs(msg,"ruleName",params,undefined,false); 
			

			svc.deleteTopicRule(params,cb);
		}
			service.DeleteTopicRuleDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.deleteTopicRuleDestination(params,cb);
		}
			service.DeleteV2LoggingLevel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"targetType",params,undefined,false); 
			copyArgs(n,"targetName",params,undefined,false); 
			
			copyArgs(n,"targetType",params,undefined,false); 
			copyArgs(n,"targetName",params,undefined,false); 
			
			copyArgs(msg,"targetType",params,undefined,false); 
			copyArgs(msg,"targetName",params,undefined,false); 
			

			svc.deleteV2LoggingLevel(params,cb);
		}
			service.DeprecateThingType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"thingTypeName",params,undefined,false); 
			
			copyArgs(n,"thingTypeName",params,undefined,false); 
			copyArgs(Boolean(n),"undoDeprecate",params,undefined,false); 
			
			copyArgs(msg,"thingTypeName",params,undefined,false); 
			copyArgs(msg,"undoDeprecate",params,undefined,false); 
			

			svc.deprecateThingType(params,cb);
		}
			service.DescribeAccountAuditConfiguration=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeAccountAuditConfiguration(params,cb);
		}
			service.DescribeAuditFinding=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"findingId",params,undefined,false); 
			
			copyArgs(n,"findingId",params,undefined,false); 
			
			copyArgs(msg,"findingId",params,undefined,false); 
			

			svc.describeAuditFinding(params,cb);
		}
			service.DescribeAuditMitigationActionsTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"taskId",params,undefined,false); 
			
			copyArgs(n,"taskId",params,undefined,false); 
			
			copyArgs(msg,"taskId",params,undefined,false); 
			

			svc.describeAuditMitigationActionsTask(params,cb);
		}
			service.DescribeAuditSuppression=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"checkName",params,undefined,false); 
			copyArgs(n,"resourceIdentifier",params,undefined,true); 
			
			copyArgs(n,"checkName",params,undefined,false); 
			copyArgs(n,"resourceIdentifier",params,undefined,true); 
			
			copyArgs(msg,"checkName",params,undefined,false); 
			copyArgs(msg,"resourceIdentifier",params,undefined,true); 
			

			svc.describeAuditSuppression(params,cb);
		}
			service.DescribeAuditTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"taskId",params,undefined,false); 
			
			copyArgs(n,"taskId",params,undefined,false); 
			
			copyArgs(msg,"taskId",params,undefined,false); 
			

			svc.describeAuditTask(params,cb);
		}
			service.DescribeAuthorizer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"authorizerName",params,undefined,false); 
			
			copyArgs(n,"authorizerName",params,undefined,false); 
			
			copyArgs(msg,"authorizerName",params,undefined,false); 
			

			svc.describeAuthorizer(params,cb);
		}
			service.DescribeBillingGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"billingGroupName",params,undefined,false); 
			
			copyArgs(n,"billingGroupName",params,undefined,false); 
			
			copyArgs(msg,"billingGroupName",params,undefined,false); 
			

			svc.describeBillingGroup(params,cb);
		}
			service.DescribeCACertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"certificateId",params,undefined,false); 
			
			copyArgs(n,"certificateId",params,undefined,false); 
			
			copyArgs(msg,"certificateId",params,undefined,false); 
			

			svc.describeCACertificate(params,cb);
		}
			service.DescribeCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"certificateId",params,undefined,false); 
			
			copyArgs(n,"certificateId",params,undefined,false); 
			
			copyArgs(msg,"certificateId",params,undefined,false); 
			

			svc.describeCertificate(params,cb);
		}
			service.DescribeCustomMetric=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"metricName",params,undefined,false); 
			
			copyArgs(n,"metricName",params,undefined,false); 
			
			copyArgs(msg,"metricName",params,undefined,false); 
			

			svc.describeCustomMetric(params,cb);
		}
			service.DescribeDefaultAuthorizer=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeDefaultAuthorizer(params,cb);
		}
			service.DescribeDetectMitigationActionsTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"taskId",params,undefined,false); 
			
			copyArgs(n,"taskId",params,undefined,false); 
			
			copyArgs(msg,"taskId",params,undefined,false); 
			

			svc.describeDetectMitigationActionsTask(params,cb);
		}
			service.DescribeDimension=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(n,"name",params,undefined,false); 
			
			copyArgs(msg,"name",params,undefined,false); 
			

			svc.describeDimension(params,cb);
		}
			service.DescribeDomainConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domainConfigurationName",params,undefined,false); 
			
			copyArgs(n,"domainConfigurationName",params,undefined,false); 
			
			copyArgs(msg,"domainConfigurationName",params,undefined,false); 
			

			svc.describeDomainConfiguration(params,cb);
		}
			service.DescribeEndpoint=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"endpointType",params,undefined,false); 
			
			copyArgs(msg,"endpointType",params,undefined,false); 
			

			svc.describeEndpoint(params,cb);
		}
			service.DescribeEventConfigurations=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.describeEventConfigurations(params,cb);
		}
			service.DescribeFleetMetric=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"metricName",params,undefined,false); 
			
			copyArgs(n,"metricName",params,undefined,false); 
			
			copyArgs(msg,"metricName",params,undefined,false); 
			

			svc.describeFleetMetric(params,cb);
		}
			service.DescribeIndex=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"indexName",params,undefined,false); 
			
			copyArgs(n,"indexName",params,undefined,false); 
			
			copyArgs(msg,"indexName",params,undefined,false); 
			

			svc.describeIndex(params,cb);
		}
			service.DescribeJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(msg,"jobId",params,undefined,false); 
			

			svc.describeJob(params,cb);
		}
			service.DescribeJobExecution=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"thingName",params,undefined,false); 
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"thingName",params,undefined,false); 
			copyArgs(n,"executionNumber",params,undefined,false); 
			
			copyArgs(msg,"jobId",params,undefined,false); 
			copyArgs(msg,"thingName",params,undefined,false); 
			copyArgs(msg,"executionNumber",params,undefined,false); 
			

			svc.describeJobExecution(params,cb);
		}
			service.DescribeJobTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobTemplateId",params,undefined,false); 
			
			copyArgs(n,"jobTemplateId",params,undefined,false); 
			
			copyArgs(msg,"jobTemplateId",params,undefined,false); 
			

			svc.describeJobTemplate(params,cb);
		}
			service.DescribeMitigationAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"actionName",params,undefined,false); 
			
			copyArgs(n,"actionName",params,undefined,false); 
			
			copyArgs(msg,"actionName",params,undefined,false); 
			

			svc.describeMitigationAction(params,cb);
		}
			service.DescribeProvisioningTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(msg,"templateName",params,undefined,false); 
			

			svc.describeProvisioningTemplate(params,cb);
		}
			service.DescribeProvisioningTemplateVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"templateName",params,undefined,false); 
			copyArgs(Number(n),"versionId",params,undefined,false); 
			
			copyArgs(n,"templateName",params,undefined,false); 
			copyArgs(Number(n),"versionId",params,undefined,false); 
			
			copyArgs(msg,"templateName",params,undefined,false); 
			copyArgs(msg,"versionId",params,undefined,false); 
			

			svc.describeProvisioningTemplateVersion(params,cb);
		}
			service.DescribeRoleAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"roleAlias",params,undefined,false); 
			
			copyArgs(n,"roleAlias",params,undefined,false); 
			
			copyArgs(msg,"roleAlias",params,undefined,false); 
			

			svc.describeRoleAlias(params,cb);
		}
			service.DescribeScheduledAudit=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"scheduledAuditName",params,undefined,false); 
			
			copyArgs(n,"scheduledAuditName",params,undefined,false); 
			
			copyArgs(msg,"scheduledAuditName",params,undefined,false); 
			

			svc.describeScheduledAudit(params,cb);
		}
			service.DescribeSecurityProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"securityProfileName",params,undefined,false); 
			
			copyArgs(n,"securityProfileName",params,undefined,false); 
			
			copyArgs(msg,"securityProfileName",params,undefined,false); 
			

			svc.describeSecurityProfile(params,cb);
		}
			service.DescribeStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"streamId",params,undefined,false); 
			
			copyArgs(n,"streamId",params,undefined,false); 
			
			copyArgs(msg,"streamId",params,undefined,false); 
			

			svc.describeStream(params,cb);
		}
			service.DescribeThing=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"thingName",params,undefined,false); 
			
			copyArgs(n,"thingName",params,undefined,false); 
			
			copyArgs(msg,"thingName",params,undefined,false); 
			

			svc.describeThing(params,cb);
		}
			service.DescribeThingGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"thingGroupName",params,undefined,false); 
			
			copyArgs(n,"thingGroupName",params,undefined,false); 
			
			copyArgs(msg,"thingGroupName",params,undefined,false); 
			

			svc.describeThingGroup(params,cb);
		}
			service.DescribeThingRegistrationTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"taskId",params,undefined,false); 
			
			copyArgs(n,"taskId",params,undefined,false); 
			
			copyArgs(msg,"taskId",params,undefined,false); 
			

			svc.describeThingRegistrationTask(params,cb);
		}
			service.DescribeThingType=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"thingTypeName",params,undefined,false); 
			
			copyArgs(n,"thingTypeName",params,undefined,false); 
			
			copyArgs(msg,"thingTypeName",params,undefined,false); 
			

			svc.describeThingType(params,cb);
		}
			service.DetachPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"policyName",params,undefined,false); 
			copyArgs(n,"target",params,undefined,false); 
			
			copyArgs(n,"policyName",params,undefined,false); 
			copyArgs(n,"target",params,undefined,false); 
			
			copyArgs(msg,"policyName",params,undefined,false); 
			copyArgs(msg,"target",params,undefined,false); 
			

			svc.detachPolicy(params,cb);
		}
			service.DetachPrincipalPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"policyName",params,undefined,false); 
			copyArgs(n,"principal",params,undefined,false); 
			
			copyArgs(n,"policyName",params,undefined,false); 
			copyArgs(n,"principal",params,undefined,false); 
			
			copyArgs(msg,"policyName",params,undefined,false); 
			copyArgs(msg,"principal",params,undefined,false); 
			

			svc.detachPrincipalPolicy(params,cb);
		}
			service.DetachSecurityProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"securityProfileName",params,undefined,false); 
			copyArgs(n,"securityProfileTargetArn",params,undefined,false); 
			
			copyArgs(n,"securityProfileName",params,undefined,false); 
			copyArgs(n,"securityProfileTargetArn",params,undefined,false); 
			
			copyArgs(msg,"securityProfileName",params,undefined,false); 
			copyArgs(msg,"securityProfileTargetArn",params,undefined,false); 
			

			svc.detachSecurityProfile(params,cb);
		}
			service.DetachThingPrincipal=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"thingName",params,undefined,false); 
			copyArgs(n,"principal",params,undefined,false); 
			
			copyArgs(n,"thingName",params,undefined,false); 
			copyArgs(n,"principal",params,undefined,false); 
			
			copyArgs(msg,"thingName",params,undefined,false); 
			copyArgs(msg,"principal",params,undefined,false); 
			

			svc.detachThingPrincipal(params,cb);
		}
			service.DisableTopicRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ruleName",params,undefined,false); 
			
			copyArgs(n,"ruleName",params,undefined,false); 
			
			copyArgs(msg,"ruleName",params,undefined,false); 
			

			svc.disableTopicRule(params,cb);
		}
			service.EnableTopicRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ruleName",params,undefined,false); 
			
			copyArgs(n,"ruleName",params,undefined,false); 
			
			copyArgs(msg,"ruleName",params,undefined,false); 
			

			svc.enableTopicRule(params,cb);
		}
			service.GetBehaviorModelTrainingSummaries=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"securityProfileName",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"securityProfileName",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.getBehaviorModelTrainingSummaries(params,cb);
		}
			service.GetBucketsAggregation=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"queryString",params,undefined,false); 
			copyArgs(n,"aggregationField",params,undefined,false); 
			copyArgs(n,"bucketsAggregationType",params,undefined,false); 
			
			copyArgs(n,"indexName",params,undefined,false); 
			copyArgs(n,"queryString",params,undefined,false); 
			copyArgs(n,"aggregationField",params,undefined,false); 
			copyArgs(n,"queryVersion",params,undefined,false); 
			copyArgs(n,"bucketsAggregationType",params,undefined,false); 
			
			copyArgs(msg,"indexName",params,undefined,false); 
			copyArgs(msg,"queryString",params,undefined,false); 
			copyArgs(msg,"aggregationField",params,undefined,false); 
			copyArgs(msg,"queryVersion",params,undefined,false); 
			copyArgs(msg,"bucketsAggregationType",params,undefined,false); 
			

			svc.getBucketsAggregation(params,cb);
		}
			service.GetCardinality=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"queryString",params,undefined,false); 
			
			copyArgs(n,"indexName",params,undefined,false); 
			copyArgs(n,"queryString",params,undefined,false); 
			copyArgs(n,"aggregationField",params,undefined,false); 
			copyArgs(n,"queryVersion",params,undefined,false); 
			
			copyArgs(msg,"indexName",params,undefined,false); 
			copyArgs(msg,"queryString",params,undefined,false); 
			copyArgs(msg,"aggregationField",params,undefined,false); 
			copyArgs(msg,"queryVersion",params,undefined,false); 
			

			svc.getCardinality(params,cb);
		}
			service.GetEffectivePolicies=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"principal",params,undefined,false); 
			copyArgs(n,"cognitoIdentityPoolId",params,undefined,false); 
			copyArgs(n,"thingName",params,undefined,false); 
			
			copyArgs(msg,"principal",params,undefined,false); 
			copyArgs(msg,"cognitoIdentityPoolId",params,undefined,false); 
			copyArgs(msg,"thingName",params,undefined,false); 
			

			svc.getEffectivePolicies(params,cb);
		}
			service.GetIndexingConfiguration=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getIndexingConfiguration(params,cb);
		}
			service.GetJobDocument=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(msg,"jobId",params,undefined,false); 
			

			svc.getJobDocument(params,cb);
		}
			service.GetLoggingOptions=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getLoggingOptions(params,cb);
		}
			service.GetOTAUpdate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"otaUpdateId",params,undefined,false); 
			
			copyArgs(n,"otaUpdateId",params,undefined,false); 
			
			copyArgs(msg,"otaUpdateId",params,undefined,false); 
			

			svc.getOTAUpdate(params,cb);
		}
			service.GetPercentiles=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"queryString",params,undefined,false); 
			
			copyArgs(n,"indexName",params,undefined,false); 
			copyArgs(n,"queryString",params,undefined,false); 
			copyArgs(n,"aggregationField",params,undefined,false); 
			copyArgs(n,"queryVersion",params,undefined,false); 
			copyArgs(n,"percents",params,undefined,false); 
			
			copyArgs(msg,"indexName",params,undefined,false); 
			copyArgs(msg,"queryString",params,undefined,false); 
			copyArgs(msg,"aggregationField",params,undefined,false); 
			copyArgs(msg,"queryVersion",params,undefined,false); 
			copyArgs(msg,"percents",params,undefined,false); 
			

			svc.getPercentiles(params,cb);
		}
			service.GetPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"policyName",params,undefined,false); 
			
			copyArgs(n,"policyName",params,undefined,false); 
			
			copyArgs(msg,"policyName",params,undefined,false); 
			

			svc.getPolicy(params,cb);
		}
			service.GetPolicyVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"policyName",params,undefined,false); 
			copyArgs(n,"policyVersionId",params,undefined,false); 
			
			copyArgs(n,"policyName",params,undefined,false); 
			copyArgs(n,"policyVersionId",params,undefined,false); 
			
			copyArgs(msg,"policyName",params,undefined,false); 
			copyArgs(msg,"policyVersionId",params,undefined,false); 
			

			svc.getPolicyVersion(params,cb);
		}
			service.GetRegistrationCode=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getRegistrationCode(params,cb);
		}
			service.GetStatistics=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"queryString",params,undefined,false); 
			
			copyArgs(n,"indexName",params,undefined,false); 
			copyArgs(n,"queryString",params,undefined,false); 
			copyArgs(n,"aggregationField",params,undefined,false); 
			copyArgs(n,"queryVersion",params,undefined,false); 
			
			copyArgs(msg,"indexName",params,undefined,false); 
			copyArgs(msg,"queryString",params,undefined,false); 
			copyArgs(msg,"aggregationField",params,undefined,false); 
			copyArgs(msg,"queryVersion",params,undefined,false); 
			

			svc.getStatistics(params,cb);
		}
			service.GetTopicRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ruleName",params,undefined,false); 
			
			copyArgs(n,"ruleName",params,undefined,false); 
			
			copyArgs(msg,"ruleName",params,undefined,false); 
			

			svc.getTopicRule(params,cb);
		}
			service.GetTopicRuleDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			

			svc.getTopicRuleDestination(params,cb);
		}
			service.GetV2LoggingOptions=function(svc,msg,cb){
			var params={};
			
			
			
			

			svc.getV2LoggingOptions(params,cb);
		}
			service.ListActiveViolations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"thingName",params,undefined,false); 
			copyArgs(n,"securityProfileName",params,undefined,false); 
			copyArgs(n,"behaviorCriteriaType",params,undefined,false); 
			copyArgs(Boolean(n),"listSuppressedAlerts",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"thingName",params,undefined,false); 
			copyArgs(msg,"securityProfileName",params,undefined,false); 
			copyArgs(msg,"behaviorCriteriaType",params,undefined,false); 
			copyArgs(msg,"listSuppressedAlerts",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listActiveViolations(params,cb);
		}
			service.ListAttachedPolicies=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"target",params,undefined,false); 
			
			copyArgs(n,"target",params,undefined,false); 
			copyArgs(Boolean(n),"recursive",params,undefined,false); 
			copyArgs(n,"marker",params,undefined,false); 
			copyArgs(Number(n),"pageSize",params,undefined,false); 
			
			copyArgs(msg,"target",params,undefined,false); 
			copyArgs(msg,"recursive",params,undefined,false); 
			copyArgs(msg,"marker",params,undefined,false); 
			copyArgs(msg,"pageSize",params,undefined,false); 
			

			svc.listAttachedPolicies(params,cb);
		}
			service.ListAuditFindings=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"taskId",params,undefined,false); 
			copyArgs(n,"checkName",params,undefined,false); 
			copyArgs(n,"resourceIdentifier",params,undefined,true); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(Boolean(n),"listSuppressedFindings",params,undefined,false); 
			
			copyArgs(msg,"taskId",params,undefined,false); 
			copyArgs(msg,"checkName",params,undefined,false); 
			copyArgs(msg,"resourceIdentifier",params,undefined,true); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"startTime",params,undefined,false); 
			copyArgs(msg,"endTime",params,undefined,false); 
			copyArgs(msg,"listSuppressedFindings",params,undefined,false); 
			

			svc.listAuditFindings(params,cb);
		}
			service.ListAuditMitigationActionsExecutions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"taskId",params,undefined,false); 
			copyArgs(n,"findingId",params,undefined,false); 
			
			copyArgs(n,"taskId",params,undefined,false); 
			copyArgs(n,"actionStatus",params,undefined,false); 
			copyArgs(n,"findingId",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"taskId",params,undefined,false); 
			copyArgs(msg,"actionStatus",params,undefined,false); 
			copyArgs(msg,"findingId",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listAuditMitigationActionsExecutions(params,cb);
		}
			service.ListAuditMitigationActionsTasks=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			
			copyArgs(n,"auditTaskId",params,undefined,false); 
			copyArgs(n,"findingId",params,undefined,false); 
			copyArgs(n,"taskStatus",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			
			copyArgs(msg,"auditTaskId",params,undefined,false); 
			copyArgs(msg,"findingId",params,undefined,false); 
			copyArgs(msg,"taskStatus",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"startTime",params,undefined,false); 
			copyArgs(msg,"endTime",params,undefined,false); 
			

			svc.listAuditMitigationActionsTasks(params,cb);
		}
			service.ListAuditSuppressions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"checkName",params,undefined,false); 
			copyArgs(n,"resourceIdentifier",params,undefined,true); 
			copyArgs(Boolean(n),"ascendingOrder",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"checkName",params,undefined,false); 
			copyArgs(msg,"resourceIdentifier",params,undefined,true); 
			copyArgs(msg,"ascendingOrder",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listAuditSuppressions(params,cb);
		}
			service.ListAuditTasks=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(n,"taskType",params,undefined,false); 
			copyArgs(n,"taskStatus",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"startTime",params,undefined,false); 
			copyArgs(msg,"endTime",params,undefined,false); 
			copyArgs(msg,"taskType",params,undefined,false); 
			copyArgs(msg,"taskStatus",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listAuditTasks(params,cb);
		}
			service.ListAuthorizers=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"pageSize",params,undefined,false); 
			copyArgs(n,"marker",params,undefined,false); 
			copyArgs(Boolean(n),"ascendingOrder",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			
			copyArgs(msg,"pageSize",params,undefined,false); 
			copyArgs(msg,"marker",params,undefined,false); 
			copyArgs(msg,"ascendingOrder",params,undefined,false); 
			copyArgs(msg,"status",params,undefined,false); 
			

			svc.listAuthorizers(params,cb);
		}
			service.ListBillingGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"namePrefixFilter",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"namePrefixFilter",params,undefined,false); 
			

			svc.listBillingGroups(params,cb);
		}
			service.ListCACertificates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"pageSize",params,undefined,false); 
			copyArgs(n,"marker",params,undefined,false); 
			copyArgs(Boolean(n),"ascendingOrder",params,undefined,false); 
			
			copyArgs(msg,"pageSize",params,undefined,false); 
			copyArgs(msg,"marker",params,undefined,false); 
			copyArgs(msg,"ascendingOrder",params,undefined,false); 
			

			svc.listCACertificates(params,cb);
		}
			service.ListCertificates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"pageSize",params,undefined,false); 
			copyArgs(n,"marker",params,undefined,false); 
			copyArgs(Boolean(n),"ascendingOrder",params,undefined,false); 
			
			copyArgs(msg,"pageSize",params,undefined,false); 
			copyArgs(msg,"marker",params,undefined,false); 
			copyArgs(msg,"ascendingOrder",params,undefined,false); 
			

			svc.listCertificates(params,cb);
		}
			service.ListCertificatesByCA=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"caCertificateId",params,undefined,false); 
			
			copyArgs(n,"caCertificateId",params,undefined,false); 
			copyArgs(Number(n),"pageSize",params,undefined,false); 
			copyArgs(n,"marker",params,undefined,false); 
			copyArgs(Boolean(n),"ascendingOrder",params,undefined,false); 
			
			copyArgs(msg,"caCertificateId",params,undefined,false); 
			copyArgs(msg,"pageSize",params,undefined,false); 
			copyArgs(msg,"marker",params,undefined,false); 
			copyArgs(msg,"ascendingOrder",params,undefined,false); 
			

			svc.listCertificatesByCA(params,cb);
		}
			service.ListCustomMetrics=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listCustomMetrics(params,cb);
		}
			service.ListDetectMitigationActionsExecutions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"taskId",params,undefined,false); 
			copyArgs(n,"violationId",params,undefined,false); 
			copyArgs(n,"thingName",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"taskId",params,undefined,false); 
			copyArgs(msg,"violationId",params,undefined,false); 
			copyArgs(msg,"thingName",params,undefined,false); 
			copyArgs(msg,"startTime",params,undefined,false); 
			copyArgs(msg,"endTime",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listDetectMitigationActionsExecutions(params,cb);
		}
			service.ListDetectMitigationActionsTasks=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"startTime",params,undefined,false); 
			copyArgs(msg,"endTime",params,undefined,false); 
			

			svc.listDetectMitigationActionsTasks(params,cb);
		}
			service.ListDimensions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listDimensions(params,cb);
		}
			service.ListDomainConfigurations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"marker",params,undefined,false); 
			copyArgs(Number(n),"pageSize",params,undefined,false); 
			copyArgs(n,"serviceType",params,undefined,false); 
			
			copyArgs(msg,"marker",params,undefined,false); 
			copyArgs(msg,"pageSize",params,undefined,false); 
			copyArgs(msg,"serviceType",params,undefined,false); 
			

			svc.listDomainConfigurations(params,cb);
		}
			service.ListFleetMetrics=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listFleetMetrics(params,cb);
		}
			service.ListIndices=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listIndices(params,cb);
		}
			service.ListJobExecutionsForJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"jobId",params,undefined,false); 
			copyArgs(msg,"status",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listJobExecutionsForJob(params,cb);
		}
			service.ListJobExecutionsForThing=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"thingName",params,undefined,false); 
			
			copyArgs(n,"thingName",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			copyArgs(n,"namespaceId",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"thingName",params,undefined,false); 
			copyArgs(msg,"status",params,undefined,false); 
			copyArgs(msg,"namespaceId",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listJobExecutionsForThing(params,cb);
		}
			service.ListJobTemplates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listJobTemplates(params,cb);
		}
			service.ListJobs=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"status",params,undefined,false); 
			copyArgs(n,"targetSelection",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"thingGroupName",params,undefined,false); 
			copyArgs(n,"thingGroupId",params,undefined,false); 
			copyArgs(n,"namespaceId",params,undefined,false); 
			
			copyArgs(msg,"status",params,undefined,false); 
			copyArgs(msg,"targetSelection",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"thingGroupName",params,undefined,false); 
			copyArgs(msg,"thingGroupId",params,undefined,false); 
			copyArgs(msg,"namespaceId",params,undefined,false); 
			

			svc.listJobs(params,cb);
		}
			service.ListMitigationActions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"actionType",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"actionType",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listMitigationActions(params,cb);
		}
			service.ListOTAUpdates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(n,"otaUpdateStatus",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"otaUpdateStatus",params,undefined,false); 
			

			svc.listOTAUpdates(params,cb);
		}
			service.ListOutgoingCertificates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"pageSize",params,undefined,false); 
			copyArgs(n,"marker",params,undefined,false); 
			copyArgs(Boolean(n),"ascendingOrder",params,undefined,false); 
			
			copyArgs(msg,"pageSize",params,undefined,false); 
			copyArgs(msg,"marker",params,undefined,false); 
			copyArgs(msg,"ascendingOrder",params,undefined,false); 
			

			svc.listOutgoingCertificates(params,cb);
		}
			service.ListPolicies=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"marker",params,undefined,false); 
			copyArgs(Number(n),"pageSize",params,undefined,false); 
			copyArgs(Boolean(n),"ascendingOrder",params,undefined,false); 
			
			copyArgs(msg,"marker",params,undefined,false); 
			copyArgs(msg,"pageSize",params,undefined,false); 
			copyArgs(msg,"ascendingOrder",params,undefined,false); 
			

			svc.listPolicies(params,cb);
		}
			service.ListPolicyPrincipals=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"policyName",params,undefined,false); 
			
			copyArgs(n,"policyName",params,undefined,false); 
			copyArgs(n,"marker",params,undefined,false); 
			copyArgs(Number(n),"pageSize",params,undefined,false); 
			copyArgs(Boolean(n),"ascendingOrder",params,undefined,false); 
			
			copyArgs(msg,"policyName",params,undefined,false); 
			copyArgs(msg,"marker",params,undefined,false); 
			copyArgs(msg,"pageSize",params,undefined,false); 
			copyArgs(msg,"ascendingOrder",params,undefined,false); 
			

			svc.listPolicyPrincipals(params,cb);
		}
			service.ListPolicyVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"policyName",params,undefined,false); 
			
			copyArgs(n,"policyName",params,undefined,false); 
			
			copyArgs(msg,"policyName",params,undefined,false); 
			

			svc.listPolicyVersions(params,cb);
		}
			service.ListPrincipalPolicies=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"principal",params,undefined,false); 
			
			copyArgs(n,"principal",params,undefined,false); 
			copyArgs(n,"marker",params,undefined,false); 
			copyArgs(Number(n),"pageSize",params,undefined,false); 
			copyArgs(Boolean(n),"ascendingOrder",params,undefined,false); 
			
			copyArgs(msg,"principal",params,undefined,false); 
			copyArgs(msg,"marker",params,undefined,false); 
			copyArgs(msg,"pageSize",params,undefined,false); 
			copyArgs(msg,"ascendingOrder",params,undefined,false); 
			

			svc.listPrincipalPolicies(params,cb);
		}
			service.ListPrincipalThings=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"principal",params,undefined,false); 
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"principal",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"principal",params,undefined,false); 
			

			svc.listPrincipalThings(params,cb);
		}
			service.ListProvisioningTemplateVersions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(n,"templateName",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"templateName",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listProvisioningTemplateVersions(params,cb);
		}
			service.ListProvisioningTemplates=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listProvisioningTemplates(params,cb);
		}
			service.ListRoleAliases=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"pageSize",params,undefined,false); 
			copyArgs(n,"marker",params,undefined,false); 
			copyArgs(Boolean(n),"ascendingOrder",params,undefined,false); 
			
			copyArgs(msg,"pageSize",params,undefined,false); 
			copyArgs(msg,"marker",params,undefined,false); 
			copyArgs(msg,"ascendingOrder",params,undefined,false); 
			

			svc.listRoleAliases(params,cb);
		}
			service.ListScheduledAudits=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listScheduledAudits(params,cb);
		}
			service.ListSecurityProfiles=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"dimensionName",params,undefined,false); 
			copyArgs(n,"metricName",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"dimensionName",params,undefined,false); 
			copyArgs(msg,"metricName",params,undefined,false); 
			

			svc.listSecurityProfiles(params,cb);
		}
			service.ListSecurityProfilesForTarget=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"securityProfileTargetArn",params,undefined,false); 
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(Boolean(n),"recursive",params,undefined,false); 
			copyArgs(n,"securityProfileTargetArn",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"recursive",params,undefined,false); 
			copyArgs(msg,"securityProfileTargetArn",params,undefined,false); 
			

			svc.listSecurityProfilesForTarget(params,cb);
		}
			service.ListStreams=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Boolean(n),"ascendingOrder",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"ascendingOrder",params,undefined,false); 
			

			svc.listStreams(params,cb);
		}
			service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			
			copyArgs(n,"resourceArn",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"resourceArn",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}
			service.ListTargetsForPolicy=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"policyName",params,undefined,false); 
			
			copyArgs(n,"policyName",params,undefined,false); 
			copyArgs(n,"marker",params,undefined,false); 
			copyArgs(Number(n),"pageSize",params,undefined,false); 
			
			copyArgs(msg,"policyName",params,undefined,false); 
			copyArgs(msg,"marker",params,undefined,false); 
			copyArgs(msg,"pageSize",params,undefined,false); 
			

			svc.listTargetsForPolicy(params,cb);
		}
			service.ListTargetsForSecurityProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"securityProfileName",params,undefined,false); 
			
			copyArgs(n,"securityProfileName",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"securityProfileName",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listTargetsForSecurityProfile(params,cb);
		}
			service.ListThingGroups=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"parentGroup",params,undefined,false); 
			copyArgs(n,"namePrefixFilter",params,undefined,false); 
			copyArgs(Boolean(n),"recursive",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"parentGroup",params,undefined,false); 
			copyArgs(msg,"namePrefixFilter",params,undefined,false); 
			copyArgs(msg,"recursive",params,undefined,false); 
			

			svc.listThingGroups(params,cb);
		}
			service.ListThingGroupsForThing=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"thingName",params,undefined,false); 
			
			copyArgs(n,"thingName",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"thingName",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listThingGroupsForThing(params,cb);
		}
			service.ListThingPrincipals=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"thingName",params,undefined,false); 
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"thingName",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"thingName",params,undefined,false); 
			

			svc.listThingPrincipals(params,cb);
		}
			service.ListThingRegistrationTaskReports=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"taskId",params,undefined,false); 
			copyArgs(n,"reportType",params,undefined,false); 
			
			copyArgs(n,"taskId",params,undefined,false); 
			copyArgs(n,"reportType",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"taskId",params,undefined,false); 
			copyArgs(msg,"reportType",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listThingRegistrationTaskReports(params,cb);
		}
			service.ListThingRegistrationTasks=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"status",params,undefined,false); 
			

			svc.listThingRegistrationTasks(params,cb);
		}
			service.ListThingTypes=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"thingTypeName",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"thingTypeName",params,undefined,false); 
			

			svc.listThingTypes(params,cb);
		}
			service.ListThings=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"attributeName",params,undefined,false); 
			copyArgs(n,"attributeValue",params,undefined,false); 
			copyArgs(n,"thingTypeName",params,undefined,false); 
			copyArgs(Boolean(n),"usePrefixAttributeValue",params,undefined,false); 
			
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"attributeName",params,undefined,false); 
			copyArgs(msg,"attributeValue",params,undefined,false); 
			copyArgs(msg,"thingTypeName",params,undefined,false); 
			copyArgs(msg,"usePrefixAttributeValue",params,undefined,false); 
			

			svc.listThings(params,cb);
		}
			service.ListThingsInBillingGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"billingGroupName",params,undefined,false); 
			
			copyArgs(n,"billingGroupName",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"billingGroupName",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listThingsInBillingGroup(params,cb);
		}
			service.ListThingsInThingGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"thingGroupName",params,undefined,false); 
			
			copyArgs(n,"thingGroupName",params,undefined,false); 
			copyArgs(Boolean(n),"recursive",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"thingGroupName",params,undefined,false); 
			copyArgs(msg,"recursive",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listThingsInThingGroup(params,cb);
		}
			service.ListTopicRuleDestinations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			

			svc.listTopicRuleDestinations(params,cb);
		}
			service.ListTopicRules=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"topic",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Boolean(n),"ruleDisabled",params,undefined,false); 
			
			copyArgs(msg,"topic",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"ruleDisabled",params,undefined,false); 
			

			svc.listTopicRules(params,cb);
		}
			service.ListV2LoggingLevels=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"targetType",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"targetType",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listV2LoggingLevels(params,cb);
		}
			service.ListViolationEvents=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			
			copyArgs(n,"startTime",params,undefined,false); 
			copyArgs(n,"endTime",params,undefined,false); 
			copyArgs(n,"thingName",params,undefined,false); 
			copyArgs(n,"securityProfileName",params,undefined,false); 
			copyArgs(n,"behaviorCriteriaType",params,undefined,false); 
			copyArgs(Boolean(n),"listSuppressedAlerts",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			
			copyArgs(msg,"startTime",params,undefined,false); 
			copyArgs(msg,"endTime",params,undefined,false); 
			copyArgs(msg,"thingName",params,undefined,false); 
			copyArgs(msg,"securityProfileName",params,undefined,false); 
			copyArgs(msg,"behaviorCriteriaType",params,undefined,false); 
			copyArgs(msg,"listSuppressedAlerts",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			

			svc.listViolationEvents(params,cb);
		}
			service.RegisterCACertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"caCertificate",params,undefined,false); 
			copyArgs(n,"verificationCertificate",params,undefined,false); 
			
			copyArgs(n,"caCertificate",params,undefined,false); 
			copyArgs(n,"verificationCertificate",params,undefined,false); 
			copyArgs(Boolean(n),"setAsActive",params,undefined,false); 
			copyArgs(Boolean(n),"allowAutoRegistration",params,undefined,false); 
			copyArgs(n,"registrationConfig",params,undefined,true); 
			copyArgs(n,"tags",params,undefined,true); 
			
			copyArgs(msg,"caCertificate",params,undefined,false); 
			copyArgs(msg,"verificationCertificate",params,undefined,false); 
			copyArgs(msg,"setAsActive",params,undefined,false); 
			copyArgs(msg,"allowAutoRegistration",params,undefined,false); 
			copyArgs(msg,"registrationConfig",params,undefined,true); 
			copyArgs(msg,"tags",params,undefined,true); 
			

			svc.registerCACertificate(params,cb);
		}
			service.RegisterCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"certificatePem",params,undefined,false); 
			
			copyArgs(n,"certificatePem",params,undefined,false); 
			copyArgs(n,"caCertificatePem",params,undefined,false); 
			copyArgs(Boolean(n),"setAsActive",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			
			copyArgs(msg,"certificatePem",params,undefined,false); 
			copyArgs(msg,"caCertificatePem",params,undefined,false); 
			copyArgs(msg,"setAsActive",params,undefined,false); 
			copyArgs(msg,"status",params,undefined,false); 
			

			svc.registerCertificate(params,cb);
		}
			service.RegisterCertificateWithoutCA=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"certificatePem",params,undefined,false); 
			
			copyArgs(n,"certificatePem",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			
			copyArgs(msg,"certificatePem",params,undefined,false); 
			copyArgs(msg,"status",params,undefined,false); 
			

			svc.registerCertificateWithoutCA(params,cb);
		}
			service.RegisterThing=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"templateBody",params,undefined,false); 
			
			copyArgs(n,"templateBody",params,undefined,false); 
			copyArgs(n,"parameters",params,undefined,false); 
			
			copyArgs(msg,"templateBody",params,undefined,false); 
			copyArgs(msg,"parameters",params,undefined,false); 
			

			svc.registerThing(params,cb);
		}
			service.RejectCertificateTransfer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"certificateId",params,undefined,false); 
			
			copyArgs(n,"certificateId",params,undefined,false); 
			copyArgs(n,"rejectReason",params,undefined,false); 
			
			copyArgs(msg,"certificateId",params,undefined,false); 
			copyArgs(msg,"rejectReason",params,undefined,false); 
			

			svc.rejectCertificateTransfer(params,cb);
		}
			service.RemoveThingFromBillingGroup=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"billingGroupName",params,undefined,false); 
			copyArgs(n,"billingGroupArn",params,undefined,false); 
			copyArgs(n,"thingName",params,undefined,false); 
			copyArgs(n,"thingArn",params,undefined,false); 
			
			copyArgs(msg,"billingGroupName",params,undefined,false); 
			copyArgs(msg,"billingGroupArn",params,undefined,false); 
			copyArgs(msg,"thingName",params,undefined,false); 
			copyArgs(msg,"thingArn",params,undefined,false); 
			

			svc.removeThingFromBillingGroup(params,cb);
		}
			service.RemoveThingFromThingGroup=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"thingGroupName",params,undefined,false); 
			copyArgs(n,"thingGroupArn",params,undefined,false); 
			copyArgs(n,"thingName",params,undefined,false); 
			copyArgs(n,"thingArn",params,undefined,false); 
			
			copyArgs(msg,"thingGroupName",params,undefined,false); 
			copyArgs(msg,"thingGroupArn",params,undefined,false); 
			copyArgs(msg,"thingName",params,undefined,false); 
			copyArgs(msg,"thingArn",params,undefined,false); 
			

			svc.removeThingFromThingGroup(params,cb);
		}
			service.ReplaceTopicRule=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"ruleName",params,undefined,false); 
			copyArgs(n,"topicRulePayload",params,undefined,true); 
			
			copyArgs(n,"ruleName",params,undefined,false); 
			copyArgs(n,"topicRulePayload",params,undefined,true); 
			
			copyArgs(msg,"ruleName",params,undefined,false); 
			copyArgs(msg,"topicRulePayload",params,undefined,true); 
			

			svc.replaceTopicRule(params,cb);
		}
			service.SearchIndex=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"queryString",params,undefined,false); 
			
			copyArgs(n,"indexName",params,undefined,false); 
			copyArgs(n,"queryString",params,undefined,false); 
			copyArgs(n,"nextToken",params,undefined,false); 
			copyArgs(Number(n),"maxResults",params,undefined,false); 
			copyArgs(n,"queryVersion",params,undefined,false); 
			
			copyArgs(msg,"indexName",params,undefined,false); 
			copyArgs(msg,"queryString",params,undefined,false); 
			copyArgs(msg,"nextToken",params,undefined,false); 
			copyArgs(msg,"maxResults",params,undefined,false); 
			copyArgs(msg,"queryVersion",params,undefined,false); 
			

			svc.searchIndex(params,cb);
		}
			service.SetDefaultAuthorizer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"authorizerName",params,undefined,false); 
			
			copyArgs(n,"authorizerName",params,undefined,false); 
			
			copyArgs(msg,"authorizerName",params,undefined,false); 
			

			svc.setDefaultAuthorizer(params,cb);
		}
			service.SetDefaultPolicyVersion=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"policyName",params,undefined,false); 
			copyArgs(n,"policyVersionId",params,undefined,false); 
			
			copyArgs(n,"policyName",params,undefined,false); 
			copyArgs(n,"policyVersionId",params,undefined,false); 
			
			copyArgs(msg,"policyName",params,undefined,false); 
			copyArgs(msg,"policyVersionId",params,undefined,false); 
			

			svc.setDefaultPolicyVersion(params,cb);
		}
			service.SetLoggingOptions=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"loggingOptionsPayload",params,undefined,false); 
			
			copyArgs(n,"loggingOptionsPayload",params,undefined,false); 
			
			copyArgs(msg,"loggingOptionsPayload",params,undefined,false); 
			

			svc.setLoggingOptions(params,cb);
		}
			service.SetV2LoggingLevel=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"logTarget",params,undefined,true); 
			copyArgs(n,"logLevel",params,undefined,false); 
			
			copyArgs(n,"logTarget",params,undefined,true); 
			copyArgs(n,"logLevel",params,undefined,false); 
			
			copyArgs(msg,"logTarget",params,undefined,true); 
			copyArgs(msg,"logLevel",params,undefined,false); 
			

			svc.setV2LoggingLevel(params,cb);
		}
			service.SetV2LoggingOptions=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"roleArn",params,undefined,false); 
			copyArgs(n,"defaultLogLevel",params,undefined,false); 
			copyArgs(Boolean(n),"disableAllLogs",params,undefined,false); 
			
			copyArgs(msg,"roleArn",params,undefined,false); 
			copyArgs(msg,"defaultLogLevel",params,undefined,false); 
			copyArgs(msg,"disableAllLogs",params,undefined,false); 
			

			svc.setV2LoggingOptions(params,cb);
		}
			service.StartAuditMitigationActionsTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"taskId",params,undefined,false); 
			copyArgs(n,"target",params,undefined,true); 
			copyArgs(n,"auditCheckToActionsMapping",params,undefined,true); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(n,"taskId",params,undefined,false); 
			copyArgs(n,"target",params,undefined,true); 
			copyArgs(n,"auditCheckToActionsMapping",params,undefined,true); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"taskId",params,undefined,false); 
			copyArgs(msg,"target",params,undefined,true); 
			copyArgs(msg,"auditCheckToActionsMapping",params,undefined,true); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			

			svc.startAuditMitigationActionsTask(params,cb);
		}
			service.StartDetectMitigationActionsTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"taskId",params,undefined,false); 
			copyArgs(n,"target",params,undefined,true); 
			copyArgs(n,"actions",params,undefined,false); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(n,"taskId",params,undefined,false); 
			copyArgs(n,"target",params,undefined,true); 
			copyArgs(n,"actions",params,undefined,false); 
			copyArgs(n,"violationEventOccurrenceRange",params,undefined,true); 
			copyArgs(Boolean(n),"includeOnlyActiveViolations",params,undefined,false); 
			copyArgs(Boolean(n),"includeSuppressedAlerts",params,undefined,false); 
			copyArgs(n,"clientRequestToken",params,undefined,false); 
			
			copyArgs(msg,"taskId",params,undefined,false); 
			copyArgs(msg,"target",params,undefined,true); 
			copyArgs(msg,"actions",params,undefined,false); 
			copyArgs(msg,"violationEventOccurrenceRange",params,undefined,true); 
			copyArgs(msg,"includeOnlyActiveViolations",params,undefined,false); 
			copyArgs(msg,"includeSuppressedAlerts",params,undefined,false); 
			copyArgs(msg,"clientRequestToken",params,undefined,false); 
			

			svc.startDetectMitigationActionsTask(params,cb);
		}
			service.StartOnDemandAuditTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"targetCheckNames",params,undefined,true); 
			
			copyArgs(n,"targetCheckNames",params,undefined,true); 
			
			copyArgs(msg,"targetCheckNames",params,undefined,true); 
			

			svc.startOnDemandAuditTask(params,cb);
		}
			service.StartThingRegistrationTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"templateBody",params,undefined,false); 
			copyArgs(n,"inputFileBucket",params,undefined,false); 
			copyArgs(n,"inputFileKey",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			
			copyArgs(n,"templateBody",params,undefined,false); 
			copyArgs(n,"inputFileBucket",params,undefined,false); 
			copyArgs(n,"inputFileKey",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			
			copyArgs(msg,"templateBody",params,undefined,false); 
			copyArgs(msg,"inputFileBucket",params,undefined,false); 
			copyArgs(msg,"inputFileKey",params,undefined,false); 
			copyArgs(msg,"roleArn",params,undefined,false); 
			

			svc.startThingRegistrationTask(params,cb);
		}
			service.StopThingRegistrationTask=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"taskId",params,undefined,false); 
			
			copyArgs(n,"taskId",params,undefined,false); 
			
			copyArgs(msg,"taskId",params,undefined,false); 
			

			svc.stopThingRegistrationTask(params,cb);
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
			service.TestAuthorization=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"authInfos",params,undefined,false); 
			
			copyArgs(n,"principal",params,undefined,false); 
			copyArgs(n,"cognitoIdentityPoolId",params,undefined,false); 
			copyArgs(n,"authInfos",params,undefined,false); 
			copyArgs(n,"clientId",params,undefined,false); 
			copyArgs(n,"policyNamesToAdd",params,undefined,true); 
			copyArgs(n,"policyNamesToSkip",params,undefined,true); 
			
			copyArgs(msg,"principal",params,undefined,false); 
			copyArgs(msg,"cognitoIdentityPoolId",params,undefined,false); 
			copyArgs(msg,"authInfos",params,undefined,false); 
			copyArgs(msg,"clientId",params,undefined,false); 
			copyArgs(msg,"policyNamesToAdd",params,undefined,true); 
			copyArgs(msg,"policyNamesToSkip",params,undefined,true); 
			

			svc.testAuthorization(params,cb);
		}
			service.TestInvokeAuthorizer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"authorizerName",params,undefined,false); 
			
			copyArgs(n,"authorizerName",params,undefined,false); 
			copyArgs(n,"token",params,undefined,false); 
			copyArgs(n,"tokenSignature",params,undefined,false); 
			copyArgs(n,"httpContext",params,undefined,false); 
			copyArgs(n,"mqttContext",params,undefined,false); 
			copyArgs(n,"tlsContext",params,undefined,false); 
			
			copyArgs(msg,"authorizerName",params,undefined,false); 
			copyArgs(msg,"token",params,undefined,false); 
			copyArgs(msg,"tokenSignature",params,undefined,false); 
			copyArgs(msg,"httpContext",params,undefined,false); 
			copyArgs(msg,"mqttContext",params,undefined,false); 
			copyArgs(msg,"tlsContext",params,undefined,false); 
			

			svc.testInvokeAuthorizer(params,cb);
		}
			service.TransferCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"certificateId",params,undefined,false); 
			copyArgs(n,"targetAwsAccount",params,undefined,false); 
			
			copyArgs(n,"certificateId",params,undefined,false); 
			copyArgs(n,"targetAwsAccount",params,undefined,false); 
			copyArgs(n,"transferMessage",params,undefined,false); 
			
			copyArgs(msg,"certificateId",params,undefined,false); 
			copyArgs(msg,"targetAwsAccount",params,undefined,false); 
			copyArgs(msg,"transferMessage",params,undefined,false); 
			

			svc.transferCertificate(params,cb);
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
			service.UpdateAccountAuditConfiguration=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"roleArn",params,undefined,false); 
			copyArgs(n,"auditNotificationTargetConfigurations",params,undefined,true); 
			copyArgs(n,"auditCheckConfigurations",params,undefined,true); 
			
			copyArgs(msg,"roleArn",params,undefined,false); 
			copyArgs(msg,"auditNotificationTargetConfigurations",params,undefined,true); 
			copyArgs(msg,"auditCheckConfigurations",params,undefined,true); 
			

			svc.updateAccountAuditConfiguration(params,cb);
		}
			service.UpdateAuditSuppression=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"checkName",params,undefined,false); 
			copyArgs(n,"resourceIdentifier",params,undefined,true); 
			
			copyArgs(n,"checkName",params,undefined,false); 
			copyArgs(n,"resourceIdentifier",params,undefined,true); 
			copyArgs(n,"expirationDate",params,undefined,false); 
			copyArgs(Boolean(n),"suppressIndefinitely",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			
			copyArgs(msg,"checkName",params,undefined,false); 
			copyArgs(msg,"resourceIdentifier",params,undefined,true); 
			copyArgs(msg,"expirationDate",params,undefined,false); 
			copyArgs(msg,"suppressIndefinitely",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			

			svc.updateAuditSuppression(params,cb);
		}
			service.UpdateAuthorizer=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"authorizerName",params,undefined,false); 
			
			copyArgs(n,"authorizerName",params,undefined,false); 
			copyArgs(n,"authorizerFunctionArn",params,undefined,false); 
			copyArgs(n,"tokenKeyName",params,undefined,false); 
			copyArgs(n,"tokenSigningPublicKeys",params,undefined,true); 
			copyArgs(n,"status",params,undefined,false); 
			
			copyArgs(msg,"authorizerName",params,undefined,false); 
			copyArgs(msg,"authorizerFunctionArn",params,undefined,false); 
			copyArgs(msg,"tokenKeyName",params,undefined,false); 
			copyArgs(msg,"tokenSigningPublicKeys",params,undefined,true); 
			copyArgs(msg,"status",params,undefined,false); 
			

			svc.updateAuthorizer(params,cb);
		}
			service.UpdateBillingGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"billingGroupName",params,undefined,false); 
			copyArgs(n,"billingGroupProperties",params,undefined,true); 
			
			copyArgs(n,"billingGroupName",params,undefined,false); 
			copyArgs(n,"billingGroupProperties",params,undefined,true); 
			copyArgs(n,"expectedVersion",params,undefined,false); 
			
			copyArgs(msg,"billingGroupName",params,undefined,false); 
			copyArgs(msg,"billingGroupProperties",params,undefined,true); 
			copyArgs(msg,"expectedVersion",params,undefined,false); 
			

			svc.updateBillingGroup(params,cb);
		}
			service.UpdateCACertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"certificateId",params,undefined,false); 
			
			copyArgs(n,"certificateId",params,undefined,false); 
			copyArgs(n,"newStatus",params,undefined,false); 
			copyArgs(n,"newAutoRegistrationStatus",params,undefined,false); 
			copyArgs(n,"registrationConfig",params,undefined,true); 
			copyArgs(Boolean(n),"removeAutoRegistration",params,undefined,false); 
			
			copyArgs(msg,"certificateId",params,undefined,false); 
			copyArgs(msg,"newStatus",params,undefined,false); 
			copyArgs(msg,"newAutoRegistrationStatus",params,undefined,false); 
			copyArgs(msg,"registrationConfig",params,undefined,true); 
			copyArgs(msg,"removeAutoRegistration",params,undefined,false); 
			

			svc.updateCACertificate(params,cb);
		}
			service.UpdateCertificate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"certificateId",params,undefined,false); 
			copyArgs(n,"newStatus",params,undefined,false); 
			
			copyArgs(n,"certificateId",params,undefined,false); 
			copyArgs(n,"newStatus",params,undefined,false); 
			
			copyArgs(msg,"certificateId",params,undefined,false); 
			copyArgs(msg,"newStatus",params,undefined,false); 
			

			svc.updateCertificate(params,cb);
		}
			service.UpdateCustomMetric=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"metricName",params,undefined,false); 
			copyArgs(n,"displayName",params,undefined,false); 
			
			copyArgs(n,"metricName",params,undefined,false); 
			copyArgs(n,"displayName",params,undefined,false); 
			
			copyArgs(msg,"metricName",params,undefined,false); 
			copyArgs(msg,"displayName",params,undefined,false); 
			

			svc.updateCustomMetric(params,cb);
		}
			service.UpdateDimension=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"stringValues",params,undefined,true); 
			
			copyArgs(n,"name",params,undefined,false); 
			copyArgs(n,"stringValues",params,undefined,true); 
			
			copyArgs(msg,"name",params,undefined,false); 
			copyArgs(msg,"stringValues",params,undefined,true); 
			

			svc.updateDimension(params,cb);
		}
			service.UpdateDomainConfiguration=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"domainConfigurationName",params,undefined,false); 
			
			copyArgs(n,"domainConfigurationName",params,undefined,false); 
			copyArgs(n,"authorizerConfig",params,undefined,true); 
			copyArgs(n,"domainConfigurationStatus",params,undefined,false); 
			copyArgs(Boolean(n),"removeAuthorizerConfig",params,undefined,false); 
			
			copyArgs(msg,"domainConfigurationName",params,undefined,false); 
			copyArgs(msg,"authorizerConfig",params,undefined,true); 
			copyArgs(msg,"domainConfigurationStatus",params,undefined,false); 
			copyArgs(msg,"removeAuthorizerConfig",params,undefined,false); 
			

			svc.updateDomainConfiguration(params,cb);
		}
			service.UpdateDynamicThingGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"thingGroupName",params,undefined,false); 
			copyArgs(n,"thingGroupProperties",params,undefined,true); 
			
			copyArgs(n,"thingGroupName",params,undefined,false); 
			copyArgs(n,"thingGroupProperties",params,undefined,true); 
			copyArgs(n,"expectedVersion",params,undefined,false); 
			copyArgs(n,"indexName",params,undefined,false); 
			copyArgs(n,"queryString",params,undefined,false); 
			copyArgs(n,"queryVersion",params,undefined,false); 
			
			copyArgs(msg,"thingGroupName",params,undefined,false); 
			copyArgs(msg,"thingGroupProperties",params,undefined,true); 
			copyArgs(msg,"expectedVersion",params,undefined,false); 
			copyArgs(msg,"indexName",params,undefined,false); 
			copyArgs(msg,"queryString",params,undefined,false); 
			copyArgs(msg,"queryVersion",params,undefined,false); 
			

			svc.updateDynamicThingGroup(params,cb);
		}
			service.UpdateEventConfigurations=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"eventConfigurations",params,undefined,true); 
			
			copyArgs(msg,"eventConfigurations",params,undefined,true); 
			

			svc.updateEventConfigurations(params,cb);
		}
			service.UpdateFleetMetric=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"metricName",params,undefined,false); 
			copyArgs(n,"indexName",params,undefined,false); 
			
			copyArgs(n,"metricName",params,undefined,false); 
			copyArgs(n,"queryString",params,undefined,false); 
			copyArgs(n,"aggregationType",params,undefined,true); 
			copyArgs(Number(n),"period",params,undefined,false); 
			copyArgs(n,"aggregationField",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"queryVersion",params,undefined,false); 
			copyArgs(n,"indexName",params,undefined,false); 
			copyArgs(n,"unit",params,undefined,false); 
			copyArgs(n,"expectedVersion",params,undefined,false); 
			
			copyArgs(msg,"metricName",params,undefined,false); 
			copyArgs(msg,"queryString",params,undefined,false); 
			copyArgs(msg,"aggregationType",params,undefined,true); 
			copyArgs(msg,"period",params,undefined,false); 
			copyArgs(msg,"aggregationField",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"queryVersion",params,undefined,false); 
			copyArgs(msg,"indexName",params,undefined,false); 
			copyArgs(msg,"unit",params,undefined,false); 
			copyArgs(msg,"expectedVersion",params,undefined,false); 
			

			svc.updateFleetMetric(params,cb);
		}
			service.UpdateIndexingConfiguration=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"thingIndexingConfiguration",params,undefined,true); 
			copyArgs(n,"thingGroupIndexingConfiguration",params,undefined,true); 
			
			copyArgs(msg,"thingIndexingConfiguration",params,undefined,true); 
			copyArgs(msg,"thingGroupIndexingConfiguration",params,undefined,true); 
			

			svc.updateIndexingConfiguration(params,cb);
		}
			service.UpdateJob=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"jobId",params,undefined,false); 
			
			copyArgs(n,"jobId",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"presignedUrlConfig",params,undefined,true); 
			copyArgs(n,"jobExecutionsRolloutConfig",params,undefined,true); 
			copyArgs(n,"abortConfig",params,undefined,true); 
			copyArgs(n,"timeoutConfig",params,undefined,true); 
			copyArgs(n,"namespaceId",params,undefined,false); 
			
			copyArgs(msg,"jobId",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"presignedUrlConfig",params,undefined,true); 
			copyArgs(msg,"jobExecutionsRolloutConfig",params,undefined,true); 
			copyArgs(msg,"abortConfig",params,undefined,true); 
			copyArgs(msg,"timeoutConfig",params,undefined,true); 
			copyArgs(msg,"namespaceId",params,undefined,false); 
			

			svc.updateJob(params,cb);
		}
			service.UpdateMitigationAction=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"actionName",params,undefined,false); 
			
			copyArgs(n,"actionName",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			copyArgs(n,"actionParams",params,undefined,true); 
			
			copyArgs(msg,"actionName",params,undefined,false); 
			copyArgs(msg,"roleArn",params,undefined,false); 
			copyArgs(msg,"actionParams",params,undefined,true); 
			

			svc.updateMitigationAction(params,cb);
		}
			service.UpdateProvisioningTemplate=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"templateName",params,undefined,false); 
			
			copyArgs(n,"templateName",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(Boolean(n),"enabled",params,undefined,false); 
			copyArgs(Number(n),"defaultVersionId",params,undefined,false); 
			copyArgs(n,"provisioningRoleArn",params,undefined,false); 
			copyArgs(n,"preProvisioningHook",params,undefined,true); 
			copyArgs(Boolean(n),"removePreProvisioningHook",params,undefined,false); 
			
			copyArgs(msg,"templateName",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"enabled",params,undefined,false); 
			copyArgs(msg,"defaultVersionId",params,undefined,false); 
			copyArgs(msg,"provisioningRoleArn",params,undefined,false); 
			copyArgs(msg,"preProvisioningHook",params,undefined,true); 
			copyArgs(msg,"removePreProvisioningHook",params,undefined,false); 
			

			svc.updateProvisioningTemplate(params,cb);
		}
			service.UpdateRoleAlias=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"roleAlias",params,undefined,false); 
			
			copyArgs(n,"roleAlias",params,undefined,false); 
			copyArgs(n,"roleArn",params,undefined,false); 
			copyArgs(Number(n),"credentialDurationSeconds",params,undefined,false); 
			
			copyArgs(msg,"roleAlias",params,undefined,false); 
			copyArgs(msg,"roleArn",params,undefined,false); 
			copyArgs(msg,"credentialDurationSeconds",params,undefined,false); 
			

			svc.updateRoleAlias(params,cb);
		}
			service.UpdateScheduledAudit=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"scheduledAuditName",params,undefined,false); 
			
			copyArgs(n,"frequency",params,undefined,false); 
			copyArgs(n,"dayOfMonth",params,undefined,false); 
			copyArgs(n,"dayOfWeek",params,undefined,false); 
			copyArgs(n,"targetCheckNames",params,undefined,true); 
			copyArgs(n,"scheduledAuditName",params,undefined,false); 
			
			copyArgs(msg,"frequency",params,undefined,false); 
			copyArgs(msg,"dayOfMonth",params,undefined,false); 
			copyArgs(msg,"dayOfWeek",params,undefined,false); 
			copyArgs(msg,"targetCheckNames",params,undefined,true); 
			copyArgs(msg,"scheduledAuditName",params,undefined,false); 
			

			svc.updateScheduledAudit(params,cb);
		}
			service.UpdateSecurityProfile=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"securityProfileName",params,undefined,false); 
			
			copyArgs(n,"securityProfileName",params,undefined,false); 
			copyArgs(n,"securityProfileDescription",params,undefined,false); 
			copyArgs(n,"behaviors",params,undefined,true); 
			copyArgs(n,"alertTargets",params,undefined,true); 
			copyArgs(n,"additionalMetricsToRetain",params,undefined,true); 
			copyArgs(n,"additionalMetricsToRetainV2",params,undefined,true); 
			copyArgs(Boolean(n),"deleteBehaviors",params,undefined,false); 
			copyArgs(Boolean(n),"deleteAlertTargets",params,undefined,false); 
			copyArgs(Boolean(n),"deleteAdditionalMetricsToRetain",params,undefined,false); 
			copyArgs(n,"expectedVersion",params,undefined,false); 
			
			copyArgs(msg,"securityProfileName",params,undefined,false); 
			copyArgs(msg,"securityProfileDescription",params,undefined,false); 
			copyArgs(msg,"behaviors",params,undefined,true); 
			copyArgs(msg,"alertTargets",params,undefined,true); 
			copyArgs(msg,"additionalMetricsToRetain",params,undefined,true); 
			copyArgs(msg,"additionalMetricsToRetainV2",params,undefined,true); 
			copyArgs(msg,"deleteBehaviors",params,undefined,false); 
			copyArgs(msg,"deleteAlertTargets",params,undefined,false); 
			copyArgs(msg,"deleteAdditionalMetricsToRetain",params,undefined,false); 
			copyArgs(msg,"expectedVersion",params,undefined,false); 
			

			svc.updateSecurityProfile(params,cb);
		}
			service.UpdateStream=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"streamId",params,undefined,false); 
			
			copyArgs(n,"streamId",params,undefined,false); 
			copyArgs(n,"description",params,undefined,false); 
			copyArgs(n,"files",params,undefined,true); 
			copyArgs(n,"roleArn",params,undefined,false); 
			
			copyArgs(msg,"streamId",params,undefined,false); 
			copyArgs(msg,"description",params,undefined,false); 
			copyArgs(msg,"files",params,undefined,true); 
			copyArgs(msg,"roleArn",params,undefined,false); 
			

			svc.updateStream(params,cb);
		}
			service.UpdateThing=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"thingName",params,undefined,false); 
			
			copyArgs(n,"thingName",params,undefined,false); 
			copyArgs(n,"thingTypeName",params,undefined,false); 
			copyArgs(n,"attributePayload",params,undefined,true); 
			copyArgs(n,"expectedVersion",params,undefined,false); 
			copyArgs(Boolean(n),"removeThingType",params,undefined,false); 
			
			copyArgs(msg,"thingName",params,undefined,false); 
			copyArgs(msg,"thingTypeName",params,undefined,false); 
			copyArgs(msg,"attributePayload",params,undefined,true); 
			copyArgs(msg,"expectedVersion",params,undefined,false); 
			copyArgs(msg,"removeThingType",params,undefined,false); 
			

			svc.updateThing(params,cb);
		}
			service.UpdateThingGroup=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"thingGroupName",params,undefined,false); 
			copyArgs(n,"thingGroupProperties",params,undefined,true); 
			
			copyArgs(n,"thingGroupName",params,undefined,false); 
			copyArgs(n,"thingGroupProperties",params,undefined,true); 
			copyArgs(n,"expectedVersion",params,undefined,false); 
			
			copyArgs(msg,"thingGroupName",params,undefined,false); 
			copyArgs(msg,"thingGroupProperties",params,undefined,true); 
			copyArgs(msg,"expectedVersion",params,undefined,false); 
			

			svc.updateThingGroup(params,cb);
		}
			service.UpdateThingGroupsForThing=function(svc,msg,cb){
			var params={};
			
			
			copyArgs(n,"thingName",params,undefined,false); 
			copyArgs(n,"thingGroupsToAdd",params,undefined,true); 
			copyArgs(n,"thingGroupsToRemove",params,undefined,true); 
			copyArgs(Boolean(n),"overrideDynamicGroups",params,undefined,false); 
			
			copyArgs(msg,"thingName",params,undefined,false); 
			copyArgs(msg,"thingGroupsToAdd",params,undefined,true); 
			copyArgs(msg,"thingGroupsToRemove",params,undefined,true); 
			copyArgs(msg,"overrideDynamicGroups",params,undefined,false); 
			

			svc.updateThingGroupsForThing(params,cb);
		}
			service.UpdateTopicRuleDestination=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			
			copyArgs(n,"arn",params,undefined,false); 
			copyArgs(n,"status",params,undefined,false); 
			
			copyArgs(msg,"arn",params,undefined,false); 
			copyArgs(msg,"status",params,undefined,false); 
			

			svc.updateTopicRuleDestination(params,cb);
		}
			service.ValidateSecurityProfileBehaviors=function(svc,msg,cb){
			var params={};
			
			copyArgs(n,"behaviors",params,undefined,true); 
			
			copyArgs(n,"behaviors",params,undefined,true); 
			
			copyArgs(msg,"behaviors",params,undefined,true); 
			

			svc.validateSecurityProfileBehaviors(params,cb);
		}
	
	}
	RED.nodes.registerType("AWS Iot", AmazonAPINode);

};
