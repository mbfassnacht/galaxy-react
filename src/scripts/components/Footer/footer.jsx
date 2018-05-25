import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button/button.jsx';

class Footer extends React.Component {

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
	}

	render() {
		return (
			<div className="footer">
				<Button text="Save"></Button>
			</div>
		);
	}
}

Footer.defaultProps = {

};

export default Footer;
