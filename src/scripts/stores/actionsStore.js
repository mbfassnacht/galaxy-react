import AppDispatcher from '../dispatcher.jsx';
import { EventEmitter } from 'events';
import assign from 'object-assign';

var actions = [];
var currentTime = 0;
var currentSelectedAction = {
    markIn: 0,
    markOut: 0,
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
                markIn: currentTime,
                markOut: currentTime + 1,
                title: '',
                input1: '',
                input2: '',
                placeholder: false,
                type: action.type.type,
                id: actions.length
            };
            currentSelectedAction = newAction;
            actions.push(newAction);
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
            ActionsStore.emitChange();
            break;

        case "SELECT_ACTION":
            currentSelectedAction =  actions[action.id];
            ActionsStore.emitChange();
            break;

        case "UPDATE_ACTION":
            actions[action.action.action.id] = action.action.action;
            currentSelectedAction = action.action.action;
            ActionsStore.emitChange();
            break;

        case "REMOVE_ACTION":
            actions.splice(action.id, 1);
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
            ActionsStore.emitChange();
            break;

        case "SET_TIME_ACTION":
            currentTime = action.time;
            break;
        default:
    }
});

export default ActionsStore;
