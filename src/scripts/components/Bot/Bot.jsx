import React from 'react';
import ReactDOM from 'react-dom';
import BotActions from '../../actions/viewActions/botActions';
import "./../../../assets/images/blue-bot.png";
import "./../../../assets/images/red-bot.png";
import "./../../../assets/images/green-bot.png";

class Bot extends React.Component {

	constructor(props) {
        super(props);
        this.state = {living: true};
    }

	onImKilled() {
		this.setState({living: false})
		BotActions.imKilled();
	}

	render() {
		return (
			<div className={'bot ' + this.props.type}>
			</div>
		);
	}
}

Bot.defaultProps = {

};

export default Bot;
