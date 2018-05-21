import React from 'react';
import ReactDOM from 'react-dom';
import loadsvg from 'load-svg';
var model = require('./close-model');
var icon = require('svg-inline-loader?classPrefix!./' + model.closeIcon);
class Close extends React.Component {

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
		this.container.appendChild(icon);
	}

	render() {
		return (
			<div className="close" onClick={this.props.action}>
			</div>
		);
	}
}

Close.defaultProps = {

};

export default Close;
