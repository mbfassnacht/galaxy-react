import AppDispatcher from '../../dispatcher.jsx';

export default {

    difficutlySet: function(value) {
        var action = {
            actionType: 'DIFFICULTY_SET',
            difficulty: value
        };

        AppDispatcher.dispatch(action);
    }
};
