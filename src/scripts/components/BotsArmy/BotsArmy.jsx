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
		var velocity = config.velocity;
		this.state = { velocity: velocity, bots: bots, moving: "left", position: {left: (window.innerWidth / 2 - this.props.size / 2) } };
    }

	componentDidMount() {
		this.moveInterval = setInterval(this.move.bind(this), 100);
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

		if (left === 0 ) {
			this.setState({
				position: {left: left }, moving: "right"
		    });
		} else {
			this.setState({
				position: {left:  left}, moving: "left"
		    });
		}

	}

	moveRight() {
		var currentLeft = this.state.position.left;

		var left = Math.min(currentLeft + this.state.velocity, window.innerWidth - this.props.size);

		if (left === window.innerWidth - this.props.size ) {
			this.setState({
				position: {left: left }, moving: "left"
			});
		} else {
			this.setState({
				position: {left:  left}, moving: "right"
			});
		}

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
