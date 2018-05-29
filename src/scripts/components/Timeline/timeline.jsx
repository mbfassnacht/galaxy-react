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
				start: (actions[i].markIn instanceof Date) ? actions[i].markIn : parseFloat(actions[i].markIn),
				end: (actions[i].markOut instanceof Date) ? actions[i].markOut : parseFloat(actions[i].markOut),
				content: actions[i].title,
                editable: {
                    add: false,
                    updateTime: true,
                    updateGroup: false,
                    remove: false,
                    overrideItems: false
                }
			};

			items.push(item);
		}
		return items;
	}

	formatTimeForDom(time) {
		var formatted = this.secondsToTime(Math.floor(time));
		var time_string = formatted.h + ':' + formatted.m + ':' + formatted.s;
		return time_string;
	}

	secondsToTime(secs) {
	    var hours = Math.floor(secs / (60 * 60));

	    var divisor_for_minutes = secs % (60 * 60);
	    var minutes = Math.floor(divisor_for_minutes / 60);

	    var divisor_for_seconds = divisor_for_minutes % 60;
	    var seconds = Math.ceil(divisor_for_seconds);

	    var obj = {
	        "h": hours < 10 ? '0'+ hours : hours,
	        "m": minutes < 10 ? '0'+minutes : minutes,
	        "s": seconds < 10 ? '0'+seconds : seconds
	    };
	    return obj;
	}

	onActionClicked(event) {
        if (event.items.length > 0) {
            this.selectActionId = event.items[0];
            ActionsActions.selectAction(this.selectActionId);
            this.draggingTimeBar();
        } else {
            ActionsActions.removeSelection();
        }
	}

	onChangeActions() {
		var actions = getAllActionsFromStore();
		var items = this.buildItems(actions);
		this.setState({items: items});
	}

    onActionMoving(event) {
        var currentAction = getAllActionsFromStore()[event.id];
        var actionDuration = currentAction.markOut - currentAction.markIn;
        currentAction.markIn = event.start;
        currentAction.markOut = event.end;
        ActionsActions.update(currentAction);
	}

	onChangeTime() {
		var videoStatus = getVideoStatusFromStore();
		this.setState({duration: videoStatus.duration});
		this.setState({time: parseFloat(videoStatus.time)});
	}

	componentDidMount() {
		ActionsStore.addChangeListener(this.onChangeActions.bind(this));
		VideoStatusStore.addTimeChangeListener(this.onChangeTime.bind(this));
		this.refs.timeline.$el.addEventListener('select', this.onActionClicked.bind(this));
		this.refs.timeline.$el.addEventListener('timechange', this.draggingTimeBar);
	}

	draggingTimeBar(event) {
        if (typeof event !== 'undefined') {
            VideoActions.changingTime(event.time.getTime());
        } else {
            VideoActions.changingTime();
        }
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
			end: parseFloat(this.state.duration),
			min: 0,
			showMajorLabels: false,
			max: parseFloat(this.state.duration),
            onMove: this.onActionMoving.bind(this)
		};

		const customTimes = {
			timeBar: this.state.time
		}

		return (
			<div className="timeline">
				<TimelineComponent  customTimes={customTimes} select={this.onItemClick} ref="timeline" items={this.state.items} options={options}></TimelineComponent>
				<div className="timeline-footer">
					<div className="start">00:00:00</div>
					<div className="end">{this.formatTimeForDom(this.state.duration)}</div>
				</div>
			</div>
		);
	}
}

Timeline.defaultProps = {

};

export default Timeline;
