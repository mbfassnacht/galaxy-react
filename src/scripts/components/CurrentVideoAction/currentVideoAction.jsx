import React from 'react';
import ReactDOM from 'react-dom';
import SVGInline from "react-svg-inline"
import icon from '../../../assets/images/erase.svg';
import Button from '../Button/button.jsx';

class CurrentVideoAction extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			markIn: '00:00:00',
			markOut: '00:00:00',
			title: '',
			input1: '',
			input2: '',
			type: 'lettering'
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

	updateInput1(e) {
		this.setState({input1: e.currentTarget.value})
	}

	updateInput2(e) {
		this.setState({input2: e.currentTarget.value})
	}

	render() {
		return (
			<div className="current-video-action">
				<div className="action-header">
					<div className="action-title">
						<input className="title" placeholder = "Enter action name..." value={this.state.title} onChange={this.updateTitle.bind(this)}/>
					</div>
					<div className="action-duration">
						<span className="duration-title">Duration:</span>
						<span className="duration"></span>
					</div>
				</div>
				<div className="action-top-info">
					<label htmlFor="mark-in">Mark in</label>
					<input input="mark-in" className="mark-in" value={this.state.markIn} onChange={this.updateMarkIn.bind(this)}/>
					<label htmlFor="mark-out">Mark out</label>
					<input input="mark-out" className="mark-out" value={this.state.markOut} onChange={this.updateMarkOut.bind(this)}/>
				</div>
				<div className="action-content">
					<div className="input-container">
						<label htmlFor="input-1">Input 1</label>
						<input input="input-1" className="input-1" value={this.state.input1} onChange={this.updateInput1.bind(this)}/>
					</div>
					<div className="input-container">
						<label htmlFor="input-2">Input 2</label>
						<input input="input-2" className="input-2" value={this.state.input2} onChange={this.updateInput2.bind(this)}/>
					</div>
				</div>
				<div className="action-bottom-container">
					<div className="bottom-item x-small">
						<SVGInline svg={icon} />
					</div>
					<div className="bottom-item text normal">
						<label htmlFor="placeholder">Placeholder Action</label>
						<input id="placeholder" type="checkbox" />
					</div>
					<div className="bottom-item small">
						<Button text="Close"></Button>
					</div>
				</div>
			</div>
		);
	}
}

CurrentVideoAction.defaultProps = {

};

export default CurrentVideoAction;
