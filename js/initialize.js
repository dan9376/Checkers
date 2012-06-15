
function initializeBoardOLD() {
	// set variables for square creation
	var sqCoordinate = { x:0, y:0 };
	var sqColor = {grey:"rgb(100, 100, 100)", red:"rgb(200, 100, 100)", current:"rgb(200, 100, 100)"};
	//var sqSize = (size / 8);  // checkerboard is an 8x8 grid
	//loop to create boxes on canvas
	for (var i = 0; i < 64; i++) {
		//determine color for next box
		if (i % 8 == 0) {
		}
		else if (sqColor.current == sqColor.grey) {
			sqColor.current = sqColor.red;
		}
		else {
			sqColor.current = sqColor.grey;
		}
		//create new square
		var sqNum;
		if (sqColor.current == "rgb(100, 100, 100)") {sqNum = Math.round((Math.abs(i - 64)) / 2);}
			else {sqNum = "";}
		new square(sqCoordinate.x, sqCoordinate.y, sqNum, sqSize, sqColor.current);
		//update X- and Y-Coordinateinates for next box
		sqCoordinate.x = sqCoordinate.x + sqSize;
		//go to next row if edge of canvas is reached
		if (sqCoordinate.x == can.width) {
			sqCoordinate.x = 0;
			sqCoordinate.y = sqCoordinate.y + sqSize;
		}

	}
}

function initializeBoardBetter() {
	// set variables for square creation
	var sqCoordinate = { x:sqSize*7, y:sqSize*7 };
	var sqColor = {grey:"rgb(100, 100, 100)", red:"rgb(200, 100, 100)", current:"rgb(200, 100, 100)"};
	var sqNum = 0;
	//loop to create boxes on canvas
	for (var i = 0; i < 64; i++) {
		//create new square
		//determine color for box
		if (i % 8 == 0) {
		}
		else if (sqColor.current == sqColor.grey) {
			sqColor.current = sqColor.red;
		}
		else {
			sqColor.current = sqColor.grey;
		}
		if (sqColor.current == sqColor.grey){
			sqNum++;
			new square(sqCoordinate.x, sqCoordinate.y, sqNum, sqSize, sqColor.grey);
		}
		//update X- and Y-Coordinates for next box
		sqCoordinate.x = sqCoordinate.x - sqSize;
		//go to next row if edge of canvas is reached
		if (sqCoordinate.x < 0) {
			sqCoordinate.x = sqSize*7;
			sqCoordinate.y = sqCoordinate.y - sqSize;
		}

	}
}

function initializeCheckers(chkSize) {
	// set variables for checker creation
	this.chkX;
	this.chkY;
	this.chkSize = chkSize;
	this.chkColor;
	//loop to add checkers to canvas
	for (var i = 0; i < squares.length; i++) {
		chkX = squares[i].x + (sqSize / 2);
		chkY = squares[i].y + (sqSize / 2);
		//console.log(squares.length, squares[i].num);
		if (squares[i].num > 20) {
			chkColor = "black";
			//console.log(squares[i].num);
			var chk = new checker(chkX, chkY, chkSize, chkColor);
			squares[i].checker = chk;
		}
		else if (squares[i].num < 13) {
			chkColor = "red";
			//console.log(squares[i].num);
			var chk = new checker(chkX, chkY, chkSize, chkColor);
			squares[i].checker = chk;
		}
		else {
			squares[i].checker = null;
		}
			
	}

}
