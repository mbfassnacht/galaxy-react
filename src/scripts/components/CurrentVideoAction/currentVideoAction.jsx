import React from 'react';
import ReactDOM from 'react-dom';
import SVGInline from "react-svg-inline"
import icon from '../../../assets/images/erase.svg';
import Button from '../Button/button.jsx';
import ActionsStore from '../../stores/actionsStore';
import ActionsActions from '../../actions/viewActions/actions';

function getCurrentActionFromStore() {
    return ActionsStore.getCurrentAction()
}

class CurrentVideoAction extends React.Component {

	constructor(props) {
		super(props);
		var action = getCurrentActionFromStore();
		this.state = {action: action, actionSelected: false};
	}

	onChange() {
		var action = getCurrentActionFromStore();
		if (action.id != -1) {
			this.setState({action: action, actionSelected: true});
		} else {
			this.setState({action: action, actionSelected: false});
		}

	}

	componentDidMount() {
		ActionsStore.addChangeListener(this.onChange.bind(this));
	}

	actionUpdated() {
		ActionsActions.update(this.state.action);
	}

	updateTitle(e) {
		var updatedAction = {
			action: Object.assign({}, this.state.action, {title: e.currentTarget.value})
		};

		this.setState(updatedAction);
		ActionsActions.update(updatedAction);
	}

	updateMarkIn(e) {
		var updatedAction = {
			action: Object.assign({}, this.state.action, {markIn: e.currentTarget.value})
		};
		this.setState(updatedAction);
		ActionsActions.update(updatedAction);
	}

	updateMarkOut(e) {
		var updatedAction = {
			action: Object.assign({}, this.state.action, {markOut: e.currentTarget.value})
		};
		this.setState(updatedAction);
		ActionsActions.update(updatedAction);
	}

	updatePlaceholder(e) {
		e.currentTarget.value = !this.state.action.placeholder;
		var updatedAction = {
			action: Object.assign({}, this.state.action, {placeholder: e.currentTarget.value})
		};
		this.setState(updatedAction);
		ActionsActions.update(updatedAction);
	}

	updateInput1(e) {
		var updatedAction = {
			action: Object.assign({}, this.state.action, {input1: e.currentTarget.value})
		};
		this.setState(updatedAction);
		ActionsActions.update(updatedAction);
	}

	updateInput2(e) {
		var updatedAction = {
			action: Object.assign({}, this.state.action, {input2: e.currentTarget.value})
		};
		this.setState(updatedAction);
		ActionsActions.update(updatedAction);
	}

	componentWillUnmount() {
		ActionsStore.removeChangeListener(this.onChange.bind(this));
	}

	onCloseAction() {
		ActionsActions.removeSelection();
	}

	render() {
		return (
			<div className={'current-video-action ' + (this.state.actionSelected ? '' :'hidden')}>
				<div className="action-header">
					<div className="action-title">
						<input className="title" placeholder = "Enter action name..." value={this.state.action.title} onChange={this.updateTitle.bind(this)}/>
					</div>
					<div className="action-duration">
						<span className="duration-title">Duration:</span>
						<span className="duration"></span>
					</div>
				</div>
				<div className="action-top-info">
					<label htmlFor="mark-in">Mark in</label>
					<input input="mark-in" className="mark-in" value={this.state.action.markIn} onChange={this.updateMarkIn.bind(this)}/>
					<label htmlFor="mark-out">Mark out</label>
					<input input="mark-out" className="mark-out" value={this.state.action.markOut} onChange={this.updateMarkOut.bind(this)}/>
				</div>
				<div className="action-content">
					<div className="input-container">
						<label htmlFor="input-1">Input 1</label>
						<input input="input-1" className="input-1" value={this.state.action.input1} onChange={this.updateInput1.bind(this)}/>
					</div>
					<div className="input-container">
						<label htmlFor="input-2">Input 2</label>
						<input input="input-2" className="input-2" value={this.state.action.input2} onChange={this.updateInput2.bind(this)}/>
					</div>
				</div>
				<div className="action-bottom-container">
					<div className="bottom-item x-small">
						<SVGInline svg={icon} />
					</div>
					<div className="bottom-item text normal">
						<label className="custom-checkbox container">Placeholder Action
							<input value={this.state.action.placeholder} onChange={this.updatePlaceholder.bind(this)} id="placeholder" type="checkbox" />
							<span className="checkmark"></span>
						</label>
					</div>
					<div className="bottom-item small">
						<Button clickHandler={this.onCloseAction.bind(this)} text="Close"></Button>
					</div>
				</div>
			</div>
		);
	}
}

CurrentVideoAction.defaultProps = {

};

export default CurrentVideoAction;
