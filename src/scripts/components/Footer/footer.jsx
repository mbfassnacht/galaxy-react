import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button/button.jsx';
import ApiServices from '../../ApiServices';

class Footer extends React.Component {

	onSaveAction() {
		ApiServices.save();
	}

	render() {
		return (
			<div className="video-packager-footer">
				<Button clickHandler={this.onSaveAction.bind(this)} text="Save"></Button>
			</div>
		);
	}
}

Footer.defaultProps = {

};

export default Footer;
