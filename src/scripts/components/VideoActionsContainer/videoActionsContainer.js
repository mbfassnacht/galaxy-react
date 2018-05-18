import React from 'react';
import ReactDOM from 'react-dom';

class VideoActionsContainer extends React.Component {

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
	}

	render() {
		return (
			<div className="video-actions-container">
				this are the video actions
			</div>
		);
	}
}

VideoActionsContainer.defaultProps = {

};

export default VideoActionsContainer;
