import AppDispatcher from '../dispatcher.jsx';
import { EventEmitter } from 'events';
import assign from 'object-assign';

var videoPackagerStatus = {
    title: ''
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

        default:
    }
});

export default VideoPackagerStore;
