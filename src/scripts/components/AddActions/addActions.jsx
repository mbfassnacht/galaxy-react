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
			<select value={this.state.selectedAction} onChange={this.onSelectedActionChange.bind(this)} className="video-packager-field no-ui-tranform action-select">
				<option value="lettering">Lettering</option>
				<option value="subtitle">Subtitle</option>
				<option value="watermark">Watermark</option>
			</select>
			<Button clickHandler={this.onAddAction.bind(this)} text={Translator.trans(this.props.locale, 'addAction')}></Button>
			</div>
		);
	}
}

AddActions.defaultProps = {

};

export default AddActions;
