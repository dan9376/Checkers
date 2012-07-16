function render() {
drawBoard(squares);
}
function drawBoard (sqArr){
	clearBoard();
	drawSquares(sqArr);
	drawSideBoard();
}
function clearBoard (){
	//ctxB.clearRect(0,0, canB.width, canB.length);
	//ctxG.clearRect(0,0, canG.width, canG.length);
	
	//ctx.fillStyle = "rgb(200, 100, 100)";
	//ctx.fillRect(0,0, can.width, can.length);
	canG.width = canG.width;
}
function clearSideBoard (){
	can0.width = can0.width;
}
function drawSquare(point,size,color,highlighted) {
	//ctxB.beginPath();
	//console.log(point);
	ctxB.fillStyle = color;
	ctxB.fillRect(point.x, point.y, size, size);
	var line = 1;
	ctxB.lineWidth = line*2;
	if (highlighted == true) {
		ctxB.strokeStyle = "yellow";
		ctxB.strokeRect(point.x+line,point.y+line,size-(line*2),size-(line*2));
	}
}
function drawSquares(arr) {
	for (var i=0; i < arr.length; i++) {
		drawSquare(arr[i].point, arr[i].size, arr[i].color, arr[i].highlighted);
		//console.log(i,arr[i].point, arr.length);
		if (arr[i].checker != null) {
			if (arr[i].checker.point != null) {
				drawChecker(
				arr[i].checker.point, 
				arr[i].checker.size, 
				arr[i].checker.color, 
				arr[i].checker.opacity, 
				arr[i].checker.king, 
				arr[i].checker.highlighted);
			}
		}
	}
	
}
function drawChecker(point,size,color,opacity,king,highlighted) {
	//console.log(point);
	ctxG.beginPath();
	ctxG.arc(point.x, point.y, size, 0, 2 * Math.PI, false);
	//console.log(this.color, this.point.x, this.point.y);
	if (color == "black") {ctxG.fillStyle = "rgba(0,0,0,"+opacity+")";}
	else {ctxG.fillStyle = "rgba(255,0,0,"+opacity+")";}
	ctxG.lineWidth = 2;
	if (highlighted == true) ctxG.strokeStyle = "yellow";
	else ctxG.strokeStyle = "rgba(0,0,0,"+opacity+")";
	ctxG.stroke();
	ctxG.fill();
	
	ctxG.beginPath();
	ctxG.arc(point.x, point.y, size*0.75, 0, 2 * Math.PI, false);
	ctxG.strokeStyle = "rgba(50,50,50,"+opacity+")";
	ctxG.lineWidth = 1;
	ctxG.stroke();
	
	if (king == true) {
		drawCrown(point.x, point.y, size);
	}
};
function drawCrown(x, y, width) {
	var center = new Point(x,y),
		height = width*2/4,
		start = new Point(center.x - width/2, center.y - height/2);

	ctxG.beginPath();
	ctxG.moveTo(start.x, start.y + height*3/4);
	ctxG.lineTo(start.x + width, start.y + height*3/4);
	ctxG.bezierCurveTo(
			start.x + width*15/16, start.y + height*3/4, // control point 1
			start.x + width*13/16, start.y + height*3/4, // control point 2
			start.x + width*12/16, start.y// end point
		);
	ctxG.bezierCurveTo(
			start.x + width*11/16, start.y + height*3/4, // control point 1
			start.x + width*9/16, start.y + height*3/4, // control point 2
			start.x + width*8/16, start.y + height*3/4// end point
	);
	ctxG.bezierCurveTo(
			start.x + width*7/16, start.y + height*3/4, // control point 1
			start.x + width*5/16, start.y + height*3/4, // control point 2
			start.x + width*4/16, start.y// end point
		);
	ctxG.bezierCurveTo(
			start.x + width*3/16, start.y + height*3/4, // control point 1
			start.x + width*1/16, start.y + height*3/4, // control point 2
			start.x, start.y + height*3/4// end point
	);
	ctxG.fillStyle = "gold";
	ctxG.lineWidth = 2;
	ctxG.stroke();
	ctxG.fill();

	ctxG.beginPath();
	ctxG.moveTo(start.x, start.y);
	ctxG.lineTo(start.x, start.y + height);
	ctxG.bezierCurveTo(
			start.x + width*4/8, start.y + height*5/4, // control point 1
			start.x + width*4/8, start.y + height*5/4, // control point 2
			start.x + width, start.y + height// end point
		);
	ctxG.lineTo(start.x + width, start.y);
	ctxG.bezierCurveTo(
			start.x + width*7/8, start.y + height*7/8, // control point 1
			start.x + width*5/8, start.y + height*7/8, // control point 2
			start.x + width/2, start.y - height*1/4// end point
		);
	ctxG.bezierCurveTo(
			start.x + width*3/8, start.y + height*7/8, // control point 1
			start.x + width*1/8, start.y + height*7/8, // control point 2
			start.x, start.y// end point
	);
	ctxG.fillStyle = "gold";
	ctxG.lineWidth = 2;
	ctxG.stroke();
	ctxG.fill();

	ctxG.beginPath();
	ctxG.moveTo(center.x, center.y);
	ctxG.bezierCurveTo(
			center.x + height*.15, center.y - height*.10, // control point 1
			center.x + height*.15, center.y - height*.10, // control point 2
			center.x, center.y - height*.25// end point
		);
	ctxG.bezierCurveTo(
			center.x - height*.15, center.y - height*.10, // control point 1
			center.x - height*.15, center.y - height*.10, // control point 2
			center.x, center.y// end point
	);
	ctxG.fillStyle = "blue";
	ctxG.stroke();
	ctxG.fill();
}
function drawSideBoard() {
	var x = 75,
		y = 430;
	//clearSideBoard();	
	ctx0.font = "30px Arial";
	ctx0.textAlign = "center";
	ctx0.textBaseline = "middle";
	ctx0.strokeStyle = "black";
	if (activePlayer == 1) {
		ctx0.fillStyle = "red";
		ctx0.fillText("Player 1", x, y);
		ctx0.strokeText("Player 1", x, y);
	}
	else {
		ctx0.fillStyle = "black";
		ctx0.fillText("Player 2", x, y);
		//ctx0.strokeText("Player 2", x, y);
	}
}
function ButtonRounded(canvas,text,x,y,w,h,r,strokeColor,fillColor) {
	var ctx = canvas.getContext('2d');
	this.point = new Point(x,y);
    this.w = w;
    this.h = h;
    this.r = r;

if (r*2 > w) {console.log("drawButtonRounded: w must be > r*2");}	
if (r*2 > h) {console.log("drawButtonRounded: h must be > r*2");}

ctx.beginPath();
ctx.moveTo(this.point.x, this.point.y);
ctx.lineTo(this.point.x + w - r, this.point.y);
ctx.arcTo(this.point.x + w,this.point.y, this.point.x + w, this.point.y + h, r);
ctx.arcTo(this.point.x + w, this.point.y + h, this.point.x + w - r, this.point.y + h, r);
ctx.lineTo(this.point.x, this.point.y + h);
ctx.arcTo(this.point.x - r, this.point.y + h, this.point.x - r, this.point.y , r);
ctx.arcTo(this.point.x - r, this.point.y, this.point.x, this.point.y, r);
ctx.lineWidth = 2;
ctx.strokeStyle = strokeColor || "black";
ctx.fillStyle = fillColor || "rgb(100,100,100)";
ctx.stroke();
ctx.fill();

ctx.font = "24px Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
if (activePlayer == 1) {
	ctx.fillStyle = "red";
	ctx.strokeStyle = strokeColor || "black";
	ctx.strokeText(text, this.point.x -r/2 + w/2, this.point.y + h/2);	
}
else {ctx.fillStyle = "black";}
ctx.fillText(text, this.point.x -r/2 + w/2, this.point.y + h/2);
}
/*
	ctxB.beginPath();
    ctxB.moveTo(275, 225);
    ctxB.bezierCurveTo(
        325, 75, // control point 1
        325, 100, // control point 2
        375, 125// end point
    );
    ctxB.stroke();
	
	ctxB.beginPath();
    ctxB.moveTo(275, 225);
    ctxB.bezierCurveTo(
        225, 75, // control point 1
        225, 100, // control point 2
        175, 125// end point
    );
    ctxB.stroke();
	
    ctxB.beginPath();
    ctxB.moveTo(275, 225);
    ctxB.bezierCurveTo(
        375, 225, // control point 1
        375, 275, // control point 2
        375, 325// end point
    );
    ctxB.stroke();
		
    ctxB.beginPath();
    ctxB.moveTo(275, 225);
    ctxB.bezierCurveTo(
        175, 225, // control point 1
        175, 275, // control point 2
        175, 325// end point
    );
    ctxB.stroke();
	*/