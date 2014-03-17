// Creates a minefield from a supplied list of mine locations
function MinefieldList(width, height, coordList) {
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

    this._createMinesFrom = function(coords) {
        var mines = this._mines;
        coords.forEach(function(coord) {
            mines.push(new Mine(coord.x, coord.y));
        });
    };

    this._createMinesFrom(coordList);
}
