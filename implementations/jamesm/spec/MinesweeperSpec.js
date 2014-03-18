describe("Minesweeper Kata", function() {

	var height = 8;
	var width = 8;

	var game;

	beforeEach(function () {
		game = new Minesweeper(height, width);
	});

	describe("game state", function() {
		it("new game initialised to dimensions", function() {
	    	expect(game.height * game.width).toEqual(height * width);
	   	}),

	   	it("all cells in new game initialised to empty", function() {
	   		for(var i = 0; i < game.height; i++) {
	   			for(var j = 0; j < game.width; j++) {
	   				expect(game.cells[i][j].state).toEqual(State.MINE);
				}
	   		}
	   	});
	});
});