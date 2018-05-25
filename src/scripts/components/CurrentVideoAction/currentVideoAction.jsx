import React from 'react';
import ReactDOM from 'react-dom';

class CurrentVideoAction extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			markIn: 0,
			markOut: 0,
			title: ''
		};
	}

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
	}

	updateTitle(e) {
		this.setState({title: e.currentTarget.value})
	}

	updateMarkIn(e) {
		this.setState({markIn: e.currentTarget.value})
	}

	updateMarkOut(e) {
		this.setState({markOut: e.currentTarget.value})
	}

	render() {
		return (
			<div className="current-video-action">
				<div className="action-header">
					<div className="action-title">
						<input className="title" value={this.state.title} onChange={this.updateTitle.bind(this)}/>
					</div>
					<div className="action-duration">
						<span className="duration-title">Duration:</span>
						<span className="duration"></span>
					</div>
				</div>
				<div className="action-body">
					<input className="mark-in" value={this.state.markIn} onChange={this.updateMarkIn.bind(this)}/>
					<input className="mark-out" value={this.state.markOut} onChange={this.updateMarkOut.bind(this)}/>
				</div>
			</div>
		);
	}
}

CurrentVideoAction.defaultProps = {

};

export default CurrentVideoAction;
