function initializeBoard() {
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
			new Square(sqCoordinate.x, sqCoordinate.y, sqNum, sqSize, sqColor.grey);
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
		chkX = squares[i].point.x + (sqSize / 2);
		chkY = squares[i].point.y + (sqSize / 2);
		//console.log(squares.length, squares[i].num);
		if (squares[i].num > 20) {
			chkColor = "black";
			//console.log(squares[i].num);
			var chk = new Checker(chkX, chkY, chkSize, chkColor, false);
			squares[i].checker = chk;
		}
		else if (squares[i].num < 13) {
			chkColor = "red";
			//console.log(squares[i].num);
			var chk = new Checker(chkX, chkY, chkSize, chkColor, false);
			squares[i].checker = chk;
		}
		else {
			squares[i].checker = null;
		}
			
	}

}
