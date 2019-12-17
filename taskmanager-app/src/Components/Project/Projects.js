
import React from "react";

import ActiveProject from "../../Containers/Project/ActiveProjectContainer";

import cleanValue from "../../formatUtilities/cleanUserInput";

/*
  display all projects for the current user
  as <li> within a <ul>,
  making a distinction for the current project

  props expected:
  - projects
  - current project
*/

class Projects extends React.Component {

  selectProject = (evt) => {
    const projectId = evt.target.getAttribute("projectid");
    this.props.setCurrentProject(projectId);
  }

  //
  // RENDER
  //
  render(){

    // get the prop values for
    // the projects and current projects
    // if they exist,
    // otherwise use default empty values
    let projects = [];
    let currentProject = null;

    if(this.props.projects){
      projects = this.props.projects;
      console.log({projects: this.props.project});
    }

    if(this.props.currentProject){
      currentProject = this.props.currentProject;
    }

    // loop through all projects
    // and display them
    return (
      <div>
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
                    {cleanValue(project.projectname)}
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

//
// EXPORT
//
export default Projects;
