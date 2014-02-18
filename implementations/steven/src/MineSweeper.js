// Note, when initialising the game, this code
// makes multiple passes, but it could be optimised
// by using recursion to create the first position
// and then create each adjacent position, and so on...
function MineSweeper(width, height, mineCount) {
    this.width = width;
    this.height = height;
    this.mineCount = mineCount;
    this.positions = [];

    // initialise the game board
    this.createPositions();

    // now lay some mines...
    this.layMines(); 

    // and finally, link each position to its direct neighbours
    this.linkAdjacentPositions();
}

// Given a pair of coordinates, reveal a Position.
// A mine at this position will signify game over!
MineSweeper.prototype.uncoverPosition = function(x, y) {
    // this could use recursion to reveal connected positions,
    // but as we've already done the work of linking adjacent
    // positions, we can let each position reveal itself, 
    // then attempt to reveal its neighbours.
    this.positions[x][y].uncover();
};

// Create the positions and track their coords in a map
// so they can be referenced later.
MineSweeper.prototype.createPositions = function() {
    for (var x = 0; x < this.width; x++) {
        if (this.positions[x] === undefined) {
            this.positions[x] = [];
        }

        for (var y = 0; y < this.height; y++) {
            this.positions[x][y] = new Position(x, y);
        }
    }
};

// Lay some mines by randomly selecting positions to activate. 
MineSweeper.prototype.layMines = function() {
    for (var i = 0; i < this.mineCount; i++) {
        var position;

        var findRandomPosition = function() {
            var randomX = Math.floor(Math.random() * this.width);
            var randomY = Math.floor(Math.random() * this.height);
            position = this.positions[randomX][randomY];
            if (position.hasActiveMine()) findRandomPosition();
        }.bind(this);

        findRandomPosition();
        position.activateMine();
    }
};

// The following could be optimised in so many ways... in particular,
// around the way we link. We could link both ways at once, and save 
// doing it later. This method links adjacent positions to one another
// so that when revealing a position, we can recursively cycle through
// all adjacent positions and so on (until we hit spaces that are 
// adjacent to a mined position).
MineSweeper.prototype.linkAdjacentPositions = function() {
    this.positions.forEach(function (line) {
        line.forEach(function (position) {
            console.log('Linking positions adjacent to: ' + position.x + ',' + position.y);
            
            // find positions surrounding this one
            for (var x = position.x - 1; x <= position.x + 1; x++) {
                for (var y = position.y - 1; y <= position.y + 1; y++) {
                    // only for positions within the boundary of the game
                    // board, not including the current position.
                    if (!(x === position.x && y === position.y) && 
                        x >= 0 && x < this.width && y >= 0 && y < this.height)
                    {
                        position.addAdjacentPosition(this.positions[x][y]);
                    }
                }
            }
        }.bind(this));
    }.bind(this));
};
