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

Object.prototype.clone = function() {
  var newObj = (this instanceof Array) ? [] : {};
  for (i in this) {
    if (i == 'clone') continue;
    if (this[i] && typeof this[i] == "object") {
      newObj[i] = this[i].clone();
    } else newObj[i] = this[i]
  } return newObj;
};
/*
Array.prototype.clone = function(doDeepCopy) {
    if(doDeepCopy) {
        var encountered = [{
            a : this,
            b : []
        }];

        var item,
            levels = [{a:this, b:encountered[0].b, i:0}],
            level = 0,
            i = 0,
            len = this.length;

        while(i < len) {
            item = levels[level].a[i];
            if(Object.prototype.toString.call(item) === "[object Array]") {
                for(var j = encountered.length - 1; j >= 0; j--) {
                    if(encountered[j].a === item) {
                        levels[level].b.push(encountered[j].b);
                        break;
                    }
                }
                if(j < 0) {
                    encountered.push(j = {
                        a : item,
                        b : []
                    });
                    levels[level].b.push(j.b);
                    levels[level].i = i + 1;
                    levels[++level] = {a:item, b:j.b, i:0};
                    i = -1;
                    len = item.length;
                }
            }
            else {
                levels[level].b.push(item);
            }

            if(++i == len && level > 0) {
                levels.pop();
                i = levels[--level].i;
                len = levels[level].a.length;
            }
        }

        return encountered[0].b;
    }
    else {
        return this.slice(0);
    }
};
*/
initializeBoard();
initializeCheckers(canG.height/20);
//console.log(squares[0]);
render();
saveGame();
console.log("arrays are the same: " + (savedGame == squares));
console.log("first squares are the same: " + (savedGame[0] == squares[0]));
console.log("first checkers are the same: " + (savedGame[0].checker == squares[0].checker));
//loadGame();
//squares[0] = null;
console.log(squares[0]);
console.log(savedGame[0]);
//console.log(savedGame[8].checker.point.x);


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
	//console.log(activePlayer);
	if (activePlayer == 1) {activePlayer = 2;}
	else {activePlayer = 1;}
	//console.log(activePlayer);
	turnState = "start";
	render();
};

function turnUndo() {
	//squares[13] = null;
	//console.log(squares[13].checker.point.x);
	//console.log(savedGame[13].checker.point.x);
	//if (squares[0].checker == savedGame[0].checker) {console.log("first checker is the same")};
	clearSideBoard();
	loadGame();
	//console.log(squares[13].checker.point.x);
	//console.log(savedGame[13].checker.point.x);
	turnState = "start";
	render();
};

function copyData(obj) {
	var out = $.extend(true, [], obj);
	return out
};
function copyArray(arr) {
	var copy = [];
	var obj = {};
	for (i = 0; i<arr.length; i++) {
		obj = $.extend(true, {}, arr[i]);
		copy.push(obj);
	};
	return copy;
};

function saveGame() {
	//savedGame = null;
	//console.log(savedGame);
	savedGame = squares.clone();
	//savedGame = copyArray(squares);
	//console.log(savedGame);
};

function loadGame() {
	//console.log(squares[13]);
	//console.log(savedGame[13]);
	//squares = null;
	squares = savedGame.clone();
	//squares = copyArray(savedGame);
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
