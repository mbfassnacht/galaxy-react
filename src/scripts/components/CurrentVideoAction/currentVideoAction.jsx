import React from 'react';
import ReactDOM from 'react-dom';
import SVGInline from "react-svg-inline"
import icon from '../../../assets/images/erase.svg';
import Button from '../Button/button.jsx';
import ActionsStore from '../../stores/actionsStore';
import OriginalVideoStore from '../../stores/originalVideoStore';
import VideoStatusStore from '../../stores/videoStatusStore';
import TemplatesStore from '../../stores/templatesStore';
import ActionsActions from '../../actions/viewActions/actionsActions';
import ApiServices from '../../ApiServices';
import Utils from '../../utils/dateUtil';
import Translator from '../../utils/translatorUtil';
import Switch from "react-switch";

function getCurrentActionFromStore() {
    return ActionsStore.getCurrentAction()
}

function getDurationFromStore() {
    return VideoStatusStore.getDuration()
}

function getTemplatesFromStore() {
    return TemplatesStore.getAll()
}

function getOriginalVideoStatusFromStore() {
    return OriginalVideoStore.getStatus()
}

class CurrentVideoAction extends React.Component {

	constructor(props) {
		super(props);
		var action = getCurrentActionFromStore();
        var templates = getTemplatesFromStore();
		this.state = {
			action: action,
			actionSelected: false,
			userMarkIn: '00:00:00:00',
			userMarkOut: '00:00:00:00',
			duration: '00:00:00:00',
            frameRate: 0,
            templates: templates
		};
        this.loadTemplates();
	}

    loadTemplates() {
        ApiServices.getTemplates('lettering');
	}

	onChange() {
		var action = getCurrentActionFromStore();
        var duration = this.state.duration;
        if (typeof action.markOut !== 'undefined' && typeof action.markIn !== 'undefined') {
            duration = action.markOut - action.markIn;
        }

		this.setState({
			action: action,
			actionSelected: (action.id != -1) ? true : false,
			userMarkIn: Utils.formatTimeForDom(action.markIn, this.state.frameRate),
			userMarkOut: Utils.formatTimeForDom(action.markOut, this.state.frameRate),
			duration: Utils.formatTimeForDom(duration, this.state.frameRate)
		});

	}

    onTemplatesLoaded() {
        var templates = getTemplatesFromStore();
        this.setState({templates: templates});
    }

    onOriginalVideoLoaded() {
        var originalVideo = getOriginalVideoStatusFromStore().originalVideo;
        this.setState({frameRate: originalVideo.videoFrames});
    }

    onDurationSet() {
        var duration = getDurationFromStore();
        this.setState({videoDuration: duration});
    }

	setDuration() {
		var duration = this.state.action.markOut - this.state.action.markIn;
		Utils.formatTimeForDom(duration, this.state.frameRate);
		this.setState({duration: Utils.formatTimeForDom(duration, this.state.frameRate)});
	}

    setMarkIn() {
        var timeToSet = typeof VideoStatusStore.getStatus().time !== 'undefined' ? VideoStatusStore.getStatus().time : 0;
        this.updateMarkIn(timeToSet);
	}

    setMarkOut() {
        var timeToSet = typeof VideoStatusStore.getStatus().time !== 'undefined' ? VideoStatusStore.getStatus().time : 0;
        this.updateMarkOut(timeToSet);
    }

	componentDidMount() {
        this._onChange = this.onChange.bind(this);
        this._onOriginalVideoLoaded = this.onOriginalVideoLoaded.bind(this);
        this._onDurationSet = this.onDurationSet.bind(this);
        this._onTemplatesLoaded = this.onTemplatesLoaded.bind(this);
        this._setMarkIn = this.setMarkIn.bind(this);
        this._setMarkOut = this.setMarkOut.bind(this);
        this.markInButton = this.refs.markInButton;
        this.markOutButton = this.refs.markOutButton;

        this.markInButton.addEventListener('click', this._setMarkIn);
        this.markOutButton.addEventListener('click', this._setMarkOut);
		ActionsStore.addChangeListener(this._onChange);
        TemplatesStore.addChangeListener(this._onTemplatesLoaded);
        ActionsStore.addActionSelectionListener(this._onChange);
        VideoStatusStore.addDurationSetListener(this._onDurationSet);
        OriginalVideoStore.addChangeListener(this._onOriginalVideoLoaded);
	}

	updateTitle(e) {
		var updatedAction = Object.assign({}, this.state.action, {title: e.currentTarget.value})
		this.setState({updatedAction});
		ActionsActions.update(updatedAction);
	}

    onMarkInChanged(e) {
		var markIn = Utils.fromFormattedTimeToSeconds(e.currentTarget.value, this.state.frameRate);
        this.updateMarkIn(markIn);
    }

	updateMarkIn(markIn) {
        var markOut = this.state.action.markOut;
        markIn = this.getAllowedMarkIn(markIn);

        if (markIn >= markOut) {
            markOut = markIn + this.props.minActionDuration;
        }

        var updatedAction = Object.assign({}, this.state.action, {markOut: markOut, markIn: markIn})
		this.setState({updatedAction});
		this.setDuration();
		ActionsActions.update(updatedAction);
	}

    onMarkOutChanged(e) {
		var markOut = Utils.fromFormattedTimeToSeconds(e.currentTarget.value, this.state.frameRate);
        this.updateMarkOut(markOut);
    }

    updateMarkOut(markOut) {
        var markIn = this.state.action.markIn;
        markOut = this.getAllowedMarkOut(markOut);

        if (markOut <= markIn) {
            markIn = markOut - this.props.minActionDuration;
        }

        var updatedAction = Object.assign({}, this.state.action, {markOut: markOut, markIn: markIn});

        this.setState({updatedAction});
        this.setDuration();
        ActionsActions.update(updatedAction);
    }

    getAllowedMarkIn(markIn) {
        var allowedMarkIn = Math.max(markIn, 0);
        allowedMarkIn = Math.min(allowedMarkIn, this.state.videoDuration - this.props.minActionDuration);

        return allowedMarkIn;
    }

    getAllowedMarkOut(markOut) {
        var allowedMarkOut = Math.min(markOut, this.state.videoDuration);
        allowedMarkOut = Math.max(allowedMarkOut, 0 + this.props.minActionDuration);

        return allowedMarkOut;
    }

	updatePlaceholder(e) {
		var updatedAction = Object.assign({}, this.state.action, {placeholder: e.currentTarget.checked});
		this.setState({updatedAction});
		ActionsActions.update(updatedAction);
	}

    updateTemplate(e) {
		var updatedAction = Object.assign({}, this.state.action, {
            template: e.currentTarget.value,
            selectedTemplate: e.currentTarget.selectedIndex
        });


		this.setState({updatedAction});
		ActionsActions.update(updatedAction);
	}

	updateContent(e) {
		var updatedAction = Object.assign({}, this.state.action, {content: e.currentTarget.value});
		this.setState({updatedAction});
		ActionsActions.update(updatedAction);
	}

	componentWillUnmount() {
		ActionsStore.removeChangeListener(this._onChange);
        OriginalVideoStore.removeChangeListener(this._onOriginalVideoLoaded);
        ActionsStore.removeTimeChangeListener(this._onChange);
        VideoStatusStore.removeDurationSetListener(this._onDurationSet);
        TemplatesStore.removeChangeListener(this._onTemplatesLoaded);
        this.markInButton.removeEventListener('click', this._setMarkIn);
        this.markOutButton.removeEventListener('click', this._setMarkOut);
	}

	onCloseAction() {
		ActionsActions.removeSelection();
	}

    onSubtitlePositionChanged(top) {
        var updatedAction = Object.assign({}, this.state.action, {positionTop: top});
        this.setState({updatedAction});
        ActionsActions.update(updatedAction);
    }

	onRemoveAction() {
		ActionsActions.remove(this.state.action.id);
	}

    createSelectTemplateItems() {
        let items = [];
        items.push(<option key={0} value={0}></option>);

        var currentTemplates = this.state.templates[this.state.action.type];
        if (typeof currentTemplates !== 'undefined') {
            for (let i = 1; i < currentTemplates.length; i++) {
                items.push(<option key={i} value={currentTemplates[i-1].id}>{currentTemplates[i-1].title}</option>);
            }
        }

        return items;
    }

	render() {

        var label = "";

        if (this.state.action.type == 'lettering') {
            label = Translator.trans(this.props.locale, 'lettering');
        } else {
            if (this.state.action.type == 'subtitle') {
                label = Translator.trans(this.props.locale, 'subtitle');
            } else {
                if (this.state.action.type == 'watermark') {
                    label = Translator.trans(this.props.locale, 'watermark');
                }
            }
        }

        const actionLabel = (<div className="video-packager-action-type">{label}</div>);

		return (
			<div className={'video-packager-current-video-action ' + (this.state.actionSelected ? '' :'hidden')}>
                {actionLabel}
				<div className="video-packager-action-header">
					<div className="video-packager-action-title">
						<input className="video-packager-title" placeholder = {Translator.trans(this.props.locale, 'enterActionName')} value={this.state.action.title} onChange={this.updateTitle.bind(this)}/>
					</div>
					<div className="video-packager-action-duration">
						<span className="video-packager-duration-title">{Translator.trans(this.props.locale, 'duration')}: {this.state.duration}</span>
					</div>
				</div>
				<div className="video-packager-action-top-info">
                    <div className="video-packager-mark-container video-packager-mark-in-container">
                        <label htmlFor="video-packager-mark-in">Mark in</label>
                        <div>
                            <div ref="markInButton" className="left cirle-icon">{'{'}</div>
                            <input input="video-packager-mark-in" className="video-packager-mark-in" value={this.state.userMarkIn} onChange={this.onMarkInChanged.bind(this)}/>
                        </div>
                    </div>
                    <div className="video-packager-mark-container video-packager-mark-out-container">
                        <label htmlFor="video-packager-mark-out">Mark out</label>
                        <div>
                            <input input="video-packager-mark-out" className="video-packager-mark-out" value={this.state.userMarkOut} onChange={this.onMarkOutChanged.bind(this)}/>
                            <div ref="markOutButton" className="right cirle-icon">{'}'} </div>
                        </div>
                    </div>
                </div>
				<div className="video-packager-action-content">
                    <select value={this.state.action.template} onChange={this.updateTemplate.bind(this)} className={'video-packager-action-template-type'  + ((this.state.action.type === 'watermark' || this.state.action.type === 'lettering') ? '' :' field-not-displayed')}>
                        {this.createSelectTemplateItems()}
                    </select>
					<div className={'video-packager-input-container' + (this.state.action.type !== 'watermark' ? '' :' field-not-displayed')}>
						<label htmlFor="video-packager-content-input">{Translator.trans(this.props.locale, 'content')}</label>
						<textarea input="video-packager-content-input" className="video-packager-content-input" value={this.state.action.content} onChange={this.updateContent.bind(this)}></textarea>
					</div>
                    <div className={this.state.action.type === 'subtitle'? '' :' field-not-displayed'}>
                        <label htmlFor="subtitle-position-switch">{Translator.trans(this.props.locale, 'subtitlePosition')}</label>
                        <div className='subtitle-switcher-container'>
                            <p>{Translator.trans(this.props.locale, 'down')}</p>
                            <Switch
                                onChange={this.onSubtitlePositionChanged.bind(this)}
                                checked={this.state.action.positionTop}
                                id="subtitle-position-switch"
                                onColor="#000"
                                offColor="#b3b3b3"
                                className="effective-switch"
                            />
                            <p>{Translator.trans(this.props.locale, 'up')}</p>
                        </div>
                    </div>
				</div>
				<div className="video-packager-action-bottom-container">
					<div onClick={this.onRemoveAction.bind(this)} className="video-packager-bottom-item video-packager-x-small">
						<SVGInline svg={this.props.icon} />
					</div>
					<div className='video-packager-bottom-item video-packager-text video-packager-normal'>
						<label className="video-packager-custom-checkbox video-packager-container">{Translator.trans(this.props.locale, 'activatePlaceholder')}
							<input className="no-ui-tranform" checked={this.state.action.placeholder} onChange={this.updatePlaceholder.bind(this)} id="placeholder" type="checkbox" />
							<span className="video-packager-checkmark"></span>
						</label>
					</div>
					<div className="video-packager-bottom-item video-packager-small">
						<Button clickHandler={this.onCloseAction.bind(this)} text={Translator.trans(this.props.locale, 'close')}></Button>
					</div>
				</div>
			</div>
		);
	}
}

CurrentVideoAction.defaultProps = {
    icon: icon,
    minActionDuration: 1
};

export default CurrentVideoAction;
