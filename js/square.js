// define a square
function Square(x, y, num, size, color) {
    this.point = new Point(x,y);
    this.num = num;
	this.index = num - 1;
    this.size = size;
    this.color = color;
    this.checker = null;
	this.highlighted = false;
	this.move = null;
	this.jumpOver =  null;
    
    this.draw();
		
	squares.push(this);
}

Square.prototype.draw = function() {
	//ctxB.beginPath();
	ctxB.fillStyle = this.color;
	ctxB.fillRect(this.point.x, this.point.y, this.size, this.size);
	var line = 1;
	ctxB.lineWidth = line*2;
	if (this.highlighted == true) {
		ctxB.strokeStyle = "yellow";
		ctxB.strokeRect(this.point.x+line,this.point.y+line,this.size-(line*2),this.size-(line*2));
	}
}

Square.prototype.validMoves = function () {
	// determines which squares are eligible moves for a given checker
	// (checker is just an array property of a square)
	var middle;
	for (i in squares) {
		// evaluate adjacent squares
		if (Math.abs(squares[i].point.x - this.point.x) == sqSize && Math.abs(squares[i].point.y - this.point.y) == sqSize && squares[i].checker == null) {
			if (squares[i].point.y > this.point.y) {
				if (this.checker.color == "black" || this.checker.king == true) {
					squares[i].highlighted = true;
					squares[i].move = "move";
				}
			}
			else if (squares[i].point.y < this.point.y) {
				if (this.checker.color == "red" || this.checker.king == true) {
					squares[i].highlighted = true;
					squares[i].move = "move";
				}
			}
		}
		// evaluate squares that are two spaces away
		else if (Math.abs(squares[i].point.x - this.point.x) == sqSize*2 && Math.abs(squares[i].point.y - this.point.y) == sqSize*2) {
			if (i<this.index) {
				if (this.checker.color == "black" || this.checker.king == true) {
					// the row that your checker is in changes how you calculate the middle square
					if ((this.point.y/sqSize)%2 == 0) {
						middle = Math.abs(this.index - Math.ceil(Math.abs(this.index-i)/2));
						validJump(this.index, i, middle);
					}
					else {
						middle = Math.abs(this.index - Math.floor(Math.abs(this.index-i)/2));
						validJump(this.index, i, middle);
					}
				}
			}
			else if (i>this.index) {
				if (this.checker.color == "red" || this.checker.king == true) { 
					// the row that your checker is in changes how you calculate the middle square
					if ((this.point.y/sqSize)%2 == 0) {
						middle = Math.abs(this.index + Math.floor(Math.abs(this.index-i)/2));
						//console.log(this.index, i, middle);
						validJump(this.index, i, middle);
					}
					else {
						middle = Math.abs(this.index + Math.ceil(Math.abs(this.index-i)/2));
						//console.log(this.index, i, middle);
						validJump(this.index, i, middle);
					}
				}
			}
		}
	}
	function validJump(start, target, middle) {
		if (Math.abs(squares[middle].point.x - squares[start].point.x) == sqSize && Math.abs(squares[middle].point.y - squares[start].point.y) == sqSize) {	
			if (squares[middle].checker != null && squares[target].checker == null) {
				if (squares[middle].checker.color != squares[start].checker.color) {
					squares[target].highlighted = true;
					squares[target].move = "jump";
					squares[target].jumpOver = middle;
				}
			}
		}
	}
}