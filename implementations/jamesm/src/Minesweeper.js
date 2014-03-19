
function Minesweeper(height, width) {
	this.height = height;
	this.width = width;
	this.cells = this.initialise();
}

var State = {
	EMPTY : "Empty", 
	MINE : "Mine"
};

Minesweeper.prototype.initialise = function() {
	var cells = new Array(this.height);

	// Cell[this.height, this.width];
	for (var i = this.height - 1; i >= 0; i--) {
		var rows = new Array(this.width);
		for (var j = this.width - 1; j >= 0; j--) {
			rows[j] = new Cell(State.EMPTY);
		}
		cells[i] = rows;
	}
	return cells;
};