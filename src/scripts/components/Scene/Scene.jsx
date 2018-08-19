import React from 'react';
import ReactDOM from 'react-dom';
import Spacecraft from '../../components/Spacecraft/spacecraft.jsx';

class Scene extends React.Component {

	constructor(props) {
        super(props);
        this.state = {paused: false};
    }

	onNewBulletShotted() {
		this.setState({living: false})
		BotActions.imKilled();
	}

	render() {
		return (
			<div className="scene">
				<Spacecraft></Spacecraft>
			</div>
		);
	}
}

Scene.defaultProps = {

};

export default Scene;
