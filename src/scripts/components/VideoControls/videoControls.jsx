import React from 'react';
import ReactDOM from 'react-dom';
import { PlayButton, PauseButton, PrevButton, NextButton, ProgressBar, MuteToggleButton } from 'react-player-controls'
import VideoActions from '../../actions/viewActions/videoActions';
import VideoStatusStore from '../../stores/videoStatusStore';

function getStateFromStore() {
    return VideoStatusStore.getStatus()
}

class VideoControls extends React.Component {

	constructor(props) {
        super(props);
		var status = getStateFromStore();
		this.state = status;
    }

	componentDidMount() {
		VideoStatusStore.addChangeListener(this.onChange.bind(this));
	}

	onPlay(event) {
        if (typeof event != "undefined") {
            event.preventDefault();
            event.stopPropagation();
        }

        VideoActions.play();
	}

	onPause(event) {
        if (typeof event != "undefined") {
            event.preventDefault();
            event.stopPropagation();
        }

		VideoActions.pause();
	}

	onIncrease(event) {
        if (typeof event != "undefined") {
            event.preventDefault();
            event.stopPropagation();
        }

		VideoActions.increase();
	}

	onDecrease(event) {
        if (typeof event != "undefined") {
            event.preventDefault();
            event.stopPropagation();
        }

		VideoActions.decrease();
	}

	onChange() {
		var status = getStateFromStore();
		this.setState(status);
	}

	componentWillUnmount() {
		VideoStatusStore.removeChangeListener(this.onChange.bind(this));
	}

	toggleMute(event) {
        if (typeof event != "undefined") {
            event.preventDefault();
            event.stopPropagation();
        }
        var state = !this.state.mute;
		VideoActions.mute({
			mute: state
		});
	}

	render() {
		return (
			<div className = "video-packager-video-controls">
				<PrevButton
				  	isEnabled = {true}
				  	onClick = {e.preventDefault() && this.onDecrease.bind(this)}
				/>
				<div className = {this.state.playing ? 'video-packager-toggle-button video-packager-hidden' : 'video-packager-toggle-button'}>
					<PlayButton
						isEnabled = {true}
						onClick = {e.preventDefault() && this.onPlay.bind(this)}
					/>
				</div>
					<div className = {!this.state.playing ? 'video-packager-toggle-button video-packager-hidden' : 'video-packager-toggle-button'}>
					<PauseButton
						onClick = {e.preventDefault() && this.onPause.bind(this)}
					/>
				</div>
				<NextButton
				  	isEnabled = {true}
				  	onClick = {e.preventDefault() && this.onIncrease.bind(this)}
				/>
				<MuteToggleButton
					isEnabled = {true}
					isMuted = {this.state.mute}
					onMuteChange = {e.preventDefault() && this.toggleMute.bind(this)}
				/>
			</div>
		);
	}
}

VideoControls.defaultProps = {

};

export default VideoControls;
