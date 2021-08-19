node-red-contrib-aws
========================
A collection of <a href="http://nodered.org" target="_new">Node-RED</a> nodes for <a href="http://aws.amazon.com/" target="_new">AWS</a>.

Nodes (All AWS API functions are available)
-----------------

Most APIs are available, with the exception of

* Alexa For Business
* Application Auto Scaling
* Auto Scaling Plans
* Chime SDK Identity
* Chime SDK Messaging
* Cognito Identity Provider
* Connect Contact Lens
* Cost and Usage Report Service
* Application Discovery Service
* Database Migration Service
* EC2 Instance Connect
* Elastic Load Balancing
* Elastic Load Balancing v2
* Marketplace Entitlement Service
* Elasticsearch Service
* forecast
* forecastquery
* IoT Jobs Data Plane
* IoT 1Click Devices Service
* IoT 1Click Projects
* IoT Events Data
* Kinesis Video Archived Media
* Kinesis Video Media
* Kinesis Video Signaling
* Kinesis Analytics V2
* Lex Model Building Service
* Marketplace Commerce Analytics
* Lex Models V2
* RDS Data
* Resource Groups Tagging API
* Route53 Recovery Cluster
* Route53 Recovery Control Config
* Route53 Recovery Readiness
* Route 53 Domains
* Lex Runtime Service
* Lex Runtime V2
* SageMaker A2I Runtime
* SageMaker FeatureStore Runtime
* Service Catalog AppRegistry
* Pinpoint SMS Voice
* Snow Device Management
* SFN
* Transcribe

Configuration
------------

Nodes can be configured via the AWS Config node. It is recommended to not set any access key secret key in this node and instead rely on AWS profiles or temporary credentials. If Node-RED is deployed in AWS IoT Greengrass, AWS EC2 or AWS ECS Task, the Node-RED flows can access the AWS IAM Role setup associate with the compute environment.

Alternatively, one can also pass the configuration in an `msg.AWSConfig` object (see below).




Payload returned from the AWS SDK is sometimes (particularly S3.Get) encoded in a BUFFER.  To parse this to a string pass the output into a function with msg.payload=Buffer.from(msg.payload.Body).toString("utf-8") or similar to decode strings.

All nodes (as of v0.5) have two output points, the top outputs data from successful calls, the bottom outputs errors, so you don't need a branching node to separate successful or failure calls.

Make sure that the credentials you are using have sufficient permissions for the function you are using.  If you don't you will get an error message.

Feature requests are welcome, submit an issue at https://github.com/daniel-t/node-red-contrib-aws

Usage
---
All nodes are direct wrappers for the AWS Javascript API, so for information about available parameters consult the API docs https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS.html

Parameters need to be specified as per the AWS API (typically LeadingUpperCase).

if msg.AWSConfig is set, it will override the node configuration.  This allows you to use the same node/flow with different accounts.
For example
	msg.AWSConfig={
		accessKeyId: "ACCESS KEY",
		secretAccessKey:"SECRET KEY",
		region:"Region"
	}



WARNING
----
Only cursory testing of nodes has occurred at this stage, please test and report issues.

Acknowledgements
----------------

The node-red-contrib-aws uses the following open source software:

- [AWS SDK for JavaScript](https://github.com/aws/aws-sdk-js): AWS SDK for JavaScript in the browser and Node.js.

License
-------

See [license](https://github.com/daniel-t/node-red-contrib-aws/blob/master/LICENSE) (Apache License Version 2.0).

Contributions
----

If you want to add a new node to this library, here's some pointers.
- I only accept nodes which are built from the run_build.js script without modification. This is to ensure that I can keep things up to date as the AWS API changes.   If for some reason you cant do that (such as with the IOT node), please also supply a contextual Diff against the automatically built node and an explanation of why it has to be this way.   It's OK to propose changes to the gen scripts, but they need to be as generic as possible.
	- The exception to this are utility nodes, such as DynamoDBConvert
- Please only submit changes to one node per pull request.  If there's a problem with one node, it will delay getting them all in.
- If you update the build scripts, please submit those in a separate request to any new/modified nodes
- Don't submit a complete set of nodes which have only been updated due to a new version of the AWS API. If you need new features, submit individual nodes or create an issue and I will raise the AWS API level across the board.

How to build nodes:

- Make sure you have a working install, and can create flows with some of the existing nodes
- Switch into the gen_scripts directory
- Make a directory called 'build'
- Run 'nodejs run_build.js' - this will automatically generate the entire node set for all AWS services, many which haven't been validated so aren't part of the library
- Copy the files for the service of interest from 'build' to the parent directory
- update package.json to reference the new js file
- Restart node red
- If it works please submit a pull request and let me know how extensively its been tested.

Donations
---
If you like this library and would like to financially support its ongoing development, you can make donations by
Paypal https://www.paypal.me/DanielT253
Bitcoin 124fjAWzBYxhW4CtEj8g9uZqc15z97Fu9A
