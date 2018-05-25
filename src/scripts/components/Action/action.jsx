import React from 'react';
import ReactDOM from 'react-dom';

class Action extends React.Component {

	constructor(props) {
        super(props);
        this.state = {};
    }

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
	}

	render() {
		return (
			<div className="action">
			</div>
		);
	}
}

Action.defaultProps = {

};

export default Action;
