'use strict';

describe('Model: Tile', function() {

    var tile;

    beforeEach(function() {
        tile = new Tile('CLEAR');
    });

    it('should store type', function() {
        expect(tile.getType()).toBe('CLEAR');
    });

    it('should be visitable', function() {
        expect(tile.isVisited()).toBe(false);
        tile.visit();
        expect(tile.isVisited()).toBe(true);
    });

    it('should be flaggable', function() {
        expect(tile.isFlagged()).toBe(false);
        tile.toggleFlag();
        expect(tile.isFlagged()).toBe(true);
    });
});

describe('Model: Grid', function() {

    var grid;
    var tileChangeTriggered;
    var boardState = [['CLEAR', 'CLEAR', 'CLEAR'], ['CLEAR', 'CLEAR', 'CLEAR'], ['CLEAR', 'CLEAR', 'MINE']];

    beforeEach(function() {
        grid = new Grid();
        tileChangeTriggered = '';
        grid.attachTileChangeEvent(function(sender, args) {
            tileChangeTriggered = args.state;
        });
        grid.initialise(3, 3, boardState);
    });

    it('should be initialised with dimensions of', function() {
        expect(grid.getTile(2, 2)).not.toBe(undefined);
    });

    it('should return false if invalid tile', function() {
        expect(grid.getTile(0, -1)).toBe(false);
    });

    it('should accept board state', function() {
        expect(grid.getTile(2, 2).getType()).toBe('MINE');
    });

    it('should be able to count a tiles mined neighbours', function() {
        expect(grid.countTilesMinedNeighbours(1, 2)).toBe(1);
    });

    it('should be able to attach grid change behaviour', function() {
        grid._tileChange.notify({state : 'TEST'})
        expect(tileChangeTriggered).toBe('TEST');
    });

    it('should be able to flag tiles', function() {
        grid.flagTile(0, 0);
        expect(grid.getTile(0, 0).isFlagged()).toBe(true);
        expect(tileChangeTriggered).toBe('FLAGGED');
    });

    it('should be able to visit tiles', function() {
        grid.visitTile(1, 2);
        expect(grid.getTile(1, 2).isVisited()).toBe(true);
    });

    it('should return tile type when visited and not clear', function() {
        grid.visitTile(2, 2);
        expect(tileChangeTriggered).toBe('MINE');
    });

    it('should return number of mined neighbours when clear', function() {
        grid.visitTile(2, 1);
        expect(tileChangeTriggered).toBe(1);
    });

    it('should visit isolated neighbours when neighbours have no mines nearby', function() {
        grid.visitTile(0, 0);
        expect(grid.getTile(1, 0).isVisited()).toBe(true);
    });

    it('should visit isolated neighbours numbered neighbour', function() {
        //pending
    });

    it('should not auto-visit flagged tiles', function() {
        grid.flagTile(1, 0);
        grid.visitTile(0, 0);
        expect(grid.getTile(1, 0).isVisited()).toBe(false);
    });
});

describe('Model: Game', function() {

    var game;

    beforeEach(function() {
        game = new Game(7, 15);
    });

    it('should initialise the grid correctly', function() {
        expect(game.getGrid().getTile(6, 14)).not.toBe(undefined);
    });

    it('should initialise with OK state', function() {
        expect(game.getState()).toBe('OK');
    });

    it('should flag tiles', function() {
        game.flagTile(1, 1);
        expect(game.getGrid().getTile(1, 1).isFlagged()).toBe(true);
    });

    it('should visit tiles', function() {
        game.visitTile(1, 1);
        expect(game.getGrid().getTile(1, 1).isVisited()).toBe(true);
    });

    it('should be in LOSE state when mine is visited', function() {
        //pending
    });

    it('should be in WIN state when board is solved', function() {
        //pending
    });
});