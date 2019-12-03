
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
        Projects:
        <ul>
        {
          projects.map(project => {
            return (
              <li key={project._id} projectid={project._id} onClick={this.selectProject}>{project.projectname}</li>
            );
          })
        }
        </ul>
      </div>
    );
  }
}

export default Projects;
