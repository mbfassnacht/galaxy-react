import AppDispatcher from '../../dispatcher.jsx';

export default {

    play: function() {
        var action = {
            actionType: "PLAY_ACTION"
        };

        AppDispatcher.dispatch(action);
    },

    pause: function() {
        var action = {
            actionType: "PAUSE_ACTION",
        };

        AppDispatcher.dispatch(action);
    },

    mute: function(action) {
        var action = {
            actionType: "MUTE_ACTION",
            mute: action.mute
        };

        AppDispatcher.dispatch(action);
    }
};
