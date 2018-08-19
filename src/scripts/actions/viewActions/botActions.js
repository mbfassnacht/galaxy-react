import AppDispatcher from '../../dispatcher.jsx';

export default {

    imKilled: function(title) {
        var action = {
            actionType: 'KILLED',
            title: title
        };

        AppDispatcher.dispatch(action);
    }
};
