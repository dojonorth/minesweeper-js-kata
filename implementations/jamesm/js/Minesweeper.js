function Minesweeper(height, width) {
	this.height = height;
	this.width = width;
};

Minesweeper.prototype.State = {
	EMPTY;
};

Minesweeper.prototype.initialise = function() {
	this.cells = {};
	// Cell[this.height, this.width];
	for (var i = this.height - 1; i >= 0; i--) {
		for (var j = cells.width - 1; i >= 0; i--) {
			cells[i][j] = new Cell(State.EMPTY);
		};
	};
};