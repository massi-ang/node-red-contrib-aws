tools=require('./gen.js');
fs = require('fs');

files = fs.readdirSync('../node_modules/aws-sdk/apis/');
files = files.map(f => '../node_modules/aws-sdk/apis/'+f).filter(f => f.endsWith('.min.json'));

files.map(tools.buildService);
console.log('\n\n');
var nodes={}
var keywords = []
const packageJson = fs.readFileSync('../package.json');
const package = JSON.parse(packageJson);

fs.readdirSync('build').forEach(f => { 
    keywords.push(f);
    fs.readdirSync(`build/${f}`).forEach(n => { 
        if (n.endsWith('.js')) { 
            nodes['AWS '+ n.split('.')[0]] = `nodes/${f}/${n}`
        }
    });
});

nodes["amazon config"] = "nodes/aws_config.js";
package["node-red"].nodes = nodes;
package["keywords"] = keywords;
fs.writeFileSync("build/package.json", JSON.stringify(package, undefined, 2));


