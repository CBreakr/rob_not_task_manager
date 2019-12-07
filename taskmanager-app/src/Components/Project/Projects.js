
import React from "react";

class Projects extends React.Component {

  selectProject = (evt) => {
    const projectId = evt.target.getAttribute("projectid");
    this.props.setCurrentProject(projectId);
  }

  render(){

    let projects = [];
    if(this.props.projects){
      projects = this.props.projects;
    }

    return (
      <div>        
        <ul>
        {
          projects.map(project => {
            return (
              <li className="project_element" key={project._id} projectid={project._id} onClick={this.selectProject}>{project.projectname}</li>
            );
          })
        }
        </ul>
      </div>
    );
  }
}

export default Projects;
