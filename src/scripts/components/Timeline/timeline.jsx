import React from 'react';
import ReactDOM from 'react-dom';
import TimelineComponent from 'react-visjs-timeline';
import ActionsStore from '../../stores/actionsStore';
import ActionsActions from '../../actions/viewActions/actionsActions';
import VideoStatusStore from '../../stores/videoStatusStore';
import VideoActions from '../../actions/viewActions/videoActions';
import OriginalVideoStore from '../../stores/originalVideoStore';

function getAllActionsFromStore() {
    return ActionsStore.getAll()
}

function getVideoStatusFromStore() {
    return VideoStatusStore.getStatus()
}

function getOriginalVideoStatusFromStore() {
    return OriginalVideoStore.getStatus()
}

class Timeline extends React.Component {

	constructor(props) {
		super(props);
		var actions = getAllActionsFromStore();
		var videoStatus = getVideoStatusFromStore();
		var items = this.buildItems(actions);

		this.state = {
            items: items,
            duration: videoStatus.duration,
            time: videoStatus.time,
            frameRate: 0
        };
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
				start: (actions[i].markIn instanceof Date) ? actions[i].markIn : this.props.currensScale * parseFloat(actions[i].markIn),
				end: (actions[i].markOut instanceof Date) ? actions[i].markOut : this.props.currensScale * parseFloat(actions[i].markOut),
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
        var frame_string;

        if (typeof this.state.frameRate === 'number' && this.state.frameRate >= 0) {
            frame_string = '' + Math.floor((time - Math.floor(time)) * this.state.frameRate);
            if (frame_string.length < 2) {
                frame_string = '0' + frame_string;
            }
            time_string += ':' + frame_string;
        }

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

    onOriginalVideoLoaded() {
        var originalVideo = getOriginalVideoStatusFromStore().originalVideo;
        this.setState({frameRate: originalVideo.videoFrames});
    }

	componentDidMount() {
        this._onChangeActions = this.onChangeActions.bind(this);
		this._onChangeTime = this.onChangeTime.bind(this);
        this._onOriginalVideoLoaded = this.onOriginalVideoLoaded.bind(this);

		ActionsStore.addChangeListener(this._onChangeActions);
		VideoStatusStore.addTimeChangeListener(this._onChangeTime);
        OriginalVideoStore.addChangeListener(this._onOriginalVideoLoaded);
		this.refs.timeline.$el.addEventListener('select', this.onActionClicked.bind(this));
		this.refs.timeline.$el.addEventListener('timechange', this.draggingTimeBar.bind(this));
	}

	draggingTimeBar(event) {
        if (typeof event !== 'undefined') {
            VideoActions.changingTime(event.time.getTime() / (this.props.currensScale));
        } else {
            VideoActions.changingTime();
        }
	}

	componentWillUnmount() {
		ActionsStore.removeChangeListener(this._onChangeActions);
		VideoStatusStore.removeTimeChangeListener(this._onChangeTime);
        OriginalVideoStore.removeChangeListener(this._onOriginalVideoLoaded);
	}

	render() {
		const options = {
			width: '100%',
  			height: '200px',
			start: 0,
			end: parseFloat(this.state.duration),
			min: 0,
			showMajorLabels: false,
            showMinorLabels: false,
            onMove: this.onActionMoving.bind(this),
            zoomMin: this.props.currensScale * this.state.duration
		};

        console.log(this.state.time);
		const customTimes = {
			timeBar: this.state.time * this.props.currensScale
		}

		return (
			<div className="video-packager-timeline">
				<TimelineComponent  customTimes={customTimes} select={this.onItemClick} ref="timeline" items={this.state.items} options={options}></TimelineComponent>
				<div className="timeline-footer">
					<div className="video-packager-start">{this.formatTimeForDom(this.state.time)}</div>
					<div className="video-packager-end">{this.formatTimeForDom(this.state.duration)}</div>
				</div>
			</div>
		);
	}
}

Timeline.defaultProps = {
    currensScale: 1000 * 60 * 60
};

export default Timeline;
