import AppDispatcher from '../dispatcher.jsx';
import { EventEmitter } from 'events';
import assign from 'object-assign';

const status = ['inited', 'loading_data', 'ready', 'not_saved', 'saving', 'save_error', 'saved' ];

var videoPackagerStatus = {
    title: '',
    clipId: -1,
    config: {
        getVideoUrl: '',
        getTemplatesUrl: '',
        saveVideoUrl: ''
    },
    attemptToSave: false,
    allowedToSave: false
};

var VideoPackagerStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit('change');
    },

    emitSaveAttempt: function() {
        this.emit('saveAttempt');
    },

    emitSaveAllowed: function() {
        this.emit('saveAllowed');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },

    addSaveAttemptListener: function(callback) {
        this.on('saveAttempt', callback);
    },

    removeSaveAttemptListener: function(callback) {
        this.removeListener('saveAttempt', callback);
    },

    addSaveAllowedListener: function(callback) {
        this.on('saveAllowed', callback);
    },

    removeSaveAllowedListener: function(callback) {
        this.removeListener('saveAllowed', callback);
    },

    getStatus: function() {
        return videoPackagerStatus;
    }
});

AppDispatcher.register(function(action) {

    switch(action.actionType) {
        case "ATTEMPT_TO_SAVE":
            videoPackagerStatus.attemptToSave = true;
            VideoPackagerStore.emitSaveAttempt();
            break;
        case "ALLOWED_TO_SAVE":
            videoPackagerStatus.allowedToSave = action.allowed;
            VideoPackagerStore.emitSaveAllowed();
            break;
        case "TITLE_UPDATE":
            videoPackagerStatus.title = action.title;
            VideoPackagerStore.emitChange();
            break;
        case "CONFIG_URL_SET":
            videoPackagerStatus.config = JSON.parse(action.config);
            VideoPackagerStore.emitChange();
            break;
        default:
    }
});

export default VideoPackagerStore;
