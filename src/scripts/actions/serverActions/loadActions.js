import AppDispatcher from '../../dispatcher.jsx';

export default {

    loadVideoStarted: function() {
        var action = {
            actionType: "VIDEO_LOAD_STARTED"
        };

        AppDispatcher.dispatch(action);
    },

    loadVideoEnded: function(data) {
        var action = {
            actionType: "VIDEO_LOAD_ENDED",
            data: data
        };

        AppDispatcher.dispatch(action);
    },

    loadVideoError: function() {
        var action = {
            actionType: "VIDEO_LOAD_ERROR"
        };

        AppDispatcher.dispatch(action);
    }
};
