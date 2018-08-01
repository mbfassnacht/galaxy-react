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
        saveVideoUrl: '',
        saveDerivativeUrl: ''
    },
    attemptToSave: false
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
        case 'ATTEMPT_TO_SAVE':
            videoPackagerStatus.attemptToSave = true;
            VideoPackagerStore.emitSaveAttempt();
            break;
        case 'TITLE_UPDATE':
            videoPackagerStatus.title = action.title;
            VideoPackagerStore.emitChange();
            break;
        case 'CONFIG_URL_SET':
            videoPackagerStatus.config = JSON.parse(action.config);
            VideoPackagerStore.emitChange();
            break;
        case 'VIDEO_SAVE_STARTED':
            videoPackagerStatus.state = status[4];
            VideoPackagerStore.emitChange();
            break;
        case 'VIDEO_SAVE_ERROR':
            videoPackagerStatus.state = status[5];
            VideoPackagerStore.emitChange();
            break;
        case 'VIDEO_SAVE_ENDED':
            videoPackagerStatus.state = status[6];
            videoPackagerStatus.clipId = action.data.id;
            VideoPackagerStore.emitChange();
            break;
        default:
    }
});

export default VideoPackagerStore;
