require('styles/components/Close/close.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import loadsvg from 'load-svg';

var model = require('./close-model');

class Close extends React.Component {

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
		loadsvg(model.closeIcon, function (err, svg) {
		    this.container.appendChild(svg);
		}.bind(this));
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
