import AppDispatcher from '../../dispatcher.jsx';

export default {

    loadVideoStarted: function() {
        var action = {
            actionType: "VIDEO_LOAD_STARTED"
        };

        AppDispatcher.dispatch(action);
    },

    loadVideoEnded: function() {
        var action = {
            actionType: "VIDEO_LOAD_ENDED"
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
