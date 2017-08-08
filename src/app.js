/**
 * Generate a Default shield if no inputs.
 * @param  {[string]}
 * @param  {[string]}
 * @param  {[string]}
 * @param  {[string]}
 * @return {[string]}
 */
function shieldGen(left,right,color,template){
	left = (typeof left !== "undefined") ? left : "left text";
	right = (typeof right !== "undefined") ? right : "right text";
	color = (typeof color !== "undefined") ? color : "red";
	template = (typeof template !== "undefined") ? template : "flat-square";
	return {left: left, right: right, color: color, template: template};
}

exports.handler = (event,context,callback) => {
	console.info("This is the event Payload Recieved", event);
	let shield = shieldGen(event.left,event.right,event.color,event.style);
	console.info("Shield Content Returned:", shield);
	var badge = require("gh-badges");
	badge.loadFont("fonts/Verdana.ttf", function(err) {
		if(err) { callback(err); }
		badge({ text: [shield.left, shield.right], colorscheme: shield.color, template: shield.template },
			function(svg, err) {
				if (err) { callback(err);}
				console.info("We have our Generated Shield");
				callback(null,new Buffer(svg).toString("base64"));
			});
	});
};
