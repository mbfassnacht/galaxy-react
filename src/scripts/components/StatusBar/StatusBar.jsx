import React from 'react';
import ReactDOM from 'react-dom';

class StatusBar extends React.Component {

	constructor(props) {
        super(props);
        this.state = {score: 0, highScore: 0};
    }

	onScoreChange(newScore) {
		this.setState({score: newScore})
	}

	oHighScoreChange(highScore) {
		this.setState({highScore: highScore})
	}

	render() {
		return (
			<div className="status-bar">
				<div className="info score">SCORE: {this.state.score}</div>
				<div className="info high-score">HIGH SCORE: {this.state.highScore}</div>
			</div>
		);
	}
}

StatusBar.defaultProps = {

};

export default StatusBar;
