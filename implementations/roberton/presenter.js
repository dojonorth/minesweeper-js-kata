/* The presenter */

(function() { 'use strict';

    window.minesweeper = new Minesweeper(5, 5, '[{"x":1,"y":1},{"x":1,"y":3},{"x":3,"y":3}]');

    var modelStatusToDisplayStatus = {
        "READY": "Ready to play",
        "INPROGRESS": "Game in progress",
        "LOST": "Game over: You lost :-(",
        "WON": "Game over: You won! :-)"
    };


    // Listen to user events
    ///////////////////////////////////////////////////

    $("a").click(function() {
        var coords = makeCoordsFromId(this.id);
        minesweeper.clear(coords.x, coords.y);
    });

    $("a").bind("contextmenu", function(e) {
        var coords = makeCoordsFromId(this.id);
        minesweeper.toggleFlagAt(coords.x, coords.y);
        return false;
    });


    // Listen to model events
    ///////////////////////////////////////////////////

    minesweeper.on("game_status_update", function(status) {
        $("#game_status").text(modelStatusToDisplayStatus[status]);
    });

    minesweeper.on("cell_update", function(x, y, cellInfo) {
        update_cell(x, y, cellInfo);
    });


    // Private functions
    ///////////////////////////////////////////////////

    var makeCoordsFromId = function(id) {
        var coords = {
            x: parseInt(id.split("_")[1], 10),
            y: parseInt(id.split("_")[0], 10)
        };
        return coords;
    };

    var makeIdFromCoords = function(x, y) {
        return y + "_" + x;
    };

    var update_cell = function(x, y, cellInfo) {
        var id = makeIdFromCoords(x, y),
            neighbours = minesweeper.location(x, y).neighbours,
            new_class = "cell_unknown";

        if (cellInfo.hasFlag) {
            new_class = "cell_flag";
        }
        else if (cellInfo.isCleared) {
            new_class = "cell_clear";
        }

        $("#" + id).removeClass().addClass(new_class);
        if (neighbours > 0) {
            $("#" + id).text(neighbours);            
        }
    };
})();
