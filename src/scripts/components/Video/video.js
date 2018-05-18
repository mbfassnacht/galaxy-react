import React from 'react';
import ReactDOM from 'react-dom';

class Video extends React.Component {

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
	}

	render() {
		return (
			<div className="video">
				im the video
			</div>
		);
	}
}

Video.defaultProps = {

};

export default Video;
