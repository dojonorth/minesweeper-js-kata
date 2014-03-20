describe('Minesweeper Kata', function () {

    var engine;

    it('should know is true', function () {
        expect(true).toBe(true);
    });

    beforeEach(function() {
        engine = create_engine();
    });

    it('should return an explosion if a mine cell is selected', function() {
        engine.set_mine(1,1);

        var result = engine.cell_selected(1,1)["1:1"];

        expect(result).toBe("mine");
    });

    it('should return zero if no neighbouring mines if cell selected', function() {
        engine.set_mine(1,1);

        var result = engine.cell_selected(3,3)["3:3"];

        expect(result).toBe(0);
    });

    it('should return number of neighbouring mines if cell selected', function() {
        engine.set_mine(1,1);
        engine.set_mine(2,3);

        var result = engine.cell_selected(2,2)["2:2"];

        expect(result).toBe(2);
    });

    it('should full the board with mines if init is called with enough mines', function() {
        engine.init(1,1,1);

        var result = engine.cell_selected(0,0)["0:0"];

        expect(result).toBe("mine");
    });

    it('should return the results of neighbouring cells if a cells with zero mines is chosen', function() {
        engine.set_board_width(3);
        engine.set_board_height(3);
        engine.set_mine(0,0);
        
        var result = engine.cell_selected(2,2);

        expect(result["2:2"]).toBe(0);
        expect(result["2:1"]).toBe(0);
        expect(result["2:0"]).toBe(0);
        expect(result["1:2"]).toBe(0);
        expect(result["0:2"]).toBe(0);
        expect(result["0:1"]).toBe(1);
        expect(result["1:0"]).toBe(1);
        expect(result["1:1"]).toBe(1);
    });

    
});
