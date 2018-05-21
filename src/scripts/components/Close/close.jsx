import React from 'react';
import ReactDOM from 'react-dom';
import SVGInline from "react-svg-inline"
import icon from '../../../assets/images/close.svg';

class Close extends React.Component {

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
	}

	render() {
		return (
			<div className="close" onClick={this.props.action}>
				<SVGInline svg={icon} />
			</div>
		);
	}
}

Close.defaultProps = {

};

export default Close;
