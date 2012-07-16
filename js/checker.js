// define a checker
function Checker(point, size, color, opacity, king, highlighted) {
	this.point = new Point(point.x, point.y);
    this.size = size;
    this.color = color;
    this.opacity = opacity;
	this.king = king || false;
	this.highlighted = highlighted || false;
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
