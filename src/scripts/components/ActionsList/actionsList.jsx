import React from 'react';
import ReactDOM from 'react-dom';
import Action from '../Action/action.jsx';
import ActionsStore from '../../stores/actionsStore';

function getStateFromStore() {
    return ActionsStore.getAll()
}

class ActionsList extends React.Component {

	constructor(props) {
        super(props);
        var actions = getStateFromStore();
        this.state = {actions};
    }

    onChange() {
        var actions = getStateFromStore();
        this.setState({actions});
    }

    componentDidMount() {
        ActionsStore.addChangeListener(this.onChange.bind(this));
    }

    componentWillUnmount() {
        ActionsStore.removeChangeListener(this.onChange.bind(this));
    }

	render() {
		return (
			<div className="actions-list">
			</div>
		);
	}
}

ActionsList.defaultProps = {

};

export default ActionsList;
