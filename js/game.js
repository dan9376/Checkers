var canB = document.getElementById('Board');
var ctxB = canB.getContext('2d');
var canG = document.getElementById('Game');
var ctxG = canG.getContext('2d');
canG.addEventListener("click", clickHandler, false);

var squares = [];
var savedGame = [];
var sqSize = canG.width/8;
var chkActive;
var chkMoving = null;

initializeBoard();
initializeCheckers(canG.height/20);

function eligibleSquareCheck(arr,sq) {
	// determines which squares are eligible moves for a given checker
	// (checker is just an array property of a square)
	var middle;
	for (i in arr) {
		// evaluate adjacent squares
		if (Math.abs(arr[i].x - arr[sq].x) == sqSize && Math.abs(arr[i].y - arr[sq].y) == sqSize && arr[i].checker == null) {
			if (arr[i].y > arr[sq].y) {
				if (arr[sq].checker.color == "black" || arr[sq].checker.king == true) {
					arr[i].highlighted = true;
					arr[i].move = "move";
				}
			}
			else if (arr[i].y < arr[sq].y) {
				if (arr[sq].checker.color == "red" || arr[sq].checker.king == true) {
					arr[i].highlighted = true;
					arr[i].move = "move";
				}
			}
		}
		// evaluate squares that are two spaces away
		else if (Math.abs(arr[i].x - arr[sq].x) == sqSize*2 && Math.abs(arr[i].y - arr[sq].y) == sqSize*2) {
			if (i<sq) {
				if (arr[sq].checker.color == "black" || arr[sq].checker.king == true) {
					// the row that your checker is in changes how you calculate the middle square
					if ((arr[sq].y/sqSize)%2 == 0) {
						middle = Math.abs(sq - Math.ceil(Math.abs(sq-i)/2));
						validJump(sq, i, middle);
					}
					else {
						middle = Math.abs(sq - Math.floor(Math.abs(sq-i)/2));
						validJump(sq, i, middle);
					}
				}
			}
			else if (i>sq) {
				if (arr[sq].checker.color == "red" || arr[sq].checker.king == true) { 
					// the row that your checker is in changes how you calculate the middle square
					if ((arr[sq].y/sqSize)%2 == 0) {
						middle = Math.abs(sq + Math.floor(Math.abs(sq-i)/2));
						//console.log(sq, i, middle);
						validJump(sq, i, middle);
					}
					else {
						middle = Math.abs(sq + Math.ceil(Math.abs(sq-i)/2));
						//console.log(sq, i, middle);
						validJump(sq, i, middle);
					}
				}
			}
		}
	}
	function validJump(start, target, middle) {
		if (Math.abs(arr[middle].x - arr[start].x) == sqSize && Math.abs(arr[middle].y - arr[start].y) == sqSize) {	
			//console.log(arr[start], arr[middle], arr[target])
			if (arr[middle].checker != null && arr[target].checker == null) {
				//console.log("pass 2")
				if (arr[middle].checker.color != arr[start].checker.color) {
					//console.log("pass 3")
					arr[target].highlighted = true;
					arr[target].move = "jump";
					arr[target].jumpOver = middle;
				}
			}
		}
	}
}
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
