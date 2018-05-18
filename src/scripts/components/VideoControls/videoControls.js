import React from 'react';
import ReactDOM from 'react-dom';
import { PlaybackControls } from 'react-player-controls'

class VideoControls extends React.Component {

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
	}

	playBackChange() {

	}

	render() {
		return (
			<div className="video-controls">
				<PlaybackControls
					isPlayable={true}
					isPlaying={false}
					onPlaybackChange={this.playBackChange}
					showPrevious={true}
					showNext={true}
					hasNext={true}
					hasPrevious={true}
				/>
			</div>
		);
	}
}

VideoControls.defaultProps = {

};

export default VideoControls;
