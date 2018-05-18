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

	handleMouseDown() {
        if (typeof this.props.onClicked === 'function') {
            this.props.onClicked();
        }
	}

	handleMouseEnter() {

	}

	handleMouseLeave() {
	}

	animateIn() {
	}

	animateOut() {
	}

	render() {
		return (
			<div className="close" onMouseDown={this.handleMouseDown.bind(this)} onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)}>
			</div>
		);
	}
}

Close.defaultProps = {

};

export default Close;
