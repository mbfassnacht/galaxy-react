import AppDispatcher from '../dispatcher.jsx';
import { EventEmitter } from 'events';
import assign from 'object-assign';

var templates = {
    lettering: [],
    watermark: [],
};

var TemplatesStore = assign({}, EventEmitter.prototype, {

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
        return templates;
    }

});

AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case "TEMPLATES_LOAD_STARTED":
            TemplatesStore.emitChange();
            break;

        case "TEMPLATES_LOAD_ENDED":
            for (var i = 0; i < action.data.length; i++) {
                if (action.data[i].type === 'lettering') {
                    templates.lettering.push(action.data[i]);
                }  else {
                    templates.watermark.push(action.data[i]);
                }
            }

            TemplatesStore.emitChange();
            break;

        case "TEMPLATES_LOAD_ERROR":
            TemplatesStore.emitChange();
            break;
        default:
    }
});

export default TemplatesStore;
