describe('Minesweeper Kata', function () {

	var height = 8;
	var width = 8;
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

    it('is initially unknown', function () {
    	var cell = new Cell();
        expect(cell.getState()).toBe(StateEnum.UNKNOWN);
    }),

    it('board is initialised with X and Y cells', function() {
    	var board = new Board(8, 10);
    	expect(board.getHeight()).toBe(8);
    	expect(board.getWidth()).toBe(10);
    }),

    it('cells on the board are initialised to UNKNOWN state', function() {
    	for (var x = 0; x < height; x++) {
    		for (var y = 0; y < width; y++) {
    			var cell = board.getCellAt(x, y);
    			expect(cell.getState()).toBe(StateEnum.UNKNOWN);
    		}
    	}
    }),

	describe('cells neighbours', function () {
		it('to right', function() {
			var topLeftCell = board.getCellAt(0, 0);
			var topLeftToRightCell = board.getCellAt(0, 1);
			expect(topLeftCell.neighbourOf(topLeftToRightCell)).toBeTruthy();
		}),

		it('to each other', function() {
			var leftCell = board.getCellAt(0, 0);
			var rightCell = board.getCellAt(1, 0);
			expect(leftCell.neighbourOf(rightCell)).toBeTruthy();
			expect(rightCell.neighbourOf(leftCell)).toBeTruthy();
		}),

		it('to cells below them', function() {
			var leftCell = board.getCellAt(0, 0);
			var belowCell = board.getCellAt(0, 1);
			expect(leftCell.neighbourOf(belowCell)).toBeTruthy();
		}),

		it('to adjacent bottom right', function() {
			var cell = board.getCellAt(0, 0);
			var bottomRightCell = board.getCellAt(1, 1);
			expect(cell.neighbourOf(bottomRightCell)).toBeTruthy();
		}),

		it('to adjacent bottom left', function() {
			var cell = board.getCellAt(height - 1, width - 1);
			var bottomLeftCell = board.getCellAt(height - 2, width - 2);
			expect(cell.neighbourOf(bottomLeftCell)).toBeTruthy();
		}),

		it('not with cells more than 2 cells away', function() {
			var cell = board.getCellAt(0, 0);
			var cellMoreThanTwoAway = board.getCellAt(2, 2);
			expect(cell.neighbourOf(cellMoreThanTwoAway)).toBeFalsy();
		});
	}),

	describe('mines', function() {
	    it('cell is empty if no adjacent mines', function() {
			var currentBoard = initialiseBoardToState(8, 8, StateEnum.EMPTY);
	    	var cell = currentBoard.getCellAt(4, 4);
	    	expect(cell.getState()).toBe(StateEnum.EMPTY);
	    }),

	    it('cell numbered if X mines are adjacent', function() {
	    	var currentBoard = initialiseBoardToState(2, 2, StateEnum.UNKNOWN);
	    	currentBoard.setCellAt(1, 1, StateEnum.MINE);
	    	currentBoard.setCellAt(1, 0, StateEnum.MINE);
	    	currentBoard.setCellAt(0, 1, StateEnum.MINE);
	    	expect(currentBoard.getCellAt(0, 0).calculateState()).toBe(3);
	    });
	});
});