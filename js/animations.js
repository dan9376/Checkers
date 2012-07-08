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

function Path(points) {
    this.points = points;

    // Sanity check.
    if (points[0].time == undefined || points[points.length - 1].time == undefined)
        throw new Error("all control points must be between two real points");
}

Path.prototype.getXYAtTime = function (t) {
    var points = this.points;

    // First, see if t is out of range.
    if (t < points[0].time)
        return points[0];
    if (t > points[points.length - 1].time)
        return points[points.length - 1];

    // OK, t is in range. Find out which Bezier curve we're in.
    //
    // Specifically we want 'start' and 'stop' to be the indexes of two points
    // that each have a .time property, bracketing the current time t; and
    // all the points in between 'start' and 'stop' should be control points.
    //
    var start = 0, stop = points.length - 1;
    for (var i = 1; i < points.length; i++) {
        var p = points[i];
        if (t < p.time) {
            stop = i;
            break;
        }
        if (p.time != undefined)
            start = i;
    }
    var n = stop - start;

    // Adjust t to be in the range [0, 1).
    var t0 = points[start].time, t1 = points[stop].time;
    t = (t - t0) / (t1 - t0);
    var tInv = 1 - t;

    // Now calculate the current position in the curve.
    // Wikipedia says this is:
    //   sum for i = 0 to n of (n C i * (1 - t) ^ (n - i) * t ^ i * P[i])
    // 
    var x = 0, y = 0;
    for (var i = 0; i <= n; i++) {
        var p = points[start + i];
        var c = nCr(n, i) * Math.pow(1 - t, n - i) * Math.pow(t, i);
        x += c * p.x;
        y += c * p.y;
    }
    return {x: x, y: y};
}

// The number of k-combinations of a set of size n.
function nCr(n, k) {
    var z = 1;
    for (var i = 1; i <= k; i++)
        z *= (n + 1 - i) / i;
    return z;
}

function move(obj, path, cleanup){ //obj is a game object, path is an array containing multiple points, cleanup is a callback function to call after moving is complete
	this.end = path.points[path.points.length-1]; // end is the last point in the path
    time = time + 1; // increment the timer
	var p = path.getXYAtTime(time); // p is a point at a given time
	obj.point.x = p.x; // move the reference point of the object to point p
	obj.point.y = p.y;

		
	if (obj.point.x != end.x || obj.point.y != end.y) {
		// request new frame
		requestAnimFrame(function(){
		render();
		move(obj, path, cleanup);
		});
	} 
	else {
	// animation complete, reassign properties
		cleanup();
	}
}
// place the rAF *before* the render() to assure as close to 
// 60fps with the setTimeout fallback.

function fade(obj, cleanup){ //obj is a game object, cleanup is a callback function to call after fading is complete
	//time = time + 1; // increment the timer
	//console.log(obj);
	obj.opacity = obj.opacity - 0.05;
		
	if (obj.opacity > 0) {
		// request new frame
		requestAnimFrame(function(){
		render();
		fade(obj, cleanup);
		});
	} 
	else {
	// animation complete, reassign properties
		cleanup();
	}
}


function animMoveChecker(checker, start, sqEnd){ //checker is a Checker object. start is that checker's starting Point, sqEnd is the Square the checker is moving to
	this.end = new Point();
	end.x = squares[sqEnd].point.x + sqSize/2;
    end.y = squares[sqEnd].point.y + sqSize/2;
    
	this.control1 = new Point();
	this.control2 = new Point();
	
	time = time + 1;
	
	//this.points = [];
	
	//console.log(end.x, end.y, checker.x, checker.y, time);
	if (squares[sqEnd].move == "jump") {
		// animate move along a bezier curve so it looks like a jump (hopefully)
		
		//set control point coordinates
		if (start.x > end.x) {
			if (start.y > end.y) { //up,left
				control1.x = start.x - sqSize/2;
				control1.y = start.y - sqSize*1.5;
				control2.x = start.x - sqSize*1.2;
				control2.y = start.y - sqSize*2.3;			
			}
			else { //start.y < end.y = down, left
				control1.x = start.x - sqSize*1.3;
				control1.y = start.y + sqSize*.1;
				control2.x = start.x - sqSize*2.2;
				control2.y = start.y + sqSize*.9;			
			}
		}
		else { //start.x < end.x
			if(start.y > end.y) { //up, right
				control1.x = start.x + sqSize/2;
				control1.y = start.y - sqSize*1.5;
				control2.x = start.x + sqSize*1.2;
				control2.y = start.y - sqSize*2.3;
			}
			else { //start.y < end.y = down,right
				control1.x = start.x + sqSize*1.3;
				control1.y = start.y + sqSize*.1;
				control2.x = start.x + sqSize*2.2;
				control2.y = start.y + sqSize*.9;			
			}
		}
		//here's the Path for the checker to follow
		this.path = new Path([
		{x: start.x, y: start.y, time: 0},  // start point
		{x: control1.x, y: control1.y},     // 2 control points
		{x: control2.x, y: control2.y},
		{x: end.x, y: end.y, time: 50}  	// end point
	  ]);
	}	
	else {
		//straight line move doesn't need control points
		//here's the Path for the checker to follow
		this.path = new Path([
			{x: start.x, y: start.y, time: 0},  // start point
			{x: end.x, y: end.y, time: 50}  	// end point
		]);	
	}
	move(checker, path, function(){
	// animation complete, reassign properties
	//console.log(checker.point, squares[sqEnd].checker.point);
	// king the checker if it reaches opponent's back row
		if (checker.color == "red" && checker.point.y == sqSize/2 || checker.color == "black" && checker.point.y == canG.height - sqSize/2) {
			if (checker.king == false) {
				checker.king = true;
				checker.size = checker.size*1.2;
			}
		}
		// TO DO: animate this
		if (squares[sqEnd].move == "jump") {
			var kill = squares[sqEnd].jumpOver;
			fade(squares[kill].checker, function(){
				squares[kill].checker = null;
				//redraw board
				render();
				});
		}
		// clear all highlighting
		clearHighlighting();
		// assign checker to new square
		squares[sqEnd].checker = checker;
		squares[sqEnd].checker.point = checker.point;
		// remove active checker from old square
		squares[chkActive].checker = null;
		// clear temp checker
		chkMoving = null;	
		chkActive = null;

	});
};
// doesn't work yet
function animBreakChecker(checker) {
	//console.log(checker);
	checker.broken(checker);
	this.a = checker.a;
	this.b = checker.b;
	this.c = checker.c;
	this.d = checker.d;
	console.log(b, b.point.x);
	
	//set path for each piece
	a.path = new Path([
		{x: a.point.x, y: a.point.y, time: 0},  		// start point
		{x: a.point.x+10, y: a.point.y+10, time: 100}   	// end point
	]);
	//console.log(a.path);
	b.path = new Path([
		{x: b.point.x, y: b.point.y, time: 0},  		// start point
		{x: b.point.x-10, y: b.point.y+10, time: 100}   	// end point
	]);
	c.path = new Path([
		{x: c.point.x, y: c.point.y, time: 0},  		// start point
		{x: c.point.x-10, y: c.point.y-10, time: 100}   	// end point
	]);
	d.path = new Path([
		{x: d.point.x, y: d.point.y, time: 0},  		// start point
		{x: d.point.x-10, y: d.point.y-10, time: 100}   	// end point
	]);
	//move pieces
	move(a, a.path, function(){});
	move(b, b.path, function(){});
	move(c, c.path, function(){});
	move(d, d.path, function(){});
	render();
	//console.log(this);
};
