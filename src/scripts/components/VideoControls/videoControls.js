import React from 'react';
import ReactDOM from 'react-dom';

class VideoControls extends React.Component {

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
	}

	render() {
		return (
			<div className="video-controls">
				this are the video controls
			</div>
		);
	}
}

VideoControls.defaultProps = {

};

export default VideoControls;
