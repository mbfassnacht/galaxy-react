import React from 'react';
import ReactDOM from 'react-dom';
import TimelineComponent from 'react-visjs-timeline';
import ActionsStore from '../../stores/actionsStore';
import ActionsActions from '../../actions/viewActions/actionsActions';
import VideoStatusStore from '../../stores/videoStatusStore';
import VideoActions from '../../actions/viewActions/videoActions';

function getAllActionsFromStore() {
    return ActionsStore.getAll()
}

function getVideoStatusFromStore() {
    return VideoStatusStore.getStatus()
}

class Timeline extends React.Component {

	constructor(props) {
		super(props);
		var actions = getAllActionsFromStore();
		var videoStatus = getVideoStatusFromStore();
		var items = this.buildItems(actions);
		this.state = {items: items, duration: videoStatus.duration, time: videoStatus.time };
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
				id: actions[i].id,
				start: parseFloat(actions[i].markIn),
				end: parseFloat(actions[i].markOut),
				content: actions[i].title
			};

			items.push(item);
		}
		return items;
	}

	onItemClick(event) {
		ActionsActions.selectAction(event.items[0]);
	}

	onChangeActions() {
		var actions = getAllActionsFromStore();
		var items = this.buildItems(actions);
		this.setState({items: items});
	}

	onChangeTime() {
		var videoStatus = getVideoStatusFromStore();
		this.setState({duration: videoStatus.duration});
		this.setState({time: videoStatus.time});
	}

	componentDidMount() {
		ActionsStore.addChangeListener(this.onChangeActions.bind(this));
		VideoStatusStore.addTimeChangeListener(this.onChangeTime.bind(this));
		this.refs.timeline.$el.addEventListener('select', this.onItemClick);
	}

	componentWillUnmount() {
		ActionsStore.removeChangeListener(this.onChangeActions.bind(this));
		VideoStatusStore.removeTimeChangeListener(this.onChangeTime.bind(this));
	}

	render() {
		const options = {
			width: '100%',
  			height: '200px',
			start: 0,
			end: this.state.duration,
			min: 0,
			max: this.state.duration
		};

		const customTimes = {
			timeBar: this.state.time
		}

		return (
			<div className="timeline">
				<TimelineComponent  customTimes={customTimes} select={this.onItemClick} ref="timeline" items={this.state.items} options={options}></TimelineComponent>
			</div>
		);
	}
}

Timeline.defaultProps = {

};

export default Timeline;
