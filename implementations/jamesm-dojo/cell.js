var StateEnum = {
	EMPTY : "Empty", UNKNOWN: "Unknown", ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5, SIX: 6, SEVEN: 7, EIGHT: 8, MINE: "Mine"
}

function Cell(x, y) {
	this.state = StateEnum.UNKNOWN;
	this.neighbours = {};
	this.position = x + "," + y;
	this.x = x;
	this.y = y;
}

Cell.prototype = {
	getState: function() {
		return this.state;	
	},

	setState: function(state) {
		this.state = state;
	},

	getPosition: function () {
		return this.position;
	},

	getX: function() {
		return this.x;
	},

	getY: function() {
		return this.y;
	},

	addNeighbour: function(neighbour) {
		this.neighbours[neighbour.getPosition()] = neighbour;
		neighbour.neighbours[this.getPosition()] = this;
	},

	neighbourOf: function(cell) {
		console.log(cell);
		position = cell.getPosition();
		console.log(position);
		if (position in this.neighbours) {
			return true;
		} else {
			return false;
		}
	}
}