describe('The MineSweeper game engine', function () {

    var width = 4;
    var height = 4;
    var mines = 5;
    var game;

    beforeEach(function () {
        game = new MineSweeper(width, height, mines);
    });

    describe('when creating positions', function () {
        it('will use the given dimensions to generate the correct number', function () {
            var actual = 0;

            game.positions.forEach(function (line) {
                actual += line.length;
            });
            
            expect(actual).toBe(width * height);
        });

        it('creates the positions with given x and y coordinates', function () {
            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    expect(game.positions[x][y].x).toEqual(x);
                    expect(game.positions[x][y].y).toEqual(y);
                }
            }
        });

        it('links each position with its direct neighbouring positions', function () {
            game.positions.forEach(function (line) {
                line.forEach(function (position) {
                    // no position has 0 adjacent positions
                    expect(position.adjacentPositions.length).toBeGreaterThan(0);

                    // and two adjacent positions should both reference each other
                    position.adjacentPositions.forEach(function (adjacentPosition) {
                        // so every adjacent position should reference the position in its
                        // own 'adjacentPositions' list... 
                        expect(adjacentPosition.adjacentPositions).toContain(position);
                    });
                });
            });
        });

        it('activates the given number of mines in the game', function () {
            var actual = 0;

            game.positions.forEach(function (line) {
                line.forEach(function (position) {
                    if (position.hasActiveMine()) {
                        actual++;
                    }
                });
            });

            expect(actual).toEqual(mines);
            pending();
        });

        it('places the mines at random positions', function () {
            pending();
        });
    });

    describe('when uncovering a position', function () {
        it('uncover only the selected position if adjacent to a position containing a mine', function () {
            pending();
        });

        it('uncover all adjacent positions up to positions that are adjacent to one or more mines', function () {
            pending();
        });

        it('all positions will be uncovered if there are no mines on the board', function () {
            var width = 4;
            var height = 4;
            var mines = 0;
            
            var game = new MineSweeper(width, height, mines);
            var actual = 0;

            GameEventManager.addListener('position-uncovered', function () { actual++; });
            game.positions[0][0].uncover();
            expect(actual).toEqual(width * height);
        });
    });

});