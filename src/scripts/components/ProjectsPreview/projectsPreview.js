require('styles/components/ProjectsPreview/projectsPreview.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import TweenMax from 'gsap';
import { Link } from 'react-router-dom'

var model = require('./projectsPreview-model');

class ProjectsPreview extends React.Component {

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
		this.divider = this.container.getElementsByClassName('divider')[0];

	}

	handleMouseEnter() {
		TweenMax.to(this.divider, 0.4, {width:'60%'});
	}

	handleMouseLeave() {
		TweenMax.to(this.divider, 0.4, {width:'10%'});
	}

	render() {
		return (
			<div className="projects-preview">
				<div className="container" onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)}>
					<Link to="projects" className="title">{model.title}</Link>
					<div className="divider"></div>
				</div>
			</div>
		);
	}
}

ProjectsPreview.defaultProps = {

};

export default ProjectsPreview;
