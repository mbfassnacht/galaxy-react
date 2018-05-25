import React from 'react';

class Button extends React.Component {

	componentDidMount() {
	}

	render() {
		return (
			<div onClick={this.props.clickHandler} className="button">{this.props.text}</div>
		);
	}
}

Button.defaultProps = {

};

export default Button;
