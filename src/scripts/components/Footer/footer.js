import React from 'react';
import ReactDOM from 'react-dom';

class Footer extends React.Component {

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
	}

	render() {
		return (
			<div className="footer">
				im the footer that has cancel and save button
			</div>
		);
	}
}

Footer.defaultProps = {

};

export default Footer;
