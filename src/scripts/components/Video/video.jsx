import React from 'react';
import ReactDOM from 'react-dom';
import VideoStatusStore from '../../stores/videoStatusStore';

function getStateFromStore() {
    return VideoStatusStore.getStatus()
}

class Video extends React.Component {

	constructor(props) {
		super(props);
		var status = getStateFromStore();
		this.state = status;
	}

	componentDidMount() {
		VideoStatusStore.addChangeListener(this.onChange.bind(this));
		this.container = ReactDOM.findDOMNode(this);
		this.video = this.container.getElementsByTagName('video')[0];

		this.video.addEventListener('loadedmetadata', () => {
			this.video.muted = this.state.mute;
			this.setState({duration: this.video.duration});
		});
	}

	onChange() {
		var status = getStateFromStore();
		this.setState({status});
		this.video.muted= status.mute;
	}

	componentWillUnmount() {
		VideoStatusStore.removeChangeListener(this.onChange.bind(this));
	}

	render() {
		return (
			<div className="video">
				<video ref="effectiveVideo" width="100%" controls="" autoPlay="false">
					<source src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4" type="video/mp4"></source>
					<source src="http://clips.vorwaerts-gmbh.de/VfE.webm" type="video/webm"></source>
					<source src="http://clips.vorwaerts-gmbh.de/VfE.ogv" type="video/ogg"></source>
					<object width="640" type="application/x-shockwave-flash" data="player.swf">
						<param name="movie" value="player.swf"></param>
						<param name="flashvars" value="autostart=true&amp;controlbar=over&amp;image=images/poster.jpg&amp;file=http://clips.vorwaerts-gmbh.de/VfE_flash.mp4"></param>
					</object>
				</video>
			</div>
		);
	}
}

Video.defaultProps = {

};

export default Video;
