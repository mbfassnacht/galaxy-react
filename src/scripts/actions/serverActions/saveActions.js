import AppDispatcher from '../../dispatcher.jsx';

export default {

    videoSaveStarted: function() {
        var action = {
            actionType: 'VIDEO_SAVE_STARTED'
        };

        AppDispatcher.dispatch(action);
    },

    videoSaveError: function() {
        var action = {
            actionType: 'VIDEO_SAVE_ERROR'
        };

        AppDispatcher.dispatch(action);
    },

    videoSaveEnded: function(data) {
        var action = {
            actionType: 'VIDEO_SAVE_ENDED',
            data: data
        };

        AppDispatcher.dispatch(action);
    }
};
