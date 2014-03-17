describe("Minesweeper Kata", function() {

	var height = 8;
	var width = 8;

	describe("game state", function() {
		it("new game initialised to dimensions", function() {
	    	var game = new Minesweeper(this.height, this.width);
	    	expect(game.height * game.width).toEqual(this.height * this.width);
	   	}),

	   	it("all cells in new game initialised to empty", function() {
	   		var game = new Minesweeper(this.height, this.width);
	   		for(var i = 0; i < game.height; i++) {
	   			console.log("looping i");
	   			for(var j = 0; j < game.width; j++) {
	   				console.log("looping j");
	   				expect(game.cells[i][j].state).toEqual(Minesweeper.State.EMPTY);
	   			}
	   		}
	   	});
	});
});