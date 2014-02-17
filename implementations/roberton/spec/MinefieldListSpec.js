describe("MinefieldList", function() {

    it("has the correct size", function() {
        var minefield = new MinefieldList(2, 4, [{x:1, y:1}]);

        expect(minefield.size().width).toBe(2);
        expect(minefield.size().height).toBe(4);
    });

    it("has the correct mines", function() {
        var minefield = new MinefieldList(3, 3, [{x:1,y:0}, {x:0,y:2}]);

        expect(minefield.mines().length).toBe(2);
        expect(minefield.isMineAt(1, 0)).toBe(true);
        expect(minefield.isMineAt(0, 2)).toBe(true);
    });
});
