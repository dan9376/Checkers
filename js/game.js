var can = document.getElementById('canvas1');
var ctx = can.getContext('2d');
can.addEventListener("click", clickHandler, false);

var squares = [];
var savedGame = [];
var sqSize = can.width/8;
var chkActive;

initializeBoard();
initializeCheckers(can.height/20);

function eligibleSquareCheck(arr,sq) {
	// determines which squares are eligible moves for a given checker
	// (checker is just an array property of a square)
	for (i in arr) {
		var middle = [];
		if (Math.abs(arr[i].x - arr[sq].x) == sqSize && Math.abs(arr[i].y - arr[sq].y) == sqSize && arr[i].checker == null) {
			if (arr[i].y > arr[sq].y) {
				if (arr[sq].checker.color == "black" || arr[sq].checker.king == true) { // add kinged status check here
					arr[i].highlighted = true;
					arr[i].move = "move";
				}
			}
			else if (arr[i].y < arr[sq].y) {
				if (arr[sq].checker.color == "red" || arr[sq].checker.king == true) { // add kinged status check here
					arr[i].highlighted = true;
					arr[i].move = "move";
				}
			}
		}
		else if (Math.abs(arr[i].x - arr[sq].x) == sqSize*2 && Math.abs(arr[i].y - arr[sq].y) == sqSize*2) {
			if (arr[sq].checker.color == "black" || arr[sq].checker.king == true) { // add kinged status check here
				if (i<sq) {
					if (Math.ceil((arr[i].y/sqSize)%2 == 0)) {
						middle.push(Math.abs(sq - Math.ceil(Math.abs(sq-i)/2)));
					}
					else {
						middle.push(Math.abs(sq - Math.floor(Math.abs(sq-i)/2)));
					}
				}
			}
			else if (arr[sq].checker.color == "red" || arr[sq].checker.king == true) { // add kinged status check here
				if (i>sq) {
					if (Math.ceil((arr[i].y/sqSize)%2 == 0)) {
						middle.push(Math.abs(sq + Math.floor(Math.abs(sq-i)/2)));
					}
					else {
						middle.push(Math.abs(sq + Math.ceil(Math.abs(sq-i)/2)));
					}
				}
			}
			for (j in middle) {	
				if (Math.abs(arr[middle[j]].x - arr[sq].x) == sqSize && Math.abs(arr[middle[j]].y - arr[sq].y) == sqSize) {	
					if (arr[middle[j]].checker != null && arr[i].checker == null) {
						if (arr[middle[j]].checker.color != arr[sq].checker.color) {
							arr[i].highlighted = true;
							arr[i].move = "jump";
							arr[i].jumpOver = middle[j];
						}
					}
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
