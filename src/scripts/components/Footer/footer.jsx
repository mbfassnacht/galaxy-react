import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button/button.jsx';
import ApiServices from '../../ApiServices';
import Translator from '../../utils/translatorUtil';
import AlertsContainer from '../AlertsContainer/alertsContainer.jsx';
import VideoPackagerActions from '../../actions/viewActions/videoPackagerActions';
import VideoPackagerStore from '../../stores/videoPackagerStore';

class Footer extends React.Component {

	constructor(props) {
        super(props);
        this.state = {neverTriedSave: true};
    }

	onSaveAction() {
		if (this.state.neverTriedSave) {
			VideoPackagerActions.attemptToSave();
			this.setState({neverTriedSave: false})
		}

		if (VideoPackagerStore.getStatus().allowedToSave) {
			ApiServices.save();
		}
	}

	render() {
		return (
			<div className="video-packager-footer">
				<AlertsContainer locale={this.props.locale}></AlertsContainer>
				<Button clickHandler={this.onSaveAction.bind(this)} text={Translator.trans(this.props.locale, 'save')}></Button>
			</div>
		);
	}
}

Footer.defaultProps = {

};

export default Footer;
