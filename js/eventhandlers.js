function clickHandler(e) {
    e.preventDefault(); // stop any kind of default click action
    //TO DO - get these to exclude borders,etc.
	var mousex, mousey;
    mousex = e.clientX;
    mousey = e.clientY;
    
	//clear highlighting
	//console.log(squares);
	for (i in squares) {
		squares[i].highlighted = false;
		if (squares[i].checker != null) {
		squares[i].checker.highlighted = false;
		}
		//console.log(i, squares[i].checker.color);
		}
	drawBoard(squares, checkers);
		
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
					squares[i].checker.highlighted = true;
				}
				if (squares[i].checker.color == "red") {
					var sqRight = i + 4;
					var sqLeft = i + 5;
					//console.log(squares[sq].num, squares[sq].checker.color);
					if (squares[sqRight].x == (squares[i].x + sqSize) && squares[sqRight].checker == null) {
						squares[sqRight].highlighted = true;
						//console.log("re-draw");
						drawBoard(squares, checkers);
					}
					if (squares[sqLeft].x == (squares[i].x - sqSize) && squares[sqLeft].checker == null) {
						squares[sqLeft].highlighted = true;
						//console.log("re-draw");
						drawBoard(squares, checkers);
						
					}
					//for (i in squares) {
					//console.log(i, squares[i].highlighted);
					//}
					//console.log("Square number " + squares[sqRight].num + " is highlighted = " + squares[sqRight].highlighted);
				}
			}
		}
	}
}