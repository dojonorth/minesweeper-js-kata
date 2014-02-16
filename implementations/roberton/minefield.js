function Minefield() {
    "use strict";

    this._mines = [];
    this._width = null;
    this._height = null;
    this._mineCoords = [];  // temporarily used if setMineList is used
    
    this.setSize = function(width, height) {
        this._width = width;
        this._height = height;
        return this;
    };

    this.setMineCount = function(count) {
        this._minesToBePlaced = count;
        return this;
    };

    this.setMineList = function(mineCoords) {
        this._mineCoords = mineCoords;
        return this;
    };

    this.build = function() {
        if (this._minesToBePlaced) {
            this._placeRandomMines();
        }
        else {
            this._placeMinesFromList();
        }
        if (this._isOk()) {
            return this;
        }
    };

    this.size = function() {
        return {width: this._width, height: this._height};
    };

    this.mines = function() {
        return this._mines.slice(0); // safer to return a copy
    };

    this._isOk = function() {
        return (this._width && this._height && this._mines.length && !this._minesToBePlaced);
    };

    //TODO: Make this function better, it is awful
    this._placeMinesFromList = function() {
        var i, mineCoord;

        for (var i = 0; i < this._mineCoords.length; i++) {
            mineCoord = this._mineCoords[i];
            if (mineCoord.x < 0 || mineCoord.x >= this._width) {
                this._mines = [];
                return;
            }
            if (mineCoord.y < 0 || mineCoord.y >= this._height) {
                this._mines = [];
                return;
            }
            this._mines.push(new Mine(mineCoord.x, mineCoord.y));
        }
    };

    this._placeRandomMines = function() {
        while (this._minesToBePlaced) {
            var newCoords = this._pickCoordsForNewMine();
            if (!newCoords) {
                return; // if can't find a place for a new mine, abort
            }
            this._mines.push(new Mine(newCoords.x, newCoords.y));
            this._minesToBePlaced--;
        }
    };

    //TODO: Make this function better, it is awful
    this._pickCoordsForNewMine = function() {
        var x, y;
        for (var attempts = 0; attempts < 10; attempts++) {
            x = Math.floor(Math.random() * this._width);
            y = Math.floor(Math.random() * this._height);
            if (!this._isMineAt(x, y)) {
                return {x: x, y: y};
            }
        }
    }

    this._isMineAt = function(x, y) {
        var foundMine = false;
        this._mines.forEach(function(mine) {
            if (mine.x() === x && mine.y() === y) {
                foundMine = true;
            }
        });
        return foundMine;
    }
}
