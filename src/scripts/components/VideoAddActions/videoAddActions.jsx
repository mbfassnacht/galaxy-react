import React from 'react';
import ReactDOM from 'react-dom';

class VideoAddActions extends React.Component {

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
	}

	render() {
		return (
			<div className="video-add-actions">
				this is the container that allow you to add actions
			</div>
		);
	}
}

VideoAddActions.defaultProps = {

};

export default VideoAddActions;
