var swig = require("swig");
var path = require("path");

class Shield {
	constructor (style) {

		switch(style) {
		case "square":
			this.style = "flat-square-template.svg";
			break;
		case "plastic":
			this.style = "plastic-template.svg";
			break;
		default:
			this.style = "flat-template.svg";
		}
	}

	generate (left,right,color) {
		let params = {left: unescape(left), right: unescape(right), color: color};
		let shield = swig.renderFile(path.join(__dirname, "templates", "flat-template.svg"), params);
		return shield;
	}
}

exports.shields = (event, context, callback) => {
	

	let shield = new Shield(event.shield.style);
	let resp = new Buffer(shield.generate(event.shield.left,event.shield.right,event.shield.color)).toString("base64");
	callback(null,resp);


};
