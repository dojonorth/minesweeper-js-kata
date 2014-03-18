
function Minesweeper(height, width) {
	this.height = height;
	this.width = width;
	this.cells = this.initialise();
}

var State = {
	EMPTY : 1, 
	MINE : 2
};

Minesweeper.prototype.initialise = function() {
	var cells = [this.height][this.width];
	// Cell[this.height, this.width];
	for (var i = this.height - 1; i >= 0; i--) {
		for (var j = this.width - 1; j >= 0; j--) {
			this.cells[i][j] = new Cell(State.EMPTY);
		}
	}
	return this.cells;
};