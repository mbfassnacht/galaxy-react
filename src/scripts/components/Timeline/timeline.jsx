import React from 'react';
import ReactDOM from 'react-dom';
import TimelineComponent from 'react-visjs-timeline';
import ActionsStore from '../../stores/actionsStore';
import ActionsActions from '../../actions/viewActions/actionsActions';
import VideoStatusStore from '../../stores/videoStatusStore';
import VideoActions from '../../actions/viewActions/videoActions';
import OriginalVideoStore from '../../stores/originalVideoStore';
import Utils from '../../utils/dateUtil';

function getAllActionsFromStore() {
    return ActionsStore.getAll()
}

function getDurationFromStore() {
    return VideoStatusStore.getDuration()
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
			content: '',
            className: 'not-visible'
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
        currentAction.markIn = Math.min(Math.max(event.start.getTime() / (this.props.currensScale), 0), this.state.duration - 1);
        currentAction.markOut =  Math.max(Math.min(event.end.getTime() / (this.props.currensScale), this.state.duration), 1);
        ActionsActions.update(currentAction);
	}

	onChangeTime() {
		var videoStatus = getVideoStatusFromStore();
		this.setState({time: Math.min(parseFloat(videoStatus.time), this.state.duration)});
	}

    onDurationSet() {
		var duration = getDurationFromStore();
		this.setState({duration: duration});
	}

    onOriginalVideoLoaded() {
        var originalVideo = getOriginalVideoStatusFromStore().originalVideo;
        this.setState({frameRate: originalVideo.videoFrames});
    }

	componentDidMount() {
        this._onChangeActions = this.onChangeActions.bind(this);
		this._onChangeTime = this.onChangeTime.bind(this);
        this._onOriginalVideoLoaded = this.onOriginalVideoLoaded.bind(this);
        this._onDurationSet = this.onDurationSet.bind(this);

		ActionsStore.addChangeListener(this._onChangeActions);
		VideoStatusStore.addTimeChangeListener(this._onChangeTime);
        VideoStatusStore.addDurationSetListener(this._onDurationSet);
        OriginalVideoStore.addChangeListener(this._onOriginalVideoLoaded);
		this.refs.timeline.$el.addEventListener('select', this.onActionClicked.bind(this));
		this.refs.timeline.$el.addEventListener('timechange', this.draggingTimeBar.bind(this));
	}

	draggingTimeBar(event) {
        if (typeof event !== 'undefined') {
            var timeToSet = Math.min(event.time.getTime() / (this.props.currensScale), this.state.duration);
            VideoActions.changingTime(Math.max(0, timeToSet));
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
			end: this.state.duration,
			min: 0,
			showMajorLabels: false,
            showMinorLabels: false,
            onMove: this.onActionMoving.bind(this),
            zoomMin: this.props.currensScale * this.state.duration
		};

		const customTimes = {
			timeBar: this.state.time * this.props.currensScale
		}

		return (
			<div className="video-packager-timeline">
				<TimelineComponent  customTimes={customTimes} select={this.onItemClick} ref="timeline" items={this.state.items} options={options}></TimelineComponent>
				<div className="timeline-footer">
					<div className="video-packager-start">{Utils.formatTimeForDom(this.state.time, this.state.frameRate)}</div>
					<div className="video-packager-end">{Utils.formatTimeForDom(this.state.duration, this.state.frameRate)}</div>
				</div>
			</div>
		);
	}
}

Timeline.defaultProps = {
    currensScale: 1000 * 60 * 60
};

export default Timeline;
