var can = document.getElementById('canvas1');
var ctx = can.getContext('2d');
can.addEventListener("click", clickHandler, false);

var squares = [] 
var checkers = []
var sqSize = can.width/8;

new initializeBoardBetter();
//console.log(squares);
new initializeCheckers(can.height/20);
//console.log(checkers);
//console.log("Stop");
//console.log(squares);

