import React from 'react';
import ReactDOM from 'react-dom';

class Spacecraft extends React.Component {

	constructor(props) {
        super(props);
		this.state = { position: {bottom: 0, left: (screen.width / 2 - this.props.size / 2) } };

    }

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyDown.bind(this));
	}

	handleKeyDown(e) {
		if (e.keyCode === 37) {
			this.moveLeft(e);
			return;
		}

		if (e.keyCode === 39) {
			this.moveRight(e);
			return;
		}

		if (e.keyCode === 32) {
			this.shot(e);
			return;
		}
	}

	moveLeft(e) {
		var currentLeft = this.state.position.left;

		this.setState({
			position: {left: Math.max(currentLeft - this.props.velocity, 0) }
	    });
	}

	moveRight(e) {
		var currentLeft = this.state.position.left;

		this.setState({
			position: {
				left: Math.min(currentLeft + this.props.velocity, window.innerWidth - this.props.size)
			}
	    });
	}

	shot(e) {

	}

	render() {
		return (
			<div style = {this.state.position} className="spacecraft">
			</div>
		);
	}
}

Spacecraft.defaultProps = {
	velocity: 40,
	size: 40
};

export default Spacecraft;
