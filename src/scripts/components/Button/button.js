require('styles/components/Button/button.scss');

import React from 'react';
import ReactDOM from 'react-dom';

class Button extends React.Component {

	componentDidMount() {
	}

	render() {
		return (
			<div className="button">{this.props.text}</div>
		);
	}
}

Button.defaultProps = {

};

export default Button;
