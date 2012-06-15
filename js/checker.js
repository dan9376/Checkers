// define a checker
function checker(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
	this.highlighted = false;
    
	drawChecker(x, y, size, color, this.highlighted);
}