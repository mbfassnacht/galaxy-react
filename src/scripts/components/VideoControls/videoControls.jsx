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

	onPlay() {
        if (typeof event != "undefined") {
            event.preventDefault();
            event.stopPropagation();
        }

        VideoActions.play();
	}

	onPause() {
        if (typeof event != "undefined") {
            event.preventDefault();
            event.stopPropagation();
        }

		VideoActions.pause();
	}

	onIncrease() {
        if (typeof event != "undefined") {
            event.preventDefault();
            event.stopPropagation();
        }

		VideoActions.increase();
	}

	onDecrease() {
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

	toggleMute() {
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
				  	onClick = {(e) => this.onDecrease(e)}
				/>
				<div className = {this.state.playing ? 'video-packager-toggle-button video-packager-hidden' : 'video-packager-toggle-button'}>
					<PlayButton
						isEnabled = {true}
						onClick = {(e) => this.onPlay(e)}
					/>
				</div>
					<div className = {!this.state.playing ? 'video-packager-toggle-button video-packager-hidden' : 'video-packager-toggle-button'}>
					<PauseButton
						onClick = {(e) => this.onPause(e)}
					/>
				</div>
				<NextButton
				  	isEnabled = {true}
				  	onClick = {(e) => this.onIncrease(e)}
				/>
				<MuteToggleButton
					isEnabled = {true}
					isMuted = {this.state.mute}
					onMuteChange = {(e) => this.toggleMute(e)}
				/>
			</div>
		);
	}
}

VideoControls.defaultProps = {

};

export default VideoControls;
