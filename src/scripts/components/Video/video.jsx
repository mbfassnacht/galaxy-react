import React from 'react';
import VideoStatusStore from '../../stores/videoStatusStore';
import VideoPackagerStore from '../../stores/videoPackagerStore';
import VideoActions from '../../actions/viewActions/videoActions';
import ApiServices from '../../ApiServices';

function getStateFromStore() {
    return VideoStatusStore.getStatus()
}

function getStateFromVideoPackager() {
    return VideoPackagerStore.getStatus()
}

class Video extends React.Component {

	constructor(props) {
		super(props);
		var status = getStateFromStore();
		this.state = status;
        this.loadVideo();
	}

    loadVideo() {
        ApiServices.getVideo(61, this.onVideoLoaded.bind(this));
	}

    onVideoLoaded(data) {
        console.log("callback")
	}

	setVideoStatus() {
		this.video.muted = this.state.mute;
		if (this.state.playing) {
			this.video.play();
		} else {
			this.video.pause();
		}
		this.setVideoCurrentTime(this.state.time);
	}

	componentDidMount() {
		VideoStatusStore.addChangeListener(this.onChange.bind(this));
        VideoPackagerStore.addChangeListener(this.onVideoPackagerStatusChange.bind(this));

		this.video = this.refs.video;

		this.video.addEventListener('loadedmetadata', () => {
			this.setVideoStatus();
			VideoActions.setDuration( this.video.duration);

			this.video.addEventListener("timeupdate", () => {
				VideoActions.setTime(this.video.currentTime);
			});
		});
	}

	setVideoCurrentTime(newTime) {
		if (!isNaN(newTime)) {
			this.video.currentTime = newTime;
		}
	}

	componentDidUpdate() {
		this.setVideoStatus();
	}

	onChange() {
		var status = getStateFromStore();
		this.setState(status);
	}

    onVideoPackagerStatusChange() {
		var status = getStateFromVideoPackager();
		this.setState(status);
	}

	componentWillUnmount() {
		VideoStatusStore.removeChangeListener(this.onChange.bind(this));
        VideoPackagerStore.removeChangeListener(this.onVideoPackagerStatusChange.bind(this));
	}

	render() {

		return (
			<div className="video-packager-video">
				<video ref="video" width="100%" controls="">
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
