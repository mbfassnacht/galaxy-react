import React from 'react';
import ReactDOM from 'react-dom';

class FinishScreen extends React.Component {

	constructor(props) {
        super(props);
        this.state = {score: 0};
    }

	render() {
		return (
			<div className="finish-screen">
			</div>
		);
	}
}

FinishScreen.defaultProps = {

};

export default FinishScreen;
