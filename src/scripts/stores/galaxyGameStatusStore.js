import AppDispatcher from '../dispatcher.jsx';
import { EventEmitter } from 'events';
import assign from 'object-assign';

var gameStatus = {
    totalBots: 0,
    botsKilled: 0,
    score: 0
};

var GalaxyGameStatusStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },

    getStatus: function() {
        return gameStatus;
    }
});

AppDispatcher.register(function(action) {

    switch(action.actionType) {
        case 'BOT_KILLED':
            GalaxyGameStatus.botsKilled += 1;
            GalaxyGameStatus.emitChange();
            break;
        default:
    }
});

export default GalaxyGameStatusStore;
