/*
TODO: Figure out how to test the events from the model.
Can then add tests for game status (for example).
*/

describe("Model", function() {
    var minesweeper;
    var minefield;

    locationInfoWithNeighbours = function(numOfNeighbours) {
        return {
            isCleared: true,
            hasFlag: false,
            neighbours: numOfNeighbours
        };
    };

    beforeEach(function() {
        minefield = new MinefieldList(5, 5, [{"x":1,"y":1},{"x":1,"y":3},{"x":3,"y":3}]);
        minesweeper = new Model(minefield);
    });

    describe("flag behaviour", function() {
        it("reports a flag has not been set at a position", function() {
            expect(minesweeper.location(1, 0).hasFlag).toBe(false);
        });

        it("reports a flag has been set at a position", function() {
            minesweeper.toggleFlagAt(1, 0);

            expect(minesweeper.location(1, 0).hasFlag).toBe(true);
        });

        it("reports a flag has not been set at a position when the flag has been toggled", function() {
            minesweeper.toggleFlagAt(1, 0);
            minesweeper.toggleFlagAt(1, 0);

            expect(minesweeper.location(1, 0).hasFlag).toBe(false);
        });

        it("does not allow a flag to be set if the location has been cleared", function() {
            minesweeper.clear(1, 0);
            minesweeper.toggleFlagAt(1, 0);

            expect(minesweeper.location(1, 0).hasFlag).toBe(false);
            expect(minesweeper.location(1, 0).isCleared).toBe(true);
        });

        it("does not report the number of neighbours", function() {
            minesweeper.toggleFlagAt(1, 0);

            expect(minesweeper.location(1, 0).neighbours).not.toBeDefined();
        });
    });

    describe("when clearing a location", function() {

        beforeEach(function() {
            spyOn(minesweeper, "trigger").and.callThrough();
        });

        it("reports there are no neighbouring mines when the location has no neighbouring mines", function() {
            minesweeper.clear(4, 0);

            expect(minesweeper.trigger.calls.first().args).toEqual(
                ["cell_update", 4, 0, [locationInfoWithNeighbours(0)]]);
        });

        it("reports there is 1 neighbouring mine when the location has 1 neighbouring mine", function() {
            minesweeper.clear(0, 0);

            expect(minesweeper.trigger.calls.first().args).toEqual(
                ["cell_update", 0, 0, [locationInfoWithNeighbours(1)]]);
        });

        it("reports there are 2 neighbouring mine when a location has 2 neighbouring mines", function() {
            minesweeper.clear(1, 2);

            expect(minesweeper.trigger.calls.first().args).toEqual(
                ["cell_update", 1, 2, [locationInfoWithNeighbours(2)]]);
        });

        it("reports there are 3 neighbouring mine when a location has 3 neighbouring mines", function() {
            minesweeper.clear(2, 2);

            expect(minesweeper.trigger.calls.first().args).toEqual(
                ["cell_update", 2, 2, [locationInfoWithNeighbours(3)]]);
        });

        it("does not allow a location to be cleared if a flag has been set", function() {
            minesweeper.toggleFlagAt(1, 0);
            minesweeper.clear(1, 0);

            expect(minesweeper.location(1, 0).hasFlag).toBe(true);
            expect(minesweeper.location(1, 0).isCleared).toBe(false);
        });
    });

    describe("game state behaviour", function() {
        beforeEach(function() {
            minefield = new MinefieldList(2, 2, [{"x":1,"y":1}]);
            minesweeper = new Model(minefield);
        });

        it("initially reports game as being ready to play", function() {
            expect(minesweeper.gameStatus()).toBe("READY");
        });

        it("after clearing an empty location then reports game as being in progress", function() {
            minesweeper.clear(1, 0);

            expect(minesweeper.gameStatus()).toBe("INPROGRESS");
        });

        it("after clearing a location with a mine then reports game as lost", function() {
            minesweeper.clear(1, 1);

            expect(minesweeper.gameStatus()).toBe("LOST");
        });

        it("after clearing all locations apart from those with mines and then flagging the mine location then reports game as won", function() {
            minesweeper.clear(0, 0);
            minesweeper.clear(0, 1);
            minesweeper.clear(1, 0);
            minesweeper.toggleFlagAt(1, 1);

            expect(minesweeper.gameStatus()).toBe("WON");
        });

        it("after flagging the location and then clearing all the other locations then reports game as won", function() {
            minesweeper.toggleFlagAt(1, 1);
            minesweeper.clear(0, 0);
            minesweeper.clear(0, 1);
            minesweeper.clear(1, 0);

            expect(minesweeper.gameStatus()).toBe("WON");
        });
    });
});
