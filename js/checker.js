// define a checker
function Checker(x, y, size, color, king) {
	this.point = new Point(x,y);
    this.size = size;
    this.color = color;
	this.highlighted = false;
	this.king = king || false;
	
	this.draw();
};

Checker.prototype.draw = function() {
	ctxG.beginPath();
	ctxG.arc(this.point.x, this.point.y, this.size, 0, 2 * Math.PI, false);
	ctxG.fillStyle = this.color;
	ctxG.lineWidth = 2;
	if (this.highlighted == true) ctxG.strokeStyle = "yellow";
	else ctxG.strokeStyle = "black";
	ctxG.stroke();
	ctxG.fill();
	
	ctxG.beginPath();
	ctxG.arc(this.point.x, this.point.y, this.size*0.75, 0, 2 * Math.PI, false);
	ctxG.strokeStyle = "rgb(50,50,50)";
	ctxG.lineWidth = 1;
	ctxG.stroke();
	
	if (this.king == true) {
		drawCrown(this.point.x, this.point.y, this.size);
	}
};

Checker.prototype.quarter = function (x, y, size, color, arcStart, arcEnd) {
    this.arcStart = arcStart;
    this.arcEnd = arcEnd;
    
	ctx.beginPath();
    ctx.arc(x, y, size, arcStart * Math.PI, arcEnd * Math.PI, false);
    ctx.fillStyle = color;
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(x, y, size*0.75, arcStart * Math.PI, arcEnd * Math.PI, false);
    ctx.strokeStyle = "rgb(50,50,50)";
    ctx.stroke();
};

Checker.prototype.broken = function (x, y, size, color) {
	a = new quarter (x, y, size, color, 0.25, 0.75);
	b = new quarter (x, y, size, color, 0.75, 1.25);
	c = new quarter (x, y, size, color, 1.25, 1.75);
	d = new quarter (x, y, size, color, 1.75, 0.25);
}
