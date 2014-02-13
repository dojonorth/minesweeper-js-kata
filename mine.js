function Mine(x, y) {
    this._x = x;
    this._y = y;

    this.x = function() {
        return this._x;
    };

    this.y = function() {
        return this._y;
    };

    this.isNeighbour = function(x, y) {
        if (x === this._x && y === this._y) {
            return false; // it is not its own neighbours
        }
        if ((Math.abs(x - this._x) <= 1) &&
            (Math.abs(y - this._y) <= 1)) {
            return true;
        }
        return false;
    };
}
