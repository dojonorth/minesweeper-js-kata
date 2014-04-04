var StateEnum = {
	EMPTY : "Empty", UNKNOWN: "Unknown"
}

function Cell() {
	this.state = StateEnum.UNKNOWN;
}

Cell.prototype = {
	getState: function() {
		return this.state;	
	},

	setState: function(state) {
		this.state = state;
	}
}