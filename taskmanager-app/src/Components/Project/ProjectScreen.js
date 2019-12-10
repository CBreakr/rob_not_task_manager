
import React from "react";

// import ProjectForm from "../../Containers/Project/ProjectFormContainer";
// <ProjectForm submitText="Add" />
import AddNewProject from "./AddNewProject";
import Projects from "../../Containers/Project/ProjectsContainer";

class ProjectScreen extends React.Component {
  render() {
    return (
      <div className="project_screen">
        <div className="project_header">
          <h2>Projects</h2>
        </div>
        <div className="project_container">
          <AddNewProject />
          <Projects />
        </div>
      </div>
    );
  }
}

export default ProjectScreen;
