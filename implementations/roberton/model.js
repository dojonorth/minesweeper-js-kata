
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

function Minesweeper(minefield) {
    "use strict";

    var self = $.observable(this),
        _minefield = minefield,
        _gridSize = _minefield.size().width * _minefield.size().height,
        playerGrid = [],
        gameStatus = "READY";


    // Private functions
    /////////////////////////////////////////////////////////

    self.clear = function(x, y) {
        var grid_index = self._grid_index_from_x_y(x, y);
        if (playerGrid[grid_index] === "default") {
            playerGrid[grid_index] = "cleared";

            self.trigger("cell_update", x, y, [self.location(x, y)]);
            if (_minefield.isMineAt(x, y)) {
                self._updateGameStatus("LOST");
            }
            else {
                self._updateGameStatus("INPROGRESS");
                self._checkIfWonGame();
            }
        }
    };

    self.toggleFlagAt = function(x, y) {
        var grid_index = self._grid_index_from_x_y(x, y);
        if (playerGrid[grid_index] === "default") {
            playerGrid[grid_index] = "flag";
            self.trigger("cell_update", x, y, [self.location(x, y)]);
            self._checkIfWonGame();
        }
        else if (playerGrid[grid_index] === "flag") {
            playerGrid[grid_index] = "default";
            self.trigger("cell_update", x, y, [self.location(x, y)]);
        }
    };

    self.location = function(x, y) {
        var gridIndex = self._grid_index_from_x_y(x, y),
            cell = playerGrid[gridIndex],
            visibleCellInfo = {
                isCleared: (cell === "cleared"),
                hasFlag: (cell === "flag")
            };
        if (cell === "cleared") {
            visibleCellInfo.neighbours = self._countNeighbouringMines(x, y)
        }
        return visibleCellInfo;
    };

    self.gameStatus = function() {
        return gameStatus;
    };


    // Private functions
    /////////////////////////////////////////////////////////

    self._initPlayerGrid = function() {
        for (var i = 0; i < _gridSize; i++) {
            playerGrid.push("default");
        }
    };

    self._grid_index_from_x_y = function(x, y) {
        return x + _minefield.size().width * y;
    };

    self._countNeighbouringMines = function(x, y) {
        var count = 0;
        _minefield.mines().forEach(function(mine) {
            if (mine.isNeighbour(x, y)) {
                count++;
            }
        });
        return count;
    };

    self._updateGameStatus = function(newStatus) {
        if (gameStatus !== newStatus) {
            gameStatus = newStatus;
            self.trigger("game_status_update", newStatus);
        }
    };

    self._checkIfWonGame = function() {
        var numberOfClearedAndFlaggedLocations = 0;
        for (var i = 0; i < _gridSize; i++) {
            if (playerGrid[i] !== "default") {
                numberOfClearedAndFlaggedLocations++;
            }
        }
        if (_gridSize === numberOfClearedAndFlaggedLocations) {
            self._updateGameStatus("WON");
        }
    };

    // Initialise
    /////////////////////////////////////////////////////////

    self._initPlayerGrid();
}