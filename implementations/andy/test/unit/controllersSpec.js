'use strict';

describe('MineMasterController', function() {

    var modelMock = jasmine.createSpyObj(
        'MockModel', ['getGrid', 'visitTile', 'flagTile', 'attachTileChangeEvent']
    );
    var viewMock = jasmine.createSpyObj(
        'MockView', ['attachClickEvent', 'attachRightClickEvent', 'initialise', 'flagTile']
    );
    var controller;

    beforeEach(function() {
        controller = new MineMasterController(modelMock, viewMock);
        controller.initialise(4, 4);
    });

    it('should register click events', function() {
        expect(viewMock.attachClickEvent).toHaveBeenCalled();
    });

    it('should register right click events', function() {
        expect(viewMock.attachRightClickEvent).toHaveBeenCalled();
    });

    it('should register tile change events', function() {
        expect(modelMock.attachTileChangeEvent).toHaveBeenCalled();
    });

    it('should initialise the view', function() {
        expect(viewMock.initialise).toHaveBeenCalled();
    });

    it('should have event function to visit tiles in the grid', function() {
        controller.visit(1, 1);
        expect(modelMock.visitTile).toHaveBeenCalled();
    });

    it('should have event function to flag tiles in the grid', function() {
        controller.toggleFlag(1, 1);
        expect(modelMock.flagTile).toHaveBeenCalled();
    });

});