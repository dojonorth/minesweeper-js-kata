describe("Mine", function() {
    var mine;

    beforeEach(function() {
        mine = new Mine(2, 3);
    });

    it("reports its location", function() {
        expect(mine.x()).toBe(2);
        expect(mine.y()).toBe(3);
    });

    it("reports that a coordinate is its neighbour", function() {
        expect(mine.isNeighbour(2, 4)).toBe(true);
        expect(mine.isNeighbour(1, 3)).toBe(true);
    });

    it("reports that a coordinate is not its neighbour", function() {
        expect(mine.isNeighbour(4, 3)).toBe(false);
        expect(mine.isNeighbour(-2, 3)).toBe(false);
    });

    it("reports that its own coordinate is not a neighbour", function() {
        expect(mine.isNeighbour(2, 3)).toBe(false);
    });
});
