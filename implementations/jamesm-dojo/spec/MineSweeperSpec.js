describe('Minesweeper Kata', function () {

	var height;
	var width;
	var board;

	beforeEach(function() {
		board = new Board (height, width);
	});

	initialiseBoardToState = function(x, y, cellState) {
		board = new Board (x, y);
		var initialCells = board.getState();
		for (var x = 0; x < height; x++) {
			for (var y = 0; y < height; y++) {
				board.setCellAt(x, y, StateEnum.EMPTY);
			}
		}
		return board;
	}

    it('cell state is initially unknown', function () {
    	var cell = new Cell();
        expect(cell.getState()).toBe(StateEnum.UNKNOWN);
    }),

    it('board is initialised with X and Y cells', function() {
    	var board = new Board(8, 10);
    	expect(board.getHeight()).toBe(8);
    	expect(board.getWidth()).toBe(10);
    }),

    it('all cells on the board are initialised to UNKNOWN state', function() {
    	for (var x = 0; x < height; x++) {
    		for (var y = 0; y < width; y++) {
    			var cell = board.getCellAt(x, y);
    			expect(cell.getState()).toBe(StateEnum.UNKNOWN);
    		}
    	}
    }),

  //   it('cell is empty if no adjacent mines', function() {
		// var currentBoard = initialiseBoardToState(8, 8, StateEnum.EMPTY);
  //   	var cell = currentBoard.getCellAt(4, 4);
  //   	expect(cell.getState()).toBe(StateEnum.EMPTY);
  //   }),

	it('corner top left cell has neighbour to right', function() {
		console.log(board);
		var topLeftCell = board.getCellAt(0, 0);

		var topLeftToRightCell = board.getCellAt(0, 1);
		expectTrue(topLeftCell.neighbourOf(topLeftToRightCell));
	});
});