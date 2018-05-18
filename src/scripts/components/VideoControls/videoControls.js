require('styles/components/VideoControls/videoControls.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { PlaybackControls } from 'react-player-controls'

class VideoControls extends React.Component {

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
	}

	playBackChange() {
		this.container = ReactDOM.findDOMNode(this);
	}

	render() {
		return (
			<div className="video-controls">
				<PlaybackControls
					isPlayable={true}
					isPlaying={false}
					onPlaybackChange={isPlaying => this.setState({ ...this.state, isPlaying })}
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
