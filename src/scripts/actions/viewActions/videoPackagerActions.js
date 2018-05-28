import AppDispatcher from '../../dispatcher.jsx';

export default {

    updateTitle: function(title) {
        var action = {
            actionType: "TITLE_UPDATE",
            title: title
        };

        AppDispatcher.dispatch(action);
    }
};
