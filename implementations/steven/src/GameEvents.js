
/* Known event types that clients can attach listeners to:
     position-uncovered
     mine-detonated
     game-over
     game-completed    */
function GameEvent(type, target) {
    this.type = type;
    this.target = target;
}

// Create a singleton game event manager.
var GameEventManager = {

    callbacks: {},

    clearListeners: function () {
        GameEventManager.callbacks = {};
    },

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