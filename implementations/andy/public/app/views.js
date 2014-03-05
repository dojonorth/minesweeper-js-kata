'use strict';

function MineMasterView() {
    this._click = new MineEvent(this);
    this._rightClick = new MineEvent(this);
}

MineMasterView.prototype = {
    initialise : function(x, y) {
        for (var i = 0; i < y; i++) {
            this.renderRow(i);
            for (var k = 0; k < x; k++) {
                this.renderTile(k, i);
            }
        }
    },

    renderRow : function(id) {
        var rowHtml = '<div class="row" id="row' + id + '" ></div>';
        $('#grid').append(rowHtml);
    },

    renderTile : function(tileId, rowId) {
        var row = $('#row' + rowId);

        var tileHtml = '<div class="tile" id="tile' + tileId + '" ></div>';
        row.append(tileHtml);

        var tile = $('#row' + rowId + ' #tile' + tileId);
        var that = this;

        tile.click(function() {
            that._click.notify({x : tileId, y : rowId});
            console.log('Left click ' + tileId + ' ' + rowId);
        });

        tile.contextmenu(function(e) {
            that._rightClick.notify({x : tileId, y : rowId});
            console.log('Right click ' + tileId + ' ' + rowId);
        });
    },

    flagTile : function(tileId, rowId) {
        var row = $('#row' + rowId + ' #tile' + tileId);
        var flagHtml = '<span class="flag"></span>';
        if (row.html() === flagHtml) {
            row.empty();
        } else {
            row.html(flagHtml);
        }
    },

    mineTile : function(tileId, rowId) {
        $('#row' + rowId + ' #tile' + tileId).html('<span class="mine"></span>');
    },

    clearTile : function(tileId, rowId, value) {
        $('#row' + rowId + ' #tile' + tileId).html('<span class="clear">' + value + '</span>');
    },

    attachClickEvent : function(behaviour) {
        this._click.attach(behaviour);
    },

    attachRightClickEvent : function(behaviour) {
        this._rightClick.attach(behaviour);
    }
};


function MineEvent(sender) {
    this._sender = sender;
    this._listeners = [];
}

MineEvent.prototype = {

    attach : function (listener) {
        this._listeners.push(listener);
    },

    notify : function (args) {
        var index;

        for (index = 0; index < this._listeners.length; index += 1) {
            this._listeners[index](this._sender, args);
        }
    }
};
