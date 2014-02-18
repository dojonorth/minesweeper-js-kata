
/**
 * Known event types and args that clients can attach listeners to:
 *   position-uncovered
 *   mine-detonated
 *   
 */

function GameEvent(type, position) {
    this.type = type;
    this.position = position;
}

// Create a singleton game event manager.
var GameEventManager = {

    callbacks: {},

    addListener: function (type, callback) {
        console.log('Adding event type: ' + type);

        if (GameEventManager.callbacks[type] === undefined) {
            GameEventManager.callbacks[type] = [];
        }

        GameEventManager.callbacks[type].push(callback);
    },

    triggerEvent: function (event) {
        if (!(event instanceof GameEvent)) {
            throw new TypeError('Given param must be of type: GameEvent');
        }

        if (GameEventManager.callbacks.hasOwnProperty(event.type)) {
            GameEventManager.callbacks[event.type].forEach(function (callback) {
                callback(event);
            });
        }
    }
};