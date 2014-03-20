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
function GameUI (board, width, height, flags) {
    console.log('Creating game UI');

    var game_ui = { 
        board : $(board),
        width : width,
        height : height,
        flags : flags,
        posToCell : {},

        setGameEngine : function(game_engine) {
            game_ui.engine = game_engine;
        },
        /**
         * A user has selected to uncover a cell by clicking on it.
         */
        cellSelected : function() {
            var cell = $(this);

            var pos = cell.data('position');
            console.log('Cell selected {x: ' + pos.x + ',y: ' + pos.y + '}');
            
            var result = game_ui.engine.cell_selected(pos.x,pos.y);

            for (pos in result) {
                var cellToProcess = game_ui.posToCell[pos];
                game_ui.processCellSelected(cellToProcess,result[pos]);  
            }
        },

        processCellSelected : function(cell,result) {

            var inner = cell.find('.inner');
            if (result == "mine") {
                inner.addClass('flaticon-mine');
            } else {
                inner.addClass('uncovered');
                inner.text(result);
            }      
        },

        /**
         * A user has right-clicked a cell to flag it.
         */
        cellFlagged : function() {
            var cell = $(this);
            var pos = cell.data('position');
            console.log('Cell flagged {x: ' + pos.x + ',y: ' + pos.y + '}');

            
            /////////////////////////////////////////
            // INTEGRATE WITH YOUR GAME CODE HERE
            /////////////////////////////////////////


            cell.find('.inner').addClass('flaticon-flag');
        },


        /**
         * Redraw the UI, setting appropriate sizes for the cells in the game board.
         */
        redrawGameBoard : function() {
            var size = Math.floor(Math.min(game_ui.board.height() / game_ui.height, game_ui.board.width() / game_ui.width));
            $('.cell').css({ 'width': size, 'height': size, 'line-height': size + 'px', 'font-size': size / 2 });
        },

        /**
         * Generate the actual game board and place it in the UI.
         */
        initGameBoard : function() {
            // For each row...
            for (var y = 0; y < game_ui.height; y++) {

                var row = $('<div/>', { 'class': 'cell-row clearfix' });
                row.appendTo(game_ui.board);

                // Each cell in the row...
                for (var x = 0; x < game_ui.width; x++) {

                    var cell = $('<div/>', {
                        'class': 'cell',
                        'data': {'position': { 'x': x, 'y': y }},
                        'on': {
                            'click': game_ui.cellSelected,
                            'contextmenu': game_ui.cellFlagged
                        }
                    });
                    
                    game_ui.posToCell[x + ":" + y] = cell;
                    // Add an inner element to the cell for styling purposes :/
                    $('<div/>', { 'class': 'inner' }).appendTo(cell);

                    cell.appendTo(row);
                }
            }

            game_ui.redrawGameBoard();
        }
    };
    game_ui.initGameBoard();
    return game_ui;
}








