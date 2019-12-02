
import React from "react";

class ProjectList extends React.Component {

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
        ProjectList:
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

export default ProjectList;
