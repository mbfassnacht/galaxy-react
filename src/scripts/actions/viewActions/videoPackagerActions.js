import AppDispatcher from '../../dispatcher.jsx';

export default {

    updateTitle: function(title) {
        var action = {
            actionType: "TITLE_UPDATE",
            title: title
        };

        AppDispatcher.dispatch(action);
    },

    setOriginalVideoId: function(id) {
        var action = {
            actionType: "ORIGINAL_VIDEO_ID_SET",
            id: id
        };

        AppDispatcher.dispatch(action);
    }


};
