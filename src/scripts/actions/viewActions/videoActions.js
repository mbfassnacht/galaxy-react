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

    setDuration: function(duration) {
        var action = {
            actionType: "SET_DURATION_ACTION",
            duration: duration
        };

        AppDispatcher.dispatch(action);
    },

    changingTime: function(time) {
        var action = {
            actionType: "CHANGING_TIME_ACTION",
            time: time
        };

        AppDispatcher.dispatch(action);
    },

    setTime: function(time) {
        var action = {
            actionType: "SET_TIME_ACTION",
            time: time
        };

        AppDispatcher.dispatch(action);
    },

    mute: function(action) {
        var action = {
            actionType: "MUTE_ACTION",
            mute: action.mute
        };

        AppDispatcher.dispatch(action);
    },

    increase: function(action) {
        var action = {
            actionType: "INCREASE_ACTION"
        };

        AppDispatcher.dispatch(action);
    },

    decrease: function(action) {
        var action = {
            actionType: "DECREASE_ACTION"
        };

        AppDispatcher.dispatch(action);
    }
};
