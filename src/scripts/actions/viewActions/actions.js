import AppDispatcher from '../../dispatcher.jsx';

export default {

    add: function(type) {
        var action = {
            actionType: "ADD_ACTION",
            type: type
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
