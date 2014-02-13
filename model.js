
/* The model

  A Model instance exposed to global space so you can
  use the Minesweeper API from the console. For example:

  minesweeper.clear(0, 0);
  minesweeper.flagMineAtine(1, 2);

  You can also query the state:

  minesweeper.cellAt(x, y);  // returns {hasMine: true/false, hasBeenSeen: true/false}
*/

function Minesweeper(mineCoords) {

    var self = $.observable(this),
        playerGrid = [],
        mines = [];

    self.clear = function(x, y) {
        var grid_index = self._grid_index_from_x_y(x, y);
        console.log("Minesweeper::check " + x + " " + y + " -> " + grid_index);
        playerGrid[grid_index] = "cleared";

        // self.trigger("status_update", "{}");
        self.trigger("cell_update", x, y, playerGrid[grid_index].hasMine ? "mine" : "clear");
    };

    self.flagMineAt = function(x, y) {
        var grid_index = self._grid_index_from_x_y(x, y);
        playerGrid[grid_index] = "flag";
        self.trigger("cell_update", x, y, playerGrid[grid_index].hasMine ? "mine" : "clear");
    };

    self.cellAt = function(x, y) {
        var gridIndex = self._grid_index_from_x_y(x, y),
            cell = playerGrid[gridIndex],
            visibleCellInfo = {
                isCleared: (cell === "cleared"),
                hasFlag: (cell === "flag"),
                hasMine: false,
                neighbours: self._countNeighbouringMines(x, y)
            };
        return visibleCellInfo;
    };


    // Private functions
    self._initPlayerGrid = function() {
        for (var i = 0; i < 25; i++) {
            playerGrid.push("default");
        }
    };

    self._initMines = function(minesAsJson) {
        JSON.parse(minesAsJson).forEach(function(coord) {
            mines.push(new Mine(coord.x, coord.y));
        });
    };

    self._grid_index_from_x_y = function(x, y) {
        return x + 5 * y;
    };

    self._countNeighbouringMines = function(x, y) {
        var count = 0;
        mines.forEach(function(mine) {
            if (mine.isNeighbour(x, y)) {
                count++;
            }
        });
        return count;
    };


    // Initialisation
    self._initPlayerGrid();
    self._initMines(mineCoords);
}