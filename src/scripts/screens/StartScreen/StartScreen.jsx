import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import ConfigActions from '../../actions/viewActions/configActions';
import Translator from '../../utils/translatorUtil';
import GalaxyConfigStore from '../../stores/galaxyConfigStore.js';


class StartScreen extends React.Component {

	constructor(props) {
        super(props);
        this.state = {paused: false, difficulty: "NORMAL"};
    }

	onDifficultyLevelChange(e) {
		this.setState({difficulty: e.currentTarget.value})
	}

	onStartGameRequested() {
		ConfigActions.difficutlySet({
			value: this.state.difficulty
		});
	}

	render() {
		return (
			<div className="start-screen">
				<div className="center-container">
					<h1 className="title">{Translator.trans(this.props.locale, 'gameName')}</h1>
					<label className="">{Translator.trans(this.props.locale, 'selectDifficulty')}</label>
					<select className="item difficulty" value={this.state.difficulty} onChange={this.onDifficultyLevelChange.bind(this)}>
						<option value="EASY">{Translator.trans(this.props.locale, 'easy')}</option>
						<option value="NORMAL">{Translator.trans(this.props.locale, 'normal')}</option>
						<option value="HARD">{Translator.trans(this.props.locale, 'hard')}</option>
					</select>
					<button className="item start-button">
						<Link onClick={this.onStartGameRequested.bind(this)} to="/game">
							{Translator.trans(this.props.locale, 'start')}
						</Link>
					</button>
				</div>
			</div>
		);
	}
}

StartScreen.defaultProps = {
	locale: "de"
};

export default StartScreen;
