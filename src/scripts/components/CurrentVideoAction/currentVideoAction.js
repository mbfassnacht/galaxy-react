import React from 'react';
import ReactDOM from 'react-dom';

class CurrentVideoAction extends React.Component {

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
	}

	render() {
		return (
			<div className="current-video-action">
				this is the current video action
			</div>
		);
	}
}

CurrentVideoAction.defaultProps = {

};

export default CurrentVideoAction;
