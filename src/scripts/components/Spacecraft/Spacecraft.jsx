import React from 'react';
import ReactDOM from 'react-dom';
import "./../../../assets/images/spacecraft.png";
import SpacecraftActions from '../../actions/viewActions/spacecraftActions';

class Spacecraft extends React.Component {

	constructor(props) {
        super(props);
		this.state = { position: {bottom: 0, left: (window.innerWidth / 2 - this.props.size / 2) } };

    }

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyDown.bind(this));
	}

	handleKeyDown(e) {
		if (e.keyCode === 37) {
			this.moveLeft(e);
		}

		if (e.keyCode === 39) {
			this.moveRight(e);
		}

		if (e.keyCode === 32) {
			this.shot(e);
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
		SpacecraftActions.bulletShotted({
			x: this.state.position.left
		});
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
	size: 60
};

export default Spacecraft;
