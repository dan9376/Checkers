// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function( callback ){
				window.setTimeout(callback, 1000 / 60);
			};
})();

function animMoveChecker(checker, sqEnd, sqStart){
	var currentX = checker.x,
        currentY = checker.y,
        targetX = squares[sqEnd].x + sqSize/2
        targetY = squares[sqEnd].y + sqSize/2,
        diffX = targetX - currentX,
        diffY = targetY - currentY,
        stepX = 2,
        stepY = 2;
        
	var absX = Math.abs((squares[sqStart].x + sqSize/2)-(targetX)),
		absY = Math.abs((squares[sqStart].y + sqSize/2)-(targetY));
		
	if (Math.abs(diffX) < (absX*0.1) || Math.abs(diffX) > (absX*0.9)) { stepX = 1 };
	if (Math.abs(diffY) < (absY*0.1) || Math.abs(diffY) > (absY*0.9)) { stepY = 1 };
		
	if (diffX < 0) { stepX = stepX*(-1) };
	if (diffY < 0) { stepY = stepY*(-1) };

	if (currentX != targetX) { checker.x += stepX };
    if (currentY != targetY) { checker.y += stepY };
	
	drawBoard(squares);
	// request new frame
	if (currentX != targetX || currentY != targetY) {
		requestAnimFrame(function(){
		animMoveChecker(checker, sqEnd, sqStart);
	  });
	} 
	else { // animation complete, reassign properties
		//console.log(squares[sqEnd].checker, checker);
		// assign checker to new square
		squares[sqEnd].checker = checker;
		// king the checker if it reaches opponent's back row
		if (squares[sqEnd].checker.color == "red" && squares[sqEnd].checker.y == sqSize/2 || squares[sqEnd].checker.color == "black" && squares[sqEnd].checker.y == canG.height - sqSize/2) {
			squares[sqEnd].checker.king = true;
			//console.log(squares[sqEnd].checker.king);
		}
		// remove active checker from old square
		squares[chkActive].checker = null;
		// remove checker that was jumped over
		if (squares[sqEnd].move == "jump") {
			var kill = squares[sqEnd].jumpOver;
			squares[kill].checker = null;
		}
		// clear all highlighting
		clearHighlighting();
		drawBoard(squares);
		// clear temp checker
		chkMoving = null;	
	}
};
// place the rAF *before* the render() to assure as close to 
// 60fps with the setTimeout fallback.