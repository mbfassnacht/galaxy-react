import React from 'react';
import ReactDOM from 'react-dom';

class Bullet extends React.Component {

	constructor(props) {
        super(props);
		this.state = {
			moving: true,
			position: {
				bottom: 0,
				left: 0
			}
		};
    }

	render() {
		return (
			<div style = {this.state.position} className="bullet">
			</div>
		);
	}
}

Bullet.defaultProps = {

};

export default Bullet;
