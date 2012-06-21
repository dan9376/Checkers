// define a square
function Square(x, y, num, size, color) {
    this.x = x;
    this.y = y;
    this.num = num;
    this.size = size;
    this.color = color;
    this.checker = null;
	this.highlighted = false;
	this.move = null;
	this.jumpOver =  null;
    
    drawSquare(x, y, size, size, color, this.highlighted);
		
	squares.push(this);
}