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
		this.container = ReactDOM.findDOMNode(this);
	}

	onPlay() {
		VideoActions.play();
	}

	onPause() {
		VideoActions.pause();
	}

	toggleMute() {
		this.setState({isMuted: ! this.state.isMuted });
		var state = this.state.isMuted;
		VideoActions.mute({
			mute: state
		});
	}

	render() {
		return (
			<div className = "video-controls">
					<PrevButton
					  	isEnabled = {true}
					  	onClick = {() => alert('Go to previous')}
					/>

				<div className = {!this.state.playing ? 'toggle-button hidden' : 'toggle-button'}>
					<PlayButton
						isEnabled = {true}
						onClick = {this.onPlay}
					/>
				</div>
					<div className = {this.state.playing ? 'toggle-button hidden' : 'toggle-button'}>

					<PauseButton
						onClick = {this.onPause}
					/>
				</div>
				<NextButton
				  	isEnabled = {true}
				  	onClick = {() => alert('Go to previous')}
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
