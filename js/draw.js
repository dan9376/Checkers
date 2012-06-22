function drawBoard (sqArray){
	ctx.clearRect(0,0, can.width, can.length);
	drawSquares(sqArray);
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
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.fillRect(x, y, size, size);
	var line = 1;
	ctx.lineWidth = line*2;
	if (highlighted == true) {
		ctx.strokeStyle = "yellow";
		ctx.strokeRect(x+line,y+line,size-(line*2),size-(line*2));
	}
}

function drawChecker(x, y, size, color, highlighted, king) {
	ctx.beginPath();
	if (king == true) {
		size = size*1.2;
		// TO DO: add a crown graphic
	}
	ctx.arc(x, y, size, 0, 2 * Math.PI, false);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.lineWidth = 1;
	if (highlighted == true) ctx.strokeStyle = "yellow";
	else ctx.strokeStyle = "black";
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(x, y, size*0.75, 0, 2 * Math.PI, false);
	ctx.strokeStyle = "rgb(50,50,50)";
	ctx.stroke();
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

	ctx.beginPath();
	ctx.moveTo(xStart, yStart + height*3/4);
	ctx.lineTo(xStart + width, yStart + height*3/4);
	ctx.bezierCurveTo(
			xStart + width*15/16, yStart + height*3/4, // control point 1
			xStart + width*13/16, yStart + height*3/4, // control point 2
			xStart + width*12/16, yStart// end point
		);
	ctx.bezierCurveTo(
			xStart + width*11/16, yStart + height*3/4, // control point 1
			xStart + width*9/16, yStart + height*3/4, // control point 2
			xStart + width*8/16, yStart + height*3/4// end point
	);
	ctx.bezierCurveTo(
			xStart + width*7/16, yStart + height*3/4, // control point 1
			xStart + width*5/16, yStart + height*3/4, // control point 2
			xStart + width*4/16, yStart// end point
		);
	ctx.bezierCurveTo(
			xStart + width*3/16, yStart + height*3/4, // control point 1
			xStart + width*1/16, yStart + height*3/4, // control point 2
			xStart, yStart + height*3/4// end point
	);ctx.fillStyle = "gold";
	ctx.lineWidth = 2;
	ctx.stroke();
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(xStart, yStart);
	ctx.lineTo(xStart, yStart + height);
	ctx.bezierCurveTo(
			xStart + width*4/8, yStart + height*5/4, // control point 1
			xStart + width*4/8, yStart + height*5/4, // control point 2
			xStart + width, yStart + height// end point
		);
	ctx.lineTo(xStart + width, yStart);
	ctx.bezierCurveTo(
			xStart + width*7/8, yStart + height*7/8, // control point 1
			xStart + width*5/8, yStart + height*7/8, // control point 2
			xStart + width/2, yStart - height*1/4// end point
		);
	ctx.bezierCurveTo(
			xStart + width*3/8, yStart + height*7/8, // control point 1
			xStart + width*1/8, yStart + height*7/8, // control point 2
			xStart, yStart// end point
	);
	ctx.fillStyle = "gold";
	ctx.lineWidth = 2;
	ctx.stroke();
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(xCenter, yCenter);
	ctx.bezierCurveTo(
			xCenter + height*.15, yCenter - height*.10, // control point 1
			xCenter + height*.15, yCenter - height*.10, // control point 2
			xCenter, yCenter - height*.25// end point
		);
	ctx.bezierCurveTo(
			xCenter - height*.15, yCenter - height*.10, // control point 1
			xCenter - height*.15, yCenter - height*.10, // control point 2
			xCenter, yCenter// end point
	);
	ctx.fillStyle = "blue";
	ctx.stroke();
	ctx.fill();
}