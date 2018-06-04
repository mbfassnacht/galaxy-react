import React from 'react';
import ReactDOM from 'react-dom';
import VideoPackagerStore from '../../stores/videoPackagerStore';
import VideoPackagerActions from '../../actions/viewActions/videoPackagerActions';
import Translator from '../../utils/translatorUtil';

function getCurrentVideoPackagerStatusFromStore() {
    return VideoPackagerStore.getStatus()
}

class VideoInformation extends React.Component {

	constructor(props) {
		super(props);
		var status = getCurrentVideoPackagerStatusFromStore();
		this.state = status;
	}

	updateTitle(e) {
		this.setState({title: e.currentTarget.value})
		VideoPackagerActions.updateTitle(e.currentTarget.value);
	}

	render() {
		return (
			<div className="video-packager-video-information">
				 <input placeholder={Translator.trans(this.props.locale, 'enterVideoTitle')}  className="video-packager-title" value={this.state.title} onChange={this.updateTitle.bind(this)}/>
			</div>
		);
	}
}

VideoInformation.defaultProps = {

};

export default VideoInformation;
