import AppDispatcher from '../dispatcher.jsx';
import { EventEmitter } from 'events';
import assign from 'object-assign';

var difficultyConfig = {
    EASY: {
        velocity: 500,
        bots: 20
    },
    NORMAL: {
        velocity: 100,
        bots: 40
    },
    HARD: {
        velocity: 200,
        bots: 50
    }
};

var GalaxyConfigStatus = {
    difficulty: "NORMAL",
    velocity: 0,
    bots: 0
};

var GalaxyConfigStore = assign({}, EventEmitter.prototype, {

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
        case 'DIFFICULTY_SET':
            let difficulty = action.difficulty.value;
            GalaxyConfigStatus.difficulty = action.difficulty.value;
            GalaxyConfigStatus.velocity = difficultyConfig[action.difficulty.value].velocity;
            GalaxyConfigStatus.bots = difficultyConfig[action.difficulty.value].bots;
            GalaxyConfigStore.emitChange();
            break;
        default:
    }
});

export default GalaxyConfigStore;
