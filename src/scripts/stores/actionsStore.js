import AppDispatcher from '../dispatcher.jsx';
import { EventEmitter } from 'events';
import assign from 'object-assign';

var actions = [];
var currentTime = 0;

var currentSelectedAction = {
    markIn: 0,
    markOut: 0,
    title: '',
    content: '',
    type: 'lettering',
    id: -1,
    placeholder: false,
    template: '',
    selectedTemplate: 0,
    positionTop: false
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

    emitActionSelection: function() {
        this.emit('action:selected');
    },

    addActionSelectionListener: function(callback) {
        this.on('action:selected', callback);
    },

    removeActionSelectionListener: function(callback) {
        this.removeListener('action:selected', callback);
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
        case 'ADD_ACTION':
            var newAction =  {
                markIn: currentTime,
                markOut: currentTime + 1,
                title: '',
                content: '',
                positionTop: false,
                placeholder: false,
                type: action.type.type,
                id: actions.length,
                template: '',
                selectedTemplate: 0
            };
            currentSelectedAction = newAction;
            actions.push(newAction);
            ActionsStore.emitChange();
            break;

        case 'REMOVE_ACTION_SELECTION':
            currentSelectedAction =  {
                markIn: '00:00:00:00',
                markOut: '00:00:00:00',
                title: '',
                content: '',
                type: '',
                placeholder: false,
                positionTop: false,
                id: -1,
                template: '',
                selectedTemplate: 0
            };
            ActionsStore.emitChange();
            break;

        case 'SELECT_ACTION':
            currentSelectedAction =  actions[action.id];
            ActionsStore.emitActionSelection();
            break;

        case 'UPDATE_ACTION':
            actions[action.action.id] = action.action;
            currentSelectedAction = action.action;
            ActionsStore.emitChange();
            break;

        case 'REMOVE_ACTION':
            actions.splice(action.id, 1);
            currentSelectedAction =  {
                markIn: '00:00:00:00',
                markOut: '00:00:00:00',
                title: '',
                content: '',
                type: '',
                positionTop: false,
                placeholder: false,
                id: -1,
                template: '',
                selectedTemplate: 0
            };
            ActionsStore.emitChange();
            break;

        case 'SET_TIME_ACTION':
            currentTime = action.time;
            break;
        default:
    }
});

export default ActionsStore;
