describe("Minefield", function() {
    var mine;

    describe("Building", function() {
        it("does not allow minefield without any mines to be built", function() {
            var minefield = new Minefield().setSize(3, 3).build();

            expect(minefield).not.toBeDefined();
        });

        it("does not allow minefield without a size to be built", function() {
            var minefield = new Minefield().setMineCount(1).build();

            expect(minefield).not.toBeDefined();
        });

        it("allows minefield with size and number of mines to be built", function() {
            var minefield = new Minefield().setSize(3,3).setMineCount(2).build();

            expect(minefield).toBeDefined();
        });

        it("allows minefield with size and list of mines to be built", function() {
            var minefield = new Minefield().setSize(3,3).setMineList([{x:1,y:0},{x:2,y:2}]).build();

            expect(minefield).toBeDefined();
        });

        it("does not allow minefield to be created with more mines than locations", function() {
            var minefield = new Minefield().setSize(2,2).setMineCount(5).build();

            expect(minefield).not.toBeDefined();
        });

        it("does not allow minefield to be created with mines outside the minefield's bounds", function() {
            var minefield = new Minefield().setSize(3,3)
                                .setMineList([{x:3, y:2}])
                                .build();

            expect(minefield).not.toBeDefined();
        });
    });

    describe("Size", function() {
        it("has the correct size", function() {
            var minefield = new Minefield().setSize(2,4).setMineCount(1).build();

            expect(minefield.size().width).toBe(2);
            expect(minefield.size().height).toBe(4);
        });

        it("has the correct mines when built using list of mines", function() {
            var minefield = new Minefield().setSize(3,3).setMineList([{x:1,y:0}]).build(),
                mine = minefield.mines()[0];

            expect(mine.x()).toBe(1);
            expect(mine.y()).toBe(0);
        });

        it("has the correct number of mines when built using mine count", function() {
            var minefield = new Minefield().setSize(3,3).setMineCount(3).build();

            expect(minefield.mines().length).toBe(3);
        });

        xit("lays mines at different locations when built using mine count", function() {
            var minefield = new Minefield().setSize(3,3).setMineCount(3).build(),
                mine1 = minefield.mines()[0],
                mine2 = minefield.mines()[1],
                mine3 = minefield.mines()[2];

            expect(mine1.x() === mine2.x() && mine1.x() === mine2.y()).toBe(false);
            expect(mine1.x() === mine3.x() && mine1.x() === mine3.y()).toBe(false);
            expect(mine2.x() === mine3.x() && mine2.x() === mine3.y()).toBe(false);
        });
    });
});
