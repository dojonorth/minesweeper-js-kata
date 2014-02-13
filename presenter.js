/* The presenter */

(function() { 'use strict';

    window.minesweeper = new Minesweeper('[{"x":1,"y":1},{"x":1,"y":3},{"x":3,"y":3}]');


    // Listen to user events
    ///////////////////////////////////////////////////

    $("a").click(function() {
        var coords = makeCoordsFromId(this.id);
        minesweeper.clear(coords.x, coords.y);
    })

    $("a").bind("contextmenu", function(e) {
        var coords = makeCoordsFromId(this.id);
        minesweeper.flagMineAt(coords.x, coords.y);
        return false;
    })


    // Listen to model events
    ///////////////////////////////////////////////////

    minesweeper.on("status_update", function(status) {
        console.log("status_update: " + status);
    })

    minesweeper.on("cell_update", function(x, y, state) {
        console.log("cell_update: " + x + "," + y + ": " + state);
        update_cell(x, y, state);
        $("#game_status").text("Game in progress");
    })


    // Private functions
    ///////////////////////////////////////////////////

    var makeCoordsFromId = function(id) {
        var coords = {
            x: parseInt(id.split("_")[1], 10),
            y: parseInt(id.split("_")[0], 10)
        }
        return coords;
    }

    var makeIdFromCoords = function(x, y) {
        return y + "_" + x;
    }

    var update_cell = function(x, y, state) {
        var id = makeIdFromCoords(x, y),
            neighbours = minesweeper.cellAt(x, y).neighbours,
            new_class = "cell_unknown";

        if (state === "mine") {
            new_class = "cell_mine";
        }
        else if (state === "clear") {
            new_class = "cell_clear";
        }
        $("#" + id).removeClass("cell_unknown").addClass(new_class);
        $("#" + id).text(neighbours);
    }
})()
