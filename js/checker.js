// define a checker
function Checker(x, y, size, color, king) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
	this.highlighted = false;
	this.king = king || false;
    
	drawChecker(x, y, size, color, this.highlighted, this.king);
}