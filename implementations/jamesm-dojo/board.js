function Board(height, width) {
	this.height = height;
	this.width = width;
	this.cells = [];

	for (var x = 0; x < height; x++) {
		this.cells[x] = []; 
		for (var y = 0; y < width; y++) {
			this.cells[x][y] = new Cell();
		}
	}

	// console.log(this.cells);
}

Board.prototype = {
	initialise: function(height, width) {
		return this.cells;
	},

	getHeight: function() {
		return this.height;
	},

	getWidth: function() {
		return this.width;
	},

	getCellAt: function(x, y) {
		return this.cells[x][y];
	},

	setCellAt: function(x, y, cellState) {
		var cell = this.cells[x][y];
		return cell.setState(cellState);
	},

	getState: function() {
		return this.cells;
	}
}