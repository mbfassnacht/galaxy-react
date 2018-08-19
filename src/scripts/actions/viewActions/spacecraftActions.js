import AppDispatcher from '../../dispatcher.jsx';

export default {

    bulletShotted: function(position) {
        var action = {
            actionType: 'BULLET_SHOT',
            positionX: position.x
        };

        AppDispatcher.dispatch(action);
    }
};
