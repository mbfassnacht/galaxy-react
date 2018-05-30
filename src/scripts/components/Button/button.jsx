import React from 'react';

class Button extends React.Component {

	render() {
		return (
			<div onClick={this.props.clickHandler} className="video-packager-button video-packager-field">{this.props.text}</div>
		);
	}
}

Button.defaultProps = {

};

export default Button;
