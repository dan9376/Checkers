function clickHandler(e) {
    e.preventDefault(); // stop any kind of default click action
    //TO DO - get these to exclude borders,etc.
	var mousex, mousey;
    mousex = e.clientX;
    mousey = e.clientY;
    
	//clear highlighting
	//console.log(squares);
	/*
	for (i in squares) {
		squares[i].highlighted = false;
		if (squares[i].checker != null) {
		squares[i].checker.highlighted = false;
		}
		//console.log(squares);
		}
	drawBoard(squares, checkers);
	*/
	
	//loop through all the objects in squares[]
    for (var i=0; i<squares.length; i++) {
		//console.log(mousex, mousey);
        // check to see if the mousex value is "in the square"
        if ((mousex > (parseInt(squares[i].x))) && (mousex < (parseInt(squares[i].x)) + sqSize)) {
            // check to see if the mousey value is "in the square"
            if ((mousey > (parseInt(squares[i].y))) && (mousey < (parseInt(squares[i].y)) + sqSize)) {
                // mousex and mousey are both in the square,
                // so this must be the square[] object we want
				//console.log(squares[i].checker.color);
				//console.log(mousex, mousey, squares[i].num);
				if (squares[i].checker != null) {
					clearHighlighting();
					squares[i].checker.highlighted = true;
					chkActive = i;
					eligibleSquareCheck(squares, i);
					/*
					var sqOrig = i;
					var sqOffset;
					if (squares[i].checker.color == "red") {
						sqOffset = 3;
						eligibleSquareCheck(sqOrig, sqOffset);
						sqOffset = 4;
						eligibleSquareCheck(sqOrig, sqOffset);
						sqOffset = 5;
						eligibleSquareCheck(sqOrig, sqOffset);
					}
					else if (squares[i].checker.color == "black") {
						sqOffset = -3;
						eligibleSquareCheck(sqOrig, sqOffset);
						sqOffset = -4;
						eligibleSquareCheck(sqOrig, sqOffset);
						sqOffset = -5;
						eligibleSquareCheck(sqOrig, sqOffset);
					}
					*/
					drawBoard(squares, checkers);
				}
				else if (squares[i].highlighted == true) {
					//console.log(squares);
					//create copy of active checker in new square
					var x = squares[i].x + (sqSize / 2);
					var y = squares[i].y + (sqSize / 2);
					var size = squares[chkActive].checker.size;
					var color = squares[chkActive].checker.color;
					squares[i].checker = new checker(x, y, size, color);
					//remove active checker from old square
					squares[chkActive].checker = null;
					//clear all highlighting
					clearHighlighting();
				}
			}
		}
	}
}
	