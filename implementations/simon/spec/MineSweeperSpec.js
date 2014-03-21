describe('Minesweeper Kata', function () {

	it('calling sweep on an empty grid returns grid with correct result', function() {
        var grid = makeGrid('.');
        console.log(grid);
        grid.sweep(0, 0);
        expect(grid.toString()).toEqual([[0]]);
	});

    it('sweep on grid with mine next to bottom right cell returns correct result', function() {
        var grid = makeGrid('**|*.');
        grid.sweep(1, 1);
        expect(grid.toString()).toEqual([[true, true], [true, 3]]);
    });

    it('sweep on grid with mine next to cell returns correct result', function() {
        var grid = makeGrid('.*|..');
        grid.sweep(0, 0);
        expect(grid.toString()).toEqual([[1, true], [false, false]]);
    });

    it('sweep on mine returns invalid board', function() {
        var grid = makeGrid('*');
        grid.sweep(0, 0);
        expect(grid.getState()).toEqual('lost');
    })

    it('flag on mine returns board with mine', function() {
        var grid = makeGrid('.');
        grid.flag(0,0);
        expect(grid.toString()).toEqual([['flagged']]);
    });

    it('sweep on clear space returns valid board', function() {
        var grid = makeGrid(".*|..");
        grid.sweep(0, 0);
        expect(grid.getState()).toEqual('playing');
    });

    it('sweeping works recursively', function() {
        var grid = makeGrid("...|...|..*");
        grid.sweep(0, 0);
        expect(grid.toString()).toEqual([[0, 0, 0], [0, 1, 1], [0, 1, true]]);
    });

    it('sweeping works for non-corner blocks', function() {
        var grid = makeGrid(".*.|...|...");
        grid.sweep(1, 2);
        expect(grid.toString()).toEqual([[false, true, false], [1, 1, 1], [0, 0, 0]]);

    })

    function makeGrid(gridString) {
        var gridArray = [];
        gridString.split("|").forEach(function(row) {
            var rowArr = [];
            row.split('').forEach(function(col) {
                rowArr.push(col === '*' ? true : false);
            });
            gridArray.push(rowArr);
        });
        console.log(gridArray)
        return new Grid(gridArray);
    }
});