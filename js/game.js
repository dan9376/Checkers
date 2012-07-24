var can0 = document.getElementById('Background');
var ctx0 = can0.getContext('2d');
var canB = document.getElementById('Board');
var ctxB = canB.getContext('2d');
var canG = document.getElementById('Game');
var ctxG = canG.getContext('2d');
canG.addEventListener("click", clickHandler, false);
can0.addEventListener("click", clickHandler, false);

var squares = [];
var savedGame = [];
var sqSize = canG.width/8;
var sqActive = null;
var chkMoving = null;
var time = 0;
var activePlayer = 1;
var turnState = "start";
var boardState = [1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2];
var moveLast = null;
var moveCurrent = null;

initializeBoard();
initializeCheckers(canG.height/20);
saveGame();
loadGame();
render();


function clearHighlighting() {
	//clears all square and checker highlighting and redraws the board
	for (i in squares) {
		squares[i].highlighted = false;
		if (squares[i].checker != null) {
			squares[i].checker.highlighted = false;
		}
	}
	render();
};

function showButtons() {
	btnDone = new ButtonRounded(can0, "Done", 180, 410, 80, 40, 20);
	btnUndo = new ButtonRounded(can0, "Undo", 300, 410, 80, 40, 20);
};

function turnDone() {
	clearSideBoard();
	saveGame();
	if (activePlayer == 1) {activePlayer = 2;}
	else {activePlayer = 1;}
	turnState = "start";
	moveCurrent = null;
	render();
};

function turnUndo() {
	clearSideBoard();
	loadGame();
	turnState = "start";
	moveCurrent = null;
	render();
};

function deepCopy(o) {return JSON.parse(JSON.stringify(o));}

function saveGame() {
	savedGame = deepCopy(squares);
	var newState = recordBoardState(squares)
	console.log(newState);
	//convert array to string and strip out all commas
	console.log(newState.join().replace(/,/g, ""));
};

function loadGame() {
	squares = deepCopy(savedGame);
};

function validMoves(square,jumpOnly) {
	// determines which squares are eligible moves for a given checker
	// (checker is just an array property of a square)
	var count = 0,
		middle,
		point = square.point,
		checker = square.checker;
	
	for (var i=0; i<squares.length; i++) {
		// evaluate adjacent squares
		//console.log(i, Math.abs(squares[i].point.x - point.x), Math.abs(squares[i].point.y - point.y), sqSize, squares[i].checker);
		if (Math.abs(squares[i].point.x - point.x) == sqSize && Math.abs(squares[i].point.y - point.y) == sqSize && squares[i].checker == null) {
			//after a checker jumps, it can only make additional jumps
			//console.log("check");
			if (jumpOnly == false) {
				if (squares[i].point.y > point.y) {
					if (checker.color == "black" || checker.king == true) {
						squares[i].highlighted = true;
						//console.log("square " + i + " highlighted = " + squares[i].highlighted);
						//console.log(squares[i]);
						squares[i].move = "move";
						count++;
					}
				}
				else if (squares[i].point.y < point.y) {
					if (checker.color == "red" || checker.king == true) {
						squares[i].highlighted = true;
						//console.log("square " + i + " highlighted = " + squares[i].highlighted);
						//console.log(squares[i]);
						squares[i].move = "move";
						count++;
					}
				}
			}
		}
		// evaluate squares that are two spaces away
		else if (Math.abs(squares[i].point.x - point.x) == sqSize*2 && Math.abs(squares[i].point.y - point.y) == sqSize*2) {
			if (i<squares[sqActive].index) {
				if (checker.color == "black" || checker.king == true) {
					// the row that your checker is in changes how you calculate the middle square
					if ((point.y/sqSize)%2 == 0) {
						middle = Math.abs(squares[sqActive].index - Math.ceil(Math.abs(squares[sqActive].index-i)/2));
						if (validJump(squares[sqActive].index, i, middle)) {count++};
					}
					else {
						middle = Math.abs(squares[sqActive].index - Math.floor(Math.abs(squares[sqActive].index-i)/2));
						if (validJump(squares[sqActive].index, i, middle)) {count++};
					}
				}
			}
			else if (i>squares[sqActive].index) {
				if (checker.color == "red" || checker.king == true) { 
					// the row that your checker is in changes how you calculate the middle square
					if ((point.y/sqSize)%2 == 0) {
						middle = Math.abs(squares[sqActive].index + Math.floor(Math.abs(squares[sqActive].index-i)/2));
						//console.log(squares[sqActive].index, i, middle);
						if (validJump(squares[sqActive].index, i, middle)) {count++};
					}
					else {
						middle = Math.abs(squares[sqActive].index + Math.ceil(Math.abs(squares[sqActive].index-i)/2));
						//console.log(squares[sqActive].index, i, middle);
						if (validJump(squares[sqActive].index, i, middle)) {count++};
					}
				}
			}
		}
	}
	return count;
};

function validJump(start, target, middle) {
	//console.log("middle checker = " + squares[middle].checker, "square = " + middle, "target checker = " + squares[target].checker, "square = " + target);
	if (Math.abs(squares[middle].point.x - squares[start].point.x) == sqSize && Math.abs(squares[middle].point.y - squares[start].point.y) == sqSize) {	
		if (squares[middle].checker != null && squares[target].checker == null) {
			if (squares[middle].checker.color != squares[start].checker.color) {
				squares[target].highlighted = true;
				squares[target].move = "jump";
				squares[target].jumpOver = middle;
				return 1;
			}
		}
	}
};

function backRowEval(checker) {
	var br = false;
	if (checker.color == "red" && checker.point.y == sqSize/2 || checker.color == "black" && checker.point.y == canG.height - sqSize/2) {
		br = true;
	}
	return br;
};

function kingEval(checker) {
	var king = false;
	if (backRowEval(checker) == true) {
		if (checker.king == false) {
			king = true;
		}
	}
	return king;
};

function recordMove(existing, from, to, type) {
	var currentMove;
	// multi-jump
	if (type == 'jump') {
		if (existing != null) {currentMove = existing + "x" + to;}
		//normal jump
		else {currentMove = from + "x" + to;}
	}
	else { //not a jump
		currentMove = from + "-" + to;
	}
	return currentMove;
}

function recordBoardState(arrSquares) {
	var state;
	var arrState = [];
	for (i=0; i<arrSquares.length; i++) {
		if (arrSquares[i].checker != null) {
			if (arrSquares[i].checker.color == "red") {state = 1;}
			else {state = 2;}
		}
		else {state = 0;}
		arrState.push(state);
	}
	return arrState;
}