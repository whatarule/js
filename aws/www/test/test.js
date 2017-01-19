var http = require("http")	;
var app = http.createServer(function(req,res){
	res.end("hello node.js!")	;
}).listen(8888)	;
