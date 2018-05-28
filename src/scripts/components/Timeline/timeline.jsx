import React from 'react';
import ReactDOM from 'react-dom';
import TimelineComponent from 'react-visjs-timeline';
import ActionsStore from '../../stores/actionsStore';
import ActionsActions from '../../actions/viewActions/actionsActions';

function getAllActionsFromStore() {
    return ActionsStore.getAll()
}

class Timeline extends React.Component {

	constructor(props) {
		super(props);
		var actions = getAllActionsFromStore();
		var items = this.buildItems(actions);
		this.state = {items: items};
	}

	buildItems(actions) {
		var items = [{
			start: -1,
			end: -1,
			content: ''
		}];
		for (var i = 0; i < actions.length; i++) {

			var item = {
				className: actions[i].type,
				id:  actions[i].id,
				start: 1,
				end: 3,
				content: actions[i].title
			};

			items.push(item);
		}
		return items;
	}

	onChange() {
		var actions = getAllActionsFromStore();
		var items = this.buildItems(actions);
		this.setState({items: items});
	}

	componentDidMount() {
		ActionsStore.addChangeListener(this.onChange.bind(this));
	}

	componentWillUnmount() {
		ActionsStore.removeChangeListener(this.onChange.bind(this));
	}

	render() {
		const options = {
			width: '100%',
  			height: '200px'
		};

		return (
			<div className="timeline">
				<TimelineComponent  ref="timeline" items={this.state.items} options={options}></TimelineComponent>
			</div>
		);
	}
}

Timeline.defaultProps = {

};

export default Timeline;
