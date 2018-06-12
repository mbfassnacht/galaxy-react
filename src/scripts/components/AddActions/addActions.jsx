import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button/button.jsx';
import ActionsActions from '../../actions/viewActions/actionsActions';
import Translator from '../../utils/translatorUtil';

class AddActions extends React.Component {

	constructor(props) {
        super(props);
        this.state = {selectedAction: 'lettering'};
    }

	onSelectedActionChange(e) {
		this.setState({selectedAction: e.currentTarget.value})
	}

	onAddAction() {
		ActionsActions.add({
			type: this.state.selectedAction
		});
	}

	render() {
		return (
			<div className="video-packager-add-actions">
			<div className="video-packager-field video-packager-select-field no-ui-tranform action-select">
				<select value={this.state.selectedAction} onChange={this.onSelectedActionChange.bind(this)}>
					<option value="lettering">{Translator.trans(this.props.locale, 'lettering')}</option>
					<option value="subtitle">{Translator.trans(this.props.locale, 'subtitle')}</option>
					<option value="watermark">{Translator.trans(this.props.locale, 'watermark')}</option>
				</select>
			</div>
			<Button clickHandler={this.onAddAction.bind(this)} text={Translator.trans(this.props.locale, 'addAction')}></Button>
			</div>
		);
	}
}

AddActions.defaultProps = {

};

export default AddActions;
