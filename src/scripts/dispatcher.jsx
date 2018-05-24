import {Dispatcher} from 'flux';

var AppDispatcher = new Dispatcher();

AppDispatcher.handleLoadAction = function(action) {
    this.dispatch({
        source: 'LOAD_ACTION',
        action: action
    });
}

AppDispatcher.handleViewAction = function(action) {
    this.dispatch({
        source: 'VIEW_ACTION',
        action: action
    });
}

AppDispatcher.handleServerAction = function(action) {
	this.dispatch({
		source: 'SERVER_ACTION',
		action: action
	});
}

module.exports = AppDispatcher;
