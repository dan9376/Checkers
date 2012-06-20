var can = document.getElementById('canvas1');
var ctx = can.getContext('2d');
can.addEventListener("click", clickHandler, false);

var squares = [] 
var checkers = []
var sqSize = can.width/8;
var chkActive;

new initializeBoardBetter();
//console.log(squares);
new initializeCheckers(can.height/20);
//console.log(checkers);
//console.log("Stop");
//console.log(squares);

function eligibleSquareCheck(arr,sq) {
	for (i in arr) {
		if (arr[i].x == arr[sq].x + sqSize && arr[i].y == arr[sq].y + sqSize && arr[i].checker == null) {
			if (arr[sq].checker.color == "black") {
				arr[i].highlighted = true;
			}
		}
		else if (arr[i].x == arr[sq].x - sqSize && arr[i].y == arr[sq].y + sqSize && arr[i].checker == null) {
			if (arr[sq].checker.color == "black") {
				arr[i].highlighted = true;
			}
		}
		else if (arr[i].x == arr[sq].x + sqSize && arr[i].y == arr[sq].y - sqSize && arr[i].checker == null) {
			if (arr[sq].checker.color == "red") {
				arr[i].highlighted = true;
			}
		}
		else if (arr[i].x == arr[sq].x - sqSize && arr[i].y == arr[sq].y - sqSize && arr[i].checker == null) {
			if (arr[sq].checker.color == "red") {
				arr[i].highlighted = true;
			}
		}
		else if (arr[i].x == arr[sq].x + (sqSize*2) && arr[i].y == arr[sq].y + (sqSize*2) && i<sq) {
			var middle = sq - Math.floor((sq-i)/2);
			//console.log(sq, middle, i);
			if (arr[middle].checker != null && arr[i].checker == null) {
				if (arr[middle].checker.color != arr[sq].checker.color) {
					if (arr[sq].checker.color == "black") {
						arr[i].highlighted = true
					}
				}
			}
		}
		else if (arr[i].x == arr[sq].x - (sqSize*2) && arr[i].y == arr[sq].y + (sqSize*2) && i<sq) {
			var middle = sq - Math.floor((sq-i)/2);
			//console.log(sq, middle, i);
			if (arr[middle].checker != null && arr[i].checker == null) {
				if(arr[middle].checker.color != arr[sq].checker.color) {
					if (arr[sq].checker.color == "black") {
						arr[i].highlighted = true
					}
				}
			}
		}
		else if (arr[i].x == arr[sq].x + (sqSize*2) && arr[i].y == arr[sq].y - (sqSize*2) && i>sq) {
			var middle = i - Math.ceil((i-sq)/2);
			//console.log(sq, middle, i);
			if (arr[middle].checker != null && arr[i].checker == null) {
				if(arr[middle].checker.color != arr[sq].checker.color) {
					if (arr[sq].checker.color == "red") {
						arr[i].highlighted = true
					}
				}
			}
		}
		else if (arr[i].x == arr[sq].x - (sqSize*2) && arr[i].y == arr[sq].y - (sqSize*2) && i>sq) {
			var middle = i - Math.ceil((i-sq)/2);
			//console.log(sq, middle, i);
			if (arr[middle].checker != null && arr[i].checker == null) {
				if(arr[middle].checker.color != arr[sq].checker.color) {
					if (arr[sq].checker.color == "red") {
						arr[i].highlighted = true
					}
				}
			}
		}
	}
}
function clearHighlighting() {
	//clear highlighting
	//console.log(squares);
	for (i in squares) {
		squares[i].highlighted = false;
		if (squares[i].checker != null) {
		squares[i].checker.highlighted = false;
		}
		//console.log(squares);
		}
	drawBoard(squares, checkers);
}
