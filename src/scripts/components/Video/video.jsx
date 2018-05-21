import React from 'react';
import ReactDOM from 'react-dom';

class Video extends React.Component {

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
	}

	render() {
		return (
			<div className="video">
				<video width="100%" height="360" controls="" autoPlay="true">
					<source src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4" type="video/mp4"></source>
					<source src="http://clips.vorwaerts-gmbh.de/VfE.webm" type="video/webm"></source>
					<source src="http://clips.vorwaerts-gmbh.de/VfE.ogv" type="video/ogg"></source>
					<object width="640" height="360" type="application/x-shockwave-flash" data="player.swf">
						<param name="movie" value="player.swf"></param>
						<param name="flashvars" value="autostart=true&amp;controlbar=over&amp;image=images/poster.jpg&amp;file=http://clips.vorwaerts-gmbh.de/VfE_flash.mp4"></param>
						<img src="images/poster.jpg" width="640" height="360" alt="Big Buck Bunny" title="No video playback capabilities, please download the video below"></img>
					</object>
				</video>
			</div>
		);
	}
}

Video.defaultProps = {

};

export default Video;
