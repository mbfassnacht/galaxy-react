import React from 'react';
import ReactDOM from 'react-dom';
import SVGInline from "react-svg-inline"
import icon from '../../../assets/images/close.svg';

class Close extends React.Component {

	render() {
		return (
			<div className="close" onClick={this.props.action}>
				<SVGInline svg={this.props.icon} />
			</div>
		);
	}
}

Close.defaultProps = {
	icon: icon
};

export default Close;
