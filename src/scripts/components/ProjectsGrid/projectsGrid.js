require('styles/components/ProjectsGrid/projectsGrid.scss');

import React from 'react';
import Project from '../Project/project';

var model = require('./projectsGrid-model');

class ProjectsGrid extends React.Component {

	render() {

		return (
		  	<div className="projects-grid">
		  		{
				  	model.projects.map(function(object, i){
				  		return (<div className="project-row" key={i}>
					  		{
						  		object.map(function(project, j){
									return (<Project
					    				ref={'project'+j}
					    				name={project.name}
					    				client={project.client}
					    				description={project.description}
					    				image={project.image}
					    				technologies={project.technologies}
					    				key={j}/>);
						  		})
					  		}
						</div>);

				    }.bind(this))
				}
			</div>
		);
   	}
}

ProjectsGrid.defaultProps = {

};

export default ProjectsGrid;
