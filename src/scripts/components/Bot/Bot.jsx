import React from 'react';
import ReactDOM from 'react-dom';
import BotActions from '../../actions/viewActions/botActions';

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
			<div className="bot">
			</div>
		);
	}
}

Bot.defaultProps = {

};

export default Bot;
