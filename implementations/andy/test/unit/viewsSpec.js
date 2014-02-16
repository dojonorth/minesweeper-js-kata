'use strict';

describe('MineMasterView', function() {

    var view;

    beforeEach(function() {
        setFixtures('<div id="grid"></div>');
        var model = {};
        view = new MineMasterView(model);
        view.initialise(11, 17);
    });

    it('should be able to initialise with x and y dimensions', function() {
        expect($('#row16 #tile10')).toBeInDOM();
    });

    it('should handle left clicks on tiles', function() {
        expect($('#row16 #tile10')).toHandle('click');
    });

    it('should handle right clicks on tiles', function() {
        expect($('#row16 #tile10')).toHandle('contextmenu');
    });

    it('should be able to toggle tile flags', function() {
        view.flagTile(4, 5);
        expect($('#row5 #tile4 .flag')).toBeInDOM();
        view.flagTile(4, 5);
        expect($('#row5 #tile4 .flag')).not.toBeInDOM();
    });

    it('should be able to display mines on tiles', function() {
        view.mineTile(4, 5);
        expect($('#row5 #tile4 .mine')).toBeInDOM();
    });

    it('should be able to clear tiles with a state', function() {
        view.clearTile(4, 5, '5');
        expect($('#row5 #tile4 .clear')).toBeInDOM();
        expect($('#row5 #tile4 .clear').text()).toBe('5');
    });

    it('should be able to attach left click behaviour', function() {
        var test = false;
        view.attachClickEvent(function(sender, args) {
            test = args.test;
        });
        view._click.notify({test : true})
        expect(test).toBe(true);
    });

    it('should be able to attach right click behaviour', function() {
        var test = false;
        view.attachRightClickEvent(function(sender, args) {
            test = args.test;
        });
        view._rightClick.notify({test : true})
        expect(test).toBe(true);
    });
});