var canB = document.getElementById('Board');
var ctxB = canB.getContext('2d');
var canG = document.getElementById('Game');
var ctxG = canG.getContext('2d');
canG.addEventListener("click", clickHandler, false);

var squares = [];
var savedGame = [];
var sqSize = canG.width/8;
var chkActive = null;
var chkMoving = null;
var time = 0;

initializeBoard();
initializeCheckers(canG.height/20);


function clearHighlighting() {
	//clears all square and checker highlighting and redraws the board
	for (i in squares) {
		squares[i].highlighted = false;
		if (squares[i].checker != null) {
			squares[i].checker.highlighted = false;
		}
	}
	drawBoard(squares);
}
