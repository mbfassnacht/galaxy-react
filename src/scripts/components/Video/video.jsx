import React from 'react';
import VideoStatusStore from '../../stores/videoStatusStore';
import OriginalVideoStore from '../../stores/originalVideoStore';
import VideoActions from '../../actions/viewActions/videoActions';
import ApiServices from '../../ApiServices';

function getStateFromStore() {
    return VideoStatusStore.getStatus()
}

function getOriginalVideoStateFromStore() {
    return OriginalVideoStore.getStatus()
}

class Video extends React.Component {

	constructor(props) {
		super(props);
		var status = getStateFromStore();
		this.state = status;
        var originalVideoStatus = getOriginalVideoStateFromStore().originalVideo;
        this.state.originalVideo = originalVideoStatus;
        this.loadVideo();
	}

    loadVideo() {
        ApiServices.getVideo(this.state.originalVideo.id);
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
        OriginalVideoStore.addChangeListener(this.onOriginalVideoStatusChange.bind(this));

		this.video = this.refs.video;
        this.source = this.refs.source;
		this.video.addEventListener('loadedmetadata', () => {
			this.setVideoStatus();
			VideoActions.setDuration( this.video.duration);

			this.video.addEventListener("timeupdate", (e) => {
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

    onOriginalVideoStatusChange() {
		var status = getOriginalVideoStateFromStore();
		this.setState({originalVideo:status.originalVideo});
        this.video.load();

	}

	componentWillUnmount() {
		VideoStatusStore.removeChangeListener(this.onChange.bind(this));
        OriginalVideoStore.removeChangeListener(this.onOriginalVideoStatusChange.bind(this));
	}

	render() {


		return (
			<div className="video-packager-video">
				<video ref="video" width="100%" controls="">
					<source ref="source" src={this.state.originalVideo.previewVideoUrl} type="video/mp4"></source>
				</video>
			</div>
		);
	}
}

Video.defaultProps = {

};

export default Video;
