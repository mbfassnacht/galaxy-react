import AppDispatcher from '../dispatcher.jsx';
import { EventEmitter } from 'events';
import assign from 'object-assign';

var actions = [];
var currentSelectedAction = {
    markIn: '00:00:00',
    markOut: '00:00:00',
    title: '',
    input1: '',
    input2: '',
    type: 'lettering',
    id: -1,
    placeholder: false
};

var ActionsStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },

    getAll: function() {
        return actions;
    },

    getCurrentAction: function() {
        return currentSelectedAction;
    }

});

AppDispatcher.register(function(action) {

    switch(action.actionType) {
        case "ADD_ACTION":
            var newAction =  {
                markIn: '00:00:00',
                markOut: '00:00:00',
                title: '',
                input1: '',
                input2: '',
                placeholder: false,
                type: action.type.type,
                id: actions.length
            };
            currentSelectedAction = newAction;
            actions.push(newAction);
            console.log(actions);
            ActionsStore.emitChange();
            break;

        case "REMOVE_ACTION_SELECTION":
            currentSelectedAction =  {
                markIn: '00:00:00',
                markOut: '00:00:00',
                title: '',
                input1: '',
                input2: '',
                type: '',
                placeholder: false,
                id: -1
            };
            console.log(actions);
            ActionsStore.emitChange();
            break;

        case "UPDATE_ACTION":
            actions[action.action.action.id] = action.action.action;
            currentSelectedAction = action.action.action;
            console.log(actions);
            ActionsStore.emitChange();
            break;

        case "REMOVE_ACTION":
            actions.push(action.type);
            ActionsStore.emitChange();
            break;

        default:
    }
});

export default ActionsStore;
