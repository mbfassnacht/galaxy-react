import React from 'react';
import ReactDOM from 'react-dom';

class Bullet extends React.Component {

	constructor(props) {
        super(props);
        this.state = {moving: true};
    }

	render() {
		return (
			<div className="bullet">
			</div>
		);
	}
}

Bullet.defaultProps = {

};

export default Bullet;
