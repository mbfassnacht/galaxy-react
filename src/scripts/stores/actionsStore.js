import AppDispatcher from '../dispatcher.jsx';
import { EventEmitter } from 'events';
import assign from 'object-assign';

var actions = [];

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
    }
});

AppDispatcher.register(function(action) {

    switch(action.actionType) {
        case "ADD_ACTION":
            actions.push(action.type);
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
