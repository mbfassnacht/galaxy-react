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
        event.preventDefault();
        event.stopPropagation();
		VideoActions.play();
	}

	onPause(event) {
        event.preventDefault();
        event.stopPropagation();
		VideoActions.pause();
	}

	onIncrease(event) {
        event.preventDefault();
        event.stopPropagation();
		VideoActions.increase();
	}

	onDecrease(event) {
        event.preventDefault();
        event.stopPropagation();
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
        event.preventDefault();
        event.stopPropagation();
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
				  	onClick = {this.onDecrease.bind(this)}
				/>
				<div className = {this.state.playing ? 'video-packager-toggle-button video-packager-hidden' : 'video-packager-toggle-button'}>
					<PlayButton
						isEnabled = {true}
						onClick = {this.onPlay.bind(this)}
					/>
				</div>
					<div className = {!this.state.playing ? 'video-packager-toggle-button video-packager-hidden' : 'video-packager-toggle-button'}>
					<PauseButton
						onClick = {this.onPause.bind(this)}
					/>
				</div>
				<NextButton
				  	isEnabled = {true}
				  	onClick = {this.onIncrease.bind(this)}
				/>
				<MuteToggleButton
					isEnabled = {true}
					isMuted = {this.state.mute}
					onMuteChange = {this.toggleMute.bind(this)}
				/>
			</div>
		);
	}
}

VideoControls.defaultProps = {

};

export default VideoControls;
