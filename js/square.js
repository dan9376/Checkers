// define a square
function Square(point, num, size, color, highlighted) {
    this.point = new Point(point.x, point.y);
    this.num = num;
	this.index = num - 1;
    this.size = size;
    this.color = color;
    this.checker = null;
	this.highlighted = highlighted || false;
	this.move = null;
	this.jumpOver =  null;
    
    squares.push(this);
}

