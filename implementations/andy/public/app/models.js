'use strict';

function Game(x, y, boardState) {
    this._state = 'OK';
    this._grid = new Grid(x, y, boardState);
}

Game.prototype = {
    getState : function() {
        return this._state;
    },

    getGrid : function() {
        return this._grid;
    },

    flagTile : function(x, y) {
        this._grid.flagTile(x, y);
    },

    visitTile : function(x, y) {
        this._grid.visitTile(x, y);
    },

    attachTileChangeEvent : function(behaviour) {
        this._grid.attachTileChangeEvent(behaviour);
    }
};


function Grid(x, y, boardState) {
    this._rows = [];
    this._neighbourPositions = [
        {x : -1, y : -1},
        {x : 0, y : -1},
        {x : 1, y : -1},
        {x : -1, y : 0},
        {x : 1, y : 0},
        {x : -1, y : 1},
        {x : 0, y : 1},
        {x : 1, y : 1}
    ];
    this._tileChange = new MineEvent(this);
    this.initialise(x, y, boardState);
}

Grid.prototype = {

    initialise : function(x, y, boardState) {
        for (var i = 0; i < y; i++) {
            var row = [];
            for (var k = 0; k < x; k++) {
                var state = '';
                if (boardState) {
                    state = boardState[i][k];
                }
                row.push(new Tile(state));
            }
            this._rows.push(row);
        }
    },

    getTile : function(x, y) {
        var row = this._rows[y];
        if (row) {
            return row[x];
        }
        return false;
    },

    flagTile : function(x, y) {
        this.getTile(x, y).toggleFlag();
        this._tileChange.notify(
            {x : x, y : y, state : 'FLAGGED'}
        );
    },

    visitTile : function(x, y) {
        var tile = this.getTile(x, y);
        if (tile) {
            tile.visit();
            var state = tile.getType();
            if (state === 'CLEAR') {
                state = this.countTilesMinedNeighbours(x, y);
                if (state === 0) {
                    this.visitIsolatedNeighbours(x, y);
                }
            }
            this._tileChange.notify(
                {x : x, y : y, state : state}
            );
        }

    },

    countTilesMinedNeighbours : function(x, y) {
        var count = 0;
        var grid = this;
        this._neighbourPositions.forEach(function(offset) {
            var neighbour = grid.getTile(x + offset.x, y + offset.y);
            if (neighbour && neighbour.getType() === 'MINE') {
                count++;
            };
        });
        return count;
    },

    visitIsolatedNeighbours : function(x, y) {
        var grid = this;
        this._neighbourPositions.forEach(function(offset) {
            var neighbour = grid.getTile(x + offset.x, y + offset.y);
            if (neighbour && !neighbour.isVisited() && !neighbour.isFlagged() && neighbour.getType() === 'CLEAR') {
                if (grid.countTilesMinedNeighbours(x + offset.x, y + offset.y) === 0) {
                    grid.visitTile(x + offset.x, y + offset.y);
                }
            };
        });
    },

    attachTileChangeEvent : function(behaviour) {
        this._tileChange.attach(behaviour);
    }
};


function Tile(state) {
    this._type = state;
    this._visited = false;
    this._flagged = false;
}


Tile.prototype = {

    getType : function() {
        return this._type;
    },

    visit : function() {
        this._visited = true;
    },

    isVisited : function() {
        return this._visited;
    },

    toggleFlag : function() {
        this._flagged = !this._flagged;
    },

    isFlagged : function() {
        return this._flagged;
    }
};


function BoardState(x, y, mines) {
    var tiles = [];
    var weighting = 0;

    if (mines > 0) {
        weighting = mines / (x * y);
    }

    for (var i = 0; i < y; i++) {
        var row = [];
        for (var k = 0; k < x; k++) {
            if (Math.random() <= weighting) {
                row.push('MINE');
            } else {
                row.push('CLEAR');
            }
        }
        tiles.push(row);
    }
    return tiles;
}
