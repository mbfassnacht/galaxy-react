require('styles/components/Close/close.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import {TweenMax, Expo} from 'gsap';
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
		TweenMax.to(this.container, 0.4, {rotation: '90', ease: Expo.easeOut});
	}

	handleMouseLeave() {
		TweenMax.to(this.container, 0.4, {rotation: '-90', ease: Expo.easeOut});
	}

	animateIn() {
		TweenMax.to(this.container, 0.4, {delay: 0.4, autoAlpha: 1, ease: Expo.easeOut});
	}

	animateOut() {
		TweenMax.to(this.container, 0.4, {delay: 0.4, autoAlpha: 0, ease: Expo.easeOut});
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
