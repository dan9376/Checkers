function clickHandler(e) {
    var event = e || window.event;
	event.preventDefault(); // stop any kind of default click action
    //TO DO - get these to exclude borders,etc.
	var mousex, mousey;
    mousex = event.clientX;
    mousey = event.clientY;
    
	//loop through all the objects in squares[]
    for (var i=0; i<squares.length; i++) {
		//console.log(mousex, mousey);
        // check to see if the mousex value is "in the square"
        if ((mousex > (parseInt(squares[i].point.x))) && (mousex < (parseInt(squares[i].point.x)) + sqSize)) {
            // check to see if the mousey value is "in the square"
            if ((mousey > (parseInt(squares[i].point.y))) && (mousey < (parseInt(squares[i].point.y)) + sqSize)) {
                // mousex and mousey are both in the square,
                // so this must be the square object we want
				//
				if (turnState != "done") {
					//console.log(squares[i]);
					//console.log(squares[i].checker);
					// if there is a checker in the square, highlight valid moves
					if (squares[i].checker != null) {
						clearHighlighting();
						squares[i].checker.highlighted = true;
						sqActive = i;
						validMoves(squares[i], false);
						render();
					}
					// if there is not a checker in the square, move the active checker to the selected square if it is a valid move
					//console.log(i, squares[i], squares[i].highlighted);
					if (squares[i].highlighted == true) {
						if (squares[sqActive].checker.color == "red" && activePlayer == 2 || squares[sqActive].checker.color == "black" && activePlayer == 1) {
							alert("You can't move the other player's checkers!")	;
						}
						else {
						// copy active checker from square into variable for use in animation
						chkMoving = squares[sqActive].checker;
						// animated move
						time = 0;
						animMoveChecker(chkMoving, chkMoving.point, i);
						}
					}
				}
			}
		}
	}
	if (turnState != "start") {
		if ((mousex > (parseInt(btnDone.point.x))) && (mousex < (parseInt(btnDone.point.x)) + btnDone.w)) {
			// check to see if the mousey value is "in the square"
			if ((mousey > (parseInt(btnDone.point.y))) && (mousey < (parseInt(btnDone.point.y)) + btnDone.h)) {
				//console.log("Done button pressed.");
				turnDone();
			}
		}
		
		if ((mousex > (parseInt(btnUndo.point.x))) && (mousex < (parseInt(btnUndo.point.x)) + btnUndo.w)) {
			// check to see if the mousey value is "in the square"
			if ((mousey > (parseInt(btnUndo.point.y))) && (mousey < (parseInt(btnUndo.point.y)) + btnUndo.h)) {
				console.log("Undo button pressed.");
				turnUndo();
				console.log(turnState);
			}
		}
	}
}
	