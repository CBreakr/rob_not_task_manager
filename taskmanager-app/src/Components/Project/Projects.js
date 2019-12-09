
import React from "react";

import ActiveProject from "../../Containers/Project/ActiveProjectContainer";

class Projects extends React.Component {

  selectProject = (evt) => {
    const projectId = evt.target.getAttribute("projectid");
    this.props.setCurrentProject(projectId);
  }

  render(){

    let projects = [];
    let currentProject = null;

    if(this.props.projects){
      projects = this.props.projects;
      console.log({projects: this.props.project});
    }

    if(this.props.currentProject){
      currentProject = this.props.currentProject;
    }

    return (
      <div className="project_container">
        <ul>
        {
          projects.map(project => {
            return (
              <>
                {
                  currentProject && currentProject._id == project._id
                  ?
                  <li className="project_element_active"
                    key={project._id}
                    projectid={project._id}>
                    <ActiveProject project={currentProject} />
                  </li>
                  :
                  <li className="project_element"
                    key={project._id}
                    projectid={project._id}
                    onClick={this.selectProject}>
                    {project.projectname}
                  </li>
                }
              </>
            );
          })
        }
        </ul>
      </div>
    );
  }
}

export default Projects;
