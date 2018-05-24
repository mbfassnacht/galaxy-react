import React from 'react';
import ReactDOM from 'react-dom';
import TimelineComponent from 'react-visjs-timeline';

class Timeline extends React.Component {

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
	}

	render() {
		const options = {
			width: '100%',
			height: '200px',
			stack: false,
			min: 0,
			max: 100000,
			start: 0,
			end: 100,
			showMajorLabels: true,
			showCurrentTime: true,
			zoomMin: 1000000,
			type: 'background'
		};

		const items = [{
			start: 1,
			end: 3,
			content: 'Trajectory A'
		}]


		return (
			<div className="timeline">
				<TimelineComponent items={items} options={options}></TimelineComponent>
			</div>
		);
	}
}

Timeline.defaultProps = {

};

export default Timeline;
