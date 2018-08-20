import React from 'react';
import ReactDOM from 'react-dom';
import Scene from '../../components/Scene/Scene.jsx';
import GalaxyConfigStore from '../../stores/galaxyConfigStore';

function getConfig() {
    return GalaxyConfigStore.getConfig()
}

class GameScreen extends React.Component {

	constructor(props) {
        super(props);
        this.state = {score: 0};

		var conf = getConfig();
		if (!conf.set) {
			this.props.history.push('/')
		}
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
