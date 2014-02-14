
/* The model

  A Model instance exposed to global space so you can
  use the Minesweeper API from the console. For example:

  minesweeper.clear(0, 0);
  minesweeper.flagMineAtine(1, 2);

  You can also query the state:

  minesweeper.location(x, y);  // returns {hasMine: true/false, hasBeenSeen: true/false}

  NEXT: correct game status for losing and adding a way to query that status. Driven through tests.
  NEXT: tidy the visibleStatus thing. should be {status:flag/cleared, neighbours: N} with neighbours only set if cleared
*/

function Minesweeper(mineCoords) {
    "use strict";

    var self = $.observable(this),
        playerGrid = [],
        mines = [],
        gameStatus = "READY";

    self.clear = function(x, y) {
        var grid_index = self._grid_index_from_x_y(x, y);
        if (playerGrid[grid_index] === "default") {
            playerGrid[grid_index] = "cleared";

            self.trigger("cell_update", x, y, self.location(x, y));
            if (self._isMineAt(x, y)) {
                self._updateGameStatus("LOST");
            }
            else {
                self._updateGameStatus("INPROGRESS");
            }
        }
    };

    self.toggleFlagAt = function(x, y) {
        var grid_index = self._grid_index_from_x_y(x, y);
        if (playerGrid[grid_index] === "default") {
            playerGrid[grid_index] = "flag";
            self.trigger("cell_update", x, y, self.location(x, y));
        }
        else if (playerGrid[grid_index] === "flag") {
            playerGrid[grid_index] = "default";
            self.trigger("cell_update", x, y, self.location(x, y));
        }
    };

    self.location = function(x, y) {
        var gridIndex = self._grid_index_from_x_y(x, y),
            cell = playerGrid[gridIndex],
            visibleCellInfo = {
                isCleared: (cell === "cleared"),
                hasFlag: (cell === "flag"),
                neighbours: self._countNeighbouringMines(x, y)
            };
        return visibleCellInfo;
    };

    self.gameStatus = function() {
        return gameStatus;
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

    // TODO: move game status into its own little object?
    self._updateGameStatus = function(newStatus) {
        if (gameStatus !== newStatus) {
            gameStatus = newStatus;
            self.trigger("game_status_update", newStatus);
        }
    };

    self._isMineAt = function(x, y) {
        var foundMine = false;
        mines.forEach(function(mine) {
            if (mine.x() == x && mine.y() == y) {
                foundMine = true;
            }
        });
        return foundMine;
    };


    // Initialisation
    self._initPlayerGrid();
    self._initMines(mineCoords);
}