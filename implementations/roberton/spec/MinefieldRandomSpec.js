describe("MinefieldRandom", function() {

    it("has the correct size", function() {
        var minefield = new MinefieldRandom(2, 4, [{x:1, y:1}]);

        expect(minefield.size().width).toBe(2);
        expect(minefield.size().height).toBe(4);
    });

    it("has the correct number of mines", function() {
        var minefield = new MinefieldRandom(3, 3, 3);

        expect(minefield.mines().length).toBe(3);
    });

    it("does not create two mines in the same location", function() {
        var minefield = new MinefieldRandom(3, 3, 3);
        var mine1 = minefield.mines()[0];
        var mine2 = minefield.mines()[1];
        var mine3 = minefield.mines()[2];

        expect(mine1.x() === mine2.x() && mine1.y() === mine2.y()).toBe(false);
        expect(mine1.x() === mine3.x() && mine1.y() === mine3.y()).toBe(false);
        expect(mine2.x() === mine3.x() && mine2.y() === mine3.y()).toBe(false);
    });
});
