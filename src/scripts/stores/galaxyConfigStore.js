import AppDispatcher from '../dispatcher.jsx';
import { EventEmitter } from 'events';
import assign from 'object-assign';

var difficultyConfig = {
    EASY: {
        velocity: 20,
        bots: {
            green: 2,
            red: 10,
            blue: 16
        }
    },
    NORMAL: {
        velocity: 30,
        bots: {
            green: 4,
            red: 16,
            blue: 32
        }
    },
    HARD: {
        velocity: 50,
        bots: {
            green: 6,
            red: 16,
            blue: 40
        }
    }
};

var GalaxyConfigStatus = {
    difficulty: "NORMAL",
    velocity: 0,
    bots: {},
    set: false
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

    getConfig: function() {
        return GalaxyConfigStatus;
    }
});

AppDispatcher.register(function(action) {

    switch(action.actionType) {
        case 'DIFFICULTY_SET':
            let difficulty = action.difficulty.value;
            GalaxyConfigStatus.difficulty = action.difficulty.value;
            GalaxyConfigStatus.velocity = difficultyConfig[action.difficulty.value].velocity;
            GalaxyConfigStatus.bots = difficultyConfig[action.difficulty.value].bots;
            GalaxyConfigStatus.set = true;
            GalaxyConfigStore.emitChange();
            break;
        default:
    }
});

export default GalaxyConfigStore;
