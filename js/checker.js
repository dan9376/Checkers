// define a checker
function Checker(x, y, size, color, opacity, king) {
	this.point = new Point(x,y);
    this.size = size;
    this.color = color;
    this.opacity = opacity;
	this.highlighted = false;
	this.king = king || false;
	
	this.draw(opacity);
};

Checker.prototype.draw = function() {
	ctxG.beginPath();
	ctxG.arc(this.point.x, this.point.y, this.size, 0, 2 * Math.PI, false);
	//console.log(this.color, this.point.x, this.point.y);
	if (this.color == "black") {ctxG.fillStyle = "rgba(0,0,0,"+this.opacity+")";}
	else {ctxG.fillStyle = "rgba(255,0,0,"+this.opacity+")";}
	ctxG.lineWidth = 2;
	if (this.highlighted == true) ctxG.strokeStyle = "yellow";
	else ctxG.strokeStyle = "rgba(0,0,0,"+this.opacity+")";
	ctxG.stroke();
	ctxG.fill();
	
	ctxG.beginPath();
	ctxG.arc(this.point.x, this.point.y, this.size*0.75, 0, 2 * Math.PI, false);
	ctxG.strokeStyle = "rgba(50,50,50,"+this.opacity+")";
	ctxG.lineWidth = 1;
	ctxG.stroke();
	
	if (this.king == true) {
		drawCrown(this.point.x, this.point.y, this.size);
	}
};
// doesn't work yet
Checker.prototype.quarter = function (checker, arcStart, arcEnd) {
    this.arcStart = arcStart;
    this.arcEnd = arcEnd;
	this.point = checker.point;
    
	ctxG.beginPath();
    ctxG.arc(checker.point.x, checker.point.y, checker.size, arcStart * Math.PI, arcEnd * Math.PI, false);
    ctxG.fillStyle = checker.color;
    ctxG.lineTo(checker.point.x, checker.point.y);
    ctxG.closePath();
    ctxG.fill();
    ctxG.lineWidth = 1;
    ctxG.strokeStyle = "black";
    ctxG.stroke();
    
    ctxG.beginPath();
    ctxG.arc(checker.point.x, checker.point.y, checker.size*0.75, arcStart * Math.PI, arcEnd * Math.PI, false);
    ctxG.strokeStyle = "rgb(50,50,50)";
    ctxG.stroke();
};
// doesn't work yet
Checker.prototype.broken = function (checker) {
	//console.log(this);
	this.a = new checker.quarter(checker, 0.25, 0.75);
	this.b = new checker.quarter(checker, 0.75, 1.25);
	this.c = new checker.quarter(checker, 1.25, 1.75);
	this.d = new checker.quarter(checker, 1.75, 0.25);
	//console.log(this.a, this.b, this.c, this.d);
}
