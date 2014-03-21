var GUI;
/**
 * The GameUI is responsible only for creating the UI elements of the game
 * and does/should not contain any game logic. When integrating with the UI
 * try to avoid implementing game logic here.
 *
 * @param board Represents the DOM element where the UI 'game board' will be generated
 * @param width The desired width of the game board (in cells)
 * @param height The desired height of the game board (in cells)
 * @param flags The number of flags available to mark mine positions
 */
function GameUI (board, grid) {
    GUI = this;
    this.board = $(board);
    this.grid = grid;
    this.width = grid.grid[0].length;
    this.height = grid.grid.length;
    this.initGameBoard();
}

/**
 * A user has selected to uncover a cell by clicking on it.
 */
GameUI.prototype.cellSelected = function() {
    var cell = $(this);
    var pos = cell.data('position');
    console.log(pos.x, pos.y)
    GUI.grid.sweep(pos.x, pos.y);
    GUI.redrawGameBoard();
//    cell.find('.inner').addClass('uncovered');
    // or
//    cell.find('.inner').addClass('flaticon-mine');
};

/**
 * A user has right-clicked a cell to flag it.
 */
GameUI.prototype.cellFlagged = function() {
    var cell = $(this);
    var pos = cell.data('position');
    console.log('Cell flagged {x: ' + pos.x + ',y: ' + pos.y + '}');

    
    /////////////////////////////////////////
    // INTEGRATE WITH YOUR GAME CODE HERE
    /////////////////////////////////////////


    cell.find('.inner').addClass('flaticon-flag');
};

/**
 * Redraw the UI, setting appropriate sizes for the cells in the game board.
 */
GameUI.prototype.redrawGameBoard = function() {
    var size = Math.floor(Math.min(this.board.height() / this.height, this.board.width() / this.width));
    $('.cell').css({ 'width': size, 'height': size, 'line-height': size + 'px', 'font-size': size / 2 });

    var gridArray = this.grid.grid;
    for(var row = 0; row < gridArray.length; row++) {
        for(var col = 0; col < gridArray[row].length; col++) {
            var value = this.grid.getCell(col, row);
            var cell = this.board.find('.cell-row:eq('+row+')').find('.cell:eq(' + col + ')');

            if (value !== false && value !== true) {
                cell.find('.inner').addClass('uncovered');
                if (value !== 0) {
                    cell.find('.inner').text(value);
                }
            }
        }
    }
};

/**
 * Generate the actual game board and place it in the UI.
 */
GameUI.prototype.initGameBoard = function() {
    // For each row...
    for (var y = 0; y < this.height; y++) {

        var row = $('<div/>', { 'class': 'cell-row clearfix' });
        row.appendTo(this.board);

        // Each cell in the row...
        for (var x = 0; x < this.width; x++) {

            var cell = $('<div/>', {
                'class': 'cell',
                'data': {'position': { 'x': x, 'y': y }},
                'on': {
                    'click': this.cellSelected
//                    'contextmenu': this.cellFlagged
                }
            });

            // Add an inner element to the cell for styling purposes :/
            $('<div/>', { 'class': 'inner' }).appendTo(cell);

            cell.appendTo(row);
        }
    }

    this.redrawGameBoard();
};