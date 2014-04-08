function Board(height, width) {
	this.height = height;
	this.width = width;
	this.cells = [];

	for (var x = 0; x < height; x++) {
		this.cells[x] = [];
		for (var y = 0; y < width; y++) {
			this.cells[x][y] = new Cell(x, y);
		}
	}

	for (var x = 0; x < height; x++) {
		for (var y = 0; y < width; y++) {
			cell = this.getCellAt(x, y);
			if (y < width - 1) {
				cell.addNeighbour(this.getCellAt(x, y + 1));
			}
			if (x < height - 1) {
				cell.addNeighbour(this.getCellAt(x + 1, y));
			}
			if (x < height - 1 && y < width - 1) {
				cell.addNeighbour(this.getCellAt(x + 1, y + 1));
			}
			if (x > 0 && y > width - 1) {
				cell.addNeighbour(this.getCellAt(x + 1, y - 1));
			}
		}
	}
}

Board.prototype = {
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