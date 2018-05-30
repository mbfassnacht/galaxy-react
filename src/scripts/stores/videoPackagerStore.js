import AppDispatcher from '../dispatcher.jsx';
import { EventEmitter } from 'events';
import assign from 'object-assign';

const status = ['inited', 'loading_data', 'ready', 'not_saved', 'saving', 'save_error', 'saved' ];

var videoPackagerStatus = {
    title: '',
    state: status[0],
    clipId: -1
};

var VideoPackagerStore = assign({}, EventEmitter.prototype, {

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
        return videoPackagerStatus;
    }
});

AppDispatcher.register(function(action) {

    switch(action.actionType) {
        case "TITLE_UPDATE":
            videoPackagerStatus.title = action.title;
            VideoPackagerStore.emitChange();
            break;
        case "VIDEO_LOAD_STARTED":
            videoPackagerStatus.state = status[1];
            VideoPackagerStore.emitChange();
            break;
        case "VIDEO_LOAD_ENDED":
            videoPackagerStatus.state = status[2];
            VideoPackagerStore.emitChange();
            break;
        case "VIDEO_DATA_MODIFIED":
            videoPackagerStatus.state = status[3];
            VideoPackagerStore.emitChange();
            break;
        case "VIDEO_SAVE_STARTED":
            videoPackagerStatus.state = status[4];
            VideoPackagerStore.emitChange();
            break;
        case "VIDEO_SAVE_ERROR":
            videoPackagerStatus.state = status[5];
            VideoPackagerStore.emitChange();
            break;
        case "VIDEO_SAVE_ENDED":
            videoPackagerStatus.state = status[6];
            VideoPackagerStore.emitChange();
            break;
        default:
    }
});

export default VideoPackagerStore;
