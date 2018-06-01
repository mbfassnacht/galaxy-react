import AppDispatcher from '../dispatcher.jsx';
import { EventEmitter } from 'events';
import assign from 'object-assign';

var statusStore = {
    playing: false,
    mute: true,
    time: 0,
    duration: 0
};

var frameRate = 1;

var VideoStatusStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit('change');
    },

    emitTimeChange: function() {
        this.emit('timechange');
    },

    emitDurationSet: function() {
        this.emit('durationset');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },

    addTimeChangeListener: function(callback) {
        this.on('timechange', callback);
    },

    removeTimeChangeListener: function(callback) {
        this.removeListener('timechange', callback);
    },

    addDurationSetListener: function(callback) {
        this.on('durationset', callback);
    },

    removeDurationSetListener: function(callback) {
        this.removeListener('durationset', callback);
    },

    getDuration: function() {
        return statusStore.duration;
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
        case "SET_DURATION_ACTION":
            statusStore.duration = action.duration;
            VideoStatusStore.emitDurationSet();
            break;
        case "CHANGING_TIME_ACTION":
            statusStore.playing = false;
            statusStore.time = typeof(action.time !== 'undefined') ? action.time : statusStore.time;
            VideoStatusStore.emitChange();
            break;
        case "SET_TIME_ACTION":
            statusStore.time = action.time;
            VideoStatusStore.emitTimeChange();
            break;
        case "VIDEO_LOAD_ENDED":
            frameRate = action.data.videoFrames;
            break;
        case "DECREASE_ACTION":
            statusStore.time = Math.max(0, statusStore.time - (1 / frameRate));
            VideoStatusStore.emitChange();
            break;
        case "INCREASE_ACTION":
            statusStore.time = Math.min(statusStore.duration, statusStore.time + (1 / frameRate));
            VideoStatusStore.emitChange();
            break;
        default:
    }
});

export default VideoStatusStore;
