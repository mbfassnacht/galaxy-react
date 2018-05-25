import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button/button.jsx';
import ActionsActions from '../../actions/viewActions/actions';

class AddActions extends React.Component {

	constructor(props) {
        super(props);
        this.state = {selectedAction: 'lettering'};
    }

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
	}

	onSelectedActionChange(e) {
		this.setState({selectedAction: e.currentTarget.value})
	}

	onAddAction() {
		console.log("add action: " + this.state.selectedAction);
		ActionsActions.add({
			type: this.state.selectedAction
		});
	}

	render() {
		return (
			<div className="add-actions">
			<select value={this.state.selectedAction} onChange={this.onSelectedActionChange.bind(this)} className="field action-select">
				<option value="lettering">Lettering</option>
				<option value="subtitle">Subtitle</option>
				<option value="watermark">Watermark</option>
			</select>
			<Button clickHandler={this.onAddAction.bind(this)} text="Add Action"></Button>
			</div>
		);
	}
}

AddActions.defaultProps = {

};

export default AddActions;
