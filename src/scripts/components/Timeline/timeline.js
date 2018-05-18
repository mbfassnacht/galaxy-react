import React from 'react';
import ReactDOM from 'react-dom';

class Timeline extends React.Component {

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
	}

	render() {
		return (
			<div className="timeline">
				im the timeline
			</div>
		);
	}
}

Timeline.defaultProps = {

};

export default Timeline;
