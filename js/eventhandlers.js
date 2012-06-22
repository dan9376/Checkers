function clickHandler(e) {
    e.preventDefault(); // stop any kind of default click action
    //TO DO - get these to exclude borders,etc.
	var mousex, mousey;
    mousex = e.clientX;
    mousey = e.clientY;
    
	//loop through all the objects in squares[]
    for (var i=0; i<squares.length; i++) {
		//console.log(mousex, mousey);
        // check to see if the mousex value is "in the square"
        if ((mousex > (parseInt(squares[i].x))) && (mousex < (parseInt(squares[i].x)) + sqSize)) {
            // check to see if the mousey value is "in the square"
            if ((mousey > (parseInt(squares[i].y))) && (mousey < (parseInt(squares[i].y)) + sqSize)) {
                // mousex and mousey are both in the square,
                // so this must be the square[] object we want
				//
				// if there is a checker in the square, highlight valid moves
				if (squares[i].checker != null) {
					clearHighlighting();
					squares[i].checker.highlighted = true;
					chkActive = i;
					eligibleSquareCheck(squares, i);
					drawBoard(squares);
					console.log(squares[i].checker.king);
				}
				// if there is not a checker in the square, move the active checker to the selected square if it is a valid move
				else if (squares[i].highlighted == true) {
					// create copy of active checker in new square
					var x = squares[i].x + (sqSize / 2);
					var y = squares[i].y + (sqSize / 2);
					var size = squares[chkActive].checker.size;
					var color = squares[chkActive].checker.color;
					var king = squares[chkActive].checker.king;
					squares[i].checker = new Checker(x, y, size, color, king);
					// remove checker that was jumped over
					//console.log(middle);
					if (squares[i].move == "jump") {
						var kill = squares[i].jumpOver;
						squares[kill].checker = null;
					}
					//remove active checker from old square
					squares[chkActive].checker = null;
					//king the checker if it reaches opponent's back row
					//console.log(y, squares[i].checker.king);
					if (squares[i].checker.color == "red" && y == sqSize/2 || squares[i].checker.color == "black" && y == can.height - sqSize/2) {
						squares[i].checker.king = true;
						console.log(squares[i].checker.king);
					}
					//clear all highlighting
					clearHighlighting();
				}
			}
		}
	}
}
	