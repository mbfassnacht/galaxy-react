import AppDispatcher from '../dispatcher.jsx';
import { EventEmitter } from 'events';
import assign from 'object-assign';

var statusStore = {
    playing: true,
    mute: true
};

var VideoStatusStore = assign({}, EventEmitter.prototype, {

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
        return statusStore;
    }
});

AppDispatcher.register(function(action) {

    switch(action.actionType) {
        case "PLAY_ACTION":
            statusStore.playing = true;
            VideoStatusStore.emitChange();
            break;
        case "PAUSE_ACTION":
            statusStore.playing = false;
            VideoStatusStore.emitChange();
            break;
        case "MUTE_ACTION":
            statusStore.mute = action.mute;
            VideoStatusStore.emitChange();
            break;
        default:
    }
});

export default VideoStatusStore;
