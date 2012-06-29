function render() {
drawBoard(squares);
}

function drawBoard (sqArray){
	clearBoard();
	drawSquares(sqArray);
}

function clearBoard (){
	//ctxB.clearRect(0,0, canB.width, canB.length);
	//ctxG.clearRect(0,0, canG.width, canG.length);
	
	//ctx.fillStyle = "rgb(200, 100, 100)";
	//ctx.fillRect(0,0, can.width, can.length);
	
	canG.width = canG.width;
}

function drawSquares(array) {
	for (i in array) {
		array[i].draw();
		if (array[i].checker != null) {
			array[i].checker.draw();
		}
	}
	
}

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