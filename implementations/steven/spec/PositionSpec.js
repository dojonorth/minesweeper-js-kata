describe('A Position in the game', function () {

    var xPos = 4;
    var yPos = 8;
    var position;

    beforeEach(function () {
        position = new Position(xPos, yPos);
    });

    it('is initialised with coordinates representing its place on the board', function () {
        expect(position.x).toEqual(xPos);
        expect(position.y).toEqual(yPos);
    });

    it('does not have an activated mine by default', function() {
        expect(position.hasActiveMine()).toBe(false);
    });

    it('can activate a mine', function () {
        position.activateMine();
        expect(position.hasActiveMine()).toBe(true);
    });

    it('is aware if an adjacent position has an active mine', function () {
        var adjacentPosition = new Position(xPos + 1, yPos);
        adjacentPosition.activateMine();
        position.addAdjacentPosition(adjacentPosition);
        expect(position.hasAdjacentMine()).toBe(true);
    });

    it('knows how many adjacent positions have an active mine', function () {
        // Given there are 2 adjacent positions
        var adjacentPosition1 = new Position();
        position.addAdjacentPosition(adjacentPosition1);
        
        var adjacentPosition2 = new Position();
        position.addAdjacentPosition(adjacentPosition2);

        // And one of them has an active mine
        adjacentPosition1.activateMine();

        // Then the position should accurately report 1 adjacent mine
        expect(position.getAdjacentMineCount()).toEqual(1);
    });

    describe('when uncovered', function () {
        it('can not be subsequently uncovered again', function () {
            pending();
        });

        it('will trigger an event to indicate it has been uncovered', function () {
            pending();
        });

        it('will trigger a mine found event if it has an actived mine', function () {
            pending();
        });

        it('will not uncover adjacent positions if one of those positions contains a mine', function () {
            pending();
        });
    });

});