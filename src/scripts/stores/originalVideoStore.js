import AppDispatcher from '../dispatcher.jsx';
import { EventEmitter } from 'events';
import assign from 'object-assign';

const status = ['inited', 'loading_data', 'ready', 'not_saved', 'saving', 'save_error', 'saved' ];

var originalVideoStatus =  {
    originalVideo: {
        previewVideoUrl: '',
        id: -1
    },
    state: status[0]
};

var OriginalVideoStore = assign({}, EventEmitter.prototype, {

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
        return originalVideoStatus;
    }
});

AppDispatcher.register(function(action) {

    switch(action.actionType) {

        case 'ORIGINAL_VIDEO_ID_SET':
            originalVideoStatus.originalVideo.id = action.id;
            OriginalVideoStore.emitChange();
            break;
        case 'VIDEO_LOAD_STARTED':
            originalVideoStatus.state = status[1];
            OriginalVideoStore.emitChange();
            break;
        case 'VIDEO_LOAD_ENDED':
            originalVideoStatus.state = status[2];
            originalVideoStatus.originalVideo = action.data;
            OriginalVideoStore.emitChange();
            break;
        case 'VIDEO_DATA_MODIFIED':
            originalVideoStatus.state = status[3];
            OriginalVideoStore.emitChange();
            break;
        default:
    }
});

export default OriginalVideoStore;
