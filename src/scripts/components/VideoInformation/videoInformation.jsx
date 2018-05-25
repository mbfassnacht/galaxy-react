import React from 'react';
import ReactDOM from 'react-dom';

class VideoInformation extends React.Component {

	constructor(props) {
        super(props);
        this.state = {title: 'The title of the video'};
    }

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
	}

	updateTitle(e) {
		this.setState({title: e.currentTarget.value})
	}

	render() {
		return (
			<div className="video-information">
				 <input className="title" value={this.state.title} onChange={this.updateTitle.bind(this)}/>
			</div>
		);
	}
}

VideoInformation.defaultProps = {

};

export default VideoInformation;
