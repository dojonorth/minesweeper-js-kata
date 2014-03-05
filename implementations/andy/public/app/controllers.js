
function MineMasterController(model, view) {
    this._model = model;
    this._view = view;

    var _this = this;

    this._view.attachClickEvent(function (sender, args) {
        _this.visit(args.x, args.y);
    });

    this._view.attachRightClickEvent(function (sender, args) {
        _this.toggleFlag(args.x, args.y);
    });

    this._model.attachTileChangeEvent(function (sender, args) {
        _this.processStatusChange(args.x, args.y, args.state);
    });
}

MineMasterController.prototype = {
    initialise : function(x, y) {
        this._view.initialise(x, y);
    },

    visit : function (x, y) {
        this._model.visitTile(x, y);
    },

    toggleFlag : function (x, y) {
        this._model.flagTile(x, y);
    },

    processStatusChange : function (x, y, status) {
        if (status == 'MINE') {
            this._view.mineTile(x, y);
        } else if (status === 'FLAGGED') {
            this._view.flagTile(x, y);
        } else {
            this._view.clearTile(x, y, status);
        }
    }
};