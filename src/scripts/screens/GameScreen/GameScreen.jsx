import React from 'react';
import ReactDOM from 'react-dom';
import Scene from '../../components/Scene/Scene.jsx';

class GameScreen extends React.Component {

	constructor(props) {
        super(props);
        this.state = {score: 0};
    }

	render() {
		return (
			<div className="game-screen">
				<Scene></Scene>
			</div>
		);
	}
}

GameScreen.defaultProps = {

};

export default GameScreen;
