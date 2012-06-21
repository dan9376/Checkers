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
			drawChecker(array[i].checker.x, array[i].checker.y, array[i].checker.size, array[i].checker.color, array[i].checker.highlighted);
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

function drawChecker(x, y, size, color, highlighted) {
	ctx.beginPath();
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
}