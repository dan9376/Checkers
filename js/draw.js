function drawBoard (sqArray){
	clearBoard();
	drawSquares(sqArray);
}

function clearBoard (){
	//ctx.clearRect(0,0, can.width, can.length);
	
	//ctx.fillStyle = "rgb(200, 100, 100)";
	//ctx.fillRect(0,0, can.width, can.length);
	
	canG.width = canG.width;
}

function drawSquares(array) {
	for (i in array) {
		var x = array[i].x;
		var y = array[i].y;
		var num = array[i].num;
		var size = array[i].size;
		var color = array[i].color;
		var checker = array[i].checker;
		var highlighted = array[i].highlighted;
		
		drawSquare(x, y, size, size, color, highlighted);
		if (array[i].checker != null) {
			//console.log(array[i].checker);
			drawChecker(array[i].checker.x, array[i].checker.y, array[i].checker.size, array[i].checker.color, array[i].checker.highlighted, array[i].checker.king);
		}
	}
}

function drawSquare(x, y, size, size, color, highlighted) {
	//ctxB.beginPath();
	ctxB.fillStyle = color;
	ctxB.fillRect(x, y, size, size);
	var line = 1;
	ctxB.lineWidth = line*2;
	if (highlighted == true) {
		//ctx.beginPath();
		ctxB.strokeStyle = "yellow";
		ctxB.strokeRect(x+line,y+line,size-(line*2),size-(line*2));
	}
}

function drawChecker(x, y, size, color, highlighted, king) {
	if (king == true) {
		size = size*1.2;
	}
	ctxG.beginPath();
	ctxG.arc(x, y, size, 0, 2 * Math.PI, false);
	ctxG.fillStyle = color;
	ctxG.lineWidth = 2;
	if (highlighted == true) ctxG.strokeStyle = "yellow";
	else ctxG.strokeStyle = "black";
	ctxG.stroke();
	ctxG.fill();
	
	ctxG.beginPath();
	ctxG.arc(x, y, size*0.75, 0, 2 * Math.PI, false);
	ctxG.strokeStyle = "rgb(50,50,50)";
	ctxG.lineWidth = 1;
	ctxG.stroke();
	
	if (king == true) {
		drawCrown(x, y, size);
	}
}

function drawCrown(x, y, width) {
	var xCenter = x,
		yCenter = y,
		width = width,
		height = width*2/4,
		xStart = xCenter - width/2, 
		yStart = yCenter - height/2;

	ctxG.beginPath();
	ctxG.moveTo(xStart, yStart + height*3/4);
	ctxG.lineTo(xStart + width, yStart + height*3/4);
	ctxG.bezierCurveTo(
			xStart + width*15/16, yStart + height*3/4, // control point 1
			xStart + width*13/16, yStart + height*3/4, // control point 2
			xStart + width*12/16, yStart// end point
		);
	ctxG.bezierCurveTo(
			xStart + width*11/16, yStart + height*3/4, // control point 1
			xStart + width*9/16, yStart + height*3/4, // control point 2
			xStart + width*8/16, yStart + height*3/4// end point
	);
	ctxG.bezierCurveTo(
			xStart + width*7/16, yStart + height*3/4, // control point 1
			xStart + width*5/16, yStart + height*3/4, // control point 2
			xStart + width*4/16, yStart// end point
		);
	ctxG.bezierCurveTo(
			xStart + width*3/16, yStart + height*3/4, // control point 1
			xStart + width*1/16, yStart + height*3/4, // control point 2
			xStart, yStart + height*3/4// end point
	);
	ctxG.fillStyle = "gold";
	ctxG.lineWidth = 2;
	ctxG.stroke();
	ctxG.fill();

	ctxG.beginPath();
	ctxG.moveTo(xStart, yStart);
	ctxG.lineTo(xStart, yStart + height);
	ctxG.bezierCurveTo(
			xStart + width*4/8, yStart + height*5/4, // control point 1
			xStart + width*4/8, yStart + height*5/4, // control point 2
			xStart + width, yStart + height// end point
		);
	ctxG.lineTo(xStart + width, yStart);
	ctxG.bezierCurveTo(
			xStart + width*7/8, yStart + height*7/8, // control point 1
			xStart + width*5/8, yStart + height*7/8, // control point 2
			xStart + width/2, yStart - height*1/4// end point
		);
	ctxG.bezierCurveTo(
			xStart + width*3/8, yStart + height*7/8, // control point 1
			xStart + width*1/8, yStart + height*7/8, // control point 2
			xStart, yStart// end point
	);
	ctxG.fillStyle = "gold";
	ctxG.lineWidth = 2;
	ctxG.stroke();
	ctxG.fill();

	ctxG.beginPath();
	ctxG.moveTo(xCenter, yCenter);
	ctxG.bezierCurveTo(
			xCenter + height*.15, yCenter - height*.10, // control point 1
			xCenter + height*.15, yCenter - height*.10, // control point 2
			xCenter, yCenter - height*.25// end point
		);
	ctxG.bezierCurveTo(
			xCenter - height*.15, yCenter - height*.10, // control point 1
			xCenter - height*.15, yCenter - height*.10, // control point 2
			xCenter, yCenter// end point
	);
	ctxG.fillStyle = "blue";
	ctxG.stroke();
	ctxG.fill();
}