function initializeBoard() {
	drawSideBoard();
	// set variables for square creation
	var p = new Point(sqSize*7, sqSize*7);
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
			point = new Point(p.x, p.y);
			new Square(point, sqNum, sqSize, sqColor.grey, false);
		}
		//update X- and Y-Coordinates for next box
		p.x = p.x - sqSize;
		//go to next row if edge of canvas is reached
		if (p.x < 0) {
			p.x = sqSize*7;
			p.y = p.y - sqSize;
		}

	}
}

function initializeCheckers(size) {
	// set variables for checker creation
	//this.chkX;
	//this.chkY;
	//this.chkSize = chkSize;
	var color;
	var king;
	//loop to add checkers to canvas
	for (var i = 0; i < squares.length; i++) {
		//console.log(squares[i].point);
		point = new Point(0,0);
		point.x = squares[i].point.x + (sqSize / 2);
		point.y = squares[i].point.y + (sqSize / 2);
		if (boardState[i] == 2 || boardState[i] == 4) {
			color = "black";
			if (boardState[i] == 4) {king = true;}
			else {king = false;}
			var chk = new Checker(point, size, color, 1, king, false);
			squares[i].checker = chk;
		}
		else if (boardState[i] == 1 || boardState[i] == 3) {
			color = "red";
			if (boardState[i] == 3) {king = true;}
			else {king = false;}
			var chk = new Checker(point, size, color, 1, king, false);
			squares[i].checker = chk;
		}
		else {
			squares[i].checker = null;
		}
			
	}

}
