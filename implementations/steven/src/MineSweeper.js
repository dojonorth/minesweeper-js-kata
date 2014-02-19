
function MineSweeper(width, height, mineCount) {
    this.width = width;
    this.height = height;
    this.mineCount = parseInt(mineCount, 10);
    this.positions = [];
    this.flags = this.mineCount;

    // initialise the game board
    this.createPositions();

    // now lay some mines...
    this.layMines(); 

    // and finally, link each position to its direct neighbours
    this.linkAdjacentPositions();

    GameEventManager.addListener('mine-detonated', this.gameOver);
}

/* Trigger the game over event then clear all event listeners. */
MineSweeper.prototype.gameOver = function() {
    console.log('Game over!')
    GameEventManager.triggerEvent(new GameEvent('game-over'));
    GameEventManager.clearListeners();
};

/* Trigger the game completed event then clear all event listeners. */
MineSweeper.prototype.gameComplete = function() {
    console.log('Game completed!')
    GameEventManager.triggerEvent(new GameEvent('game-completed'));
    GameEventManager.clearListeners();
};

/* Flag the position for the given set of coordinates. If all flags
   are used, check if the game has been completed. */
MineSweeper.prototype.flagPosition = function(x, y) {
    if (this.flags > 0) {
        this.positions[x][y].flag();
        if (--this.flags === 0) {
            var count = 0;
            for (var xCoord = 0; xCoord < this.width; xCoord++) {
                for (var yCoord = 0; yCoord < this.height; yCoord++) {
                    if (this.positions[xCoord][yCoord].isFlagged() &&
                        this.positions[xCoord][yCoord].hasActiveMine()) 
                    {
                        count++;
                    }
                }
            }

            if (count === this.mineCount) {
                this.gameComplete();
            }
        }
    }
};

/* Remove the flag on the position for the given set of coordinates. */
MineSweeper.prototype.unflagPosition = function(x, y) {
    if (this.positions[x][y].isFlagged()) {
        this.positions[x][y].unflag();
        this.flags++;
    }
};

/* Reveal the position for the given set of coordinates. */
MineSweeper.prototype.uncoverPosition = function(x, y) {
    this.positions[x][y].uncover();
};

/* Create the positions and track their coords in a map
   so they can be referenced later. */
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

/* Lay some mines by randomly selecting positions to activate. */
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

/* The following could be optimised in so many ways... in particular,
   around the way we link. We could link both ways at once, and save 
   doing it later. This method links adjacent positions to one another
   so that when revealing a position, we can recursively cycle through
   all adjacent positions and so on (until we hit spaces that are 
   adjacent to a mined position). */
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
