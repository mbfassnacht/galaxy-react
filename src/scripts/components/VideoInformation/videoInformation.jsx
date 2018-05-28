import React from 'react';
import ReactDOM from 'react-dom';
import VideoPackagerStore from '../../stores/videoPackagerStore';
import VideoPackagerActions from '../../actions/viewActions/videoPackagerActions';

function getCurrentVideoPackagerStatusFromStore() {
    return VideoPackagerStore.getStatus()
}

class VideoInformation extends React.Component {

	constructor(props) {
		super(props);
		var status = getCurrentVideoPackagerStatusFromStore();
		this.state = status;
	}

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
	}

	updateTitle(e) {
		this.setState({title: e.currentTarget.value})
		VideoPackagerActions.updateTitle(e.currentTarget.value);
	}

	render() {
		return (
			<div className="video-information">
				 <input placeholder="Enter video title..." className="title" value={this.state.title} onChange={this.updateTitle.bind(this)}/>
			</div>
		);
	}
}

VideoInformation.defaultProps = {

};

export default VideoInformation;
