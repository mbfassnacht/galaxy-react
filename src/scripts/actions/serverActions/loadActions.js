import AppDispatcher from '../../dispatcher.jsx';

export default {

    loadVideoStarted: function() {
        var action = {
            actionType: 'VIDEO_LOAD_STARTED'
        };

        AppDispatcher.dispatch(action);
    },

    loadVideoEnded: function(data) {
        var action = {
            actionType: 'VIDEO_LOAD_ENDED',
            data: data
        };

        AppDispatcher.dispatch(action);
    },

    loadVideoError: function() {
        var action = {
            actionType: 'VIDEO_LOAD_ERROR'
        };

        AppDispatcher.dispatch(action);
    },

    loadTemplatesStarted: function() {
        var action = {
            actionType: 'TEMPLATES_LOAD_STARTED'
        };

        AppDispatcher.dispatch(action);
    },

    loadTemplatesEnded: function(data) {
        var action = {
            actionType: 'TEMPLATES_LOAD_ENDED',
            data: data
        };

        AppDispatcher.dispatch(action);
    },

    loadTemplatesError: function() {
        var action = {
            actionType: 'TEMPLATES_LOAD_ERROR'
        };

        AppDispatcher.dispatch(action);
    }
};
