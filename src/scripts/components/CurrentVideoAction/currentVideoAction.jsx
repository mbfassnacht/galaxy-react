import React from 'react';
import ReactDOM from 'react-dom';
import SVGInline from "react-svg-inline"
import icon from '../../../assets/images/erase.svg';
import Button from '../Button/button.jsx';
import ActionsStore from '../../stores/actionsStore';
import ActionsActions from '../../actions/viewActions/actionsActions';

function getCurrentActionFromStore() {
    return ActionsStore.getCurrentAction()
}

class CurrentVideoAction extends React.Component {

	constructor(props) {
		super(props);
		var action = getCurrentActionFromStore();
		this.state = {
			action: action,
			actionSelected: false,
			userMarkIn: '00:00:00',
			userMarkOut: '00:00:00',
			duration: '00:00:00'
		};
	}

	onChange() {
		var action = getCurrentActionFromStore();
		var duration = action.markOut - action.markIn;
		this.setState({
			action: action,
			actionSelected: (action.id != -1) ? true : false,
			userMarkIn: this.formatTimeForDom(action.markIn),
			userMarkOut: this.formatTimeForDom(action.markOut),
			duration: this.formatTimeForDom(duration)
		});

	}

	setDuration() {
		var duration = this.state.action.markOut - this.state.action.markIn;
		this.formatTimeForDom(duration);
		this.setState({duration: this.formatTimeForDom(duration)});
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

	fromFormattedTimeToSeconds(formattedTime) {

	    var frameFraction = 0;

	    var timesArr = formattedTime.split(':');

	    if (timesArr.length === 4) {
	        frameFraction = parseInt(timesArr.pop(), 10);

	        if (isNaN(frameFraction))
	        {
	            return false;
	        }
	    }

	    if (timesArr.length === 3) {
	        //check length of each string and is number
	        for (var i=0;i<timesArr.length;i++) {
	            if (timesArr[i].length != 2) {
	                return false;//err
	            }
	            if(isNaN( Number(timesArr[i]) ) ){
	                return false;//err
	            }
	            if ( 'number' !== typeof Number(timesArr[i]) ) {
	                return false;//err
	            }
	        }
	    } else {
	        return false;
	    }

	    var seconds = (+timesArr[0]) * 60 * 60 + (+timesArr[1]) * 60 + (+timesArr[2]) + frameFraction;
	    return seconds;
	}

	formatTimeForDom(time) {
	    var formatted = this.secondsToTime(Math.floor(time));
	    var time_string = formatted.h + ':' + formatted.m + ':' + formatted.s;
	    return time_string;
	}

	componentDidMount() {
		ActionsStore.addChangeListener(this.onChange.bind(this));
	}

	updateTitle(e) {
		var updatedAction = {
			action: Object.assign({}, this.state.action, {title: e.currentTarget.value})
		};

		this.setState(updatedAction);
		ActionsActions.update(updatedAction);
	}

	updateMarkIn(e) {
		var markIn = this.fromFormattedTimeToSeconds(e.currentTarget.value);
		var updatedAction = {
			action: Object.assign({}, this.state.action, {markIn: markIn})
		};
		this.setState(updatedAction);
		this.setDuration();
		ActionsActions.update(updatedAction);
	}

	updateMarkOut(e) {
		var markOut = this.fromFormattedTimeToSeconds(e.currentTarget.value);
		var updatedAction = {
			action: Object.assign({}, this.state.action, {markOut: markOut})
		};
		this.setState(updatedAction);
		this.setDuration();
		ActionsActions.update(updatedAction);
	}

	updatePlaceholder(e) {
		var updatedAction = {
			action: Object.assign({}, this.state.action, {placeholder: e.currentTarget.checked})
		};
		this.setState(updatedAction);
		ActionsActions.update(updatedAction);
	}

	updateInput1(e) {
		var updatedAction = {
			action: Object.assign({}, this.state.action, {input1: e.currentTarget.value})
		};
		this.setState(updatedAction);
		ActionsActions.update(updatedAction);
	}

	updateInput2(e) {
		var updatedAction = {
			action: Object.assign({}, this.state.action, {input2: e.currentTarget.value})
		};
		this.setState(updatedAction);
		ActionsActions.update(updatedAction);
	}

	componentWillUnmount() {
		ActionsStore.removeChangeListener(this.onChange.bind(this));
	}

	onCloseAction() {
		ActionsActions.removeSelection();
	}

	onRemoveAction() {
		ActionsActions.remove(this.state.action.id);
	}

	render() {
		return (
			<div className={'current-video-action ' + (this.state.actionSelected ? '' :'hidden')}>
				<div className="action-header">
					<div className="action-title">
						<input className="title" placeholder = "Enter action name..." value={this.state.action.title} onChange={this.updateTitle.bind(this)}/>
					</div>
					<div className="action-duration">
						<span className="duration-title">Duration: {this.state.duration}</span>
					</div>
				</div>
				<div className="action-top-info">
					<label htmlFor="mark-in">Mark in</label>
					<input input="mark-in" className="mark-in" value={this.state.userMarkIn} onChange={this.updateMarkIn.bind(this)}/>
					<label htmlFor="mark-out">Mark out</label>
					<input input="mark-out" className="mark-out" value={this.state.userMarkOut} onChange={this.updateMarkOut.bind(this)}/>
				</div>
				<div className="action-content">
					<div className="input-container">
						<label htmlFor="input-1">Input 1</label>
						<input input="input-1" className="input-1" value={this.state.action.input1} onChange={this.updateInput1.bind(this)}/>
					</div>
					<div className="input-container">
						<label htmlFor="input-2">Input 2</label>
						<input input="input-2" className="input-2" value={this.state.action.input2} onChange={this.updateInput2.bind(this)}/>
					</div>
				</div>
				<div className="action-bottom-container">
					<div onClick={this.onRemoveAction.bind(this)} className="bottom-item x-small">
						<SVGInline svg={icon} />
					</div>
					<div className="bottom-item text normal">
						<label className="custom-checkbox container">Placeholder Action
							<input checked={this.state.action.placeholder} onChange={this.updatePlaceholder.bind(this)} id="placeholder" type="checkbox" />
							<span className="checkmark"></span>
						</label>
					</div>
					<div className="bottom-item small">
						<Button clickHandler={this.onCloseAction.bind(this)} text="Close"></Button>
					</div>
				</div>
			</div>
		);
	}
}

CurrentVideoAction.defaultProps = {

};

export default CurrentVideoAction;
