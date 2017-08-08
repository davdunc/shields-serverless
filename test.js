const express = require("express");
const app = express();
const dns = require("dns");
const os = require("os");
var shield = require("./src/app.js");

app.get("/v2/", function(req,res){
	console.info("Recieved an empty request");
	res.redirect("/v2/left-text/right-text/green?style=flat");
});

app.get("/v2/:left/:right/:color", function (req, res) {
	let payload = {left: req.params.left, right: req.params.right, color: req.params.color, style: req.query.style};
	shield.handler(payload,null,function(err,data){
		if(err) {console.error(err);}
		console.info(data);
		data = Buffer.from(data, "base64");
		res.writeHead(200,{"Content-Type": "image/svg+xml", "Content-Length": data.length});
		res.end(data);
	});
	
});

let port = process.env.PORT || 3000;
app.listen(port, function () {
	dns.lookup(os.hostname(),(err,add) => {
		if (err) { console.error(err);}
		console.info(`Test Endpoint listening on ${add} Port ${port}`);
	});
	
});