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
        if ((mousex > (parseInt(squares[i].point.x))) && (mousex < (parseInt(squares[i].point.x)) + sqSize)) {
            // check to see if the mousey value is "in the square"
            if ((mousey > (parseInt(squares[i].point.y))) && (mousey < (parseInt(squares[i].point.y)) + sqSize)) {
                // mousex and mousey are both in the square,
                // so this must be the square[] object we want
				//
				// if there is a checker in the square, highlight valid moves
				if (squares[i].checker != null) {
					clearHighlighting();
					squares[i].checker.highlighted = true;
					//console.log(chkActive);
					//if (chkActive == null) {
						chkActive = i;
					//}
					squares[i].validMoves();
					//eligibleSquareCheck(squares, i);
					//console.log(squares[i], squares[i].x, squares[i].y);
					drawBoard(squares);
				}
				// if there is not a checker in the square, move the active checker to the selected square if it is a valid move
				else if (squares[i].highlighted == true) {
					// copy active checker from square into variable for use in animation
					chkMoving = squares[chkActive].checker;
					// animated move
					time = 0;
					//console.log(chkActive, chkMoving, chkMoving.point);
					animMoveChecker2(chkMoving, chkMoving.point, i);
					
				}
			}
		}
	}
}
	