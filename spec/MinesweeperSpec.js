/*
TODO: Figure out how to test the events from the model.
Can then add tests for game status (for example).
*/

describe("Minesweeper", function() {
  var minesweeper;

  beforeEach(function() {
    minesweeper = new Minesweeper('[{"x":1,"y":1},{"x":1,"y":3},{"x":3,"y":3}]');
  });

  it("should report if a flag has been set at a position", function() {
    expect(minesweeper.cellAt(1, 0).hasFlag).toBe(false);
    expect(minesweeper.cellAt(2, 2).hasFlag).toBe(false);

    minesweeper.flagMineAt(1, 0);
    expect(minesweeper.cellAt(1, 0).hasFlag).toBe(true);

    minesweeper.flagMineAt(2, 2);
    expect(minesweeper.cellAt(2, 2).hasFlag).toBe(true);
  });

  it("should report if a position has been cleared", function() {
    expect(minesweeper.cellAt(2, 0).isCleared).toBe(false);
    expect(minesweeper.cellAt(0, 2).isCleared).toBe(false);

    minesweeper.clear(2, 0);
    expect(minesweeper.cellAt(2, 0).isCleared).toBe(true);

    minesweeper.clear(0, 2);
    expect(minesweeper.cellAt(0, 2).isCleared).toBe(true);
  });

  it("should report there are no neighbouring mines when a cell is cleared which has no neighbouring mines", function() {
    minesweeper.clear(4, 0);
    expect(minesweeper.cellAt(4, 0).neighbours).toBe(0);
  });

  it("should report there is 1 neighbouring mine when a cell is cleared which has 1 neighbouring mine", function() {
    minesweeper.clear(0, 0);
    expect(minesweeper.cellAt(0, 0).neighbours).toBe(1);
  });

  it("should report there are 2 neighbouring mine when a cell is cleared which has 2 neighbouring mines", function() {
    minesweeper.clear(1, 2);
    expect(minesweeper.cellAt(1, 2).neighbours).toBe(2);
  });

  it("should report there are 3 neighbouring mine when a cell is cleared which has 3 neighbouring mines", function() {
    minesweeper.clear(2, 2);
    expect(minesweeper.cellAt(2, 2).neighbours).toBe(3);
  });
});
