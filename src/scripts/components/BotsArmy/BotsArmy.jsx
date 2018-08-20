import React from 'react';
import ReactDOM from 'react-dom';
import "./../../../assets/images/blue-bot.png";
import "./../../../assets/images/red-bot.png";
import "./../../../assets/images/green-bot.png";
import Bot from '../Bot/Bot.jsx';
import GalaxyConfigStore from '../../stores/galaxyConfigStore';


function getConfig() {
    return GalaxyConfigStore.getConfig()
}

class BotsArmy extends React.Component {

	constructor(props) {
        super(props);
		var config = getConfig();
		var bots = config.bots;
		var moveForward = config.moveForward;
		var velocity = config.velocity;
		this.state = {
			moveForward: moveForward,
			velocity: velocity,
			iteration: 0,
			bots: bots,
			moving: "left",
			position: {
				left: (window.innerWidth / 2 - this.props.size / 2),
				top: 0
			}
		};
    }

	componentDidMount() {
		this.moveInterval = setInterval(this.move.bind(this), 50);
	}

	componentWillUnmount() {
		clearInterval(this.moveInterval);
	}

	move(e) {
		if (this.state.moving === "left") {
			this.moveLeft();
		} else {
			this.moveRight();
		}
	}

	moveLeft() {
		var currentLeft = this.state.position.left;

		var left = Math.max(currentLeft - this.state.velocity, 0);
		var moving = "left";
		var iteration = this.state.iteration;
		var top = this.state.position.top;

		if (left === 0 ) {
			moving = "right";
			iteration++;
		}

		if (iteration == this.state.moveForward ) {
			top += 20;
			iteration = 0;
		}

		this.setState({
			iteration: iteration,
			position: {
				left:  left,
				top: top
			},
			moving: moving
		});
	}

	moveRight() {
		var currentLeft = this.state.position.left;
		var left = Math.min(currentLeft + this.state.velocity, window.innerWidth - this.props.size);
		var moving = "right";
		var iteration = this.state.iteration;
		var top = this.state.position.top;


		if (left === window.innerWidth - this.props.size ) {
			moving = "left";
			iteration++;
		}

		if (iteration == this.state.moveForward ) {
			top += 20;
			iteration = 0;
		}

		this.setState({
			iteration: iteration,
			position: {
				left:  left,
				top: top
			},
			moving: moving
		});
	}

	createBotsRow(amount, type) {
		var botsRow = [];
        for (let i = 0; i < amount; i++) {
            botsRow.push(<Bot type={type} key={i}></Bot>);
        }
		return botsRow;
    }

	render() {
		return (
			<div style={this.state.position} className="bots-army">
				<div className="bots-row">{this.createBotsRow(this.state.bots.green, "green")}</div>
				<div className="bots-row">{this.createBotsRow(this.state.bots.red, "red")}</div>
				<div className="bots-row">{this.createBotsRow(this.state.bots.blue, "blue")}</div>
			</div>
		);
	}
}

BotsArmy.defaultProps = {
	size: '800'
};

export default BotsArmy;
