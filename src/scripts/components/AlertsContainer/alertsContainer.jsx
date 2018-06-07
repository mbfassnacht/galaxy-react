import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button/button.jsx';
import ApiServices from '../../ApiServices';
import Translator from '../../utils/translatorUtil';
import ActionsStore from '../../stores/actionsStore';
import VideoPackagerStore from '../../stores/videoPackagerStore';
import VideoPackagerActions from '../../actions/viewActions/videoPackagerActions';

function getActions() {
    return ActionsStore.getAll()
}

function getVideoPackagerStatus() {
    return VideoPackagerStore.getStatus()
}

class AlertsContainer extends React.Component {

	constructor(props) {
        super(props);
        this.state = {hidden: true, alertText: ''};
    }

	checkVideo() {
    	var videoPackagerStatus = getVideoPackagerStatus();

		if (typeof videoPackagerStatus.title === "undefined"  || videoPackagerStatus.title.trim() === "" ) {
			this.error = "addVideoTitle";
			this.actionWithError = null;
		}
	}

	checkActions() {
		var actions = getActions();
		this.error = "";
		this.actionWithError = null;
		for (var i = 0; i < actions.length; i++) {
			if (actions[i].type !== "subtitle" && (typeof actions[i].template === "undefined"  || actions[i].template.trim() === "" || actions[i].template === "0" )) {
				this.error = "addActionTemplate";
				this.actionWithError = actions[i];
			}

			if (actions[i].type !== "watermark" && (typeof actions[i].content === "undefined"  || actions[i].content.trim() === "" )) {
				this.error = "addActionContent";
				this.actionWithError = actions[i];
			}

			if (typeof actions[i].title === "undefined"  || actions[i].title.trim() === "" ) {
				this.error = "addActionTitle";
				this.actionWithError = actions[i];
				break;
			}
		}
	}

	onDataChanged() {
		this.error = "";
		this.checkVideo();
		if (this.error == "") {
			this.checkActions();
		}

		var message = Translator.trans(this.props.locale, "alert_" + this.error);

		if (this.actionWithError != null) {
			var key = message.split('$')[1];
			var value = this.actionWithError[key];
			message = message.replace("$" + key + "$", value);
		}

		if (this.error === "") {
			this.props.allowedToSave(true);
		} else {
			this.props.allowedToSave(false);
		}

		this.setState({alertText: message});
	}

	onSaveAttempt() {
		var videoPackagerStatus = getVideoPackagerStatus();
		if (videoPackagerStatus.attemptToSave) {
			this.setState({hidden: false});
		}
	}

	componentDidMount() {
        this._onDataChanged = this.onDataChanged.bind(this);
		this._onSaveAttempt = this.onSaveAttempt.bind(this);

		VideoPackagerStore.addSaveAttemptListener(this._onSaveAttempt);
		VideoPackagerStore.addChangeListener(this._onDataChanged);
        ActionsStore.addChangeListener(this._onDataChanged);

		this.onDataChanged();
	}

	componentWillUnmount() {
		ActionsStore.removeChangeListener(this._onDataChanged);
		VideoPackagerStore.removeSaveAttemptListener(this._onSaveAttempt);
		VideoPackagerStore.removeChangeListener(this._onDataChanged);
	}

	render() {
		return (
			<div className={"video-packager-alerts-container " + (this.state.hidden ? 'hidden' :'')}>
				{this.state.alertText}
			</div>
		);
	}
}

AlertsContainer.defaultProps = {

};

export default AlertsContainer;
