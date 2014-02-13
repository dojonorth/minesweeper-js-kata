describe("Minesquare", function() {

    it("should report if it contains a mine", function() {
        var mineSquare = new MineSquare(0, 0, true);

        expect(mineSquare.hasMine).toBe(true);
    });

    it("should report if it does not contain a mine", function() {
        var mineSquare = new MineSquare(0, 0, false);

        expect(mineSquare.hasMine).toBe(false);
    });

    it("should report the correct 8 neighbour coordinates for a non-edge location", function() {
        var mineSquare = new MineSquare(1, 1, true);

        var neighbours = mineSquare.neighbours(3, 3);

        expect(neighbours.length).toBe(8);

        expect(neighbours).toContain({x: 0, y: 0});
        expect(neighbours).toContain({x: 1, y: 0});
        expect(neighbours).toContain({x: 2, y: 0});
        expect(neighbours).toContain({x: 0, y: 1});
        expect(neighbours).toContain({x: 2, y: 1});
        expect(neighbours).toContain({x: 0, y: 2});
        expect(neighbours).toContain({x: 1, y: 2});
        expect(neighbours).toContain({x: 2, y: 2});
    });

    it("should report the correct 5 neighbour coordinates for an edge location", function() {
        var mineSquare = new MineSquare(0, 1, true);

        var neighbours = mineSquare.neighbours(3, 3);

        expect(neighbours.length).toBe(5);

        expect(neighbours).toContain({x: 0, y: 0});
        expect(neighbours).toContain({x: 1, y: 0});
        expect(neighbours).toContain({x: 1, y: 1});
        expect(neighbours).toContain({x: 1, y: 2});
        expect(neighbours).toContain({x: 0, y: 2});
    });

    it("should report the correct 3 neighbour coordinates for a corner location", function() {
        var mineSquare = new MineSquare(0, 2, true);

        var neighbours = mineSquare.neighbours(3, 3);

        expect(neighbours.length).toBe(3);

        expect(neighbours).toContain({x: 0, y: 1});
        expect(neighbours).toContain({x: 1, y: 1});
        expect(neighbours).toContain({x: 1, y: 2});
    });
});
