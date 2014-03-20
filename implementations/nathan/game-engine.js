
function create_engine() {

    var contains = function(board,x,y) {
        for (var i = 0; i < board.length; i++) {
            if (board[i].x === x && board[i].y === y) {
                return true;
            }
        }
        return false;
    };

    var get_neighbours = function(x,y) {
        return [[x - 1,y - 1],[x    ,y - 1],[x + 1,y - 1],
                [x - 1,y    ],              [x + 1,y    ],
                [x - 1,y + 1],[x    ,y + 1],[x + 1,y + 1]]; 
    };

    var count_neighbouring_mines = function(board,x,y) {
        var neighbours = get_neighbours(x,y);
        var count = 0;
        for (var i = 0; i < neighbours.length; i++) {
            if (contains(board,neighbours[i][0],neighbours[i][1])) {
                count += 1;
            }
        }
        return count;
    };

    var get_random_int = function(max) {
        return Math.floor(Math.random() * max);
    };

    var is_within_board_range = function(x,y) {
        return (x >= 0 && x < board_width && y >= 0 && y < board_height);
    }

    var add_result = function(result,board,x,y) {
        if (contains(board,x,y)) {
            result[x + ":" + y] = "mine";               
        } else {
            var count = count_neighbouring_mines(board,x,y);
            result[x + ":" + y] = count;   
            
            if (count == 0) {
                var neighbours = get_neighbours(x,y);
                for (var i = 0; i < neighbours.length ; i++) {
                    var n_x = neighbours[i][0];
                    var n_y = neighbours[i][1];
                    if (is_within_board_range(n_x,n_y)) {
                        var key = n_x + ":" + n_y;                       
                        if (!result[key] && result[key] !== 0) {
                            add_result(result,board,n_x,n_y);
                        }
                    }
                }
            }                
        }
    };

    var board = [];

    var flagged = [];

    var board_width;

    var board_height;

    var game_engine = {
        set_mine : function(x,y) {
            board[board.length] = {x : x,y : y};
        },

        set_board_width : function(x) {
            board_width = x;
        },

        set_board_height : function(y) {
            board_height = y;
        },

        init : function(width,height,mines) {
            board_width = width;
            board_height = height;
            var minesToGo = mines;
            while (minesToGo > 0) {
                var x = get_random_int(width);
                var y = get_random_int(height);
                console.log(x,y);
                if (!contains(board,x,y)) {
                    game_engine.set_mine(x,y);
                    minesToGo = minesToGo - 1;
                }
            }
        },

        cell_flagged : function(x,y) {
            flagged[flagged.length] = {x : x,y : y};    
        },

        cell_selected : function(x,y) {
            var result = {};
            add_result(result,board,x,y);
            return result;
        }
    }

    return game_engine;
}





