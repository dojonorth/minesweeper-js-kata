// Creates a minefield from a supplied list of mine locations
function MinefieldRandom(width, height, mineCount) {
    "use strict";

    this._width = width;
    this._height = height;
    this._mines = [];

    this.size = function() {
        return {width: this._width, height: this._height};
    };

    this.mines = function() {
        return this._mines.slice(0); // safer to return a copy
    };

    this.isMineAt = function(x, y) {
        var foundMine = false;
        this._mines.forEach(function(mine) {
            if (mine.x() === x && mine.y() === y) {
                foundMine = true;
            }
        });
        return foundMine;
    };

    this._createMines = function(mineCount) {
        var listOfCoords = this._makeListOfCoords();
        for (var i = 0; i < mineCount; i++) {
            var nextMineCoordIndex = Math.floor(Math.random() * listOfCoords.length);
            var nextMineCoord = listOfCoords[nextMineCoordIndex];
            this._mines.push(new Mine(nextMineCoord.x, nextMineCoord.y));
            listOfCoords[nextMineCoordIndex] = listOfCoords[0];
            listOfCoords.shift();
        }
    };

    this._makeListOfCoords = function() {
        var coords = [];
        for (var x = 0; x < this._width; x++) {
            for (var y = 0; y < this._height; y++) {
                coords.push({"x": x, "y": y});
            }
        }
        return coords;
    };

    this._createMines(mineCount);
}
