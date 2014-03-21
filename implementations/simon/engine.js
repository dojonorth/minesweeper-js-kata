function Grid(initialGrid) {
    this.grid = initialGrid;
    this.state = 'playing';
}

Grid.prototype.toString = function() {
    return this.grid;
};

Grid.prototype.getCell = function(x, y) {
    return this.grid[y][x];
};

Grid.prototype.setCell = function(x, y, value) {
    return this.grid[y][x] = value;
};

Grid.prototype.sweep = function(x, y) {
    if (this.getCell(x, y)) {
        this.state = 'lost';
        this.setCell(x, y, 'boom');
    } else {
        this.setCell(x, y, getNeighbouringBombs.call(this, x, y));
        if (this.getCell(x, y) === 0) {
            getNeighbours.call(this, x, y).forEach(function(neighbour) {
                var currentNeighbour = this.getCell(neighbour[0], neighbour[1]);
                if (currentNeighbour === false) {
                    this.sweep(neighbour[0], neighbour[1]);
                }
            }, this)
        }
    }
};

Grid.prototype.flag = function(x, y) {
    this.setCell(y, x, 'flagged');
};

Grid.prototype.getState = function() {
    return this.state;
}

function getNeighbouringBombs(x, y) {
    var neighbours = getNeighbours.call(this, x, y);
    var bombs = 0;

    neighbours.forEach(function(neighbour) {
        bombs += this.getCell(neighbour[0], neighbour[1]) === true ? 1 : 0;
    }, this);

    return bombs;
}

function getNeighbours(x, y) {
    var neighbours = [];
    for (var i = x-1; i <= x+1; i++) {
        if (i >= 0 && i < this.grid.length) {
            for (var j = y-1; j <= y+1; j++) {
                if (j >= 0 && j < this.grid[0].length && ([x, y].toString() != [i, j].toString())) {
                    neighbours.push([i,j]);
                }
            }
        }
    }
    return neighbours;
}