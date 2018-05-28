import AppDispatcher from '../../dispatcher.jsx';

export default {

    add: function(type) {
        var action = {
            actionType: "ADD_ACTION",
            type: type
        };

        AppDispatcher.dispatch(action);
    },

    update: function(actionUpdated) {
        var action = {
            actionType: "UPDATE_ACTION",
            action: actionUpdated
        };

        AppDispatcher.dispatch(action);
    },

    removeSelection: function(type) {
        var action = {
            actionType: "REMOVE_ACTION_SELECTION"
        };

        AppDispatcher.dispatch(action);
    },

    remove: function(actionId) {
        var action = {
            actionType: "REMOVE_ACTION",
            id: actionId
        };

        AppDispatcher.dispatch(action);
    }
};